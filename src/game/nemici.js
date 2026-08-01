// I nemici: pool preallocato, avanzamento sul percorso, barra vita e morte.

import { anteprima, grafica, limiti, nemicoAnteprima } from './config.js'
import { creaPool, primoLibero } from './pool.js'
import { posizionaSuPercorso } from './percorso.js'

export function creaGestoreNemici(percorso) {
  const elenco = creaPool(limiti.nemici_massimi, () => ({
    attivo: false,
    // cambia a ogni riuso: serve ai proiettili per accorgersi che il nemico
    // che stavano inseguendo non e' piu' quello
    generazione: 0,
    x: 0,
    y: 0,
    distanza: 0,
    segmento: 0,
    vita: 0,
    vitaMassima: 0,
    velocita: 0,
    raggio: 0,
    riduzioneDanno: 0
  }))

  let attesaGenerazione = 0

  function genera() {
    const nemico = primoLibero(elenco)
    if (!nemico) {
      return
    }
    nemico.attivo = true
    nemico.generazione++
    nemico.distanza = 0
    nemico.segmento = 0
    nemico.vitaMassima = nemicoAnteprima.vita_base
    nemico.vita = nemico.vitaMassima
    nemico.velocita = nemicoAnteprima.velocita
    nemico.raggio = nemicoAnteprima.dimensione
    nemico.riduzioneDanno = nemicoAnteprima.riduzione_danno
    posizionaSuPercorso(percorso, nemico)
  }

  function aggiorna(passoMs, passoSecondi) {
    attesaGenerazione += passoMs
    if (attesaGenerazione >= anteprima.intervallo_generazione_ms) {
      attesaGenerazione -= anteprima.intervallo_generazione_ms
      genera()
    }

    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }
      nemico.distanza += nemico.velocita * passoSecondi
      if (nemico.distanza >= percorso.lunghezzaTotale) {
        // arrivato in fondo: per ora sparisce e basta (le vite sono il punto 3)
        nemico.attivo = false
        continue
      }
      posizionaSuPercorso(percorso, nemico)
    }
  }

  function applicaDanno(nemico, danno) {
    const effettivo = danno - nemico.riduzioneDanno
    if (effettivo <= 0) {
      return
    }
    nemico.vita -= effettivo
    if (nemico.vita <= 0) {
      nemico.vita = 0
      nemico.attivo = false
    }
  }

  // Bersaglio: il nemico piu' avanti sul percorso dentro il raggio della torre.
  // Confronto sul quadrato della distanza, nessuna radice quadrata.
  function bersaglioPiuAvanti(x, y, raggioQuadrato) {
    let migliore = null
    let distanzaMigliore = -1
    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
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

  function disegna(ctx) {
    const stile = grafica.nemico
    const barra = grafica.barra_vita
    const mezzaBarra = barra.larghezza / 2

    for (let i = 0; i < elenco.length; i++) {
      const nemico = elenco[i]
      if (!nemico.attivo) {
        continue
      }

      ctx.beginPath()
      ctx.arc(nemico.x, nemico.y, nemico.raggio, 0, Math.PI * 2)
      ctx.fillStyle = stile.colore
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

  return { aggiorna, disegna, applicaDanno, bersaglioPiuAvanti }
}
