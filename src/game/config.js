// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import isolaJson from '../../config/isola.json'
import braccantiJson from '../../config/braccianti.json'
import costruzioniJson from '../../config/costruzioni.json'
import economiaJson from '../../config/economia.json'
import tecnologieJson from '../../config/tecnologie.json'
import tempoJson from '../../config/tempo.json'
import motore from '../../config/motore.json'

// L'area logica dello **schermo**, non del mondo: l'isola e' piu' grande, e la
// telecamera ne mostra un pezzo per volta.
export const area = motore.area

export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

export const isola = isolaJson
export const tessera = isolaJson.tessera
export const legenda = isolaJson.legenda
export const terreni = isolaJson.terreni
export const risorse = isolaJson.risorse
export const elencoMateriali = isolaJson.materiali
export const telecamera = isolaJson.telecamera

export const braccianti = braccantiJson
export const operaio = braccantiJson.operaio

export const elencoTecnologie = tecnologieJson.tecnologie

export const costruzioni = costruzioniJson
export const elencoCostruzioni = costruzioniJson.costruzioni

export const partenzaEconomia = economiaJson.partenza
export const vendita = economiaJson.vendita
export const tempo = tempoJson

export function trovaCostruzione(id) {
  const costruzione = elencoCostruzioni.find((voce) => voce.id === id)
  if (!costruzione) {
    throw new Error(`Costruzione "${id}" non trovata in costruzioni.json`)
  }
  return costruzione
}

export function trovaTecnologia(id) {
  const tecnologia = elencoTecnologie.find((voce) => voce.id === id)
  if (!tecnologia) {
    throw new Error(`Tecnologia "${id}" non trovata in tecnologie.json`)
  }
  return tecnologia
}

// Controlli all'avvio: una configurazione sbagliata deve fermare il gioco
// subito con un errore parlante, non produrre un'isola vuota e muta.
const righe = isolaJson.mappa
if (righe.length < 4) {
  throw new Error('La mappa in isola.json ha bisogno di almeno quattro righe')
}
for (let i = 1; i < righe.length; i++) {
  if (righe[i].length !== righe[0].length) {
    throw new Error(
      `La riga ${i} della mappa in isola.json e lunga ${righe[i].length}, la prima ${righe[0].length}: devono essere tutte uguali`
    )
  }
}
for (let y = 0; y < righe.length; y++) {
  for (let x = 0; x < righe[y].length; x++) {
    if (!legenda[righe[y][x]]) {
      throw new Error(
        `Il carattere "${righe[y][x]}" alla riga ${y} colonna ${x} della mappa non e nella legenda di isola.json`
      )
    }
  }
}

// Una risorsa lavorabile deve produrre un materiale che esiste, altrimenti
// l'ordine si puo' dare ma non ne esce niente.
for (const nome in risorse) {
  const risorsa = risorse[nome]
  if (risorsa.lavorabile) {
    if (!risorsa.resa || !elencoMateriali.some((m) => m.id === risorsa.resa.materiale)) {
      throw new Error(`La risorsa "${nome}" produce un materiale che non esiste in isola.json`)
    }
  }
}

// Una tecnologia che ne richiede una inesistente sarebbe irraggiungibile, e
// nessuno se ne accorgerebbe: meglio fermarsi qui.
for (let i = 0; i < elencoTecnologie.length; i++) {
  const t = elencoTecnologie[i]
  if (t.richiede) {
    trovaTecnologia(t.richiede)
  }
  if (!(t.costo > 0)) {
    throw new Error(`La tecnologia "${t.id}" non ha un costo in tecnologie.json`)
  }
  if (t.effetto.risorsa && !risorse[t.effetto.risorsa]) {
    throw new Error(
      `La tecnologia "${t.id}" agisce su "${t.effetto.risorsa}", che non e una risorsa dell'isola`
    )
  }
}

// Ogni costruzione deve costare materiali che esistono, e il casotto deve
// esserci sulla mappa: senza, il primo bracciante non saprebbe dove scaricare.
for (let i = 0; i < elencoCostruzioni.length; i++) {
  const costo = elencoCostruzioni[i].costo
  for (let c = 0; c < costo.length; c++) {
    if (!elencoMateriali.some((m) => m.id === costo[c].materiale)) {
      throw new Error(
        `La costruzione "${elencoCostruzioni[i].id}" costa "${costo[c].materiale}", che non e un materiale di isola.json`
      )
    }
  }
}
// Un materiale senza prezzo non si potrebbe vendere.
for (let i = 0; i < elencoMateriali.length; i++) {
  if (!(elencoMateriali[i].prezzo > 0)) {
    throw new Error(`Il materiale "${elencoMateriali[i].id}" non ha un prezzo in isola.json`)
  }
}
if (!isolaJson.mappa.some((riga) => riga.indexOf('C') >= 0)) {
  throw new Error(
    'Sulla mappa non c\'e il casotto (C): senza, il primo bracciante non saprebbe dove scaricare'
  )
}

if (braccantiJson.iniziali.length < 1) {
  throw new Error('Serve almeno un operaio in braccianti.json, altrimenti non lavora nessuno')
}
