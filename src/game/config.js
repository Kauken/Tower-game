// Unico punto in cui il gioco legge la configurazione.
// Nessun valore numerico vive nel codice: tutto arriva da config/*.json.

import isolaJson from '../../config/isola.json'
import braccantiJson from '../../config/braccianti.json'
import costruzioniJson from '../../config/costruzioni.json'
import progettiJson from '../../config/progetti.json'
import ricetteJson from '../../config/ricette.json'
import salvataggioJson from '../../config/salvataggio.json'
import motore from '../../config/motore.json'

// L'area logica dello **schermo**, non del mondo: l'isola e' piu' grande, e la
// telecamera ne mostra un pezzo per volta.
export const area = motore.area

export const simulazione = motore.simulazione
export const limiti = motore.limiti
export const grafica = motore.grafica
export const interfaccia = motore.interfaccia

export const isola = isolaJson
export const tessera = isolaJson.tessera
export const legenda = isolaJson.legenda
export const terreni = isolaJson.terreni
export const risorse = isolaJson.risorse
export const elencoMateriali = isolaJson.materiali
export const telecamera = isolaJson.telecamera

export const braccianti = braccantiJson
export const operaio = braccantiJson.operaio

export const elencoProgetti = progettiJson.progetti
export const elencoRicette = ricetteJson.ricette

export const costruzioni = costruzioniJson
export const elencoCostruzioni = costruzioniJson.costruzioni

export const salvataggio = salvataggioJson

export function trovaCostruzione(id) {
  const costruzione = elencoCostruzioni.find((voce) => voce.id === id)
  if (!costruzione) {
    throw new Error(`Costruzione "${id}" non trovata in costruzioni.json`)
  }
  return costruzione
}

export function trovaProgetto(id) {
  const progetto = elencoProgetti.find((voce) => voce.id === id)
  if (!progetto) {
    throw new Error(`Progetto "${id}" non trovato in progetti.json`)
  }
  return progetto
}

export function trovaRicetta(id) {
  const ricetta = elencoRicette.find((voce) => voce.id === id)
  if (!ricetta) {
    throw new Error(`Ricetta "${id}" non trovata in ricette.json`)
  }
  return ricetta
}

// Controlli all'avvio: una configurazione sbagliata deve fermare il gioco
// subito con un errore parlante, non produrre un'isola vuota e muta.
const righe = isolaJson.mappa
if (righe.length < 4) {
  throw new Error('La mappa in isola.json ha bisogno di almeno quattro righe')
}
for (let i = 1; i < righe.length; i++) {
  if (righe[i].length !== righe[0].length) {
    throw new Error(
      `La riga ${i} della mappa in isola.json e lunga ${righe[i].length}, la prima ${righe[0].length}: devono essere tutte uguali`
    )
  }
}
for (let y = 0; y < righe.length; y++) {
  for (let x = 0; x < righe[y].length; x++) {
    if (!legenda[righe[y][x]]) {
      throw new Error(
        `Il carattere "${righe[y][x]}" alla riga ${y} colonna ${x} della mappa non e nella legenda di isola.json`
      )
    }
  }
}

// Una risorsa lavorabile deve produrre materiali che esistono, altrimenti
// l'ordine si puo' dare ma non ne esce niente.
for (const nome in risorse) {
  const risorsa = risorse[nome]
  if (!risorsa.lavorabile) {
    continue
  }
  // Un giacimento non ha un elenco di rese: ha un materiale, una ricchezza che
  // lo moltiplica, e non finisce mai.
  if (risorsa.giacimento) {
    if (!elencoMateriali.some((m) => m.id === risorsa.materiale)) {
      throw new Error(
        `Il giacimento "${nome}" produce "${risorsa.materiale}", che non e un materiale di isola.json`
      )
    }
    if (!(risorsa.resa > 0) || !(risorsa.ricchezza > 0)) {
      throw new Error(`Il giacimento "${nome}" ha bisogno di resa e ricchezza maggiori di zero`)
    }
    continue
  }
  if (!Array.isArray(risorsa.rese)) {
    throw new Error(`La risorsa "${nome}" non ha un elenco "rese" in isola.json`)
  }
  for (let i = 0; i < risorsa.rese.length; i++) {
    if (!elencoMateriali.some((m) => m.id === risorsa.rese[i].materiale)) {
      throw new Error(
        `La risorsa "${nome}" produce "${risorsa.rese[i].materiale}", che non e un materiale di isola.json`
      )
    }
  }
}

