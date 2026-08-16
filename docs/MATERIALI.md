# I materiali, le ricette e il bilanciamento

Questo è il documento che l'agente `bilanciatore` usa come legge. Il `GDD.md` dice *perché*; qui c'è il *quanto*.

**I numeri di questo documento sono in parte misurati e in parte ancora no**, ed è scritto ogni volta quale dei due. La misura si fa con `npm run simula` (punto 7 della roadmap, fatto). Un numero ragionato è un punto di partenza coerente, non una verità.

> Le parti su **la curva ×1,5 dei progetti**, **la forbice che si allarga** e **la compressione mancante** vengono dalle ricerche in `docs/ricerche/` (sintesi in `SINTESI.md`). Sono legge di design, ma **i valori vanno ancora tarati**.

---

## 1. La lente con cui si guarda tutto

> ### Quanto vale un minuto dell'operaio?

C'è un operaio solo, quindi ogni cosa che fa si può misurare in **monete al minuto del suo tempo**. È l'unico numero che permette di confrontare cose diverse fra loro: tagliare alberi, scavare rame, riempire una segheria, andare a svuotare una trivella.

Il gioco funziona quando questo numero **sale a scatti**, e ogni scatto ha un nome che il giocatore riconosce:

| Momento | Cosa è cambiato |
| --- | --- |
| Inizio, tutto a mano | il valore di base |
| Prima ascia migliore | stesso lavoro, meno secondi |
| Prima cassa vicino al bosco | stesso lavoro, meno viaggi |
| Prima macchina | il valore del materiale si moltiplica |
| Prima trivella | una fonte produce mentre lui fa altro |
| Primo nastro | non deve più andarci |

**Se uno di questi scatti non si sente, quello sblocco è sbagliato** — non è questione di numeri, è questione che non serviva.

## 2. I livelli dei materiali

| Livello | Cosa è | Dove nasce | Ingredienti |
| --- | --- | --- | --- |
| **0** | materia prima | l'isola | — |
| **1** | semilavorato | una macchina dedicata | 1 |
| **2** | componente | l'officina | 1–3 |
| **3** | macchinario e attrezzo | l'officina + un **progetto** | 2–3 |

### Le tre regole di forma, non negoziabili

1. **Una ricetta non produce mai un materiale che consuma.** Altrimenti rimetti l'uscita in entrata e hai materia infinita. Nessun bilanciamento aggiusta questo. → *controllato dal codice all'avvio*
2. **Mai più di tre ingredienti diversi.** Su un telefono una ricetta a cinque voci non si legge, e diventa una lista della spesa invece che un incrocio. → *controllato dal codice all'avvio*
3. **Ogni livello deve contenere almeno una ricetta che fa incontrare due catene diverse.** È quello che rende una fabbrica interessante: in Factorio le piastre di ferro sono noiose e i circuiti no, e la differenza è esattamente questa.

## 3. La scala dei prezzi — la regola del ×1,5

> **Il prezzo di un prodotto sta fra la somma dei suoi ingredienti e due volte e mezzo quella somma.**

- **Sotto la somma:** lavorare è una perdita, e nessuno lavorerà mai. La macchina diventa arredamento.
- **Sopra il ×2,5:** c'è una sola cosa sensata da fare, tutti la fanno, e il gioco è risolto.

Il valore di riferimento è **×1,5–1,6**. Con quel rapporto una catena a tre livelli moltiplica il valore per circa quattro volte — abbastanza da sentirsi, non tanto da rompere.

### Quello che c'è adesso (punti 4-6, **costruito e provato**)

**Livello 0 — materie prime**

| Materiale | Prezzo | Da dove | Pila |
| --- | --- | --- | --- |
| Legno | 3 | alberi — **non ricrescono**, si ripiantano | 12 |
| Pietra | 4 | vena, non finisce mai | 10 |
| Rame | 5 | vena, non finisce mai | 10 |
| Alberello | 1 | esce tagliando un albero | 8 |

**Livello 1-2 — al banco da lavoro, a mano**

