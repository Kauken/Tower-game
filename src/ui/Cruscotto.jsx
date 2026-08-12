import React from 'react'
import { elencoMateriali, interfaccia } from '../game/config.js'

// Quello che hai, e chi sta lavorando. Le due cose che devono stare sempre
// sotto gli occhi: se il legno non arriva, deve bastare guardare qui per
// capire perche' — non hai abbastanza braccianti, o non hai dato ordini.
export default function Cruscotto({
  magazzino,
  lavoriInAttesa,
  braccantiFermi,
  braccantiTotali,
  monete,
  giorno,
  oraDelGiorno,
  salariStasera,
  esito
}) {
  // arriva come "legno:12,pietra:0": una stringa sola invece di un oggetto,
  // cosi' l'interfaccia capisce con un confronto se e' cambiata
  const quantita = {}
  const pezzi = magazzino ? magazzino.split(',') : []
  for (let i = 0; i < pezzi.length; i++) {
    const punto = pezzi[i].indexOf(':')
    quantita[pezzi[i].slice(0, punto)] = pezzi[i].slice(punto + 1)
  }

  const alLavoro = braccantiTotali - braccantiFermi

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        pointerEvents: 'none'
      }}
    >
      {/* monete, giorno e quanto costa stasera: le tre cose che decidono se
          puoi assumere. La barra dice quanto manca a sera, cosi' la spesa non
          arriva di sorpresa */}
      <div
        style={{
          padding: '7px 12px',
          borderRadius: interfaccia.raggio_angoli,
          background: interfaccia.colore_pannello,
          border: '1px solid ' + interfaccia.colore_bordo_pannello
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span
            style={{
              fontSize: interfaccia.testo_titolo,
              fontWeight: 700,
              color: interfaccia.colore_accento
            }}
          >
            {monete}
          </span>
          <span
            style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
          >
            monete
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: interfaccia.testo_normale, color: interfaccia.colore_testo }}>
            giorno {giorno}
          </span>
          <span style={{ fontSize: interfaccia.testo_piccolo, color: '#d9805f' }}>
            −{salariStasera} stasera
          </span>
        </div>
        <div
          style={{
            marginTop: 6,
            height: 4,
            borderRadius: 2,
            background: '#00000055',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: Math.min(100, Math.max(0, oraDelGiorno * 100)) + '%',
              height: '100%',
              background: interfaccia.colore_accento
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        {elencoMateriali.map((materiale) => (
          <div
            key={materiale.id}
            style={{
              flex: 1,
              padding: '7px 12px',
              borderRadius: 17,
              background: interfaccia.colore_pannello,
              border: '1px solid ' + interfaccia.colore_bordo_pannello,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7
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
                fontWeight: 700,
                color: interfaccia.colore_testo
              }}
            >
              {quantita[materiale.id] || 0}
            </span>
          </div>
        ))}

        <div
          style={{
            padding: '7px 12px',
            borderRadius: 17,
            background: interfaccia.colore_pannello,
            border: '1px solid ' + interfaccia.colore_bordo_pannello,
            display: 'flex',
            alignItems: 'center',
            fontSize: interfaccia.testo_piccolo,
            color:
              lavoriInAttesa > 0 && braccantiFermi === 0
                ? interfaccia.colore_accento
                : interfaccia.colore_testo_debole,
            whiteSpace: 'nowrap'
          }}
        >
          {alLavoro}/{braccantiTotali} al lavoro
        </div>
      </div>

      {/* l'avviso compare solo quando un tocco non ha fatto quello che ti
          aspettavi: un ordine che non parte senza spiegazione sembra un guasto */}
      {esito ? (
        <div
          style={{
            alignSelf: 'center',
            padding: '5px 14px',
            borderRadius: 14,
            background: interfaccia.colore_pannello,
            border: '1px solid ' + interfaccia.colore_bordo_pannello,
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo_debole
          }}
        >
          {esito}
        </div>
      ) : null}
    </div>
  )
}
