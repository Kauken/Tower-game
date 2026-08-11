---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (isola, braccianti, motore, e piu' avanti economia, tempo e commesse). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi. Ogni blocco può avere un `_nota` che spiega a cosa serve: si scrive per l'autore, che non programma.

> **Aggiornato il 2026-08-11 (sera tardi)** (`GDD.md` v5.0, l'isola). Se trovi riferimenti a `percorso.json`, `nemici.json`, `reclute.json`, `ondate.json`, `potenziamenti.json`, `sinergie.json`, `griglia.json`, `contenuti.json` o `vicinanze.json`, sono file di versioni cancellate: non vanno ricreati.

## isola.json
Il mondo. **Le tessere ci sono ma non si disegnano mai.**
- `tessera`: il lato di una tessera in pixel logici.
- `mappa`: un elenco di righe di testo, un carattere per tessera. Tutte lunghe uguale.
- `legenda`: cosa vuol dire ogni carattere.
- `terreni`: i fondi (`acqua`, `sabbia`, `erba`) con `colore`, `variazione`, `calpestabile`.
- `risorse`: quello che sta sopra al terreno. `mestiere` dice chi lo sa lavorare, `tempo_lavoro_ms` quanto ci mette, `resa` cosa finisce in magazzino, `blocca` se ci si puo' camminare sopra, `squadrata` se va disegnata quadrata invece che tonda.
- `materiali`: `id`, `nome`, `colore`.
- `telecamera`: `zoom` (i livelli, due), `margine_tessere`, `soglia_trascinamento`, `durata_tocco_ms` — le ultime due distinguono un tocco da un trascinamento, e sono misure di **sensazione**, non dettagli tecnici.

## braccianti.json
Chi lavora. `velocita`, `distanza_arrivo`, poi `mestieri` (`id`, `nome`, `descrizione`, `colore`, `salario`) e `iniziali` (chi c'e' all'avvio e dove).

**Regola non negoziabile:** un bracciante fa **un mestiere solo**. Niente griglia di priorita' alla RimWorld: su un telefono con un dito sarebbe illeggibile, e ne nasce il difetto per cui il giocatore non capisce perche' nessuno stia lavorando.

> **Controlli automatici all'avvio:** le righe della mappa devono essere tutte lunghe uguale, ogni carattere dev'essere nella legenda, ogni risorsa lavorabile deve nominare un mestiere che esiste e un materiale che esiste, e ogni mestiere iniziale deve avere almeno una risorsa da lavorare — un bracciante pagato per stare fermo e' configurazione morta.

## motore.json
Valori tecnici e di aspetto, non di bilanciamento: `area` (la risoluzione logica dello **schermo**, non del mondo), `simulazione`, `limiti`, `interfaccia`, `grafica`.
L'agente `bilanciatore` **non tocca questo file**.

**Regole di disegno vincolanti** (`grafica.mondo`): le tessere **non hanno bordi, mai**; la variazione del terreno e' una **macchia tonda sfalsata**, non un quadrato piu' chiaro — un quadrato dentro una griglia di quadrati si legge come una scacchiera, ed e' la cosa che l'autore ha rifiutato.

## economia.json, tempo.json, commesse.json *(punti 3 e 5, non esistono ancora)*
Salari e spese di sera; quanto dura un giorno; cosa chiedono le commesse.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, e' un errore: deve stare in uno solo.
- Un blocco che nessuno legge piu' va rimosso, non lasciato li'.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
