// Le macchine: **la prima cosa dell'isola che lavora senza di te.**
//
// Una macchina e' una costruzione con due cassetti — entrata e uscita — e una
// ricetta che sa fare. Finche' ha materiale, combustibile e posto dove mettere
// quello che produce, va avanti da sola. **Riempirla e svuotarla e' il lavoro**,
// e resta il lavoro finche' non arriveranno i nastri.
//
// TRE COSE CHE SEMBRANO DETTAGLI E NON LO SONO
//
// 1. **Il combustibile esce dal cassetto d'entrata**, non da uno scomparto suo.
//    Sulla prima macchina del gioco uno scomparto separato vorrebbe dire due
//    viaggi di carico invece di uno, e su un telefono e' troppo. Cosi' il legno
//    e' materiale *e* combustibile insieme, ed e' vero da subito che **il legno
//    che bruci non diventa tavole**.
//
// 2. **Lo stato ha un nome, sempre.** Una macchina ferma senza dire perche'
//    sembra un guasto. Sono quattro e bastano: `lavora`, `senza_materiale`,
//    `senza_combustibile`, `uscita_piena`. Il disegno e il pannello leggono
//    quello, e nessuno dei due deve indovinare.
//
// 3. **Non si tocca nessun inventario a meta'.** Prima si controlla che ci sia
//    tutto — materiale, combustibile, posto in uscita — e solo dopo si consuma.
//    Consumare e poi accorgersi che non c'e' posto e' il modo di far sparire la
//    roba del giocatore, ed e' gia' successo altrove in questo progetto.

import { trovaCostruzione, trovaRicetta } from './config.js'
import { creaInventario } from './inventario.js'

export const LAVORA = 'lavora'
export const SENZA_MATERIALE = 'senza_materiale'
export const SENZA_COMBUSTIBILE = 'senza_combustibile'
export const USCITA_PIENA = 'uscita_piena'

