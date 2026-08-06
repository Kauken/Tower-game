// Gli oggetti raccolti nella run. Si accumulano e non si perdono mai.
//
// Il codice non sa cosa faccia un oggetto in particolare: sa leggere tre tipi
// di effetto (moltiplica, rendita, sconto) e li applica. Aggiungere un oggetto
// nuovo e' scrivere una voce in potenziamenti.json, non toccare questo file.

import { elencoPotenziamenti } from './config.js'

export function creaOggetti() {
  const presi = []

  function svuota() {
    presi.length = 0
  }

  function prendi(idOggetto) {
    const oggetto = elencoPotenziamenti.find((voce) => voce.id === idOggetto)
    if (!oggetto || presi.indexOf(oggetto) >= 0) {
      return false
    }
    presi.push(oggetto)
    return true
  }

  function applicabile(effetto, categoria, statistica) {
    return (
      effetto &&
      effetto.tipo === 'moltiplica' &&
      effetto.statistica === statistica &&
      (effetto.categoria === 'tutte' || effetto.categoria === categoria)
    )
  }

  // Quanto va moltiplicata una statistica di una recluta, tenuto conto di
  // tutti gli oggetti presi. Viene chiamata solo alla nascita di una recluta,
  // mai a ogni frame.
  function moltiplicatore(categoria, statistica) {
    let valore = 1
    for (let i = 0; i < presi.length; i++) {
      const oggetto = presi[i]
      if (applicabile(oggetto.effetto, categoria, statistica)) {
        valore *= oggetto.effetto.valore
      }
      if (applicabile(oggetto.effetto_secondario, categoria, statistica)) {
        valore *= oggetto.effetto_secondario.valore
      }
    }
    return valore
  }

  function sommaDi(tipo) {
    let totale = 0
    for (let i = 0; i < presi.length; i++) {
      if (presi[i].effetto.tipo === tipo) {
        totale += presi[i].effetto.valore
      }
    }
    return totale
  }

  function prodottoDi(tipo) {
    let valore = 1
    for (let i = 0; i < presi.length; i++) {
      if (presi[i].effetto.tipo === tipo) {
        valore *= presi[i].effetto.valore
      }
    }
    return valore
  }

  // oro in piu' per ciclo, dagli oggetti che potenziano le torri
  function renditaAggiunta() {
    return sommaDi('rendita')
  }

  // quanto costano le reclute rispetto al listino
  function scontoReclute() {
    return prodottoDi('sconto')
  }

  function hoGiaPreso(idOggetto) {
    return presi.some((oggetto) => oggetto.id === idOggetto)
  }

  return { prendi, svuota, moltiplicatore, renditaAggiunta, scontoReclute, hoGiaPreso }
}

// Pesca `quanti` oggetti diversi fra quelli non ancora presi. Serve alla
// schermata di scelta: si pesca una volta sola, mai dentro il ciclo di gioco.
export function pescaOfferta(oggetti, quanti) {
  const disponibili = elencoPotenziamenti.filter((voce) => !oggetti.hoGiaPreso(voce.id))
  const offerta = []
  while (offerta.length < quanti && disponibili.length > 0) {
    const indice = Math.floor(Math.random() * disponibili.length)
    offerta.push(disponibili[indice])
    disponibili.splice(indice, 1)
  }
  return offerta
}
