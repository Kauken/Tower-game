# Lista di costruzione — v8

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v4.0: **gestionale di fattoria con catene di
produzione** — Stardew per l'economia, Minecraft moddato per la scala tecnica,
un pizzico di RimWorld per chi ci lavora.

## Come è ordinata

Ogni punto deve lasciare qualcosa di **giocabile col pollice**, e la domanda più
grossa riceve risposta per prima:

> **Alla fine di una giornata, hai voglia di farne un'altra?**

Ci si arriva al punto 3. Macchine, commesse, braccianti e appezzamenti sono
tutti inutili se lì la risposta è no.

**La lezione delle versioni precedenti:** il progetto è morto ogni volta perché
abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era
divertente. I blocchi di verifica non sono una formalità.

---

## Fase A — il ciclo economico deve funzionare

1. **I semi costano e si consumano.** — **FATTO** (2026-08-11). Piantare consuma un seme. Le caselle hanno tre stati: incolto (con i ciuffi d'erba), arato, occupato. Si parte con 6 caselle arate, 4 semi di rapa e 60 monete: non puoi riempire il campo neanche volendo. Estirpare restituisce il seme.
2. **Vendere e comprare.** — **FATTO** (2026-08-11). Il mercato compra il raccolto a prezzi che oscillano ogni giorno, e vende i semi. Quelli che non ti puoi permettere restano visibili ma spenti: vedere quanto manca al Lino e' meta' del motivo per tornare domani. Dissodare costa, e il costo sale a ogni casella aperta.
3. **Il giorno.** — **FATTO** (2026-08-11). Dura 90 secondi; il cruscotto mostra sempre quanto manca a sera e quanto si paghera'. A fine giornata si paga la manutenzione (3 per casella arata), i prezzi si rifanno, e un riepilogo dice raccolti, incassato, speso e saldo. Se non bastano i soldi una casella vuota torna incolta: **non si perde mai**.

> ### 🛑 Verifica dopo il punto 3 — non si va avanti senza
> **Alla fine di una giornata, hai voglia di farne un'altra?** E soprattutto:
> **decidere cosa piantare è una decisione vera**, o c'è sempre un seme
> ovviamente migliore? Se è ovvio, si risolve qui coi numeri, non aggiungendo
> contenuto sopra.

4. **Le commesse.** La bacheca che chiede roba precisa, paga molto di più del mercato e sblocca lavorazioni. È il "non vedo l'ora", ed è la decisione *vendo o tengo da parte*.
5. **Lo scavo e i minerali.** Le rocce sul campo: tocchi, si crepa, si spacca. È l'unica cosa attiva del gioco.

## Fase B — la scala tecnica

6. **La prima lavorazione**: il Mulino (grano → farina), costruito con rame. È il momento in cui colture e minerali diventano un gioco solo.
7. **La catena a due passaggi**: il Forno (farina → pane). Il valore si moltiplica a ogni passaggio.
8. **I braccianti**: assumi, assegni un mestiere e una zona, li paghi ogni giorno.

> ### 🛑 Verifica dopo il punto 8
> **"Assumo o me lo faccio da solo" è una decisione difficile?** Se assumere è
> sempre giusto o sempre sbagliato, i salari sono tarati male.

9. **Le macchine che sostituiscono i braccianti**: costano molto di più subito, niente dopo. Nasce la decisione *assumo o compro*.
10. **Il secondo appezzamento** e la ristrutturazione: la macchina migliore non entra dove stava la vecchia.

> ### 🛑 Verifica dopo il punto 10
> **C'è qualcosa che non vedi l'ora di sbloccare?** Se guardi la bacheca e non
> desideri niente, gli sblocchi stanno dando numeri invece di verbi.

## Fase C — il gioco intero

11. **Gli eventi**: la settimana secca, il mercante di passaggio col seme raro. Poco e ben distanziato, come lo storyteller di RimWorld.
12. **Le stagioni**, se la decisione aperta 5 si chiude a favore.
13. **Salvataggio e ripresa**, con la produzione a app chiusa.
14. **Altre colture, minerali, lavorazioni e commesse** con l'agente `designer-contenuti`.
15. **Il ritmo degli sblocchi**: nessun buco noioso, misurato con la simulazione headless.
16. **Rifinitura**: suoni, animazioni, il piacere del gesto, con l'agente `rifinitore`.
17. **Impacchettamento mobile** con Capacitor.

---

## Cosa è stato tolto, e perché

**Il puzzle di vicinanze (2026-08-11).** Filare (monocoltura) e Rotazione
(varietà) erano regole nate per fare un puzzle di incastro. L'autore ha
chiarito che non vuole un puzzle game ma un farmer, quindi sono state rimosse.
**Resta solo l'acqua**, perché irrigare è agricoltura e si capisce senza
spiegazioni.

I veri problemi di disposizione arriveranno dalle macchine — cosa alimenta
cosa, dove sta il magazzino — e nasceranno dalla simulazione, non da
moltiplicatori inventati.

**Il tower defense (2026-08-11).** Si è salvata solo l'impalcatura: motore a
passo fisso, strutture preallocate, canvas separato da React, coda dei comandi,
numeri solo in `config/`, e la simulazione headless.
