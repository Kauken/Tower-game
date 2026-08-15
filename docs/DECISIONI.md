# Le decisioni

Ogni voce ha la data e, dove si può, **le parole esatte dell'autore**. Riassumerle è il modo in cui si perde l'informazione che conta.

Si legge dal basso verso l'alto per capire come ci siamo arrivati, dall'alto verso il basso per sapere dove siamo.

---

## ⚠️ Aperte — vanno decise prima di costruirle

Se un punto della roadmap sta per toccare una di queste, **fermati e falla decidere** (agente `consulente-design`), poi costruisci.

### A1. Quante isole, e cosa porta ognuna?

La seconda è decisa (ferro e carbone). Dalla terza in poi è contenuto, e si decide quando la base è viva. Da non progettare adesso: sarebbe progettare al buio.

### A5. Senza mercante, la valuta serve ancora?

**Meta' decisa il 2026-08-15**: niente commesse e niente commercianti (vedi fra le decise). Quello che resta e' la conseguenza, ed e' grossa: **le monete entravano solo vendendo al mercante.** Tolto lui, la valuta non ha piu' una sorgente.

L'autore lascia le due strade aperte: *"tramite valuta, o se non serve la valuta facciamo qualcosa"*.

**Raccomandazione: togliere la valuta.** Le ragioni, in ordine di forza:

1. **Il nostro riferimento numero uno non ce l'ha.** Satisfactory non ha monete: si sbloccano i livelli **consegnando materiali** all'HUB, e le macchine si costruiscono coi materiali. E' esattamente la struttura che l'autore sta chiedendo.
2. **La valuta e' gia' misurata come rotta.** Raffinare prima di vendere e' sempre una perdita (−4,5 monete a gesto); vendere non e' una decisione perche' non rinunci a niente; e finiti i progetti la valuta muore.
3. **Toglierla non toglie niente al giocatore**, perche' quello che compravi con le monete lo sblocchera' il cantiere.

**Cosa la sostituisce:** il **cantiere** — una costruzione grossa e visibile che mangia materiali a fasi e apre l'era dopo. E nasce la decisione vera che oggi manca:

> **Ogni tavola che metti nel cantiere e' una tavola che non usi per la tua fabbrica.**
> Sono due usi che valgono quasi uguale, che e' la condizione che la ricerca ha posto perche' una scelta esista.

**Costo dichiarato:** si tolgono `economia.js`, la vendita e i prezzi dall'interfaccia, e il `GDD.md` §3 passa da tre economie a due. Il concetto di *valore* di un materiale resta, ma solo come strumento di bilanciamento — non e' piu' una cosa che il giocatore vede.

**Serve il via libera dell'autore prima di togliere**, perche' cancella roba costruita e funzionante.

### A3. Quanto grande deve essere lo zaino di partenza?

**Misurata, non ragionata** — i numeri stanno nella voce del 2026-08-14 e nella `ROADMAP.md`. Due strade, e nessuna è ovvia:

- ~~**Zaino base da 6 a 3 caselle.**~~ ❌ **Esclusa il 2026-08-14, misurata con `npm run progressione`: rompe il gioco.** Con tre caselle la partita si pianta dopo un solo sblocco. La ragione e' strutturale, non di numeri: fabbricare il telaio mette in ballo **quattro materiali diversi** e in tre caselle non ci stanno. Con quattro si finisce (14,0 minuti contro 13,5), quindi **quattro e' il pavimento**. La misura precedente non lo aveva visto perche' guardava solo la raccolta, non la fabbricazione.
- **Allontanare le fonti *dopo* la prima**, lasciando vicino il primo bosco. Non misurata, ma non tocca i primi quindici minuti.

Va decisa **prima** di ritoccare i costi dei progetti, perché cambia la produzione al minuto su cui quei costi si tarano. L'Era 1 si costruisce lo stesso.

### A2. Il generatore si può alimentare col nastro, o solo a mano?

Si decide al punto 15, insieme ai nastri. **Raccomandazione: sì.** Il cassetto del combustibile è un contenitore come gli altri, e un nastro che alimenta il generatore è esattamente il tipo di cosa che deve dare soddisfazione. Non c'è ragione di renderlo un'eccezione.

---

## Decise

