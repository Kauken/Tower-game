# Passaggio di consegne

*Aggiornato il 2026-08-16, alla fine di una sessione lunghissima: 39 commit, 20 ricerche, e il gioco cresciuto da 5.300 a 6.070 righe.*

**Se stai riprendendo il progetto da zero, leggi solo questo file.** Ti dice dov'è il gioco, cosa è deciso, cosa no, e dove sono le trappole.

---

## 0. Le tre cose da sapere prima di toccare qualsiasi cosa

### ⚠️ La copia di lavoro torna indietro da sola
È successo **tredici volte** in una sessione. Il sintomo: `docs/PROGETTI.md` non esiste, oppure `docs/GDD.md` parla di torri e ondate. La cura:

```
git fetch origin && git checkout -B claude/torre-guardia-scaffold-5fv3nl origin/claude/torre-guardia-scaffold-5fv3nl
```

**Da qui discende la regola più importante del progetto:** ogni `git commit` è seguito **subito** da `git push`, nello stesso comando. Un commit locale non esiste — una volta se n'è portato via un lavoro intero.

### ⚠️ Vale anche per gli agenti
Un agente di ricerca deve **scrivere il suo file dopo le prime 4-5 ricerche** e riscriverlo strada facendo. Tre agenti sono morti sul limite di sessione: quelli che avevano già scritto hanno salvato tutto, gli altri hanno perso venti ricerche.

### ⚠️ Come si prova nel browser
Playwright non è installato nel progetto (e non va aggiunto). Si fa così:

```
cd /tmp && npm init -y && npm install playwright-core --no-save
```
e poi `import { chromium } from '/tmp/node_modules/playwright-core/index.mjs'`, con `executablePath: '/opt/pw-browsers/chromium'`.

**Per provare una partita avanzata**: far girare il gioco una volta, leggere `localStorage.getItem('isola')`, modificarlo, e riseminarlo in un contesto **nuovo** con `addInitScript` — se si usa `reload()` la pagina vecchia riscrive il salvataggio prima che serva. E attenzione: **una casella non tiene più di una pila** (la pietra si ferma a 10), quindi `['pietra', 20]` viene scartato in silenzio.

---

## 1. Dov'è il gioco, adesso

**Funziona ed è pubblicato** su https://kauken.github.io/Tower-game/ — ogni push su `main` lo ripubblica.

### Cosa si può fare giocando
Tagliare alberi e ripiantarli · scavare vene che non finiscono mai · fabbricare al banco · **costruire casse, banchi, fucine e segherie** · caricare una macchina e guardarla lavorare · sbloccare la catena dei nove progetti.

### La catena dei progetti, e come si sblocca
> ascia → zaino → stivali → piccone → vivaio → carriola → **segheria** → **fucina** → ascia da boscaiolo

**Non si compra niente.** Una cosa si apre quando ne hai **fabbricata** un'altra.

### I materiali
legno · pietra · rame · alberello · tavola · ghiaia · chiodo · telaio · **lingotto di rame**

### Le costruzioni
| | Cosa fa |
| --- | --- |
| **Cassa** | contiene roba, e basta |
| **Banco da lavoro** | ci si fabbrica senza tornare al casotto |
| **Fucina** | ha **ricette sue**: fonde il rame in lingotti |
| **Segheria** | l'unica **macchina**: lavora da sola, brucia legno |

Il **casotto** ha un banco dentro dall'inizio ed è l'unico posto con la **bacheca dei progetti**.

---

## 2. Cosa è stato deciso, e non si rimette in discussione

| Decisione | In breve |
| --- | --- |
| **Niente monete, niente vendita, niente mercanti** | una cosa si sblocca fabbricandone un'altra |
| **C'è un finale, ma non chiude** | dà un traguardo, dopo di lui il gioco continua |
| **Una tecnologia nuova non rende inutile quella prima** | ogni mezzo è il migliore in una cosa e il peggiore in un'altra |
| **I nastri si tracciano alla Mini Metro** | tocchi partenza e arrivo, il percorso lo trova il gioco |
| **Le isole sono vicine, niente nastri lunghi** | e quindi il treno non ha un mestiere: diventa un **carro** |
| **Ci saranno animali e colture** | non è in discussione *se*, ma *come* |
| **Niente commesse, niente regali quotidiani, niente attese a timer** | rifiutate due volte ciascuna |

Tutte con la data e le parole esatte dell'autore in `docs/DECISIONI.md`.

## 3. Cosa è ancora aperto

| | Domanda | Perché blocca |
| --- | --- | --- |
| **A1** | Quante isole, e cosa porta ognuna | contenuto, non urgente |
| **A2** | Il generatore si alimenta col nastro? | si decide al punto 15 |
| **A3** | Quanto grande lo zaino di partenza | **misurato**: 3 caselle rompono il gioco, 4 è il pavimento |
| **A5** | ~~La valuta serve ancora?~~ | **chiusa**: tolta |

E **due domande all'autore restano senza risposta da tre giorni**, con un 🛑 nella roadmap:
1. *Guardando la bacheca, c'è un progetto che vuoi?*
2. *Portare la roba a mano dà fastidio quel tanto che basta?*

