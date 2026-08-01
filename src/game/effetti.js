// Gli effetti visivi: anelli di impatto, dissolvenze di morte, onde di
// piazzamento e numeri dell'oro che salgono. Tutto da pool preallocati,
// come impone td-canvas-loop: si accende e si spegne, mai creare al volo.
//
// L'unica creazione ammessa e' la stringa del popup dell'oro, costruita
// una volta alla morte del nemico (un evento, non un frame).

import { grafica, limiti } from './config.js'
import { creaPool, primoLibero } from './pool.js'

const stile = grafica.effetti

// Curva morbida per le cose che appaiono: parte rapida, arriva piano.
function curvaUscita(t) {
  return 1 - (1 - t) * (1 - t)
}

export function creaGestoreEffetti() {
  // anelli: impatto, morte e onda di piazzamento condividono il pool,
  // cambia solo il blocco di stile con cui vengono disegnati
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

  const popup = creaPool(limiti.popup_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    tempoMs: 0,
    testo: ''
  }))

  // il font si costruisce una volta sola, non a ogni frame
  const fontPopup = 'bold ' + stile.popup_oro.dimensione_testo + 'px system-ui, sans-serif'

  // raggio: se assente si usa quello del blocco di stile. Serve agli effetti
  // che seguono il raggio reale di una torre (esplosione, impulso di gelo).
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

  function ondaPiazzamento(x, y) {
    accendiAnello(x, y, stile.onda_piazzamento, 0)
  }

  function esplosione(x, y, raggio) {
    accendiAnello(x, y, stile.esplosione, raggio)
  }

  function impulsoGelo(x, y, raggio) {
    accendiAnello(x, y, stile.impulso_gelo, raggio)
  }

  function popupOro(x, y, oro) {
    const voce = primoLibero(popup)
    if (!voce) {
      return
    }
    voce.attivo = true
    voce.x = x
    voce.y = y
    voce.tempoMs = 0
    voce.testo = '+' + oro
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
    for (let i = 0; i < popup.length; i++) {
      const voce = popup[i]
      if (!voce.attivo) {
        continue
      }
      voce.tempoMs += passoMs
      if (voce.tempoMs >= stile.popup_oro.durata_ms) {
        voce.attivo = false
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

    let fontImpostato = false
    for (let i = 0; i < popup.length; i++) {
      const voce = popup[i]
      if (!voce.attivo) {
        continue
      }
      if (!fontImpostato) {
        ctx.font = fontPopup
        ctx.textAlign = 'center'
        fontImpostato = true
      }
      const t = curvaUscita(voce.tempoMs / stile.popup_oro.durata_ms)
      const y = voce.y - stile.popup_oro.salita * t
      ctx.globalAlpha = 1 - t
      ctx.lineWidth = stile.popup_oro.spessore_contorno
      ctx.strokeStyle = stile.popup_oro.colore_contorno
      ctx.strokeText(voce.testo, voce.x, y)
      ctx.fillStyle = stile.popup_oro.colore
      ctx.fillText(voce.testo, voce.x, y)
      ctx.globalAlpha = 1
    }
  }

  function svuota() {
    for (let i = 0; i < anelli.length; i++) {
      anelli[i].attivo = false
    }
    for (let i = 0; i < popup.length; i++) {
      popup[i].attivo = false
    }
  }

  return {
    impatto,
    morte,
    ondaPiazzamento,
    esplosione,
    impulsoGelo,
    popupOro,
    aggiorna,
    disegna,
    svuota
  }
}
