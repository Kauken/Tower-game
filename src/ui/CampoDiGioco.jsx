import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica } from '../game/config.js'
import PannelloConferma from './PannelloConferma.jsx'

// React monta i due canvas e il pannello di conferma. Non sa niente del ciclo
// di gioco: l'unico stato che tiene cambia quando il dito tocca una casella,
// non a ogni frame.
export default function CampoDiGioco() {
  const contenitore = useRef(null)
  const canvasSfondo = useRef(null)
  const canvasGioco = useRef(null)
  const motoreRef = useRef(null)
  const [selezione, impostaSelezione] = useState(null)

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

    return () => {
      osservatore.disconnect()
      motore.ferma()
      motoreRef.current = null
    }
  }, [])

  const tocca = useCallback((evento) => {
    motoreRef.current.tocca(evento.clientX, evento.clientY)
  }, [])

  const costruisci = useCallback(() => {
    motoreRef.current.costruisci()
  }, [])

  const annulla = useCallback(() => {
    motoreRef.current.annulla()
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
      <canvas ref={canvasGioco} style={stileCanvas} onPointerDown={tocca} />
      <PannelloConferma
        selezione={selezione}
        onCostruisci={costruisci}
        onAnnulla={annulla}
      />
    </div>
  )
}
