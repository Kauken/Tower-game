# La forma della curva

*Ricerca sulla forma matematica della progressione. Argomento unico: come devono crescere i costi.*
*Stato: bozza in aggiornamento — sezioni 5 e 7 ancora da completare.*

---

## In una riga

**Il numero che conta non è di quanto crescono i costi, ma di quanto crescono PIÙ della produzione: quel rapporto È l'attesa fra un acquisto e il successivo — e Cookie Clicker lo tiene a ×2 fra un tipo di edificio e il seguente, cioè ogni cosa nuova si ripaga nel doppio del tempo della precedente.**

---

## 1. Che forma ha una buona curva di costo

### La formula che usano tutti

Una sola formula, ripetuta ovunque:

> **costo = costo di partenza × moltiplicatore ^ (quanti ne hai già)**

Cioè **geometrica**: ogni copia costa una percentuale fissa in più della precedente. Non lineare, non a scalini.

### I moltiplicatori veri, con nome e cognome

| Gioco | Moltiplicatore | Fonte |
| --- | --- | --- |
| **Cookie Clicker** — tutti e 20 gli edifici | **×1,15** | wiki ufficiale + Envato Tuts+ |
| **Clicker Heroes** — tutti e 35 gli eroi | **×1,07** | Envato Tuts+ |
| **AdVenture Capitalist** — 10 attività | ognuna diversa, **tutte fra ×1,07 e ×1,15** | Envato Tuts+ |
| **AdVenture Capitalist, il chiosco di limonata** (i numeri esatti) | costo di partenza **4**, produzione **1,67 al secondo**, crescita **×1,07** | Kongregate / Game Developer, "The Math of Idle Games" |
| Fascia consigliata in generale | **×1,07 – ×1,15** | più fonti |

**Numeri citati.** La parte utile non è il numero, è l'osservazione: *tre giochi diversi, scritti da persone diverse, sono finiti nella stessa strettissima fascia.* Quando succede, di solito vuol dire che fuori da lì non funziona.

### Perché geometrica e non lineare

Motivo dichiarato: la crescita geometrica **bilancia da sola** più strade di potenziamento. Se ogni copia costa più della precedente, ognuna ha rendimenti calanti in automatico e il giocatore si sposta da sé sulla prossima cosa. Il progettista non deve confrontare a mano ogni coppia di oggetti: **la formula lo fa al posto suo.**

Con una curva **lineare** l'oggetto migliore resta il migliore per sempre, e si compra solo quello. Machinations lo dice esplicitamente: lineare è *"semplice e trasparente, ma non dà nessun senso di sfida crescente"*.

### La terza forma: a scalini (e ci riguarda)

Machinations elenca **tre** forme, non due:

| Forma | Come si comporta | Giudizio della fonte |
| --- | --- | --- |
| **Lineare** | ogni passo costa uguale | trasparente ma piatta |
| **Esponenziale** | ogni passo costa molto più del precedente | dà il senso di progresso, ma **"produce muri brutali nel finale se il guadagno non cresce in proporzione"** |
| **A traguardi** *(milestone-based)* | i costi salgono **a fasce**, e ogni fascia è un traguardo | *"crea punti di rottura naturali che sembrano tappe, ed è più facile da bilanciare dell'esponenziale puro"* |

**La terza è letteralmente la nostra struttura a ere.** È l'unica delle tre che una fonte descrive come *più facile da bilanciare*. Non l'abbiamo scelta per questo, ma è la scelta giusta.

### ⚠️ Attenzione: la fascia ×1,07-1,15 non è per noi

Quella fascia è il costo per **ricomprare la stessa cosa** (il 15° nonno di Cookie Clicker). Noi abbiamo **38 cose diverse, ognuna comprata una volta sola**. È un problema diverso, e ha una risposta diversa: sta al punto 6.

---

## 2. Il rapporto fra costi e produzione — è **questa** la vera domanda

Il punto più importante della ricerca, e quello che manca nei nostri documenti.

### La regola, come la scrivono le fonti

> *"I costi devono crescere **più in fretta** dell'aumento di guadagno."*
> — Kongregate / Game Developer, "The Math of Idle Games"

E con i numeri accanto:

> *"Se la produzione sale ×1,10 per livello, il costo per salire sale ×1,15."*
> — stessa fonte

