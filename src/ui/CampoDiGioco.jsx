import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { area, grafica, interfaccia } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import PannelloCasella from './PannelloCasella.jsx'
import Mercato from './Mercato.jsx'
import Riepilogo from './Riepilogo.jsx'
import Bottone from './Bottone.jsx'

const VISTA_INIZIALE = {
  monete: 0,
  giorno: 1,
  oraDelGiorno: 0,
  spesaGiornaliera: 0,
  costoDissodare: 0,
  selezionata: -1,
  statoSelezionata: '',
  contenutoSelezionato: '',
  selezionataIrrigata: false,
  magazzino: '',
  semi: '',
  prezzi: '',
  valoreMagazzino: 0,
  mostraRiepilogo: false,
  riepilogo: ''
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

// "grano:12,rapa:0" -> {grano: 12, rapa: 0}. Il motore manda una stringa sola
// invece di un oggetto, cosi' l'interfaccia capisce con un confronto se e'
// cambiata qualcosa e non ridisegna per niente.
function leggiConti(riga) {
  const conti = {}
  if (!riga) {
    return conti
  }
  const pezzi = riga.split(',')
  for (let i = 0; i < pezzi.length; i++) {
    const punto = pezzi[i].indexOf(':')
    conti[pezzi[i].slice(0, punto)] = Number(pezzi[i].slice(punto + 1))
  }
  return conti
}

// React monta i canvas e l'interfaccia. Non partecipa al ciclo di gioco:
// legge lo stato a intervalli (10 volte al secondo), non a ogni frame.
export default function CampoDiGioco() {
  const contenitore = useRef(null)
  const canvasSfondo = useRef(null)
  const canvasGioco = useRef(null)
  const motoreRef = useRef(null)
  const [vista, impostaVista] = useState(VISTA_INIZIALE)
  const [mercatoAperto, apriMercato] = useState(false)

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

  const selezionata = () => motoreRef.current.leggiStato().selezionata

  const pianta = useCallback((id) => motoreRef.current.pianta(selezionata(), id), [])
  const dissoda = useCallback(() => motoreRef.current.dissoda(selezionata()), [])
  const estirpa = useCallback(() => motoreRef.current.estirpa(selezionata()), [])
  const chiudi = useCallback(() => motoreRef.current.chiudi(), [])
  const compra = useCallback((id) => motoreRef.current.compra(id), [])
  const vendi = useCallback((id) => motoreRef.current.vendi(id), [])
  const vendiTutto = useCallback(() => motoreRef.current.vendiTutto(), [])
  const chiudiRiepilogo = useCallback(() => motoreRef.current.chiudiRiepilogo(), [])

  const stileCanvas = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    touchAction: 'none'
  }

  const semi = leggiConti(vista.semi)
  const magazzino = leggiConti(vista.magazzino)
  const prezzi = leggiConti(vista.prezzi)
  const pannelloCasellaAperto = vista.selezionata >= 0 && !mercatoAperto

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: grafica.colore_fuori_area
      }}
    >
      {/* Il campo vive qui dentro, fra il cruscotto e il pulsante del mercato.
          Misurando il canvas su questo riquadro invece che su tutto lo schermo,
          il campo non puo' mai finire sotto ai comandi. */}
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

      <Cruscotto
        monete={vista.monete}
        giorno={vista.giorno}
        oraDelGiorno={vista.oraDelGiorno}
        spesaGiornaliera={vista.spesaGiornaliera}
      />

      {pannelloCasellaAperto ? (
        <PannelloCasella
          stato={vista.statoSelezionata}
          contenuto={vista.contenutoSelezionato}
          irrigata={vista.selezionataIrrigata}
          monete={vista.monete}
          costoDissodare={vista.costoDissodare}
          semi={semi}
          onPianta={pianta}
          onDissoda={dissoda}
          onEstirpa={estirpa}
          onChiudi={chiudi}
        />
      ) : null}

      {mercatoAperto ? (
        <Mercato
          monete={vista.monete}
          magazzino={magazzino}
          prezzi={prezzi}
          valoreMagazzino={vista.valoreMagazzino}
          onCompra={compra}
          onVendi={vendi}
          onVendiTutto={vendiTutto}
          onChiudi={() => apriMercato(false)}
        />
      ) : null}

      {vista.mostraRiepilogo ? (
        <Riepilogo dati={vista.riepilogo} onChiudi={chiudiRiepilogo} />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: interfaccia.spaziatura,
          right: interfaccia.spaziatura,
          bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
          display: 'flex'
        }}
      >
        <Bottone
          titolo={mercatoAperto ? 'Chiudi il mercato' : 'Mercato'}
          dettaglio={
            mercatoAperto ? undefined : 'vendi il raccolto, compra semi'
          }
          colore={interfaccia.pannello.colore_mercato}
          largo
          onTocco={() => apriMercato((aperto) => !aperto)}
        />
      </div>
    </div>
  )
}
