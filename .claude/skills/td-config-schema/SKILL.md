---
name: td-config-schema
description: Schema e regole dei file di configurazione del gioco (stanza, nemici, personaggio, motore, potenziamenti, sinergie). Consulta questa skill ogni volta che leggi, scrivi o modifichi un file dentro config/, o quando aggiungi un valore nuovo che dovrà essere configurabile.
---

# Schema delle configurazioni

Principio generale: il codice **legge** questi file, non contiene mai i valori. Se serve un numero nuovo, si aggiunge qui.

Tutte le chiavi sono in italiano, in `snake_case`. Le distanze sono in pixel logici, i tempi in millisecondi, le velocità in pixel al secondo. Ogni blocco può avere un `_nota` che spiega a cosa serve: si scrive per l'autore, che non programma.

> **Aggiornato il 2026-08-02 col progetto nuovo.** Se trovi riferimenti a `torri.json`, `mappe.json`, `economia.json`, `alleati.json`, `pressione.json` o `ondate.json`, sono file cancellati di giochi precedenti: non vanno ricreati.

## stanza.json
La stanza, cioè l'unità di gioco.
- `area`: `larghezza`, `altezza` — la risoluzione logica su cui poggia tutto.
- `arena`: `sinistra`, `destra`, `alto`, `basso`, `spessore_muro` — i bordi entro cui ci si muove.
- `ingressi`: `margine_dagli_angoli`, `preavviso_ms`, `scarto_dal_muro` — da dove entrano i nemici e quanto preavviso danno.
- `popolamento`: `nemico_id`, `quantita_iniziale`, `quantita_totale`, `quantita_aggiunta_per_stanza`, `quantita_massima`, `intervallo_uscita_ms`.
- `partenza_personaggio`: `{x, y}`.

## nemici.json
Elenco di oggetti: `id`, `nome`, `vita`, `velocita`, `danno`, `cadenza_ms`, `raggio_attacco`, `riduzione_danno`, `dimensione`.
Più `scalatura` (crescita per stanza: moltiplicatori di vita e danno) e `affollamento` (`spinta`: quanto i nemici si scansano fra loro).

## personaggio.json
`dimensione`, `velocita`, `raggio_attacco`, `danno`, `cadenza_ms`, `velocita_proiettile`, `raggio_area`, `vita`, `riduzione_danno`, `immunita_dopo_colpo_ms`, `sguardo_iniziale`.

## potenziamenti.json
`id`, `nome`, `famiglia`, `tag` (array), `rarita`, `descrizione`, `effetto` (oggetto strutturato, mai codice).
**Regola del GDD:** ogni oggetto deve avere un effetto anche sul seguito, non solo sul personaggio.

## sinergie.json
Elenco di regole: `tag_richiesti` (array di 2 tag), `nome`, `descrizione`, `effetto`.
Una sinergia non nomina mai un potenziamento specifico: solo tag.

## motore.json
Valori tecnici e di aspetto, non di bilanciamento: `simulazione` (passo fisso in ms, passi massimi per frame), `limiti` (dimensione dei pool preallocati), `interfaccia` (misure e colori dei comandi a schermo), `grafica` (colori e spessori di stanza, nemici, personaggio, proiettili, effetti).
L'agente `bilanciatore` **non tocca questo file**.

## Regole di modifica

- Non rinominare mai un `id` esistente: si spezzano i riferimenti incrociati e i salvataggi.
- Aggiungere un campo nuovo significa aggiornare tutti gli elementi dello stesso file.
- Se un valore compare in due file, è un errore: deve stare in uno solo.
- Un blocco che nessuno legge più va rimosso, non lasciato lì: è il modo in cui il progetto si riempie di macerie.
- Dopo ogni modifica alle configurazioni, esegui i controlli di coerenza dell'agente `collaudo`.
