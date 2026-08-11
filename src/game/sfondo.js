// Disegno dello sfondo: il terreno e il reticolo delle caselle vuote.
// Gira una volta sola all'avvio e poi solo se cambia la dimensione della
// finestra. Mai dentro il ciclo di gioco.

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

export function disegnaSfondo(ctx) {
  const stile = grafica.campo

  ctx.clearRect(0, 0, area.larghezza, area.altezza)
  ctx.fillStyle = stile.colore_terreno
  ctx.fillRect(0, 0, area.larghezza, area.altezza)

  // le caselle vuote si vedono anche prima di metterci qualcosa: e' cosi' che
  // si capisce quanto spazio si ha, che e' la cosa che scarseggia
  ctx.lineWidth = stile.spessore_bordo_casella
  for (let i = 0; i < quanteCaselle; i++) {
    rettangoloArrotondato(ctx, angoloX(i), angoloY(i), lato, lato, stile.raggio_casella)
    ctx.fillStyle = stile.colore_casella
    ctx.fill()
    ctx.strokeStyle = stile.colore_bordo_casella
    ctx.stroke()
  }
}
