# Documento di design — v7.1

**Un'isola da mandare avanti.** Vista dall'alto, si comanda col dito, e ci lavora **un operaio solo**.

> **Cosa è cambiato nella v7.1.** Sei ricerche sui forum dei giochi di riferimento (in `docs/ricerche/`, con la sintesi in `SINTESI.md`) hanno **smentito quattro cose scritte qui dentro**. Sono state corrette, e ogni correzione dice perché: la regola della ricostruzione (§11b) era rovesciata; il blackout totale (§10b) è il sistema che fa smettere di giocare; il terminale (§11b) va reso lento e non solo caro; le macchine (§9) devono vedersi lavorare, non essere pannelli. In più §2 ha adesso la contromisura alla morte della spina dorsale, e §11c i tre motori del "per sempre".

Riferimenti dichiarati, e cosa si prende da ognuno:

| Gioco | Cosa gli rubiamo |
| --- | --- |
| **Satisfactory** | L'arco dell'automazione in tre gradini, e i giacimenti che non finiscono mai |
| **Factorio** | Le catene che convergono, e *"the factory must grow"* |
| **Minecraft tecnico** *(Create, Applied Energistics, Refined Storage)* | L'inventario a caselle, la moltiplicazione dei materiali fatta bene, e **la scala del magazzino** |
| **Stardew Valley** | Il ciclo economico gentile: raccogli, vendi, compri quello che ti mancava |
| **Graveyard Keeper** | Le zone che si aprono **costruendo**, e qualcun altro che lavora al posto tuo |

---

## 1. Il gioco in una riga

> Tocchi le cose dell'isola per dare ordini. **Un operaio solo** li esegue, uno per volta. Costruisci attrezzi, macchine e nastri finché la maggior parte del lavoro non la fa più lui — e allora puoi salpare per l'isola dopo.

## 2. La spina dorsale — **la risorsa scarsa è il tempo dell'operaio**

Questa è la frase che tiene insieme tutto il resto. Se una decisione futura non si può giudicare con questa frase, quella decisione è fuori posto.

C'è **un operaio solo**, e non se ne assumono altri. Quindi tutto quello che fai si misura in una valuta sola: **quanti secondi del suo tempo costa, e quanti gliene restituisce.**

- Un'**ascia migliore** gli restituisce tempo su ogni albero.
- Una **cassa vicino al lavoro** gli restituisce tempo su ogni viaggio.
- Una **trivella** gli restituisce tutto il tempo dello scavare, ma gliene chiede un po' per svuotarla.
- Un **nastro** gli restituisce anche quello.
- Una **seconda isola** gli chiede tutto il tempo che ha, e quindi si può aprire **solo** quando la prima sa vivere senza di lui.

**Il gioco è comprare indietro il tempo di una persona sola.** Da qui discende tutto quello che segue.

### Il pericolo della spina dorsale: **si può svuotare**

Se la risorsa scarsa è il tempo dell'operaio, allora c'è un momento preciso in cui il gioco rischia di morire: **quando le macchine gli hanno tolto abbastanza lavoro che il suo tempo non è più scarso.** Da lì in poi tutte le decisioni di spesa perdono il loro peso, perché la valuta con cui le misuravi non costa più niente. È il punto in cui i mod tecnici si sentono dire *"non stai più giocando, stai guardando i mod che giocano al posto tuo"*.

Due ricerche diverse, che non si parlavano, sono arrivate **allo stesso identico rimedio**:

> ### Le macchine consumano combustibile, e a caricarlo è l'operaio.
>
> Più fabbrica hai, più combustibile serve, più viaggi di rifornimento devi fare. **L'automazione non azzera il suo tempo: lo sposta.** Smette di scavare e comincia a rifornire.

È la ragione per cui la corrente (§10b) non è un sistema in più: è **il contrappeso** che tiene scarsa la risorsa scarsa quando le trivelle avrebbero smesso di farlo. E il gradino dopo — il nastro che rifornisce il generatore da solo — non è la fine del gioco, perché a quel punto sei sull'isola successiva, dove ricominci a mano.

Ne discende la regola per chiunque aggiunga automazione:

> **L'automazione deve togliere tocchi al giocatore, mai tempo all'operaio.** Un nastro toglie all'operaio un viaggio che facevi *dare tu*: il tocco sparisce, il suo tempo si sposta su qualcos'altro. Una comodità che non sposta il suo tempo da nessuna parte, lo cancella e basta — e sta cancellando il gioco.

## 3. Le tre economie, e perché sono tre

| | Da dove viene | Cosa compra |
| --- | --- | --- |
| **Il tempo dell'operaio** | Non si compra. **Si libera.** | Tutto. È la vera valuta |
| **I materiali** | Dall'isola: alberi, giacimenti, macchine | **Costruire** e **craftare** oggetti veri |
| **Le monete** | Vendendo al casotto quello che ti avanza | I **progetti**: il *diritto* di costruire una cosa |

