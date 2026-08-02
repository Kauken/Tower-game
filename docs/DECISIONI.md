# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna `docs/GDD.md`. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

**Questo registro è stato azzerato il 2026-08-02** insieme al progetto, e poi di nuovo lo stesso giorno col passaggio al tower defense (`GDD.md` v2.0). Le decisioni dei giochi precedenti sono cadute con loro e non sono riportate: valevano per giochi che non esistono più.

## Aperte

1. **Quante categorie di recluta si portano in partita, e su quante totali.** È il tetto di equipaggiamento: decide l'identità della run prima del primo secondo, e decide quanto vale un oggetto di categoria. Indicativamente 3 su 12. Da chiudere prima del punto 10.
2. **Se serve un'abilità attiva con ricarica** — qualcosa da premere durante l'ondata oltre a comprare. Da decidere dopo il punto 3, quando si sarà visto se guardare l'ondata senza toccare niente è tempo morto o tensione.
3. **Le 12 regole di sinergia definitive.** Da decidere prima del punto 9, si possono aggiungere gradualmente.
4. **Quanti oggetti per livello**, cioè quante ondate tesoro nella sequenza. Determina quanto in fretta la build decolla. Da rivedere dopo il punto 7, quando un livello intero sarà giocabile.

## Decise

- 2026-08-02: **Le ondate partono da sole.** Domanda: si potevano chiamare in anticipo per un premio, come in molti tower defense. Risposta dell'autore: **"partono e basta"**. Motivo: il gioco ha già la sua decisione difficile — comprare adesso o investire nella rendita — e chiamare l'ondata in anticipo è una seconda decisione dello stesso tipo (rischio adesso per oro dopo) che si mangerebbe la prima. Il tempo fra un'ondata e l'altra resta tempo in cui l'oro sale e si decide come spenderlo, non un pulsante in più.

- 2026-08-02: **Un livello è un percorso di ondate di tipo diverso, e finisce col boss del bioma.** Descrizione dell'autore: *"arrivano sempre ondate di nemici diversi finché non arrivano al boss del bioma, sconfitto il boss superiamo il livello"*, con la sequenza `normale → speciale → negozio → mini boss → tesoro → speciale → boss`. Motivo: dà **una linea di avanzamento visibile** — si sa sempre quanto manca e cosa sta arrivando — e distribuisce i momenti di scelta (negozio, tesoro) a intervalli regolari invece di lasciarli al caso. L'ordine è fisso, il contenuto è pescato: la ripetizione sta nella forma, la varietà nel riempimento.

- 2026-08-02: **Si perde quando abbastanza nemici arrivano in fondo al sentiero.** Descrizione dell'autore: *"tot nemici arrivano in fondo al mio percorso e mi uccidono il mio castello"*. Il castello ha una vita, ogni nemico che arriva in fondo ne toglie un po', a zero la run finisce. Motivo: la sconfitta è **cumulativa e visibile in anticipo** — si vede la vita scendere e si capisce che si sta perdendo prima di aver perso, in tempo per spendere diversamente. Non c'è morte istantanea da un errore solo.

- 2026-08-02: **La pool torna a "tre oggetti, ne scegli uno".** Correzione dell'autore: *"le pool così conviene farla su tre scelte a questo punto"*. Ribalta la decisione precedente (un oggetto solo su un piedistallo, alla Isaac), che valeva per il roguelike a stanze. Motivo: **in quel gioco il giocatore aveva già decisioni continue** — dove muoversi, cosa schivare — e il caso su un piedistallo bastava. Qui il giocatore decide solo con l'oro: togliergli anche la scelta dell'oggetto lo lascerebbe a guardare. Tre carte è la forma che dà una decisione vera nel momento più importante della run.

- 2026-08-02: **IL GIOCO È UN TOWER DEFENSE ROGUELIKE IN CUI SI COMPRANO RECLUTE.** Le torri non si piazzano: sono due, fisse, e producono oro. Il giocatore non ha riflessi da usare — compra reclute che partono, marciano e combattono da sole. Motivo: le versioni precedenti chiedevano al giocatore di **giocare col pollice mentre succedono cose**, e su telefono in verticale quello è il punto in cui il gioco diventa faticoso invece che piacevole. Qui la difficoltà è tutta nella spesa: **compro adesso o investo nella rendita?** Costo dichiarato: senza una tensione forte in quella domanda, il gioco è uno spettacolo. Per questo è la verifica obbligatoria del punto 1 della roadmap.

- 2026-08-02: **Si resta sul web (Vite + React + canvas), niente Godot per ora.** Domanda posta dall'autore, ricerca fatta. Motivi in ordine di peso: (a) **come l'autore prova il gioco** — oggi è un link che si apre sul telefono due minuti dopo la modifica; con Godot servirebbe installare un pacchetto a ogni giro su Android, e su iPhone un Mac più un account sviluppatore a pagamento. L'autore lavora solo dal telefono: sarebbe la fine del ritmo di lavoro. (b) **Vampire Survivors è stato costruito in Phaser**, cioè HTML5/JavaScript, ed è passato a Unity solo dalla versione 1.6, quando era già un successo. (c) **Il motore non è il collo di bottiglia: il divertimento sì.** Da rivedere al punto 16, o prima se il canvas 2D non regge la densità — in quel caso si sostituisce il disegno con PixiJS/WebGL, non si cambia motore.

- 2026-08: **Doppia valuta non convertibile** (oro della singola partita / cristalli permanenti).

- 2026-08: **Ambientazione fantasy/medievale.**
