// Disegno dello sfondo: terreno, sentiero, uscita dei nemici, castello, torri.
// Gira una volta sola all'avvio e poi solo se cambia la dimensione della
// finestra. Mai dentro il ciclo di gioco.

import { area, campo, grafica } from './config.js'
import { distanzePresidi, perOgniTratto, posizionaSulSentiero } from './percorso.js'

function rettangoloArrotondato(ctx, x, y, larghezza, altezza, raggio) {
  ctx.beginPath()
  ctx.moveTo(x + raggio, y)
  ctx.arcTo(x + larghezza, y, x + larghezza, y + altezza, raggio)
  ctx.arcTo(x + larghezza, y + altezza, x, y + altezza, raggio)
  ctx.arcTo(x, y + altezza, x, y, raggio)
  ctx.arcTo(x, y, x + larghezza, y, raggio)
  ctx.closePath()
}

function tracciaSentiero(ctx) {
  const punti = campo.sentiero
  ctx.beginPath()
  ctx.moveTo(punti[0].x, punti[0].y)
  for (let i = 1; i < punti.length; i++) {
    ctx.lineTo(punti[i].x, punti[i].y)
  }
}

function disegnaSentiero(ctx) {
  const stile = grafica.campo

  // il sentiero e' una linea spessa che segue la spezzata: gli angoli tondi
  // evitano le punte agli spigoli delle curve
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  tracciaSentiero(ctx)
  ctx.strokeStyle = stile.colore_bordo_sentiero
  ctx.lineWidth = campo.larghezza_sentiero + stile.spessore_bordo_sentiero * 2
  ctx.stroke()

  tracciaSentiero(ctx)
  ctx.strokeStyle = stile.colore_sentiero
  ctx.lineWidth = campo.larghezza_sentiero
  ctx.stroke()

  // traversine di traverso alla strada: senza un riferimento regolare non si
  // legge quanta strada hanno fatto i nemici
  const meta = campo.larghezza_sentiero / 2
  ctx.strokeStyle = stile.colore_traversine
  ctx.lineWidth = stile.spessore_traversine
  perOgniTratto((tratto) => {
    for (let d = stile.distanza_traversine; d < tratto.lunghezza; d += stile.distanza_traversine) {
      const centroX = tratto.x + tratto.versoX * d
      const centroY = tratto.y + tratto.versoY * d
      ctx.beginPath()
      ctx.moveTo(centroX - tratto.lateraleX * meta, centroY - tratto.lateraleY * meta)
      ctx.lineTo(centroX + tratto.lateraleX * meta, centroY + tratto.lateraleY * meta)
      ctx.stroke()
    }
  })
}

function disegnaUscitaNemici(ctx) {
  const stile = grafica.uscita_nemici
  const posto = campo.uscita_nemici

  rettangoloArrotondato(
    ctx,
    posto.x - posto.larghezza / 2,
    posto.y - posto.altezza / 2,
    posto.larghezza,
    posto.altezza,
    stile.raggio_angoli
  )
  ctx.fillStyle = stile.colore
  ctx.fill()
  ctx.lineWidth = stile.spessore_bordo
  ctx.strokeStyle = stile.colore_bordo
  ctx.stroke()
}

function disegnaCastello(ctx) {
  const stile = grafica.castello
  const posto = campo.castello
  const sinistra = posto.x - posto.larghezza / 2
  const alto = posto.y - posto.altezza / 2

  rettangoloArrotondato(ctx, sinistra, alto, posto.larghezza, posto.altezza, stile.raggio_angoli)
  ctx.fillStyle = stile.colore
  ctx.fill()
  ctx.lineWidth = stile.spessore_bordo
  ctx.strokeStyle = stile.colore_bordo
  ctx.stroke()

  // i merli in cima: bastano a farlo leggere come castello e non come muro
  const passo = posto.larghezza / (stile.merli * 2 - 1)
  ctx.fillStyle = stile.colore
  ctx.beginPath()
  for (let i = 0; i < stile.merli; i++) {
    ctx.rect(sinistra + passo * i * 2, alto - stile.altezza_merli, passo, stile.altezza_merli)
  }
  ctx.fill()
  ctx.stroke()
}

function disegnaTorri(ctx) {
  const stile = grafica.torre

  for (let i = 0; i < campo.torri_rendita.length; i++) {
    const torre = campo.torri_rendita[i]

    ctx.beginPath()
    ctx.arc(torre.x, torre.y, stile.raggio, 0, Math.PI * 2)
    ctx.fillStyle = stile.colore
    ctx.fill()
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = stile.colore_bordo
    ctx.stroke()

    // il tetto: un cerchio piu' piccolo dentro, cosi' si distingue da un
    // qualunque cerchio sul campo
    ctx.beginPath()
    ctx.arc(torre.x, torre.y, stile.raggio / 2, 0, Math.PI * 2)
    ctx.fillStyle = stile.colore_tetto
    ctx.fill()
  }
}

// I presidi: una fascia chiara di traverso al sentiero, nel punto dove le
// truppe si fermeranno. Vanno visti prima che ci arrivi qualcuno, altrimenti
// la sosta sembra casuale ed e' esattamente cio' che confondeva.
function disegnaPresidi(ctx) {
  const stile = grafica.presidio
  const larghezza = campo.larghezza_sentiero + stile.larghezza_extra
  const punto = { x: 0, y: 0 }

  for (let i = 0; i < distanzePresidi.length; i++) {
    posizionaSulSentiero(distanzePresidi[i], 0, punto)

    ctx.beginPath()
    ctx.moveTo(punto.x - larghezza / 2, punto.y)
    ctx.lineTo(punto.x + larghezza / 2, punto.y)
    ctx.lineWidth = stile.spessore
    ctx.lineCap = 'round'
    ctx.strokeStyle = stile.colore
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(punto.x, punto.y, stile.raggio_bollo, 0, Math.PI * 2)
    ctx.fillStyle = stile.colore_bollo
    ctx.fill()
  }
}

export function disegnaSfondo(ctx) {
  ctx.clearRect(0, 0, area.larghezza, area.altezza)

  ctx.fillStyle = grafica.campo.colore_terreno
  ctx.fillRect(0, 0, area.larghezza, area.altezza)

  disegnaSentiero(ctx)
  disegnaPresidi(ctx)
  disegnaUscitaNemici(ctx)
  disegnaCastello(ctx)
  disegnaTorri(ctx)
}
