---
name: richiesta
description: Trasforma una richiesta scritta in modo approssimativo o incompleto in una specifica di lavoro precisa, con criteri di accettazione e confini espliciti. Usala all'inizio di ogni richiesta di modifica al gioco che non sia un punto della roadmap, e ogni volta che quello che ti viene chiesto è vago, ambiguo o descritto solo per sensazioni.
---

# Interpretazione delle richieste

Chi scrive non è un programmatore e lavora dal telefono: le richieste arrivano corte, in linguaggio comune, spesso descritte per sensazione ("è noioso", "non si capisce", "manca qualcosa"). Il tuo compito è **trasformarle in specifiche**, non eseguirle alla lettera.

## Procedura

1. **Traduci nel vocabolario del progetto** usando la skill `td-glossario`. "Le carte", "le caselle", "i moduli" hanno un significato preciso nel codice.
2. **Distingui il sintomo dalla richiesta.** "Il gioco è noioso all'inizio" non è una richiesta di funzionalità: è un sintomo. Risali a cosa lo causa prima di proporre soluzioni.
3. **Riformula come specifica**, in questa forma:

   **Cosa faccio** — in una frase.
   **Comportamento atteso** — elenco puntato di cosa si deve vedere a schermo.
   **Cosa NON tocco** — i confini espliciti, perché altrimenti il lavoro si allarga.
   **File coinvolti** — quali, e se serve un valore nuovo in `config/`.
   **Come si verifica** — l'azione concreta da fare nel gioco per vedere se funziona.

4. **Fai al massimo una domanda**, e solo se senza risposta rischi di costruire la cosa sbagliata. Se puoi decidere tu ragionevolmente, decidi e dichiara l'assunzione.
5. **Aspetta conferma** prima di scrivere codice.

## Regole di interpretazione

- Se la richiesta contiene più cose, **non farle tutte**: elencale, proponi l'ordine, chiedi da quale iniziare. Un lavoro alla volta è una regola del progetto.
- Se la richiesta contraddice `docs/GDD.md`, segnalalo prima di eseguire: potrebbe essere un cambio di design voluto, oppure una dimenticanza.
- Se la richiesta implica un numero, non inventarlo nel codice: va in `config/`.
- Se la richiesta è di bilanciamento travestita da funzionalità ("i nemici sono troppo forti"), passala all'agente `bilanciatore`.
- Non ampliare mai la richiesta di tua iniziativa. Se noti qualcosa che manca, mettilo in fondo come suggerimento separato.

## Esempio

Richiesta: *"quando uccido i nemici non si capisce niente"*

Specifica:
**Cosa faccio** — feedback visivo alla morte del nemico.
**Comportamento atteso** — il nemico lampeggia bianco quando colpito; alla morte svanisce in 150 ms; l'oro guadagnato appare come numero che sale e sfuma.
**Cosa NON tocco** — bilanciamento, altre entità, interfaccia in alto.
**File coinvolti** — `src/game/`, effetti da pool; nessun valore nuovo in config.
**Come si verifica** — compra una recluta, guarda un nemico morire: devi vedere lampo, dissolvenza e l'oro salire.
