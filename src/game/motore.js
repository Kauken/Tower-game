// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si crea nessun oggetto nuovo.
// Le azioni dell'interfaccia entrano da una coda di comandi, mai come
// chiamate dirette: cosi' React non puo' toccare il gioco a meta' di un passo.

import {
  area,
  elencoTorri,
  grafica,
  limiti,
  mappaAttiva,
  simulazione,
  torrePerId
} from './config.js'
import { preparaPercorso } from './percorso.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas, aCoordinateLogiche } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreNemici } from './nemici.js'
import { creaGestoreProiettili } from './proiettili.js'
import { creaGestoreEffetti } from './effetti.js'
import { creaGestoreTorri, statisticheTorre } from './torri.js'
import { creaGestoreOndate } from './ondate.js'
import {
  creaStatoPartita,
  incassa,
  paga,
  perdiVita,
  puoPagare,
  reimposta,
  ricompensaOndata
} from './partita.js'

const NESSUNA = -1

export function creaMotore(canvasSfondo, canvasGioco) {
  const percorso = preparaPercorso(mappaAttiva.percorso)
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms
  const raggioToccoQuadrato =
    grafica.caselle.raggio_tocco * grafica.caselle.raggio_tocco

  const partita = creaStatoPartita()

  const effetti = creaGestoreEffetti()
  const nemici = creaGestoreNemici(
    percorso,
    (oro, x, y) => {
      incassa(partita, oro)
      effetti.morte(x, y)
      effetti.popupOro(x, y, oro)
    },
    () => perdiVita(partita)
  )
  const proiettili = creaGestoreProiettili(nemici, effetti)
  const torri = creaGestoreTorri(nemici, proiettili, effetti)
  const ondate = creaGestoreOndate(nemici)

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0,
    // per il comando costruisci: quale torre
    testo: ''
  }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = { oro: 0, vite: 0, ondata: 0, fase: 'pausa' }

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  let casellaScelta = NESSUNA
  let avvisaSelezione = null

  function accodaComando(tipo, x, y, testo) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.x = x
    comando.y = y
    comando.testo = testo
  }

  // Chiamata solo quando la selezione cambia (un tocco), mai a ogni frame:
  // qui creare oggetti per React e' legittimo.
  function notificaSelezione() {
    if (!avvisaSelezione) {
      return
    }
    if (casellaScelta === NESSUNA) {
      avvisaSelezione(null)
      return
    }
    const casella = mappaAttiva.caselle[casellaScelta]
    const torre = torri.torreSuCasella(casellaScelta)

    if (torre) {
      // casella occupata: le statistiche della torre che c'e' sopra,
      // col danno effettivo (aura dell'Obelisco compresa)
      const statistiche = statisticheTorre(torrePerId(torre.id), casella)
      statistiche.costruita = true
      statistiche.dannoEffettivo = torre.danno
      avvisaSelezione(statistiche)
      return
    }

    // casella libera: le statistiche di tutte le torri su questa casella,
    // per il pannello di scelta
    avvisaSelezione({
      costruita: false,
      tipoCasella: casella.tipo,
      descrizioneBonus: statisticheTorre(elencoTorri[0], casella).descrizioneBonus,
      torri: elencoTorri.map((definizione) => statisticheTorre(definizione, casella))
    })
  }

  function casellaVicinaA(x, y) {
    const caselle = mappaAttiva.caselle
    let migliore = NESSUNA
    let distanzaMigliore = raggioToccoQuadrato
    for (let i = 0; i < caselle.length; i++) {
      const dx = caselle[i].x - x
      const dy = caselle[i].y - y
      const distanza = dx * dx + dy * dy
      if (distanza <= distanzaMigliore) {
        migliore = i
        distanzaMigliore = distanza
      }
    }
    return migliore
  }

  function costruisciSuScelta(torreId) {
    if (casellaScelta === NESSUNA) {
      return
    }
    const definizione = torrePerId(torreId)
    const casella = mappaAttiva.caselle[casellaScelta]
    if (!puoPagare(partita, definizione.costo)) {
      return
    }
    if (!torri.piazza(casellaScelta, definizione)) {
      return
    }
    paga(partita, definizione.costo)
    effetti.ondaPiazzamento(casella.x, casella.y)
    // resta selezionata: cosi' si vede subito il raggio della torre nuova
    notificaSelezione()
  }

  function ricomincia() {
    ondate.ferma()
    nemici.svuota()
    proiettili.svuota()
    torri.svuota()
    effetti.svuota()
    reimposta(partita)
    casellaScelta = NESSUNA
    notificaSelezione()
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false

      if (comando.tipo === 'tocco') {
        casellaScelta = casellaVicinaA(comando.x, comando.y)
        notificaSelezione()
      } else if (comando.tipo === 'costruisci') {
        costruisciSuScelta(comando.testo)
      } else if (comando.tipo === 'annulla') {
        casellaScelta = NESSUNA
        notificaSelezione()
      } else if (comando.tipo === 'chiamaOndata') {
        if (partita.fase === 'pausa') {
          partita.ondata++
          partita.fase = 'ondata'
          ondate.avvia(partita.ondata)
        }
      } else if (comando.tipo === 'ricomincia') {
        ricomincia()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    // lo sfondo si ridisegna solo qui: mai dentro il ciclo
    disegnaSfondo(ctxSfondo, mappaAttiva)
  }

  function aggiorna() {
    eseguiComandi()

    // a partita persa il campo si ferma: resta solo la schermata di sconfitta
    if (partita.fase === 'sconfitta') {
      return
    }

    nemici.aggiorna(simulazione.passo_ms, passoSecondi)
    torri.aggiorna(simulazione.passo_ms)
    proiettili.aggiorna(passoSecondi)
    effetti.aggiorna(simulazione.passo_ms)

    if (partita.fase === 'ondata') {
      const conclusa = ondate.aggiorna(simulazione.passo_ms, partita.ondata)
      if (conclusa) {
        incassa(partita, ricompensaOndata(partita.ondata))
        partita.fase = 'pausa'
      }
    }
  }

  function disegnaSelezione() {
    if (casellaScelta === NESSUNA) {
      return
    }
    const casella = mappaAttiva.caselle[casellaScelta]
    const torre = torri.torreSuCasella(casellaScelta)
    if (torre) {
      // il raggio si vede solo quando la torre e' selezionata
      torri.disegnaRaggio(ctxGioco, torre)
    }
    ctxGioco.beginPath()
    ctxGioco.arc(casella.x, casella.y, grafica.caselle.raggio_tocco, 0, Math.PI * 2)
    ctxGioco.lineWidth = grafica.caselle.spessore_selezione
    ctxGioco.strokeStyle = grafica.caselle.colore_selezione
    ctxGioco.stroke()
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaSelezione()
    torri.disegna(ctxGioco)
    nemici.disegna(ctxGioco)
    proiettili.disegna(ctxGioco)
    // gli effetti sopra tutto: sono brevi e non coprono niente a lungo
    effetti.disegna(ctxGioco)
  }

  function frame(tempo) {
    richiesta = requestAnimationFrame(frame)

    accumulato += tempo - ultimoTempo
    ultimoTempo = tempo
    // evita la spirale della morte quando l'app torna in primo piano
    if (accumulato > accumuloMassimo) {
      accumulato = accumuloMassimo
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

  // L'interfaccia legge, non chiede: nessun oggetto nuovo a ogni lettura.
  function leggiStato() {
    vetrina.oro = partita.oro
    vetrina.vite = partita.vite
    vetrina.ondata = partita.ondata
    vetrina.fase = partita.fase
    return vetrina
  }

  function tocca(xSchermo, ySchermo) {
    const punto = aCoordinateLogiche(canvasGioco, area, xSchermo, ySchermo)
    accodaComando('tocco', punto.x, punto.y, '')
  }

  function costruisci(torreId) {
    accodaComando('costruisci', 0, 0, torreId)
  }

  function annulla() {
    accodaComando('annulla', 0, 0, '')
  }

  function chiamaOndata() {
    accodaComando('chiamaOndata', 0, 0, '')
  }

  function riparti() {
    accodaComando('ricomincia', 0, 0, '')
  }

  function impostaAscoltatoreSelezione(ascoltatore) {
    avvisaSelezione = ascoltatore
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    tocca,
    costruisci,
    annulla,
    chiamaOndata,
    riparti,
    impostaAscoltatoreSelezione
  }
}