**Perché non due.** Se i progetti si pagassero coi materiali, vendere non servirebbe più a niente e il mercante sarebbe arredamento. Se le macchine si comprassero con le monete, l'isola non servirebbe a niente e basterebbe vendere legno all'infinito. Tenendole separate, **tutte e due le vie restano vive per tutta la partita**: devi *scoprire* una cosa con le monete e poi *fabbricarla* coi materiali.

È il modello del HUB di Satisfactory — sblocchi il traguardo, poi il capannone lo costruisci comunque tu.

## 4. Come si comanda — **la mano**

Il giocatore **non ha un personaggio**. Guarda l'isola dall'alto, la sposta col dito, e dà ordini. L'operaio non si muove: gli si dice cosa fare toccando le cose.

Il modello del tocco è uno solo, e vale per sempre:

> ### Quello che tocchi dipende da **cosa hai in mano**.

**Con le mani vuote** — il tocco è un **ordine**:
- su un albero, un masso, un giacimento → *vai a lavorarlo*
- su una cassa o una macchina → *aprila* (e da lì posi, prendi, avvii)
- sull'operaio → *guarda cosa sta facendo*
- **sul terreno vuoto → non succede niente.** Mai.

**Con qualcosa in mano** — il tocco **piazza**:
- tocchi una casella dell'inventario (un alberello) oppure una voce del menù Costruisci (una cassa, una trivella, un nastro): **quella cosa è in mano**
- una striscia in alto dice sempre *cosa* hai in mano e *quanti* te ne restano
- ogni tocco sulla mappa ne piazza uno, e **resti in mano**: così ne pianti dieci di fila senza rientrare nel menù
- tocchi di nuovo la stessa casella, o premi **Annulla**, e lo riponi

**Perché è così, e perché non cambierà.** Alberelli, casse, trivelle, macchine, nastri: sono decine di cose diverse che devono essere piazzate, e **tutte si piazzano allo stesso modo**. Un gesto imparato una volta vale per tutto il gioco. E i nastri, che vogliono un dito che scorre invece che un tocco, sono lo stesso modo con un trascinamento — non un sistema nuovo da imparare.

> **Questa regola nasce da un errore vero.** Nella versione precedente il tocco sul terreno vuoto piantava un alberello *di default*: bastava sbagliare mira per piantare un albero. Un'azione che parte senza che tu l'abbia scelta è sempre sbagliata, e lo sarebbe stata dieci volte tanto con dieci cose piazzabili.

Il resto dei gesti:
- **trascinare** = spostare la mappa (a mani vuote)
- **un pulsante** allontana la vista. Due livelli di zoom soltanto: uno per lavorare, uno per guardare tutta l'isola. La zoomata continua col pizzico, su uno schermo stretto e con un pollice solo, si perde subito.

## 5. Chi lavora — **uno solo, e non si assume**

Sta fermo finché non c'è un ordine in coda, poi ci va, lo fa, e si mette la roba **nello zaino a caselle**. Una cosa per volta, nell'ordine in cui gliel'hai data.

**Non è un personaggio da guidare.** Rifiutato dall'autore tre volte in tre versioni diverse: non ha una levetta, non lo si muove.

L'unica via di crescita è la **tecnologia**. Se ti viene voglia di risolvere un collo di bottiglia aggiungendo gente, hai sbagliato: si risolve con un pezzo di albero tecnologico. È la forma di Factorio e Satisfactory, dove sei una persona sola e a crescere è la fabbrica.

Se si ferma, **deve essere scritto perché**. Un operaio che si pianta senza spiegazione sembra un guasto, non una regola.

## 6. L'inventario a caselle, e **niente si sposta da solo**

Lo zaino **non è un contatore, è una fila di caselle**, e ogni casella tiene una pila di **un materiale solo**. Le casse e le macchine usano lo stesso identico sistema: così *"quanto ci sta dentro"* vuol dire la stessa cosa ovunque, e spostare roba è sempre lo stesso gesto.

1. **Quando le caselle finiscono, l'operaio si ferma.** Non va a svuotarsi da solo da nessuna parte.
2. **Posare e prendere sono ordini** come tagliare un albero: tocchi una cassa, premi *Posa* o *Prendi*, e lui ci cammina. **Un tocco per materiale**, mai un trascinamento di pile — su un telefono trascinare otto pile sarebbe una punizione, non una scelta.
3. **Riempirsi non è la stessa cosa di essere pieni.** Con tutte le caselle occupate ma qualcuna a metà ci sta ancora dell'altro *dello stesso* materiale, ma niente di nuovo: aveva posto per il legno, non per la pietra. È la prima volta che devi pensare a **cosa** porta, non solo a quanto.

**Non esiste nessun totale dell'isola**, nemmeno scritto in alto. Un numero unico che dice *"hai 40 legno"* farebbe credere di poterlo spendere, mentre quel legno sta dentro una cassa da qualche parte e qualcuno lo deve andare a prendere.

