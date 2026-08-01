import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica, interfaccia } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import PannelloConferma from './PannelloConferma.jsx'
import PulsanteOndata from './PulsanteOndata.jsx'
import SchermataFine from './SchermataFine.jsx'

const VISTA_INIZIALE = { oro: 0, fortezza: 0, fortezzaNemica: 0, ondata: 0, fase: 'pausa' }

function uguali(a, b) {
  return (
    a.oro === b.oro &&
    a.fortezza === b.fortezza &&
    a.fortezzaNemica === b.fortezzaNemica &&
    a.ondata === b.ondata &&
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
  const [selezione, impostaSelezione] = useState(null)
  const [vista, impostaVista] = useState(VISTA_INIZIALE)

  useEffect(() => {
    const motore = creaMotore(canvasSfondo.current, canvasGioco.current)
    motoreRef.current = motore
    motore.impostaAscoltatoreSelezione(impostaSelezione)

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
              oro: stato.oro,
              fortezza: stato.fortezza,
              fortezzaNemica: stato.fortezzaNemica,
              ondata: stato.ondata,
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

  const tocca = useCallback((evento) => {
    motoreRef.current.tocca(evento.clientX, evento.clientY)
  }, [])

  const costruisci = useCallback((torreId) => {
    motoreRef.current.costruisci(torreId)
  }, [])

  const annulla = useCallback(() => {
    motoreRef.current.annulla()
  }, [])

  const chiamaOndata = useCallback(() => {
    motoreRef.current.chiamaOndata()
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
      <canvas ref={canvasGioco} style={stileCanvas} onPointerDown={tocca} />

      <Cruscotto
        oro={vista.oro}
        fortezza={vista.fortezza}
        fortezzaNemica={vista.fortezzaNemica}
        ondata={vista.ondata}
      />

      <div
        style={{
          position: 'absolute',
          left: interfaccia.spaziatura,
          right: interfaccia.spaziatura,
          bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
          display: 'flex',
          flexDirection: 'column',
          gap: interfaccia.spaziatura
        }}
      >
        <PannelloConferma
          selezione={selezione}
          oro={vista.oro}
          onCostruisci={costruisci}
          onAnnulla={annulla}
        />
        {vista.fase === 'pausa' ? (
          <PulsanteOndata prossimaOndata={vista.ondata + 1} onChiama={chiamaOndata} />
        ) : null}
      </div>

      {finita ? (
        <SchermataFine esito={vista.fase} ondata={vista.ondata} onRicomincia={ricomincia} />
      ) : null}
    </div>
  )
}
