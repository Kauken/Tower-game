# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-11 (sera tardi). Chi riprende il lavoro parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco adesso è un'isola

`GDD.md` v5.0, roadmap v9. **Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene di produzione.

**Non esistono più:** il tower defense, il roguelike a stanze, la fattoria a scacchiera, il puzzle di vicinanze. Se ne trovi traccia sono resti da rimuovere.

## Le quattro regole che non si toccano

1. **NIENTE PERSONAGGIO DA GUIDARE.** Rifiutato **tre volte**. C'è un operaio sull'isola, ma non lo si muove: gli si danno ordini toccando le cose.
2. **LE TESSERE NON SI DEVONO VEDERE.** Niente bordi, mai; la variazione del terreno è una macchia tonda sfalsata.
3. **NIENTE MAGAZZINO CENTRALE.** Le risorse stanno dentro casse che hanno un posto. **La distanza deve costare.**
4. **UN OPERAIO SOLO, E NON SI ASSUME.** L'unica via di crescita è la **tecnologia**. Se ti viene voglia di risolvere un collo di bottiglia aggiungendo gente, hai sbagliato.

## Cos'è il gioco

Un'isola vista dall'alto. **Tocchi una cosa e dai un ordine**; il lavoro va in coda e **l'operaio** — uno solo — lo fa, una cosa per volta.

All'inizio fa tutto lui, piano. Poi arrivano gli attrezzi, poi le macchine, poi i nastri, finché la maggior parte del lavoro non la fa più lui. **È quello l'arco del gioco.**

Le zone si aprono **costruendo il passaggio**, e ognuna porta una materia prima e un ramo di lavorazioni. Il motore che non si spegne viene da Factorio: **la domanda deve crescere più in fretta della produzione.**

## Stato del codice

**Punti 1, 2 e 3 della roadmap FATTI.**

Provato nel browser a 390×780: ordino quattro alberi e l'operaio li fa **in fila**, si riempie lo zaino a 12, va a scaricare e torna. Al casotto vendo 16 legno per 48 monete, compro l'**Ascia affilata** per 120 (348 → 228), e il **Vivaio** passa da *"prima serve: Ascia affilata"* a comprabile. Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/mondo.js` | L'isola: fondo, risorse, **stato per tessera** (la ricrescita) |
| `src/game/camera.js` | Dove si guarda, il trascinamento, i due livelli di zoom |
| `src/game/lavori.js` | La coda degli ordini. Ha già i campi origine/destinazione per i nastri |
| `src/game/braccianti.js` | L'operaio: prende un lavoro, ci va, lo fa, riempie lo zaino, scarica |
| `src/game/tecnologie.js` | L'albero: cosa hai preso, cosa è disponibile, i moltiplicatori |
| `src/game/casse.js` | Dove finisce la roba. **Niente magazzino centrale** |
| `src/game/economia.js` | Monete, prezzi, vendere una cassa |
| `src/game/giorno.js` | Il giorno che passa e il riepilogo della sera |
| `src/game/disegno.js` | Disegna l'isola attraverso la telecamera |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/ui/` | Canvas, cruscotto, pannelli (operaio, cassa, tecnologie, costruzioni) |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/isola.json` | La mappa a caratteri, terreni, risorse, prezzi, telecamera |
| `config/braccianti.json` | L'operaio: velocità, zaino, dove comincia |
| `config/tecnologie.json` | **L'albero**: costi, effetti, cosa serve prima |
| `config/costruzioni.json` | Cosa si può costruire: per ora la cassa |
| `config/economia.json`, `config/tempo.json` | Monete di partenza, durata del giorno |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## Semplificazioni note, e non sono difetti

- **L'operaio va in linea retta** e attraversa gli alberi. È il punto 6.
- **Chiudere la pagina cancella tutto.** È il punto 5.
- **Non c'è ancora una vera pressione.** I salari sono caduti col passaggio a un operaio solo; le commesse arrivano al punto 4.
- **I massi non ricrescono**, e sono otto: dopo, la pietra arriva solo aprendo la cava.

## La prossima cosa da fare

**Fermarsi e provare.** Due domande:

1. **Guardando le tecnologie, ce n'è una che vuoi?**
2. **Si sente che l'operaio è uno solo?** Guardarlo fare una cosa per volta deve far venire voglia di un'**ascia migliore**, non di un secondo operaio.

Poi il **punto 4, le commesse** — la pressione che manca.

## Il muro architetturale, nominato prima di sbatterci

L'autore ha chiesto di non arrivare a un punto in cui *"per fare questo dobbiamo modificare la base"*. La risposta sta in `GDD.md` §6 e §6b, e si riassume così:

> **"1 legno diventa 3 legno" rompe il gioco.** Rimetti l'uscita in entrata e hai legno infinito. La regola è: **una lavorazione non produce mai il materiale che consuma** — 1 tronco → 3 *tavole*, e le tavole non rientrano nella segheria. Va messa come controllo all'avvio, al punto 8.

Per il resto la base regge: le tessere hanno uno stato, le casse sono contenitori generici, i mestieri e i materiali sono dati. **L'unica cosa da cambiare è piccola e va fatta prima dei nastri:** un lavoro deve poter avere un'origine e una destinazione, non solo una tessera.

