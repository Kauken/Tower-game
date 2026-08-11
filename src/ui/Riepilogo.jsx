import React from 'react'
import { interfaccia } from '../game/config.js'

// Il riepilogo di fine giornata. Non ferma il gioco: e' un foglio che si puo'
// chiudere e che sparisce da solo. Fermare la fattoria ogni due minuti sarebbe
// una tassa, non un momento.
export default function Riepilogo({ dati, onChiudi }) {
  const [giorno, incassato, speso, raccolti, abbandonate] = dati.split(',').map(Number)
  const saldo = incassato - speso

  return (
    <div
      onPointerDown={onChiudi}
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: '38%',
        padding: interfaccia.spaziatura + 4,
        borderRadius: interfaccia.raggio_angoli + 6,
        background: interfaccia.colore_pannello,
        border: '2px solid ' + interfaccia.colore_scelto,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        style={{
          fontSize: interfaccia.testo_titolo,
          fontWeight: 700,
          color: interfaccia.colore_testo,
          marginBottom: 10
        }}
      >
        Fine del giorno {giorno}
      </div>

      {[
        ['Raccolti', raccolti, interfaccia.colore_testo],
        ['Incassato', '+' + incassato, interfaccia.colore_monete],
        ['Speso', '−' + speso, interfaccia.colore_spesa],
        ['In tasca oggi', (saldo >= 0 ? '+' : '') + saldo, saldo >= 0 ? interfaccia.colore_monete : interfaccia.colore_spesa]
      ].map(([voce, valore, colore]) => (
        <div
          key={voce}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3px 0',
            fontSize: interfaccia.testo_normale,
            color: interfaccia.colore_testo_debole
          }}
        >
          <span>{voce}</span>
          <span style={{ fontWeight: 700, color: colore }}>{valore}</span>
        </div>
      ))}

      {abbandonate > 0 ? (
        <div
          style={{
            marginTop: 8,
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_spesa,
            lineHeight: 1.35
          }}
        >
          Non bastavano i soldi: una casella è tornata incolta. Non hai perso
          niente di piantato — la fattoria si è solo rimpicciolita.
        </div>
      ) : null}

      <div
        style={{
          marginTop: 10,
          fontSize: interfaccia.testo_piccolo,
          color: interfaccia.colore_testo_debole,
          textAlign: 'center'
        }}
      >
        tocca per chiudere
      </div>
    </div>
  )
}
