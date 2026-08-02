// La pressione dell'assedio. Nessuno chiama piu' le ondate: i due castelli
// producono truppe di continuo, e la pressione nemica sale col tempo. Sopra al
// flusso costante arrivano le spinte, in cui il castello nemico svuota le
// caserme tutte insieme. Tutto da formule, mai elenchi scritti a mano.

import { pressione, squadra } from './config.js'

function intervalloFlusso(schema, riduzionePerGrado, grado) {
  const valore = schema.intervallo_uscita_ms - riduzionePerGrado * grado
  return Math.max(schema.intervallo_minimo_ms, valore)
}

export function creaGestorePressione(truppe) {
  const flussoNemico = { attesa: 0 }
  const flussoAlleato = { attesa: 0 }
  // la spinta e' una raffica: quanti ne restano da buttare fuori e ogni quanto
  const spinta = { restanti: 0, attesa: 0 }

  let trascorsoMs = 0
  let versoSpintaMs = 0
  let grado = 0

  function reimposta() {
    flussoNemico.attesa = 0
    flussoAlleato.attesa = 0
    spinta.restanti = 0
    spinta.attesa = 0
    trascorsoMs = 0
    versoSpintaMs = 0
    grado = 0
  }

  function scorri(flusso, passoMs, intervallo, genera) {
    flusso.attesa -= passoMs
    if (flusso.attesa > 0) {
      return
    }
    genera(grado)
    flusso.attesa = intervallo
  }

  function aggiorna(passoMs) {
    trascorsoMs += passoMs
    grado = Math.floor(trascorsoMs / pressione.durata_grado_ms)

    scorri(
      flussoNemico,
      passoMs,
      intervalloFlusso(pressione, pressione.riduzione_intervallo_per_grado_ms, grado),
      truppe.generaNemico
    )
    scorri(
      flussoAlleato,
      passoMs,
      intervalloFlusso(squadra, squadra.riduzione_intervallo_per_grado_ms, grado),
      truppe.generaAlleato
    )

    // la spinta: arriva a intervalli e svuota le caserme nemiche in blocco
    versoSpintaMs += passoMs
    if (versoSpintaMs >= pressione.intervallo_spinta_ms) {
      versoSpintaMs -= pressione.intervallo_spinta_ms
      spinta.restanti =
        pressione.quantita_spinta_base + pressione.quantita_spinta_per_grado * grado
      spinta.attesa = 0
    }

    if (spinta.restanti > 0) {
      spinta.attesa -= passoMs
      if (spinta.attesa <= 0) {
        truppe.generaNemico(grado)
        spinta.restanti--
        spinta.attesa = pressione.intervallo_interno_spinta_ms
      }
    }
  }

  // il grado mostrato al giocatore parte da 1, non da 0
  function gradoMostrato() {
    return grado + 1
  }

  return { aggiorna, reimposta, gradoMostrato }
}
