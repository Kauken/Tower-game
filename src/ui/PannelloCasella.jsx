import React from 'react'
import { elencoPiantabili, interfaccia, trovaContenuto } from '../game/config.js'
import Bottone from './Bottone.jsx'

const stile = interfaccia.pannello

function Foglio({ titolo, sottotitolo, children }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spazio_sotto + interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
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
      <span
        style={{
          fontSize: interfaccia.testo_normale,
          fontWeight: stile.peso_titolo,
          color: interfaccia.colore_testo
        }}
      >
        {titolo}
      </span>
      {sottotitolo ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo_debole,
            lineHeight: 1.35
          }}
        >
          {sottotitolo}
        </span>
      ) : null}
      {children}
    </div>
  )
}

// Il foglio che sale dal basso quando tocchi una casella. Cambia a seconda di
// com'e' la casella: terra selvatica da aprire, terra pronta da seminare, o
// qualcosa che ci sta gia' crescendo.
export default function PannelloCasella({
  stato,
  contenuto,
  irrigata,
  monete,
  costoDissodare,
  semi,
  onPianta,
  onDissoda,
  onEstirpa,
  onChiudi
}) {
  if (stato === 'incolto') {
    return (
      <Foglio
        titolo="Terra incolta"
        sottotitolo="Dissodarla la rende coltivabile — ma alza anche la manutenzione che paghi ogni sera."
      >
        <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
          <Bottone
            titolo="Dissoda"
            costo={costoDissodare}
            colore={stile.colore_dissoda}
            acceso={monete >= costoDissodare}
            onTocco={onDissoda}
          />
          <Bottone titolo="Lascia stare" colore={stile.colore_chiudi} onTocco={onChiudi} />
        </div>
      </Foglio>
    )
  }

  if (stato === 'vuota') {
    const senzaSemi = elencoPiantabili.every((voce) => (semi[voce.id] || 0) <= 0)
    return (
      <Foglio
        titolo="Cosa semini?"
        sottotitolo={
          senzaSemi
            ? 'Non hai piu’ semi. Vendi il raccolto al mercato e comprane altri.'
            : undefined
        }
      >
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}
        >
          {elencoPiantabili.map((voce) => {
            const quanti = semi[voce.id] || 0
            return (
              <Bottone
                key={voce.id}
                titolo={voce.nome}
                dettaglio={
                  quanti > 0
                    ? 'ne hai ' + quanti
                    : voce.famiglia === 'coltura'
                      ? 'nessun seme'
                      : 'non ne hai'
                }
                colore={voce.colore + '33'}
                coloreBordo={voce.colore}
                acceso={quanti > 0}
                onTocco={() => onPianta(voce.id)}
              />
            )
          })}
          <Bottone
            titolo="Chiudi"
            colore={stile.colore_chiudi}
            largo
            onTocco={onChiudi}
          />
        </div>
      </Foglio>
    )
  }

  const dati = contenuto ? trovaContenuto(contenuto) : null
  if (!dati) {
    return null
  }

  return (
    <Foglio
      titolo={dati.nome + (irrigata ? '  ·  irrigata' : '')}
      sottotitolo={dati.descrizione}
    >
      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        <Bottone
          titolo="Estirpa"
          dettaglio="ti torna il seme"
          colore={stile.colore_rimuovi}
          onTocco={onEstirpa}
        />
        <Bottone titolo="Chiudi" colore={stile.colore_chiudi} onTocco={onChiudi} />
      </div>
    </Foglio>
  )
}
