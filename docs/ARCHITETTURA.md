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
| `macchine.js` | Le cose che lavorano da sole: due cassetti e una ricetta | Aggiungi una macchina, o cambi come consuma |
| `corrente.js` | **La rete**: generatori, pali, chi è coperto e chi paga il combustibile | Cambi come si propaga la corrente, o cosa fa una macchina coperta |
| `lavori.js` | La coda degli ordini e le azioni possibili | **Aggiungi un verbo nuovo** (scavare, riempire, avviare…) |
| `braccianti.js` | L'operaio: prende un lavoro, ci va, lo fa | Cambi cosa sa fare, o come decide |
| `tecnologie.js` | Cosa hai sbloccato, e i moltiplicatori/aggiunte che ne derivano | Aggiungi un **tipo** di effetto |
| `economia.js` | Monete, prezzi, vendere | Cambi come entrano o escono le monete |
| `disegno.js` | Disegna tutto attraverso la telecamera | Aggiungi qualcosa che si deve vedere |
| `sagome.js` | **Disegna le cose una volta sola** in una tela nascosta, e poi si copiano | Cambi l'aspetto di un albero, di un sasso, dell'operaio |
| `effetti.js` | I lampi e gli anelli, da pool | Aggiungi un feedback visivo |
| `motore.js` | Il ciclo, la coda dei comandi, **la mano**, il salvataggio, il ponte con React | Aggiungi un comando o un dato per l'interfaccia |
| `salvataggio.js` | Legge e scrive sul dispositivo, e dice **quanto tempo è passato** fuori dall'app | Cambi dove si salva (Capacitor) |
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
| `salvataggio.json` | Versione del formato, ogni quanto si scrive, **il tetto del rientro** |
| ~~`tempo.json`~~ | **cancellato** col ciclo del giorno |
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

### Aggiungere una cosa **piazzabile**

Il gesto è già pronto, e non va rifatto: **tutto si piazza con la mano.**

1. Se è un materiale: `config/isola.json` → il campo `pianta`. Se è una costruzione: `config/costruzioni.json`.
2. `motore.js` → `puoPiazzareIn()` se le regole di dove ci sta sono diverse, e `piazza()` per cosa succede.
3. **Basta.** La striscia in alto, il segno della mira, il riporsi da soli e il conteggio funzionano già.

### Aggiungere un **effetto di uno sblocco**

1. `config/tecnologie.json` → `effetto: { tipo: "...", moltiplicatore: ... }` oppure `{ tipo: "...", aggiunta: ... }`.
2. Dove serve, chiedi `tecnologie.moltiplicatore(tipo, risorsa)` (si moltiplica) o `tecnologie.aggiunta(tipo)` (si somma).
3. **Leggilo quando il lavoro comincia, mai a ogni fotogramma.**

> Le cose che si contano (le caselle dello zaino) **si sommano**; le cose che sono un ritmo (velocità, tempo di lavoro) **si moltiplicano**. Sbagliare la parola dà un effetto che non si vede e che nessuno collegherebbe alla configurazione — c'è un controllo all'avvio apposta.

### Aggiungere una cosa che deve **sopravvivere alla chiusura**

1. Nel modulo che la possiede, due funzioni: `perSalvare()` e `daSalvato(dati)`.
2. `motore.js` → `raccogliDati()` e `ripristina()`, **nell'ordine giusto**: il mondo per primo (casse e operaio ci stanno sopra), poi le tecnologie (sono loro a dire quante caselle ha lo zaino), poi tutto il resto.
3. Se cambia la forma di quello che salvi, alza `versione_formato` in `config/salvataggio.json`.

**Due regole, e sono quelle che evitano di riscrivere il salvataggio fra un mese:**
- **Salva gli `id`, mai le statistiche.** `"trivella"`, non quanto scava: così un ritocco di bilanciamento arriva anche a un'isola già cominciata.
- **Salva solo quello che il giocatore ha cambiato.** La mappa di partenza sta in `isola.json`.

### Far andare avanti una cosa **fuori dall'app**

Il gancio c'è già: `recupera(passatoMs)` in `motore.js` fa avanzare il mondo a passi grossi fino a un tetto di quattro ore. Oggi ci passa solo la crescita degli alberelli.

**Una macchina ci si aggancia senza toccare il salvataggio:** basta che il suo avanzamento stia dentro una funzione che accetta un passo in millisecondi. **L'operaio no**, e non è una dimenticanza: è lui la risorsa scarsa, e il suo tempo non può passare mentre non guardi.

### Cambiare **l'aspetto** di qualcosa

Le sagome — alberi, massi, casotto, casse, operaio — **non si disegnano a ogni fotogramma.** Si disegnano una volta sola all'avvio dentro una tela nascosta (`sagome.js`) e poi si **copiano**.

Perché conta: disegnare a ogni fotogramma mette un tetto bassissimo al dettaglio, perché ogni foglia in più costa sessanta volte al secondo. Baked, ogni albero può permettersi cinque gruppi di foglie, un tronco in ombra e la luce da un lato — **e costa meno di prima**, perché copiare pixel è l'operazione più veloce che una tela sappia fare.

1. `sagome.js` → la funzione che disegna quella cosa. Le **proporzioni** stanno lì: sono disegno, non bilanciamento, e in un JSON non ci starebbero.
2. `config/isola.json` → i **colori** (`colore`, `colore_chioma`, `colore_tronco`). Le sfumature si ricavano da quei tre: non se ne chiedono otto.
3. `config/motore.json` → `grafica.sagome`: quanto è grande la sagoma disegnata, quante **varianti** e l'ingrandimento.

> **Le varianti non sono un vezzo.** Un bosco in cui gli otto alberi sono identici si legge come un timbro ripetuto. La variante si sceglie dal rumore della tessera, quindi è sempre la stessa: l'isola non cambia a ogni avvio.

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

*(Aggiornato alla roadmap v18: i numeri dei punti dall'8 in poi sono cambiati.)*

- **L'operaio va in linea retta** e attraversa gli ostacoli. Sull'isola aperta non si nota, ma va sistemato **prima** dei nastri. → punto 14.
- **Non ci sono macchine**: si fabbrica solo al banco, a mano, un pezzo per volta. → punti 8 e 10.
- **Non c'è la corrente**, e adesso **non arriva più insieme alle macchine**: c'è un'era intera di macchine a legna prima. → punto 12, e il perché sta in testa alla `ROADMAP.md`.
- **Niente si sposta da solo**: nessun nastro, nessuna trivella. → punti 11 e 15.
- **Nessun numero al minuto** da nessuna parte: il giocatore non ha modo di sapere se sta migliorando. → punto 9.

## 6. Il muro architetturale, nominato prima di sbatterci

L'autore ha chiesto di non arrivare a un punto in cui *"per fare questo dobbiamo modificare la base"*. La risposta sta in `GDD.md` §10, e si riassume così:

> **"1 legno diventa 3 legno" rompe il gioco.** Rimetti l'uscita in entrata e hai legno infinito. La regola è: **una lavorazione non produce mai il materiale che consuma** — 1 tronco → 3 *tavole*, e le tavole non rientrano nella segheria.

**È un controllo all'avvio**, non una cosa da ricordare. Per il resto la base regge: le tessere hanno uno stato, i contenitori sono generici, materiali ed effetti sono dati.
