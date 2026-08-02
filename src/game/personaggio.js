// Il personaggio guidato dal giocatore. Si muove con la levetta a pollice e
// colpisce da solo il nemico piu' vicino entro la sua portata: il giocatore
// decide dove stare, non dove mirare.
// A vita zero la run finisce.
// Un solo oggetto per tutta la partita, mai ricreato.

import { arena, datiPersonaggio, grafica, partenzaPersonaggio } from './config.js'

export function creaPersonaggio(nemici, proiettili, agganci) {
  const portataQuadrata = datiPersonaggio.raggio_attacco * datiPersonaggio.raggio_attacco

  // Questo oggetto viene letto anche dai nemici, che lo inseguono: per questo
  // ha attivo, generazione e raggio con gli stessi nomi di un nemico.
  const stato = {
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
    guardaX: 0,
    guardaY: 0
  }

  // Input continuo della levetta: l'interfaccia ci scrive sopra, il ciclo lo
  // legge. Non passa dalla coda dei comandi perche' non e' un'azione singola
  // ma uno stato che cambia di continuo: in coda si perderebbero valori.
  const levetta = { x: 0, y: 0, intensita: 0 }

  function reimposta() {
    stato.x = partenzaPersonaggio.x
    stato.y = partenzaPersonaggio.y
    stato.vita = stato.vitaMassima
    stato.ricarica = 0
    stato.lampoMs = 0
    stato.immunitaMs = 0
    stato.guardaX = datiPersonaggio.sguardo_iniziale.x
    stato.guardaY = datiPersonaggio.sguardo_iniziale.y
    stato.attivo = true
    stato.generazione++
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
    // breve invulnerabilita': senza, due nemici a contatto svuotano la barra
    // in un istante e non si capisce cosa e' successo
    stato.immunitaMs = datiPersonaggio.immunita_dopo_colpo_ms
    if (stato.vita > 0) {
      return
    }
    stato.vita = 0
    stato.attivo = false
    stato.generazione++
    agganci.allaMorte(stato.x, stato.y)
  }

  function aggiorna(passoMs, passoSecondi) {
    if (!stato.attivo) {
      return
    }
    if (stato.lampoMs > 0) {
      stato.lampoMs -= passoMs
    }
    if (stato.immunitaMs > 0) {
      stato.immunitaMs -= passoMs
    }

    if (levetta.intensita > 0) {
      const passo = datiPersonaggio.velocita * levetta.intensita * passoSecondi
      stato.x += levetta.x * passo
      stato.y += levetta.y * passo

      // i muri fermano davvero: si sbatte contro il bordo della stanza
      if (stato.x < arena.sinistra + stato.raggio) {
        stato.x = arena.sinistra + stato.raggio
      } else if (stato.x > arena.destra - stato.raggio) {
        stato.x = arena.destra - stato.raggio
      }
      if (stato.y < arena.alto + stato.raggio) {
        stato.y = arena.alto + stato.raggio
      } else if (stato.y > arena.basso - stato.raggio) {
        stato.y = arena.basso - stato.raggio
      }

      stato.guardaX = levetta.x
      stato.guardaY = levetta.y
    }

    if (stato.ricarica > 0) {
      stato.ricarica -= passoMs
    }

    const bersaglio = nemici.piuVicino(stato.x, stato.y, portataQuadrata)
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
      return
    }

    const stile = grafica.personaggio
    // subito dopo un colpo si lampeggia: si vede che per un istante sei intoccabile
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
