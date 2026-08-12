// Il giorno e' il battito del gioco.
//
// Dura pochi minuti mentre l'app e' aperta. A sera si pagano i salari e un
// riepilogo dice cosa e' successo. E' il meccanismo del "vabbe', ancora un
// giorno": ogni giornata deve avvicinare in modo visibile a qualcosa che vuoi.
//
// **Non si perde mai, e adesso nemmeno un po'.** Con un operaio solo non ci
// sono salari da pagare: la sera e' un ritmo e un riepilogo, non una scadenza.
// La pressione non viene dai soldi che escono, viene da quanto ti chiedono —
// "the factory must grow".

import { tempo } from './config.js'

export function creaGiorno(economia, { allAlba }) {
  const stato = {
    giorno: 1,
    trascorsoMs: 0,
    mostraRiepilogo: false,
    riepilogoMs: 0
  }

  // aggiornato sul posto, mai ricreato: l'interfaccia lo legge e basta
  const riepilogo = {
    giorno: 0,
    incassato: 0,
    raccolto: 0
  }

  let incassatoOggi = 0
  let raccoltoOggi = 0

  function segnaIncasso(quanto) {
    incassatoOggi += quanto
  }

  function segnaRaccolto(quanto) {
    raccoltoOggi += quanto
  }

  function reimposta() {
    stato.giorno = 1
    stato.trascorsoMs = 0
    stato.mostraRiepilogo = false
    stato.riepilogoMs = 0
    incassatoOggi = 0
    raccoltoOggi = 0
  }

  function chiudiRiepilogo() {
    stato.mostraRiepilogo = false
    stato.riepilogoMs = 0
  }

  function faiSera() {
    riepilogo.giorno = stato.giorno
    riepilogo.incassato = incassatoOggi
    riepilogo.raccolto = raccoltoOggi

    incassatoOggi = 0
    raccoltoOggi = 0

    stato.giorno++
    stato.trascorsoMs = 0
    stato.mostraRiepilogo = true
    stato.riepilogoMs = 0
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
    segnaRaccolto
  }
}