**Numero citato.** Da notare: la differenza è **cinque punti percentuali**. Non il doppio, non il triplo.

### La forma pulita della regola *(derivata da me, non citata)*

Se i costi crescono di `c` a ogni passo e la produzione cresce di `p`, l'attesa fra un acquisto e il successivo cresce di:

> **c ÷ p**

Da cui tre mondi:

| Se… | Cosa sente il giocatore |
| --- | --- |
| **c = p** | l'attesa resta **sempre la stessa**. Un acquisto ogni tot, per sempre |
| **c > p** | l'attesa **si allunga** ogni volta, di un fattore c/p. È quello che fanno tutti |
| **c < p** | l'attesa **si accorcia**: il gioco accelera, i prezzi diventano ridicoli, e finisce |

Con i numeri citati sopra (1,15 e 1,10) il rapporto è **×1,045**: ogni acquisto costa il 4,5% di attesa in più del precedente. Su venti acquisti l'attesa si moltiplica per 2,4. **Si sente, ma non è un muro.**

### Cosa cambia per noi, in una frase

Nei nostri documenti (`MATERIALI.md`, e `SINTESI.md` riga 133) c'è scritto **"curva dei costi a ×1,5"** e **basta**. Non c'è scritto da nessuna parte di quanto cresce la produzione. Ma ×1,5 **da solo non vuol dire niente**:

| Se la produzione cresce di… | …l'attesa cresce di | Dopo 37 progetti l'attesa è | Verdetto |
| --- | --- | --- | --- |
| ×1,50 | ×1,00 | come il primo giorno | piatta |
| ×1,37 *(la nostra Ascia, misurata)* | ×1,09 | **×24** | sostenibile |
| ×1,30 | ×1,15 | **×176** | duro ma vivibile |
| ×1,20 | ×1,25 | **×3.830** | **rotto** |
| ×1,00 *(il nostro Zaino, misurato)* | ×1,50 | ×3,3 milioni | rotto e basta |

*(tutti derivati da me: `(1,5 ÷ p)^37`.)*

**Un progetto che non aumenta la produzione non è neutro: è un buco nella curva.** Lo Zaino grande misurato ×1,00 non è "un oggetto che rende poco": è un passo in cui il costo sale e la produzione no, cioè **il punto in cui la curva si impenna**. Argomento nuovo, e matematico, per la decisione aperta A3.

---

## 3. La risposta vera alle "38 cose diverse": i numeri di Cookie Clicker

Questa è la parte che nessuna delle sei ricerche precedenti aveva. La fascia ×1,07-1,15 riguarda le ricompre. Ma Cookie Clicker ha anche **venti tipi diversi di edificio**, ognuno che si sblocca dopo il precedente — cioè **esattamente il nostro problema dei 38 progetti**. E i numeri sono pubblici.

| Edificio | Costo base | Produzione base (biscotti/s) | Costo ÷ costo prec. | Produz. ÷ produz. prec. | **Tempo per ripagarsi** |
| --- | --- | --- | --- | --- | --- |
| Cursore | 15 | 0,1 | — | — | 150 s |
| Nonna | 100 | 1 | ×6,7 | ×10 | 100 s |
| Fattoria | 1.100 | 8 | ×11 | ×8 | 137 s |
| Miniera | 12.000 | 47 | ×10,9 | ×5,9 | 255 s |
| Fabbrica | 130.000 | 260 | ×10,8 | ×5,5 | 500 s |
| Banca | 1.400.000 | 1.400 | ×10,8 | ×5,4 | 1.000 s |

*(costi e produzioni: citati dal wiki di Cookie Clicker. I tre rapporti a destra: derivati da me.)*

**Tre cose enormi escono da questa tabella.**

1. **Fra un tipo nuovo e il seguente, il costo fa ×11 e la produzione ×5,5.** Non ×1,5, non ×1,15: **×11**. Perché non è la stessa cosa comprata due volte, è una cosa nuova che deve *superare* l'intera categoria precedente.
2. **Il rapporto fra i due è ×2, e si stabilizza.** 10,8 ÷ 5,4 = 2,0. Cioè: **ogni tipo di cosa nuova si ripaga nel doppio del tempo del tipo precedente.** È la regola c/p del punto 2, applicata a una progressione di cose *diverse*, e vale **2** — non 1,045.
3. **Il tempo di ammortamento parte da due minuti** (150 s, 100 s, 137 s) e raddoppia: 4 min, 8 min, 17 min. Quel 2-2,5 minuti iniziale coincide col dato che avevamo già in `MATERIALI.md` (*ammortamento di un attrezzo: 3-8 minuti*).

