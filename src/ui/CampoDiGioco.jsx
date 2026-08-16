import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { area, grafica, interfaccia, telecamera } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import Bottone from './Bottone.jsx'
import {
  InMano,
  PannelloBracciante,
  PannelloCassa,
  PannelloCostruisci,
  PannelloMacchina
} from './Pannelli.jsx'
import { elencoProgetti } from '../game/config.js'

const VISTA_INIZIALE = {
  lavoriInAttesa: 0,
  braccantiFermi: 0,
  braccantiTotali: 0,
  zoomLontano: false,
  inManoTipo: '',
  inManoId: '',
  inManoNome: '',
  inManoQuanti: 0,
  esito: '',
  braccianteScelto: -1,
  nomeScelto: '',
  statoScelto: '',
  cassaScelta: false,
  contenutoCassa: '',
  pienoCassa: '',
  cassaEIlCasotto: false,
  cassaEBanco: false,
  cassaFa: '',
  slotOperaio: 0,
  inventario: '',
  zainoPieno: false,
  statoOperaio: '',
  progetti: '',
  ricette: '',
  macchinaScelta: false,
  nomeMacchina: '',
  statoMacchina: '',
  entrataMacchina: '',
  uscitaMacchina: '',
  avanzamentoMacchina: 0,
  accettaMacchina: '',
  costruzioniAperte: ''
}

// "ascia_affilata:fatto,vivaio:bloccato" -> due oggetti pronti da mostrare
function leggiStati(riga) {
  const stati = {}
  if (riga) {
    riga.split(',').forEach((pezzo) => {
      if (!pezzo) {
        return
      }
      const punto = pezzo.indexOf(':')
      stati[pezzo.slice(0, punto)] = pezzo.slice(punto + 1)
    })
  }
  return stati
}

function leggiProgetti(riga) {
  const stati = leggiStati(riga)
  return elencoProgetti.map((t) => ({ ...t, stato: stati[t.id] || 'bloccato' }))
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
  const [costruzioneAperta, apriCostruzione] = useState(false)

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

    // Su telefono la sessione finisce quasi sempre cosi': l'app va in
    // background. E' il momento in cui salvare davvero, e non si puo'
    // aspettare il prossimo giro del ciclo perche' potrebbe non arrivare.
    function quandoSparisce() {
      if (document.visibilityState === 'hidden') {
        motore.salvaSubito()
      }
    }
    document.addEventListener('visibilitychange', quandoSparisce)
    window.addEventListener('pagehide', quandoSparisce)

    const campionamento = setInterval(() => {
      const stato = motore.leggiStato()
      impostaVista((precedente) => (uguali(precedente, stato) ? precedente : copia(stato)))
    }, 1000 / interfaccia.aggiornamenti_al_secondo)

    return () => {
      clearInterval(campionamento)
      osservatore.disconnect()
      document.removeEventListener('visibilitychange', quandoSparisce)
      window.removeEventListener('pagehide', quandoSparisce)
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
      // se hai qualcosa in mano, il segno di dove finira' compare **subito**,
      // mentre il dito e' ancora giu': su un telefono non esiste il passaggio
      // del mouse, e senza questo si piazzerebbe alla cieca
      const punto = logico(evento)
      motoreRef.current.punta(punto.x, punto.y)
    },
    [logico]
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

      const punto = logico(evento)
      motoreRef.current.trascina(dx * punto.scala, dy * punto.scala)
      // appena diventa un trascinamento il segno sparisce: stai spostando la
      // mappa, non stai mirando
      if (g.spostato > telecamera.soglia_trascinamento) {
        motoreRef.current.spunta()
      } else {
        motoreRef.current.punta(punto.x, punto.y)
      }
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
      motoreRef.current.spunta()
    },
    [logico]
  )

  const zoom = useCallback(() => motoreRef.current.zoom(), [])
  const deposita = useCallback((id) => motoreRef.current.deposita(id), [])
  const preleva = useCallback((id) => motoreRef.current.preleva(id), [])
  const annulla = useCallback(() => {
    motoreRef.current.annulla()
    apriCostruzione(false)
  }, [])
  const riponi = useCallback(() => motoreRef.current.annulla(), [])
  const prendiMateriale = useCallback((id) => motoreRef.current.prendi('materiale', id), [])
  const prendiCostruzione = useCallback((id) => {
    motoreRef.current.prendi('costruzione', id)
    apriCostruzione(false)
  }, [])
  const fabbrica = useCallback((id) => motoreRef.current.fabbrica(id), [])

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
        lavoriInAttesa={vista.lavoriInAttesa}
        braccantiFermi={vista.braccantiFermi}
        braccantiTotali={vista.braccantiTotali}
        inventario={vista.inventario}
        zainoPieno={vista.zainoPieno}
        statoOperaio={vista.statoOperaio}
        inManoTipo={vista.inManoTipo}
        inManoId={vista.inManoId}
        onPrendi={prendiMateriale}
        esito={vista.esito}
      />

      {/* i fogli e gli avvisi stanno sopra alla riga dei pulsanti, mai sotto:
          il pollice arriva prima in basso */}
      {vista.inManoTipo ? (
        <InMano
          nome={vista.inManoNome}
          quanti={vista.inManoQuanti}
          onRiponi={riponi}
        />
      ) : costruzioneAperta ? (
        <PannelloCostruisci
          inventarioOperaio={vista.inventario}
          inManoId={vista.inManoId}
          aperte={vista.costruzioniAperte}
          onPrendi={prendiCostruzione}
          onChiudi={() => apriCostruzione(false)}
        />
      ) : vista.braccianteScelto >= 0 ? (
        <PannelloBracciante
          nome={vista.nomeScelto}
          stato={vista.statoScelto}
          inventario={vista.inventario}
          slot={vista.slotOperaio}
          onChiudi={annulla}
        />
      ) : vista.macchinaScelta ? (
        <PannelloMacchina
          nome={vista.nomeMacchina}
          stato={vista.statoMacchina}
          entrata={vista.entrataMacchina}
          uscita={vista.uscitaMacchina}
          avanzamento={vista.avanzamentoMacchina}
          accetta={vista.accettaMacchina}
          inventarioOperaio={vista.inventario}
          onDeposita={deposita}
          onPreleva={preleva}
          onChiudi={annulla}
        />
      ) : vista.cassaScelta ? (
        <PannelloCassa
          contenuto={vista.contenutoCassa}
          inventarioOperaio={vista.inventario}
          pieno={vista.pienoCassa}
          eIlCasotto={vista.cassaEIlCasotto}
          eBanco={vista.cassaEBanco}
          fa={vista.cassaFa}
            progetti={leggiProgetti(vista.progetti)}
          ricette={leggiStati(vista.ricette)}
          onDeposita={deposita}
          onPreleva={preleva}
          onFabbrica={fabbrica}
          onChiudi={annulla}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: interfaccia.spaziatura,
          right: interfaccia.spaziatura,
          bottom: `calc(${interfaccia.spaziatura}px + env(safe-area-inset-bottom))`,
          display: 'flex',
          gap: interfaccia.spaziatura_stretta
        }}
      >
        <Bottone
          titolo="Costruisci"
          colore={interfaccia.pannello.colore_azione}
          onTocco={() => {
            motoreRef.current.annulla()
            apriCostruzione((aperto) => !aperto)
          }}
        />
        <Bottone
          titolo={vista.zoomLontano ? 'Avvicina' : 'Allontana'}
          colore={interfaccia.pannello.colore_chiudi}
          onTocco={zoom}
        />
      </div>
    </div>
  )
}
