// Disegno dello sfondo: il terreno e le caselle.
//
// Si ridisegna solo quando cambia la dimensione della finestra o quando il
// campo cambia forma (una casella dissodata, una abbandonata). Mai a ogni
// frame: dissodare succede poche volte in una partita.

import { area, grafica } from './config.js'
import { angoloX, angoloY, lato, quanteCaselle } from './griglia.js'

export function rettangoloArrotondato(ctx, x, y, larghezza, altezza, raggio) {
  ctx.beginPath()
  ctx.moveTo(x + raggio, y)
  ctx.arcTo(x + larghezza, y, x + larghezza, y + altezza, raggio)
  ctx.arcTo(x + larghezza, y + altezza, x, y + altezza, raggio)
  ctx.arcTo(x, y + altezza, x, y, raggio)
  ctx.arcTo(x, y, x + larghezza, y, raggio)
  ctx.closePath()
}

export function disegnaSfondo(ctx, caselle) {
  const stile = grafica.campo

  ctx.clearRect(0, 0, area.larghezza, area.altezza)
  ctx.fillStyle = stile.colore_terreno
  ctx.fillRect(0, 0, area.larghezza, area.altezza)

  ctx.lineWidth = stile.spessore_bordo_casella

  for (let i = 0; i < quanteCaselle; i++) {
    const arata = caselle[i].arata
    rettangoloArrotondato(ctx, angoloX(i), angoloY(i), lato, lato, stile.raggio_casella)
    ctx.fillStyle = arata ? stile.colore_casella : stile.colore_incolto
    ctx.fill()
    ctx.strokeStyle = arata ? stile.colore_bordo_casella : stile.colore_bordo_incolto
    ctx.stroke()

    // la terra selvatica ha dei ciuffi: si deve capire a colpo d'occhio quale
    // pezzo di campo e' gia' tuo e quale va ancora aperto
    if (arata) {
      continue
    }
    ctx.strokeStyle = stile.colore_ciuffi
    ctx.lineWidth = stile.spessore_ciuffi
    for (let c = 0; c < stile.quanti_ciuffi; c++) {
      const cx = angoloX(i) + lato * (0.24 + 0.26 * c)
      const cy = angoloY(i) + lato * (c % 2 === 0 ? 0.62 : 0.44)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx, cy - lato * 0.16)
      ctx.stroke()
    }
    ctx.lineWidth = stile.spessore_bordo_casella
  }
}
