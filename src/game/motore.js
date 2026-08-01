// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi, con
// un'eccezione dichiarata: la notifica di selezione verso React, che scatta
// solo su un tocco. Le azioni dell'interfaccia entrano da una coda di comandi.

import {
  area,
  economia,
  elencoTorri,
  grafica,
  limiti,
  mappaAttiva,
  simulazione,
  torrePerId
} from './config.js'
import { preparaPercorso } from './percorso.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas, aCoordinateLogiche } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreTruppe } from './truppe.js'
import { creaGestoreProiettili } from './proiettili.js'
import { creaGestoreTorri, statisticheTorre } from './torri.js'
import { creaGestoreOndate } from './ondate.js'
import { creaGestoreEffetti } from './effetti.js'
import {
  creaStatoPartita,
  danniAllaFortezza,
  danniAllaFortezzaNemica,
  incassa,
  paga,
  puoPagare,
  reimposta,
  ricompensaOndata
} from './partita.js'

const NESSUNA = -1

export function creaMotore(canvasSfondo, canvasGioco) {
  const percorso = preparaPercorso(mappaAttiva.percorso)
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms
  const raggioToccoQuadrato =
    grafica.caselle.raggio_tocco * grafica.caselle.raggio_tocco

  const partita = creaStatoPartita()
  const effetti = creaGestoreEffetti()

  const truppe = creaGestoreTruppe(percorso, {
    allaMorte: (fazione, oro, x, y) => {
      effetti.morte(x, y)
      if (fazione === 'nemico') {
        incassa(partita, oro)
        if (oro > 0) {
          effetti.popupOro(x, y, oro)
        }
      }
    },
    allaFortezzaGiocatore: (danno) => danniAllaFortezza(partita, danno),
    allaFortezzaNemica: (danno) => danniAllaFortezzaNemica(partita, danno)
  })

  const proiettili = creaGestoreProiettili(truppe, effetti)
  const torri = creaGestoreTorri(truppe, proiettili, effetti)
  const ondate = creaGestoreOndate(truppe)

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0,
    // per il comando costruisci: quale torre
    testo: ''
  }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = { oro: 0, fortezza: 0, fortezzaNemica: 0, ondata: 0, fase: 'pausa' }

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  let casellaScelta = NESSUNA
  let avvisaSelezione = null

  function accodaComando(tipo, x, y, testo) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.x = x
    comando.y = y
    comando.testo = testo
  }

  // Chiamata solo quando la selezione cambia (un tocco), mai a ogni frame:
  // qui creare oggetti per React e' legittimo.
  function notificaSelezione() {
    if (!avvisaSelezione) {
      return
    }
    if (casellaScelta === NESSUNA) {
      avvisaSelezione(null)
      return
    }
    const casella = mappaAttiva.caselle[casellaScelta]
    const torre = torri.torreSuCasella(casellaScelta)

    if (torre) {
      const statistiche = statisticheTorre(torrePerId(torre.id), casella)
      statistiche.costruita = true
      statistiche.dannoEffettivo = torre.danno
      avvisaSelezione(statistiche)
      return
    }

    avvisaSelezione({
      costruita: false,
      tipoCasella: casella.tipo,
      descrizioneBonus: statisticheTorre(elencoTorri[0], casella).descrizioneBonus,
      torri: elencoTorri.map((definizione) => statisticheTorre(definizione, casella))
    })
  }

  function casellaVicinaA(x, y) {
    const caselle = mappaAttiva.caselle
    let migliore = NESSUNA
    let distanzaMigliore = raggioToccoQuadrato
    for (let i = 0; i < caselle.length; i++) {
      const dx = caselle[i].x - x
      const dy = caselle[i].y - y
      const distanza = dx * dx + dy * dy
      if (distanza <= distanzaMigliore) {
        migliore = i
        distanzaMigliore = distanza
      }
    }
    return migliore
  }

  function costruisciSuScelta(torreId) {
    if (casellaScelta === NESSUNA) {
      return
    }
    const definizione = torrePerId(torreId)
    const casella = mappaAttiva.caselle[casellaScelta]
    if (!puoPagare(partita, definizione.costo)) {
      return
    }
    if (!torri.piazza(casellaScelta, definizione)) {
      return
    }
    paga(partita, definizione.costo)
    effetti.ondaPiazzamento(casella.x, casella.y)
    // resta selezionata: cosi' si vede subito il raggio della torre nuova
    notificaSelezione()
  }

  function ricomincia() {
    ondate.ferma()
    truppe.svuota()
    proiettili.svuota()
    torri.svuota()
    effetti.svuota()
    reimposta(partita)
    casellaScelta = NESSUNA
    notificaSelezione()
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false

      if (comando.tipo === 'tocco') {
        casellaScelta = casellaVicinaA(comando.x, comando.y)
        notificaSelezione()
      } else if (comando.tipo === 'costruisci') {
        costruisciSuScelta(comando.testo)
      } else if (comando.tipo === 'annulla') {
        casellaScelta = NESSUNA
        notificaSelezione()
      } else if (comando.tipo === 'chiamaOndata') {
        if (partita.fase === 'pausa') {
          partita.ondata++
          partita.fase = 'ondata'
          ondate.avvia(partita.ondata)
        }
      } else if (comando.tipo === 'ricomincia') {
        ricomincia()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    // lo sfondo si ridisegna solo qui: mai dentro il ciclo
    disegnaSfondo(ctxSfondo, mappaAttiva)
  }

  function aggiorna() {
    eseguiComandi()

    // a partita chiusa il campo si ferma: resta la schermata finale
    if (partita.fase === 'sconfitta' || partita.fase === 'vittoria') {
      return
    }

    truppe.aggiorna(simulazione.passo_ms, passoSecondi)
    torri.aggiorna(simulazione.passo_ms)
    proiettili.aggiorna(passoSecondi)
    effetti.aggiorna(simulazione.passo_ms)

    if (partita.fase === 'ondata') {
      const concluso = ondate.aggiorna(simulazione.passo_ms, partita.ondata)
      if (concluso) {
        incassa(partita, ricompensaOndata(partita.ondata))
        partita.fase = 'pausa'
      }
    }
  }

  function disegnaSelezione() {
    if (casellaScelta === NESSUNA) {
      return
    }
    const casella = mappaAttiva.caselle[casellaScelta]
    const torre = torri.torreSuCasella(casellaScelta)
    if (torre) {
      // il raggio si vede solo quando la torre e' selezionata
      torri.disegnaRaggio(ctxGioco, torre)
    }
    ctxGioco.beginPath()
    ctxGioco.arc(casella.x, casella.y, grafica.caselle.raggio_tocco, 0, Math.PI * 2)
    ctxGioco.lineWidth = grafica.caselle.spessore_selezione
    ctxGioco.strokeStyle = grafica.caselle.colore_selezione
    ctxGioco.stroke()
  }

  function disegnaBarraFortezza(ctx, blocco, vita, vitaMassima, sopra, colorePieno) {
    const barra = grafica.barra_fortezza
    const sinistra = blocco.x - barra.larghezza / 2
    const alto = sopra
      ? blocco.y - blocco.altezza / 2 - barra.distanza - barra.altezza
      : blocco.y + blocco.altezza / 2 + barra.distanza
    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
    ctx.fillStyle = colorePieno
    ctx.fillRect(sinistra, alto, (barra.larghezza * vita) / vitaMassima, barra.altezza)
    ctx.lineWidth = barra.spessore_bordo
    ctx.strokeStyle = barra.colore_bordo
    ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaSelezione()
    torri.disegna(ctxGioco)
    truppe.disegna(ctxGioco)
    proiettili.disegna(ctxGioco)
    // gli effetti sopra tutto: sono brevi e non coprono niente a lungo
    effetti.disegna(ctxGioco)

    const barra = grafica.barra_fortezza
    disegnaBarraFortezza(
      ctxGioco,
      mappaAttiva.fortezza_nemica,
      partita.fortezzaNemica,
      economia.partita.vita_fortezza_nemica,
      false,
      barra.colore_pieno_nemica
    )
    disegnaBarraFortezza(
      ctxGioco,
      mappaAttiva.fortezza_giocatore,
      partita.fortezza,
      economia.partita.vita_fortezza,
      true,
      barra.colore_pieno
    )
  }

  function frame(tempo) {
    richiesta = requestAnimationFrame(frame)

    accumulato += tempo - ultimoTempo
    ultimoTempo = tempo
    // evita la spirale della morte quando l'app torna in primo piano
    if (accumulato > accumuloMassimo) {
      accumulato = accumuloMassimo
    }
    while (accumulato >= simulazione.passo_ms) {
      aggiorna()
      accumulato -= simulazione.passo_ms
    }

    disegna()
  }

  function avvia() {
    ultimoTempo = performance.now()
    accumulato = 0
    richiesta = requestAnimationFrame(frame)
  }

  function ferma() {
    cancelAnimationFrame(richiesta)
    richiesta = 0
  }

  // --- comunicazione con l'interfaccia ---

  // L'interfaccia legge, non chiede: nessun oggetto nuovo a ogni lettura.
  function leggiStato() {
    vetrina.oro = partita.oro
    vetrina.fortezza = partita.fortezza
    vetrina.fortezzaNemica = partita.fortezzaNemica
    vetrina.ondata = partita.ondata
    vetrina.fase = partita.fase
    return vetrina
  }

  function tocca(xSchermo, ySchermo) {
    const punto = aCoordinateLogiche(canvasGioco, area, xSchermo, ySchermo)
    accodaComando('tocco', punto.x, punto.y, '')
  }

  function costruisci(torreId) {
    accodaComando('costruisci', 0, 0, torreId)
  }

  function annulla() {
    accodaComando('annulla', 0, 0, '')
  }

  function chiamaOndata() {
    accodaComando('chiamaOndata', 0, 0, '')
  }

  function riparti() {
    accodaComando('ricomincia', 0, 0, '')
  }

  function impostaAscoltatoreSelezione(ascoltatore) {
    avvisaSelezione = ascoltatore
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    tocca,
    costruisci,
    annulla,
    chiamaOndata,
    riparti,
    impostaAscoltatoreSelezione
  }
}
