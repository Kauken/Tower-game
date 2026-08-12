// Le monete.
//
// Entrano vendendo quello che c'e' **dentro una cassa** — non c'e' un magazzino
// centrale da cui vendere tutto insieme: anche vendere e' una cosa che succede
// in un posto.
//
// Escono ogni sera coi salari. La domanda che questi numeri devono rendere
// difficile e' una sola: **assumo un altro, o me lo faccio bastare?**

import { elencoMateriali, partenzaEconomia, vendita } from './config.js'

export function creaEconomia() {
  const stato = {
    monete: 0
  }

  function reimposta() {
    stato.monete = partenzaEconomia.monete
  }

  function prezzo(idMateriale) {
    const materiale = elencoMateriali.find((voce) => voce.id === idMateriale)
    return materiale ? materiale.prezzo * vendita.moltiplicatore : 0
  }

  function paga(quanto) {
    if (stato.monete < quanto) {
      return false
    }
    stato.monete -= quanto
    return true
  }

  function incassa(quanto) {
    stato.monete += quanto
  }

  // Quanto varrebbe svuotare questa cassa: serve a far vedere la decisione
  // prima di prenderla.
  function valoreDi(cassa) {
    let totale = 0
    for (let i = 0; i < elencoMateriali.length; i++) {
      const id = elencoMateriali[i].id
      totale += cassa.inventario.quanti(id) * prezzo(id)
    }
    return Math.round(totale)
  }

  // Svuota una cassa e incassa. Si vende **quella cassa**, non tutto quello
  // che hai: se la roba e' lontana, portarla al mercante e' un problema tuo.
  function vendiCassa(casse, cassa) {
    let incasso = 0
    for (let i = 0; i < elencoMateriali.length; i++) {
      const id = elencoMateriali[i].id
      const quanti = cassa.inventario.quanti(id)
      if (quanti <= 0) {
        continue
      }
      cassa.inventario.togli(id, quanti)
      incasso += quanti * prezzo(id)
    }
    incasso = Math.round(incasso)
    incassa(incasso)
    return incasso
  }

  reimposta()

  return { stato, reimposta, prezzo, paga, incassa, valoreDi, vendiCassa }
}
