# Ricerca — Grafica dell'isola (sprite, terreno, leggibilità)

> **Stato: BOZZA IN CORSO.** Il file viene riscritto man mano. Se leggi questa riga, la ricerca non è finita.

**Verifica dei file.** `docs/PROGETTI.md` esiste, `docs/GDD.md` è la v7.1 e parla dell'isola e dell'operaio (non di torri), ramo `claude/torre-guardia-scaffold-5fv3nl`. **Nessun checkout è stato necessario.**

**Il taglio.** Solo quello che si vede *sull'isola*: alberi, sassi, giacimenti, casse, macchine, operaio, terreno. I pannelli li fa un altro agente.

---

## In una riga

**Metti un contorno scuro di spessore fisso attorno a ogni cosa** — fisso in pixel di schermo, non proporzionale alla sagoma. Oggi il contorno c'è, ma è disegnato *dentro* la sagoma e quindi si rimpicciolisce insieme a lei: alla vista lontana vale mezzo pixel, cioè non esiste. È il motivo numero uno per cui "non si capisce niente".

---

## Numeri veri di come stiamo adesso (derivati dal codice e dalla configurazione)

Schermo logico 720×1440 (`motore.json` → `area`). Su un telefono normale largo 390 punti, quello schermo logico viene rimpicciolito di circa **0,54**. Tessera = 64 logici. Zoom: 1 e 0,55.

| Cosa | Quanto è grande davvero (punti di schermo) |
| --- | --- |
| Una tessera, vista da vicino | ~35 |
| Una tessera, vista da lontano | ~19 |
| Un albero (parte disegnata) da vicino | ~34 |
| Un albero da lontano | **~19** |
| Il contorno scuro dell'albero, da vicino | **~1** |
| Il contorno scuro dell'albero, da lontano | **~0,5** |
| Il pallino di stato della macchina, da vicino | ~6 |
| Il pallino di stato della macchina, da lontano | **~3,5** |

*(Tutti derivati, non citati: calcolati da `sagome.js`, `disegno.js`, `motore.json`, `isola.json`.)*

Il pallino da 3,5 punti è sotto qualunque soglia di riconoscibilità: le linee guida di Apple e Google parlano di 44 e 48 punti per una cosa da *toccare*, e anche solo per *vedere* un'icona la raccomandazione più bassa che si trova è 24 punti. *(citato: Apple HIG / Material via le fonti in fondo)*

---

## Il resto del report è in lavorazione

Sezioni ancora da scrivere: le sette domande, la tabella "cosa abbiamo / cosa fanno gli altri / cosa cambierei", la sezione sugli sprite gratis, "Cosa cambia da noi", "Quello che NON ho trovato", fonti.
