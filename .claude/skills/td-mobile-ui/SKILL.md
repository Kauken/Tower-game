---
name: td-mobile-ui
description: Regole di interfaccia touch e leggibilità su telefono per questo gioco. Consulta questa skill prima di scrivere o modificare componenti React dentro src/ui/, o quando progetti negozi, schermate di scelta, pulsanti e indicatori.
---

# Interfaccia su telefono

## Vincoli fisici

- Area toccabile minima **44×44 px**, sempre, anche se l'icona è più piccola.
- Distanza minima **8 px** fra due elementi toccabili diversi.
- Niente `:hover`: su telefono non esiste. Gli stati sono normale, premuto, disabilitato.
- Il pollice copre la parte bassa dello schermo: le informazioni da leggere stanno in alto, i comandi in basso.
- Rispetta le safe area con `env(safe-area-inset-*)`.
- `touch-action: none` sul canvas, altrimenti la pagina scorre mentre si gioca.

## Il gioco non si ferma da solo

Ogni schermata che si apre durante la partita (negozio, scelta carte) deve **mettere in pausa la simulazione**. Su telefono l'interruzione è la norma, non l'eccezione.

## Schermata "3 carte, ne scegli 1"

È il momento più importante della partita. Deve:
- occupare tutto lo schermo, non essere un pannellino
- mostrare le 3 carte affiancate in verticale, leggibili senza zoom
- indicare **in modo visibile** quando una carta attiva una sinergia con qualcosa che il giocatore ha già: è l'informazione che rende interessante la scelta
- richiedere un tocco per selezionare e un secondo per confermare — mai scegliere al primo tocco

## Leggibilità

- Testo mai sotto i 14 px.
- Non affidare informazioni al solo colore: serve anche una forma, un'icona o un numero.
- Numeri importanti (oro, vite) sempre visibili, in posizione fissa, senza animazioni che li rendano illeggibili.

## Feedback

Ogni azione deve avere una risposta immediata a schermo, entro 100 ms: un lampo, un cambio di colore, un numero che compare. Se il giocatore non capisce se il tocco ha funzionato, tocca di nuovo e sbaglia.
