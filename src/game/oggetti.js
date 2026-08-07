// Gli oggetti raccolti nella run. Si accumulano e non si perdono mai.
//
// Il codice non sa cosa faccia un oggetto in particolare: sa leggere dei tipi
// di effetto e li applica. Aggiungere un oggetto nuovo e' scrivere una voce in
// potenziamenti.json, non toccare questo file.
//
// I tipi che il codice conosce:
//   moltiplica          una statistica della recluta, per categoria o 'tutte'
//   rendita             oro in piu' per ciclo dalle torri
//   sconto              tutte le reclute costano meno
//   oro_uccisione       oro in piu' per ogni nemico ucciso
//   guarigione_ondata   le reclute ferite recuperano fra un'ondata e l'altra
//   rinforzo            una squadra gratis a ogni ondata
//   esplosione_morte    la recluta che muore scoppia e ferisce i nemici vicini
//   rallenta            i nemici colpiti marciano piu' piano
//   veterano            ogni uccisione rende la recluta piu' forte, per sempre
//   spine               chi colpisce la recluta si ferisce da solo
//
// Gli effetti "dinamici" (gli ultimi quattro) non si leggono a ogni frame: si
// leggono alla nascita di una recluta e restano scritti su di lei.

import { elencoPotenziamenti } from './config.js'

const somma = (a, b) => a + b
const massimo = (a, b) => (a > b ? a : b)
const prodotto = (a, b) => a * b

export function creaOggetti() {
  const presi = []
  // ricalcolati a ogni oggetto preso, mai dentro il ciclo di gioco
  let squadreGratis = []

  function riguarda(effetto, tipo, categoria) {
    if (!effetto || effetto.tipo !== tipo) {
      return false
    }
    if (!effetto.categoria || effetto.categoria === 'tutte') {
      return true
    }
    return effetto.categoria === categoria
  }

  // Percorre tutti gli effetti raccolti che corrispondono a tipo e categoria e
  // ne combina il campo richiesto. Gira solo quando nasce una recluta o quando
  // si prende un oggetto: mai a ogni frame.
  function accumula(categoria, tipo, campo, iniziale, unisci) {
    let valore = iniziale
    for (let i = 0; i < presi.length; i++) {
      const oggetto = presi[i]
      if (riguarda(oggetto.effetto, tipo, categoria) && campo in oggetto.effetto) {
        valore = unisci(valore, oggetto.effetto[campo])
      }
      const secondario = oggetto.effetto_secondario
      if (riguarda(secondario, tipo, categoria) && campo in secondario) {
        valore = unisci(valore, secondario[campo])
      }
    }
    return valore
  }

  function ricalcolaSquadreGratis() {
    squadreGratis = []
    for (let i = 0; i < presi.length; i++) {
      if (presi[i].effetto.tipo === 'rinforzo') {
        squadreGratis.push(presi[i].effetto)
      }
    }
  }

  function svuota() {
    presi.length = 0
    ricalcolaSquadreGratis()
  }

  function prendi(idOggetto) {
    const oggetto = elencoPotenziamenti.find((voce) => voce.id === idOggetto)
    if (!oggetto || presi.indexOf(oggetto) >= 0) {
      return false
    }
    presi.push(oggetto)
    ricalcolaSquadreGratis()
    return true
  }

  function applicabile(effetto, categoria, statistica) {
    return (
      riguarda(effetto, 'moltiplica', categoria) && effetto.statistica === statistica
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

  function effettoSomma(categoria, tipo, campo) {
    return accumula(categoria, tipo, campo, 0, somma)
  }

  function effettoMassimo(categoria, tipo, campo) {
    return accumula(categoria, tipo, campo, 0, massimo)
  }

  function effettoProdotto(categoria, tipo, campo) {
    return accumula(categoria, tipo, campo, 1, prodotto)
  }

  // oro in piu' per ciclo, dagli oggetti che potenziano le torri
  function renditaAggiunta() {
    return effettoSomma('tutte', 'rendita', 'valore')
  }

  // quanto costano le reclute rispetto al listino
  function scontoReclute() {
    return effettoProdotto('tutte', 'sconto', 'valore')
  }

  function oroPerUccisione() {
    return effettoSomma('tutte', 'oro_uccisione', 'valore')
  }

  // quanta vita recuperano le reclute ferite alla fine di un'ondata, come
  // frazione della loro vita massima. Senza oggetti e' zero: e' l'usura che
  // tiene viva la partita.
  function guarigioneFraOndate() {
    return effettoSomma('tutte', 'guarigione_ondata', 'valore')
  }

  function rinforzi() {
    return squadreGratis
  }

  function hoGiaPreso(idOggetto) {
    return presi.some((oggetto) => oggetto.id === idOggetto)
  }

  return {
    prendi,
    svuota,
    moltiplicatore,
    effettoSomma,
    effettoMassimo,
    effettoProdotto,
    renditaAggiunta,
    scontoReclute,
    oroPerUccisione,
    guarigioneFraOndate,
    rinforzi,
    hoGiaPreso
  }
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
