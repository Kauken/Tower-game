---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (percorso, nemici, reclute, ondate, economia, motore, potenziamenti, sinergie). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi, le velocità in pixel al secondo. Ogni blocco può avere un `_nota` che spiega a cosa serve: si scrive per l'autore, che non programma.

> **Aggiornato il 2026-08-02 col gioco nuovo** (`GDD.md` v2.0, tower defense con reclute). Se trovi riferimenti a `stanza.json`, `personaggio.json`, `torri.json`, `mappe.json`, `alleati.json` o `pressione.json`, sono file cancellati di giochi precedenti: non vanno ricreati.

## percorso.json
Il campo di battaglia. Geometria pura: nessun valore di bilanciamento.
- `area`: `larghezza`, `altezza` — la risoluzione logica su cui poggia tutto.
- `campo.sentiero`: elenco di punti `{x, y}`. Il primo è da dove escono i nemici, l'ultimo è il castello. I nemici lo percorrono in avanti, le reclute all'indietro.
- `campo.larghezza_sentiero`: quanto è largo il disegno della strada.
- `campo.scarti_sentiero`: gli scostamenti laterali usati a rotazione, così i combattenti non si sovrappongono. **Sono solo estetici**: gli scontri si decidono sulla distanza lungo il sentiero, non in linea d'aria.
- `campo.castello`, `campo.uscita_nemici`: rettangoli `{x, y, larghezza, altezza}`.
- `campo.torri_rendita`: le due torri che producono oro, `{x, y}`.

## nemici.json
Elenco di oggetti: `id`, `nome`, `vita`, `velocita`, `danno`, `cadenza_ms`, `raggio_ingaggio`, `riduzione_danno`, `danno_castello`, `oro_rilasciato`, `dimensione`.
Più `scalatura`: quanto crescono ondata dopo ondata (`vita_per_ondata`, `danno_per_ondata`, `oro_per_ondata`, moltiplicatori elevati a `ondata - 1`).

## reclute.json
Elenco di oggetti: `id`, `nome`, `categoria`, `costo`, `vita`, `velocita`, `danno`, `cadenza_ms`, `raggio_ingaggio`, `riduzione_danno`, `dimensione`.
Più `recluta_iniziale`: l'id di quella comprabile dall'inizio.
Le reclute **non si potenziano con l'oro**: l'oro compra unità nuove e rendita. A cambiarle sono gli oggetti.

## ondate.json
Il ritmo. Quantità e cadenza si ricavano da una formula, **mai scritte a mano ondata per ondata**: `nemico_id`, `quantita_base`, `quantita_aggiunta_per_ondata`, `intervallo_uscita_ms`, `riduzione_intervallo_per_ondata_ms`, `intervallo_minimo_ms`, `attesa_prima_ondata_ms`, `pausa_fra_ondate_ms`.
Le pause non sono tempo morto: sono il tempo in cui l'oro sale e si decide come spenderlo.

## economia.json
Il cuore del gioco: questi numeri devono rendere difficile la domanda "compro adesso o investo nella rendita?".
- `partita`: `oro_iniziale`, `vita_castello`.
- `rendita`: `oro_per_ciclo`, `ciclo_ms`, `oro_aggiunto_per_livello`, `costo_primo_potenziamento`, `crescita_costo_potenziamento`, `livello_massimo`.
- `ricompense`: `oro_base_per_ondata`, `crescita_per_ondata`.
- `cristalli`: valuta permanente, nessuno la legge ancora (serve al punto 14).

## potenziamenti.json
`id`, `nome`, `famiglia`, `tag` (array), `rarita`, `descrizione`, `effetto` (oggetto strutturato, mai codice).
**Regola del GDD:** ogni oggetto deve cambiare **come** combattono le reclute, non solo di quanto.

## sinergie.json
Elenco di regole: `tag_richiesti` (array di 2 tag), `nome`, `descrizione`, `effetto`.
Una sinergia non nomina mai un potenziamento specifico: solo tag.

## motore.json
Valori tecnici e di aspetto, non di bilanciamento: `simulazione` (passo fisso in ms, passi massimi per frame), `limiti` (dimensione dei pool preallocati), `interfaccia` (misure e colori dei comandi a schermo), `grafica` (colori e spessori di campo, castello, torri, nemici, reclute, effetti).
L'agente `bilanciatore` **non tocca questo file**.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Un blocco che nessuno legge più va rimosso, non lasciato lì: è il modo in cui il progetto si riempie di macerie.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
