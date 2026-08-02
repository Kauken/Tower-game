// Il personaggio guidato dal giocatore. Si muove con la levetta a pollice e
// colpisce da solo il nemico piu' vicino entro la sua portata: il giocatore
// decide dove stare, non dove mirare.
// I nemici lo attaccano. A vita zero non muore: viene abbattuto e si riforma
// al proprio castello, mentre l'esercito continua a combattere senza di lui.
// Un solo oggetto per tutta la partita, mai ricreato.

import { campo, datiPersonaggio, grafica } from './config.js'

export function creaPersonaggio(truppe, proiettili, agganci) {
  const portataQuadrata = datiPersonaggio.raggio_attacco * datiPersonaggio.raggio_attacco
  const abbattimento = datiPersonaggio.abbattimento

  // Questo oggetto viene letto anche dalle truppe nemiche, che lo trattano
  // come un avversario qualsiasi: per questo ha attivo, generazione e raggio
  // con gli stessi nomi di una truppa.
  const stato = {
    eGiocatore: true,
    attivo: true,
    generazione: 0,
    x: 0,
    y: 0,
    raggio: datiPersonaggio.dimensione,
    vita: 0,
    vitaMassima: datiPersonaggio.vita,
    ricarica: 0,
    lampoMs: 0,
    immunitaMs: 0,
    riformaMs: 0,
    guardaX: 0,
    guardaY: 0
  }

  // Input continuo della levetta: l'interfaccia ci scrive sopra, il ciclo lo
  // legge. Non passa dalla coda dei comandi perche' non e' un'azione singola
  // ma uno stato che cambia di continuo: in coda si perderebbero valori.
  const levetta = { x: 0, y: 0, intensita: 0 }

  function riporta() {
    stato.x = datiPersonaggio.posizione_iniziale.x
    stato.y = datiPersonaggio.posizione_iniziale.y
    stato.vita = stato.vitaMassima
    stato.ricarica = 0
    stato.lampoMs = 0
    stato.riformaMs = 0
    stato.guardaX = datiPersonaggio.sguardo_iniziale.x
    stato.guardaY = datiPersonaggio.sguardo_iniziale.y
    stato.attivo = true
    stato.generazione++
  }

  function reimposta() {
    riporta()
    stato.immunitaMs = 0
    levetta.x = 0
    levetta.y = 0
    levetta.intensita = 0
  }

  // x e y sono gia' normalizzati (lunghezza 1), intensita' va da 0 a 1
  function muovi(x, y, intensita) {
    levetta.x = x
    levetta.y = y
    levetta.intensita = intensita
  }

  function colpisci(danno) {
    if (!stato.attivo || stato.immunitaMs > 0) {
      return
    }
    const effettivo = danno - datiPersonaggio.riduzione_danno
    if (effettivo <= 0) {
      return
    }
    stato.vita -= effettivo
    stato.lampoMs = grafica.effetti.lampo_colpo_ms
    if (stato.vita > 0) {
      return
    }
    // abbattuto: esce dal campo e i nemici smettono di vederlo
    stato.vita = 0
    stato.attivo = false
    stato.generazione++
    stato.riformaMs = abbattimento.riforma_ms
    agganci.allAbbattimento(stato.x, stato.y)
  }

  function aggiorna(passoMs, passoSecondi) {
    if (stato.lampoMs > 0) {
      stato.lampoMs -= passoMs
    }
    if (stato.immunitaMs > 0) {
      stato.immunitaMs -= passoMs
    }

    if (!stato.attivo) {
      stato.riformaMs -= passoMs
      if (stato.riformaMs <= 0) {
        riporta()
        stato.immunitaMs = abbattimento.immunita_ms
        agganci.allaRiforma(stato.x, stato.y)
      }
      return
    }

    if (levetta.intensita > 0) {
      const passo = datiPersonaggio.velocita * levetta.intensita * passoSecondi
      stato.x += levetta.x * passo
      stato.y += levetta.y * passo

      if (stato.x < campo.sinistra) {
        stato.x = campo.sinistra
      } else if (stato.x > campo.destra) {
        stato.x = campo.destra
      }
      if (stato.y < campo.alto) {
        stato.y = campo.alto
      } else if (stato.y > campo.basso) {
        stato.y = campo.basso
      }

      stato.guardaX = levetta.x
      stato.guardaY = levetta.y
    }

    if (stato.ricarica > 0) {
      stato.ricarica -= passoMs
    }

    const bersaglio = truppe.nemicoPiuVicino(stato.x, stato.y, portataQuadrata)
    if (!bersaglio) {
      return
    }

    // con un nemico a tiro lo sguardo lo segue: si capisce cosa sta colpendo
    const dx = bersaglio.x - stato.x
    const dy = bersaglio.y - stato.y
    const distanza = Math.sqrt(dx * dx + dy * dy)
    if (distanza > 0) {
      stato.guardaX = dx / distanza
      stato.guardaY = dy / distanza
    }

    if (stato.ricarica <= 0) {
      proiettili.spara(
        stato.x,
        stato.y,
        bersaglio,
        datiPersonaggio.danno,
        datiPersonaggio.velocita_proiettile,
        datiPersonaggio.raggio_area
      )
      stato.ricarica = datiPersonaggio.cadenza_ms
    }
  }

  function disegnaAttesa(ctx) {
    const stile = grafica.personaggio.riforma
    const quota = 1 - stato.riformaMs / abbattimento.riforma_ms
    ctx.beginPath()
    ctx.arc(
      datiPersonaggio.posizione_iniziale.x,
      datiPersonaggio.posizione_iniziale.y,
      stile.raggio,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * quota
    )
    ctx.lineWidth = stile.spessore
    ctx.strokeStyle = stile.colore
    ctx.stroke()
  }

  function disegnaBarraVita(ctx) {
    const barra = grafica.personaggio.barra_vita
    const quota = stato.vita / stato.vitaMassima
    const sinistra = stato.x - barra.larghezza / 2
    const alto = stato.y - stato.raggio - barra.distanza_sopra - barra.altezza

    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
    ctx.fillStyle = quota <= barra.soglia_bassa ? barra.colore_basso : barra.colore_pieno
    ctx.fillRect(sinistra, alto, barra.larghezza * quota, barra.altezza)
    ctx.lineWidth = barra.spessore_bordo
    ctx.strokeStyle = barra.colore_bordo
    ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
  }

  function disegna(ctx) {
    if (!stato.attivo) {
      disegnaAttesa(ctx)
      return
    }

    const stile = grafica.personaggio
    // appena riformato si e' semitrasparenti: si vede che non ti possono toccare
    if (stato.immunitaMs > 0) {
      ctx.globalAlpha = stile.immunita.opacita
    }

    ctx.beginPath()
    ctx.arc(stato.x, stato.y, datiPersonaggio.raggio_attacco, 0, Math.PI * 2)
    ctx.lineWidth = stile.portata.spessore
    ctx.strokeStyle = stile.portata.colore
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(stato.x, stato.y, stato.raggio, 0, Math.PI * 2)
    ctx.fillStyle = stato.lampoMs > 0 ? grafica.effetti.colore_lampo : stile.colore
    ctx.fill()
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = stile.colore_bordo
    ctx.stroke()

    const sguardo = stile.sguardo
    ctx.beginPath()
    ctx.arc(
      stato.x + stato.guardaX * sguardo.distanza,
      stato.y + stato.guardaY * sguardo.distanza,
      sguardo.raggio,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = sguardo.colore
    ctx.fill()

    disegnaBarraVita(ctx)
    ctx.globalAlpha = 1
  }

  reimposta()

  return { stato, muovi, colpisci, aggiorna, disegna, reimposta }
}
