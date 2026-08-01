// Disegno dello sfondo: terreno, percorso e caselle di piazzamento.
// Gira una volta sola all'avvio e poi solo se cambia la mappa o la dimensione
// della finestra. Mai dentro il ciclo di gioco.

import { area, aspettoCasella, grafica } from './config.js'

function disegnaTerreno(ctx) {
  const terreno = grafica.terreno
  ctx.fillStyle = terreno.colore
  ctx.fillRect(0, 0, area.larghezza, area.altezza)
  ctx.strokeStyle = terreno.colore_bordo
  ctx.lineWidth = terreno.spessore_bordo
  ctx.strokeRect(0, 0, area.larghezza, area.altezza)
}

function tracciaPercorso(ctx, punti) {
  ctx.beginPath()
  ctx.moveTo(punti[0].x, punti[0].y)
  for (let i = 1; i < punti.length; i++) {
    ctx.lineTo(punti[i].x, punti[i].y)
  }
}

function disegnaPercorso(ctx, punti) {
  const stile = grafica.percorso
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // prima il bordo piu' spesso, poi il sentiero sopra: da' il senso di solco
  tracciaPercorso(ctx, punti)
  ctx.strokeStyle = stile.colore_bordo
  ctx.lineWidth = stile.spessore_bordo
  ctx.stroke()

  tracciaPercorso(ctx, punti)
  ctx.strokeStyle = stile.colore
  ctx.lineWidth = stile.spessore
  ctx.stroke()
}

function tracciaForma(ctx, forma, x, y, meta) {
  ctx.beginPath()
  if (forma === 'triangolo') {
    ctx.moveTo(x, y - meta)
    ctx.lineTo(x + meta, y + meta)
    ctx.lineTo(x - meta, y + meta)
    ctx.closePath()
  } else if (forma === 'rombo') {
    ctx.moveTo(x, y - meta)
    ctx.lineTo(x + meta, y)
    ctx.lineTo(x, y + meta)
    ctx.lineTo(x - meta, y)
    ctx.closePath()
  } else {
    ctx.rect(x - meta, y - meta, meta + meta, meta + meta)
  }
}

function disegnaCaselle(ctx, caselle) {
  const stile = grafica.caselle
  const meta = stile.lato / 2
  ctx.lineWidth = stile.spessore_bordo

  for (let i = 0; i < caselle.length; i++) {
    const casella = caselle[i]
    const aspetto = aspettoCasella(casella.tipo)
    tracciaForma(ctx, aspetto.forma, casella.x, casella.y, meta)
    ctx.fillStyle = aspetto.colore
    ctx.fill()
    ctx.strokeStyle = aspetto.colore_bordo
    ctx.stroke()
  }
}

export function disegnaSfondo(ctx, mappa) {
  ctx.clearRect(0, 0, area.larghezza, area.altezza)
  disegnaTerreno(ctx)
  disegnaPercorso(ctx, mappa.percorso)
  disegnaCaselle(ctx, mappa.caselle)
}