> **La regola dietro tutto questo:** *un'automazione vale quanto la fatica che toglie.* Ogni comodità regalata all'inizio è un pezzo di sblocco futuro buttato via. Se lo scarico è già automatico, il nastro non è una liberazione ma un gadget, perché il problema che doveva risolvere non è mai esistito.

## 7. Cosa c'è sull'isola — tre rapporti diversi con la mappa

Non tutto quello che sta sul terreno funziona allo stesso modo, e la differenza è deliberata.

### Gli ostacoli — **finiscono, ed è giusto così**
Alberi, massi, frane. Si tolgono una volta, danno una resa una volta, e **liberano lo spazio** dove poi metterai una macchina. Sgomberare è un lavoro che **finisce**, e finire un lavoro è una soddisfazione che il gioco deve poter dare.

### I giacimenti — **non finiscono mai**
Macchie fisse di tessere: rame, ferro, carbone, pietra. Non si esauriscono. Ognuno ha una **ricchezza** — *povero, normale, ricco* — che moltiplica quanto rende.

È il modello di Satisfactory (impuro ×0,5 / normale ×1 / puro ×2), e serve a una cosa sola: **rendere i posti diversi fra loro.** Un giacimento ricco lontano contro due poveri vicini è una decisione vera di dove mettere la fabbrica, e non costa niente costruirla.

Il giacimento è il **rubinetto** dell'isola: la quantità di materia prima che può entrare al minuto ha un tetto fisico, e quel tetto è quello che rende la crescita un problema invece che una formalità.

### Il bosco — **dipende da te**
Gli alberi **non ricrescono**. Tagliandone uno escono legno **e un alberello**, e sei tu a decidere se ripiantarlo o venderlo. Il legno è l'unica risorsa dell'isola che va **gestita**, ed è per questo che è la più interessante delle tre.

## 8. I tre gradini dell'automazione

Vale per ogni cosa che si può automatizzare, ed è la struttura che Satisfactory tiene in piedi per decine di ore.

| Gradino | Cosa fa | Cosa ti costa ancora |
| --- | --- | --- |
| **1 — a mano** | L'operaio ci va e lo fa | Tutto il suo tempo |
| **2 — la macchina che accumula** | Produce da sola nel suo cassetto | **La devi svuotare tu** |
| **3 — il nastro** | La roba si sposta da sola | Niente. Adesso gira senza di te |

Il gradino 2 è quello che la gente salterebbe, ed è quello che non si deve saltare: è il *Portable Miner* di Satisfactory, che accumula ma **non si può collegare a un nastro**, di proposito. È lui che fa sentire il gradino 3 come una liberazione.

> **Nessun gradino si salta e nessuno si regala.** Se stai per aggiungere una comodità, chiediti quale sblocco futuro stai svuotando.

## 9. Il crafting — **si fabbrica in un posto**

Non esiste un menù di crafting che funziona ovunque. Si fabbrica **dove c'è chi fabbrica**, ed è quel posto a salire di livello.

- **Il banco da lavoro**, al casotto, c'è dall'inizio. Ricette a mano, una per volta, con i materiali che l'operaio ha **addosso** — perché è lì davanti.
- **Le macchine** (segheria, fornace, officina) hanno un **cassetto d'entrata** e uno **d'uscita**. Lavorano da sole finché hanno materiale. Riempirle e svuotarle **è il lavoro**, finché non arrivano i nastri.

Le macchine si sbloccano con un **progetto** (monete) e si costruiscono coi **materiali**. Vedi §3.

### Una macchina si vede lavorare. **Non è un pannello.**

Questa è la regola che le ricerche hanno indicato come il motivo per cui un mod tecnico viene amato invece che solo usato. Il confronto è netto: i mod dove la macchina è **una scatola con dentro un'interfaccia** vengono descritti come efficienti e freddi; quelli dove la macchina è **un aggeggio che gira in mezzo al mondo** vengono descritti come belli da guardare. Il secondo tipo è quello che la gente costruisce anche quando non gli serve.

Da noi, sul canvas, vuol dire tre cose concrete:

1. **Se sta lavorando, si muove.** La lama della segheria gira, la fornace ha la fiamma, la trivella scende e sale. Se è ferma, è visibilmente ferma. **Il movimento è l'indicatore di stato**, non un ornamento.
2. **Lo stato si legge senza aprire niente.** Guardando l'isola devi capire quali macchine vanno, quali sono piene, quali sono ferme e perché. Un puntino, un'icona, un colore — ma **fuori**. Aprire il cassetto serve a *spostare la roba*, non a *scoprire cosa succede*.
3. **La macchina piena e la macchina senza materiale non si somigliano.** Sono i due guasti che capitano di continuo, e vanno distinti a colpo d'occhio: una chiede di essere svuotata, l'altra di essere riempita.

