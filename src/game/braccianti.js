// L'operaio: quello che il lavoro lo fa davvero.
//
// **E' uno solo, e fa tutto.** Sta fermo finche' non c'e' un lavoro in coda,
// poi ci va, lo fa, e si mette la roba **nello zaino a slot**. Una cosa per
// volta.
//
// Non e' un personaggio da guidare: non ha una levetta, non lo si muove. Gli
// si danno ordini toccando le cose, e ci va lui.
//
// **Quando lo zaino e' pieno si ferma.** Non va a svuotarsi da solo da nessuna
// parte: dove posare la roba lo decidi tu, toccando una cassa. E' la fatica
// che rende il trasporto un problema — e un problema che si sente e' l'unica
// ragione per cui piu' avanti un nastro sara' una liberazione invece che un
// gadget.
//
// **A crescere non e' la squadra, e' la tecnologia.** Con un operaio solo
// l'unico modo di fare di piu' e' migliorare l'ascia, le tasche, gli stivali —
// che e' la forma di Factorio e Satisfactory, dove sei una persona sola e a
// crescere e' la fabbrica.
//
// Il percorso e' una linea dritta. L'isola e' aperta, quindi basta; quando
// arriveranno recinti e capanne servira' un percorso vero (punto 6).

import { trovaRicetta } from './config.js'
import { elencoMateriali } from './config.js'
import {
  braccianti as datiBraccianti,
  operaio as aspettoOperaio,
  risorse,
  tessera
} from './config.js'
import { creaInventario, pilaDi, travasa } from './inventario.js'
import {
  calpestabile,
  centroTessera,
  maturoIn,
  pianta,
  piantabile,
  raccogliRisorsa,
  risorsaIn,
  tesseraAccanto
} from './mondo.js'

// scratch preallocati: dentro il ciclo di gioco non si crea niente
const puntoDiLavoro = { tx: 0, ty: 0 }
const meta = { x: 0, y: 0 }

