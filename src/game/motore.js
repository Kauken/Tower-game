// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si crea nessun oggetto nuovo.

import { area, grafica, mappaAttiva, nemicoAnteprima, simulazione } from './config.js'
import { preparaPercorso, posizionaSuPercorso } from './percorso.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas } from './schermo.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const percorso = preparaPercorso(mappaAttiva.percorso)
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms

  // Unica entita' esistente in questo punto della costruzione.
  // Riusata all'infinito: quando finisce il percorso riparte, non viene ricreata.
  const nemico = {
    x: 0,
    y: 0,
    distanza: 0,
    segmento: 0,
    velocita: nemicoAnteprima.velocita,
    raggio: nemicoAnteprima.dimensione
  }
  posizionaSuPercorso(percorso, nemico)

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    // lo sfondo si ridisegna solo qui: mai dentro il ciclo
    disegnaSfondo(ctxSfondo, mappaAttiva)
  }

  function aggiorna() {
    nemico.distanza += nemico.velocita * passoSecondi
    if (nemico.distanza >= percorso.lunghezzaTotale) {
      // arrivato in fondo: scompare e riparte dall'inizio
      nemico.distanza -= percorso.lunghezzaTotale
    }
    posizionaSuPercorso(percorso, nemico)
  }

  function disegna() {
    const stile = grafica.nemico
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    ctxGioco.beginPath()
    ctxGioco.arc(nemico.x, nemico.y, nemico.raggio, 0, Math.PI * 2)
    ctxGioco.fillStyle = stile.colore
    ctxGioco.fill()
    ctxGioco.lineWidth = stile.spessore_bordo
    ctxGioco.strokeStyle = stile.colore_bordo
    ctxGioco.stroke()
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

  return { avvia, ferma, ridimensiona }
}
