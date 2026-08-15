# La sintesi delle quattro ricerche sulla progressione

**Quattro ricerche, 75 ricerche sul campo, ridotte a quello che cambia il gioco.**
I report completi stanno in questa cartella: `progressione-la-curva.md`, `progressione-il-ritmo.md`, `progressione-il-desiderio.md`, `progressione-la-durata.md`.

> **Due note oneste, in testa.**
> **Reddit è risultato bloccato** in tutte e quattro, come nelle sei precedenti (dieci su undici). Il materiale viene da Discussioni Steam, forum ufficiali, wiki, Friday Facts di Wube, GDC, Game Developer, TV Tropes, devlog e itch.io.
> **La quarta ricerca è una bozza.** L'agente ha fatto 18 ricerche e ha esaurito il limite di sessione mentre scriveva la versione finale. Il file dice "Bozza 2": il contenuto c'è tutto, la rifinitura no. Si è salvato solo perché aveva ordine di scrivere presto e riscrivere spesso — la regola nata dal report che avevamo perso.

---

## 0. Il fatto da cui si parte, misurato

Prima di leggere qualunque ricerca, questo è il nostro gioco misurato con `npm run progressione`:

| Progetto | costo | arriva a | buco dal precedente |
| --- | --- | --- | --- |
| Ascia affilata | 120 | 0,9 min | 0,9 |
| Zaino grande | 160 | 1,1 min | **0,2** ⚠️ |
| Stivali buoni | 210 | 3,6 min | 2,4 |
| Piccone pesante | 260 | 6,2 min | 2,6 |
| Vivaio | 450 | 10,7 min | 4,6 |
| Carriola | 520 | 13,5 min | **2,8** ⚠️ |

**La partita intera dura 13 minuti e mezzo.**

---

## 1. La conclusione, e le quattro ricerche ci arrivano da quattro strade

> ### 13,5 minuti non sono una curva sbagliata. Sono un gioco che non c'è ancora.
>
> E la cura **non è alzare i prezzi**: è avere più cose da volere.

Detto nella forma più corta che ho trovato, ed è la frase da ricordare:

> **Il numero di progetti fa le ore. Il prezzo dei progetti fa il ritmo.**
> Chiedere ai prezzi di fare le ore è il modo documentato di rovinare il gioco.

Come ci arrivano, ognuna per conto suo:

- **La durata** trova il bersaglio: i giochi di raccolta-e-costruzione che la gente considera "pieni" stanno fra le **15 e le 40 ore**. Forager — il gioco misurato più simile al nostro — sta a **15,5 ore**. Siamo lontani di un **fattore 70**, non di un fattore 2.
- **La curva** ci arriva dal lato opposto e dice la stessa cosa: *"il nostro rischio non è il muro, è il piatto"*, e cita il caso di Nomad Idle — *"si arriva alla zona 200 in poche ore e poi non succede più niente"*.
- **Il ritmo** dà il termine di paragone: la prima sessione di un gioco così dura **15-60 minuti**. Il nostro contenuto **intero** ne dura 13.
- **Il desiderio** spiega perché il piatto è mortale: il desiderio si spegne quando **non c'è più un bersaglio visibile**, non quando la fatica è troppa.

### E alzare i costi è padding, con nome e cognome

Questa era la nostra tentazione, ed è bene che sia scritta:

> Riempire di contenuto è **dare quantità al posto di qualità**. Si allunga il tempo di gioco **stiracchiando quello che c'è già**, finché il gioco sembra un lavoro da sbrigare. La forma più fastidiosa è quando **il giocatore sa già cosa fare, ed è il gioco a bloccarlo**.
> — Josh Bycer, *The Problems with Padding out Game Design*

TV Tropes ha un nome per l'insieme di questi trucchi: **Fake Longevity**. E sulle attese a tempo la formulazione è ancora più dura: i cancelli a tempo sono *"il trucco più contro-il-consumatore che esista oggi nei giochi"* (Forbes).

**Tradotto sul nostro caso**: se moltiplichiamo i prezzi per dieci, il gioco dura 135 minuti invece di 13,5, ma **ogni minuto in più è identico a un minuto che c'era già**. Il giocatore sa benissimo cosa deve fare: raccogliere altra legna. È il gioco che lo trattiene.

### I modi buoni, in ordine

| # | Modo | Perché non è padding |
| --- | --- | --- |
| 1 | **Aggiungere cose da comprare** | il tempo in più è tempo passato davanti a **scelte nuove** |
| 2 | **Aggiungere verbi** (fondere, comporre, la roba si muove da sola) | rende diverso anche il tempo vecchio |
| 3 | **Alzare i costi *insieme* a un salto di produzione** | il giocatore non ripete di più: **ripete meglio** |
| 4 | **Rendere più profonda una ripetizione che c'è già** | la stessa raccolta con una decisione in più dentro |
| 5 | ~~Alzare i costi e basta~~ | ❌ padding |

