// Le sagome: **ogni cosa si disegna una volta sola, e poi si copia.**
//
// Prima ogni albero veniva ridisegnato da capo a ogni fotogramma con dieci
// operazioni di tracciato. Questo mette un tetto bassissimo a quanto dettaglio
// ci si puo' permettere: ogni foglia in piu' costa sessanta volte al secondo.
//
// Qui le sagome si disegnano **una volta all'avvio** dentro una tela nascosta,
// grandi e piene di dettagli, e durante il gioco si copiano e basta. Il
// risultato e' che si puo' spendere: tronchi con la loro ombra, gruppi di
// foglie, muschio sui sassi, venature sul legno. E costa **meno** di prima,
// perche' copiare un rettangolo di pixel e' l'operazione piu' veloce che una
// tela sappia fare.
//
// **Ogni cosa ha piu' varianti.** Un bosco in cui gli otto alberi sono
// identici si legge come un timbro ripetuto; con tre varianti e una rotazione
// stabile diventa un bosco.
//
// I colori vengono da `isola.json`, come tutto il resto: qui non c'e' nessuna
// tinta scritta a mano. Le proporzioni delle forme invece sono disegno, non
// bilanciamento, e stanno qui.

import { grafica } from './config.js'

const LATO = grafica.sagome.lato
const VARIANTI = grafica.sagome.varianti

// rumore deterministico: le stesse sagome a ogni avvio
function caso(seme, giro) {
  const v = Math.sin(seme * 127.1 + giro * 311.7) * 43758.5453
  return v - Math.floor(v)
}

