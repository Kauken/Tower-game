# La forma della curva

*Ricerca su una cosa sola: come devono crescere i costi, e rispetto a cosa.*
*19 ricerche. Reddit bloccato, WebFetch bloccato — vedi §10.*

---

## In una riga

**Non esiste "la curva dei costi": esiste solo il rapporto fra costi e produzione, e quel rapporto è il tempo che il giocatore aspetta — Cookie Clicker lo tiene a ×2 fra un tipo di edificio e il seguente, e il nostro "×1,5" è giusto ma solo se accanto ci scriviamo che la produzione deve crescere ×1,3, cosa che oggi non c'è scritta da nessuna parte.**

---

## 1. Che forma ha una buona curva di costo

### La formula che usano tutti

Una sola, ripetuta ovunque:

> **costo = costo di partenza × moltiplicatore ^ (quanti ne hai già)**

Cioè **geometrica**: ogni copia costa una percentuale fissa in più della precedente.

### I moltiplicatori veri, con nome e cognome

| Gioco | Moltiplicatore | Fonte |
| --- | --- | --- |
| **Cookie Clicker** — tutti e 20 gli edifici | **×1,15** | wiki ufficiale + Envato Tuts+ |
| **Clicker Heroes** — tutti e 35 gli eroi | **×1,07** | Envato Tuts+ |
| **AdVenture Capitalist** — 10 attività | ognuna diversa, **tutte fra ×1,07 e ×1,15** | Envato Tuts+ |
| **AdVenture Capitalist**, il chiosco di limonata (numeri esatti) | costo di partenza **4**, produzione **1,67 al secondo**, crescita **×1,07** | Kongregate / Game Developer |
| Fascia consigliata in generale | **×1,07 – ×1,15** | più fonti |

**Numeri citati.** La parte utile non è il numero: è che *tre giochi diversi, scritti da persone diverse, sono finiti nella stessa strettissima fascia*. Quando succede, di solito vuol dire che fuori da lì non funziona.

### Perché geometrica e non lineare

Motivo dichiarato: la crescita geometrica **bilancia da sola** più strade di potenziamento. Se ogni copia costa più della precedente, ognuna ha rendimenti calanti in automatico e il giocatore si sposta da sé sulla prossima cosa. Il progettista non deve confrontare a mano ogni coppia di oggetti: **la formula lo fa al posto suo.**

Con una curva **lineare** l'oggetto migliore resta il migliore per sempre, e si compra solo quello. Machinations lo dice netto: lineare è *"semplice e trasparente, ma non dà nessun senso di sfida crescente"*.

### Le forme sono tre, non due — e la terza è la nostra

Machinations ne elenca **tre**:

| Forma | Come si comporta | Giudizio della fonte |
| --- | --- | --- |
| **Lineare** | ogni passo costa uguale | trasparente ma piatta |
| **Esponenziale** | ogni passo costa molto più del precedente | dà il senso di progresso, ma **"produce muri brutali nel finale se il guadagno non cresce in proporzione"** |
| **A traguardi** *(milestone-based)* | i costi salgono **a fasce**, e ogni fascia è un traguardo | *"crea punti di rottura naturali che sembrano tappe, ed è più facile da bilanciare dell'esponenziale puro"* |

**La terza è letteralmente la nostra struttura a ere**, ed è l'unica che una fonte descrive come *più facile da bilanciare*. Non l'abbiamo scelta per questo motivo, ma è la scelta giusta. Da scrivere nel `GDD.md`, così non viene smontata per sbaglio.

### E poi c'è la forma a S (quella che nessuno di noi aveva considerato)

Una linea di ricerca separata, dai progettisti che si occupano di curve di potere:

> *"Una crescita che sembra esponenziale, di solito è solo l'inizio di una curva logistica."*
> *"Con l'esponenziale la curva sfonda ogni tetto; con la logistica hai il controllo e puoi impedirlo."*
> — Medium, *Sigmoid Curves are Game Designers' Friends* e *Graphs for Player Progression*

E la differenza di sensazione, dichiarata:

| Forma | Cosa sente il giocatore |
| --- | --- |
| **Esponenziale** | veloce all'inizio, **muro nel finale** |
| **A S (logistica)** | veloce all'inizio, **muro a metà**, e poi di nuovo veloce alla fine |

*(citato)*. Non è una raccomandazione da applicare subito, ma spiega perché tutti i giochi lunghi, prima o poi, **frenano la parte alta della curva** invece di lasciarla correre. Ci torno al §6 con Factorio.

### ⚠️ Attenzione: la fascia ×1,07-1,15 NON è la nostra

Quella fascia è il costo per **ricomprare la stessa cosa** (il 15° nonno di Cookie Clicker). Noi abbiamo **38 cose diverse, comprate una volta sola ciascuna**. È un problema diverso e ha una risposta diversa, che sta al §3.

