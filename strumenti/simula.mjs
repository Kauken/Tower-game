// La simulazione headless: **l'isola che gira senza essere disegnata.**
//
// Serve a rispondere con dei numeri alla domanda che regge tutto
// `docs/MATERIALI.md`:
//
//     QUANTO VALE UN MINUTO DELL'OPERAIO?
//
// C'e' un operaio solo, quindi ogni cosa si misura in monete al minuto del suo
// tempo. E' l'unico numero che permette di confrontare fra loro cose diverse:
// tagliare alberi, scavare rame vicino, scavare rame ricco lontano, fabbricare
// tavole. A occhio non si vede, e questo gioco e' una questione di portata.
//
// Si usa cosi':      npm run simula
//
// Carica i moduli veri del gioco (non una copia), attraverso Vite perche' il
// codice legge la configurazione con gli import JSON. **Non tocca il disegno**:
// e' la prova che la logica di gioco sta in piedi da sola.

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
const prezzo = (id) => {
  const m = config.elencoMateriali.find((v) => v.id === id)
  return m ? m.prezzo : 0
}

// Un operaio che lavora davvero: prende il prossimo bersaglio, e quando lo
// zaino e' pieno va a posare al casotto. E' il giro vero del gioco, compresa
// la camminata — che e' esattamente il costo che vogliamo misurare.
//
// **Si misura il TEMPO PER FARE UN TOT, non il tot fatto in un tempo.** E' una
// differenza che sembra pedante e non lo e': il bosco ha otto alberi, quindi a
// tempo fisso tutti gli scenari col bosco davano lo stesso numero — quello di
// otto alberi — e un'ascia migliore non si vedeva. Misurando il tempo, l'ascia
// si vede subito.
function gira({ bersagli, fatti = [], ricetta = null, obiettivo = 90, minutiMassimi = 30 }) {
  mondo.reimpostaMondo()
  const lavori = creaLavori()
  const casse = creaCasse()
  const progetti = creaProgetti()
  creaEconomia()
  for (const id of fatti) {
    progetti.compra(id)
    progetti.segnaFatto(id)
  }

  const squadra = creaBraccianti({
    casse,
    progetti,
    alloScarico: () => {},
    alCambioDelMondo: () => {},
    alFabbricato: () => {},
    alGuadagno: () => {}
  })
  const operaio = squadra.squadra[0]
  const casotto = casse.elenco.find((c) => c.eIlCasotto)

  // Il valore si conta guardando **dove sta la roba**, non sommandolo mentre
  // succede: contare a mano gli eventi e' il modo piu' facile per contare due
  // volte la stessa cosa, ed e' successo.
  function valoreFatto() {
    let totale = 0
    for (const m of config.elencoMateriali) {
      totale += (casotto.inventario.quanti(m.id) + operaio.inventario.quanti(m.id)) * prezzo(m.id)
    }
    return totale
  }

  let quale = 0
  let esaurito = false
  const passiMassimi = Math.round((minutiMassimi * 60000) / PASSO)
  let passi = 0

  while (passi < passiMassimi) {
    if (lavori.quantiInAttesa() === 0) {
      if (operaio.inventario.caselleLibere() === 0 || (esaurito && operaio.inventario.stato.pezzi > 0)) {
        lavori.ordinaScambio('deposita', casotto.tx, casotto.ty, '')
      } else if (ricetta && operaio.inventario.quanti('legno') >= 6) {
        lavori.ordinaFabbrica(casotto.tx, casotto.ty, ricetta)
      } else {
        let dato = false
        for (let t = 0; t < bersagli.length && !dato; t++) {
          const b = bersagli[(quale + t) % bersagli.length]
          const cosa = mondo.risorsaIn(b[0], b[1])
          if (cosa) {
            dato = lavori.ordinaRaccolta(b[0], b[1], cosa)
          }
        }
        quale++
        if (!dato) {
          // finito quello che c'era da raccogliere: si porta a casa e si chiude
          esaurito = true
          if (operaio.inventario.stato.pezzi === 0) {
            break
          }
        }
      }
    }
    mondo.aggiornaMondo(PASSO)
    squadra.aggiorna(lavori, PASSO, PASSO / 1000)
    passi++
    if (valoreFatto() >= obiettivo) {
      break
    }
  }

  const minuti = (passi * PASSO) / 60000
  return { monetePerMinuto: valoreFatto() / minuti, minuti, valore: valoreFatto() }
}

