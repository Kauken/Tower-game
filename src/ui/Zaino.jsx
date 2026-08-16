import React from 'react'
import { elencoMateriali, interfaccia } from '../game/config.js'
import Icona from './Icona.jsx'

// Lo zaino dell'operaio, sempre sotto gli occhi. **Ed e' anche la mano:**
// toccare una casella che contiene qualcosa di piazzabile te lo mette in mano,
// e il tocco dopo sulla mappa lo piazza. Toccarla di nuovo lo ripone.
//
// E' una fila di caselle come in Minecraft, non un contatore: si deve vedere
// **quante ne restano libere** senza aprire niente, perche' quando finiscono
// l'operaio si ferma e bisogna decidere dove posare la roba.
//
// Sta in alto e non in basso: sotto ci arriva il pollice, e una fila di
// caselle che si preme per sbaglio sarebbe peggio di non averla.

const colori = {}
const nomi = {}
// quali materiali si possono piazzare sull'isola: solo quelli si prendono in
// mano toccando la casella
const piazzabili = {}
for (let i = 0; i < elencoMateriali.length; i++) {
  colori[elencoMateriali[i].id] = elencoMateriali[i].colore
  nomi[elencoMateriali[i].id] = elencoMateriali[i].nome
  piazzabili[elencoMateriali[i].id] = !!elencoMateriali[i].pianta
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
export function Casella({ casella, inMano, onTocco }) {
  const Elemento = onTocco ? 'button' : 'div'
  return (
    <Elemento
      type={onTocco ? 'button' : undefined}
      onPointerDown={onTocco}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        fontFamily: 'inherit',
        touchAction: 'manipulation',
        pointerEvents: onTocco ? 'auto' : 'none',
        borderRadius: 9,
        background: casella
          ? colori[casella.materiale] + (inMano ? '7a' : '3a')
          : '#ffffff0d',
        border:
          (inMano ? 2 : 1) +
          'px solid ' +
          (inMano
            ? interfaccia.colore_accento
            : casella
              ? colori[casella.materiale]
              : '#ffffff1c'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      {casella ? (
        <>
          {/* **Un'icona, non un pallino colorato.** Il pallino da 11 px era
              l'unico punto in cui il colore portava l'informazione da solo, e
              un uomo su otto non distingue il rosso dal verde — mentre tre
              nostri materiali stanno tutti sul marrone-arancio. */}
          <Icona materiale={casella.materiale} lato={interfaccia.icona_materiale} />
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
    </Elemento>
  )
}

export default function Zaino({ inventario, pieno, inManoTipo, inManoId, onPrendi }) {
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
        border: '1px solid ' + (pieno ? interfaccia.colore_accento : interfaccia.colore_bordo_pannello),
        pointerEvents: 'auto'
      }}
    >
      {/* le caselle si allargano fino a un massimo e poi restano ferme: con
          quattro non devono diventare quattro finestroni, con undici devono
          starci lo stesso senza scendere sotto il leggibile */}
      <div style={{ display: 'flex', gap: 5, flex: 1, minWidth: 0, justifyContent: 'center' }}>
        {caselle.map((casella, indice) => {
          const prendibile = !!(casella && piazzabili[casella.materiale] && onPrendi)
          const questaInMano =
            !!casella && inManoTipo === 'materiale' && inManoId === casella.materiale
          return (
            <div key={indice} style={{ flex: 1, minWidth: 0, aspectRatio: '1 / 1', maxWidth: interfaccia.lato_casella }}>
              <Casella
                casella={casella}
                inMano={questaInMano}
                onTocco={prendibile ? () => onPrendi(casella.materiale) : null}
              />
            </div>
          )
        })}
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
