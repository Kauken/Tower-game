import React, { useEffect, useState } from 'react'
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
              textAlign: 'left',
              paddingLeft: interfaccia.spaziatura,
              paddingRight: interfaccia.spaziatura
            }}
          >
            <div style={{ fontWeight: 600 }}>{torre.nome}</div>
            <div style={{ color: interfaccia.colore_testo_debole }}>
              {torre.costo} oro
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Pannello di conferma: primo tocco sulla casella lo apre, il pulsante
// costruisce. Mai costruire al primo tocco.
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

  const bonus =
    selezione.descrizioneBonus && selezione.tipoCasella !== 'normale' ? (
      <div
        style={{
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo_debole
        }}
      >
        {selezione.descrizioneBonus}
      </div>
    ) : null

  // casella con una torre gia' costruita: solo le sue statistiche
  if (selezione.costruita) {
    return (
      <div style={stilePannello}>
        <div style={{ fontSize: interfaccia.testo_titolo, fontWeight: 700 }}>
          {selezione.nome}
        </div>
        {bonus}
        {selezione.attacco === 'potenziamento' ? (
          <Riga etichetta="Effetto" valore={selezione.descrizione} />
        ) : (
          <>
            <Riga etichetta="Danno" valore={Math.round(selezione.dannoEffettivo)} />
            <Riga etichetta="Un colpo ogni" valore={secondi(selezione.cadenzaMs) + ' s'} />
          </>
        )}
        <Riga etichetta="Raggio" valore={Math.round(selezione.raggio)} />
        <div style={{ display: 'flex', gap: interfaccia.spaziatura }}>
          <Pulsante
            testo="Chiudi"
            colore={interfaccia.colore_pulsante_secondario}
            onClick={onAnnulla}
          />
        </div>
      </div>
    )
  }

  // casella libera: griglia di scelta + statistiche della torre scelta
  const torre = selezione.torri.find((voce) => voce.id === sceltaId) || selezione.torri[0]
  const oroInsufficiente = oro < torre.costo

  return (
    <div style={stilePannello}>
      {bonus}
      <ScelteTorre
        torri={selezione.torri}
        sceltaId={torre.id}
        oro={oro}
        onScegli={impostaSceltaId}
      />
      <div
        style={{
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo_debole
        }}
      >
        {torre.descrizione}
      </div>
      {torre.attacco !== 'potenziamento' ? (
        <>
          <Riga etichetta="Danno" valore={Math.round(torre.danno)} />
          <Riga etichetta="Un colpo ogni" valore={secondi(torre.cadenzaMs) + ' s'} />
        </>
      ) : null}
      <Riga etichetta="Raggio" valore={Math.round(torre.raggio)} />
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
