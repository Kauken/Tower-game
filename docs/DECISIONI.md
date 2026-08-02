# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna docs/GDD.md. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

## Aperte

1. **Quanti oggetti per bioma** — Determina quanto in fretta la build decolla. Da decidere prima del punto 4.
2. **Come si conquista una Torre** — Basta starci vicino, o bisogna ripulire la zona dai nemici e tenerla per qualche secondo? Da decidere prima del punto 6.
3. **Ambiente del campo** — Legato al bioma o pescato a parte? Da decidere prima del punto 9.
4. **Le 12 regole di sinergia definitive** — Da decidere prima del punto 8, si possono aggiungere gradualmente.
5. **I profili personaggio** — Serve solo il primo per la fetta verticale. Da decidere prima del punto 13.

## Decise

- 2026-08: **CAMPO APERTO — via la corsia stretta e via il tower defense.** Problema individuato dall'autore giocando: con un personaggio libero su tutto lo schermo e i nemici incolonnati in una corsia larga 110 px, **restare al sicuro è gratis** e non c'è gioco. Decisioni prese: (a) il campo è **largo quanto lo schermo**, gli eserciti si dispongono su un fronte irregolare e farsi circondare diventa possibile; (b) **il pericolo è sbilanciarsi in avanti** — la profondità sul campo è la manopola di rischio, e siccome il fronte si muove la zona sicura cambia da sola; (c) **niente più torri da costruire né caselle**: era una meccanica di un altro gioco appiccicata sopra, le 4 Torri diventano strutture del campo da **conquistare** (punto 6); (d) **il personaggio viene abbattuto, non ucciso** — si riforma al castello dopo qualche secondo e l'esercito continua senza di lui, perché una run che finisce per uno sciame insegna solo a stare indietro; la run finisce quando cade il castello; (e) **niente pulsante "chiama l'assalto"**: pressione continua che cresce nel tempo, con spinte periodiche. Chiude le voci aperte su morte del personaggio e su come si ottengono le Torri. GDD aggiornato con le sezioni 2.3, 2.4, 4.1, 5 e 6.1.
- 2026-08: **EVOLUZIONE — roguelike a due fasi (esplorazione + assedio).** Scelta dell'autore: dungeon a stanze alla Binding of Isaac che alimenta una guerra d'assedio fra due castelli. GDD riscritto in v0.4, roadmap rifatta in v3. Decisioni prese contestualmente: (a) **l'assedio è il boss di fine bioma**, non una modalità parallela; (b) **un solo motore, due tipi di arena** (stanza e corsia), il personaggio si comporta identico nelle due; (c) **comandi: levetta a pollice per il movimento + attacco automatico**, mai due levette virtuali su telefono; (d) **ogni oggetto deve toccare anche l'esercito**, non solo il personaggio — è il perno che tiene unite le due fasi. La proposta "torri come Strutture" (`docs/PROPOSTA-STRUTTURE.md`) è superata da questa: le 4 Torri del GDD v0.4 ne conservano l'idea di effetto globale.
- 2026-08: **PIVOT — battaglia a corsie con minion propri.** Scelta dell'autore, opzione B senza prototipo: due eserciti che si scontrano lungo una corsia verticale, torri solo nella metà del giocatore, sempre in combattimento. Comandi attivi pochi e con ricarica (niente MMO); potenziamenti alla Vampire Survivors / Binding of Isaac che cambiano come si spara; carte-patto con bonus e malus insieme. GDD riscritto in v0.3, roadmap rifatta.
- 2026-08: ~~Vendita sì, spostamento no~~ — decaduta col campo aperto: non ci sono più torri da comprare.
- 2026-08: Ambientazione fantasy/medievale.
- 2026-08: ~~Piazzamento misto: 9 caselle normali + 2 slot speciali~~ — decaduta col campo aperto: non ci sono più caselle.
- 2026-08: ~~Durata run 10-15 minuti → 3 atti × (5 ondate + boss) = 18 ondate~~ — decaduta: non ci sono più ondate numerate, la pressione è continua.
- 2026-08: Doppia valuta non convertibile (oro di partita / cristalli permanenti).
