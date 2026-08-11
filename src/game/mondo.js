// L'isola.
//
// E' una mappa a tessere, ma le tessere **non si vedono**: servono solo a far
// agganciare le cose, esattamente come in Factorio. Sopra ci va un posto.
//
// La mappa si legge una volta sola all'avvio e diventa due elenchi piatti:
// il fondo (acqua, sabbia, erba) e quello che ci sta sopra (alberi, massi,
// frane, il casotto). Dentro il ciclo di gioco non si rilegge niente.

import { isola, legenda, risorse, terreni, tessera } from './config.js'

const righe = isola.mappa

export const colonne = righe[0].length
export const filari = righe.length
export const larghezzaMondo = colonne * tessera
export const altezzaMondo = filari * tessera

// Per ogni tessera: il nome del fondo, e il nome di quello che ci sta sopra
// (stringa vuota se non c'e' niente). Elenchi piatti, indicizzati y * colonne + x.
export const fondo = new Array(colonne * filari)
export const sopra = new Array(colonne * filari)

// La variazione del terreno: una **macchia tonda**, non un quadrato. Un
// quadrato piu' chiaro dentro una griglia di quadrati si legge come una
// scacchiera, ed e' proprio la cosa da evitare.
//
// Posizione e raggio sono stabili per tessera e calcolati una volta sola:
// dentro il ciclo di gioco non si tira mai a caso.
export const macchia = new Uint8Array(colonne * filari)
export const macchiaX = new Float32Array(colonne * filari)
export const macchiaY = new Float32Array(colonne * filari)
export const macchiaR = new Float32Array(colonne * filari)

// rumore deterministico: stessa isola a ogni avvio, ma senza schema visibile
function caso(x, y, seme) {
  const v = Math.sin(x * 127.1 + y * 311.7 + seme * 74.7) * 43758.5453
  return v - Math.floor(v)
}

for (let y = 0; y < filari; y++) {
  for (let x = 0; x < colonne; x++) {
    const indice = y * colonne + x
    const nome = legenda[righe[y][x]]
    if (terreni[nome]) {
      fondo[indice] = nome
      sopra[indice] = ''
    } else {
      // quello che sta sopra poggia sempre sull'erba
      fondo[indice] = 'erba'
      sopra[indice] = nome
    }
    macchia[indice] = caso(x, y, 1) < 0.42 ? 1 : 0
    macchiaX[indice] = (caso(x, y, 2) - 0.5) * 2
    macchiaY[indice] = (caso(x, y, 3) - 0.5) * 2
    macchiaR[indice] = caso(x, y, 4)
  }
}

export function dentro(tx, ty) {
  return tx >= 0 && ty >= 0 && tx < colonne && ty < filari
}

export function indiceDi(tx, ty) {
  return ty * colonne + tx
}

export function fondoIn(tx, ty) {
  return dentro(tx, ty) ? fondo[indiceDi(tx, ty)] : 'acqua'
}

export function risorsaIn(tx, ty) {
  return dentro(tx, ty) ? sopra[indiceDi(tx, ty)] : ''
}

// Si puo' camminarci? Serve ai braccianti: l'acqua no, e neanche le tessere
// occupate da un albero o da un masso.
export function calpestabile(tx, ty) {
  if (!dentro(tx, ty)) {
    return false
  }
  const indice = indiceDi(tx, ty)
  if (!terreni[fondo[indice]].calpestabile) {
    return false
  }
  const cosa = sopra[indice]
  return !cosa || !risorse[cosa].blocca
}

export function togliRisorsa(tx, ty) {
  if (dentro(tx, ty)) {
    sopra[indiceDi(tx, ty)] = ''
  }
}

// Il centro di una tessera in coordinate del mondo: e' li' che va un bracciante.
export function centroTessera(tx, ty, esito) {
  esito.x = tx * tessera + tessera / 2
  esito.y = ty * tessera + tessera / 2
}

export function tessereDaMondo(x, y, esito) {
  esito.tx = Math.floor(x / tessera)
  esito.ty = Math.floor(y / tessera)
}

// Una tessera libera accanto a quella indicata: un albero non e' calpestabile,
// quindi il taglialegna si mette **di fianco** e lavora da li'.
const attorno = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1]
]

export function tesseraAccanto(tx, ty, esito) {
  for (let i = 0; i < attorno.length; i++) {
    const ax = tx + attorno[i][0]
    const ay = ty + attorno[i][1]
    if (calpestabile(ax, ay)) {
      esito.tx = ax
      esito.ty = ay
      return true
    }
  }
  return false
}
