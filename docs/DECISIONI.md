# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna docs/GDD.md. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

## Aperte

1. **Come si ottengono le torri** — Le 4 Torri sono già tue a inizio assedio, si conquistano combattendo in corsia, o si scelgono a inizio bioma? Da decidere prima del punto 6.
2. **Morte del personaggio in corsia** — Sconfitta immediata della run, oppure rientri dopo qualche secondo mentre l'esercito continua a combattere? Cambia completamente il livello di tensione. Da decidere prima del punto 5.
3. **Quanti oggetti per bioma** — Determina quanto in fretta la build decolla. Da decidere prima del punto 4.
4. **Ambiente del sentiero** — Legato al bioma o pescato a parte? Da decidere prima del punto 9.
5. **Le 12 regole di sinergia definitive** — Da decidere prima del punto 8, si possono aggiungere gradualmente.
6. **I profili personaggio** — Serve solo il primo per la fetta verticale. Da decidere prima del punto 13.

## Decise

- 2026-08: **EVOLUZIONE — roguelike a due fasi (esplorazione + assedio).** Scelta dell'autore: dungeon a stanze alla Binding of Isaac che alimenta una guerra d'assedio fra due castelli. GDD riscritto in v0.4, roadmap rifatta in v3. Decisioni prese contestualmente: (a) **l'assedio è il boss di fine bioma**, non una modalità parallela; (b) **un solo motore, due tipi di arena** (stanza e corsia), il personaggio si comporta identico nelle due; (c) **comandi: levetta a pollice per il movimento + attacco automatico**, mai due levette virtuali su telefono; (d) **ogni oggetto deve toccare anche l'esercito**, non solo il personaggio — è il perno che tiene unite le due fasi. La proposta "torri come Strutture" (`docs/PROPOSTA-STRUTTURE.md`) è superata da questa: le 4 Torri del GDD v0.4 ne conservano l'idea di effetto globale.
- 2026-08: **PIVOT — battaglia a corsie con minion propri.** Scelta dell'autore, opzione B senza prototipo: due eserciti che si scontrano lungo una corsia verticale, torri solo nella metà del giocatore, sempre in combattimento. Comandi attivi pochi e con ricarica (niente MMO); potenziamenti alla Vampire Survivors / Binding of Isaac che cambiano come si spara; carte-patto con bonus e malus insieme. GDD riscritto in v0.3, roadmap rifatta.
- 2026-08: **Vendita sì, spostamento no.** Vendita a rimborso parziale (60%, `rimborso_vendita_torre` in economia.json); niente spostamento, altrimenti gli slot speciali perdono peso. Scelta come da raccomandazione GDD, autorizzata dall'autore con mandato "procedi"; si costruisce col negozio (punto 5). Reversibile se al playtest non convince.
- 2026-08: Ambientazione fantasy/medievale.
- 2026-08: Piazzamento misto: 9 caselle normali + 2 slot speciali (altura +raggio, mana +cadenza).
- 2026-08: Durata run 10-15 minuti → 3 atti × (5 ondate + boss) = 18 ondate.
- 2026-08: Doppia valuta non convertibile (oro di partita / cristalli permanenti).
