---
name: isola-sensazione
description: Regole di sensazione di gioco — feedback, impatto, animazioni, tempi di risposta. Consultala prima di aggiungere o modificare effetti visivi, animazioni, transizioni o qualunque risposta a un'azione del giocatore.
---

# Sensazione di gioco

La differenza fra un gioco amatoriale e uno professionale è quasi tutta qui, e quasi niente di questo è grafica.

Questo è un gioco **cozy e lento**: la sensazione non deve essere l'impatto, deve essere **la soddisfazione di una cosa che va a posto**. Niente scuotimenti, niente lampi violenti, niente urgenza.

## La regola dei 100 millisecondi

Ogni azione del giocatore produce una reazione visibile **entro 100 ms**. Se preme *Posa tutto* e non succede niente per mezzo secondo, ripreme.

Qui c'è una difficoltà vera del progetto: **fra l'ordine e il fatto passano secondi**, perché l'operaio ci deve camminare. Quindi la reazione immediata non è il risultato, è la **presa in carico**:

- il pulsante si abbassa
- l'anello dell'ordine compare **subito** sulla cosa toccata, giallo
- quando l'operaio lo prende in carico l'anello diventa **verde**

Senza il secondo passaggio non si saprebbe mai se il comando è stato raccolto, e con un operaio solo e una coda lunga è l'informazione che conta di più.

## I momenti che meritano un effetto

In ordine di resa rispetto al costo:

1. **L'ordine parte** — anello sulla cosa toccata, immediato.
2. **La roba entra o esce** — un lampo sul contenitore quando l'operaio posa o prende. È la conferma che il viaggio è servito a qualcosa.
3. **Una cosa finisce** — l'albero che sparisce, l'alberello che compare piccolo. Mai una scomparsa secca.
4. **Uno sblocco** — il momento più importante del gioco, ed è raro: qui si può spendere. Il progetto che si accende in bacheca, la cosa nuova che diventa piazzabile.
5. **Una macchina che lavora** — deve **vedersi che sta girando**, anche solo con qualcosa che pulsa piano. Una macchina ferma e una che lavora non possono essere identiche: è metà del piacere di guardare una fabbrica.

## Anticipazione, impatto, riposo

Ogni evento importante ha tre fasi. Saltare l'anticipazione fa sembrare tutto meccanico.

Durate di riferimento: anticipazione 60–100 ms, impatto istantaneo, riposo 120–200 ms.

## Curve, mai lineari

Niente animazioni a velocità costante: sembrano finte. Partenza rapida e arrivo morbido per le cose che appaiono, il contrario per quelle che scompaiono.

## Sovrapposizione

Non aspettare che un'animazione finisca per iniziarne un'altra. L'albero può ancora dissolversi mentre il numero nella casella sta già salendo.

## Budget

- Ogni effetto da **pool preallocato**, mai `new` a runtime.
- Tetto complessivo: **1 ms per frame** per tutti gli effetti insieme.
- Se non ci sta, l'effetto si semplifica o si toglie. **Un gioco fluido senza effetti batte sempre un gioco effettato che scatta.**

## Cosa non fare mai

- **Scuotere lo schermo.** Qui non c'è niente che lo giustifichi.
- Coprire informazioni utili con un effetto: la leggibilità batte sempre la spettacolarità.
- Animazioni che si accumulano all'infinito se il giocatore tocca ripetutamente.
- Effetti che non si possono saltare in una schermata che si vedrà mille volte.
- Lampeggi rapidi ad alto contrasto ripetuti: sono sgradevoli e sono un problema di accessibilità.

## Il test

Togli i colori e guarda solo il movimento. **Se anche così si capisce cosa è successo, la sensazione è giusta.**

E il test specifico di questo gioco: **guardare l'operaio lavorare deve essere piacevole anche quando non decidi niente.** Se è solo attesa, manca qualcosa da guardare — non qualcosa da fare.
