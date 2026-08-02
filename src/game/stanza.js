// La stanza: decide quali nemici la popolano e dove stanno.
// I nemici sono gia' dentro quando entri — niente ondate, niente scaglioni.
// Quanti e quali lo decide un budget: ogni tipo costa il suo peso, e si pesca
// finche' il budget non e' finito. Cosi' una stanza puo' essere sei fanti
// oppure due golem e un tiratore, e due stanze non si somigliano.
// La stanza e' pulita quando non e' rimasto nessuno in piedi.

import {
  arena,
  elencoNemici,
  limiti,
  partenzaPersonaggio,
  popolamento
} from './config.js'
import { creaPool } from './pool.js'

// Quanti tentativi si fanno per trovare un posto libero prima di rinunciare a
// quel nemico: senza un tetto, una stanza affollata girerebbe all'infinito.
const TENTATIVI_PIAZZAMENTO = 30

export function creaGestoreStanza(nemici, effetti) {
  // I posti decisi all'apertura della stanza. I nemici si accendono uno alla
  // volta con un piccolo ritardo: comparire tutti nello stesso istante e' un
  // muro di rosso che l'occhio non riesce a contare.
  const posti = creaPool(limiti.nemici_massimi, () => ({
    attivo: false,
    tipo: null,
    x: 0,
    y: 0
  }))

  let quantiPosti = 0
  let prossimo = 0
  let attesa = 0
  let stanzaCorrente = 1

  function budget(stanza) {
    const valore = popolamento.budget_base + popolamento.budget_per_stanza * (stanza - 1)
    return Math.min(popolamento.budget_massimo, valore)
  }

  // Pesca fra i tipi che il budget rimanente puo' ancora permettersi. Chi pesa
  // di piu' non e' automaticamente piu' raro: la rarita' e' un valore a parte,
  // altrimenti il golem, che costa molto, finirebbe per uscire di continuo.
  function pescaTipo(rimanente) {
    let totale = 0
    for (let i = 0; i < elencoNemici.length; i++) {
      if (elencoNemici[i].peso <= rimanente) {
        totale += elencoNemici[i].frequenza
      }
    }
    if (totale === 0) {
      return null
    }
    let tiro = Math.random() * totale
    for (let i = 0; i < elencoNemici.length; i++) {
      const tipo = elencoNemici[i]
      if (tipo.peso > rimanente) {
        continue
      }
      tiro -= tipo.frequenza
      if (tiro <= 0) {
        return tipo
      }
    }
    return null
  }

  function troppoVicinoAdAltri(x, y, raggio) {
    for (let i = 0; i < quantiPosti; i++) {
      const altro = posti[i]
      const dx = altro.x - x
      const dy = altro.y - y
      const minimo = altro.tipo.dimensione + raggio
      if (dx * dx + dy * dy < minimo * minimo) {
        return true
      }
    }
    return false
  }

  // Un punto dentro i muri, libero, e lontano da dove parte il giocatore:
  // nascergli addosso non gli darebbe scampo.
  function piazza(tipo) {
    const margine = popolamento.margine_dai_muri + tipo.dimensione
    const larghezza = arena.destra - arena.sinistra - margine * 2
    const altezza = arena.basso - arena.alto - margine * 2
    const distanzaMinima = popolamento.distanza_minima_dal_personaggio

    for (let tentativo = 0; tentativo < TENTATIVI_PIAZZAMENTO; tentativo++) {
      const x = arena.sinistra + margine + Math.random() * larghezza
      const y = arena.alto + margine + Math.random() * altezza
      const dx = x - partenzaPersonaggio.x
      const dy = y - partenzaPersonaggio.y
      if (dx * dx + dy * dy < distanzaMinima * distanzaMinima) {
        continue
      }
      if (troppoVicinoAdAltri(x, y, tipo.dimensione)) {
        continue
      }
      const posto = posti[quantiPosti]
      posto.attivo = true
      posto.tipo = tipo
      posto.x = x
      posto.y = y
      quantiPosti++
      return true
    }
    return false
  }

  // Tutto il caso e tutte le decisioni stanno qui, all'apertura della stanza:
  // dentro il ciclo di gioco non si tira mai a caso e non si alloca niente.
  function apri(stanza) {
    stanzaCorrente = stanza
    quantiPosti = 0
    prossimo = 0
    attesa = 0

    let rimanente = budget(stanza)
    while (rimanente > 0 && quantiPosti < posti.length) {
      const tipo = pescaTipo(rimanente)
      if (!tipo || !piazza(tipo)) {
        break
      }
      rimanente -= tipo.peso
    }
  }

  function svuota() {
    quantiPosti = 0
    prossimo = 0
    attesa = 0
  }

  // Restituisce true nel passo esatto in cui la stanza diventa pulita.
  function aggiorna(passoMs) {
    if (prossimo < quantiPosti) {
      attesa -= passoMs
      if (attesa <= 0) {
        const posto = posti[prossimo]
        nemici.genera(posto.tipo, posto.x, posto.y, stanzaCorrente)
        effetti.comparsa(posto.x, posto.y)
        prossimo++
        attesa = popolamento.ritardo_comparsa_ms
      }
      return false
    }
    return nemici.quantiVivi() === 0
  }

  return { apri, aggiorna, svuota }
}
