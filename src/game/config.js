// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import mappe from '../../config/mappe.json'
import nemici from '../../config/nemici.json'
import motore from '../../config/motore.json'

export const area = mappe.area
export const simulazione = motore.simulazione
export const grafica = motore.grafica

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

export const nemicoAnteprima = cercaPerId(
  nemici.nemici,
  motore.anteprima.nemico_id,
  'nemici.json'
)