> **Questa è la regola più solida che ho trovato per noi**, perché è misurata sulla struttura giusta (cose diverse in sequenza) e sul gioco più copiato del genere.

**Nota importante sulla lettura.** ×11 sembra enorme ma **non** allunga l'attesa di ×11: allunga di ×2, perché ×5,5 di produzione l'assorbe. Chi guarda solo la colonna dei costi vede un muro che non c'è. **È l'errore che si sta per fare con il nostro "×1,5".**

---

## 4. Quanto deve durare l'attesa fra uno sblocco e il successivo

| Cosa | Numero | Citato / derivato | Fonte |
| --- | --- | --- | --- |
| Una ricompensa, anche piccola, ogni | **30-90 secondi** | citato | gamedesigning.org, "How Reward Loops Keep Players Engaged" |
| Un senso di **risultato importante** ogni | **10-15 minuti** di gioco continuo | citato | idem |
| Soglia di frustrazione: minuti di fatica ÷ valore percepito | oltre **5 a 1** = rischio frustrazione | citato | idem |
| Fase "amo" iniziale | primi **0-30 minuti** | citato | GridInc, "Idle Games Best Practices" |
| Ammortamento del primo edificio di Cookie Clicker | **2,5 minuti** | derivato | 15 ÷ 0,1 |
| Ammortamento del sesto tipo di edificio | **17 minuti** | derivato | 1,4 M ÷ 1.400 |

**Deve essere costante o crescente?** Le fonti sono concordi nei fatti anche se non nelle parole: **crescente, ma piano**. Cookie Clicker: ×2 per tipo nuovo. Il consiglio di Kongregate: ×1,045 per ricompra. Nessuna fonte propone un'attesa costante per sempre — e nessuna propone di farla esplodere.

Un dato laterale ma bello, da un devlog su itch.io: nello stesso gioco convivono **tre orologi diversi** — le mucche danno latte ogni **20 minuti**, il caseificio ogni **5 ore**, il cantiere ogni **2 giorni**. Non è una scala regolare: sono **tre ordini di grandezza contemporanei**. Il giocatore ha sempre qualcosa che matura fra un minuto e qualcosa che matura fra un giorno. *(citato)*

Da mettere accanto a quello che avevamo già (`SINTESI.md`): un acquisto ogni **1,5-3 minuti**, una cosa **nuova** ogni **10-20 minuti**, sessione mediana **5-6 minuti**. **Il "10-15 minuti per un risultato importante" e il nostro "una cosa nuova ogni 10-20 minuti" sono lo stesso numero trovato due volte.** Quello è il battito del gioco.

---

## 5. Cosa succede quando la curva è sbagliata

Raccolto dalle Discussioni Steam (**Reddit risulta bloccato**, vedi in fondo). I titoli delle discussioni *sono* la diagnosi.

### Curva troppo ripida — le parole esatte dei giocatori

| Gioco | Cosa scrivono |
| --- | --- |
| Endless World Idle RPG | *"Progression too slow"* |
| Nomad Idle | *"Suddenly slow progression after area 5?"* — bonus che chiedono 150.000 uccisioni |
| Idle Sphere | *"This is a VERY ultra slow game (140 hours in)"* — progressi "trascurabili" |
| Idle Slayer | *"Painfully grindy"* — *"un muro incredibilmente doloroso"* |
| NGU Idle | devi **chiudere il gioco e tornare giorni dopo** |
| Revolution Idle | *"Slowing down at about 100 achievements"* |
| IdleOn | il gioco è diventato *"una faccenda da sbrigare invece che una cosa divertente"* |
| Idle Champions | dopo 23.000 ore: *"da idle è diventato fare da babysitter 24 ore su 24"* |

**Il sintomo, in una riga: non dicono "è difficile". Dicono "è lento" e "è un muro". E sanno indicare il punto esatto** — *"dopo l'area 5"*, *"verso i 100 obiettivi"*. Se le lamentele si concentrano tutte sullo stesso passo, il problema non è "il gioco": è quel passo lì, dove il rapporto costo/produzione è sbagliato.

