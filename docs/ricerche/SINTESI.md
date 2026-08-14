# La sintesi delle sei ricerche

**1729 righe di ricerca, ridotte a quello che cambia il gioco.** I sei report completi stanno in questa cartella; qui c'è quello che se ne ricava messo insieme.

> **Nota sulle fonti, dichiarata da cinque report su sei:** **Reddit è risultato bloccato** allo strumento di ricerca. Il materiale viene da Discussioni Steam, forum ufficiali, wiki, Friday Facts di Wube, GDC, Game Developer, TouchArcade, Pocket Gamer, devlog e un paper accademico. È scritto qui perché una ricerca che non dichiara i suoi buchi è peggio di una che non è stata fatta.

---

## 1. Dove tutti e sei sono d'accordo

Quando ricerche indipendenti arrivano alla stessa conclusione partendo da domande diverse, quello è il segnale più forte che si possa avere.

### Il viaggio deve costare, o metà del gioco non esiste
Tre report ci arrivano da tre strade diverse:
- **Satisfactory/Factorio**: il trasporto a mano non stanca perché lo zaino è piccolo, ma perché **la distanza è grande e la raccolta è lenta**. Lo zaino è solo il moltiplicatore del viaggio.
- **Numeri e curve** lo trasforma in una formula: uno zaino infinito rende al massimo **1/(1−f)**, dove `f` è la frazione di tempo passata a camminare. Da noi `f` vale **0,16 nel bosco e 0,03 sulla vena vicina**.
- **Minecraft tecnico**: il dolore delle casse non è lo spazio, è il *chest monster* — **tempo speso senza decidere niente**.

### L'automazione non deve togliere al giocatore la ragione di esistere
Due report ci arrivano **indipendentemente, e propongono lo stesso identico rimedio**:
- **Minecraft tecnico**: il pericolo più insidioso è l'automazione totale — *"non stai più giocando, stai guardando i mod che giocano al posto tuo"*. Da cui: **l'autocrafting deve togliere tocchi al giocatore, mai tempo all'operaio.**
- **Ere e catene**: all'era delle trivelle la scarsità del tempo dell'operaio si svuota. Contromisura: **le macchine consumano combustibile, e a caricarlo è lui**.

Due ricerche che non si parlano arrivano allo stesso rimedio: è la conclusione più solida di tutto il lotto.

### Si abbandona per incertezza, non per difficoltà
- **Perché si smette**: un gioco idle perdeva tutti prima del bottone di prestigio perché nessuno capiva cosa facesse. Spiegato con un fumetto e un'anteprima: **+19% di ritenzione oltre il giorno 7**.
- **Telefono e cozy**: i porting di automazione non muoiono per la profondità, muoiono per **un dito che sbaglia tessera**.

### Una cosa desiderata alla volta, non dieci
Il vuoto uccide, ma **il troppo uccide quanto il vuoto** (caso Stardew). Ed **ere e catene** arriva alla stessa misura per un'altra strada: mai più di **8-9 oggetti aperti insieme**.

---

## 2. Dove le ricerche smentiscono quello che avevamo scritto

Quattro correzioni. Tre sono al `GDD.md`, una alla `ROADMAP.md`.

### ❌ «Salire di gradino è una ricostruzione» — **sbagliato, e pericoloso**

Il GDD dice, oggi:

> *"Salire di gradino non è un potenziamento, è una ricostruzione. La macchina di livello 2 non entra dove stava quella di livello 1, e va rialimentata."*

L'avevo scritta come la forma concreta del *"infinito da rifinire sempre"*. **Perché si smette** dimostra che è uno dei modi principali in cui questi giochi muoiono: la partita finisce quando uno sblocco obbliga a smontare quello che avevi, e i giocatori lo descrivono come *"progresso lento e un sacco di seccature, mentre la fabbrica non produce niente"*.

Ed è anche **il vero motivo per cui non si torna a un salvataggio**: non *"non ricordo dov'ero"*, ma *"mi aspetta un lavoraccio"*.

> **La regola nuova, che i giocatori si sono inventati da soli: NON SI SMONTA MAI.**
> La catena vecchia resta accesa e produce i pezzi per la nuova. Ogni gradino va progettato con la domanda: *"per usarlo, il giocatore deve disfare qualcosa?"* Se sì, va ripensato.

### ❌ «Macchine e corrente sono un punto solo» — **ordine sbagliato**

**Tre giochi su quattro mettono un'era intera di macchine senza corrente prima dell'elettricità.** La corrente deve essere **il secondo problema, non il primo**.

Avevo legato i due sistemi con un argomento che sembrava solido: *"una macchina che funziona e poi da un giorno all'altro non funziona più è una promessa rotta"*. L'argomento è giusto, la conclusione no — perché la soluzione non è farli insieme, è **un'era di macchine a combustibile** e poi le macchine **elettriche** come gradino che le supera. Nessuna promessa rotta, e **due momenti di soddisfazione invece di uno**.

