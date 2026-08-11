// Lo stato della fattoria: com'e' ogni casella, cosa c'e' in magazzino e
// quanti semi restano.
//
// Ogni casella e' in uno di tre stati: **incolto** (terra selvatica, va
// dissodata), **arato** (ci puoi piantare), **occupato**.
//
// Piantare **consuma un seme**: e' quella la cosa che scarseggia all'inizio,
// non lo spazio. All'inizio non puoi riempire il campo neanche volendo, e
// vendendo il problema si scioglie da solo.
//
// Regola di prestazione: le vicinanze si ricalcolano **solo quando la griglia
// cambia**, mai a ogni frame, e il risultato resta scritto sulla casella.

import {
  elencoMateriali,
  elencoPiantabili,
  elencoVicinanze,
  limiti,
  partenza,
  trovaContenuto
} from './config.js'
import { quanteCaselle, vicini } from './griglia.js'

function casellaVuota() {
  return {
    arata: false,
    contenuto: '',
    famiglia: '',
    crescitaMs: 0,
    tempoMaturazione: 0,
    matura: false,
    materiale: '',
    resaBase: 0,
    // vicinanze, riscritte solo quando la griglia cambia
    bonusVelocita: 1,
    irrigata: false,
    legami: new Int16Array(limiti.vicini_massimi),
    quantiLegami: 0,
    // per l'animazione di comparsa
    etaMs: 0
  }
}

