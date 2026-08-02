# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-02. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco è cambiato il 2026-08-02

Il gioco è un **tower defense roguelike in cui non si piazzano torri: si comprano reclute** (`GDD.md` v2.0, roadmap v6).

Le versioni precedenti — tower defense a labirinto, battaglia a corsie, assedio a campo aperto, **action roguelike a stanze con un seguito di minion** — non esistono più. Se trovi codice, configurazione o documenti che nominano **stanze, porte, piani, minimappa, seguito di minion, piedistalli, levetta o personaggio da muovere**, sono resti da rimuovere, non funzionalità da mantenere.

## Cos'è il gioco

Un sentiero va dalla breccia in alto al tuo castello in basso. I nemici lo scendono, le tue reclute lo risalgono, e si fermano a combattere dove si incontrano. Due torri ai lati non sparano: **producono oro**. Tu non muovi niente e non miri: **decidi solo come spendere**.

**La domanda che regge tutto il gioco è una sola: compro una recluta adesso, o investo nella rendita per comprare di più fra poco?** Se comprare è sempre la mossa giusta, il gioco non esiste. Ogni decisione futura di bilanciamento deve difendere quella tensione.

Si perde quando abbastanza nemici arrivano in fondo: il castello ha una vita che scende, e **la sconfitta si vede arrivare** in tempo per spendere diversamente.

## Stato del codice

**Punto 1 della roadmap FATTO.** C'è il ciclo completo: sentiero, castello con la vita, due torri che producono oro a intervalli, i due pulsanti (compra Milite / potenzia Rendita), le ondate che partono da sole e crescono, e la schermata di sconfitta con "Ricomincia".

Provato nel browser: senza comprare niente il castello cade all'ondata 3 con quasi 400 d'oro mai speso, e il pulsante Ricomincia riparte pulito.

| File | Cosa fa |
| --- | --- |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/game/percorso.js` | La geometria del sentiero: la distanza percorsa e la posizione che ne deriva |
| `src/game/combattenti.js` | Nemici e reclute: marcia, fila, ingaggio, danno, disegno |
| `src/game/ondate.js` | Quando parte un'ondata, quanti nemici escono e quando è finita |
| `src/game/economia.js` | L'oro: rendita delle torri, costi, potenziamenti |
| `src/game/partita.js` | Ondata corrente, vita del castello, fase |
| `src/game/sfondo.js` | Terreno, sentiero, breccia, castello, torri (disegnati una volta sola) |
| `src/ui/Cruscotto.jsx` | Ondata, castello, oro, nemici — in alto |
| `src/ui/Comandi.jsx` | I due pulsanti, in basso sotto il pollice |

**Non esiste ancora niente** di: categorie di recluta, tipi di nemico diversi, oggetti e pool, negozio, mini boss e boss, tipi di ondata speciali, sinergie, salvataggio, progressione permanente.

## Prossime mosse

1. **Verifica obbligatoria del punto 1**, prima di aggiungere qualunque cosa: *decidere quando spendere è soddisfacente?* E soprattutto: **la scelta fra comprare adesso e investire nella rendita è una scelta vera, o comprare è sempre giusto?** Se è sempre giusto, si risolve lì con l'agente `bilanciatore` e non si va avanti.
2. **Punto 2**: le quattro categorie di recluta, un pulsante per ciascuna.
3. **Punto 3**: quattro tipi di nemico e la crescita ondata dopo ondata.

## Cosa è già deciso e non si rimette in discussione

- **Le ondate partono da sole**: niente pulsante per chiamarle in anticipo.
- **Un livello è una sequenza fissa di tipi di ondata** che finisce col boss del bioma.
- **La pool è "tre oggetti, ne scegli uno"** (ribaltata la scelta alla Isaac del gioco precedente).
- **Si resta sul web**, niente Godot: l'autore prova il gioco aprendo un link dal telefono. Da rivedere al punto 16.
- **Il giocatore non si muove e non mira.** Se una richiesta lo presuppone, è un fraintendimento da chiarire.

## ⚠️ PROBLEMA APERTO — economia (verifica del punto 1 non superata)

Il collaudo ha simulato l'economia coi valori attuali. Risultato: **la scelta fra comprare e potenziare non è una scelta.**

- Difendere le ondate 1+2+3 costa ~550 oro; nei primi due minuti ne entrano ~550. Chi difende **non riesce mai** a mettere da parte i 70 del primo potenziamento.
- La strategia "potenzia se puoi, altrimenti compra" finisce a **rendita livello 0**: comprare a 25 tiene l'oro perennemente sotto i 70.
- La linea vincente è **non comprare niente** e lasciar passare le prime ondate: il castello ha 20 di vita e le ondate 1-2 fanno 14 danni in tutto. Chi aspetta arriva all'ondata 13, chi compra subito all'ondata 6.
- I livelli di rendita 6, 7 e 8 si ripagano in 376, 583 e 903 secondi: **non rientrano in nessuna partita** che il gioco produca oggi. `livello_massimo: 8` è un numero irraggiungibile.

Va risolto con l'agente `bilanciatore` sul solo `config/economia.json` **prima del punto 2**. Il cancello 🛑 nella roadmap è chiuso.

## Problemi noti (nessuno urgente)

- Il bilanciamento non è mai stato fatto: **tutti i numeri sono messi a occhio** e la prima cosa da tarare è l'economia.
- L'ingaggio riscandaglia l'intera schiera avversaria a ogni passo: da far guardare a `revisore-mobile` quando i nemici saranno tanti.
- Le reclute sopravvissute risalgono fino alla breccia e restano lì: i nemici dell'ondata dopo escono addosso a loro e si sovrappongono per un istante nel disegno.
- Sulla schermata di sconfitta il cruscotto mostra "Nemici 0" anche se sul campo ne restano.
- `index.html` duplica a mano due colori di `motore.json`.
- In orizzontale il campo diventa minuscolo: prima o poi va bloccato il verticale.
- Le torri sono lontane dal sentiero e non "fanno" niente di visibile oltre al lampo della rendita.

## Grafica: piano concordato

Grafica procedurale su canvas (forme, colori), da migliorare con l'agente `rifinitore`. Gli sprite veri arrivano dopo che il gioco è divertente: pacchetto consigliato Kenney (CC0). **Nota tecnica**: da questo ambiente non si possono scaricare i siti di asset (rete ristretta) — l'autore dovrà allegare lo zip in chat, poi si integra.

## Come si lavora (promemoria)

- `/punto N` → esegue il punto N della roadmap col protocollo completo.
- `/richiesta` + testo libero → trasforma in specifica e aspetta conferma.
- "decidiamo la N" → apre la voce N di `DECISIONI.md` col `consulente-design`.
- Ogni fine lavoro: agente `collaudo`, punto segnato FATTO, resoconto con "Cosa provare".
- L'autore non programma e lavora dal telefono: italiano pratico, niente gergo, un lavoro alla volta.
