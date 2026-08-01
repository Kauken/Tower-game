// Le torri: piazzamento su casella, bonus della casella, aura dell'Obelisco,
// e i quattro comportamenti di attacco letti dalla configurazione:
// proiettile (Balestriere), proiettile_area (Catapulta),
// impulso (Cappella del Gelo), potenziamento (Obelisco, non attacca).

import { bonusCasella, grafica, mappaAttiva } from './config.js'
import { creaPool } from './pool.js'

// Statistiche di una torre una volta messa su quella casella.
// Serve anche all'interfaccia per la conferma: viene chiamata su un tocco,
// mai dentro il ciclo di gioco.
export function statisticheTorre(torre, casella) {
  const bonus = bonusCasella(casella.tipo)
  return {
    id: torre.id,
    nome: torre.nome,
    descrizione: torre.descrizione,
    attacco: torre.attacco,
    costo: torre.costo,
    danno: torre.danno * bonus.moltiplicatore_danno,
    cadenzaMs: torre.cadenza_ms * bonus.moltiplicatore_cadenza,
    raggio: torre.raggio * bonus.moltiplicatore_raggio,
    tipoCasella: casella.tipo,
    descrizioneBonus: bonus.descrizione
  }
}

export function creaGestoreTorri(gestoreNemici, gestoreProiettili, effetti) {
  // al massimo una torre per casella: il pool ha esattamente quella dimensione
  // e lo slot i del pool corrisponde alla casella i (vale finche' non esiste
  // la vendita: quando arrivera', questo accoppiamento va rivisto)
  const elenco = creaPool(mappaAttiva.caselle.length, () => ({
    attivo: false,
    indiceCasella: -1,
    id: '',
    attacco: '',
    x: 0,
    y: 0,
    // danno con il bonus della casella; "danno" include anche l'aura
    dannoBase: 0,
    danno: 0,
    cadenzaMs: 0,
    raggio: 0,
    raggioQuadrato: 0,
    raggioArea: 0,
    rallentaFattore: 1,
    rallentaMs: 0,
    auraDanno: 1,
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

  // L'aura dell'Obelisco: ogni torre che attacca prende il moltiplicatore di
  // ogni Obelisco nel cui raggio si trova. Ricalcolata solo al piazzamento.
  function ricalcolaAure() {
    for (let i = 0; i < elenco.length; i++) {
      const torre = elenco[i]
      if (!torre.attivo || torre.attacco === 'potenziamento') {
        continue
      }
      let moltiplicatore = 1
      for (let j = 0; j < elenco.length; j++) {
        const obelisco = elenco[j]
        if (!obelisco.attivo || obelisco.attacco !== 'potenziamento') {
          continue
        }
        const dx = torre.x - obelisco.x
        const dy = torre.y - obelisco.y
        if (dx * dx + dy * dy <= obelisco.raggioQuadrato) {
          moltiplicatore *= obelisco.auraDanno
        }
      }
      torre.danno = torre.dannoBase * moltiplicatore
    }
  }

  function piazza(indiceCasella, definizione) {
    if (torreSuCasella(indiceCasella)) {
      return null
    }
    const torre = elenco[indiceCasella]
    const casella = mappaAttiva.caselle[indiceCasella]
    const statistiche = statisticheTorre(definizione, casella)

    torre.attivo = true
    torre.indiceCasella = indiceCasella
    torre.id = definizione.id
    torre.attacco = definizione.attacco
    torre.x = casella.x
    torre.y = casella.y
    torre.dannoBase = statistiche.danno
    torre.danno = statistiche.danno
    torre.cadenzaMs = statistiche.cadenzaMs
    torre.raggio = statistiche.raggio
    torre.raggioQuadrato = statistiche.raggio * statistiche.raggio
    torre.raggioArea = definizione.raggio_area || 0
    torre.rallentaFattore = definizione.rallentamento
      ? definizione.rallentamento.fattore_velocita
      : 1
    torre.rallentaMs = definizione.rallentamento
      ? definizione.rallentamento.durata_ms
      : 0
    torre.auraDanno = definizione.aura ? definizione.aura.moltiplicatore_danno : 1
    torre.velocitaProiettile = definizione.velocita_proiettile
    torre.ricarica = 0

    ricalcolaAure()
    return torre
  }

  function aggiorna(passoMs) {
    for (let i = 0; i < elenco.length; i++) {
      const torre = elenco[i]
      // l'Obelisco non attacca: la sua aura e' gia' dentro il danno delle altre
      if (!torre.attivo || torre.attacco === 'potenziamento') {
        continue
      }
      if (torre.ricarica > 0) {
        torre.ricarica -= passoMs
        continue
      }

      if (torre.attacco === 'impulso') {
        const toccati = gestoreNemici.colpisciArea(
          torre.x,
          torre.y,
          torre.raggioQuadrato,
          torre.danno,
          torre.rallentaFattore,
          torre.rallentaMs
        )
        if (toccati > 0) {
          effetti.impulsoGelo(torre.x, torre.y, torre.raggio)
          torre.ricarica = torre.cadenzaMs
        }
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
        torre.velocitaProiettile,
        torre.raggioArea
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
      const aspetto = grafica.torri_aspetto[torre.id] || stile

      ctx.beginPath()
      ctx.arc(torre.x, torre.y, stile.raggio, 0, Math.PI * 2)
      ctx.fillStyle = aspetto.colore
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle = stile.colore_bordo
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(torre.x, torre.y, stile.raggio_cima, 0, Math.PI * 2)
      ctx.fillStyle = aspetto.colore_cima
      ctx.fill()
    }
  }

  return { piazza, aggiorna, disegna, disegnaRaggio, torreSuCasella, svuota }
}
