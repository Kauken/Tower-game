---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

**Riscritto il 2026-08-02** insieme al progetto: il gioco è un **action roguelike a stanze con un seguito di minion** (`docs/GDD.md` v1.0).

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "la stanza" | l'arena chiusa in cui si combatte: si ripulisce e le porte si aprono |
| "il piano", "il livello" | un insieme di stanze collegate, con un boss in fondo |
| "il bioma" | l'ambientazione di un piano: nemici, colori e disposizioni propri |
| "la mappa", "la minimappa" | la pianta del piano: quali stanze esistono e come sono collegate |
| "la disposizione", "com'è fatta dentro" | l'interno preparato di una stanza: ostacoli, quanti nemici, da dove entrano |
| "i minion", "il seguito", "il mio esercito" | le truppe che ti accompagnano di stanza in stanza |
| "il tetto", "quanti ne posso avere" | dimensione massima del seguito, cresce solo con oggetti e reclutamento |
| "sono a terra", "sono caduti" | minion abbattuti: si rialzano quando la stanza è pulita |
| "i nemici", "i mostri" | `config/nemici.json` |
| "gli oggetti", "i potenziamenti" | `config/potenziamenti.json`: si trovano su un piedistallo, uno per stanza del tesoro |
| "le combinazioni", "le sinergie" | regole in `config/sinergie.json`, attivate da coppie di tag |
| "l'oro", "i soldi" | valuta della singola run, si azzera alla morte |
| "i cristalli" | valuta permanente, sopravvive alla morte |
| "il negozio" | stanza in cui si compra con l'oro |
| "l'accampamento" | stanza in cui si reclutano minion o si alza il tetto del seguito |
| "la partita", "la run", "la corsa" | una sessione completa: 3-4 piani, 15-25 minuti |

## Parole che appartengono al vecchio progetto

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**torri · caselle · slot · ondate · assalti · corsia · fronte · pressione · castelli · fortezza · atti · moduli · reliquie · "3 carte ne scegli 1" · mercante**

Il gioco non ha più niente di tutto questo. In particolare: gli oggetti **non** si scelgono fra tre, si trovano già decisi su un piedistallo.

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "troppo facile", "troppo difficile", "muoio sempre a" → agente `bilanciatore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "le partite si somigliano" → varietà degli oggetti e delle disposizioni → agente `designer-contenuti`
- "sto guardando invece di giocare" → il seguito fa troppo e il personaggio troppo poco: è un problema di design, non di numeri

## Nomi da non confondere

- **Seguito** ≠ **nemici**: il seguito è tuo e ti segue fra le stanze.
- **A terra** ≠ **morto**: i minion caduti si rialzano a stanza pulita; solo il tetto del seguito è permanente.
- **Oro** ≠ **cristalli**: non si convertono mai, è una regola di design.
- **Stanza** ≠ **piano**: la stanza è una singola arena, il piano è l'insieme collegato.
