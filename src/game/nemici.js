// I nemici: pool preallocato, avanzamento sul percorso, barra vita e morte.
// Chi li fa uscire e' il gestore delle ondate, non questo file.

import { grafica, limiti, nemicoOndata, scalatura } from './config.js'
import { creaPool, primoLibero } from './pool.js'
import { posizionaSuPercorso } from './percorso.js'

// alUcciso e alTraguardo sono i due modi in cui un nemico esce di scena:
// il primo paga oro, il secondo toglie una vita.
export function creaGestoreNemici(percorso, alUcciso, alTraguardo) {
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
    riduzioneDanno: 0,
    oro: 0,
    // millisecondi residui del lampo bianco dopo un colpo subito
    lampoMs: 0
  }))

  let attivi = 0

  function genera(numeroOndata) {
    const nemico = primoLibero(elenco)
    if (!nemico) {
      return
    }
    // vita e oro crescono ondata dopo ondata, con la curva di nemici.json
    const esponente = numeroOndata - 1
    const moltiplicatoreVita = Math.pow(scalatura.vita_per_ondata, esponente)
    const moltiplicatoreOro = Math.pow(scalatura.oro_per_ondata, esponente)

    nemico.attivo = true
    nemico.generazione++
    nemico.distanza = 0
    nemico.segmento = 0
    nemico.vitaMassima = nemicoOndata.vita_base * moltiplicatoreVita
    nemico.vita = nemico.vitaMassima
    nemico.velocita = nemicoOndata.velocita
    nemico.raggio = nemicoOndata.dimensione
    nemico.riduzioneDanno = nemicoOndata.riduzione_danno
    nemico.oro = Math.round(nemicoOndata.oro_rilasciato * moltiplicatoreOro)
    nemico.lampoMs = 0
    posizionaSuPercorso(percorso, nemico)
    attivi++
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
      nemico.distanza += nemico.velocita * passoSecondi
      if (nemico.distanza >= percorso.lunghezzaTotale) {
        nemico.attivo = false
        attivi--
        alTraguardo()
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
    nemico.lampoMs = grafica.effetti.lampo_colpo_ms
    if (nemico.vita <= 0) {
      nemico.vita = 0
      nemico.attivo = false
      attivi--
      alUcciso(nemico.oro, nemico.x, nemico.y)
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

  function quantiAttivi() {
    return attivi
  }

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
      // cambia generazione: i proiettili in volo non inseguono un fantasma
      elenco[i].generazione++
    }
    attivi = 0
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
      // il lampo bianco del colpo copre il colore per qualche centesimo
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
    genera,
    aggiorna,
    disegna,
    applicaDanno,
    bersaglioPiuAvanti,
    quantiAttivi,
    svuota
  }
}
