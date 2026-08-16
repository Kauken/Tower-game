# Interfaccia e inventario su telefono — ricerca

> **Copia di lavoro verificata.** `docs/PROGETTI.md` c'è, `docs/GDD.md` è la v7.1 e parla dell'isola e dell'operaio, non di torri. Non ho dovuto fare nessun `git checkout`. Ho letto il codice vero: `src/ui/Zaino.jsx`, `Cruscotto.jsx`, `Pannelli.jsx`, `CampoDiGioco.jsx`, `Bottone.jsx`, `src/game/disegno.js` e `config/motore.json` → `interfaccia`.

> **Come leggere i numeri.** **[citato]** = viene da una fonte (linea guida ufficiale, devlog, forum). **[derivato]** = l'ho calcolato io dal nostro codice. **[stimato]** = è un mio giudizio.

---

## In una riga

> **Le caselle non dicono cosa contengono.** Oggi una casella è un pallino colorato da 11 px e un numero: per sapere che quel verde è "legno" devi già saperlo. **Metti un'icona riconoscibile dentro ogni casella** — la stessa sagoma che già disegni sull'isola — e metà del "non si capisce niente" sparisce prima di toccare qualunque altra cosa.

Il resto del documento è la seconda, terza e quarta cosa. Ma questa è la prima, e da sola vale più delle altre messe insieme.

**E non è solo una questione di gusto: è la regola scritta.** La linea guida di accessibilità WCAG 1.4.1 dice che *"il colore non deve essere l'unico mezzo visivo per trasmettere un'informazione"* **[citato]**, e la ragione è che **1 uomo su 8** ha la forma comune di daltonismo rosso-verde **[citato]**. Il nostro pallino colorato è **esattamente** il caso vietato: colore e basta. La cura indicata è sempre la stessa — **aggiungere una forma, un'icona o una scritta**.

Il gioco più citato per la leggibilità istantanea, **Mini Metro**, fa proprio questo: usa **forme diverse oltre ai colori** per distinguere e raggruppare le stazioni, e ha anche una modalità per daltonici **[citato]**.

---

## 1. Cosa abbiamo davvero, misurato

Numeri presi dal codice, non a occhio. Telefono di riferimento: **360 × 780 px CSS** (Android medio; iPhone SE = 375 × 667, iPhone 15 = 393 × 852).

| Pezzo | Dov'è | Misura vera | Giudizio |
| --- | --- | --- | --- |
| Casella dello zaino | `Zaino.jsx` | **40 × 40 px** massimo, **ed è premibile** | **[derivato]** Sotto il minimo di Apple (44) e di Google (48). E il nostro `motore.json` dice `altezza_minima_tocco: 64`: ci contraddiciamo da soli |
| Pallino del materiale | `Zaino.jsx` → `Casella` | **11 × 11 px**, solo colore | Undici pixel di colore non sono un nome. È il buco principale |
| Numero della quantità | `Zaino.jsx` | **13 px**, sotto il pallino | Il problema non è il numero: è che non si sa di *cosa* |
| Griglia di una cassa | `Pannelli.jsx` → `Griglia` | 6 colonne fisse → **≈ 48 px** per casella su schermo da 360 | **[derivato]** Misura giusta per guardare. Ma **non è premibile** (`pointerEvents: none`): è solo un disegno |
| Pastiglie "Posa / Prendi" | `Pannelli.jsx` → `Sposta` | `flex: 1 1 40%` → **2 per riga**, alte **48 px** | Misura giusta. Ma sono un **secondo elenco** che ripete quello che la griglia sopra ha già mostrato |
| Schede Cassa/Banco/Progetti | `Pannelli.jsx` → `Schede` | alte **42 px** | **[derivato]** Sotto i 44 di Apple. Due pixel, ma è la riga che si sbaglia più spesso |
| Il foglio | `Pannelli.jsx` → `Foglio` | al massimo **100vh − 250 px** ≈ **530 px su 780** = **68 % dello schermo**, staccato **88 px** dal fondo | **[derivato]** Non copre "quasi tutto", ma **non oscura niente dietro**, **non si trascina**, **non si chiude con un gesto**: solo col bottone in fondo, che se la lista è lunga è fuori schermo |
| Riga dell'operaio | `Cruscotto.jsx` | testo **13 px**, colore debole | La cosa più importante del gioco ("che sta facendo") è scritta più piccola di tutto |
| Progetti | `Pannelli.jsx` | lista verticale di riquadri **disabilitati** | Dice *"prima devi fabbricare: X"*, ma **non dice mai quanto materiale ti manca** |
| Macchina sull'isola | `disegno.js` | pallino di stato, lama che gira solo quando lavora, fiamma, barretta del cassetto pieno | **Questa parte è già fatta bene.** È il pezzo migliore dell'interfaccia |

