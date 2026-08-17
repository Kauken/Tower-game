---
name: grillme
description: Interroga l'autore una domanda alla volta, con la risposta gia' consigliata, finche' una decisione di design aperta non e' chiusa e scritta in docs/DECISIONI.md. Usala solo quando una scelta e' davvero aperta e sbagliarla costerebbe piu' del tempo di parlarne — non per specificare un lavoro (quella e' `richiesta`) e mai per i numeri (quello e' l'agente `bilanciatore`).
---

# Grigliata

Serve a **chiudere** una decisione, non a esplorarla. Finisce sempre in una riga scritta in `docs/DECISIONI.md`, altrimenti e' stata solo una chiacchierata — e di chiacchierate questo progetto ne ha gia' 6.900 righe contro 5.300 di gioco (`docs/BILANCIO.md`).

## Prima di aprire bocca

1. **Guarda se e' gia' deciso.** `docs/DECISIONI.md` (comprese le voci ❌ rifiutate) e il registro dei rifiuti in `isola-glossario`. Se lo e', non si chiede: si dice quando e con che parole.
2. **Guarda se e' misurabile.** `npm run progressione`, `npm run simula`, `config/*.json`, il codice. **Tutto quello che puoi scoprire da solo non e' una domanda.** In questa sessione la misura ha corretto quattro cose che sembravano ovvie: chiedile all'autore e ti avrebbe risposto sbagliato in buona fede, perche' non ha i numeri.
3. **Scrivi la lista delle diramazioni** — le scelte che dipendono l'una dall'altra — e mettile in ordine: prima quelle che ne bloccano altre. Questa lista resta tua, non gliela mostri.

## Come si chiede

**Una domanda per messaggio. Sempre.** L'autore legge dal telefono: un elenco di sei domande e' illeggibile e riceve una risposta sola, quella dell'ultima.

Ogni domanda ha questa forma, e non altre:

> **La domanda**, in una riga, concreta. Mai "raccontami di piu'".
> **Cosa cambia** fra le risposte, in una riga: se non cambia niente, la domanda non va fatta.
> **Le strade**, due o tre, mai di piu'.
> **Quella che consiglio**, dichiarata, con il perche' in una riga.

Cosi' l'autore puo' rispondere "va bene" e la decisione e' chiusa lo stesso. Se dice "fai tu", **decidi tu**: e' una risposta, non un rinvio.

## Regole

- **Non passare al ramo dopo finche' quello prima non e' chiuso.** La ragione per cui A3 e A2 sono aperte da giorni e' che sono state aperte tutte insieme.
- **Massimo otto domande.** Se all'ottava non e' chiusa, non e' una decisione: e' una cosa da provare. Fermati, dillo, e costruisci la versione buttabile piu' piccola che risponde.
- **Se ti dice qualcosa di rischioso, contraddillo.** Una volta, con la ragione. Se lo ripete, e' deciso: si costruisce quello che ha detto lui, e nella scheda ci va anche la tua obiezione.
- **Non scrivere codice.** Nemmeno un file di configurazione. Questa skill parla e basta.
- **Non chiedere i numeri.** "Quanto deve costare la segheria" non e' una decisione di design: e' bilanciamento, e si misura.
- **Non chiedere cose che l'autore non puo' sapere.** Lui sa cosa vuole provare giocando; non sa cosa costa costruirlo. Il costo lo porti tu nella domanda.

## Come finisce

Scrivi la voce in `docs/DECISIONI.md`, in cima alle decise, con:

- **la data**
- **le parole esatte dell'autore** — riassumerle e' il modo in cui si perde l'informazione che conta
- **cosa ne consegue**, in due righe: cosa si costruisce e cosa non si costruisce piu'
- **cosa costa**, se cancella roba gia' fatta

Poi **togli la voce dalle aperte**, aggiorna `docs/ROADMAP.md` se sblocca un punto, e **commetti e spingi subito** (regola 3b del progetto: un commit locale non esiste).

Alla fine, come sempre: **"Cosa provare: ..."** — e se la decisione non si prova ancora nel gioco, dillo esplicitamente e indica il punto della roadmap che la rendera' visibile.

## Quando NON usarla

- Quando la richiesta e' gia' chiara: si esegue.
- Quando basta una domanda sola: falla e basta, senza cerimonia.
- Quando la decisione si puo' misurare: si misura.
- **Quando il gioco e' fermo.** Se da tre commit non si tocca `src/`, la risposta non e' un'altra griglia di domande. E' un pezzo di gioco che gira.
