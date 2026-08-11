// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Il giocatore non ha un personaggio: guarda l'isola dall'alto, la sposta col
// dito, e **da' ordini**. Le azioni dell'interfaccia entrano da una coda di
// comandi e vengono eseguite dentro un passo di simulazione.

import { area, elencoMateriali, limiti, simulazione, tessera } from './config.js'
import { disegnaIsola } from './disegno.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaCamera } from './camera.js'
import { creaLavori } from './lavori.js'
import { creaBraccianti } from './braccianti.js'
import { creaGestoreEffetti } from './effetti.js'
import { centroTessera, risorsaIn, tessereDaMondo } from './mondo.js'

export function creaMotore(canvasGioco) {
  const camera = creaCamera()
  const lavori = creaLavori()
  const effetti = creaGestoreEffetti()

  const magazzino = {}
  for (let i = 0; i < elencoMateriali.length; i++) {
    magazzino[elencoMateriali[i].id] = 0
  }

  const centro = { x: 0, y: 0 }

  const squadra = creaBraccianti({
    allaResa: (materiale, quantita, tx, ty) => {
      magazzino[materiale] += quantita
      centroTessera(tx, ty, centro)
      camera.versoSchermo(centro.x, centro.y, centro)
      effetti.raccolta(centro.x, centro.y)
    },
    alCambioDelMondo: () => {}
  })

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0
  }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    // stringa e non oggetto: l'interfaccia la confronta per capire se e'
    // cambiata, e confrontare un oggetto a ogni lettura costerebbe di piu'
    magazzino: '',
    lavoriInAttesa: 0,
    braccantiFermi: 0,
    braccantiTotali: 0,
    zoomLontano: false,
    // cosa e' stato toccato per ultimo, per l'avviso a schermo
    ultimoEsito: ''
  }

  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0
  let esito = ''

  function accodaComando(tipo, x, y) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.x = x || 0
    comando.y = y || 0
  }

  const mondoTocco = { x: 0, y: 0 }
  const tessereTocco = { tx: 0, ty: 0 }

  // Toccare una cosa sull'isola da' un ordine. Toccarla di nuovo lo disdice.
  // Toccare il terreno vuoto non fa niente e non deve sembrare un guasto.
  function tocca(xSchermo, ySchermo) {
    camera.versoMondo(xSchermo, ySchermo, mondoTocco)
    tessereDaMondo(mondoTocco.x, mondoTocco.y, tessereTocco)

    const cosa = risorsaIn(tessereTocco.tx, tessereTocco.ty)
    if (!cosa) {
      esito = ''
      return
    }

    const gia = lavori.trovaSuTessera(tessereTocco.tx, tessereTocco.ty)
    if (gia) {
      if (gia.preso) {
        esito = 'ci sta già andando qualcuno'
      } else {
        lavori.ordina(tessereTocco.tx, tessereTocco.ty, cosa)
        esito = 'ordine annullato'
      }
      return
    }

    if (lavori.ordina(tessereTocco.tx, tessereTocco.ty, cosa)) {
      esito = ''
    } else {
      esito = 'nessuno lo sa fare'
    }
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false
      if (comando.tipo === 'tocca') {
        tocca(comando.x, comando.y)
      } else if (comando.tipo === 'trascina') {
        camera.trascina(comando.x, comando.y)
      } else if (comando.tipo === 'zoom') {
        camera.cambiaZoom()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
  }

  function aggiorna() {
    eseguiComandi()
    squadra.aggiorna(lavori, simulazione.passo_ms, simulazione.passo_ms / 1000)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaIsola(ctxGioco, camera, lavori, squadra.squadra)
    effetti.disegna(ctxGioco)
  }

  function frame(istante) {
    richiesta = requestAnimationFrame(frame)

    accumulato += istante - ultimoTempo
    ultimoTempo = istante
    // evita la spirale della morte quando l'app torna in primo piano
    const tetto = simulazione.passi_massimi_per_frame * simulazione.passo_ms
    if (accumulato > tetto) {
      accumulato = tetto
    }
    while (accumulato >= simulazione.passo_ms) {
      aggiorna()
      accumulato -= simulazione.passo_ms
    }

    disegna()
  }

  function avvia() {
    // si comincia guardando il casotto: e' il centro della fattoria
    camera.guarda(camera.stato.x, camera.stato.y)
    ultimoTempo = performance.now()
    accumulato = 0
    richiesta = requestAnimationFrame(frame)
  }

  function ferma() {
    cancelAnimationFrame(richiesta)
    richiesta = 0
  }

  // --- comunicazione con l'interfaccia ---

  function leggiStato() {
    let riga = ''
    for (const materiale in magazzino) {
      riga += (riga ? ',' : '') + materiale + ':' + magazzino[materiale]
    }
    vetrina.magazzino = riga
    vetrina.lavoriInAttesa = lavori.quantiInAttesa()
    vetrina.braccantiFermi = squadra.quantiFermi()
    vetrina.braccantiTotali = squadra.squadra.length
    vetrina.zoomLontano = camera.stato.livello > 0
    vetrina.ultimoEsito = esito
    return vetrina
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    tocca: (x, y) => accodaComando('tocca', x, y),
    trascina: (dx, dy) => accodaComando('trascina', dx, dy),
    zoom: () => accodaComando('zoom'),
    // serve al tocco: da pixel dello schermo a pixel logici del campo
    misuraLogica: tessera
  }
}
