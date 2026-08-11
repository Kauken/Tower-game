---
name: td-canvas-loop
description: Convenzioni del ciclo di gioco e del disegno su canvas 2D per questo progetto. Consulta questa skill prima di scrivere o modificare qualunque codice dentro src/game/, o quando aggiungi entità, proiettili, effetti o logica che gira a ogni frame.
---

# Ciclo di gioco e disegno

## Struttura a due livelli

- **Canvas di sfondo**: il terreno e il reticolo delle caselle. Disegnato **una volta sola** e ridisegnato solo se cambia l'appezzamento, il numero di caselle sbloccate o la dimensione della finestra.
- **Canvas di gioco**: il contenuto delle caselle, le barre di crescita, i segni di vicinanza, gli effetti. Ripulito e ridisegnato a ogni frame.

Mai disegnare lo sfondo dentro il ciclo principale.

## Passo fisso di simulazione

La simulazione avanza a passo fisso (16.67 ms), accumulando il tempo trascorso. Il disegno gira alla frequenza dello schermo. Senza passo fisso, su un telefono lento cambia il comportamento del gioco, non solo la fluidità.

Limita l'accumulo a un massimo (es. 5 passi per frame) per evitare la spirale della morte quando l'app torna in primo piano dopo essere stata in background.

## Nessuna allocazione nel ciclo

Dentro `aggiorna()` e `disegna()`:
- niente `{}`, `[]`, `new`, `.map()`, `.filter()`, template string
- le caselle e gli effetti vengono da **strutture preallocate**: la griglia si crea una volta all'avvio e le celle si riusano, non si ricreano
- per le distanze usa il quadrato, mai `Math.sqrt` a ogni confronto

Il garbage collector che parte mentre stai piazzando qualcosa e' la causa numero uno degli scatti su Android.

## Confine con React

React non sa nulla del ciclo di gioco. La comunicazione va in una sola direzione: il gioco espone uno stato leggibile (magazzino, giorno, casella selezionata), e l'interfaccia lo campiona **al massimo 10 volte al secondo**, non a ogni frame. Le azioni dell'interfaccia (piazza, raccogli, sblocca) entrano nel gioco come **comandi in coda**, non come chiamate dirette: cosi' vengono eseguite dentro un passo di simulazione e due tocchi ravvicinati non possono spendere due volte lo stesso materiale.

Il pulsante deve però rispondere **subito** a schermo (regola `td-mobile-ui`): il colore e lo stato acceso/spento si calcolano dallo stato campionato, non dall'esito del comando.

## Coordinate

Il gioco ragiona su una risoluzione logica fissa (720×1280). Il canvas viene scalato per riempire lo schermo mantenendo le proporzioni. Tutte le coordinate in configurazione sono logiche: così un percorso funziona identico su ogni telefono.

## La griglia

Niente si muove liberamente: ogni cosa **sta in una casella**, identificata da colonna e riga. La posizione sullo schermo si ricava da quelle due, mai il contrario. Le vicinanze si calcolano **sugli indici** (colonna +/-1, riga +/-1), mai sulle coordinate in pixel: e' quello che le rende esatte, leggibili e verificabili con la simulazione headless.

**Le vicinanze non si ricalcolano a ogni frame.** Si ricalcolano solo quando la griglia cambia — un piazzamento, una raccolta, una rimozione — e il risultato resta scritto sulla casella.

Ricorda `devicePixelRatio` per evitare il disegno sfocato sugli schermi ad alta densità.
