# La durata: quanto deve durare, e come si tara

*Ricerca sul tempo complessivo di una progressione e sul metodo pratico di taratura.
Le altre tre ricerche parallele parlano di forma della curva, ritmo degli sblocchi e desiderio: qui non se ne parla.*

**Bozza 2 — in aggiornamento.**

---

## In una riga

**13,5 minuti non sono una curva sbagliata: sono un gioco che non c'è ancora** — i giochi di raccolta-e-costruzione che la gente considera "pieni" stanno fra le **15 e le 40 ore**, e il modo giusto di arrivarci è **aggiungere cose da comprare**, non alzare i prezzi di quelle che ci sono.

---

## 1. Quante ore dura un gioco così

### I numeri trovati (tutti **citati**, non miei)

| Gioco | Che gioco è | Durata "arrivare in fondo" | Durata "fare tutto" | Fonte |
| --- | --- | --- | --- | --- |
| **Forager** | raccogli, costruisci, sblocca su un'isola — il più vicino a noi che esista | **15,5 h** | **42,5 h** | HowLongToBeat |
| **Slime Rancher** | raccolta e gestione, prima persona | **6-10 h** | ~70 h (giocatore) | Discussioni Steam |
| **Stardew Valley** | gestione di una fattoria | ~80 h (una partita normale) | — | Discussioni Steam |

Forager è il paragone più onesto: **isola, raccolta a mano, albero di sblocchi, niente sconfitta**. È letteralmente il nostro gioco visto dall'alto in 2D. E dura **15 ore per arrivare in fondo**.

### La cifra sotto la quale ci si sente truffati

Non esiste un numero pubblicato e valido per tutti. Quello che ho trovato è più utile: **la delusione non dipende dalle ore, dipende dal rapporto fra ore e aspettativa creata**.

- Un giocatore che finisce un gioco idle in meno di 48 ore lo racconta come *"un altro bel gioco idle ma MOLTO troppo corto"* (Discussioni Steam, *Game of Grass*). Quarantotto ore. Per un idle, 48 ore sono **corte**.
- Dall'altra parte, chi scrive di design dice esplicitamente che **anche un gioco di 2 ore può essere memorabile se è progettato bene**, e che *"lunghezza non è valore"*.

**Come lo leggo io (derivato, non citato):** la soglia della truffa non è in ore assolute, è nel momento in cui il giocatore **capisce che non c'è più niente da comprare mentre sta ancora giocando volentieri**. A noi succede al minuto 13,5. Quello è il problema, non il 13,5.

### La cifra sopra la quale si abbandona

Le sei ricerche precedenti l'hanno già risposta meglio di quanto abbia trovato io, e **non la ripeto**: si abbandona nel **primo quarto d'ora**, e per **incertezza**, non per lunghezza. In Dyson Sphere Program più di metà se ne va entro la prima mezz'ora (già in `SINTESI.md`).

Quindi il rischio "troppo lungo" per noi **non esiste**: nessuno è obbligato a finire un gioco senza sconfitta. Il rischio è solo dall'altro lato.

---

## 2. Quanto siamo lontani

| Cosa | Valore | Tipo |
| --- | --- | --- |
| Durata misurata della nostra partita intera | **13,5 min** | misurato dal simulatore |
| Progetti che esistono | 6 | fatto |
| Progetti previsti | 38 | `PROGETTI.md` |
| Minuti per progetto, oggi | **2,25 min** | **derivato** (13,5 ÷ 6) |
| Se tenessimo 2,25 min/progetto su 38 progetti | **1 h 25 min** | **derivato** |
| Bersaglio da Forager | **15 h** | citato |
| Minuti per progetto per arrivare a 15 h | **~24 min** | **derivato** (15 h ÷ 38) |
| Quanto dovremmo moltiplicare i tempi di attesa | **circa ×10** | **derivato** (24 ÷ 2,25) |

**La distanza è un fattore 10, non un fattore 2.** Questo è il numero più importante del report: cambia la natura della risposta. Un fattore 2 si aggiusta ritoccando i prezzi. **Un fattore 10 non si aggiusta con i prezzi** — se moltiplichi i costi per 10 senza cambiare la produzione, ottieni esattamente il *grind* che i progettisti descrivono come il modo tipico di rovinare un gioco (sezione 6).

