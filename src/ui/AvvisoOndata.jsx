import React from 'react'
import { interfaccia } from '../game/config.js'

// Cosa sta per arrivare, mostrato durante la pausa. Un'ondata che compare dal
// nulla e travolge le truppe sembra ingiusta anche quando non lo e': sapere
// quanti sono e se c'e' un tipo nuovo e' quello che trasforma la pausa in una
// decisione invece che in un'attesa.
export default function AvvisoOndata({ ondata, quantita, nemiciNuovi, secondi }) {
  const stile = interfaccia.avviso_ondata

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spazio_cruscotto}px + env(safe-area-inset-top))`,
        padding: interfaccia.spaziatura,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: stile.distanza_righe,
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo,
        textAlign: 'center',
        pointerEvents: 'none'
      }}
    >
      <span style={{ fontSize: interfaccia.testo_normale, fontWeight: stile.peso_titolo }}>
        Ondata {ondata} fra {secondi}s
      </span>
      <span
        style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
      >
        {quantita} nemici in arrivo
      </span>
      {nemiciNuovi ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            fontWeight: stile.peso_titolo,
            color: interfaccia.colore_allarme
          }}
        >
          Nuovo: {nemiciNuovi}
        </span>
      ) : null}
    </div>
  )
}
