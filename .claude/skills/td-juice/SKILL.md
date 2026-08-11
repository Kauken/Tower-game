---
name: td-juice
description: Regole di sensazione di gioco — feedback, impatto, animazioni, tempi di risposta. Consultala prima di aggiungere o modificare effetti visivi, animazioni, transizioni o qualunque risposta a un'azione del giocatore.
---

# Sensazione di gioco

La differenza fra un gioco amatoriale e uno professionale è quasi tutta qui, e quasi niente di questo è grafica.

## La regola dei 100 millisecondi

Ogni azione del giocatore deve produrre una reazione visibile entro 100 ms. Se il giocatore preme Compra e non succede niente per mezzo secondo, ripreme e spende il doppio. La reazione può anche essere solo un lampo: l'importante è che ci sia subito.

## Anticipazione, impatto, riposo

Ogni evento importante ha tre fasi. Una cosa piazzata: la casella si illumina sotto il dito (anticipazione), il contenuto compare con un rimbalzo (impatto), i segni di vicinanza si accendono uno dopo l'altro verso i vicini (riposo). Saltare l'anticipazione fa sembrare tutto meccanico.

**Il momento piu' importante del gioco e' l'accensione di una vicinanza.** E' li' che il giocatore capisce di aver incastrato bene: se quel segno non da' soddisfazione, il gioco non ce l'ha.

Durate di riferimento: anticipazione 60-100 ms, impatto istantaneo, riposo 120-200 ms.

## Curve, mai lineari

Niente animazioni a velocità costante: sembrano finte. Partenza rapida e arrivo morbido per le cose che appaiono, il contrario per quelle che scompaiono.

## Sovrapposizione

Non aspettare che un'animazione finisca per iniziare la successiva. La roccia puo' iniziare a sbriciolarsi mentre il numero del magazzino sta gia' salendo.

## Budget degli effetti

- Ogni effetto da **pool preallocato**, mai `new` a runtime.
- Tetto complessivo: **1 ms per frame** per tutti gli effetti insieme, con la griglia piena.
- Se non rientra, l'effetto si semplifica o si toglie. Un gioco fluido senza effetti batte sempre un gioco effettato che scatta.

## Scuotimento dello schermo

Solo per boss e sconfitta. Mai sui colpi normali: su schermo piccolo è fastidioso e rende illeggibile il campo. Ampiezza massima 4 px, durata massima 200 ms.

## Cosa non fare mai

- Coprire informazioni utili con un effetto.
- Animazioni che si possono accumulare all'infinito se il giocatore tocca ripetutamente.
- Effetti che non si possono saltare in una schermata che si vedrà mille volte.
- Lampeggi rapidi ad alto contrasto ripetuti: oltre a essere sgradevoli, sono un problema di accessibilità.

## Il test

Togli audio e grafica e guarda solo il movimento. Se anche così si capisce cosa è successo e dà soddisfazione, la sensazione è giusta.
