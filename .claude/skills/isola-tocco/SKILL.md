---
name: isola-tocco
description: Regole di interfaccia touch e leggibilità su telefono per questo gioco, e il modello della "mano" con cui si piazzano le cose. Consulta questa skill prima di scrivere o modificare componenti React dentro src/ui/, o quando progetti pannelli, menù e indicatori.
---

# Il dito, e l'interfaccia su telefono

## Il modello del tocco — **la mano**

È la regola più importante di questa skill, perché vale per tutto quello che si aggiungerà.

> ### Quello che fa un tocco dipende da **cosa hai in mano**.

**A mani vuote** — il tocco è un **ordine**:
- su una cosa (albero, masso, giacimento, contenitore, macchina) → *fai qualcosa con quella*
- **sul terreno vuoto → non succede niente. Mai.**

**Con qualcosa in mano** — il tocco **piazza**:
- prendi in mano toccando una casella dell'inventario o una voce del menù Costruisci
- una striscia in alto dice sempre **cosa** hai in mano e **quanti** te ne restano
- ogni tocco ne piazza uno, e **resti in mano**: così ne piazzi dieci di fila
- tocchi di nuovo la stessa casella, o premi **Annulla**, e riponi

**Perché non un'azione di default.** Un'azione che parte senza che il giocatore l'abbia scelta è sempre sbagliata, e lo diventa dieci volte tanto quando le cose piazzabili sono dieci invece di una. L'autore l'ha rifiutata esplicitamente: *"fai in modo che devo selezionarli per piantarli perché se no quando clicco a caso pianta solo e sempre gli alberi."*

**Perché regge il futuro.** Alberelli, casse, trivelle, macchine, nastri, pontili: **tutti si piazzano allo stesso modo**. Un gesto imparato una volta. E i nastri, che vogliono un dito che scorre invece che un tocco, sono lo stesso modo con un trascinamento — non un sistema nuovo.

## Gli altri gesti, e sono pochi apposta

| Gesto | Cosa fa |
| --- | --- |
| tocco breve | ordine, oppure piazza (vedi sopra) |
| trascinamento | sposta la mappa |
| pulsante Allontana | cambia livello di zoom |

**Due livelli di zoom soltanto**, non la zoomata continua col pizzico: su uno schermo stretto e con un pollice solo si perde subito. Uno per lavorare, uno per guardare tutta l'isola.

La soglia che distingue un tocco da un trascinamento sta in `config/isola.json` (`soglia_trascinamento`, `durata_tocco_ms`): sono misure di **sensazione**, non dettagli tecnici, e si tarano provando.

## Vincoli fisici

- Area toccabile minima **44×44 px**, sempre, anche se l'icona è più piccola.
- Distanza minima **8 px** fra due elementi toccabili diversi.
- **Niente `:hover`**: su telefono non esiste. Gli stati sono normale, premuto, disabilitato.
- Rispondi a `pointerdown`, non al `click` che sale: su telefono la differenza si sente.
- `touch-action: none` sul canvas, altrimenti la pagina scorre mentre giochi.
- Rispetta le safe area con `env(safe-area-inset-*)`.

## Dove va cosa

**Il pollice copre la parte bassa dello schermo.**

- **In alto:** quello che si legge — monete, cosa sta facendo l'operaio, le caselle dello zaino. `pointerEvents: none`, così un tocco sul cruscotto non blocca la mappa.
- **In basso:** quello che si preme — i pulsanti.
- **In mezzo, sopra ai pulsanti:** i fogli che salgono dal basso.

**Un foglio non supera mai l'altezza dello schermo.** Se il contenuto è troppo, scorre dentro di sé e il titolo resta appiccicato in alto. Un pannello che sborda si porta via il titolo, e su un telefono non c'è modo di andarlo a riprendere — è successo davvero con il pannello del casotto.

## Spostare roba: **un tocco per materiale**

Mai un trascinamento di pile. Su un telefono trascinare otto pile sarebbe una punizione, non una scelta.

Una pastiglia per materiale (*Posa — Legno 32*), più *Posa tutto* e *Prendi tutto*. La fatica che il gioco vuole far sentire è *"devo andare a svuotarlo"*, non *"devo trascinare otto pile"*.

## Se il gioco dice di no, deve dirlo

**Ogni volta che un tocco non fa quello che ti aspettavi, l'interfaccia lo scrive** con parole normali: *zaino pieno*, *la cassa è piena*, *non ha alberelli addosso*, *ci sta già andando*.

Un ordine che non parte senza spiegazione sembra un guasto. E un operaio fermo con degli ordini in coda deve dire **perché** è fermo, in giallo, in alto.

## Leggibilità

- Testo mai sotto i **13 px**, e i numeri che contano mai sotto i 15.
- **Non affidare mai un'informazione al solo colore:** serve anche una forma, un numero o una parola.
- I numeri importanti in **posizione fissa**, senza animazioni che li rendano illeggibili.
- Il gioco si guarda anche in pieno sole: le cose devono staccarsi dallo sfondo.

## Feedback

Ogni azione ha una risposta visibile **entro 100 ms**. Se il giocatore non capisce se il tocco ha funzionato, tocca di nuovo e sbaglia. Dettagli in `isola-sensazione`.
