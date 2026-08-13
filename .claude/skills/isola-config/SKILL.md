---
name: isola-config
description: Schema e regole dei file di configurazione del gioco (isola, braccianti, costruzioni, progetti, ricette, motore). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

**Principio generale: il codice legge questi file, non contiene mai i valori.** Se ti serve un numero nuovo, si aggiunge qui — non si scrive nel codice "solo per adesso".

Chiavi in italiano, in `snake_case`. Distanze in pixel logici, tempi in millisecondi. Ogni blocco può avere un `_nota` che spiega a cosa serve: **si scrive per l'autore, che non programma.**

> **Aggiornato il 2026-08-12** (`GDD.md` v6.0). Se trovi `percorso.json`, `nemici.json`, `reclute.json`, `ondate.json`, `potenziamenti.json`, `sinergie.json`, `griglia.json` o `vicinanze.json`, sono file di versioni cancellate: **non vanno ricreati**.

## isola.json
Il mondo. **Le tessere ci sono ma non si disegnano mai.**

- `tessera` — il lato di una tessera in pixel logici.
- `mappa` — righe di testo, un carattere per tessera, tutte lunghe uguale.
- `legenda` — cosa vuol dire ogni carattere.
- `terreni` — i fondi (`acqua`, `sabbia`, `erba`) con `colore`, `variazione`, `calpestabile`.
- `risorse` — quello che sta sopra al terreno: `tempo_lavoro_ms`, `rese` (**un elenco**, perché un albero dà legno *e* un alberello), `blocca`, `raggio`, i colori, `tempo_crescita_ms` per quello che si pianta.
- `materiali` — `id`, `nome`, `colore`, `prezzo`, **`pila`** (quanti stanno in una casella), e `pianta` se averlo addosso permette di piantare qualcosa.
- `telecamera` — `zoom` (due livelli), `margine_tessere`, `soglia_trascinamento`, `durata_tocco_ms`. Le ultime due distinguono un tocco da un trascinamento: sono misure di **sensazione**, non dettagli tecnici.

## braccianti.json
L'operaio. `velocita`, `distanza_arrivo`, **`slot`** (le caselle dello zaino), i tempi delle azioni che non sono raccolta (`tempo_piantata_ms`, `tempo_scambio_ms`), e `iniziali` (dove comincia).

> **Regola non negoziabile:** ce n'è **uno solo e non si assume**. Resta un elenco perché un secondo operaio sarebbe un valore di configurazione e non una riscrittura, ma **non è una via di crescita**: si cresce con la tecnologia.

## costruzioni.json
Quello che si può piazzare: `costo` (in materiali), `slot` (quante caselle tiene), colori. Più `slot_casotto`.

## tecnologie.json → diventerà progetti.json *(punto 6)*
Gli sblocchi. `id`, `nome`, `descrizione`, `costo` in monete, `richiede`, `effetto` (e `effetto_secondario`).

**Un effetto ha un tipo, e il tipo decide se si moltiplica o si somma:**
- si **moltiplicano** le cose che sono un ritmo: `tempo_lavoro`, `velocita`, `crescita` → chiave `moltiplicatore`
- si **sommano** le cose che si contano: `slot` → chiave `aggiunta`

Sbagliare la parola dà un effetto che non si vede e che nessuno collegherebbe alla configurazione. C'è un controllo all'avvio apposta.

> **Regola:** una tecnologia deve dare un **verbo nuovo** o restituire tempo all'operaio in modo che si senta. Un +5% non merita di stare in bacheca.

## ricette.json *(punto 5, non esiste ancora)*
`produce`, `quantita`, `ingredienti` (al massimo **tre**), `tempo_ms`, `macchina`.

**Tre controlli all'avvio, obbligatori:**
1. Nessuna ricetta produce un materiale che consuma. *(altrimenti materia infinita)*
2. Mai più di tre ingredienti. *(altrimenti non si legge sul telefono)*
3. Ogni ingrediente e ogni prodotto esistono fra i materiali.

Le regole di prezzo e ammortamento stanno in **`docs/MATERIALI.md`**, che è la legge del bilanciamento.

## motore.json
Valori tecnici e di aspetto, **non di bilanciamento**: `area` (la risoluzione logica dello *schermo*, non del mondo), `simulazione`, `limiti` (dimensione dei pool preallocati), `interfaccia`, `grafica`.

**L'agente `bilanciatore` non tocca questo file.**

Regole di disegno vincolanti (`grafica.mondo`): le tessere **non hanno bordi, mai**; la variazione del terreno è una **macchia tonda sfalsata**, non un quadrato più chiaro — un quadrato dentro una griglia di quadrati si legge come una scacchiera, ed è la cosa che l'autore ha rifiutato.

Unica eccezione, ed è in `grafica.mano`: il segno di dove finirà quello che hai in mano, disegnato **solo mentre il dito è premuto**. Verde se ci sta, rosso se no. Su un telefono non esiste il passaggio del mouse: senza, si piazzerebbe alla cieca.

## ~~tempo.json~~
**Cancellato** col ciclo del giorno (2026-08-12). Non va ricreato.

## I controlli all'avvio — il modo di questo progetto per non far sopravvivere gli errori

Stanno in `src/game/config.js`, e **fermano il gioco con un errore in italiano che si capisce**. Una configurazione sbagliata non deve produrre un'isola vuota e muta: deve dire cosa manca.

Oggi controllano: righe della mappa tutte lunghe uguale, ogni carattere nella legenda, ogni resa e ogni costo nominano materiali che esistono, ogni materiale ha prezzo e pila, ogni contenitore ha delle caselle, ogni tecnologia usa la chiave giusta per il suo tipo di effetto, e un materiale che pianta qualcosa pianta una risorsa che sa quanto ci mette a crescere.

**Quando aggiungi un sistema, aggiungi il suo controllo nello stesso intervento.** È la lezione della skill `post-mortem`: un guardrail meccanico, non una buona intenzione.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo significa aggiornare **tutti** gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Un blocco che nessuno legge più **va rimosso**, non lasciato lì. Questo progetto è stato riscritto sei volte, ed è così che si riempie di macerie.
- Dopo ogni modifica, esegui l'agente `collaudo`.
