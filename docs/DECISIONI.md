# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna `docs/GDD.md`. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

**Questo registro è stato azzerato il 2026-08-11** col passaggio al farming cozy (`GDD.md` v3.0). Le decisioni dei giochi precedenti sono cadute con loro e non sono riportate: valevano per giochi che non esistono più.

## Aperte

1. **Quanto è grande la griglia di partenza, e quanto può crescere.** Decide quanto stretto è il puzzle di incastro, cioè quanto conta il gioco. Da chiudere subito dopo il punto 2, quando si sarà visto come si legge su uno schermo vero.
2. **Quante regole di vicinanza servono perché il puzzle sia interessante.** Due bastano per la verifica del punto 2; per il gioco vero servono abbastanza contraddizioni fra monocoltura e varietà. Da rivedere dopo il punto 9.
3. **Come si disfa un piazzamento.** Il GDD dice "si può disfare, con un piccolo costo, non a gratis". Quale costo — materiali, tempo, una parte del rimborso? Da decidere al punto 8, quando le caselle si comprano.
4. **Cosa introduce il quarto appezzamento (la Palude).** Da progettare col punto 11 in mano.
5. **Se le stagioni esistono.** Cambierebbero cosa conviene piantare nel tempo e darebbero un ritmo lungo, ma introducono attesa e obsolescenza — due cose che il GDD §12 vieta. Da valutare dopo il punto 5.

## Decise

- 2026-08-11: **IL GIOCO È UNA FATTORIA COZY SU GRIGLIA, CON MINERALI, TECNOLOGIE E AUTOMAZIONI.** Abbandonato il tower defense a reclute. Motivo, nelle parole dell'autore: *"quello fatto adesso sembra molto noioso da vedere e giocare"*. Motivo di design: in ogni versione precedente l'autore aveva chiesto le stesse tre cose — **un gioco poco impegnativo ma bello da giocare, nessun riflesso da usare, e che contino le scelte** — e il tower defense le contraddiceva, perché a quel genere serve tensione. Il cozy farming con automazioni è il genere costruito esattamente su quei tre vincoli. È il primo pivot in cui genere e desiderio coincidono invece di combattersi.

- 2026-08-11: **Lo spazio è la risorsa scarsa, e le vicinanze sono il gioco.** Ogni cosa occupa una casella; quello che metti vicino a cosa cambia quanto rende; alcune vicinanze premiano la monocoltura e altre la varietà, e sulla stessa griglia non puoi avere entrambe. Motivo: è l'unico modo trovato per dare una **decisione vera senza chiedere riflessi**, e per rendere il gioco **bello da guardare** — una fattoria ben incastrata si riconosce a colpo d'occhio. Costo dichiarato: se piazzare non è soddisfacente, nessuna quantità di contenuto salva il gioco. Per questo è la verifica obbligatoria del punto 2.

- 2026-08-11: **L'automazione occupa una casella.** Lo spaventapasseri ruba un quadrato al grano. Motivo: è la risposta al difetto documentato del genere — *quando tutto è automatico non hai più niente da fare*. Facendo costare caselle l'automazione, automatizzare diventa esso stesso una decisione di piazzamento, e la griglia non è mai "risolta" una volta per tutte.

- 2026-08-11: **Il tempo scorre mentre guardi.** Domanda posta all'autore fra tempo reale offline, tempo compresso, e tempo reale accelerabile. Risposta: **tempo compresso**, un giorno dura pochi minuti mentre l'app è aperta; a app chiusa la fattoria produce più piano e fino a un tetto. Motivo: col tempo reale puro il gioco è ingiocabile in una sessione — apri, raccogli, chiudi, e non c'è niente da guardare. Il tetto offline serve perché **riaprire sia sempre premiato ma aspettare non sia mai la strategia migliore**.

- 2026-08-11: **Scavare resta manuale a lungo, ed è l'unica cosa attiva del gioco.** Domanda posta all'autore fra scavo manuale, nessuna azione, e raccolta manuale. Risposta: **lo scavo**. Motivo: è il gesto che tiene le mani sullo schermo quando tutto il resto va da solo, è gentile (nessun tempo di reazione, nessun errore possibile, si smette a metà), ed è il ponte fra le due catene — colture automatiche, minerali a mano. Automatizzarlo arriva tardi apposta: è uno sblocco desiderabile proprio perché rinunci a qualcosa che ti piaceva fare.

- 2026-08-11: **Non si può perdere.** Nessun fallimento, nessun timer che scade, niente che marcisce se non torni. Motivo: è la definizione di cozy, ed è il vincolo che l'autore ha tenuto costante in tutte le versioni senza mai nominarlo.

- 2026-08-11: **Si resta sul web (Vite + React + canvas), niente Godot.** Decisione confermata dal progetto precedente e ancora più valida qui: una griglia 2D non ha bisogno di un motore. Il motivo che pesa di più resta **come l'autore prova il gioco** — un link che si apre sul telefono due minuti dopo la modifica.
