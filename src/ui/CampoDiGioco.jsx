import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica, interfaccia } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import Levetta from './Levetta.jsx'
import PannelloStanzaPulita from './PannelloStanzaPulita.jsx'
import SchermataFine from './SchermataFine.jsx'

const VISTA_INIZIALE = {
  vita: 0,
  vitaMassima: 0,
  nemici: 0,
  stanza: 0,
  fase: 'combattimento'
}

function uguali(a, b) {
  return (
    a.vita === b.vita &&
    a.vitaMassima === b.vitaMassima &&
    a.nemici === b.nemici &&
    a.stanza === b.stanza &&
    a.fase === b.fase
  )
}

// React monta i canvas e l'interfaccia. Non partecipa al ciclo di gioco:
// legge lo stato a intervalli (10 volte al secondo), non a ogni frame.
export default function CampoDiGioco() {
  const contenitore = useRef(null)
  const canvasSfondo = useRef(null)
  const canvasGioco = useRef(null)
  const motoreRef = useRef(null)
  const [vista, impostaVista] = useState(VISTA_INIZIALE)

  useEffect(() => {
    const motore = creaMotore(canvasSfondo.current, canvasGioco.current)
    motoreRef.current = motore

    const elemento = contenitore.current

    function adatta() {
      motore.ridimensiona(elemento.clientWidth, elemento.clientHeight)
    }

    adatta()
    motore.avvia()

    const osservatore = new ResizeObserver(adatta)
    osservatore.observe(elemento)

    // campionamento dell'interfaccia: se non e' cambiato niente non si
    // ridisegna niente, cosi' la batteria ringrazia
    const campionamento = setInterval(() => {
      const stato = motore.leggiStato()
      impostaVista((precedente) =>
        uguali(precedente, stato)
          ? precedente
          : {
              vita: stato.vita,
              vitaMassima: stato.vitaMassima,
              nemici: stato.nemici,
              stanza: stato.stanza,
              fase: stato.fase
            }
      )
    }, 1000 / interfaccia.aggiornamenti_al_secondo)

    return () => {
      clearInterval(campionamento)
      osservatore.disconnect()
      motore.ferma()
      motoreRef.current = null
    }
  }, [])

  const muovi = useCallback((x, y, intensita) => {
    motoreRef.current.muovi(x, y, intensita)
  }, [])

  const prosegui = useCallback(() => {
    motoreRef.current.prosegui()
  }, [])

  const ricomincia = useCallback(() => {
    motoreRef.current.riparti()
  }, [])

  const stileCanvas = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    touchAction: 'none'
  }

  return (
    <div
      ref={contenitore}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: grafica.colore_fuori_area
      }}
    >
      <canvas ref={canvasSfondo} style={stileCanvas} />
      <canvas ref={canvasGioco} style={stileCanvas} />

      {/* La levetta sta sopra il campo ma sotto i pannelli: i pulsanti
          continuano a ricevere i tocchi perche' vengono dopo. */}
      <Levetta onDirezione={muovi} />

      <Cruscotto
        vita={vista.vita}
        vitaMassima={vista.vitaMassima}
        stanza={vista.stanza}
        nemici={vista.nemici}
      />

      {vista.fase === 'pulita' ? <PannelloStanzaPulita onProsegui={prosegui} /> : null}

      {vista.fase === 'sconfitta' ? (
        <SchermataFine stanza={vista.stanza} onRicomincia={ricomincia} />
      ) : null}
    </div>
  )
}
