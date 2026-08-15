# L'albero dei progetti

**Trentotto progetti, cinque ere, dal primo colpo d'ascia all'ultimo gradino.**
Sei sono costruiti, trentadue no, due sono sotto accusa.

Serve a decidere **quali teniamo, quali cadono e in che ordine arrivano** — non a costruirli.
La versione da guardare sul telefono è l'artefatto *L'albero dei progetti*.

> ### ⚠️ I prezzi non sono scritti qui, e non è una dimenticanza
> Avevo messo una fascia di monete su ogni era (*"600-2.000"*, *"2.500-8.000"*…). **Sono state tolte**: erano numeri a occhio, e contraddicevano la regola di `MATERIALI.md`. Le fasce implicavano un passo di ×1,16-1,28, il documento dei numeri dice ×1,5, e nessuno dei due aveva un motivo dietro.
>
> La regola vera, adesso scritta in `MATERIALI.md`, è questa: **fra un progetto e il successivo si deve aspettare dal 15% al 20% in più** — e l'attesa dipende dal costo *e* dalla produzione insieme, non dal costo da solo. I prezzi si ricavano da lì con `npm run progressione`, quando i progetti esistono. **Scriverli adesso sarebbe inventare.**

> ### La regola con cui è stato costruito, e con cui va giudicato
> Ogni progetto deve **togliere una domanda dalla testa del giocatore**, oppure dargli **un verbo che prima non aveva**. La domanda è scritta accanto a ognuno, fra virgolette.
>
> - Se una domanda non ti è mai passata per la testa giocando, **quel progetto va tolto**.
> - Se due progetti tolgono **la stessa** domanda, uno dei due è un doppione.
>
> È la regola 15/15b di `CLAUDE.md` e il §11b del `GDD.md`, applicata riga per riga.

---

## Era 0 — Le Mani · *da 120*

*Tutto si fa a mano. È il problema che tutto il resto risolve.*

| # | Progetto | La domanda che toglie | Stato |
| --- | --- | --- | --- |
| 1 | **Ascia affilata** | *abbattere un albero ci mette un'eternità* | c'è · misurato ×1,37 |
| 2 | **Zaino grande** | *torno a scaricare di continuo* | ⚠️ **misurato ×1,00** |
| 3 | **Stivali buoni** | *ci mette una vita ad arrivarci* | c'è · **×1,58, il migliore** |
| 4 | **Piccone pesante** | *spaccare la pietra è lentissimo* | c'è |
| 5 | **Vivaio** | *gli alberelli non crescono mai* | c'è · vale molto di più dall'Era 1 |
| 6 | **Carriola** | *torno a scaricare di continuo* | ⚠️ **doppione del 2** |
| 7 | **Sentiero battuto** | *il viaggio al bosco è sempre uguale e non posso farci niente* | nuovo — **verbo: dare forma all'isola** |

## Era 1 — Il Fuoco

*Le macchine lavorano da sole, ma bruciano legno e le riempi tu. Niente elettricità: non ancora.*

| # | Progetto | La domanda che toglie | Note |
| --- | --- | --- | --- |
| 8 | **Segheria** | *devo segare io ogni singolo tronco* | 1 legno → 3 tavole |
| 9 | **Frantoio** | *devo spaccare io ogni pietra* | 1 pietra → 2 ghiaia |
| 10 | **Fornace** | *il rame lo so solo battere a freddo* | **verbo: fondere** — 2 rame → 1 lingotto |
| 11 | **Officina** | *col telaio ho finito le cose da fare* | **verbo: comporre** — ingranaggi, lastre |
| 12 | **Trivella a manovella** | *devo scavare io* | produce da sola, **ma il cassetto lo svuoti tu** |
| 13 | **Ascia da boscaiolo** | *l'ascia buona non basta più* | si affianca, non sostituisce |
| 14 | **Il banco grande** | *devo toccare dieci volte per fare dieci chiodi* | fabbrichi a lotti — toglie tocchi a te, non tempo all'operaio |

> **Il numero al minuto non è un progetto: arriva gratis con la prima macchina.** Finché non c'è, il giocatore non ha modo di sapere se sta migliorando — ed è l'unico motore che questo gioco avrà per sempre. Farlo pagare sarebbe come far pagare il punteggio.

## Era 2 — La Corrente

*Un punto solo da rifornire al posto di otto. E il primo nastro.*