**La frase che riassume tutto:** *l'isola racconta più cose del pannello.* Sul canvas una macchina ha lama che gira, fiamma, pallino di stato e barra del pieno. Nello zaino un materiale ha un pallino da 11 px. Il disegno del gioco è avanti; l'interfaccia è indietro.

---

## 2. Le sette domande

### 2.1 Il foglio che copre tutto — è la scelta giusta?

**Sì come forma, no come è fatto adesso.**

Il foglio che sale dal basso (*bottom sheet*) è il pattern standard su telefono in verticale, e lo raccomandano sia Material sia Apple. Il motivo è la **zona del pollice**: la mano divide lo schermo in verde (basso e centro: ci si arriva senza sforzo), giallo (metà e lati: ci si stira), rosso (angoli in alto: non ci si arriva) **[citato, Parachute Design / Elaris]**. Un pannello che nasce in basso nasce già nel verde.

Quello che ci manca rispetto allo standard:

| Cosa manca | Cosa dice la linea guida |
| --- | --- |
| Maniglia da trascinare | Material: la maniglia porta il foglio fra posizioni di aggancio; oltre **500 px/s** di velocità si apre o si chiude **[citato]**. Apple la chiama *grabber*: una barretta orizzontale in alto, e **toccandola si passa da un'altezza all'altra** **[citato, Apple HIG]** |
| Due altezze invece di una | Apple definisce due fermate: **medium** ≈ metà, **large** = tutto lo schermo. La medium serve a mostrare le cose più utili senza dover ingrandire **[citato, Apple HIG]** |
| Sfondo scurito | Material: un foglio modale **blocca** il contenuto dietro e va toccato o chiuso **[citato]**. Da noi resta tutto acceso e uguale, quindi non si capisce di essere "dentro" qualcosa |
| Chiusura a gesto | Material: si chiude toccando fuori o scorrendo giù **[citato]**. Da noi solo il bottone "Chiudi", che sta in fondo a un contenuto che scorre |

E la conferma dal campo: di **Sandship** (gioco di fabbrica per telefono, dagli autori di Deep Town) i giocatori dicono che *"non è sempre ovvio come passare da una schermata all'altra, e da alcune finestre che si aprono è difficile tornare indietro"* **[citato]**. Esattamente il nostro difetto: un pannello che si apre facile e si chiude difficile.

**Verdetto:** il foglio si tiene. Gli mancano quattro cose, e tre sono banali (maniglia, sfondo scurito, tocco fuori per chiudere). La quarta — **due altezze** — è quella che risolve il caso vero: la cassa vuole mezzo schermo, i Progetti lo vogliono tutto.

### 2.2 L'inventario a caselle su schermo piccolo

Misure minime di riferimento:

| Fonte | Minimo | Nota |
| --- | --- | --- |
| Apple HIG | **44 × 44 pt** per ogni controllo | **[citato]** |
| Material Design | **48 × 48 dp** | **[citato]** |
| WCAG 2.5.5 | 44 × 44 px | **[citato]** |

Su schermo da 360 px, con i nostri margini (12 di pagina + 12 di padding per lato) restano **312 px utili**. Da lì **[derivato]**:

| Colonne | Casella | Verdetto |
| --- | --- | --- |
| 4 | ≈ 72 px | Comodissima, ma si vede poco |
| **5** | **≈ 57 px** | **Il punto giusto per caselle da toccare** |
| 6 | ≈ 48 px | Al limite esatto di Material. Bene per guardare, teso per toccare |
| 7 | ≈ 40 px | Sotto il minimo. Da non fare |
| 8 | ≈ 34 px | Da non fare |