---

## 2. Il rapporto fra costi e produzione — è **questa** la vera domanda

Il punto più importante di tutta la ricerca, e quello che manca nei nostri documenti.

### La regola, come la scrivono le fonti

> *"I costi devono crescere **più in fretta** dell'aumento di guadagno."*
> — Kongregate / Game Developer, *The Math of Idle Games*

E coi numeri accanto:

> *"Se la produzione sale ×1,10 per livello, il costo per salire sale ×1,15."*
> — stessa fonte

**Numero citato.** Da notare: la differenza è di **cinque punti percentuali**. Non il doppio, non il triplo.

Una seconda fonte lo dice in modo ancora più forte — non è una questione di *quanto*, è una questione di **che tipo di crescita**:

> *"I costi supereranno la produzione **purché** la produzione cresca più lentamente del costo: per esempio produzione polinomiale e costi esponenziali, oppure produzione lineare e costi polinomiali."*
> — Medium, *Math — the backbone of Idle Games*

E il sintomo di quando si sbaglia, sempre citato:

> *"Se i potenziamenti costano molto più del guadagno al secondo, alla fine il giocatore è costretto a stare fermo per periodi sempre più lunghi, o a ricominciare."*

### La forma pulita della regola *(derivata da me, non citata)*

Se i costi crescono di `c` a ogni passo e la produzione di `p`, l'attesa fra un acquisto e il successivo cresce di:

> **c ÷ p**

Da cui tre mondi:

| Se… | Cosa sente il giocatore |
| --- | --- |
| **c = p** | l'attesa resta **sempre la stessa**. Un acquisto ogni tot, per sempre |
| **c > p** | l'attesa **si allunga** ogni volta, di un fattore c/p. È quello che fanno tutti |
| **c < p** | l'attesa **si accorcia**: il gioco accelera, i prezzi diventano ridicoli, e finisce |

Coi numeri citati sopra (1,15 e 1,10) il rapporto è **×1,045**: ogni acquisto costa il 4,5% di attesa in più del precedente. Su venti acquisti l'attesa si moltiplica per 2,4. **Si sente, ma non è un muro.**

### Cosa cambia per noi, in una frase

In `MATERIALI.md` e in `SINTESI.md` (riga 133) c'è scritto **"curva dei costi a ×1,5"** e **basta**. Non c'è scritto da nessuna parte quanto deve crescere la produzione. Ma ×1,5 **da solo non significa niente**:

| Se la produzione cresce di… | …l'attesa cresce di | Dopo 37 progetti l'attesa è | Verdetto |
| --- | --- | --- | --- |
| ×1,50 | ×1,00 | come il primo giorno | piatta |
| **×1,37** *(la nostra Ascia, misurata)* | ×1,09 | **×24** | sostenibile |
| **×1,30** | ×1,15 | **×176** | **il bersaglio** |
| ×1,20 | ×1,25 | ×3.830 | **rotto** |
| **×1,00** *(il nostro Zaino, misurato)* | ×1,50 | ×3,3 milioni | rotto e basta |

*(tutti derivati da me: `(1,5 ÷ p)^37`.)*

**E qui c'è la buona notizia.** Se la produzione cresce ×1,3 a progetto, alla fine dei 38 progetti l'isola produce **2,7 milioni di monete al minuto** e l'ultimo progetto (392 milioni) si ripaga in **145 minuti**. *(derivato: 166 × 1,3³⁷.)* **Cioè: ×1,5 è un numero giusto — ma solo insieme a ×1,3.** Da solo è una scommessa alla cieca.

> ### La riga che manca nei nostri documenti
> **"I costi crescono ×1,5 a progetto" va sempre scritto insieme a "e ogni progetto deve far crescere la produzione di almeno ×1,3". La prima frase senza la seconda non è una regola: è un numero.**

### Il corollario che riguarda lo Zaino

**Un progetto che non aumenta la produzione non è neutro: è un buco nella curva.** Lo Zaino grande misurato ×1,00 non è "un oggetto che rende poco": è un passo in cui il costo sale e la produzione no — cioè **il punto in cui la curva si impenna**. Un solo progetto a ×1,00 in mezzo a una curva ×1,5 vale, da solo, **un +50% di attesa permanente** per tutto il resto della partita.

Argomento nuovo, e matematico, per la decisione aperta **A3**.

---

## 3. La risposta alle "38 cose diverse": i numeri veri di Cookie Clicker

Questa è la parte che le sei ricerche precedenti non avevano. La fascia ×1,07-1,15 riguarda le *ricompre*. Ma Cookie Clicker ha anche **venti tipi diversi di edificio**, ognuno che si sblocca dopo il precedente — cioè **esattamente il nostro problema dei 38 progetti**. E i numeri sono pubblici.