Il motivo non è estetico. Su un telefono, se per sapere come va la fabbrica devo aprire otto pannelli, **non lo faccio**: gioco alla cieca, e una fabbrica che non guardi è una fabbrica che non ti dà nessuna soddisfazione.

## 10. I materiali e le ricette — la parte che va fatta bene subito

### ⚠️ Il muro: **una ricetta non produce mai un materiale che consuma**

Preso alla lettera, *"1 legno diventa 3 legno"* rompe il gioco in modo irreparabile: rimetti i 3 legno nella macchina, ne escono 9, poi 27. Non è un problema di numeri — nessun bilanciamento lo aggiusta.

> 1 tronco → *Segheria* → **3 tavole**. Le tavole **non rientrano** nella segheria.
> 1 masso → *Frantoio* → **2 ghiaia** → *Fornace* → **1 lingotto**.

Il valore si moltiplica lo stesso, ma **il ciclo è chiuso**: la materia prima entra solo dall'isola, dal rubinetto dei giacimenti.

**Questa regola è controllata dal codice all'avvio**, non ricordata a memoria.

### I quattro livelli

| Livello | Cosa è | Esempi | Come si ottiene |
| --- | --- | --- | --- |
| **0** | materia prima | legno, pietra, rame, ferro, carbone | dall'isola |
| **1** | semilavorato | tavole, ghiaia, lingotti | **1** ingrediente, una macchina |
| **2** | componente | ingranaggi, lastre, cavi | **2** ingredienti che convergono |
| **3** | macchinario | trivella, nastro, segheria | 2-3 componenti + un progetto |

### Le regole di forma delle ricette

1. **Mai più di tre ingredienti diversi.** Su un telefono una ricetta a cinque voci non si legge, e nella pratica diventa una lista della spesa invece che un incrocio.
2. **Dal livello 2 in su, almeno due ingredienti.** È quello che fa **incontrare due catene**: è il motivo per cui in Factorio i circuiti sono interessanti e le piastre di ferro no.
3. **Una ricetta non produce mai un materiale che consuma.**

### Le regole di bilanciamento

Sono invarianti, non gusti. Dove si può, il gioco le controlla da solo.

1. **Il prezzo di un prodotto è maggiore della somma dei suoi ingredienti** — altrimenti lavorare è una perdita e nessuno lavorerà mai — **e minore di due volte e mezzo** — altrimenti c'è una sola cosa sensata da fare e il gioco è risolto.
2. **Ogni macchina dichiara in quanti minuti si ripaga** lavorando in continuo. Se non si ripaga mai è arredamento, e va tolta invece che ritoccata.
3. **Ogni sblocco restituisce tempo all'operaio in modo misurabile, oppure dà un verbo nuovo.** Un +5% che non si nota non merita di stare in bacheca.
4. **La domanda deve crescere più in fretta del rubinetto.** Progetti e costruzioni devono chiedere più di quanto i giacimenti diano al minuto. Se un giorno hai abbastanza di tutto, il gioco è finito.

Il dettaglio operativo sta in **`docs/MATERIALI.md`**, che è il documento che l'agente `bilanciatore` usa come legge.

## 10b. La corrente — **pali che coprono un'area, niente cavi**

Le macchine non lavorano senza corrente. Ma la corrente qui **non è una rete di fili da tirare**: è una **copertura**.

> *"Non con cavi singoli a macchine ma con pali che coprono un'area."*

### Come funziona

- Un **generatore** brucia combustibile e alimenta tutto quello che sta nel suo **raggio**.
- I **pali** allungano la copertura. Si agganciano **da soli** a un generatore o a un palo già alimentato che sia nel raggio: non si collega niente a mano, non si traccia nessun filo.
- Una macchina **dentro la copertura** lavora. **Fuori**, sta ferma e lo scrive.

Su un telefono tirare fili con un dito sarebbe un supplizio, e la parte interessante della corrente non sono i fili: è **la domanda "come faccio ad arrivare fin laggiù?"** — che con i pali resta intatta.

### Acceso o spento, mai a metà — **ma solo un gruppo per volta, e avvisa prima**

In Factorio, quando la corrente non basta tutto rallenta in proporzione. È elegante e su uno schermo da telefono è **illeggibile**: vedi le macchine andare piano e non sai perché.

Qui è **binario**. Se il generatore ha combustibile, tutto quello che copre lavora a piena velocità. Se il combustibile finisce, quello che copre si ferma — **e c'è scritto perché**. Niente si rompe, niente si perde: si rimette il combustibile e riparte.

Ma "binario" da solo non basta, e questa parte è stata **corretta dopo le ricerche.**

> **Esiste una discussione, con quel titolo esatto, intitolata «Il sistema della corrente mi ha fatto smettere di giocare».** Il motivo non era la difficoltà: era il **fusibile che spegne tutto insieme**. Coffee Stain ha poi dovuto introdurre i gruppi di alimentazione per rimediare. La corrente è il sistema che punisce più a fondo se lo sbagli, perché ti toglie in un colpo un lavoro di ore senza che tu abbia fatto niente di male.

