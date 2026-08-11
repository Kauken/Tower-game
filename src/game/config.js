// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import grigliaJson from '../../config/griglia.json'
import contenutiJson from '../../config/contenuti.json'
import vicinanzeJson from '../../config/vicinanze.json'
import economiaJson from '../../config/economia.json'
import tempoJson from '../../config/tempo.json'
import motore from '../../config/motore.json'

// L'area logica del gioco, poi scalata sullo schermo.
export const area = grigliaJson.area
export const griglia = grigliaJson.griglia

export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

export const elencoContenuti = contenutiJson.contenuti
export const elencoMateriali = contenutiJson.materiali
export const elencoVicinanze = vicinanzeJson.vicinanze

export const partenza = economiaJson.partenza
export const spese = economiaJson.spese
export const dissodare = economiaJson.dissodare
export const mercato = economiaJson.mercato
export const tempo = tempoJson

// Cosa si puo' piantare o costruire: tutto quello che ha un costo del seme.
export const elencoPiantabili = elencoContenuti.filter((voce) => voce.costo_seme > 0)

export function trovaContenuto(id) {
  const contenuto = elencoContenuti.find((voce) => voce.id === id)
  if (!contenuto) {
    throw new Error(`Contenuto "${id}" non trovato in contenuti.json`)
  }
  return contenuto
}

export function trovaMateriale(id) {
  const materiale = elencoMateriali.find((voce) => voce.id === id)
  if (!materiale) {
    throw new Error(`Materiale "${id}" non trovato in contenuti.json`)
  }
  return materiale
}

// Controlli all'avvio: una configurazione sbagliata deve fermare il gioco
// subito con un errore parlante, non produrre un campo vuoto e muto.
if (griglia.colonne < 2 || griglia.righe < 2) {
  throw new Error('La griglia in griglia.json ha bisogno di almeno 2 colonne e 2 righe')
}

for (let i = 0; i < elencoContenuti.length; i++) {
  const contenuto = elencoContenuti[i]
  if (contenuto.famiglia === 'coltura' && !contenuto.resa) {
    throw new Error(`La coltura "${contenuto.id}" non ha una resa in contenuti.json`)
  }
  if (contenuto.resa) {
    trovaMateriale(contenuto.resa.materiale)
  }
}

// Ogni seme di partenza deve esistere, altrimenti si comincia con niente in
// mano e sembra un guasto.
for (let i = 0; i < partenza.semi.length; i++) {
  trovaContenuto(partenza.semi[i].id)
}

// La regola di design del GDD sezione 3, controllata dal codice perche' e' cio'
// che tiene in piedi il gioco: se una coltura fosse migliore di un'altra sotto
// ogni aspetto, scegliere cosa piantare non sarebbe una decisione.
const colture = elencoContenuti.filter((voce) => voce.famiglia === 'coltura')
for (let i = 0; i < colture.length; i++) {
  for (let j = 0; j < colture.length; j++) {
    if (i === j) {
      continue
    }
    const a = colture[i]
    const b = colture[j]
    const guadagnoA = a.resa.quantita * trovaMateriale(a.resa.materiale).prezzo_base
    const guadagnoB = b.resa.quantita * trovaMateriale(b.resa.materiale).prezzo_base
    if (
      a.costo_seme <= b.costo_seme &&
      a.tempo_crescita_ms <= b.tempo_crescita_ms &&
      guadagnoA >= guadagnoB &&
      (a.costo_seme < b.costo_seme || a.tempo_crescita_ms < b.tempo_crescita_ms || guadagnoA > guadagnoB)
    ) {
      throw new Error(
        `"${a.nome}" e migliore di "${b.nome}" sotto ogni aspetto (seme, tempo e guadagno): con una coltura dominante, scegliere cosa piantare non e una decisione. Vedi GDD sezione 3.`
      )
    }
  }
}

export function aspettoContenuto(id) {
  return trovaContenuto(id)
}