// **Niente ricresce da solo.** Una risorsa che si puo' raccogliere e che non
// torna in nessun modo prosciugherebbe l'isola in silenzio: o esce un materiale
// che la ripianta, o e' una scelta consapevole (i massi) e va scritta cosi'.
// Qui si controlla solo il contrario: un materiale che dice di piantare
// qualcosa deve piantare qualcosa che esiste e che sa quanto ci mette a
// crescere, altrimenti pianti e non nasce mai niente.
for (let i = 0; i < elencoMateriali.length; i++) {
  const materiale = elencoMateriali[i]
  if (!materiale.pianta) {
    continue
  }
  const cresce = risorse[materiale.pianta]
  if (!cresce) {
    throw new Error(
      `Il materiale "${materiale.id}" pianta "${materiale.pianta}", che non e una risorsa dell'isola`
    )
  }
  if (!(cresce.tempo_crescita_ms > 0)) {
    throw new Error(
      `La risorsa "${materiale.pianta}" si puo piantare ma non ha tempo_crescita_ms: piantata non diventerebbe mai adulta`
    )
  }
}

// Un progetto che ne richiede uno inesistente sarebbe irraggiungibile, e
// nessuno se ne accorgerebbe: meglio fermarsi qui.
for (let i = 0; i < elencoProgetti.length; i++) {
  const t = elencoProgetti[i]
  if (t.richiede) {
    trovaProgetto(t.richiede)
  }
  // Un progetto che chiede se stesso non si aprirebbe mai, e il gioco
  // resterebbe fermo senza dire perche'.
  if (t.richiede === t.id) {
    throw new Error(`Il progetto "${t.id}" chiede se stesso: non si aprirebbe mai`)
  }
  // Un progetto che non apre niente si comprerebbe senza ottenere niente: le
  // Le cose che puo' aprire sono due, e sono diverse:
  //   una RICETTA     -> un attrezzo che ti fabbrichi al banco
  //   una COSTRUZIONE -> una voce nuova del menu' Costruisci
  if (t.costruzione) {
    if (!elencoCostruzioni.some((c) => c.id === t.costruzione)) {
      throw new Error(
        `Il progetto "${t.id}" apre la costruzione "${t.costruzione}", che non esiste in costruzioni.json`
      )
    }
  } else if (!elencoRicette.some((r) => r.id === t.sblocca)) {
    throw new Error(
      `Il progetto "${t.id}" apre la ricetta "${t.sblocca}", che non esiste in ricette.json`
    )
  }
  if (!t.effetto) {
    continue
  }
  if (t.effetto.risorsa && !risorse[t.effetto.risorsa]) {
    throw new Error(
      `Il progetto "${t.id}" agisce su "${t.effetto.risorsa}", che non e una risorsa dell'isola`
    )
  }
  if (Array.isArray(t.effetto.risorse)) {
    for (let r = 0; r < t.effetto.risorse.length; r++) {
      if (!risorse[t.effetto.risorse[r]]) {
        throw new Error(
          `Il progetto "${t.id}" agisce su "${t.effetto.risorse[r]}", che non e una risorsa dell'isola`
        )
      }
    }
  }
  // Le tasche si sommano, tutto il resto si moltiplica. Sbagliare la parola
  // qui darebbe un effetto che non si vede e che nessuno collegherebbe alla
  // configurazione: meglio fermarsi.
  for (const effetto of [t.effetto, t.effetto_secondario]) {
    if (!effetto) {
      continue
    }
    if (effetto.tipo === 'slot') {
      if (!(effetto.aggiunta > 0)) {
        throw new Error(`Il progetto "${t.id}" apre delle tasche ma non dice quante (aggiunta)`)
      }
    } else if (!(effetto.moltiplicatore > 0)) {
      throw new Error(`L'effetto "${effetto.tipo}" del progetto "${t.id}" non ha un moltiplicatore`)
    }
  }
}

