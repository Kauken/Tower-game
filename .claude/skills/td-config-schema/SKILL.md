---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (griglia, colture, minerali, macchine, vicinanze, sblocchi, tempo, motore). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi. Ogni blocco può avere un `_nota` che spiega a cosa serve: si scrive per l'autore, che non programma.

> **Aggiornato il 2026-08-11 (sera)** (`GDD.md` v4.0, gestionale di fattoria). Se trovi riferimenti a `percorso.json`, `nemici.json`, `reclute.json`, `ondate.json`, `potenziamenti.json` o `sinergie.json`, sono file cancellati del tower defense: non vanno ricreati.

## griglia.json
La forma del campo. Geometria pura: nessun valore di bilanciamento.
- `area`: `larghezza`, `altezza` — la risoluzione logica su cui poggia tutto.
- `griglia`: `colonne`, `righe`, `lato_casella`, `spazio_fra_caselle`.
Quante caselle sono già arate all'inizio sta in `economia.json`, non qui: è bilanciamento, non geometria.

## contenuti.json
Tutto quello che si può mettere in una casella, in un elenco solo. Ogni voce ha `id`, `nome`, `famiglia` e `descrizione`, più i campi della sua famiglia.

Le famiglie sono:
- `coltura` — cresce da sola: `tempo_crescita_ms`, `resa` (`{materiale, quantita}`), `costo_seme`.
- `terreno` — non produce, serve alle vicinanze (il canale d'acqua). Ha comunque un `costo_seme`.
- `roccia` — si scava a mano: `colpi`, `resa` (punto 5).
- `lavorazione` — trasforma: `ingredienti`, `produce`, `tempo_ciclo_ms` (punti 6-7).
- `bracciante` / `macchina` — fanno un lavoro al posto tuo (punti 8-9).

I `materiali` hanno `prezzo_base`: quanto paga il mercato per un pezzo. Il prezzo vero oscilla ogni giorno.

**Ogni voce occupa esattamente una casella.** Non esistono contenuti che ne occupano due: è una regola di design, non una limitazione tecnica.

**Piantare consuma un seme.** È la regola che rende difficile l'inizio, ed è il motivo per cui si vende.

> **Controllo automatico all'avvio:** se una coltura è migliore di un'altra sotto *ogni* aspetto (seme più economico, tempo più breve e guadagno più alto), il gioco si rifiuta di partire. Con una coltura dominante, scegliere cosa piantare non è una decisione.

## economia.json
Il cuore del gioco: questi numeri devono rendere difficile la domanda *"reinvesto adesso o metto da parte perché stasera devo pagare?"*.
- `partenza`: `monete`, `semi` (array di `{id, quantita}`), `caselle_arate`.
- `spese`: `manutenzione_per_casella_arata`, `manutenzione_minima`.
- `dissodare`: `costo_primo`, `crescita_costo` — il costo sale a ogni casella aperta.
- `mercato`: `oscillazione_minima`, `oscillazione_massima`.

## tempo.json
- `giorno_ms` — quanto dura un giorno mentre l'app è aperta.
- `riepilogo.durata_visibile_ms` — per quanto resta il foglio di fine giornata.
- `offline` — `frazione_di_velocita`, `tetto_ms` (serve al punto 13, nessuno lo legge ancora).

## vicinanze.json
**Ne è rimasta una sola: l'irrigazione.** Le regole a moltiplicatore (Filare, Rotazione) sono state tolte l'11 agosto: erano nate per fare un puzzle di incastro, e questo è un farmer. **Non riaggiungere moltiplicatori astratti:** i veri problemi di disposizione arriveranno dalle lavorazioni, e nasceranno dalla simulazione.

Elenco di regole, ognuna con:
- `id`, `nome`, `descrizione` — leggibili dall'autore
- `chi` — la famiglia o l'id che riceve il bonus
- `accanto_a` — cosa deve stargli adiacente
- `quante` — quante adiacenze servono perché scatti (1 per default; l'alveare ne vuole 4 **diverse**)
- `diverse` — `true` se le adiacenze devono essere di tipo diverso fra loro
- `effetto` — `{statistica, moltiplicatore}`; `statistica` è `resa` oppure `velocita`

## commesse.json *(punto 4, non esiste ancora)*
Quello che qualcuno ti chiede: `id`, `chi`, `chiede` (array di `{materiale, quantita}`), `paga`, `sblocca`.
Pagano molto più del mercato e sbloccano lavorazioni. Sono il "non vedo l'ora", e producono la decisione *vendo o tengo da parte*.

## motore.json
Valori tecnici e di aspetto, non di bilanciamento: `simulazione` (passo fisso in ms, passi massimi per frame), `limiti` (dimensione dei pool preallocati), `interfaccia` (misure e colori dei comandi a schermo), `grafica` (colori della griglia, dei contenuti, degli effetti, del segno di vicinanza).
L'agente `bilanciatore` **non tocca questo file**.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Un blocco che nessuno legge più va rimosso, non lasciato lì: è il modo in cui il progetto si riempie di macerie.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
