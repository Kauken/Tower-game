// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
// Le azioni dell'interfaccia entrano da una coda di comandi; la levetta no,
// perche' e' uno stato continuo e in coda si perderebbero valori.

import { area, economia, grafica, limiti, mappaAttiva, simulazione } from './config.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreTruppe } from './truppe.js'
import { creaGestoreProiettili } from './proiettili.js'
import { creaGestorePressione } from './ondate.js'
import { creaGestoreEffetti } from './effetti.js'
import { creaPersonaggio } from './personaggio.js'
import {
  creaStatoPartita,
  danniAllaFortezza,
  danniAllaFortezzaNemica,
  incassa,
  reimposta
} from './partita.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms

  const partita = creaStatoPartita()
  const effetti = creaGestoreEffetti()

  const truppe = creaGestoreTruppe({
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
    allaFortezzaNemica: (danno) => danniAllaFortezzaNemica(partita, danno),
    colpisciGiocatore: (danno) => personaggio.colpisci(danno)
  })

  const proiettili = creaGestoreProiettili(truppe, effetti)
  const personaggio = creaPersonaggio(truppe, proiettili, {
    allAbbattimento: (x, y) => effetti.morte(x, y),
    allaRiforma: (x, y) => effetti.ondaPiazzamento(x, y)
  })
  const pressione = creaGestorePressione(truppe)

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: ''
  }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    vita: 0,
    vitaMassima: 0,
    fortezza: 0,
    fortezzaNemica: 0,
    grado: 0,
    fase: 'assedio',
    abbattuto: false
  }

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  function accodaComando(tipo) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
  }

  function ricomincia() {
    pressione.reimposta()
    truppe.svuota()
    proiettili.svuota()
    effetti.svuota()
    personaggio.reimposta()
    reimposta(partita)
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false
      if (comando.tipo === 'ricomincia') {
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

    pressione.aggiorna(simulazione.passo_ms)
    partita.grado = pressione.gradoMostrato()

    truppe.aggiorna(simulazione.passo_ms, passoSecondi)
    personaggio.aggiorna(simulazione.passo_ms, passoSecondi)
    proiettili.aggiorna(passoSecondi)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegnaBarraCastello(ctx, blocco, vita, vitaMassima, sopra, colorePieno) {
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
    truppe.disegna(ctxGioco)
    // il personaggio sopra le truppe: non deve mai sparire nella mischia
    personaggio.disegna(ctxGioco)
    proiettili.disegna(ctxGioco)
    // gli effetti sopra tutto: sono brevi e non coprono niente a lungo
    effetti.disegna(ctxGioco)

    const barra = grafica.barra_fortezza
    disegnaBarraCastello(
      ctxGioco,
      mappaAttiva.fortezza_nemica,
      partita.fortezzaNemica,
      economia.partita.vita_fortezza_nemica,
      false,
      barra.colore_pieno_nemica
    )
    disegnaBarraCastello(
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
    vetrina.vita = Math.ceil(personaggio.stato.vita)
    vetrina.vitaMassima = personaggio.stato.vitaMassima
    vetrina.fortezza = partita.fortezza
    vetrina.fortezzaNemica = partita.fortezzaNemica
    vetrina.grado = partita.grado
    vetrina.fase = partita.fase
    vetrina.abbattuto = !personaggio.stato.attivo
    return vetrina
  }

  // La levetta scrive direttamente: e' uno stato continuo, non un'azione.
  function muovi(x, y, intensita) {
    personaggio.muovi(x, y, intensita)
  }

  function riparti() {
    accodaComando('ricomincia')
  }

  // le truppe nemiche trattano il personaggio come un avversario qualsiasi
  truppe.impostaGiocatore(personaggio.stato)

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    muovi,
    riparti
  }
}
