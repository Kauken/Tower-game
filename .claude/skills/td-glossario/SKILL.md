---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

**Riscritto il 2026-08-02** col passaggio al gioco nuovo: un **tower defense roguelike in cui si comprano reclute** (`docs/GDD.md` v2.0).

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "il sentiero", "il percorso", "la strada" | la spezzata in `config/percorso.json`: i nemici la scendono, le reclute la risalgono |
| "il castello", "la mia base", "il mio boss" | il punto in fondo al sentiero, con la vita della run. A zero si perde |
| "le torri" | le due torri fisse che **producono oro**. Non sparano e non si piazzano |
| "la rendita", "i soldi che salgono" | l'oro prodotto dalle torri ogni ciclo, e i suoi potenziamenti |
| "le reclute", "le truppe", "il mio esercito" | `config/reclute.json`: si comprano, partono dal castello e risalgono da sole |
| "la categoria" | famiglia di reclute (Fanteria, Bestie, Arcani, Meccanismi): decide quali oggetti valgono |
| "il tetto", "quante ne posso portare" | quante categorie si portano in partita su quante totali (decisione aperta 1) |
| "l'ondata" | un gruppo di nemici che esce dall'alto. Partono da sole, non si chiamano |
| "il livello", "il bioma" | la sequenza di ondate che finisce col boss. Battuto il boss, si passa al livello dopo |
| "il percorso del livello" | l'ordine dei tipi di ondata: normale, speciale, negozio, mini boss, tesoro, boss |
| "i nemici", "i mostri" | `config/nemici.json` |
| "gli oggetti", "i potenziamenti" | `config/potenziamenti.json`: arrivano dalla pool, **tre e ne scegli uno** |
| "la pool" | la schermata di scelta fra tre oggetti, nelle ondate tesoro |
| "le combinazioni", "le sinergie" | regole in `config/sinergie.json`, attivate da coppie di tag |
| "l'oro", "i soldi" | valuta della singola run, si azzera alla morte |
| "i cristalli" | valuta permanente, sopravvive alla morte |
| "il negozio" | l'ondata in cui si compra con l'oro invece di combattere |
| "la partita", "la run", "la corsa" | una sessione completa: più livelli fino alla morte o alla vittoria |

## Parole che appartengono ai progetti vecchi

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**la stanza · il piano · la minimappa · le porte · il seguito di minion · il piedistallo · la levetta · il personaggio da muovere · schivare · caselle · corsia · fronte · pressione · atti**

In particolare: **non c'è un personaggio che si muove**. Il giocatore non ha una levetta e non schiva niente: decide solo cosa comprare e quando. Se una richiesta presuppone di muoversi o mirare, è un fraintendimento e va chiarito.

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "troppo facile", "troppo difficile", "muoio sempre all'ondata" → agente `bilanciatore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "le partite si somigliano" → varietà degli oggetti → agente `designer-contenuti`
- **"tanto compro e basta", "non devo pensare"** → è il problema più grave possibile: la scelta fra esercito e rendita non morde. Non è un numero da ritoccare di sfuggita, è la domanda che regge il gioco (GDD sezione 2)
- **"guardo e basta"** → il giocatore non ha niente da decidere durante l'ondata: apre la decisione 2 (abilità attiva), non si risolve con più effetti

## Nomi da non confondere

- **Reclute** ≠ **torri**: le reclute si comprano e camminano; le torri sono due, fisse, e fanno solo oro.
- **Oro** ≠ **cristalli**: non si convertono mai, è una regola di design.
- **Ondata** ≠ **livello**: l'ondata è un gruppo di nemici, il livello è la sequenza intera fino al boss.
- **Categoria** ≠ **recluta**: la categoria è la famiglia, e sono gli oggetti a farla contare.