**Il secondo sintomo, più insidioso:** il gioco smette di essere un idle e diventa un lavoro. *"Faccenda da sbrigare"*, *"babysitter"*. Quando la curva è troppo ripida il giocatore compensa **giocando di più**, e a quel punto ha smesso di divertirsi mentre gioca ancora. Non se ne accorge nessuno finché non se ne va.

### Curva troppo piatta — meno documentata, ma c'è

I giocatori non aprono discussioni per dire che è troppo facile: smettono e basta. Ma un caso pulito l'ho trovato:

> **Nomad Idle**: si arriva alla zona **200 in poche ore il primo giorno**, e poi *"non succede più niente: nessun potenziamento nuovo, nessun progresso, nessuno sblocco"*.

Notare che **Nomad Idle compare in tutte e due le liste**. Curva piatta all'inizio, muro subito dopo. È la firma di un gioco a cui la curva non è stata *disegnata*: è stata messa a occhio, pezzo per pezzo.

Un altro sintomo indiretto: quando i costi non tengono il passo, *"il gioco attivo diventa meno utile"* — non c'è più motivo di toccare niente.

### E il rischio nostro qual è dei due?

**Il piatto, senza dubbio.** Sei progetti a 120-520 monete, con 166 monete al minuto, significa che **a produzione ferma i primi sei progetti si comprano in 10 minuti e mezzo in tutto**:

| Progetto | Costo | Minuti di attesa a 166/min |
| --- | --- | --- |
| 1 | 120 | 0,7 |
| 2 | 160 | 1,0 |
| 3 | 210 | 1,3 |
| 4 | 260 | 1,6 |
| 5 | 450 | 2,7 |
| 6 | 520 | 3,1 |
| | | **10,4 in tutto** |

*(derivato da me.)* E la produzione **non** è ferma: sale mentre compri, quindi meno di dieci minuti. Dopodiché la bacheca è vuota. **Siamo esattamente nel primo giorno di Nomad Idle.**

---

## 6. Il problema delle cinque ere

### Cosa fanno gli altri