- 2026-08-15: **C'E' UN FINALE, MA NON CHIUDE.** Scelta dell'autore, che chiude la decisione aperta A4. Ci sara' **una costruzione grossa e visibile da completare**, che da' un traguardo dichiarato — ma dopo di essa il gioco continua e le scale restano aperte.

  Ci sono arrivate **tre ricerche di fila**, da tre strade diverse. Il motivo per cui serve un traguardo: senza, molti non arrivano nemmeno a meta'. Il motivo per cui non deve chiudere: Factorio e' la prova che il giorno del razzo *"tutta la fabbrica diventa inutile"* e la gente smette. E la ricerca sul desiderio aggiunge il colpo finale: gli obiettivi devono **finire in momenti diversi**, e un finale che chiude li spegne tutti insieme.

  **Nota sulla forma**, dalla stessa ricerca: la differenza fra chi ama un traguardo grosso e chi molla e' **vederlo crescere**. Stessa quantita' di materiale, giudizio opposto fra la sfera di Dyson (che si guarda mentre si costruisce) e il razzo di Factorio (*"satelliti senza uno scopo apparente"*). Quindi il traguardo **sta sull'isola e si riempie a vista**, non e' una barra dentro un pannello.

- 2026-08-15: **NIENTE COMMESSE E NIENTE COMMERCIANTI.** Parole dell'autore: *"Non voglio commesse e commercianti. Ma un obbiettivo grande per sbloccare ere e altro tramite valuta o se non serve la valuta facciamo qualcosa per procedere nella progressione e avere senso per farmare."*

  Chiude a meta' la decisione A5. Cade la proposta del **mercante che chiede una cosa precisa e la paga di piu'** (modello Anno 1800), a cui due ricerche indipendenti erano arrivate: e' stata offerta all'autore, che l'ha letta come una commessa travestita. **La ricerca aveva ragione sul meccanismo e torto sul progetto**, ed e' il tipo di caso in cui vince il progetto.

  Le commesse erano gia' cadute il 2026-08-12. **Questa e' la seconda volta**, per una strada diversa: va considerata definitiva.

  **Quello che resta aperto e' piu' grosso**: senza mercante, la valuta non ha piu' una sorgente. Vedi A5 qui sotto, riscritta.


- 2026-08-14: **SEI RICERCHE HANNO CORRETTO QUATTRO DECISIONI GIÀ PRESE.** Non sono richieste dell'autore: sono ricerche sui forum dei giochi di riferimento, chieste da lui (*"crea tot agenti che servono per fare ricerche specifiche sui forum dei vari giochi"*). Stanno in `docs/ricerche/`, la sintesi in `SINTESI.md`. Le voci qui sotto **restano com'erano scritte** — si corregge aggiungendo, non riscrivendo la storia.

  **1. «Acceso o spento, mai a metà» resta, ma non può spegnere tutto.** La voce del 2026-08-12 sulla corrente diceva solo che è binario. Manca il pezzo che conta: esiste una discussione, con quel titolo esatto, intitolata **«Il sistema della corrente mi ha fatto smettere di giocare»**, e il motivo non era la difficoltà — era il **fusibile che spegne tutto insieme**. Coffee Stain ha poi dovuto introdurre i gruppi di alimentazione per rimediare. Quindi: un generatore a secco ferma **solo quello che copre lui**, **avvisa prima**, e **riparte da solo** quando lo rifornisci. **La mancanza di corrente costa produzione, mai lavoro perso.** → `GDD.md` §10b.

  **2. Macchine e corrente NON sono più un punto solo.** Il "costo dichiarato" della stessa voce diceva che non si possono separare. È sbagliato: **tre giochi di riferimento su quattro mettono un'era intera di macchine a combustibile prima dell'elettricità**, perché la corrente è il gradino che toglie la fatica di **riempire otto macchine una per una** — e quella fatica devi averla già sentita. Se arrivano insieme, il gradino non si sente. Da qui l'Era 1 (Il Fuoco) e l'Era 2 (La Corrente) della roadmap v18.

  **3. Salire di gradino NON è una ricostruzione.** Era scritto nel `GDD.md` §11b e nella regola 15c di `CLAUDE.md`, dato per "quello che tiene vivi i modpack per centinaia di ore". Le ricerche dicono l'opposto: **il muro della ricostruzione è il punto documentato in cui la gente abbandona il genere.** Adesso vale il contrario — **non si smonta mai quello che funziona**, la macchina nuova si affianca alla vecchia. È la correzione più importante delle quattro, perché era scritta nel documento con più autorità del progetto.

  **4. Il terminale va reso lento, non solo caro.** Sapevamo già che è il premio di fine gioco. Non sapevamo che **il prezzo non basta**: il Deposito Dimensionale di Satisfactory funziona perché fa **15 pezzi al minuto**, non perché costa. Se l'unico freno fosse il costo, si paga una volta e **casse, nastri e posizione delle macchine smettono tutti insieme di contare**.

