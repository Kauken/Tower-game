// La coda dei lavori.
//
// Il giocatore non tocca mai il terreno con le mani: **mette in coda del
// lavoro, e un bracciante libero lo prende.** E' il modello di RimWorld,
// ridotto a quello che si comanda con un pollice.
//
// Un lavoro nasce quando si tocca qualcosa sull'isola, resta li' finche' non
// c'e' qualcuno del mestiere giusto che lo prende, e sparisce quando e' fatto.
// Tutto da pool preallocato: dentro il ciclo di gioco non si crea niente.

import { limiti, risorse } from './config.js'
import { creaPool, primoLibero } from './pool.js'

export function creaLavori() {
  const coda = creaPool(limiti.lavori_massimi, () => ({
    attivo: false,
    tipo: '',
    mestiere: '',
    tx: 0,
    ty: 0,
    preso: false
  }))

  function trovaSuTessera(tx, ty) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (lavoro.attivo && lavoro.tx === tx && lavoro.ty === ty) {
        return lavoro
      }
    }
    return null
  }

  // Toccare due volte la stessa cosa annulla l'ordine invece di darne un
  // altro: e' l'unico modo per disdire senza aggiungere un altro comando.
  function ordina(tx, ty, nomeRisorsa) {
    const gia = trovaSuTessera(tx, ty)
    if (gia) {
      if (!gia.preso) {
        gia.attivo = false
      }
      return false
    }

    const dati = risorse[nomeRisorsa]
    if (!dati || !dati.mestiere) {
      return false
    }

    const lavoro = primoLibero(coda)
    if (!lavoro) {
      return false
    }
    lavoro.attivo = true
    lavoro.tipo = nomeRisorsa
    lavoro.mestiere = dati.mestiere
    lavoro.tx = tx
    lavoro.ty = ty
    lavoro.preso = false
    return true
  }

  // Il primo lavoro libero che quel mestiere sa fare. Nessuna priorita' e
  // nessuna griglia da compilare: un bracciante, un mestiere.
  function prossimoPer(mestiere) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (lavoro.attivo && !lavoro.preso && lavoro.mestiere === mestiere) {
        return lavoro
      }
    }
    return null
  }

  function quantiInAttesa() {
    let quanti = 0
    for (let i = 0; i < coda.length; i++) {
      if (coda[i].attivo) {
        quanti++
      }
    }
    return quanti
  }

  function svuota() {
    for (let i = 0; i < coda.length; i++) {
      coda[i].attivo = false
      coda[i].preso = false
    }
  }

  return { coda, ordina, prossimoPer, trovaSuTessera, quantiInAttesa, svuota }
}
