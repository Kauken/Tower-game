import React from 'react'
import { elencoCostruzioni, elencoMateriali, interfaccia } from '../game/config.js'
import Bottone from './Bottone.jsx'

const stile = interfaccia.pannello

// "legno:12,pietra:0" -> {legno: 12, pietra: 0}. Il motore manda una stringa
// sola invece di un oggetto, cosi' l'interfaccia capisce con un confronto se
// e' cambiata qualcosa e non ridisegna per niente.
export function leggiConti(riga) {
  const conti = {}
  if (!riga) {
    return conti
  }
  const pezzi = riga.split(',')
  for (let i = 0; i < pezzi.length; i++) {
    const punto = pezzi[i].indexOf(':')
    conti[pezzi[i].slice(0, punto)] = Number(pezzi[i].slice(punto + 1))
  }
  return conti
}

function Foglio({ titolo, sottotitolo, children }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.altezza_minima_tocco + interfaccia.spaziatura * 2}px + env(safe-area-inset-bottom))`,
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

// Cosa c'e' dentro qualcosa, materiale per materiale. Se e' vuoto lo dice,
// invece di mostrare una fila di zeri.
function Contenuto({ conti, vuotoDice }) {
  const pieni = elencoMateriali.filter((m) => (conti[m.id] || 0) > 0)
  if (pieni.length === 0) {
    return (
      <span
        style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
      >
        {vuotoDice}
      </span>
    )
  }
  return (
    <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta, flexWrap: 'wrap' }}>
      {pieni.map((materiale) => (
        <span
          key={materiale.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 12,
            background: '#00000044',
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 5,
              background: materiale.colore,
              flexShrink: 0
            }}
          />
          {materiale.nome} {conti[materiale.id]}
        </span>
      ))}
    </div>
  )
}

const DICE = {
  fermo: 'in attesa di ordini',
  va: 'sta andando a lavorare',
  lavora: 'sta lavorando',
  porta: 'sta portando la roba alla cassa',
  bloccato: 'non ha dove scaricare: tutte le casse sono piene'
}

export function PannelloBracciante({ nome, stato, carico, scaricaA, onAssegna, onChiudi }) {
  return (
    <Foglio titolo={nome} sottotitolo={DICE[stato] || ''}>
      <Contenuto conti={leggiConti(carico)} vuotoDice="Non ha niente addosso." />
      <span
        style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
      >
        Scarica a: <b style={{ color: interfaccia.colore_accento }}>{scaricaA}</b>
      </span>
      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        <Bottone
          titolo="Dove scarica"
          dettaglio="poi tocca una cassa"
          colore={stile.colore_azione}
          onTocco={onAssegna}
        />
        <Bottone titolo="Chiudi" colore={stile.colore_chiudi} onTocco={onChiudi} />
      </div>
    </Foglio>
  )
}

// Si vende dalla cassa, non da un magazzino: anche vendere e' una cosa che
// succede in un posto. Al casotto si assume anche.
export function PannelloCassa({
  contenuto,
  pieno,
  valore,
  eIlCasotto,
  monete,
  assunzioni,
  onVendi,
  onAssumi,
  onChiudi
}) {
  const conti = leggiConti(contenuto)
  const qualcosaDentro = elencoMateriali.some((m) => (conti[m.id] || 0) > 0)

  return (
    <Foglio
      titolo={eIlCasotto ? 'Casotto' : 'Cassa'}
      sottotitolo={
        eIlCasotto
          ? 'Dentro ci sta ' + pieno + '. Qui si vende e si assume.'
          : 'Dentro ci sta ' + pieno
      }
    >
      <Contenuto conti={conti} vuotoDice="È vuota." />

      <Bottone
        titolo="Vendi tutto"
        dettaglio={qualcosaDentro ? 'svuota questa cassa' : 'non c’è niente da vendere'}
        costo={qualcosaDentro ? valore : null}
        colore={stile.colore_azione}
        acceso={qualcosaDentro}
        largo
        onTocco={onVendi}
      />

      {eIlCasotto ? (
        <>
          <span
            style={{
              marginTop: 4,
              fontSize: interfaccia.testo_piccolo,
              color: interfaccia.colore_testo_debole
            }}
          >
            Assumi — poi lo paghi <b>ogni sera</b>, che stia lavorando o no.
          </span>
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}
          >
            {assunzioni.map((voce) => (
              <Bottone
                key={voce.id}
                titolo={voce.nome}
                dettaglio={'poi −' + voce.salario + ' ogni sera'}
                costo={voce.costo}
                colore={voce.colore + '44'}
                coloreBordo={voce.colore}
                acceso={monete >= voce.costo}
                onTocco={() => onAssumi(voce.id)}
              />
            ))}
          </div>
        </>
      ) : null}

      <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
    </Foglio>
  )
}

// Il riepilogo della sera. Non ferma l'isola: e' un foglio che si chiude da
// solo. Fermare tutto ogni due minuti sarebbe una tassa, non un momento.
export function Riepilogo({ dati, onChiudi }) {
  const pezzi = dati.split(',')
  const giorno = Number(pezzi[0])
  const incassato = Number(pezzi[1])
  const salari = Number(pezzi[2])
  const raccolto = Number(pezzi[3])
  const andatoVia = pezzi[4] || ''
  const saldo = incassato - salari

  return (
    <div
      onPointerDown={onChiudi}
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: '32%',
        padding: interfaccia.spaziatura + 4,
        borderRadius: interfaccia.raggio_angoli + 6,
        background: interfaccia.colore_pannello,
        border: '2px solid ' + interfaccia.colore_accento,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div
        style={{
          fontSize: interfaccia.testo_titolo,
          fontWeight: stile.peso_titolo,
          color: interfaccia.colore_testo,
          marginBottom: 10
        }}
      >
        Fine del giorno {giorno}
      </div>

      {[
        ['Raccolto', raccolto, interfaccia.colore_testo],
        ['Incassato', '+' + incassato, interfaccia.colore_accento],
        ['Salari', '−' + salari, '#d9805f'],
        [
          'In tasca oggi',
          (saldo >= 0 ? '+' : '') + saldo,
          saldo >= 0 ? interfaccia.colore_accento : '#d9805f'
        ]
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
          <span style={{ fontWeight: stile.peso_titolo, color: colore }}>{valore}</span>
        </div>
      ))}

      {andatoVia ? (
        <div
          style={{
            marginTop: 8,
            fontSize: interfaccia.testo_piccolo,
            color: '#d9805f',
            lineHeight: 1.35
          }}
        >
          Non bastavano le monete: <b>{andatoVia}</b> se n’è andato. Non hai perso
          niente di quello che avevi raccolto — l’isola si è solo rimpicciolita.
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

export function PannelloCostruisci({ magazzino, onCostruisci, onChiudi }) {
  const conti = leggiConti(magazzino)

  return (
    <Foglio
      titolo="Cosa costruisci?"
      sottotitolo="I materiali si prendono dalle casse, non da un magazzino: quello che c'è dentro sparisce davvero."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}>
        {elencoCostruzioni.map((voce) => {
          const puoi = voce.costo.every((c) => (conti[c.materiale] || 0) >= c.quantita)
          const costo = voce.costo
            .map((c) => c.quantita + ' ' + c.materiale)
            .join(', ')
          return (
            <Bottone
              key={voce.id}
              titolo={voce.nome}
              dettaglio={costo}
              colore={voce.colore + '55'}
              coloreBordo={voce.colore_bordo}
              acceso={puoi}
              onTocco={() => onCostruisci(voce.id)}
            />
          )
        })}
        <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
      </div>
    </Foglio>
  )
}

// La striscia che dice cosa sta aspettando il prossimo tocco. Senza, entrare
// in una modalita' e non ricordarsene e' il modo piu' facile per sentirsi
// traditi da un gioco.
export function Avviso({ testo, onAnnulla }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.altezza_minima_tocco + interfaccia.spaziatura * 2}px + env(safe-area-inset-bottom))`,
        padding: '10px 14px',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '2px solid ' + interfaccia.colore_accento,
        display: 'flex',
        alignItems: 'center',
        gap: interfaccia.spaziatura,
        backdropFilter: 'blur(8px)'
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo
        }}
      >
        {testo}
      </span>
      <button
        type="button"
        onPointerDown={onAnnulla}
        style={{
          minHeight: 40,
          padding: '0 16px',
          borderRadius: interfaccia.raggio_angoli,
          border: 'none',
          background: stile.colore_annulla,
          color: interfaccia.colore_testo,
          fontFamily: 'inherit',
          fontSize: interfaccia.testo_piccolo,
          touchAction: 'manipulation'
        }}
      >
        Annulla
      </button>
    </div>
  )
}
