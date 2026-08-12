# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-12 (sera). Chi riprende il lavoro parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco adesso è un'isola

`GDD.md` v5.1, roadmap v11. **Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene di produzione.

**Non esistono più:** il tower defense, il roguelike a stanze, la fattoria a scacchiera, il puzzle di vicinanze. Se ne trovi traccia sono resti da rimuovere.

## Le cinque regole che non si toccano

1. **NIENTE PERSONAGGIO DA GUIDARE.** Rifiutato **tre volte**. C'è un operaio sull'isola, ma non lo si muove: gli si danno ordini toccando le cose.
2. **LE TESSERE NON SI DEVONO VEDERE.** Niente bordi, mai; la variazione del terreno è una macchia tonda sfalsata.
3. **NIENTE MAGAZZINO CENTRALE.** Le risorse stanno dentro casse che hanno un posto. **La distanza deve costare.**
4. **UN OPERAIO SOLO, E NON SI ASSUME.** L'unica via di crescita è la **tecnologia**. Se ti viene voglia di risolvere un collo di bottiglia aggiungendo gente, hai sbagliato.
5. **NIENTE SI SPOSTA DA SOLO, NIENTE RICRESCE DA SOLO.** Nessuno scarico automatico, nessuna cassa assegnata, nessun totale dell'isola, nessun albero che torna da sé. **Un'automazione vale quanto la fatica che toglie:** se aggiungi una comodità adesso, stai svuotando uno sblocco futuro.

## Cos'è il gioco

Un'isola vista dall'alto. **Tocchi una cosa e dai un ordine**; il lavoro va in coda e **l'operaio** — uno solo — lo fa, una cosa per volta.

All'inizio fa tutto lui, piano — **compreso portare la roba a mano**, con uno zaino a caselle che si riempie in circa sette alberi. Poi arrivano gli attrezzi, poi le macchine, poi i nastri, finché la maggior parte del lavoro non la fa più lui. **È quello l'arco del gioco**, ed è l'arco di Satisfactory: mano → attrezzo che accumula ma non si collega → macchina fissa col nastro.

Le zone si aprono **costruendo il passaggio**, e ognuna porta una materia prima e un ramo di lavorazioni. Il motore che non si spegne viene da Factorio: **la domanda deve crescere più in fretta della produzione.**

## Stato del codice

**Punti 1, 2, 3 e 3c della roadmap FATTI.**

Provato nel browser a 390×780, tutto il giro: ordino otto alberi e l'operaio li fa **in fila**; nello zaino finiscono 32 legno e 8 alberelli in quattro caselle (12, 8, 12, 8). Ordino un masso e **non parte** — il cruscotto scrive *zaino pieno* in giallo. Tocco la terra libera e pianta un alberello (8 → 7). Costruisco una cassa: si paga con gli 8 legno che ha **addosso**, si libera una casella, e riparte da solo per il masso. Apro il casotto, *Posa tutto*, e la roba ci finisce dentro (4/18 caselle). Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/mondo.js` | L'isola: fondo, risorse, **stato per tessera** (gli alberelli che crescono) |
| `src/game/inventario.js` | **Le caselle con le pile.** Lo usano l'operaio *e* le casse |
| `src/game/camera.js` | Dove si guarda, il trascinamento, i due livelli di zoom |
| `src/game/lavori.js` | La coda degli ordini: raccogli, pianta, posa, prendi. Ha già i campi origine/destinazione per i nastri |
| `src/game/braccianti.js` | L'operaio: prende un lavoro, ci va, lo fa. **Con lo zaino pieno si ferma** |
| `src/game/tecnologie.js` | L'albero: cosa hai preso, cosa è disponibile, i moltiplicatori |
| `src/game/casse.js` | Dove finisce la roba. **Niente magazzino centrale** |
| `src/game/economia.js` | Monete, prezzi, vendere una cassa |
| `src/game/giorno.js` | Il giorno che passa e il riepilogo della sera |
| `src/game/disegno.js` | Disegna l'isola attraverso la telecamera |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/ui/Zaino.jsx` | La fila di caselle sotto il cruscotto, e le caselle dei pannelli |
| `src/ui/` | Canvas, cruscotto, pannelli (operaio, cassa, tecnologie, costruzioni) |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/isola.json` | La mappa a caratteri, terreni, risorse, prezzi, telecamera |
| `config/braccianti.json` | L'operaio: velocità, **caselle dello zaino**, tempi, dove comincia |
| `config/tecnologie.json` | **L'albero**: costi, effetti, cosa serve prima |
| `config/costruzioni.json` | Cosa si può costruire: per ora la cassa |
| `config/economia.json`, `config/tempo.json` | Monete di partenza, durata del giorno |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## Semplificazioni note, e non sono difetti

- **L'operaio va in linea retta** e attraversa gli alberi. È il punto 6.
- **Chiudere la pagina cancella tutto.** È il punto 5.
- **Non c'è ancora una vera pressione.** I salari sono caduti col passaggio a un operaio solo; le commesse arrivano al punto 4.
- **I massi non tornano**, e sono otto: dopo, la pietra arriva solo aprendo la cava.
- **I numeri delle caselle e delle pile non sono misurati.** Quattro caselle, pile da 12/10/8, circa sette alberi per viaggio: ragionati, non provati con la simulazione. Primo lavoro del bilanciatore dopo il punto 7.
- **Si vedono delle righe leggerissime fra le tessere** in alcune zone d'erba. È **precedente** a questo lavoro (il disegno del terreno non è stato toccato) ma tocca la regola 2, quindi va guardato: probabilmente sono le macchie tonde di tessere vicine che si allineano per caso.

## La prossima cosa da fare

**Fermarsi e provare.** Tre domande, e la terza è nuova:

1. **Guardando le tecnologie, ce n'è una che vuoi?**
2. **Si sente che l'operaio è uno solo?** Guardarlo fare una cosa per volta deve far venire voglia di un'**ascia migliore**, non di un secondo operaio.
3. **Portare la roba a mano dà fastidio quel tanto che basta?** Deve essere una scocciatura che fa desiderare un nastro — non una noia che fa chiudere l'app. Se è troppo, si allargano le pile in `isola.json`; se non si sente per niente, si stringono.

Poi il **punto 4, le commesse** — la pressione che manca.

## Il muro architetturale, nominato prima di sbatterci

L'autore ha chiesto di non arrivare a un punto in cui *"per fare questo dobbiamo modificare la base"*. La risposta sta in `GDD.md` §6 e §6b, e si riassume così:

> **"1 legno diventa 3 legno" rompe il gioco.** Rimetti l'uscita in entrata e hai legno infinito. La regola è: **una lavorazione non produce mai il materiale che consuma** — 1 tronco → 3 *tavole*, e le tavole non rientrano nella segheria. Va messa come controllo all'avvio, al punto 8.

Per il resto la base regge: le tessere hanno uno stato, le casse sono contenitori generici, i mestieri e i materiali sono dati. **L'unica cosa da cambiare è piccola e va fatta prima dei nastri:** un lavoro deve poter avere un'origine e una destinazione, non solo una tessera. I campi ci sono già in `lavori.js`; con *posa* e *prendi* si usa già la tessera della cassa come bersaglio, quindi manca solo far convivere le due nello stesso lavoro.

