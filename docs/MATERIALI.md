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

### La scala proposta

**Livello 0 — materie prime**

| Materiale | Prezzo | Da dove | Isola |
| --- | --- | --- | --- |
| Legno | 3 | alberi (**non ricrescono**, si ripiantano) | 1 |
| Pietra | 4 | giacimento | 1 |
| Rame | 5 | giacimento | 1 |
| Carbone | 5 | giacimento | 2 |
| Ferro | 7 | giacimento | 2 |

**Livello 1 — semilavorati**

| Ricetta | Macchina | Prezzo unitario | Rapporto |
| --- | --- | --- | --- |
| 1 legno → **3 tavole** | Segheria | 2 | 2,00 |
| 1 pietra → **2 ghiaia** | Frantoio | 3 | 1,50 |
| 2 rame → **1 lingotto di rame** | Fornace | 16 | 1,60 |
| 2 ferro → **1 lingotto di ferro** | Fornace | 22 | 1,57 |

> Il legno **moltiplica in quantità** (1 → 3), i minerali **migliorano in qualità** (2 → 1 che vale di più). Sono due sensazioni diverse di proposito: la prima è quella che l'autore ha chiesto (*"1 legno si duplica e triplica"*), la seconda è quella che tiene in piedi il rubinetto.

**Livello 2 — componenti**

| Ricetta | Prezzo unitario | Rapporto | Catene che incontra |
| --- | --- | --- | --- |
| 1 lingotto di rame → **8 chiodi** | 3 | 1,50 | — |
| 1 lingotto di rame → **3 cavi** | 7 | 1,31 | — |
| 2 lingotti di ferro → **1 ingranaggio** | 70 | 1,59 | — |
| 1 lingotto di ferro + 2 ghiaia → **1 lastra** | 45 | 1,61 | **metallo × pietra** |
| 4 tavole + 6 chiodi → **1 telaio** | 42 | 1,62 | **legno × rame** |

**Livello 3 — macchinari e attrezzi**

Non hanno un prezzo di vendita: **non si vendono.** Hanno un costo in materiali e un **progetto** da comprare in monete.

| Cosa | Progetto (monete) | Ricetta |
| --- | --- | --- |
| Cassa | — (c'è dall'inizio) | 6 tavole + 4 chiodi |
| Ascia affilata | 120 | 2 tavole + 2 lingotti di rame |
| Zaino grande | 160 | 4 tavole + 6 chiodi |
| Segheria | 240 | 1 telaio + 2 ingranaggi + 4 tavole |
| Frantoio | 260 | 1 telaio + 2 lastre |
| Fornace | 300 | 8 ghiaia + 1 telaio |
| Trivella | 450 | 2 ingranaggi + 2 lastre + 1 telaio |
| Nastro (×3 pezzi) | 520 | 1 lastra + 1 ingranaggio |
| Pontile | 700 | 20 tavole + 8 chiodi + 2 telai |

> **Perché un macchinario non si vende.** Se si potesse rivendere, la cosa più redditizia sarebbe fabbricare macchine e venderle invece di usarle — e il gioco diventerebbe una catena di montaggio verso il mercante, non una fabbrica.

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

Il mercante sta al casotto, e serve a due cose sole:

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