- **Anno**: la progressione è agganciata ai **livelli di popolazione**, non al denaro. Salire di livello **apre un catalogo di edifici** e le catene di produzione si allungano. Cioè: **l'era non è un moltiplicatore di prezzi, è un elenco di cose nuove.**
- **Civilization VII**: fra un'era e l'altra c'è una **transizione** che riazzera parecchio. Ma la cosa da rubare è l'idea degli edifici **"senza età"** (*ageless*), **segnati nell'interfaccia**, che tengono il loro valore pieno in ogni era; più le **eredità** (oro / standard / oscura) che portano un bonus continuo nell'era dopo. → **Quando riparti, deve essere chiaro cosa NON riparte.** E deve essere chiaro **guardando lo schermo**, non leggendo un manuale.
- **Satisfactory**: 9 livelli. Non si aprono uno alla volta: **si aprono a coppie, e ogni coppia è chiusa da un progetto enorme** (le fasi dell'Assemblaggio del Progetto). Fase 1 apre i livelli 3 e 4, fase 2 il 5 e 6, fase 3 il 7 e 8, fase 4 il 9. *(citato, wiki e guide)* — **La porta fra un'era e l'altra è un progetto grosso, non un prezzo alto.** Da noi quel progetto esiste già e si chiama **il pontile**.
- **Factorio**: nel gioco base la scalata è governata da **un unico moltiplicatore globale** del prezzo della ricerca, che il giocatore stesso regola. Le mod che riscrivono la curva convergono su un'idea sola: far dipendere il costo dalla **profondità nell'albero** — quante ricerche servono per arrivare lì — e poi **frenare la crescita** (*"un fattore di correzione della curva che smorza la crescita esponenziale, per evitare costi estremi nel finale"*, dalla mod *Technology Price Multiplier*). **Cioè: perfino chi ama i numeri grossi mette un freno alla parte alta della curva.**

### ⚠️ Cosa dicono davvero le nostre fasce d'era *(tutti conti miei)*

Ho fatto i conti sulle fasce scritte in `PROGETTI.md`. È una sorpresa.

| Era | Progetti | Fascia | Moltiplicatore implicito **dentro** l'era |
| --- | --- | --- | --- |
| 0 — Le Mani | 7 | 120 → 520 | **×1,28** |
| 1 — Il Fuoco | 7 | 600 → 2.000 | **×1,22** |
| 2 — La Corrente | 9 | 2.500 → 8.000 | **×1,16** |
| 3 — La Seconda Isola | 7 | 10.000 → 30.000 | **×1,20** |
| 4 — Le Scale | 8 | 40.000 → ? | non definita |

E i **salti fra un'era e l'altra**:

| Passaggio | Salto |
| --- | --- |
| 520 → 600 | ×1,15 |
| 2.000 → 2.500 | ×1,25 |
| 8.000 → 10.000 | ×1,25 |
| 30.000 → 40.000 | ×1,33 |

**Quattro conclusioni, e nessuna è quella scritta nei documenti.**

1. **La regola "×1,5" non è quello che stiamo facendo.** Le fasce implicano ×1,16-1,28. Due documenti dicono cose diverse, e nessuno se n'è accorto.
2. **Il numero in `PROGETTI.md` è sbagliato.** 38 progetti a ×1,5 partendo da 120 danno **392 milioni**, non *"oltre un miliardo"*. (120 × 1,5³⁷.)
3. **Il salto fra due ere è più PICCOLO del passo dentro un'era.** Da Era 0 a Era 1 è ×1,15; dal 4° al 5° progetto dell'Era 0 è ×1,28. Cioè **il confine d'era è il punto più piatto di tutta la curva** — l'esatto contrario di *"a ogni era si riparte da una base più alta"*. Le fasce, come sono scritte, **non fanno il salto di scala che dicono di fare.**
4. **Presa tutta insieme, da 120 a 40.000 in 37 passi, la nostra curva è ×1,17.** Siamo già dentro la fascia di Cookie Clicker, senza saperlo — ma è la fascia sbagliata: quella è per le **ricompre**. Per le **cose nuove** Cookie Clicker usa **×11**.

### Il salto d'era: le tre forme possibili, e quale scegliere

Dalle fonti si ricavano tre modi diversi di gestire il confine, e sono davvero diversi:

| Forma | Chi la usa | Cosa succede al confine |
| --- | --- | --- |
| **Si azzera** | Civilization VII | perdi molto, tieni alcune cose "senza età", riparti quasi da capo |
| **Continua** | Cookie Clicker | nessun confine: la stessa curva ×11 per venti tipi di edificio, senza soluzione di continuità |
| **Si ferma e riparte** | Satisfactory, Anno | il confine è **un progetto enorme da completare**, non un prezzo. Dopo, la scala nuova è ovvia perché ci sono **materiali nuovi** |

**La terza è la nostra**, e ce l'abbiamo già in mano senza averla riconosciuta: il **pontile** dell'Era 3 è esattamente l'Assemblaggio del Progetto di Satisfactory. Le altre due porte (Fuoco, Corrente) oggi **non hanno un progetto-porta**: hanno solo un prezzo. Questa è la cosa più concreta che questa ricerca fa vedere.

---

## 7. I numeri concreti, tutti in un posto

| Cosa | Numero | Citato / derivato | Fonte |
| --- | --- | --- | --- |
| Cookie Clicker, ricompra dello stesso edificio | **×1,15** | citato | wiki ufficiale |
| Clicker Heroes, ricompra | **×1,07** | citato | Envato Tuts+ |
| AdVenture Capitalist, ricompra | fra **×1,07 e ×1,15** | citato | Envato Tuts+ |
| AdVenture Capitalist, chiosco di limonata | costo 4, produzione 1,67/s, crescita ×1,07 | citato | Kongregate |
| Esempio di coppia costo/produzione | costo **×1,15** con produzione **×1,10** | citato | Kongregate |
| …l'attesa che ne deriva | **×1,045** per acquisto | derivato | 1,15 ÷ 1,10 |
| **Cookie Clicker, da un TIPO di edificio al seguente: costo** | **×11** | derivato dai costi citati | wiki |
| **…produzione** | **×5,5** | derivato | wiki |
| **…rapporto, cioè quanto si allunga l'attesa** | **×2** | derivato | wiki |
| Ammortamento del 1° tipo di edificio di CC | 2,5 min | derivato | 15 ÷ 0,1 |
| Ammortamento del 6° tipo | 17 min | derivato | 1,4 M ÷ 1.400 |
| Una ricompensa anche piccola ogni | **30-90 s** | citato | gamedesigning.org |
| Un risultato **importante** ogni | **10-15 min** | citato | gamedesigning.org |
| Soglia di frustrazione fatica/ricompensa | **5 a 1** | citato | gamedesigning.org |
| Fase "amo" | primi **0-30 min** | citato | GridInc |
| Tre orologi contemporanei in un gioco reale | 20 min / 5 h / 2 gg | citato | devlog itch.io |
| Satisfactory | **9 livelli, aperti a coppie da 4 progetti-porta** | citato | wiki Satisfactory |
| **La nostra curva attuale, 6 progetti** | **×1,34** medio | derivato | (520/120)^(1/5) |
| **La nostra curva d'albero, 38 progetti** | **×1,17** medio | derivato | (40.000/120)^(1/37) |
| **I nostri primi 6 progetti, a produzione ferma** | **10,4 minuti in tutto** | derivato | 166 monete/min |
| 38 progetti a ×1,5 partendo da 120 | **392 milioni** (non un miliardo) | derivato | 120 × 1,5³⁷ |

---

## 8. Cosa cambia da noi

| # | La trovata | Cosa tocca | Da fare / decidere / valutare |
| --- | --- | --- | --- |
| 1 | **Scrivere accanto a "×1,5" di quanto deve crescere la produzione.** Il costo da solo non significa niente: significa qualcosa solo il rapporto costo/produzione | `MATERIALI.md`, `SINTESI.md` §7 punto 8 | **da fare** — è una correzione, non una scelta |
| 2 | **Il numero da tenere sotto controllo si chiama c ÷ p**, ed è "di quanto si allunga l'attesa a ogni progetto". Va misurato con `npm run simula`, non deciso a occhio | `simula` | **da fare** — è un valore che la simulazione può già stampare |
| 3 | **Cookie Clicker, fra tipi diversi: costo ×11, produzione ×5,5, attesa ×2.** È la nostra struttura, non ×1,15 | `MATERIALI.md`, tutte le fasce | **da valutare** — è la scoperta grossa, ma va provata sui nostri numeri |
| 4 | **Le nostre fasce d'era danno ×1,16-1,28, non ×1,5.** Due documenti si contraddicono | `PROGETTI.md` vs `MATERIALI.md` | **da fare** — vanno allineati |
| 5 | **Il salto fra un'era e l'altra è oggi più piatto del passo dentro l'era** (×1,15 contro ×1,28). Il confine, come è scritto, non fa nessun salto di scala | `PROGETTI.md`, fasce | **da decidere** — o si alza il confine, o si ammette che il salto lo fanno i materiali e non i prezzi |
| 6 | **"Oltre un miliardo" è sbagliato: sono 392 milioni** | `PROGETTI.md`, punto 3 in fondo | **da fare** — refuso |
| 7 | **Ogni porta d'era dovrebbe essere un progetto grosso, non un prezzo alto** (Satisfactory: 4 progetti-porta per 9 livelli). Il pontile lo è già; Fuoco e Corrente no | `PROGETTI.md`, `ROADMAP.md` | **da decidere** — cambia la forma dell'albero |
| 8 | **Al confine d'era deve vedersi cosa NON riparte** (gli edifici "senza età" di Civ VII sono segnati nell'interfaccia) | `GDD.md`, interfaccia bacheca | **da valutare** — si sposa con la regola "non si smonta mai" |
| 9 | **Un progetto che non aumenta la produzione è un buco nella curva**, non un oggetto debole. Lo Zaino ×1,00 va guardato così | decisione aperta **A3** | **da decidere** — argomento nuovo per A3 |
| 10 | **Il nostro rischio è la curva piatta, non il muro.** Sei progetti in 10,4 minuti a produzione ferma: è il primo giorno di Nomad Idle | fasce Era 0 | **da fare** — o si alzano i costi, o si aggiungono progetti all'Era 0 |
| 11 | **"Un risultato importante ogni 10-15 minuti"** è lo stesso numero del nostro *"una cosa nuova ogni 10-20 minuti"*. È il battito del gioco, ed è confermato da due strade | `GDD.md` | **da fare** — scriverlo come vincolo, non come consiglio |
| 12 | **La struttura "a traguardi" è quella che una fonte indica come più facile da bilanciare** dell'esponenziale puro. Le ere non sono un vezzo narrativo: sono la scelta tecnica giusta | `GDD.md` | **da fare** — scriverlo, così non viene smontato per sbaglio |
| 13 | **Perfino Factorio frena la parte alta della curva** ("un fattore di correzione che smorza la crescita esponenziale, per evitare costi estremi nel finale"). L'Era 4 "che non finisce mai" ha bisogno di quel freno | Era 4, progetti 34 e 38 | **da valutare** — serve quando arriveremo lì |

