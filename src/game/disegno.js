// Il disegno dell'isola, attraverso la telecamera.
//
// Si disegnano **solo le tessere visibili**, non tutta l'isola. Qui dentro non
// si alloca niente: niente stringhe composte, niente measureText, niente
// oggetti nuovi. Gli scratch stanno qui sopra e vengono riusati.

import { area, grafica, risorse, terreni, tessera } from './config.js'
import {
  colonne,
  filari,
  fondo,
  indiceDi,
  macchia,
  macchiaR,
  macchiaX,
  macchiaY,
  risorsaIn,
  sopra
} from './mondo.js'

const vista = { da_x: 0, a_x: 0, da_y: 0, a_y: 0 }
const punto = { x: 0, y: 0 }

// Il mare oltre i bordi dell'isola: senza, si vedrebbe il vuoto.
function disegnaFuori(ctx) {
  ctx.fillStyle = grafica.mondo.colore_mare_fuori
  ctx.fillRect(0, 0, area.larghezza, area.altezza)
}

function disegnaTerreno(ctx, camera) {
  const stile = grafica.mondo
  const lato = tessera * camera.stato.zoom + 1

  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      const indice = indiceDi(tx, ty)
      const terreno = terreni[fondo[indice]]
      camera.versoSchermo(tx * tessera, ty * tessera, punto)

      ctx.fillStyle = terreno.colore
      ctx.fillRect(punto.x, punto.y, lato, lato)

      // la variazione: una macchia TONDA, non un quadrato. Un quadrato piu'
      // chiaro dentro una griglia di quadrati si legge come una scacchiera,
      // ed e' esattamente la cosa da evitare
      if (macchia[indice]) {
        const forma = stile.macchia
        const raggio =
          (forma.raggio_minimo +
            macchiaR[indice] * (forma.raggio_massimo - forma.raggio_minimo)) *
          lato
        ctx.globalAlpha = stile.opacita_variazione
        ctx.fillStyle = terreno.variazione
        ctx.beginPath()
        ctx.arc(
          punto.x + lato / 2 + macchiaX[indice] * forma.scarto_massimo * lato,
          punto.y + lato / 2 + macchiaY[indice] * forma.scarto_massimo * lato,
          raggio,
          0,
          Math.PI * 2
        )
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
  }

  // la riva: una linea chiara dove la sabbia tocca l'acqua. E' questa che fa
  // leggere l'isola come un'isola invece che come una macchia
  ctx.strokeStyle = stile.riva.colore
  ctx.lineWidth = stile.riva.spessore
  ctx.beginPath()
  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      if (fondo[indiceDi(tx, ty)] === 'acqua') {
        continue
      }
      camera.versoSchermo(tx * tessera, ty * tessera, punto)
      const lato2 = tessera * camera.stato.zoom
      if (ty > 0 && fondo[indiceDi(tx, ty - 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y)
        ctx.lineTo(punto.x + lato2, punto.y)
      }
      if (ty < filari - 1 && fondo[indiceDi(tx, ty + 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y + lato2)
        ctx.lineTo(punto.x + lato2, punto.y + lato2)
      }
      if (tx > 0 && fondo[indiceDi(tx - 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y)
        ctx.lineTo(punto.x, punto.y + lato2)
      }
      if (tx < colonne - 1 && fondo[indiceDi(tx + 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x + lato2, punto.y)
        ctx.lineTo(punto.x + lato2, punto.y + lato2)
      }
    }
  }
  ctx.stroke()
}

function disegnaRisorse(ctx, camera) {
  const stile = grafica.risorsa
  const zoom = camera.stato.zoom
  const lato = tessera * zoom

  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      const nome = sopra[indiceDi(tx, ty)]
      if (!nome) {
        continue
      }
      const dati = risorse[nome]
      camera.versoSchermo(tx * tessera + tessera / 2, ty * tessera + tessera / 2, punto)
      const raggio = dati.raggio * lato

      // l'ombra sotto: senza, le cose sembrano appiccicate al terreno
      ctx.fillStyle = stile.ombra
      ctx.beginPath()
      ctx.ellipse(
        punto.x,
        punto.y + raggio * stile.scarto_ombra * 4,
        raggio,
        raggio * 0.45,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // il tronco, per gli alberi e per tutto il resto: e' quello che li fa
      // stare in piedi invece che galleggiare
      const larghezzaTronco = stile.raggio_tronco * lato
      const altezzaTronco = stile.altezza_tronco * lato
      ctx.fillStyle = dati.colore_tronco
      ctx.fillRect(
        punto.x - larghezzaTronco / 2,
        punto.y,
        larghezzaTronco,
        altezzaTronco
      )

      ctx.beginPath()
      if (dati.squadrata) {
        // il casotto e' l'unica cosa costruita da qualcuno: quadrata fra le
        // sagome tonde della natura, si riconosce senza leggere niente
        ctx.rect(punto.x - raggio, punto.y - raggio * 1.1, raggio * 2, raggio * 2)
      } else {
        ctx.arc(punto.x, punto.y - raggio * 0.18, raggio, 0, Math.PI * 2)
      }
      ctx.fillStyle = dati.colore_chioma
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle = dati.colore
      ctx.stroke()
    }
  }
}

// Il segno su quello a cui hai dato un ordine. Giallo se aspetta, verde se
// qualcuno ci sta gia' andando: e' l'unico modo per sapere se il comando e'
// stato raccolto senza cercare chi si sta muovendo.
function disegnaOrdini(ctx, camera, lavori) {
  const stile = grafica.ordine
  const zoom = camera.stato.zoom
  const raggio = stile.raggio * tessera * zoom

  ctx.lineWidth = stile.spessore
  ctx.setLineDash([stile.tratteggio, stile.tratteggio])
  for (let i = 0; i < lavori.coda.length; i++) {
    const lavoro = lavori.coda[i]
    if (!lavoro.attivo) {
      continue
    }
    camera.versoSchermo(
      lavoro.tx * tessera + tessera / 2,
      lavoro.ty * tessera + tessera / 2,
      punto
    )
    ctx.strokeStyle = lavoro.preso ? stile.colore_preso : stile.colore
    ctx.beginPath()
    ctx.arc(punto.x, punto.y, raggio, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.setLineDash([])
}

function disegnaBraccianti(ctx, camera, squadra) {
  const stile = grafica.bracciante
  const zoom = camera.stato.zoom
  const raggio = stile.raggio * zoom

  for (let i = 0; i < squadra.length; i++) {
    const bracciante = squadra[i]
    camera.versoSchermo(bracciante.x, bracciante.y, punto)

    ctx.fillStyle = stile.ombra
    ctx.beginPath()
    ctx.ellipse(punto.x, punto.y + raggio * 0.8, raggio, raggio * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(punto.x, punto.y, raggio, 0, Math.PI * 2)
    ctx.fillStyle = bracciante.colore
    ctx.fill()
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = bracciante.coloreBordo
    ctx.stroke()

    // la barra del lavoro: senza, un bracciante che lavora sembra impallato
    if (bracciante.stato !== 'lavora' || bracciante.lavoroTotaleMs <= 0) {
      continue
    }
    const barra = stile.barra
    const larghezza = barra.larghezza * zoom
    const altezza = barra.altezza * zoom
    const sinistra = punto.x - larghezza / 2
    const alto = punto.y - raggio - barra.distanza_sopra * zoom

    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, larghezza, altezza)
    ctx.fillStyle = barra.colore_pieno
    ctx.fillRect(
      sinistra,
      alto,
      (larghezza * bracciante.lavoroMs) / bracciante.lavoroTotaleMs,
      altezza
    )
    ctx.lineWidth = barra.spessore_bordo
    ctx.strokeStyle = barra.colore_bordo
    ctx.strokeRect(sinistra, alto, larghezza, altezza)
  }
}

export function disegnaIsola(ctx, camera, lavori, squadra) {
  camera.tessereVisibili(vista)
  disegnaFuori(ctx)
  disegnaTerreno(ctx, camera)
  disegnaRisorse(ctx, camera)
  // gli anelli vanno SOPRA alle cose, e piu' larghi di loro: sotto finivano
  // coperti dalla chioma dell'albero e l'ordine sembrava non essere partito
  disegnaOrdini(ctx, camera, lavori)
  disegnaBraccianti(ctx, camera, squadra)
}

export { risorsaIn }