// I CONTROLLI SULLE MACCHINE.
//
// Una macchina e' l'unica cosa del gioco che lavora da sola: se e' scritta
// male non si rompe, semplicemente **non fa niente e non dice perche'**. Ed e'
// il difetto piu' difficile da trovare giocando.
for (let i = 0; i < elencoCostruzioni.length; i++) {
  const c = elencoCostruzioni[i]
  if (c.tipo !== 'macchina') {
    continue
  }
  const ricetta = elencoRicette.find((r) => r.id === c.ricetta)
  if (!ricetta) {
    throw new Error(
      `La macchina "${c.id}" dice di saper fare la ricetta "${c.ricetta}", che non esiste in ricette.json`
    )
  }
  if (!(c.slot_entrata > 0) || !(c.slot_uscita > 0)) {
    throw new Error(`La macchina "${c.id}" ha bisogno di slot_entrata e slot_uscita maggiori di zero`)
  }
  if (!elencoMateriali.some((m) => m.id === c.combustibile)) {
    throw new Error(
      `La macchina "${c.id}" brucia "${c.combustibile}", che non e un materiale dell'isola`
    )
  }
  // **Questo e' il controllo che conta.** Se bruciasse a ogni lavorazione, una
  // segheria mangerebbe tanto legno quanto ne trasforma: si comprerebbe una
  // macchina che non fa guadagnare niente, e non si capirebbe perche'.
  if (!(c.brucia_ogni > 1)) {
    throw new Error(
      `La macchina "${c.id}" brucia un pezzo a ogni lavorazione (brucia_ogni = ${c.brucia_ogni}): ` +
        `cosi non guadagna niente. Deve essere almeno 2.`
    )
  }
  if (ricetta.ingredienti.some((ing) => ing.materiale === ricetta.produce)) {
    throw new Error(`La macchina "${c.id}" produce un materiale che consuma: sarebbe materia infinita`)
  }
}

// I CONTROLLI SULLA CORRENTE.
//
// Un generatore scritto male e' peggio di una macchina scritta male: non fa
// niente **e** ti fa credere che le macchine che copre siano a posto. E un
// generatore che rende meno del fuoco che sostituisce e' arredamento — si
// costruirebbe una cosa che peggiora la fabbrica, senza capire perche'.
const generatori = elencoCostruzioni.filter((c) => c.tipo === 'generatore')
const pali = elencoCostruzioni.filter((c) => c.tipo === 'palo')

for (let i = 0; i < generatori.length; i++) {
  const g = generatori[i]
  if (!elencoMateriali.some((m) => m.id === g.combustibile)) {
    throw new Error(
      `Il generatore "${g.id}" brucia "${g.combustibile}", che non e un materiale dell'isola`
    )
  }
  if (!(g.raggio_corrente > 0)) {
    throw new Error(
      `Il generatore "${g.id}" ha raggio_corrente ${g.raggio_corrente}: non coprirebbe niente`
    )
  }
  if (!(g.ms_per_combustibile > 0)) {
    throw new Error(
      `Il generatore "${g.id}" non dice quanto lavoro paga un pezzo di combustibile (ms_per_combustibile)`
    )
  }
  if (!(g.avviso_ms > 0)) {
    throw new Error(
      `Il generatore "${g.id}" non ha avviso_ms: si fermerebbe di sorpresa, ed e' la cosa che fa smettere di giocare`
    )
  }
  // **Il controllo che conta.** Se un pezzo di combustibile nel generatore
  // valesse meno di quanto vale nella fiamma della macchina, attaccarsi alla
  // corrente sarebbe un peggioramento pagato con tre lingotti.
  for (let m = 0; m < elencoCostruzioni.length; m++) {
    const macchina = elencoCostruzioni[m]
    if (macchina.tipo !== 'macchina' || macchina.combustibile !== g.combustibile) {
      continue
    }
    const daSola = elencoRicette.find((r) => r.id === macchina.ricetta).tempo_ms * macchina.brucia_ogni
    if (g.ms_per_combustibile < daSola) {
      throw new Error(
        `Il generatore "${g.id}" paga ${g.ms_per_combustibile} ms di lavoro con un pezzo di ${g.combustibile}, ` +
          `ma la "${macchina.id}" da sola ne paga ${daSola}: attaccarla alla corrente la farebbe consumare di piu'.`
      )
    }
  }
}

