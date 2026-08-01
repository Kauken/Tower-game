---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "la mappa", "il tracciato" | `percorso` in `config/mappe.json` |
| "le caselle", "i posti", "gli slot" | `caselle` in `config/mappe.json`, tipo `normale` / `altura` / `mana` |
| "gli slot buoni", "i posti speciali" | caselle di tipo `altura` (+raggio) e `mana` (+cadenza) |
| "le torri" | `config/torri.json`: Balestriere, Catapulta, Cappella del Gelo, Obelisco |
| "i nemici", "i mostri" | `config/nemici.json`: Fante, Ratto nero, Golem di pietra, Sciame di goblin |
| "le carte", "la scelta", "i potenziamenti" | famiglia `modulo` in `config/potenziamenti.json`, schermata di scelta 3→1 |
| "i moduli" | potenziamenti applicati a **una torre specifica** |
| "le reliquie" | potenziamenti **globali**, validi per tutta la partita |
| "le combinazioni", "le sinergie" | regole in `config/sinergie.json`, attivate da coppie di tag |
| "l'oro", "i soldi" | valuta della singola partita, si azzera alla sconfitta |
| "i cristalli" | valuta permanente, sopravvive alla sconfitta |
| "il negozio" | negozio rapido in oro, dopo ogni ondata |
| "il mercante" | negozio speciale a gettoni, dopo il boss di ogni atto |
| "le vite" | contatore dei nemici che raggiungono il traguardo |
| "la partita", "la run", "la corsa" | una sessione completa: 3 atti, 18 ondate |
| "l'atto" | blocco di 5 ondate + 1 boss |

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "troppo facile", "troppo difficile", "muoio sempre a", "l'oro è troppo/poco" → agente `bilanciatore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "le partite si somigliano" → varietà del pool → agente `designer-contenuti`

## Nomi da non confondere

- **Modulo** ≠ **reliquia**: il primo sta su una torre, la seconda vale ovunque.
- **Oro** ≠ **cristalli**: non si convertono mai, è una regola di design.
- **Negozio** ≠ **mercante**: valute e frequenze diverse.
- **Ondata élite** ≠ **boss**: l'élite dà un gettone, il boss chiude l'atto.
