import React from 'react'
import { interfaccia } from '../game/config.js'

// Fra un'ondata e l'altra il gioco aspetta: si riparte solo quando il
// giocatore e' pronto. Su telefono l'interruzione e' la norma.
export default function PulsanteOndata({ prossimaOndata, onChiama }) {
  return (
    <button
      type="button"
      onClick={onChiama}
      style={{
        width: '100%',
        minHeight: interfaccia.altezza_minima_tocco,
        border: 'none',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pulsante,
        color: interfaccia.colore_pulsante_testo,
        fontSize: interfaccia.testo_normale,
        fontWeight: 600,
        fontFamily: 'inherit',
        touchAction: 'manipulation'
      }}
    >
      Chiama l'ondata {prossimaOndata}
    </button>
  )
}