export function creaMacchine() {
  const elenco = []

  function aggiungi(tx, ty, idCostruzione) {
    const dati = trovaCostruzione(idCostruzione)
    const macchina = {
      tx,
      ty,
      id: idCostruzione,
      nome: dati.nome,
      ricetta: dati.ricetta,
      combustibile: dati.combustibile,
      bruciaOgni: dati.brucia_ogni,
      entrata: creaInventario(dati.slot_entrata, dati.slot_entrata),
      uscita: creaInventario(dati.slot_uscita, dati.slot_uscita),
      // quanto manca alla fine della lavorazione in corso
      restaMs: 0,
      // quante lavorazioni dall'ultimo pezzo di combustibile bruciato
      dallUltimoFuoco: 0,
      stato: SENZA_MATERIALE,
      // **Attaccata alla corrente?** Lo decide `corrente.js`, non lei. Una
      // macchina alimentata non brucia piu' il suo combustibile: lo brucia il
      // generatore, in un posto solo. E se la corrente manca **torna a bruciare
      // il suo** invece di fermarsi: restare senza corrente costa produzione,
      // mai lavoro perso.
      alimentata: false,
      // a quale generatore, -1 se a nessuno
      rete: -1,
      // gira da 0 a 1 e ricomincia: serve solo al disegno della lama
      giro: 0
    }
    elenco.push(macchina)
    return macchina
  }

  function in_(tx, ty) {
    for (let i = 0; i < elenco.length; i++) {
      if (elenco[i].tx === tx && elenco[i].ty === ty) {
        return elenco[i]
      }
    }
    return null
  }

  // Tocca bruciare a questa lavorazione? Il combustibile non si consuma a ogni
  // giro: se lo facesse, la macchina mangerebbe tanto legno quanto ne trasforma
  // e non guadagnerebbe niente. Ogni quanto bruci sta in configurazione.
  function tocaBruciare(m) {
    return m.dallUltimoFuoco + 1 >= m.bruciaOgni
  }

  // Se e' attaccata alla corrente il combustibile lo mette il generatore, e lei
  // non ne chiede piu'. E' l'unica cosa che la corrente cambia dentro una
  // macchina: tutto il resto — materiale, tempi, cassetti — resta identico.
  function deveBruciare(m) {
    return !m.alimentata && tocaBruciare(m)
  }

  // **Si guarda tutto prima di toccare qualsiasi cosa.** L'ordine conta: se il
  // materiale manca lo stato e' quello, non "uscita piena", perche' il
  // giocatore deve sapere cosa portare.
  function cosaLeManca(m) {
    const ricetta = trovaRicetta(m.ricetta)
    let servito = 0
    for (let i = 0; i < ricetta.ingredienti.length; i++) {
      const ing = ricetta.ingredienti[i]
      let quanti = ing.quantita
      // il combustibile esce dallo stesso cassetto: se e' il giro in cui si
      // brucia, di quel materiale ne serve uno in piu'
      if (deveBruciare(m) && ing.materiale === m.combustibile) {
        quanti += 1
        servito++
      }
      if (m.entrata.quanti(ing.materiale) < quanti) {
        return servito > 0 && m.entrata.quanti(ing.materiale) >= ing.quantita
          ? SENZA_COMBUSTIBILE
          : SENZA_MATERIALE
      }
    }
    // il combustibile potrebbe non essere fra gli ingredienti
    if (deveBruciare(m) && servito === 0 && m.entrata.quanti(m.combustibile) < 1) {
      return SENZA_COMBUSTIBILE
    }
    if (m.uscita.spazioPer(ricetta.produce) < ricetta.quantita) {
      return USCITA_PIENA
    }
    return LAVORA
  }

  function consegna(m) {
    const ricetta = trovaRicetta(m.ricetta)
    for (let i = 0; i < ricetta.ingredienti.length; i++) {
      m.entrata.togli(ricetta.ingredienti[i].materiale, ricetta.ingredienti[i].quantita)
    }
    // Con la corrente il conto del fuoco **non avanza nemmeno**: il pezzo lo
    // paga il generatore. Se domani stacchi la corrente, la macchina riparte
    // da dove era rimasta invece di dover subito un pezzo.
    if (!m.alimentata) {
      if (tocaBruciare(m)) {
        m.entrata.togli(m.combustibile, 1)
        m.dallUltimoFuoco = 0
      } else {
        m.dallUltimoFuoco++
      }
    }
    m.uscita.metti(ricetta.produce, ricetta.quantita)
  }

  // Gira dentro il ciclo di gioco: **niente allocazioni qui dentro.**
  function aggiorna(passoMs) {
    for (let i = 0; i < elenco.length; i++) {
      const m = elenco[i]

      if (m.restaMs > 0) {
        m.restaMs -= passoMs
        m.stato = LAVORA
        m.giro = (m.giro + passoMs / trovaRicetta(m.ricetta).tempo_ms) % 1
        if (m.restaMs <= 0) {
          m.restaMs = 0
          consegna(m)
        }
        continue
      }

      const manca = cosaLeManca(m)
      m.stato = manca
      if (manca === LAVORA) {
        m.restaMs = trovaRicetta(m.ricetta).tempo_ms
      }
    }
  }

  // Quanto e' avanti la lavorazione, da 0 a 1: il pannello lo mostra, cosi' si
  // vede che sta succedendo qualcosa anche quando la lama e' piccola.
  function avanzamento(m) {
    if (m.restaMs <= 0) {
      return 0
    }
    const tutto = trovaRicetta(m.ricetta).tempo_ms
    return (tutto - m.restaMs) / tutto
  }

  // Cosa sa usare: gli ingredienti della sua ricetta, piu' il combustibile.
  // Serve all'interfaccia, che senza offrirebbe di posare dentro la segheria
  // dei chiodi — un bottone che promette una cosa che non succede.
  function accetta(m) {
    const ricetta = trovaRicetta(m.ricetta)
    let fuori = ''
    for (let i = 0; i < ricetta.ingredienti.length; i++) {
      fuori += (fuori ? ',' : '') + ricetta.ingredienti[i].materiale
    }
    if (fuori.split(',').indexOf(m.combustibile) < 0) {
      fuori += (fuori ? ',' : '') + m.combustibile
    }
    return fuori
  }

  function perSalvare() {
    const fuori = []
    for (let i = 0; i < elenco.length; i++) {
      const m = elenco[i]
      fuori.push({
        tx: m.tx,
        ty: m.ty,
        id: m.id,
        entrata: m.entrata.perSalvare(),
        uscita: m.uscita.perSalvare(),
        fuoco: m.dallUltimoFuoco
      })
    }
    return fuori
  }

  function daSalvato(dati) {
    elenco.length = 0
    if (!Array.isArray(dati)) {
      return
    }
    for (let i = 0; i < dati.length; i++) {
      const voce = dati[i]
      const m = aggiungi(voce.tx, voce.ty, voce.id)
      m.entrata.daSalvato(voce.entrata)
      m.uscita.daSalvato(voce.uscita)
      m.dallUltimoFuoco = voce.fuoco || 0
    }
  }

  function svuota() {
    elenco.length = 0
  }

  return { elenco, aggiungi, in: in_, aggiorna, avanzamento, accetta, perSalvare, daSalvato, svuota }
}
