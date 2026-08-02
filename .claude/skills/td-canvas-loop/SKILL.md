---
name: td-canvas-loop
description: Convenzioni del ciclo di gioco e del disegno su canvas 2D per questo progetto. Consulta questa skill prima di scrivere o modificare qualunque codice dentro src/game/, o quando aggiungi entità, proiettili, effetti o logica che gira a ogni frame.
---

# Ciclo di gioco e disegno

## Struttura a due livelli

- **Canvas di sfondo**: terreno, sentiero, castello, torri. Disegnato **una volta sola** e ridisegnato solo se cambia il livello o la dimensione della finestra.
- **Canvas di gioco**: nemici, reclute, proiettili, effetti. Ripulito e ridisegnato a ogni frame.

Mai disegnare lo sfondo dentro il ciclo principale.

## Passo fisso di simulazione

La simulazione avanza a passo fisso (16.67 ms), accumulando il tempo trascorso. Il disegno gira alla frequenza dello schermo. Senza passo fisso, su un telefono lento cambia il comportamento del gioco, non solo la fluidità.

Limita l'accumulo a un massimo (es. 5 passi per frame) per evitare la spirale della morte quando l'app torna in primo piano dopo essere stata in background.

## Nessuna allocazione nel ciclo

Dentro `aggiorna()` e `disegna()`:
- niente `{}`, `[]`, `new`, `.map()`, `.filter()`, template string
- nemici, reclute, proiettili ed effetti vengono da **pool preallocati**: si marcano `attivo: false` invece di essere distrutti
- per le distanze usa il quadrato, mai `Math.sqrt` a ogni confronto

Il garbage collector che parte a metà ondata è la causa numero uno degli scatti su Android.

## Confine con React

React non sa nulla del ciclo di gioco. La comunicazione va in una sola direzione: il gioco espone uno stato leggibile (oro, vita del castello, ondata), e l'interfaccia lo campiona **al massimo 10 volte al secondo**, non a ogni frame. Le azioni dell'interfaccia (compra recluta, potenzia rendita, ricomincia) entrano nel gioco come **comandi in coda**, non come chiamate dirette: così vengono eseguite dentro un passo di simulazione e non possono spendere due volte lo stesso oro.

Il pulsante deve però rispondere **subito** a schermo (regola `td-mobile-ui`): il colore e lo stato acceso/spento si calcolano dallo stato campionato, non dall'esito del comando.

## Coordinate

Il gioco ragiona su una risoluzione logica fissa (720×1280). Il canvas viene scalato per riempire lo schermo mantenendo le proporzioni. Tutte le coordinate in configurazione sono logiche: così un percorso funziona identico su ogni telefono.

## Chi cammina lungo il sentiero

Nemici e reclute non si muovono in due dimensioni: hanno una **distanza percorsa** lungo la spezzata del sentiero, e la posizione sullo schermo si ricava da quella. Gli scontri si decidono confrontando le distanze lungo il sentiero, **mai in linea d'aria**: lo scarto laterale serve solo a non farli sovrapporre nel disegno, e se lo si usasse per gli ingaggi due file affiancate si mancherebbero.

Ricorda `devicePixelRatio` per evitare il disegno sfocato sugli schermi ad alta densità.
