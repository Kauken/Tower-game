import React from 'react'
import { interfaccia } from '../game/config.js'

// Occupa tutto lo schermo: a partita persa non si tocca piu' il campo.
export default function SchermataSconfitta({ ondata, onRicomincia }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: interfaccia.spaziatura,
        padding: interfaccia.spaziatura,
        background: interfaccia.colore_sconfitta,
        color: interfaccia.colore_testo,
        textAlign: 'center'
      }}
    >
      <div
        style={{
          fontSize: interfaccia.testo_titolo,
          fontWeight: 700,
          color: interfaccia.colore_allarme
        }}
      >
        Sconfitta
      </div>
      <div style={{ fontSize: interfaccia.testo_normale }}>
        Sei arrivato all'ondata {ondata}.
      </div>
      <button
        type="button"
        onClick={onRicomincia}
        style={{
          minHeight: interfaccia.altezza_minima_tocco,
          marginTop: interfaccia.spaziatura,
          paddingLeft: interfaccia.spaziatura,
          paddingRight: interfaccia.spaziatura,
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
        Ricomincia
      </button>
    </div>
  )
}
