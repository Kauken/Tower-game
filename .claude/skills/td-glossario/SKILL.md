---
name: td-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice. Consultala ogni volta che una richiesta usa termini di gioco in italiano, per capire a cosa corrispondono nel progetto senza chiedere.
---

# Glossario del progetto

L'autore parla di gioco, non di codice. Questa è la mappa fra le due lingue.

**Riscritto il 2026-08-11 (sera tardi)** col passaggio all'isola: **un'isola da mandare avanti**, Stardew per l'economia, Graveyard Keeper per le zone e i braccianti, Factorio e Satisfactory per le catene (`docs/GDD.md` v5.0).

| Come lo dice lui | Cosa significa nel progetto |
|---|---|
| "l'isola", "la mappa", "il mondo" | il posto in cui si gioca. E' fatto di tessere, ma **le tessere non si devono vedere** |
| "la tessera", "la casella" | una cella del mondo. Serve solo a far agganciare le cose, come in Factorio |
| "la zona" | un pezzo di isola chiuso da un ostacolo. Si apre **costruendo il passaggio**, non trovando una chiave |
| "dare un ordine", "comandare" | toccare una cosa: il lavoro va in coda, e un bracciante libero lo prende |
| "l'anello", "il segno" | il cerchio tratteggiato sulle cose ordinate. Giallo = aspetta, verde = qualcuno ci sta andando |
| "i braccianti", "gli operai" | chi fa il lavoro. **Ognuno fa un mestiere solo**, e si paga ogni giorno |
| "il mestiere" | taglialegna, cavatore, contadino, portatore. Uno per bracciante, mai una griglia di priorita' |
| "le risorse" | quello che sta sull'isola e si puo' ordinare di raccogliere: alberi, massi, frane |
| "il magazzino" | quello che hai raccolto. Dal punto 2 ha un posto vero: il casotto |
| "le lavorazioni", "le postazioni" | quello che trasforma un materiale in uno che vale di piu' (Mulino, Forno) |
| "la catena" | grano → farina → pane. Il valore si moltiplica a ogni passaggio |
| "il portatore" | il bracciante che porta la roba fra le postazioni. **E' il momento in cui la catena gira senza di te** |
| "l'ordine permanente" | la lavorazione che continua da sola finche' ha materiale |
| "il giorno", "la sera" | il battito: pochi minuti, poi si pagano i salari e arriva il riepilogo |
| "le commesse", "gli obiettivi" | richieste di roba precisa: pagano molto piu' del mercato e sbloccano lavorazioni |
| "allontanare", "lo zoom" | il pulsante che fa vedere tutta l'isola. Due livelli soltanto, non il pizzico |

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**la recluta · l'ondata · il nemico · il castello · la torre · il sentiero · la postazione · l'oro · i cristalli · la pool · il boss · la stanza · il piano · la minimappa · il seguito di minion · la levetta · il personaggio da muovere · schivare · corsia**

E dalle versioni a griglia: **il Filare · la Rotazione · il moltiplicatore di resa · l'incastro · l'appezzamento · la scacchiera · dissodare la casella**.

In particolare: **non c'e' nessun combattimento, non si puo' perdere, non e' un puzzle game, e NON C'E' UN PERSONAGGIO DA MUOVERE.** L'omino che cammina e' stato rifiutato tre volte in tre versioni diverse: non riproporlo. Se una richiesta presuppone nemici, difesa, sconfitta, fretta, incastri su una griglia o un personaggio da guidare, e' un fraintendimento e va chiarito.

## Termini che segnalano un problema, non una funzionalità

Quando compaiono queste parole, la richiesta è un **sintomo** e va analizzata prima di essere eseguita:

- "noioso", "spento", "legnoso", "non dà soddisfazione" → sensazione di gioco → agente `rifinitore`
- "non si capisce", "non si vede", "confuso" → leggibilità → skill `td-mobile-ui`
- "scatta", "rallenta", "si impalla" → agente `revisore-mobile`
- "sparisce", "non funziona", "si blocca" → agente `cacciatore-bug`
- "sempre uguale", "e' tutto uguale" → mancano colture o lavorazioni con profili diversi → agente `designer-contenuti`
- "ci vuole troppo", "aspetto e basta" → il ritmo economico ha un buco → agente `bilanciatore`
- **"sembra una scacchiera"** → il disegno del terreno sta facendo vedere le tessere. Niente bordi, e la variazione dev'essere una macchia tonda sfalsata
- **"non capisco perche' non lavora nessuno"** → o non ci sono braccianti di quel mestiere, o l'anello non si vede. E' un problema di leggibilita' prima che di regole
- **"non so mai se vendere o tenere"** → questo invece e' il gioco che funziona, non un problema
- **"e' diventato un puzzle"** → si sono reintrodotte regole di incastro. Vanno tolte

## Nomi da non confondere

- **Ordine** ≠ **lavoro fatto**: dare un ordine lo mette in coda; qualcuno deve poi prenderlo. L'anello giallo dice "in attesa", il verde "qualcuno ci sta andando".
- **Risorsa** ≠ **lavorazione**: la risorsa sta gia' sull'isola e si raccoglie; la lavorazione trasforma un materiale in uno che vale di piu'.
- **Bracciante** ≠ **macchina**: il bracciante si paga ogni giorno, la macchina si paga una volta sola e costa molto di piu'. La scelta fra i due e' il gioco.
- **Zona** ≠ **spazio**: aprire una zona non da' piu' posto, da' una materia prima nuova e un ramo di lavorazioni nuovo.
- **Tessera** ≠ **quello che si vede**: le tessere ci sono ma non si disegnano mai.
