# Lista di costruzione — v9

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v5.0: **un'isola da mandare avanti** — Stardew per
l'economia, Graveyard Keeper per le zone e i braccianti, Factorio e Satisfactory
per le catene. **Nessun personaggio: si comanda col dito.**

## Come è ordinata

La domanda più grossa riceve risposta per prima:

> **Guardare l'isola e comandarla col dito è piacevole?**

Ci si arriva al punto 1. Catene, zone, commesse e macchine sono tutti inutili
se lì la risposta è no.

**La lezione delle sei versioni precedenti:** il progetto è morto ogni volta
perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale
era divertente. I blocchi di verifica non sono una formalità — e questa
versione è la più grande di tutte, quindi contano il doppio.

---

## Fase A — il posto deve funzionare

1. **L'isola, la telecamera e il primo ordine.** — **FATTO** (2026-08-11). Un'isola di 24×30 tessere che non sembra una scacchiera: erba, sabbia, mare, riva. Si trascina col dito, un pulsante allontana la vista. Tocchi un albero o un masso e dai un ordine; lo tocchi di nuovo e lo annulli. Due braccianti — un taglialegna e un cavatore — prendono i lavori che sanno fare, ci vanno, li fanno, e il legno e la pietra arrivano in magazzino.

> ### ✅ Verifica dopo il punto 1 — **passata** (2026-08-11)
> *"Va bene, sembra un posto"* e *"Funziona, si capisce tutto"*.

> ### 🛑 Verifica dopo il punto 2 — non si va avanti senza
> **Si sente che la distanza costa?** Guardare un bracciante camminare avanti e
> indietro deve far venire voglia di mettergli una cassa vicino. Se costruire
> una cassa più vicina non cambia niente di percepibile, lo zaino è troppo
> grande o l'isola troppo piccola — e senza quel costo i nastri non serviranno
> a niente.

2. **Le cose stanno in un posto — niente magazzino centrale.** — **FATTO** (2026-08-11). Le risorse stanno dentro **casse**, non in un contatore. Il bracciante ha uno zaino da 12: raccoglie, si riempie, smette di lavorare e va a scaricare. **Dove scarica lo dici tu**: lo tocchi, premi *Dove scarica*, tocchi una cassa, e un filo tratteggiato ti fa vedere dove va. Si costruiscono casse nuove pagando **davvero** dalle casse esistenti. Il casotto è la prima cassa e c'è già all'avvio.
3. **Assumere e pagare.** Il giorno che passa, i salari a sera, il riepilogo. Assumere un bracciante è una spesa che torna ogni giorno.

> ### 🛑 Verifica dopo il punto 3
> **"Assumo o me lo faccio bastare" è una decisione difficile?** Se assumere è
> sempre giusto, i salari sono troppo bassi.

4. **I campi.** Dissodare, seminare, raccogliere: il contadino come terzo mestiere. I semi si comprano e si consumano.
5. **Il mercato e le commesse.** Vendere al molo, e la bacheca che chiede roba precisa e paga molto di più. È il "non vedo l'ora".

## Fase B — le catene

6. **La prima lavorazione**: il Mulino (grano → farina), costruito col rame. Colture e minerali diventano un gioco solo.
7. **La catena a due passaggi**: il Forno (farina → pane). Il valore si moltiplica a ogni passaggio.
8. **L'ordine permanente**: la lavorazione continua da sola finché ha materiale.
9. **I nastri**: la roba si sposta da sola da una cassa all'altra. **È il momento in cui la catena gira senza di te**, ed è il cuore della parte Factorio. Ha senso solo perché il punto 2 ha reso il trasporto un costo vero.

> ### 🛑 Verifica dopo il punto 9
> **Guardare la catena girare da sola dà soddisfazione?** Se no, manca il
> motivo per cui esiste tutto il resto.

## Fase C — l'isola intera

10. **Le zone**: la frana da sgomberare, il pontile da riparare. Ognuna porta una materia prima e un ramo di lavorazioni.
11. **Il percorso vero dei braccianti.** Adesso vanno in linea retta: basta su un'isola aperta, non basterà con recinti e capanne.
12. **Le macchine** che sostituiscono i braccianti: molto più care subito, niente dopo. Nasce la decisione *assumo o compro*.
13. **L'isola vicina** e la barca.
14. **Gli eventi**: la settimana secca, il mercante di passaggio. Poco e ben distanziato, come lo storyteller di RimWorld.
15. **Salvataggio e ripresa**, con la produzione a app chiusa.
16. **Altri materiali, lavorazioni e commesse** con l'agente `designer-contenuti`.
17. **Il ritmo**: nessun buco noioso, misurato con la simulazione headless.
18. **Rifinitura**: suoni, animazioni, il piacere del gesto, con l'agente `rifinitore`.
19. **Impacchettamento mobile** con Capacitor.

---

## Semplificazioni note del punto 1, da sistemare quando serviranno

- **I braccianti vanno in linea retta.** Attraversano gli alberi. Sull'isola aperta non si nota; col punto 11 arriva un percorso vero.
- **Nessuno paga nessuno.** I salari sono in configurazione ma non li legge nessuno. È il punto 3.
- **Una cassa piena** fa ripiegare il bracciante sulla più vicina con spazio, invece di bloccarlo. Va bene così finché non ci sono i nastri.

## Cosa è stato tolto, e perché

**La scacchiera (2026-08-11, sera tardi).** L'autore: *"non voglio questa cosa a
scacchiera"*. Le tessere restano **sotto**, invisibili, a far agganciare le cose —
come in Factorio, che è una griglia e non sembra una scacchiera. Sopra ci va
un'isola.

**Il personaggio da muovere.** Rifiutato dall'autore tre volte in tre versioni
diverse: *"non vorrei un personaggio ma più da gestionale che col dito comando"*.
Non riproporlo.

**Il tower defense, il roguelike a stanze, il puzzle di vicinanze.** Si è salvata
solo l'impalcatura: motore a passo fisso, strutture preallocate, canvas separato
da React, coda dei comandi, numeri solo in `config/`.