| # | Progetto | La domanda che toglie | Note |
| --- | --- | --- | --- |
| 15 | **Generatore a legna** | *devo riempire ogni macchina una per una* | **la domanda che regge tutta l'era** |
| 16 | **Palo di corrente** | *quella macchina è fuori dalla copertura* | si aggancia da solo, nessun filo |
| 17 | **Palo lungo** | *come faccio ad arrivare fin laggiù?* | copre poco ma arriva lontano: **un mestiere diverso**, non un palo più grande |
| 18 | **Segheria a corrente** | *la segheria a legna non sta dietro* | si affianca a quella a legna |
| 19 | **Fornace a corrente** | *fondere è il collo di bottiglia* | idem |
| 20 | **Trivella elettrica** | *dalla vena non ne esce abbastanza* | mangia molta corrente |
| 21 | **Il nastro** | *devo portarcelo io* | **verbo: la roba si muove da sola** |
| 22 | **Nastro veloce** | *il nastro non ce la fa a stargli dietro* | il collo si sposta sul trasporto |
| 23 | **Il cassetto** | *in quale cassa l'avevo messo?* | un materiale solo, e da fuori si vede cos'è e quanto |

## Era 3 — La Seconda Isola

*Automatizzare smette di essere una comodità e diventa il prezzo del biglietto.*

| # | Progetto | La domanda che toglie | Note |
| --- | --- | --- | --- |
| 24 | **Il pontile** | *qui non c'è più niente di nuovo* | **verbo: salpare** — si apre costruendo, non trovando una chiave |
| 25 | **Barca da carico** | *come porto il ferro di là?* | la carichi tu |
| 26 | **Barca automatica** | *devo caricare la barca io* | il nastro delle isole |
| 27 | **Generatore a carbone** | *devo riempirlo in continuazione* | non sblocca niente: **toglie una scocciatura sentita per ore** |
| 28 | **Altoforno** | *la fornace non regge il ferro* | 2 ferro → 1 lingotto |
| 29 | **L'acciaieria** | *il ferro non basta per le cose grosse* | ferro + carbone → acciaio · **è qui che le due isole si incontrano** |
| 30 | **Trivella pesante** | *dalla vena di ferro non ne esce abbastanza* | di acciaio |

## Era 4 — Le Scale

*Da qui non si aggiunge contenuto: si salgono gradini. E non finiscono.*

| # | Progetto | La domanda che toglie | Note |
| --- | --- | --- | --- |
| 31 | **Mulino a vento** | *devo alimentarlo* | gratis ma **va dove c'è vento**: una scelta, non un aggiornamento |
| 32 | **Caldaia a vapore** | *la corrente*, e non ci pensi più | copre mezza isola |
| 33 | **Il terminale** | *dov'è quella roba?* | il più desiderato · **va fatto lento, non solo caro** |
| 34 | **Terminale più capiente** | *il terminale è troppo lento* | **ripetibile**, a costo crescente |
| 35 | **Il terminale che fabbrica** | *quali passaggi servono?* | **verbo: chiedere il prodotto finito** |
| 36 | **Le ricette alternative** | *ho finito i modi di fare le cose* | un'altra strada, che **si affianca** alla vecchia |
| 37 | **La terza isola** | *ho visto tutto quello che c'era* | da progettare quando la base è viva |
| 38 | **Gli affinamenti** | *non c'è più niente da comprare* | costo crescente, non finiscono mai |

---

## Come si passa da un'era all'altra

Vale per tutti e quattro i salti, e viene da due ricerche che si confermano a vicenda.

> ### Un'era si conquista con una **consegna**, non con un prezzo. E non toglie mai niente.

**Con una consegna.** Satisfactory apre i suoi nove livelli **a coppie, ognuna chiusa da un progetto enorme** da costruire — non da un numero da raggiungere. Il nostro **pontile** (24) è già esattamente questo: si apre *costruendo* il passaggio. Le altre tre porte — Il Fuoco, La Corrente, Le Scale — oggi hanno solo un prezzo, e vanno rifatte sullo stesso modello.

**E non toglie niente.** In Civilization VII il cambio d'era ti porta via delle cose, e i giocatori usano la parola *punito*. Un salto d'era **apre due o tre cose insieme e non ne chiude nessuna**: la segheria a legna continua a servire anche quando arriva quella elettrica (è la regola 15d di `CLAUDE.md`).

**Ed è il momento più ripido della curva, non il più piatto.** Oggi da noi è l'esatto contrario: il passo *dentro* un'era è più grande del salto *fra* due ere. È il difetto più grosso della struttura, e si vede solo guardando l'albero intero.

---

## Le quattro cose che disegnare l'albero ha fatto vedere

Con sei progetti non si potevano vedere. Nessuna la può decidere un agente.

### 1. Zaino e Carriola tolgono la stessa domanda, e nessuno dei due funziona

