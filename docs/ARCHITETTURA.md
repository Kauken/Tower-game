# Com'è fatto dentro — e dove mettere le mani

Questo documento esiste per una ragione sola: **far perdere meno tempo alle implementazioni nuove.** Se stai per aggiungere un materiale, una ricetta, una macchina o un modo di piazzare le cose, la ricetta è già scritta qui sotto.

---

## 1. Il principio che spiega tutta la struttura

> **Il gioco vive dentro un `<canvas>`. React sta sopra, guarda, e manda comandi.**

Non è uno stile: è quello che tiene i 60 fotogrammi al secondo su un telefono da cento euro.

```
config/*.json  ──►  src/game/config.js  ──►  tutto il resto
                          │
                          ▼
             ┌────────────────────────┐
             │   src/game/motore.js   │  ciclo a passo fisso
             │  aggiorna() disegna()  │
             └────────┬───────────────┘
                      │
        ┌─────────────┴──────────────┐
        ▼                            ▼
  i sistemi di gioco          src/game/disegno.js
  (mondo, lavori,             disegna tutto sul canvas
   operaio, casse…)                  │
        │                            ▼
        │                     un solo <canvas>
        ▼
   vetrina (un oggetto solo)
        │  letto 10 volte al secondo
        ▼
   src/ui/*.jsx  ──── comandi in coda ────► motore
```

**Due regole che ne discendono e non si negoziano:**

1. **Dentro `aggiorna()` e `disegna()` non si crea niente.** Niente `{}`, `[]`, `new`, `.map()`, `.filter()`, niente stringhe composte. Tutto viene da **pool preallocati** (`src/game/pool.js`): si accende e si spegne il campo `attivo`. Il garbage collector che parte a metà lavoro è la causa numero uno degli scatti su Android.
2. **React non chiama mai il gioco direttamente.** Legge la `vetrina` (un oggetto solo, riscritto sul posto) al massimo dieci volte al secondo, e manda le azioni come **comandi in coda**, eseguiti dentro un passo di simulazione. Così due tocchi rapidi non possono spendere due volte lo stesso materiale.

## 2. I file, e di cosa risponde ciascuno

### `src/game/`

| File | Di cosa risponde | Quando lo tocchi |
| --- | --- | --- |
| `config.js` | **Unico punto** che legge `config/*.json`. Contiene i **controlli all'avvio** | Aggiungi un file di config, o un controllo nuovo |
| `mondo.js` | L'isola: fondo, cosa sta sopra ogni tessera, lo stato per tessera (la crescita) | Aggiungi un tipo di terreno, un ostacolo, un giacimento |
| `camera.js` | Dove si guarda, il trascinamento, i due livelli di zoom | Quasi mai |
| `inventario.js` | **Le caselle con le pile.** Lo usano l'operaio *e* i contenitori | Cambi come si impila la roba |
| `casse.js` | I contenitori con un posto sull'isola | Aggiungi un tipo di contenitore |
| `lavori.js` | La coda degli ordini e le azioni possibili | **Aggiungi un verbo nuovo** (scavare, riempire, avviare…) |
| `braccianti.js` | L'operaio: prende un lavoro, ci va, lo fa | Cambi cosa sa fare, o come decide |
| `tecnologie.js` | Cosa hai sbloccato, e i moltiplicatori/aggiunte che ne derivano | Aggiungi un **tipo** di effetto |
| `economia.js` | Monete, prezzi, vendere | Cambi come entrano o escono le monete |
| `disegno.js` | Disegna tutto attraverso la telecamera | Aggiungi qualcosa che si deve vedere |
| `effetti.js` | I lampi e gli anelli, da pool | Aggiungi un feedback visivo |
| `motore.js` | Il ciclo, la coda dei comandi, il **ponte con React** | Aggiungi un comando o un dato per l'interfaccia |
| `pool.js`, `schermo.js` | Preallocazione e adattamento del canvas | Quasi mai |

### `src/ui/`

| File | Di cosa risponde |
| --- | --- |
| `CampoDiGioco.jsx` | Monta il canvas, gestisce il dito, campiona la `vetrina`, dispone i pannelli |
| `Cruscotto.jsx` | La striscia in alto: monete, cosa sta facendo l'operaio |
| `Zaino.jsx` | Le caselle dell'inventario, e le caselle usate dentro i pannelli |
| `Pannelli.jsx` | I fogli che salgono dal basso (operaio, cassa, costruzioni, progetti) |
| `Bottone.jsx` | Il pulsante, con le misure da telefono |

### `config/`

| File | Cosa contiene |
| --- | --- |
| `isola.json` | La mappa a caratteri, terreni, risorse, materiali, prezzi, telecamera |
| `braccianti.json` | L'operaio: velocità, caselle dello zaino, tempi delle azioni |
| `costruzioni.json` | Cosa si può piazzare, e quanto tiene dentro |
| `tecnologie.json` | Gli sblocchi *(diventeranno `progetti.json` al punto 6)* |
| `economia.json` | Monete di partenza, moltiplicatore di vendita |
| `motore.json` | Valori tecnici e di aspetto. **Il bilanciatore non lo tocca** |

