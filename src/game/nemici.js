// I nemici dentro la stanza. Sono gia' li' quando entri: nessuno arriva a
// ondate. La varieta' viene da come si comportano, e ognuno si comporta in un
// modo solo, dichiarato in nemici.json:
//
//   inseguitore  ti viene addosso e basta
//   scattante    sta fermo, si carica, poi parte di colpo
//   corazzato    lento e duro, e non si fa spingere via dagli altri
//   tiratore     tiene le distanze, prende la mira e spara
//
// Pool preallocato, zero creazioni durante la partita.

import {
  affollamento,
  arena,
  aspettoNemico,
  grafica,
  limiti,
  scalaturaNemici
} from './config.js'
import { creaPool, primoLibero } from './pool.js'

function nuovoNemico() {
  return {
    attivo: false,
    generazione: 0,
    definizione: null,
    comportamento: '',
    x: 0,
    y: 0,
    vita: 0,
    vitaMassima: 0,
    velocita: 0,
    raggio: 0,
    raggioAttacco: 0,
    danno: 0,
    cadenzaMs: 0,
    ricarica: 0,
    riduzioneDanno: 0,
    lampoMs: 0,
    // stato del comportamento: 'avanza' | 'pausa' | 'scatto' | 'mira'
    fase: '',
    timerMs: 0,
    versoX: 0,
    versoY: 0
  }
}