### Ordine di grandezza consigliato

| Traguardo | Ore | Note |
| --- | --- | --- |
| **Minimo per non sentirsi vuoti** | **4-6 h** | derivato: sotto le 5 ore il giocatore mediano da telefono, con sessioni da 5-6 min (dato già in `SINTESI.md`), finisce tutto in **meno di due settimane** — un gioco pensato per tornarci non regge |
| **Bersaglio sensato per 38 progetti** | **12-20 h** | derivato dal paragone Forager (15,5 h con un albero di sblocchi confrontabile) |
| **Con l'Era 4 che non finisce** | **infinito**, ma "il contenuto nominabile" finisce a ~15 h | i progetti 34 e 38 sono ripetibili per costruzione |

**Ordine di grandezza da tenere: 15 ore, cioè circa 25 minuti per progetto.** Non 13,5 minuti in tutto.

---

## 3. Le 300 monete di regalo

### Cosa fanno gli altri

| Pratica | Chi | Fonte |
| --- | --- | --- |
| Un "bonus di benvenuto" in valuta all'inizio, perché la prima sessione abbia progresso vero | quasi tutti i giochi da telefono free-to-play | GameRefinery |
| Piccole quantità di valuta **a ogni passo del tutorial**, non tutto insieme all'inizio | pratica dichiarata di onboarding | GameRefinery |
| Il pacchetto iniziale entra in scena **quando il giocatore comincia a rimanere senza risorse** | design di monetizzazione | Solar Engine / Mobile Free To Play |

Attenzione: **queste sono fonti di monetizzazione**. Il regalo iniziale lì serve a portare al primo acquisto in denaro vero. **Noi non abbiamo acquisti**, quindi la ragione per cui loro lo fanno da noi non vale. Il pezzo trasferibile è solo uno: *il regalo è distribuito lungo i primi passi, non consegnato tutto al minuto zero.*

### Il principio che risponde davvero alla domanda

Dal lato del design puro, e questo è il pezzo forte:

> **Far provare al giocatore il problema, prima di dargli la soluzione.** Se il giocatore combatte con un fastidio e *poi* sblocca l'oggetto che lo toglie, capisce a cosa serve l'oggetto e prova la soddisfazione di averlo conquistato.
> — Josh Bycer, *How to Power up Players with Upgrades*, Game Developer / Game Wisdom. Lo stesso schema è chiamato **"Learning the Hard Way"**.

Applicato a noi, senza sconti:

| Progetto | La domanda che toglie | Il giocatore l'ha mai sentita? |
| --- | --- | --- |
| Ascia affilata | *abbattere un albero ci mette un'eternità* | **No.** Comprata a 0,9 min. Ha abbattuto pochi alberi. |
| Zaino grande | *torno a scaricare di continuo* | **No.** Comprato a 1,1 min. Non è ancora tornato a scaricare abbastanza volte perché faccia male. |

Le 300 monete **non sono un regalo generoso: sono un furto di due momenti di soddisfazione**. Compriamo la soluzione a un problema che il giocatore non ha ancora avuto. È esattamente il caso in cui, dice `PROGETTI.md`, *"se una domanda non ti è mai passata per la testa giocando, quel progetto va tolto"* — solo che qui il progetto è buono, è il regalo che lo annulla.

### Cosa succede se il primo sblocco arriva senza aver fatto niente

Non ho trovato uno studio con numeri su questo caso preciso (lo dichiaro in fondo). Ho trovato il principio di design, ed è unanime nella direzione opposta al nostro regalo. Il rischio nominato è duplice: **l'oggetto non si capisce** (non hai mai vissuto il problema) e **non vale niente** (non l'hai conquistato).

