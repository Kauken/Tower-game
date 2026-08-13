// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Il giocatore non ha un personaggio: guarda l'isola dall'alto, la sposta col
// dito, e **da' ordini**. Le azioni dell'interfaccia entrano da una coda di
// comandi e vengono eseguite dentro un passo di simulazione.
//
// **Quello che fa un tocco dipende da cosa hai in mano.** E' il modello che
// vale per tutto il gioco, adesso e quando le cose piazzabili saranno dieci.
//
// A MANI VUOTE il tocco e' un ordine:
//   su un albero o un masso  -> ordine di raccolta (il secondo tocco lo disdice)
//   su una cassa             -> la apre, e da li' si posa e si prende roba
//   sull'operaio             -> guardi cosa sta facendo
//   sul terreno vuoto        -> NON SUCCEDE NIENTE. Mai.
//
// CON QUALCOSA IN MANO il tocco piazza, e **resti in mano**: cosi' ne pianti
// dieci di fila senza rientrare nel menu'. Si riprende toccando di nuovo la
// casella, o con Annulla.
//
// Un'azione che parte senza che il giocatore l'abbia scelta e' sempre
// sbagliata, e lo diventa dieci volte tanto quando le cose piazzabili sono
// dieci invece di una. Vedi GDD 4.
//
// **Niente scarico automatico.** L'operaio non porta niente da nessuna parte
// se non gliel'hai detto: e' quella fatica che dara' senso ai nastri.

import {
  area,
  elencoMateriali,
  limiti,
  salvataggio as regoleSalvataggio,
  elencoProgetti,
  elencoRicette,
  simulazione,
  tessera,
  trovaCostruzione,
  trovaProgetto
} from './config.js'
import { disegnaIsola } from './disegno.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaCamera } from './camera.js'
import { creaLavori } from './lavori.js'
import { creaCasse } from './casse.js'
import { creaBraccianti } from './braccianti.js'
import { creaEconomia } from './economia.js'
import { creaProgetti } from './progetti.js'
import { creaGestoreEffetti } from './effetti.js'
import { cancella, leggi, scrivi, tempoPassato } from './salvataggio.js'
import {
  aggiornaMondo,
  mondoDaSalvato,
  mondoPerSalvare,
  centroTessera,
  maturoIn,
  piantabile,
  risorsaIn,
  tessereDaMondo
} from './mondo.js'

