// L'oro: quello che le torri producono da sole e quello che si spende.
//
// E' il cuore del gioco. La domanda che questi numeri devono rendere difficile
// e' una sola: compro adesso, o investo nella rendita per comprare di piu' fra
// poco? Se comprare e' sempre la mossa giusta, il gioco non esiste — per
// questo qui non si aggiunge mai una scorciatoia che aggiri la scelta.

import { partitaIniziale, rendita, ricompense } from './config.js'

export function creaEconomia({ allaProduzione, oggetti }) {
  const stato = {
    oro: 0,
    livelloRendita: 0,
    // ricalcolati a ogni cambio: l'interfaccia li legge senza fare conti
    oroPerCiclo: 0,
    costoPotenziamento: 0,
    renditaAlMassimo: false
  }

  let tempoCicloMs = 0

  function ricalcola() {
    stato.oroPerCiclo =
      rendita.oro_per_ciclo +
      rendita.oro_aggiunto_per_livello * stato.livelloRendita +
      oggetti.renditaAggiunta()
    stato.renditaAlMassimo = stato.livelloRendita >= rendita.livello_massimo
    stato.costoPotenziamento = stato.renditaAlMassimo
      ? 0
      : Math.round(
          rendita.costo_primo_potenziamento *
            Math.pow(rendita.crescita_costo_potenziamento, stato.livelloRendita)
        )
  }

  function reimposta() {
    stato.oro = partitaIniziale.oro_iniziale
    stato.livelloRendita = 0
    tempoCicloMs = 0
    ricalcola()
  }

  function aggiorna(passoMs) {
    tempoCicloMs += passoMs
    if (tempoCicloMs < rendita.ciclo_ms) {
      return
    }
    tempoCicloMs -= rendita.ciclo_ms
    stato.oro += stato.oroPerCiclo
    // il lampo sulle torri: e' l'unico modo per collegare a occhio le torri
    // all'oro che sale, altrimenti sembrano decorazioni
    allaProduzione()
  }

  function incassa(quantita) {
    stato.oro += quantita
  }

  // gli oggetti possono cambiare rendita e sconti: quando se ne prende uno
  // vanno rifatti i conti, altrimenti l'effetto non si vedrebbe
  function rileggiOggetti() {
    ricalcola()
  }

  // quanto costa davvero una recluta, tenuto conto degli sconti raccolti
  function costoReale(costoDiListino) {
    return Math.round(costoDiListino * oggetti.scontoReclute())
  }

  function ricompensaOndata(numeroOndata) {
    incassa(
      Math.round(
        ricompense.oro_base_per_ondata *
          Math.pow(ricompense.crescita_per_ondata, numeroOndata - 1)
      )
    )
  }

  function spendi(costo) {
    if (stato.oro < costo) {
      return false
    }
    stato.oro -= costo
    return true
  }

  function potenziaRendita() {
    if (stato.renditaAlMassimo || !spendi(stato.costoPotenziamento)) {
      return false
    }
    stato.livelloRendita++
    ricalcola()
    return true
  }

  reimposta()

  return {
    stato,
    aggiorna,
    incassa,
    ricompensaOndata,
    spendi,
    potenziaRendita,
    reimposta,
    rileggiOggetti,
    costoReale
  }
}
