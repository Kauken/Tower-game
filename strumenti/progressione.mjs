// **La partita intera, dall'inizio, senza disegnarla.**
//
// `npm run simula` risponde a "quanto vale un minuto dell'operaio".
// Questo risponde a una domanda diversa, e per la progressione e' LA domanda:
//
//     QUANTO CI METTI AD ARRIVARE AL PROGETTO NUMERO 5?
//
// Un minuto che rende bene non dice niente sulla curva. La curva si vede solo
// giocando la partita dall'inizio alla fine e guardando **i buchi fra uno
// sblocco e il successivo**: se il primo arriva in due minuti e il quarto in
// quaranta, la curva e' rotta, e nessuna misura di monete/minuto lo mostra.
//
// Si usa cosi':      npm run progressione
//
// COSA SIMULA, DICHIARATO
// L'operaio raccoglie, porta al casotto, vende, e quando puo' permettersi il
// progetto piu' economico disponibile lo compra e poi **se lo fabbrica** -
// perche' comprare il progetto e' solo meta': l'effetto si accende quando la
// cosa e' fatta davvero.
//
// COSA NON SIMULA, DICHIARATO ALTRETTANTO
// - Il giocatore qui e' ordinato e non sbaglia mai: vende tutto, compra sempre
//   il piu' economico, non cambia idea. Un giocatore vero e' peggio, quindi
//   **i tempi veri saranno piu' lunghi di questi**, mai piu' corti.
// - Vende tutto quello che raccoglie mentre mette da parte le monete, e poi
//   torna a raccogliere i materiali per fabbricare. Chi gioca terrebbe da
//   parte le tavole: e' un altro motivo per cui questi tempi sono un TETTO.

import { createServer } from 'vite'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error'
})
const carica = (via) => vite.ssrLoadModule(via)

const config = await carica('/src/game/config.js')
const mondo = await carica('/src/game/mondo.js')
const { creaLavori } = await carica('/src/game/lavori.js')
const { creaCasse } = await carica('/src/game/casse.js')
const { creaProgetti } = await carica('/src/game/progetti.js')
const { creaEconomia } = await carica('/src/game/economia.js')
const { creaBraccianti } = await carica('/src/game/braccianti.js')

const PASSO = config.simulazione.passo_ms

// --- dove si trova cosa, sulla mappa vera ---------------------------------
//
// Non e' una lista scritta a mano: si chiede al mondo dov'e' ogni cosa, cosi'
// se la mappa cambia questo strumento continua a funzionare. E' importante
// perche' la decisione aperta A3 e' proprio "spostiamo le fonti piu' lontano?".

function tessereCon(quali) {
  const trovate = []
  for (let ty = 0; ty < mondo.filari; ty++) {
    for (let tx = 0; tx < mondo.colonne; tx++) {
      const cosa = mondo.risorsaIn(tx, ty)
      if (cosa && quali.includes(cosa)) {
        trovate.push([tx, ty])
      }
    }
  }
  return trovate
}

// Da quale risorsa si tira fuori un certo materiale grezzo. Si legge dalla
// configurazione, non da un elenco scritto a mano: gli OSTACOLI dichiarano
// delle `rese`, i GIACIMENTI un `materiale`. Sono due famiglie diverse e qui
// vanno trattate insieme, perche' all'operaio che deve procurarsi del rame non
// importa da quale delle due viene.
const DA_DOVE = {}
function segna(materiale, chiave) {
  if (!DA_DOVE[materiale]) DA_DOVE[materiale] = []
  if (!DA_DOVE[materiale].includes(chiave)) DA_DOVE[materiale].push(chiave)
}
for (const [chiave, r] of Object.entries(config.risorse)) {
  if (chiave.startsWith('_') || !r || typeof r !== 'object') continue
  if (r.materiale) segna(r.materiale, chiave)
  for (const resa of r.rese || []) segna(resa.materiale, chiave)
}

// --- l'albero dei materiali ----------------------------------------------
//
// Per fabbricare l'ascia servono tavole e chiodi; per le tavole serve legno.
// Questo srotola la catena fino ai materiali che si prendono dall'isola, e
// tiene conto delle RESE: una ricetta che da' 2 tavole per 1 legno non chiede
// un legno per tavola.