### ❌ «Lo Zaino grande è mal bilanciato» — **è matematicamente impossibile**

Non è una questione di prezzo. Col soffitto `1/(1−f)` e `f = 0,16`, uno zaino **infinito** renderebbe al massimo **×1,20**. Per ripagare 160 monete servirebbe ×1,32. **Nessun prezzo salva l'oggetto: va cambiata la mappa.**

E il modello è **validato**: predice 202 monete/min sulla vena ricca, la nostra simulazione ne ha misurate **201**.

### ❌ «Le macchine sono pannelli da aprire» — **devono vedersi**

**Perché Create ha vinto** su Mekanism e Thermal: niente scatole nere — ogni passaggio si vede fra i blocchi — nessun menù per macchina, e la corrente è un vincolo che *si vede*. Gli altri danno **potere**; Create dà **una cosa da guardare che hai fatto tu**.

Per noi: le macchine devono **vedersi sull'isola e muoversi**, e lo stato (ferma / senza materiale / senza combustibile) deve leggersi **senza aprire niente**.

---

## 3. Dove le ricerche si contraddicono fra loro

**È qui che si impara qualcosa**, e va risolto invece che nascosto.

### ⚔️ Rallentare l'inizio del 34% contro «si abbandona nei primi 15 minuti»

- **Numeri e curve** propone di allontanare le fonti e dimezzare lo zaino. Effetto dichiarato: la produzione base scende **da 166 a 109 monete/min, −34%**. Lo chiama *"lo spazio in cui vivono gli oggetti da trasporto"*.
- **Perché si smette** dice che il punto di abbandono più affollato è **il primo quarto d'ora**, e che in Dyson Sphere Program — un gioco riuscito — **più di metà dei giocatori se ne va entro la prima mezz'ora**. **Minecraft tecnico** aggiunge che gli autori di GregTech New Horizons indicano l'**avanzare troppo lentamente** come la causa del bruciarsi, non la difficoltà.

Sono in conflitto diretto: uno vuole rallentare l'inizio, l'altro dice che l'inizio lento è ciò che uccide.

> **Come lo risolvo.** Il conflitto è apparente perché parlano di **fonti diverse**. La proposta va applicata **al bosco secondario e alle vene**, non alla prima cosa che il giocatore tocca. Concretamente: **il primo bosco resta vicino** — i primi cinque minuti devono essere generosi — e sono **le vene e il secondo bosco** ad allontanarsi. Così `f` sale dove serve (nella parte lunga della partita, dove vivono zaino e stivali) senza toccare i quindici minuti che decidono se il giocatore resta.
>
> Va **misurato con la simulazione**, non deciso a occhio: è esattamente il motivo per cui il punto 7 esiste.

### ⚔️ Catena corta contro catena lunga

- **Ere e catene**: Immersive Engineering si ferma a **×2 e basta**, e la profondità sta nel *costruire* la macchina. È indicato come il modello più adatto a un telefono.
- **Minecraft tecnico**: il gradino più amato del genere è l'**autocrafting**, che è la cima di una catena lunghissima.

> **Come lo risolvo.** Non è la stessa scala. La **catena di lavorazione** resta corta (×2, al massimo ×3): su un telefono una catena di sei passaggi non si legge. La **scala del magazzino** invece resta lunga, perché lì i gradini non aggiungono passaggi, **ne tolgono**. Corta dove si produce, lunga dove ci si libera.

---

## 4. Le cose nuove che nessuno di noi aveva pensato