**Proposta (derivata, non citata):** le 300 monete non vanno tolte di colpo — un inizio a zero monete è l'inizio lento che uccide. Vanno **abbassate quanto basta perché il primo acquisto sia una scelta fra due cose, non l'acquisto di tutte e due**. Se l'Ascia costa 120 e lo Zaino 160, un capitale iniziale di **100-120** significa: raccogli un po', poi compri **una** delle due. Il numero esatto lo dice il simulatore, non io.

---

## 4. Come si tara davvero una curva

Qui c'è del materiale solido e nominato. Sono tre livelli, e i progettisti li usano **in quest'ordine**, non uno al posto dell'altro.

### Livello 1 — Il foglio di calcolo con i "modelli fermi"

Il metodo più documentato è di **SomaSim** (*Project Highrise*, *1849*), pubblicato su Game Developer come *How to Tune a Simulation Game*:

- un **foglio maestro** con tutti gli edifici e i loro valori (produzione, consumo, costo, lavoratori richiesti);
- un **foglio per ogni città simulata** — città piccole, città grandi, città con certe combinazioni di edifici;
- ogni foglio calcola un **modello fermo** (*stationary model*): quanto si produce e quanto si consuma **in un turno solo**, a regime.

Il punto è che **non simuli il tempo, simuli lo stato di equilibrio in punti diversi della partita**. Molto più veloce da iterare che giocare.
Gli stessi autori dichiarano il limite: le cose una-tantum e a tempo **le tarano a forza bruta**, perché non si modellano bene nel foglio.

**Per noi:** noi abbiamo già qualcosa di meglio del foglio — un simulatore che gioca il gioco vero. Ma **non abbiamo il foglio maestro**, cioè la tabella dove si vede in una schermata, per ogni progetto, costo / guadagno atteso / tempo di rientro. Quella è la cosa che manca.

### Livello 2 — La simulazione del comportamento del giocatore

- Lo strumento nominato e documentato del settore è **Machinations.io**: le economie si disegnano come nodi (risorse) e frecce (flussi) e si **simulano nel tempo**; serve per *"testare le ipotesi e prevedere il comportamento del giocatore prima del lancio"*. È usato in produzione e nella didattica del game design. Uno studio (Well Done Games, *IndusTree* — un gioco di catene di produzione) ha pubblicato un devlog su come l'ha usato per la propria economia.
- La pratica descritta più spesso: **simulare 30 giorni di gioco per tre profili di giocatore** — casual, medio, accanito — e verificare che ognuno viva l'economia come previsto.
- Esiste letteratura sul *progression fitting* tramite simulazione del comportamento: l'argomento è che le metriche vere si vedono solo al soft launch, mentre **la simulazione permette di tarare la curva mesi prima**.

### Livello 3 — Le persone

Il test coi giocatori **non sostituisce** i primi due: serve per quello che i numeri non vedono — *sensazione, percezione di equità, reazione alla casualità*. Nessuna fonte propone di tarare una curva **solo** coi playtest.

### Le misure che si guardano

| Misura | Cosa vuol dire | Fonte |
| --- | --- | --- |
| **Tempo alla prossima cosa** (*time-to-next*) | quanto manca alla prossima ricompensa che conta. È indicata come **la misura principale**: se non sai stimarla per ogni punto della partita, non hai ancora capito la tua economia | guida di taratura economica (fonte secondaria, vedi avvertenza) |
| **Costo contro guadagno, sullo stesso grafico** | si sovrappongono la curva dei costi e quella dei guadagni per vedere se **camminano insieme**, e si cercano i "dirupi" dove il costo schizza sopra il guadagno | StraySpark / DEV |
| **Punti di stallo** | dove il giocatore si ferma. La domanda da farsi è **se lo stallo è voluto o è un errore** | idem |
| **Salto percepibile** | sotto circa il **15%** di miglioramento il giocatore **non se ne accorge**: la fatica è sprecata | fonte secondaria |

**Il "tempo alla prossima cosa" è esattamente la colonna "buco dal precedente" della nostra tabella.** Stiamo già misurando la cosa giusta. È la conferma più utile di questa ricerca: il nostro simulatore produce già la misura principale del settore.

---

## 5. I segnali che una curva è rotta (guardando i numeri)

Raccolti dalle fonti, e poi applicati alla nostra tabella.

