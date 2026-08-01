# Tower Defense Roguelike — Documento di design v0.2

**Decisioni chiuse:** ambientazione fantasy/medievale · piazzamento misto (caselle predefinite + slot speciali rari) · partita da 10–15 minuti.

> I numeri indicati sono **valori di partenza da tarare**, non definitivi.
> Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Concetto in una riga

Tower defense fantasy a percorso fisso in cui ogni partita è una corsa di ~13 minuti: piazzi torri su caselle contate, e a ogni ondata raccogli potenziamenti casuali che si combinano tra loro creando build sempre diverse. Si perde, si sblocca qualcosa, si ricomincia.

---

## 2. Struttura di una partita (run)

| | |
|---|---|
| Atti per run | 3 |
| Ondate per atto | 5 normali + 1 boss = 6 |
| Ondate totali | **18** |
| Vite iniziali | 10 |
| Durata stimata | **12–14 minuti** |

Stima del tempo: 15 ondate normali × ~30 s + 3 boss × ~60 s + pause di scelta ≈ 13 min.

### Il doppio ritmo delle ricompense

Con una run corta non puoi mettere una scelta importante dopo ogni ondata: diventa lenta e le scelte perdono peso. Servono due ritmi diversi:

| Quando | Cosa succede | Tempo |
|---|---|---|
| **Dopo ogni ondata** | Negozio rapido: spendi oro in torri e moduli economici, oppure salti con un tap | 5–10 s |
| **Dopo le ondate 2, 4 e 6 di ogni atto** | **3 carte, ne scegli 1** — il momento importante | 15–20 s |

Fanno **9 scelte grosse per partita**: abbastanza per costruire una build riconoscibile, poche abbastanza da restare significative.

- Fine di ogni atto → boss, poi **scelta del percorso** per l'atto successivo (vedi §7).
- Vittoria = si completa l'atto 3. Sconfitta = 10 nemici superano il traguardo.

### Conseguenze della run corta (importanti)

Comprimere da 27 a 18 ondate non è solo togliere ondate. Cambia tre cose:

1. **La curva di potenza deve salire prima.** Un potenziamento che si nota solo dopo 10 ondate qui non serve a niente: ogni carta deve cambiare qualcosa **subito**.
2. **L'oro entra più in fretta.** Il giocatore deve avere 3 torri già all'ondata 4, non all'ondata 10.
3. **Si piazzano poche torri.** Tetto realistico: **5–6 torri per partita**. Quindi il gioco è "poche torri molto potenziate", non "tante torri base". Questo è un pregio: rende i moduli il vero centro delle decisioni.

**Vincolo mobile, non negoziabile:** anche 13 minuti su telefono vengono interrotti. Serve **salvataggio automatico a ogni fine ondata** e ripresa esatta della partita alla riapertura. Va progettato dall'inizio, non aggiunto dopo.

---

## 3. Le torri

Set **fisso**, uguale in ogni partita — la varietà non viene dalle torri ma dai potenziamenti sopra di esse.

| Torre | Ruolo | Note |
|---|---|---|
| **Balestriere** | Danno costante mono-bersaglio | La torre affidabile, sempre valida |
| **Catapulta** | Danno ad area, cadenza lenta | Indispensabile contro gli sciami |
| **Cappella del Gelo** | Poco danno, molto rallentamento | Abilita le sinergie di controllo |
| **Obelisco** | Non spara: potenzia le torri adiacenti | Rende il piazzamento una decisione |

`[DA DECIDERE]` Costi in oro e statistiche di partenza.

**Regola di design:** ogni torre deve avere almeno un modulo che la trasforma completamente. Se una torre è sempre la scelta ovvia o sempre inutile, va tolta o riprogettata.

### Le caselle di piazzamento

Piazzamento **misto**, come deciso:

- **9 caselle normali** disposte lungo il percorso, disegnate a mano sulla mappa
- **2 slot speciali** per mappa, in posizioni scomode o contese:
  - **Altura rocciosa** → +30% raggio alla torre che ci sta sopra
  - **Vena di mana** → +25% cadenza di fuoco

Con 9+2 caselle e un tetto di 5–6 torri, il giocatore **non può riempire tutto**: ogni piazzamento è una rinuncia. È esattamente l'effetto che vuoi.

