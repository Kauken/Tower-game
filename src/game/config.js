// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import grigliaJson from '../../config/griglia.json'
import contenutiJson from '../../config/contenuti.json'
import vicinanzeJson from '../../config/vicinanze.json'
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

export function trovaContenuto(id) {
  const contenuto = elencoContenuti.find((voce) => voce.id === id)
  if (!contenuto) {
    throw new Error(`Contenuto "${id}" non trovato in contenuti.json`)
  }
  return contenuto
}

// Controlli all'avvio: una configurazione sbagliata deve fermare il gioco
// subito con un errore parlante, non produrre una griglia vuota e muta.
if (griglia.colonne < 2 || griglia.righe < 2) {
  throw new Error('La griglia in griglia.json ha bisogno di almeno 2 colonne e 2 righe')
}

for (let i = 0; i < elencoContenuti.length; i++) {
  const contenuto = elencoContenuti[i]
  if (contenuto.famiglia === 'coltura' && !contenuto.resa) {
    throw new Error(`La coltura "${contenuto.id}" non ha una resa in contenuti.json`)
  }
  if (contenuto.resa && !elencoMateriali.some((m) => m.id === contenuto.resa.materiale)) {
    throw new Error(
      `"${contenuto.id}" produce il materiale "${contenuto.resa.materiale}", che non esiste in contenuti.json`
    )
  }
}

// Una regola di vicinanza che nomina qualcosa che non esiste non farebbe
// niente e non se ne accorgerebbe nessuno: meglio fermarsi qui.
function verificaBersaglio(bersaglio, dove) {
  if (bersaglio.id && !elencoContenuti.some((c) => c.id === bersaglio.id)) {
    throw new Error(`${dove} nomina il contenuto "${bersaglio.id}", che non esiste`)
  }
  if (bersaglio.famiglia && !elencoContenuti.some((c) => c.famiglia === bersaglio.famiglia)) {
    throw new Error(`${dove} nomina la famiglia "${bersaglio.famiglia}", che non esiste`)
  }
}

for (let i = 0; i < elencoVicinanze.length; i++) {
  const regola = elencoVicinanze[i]
  verificaBersaglio(regola.chi, `La vicinanza "${regola.id}" (chi)`)
  verificaBersaglio(regola.accanto_a, `La vicinanza "${regola.id}" (accanto_a)`)
}

// La regola di design del GDD sezione 4, controllata dal codice perche' e' la
// cosa che tiene in piedi il gioco: se tutte le vicinanze premiassero la stessa
// disposizione, il piazzamento avrebbe una risposta ovvia e non ci sarebbe gioco.
const premiaLUguale = elencoVicinanze.some((r) => !r.diverse && r.chi.id && r.chi.id === r.accanto_a.id)
const premiaIlDiverso = elencoVicinanze.some((r) => r.diverse)
if (!premiaLUguale || !premiaIlDiverso) {
  throw new Error(
    'vicinanze.json deve contenere sia una regola che premia la monocoltura sia una che premia la varieta: senza la contraddizione il piazzamento non e una scelta'
  )
}

export function aspettoContenuto(id) {
  const contenuto = trovaContenuto(id)
  return contenuto
}
