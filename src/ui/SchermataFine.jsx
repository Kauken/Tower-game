import React from 'react'
import { interfaccia } from '../game/config.js'

// Fine della run: il castello e' caduto. Occupa tutto lo schermo.
export default function SchermataFine({ ondata, onRicomincia }) {
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
        Il castello è caduto
      </div>
      <div style={{ fontSize: interfaccia.testo_normale }}>
        Hai resistito fino all'ondata {ondata}.
      </div>
      <button
        type="button"
        onClick={onRicomincia}
        style={{
          minHeight: interfaccia.altezza_minima_tocco,
          marginTop: interfaccia.spaziatura,
          paddingLeft: interfaccia.spaziatura * 2,
          paddingRight: interfaccia.spaziatura * 2,
          border: 'none',
          borderRadius: interfaccia.raggio_angoli,
          background: interfaccia.pulsanti.colore_recluta,
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