| # | Segnale | Fonte |
| --- | --- | --- |
| 1 | **Un buco più corto di quello prima**: il tempo alla prossima cosa deve crescere o restare piatto; se scende, la curva ha una piega sbagliata | derivato dal principio "costi e guadagni devono camminare insieme" |
| 2 | **Un dirupo**: il costo sale sopra il guadagno di colpo, e lì il giocatore si ferma | StraySpark |
| 3 | **Costi che salgono più in fretta dei guadagni** su tutto l'arco: è la definizione tecnica di *grindy* — si lavora sempre di più per una ricompensa che pesa sempre di meno | idem |
| 4 | **Salti sotto il 15%**: l'oggetto non si sente | fonte secondaria |
| 5 | **Niente più da comprare**: quando l'economia è tarata su obiettivi brevi, comprata la cosa migliore non c'è più ragione di guadagnare | idem |

### La nostra tabella passata al setaccio

| Progetto | costo | arriva a | buco | Diagnosi |
| --- | --- | --- | --- | --- |
| Ascia affilata | 120 | 0,9 min | 0,9 | regalata (§3) |
| Zaino grande | 160 | 1,1 min | **0,2** | **segnale 1 e 4**: buco quasi nullo *e* oggetto misurato ×1,00 — non si sente proprio |
| Stivali buoni | 210 | 3,6 min | 2,4 | sano |
| Piccone pesante | 260 | 6,2 min | 2,6 | sano |
| Vivaio | 450 | 10,7 min | 4,6 | sano |
| Carriola | 520 | 13,5 min | **2,8** | **segnale 1**: il buco *scende* da 4,6 a 2,8. L'ultimo acquisto del gioco è il più facile |
| *(dopo)* | — | — | — | **segnale 5**: finito il contenuto, le monete non servono più a niente |

**Tre segnali su cinque sono accesi.** E stanno tutti e tre agli estremi: **l'inizio regalato** e **la fine che si sgonfia**. La parte centrale (Stivali → Vivaio) è sana: i buchi crescono 2,4 → 2,6 → 4,6.

**Perché l'ultimo buco è più corto:** il Vivaio non è un attrezzo, è una **fonte di reddito**. Dopo il Vivaio il giocatore guadagna molto di più, quindi le 520 monete della Carriola le fa in fretta. Non è un errore di prezzo della Carriola: **è che dopo un oggetto che alza il reddito, il prezzo successivo deve fare un salto molto più grande di ×1,15.** (La forma esatta la sta studiando un'altra ricerca; qui basta il fatto che ce ne siamo accorti dal numero.)

---

## 6. Allungare senza annoiare — **la sezione che conta per noi**

### Il modo sbagliato, e i progettisti lo dicono senza giri di parole

> Riempire di contenuto è il modo più comune di tenere il giocatore, ed è **dare quantità al posto di qualità**.
> Si allunga artificialmente il tempo di gioco **stiracchiando quello che c'è già**, finché il gioco sembra un lavoro da sbrigare.
> La forma più fastidiosa di macinare è quando **il giocatore sa già cosa fare per andare avanti, ed è il gioco a bloccarlo**.
> — Josh Bycer, *The Problems with Padding out Game Design*, Game Developer / Game Wisdom

E sulle attese a tempo, la formulazione più dura che ho trovato:

> I cancelli a tempo — aspettare che crescano i raccolti, che si costruisca il castello, che si riempia il serbatoio — sono *"il trucco più contro-il-consumatore e più da Skinner Box che esista oggi nei giochi"*.
> — Forbes, *Stopping The Spread Of Gaming's Most Offensive Mechanic, The Time Gate*

TV Tropes ha un nome per l'insieme di questi trucchi: **Fake Longevity** (longevità finta) — e li elenca come cose che i giocatori riconoscono.

### Tradotto sulla nostra tentazione

**Alzare i costi ×10 è esattamente il segnale 3.** Se moltiplichiamo i prezzi senza toccare la produzione, il gioco dura 135 minuti invece di 13,5, ma **ogni singolo minuto in più è uguale a un minuto che c'era già**. Il giocatore sa perfettamente cosa deve fare: raccogliere altra legna. È il gioco che lo trattiene. È la definizione letterale del *grind* cattivo.

