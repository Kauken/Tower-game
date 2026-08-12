# Documento di design — v5.0

**Grano e Ferro** — un'isola da mandare avanti.
Per telefono, verticale, una mano sola.

> Sostituisce la v4.0. Quella metteva il gioco su una **scacchiera**, e l'autore
> l'ha rifiutata: *"non voglio questa cosa a scacchiera, voglio stile Stardew
> Valley, Graveyard Keeper. Un'isola con possibilità di accedere ad altre zone.
> E mettere anche un po' di Factorio e Satisfactory."*
>
> Se trovi codice o documenti che parlano di **reclute, ondate, nemici,
> castello, torri, sentiero, postazioni, Filare, Rotazione, appezzamenti**,
> sono resti da rimuovere.

---

## 1. Il gioco in una riga

**Un'isola vista dall'alto. Non c'è nessuno da guidare: sei tu il gestore.** Tocchi le cose e dai ordini; a camminare e a lavorare sono i braccianti. Apri zone nuove costruendo il passaggio, e le materie prime che ne escono alimentano catene di lavorazione sempre più lunghe.

**Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene.

## 2. Il ruolo del giocatore

> **Niente personaggio.** L'autore l'ha rifiutato tre volte, in tre versioni diverse. Il giocatore non è dentro lo schermo: è sopra.

Zero riflessi, zero fretta, **non si può perdere**. Quattro decisioni che si ripetono:

1. **Cosa ordinare** — cosa serve adesso, e in che ordine.
2. **Chi assumere** — un altro taglialegna, o un cavatore?
3. **Vendere o tenere da parte** — il mercato paga subito, le commesse molto di più.
4. **Quale zona aprire** — costa, e apre un ramo di gioco.

## 3. Come si comanda

**Il dito fa due cose sole:**

- **Trascini** → sposti l'isola.
- **Appoggi e alzi su una cosa** → dai un ordine. La tocchi di nuovo → lo annulli.

Un pulsante allontana la vista per guardare tutta l'isola. Due livelli di zoom soltanto: uno per lavorare, uno per guardare. Una zoomata continua col pizzico, su uno schermo stretto e con un pollice solo, si perde subito.

**L'ordine si vede sempre**: un anello attorno alla cosa, **giallo** se aspetta qualcuno, **verde** se qualcuno ci sta già andando. Senza quel segno non si può sapere cosa si è già comandato.

## 4. Chi lavora

**Ogni bracciante fa un mestiere solo.** Sta fermo finché non c'è in coda un lavoro che sa fare, poi ci va, lo fa, e torna fermo. Lo paghi ogni giorno.

> **Perché non le priorità di RimWorld.** Là ogni colono ha una griglia di priorità da 1 a 4 per ogni tipo di lavoro. È la parte più profonda di quel gioco, ed è anche un foglio di calcolo: su un telefono, con un dito, sarebbe illeggibile. E ne nasce un difetto documentato — col trasporto a priorità alta i coloni attraversano tutta la mappa per un oggetto solo, e il giocatore non capisce perché nessuno stia lavorando.
>
> Qui, se il legno non arriva, basta guardare: **hai un taglialegna solo.**

## 5. Le zone

L'isola non è tutta accessibile. Ogni pezzo è chiuso da un ostacolo che si toglie **costruendo qualcosa**, non trovando una chiave — è il modo di Graveyard Keeper.

| Zona | Cosa porta | Come si apre |
| --- | --- | --- |
| **La radura** | i campi, il casotto | sei lì dall'inizio |
| **Il bosco** | legno, resina | serve un'ascia |
| **La cava** | pietra, rame, ferro | va sgomberata la frana |
| **Il molo** | il mercante e le commesse | va riparato il pontile |
| **L'isola vicina** | un ramo intero nuovo | va costruita una barca |

**Aprire una zona non è "più spazio": è un pezzo di gioco nuovo.** Ogni zona porta una materia prima e un ramo di lavorazioni.

## 5b. Le cose stanno in un posto — **niente magazzino centrale**

> *"Non voglio una sorta di Age of Empires che ha un magazzino principale, ma invece voglio una sorta di inventario, dove le risorse devono essere spostate manualmente all'inizio, magari al colono dire dove scaricare, poi automatizzare con i nastri."*

È la regola che rende possibile tutto il pezzo Factorio, e va difesa:

