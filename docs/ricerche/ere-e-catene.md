# Ere tecnologiche e catene di lavorazione — ricerca

> Ricerca su **struttura e numeri**: quanto si moltiplica, quanto costa moltiplicare, come si tagliano le ere.
> Non parla di sensazioni: quelle stanno in `perche-si-smette.md`.
> Le proposte finali sono allineate a `docs/MATERIALI.md` (dove cambio qualcosa, lo dico).
> Quello che non ho trovato è scritto `[NON TROVATO]` invece di essere inventato.

---

## In una riga

**Il guadagno cresce poco (×2, ×3, ×4, ×5: sempre +1) mentre il costo cresce tanto (1, 3, 5, 8 macchine): è questa forbice che rende l'ultimo gradino una scelta e non un obbligo.**

---

## 1. Le tabelle della moltiplicazione

### Mekanism — il caso più studiato, e il più vicino a noi

Da 1 minerale = 1 lingotto fino a 1 minerale = 5 lingotti, in quattro gradini.

| Gradino | Resa | Catena (passaggi in fila) | Macchine in catena | Macchine NUOVE | Serve un gas o un liquido? |
|---|---|---|---|---|---|
| 0 | ×1 | Minerale → fornace | 1 | — | no |
| 1 | ×2 | Minerale → Camera di Arricchimento → 2 polveri → fornace | 2 | +1 | no |
| 2 | ×3 | Minerale → Purificazione → 3 grumi → Frantumatore → 3 polveri sporche → Arricchimento → 3 polveri → fornace | 4 | +2, più il separatore elettrolitico che produce l'ossigeno | sì: ossigeno |
| 3 | ×4 | Minerale → Iniezione Chimica → 4 schegge → poi tutta la catena ×3 | 5 | +1 in catena, più l'Infusore che fabbrica l'acido cloridrico | sì: ossigeno + acido cloridrico |
| 4 | ×5 | Minerale → Dissoluzione → fanghi sporchi → Lavaggio → fanghi puliti → Cristallizzatore → cristalli → poi tutta la catena ×4 | 8 | +3 | sì: 3 gas + acqua |

**La forbice — la cosa da copiare:**

| Da → a | Guadagno reale | Macchine in più | Gas nuovi |
|---|---|---|---|
| ×1 → ×2 | **+100 %** | +1 | 0 |
| ×2 → ×3 | **+50 %** | +2 | +1 |
| ×3 → ×4 | **+33 %** | +1 | +1 |
| ×4 → ×5 | **+25 %** | +3 | +1 |

Il guadagno si dimezza a ogni gradino, il costo no. Per questo la maggior parte dei giocatori si ferma al ×3 o al ×4 finché non ha corrente e spazio da buttare. **Il ×5 non è obbligatorio: è un lusso.** È esattamente il meccanismo che tiene viva la scelta.

`[NON TROVATO]` i valori esatti di energia e di durata per singola macchina. L'unico numero citabile trovato è la Camera di Arricchimento a **4,8 kW di picco**, ma viene da una versione vecchissima del mod e non lo userei.

### Immersive Engineering — il contro-esempio importante

| Gradino | Resa | Come |
|---|---|---|
| 0 | ×1 | fornace |
| 1 | ×2 | Frantumatore (multiblocco grande) → 2 granuli → fornace |

**Si ferma a ×2 e basta.** Niente ×3, ×4, ×5. Tutta la difficoltà sta nel **costruire la macchina** — un multiblocco fatto di decine di pezzi — e nel portarle la corrente. Prova che una scala lunga di moltiplicatori **non serve** per fare un buon gioco di produzione: la profondità si può mettere nel *costo di costruzione* invece che nel *numero di passaggi*. Per un gioco da telefono è la lezione più utile di tutta la ricerca.

### Thermal (Thermal Expansion / Thermal Series)

| Gradino | Resa | Come | Cosa costa in più |
|---|---|---|---|
| 0 | ×1 | fornace | — |
| 1 | ×2 | Polverizzatore → 2 polveri + piccola probabilità di sottoprodotto | 1 macchina |
| 2 | ×3 | Fonditore a Induzione: minerale + un **catalizzatore consumabile** (sabbia, scoria ricca, cinabro) → 3 lingotti | 1 macchina + un consumo a ogni ciclo |

