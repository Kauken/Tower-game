# Le monete, la vendita e il mercante

**Ricerca su una domanda aperta: la valuta va salvata o va tolta?**
16 ricerche. Fonti in fondo. Reddit bloccato, come nelle dieci ricerche precedenti.

---

## In una riga

**Le monete si tengono, ma vanno cambiate in due punti**: devono comprare **posti nuovi e verbi nuovi**, non solo permessi da una lista che finisce; e i materiali devono avere **un secondo uso** prima che venderli diventi una decisione — oggi non lo è, e nessun gioco è mai riuscito a renderlo tale senza quel secondo uso.

Il difetto n. 1 (la valuta muore) è **confermato e misurabile**: da noi vale esattamente **1720 monete**, poi le monete non servono più a niente.
Il difetto n. 2 (vendere non è una scelta) è **confermato e più grave di come era formulato**: non è che la vendita sia arrivata troppo presto. È che oggi la vendita **è la definizione stessa dei materiali**, non un'alternativa a qualcosa.

Togliere la valuta sarebbe un errore, e sotto c'è il perché in quattro punti concreti.

---

## Nota su cosa non ho potuto leggere

Mi era stato chiesto di leggere `docs/ricerche/SINTESI.md`, `docs/ricerche/SINTESI-PROGRESSIONE.md`, `docs/PROGETTI.md` e il §3 del GDD ("Le tre economie, e perché sono tre").
**Nessuno dei quattro esiste in questa copia del progetto.** La cartella `docs/ricerche/` non c'era (l'ho creata per scrivere questo file), `PROGETTI.md` non c'è, e il `GDD.md` presente è ancora quello del tower defense: il suo §3 si chiama "Il campo" e parla di sentiero e castello. Nella storia di git non c'è traccia di isola, operaio o mercante.

Ho invece trovato, e usato, le fonti vere del progetto attuale: le skill `isola-*` in `.claude/skills/` e i file `config/*.json`, che esistono e sono aggiornati. **I numeri "da noi" qui sotto vengono da lì.**
Se le dieci ricerche precedenti dicevano qualcosa che qui ripeto o contraddico, è per questo motivo — e vale la pena controllare che sia aperto il ramo giusto.

---

## 1. Nei giochi di costruzione, la valuta si guadagna il suo posto?

Ho trovato quattro categorie, e tutte e quattro dicono qualcosa di utile.

### A. Chi non ce l'ha mai avuta: Factorio, Timberborn, Dyson Sphere Program

Factorio è descritto come *"un'economia dettagliata e autosufficiente, senza valuta"*. La proposta di aggiungere soldi torna regolarmente sui forum, e la risposta della comunità è sempre la stessa: una valuta *"banalizzerebbe il gioco e ridurrebbe tutto ai soldi, eliminando il senso stesso di Factorio, che è costruire fabbriche automatiche"*. La formula che si ripete è: **non compri di più, costruisci una fabbrica più grande.**

Timberborn uguale: economia solo di risorse, nessuna moneta. Dyson Sphere Program uguale.

**Cosa hanno in comune tutti e tre:** in nessuno dei tre la valuta servirebbe a *scegliere*. Servirebbe a *saltare* il lavoro. Il pericolo non è avere una valuta: è avere una valuta che può **fare il lavoro al posto tuo**.

> Da noi le monete non producono materiali, quindi **non siamo nel caso Factorio**. Ma se un giorno si potesse comprare legno col denaro, ci finiremmo dentro in un secondo.

### B. Chi ce l'ha travestita, e aggiunta dopo: Satisfactory

