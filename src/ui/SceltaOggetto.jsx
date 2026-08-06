import React from 'react'
import { interfaccia } from '../game/config.js'

const stile = interfaccia.scelta_oggetto

// Tre oggetti, ne scegli uno. E' il momento in cui si decide che partita sara':
// occupa tutto lo schermo perche' non e' una cosa da fare di sfuggita mentre
// succede altro. Il campo resta fermo finche' non si e' scelto.
export default function SceltaOggetto({ offerta, onScegli }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: interfaccia.spaziatura,
        padding: interfaccia.spaziatura,
        background: interfaccia.colore_sconfitta,
        color: interfaccia.colore_testo
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: interfaccia.spaziatura }}>
        <div
          style={{
            fontSize: interfaccia.testo_titolo,
            fontWeight: stile.peso_titolo,
            color: interfaccia.colore_scelto
          }}
        >
          Scegli come combatterai
        </div>
        <div
          style={{
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo_debole
          }}
        >
          Vale per tutta la partita
        </div>
      </div>

      {offerta.map((oggetto) => (
        <button
          key={oggetto.id}
          type="button"
          onPointerDown={() => onScegli(oggetto.id)}
          style={{
            minHeight: interfaccia.altezza_minima_tocco,
            padding: interfaccia.spaziatura,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: stile.distanza_righe,
            textAlign: 'left',
            border: stile.spessore_bordo + 'px solid ' + interfaccia.colore_bordo_pannello,
            borderRadius: interfaccia.raggio_angoli,
            background: interfaccia.colore_pannello,
            color: interfaccia.colore_testo,
            fontFamily: 'inherit',
            touchAction: 'manipulation'
          }}
        >
          <span
            style={{
              fontSize: interfaccia.testo_normale,
              fontWeight: stile.peso_titolo,
              color: interfaccia.colore_scelto
            }}
          >
            {oggetto.nome}
          </span>
          <span style={{ fontSize: interfaccia.testo_piccolo }}>{oggetto.descrizione}</span>
        </button>
      ))}
    </div>
  )
}
