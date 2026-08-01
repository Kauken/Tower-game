// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si crea nessun oggetto nuovo.
// Le azioni dell'interfaccia entrano da una coda di comandi, mai come
// chiamate dirette: cosi' React non puo' toccare il gioco a meta' di un passo.

import { area, grafica, limiti, mappaAttiva, simulazione } from './config.js'
import { preparaPercorso } from './percorso.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas, aCoordinateLogiche } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreNemici } from './nemici.js'
import { creaGestoreProiettili } from './proiettili.js'
import { creaGestoreTorri, statisticheSuCasella } from './torri.js'

const NESSUNA = -1

export function creaMotore(canvasSfondo, canvasGioco) {
  const percorso = preparaPercorso(mappaAttiva.percorso)
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms
  const raggioToccoQuadrato =
    grafica.caselle.raggio_tocco * grafica.caselle.raggio_tocco

  const nemici = creaGestoreNemici(percorso)
  const proiettili = creaGestoreProiettili(nemici.applicaDanno)
  const torri = creaGestoreTorri(nemici, proiettili)

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0
  }))

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  // -1 = niente selezionato. Se sulla casella c'e' una torre e' "torre",
  // altrimenti e' la conferma di costruzione.
  let casellaScelta = NESSUNA
  let avvisaSelezione = null

  function accodaComando(tipo, x, y) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.x = x
    comando.y = y
  }

  // Chiamata solo quando la selezione cambia (un tocco), mai a ogni frame:
  // qui creare un oggetto per React e' legittimo.
  function notificaSelezione() {
    if (!avvisaSelezione) {
      return
    }
    if (casellaScelta === NESSUNA) {
      avvisaSelezione(null)
      return
    }
    const casella = mappaAttiva.caselle[casellaScelta]
    const statistiche = statisticheSuCasella(casella)
    statistiche.costruita = torri.torreSuCasella(casellaScelta) !== null
    avvisaSelezione(statistiche)
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
        if (casellaScelta !== NESSUNA) {
          torri.piazza(casellaScelta)
          // resta selezionata: cosi' si vede subito il raggio della torre nuova
          notificaSelezione()
        }
      } else if (comando.tipo === 'annulla') {
        casellaScelta = NESSUNA
        notificaSelezione()
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
    nemici.aggiorna(simulazione.passo_ms, passoSecondi)
    torri.aggiorna(simulazione.passo_ms)
    proiettili.aggiorna(passoSecondi)
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

  // --- comandi dall'interfaccia ---

  function tocca(xSchermo, ySchermo) {
    const punto = aCoordinateLogiche(canvasGioco, area, xSchermo, ySchermo)
    accodaComando('tocco', punto.x, punto.y)
  }

  function costruisci() {
    accodaComando('costruisci', 0, 0)
  }

  function annulla() {
    accodaComando('annulla', 0, 0)
  }

  function impostaAscoltatoreSelezione(ascoltatore) {
    avvisaSelezione = ascoltatore
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    tocca,
    costruisci,
    annulla,
    impostaAscoltatoreSelezione
  }
}