Nel file di configurazione ogni mappa è un elenco di caselle con coordinate e tipo (`normale` / `altura` / `mana`). Aggiungere una mappa nuova = aggiungere un blocco JSON, non scrivere codice.

`[DA DECIDERE]` Si possono vendere o spostare le torri durante la partita? (Consiglio: vendita sì, a rimborso parziale; spostamento no, altrimenti gli slot speciali perdono peso.)

---

## 4. I nemici

| Tipo | Caratteristica | Serve a |
|---|---|---|
| **Fante** | Bilanciato | Riempimento |
| **Ratto nero** | Poca vita, alta velocità | Punire chi ha solo torri lente |
| **Golem di pietra** | Riduzione danno fissa | Punire chi ha solo colpi deboli e rapidi |
| **Sciame di goblin** | Tanti, debolissimi | Rendere indispensabile il danno ad area |

**Boss di fine atto — Signore della Guerra:** molta vita, corazzato, e un'abilità. `[DA DECIDERE]` quale: cura i nemici vicini, oppure diventa immune ai rallentamenti a intervalli.

**Scalatura difficoltà:** vita nemici e ricompense crescono per ondata secondo una formula nel file di configurazione, mai scritta a mano ondata per ondata. Con sole 18 ondate la curva è ripida: prevedi che l'ondata 18 sia circa 25–30× l'ondata 1.

---

## 5. I potenziamenti — il cuore del gioco

Tre famiglie **distinte**, con pool separati:

1. **Moduli** — si applicano a **una torre specifica** già piazzata (es. "questa torre incendia i bersagli").
2. **Reliquie** — effetti **globali** per tutta la partita (es. "+15% oro da ogni nemico").
3. **Consumabili** — uso singolo, immediati (es. "elimina tutti i nemici in campo", "+3 vite").

### Il sistema di sinergie (il punto tecnico critico)

Alla Binding of Isaac le combinazioni sembrano infinite, ma **non si scrivono a coppie**: N potenziamenti a coppie fanno N² regole ingestibili.

Si usa un **sistema a tag**. Ogni potenziamento porta uno o più tag:

```
FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ
```

Le sinergie sono **regole che si attivano quando due tag convivono**, non quando due oggetti specifici convivono:

- `FUOCO + AREA` → le fiamme si propagano ai nemici vicini
- `GELO + FULMINE` → i nemici congelati conducono il fulmine a due bersagli in più
- `VELENO + RAPIDITÀ` → ogni colpo aggiunge una carica di veleno invece di sostituirla
- `SACRO + GELO` → i nemici rallentati subiscono sempre colpo critico
- `ORO + VELENO` → i nemici uccisi dal veleno rilasciano oro doppio

Vantaggio pratico: con 40 potenziamenti e 12 regole di sinergia ottieni centinaia di combinazioni percepite, ma resta tutto leggibile e correggibile.

`[DA DECIDERE]` L'elenco definitivo dei tag e le prime 12 regole di sinergia.

`[DA DECIDERE]` I moduli si possono spostare da una torre all'altra? Se una torre viene venduta, i moduli si perdono?

---

## 6. Ondate speciali e negozio del mercante

- **L'ondata 3 di ogni atto è un'ondata élite:** nemici potenziati, e rilascia un **gettone**.
- Il gettone si spende dal **mercante errante** che compare dopo il boss: 3 articoli di qualità alta, ne prendi 1.
- Il negozio in oro di fine ondata resta separato e funziona sempre.

Tre ritmi diversi in tutto: il negozio rapido (ogni ondata), la carta (3 volte per atto), il mercante (1 volta per atto).

---

## 7. Percorsi a scelta

A fine atto si sceglie fra **2 percorsi**, mostrati con l'anticipazione di cosa contengono:

- *Sentiero delle Rovine* — nemici +25% vita, ma una reliquia rara garantita
- *Strada del Mercato* — nemici normali, ricompensa in oro

Copre il "vari percorsi" senza costruire una mappa ramificata. Una mappa a nodi in stile Slay the Spire è una **v2**.

---

## 8. Economia — doppia valuta

| Valuta | Dove si guadagna | Dove si spende | Sopravvive alla sconfitta? |
|---|---|---|---|
| **Oro** | Uccidendo nemici, fine ondata | Torri, moduli in partita | **No**, si azzera |
| **Cristalli** | Fine partita, in base a ondate raggiunte e obiettivi | Potenziamenti permanenti, sblocco personaggi | **Sì** |

