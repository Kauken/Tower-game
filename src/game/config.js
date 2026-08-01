// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import mappe from '../../config/mappe.json'
import nemici from '../../config/nemici.json'
import alleati from '../../config/alleati.json'
import torri from '../../config/torri.json'
import ondate from '../../config/ondate.json'
import economiaJson from '../../config/economia.json'
import motore from '../../config/motore.json'

export const area = mappe.area
export const economia = economiaJson
export const scalaturaNemici = nemici.scalatura
export const scalaturaAlleati = alleati.scalatura
export const schemaOndata = ondate.schema_ondata
export const squadra = alleati.squadra
export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const anteprima = motore.anteprima
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

function cercaPerId(elenco, id, nomeFile) {
  const trovato = elenco.find((elemento) => elemento.id === id)
  if (!trovato) {
    throw new Error(`Id "${id}" non trovato in ${nomeFile}`)
  }
  return trovato
}

export const mappaAttiva = cercaPerId(
  mappe.mappe,
  motore.anteprima.mappa_id,
  'mappe.json'
)

// Il nemico degli assalti: per ora ce n'e' uno solo, lo dice ondate.json
export const nemicoOndata = cercaPerId(
  nemici.nemici,
  ondate.schema_ondata.nemico_id,
  'nemici.json'
)

// Il minion alleato della squadra
export const alleatoSquadra = cercaPerId(
  alleati.alleati,
  alleati.squadra.alleato_id,
  'alleati.json'
)

// Tutte le torri piazzabili, nell'ordine del file: e' l'ordine del pannello.
export const elencoTorri = torri.torri

export function torrePerId(id) {
  return cercaPerId(torri.torri, id, 'torri.json')
}

// I bonus di altura e vena di mana. Se un tipo di casella non ha un blocco
// dedicato non si rompe niente: vale il blocco "normale".
export function bonusCasella(tipo) {
  return mappaAttiva.bonus_slot[tipo] || mappaAttiva.bonus_slot.normale
}

export function aspettoCasella(tipo) {
  return grafica.caselle[tipo] || grafica.caselle.normale
}