Satisfactory non ha soldi: ha i **coupon FICSIT**, che si ottengono buttando roba dentro un macchinario apposta (l'**AWESOME Sink**) e si spendono in un negozio.

La motivazione dichiarata è pratica, ed è nata **dopo un problema osservato**: *"prima o poi cominci a sovrapprodurre, e gli oggetti facili da fare si accumulano finché i nastri si bloccano perché i contenitori sono pieni."* Il Sink serve a **liberare spazio** e a trasformare l'eccesso in qualcosa.

Ma c'è anche la critica opposta, dal titolo esplicito su Steam: **"Coupon FICSIT — perché premiare l'inefficienza?"** Cioè: se ti pagano per buttare via, il gioco premia chi ha prodotto male.

> **Questo è un caso di valuta aggiunta dopo, ed è il modello più vicino a quello che ci serve** — con l'avvertenza che, se la vendita è troppo redditizia, diventa un premio allo spreco.

### C. Chi ce l'ha e regge: Stardew Valley, Forager, Anno 1800

Stardew è il caso da studiare, perché contiene **le due frasi opposte, nello stesso gioco**:

| Cosa dicono i giocatori | Di quali oggetti parlano |
|---|---|
| *"il valore di un oggetto in Stardew non si misura sempre in oro"* — esistono liste di "cose da non vendere mai" | oggetti che servono anche ad artigianato, regali, costruzioni, fascicoli |
| *"è del tutto sensato vendere tutto man mano che lo raccogli, tanto è tutto in profitto comunque"* | tutto il resto |

**Non è una contraddizione: è la regola.** Per i materiali con un uso solo la scelta non esiste; per quelli con due usi esiste.

### D. Chi ce l'ha e la vede morire: Core Keeper

Il caso di scuola del difetto n. 1, con un numero detto da un giocatore:

> *"sono seduto su **16.000 monete** dopo appena **10 ore** di gioco. Senza qualcosa su cui spenderle, l'economia è rotta."*

E la diagnosi della comunità: *"i soldi sono inutili e troppo abbondanti nell'endgame; non trovi niente da comprare a parte i potenziamenti."*

**Notare bene:** Core Keeper i potenziamenti a costo crescente **ce li ha già**, e non bastano. Questo è il controesempio diretto all'idea che il progetto 38 da solo risolva il problema.

---

## 2. La valuta morta: come la risolvono i giochi che durano

Il problema ha un nome tecnico: **gold sink**, "scarico dell'oro". Nasce negli MMO per l'inflazione, ma la diagnosi è identica alla nostra:

> *"il contenuto è finito e lo scarico si è prosciugato mentre la sorgente continuava a produrre — la valuta si gonfia fino a non significare più niente."*

Le soluzioni **nominate e documentate** che ho trovato:

| Soluzione | Come funziona | Dove è citata |
|---|---|---|
| **Costo crescente** | lo scarico cresce insieme alla sorgente, il traguardo si sposta sempre | principio generale (Machinations.io, Wikipedia "Gold sink") |
| **Scarico opzionale di alto valore** | *"il buon gold sink è quello di cui non ti accorgi"* — la casa del giocatore | Dark Age of Camelot, Lord of the Rings Online |
| **Limitare la sorgente** | non lasciare che si accumuli eccesso | principio generale |
| **Il costo di spostarsi** | proposta dei giocatori di Core Keeper: teletrasportarsi costa, e costa di più man mano che avanzi | discussioni Steam Core Keeper |
| **Comprare il posto successivo** | le monete aprono una zona nuova della mappa | Forager, serie City Island, Islanders, molti builder mobile |

### Il progetto 38 ("Gli affinamenti") basta?

**No. Cura un difetto e non l'altro.**

Il progetto 38 è la prima riga della tabella: costo crescente. Va benissimo **contro l'inflazione** (le monete non diventano carta straccia). Ma non dà **uno scopo**, e su questo le fonti sui giochi incrementali sono nette:

> *"il ritmo rallenta di continuo, senza una fine in vista; e senza uno stato finale i giocatori non smettono di giocare — **si arrendono**, quando si accorgono che non stanno più facendo progressi."*

Più il caso Core Keeper qui sopra, che i potenziamenti infiniti li ha e li trova insufficienti.

> **Conclusione:** il progetto 38 va tenuto come **contorno**, non come destinazione. Serve almeno una destinazione delle monete che apra **un posto** o **un verbo**.

---

## 3. Vendere le proprie risorse: tensione interessante o difetto?

### La prova più pulita è dentro Factorio, e sono due materiali dello stesso gioco

| Materiale | Quanti usi ha | Cosa succede |
|---|---|---|
| **Carbone** | **due**: si brucia come combustibile **e** serve per plastica ed esplosivi | discussione infinita su quanto bruciarne e quanto risparmiarne. Esiste una tecnica famosa (lo "splitter a priorità") il cui **unico scopo** è bruciare prima il legno **per risparmiare carbone** |
| **Legno** | **uno solo**: bruciare | la domanda più ripetuta dai nuovi giocatori si intitola letteralmente **"che me ne faccio del legno?"** |

Stesso gioco, stesse regole, stesso giocatore. **Due usi generano anni di discussione. Un uso solo genera "e questo a che serve?".**

### E ha anche un nome, il nostro difetto

TV Tropes lo cataloga: **"Shop Fodder"** — *"oggetti che per il giocatore non hanno nessuno scopo se non essere venduti"*. È elencato come difetto, non come meccanica.

> **Il sospetto della richiesta è confermato, e più forte di com'era scritto.**
> Non è che la vendita sia "arrivata troppo presto". È che **oggi la vendita non è un'alternativa a niente: è ciò che il materiale è.**
> Nell'Era del Fuoco, col legno che diventa anche combustibile, la vendita smette di essere un pulsante e diventa una decisione. **Quella è la data in cui la vendita nasce davvero.**

### Ma metterci due usi non basta: devono valere quasi uguale

Tre prove, da tre giochi diversi.

1. **Moonlighter** (dungeon di notte, negozio di giorno). La lamentela più utile che ho trovato in tutta la ricerca:
   > *"gli oggetti fabbricati spesso non valgono nemmeno in parte i soldi che ti darebbero i singoli ingredienti."*
   Cioè: se fabbricare rende meno che vendere, nessuno fabbrica.

2. **Graveyard Keeper**, verso opposto. Il consiglio corrente della comunità è categorico:
   > *"non vendere **nessun** materiale da artigianato. Punto."*
   Lì i soldi si fanno altrove, quindi vendere materiali è sempre sbagliato. Anche qui: **nessuna scelta**, solo con la risposta invertita.

3. **Against the Storm**. La valuta si chiama **ambra** e si ottiene vendendo merci ai mercanti. La comunità riporta che *"l'economia dell'ambra è volutamente più debole in molti modi di quella dei beni"*, e che vendere al mercante è fortissimo all'inizio e viene poi **ridimensionato** a un certo punto della progressione.

> **La regola che ne esce** (dedotta da me, non citata testualmente da nessuno):
> perché "vendere o usare" sia una scelta, i due usi devono rendere **quasi uguale**, con l'uso interno leggermente avanti. Se la vendita vince, l'isola muore. Se perde di tanto, il mercante muore.

### E il caso più elegante di tutti: Path of Exile

In Path of Exile **non esiste l'oro**. La valuta sono **oggetti che servono anche a fabbricare**: le stesse sfere che usi per comprare da un altro giocatore le potresti usare sul tuo equipaggiamento.

> *"spendere una sfera per comprare un oggetto vuol dire rinunciare a usarla sul proprio equipaggiamento."*

È la forma pura del principio: **la valuta stessa ha due usi**, quindi ogni spesa costa qualcosa di reale.

*Nota mia:* da noi questa strada **è già stata chiusa dal GDD**, e per un buon motivo (se i progetti si pagassero coi materiali il mercante sarebbe arredamento). Ma il principio si può applicare **dall'altro lato**: non rendere le monete un materiale, bensì rendere i materiali qualcosa che si può bruciare invece che vendere. Stesso risultato, senza toccare la separazione.

---

## 4. Le due economie separate — una compra il permesso, l'altra la cosa

Il caso più vicino al nostro è **Forager**: le monete comprano **terra**, i materiali costruiscono. La terra è un permesso, esattamente come il progetto.

Cosa dicono i giocatori:

- La scelta esiste ed è discussa: la prima isola comprata *"non si ripaga subito, e non hai ancora i vantaggi per sfruttare la terra che compri"* — cioè **comprare il permesso troppo presto è uno spreco**. È una decisione vera.
- **La lamentela specifica che cercavo**, da una recensione: *"espandi il tuo impero"* sono solo *"parole eleganti"* per *"compri terreni"*, e l'espansione è **senza conseguenze**.

> Quando la valuta compra **solo permessi**, la spesa non ha attrito: comprando un permesso non togli niente a nessun altro.
> **Il §3 del GDD ha ragione sul perché la separazione serve** — ma la separazione tiene vivo **il mercante**, non **le monete**. Le monete restano vive solo finché la lista dei permessi non finisce.

### Il conto della vita delle monete, coi nostri numeri veri

| | Valore | Da dove viene |
|---|---|---|
| Monete di partenza | **300** | citato: `config/economia.json` |
| Progetti oggi in bacheca | **6** | citato: `config/progetti.json` |
| Costi: ascia 120 · zaino 160 · stivali 210 · piccone 260 · vivaio 450 · carriola 520 | **totale 1720** | citato |
| Monete da guadagnare in tutta la partita | **1420** | **derivato da me** (1720 − 300) |
| Tronchi da vendere per farle, senza raffinare | **~474** | **derivato da me** (1420 ÷ 3 monete a tronco) |
| Monete utili dopo il 1720° | **0** | **derivato da me** |

**Il difetto n. 1 non è un'impressione: è un numero, e quel numero è 1720.**

---

## 5. Quello che già succede da noi, e che nessuno ha guardato

Ho letto `config/isola.json` e `config/ricette.json`. **Una decisione di vendita esiste già nel gioco**, ma è tarata in modo che nessuno la prenderà mai.

| Cosa vendi | Monete | Guadagno del raffinare |
|---|---|---|
| 1 legno | 3 | — |
| 1 legno → 2 tavole | 4 | **+1** (+33%) |
| 1 pietra | 4 | — |
| 1 pietra → 2 ghiaia | 6 | **+2** (+50%) |
| 1 rame | 5 | — |
| 1 rame → 4 chiodi | 8 | **+3** (+60%) |
| 4 tavole + 6 chiodi (valgono 20) → 1 telaio | 32 | **+12** (+60%) |

*Tutti i prezzi sono citati dai file. Le percentuali le ho calcolate io.*

Raffinare **conviene sempre** in monete. Ma il guadagno **assoluto** è **1, 2 o 3 monete per gesto**, e ogni gesto costa il tempo dell'operaio, che è la risorsa scarsa dichiarata del gioco. **Nessun giocatore passerà dieci secondi al banco per una moneta.**

L'unica riga che vale davvero è il **telaio: +12 monete**.

> Questo si sistema **senza costruire niente di nuovo**: è solo bilanciamento. E finché non è sistemato, "raffinare o vendere" è una scelta finta esattamente come "vendere o tenere".

---

## 6. Il mercante come personaggio: aggiunge qualcosa oltre al numero?

**Sì, e in modi economici da costruire.** Quattro trovate documentate, in ordine di resa rispetto alla fatica.

### 6.1 — Il mercante che *chiede* una cosa precisa

La più forte, ed è in un gioco grosso e finito: **Anno 1800**. Ai porti dei mercanti tutto si vende **al peggior prezzo possibile**, tranne le merci che loro **chiedono** (segnate in rosso), che vanno **al miglior prezzo**. Risultato riportato dai giocatori: *"sovrapprodurre le merci che loro vogliono può dare grossi profitti."*

Cosa fa questo, da noi:
- trasforma la vendita da *"svuoto lo zaino"* a *"vado a prendere apposta quella cosa lì"*;
- dà **un motivo per raccogliere di più** (domanda 7 dell'autore) senza inventare un sistema;
- crea la scelta **anche prima che i materiali abbiano due usi**: oggi non rinunci a niente vendendo il rame, ma rinunci a qualcosa se il rame è chiesto **e ne hai poco**.

**Costo di costruzione:** una voce in `config/economia.json` e una riga nell'interfaccia del casotto. È la trovata col miglior rapporto resa/fatica di tutta la ricerca.

### 6.2 — Il prezzo che cala se gli scarichi addosso troppa roba

Sempre Anno 1800, e citato anche come principio generale nelle discussioni sui mercanti: *"limitare la capacità del mercante di comprare tutto, senza bloccarlo del tutto."* Chi produce troppo scopre che *"venderlo al porto non ti dà un guadagno netto: riduce solo quanto ci stai perdendo."*

Da noi vorrebbe dire: i primi tronchi valgono 3, il centesimo vale meno. È il modo più semplice per **impedire che la vendita sia la risposta a tutto**.

### 6.3 — Il prezzo che non ti dicono, e la lista dei desideri

**Moonlighter**: il prezzo lo metti tu e guardi la reazione dei clienti; il gioco poi lo ricorda. Chi ci sta dentro dice che *"l'interazione coi prezzi cresce mentre ti destreggi fra quello che useresti tu e quello che vendi"*. Chi non ci sta dentro lo trova **frustrante**: *"parti senza nessuna idea dei prezzi, quindi li metti alla cieca."*

La cosa da rubare non è il prezzo nascosto: è **la lista dei desideri**, cioè segnare quali materiali ti servono, così gli altri sono marcati *"sicuri da vendere"*. È la risposta d'interfaccia alla domanda "e se vendo una cosa che mi serviva?".

**Ma serve solo quando i materiali avranno due usi.** Oggi non servirebbe a niente.

### 6.4 — La contrattazione vera e propria

**Recettear** ci ha costruito sopra un gioco intero: *"la contrattazione non è una meccanica secondaria, è il cuore del gioco; ogni tipo di cliente ha comportamenti e tolleranze di prezzo diverse"*, con un bonus se indovini il prezzo entro lo 0,5% e clienti che se ne vanno se tiri troppo la corda.

**Sconsigliata da noi.** Richiede dita veloci e attenzione momento per momento — l'opposto del gioco da telefono con un operaio che cammina. La cito per completezza, non come proposta.

---

## 7. Se la togliessimo del tutto, cosa perderemmo?

Nei giochi **senza valuta**, quello che fa scegliere al giocatore quale ramo aprire è sempre una di queste tre cose:

| Al posto delle monete | Come funziona | Chi lo fa |
|---|---|---|
| **Consegni la cosa vera** | per sbloccare devi consegnare materiali fatti da te, che quindi non usi per altro | Factorio (pacchetti di ricerca), Satisfactory (traguardi: consegni lastre e cavi) |
| **Consegni il pezzo giusto** | il costo non è "tanto", è **"quello lì"** | Stardew Valley (i **fascicoli** del centro civico: doni oggetti precisi invece di venderli) |
| **Paghi in tempo e spazio** | non paghi: rinunci a un posto o a un turno | Timberborn e i gestionali in genere |

**Cosa perderemmo togliendole, in concreto:**

1. **Il mercante diventerebbe arredamento** — lo dice già il GDD, ed è vero.
2. **Perderemmo l'unico modo di dare valore a un materiale che avanza.** Senza vendita, il rame in eccesso non è niente.
3. **Perderemmo il numero che sale mentre non stai facendo niente di nuovo**, che sembra poco ma è metà del piacere di un gioco di raccolta.
4. **Perderemmo la separazione fra "posso" e "ho"**, che è la cosa migliore del §3 del GDD. Il progetto lo compri con le monete, la cosa te la fabbrichi coi materiali: *"e dopo averlo comprato ne resta ancora metà: adesso ti servono i materiali."* **Quella meccanica è buona e funziona.**

**Quindi no: non si toglie.** Il difetto non è la valuta — è che la lista dei permessi finisce.

---

## 8. Farming: cosa tira davvero?

L'autore chiede *"un obiettivo per fare sempre più farming"*. Dico subito che **queste sono le fonti più deboli di tutta la ricerca**: articoli divulgativi e discussioni generiche, non post-mortem né talk. Ma convergono, e il caso Satisfactory le conferma da un'altra direzione.

Le fonti generiche dicono: il premio **concreto** (un posto nuovo, una cosa nuova che si può fare) motiva più del numero che sale, e i giocatori si fermano soprattutto **quando non è chiaro a cosa serve** quello che stanno accumulando.

Satisfactory conferma: lì il motivo per produrre di più **non è il coupon**, è **il traguardo** — la macchina nuova. Il coupon è lo scarico del surplus, non il motore.

**Ordine di forza (fonti + mia lettura):**

1. **Il posto nuovo** — una zona dell'isola che si apre. Il più forte, e il più usato dai builder da telefono (serie City Island: *"manda il dirigibile a esplorare e sblocca isole nuove"*)
2. **Il verbo nuovo** — una macchina che fa una cosa che prima non si poteva fare. Quasi pari
3. **Il numero che sale** — potenziamenti a costo crescente. Regge come **contorno**; da solo produce il "gold sink dilemma" e il giocatore che *si arrende*

Questo è **coerente col registro dei rifiuti** del progetto, dove c'è già scritta la regola giusta: *"un'automazione vale quanto la fatica che toglie"*, e *"un progetto deve dare un verbo nuovo o togliere una domanda dalla testa del giocatore."*

---

## Cosa cambia da noi

| La trovata | Cosa tocca | Stato |
|---|---|---|
| **Le monete si tengono.** La separazione progetto = monete / cosa = materiali è buona, documentata e la sua alternativa (comprare col materiale) uccide il mercante | niente | **deciso: non toccare** |
| **Le monete devono comprare almeno un "posto nuovo"** — una zona dell'isola che si apre — non solo permessi da una lista finita. È il gold sink più forte che ho trovato, e non finisce | `PROGETTI.md`, mappa dell'isola | **da decidere** — è la mossa che risolve il difetto n. 1 |
| **Il progetto 38 da solo non basta**, e c'è un controesempio preciso (Core Keeper ce li ha e i giocatori dicono che i soldi sono comunque inutili). Va tenuto, ma come contorno | `PROGETTI.md` | **da decidere** |
| **Il legno che diventa anche combustibile è la mossa giusta** e va fatta: è quello che fa nascere la vendita come decisione. Fino ad allora la vendita resta un pulsante — e va bene, purché lo si sappia | Era del Fuoco / macchine | **da fare, ma dopo** |
| **Quando arriva il combustibile: bruciare deve rendere quanto vendere, o poco di più.** Regola di Moonlighter e Graveyard Keeper: se un uso domina, l'altro non esiste | `config/isola.json` prezzi + ricette | **da fare insieme al combustibile** |
| **Il mercante che chiede una cosa precisa e la paga molto di più** (modello Anno 1800). Risolve insieme "vendere non è una scelta" e "un motivo per raccogliere di più", e funziona **già oggi**, prima del combustibile | `config/economia.json`, casotto | **da valutare — miglior rapporto resa/fatica di tutta la ricerca** |
| **Il prezzo che cala se scarichi addosso al mercante troppo dello stesso materiale.** Impedisce che vendere sia la risposta a tutto | `config/economia.json` | **da valutare** |
| **Raffinare per vendere rende +1/+2/+3 monete a gesto: nessuno lo farà mai** con un operaio solo. O si alza il margine, o si dichiara che raffinare serve solo a costruire e si smette di far finta che sia una scelta | `config/isola.json` → `materiali[].prezzo` | **da valutare — lavoro dell'agente `bilanciatore`, non mio** |
| **La lista dei desideri** (segni cosa ti serve, il resto è marcato "sicuro da vendere") | interfaccia del casotto | **da valutare, ma solo dopo il combustibile.** Oggi non servirebbe |
| **La contrattazione alla Recettear**: sconsigliata. Chiede attenzione momento per momento, che è l'opposto di questo gioco | — | **scartata, con motivo** |

---

## Quello che NON ho trovato

Lo dichiaro invece di riempirlo a fantasia.

- **Un gioco di costruzione che abbia tolto la valuta dopo averla messa.** Cercato in più modi. Ho trovato solo rimozioni di valute *a pagamento* (acquisti in-app), che è un altro discorso. Se esiste, non l'ho trovato — il che è già un'informazione: nessuno sembra farlo.
- **Dichiarazioni ufficiali degli sviluppatori di Factorio** sul perché non c'è valuta. Quella che riporto è la posizione ripetuta e coerente della comunità sui forum ufficiali e su Steam, non una fonte degli autori.
- **Commento degli sviluppatori di Stardew Valley** sui fascicoli come tensione "dona invece di vendere". Le fonti trovate spiegano *come* completarli, non *perché* siano fatti così. L'interpretazione è mia.
- **Numeri sul rapporto ideale fra prezzo di vendita e valore d'uso** di un materiale. Nessuno li pubblica. La regola "i due usi devono valere quasi uguale" è **dedotta** da tre lamentele (Moonlighter, Graveyard Keeper, Against the Storm), non misurata.
- **Un talk GDC o un post-mortem** che affronti direttamente la nostra domanda. Il testo più vicino è l'"handbook" di economia su Game Developer, che però non ho potuto leggere per intero (WebFetch bloccato dal proxy): dalle ricerche risulta che parla di bilanciamento e monetizzazione, non del nostro caso.
- **Fonti solide sulla domanda 7 (farming).** Sono le più deboli della ricerca. Prendile come indizio, non come prova.
- **Niente da Reddit.** Bloccato, come nelle dieci ricerche precedenti. Non ho insistito.

---

## Fonti

**Discussioni Steam** — Factorio (economia e valuta; "che me ne faccio del legno?"), Satisfactory ("Coupon FICSIT — perché premiare l'inefficienza?"), Stardew Valley (vendere tutto / cosa non vendere mai), Forager (metodi per fare monete; "commercia e costruisci un'economia"), Against the Storm (ambra, rotte commerciali, "Booming Economy"), Anno 1800 (non guadagno vendendo merci; difficoltà con l'economia), Core Keeper (endgame stantio; soldi inutili), My Time at Portia (cosa vendi), Graveyard Keeper (non vendere materiali).

**Forum ufficiali** — Factorio Forums (combustibili, carbone vs legno, valuta), Stardew Valley Forums.

**Wiki** — Satisfactory Wiki ufficiale (AWESOME Sink, coupon FICSIT), Factorio Wiki (carbone), Against the Storm Wiki ufficiale (Trading), Stardew Valley Wiki (fascicoli), Recettear Wiki (contrattazione, meccaniche di prezzo), Anno 1800 Wiki (commercio), Forager Wiki.

**TV Tropes** — *Vendor Trash*, *Shop Fodder*.

**Altro** — Wikipedia (*Gold sink*, *Incremental game*, *Timberborn*, *Dyson Sphere Program*), Machinations.io (inflazione nelle economie di gioco), Game Developer (*I designed economies for $150M games — here's my ultimate handbook*), recensioni di Moonlighter (Gamecritics, LifeIsXbox, Metacritic utenti), guide Moonlighter (TheGamer, GameRant), recensioni Timberborn (BoilingSteam, Big Boss Battle), Medium/Vista Magazine (recensione critica di Forager), guide Path of Exile sulla valuta.

**Fonti interne al progetto** — `.claude/skills/isola-glossario/SKILL.md` (registro dei rifiuti, "un'automazione vale quanto la fatica che toglie"), `.claude/skills/isola-config/SKILL.md`, `config/economia.json`, `config/progetti.json`, `config/isola.json`, `config/ricette.json`.

**Reddit: bloccato.** Confermato anche in questa ricerca.
