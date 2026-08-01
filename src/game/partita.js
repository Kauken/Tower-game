// Lo stato della partita: oro, vita delle due fortezze, assalto e fase.
// Tutti i valori e le curve arrivano da economia.json.

import { economia } from './config.js'

// fase: 'pausa' (fra un assalto e l'altro) | 'ondata' | 'vittoria' | 'sconfitta'
export function creaStatoPartita() {
  const stato = {
    oro: 0,
    fortezza: 0,
    fortezzaNemica: 0,
    ondata: 0,
    fase: 'pausa'
  }
  reimposta(stato)
  return stato
}

export function reimposta(stato) {
  stato.oro = economia.partita.oro_iniziale
  stato.fortezza = economia.partita.vita_fortezza
  stato.fortezzaNemica = economia.partita.vita_fortezza_nemica
  stato.ondata = 0
  stato.fase = 'pausa'
}

// Oro regalato dal completamento di un assalto: cresce assalto dopo assalto.
export function ricompensaOndata(numeroOndata) {
  const ricompense = economia.ricompense
  return Math.round(
    ricompense.oro_base_per_ondata *
      Math.pow(ricompense.oro_per_ondata_crescita, numeroOndata - 1)
  )
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

// Un nemico ha raggiunto la tua fortezza: a zero e' finita.
export function danniAllaFortezza(stato, danno) {
  stato.fortezza -= danno
  if (stato.fortezza <= 0) {
    stato.fortezza = 0
    stato.fase = 'sconfitta'
  }
}

// Un tuo minion ha raggiunto la fortezza nemica: a zero hai vinto.
export function danniAllaFortezzaNemica(stato, danno) {
  stato.fortezzaNemica -= danno
  if (stato.fortezzaNemica <= 0) {
    stato.fortezzaNemica = 0
    stato.fase = 'vittoria'
  }
}
