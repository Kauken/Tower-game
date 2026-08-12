// L'inventario a slot, come in Minecraft.
//
// Non e' un contatore: e' una fila di caselle, e ogni casella tiene **una pila
// di un materiale solo**. Quaranta legni stanno in una casella, il
// quarantunesimo ne occupa un'altra. Quando le caselle finiscono, l'operaio
// **non puo' piu' raccogliere niente**.
//
// E' quel limite che fa esistere il gioco del trasporto. Se la roba sparisse
// in un magazzino, i nastri sarebbero un gadget; cosi' invece sono la risposta
// a un problema che si e' sentito addosso per ore.
//
// Lo stesso modulo serve all'operaio e alle casse: "quanto ci sta dentro" vuol
// dire la stessa cosa ovunque, e spostare roba e' sempre lo stesso gesto.
//
// Non si alloca niente dopo la creazione: le caselle nascono una volta sola e
// vengono riempite e svuotate sul posto.

import { elencoMateriali } from './config.js'

// le pile si leggono una volta sola all'avvio: dentro il ciclo di gioco non si
// cerca niente in configurazione
const pile = {}
for (let i = 0; i < elencoMateriali.length; i++) {
  pile[elencoMateriali[i].id] = elencoMateriali[i].pila
}

export function pilaDi(materiale) {
  return pile[materiale] || 0
}

// slotMassimi e' quanto puo' arrivare a crescere (le tecnologie aggiungono
// tasche): le caselle si creano tutte subito e restano spente finche' non
// servono. slotAttivi e' quante se ne usano adesso.
export function creaInventario(slotMassimi, slotAttivi) {
  const slot = new Array(slotMassimi)
  for (let i = 0; i < slotMassimi; i++) {
    slot[i] = { materiale: '', quantita: 0 }
  }

  // aggiornato sul posto: il disegno lo legge a ogni frame e non deve contare
  const stato = { slot, attivi: Math.min(slotAttivi, slotMassimi), massimi: slotMassimi, pezzi: 0 }

  function apri(quanti) {
    stato.attivi = Math.min(quanti, slotMassimi)
  }

  function quanti(materiale) {
    let totale = 0
    for (let i = 0; i < stato.attivi; i++) {
      if (slot[i].materiale === materiale) {
        totale += slot[i].quantita
      }
    }
    return totale
  }

  // Quanti pezzi di questo materiale ci starebbero ancora: le pile mezze piene
  // contano, le caselle vuote contano per una pila intera.
  function spazioPer(materiale) {
    const pila = pilaDi(materiale)
    let posto = 0
    for (let i = 0; i < stato.attivi; i++) {
      if (!slot[i].materiale) {
        posto += pila
      } else if (slot[i].materiale === materiale) {
        posto += pila - slot[i].quantita
      }
    }
    return posto
  }

  // Quanto e' entrato davvero. Prima si completano le pile gia' cominciate,
  // poi si occupa una casella nuova: e' l'ordine che uno si aspetta guardando.
  function metti(materiale, quantita) {
    const pila = pilaDi(materiale)
    if (pila <= 0 || quantita <= 0) {
      return 0
    }
    let resta = quantita
    for (let i = 0; i < stato.attivi && resta > 0; i++) {
      if (slot[i].materiale !== materiale) {
        continue
      }
      const entra = Math.min(resta, pila - slot[i].quantita)
      slot[i].quantita += entra
      resta -= entra
    }
    for (let i = 0; i < stato.attivi && resta > 0; i++) {
      if (slot[i].materiale) {
        continue
      }
      const entra = Math.min(resta, pila)
      slot[i].materiale = materiale
      slot[i].quantita = entra
      resta -= entra
    }
    const entrato = quantita - resta
    stato.pezzi += entrato
    return entrato
  }

  // Quanto e' uscito davvero. Si svuotano prima le pile piu' magre, cosi' le
  // caselle si liberano invece di restare tutte a meta'.
  function togli(materiale, quantita) {
    let resta = quantita
    for (let i = 0; i < stato.attivi && resta > 0; i++) {
      if (slot[i].materiale !== materiale) {
        continue
      }
      const esce = Math.min(resta, slot[i].quantita)
      slot[i].quantita -= esce
      resta -= esce
      if (slot[i].quantita <= 0) {
        slot[i].materiale = ''
        slot[i].quantita = 0
      }
    }
    const uscito = quantita - resta
    stato.pezzi -= uscito
    return uscito
  }

  // Pieno vuol dire "non ci entra piu' niente di niente": nessuna casella
  // libera e nessuna pila da finire.
  function pieno() {
    for (let i = 0; i < stato.attivi; i++) {
      if (!slot[i].materiale || slot[i].quantita < pilaDi(slot[i].materiale)) {
        return false
      }
    }
    return true
  }

  // Quante caselle non hanno ancora niente dentro. **Non e' la stessa cosa di
  // "pieno"**: con tutte le caselle occupate ma qualcuna a meta' ci sta ancora
  // dell'altro dello stesso materiale, ma **niente di nuovo**. E' questo il
  // numero che spiega perche' l'operaio si e' fermato: aveva ancora posto per
  // il legno, non per la pietra.
  function caselleLibere() {
    let quante = 0
    for (let i = 0; i < stato.attivi; i++) {
      if (!slot[i].materiale) {
        quante++
      }
    }
    return quante
  }

  function occupati() {
    let quante = 0
    for (let i = 0; i < stato.attivi; i++) {
      if (slot[i].materiale) {
        quante++
      }
    }
    return quante
  }

  // Il primo materiale che ha addosso: serve al pallino sopra la testa, che si
  // disegna a ogni frame e non puo' permettersi di cercare.
  function primoMateriale() {
    for (let i = 0; i < stato.attivi; i++) {
      if (slot[i].materiale) {
        return slot[i].materiale
      }
    }
    return ''
  }

  function svuota() {
    for (let i = 0; i < slot.length; i++) {
      slot[i].materiale = ''
      slot[i].quantita = 0
    }
    stato.pezzi = 0
  }

  return {
    stato,
    slot,
    apri,
    quanti,
    spazioPer,
    metti,
    togli,
    pieno,
    caselleLibere,
    occupati,
    primoMateriale,
    svuota
  }
}

// Sposta quello che si puo' da un inventario all'altro. Se il materiale e'
// vuoto sposta tutto. Restituisce quanti pezzi si sono mossi: se e' zero, chi
// ha dato l'ordine deve poterlo dire, non fingere che sia andata bene.
export function travasa(da, a, materiale) {
  let mossi = 0
  for (let i = 0; i < elencoMateriali.length; i++) {
    const id = elencoMateriali[i].id
    if (materiale && id !== materiale) {
      continue
    }
    const disponibili = da.quanti(id)
    if (disponibili <= 0) {
      continue
    }
    const entrati = a.metti(id, disponibili)
    if (entrati > 0) {
      da.togli(id, entrati)
      mossi += entrati
    }
  }
  return mossi
}
