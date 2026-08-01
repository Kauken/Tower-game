import React, { useEffect, useRef } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica } from '../game/config.js'

// React monta i due canvas e non sa altro del gioco: il ciclo vive tutto
// dentro il motore, qui non c'e' nessuno stato che cambia a ogni frame.
export default function CampoDiGioco() {
  const contenitore = useRef(null)
  const canvasSfondo = useRef(null)
  const canvasGioco = useRef(null)

  useEffect(() => {
    const motore = creaMotore(canvasSfondo.current, canvasGioco.current)
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
    }
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
    </div>
  )
}
