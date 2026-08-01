// Le ondate: quanti nemici escono e con che ritmo. Tutto da una formula in
// ondate.json, mai un elenco scritto a mano ondata per ondata.

import { schemaOndata } from './config.js'

export function quantitaOndata(numeroOndata) {
  return (
    schemaOndata.quantita_base +
    schemaOndata.quantita_aggiunta_per_ondata * (numeroOndata - 1)
  )
}

// Ondata dopo ondata i nemici escono piu' fitti, fino a un limite.
export function intervalloOndata(numeroOndata) {
  const intervallo =
    schemaOndata.intervallo_uscita_ms -
    schemaOndata.riduzione_intervallo_per_ondata_ms * (numeroOndata - 1)
  return Math.max(schemaOndata.intervallo_minimo_ms, intervallo)
}

export function creaGestoreOndate(gestoreNemici) {
  let daGenerare = 0
  let attesa = 0
  let intervallo = 0
  let inCorso = false

  function avvia(numeroOndata) {
    daGenerare = quantitaOndata(numeroOndata)
    intervallo = intervalloOndata(numeroOndata)
    attesa = 0
    inCorso = true
  }

  // Restituisce true nel passo esatto in cui l'ondata si e' conclusa:
  // tutti usciti e nessuno piu' vivo in campo.
  function aggiorna(passoMs, numeroOndata) {
    if (!inCorso) {
      return false
    }
    if (daGenerare > 0) {
      attesa -= passoMs
      if (attesa <= 0) {
        gestoreNemici.genera(numeroOndata)
        daGenerare--
        attesa = intervallo
      }
      return false
    }
    if (gestoreNemici.quantiAttivi() === 0) {
      inCorso = false
      return true
    }
    return false
  }

  function ferma() {
    daGenerare = 0
    attesa = 0
    inCorso = false
  }

  return { avvia, aggiorna, ferma }
}
