// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import isolaJson from '../../config/isola.json'
import braccantiJson from '../../config/braccianti.json'
import costruzioniJson from '../../config/costruzioni.json'
import economiaJson from '../../config/economia.json'
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
export const mestieri = braccantiJson.mestieri

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

export function trovaMestiere(id) {
  const mestiere = mestieri.find((voce) => voce.id === id)
  if (!mestiere) {
    throw new Error(`Mestiere "${id}" non trovato in braccianti.json`)
  }
  return mestiere
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

// Ogni risorsa deve dire chi la sa lavorare, altrimenti l'ordine si puo' dare
// ma non lo prende mai nessuno, e sembra un guasto.
for (const nome in risorse) {
  const risorsa = risorse[nome]
  if (risorsa.mestiere) {
    trovaMestiere(risorsa.mestiere)
    if (!risorsa.resa || !elencoMateriali.some((m) => m.id === risorsa.resa.materiale)) {
      throw new Error(`La risorsa "${nome}" produce un materiale che non esiste in isola.json`)
    }
  }
}

// Ogni mestiere presente all'inizio deve esistere, e deve servire a qualcosa:
// un bracciante senza lavoro da fare e' configurazione morta.
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
// Un materiale senza prezzo non si potrebbe vendere, e un mestiere senza
// salario sarebbe gratis: in un gioco che regge sulla domanda "assumo o me lo
// faccio bastare", un bracciante gratis toglie la domanda.
for (let i = 0; i < elencoMateriali.length; i++) {
  if (!(elencoMateriali[i].prezzo > 0)) {
    throw new Error(`Il materiale "${elencoMateriali[i].id}" non ha un prezzo in isola.json`)
  }
}
for (let i = 0; i < mestieri.length; i++) {
  if (!(mestieri[i].salario > 0) || !(mestieri[i].costo_assunzione > 0)) {
    throw new Error(
      `Il mestiere "${mestieri[i].id}" ha bisogno di salario e costo_assunzione in braccianti.json: un bracciante gratis toglie la domanda che regge il gioco`
    )
  }
}

if (!isolaJson.mappa.some((riga) => riga.indexOf('C') >= 0)) {
  throw new Error(
    'Sulla mappa non c\'e il casotto (C): senza, il primo bracciante non saprebbe dove scaricare'
  )
}

for (let i = 0; i < braccantiJson.iniziali.length; i++) {
  const id = braccantiJson.iniziali[i].mestiere
  trovaMestiere(id)
  const serve = Object.keys(risorse).some((nome) => risorse[nome].mestiere === id)
  if (!serve) {
    throw new Error(
      `Il mestiere "${id}" non sa lavorare nessuna risorsa dell'isola: sarebbe un bracciante pagato per stare fermo`
    )
  }
}
