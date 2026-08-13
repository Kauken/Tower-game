# I materiali, le ricette e il bilanciamento

Questo è il documento che l'agente `bilanciatore` usa come legge. Il `GDD.md` dice *perché*; qui c'è il *quanto*.

**Tutti i numeri di questo documento sono ragionati, non misurati.** Vanno tarati con la simulazione headless (punto 7 della roadmap). Fino ad allora sono un punto di partenza coerente, non una verità.

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

### Quello che arriverà (le macchine, punto 8 in poi)

Lingotti e fornace **non esistono ancora**, e non è una dimenticanza: fondere è una macchina, e le macchine arrivano al punto 8. Quando ci saranno:

| Ricetta | Macchina | Rapporto |
| --- | --- | --- |
| 1 legno → **3 tavole** | Segheria | 2,00 |
| 2 rame → **1 lingotto di rame** | Fornace | 1,60 |
| 2 ferro → **1 lingotto di ferro** | Fornace | 1,57 |
| 1 lingotto di ferro + 2 ghiaia → **1 lastra** | Officina | 1,61 |

> **Un macchinario non si vende.** Se si potesse rivendere, la cosa più redditizia sarebbe fabbricare macchine per il mercante invece di usarle — e il gioco diventerebbe una catena di montaggio verso il negozio, non una fabbrica.

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
