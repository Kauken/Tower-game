# Lista di costruzione — v10

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v5.0: **un'isola da mandare avanti** — Stardew per
l'economia, Graveyard Keeper per le zone e i braccianti, Factorio e Satisfactory
per le catene. **Nessun personaggio: si comanda col dito.**

## Come è ordinata

La domanda più grossa riceve risposta per prima:

> **Apri l'isola e sai già cosa vuoi fare?**

Ci si arriva al punto 4. Catene, zone, nastri e macchine sono tutti inutili
se lì la risposta è no.

**La lezione delle sei versioni precedenti:** il progetto è morto ogni volta
perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale
era divertente. I blocchi di verifica non sono una formalità — e questa
versione è la più grande di tutte, quindi contano il doppio.

---

## Fase A — il posto (fatta)

1. **L'isola, la telecamera e il primo ordine.** — **FATTO** (2026-08-11).
2. **Le cose stanno in un posto — niente magazzino centrale.** — **FATTO** (2026-08-11). Casse con un posto preciso, zaino da 12, *dove scarica lo dici tu*, costruzioni pagate davvero dalle casse.

> ### ✅ Verifiche passate
> Punto 1: *"va bene, sembra un posto"*, *"funziona, si capisce tutto"*.
> Punto 2: *"perfetto funziona"*.

## Fase B — farlo diventare un gioco

**Adesso non c'è nessuna ragione per fare niente.** Tagli alberi perché puoi. Questi due punti, e solo questi due, trasformano un giocattolo in un gioco: uno mette la **pressione**, l'altro il **desiderio**. Tutto il resto della roadmap è contenuto.

3. **Il giorno e i salari.** Il giorno passa, a sera si paga chi hai assunto, e arriva il riepilogo. Assumere diventa una scommessa invece che un regalo.
4. **Le commesse.** Qualcuno ti chiede roba precisa e paga molto più del mercato. È il "non vedo l'ora", ed è la prima volta che il legno serve a qualcosa.

> ### 🛑 Verifica dopo il punto 4 — non si va avanti senza
> **Apri l'isola e sai già cosa vuoi fare?** Se dopo il riepilogo della sera non
> c'è una cosa che vuoi, mancano pressione o desiderio, e si risolve qui.

## Fase C — le fondamenta che costano care se si rimandano

Tre cose che non aggiungono niente da giocare, ma che **triplicano di costo** se arrivano dopo le catene invece che prima.

5. **Il salvataggio.** *(spostato dal 15° posto)* Adesso chiudere la pagina cancella tutto. Un gioco da telefono giocato a spizzichi che perde il progresso **non verrà mai giocato abbastanza da poter essere giudicato** — e senza sessioni lunghe le verifiche della roadmap non valgono niente. Costo dichiarato: finché il modello cambia spesso, un salvataggio vecchio va buttato invece che convertito. Si fa con la versione dentro il file, come dice la skill `td-salvataggio`.
6. **Il percorso vero dei braccianti.** *(spostato dall'11° posto)* Adesso vanno in linea retta e attraversano gli alberi. Sull'isola aperta non si nota, ma **appena ci sono edifici e nastri diventa visibile e sbagliato** — e rifare i nastri dopo costa più che fare il percorso adesso.
7. **La simulazione headless.** Una prova che gira senza disegnare e misura in un secondo quello che a occhio non si vede: *quanto legno al minuto con N braccianti e una cassa a distanza D?* Questo gioco **è** una questione di portata: senza misura, ogni scelta di bilanciamento è un'opinione. Nel tower defense la stessa simulazione trovò un difetto di combattimento che nessuno aveva visto giocando.

## Fase D — le catene, cioè il pezzo Factorio

8. **La prima lavorazione**: il Mulino (grano → farina), costruito col rame. Le zone diventano un gioco solo.
9. **La catena a due passaggi**: il Forno (farina → pane). Il valore si moltiplica a ogni passaggio.
10. **L'ordine permanente**: la lavorazione continua da sola finché ha materiale.
11. **I nastri**: la roba si sposta da sola fra le casse. **È il momento in cui la catena gira senza di te**, e ha senso solo perché il punto 2 ha reso il trasporto un costo vero.

> ### 🛑 Verifica dopo il punto 11
> **Guardare la catena girare da sola dà soddisfazione?** È la gioia su cui è
> costruito tutto il genere: se non c'è, manca il motivo di tutto il resto.

## Fase E — l'isola intera

12. **Le zone**: la frana da sgomberare, il pontile da riparare. Ognuna porta una materia prima e un ramo di lavorazioni.
13. **Le macchine** che sostituiscono i braccianti: molto più care subito, niente dopo. Nasce la decisione *assumo o compro*.
14. **L'isola vicina** e la barca.
15. **Gli eventi**: la settimana secca, il mercante di passaggio. Poco e ben distanziato, come lo storyteller di RimWorld.
16. **Altri materiali, lavorazioni e commesse** con l'agente `designer-contenuti`.
17. **Il ritmo**: nessun buco noioso, misurato con la simulazione del punto 7.
18. **Rifinitura**: suoni, animazioni, il piacere del gesto, con l'agente `rifinitore`.
19. **Impacchettamento mobile** con Capacitor.

---

## Perché quest'ordine, e cosa è stato spostato

Riordinata il 2026-08-11 dopo un post mortem (skill `post-mortem`). Tre spostamenti, tutti con lo stesso criterio: **prima quello che rende giudicabile il gioco, poi quello che costa di più se rimandato, poi il contenuto.**

| Cosa | Da | A | Perché |
| --- | --- | --- | --- |
| **Salvataggio** | 15 | 5 | Senza, nessuno gioca abbastanza a lungo da poter dire se funziona |
| **Percorso vero** | 11 | 6 | È una fondazione: rifare i nastri dopo costa più che farlo adesso |
| **Simulazione headless** | — | 7 | Il gioco è una questione di portata: senza misura si tira a indovinare |

E una cosa che **non** è stata spostata, di proposito: le catene e i nastri restano dopo salari e commesse. Sono la parte più divertente da costruire, ed è esattamente per questo che vanno dopo — **il gioco è stato buttato sette volte per aver costruito la parte divertente prima di quella che dà un motivo per giocarci.**

## Semplificazioni note del punto 1, da sistemare quando serviranno

- **I braccianti vanno in linea retta.** Attraversano gli alberi. Sull'isola aperta non si nota; col punto 11 arriva un percorso vero.
- **Nessuno paga nessuno.** I salari sono in configurazione ma non li legge nessuno. È il punto 3.
- **Chiudere la pagina cancella tutto.** È il punto 5.
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
