// L'albero tecnologico.
//
// Con un operaio solo, **questa e' l'unica via di crescita**: non si assume,
// si migliora. Ogni voce si compra una volta sola e resta per sempre.
//
// Il codice non conosce nessuna tecnologia per nome: sa leggere quattro tipi
// di effetto e basta. Aggiungerne una e' scrivere una voce in
// `config/tecnologie.json`, non toccare questo file.

import { elencoTecnologie } from './config.js'

export function creaTecnologie() {
  const prese = []

  function hoGiaPreso(id) {
    return prese.indexOf(id) >= 0
  }

  // Una tecnologia si puo' comprare se non ce l'hai gia' e se hai quella che
  // le serve: e' cosi' che l'albero ha dei rami invece che essere una lista.
  function disponibile(id) {
    const dati = elencoTecnologie.find((voce) => voce.id === id)
    if (!dati || hoGiaPreso(id)) {
      return false
    }
    return !dati.richiede || hoGiaPreso(dati.richiede)
  }

  function prendi(id) {
    if (!disponibile(id)) {
      return false
    }
    prese.push(id)
    return true
  }

  function riguarda(effetto, tipo, risorsa) {
    if (!effetto || effetto.tipo !== tipo) {
      return false
    }
    // se l'effetto non nomina una risorsa, vale per tutte
    return !effetto.risorsa || effetto.risorsa === risorsa
  }

  // Il moltiplicatore di un tipo, tenuto conto di tutto quello che hai preso.
  // Si chiama quando l'operaio comincia un lavoro o quando si compra qualcosa,
  // mai a ogni frame.
  function moltiplicatore(tipo, risorsa) {
    let valore = 1
    for (let i = 0; i < prese.length; i++) {
      const dati = elencoTecnologie.find((voce) => voce.id === prese[i])
      if (riguarda(dati.effetto, tipo, risorsa)) {
        valore *= dati.effetto.moltiplicatore
      }
      if (riguarda(dati.effetto_secondario, tipo, risorsa)) {
        valore *= dati.effetto_secondario.moltiplicatore
      }
    }
    return valore
  }

  function svuota() {
    prese.length = 0
  }

  return { prese, hoGiaPreso, disponibile, prendi, moltiplicatore, svuota }
}