Quindi valgono tre vincoli, e sono vincoli, non preferenze:

1. **Non esiste il blackout totale.** Un generatore che resta a secco ferma **solo le macchine che copre lui**. Il resto dell'isola continua. Non c'è nessun interruttore unico che possa spegnere tutto.
2. **Avvisa prima di fermarsi.** Quando il combustibile sta per finire il generatore lo dice mentre lavora ancora, con anticipo sufficiente a fare qualcosa. Fermarsi di sorpresa è la parte che fa smettere; fermarsi dopo un avviso ignorato è una decisione tua.
3. **Non serve riaccendere niente a mano.** Rimetti il combustibile e riparte da solo, con quello che aveva nel cassetto. Nessun giro fra le macchine a rimetterle in moto una per una — su un telefono quello è il modo più veloce di far chiudere l'app.

Detto in positivo: **la mancanza di corrente deve costare produzione, mai lavoro perso.**

### Il combustibile è **legno**, e più avanti carbone

Ed è qui che la corrente smette di essere una tassa e diventa una decisione.

**Il legno che bruci è legno che non costruisci.** Da un giorno all'altro il bosco che ripianti non è più solo materiale: è **il carburante della fabbrica**. La scelta *"vendo l'alberello o lo ripianto"*, che era la prima decisione del gioco, adesso pesa il doppio.

Il **carbone** arriva con la seconda isola e rende molto di più a pezzo. Non sblocca niente di nuovo: **toglie una scocciatura che hai sentito per ore**, che è l'unico modo onesto di rendere desiderabile un materiale.

### Perché non è una tassa

Una corrente che sa dire solo di no è una tassa, non un gioco. Perciò:

