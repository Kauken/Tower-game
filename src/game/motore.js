// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Le azioni dell'interfaccia (compra, potenzia, ricomincia) entrano da una
// coda di comandi e vengono eseguite dentro un passo di simulazione: cosi' due
// tocchi ravvicinati non possono spendere due volte lo stesso oro.

import {
  area,
  campo,
  limiti,
  reclutaIniziale,
  simulazione,
  trovaRecluta
} from './config.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreCombattenti } from './combattenti.js'
import { creaGestoreEffetti } from './effetti.js'
import { creaEconomia } from './economia.js'
import { creaGestoreOndate } from './ondate.js'
import { colpisciCastello, creaStatoPartita, reimposta } from './partita.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms

  const datiRecluta = trovaRecluta(reclutaIniziale)

  const partita = creaStatoPartita()
  const effetti = creaGestoreEffetti()

  const economia = creaEconomia({
    allaProduzione: () => {
      for (let i = 0; i < campo.torri_rendita.length; i++) {
        effetti.rendita(campo.torri_rendita[i].x, campo.torri_rendita[i].y)
      }
    }
  })

  const combattenti = creaGestoreCombattenti({
    allImpatto: (x, y) => effetti.impatto(x, y),
    allaMorte: (x, y) => effetti.morte(x, y),
    allaComparsa: (x, y) => effetti.comparsa(x, y),
    allArrivoAlCastello: (danno, x, y) => {
      effetti.esplosione(x, y)
      colpisciCastello(partita, danno)
    },
    allOroRaccolto: (quantita) => economia.incassa(quantita)
  })

  const ondate = creaGestoreOndate(combattenti, partita, {
    allaFineOndata: (numeroOndata) => economia.ricompensaOndata(numeroOndata)
  })

  const comandi = creaPool(limiti.comandi_massimi, () => ({ attivo: false, tipo: '' }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    oro: 0,
    oroPerCiclo: 0,
    livelloRendita: 0,
    costoRecluta: datiRecluta.costo,
    nomeRecluta: datiRecluta.nome,
    costoPotenziamento: 0,
    renditaAlMassimo: false,
    vitaCastello: 0,
    vitaCastelloMassima: 0,
    ondata: 0,
    fase: 'attesa',
    secondiAllOndata: 0,
    nemiciRimanenti: 0
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
    combattenti.svuota()
    effetti.svuota()
    economia.reimposta()
    reimposta(partita)
    ondate.reimposta()
  }

  function compraRecluta() {
    if (partita.fase === 'sconfitta') {
      return
    }
    // il posto si controlla prima di pagare: se il pool e' pieno la recluta
    // non comparirebbe e l'oro sarebbe speso per niente
    if (!combattenti.cePostoPerUnaRecluta()) {
      return
    }
    if (!economia.spendi(datiRecluta.costo)) {
      return
    }
    combattenti.faiPartireRecluta(reclutaIniziale)
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
      } else if (comando.tipo === 'compra_recluta') {
        compraRecluta()
      } else if (comando.tipo === 'potenzia_rendita' && partita.fase !== 'sconfitta') {
        economia.potenziaRendita()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    // lo sfondo si ridisegna solo qui: mai dentro il ciclo
    disegnaSfondo(ctxSfondo)
  }

  function aggiorna() {
    eseguiComandi()

    if (partita.fase === 'sconfitta') {
      // a run finita resta la schermata: gli effetti finiscono di sfumare
      effetti.aggiorna(simulazione.passo_ms)
      return
    }

    // l'oro sale anche mentre non succede niente: e' la pausa fra le ondate
    // che rende una decisione il momento in cui si spende
    economia.aggiorna(simulazione.passo_ms)
    ondate.aggiorna(simulazione.passo_ms)
    combattenti.aggiorna(simulazione.passo_ms, passoSecondi)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    combattenti.disegna(ctxGioco)
    // gli effetti sopra tutto: sono brevi e non coprono niente a lungo
    effetti.disegna(ctxGioco)
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
    vetrina.oro = Math.floor(economia.stato.oro)
    vetrina.oroPerCiclo = economia.stato.oroPerCiclo
    vetrina.livelloRendita = economia.stato.livelloRendita
    vetrina.costoPotenziamento = economia.stato.costoPotenziamento
    vetrina.renditaAlMassimo = economia.stato.renditaAlMassimo
    vetrina.vitaCastello = partita.vitaCastello
    vetrina.vitaCastelloMassima = partita.vitaCastelloMassima
    vetrina.ondata = partita.ondata
    vetrina.fase = partita.fase
    // arrotondato per eccesso: il conto alla rovescia non deve mostrare 0
    // mentre l'ondata non e' ancora partita
    vetrina.secondiAllOndata =
      partita.fase === 'attesa' ? Math.ceil(partita.attesaMs / 1000) : 0
    vetrina.nemiciRimanenti = partita.fase === 'ondata' ? partita.nemiciRimanenti : 0
    return vetrina
  }

  function compra() {
    accodaComando('compra_recluta')
  }

  function potenzia() {
    accodaComando('potenzia_rendita')
  }

  function riparti() {
    accodaComando('ricomincia')
  }

  return { avvia, ferma, ridimensiona, leggiStato, compra, potenzia, riparti }
}
