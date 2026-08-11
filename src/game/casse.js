// Le casse: dove finisce la roba.
//
// **Non esiste un magazzino centrale.** Le risorse stanno dentro casse che
// hanno un posto preciso sull'isola, e qualcuno le deve portare li'. E' la
// differenza fra questo gioco e un gestionale alla Age of Empires, ed e' la
// ragione per cui piu' avanti i nastri avranno senso: se la roba comparisse
// da sola in un contatore, non ci sarebbe niente da trasportare.

import { costruzioni, elencoMateriali, isola } from './config.js'
import { colonne, filari, indiceDi, sopra } from './mondo.js'

function contenutoVuoto() {
  const contenuto = {}
  for (let i = 0; i < elencoMateriali.length; i++) {
    contenuto[elencoMateriali[i].id] = 0
  }
  return contenuto
}

export function creaCasse() {
  const elenco = []

  function aggiungi(tx, ty, capienza, eIlCasotto) {
    const cassa = {
      tx,
      ty,
      capienza,
      eIlCasotto: !!eIlCasotto,
      contenuto: contenutoVuoto(),
      dentro: 0
    }
    elenco.push(cassa)
    return cassa
  }

  function in_(tx, ty) {
    for (let i = 0; i < elenco.length; i++) {
      if (elenco[i].tx === tx && elenco[i].ty === ty) {
        return elenco[i]
      }
    }
    return null
  }

  function spazioIn(cassa) {
    return cassa.capienza - cassa.dentro
  }

  // Quanto e' entrato davvero: una cassa piena non accetta tutto, e il
  // bracciante si tiene il resto addosso invece di perderlo.
  function metti(cassa, materiale, quantita) {
    const entra = Math.min(quantita, spazioIn(cassa))
    if (entra <= 0) {
      return 0
    }
    cassa.contenuto[materiale] += entra
    cassa.dentro += entra
    return entra
  }

  function togli(cassa, materiale, quantita) {
    const esce = Math.min(quantita, cassa.contenuto[materiale] || 0)
    cassa.contenuto[materiale] -= esce
    cassa.dentro -= esce
    return esce
  }

  // Il totale su tutta l'isola: serve solo a farlo vedere in alto. Non e' un
  // magazzino — nessuno puo' prendere da qui, si prende da una cassa precisa.
  function totale(materiale) {
    let quanti = 0
    for (let i = 0; i < elenco.length; i++) {
      quanti += elenco[i].contenuto[materiale] || 0
    }
    return quanti
  }

  // Quanto materiale c'e' in tutte le casse insieme: serve a sapere se ci si
  // puo' permettere una costruzione.
  function abbastanzaPer(costo) {
    for (let i = 0; i < costo.length; i++) {
      if (totale(costo[i].materiale) < costo[i].quantita) {
        return false
      }
    }
    return true
  }

  // Paga prendendo da tutte le casse che hanno qualcosa. Si paga davvero: la
  // roba sparisce dalle casse, non da un contatore.
  function paga(costo) {
    if (!abbastanzaPer(costo)) {
      return false
    }
    for (let i = 0; i < costo.length; i++) {
      let manca = costo[i].quantita
      for (let c = 0; c < elenco.length && manca > 0; c++) {
        manca -= togli(elenco[c], costo[i].materiale, manca)
      }
    }
    return true
  }

  // La cassa piu' vicina con ancora spazio: e' il ripiego quando quella
  // assegnata e' piena.
  function piuVicinaConSpazio(tx, ty) {
    let migliore = null
    let minima = 0
    for (let i = 0; i < elenco.length; i++) {
      const cassa = elenco[i]
      if (spazioIn(cassa) <= 0) {
        continue
      }
      const dx = cassa.tx - tx
      const dy = cassa.ty - ty
      const distanza = dx * dx + dy * dy
      if (!migliore || distanza < minima) {
        migliore = cassa
        minima = distanza
      }
    }
    return migliore
  }

  function reimposta() {
    elenco.length = 0
    // il casotto e' gia' una cassa all'avvio e non si paga: senza, il primo
    // bracciante non saprebbe dove scaricare e sembrerebbe rotto
    for (let ty = 0; ty < filari; ty++) {
      for (let tx = 0; tx < colonne; tx++) {
        if (sopra[indiceDi(tx, ty)] === 'casotto') {
          aggiungi(tx, ty, costruzioni.capienza_casotto, true)
        }
      }
    }
  }

  reimposta()

  return {
    elenco,
    aggiungi,
    in: in_,
    spazioIn,
    metti,
    togli,
    totale,
    abbastanzaPer,
    paga,
    piuVicinaConSpazio,
    reimposta
  }
}