- **Il tetto dell'offline si vende come progetto** — 4h → 6h → 8h → 12h. Trasforma un valore tecnico in progressione.
- **La forbice di Mekanism**: il guadagno fa +100%, +50%, +33%, +25% mentre le macchine da costruire vanno 1, 3, 5, 8. **È la forbice che rende l'ultimo gradino un lusso e non un obbligo.**
- **Mancano le compressioni** (tipo 5 → 1, l'acciaio). Da noi non ce n'è nessuna: segnalato come il buco più grosso delle catene.
- **Gli incontri fra due catene sono 1 ogni 4-6 semilavorati**, non a ogni passaggio. Noi ne abbiamo uno (il telaio): siamo nel giusto, non serve aggiungerne.
- **La prima macchina deve arrivare già alimentata**, così il primo incontro è con una cosa che funziona.
- **Niente ricompense di accesso quotidiano**: hanno bruciato i giocatori di Animal Crossing, che raccontano di essersi ri-bruciati **in una settimana**. In un gioco senza fretta sarebbero un dovere, e i doveri fanno smettere.

---

## 5. I nastri col dito — la risposta, e il suo limite

Era la domanda di comandi più grossa che ci aspetta. La raccomandazione:

> **Tocca la partenza → tocca l'arrivo → anteprima fantasma → Conferma**, con un pulsante *"gira il gomito"*, e il nastro che **resta in mano** per farne un altro.

**Niente trascinamento libero**: confligge con lo scorrimento della mappa e non si usa con una mano. Mini Metro dimostra che il trascinamento *può* funzionare, ma solo perché **rimborsa tutto e lascia rifare** — e anche lì i giocatori si lamentano che in modalità disegno il gioco zooma e non si vede più la mappa.

E il limite, dichiarato dalla ricerca stessa:

> **Non esiste nessun gioco di automazione con nastri nato su telefono in verticale.** Questa raccomandazione è una sintesi ragionata, **non una soluzione collaudata da altri**. Quando ci arriveremo, va provata come un esperimento, non applicata come una ricetta.

---

## 6. I numeri, tutti in un posto

| Cosa | Numero | Da dove |
| --- | --- | --- |
| Sessione mediana su telefono | **5-6 minuti** | Telefono e cozy |
| Sessione mediana di un idle | **6,4 minuti** | Telefono e cozy |
| Quante volte si apre al giorno | **4-6** | Numeri e curve |
| Informazione che regge uno schermo verticale | **metà** di un PC | Telefono e cozy |
| Un acquisto ogni | **1,5-3 minuti** | Numeri e curve |
| Una cosa **nuova** ogni | **10-20 minuti** | Numeri e curve |
| Crescita dei costi per acquisti ripetibili | **×1,07-1,15** | Numeri e curve |
| Crescita dei costi per contenuti nuovi | **×3** | Numeri e curve |
| Crescita consigliata per i nostri progetti | **×1,5** → 120, 180, 270, 405, 608 | Numeri e curve |
| Ammortamento di un attrezzo | **3-8 minuti** | già in `MATERIALI.md`, confermato |
| Purezza dei giacimenti | **×0,5 / ×1 / ×2** | Satisfactory |
| Moltiplicazione dei minerali, tetto sensato | **×2**, al massimo ×3 | Ere e catene |
| Ingredienti per ricetta | **1-3** | Ere e catene — coincide con la nostra regola |
| Incontri fra catene | **1 ogni 4-6 semilavorati** | Ere e catene |
| Oggetti aperti insieme | **mai più di 8-9** | Ere e catene + Perché si smette |
| Tetto offline | 2-8h a resa piena, oppure 12-24h al 20-50% | Numeri e curve |

---

## 7. Cosa cambia, in ordine

| # | Cosa | Dove | Stato |
| --- | --- | --- | --- |
| 1 | **Non si smonta mai**: la regola della ricostruzione va rovesciata | `GDD.md` §11b | ✅ da fare subito |
| 2 | **La roadmap si riorganizza per ERE**, e la corrente si stacca dalle macchine | `ROADMAP.md` | ✅ da fare subito |
| 3 | **Le macchine si vedono e si muovono**, lo stato si legge senza aprire | `GDD.md` §9 | ✅ da fare subito |
| 4 | **Le macchine consumano combustibile che carica l'operaio** — è la contromisura alla morte della spina dorsale | `GDD.md` §2 e §10b | ✅ da fare subito |
| 5 | **La corrente non spegne mai tutto**: solo il gruppo, e avvisa prima | `GDD.md` §10b | ✅ da fare subito |
| 6 | **Il terminale va fatto lento**, non solo caro | `GDD.md` §11b | ✅ da fare subito |
| 7 | **Lo Zaino grande**: allontanare le vene e il bosco secondario, **non** il primo bosco. Zaino base da 6 a 3 caselle | `config/` | ⚠️ **da provare con la simulazione, poi decide l'autore** |
| 8 | **Curva dei costi dei progetti a ×1,5** | `MATERIALI.md` | ⚠️ da tarare |
| 9 | **Aggiungere una compressione** alle catene | `MATERIALI.md` | 💡 quando arrivano le macchine |
| 10 | **Vendere il tetto dell'offline come progetto** | roadmap, Era 3 | 💡 idea nuova, da valutare |
| 11 | Niente ricompense di accesso quotidiano | `GDD.md` §14 | ✅ da scrivere fra i "non è" |

---

## 8. Quello che le ricerche **non** hanno trovato

Messo qui perché non venga riempito a fantasia più tardi:

- **Un numero di ripetizioni oltre cui scatta il tedio.** Non esiste in nessuna fonte raggiunta. Conta quante ripetizioni **di fila sono identiche**, non quante sono in totale.
- **Le ore per era** nei modpack: non sono pubblicate da nessuna fonte citabile.
- **Il dato «il cammino deve pesare il X% del tempo»**: non è pubblicato. Il nostro 0,37 è **derivato dalla formula**, non citato.
- **Post-mortem documentati con numeri** di giochi cozy o di automazione falliti.
- **Un gioco di automazione con nastri nato su telefono in verticale.** Non esiste.
- Materiale serio sull'**affaticamento da tocco**.