export function creaFattoria({ allaRaccolta, alCambioDelCampo }) {
  const caselle = []
  for (let i = 0; i < quanteCaselle; i++) {
    caselle.push(casellaVuota())
  }

  const magazzino = {}
  const semi = {}

  const candidati = new Int16Array(limiti.vicini_massimi)

  function corrisponde(casella, bersaglio) {
    if (!casella.contenuto) {
      return false
    }
    if (bersaglio.id) {
      return casella.contenuto === bersaglio.id
    }
    return casella.famiglia === bersaglio.famiglia
  }

  function contaVicini(indice, regola) {
    const elenco = vicini[indice]
    let quanti = 0
    for (let i = 0; i < elenco.length; i++) {
      if (corrisponde(caselle[elenco[i]], regola.accanto_a)) {
        candidati[quanti] = elenco[i]
        quanti++
      }
    }
    return quanti
  }

  function ricalcolaUna(indice) {
    const casella = caselle[indice]
    casella.bonusVelocita = 1
    casella.irrigata = false
    casella.quantiLegami = 0

    if (!casella.contenuto) {
      return
    }

    for (let r = 0; r < elencoVicinanze.length; r++) {
      const regola = elencoVicinanze[r]
      if (!corrisponde(casella, regola.chi)) {
        continue
      }
      const quanti = contaVicini(indice, regola)
      if (quanti < regola.quante) {
        continue
      }
      const volte = regola.per_ogni ? quanti : 1
      for (let v = 0; v < volte; v++) {
        casella.bonusVelocita *= regola.effetto.moltiplicatore
      }
      casella.irrigata = true
      for (let c = 0; c < quanti && casella.quantiLegami < casella.legami.length; c++) {
        casella.legami[casella.quantiLegami] = candidati[c]
        casella.quantiLegami++
      }
    }
  }

  function ricalcolaVicinanze() {
    for (let i = 0; i < caselle.length; i++) {
      ricalcolaUna(i)
    }
    alCambioDelCampo()
  }

  function caselleArate() {
    let quante = 0
    for (let i = 0; i < caselle.length; i++) {
      if (caselle[i].arata) {
        quante++
      }
    }
    return quante
  }

  function semiDi(idContenuto) {
    return semi[idContenuto] || 0
  }

  function aggiungiSeme(idContenuto, quantita) {
    semi[idContenuto] = (semi[idContenuto] || 0) + (quantita || 1)
  }

  // Dissodare non paga niente: le monete le muove chi chiama, perche' il
  // prezzo lo sa l'economia. Qui si cambia solo il terreno.
  function dissoda(indice) {
    if (indice < 0 || indice >= caselle.length || caselle[indice].arata) {
      return false
    }
    caselle[indice].arata = true
    alCambioDelCampo()
    return true
  }

  // Piantare consuma un seme dal magazzino: e' la regola che rende difficile
  // l'inizio, ed e' il motivo per cui si vende.
  function piazza(indice, idContenuto) {
    if (indice < 0 || indice >= caselle.length) {
      return false
    }
    const casella = caselle[indice]
    if (!casella.arata || casella.contenuto) {
      return false
    }
    if (semiDi(idContenuto) <= 0) {
      return false
    }

    const dati = trovaContenuto(idContenuto)
    semi[idContenuto]--

    casella.contenuto = dati.id
    casella.famiglia = dati.famiglia
    casella.crescitaMs = 0
    casella.matura = false
    casella.etaMs = 0
    casella.tempoMaturazione = dati.tempo_crescita_ms || 0
    casella.materiale = dati.resa ? dati.resa.materiale : ''
    casella.resaBase = dati.resa ? dati.resa.quantita : 0

    ricalcolaVicinanze()
    return true
  }

  // Estirpare restituisce il seme: sbagliare a piantare non deve costare, in
  // un gioco in cui non si perde.
  function rimuovi(indice) {
    if (indice < 0 || indice >= caselle.length || !caselle[indice].contenuto) {
      return false
    }
    const casella = caselle[indice]
    aggiungiSeme(casella.contenuto, 1)
    casella.contenuto = ''
    casella.famiglia = ''
    casella.crescitaMs = 0
    casella.matura = false
    casella.materiale = ''
    casella.resaBase = 0
    ricalcolaVicinanze()
    return true
  }

  // Raccogliere non toglie la coltura: ricomincia a crescere. E' anche il
  // gesto che il bracciante togliera' di mano al giocatore (punto 8).
  function raccogli(indice) {
    const casella = caselle[indice]
    if (!casella.matura || !casella.materiale) {
      return 0
    }
    magazzino[casella.materiale] += casella.resaBase
    casella.crescitaMs = 0
    casella.matura = false
    allaRaccolta(indice, casella.resaBase)
    return casella.resaBase
  }

  // Quando non si riesce a pagare: una casella arata e vuota torna incolta.
  // Mai una casella coltivata, altrimenti si perderebbe un raccolto in corso
  // e sembrerebbe una punizione.
  function abbandonaUnaCasellaVuota() {
    for (let i = caselle.length - 1; i >= 0; i--) {
      if (caselle[i].arata && !caselle[i].contenuto) {
        caselle[i].arata = false
        alCambioDelCampo()
        return true
      }
    }
    return false
  }

  function aggiorna(passoMs) {
    for (let i = 0; i < caselle.length; i++) {
      const casella = caselle[i]
      if (!casella.contenuto) {
        continue
      }
      casella.etaMs += passoMs
      if (casella.famiglia !== 'coltura' || casella.matura) {
        continue
      }
      casella.crescitaMs += passoMs * casella.bonusVelocita
      if (casella.crescitaMs >= casella.tempoMaturazione) {
        casella.crescitaMs = casella.tempoMaturazione
        casella.matura = true
      }
    }
  }

  function reimposta() {
    for (let i = 0; i < caselle.length; i++) {
      const casella = caselle[i]
      casella.arata = false
      casella.contenuto = ''
      casella.famiglia = ''
      casella.crescitaMs = 0
      casella.matura = false
      casella.materiale = ''
      casella.resaBase = 0
      casella.quantiLegami = 0
      casella.bonusVelocita = 1
      casella.irrigata = false
    }
    for (let i = 0; i < elencoMateriali.length; i++) {
      magazzino[elencoMateriali[i].id] = 0
    }
    for (let i = 0; i < elencoPiantabili.length; i++) {
      semi[elencoPiantabili[i].id] = 0
    }
    for (let i = 0; i < partenza.semi.length; i++) {
      semi[partenza.semi[i].id] = partenza.semi[i].quantita
    }
    // il campo di partenza: poche caselle gia' pronte, il resto e' selvatico
    for (let i = 0; i < partenza.caselle_arate && i < caselle.length; i++) {
      // si parte dal fondo, vicino a casa
      caselle[caselle.length - 1 - i].arata = true
    }
    alCambioDelCampo()
  }

  reimposta()

  return {
    caselle,
    magazzino,
    semi,
    semiDi,
    aggiungiSeme,
    caselleArate,
    dissoda,
    piazza,
    rimuovi,
    raccogli,
    abbandonaUnaCasellaVuota,
    aggiorna,
    reimposta
  }
}