**Il punto scomodo:** i modi buoni costano tutti tempo di costruzione, il modo cattivo è gratis. È per questo che i giochi lo fanno. **I 32 progetti di `PROGETTI.md` non sono un lusso: sono la cura.**

---

## 2. Dove le ricerche smentiscono quello che avevo scritto

### ❌ «La curva ×1,5 non può valere per tutti e trentotto» — **sbagliato, e il conto era sbagliato**

Avevo scritto che con la curva ×1,5 l'ultimo progetto costerebbe *"oltre un miliardo"* di monete, e che quindi la regola andava buttata. **Sono 392 milioni**, e soprattutto **non è un problema**: in un gioco dove la produzione cresce moltiplicando, un numero grande alla fine è normale.

Il problema vero è un altro, e più profondo:

> **Non esiste "la curva dei costi".** Esiste solo il rapporto fra **quanto costa** e **quanto produci**, ed è quello il tempo che il giocatore aspetta. Il nostro ×1,5 non è né giusto né sbagliato: è **incompleto**, perché accanto non c'è scritto di quanto deve crescere la produzione. Con produzione ×1,3 funziona; con produzione ×1,2 il gioco è rotto.

### ❌ «Lo zaino base a 3 caselle» — **la mia proposta rompe il gioco**

L'avevo messa come opzione della decisione A3. Misurata con `npm run progressione`: **la partita si pianta dopo un solo sblocco**. Non è lentezza — fabbricare il telaio mette in ballo **quattro materiali diversi** (legno, tavola, rame, chiodo) e in tre caselle non ci stanno. Con quattro si finisce. **Quattro è il pavimento.**

La misura precedente non l'aveva visto perché guardava solo la raccolta, non la fabbricazione. È il motivo per cui uno strumento che gioca la partita intera vale più di uno che misura un minuto.

### ❌ Il confine fra un'era e l'altra: **è il punto più piatto della curva, e dovrebbe essere il più ripido**

Le fasce d'era che ho scritto in `PROGETTI.md` implicano ×1,16-1,28 dentro l'era, ma solo **×1,15 al salto d'era**. Cioè il momento che dovrebbe essere il più memorabile del gioco è quello in cui si sente di meno.

E `PROGETTI.md` e `MATERIALI.md` **si contraddicono**: uno dice ×1,5, le fasce dell'altro dicono ×1,16-1,28.

### ⚠️ Le 300 monete di partenza rubano due momenti

Non l'avevo scritto come difetto, ma lo è: **si comprano Ascia e Zaino prima di aver sentito i problemi che tolgono.** Misurato: togliendole, il primo buco passa da 0,9 a 2,4 minuti.

---

## 3. Dove due ricerche diverse arrivano allo stesso numero

Il segnale più forte del lotto, perché nessuna delle due sapeva dell'altra:

| Ricerca | Come ci arriva | Il numero |
| --- | --- | --- |
| **La curva** | dai numeri pubblici di Cookie Clicker, ricostruendo il passo fra un *tipo* di edificio e il seguente | fra un progetto e il successivo si deve **aspettare il 15-20% in più** |
| **La durata** | dalla soglia sotto cui un miglioramento non si percepisce | **sotto il ~15% un miglioramento non si sente** |

Due strade, la stessa soglia. **Il 15% è il nostro numero**, sia come passo minimo della curva sia come effetto minimo di un oggetto.

E spiega lo Zaino grande da un'altra parte ancora: misurato ×1,00, **non è caro — è invisibile.**

---

## 4. I numeri veri, tutti in un posto

| Cosa | Valore | Citato o derivato |
| --- | --- | --- |
| Si deve **giocare** entro | **60 secondi** | citato — ricettario di onboarding, luglio 2026 |
| Il *"ah, ecco perché è bello"* entro | **90 secondi** | citato — stessa fonte |
| Se il tutorial supera | **15 minuti** | **citato — Friday Facts di Factorio #241**, prima mano |
| Un'idea si presenta, sviluppa, ribalta e mette via in | **5 minuti netti** | citato — regola dei quattro passi di Nintendo (*kishōtenketsu*) |
| Sessione mediana su telefono | **~5 minuti** | citato — coincide con la riga sopra |
| Durata di un gioco di raccolta-e-costruzione "pieno" | **15-40 ore** | citato — Forager a 15,5 h è il più vicino a noi |
| Passo minimo fra due progetti | **+15-20% di attesa** | derivato da Cookie Clicker (costo ×11, produzione ×5,5, attesa ×2 su 9 passi) |
| Crescita dei costi, con produzione ×1,3 | **×1,5** | derivato — ma per la prima volta **con un motivo** |
| Traguardi aperti insieme | **2-3 minimo, 8-9 massimo** | derivato dai traguardi sfalsati di Civilization e dal tetto già trovato |
| Durate che creano *"ancora un turno"* in Civilization | ricerca ~10 turni, edificio ~8, colono ~12 | citato — GDC |
| Valore in più dato a ciò che si è montato da sé | **+63%** | citato — effetto IKEA (Norton) |
| **La nostra partita, oggi** | **13,5 minuti** | **misurato da noi** |