Regola ferrea: le due valute non si convertono mai una nell'altra. Se si toccano, il gioco si rompe economicamente.

**Ricompensa anche in caso di sconfitta.** Perdere all'ondata 11 deve dare cristalli. Se una run persa dà zero, il giocatore smette.

---

## 9. Personaggi

Ogni personaggio cambia **le condizioni di partenza**, non le regole:

- una torre iniziale gratuita diversa
- un modificatore permanente (es. "+20% oro, −2 vite iniziali")
- eventualmente un potenziamento garantito nel pool

Proposta v1: **1 personaggio giocabile**, sistema già predisposto per 4. `[DA DECIDERE]` I 4 profili.

---

## 10. Obiettivi e sblocchi

- *di progressione*: "raggiungi l'atto 2" → sblocca l'Obelisco
- *di sfida*: "vinci senza mai piazzare la Catapulta" → sblocca un personaggio
- *di scoperta*: "attiva 5 sinergie diverse in una partita" → sblocca potenziamenti nel pool

**Importante:** gli sblocchi devono aggiungere *varietà*, non *potenza*. Se sbloccare rende il gioco più facile, la sfida evapora.

---

## 11. Cosa è casuale e cosa no

| Elemento | Casuale? |
|---|---|
| Percorso e caselle della mappa | No — disegnati a mano |
| Set di torri disponibili | No — sempre lo stesso |
| Potenziamenti offerti | **Sì** — 3 pescati dal pool, filtrati per evitare doppioni inutili |
| Composizione delle ondate | Parzialmente — schema fisso per atto, variazione sui tipi |
| Contenuto del mercante | **Sì** |

---

## 12. Architettura tecnica

- **Campo di gioco**: un unico `<canvas>` 2D. Nemici, torri e proiettili disegnati lì dentro, mai come elementi DOM.
- **Interfaccia** (oro, vite, negozio, carte, menù): React sopra al canvas.
- **Impacchettamento**: Capacitor → build Android e iOS dallo stesso codice.
- **Salvataggio**: Capacitor Preferences (non `localStorage`, che su iOS può essere ripulito).

### Regola non negoziabile: tutti i numeri fuori dal codice

Un solo file `config/` in JSON contiene:

- statistiche torri (costo, danno, cadenza, raggio)
- statistiche nemici e formula di scalatura per ondata
- mappe: coordinate del percorso e elenco caselle con tipo
- elenco potenziamenti con tag ed effetti
- regole di sinergia
- costi, ricompense, curve economiche

Il codice **legge** questi valori, non li contiene. Così bilanci il gioco modificando un file di testo, senza toccare la logica e senza rompere nulla.

---

## 13. Ambito della v1 — cosa NON fare adesso

- audio e musica
- animazioni curate ed effetti particellari
- più di 1 mappa
- più di 1 personaggio
- pubblicità e acquisti in-app
- menù, impostazioni, schermata titolo
- traduzioni

---

## 14. Ordine di costruzione con Claude Code

Un sistema alla volta, testando dopo ognuno. Non chiedere mai "fammi il gioco".

1. Canvas + percorso disegnato + caselle visibili + un nemico che percorre la strada
2. Piazzamento del Balestriere + proiettili + morte del nemico
3. Sistema ondate + oro + vite
4. Le altre 3 torri e i 2 slot speciali, letti da file di configurazione
5. Negozio rapido di fine ondata + schermata "3 carte, ne scegli 1" (solo moduli)
6. Sistema tag + prime 6 regole di sinergia
7. Reliquie globali
8. Atti, boss, condizione di vittoria
9. Salvataggio e ripresa partita
10. Cristalli e primi 5 potenziamenti permanenti
11. Obiettivi e sblocchi
12. Ondata élite, gettoni e mercante

**Test obbligatorio dopo il punto 5.** Se in quel momento non hai voglia di rigiocare, il problema è nel design e va risolto lì, prima di costruire i punti 6–12.

---

## 15. Punti aperti rimasti

- `[DA DECIDERE]` Vendita e spostamento torri
- `[DA DECIDERE]` Spostamento moduli e cosa succede se la torre viene venduta
- `[DA DECIDERE]` Abilità del boss
- `[DA DECIDERE]` I 4 profili personaggio
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
