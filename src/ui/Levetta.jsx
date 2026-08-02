import React, { useCallback, useEffect, useRef } from 'react'
import { interfaccia } from '../game/config.js'

// Levetta a pollice: nasce dove appoggi il dito e sparisce quando lo alzi.
// Copre tutto il campo, quindi deve anche distinguere i due gesti:
//   - dito appoggiato e alzato subito, quasi fermo  -> tocco (seleziona)
//   - dito che si sposta o resta giu'               -> movimento
// Non passa da useState: muovere il pomello a ogni frame con React vorrebbe
// dire ridisegnare l'interfaccia 60 volte al secondo. Qui si tocca il DOM.
export default function Levetta({ onDirezione, onTocco }) {
  const zona = useRef(null)
  const base = useRef(null)
  const pomello = useRef(null)
  const gesto = useRef({ id: null, partenzaX: 0, partenzaY: 0, istante: 0, mosso: false })

  const stile = interfaccia.levetta

  const mostra = useCallback(
    (visibile) => {
      base.current.style.opacity = visibile ? '1' : '0'
    },
    []
  )

  const muoviPomello = useCallback((dx, dy) => {
    pomello.current.style.transform =
      'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px))'
  }, [])

  const inizio = useCallback(
    (evento) => {
      if (gesto.current.id !== null) {
        return
      }
      gesto.current.id = evento.pointerId
      gesto.current.partenzaX = evento.clientX
      gesto.current.partenzaY = evento.clientY
      gesto.current.istante = performance.now()
      gesto.current.mosso = false

      const riquadro = zona.current.getBoundingClientRect()
      base.current.style.left = evento.clientX - riquadro.left + 'px'
      base.current.style.top = evento.clientY - riquadro.top + 'px'
      muoviPomello(0, 0)
      mostra(true)
      zona.current.setPointerCapture(evento.pointerId)
    },
    [mostra, muoviPomello]
  )

  const durante = useCallback(
    (evento) => {
      if (gesto.current.id !== evento.pointerId) {
        return
      }
      const dx = evento.clientX - gesto.current.partenzaX
      const dy = evento.clientY - gesto.current.partenzaY
      const distanza = Math.sqrt(dx * dx + dy * dy)

      if (distanza > stile.soglia_tocco_px) {
        gesto.current.mosso = true
      }

      if (distanza <= stile.zona_morta) {
        muoviPomello(dx, dy)
        onDirezione(0, 0, 0)
        return
      }

      const versoX = dx / distanza
      const versoY = dy / distanza
      const tirata = distanza > stile.distanza_massima ? stile.distanza_massima : distanza
      muoviPomello(versoX * tirata, versoY * tirata)
      onDirezione(versoX, versoY, tirata / stile.distanza_massima)
    },
    [muoviPomello, onDirezione, stile]
  )

  const fine = useCallback(
    (evento) => {
      if (gesto.current.id !== evento.pointerId) {
        return
      }
      const durata = performance.now() - gesto.current.istante
      const eraTocco = !gesto.current.mosso && durata <= stile.durata_tocco_ms

      gesto.current.id = null
      mostra(false)
      onDirezione(0, 0, 0)

      if (eraTocco) {
        onTocco(gesto.current.partenzaX, gesto.current.partenzaY)
      }
    },
    [mostra, onDirezione, onTocco, stile]
  )

  // se l'app va in background con il dito giu', il personaggio resterebbe
  // incantato a camminare: qui lo si ferma
  useEffect(() => {
    function ferma() {
      if (gesto.current.id === null) {
        return
      }
      gesto.current.id = null
      mostra(false)
      onDirezione(0, 0, 0)
    }
    window.addEventListener('blur', ferma)
    document.addEventListener('visibilitychange', ferma)
    return () => {
      window.removeEventListener('blur', ferma)
      document.removeEventListener('visibilitychange', ferma)
    }
  }, [mostra, onDirezione])

  return (
    <div
      ref={zona}
      onPointerDown={inizio}
      onPointerMove={durante}
      onPointerUp={fine}
      onPointerCancel={fine}
      style={{ position: 'absolute', inset: 0, touchAction: 'none' }}
    >
      <div
        ref={base}
        style={{
          position: 'absolute',
          width: stile.raggio_base * 2,
          height: stile.raggio_base * 2,
          marginLeft: -stile.raggio_base,
          marginTop: -stile.raggio_base,
          borderRadius: '50%',
          background: stile.colore_base,
          border: stile.spessore_bordo_base + 'px solid ' + stile.colore_bordo_base,
          boxSizing: 'border-box',
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div
          ref={pomello}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: stile.raggio_pomello * 2,
            height: stile.raggio_pomello * 2,
            borderRadius: '50%',
            background: stile.colore_pomello,
            border:
              stile.spessore_bordo_pomello + 'px solid ' + stile.colore_bordo_pomello,
            boxSizing: 'border-box',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
    </div>
  )
}
