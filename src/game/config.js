// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import mappe from '../../config/mappe.json'
import nemici from '../../config/nemici.json'
import alleati from '../../config/alleati.json'
import pressioneJson from '../../config/pressione.json'
import economiaJson from '../../config/economia.json'
import motore from '../../config/motore.json'
import personaggioJson from '../../config/personaggio.json'

export const area = mappe.area
export const economia = economiaJson
export const scalaturaNemici = nemici.scalatura
export const scalaturaAlleati = alleati.scalatura
export const pressione = pressioneJson.pressione
export const squadra = alleati.squadra
export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const anteprima = motore.anteprima
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia
export const datiPersonaggio = personaggioJson.personaggio

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

// I bordi del campo e le regole di schieramento: li leggono truppe e personaggio
export const campo = mappaAttiva.campo
export const schieramento = mappaAttiva.schieramento

// Il nemico dell'assedio: per ora ce n'e' uno solo, lo dice pressione.json
export const nemicoPressione = cercaPerId(
  nemici.nemici,
  pressioneJson.pressione.nemico_id,
  'nemici.json'
)

// Il minion alleato della squadra
export const alleatoSquadra = cercaPerId(
  alleati.alleati,
  alleati.squadra.alleato_id,
  'alleati.json'
)
