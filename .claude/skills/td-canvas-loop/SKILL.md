---
name: td-canvas-loop
description: Convenzioni del ciclo di gioco e del disegno su canvas 2D per questo progetto. Consulta questa skill prima di scrivere o modificare qualunque codice dentro src/game/, o quando aggiungi entità, proiettili, effetti o logica che gira a ogni frame.
---

# Ciclo di gioco e disegno

## Struttura a due livelli

- **Canvas di sfondo**: percorso, caselle, decorazioni. Disegnato **una volta sola** e ridisegnato solo se cambia la mappa o la dimensione della finestra.
- **Canvas di gioco**: nemici, torri, proiettili, effetti. Ripulito e ridisegnato a ogni frame.

Mai disegnare lo sfondo dentro il ciclo principale.

## Passo fisso di simulazione

La simulazione avanza a passo fisso (16.67 ms), accumulando il tempo trascorso. Il disegno gira alla frequenza dello schermo. Senza passo fisso, su un telefono lento cambia il comportamento del gioco, non solo la fluidità.

Limita l'accumulo a un massimo (es. 5 passi per frame) per evitare la spirale della morte quando l'app torna in primo piano dopo essere stata in background.

## Nessuna allocazione nel ciclo

Dentro `aggiorna()` e `disegna()`:
- niente `{}`, `[]`, `new`, `.map()`, `.filter()`, template string
- proiettili e nemici vengono da **pool preallocati**: si marcano `attivo: false` invece di essere distrutti
- per le distanze usa il quadrato, mai `Math.sqrt` a ogni confronto

Il garbage collector che parte a metà ondata è la causa numero uno degli scatti su Android.

## Confine con React

React non sa nulla del ciclo di gioco. La comunicazione va in una sola direzione: il gioco espone uno stato leggibile (oro, vite, ondata), e l'interfaccia lo campiona **al massimo 10 volte al secondo**, non a ogni frame. Le azioni dell'interfaccia (compra, piazza) entrano nel gioco come comandi in coda, non come chiamate dirette.

## Coordinate

Il gioco ragiona su una risoluzione logica fissa (es. 720×1280). Il canvas viene scalato per riempire lo schermo mantenendo le proporzioni. Tutte le coordinate in configurazione sono logiche: così una mappa funziona identica su ogni telefono.

Ricorda `devicePixelRatio` per evitare il disegno sfocato sugli schermi ad alta densità.