for (let i = 0; i < pali.length; i++) {
  if (!(pali[i].raggio_corrente > 0)) {
    throw new Error(
      `Il palo "${pali[i].id}" ha raggio_corrente ${pali[i].raggio_corrente}: non allungherebbe niente`
    )
  }
}
if (pali.length > 0 && generatori.length === 0) {
  throw new Error(
    'Ci sono dei pali in costruzioni.json ma nessun generatore: un palo da solo non porta nessuna corrente'
  )
}

// Una ricetta si fa in un posto solo: o dentro una macchina, o a un banco.
// Dichiarare tutti e due vorrebbe dire che la segheria non serve a niente,
// perche' quello che fa lei si potrebbe fare a mano.
for (let i = 0; i < elencoRicette.length; i++) {
  const r = elencoRicette[i]
  if (r.macchina && r.dove) {
    throw new Error(
      `La ricetta "${r.id}" dice di farsi sia nella macchina "${r.macchina}" sia al banco "${r.dove}": ` +
        `scegline uno, o la macchina non serve a niente`
    )
  }
  if (r.dove && !elencoCostruzioni.some((c) => c.fa === r.dove)) {
    throw new Error(
      `La ricetta "${r.id}" si fa a "${r.dove}", ma nessuna costruzione sa fare "${r.dove}"`
    )
  }
}

// I TRE CONTROLLI SULLE RICETTE.
//
// Il primo e' il muro architetturale del progetto, ed e' la ragione per cui
// esiste questo blocco: **una ricetta che produce un materiale che consuma da'
// materia infinita.** Rimetti l'uscita in entrata e ne esce il doppio, poi il
// quadruplo. Non e' un problema di numeri: nessun bilanciamento lo aggiusta.
for (let i = 0; i < elencoRicette.length; i++) {
  const r = elencoRicette[i]
  if (!Array.isArray(r.ingredienti) || r.ingredienti.length === 0) {
    throw new Error(`La ricetta "${r.id}" non ha ingredienti in ricette.json`)
  }
  if (r.ingredienti.length > 3) {
    throw new Error(
      `La ricetta "${r.id}" ha ${r.ingredienti.length} ingredienti: il massimo e tre, altrimenti su un telefono non si legge`
    )
  }
  for (let c = 0; c < r.ingredienti.length; c++) {
    if (!elencoMateriali.some((m) => m.id === r.ingredienti[c].materiale)) {
      throw new Error(
        `La ricetta "${r.id}" usa "${r.ingredienti[c].materiale}", che non e un materiale di isola.json`
      )
    }
    if (r.produce && r.ingredienti[c].materiale === r.produce) {
      throw new Error(
        `La ricetta "${r.id}" produce "${r.produce}" e lo consuma anche: rimettendo l'uscita in entrata si avrebbe materia infinita. Una lavorazione non produce mai il materiale che consuma.`
      )
    }
  }
  if (r.produce && !elencoMateriali.some((m) => m.id === r.produce)) {
    throw new Error(`La ricetta "${r.id}" produce "${r.produce}", che non e un materiale di isola.json`)
  }
  if (!r.produce && !r.attrezzo) {
    throw new Error(`La ricetta "${r.id}" non produce ne un materiale ne un attrezzo`)
  }
  if (r.produce && !(r.quantita > 0)) {
    throw new Error(`La ricetta "${r.id}" produce zero pezzi`)
  }
  if (!(r.tempo_ms > 0)) {
    throw new Error(`La ricetta "${r.id}" non dice quanto ci mette (tempo_ms)`)
  }
  if (r.richiede_progetto && !elencoProgetti.some((t) => t.id === r.richiede_progetto)) {
    throw new Error(
      `La ricetta "${r.id}" chiede il progetto "${r.richiede_progetto}", che non esiste in progetti.json`
    )
  }
}

