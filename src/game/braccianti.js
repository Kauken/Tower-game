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

import {
  braccianti as datiBraccianti,
  operaio as aspettoOperaio,
  risorse,
  tessera
} from './config.js'
import { creaInventario, travasa } from './inventario.js'
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

export function creaBraccianti({ casse, tecnologie, alloScarico, alCambioDelMondo }) {
  const squadra = []

  // Quante tasche puo' arrivare ad avere: le caselle si creano tutte all'avvio
  // e restano spente finche' una tecnologia non le apre.
  function slotAdesso() {
    return datiBraccianti.slot + tecnologie.aggiunta('slot')
  }

  function velocita() {
    return datiBraccianti.velocita * tecnologie.moltiplicatore('velocita', '')
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
      inventario: creaInventario(datiBraccianti.slot + tecnologie.aggiuntaMassima('slot'), slotAdesso())
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
    if (lavoro.azione === 'raccogli') {
      return (
        risorse[lavoro.tipo].tempo_lavoro_ms *
        tecnologie.moltiplicatore('tempo_lavoro', lavoro.tipo)
      )
    }
    if (lavoro.azione === 'pianta') {
      return datiBraccianti.tempo_piantata_ms
    }
    return datiBraccianti.tempo_scambio_ms
  }

  // Puo' farlo adesso? E' l'unico posto dove lo zaino pieno cambia qualcosa:
  // una raccolta che non ci sta non si comincia nemmeno, mentre posare la roba
  // in una cassa resta sempre possibile e passa avanti.
  function puoFare(bracciante, lavoro) {
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
    return true
  }

  // Il lavoro e' finito: succede la cosa. Si ricontrolla tutto, perche' fra
  // l'ordine e adesso il mondo puo' essere cambiato.
  function concludi(bracciante, lavoro) {
    if (lavoro.azione === 'raccogli') {
      if (risorsaIn(lavoro.tx, lavoro.ty) !== lavoro.tipo || !maturoIn(lavoro.tx, lavoro.ty)) {
        return
      }
      const rese = risorse[lavoro.tipo].rese
      raccogliRisorsa(lavoro.tx, lavoro.ty)
      for (let i = 0; i < rese.length; i++) {
        bracciante.inventario.metti(rese[i].materiale, rese[i].quantita)
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
      pianta(lavoro.tx, lavoro.ty, lavoro.tipo, tecnologie.moltiplicatore('crescita', lavoro.tipo))
      alCambioDelMondo()
      return
    }

    const cassa = casse.in(lavoro.tx, lavoro.ty)
    if (!cassa) {
      return
    }
    if (lavoro.azione === 'deposita') {
      travasa(bracciante.inventario, cassa.inventario, lavoro.materiale)
    } else {
      travasa(cassa.inventario, bracciante.inventario, lavoro.materiale)
    }
    alloScarico(cassa)
  }

  function aggiorna(lavori, passoMs, passoSecondi) {
    for (let i = 0; i < squadra.length; i++) {
      const bracciante = squadra[i]
      // le tecnologie possono aver aperto altre tasche mentre era per strada
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

      // sta lavorando
      bracciante.lavoroMs += passoMs
      if (bracciante.lavoroMs < bracciante.lavoroTotaleMs) {
        continue
      }

      const lavoro = bracciante.lavoro
      concludi(bracciante, lavoro)
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