| Edificio | Costo base | Produzione base (al secondo) | Costo ÷ prec. | Produz. ÷ prec. | **Si ripaga in** |
| --- | --- | --- | --- | --- | --- |
| Cursore | 15 | 0,1 | — | — | **2,5 min** |
| Nonna | 100 | 1 | ×6,7 | ×10 | 1,7 min |
| Fattoria | 1.100 | 8 | ×11 | ×8 | 2,3 min |
| Miniera | 12.000 | 47 | ×10,9 | ×5,9 | 4,3 min |
| Fabbrica | 130.000 | 260 | ×10,8 | ×5,5 | 8,3 min |
| Banca | 1.400.000 | 1.400 | ×10,8 | ×5,4 | **17 min** |
| Tempio | 20.000.000 | — | ×14,3 | — | — |
| Torre del mago | 330.000.000 | 44.000 | — | — | **125 min** |
| Laboratorio alchemico | 75.000.000.000 | 1.600.000 | — | — | **13 ore** |

*(costi e produzioni: **citati** dal wiki di Cookie Clicker. Le tre colonne di destra: **derivate da me**.)*

**Quattro cose escono da questa tabella, e sono le più solide della ricerca.**

1. **Fra un tipo nuovo e il seguente il costo fa ×11, non ×1,15.** Perché non è la stessa cosa comprata due volte: è una cosa nuova che deve *superare* tutta la categoria precedente.
2. **Ma la produzione fa ×5,5.** Chi guarda solo la colonna dei costi vede un muro che non c'è.
3. **Il rapporto fra i due è ×2, e si stabilizza lì.** 10,8 ÷ 5,4 = 2,0. Cioè: **ogni tipo di cosa nuova si ripaga nel doppio del tempo del tipo precedente.** È la regola c/p del §2, applicata a una progressione di cose *diverse*.
4. **Verifica sulla lunga distanza:** dal cursore (2,5 min) al laboratorio alchemico (13 ore) ci sono 9 passi e un fattore 312. Vuol dire **×1,9 a passo**. *(derivato)* La regola del raddoppio tiene per tutti e dieci i tipi.