---

## 9. Quello che NON ho trovato

Dichiarato, invece che riempito a fantasia.

- **Un numero pubblicato di "minuti fra uno sblocco e il successivo" per un gioco di costruzione o automazione.** Per gli idle sì (30-90 s per una ricompensa, 10-15 min per un risultato). Per Factorio, Satisfactory, Anno: **nessuna fonte pubblica un tempo.** Il numero di Satisfactory che sarebbe servito — quante ore dura ogni livello — non è pubblicato da nessuna parte raggiungibile.
- **I costi esatti delle tappe di Satisfactory livello per livello.** Le pagine esistono ma il motore di ricerca non me li ha restituiti, e **WebFetch è bloccato dal proxy**, quindi non ho potuto aprire le tabelle. Il salto di scala fra un livello e l'altro di Satisfactory **resta un buco**, ed è il dato che più direttamente risponderebbe alla domanda sulle ere.
- **Un nome proprio per la regola c ÷ p.** Le fonti la descrivono ("i costi devono crescere più in fretta del guadagno") ma **nessuna le dà un nome**. Il rapporto è mio.
- **Il testo integrale di "The Math of Idle Games" parti II e III** e delle slide di Pecorella (GDC Europe 2016). Esistono, sono la fonte migliore possibile, e sono **fuori portata con WebFetch bloccato**. Quello che riporto viene dai riassunti restituiti dalla ricerca, non dal testo completo. **Se un giorno si riesce ad aprirli, è lì che sta il resto della risposta.**
- **Post-mortem con numeri di un gioco di costruzione la cui curva era sbagliata.** Ci sono lamentele di giocatori a valanga, ma nessun autore che pubblichi "avevamo messo ×N, era sbagliato, l'abbiamo cambiato in ×M".
- **Quanti progetti servono per riempire un'era.** Nessuna fonte dà un numero. I nostri 7-9 per era sono una scelta nostra, non un dato.
- **Dati sulla forma della curva su telefono in verticale** rispetto al PC. Niente.

