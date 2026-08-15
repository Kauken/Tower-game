// La bacheca e il banco da lavoro.
//
// **Non si compra niente.** Le monete sono state tolte: una cosa si sblocca
// quando ne hai **fabbricata** un'altra. Fabbrichi l'ascia e compare il
// piccone; fabbrichi il piccone e compare quello dopo.
//
// Prima c'erano due elenchi — quello che avevi *comprato* e quello che avevi
// *fatto* — e due economie da tenere separate. Adesso l'elenco e' **uno solo**:
//
//   fatti     quello che hai davvero fabbricato. E' insieme la prova che
//             l'effetto e' acceso **e** la chiave che apre il prossimo.
//
// E' piu' semplice, e dice una cosa piu' vera: **il diritto di costruire si
// guadagna costruendo.**
//
// Il codice non conosce nessun progetto per nome: sa leggere dei *tipi* di
// effetto, e sa se un tipo si moltiplica o si somma.

import { elencoProgetti, elencoRicette, trovaRicetta } from './config.js'

export function creaProgetti() {
  const fatti = []

  // Resta per compatibilita' con chi la chiama ancora: adesso "comprato" e
  // "fatto" sono la stessa cosa, perche' non c'e' piu' niente da comprare.
  function hoComprato(id) {
    return fatti.indexOf(id) >= 0
  }

  function hoFatto(id) {
    return fatti.indexOf(id) >= 0
  }

  // Un progetto e' aperto se non l'hai gia' fatto e se **hai gia' fabbricato**
  // quello che gli serve. E' cosi' che la bacheca ha dei rami invece che
  // essere una lista, adesso senza che passino delle monete.
  function disponibile(id) {
    const dati = elencoProgetti.find((voce) => voce.id === id)
    if (!dati || hoFatto(id)) {
      return false
    }
    return !dati.richiede || hoFatto(dati.richiede)
  }

  // Una ricetta si puo' fare se il progetto che la apre e' aperto, e se non e'
  // un attrezzo che hai gia' addosso. Le ricette dei materiali non
  // chiedono nessun progetto: sono il pane del banco da lavoro.
  function ricettaAperta(id) {
    const dati = elencoRicette.find((voce) => voce.id === id)
    if (!dati) {
      return false
    }
    if (dati.richiede_progetto && !disponibile(dati.richiede_progetto) && !hoFatto(dati.richiede_progetto)) {
      return false
    }
    return !(dati.attrezzo && hoFatto(dati.attrezzo))
  }

  function segnaFatto(idAttrezzo) {
    if (idAttrezzo && !hoFatto(idAttrezzo)) {
      fatti.push(idAttrezzo)
    }
  }

  function riguarda(effetto, tipo, risorsa) {
    if (!effetto || effetto.tipo !== tipo) {
      return false
    }
    // Un effetto puo' nominare **piu' risorse**: il piccone vale sui massi e
    // sulle vene di pietra, che sono cose diverse per il codice ma la stessa
    // cosa per chi gioca. Se non ne nomina nessuna, vale per tutte.
    if (Array.isArray(effetto.risorse)) {
      return effetto.risorse.indexOf(risorsa) >= 0
    }
    return !effetto.risorsa || effetto.risorsa === risorsa
  }

  function effettiFatti(azione) {
    for (let i = 0; i < fatti.length; i++) {
      const dati = elencoProgetti.find((voce) => voce.sblocca === fatti[i] || voce.id === fatti[i])
      if (!dati) {
        continue
      }
      azione(dati)
    }
  }

  // Il moltiplicatore di un tipo, contando **solo gli attrezzi fabbricati**.
  // Si chiama quando l'operaio comincia un lavoro, mai a ogni fotogramma.
  function moltiplicatore(tipo, risorsa) {
    let valore = 1
    effettiFatti((dati) => {
      if (riguarda(dati.effetto, tipo, risorsa)) {
        valore *= dati.effetto.moltiplicatore
      }
      if (riguarda(dati.effetto_secondario, tipo, risorsa)) {
        valore *= dati.effetto_secondario.moltiplicatore
      }
    })
    return valore
  }

  // Non tutto si moltiplica. Le caselle dello zaino si **sommano**: tre in piu'
  // e quattro in piu' fanno sette, non dodici. Un moltiplicatore sulle caselle
  // di un inventario darebbe numeri che non si possono ne' leggere ne'
  // bilanciare.
  function aggiunta(tipo, risorsa) {
    let quante = 0
    effettiFatti((dati) => {
      if (riguarda(dati.effetto, tipo, risorsa)) {
        quante += dati.effetto.aggiunta
      }
      if (riguarda(dati.effetto_secondario, tipo, risorsa)) {
        quante += dati.effetto_secondario.aggiunta
      }
    })
    return quante
  }

  // Quanto potrebbe arrivare a valere prendendo tutto: serve a preallocare le
  // caselle all'avvio, non a giocare.
  function aggiuntaMassima(tipo) {
    let quante = 0
    for (let i = 0; i < elencoProgetti.length; i++) {
      const dati = elencoProgetti[i]
      if (dati.effetto && dati.effetto.tipo === tipo) {
        quante += dati.effetto.aggiunta
      }
      if (dati.effetto_secondario && dati.effetto_secondario.tipo === tipo) {
        quante += dati.effetto_secondario.aggiunta
      }
    }
    return quante
  }

  function svuota() {
    fatti.length = 0
  }

  // Si salvano gli id e basta: gli effetti si ricavano da progetti.json, cosi'
  // un ritocco di bilanciamento arriva anche a un'isola gia' cominciata.
  function daSalvato(dati) {
    svuota()
    if (!dati) {
      return
    }
    const cose = Array.isArray(dati.fatti) ? dati.fatti : []
    for (let i = 0; i < cose.length; i++) {
      if (elencoProgetti.some((voce) => voce.id === cose[i]) && !hoFatto(cose[i])) {
        fatti.push(cose[i])
      }
    }
  }

  function perSalvare() {
    return { fatti: fatti.slice() }
  }

  return {
    fatti,
    hoComprato,
    hoFatto,
    disponibile,
    ricettaAperta,
    segnaFatto,
    moltiplicatore,
    aggiunta,
    aggiuntaMassima,
    perSalvare,
    daSalvato,
    svuota
  }
}

export { trovaRicetta }
