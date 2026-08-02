import React from 'react'
import { interfaccia } from '../game/config.js'

// Quando vieni abbattuto sparisci dal campo e ti riformi al castello: senza
// una scritta il giocatore non capisce perche' non risponde piu' niente.
// Non intercetta i tocchi: la levetta continua a funzionare sotto.
export default function AvvisoAbbattuto() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '38%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: interfaccia.spaziatura,
        color: interfaccia.colore_testo,
        textAlign: 'center',
        pointerEvents: 'none'
      }}
    >
      <span
        style={{
          fontSize: interfaccia.testo_titolo,
          fontWeight: 700,
          color: interfaccia.colore_allarme
        }}
      >
        Abbattuto
      </span>
      <span style={{ fontSize: interfaccia.testo_normale }}>
        Ti riformi al castello. L'esercito continua senza di te.
      </span>
    </div>
  )
}