const ricettaChe = (materiale) =>
  config.elencoRicette.find((r) => r.produce === materiale)

function grezziPer(ingredienti, dentro = {}) {
  for (const ing of ingredienti) {
    const ricetta = ricettaChe(ing.materiale)
    if (!ricetta) {
      dentro[ing.materiale] = (dentro[ing.materiale] || 0) + ing.quantita
      continue
    }
    const volte = Math.ceil(ing.quantita / ricetta.quantita)
    for (const sotto of ricetta.ingredienti) {
      grezziPer([{ materiale: sotto.materiale, quantita: sotto.quantita * volte }], dentro)
    }
  }
  return dentro
}

// **Il piano si ricalcola ogni volta, invece di essere una lista di passi.**
//
// La prima versione teneva una lista ("prima due tavole, poi i chiodi, poi
// l'ascia") e la sbarrava mano a mano. Si e' rotta subito: se lo zaino e'
// pieno la fabbricazione fallisce in silenzio, la lista va avanti lo stesso, e
// l'operaio resta fermo per sempre davanti a una ricetta che non puo' fare.
//
// Cosi' invece non c'e' niente da tenere allineato: si guarda cosa manca
// ADESSO e si fa il passo piu' profondo che si puo' fare. Se qualcosa va
// storto, al giro dopo si ricalcola da solo.
function pianifica(ingredienti, inventario) {
  for (const ing of ingredienti) {
    if (inventario.quanti(ing.materiale) >= ing.quantita) continue
    const r = ricettaChe(ing.materiale)
    if (!r) return { prendi: ing.materiale, quanti: ing.quantita }
    const sotto = pianifica(r.ingredienti, inventario)
    if (sotto) return sotto
    return { fabbrica: r.id }
  }
  return null
}

// --- la partita -----------------------------------------------------------

