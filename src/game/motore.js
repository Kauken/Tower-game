// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Le azioni dell'interfaccia (tocca una casella, piazza, rimuovi) entrano da
// una coda di comandi e vengono eseguite dentro un passo di simulazione: cosi'
// due tocchi ravvicinati non possono piazzare due cose sulla stessa casella.

import { area, limiti, simulazione } from './config.js'
import { disegnaSfondo } from './sfondo.js'
import { disegnaFattoria } from './disegno.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaFattoria } from './fattoria.js'
import { creaGestoreEffetti } from './effetti.js'
import { casellaSotto, centroX, centroY } from './griglia.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const effetti = creaGestoreEffetti()

  const fattoria = creaFattoria({
    allaRaccolta: (indice) => effetti.raccolta(centroX(indice), centroY(indice))
  })

  // il comando porta con se' su cosa agisce: cosi' due tocchi ravvicinati su
  // caselle diverse non si confondono
  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    indice: -1,
    idContenuto: ''
  }))

  // quale casella e' selezionata: e' su quella che agisce il pannello in basso
  let selezionata = -1

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    selezionata: -1,
    contenutoSelezionato: '',
    selezionataMatura: false,
    // le vicinanze accese sulla casella toccata, gia' pronte da leggere: e'
    // il modo in cui il giocatore capisce perche' quella casella rende di piu'
    bonusSelezionato: '',
    selezionataIrrigata: false,
    // stringa e non oggetto: l'interfaccia la confronta per capire se e'
    // cambiata, e confrontare un oggetto a ogni lettura costerebbe di piu'
    magazzino: '',
    caselleUsate: 0
  }

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  function accodaComando(tipo, indice, idContenuto) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.indice = indice === undefined ? -1 : indice
    comando.idContenuto = idContenuto || ''
  }

  // Toccare una casella fa la cosa ovvia: se c'e' da raccogliere raccoglie,
  // altrimenti seleziona. Un tocco che non fa niente sembra un guasto.
  function tocca(indice) {
    if (indice < 0) {
      selezionata = -1
      return
    }
    const casella = fattoria.caselle[indice]
    if (casella.matura) {
      fattoria.raccogli(indice)
      selezionata = -1
      return
    }
    selezionata = selezionata === indice ? -1 : indice
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false
      if (comando.tipo === 'tocca') {
        tocca(comando.indice)
      } else if (comando.tipo === 'piazza') {
        if (fattoria.piazza(comando.indice, comando.idContenuto)) {
          selezionata = -1
        }
      } else if (comando.tipo === 'rimuovi') {
        fattoria.rimuovi(comando.indice)
        selezionata = -1
      } else if (comando.tipo === 'chiudi') {
        selezionata = -1
      } else if (comando.tipo === 'svuota') {
        fattoria.svuota()
        effetti.svuota()
        selezionata = -1
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    // lo sfondo si ridisegna solo qui: mai dentro il ciclo
    disegnaSfondo(ctxSfondo)
  }

  function aggiorna() {
    eseguiComandi()
    fattoria.aggiorna(simulazione.passo_ms)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaFattoria(ctxGioco, fattoria.caselle, selezionata)
    effetti.disegna(ctxGioco)
  }

  function frame(tempo) {
    richiesta = requestAnimationFrame(frame)

    accumulato += tempo - ultimoTempo
    ultimoTempo = tempo
    // evita la spirale della morte quando l'app torna in primo piano
    if (accumulato > simulazione.passi_massimi_per_frame * simulazione.passo_ms) {
      accumulato = simulazione.passi_massimi_per_frame * simulazione.passo_ms
    }
    while (accumulato >= simulazione.passo_ms) {
      aggiorna()
      accumulato -= simulazione.passo_ms
    }

    disegna()
  }

  function avvia() {
    ultimoTempo = performance.now()
    accumulato = 0
    richiesta = requestAnimationFrame(frame)
  }

  function ferma() {
    cancelAnimationFrame(richiesta)
    richiesta = 0
  }

  // --- comunicazione con l'interfaccia ---

  // L'interfaccia legge, non chiede: nessun oggetto nuovo a ogni lettura,
  // tranne la stringa del magazzino, che cambia di rado.
  let magazzinoPrecedente = ''

  function leggiStato() {
    vetrina.selezionata = selezionata
    vetrina.contenutoSelezionato =
      selezionata >= 0 ? fattoria.caselle[selezionata].contenuto : ''
    vetrina.selezionataMatura =
      selezionata >= 0 ? fattoria.caselle[selezionata].matura : false
    vetrina.bonusSelezionato =
      selezionata >= 0 ? fattoria.caselle[selezionata].etichetta : ''
    vetrina.selezionataIrrigata =
      selezionata >= 0 ? fattoria.caselle[selezionata].irrigata : false

    let riga = ''
    let usate = 0
    for (const materiale in fattoria.magazzino) {
      riga += (riga ? ',' : '') + materiale + ':' + fattoria.magazzino[materiale]
    }
    for (let i = 0; i < fattoria.caselle.length; i++) {
      if (fattoria.caselle[i].contenuto) {
        usate++
      }
    }
    if (riga !== magazzinoPrecedente) {
      magazzinoPrecedente = riga
      vetrina.magazzino = riga
    }
    vetrina.caselleUsate = usate
    return vetrina
  }

  // Il tocco arriva in coordinate dello schermo: qui diventa una casella.
  function toccaPunto(xLogica, yLogica) {
    accodaComando('tocca', casellaSotto(xLogica, yLogica))
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    toccaPunto,
    piazza: (indice, idContenuto) => accodaComando('piazza', indice, idContenuto),
    rimuovi: (indice) => accodaComando('rimuovi', indice),
    chiudi: () => accodaComando('chiudi'),
    svuota: () => accodaComando('svuota')
  }
}
