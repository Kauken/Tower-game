import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { area, grafica, interfaccia, telecamera } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import Bottone from './Bottone.jsx'

const VISTA_INIZIALE = {
  magazzino: '',
  lavoriInAttesa: 0,
  braccantiFermi: 0,
  braccantiTotali: 0,
  zoomLontano: false,
  ultimoEsito: ''
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

// React monta il canvas e l'interfaccia. Non partecipa al ciclo di gioco:
// legge lo stato a intervalli (10 volte al secondo), non a ogni frame.
export default function CampoDiGioco() {
  const contenitore = useRef(null)
  const canvasGioco = useRef(null)
  const motoreRef = useRef(null)
  const gesto = useRef({ premuto: false, x: 0, y: 0, inizio: 0, spostato: 0 })
  const [vista, impostaVista] = useState(VISTA_INIZIALE)

  useEffect(() => {
    const motore = creaMotore(canvasGioco.current)
    motoreRef.current = motore

    const elemento = contenitore.current

    function adatta() {
      motore.ridimensiona(elemento.clientWidth, elemento.clientHeight)
    }

    adatta()
    motore.avvia()

    const osservatore = new ResizeObserver(adatta)
    osservatore.observe(elemento)

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

  // Da pixel dello schermo a pixel logici del campo. Si usa il rettangolo vero
  // del canvas invece della scala, cosi' funziona a qualunque dimensione.
  const logico = useCallback((evento) => {
    const riquadro = canvasGioco.current.getBoundingClientRect()
    return {
      x: ((evento.clientX - riquadro.left) / riquadro.width) * area.larghezza,
      y: ((evento.clientY - riquadro.top) / riquadro.height) * area.altezza,
      scala: area.larghezza / riquadro.width
    }
  }, [])

  // Lo stesso dito fa due cose: se lo muovi sposti la mappa, se lo appoggi e
  // lo alzi dai un ordine. La soglia sta in configurazione perche' e' una
  // misura di sensazione, non un dettaglio tecnico.
  const inizio = useCallback(
    (evento) => {
      evento.currentTarget.setPointerCapture(evento.pointerId)
      gesto.current = {
        premuto: true,
        x: evento.clientX,
        y: evento.clientY,
        inizio: performance.now(),
        spostato: 0
      }
    },
    []
  )

  const muovi = useCallback(
    (evento) => {
      const g = gesto.current
      if (!g.premuto || !motoreRef.current) {
        return
      }
      const dx = evento.clientX - g.x
      const dy = evento.clientY - g.y
      g.spostato += Math.abs(dx) + Math.abs(dy)
      g.x = evento.clientX
      g.y = evento.clientY

      const scala = logico(evento).scala
      motoreRef.current.trascina(dx * scala, dy * scala)
    },
    [logico]
  )

  const fine = useCallback(
    (evento) => {
      const g = gesto.current
      g.premuto = false
      if (!motoreRef.current) {
        return
      }
      const durata = performance.now() - g.inizio
      if (
        g.spostato <= telecamera.soglia_trascinamento &&
        durata <= telecamera.durata_tocco_ms
      ) {
        const punto = logico(evento)
        motoreRef.current.tocca(punto.x, punto.y)
      }
    },
    [logico]
  )

  const zoom = useCallback(() => motoreRef.current.zoom(), [])

  return (
    <div
      ref={contenitore}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: grafica.colore_fuori_area,
        touchAction: 'none'
      }}
    >
      <canvas
        ref={canvasGioco}
        onPointerDown={inizio}
        onPointerMove={muovi}
        onPointerUp={fine}
        onPointerCancel={fine}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          touchAction: 'none'
        }}
      />

      <Cruscotto
        magazzino={vista.magazzino}
        lavoriInAttesa={vista.lavoriInAttesa}
        braccantiFermi={vista.braccantiFermi}
        braccantiTotali={vista.braccantiTotali}
        esito={vista.ultimoEsito}
      />

      <div
        style={{
          position: 'absolute',
          right: interfaccia.spaziatura,
          bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
          width: 132,
          display: 'flex'
        }}
      >
        <Bottone
          titolo={vista.zoomLontano ? 'Avvicina' : 'Allontana'}
          colore={interfaccia.pannello.colore_azione}
          largo
          onTocco={zoom}
        />
      </div>
    </div>
  )
}
