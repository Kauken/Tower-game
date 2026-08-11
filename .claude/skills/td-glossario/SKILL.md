---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

**Riscritto il 2026-08-11** col passaggio al gioco nuovo: una **fattoria cozy su griglia, con minerali, tecnologie e automazioni** (`docs/GDD.md` v3.0).

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "la griglia", "il campo", "il terreno" | la scacchiera di caselle su cui si piazza tutto |
| "la casella", "il quadrato", "lo spazio" | una cella della griglia. Ne contiene **una cosa sola** |
| "l'appezzamento", "la zona", "il terreno nuovo" | una griglia intera che si sblocca: Orto, Collina, Bosco, Palude |
| "piazzare", "mettere", "costruire" | assegnare un contenuto a una casella vuota |
| "le vicinanze", "le sinergie", "gli incastri" | le regole di adiacenza: cosa rende di più se sta accanto a cosa. **È il gioco** |
| "le colture", "le piante", "i semi" | quello che cresce da solo nel tempo e si raccoglie |
| "le rocce", "le vene", "i minerali" | quello che si scava a mano toccando |
| "scavare", "picchiare", "rompere" | l'unica azione attiva: si tocca una roccia finché non si spacca |
| "le macchine", "gli edifici" | quello che consuma materiali e ne produce altri (mulino, forno, serra) |
| "le automazioni" | quello che toglie un lavoro al giocatore (spaventapasseri, carretto, trivella). **Occupa una casella** |
| "la bacheca", "l'albero", "le tecnologie" | la schermata degli sblocchi, con le cose bloccate in ombra e quanto manca |
| "sbloccare" | pagare il costo in bacheca e rendere disponibile una cosa nuova da piazzare |
| "il magazzino", "quello che ho" | le scorte di materiali |
| "il giorno", "il tempo" | il tempo compresso: un giorno dura pochi minuti mentre l'app è aperta |

## Parole che appartengono ai progetti vecchi

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**la recluta · l'ondata · il nemico · il castello · la torre · il sentiero · la postazione · l'oro · i cristalli · la pool · il boss · la stanza · il piano · la minimappa · il seguito di minion · la levetta · il personaggio da muovere · schivare · corsia**

In particolare: **non c'è nessun combattimento e non si può perdere.** Se una richiesta presuppone nemici, difesa, sconfitta o fretta, è un fraintendimento e va chiarito.

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "è tutto uguale" → mancano vicinanze che si contraddicono → agente `designer-contenuti`
- "ci vuole troppo", "aspetto e basta" → il ritmo degli sblocchi ha un buco → agente `bilanciatore`
- **"riempio le caselle e basta", "non devo pensare a dove"** → è il problema più grave possibile: le vicinanze non mordono. Non è un numero da ritoccare, è la domanda che regge il gioco (GDD sezione 13)
- **"quando è tutto automatico non ho niente da fare"** → è il difetto noto del genere. Le tre risposte sono già nel GDD sezione 9: l'automazione costa caselle, lo scavo resta manuale, gli appezzamenti nuovi ripartono da zero

## Nomi da non confondere

- **Coltura** ≠ **macchina**: la coltura cresce da sola e si raccoglie; la macchina consuma e produce.
- **Macchina** ≠ **automazione**: la macchina trasforma materiali; l'automazione toglie un tocco al giocatore. Entrambe occupano una casella.
- **Sbloccare** ≠ **piazzare**: sbloccare si fa una volta in bacheca, piazzare si fa ogni volta sulla griglia.
- **Appezzamento** ≠ **casella**: l'appezzamento è una griglia intera, la casella è una cella.
