// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Il giocatore non ha un personaggio: guarda l'isola dall'alto, la sposta col
// dito, e **da' ordini**. Le azioni dell'interfaccia entrano da una coda di
// comandi e vengono eseguite dentro un passo di simulazione.
//
// Il dito ha due modi, e si vede a schermo quando non e' quello normale:
//   normale    tocchi una cosa -> ordine; tocchi l'operaio o una cassa -> la scegli
//   costruisci il prossimo tocco piazza quello che stai costruendo
//
// Nel modo normale un tocco fa una cosa sola, e dipende da cosa c'e' sotto:
//   su un albero o un masso  -> ordine di raccolta (il secondo tocco lo disdice)
//   su terra libera          -> ordine di piantare, se ha un alberello addosso
//   su una cassa             -> la apre, e da li' si posa e si prende roba
//
// **Niente scarico automatico.** L'operaio non porta niente da nessuna parte
// se non gliel'hai detto: e' quella fatica che dara' senso ai nastri.

import {
  area,
  elencoMateriali,
  limiti,
  elencoTecnologie,
  simulazione,
  tempo,
  tessera,
  trovaCostruzione,
  trovaTecnologia
} from './config.js'
import { disegnaIsola } from './disegno.js'
import { adattaCanvas } from './schermo.js'
import { creaPool, primoLibero } from './pool.js'
import { creaCamera } from './camera.js'
import { creaLavori } from './lavori.js'
import { creaCasse } from './casse.js'
import { creaBraccianti } from './braccianti.js'
import { creaEconomia } from './economia.js'
import { creaTecnologie } from './tecnologie.js'
import { creaGiorno } from './giorno.js'
import { creaGestoreEffetti } from './effetti.js'
import {
  aggiornaMondo,
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
  const tecnologie = creaTecnologie()
  const effetti = creaGestoreEffetti()

  const centro = { x: 0, y: 0 }

  const squadra = creaBraccianti({
    casse,
    tecnologie,
    alloScarico: (cassa) => {
      centroTessera(cassa.tx, cassa.ty, centro)
      camera.versoSchermo(centro.x, centro.y, centro)
      effetti.raccolta(centro.x, centro.y)
    },
    alCambioDelMondo: () => {},
    alRaccolto: (quanti) => giorno.segnaRaccolto(quanti)
  })

  const giorno = creaGiorno(economia, { allAlba: () => {} })

  const comandi = creaPool(limiti.comandi_massimi, () => ({
    attivo: false,
    tipo: '',
    x: 0,
    y: 0,
    id: ''
  }))

  let modo = 'normale'
  let daCostruire = ''
  let braccianteScelto = -1
  let cassaScelta = null
  let esito = ''

  // L'unico operaio. Sta in un elenco perche' un giorno potrebbero essere due,
  // ma tutto quello che si comanda passa da lui.
  const operaio = () => squadra.squadra[0] || null

  // Il primo materiale che ha addosso e che si puo' piantare. Non si equipaggia
  // niente e non si sceglie nessuno strumento: **basta averlo nello zaino**.
  function daPiantare() {
    const b = operaio()
    if (!b) {
      return null
    }
    for (let i = 0; i < elencoMateriali.length; i++) {
      const m = elencoMateriali[i]
      if (m.pianta && b.inventario.quanti(m.id) > 0) {
        return m
      }
    }
    return null
  }

  const vetrina = {
    monete: 0,
    giorno: 1,
    oraDelGiorno: 0,
    slotOperaio: 0,
    inventario: '',
    zainoPieno: false,
    statoOperaio: '',
    puoPiantare: '',
    mostraRiepilogo: false,
    riepilogo: '',
    // il casotto e' anche il mercato: e' li' che si vende e si studia
    cassaEIlCasotto: false,
    valoreCassa: 0,
    tecnologie: '',
    // stringhe, non oggetti: l'interfaccia le confronta per capire se sono
    // cambiate, e confrontare un oggetto a ogni lettura costerebbe di piu'
    lavoriInAttesa: 0,
    braccantiFermi: 0,
    braccantiTotali: 0,
    zoomLontano: false,
    modo: 'normale',
    daCostruire: '',
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
    modo = 'normale'
    daCostruire = ''
    esito = ''
  }

  // Si costruisce con quello che l'operaio ha **addosso**, non con la somma di
  // tutte le casse dell'isola: quella somma sarebbe un magazzino centrale
  // travestito da contatore. Se il legno e' in una cassa lontana, prima lo
  // vai a prendere.
  function costruisci(tx, ty) {
    const dati = trovaCostruzione(daCostruire)
    const b = operaio()
    if (!piantabile(tx, ty) || casse.in(tx, ty)) {
      esito = 'qui non ci sta'
      return
    }
    if (!b) {
      return
    }
    for (let i = 0; i < dati.costo.length; i++) {
      if (b.inventario.quanti(dati.costo[i].materiale) < dati.costo[i].quantita) {
        esito = 'non ha i materiali addosso'
        annulla()
        return
      }
    }
    for (let i = 0; i < dati.costo.length; i++) {
      b.inventario.togli(dati.costo[i].materiale, dati.costo[i].quantita)
    }
    casse.aggiungi(tx, ty, dati.slot, false)
    esito = ''
    annulla()
  }

  function tocca(xSchermo, ySchermo) {
    camera.versoMondo(xSchermo, ySchermo, mondoTocco)
    tessereDaMondo(mondoTocco.x, mondoTocco.y, tessereTocco)

    if (modo === 'costruisci') {
      costruisci(tessereTocco.tx, tessereTocco.ty)
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
      if (gia.preso) {
        esito = 'ci sta già andando'
      } else {
        gia.attivo = false
        esito = 'ordine annullato'
      }
      return
    }

    const cosa = risorsaIn(tessereTocco.tx, tessereTocco.ty)

    // terra libera: si pianta, se ha qualcosa da piantare addosso
    if (!cosa) {
      if (!piantabile(tessereTocco.tx, tessereTocco.ty)) {
        esito = ''
        return
      }
      const seme = daPiantare()
      if (!seme) {
        esito = 'non ha alberelli addosso'
        return
      }
      esito = lavori.ordinaPiantata(
        tessereTocco.tx,
        tessereTocco.ty,
        seme.id,
        seme.pianta
      )
        ? ''
        : 'qui non si può piantare'
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

  // Le tecnologie si comprano al casotto. Con un operaio solo **questa e'
  // l'unica via di crescita**: non si assume, si migliora.
  function studia(idTecnologia) {
    const dati = trovaTecnologia(idTecnologia)
    if (!tecnologie.disponibile(idTecnologia)) {
      esito = 'non ancora'
      return
    }
    if (!economia.paga(dati.costo)) {
      esito = 'monete non abbastanza'
      return
    }
    tecnologie.prendi(idTecnologia)
    esito = ''
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
      if (comando.tipo === 'tocca') {
        tocca(comando.x, comando.y)
      } else if (comando.tipo === 'trascina') {
        camera.trascina(comando.x, comando.y)
      } else if (comando.tipo === 'zoom') {
        camera.cambiaZoom()
      } else if (comando.tipo === 'costruisci') {
        modo = 'costruisci'
        daCostruire = comando.id
        cassaScelta = null
        braccianteScelto = -1
        esito = ''
      } else if (comando.tipo === 'deposita' || comando.tipo === 'preleva') {
        scambia(comando.tipo, comando.id)
      } else if (comando.tipo === 'annulla') {
        annulla()
        braccianteScelto = -1
        cassaScelta = null
      } else if (comando.tipo === 'vendi') {
        if (cassaScelta) {
          giorno.segnaIncasso(economia.vendiCassa(casse, cassaScelta))
        }
      } else if (comando.tipo === 'studia') {
        studia(comando.id)
      } else if (comando.tipo === 'chiudi_riepilogo') {
        giorno.chiudiRiepilogo()
      }
    }
  }

  function ridimensiona(larghezzaDisponibile, altezzaDisponibile) {
    ctxGioco = adattaCanvas(canvasGioco, area, larghezzaDisponibile, altezzaDisponibile)
  }

  function aggiorna() {
    eseguiComandi()
    aggiornaMondo(simulazione.passo_ms)
    squadra.aggiorna(lavori, simulazione.passo_ms, simulazione.passo_ms / 1000)
    giorno.aggiorna(simulazione.passo_ms)
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
      cassaScelta
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
  }

  function avvia() {
    ultimoTempo = performance.now()
    accumulato = 0
    richiesta = requestAnimationFrame(frame)
  }

  function ferma() {
    cancelAnimationFrame(richiesta)
    richiesta = 0
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
    vetrina.modo = modo
    vetrina.daCostruire = daCostruire
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
    vetrina.giorno = giorno.stato.giorno
    vetrina.oraDelGiorno = giorno.stato.trascorsoMs / tempo.giorno_ms
    const b = operaio()
    vetrina.slotOperaio = squadra.slotAdesso()
    vetrina.inventario = b ? scriviInventario(b.inventario) : ''
    // "pieno" per chi guarda vuol dire "non ci sta piu' niente di nuovo": tutte
    // le caselle occupate. Le pile a meta' non consolano nessuno.
    vetrina.zainoPieno = b ? b.inventario.caselleLibere() === 0 : false
    vetrina.statoOperaio = b ? b.stato : ''
    const seme = daPiantare()
    vetrina.puoPiantare = seme ? seme.nome : ''
    vetrina.mostraRiepilogo = giorno.stato.mostraRiepilogo
    vetrina.riepilogo = giorno.stato.mostraRiepilogo
      ? [
          giorno.riepilogo.giorno,
          giorno.riepilogo.incassato,
          giorno.riepilogo.raccolto
        ].join(',')
      : ''

    // lo stato dell'albero: "id:presa|disponibile|bloccata"
    let albero = ''
    for (let i = 0; i < elencoTecnologie.length; i++) {
      const t = elencoTecnologie[i]
      const stato = tecnologie.hoGiaPreso(t.id)
        ? 'presa'
        : tecnologie.disponibile(t.id)
          ? 'libera'
          : 'bloccata'
      albero += (albero ? ',' : '') + t.id + ':' + stato
    }
    vetrina.tecnologie = albero

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
    costruisci: (id) => accodaComando('costruisci', 0, 0, id),
    deposita: (id) => accodaComando('deposita', 0, 0, id),
    preleva: (id) => accodaComando('preleva', 0, 0, id),
    annulla: () => accodaComando('annulla'),
    vendi: () => accodaComando('vendi'),
    studia: (id) => accodaComando('studia', 0, 0, id),
    chiudiRiepilogo: () => accodaComando('chiudi_riepilogo')
  }
}