- **Non si perde mai niente.** Restare senza combustibile ferma le macchine, non le rompe.
- **Non arriva prima delle macchine**: prima devi *volere* che vadano più in fretta.
- **Aggiunge un problema di spazio che non è un puzzle di incastro** (che l'autore ha rifiutato): è una domanda di portata — *arrivo fino al giacimento lontano, o mi conviene spostare la fabbrica?*
- **Riempire il generatore costa il tempo dell'operaio**, come tutto il resto — ed è un'altra cosa che un nastro, un giorno, gli toglierà di mano.

## 11. Le isole — e perché sono la cosa più intelligente della struttura

Ogni isola porta **una materia prima nuova** e apre un ramo di lavorazioni. Si aprono **costruendo il pontile**: un progetto da comprare e dei materiali da fabbricare. Non si trova una chiave, si costruisce il passaggio — è il modo di Graveyard Keeper.

Ma la cosa che conta è un'altra:

> ### L'operaio si sposta con te. Mentre è sull'isola B, sull'isola A **non succede niente a mano**.

Vanno avanti solo le macchine. Il che vuol dire che **la seconda isola non è "più spazio": è il momento in cui la prima deve saper vivere senza di te.**

Automatizzare smette di essere una comodità e diventa **il prezzo del biglietto**. È l'unica struttura trovata in sei versioni di progetto in cui l'automazione è *obbligatoria per progredire* senza che il gioco te lo imponga con un cartello.

E subito dopo nasce il problema successivo, che è quello giusto: **come faccio ad avere qui il ferro che sta là?** Prima con la barca a mano, poi con la barca che va da sola.

## 11b. **Le scale** — ogni sistema ha sempre un gradino dopo

> *"Ci deve essere sempre una cosa migliore per tutto. Il generatore prima base poi altri sistemi di energia. Crafting, gestione inventario e altro la stessa cosa."*
>
> *"Una sorta di infinito da rifinire sempre, proprio come Minecraft tecnico o Satisfactory."*

Questa è la struttura del gioco, e senza una regola diventerebbe **contenuto gonfiato**: dieci generatori che fanno la stessa cosa con numeri diversi. La regola è una sola:

> ### Un gradino non è un numero più grande. **È una domanda che sparisce dalla testa.**
>
> Se non sai **nominare la domanda che toglie**, quel gradino non esiste. Non costruirlo.

È quello che fa funzionare i modelli di riferimento. In Create, il motore a vapore non è "più potenza" del mulino ad acqua: è *smetti di pensare alla corrente*. In Applied Energistics la rete non è "più spazio" delle casse: è *smetti di ricordarti dove hai messo le cose*.

E la seconda regola, che è stata **rovesciata dopo le ricerche** ed è importante capire perché.

> ### Salire di gradino **non ti fa mai smontare quello che funziona.**
> La macchina nuova si affianca alla vecchia. La vecchia continua a lavorare, oppure si sposta a fare un altro pezzo della catena. **Non si demolisce mai niente per poter salire.**

**Questa regola prima diceva il contrario**, e diceva una cosa sbagliata. C'era scritto che salire di gradino *è* una ricostruzione, e che è quello che tiene vivi i modpack per centinaia di ore. Le ricerche sui forum dicono l'opposto: **il muro della ricostruzione è il punto in cui la gente smette.** Il ritratto ricorrente è sempre lo stesso — uno arriva a metà partita, si accorge che per salire deve demolire la fabbrica che gli è costata dieci ore, si prende una pausa "per ripartire con calma" e non torna più.

Su un telefono, dove una sessione dura cinque minuti, un lavoro di demolizione che richiede mezz'ora di attenzione continua non è un muro: è la fine della partita.

Quindi:

- **La macchina di livello 2 non sostituisce quella di livello 1**: gliela si mette accanto. Se la vecchia diventa inutile, il gradino è progettato male.
- **Un gradino nuovo si aggiunge in un posto nuovo.** Se l'unico modo di installarlo è liberare lo spazio dove sta la roba che va, il costo vero non sono i materiali: è lo smontaggio.
- **La ricchezza viene dal fatto che le catene si allungano, non dal fatto che si rifanno.** La segheria che produceva tavole per te continua a produrle, e adesso quelle tavole entrano in una macchina che prima non c'era.

Questo non toglie il *"rifinire sempre"*: rifinire vuol dire **aggiungere un pezzo alla catena e vedere il numero al minuto salire**, non ricominciare.

### La scala della corrente

| | Cosa è | Che domanda toglie |
| --- | --- | --- |
| **1** | **Bracere a legna** — raggio piccolo, mangia legno di continuo | *(è il problema)* |
| **2** | **Generatore a carbone** — stesso raggio, ma il carbone dura molto di più | *"devo riempirlo in continuazione"* |
| **3** | **Mulino ad acqua / a vento** — non consuma niente, ma rende meno e **va dove c'è acqua o vento** | *"devo alimentarlo"* — e rimette in gioco *"dove lo metto"* |
| **4** | **Caldaia a vapore** — copre mezza isola | *"la corrente"*, e non ci pensi più |

Nota il gradino 3: **non è un aggiornamento dritto.** È gratis ma vincolato dalla geografia, contro uno libero ma affamato. Sono una **scelta**, non una scala che sale e basta — ed è così che si evita che ogni gradino renda inutile il precedente.

### La scala del magazzino — la più lunga, e la più desiderata

| | Cosa è | Che domanda toglie |
| --- | --- | --- |
| **1** | **Zaino a caselle + casse sparse** | *(è il problema)* |
| **2** | **Il cassetto** — tiene tantissimo di **un materiale solo**, e da fuori si vede cos'è e quanto | *"in quale cassa l'avevo messo?"* |
| **3** | **I nastri** | *"devo portarcelo io"* |
| **4** | **Il terminale** — una rete che collega le casse: da un punto solo cerchi, vedi e prendi qualunque cosa | *"dov'è?"* |
| **5** | **Il terminale che fabbrica** — chiedi dieci telai e la rete li fa, prendendo i pezzi dove sono | *"quali passaggi servono?"* |

> **Il gradino 4 è un magazzino centrale, e la regola dice di no.** La contraddizione è solo apparente: **la regola vale per l'inizio.** Passi ore a girare fra le casse, e *poi* costruisci la cosa che cancella quella fatica. È il gradino più amato di tutto il Minecraft tecnico, e funziona **esattamente perché prima hai sofferto.** Regalato all'inizio non varrebbe niente.

> ### Il terminale va reso **lento**, non solo caro.
>
> Questo è il correttivo che le ricerche hanno aggiunto, e non è un dettaglio di bilanciamento: è la differenza fra un gradino e un tasto che spegne il gioco.
>
> Satisfactory ha lo stesso identico problema e lo ha risolto così. Il **Deposito Dimensionale** — prendi materiali da ovunque, cioè "niente più viaggi" — non è solo dietro un muro di ricerca: **ha una portata volutamente miserabile**, uno stack a **15 pezzi al minuto**, e il primo potenziamento arriva a 30. Sui forum qualcuno si lamenta che "non vale la fatica": è esattamente il segno che funziona.
>
> Da noi vuol dire che il terminale **non teletrasporta**. Tira dalle casse a una **portata dichiarata al minuto**, che si legge sullo schermo e che **si potenzia con altri progetti**. Se ti serve una cassa intera di tavole *adesso*, l'operaio ci va ancora. Il terminale toglie i viaggi di routine, non l'idea del viaggio.
>
> Se il costo fosse l'unico freno, succederebbe la cosa peggiore possibile: paghi caro una volta e da quel momento **metà dei sistemi del gioco — casse, nastri, posizione delle macchine — smettono di contare.** Un gradino che rende inutili quattro sistemi non è un premio: è la fine.

### La scala della lavorazione

| | Cosa è | Che domanda toglie |
| --- | --- | --- |
| **1** | **Banco da lavoro** — l'operaio deve stare lì | *(è il problema)* |
| **2** | **La macchina** — lavora da sola finché ha materiale | *"devo stare lì io"* |
| **3** | **La macchina alimentata dal nastro** | *"devo riempirla"* |
| **4** | **L'officina su richiesta** — chiedi il prodotto finito | *"quali passaggi servono"* |

### La scala dell'estrazione

| | Cosa è | Che domanda toglie |
| --- | --- | --- |
| **1** | **A mano** | *(è il problema)* |
| **2** | **La trivella** — produce da sola, ma il cassetto lo svuoti tu | *"devo scavare io"* |
| **3** | **Trivella + nastro** | *"devo andare a svuotarla"* |
| **4** | **Trivella pesante** — molto più veloce, mangia molta più corrente | *"non ne esce abbastanza"* |

### La scala dell'operaio

Attrezzi migliori: ascia, zaino, stivali, carriola. Ma il vero arco è un altro, e va detto:

> **Smette di essere un portatore e diventa quello che costruisce.** All'inizio il suo tempo se ne va tutto in viaggi; alla fine i viaggi li fanno i nastri, e lui serve solo per mettere giù le cose nuove. **È la vittoria, non la disoccupazione.**

## 11c. Non finisce, si rifinisce

> *"Una sorta di infinito da rifinire sempre."*

**Non c'è una costruzione finale.** Niente razzo, niente ascensore spaziale, niente schermata dei titoli.

Quello che c'è al posto suo sono **le scale qui sopra, che non finiscono**, e il **ciclo dei colli di bottiglia** — che è il vero motore documentato di tutti i giochi di questo genere:

> Risolvi il legno e ti manca la pietra. Metti la trivella e ti manca la corrente. Metti la caldaia e ti manca il carbone. Vai a prendere il carbone e ti accorgi che i nastri non ce la fanno.
>
> **Ogni soluzione fa nascere due problemi nuovi.** Non è un difetto: è il gioco.

Ne discende una regola per chiunque aggiunga contenuto:

> **Uno sblocco nuovo deve creare un collo di bottiglia altrove.** Se lo aggiungi e non manca niente da nessuna parte, hai aggiunto una decorazione.

### I tre motori del "per sempre", e perché da noi vanno messi **presto**

Nei giochi di riferimento c'è un finale — il razzo, l'ascensore spaziale — e quando arriva la maggioranza smette. Chi resta oltre il finale lo fa per tre motivi soltanto, che esistono già **molto prima** della fine:

| Motore | Cos'è | Da noi |
| --- | --- | --- |
| **Un numero da alzare** | ogni catena mostra un **al minuto**, e vederlo salire è la ricompensa | **non ce l'abbiamo** |
| **Un modo diverso di fare la stessa cosa** | le ricette alternative: non più potenza, ma un'altra strada, che ti fa venire voglia di rifare meglio quello che già funziona | **non ce l'abbiamo** |
| **Potenziamenti che non finiscono** | costo crescente all'infinito, dichiaratamente per chi resta | **non ce l'abbiamo** |

**Noi il finale non ce l'abbiamo per scelta** (è tutto questo paragrafo). Il che vuol dire che quei tre non sono un contentino per il dopo: **sono l'unico motore che avremo**, e vanno messi presto invece che in fondo.

Il primo è anche il più economico da costruire ed è quello che manca di più: **finché non c'è un numero al minuto da nessuna parte, il giocatore non ha modo di sapere se sta migliorando.** Va messo appena esiste una catena che produce da sola.

Attenzione a una trappola nel secondo motore: *"un modo diverso di fare la stessa cosa"* **non deve diventare un motivo per smontare** (§11b). La ricetta alternativa è interessante se la puoi mettere **accanto** a quella vecchia e confrontarle, non se ti obbliga a demolire la catena che avevi.

## 11d. Fuori dall'app — **le macchine sì, l'operaio no**

Chiudi l'app: **l'operaio si ferma.** È lui la risorsa scarsa, e il suo tempo non può passare mentre non guardi.

**Le macchine invece vanno avanti**, fino a un tetto di qualche ora. Riaprire è sempre premiato; aspettare non è mai la strategia migliore.

Non è una comodità: è **la ricompensa più forte che il gioco può dare all'automazione.** Finché fai tutto a mano, chiudere l'app vuol dire fermare il mondo. Quando la fabbrica gira da sola, chiudere l'app vuol dire **tornare e trovare le casse piene.** È la stessa lezione delle isole: automatizzare non è una comodità, è quello che ti compra il diritto di andartene.

## 12. Il ritmo — **non c'è nessun orologio**

**Non esiste il ciclo del giorno.** C'era, ed è stato tolto: serviva a far scadere i salari, e i salari sono caduti con l'operaio unico. Un timer che gira senza avere denti è solo un'ansia gratuita, e **"non c'è fretta"** è una delle cinque costanti del progetto.

Il ritmo lo danno gli **sblocchi**, non l'orologio: *mi mancano 40 monete al progetto della trivella* è un motivo per fare un altro viaggio. *Sta per finire il giorno* non lo è.

Niente scade, niente marcisce, niente si rompe se non torni. **Non si perde mai.**

### E nemmeno le commesse

> *"Le commesse non le voglio, l'obiettivo è la progressione."*

Erano previste, e sono state tolte prima di costruirle. Il motivo è lo stesso dell'orologio: **il desiderio ce l'ha già la bacheca dei progetti.** Se guardando la Trivella non la vuoi, un tizio che ti chiede quaranta tavole non risolve niente — sposta solo il problema. E se la vuoi, la commessa è un compito in mezzo fra te e quello che stavi già facendo.

**L'unico motore è la progressione:** vedi la cosa dopo, sai cosa ti manca, vai a prenderla.

## 13. Le tessere

L'isola è fatta di tessere, **ma non si devono vedere.** Servono solo a far agganciare le cose, esattamente come in Factorio — che è una griglia, e non sembra una scacchiera.

- **Le tessere non hanno bordi. Mai.**
- La variazione del terreno è una **macchia tonda** sfalsata, non un quadrato più chiaro. Un quadrato dentro una griglia di quadrati si legge come una scacchiera, ed è la cosa che l'autore ha rifiutato.
- La riva è una linea chiara dove la terra tocca l'acqua: è quella che fa leggere l'isola come un'isola.

Unica eccezione: **quando hai qualcosa in mano**, la tessera sotto il dito si illumina. Lì la griglia deve vedersi, perché stai piazzando e devi sapere dove va a finire. Appena riponi, sparisce.

## 14. Cosa questo gioco **non** è

Guardrail, da difendere in ogni decisione futura.

- **Non c'è un personaggio da muovere.** Rifiutato tre volte: non riproporlo.
- **Non è un puzzle game.** Niente moltiplicatori di adiacenza, niente incastri da ottimizzare.
- **Non c'è un magazzino centrale.** Le cose stanno in un posto e qualcuno le deve portare.
- **Niente si sposta da solo e niente ricresce da solo.** Ogni comodità va guadagnata.
- **Non si perde e non si sbaglia in modo irreversibile.**
- **Non c'è fretta.** Niente timer che scadono, niente che marcisce.
- **Non è un idle da guardare.** Se in una sessione non c'è almeno una decisione, il gioco è rotto lì.
- **Niente valuta premium, niente pubblicità, niente attese che si pagano.**
- **Niente attese a tempo messe lì per allungare.** Nessun raccolto che deve maturare, nessuna costruzione con un timer, nessun serbatoio che si riempie da solo mentre guardi. Sono chiamate *cancelli a tempo* e le fonti le descrivono come **il trucco più contro-il-consumatore che esista oggi nei giochi**. Non va confuso col tempo dell'operaio: **lui ci mette del tempo perché sta facendo qualcosa**, e quel tempo lo puoi comprare indietro. Un timer che scorre mentre nessuno lavora non è un costo, è un pedaggio.
- **Niente ricompense di accesso quotidiano.** Nessun regalo per aver aperto l'app, nessuna serie di giorni da non spezzare. È il modo standard di tenere la gente sui giochi da telefono, e fa esattamente il contrario di quello che vogliamo: trasforma l'apertura in **un dovere da non saltare**, mentre qui aprire deve essere una voglia. E se ci fosse una serie da non spezzare, "non c'è fretta" diventerebbe una bugia scritta due righe più sopra.
- **Non si smonta mai la fabbrica per poter salire di livello.** Vedi §11b: il muro della ricostruzione è documentato come il punto in cui la gente abbandona questo genere.
- **Nessun sistema può spegnere tutto insieme.** Vedi §10b.

## 15. Le domande che reggono tutto

Sono in ordine. Se una risponde no, quelle sotto non contano.

1. **Guardare l'isola e comandarla col dito è piacevole?**
2. **Guardando la bacheca dei progetti, ce n'è uno che vuoi?**
3. **Portare la roba a mano dà fastidio quel tanto che basta?** Deve essere una scocciatura che fa desiderare un nastro, non una noia che fa chiudere l'app.
4. **Quando arriva la prima macchina, si sente che ti ha ridato del tempo?**
5. **Ogni volta che sblocchi qualcosa, ti manca subito qualcos'altro?** Se un giorno hai abbastanza di tutto, il gioco è finito lì.

## 16. Una nota onesta sulla dimensione

Questa è di gran lunga la versione più grande del progetto: un mondo a tessere, una telecamera, crafting, macchine, nastri, più isole. **Non è una settimana di lavoro.**

Il rischio non è che l'idea sia sbagliata — Satisfactory e Graveyard Keeper esistono e funzionano. Il rischio è **costruire tutto prima di sapere se il pezzo centrale è divertente**, che è esattamente come sono morte le sei versioni precedenti.

Per questo la roadmap è ordinata così: prima si sistema **il comando**, poi si mettono **le due economie**, e ci si ferma a chiedere *"c'è un progetto che vuoi?"* prima di scrivere una sola riga di nastri.
