// I braccianti: quelli che il lavoro lo fanno davvero.
//
// Ognuno fa **un mestiere solo**. Sta fermo finche' non c'e' in coda un lavoro
// che sa fare, poi ci va, lo fa, e torna fermo.
//
// Il percorso e' una linea dritta verso la tessera libera accanto al bersaglio.
// L'isola e' aperta, quindi basta; quando arriveranno recinti e capanne servira'
// un percorso vero, ed e' segnato nella roadmap.

import { braccianti as datiBraccianti, risorse, trovaMestiere } from './config.js'
import {
  calpestabile,
  centroTessera,
  risorsaIn,
  tesseraAccanto,
  togliRisorsa
} from './mondo.js'

// scratch preallocati: dentro il ciclo di gioco non si crea niente
const puntoDiLavoro = { tx: 0, ty: 0 }
const meta = { x: 0, y: 0 }

export function creaBraccianti({ allaResa, alCambioDelMondo }) {
  const squadra = []

  function assumi(idMestiere, tx, ty) {
    const mestiere = trovaMestiere(idMestiere)
    const posto = { x: 0, y: 0 }
    centroTessera(tx, ty, posto)
    squadra.push({
      mestiere: idMestiere,
      nome: mestiere.nome,
      colore: mestiere.colore,
      coloreBordo: mestiere.colore_bordo,
      x: posto.x,
      y: posto.y,
      // 'fermo' | 'va' | 'lavora'
      stato: 'fermo',
      lavoro: null,
      metaX: 0,
      metaY: 0,
      lavoroMs: 0,
      lavoroTotaleMs: 0
    })
  }

  function lascia(bracciante) {
    if (bracciante.lavoro) {
      bracciante.lavoro.preso = false
    }
    bracciante.lavoro = null
    bracciante.stato = 'fermo'
    bracciante.lavoroMs = 0
  }

  function aggiorna(lavori, passoMs, passoSecondi) {
    for (let i = 0; i < squadra.length; i++) {
      const bracciante = squadra[i]

      if (bracciante.stato === 'fermo') {
        const lavoro = lavori.prossimoPer(bracciante.mestiere)
        if (!lavoro) {
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
        centroTessera(puntoDiLavoro.tx, puntoDiLavoro.ty, meta)
        bracciante.metaX = meta.x
        bracciante.metaY = meta.y
        bracciante.stato = 'va'
        continue
      }

      // l'ordine puo' essere stato disdetto mentre era per strada
      if (bracciante.lavoro && !bracciante.lavoro.attivo) {
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
          bracciante.lavoroTotaleMs = risorse[bracciante.lavoro.tipo].tempo_lavoro_ms
          continue
        }

        const passo = datiBraccianti.velocita * passoSecondi
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
      if (risorsaIn(lavoro.tx, lavoro.ty) === lavoro.tipo) {
        const resa = risorse[lavoro.tipo].resa
        togliRisorsa(lavoro.tx, lavoro.ty)
        allaResa(resa.materiale, resa.quantita, lavoro.tx, lavoro.ty)
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
      assumi(voce.mestiere, tx, ty)
    }
  }

  reimposta()

  return { squadra, assumi, aggiorna, quantiFermi, reimposta }
}
