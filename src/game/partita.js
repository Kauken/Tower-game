// Lo stato della partita: oro, vite, numero di ondata e fase.
// Tutti i valori e le curve arrivano da economia.json.

import { economia } from './config.js'

// fase: 'pausa' (fra un'ondata e l'altra) | 'ondata' | 'sconfitta'
export function creaStatoPartita() {
  const stato = {
    oro: 0,
    vite: 0,
    ondata: 0,
    fase: 'pausa'
  }
  reimposta(stato)
  return stato
}

export function reimposta(stato) {
  stato.oro = economia.partita.oro_iniziale
  stato.vite = economia.partita.vite_iniziali
  stato.ondata = 0
  stato.fase = 'pausa'
}

// Oro regalato dal completamento di un'ondata: cresce ondata dopo ondata.
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

// Un nemico e' arrivato in fondo: si perde una vita, e a zero e' finita.
export function perdiVita(stato) {
  stato.vite--
  if (stato.vite <= 0) {
    stato.vite = 0
    stato.fase = 'sconfitta'
  }
}
