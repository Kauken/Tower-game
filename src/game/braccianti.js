// L'operaio: quello che il lavoro lo fa davvero.
//
// **E' uno solo, e fa tutto.** Sta fermo finche' non c'e' un lavoro in coda,
// poi ci va, lo fa, si mette la roba nello zaino, e quando lo zaino e' pieno
// la porta alla cassa che gli hai detto tu. Una cosa per volta.
//
// Non e' un personaggio da guidare: non ha una levetta, non lo si muove. Gli
// si danno ordini toccando le cose, e ci va lui.
//
// **A crescere non e' la squadra, e' la tecnologia.** Con un operaio solo
// l'unico modo di fare di piu' e' migliorare l'ascia, lo zaino, gli stivali —
// che e' la forma di Factorio e Satisfactory, dove sei una persona sola e a
// crescere e' la fabbrica.
//
// **Non esiste un magazzino centrale**: la roba non compare da nessuna parte,
// va portata. Quella camminata e' il costo che rende utile mettere una cassa
// vicino al lavoro — e piu' avanti e' la ragione per cui i nastri serviranno.
//
// Il percorso e' una linea dritta. L'isola e' aperta, quindi basta; quando
// arriveranno recinti e capanne servira' un percorso vero (punto 11).

import {
  braccianti as datiBraccianti,
  elencoMateriali,
  operaio as aspettoOperaio,
  risorse,
  tessera
} from './config.js'
import {
  calpestabile,
  centroTessera,
  maturoIn,
  raccogliRisorsa,
  risorsaIn,
  tesseraAccanto
} from './mondo.js'

// scratch preallocati: dentro il ciclo di gioco non si crea niente
const puntoDiLavoro = { tx: 0, ty: 0 }
const meta = { x: 0, y: 0 }