---

## 5. Le tre regole nuove che ne escono

Sono regole, non numeri: valgono anche quando i numeri cambieranno.

> ### 1. La durata la fanno i progetti, il ritmo lo fanno i prezzi.
> Alzare i costi per allungare il gioco è padding, e ha un nome nel settore. Se il gioco è corto, mancano cose da volere.

> ### 2. Un miglioramento sotto il 15% non esiste.
> Non è "poco": è **invisibile**. Un oggetto che dà meno di così non va ritoccato, va tolto o ripensato.

> ### 3. Il salto d'era deve essere il momento più ripido, non il più piatto.
> E si conquista **con una consegna, non con un prezzo** — è il modello di Satisfactory, che apre i suoi nove livelli a coppie chiuse da un progetto enorme. Il nostro **pontile** è già così; le altre tre porte hanno solo un prezzo.

E una regola su cosa **non** fare al salto d'era, da un caso fresco: **Civilization VII al cambio d'era ti toglie roba, e i giocatori usano la parola *punito*.** Il salto d'era **apre due o tre cose e non ne toglie nessuna.**

---

## 6. Cosa cambia, in ordine

| # | Cosa | Dove | Stato |
| --- | --- | --- | --- |
| 1 | **La durata la fanno i progetti, non i prezzi** — regola scritta | `CLAUDE.md`, `MATERIALI.md` | ✅ **da fare subito** |
| 2 | **Niente attese a tempo per allungare** — accanto a "niente regali quotidiani" | `GDD.md` §14 | ✅ **da fare subito** |
| 3 | **Un miglioramento sotto il 15% non esiste** | `MATERIALI.md` | ✅ **da fare subito** |
| 4 | **Il salto d'era si conquista con una consegna, e non toglie niente** | `ROADMAP.md`, `PROGETTI.md` | ✅ **da fare subito** |
| 5 | **La curva ×1,5 va scritta insieme alla produzione ×1,3** | `MATERIALI.md` | ✅ **da fare subito** |
| 6 | **La contraddizione fra le fasce d'era e il ×1,5** | `PROGETTI.md` ↔ `MATERIALI.md` | ✅ **da fare subito** |
| 7 | **Dopo un oggetto che alza il reddito, il prezzo dopo salta di più** — è il difetto Vivaio→Carriola | `MATERIALI.md` | ✅ **da fare subito** |
| 8 | **La bacheca mostra la domanda che il progetto toglie, non il guadagno** | interfaccia, `GDD.md` | 🟡 **da decidere** |
| 9 | **Le 300 monete di partenza** | `config/` | ⚠️ **misurato, decide l'autore** |
| 10 | **Il bersaglio di ~15 ore, dichiarato** | `GDD.md` | ⚠️ **decide l'autore** |
| 11 | **Il finale (A4)** — tre voci ci sbattono contro | `DECISIONI.md` | ⚠️ **decide l'autore** |
| 12 | **Il posto sicuro**: le prime volte non possono fallire | `GDD.md`, quando arrivano le macchine | 🔵 da valutare |
| 13 | **Il gancio del giorno 2 è l'affare lasciato a metà** — ce l'abbiamo già | niente da costruire | ✅ già preso |

---

## 7. Quello che le ricerche **non** hanno trovato

Scritto perché non venga riempito a fantasia più tardi.

- **Nessuna regola pubblicata del tipo "una cosa nuova ogni X minuti".** Il nostro 10-20 minuti resta un numero nostro, non citabile.
- **Quante ore duri un'era**: per il secondo report di fila, nessuno lo pubblica.
- **Nessuna soglia numerica fra fatica e macinare.** Confermato per la terza volta. Tutte le fonti spostano la linea su *cosa accompagna* la ripetizione. **Il numero probabilmente non esiste.**
- **Nessun test A/B fra "mostrare in anticipo" e "sorprendere".** La nostra bacheca coi progetti spenti è ben fondata, **non è dimostrata**.
- **Niente sul desiderio nei giochi da telefono in verticale**, che è esattamente il nostro caso.
- **Nessun post-mortem con numeri** di un gioco morto per il doppio passo (compri il diritto, poi fabbrichi).
