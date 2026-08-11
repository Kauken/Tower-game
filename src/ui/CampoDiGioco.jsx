import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { area, grafica, interfaccia } from '../game/config.js'
import Magazzino from './Magazzino.jsx'
import PannelloCasella from './PannelloCasella.jsx'

const VISTA_INIZIALE = {
  selezionata: -1,
  contenutoSelezionato: '',
  selezionataMatura: false,
  bonusSelezionato: '',
  selezionataIrrigata: false,
  magazzino: '',
  caselleUsate: 0
}

const CAMPI = Object.keys(VISTA_INIZIALE)

function uguali(a, b) {
  for (let i = 0; i < CAMPI.length; i++) {
    if (a[CAMPI[i]] !== b[CAMPI[i]]) {
      return false
    }
  }
  return true
}

function copia(stato) {
  const nuova = {}
  for (let i = 0; i < CAMPI.length; i++) {
    nuova[CAMPI[i]] = stato[CAMPI[i]]
  }
  return nuova
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
      impostaVista((precedente) => (uguali(precedente, stato) ? precedente : copia(stato)))
    }, 1000 / interfaccia.aggiornamenti_al_secondo)

    return () => {
      clearInterval(campionamento)
      osservatore.disconnect()
      motore.ferma()
      motoreRef.current = null
    }
  }, [])

  // Il tocco arriva in pixel dello schermo: qui diventa una coordinata logica
  // del campo, e il motore ne ricava la casella. Si usa il rettangolo vero del
  // canvas invece della scala, cosi' funziona a qualunque dimensione.
  const tocca = useCallback((evento) => {
    const canvas = canvasGioco.current
    if (!canvas || !motoreRef.current) {
      return
    }
    const riquadro = canvas.getBoundingClientRect()
    motoreRef.current.toccaPunto(
      ((evento.clientX - riquadro.left) / riquadro.width) * area.larghezza,
      ((evento.clientY - riquadro.top) / riquadro.height) * area.altezza
    )
  }, [])

  const piazza = useCallback((idContenuto) => {
    motoreRef.current.piazza(motoreRef.current.leggiStato().selezionata, idContenuto)
  }, [])

  const rimuovi = useCallback(() => {
    motoreRef.current.rimuovi(motoreRef.current.leggiStato().selezionata)
  }, [])

  const chiudi = useCallback(() => {
    motoreRef.current.chiudi()
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
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: grafica.colore_fuori_area
      }}
    >
      {/* Il campo vive qui dentro, sotto al magazzino. Misurando il canvas su
          questo riquadro invece che su tutto lo schermo, la griglia non puo'
          mai finire sotto alla striscia in alto. */}
      <div
        ref={contenitore}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `calc(${interfaccia.spazio_magazzino}px + env(safe-area-inset-top))`,
          bottom: `calc(${interfaccia.spazio_sotto}px + env(safe-area-inset-bottom))`
        }}
      >
        <canvas ref={canvasSfondo} style={stileCanvas} />
        <canvas ref={canvasGioco} style={stileCanvas} onPointerDown={tocca} />
      </div>

      <Magazzino magazzino={vista.magazzino} caselleUsate={vista.caselleUsate} />

      {vista.selezionata >= 0 ? (
        <PannelloCasella
          contenuto={vista.contenutoSelezionato}
          bonus={vista.bonusSelezionato}
          irrigata={vista.selezionataIrrigata}
          onPiazza={piazza}
          onRimuovi={rimuovi}
          onChiudi={chiudi}
        />
      ) : null}
    </div>
  )
}