// Schiarisce o scurisce un colore. Serve a ricavare le sfumature dai tre
// colori che ogni risorsa dichiara, invece di chiederne otto in configurazione.
function tinta(colore, quanto) {
  const n = parseInt(colore.slice(1, 7), 16)
  const passa = (v) => Math.max(0, Math.min(255, Math.round(v + quanto * 255)))
  const r = passa((n >> 16) & 255)
  const g = passa((n >> 8) & 255)
  const b = passa(n & 255)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

function cerchio(ctx, x, y, raggio) {
  ctx.beginPath()
  ctx.arc(x, y, raggio, 0, Math.PI * 2)
  ctx.fill()
}

// --- un albero ---
//
// Tronco con la sua ombra, cinque gruppi di foglie in tre verdi diversi, e la
// luce che viene sempre dallo stesso lato. Le foglie si disegnano dal basso
// verso l'alto cosi' quelle davanti coprono quelle dietro.
function albero(ctx, dati, variante) {
  const c = LATO / 2
  const raggio = LATO * 0.3
  const scuro = tinta(dati.colore_chioma, -0.18)
  const chiaro = tinta(dati.colore_chioma, 0.12)

  // il tronco, con il lato in ombra
  const largo = LATO * 0.075
  const alto = LATO * 0.2
  ctx.fillStyle = dati.colore_tronco
  ctx.fillRect(c - largo / 2, c + raggio * 0.35, largo, alto)
  ctx.fillStyle = tinta(dati.colore_tronco, -0.08)
  ctx.fillRect(c + largo * 0.1, c + raggio * 0.35, largo * 0.4, alto)

  const quanti = 5
  const giro = caso(variante, 1) * Math.PI * 2
  const centri = []
  for (let i = 0; i < quanti; i++) {
    const angolo = giro + (i / quanti) * Math.PI * 2
    const distanza = raggio * (0.38 + caso(variante, i + 2) * 0.16)
    centri.push([
      c + Math.cos(angolo) * distanza,
      c + Math.sin(angolo) * distanza * 0.85 - raggio * 0.12,
      raggio * (0.52 + caso(variante, i + 9) * 0.18)
    ])
  }

  // il contorno: la stessa sagoma piu' grande e piu' scura, sotto
  ctx.fillStyle = dati.colore
  for (const [x, y, r] of centri) {
    cerchio(ctx, x, y, r + LATO * 0.022)
  }
  cerchio(ctx, c, c - raggio * 0.12, raggio * 0.62 + LATO * 0.022)

  // il corpo
  ctx.fillStyle = dati.colore_chioma
  for (const [x, y, r] of centri) {
    cerchio(ctx, x, y, r)
  }
  cerchio(ctx, c, c - raggio * 0.12, raggio * 0.62)

  // le foglie in ombra, in basso a destra
  ctx.fillStyle = scuro
  for (let i = 0; i < quanti; i++) {
    const [x, y, r] = centri[i]
    if (x < c - raggio * 0.1 || y < c) {
      continue
    }
    cerchio(ctx, x + r * 0.12, y + r * 0.18, r * 0.72)
  }

  // e la luce, in alto a sinistra
  ctx.fillStyle = chiaro
  for (let i = 0; i < quanti; i++) {
    const [x, y, r] = centri[i]
    if (x > c || y > c - raggio * 0.2) {
      continue
    }
    cerchio(ctx, x - r * 0.14, y - r * 0.2, r * 0.5)
  }
  cerchio(ctx, c - raggio * 0.22, c - raggio * 0.48, raggio * 0.2)
}

// --- un masso, una frana ---
//
// Tre facce invece di una palla: una in luce, una in mezzo, una in ombra. E
// qualche chiazza di muschio, che e' quello che distingue un sasso da un
// cerchio grigio.
function sasso(ctx, dati, variante) {
  const c = LATO / 2
  const raggio = LATO * 0.29
  const giro = caso(variante, 3) * Math.PI * 2

  ctx.fillStyle = dati.colore_tronco
  cerchio(ctx, c, c, raggio + LATO * 0.022)

  ctx.fillStyle = dati.colore
  cerchio(ctx, c, c, raggio)

  // la faccia in luce
  ctx.fillStyle = dati.colore_chioma
  ctx.beginPath()
  ctx.moveTo(c - raggio * 0.7, c - raggio * 0.1)
  ctx.lineTo(c - raggio * 0.1, c - raggio * 0.75)
  ctx.lineTo(c + raggio * 0.55, c - raggio * 0.3)
  ctx.lineTo(c + raggio * 0.1, c + raggio * 0.25)
  ctx.closePath()
  ctx.fill()

  // la faccia di mezzo
  ctx.fillStyle = tinta(dati.colore_chioma, -0.09)
  ctx.beginPath()
  ctx.moveTo(c + raggio * 0.55, c - raggio * 0.3)
  ctx.lineTo(c + raggio * 0.8, c + raggio * 0.3)
  ctx.lineTo(c + raggio * 0.1, c + raggio * 0.25)
  ctx.closePath()
  ctx.fill()

  // qualche granello, e il muschio
  ctx.fillStyle = tinta(dati.colore, -0.06)
  for (let i = 0; i < 4; i++) {
    const angolo = giro + i * 1.7
    cerchio(
      ctx,
      c + Math.cos(angolo) * raggio * 0.45,
      c + Math.sin(angolo) * raggio * 0.45,
      raggio * 0.09
    )
  }
  ctx.fillStyle = 'rgba(110,160,70,0.5)'
  cerchio(ctx, c - raggio * 0.45 + caso(variante, 7) * raggio * 0.3, c + raggio * 0.55, raggio * 0.2)
  cerchio(ctx, c + raggio * 0.3, c + raggio * 0.62, raggio * 0.13)
}

// --- il casotto ---
//
// L'unica cosa costruita da qualcuno. Assi verticali sul corpo, tegole sul
// tetto, una porta e una finestra: fra le sagome tonde della natura si
// riconosce senza leggere niente.
function casotto(ctx, dati) {
  const c = LATO / 2
  const largo = LATO * 0.62
  const alto = LATO * 0.4
  const su = c - alto * 0.15

  ctx.fillStyle = dati.colore
  ctx.fillRect(c - largo / 2, su, largo, alto)

  // le assi
  ctx.strokeStyle = tinta(dati.colore, -0.07)
  ctx.lineWidth = LATO * 0.012
  ctx.beginPath()
  for (let i = 1; i < 5; i++) {
    const x = c - largo / 2 + (largo / 5) * i
    ctx.moveTo(x, su)
    ctx.lineTo(x, su + alto)
  }
  ctx.stroke()

  // il tetto
  ctx.fillStyle = dati.colore_chioma
  ctx.beginPath()
  ctx.moveTo(c - largo * 0.66, su + LATO * 0.02)
  ctx.lineTo(c, su - alto * 0.75)
  ctx.lineTo(c + largo * 0.66, su + LATO * 0.02)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = tinta(dati.colore_chioma, -0.12)
  ctx.lineWidth = LATO * 0.014
  ctx.beginPath()
  for (let i = 1; i < 4; i++) {
    const q = i / 4
    ctx.moveTo(c - largo * 0.66 * (1 - q), su + LATO * 0.02 - alto * 0.77 * q)
    ctx.lineTo(c + largo * 0.66 * (1 - q), su + LATO * 0.02 - alto * 0.77 * q)
  }
  ctx.stroke()

  // la porta e la finestra
  ctx.fillStyle = dati.colore_tronco
  ctx.fillRect(c - largo * 0.14, su + alto * 0.36, largo * 0.28, alto * 0.64)
  ctx.fillStyle = 'rgba(255,225,150,0.85)'
  ctx.fillRect(c + largo * 0.22, su + alto * 0.2, largo * 0.2, alto * 0.26)
  ctx.fillStyle = 'rgba(255,225,150,0.55)'
  ctx.fillRect(c - largo * 0.42, su + alto * 0.2, largo * 0.2, alto * 0.26)
}

// --- l'operaio ---
//
// Visto da sopra e un po' di lato: cappello, spalle, e le braccia. Non e' un
// personaggio da guidare — non lo si muove — ma deve **sembrare qualcuno**,
// perche' guardarlo lavorare e' meta' del gioco.
function operaio(ctx, colore, coloreBordo) {
  const c = LATO / 2
  const raggio = LATO * 0.2

  // il corpo
  ctx.fillStyle = tinta(colore, -0.22)
  cerchio(ctx, c, c + raggio * 0.35, raggio * 0.92)
  ctx.fillStyle = colore
  cerchio(ctx, c, c + raggio * 0.3, raggio * 0.8)

  // le braccia
  ctx.fillStyle = tinta(colore, -0.1)
  cerchio(ctx, c - raggio * 0.78, c + raggio * 0.35, raggio * 0.3)
  cerchio(ctx, c + raggio * 0.78, c + raggio * 0.35, raggio * 0.3)

  // la testa
  ctx.fillStyle = tinta(colore, -0.22)
  cerchio(ctx, c, c - raggio * 0.42, raggio * 0.62)
  ctx.fillStyle = '#e8c9a0'
  cerchio(ctx, c, c - raggio * 0.42, raggio * 0.5)

  // il cappello: e' quello che lo rende riconoscibile a colpo d'occhio
  ctx.fillStyle = coloreBordo
  cerchio(ctx, c, c - raggio * 0.55, raggio * 0.66)
  ctx.fillStyle = tinta(coloreBordo, -0.15)
  cerchio(ctx, c, c - raggio * 0.72, raggio * 0.4)
}

// --- la cassa ---
function cassa(ctx, dati) {
  const c = LATO / 2
  const largo = LATO * 0.52
  const alto = LATO * 0.42

  ctx.fillStyle = tinta(dati.colore, -0.2)
  ctx.fillRect(c - largo / 2 - LATO * 0.016, c - alto / 2 - LATO * 0.016, largo + LATO * 0.032, alto + LATO * 0.032)
  ctx.fillStyle = dati.colore
  ctx.fillRect(c - largo / 2, c - alto / 2, largo, alto)

  // il coperchio
  ctx.fillStyle = tinta(dati.colore, 0.08)
  ctx.fillRect(c - largo / 2, c - alto / 2, largo, alto * 0.34)

  // le fasce di metallo e la serratura
  ctx.fillStyle = dati.colore_bordo
  ctx.fillRect(c - largo / 2, c - alto * 0.02, largo, alto * 0.12)
  ctx.fillRect(c - largo * 0.42, c - alto / 2, largo * 0.1, alto)
  ctx.fillRect(c + largo * 0.32, c - alto / 2, largo * 0.1, alto)
  ctx.fillStyle = dati.colore_pieno
  ctx.fillRect(c - largo * 0.07, c - alto * 0.06, largo * 0.14, alto * 0.2)
}


// --- la segheria ---
//
// **Il corpo si cuoce nell'atlante, la lama no.** La lama gira, e una cosa che
// gira non si puo' cuocere una volta sola: si disegna a parte e la si ruota
// quando si copia. Costa un `drawImage` con una rotazione — cioe' niente — e
// in cambio la macchina si vede lavorare, che e' il punto di tutto il §9.
function segheria(ctx, dati) {
  const c = LATO / 2
  const largo = LATO * 0.66
  const alto = LATO * 0.5

  // l'ombra sotto, che la stacca dal terreno
  ctx.fillStyle = 'rgba(0,0,0,0.18)'
  ctx.beginPath()
  ctx.ellipse(c, c + alto * 0.5, largo * 0.5, alto * 0.16, 0, 0, Math.PI * 2)
  ctx.fill()

  // il basamento di pietra
  ctx.fillStyle = tinta(dati.colore, -0.26)
  ctx.fillRect(c - largo / 2, c + alto * 0.16, largo, alto * 0.3)

  // il capannone
  ctx.fillStyle = dati.colore
  ctx.fillRect(c - largo / 2, c - alto * 0.32, largo, alto * 0.5)
  ctx.fillStyle = tinta(dati.colore, 0.1)
  ctx.fillRect(c - largo / 2, c - alto * 0.32, largo, alto * 0.1)

  // le assi verticali: senza, il capannone e' un rettangolo marrone
  ctx.fillStyle = tinta(dati.colore, -0.12)
  for (let i = 1; i < 5; i++) {
    ctx.fillRect(c - largo / 2 + (largo * i) / 5, c - alto * 0.32, LATO * 0.012, alto * 0.5)
  }

  // il tetto spiovente
  ctx.fillStyle = dati.colore_bordo
  ctx.beginPath()
  ctx.moveTo(c - largo * 0.56, c - alto * 0.32)
  ctx.lineTo(c, c - alto * 0.62)
  ctx.lineTo(c + largo * 0.56, c - alto * 0.32)
  ctx.closePath()
  ctx.fill()

  // la bocca del forno, dove si vede la fiamma quando lavora
  ctx.fillStyle = tinta(dati.colore, -0.42)
  ctx.fillRect(c - largo * 0.4, c + alto * 0.02, largo * 0.24, alto * 0.16)

  // il ceppo su cui appoggia il tronco
  ctx.fillStyle = tinta(dati.colore_bordo, -0.3)
  ctx.fillRect(c + largo * 0.1, c + alto * 0.04, largo * 0.3, alto * 0.12)
}

// La lama, da sola e centrata: si ruota quando si copia.
function lama(ctx, dati) {
  const c = LATO / 2
  const r = LATO * 0.19

  ctx.fillStyle = tinta(dati.colore_lama, -0.35)
  ctx.beginPath()
  ctx.arc(c, c, r * 1.06, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = dati.colore_lama
  ctx.beginPath()
  ctx.arc(c, c, r, 0, Math.PI * 2)
  ctx.fill()

  // i denti: sono loro che fanno leggere il movimento quando gira
  ctx.fillStyle = tinta(dati.colore_lama, -0.45)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(c + Math.cos(a) * r, c + Math.sin(a) * r)
    ctx.lineTo(c + Math.cos(a + 0.16) * r * 1.16, c + Math.sin(a + 0.16) * r * 1.16)
    ctx.lineTo(c + Math.cos(a + 0.32) * r, c + Math.sin(a + 0.32) * r)
    ctx.closePath()
    ctx.fill()
  }

  // il mozzo
  ctx.fillStyle = tinta(dati.colore_lama, -0.2)
  ctx.beginPath()
  ctx.arc(c, c, r * 0.22, 0, Math.PI * 2)
  ctx.fill()
}

// L'atlante: una tela nascosta con tutte le sagome in fila. Si costruisce una
// volta sola, al primo disegno.
let atlante = null
const posti = {}

function prepara(elencoRisorse, aspettoCassa, aspettoOperaio, aspettiMacchine) {
  const voci = []
  for (const nome in elencoRisorse) {
    const dati = elencoRisorse[nome]
    if (!dati.colore_chioma || dati.giacimento) {
      continue
    }
    const quante = dati.squadrata ? 1 : VARIANTI
    for (let v = 0; v < quante; v++) {
      voci.push([nome + ':' + v, dati, v, dati.squadrata ? casotto : nome === 'albero' ? albero : sasso])
    }
  }
  voci.push(['cassa:0', aspettoCassa, 0, cassa])
  voci.push(['operaio:0', aspettoOperaio, 0, null])
  for (let i = 0; i < aspettiMacchine.length; i++) {
    voci.push([aspettiMacchine[i].id + ':0', aspettiMacchine[i], 0, segheria])
    voci.push([aspettiMacchine[i].id + '_lama:0', aspettiMacchine[i], 0, lama])
  }

  const perRiga = Math.ceil(Math.sqrt(voci.length))
  const tela = document.createElement('canvas')
  tela.width = perRiga * LATO
  tela.height = Math.ceil(voci.length / perRiga) * LATO
  const ctx = tela.getContext('2d')

  voci.forEach(([chiave, dati, variante, disegna], i) => {
    const x = (i % perRiga) * LATO
    const y = Math.floor(i / perRiga) * LATO
    posti[chiave] = { x, y }
    ctx.save()
    ctx.translate(x, y)
    if (disegna) {
      disegna(ctx, dati, variante)
    } else {
      operaio(ctx, dati.colore, dati.colore_bordo)
    }
    ctx.restore()
  })

  atlante = tela
}

export function preparaSagome(elencoRisorse, aspettoCassa, aspettoOperaio, aspettiMacchine) {
  if (!atlante) {
    prepara(elencoRisorse, aspettoCassa, aspettoOperaio, aspettiMacchine || [])
  }
}

// Copia una sagoma. E' l'operazione piu' veloce che una tela sappia fare, e
// dentro il ciclo di disegno non alloca niente.
// **Il contorno si disegna qui, non dentro la sagoma.** Prima era cotto nel
// disegno, e quindi rimpiccioliva insieme a lui: da lontano un contorno di
// mezzo pixel non esiste, ed e' esattamente quando serve di piu'. Adesso e' una
// copia in piu' della stessa sagoma, tutta scura, spostata di qualche pixel
// **di schermo** — costa un `drawImage` per oggetto e non si assottiglia mai.
function contorno(ctx, posto, x, y, dimensione, spessore, colore) {
  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.filter = 'brightness(0)'
  ctx.globalAlpha = colore
  for (let a = 0; a < 4; a++) {
    const dx = a === 0 ? -spessore : a === 1 ? spessore : 0
    const dy = a === 2 ? -spessore : a === 3 ? spessore : 0
    ctx.drawImage(
      atlante,
      posto.x,
      posto.y,
      LATO,
      LATO,
      x - dimensione / 2 + dx,
      y - dimensione / 2 + dy,
      dimensione,
      dimensione
    )
  }
  ctx.restore()
}

export function disegnaSagoma(ctx, chiave, variante, x, y, dimensione, bordo) {
  const posto = posti[chiave + ':' + (variante % VARIANTI)] || posti[chiave + ':0']
  if (!posto || !atlante) {
    return false
  }
  if (bordo && bordo.spessore > 0) {
    contorno(ctx, posto, x, y, dimensione, bordo.spessore, bordo.forza)
  }
  ctx.drawImage(
    atlante,
    posto.x,
    posto.y,
    LATO,
    LATO,
    x - dimensione / 2,
    y - dimensione / 2,
    dimensione,
    dimensione
  )
  return true
}
