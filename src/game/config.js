// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import stanzaJson from '../../config/stanza.json'
import nemiciJson from '../../config/nemici.json'
import motore from '../../config/motore.json'
import personaggioJson from '../../config/personaggio.json'

// L'area logica del gioco: la stanza piu' i muri attorno.
export const area = stanzaJson.area

export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

export const arena = stanzaJson.arena
export const ingressi = stanzaJson.ingressi
export const popolamento = stanzaJson.popolamento
export const partenzaPersonaggio = stanzaJson.partenza_personaggio

export const scalaturaNemici = nemiciJson.scalatura
export const affollamento = nemiciJson.affollamento
export const datiPersonaggio = personaggioJson.personaggio

function cercaPerId(elenco, id, nomeFile) {
  const trovato = elenco.find((elemento) => elemento.id === id)
  if (!trovato) {
    throw new Error(`Id "${id}" non trovato in ${nomeFile}`)
  }
  return trovato
}

// Il nemico che popola le stanze: per ora ce n'e' uno solo, lo dice stanza.json
export const nemicoStanza = cercaPerId(
  nemiciJson.nemici,
  stanzaJson.popolamento.nemico_id,
  'nemici.json'
)