La nostra griglia sta a **6** (≈ 48 px): giusta finché **guardi**, stretta appena diventa **premibile**. Lo zaino sta a **40 px** ed è già premibile oggi: quello è un errore misurabile, non un'opinione.

**Come si legge la quantità, dagli altri:** icona grande al centro, **numero in basso a destra della casella**, con contorno o ombra, **sopra** l'icona. È la convenzione di Minecraft e Terraria, quella che i giocatori riconoscono senza spiegazioni. Da noi il numero sta **sotto** un pallino: la casella non sembra una casella d'inventario, sembra un bottone generico.

**La lamentela ricorrente, con nome e cognome:** su Terraria mobile 1.3 i giocatori hanno scritto che ci sono *"troppi bottoni troppo piccoli"*, che il menù è *"estremamente affollato"*, e hanno chiesto esplicitamente **icone più grandi** e **la fabbricazione separata dagli oggetti** **[citato, forum Terraria]**.

### 2.3 Spostare roba fra due contenitori col dito

**Buona notizia: la nostra scelta di base è quella giusta.** I devlog difendono il tocco, non il trascinamento.

Il devlog di **Terraria mobile** (David Welch, tre parti su Medium) racconta il problema esatto: distinguere *"trascino un oggetto col dito"* da *"faccio scorrere la lista"* è costato iterazioni, e la soluzione finale è stata **un ritardo di una frazione di secondo** fra il tocco e la presa dell'oggetto **[citato]**. Cioè: il trascinamento su telefono funziona solo se ci metti sopra una toppa, e la toppa rallenta tutto.

Lo stesso devlog dice che, una volta separati inventario / fabbricazione / cassa su schermate diverse, il problema che resta è proprio **come sposti la roba da una schermata all'altra** **[citato]**. È il nostro problema, identico.

Le lamentele su **Minecraft Bedrock/Pocket** sono le più istruttive, perché contengono tutte e due le facce:

- Contro il **tocco**: *"servono tanti tocchi per gestire l'inventario"*; passare da un oggetto all'altro nella barra rapida è *"lentissimo"* **[citato, Minecraft Feedback]**.
- Contro il **trascinamento**: quando trascini *"non si vedono chiaramente le quantità"* **[citato]**.
- E la funzione che tutti danno per scontata: il **doppio tocco che sposta l'oggetto dall'altra parte** — quando l'hanno cambiata, i giocatori si sono lamentati **[citato]**.

**Il gesto vincente non è né trascinare né "seleziona poi posa": è un tocco solo sulla casella che manda la pila dall'altra parte** (lo *shift-click* di Minecraft, il *quick-move*). Un tocco, zero ambiguità, funziona con un pollice solo, e non ha bisogno di un secondo elenco di bottoni.

**Sui gesti nascosti (tieni premuto, scorri):** il problema documentato è la **scopribilità**. *"Non c'è quasi mai un segnale che dica che serve un tocco lungo: non è intuitivo. Senza istruzioni o segnali visivi, l'utente non sa nemmeno che quell'interazione esiste"* **[citato]**. Se metti un tocco lungo (es. "sposta metà pila"), va sempre **raddoppiato** con un comando visibile.

**Sul "Posa tutto" che abbiamo già:** esiste una versione più intelligente, ed è una convenzione consolidata (Stardew Valley, Palworld, Valheim, Enshrouded). Si chiama **quick stack**: un bottone solo che **posa nella cassa solo la roba di cui la cassa ha già una pila**, e ti lascia addosso il resto **[citato]**. Da noi "Posa tutto" svuota l'operaio senza distinguere, e quindi è un bottone che a volte fa un danno — e chi ci si è bruciato una volta non lo tocca più. La versione "posa quello che già c'è dentro" è più utile e non ha controindicazioni.

**Verdetto:** trascinare no. Le nostre pastiglie sì, ma **duplicano la griglia**: vedi le stesse cose due volte, e la seconda con un verbo davanti. La strada standard è **rendere premibile la griglia stessa**.

### 2.4 Far capire cosa fa una macchina senza aprire niente

**Questa parte da noi è già buona, ed è la cosa da non toccare.** Da `disegno.js`: pallino di stato colorato, lama che gira *solo quando lavora* e resta ferma dov'era quando si ferma, fiamma che guizza, barretta del cassetto d'uscita che si riempie. È esattamente quello che fanno i giochi di fabbrica: **il movimento è l'informazione**, e la macchina ferma si riconosce perché è ferma, non perché lo dice una scritta.

