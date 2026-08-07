import React, { useState } from 'react'
import { elencoReclute, grafica, interfaccia } from '../game/config.js'
import { postazioni } from '../game/percorso.js'

const stile = interfaccia.pulsanti
const stilePostazioni = interfaccia.postazioni

// La postazione dove finiranno le prossime reclute comprate. Si sceglie una
// volta e resta: un tocco per postazione, non uno per uomo. Mostra i posti
// liberi, perche' quando sono finiti l'acquisto non parte e il giocatore deve
// poterlo sapere prima di premere.
function ScegliPostazione({ scelta, liberi, attivi, onMandaA }) {
  return (
    <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
      {postazioni.map((postazione, indice) => {
        const posti = liberi[indice]
        const pieno = posti === 0
        const attiva = indice === scelta

        return (
          <button
            key={postazione.id}
            type="button"
            disabled={!attivi}
            onPointerDown={() => attivi && onMandaA(indice)}
            style={{
              flex: 1,
              minHeight: interfaccia.altezza_minima_tocco_compatta,
              padding: interfaccia.spaziatura / 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: stile.distanza_righe,
              border:
                stile.spessore_bordo_pronto +
                'px solid ' +
                (attiva ? stile.colore_bordo_pronto : 'transparent'),
              borderRadius: interfaccia.raggio_angoli,
              background: attiva ? stilePostazioni.colore_scelta : stilePostazioni.colore,
              color: interfaccia.colore_testo,
              fontFamily: 'inherit',
              touchAction: 'manipulation'
            }}
          >
            <span
              style={{
                fontSize: interfaccia.testo_piccolo,
                fontWeight: attiva ? stile.peso_titolo : 400
              }}
            >
              {postazione.nome}
            </span>
            <span
              style={{
                fontSize: interfaccia.testo_piccolo,
                color: pieno ? interfaccia.colore_allarme : interfaccia.colore_testo_debole
              }}
            >
              {pieno ? 'pieno' : posti + '/' + postazione.posti}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Un pulsante grande, in basso, sotto il pollice. Risponde al tocco che scende
// (non al click che sale): su telefono la differenza fra le due cose si sente.
function Pulsante({ titolo, dettaglio, costo, colore, acceso, compatto, onTocco }) {
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
        minHeight: compatto
          ? interfaccia.altezza_minima_tocco_compatta
          : interfaccia.altezza_minima_tocco,
        padding: interfaccia.spaziatura / 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: stile.distanza_righe,
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
      <span
        style={{
          fontSize: compatto ? interfaccia.testo_piccolo : interfaccia.testo_normale,
          fontWeight: stile.peso_titolo
        }}
      >
        {titolo}
      </span>
      {dettaglio ? (
        <span style={{ fontSize: interfaccia.testo_piccolo, opacity: stile.opacita_dettaglio }}>
          {dettaglio}
        </span>
      ) : null}
      {costo === null ? null : (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            fontWeight: stile.peso_titolo,
            color: acceso ? interfaccia.colore_oro : stile.colore_testo_spento
          }}
        >
          {costo} oro
        </span>
      )}
    </button>
  )
}

// Le decisioni del gioco, tutte sotto il pollice: quale recluta comprare, e se
// invece investire nella rendita. Restano visibili anche quando l'oro non
// basta — sapere quanto manca fa parte della decisione, nasconderle no.
export default function Comandi({
  oro,
  costoPotenziamento,
  livelloRendita,
  oroPerCiclo,
  renditaAlMassimo,
  postazioneScelta,
  postiLiberi,
  attivi,
  onCompra,
  onPotenzia,
  onMandaA
}) {
  // arriva come "3,0,12,12": una stringa sola invece di un elenco, cosi'
  // l'interfaccia capisce con un confronto se e' cambiato qualcosa
  const liberi = postiLiberi.split(',').map(Number)
  const spazioNellaPostazione = liberi[postazioneScelta] || 0

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
        display: 'flex',
        flexDirection: 'column',
        gap: interfaccia.spaziatura
      }}
    >
      <ScegliPostazione
        scelta={postazioneScelta}
        liberi={liberi}
        attivi={attivi}
        onMandaA={onMandaA}
      />

      {/* una riga sola: due righe di reclute piu' la rendita coprirebbero il
          castello sui telefoni piccoli, e il castello e' il punto in cui i
          nemici colpiscono. Niente categoria qui: il colore la dice gia'.
          Il pulsante si spegne anche quando nella postazione scelta non c'e'
          posto per tutta la squadra: premere e non veder partire niente e'
          peggio di un pulsante spento */}
      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        {elencoReclute.map((recluta) => (
          <Pulsante
            key={recluta.id}
            titolo={recluta.nome}
            costo={recluta.costo}
            colore={grafica.reclute[recluta.id].colore}
            acceso={
              attivi && oro >= recluta.costo && spazioNellaPostazione >= recluta.quantita
            }
            compatto
            onTocco={() => onCompra(recluta.id)}
          />
        ))}
      </div>
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