export function creaBraccianti({ casse, macchine, corrente, progetti, alloScarico, alCambioDelMondo, alFabbricato, alGuadagno }) {
  const squadra = []

  // Quante tasche puo' arrivare ad avere: le caselle si creano tutte all'avvio
  // e restano spente finche' una tecnologia non le apre.
  function slotAdesso() {
    return datiBraccianti.slot + progetti.aggiunta('slot')
  }

  function velocita() {
    return datiBraccianti.velocita * progetti.moltiplicatore('velocita', '')
  }

  function assumi(tx, ty) {
    const posto = { x: 0, y: 0 }
    centroTessera(tx, ty, posto)
    squadra.push({
      nome: aspettoOperaio.nome,
      colore: aspettoOperaio.colore,
      coloreBordo: aspettoOperaio.colore_bordo,
      x: posto.x,
      y: posto.y,
      // 'fermo' | 'va' | 'lavora' | 'pieno' | 'bloccato'
      stato: 'fermo',
      lavoro: null,
      metaX: 0,
      metaY: 0,
      lavoroMs: 0,
      lavoroTotaleMs: 0,
      inventario: creaInventario(datiBraccianti.slot + progetti.aggiuntaMassima('slot'), slotAdesso())
    })
    return squadra[squadra.length - 1]
  }

  function lascia(bracciante) {
    if (bracciante.lavoro) {
      bracciante.lavoro.preso = false
    }
    bracciante.lavoro = null
    bracciante.lavoroMs = 0
    bracciante.stato = 'fermo'
  }

  function vaiVerso(bracciante, tx, ty) {
    centroTessera(tx, ty, meta)
    bracciante.metaX = meta.x
    bracciante.metaY = meta.y
    bracciante.stato = 'va'
  }

  // Quanto ci mette. Si legge quando il lavoro comincia, mai a ogni frame.
  function durataDi(lavoro) {
    if (lavoro.azione === 'raccogli' || lavoro.azione === 'scava') {
      return (
        risorse[lavoro.tipo].tempo_lavoro_ms *
        progetti.moltiplicatore('tempo_lavoro', lavoro.tipo)
      )
    }
    if (lavoro.azione === 'pianta') {
      return datiBraccianti.tempo_piantata_ms
    }
    if (lavoro.azione === 'fabbrica') {
      return trovaRicetta(lavoro.materiale).tempo_ms
    }
    return datiBraccianti.tempo_scambio_ms
  }

  // Puo' farlo adesso? E' l'unico posto dove lo zaino pieno cambia qualcosa:
  // una raccolta che non ci sta non si comincia nemmeno, mentre posare la roba
  // in una cassa resta sempre possibile e passa avanti.
  function puoFare(bracciante, lavoro) {
    if (lavoro.azione === 'scava') {
      const dati = risorse[lavoro.tipo]
      return bracciante.inventario.spazioPer(dati.materiale) >= resaDi(dati)
    }
    if (lavoro.azione === 'raccogli') {
      const rese = risorse[lavoro.tipo].rese
      for (let i = 0; i < rese.length; i++) {
        if (bracciante.inventario.spazioPer(rese[i].materiale) < rese[i].quantita) {
          return false
        }
      }
      return true
    }
    if (lavoro.azione === 'pianta') {
      return bracciante.inventario.quanti(lavoro.materiale) > 0
    }
    if (lavoro.azione === 'fabbrica') {
      return haGliIngredienti(bracciante, trovaRicetta(lavoro.materiale))
    }
    return true
  }

  // Gli ingredienti li deve avere **addosso**: il banco e' li' davanti, e se
  // il legno sta in una cassa lontana lo vai a prendere prima. E' la stessa
  // regola con cui si costruisce, ed e' quella che tiene in piedi il
  // "niente magazzino centrale".
  function haGliIngredienti(bracciante, ricetta) {
    for (let i = 0; i < ricetta.ingredienti.length; i++) {
      const voce = ricetta.ingredienti[i]
      if (bracciante.inventario.quanti(voce.materiale) < voce.quantita) {
        return false
      }
    }
    // E ci deve stare quello che ne esce — **contando le caselle che si
    // liberano togliendo gli ingredienti**: si consuma prima e si produce
    // dopo, quindi guardare lo spazio di adesso direbbe di no anche quando la
    // ricetta funzionerebbe benissimo.
    if (ricetta.produce) {
      let posto = bracciante.inventario.spazioPer(ricetta.produce)
      const pila = pilaDi(ricetta.produce)
      for (let i = 0; i < ricetta.ingredienti.length; i++) {
        const voce = ricetta.ingredienti[i]
        if (voce.materiale === ricetta.produce) {
          continue
        }
        posto += bracciante.inventario.caselleLiberateDa(voce.materiale, voce.quantita) * pila
      }
      if (posto < ricetta.quantita) {
        return false
      }
    }
    return true
  }

  // Il numero che sale sopra la testa. Si prepara la stringa qui, che e' fuori
  // dal disegno: comporla a ogni fotogramma sarebbe un'allocazione nel ciclo.
  function segnaGuadagno(bracciante, materiale, quanti) {
    if (quanti <= 0) {
      return
    }
    const m = elencoMateriali.find((voce) => voce.id === materiale)
    alGuadagno(bracciante.x, bracciante.y, '+' + quanti, m ? m.colore : '')
  }

  // Quanto rende una scavata. La **ricchezza** del giacimento moltiplica la
  // resa: e' quello che rende i posti diversi fra loro, e che fa esistere la
  // decisione "un giacimento ricco lontano o due poveri vicini?".
  function resaDi(dati) {
    return Math.max(1, Math.round(dati.resa * dati.ricchezza))
  }

  // Il lavoro e' finito: succede la cosa. Si ricontrolla tutto, perche' fra
  // l'ordine e adesso il mondo puo' essere cambiato.
  function concludi(bracciante, lavoro) {
    if (lavoro.azione === 'scava') {
      if (risorsaIn(lavoro.tx, lavoro.ty) !== lavoro.tipo) {
        return
      }
      const dati = risorse[lavoro.tipo]
      const presi = bracciante.inventario.metti(dati.materiale, resaDi(dati))
      segnaGuadagno(bracciante, dati.materiale, presi)
      alCambioDelMondo()
      return
    }
    if (lavoro.azione === 'raccogli') {
      if (risorsaIn(lavoro.tx, lavoro.ty) !== lavoro.tipo || !maturoIn(lavoro.tx, lavoro.ty)) {
        return
      }
      const rese = risorse[lavoro.tipo].rese
      raccogliRisorsa(lavoro.tx, lavoro.ty)
      for (let i = 0; i < rese.length; i++) {
        const presi = bracciante.inventario.metti(rese[i].materiale, rese[i].quantita)
        if (i === 0) {
          segnaGuadagno(bracciante, rese[i].materiale, presi)
        }
      }
      alCambioDelMondo()
      return
    }

    if (lavoro.azione === 'pianta') {
      if (!piantabile(lavoro.tx, lavoro.ty)) {
        return
      }
      if (bracciante.inventario.togli(lavoro.materiale, 1) <= 0) {
        return
      }
      pianta(lavoro.tx, lavoro.ty, lavoro.tipo, progetti.moltiplicatore('crescita', lavoro.tipo))
      alCambioDelMondo()
      return
    }

    if (lavoro.azione === 'fabbrica') {
      const ricetta = trovaRicetta(lavoro.materiale)
      // si ricontrolla: fra l'ordine e adesso puo' aver posato tutto in una
      // cassa, e fabbricare dal nulla sarebbe un buco
      if (!haGliIngredienti(bracciante, ricetta)) {
        return
      }
      for (let i = 0; i < ricetta.ingredienti.length; i++) {
        bracciante.inventario.togli(ricetta.ingredienti[i].materiale, ricetta.ingredienti[i].quantita)
      }
      if (ricetta.produce) {
        const fatti = bracciante.inventario.metti(ricetta.produce, ricetta.quantita)
        segnaGuadagno(bracciante, ricetta.produce, fatti)
      }
      // un attrezzo non finisce nello zaino: si accende e resta acceso
      if (ricetta.attrezzo) {
        alFabbricato(ricetta.attrezzo)
      }
      alCambioDelMondo()
      return
    }

    const cassa = casse.in(lavoro.tx, lavoro.ty)
    if (cassa) {
      if (lavoro.azione === 'deposita') {
        travasa(bracciante.inventario, cassa.inventario, lavoro.materiale)
      } else {
        travasa(cassa.inventario, bracciante.inventario, lavoro.materiale)
      }
      alloScarico(cassa)
      return
    }

    // Una macchina si carica e si svuota **con lo stesso gesto di una cassa**,
    // ma ha due cassetti: si POSA in entrata e si PRENDE dall'uscita. Non e'
    // una scelta da fare ogni volta, e' il verso naturale della macchina —
    // nessuno vuole rimettere le tavole dentro la segheria.
    const macchina = macchine && macchine.in(lavoro.tx, lavoro.ty)
    if (!macchina) {
      // **Il generatore si riempie con lo stesso viaggio di una cassa.** Ed e'
      // il viaggio che tiene scarsa la risorsa scarsa: la corrente toglie
      // tocchi al giocatore, non tempo all'operaio. Piu' fabbrica hai, piu'
      // spesso lo mandi qui.
      const generatore = corrente && corrente.generatoreIn(lavoro.tx, lavoro.ty)
      if (!generatore) {
        return
      }
      if (lavoro.azione === 'deposita') {
        travasa(bracciante.inventario, generatore.inventario, generatore.combustibile)
      } else {
        travasa(generatore.inventario, bracciante.inventario, generatore.combustibile)
      }
      alCambioDelMondo()
      return
    }
    if (lavoro.azione === 'deposita') {
      // **Una macchina prende solo quello che sa usare.** Senza questo,
      // "Posa tutto" le infila dentro tavole e chiodi che non c'entrano
      // niente, il cassetto d'entrata si intasa di roba inutile e la macchina
      // si ferma per un motivo che il giocatore non puo' indovinare.
      const ricetta = trovaRicetta(macchina.ricetta)
      for (let i = 0; i < ricetta.ingredienti.length; i++) {
        const quale = ricetta.ingredienti[i].materiale
        if (!lavoro.materiale || lavoro.materiale === quale) {
          travasa(bracciante.inventario, macchina.entrata, quale)
        }
      }
      if (!ricetta.ingredienti.some((ing) => ing.materiale === macchina.combustibile)) {
        if (!lavoro.materiale || lavoro.materiale === macchina.combustibile) {
          travasa(bracciante.inventario, macchina.entrata, macchina.combustibile)
        }
      }
    } else {
      travasa(macchina.uscita, bracciante.inventario, lavoro.materiale)
    }
    alCambioDelMondo()
  }

  function aggiorna(lavori, passoMs, passoSecondi) {
    for (let i = 0; i < squadra.length; i++) {
      const bracciante = squadra[i]
      // un attrezzo nuovo puo' aver aperto altre tasche mentre era per strada
      bracciante.inventario.apri(slotAdesso())

      if (bracciante.stato === 'fermo' || bracciante.stato === 'pieno' || bracciante.stato === 'bloccato') {
        const lavoro = lavori.prossimo((voce) => puoFare(bracciante, voce))
        if (!lavoro) {
          // Fermo con degli ordini in coda vuol dire che non ne puo' fare
          // **nessuno**, e il perche' si deve poter leggere: un operaio che si
          // pianta senza spiegazione sembra un guasto, non una regola.
          //
          // Quasi sempre e' lo zaino: nessuna casella libera, e quindi niente
          // di nuovo ci puo' entrare. Se invece le caselle ci sono, gli manca
          // qualcos'altro — un alberello da mettere a dimora, per esempio.
          if (lavori.quantiInAttesa() > 0) {
            bracciante.stato = bracciante.inventario.caselleLibere() === 0 ? 'pieno' : 'bloccato'
          } else {
            bracciante.stato = 'fermo'
          }
          continue
        }
        // ci si mette **di fianco**: un albero non e' calpestabile
        if (!tesseraAccanto(lavoro.tx, lavoro.ty, puntoDiLavoro)) {
          // irraggiungibile: si lascia perdere invece di restare impalati
          lavoro.attivo = false
          continue
        }
        lavoro.preso = true
        bracciante.lavoro = lavoro
        vaiVerso(bracciante, puntoDiLavoro.tx, puntoDiLavoro.ty)
        continue
      }

      // l'ordine puo' essere stato disdetto mentre era per strada
      if (bracciante.stato === 'va' && bracciante.lavoro && !bracciante.lavoro.attivo) {
        lascia(bracciante)
        continue
      }

      if (bracciante.stato === 'va') {
        const dx = bracciante.metaX - bracciante.x
        const dy = bracciante.metaY - bracciante.y
        const distanza = Math.sqrt(dx * dx + dy * dy)

        if (distanza <= datiBraccianti.distanza_arrivo) {
          bracciante.stato = 'lavora'
          bracciante.lavoroMs = 0
          bracciante.lavoroTotaleMs = durataDi(bracciante.lavoro)
          continue
        }

        const passo = velocita() * passoSecondi
        bracciante.x += (dx / distanza) * passo
        bracciante.y += (dy / distanza) * passo
        continue
      }

      // l'ordine puo' essere disdetto anche mentre ci sta lavorando sopra: con
      // uno scavo che si ripete e' l'unico modo per fermarlo
      if (bracciante.lavoro && !bracciante.lavoro.attivo) {
        lascia(bracciante)
        continue
      }

      // sta lavorando
      bracciante.lavoroMs += passoMs
      if (bracciante.lavoroMs < bracciante.lavoroTotaleMs) {
        continue
      }

      const lavoro = bracciante.lavoro
      concludi(bracciante, lavoro)

      // Un lavoro ripetuto non finisce: e' gia' li', ricomincia senza
      // rifare la strada. Si ferma solo quando non ci sta piu' niente nello
      // zaino — oppure quando tocchi di nuovo per disdire.
      if (lavoro.ripetuto && lavoro.attivo && puoFare(bracciante, lavoro)) {
        bracciante.lavoroMs = 0
        bracciante.lavoroTotaleMs = durataDi(lavoro)
        continue
      }

      lavoro.attivo = false
      lascia(bracciante)
    }
  }

  function quantiFermi() {
    let quanti = 0
    for (let i = 0; i < squadra.length; i++) {
      const stato = squadra[i].stato
      if (stato === 'fermo' || stato === 'pieno' || stato === 'bloccato') {
        quanti++
      }
    }
    return quanti
  }

  function reimposta() {
    squadra.length = 0
    for (let i = 0; i < datiBraccianti.iniziali.length; i++) {
      const voce = datiBraccianti.iniziali[i]
      let tx = voce.tessera[0]
      let ty = voce.tessera[1]
      if (!calpestabile(tx, ty)) {
        const accanto = { tx: 0, ty: 0 }
        if (tesseraAccanto(tx, ty, accanto)) {
          tx = accanto.tx
          ty = accanto.ty
        }
      }
      assumi(tx, ty)
    }
  }

  // --- salvataggio ---
  // Dove si trova e cosa ha addosso. **Non si salva il lavoro in corso**: al
  // rientro riparte fermo e ripesca dalla coda, che e' salvata a parte. Uno
  // stato a meta' di una camminata e' l'unica cosa che puo' tornare incoerente.
  function perSalvare() {
    return squadra.map((b) => ({
      x: Math.round(b.x),
      y: Math.round(b.y),
      zaino: b.inventario.perSalvare()
    }))
  }

  function daSalvato(dati) {
    if (!Array.isArray(dati)) {
      return
    }
    for (let i = 0; i < squadra.length && i < dati.length; i++) {
      const b = squadra[i]
      b.x = dati[i].x
      b.y = dati[i].y
      b.stato = 'fermo'
      b.lavoro = null
      b.lavoroMs = 0
      b.inventario.apri(slotAdesso())
      b.inventario.daSalvato(dati[i].zaino)
    }
  }

  reimposta()

  return { squadra, assumi, aggiorna, quantiFermi, slotAdesso, perSalvare, daSalvato, reimposta }
}