| Ricetta | Prezzo unitario | Rapporto | Note |
| --- | --- | --- | --- |
| 1 legno → **2 tavole** | 2 | 1,33 | *la segheria ne darà 3: è quello il suo valore* |
| 1 pietra → **2 ghiaia** | 3 | 1,50 | |
| 1 rame → **4 chiodi** | 2 | 1,60 | |
| 4 tavole + 6 chiodi → **1 telaio** | 32 | 1,60 | **legno × rame: le due catene si incontrano** |

> **Il salto di livello si vede due volte.** La segheria non fa solo *più in fretta*: fa **3 tavole invece di 2**. Un gradino che migliora sia il rapporto sia il tempo dell'operaio si sente due volte, ed è il modo giusto di far desiderare una macchina.

**Livello 3 — attrezzi: progetto in monete, poi ricetta in materiali**

| Attrezzo | Progetto | Ricetta |
| --- | --- | --- |
| Ascia affilata | 120 | 3 tavole + 4 chiodi |
| Zaino grande | 160 | 4 tavole + 6 chiodi |
| Stivali buoni | 210 | 1 telaio |
| Piccone pesante | 260 | 1 telaio + 6 ghiaia |
| Vivaio | 450 | 1 telaio + 8 tavole |
| Carriola | 520 | 2 telai + 8 chiodi |

### ⚠️ Prima di tutto: **i prezzi non fanno la durata**

> **Il numero di progetti fa le ore. Il prezzo dei progetti fa il ritmo.**

È la regola più importante di questo documento, e va letta prima delle altre perché le altre servono a poco se si sbaglia questa. Se il gioco risulta troppo corto — e **oggi lo è: 13,5 minuti misurati** — la risposta **non** è alzare i costi. Alzare i costi allunga il tempo lasciandolo identico: il giocatore ripete di più le stesse identiche cose. Ha un nome nel settore ed è *padding*.

La durata si allunga in quattro modi, in ordine di valore: **più cose da comprare**, **più verbi**, **costi che salgono insieme a un salto di produzione**, **una ripetizione resa più profonda**. La taratura dei prezzi serve a decidere **quale progetto sembra il prossimo** e **se il salto si sente** — non quanto dura il gioco.

### ⚠️ Il buco nella regola dei prezzi: **mancava il tempo dell'operaio**

La regola 1 di questo documento dice che il prezzo di un prodotto deve stare fra la somma degli ingredienti e due volte e mezza quella somma, *"altrimenti lavorare è una perdita e nessuno lavorerà mai"*. **Quella regola guarda solo i prezzi, e in questo gioco è la metà sbagliata del conto.**

Ecco cosa succede davvero, con i numeri di adesso e la resa misurata di **2,77 monete al secondo** a mani nude:

| Lavorazione a mano | vale in più | ci mette | quel tempo varrebbe | **netto** |
| --- | --- | --- | --- | --- |
| 1 legno → 2 tavole | +1 | 2,0 s | 5,5 | **−4,5** |
| 1 pietra → 2 ghiaia | +2 | 2,4 s | 6,6 | **−4,6** |
| 1 rame → 4 chiodi | +3 | 2,6 s | 7,2 | **−4,2** |

> **Raffinare prima di vendere è sempre una perdita.** Non di poco: si perdono quattro o cinque monete ogni volta. Nei due secondi passati a segare, l'operaio avrebbe raccolto più valore di quanto la segatura ne aggiunga.

Il paradosso è che la regola era scritta con le parole giuste — *"lavorare è una perdita"* — ma controllava la cosa sbagliata. In un gioco la cui lente è **"quanto vale un minuto dell'operaio"**, il documento dei numeri si era dimenticato la lente.

**La regola corretta:**

> ### Una lavorazione a mano deve rendere più del tempo che costa.
> `guadagno > tempo_lavorazione × monete_al_secondo`. Se non ci arriva, quella ricetta **non è per vendere**: esiste solo per fabbricare qualcos'altro, e va scritto.

**E qui c'è la cosa bella**, perché spiega a cosa servono davvero le macchine:

> La stessa lavorazione fatta da una **macchina** non costa niente all'operaio — lui la carica e se ne va. La segheria (1 legno → **3** tavole, cioè +3 invece di +1) trasforma una lavorazione **in perdita a mano** in una lavorazione **in guadagno da sola**.
>
> Non è un dettaglio di bilanciamento: è **il motivo per cui la prima macchina si desidera**. Non fa "la stessa cosa più in fretta" — fa una cosa che a mano *non conveniva fare*.

