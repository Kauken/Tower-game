---
name: isola-motore
description: Convenzioni del ciclo di gioco e del disegno su canvas 2D per questo progetto. Consulta questa skill prima di scrivere o modificare qualunque codice dentro src/game/, o quando aggiungi entità, macchine, effetti o logica che gira a ogni frame.
---

# Ciclo di gioco e disegno

Per la mappa dei file e le ricette *"per aggiungere X tocca questi file"*, vedi **`docs/ARCHITETTURA.md`**. Qui ci sono le regole che non si negoziano.

## Un solo canvas

Terreno, risorse, contenitori, macchine, operaio ed effetti si disegnano **tutti lì**. React serve solo per l'interfaccia che ci galleggia sopra.

**Mai un elemento DOM per un'entità di gioco.** Con macchine e nastri saranno centinaia di oggetti: il DOM non regge, e non è una questione di stile.

Non c'è un canvas di sfondo separato: la telecamera si muove, quindi lo sfondo cambia comunque. Si ridisegna tutto, ma **solo le tessere visibili** (`camera.tessereVisibili`).

## Passo fisso di simulazione

La simulazione avanza a **passo fisso** (16,67 ms) accumulando il tempo trascorso; il disegno gira alla frequenza dello schermo. Senza passo fisso, su un telefono lento cambia il **comportamento** del gioco, non solo la fluidità.

Limita l'accumulo a un massimo (5 passi per frame): evita la spirale della morte quando l'app torna in primo piano dopo essere stata in background — cosa che su telefono succede in continuazione.

## Nessuna allocazione nel ciclo

Dentro `aggiorna()` e `disegna()`:

- niente `{}`, `[]`, `new`, `.map()`, `.filter()`, `.find()`, niente stringhe composte
- tutto da **pool preallocati** (`pool.js`): si accende e si spegne `attivo`, non si crea e si distrugge
- per gli oggetti temporanei (un punto, una meta) usa gli **scratch preallocati** in cima al modulo
- per le distanze usa il quadrato, non `Math.sqrt`, quando serve solo confrontare

Il garbage collector che parte a metà lavoro è la causa numero uno degli scatti su Android.

**Quello che si legge dalla configurazione, si legge quando una cosa comincia** — non a ogni fotogramma. Un moltiplicatore di tecnologia si chiede all'inizio del lavoro e si tiene.

## Il confine con React

La comunicazione va **in una direzione sola**:

- il gioco espone una **`vetrina`**: un oggetto solo, riscritto sul posto, mai ricreato
- l'interfaccia lo campiona **al massimo dieci volte al secondo**, non a ogni frame
- i campi sono **stringhe**, non oggetti: l'interfaccia capisce che qualcosa è cambiato con un confronto secco
- le azioni dell'interfaccia entrano come **comandi in coda** ed eseguono dentro un passo di simulazione

Perché la coda: due tocchi rapidi non possono spendere due volte lo stesso materiale, e non c'è nessun modo di scrivere lo stato del gioco da fuori.

> Il pulsante deve però rispondere **subito** a schermo (regola `isola-tocco`): il colore e lo stato acceso/spento si calcolano dallo stato campionato, non dall'esito del comando.

## Coordinate e telecamera

Ci sono **tre spazi**, e confonderli è il bug più frequente di questo progetto:

| Spazio | Cos'è | Come si arriva al successivo |
| --- | --- | --- |
| **schermo** | i pixel veri del telefono | il rettangolo del canvas |
| **logico** | 720×1440 fissi, l'*area dello schermo* | `camera.versoMondo` |
| **mondo** | l'isola intera, più grande dello schermo | `/ tessera` |
| **tessere** | la griglia | |

`area` in `motore.json` è la risoluzione logica **dello schermo, non del mondo**. L'isola è più grande e la telecamera ne mostra un pezzo.

Ricorda `devicePixelRatio`, altrimenti il disegno è sfocato sugli schermi ad alta densità.

## Le tessere non si vedono

Non è estetica, è una regola rifiutata esplicitamente dall'autore:

- **niente bordi sulle tessere, mai**
- la variazione del terreno è una **macchia tonda sfalsata**, non un quadrato più chiaro
- il disegno delle tessere si sovrappone di un pixel, per non lasciare cuciture

**Unica eccezione:** mentre il giocatore ha qualcosa in mano, la tessera sotto il dito si illumina — lì la griglia *deve* vedersi, perché sta piazzando. Appena ripone, sparisce.

## L'ordine di disegno conta

Va dal basso verso l'alto: fondo → macchie → riva → contenitori e macchine → risorse → **segni degli ordini** → operaio → effetti.

> Gli anelli degli ordini vanno **sopra** alle cose e più larghi di loro. Sotto finivano coperti dalla chioma degli alberi, e l'ordine sembrava non essere partito — è successo davvero.

## Quando aggiungi un verbo all'operaio

Sono sempre gli stessi tre punti in `braccianti.js`, ed è fatto apposta:

1. **`durataDi()`** — quanto ci mette (da configurazione)
2. **`puoFare()`** — quando **non** lo può fare, così lo **salta** invece di piantarsi
3. **`concludi()`** — cosa succede alla fine, **ricontrollando tutto**: fra l'ordine e adesso il mondo può essere cambiato

E se si ferma, **la vetrina deve dire perché**. Un operaio piantato in silenzio sembra un guasto, non una regola.
