// Ciclo di gioco: passo fisso di simulazione, disegno alla frequenza dello
// schermo. Dentro aggiorna() e disegna() non si creano oggetti nuovi.
//
// Il giocatore non ha un personaggio: guarda l'isola dall'alto, la sposta col
// dito, e **da' ordini**. Le azioni dell'interfaccia entrano da una coda di
// comandi e vengono eseguite dentro un passo di simulazione.
//
// Il dito ha tre modi, e ognuno si vede a schermo mentre e' acceso:
//   normale    tocchi una cosa -> ordine; tocchi un bracciante o una cassa -> la scegli
//   costruisci il prossimo tocco piazza quello che stai costruendo
//   assegna    il prossimo tocco su una cassa dice al bracciante scelto dove scaricare

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
  calpestabile,
  centroTessera,
  maturoIn,
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

  const casotto = () => casse.elenco.find((c) => c.eIlCasotto) || null

  let modo = 'normale'
  let daCostruire = ''
  let braccianteScelto = -1
  let cassaScelta = null
  let esito = ''

  const vetrina = {
    monete: 0,
    giorno: 1,
    oraDelGiorno: 0,
    zaino: 0,
    mostraRiepilogo: false,
    riepilogo: '',
    // il casotto e' anche l'ufficio: e' li' che si assume
    cassaEIlCasotto: false,
    valoreCassa: 0,
    tecnologie: '',
    // stringhe, non oggetti: l'interfaccia le confronta per capire se sono
    // cambiate, e confrontare un oggetto a ogni lettura costerebbe di piu'
    magazzino: '',
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
    caricoScelto: '',
    scaricaAScelto: '',
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

  function costruisci(tx, ty) {
    const dati = trovaCostruzione(daCostruire)
    if (!calpestabile(tx, ty) || casse.in(tx, ty)) {
      esito = 'qui non ci sta'
      return
    }
    if (!casse.paga(dati.costo)) {
      esito = 'materiali non abbastanza'
      annulla()
      return
    }
    casse.aggiungi(tx, ty, dati.capienza, false)
    esito = ''
    annulla()
  }

  function assegna(tx, ty) {
    const cassa = casse.in(tx, ty)
    if (!cassa) {
      esito = 'tocca una cassa'
      return
    }
    if (braccianteScelto >= 0) {
      squadra.squadra[braccianteScelto].scaricaA = cassa
      esito = ''
    }
    modo = 'normale'
  }

  function tocca(xSchermo, ySchermo) {
    camera.versoMondo(xSchermo, ySchermo, mondoTocco)
    tessereDaMondo(mondoTocco.x, mondoTocco.y, tessereTocco)

    if (modo === 'costruisci') {
      costruisci(tessereTocco.tx, tessereTocco.ty)
      return
    }
    if (modo === 'assegna') {
      assegna(tessereTocco.tx, tessereTocco.ty)
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

    const cosa = risorsaIn(tessereTocco.tx, tessereTocco.ty)
    if (!cosa) {
      esito = ''
      return
    }

    const gia = lavori.trovaSuTessera(tessereTocco.tx, tessereTocco.ty)
    if (gia) {
      if (gia.preso) {
        esito = 'ci sta già andando qualcuno'
      } else {
        lavori.ordina(tessereTocco.tx, tessereTocco.ty, cosa)
        esito = 'ordine annullato'
      }
      return
    }

    if (!maturoIn(tessereTocco.tx, tessereTocco.ty)) {
      esito = 'sta ancora ricrescendo'
      return
    }
    esito = lavori.ordina(tessereTocco.tx, tessereTocco.ty, cosa)
      ? ''
      : 'nessuno lo sa fare'
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
      } else if (comando.tipo === 'assegna') {
        modo = 'assegna'
        esito = ''
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

  function scriviConti(conti) {
    let riga = ''
    for (let i = 0; i < elencoMateriali.length; i++) {
      const id = elencoMateriali[i].id
      riga += (riga ? ',' : '') + id + ':' + (conti[id] || 0)
    }
    return riga
  }

  function leggiStato() {
    let riga = ''
    for (let i = 0; i < elencoMateriali.length; i++) {
      const id = elencoMateriali[i].id
      riga += (riga ? ',' : '') + id + ':' + casse.totale(id)
    }
    vetrina.magazzino = riga
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
      vetrina.caricoScelto = scriviConti(b.zaino)
      vetrina.scaricaAScelto = b.scaricaA
        ? b.scaricaA.eIlCasotto
          ? 'il casotto'
          : 'una cassa'
        : 'nessuna cassa'
    } else {
      vetrina.nomeScelto = ''
      vetrina.statoScelto = ''
      vetrina.caricoScelto = ''
      vetrina.scaricaAScelto = ''
    }

    vetrina.cassaScelta = !!cassaScelta
    vetrina.contenutoCassa = cassaScelta ? scriviConti(cassaScelta.contenuto) : ''
    vetrina.pienoCassa = cassaScelta ? cassaScelta.dentro + '/' + cassaScelta.capienza : ''
    vetrina.cassaEIlCasotto = !!(cassaScelta && cassaScelta.eIlCasotto)
    vetrina.valoreCassa = cassaScelta ? economia.valoreDi(cassaScelta) : 0

    vetrina.monete = Math.floor(economia.stato.monete)
    vetrina.giorno = giorno.stato.giorno
    vetrina.oraDelGiorno = giorno.stato.trascorsoMs / tempo.giorno_ms
    vetrina.zaino = squadra.capienzaZaino()
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
    assegna: () => accodaComando('assegna'),
    annulla: () => accodaComando('annulla'),
    vendi: () => accodaComando('vendi'),
    studia: (id) => accodaComando('studia', 0, 0, id),
    chiudiRiepilogo: () => accodaComando('chiudi_riepilogo')
  }
}