### La soglia del 15%: **sotto, un miglioramento non esiste**

Due ricerche indipendenti arrivano allo stesso numero da strade diverse. Vale in due sensi:

- **un oggetto** che migliora qualcosa di meno del 15% è **invisibile**, non "poco utile". Non si ritocca: si toglie o si ripensa;
- **fra un progetto e il successivo** si deve aspettare **dal 15% al 20% in più**. Meno, e i due si accavallano; molto di più, e diventa un muro.

Lo Zaino grande, misurato ×1,00, è il caso da manuale: non è caro, **è invisibile**.

### La curva dei costi dei progetti — **×1,5, ma solo insieme alla produzione**

I costi qui sopra (120, 160, 210, 260, 450, 520) sono stati messi a occhio, uno dopo l'altro. La ricerca sui giochi di riferimento dice che la curva giusta è **geometrica, e il passo è di nuovo ×1,5**:

| Progetto | Costo con la curva |
| --- | --- |
| 1° | **120** |
| 2° | **180** |
| 3° | **270** |
| 4° | **405** |
| 5° | **608** |

> ### ⚠️ Il ×1,5 da solo non vuol dire niente
> **Non esiste "la curva dei costi".** Esiste solo il rapporto fra **quanto costa** e **quanto produci**: è quello il tempo che il giocatore aspetta, ed è l'unica cosa che sente.
>
> Il ×1,5 vale **se e solo se la produzione cresce di circa ×1,3 a ogni progetto**. Con produzione a ×1,2 lo stesso ×1,5 rende il gioco un muro. **Quando si tocca uno dei due numeri si tocca l'altro**, e si verifica con `npm run progressione`.

Il motivo per cui deve essere geometrica e non a passi liberi è che **la produzione al minuto del giocatore cresce anch'essa in modo geometrico**: ogni macchina moltiplica, non aggiunge. Se i costi crescono a passi lineari mentre la produzione moltiplica, dopo tre sblocchi il quarto arriva da solo mentre stai facendo altro — e il desiderio si spegne.

Il controllo resta quello del §6: **costo del prossimo progetto diviso la produzione attuale al minuto, fra 4 e 12 minuti.** La curva ×1,5 è il modo di restare dentro quella finestra senza doverla ricalcolare a ogni aggiunta.

> **Da tarare, non ancora applicata.** Cambiare sei costi insieme è esattamente quello che il §8 vieta. Va fatta dal `bilanciatore`, misurando con `npm run simula`, e va provata: la curva è più ripida di quella attuale nella parte alta (608 contro 520) e più ripida anche in mezzo (270 contro 210).

### Dopo un oggetto che alza il reddito, il prezzo dopo salta di più

È un difetto che abbiamo davvero, e si vede solo misurando la partita intera:

> Il **Vivaio** (450) arriva dopo 4,6 minuti di attesa. La **Carriola** (520), che costa di più, arriva dopo **2,8**.

Il buco **si accorcia** proprio alla fine, cioè dove dovrebbe stringere. La causa non è il prezzo della Carriola: è che il Vivaio ha alzato il reddito, e il prezzo successivo non ne ha tenuto conto.

> **Regola:** dopo un progetto che aumenta quanto produci al minuto, il costo del progetto seguente deve salire **più del passo normale** — quanto basta a tenere l'attesa dentro il +15-20%. Il controllo non è sul prezzo: è sul **buco misurato**.

### La forbice che si allarga — perché un potenziamento non regala mai il 100%

Presa da Mekanism, ed è il modello di progressione più raffinato che le ricerche hanno trovato. Quando una macchina si potenzia, **il guadagno per ogni gradino cala mentre il costo sale**:

| Gradino | Quanto rende in più |
| --- | --- |
| 1° | **+100%** |
| 2° | **+50%** |
| 3° | **+33%** |
| 4° | **+25%** |

Sono i rendimenti decrescenti classici, ma la parte intelligente è **cosa fa il giocatore quando li vede**: siccome il quarto gradino rende poco e costa tanto, a un certo punto conviene **costruire una seconda macchina invece di potenziare la prima**. E quello è il momento in cui il giocatore scopre da solo che la fabbrica si allarga, invece che sentirselo dire.

