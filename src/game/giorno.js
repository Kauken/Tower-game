// Il giorno e' il battito del gioco.
//
// Dura pochi minuti mentre l'app e' aperta. A fine giornata si pagano le
// spese, i prezzi si muovono e un riepilogo dice cosa e' successo. E' il
// meccanismo del "vabbe', ancora un giorno": ogni giornata deve avvicinare
// in modo visibile a qualcosa che si vuole.
//
// **Non si perde mai.** Se non si riesce a pagare, una casella arata e vuota
// torna incolta e le monete vanno a zero: la fattoria si rimpicciolisce e si
// riparte, senza nessuna schermata di sconfitta.

import { tempo } from './config.js'

export function creaGiorno(economia, fattoria, { allAlba }) {
  const stato = {
    giorno: 1,
    trascorsoMs: 0,
    // il riepilogo della giornata appena finita, riscritto sul posto
    mostraRiepilogo: false,
    riepilogoMs: 0
  }

  // aggiornato sul posto, mai ricreato: l'interfaccia lo legge e basta
  const riepilogo = {
    giorno: 0,
    incassato: 0,
    speso: 0,
    raccolti: 0,
    abbandonate: 0
  }

  let incassatoOggi = 0
  let spesoOggi = 0
  let raccoltiOggi = 0

  function segnaIncasso(quanto) {
    incassatoOggi += quanto
  }

  function segnaSpesa(quanto) {
    spesoOggi += quanto
  }

  function segnaRaccolto() {
    raccoltiOggi++
  }

  function reimposta() {
    stato.giorno = 1
    stato.trascorsoMs = 0
    stato.mostraRiepilogo = false
    stato.riepilogoMs = 0
    incassatoOggi = 0
    spesoOggi = 0
    raccoltiOggi = 0
  }

  function chiudiRiepilogo() {
    stato.mostraRiepilogo = false
    stato.riepilogoMs = 0
  }

  function faiSera() {
    const dovuto = economia.stato.spesaGiornaliera
    let abbandonate = 0

    if (economia.paga(dovuto)) {
      spesoOggi += dovuto
    } else {
      // non ci sono i soldi: si paga quello che c'e' e la fattoria si
      // rimpicciolisce di una casella vuota. Mai una sconfitta.
      spesoOggi += economia.stato.monete
      economia.stato.monete = 0
      abbandonate = fattoria.abbandonaUnaCasellaVuota() ? 1 : 0
      economia.ricalcola(fattoria.caselleArate())
    }

    riepilogo.giorno = stato.giorno
    riepilogo.incassato = incassatoOggi
    riepilogo.speso = spesoOggi
    riepilogo.raccolti = raccoltiOggi
    riepilogo.abbandonate = abbandonate

    incassatoOggi = 0
    spesoOggi = 0
    raccoltiOggi = 0

    stato.giorno++
    stato.trascorsoMs = 0
    stato.mostraRiepilogo = true
    stato.riepilogoMs = 0

    economia.nuoviPrezzi()
    allAlba(stato.giorno)
  }

  function aggiorna(passoMs) {
    stato.trascorsoMs += passoMs
    if (stato.trascorsoMs >= tempo.giorno_ms) {
      faiSera()
    }
    if (stato.mostraRiepilogo) {
      stato.riepilogoMs += passoMs
      if (stato.riepilogoMs >= tempo.riepilogo.durata_visibile_ms) {
        chiudiRiepilogo()
      }
    }
  }

  return {
    stato,
    riepilogo,
    aggiorna,
    reimposta,
    chiudiRiepilogo,
    segnaIncasso,
    segnaSpesa,
    segnaRaccolto
  }
}