- **Le risorse non compaiono in un contatore.** Stanno dentro **casse**, che hanno un posto preciso sull'isola.
- Il bracciante ha uno **zaino piccolo**. Raccoglie, si riempie, e allora smette di lavorare e va a scaricare.
- **Dove scarica lo dici tu**, bracciante per bracciante: lo tocchi, premi *Dove scarica*, tocchi una cassa.
- **Costruire paga davvero dalle casse.** Quello che c'è dentro sparisce: non è un contatore.

Da qui nasce l'unica cosa che conta: **la distanza costa.** Una cassa vicino al lavoro fa risparmiare tutta la strada, e quella camminata è il motivo per cui più avanti i **nastri** saranno un sollievo invece che un gadget. Se la roba comparisse da sola, non ci sarebbe niente da trasportare e i nastri non servirebbero a niente.

## 6. Le catene e l'albero tecnologico — la parte Factorio

> *"Ora un legno vale un legno, poi passandoli in macchinari 1 legno si duplica e triplica. Stessa cosa per le pietre e altre materie prime."*

### ⚠️ Il muro: **una lavorazione non produce mai il materiale che consuma**

Preso alla lettera, *"1 legno diventa 3 legno"* **rompe il gioco in modo irreparabile**: rimetti i 3 legno nella macchina, ne escono 9, poi 27. Hai legno infinito, e con esso monete infinite. Non è un problema di numeri — nessun bilanciamento lo aggiusta.

È lo stesso problema che i modpack tecnici di Minecraft hanno risolto una volta per tutte, e la soluzione è una riga:

> **La moltiplicazione produce un materiale DIVERSO, che non può rientrare nella stessa macchina.**
>
> 1 tronco → *Segheria* → **3 tavole**. Le tavole non rientrano nella segheria.
> 1 masso → *Frantoio* → **2 ghiaia** → *Fornace* → **1 lingotto**.

Il valore si moltiplica lo stesso — le tavole valgono più di un tronco e servono per costruire — ma **il ciclo è chiuso**: la materia prima entra solo dall'isola, dove è limitata dagli alberi che ricrescono e dai massi che no.

**Questa regola va controllata dal codice**, non ricordata: al punto 8, il gioco deve rifiutarsi di partire se una ricetta ha in uscita un materiale che ha in entrata. È il tipo di guardrail che la skill `post-mortem` chiede di mettere.

### I livelli di lavorazione

Ogni macchina non ha un moltiplicatore suo inventato: appartiene a un **livello**, e il livello dice quanto moltiplica. Così l'albero tecnologico ha una forma leggibile e si può bilanciare.

| Livello | Cosa serve per arrivarci | Quanto rende la materia prima |
| --- | --- | --- |
| **0 — a mano** | niente | ×1 — un tronco è un tronco |
| **1 — attrezzo** | legno e pietra | ×2 |
| **2 — macchina** | metallo | ×3 |
| **3 — impianto** | più metalli, più spazio | ×4, ma vuole due catene che si incontrano |

Salire di livello **non è un potenziamento: è una ricostruzione.** La macchina di livello 2 non entra dove stava quella di livello 1, e va rialimentata. Nei modpack tecnici è documentato come la cosa che tiene vivo il gioco per centinaia di ore, ed è anche la risposta al difetto del genere — *quando è tutto automatico non hai più niente da fare*.

### I tre gradini dell'automazione

1. **Ordini tu, ogni volta.** Tocchi ogni albero.
2. **L'ordine permanente**: la lavorazione continua da sola finché ha materiale.
3. **I nastri**: la roba si sposta da sola fra le casse. **Adesso la catena gira senza di te.**

### "The factory must grow"

Il motore che non si spegne mai, e viene dritto da Factorio: **la domanda di roba basilare deve crescere sempre più in fretta di quanto tu riesca a produrre.** Commesse e costruzioni devono chiedere più di quanto l'isola dia. Se un giorno hai abbastanza di tutto, il gioco è finito.

## 6b. Perché la base regge — e cosa è stato messo in conto

L'autore ha chiesto di non arrivare a un punto in cui *"per fare questo dobbiamo modificare la base del progetto"*. Ecco cosa è già pronto e cosa no, verificato guardando il codice e non a intuito.

**Regge già, senza toccare niente:**

