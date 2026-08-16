# Interfaccia e inventario su telefono — ricerca

> **Copia di lavoro verificata.** `docs/PROGETTI.md` c'è, `docs/GDD.md` è la v7.1 e parla dell'isola e dell'operaio, non di torri. Non ho dovuto fare nessun `git checkout`. Ho letto il codice vero: `src/ui/Zaino.jsx`, `Cruscotto.jsx`, `Pannelli.jsx`, `CampoDiGioco.jsx`, `Bottone.jsx`, `src/game/disegno.js` e `config/motore.json` → `interfaccia`.

> **Come leggere i numeri.** Dove scrivo **[citato]** il numero viene da una fonte (linea guida ufficiale o devlog). Dove scrivo **[derivato]** l'ho calcolato io dal nostro codice o dedotto. Dove scrivo **[stimato]** è un mio giudizio.

*File in scrittura: lo sto riempiendo mano a mano. Le fonti stanno in fondo.*

---

## In una riga

> **Le caselle non dicono cosa contengono.** Oggi una casella è un pallino colorato da 11 px e un numero: per sapere che quel verde è "legno" devi già saperlo. Metti **un'icona riconoscibile in ogni casella**, e metà del "non si capisce niente" sparisce prima di toccare qualunque altra cosa.

Tutto il resto di questo documento è la seconda, terza e quarta cosa da fare. Ma questa è la prima.

---

## 1. Cosa abbiamo davvero, misurato

Numeri presi dal codice, non a occhio. Telefono di riferimento: **360 × 780 px CSS** (un Android medio; un iPhone SE è 375 × 667, un iPhone 15 è 393 × 852).

| Pezzo | Dov'è | Misura vera | Giudizio |
| --- | --- | --- | --- |
| Casella dello zaino | `Zaino.jsx` | **40 × 40 px** massimo, ed è premibile | **[derivato]** Sotto il minimo di Apple (44) e di Google (48). E il nostro stesso `motore.json` dice `altezza_minima_tocco: 64`: ci contraddiciamo da soli |
| Pallino del materiale | `Zaino.jsx`, `Casella` | **11 × 11 px**, solo colore | Illeggibile come informazione. Undici pixel di colore non sono un nome |
| Numero della quantità | `Zaino.jsx` | **13 px** (`testo_piccolo`) | Piccolo ma accettabile; il problema non è il numero, è che non si sa di *cosa* |
| Griglia di una cassa | `Pannelli.jsx`, `Griglia` | 6 colonne fisse → **≈ 47,8 px** per casella su 360 px di schermo | **[derivato]** Giusta come misura. Ma **non è premibile** (`pointerEvents: none`): è solo un disegno |
| Pastiglie "Posa / Prendi" | `Pannelli.jsx`, `Sposta` | `flex: 1 1 40%` → **2 per riga**, alte **48 px** | Misura giusta. Ma sono un **secondo elenco** che ripete quello che la griglia sopra ha già mostrato |
| Schede Cassa/Banco/Progetti | `Pannelli.jsx`, `Schede` | alte **42 px** | **[derivato]** Sotto i 44 di Apple. Due pixel, ma è proprio la riga che si sbaglia più spesso |
| Il foglio | `Pannelli.jsx`, `Foglio` | alto al massimo **100vh − 250 px** ≈ **530 px su 780** = **68 % dello schermo**, staccato **88 px** dal fondo | **[derivato]** Non copre "quasi tutto", ma **non oscura niente dietro** e **non si chiude con un gesto**: si chiude solo col bottone in fondo, che se la lista è lunga è fuori schermo |
| Riga dell'operaio | `Cruscotto.jsx` | testo **13 px**, colore debole | La cosa più importante del gioco ("che sta facendo") è scritta più piccola di tutto il resto |
| Progetti | `Pannelli.jsx` | lista verticale di riquadri **disabilitati** | Dice *"prima devi fabbricare: X"*, ma **non dice mai quanto materiale ti manca** |
| Macchina sull'isola | `disegno.js` | pallino di stato, lama che gira, fiamma, barretta del cassetto pieno | **Questa parte è già fatta bene.** È il pezzo migliore dell'interfaccia |

**La cosa che salta all'occhio leggendo il codice:** l'isola (canvas) racconta più cose del pannello. Sull'isola una macchina ha lama che gira, fiamma, pallino di stato e barra del pieno. Nello zaino un materiale ha un pallino da 11 px.

---

## 2. Le sette domande

### 2.1 Il foglio che copre tutto — è la scelta giusta?

**Sì come forma, no come è fatto adesso.** Il foglio che sale dal basso (*bottom sheet*) è il pattern standard su telefono in verticale, ed è raccomandato sia da Material Design sia dalle app di riferimento. Il motivo è la **zona del pollice**: la mappa della mano divide lo schermo in verde (basso e centro, si arriva senza sforzo), giallo (metà, ci si stira) e rosso (angoli in alto, non ci si arriva) **[citato, Parachute Design / Elaris]**. Un pannello che nasce in basso nasce già nel verde.

Quello che ci manca rispetto allo standard:

