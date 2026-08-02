// Il ritmo delle ondate.
//
// Le ondate partono da sole (decisione del 2026-08-02): non c'e' un pulsante
// per chiamarle in anticipo. La pausa fra un'ondata e l'altra non e' tempo
// morto, e' il tempo in cui l'oro sale e si decide come spenderlo.
//
// Quantita' e cadenza si ricavano da una formula, mai scritte a mano ondata
// per ondata: cosi' il gioco non finisce mai le ondate preparate.

import { ondate } from './config.js'

export function creaGestoreOndate(combattenti, partita, { allaFineOndata }) {
  // quanti nemici mancano da far uscire e quanto manca al prossimo
  let daFarUscire = 0
  let intervalloMs = 0
  let attesaUscitaMs = 0

  function quantiNemici(numeroOndata) {
    return (
      ondate.quantita_base + ondate.quantita_aggiunta_per_ondata * (numeroOndata - 1)
    )
  }

  function intervalloOndata(numeroOndata) {
    const calcolato =
      ondate.intervallo_uscita_ms -
      ondate.riduzione_intervallo_per_ondata_ms * (numeroOndata - 1)
    return Math.max(calcolato, ondate.intervallo_minimo_ms)
  }

  function preparaAttesa(attesaMs) {
    partita.fase = 'attesa'
    partita.attesaMs = attesaMs
  }

  function reimposta() {
    daFarUscire = 0
    attesaUscitaMs = 0
    preparaAttesa(ondate.attesa_prima_ondata_ms)
  }

  function iniziaOndata() {
    partita.fase = 'ondata'
    partita.attesaMs = 0
    daFarUscire = quantiNemici(partita.ondata)
    intervalloMs = intervalloOndata(partita.ondata)
    // il primo esce subito: l'ondata deve iniziare quando dice di iniziare
    attesaUscitaMs = 0
    partita.nemiciRimanenti = daFarUscire
  }

  function aggiorna(passoMs) {
    if (partita.fase === 'attesa') {
      partita.attesaMs -= passoMs
      if (partita.attesaMs <= 0) {
        iniziaOndata()
      }
      return
    }

    if (partita.fase !== 'ondata') {
      return
    }

    if (daFarUscire > 0) {
      attesaUscitaMs -= passoMs
      if (attesaUscitaMs <= 0) {
        // a pool pieno il nemico non si perde: non si scala il contatore e si
        // riprova al prossimo intervallo
        if (combattenti.faiUscireNemico(ondate.nemico_id, partita.ondata)) {
          daFarUscire--
        }
        attesaUscitaMs = intervalloMs
      }
    }

    partita.nemiciRimanenti = daFarUscire + combattenti.nemiciVivi()

    if (daFarUscire === 0 && combattenti.nemiciVivi() === 0) {
      allaFineOndata(partita.ondata)
      partita.ondata++
      preparaAttesa(ondate.pausa_fra_ondate_ms)
    }
  }

  reimposta()

  return { aggiorna, reimposta }
}
