---
name: isola-salvataggio
description: Formato dei dati salvati, versioning e migrazione. Consultala prima di scrivere o modificare qualunque cosa venga salvata sul dispositivo — l'isola, i progetti sbloccati, l'inventario, le impostazioni.
---

# Salvataggio e migrazione

Su telefono l'interruzione è la norma. Un salvataggio che si perde è il motivo numero uno per cui un giocatore disinstalla — e in questo gioco è peggio che altrove: **non ci sono partite, c'è una sola isola che cresce per settimane.** Perderla vuol dire perdere tutto.

> **Fatto il 2026-08-13** (punto 3). Il modulo è `src/game/salvataggio.js`, i valori stanno in `config/salvataggio.json`, e ogni sistema espone `perSalvare()` / `daSalvato()`. Quello che segue è la legge di come si estende.

## Cosa si salva

Un archivio solo, perché c'è un mondo solo. Dentro, per isola:

- **il mondo** — cosa sta sopra ogni tessera, e lo stato per tessera (quanto manca a un alberello per crescere)
- **i contenitori** — dove sono, quante caselle, cosa c'è dentro casella per casella
- **le macchine** — dove sono, la ricetta impostata, i cassetti, a che punto è il lavoro in corso
- **l'operaio** — dove si trova, su quale isola, e il suo inventario
- **la coda degli ordini**
- **i progetti sbloccati** e le **monete**

## Le regole che fanno la differenza

**Salva `id`, mai statistiche.** Salva `"trivella"`, non quanto scava al minuto. Altrimenti un ritocco di bilanciamento non arriverebbe mai a un'isola già cominciata, e ogni salvataggio congelerebbe i numeri del giorno in cui è nato.

**Non salvare niente che si può ricalcolare.** I moltiplicatori delle tecnologie si ricavano dai progetti sbloccati. La mappa di base si ricava da `isola.json`: si salva solo **quello che il giocatore ha cambiato**.

**Salva dati, mai funzioni o riferimenti a oggetti vivi.** Al ripristino si ricostruiscono gli oggetti dai dati e dalla configurazione — che è esattamente quello che fanno già le funzioni `reimposta()` dei moduli.

## L'ordine del ripristino conta

1. **Il mondo** per primo: casse e operaio ci stanno sopra.
2. **Le tecnologie** prima dell'operaio: sono loro a dire quante caselle ha lo zaino, e un ripristino in caselle che non esistono ancora perderebbe roba.
3. Poi casse, operaio, coda dei lavori.

**Non si salva il lavoro in corso dell'operaio.** Al rientro riparte fermo e ripesca dalla coda, che è salvata a parte: uno stato a metà di una camminata è l'unica cosa che può tornare incoerente.

## Ogni archivio ha una versione

Un campo `versione_formato`. Quando il formato cambia si scrive una migrazione dalla versione precedente.

> **Non cancellare mai un salvataggio perché non lo si sa leggere.** Se la migrazione fallisce, conserva l'originale sotto un'altra chiave e riparti pulito: il dato non è perduto per sempre, e l'autore può segnalarlo.

**Costo dichiarato, e va detto all'autore:** finché il modello del gioco cambia spesso — e adesso cambia ogni settimana — un salvataggio vecchio si **butta** invece di convertirlo. Scrivere una migrazione per un formato che cambierà ancora fra tre giorni è tempo sprecato. Le migrazioni vere cominciano quando la base è ferma.

## Dove

**`Capacitor Preferences`, non `localStorage`.** Su iOS il secondo può essere ripulito dal sistema quando lo spazio scarseggia — e ripulirebbe l'unica isola del giocatore.

Finché si è solo sul web, `localStorage` va bene, ma l'accesso passa da **un modulo solo**, così il giorno del passaggio si cambia un file e non venti.

## Quando salvare

- **Dopo ogni azione che cambia il mondo in modo permanente**: un ostacolo tolto, una cosa piazzata, un progetto comprato, un travaso.
- **Quando l'app va in background**: `visibilitychange` e l'evento di pausa di Capacitor. Su telefono è il modo più comune in cui una sessione finisce.
- **Mai dentro il ciclo di gioco.** La scrittura è asincrona e ruberebbe fotogrammi: si accoda e si esegue fuori.
- **Mai a ogni fotogramma**, nemmeno "tanto è veloce": si mette un intervallo minimo fra due scritture.

## Il rientro fuori dall'app

**Le macchine vanno avanti, l'operaio no.** È lui la risorsa scarsa, e il suo tempo non può passare mentre non guardi.

Al ripristino si calcola quanto tempo è passato dal `salvatoIl`, **tagliato a `tetto_recupero_ms`** (quattro ore), e si fa avanzare il mondo a passi grossi — `passo_recupero_ms`, un secondo. A passi da 16 ms sarebbero un milione di giri e il gioco si aprirebbe dopo dieci secondi di schermo nero.

Il tetto non è avarizia: serve perché **aspettare non deve mai essere la strategia migliore.** Riaprire è sempre premiato, stare via apposta non conviene mai.

**Subito dopo il recupero si riscrive il salvataggio.** Senza, un blocco dell'app farebbe contare due volte lo stesso tempo.

Perché una cosa nuova vada avanti fuori dall'app basta che il suo avanzamento stia dentro una funzione che accetta un passo in millisecondi, e che venga chiamata da `recupera()`.

## Il ripristino

Deve dare uno stato **identico** a quello salvato. Se qualcosa non torna — un materiale che non esiste più, una macchina rimossa dalla configurazione — **salta quella cosa e vai avanti**, non buttare tutta l'isola. E scrivilo in console, così si scopre.