## 3. Le ricette — come si aggiunge una cosa, passo per passo

### Aggiungere un **materiale**

1. `config/isola.json` → `materiali`: `id`, `nome`, `colore`, `prezzo`, `pila`.
2. Se si può piantare, aggiungi `pianta: "<nome risorsa>"`.
3. **Basta.** Inventario, casse, vendita, pannelli e disegno lo prendono da soli, perché ciclano su `elencoMateriali`.

> Il controllo all'avvio si lamenterà se manca il prezzo o la pila. È voluto.

### Aggiungere un **ostacolo** (una cosa da sgomberare)

1. `config/isola.json` → `risorse`: colori, `raggio`, `blocca`, `lavorabile`, `tempo_lavoro_ms`, `rese` (un elenco).
2. `legenda`: un carattere nuovo, e mettilo nella `mappa`.
3. Nient'altro. Il disegno e gli ordini funzionano già.

### Aggiungere un **verbo** (una cosa nuova che l'operaio sa fare)

Questo è il caso che costa di più, ed è fatto per costare poco:

1. `lavori.js` → un valore nuovo di `azione`, e una funzione `ordina...` che lo mette in coda.
2. `braccianti.js` → tre punti, e sono sempre quei tre:
   - `durataDi()` — quanto ci mette
   - `puoFare()` — quando **non** lo può fare (e quindi lo salta invece di piantarsi)
   - `concludi()` — cosa succede quando finisce
3. `motore.js` → da dove arriva l'ordine: un tocco sulla mappa, o un comando dall'interfaccia.
4. `config/braccianti.json` → il tempo che ci mette. **Mai nel codice.**

### Aggiungere un **effetto di uno sblocco**

1. `config/tecnologie.json` → `effetto: { tipo: "...", moltiplicatore: ... }` oppure `{ tipo: "...", aggiunta: ... }`.
2. Dove serve, chiedi `tecnologie.moltiplicatore(tipo, risorsa)` (si moltiplica) o `tecnologie.aggiunta(tipo)` (si somma).
3. **Leggilo quando il lavoro comincia, mai a ogni fotogramma.**

> Le cose che si contano (le caselle dello zaino) **si sommano**; le cose che sono un ritmo (velocità, tempo di lavoro) **si moltiplicano**. Sbagliare la parola dà un effetto che non si vede e che nessuno collegherebbe alla configurazione — c'è un controllo all'avvio apposta.

### Aggiungere un dato che l'**interfaccia** deve vedere

1. `motore.js` → un campo nella `vetrina`, riempito dentro `leggiStato()`.
2. `CampoDiGioco.jsx` → lo stesso campo in `VISTA_INIZIALE`, altrimenti il confronto non lo nota e l'interfaccia non si aggiorna mai.
3. Passalo al componente.

> **Sono stringhe, non oggetti.** L'interfaccia capisce che qualcosa è cambiato con un confronto secco, e confrontare un oggetto dieci volte al secondo costerebbe di più.

## 4. Le cose che sono già pronte per il futuro

Perché tu non le rifaccia da zero credendo che manchino:

- **Un lavoro ha già origine e destinazione** (`versoTx`, `versoTy`, `materiale`, `quantita` in `lavori.js`). Trasportare sarà *"prendi X da A e portalo a B"*, e aggiungere quei campi dopo aver costruito i nastri costerebbe rifare i nastri.
- **Le tessere hanno già uno stato** (`crescitaMs`, `crescitaTotaleMs` in `mondo.js`). È lì che vivranno le trivelle e le macchine.
- **I contenitori sono generici**: una macchina è un contenitore con una ricetta e un cassetto in più. Non serve un sistema nuovo.
- **Le tecnologie sono dati**, non codice: il motore sa leggere dei *tipi* di effetto, e non conosce nessuno sblocco per nome.

## 5. Le semplificazioni che ci sono, e non sono difetti

- **L'operaio va in linea retta** e attraversa gli ostacoli. Sull'isola aperta non si nota. → punto 10.
- **Chiudere la pagina cancella tutto.** → punto 3.
- **Il crafting non esiste ancora**, quindi le tecnologie si pagano solo in monete. → punti 5 e 6.
- **I giacimenti non esistono ancora**: la pietra viene da massi finiti. → punto 4.

## 6. Il muro architetturale, nominato prima di sbatterci

L'autore ha chiesto di non arrivare a un punto in cui *"per fare questo dobbiamo modificare la base"*. La risposta sta in `GDD.md` §10, e si riassume così:

> **"1 legno diventa 3 legno" rompe il gioco.** Rimetti l'uscita in entrata e hai legno infinito. La regola è: **una lavorazione non produce mai il materiale che consuma** — 1 tronco → 3 *tavole*, e le tavole non rientrano nella segheria.

**È un controllo all'avvio**, non una cosa da ricordare. Per il resto la base regge: le tessere hanno uno stato, i contenitori sono generici, materiali ed effetti sono dati.