> **La risposta alla domanda che ci siamo fatti: sì, alzare i costi è la mossa sbagliata**, se è l'unica mossa.

### I modi buoni, in ordine di quanto valgono per noi

| # | Modo | Perché funziona | Costo per noi |
| --- | --- | --- | --- |
| 1 | **Aggiungere cose da comprare** | il tempo in più è tempo passato davanti a **scelte nuove**. È l'unico modo che non è padding per definizione | alto: sono i 32 progetti di `PROGETTI.md` |
| 2 | **Aggiungere verbi** | ogni verbo nuovo (fondere, comporre, la roba si muove da sola) rende diverso anche il tempo vecchio | alto, ma è già in roadmap |
| 3 | **Alzare i costi *insieme* a un salto di produzione** | non è padding: il giocatore non ripete di più, **ripete meglio**. È la struttura per ere di `PROGETTI.md` | medio — è taratura |
| 4 | **Rendere più profonda una ripetizione che c'è già** | la stessa raccolta con una decisione in più dentro (dove metto la macchina, quale ricetta) | medio |
| 5 | **Alzare i costi e basta** | ❌ padding | basso, ed è per questo che tenta |

**Il punto scomodo:** i modi buoni costano tutti tempo di costruzione, il modo cattivo è gratis. È per questo che i giochi lo fanno. Metterlo per iscritto è metà del lavoro di non farlo.

### E allora la taratura dei costi non conta niente?

Conta, ma per **il posto giusto**, non per la durata. La proporzione fra i costi decide **quale progetto sembra il prossimo** e **se il salto si sente**. La durata complessiva la decide **quanti progetti ci sono**. Sono due lavori diversi e vanno tenuti separati:

> **Il numero di progetti fa le ore. Il prezzo dei progetti fa il ritmo.**
> Chiedere ai prezzi di fare le ore è il modo documentato di rovinare il gioco.

---

## Cosa cambia da noi

