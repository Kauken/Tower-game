// La geometria della griglia.
//
// Niente si muove liberamente: ogni cosa sta in una casella, identificata da
// colonna e riga. La posizione sullo schermo si ricava da quelle due, mai il
// contrario.
//
// Le vicinanze si calcolano **sugli indici** (colonna +/-1, riga +/-1), mai
// sulle coordinate in pixel: e' quello che le rende esatte e verificabili.
//
// Tutto qui dentro si prepara una volta sola all'avvio: dentro il ciclo di
// gioco non si calcola niente che si possa calcolare adesso.

import { area, griglia } from './config.js'

export const colonne = griglia.colonne
export const righe = griglia.righe
export const quanteCaselle = colonne * righe
export const lato = griglia.lato_casella

const passo = griglia.lato_casella + griglia.spazio
const larghezzaTotale = colonne * lato + (colonne - 1) * griglia.spazio
const altezzaTotale = righe * lato + (righe - 1) * griglia.spazio

// il margine che centra la griglia nell'area logica
const sinistra = (area.larghezza - larghezzaTotale) / 2
const alto = (area.altezza - altezzaTotale) / 2

export function colonnaDi(indice) {
  return indice % colonne
}

export function rigaDi(indice) {
  return Math.floor(indice / colonne)
}

// L'angolo in alto a sinistra della casella, in coordinate logiche.
export function angoloX(indice) {
  return sinistra + colonnaDi(indice) * passo
}

export function angoloY(indice) {
  return alto + rigaDi(indice) * passo
}

export function centroX(indice) {
  return angoloX(indice) + lato / 2
}

export function centroY(indice) {
  return angoloY(indice) + lato / 2
}

// Quale casella sta sotto un punto, in coordinate logiche. -1 se nessuna:
// toccare lo spazio fra due caselle non deve attivarne una a caso.
export function casellaSotto(x, y) {
  const colonna = Math.floor((x - sinistra) / passo)
  const riga = Math.floor((y - alto) / passo)
  if (colonna < 0 || colonna >= colonne || riga < 0 || riga >= righe) {
    return -1
  }
  // dentro il passo, ma nello spazio fra due caselle
  if (x - sinistra - colonna * passo > lato || y - alto - riga * passo > lato) {
    return -1
  }
  return riga * colonne + colonna
}

// I vicini di ogni casella, gia' calcolati: sopra, sotto, destra, sinistra.
// Mai in diagonale — le diagonali renderebbero ogni casella vicina a otto
// altre, e a quel punto il piazzamento non sarebbe piu' un puzzle.
export const vicini = []

for (let indice = 0; indice < quanteCaselle; indice++) {
  const colonna = colonnaDi(indice)
  const riga = rigaDi(indice)
  const elenco = []
  if (riga > 0) elenco.push(indice - colonne)
  if (riga < righe - 1) elenco.push(indice + colonne)
  if (colonna > 0) elenco.push(indice - 1)
  if (colonna < colonne - 1) elenco.push(indice + 1)
  vicini.push(elenco)
}
