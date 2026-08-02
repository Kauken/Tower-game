import React, { useState } from 'react'
import { interfaccia } from '../game/config.js'

const stile = interfaccia.pulsanti

// Un pulsante grande, in basso, sotto il pollice. Risponde al tocco che scende
// (non al click che sale): su telefono la differenza fra le due cose si sente.
function Pulsante({ titolo, dettaglio, costo, colore, acceso, onTocco }) {
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
        flex: 1,
        minHeight: interfaccia.altezza_minima_tocco,
        padding: interfaccia.spaziatura / 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        border: acceso
          ? stile.spessore_bordo_pronto + 'px solid ' + stile.colore_bordo_pronto
          : stile.spessore_bordo_pronto + 'px solid transparent',
        borderRadius: interfaccia.raggio_angoli,
        background: acceso ? colore : stile.colore_spento,
        color: acceso ? interfaccia.colore_pulsante_testo : stile.colore_testo_spento,
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        opacity: premuto && acceso ? stile.opacita_premuto : 1
      }}
    >
      <span style={{ fontSize: interfaccia.testo_normale, fontWeight: 700 }}>{titolo}</span>
      <span style={{ fontSize: interfaccia.testo_piccolo }}>{dettaglio}</span>
      {costo === null ? null : (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            fontWeight: 700,
            color: acceso ? interfaccia.colore_oro : stile.colore_testo_spento
          }}
        >
          {costo} oro
        </span>
      )}
    </button>
  )
}

// Le due sole decisioni del gioco, una accanto all'altra: comprare adesso o
// investire nella rendita. Restano visibili anche quando l'oro non basta —
// sapere quanto manca fa parte della decisione, nasconderle no.
export default function Comandi({
  oro,
  nomeRecluta,
  costoRecluta,
  costoPotenziamento,
  livelloRendita,
  oroPerCiclo,
  renditaAlMassimo,
  attivi,
  onCompra,
  onPotenzia
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
        display: 'flex',
        gap: interfaccia.spaziatura
      }}
    >
      <Pulsante
        titolo={nomeRecluta}
        dettaglio="parte subito"
        costo={costoRecluta}
        colore={stile.colore_recluta}
        acceso={attivi && oro >= costoRecluta}
        onTocco={onCompra}
      />
      <Pulsante
        titolo="Rendita"
        dettaglio={
          renditaAlMassimo
            ? 'al massimo (+' + oroPerCiclo + ')'
            : 'livello ' + livelloRendita + ' → +' + oroPerCiclo
        }
        costo={renditaAlMassimo ? null : costoPotenziamento}
        colore={stile.colore_rendita}
        acceso={attivi && !renditaAlMassimo && oro >= costoPotenziamento}
        onTocco={onPotenzia}
      />
    </div>
  )
}
