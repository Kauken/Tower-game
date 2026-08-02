// Gli effetti visivi: anelli che si allargano e sfumano. Impatto di un colpo,
// morte di un nemico, comparsa dall'ingresso, esplosione ad area.
// Tutto da un pool preallocato, come impone td-canvas-loop: si accende e si
// spegne, mai creare al volo.

import { grafica, limiti } from './config.js'
import { creaPool, primoLibero } from './pool.js'

const stile = grafica.effetti

// Curva morbida per le cose che appaiono: parte rapida, arriva piano.
function curvaUscita(t) {
  return 1 - (1 - t) * (1 - t)
}

export function creaGestoreEffetti() {
  // gli anelli condividono il pool: cambia solo il blocco di stile
  const anelli = creaPool(limiti.effetti_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    tempoMs: 0,
    durataMs: 0,
    raggioMassimo: 0,
    colore: '',
    spessore: 0
  }))

  // raggio: se assente si usa quello del blocco di stile. Serve agli effetti
  // che devono seguire un raggio deciso da chi li accende (le esplosioni).
  function accendiAnello(x, y, blocco, raggio) {
    const anello = primoLibero(anelli)
    if (!anello) {
      return
    }
    anello.attivo = true
    anello.x = x
    anello.y = y
    anello.tempoMs = 0
    anello.durataMs = blocco.durata_ms
    anello.raggioMassimo = raggio > 0 ? raggio : blocco.raggio_massimo
    anello.colore = blocco.colore
    anello.spessore = blocco.spessore
  }

  function impatto(x, y) {
    accendiAnello(x, y, stile.impatto, 0)
  }

  function morte(x, y) {
    accendiAnello(x, y, stile.morte, 0)
  }

  function comparsa(x, y) {
    accendiAnello(x, y, stile.comparsa, 0)
  }

  function esplosione(x, y, raggio) {
    accendiAnello(x, y, stile.esplosione, raggio)
  }

  function aggiorna(passoMs) {
    for (let i = 0; i < anelli.length; i++) {
      const anello = anelli[i]
      if (!anello.attivo) {
        continue
      }
      anello.tempoMs += passoMs
      if (anello.tempoMs >= anello.durataMs) {
        anello.attivo = false
      }
    }
  }

  function disegna(ctx) {
    for (let i = 0; i < anelli.length; i++) {
      const anello = anelli[i]
      if (!anello.attivo) {
        continue
      }
      const t = curvaUscita(anello.tempoMs / anello.durataMs)
      ctx.beginPath()
      ctx.arc(anello.x, anello.y, anello.raggioMassimo * t, 0, Math.PI * 2)
      ctx.globalAlpha = 1 - t
      ctx.lineWidth = anello.spessore
      ctx.strokeStyle = anello.colore
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }

  function svuota() {
    for (let i = 0; i < anelli.length; i++) {
      anelli[i].attivo = false
    }
  }

  return { impatto, morte, comparsa, esplosione, aggiorna, disegna, svuota }
}
