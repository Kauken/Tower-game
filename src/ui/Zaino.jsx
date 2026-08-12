import React from 'react'
import { elencoMateriali, interfaccia } from '../game/config.js'

// Lo zaino dell'operaio, sempre sotto gli occhi.
//
// E' una fila di caselle come in Minecraft, non un contatore: si deve vedere
// **quante ne restano libere** senza aprire niente, perche' quando finiscono
// l'operaio si ferma e bisogna decidere dove posare la roba.
//
// Sta in alto e non in basso: sotto ci arriva il pollice, e una fila di
// caselle che si preme per sbaglio sarebbe peggio di non averla.

const colori = {}
const nomi = {}
for (let i = 0; i < elencoMateriali.length; i++) {
  colori[elencoMateriali[i].id] = elencoMateriali[i].colore
  nomi[elencoMateriali[i].id] = elencoMateriali[i].nome
}

// "legno:40,legno:12,,," -> [{materiale:'legno',quantita:40}, ..., null, null]
export function leggiCaselle(riga) {
  if (!riga) {
    return []
  }
  return riga.split(',').map((pezzo) => {
    if (!pezzo) {
      return null
    }
    const punto = pezzo.indexOf(':')
    return { materiale: pezzo.slice(0, punto), quantita: Number(pezzo.slice(punto + 1)) }
  })
}

// Quanto c'e' in tutto, materiale per materiale: serve ai pulsanti che
// spostano roba, che ragionano per materiale e non per casella.
export function sommaCaselle(riga) {
  const conti = {}
  const caselle = leggiCaselle(riga)
  for (let i = 0; i < caselle.length; i++) {
    if (caselle[i]) {
      conti[caselle[i].materiale] = (conti[caselle[i].materiale] || 0) + caselle[i].quantita
    }
  }
  return conti
}

// Riempie il posto che le da' chi la mette: la misura la decide la fila, cosi'
// la stessa casella sta nello zaino in alto e nel pannello di una cassa.
export function Casella({ casella }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 9,
        background: casella ? colori[casella.materiale] + '3a' : '#ffffff0d',
        border:
          '1px solid ' + (casella ? colori[casella.materiale] : '#ffffff1c'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      {casella ? (
        <>
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: 6,
              background: colori[casella.materiale]
            }}
          />
          <span
            style={{
              fontSize: interfaccia.testo_piccolo,
              fontWeight: 700,
              lineHeight: 1,
              color: interfaccia.colore_testo
            }}
          >
            {casella.quantita}
          </span>
        </>
      ) : null}
    </div>
  )
}

export default function Zaino({ inventario, pieno }) {
  const caselle = leggiCaselle(inventario)
  if (caselle.length === 0) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 8px',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + (pieno ? interfaccia.colore_accento : interfaccia.colore_bordo_pannello)
      }}
    >
      {/* le caselle si allargano fino a un massimo e poi restano ferme: con
          quattro non devono diventare quattro finestroni, con undici devono
          starci lo stesso senza scendere sotto il leggibile */}
      <div style={{ display: 'flex', gap: 5, flex: 1, minWidth: 0, justifyContent: 'center' }}>
        {caselle.map((casella, indice) => (
          <div key={indice} style={{ flex: 1, minWidth: 0, aspectRatio: '1 / 1', maxWidth: 40 }}>
            <Casella casella={casella} />
          </div>
        ))}
      </div>
      {/* quando lo zaino e' pieno l'operaio si ferma: dirlo qui evita che
          sembri un guasto */}
      {pieno ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            fontWeight: 700,
            color: interfaccia.colore_accento,
            whiteSpace: 'nowrap'
          }}
        >
          pieno
        </span>
      ) : null}
    </div>
  )
}
