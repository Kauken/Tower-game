# Istruzioni permanenti

**Fattoria cozy su griglia, con colture, minerali, tecnologie e automazioni**, per telefono. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.
Il documento di design sta in `docs/GDD.md` (v3.0): **leggilo prima di qualunque modifica al gioco.**

Il progetto è stato riscritto più volte. Valgono solo `GDD.md` v3.0 e `ROADMAP.md` v7. **Non esistono più** e sono resti da rimuovere, non funzionalità: reclute, ondate, nemici, castello, torri, sentiero, postazioni, stanze da ripulire, personaggio che si muove con la levetta, seguito di minion, corsie, assedio fra due castelli.

## Il gioco in tre righe

Una griglia verticale. Ci piazzi colture, rocce, macchine. **Lo spazio è l'unica cosa che scarseggia**, e quello che metti vicino a cosa cambia quanto rende. Sblocchi tecnologie che ti tolgono un lavoro alla volta — ma **ogni automazione occupa una casella**, quindi automatizzare non è mai gratis.

**Non si può perdere.** Niente fretta, niente timer, niente che marcisce.

## Con chi stai lavorando

L'autore non sa programmare e lavora dal telefono. Quindi:
- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre: **"Cosa provare: ..."** con l'azione concreta da fare nel gioco.

## Regole non negoziabili

1. **Nessun numero nel codice.** Costi, tempi di crescita, rese, vicinanze, curve, l'intero albero degli sblocchi: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione, non scriverlo nel codice.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Non aggiungere funzionalità non richieste, nemmeno se sembrano ovvie o utili. Se noti qualcosa che manca, scrivilo alla fine come suggerimento.
3. **Il campo di gioco è un solo `<canvas>`.** Griglia, colture, rocce, macchine ed effetti si disegnano lì. React serve solo per l'interfaccia sopra: magazzino, bacheca, pannello di scelta, menù. Mai un elemento DOM per una casella.
4. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area, **una mano sola**.
5. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito.
6. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente.
7. **"Fai il punto N"** significa il punto N della lista in `docs/ROADMAP.md`: a lavoro finito segnalo come FATTO in quel file.
8. **Il gioco è incastrare la griglia.** Il giocatore non ha riflessi da usare: ha lo spazio, che è poco, e le vicinanze, che si contraddicono. Se una scelta si può risolvere leggendo due numeri senza guardare la griglia, quella scelta è progettata male. Se una modifica rende il piazzamento meno interessante, è la modifica sbagliata: dillo invece di costruirla.
9. **Uno sblocco dà un verbo nuovo, non un numero più grande.** In bacheca ci va solo quello che cambia cosa puoi fare. I "+15%" vanno nei potenziamenti minori.

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (deve passare)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.

## Strumenti disponibili

Agenti: `bilanciatore` (solo config), `revisore-mobile` (prestazioni e touch), `designer-contenuti` (nuove colture, minerali, macchine e vicinanze), `collaudo` (verifica finale), `cacciatore-bug` (diagnosi), `rifinitore` (sensazione di gioco), `consulente-design` (decisioni aperte).

Skill richiamabili: `/richiesta` (trasforma una richiesta vaga in specifica), `/punto N` (esegue il punto N della roadmap).

Quando una richiesta arriva vaga o descritta per sensazioni, applica `richiesta` prima di eseguire. Consulta sempre `td-glossario` per capire cosa intende l'autore.

## Autosufficienza

L'autore lavora solo da qui: non ha un'altra chat di supporto. Quindi:
- Se una richiesta tocca una voce aperta di `docs/DECISIONI.md`, fermati e falla decidere prima (agente consulente-design), poi costruisci.
- Quando un punto della roadmap sta per toccare una decisione aperta, avvisalo in anticipo.
- Se chiede "e adesso?" o sembra perso, orientalo con `docs/PROCESSO.md` e `docs/ROADMAP.md`: digli a che punto è e le 2-3 mosse possibili.
- A ogni fine lavoro, oltre a "cosa provare", indica qual è la mossa successiva più sensata.

## La lezione delle versioni precedenti

Il progetto è stato buttato cinque volte. Ogni volta per lo stesso motivo: **abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente.** I blocchi di verifica in `ROADMAP.md` non sono una formalità: quando ne incontri uno, fermati e fallo provare davvero prima di andare avanti.