---

## 10. Le fonti

**Reddit è risultato bloccato** allo strumento di ricerca, come nelle sei ricerche precedenti. **WebFetch è bloccato dal proxy**: ho potuto leggere solo quello che il motore di ricerca restituisce, non le pagine intere. Dove questo limita il risultato, l'ho scritto al punto 9.

**Matematica e progettazione degli incrementali**
- Envato Tuts+ — *Numbers Getting Bigger: The Design and Math of Incremental Games*
- Kongregate Developer Blog / Game Developer — *The Math of Idle Games*, parti I, II, III (Anthony Pecorella)
- GDC Europe 2016 — Anthony Pecorella, *Quest for Progress: The Math and Design of Idle Games* (slide su GDC Vault, fogli di calcolo su archive.org)
- Machinations.io — articoli sul bilanciamento economico e documentazione *Level Progression*
- Lost Garden — *Value chains*
- gamedesigning.org — *How Reward Loops Keep Players Engaged in Game Design*
- GridInc — *Idle Games Best Practices*

**Numeri di gioco**
- Cookie Clicker Wiki (wiki.gg e Fandom) — costi base e produzione base degli edifici
- Satisfactory Wiki — struttura delle tappe e dei 9 livelli
- Factorio Mods — *Technology Price Multiplier*, *Hexi's Scaling Science Cost*, *RP Rebalanced Technology Costs* (per come si riscrive una curva e perché)
- Anno Union e Anno 1800 Wiki — progressione per livelli di popolazione
- CivFanatics e guide su Civilization VII — transizioni d'era, edifici "senza età", eredità

**Voci dei giocatori** (Discussioni Steam)
- Endless World Idle RPG, Nomad Idle, Idle Sphere, Idle Slayer, NGU Idle, Revolution Idle, IdleOn, Idle Champions of the Forgotten Realms
- un devlog su itch.io per i "tre orologi contemporanei"
