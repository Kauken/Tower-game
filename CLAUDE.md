# Istruzioni permanenti

**Tower defense roguelike in cui si comprano reclute invece di piazzare torri**, fantasy, per telefono. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.
Il documento di design sta in `docs/GDD.md` (v2.0): **leggilo prima di qualunque modifica al gioco.**

Il progetto è stato riscritto più volte. Valgono solo `GDD.md` v2.0 e `ROADMAP.md` v6. **Non esistono più** e sono resti da rimuovere, non funzionalità: stanze da ripulire, personaggio che si muove con la levetta, seguito di minion, corsie, assedio fra due castelli contrapposti, torri da piazzare a costo.

## Con chi stai lavorando

L'autore non sa programmare e lavora dal telefono. Quindi:
- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre: **"Cosa provare: ..."** con l'azione concreta da fare nel gioco.

## Regole non negoziabili

1. **Nessun numero nel codice.** Costi, danni, vite, raggi, cadenze, ricompense, curve: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione, non scriverlo nel codice.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Non aggiungere funzionalità non richieste, nemmeno se sembrano ovvie o utili. Se noti qualcosa che manca, scrivilo alla fine come suggerimento.
3. **Il campo di gioco è un solo `<canvas>`.** Sentiero, castello, torri, nemici, reclute ed effetti si disegnano lì. React serve solo per l'interfaccia sopra: oro, vita del castello, pulsanti, negozio, menù. Mai un elemento DOM per entità di gioco.
4. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area.
5. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito.
6. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente.
7. **"Fai il punto N"** significa il punto N della lista in `docs/ROADMAP.md`: a lavoro finito segnalo come FATTO in quel file.
8. **La scelta fra esercito e rendita è il gioco.** Il giocatore non ha riflessi da usare: ha solo decisioni di spesa. Se comprare è sempre giusto, o se potenziare è sempre giusto, non c'è partita. Ogni modifica al bilanciamento va misurata su questo, e se una scelta di design lo indebolisce, è la scelta sbagliata: dillo invece di costruirla.

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (deve passare)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.

## Strumenti disponibili

Agenti: `bilanciatore` (solo config), `revisore-mobile` (prestazioni e touch), `designer-contenuti` (nuovi oggetti e nemici), `collaudo` (verifica finale), `cacciatore-bug` (diagnosi), `rifinitore` (sensazione di gioco), `consulente-design` (decisioni aperte).

Skill richiamabili: `/richiesta` (trasforma una richiesta vaga in specifica), `/punto N` (esegue il punto N della roadmap).

Quando una richiesta arriva vaga o descritta per sensazioni, applica `richiesta` prima di eseguire. Consulta sempre `td-glossario` per capire cosa intende l'autore.

## Autosufficienza

L'autore lavora solo da qui: non ha un'altra chat di supporto. Quindi:
- Se una richiesta tocca una voce aperta di docs/DECISIONI.md, fermati e falla decidere prima (agente consulente-design), poi costruisci.
- Quando un punto della roadmap sta per toccare una decisione aperta, avvisalo in anticipo.
- Se chiede "e adesso?" o sembra perso, orientalo con docs/PROCESSO.md e docs/ROADMAP.md: digli a che punto è e le 2-3 mosse possibili.
- A ogni fine lavoro, oltre a "cosa provare", indica qual è la mossa successiva più sensata.
