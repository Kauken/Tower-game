// Il disegno della fattoria sul canvas di gioco: legami, contenuti, distintivi
// e selezione. Gira a ogni frame, quindi qui dentro non si alloca niente:
// niente stringhe composte, niente measureText, niente oggetti nuovi.

import { aspettoContenuto, grafica } from './config.js'
import { angoloX, angoloY, centroX, centroY, lato } from './griglia.js'
import { rettangoloArrotondato } from './sfondo.js'

// Il segno che si accende fra due caselle in sinergia. Va sotto ai contenuti,
// cosi' sembra passare da una all'altra invece che stargli sopra.
function disegnaLegami(ctx, caselle) {
  const stile = grafica.legame

  ctx.globalAlpha = stile.opacita
  ctx.strokeStyle = stile.colore
  ctx.fillStyle = stile.colore
  ctx.lineWidth = stile.spessore
  ctx.lineCap = 'round'

  for (let i = 0; i < caselle.length; i++) {
    const casella = caselle[i]
    if (casella.quantiLegami === 0) {
      continue
    }
    const daX = centroX(i)
    const daY = centroY(i)
    for (let l = 0; l < casella.quantiLegami; l++) {
      const vicino = casella.legami[l]
      ctx.beginPath()
      ctx.moveTo(daX, daY)
      ctx.lineTo(centroX(vicino), centroY(vicino))
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(daX, daY, stile.raggio_nodo, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function disegnaContenuto(ctx, casella, indice) {
  const stile = grafica.contenuto
  const dati = aspettoContenuto(casella.contenuto)
  const margine = stile.margine
  const x = angoloX(indice) + margine
  const y = angoloY(indice) + margine
  const misura = lato - margine * 2

  // comparsa: la cosa piazzata rimbalza dentro invece di apparire di colpo
  const comparsa = grafica.effetti.piazzamento
  let scala = 1
  if (casella.etaMs < comparsa.durata_ms) {
    const avanzamento = casella.etaMs / comparsa.durata_ms
    // parte piccola, supera l'uno e torna: e' il rimbalzo
    const morbido = 1 - (1 - avanzamento) * (1 - avanzamento)
    scala = comparsa.scala_iniziale + (1 - comparsa.scala_iniziale) * morbido
  }

  ctx.save()
  if (scala !== 1) {
    ctx.translate(centroX(indice), centroY(indice))
    ctx.scale(scala, scala)
    ctx.translate(-centroX(indice), -centroY(indice))
  }

  const eColtura = casella.famiglia === 'coltura'

  // la parte acerba resta smorzata, la parte cresciuta e' piena: la coltura
  // si riempie dal basso mentre matura, che e' il modo piu' leggibile di far
  // vedere il tempo che passa senza scrivere un numero
  rettangoloArrotondato(ctx, x, y, misura, misura, stile.raggio)
  ctx.fillStyle = dati.colore
  ctx.globalAlpha = eColtura ? stile.opacita_acerbo : 1
  ctx.fill()
  ctx.globalAlpha = 1

  if (eColtura && casella.tempoMaturazione > 0) {
    const quota = casella.crescitaMs / casella.tempoMaturazione
    const altezza = misura * quota
    ctx.save()
    rettangoloArrotondato(ctx, x, y, misura, misura, stile.raggio)
    ctx.clip()
    ctx.fillStyle = dati.colore
    ctx.fillRect(x, y + misura - altezza, misura, altezza)
    ctx.restore()
  }

  rettangoloArrotondato(ctx, x, y, misura, misura, stile.raggio)
  ctx.lineWidth = stile.spessore_bordo
  ctx.strokeStyle = dati.colore_bordo
  ctx.stroke()

  // matura: un anello acceso attorno. Si deve vedere da lontano che c'e' da
  // raccogliere, senza cercare
  if (casella.matura) {
    rettangoloArrotondato(
      ctx,
      x - stile.raggio_anello_maturo,
      y - stile.raggio_anello_maturo,
      misura + stile.raggio_anello_maturo * 2,
      misura + stile.raggio_anello_maturo * 2,
      stile.raggio + stile.raggio_anello_maturo
    )
    ctx.lineWidth = stile.spessore_anello_maturo
    ctx.strokeStyle = stile.colore_maturo
    ctx.stroke()
  }

  ctx.restore()
}

// La goccia sulla casella irrigata. Niente testo: un segno si legge di colpo,
// un numero va letto.
function disegnaDistintivo(ctx, casella, indice) {
  if (!casella.irrigata) {
    return
  }
  const stile = grafica.distintivo
  const x = angoloX(indice) + lato - stile.altezza - 4
  const y = angoloY(indice) + 4

  ctx.beginPath()
  ctx.arc(x + stile.altezza / 2, y + stile.altezza / 2, stile.altezza / 2, 0, Math.PI * 2)
  ctx.fillStyle = stile.colore_fondo
  ctx.fill()
}

function disegnaSelezione(ctx, indice) {
  const stile = grafica.selezione
  rettangoloArrotondato(ctx, angoloX(indice), angoloY(indice), lato, lato, stile.raggio)
  ctx.lineWidth = stile.spessore
  ctx.strokeStyle = stile.colore
  ctx.stroke()
}

export function disegnaFattoria(ctx, caselle, selezionata) {
  disegnaLegami(ctx, caselle)

  for (let i = 0; i < caselle.length; i++) {
    if (caselle[i].contenuto) {
      disegnaContenuto(ctx, caselle[i], i)
    }
  }

  for (let i = 0; i < caselle.length; i++) {
    disegnaDistintivo(ctx, caselle[i], i)
  }

  if (selezionata >= 0) {
    disegnaSelezione(ctx, selezionata)
  }
}
