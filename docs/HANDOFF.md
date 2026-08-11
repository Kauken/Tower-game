# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-11. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco è cambiato il 2026-08-11

Il gioco è una **fattoria cozy su griglia, con colture, minerali, tecnologie e automazioni** (`GDD.md` v3.0, roadmap v7).

Le versioni precedenti — tower defense a labirinto, battaglia a corsie, assedio a campo aperto, action roguelike a stanze, **tower defense in cui si compravano reclute** — non esistono più. Se trovi codice, configurazione o documenti che nominano **reclute, ondate, nemici, castello, torri, sentiero, postazioni, stanze, minion, levetta**, sono resti da rimuovere, non funzionalità da mantenere.

## Cos'è il gioco

Una griglia verticale di caselle. Ci piazzi colture, canali, e più avanti rocce e macchine. **Lo spazio è l'unica cosa che scarseggia**, e **quello che metti vicino a cosa cambia quanto rende**. Non si può perdere, non c'è fretta, non c'è nessun combattimento.

**La domanda che regge tutto il gioco è una sola: piazzare una cosa e vederla incastrarsi con le vicine è soddisfacente?** Se lì la risposta è no, nessuna quantità di tecnologie e automazioni lo salva.

Le vicinanze si contraddicono apposta: il **Filare** premia il grano vicino al grano, la **Rotazione** premia la coltura circondata da colture diverse. Sulla stessa griglia non puoi avere entrambe, ed è da lì che nasce la decisione.

## Stato del codice

**Punti 1 e 2 della roadmap FATTI.** C'è la griglia 5×8, il piazzamento, la crescita nel tempo, la raccolta, il magazzino, e le tre regole di vicinanza con il segno che si accende fra le caselle.

Provato nel browser a 390×780: il grano al centro di un filare di tre prende ×1.6 (1.25 due volte), la rapa circondata da grano e lino prende ×1.8 di Rotazione, il canale accelera il lino che tocca, e il magazzino si riempie raccogliendo. Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/griglia.js` | La geometria: indici, posizioni, vicini precalcolati |
| `src/game/fattoria.js` | Lo stato: cosa c'è su ogni casella, crescita, raccolta, ricalcolo delle vicinanze |
| `src/game/disegno.js` | Disegno di legami, contenuti, distintivi e selezione |
| `src/game/sfondo.js` | Terreno e reticolo, disegnati una volta sola |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/game/effetti.js` | Anelli di feedback, da pool preallocato |
| `src/ui/CampoDiGioco.jsx` | Monta i canvas, traduce il tocco in casella |
| `src/ui/Magazzino.jsx` | La striscia in alto: materiali e caselle usate |
| `src/ui/PannelloCasella.jsx` | Il foglio che sale dal basso quando tocchi una casella |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/griglia.json` | Area logica, colonne, righe, dimensione delle caselle |
| `config/contenuti.json` | Colture e terreni piazzabili, e i materiali |
| `config/vicinanze.json` | Le regole di adiacenza — **il cuore del gioco** |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## La prossima cosa da fare

**Fermarsi e provare.** C'è un blocco di verifica dopo il punto 2 in `ROADMAP.md`, e non è una formalità: il progetto è stato buttato cinque volte per aver costruito il gioco intero prima di sapere se il pezzo centrale funzionava.

La domanda a cui rispondere giocando: **ti viene voglia di spostare le cose per farle combaciare meglio, o stai solo riempiendo caselle?**

- Se **sì** → punto 3 (lo scavo) e poi punto 4 (la prima macchina).
- Se **no** → non si aggiunge contenuto sopra: si cambiano le regole in `config/vicinanze.json`, che è il posto dove vive la decisione.

## Cosa manca ancora (e non è un difetto)

Rocce e minerali, macchine, la bacheca degli sblocchi, le automazioni, l'espansione delle caselle, gli appezzamenti, il salvataggio, il tempo compresso col giorno che passa. Sono tutti punti della roadmap dal 3 in poi: **arrivano dopo la verifica**, non prima.