Punto strutturale: il terzo gradino **non costa più macchine, costa un consumabile**. È un secondo modo di far pagare la moltiplicazione — invece di "più impianto", "più input a ogni ciclo". Per noi è più leggibile di una catena lunga: una casella in più nella ricetta invece di tre macchine in più sull'isola.

`[NON TROVATO]` le percentuali esatte dei sottoprodotti.

### Satisfactory — moltiplicare con un liquido invece che con una catena

| Ricetta | Input | Output | Moltiplicatore |
|---|---|---|---|
| Lingotto di ferro (base) | 1 minerale | 1 lingotto | ×1 |
| **Lingotto di ferro puro** (raffineria) | 7 minerale + 10 acqua | 13 lingotti | **×1,86** |
| Lingotto di rame (base) | 1 minerale | 1 lingotto | ×1 |
| **Lingotto di rame puro** (raffineria) | rame + acqua, rapporto 1:2 | | **×2** |

Confronto pratico citato dalle fonti: per **60 lingotti di ferro al minuto** servono **60 minerali** con la fonderia, oppure **circa 32 minerali + 46 acqua** con la raffineria.

Struttura: la moltiplicazione non è un gradino della catena, è una **ricetta alternativa** che si sblocca più tardi e chiede un secondo ingrediente abbondante. Costa una macchina più grande e una tubatura, non cinque macchine in fila. **Terzo modo di far pagare il moltiplicatore.**

### GregTech / GT: New Horizons

Il moltiplicatore principale resta basso (circa ×2 sul metallo), ma la catena serve a **tirare fuori sottoprodotti diversi** dallo stesso minerale.

| Passaggio | Cosa fa |
|---|---|
| Macinatore | minerale → 2 minerale frantumato |
| Lavatore (acqua) | frantumato → purificato + polvere di sottoprodotto + polvere di pietra |
| Centrifuga Termica | frantumato o purificato → centrifugato + sottoprodotto |
| Macinatore (di nuovo) | purificato o centrifugato → polvere |
| Separatore Elettromagnetico / Bagno Chimico / Setaccio | rami laterali per gemme e metalli rari |

Rotte alternative documentate per lo stesso minerale: `macina → macina → lava`, `macina → centrifuga → macina`, `macina → lava → macina → lava`. Ogni minerale ha una rotta ottimale **diversa**, e la rotta migliore cambia nel tempo. Il giocatore non costruisce "la catena": costruisce **uno smistamento**. È il massimo del genere e su telefono non è replicabile — ma il principio "il valore non è il moltiplicatore, è il sottoprodotto" sì.

### I tre modi di far pagare una moltiplicazione — riassunto

| Modo | Chi lo usa | Costo per il giocatore | Adatto al telefono? |
|---|---|---|---|
| **Più macchine in fila** | Mekanism | spazio, corrente, tempo di costruzione | poco: la catena diventa illeggibile |
| **Un consumabile in più nella ricetta** | Thermal | una risorsa da produrre in continuo | **sì**: una casella in più |
| **Una macchina più grande e più cara** | Immersive, Satisfactory | un investimento singolo grosso | **sì**: una decisione sola, chiara |

Per il nostro gioco i modi 2 e 3 sono quelli giusti. Il modo 1 no.

---

## 2. La forma del grafo delle ricette

| Gioco | Ingredienti per ricetta | Semilavorati totali | Forma |
|---|---|---|---|
| Factorio (base) | quasi sempre **1, 2 o 3**; 4+ è raro e solo per oggetti finali | **circa 20** per tutta la partita | albero con pochi incroci |
| Satisfactory | 1–3 in gran parte, 4 sui prodotti finali | qualche decina su 9 tier | albero + ramo liquidi |
| Mekanism | 1–2 per passaggio | 6 stati intermedi per un solo minerale (grumo, polvere sporca, polvere, scheggia, cristallo, fanghi) | **fila**, non albero |
| GregTech / GTNH | 1–3, ma centinaia di materiali | migliaia | rete, serve un motore di ricerca in gioco |

**La regolarità: tre ingredienti è il tetto naturale.** Non è una scelta di stile, è il limite oltre il quale il giocatore smette di ricordare la ricetta a memoria. La regola già fissata in `MATERIALI.md` (mai più di tre) coincide con la pratica dei giochi migliori — non va toccata.

