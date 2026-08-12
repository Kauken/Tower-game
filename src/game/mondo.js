// L'isola.
//
// E' una mappa a tessere, ma le tessere **non si vedono**: servono solo a far
// agganciare le cose, esattamente come in Factorio. Sopra ci va un posto.
//
// Gli alberi non ricrescono da soli: tagliandone uno ti resta in mano un
// alberello, e sei tu a decidere dove ripiantarlo.
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

// Quanto manca perche' quello che sta su una tessera diventi adulto, e quanto
// ci metteva in tutto. Zero vuol dire maturo.
//
// **Niente ricresce da solo.** Un albero tagliato sparisce, e al suo posto ti
// resta in mano un alberello: se lo ripianti il bosco continua, se lo vendi no.
// Il bosco e' una cosa che gestisci, non una che aspetti — ed e' la prima
// decisione di spesa vera del gioco.
export const crescitaMs = new Float32Array(colonne * filari)
export const crescitaTotaleMs = new Float32Array(colonne * filari)

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
  if (!cosa || !risorse[cosa].blocca) {
    return true
  }
  // un alberello appena piantato non blocca: e' piccolo
  return crescitaMs[indice] > 0
}

// Ci si puo' piantare qualcosa? Serve terra libera: non l'acqua, non una
// tessera dove c'e' gia' qualcosa.
export function piantabile(tx, ty) {
  if (!dentro(tx, ty)) {
    return false
  }
  const indice = indiceDi(tx, ty)
  return terreni[fondo[indice]].calpestabile && !sopra[indice]
}

// Maturo vuol dire "si puo' raccogliere". Un albero appena ricresciuto c'e'
// ma non si tocca ancora.
export function maturoIn(tx, ty) {
  return dentro(tx, ty) && crescitaMs[indiceDi(tx, ty)] <= 0
}

// Raccogliere fa sparire quello che c'era. Punto. Quello che torna indietro e'
// nello zaino dell'operaio, ed e' li' che si decide se il bosco continua.
export function raccogliRisorsa(tx, ty) {
  if (!dentro(tx, ty)) {
    return
  }
  const indice = indiceDi(tx, ty)
  sopra[indice] = ''
  crescitaMs[indice] = 0
  crescitaTotaleMs[indice] = 0
}

// Mettere a dimora. Il moltiplicatore arriva dalle tecnologie (il Vivaio
// dimezza l'attesa) e si legge qui una volta sola, non a ogni passo.
export function pianta(tx, ty, nomeRisorsa, moltiplicatoreCrescita) {
  if (!piantabile(tx, ty)) {
    return false
  }
  const dati = risorse[nomeRisorsa]
  if (!dati) {
    return false
  }
  const indice = indiceDi(tx, ty)
  sopra[indice] = nomeRisorsa
  const quanto = dati.tempo_crescita_ms * moltiplicatoreCrescita
  crescitaMs[indice] = quanto
  crescitaTotaleMs[indice] = quanto
  return true
}

export function aggiornaMondo(passoMs) {
  for (let i = 0; i < crescitaMs.length; i++) {
    if (crescitaMs[i] > 0) {
      crescitaMs[i] -= passoMs
      if (crescitaMs[i] < 0) {
        crescitaMs[i] = 0
      }
    }
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
