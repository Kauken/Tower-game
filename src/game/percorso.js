// La geometria del sentiero.
//
// Nemici e reclute non si muovono in due dimensioni: hanno una sola misura,
// la distanza percorsa lungo la spezzata. La posizione sullo schermo si
// ricava da quella. Cosi' due cose diventano semplici: capire chi e' davanti
// a chi, e far combattere due file senza che si manchino.
//
// I segmenti si preparano una volta sola all'avvio: dentro il ciclo di gioco
// non si calcola niente che si possa calcolare adesso.

import { campo } from './config.js'

const punti = campo.sentiero

// Per ogni tratto: da dove parte, quanto e' lungo, in che direzione va e qual
// e' la sua perpendicolare (serve per lo scostamento laterale).
const segmenti = []
let totale = 0

for (let i = 0; i < punti.length - 1; i++) {
  const da = punti[i]
  const a = punti[i + 1]
  const passoX = a.x - da.x
  const passoY = a.y - da.y
  const lunghezza = Math.sqrt(passoX * passoX + passoY * passoY)

  segmenti.push({
    x: da.x,
    y: da.y,
    versoX: passoX / lunghezza,
    versoY: passoY / lunghezza,
    // perpendicolare al verso di marcia
    lateraleX: -passoY / lunghezza,
    lateraleY: passoX / lunghezza,
    lunghezza,
    inizio: totale
  })

  totale += lunghezza
}

export const lunghezzaTotale = totale
export const distanzaMinimaInFila = campo.distanza_minima_in_fila

// Fin dove possono spingersi le reclute, contato dall'uscita dei nemici: oltre
// questa distanza si fermano e aspettano. E' la loro linea di difesa.
export const distanzaLineaDifesa = totale * (1 - campo.linea_di_difesa)

// Scrive la posizione dentro `esito` invece di restituire un oggetto nuovo:
// questa funzione gira per ogni combattente a ogni passo, e allocare qui
// significherebbe far partire il garbage collector a meta' ondata.
export function posizionaSulSentiero(distanza, scarto, esito) {
  let percorsa = distanza
  if (percorsa < 0) {
    percorsa = 0
  } else if (percorsa > lunghezzaTotale) {
    percorsa = lunghezzaTotale
  }

  let segmento = segmenti[segmenti.length - 1]
  for (let i = 0; i < segmenti.length; i++) {
    const candidato = segmenti[i]
    if (percorsa <= candidato.inizio + candidato.lunghezza) {
      segmento = candidato
      break
    }
  }

  const dentro = percorsa - segmento.inizio
  esito.x = segmento.x + segmento.versoX * dentro + segmento.lateraleX * scarto
  esito.y = segmento.y + segmento.versoY * dentro + segmento.lateraleY * scarto
}

// Serve al disegno dello sfondo: ripercorre la spezzata a passi regolari.
export function perOgniTratto(azione) {
  for (let i = 0; i < segmenti.length; i++) {
    azione(segmenti[i])
  }
}
