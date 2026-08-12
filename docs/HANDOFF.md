# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-11 (sera tardi). Chi riprende il lavoro parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco adesso è un'isola

`GDD.md` v5.0, roadmap v9. **Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene di produzione.

**Non esistono più:** il tower defense, il roguelike a stanze, la fattoria a scacchiera, il puzzle di vicinanze. Se ne trovi traccia sono resti da rimuovere.

## Le tre regole che non si toccano

1. **NIENTE PERSONAGGIO DA MUOVERE.** L'autore l'ha rifiutato **tre volte in tre versioni diverse**. Il giocatore non è dentro lo schermo: è sopra, e comanda col dito.
2. **LE TESSERE NON SI DEVONO VEDERE.** Il mondo è a tessere — come Factorio, che è una griglia e non sembra una scacchiera — ma niente bordi, mai, e la variazione del terreno è una macchia tonda sfalsata, non un quadrato più chiaro.
3. **NIENTE MAGAZZINO CENTRALE.** Le risorse stanno dentro casse che hanno un posto; qualcuno le deve portare. **La distanza deve costare**, ed è la ragione per cui i nastri serviranno.

## Cos'è il gioco

Un'isola vista dall'alto. **Tocchi una cosa e dai un ordine**; il lavoro va in coda e un bracciante libero lo prende. Ogni bracciante fa **un mestiere solo** e si paga ogni giorno.

Le zone si aprono **costruendo il passaggio** (sgomberare la frana, riparare il pontile, costruire la barca), e ognuna porta una materia prima e un ramo di lavorazioni.

Il motore che non si spegne viene da Factorio: **la domanda deve crescere più in fretta della produzione.** E la gioia vera del genere è vedere la catena girare da sola mentre guardi da un'altra parte.

## Stato del codice

**Punti 1 e 2 della roadmap FATTI.** La verifica dopo il punto 1 è **passata**: *"va bene, sembra un posto"* e *"funziona, si capisce tutto"*.

Provato nel browser a 390×780. Il pezzo che conta, verificato in modo netto:

> Assegno al **cavatore** una cassa costruita accanto ai massi, gli ordino quattro massi, e aspetto.
> **Cassa accanto ai massi: 9/120, Pietra 9.** **Casotto: 4/200, Legno 4.**
> La pietra è finita nella cassa che gli ho detto io, non in un contatore. E i 12 legno erano diventati 4 perché costruire la cassa ne ha spesi 8 **davvero, presi dalle casse**.

Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/mondo.js` | L'isola: fondo, risorse, cosa è calpestabile, le macchie del terreno |
| `src/game/camera.js` | Dove si guarda, il trascinamento, i due livelli di zoom, i limiti |
| `src/game/lavori.js` | La coda degli ordini: chi li può prendere, come si annullano |
| `src/game/braccianti.js` | Chi lavora: prende un lavoro, ci va, lo fa, riempie lo zaino, va a scaricare |
| `src/game/casse.js` | Dove finisce la roba. **Niente magazzino centrale:** ogni cassa ha un posto |
| `src/game/disegno.js` | Disegna l'isola attraverso la telecamera, solo le tessere visibili |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/ui/CampoDiGioco.jsx` | Il canvas, e il dito che distingue tocco da trascinamento |
| `src/ui/Cruscotto.jsx` | Il totale in tutte le casse e quanti braccianti stanno lavorando |
| `src/ui/Pannelli.jsx` | I fogli: bracciante (con *Dove scarica*), cassa, costruzioni, avvisi |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/isola.json` | La mappa disegnata a caratteri, i terreni, le risorse, la telecamera |
| `config/braccianti.json` | Mestieri, velocità, **zaino**, salari, chi c'è all'inizio |
| `config/costruzioni.json` | Cosa si può costruire: per ora la cassa, col suo costo |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## Semplificazioni note, e non sono difetti

- **I braccianti vanno in linea retta** e attraversano gli alberi. Sull'isola aperta non si nota; il percorso vero è il punto 11.
- **Nessuno paga nessuno**: i salari sono in configurazione ma non li legge nessuno. È il punto 3.
- **Una cassa piena** fa ripiegare il bracciante sulla più vicina con spazio invece di bloccarlo.
- **I fogli in basso coprono un pezzo di mappa.** Si chiudono, ma se dà fastidio va rivisto.

## La prossima cosa da fare

**Fermarsi e provare.** C'è un blocco di verifica dopo il punto 1, e conta doppio: questa versione è la più grande di tutte, e il progetto è già stato buttato sette volte per aver costruito troppo prima di verificare.

La verifica del punto 2 è **passata**: *"perfetto funziona"*.

**Adesso il gioco non ha ancora una ragione per esistere:** tagli alberi perché puoi. I prossimi due punti, e solo quelli, lo trasformano in un gioco.

- **Punto 3 — il giorno e i salari.** La pressione. A sera si paga chi hai assunto, e assumere diventa una scommessa.
- **Punto 4 — le commesse.** Il desiderio. Qualcuno ti chiede roba precisa e paga molto più del mercato: è la prima volta che il legno serve a qualcosa.

Poi la **Fase C**, tre fondamenta che costano il triplo se si rimandano: il **salvataggio** (spostato dal 15° posto: senza, nessuno gioca abbastanza a lungo da poter giudicare), il **percorso vero** (spostato dall'11°: rifare i nastri dopo costa di più), e la **simulazione headless** (questo gioco è una questione di portata, e senza misura si tira a indovinare).

Il perché di ogni spostamento è in fondo a `ROADMAP.md`.