Sono **l'unico doppione dell'albero**: entrambi rispondono a *"torno a scaricare di continuo"*. E la misura dice che lo Zaino rende **×1,00** — con sei caselle il bosco intero ci sta dentro e l'operaio non torna mai. Tre strade:

- ~~**Zaino base a 3 caselle**~~ — ❌ **esclusa, misurata il 2026-08-14: rompe il gioco.** Con tre caselle la partita si pianta dopo **un solo** sblocco. Non è lentezza: la catena del telaio mette in ballo **quattro materiali diversi** (legno, tavola, rame, chiodo) e in tre caselle non ci stanno. Con quattro caselle invece si finisce (14,0 min contro 13,5). **Quattro è il pavimento**, sotto non si scende.
- **Allontanare le fonti dopo la prima** — non tocca i primi quindici minuti, ma va ridisegnata la mappa. **È rimasta l'unica strada per far valere qualcosa allo Zaino.**
- **Fonderli in una scala sola** — Zaino → Carriola → Carro, e uno dei due sparisce.

→ è la decisione aperta **A3** di `DECISIONI.md`.

### 2. C'è un finale, o no?

L'autore ha chiesto *"la progressione fino al finale del gioco"*. Il `GDD.md` §11c dice **per scelta** che un finale non c'è. Le due cose non vanno d'accordo, e va scelto **adesso**, perché cambia l'Era 4.

La ricerca dice tutte e due le cose: **dopo il finale la maggioranza smette**, ma **senza un traguardo dichiarato molti non arrivano nemmeno a metà**.

- **Nessun finale** — come sta scritto. L'ultimo gradino nominabile è *l'isola che vive senza di te*.
- **Un finale che non chiude** — una costruzione grossa da completare, che dà un traguardo ma dopo la quale il gioco continua.

→ **decisione aperta A4**.

### 3. Il problema della curva non era quello che pensavo

> ⚠️ **Qui avevo sbagliato, e la ricerca me l'ha corretto.** Avevo scritto che con la curva ×1,5 l'ultimo progetto costerebbe *"oltre un miliardo"* di monete, e che quindi la regola andava buttata. **Il conto giusto è 392 milioni** — e soprattutto **non è un problema**: in un gioco dove la produzione cresce moltiplicando, un numero grande alla fine è normale, non è un muro.

Il problema vero è un altro, ed è l'opposto di quello che pensavo:

> **Non esiste "la curva dei costi".** Esiste solo il rapporto fra **quanto costa** e **quanto produci**, ed è quello il tempo che aspetti. Il ×1,5 scritto in `MATERIALI.md` non è né giusto né sbagliato: è **incompleto**, perché accanto non c'è scritto di quanto deve crescere la produzione. Con la produzione a ×1,3 funziona; a ×1,2 il gioco è rotto.

Il bersaglio, ricavato dai numeri pubblici di Cookie Clicker: **fra un progetto e il successivo si deve aspettare dal 15% al 20% in più**. Con la produzione a ×1,3, quello dà costi a ×1,5 — quindi il ×1,5 è confermato, ma per la prima volta **con un motivo dietro invece che a occhio**.

**Due cose che non tornano fra i nostri documenti**, trovate dalla stessa ricerca:
- le fasce d'era scritte qui sopra implicano ×1,16-1,28, **non** ×1,5;
- il salto **fra** un'era e l'altra è oggi **più piatto** del passo dentro l'era (×1,15 contro ×1,28): il confine d'era è il punto più piatto di tutta la curva, cioè l'esatto contrario di quello che dovrebbe essere.

### 4. Trentotto voci in bacheca sono un muro

La ricerca dice di non mostrare mai più di **otto o nove cose desiderabili insieme**: oltre, il giocatore non sceglie più, si blocca.

C'è già la regola che un progetto non ancora permesso **resta visibile ma spento, col suo costo** — ed è metà del motivo per tornare. Ma con trentotto voci serve anche che **i progetti di un'era compaiano solo quando quell'era si apre**. Da confermare.

---

## Cosa non c'è, e non è una dimenticanza

| Cosa | Perché no |
| --- | --- |
| **Un secondo operaio** | l'unica via di crescita è la tecnologia; se un collo di bottiglia si risolve con più gente, il gioco non è più quello |
| **Il braccio meccanico** *(l'inserter di Factorio)* | un concetto in più da imparare per fare una cosa che il nastro può fare da solo. Su un telefono ogni concetto si paga |
| **Commesse e contratti** | tolti prima di costruirli: il desiderio ce l'ha già la bacheca |
| **Regali di accesso quotidiano** | trasformano l'aprire in un dovere, e *"non c'è fretta"* diventerebbe una bugia |
| **Qualunque cosa da smontare** | il muro della ricostruzione è il punto documentato in cui la gente abbandona questo genere |