Quello che manca: **cosa entra e cosa esce non si vede mai dall'isola.** Devi aprire il pannello per sapere se quella è una segheria o una fornace. Il pattern standard (Sandship, Factorio, e tutti i giochi di catena) è mostrare **l'icona del materiale in uscita** sopra o dentro l'edificio, così la catena si legge guardandola.

Nota dai giocatori di Sandship, che vale come avvertimento: *"se attacchi un'alimentazione che pesca dal magazzino, tutto l'impianto si blocca quando quella risorsa finisce"* **[citato]** — cioè il problema vero delle macchine non è aprirle, è **accorgersi che si sono fermate**. Il pallino di stato sull'isola è la risposta giusta; semmai va reso più visibile (pulsa, non solo colore).

### 2.5 Le schede (Cassa / Banco / Progetti) dentro un pannello

**Su telefono le schede sono la scelta debole, e la ricerca è netta.**

- Nielsen Norman Group: le schede **nascondono tutto tranne la scheda attiva**, e questo porta gli utenti a **non accorgersi di informazioni importanti** **[citato]**.
- Sempre NN/g: **le schede vanno bene per poche sezioni lunghe; le "fisarmoniche" (sezioni che si aprono e chiudono in colonna) per molte sezioni corte** **[citato]**.
- E il punto decisivo: **le fisarmoniche funzionano meglio delle schede su telefono**, perché seguono lo scorrimento verticale naturale e non hanno niente che sborda di lato — **tanti framework convertono da soli le schede desktop in fisarmoniche su telefono** **[citato, NN/g e LogRocket]**.

Da noi il caso è **misto**: tre sezioni, ma una di esse (Progetti) è lunga. E abbiamo già la toppa giusta — **il pallino sulla scheda quando c'è qualcosa da fare lì dentro** — che è esattamente la contromisura al "contenuto nascosto". Il codice lo dice anche nel commento: *"senza, una scheda chiusa è una cosa che non esiste"*.

**Verdetto:** con tre voci e i pallini, le schede reggono. Ma sono da alzare a **≥ 44 px** e da **etichettare meglio**: "Banco" e "Progetti" non dicono cosa ci trovi. E c'è un errore concettuale: **la Cassa del casotto è una cosa, il Banco e i Progetti sono un'altra**. Metterli sotto lo stesso pannello con tre schede pari è quello che Terraria ha fatto e i giocatori hanno chiesto di **separare** **[citato]**.

### 2.6 L'albero delle tecnologie su schermo piccolo

**La lista verticale che abbiamo è la scelta giusta, e c'è una fonte che lo dice esplicitamente:** *"le strutture ad albero vanno in generale evitate su telefono, perché caricano troppo la testa su una superficie piccola. Però aggiungere icone e testo ai nodi padre e figlio aiuta a creare contrasto visivo e a far vedere meglio la gerarchia"* **[citato, Mobbin]**.

Quindi: **non fare un albero disegnato con le linee.** Tenere la lista. Aggiungere due cose:

