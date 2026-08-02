---
name: td-salvataggio
description: Formato dei dati salvati, versioning e migrazione. Consultala prima di scrivere o modificare qualunque cosa venga salvata sul dispositivo — partita in corso, progressione permanente, obiettivi, sblocchi, impostazioni.
---

# Salvataggio e migrazione

Su telefono l'interruzione è la norma. Un salvataggio che si perde o si corrompe è il motivo numero uno per cui un giocatore disinstalla.

## Due archivi separati

- **`partita_in_corso`** — stato completo della run: livello e numero d'ondata, vita del castello, oro, livello di rendita, reclute in campo (quante, quali, dove sono sul sentiero), oggetti raccolti, seme casuale. Sovrascritto a ogni fine ondata. Cancellato a fine run.
- **`progressione`** — cristalli, sblocchi (reclute, categorie, oggetti, biomi), potenziamenti permanenti, obiettivi completati, statistiche. **Non va mai perso.** È l'unica cosa davvero preziosa.

Non mescolarli mai in una chiave sola.

## Dove

`Capacitor Preferences`, non `localStorage`: su iOS il secondo può essere ripulito dal sistema quando lo spazio scarseggia.

## Ogni salvataggio ha una versione

Ogni archivio contiene un campo `versione_formato`. Quando il formato cambia, si scrive una funzione di migrazione dalla versione precedente. **Non cancellare mai un salvataggio perché non lo si sa leggere:** se la migrazione fallisce, conserva l'originale sotto un'altra chiave e riparti con un salvataggio nuovo, così il dato non è perduto per sempre.

## Il seme casuale

La run salva il seme del generatore casuale e il numero di estrazioni fatte. Senza, riprendendo una partita cambierebbero i tre oggetti offerti dalla pool, e il giocatore potrebbe sfruttarlo per ripescare finché non esce quello che vuole.

## Quando salvare

- A ogni fine ondata (momento naturale, stato stabile).
- Quando l'app va in background: aggancia `visibilitychange` e l'evento di pausa di Capacitor.
- Mai durante il ciclo di gioco: la scrittura è asincrona e bloccherebbe i frame.

## Regole

- Salva **dati**, mai funzioni o riferimenti a oggetti vivi. Al ripristino si ricostruiscono gli oggetti dai dati e dalla configurazione.
- Non salvare valori derivabili dalla configurazione: salva l'`id` della recluta o dell'oggetto, non le sue statistiche. Altrimenti un ritocco di bilanciamento non arriverebbe mai alle partite salvate.
- Il ripristino di una partita deve essere identico allo stato di partenza: se qualcosa non torna, meglio ripartire dall'inizio dell'ondata che da uno stato incoerente.
