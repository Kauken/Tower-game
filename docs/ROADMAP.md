# Lista di costruzione — v7

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v3.0: **una fattoria cozy su griglia, con minerali,
tecnologie e automazioni.**

## Come è ordinata

Ogni punto deve lasciare qualcosa di **giocabile col pollice**, e la domanda più
grossa riceve risposta per prima:

> **Piazzare una cosa sulla griglia e vedere che si incastra con le vicine è soddisfacente?**

Ci si arriva al punto 2. Tecnologie, appezzamenti, automazioni e bacheca sono
tutti inutili se lì la risposta è no.

**La lezione delle cinque versioni precedenti:** il progetto è morto ogni volta
perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale
era divertente. Il blocco della verifica dopo il punto 2 non è una formalità.

---

## Fase A — il nucleo deve funzionare

1. **La griglia.** — **FATTO** (2026-08-11). Griglia 5x8 verticale che riempie lo schermo del telefono. Tocchi una casella vuota, scegli fra Grano, Rapa, Lino e Canale, la vedi riempirsi dal basso mentre cresce, la raccogli toccandola e ricomincia. Magazzino in alto col contatore delle caselle usate. Si puo' togliere quello che si e' messo, altrimenti non si potrebbe provare a incastrare.
2. **Le vicinanze, e che si vedano.** — **FATTO** (2026-08-11). Tre regole in `config/vicinanze.json`: **Filare** (grano vicino a grano, si moltiplica per ogni vicino), **Irrigazione** (qualunque coltura che tocca un canale cresce piu' del doppio), **Rotazione** (una coltura circondata da due colture diverse da lei rende molto di piu'). Filare e Rotazione si contraddicono apposta. Fra due caselle in sinergia si accende un legame giallo, e sulla casella compare la pastiglia col moltiplicatore.

> ### 🛑 Verifica dopo il punto 2 — non si va avanti senza
> **Piazzare e incastrare è soddisfacente?** Ti viene voglia di spostare le cose
> per farle combaciare meglio, o stai solo riempiendo caselle? Se stai solo
> riempiendo, il gioco non esiste ancora e si risolve qui: si cambiano le regole
> di vicinanza, non si aggiunge contenuto sopra.

3. **Lo scavo.** Le rocce sulla griglia. Tocchi, si crepa, si spacca, escono minerali. È l'unica cosa attiva del gioco e deve essere piacevole da fare a vuoto.
4. **La prima macchina.** Qualcosa che consuma da una catena e produce nell'altra (il Mulino: grano → farina, costruito con rame). È il momento in cui colture e minerali diventano un gioco solo.
5. **Il tempo.** Il giorno che passa mentre guardi, e la produzione a app chiusa con il suo tetto.

> ### 🛑 Verifica dopo il punto 5
> **Una sessione da tre minuti contiene almeno una decisione?** Se apri, raccogli
> e chiudi senza aver scelto niente, manca il gioco.

## Fase B — l'avanzamento

6. **La bacheca degli sblocchi.** Le cose bloccate in ombra, col costo e con quanto manca. È il motore del "non vedo l'ora".
7. **Le prime automazioni**, con il loro costo in caselle: spaventapasseri (raccoglie) e semina automatica (ripianta).
8. **L'espansione**: comprare caselle nuove.
9. **Il secondo appezzamento** (la Collina), con la sua risorsa e le sue macchine.

> ### 🛑 Verifica dopo il punto 9
> **C'è qualcosa che non vedi l'ora di sbloccare?** Se guardi la bacheca e non
> desideri niente in particolare, gli sblocchi stanno dando numeri invece di verbi.

## Fase C — il gioco intero

10. **Il trasporto fra caselle** (il Carretto) e gli ordini permanenti.
11. **Il terzo appezzamento** (il Bosco) e le vicinanze di biodiversità.
12. **Salvataggio e ripresa**, con la produzione offline.
13. **Altre colture, minerali, macchine e vicinanze** con l'agente `designer-contenuti`.
14. **Il ritmo degli sblocchi**: nessun buco noioso, misurato con la simulazione headless.
15. **Rifinitura**: suoni, animazioni, il piacere del gesto, con l'agente `rifinitore`.
16. **Impacchettamento mobile** con Capacitor.

---

## Cosa resta del progetto precedente

Il tower defense è stato abbandonato il 2026-08-11. **Si è salvata l'impalcatura,
non il gioco:**

- il motore a passo fisso, i pool preallocati, canvas separato da React, la coda dei comandi
- la regola dei **numeri solo in `config/`**
- la **simulazione headless**, che qui vale ancora di più: simula ore di fattoria in un secondo e verifica che il ritmo degli sblocchi non abbia buchi
- le convenzioni touch

Sono spariti: `combattenti.js`, `ondate.js`, `percorso.js`, `oggetti.js`,
`economia.js`, `partita.js`, `effetti.js`, `sfondo.js` e tutte le configurazioni
del tower defense.