---

## 4. Cosa sappiamo, e come lo sappiamo

**Venti ricerche, 6.078 righe**, tutte in `docs/ricerche/`. Le due sintesi da leggere per prime sono `SINTESI.md` e `SINTESI-PROGRESSIONE.md`.

### Le cinque cose più utili che ne sono uscite

> **La durata la fanno i progetti, il prezzo fa il ritmo.** Alzare i costi per allungare il gioco è *padding*, e ha un nome nel settore.

> **Sotto il 15% un miglioramento non esiste.** Non è "poco": è invisibile. Due ricerche indipendenti, stessa soglia.

> **In un gioco di automazione la calma non muore per la profondità: muore per la configurazione ripetuta.** Autonauts ha una discussione intitolata *"è normale sentirsi super stressati?"*.

> **Cozy non è assenza di stress: è assenza di stress più risposta.** Abbiamo fatto tutta la metà del *togliere* e zero della metà del *mettere*.

> **Non si smonta mai quello che funziona.** Il muro della ricostruzione è il punto documentato in cui la gente abbandona questo genere.

### Le tre misure fatte in casa, che valgono più delle ricerche

| Misura | Risultato |
| --- | --- |
| **La partita intera** (`npm run progressione`) | **4,8 minuti** per tutti i progetti. Il gioco non c'è ancora |
| **La prova del grigio** | sette cose stavano dentro **venti livelli su 255**: l'isola era illeggibile. Corretto |
| **Raffinare prima di vendere** | era **sempre** una perdita: il tempo dell'operaio vale più del margine |

---

## 5. Gli strumenti, e usali

```
npm run dev            sviluppo
npm run build          deve passare, sempre
npm run simula         quanto vale un minuto dell'operaio
npm run progressione   gioca la partita intera e misura i buchi fra gli sblocchi
npm run progressione -- --confronto    prova le proposte invece di crederci
```

**Gli strumenti di misura hanno trovato quattro difetti veri**, tre dei quali erano errori di chi li ha scritti. Usali prima di discutere di numeri.

---

## 6. Cosa manca, in ordine di quanto conta

### Il punto 12 è **FATTO** (2026-08-16)
> **Il generatore e i pali.** Copertura ad area, nessun filo. Una macchina coperta non brucia più il suo legno: lo brucia il generatore, in un posto solo. Una macchina scoperta **non si ferma**, torna a bruciare il suo.
> Costruendolo è saltato fuori che **Segheria e Fucina erano irraggiungibili** — un progetto che apre una costruzione non veniva mai segnato come fatto. Corretto: costruire una cosa *è* fabbricarla.

### Il prossimo passo, e ce ne sono due sensati
> **Punto 10 e 11: il frantoio, la fornace e la trivella.** Sono loro a far mordere il punto 12: finché le macchine da riempire sono una o due, la fatica che la corrente toglie non si è ancora sentita. È anche la verifica 🛑 dopo il punto 11 della roadmap.
>
> Oppure **punto 9: il numero al minuto** — piccolo, economico, e manca da sempre.

### Poi
- **Punto 15: i nastri**, alla Mini Metro (già deciso)
- **Il cantiere** — la costruzione grossa che mangia materiali e apre l'era. Serve **anche** a chiudere un buco aperto: da quando le monete non ci sono più, **il materiale che avanza non ha nessuna destinazione**

### Le cose piccole già misurate e non ancora fatte
| Cosa | Da dove viene |
| --- | --- |
| **Il deposito rapido** nelle casse vicine | la comodità più copiata del genere (853.000 scaricamenti per una mod sola) |
| **Il numero al minuto** | il primo dei tre motori del "per sempre", e manca del tutto |
| **Il bottone Chiudi** sta in fondo a un contenuto che scorre | con una lista lunga, il modo di uscire è fuori schermo |
| **La casella premibile** invece delle pastiglie Posa/Prendi | lo standard, e le pastiglie duplicano la griglia |
| **Il cassetto** che si legge da fuori | il problema che risolve nasce nell'Era 1, non nella 4 |
| **Il registro** di cosa hai fatto | l'unica riga che **tutti e otto** i giochi esaminati hanno e noi no |
| **Smontare col rimborso pieno** | la cura del "dito che sbaglia tessera" |

---

## 7. L'avvertimento onesto

A metà sessione è stato fatto un bilancio (`docs/BILANCIO.md`) e il risultato è stato scomodo:

> **6.900 righe scritte sul gioco contro 5.300 righe di gioco.** In una giornata intera di lavoro, dodici commit e **nessuno** che toccasse il gioco.

La ricerca era buona e ha corretto quattro cose sbagliate. Ma **di dieci risultati, solo due erano finiti nel gioco**. L'autore se n'è accorto da solo e l'ha detto.

> **Il progetto non ha bisogno di sapere altro. Ha bisogno di cose che girano.**

Se ti viene voglia di aprire un'altra ricerca prima di aver costruito il punto 12, **rileggi questa riga.**
