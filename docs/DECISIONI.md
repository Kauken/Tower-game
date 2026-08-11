# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna `docs/GDD.md`. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

**Questo registro è stato azzerato il 2026-08-11** col passaggio al farming (`GDD.md` v4.0). Le decisioni dei giochi precedenti sono cadute con loro e non sono riportate: valevano per giochi che non esistono più.

## Aperte

1. **Quanti semi diversi servono perché "cosa pianto" sia una decisione vera.** Tre bastano per la verifica del punto 3, se hanno profili diversi (tempo, costo del seme, prezzo di vendita). Da rivedere dopo il punto 4.
2. **Quanto pesano le spese fisse.** La manutenzione per casella arata e i salari devono mordere senza soffocare. Da tarare con l'agente `bilanciatore` subito dopo il punto 3, con la simulazione headless.
3. **Cosa succede quando non riesci a pagare.** Il GDD dice che i braccianti se ne vanno e le caselle tornano incolte. Quanto in fretta, e in che ordine? Da decidere al punto 8.
4. **Se le stagioni esistono.** Darebbero un ritmo lungo e renderebbero le scelte di semina più interessanti, ma introducono attesa e obsolescenza — due cose che il GDD §10 tiene sotto controllo. Da valutare dopo il punto 4.
5. **Quanto è grande il campo alla fine.** Adesso 5x8; se le macchine chiedono spazio serve piu' campo o un secondo appezzamento. Da decidere al punto 10.

## Decise

- 2026-08-11 (sera): **NON È UN PUZZLE GAME, È UN FARMER.** Correzione dell'autore: *"Non vorrei però un puzzle game, vorrei più un farmer. Dove trovo i semi o li compro, poi devo fare obiettivi o vendere per comprare altro. Non dev'essere facile poter mettere tutti i semi subito. Poi piano piano diventa questo step più facile."* Riferimenti citati: **Stardew Valley, Minecraft moddato tecnico, RimWorld.** Conseguenza: **la scarsità si sposta dallo spazio ai semi e ai soldi.** Piantare consuma un seme; all'inizio non puoi riempire il campo neanche volendo; vendendo, quel problema si scioglie da solo.

- 2026-08-11 (sera): **Tolte le vicinanze a moltiplicatore (Filare e Rotazione).** Erano regole nate per fare un puzzle di incastro, ed erano state costruite il giorno stesso. **Resta solo l'acqua**, perché irrigare è agricoltura e si capisce senza spiegazioni. Motivo: i veri problemi di disposizione arriveranno dalle macchine — cosa alimenta cosa, dove sta il magazzino — e nasceranno dalla simulazione invece che da regole inventate. È il modo dei modpack tecnici di Minecraft, ed è documentato come la cosa che li tiene vivi per centinaia di ore: avanzare costringe a rifare pezzi di base.

- 2026-08-11 (sera): **Prima i braccianti, poi le macchine.** Domanda posta all'autore fra braccianti a salario, macchine soltanto, ed entrambi in sequenza. Risposta: **entrambi in sequenza**, accettando che sia il doppio del lavoro. I braccianti fanno un mestiere in una zona e si pagano ogni giorno; le macchine arrivano dopo, costano molto di più subito e niente dopo. Motivo: fa nascere una decisione economica che non smette mai — **assumo, o compro la macchina?** — che dipende da quanto pensi di durare su quella coltura e da quanti soldi hai adesso.

- 2026-08-11 (sera): **La fattoria ha spese fisse ogni giorno.** Manutenzione per casella arata, salari per chi hai assunto. Motivo: è quello che rende difficile l'inizio, come chiesto, e che tiene viva ogni decisione di espansione — senza, allargarsi sarebbe sempre la mossa giusta e non ci sarebbe partita. **Non si perde comunque mai:** se non riesci a pagare, i braccianti se ne vanno e le caselle tornano incolte, la fattoria si rimpicciolisce e riparti.

