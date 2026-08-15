import React from 'react'
import { interfaccia } from '../game/config.js'
import Zaino from './Zaino.jsx'

// Quello che hai addosso, e cosa sta facendo l'operaio. Le due cose che devono
// stare sempre sotto gli occhi.
//
// **Non c'e' nessun orologio**, e non e' una dimenticanza: il giorno serviva a
// far scadere i salari, e i salari sono caduti con l'operaio unico. Un timer
// che gira senza avere denti e' solo un'ansia gratuita. Il ritmo lo danno gli
// sblocchi.
//
// **Non c'e' nessun totale dell'isola**, e non e' una dimenticanza: un numero
// unico che dice "hai 40 legno" farebbe credere di poterlo spendere, mentre
// quel legno sta dentro una cassa da qualche parte e qualcuno lo deve andare a
// prendere. Il solo numero che conta davvero e' quello nello zaino.
export default function Cruscotto({
  inventario,
  zainoPieno,
  statoOperaio,
  inManoTipo,
  inManoId,
  onPrendi,
  lavoriInAttesa,
  braccantiFermi,
  braccantiTotali,
  esito
}) {
  const staLavorando = braccantiTotali - braccantiFermi > 0
  // Un operaio che si pianta deve dire perche'. "In arrivo" mentre e' fermo
  // con lo zaino pieno sarebbe una bugia, e una bugia qui si legge come un
  // guasto del gioco.
  const dice =
    statoOperaio === 'pieno'
      ? 'zaino pieno'
      : statoOperaio === 'bloccato'
        ? 'gli manca qualcosa'
        : staLavorando
          ? 'al lavoro'
          : lavoriInAttesa > 0
            ? 'in arrivo'
            : 'fermo'
  const allarme = statoOperaio === 'pieno' || statoOperaio === 'bloccato'

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
      {/* cosa sta facendo l'operaio. **Niente monete**: sono state tolte,
          e con loro l'unico numero che il giocatore guardava senza che gli
          dicesse niente su quanto sta migliorando */}
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
              fontSize: interfaccia.testo_piccolo,
              fontWeight: allarme ? 700 : 400,
              color: allarme ? interfaccia.colore_accento : interfaccia.colore_testo_debole
            }}
          >
            {dice}
          </span>
        </div>
      </div>

      {/* lo zaino a caselle: quando finiscono, l'operaio si ferma. Ed e' anche
          la mano: toccare una casella con dentro qualcosa di piazzabile te lo
          mette in mano */}
      <Zaino
        inventario={inventario}
        pieno={zainoPieno}
        inManoTipo={inManoTipo}
        inManoId={inManoId}
        onPrendi={onPrendi}
      />

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
