import React from 'react'
import { interfaccia } from '../game/config.js'

// Stanza ripulita. Per ora un pulsante porta alla stanza successiva: le porte
// vere, con la scelta della direzione, arrivano al punto 4.
export default function PannelloStanzaPulita({ onProsegui }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
        padding: interfaccia.spaziatura,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: interfaccia.spaziatura,
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo
      }}
    >
      <span
        style={{
          fontSize: interfaccia.testo_titolo,
          fontWeight: 700,
          color: interfaccia.colore_scelto
        }}
      >
        Stanza pulita
      </span>
      <button
        type="button"
        onClick={onProsegui}
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
        Stanza successiva
      </button>
    </div>
  )
}
