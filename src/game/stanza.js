// La stanza: decide quanti nemici la popolano e da dove entrano.
// I nemici non compaiono di colpo: prima si accende un segnale sul bordo, poi
// il nemico arriva li'. Comparire addosso al giocatore sarebbe sleale.
// La stanza e' pulita quando tutti sono usciti e nessuno e' piu' in piedi.

import { arena, ingressi, limiti, popolamento } from './config.js'
import { creaPool, primoLibero } from './pool.js'

function nuovoIngresso() {
  return { attivo: false, x: 0, y: 0, tempoMs: 0 }
}

export function creaGestoreStanza(nemici, effetti) {
  const inArrivo = creaPool(limiti.ingressi_massimi, nuovoIngresso)

  let daGenerare = 0
  let attesa = 0
  let stanzaCorrente = 1

  function quantiNemici(stanza) {
    const quantita =
      popolamento.quantita_totale + popolamento.quantita_aggiunta_per_stanza * (stanza - 1)
    return Math.min(popolamento.quantita_massima, quantita)
  }

  // Un punto a caso lungo i quattro muri, lontano dagli angoli. Sta uno scarto
  // dentro il bordo, non esattamente sopra: il disegno e' ritagliato
  // sull'arena, e sul bordo esatto il segnale si vedrebbe a meta'.
  function puntoSulBordo(ingresso) {
    const margine = ingressi.margine_dagli_angoli
    const scarto = ingressi.scarto_dal_muro
    const larghezza = arena.destra - arena.sinistra - margine * 2
    const altezza = arena.basso - arena.alto - margine * 2
    const lato = Math.floor(Math.random() * 4)

    if (lato === 0) {
      ingresso.x = arena.sinistra + margine + Math.random() * larghezza
      ingresso.y = arena.alto + scarto
    } else if (lato === 1) {
      ingresso.x = arena.destra - scarto
      ingresso.y = arena.alto + margine + Math.random() * altezza
    } else if (lato === 2) {
      ingresso.x = arena.sinistra + margine + Math.random() * larghezza
      ingresso.y = arena.basso - scarto
    } else {
      ingresso.x = arena.sinistra + scarto
      ingresso.y = arena.alto + margine + Math.random() * altezza
    }
  }

  function accendiIngresso() {
    const ingresso = primoLibero(inArrivo)
    if (!ingresso) {
      return
    }
    ingresso.attivo = true
    ingresso.tempoMs = 0
    puntoSulBordo(ingresso)
    daGenerare--
  }

  function apri(stanza) {
    stanzaCorrente = stanza
    for (let i = 0; i < inArrivo.length; i++) {
      inArrivo[i].attivo = false
    }
    daGenerare = quantiNemici(stanza)

    const subito = Math.min(popolamento.quantita_iniziale, daGenerare)
    for (let i = 0; i < subito; i++) {
      accendiIngresso()
    }
    // l'attesa parte piena, altrimenti al primo passo scatterebbe subito un
    // quinto ingresso e quantita_iniziale direbbe una cosa diversa da quella
    // che succede davvero
    attesa = popolamento.intervallo_uscita_ms
  }

  function svuota() {
    for (let i = 0; i < inArrivo.length; i++) {
      inArrivo[i].attivo = false
    }
    daGenerare = 0
    attesa = 0
  }

  // Restituisce true nel passo esatto in cui la stanza diventa pulita.
  function aggiorna(passoMs) {
    for (let i = 0; i < inArrivo.length; i++) {
      const ingresso = inArrivo[i]
      if (!ingresso.attivo) {
        continue
      }
      ingresso.tempoMs += passoMs
      if (ingresso.tempoMs >= ingressi.preavviso_ms) {
        ingresso.attivo = false
        nemici.genera(ingresso.x, ingresso.y, stanzaCorrente)
        effetti.comparsa(ingresso.x, ingresso.y)
      }
    }

    if (daGenerare > 0) {
      attesa -= passoMs
      if (attesa <= 0) {
        accendiIngresso()
        attesa = popolamento.intervallo_uscita_ms
      }
    }

    if (daGenerare > 0 || nemici.quantiVivi() > 0) {
      return false
    }
    for (let i = 0; i < inArrivo.length; i++) {
      if (inArrivo[i].attivo) {
        return false
      }
    }
    return true
  }

  function disegna(ctx, stile) {
    for (let i = 0; i < inArrivo.length; i++) {
      const ingresso = inArrivo[i]
      if (!ingresso.attivo) {
        continue
      }
      // pulsa mentre il tempo scorre: piu' e' vicino, piu' il cerchio si chiude
      const quota = ingresso.tempoMs / ingressi.preavviso_ms
      ctx.beginPath()
      ctx.arc(ingresso.x, ingresso.y, stile.raggio * (1 - quota), 0, Math.PI * 2)
      ctx.lineWidth = stile.spessore
      ctx.strokeStyle = stile.colore
      ctx.stroke()
    }
  }

  return { apri, aggiorna, disegna, svuota }
}
