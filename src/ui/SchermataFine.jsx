import React from 'react'
import { interfaccia } from '../game/config.js'

// Fine della partita, vinta o persa: occupa tutto lo schermo.
export default function SchermataFine({ esito, ondata, onRicomincia }) {
  const vittoria = esito === 'vittoria'
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
          color: vittoria ? interfaccia.colore_pulsante : interfaccia.colore_allarme
        }}
      >
        {vittoria ? 'Vittoria!' : 'Sconfitta'}
      </div>
      <div style={{ fontSize: interfaccia.testo_normale }}>
        {vittoria
          ? `La fortezza nemica è caduta all'assalto ${ondata}.`
          : `La tua fortezza è caduta all'assalto ${ondata}.`}
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
        {vittoria ? 'Nuova partita' : 'Ricomincia'}
      </button>
    </div>
  )
}
