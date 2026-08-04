// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import percorsoJson from '../../config/percorso.json'
import nemiciJson from '../../config/nemici.json'
import recluteJson from '../../config/reclute.json'
import ondateJson from '../../config/ondate.json'
import economiaJson from '../../config/economia.json'
import motore from '../../config/motore.json'

// L'area logica del gioco: il campo intero, poi scalato sullo schermo.
export const area = percorsoJson.area
export const campo = percorsoJson.campo

export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

export const elencoNemici = nemiciJson.nemici
export const scalaturaNemici = nemiciJson.scalatura

export const elencoReclute = recluteJson.reclute
export const reclutaIniziale = recluteJson.recluta_iniziale

export const ondate = ondateJson.ondate

export const partitaIniziale = economiaJson.partita
export const rendita = economiaJson.rendita
export const ricompense = economiaJson.ricompense

export function trovaNemico(id) {
  const nemico = elencoNemici.find((voce) => voce.id === id)
  if (!nemico) {
    throw new Error(`Nemico "${id}" non trovato in nemici.json`)
  }
  return nemico
}

export function trovaRecluta(id) {
  const recluta = elencoReclute.find((voce) => voce.id === id)
  if (!recluta) {
    throw new Error(`Recluta "${id}" non trovata in reclute.json`)
  }
  return recluta
}

// Controlli all'avvio: una configurazione sbagliata deve fermare il gioco
// subito con un errore parlante, non produrre un campo vuoto e muto.
if (!elencoNemici.some((nemico) => nemico.da_ondata <= 1)) {
  throw new Error('Nessun nemico disponibile alla prima ondata: controlla da_ondata in nemici.json')
}
trovaRecluta(reclutaIniziale)

if (campo.sentiero.length < 2) {
  throw new Error('Il sentiero in percorso.json ha bisogno di almeno due punti')
}

export function aspettoNemico(id) {
  return grafica.nemici[id] || grafica.nemici.predefinito
}

export function aspettoRecluta(id) {
  return grafica.reclute[id] || grafica.reclute.predefinito
}