// Ogni costruzione deve costare materiali che esistono, e il casotto deve
// esserci sulla mappa: senza, il primo bracciante non saprebbe dove scaricare.
for (let i = 0; i < elencoCostruzioni.length; i++) {
  const costo = elencoCostruzioni[i].costo
  for (let c = 0; c < costo.length; c++) {
    if (!elencoMateriali.some((m) => m.id === costo[c].materiale)) {
      throw new Error(
        `La costruzione "${elencoCostruzioni[i].id}" costa "${costo[c].materiale}", che non e un materiale di isola.json`
      )
    }
  }
}
// Un materiale senza prezzo non si potrebbe vendere, e uno senza pila non
// starebbe in nessuna casella dell'inventario.
for (let i = 0; i < elencoMateriali.length; i++) {
  if (!(elencoMateriali[i].prezzo > 0)) {
    throw new Error(`Il materiale "${elencoMateriali[i].id}" non ha un prezzo in isola.json`)
  }
  if (!(elencoMateriali[i].pila > 0)) {
    throw new Error(
      `Il materiale "${elencoMateriali[i].id}" non ha una pila in isola.json: non si saprebbe quanti ne stanno in una casella`
    )
  }
}

// Ogni contenitore deve avere delle caselle, altrimenti esiste ma non tiene
// niente.
for (let i = 0; i < elencoCostruzioni.length; i++) {
  const voce = elencoCostruzioni[i]
  if (voce.slot !== undefined && !(voce.slot > 0)) {
    throw new Error(`La costruzione "${voce.id}" ha zero caselle in costruzioni.json`)
  }
}
if (!(costruzioniJson.slot_casotto > 0)) {
  throw new Error('Il casotto non ha caselle in costruzioni.json: non ci si potrebbe posare niente')
}
// Il casotto si cerca **per quello che e'**, non per la lettera che ha: dare
// la stessa lettera a due cose diverse ha gia' fatto sparire il casotto una
// volta, e il gioco era partito lo stesso mostrando un'isola senza mercato.
const lettereCasotto = Object.keys(legenda).filter((c) => legenda[c] === 'casotto')
if (lettereCasotto.length === 0) {
  throw new Error('Nella legenda di isola.json nessun carattere vale "casotto"')
}
if (!isolaJson.mappa.some((riga) => lettereCasotto.some((c) => riga.indexOf(c) >= 0))) {
  throw new Error(
    'Sulla mappa non c\'e nessun casotto: senza, non ci sarebbe nessun posto dove posare la roba, vendere e fabbricare'
  )
}
// Ogni voce della legenda deve essere un terreno o una risorsa vera,
// altrimenti quella tessera si disegna vuota e non lo dice nessuno.
for (const carattere in legenda) {
  const nome = legenda[carattere]
  if (!terreni[nome] && !risorse[nome]) {
    throw new Error(
      `Nella legenda di isola.json il carattere "${carattere}" vale "${nome}", che non e ne un terreno ne una risorsa`
    )
  }
}

if (braccantiJson.iniziali.length < 1) {
  throw new Error('Serve almeno un operaio in braccianti.json, altrimenti non lavora nessuno')
}
// Un salvataggio senza versione non si potrebbe mai migrare, e un tetto di
// recupero a zero renderebbe inutile automatizzare.
if (!(salvataggioJson.versione_formato > 0)) {
  throw new Error('salvataggio.json non ha una versione_formato: senza, un salvataggio vecchio non si potrebbe riconoscere')
}
if (!(salvataggioJson.tetto_recupero_ms > 0) || !(salvataggioJson.passo_recupero_ms > 0)) {
  throw new Error('salvataggio.json ha bisogno di tetto_recupero_ms e passo_recupero_ms maggiori di zero')
}

if (!(braccantiJson.slot > 0)) {
  throw new Error('L\'operaio non ha caselle nello zaino in braccianti.json: non potrebbe raccogliere niente')
}
for (const voce of ['tempo_piantata_ms', 'tempo_scambio_ms']) {
  if (!(braccantiJson[voce] >= 0)) {
    throw new Error(`Manca "${voce}" in braccianti.json`)
  }
}
