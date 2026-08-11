import React, { useState } from 'react'
import { elencoContenuti, interfaccia, trovaContenuto } from '../game/config.js'

const stile = interfaccia.pannello

// Risponde al tocco che scende (non al click che sale): su telefono la
// differenza fra le due cose si sente.
function Bottone({ titolo, dettaglio, colore, coloreBordo, onTocco, largo }) {
  const [premuto, impostaPremuto] = useState(false)

  return (
    <button
      type="button"
      onPointerDown={() => {
        impostaPremuto(true)
        onTocco()
      }}
      onPointerUp={() => impostaPremuto(false)}
      onPointerLeave={() => impostaPremuto(false)}
      onPointerCancel={() => impostaPremuto(false)}
      style={{
        flex: largo ? '1 1 100%' : 1,
        minHeight: interfaccia.altezza_minima_tocco,
        padding: interfaccia.spaziatura_stretta,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        border: stile.spessore_bordo + 'px solid ' + (coloreBordo || 'transparent'),
        borderRadius: interfaccia.raggio_angoli,
        background: colore,
        color: interfaccia.colore_testo,
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        opacity: premuto ? 0.75 : 1
      }}
    >
      <span style={{ fontSize: interfaccia.testo_normale, fontWeight: stile.peso_titolo }}>
        {titolo}
      </span>
      {dettaglio ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo_debole,
            textAlign: 'center',
            lineHeight: 1.2
          }}
        >
          {dettaglio}
        </span>
      ) : null}
    </button>
  )
}

// Il foglio che sale dal basso quando tocchi una casella. Sale solo quando
// serve, cosi' la griglia resta la cosa piu' grande sullo schermo.
export default function PannelloCasella({
  contenuto,
  bonus,
  irrigata,
  onPiazza,
  onRimuovi,
  onChiudi
}) {
  const dati = contenuto ? trovaContenuto(contenuto) : null

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
        padding: interfaccia.spaziatura,
        borderRadius: interfaccia.raggio_angoli + 6,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        display: 'flex',
        flexDirection: 'column',
        gap: interfaccia.spaziatura_stretta,
        backdropFilter: 'blur(8px)'
      }}
    >
      {dati ? (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              style={{
                fontSize: interfaccia.testo_titolo,
                fontWeight: stile.peso_titolo,
                color: interfaccia.colore_testo
              }}
            >
              {dati.nome}
            </span>
            {bonus ? (
              <span
                style={{
                  fontSize: interfaccia.testo_normale,
                  fontWeight: stile.peso_titolo,
                  color: interfaccia.colore_scelto
                }}
              >
                {bonus} resa
              </span>
            ) : null}
            {irrigata ? (
              <span
                style={{ fontSize: interfaccia.testo_piccolo, color: '#9fd8e4' }}
              >
                irrigata
              </span>
            ) : null}
          </div>
          <span
            style={{
              fontSize: interfaccia.testo_piccolo,
              color: interfaccia.colore_testo_debole,
              lineHeight: 1.35
            }}
          >
            {dati.descrizione}
            {!bonus && !irrigata && dati.famiglia === 'coltura'
              ? ' — al momento nessuna vicinanza accesa.'
              : ''}
          </span>
          <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
            <Bottone
              titolo="Togli"
              dettaglio="libera la casella"
              colore={stile.colore_rimuovi}
              onTocco={onRimuovi}
            />
            <Bottone titolo="Chiudi" colore={stile.colore_chiudi} onTocco={onChiudi} />
          </div>
        </>
      ) : (
        <>
          <span
            style={{
              fontSize: interfaccia.testo_normale,
              fontWeight: stile.peso_titolo,
              color: interfaccia.colore_testo
            }}
          >
            Cosa ci metti?
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: interfaccia.spaziatura_stretta
            }}
          >
            {elencoContenuti.map((voce) => (
              <Bottone
                key={voce.id}
                titolo={voce.nome}
                dettaglio={
                  voce.famiglia === 'coltura'
                    ? Math.round(voce.tempo_crescita_ms / 1000) + 's · ' + voce.resa.quantita
                    : 'non produce'
                }
                colore={voce.colore + '33'}
                coloreBordo={voce.colore}
                onTocco={() => onPiazza(voce.id)}
              />
            ))}
            <Bottone titolo="Chiudi" colore={stile.colore_chiudi} onTocco={onChiudi} largo />
          </div>
        </>
      )}
    </div>
  )
}
