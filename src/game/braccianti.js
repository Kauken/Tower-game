// I braccianti: quelli che il lavoro lo fanno davvero.
//
// Ognuno fa **un mestiere solo**. Sta fermo finche' non c'e' in coda un lavoro
// che sa fare, poi ci va, lo fa, si mette la roba nello zaino, e quando lo
// zaino e' pieno la porta alla cassa che gli hai detto tu.
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
  risorse,
  tessera,
  trovaMestiere
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

export function creaBraccianti({ casse, alloScarico, alCambioDelMondo, alRaccolto }) {
  const squadra = []

  function zainoVuoto() {
    const zaino = {}
    for (let i = 0; i < elencoMateriali.length; i++) {
      zaino[elencoMateriali[i].id] = 0
    }
    return zaino
  }

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
      scaricaA: null,
      salario: mestiere.salario
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
        if (bracciante.carico >= datiBraccianti.zaino) {
          vaiAScaricare(bracciante)
          continue
        }
        const lavoro = lavori.prossimoPer(bracciante.mestiere)
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
            bracciante.lavoroTotaleMs = risorse[bracciante.lavoro.tipo].tempo_lavoro_ms
          }
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

  // Quanto costa la squadra ogni sera. Un bracciante fermo costa uguale a uno
  // che lavora: e' quello che rende difficile la domanda "assumo o no".
  function salariTotali() {
    let totale = 0
    for (let i = 0; i < squadra.length; i++) {
      totale += squadra[i].salario
    }
    return totale
  }

  // Quando non si riesce a pagare se ne va il piu' caro: e' il piu' facile da
  // capire, ed e' anche quello che fa piu' male, quindi si vede.
  function mandaViaIlPiuCaro() {
    if (squadra.length === 0) {
      return ''
    }
    let quale = 0
    for (let i = 1; i < squadra.length; i++) {
      if (squadra[i].salario > squadra[quale].salario) {
        quale = i
      }
    }
    const nome = squadra[quale].nome
    const chiSeNeVa = squadra[quale]
    if (chiSeNeVa.lavoro) {
      chiSeNeVa.lavoro.preso = false
      chiSeNeVa.lavoro.attivo = false
    }
    squadra.splice(quale, 1)
    return nome
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
    // all'avvio scaricano tutti al casotto: senza una destinazione il primo
    // bracciante sembrerebbe rotto
    const casotto = casse.elenco.find((cassa) => cassa.eIlCasotto) || casse.elenco[0]
    for (let i = 0; i < squadra.length; i++) {
      squadra[i].scaricaA = casotto || null
    }
  }

  reimposta()

  return {
    squadra,
    assumi,
    aggiorna,
    quantiFermi,
    salariTotali,
    mandaViaIlPiuCaro,
    reimposta
  }
}
