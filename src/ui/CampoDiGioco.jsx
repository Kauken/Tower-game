import React, { useCallback, useEffect, useRef, useState } from 'react'
import { creaMotore } from '../game/motore.js'
import { area, grafica, interfaccia, telecamera } from '../game/config.js'
import Cruscotto from './Cruscotto.jsx'
import Bottone from './Bottone.jsx'
import {
  Avviso,
  PannelloBracciante,
  PannelloCassa,
  PannelloCostruisci,
  Riepilogo
} from './Pannelli.jsx'
import { elencoTecnologie } from '../game/config.js'

const VISTA_INIZIALE = {
  magazzino: '',
  lavoriInAttesa: 0,
  braccantiFermi: 0,
  braccantiTotali: 0,
  zoomLontano: false,
  modo: 'normale',
  daCostruire: '',
  esito: '',
  braccianteScelto: -1,
  nomeScelto: '',
  statoScelto: '',
  caricoScelto: '',
  scaricaAScelto: '',
  cassaScelta: false,
  contenutoCassa: '',
  pienoCassa: '',
  cassaEIlCasotto: false,
  valoreCassa: 0,
  monete: 0,
  giorno: 1,
  oraDelGiorno: 0,
  zaino: 0,
  mostraRiepilogo: false,
  riepilogo: '',
  tecnologie: ''
}

// "ascia_affilata:presa,vivaio:bloccata" -> l'albero pronto da mostrare
function leggiTecnologie(riga) {
  const stati = {}
  if (riga) {
    riga.split(',').forEach((pezzo) => {
      const punto = pezzo.indexOf(':')
      stati[pezzo.slice(0, punto)] = pezzo.slice(punto + 1)
    })
  }
  return elencoTecnologie.map((t) => ({ ...t, stato: stati[t.id] || 'bloccata' }))
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
  const assegna = useCallback(() => motoreRef.current.assegna(), [])
  const annulla = useCallback(() => {
    motoreRef.current.annulla()
    apriCostruzione(false)
  }, [])
  const costruisci = useCallback((id) => {
    motoreRef.current.costruisci(id)
    apriCostruzione(false)
  }, [])
  const vendi = useCallback(() => motoreRef.current.vendi(), [])
  const studia = useCallback((id) => motoreRef.current.studia(id), [])
  const chiudiRiepilogo = useCallback(() => motoreRef.current.chiudiRiepilogo(), [])

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
        monete={vista.monete}
        giorno={vista.giorno}
        oraDelGiorno={vista.oraDelGiorno}
        zaino={vista.zaino}
        esito={vista.esito}
      />

      {vista.mostraRiepilogo ? (
        <Riepilogo dati={vista.riepilogo} onChiudi={chiudiRiepilogo} />
      ) : null}

      {/* i fogli e gli avvisi stanno sopra alla riga dei pulsanti, mai sotto:
          il pollice arriva prima in basso */}
      {vista.modo === 'costruisci' ? (
        <Avviso testo="Tocca dove metterla" onAnnulla={annulla} />
      ) : vista.modo === 'assegna' ? (
        <Avviso testo="Tocca la cassa dove deve scaricare" onAnnulla={annulla} />
      ) : costruzioneAperta ? (
        <PannelloCostruisci
          magazzino={vista.magazzino}
          onCostruisci={costruisci}
          onChiudi={() => apriCostruzione(false)}
        />
      ) : vista.braccianteScelto >= 0 ? (
        <PannelloBracciante
          nome={vista.nomeScelto}
          stato={vista.statoScelto}
          carico={vista.caricoScelto}
          scaricaA={vista.scaricaAScelto}
          onAssegna={assegna}
          onChiudi={annulla}
        />
      ) : vista.cassaScelta ? (
        <PannelloCassa
          contenuto={vista.contenutoCassa}
          pieno={vista.pienoCassa}
          valore={vista.valoreCassa}
          eIlCasotto={vista.cassaEIlCasotto}
          monete={vista.monete}
          tecnologie={leggiTecnologie(vista.tecnologie)}
          onVendi={vendi}
          onStudia={studia}
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