- 2026-08-11 (sera): **Il giorno è il battito del gioco.** Dura pochi minuti; a fine giornata si pagano le spese, i prezzi si muovono, ogni tanto succede qualcosa, e un riepilogo dice cosa è successo. Motivo: è il meccanismo del *"vabbè, ancora un giorno"*, documentato come il motore vero dell'engagement di Stardew — ogni giornata avvicina in modo visibile a qualcosa che si vuole.

- 2026-08-11 (mattina, superata in parte): **IL GIOCO È UNA FATTORIA COZY SU GRIGLIA, CON MINERALI, TECNOLOGIE E AUTOMAZIONI.** Abbandonato il tower defense a reclute. Motivo, nelle parole dell'autore: *"quello fatto adesso sembra molto noioso da vedere e giocare"*. Motivo di design: in ogni versione precedente l'autore aveva chiesto le stesse tre cose — **un gioco poco impegnativo ma bello da giocare, nessun riflesso da usare, e che contino le scelte** — e il tower defense le contraddiceva, perché a quel genere serve tensione. Il cozy farming con automazioni è il genere costruito esattamente su quei tre vincoli. È il primo pivot in cui genere e desiderio coincidono invece di combattersi.

- 2026-08-11: **Lo spazio è la risorsa scarsa, e le vicinanze sono il gioco.** Ogni cosa occupa una casella; quello che metti vicino a cosa cambia quanto rende; alcune vicinanze premiano la monocoltura e altre la varietà, e sulla stessa griglia non puoi avere entrambe. Motivo: è l'unico modo trovato per dare una **decisione vera senza chiedere riflessi**, e per rendere il gioco **bello da guardare** — una fattoria ben incastrata si riconosce a colpo d'occhio. Costo dichiarato: se piazzare non è soddisfacente, nessuna quantità di contenuto salva il gioco. Per questo è la verifica obbligatoria del punto 2.

- 2026-08-11: **L'automazione occupa una casella.** Lo spaventapasseri ruba un quadrato al grano. Motivo: è la risposta al difetto documentato del genere — *quando tutto è automatico non hai più niente da fare*. Facendo costare caselle l'automazione, automatizzare diventa esso stesso una decisione di piazzamento, e la griglia non è mai "risolta" una volta per tutte.

- 2026-08-11: **Il tempo scorre mentre guardi.** Domanda posta all'autore fra tempo reale offline, tempo compresso, e tempo reale accelerabile. Risposta: **tempo compresso**, un giorno dura pochi minuti mentre l'app è aperta; a app chiusa la fattoria produce più piano e fino a un tetto. Motivo: col tempo reale puro il gioco è ingiocabile in una sessione — apri, raccogli, chiudi, e non c'è niente da guardare. Il tetto offline serve perché **riaprire sia sempre premiato ma aspettare non sia mai la strategia migliore**.

- 2026-08-11: **Scavare resta manuale a lungo, ed è l'unica cosa attiva del gioco.** Domanda posta all'autore fra scavo manuale, nessuna azione, e raccolta manuale. Risposta: **lo scavo**. Motivo: è il gesto che tiene le mani sullo schermo quando tutto il resto va da solo, è gentile (nessun tempo di reazione, nessun errore possibile, si smette a metà), ed è il ponte fra le due catene — colture automatiche, minerali a mano. Automatizzarlo arriva tardi apposta: è uno sblocco desiderabile proprio perché rinunci a qualcosa che ti piaceva fare.

- 2026-08-11: **Non si può perdere.** Nessun fallimento, nessun timer che scade, niente che marcisce se non torni. Motivo: è la definizione di cozy, ed è il vincolo che l'autore ha tenuto costante in tutte le versioni senza mai nominarlo.

- 2026-08-11: **Si resta sul web (Vite + React + canvas), niente Godot.** Decisione confermata dal progetto precedente e ancora più valida qui: una griglia 2D non ha bisogno di un motore. Il motivo che pesa di più resta **come l'autore prova il gioco** — un link che si apre sul telefono due minuti dopo la modifica.
