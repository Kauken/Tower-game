---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

**Riscritto il 2026-08-11 (sera)** col passaggio al gioco nuovo: un **gestionale di fattoria con catene di produzione** — Stardew per l'economia, Minecraft moddato per la scala tecnica, un pizzico di RimWorld per chi ci lavora (`docs/GDD.md` v4.0).

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "il campo", "il terreno", "la griglia" | la scacchiera di caselle su cui si pianta e si costruisce |
| "la casella", "il quadrato" | una cella. Ne contiene **una cosa sola**, ed e' in uno di tre stati: incolto, arato, occupato |
| "dissodare", "aprire", "arare" | pagare per rendere coltivabile una casella incolta. **Alza la manutenzione di ogni sera** |
| "i semi" | quello che si compra al mercato e si **consuma** piantando. E' la cosa che scarseggia all'inizio |
| "le colture", "le piante" | quello che cresce da solo nel tempo. Raccogliere non le toglie: ricominciano |
| "il raccolto", "il magazzino" | quello che esce dalle piante e si vende. Non e' la stessa cosa dei semi |
| "i soldi", "le monete" | la valuta unica. Entra vendendo, esce ogni sera con le spese |
| "il mercato" | dove si vende il raccolto e si comprano i semi. I prezzi oscillano ogni giorno |
| "le spese", "la manutenzione" | quello che la fattoria costa ogni sera. Cresce con le caselle arate |
| "il giorno", "la giornata" | il battito del gioco: pochi minuti, poi si pagano le spese e arriva il riepilogo |
| "le commesse", "gli obiettivi" | richieste di roba precisa: pagano molto piu' del mercato e sbloccano lavorazioni (punto 4) |
| "le rocce", "le vene", "i minerali" | quello che si scava a mano toccando (punto 5) |
| "scavare", "picchiare", "rompere" | l'unica azione attiva: si tocca una roccia finche' non si spacca |
| "le lavorazioni", "le macchine" | quello che trasforma un materiale in uno che vale di piu' (Mulino, Forno) |
| "i braccianti" | persone che si assumono, fanno un mestiere in una zona e si **pagano ogni giorno** (punto 8) |
| "l'irrigazione", "il canale" | l'unica vicinanza rimasta: una coltura che tocca un canale cresce molto piu' in fretta |
| "sbloccare" | rendere disponibile una lavorazione nuova, di solito completando una commessa |
## Parole che appartengono ai progetti vecchi

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**la recluta · l'ondata · il nemico · il castello · la torre · il sentiero · la postazione · l'oro · i cristalli · la pool · il boss · la stanza · il piano · la minimappa · il seguito di minion · la levetta · il personaggio da muovere · schivare · corsia**

E dalla versione a puzzle, durata un giorno solo: **il Filare · la Rotazione · il moltiplicatore di resa · l'incastro · l'appezzamento**.

In particolare: **non c'e' nessun combattimento e non si puo' perdere**, e **non e' un puzzle game**. Se una richiesta presuppone nemici, difesa, sconfitta, fretta, o l'ottimizzare forme su una griglia, e' un fraintendimento e va chiarito.

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "e' tutto uguale" → mancano colture o lavorazioni con profili diversi → agente `designer-contenuti`
- "ci vuole troppo", "aspetto e basta" → il ritmo economico ha un buco → agente `bilanciatore`
- **"pianto sempre la stessa cosa"** → e' il problema piu' grave possibile: c'e' una coltura dominante e scegliere non e' una decisione. Il codice ha un controllo all'avvio per il caso ovvio, ma la dominanza puo' nascere anche dai prezzi o dalle commesse
- **"non so mai se vendere o tenere"** → questo invece e' il gioco che funziona, non un problema
- **"e' diventato un puzzle"** → si sono reintrodotte regole di incastro. Vanno tolte: vedi la decisione dell'11 agosto sera

## Nomi da non confondere

- **Seme** ≠ **raccolto**: il seme si compra e si consuma piantando; il raccolto esce dalla pianta e si vende. Hanno lo stesso nome ("rapa") ma sono due cose diverse in due conti diversi.
- **Coltura** ≠ **lavorazione**: la coltura cresce da sola; la lavorazione trasforma un materiale in uno che vale di piu'.
- **Bracciante** ≠ **macchina**: il bracciante si paga ogni giorno, la macchina si paga una volta sola e costa molto di piu'. La scelta fra i due e' il gioco, non un dettaglio.
- **Dissodare** ≠ **piantare**: dissodare apre una casella e costa monete; piantare ci mette dentro un seme.
