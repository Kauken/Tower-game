import React from 'react'
import { interfaccia } from '../game/config.js'

function Voce({ etichetta, valore, colore }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span
        style={{
          fontSize: interfaccia.testo_piccolo,
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

// La vita del castello, l'oro e a che punto e' il livello: sempre a schermo, in
// alto perche' il pollice sta in basso, senza animazioni che li rendano
// illeggibili.
export default function Cruscotto({
  oro,
  oroPerCiclo,
  vitaCastello,
  vitaCastelloMassima,
  ondata,
  fase,
  secondiAllOndata,
  nemiciRimanenti
}) {
  const barra = interfaccia.barra_castello
  const quota = vitaCastelloMassima > 0 ? vitaCastello / vitaCastelloMassima : 0
  const castelloInPericolo = quota <= barra.soglia_bassa

  // in attesa si mostra quanto manca, durante l'ondata quanti nemici restano:
  // e' sempre la stessa domanda, "quanto manca alla fine di questo pezzo"
  const inAttesa = fase === 'attesa'

  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        top: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-top))`,
        padding: interfaccia.spaziatura,
        display: 'flex',
        flexDirection: 'column',
        gap: interfaccia.spaziatura / 2,
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        color: interfaccia.colore_testo,
        pointerEvents: 'none'
      }}
    >
      {/* la vita del castello: e' la cosa che si perde, quindi occupa tutta la
          larghezza invece di essere un numero fra gli altri */}
      <div
        style={{
          height: barra.altezza,
          borderRadius: barra.raggio_angoli,
          background: barra.colore_fondo,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: Math.max(0, quota * 100) + '%',
            height: '100%',
            borderRadius: barra.raggio_angoli,
            background: castelloInPericolo ? barra.colore_basso : barra.colore_pieno
          }}
        />
      </div>

      {/* quattro voci in una riga sola: il pannello deve restare basso, sotto
          c'e' la breccia da cui escono i nemici e va vista */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
        <Voce etichetta="Ondata" valore={ondata} colore={interfaccia.colore_testo} />
        <Voce
          etichetta="Castello"
          valore={vitaCastello}
          colore={castelloInPericolo ? interfaccia.colore_allarme : interfaccia.colore_testo}
        />
        <Voce
          etichetta={'Oro (+' + oroPerCiclo + ')'}
          valore={oro}
          colore={interfaccia.colore_oro}
        />
        <Voce
          etichetta={inAttesa ? 'Arrivano fra' : 'Nemici'}
          valore={inAttesa ? secondiAllOndata + 's' : nemiciRimanenti}
          colore={inAttesa ? interfaccia.colore_scelto : interfaccia.colore_allarme}
        />
      </div>
    </div>
  )
}
