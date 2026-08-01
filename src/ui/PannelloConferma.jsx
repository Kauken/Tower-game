import React, { useEffect, useState } from 'react'
import { interfaccia } from '../game/config.js'

function secondi(millisecondi) {
  return (millisecondi / 1000).toFixed(1).replace('.', ',')
}

// Una sola riga di numeri: il pannello deve coprire meno campo possibile.
function rigaStatistiche(torre) {
  if (torre.attacco === 'potenziamento') {
    return `${torre.descrizione} Raggio ${Math.round(torre.raggio)}.`
  }
  const danno = Math.round(torre.dannoEffettivo ?? torre.danno)
  return `Danno ${danno} · un colpo ogni ${secondi(torre.cadenzaMs)} s · raggio ${Math.round(torre.raggio)}`
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

// La griglia 2x2 con le quattro torri: nome e costo, quella scelta ha il
// bordo acceso. Un tocco seleziona, si costruisce solo col pulsante sotto.
function ScelteTorre({ torri, sceltaId, oro, onScegli }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: interfaccia.spaziatura
      }}
    >
      {torri.map((torre) => {
        const scelta = torre.id === sceltaId
        const cara = oro < torre.costo
        return (
          <button
            key={torre.id}
            type="button"
            onClick={() => onScegli(torre.id)}
            style={{
              minHeight: interfaccia.altezza_minima_tocco,
              border: '2px solid ' + (scelta ? interfaccia.colore_scelto : 'transparent'),
              borderRadius: interfaccia.raggio_angoli,
              background: interfaccia.colore_pulsante_secondario,
              color: cara
                ? interfaccia.colore_pulsante_testo_spento
                : interfaccia.colore_testo,
              fontSize: interfaccia.testo_normale,
              fontFamily: 'inherit',
              touchAction: 'manipulation',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: interfaccia.spaziatura,
              paddingRight: interfaccia.spaziatura
            }}
          >
            <span style={{ fontWeight: 600 }}>{torre.nome}</span>
            <span style={{ color: interfaccia.colore_testo_debole }}>{torre.costo}</span>
          </button>
        )
      })}
    </div>
  )
}

// Pannello di conferma, compatto: primo tocco sulla casella lo apre, il
// pulsante costruisce. Mai costruire al primo tocco.
export default function PannelloConferma({ selezione, oro, onCostruisci, onAnnulla }) {
  const [sceltaId, impostaSceltaId] = useState(null)

  // a ogni nuova selezione si riparte dalla prima torre dell'elenco
  useEffect(() => {
    if (selezione && !selezione.costruita) {
      impostaSceltaId(selezione.torri[0].id)
    }
  }, [selezione])

  if (!selezione) {
    return null
  }

  const stilePannello = {
    padding: interfaccia.spaziatura,
    display: 'flex',
    flexDirection: 'column',
    gap: interfaccia.spaziatura,
    borderRadius: interfaccia.raggio_angoli,
    background: interfaccia.colore_pannello,
    border: '1px solid ' + interfaccia.colore_bordo_pannello,
    color: interfaccia.colore_testo
  }

  const stileRiga = {
    fontSize: interfaccia.testo_normale,
    color: interfaccia.colore_testo_debole
  }

  // casella con una torre gia' costruita: nome, numeri, chiudi
  if (selezione.costruita) {
    return (
      <div style={stilePannello}>
        <div style={{ fontSize: interfaccia.testo_titolo, fontWeight: 700 }}>
          {selezione.nome}
        </div>
        <div style={stileRiga}>{rigaStatistiche(selezione)}</div>
        <Pulsante
          testo="Chiudi"
          colore={interfaccia.colore_pulsante_secondario}
          onClick={onAnnulla}
        />
      </div>
    )
  }

  // casella libera: griglia di scelta + una riga di numeri
  const torre = selezione.torri.find((voce) => voce.id === sceltaId) || selezione.torri[0]
  const oroInsufficiente = oro < torre.costo

  return (
    <div style={stilePannello}>
      <ScelteTorre
        torri={selezione.torri}
        sceltaId={torre.id}
        oro={oro}
        onScegli={impostaSceltaId}
      />
      <div style={stileRiga}>
        {rigaStatistiche(torre)}
        {selezione.tipoCasella !== 'normale' ? ` — ${selezione.descrizioneBonus}` : ''}
      </div>
      <div style={{ display: 'flex', gap: interfaccia.spaziatura }}>
        <Pulsante
          testo="Annulla"
          colore={interfaccia.colore_pulsante_secondario}
          onClick={onAnnulla}
        />
        <Pulsante
          testo={oroInsufficiente ? 'Oro insufficiente' : 'Costruisci'}
          colore={interfaccia.colore_pulsante}
          onClick={() => onCostruisci(torre.id)}
          spento={oroInsufficiente}
        />
      </div>
    </div>
  )
}
