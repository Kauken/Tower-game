// La bacheca e il banco da lavoro.
//
// **Due passi, e sono due economie diverse.** Le monete comprano il
// **progetto** — il *diritto* di fabbricare una cosa. I materiali fabbricano
// la **cosa**. Se i progetti si pagassero coi materiali il mercante sarebbe
// arredamento; se le cose si comprassero con le monete lo sarebbe l'isola.
// Tenendole separate restano vive tutte e due per tutta la partita.
//
// Quindi ci sono **due elenchi**, e la differenza conta:
//   comprati  i progetti che hai pagato. Aprono una ricetta, e basta.
//   fatti     gli attrezzi che hai davvero fabbricato. **Solo questi hanno
//             effetto.** Comprare il progetto dell'ascia non taglia un albero.
//
// Il codice non conosce nessun progetto per nome: sa leggere dei *tipi* di
// effetto, e sa se un tipo si moltiplica o si somma.

import { elencoProgetti, elencoRicette, trovaRicetta } from './config.js'

export function creaProgetti() {
  const comprati = []
  const fatti = []

  function hoComprato(id) {
    return comprati.indexOf(id) >= 0
  }

  function hoFatto(id) {
    return fatti.indexOf(id) >= 0
  }

  // Un progetto si puo' comprare se non ce l'hai gia' e se hai quello che gli
  // serve: e' cosi' che la bacheca ha dei rami invece che essere una lista.
  function disponibile(id) {
    const dati = elencoProgetti.find((voce) => voce.id === id)
    if (!dati || hoComprato(id)) {
      return false
    }
    return !dati.richiede || hoComprato(dati.richiede)
  }

  function compra(id) {
    if (!disponibile(id)) {
      return false
    }
    comprati.push(id)
    return true
  }

  // Una ricetta si puo' fare se il progetto che la apre e' stato comprato, e se
  // non e' un attrezzo che hai gia' addosso. Le ricette dei materiali non
  // chiedono nessun progetto: sono il pane del banco da lavoro.
  function ricettaAperta(id) {
    const dati = elencoRicette.find((voce) => voce.id === id)
    if (!dati) {
      return false
    }
    if (dati.richiede_progetto && !hoComprato(dati.richiede_progetto)) {
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
    // se l'effetto non nomina una risorsa, vale per tutte
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
    comprati.length = 0
    fatti.length = 0
  }

  // Si salvano gli id e basta: gli effetti si ricavano da progetti.json, cosi'
  // un ritocco di bilanciamento arriva anche a un'isola gia' cominciata.
  function daSalvato(dati) {
    svuota()
    if (!dati) {
      return
    }
    const presi = Array.isArray(dati.comprati) ? dati.comprati : []
    for (let i = 0; i < presi.length; i++) {
      if (elencoProgetti.some((voce) => voce.id === presi[i]) && !hoComprato(presi[i])) {
        comprati.push(presi[i])
      }
    }
    const cose = Array.isArray(dati.fatti) ? dati.fatti : []
    for (let i = 0; i < cose.length; i++) {
      if (elencoProgetti.some((voce) => voce.id === cose[i]) && !hoFatto(cose[i])) {
        fatti.push(cose[i])
      }
    }
  }

  function perSalvare() {
    return { comprati: comprati.slice(), fatti: fatti.slice() }
  }

  return {
    comprati,
    fatti,
    hoComprato,
    hoFatto,
    disponibile,
    compra,
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
