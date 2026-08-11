---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (griglia, colture, minerali, macchine, vicinanze, sblocchi, tempo, motore). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi. Ogni blocco può avere un `_nota` che spiega a cosa serve: si scrive per l'autore, che non programma.

> **Aggiornato il 2026-08-11 col gioco nuovo** (`GDD.md` v3.0, fattoria cozy su griglia). Se trovi riferimenti a `percorso.json`, `nemici.json`, `reclute.json`, `ondate.json`, `economia.json`, `potenziamenti.json` o `sinergie.json`, sono file cancellati del tower defense: non vanno ricreati.

## griglia.json
La forma del campo. Geometria pura: nessun valore di bilanciamento.
- `area`: `larghezza`, `altezza` — la risoluzione logica su cui poggia tutto.
- `griglia`: `colonne`, `righe`, `lato_casella`, `spazio_fra_caselle`.
- `griglia.caselle_iniziali`: quante caselle sono già sbloccate all'inizio, e quali.

## contenuti.json
Tutto quello che si può mettere in una casella, in un elenco solo. Ogni voce ha `id`, `nome`, `famiglia` e `descrizione`, più i campi della sua famiglia.

Le famiglie sono:
- `coltura` — cresce da sola: `tempo_crescita_ms`, `resa` (`{materiale, quantita}`), `costo_semina`.
- `roccia` — si scava a mano: `colpi`, `resa`, `si_esaurisce`.
- `macchina` — trasforma: `ingredienti` (array), `produce`, `tempo_ciclo_ms`.
- `automazione` — toglie un lavoro: `sostituisce` (`raccolta` | `semina` | `trasporto` | `scavo`), `raggio`.
- `terreno` — non produce, serve alle vicinanze: per esempio il canale d'acqua.

**Ogni voce occupa esattamente una casella.** Non esistono contenuti che ne occupano due: è una regola di design, non una limitazione tecnica.

## vicinanze.json
Il cuore del gioco. Elenco di regole, ognuna con:
- `id`, `nome`, `descrizione` — leggibili dall'autore
- `chi` — la famiglia o l'id che riceve il bonus
- `accanto_a` — cosa deve stargli adiacente
- `quante` — quante adiacenze servono perché scatti (1 per default; l'alveare ne vuole 4 **diverse**)
- `diverse` — `true` se le adiacenze devono essere di tipo diverso fra loro
- `effetto` — `{statistica, moltiplicatore}` oppure `{statistica, aggiunta}`

**Regola non negoziabile:** devono esistere sia regole che premiano la monocoltura sia regole che premiano la varietà. Se tutte tirano dalla stessa parte, il piazzamento ha una risposta ovvia e il gioco non esiste.

## sblocchi.json
La bacheca. Elenco ordinato, ognuno con `id`, `nome`, `descrizione`, `costo` (array di `{materiale, quantita}`), `richiede` (id di altri sblocchi), `sblocca` (id di contenuti).

**Regola del GDD:** uno sblocco deve dare **un verbo nuovo**, non un numero più grande. I "+15%" non vanno qui.

## tempo.json
- `giorno_ms` — quanto dura un giorno mentre l'app è aperta.
- `offline`: `frazione_di_velocita`, `tetto_ms` — quanto e fino a quando la fattoria produce a app chiusa.

## motore.json
Valori tecnici e di aspetto, non di bilanciamento: `simulazione` (passo fisso in ms, passi massimi per frame), `limiti` (dimensione dei pool preallocati), `interfaccia` (misure e colori dei comandi a schermo), `grafica` (colori della griglia, dei contenuti, degli effetti, del segno di vicinanza).
L'agente `bilanciatore` **non tocca questo file**.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Un blocco che nessuno legge più va rimosso, non lasciato lì: è il modo in cui il progetto si riempie di macerie.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
