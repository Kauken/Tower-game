import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { grafica, interfaccia } from '../game/config.js'
import Comandi from './Comandi.jsx'
import Cruscotto from './Cruscotto.jsx'
import SchermataFine from './SchermataFine.jsx'

const VISTA_INIZIALE = {
  oro: 0,
  oroPerCiclo: 0,
  livelloRendita: 0,
  costoPotenziamento: 0,
  renditaAlMassimo: false,
  vitaCastello: 0,
  vitaCastelloMassima: 0,
  ondata: 0,
  fase: 'attesa',
  secondiAllOndata: 0,
  nemiciRimanenti: 0
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

  const compra = useCallback((idRecluta) => {
    motoreRef.current.compra(idRecluta)
  }, [])

  const potenzia = useCallback(() => {
    motoreRef.current.potenzia()
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
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: grafica.colore_fuori_area
      }}
    >
      {/* Il campo vive qui dentro, fra il cruscotto e i pulsanti. Misurando il
          canvas su questo riquadro invece che su tutto lo schermo, il castello
          non puo' finire sotto ai comandi su nessun telefono. */}
      <div
        ref={contenitore}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `calc(${interfaccia.spazio_cruscotto}px + env(safe-area-inset-top))`,
          bottom: `calc(${interfaccia.spazio_comandi}px + env(safe-area-inset-bottom))`
        }}
      >
        <canvas ref={canvasSfondo} style={stileCanvas} />
        <canvas ref={canvasGioco} style={stileCanvas} />
      </div>

      <Cruscotto
        oro={vista.oro}
        oroPerCiclo={vista.oroPerCiclo}
        vitaCastello={vista.vitaCastello}
        vitaCastelloMassima={vista.vitaCastelloMassima}
        ondata={vista.ondata}
        fase={vista.fase}
        secondiAllOndata={vista.secondiAllOndata}
        nemiciRimanenti={vista.nemiciRimanenti}
      />

      <Comandi
        oro={vista.oro}
        costoPotenziamento={vista.costoPotenziamento}
        livelloRendita={vista.livelloRendita}
        oroPerCiclo={vista.oroPerCiclo}
        renditaAlMassimo={vista.renditaAlMassimo}
        attivi={vista.fase !== 'sconfitta'}
        onCompra={compra}
        onPotenzia={potenzia}
      />

      {vista.fase === 'sconfitta' ? (
        <SchermataFine ondata={vista.ondata} onRicomincia={ricomincia} />
      ) : null}
    </div>
  )
}
