# Telefono e cozy — come si fa funzionare un gioco di automazione su uno schermo piccolo

Ricerca sul **solo aspetto telefono**: comandi, gesti, schermo verticale, sessioni.
Non parla di perché la gente smette in generale (c'è una ricerca gemella per quello).

Stato: **completa.** Agosto 2026.

**Nota sul metodo, da leggere prima di fidarsi:** **Reddit è risultato inaccessibile** allo strumento di ricerca (errore esplicito del proxy), quindi non c'è **niente** che venga da lì. Le fonti sono: forum ufficiali degli sviluppatori, segnalazioni su GitHub, forum Steam, recensioni di testate specializzate (TouchArcade, Pocket Gamer, Gameindustry), articoli di UX e un lavoro accademico. Dove una cosa la dicono i **giocatori** e dove la dice la **documentazione**, è scritto.

---

## In una riga

Su telefono i porting di automazione non muoiono per la profondità del gioco ma per **un dito che sbaglia tessera**: la soluzione che funziona quasi sempre è **non piazzare mai subito** — mostrare un'anteprima e far confermare — e **tracciare i nastri come una linea provvisoria fra due punti**, non come una pittura continua.

---

## Perché falliscono i porting

### Factorio — non esiste su telefono, e il motivo è dichiarato
Non è un fallimento di recensioni: è un porting **mai fatto**, e la ragione detta dagli sviluppatori e discussa dalla comunità è esattamente il nostro problema.
- Il vero ostacolo per far girare Factorio su un dispositivo con schermo tattile non è la potenza, è **l'input e l'interfaccia**: servirebbe una ricostruzione totale dell'interfaccia per renderla usabile ([Steam, discussione "mobile?"](https://steamcommunity.com/app/427520/discussions/0/1291817837627916996/); [Factorio Forums, "Touch controls"](https://forums.factorio.com/viewtopic.php?t=5010)).
- Anche **con mouse e tastiera** il piazzamento dei nastri è già intricato: si può trascinare nella direzione in cui il nastro guarda, ma non si può "dipingere" liberamente in tutte le direzioni senza ruotare ([Factorio Forums, "1.1: Belt placement behaviour"](https://forums.factorio.com/viewtopic.php?t=91538)).
- La risposta pratica della comunità è: gioca su PC e **trasmetti lo schermo al telefono**, invece di aspettare un porting.

**Cosa impariamo:** se il sistema di nastri richiede rotazione + direzione + continuità, su telefono non si salva. Va progettato **dall'inizio** per il dito, non tradotto dopo.

### Mindustry mobile — il porting riuscito che però ammette il problema
Mindustry è la prova che si può fare, ma le sue stesse segnalazioni di bug descrivono il male:
- Su telefono **è estremamente facile premere il blocco una tessera più a sinistra** di quello che volevi, ed è frustrante quando stai piazzando una fila di blocchi, perché non c'è modo di impedirlo o annullarlo subito ([GitHub Mindustry, issue #118 "Confirmation on line placement"](https://github.com/Anuken/Mindustry/issues/118)).
- La funzione più comoda del PC — tenere premuto CTRL e trascinare per far **pathfinding automatico** ai nastri — **non ha equivalente diretto su telefono**. Il rimedio suggerito dai giocatori è appoggiare un secondo dito sullo schermo mentre trascini col primo, cosa che gli stessi giocatori definiscono scomoda ([Factorio Forums, "Mindustry Conveyor Placement"](https://forums.factorio.com/viewtopic.php?t=88428); [GitHub Mindustry-Suggestions, issue #1763](https://github.com/Anuken/Mindustry-Suggestions/issues/1763)).
- I comandi touch **non sono documentati bene**: c'è una richiesta aperta perché nessuno capisce cosa fanno i gesti ([issue #1763](https://github.com/Anuken/Mindustry-Suggestions/issues/1763)).

**Cosa impariamo:** anche il migliore del genere paga il prezzo di gesti non spiegati e di tocchi che sbagliano di una tessera.

### Stardew Valley mobile — funziona, ma i comandi sono la lamentela numero uno
Il porting è considerato completo e riuscito come contenuto; i comandi sono il punto debole ammesso da tutti.
- Recensione: su telefono **non si controlla bene come su PC**, ma non è disastroso — è una via di mezzo, con diversi schemi di controllo che funzionano e alcune goffaggini ([Gameindustry, "Revisiting Stardew Valley on Mobile"](https://www.gameindustry.com/reviews/time-waster/revisiting-stardew-valley-on-mobile/)).
- Recensione TouchArcade: il gioco completo arriva con un sistema di controllo **"non ideale" che però fa il suo lavoro** ([TouchArcade, recensione Stardew Valley](https://toucharcade.com/2018/10/23/stardew-valley-review-who-needs-real-life/)).
- Giocatori sul forum ufficiale: **zappa e annaffiatoio non sono precisi, saltano alla tessella successiva**; e chiedono di poter **tenere premuto** invece di ripetere il tocco decine di volte per raccogliere ([Stardew Valley Forums, "Mobile touch controls rework"](https://forums.stardewvalley.net/threads/mobile-touch-controls-rework-quality-of-life-improvements.15044/)).
- **L'inventario è il punto peggiore** (e per noi è centrale, visto che abbiamo un inventario a caselle): su uno schermo piccolo i comandi diventano stretti e **è molto probabile toccare la cosa sbagliata**, soprattutto all'inizio. Ci sono giocatori che hanno **regalato oggetti per sbaglio ai personaggi del paese** perché la barra rapida era minuscola. **Dividere una pila di oggetti richiedeva più tentativi**, e gli oggetti spesso non restavano dove li avevano messi ([Hardcore Droid](https://www.hardcoredroid.com/rewind-review-stardew-valley/); [The Crafty Nerd](https://thecraftynerd.com/2019/03/17/review-stardew-valley-the-mobile-version/)).
- Su tablet, dopo un aggiornamento, le finestre a comparsa (zaino, negozio) sono diventate **più piccole di prima**, e le **X di chiusura erano così piccole che bisognava premerle più volte** ([Stardew Valley Forums, segnalazioni 1.5](https://forums.stardewvalley.net/threads/report-1-5-mobile-issues-here-updated-feb-20.14953/page-33)).

**Cosa impariamo (due cose grosse per noi):**
1. **Il tocco singolo ripetuto stanca.** Se un'azione va fatta 30 volte, deve esserci un modo per farla una volta sola.
2. **"Salta alla tessella successiva" è il difetto classico.** Se il dito copre la tessella, l'utente non vede dove sta agendo e sbaglia.

### Forager — "un porting quasi perfetto" tranne i comandi
Forager è vicinissimo a noi come genere (isola vista dall'alto, raccogli e automatizza).
- Pocket Gamer lo chiama **"un porting quasi perfetto"**, ma TouchArcade titola **"un gioco davvero ottimo, ma un porting mediocre"** ([Pocket Gamer](https://www.pocketgamer.com/forager/forager-review-a-nearly-perfect-port/); [TouchArcade](https://toucharcade.com/2020/11/17/forager-mobile-review-ios-controller-support-cloud-saves-performance-iphone-11-ipad-pro/)).
- La critica costante: i comandi tattili sono **appena sufficienti**, e nei momenti concitati **ti intralciano invece di aiutarti**. Non c'è **nessuna possibilità di personalizzarli**: la schermata delle impostazioni è piena di opzioni, ma riguardano quasi tutte la grafica (movimento della telecamera, animazioni, notifiche degli oggetti).
- Verdetto pratico dei recensori: **giocalo col controller**. Il supporto al controller è fatto bene, i comandi tattili no.

**Cosa impariamo:** un gioco può essere adorato e comunque essere segnato per sempre come "porting mediocre" **solo per i comandi**. E notiamo che nessuna delle recensioni lamenta il contenuto: lamenta il dito. Per noi, che nasciamo su telefono e non abbiamo un controller a cui scappare, questo è l'avvertimento più diretto.

---

## Cosa fanno quelli riusciti

- **Mindustry**: un tocco fa cose diverse a seconda di cosa tocchi (contestuale); **la rotazione del blocco è separata dal piazzamento**, così orienti prima e confermi dopo. Ha una **modalità in cui tieni premuto per piazzare più blocchi di fila**, e uno **scorrimento automatico ai bordi** dello schermo mentre piazzi ([Mindustry DeepWiki, "Input and Control"](https://deepwiki.com/Anuken/Mindustry/5-input-and-control)).
- **Stardew mobile**: offre **più schemi di controllo** e lascia scegliere al giocatore (tocca-per-muovere, levetta virtuale, tocca-per-agire).
- **Mini Metro / Mini Motorways** (Dinosaur Polo Club): sono **nati su telefono**, non portati. Tutto il gioco è "traccia una linea col dito fra due punti". Mini Metro fa **trascinare la linea da stazione a stazione**; Mini Motorways fa **disegnare la strada col dito** un pezzo alla volta. I recensori dicono che disegnare strade e percorsi è **facile e reattivo** col tocco ([GBHBL](https://www.gbhbl.com/game-review-mini-motorways-mobile/); [App Store, Mini Metro](https://apps.apple.com/us/app/mini-metro/id837860959)). Sono la prova che tracciare col dito **si può fare benissimo** — a due condizioni: (a) il gioco **si ferma o rallenta** mentre disegni, (b) **tutto è annullabile**. Su Mini Motorways cancellare una strada **rimborsa** i pezzi, così puoi provare e riprovare quanto vuoi.
- **Il rovescio della medaglia, però, è documentato anche lì:** quando entri in modalità disegno **il gioco zooma parecchio**, e nelle fasi avanzate non riesci più a vedere tutta la mappa mentre disegni, il che rende difficile fare strade lunghe. E c'è un caso **senza annullamento**: se cancelli per sbaglio una superstrada e non ne hai di scorta, non la puoi rimettere — ed è facilissimo spazzare via una superstrada funzionante mentre cancelli le strade normali ([Steam, discussioni Mini Motorways](https://steamcommunity.com/app/1127500/discussions/0/3191360100924201389)).
- **Nessun dato trovato** su Factory Town, Dyson Sphere Program e Satisfactory su telefono: **non hanno un porting mobile**, quindi non c'è niente da imparare da loro sui comandi tattili. Lo scrivo invece di inventarlo.

---

## TRACCIARE I NASTRI COL DITO

Questa è la domanda più importante. Ecco le soluzioni che i giochi usano davvero, con pro e contro.

### A) Trascinamento continuo ("dipingi" il nastro col dito)
Trascini e il nastro si costruisce sotto il dito. È quello che fa **Mini Motorways**.
- **Pro:** immediato, nessuna spiegazione; se il gioco è nato così, funziona bene (i recensori di Mini Motorways lo chiamano "facile e reattivo").
- **Contro:** il dito **copre** quello che stai costruendo; basta un tremolio per sbagliare tessella; entra in conflitto con lo **scorrimento della mappa** (trascinare = muovo la mappa o disegno?); niente annullamento durante il gesto. È esattamente il difetto denunciato in Mindustry #118. E anche in Mini Motorways, dove pure funziona, il gioco **è costretto a zoomare** in modalità disegno, e i giocatori si lamentano che così non vedono più la mappa intera.
- **Costo nascosto:** per farlo funzionare bene bisogna dare in cambio **rimborso totale e cancellazione libera** (Mini Motorways rimborsa i pezzi di strada). Senza quello diventa punitivo.

### B) Tocca inizio → tocca fine (linea in due punti)
Tocchi la casella di partenza, tocchi la casella di arrivo, il gioco calcola il percorso da solo.
- **Pro:** nessun trascinamento, quindi **nessun conflitto con lo scorrimento**; il dito non deve restare fermo; ogni tocco è su un bersaglio grande; si può annullare fra un tocco e l'altro; funziona con **una mano sola**.
- **Contro:** il percorso lo sceglie il gioco — serve una regola prevedibile (es. "prima orizzontale poi verticale", con un tocco per invertire il gomito).
- **Nota:** è la stessa logica del pathfinding CTRL+trascina di Mindustry/Factorio, ma **senza il trascinamento**.

### C) Trascinamento con anteprima e conferma (ibrido)
Trascini, ma **non costruisci niente**: appare solo un'anteprima fantasma. Solo un pulsante "Conferma" costruisce davvero.
- **Pro:** risolve il problema numero uno (tocco sbagliato irreversibile); è letteralmente la richiesta ufficiale in [Mindustry issue #118](https://github.com/Anuken/Mindustry/issues/118).
- **Contro:** un tocco in più a ogni linea; l'anteprima va disegnata bene o non serve a niente.

### D) Modalità apposita ("modalità nastri")
Un pulsante entra in una modalità in cui il trascinamento disegna e non scorre; per muovere la mappa serve due dita.
- **Pro:** elimina l'ambiguità trascina-o-scorri.
- **Contro:** **modalità nascoste**: il giocatore non sa in che stato è. Il problema di documentazione di Mindustry nasce anche da qui.

### Raccomandazione per noi
**B + C insieme, e mai A da sola.**

1. Tocchi una casella dell'inventario → prendi "nastro" in mano (coerente col sistema della mano che già abbiamo).
2. Tocchi la **casella di partenza**: si accende.
3. Tocchi la **casella di arrivo**: appare la **linea fantasma** completa, con le frecce di direzione già disegnate.
4. Due pulsanti grandi in basso: **Conferma** e **Annulla**. Un terzo piccolo: **Gira il gomito** (per scegliere se il percorso va prima in orizzontale o prima in verticale).
5. Dopo la conferma, il nastro resta in mano: il punto di arrivo diventa il nuovo punto di partenza, così si concatena senza ripescare nulla.

Perché così: nessun trascinamento significa **nessun conflitto con lo scorrimento della mappa**, **niente dito che copre il lavoro**, e la conferma rende **impossibile** l'errore irreversibile che fa arrabbiare i giocatori di Mindustry. E funziona con il pollice di una mano sola.

Il trascinamento continuo, se lo vorremo, si aggiunge **dopo**, come scorciatoia per esperti — mai come unico modo.

---

## Piazzare con precisione su uno schermo piccolo

Dai difetti documentati (Stardew che "salta alla tessella successiva", Mindustry che sbaglia di una casella):

La ricerca accademica sul tocco descrive il problema con due nomi precisi ([Imprecision, Inaccuracy, and Frustration: The Tale of Touch Input](https://www.researchgate.net/publication/227024869_Imprecision_Inaccuracy_and_Frustration_The_Tale_of_Touch_Input)):

- **Problema dell'occlusione:** il dito **copre** il bersaglio. Non vedi cosa stai per fare.
- **Problema della precisione:** l'area di contatto del dito è **molto più grande di un pixel**. Il gioco deve indovinare quale punto intendevi.

Le soluzioni note, in ordine di quanto ci servono:

1. **Calamita alla griglia (snap), sempre e con tolleranza generosa.** Il tocco prende la tessella **più vicina al centro dell'impronta del dito**, mai il pixel esatto. Senza questo si ottiene l'effetto "salta alla tessella successiva" di Stardew.
2. **Anteprima fantasma.** Prima di costruire, si vede il fantasma di quello che verrà. Factorio la usa da anni anche su PC ([Factorio Forums, "Ghost placement snap"](https://forums.factorio.com/viewtopic.php?p=697218)).
3. **Sposta l'informazione fuori dal dito ("callout").** La tecnica documentata è mostrare **una copia della zona coperta dal dito in un punto libero dello schermo**, con un puntatore che indica il punto esatto selezionato. Versione semplice per noi: una **barretta in basso** che scrive sempre "Stai piazzando: nastro — casella (4,7)". Costa poco e toglie l'ambiguità.
4. **Cursore spostato (offset).** Il punto attivo non sta sotto il dito ma **poco sopra**, così il dito non copre il bersaglio. Esistono anche brevetti su cursori che si spostano progressivamente col movimento ([Google Patents US12014020](https://patents.google.com/patent/US12014020)). Utile, ma disorienta se non è spiegato: da valutare solo se lo snap non basta.
5. **Conferma esplicita per quello che non si annulla.** Demolire, piazzare qualcosa di costoso, tracciare una linea lunga.
6. **Zoom col pizzico a due dita** — ma non contarci come soluzione principale: chi gioca **con una mano sola non può pizzicare**. Se la precisione dipende dallo zoom, abbiamo già perso il giocatore con una mano. Meglio: **tessella abbastanza grande da non aver bisogno di zoom** (bersaglio minimo 48 px anche per le tessere toccabili), e zoom come comodità in più.

**Regola d'oro che ne esce:** la precisione non si ottiene chiedendo al dito di essere preciso. Si ottiene **rendendo il bersaglio grande, la scelta reversibile e l'intenzione visibile prima di eseguire**.

---

## Quanto sta su uno schermo verticale

Questa parte viene da **documentazione e guide di UX**, non da giocatori.

- **Regola grossa:** un'interfaccia da telefono regge circa **la metà** dell'informazione di un'interfaccia da console o PC, a parità di porzione di schermo occupata. Il motivo: si legge a distanza di braccio, su un pannello piccolo, spesso con mezzo occhio su quello che succede intorno. Le indicazioni pratiche sono **numeri grandi, poche icone, spazio abbondante** ([Sunstrike Studios, "What is Game UI"](https://sunstrikestudios.com/en/blog/what-is-game-ui/)).
- **L'errore più comune è affollare lo schermo.** Su un display piccolo bisogna decidere cosa conta e togliere il resto ([Vrunik, "UX for Mobile Games"](https://vrunik.com/ux-for-mobile-games-optimizing-user-interfaces-for-small-screens/)).
- **Verticale o orizzontale, si sceglie una volta sola.** Il verticale è la scelta standard per i giochi che si giocano fuori da una sessione dedicata, perché è così che la gente tiene il telefono. Ogni orientamento ha convenzioni sue, e **pochissimi giochi reggono bene entrambi**. (Per noi: verticale, deciso, senza pentimenti.)
- **I giochi di gestione hanno bisogno di più densità degli altri**, quindi devono ricorrere a **strati**: schede, pannelli che si aprono, liste — invece di mettere tutto in vista.
- **Aree sicure obbligatorie:** tacche, buchi della fotocamera, angoli arrotondati. Se non si rispettano i margini di sicurezza, l'interfaccia viene tagliata.
- **Bersaglio tattile minimo: 48×48 px** secondo Material Design di Google (il nostro CLAUDE.md dice 44, che è la regola Apple: la più prudente è 48).

**Traduzione per il nostro pannello a tre schede:** tre schede sono il massimo ragionevole in verticale — con quattro o cinque, le etichette diventano illeggibili. Ogni scheda deve poter essere letta **senza scorrere** nei casi normali. E le schede vanno **in basso** nel pannello, non in alto (vedi sotto).

### Pannello che sale dal basso, o pannello a tutto schermo?
C'è un pattern standard con nome: il **"foglio dal basso"** (bottom sheet) ([NN/g, "Bottom Sheets"](https://www.nngroup.com/articles/bottom-sheet/); [Material Design](https://m2.material.io/components/sheets-bottom)).

- **Foglio dal basso** = un pannello che sale dal bordo inferiore e copre solo una parte dello schermo. Si chiude toccando fuori o tirandolo giù. Sta **dentro la zona del pollice**. Va usato per azioni rapide e contestuali, legate a quello che stai guardando. Esiste anche in versione "non bloccante", che lascia toccare la mappa dietro.
- **Pannello a tutto schermo** = da usare solo quando il contenuto **non ci sta** o serve concentrazione totale su più passaggi.
- **Osservazione utile:** i pannelli contestuali che compaiono in un momento di pausa naturale funzionano molto meglio di quelli che interrompono, perché il giocatore è già pronto a ricevere informazione.

**Per noi:** il pannello dell'edificio con le tre schede è **un foglio dal basso**, non un pannello a tutto schermo. Sale dal bordo inferiore, copre circa metà o due terzi dello schermo, l'edificio a cui si riferisce **resta visibile sopra**, e si chiude tirandolo giù o toccando la mappa. Le tre schede stanno **in cima al foglio ma comunque in basso nello schermo** — cioè raggiungibili dal pollice.

---

## Durata delle sessioni

Numeri reali, da report di analisi di mercato (non da giocatori):

- **Sessione mediana su telefono, tutti i generi: 5–6 minuti** nel 2025. Il quarto migliore dei giochi arriva a **8–9 minuti** ([GameAnalytics, benchmark 2025](https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks)).
- **Giochi idle (con automazione): 6,4 minuti** di media a sessione — fatti apposta per il tragitto e la pausa breve ([Dataintelo, Idle Games Market Report](https://dataintelo.com/report/idle-games-market)).
- **Giochi di strategia: 37,5 minuti** di media a sessione, in crescita del 18% — le sessioni più lunghe del telefono ([GameAnalytics 2025](https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks)).
- **Giochi di simulazione: circa 18–19 minuti al giorno** per giocatore ([adjoe, glossario simulation games](https://adjoe.io/glossary/what-are-simulation-games/)).

**Cosa vuol dire per noi.** Il nostro gioco sta fra idle e strategia, quindi realisticamente **5–15 minuti a sessione**. Va progettato così:
- Si deve poter **fare una cosa utile in 2 minuti** (dare un ordine, spostare materiale, piazzare una macchina) e chiudere.
- Chi riapre dopo un'ora deve capire **in 3 secondi** cosa è cambiato e cosa fare adesso.
- Non c'è tempo per navigare menù profondi: se una cosa richiede 5 tocchi per essere raggiunta, in una sessione da 5 minuti non verrà mai fatta.

---

## Verticale con una mano

Questa parte viene da **guide di UX**, non da giocatori. È però la parte più consolidata e meno discussa della ricerca.

### La mappa del pollice — tre zone
([Parachute Design](https://parachutedesign.ca/blog/thumb-zone-ux/); [MockFlow, "Thumb reachability"](https://mockflow.com/glossary/Thumb-reachability); [Tim Graf](https://timgraf.com/ux-design/designing-for-the-thumb-zone-a-modern-guide-to-mobile-ux-that-respects-human-anatomy/))

- **Zona verde — in basso al centro.** Dove il pollice sta a riposo, senza sforzo. **Qui vanno le azioni principali.**
- **Zona gialla — a metà schermo, sui lati.** Si raggiunge, ma bisogna allungarsi.
- **Zona rossa — gli angoli in alto.** Scomodi o impossibili: costringono a cambiare presa o a usare l'altra mano.

### Regole che ne derivano
- **Non mettere mai in alto** le cose che si toccano spesso. In alto ci vanno solo le cose che si **guardano** (oro, vita, quantità), mai quelle che si premono ripetutamente.
- **La navigazione va in basso.** La barra a schede in basso — quella di Instagram, Twitter, Spotify — è considerata uno dei miglioramenti più importanti della UX mobile dell'ultimo decennio, proprio perché mette la navigazione dove vive il pollice.
- **Bersagli di almeno 48×48 px**, con spazio fra uno e l'altro (due bottoni giusti ma attaccati sbagliano lo stesso).
- **Angolo in alto a destra = il posto peggiore** per un mancino, e comunque scomodo per tutti. La classica "X di chiusura" lì è un errore su un pannello grande: meglio una **X in basso** o **tocco fuori dal pannello per chiudere**.

### Gesti: quali sono affidabili e quali no
Da quello che si vede nei fallimenti citati sopra:

**Affidabili (usali):**
- **Tocco singolo** su bersaglio grande — il più affidabile in assoluto.
- **Trascinamento a un dito per scorrere la mappa** — universale, tutti lo conoscono.
- **Pizzico a due dita per lo zoom** — universale.
- **Tenere premuto** per "fai questo tante volte" / per aprire il dettaglio — è la richiesta esplicita dei giocatori di Stardew.

**Non affidabili (evitali):**
- **Trascinamento per costruire**, perché confligge con il trascinamento per scorrere (il problema di Mindustry e Factorio).
- **Doppio tocco** — lento, ambiguo, spesso confuso con due tocchi singoli. Già vietato dal nostro CLAUDE.md.
- **Gesti "segreti"** senza indicazione a schermo — la richiesta aperta di documentazione in Mindustry nasce da qui.
- **Scorrimento verso i bordi dello schermo** — su telefono i bordi sono già presi dai gesti di sistema (indietro, home, tendina).
- **Trascina-e-lascia fra due pannelli** — su telefono richiede due mani e precisione. Il nostro "un tocco per materiale" è la scelta giusta ed è confermata da questa ricerca.

---

## Cosa dicono i giocatori (parafrasi fedeli)

- *"È molto facile premere il blocco una casella più a sinistra, e quando stai piazzando una fila è frustrante perché non puoi impedirlo né annullarlo."* — segnalazione su [GitHub Mindustry #118](https://github.com/Anuken/Mindustry/issues/118)
- *"La zappa e l'annaffiatoio potrebbero essere più precisi: a volte saltano alla tessella successiva."* — [Forum ufficiale Stardew Valley](https://forums.stardewvalley.net/threads/mobile-touch-controls-rework-quality-of-life-improvements.15044/)
- *"Servirebbe tenere premuto invece di toccare ripetutamente per raccogliere: con molti raccolti diventa frustrante."* — [Forum ufficiale Stardew Valley](https://forums.stardewvalley.net/threads/mobile-touch-controls-rework-quality-of-life-improvements.15044/)
- *"I comandi touch andrebbero documentati meglio."* — richiesta aperta su [GitHub Mindustry-Suggestions #1763](https://github.com/Anuken/Mindustry-Suggestions/issues/1763)
- *"Su telefono non si controlla bene come su PC, ma non è terribile: è una via di mezzo."* — [Gameindustry](https://www.gameindustry.com/reviews/time-waster/revisiting-stardew-valley-on-mobile/)
- *"Su uno schermo piccolo i comandi sono stretti ed è molto facile toccare la cosa sbagliata, soprattutto all'inizio: c'è chi ha regalato oggetti per sbaglio perché la barra rapida era minuscola."* — [Hardcore Droid](https://www.hardcoredroid.com/rewind-review-stardew-valley/)
- *"Dividere una pila di oggetti richiedeva più tentativi, e gli oggetti non restavano dove li mettevo."* — [The Crafty Nerd](https://thecraftynerd.com/2019/03/17/review-stardew-valley-the-mobile-version/)
- *"Le X per chiudere le finestre sono così piccole che devo premerle più volte."* — [Forum ufficiale Stardew Valley, segnalazioni 1.5](https://forums.stardewvalley.net/threads/report-1-5-mobile-issues-here-updated-feb-20.14953/page-33)
- *"I comandi tattili sono appena sufficienti, e nei momenti concitati ti intralciano invece di aiutarti — e non si possono personalizzare in alcun modo."* — [TouchArcade su Forager](https://toucharcade.com/2020/11/17/forager-mobile-review-ios-controller-support-cloud-saves-performance-iphone-11-ipad-pro/)
- *"Quando entri in modalità disegno il gioco zooma parecchio, e nelle mappe avanzate non vedi più tutto mentre disegni le strade lunghe."* — [Recensioni Mini Motorways](https://www.gbhbl.com/game-review-mini-motorways-mobile/)
- *"È facilissimo cancellare per sbaglio una superstrada che funzionava, e non c'è modo di annullare."* — [Steam, discussioni Mini Motorways](https://steamcommunity.com/app/1127500/discussions/0/3191360100924201389)

---

## 5 raccomandazioni concrete

### 1. I nastri si tracciano a due tocchi (partenza → arrivo), con anteprima e conferma. Mai col trascinamento libero.
**Cosa fare.** Prendi "nastro" in mano dall'inventario. Tocchi la casella di partenza. Tocchi la casella di arrivo. Appare la **linea fantasma** con le frecce già orientate. Tre pulsanti grandi in basso: **Conferma**, **Gira il gomito**, **Annulla**. Dopo la conferma il nastro resta in mano e l'arrivo diventa la nuova partenza.
**Perché.** Toglie in un colpo i tre problemi documentati: il conflitto trascina-o-scorri (Factorio, Mindustry), il dito che copre il lavoro, e l'errore irreversibile — che è **letteralmente la richiesta ufficiale aperta su Mindustry (#118)**. E funziona con una mano sola, cosa che il trascinamento lungo non fa.
**Se non lo facciamo.** Diventiamo Mindustry mobile: il giocatore piazza il nastro una casella più a sinistra, non può annullarlo, e smette. Oppure diventiamo Factorio, che il porting non l'ha proprio fatto perché il sistema dei nastri non era traducibile per il dito.

### 2. Niente scende sotto i 48 px toccabili, e questo vale anche per le caselle dell'inventario e per le X di chiusura.
**Cosa fare.** Bersaglio minimo 48×48 px con spazio fra uno e l'altro. Chiusura dei pannelli **anche** toccando fuori o tirando giù, non solo con la X. Caselle dell'inventario grandi anche a costo di mostrarne meno per riga.
**Perché.** L'inventario è dove Stardew mobile fa più male: gente che regala oggetti per sbaglio, pile che non si dividono, X da premere tre volte. Noi abbiamo un inventario a caselle **al centro del gioco**: se sbaglia lì, sbaglia sempre.
**Se non lo facciamo.** Il "un tocco per materiale" — che è una buona idea — diventa "un tocco per il materiale sbagliato", e la colpa cadrà sul sistema, non sulla dimensione dei bottoni.

### 3. Tutto quello che si tocca sta in basso. In alto solo quello che si guarda.
**Cosa fare.** Barra superiore = **solo numeri** (materiali, ora, stato). Tutto ciò che si preme — schede, conferme, inventario, pulsante ordine — nella metà bassa. Il pannello dell'edificio è un **foglio che sale dal basso**, non un pannello a tutto schermo.
**Perché.** La zona in alto è la "zona rossa" del pollice: obbliga a cambiare presa o a usare due mani. Il requisito dell'autore è **una mano**.
**Se non lo facciamo.** Il gioco resta giocabile, ma solo con due mani: e allora il vantaggio di essere un gioco da telefono sparisce, perché nessuno lo apre in fila alla cassa.

### 4. Niente è mai irreversibile: rimborso pieno e annullamento sempre visibile.
**Cosa fare.** Demolire una macchina o un nastro **restituisce tutti i materiali**. Un pulsante **Annulla** compare per qualche secondo dopo ogni azione costruttiva.
**Perché.** È il motivo per cui Mini Motorways riesce a far disegnare col dito senza far arrabbiare nessuno (le strade cancellate si rimborsano) — e il suo unico punto di rabbia documentato è esattamente il caso in cui **non** si può annullare (le superstrade). Su telefono si sbaglia: il gioco deve dare per scontato che si sbagli.
**Se non lo facciamo.** Ogni tocco diventa teso. Un gioco senza timer e senza sconfitta che però punisce il dito che scivola è la peggiore combinazione possibile: toglie la pressione dove non serviva e la mette dove fa solo male.

### 5. Ogni scheda del pannello si legge senza scorrere, e ogni cosa importante si raggiunge in due tocchi.
**Cosa fare.** Massimo tre schede. Numeri grandi, poche icone, spazio abbondante — circa **metà** dell'informazione che metteresti su PC. Dalla mappa a "dare un ordine": due tocchi. Dalla mappa a "spostare materiale": due tocchi.
**Perché.** La sessione mediana su telefono è di **5–6 minuti**, e per i giochi idle **6,4 minuti**. In 5 minuti, se una funzione è a cinque tocchi di distanza, non verrà usata mai. E l'errore più comune della UI da telefono, secondo tutte le guide, è affollare lo schermo.
**Se non lo facciamo.** Il giocatore apre, non capisce dove si fa la cosa che voleva, chiude. Non è nemmeno arrabbiato: è solo passato ad altro.

---

## Quello che questa ricerca NON ha trovato

Onestamente, ecco i buchi:

- **Reddit è inaccessibile** allo strumento di ricerca. Quindi manca il posto dove i giocatori di giochi di automazione parlano di più e più liberamente. Le lamentele qui riportate vengono da forum ufficiali, GitHub, Steam e recensioni: sono affidabili ma **meno numerose** di quello che sarebbe stato possibile.
- **Nessun esempio di gioco di automazione con nastri nato su telefono in verticale.** Mindustry è orizzontale. Mini Metro e Mini Motorways non hanno nastri, hanno linee. Non ho trovato nessuno che abbia già risolto **esattamente** il nostro problema: la raccomandazione sui nastri è una **sintesi ragionata**, non una soluzione già collaudata da qualcun altro.
- **Nessun dato su Factory Town, Dyson Sphere Program, Satisfactory su telefono**: semplicemente **non esistono su telefono**.
- **Nessuna citazione diretta da recensioni Google Play e App Store.** Lo strumento di ricerca restituisce articoli e forum, non il testo delle singole recensioni dei negozi. Quello che riporto viene da recensioni giornalistiche e forum.
- **Nessun numero sulla durata delle sessioni specifico per "giochi di automazione cozy".** I numeri che ho (5–6 min mediana, 6,4 min idle, 37 min strategia) sono per categorie vicine ma non uguali alla nostra. La stima 5–15 minuti è **mia**, ricavata da quelli.
- **Niente di misurato sulla dimensione ideale della tessella** in un gioco a griglia su telefono. I 48 px sono la regola generale per i bersagli toccabili, non una misura testata su griglie di gioco.
- **Nessun dato su come si insegna un gesto nuovo** (tipo il nostro doppio tocco partenza-arrivo) senza un tutorial pesante. So che Mindustry ha il problema; non ho trovato chi l'ha risolto bene.

---

## Fonti

**Factorio (perché non esiste su telefono)**
- https://steamcommunity.com/app/427520/discussions/0/1291817837627916996/
- https://forums.factorio.com/viewtopic.php?t=5010
- https://forums.factorio.com/viewtopic.php?t=91538
- https://forums.factorio.com/viewtopic.php?p=697218

**Mindustry (il porting riuscito, e i suoi difetti ammessi)**
- https://github.com/Anuken/Mindustry/issues/118
- https://github.com/Anuken/Mindustry-Suggestions/issues/1763
- https://deepwiki.com/Anuken/Mindustry/5-input-and-control
- https://forums.factorio.com/viewtopic.php?t=88428

**Stardew Valley mobile**
- https://forums.stardewvalley.net/threads/mobile-touch-controls-rework-quality-of-life-improvements.15044/
- https://forums.stardewvalley.net/threads/report-1-5-mobile-issues-here-updated-feb-20.14953/page-33
- https://www.gameindustry.com/reviews/time-waster/revisiting-stardew-valley-on-mobile/
- https://toucharcade.com/2018/10/23/stardew-valley-review-who-needs-real-life/
- https://www.hardcoredroid.com/rewind-review-stardew-valley/
- https://thecraftynerd.com/2019/03/17/review-stardew-valley-the-mobile-version/

**Forager**
- https://www.pocketgamer.com/forager/forager-review-a-nearly-perfect-port/
- https://toucharcade.com/2020/11/17/forager-mobile-review-ios-controller-support-cloud-saves-performance-iphone-11-ipad-pro/

**Tracciare linee col dito (Mini Metro / Mini Motorways)**
- https://apps.apple.com/us/app/mini-metro/id837860959
- https://www.gbhbl.com/game-review-mini-motorways-mobile/
- https://steamcommunity.com/app/1127500/discussions/0/3191360100924201389
- https://toucharcade.com/2019/09/30/apple-arcade-mini-motorways-review/

**Precisione del tocco**
- https://www.researchgate.net/publication/227024869_Imprecision_Inaccuracy_and_Frustration_The_Tale_of_Touch_Input
- https://patents.google.com/patent/US12014020

**Interfaccia verticale, pollice, pannelli**
- https://parachutedesign.ca/blog/thumb-zone-ux/
- https://mockflow.com/glossary/Thumb-reachability
- https://timgraf.com/ux-design/designing-for-the-thumb-zone-a-modern-guide-to-mobile-ux-that-respects-human-anatomy/
- https://www.nngroup.com/articles/bottom-sheet/
- https://m2.material.io/components/sheets-bottom
- https://blog.logrocket.com/ux-design/bottom-sheets-optimized-ux/
- https://sunstrikestudios.com/en/blog/what-is-game-ui/
- https://vrunik.com/ux-for-mobile-games-optimizing-user-interfaces-for-small-screens/

**Durata delle sessioni**
- https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks
- https://dataintelo.com/report/idle-games-market
- https://adjoe.io/glossary/what-are-simulation-games/
