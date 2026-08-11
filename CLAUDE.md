# Istruzioni permanenti

**Un'isola da mandare avanti** — Stardew per l'economia, Graveyard Keeper per le zone e chi ci lavora, Factorio e Satisfactory per le catene di produzione. Per telefono. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.
Il documento di design sta in `docs/GDD.md` (v5.0): **leggilo prima di qualunque modifica al gioco.**

Il progetto è stato riscritto più volte. Valgono solo `GDD.md` v5.0 e `ROADMAP.md` v9. **Non esistono più** e sono resti da rimuovere, non funzionalità: reclute, ondate, nemici, castello, torri, sentiero, postazioni, stanze da ripulire, personaggio che si muove con la levetta, seguito di minion, corsie, assedio fra due castelli. E dalle versioni a griglia: il Filare, la Rotazione, i moltiplicatori di resa, gli appezzamenti, la scacchiera.

## Il gioco in tre righe

**Un'isola vista dall'alto. Nessun personaggio: sei il gestore.** Tocchi le cose e dai ordini, e a camminare e lavorare sono i braccianti. Apri zone nuove costruendo il passaggio, e quello che ne esce alimenta catene di lavorazione sempre più lunghe.

**Ogni sera si pagano i salari**, quindi assumere è una scommessa e non un regalo. La domanda di roba deve crescere sempre più in fretta di quanto produci: *the factory must grow*.

**Non si può perdere.** Niente fretta, niente timer, niente che marcisce. Se non paghi, un bracciante se ne va: la fattoria si rimpicciolisce e riparti.

## Con chi stai lavorando

L'autore non sa programmare e lavora dal telefono. Quindi:
- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre: **"Cosa provare: ..."** con l'azione concreta da fare nel gioco.

## Regole non negoziabili

1. **Nessun numero nel codice.** Costi dei semi, tempi di crescita, rese, prezzi, spese, curve: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione, non scriverlo nel codice.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Non aggiungere funzionalità non richieste, nemmeno se sembrano ovvie o utili. Se noti qualcosa che manca, scrivilo alla fine come suggerimento.
3. **Il campo di gioco è un solo `<canvas>`.** Isola, risorse, braccianti, ordini ed effetti si disegnano lì, attraverso la telecamera. React serve solo per l'interfaccia sopra: cruscotto, mercato, pannelli, riepiloghi. Mai un elemento DOM per una cosa del mondo.
4. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area, **una mano sola**.
5. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito.
6. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente.
7. **"Fai il punto N"** significa il punto N della lista in `docs/ROADMAP.md`: a lavoro finito segnalo come FATTO in quel file.
8. **NIENTE PERSONAGGIO DA MUOVERE.** L'autore l'ha rifiutato tre volte in tre versioni diverse. Il giocatore non è dentro lo schermo: è sopra, e comanda col dito.
9. **Le tessere non si devono vedere.** Servono solo a far agganciare le cose, come in Factorio. Niente bordi sulle tessere, mai; la variazione del terreno è una macchia tonda sfalsata, non un quadrato più chiaro. Un quadrato dentro una griglia di quadrati si legge come una scacchiera, ed è la cosa che l'autore ha rifiutato.
10. **Non è un puzzle game.** Niente moltiplicatori di adiacenza, niente incastri da ottimizzare.
11. **La domanda che regge il gioco è "assumo, o me lo faccio bastare?"** Se assumere è sempre giusto, non c'è partita. E la domanda di roba deve crescere sempre più in fretta della produzione: se un giorno hai abbastanza di tutto, il gioco è finito.
12. **Uno sblocco dà un verbo nuovo, non un numero più grande.**

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (deve passare)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.

## Strumenti disponibili

Agenti: `bilanciatore` (solo config), `revisore-mobile` (prestazioni e touch), `designer-contenuti` (nuove risorse, lavorazioni, mestieri e commesse), `collaudo` (verifica finale), `cacciatore-bug` (diagnosi), `rifinitore` (sensazione di gioco), `consulente-design` (decisioni aperte).

Skill richiamabili: `/richiesta` (trasforma una richiesta vaga in specifica), `/punto N` (esegue il punto N della roadmap).

Quando una richiesta arriva vaga o descritta per sensazioni, applica `richiesta` prima di eseguire. Consulta sempre `td-glossario` per capire cosa intende l'autore.

## Autosufficienza

L'autore lavora solo da qui: non ha un'altra chat di supporto. Quindi:
- Se una richiesta tocca una voce aperta di `docs/DECISIONI.md`, fermati e falla decidere prima (agente consulente-design), poi costruisci.
- Quando un punto della roadmap sta per toccare una decisione aperta, avvisalo in anticipo.
- Se chiede "e adesso?" o sembra perso, orientalo con `docs/PROCESSO.md` e `docs/ROADMAP.md`: digli a che punto è e le 2-3 mosse possibili.
- A ogni fine lavoro, oltre a "cosa provare", indica qual è la mossa successiva più sensata.

## La lezione delle versioni precedenti

Il progetto è stato buttato sette volte. Ogni volta per lo stesso motivo: **abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente.** I blocchi di verifica in `ROADMAP.md` non sono una formalità: quando ne incontri uno, fermati e fallo provare davvero prima di andare avanti.