- 2026-08-14: **MISURATO — LO ZAINO NON RENDE PERCHÉ IL BOSCO INTERO CI STA DENTRO.** La simulazione diceva che lo Zaino grande vale ×0,95, cioè niente, e lo avevamo archiviato come bilanciamento. La causa vera è un'altra: con sei caselle, **otto alberi non riempiono lo zaino**, quindi l'operaio **non torna mai** a scaricare. Il viaggio non esiste, e uno zaino più grande non ha niente da moltiplicare.

  Misura del 2026-08-14, a caselle diverse: **6 → ×1,00 · 5 → ×1,00 · 4 → ×1,00 · 3 → ×1,24**. L'effetto è **a scatto**, non graduale. Il prezzo di scendere a 3 è dichiarato: **−19% di produzione nei primi minuti**, che è esattamente dove un'altra ricerca dice che si perde la gente.

  **Non è stato cambiato niente in configurazione**: è una decisione dell'autore, ed è aperta (vedi A3).


- 2026-08-12 (notte): **NIENTE COMMESSE. L'UNICO MOTORE È LA PROGRESSIONE.** Parole dell'autore: *"le commesse non le voglio a questo punto, l'obiettivo è la progressione."* Erano il punto 14 della roadmap, e sono state tolte **prima di costruirle**.

  Il ragionamento che le rendeva superflue era già scritto e non l'avevamo visto: **il desiderio ce l'ha già la bacheca dei progetti.** Se guardando la Trivella non la vuoi, un tizio che ti chiede quaranta tavole non risolve niente — sposta il problema. E se la vuoi, la commessa è un compito in mezzo fra te e quello che stavi già facendo. Stesso motivo per cui è caduto il ciclo del giorno: **un secondo motore che gira in parallelo a quello vero è rumore.**

  Chiude la decisione aperta A2, che chiedeva con che ritmo arrivassero. La risposta è che non arrivano.