E il tempo di partenza — **2,5 minuti per ripagare il primo edificio** — coincide con quello che avevamo già in `MATERIALI.md` (*ammortamento di un attrezzo: 3-8 minuti*) e con il nostro dato misurato (l'Ascia a 120 monete si ripaga in circa 2 minuti). **Il nostro inizio è tarato bene.**

### ⛔ Ma il ×2 di Cookie Clicker **non** possiamo copiarlo

Cookie Clicker ha **20 tipi**; noi ne abbiamo **38**. Con ×2 a passo, il 38° costerebbe al giocatore **2,5 min × 2³⁷ ≈ 650.000 anni** di attesa. Cookie Clicker se lo può permettere per una ragione sola: **il prestigio**, cioè il ricominciare da capo che moltiplica tutto.

**Noi il prestigio non ce l'abbiamo, e per scelta.** Quindi il ×2 non è la nostra costante. La nostra deve essere:

| Se l'ultimo progetto deve ripagarsi in… | …l'attesa deve crescere di |
| --- | --- |
| 2 ore | **×1,12** a progetto |
| 8 ore | **×1,16** a progetto |
| 24 ore | **×1,19** a progetto |

*(derivati da me, partendo da 2 minuti e 37 passi.)*

> **Il nostro bersaglio è ×1,15-1,20 di attesa in più a ogni progetto, non ×2.** Che, con una produzione che cresce ×1,3, vuol dire costi che crescono **×1,5-1,56**. **Il ×1,5 che avevamo già scritto è confermato — per la prima volta con un motivo dietro.**

E il legame con la decisione aperta **A4** (c'è un finale?) diventa concreto: **senza prestigio la curva non può raddoppiare.** Chi dice "l'Era 4 non finisce mai" sta chiedendo una curva che regga 38+ passi senza nessun azzeramento, e quella curva deve essere **piatta**, non ripida.

---

## 4. Quanto deve durare l'attesa fra uno sblocco e il successivo

### I numeri pubblicati

| Cosa | Numero | Citato / derivato | Fonte |
| --- | --- | --- | --- |
| Una ricompensa, anche piccola, ogni | **30-90 secondi** | citato | gamedesigning.org |
| Un senso di **risultato importante** ogni | **10-15 minuti** di gioco continuo | citato | gamedesigning.org |
| Soglia di frustrazione: minuti di fatica ÷ valore percepito | oltre **5 a 1** | citato | gamedesigning.org |
| Fase "amo" iniziale | primi **0-30 minuti** | citato | GridInc |
| Prima sessione di un giocatore nuovo | **15-60 minuti** di gioco attivo | citato | Eric Guan |
| Ammortamento del 1° edificio di Cookie Clicker | **2,5 minuti** | derivato | 15 ÷ 0,1 |
| Ammortamento del 6° tipo | **17 minuti** | derivato | 1,4 M ÷ 1.400 |
| Ammortamento del 10° tipo | **13 ore** | derivato | 75 G ÷ 1,6 M |

**Il "risultato importante ogni 10-15 minuti" e il nostro "una cosa nuova ogni 10-20 minuti" sono lo stesso numero trovato due volte, da due strade indipendenti.** Quello è il battito del gioco: da scrivere come vincolo, non come consiglio.

### Costante, crescente o alternata? — la risposta migliore che ho trovato

Viene da Eric Guan, ed è **il principio più utile di tutta la ricerca dopo il c/p**:

> *"All'inizio i giocatori nuovi sono molto coinvolti… nella prima sessione giocano attivamente per 15-60 minuti. Man mano che l'interesse cala, le sessioni diventano più rade e più corte: prima una volta ogni ora, poi un paio di volte al giorno, poi una volta a settimana. **Il ritmo ideale di un idle segue quella curva di coinvolgimento che decade.**"*
> — Eric Guan, *Idle Game Design Principles*

**Cioè: l'attesa deve crescere, e deve crescere perché il giocatore torna sempre più di rado.** Non è una punizione, è un adattamento. È la risposta migliore alla domanda 3, e spiega *perché* c > p invece di limitarsi a dirlo.

**Il corollario, e per noi vale doppio:** se il giocatore all'inizio gioca 15-60 minuti di fila e noi abbiamo **10,4 minuti di progetti** (vedi §5), la prima sessione finisce col negozio vuoto.

### E gli orologi devono essere più di uno

Dallo stesso autore, coi numeri del suo gioco:

> le mucche danno latte ogni **20 minuti**; il caseificio dà formaggio ogni **30 minuti** e si tappa dopo **5 ore**; il cantiere dà motori ogni **2 giorni**. *(citato)*

Non è una scala regolare: sono **tre ordini di grandezza contemporanei**. Il giocatore ha sempre qualcosa che matura fra venti minuti e qualcosa che matura fra due giorni. **La curva non è una linea sola: sono più linee che convivono.**

---

## 5. Cosa succede quando la curva è sbagliata

Raccolto dalle Discussioni Steam (**Reddit risulta bloccato**). I titoli delle discussioni *sono* la diagnosi.

### Curva troppo ripida — le parole esatte dei giocatori

| Gioco | Cosa scrivono |
| --- | --- |
| Endless World Idle RPG | *"Progressione troppo lenta"* |
| Nomad Idle | *"Progressione improvvisamente lenta dopo l'area 5?"* — bonus che chiedono 150.000 uccisioni |
| Idle Sphere | *"Questo è un gioco ULTRA lento (140 ore dentro)"* — progressi "trascurabili" |
| Idle Slayer | *"Dolorosamente ripetitivo"* — *"un muro incredibilmente doloroso"* |
| NGU Idle | devi **chiudere il gioco e tornare giorni dopo** |
| Revolution Idle | *"Rallenta verso i 100 obiettivi"* |
| IdleOn | il gioco è diventato *"una faccenda da sbrigare invece che una cosa divertente"* |
| Idle Champions | dopo 23.000 ore: *"da idle è diventato fare da babysitter 24 ore su 24"* |
| Satisfactory | *"fila liscio fino agli ultimi 2-3 livelli"*; il bruciarsi arriva *"verso la tappa 5 o 6"* |

**I due sintomi, in due righe.**

1. **Non dicono "è difficile". Dicono "è lento" e "è un muro". E sanno indicare il punto esatto** — *"dopo l'area 5"*, *"verso i 100 obiettivi"*, *"gli ultimi 2-3 livelli"*. Se le lamentele si concentrano tutte sullo stesso passo, il problema non è "il gioco": è **quel passo lì**, dove il rapporto costo/produzione è sbagliato.
2. **Più insidioso: il gioco smette di essere un idle e diventa un lavoro.** *"Faccenda da sbrigare"*, *"babysitter"*. Quando la curva è troppo ripida il giocatore compensa **giocando di più**, e a quel punto ha smesso di divertirsi pur giocando ancora. Non se ne accorge nessuno finché non se ne va.

### Curva troppo piatta — meno documentata, ma c'è

I giocatori non aprono discussioni per dire che è troppo facile: smettono e basta. Ma un caso pulito l'ho trovato:

> **Nomad Idle**: si arriva alla **zona 200 in poche ore il primo giorno**, e poi *"non succede più niente: nessun potenziamento nuovo, nessun progresso, nessuno sblocco"*.

**Nomad Idle compare in tutte e due le liste.** Curva piatta all'inizio, muro subito dopo. È la firma di un gioco a cui la curva non è stata *disegnata*: è stata messa a occhio, un pezzo alla volta.

Sintomo indiretto, dalla stessa area: quando i costi non tengono il passo, *"il gioco attivo diventa meno utile"* — non c'è più motivo di toccare niente.

### E il rischio nostro qual è dei due? **Il piatto.**

Sei progetti a 120-520 monete, con 166 monete al minuto:

| Progetto | Costo | Minuti di attesa a 166/min |
| --- | --- | --- |
| 1 | 120 | 0,7 |
| 2 | 160 | 1,0 |
| 3 | 210 | 1,3 |
| 4 | 260 | 1,6 |
| 5 | 450 | 2,7 |
| 6 | 520 | 3,1 |
| | | **10,4 in tutto** |

*(derivato da me — e la produzione non è ferma, sale mentre compri, quindi sono **meno** di dieci minuti.)*

**Contro i 15-60 minuti della prima sessione di un giocatore nuovo.** Siamo esattamente nel primo giorno di Nomad Idle: tutto subito, e poi la bacheca vuota.

---

## 6. Il problema delle cinque ere

### Cosa fanno gli altri

- **Anno**: la progressione è agganciata ai **livelli di popolazione**, non al denaro. Salire di livello **apre un catalogo di edifici** e le catene di produzione si allungano. **L'era non è un moltiplicatore di prezzi: è un elenco di cose nuove.**
- **Civilization VII**: fra un'era e l'altra c'è una **transizione** che riazzera parecchio. La cosa da rubare sono gli edifici **"senza età"** (*ageless*), **segnati nell'interfaccia**, che tengono il valore pieno in ogni era; più le **eredità** (oro / standard / oscura) che portano un bonus continuo nell'era dopo. → **Quando riparti, deve essere chiaro cosa NON riparte — e deve vedersi sullo schermo, non leggersi in un manuale.**
- **Satisfactory**: 9 livelli, **aperti a coppie e ognuna chiusa da un progetto enorme** (le fasi dell'Assemblaggio del Progetto). Fase 1 apre i livelli 3-4, fase 2 il 5-6, fase 3 il 7-8, fase 4 il 9. *(citato)* → **La porta fra un'era e l'altra è un progetto grosso, non un prezzo alto.**
- **Factorio**: nel gioco base la scalata è governata da **un unico moltiplicatore globale** del prezzo della ricerca, che regola il giocatore stesso. Le mod che riscrivono la curva convergono su un'idea sola: far dipendere il costo dalla **profondità nell'albero** (quante ricerche servono per arrivare lì) e poi **frenare**: *"un fattore di correzione della curva che smorza la crescita esponenziale, per evitare costi estremi nel finale"* (mod *Technology Price Multiplier*). **Anche chi ama i numeri grossi frena la parte alta.** È la stessa cosa che dice la curva a S del §1.

### Quanto dura un'era, davvero

L'unico numero pubblico l'ho trovato per Satisfactory, e non è per livello:

| Cosa | Numero | Fonte |
| --- | --- | --- |
| Partita completa, giocatore nuovo | **150-200 ore** | Discussioni Steam |
| Giocatore esperto | 90-120 ore | idem |
| Record del mondo (a velocità) | 22 ore | idem |
| **Media per livello** | **17-22 ore** | **derivato da me**, 150-200 ÷ 9 — e i livelli **non** sono uguali fra loro, quindi è un ordine di grandezza, non una misura |

### ⚠️ Cosa dicono davvero le nostre fasce d'era *(tutti conti miei)*

Ho fatto i conti sulle fasce scritte in `PROGETTI.md`. È una sorpresa.

| Era | Progetti | Fascia | Moltiplicatore implicito **dentro** l'era |
| --- | --- | --- | --- |
| 0 — Le Mani | 7 | 120 → 520 | **×1,28** |
| 1 — Il Fuoco | 7 | 600 → 2.000 | **×1,22** |
| 2 — La Corrente | 9 | 2.500 → 8.000 | **×1,16** |
| 3 — La Seconda Isola | 7 | 10.000 → 30.000 | **×1,20** |
| 4 — Le Scale | 8 | 40.000 → ? | non definita |

E i **salti fra un'era e l'altra**:

| Passaggio | Salto |
| --- | --- |
| 520 → 600 | ×1,15 |
| 2.000 → 2.500 | ×1,25 |
| 8.000 → 10.000 | ×1,25 |
| 30.000 → 40.000 | ×1,33 |

**Quattro conclusioni, e nessuna è quella scritta nei documenti.**

1. **La regola "×1,5" non è quello che stiamo facendo.** Le fasce implicano **×1,16-1,28**. Due documenti dicono cose diverse e nessuno se n'era accorto. Con quelle fasce, la produzione può crescere al massimo ×1,1 a progetto — cioè **quasi niente** — o il gioco si appiattisce.
2. **Il salto fra due ere è più PICCOLO del passo dentro un'era.** Da Era 0 a Era 1 è ×1,15; dal 4° al 5° progetto dell'Era 0 è ×1,28. **Il confine d'era è il punto più piatto di tutta la curva** — l'esatto contrario di *"a ogni era si riparte da una base più alta"*. Le fasce, come sono scritte, **non fanno il salto di scala che dicono di fare.**
3. **Presa tutta insieme, da 120 a 40.000 in 37 passi, la nostra curva è ×1,17.**
4. **Il numero in `PROGETTI.md` è sbagliato:** 38 progetti a ×1,5 partendo da 120 fanno **392 milioni**, non *"oltre un miliardo"*. (120 × 1,5³⁷.) E 392 milioni **non sono un problema**: con la produzione a ×1,3 diventano 145 minuti di attesa per l'ultimo progetto.

### Il salto d'era: le tre forme possibili, e quale è la nostra

| Forma | Chi la usa | Cosa succede al confine |
| --- | --- | --- |
| **Si azzera** | Civilization VII | perdi molto, tieni le cose "senza età", riparti quasi da capo |
| **Continua** | Cookie Clicker | nessun confine: la stessa curva per venti tipi di edificio, senza soluzione di continuità |
| **Si ferma e riparte** | **Satisfactory, Anno** | il confine è **un progetto enorme da completare**, non un prezzo. Dopo, la scala nuova è ovvia perché ci sono **materiali nuovi** |

**La terza è la nostra, e ce l'abbiamo già in mano senza averla riconosciuta:** il **pontile** dell'Era 3 è esattamente l'Assemblaggio del Progetto di Satisfactory. Le altre tre porte (Fuoco, Corrente, Scale) oggi **non hanno un progetto-porta**: hanno solo un prezzo. **È la cosa più concreta che questa ricerca fa vedere.**

E la risposta alla domanda 5, in una riga: **la curva non si azzera e non accelera — continua liscia, e a fare il salto di scala sono i materiali nuovi, non i prezzi.** Il confine si sente perché cambia *cosa* costruisci, non perché cambia *quanto* costa.

---

## 7. I numeri concreti, tutti in un posto

| Cosa | Numero | Citato / derivato | Fonte |
| --- | --- | --- | --- |
| Cookie Clicker, ricompra dello stesso edificio | **×1,15** | citato | wiki ufficiale |
| Clicker Heroes, ricompra | **×1,07** | citato | Envato Tuts+ |
| AdVenture Capitalist, ricompra | **×1,07 – ×1,15** | citato | Envato Tuts+ |
| AdVenture Capitalist, chiosco di limonata | costo 4 · produzione 1,67/s · crescita ×1,07 | citato | Kongregate |
| Coppia costo/produzione raccomandata | costo **×1,15** con produzione **×1,10** | citato | Kongregate |
| …l'attesa che ne deriva | **×1,045** per acquisto | derivato | 1,15 ÷ 1,10 |
| **Cookie Clicker, da un TIPO di edificio al seguente — costo** | **×11** | derivato da dati citati | wiki |
| **…produzione** | **×5,5** | derivato | wiki |
| **…quanto si allunga l'attesa** | **×2** (verificato su 9 passi: ×1,9) | derivato | wiki |
| Ammortamento del 1° / 6° / 10° tipo di CC | **2,5 min / 17 min / 13 ore** | derivato | wiki |
| Una ricompensa anche piccola ogni | **30-90 s** | citato | gamedesigning.org |
| Un risultato **importante** ogni | **10-15 min** | citato | gamedesigning.org |
| Soglia di frustrazione fatica/ricompensa | **5 a 1** | citato | gamedesigning.org |
| Fase "amo" | primi **0-30 min** | citato | GridInc |
| Prima sessione di un giocatore nuovo | **15-60 min** attivi | citato | Eric Guan |
| Tre orologi contemporanei | 20 min · 30 min (tappo a 5 h) · 2 giorni | citato | Eric Guan |
| Satisfactory | **9 livelli, aperti a coppie da 4 progetti-porta** | citato | wiki Satisfactory |
| Satisfactory, partita intera | **150-200 h** (esperto 90-120 h, record 22 h) | citato | Discussioni Steam |
| …media per livello | ~**17-22 h** | derivato | 150-200 ÷ 9 |
| **La nostra curva attuale, 6 progetti** | **×1,34** medio | derivato | (520/120)^(1/5) |
| **La nostra curva d'albero, 38 progetti** | **×1,17** medio | derivato | (40.000/120)^(1/37) |
| **I nostri primi 6 progetti, a produzione ferma** | **10,4 minuti in tutto** | derivato | 166 monete/min |
| 38 progetti a ×1,5 da 120 | **392 milioni** (non un miliardo) | derivato | 120 × 1,5³⁷ |
| …e con produzione a ×1,3, l'ultimo si ripaga in | **145 minuti** | derivato | 166 × 1,3³⁷ |
| **Il nostro bersaglio: quanto deve allungarsi l'attesa a ogni progetto** | **×1,15 – ×1,20** | derivato | 37 passi da 2 min a 8-24 h |

---

## 8. Cosa cambia da noi

| # | La trovata | Cosa tocca | Stato |
| --- | --- | --- | --- |
| 1 | **"×1,5" non va mai scritto da solo.** Va scritto: *"i costi crescono ×1,5 a progetto, e ogni progetto deve far crescere la produzione di almeno ×1,3"*. Il primo numero senza il secondo non è una regola | `MATERIALI.md`, `SINTESI.md` §7 punto 8, `GDD.md` | **da fare** — è una correzione, non una scelta |
| 2 | **Il numero da sorvegliare si chiama c ÷ p** ("di quanto si allunga l'attesa a ogni progetto") e il nostro bersaglio è **×1,15-1,20**. Va **stampato da `npm run simula`**, non stimato a occhio | `simula` | **da fare** — è il singolo cambiamento più utile di tutta la ricerca |
| 3 | **Cookie Clicker fra tipi diversi: costo ×11, produzione ×5,5, attesa ×2.** Il ×2 **non** si può copiare: loro hanno 20 tipi e il prestigio, noi 38 e nessun azzeramento | `MATERIALI.md` | **da valutare** — conferma il ×1,5, esclude di più |
| 4 | **Le nostre fasce d'era danno ×1,16-1,28, non ×1,5.** `PROGETTI.md` e `MATERIALI.md` si contraddicono, e una delle due è sbagliata | `PROGETTI.md` vs `MATERIALI.md` | **da fare** — vanno allineati, poi tarati con la simulazione |
| 5 | **Il salto fra un'era e l'altra è oggi più piatto del passo dentro l'era** (×1,15 contro ×1,28). Il confine, come è scritto, non fa nessun salto di scala | fasce in `PROGETTI.md` | **da decidere** — o si alza il confine, o si accetta che il salto lo facciano i **materiali** e non i prezzi (io propendo per la seconda: è quello che fanno Satisfactory e Anno) |
| 6 | **Ogni porta d'era dovrebbe essere un progetto grosso, non un prezzo alto.** Satisfactory: 4 progetti-porta per 9 livelli. Il **pontile** lo è già; Fuoco, Corrente e Scale no | `PROGETTI.md`, `ROADMAP.md` | **da decidere** — cambia la forma dell'albero |
| 7 | **Il nostro rischio è la curva piatta, non il muro.** Sei progetti in 10,4 minuti, contro una prima sessione di 15-60 minuti | fasce Era 0 | **da fare** — o si alzano i costi dell'Era 0, o si anticipa qualche progetto dell'Era 1 |
| 8 | **Un progetto che non aumenta la produzione è un buco nella curva**, non un oggetto debole. Un solo ×1,00 vale un +50% di attesa permanente | decisione aperta **A3** (Zaino) | **da decidere** — argomento nuovo, e forte, per A3 |
| 9 | **Senza prestigio la curva non può raddoppiare.** "L'Era 4 non finisce mai" implica una curva **piatta** nel finale, non ripida — e perfino Factorio mette un freno alla parte alta | decisione aperta **A4**, progetti 34 e 38 | **da decidere** — è il legame fra la curva e la domanda "c'è un finale?" |
| 10 | **"Un risultato importante ogni 10-15 minuti"** è lo stesso numero del nostro *"una cosa nuova ogni 10-20 minuti"*, trovato da due strade indipendenti. È il battito del gioco | `GDD.md` | **da fare** — scriverlo come vincolo, non come consiglio |
| 11 | **La struttura "a traguardi" è quella che le fonti indicano come più facile da bilanciare** dell'esponenziale puro. Le ere non sono un vezzo narrativo: sono la scelta tecnica giusta | `GDD.md` | **da fare** — scriverlo, così non viene smontata per sbaglio |
| 12 | **Al confine d'era deve vedersi cosa NON riparte** (gli edifici "senza età" di Civ VII sono segnati nell'interfaccia). Si sposa con la regola "non si smonta mai" già decisa | `GDD.md`, bacheca | **da valutare** |
| 13 | **La curva non è una linea sola: sono più orologi che convivono** (20 min / 5 ore / 2 giorni). Da noi oggi ce n'è uno solo | `GDD.md` | **da valutare** — arriva con le macchine |
| 14 | **"Oltre un miliardo" è sbagliato: sono 392 milioni**, e non sono un problema | `PROGETTI.md`, punto 3 in fondo | **da fare** — refuso |

---

## 9. Quello che NON ho trovato

Dichiarato, invece che riempito a fantasia.

- **Il testo integrale di *The Math of Idle Games* parti I, II, III e delle slide di Pecorella** (GDC Europe 2016), con i fogli di calcolo su archive.org. Sono la fonte migliore possibile su questo esatto argomento, esistono, e sono **fuori portata perché WebFetch è bloccato dal proxy**. Quello che riporto viene dai riassunti che il motore di ricerca restituisce, non dal testo completo. **Se un giorno si riescono ad aprire, è lì che sta il resto della risposta.** Lo stesso vale per la documentazione *Level Progression* di Machinations e per l'articolo *Balancing Tips: How We Managed Math on Idle Idol* (che di numeri, dai riassunti, sembra non darne comunque).
- **I costi esatti delle tappe di Satisfactory, livello per livello.** Le tabelle esistono sul wiki ma il motore non me le ha restituite e non ho potuto aprire la pagina. **Il salto di scala fra un livello e il successivo di Satisfactory resta un buco**, ed è il dato che più direttamente risponderebbe alla domanda sulle ere.
- **Le ore per livello di Satisfactory.** Nessuno le pubblica. Il mio 17-22 h è una **divisione**, non una misura, e i livelli non sono uguali fra loro.
- **Un nome proprio per la regola c ÷ p.** Le fonti la descrivono ("i costi devono crescere più in fretta del guadagno") ma **nessuna le dà un nome**. Il rapporto, e il modo di scriverlo, sono miei.
- **Un tempo pubblicato fra uno sblocco e il successivo per un gioco di costruzione o automazione.** Per gli idle esistono (30-90 s, 10-15 min). Per Factorio, Satisfactory, Anno: **niente**.
- **Post-mortem con numeri di un gioco la cui curva era sbagliata.** Ci sono lamentele di giocatori a valanga, ma nessun autore che pubblichi *"avevamo messo ×N, era sbagliato, l'abbiamo cambiato in ×M"*.
- **Quanti progetti servono per riempire un'era.** Nessuna fonte dà un numero. I nostri 7-9 per era sono una scelta nostra.
- **Dati sulla forma della curva su telefono in verticale** rispetto al PC. Niente, come nelle sei ricerche precedenti.
- **Una fonte che dica di quanto deve crescere la produzione in un gioco senza prestigio.** Tutta la letteratura sugli incrementali dà per scontato che prima o poi si azzeri. Noi no. **Il nostro ×1,3 è derivato, non citato**, e va confermato dalla simulazione.

---

## 10. Le fonti

**Reddit è risultato bloccato** allo strumento di ricerca, come nelle sei ricerche precedenti. **WebFetch è bloccato dal proxy**: ho potuto leggere solo quello che il motore di ricerca restituisce, non le pagine intere. Dove questo ha limitato il risultato, è scritto al §9.

**Matematica e progettazione degli incrementali**
- Envato Tuts+ — *Numbers Getting Bigger: The Design and Math of Incremental Games*
- Kongregate Developer Blog / Game Developer — *The Math of Idle Games*, parti I, II, III (Anthony Pecorella)
- GDC Europe 2016 — Anthony Pecorella, *Quest for Progress: The Math and Design of Idle Games* (slide su GDC Vault, fogli di calcolo su archive.org)
- Eric Guan — *Idle Game Design Principles* (Substack)
- Medium — *Math — the backbone of Idle Games* (Dik Medvešček Murovec)
- Machinations.io — articoli sul bilanciamento economico, documentazione *Level Progression*; e dev.to, *Game Economy Balancing*
- Medium — *Sigmoid Curves are Game Designers' Friends*; *Graphs for Player Progression*
- Lost Garden — *Value chains*
- gamedesigning.org — *How Reward Loops Keep Players Engaged in Game Design*
- GridInc — *Idle Games Best Practices*
- Game Developer — *Balancing Tips: How We Managed Math on Idle Idol*

**Numeri di gioco**
- Cookie Clicker Wiki (wiki.gg e Fandom) — costi base e produzione base degli edifici
- Satisfactory Wiki e guide (Dexerto, Prima Games, GameRant) — struttura delle tappe e dei 9 livelli
- Factorio Mods — *Technology Price Multiplier*, *Hexi's Scaling Science Cost*, *RP Rebalanced Technology Costs*
- Anno Union e Anno 1800 Wiki — progressione per livelli di popolazione
- CivFanatics e guide su Civilization VII — transizioni d'era, edifici "senza età", eredità

**Voci dei giocatori** (Discussioni Steam)
- Endless World Idle RPG · Nomad Idle · Idle Sphere · Idle Slayer · NGU Idle · Revolution Idle · IdleOn · Idle Champions of the Forgotten Realms · Satisfactory
- un devlog su itch.io per i "tre orologi contemporanei"