// agganci: allaMorte(x, y), colpisciGiocatore(danno),
//          sparaColpo(x, y, versoX, versoY, velocita, danno)
export function creaGestoreNemici(agganci) {
  const elenco = creaPool(limiti.nemici_massimi, nuovoNemico)

  let vivi = 0
  // il personaggio: lo inseguono tutti. Arriva dopo la creazione perche' a sua
  // volta ha bisogno di poter cercare i nemici.
  let giocatore = null

  function impostaGiocatore(stato) {
    giocatore = stato
  }

  function genera(definizione, x, y, stanza) {
    const nemico = primoLibero(elenco)
    if (!nemico) {
      return
    }
    const esponente = stanza - 1
    nemico.attivo = true
    nemico.generazione++
    nemico.definizione = definizione
    nemico.comportamento = definizione.comportamento
    nemico.x = x
    nemico.y = y
    nemico.vitaMassima =
      definizione.vita * Math.pow(scalaturaNemici.vita_per_stanza, esponente)
    nemico.vita = nemico.vitaMassima
    nemico.velocita = definizione.velocita
    nemico.raggio = definizione.dimensione
    nemico.raggioAttacco = definizione.raggio_attacco
    nemico.danno = definizione.danno * Math.pow(scalaturaNemici.danno_per_stanza, esponente)
    nemico.cadenzaMs = definizione.cadenza_ms
    nemico.ricarica = 0
    nemico.riduzioneDanno = definizione.riduzione_danno
    nemico.lampoMs = 0
    nemico.versoX = 0
    nemico.versoY = 0
    // lo scattante nasce in pausa: si vede che si sta caricando prima di partire
    nemico.fase = definizione.comportamento === 'scattante' ? 'pausa' : 'avanza'
    nemico.timerMs = nemico.fase === 'pausa' ? definizione.scatto.pausa_ms : 0
    vivi++
  }

  function applicaDanno(nemico, danno) {
    const effettivo = danno - nemico.riduzioneDanno
    if (effettivo <= 0) {
      return
    }
    nemico.vita -= effettivo
    nemico.lampoMs = grafica.effetti.lampo_colpo_ms
    if (nemico.vita > 0) {
      return
    }
    nemico.vita = 0
    nemico.attivo = false
    nemico.generazione++
    vivi--
    agganci.allaMorte(nemico.x, nemico.y)
  }

  function versoIlGiocatore(nemico) {
    const dx = giocatore.x - nemico.x
    const dy = giocatore.y - nemico.y
    const distanza = Math.sqrt(dx * dx + dy * dy)
    if (distanza === 0) {
      nemico.versoX = 0
      nemico.versoY = 0
      return 0
    }
    nemico.versoX = dx / distanza
    nemico.versoY = dy / distanza
    return distanza
  }

  function attaccaSeAContatto(nemico, distanza) {
    const portata = nemico.raggio + giocatore.raggio + nemico.definizione.raggio_attacco
    if (distanza > portata || nemico.ricarica > 0) {
      return false
    }
    agganci.colpisciGiocatore(nemico.danno)
    nemico.ricarica = nemico.cadenzaMs
    return true
  }

  function avanza(nemico, passoSecondi) {
    const passo = nemico.velocita * passoSecondi
    nemico.x += nemico.versoX * passo
    nemico.y += nemico.versoY * passo
  }

  function aggiornaInseguitore(nemico, passoSecondi) {
    const distanza = versoIlGiocatore(nemico)
    const portata = nemico.raggio + giocatore.raggio + nemico.raggioAttacco
    if (distanza <= portata) {
      attaccaSeAContatto(nemico, distanza)
      return
    }
    avanza(nemico, passoSecondi)
  }

  function aggiornaScattante(nemico, passoMs, passoSecondi) {
    const distanza = versoIlGiocatore(nemico)
    attaccaSeAContatto(nemico, distanza)

    nemico.timerMs -= passoMs
    const scatto = nemico.definizione.scatto

    if (nemico.fase === 'pausa') {
      // fermo, si carica: la direzione si fissa solo nell'istante della partenza
      if (nemico.timerMs <= 0) {
        nemico.fase = 'scatto'
        nemico.timerMs = scatto.durata_ms
      }
      return
    }

    avanza(nemico, passoSecondi)
    if (nemico.timerMs <= 0) {
      nemico.fase = 'pausa'
      nemico.timerMs = scatto.pausa_ms
    }
  }

  function aggiornaTiratore(nemico, passoMs, passoSecondi) {
    const distanza = versoIlGiocatore(nemico)
    const tiro = nemico.definizione.tiro

    // fermo a prendere la mira: e' il tempo che il giocatore ha per togliersi
    if (nemico.fase === 'mira') {
      nemico.timerMs -= passoMs
      if (nemico.timerMs > 0) {
        return
      }
      nemico.fase = 'avanza'
      nemico.ricarica = nemico.cadenzaMs
      agganci.sparaColpo(
        nemico.x,
        nemico.y,
        nemico.versoX,
        nemico.versoY,
        tiro.velocita_proiettile,
        nemico.danno
      )
      return
    }

    if (nemico.ricarica <= 0 && distanza <= nemico.raggioAttacco) {
      nemico.fase = 'mira'
      nemico.timerMs = tiro.mira_ms
      return
    }

    // tiene la distanza: troppo lontano si avvicina, troppo vicino indietreggia
    const passo = nemico.velocita * passoSecondi
    if (distanza > tiro.distanza_preferita + tiro.tolleranza) {
      nemico.x += nemico.versoX * passo
      nemico.y += nemico.versoY * passo
    } else if (distanza < tiro.distanza_preferita - tiro.tolleranza) {
      nemico.x -= nemico.versoX * passo
      nemico.y -= nemico.versoY * passo
    }
  }

  // Spinta reciproca fra nemici vicini. Si guarda ogni coppia una volta sola.
  // Il corazzato non si sposta: e' un muro, e deve sentirsi tale.
  function scansa(passoSecondi) {
    const spinta = affollamento.spinta * passoSecondi

    for (let i = 0; i < elenco.length; i++) {
      const a = elenco[i]
      if (!a.attivo) {
        continue
      }
      for (let j = i + 1; j < elenco.length; j++) {
        const b = elenco[j]
        if (!b.attivo) {
          continue
        }
        const dx = b.x - a.x
        const dy = b.y - a.y
        const minimo = a.raggio + b.raggio
        const distanzaQuadrata = dx * dx + dy * dy
        if (distanzaQuadrata >= minimo * minimo || distanzaQuadrata === 0) {
          continue
        }
        const distanza = Math.sqrt(distanzaQuadrata)
        const versoX = (dx / distanza) * spinta
        const versoY = (dy / distanza) * spinta
        if (a.comportamento !== 'corazzato') {
          a.x -= versoX
          a.y -= versoY
        }
        if (b.comportamento !== 'corazzato') {
          b.x += versoX
          b.y += versoY
        }
      }
    }
  }

  function dentroArena(nemico) {
    if (nemico.x < arena.sinistra + nemico.raggio) {
      nemico.x = arena.sinistra + nemico.raggio
    } else if (nemico.x > arena.destra - nemico.raggio) {
      nemico.x = arena.destra - nemico.raggio
    }
    if (nemico.y < arena.alto + nemico.raggio) {
      nemico.y = arena.alto + nemico.raggio
    } else if (nemico.y > arena.basso - nemico.raggio) {
      nemico.y = arena.basso - nemico.raggio
    }
  }

  function aggiorna(passoMs, passoSecondi) {
    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }

      if (nemico.lampoMs > 0) {
        nemico.lampoMs -= passoMs
      }
      if (nemico.ricarica > 0) {
        nemico.ricarica -= passoMs
      }

      if (!giocatore || !giocatore.attivo) {
        continue
      }

      if (nemico.comportamento === 'scattante') {
        aggiornaScattante(nemico, passoMs, passoSecondi)
      } else if (nemico.comportamento === 'tiratore') {
        aggiornaTiratore(nemico, passoMs, passoSecondi)
      } else {
        // inseguitore e corazzato si muovono uguale: cambiano i numeri e il
        // fatto che il corazzato non si faccia spingere
        aggiornaInseguitore(nemico, passoSecondi)
      }
    }

    scansa(passoSecondi)

    for (let i = 0; i < elenco.length; i++) {
      if (elenco[i].attivo) {
        dentroArena(elenco[i])
      }
    }
  }

  function piuVicino(x, y, raggioQuadrato) {
    let migliore = null
    let distanzaMigliore = raggioQuadrato
    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
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

  function colpisciArea(x, y, raggioQuadrato, danno) {
    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      if (dx * dx + dy * dy <= raggioQuadrato) {
        applicaDanno(nemico, danno)
      }
    }
  }

  function quantiVivi() {
    return vivi
  }

  // Serve alla stanza per non far nascere due nemici uno dentro l'altro.
  function spazioLibero(x, y, raggio) {
    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      const minimo = nemico.raggio + raggio
      if (dx * dx + dy * dy < minimo * minimo) {
        return false
      }
    }
    return true
  }

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
      elenco[i].generazione++
    }
    vivi = 0
  }

  function disegnaSegnali(ctx, nemico) {
    // il tiratore mostra dove sta mirando: e' il tempo per togliersi
    if (nemico.fase === 'mira') {
      const stile = grafica.nemico.mira
      const tiro = nemico.definizione.tiro
      ctx.save()
      ctx.setLineDash([stile.tratto, stile.tratto])
      ctx.beginPath()
      ctx.moveTo(nemico.x, nemico.y)
      ctx.lineTo(
        nemico.x + nemico.versoX * tiro.distanza_preferita,
        nemico.y + nemico.versoY * tiro.distanza_preferita
      )
      ctx.lineWidth = stile.spessore
      ctx.strokeStyle = stile.colore
      ctx.stroke()
      ctx.restore()
      return
    }

    // lo scattante si carica: l'anello si stringe fino alla partenza
    if (nemico.fase === 'pausa') {
      const stile = grafica.nemico.scatto
      const quota = nemico.timerMs / nemico.definizione.scatto.pausa_ms
      ctx.beginPath()
      ctx.arc(
        nemico.x,
        nemico.y,
        nemico.raggio + stile.raggio_extra * quota,
        0,
        Math.PI * 2
      )
      ctx.lineWidth = stile.spessore
      ctx.strokeStyle = stile.colore
      ctx.stroke()
    }
  }

  function disegna(ctx) {
    const comune = grafica.nemico
    const barra = grafica.barra_vita_nemico
    const mezzaBarra = barra.larghezza / 2

    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }
      const aspetto = aspettoNemico(nemico.definizione.id)

      disegnaSegnali(ctx, nemico)

      ctx.beginPath()
      ctx.arc(nemico.x, nemico.y, nemico.raggio, 0, Math.PI * 2)
      ctx.fillStyle = nemico.lampoMs > 0 ? grafica.effetti.colore_lampo : aspetto.colore
      ctx.fill()
      ctx.lineWidth = comune.spessore_bordo
      ctx.strokeStyle = aspetto.colore_bordo
      ctx.stroke()

      // il corazzato ha un bordo doppio, il tiratore un occhio: si riconoscono
      // senza dover leggere niente
      if (nemico.comportamento === 'corazzato') {
        ctx.beginPath()
        ctx.arc(nemico.x, nemico.y, nemico.raggio - comune.spessore_bordo * 2, 0, Math.PI * 2)
        ctx.stroke()
      } else if (nemico.comportamento === 'tiratore') {
        ctx.beginPath()
        ctx.arc(nemico.x, nemico.y, nemico.raggio / 3, 0, Math.PI * 2)
        ctx.fillStyle = aspetto.colore_bordo
        ctx.fill()
      }

      const sinistra = nemico.x - mezzaBarra
      const alto = nemico.y - nemico.raggio - barra.distanza_sopra - barra.altezza
      ctx.fillStyle = barra.colore_fondo
      ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
      ctx.fillStyle = barra.colore_pieno
      ctx.fillRect(
        sinistra,
        alto,
        (barra.larghezza * nemico.vita) / nemico.vitaMassima,
        barra.altezza
      )
      ctx.lineWidth = barra.spessore_bordo
      ctx.strokeStyle = barra.colore_bordo
      ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
    }
  }

  return {
    impostaGiocatore,
    genera,
    aggiorna,
    disegna,
    applicaDanno,
    colpisciArea,
    piuVicino,
    quantiVivi,
    spazioLibero,
    svuota
  }
}
