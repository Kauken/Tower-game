import React from 'react'
import { elencoMateriali, elencoPiantabili, interfaccia } from '../game/config.js'
import Bottone from './Bottone.jsx'

const stile = interfaccia.pannello

// Il mercato: si vende il raccolto e si comprano i semi, nello stesso posto.
// Sono due facce della stessa decisione — quanto trasformo in semi adesso e
// quanto tengo per stasera — e separarle in due schermate la nasconderebbe.
export default function Mercato({
  monete,
  magazzino,
  prezzi,
  valoreMagazzino,
  onCompra,
  onVendi,
  onVendiTutto,
  onChiudi
}) {
  const daVendere = elencoMateriali.filter((m) => (magazzino[m.id] || 0) > 0)

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spazio_sotto + interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
        maxHeight: '68%',
        overflowY: 'auto',
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
        Vendi il raccolto
      </span>

      {daVendere.length === 0 ? (
        <span
          style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
        >
          Il magazzino è vuoto.
        </span>
      ) : (
        <>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}
          >
            {daVendere.map((materiale) => (
              <Bottone
                key={materiale.id}
                titolo={materiale.nome}
                dettaglio={
                  (magazzino[materiale.id] || 0) + ' × ' + (prezzi[materiale.id] || 0)
                }
                costo={(magazzino[materiale.id] || 0) * (prezzi[materiale.id] || 0)}
                colore={materiale.colore + '33'}
                coloreBordo={materiale.colore}
                onTocco={() => onVendi(materiale.id)}
              />
            ))}
          </div>
          <Bottone
            titolo="Vendi tutto"
            costo={valoreMagazzino}
            colore={stile.colore_mercato}
            largo
            onTocco={onVendiTutto}
          />
        </>
      )}

      <span
        style={{
          marginTop: 4,
          fontSize: interfaccia.testo_normale,
          fontWeight: stile.peso_titolo,
          color: interfaccia.colore_testo
        }}
      >
        Compra semi
      </span>
      {/* i semi che non ti puoi permettere restano visibili ma spenti: vedere
          quanto manca al Lino e' meta' del motivo per tornare domani */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}>
        {elencoPiantabili.map((voce) => (
          <Bottone
            key={voce.id}
            titolo={voce.nome}
            dettaglio={
              voce.famiglia === 'coltura'
                ? Math.round(voce.tempo_crescita_ms / 1000) + 's · rende ' + voce.resa.quantita
                : 'non produce'
            }
            costo={voce.costo_seme}
            colore={voce.colore + '33'}
            coloreBordo={voce.colore}
            acceso={monete >= voce.costo_seme}
            onTocco={() => onCompra(voce.id)}
          />
        ))}
      </div>

      <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
    </div>
  )
}