### Dove due catene si incontrano

In Factorio gli incontri sono pochi e sono i momenti che la gente ricorda:

| Oggetto | Ricetta | Chi incontra chi |
|---|---|---|
| Circuito verde | piastra di ferro + cavo di rame | **ferro × rame** |
| Acciaio | 5 piastre di ferro → 1 acciaio | nessuno: è una **compressione** |
| Circuito rosso | circuito verde + plastica + cavo di rame | **petrolio × metallo** |
| Motore | ferro + acciaio + tubo | metallo × metallo |

**Gli incontri sono circa 1 ogni 4-6 semilavorati, non a ogni passaggio.** Se tutte le ricette mescolano tutto, nessuna sembra speciale. Il telaio del nostro gioco funziona proprio perché è l'unico.

### Le compressioni contano quanto le moltiplicazioni

L'acciaio di Factorio (5 → 1) e i mattoni di quasi tutti i giochi vanno nella direzione opposta: consumano tanto e producono poco. Servono a dare un motivo per produrre in eccesso. **Una catena fatta solo di ×2 e ×3 è inflazione: le compressioni sono lo scarico.** Nel nostro gioco oggi le compressioni non esistono ancora — è il buco più grosso della catena attuale.

---

## 3. Le ere

### Come sono tagliate nei giochi studiati

| Gioco | Quante ere | Nomi dei tagli | Cosa apre la successiva |
|---|---|---|---|
| **GregTech / GTNH** | 15 (14 implementate) | Pietra, Vapore, LV, MV, HV, EV, IV, LuV, ZPM, UV, UHV, UEV, UIV, UMV, UXV | **un oggetto chiave**: la Caldaia a Carbone apre l'Era del Vapore; il primo Circuito Elettronico (che serve per la Turbina a Vapore) apre LV. Da LV in poi **ogni era ha 4× la potenza della precedente** |
| **Satisfactory** | 9 tier (0–8/9) | Tier 0 = tutorial, poi a coppie | **una quantità da consegnare** all'Ascensore Spaziale: Fase 1 apre i tier 3-4, Fase 2 i 5-6, Fase 3 i 7-8, Fase 4 il 9 |
| **Factorio** | 7 | i sette colori delle boccette (rossa, verde, militare, blu, viola, gialla, bianca) | **produrre un oggetto nuovo**: la boccetta stessa. Se la sai fare, hai l'era |
| **SevTech: Ages** | 6 (Età 0–5) | Pietra, Bronzo, Medioevo, Industriale… | un **traguardo obiettivo** che porta a un **traguardo sfida**: un oggetto chiave da fabbricare |
| **Mekanism** | 4, dentro una sola catena | ×2, ×3, ×4, ×5 | costruire la macchina che aggiunge un passaggio |

**7-9 tagli è la lunghezza normale di un gioco di produzione completo su PC.** GregTech con 15 è l'eccezione estrema.

### Quante ore dura un'era

Questo è il dato più difficile. **Nessun wiki ufficiale pubblica le ore per era, per nessuno dei giochi.** Ho cercato più volte. Quello che sono riuscito a verificare:

| Gioco | Durata totale | Cosa si sa delle singole ere |
|---|---|---|
| **Factorio** | 15–30 h per chi sa giocare; **35–50 h è comune per un principiante**; un caso citato di 142 h alla prima partita senza aiuti; record di velocità sotto le 3 h | scienza **rossa: circa 20 minuti** per metterla su. Scienza **verde: circa 30 minuti**. Poi il muro: blu, viola, nera e gialla arrivano tutte insieme ed è lì che la gente si blocca |
| **GTNH** | un giocatore ha finito con **3.990 h totali, 2.200 h di gioco vero** (senza il tempo da fermo) | media ~150 h a era su 14 ere, ma le prime sono molto più corte |
| **Satisfactory** | `[NON TROVATO]` come dato pubblicato | struttura nota (9 tier a coppie), durate no |
| **SevTech: Ages** | `[NON TROVATO]` | struttura nota (6 età), durate no |

**La forma che si vede è più importante del numero preciso:**

```
Era 1:  ██                        ~20 min
Era 2:  ███                       ~30 min
Era 3:  ██████████                il muro
Era 4:  ████████████████          ...
```

