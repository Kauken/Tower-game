// Lo stato della partita: oro, vita dei due castelli, grado di pressione e
// fase. Tutti i valori e le curve arrivano da economia.json.

import { economia } from './config.js'

// fase: 'assedio' | 'vittoria' | 'sconfitta'.
// Non c'e' piu' una fase di pausa: dal pivot a campo aperto l'assedio non si
// interrompe, la pressione sale da sola.
export function creaStatoPartita() {
  const stato = {
    oro: 0,
    fortezza: 0,
    fortezzaNemica: 0,
    grado: 1,
    fase: 'assedio'
  }
  reimposta(stato)
  return stato
}

export function reimposta(stato) {
  stato.oro = economia.partita.oro_iniziale
  stato.fortezza = economia.partita.vita_fortezza
  stato.fortezzaNemica = economia.partita.vita_fortezza_nemica
  stato.grado = 1
  stato.fase = 'assedio'
}

export function puoPagare(stato, costo) {
  return stato.oro >= costo
}

export function paga(stato, costo) {
  stato.oro -= costo
}

export function incassa(stato, oro) {
  stato.oro += oro
}

// Un nemico ha raggiunto il tuo castello: a zero e' finita.
export function danniAllaFortezza(stato, danno) {
  stato.fortezza -= danno
  if (stato.fortezza <= 0) {
    stato.fortezza = 0
    stato.fase = 'sconfitta'
  }
}

// Un tuo minion ha raggiunto il castello nemico: a zero hai vinto.
export function danniAllaFortezzaNemica(stato, danno) {
  stato.fortezzaNemica -= danno
  if (stato.fortezzaNemica <= 0) {
    stato.fortezzaNemica = 0
    stato.fase = 'vittoria'
  }
}
