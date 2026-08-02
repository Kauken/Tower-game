import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica, interfaccia } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import Levetta from './Levetta.jsx'
import SchermataFine from './SchermataFine.jsx'

const VISTA_INIZIALE = {
  vita: 0,
  vitaMassima: 0,
  fortezza: 0,
  fortezzaNemica: 0,
  grado: 0,
  fase: 'assedio',
  abbattuto: false
}

function uguali(a, b) {
  return (
    a.vita === b.vita &&
    a.vitaMassima === b.vitaMassima &&
    a.fortezza === b.fortezza &&
    a.fortezzaNemica === b.fortezzaNemica &&
    a.grado === b.grado &&
    a.fase === b.fase &&
    a.abbattuto === b.abbattuto
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
              fortezza: stato.fortezza,
              fortezzaNemica: stato.fortezzaNemica,
              grado: stato.grado,
              fase: stato.fase,
              abbattuto: stato.abbattuto
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

  const finita = vista.fase === 'vittoria' || vista.fase === 'sconfitta'

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

      <Levetta onDirezione={muovi} />

      <Cruscotto
        vita={vista.vita}
        vitaMassima={vista.vitaMassima}
        fortezza={vista.fortezza}
        fortezzaNemica={vista.fortezzaNemica}
        grado={vista.grado}
      />

      {finita ? (
        <SchermataFine esito={vista.fase} grado={vista.grado} onRicomincia={ricomincia} />
      ) : null}
    </div>
  )
}
