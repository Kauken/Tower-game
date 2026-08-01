---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (torri, nemici, mappe, potenziamenti, sinergie, economia). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi, le velocità in pixel al secondo.

## torri.json
Elenco di oggetti. Campi obbligatori:
`id`, `nome`, `costo`, `danno`, `cadenza_ms`, `raggio`, `tipo_bersaglio` (`singolo` | `area` | `nessuno`), `descrizione`.

## nemici.json
`id`, `nome`, `vita_base`, `velocita`, `riduzione_danno`, `oro_rilasciato`, `dimensione`.
Più un blocco `scalatura` con la formula di crescita per ondata (moltiplicatore per vita e per oro).

## mappe.json
`id`, `nome`, `percorso` (elenco ordinato di punti `{x, y}`), `caselle` (elenco di `{x, y, tipo}` con tipo `normale` | `altura` | `mana`), `bonus_slot` (i modificatori di altura e mana).

## potenziamenti.json
`id`, `nome`, `famiglia` (`modulo` | `reliquia` | `consumabile`), `tag` (array), `rarita`, `descrizione`, `effetto` (oggetto strutturato, mai codice).

## sinergie.json
Elenco di regole: `tag_richiesti` (array di 2 tag), `nome`, `descrizione`, `effetto`.
Una sinergia non nomina mai un potenziamento specifico: solo tag.

## economia.json
Oro iniziale, oro per ondata, vite iniziali, ricompense boss, conversione in cristalli a fine partita, costi del mercante.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
