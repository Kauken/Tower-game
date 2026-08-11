---
name: td-salvataggio
description: Formato dei dati salvati, versioning e migrazione. Consultala prima di scrivere o modificare qualunque cosa venga salvata sul dispositivo — partita in corso, progressione permanente, obiettivi, sblocchi, impostazioni.
---

# Salvataggio e migrazione

Su telefono l'interruzione è la norma. Un salvataggio che si perde o si corrompe è il motivo numero uno per cui un giocatore disinstalla.

## Due archivi separati

- **`fattoria`** — stato completo: quali appezzamenti sono aperti, quali caselle sono sbloccate, cosa c'e' su ogni casella e a che punto e' (crescita, colpi rimasti, ciclo della macchina), il magazzino, il giorno corrente. Sovrascritto spesso: qui non si perde mai niente, quindi non c'e' un "fine run" che azzera.
- **`sblocchi`** — cosa e' stato sbloccato in bacheca, e le statistiche. **Non va mai perso.** E' l'unica cosa davvero preziosa: e' l'avanzamento del giocatore.

Non mescolarli mai in una chiave sola.

## Dove

`Capacitor Preferences`, non `localStorage`: su iOS il secondo può essere ripulito dal sistema quando lo spazio scarseggia.

## Ogni salvataggio ha una versione

Ogni archivio contiene un campo `versione_formato`. Quando il formato cambia, si scrive una funzione di migrazione dalla versione precedente. **Non cancellare mai un salvataggio perché non lo si sa leggere:** se la migrazione fallisce, conserva l'originale sotto un'altra chiave e riparti con un salvataggio nuovo, così il dato non è perduto per sempre.

## Il seme casuale

Si salva l'istante dell'ultimo salvataggio. Al ritorno si calcola quanto tempo e' passato, si applica la produzione offline (piu' lenta, e fino al tetto in `tempo.json`) e si mostra all'autore cosa e' cresciuto mentre non c'era. Senza quel timbro non si puo' fare, ed e' meta' del motivo per riaprire l'app.

## Quando salvare

- A ogni piazzamento, raccolta e sblocco (momenti naturali, stato stabile) e quando l'app va in secondo piano.
- Quando l'app va in background: aggancia `visibilitychange` e l'evento di pausa di Capacitor.
- Mai durante il ciclo di gioco: la scrittura è asincrona e bloccherebbe i frame.

## Regole

- Salva **dati**, mai funzioni o riferimenti a oggetti vivi. Al ripristino si ricostruiscono gli oggetti dai dati e dalla configurazione.
- Non salvare valori derivabili dalla configurazione: salva l'`id` del contenuto della casella, non le sue statistiche. Altrimenti un ritocco di bilanciamento non arriverebbe mai alle fattorie salvate.
- **Il salvataggio non si puo' mai perdere.** In un gioco in cui non si puo' perdere, l'unico modo di far male al giocatore e' cancellargli la fattoria: se qualcosa non torna, si ripara e si tiene, non si azzera.