**Le ere non durano tutte uguale: le prime sono corte, poi arriva un muro.** In Factorio il muro è alla quarta era su sette, ed è documentato come "il collo di bottiglia del divertimento" — blu, viola, nera e gialla che arrivano insieme. Su un telefono, con sessioni da 5-10 minuti, **il muro va spostato più avanti o smontato in tre pezzi più piccoli.**

### Quanti oggetti nuovi per era

`[NON TROVATO]` un conteggio ufficiale per i modpack. L'unico ancoraggio solido è Factorio:

> **~20 semilavorati per tutta la partita ÷ 7 colori di scienza ≈ 3 semilavorati nuovi per era**, più le macchine che li lavorano.

Tre semilavorati e due o tre macchine per era è quindi il ritmo di un gioco che tutti considerano ricco. **Non serve di più.**

---

## 4. Come si fa il gate fra un'era e l'altra

Quattro modi visti in giro.

| Modo | Esempio | Pro | Contro |
|---|---|---|---|
| **Oggetto chiave** — devi saper fabbricare una cosa precisa | Factorio (la boccetta), GTNH (la Caldaia a Carbone, poi il Circuito Elettronico), SevTech (il traguardo sfida) | chiarissimo: un solo obiettivo da mostrare a schermo, impossibile fraintendere | se l'oggetto è facile l'era dura niente; se è difficile ci si blocca senza capire perché |
| **Quantità da consegnare** — devi produrne tanti | Satisfactory (Ascensore Spaziale) | obbliga ad **automatizzare**: non basta farne uno a mano. Misura la produzione, non la conoscenza | può diventare attesa passiva; su telefono annoia se la quantità è alta |
| **Una capacità tecnica** — devi raggiungere un livello di potenza | GregTech (le tensioni, ×4 ogni volta) | scala all'infinito con **un solo numero**; si spiega in una riga | freddo, non racconta niente; da solo non basta |
| **Un luogo nuovo** — devi arrivare da qualche parte | modpack con dimensioni nuove | dà un'immagine forte, l'era **si vede** | è il più caro da produrre: mappa e grafica nuove |

**Cosa funziona meglio.** I giochi migliori ne usano **due insieme**: un oggetto chiave *più* una quantità.
- **Satisfactory** è il modello più solido, perché il gate misura se **sai produrre in continuo**, non se hai fatto un pezzo una volta.
- **Factorio** è il più leggibile, perché il gate è una cosa sola con un'icona.
- **GregTech** è il più scalabile, perché la regola (×4) non cambia mai per 14 ere.

Per un gioco da telefono **con un solo operaio**, il gate migliore è:

> **Un oggetto chiave che richiede l'incontro di due catene, in una quantità piccola ma non banale (5-10 pezzi).**

Piccola perché il tempo dell'operaio è la risorsa scarsa e una quantità alta diventa noia pura. Non banale perché deve costringere a **organizzare** la produzione, non solo a toccare lo schermo.

---

## 5. Quanti materiali sono troppi

| Gioco | Materiali e semilavorati | Serve un motore di ricerca in gioco? |
|---|---|---|
| Factorio base | ~20 semilavorati + ~10 grezzi | no |
| Satisfactory | qualche decina su 9 tier | no |
| Mekanism (un solo minerale) | 6 stati intermedi | no |
| GregTech / GTNH | migliaia | **sì, obbligatorio** (JEI/NEI) |

**Non esiste uno studio pubblicato con "la soglia"** — l'ho cercato e non l'ho trovato. Le fonti di game design che ho letto dicono un'altra cosa, però utile: il problema non è il numero, è che *tanti giochi copiano l'albero grande di Minecraft senza dare nessuna guida su come funziona*. **Il numero è sostenibile solo quanto la guida che gli metti attorno.**

Quello che si può dedurre in modo onesto:

- GregTech dimostra che **oltre poche centinaia di materiali serve per forza una ricerca dentro il gioco.** Se non ce l'hai, non puoi permetterti quel numero.
- Factorio arriva a fine partita con **~20 semilavorati** e nessuno lo trova povero. **Venti è già tanto.**
- Vincolo fisico del telefono verticale: con aree toccabili da 44 px entrano **circa 4 colonne × 5-6 righe = 20-24 caselle** per schermata senza scorrere.