| Quello che verrà | Perché ci sta | Dove |
| --- | --- | --- |
| Piantare alberi, macchine che crescono o si consumano | **le tessere hanno uno stato**, non solo un nome | `mondo.js` |
| Macchine con un magazzino dentro | una macchina è una cassa con una ricetta | `casse.js` |
| Mestieri nuovi (contadino, fabbro, portatore) | il mestiere è un dato, e la coda dei lavori è generica | `braccianti.js`, `lavori.js` |
| Materiali e ricette nuovi | tutto in `config/`, e il codice non conosce nessun materiale per nome | `config/` |

**Da cambiare, ed è poco — ma va fatto prima dei nastri, non dopo:**

- **Un lavoro deve poter avere un'origine e una destinazione.** Adesso un lavoro è *"fai qualcosa su questa tessera"*. Trasportare è *"prendi X da A e portalo a B"*. Sono due campi in più in `lavori.js` e un ramo in più nel ciclo del bracciante. Farlo adesso costa mezz'ora; farlo dopo aver costruito i nastri significa rifare i nastri.
- **Il percorso vero.** I braccianti vanno in linea retta. Con edifici e nastri diventa visibilmente sbagliato. È il punto 6 della roadmap, e sta lì apposta.

**Quello che non so ancora, e che scoprirò col punto 7 (la simulazione):** cosa succede con venti braccianti e nastri che muovono centinaia di oggetti. Il disegno regge di sicuro; la ricerca del prossimo lavoro è una scansione lineare, e prima o poi vorrà un indice. Non è un cambio di base: è un'ottimizzazione dentro un file solo.



> grano → *Mulino* → farina → *Forno* → **pane**, che vale molto di più
>
> ma il Mulino si costruisce col **rame**, e il rame va scavato

Il valore si moltiplica a ogni passaggio, e ogni lavorazione chiede materiali di *un'altra* catena. È così che le zone diventano un gioco solo invece di rami appiccicati.

## 7. Il giorno e le spese

Il **giorno** dura pochi minuti. A sera si pagano i **salari** e la manutenzione, i prezzi di mercato si muovono, e un riepilogo dice cosa è successo.

È il meccanismo del *"vabbè, ancora un giorno"*, il motore vero dell'engagement di Stardew.

**Non si perde mai.** Se non riesci a pagare, un bracciante se ne va: la fattoria si rimpicciolisce e riparti. Niente schermata di sconfitta.

## 8. Le tessere

L'isola è fatta di tessere, **ma non si devono vedere.** Servono solo a far agganciare le cose, esattamente come in Factorio — che è una griglia, e non sembra una scacchiera.

Regole di disegno che ne discendono, e sono vincolanti:
- **Le tessere non hanno bordi. Mai.**
- La variazione del terreno è una **macchia tonda** sfalsata, non un quadrato più chiaro. Un quadrato dentro una griglia di quadrati si legge come una scacchiera.
- La riva è una linea chiara dove la terra tocca l'acqua: è quella che fa leggere l'isola come un'isola.

## 9. Cosa questo gioco **non** è

Guardrail, da difendere in ogni decisione futura:

- **Non c'è un personaggio da muovere.** Rifiutato tre volte: non riproporlo.
- **Non è un puzzle game.** Niente moltiplicatori di adiacenza, niente incastri da ottimizzare.
- **Non si perde e non si sbaglia in modo irreversibile.**
- **Non c'è fretta.** Niente timer che scadono, niente che marcisce.
- **Non è un idle da guardare.** Se in una giornata non c'è almeno una decisione, il gioco è rotto lì.
- **Niente valuta premium, niente pubblicità, niente attese che si pagano.**

## 10. La domanda che regge tutto

> ### Guardare l'isola e comandarla col dito è piacevole?

Se sì, tutto il resto è contenuto. Se no, nessuna quantità di catene, zone e braccianti lo salva. **È la verifica obbligatoria del punto 1 della roadmap.**

## 11. Una nota sulla dimensione

Questa versione è **molto più grande di tutte le precedenti messe insieme**: un mondo a tessere, una telecamera, braccianti che si muovono, zone, catene di produzione. Non è una settimana di lavoro.

Il rischio non è che l'idea sia sbagliata — **Graveyard Keeper è esattamente questo gioco, esiste e funziona.** Il rischio è la dimensione. Per questo la roadmap costruisce il *posto* prima di qualunque catena, e si ferma a farlo provare.
