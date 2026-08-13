// Feedback visivi. Tutto da pool preallocato: dentro il ciclo di gioco non si
// crea niente.
//
// Due cose sole, e servono a due momenti diversi:
//   l'anello   qualcosa e' successo **li'**
//   il numero  **quanto** e' entrato nello zaino
//
// Il numero e' la conferma che il viaggio e' servito a qualcosa, ed e' quello
// che rende soddisfacente una raccolta. Senza, una scavata e' un cerchietto
// che si allarga e non si sa cosa hai preso.

import { grafica, limiti } from './config.js'
import { creaPool, primoLibero } from './pool.js'

export function creaGestoreEffetti() {
  const anelli = creaPool(limiti.effetti_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    tempoMs: 0
  }))

  // I numeri sono scritti una volta sola quando nascono: comporre una stringa
  // a ogni fotogramma sarebbe un'allocazione dentro il ciclo di disegno.
  const numeri = creaPool(limiti.effetti_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    testo: '',
    colore: '',
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

  function numero(x, y, testo, colore) {
    const voce = primoLibero(numeri)
    if (!voce) {
      return
    }
    voce.attivo = true
    voce.x = x
    voce.y = y
    voce.testo = testo
    voce.colore = colore
    voce.tempoMs = 0
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
    const durataNumero = grafica.effetti.numero.durata_ms
    for (let i = 0; i < numeri.length; i++) {
      const voce = numeri[i]
      if (!voce.attivo) {
        continue
      }
      voce.tempoMs += passoMs
      if (voce.tempoMs >= durataNumero) {
        voce.attivo = false
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

    const num = grafica.effetti.numero
    ctx.font = num.dimensione + 'px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.lineWidth = num.spessore_bordo
    ctx.lineJoin = 'round'
    for (let i = 0; i < numeri.length; i++) {
      const voce = numeri[i]
      if (!voce.attivo) {
        continue
      }
      const avanzamento = voce.tempoMs / num.durata_ms
      // sale in fretta e rallenta: una salita a velocita' costante sembra finta
      const salita = num.salita * (1 - (1 - avanzamento) * (1 - avanzamento))
      ctx.globalAlpha = avanzamento > 0.6 ? (1 - avanzamento) / 0.4 : 1
      ctx.strokeStyle = num.colore_bordo
      ctx.strokeText(voce.testo, voce.x, voce.y - salita)
      ctx.fillStyle = voce.colore || num.colore
      ctx.fillText(voce.testo, voce.x, voce.y - salita)
    }
    ctx.globalAlpha = 1
    ctx.textAlign = 'left'
  }

  function svuota() {
    for (let i = 0; i < anelli.length; i++) {
      anelli[i].attivo = false
    }
    for (let i = 0; i < numeri.length; i++) {
      numeri[i].attivo = false
    }
  }

  return { raccolta, numero, aggiorna, disegna, svuota }
}
