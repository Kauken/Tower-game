import React from 'react'
import { grafica, interfaccia } from '../game/config.js'

function Voce({ etichetta, valore, colore }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span
        style={{
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo_debole
        }}
      >
        {etichetta}
      </span>
      <span style={{ fontSize: interfaccia.testo_titolo, fontWeight: 700, color: colore }}>
        {valore}
      </span>
    </div>
  )
}

// La tua vita, quella dei due castelli e il grado di pressione: sempre a
// schermo, in posizione fissa, senza animazioni che li rendano illeggibili.
export default function Cruscotto({ vita, vitaMassima, fortezza, fortezzaNemica, grado }) {
  // stessa soglia della barra sul campo, altrimenti i due indicatori si
  // contraddicono in una fascia di vita
  const vitaBassa = vita <= vitaMassima * grafica.personaggio.barra_vita.soglia_bassa

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        padding: interfaccia.spaziatura,
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo,
        pointerEvents: 'none'
      }}
    >
      <Voce
        etichetta="Vita"
        valore={vita}
        colore={vitaBassa ? interfaccia.colore_allarme : interfaccia.colore_scelto}
      />
      <Voce
        etichetta="Castello"
        valore={fortezza}
        colore={fortezza > 0 ? interfaccia.colore_testo : interfaccia.colore_allarme}
      />
      <Voce etichetta="Nemico" valore={fortezzaNemica} colore={interfaccia.colore_allarme} />
      <Voce etichetta="Pressione" valore={grado} colore={interfaccia.colore_testo} />
    </div>
  )
}
