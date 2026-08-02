// Le truppe dei due eserciti: i nemici scendono dalla fortezza in alto, gli
// alleati salgono da quella in basso. Quando un avversario entra nel raggio
// d'ingaggio si fermano e combattono; chi sfonda danneggia la fortezza.
// Due pool preallocati, zero creazioni durante la partita.

import {
  alleatoSquadra,
  grafica,
  limiti,
  mappaAttiva,
  nemicoOndata,
  scalaturaAlleati,
  scalaturaNemici
} from './config.js'
import { creaPool, primoLibero } from './pool.js'
import { posizionaSuPercorso } from './percorso.js'

function nuovaTruppa() {
  return {
    attivo: false,
    generazione: 0,
    fazione: '',
    x: 0,
    y: 0,
    scartoX: 0,
    distanza: 0,
    segmento: 0,
    vita: 0,
    vitaMassima: 0,
    velocita: 0,
    raggio: 0,
    raggioIngaggio: 0,
    danno: 0,
    cadenzaMs: 0,
    ricarica: 0,
    riduzioneDanno: 0,
    dannoFortezza: 0,
    oro: 0,
    lampoMs: 0,
    rallentaFattore: 1,
    rallentaMs: 0,
    bersaglio: null,
    generazioneBersaglio: 0
  }
}