function partita({ minutiMassimi = 180, zaino = null } = {}) {
  if (zaino !== null) config.braccianti.slot = zaino

  mondo.reimpostaMondo()
  const lavori = creaLavori()
  const casse = creaCasse()
  const progetti = creaProgetti()
  const economia = creaEconomia()
  economia.reimposta()

  // **Questa riga e' il gioco vero, non un dettaglio.** Fabbricare un attrezzo
  // non basta: qualcuno deve segnarlo come fatto, ed e' solo allora che
  // l'effetto si accende. Nel gioco lo fa `motore.js`; qui lo facciamo noi,
  // altrimenti l'operaio fabbrica asce per sempre e non migliora mai.
  const squadra = creaBraccianti({
    casse,
    progetti,
    alloScarico: () => {},
    alCambioDelMondo: () => {},
    alFabbricato: (id) => progetti.segnaFatto(id),
    alGuadagno: () => {}
  })
  const operaio = squadra.squadra[0]
  const casotto = casse.elenco.find((c) => c.eIlCasotto)

  const BOSCO = tessereCon(DA_DOVE.legno || ['albero'])
  const FONTE = {}
  for (const materiale of Object.keys(DA_DOVE)) {
    FONTE[materiale] = tessereCon(DA_DOVE[materiale])
  }

  const tappe = []
  const passiMassimi = Math.round((minutiMassimi * 60000) / PASSO)
  let passi = 0

  const ordinati = [...config.elencoProgetti].sort((a, b) => a.costo - b.costo)
  let obiettivo = null

  function prossimoObiettivo() {
    for (const p of ordinati) {
      if (progetti.hoFatto(p.id)) continue
      if (progetti.hoComprato(p.id) || progetti.disponibile(p.id)) return p
    }
    return null
  }

  // Manda l'operaio a prendere un grezzo. Se il bosco e' finito ripianta: e'
  // il giro vero del gioco, non una scorciatoia.
  // **Scavare e' un ordine che si RIPETE**: l'operaio resta sulla vena finche'
  // ha posto nello zaino. E' voluto nel gioco (un tocco per ogni sassolino
  // sarebbe una punizione), ma qui vuol dire che chi ha ordinato lo scavo non
  // riprende piu' il controllo. Quindi si tiene da parte cosa si e' chiesto e
  // quanto ne serve, e appena basta lo si ferma - **col secondo tocco sulla
  // stessa tessera, esattamente come farebbe il giocatore**.
  let raccolta = null

  function vaiAPrendere(materiale, quanti = 0) {
    for (const [tx, ty] of FONTE[materiale] || []) {
      const cosa = mondo.risorsaIn(tx, ty)
      if (cosa && lavori.ordinaRaccolta(tx, ty, cosa)) {
        raccolta = quanti > 0 ? { materiale, quanti, tx, ty, cosa } : null
        return true
      }
    }
    if (materiale === 'legno' && operaio.inventario.quanti('alberello') > 0) {
      for (const [tx, ty] of BOSCO) {
        if (!mondo.risorsaIn(tx, ty) && lavori.ordinaPiantata(tx, ty, 'alberello', 'alberello')) {
          return true
        }
      }
    }
    return false
  }

  // Lo zaino pieno e' il modo piu' silenzioso di bloccare tutto: una ricetta
  // che non ha dove mettere quello che produce non fallisce con un errore,
  // semplicemente non succede. Quindi si fa spazio PRIMA.
  function faiSpazio(serve) {
    let scelto = ''
    let quanti = 0
    for (const m of config.elencoMateriali) {
      const ho = operaio.inventario.quanti(m.id)
      if (ho > quanti && !serve.has(m.id)) { scelto = m.id; quanti = ho }
    }
    if (!scelto) return false
    return lavori.ordinaScambio('deposita', casotto.tx, casotto.ty, scelto)
  }

  // Tutto quello che serve, a qualunque livello, per arrivare a una ricetta:
  // e' l'elenco delle cose che NON si possono posare per fare spazio.
  function servono(ricetta, dentro = new Set()) {
    for (const ing of ricetta.ingredienti) {
      dentro.add(ing.materiale)
      const r = ricettaChe(ing.materiale)
      if (r) servono(r, dentro)
    }
    return dentro
  }

  while (passi < passiMassimi) {
    if (raccolta && operaio.inventario.quanti(raccolta.materiale) >= raccolta.quanti) {
      lavori.ordinaRaccolta(raccolta.tx, raccolta.ty, raccolta.cosa)
      raccolta = null
    }

    if (lavori.quantiInAttesa() === 0) {
      if (!obiettivo) obiettivo = prossimoObiettivo()
      if (!obiettivo) break

      const ricetta = config.elencoRicette.find((r) => r.attrezzo === obiettivo.sblocca)

      if (progetti.hoFatto(obiettivo.id)) {
        tappe.push({ nome: obiettivo.nome, costo: obiettivo.costo, minuti: (passi * PASSO) / 60000 })
        obiettivo = null
        continue
      }

      if (!progetti.hoComprato(obiettivo.id)) {
        // FASE MONETE: raccogli, porta al casotto, vendi, finche' non basta
        if (economia.stato.monete >= obiettivo.costo) {
          progetti.compra(obiettivo.id)
          economia.paga(obiettivo.costo)
        } else if (operaio.inventario.caselleLibere() === 0) {
          lavori.ordinaScambio('deposita', casotto.tx, casotto.ty, '')
        } else if (economia.valoreDi(casotto) > 0) {
          economia.vendiCassa(casse, casotto)
        } else {
          let dato = false
          for (const materiale of ['rame', 'pietra', 'legno']) {
            if (vaiAPrendere(materiale)) { dato = true; break }
          }
          if (!dato) break
        }
      } else if (ricetta) {
        // FASE MATERIALI: il piano si ricalcola, e non si incastra
        const passo = pianifica(ricetta.ingredienti, operaio.inventario)
        if (!passo) {
          lavori.ordinaFabbrica(casotto.tx, casotto.ty, ricetta.id)
        } else if (passo.fabbrica) {
          const r = config.trovaRicetta(passo.fabbrica)
          if (operaio.inventario.caselleLibere() === 0 && operaio.inventario.quanti(r.produce) === 0) {
            if (!faiSpazio(servono(ricetta))) break
          } else {
            lavori.ordinaFabbrica(casotto.tx, casotto.ty, passo.fabbrica)
          }
        } else if (operaio.inventario.caselleLibere() === 0 && operaio.inventario.quanti(passo.prendi) === 0) {
          if (!faiSpazio(servono(ricetta))) break
        } else if (!vaiAPrendere(passo.prendi, passo.quanti)) {
          break
        }
      } else {
        // un progetto senza ricetta: comprarlo basta
        progetti.segnaFatto(obiettivo.sblocca)
      }
    }

    if (process.env.DBG && passi % 3000 === 0) {
      const inv = {}
      for (const m of config.elencoMateriali) {
        const q = operaio.inventario.quanti(m.id)
        if (q) inv[m.id] = q
      }
      console.error(
        (passi * PASSO / 60000).toFixed(1) + "' ob=" + (obiettivo ? obiettivo.id : '-') +
        ' compr=' + (obiettivo ? progetti.hoComprato(obiettivo.id) : '-') +
        ' monete=' + economia.stato.monete.toFixed(0) +
        ' libere=' + operaio.inventario.caselleLibere() +
        ' inv=' + JSON.stringify(inv) + ' coda=' + lavori.quantiInAttesa()
      )
    }
    mondo.aggiornaMondo(PASSO)
    squadra.aggiorna(lavori, PASSO, PASSO / 1000)
    passi++
  }

  return { tappe, minutiTotali: (passi * PASSO) / 60000 }
}

