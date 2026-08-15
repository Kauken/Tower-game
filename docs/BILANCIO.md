# Il bilancio del progetto

*Scritto il 2026-08-15, guardando il progetto vero e non i documenti che lo descrivono.*

---

## I numeri, prima di qualunque opinione

| Cosa | Quanto |
| --- | --- |
| Codice del gioco | **5.294 righe** |
| Configurazione | 726 righe |
| Strumenti di misura | 641 righe |
| Documenti di progetto | **1.803 righe** |
| **Ricerche** | **5.098 righe in 17 file** |
| Punti di roadmap | 28, di cui **7 fatti** |
| Durata misurata della partita | **13 minuti e mezzo** |

E il numero che dice tutto:

> **Oggi ci sono stati 12 commit. Nessuno di questi ha toccato il gioco.**

Abbiamo scritto **6.900 righe** su come dev'essere il gioco, contro **5.294 righe** di gioco. E il gioco, in una giornata intera di lavoro, non è cresciuto di una riga.

---

## Cosa funziona, e va difeso

### 1. Le fondamenta reggono, e sono state provate
Il motore, il mondo a tessere, la telecamera, l'inventario a caselle, il salvataggio, i lavori, il disegno con le sagome. **`npm run build` passa**, e la logica sta in piedi **senza il canvas** — lo dimostra la simulazione headless, che carica i moduli veri.

Non è poco: cinque versioni precedenti sono morte prima di arrivare qui.

### 2. Gli strumenti di misura — la cosa più preziosa che abbiamo
`npm run simula` e `npm run progressione` non sono un lusso da programmatori: hanno **trovato quattro difetti veri** che nessuna lettura avrebbe trovato.

| Trovato dalla misura | Cos'era |
| --- | --- |
| Il **Piccone pesante** non funzionava sulle vene | si comprava un attrezzo che non faceva niente |
| Lo **Zaino grande** rende ×1,00 | e il motivo non era il prezzo |
| **Raffinare prima di vendere è sempre una perdita** | −4,5 monete a gesto |
| Lo **zaino a 3 caselle rompe il gioco** | proposta mia, smontata dalla misura |

**Tre di questi quattro erano errori miei.** Uno strumento che smentisce chi l'ha scritto vale il doppio.

### 3. Le regole hanno il "perché" attaccato
Ogni regola in `CLAUDE.md` dice **da dove viene**. Ed è per questo che **quattro regole sono state rovesciate** quando le ricerche le hanno smentite, invece di sopravvivere per inerzia. Un progetto che sa correggersi è più solido di uno che non sbaglia mai sulla carta.

### 4. Il registro delle decisioni, con le parole dell'autore
`DECISIONI.md` tiene le date e le frasi esatte. È il motivo per cui le commesse non sono tornate dentro tre volte, e per cui il personaggio da muovere è rimasto fuori.

---

## Cosa non funziona

### 1. ⚠️ Il progetto ha smesso di essere costruito e ha cominciato a essere studiato

È il difetto principale, e nasconde tutti gli altri.

**5.098 righe di ricerca** sono più di quasi tutto il resto messo insieme. E la ricerca stessa avvisa che sta rendendo meno:

- *"terza conferma indipendente"* di una cosa già nota — scritto nel report su cosa manca;
- *"per il secondo report di fila, nessuno pubblica quante ore duri un'era"*;
- *"nessuna soglia numerica fra fatica e macinare. Confermato per la terza volta. **Il numero probabilmente non esiste.**"*
- **Reddit è risultato bloccato in 15 ricerche su 15.**

Le ultime ricerche hanno prodotto più conferme che scoperte. **Non è che la ricerca sia stata inutile — è che ha già dato quasi tutto quello che poteva dare.**

### 2. 🛑 La verifica del punto 7 è ferma da quindici ricerche

La roadmap ha un blocco che dice, con l'emoji del divieto: **non si va avanti senza rispondere.**

> 1. *Guardando la bacheca dei progetti, ce n'è uno che vuoi?*
> 2. *Portare la roba a mano dà fastidio quel tanto che basta?*

Sono lì da due giorni. **Nel frattempo abbiamo prodotto 5.000 righe di ricerca e zero risposte a quelle due domande.** La regola del progetto dice di fermarsi; ci siamo fermati a costruire, non a studiare.

E la beffa è che quelle due domande **valgono più di tutte le ricerche messe insieme**, perché nessun forum può rispondere al posto dell'autore.

### 3. Lo scopo è cresciuto molto, in un giorno solo

Cose entrate nel progetto **oggi**: il cantiere, gli animali, le colture, i treni, i droni, il carro, il registro, il rimborso pieno, le spiegazioni richiamabili, il deposito rapido, il finale che non chiude, il cozy.

Sono quasi tutte **buone idee con una ragione dietro**. Ma la lezione scritta in cima alla roadmap è:

> *"Il progetto è morto ogni volta perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente."*

**E oggi non stiamo costruendo il gioco intero: lo stiamo progettando intero.** È lo stesso errore in una forma più economica — ma è lo stesso errore.

### 4. I documenti hanno cominciato a contraddirsi

Ne ho corrette diverse oggi (le fasce d'era, la curva, la regola della ricostruzione, il blackout). Ma la velocità con cui nascono dice che **sono troppi documenti per la dimensione del gioco**: `GDD` + `ROADMAP` + `PROGETTI` + `MATERIALI` + `DECISIONI` + `ARCHITETTURA` + `PROCESSO` + `HANDOFF` + 17 ricerche, per un gioco da 13 minuti.

### 5. La copia di lavoro è tornata indietro **dodici volte**

Non è colpa del progetto, è l'ambiente. Ma il costo è reale: ogni ripristino è tempo, e **una volta si è portata via un lavoro intero**. La contromisura (spingere subito dopo ogni commit) funziona e va tenuta.

### 6. Tre domande all'autore sono aperte e ne bloccano una parte

1. **Si tolgono le monete?** — senza mercante non hanno più una sorgente
2. **I droni esistono, e con che freno?**
3. **Quanto è grande un'isola?** — da qui dipende il mestiere del carro

---

## Cosa serve e cosa no

### Serve
- **Costruire la Segheria.** È il primo dei 32 progetti che mancano, ed è quello che trasforma una lavorazione in perdita a mano in una in guadagno da sola. È il pezzo centrale dell'Era del Fuoco.
- **Le due risposte del punto 7.** Non sono un formalismo: se guardando la bacheca non c'è niente che vuoi, tutto il resto è costruito sulla sabbia.
- **Una passata di consolidamento dei documenti**, una volta sola, per togliere le contraddizioni rimaste.

### Non serve (adesso)
- **Altre ricerche sullo stesso terreno.** Le tre ultime hanno prodotto conferme, non scoperte.
- **Progettare le ere 3 e 4 nel dettaglio.** Sono a dieci ore di distanza da un gioco che ne dura 0,2.
- **Decidere i prezzi.** Non si tarano finché non ci sono le macchine, e la regola è già scritta.

---

## La raccomandazione, in una riga

> **Il progetto non ha bisogno di sapere altro. Ha bisogno di una macchina che gira.**

Il modo di verificare tutto quello che abbiamo studiato non è studiarlo meglio: è **mettere la Segheria nel gioco** e vedere se, guardandola macinare tronchi, viene voglia di costruirne un'altra.

Se viene, le 5.000 righe di ricerca erano giuste. Se non viene, nessuna di quelle righe ce lo avrebbe detto lo stesso.