// --- gli scenari ---
//
// Le tessere vengono dalla mappa in isola.json. Se la mappa cambia, questi
// numeri vanno rifatti — ed e' giusto cosi': la distanza dal casotto E' il
// bilanciamento.
const BOSCO = [
  [9, 20],
  [10, 20],
  [8, 21],
  [9, 21],
  [10, 21],
  [11, 21],
  [9, 22],
  [10, 22]
]
const PIETRA = [[16, 11]]
const RAME = [[7, 15]]
const RAME_RICCO = [[16, 6]]

// Le vene non finiscono, quindi si puo' chiedere loro un obiettivo grosso: e'
// l'unico modo per far entrare nel conto anche i **viaggi**, che sono meta'
// del tempo dell'operaio. Il bosco invece ha otto alberi e finisce: li' si
// misura quanto ci mette a farlo fuori tutto, ed e' un confronto onesto lo
// stesso perche' il lavoro da fare e' identico in tutti gli scenari.
const LUNGO = { obiettivo: 400 }

const prove = [
  ['Bosco, a mani nude', () => gira({ bersagli: BOSCO })],
  ['Bosco, con l’Ascia affilata', () => gira({ bersagli: BOSCO, fatti: ['ascia_affilata'] })],
  ['Bosco, ascia + stivali', () => gira({ bersagli: BOSCO, fatti: ['ascia_affilata', 'stivali'] })],
  ['Vena di pietra (vicina)', () => gira({ bersagli: PIETRA, ...LUNGO })],
  ['Pietra, col piccone pesante', () => gira({ bersagli: PIETRA, ...LUNGO, fatti: ['ascia_affilata', 'piccone_pesante'] })],
  ['Pietra, con lo zaino grande', () => gira({ bersagli: PIETRA, ...LUNGO, fatti: ['zaino_grande'] })],
  ['Pietra, con gli stivali', () => gira({ bersagli: PIETRA, ...LUNGO, fatti: ['ascia_affilata', 'stivali'] })],
  ['Vena di rame (media)', () => gira({ bersagli: RAME, ...LUNGO })],
  ['Vena di rame RICCA (lontana)', () => gira({ bersagli: RAME_RICCO, ...LUNGO })],
  ['Bosco, e le tavole al banco', () => gira({ bersagli: BOSCO, ricetta: 'tavola' })]
]

console.log('\n  QUANTO VALE UN MINUTO DELL’OPERAIO')
console.log('  ' + '─'.repeat(52))
const esiti = []
for (const [nome, esegui] of prove) {
  const esito = esegui()
  esiti.push([nome, esito.monetePerMinuto])
  console.log(
    '  ' +
      nome.padEnd(32) +
      esito.monetePerMinuto.toFixed(1).padStart(7) +
      ' monete/min' +
      ('   (' + esito.valore.toFixed(0) + ' monete in ' + esito.minuti.toFixed(1) + ' min)').padStart(26)
  )
}

const base = esiti[0][1]
console.log('  ' + '─'.repeat(52))
console.log('\n  QUANTO RENDE OGNI SBLOCCO, rispetto al bosco a mani nude')
console.log('  ' + '─'.repeat(52))
for (const [nome, valore] of esiti.slice(1)) {
  const volte = valore / base
  const barra = '█'.repeat(Math.max(0, Math.round(volte * 8)))
  console.log('  ' + nome.padEnd(34) + ('×' + volte.toFixed(2)).padStart(7) + '  ' + barra)
}

console.log('\n  DA LEGGERE COSI’ (docs/MATERIALI.md §1 e §5)')
console.log('  • uno sblocco che non fa salire questo numero non serve a niente')
console.log('  • un attrezzo deve ripagarsi in 3-8 minuti, una macchina in 8-20')
console.log('  • se una vena lontana non rende piu’ di una vicina, la distanza non costa')
console.log('')
console.log('  QUELLO CHE QUESTO NUMERO NON DICE')
console.log('  Misura MONETE. Ma tavole, chiodi e telai valgono piu’ del loro prezzo:')
console.log('  sono l’unico modo di fabbricare gli attrezzi. Che il banco renda poco')
console.log('  al minuto e’ giusto — e’ per questo che la segheria si desiderera’.')
console.log('')

await vite.close()
