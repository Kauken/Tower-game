// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
// Le azioni dell'interfaccia entrano da una coda di comandi; la levetta no,
// perche' e' uno stato continuo e in coda si perderebbero valori.

import { area, arena, grafica, limiti, simulazione } from './config.js'
import { disegnaSfondo } from './sfondo.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaGestoreNemici } from './nemici.js'
import { creaGestoreStanza } from './stanza.js'
import { creaGestoreProiettili } from './proiettili.js'
import { creaGestoreColpiNemici } from './colpiNemici.js'
import { creaGestoreEffetti } from './effetti.js'
import { creaPersonaggio } from './personaggio.js'
import { creaStatoPartita, prossimaStanza, reimposta } from './partita.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const passoSecondi = simulazione.passo_ms / 1000
  const accumuloMassimo = simulazione.passi_massimi_per_frame * simulazione.passo_ms

  const partita = creaStatoPartita()
  const effetti = creaGestoreEffetti()

  const colpiNemici = creaGestoreColpiNemici({
    colpisciGiocatore: (danno) => personaggio.colpisci(danno),
    allImpatto: (x, y) => effetti.impatto(x, y)
  })

  const nemici = creaGestoreNemici({
    allaMorte: (x, y) => effetti.morte(x, y),
    colpisciGiocatore: (danno) => personaggio.colpisci(danno),
    sparaColpo: (x, y, versoX, versoY, velocita, danno) =>
      colpiNemici.spara(x, y, versoX, versoY, velocita, danno)
  })

  const proiettili = creaGestoreProiettili(nemici, effetti)
  const personaggio = creaPersonaggio(nemici, proiettili, {
    allaMorte: (x, y) => {
      effetti.morte(x, y)
      partita.fase = 'sconfitta'
    }
  })
  const stanza = creaGestoreStanza(nemici, effetti)

  const comandi = creaPool(limiti.comandi_massimi, () => ({ attivo: false, tipo: '' }))

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    vita: 0,
    vitaMassima: 0,
    nemici: 0,
    stanza: 0,
    fase: 'combattimento'
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
    nemici.svuota()
    proiettili.svuota()
    colpiNemici.svuota()
    effetti.svuota()
    stanza.svuota()
    personaggio.reimposta()
    reimposta(partita)
    stanza.apri(partita.stanza)
  }

  function avanti() {
    if (partita.fase !== 'pulita') {
      return
    }
    proiettili.svuota()
    colpiNemici.svuota()
    prossimaStanza(partita)
    stanza.apri(partita.stanza)
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
      } else if (comando.tipo === 'avanti') {
        avanti()
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

    if (partita.fase === 'combattimento' && stanza.aggiorna(simulazione.passo_ms)) {
      partita.fase = 'pulita'
    }

    nemici.aggiorna(simulazione.passo_ms, passoSecondi)
    personaggio.aggiorna(simulazione.passo_ms, passoSecondi)
    proiettili.aggiorna(passoSecondi)
    colpiNemici.aggiorna(passoSecondi, personaggio.stato)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)

    // niente esce mai dalla stanza: senza questo il cerchio della portata e
    // gli effetti sui bordi sbordano sui muri e il campo sembra rotto
    ctxGioco.save()
    ctxGioco.beginPath()
    ctxGioco.rect(
      arena.sinistra,
      arena.alto,
      arena.destra - arena.sinistra,
      arena.basso - arena.alto
    )
    ctxGioco.clip()

    nemici.disegna(ctxGioco)
    // il personaggio sopra i nemici: non deve mai sparire nella mischia
    personaggio.disegna(ctxGioco)
    proiettili.disegna(ctxGioco)
    colpiNemici.disegna(ctxGioco)
    // gli effetti sopra tutto: sono brevi e non coprono niente a lungo
    effetti.disegna(ctxGioco)

    ctxGioco.restore()
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
    stanza.apri(partita.stanza)
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
    vetrina.nemici = nemici.quantiVivi()
    vetrina.stanza = partita.stanza
    vetrina.fase = partita.fase
    return vetrina
  }

  // La levetta scrive direttamente: e' uno stato continuo, non un'azione.
  function muovi(x, y, intensita) {
    personaggio.muovi(x, y, intensita)
  }

  function prosegui() {
    accodaComando('avanti')
  }

  function riparti() {
    accodaComando('ricomincia')
  }

  // i nemici inseguono il personaggio: glielo si presenta qui, perche' a sua
  // volta il personaggio ha bisogno di poter cercare i nemici
  nemici.impostaGiocatore(personaggio.stato)

  return { avvia, ferma, ridimensiona, leggiStato, muovi, prosegui, riparti }
}
