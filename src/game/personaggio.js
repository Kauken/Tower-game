// Il personaggio guidato dal giocatore. Si muove con la levetta a pollice e
// colpisce da solo il nemico piu' vicino entro la sua portata: il giocatore
// decide dove stare, non dove mirare.
// Un solo oggetto per tutta la partita, mai ricreato.

import { datiPersonaggio, grafica } from './config.js'

export function creaPersonaggio(truppe, proiettili) {
  const confini = datiPersonaggio.confini
  const portataQuadrata = datiPersonaggio.raggio_attacco * datiPersonaggio.raggio_attacco

  const stato = {
    x: 0,
    y: 0,
    ricarica: 0,
    // direzione dello sguardo: dove si e' mosso, o dove sta sparando
    guardaX: 0,
    guardaY: 0
  }

  // Input continuo della levetta: l'interfaccia ci scrive sopra, il ciclo lo
  // legge. Non passa dalla coda dei comandi perche' non e' un'azione singola
  // ma uno stato che cambia di continuo: in coda si perderebbero valori.
  const levetta = { x: 0, y: 0, intensita: 0 }

  function reimposta() {
    stato.x = datiPersonaggio.posizione_iniziale.x
    stato.y = datiPersonaggio.posizione_iniziale.y
    stato.ricarica = 0
    stato.guardaX = datiPersonaggio.sguardo_iniziale.x
    stato.guardaY = datiPersonaggio.sguardo_iniziale.y
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

  function aggiorna(passoMs, passoSecondi) {
    if (levetta.intensita > 0) {
      const passo = datiPersonaggio.velocita * levetta.intensita * passoSecondi
      stato.x += levetta.x * passo
      stato.y += levetta.y * passo

      if (stato.x < confini.sinistra) {
        stato.x = confini.sinistra
      } else if (stato.x > confini.destra) {
        stato.x = confini.destra
      }
      if (stato.y < confini.alto) {
        stato.y = confini.alto
      } else if (stato.y > confini.basso) {
        stato.y = confini.basso
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

  function disegna(ctx) {
    const stile = grafica.personaggio

    ctx.beginPath()
    ctx.arc(stato.x, stato.y, datiPersonaggio.raggio_attacco, 0, Math.PI * 2)
    ctx.lineWidth = stile.portata.spessore
    ctx.strokeStyle = stile.portata.colore
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(stato.x, stato.y, datiPersonaggio.dimensione, 0, Math.PI * 2)
    ctx.fillStyle = stile.colore
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
  }

  reimposta()

  return { muovi, aggiorna, disegna, reimposta }
}
