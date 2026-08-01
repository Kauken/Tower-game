import React from 'react'
import { interfaccia } from '../game/config.js'

function secondi(millisecondi) {
  return (millisecondi / 1000).toFixed(1).replace('.', ',')
}

function Riga({ etichetta, valore }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: interfaccia.testo_normale,
        color: interfaccia.colore_testo
      }}
    >
      <span style={{ color: interfaccia.colore_testo_debole }}>{etichetta}</span>
      <span>{valore}</span>
    </div>
  )
}

function Pulsante({ testo, colore, onClick, spento }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={spento}
      style={{
        flex: 1,
        minHeight: interfaccia.altezza_minima_tocco,
        border: 'none',
        borderRadius: interfaccia.raggio_angoli,
        background: spento ? interfaccia.colore_pulsante_spento : colore,
        color: spento
          ? interfaccia.colore_pulsante_testo_spento
          : interfaccia.colore_pulsante_testo,
        fontSize: interfaccia.testo_normale,
        fontWeight: 600,
        fontFamily: 'inherit',
        touchAction: 'manipulation'
      }}
    >
      {testo}
    </button>
  )
}

// Pannello di conferma: primo tocco sulla casella lo apre, il pulsante
// costruisce. Mai costruire al primo tocco.
export default function PannelloConferma({ selezione, oro, onCostruisci, onAnnulla }) {
  if (!selezione) {
    return null
  }

  const costruita = selezione.costruita
  const oroInsufficiente = oro < selezione.costo

  return (
    <div
      style={{
        padding: interfaccia.spaziatura,
        display: 'flex',
        flexDirection: 'column',
        gap: interfaccia.spaziatura,
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo
      }}
    >
      <div style={{ fontSize: interfaccia.testo_titolo, fontWeight: 700 }}>
        {selezione.nome}
      </div>

      {selezione.descrizioneBonus && selezione.tipoCasella !== 'normale' ? (
        <div
          style={{
            fontSize: interfaccia.testo_normale,
            color: interfaccia.colore_testo_debole
          }}
        >
          {selezione.descrizioneBonus}
        </div>
      ) : null}

      <Riga etichetta="Costo" valore={selezione.costo + ' oro'} />
      <Riga etichetta="Danno" valore={Math.round(selezione.danno)} />
      <Riga etichetta="Un colpo ogni" valore={secondi(selezione.cadenzaMs) + ' s'} />
      <Riga etichetta="Raggio" valore={Math.round(selezione.raggio)} />

      <div style={{ display: 'flex', gap: interfaccia.spaziatura }}>
        {costruita ? (
          <Pulsante
            testo="Chiudi"
            colore={interfaccia.colore_pulsante_secondario}
            onClick={onAnnulla}
          />
        ) : (
          <>
            <Pulsante
              testo="Annulla"
              colore={interfaccia.colore_pulsante_secondario}
              onClick={onAnnulla}
            />
            <Pulsante
              testo={oroInsufficiente ? 'Oro insufficiente' : 'Costruisci'}
              colore={interfaccia.colore_pulsante}
              onClick={onCostruisci}
              spento={oroInsufficiente}
            />
          </>
        )}
      </div>
    </div>
  )
}