1. **Nessuna maniglia da trascinare.** Material dice che un foglio modale può avere una maniglia che lo porta fra posizioni di aggancio (*snap point*), e che con velocità sopra i **500 px/s** si espande o si chiude **[citato, Material]**. Da noi il foglio non si può né alzare né abbassare col dito.
2. **Nessuno sfondo oscurato.** Material: il foglio modale **blocca il contenuto dietro** e va toccato o chiuso. Da noi resta tutto acceso e uguale, quindi non si capisce che sei "dentro" qualcosa.
3. **Nessuna chiusura a gesto.** Material: si chiude toccando fuori o scorrendo giù **[citato]**. Da noi c'è solo un bottone "Chiudi", e sta **in fondo a un contenuto che scorre** — cioè nel punto peggiore possibile.
4. **Un'altezza sola.** Material dice che l'altezza la detta il contenuto **[citato]**. Un foglio a due altezze (mezzo e pieno) è esattamente il caso nostro: la cassa vuole mezzo schermo, i Progetti lo vogliono tutto.

**Quindi:** il foglio va tenuto, ma gli mancano tre cose banali — maniglia, sfondo scurito, chiusura a gesto — e una meno banale: **due altezze invece di una**.

### 2.2 L'inventario a caselle su schermo piccolo

Numeri di riferimento:

| Fonte | Misura minima | Nota |
| --- | --- | --- |
| Apple HIG | **44 × 44 pt** per ogni controllo | **[citato]** |
| Material Design | **48 × 48 dp** | **[citato]** |
| WCAG 2.5.5 | 44 × 44 px | **[citato]** |

Su un telefono da 360 px di larghezza, con margini da 12 px e padding da 12 px, restano **312 px utili**. Da lì **[derivato]**:

| Colonne | Casella | Verdetto |
| --- | --- | --- |
| 4 | ≈ 72 px | Comodissima, ma si vedono poche cose |
| 5 | ≈ 57 px | **Il punto giusto per caselle da toccare** |
| 6 | ≈ 48 px | Al limite esatto di Material. Bene per guardare, teso per toccare |
| 7 | ≈ 40 px | Sotto il minimo. Da non fare |
| 8 | ≈ 34 px | Da non fare |

La nostra griglia sta a 6 (≈ 48 px): giusta finché **guardi**, stretta appena diventa **premibile**. Lo zaino invece sta a **40 px** ed è già premibile oggi: quello è un errore misurabile.

Come si legge la quantità, negli altri: **numero in basso a destra della casella**, con contorno o ombra, sopra l'icona — non sotto. È la convenzione di Minecraft e Terraria, ed è quella che i giocatori riconoscono senza spiegazioni. Da noi il numero sta **sotto** un pallino, e la casella sembra un bottone generico.

### 2.3 Spostare roba fra due contenitori col dito

Qui abbiamo una **buona notizia**: la scelta già fatta (pastiglie "Posa" / "Prendi", un tocco per materiale) è quella che i devlog difendono, non quella che criticano.

Il devlog di **Terraria mobile** (David Welch, tre parti su Medium) racconta il problema esatto: distinguere *"trascino un oggetto col dito"* da *"faccio scorrere l'inventario"* è costato iterazioni, e la soluzione finale è stata **un ritardo di una frazione di secondo** fra il tocco e la presa dell'oggetto **[citato]**. Cioè: il trascinamento su telefono funziona solo se ci metti sopra una toppa, e la toppa rende tutto un po' più lento.

Lo stesso devlog dice che con schermi separati per inventario / fabbricazione / cassa, il problema che resta è proprio **come sposti la roba da uno schermo all'altro** **[citato]**. È il nostro problema, uguale.

I giocatori di Terraria 1.3 mobile si sono lamentati di: **troppi bottoni troppo piccoli**, menù **affollato**, e la richiesta esplicita di **icone più grandi** e di **separare la fabbricazione dagli oggetti** **[citato, forum]**.

**Verdetto:** trascinare no. Tocco singolo sì. Ma le nostre pastiglie hanno un difetto: **duplicano la griglia**. Vedi le stesse cose due volte, e la seconda volta con un verbo davanti. La strada standard è **rendere premibile la griglia stessa**: tocchi la casella → la sposti.

### 2.4 Far capire cosa fa una macchina senza aprire niente

**Questa parte da noi è già buona.** Da `disegno.js`: pallino di stato colorato, lama che gira *solo quando lavora*, fiamma che guizza, barretta del cassetto d'uscita pieno. È esattamente quello che fanno i giochi di fabbrica: il movimento è l'informazione.

Quello che manca: **cosa entra e cosa esce non si vede mai dall'isola.** Devi aprire il pannello per sapere se è una segheria o una fornace.

### 2.5 Le schede dentro un pannello

Da approfondire (ricerche in corso).

### 2.6 L'albero delle tecnologie su schermo piccolo

Da approfondire (ricerche in corso).

### 2.7 I tre errori più comuni

Primi due già confermati:

1. **Trattare il telefono come un desktop rimpicciolito.** È l'errore numero uno citato ovunque, ed è *letteralmente* quello che è successo a Terraria mobile 1.3: hanno rifatto l'interfaccia "più simile alla versione desktop" e i giocatori l'hanno bocciata **[citato]**.
2. **Bottoni troppo piccoli e troppo vicini.** Sotto i 44 px si sbaglia; e mettere due comandi diversi troppo vicini nella zona del pollice fa premere quello sbagliato **[citato]**.
3. In verifica.

---

## Fonti

*(elenco in coda, da completare)*
