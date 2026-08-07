// Il ritmo delle ondate.
//
// Le ondate partono da sole (decisione del 2026-08-02): non c'e' un pulsante
// per chiamarle in anticipo. La pausa fra un'ondata e l'altra non e' tempo
// morto, e' il tempo in cui l'oro sale e si decide come spenderlo.
//
// Quantita' e cadenza si ricavano da una formula, mai scritte a mano ondata
// per ondata: cosi' il gioco non finisce mai le ondate preparate.

import { elencoNemici, ondate } from './config.js'

// Pesca quale nemico esce fra quelli gia' disponibili a questa ondata. I tipi
// entrano un pezzo alla volta (da_ondata), cosi' il giocatore non deve
// imparare quattro comportamenti tutti insieme alla prima partita.
function pescaNemico(numeroOndata) {
  let totale = 0
  for (let i = 0; i < elencoNemici.length; i++) {
    if (elencoNemici[i].da_ondata <= numeroOndata) {
      totale += elencoNemici[i].frequenza
    }
  }
  let tiro = Math.random() * totale
  for (let i = 0; i < elencoNemici.length; i++) {
    const nemico = elencoNemici[i]
    if (nemico.da_ondata > numeroOndata) {
      continue
    }
    tiro -= nemico.frequenza
    if (tiro <= 0) {
      return nemico.id
    }
  }
  return elencoNemici[0].id
}

// Quali tipi compaiono per la prima volta a questa ondata: e' l'avviso che
// serve al giocatore per non trovarsi davanti un nemico nuovo senza preavviso.
function nemiciNuoviDi(numeroOndata) {
  const nuovi = []
  for (let i = 0; i < elencoNemici.length; i++) {
    if (elencoNemici[i].da_ondata === numeroOndata) {
      nuovi.push(elencoNemici[i].nome)
    }
  }
  return nuovi
}

export function creaGestoreOndate(combattenti, partita, { allInizioOndata, allaFineOndata }) {
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
    // si annuncia cosa sta per arrivare: un'ondata che compare dal nulla e
    // travolge le truppe sembra ingiusta anche quando non lo e'
    partita.quantitaProssimaOndata = quantiNemici(partita.ondata)
    partita.nemiciNuovi = nemiciNuoviDi(partita.ondata)
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
    // i rinforzi gratuiti degli oggetti arrivano adesso: devono essere gia'
    // in marcia quando esce il primo nemico
    allInizioOndata(partita.ondata)
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
        if (combattenti.faiUscireNemico(pescaNemico(partita.ondata), partita.ondata)) {
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
