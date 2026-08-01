// Le torri: piazzamento su casella, bonus della casella, ricerca del bersaglio
// e fuoco a cadenza. Al punto 2 esiste solo il Balestriere.

import { bonusCasella, grafica, mappaAttiva, torreAnteprima } from './config.js'
import { creaPool } from './pool.js'

// Statistiche della torre una volta messa su quella casella.
// Serve anche all'interfaccia per mostrare i numeri nella conferma: viene
// chiamata su un tocco, mai dentro il ciclo di gioco.
export function statisticheSuCasella(casella) {
  const bonus = bonusCasella(casella.tipo)
  return {
    nome: torreAnteprima.nome,
    descrizione: torreAnteprima.descrizione,
    costo: torreAnteprima.costo,
    danno: torreAnteprima.danno * bonus.moltiplicatore_danno,
    cadenzaMs: torreAnteprima.cadenza_ms * bonus.moltiplicatore_cadenza,
    raggio: torreAnteprima.raggio * bonus.moltiplicatore_raggio,
    tipoCasella: casella.tipo,
    descrizioneBonus: bonus.descrizione
  }
}

export function creaGestoreTorri(gestoreNemici, gestoreProiettili) {
  // al massimo una torre per casella: il pool ha esattamente quella dimensione
  const elenco = creaPool(mappaAttiva.caselle.length, () => ({
    attivo: false,
    indiceCasella: -1,
    x: 0,
    y: 0,
    danno: 0,
    cadenzaMs: 0,
    raggio: 0,
    raggioQuadrato: 0,
    velocitaProiettile: 0,
    ricarica: 0
  }))

  function torreSuCasella(indiceCasella) {
    for (let i = 0; i < elenco.length; i++) {
      if (elenco[i].attivo && elenco[i].indiceCasella === indiceCasella) {
        return elenco[i]
      }
    }
    return null
  }

  function piazza(indiceCasella) {
    if (torreSuCasella(indiceCasella)) {
      return null
    }
    const torre = elenco[indiceCasella]
    const casella = mappaAttiva.caselle[indiceCasella]
    const statistiche = statisticheSuCasella(casella)

    torre.attivo = true
    torre.indiceCasella = indiceCasella
    torre.x = casella.x
    torre.y = casella.y
    torre.danno = statistiche.danno
    torre.cadenzaMs = statistiche.cadenzaMs
    torre.raggio = statistiche.raggio
    torre.raggioQuadrato = statistiche.raggio * statistiche.raggio
    torre.velocitaProiettile = torreAnteprima.velocita_proiettile
    torre.ricarica = 0
    return torre
  }

  function aggiorna(passoMs) {
    for (let i = 0; i < elenco.length; i++) {
      const torre = elenco[i]
      if (!torre.attivo) {
        continue
      }
      if (torre.ricarica > 0) {
        torre.ricarica -= passoMs
        continue
      }
      const bersaglio = gestoreNemici.bersaglioPiuAvanti(
        torre.x,
        torre.y,
        torre.raggioQuadrato
      )
      if (!bersaglio) {
        continue
      }
      gestoreProiettili.spara(
        torre.x,
        torre.y,
        bersaglio,
        torre.danno,
        torre.velocitaProiettile
      )
      torre.ricarica = torre.cadenzaMs
    }
  }

  function svuota() {
    for (let i = 0; i < elenco.length; i++) {
      elenco[i].attivo = false
      elenco[i].indiceCasella = -1
    }
  }

  function disegnaRaggio(ctx, torre) {
    const stile = grafica.raggio_azione
    ctx.beginPath()
    ctx.arc(torre.x, torre.y, torre.raggio, 0, Math.PI * 2)
    ctx.fillStyle = stile.colore_riempimento
    ctx.fill()
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = stile.colore_bordo
    ctx.stroke()
  }

  function disegna(ctx) {
    const stile = grafica.torre
    for (let i = 0; i < elenco.length; i++) {
      const torre = elenco[i]
      if (!torre.attivo) {
        continue
      }
      ctx.beginPath()
      ctx.arc(torre.x, torre.y, stile.raggio, 0, Math.PI * 2)
      ctx.fillStyle = stile.colore
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle = stile.colore_bordo
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(torre.x, torre.y, stile.raggio_cima, 0, Math.PI * 2)
      ctx.fillStyle = stile.colore_cima
      ctx.fill()
    }
  }

  return { piazza, aggiorna, disegna, disegnaRaggio, torreSuCasella, svuota }
}