**Regola pratica proposta:**
- massimo **8 materiali che il giocatore deve tenere a mente contemporaneamente** in un'era;
- massimo **~24 in tutta la vita del gioco** prima di dover introdurre filtri o una ricerca;
- **se una materia prima nuova non porta almeno due ricette nuove, non merita di esistere.**

---

## 6. Il legno e i rinnovabili: restano utili o muoiono?

| Gioco | Il legno a fine partita |
|---|---|
| Factorio | **muore quasi subito**: solo i primi pali e i primi cassoni, poi non lo usa più nessuno |
| Satisfactory | **muore**: raccolta a mano, nessuna catena, esiste solo come carburante d'emergenza |
| GregTech / GTNH | **sopravvive**: diventa carbone di legna, creosoto, gomma, e alimenta le prime caldaie a vapore per tutta l'Era del Vapore |
| Modpack con serre e alberi automatici | **sopravvive** perché è un combustibile automatizzabile |

**Lo schema è netto: il legno sopravvive solo se diventa combustibile o entra in un materiale composito.** Se resta "il materiale da costruzione dei principianti", muore appena arriva il metallo.

**Per noi questa è la parte più importante della ricerca**, perché nel nostro gioco gli alberi **non ricrescono** e vanno ripiantati a mano dall'operaio. Se il legno muore, il ripiantare diventa una fatica senza scopo e tutta la meccanica del vivaio si spegne. Vanno dati al legno **tutti e due** i destini:

1. **diventa carbone di legna**, e il carbone di legna è il combustibile delle prime macchine. Quando arriva il carbone vero della seconda isola, il carbone di legna resta l'alternativa peggiore ma **sempre disponibile senza viaggiare** — quindi non muore, cambia ruolo;
2. **entra in un materiale composito che non si può fare senza**: il telaio lo fa già, e va tenuto vivo anche nelle ere dopo (l'utensile dell'Era 4 rimette le tavole in gioco).

---

## 7. La corrente come gate: primo o secondo problema?

