// Lo stato della run: a che ondata siamo, come sta il castello, in che fase.

import { partitaIniziale } from './config.js'

// fase: 'attesa' (l'ondata sta per arrivare) | 'ondata' | 'sconfitta'
export function creaStatoPartita() {
  const stato = {
    ondata: 1,
    fase: 'attesa',
    attesaMs: 0,
    nemiciRimanenti: 0,
    quantitaProssimaOndata: 0,
    nemiciNuovi: [],
    vitaCastello: 0,
    vitaCastelloMassima: partitaIniziale.vita_castello
  }
  reimposta(stato)
  return stato
}

export function reimposta(stato) {
  stato.ondata = 1
  stato.fase = 'attesa'
  stato.attesaMs = 0
  stato.nemiciRimanenti = 0
  stato.vitaCastello = partitaIniziale.vita_castello
  stato.vitaCastelloMassima = partitaIniziale.vita_castello
}

// Un nemico e' arrivato in fondo. La sconfitta si accumula e si vede arrivare:
// non c'e' morte istantanea da un errore solo.
export function colpisciCastello(stato, danno) {
  stato.vitaCastello -= danno
  if (stato.vitaCastello <= 0) {
    stato.vitaCastello = 0
    stato.fase = 'sconfitta'
  }
}
