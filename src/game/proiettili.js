// I proiettili: pool preallocato, inseguono il nemico che li ha fatti partire.

import { grafica, limiti } from './config.js'
import { creaPool, primoLibero } from './pool.js'

export function creaGestoreProiettili(applicaDanno) {
  const elenco = creaPool(limiti.proiettili_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    velocita: 0,
    danno: 0,
    bersaglio: null,
    generazioneBersaglio: 0
  }))

  function spara(x, y, bersaglio, danno, velocita) {
    const proiettile = primoLibero(elenco)
    if (!proiettile) {
      return
    }
    proiettile.attivo = true
    proiettile.x = x
    proiettile.y = y
    proiettile.danno = danno
    proiettile.velocita = velocita
    proiettile.bersaglio = bersaglio
    proiettile.generazioneBersaglio = bersaglio.generazione
  }

  function aggiorna(passoSecondi) {
    const raggioProiettile = grafica.proiettile.raggio

    for (let i = 0; i < elenco.length; i++) {
      const proiettile = elenco[i]
      if (!proiettile.attivo) {
        continue
      }

      const bersaglio = proiettile.bersaglio
      // il nemico e' morto o e' arrivato in fondo: il colpo va a vuoto
      if (!bersaglio.attivo || bersaglio.generazione !== proiettile.generazioneBersaglio) {
        proiettile.attivo = false
        proiettile.bersaglio = null
        continue
      }

      const dx = bersaglio.x - proiettile.x
      const dy = bersaglio.y - proiettile.y
      const distanzaQuadrata = dx * dx + dy * dy
      const contatto = bersaglio.raggio + raggioProiettile
      const passo = proiettile.velocita * passoSecondi

      // colpito se lo tocca, o se in questo passo lo supererebbe
      if (distanzaQuadrata <= contatto * contatto || distanzaQuadrata <= passo * passo) {
        applicaDanno(bersaglio, proiettile.danno)
        proiettile.attivo = false
        proiettile.bersaglio = null
        continue
      }

      // qui la radice serve per la direzione, non per un confronto
      const distanza = Math.sqrt(distanzaQuadrata)
      proiettile.x += (dx / distanza) * passo
      proiettile.y += (dy / distanza) * passo
    }
  }

  function disegna(ctx) {
    const stile = grafica.proiettile
    ctx.fillStyle = stile.colore
    ctx.strokeStyle = stile.colore_bordo
    ctx.lineWidth = stile.spessore_bordo

    for (let i = 0; i < elenco.length; i++) {
      const proiettile = elenco[i]
      if (!proiettile.attivo) {
        continue
      }
      ctx.beginPath()
      ctx.arc(proiettile.x, proiettile.y, stile.raggio, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
      elenco[i].bersaglio = null
    }
  }

  return { spara, aggiorna, disegna, svuota }
}
