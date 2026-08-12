---
name: post-mortem
description: Ricostruisce cosa è successo in un pezzo di progetto e ne ricava una lezione scritta e verificabile. Usala dopo un cambio di rotta, dopo che una cosa costruita è stata rifiutata, dopo una verifica fallita, e ogni volta che l'autore chiede perché una cosa continua a succedere.
---

# Post mortem

Serve a **smettere di ripetere lo stesso errore**, non a raccontare cosa è andato storto.

Questo progetto è stato riscritto sette volte. Ogni riscrittura è costata giorni e ha bruciato la fiducia dell'autore un po' di più. Il costo di *non* fare questa analisi si misura in progetti buttati, quindi vale la mezz'ora che serve a farla bene.

## Quando si fa

- Dopo un **cambio di rotta**, appena la nuova direzione è chiara.
- Dopo che una cosa costruita è stata **rifiutata** dall'autore.
- Dopo una **verifica della roadmap fallita**.
- Quando l'autore dice **"perché continua a succedere"**, o chiede di ragionare meglio.
- **Non** dopo ogni intervento: un post mortem su una cosa andata bene è tempo sprecato.

## Metodo, in quest'ordine

### 1. Ricostruisci coi fatti, non a memoria

Leggi `docs/DECISIONI.md`, `docs/ROADMAP.md` e `git log`. La memoria conversazionale è la fonte meno affidabile che hai: ricorda le tue intenzioni, non quello che hai fatto.

Per ogni evento, tre colonne e basta:

| Cosa è stato chiesto | Cosa è stato costruito | Come ha reagito l'autore |

Cita **le parole esatte** dell'autore. Riassumerle è il modo in cui si perde l'informazione che conta.

### 2. Distingui l'incidente dallo schema

- Una volta = **incidente**. Si corregge e si va avanti.
- Due o più volte = **schema**. Va nominato, e va messo un guardrail.

Non trasformare un incidente in una regola: le regole troppe non si leggono più, ed è così che un file di istruzioni diventa rumore.

### 3. Nomina il meccanismo, non il sintomo

*"Ho costruito la cosa sbagliata"* non è una lezione: non dice cosa fare diversamente.
*"Ho costruito prima di verificare il pezzo centrale, perché costruire è più facile che fare una domanda"* è una lezione: ha una causa e un'alternativa.

Chiediti sempre: **cosa avrei dovuto vedere, e cosa me l'ha impedito?**

### 4. Scrivilo dove verrà riletto

> **Una lezione che resta nella chat non è successa.** La chat si perde, si riassume, e la sessione dopo riparte senza.

Ogni lezione va in **un file**, scelto in base a cosa è:

| Che tipo di lezione | Dove va |
| --- | --- |
| Una regola di lavoro | una regola numerata in `CLAUDE.md` |
| Una cosa che l'autore ha rifiutato | l'elenco delle parole vietate in `td-glossario` |
| Una scelta di design e il suo perché | `docs/DECISIONI.md`, con le parole dell'autore |
| Lo stato di cosa esiste adesso | `docs/HANDOFF.md` |

### 5. Metti un guardrail meccanico, non una buona intenzione

È il passaggio che vale più di tutti gli altri messi insieme.

Una regola scritta si può dimenticare. **Un controllo che fa fallire il gioco all'avvio, no.**

Esempi già in piedi in questo progetto, tutti nati da un errore vero:

- il gioco si rifiuta di partire se una coltura ne domina un'altra sotto ogni aspetto → *scegliere cosa piantare non sarebbe una decisione*
- si rifiuta di partire se un mestiere non ha niente da lavorare → *sarebbe un bracciante pagato per stare fermo*
- si rifiuta di partire se la mappa ha righe di lunghezza diversa o un carattere fuori legenda

Prima di chiudere il post mortem chiediti: **posso rendere questo errore impossibile invece che sconsigliato?** Un controllo all'avvio, una verifica dell'agente `collaudo`, una prova nel browser. Se sì, fallo adesso.

### 6. Chiudi con una cosa sola da cambiare

Un post mortem che produce otto azioni non ne produce nessuna. **Una** — la più a monte.

## Regole di tono

- **L'autore non è mai il problema.** Non sa programmare, lavora dal telefono, e descrive per sensazioni: è il contesto, non un difetto. Se una richiesta era ambigua, la lezione è "non ho fatto la domanda", non "non è stato chiaro".
- **Niente autoflagellazione.** Serve a niente e allunga il documento. Nomina l'errore in una riga e passa al guardrail.
- **Niente lezioni generiche.** *"Comunicare meglio"*, *"pianificare di più"* non sono lezioni: non si possono verificare. Se non riesci a scrivere come si controlla che la lezione sia stata applicata, non è una lezione.

## Cosa consegnare

Poche righe, in italiano, con dentro:

1. **Gli schemi trovati**, uno per riga, con quante volte si sono ripetuti.
2. **Dove ho scritto la lezione** — il file e la riga, non "l'ho annotato".
3. **Il guardrail messo**, se se ne poteva mettere uno.
4. **L'unica cosa che cambio da adesso.**