| Gioco | Le prime macchine hanno bisogno di corrente? |
|---|---|
| **Factorio** | **No.** Le prime sono a **carbone bruciato direttamente**: trivella a bruciatore, fornace di pietra. L'elettricità è il **secondo** problema |
| **GregTech / GTNH** | **No.** C'è un'**Era del Vapore intera** prima di LV: le macchine a vapore fanno lo stesso lavoro di quelle elettriche, più lentamente. Il gate per uscirne è il primo Circuito Elettronico |
| **Satisfactory** | **Sì subito**, ma è banale: il generatore a biomassa si accende con la roba raccolta a mano. Il problema vero (il carbone, che richiede l'acqua) arriva al Tier 3 |
| **Mekanism** | **Sì**, ma non è un gioco completo: è un modulo che si innesta quando l'elettricità c'è già |

**Tre giochi su quattro mettono un'era intera di macchine SENZA corrente prima dell'elettricità.** La logica è chiara:

- la prima macchina deve insegnare **una cosa sola**: *una macchina lavora al posto tuo*;
- se la prima macchina chiede anche la corrente, ne insegna **due insieme** (la macchina *e* la rete) e il giocatore si perde;
- la corrente diventa allora il gate successivo, con un compito preciso e diverso: **far funzionare più macchine insieme senza toccarle**.

> **Conclusione per noi: la corrente deve essere il SECONDO problema, non il primo.**
> Segheria, frantoio e fornace devono poter partire **a combustibile** (cioè a legno e carbone di legna), senza rete elettrica. L'elettricità arriva dopo, e il suo senso è: *ora ne fai andare cinque contemporaneamente e non le tocchi più*.

Questo cambia l'ordine dei prossimi passi rispetto a come sono elencati adesso ("macchine con corrente"): **le macchine sì, la corrente no — non ancora.**

---

## 8. PROPOSTA DI ERE PER IL NOSTRO GIOCO

Quattro ere. Rispettano le tre regole di forma di `MATERIALI.md` (mai più di 3 ingredienti; nessuna ricetta produce un materiale che consuma; ogni livello ha almeno un incontro fra due catene) e stanno su uno schermo verticale.

**Su cosa è basata:**
- il gate = **un oggetto chiave** viene da Factorio, GTNH e SevTech;
- il gate = **una quantità da consegnare** viene da Satisfactory;
- **un'era di macchine a combustibile prima dell'elettricità** viene da Factorio e GregTech (3 giochi su 4);
- la **forbice** guadagno/costo viene da Mekanism;
- il numero di oggetti nuovi per era (~3 semilavorati + 2-3 macchine) viene da Factorio.

**Le durate in minuti sono stime mie, non dati trovati:** nessuna fonte pubblica le ore per era. Le ho tarate sulla forma "prime ere corte, poi il muro" e su sessioni da telefono di 5-10 minuti.

| # | Nome | Materie prime | Semilavorati nuovi | Macchine nuove | Oggetti nuovi in tutto | Durata stimata | Cosa apre l'era dopo |
|---|---|---|---|---|---|---|---|
| **1** | **Le Mani** | legno, pietra, rame | tavole, ghiaia, chiodi, **telaio** | il banco (c'è già) | 7 | 20–40 min | **Costruire la Segheria.** Costa telai: il telaio è la chiave perché è l'unico posto dove due catene si incontrano |
| **2** | **Il Fuoco** | + carbone di legna | mattone, lingotto di rame, **ingranaggio** | Carbonaia, Segheria, Frantoio, Fornace — **tutte a combustibile, niente corrente** | 8 | 1–2 h | **Costruire la Dinamo:** 2 ingranaggi + 4 filo di rame + 1 telaio (3 ingredienti, regola rispettata) |
| **3** | **La Corrente** | — | filo di rame, piastra di rame, **batteria** | Generatore, Palo, Trivella, Nastro | 7 | 2–3 h | **Costruire il Molo:** 10 telai + 20 mattoni + 4 batterie. Una **quantità**, non un pezzo solo — è l'Ascensore Spaziale di Satisfactory in piccolo |
| **4** | **La Seconda Isola** | + ferro, carbone | lingotto di ferro, lastra, **acciaio** | Segheria / Frantoio / Fornace **elettrici** (versione ×4), Altoforno | 8 | infinita | Nessuna: da qui si va avanti con **isole nuove e macchine migliori**, non con una costruzione finale |

**Totale: 30 oggetti in 4 ere, mai più di 8-9 da tenere a mente insieme.** Sotto la soglia stimata al punto 5.

### Perché in quest'ordine — una cosa nuova per era

| Era | L'unica cosa nuova che insegna |
|---|---|
| 1 | **le ricette**: due cose diventano una terza |
| 2 | **una macchina lavora al posto tuo** — e si paga in combustibile, cioè in legno |
| 3 | **le macchine vanno da sole, tutte insieme** |
| 4 | **ci sono altri posti** |

Da qui in poi non serve nessun concetto nuovo: solo numeri più grandi e isole nuove. **È così che la progressione resta infinita senza costruzione finale.**

### Il rischio da segnalare all'autore

**L'Era 3 è l'unica dove il gioco cambia natura.** Con trivelle e nastri l'operaio smette di essere l'unica fonte di lavoro. Se le macchine fanno tutto, la risorsa scarsa (il suo tempo) smette di essere scarsa, e con essa muore la scelta fra spendere e potenziare — cioè il gioco, secondo la regola 8 del `CLAUDE.md`.

**La contromisura strutturale:** le macchine **consumano combustibile**, e il combustibile lo deve caricare l'operaio. Così il suo tempo resta il collo di bottiglia anche dopo l'automazione, e ogni macchina in più è una decisione vera (più produzione, ma anche più viaggi di rifornimento) invece che un regalo.

Questo è anche il motivo per cui l'Era 2 deve venire prima dell'Era 3: **il combustibile va introdotto quando è l'unica cosa nuova**, non insieme alla rete elettrica.

---

## 9. PROPOSTA DI CATENE

Regole rispettate ovunque: mai più di 3 ingredienti; nessuna ricetta produce un materiale che consuma.
Dove i numeri esistono già in `MATERIALI.md` li ho tenuti identici; dove propongo qualcosa di nuovo lo segno **[nuovo]**.

### Legno — l'unica risorsa davvero finita, quindi l'unica dove il moltiplicatore conta davvero

| Gradino | Dove | Ricetta | Resa | Guadagno sul gradino prima |
|---|---|---|---|---|
| mano | banco | 1 legno → **2 tavole** | ×2 | — |
| macchina | Segheria (a combustibile) | 1 legno → **3 tavole** | ×3 | **+50 %** |
| macchina elettrica **[nuovo]** | Segheria elettrica | 1 legno → **4 tavole** | ×4 | **+33 %** |
| **compressione [nuovo]** | Carbonaia | 2 legno → **1 carbone di legna** | ×0,5 | — |

La carbonaia è quello che tiene vivo il legno per tutta la partita: **il legno non è il materiale dei principianti, è il carburante.**
La forbice +50 % / +33 % è quella di Mekanism: il secondo gradino di macchina rende la metà del primo, quindi non è mai obbligatorio.

### Pietra

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| mano | banco | 1 pietra → **2 ghiaia** | ×2 |
| macchina **[nuovo]** | Frantoio | 1 pietra → **3 ghiaia** | ×3 |
| macchina elettrica **[nuovo]** | Frantoio elettrico | 1 pietra → **4 ghiaia** | ×4 |
| **compressione [nuovo]** | Fornace | 3 ghiaia + 1 carbone di legna → **1 mattone** | ×0,33 |

Il mattone è il primo "scarico" della catena: consuma tanto, produce poco, e serve in quantità nel gate dell'Era 3.

### Rame

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| mano | banco | 1 rame → **4 chiodi** | ×4 |
| fusione | Fornace | 2 rame → **1 lingotto di rame** (come in `MATERIALI.md`) | ×0,5 |
| trafilatura **[nuovo]** | banco | 1 lingotto → **2 filo di rame** | ×2 |
| laminatura **[nuovo]** | banco | 1 lingotto → **2 piastre di rame** | ×2 |

**I chiodi sono la via veloce** (×4 subito, ma servono solo per il telaio). **Il lingotto è la via lenta** (×0,5, brucia rame e combustibile) ma apre tutto il resto. È la prima vera scelta di spesa del gioco, ed è di quelle giuste: nessuna delle due è sempre migliore.

### Ferro (Era 4)

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| fusione | Fornace | 2 ferro → **1 lingotto di ferro** (come in `MATERIALI.md`) | ×0,5 |
| macinatura **[nuovo]** | Frantoio elettrico | 1 ferro → **2 polvere di ferro** | ×2 |
| fusione della polvere **[nuovo]** | Fornace | 2 polvere + 1 carbone → **1 lingotto di ferro** | **il ×2 vero passa da qui** |
| incontro | Officina | 1 lingotto di ferro + 2 ghiaia → **1 lastra** (come in `MATERIALI.md`) | — |
| **compressione [nuovo]** | Altoforno | 3 lingotti di ferro + 2 carbone → **1 acciaio** | ×0,33 |

Questa è la nostra versione del ×2 di Mekanism, e costa **due macchine invece di una** — esattamente la forbice. Chi non le vuole costruire fonde il ferro direttamente e va avanti lo stesso, solo più lentamente. **Nessun gradino è obbligatorio.**

### Carbone (Era 4)

Il carbone **non si moltiplica**: è la valuta del combustibile.

| Uso | Regola |
|---|---|
| combustibile | 1 carbone vale **3 carboni di legna** |
| acciaio | vedi sopra |

Il rapporto 1:3 è il numero che tiene vivo il carbone di legna: peggiore, ma disponibile sull'isola di partenza senza viaggiare. **È così che il legno non muore all'Era 4.**

### Dove le catene si incontrano — 4 punti in tutto il gioco, uno per era

| Era | Oggetto | Ricetta | Chi incontra chi |
|---|---|---|---|
| 1 | **Telaio** | 4 tavole + 6 chiodi (già esiste) | legno × rame |
| 2 | **Ingranaggio** | 2 lingotti di rame + 1 tavola | metallo × legno |
| 3 | **Batteria** | 2 piastre di rame + 1 mattone + 1 filo | metallo × pietra |
| 4 | **Utensile** | 1 acciaio + 2 tavole | ferro × legno |

Uno per era: è il ritmo di Factorio (un incontro ogni 4-6 semilavorati) e rispetta la regola 3 di `MATERIALI.md`.

E soprattutto **coincide col gate**: l'oggetto che fa incontrare due catene è sempre dentro l'oggetto che apre l'era dopo. Il giocatore impara una regola sola e la riconosce ogni volta.

Nota: le tavole compaiono nell'incontro dell'Era 1, dell'Era 2 e dell'Era 4. **È voluto:** è il secondo modo (dopo il carbone di legna) di non far morire il legno.

---

## 10. Le tre cose da portarsi via

1. **Il guadagno deve dimezzarsi a ogni gradino, il costo no.** Mekanism: +100 %, +50 %, +33 %, +25 % contro 1, 3, 5, 8 macchine. È così che l'ultimo gradino resta una scelta e non un obbligo.
2. **La corrente è il secondo problema, non il primo.** Un'era intera di macchine a combustibile prima dell'elettricità — lo fanno 3 giochi su 4, e Immersive Engineering dimostra che si può fare un ottimo gioco fermandosi al ×2 e mettendo tutta la difficoltà nel costruire la macchina.
3. **Il legno vive solo se diventa combustibile.** In tutti i giochi dove non lo diventa, muore nella prima ora. Da noi gli alberi vanno ripiantati a mano: se muore, muore anche il vivaio.

---

## Fonti

**Mekanism**
- Ore Processing (wiki ufficiale) — https://wiki.aidancbrady.com/wiki/Ore_Processing
- Tutorials/Basic Ore Processing Setup — https://wiki.aidancbrady.com/wiki/Tutorials/Basic_Ore_Processing_Setup
- Ore processing (Mekanism), FTB Wiki — https://ftb.fandom.com/wiki/Ore_processing_(Mekanism)
- Mastering Mekanism: Ore Processing from 2x, 3x, 4x to 5x — https://jangro.com/2024/12/22/mastering-mekanism-ore-processing-from-2x-3x-4x-to-5x
- Mekanism Ore Processing Guide, Craft Down Under — https://forum.playcdu.co/threads/mekanism-ore-processing-guide.711/
- Enrichment Chamber — https://ftb.fandom.com/wiki/Enrichment_Chamber

**GregTech / GT: New Horizons**
- Ore Processing Concepts — https://wiki.gtnewhorizons.com/wiki/Ore_Processing_Concepts
- Singleblock Machines — https://wiki.gtnewhorizons.com/wiki/Singleblock_Machines
- Tier — https://wiki.gtnewhorizons.com/wiki/Tier
- Steam Age — https://wiki.gtnewhorizons.com/wiki/Steam_Age
- Beginner Tips — https://wiki.gtnewhorizons.com/wiki/Beginner_Tips
- A 4000-Hour Journey: Looking Back at "GregTech: New Horizons" — https://note.com/saxgumi/n/n3dd7bdbaa5c3?hl=en
- Thermal Centrifuge (GregTech 5), FTB Wiki — https://ftb.fandom.com/wiki/Thermal_Centrifuge_(GregTech_5)

**Factorio**
- Science pack (wiki ufficiale) — https://wiki.factorio.com/Science_pack
- Rapporti delle linee di scienza — https://factorio-wiki.pages.dev/en/production/science-pack-production
- Average game length (discussione Steam) — https://steamcommunity.com/app/427520/discussions/0/3473981814933977822/
- Early-Midgame bottleneck (forum ufficiale) — https://forums.factorio.com/viewtopic.php?t=51419
- How Long to Beat (forum ufficiale) — https://forums.factorio.com/viewtopic.php?t=62732

**Satisfactory**
- Milestones (wiki ufficiale) — https://satisfactory.wiki.gg/wiki/Milestones
- Progression Guide: Milestones, Tiers and the Space Elevator — https://xgamingserver.com/blog/satisfactory-milestones-tech-tree/
- Pure Ingots (Iron, Copper, Caterium) — https://www.relictrek.net/satisfactory/pure-ingots.html
- Iron Ingot — https://satisfactory.fandom.com/wiki/Iron_Ingot

**SevTech: Ages**
- Ages (wiki ufficiale) — https://sevtechages.fandom.com/wiki/Ages
- Advancements — https://sevtechages.fandom.com/wiki/Advancements

**Game design generale**
- 7 crafting systems game designers should study, Game Developer — https://www.gamedeveloper.com/design/7-crafting-systems-game-designers-should-study
- Technology tree, Wikipedia — https://en.wikipedia.org/wiki/Technology_tree
