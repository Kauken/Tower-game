// Il giorno e' il battito del gioco.
//
// Dura pochi minuti mentre l'app e' aperta. A sera si pagano i salari e un
// riepilogo dice cosa e' successo. E' il meccanismo del "vabbe', ancora un
// giorno": ogni giornata deve avvicinare in modo visibile a qualcosa che vuoi.
//
// **Non si perde mai.** Se non bastano i soldi si paga quello che c'e' e il
// bracciante che costa di piu' se ne va: l'isola si rimpicciolisce e si
// riparte, senza nessuna schermata di sconfitta.

import { tempo } from './config.js'

export function creaGiorno(economia, squadra, { allAlba }) {
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
    salari: 0,
    raccolto: 0,
    andatoVia: ''
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
    const dovuto = squadra.salariTotali()
    let andatoVia = ''

    if (economia.paga(dovuto)) {
      riepilogo.salari = dovuto
    } else {
      // non ci sono i soldi: si paga quello che c'e' e se ne va il piu' caro.
      // Mai una sconfitta, solo un'isola piu' piccola.
      riepilogo.salari = Math.floor(economia.stato.monete)
      economia.stato.monete = 0
      andatoVia = squadra.mandaViaIlPiuCaro()
    }

    riepilogo.giorno = stato.giorno
    riepilogo.incassato = incassatoOggi
    riepilogo.raccolto = raccoltoOggi
    riepilogo.andatoVia = andatoVia

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