1. **Icone** sui riquadri (di nuovo: la stessa sagoma dell'isola).
2. **Dire cosa manca, in numeri.** Qui la convenzione è consolidata:
   - Stardew Valley: le ricette che conosci sono **a colori pieni**, quelle a cui mancano ingredienti sono **sbiadite in grigio** **[citato]**.
   - Convenzione diffusa: **l'ingrediente che non hai è scritto in rosso** **[citato]**.
   - E la forma più utile su telefono è il rapporto **"hai / ti serve"**: *legno 3/8*. Da noi oggi il costo è scritto come **"4 legno, 6 chiodo"** senza dire quanto ne hai: leggerlo non ti dice se puoi. **[derivato dal nostro codice: `costoRicetta()` in `Pannelli.jsx`]**

Il nostro pannello Progetti dice *"prima devi fabbricare: Ascia affilata"*: questo è **il gradino giusto**, ma si ferma a metà. Dopo "cosa devi fabbricare" serve **"e ti mancano 5 tavole"**, altrimenti il giocatore sa dove andare ma non quanto è lontano — ed è proprio l'attesa misurabile che fa tornare.

### 2.7 I tre errori più comuni

**1. Trattare il telefono come un desktop rimpicciolito.**
È l'errore numero uno citato ovunque, e Terraria mobile 1.3 è il caso da manuale: hanno rifatto l'interfaccia *"più simile alla versione desktop"*, e i giocatori l'hanno bocciata — troppi bottoni, troppo piccoli, menù affollato **[citato]**. Stesso tipo di lamentela su Mindustry mobile: interfaccia *"goffa e a volte non reattiva"*, tocchi che devono essere *"precisi"*, e comandi da desktop (tenere premuto CTRL per far pathfinding ai nastri) **senza un equivalente chiaro su telefono** **[citato]**.

**2. Bottoni e testi troppo piccoli, e troppo vicini.**
*"Testo troppo piccolo per uno schermo di telefono, bottoni troppo piccoli per essere toccati con precisione, e un HUD che copre troppa parte dell'azione"* è la terna citata come classica **[citato]**. E il rovescio: mettere due comandi diversi troppo vicini nella zona del pollice fa premere quello sbagliato. Su Stardew Valley mobile succede letteralmente: *"è facile scegliere per sbaglio un oggetto dall'inventario mentre stai solo cercando di navigare, e finire per regalarlo a un abitante"* **[citato]**.

**3. HUD troppo pieno, e niente rivelazione progressiva.**
*"Un'interfaccia gonfia di indicatori, icone, suggerimenti e bottoni lampeggianti è brutta quanto una che non dà nessuna informazione utile"* **[citato]**. La cura citata è la **rivelazione progressiva**: mostrare solo quello che serve nel momento in cui serve. Su questo noi siamo già in buona posizione — niente orologio, niente monete, niente totale dell'isola — e c'è scritto nei commenti del `Cruscotto.jsx` il perché. **Da non perdere aggiungendo icone e barre.**

*(Errore bonus, quarto ma quasi altrettanto comune: **il tutorial che sparisce troppo in fretta** e lascia il giocatore a indovinare i comandi **[citato]**.)*

**Un avvertimento che ci riguarda da vicino: il mirino che va dove vuole lui.**
Nella recensione di **Forager** su TouchArcade: *"a volte il mirino è imprevedibile negli spazi stretti: se c'è qualunque altra cosa lì vicino — una risorsa o un edificio — il cursore ci si aggancia e ti impedisce di piazzare"* **[citato]**. E su Forager si legge anche che **l'interfaccia e i menù non stanno negli schermi piccoli** **[citato, Pocket Gamer]**.

Il primo dei due è il rischio esatto della nostra "mano": prendi una cosa in mano, tocchi l'isola, e il tocco viene mangiato dall'albero che sta a fianco. Se capita, non si legge come "ho sbagliato mira": si legge come "il gioco è rotto". Vale la pena verificarlo con la mira (`disegnaMira` in `disegno.js`) su un albero e una cassa vicini.

---

## 3. Cosa abbiamo / cosa fanno gli altri / cosa cambierei

| Pezzo nostro | Cosa abbiamo | Cosa fanno gli altri | Cosa cambierei |
| --- | --- | --- | --- |
| **Casella (zaino e griglia)** | Pallino colorato 11 px + numero **sotto** | Icona grande dell'oggetto, numero **in basso a destra** con contorno (Minecraft, Terraria) | **Icona al posto del pallino** (riusa `sagome.js`), numero in basso a destra |
| **Zaino in alto** | Caselle 40 px premibili, in alto | Barra rapida **in basso**, nel verde del pollice | Tenere in alto (la scelta è motivata: sotto si preme per sbaglio) ma **portare le caselle a ≥ 44 px** |
| **Griglia di una cassa** | 6 colonne, ≈ 48 px, **non premibile** | Casella premibile: **un tocco = sposta la pila dall'altra parte** (shift-click / doppio tocco di Minecraft) | **Rendere la griglia premibile**, 5 colonne (≈ 57 px) |
| **Pastiglie Posa/Prendi** | Secondo elenco, 2 per riga, ripete la griglia | Non esistono: l'azione sta sulla casella | **Toglierle** quando la griglia diventa premibile. Tenere solo "Posa tutto / Prendi tutto" |
| **"Posa tutto"** | Svuota l'operaio, tutto | *Quick stack*: posa **solo quello di cui la cassa ha già una pila** (Stardew, Palworld, Valheim) | Cambiarlo in "Posa quello che c'è già qui". Più utile, e non ti frega mai |
| **Il foglio** | Un'altezza sola, sfondo non scurito, si chiude solo col bottone in fondo | Due fermate (metà / pieno), maniglia in alto, sfondo scurito, si chiude scorrendo giù o toccando fuori | **Maniglia + sfondo scurito + tocco fuori per chiudere.** Poi le due altezze |
| **Bottone "Chiudi"** | In fondo, dentro il contenuto che scorre | **Ancorato in alto** al foglio, sempre visibile | Spostarlo in cima al foglio, fisso |
| **Schede Cassa/Banco/Progetti** | 3 schede da 42 px con pallino | Su telefono si preferisce la fisarmonica; le schede nascondono | **Alzare a ≥ 44 px** e tenerle (i pallini compensano). A tendere: separare la Cassa dal Banco |
| **Riga dell'operaio** | Testo 13 px, colore debole | Lo stato del personaggio è la riga più grande dell'HUD | **Portarla a `testo_normale` (15)** e darle un pallino di stato colorato come le macchine |
| **Progetti** | Lista di riquadri, dice cosa devi fabbricare prima | Icona + **"hai / ti serve"** (3/8), sbiadito se non puoi, rosso su ciò che manca | **Aggiungere "ti mancano N di X"** e le icone |
| **Ricette al Banco** | Costo scritto "4 legno, 6 chiodo" | Stesso costo ma con **quanto ne hai**: "legno 3/4" | Scrivere il costo come **hai/serve** |
| **Macchina sull'isola** | Pallino stato, lama che gira, fiamma, barra del pieno | Uguale, **più l'icona di ciò che produce** sopra l'edificio | Aggiungere l'icona del prodotto. **Il resto non toccarlo: è la parte migliore** |
| **Macchina, pannello** | Stato, barra, Entra, pastiglie, Esce, pastiglie, Posa tutto, Prendi tutto, Chiudi | Una riga sola: entra → macchina → esce, con le icone | Con la griglia premibile il pannello si accorcia da solo di circa metà |

---

## 4. Cosa cambia da noi

### Da fare (nessuna decisione aperta, è solo lavoro)

1. **Icone nelle caselle.** Il pallino da 11 px diventa la sagoma del materiale. Le sagome esistono già in `src/game/sagome.js` per il canvas: vanno riusate nell'interfaccia. **Questa è la modifica singola che cambia di più**, ed è anche l'unica che ripara una violazione di accessibilità vera (WCAG 1.4.1, colore da solo).
2. **Numero in basso a destra della casella**, non sotto l'icona.
3. **Caselle dello zaino da 40 a ≥ 44 px**, e schede da 42 a ≥ 44 px. Sono due numeri in `motore.json` e un `maxWidth` in `Zaino.jsx`, ma sono l'unico punto dove violiamo la nostra stessa regola scritta.
4. **Bottone "Chiudi" in cima al foglio, fisso.** Oggi se il contenuto è lungo il modo di uscire è fuori schermo.
5. **Sfondo scurito dietro il foglio, e tocco fuori per chiudere.**
6. **Riga dell'operaio più grande**, con pallino di stato colorato uguale a quello delle macchine.
7. **"Ti mancano N di X"** nei Progetti e nelle ricette del Banco, al posto del solo costo.
8. **"Posa tutto" diventa "posa quello che c'è già qui"** (il *quick stack*). È una riga di logica, e toglie l'unico bottone del gioco che ti può fregare.

### Da decidere (una scelta di design, non solo lavoro)

9. **La griglia diventa premibile e le pastiglie Posa/Prendi spariscono?**
   È il cambio più grosso, ed è la strada che tutti seguono: un tocco sulla casella sposta la pila dall'altra parte. Il pannello si dimezza. Ma cambia il gesto che il giocatore ha già imparato, e va deciso una volta sola. **Sconsiglio di farlo insieme alle icone**: prima le icone, si prova, poi questo.
10. **Il foglio a due altezze** (metà per la cassa, pieno per i Progetti). Utile, ma è la cosa più costosa dell'elenco, e va dopo tutto il resto.
11. **Separare il Banco dalla Cassa** invece di tenerli a schede. Terraria ha fatto l'errore opposto e i giocatori hanno chiesto la separazione. Ma da noi il casotto *è* il posto dove si fabbrica, quindi la scheda ha un senso di finzione. Da valutare col GDD in mano.

### Da valutare, ma non adesso

12. Icona del prodotto sopra la macchina sull'isola. Bello, ma è grafica in più su un canvas già pieno.
13. Il pallino di stato della macchina che **pulsa** quando è ferma, invece di stare fermo colorato.
14. **Provare la mira con due cose vicine** (un albero a fianco di una cassa) e verificare che il tocco non venga rubato dalla cosa sbagliata. È il difetto documentato di Forager, e il nostro sistema della "mano" è esposto allo stesso rischio.

### Cosa NON fare

- **Non mettere il trascinamento.** È la cosa che sembra ovvia e che i devlog hanno pagato cara: serve un ritardo per distinguerlo dallo scorrimento, e con la nostra griglia dentro un foglio che scorre sarebbe un pasticcio garantito.
- **Non fare un albero disegnato per i Progetti.** La fonte è esplicita: gli alberi su telefono caricano troppo. La lista verticale è già la risposta giusta.
- **Non toccare il disegno delle macchine sull'isola.** È il pezzo che funziona.
- **Non aggiungere numeri o barre "utili" al cruscotto.** Il `Cruscotto.jsx` spiega nei commenti perché non c'è l'orologio, non ci sono le monete e non c'è il totale dell'isola: sono scelte di design, non dimenticanze, e l'errore n. 3 della lista è proprio riempire l'HUD.
- **Non mettere niente dietro un "tieni premuto"** senza un comando visibile che faccia la stessa cosa.

---

## 5. Quello che NON ho trovato

- **Numeri in pixel dai giochi.** Nessuna fonte pubblica dice "Minecraft PE usa caselle da N px". I numeri per colonna in questo documento sono **calcolati sulla nostra larghezza reale**, non copiati.
- **Un devlog di shapez mobile sull'interfaccia.** Esiste la versione per telefono e dicono di averla "ridisegnata con cura", ma non ho trovato un devlog che spieghi come. L'unica cosa concreta trovata è una lamentela: *"ci vuole tantissimo tempo per costruire qualcosa con l'interfaccia touch"*.
- **Fonti su Pocket City, Idle Factory ed Egg Inc.** Non ho trovato materiale di sostanza sulla loro interfaccia, solo pagine di negozio. Non li ho usati per non riempire il documento di aria. Forager e Mini Metro invece li ho trovati e sono nel testo.
- **Numeri su quanti tocchi servono** per spostare un oggetto nei giochi di riferimento. Le lamentele dicono "troppi", nessuno conta.
- **Reddit**: bloccato, non provato.
- **La misura esatta della maniglia** dei fogli Material (l'altezza in dp non compare nella documentazione che ho raggiunto). Ho solo la soglia di velocità (500 px/s) e la descrizione Apple del *grabber*.
- **Nessuna prova diretta** che la nostra ipotesi "5 colonne invece di 6" sia migliore: la misura in pixel è certa, il giudizio su quante caselle mostrare a schermo no. Va provato.

---

## Fonti

**Linee guida ufficiali**
- Apple — *Sheets*, Human Interface Guidelines: https://developers.apple.com/design/human-interface-guidelines/components/presentation/sheets/
- Apple — *Customize and resize sheets in UIKit*, WWDC21: https://developer.apple.com/videos/play/wwdc2021/10063/
- Material Design — *Sheets: bottom*: https://m2.material.io/components/sheets-bottom
- Material Components Android — *BottomSheet*: https://github.com/material-components/material-components-android/blob/master/docs/components/BottomSheet.md

**Misure di tocco e accessibilità**
- TetraLogical — *Foundations: target sizes*: https://tetralogical.com/blog/2022/12/20/foundations-target-size/
- LogRocket — *All accessible touch target sizes*: https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/
- W3C — *Understanding Success Criterion 1.4.1: Use of Color*: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html
- Access Guide — *Don't use color alone to convey information (colorblind)*: https://www.accessguide.io/guide/colorblind

**Schede e fisarmoniche**
- Nielsen Norman Group — *Accordions on Mobile*: https://www.nngroup.com/articles/mobile-accordions/
- Nielsen Norman Group — *Tabs, Used Right*: https://www.nngroup.com/articles/tabs-used-right/

**Devlog e forum dei giochi**
- David Welch — *The making of Terraria mobile, Part 2 — Touch controls*: https://medium.com/@watsonwelch/the-making-of-terraria-mobile-part-2-touch-controls-706cbdc61d64
- David Welch — *The making of Terraria mobile, Part 3 — Crafting a new UI*: https://medium.com/@watsonwelch/the-making-of-terraria-mobile-part-3-crafting-a-new-ui-4fb84708c767
- Terraria Community Forums — *Mobile: the movement controls suck*: https://forums.terraria.org/index.php?threads/the-movement-controls-suck.82348/
- Minecraft Feedback — *Bring back Scrolling on Chests and double tap deselecting on Pocket Edition*: https://feedback.minecraft.net/hc/en-us/community/posts/10161306046733-Bring-back-Scrolling-on-Chests-and-double-tap-deselecting-on-Pocket-Edition
- Minecraft Feedback — *Inventory Item Dragging on Mobile*: https://feedback.minecraft.net/hc/en-us/community/posts/38033295390989-Inventory-Item-Dragging-on-Mobile
- Mindustry-Suggestions — *Touch / mobile controls need better documentation*: https://github.com/Anuken/Mindustry-Suggestions/issues/1763
- Steam Discussions — *Mindustry: Touchscreen controls*: https://steamcommunity.com/app/1127400/discussions/0/1628539187784501211/
- AppGrooves — *Sandship: Crafting Factory*, recensioni: https://appgrooves.com/app/sandship-crafting-factory-by-rockbite-games
- The Crafty Nerd — *Review: Stardew Valley (the mobile version)*: https://thecraftynerd.com/2019/03/17/review-stardew-valley-the-mobile-version/
- Stardew Valley Wiki — *Crafting*: https://stardewvalleywiki.com/Crafting
- TouchArcade — *Forager Review: A REALLY Great Game, but a So-So Mobile Port*: https://toucharcade.com/2020/11/17/forager-mobile-review-ios-controller-support-cloud-saves-performance-iphone-11-ipad-pro/
- Pocket Gamer — *Forager review: "A nearly perfect port"*: https://www.pocketgamer.com/forager/review/
- Nexus Mods — *Convenient Inventory* (Stardew Valley, quick stack): https://www.nexusmods.com/stardewvalley/mods/10384
- BisectHosting — *How to Quick Stack Items to Chests in Palworld*: https://help.bisecthosting.com/hc/en-us/articles/52992614583707-How-to-Quick-Stack-Items-to-Chests-in-Palworld
- The Mechanics of Magic — *Visual Design of Games: Mini Metro*: https://mechanicsofmagic.com/2023/04/22/visual-design-of-games-mini-metro/
- Interface In Game — *Mini Metro*: https://interfaceingame.com/games/mini-metro/

**Interfaccia su telefono e HUD**
- Parachute Design — *Mastering the Thumb Zone*: https://parachutedesign.ca/blog/thumb-zone-ux/
- Elaris — *Mobile App UX: Designing for Thumb Zones and Gestures*: https://elaris.software/blog/mobile-ux-thumb-zones-2025/
- Mobbin — *Tree UI Design*: https://mobbin.com/glossary/tree
- Mobbin — *Bottom Sheet UI Design*: https://mobbin.com/glossary/bottom-sheet
- Athena Productions — *10 Game UI Mistakes That Hurt Player Retention*: https://www.athena-productions.com/read/10-game-ui-mistakes-that-hurt-player-retention-228
- Design Bootcamp — *7 obvious beginner mistakes with your game's HUD*: https://medium.com/design-bootcamp/7-obvious-beginner-mistakes-with-your-games-hud-from-a-ui-ux-art-director-d852e255184a
- Appnality — *A Technical Guide to Mobile Game UI/UX Design*: https://www.appnality.com/blog/guide-to-mobile-game-ui-ux-design/
- Design Bootcamp — *Gesture Discoverability*: https://medium.com/design-bootcamp/gesture-discoverability-a-core-component-of-interaction-design-4026c8e67d6d
