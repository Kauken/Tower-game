import React from 'react'
import { interfaccia } from '../game/config.js'

// Monete, giorno e spese: le tre cose che devono stare sempre sotto gli occhi.
// La spesa di stasera si vede tutto il giorno, perche' e' quella che rende una
// decisione il momento in cui si reinveste.
export default function Cruscotto({ monete, giorno, oraDelGiorno, spesaGiornaliera }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        padding: '8px 14px',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        pointerEvents: 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          style={{
            fontSize: interfaccia.testo_titolo,
            fontWeight: 700,
            color: interfaccia.colore_monete
          }}
        >
          {monete}
        </span>
        <span style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}>
          monete
        </span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: interfaccia.testo_normale, color: interfaccia.colore_testo }}>
          giorno {giorno}
        </span>
        <span style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_spesa }}>
          −{spesaGiornaliera} stasera
        </span>
      </div>

      {/* quanto manca a sera: senza, la spesa arriverebbe di sorpresa */}
      <div
        style={{
          marginTop: 6,
          height: 4,
          borderRadius: 2,
          background: '#00000055',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: Math.min(100, Math.max(0, oraDelGiorno * 100)) + '%',
            height: '100%',
            background: interfaccia.colore_scelto
          }}
        />
      </div>
    </div>
  )
}
