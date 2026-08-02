// I nemici dentro la stanza: inseguono il personaggio e lo colpiscono a
// contatto. Si scansano fra loro, altrimenti si sovrappongono in un unico
// grumo e non si capisce piu' quanti sono.
// Pool preallocato, zero creazioni durante la partita.

import {
  affollamento,
  arena,
  grafica,
  limiti,
  nemicoStanza,
  scalaturaNemici
} from './config.js'
import { creaPool, primoLibero } from './pool.js'

function nuovoNemico() {
  return {
    attivo: false,
    generazione: 0,
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
    lampoMs: 0
  }
}

// agganci: allaMorte(x, y), colpisciGiocatore(danno)
export function creaGestoreNemici(agganci) {
  const elenco = creaPool(limiti.nemici_massimi, nuovoNemico)

  let vivi = 0
  // il personaggio: lo insegue chi e' in campo. Arriva dopo la creazione
  // perche' a sua volta ha bisogno di poter cercare i nemici.
  let giocatore = null

  function impostaGiocatore(stato) {
    giocatore = stato
  }

  function genera(x, y, stanza) {
    const nemico = primoLibero(elenco)
    if (!nemico) {
      return
    }
    const esponente = stanza - 1
    nemico.attivo = true
    nemico.generazione++
    nemico.x = x
    nemico.y = y
    nemico.vitaMassima =
      nemicoStanza.vita * Math.pow(scalaturaNemici.vita_per_stanza, esponente)
    nemico.vita = nemico.vitaMassima
    nemico.velocita = nemicoStanza.velocita
    nemico.raggio = nemicoStanza.dimensione
    nemico.raggioAttacco = nemicoStanza.raggio_attacco
    nemico.danno = nemicoStanza.danno * Math.pow(scalaturaNemici.danno_per_stanza, esponente)
    nemico.cadenzaMs = nemicoStanza.cadenza_ms
    nemico.ricarica = 0
    nemico.riduzioneDanno = nemicoStanza.riduzione_danno
    nemico.lampoMs = 0
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

  // Spinta reciproca fra nemici vicini. Si guarda solo la coppia (i, j) una
  // volta sola e si spingono in direzioni opposte.
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
        a.x -= versoX
        a.y -= versoY
        b.x += versoX
        b.y += versoY
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

      const dx = giocatore.x - nemico.x
      const dy = giocatore.y - nemico.y
      const distanzaQuadrata = dx * dx + dy * dy
      const portata = nemico.raggioAttacco + nemico.raggio + giocatore.raggio

      // a contatto si ferma e colpisce
      if (distanzaQuadrata <= portata * portata) {
        if (nemico.ricarica <= 0) {
          agganci.colpisciGiocatore(nemico.danno)
          nemico.ricarica = nemico.cadenzaMs
        }
        continue
      }

      const distanza = Math.sqrt(distanzaQuadrata)
      const passo = nemico.velocita * passoSecondi
      nemico.x += (dx / distanza) * passo
      nemico.y += (dy / distanza) * passo
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

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
      elenco[i].generazione++
    }
    vivi = 0
  }

  function disegna(ctx) {
    const stile = grafica.nemico
    const barra = grafica.barra_vita_nemico
    const mezzaBarra = barra.larghezza / 2

    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }

      ctx.beginPath()
      ctx.arc(nemico.x, nemico.y, nemico.raggio, 0, Math.PI * 2)
      ctx.fillStyle = nemico.lampoMs > 0 ? grafica.effetti.colore_lampo : stile.colore
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle = stile.colore_bordo
      ctx.stroke()

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
    svuota
  }
}
