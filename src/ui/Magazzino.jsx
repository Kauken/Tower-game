import React from 'react'
import { elencoMateriali, griglia, interfaccia } from '../game/config.js'

const stile = interfaccia.magazzino

// Quello che hai raccolto. E' l'unico punteggio del gioco: serve a confrontare
// due disposizioni della griglia, non a vincere qualcosa.
export default function Magazzino({ magazzino, caselleUsate }) {
  // arriva come "grano:12,rapa:0,lino:4": una stringa sola invece di un
  // oggetto, cosi' l'interfaccia capisce con un confronto se e' cambiata
  const quantita = {}
  const pezzi = magazzino ? magazzino.split(',') : []
  for (let i = 0; i < pezzi.length; i++) {
    const punto = pezzi[i].indexOf(':')
    quantita[pezzi[i].slice(0, punto)] = pezzi[i].slice(punto + 1)
  }

  const totaleCaselle = griglia.colonne * griglia.righe

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        display: 'flex',
        alignItems: 'center',
        gap: interfaccia.spaziatura_stretta,
        pointerEvents: 'none'
      }}
    >
      {elencoMateriali.map((materiale) => (
        <div
          key={materiale.id}
          style={{
            flex: 1,
            height: stile.altezza_pastiglia,
            borderRadius: stile.raggio_pastiglia,
            background: interfaccia.colore_pannello,
            border: '1px solid ' + interfaccia.colore_bordo_pannello,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: materiale.colore,
              flexShrink: 0
            }}
          />
          <span
            style={{
              fontSize: interfaccia.testo_normale,
              fontWeight: stile.peso_numero,
              color: interfaccia.colore_testo
            }}
          >
            {quantita[materiale.id] || 0}
          </span>
        </div>
      ))}

      {/* quante caselle hai usato: lo spazio e' la cosa che scarseggia, deve
          stare sempre sotto gli occhi */}
      <div
        style={{
          height: stile.altezza_pastiglia,
          padding: '0 12px',
          borderRadius: stile.raggio_pastiglia,
          background: interfaccia.colore_pannello,
          border: '1px solid ' + interfaccia.colore_bordo_pannello,
          display: 'flex',
          alignItems: 'center',
          fontSize: interfaccia.testo_piccolo,
          color: interfaccia.colore_testo_debole,
          whiteSpace: 'nowrap'
        }}
      >
        {caselleUsate}/{totaleCaselle}
      </div>
    </div>
  )
}
