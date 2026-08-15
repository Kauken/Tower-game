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
// **Non ci sono piu' le monete.** L'operaio raccoglie quello che serve, lo
// porta al banco e fabbrica. Fabbricare una cosa apre la successiva, e la
// partita e' quella catena dall'inizio alla fine.
//
// COSA NON SIMULA, DICHIARATO ALTRETTANTO
// - Il giocatore qui e' ordinato e non sbaglia mai: sa gia' cosa serve, non
//   torna indietro, non cambia idea. Un giocatore vero e' peggio, quindi
//   **i tempi veri saranno piu' lunghi di questi**, mai piu' corti.
// - Non mette da parte niente per dopo: raccoglie quello che gli serve
//   adesso. Chi gioca accumula, ed e' un altro motivo per cui questi tempi
//   sono un TETTO e non una previsione.

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
  const zainoVero = config.braccianti.slot
  if (zaino !== null) config.braccianti.slot = zaino


  mondo.reimpostaMondo()
  const lavori = creaLavori()
  const casse = creaCasse()
  const progetti = creaProgetti()

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

  // **L'ordine lo detta la catena, non il prezzo**: un progetto si apre quando
  // hai fabbricato quello che chiede.
  const ordinati = [...config.elencoProgetti]
  let obiettivo = null

  function prossimoObiettivo() {
    for (const p of ordinati) {
      if (!progetti.hoFatto(p.id) && progetti.disponibile(p.id)) return p
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
  // che non ha dove mettere quello che produce non parte, e resta in coda per
  // sempre. Quindi si fa spazio PRIMA.
  //
  // La prima versione posava la cosa di cui aveva di piu', e si e' avvitata:
  // andava a prendere il rame, tornava, e posava proprio quel rame per fare
  // spazio ai chiodi. All'infinito. **Si posa l'ECCEDENZA**, cioe' quello che
  // si ha in piu' rispetto a quello che serve davvero adesso.
  function quantoServe(ricette) {
    const serve = new Map()
    for (const r of ricette) {
      if (!r) continue
      for (const ing of r.ingredienti) {
        serve.set(ing.materiale, Math.max(serve.get(ing.materiale) || 0, ing.quantita))
      }
    }
    return serve
  }

  // `intoccabile` e' la ricetta che sta per fare: i suoi ingredienti non si
  // posano MAI, nemmeno se ne ha in avanzo. Senza questa riga si avvita:
  // va a prendere il rame, torna, e posa proprio quel rame perche' e' la cosa
  // di cui ha piu' avanzo.
  function faiSpazio(ricette, intoccabile = null) {
    const serve = quantoServe(ricette)
    const protetti = new Set((intoccabile ? intoccabile.ingredienti : []).map((i) => i.materiale))
    let scelto = ''
    let eccedenza = 0
    for (const m of config.elencoMateriali) {
      if (protetti.has(m.id)) continue
      const ho = operaio.inventario.quanti(m.id)
      const piu = ho - (serve.get(m.id) || 0)
      if (piu > eccedenza) { scelto = m.id; eccedenza = piu }
    }
    if (!scelto) return false
    return lavori.ordinaScambio('deposita', casotto.tx, casotto.ty, scelto)
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
        tappe.push({ nome: obiettivo.nome, minuti: (passi * PASSO) / 60000 })
        obiettivo = null
        continue
      }

      if (ricetta) {
        // FASE MATERIALI: il piano si ricalcola, e non si incastra
        const passo = pianifica(ricetta.ingredienti, operaio.inventario)
        if (!passo) {
          lavori.ordinaFabbrica(casotto.tx, casotto.ty, ricetta.id)
        } else if (passo.fabbrica) {
          const r = config.trovaRicetta(passo.fabbrica)
          if (operaio.inventario.caselleLibere() === 0 && operaio.inventario.quanti(r.produce) === 0) {
            if (!faiSpazio([ricetta, r], r)) break
          } else {
            lavori.ordinaFabbrica(casotto.tx, casotto.ty, passo.fabbrica)
          }
        } else if (operaio.inventario.caselleLibere() === 0 && operaio.inventario.quanti(passo.prendi) === 0) {
          if (!faiSpazio([ricetta])) break
        } else if (!vaiAPrendere(passo.prendi, passo.quanti)) {
          break
        }
      } else {
        // un progetto che non ha una ricetta sua (una costruzione): si conta
        // aperto appena lo e'
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
        ' libere=' + operaio.inventario.caselleLibere() +
        ' inv=' + JSON.stringify(inv) + ' coda=' + lavori.quantiInAttesa()
      )
    }
    mondo.aggiornaMondo(PASSO)
    squadra.aggiorna(lavori, PASSO, PASSO / 1000)
    passi++
  }

  const esito = { tappe, minutiTotali: (passi * PASSO) / 60000 }
  config.braccianti.slot = zainoVero
  return esito
}

// --- il referto -----------------------------------------------------------

const argomenti = process.argv.slice(2)
const confronto = argomenti.includes('--confronto')

if (confronto) {
  // **Provare una proposta invece di crederci.** Da quando le monete non ci
  // sono piu', l'unica leva che resta e' lo zaino: i costi non esistono, e
  // quello che c'e' da tarare sono le ricette.
  const prove = [
    ['com\u2019e\u0300 adesso', {}],
    ['zaino 8 caselle', { zaino: 8 }],
    ['zaino 4 caselle', { zaino: 4 }],
    ['zaino 3 caselle', { zaino: 3 }]
  ]
  console.log('\n  E SE\u2026 \u2014 quanto cambia la partita')
  console.log('  ' + '\u2500'.repeat(60))
  console.log('  ' + 'Prova'.padEnd(26) + 'sblocchi'.padStart(10) + 'durata'.padStart(10) + 'ultimo buco'.padStart(13))
  console.log('  ' + '\u2500'.repeat(60))
  for (const [nome, opzioni] of prove) {
    const e = partita(opzioni)
    const t = e.tappe
    const durata = t.length ? t[t.length - 1].minuti : 0
    const ultimo = t.length > 1 ? t[t.length - 1].minuti - t[t.length - 2].minuti : 0
    console.log(
      '  ' + nome.padEnd(26) + String(t.length).padStart(10) +
      (durata.toFixed(1) + '\u2032').padStart(10) + (ultimo.toFixed(1) + '\u2032').padStart(13)
    )
  }
  console.log('  ' + '\u2500'.repeat(60))
  console.log('\n  Se una riga non arriva a tutti gli sblocchi, quella proposta ROMPE il gioco.\n')
  await vite.close()
  process.exit(0)
}

const esito = partita()

console.log('\n  QUANTO CI METTI AD ARRIVARE A OGNI PROGETTO')
console.log('  ' + '─'.repeat(64))
console.log(
  '  ' + 'Progetto'.padEnd(24) + 'arriva a'.padStart(11) + 'buco'.padStart(10) + '   forma'
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
      t.nome.padEnd(24) +
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
console.log('    e\u2019 lui la progressione, e adesso e\u0300 fatto solo di materiali')
console.log('  • un buco che si allarga troppo in fretta e’ un muro')
console.log('  • due buchi uguali di fila sono due sblocchi che si accavallano')
console.log('  • questi tempi sono un TETTO: il giocatore qui non sbaglia mai')
console.log('')

await vite.close()
