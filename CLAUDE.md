# Torre di Guardia — istruzioni permanenti

Tower defense roguelike fantasy per mobile. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.
Il documento di design sta in `docs/GDD.md`: leggilo prima di qualunque modifica al gioco.

## Con chi stai lavorando

L'autore non sa programmare e lavora dal telefono. Quindi:
- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre: **"Cosa provare: ..."** con l'azione concreta da fare nel gioco.

## Regole non negoziabili

1. **Nessun numero nel codice.** Costi, danni, vite, raggi, cadenze, ricompense, curve: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione, non scriverlo nel codice.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Non aggiungere funzionalità non richieste, nemmeno se sembrano ovvie o utili. Se noti qualcosa che manca, scrivilo alla fine come suggerimento.
3. **Il campo di gioco è un solo `<canvas>`.** Nemici, torri, proiettili ed effetti si disegnano lì. React serve solo per l'interfaccia sopra: oro, vite, negozio, carte, menù. Mai un elemento DOM per entità di gioco.
4. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area.
5. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito.
6. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente.

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (deve passare)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.