// --- il referto -----------------------------------------------------------

const esito = partita()

console.log('\n  QUANTO CI METTI AD ARRIVARE A OGNI PROGETTO')
console.log('  ' + '─'.repeat(64))
console.log(
  '  ' + 'Progetto'.padEnd(22) + 'costo'.padStart(7) + 'arriva a'.padStart(11) + 'buco'.padStart(10) + '   forma'
)
console.log('  ' + '─'.repeat(64))

let precedente = 0
const buchi = []
for (const t of esito.tappe) {
  const buco = t.minuti - precedente
  buchi.push(buco)
  const barra = '▇'.repeat(Math.max(1, Math.round(buco / 2)))
  console.log(
    '  ' +
      t.nome.padEnd(22) +
      String(t.costo).padStart(7) +
      (t.minuti.toFixed(1) + '′').padStart(11) +
      (buco.toFixed(1) + '′').padStart(10) +
      '   ' + barra
  )
  precedente = t.minuti
}

if (esito.tappe.length === 0) {
  console.log('  Nessun progetto completato: la partita si e’ bloccata.')
}
console.log('  ' + '─'.repeat(64))

if (buchi.length >= 2) {
  const primo = buchi[0]
  const ultimo = buchi[buchi.length - 1]
  console.log('\n  LA FORMA DELLA CURVA')
  console.log('  Primo buco   ' + primo.toFixed(1) + ' minuti')
  console.log('  Ultimo buco  ' + ultimo.toFixed(1) + ' minuti   (×' + (ultimo / primo).toFixed(2) + ' rispetto al primo)')
  const crescente = buchi.every((b, i) => i === 0 || b >= buchi[i - 1] * 0.8)
  console.log('  Andamento    ' + (crescente ? 'i buchi si allargano' : 'i buchi NON crescono in modo regolare'))
}

if (esito.tappe.length > 0) {
  const fine = esito.tappe[esito.tappe.length - 1].minuti
  console.log('\n  LA PARTITA INTERA DURA ' + fine.toFixed(1) + ' MINUTI')
  console.log('  Cioe’ tutti i ' + esito.tappe.length + ' progetti che esistono, dall’inizio alla fine.')
}

console.log('\n  COME SI LEGGE')
console.log('  • il "buco" e’ quanto passa fra uno sblocco e il successivo:')
console.log('    e’ lui la progressione, non il costo scritto in bacheca')
console.log('  • un buco che si allarga troppo in fretta e’ un muro')
console.log('  • due buchi uguali di fila sono due sblocchi che si accavallano')
console.log('  • questi tempi sono un TETTO: il giocatore qui non sbaglia mai')
console.log('')

await vite.close()
