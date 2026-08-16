// Le casse: dove finisce la roba.
//
// **Non esiste un magazzino centrale.** Le risorse stanno dentro casse che
// hanno un posto preciso sull'isola, e qualcuno le deve portare li'. E' la
// differenza fra questo gioco e un gestionale alla Age of Empires, ed e' la
// ragione per cui piu' avanti i nastri avranno senso: se la roba comparisse
// da sola in un contatore, non ci sarebbe niente da trasportare.
//
// Una cassa e' **un inventario a slot come quello dell'operaio**: stesso
// modulo, stesse pile, stesso gesto. E niente ci entra da solo — la roba ci
// arriva perche' gliel'hai detto tu.

import { costruzioni, isola } from './config.js'
import { creaInventario } from './inventario.js'
import { colonne, filari, indiceDi, sopra } from './mondo.js'

export function creaCasse() {
  const elenco = []

  function aggiungi(tx, ty, slot, eIlCasotto, fa) {
    const cassa = {
      tx,
      ty,
      slot,
      eIlCasotto: !!eIlCasotto,
      // **Cosa sa fare, oltre a contenere roba.** Il casotto ha un banco
      // dentro; un banco piazzato sull'isola e' un banco e basta. Una cassa
      // normale non fa niente, e va benissimo cosi'.
      fa: eIlCasotto ? 'banco' : fa || '',
      inventario: creaInventario(slot, slot)
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

  function pienaDel(cassa) {
    return cassa.inventario.occupati() + '/' + cassa.slot
  }

  // Il totale su tutta l'isola: serve solo a farlo vedere. **Non e' un
  // magazzino** — nessuno puo' prendere da qui, si prende da una cassa precisa.
  function totale(materiale) {
    let quanti = 0
    for (let i = 0; i < elenco.length; i++) {
      quanti += elenco[i].inventario.quanti(materiale)
    }
    return quanti
  }

  // La cassa piu' vicina con ancora spazio: serve solo a suggerire dove andare,
  // non a mandarci qualcuno da solo.
  function piuVicinaConSpazio(tx, ty) {
    let migliore = null
    let minima = 0
    for (let i = 0; i < elenco.length; i++) {
      const cassa = elenco[i]
      if (cassa.inventario.pieno()) {
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
    // il casotto e' gia' una cassa all'avvio e non si paga: senza, non ci
    // sarebbe nessun posto dove posare la prima bracciata di legno
    for (let ty = 0; ty < filari; ty++) {
      for (let tx = 0; tx < colonne; tx++) {
        if (sopra[indiceDi(tx, ty)] === 'casotto') {
          aggiungi(tx, ty, costruzioni.slot_casotto, true)
        }
      }
    }
  }

  reimposta()

  // --- salvataggio ---
  // Una cassa e' dove sta e cosa ha dentro. Le caselle vanno con lei: sono un
  // inventario come quello dell'operaio, e si salvano allo stesso modo.
  function perSalvare() {
    return elenco.map((cassa) => ({
      tx: cassa.tx,
      ty: cassa.ty,
      slot: cassa.slot,
      casotto: cassa.eIlCasotto,
      fa: cassa.fa,
      dentro: cassa.inventario.perSalvare()
    }))
  }

  function daSalvato(dati) {
    elenco.length = 0
    if (!Array.isArray(dati)) {
      reimposta()
      return
    }
    for (let i = 0; i < dati.length; i++) {
      const voce = dati[i]
      if (!voce || !(voce.slot > 0)) {
        continue
      }
      const cassa = aggiungi(voce.tx, voce.ty, voce.slot, voce.casotto, voce.fa)
      cassa.inventario.daSalvato(voce.dentro)
    }
    // senza il casotto non ci sarebbe piu' nessun banco, e il gioco si
    // fermerebbe alla prima ricetta
    if (!elenco.some((cassa) => cassa.eIlCasotto)) {
      reimposta()
    }
  }

  return {
    elenco,
    aggiungi,
    perSalvare,
    daSalvato,
    in: in_,
    pienaDel,
    totale,
    piuVicinaConSpazio,
    reimposta
  }
}