- 2026-08-12 (notte): **LA CORRENTE SI FA CON I PALI CHE COPRONO UN'AREA, NON CON I CAVI.** Parole dell'autore: *"sì vorrei un sistema energetico, magari non con cavi singoli a macchine ma con pali che coprono un'area."* Chiude la decisione aperta A1, e la chiude **meglio della raccomandazione che avevo dato io** (un solo cassetto del combustibile sulla fornace, senza rete).

  Un generatore brucia combustibile e alimenta tutto quello che sta nel suo raggio; i pali allungano la copertura e **si agganciano da soli** per vicinanza. Non si traccia nessun filo. Su un telefono tirare fili con un dito sarebbe un supplizio, e la parte interessante della corrente non sono i fili: è **"come faccio ad arrivare fin laggiù?"** — che con i pali resta tutta.

  **Acceso o spento, mai a metà.** In Factorio quando la corrente non basta tutto rallenta in proporzione: elegante, e su uno schermo da telefono illeggibile — vedi le macchine andare piano e non sai perché. Qui una macchina coperta lavora a piena velocità, una scoperta o senza combustibile sta ferma **e lo scrive**.

  **Il combustibile è legno, e più avanti carbone.** È la scelta che trasforma la corrente da tassa a decisione: **il legno che bruci è legno che non costruisci**, e il bosco che ripianti diventa il carburante della fabbrica. La prima decisione del gioco (*vendo l'alberello o lo ripianto?*) pesa il doppio. Il carbone della seconda isola non sblocca niente di nuovo: **toglie una scocciatura sentita per ore**, che è l'unico modo onesto di rendere desiderabile un materiale.

  **Costo dichiarato:** macchine e corrente diventano **un punto solo** della roadmap, ed è il più grosso della lista. Non si possono separare: una macchina che funziona senza corrente e poi da un giorno all'altro non funziona più è una promessa rotta.

- 2026-08-12 (notte): **LA SPINA DORSALE È IL TEMPO DELL'OPERAIO.** Non è una richiesta dell'autore, è il modo trovato per tenere insieme tutto quello che ha chiesto: un operaio solo, l'albero tecnologico, il crafting, le trivelle, i nastri, le isole. C'è una persona sola, quindi ogni cosa si misura in **quanti secondi del suo tempo costa e quanti gliene restituisce**. Motivo: senza una lente unica, un gioco con cinque sistemi diventa cinque giochi che non si parlano, ed è come sono morte le versioni precedenti. Ogni proposta futura si giudica con questa frase; se non ci si può giudicare, è fuori posto.

- 2026-08-12 (notte): **TRE ECONOMIE, NON DUE.** Il **tempo** (si libera, non si compra), i **materiali** (dall'isola, costruiscono le cose), le **monete** (dal vendere, comprano i **progetti** — il *diritto* di costruire una cosa). Nasce dalla richiesta dell'autore: *"oltre al sistema di compra vendita ci dev'essere un sistema di crafting per craftare le nuove attrezzature e macchinari."* Motivo: se i progetti si pagassero coi materiali, il mercante sarebbe arredamento; se le macchine si comprassero con le monete, l'isola lo sarebbe. Separandole, **entrambe restano vive per tutta la partita**. È il modello del HUB di Satisfactory: sblocchi il traguardo, poi il capannone lo costruisci comunque tu.

- 2026-08-12 (notte): **NIENTE PARTE SE NON L'HAI PRESO IN MANO.** Parole dell'autore: *"per gli alberi fai in modo che devo selezionarli per piantarli perché se no quando clicco a caso pianta solo e sempre gli alberi."* Il tocco sul terreno vuoto, a mani vuote, **non fa più niente**. Per piazzare qualcosa lo prendi in mano — da una casella dell'inventario o dal menù Costruisci — e resti in mano finché non finisce o non annulli.

  Motivo, e vale per il futuro più che per adesso: l'autore ha chiesto di *"considerare anche cosa dobbiamo implementare in futuro così da capire quali funzionamenti devono avere ora le cose"*. Le cose piazzabili passeranno da una (l'alberello) a dieci (casse, trivelle, macchine, nastri, pontili). **Un'azione di default sul terreno vuoto non regge dieci cose**, e ogni comando inventato dopo sarebbe un gesto in più da imparare. Con la mano, il gesto è **uno solo per sempre** — e i nastri, che vogliono un dito che scorre, sono lo stesso gesto con un trascinamento.

- 2026-08-12 (notte): **VIA IL CICLO DEL GIORNO.** Parole dell'autore: *"il ciclo del giorno penso che puoi rimuoverlo in quanto non abbiamo più i costi per gli operai."* Ha ragione, e il motivo è più profondo di quello che dice: il giorno esisteva per far **scadere i salari**, e i salari sono caduti col passaggio a un operaio solo. Un orologio che gira senza avere denti è solo un'ansia gratuita, e **"non c'è fretta"** è una delle cinque costanti del progetto. Il ritmo lo danno gli **sblocchi**: *mi mancano 40 monete al progetto della trivella* è un motivo per fare un altro viaggio, *sta per finire il giorno* non lo è.

- 2026-08-12 (notte): **I GIACIMENTI NON SI ESAURISCONO, GLI OSTACOLI SÌ.** Richiesta dell'autore: *"considera anche spazi per le vene di materiali così che magari poi siano punti fissi per l'estrazione dei minerali che poi saranno prima fatti a mano e poi con trivelle."* Ne discendono **tre rapporti diversi con la mappa**, ed è deliberato: gli **ostacoli** (alberi, massi, frane) finiscono, danno una resa una volta e liberano spazio — sgomberare è un lavoro che *finisce*, e finire un lavoro è una soddisfazione; i **giacimenti** non finiscono mai e hanno una **ricchezza** (povero ×0,5 / normale ×1 / ricco ×2, come in Satisfactory) che rende i posti diversi fra loro; il **bosco** dipende da te, perché gli alberi non ricrescono e gli alberelli li ripianti.

  Il giacimento è il **rubinetto** dell'isola: il limite non è quanto ce n'è, è **quanto ne esce al minuto**. Ed è quel tetto che rende la crescita un problema invece che una formalità.

- 2026-08-12 (notte): **LE ISOLE SI APRONO COSTRUENDO, E L'OPERAIO SI SPOSTA CON TE.** Richiesta dell'autore: *"magari con un sistema di isole dove su altre isole sblocco altri minerali per crafting avanzati."* La parte aggiunta in fase di progetto è la seconda metà, ed è la cosa più importante della struttura: **mentre l'operaio è sull'isola B, sull'isola A non succede niente a mano** — vanno avanti solo le macchine.

  Motivo: così la seconda isola non è *"più spazio"*, è **il momento in cui la prima deve saper vivere senza di te**. Automatizzare smette di essere una comodità e diventa **il prezzo del biglietto**, senza che il gioco te lo imponga con un cartello. È l'unica struttura trovata in sei versioni in cui l'automazione è obbligatoria per progredire e resta comunque una scelta tua.

- 2026-08-12 (notte): **LE REGOLE DEL BILANCIAMENTO SONO INVARIANTI, NON GUSTI.** Il prezzo di un prodotto sta fra la somma dei suoi ingredienti e due volte e mezzo quella somma (sotto, lavorare è una perdita; sopra, c'è una sola cosa sensata da fare). Ogni macchina si ripaga fra i 3 e i 30 minuti, o è arredamento e va tolta invece che ritoccata. Mai più di tre ingredienti in una ricetta. Ogni livello ne contiene almeno una che fa **incontrare due catene** — è quello che in Factorio rende interessanti i circuiti e noiose le piastre. Tutto in `docs/MATERIALI.md`, e dove si può è **controllato dal codice all'avvio**.

- 2026-08-12 (sera): **NIENTE SI SPOSTA DA SOLO, E NIENTE RICRESCE DA SOLO.** Parole dell'autore: *"Non voglio pero' che gli alberi crescano da soli, ma quando rompo gli alberi mi fa anche gli alberelli cosi' che io poi possa ripiantarli. Fai in modo che il player ha un inventario proprio alla Minecraft... Cosi' anche per la raccolta non viene messa la roba in automatico in una chest specifica ma seleziono un inventario e poso la roba che voglio lasciare li', cosi' da dare poi anche il senso all'automazione per il trasporto anche degli oggetti dalla fonte alla lavorazione del prodotto."*

  Tre cose tolte di proposito, e sono la stessa cosa: **la ricrescita automatica degli alberi**, **lo scarico automatico nella cassa assegnata**, e **il totale delle risorse dell'isola scritto in alto**. Erano tutte comodita' che risolvevano un problema al posto del giocatore.

  Il ragionamento, che vale anche per tutto quello che verra': **un'automazione vale quanto la fatica che toglie.** Se lo scarico e' gia' automatico all'inizio, il nastro del punto 11 non e' una liberazione, e' un gadget — perche' il problema che avrebbe dovuto risolvere non e' mai esistito. Vale identico per il bosco: se torna da solo, ripiantare non e' una decisione. **Il buco va lasciato aperto perche' l'automazione abbia qualcosa da riempire.**

  Ricerca fatta su **Satisfactory** prima di costruire, come chiesto dall'autore. L'arco e' in tre gradini e il gioco lo tiene per decine di ore: **la mano** (raccogli, e porti tu), **il Portable Miner** (accumula da solo ma **non si puo' collegare a un nastro** — comodita' parziale, di proposito), **il Miner fisso col nastro** (adesso gira senza di te). Ogni gradino toglie un gesto che stavi facendo tu, e nessuno viene regalato. Da li' anche l'inventario a 18 caselle con pile per oggetto, e i buffer piccoli di splitter e merger che fanno tornare indietro la pressione quando a valle si tappa.

  Costo dichiarato e nominato subito: su un telefono spostare pile a mano puo' diventare una noia. Mitigazione scelta: **niente trascinamento**, un tocco per materiale (*Posa Legno 32*), e le pile strette abbastanza da far riempire lo zaino in circa sette alberi — cosi' la fatica e' *"devo andare a svuotarlo"*, non *"devo trascinare otto pile"*.

- 2026-08-12 (sera): **L'inventario e' a caselle, non un numero.** Zaino e casse usano lo stesso modulo: ogni casella tiene una pila di **un materiale solo**. Motivo: fa nascere una domanda che un contatore non puo' fare nascere — **cosa** porto, non solo quanto. Con tutte le caselle occupate ma qualcuna a meta' ci sta ancora dell'altro legno, ma non un solo sasso. Le tasche delle tecnologie si **sommano** (+3, +4), non si moltiplicano: un moltiplicatore sulle caselle darebbe numeri che non si leggono e non si bilanciano.

- 2026-08-12: **UN OPERAIO SOLO, E SI CRESCE SOLO CON LA TECNOLOGIA.** Richiesta dell'autore: *"invece di piu' coloni, mi va bene un singolo solo che esegue le operazioni che gli dico cosi' che all'inizio le cose si fanno piano piano e poi piu' in la ha piu' senso con l'avanzamento delle automazioni e tecnologie."* Motivo di design, ed e' forte: con piu' coloni si cresce **assumendo**, e la tecnologia diventa un di piu'; con uno solo si puo' crescere **solo con la tecnologia**, che e' la forma di Factorio e Satisfactory. E il collo di bottiglia si vede: guardare un operaio solo camminare avanti e indietro *e'* la spiegazione di cosa manca, mentre con cinque il problema si nasconde nella folla. **Costo pagato:** salari e assunzioni, costruiti il giorno prima, sono stati tolti — con uno solo un salario e' una tassa fissa, non una decisione. La pressione torna dove il GDD diceva gia' che dovesse stare: *the factory must grow*, la domanda cresce piu' in fretta della produzione. **Confine da non superare:** l'operaio non e' un personaggio da guidare — niente levetta, gli si danno ordini toccando le cose. E' la stessa distinzione rifiutata tre volte, e resta valida.

- 2026-08-11 (notte): **Roadmap riordinata dopo un post mortem, e nasce la skill `post-mortem`.** Quattro schemi trovati sui sette cambi di rotta: (1) costruire il gioco intero prima di verificare il pezzo centrale, 7 volte su 7; (2) riproporre una cosa gia' rifiutata, 3 volte per il personaggio che cammina; (3) scambiare una reazione estetica per una reazione di design; (4) proporre generi che contraddicevano i vincoli costanti dell'autore, 6 riscritture su 7. Guardrail messi: **le cinque costanti** in `CLAUDE.md` da controllare prima di proporre qualunque genere, e **il registro dei rifiuti** in `td-glossario` con le parole esatte. Tre spostamenti nella roadmap: **salvataggio dal 15 al 5** (senza, nessuno gioca abbastanza a lungo da poter giudicare), **percorso vero dall'11 al 6** (rifare i nastri dopo costa di piu'), e **simulazione headless nuova al 7** (il gioco e' una questione di portata: senza misura si tira a indovinare).

- 2026-08-11 (notte): **NIENTE MAGAZZINO CENTRALE: LE COSE STANNO IN UN POSTO.** Correzione dell'autore: *"una cosa che pero' non voglio e' una sorta di Age of Empires o altro che ha un magazzino principale, ma invece voglio una sorta di inventario, dove le risorse devono essere spostate manualmente all'inizio, magari al colono dire dove scaricare, poi automatizzare con i nastri e altri mezzi di trasporto come in Satisfactory e Factorio o Minecraft tecnico."* Conseguenza: le risorse stanno dentro **casse** con un posto preciso; il bracciante ha uno **zaino piccolo** e quando e' pieno smette di lavorare e va a scaricare; **dove scarica lo decide il giocatore**, bracciante per bracciante; costruire paga davvero prendendo dalle casse. Motivo, ed e' il cuore della cosa: **la distanza costa.** Una cassa vicino al lavoro fa risparmiare tutta la strada, e quella camminata e' la ragione per cui i nastri saranno un sollievo invece che un gadget. Se la roba comparisse in un contatore non ci sarebbe niente da trasportare, e meta' del gioco non esisterebbe.

- 2026-08-11 (sera tardi): **NIENTE SCACCHIERA: UN'ISOLA.** Correzione dell'autore: *"Non voglio questa cosa a scacchiera, voglio stile Stardew Valley, Graveyard Keeper. Un'isola con possibilità di accedere ad altre zone, magari anche che in futuro sbloccare altre zone. E mettere anche un po' di Factorio e Satisfactory."* **La scoperta della ricerca:** Stardew, Graveyard Keeper e Factorio sono tutti a tessere sotto il cofano — Factorio *e'* una griglia. Quello che l'autore rifiutava non era la griglia, era che **sembrasse una scacchiera e non ci fosse un posto dentro cui stare**. Quindi le tessere restano sotto, invisibili, e sopra ci va un'isola. Ne discendono regole di disegno vincolanti: nessun bordo sulle tessere, la variazione del terreno e' una macchia tonda sfalsata e non un quadrato piu' chiaro, e la riva e' una linea chiara dove la terra tocca l'acqua.

- 2026-08-11 (sera tardi): **NESSUN PERSONAGGIO. SI COMANDA COL DITO.** Correzione dell'autore: *"Non vorrei un personaggio ma più da gestionale che col dito comando"*. **E' la terza volta in tre versioni diverse che rifiuta l'omino che si muove** — la prima fu *"non l'omino che si muove"* mesi fa. Non riproporlo mai piu'. Conseguenza di design, ed e' un miglioramento: senza personaggio non c'e' nessuna fatica da sopportare in attesa che qualcuno te la tolga, quindi **il lavoro e' degli altri dal primo minuto** e la domanda diventa subito quella giusta: *quanta gente mi serve, e a fare cosa?*

- 2026-08-11 (sera tardi): **Un bracciante, un mestiere. Niente griglia di priorita'.** In RimWorld ogni colono ha priorita' da 1 a 4 per ogni tipo di lavoro: e' la parte piu' profonda di quel gioco ed e' anche un foglio di calcolo, illeggibile su un telefono con un dito. E ne nasce un difetto documentato — col trasporto a priorita' alta i coloni attraversano tutta la mappa per un oggetto solo, e il giocatore non capisce perche' nessuno stia lavorando. Qui se il legno non arriva basta guardare: **hai un taglialegna solo**.

- 2026-08-11 (sera tardi): **Due livelli di zoom, non la zoomata continua.** Domanda posta all'autore fra verticale a una mano, orizzontale a due mani, e verticale con la possibilita' di allontanare. Risposta: **verticale con l'allontanamento**. Il pizzico continuo su uno schermo stretto e con un pollice solo si perde subito: due livelli, uno per lavorare e uno per guardare tutta l'isola.

- 2026-08-11 (sera tardi): **Le zone si aprono costruendo, non trovando una chiave.** E' il modo di Graveyard Keeper. Aprire una zona non e' "piu' spazio": **porta una materia prima nuova e un ramo di lavorazioni nuovo**.

- 2026-08-11 (sera tardi): **"The factory must grow" e' il motore.** Dritto da Factorio: la domanda di roba basilare deve crescere sempre piu' in fretta di quanto si riesca a produrre. Commesse e costruzioni devono chiedere piu' di quanto la fattoria dia. Se un giorno si ha abbastanza di tutto, il gioco e' finito. E la gioia vera del genere, secondo tutta la ricerca, e' una sola: **vedere il sistema funzionare da solo mentre si guarda da un'altra parte**.

- 2026-08-11 (sera): **NON È UN PUZZLE GAME, È UN FARMER.** Correzione dell'autore: *"Non vorrei però un puzzle game, vorrei più un farmer. Dove trovo i semi o li compro, poi devo fare obiettivi o vendere per comprare altro. Non dev'essere facile poter mettere tutti i semi subito. Poi piano piano diventa questo step più facile."* Riferimenti citati: **Stardew Valley, Minecraft moddato tecnico, RimWorld.** Conseguenza: **la scarsità si sposta dallo spazio ai semi e ai soldi.** Piantare consuma un seme; all'inizio non puoi riempire il campo neanche volendo; vendendo, quel problema si scioglie da solo.

- 2026-08-11 (sera): **Tolte le vicinanze a moltiplicatore (Filare e Rotazione).** Erano regole nate per fare un puzzle di incastro, ed erano state costruite il giorno stesso. **Resta solo l'acqua**, perché irrigare è agricoltura e si capisce senza spiegazioni. Motivo: i veri problemi di disposizione arriveranno dalle macchine — cosa alimenta cosa, dove sta il magazzino — e nasceranno dalla simulazione invece che da regole inventate. È il modo dei modpack tecnici di Minecraft, ed è documentato come la cosa che li tiene vivi per centinaia di ore: avanzare costringe a rifare pezzi di base.

- 2026-08-11 (sera): **Prima i braccianti, poi le macchine.** Domanda posta all'autore fra braccianti a salario, macchine soltanto, ed entrambi in sequenza. Risposta: **entrambi in sequenza**, accettando che sia il doppio del lavoro. I braccianti fanno un mestiere in una zona e si pagano ogni giorno; le macchine arrivano dopo, costano molto di più subito e niente dopo. Motivo: fa nascere una decisione economica che non smette mai — **assumo, o compro la macchina?** — che dipende da quanto pensi di durare su quella coltura e da quanti soldi hai adesso.

- 2026-08-11 (sera): **La fattoria ha spese fisse ogni giorno.** Manutenzione per casella arata, salari per chi hai assunto. Motivo: è quello che rende difficile l'inizio, come chiesto, e che tiene viva ogni decisione di espansione — senza, allargarsi sarebbe sempre la mossa giusta e non ci sarebbe partita. **Non si perde comunque mai:** se non riesci a pagare, i braccianti se ne vanno e le caselle tornano incolte, la fattoria si rimpicciolisce e riparti.

- 2026-08-11 (sera): **Il giorno è il battito del gioco.** Dura pochi minuti; a fine giornata si pagano le spese, i prezzi si muovono, ogni tanto succede qualcosa, e un riepilogo dice cosa è successo. Motivo: è il meccanismo del *"vabbè, ancora un giorno"*, documentato come il motore vero dell'engagement di Stardew — ogni giornata avvicina in modo visibile a qualcosa che si vuole.

- 2026-08-11 (mattina, superata in parte): **IL GIOCO È UNA FATTORIA COZY SU GRIGLIA, CON MINERALI, TECNOLOGIE E AUTOMAZIONI.** Abbandonato il tower defense a reclute. Motivo, nelle parole dell'autore: *"quello fatto adesso sembra molto noioso da vedere e giocare"*. Motivo di design: in ogni versione precedente l'autore aveva chiesto le stesse tre cose — **un gioco poco impegnativo ma bello da giocare, nessun riflesso da usare, e che contino le scelte** — e il tower defense le contraddiceva, perché a quel genere serve tensione. Il cozy farming con automazioni è il genere costruito esattamente su quei tre vincoli. È il primo pivot in cui genere e desiderio coincidono invece di combattersi.

- 2026-08-11: **Lo spazio è la risorsa scarsa, e le vicinanze sono il gioco.** Ogni cosa occupa una casella; quello che metti vicino a cosa cambia quanto rende; alcune vicinanze premiano la monocoltura e altre la varietà, e sulla stessa griglia non puoi avere entrambe. Motivo: è l'unico modo trovato per dare una **decisione vera senza chiedere riflessi**, e per rendere il gioco **bello da guardare** — una fattoria ben incastrata si riconosce a colpo d'occhio. Costo dichiarato: se piazzare non è soddisfacente, nessuna quantità di contenuto salva il gioco. Per questo è la verifica obbligatoria del punto 2.

- 2026-08-11: **L'automazione occupa una casella.** Lo spaventapasseri ruba un quadrato al grano. Motivo: è la risposta al difetto documentato del genere — *quando tutto è automatico non hai più niente da fare*. Facendo costare caselle l'automazione, automatizzare diventa esso stesso una decisione di piazzamento, e la griglia non è mai "risolta" una volta per tutte.

- 2026-08-11: **Il tempo scorre mentre guardi.** Domanda posta all'autore fra tempo reale offline, tempo compresso, e tempo reale accelerabile. Risposta: **tempo compresso**, un giorno dura pochi minuti mentre l'app è aperta; a app chiusa la fattoria produce più piano e fino a un tetto. Motivo: col tempo reale puro il gioco è ingiocabile in una sessione — apri, raccogli, chiudi, e non c'è niente da guardare. Il tetto offline serve perché **riaprire sia sempre premiato ma aspettare non sia mai la strategia migliore**.

- 2026-08-11: **Scavare resta manuale a lungo, ed è l'unica cosa attiva del gioco.** Domanda posta all'autore fra scavo manuale, nessuna azione, e raccolta manuale. Risposta: **lo scavo**. Motivo: è il gesto che tiene le mani sullo schermo quando tutto il resto va da solo, è gentile (nessun tempo di reazione, nessun errore possibile, si smette a metà), ed è il ponte fra le due catene — colture automatiche, minerali a mano. Automatizzarlo arriva tardi apposta: è uno sblocco desiderabile proprio perché rinunci a qualcosa che ti piaceva fare.

- 2026-08-11: **Non si può perdere.** Nessun fallimento, nessun timer che scade, niente che marcisce se non torni. Motivo: è la definizione di cozy, ed è il vincolo che l'autore ha tenuto costante in tutte le versioni senza mai nominarlo.

- 2026-08-11: **Si resta sul web (Vite + React + canvas), niente Godot.** Decisione confermata dal progetto precedente e ancora più valida qui: una griglia 2D non ha bisogno di un motore. Il motivo che pesa di più resta **come l'autore prova il gioco** — un link che si apre sul telefono due minuti dopo la modifica.

---

## Archivio — le versioni morte

Le voci qui sopra datate **2026-08-11 o prima** appartengono in parte a generi abbandonati (il tower defense a reclute, la fattoria a scacchiera, il puzzle di vicinanze). **Non sono state cancellate di proposito:** dicono *perché* una strada è stata lasciata, ed è l'unica cosa che impedisce di riproporla fra tre settimane.

Quando leggi una voce vecchia, controlla la data prima di agire.
