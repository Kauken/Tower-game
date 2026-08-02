# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-02. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il progetto è stato riscritto da zero il 2026-08-02

Il gioco è un **action roguelike a stanze con un seguito di minion** (`GDD.md` v1.0).

Le versioni precedenti — tower defense a labirinto, battaglia a corsie, assedio fra castelli — **non esistono più**. Non erano evoluzioni: erano giochi diversi impilati uno sull'altro. Se trovi codice, configurazione o documenti che nominano **torri, caselle, ondate, corsia, fronte, pressione, castelli o atti**, sono resti da rimuovere, non funzionalità da mantenere.

## Cos'è il gioco

Entri in una stanza col tuo **seguito** di minion appresso. Loro combattono da soli e ti fanno da scudo; tu sei veloce e preciso, e decidi dove si combatte. Ripulita la stanza le porte si aprono e prosegui. Nella stanza del tesoro c'è **un oggetto su un piedistallo**: lo prendi, e cambia il modo di combattere tuo **e del seguito**.

**Il seguito è l'unica idea originale del progetto.** Roguelike a stanze in cui sei solo ce ne sono cento; con un esercito che cresce quasi nessuno. Ogni scelta che rende il seguito meno importante è la scelta sbagliata.

## Stato reale del codice

**Il codice è ancora quello dell'assedio: non è stato ancora smontato.** Sul sito pubblicato c'è la vecchia battaglia a campo aperto fra due castelli, che non è più il gioco.

Cosa succede al punto 1 della roadmap: si butta l'assedio e si costruisce la prima stanza.

| Sopravvive | Va buttato |
| --- | --- |
| Ciclo a passo fisso, pool preallocati, adattamento allo schermo (`motore.js`, `pool.js`, `schermo.js`) | Marcia verso il castello (`truppe.js`) |
| Levetta a pollice (`Levetta.jsx`) | Pressione e spinte (`pressione.js`) |
| Personaggio: movimento, attacco automatico, vita, abbattimento (`personaggio.js`) | Vita dei castelli e fine partita (`partita.js`) |
| Proiettili ed effetti (`proiettili.js`, `effetti.js`) | Sfondo a campo aperto (`sfondo.js`) |
| **La logica di combattimento** dentro `truppe.js`: ingaggia il più vicino, colpisci, cadi | Generazione dei minion da una fortezza |

Circa metà del motore resta in piedi.

## Prossime mosse

1. **Punto 1**: smontare l'assedio e costruire **la stanza sola** — arena chiusa, nemici che entrano, stanza che si dichiara pulita. Niente porte, niente seguito ancora.
2. **Punto 2**: il seguito. Tocca le **decisioni aperte 2 e 3** (come si comporta, quanti sono): vanno chiuse prima, col `consulente-design`.
3. **Punto 3**: nemici che valgono, poi la **verifica obbligatoria** — ripulire una stanza col seguito appresso è divertente?

## Cosa è già deciso e non si rimette in discussione

- **Si resta sul web**, niente Godot: l'autore prova il gioco aprendo un link dal telefono, e con Godot dovrebbe installare un pacchetto a ogni giro. Da rivedere al punto 17.
- **Comandi**: levetta a pollice più attacco automatico. Provato dall'autore: "si muove bene ed è piacevole".
- **Oggetti alla Isaac**: uno su un piedistallo, non "3 carte ne scegli 1".
- **Ogni oggetto tocca anche il seguito**, non solo il personaggio.

## Problemi noti dal vecchio codice (utili solo se quel pezzo sopravvive)

- La ricerca del bersaglio riscandaglia l'intero pool avversario a ogni passo: da far guardare a `revisore-mobile` quando le stanze saranno piene.
- `fontWeight` e spessori bordo scritti a mano nei componenti `src/ui/` (regola 1 in senso stretto).
- `index.html` duplica a mano due colori di `motore.json`.
- In orizzontale il campo diventa minuscolo: prima o poi va bloccato il verticale.
- Il bilanciamento non è mai stato fatto: tutti i numeri attuali sono messi a occhio.

## Grafica: piano concordato

Grafica procedurale su canvas (forme, colori), da migliorare con l'agente `rifinitore`. Gli sprite veri arrivano dopo che il gioco è divertente: pacchetto consigliato Kenney (CC0). **Nota tecnica**: da questo ambiente non si possono scaricare i siti di asset (rete ristretta) — l'autore dovrà allegare lo zip in chat, poi si integra.

## Come si lavora (promemoria)

- `/punto N` → esegue il punto N della roadmap col protocollo completo.
- `/richiesta` + testo libero → trasforma in specifica e aspetta conferma.
- "decidiamo la N" → apre la voce N di `DECISIONI.md` col `consulente-design`.
- Ogni fine lavoro: agente `collaudo`, punto segnato FATTO, resoconto con "Cosa provare".
- L'autore non programma e lavora dal telefono: italiano pratico, niente gergo, un lavoro alla volta.