// agganci: allaMorte(fazione, oro, x, y),
//          allaFortezzaGiocatore(danno), allaFortezzaNemica(danno)
export function creaGestoreTruppe(percorso, agganci) {
  const nemici = creaPool(limiti.nemici_massimi, nuovaTruppa)
  const alleati = creaPool(limiti.alleati_massimi, nuovaTruppa)
  const scarti = mappaAttiva.scarti_corsia

  let nemiciAttivi = 0
  let contatoreScarti = 0

  function prossimoScarto() {
    contatoreScarti++
    return scarti[contatoreScarti % scarti.length]
  }

  function prepara(truppa, definizione, fazione, moltiplicatoreVita, moltiplicatoreDanno) {
    truppa.attivo = true
    truppa.generazione++
    truppa.fazione = fazione
    truppa.scartoX = prossimoScarto()
    truppa.segmento = 0
    truppa.vitaMassima = definizione.vita_base * moltiplicatoreVita
    truppa.vita = truppa.vitaMassima
    truppa.velocita = definizione.velocita
    truppa.raggio = definizione.dimensione
    truppa.raggioIngaggio = definizione.raggio_ingaggio
    truppa.danno = definizione.danno * moltiplicatoreDanno
    truppa.cadenzaMs = definizione.cadenza_ms
    truppa.ricarica = 0
    truppa.riduzioneDanno = definizione.riduzione_danno
    truppa.dannoFortezza = definizione.danno_fortezza
    truppa.lampoMs = 0
    truppa.rallentaFattore = 1
    truppa.rallentaMs = 0
    truppa.bersaglio = null
  }

  function generaNemico(numeroOndata) {
    const truppa = primoLibero(nemici)
    if (!truppa) {
      return
    }
    const esponente = numeroOndata - 1
    prepara(
      truppa,
      nemicoOndata,
      'nemico',
      Math.pow(scalaturaNemici.vita_per_ondata, esponente),
      Math.pow(scalaturaNemici.danno_per_ondata, esponente)
    )
    truppa.oro = Math.round(
      nemicoOndata.oro_rilasciato * Math.pow(scalaturaNemici.oro_per_ondata, esponente)
    )
    // i nemici partono dall'inizio del percorso (fortezza in alto)
    truppa.distanza = 0
    posizionaSuPercorso(percorso, truppa)
    truppa.x += truppa.scartoX
    nemiciAttivi++
  }

  function generaAlleato(numeroOndata) {
    const truppa = primoLibero(alleati)
    if (!truppa) {
      return
    }
    const esponente = numeroOndata - 1
    prepara(
      truppa,
      alleatoSquadra,
      'alleato',
      Math.pow(scalaturaAlleati.vita_per_ondata, esponente),
      Math.pow(scalaturaAlleati.danno_per_ondata, esponente)
    )
    truppa.oro = 0
    // gli alleati partono dalla fine del percorso (fortezza in basso)
    truppa.distanza = percorso.lunghezzaTotale
    truppa.segmento = percorso.segmenti - 1
    posizionaSuPercorso(percorso, truppa)
    truppa.x += truppa.scartoX
  }

  function spegni(truppa) {
    truppa.attivo = false
    truppa.bersaglio = null
    if (truppa.fazione === 'nemico') {
      nemiciAttivi--
    }
  }

  function applicaDanno(truppa, danno) {
    const effettivo = danno - truppa.riduzioneDanno
    if (effettivo <= 0) {
      return
    }
    truppa.vita -= effettivo
    truppa.lampoMs = grafica.effetti.lampo_colpo_ms
    if (truppa.vita <= 0) {
      truppa.vita = 0
      spegni(truppa)
      agganci.allaMorte(truppa.fazione, truppa.oro, truppa.x, truppa.y)
    }
  }

  // Cerca l'avversario piu' vicino entro il raggio d'ingaggio della truppa.
  function cercaAvversario(truppa, avversari) {
    let migliore = null
    let distanzaMigliore = Infinity
    for (let i = 0; i < avversari.length; i++) {
      const altro = avversari[i]
      if (!altro.attivo) {
        continue
      }
      const dx = altro.x - truppa.x
      const dy = altro.y - truppa.y
      const distanza = dx * dx + dy * dy
      const portata = truppa.raggioIngaggio + truppa.raggio + altro.raggio
      if (distanza <= portata * portata && distanza < distanzaMigliore) {
        migliore = altro
        distanzaMigliore = distanza
      }
    }
    return migliore
  }

  function bersaglioValido(truppa) {
    const bersaglio = truppa.bersaglio
    if (
      !bersaglio ||
      !bersaglio.attivo ||
      bersaglio.generazione !== truppa.generazioneBersaglio
    ) {
      return false
    }
    const dx = bersaglio.x - truppa.x
    const dy = bersaglio.y - truppa.y
    const portata = truppa.raggioIngaggio + truppa.raggio + bersaglio.raggio
    return dx * dx + dy * dy <= portata * portata
  }

  function aggiornaTruppa(truppa, avversari, passoMs, passoSecondi, versoFine) {
    if (truppa.lampoMs > 0) {
      truppa.lampoMs -= passoMs
    }
    let velocita = truppa.velocita
    if (truppa.rallentaMs > 0) {
      truppa.rallentaMs -= passoMs
      velocita *= truppa.rallentaFattore
    }

    // combattimento: se ha un avversario a portata si ferma e colpisce
    if (!bersaglioValido(truppa)) {
      truppa.bersaglio = cercaAvversario(truppa, avversari)
      truppa.generazioneBersaglio = truppa.bersaglio ? truppa.bersaglio.generazione : 0
    }
    if (truppa.bersaglio) {
      if (truppa.ricarica > 0) {
        truppa.ricarica -= passoMs
      } else {
        applicaDanno(truppa.bersaglio, truppa.danno)
        truppa.ricarica = truppa.cadenzaMs
      }
      return
    }

    // marcia: i nemici verso la fine del percorso, gli alleati verso l'inizio
    if (versoFine) {
      truppa.distanza += velocita * passoSecondi
      if (truppa.distanza >= percorso.lunghezzaTotale) {
        spegni(truppa)
        agganci.allaFortezzaGiocatore(truppa.dannoFortezza)
        return
      }
    } else {
      truppa.distanza -= velocita * passoSecondi
      if (truppa.distanza <= 0) {
        spegni(truppa)
        agganci.allaFortezzaNemica(truppa.dannoFortezza)
        return
      }
    }
    posizionaSuPercorso(percorso, truppa)
    truppa.x += truppa.scartoX
  }

  function aggiorna(passoMs, passoSecondi) {
    for (let i = 0; i < nemici.length; i++) {
      if (nemici[i].attivo) {
        aggiornaTruppa(nemici[i], alleati, passoMs, passoSecondi, true)
      }
    }
    for (let i = 0; i < alleati.length; i++) {
      if (alleati[i].attivo) {
        aggiornaTruppa(alleati[i], nemici, passoMs, passoSecondi, false)
      }
    }
  }

  // --- interfaccia per le torri: agiscono solo sui nemici ---

  function bersaglioPiuAvanti(x, y, raggioQuadrato) {
    let migliore = null
    let distanzaMigliore = -1
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo || nemico.distanza <= distanzaMigliore) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      if (dx * dx + dy * dy <= raggioQuadrato) {
        migliore = nemico
        distanzaMigliore = nemico.distanza
      }
    }
    return migliore
  }

  // Il personaggio colpisce il nemico piu' vicino, non quello piu' avanti:
  // combatte da dov'e', non difende una linea.
  function nemicoPiuVicino(x, y, raggioQuadrato) {
    let migliore = null
    let distanzaMigliore = raggioQuadrato
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      const distanza = dx * dx + dy * dy
      if (distanza <= distanzaMigliore) {
        migliore = nemico
        distanzaMigliore = distanza
      }
    }
    return migliore
  }

  function colpisciArea(x, y, raggioQuadrato, danno, fattoreRallenta, durataRallentaMs) {
    let toccati = 0
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      if (dx * dx + dy * dy > raggioQuadrato) {
        continue
      }
      toccati++
      if (fattoreRallenta < 1) {
        nemico.rallentaFattore = fattoreRallenta
        if (durataRallentaMs > nemico.rallentaMs) {
          nemico.rallentaMs = durataRallentaMs
        }
      }
      if (danno > 0) {
        applicaDanno(nemico, danno)
      }
    }
    return toccati
  }

  function quantiNemiciAttivi() {
    return nemiciAttivi
  }

  function svuota() {
    for (let i = 0; i < nemici.length; i++) {
      nemici[i].attivo = false
      nemici[i].bersaglio = null
      nemici[i].generazione++
    }
    for (let i = 0; i < alleati.length; i++) {
      alleati[i].attivo = false
      alleati[i].bersaglio = null
      alleati[i].generazione++
    }
    nemiciAttivi = 0
  }

  function disegnaElenco(ctx, elenco, stile) {
    const barra = grafica.barra_vita
    const mezzaBarra = barra.larghezza / 2

    for (let i = 0; i < elenco.length; i++) {
      const truppa = elenco[i]
      if (!truppa.attivo) {
        continue
      }

      ctx.beginPath()
      ctx.arc(truppa.x, truppa.y, truppa.raggio, 0, Math.PI * 2)
      ctx.fillStyle = truppa.lampoMs > 0 ? grafica.effetti.colore_lampo : stile.colore
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle =
        truppa.rallentaMs > 0 ? stile.colore_bordo_rallentato : stile.colore_bordo
      ctx.stroke()

      const sinistra = truppa.x - mezzaBarra
      const alto = truppa.y - truppa.raggio - barra.distanza_sopra - barra.altezza
      ctx.fillStyle = barra.colore_fondo
      ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
      ctx.fillStyle = barra.colore_pieno
      ctx.fillRect(
        sinistra,
        alto,
        (barra.larghezza * truppa.vita) / truppa.vitaMassima,
        barra.altezza
      )
      ctx.lineWidth = barra.spessore_bordo
      ctx.strokeStyle = barra.colore_bordo
      ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
    }
  }

  function disegna(ctx) {
    disegnaElenco(ctx, nemici, grafica.nemico)
    disegnaElenco(ctx, alleati, grafica.alleato)
  }

  return {
    generaNemico,
    generaAlleato,
    aggiorna,
    disegna,
    applicaDanno,
    colpisciArea,
    bersaglioPiuAvanti,
    nemicoPiuVicino,
    quantiNemiciAttivi,
    svuota
  }
}
