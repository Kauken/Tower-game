// Disegno dello sfondo: terreno, sentiero, uscita dei nemici, castello, torri.
// Gira una volta sola all'avvio e poi solo se cambia la dimensione della
// finestra. Mai dentro il ciclo di gioco.

import { area, campo, grafica } from './config.js'
import {
  perOgniTratto,
  posizionaSulSentiero,
  postazioni,
  profonditaPostazione
} from './percorso.js'

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

// Le postazioni: un tratto di sentiero allargato, con una riga netta davanti.
// Sono il posto dove le reclute vanno a stare, e vanno viste prima ancora di
// comprare qualcosa: e' li' che si prende la decisione.
const punto = { x: 0, y: 0 }

function tracciaTrattoPostazione(ctx, postazione) {
  const stile = grafica.postazione
  const fine = postazione.distanza + profonditaPostazione
  const passo = (fine - postazione.distanza) / stile.campioni_tratto

  ctx.beginPath()
  for (let i = 0; i <= stile.campioni_tratto; i++) {
    posizionaSulSentiero(postazione.distanza + passo * i, 0, punto)
    if (i === 0) {
      ctx.moveTo(punto.x, punto.y)
    } else {
      ctx.lineTo(punto.x, punto.y)
    }
  }
}

// La riga netta davanti alla postazione: e' il punto in cui i nemici entrano
// sotto tiro.
function tracciaFronte(ctx, postazione, larghezza) {
  posizionaSulSentiero(postazione.distanza, 0, punto)
  const centroX = punto.x
  const centroY = punto.y
  posizionaSulSentiero(postazione.distanza + 1, 0, punto)
  // la perpendicolare alla marcia, ricavata dai due punti
  const versoX = punto.x - centroX
  const versoY = punto.y - centroY
  const lunghezza = Math.sqrt(versoX * versoX + versoY * versoY) || 1
  const lateraleX = (-versoY / lunghezza) * (larghezza / 2)
  const lateraleY = (versoX / lunghezza) * (larghezza / 2)

  ctx.beginPath()
  ctx.moveTo(centroX - lateraleX, centroY - lateraleY)
  ctx.lineTo(centroX + lateraleX, centroY + lateraleY)
}

function disegnaPostazioni(ctx) {
  const stile = grafica.postazione
  const larghezza = campo.larghezza_sentiero + stile.larghezza_extra

  ctx.lineJoin = 'round'
  ctx.lineCap = 'butt'

  for (let i = 0; i < postazioni.length; i++) {
    tracciaTrattoPostazione(ctx, postazioni[i])
    ctx.strokeStyle = stile.colore_tratto
    ctx.lineWidth = larghezza
    ctx.stroke()

    tracciaFronte(ctx, postazioni[i], larghezza)
    ctx.strokeStyle = stile.colore_fronte
    ctx.lineWidth = stile.spessore_fronte
    ctx.stroke()
  }

  ctx.lineCap = 'round'
}

// Il contorno acceso della postazione scelta. Questo non sta nello sfondo:
// cambia a ogni tocco, quindi si disegna sul canvas del gioco.
export function disegnaPostazioneScelta(ctx, indice) {
  if (indice < 0 || indice >= postazioni.length) {
    return
  }
  const stile = grafica.postazione
  const larghezza = campo.larghezza_sentiero + stile.larghezza_extra

  ctx.lineCap = 'butt'
  tracciaTrattoPostazione(ctx, postazioni[indice])
  ctx.strokeStyle = stile.colore_scelta
  ctx.lineWidth = larghezza
  ctx.stroke()

  tracciaFronte(ctx, postazioni[indice], larghezza)
  ctx.strokeStyle = stile.colore_fronte_scelta
  ctx.lineWidth = stile.spessore_fronte_scelta
  ctx.stroke()
  ctx.lineCap = 'round'
}

export function disegnaSfondo(ctx) {
  ctx.clearRect(0, 0, area.larghezza, area.altezza)

  ctx.fillStyle = grafica.campo.colore_terreno
  ctx.fillRect(0, 0, area.larghezza, area.altezza)

  disegnaSentiero(ctx)
  disegnaPostazioni(ctx)
  disegnaUscitaNemici(ctx)
  disegnaCastello(ctx)
  disegnaTorri(ctx)
}
