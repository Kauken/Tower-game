import React, { useState } from 'react'
import { interfaccia } from '../game/config.js'

const stile = interfaccia.pannello

// Risponde al tocco che scende (non al click che sale): su telefono la
// differenza fra le due cose si sente. Quando non si puo' premere resta
// visibile ma spento: sapere quanto manca fa parte della decisione.
export default function Bottone({
  titolo,
  dettaglio,
  costo,
  colore,
  coloreBordo,
  acceso = true,
  largo,
  onTocco
}) {
  const [premuto, impostaPremuto] = useState(false)

  return (
    <button
      type="button"
      disabled={!acceso}
      onPointerDown={() => {
        impostaPremuto(true)
        if (acceso) {
          onTocco()
        }
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
        gap: 2,
        border:
          stile.spessore_bordo +
          'px solid ' +
          (acceso && coloreBordo ? coloreBordo : 'transparent'),
        borderRadius: interfaccia.raggio_angoli,
        background: acceso ? colore : stile.colore_spento,
        color: acceso ? interfaccia.colore_testo : stile.colore_testo_spento,
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        opacity: premuto && acceso ? 0.75 : 1
      }}
    >
      <span style={{ fontSize: interfaccia.testo_normale, fontWeight: stile.peso_titolo }}>
        {titolo}
      </span>
      {dettaglio ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            color: acceso ? interfaccia.colore_testo_debole : stile.colore_testo_spento,
            textAlign: 'center',
            lineHeight: 1.2
          }}
        >
          {dettaglio}
        </span>
      ) : null}
      {costo === null || costo === undefined ? null : (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            fontWeight: stile.peso_titolo,
            color: acceso ? interfaccia.colore_monete : stile.colore_testo_spento
          }}
        >
          {costo} monete
        </span>
      )}
    </button>
  )
}
