# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-11 (sera tardi). Chi riprende il lavoro parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco adesso è un'isola

`GDD.md` v5.0, roadmap v9. **Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene di produzione.

**Non esistono più:** il tower defense, il roguelike a stanze, la fattoria a scacchiera, il puzzle di vicinanze. Se ne trovi traccia sono resti da rimuovere.

## Le due regole che non si toccano

1. **NIENTE PERSONAGGIO DA MUOVERE.** L'autore l'ha rifiutato **tre volte in tre versioni diverse**. Il giocatore non è dentro lo schermo: è sopra, e comanda col dito.
2. **LE TESSERE NON SI DEVONO VEDERE.** Il mondo è a tessere — come Factorio, che è una griglia e non sembra una scacchiera — ma niente bordi, mai, e la variazione del terreno è una macchia tonda sfalsata, non un quadrato più chiaro.

## Cos'è il gioco

Un'isola vista dall'alto. **Tocchi una cosa e dai un ordine**; il lavoro va in coda e un bracciante libero lo prende. Ogni bracciante fa **un mestiere solo** e si paga ogni giorno.

Le zone si aprono **costruendo il passaggio** (sgomberare la frana, riparare il pontile, costruire la barca), e ognuna porta una materia prima e un ramo di lavorazioni.

Il motore che non si spegne viene da Factorio: **la domanda deve crescere più in fretta della produzione.** E la gioia vera del genere è vedere la catena girare da sola mentre guardi da un'altra parte.

## Stato del codice

**Punto 1 della roadmap FATTO.**

Provato nel browser a 390×780: si ordina l'abbattimento di tre alberi e la rottura di un masso, i due braccianti ci vanno, lavorano, e arrivano **12 legno e 3 pietra** (3×4 e 1×3, esatti). Toccare di nuovo una cosa già ordinata annulla l'ordine. Trascinare sposta la mappa e **non** dà ordini. Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/mondo.js` | L'isola: fondo, risorse, cosa è calpestabile, le macchie del terreno |
| `src/game/camera.js` | Dove si guarda, il trascinamento, i due livelli di zoom, i limiti |
| `src/game/lavori.js` | La coda degli ordini: chi li può prendere, come si annullano |
| `src/game/braccianti.js` | Chi lavora: prende un lavoro, ci va, lo fa, torna fermo |
| `src/game/disegno.js` | Disegna l'isola attraverso la telecamera, solo le tessere visibili |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/ui/CampoDiGioco.jsx` | Il canvas, e il dito che distingue tocco da trascinamento |
| `src/ui/Cruscotto.jsx` | Magazzino e quanti braccianti stanno lavorando |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/isola.json` | La mappa disegnata a caratteri, i terreni, le risorse, la telecamera |
| `config/braccianti.json` | Mestieri, velocità, salari, chi c'è all'inizio |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## Semplificazioni note, e non sono difetti

- **I braccianti vanno in linea retta** e attraversano gli alberi. Sull'isola aperta non si nota; il percorso vero è il punto 11.
- **La resa compare in magazzino appena il lavoro finisce**, senza essere portata al casotto. È il punto 2.
- **Nessuno paga nessuno**: i salari sono in configurazione ma non li legge nessuno. È il punto 3.

## La prossima cosa da fare

**Fermarsi e provare.** C'è un blocco di verifica dopo il punto 1, e conta doppio: questa versione è la più grande di tutte, e il progetto è già stato buttato sette volte per aver costruito troppo prima di verificare.

La domanda: **guardare l'isola e comandarla col dito è piacevole?** Il trascinamento è naturale? Si capisce sempre cosa hai ordinato e chi ci sta andando?

- Se va → **punto 2**: il magazzino ha un posto, e la roba ci viene portata. È il primo pezzo di logistica e la ragione per cui più avanti serve un portatore.
- Se non va → si risolve nel disegno e nel comando, non aggiungendo contenuto sopra.