export function creaMotore(canvasGioco) {
  const camera = creaCamera()
  const lavori = creaLavori()
  const casse = creaCasse()
  const economia = creaEconomia()
  const progetti = creaProgetti()
  const effetti = creaGestoreEffetti()

  const centro = { x: 0, y: 0 }

  const squadra = creaBraccianti({
    casse,
    progetti,
    alloScarico: (cassa) => {
      centroTessera(cassa.tx, cassa.ty, centro)
      camera.versoSchermo(centro.x, centro.y, centro)
      effetti.raccolta(centro.x, centro.y)
    },
    alCambioDelMondo: () => segna(),
    alFabbricato: (id) => progetti.segnaFatto(id)
  })

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0,
    id: ''
  }))

  // Cosa hai in mano: null, oppure { tipo: 'materiale'|'costruzione', id }.
  // Finche' c'e' qualcosa qui dentro, ogni tocco sulla mappa piazza.
  let inMano = null
  // Dove sta puntando il dito adesso, mentre e' premuto. Serve a far vedere
  // **prima** dove andra' a finire: su un telefono non esiste il passaggio del
  // mouse, e senza questo si piazzerebbe alla cieca.
  const mira = { attiva: false, tx: 0, ty: 0, valida: false }
  let braccianteScelto = -1
  let cassaScelta = null
  let esito = ''

  // L'unico operaio. Sta in un elenco perche' un giorno potrebbero essere due,
  // ma tutto quello che si comanda passa da lui.
  const operaio = () => squadra.squadra[0] || null

  function materiale(id) {
    return elencoMateriali.find((m) => m.id === id) || null
  }

  // Quanti ne restano di quello che hai in mano: e' il numero che si legge
  // nella striscia in alto, ed e' quello che dice quando riporre da soli.
  function quantiInMano() {
    if (!inMano) {
      return 0
    }
    const b = operaio()
    if (inMano.tipo === 'materiale') {
      return b ? b.inventario.quanti(inMano.id) : 0
    }
    // di una costruzione ne hai quante ne puoi pagare con quello che ha addosso
    const dati = trovaCostruzione(inMano.id)
    let quante = Infinity
    for (let i = 0; i < dati.costo.length; i++) {
      const disponibili = b ? b.inventario.quanti(dati.costo[i].materiale) : 0
      quante = Math.min(quante, Math.floor(disponibili / dati.costo[i].quantita))
    }
    return quante === Infinity ? 0 : quante
  }

  function nomeInMano() {
    if (!inMano) {
      return ''
    }
    if (inMano.tipo === 'materiale') {
      const m = materiale(inMano.id)
      return m ? m.nome : ''
    }
    return trovaCostruzione(inMano.id).nome
  }

  // Si puo' piazzare li'? Vale identico per un alberello e per una cassa: e'
  // la stessa domanda, ed e' per questo che il gesto e' uno solo.
  function puoPiazzareIn(tx, ty) {
    if (!inMano) {
      return false
    }
    return piantabile(tx, ty) && !casse.in(tx, ty)
  }

  function prendiInMano(tipo, id) {
    if (inMano && inMano.tipo === tipo && inMano.id === id) {
      inMano = null
      esito = ''
      return
    }
    inMano = { tipo, id }
    braccianteScelto = -1
    cassaScelta = null
    esito = ''
  }

  function riponi() {
    inMano = null
    mira.attiva = false
    esito = ''
  }

  const vetrina = {
    monete: 0,
    slotOperaio: 0,
    inventario: '',
    zainoPieno: false,
    statoOperaio: '',
    // il casotto e' anche il mercato: e' li' che si vende e si studia
    cassaEIlCasotto: false,
    valoreCassa: 0,
    // "id:comprato|libero|bloccato|fatto" per ogni progetto
    progetti: '',
    // "id:si|no" — se la ricetta e' aperta e se ha gli ingredienti addosso
    ricette: '',
    // stringhe, non oggetti: l'interfaccia le confronta per capire se sono
    // cambiate, e confrontare un oggetto a ogni lettura costerebbe di piu'
    lavoriInAttesa: 0,
    braccantiFermi: 0,
    braccantiTotali: 0,
    zoomLontano: false,
    // cosa hai in mano, e quanti te ne restano
    inManoTipo: '',
    inManoId: '',
    inManoNome: '',
    inManoQuanti: 0,
    esito: '',
    // il bracciante scelto
    braccianteScelto: -1,
    nomeScelto: '',
    statoScelto: '',
    // la cassa scelta
    cassaScelta: false,
    contenutoCassa: '',
    pienoCassa: ''
  }

  let ctxGioco = null
  let ultimoTempo = 0
  let accumulato = 0
  let richiesta = 0

  // --- salvataggio ---
  //
  // **Mai dentro il ciclo di gioco.** Si segna che c'e' qualcosa da salvare, e
  // si scrive fuori, non piu' spesso di quanto dice la configurazione:
  // scrivere a ogni gesto ruberebbe fotogrammi.
  let daSalvare = false
  let ultimoSalvataggio = 0

  function segna() {
    daSalvare = true
  }

  function raccogliDati() {
    return {
      monete: economia.stato.monete,
      progetti: progetti.perSalvare(),
      mondo: mondoPerSalvare(),
      casse: casse.perSalvare(),
      operai: squadra.perSalvare(),
      lavori: lavori.perSalvare()
    }
  }

  function salva() {
    daSalvare = false
    ultimoSalvataggio = performance.now()
    scrivi(raccogliDati())
  }

  function salvaSubito() {
    salva()
  }

  // Il rientro. **Le macchine vanno avanti, l'operaio no**: e' lui la risorsa
  // scarsa, e il suo tempo non puo' passare mentre non guardi.
  //
  // Si avanza a passi grossi: quattro ore a passi da 16 ms sarebbero un milione
  // di giri, e il gioco si aprirebbe dopo dieci secondi di schermo nero.
  function recupera(passatoMs) {
    let resta = passatoMs
    const passo = regoleSalvataggio.passo_recupero_ms
    while (resta > 0) {
      aggiornaMondo(Math.min(passo, resta))
      resta -= passo
    }
  }

  function ripristina() {
    const dati = leggi()
    if (!dati) {
      return false
    }
    // il mondo per primo: le casse e l'operaio ci stanno sopra
    if (!mondoDaSalvato(dati.mondo)) {
      cancella()
      return false
    }
    // i progetti prima dell'operaio: sono gli attrezzi fabbricati a dire
    // quante caselle ha lo zaino
    progetti.daSalvato(dati.progetti)
    economia.stato.monete = dati.monete || 0
    casse.daSalvato(dati.casse)
    squadra.daSalvato(dati.operai)
    lavori.daSalvato(dati.lavori)
    recupera(tempoPassato(dati.salvatoIl))
    // si riscrive subito: se il tempo recuperato non venisse fissato, alla
    // riapertura dopo un blocco verrebbe contato una seconda volta
    segna()
    return true
  }

  function accodaComando(tipo, x, y, id) {
    const comando = primoLibero(comandi)
    if (!comando) {
      return
    }
    comando.attivo = true
    comando.tipo = tipo
    comando.x = x || 0
    comando.y = y || 0
    comando.id = id || ''
  }

  const mondoTocco = { x: 0, y: 0 }
  const tessereTocco = { tx: 0, ty: 0 }

  function braccianteVicino(x, y) {
    const soglia = tessera * 0.6
    for (let i = 0; i < squadra.squadra.length; i++) {
      const b = squadra.squadra[i]
      if (Math.abs(b.x - x) <= soglia && Math.abs(b.y - y) <= soglia) {
        return i
      }
    }
    return -1
  }

  function annulla() {
    riponi()
    braccianteScelto = -1
    cassaScelta = null
  }

  // Si costruisce con quello che l'operaio ha **addosso**, non con la somma di
  // tutte le casse dell'isola: quella somma sarebbe un magazzino centrale
  // travestito da contatore. Se il legno e' in una cassa lontana, prima lo
  // vai a prendere.
  function costruisci(tx, ty) {
    const dati = trovaCostruzione(inMano.id)
    const b = operaio()
    if (!b) {
      return
    }
    for (let i = 0; i < dati.costo.length; i++) {
      if (b.inventario.quanti(dati.costo[i].materiale) < dati.costo[i].quantita) {
        esito = 'non ha i materiali addosso'
        return
      }
    }
    for (let i = 0; i < dati.costo.length; i++) {
      b.inventario.togli(dati.costo[i].materiale, dati.costo[i].quantita)
    }
    casse.aggiungi(tx, ty, dati.slot, false)
    esito = ''
  }

  // Piazza quello che hai in mano. **Non lo riponi**: ne piazzi un altro col
  // tocco dopo, e si riprende da soli solo quando finiscono.
  function piazza(tx, ty) {
    if (!puoPiazzareIn(tx, ty)) {
      esito = 'qui non ci sta'
      return
    }
    if (inMano.tipo === 'costruzione') {
      costruisci(tx, ty)
    } else {
      const m = materiale(inMano.id)
      const b = operaio()
      if (!m || !m.pianta || !b || b.inventario.quanti(m.id) <= 0) {
        esito = 'non ne ha piu\u2019'
        riponi()
        return
      }
      esito = lavori.ordinaPiantata(tx, ty, m.id, m.pianta) ? '' : 'troppi ordini in coda'
    }
  }

  function tocca(xSchermo, ySchermo) {
    camera.versoMondo(xSchermo, ySchermo, mondoTocco)
    tessereDaMondo(mondoTocco.x, mondoTocco.y, tessereTocco)

    // con qualcosa in mano il tocco piazza, e non fa nient'altro
    if (inMano) {
      piazza(tessereTocco.tx, tessereTocco.ty)
      return
    }

    // un bracciante ha la precedenza: e' piu' piccolo di una tessera e chi lo
    // tocca voleva lui, non il terreno sotto
    const quale = braccianteVicino(mondoTocco.x, mondoTocco.y)
    if (quale >= 0) {
      braccianteScelto = braccianteScelto === quale ? -1 : quale
      cassaScelta = null
      esito = ''
      return
    }

    const cassa = casse.in(tessereTocco.tx, tessereTocco.ty)
    if (cassa) {
      cassaScelta = cassaScelta === cassa ? null : cassa
      braccianteScelto = -1
      esito = ''
      return
    }

    braccianteScelto = -1
    cassaScelta = null

    const gia = lavori.trovaSuTessera(tessereTocco.tx, tessereTocco.ty)
    if (gia) {
      // uno scavo non finisce da solo: il secondo tocco lo ferma sempre,
      // anche mentre ci sta lavorando sopra
      if (gia.preso && !gia.ripetuto) {
        esito = 'ci sta già andando'
      } else {
        gia.attivo = false
        esito = gia.ripetuto ? 'basta scavare' : 'ordine annullato'
      }
      return
    }

    const cosa = risorsaIn(tessereTocco.tx, tessereTocco.ty)

    // **terra libera: non succede niente.** Per piantare qualcosa lo devi
    // prima prendere in mano, e questo e' esattamente il punto: un'azione che
    // parte da sola si fa per sbaglio.
    if (!cosa) {
      esito = ''
      return
    }

    if (!maturoIn(tessereTocco.tx, tessereTocco.ty)) {
      esito = 'sta ancora crescendo'
      return
    }
    esito = lavori.ordinaRaccolta(tessereTocco.tx, tessereTocco.ty, cosa)
      ? ''
      : 'non si può raccogliere'
  }

  // I progetti si comprano al casotto. **Quello che compri e' il diritto**, non
  // la cosa: la cosa te la fabbrichi al banco, coi materiali. Con un operaio
  // solo questa e' l'unica via di crescita — non si assume, si migliora.
  function compra(idProgetto) {
    const dati = trovaProgetto(idProgetto)
    if (!progetti.disponibile(idProgetto)) {
      esito = 'non ancora'
      return
    }
    if (!economia.paga(dati.costo)) {
      esito = 'monete non abbastanza'
      return
    }
    progetti.compra(idProgetto)
    esito = ''
  }

  // Fabbricare: l'ordine si da' dal casotto, e l'operaio ci va. Gli
  // ingredienti li deve avere **addosso**, come per costruire.
  function fabbrica(idRicetta) {
    if (!cassaScelta || !cassaScelta.eIlCasotto) {
      return
    }
    if (!progetti.ricettaAperta(idRicetta)) {
      esito = 'non ancora'
      return
    }
    esito = lavori.ordinaFabbrica(cassaScelta.tx, cassaScelta.ty, idRicetta)
      ? ''
      : 'troppi ordini in coda'
  }

  // Dove sta puntando il dito **mentre e' ancora premuto**. Su un telefono non
  // esiste il passaggio del mouse: senza questo si piazzerebbe alla cieca, e
  // con un pollice su uno schermo piccolo si sbaglia tessera di continuo.
  function punta(xSchermo, ySchermo) {
    if (!inMano) {
      mira.attiva = false
      return
    }
    camera.versoMondo(xSchermo, ySchermo, mondoTocco)
    tessereDaMondo(mondoTocco.x, mondoTocco.y, tessereTocco)
    mira.attiva = true
    mira.tx = tessereTocco.tx
    mira.ty = tessereTocco.ty
    mira.valida = puoPiazzareIn(tessereTocco.tx, tessereTocco.ty)
  }

  // Posare o prendere roba da una cassa. **E' un ordine, non un automatismo**:
  // l'operaio ci va, e nel frattempo la roba resta dov'e'. Un materiale vuoto
  // vuol dire "tutto quello che ci sta".
  function scambia(azione, idMateriale) {
    if (!cassaScelta) {
      return
    }
    const b = operaio()
    if (!b) {
      return
    }
    const da = azione === 'deposita' ? b.inventario : cassaScelta.inventario
    const a = azione === 'deposita' ? cassaScelta.inventario : b.inventario
    if (idMateriale ? da.quanti(idMateriale) <= 0 : da.stato.pezzi <= 0) {
      esito = azione === 'deposita' ? 'non ha niente da posare' : 'la cassa è vuota'
      return
    }
    if (a.pieno()) {
      esito = azione === 'deposita' ? 'la cassa è piena' : 'lo zaino è pieno'
      return
    }
    esito = lavori.ordinaScambio(azione, cassaScelta.tx, cassaScelta.ty, idMateriale)
      ? ''
      : 'troppi ordini in coda'
  }

  function eseguiComandi() {
    for (let i = 0; i < comandi.length; i++) {
      const comando = comandi[i]
      if (!comando.attivo) {
        continue
      }
      comando.attivo = false
      // puntare e trascinare non cambiano il mondo: tutto il resto si'
      if (comando.tipo !== 'punta' && comando.tipo !== 'spunta' && comando.tipo !== 'trascina') {
        segna()
      }
      if (comando.tipo === 'tocca') {
        tocca(comando.x, comando.y)
      } else if (comando.tipo === 'trascina') {
        camera.trascina(comando.x, comando.y)
      } else if (comando.tipo === 'zoom') {
        camera.cambiaZoom()
      } else if (comando.tipo === 'prendi') {
        prendiInMano(comando.id.slice(0, comando.id.indexOf(':')), comando.id.slice(comando.id.indexOf(':') + 1))
      } else if (comando.tipo === 'punta') {
        punta(comando.x, comando.y)
      } else if (comando.tipo === 'spunta') {
        mira.attiva = false
      } else if (comando.tipo === 'deposita' || comando.tipo === 'preleva') {
        scambia(comando.tipo, comando.id)
      } else if (comando.tipo === 'annulla') {
        annulla()
      } else if (comando.tipo === 'vendi') {
        // il mercante sta al casotto e non ti segue: portarci la roba fa
        // parte del prezzo
        if (cassaScelta && cassaScelta.eIlCasotto) {
          economia.vendiCassa(casse, cassaScelta)
        }
      } else if (comando.tipo === 'compra') {
        compra(comando.id)
      } else if (comando.tipo === 'fabbrica') {
        fabbrica(comando.id)
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
  }

  function aggiorna() {
    eseguiComandi()
    // Si ripone da soli quando finiscono. Va controllato **qui e non quando si
    // piazza**: piazzare un alberello mette in coda un ordine, e il pezzo esce
    // dallo zaino solo quando l'operaio ci arriva. Restare con una mano vuota
    // che dice di avere qualcosa e' il modo piu' facile per piazzare il nulla.
    if (inMano && quantiInMano() <= 0) {
      riponi()
    }
    aggiornaMondo(simulazione.passo_ms)
    squadra.aggiorna(lavori, simulazione.passo_ms, simulazione.passo_ms / 1000)
    effetti.aggiorna(simulazione.passo_ms)
  }

  function disegna() {
    ctxGioco.clearRect(0, 0, area.larghezza, area.altezza)
    disegnaIsola(
      ctxGioco,
      camera,
      lavori,
      squadra.squadra,
      casse.elenco,
      braccianteScelto,
      cassaScelta,
      mira
    )
    effetti.disegna(ctxGioco)
  }

  function frame(istante) {
    richiesta = requestAnimationFrame(frame)

    accumulato += istante - ultimoTempo
    ultimoTempo = istante
    const tetto = simulazione.passi_massimi_per_frame * simulazione.passo_ms
    if (accumulato > tetto) {
      accumulato = tetto
    }
    while (accumulato >= simulazione.passo_ms) {
      aggiorna()
      accumulato -= simulazione.passo_ms
    }

    disegna()

    // fuori dal ciclo di simulazione, e non piu' spesso del dovuto
    if (daSalvare && istante - ultimoSalvataggio >= regoleSalvataggio.intervallo_minimo_ms) {
      salva()
    }
  }

  function avvia() {
    ripristina()
    ultimoSalvataggio = performance.now()
    ultimoTempo = performance.now()
    accumulato = 0
    richiesta = requestAnimationFrame(frame)
  }

  function ferma() {
    cancelAnimationFrame(richiesta)
    richiesta = 0
    salva()
  }

  // --- comunicazione con l'interfaccia ---

  // Un inventario diventa una riga sola, **una casella per volta**:
  // "legno:40,legno:12,alberello:3,,,". L'interfaccia la confronta con quella
  // di prima per capire se e' cambiato qualcosa, e confrontare un oggetto a
  // ogni lettura costerebbe di piu'.
  function scriviInventario(inventario) {
    let riga = ''
    for (let i = 0; i < inventario.stato.attivi; i++) {
      const casella = inventario.slot[i]
      riga += (i ? ',' : '') + (casella.materiale ? casella.materiale + ':' + casella.quantita : '')
    }
    return riga
  }

  function leggiStato() {
    vetrina.lavoriInAttesa = lavori.quantiInAttesa()
    vetrina.braccantiFermi = squadra.quantiFermi()
    vetrina.braccantiTotali = squadra.squadra.length
    vetrina.zoomLontano = camera.stato.livello > 0
    vetrina.inManoTipo = inMano ? inMano.tipo : ''
    vetrina.inManoId = inMano ? inMano.id : ''
    vetrina.inManoNome = inMano ? nomeInMano() : ''
    vetrina.inManoQuanti = inMano ? quantiInMano() : 0
    vetrina.esito = esito

    vetrina.braccianteScelto = braccianteScelto
    if (braccianteScelto >= 0) {
      const b = squadra.squadra[braccianteScelto]
      vetrina.nomeScelto = b.nome
      vetrina.statoScelto = b.stato
    } else {
      vetrina.nomeScelto = ''
      vetrina.statoScelto = ''
    }

    vetrina.cassaScelta = !!cassaScelta
    vetrina.contenutoCassa = cassaScelta ? scriviInventario(cassaScelta.inventario) : ''
    vetrina.pienoCassa = cassaScelta ? casse.pienaDel(cassaScelta) + ' caselle' : ''
    vetrina.cassaEIlCasotto = !!(cassaScelta && cassaScelta.eIlCasotto)
    vetrina.valoreCassa = cassaScelta ? economia.valoreDi(cassaScelta) : 0

    vetrina.monete = Math.floor(economia.stato.monete)
    const b = operaio()
    vetrina.slotOperaio = squadra.slotAdesso()
    vetrina.inventario = b ? scriviInventario(b.inventario) : ''
    // "pieno" per chi guarda vuol dire "non ci sta piu' niente di nuovo": tutte
    // le caselle occupate. Le pile a meta' non consolano nessuno.
    vetrina.zainoPieno = b ? b.inventario.caselleLibere() === 0 : false
    vetrina.statoOperaio = b ? b.stato : ''
    // la bacheca: comprato, libero (te lo puoi permettere o no lo dice
    // l'interfaccia), bloccato da un altro progetto, oppure gia' fabbricato
    let bacheca = ''
    for (let i = 0; i < elencoProgetti.length; i++) {
      const t = elencoProgetti[i]
      const stato = progetti.hoFatto(t.id)
        ? 'fatto'
        : progetti.hoComprato(t.id)
          ? 'comprato'
          : progetti.disponibile(t.id)
            ? 'libero'
            : 'bloccato'
      bacheca += (bacheca ? ',' : '') + t.id + ':' + stato
    }
    vetrina.progetti = bacheca

    // le ricette che si possono fare adesso, e se ha gli ingredienti addosso
    let banco = ''
    for (let i = 0; i < elencoRicette.length; i++) {
      const r = elencoRicette[i]
      if (!progetti.ricettaAperta(r.id)) {
        continue
      }
      let ha = !!b
      for (let c = 0; ha && c < r.ingredienti.length; c++) {
        ha = b.inventario.quanti(r.ingredienti[c].materiale) >= r.ingredienti[c].quantita
      }
      banco += (banco ? ',' : '') + r.id + ':' + (ha ? 'si' : 'no')

    }
    vetrina.ricette = banco

    return vetrina
  }

  return {
    avvia,
    ferma,
    ridimensiona,
    leggiStato,
    tocca: (x, y) => accodaComando('tocca', x, y),
    trascina: (dx, dy) => accodaComando('trascina', dx, dy),
    zoom: () => accodaComando('zoom'),
    prendi: (tipo, id) => accodaComando('prendi', 0, 0, tipo + ':' + id),
    punta: (x, y) => accodaComando('punta', x, y),
    spunta: () => accodaComando('spunta'),
    deposita: (id) => accodaComando('deposita', 0, 0, id),
    preleva: (id) => accodaComando('preleva', 0, 0, id),
    annulla: () => accodaComando('annulla'),
    vendi: () => accodaComando('vendi'),
    compra: (id) => accodaComando('compra', 0, 0, id),
    fabbrica: (id) => accodaComando('fabbrica', 0, 0, id),
    salvaSubito
  }
}
