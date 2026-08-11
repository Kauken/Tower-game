// Lo stato della fattoria: cosa c'e' su ogni casella, quanto e' cresciuto, e
// quali vicinanze sono accese.
//
// Regola di prestazione: **le vicinanze non si ricalcolano a ogni frame.** Si
// ricalcolano solo quando la griglia cambia — un piazzamento, una rimozione —
// e il risultato resta scritto sulla casella. Dentro aggiorna() non si crea
// niente e non si cerca niente.

import {
  elencoMateriali,
  elencoVicinanze,
  limiti,
  trovaContenuto
} from './config.js'
import { quanteCaselle, vicini } from './griglia.js'

function casellaVuota() {
  return {
    contenuto: '',
    famiglia: '',
    // crescita
    crescitaMs: 0,
    tempoMaturazione: 0,
    matura: false,
    // resa
    materiale: '',
    resaBase: 0,
    // vicinanze, riscritte solo quando la griglia cambia
    bonusResa: 1,
    bonusVelocita: 1,
    legami: new Int16Array(limiti.vicini_massimi),
    quantiLegami: 0,
    // gia' pronta per il disegno: comporre la stringa a ogni frame sarebbe
    // un'allocazione per casella per fotogramma
    etichetta: '',
    irrigata: false,
    // per l'animazione di comparsa
    etaMs: 0
  }
}

export function creaFattoria({ allaRaccolta }) {
  const caselle = []
  for (let i = 0; i < quanteCaselle; i++) {
    caselle.push(casellaVuota())
  }

  const magazzino = {}
  for (let i = 0; i < elencoMateriali.length; i++) {
    magazzino[elencoMateriali[i].id] = 0
  }

  // spazi di lavoro preallocati per il ricalcolo delle vicinanze
  const candidati = new Int16Array(limiti.vicini_massimi)
  const gia_visti = new Array(limiti.vicini_massimi).fill('')

  function corrisponde(casella, bersaglio) {
    if (!casella.contenuto) {
      return false
    }
    if (bersaglio.id) {
      return casella.contenuto === bersaglio.id
    }
    return casella.famiglia === bersaglio.famiglia
  }

  // Quante caselle vicine soddisfano la regola, e quali. Se la regola chiede
  // vicini "diversi", conta i tipi distinti e diversi dal soggetto: e' quello
  // che rende Rotazione il contrario di Filare.
  function contaVicini(indice, regola) {
    const casella = caselle[indice]
    const elenco = vicini[indice]
    let quanti = 0
    let quantiDistinti = 0

    for (let i = 0; i < elenco.length; i++) {
      const vicino = caselle[elenco[i]]
      if (!corrisponde(vicino, regola.accanto_a)) {
        continue
      }
      if (regola.diverse) {
        if (vicino.contenuto === casella.contenuto) {
          continue
        }
        let ripetuto = false
        for (let j = 0; j < quantiDistinti; j++) {
          if (gia_visti[j] === vicino.contenuto) {
            ripetuto = true
            break
          }
        }
        if (ripetuto) {
          continue
        }
        gia_visti[quantiDistinti] = vicino.contenuto
        quantiDistinti++
      }
      candidati[quanti] = elenco[i]
      quanti++
    }
    return quanti
  }

  function aggiungiLegame(casella, indiceVicino) {
    for (let i = 0; i < casella.quantiLegami; i++) {
      if (casella.legami[i] === indiceVicino) {
        return
      }
    }
    if (casella.quantiLegami < casella.legami.length) {
      casella.legami[casella.quantiLegami] = indiceVicino
      casella.quantiLegami++
    }
  }

  function ricalcolaUna(indice) {
    const casella = caselle[indice]
    casella.bonusResa = 1
    casella.bonusVelocita = 1
    casella.quantiLegami = 0
    casella.irrigata = false
    casella.etichetta = ''

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

      // "per_ogni" moltiplica una volta per vicino: e' cosi' che un filare
      // lungo vale piu' di una coppia
      const volte = regola.per_ogni ? quanti : 1
      for (let v = 0; v < volte; v++) {
        if (regola.effetto.statistica === 'resa') {
          casella.bonusResa *= regola.effetto.moltiplicatore
        } else {
          casella.bonusVelocita *= regola.effetto.moltiplicatore
          casella.irrigata = true
        }
      }

      for (let c = 0; c < quanti; c++) {
        aggiungiLegame(casella, candidati[c])
      }
    }

    if (casella.bonusResa > 1) {
      casella.etichetta = '×' + casella.bonusResa.toFixed(1)
    }

    // il tempo che manca cambia con la velocita': si ricalcola qui, cosi'
    // aggiorna() non deve fare conti
    if (casella.famiglia === 'coltura') {
      casella.matura = casella.crescitaMs >= casella.tempoMaturazione
    }
  }

  function ricalcolaVicinanze() {
    for (let i = 0; i < caselle.length; i++) {
      ricalcolaUna(i)
    }
  }

  function piazza(indice, idContenuto) {
    if (indice < 0 || indice >= caselle.length || caselle[indice].contenuto) {
      return false
    }
    const dati = trovaContenuto(idContenuto)
    const casella = caselle[indice]

    casella.contenuto = dati.id
    casella.famiglia = dati.famiglia
    casella.crescitaMs = 0
    casella.matura = false
    casella.etaMs = 0
    casella.tempoMaturazione = dati.tempo_crescita_ms || 0
    casella.materiale = dati.resa ? dati.resa.materiale : ''
    casella.resaBase = dati.resa ? dati.resa.quantita : 0

    // cambia la griglia: cambiano anche i vicini, non solo questa casella
    ricalcolaVicinanze()
    return true
  }

  function rimuovi(indice) {
    if (indice < 0 || indice >= caselle.length || !caselle[indice].contenuto) {
      return false
    }
    const casella = caselle[indice]
    casella.contenuto = ''
    casella.famiglia = ''
    casella.crescitaMs = 0
    casella.matura = false
    casella.materiale = ''
    casella.resaBase = 0
    ricalcolaVicinanze()
    return true
  }

  // Raccogliere non toglie la coltura: ricomincia a crescere. Cosi' il
  // giocatore guarda la disposizione invece di ripiantare in continuazione —
  // ed e' anche il gesto che lo spaventapasseri gli togliera' (punto 7).
  function raccogli(indice) {
    const casella = caselle[indice]
    if (!casella.matura || !casella.materiale) {
      return 0
    }
    const quantita = Math.max(1, Math.round(casella.resaBase * casella.bonusResa))
    magazzino[casella.materiale] += quantita
    casella.crescitaMs = 0
    casella.matura = false
    allaRaccolta(indice, quantita)
    return quantita
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

  function svuota() {
    for (let i = 0; i < caselle.length; i++) {
      rimuovi(i)
    }
    for (let i = 0; i < elencoMateriali.length; i++) {
      magazzino[elencoMateriali[i].id] = 0
    }
  }

  return { caselle, magazzino, piazza, rimuovi, raccogli, aggiorna, svuota }
}
