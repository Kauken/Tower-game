import React from 'react'
import { interfaccia } from '../game/config.js'

function Voce({ etichetta, valore, colore }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span
        style={{
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo_debole
        }}
      >
        {etichetta}
      </span>
      <span style={{ fontSize: interfaccia.testo_titolo, fontWeight: 700, color: colore }}>
        {valore}
      </span>
    </div>
  )
}

// Oro, vite e ondata: sempre a schermo, in alto, in posizione fissa.
export default function Cruscotto({ oro, vite, ondata }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        padding: interfaccia.spaziatura,
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo,
        pointerEvents: 'none'
      }}
    >
      <Voce etichetta="Oro" valore={oro} colore={interfaccia.colore_testo} />
      <Voce
        etichetta="Vite"
        valore={vite}
        colore={vite > 0 ? interfaccia.colore_testo : interfaccia.colore_allarme}
      />
      <Voce etichetta="Ondata" valore={ondata} colore={interfaccia.colore_testo} />
    </div>
  )
}
