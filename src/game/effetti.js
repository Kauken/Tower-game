// Feedback visivi: anelli che si allargano e sfumano.
// Tutti da pool preallocato: dentro il ciclo di gioco non si crea niente.

import { grafica, limiti } from './config.js'
import { creaPool, primoLibero } from './pool.js'

export function creaGestoreEffetti() {
  const anelli = creaPool(limiti.effetti_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    tempoMs: 0
  }))

  function raccolta(x, y) {
    const anello = primoLibero(anelli)
    if (!anello) {
      return
    }
    anello.attivo = true
    anello.x = x
    anello.y = y
    anello.tempoMs = 0
  }

  function aggiorna(passoMs) {
    const durata = grafica.effetti.raccolta.durata_ms
    for (let i = 0; i < anelli.length; i++) {
      const anello = anelli[i]
      if (!anello.attivo) {
        continue
      }
      anello.tempoMs += passoMs
      if (anello.tempoMs >= durata) {
        anello.attivo = false
      }
    }
  }

  function disegna(ctx) {
    const stile = grafica.effetti.raccolta
    ctx.lineWidth = stile.spessore
    for (let i = 0; i < anelli.length; i++) {
      const anello = anelli[i]
      if (!anello.attivo) {
        continue
      }
      const avanzamento = anello.tempoMs / stile.durata_ms
      ctx.globalAlpha = 1 - avanzamento
      ctx.strokeStyle = stile.colore
      ctx.beginPath()
      ctx.arc(anello.x, anello.y, stile.raggio_massimo * avanzamento, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  function svuota() {
    for (let i = 0; i < anelli.length; i++) {
      anelli[i].attivo = false
    }
  }

  return { raccolta, aggiorna, disegna, svuota }
}
