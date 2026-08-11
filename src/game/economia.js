// Le monete: quello che entra vendendo e quello che esce ogni giorno.
//
// E' il cuore del gioco. La domanda che questi numeri devono rendere difficile
// e' una sola: **reinvesto adesso, o metto da parte perche' stasera devo
// pagare?** Se allargarsi fosse sempre la mossa giusta, non ci sarebbe partita.

import { dissodare, elencoMateriali, mercato, partenza, spese, trovaMateriale } from './config.js'

export function creaEconomia() {
  const stato = {
    monete: 0,
    // ricalcolati a ogni cambio: l'interfaccia li legge senza fare conti
    costoDissodare: 0,
    spesaGiornaliera: 0,
    caselleDissodate: 0
  }

  // il prezzo di oggi per ogni materiale, ripescato a ogni alba
  const prezzi = {}

  function nuoviPrezzi() {
    for (let i = 0; i < elencoMateriali.length; i++) {
      const materiale = elencoMateriali[i]
      const oscillazione =
        mercato.oscillazione_minima +
        Math.random() * (mercato.oscillazione_massima - mercato.oscillazione_minima)
      prezzi[materiale.id] = Math.max(1, Math.round(materiale.prezzo_base * oscillazione))
    }
  }

  function ricalcola(caselleArate) {
    stato.costoDissodare = Math.round(
      dissodare.costo_primo * Math.pow(dissodare.crescita_costo, stato.caselleDissodate)
    )
    stato.spesaGiornaliera = Math.max(
      spese.manutenzione_minima,
      Math.round(spese.manutenzione_per_casella_arata * caselleArate)
    )
  }

  function reimposta(caselleArate) {
    stato.monete = partenza.monete
    stato.caselleDissodate = 0
    nuoviPrezzi()
    ricalcola(caselleArate)
  }

  function prezzo(idMateriale) {
    return prezzi[idMateriale] || trovaMateriale(idMateriale).prezzo_base
  }

  function paga(quanto) {
    if (stato.monete < quanto) {
      return false
    }
    stato.monete -= quanto
    return true
  }

  function incassa(quanto) {
    stato.monete += quanto
  }

  // Quanto vale tutto quello che c'e' in magazzino, ai prezzi di oggi: serve
  // all'interfaccia per far vedere la decisione prima di prenderla.
  function valoreDi(magazzino) {
    let totale = 0
    for (const materiale in magazzino) {
      totale += magazzino[materiale] * prezzo(materiale)
    }
    return totale
  }

  function vendi(magazzino, idMateriale) {
    const quantita = magazzino[idMateriale] || 0
    if (quantita <= 0) {
      return 0
    }
    const incasso = quantita * prezzo(idMateriale)
    magazzino[idMateriale] = 0
    incassa(incasso)
    return incasso
  }

  function vendiTutto(magazzino) {
    let incasso = 0
    for (const materiale in magazzino) {
      incasso += vendi(magazzino, materiale)
    }
    return incasso
  }

  // Dissodare costa sempre di piu': le prime caselle sono a portata, le ultime
  // sono un obiettivo. Ed e' una scommessa, perche' alzano la manutenzione.
  function dissoda(caselleArateDopo) {
    if (!paga(stato.costoDissodare)) {
      return false
    }
    stato.caselleDissodate++
    ricalcola(caselleArateDopo)
    return true
  }

  return {
    stato,
    reimposta,
    ricalcola,
    nuoviPrezzi,
    prezzo,
    paga,
    incassa,
    valoreDi,
    vendi,
    vendiTutto,
    dissoda
  }
}
