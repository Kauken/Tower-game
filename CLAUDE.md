# Istruzioni permanenti

**Gestionale di fattoria con catene di produzione** — Stardew per l'economia, Minecraft moddato tecnico per la scala, un pizzico di RimWorld per chi ci lavora. Per telefono. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.
Il documento di design sta in `docs/GDD.md` (v4.0): **leggilo prima di qualunque modifica al gioco.**

Il progetto è stato riscritto più volte. Valgono solo `GDD.md` v4.0 e `ROADMAP.md` v8. **Non esistono più** e sono resti da rimuovere, non funzionalità: reclute, ondate, nemici, castello, torri, sentiero, postazioni, stanze da ripulire, personaggio che si muove con la levetta, seguito di minion, corsie, assedio fra due castelli. E dalla versione a puzzle durata un giorno: il Filare, la Rotazione, i moltiplicatori di resa e gli appezzamenti.

## Il gioco in tre righe

**Semi → pianti → cresce → raccogli → vendi o consegni → compri semi migliori, attrezzi e lavorazioni → ricomincia più in grande.**

**La cosa che scarseggia sono i semi e i soldi, non lo spazio.** All'inizio non puoi riempire il campo neanche volendo; vendendo, quel problema si scioglie da solo. Ogni sera la fattoria ha delle spese, quindi allargarsi è una scommessa e non un regalo.

**Non si può perdere.** Niente fretta, niente timer, niente che marcisce. Se non paghi, i braccianti se ne vanno e le caselle tornano incolte: la fattoria si rimpicciolisce e riparti.

## Con chi stai lavorando

L'autore non sa programmare e lavora dal telefono. Quindi:
- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre: **"Cosa provare: ..."** con l'azione concreta da fare nel gioco.

## Regole non negoziabili

1. **Nessun numero nel codice.** Costi dei semi, tempi di crescita, rese, prezzi, spese, curve: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione, non scriverlo nel codice.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Non aggiungere funzionalità non richieste, nemmeno se sembrano ovvie o utili. Se noti qualcosa che manca, scrivilo alla fine come suggerimento.
3. **Il campo di gioco è un solo `<canvas>`.** Griglia, colture, rocce, macchine ed effetti si disegnano lì. React serve solo per l'interfaccia sopra: cruscotto, mercato, pannelli, riepiloghi. Mai un elemento DOM per una casella.
4. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area, **una mano sola**.
5. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito.
6. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente.
7. **"Fai il punto N"** significa il punto N della lista in `docs/ROADMAP.md`: a lavoro finito segnalo come FATTO in quel file.
8. **Il gioco è mandare avanti una fattoria, non risolvere un puzzle.** Se una decisione si risolve incastrando forme su una griglia, è progettata male: **non reintrodurre moltiplicatori di adiacenza.** I veri problemi di disposizione arriveranno dalle lavorazioni, e nasceranno dalla simulazione.
9. **La domanda che regge il gioco è "reinvesto adesso o metto da parte perché stasera devo pagare?"** Se allargarsi è sempre la mossa giusta, non c'è partita. Ogni modifica al bilanciamento va misurata su questo, e se una scelta di design lo indebolisce, è la scelta sbagliata: dillo invece di costruirla.
10. **Nessuna coltura deve dominare le altre.** Il codice lo controlla all'avvio e si rifiuta di partire: se aggiungi una coltura, deve avere un profilo suo (seme, tempo, guadagno).
11. **Uno sblocco dà un verbo nuovo, non un numero più grande.**

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (deve passare)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.

## Strumenti disponibili

Agenti: `bilanciatore` (solo config), `revisore-mobile` (prestazioni e touch), `designer-contenuti` (nuove colture, minerali, lavorazioni e commesse), `collaudo` (verifica finale), `cacciatore-bug` (diagnosi), `rifinitore` (sensazione di gioco), `consulente-design` (decisioni aperte).

Skill richiamabili: `/richiesta` (trasforma una richiesta vaga in specifica), `/punto N` (esegue il punto N della roadmap).

Quando una richiesta arriva vaga o descritta per sensazioni, applica `richiesta` prima di eseguire. Consulta sempre `td-glossario` per capire cosa intende l'autore.

## Autosufficienza

L'autore lavora solo da qui: non ha un'altra chat di supporto. Quindi:
- Se una richiesta tocca una voce aperta di `docs/DECISIONI.md`, fermati e falla decidere prima (agente consulente-design), poi costruisci.
- Quando un punto della roadmap sta per toccare una decisione aperta, avvisalo in anticipo.
- Se chiede "e adesso?" o sembra perso, orientalo con `docs/PROCESSO.md` e `docs/ROADMAP.md`: digli a che punto è e le 2-3 mosse possibili.
- A ogni fine lavoro, oltre a "cosa provare", indica qual è la mossa successiva più sensata.

## La lezione delle versioni precedenti

Il progetto è stato buttato sei volte. Ogni volta per lo stesso motivo: **abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente.** I blocchi di verifica in `ROADMAP.md` non sono una formalità: quando ne incontri uno, fermati e fallo provare davvero prima di andare avanti.
