// La coda dei lavori.
//
// Il giocatore non tocca mai il terreno con le mani: **mette in coda del
// lavoro, e un bracciante libero lo prende.** E' il modello di RimWorld,
// ridotto a quello che si comanda con un pollice.
//
// Un lavoro nasce quando si tocca qualcosa sull'isola, resta in coda finche'
// l'operaio non arriva a farlo, e sparisce quando e' fatto. Con un operaio
// solo la coda si vede tutta, e l'ordine in cui l'hai data e' l'ordine in cui
// verra' fatta.
// Tutto da pool preallocato: dentro il ciclo di gioco non si crea niente.

import { limiti, risorse } from './config.js'
import { maturoIn } from './mondo.js'
import { creaPool, primoLibero } from './pool.js'

export function creaLavori() {
  // Un lavoro ha gia' i campi per un'origine e una destinazione, anche se per
  // adesso li usa solo come bersaglio: trasportare sara' "prendi X da A e
  // portalo a B", e aggiungerli dopo aver costruito i nastri costerebbe rifare
  // i nastri. Vedi GDD 6b.
  const coda = creaPool(limiti.lavori_massimi, () => ({
    attivo: false,
    tipo: '',
    tx: 0,
    ty: 0,
    versoTx: -1,
    versoTy: -1,
    materiale: '',
    quantita: 0,
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
    if (!dati || !dati.lavorabile) {
      return false
    }
    // un germoglio non si taglia: sta ancora ricrescendo
    if (!maturoIn(tx, ty)) {
      return false
    }

    const lavoro = primoLibero(coda)
    if (!lavoro) {
      return false
    }
    lavoro.attivo = true
    lavoro.tipo = nomeRisorsa
    lavoro.tx = tx
    lavoro.ty = ty
    lavoro.versoTx = -1
    lavoro.versoTy = -1
    lavoro.materiale = ''
    lavoro.quantita = 0
    lavoro.preso = false
    return true
  }

  // Il primo lavoro libero, nell'ordine in cui l'hai dato. Con un operaio solo
  // non serve nessuna priorita': fa una cosa per volta, e si vede quale.
  function prossimo() {
    for (let i = 0; i < coda.length; i++) {
      if (coda[i].attivo && !coda[i].preso) {
        return coda[i]
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

  return { coda, ordina, prossimo, trovaSuTessera, quantiInAttesa, svuota }
}
