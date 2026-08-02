// I colpi dei nemici. A differenza dei tuoi non inseguono nessuno: partono
// dritti verso il punto dove eri quando sono stati sparati. E' cio' che li
// rende schivabili, ed e' tutto il senso del tiratore.

import { grafica, limiti } from './config.js'
import { arena } from './config.js'
import { creaPool, primoLibero } from './pool.js'

export function creaGestoreColpiNemici(agganci) {
  const elenco = creaPool(limiti.proiettili_nemici_massimi, () => ({
    attivo: false,
    x: 0,
    y: 0,
    versoX: 0,
    versoY: 0,
    velocita: 0,
    danno: 0
  }))

  function spara(x, y, versoX, versoY, velocita, danno) {
    const colpo = primoLibero(elenco)
    if (!colpo) {
      return
    }
    colpo.attivo = true
    colpo.x = x
    colpo.y = y
    colpo.versoX = versoX
    colpo.versoY = versoY
    colpo.velocita = velocita
    colpo.danno = danno
  }

  function aggiorna(passoSecondi, giocatore) {
    const raggio = grafica.proiettile_nemico.raggio

    for (let i = 0; i < elenco.length; i++) {
      const colpo = elenco[i]
      if (!colpo.attivo) {
        continue
      }

      const passo = colpo.velocita * passoSecondi
      colpo.x += colpo.versoX * passo
      colpo.y += colpo.versoY * passo

      // contro il muro si spegne
      if (
        colpo.x < arena.sinistra ||
        colpo.x > arena.destra ||
        colpo.y < arena.alto ||
        colpo.y > arena.basso
      ) {
        colpo.attivo = false
        continue
      }

      if (!giocatore.attivo) {
        continue
      }
      const dx = giocatore.x - colpo.x
      const dy = giocatore.y - colpo.y
      const contatto = giocatore.raggio + raggio
      if (dx * dx + dy * dy <= contatto * contatto) {
        colpo.attivo = false
        agganci.colpisciGiocatore(colpo.danno)
        agganci.allImpatto(colpo.x, colpo.y)
      }
    }
  }

  function disegna(ctx) {
    const stile = grafica.proiettile_nemico
    ctx.fillStyle = stile.colore
    ctx.strokeStyle = stile.colore_bordo
    ctx.lineWidth = stile.spessore_bordo

    for (let i = 0; i < elenco.length; i++) {
      const colpo = elenco[i]
      if (!colpo.attivo) {
        continue
      }
      ctx.beginPath()
      ctx.arc(colpo.x, colpo.y, stile.raggio, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
    }
  }

  return { spara, aggiorna, disegna, svuota }
}
