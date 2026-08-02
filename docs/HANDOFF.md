# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-02. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il progetto è stato riscritto da zero il 2026-08-02

Il gioco è un **action roguelike a stanze con un seguito di minion** (`GDD.md` v1.0).

Le versioni precedenti — tower defense a labirinto, battaglia a corsie, assedio fra castelli — **non esistono più**. Non erano evoluzioni: erano giochi diversi impilati uno sull'altro. Se trovi codice, configurazione o documenti che nominano **torri, caselle, ondate, corsia, fronte, pressione, castelli o atti**, sono resti da rimuovere, non funzionalità da mantenere.

## Cos'è il gioco

Entri in una stanza col tuo **seguito** di minion appresso. Loro combattono da soli e ti fanno da scudo; tu sei veloce e preciso, e decidi dove si combatte. Ripulita la stanza le porte si aprono e prosegui. Nella stanza del tesoro c'è **un oggetto su un piedistallo**: lo prendi, e cambia il modo di combattere tuo **e del seguito**.

**Il seguito è l'unica idea originale del progetto.** Roguelike a stanze in cui sei solo ce ne sono cento; con un esercito che cresce quasi nessuno. Ogni scelta che rende il seguito meno importante è la scelta sbagliata.

## Stato del codice

**L'assedio è stato smontato. Il punto 1 della roadmap è FATTO:** esiste la stanza.

Cosa c'è adesso: un'arena chiusa con i muri, il personaggio che ci sbatte contro, nemici che entrano dai bordi con un segnale di preavviso, inseguono e colpiscono a contatto, si scansano fra loro. Ripuliti tutti, la stanza si dichiara pulita e un pulsante porta alla successiva (le porte vere sono al punto 4). Il personaggio ha vita e a zero la run finisce.

| File | Cosa fa |
| --- | --- |
| `src/game/motore.js` | Ciclo a passo fisso, disegno ritagliato sull'arena, ponte con React |
| `src/game/stanza.js` | Quanti nemici, da dove entrano, quando la stanza è pulita |
| `src/game/nemici.js` | Inseguimento, attacco a contatto, spinta reciproca |
| `src/game/personaggio.js` | Movimento, attacco automatico, vita |
| `src/ui/Levetta.jsx` | La levetta a pollice |
| `config/stanza.json` | Geometria dell'arena, ingressi, popolamento |

**Non esiste ancora niente** di: seguito, porte, mappa del piano, oggetti, boss, negozio, salvataggio.

## Prossime mosse

1. **Punto 2**: il seguito. Tocca le **decisioni aperte 2 e 3** (come si comporta, quanti sono): vanno chiuse prima, col `consulente-design`.
2. **Punto 3**: nemici che valgono, poi la **verifica obbligatoria** — ripulire una stanza col seguito appresso è divertente?

## Cosa è già deciso e non si rimette in discussione

- **Si resta sul web**, niente Godot: l'autore prova il gioco aprendo un link dal telefono, e con Godot dovrebbe installare un pacchetto a ogni giro. Da rivedere al punto 17.
- **Comandi**: levetta a pollice più attacco automatico. Provato dall'autore: "si muove bene ed è piacevole".
- **Oggetti alla Isaac**: uno su un piedistallo, non "3 carte ne scegli 1".
- **Ogni oggetto tocca anche il seguito**, non solo il personaggio.

## Problemi noti (nessuno urgente)

- La ricerca del bersaglio riscandaglia l'intero pool avversario a ogni passo: da far guardare a `revisore-mobile` quando le stanze saranno piene.
- `fontWeight` e spessori bordo scritti a mano nei componenti `src/ui/` (regola 1 in senso stretto).
- `index.html` duplica a mano due colori di `motore.json`.
- In orizzontale il campo diventa minuscolo: prima o poi va bloccato il verticale.
- Il bilanciamento non è mai stato fatto: tutti i numeri attuali sono messi a occhio.
- Il Cruscotto mostra i nemici **vivi**, non quelli ancora da generare. Oggi non capita mai di vedere "0 nemici" con la stanza non finita, ma diventerà possibile quando gli oggetti faranno crescere il danno più in fretta della vita dei nemici.

## Grafica: piano concordato

Grafica procedurale su canvas (forme, colori), da migliorare con l'agente `rifinitore`. Gli sprite veri arrivano dopo che il gioco è divertente: pacchetto consigliato Kenney (CC0). **Nota tecnica**: da questo ambiente non si possono scaricare i siti di asset (rete ristretta) — l'autore dovrà allegare lo zip in chat, poi si integra.

## Come si lavora (promemoria)

- `/punto N` → esegue il punto N della roadmap col protocollo completo.
- `/richiesta` + testo libero → trasforma in specifica e aspetta conferma.
- "decidiamo la N" → apre la voce N di `DECISIONI.md` col `consulente-design`.
- Ogni fine lavoro: agente `collaudo`, punto segnato FATTO, resoconto con "Cosa provare".
- L'autore non programma e lavora dal telefono: italiano pratico, niente gergo, un lavoro alla volta.