| # | La trovata | Cosa tocca | Stato |
| --- | --- | --- | --- |
| 1 | **Il bersaglio è ~15 ore, non 13,5 minuti.** Fattore 10, non fattore 2. Da Forager (15,5 h), il gioco più simile al nostro che sia misurato | un numero da scrivere in `GDD.md` o `MATERIALI.md` come bersaglio dichiarato | **da decidere** (è l'autore che sceglie il traguardo) |
| 2 | **Le 300 monete iniziali rubano due momenti di soddisfazione.** Il giocatore compra Ascia e Zaino prima di aver sentito i problemi che tolgono | `config/` — capitale iniziale | **da valutare col simulatore**: provare 100-120 e vedere se i primi 5 minuti restano generosi |
| 3 | **Alzare i costi per allungare è padding, e i progettisti lo dicono con questi nomi.** La durata la fanno i progetti, non i prezzi | regola da scrivere in `CLAUDE.md` o `MATERIALI.md` | **da fare** — è una regola, non un numero |
| 4 | **Segnale rotto n.1: un buco che si accorcia.** La Carriola (2,8) dopo il Vivaio (4,6). Dopo un oggetto che alza il *reddito*, il prezzo dopo deve saltare molto più del solito | `MATERIALI.md`, curva dei costi | **da fare** — regola di taratura |
| 5 | **Serve il foglio maestro** (metodo SomaSim): una tabella con, per ogni progetto, costo / guadagno atteso / tempo di rientro / tempo alla prossima cosa. Oggi ce l'abbiamo solo per 6 progetti e solo come uscita del simulatore | un documento, o un'uscita fissa di `npm run simula` | **da fare** |
| 6 | **Stiamo già misurando la misura principale del settore.** "Buco dal precedente" = *time-to-next*. Il simulatore è lo strumento giusto: va tenuto e allargato, non sostituito | niente da cambiare — conferma | ✅ |
| 7 | **Sotto il ~15% un miglioramento non si sente.** Lo Zaino misurato ×1,00 non è caro: è invisibile. Conferma la decisione aperta A3 da un'altra strada | `DECISIONI.md` A3 | conferma di una decisione già aperta |
| 8 | **Niente attese a tempo per allungare.** Aspettare che il legno ricresca "perché serve" è il cancello a tempo che le fonti chiamano il trucco più odiato | `GDD.md`, sezione "non è" | **da fare** — accanto a "niente regali di accesso quotidiano" |

---

## Quello che NON ho trovato

Dichiarato invece che riempito.

- **Una durata minima pubblicata sotto la quale il giocatore si sente truffato.** Non esiste come numero. Esistono solo lamentele singole (48 h giudicate corte per un idle) e l'opinione opposta ("anche 2 ore bastano se sono buone"). Il nostro 15 h è **derivato da un paragone**, non citato.
- **Ore dichiarate per giochi di costruzione nati su telefono.** HowLongToBeat copre bene PC e console; per i giochi da telefono i dati o non ci sono o non sono confrontabili (nessuno "finisce" un gioco da telefono e lo registra).
- **Uno studio con numeri su cosa succede se il primo sblocco è regalato.** Ho il principio di design ("far sentire il problema prima della soluzione"), non una misura di ritenzione.
- **Quanto capitale iniziale danno i giochi che ci somigliano**, in proporzione al primo acquisto. Nessuna fonte lo pubblica. La proposta di 100-120 monete è **mia, derivata**, e va provata col simulatore.
- **Un numero di ore per era.** Già dichiarato mancante in `SINTESI.md`; confermo che non l'ho trovato nemmeno io.
- **Post-mortem con numeri** di un gioco di costruzione morto per essere troppo corto.

### Avvertenza sulla qualità delle fonti

Due delle affermazioni più utili — **"tempo alla prossima cosa" come misura principale** e **"sotto il 15% non si percepisce"** — arrivano da guide di taratura economica pubblicate su blog di settore (DEV Community, StraySpark), **non da una fonte primaria firmata**. Sono coerenti fra loro e col resto, ma sono di secondo livello: le tratterei come buone regole pratiche, non come dati misurati. Le fonti forti di questo report sono **SomaSim su Game Developer**, **Josh Bycer su Game Developer/Game Wisdom**, **Machinations.io**, **le due conferenze GDC di Anthony Pecorella** e **HowLongToBeat per Forager**.

---

## Fonti

**Reddit: bloccato** allo strumento di ricerca, come dichiarato nelle sei ricerche precedenti. WebFetch non disponibile: tutto quello che c'è qui viene dai riassunti di ricerca, non dalla lettura integrale delle pagine.

- **HowLongToBeat** — Forager, 15,5 h / 42,5 h
- **Discussioni Steam** — Slime Rancher (6-10 h), Stardew Valley (~80 h), *Game of Grass* ("troppo corto" a 48 h)
- **SomaSim / Game Developer** — *How to Tune a Simulation Game* (fogli maestri e modelli fermi)
- **Josh Bycer, Game Developer / Game Wisdom** — *The Problems with Padding out Game Design*; *How to Power up Players with Upgrades*; *Reducing Unwanted Grind in Your Game*
- **Forbes** — *Stopping The Spread Of Gaming's Most Offensive Mechanic, The Time Gate*
- **TV Tropes** — *Fake Longevity*
- **Machinations.io** — documentazione e articoli su simulazione dell'economia; devlog di Well Done Games su *IndusTree*
- **GDC** — Anthony Pecorella, *Idle Games: The Mechanics and Monetization of Self-Playing Games* (GDC 2015) e *Quest for Progress: The Math and Design of Idle Games* (GDC Europe 2016); serie *The Math of Idle Games* su Game Developer
- **GameRefinery**, **Solar Engine**, **Mobile Free To Play** — pratiche di bonus iniziale e onboarding (fonti di monetizzazione: usate con cautela)
- **StraySpark**, **DEV Community** — guide pratiche di bilanciamento economico con fogli di calcolo (fonti secondarie)
- **itch.io** — commenti di autori di giochi idle da game jam sul tarare la durata a 10-15 minuti
