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
export const popolamento = stanzaJson.popolamento
export const partenzaPersonaggio = stanzaJson.partenza_personaggio

export const elencoNemici = nemiciJson.nemici
export const scalaturaNemici = nemiciJson.scalatura
export const affollamento = nemiciJson.affollamento
export const datiPersonaggio = personaggioJson.personaggio

// Controllo all'avvio: un comportamento scritto male in configurazione deve
// fermare il gioco subito con un errore parlante, non produrre nemici inerti.
for (const nemico of elencoNemici) {
  if (!nemiciJson.comportamenti_validi.includes(nemico.comportamento)) {
    throw new Error(
      `Comportamento "${nemico.comportamento}" del nemico "${nemico.id}" non e' fra quelli validi in nemici.json`
    )
  }
}

export function aspettoNemico(id) {
  return grafica.nemici[id] || grafica.nemici.predefinito
}