> **Regola pratica:** un potenziamento non deve mai rendere quanto costruire una macchina in più, oltre il secondo gradino. Se lo fa, la fabbrica non crescerà mai in larghezza, e *"the factory must grow"* diventa *"the machine must upgrade"*, che è un altro gioco.

### Manca una **compressione**

Le catene di adesso vanno tutte in una direzione sola: **1 cosa diventa più cose** (1 legno → 2 tavole, 1 pietra → 2 ghiaia, 1 rame → 4 chiodi). Le ricerche fanno notare che nei giochi di riferimento esiste sempre anche il movimento contrario: **molte cose diventano una cosa sola, più densa e più preziosa.**

Serve a due cose, e la seconda conta più della prima:

1. **Il valore per casella sale**, quindi un viaggio rende di più senza toccare lo zaino.
2. **Dà una risposta al problema dello spazio che non sia "più casse"** — ed è il tipo di soluzione che un giocatore trova da solo e si sente furbo.

Forma tipica: `9 ghiaia → 1 blocco di pietra`, che si può anche rifare al contrario. Attenzione: **una compressione reversibile deve perdere qualcosa** (o costare tempo, o rendere 8 invece di 9), altrimenti comprimere e decomprimere è materia gratis in un altro vestito — e ricade nel muro del §2.1.

> 💡 **Da aggiungere quando arrivano le macchine dell'Era 1**, non prima: a mano una compressione è solo un tocco in più.

### Quello che arriverà (le macchine, punto 8 in poi)

Lingotti e fornace **non esistono ancora**, e non è una dimenticanza: fondere è una macchina, e le macchine arrivano al punto 8. Quando ci saranno:

| Ricetta | Macchina | Rapporto |
| --- | --- | --- |
| 1 legno → **3 tavole** | Segheria | 2,00 |
| 2 rame → **1 lingotto di rame** | Fornace | 1,60 |
| 2 ferro → **1 lingotto di ferro** | Fornace | 1,57 |
| 1 lingotto di ferro + 2 ghiaia → **1 lastra** | Officina | 1,61 |

> **Un macchinario non si vende.** Se si potesse rivendere, la cosa più redditizia sarebbe fabbricare macchine per il mercante invece di usarle — e il gioco diventerebbe una catena di montaggio verso il negozio, non una fabbrica.

### Il combustibile: la fiamma da sola contro il generatore (punto 12, **costruito**)

Un pezzo di combustibile paga **quanti millisecondi di lavoro di una macchina**. È l'unica unità con cui i due modi si possono confrontare, e sta in `costruzioni.json`.

| | Quanto lavoro paga 1 legno | Dove lo carichi |
| --- | --- | --- |
| **La fiamma della segheria** | 4 lavorazioni × 3.000 ms = **12.000 ms** | in ogni macchina, una per una |
| **Il generatore** | **16.000 ms** | in un posto solo, per tutte quelle che copre |

**Il guadagno vero non è il 33% di combustibile**, è la seconda colonna: la domanda che sparisce dalla testa è *"devo riempire ogni macchina una per una"*. Il 33% serve solo perché attaccarsi alla corrente non sia mai un peggioramento.

> ⚠️ **Il gioco lo controlla all'avvio.** Se `ms_per_combustibile` del generatore scendesse sotto quello che una macchina paga da sola, il gioco si rifiuta di partire: sarebbe una cosa che costa tre lingotti e **peggiora** la fabbrica, e nessuno capirebbe perché.

I raggi sono in tessere: **generatore 4**, **palo 3**. Un palo si aggancia da solo se sta nel raggio di un nodo già acceso, e da lì ne accende altri.

## 4. Il rubinetto — quanto entra sull'isola al minuto

I giacimenti **non si esauriscono**, quindi il limite non è quanto ce n'è: è **quanto ne esce al minuto**. Quel tetto è la cosa che rende la crescita un problema.

### La ricchezza di un giacimento

Come in Satisfactory, ogni giacimento ha un moltiplicatore:

| Ricchezza | Moltiplicatore |
| --- | --- |
| Povero | ×0,5 |
| Normale | ×1 |
| Ricco | ×2 |

Serve a **rendere i posti diversi fra loro**: un giacimento ricco lontano contro due poveri vicini è una decisione vera di dove mettere la fabbrica, e non costa niente costruirla.

