// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Le azioni dell'interfaccia (tocca, pianta, dissoda, compra, vendi) entrano
// da una coda di comandi e vengono eseguite dentro un passo di simulazione:
// cosi' due tocchi ravvicinati non possono spendere due volte le stesse monete.

import { area, limiti, simulazione, tempo, trovaContenuto } from './config.js'
import { disegnaSfondo } from './sfondo.js'
import { disegnaFattoria } from './disegno.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaFattoria } from './fattoria.js'
import { creaEconomia } from './economia.js'
import { creaGiorno } from './giorno.js'
import { creaGestoreEffetti } from './effetti.js'
import { casellaSotto, centroX, centroY } from './griglia.js'

export function creaMotore(canvasSfondo, canvasGioco) {
  const effetti = creaGestoreEffetti()
  const economia = creaEconomia()

  // il campo e' cambiato forma: lo sfondo va rifatto, ma solo allora
  let sfondoDaRifare = true

  const fattoria = creaFattoria({
    allaRaccolta: (indice) => {
      effetti.raccolta(centroX(indice), centroY(indice))
      giorno.segnaRaccolto()
    },
    alCambioDelCampo: () => {
      sfondoDaRifare = true
    }
  })

  const giorno = creaGiorno(economia, fattoria, {
    allAlba: () => {}
  })

  economia.reimposta(fattoria.caselleArate())

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    indice: -1,
    id: ''
  }))

  let selezionata = -1

  // Oggetto unico riletto dall'interfaccia 10 volte al secondo: viene
  // aggiornato sul posto, non ricreato.
  const vetrina = {
    monete: 0,
    giorno: 1,
    oraDelGiorno: 0,
    spesaGiornaliera: 0,
    costoDissodare: 0,
    selezionata: -1,
    // 'incolto' | 'vuota' | 'coltura' | 'matura' | 'terreno'
    statoSelezionata: '',
    contenutoSelezionato: '',
    selezionataIrrigata: false,
    // stringhe, non oggetti: l'interfaccia le confronta per capire se sono
    // cambiate, e confrontare un oggetto a ogni lettura costerebbe di piu'
    magazzino: '',
    semi: '',
    prezzi: '',
    valoreMagazzino: 0,
    mostraRiepilogo: false,
    riepilogo: ''
  }

  let ctxSfondo = null
  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  function accodaComando(tipo, indice, id) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.indice = indice === undefined ? -1 : indice
    comando.id = id || ''
  }

  // Toccare una casella fa la cosa ovvia: se c'e' da raccogliere raccoglie,
  // altrimenti seleziona. Un tocco che non fa niente sembra un guasto.
  function tocca(indice) {
    if (indice < 0) {
      selezionata = -1
      return
    }
    if (fattoria.caselle[indice].matura) {
      fattoria.raccogli(indice)
      selezionata = -1
      return
    }
    selezionata = selezionata === indice ? -1 : indice
  }

  function pianta(indice, idContenuto) {
    if (fattoria.piazza(indice, idContenuto)) {
      selezionata = -1
    }
  }

  function dissoda(indice) {
    if (indice < 0 || fattoria.caselle[indice].arata) {
      return
    }
    const costo = economia.stato.costoDissodare
    if (!economia.dissoda(fattoria.caselleArate() + 1)) {
      return
    }
    giorno.segnaSpesa(costo)
    fattoria.dissoda(indice)
    economia.ricalcola(fattoria.caselleArate())
    selezionata = -1
  }

  function compraSeme(idContenuto) {
    const dati = trovaContenuto(idContenuto)
    if (!economia.paga(dati.costo_seme)) {
      return
    }
    giorno.segnaSpesa(dati.costo_seme)
    fattoria.aggiungiSeme(idContenuto, 1)
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false
      if (comando.tipo === 'tocca') {
        tocca(comando.indice)
      } else if (comando.tipo === 'pianta') {
        pianta(comando.indice, comando.id)
      } else if (comando.tipo === 'dissoda') {
        dissoda(comando.indice)
      } else if (comando.tipo === 'estirpa') {
        fattoria.rimuovi(comando.indice)
        selezionata = -1
      } else if (comando.tipo === 'compra') {
        compraSeme(comando.id)
      } else if (comando.tipo === 'vendi') {
        giorno.segnaIncasso(economia.vendi(fattoria.magazzino, comando.id))
      } else if (comando.tipo === 'vendi_tutto') {
        giorno.segnaIncasso(economia.vendiTutto(fattoria.magazzino))
      } else if (comando.tipo === 'chiudi') {
        selezionata = -1
      } else if (comando.tipo === 'chiudi_riepilogo') {
        giorno.chiudiRiepilogo()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxSfondo = adattaCanvas(canvasSfondo, area, larghezzaDisponibile, altezzaDisponibile)
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
    sfondoDaRifare = true
  }

  function aggiorna() {
    eseguiComandi()
    fattoria.aggiorna(simulazione.passo_ms)
    giorno.aggiorna(simulazione.passo_ms)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    // lo sfondo si rifa' solo quando il campo cambia forma: dissodare succede
    // poche volte in una partita, ridisegnarlo a ogni frame sarebbe uno spreco
    if (sfondoDaRifare && ctxSfondo) {
      disegnaSfondo(ctxSfondo, fattoria.caselle)
      sfondoDaRifare = false
    }
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaFattoria(ctxGioco, fattoria.caselle, selezionata)
    effetti.disegna(ctxGioco)
  }

  function frame(istante) {
    richiesta = requestAnimationFrame(frame)

    accumulato += istante - ultimoTempo
    ultimoTempo = istante
    // evita la spirale della morte quando l'app torna in primo piano
    const tetto = simulazione.passi_massimi_per_frame * simulazione.passo_ms
    if (accumulato > tetto) {
      accumulato = tetto
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

  function statoDi(indice) {
    const casella = fattoria.caselle[indice]
    if (!casella.arata) {
      return 'incolto'
    }
    if (!casella.contenuto) {
      return 'vuota'
    }
    if (casella.matura) {
      return 'matura'
    }
    return casella.famiglia === 'coltura' ? 'coltura' : 'terreno'
  }

  function leggiStato() {
    vetrina.monete = Math.floor(economia.stato.monete)
    vetrina.giorno = giorno.stato.giorno
    vetrina.oraDelGiorno = giorno.stato.trascorsoMs / tempo.giorno_ms
    vetrina.spesaGiornaliera = economia.stato.spesaGiornaliera
    vetrina.costoDissodare = economia.stato.costoDissodare

    vetrina.selezionata = selezionata
    vetrina.statoSelezionata = selezionata >= 0 ? statoDi(selezionata) : ''
    vetrina.contenutoSelezionato =
      selezionata >= 0 ? fattoria.caselle[selezionata].contenuto : ''
    vetrina.selezionataIrrigata =
      selezionata >= 0 ? fattoria.caselle[selezionata].irrigata : false

    let riga = ''
    for (const materiale in fattoria.magazzino) {
      riga += (riga ? ',' : '') + materiale + ':' + fattoria.magazzino[materiale]
    }
    vetrina.magazzino = riga

    let semi = ''
    for (const id in fattoria.semi) {
      semi += (semi ? ',' : '') + id + ':' + fattoria.semi[id]
    }
    vetrina.semi = semi

    let prezzi = ''
    for (const materiale in fattoria.magazzino) {
      prezzi += (prezzi ? ',' : '') + materiale + ':' + economia.prezzo(materiale)
    }
    vetrina.prezzi = prezzi
    vetrina.valoreMagazzino = economia.valoreDi(fattoria.magazzino)

    vetrina.mostraRiepilogo = giorno.stato.mostraRiepilogo
    vetrina.riepilogo = giorno.stato.mostraRiepilogo
      ? giorno.riepilogo.giorno +
        ',' +
        giorno.riepilogo.incassato +
        ',' +
        giorno.riepilogo.speso +
        ',' +
        giorno.riepilogo.raccolti +
        ',' +
        giorno.riepilogo.abbandonate
      : ''

    return vetrina
  }

  function toccaPunto(xLogica, yLogica) {
    accodaComando('tocca', casellaSotto(xLogica, yLogica))
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    toccaPunto,
    pianta: (indice, id) => accodaComando('pianta', indice, id),
    dissoda: (indice) => accodaComando('dissoda', indice),
    estirpa: (indice) => accodaComando('estirpa', indice),
    compra: (id) => accodaComando('compra', undefined, id),
    vendi: (id) => accodaComando('vendi', undefined, id),
    vendiTutto: () => accodaComando('vendi_tutto'),
    chiudi: () => accodaComando('chiudi'),
    chiudiRiepilogo: () => accodaComando('chiudi_riepilogo')
  }
}
