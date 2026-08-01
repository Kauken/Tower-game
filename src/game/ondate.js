// Gli assalti: quante truppe escono per parte e con che ritmo. Tutto da
// formule in ondate.json e alleati.json, mai elenchi scritti a mano.

import { schemaOndata, squadra } from './config.js'

function quantita(schema, numeroOndata) {
  return schema.quantita_base + schema.quantita_aggiunta_per_ondata * (numeroOndata - 1)
}

function intervallo(schema, numeroOndata) {
  const valore =
    schema.intervallo_uscita_ms -
    schema.riduzione_intervallo_per_ondata_ms * (numeroOndata - 1)
  return Math.max(schema.intervallo_minimo_ms, valore)
}

export function creaGestoreOndate(truppe) {
  const nemici = { daGenerare: 0, attesa: 0, intervallo: 0 }
  const alleati = { daGenerare: 0, attesa: 0, intervallo: 0 }
  let inCorso = false

  function avvia(numeroOndata) {
    nemici.daGenerare = quantita(schemaOndata, numeroOndata)
    nemici.intervallo = intervallo(schemaOndata, numeroOndata)
    nemici.attesa = 0
    alleati.daGenerare = quantita(squadra, numeroOndata)
    alleati.intervallo = intervallo(squadra, numeroOndata)
    alleati.attesa = 0
    inCorso = true
  }

  function generaParte(parte, passoMs, genera, numeroOndata) {
    if (parte.daGenerare <= 0) {
      return
    }
    parte.attesa -= passoMs
    if (parte.attesa <= 0) {
      genera(numeroOndata)
      parte.daGenerare--
      parte.attesa = parte.intervallo
    }
  }

  // Restituisce true nel passo esatto in cui l'assalto si conclude: tutti i
  // nemici usciti e nessuno piu' vivo. Gli alleati superstiti continuano a
  // marciare anche dopo: e' la spinta verso la fortezza nemica.
  function aggiorna(passoMs, numeroOndata) {
    if (!inCorso) {
      return false
    }
    generaParte(nemici, passoMs, truppe.generaNemico, numeroOndata)
    generaParte(alleati, passoMs, truppe.generaAlleato, numeroOndata)

    if (nemici.daGenerare <= 0 && truppe.quantiNemiciAttivi() === 0) {
      inCorso = false
      return true
    }
    return false
  }

  function ferma() {
    nemici.daGenerare = 0
    alleati.daGenerare = 0
    inCorso = false
  }

  return { avvia, aggiorna, ferma }
}