### I due gradini dell'estrazione

| | Resa | Cosa costa |
| --- | --- | --- |
| **A mano** | poco per viaggio | **tutto** il tempo dell'operaio |
| **Trivella** | in continuo nel suo cassetto | solo il tempo di andarla a svuotare |

**La trivella deve rendere circa quattro volte l'estrazione a mano**, contando il tempo che serve a svuotarla. Meno di tre e non vale il progetto; più di sei e scavare a mano diventa una cosa che nessuno rifarà mai — e i primi minuti del gioco sono fatti di quello.

## 5. Il tempo di ammortamento — il controllo che ammazza l'arredamento

> **Ogni macchina dichiara in configurazione in quanti minuti si ripaga**, lavorando in continuo, e il gioco lo verifica.

```
minuti_di_ammortamento = costo_in_monete_equivalenti / guadagno_al_minuto
```

Valori di riferimento:

| Tipo | Si deve ripagare in |
| --- | --- |
| Attrezzo (ascia, zaino) | **3–8 minuti** |
| Macchina di lavorazione | **8–20 minuti** |
| Trivella | **10–25 minuti** |
| Nastro | non si misura così — **compra tempo, non monete** |

**Sopra i 30 minuti una cosa è arredamento** e va tolta, non ritoccata. Sotto i 3 non è una decisione: è una cosa che compri e basta, e una cosa che compri e basta non è un gioco.

> ### Il combustibile entra nel conto, e non come una tassa
> Dall'Era 1 in poi le macchine **bruciano legno**, e quel legno va sottratto dal guadagno al minuto: una segheria che produce 20 monete al minuto ma ne brucia 6 di legno, ne rende 14. Il tempo di ammortamento si calcola **sul netto**.
>
> Ma la parte importante non è il conto: è che **il combustibile lo carica l'operaio**, quindi ogni macchina in più gli ricompra un pezzo di tempo *e* gliene ruba un altro. È voluto — è la contromisura che tiene scarsa la risorsa scarsa (`GDD.md` §2). Nel bilanciarlo:
>
> - il costo del combustibile **non deve mai superare un terzo** del guadagno lordo, o la macchina si sente come una tassa invece che come un aiuto;
> - **non deve nemmeno scendere sotto un decimo**, o il rifornimento non si nota e la contromisura non funziona.

## 6. La domanda deve crescere più in fretta del rubinetto

*"The factory must grow"*, e viene dritto da Factorio.

Ogni progetto nuovo deve chiedere **più di quanto l'isola dia adesso al minuto**, così che sbloccarlo obblighi a mettere una fonte in più o una macchina in più. Il momento in cui hai abbastanza di tutto è il momento in cui il gioco finisce.

Il controllo pratico, da fare con la simulazione: **il costo del prossimo progetto diviso la produzione attuale al minuto deve stare fra 4 e 12 minuti.** Sotto i 4 gli sblocchi si accavallano e non si assapora niente; sopra i 12 diventa un'attesa.

## 7. Cosa vende e cosa compra il mercante

Il mercante sta **al casotto**, e non ti segue: dalle altre casse non si vende, e portarci la roba fa parte del prezzo. Serve a due cose sole:

- **Compra** quello che ti avanza, al prezzo di listino. È così che entrano le monete.
- **Vende i progetti** — il *diritto* di costruire una cosa — e i pochi materiali che l'isola dove ti trovi non dà.

**Non vende macchine finite.** Il progetto è la conoscenza, la macchina la fabbrichi tu: è la separazione fra le due economie del `GDD.md` §3, ed è quello che tiene vive tutte e due per tutta la partita.

## 8. La lista di controllo prima di toccare un numero

1. Ho letto `GDD.md` §10 e questo documento?
2. Il rapporto prezzo/ingredienti sta fra 1,0 e 2,5?
3. La macchina si ripaga fra i 3 e i 30 minuti?
4. La ricetta ha al massimo tre ingredienti, e nessuno di essi è quello che produce?
5. Lo sblocco **restituisce tempo all'operaio in modo che si senta**, o dà un verbo nuovo?
6. Sto cambiando **meno di quattro valori insieme**? Di più e non si capisce cosa ha funzionato.