export function creaBraccianti({ casse, tecnologie, alloScarico, alCambioDelMondo, alRaccolto }) {
  const squadra = []

  function zainoVuoto() {
    const zaino = {}
    for (let i = 0; i < elencoMateriali.length; i++) {
      zaino[elencoMateriali[i].id] = 0
    }
    return zaino
  }

  // Quanto porta adesso: le tecnologie lo cambiano, quindi si chiede invece
  // di ricordarselo.
  function capienzaZaino() {
    return Math.round(datiBraccianti.zaino * tecnologie.moltiplicatore('zaino', ''))
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
      // 'fermo' | 'va' | 'lavora' | 'porta' | 'bloccato'
      stato: 'fermo',
      lavoro: null,
      metaX: 0,
      metaY: 0,
      lavoroMs: 0,
      lavoroTotaleMs: 0,
      // lo zaino, e dove lo svuota
      zaino: zainoVuoto(),
      carico: 0,
      scaricaA: null
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

  function vaiVerso(bracciante, tx, ty, stato) {
    centroTessera(tx, ty, meta)
    bracciante.metaX = meta.x
    bracciante.metaY = meta.y
    bracciante.stato = stato
  }

  // Va a svuotare lo zaino. Se la cassa che gli hai assegnato e' piena ripiega
  // sulla piu' vicina con spazio: restare impalati con lo zaino pieno
  // sembrerebbe un guasto, non una regola.
  function vaiAScaricare(bracciante) {
    let dove = bracciante.scaricaA
    if (!dove || casse.spazioIn(dove) <= 0) {
      dove = casse.piuVicinaConSpazio(
        Math.floor(bracciante.x / tessera),
        Math.floor(bracciante.y / tessera)
      )
    }
    if (!dove) {
      bracciante.stato = 'bloccato'
      return
    }
    if (!tesseraAccanto(dove.tx, dove.ty, puntoDiLavoro)) {
      bracciante.stato = 'bloccato'
      return
    }
    bracciante.metaCassa = dove
    vaiVerso(bracciante, puntoDiLavoro.tx, puntoDiLavoro.ty, 'porta')
  }

  function scarica(bracciante) {
    const cassa = bracciante.metaCassa
    if (!cassa) {
      bracciante.stato = 'fermo'
      return
    }
    for (let i = 0; i < elencoMateriali.length; i++) {
      const id = elencoMateriali[i].id
      if (bracciante.zaino[id] <= 0) {
        continue
      }
      const entrato = casse.metti(cassa, id, bracciante.zaino[id])
      bracciante.zaino[id] -= entrato
      bracciante.carico -= entrato
    }
    alloScarico(cassa)
    bracciante.metaCassa = null
    bracciante.stato = 'fermo'
  }

  function aggiorna(lavori, passoMs, passoSecondi) {
    for (let i = 0; i < squadra.length; i++) {
      const bracciante = squadra[i]

      if (bracciante.stato === 'bloccato') {
        // riprova appena si libera dello spazio da qualche parte
        if (casse.piuVicinaConSpazio(0, 0)) {
          bracciante.stato = 'fermo'
        }
        continue
      }

      if (bracciante.stato === 'fermo') {
        // prima si svuota lo zaino, poi si prende altro lavoro: uno zaino
        // pieno non puo' ricevere niente
        if (bracciante.carico >= capienzaZaino()) {
          vaiAScaricare(bracciante)
          continue
        }
        const lavoro = lavori.prossimo()
        if (!lavoro) {
          // niente da fare: se ha ancora roba addosso la porta via
          if (bracciante.carico > 0) {
            vaiAScaricare(bracciante)
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
        vaiVerso(bracciante, puntoDiLavoro.tx, puntoDiLavoro.ty, 'va')
        continue
      }

      // l'ordine puo' essere stato disdetto mentre era per strada
      if (bracciante.stato === 'va' && bracciante.lavoro && !bracciante.lavoro.attivo) {
        lascia(bracciante)
        continue
      }

      if (bracciante.stato === 'va' || bracciante.stato === 'porta') {
        const dx = bracciante.metaX - bracciante.x
        const dy = bracciante.metaY - bracciante.y
        const distanza = Math.sqrt(dx * dx + dy * dy)

        if (distanza <= datiBraccianti.distanza_arrivo) {
          if (bracciante.stato === 'porta') {
            scarica(bracciante)
          } else {
            bracciante.stato = 'lavora'
            bracciante.lavoroMs = 0
            // le tecnologie accorciano il lavoro: si legge quando comincia,
            // mai a ogni frame
            bracciante.lavoroTotaleMs =
              risorse[bracciante.lavoro.tipo].tempo_lavoro_ms *
              tecnologie.moltiplicatore('tempo_lavoro', bracciante.lavoro.tipo)
          }
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
      // qualcun altro potrebbe averla gia' tolta: si controlla prima di dare
      // la resa, altrimenti un albero varrebbe due volte
      if (risorsaIn(lavoro.tx, lavoro.ty) === lavoro.tipo && maturoIn(lavoro.tx, lavoro.ty)) {
        const resa = risorse[lavoro.tipo].resa
        raccogliRisorsa(lavoro.tx, lavoro.ty)
        // la roba va nello zaino, non in un magazzino: qualcuno la deve portare
        bracciante.zaino[resa.materiale] += resa.quantita
        bracciante.carico += resa.quantita
        alRaccolto(resa.quantita)
        alCambioDelMondo()
      }
      lavoro.attivo = false
      lascia(bracciante)
    }
  }

  function quantiFermi() {
    let quanti = 0
    for (let i = 0; i < squadra.length; i++) {
      if (squadra[i].stato === 'fermo') {
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
    // all'avvio scaricano tutti al casotto: senza una destinazione il primo
    // bracciante sembrerebbe rotto
    const casotto = casse.elenco.find((cassa) => cassa.eIlCasotto) || casse.elenco[0]
    for (let i = 0; i < squadra.length; i++) {
      squadra[i].scaricaA = casotto || null
    }
  }

  reimposta()

  return { squadra, assumi, aggiorna, quantiFermi, capienzaZaino, reimposta }
}
