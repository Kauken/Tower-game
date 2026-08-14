# Consegne — stato del progetto

Ultimo aggiornamento: **2026-08-12 (notte)**. Chi riprende parte da qui.

Poi, in quest'ordine: `GDD.md` (cos'è il gioco) → `ROADMAP.md` (cosa si fa dopo) → `ARCHITETTURA.md` (dove si mettono le mani) → `MATERIALI.md` (i numeri) → `DECISIONI.md` (perché).

---

## Il gioco in tre righe

Un'isola vista dall'alto. **Tocchi le cose e dai ordini**; un operaio solo li esegue, uno per volta. Costruisci attrezzi, macchine e nastri finché la maggior parte del lavoro non la fa più lui — e allora puoi salpare per l'isola dopo.

> ### La risorsa scarsa è il **tempo dell'operaio**.
> Il gioco è comprare indietro il tempo di una persona sola. Ogni decisione si giudica così.

## Le sette regole che non si toccano

1. **NIENTE PERSONAGGIO DA GUIDARE.** Rifiutato **tre volte**. C'è un operaio, ma non lo si muove.
2. **UN OPERAIO SOLO, E NON SI ASSUME.** L'unica crescita è la tecnologia.
3. **LE TESSERE NON SI DEVONO VEDERE.** Niente bordi, mai. Si illumina solo quella sotto il dito, e solo mentre hai qualcosa in mano.
4. **NIENTE MAGAZZINO CENTRALE — all'inizio.** Le cose stanno in un posto e la distanza deve costare. *Il **terminale** del punto 18 è un magazzino centrale, ed è voluto: è il premio di fine gioco, e funziona solo perché prima hai passato ore a girare fra le casse.*
5. **NIENTE SI SPOSTA DA SOLO, NIENTE RICRESCE DA SOLO.** Un'automazione vale quanto la fatica che toglie.
6. **NIENTE PARTE SE NON L'HAI PRESO IN MANO.** Un tocco sul vuoto, a mani vuote, non fa niente.
7. **UN GRADINO NON È UN NUMERO PIÙ GRANDE: È UNA DOMANDA CHE SPARISCE.** Se non sai nominare la domanda che toglie, quel gradino non esiste.

## Dove siamo davvero

Il **codice** è a un punto onesto: si può giocare, e il giro completo funziona provato nel browser a 390×780.

Il **progetto** è appena stato riscritto: `GDD.md` v7.0 e `ROADMAP.md` v17 descrivono un gioco più grande di quello che c'è. Non è un errore, è l'ordine giusto — ma vuol dire che **una parte dei documenti descrive cose non ancora costruite**, e sono elencate qui sotto.

### Cosa funziona adesso, provato

Ordino otto alberi e l'operaio li fa in fila; nello zaino finiscono 32 legno e 8 alberelli in quattro caselle. Ordino un masso e **non parte** — in alto compare *zaino pieno* in giallo. Tocco la terra libera e pianta un alberello. Costruisco una cassa: si paga con gli 8 legno che ha **addosso**, si libera una casella, e riparte da solo per il masso. Apro il casotto, *Posa tutto*, e la roba ci finisce dentro. Nessun errore in console.

### Cosa il GDD descrive ma non esiste ancora

| Cosa | Punto |
| --- | --- |
| La **mano** (adesso il tocco sul vuoto pianta di default: è il difetto da togliere per primo) | 1 |
| Il ciclo del giorno **c'è ancora** e va tolto | 2 |
| Salvataggio | 3 |
| Giacimenti e ricchezza | 4 |
| Crafting, banco da lavoro, `ricette.json` | 5 |
| I progetti (adesso le tecnologie si pagano solo in monete) | 6 |
| Macchine, trivella, nastri | 8–11 |
| Le altre isole | 12 |

## La prossima cosa da fare

**Il punto 1, la mano.** È piccolo, ed è la fondazione di tutto quello che si piazzerà dopo: alberelli, casse, trivelle, macchine, nastri. Farlo dopo vorrebbe dire rifare ognuna di quelle cose.

Subito dopo il **punto 2** (via il giorno) e il **punto 3** (salvataggio), che insieme fanno una mezza giornata e sbloccano sessioni lunghe — senza le quali le verifiche della roadmap non valgono niente.

## Le semplificazioni note, e non sono difetti

- **L'operaio va in linea retta** e attraversa gli ostacoli. → punto 10.
- **I massi non tornano**, e sono otto: la pietra vera arriva coi giacimenti. → punto 4.
- **I numeri delle caselle e delle pile non sono misurati.** Quattro caselle, pile da 12/10/8, circa sette alberi per viaggio: ragionati, non provati. → primo lavoro del bilanciatore dopo il punto 7.
- **Tutti i numeri di `MATERIALI.md` sono una proposta coerente, non una verità.**
- **Si vedono righe leggerissime fra le tessere** in alcune zone d'erba. Tocca la regola 3, quindi va guardato: probabilmente sono macchie tonde di tessere vicine che si allineano per caso.

## Un avvertimento pratico

Durante l'ultima sessione la copia di lavoro è **tornata indietro a un commit vecchio sette volte**, una volta a metà di un intervento. Se trovi codice del tower defense (`combattenti.js`, `ondate.js`, `percorso.json`), non è un residuo da ripulire: è quello.

```
git fetch origin && git checkout -B <ramo> origin/main
```

**Mitigazione adottata: si spinge SUBITO dopo ogni commit**, e si unisce su `main` alla fine di ogni intervento.

> **Un commit locale non esiste.** Il 2026-08-13 un report di ricerca lungo 418 righe è stato committato e non spinto; il rollback se l'è portato via, e non è stato possibile recuperarlo. È la regola 3b di `CLAUDE.md`, e nasce da lì.
