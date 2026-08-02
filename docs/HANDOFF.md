# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-02. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## Cos'è il gioco adesso

**Roguelike a due fasi** (GDD v0.4): esplorazione di stanze alla Binding of Isaac che alimenta una **guerra d'assedio** fra due castelli. Le versioni precedenti — tower defense a labirinto, poi battaglia a corsie — non esistono più.

Di queste due fasi **esiste solo l'assedio**. L'esplorazione è tutta da costruire (punti 2-5 della roadmap).

Com'è fatto l'assedio oggi:

- **Campo aperto** largo quanto lo schermo: castello nemico in alto, il tuo in basso, entrambi con la vita.
- I **Militi** (verdi) salgono, i **Fanti** (rossi) scendono, sparpagliati su tutta la larghezza; si attirano di lato e si scontrano su un fronte irregolare. Chi sfonda toglie vita al castello avversario.
- Il **personaggio** (cerchio chiaro) si muove con la levetta a pollice e attacca da solo il nemico più vicino. Ha vita, i nemici lo attaccano, a zero viene **abbattuto** e si riforma al castello mentre l'esercito continua senza di lui.
- **Pressione continua**: nessun pulsante, i due castelli producono di continuo e la pressione nemica sale col tempo, con **spinte** periodiche.
- Vittoria = cade il castello nemico; sconfitta = cade il tuo.

**Non esistono più**: torri, caselle di piazzamento, negozio, pulsante ondata. Le 4 Torri tornano al punto 6 come strutture del campo **da conquistare**, non da comprare.

## Motore di gioco: si resta sul web

Valutato e deciso il 2026-08 (`DECISIONI.md`): niente Godot per ora. Il motivo che pesa più di tutti è che oggi l'autore prova il gioco aprendo un link dal telefono, e con Godot dovrebbe installare un pacchetto a ogni giro. Da rivedere al punto 17. Se il problema diventa la densità di nemici, la mossa giusta è sostituire il disegno con PixiJS/WebGL — la logica è già separata dal disegno — non cambiare motore.

## Il perno del design (da non perdere di vista)

Il pericolo non è l'accerchiamento casuale alla Vampire Survivors: è **sbilanciarsi in avanti**. La profondità sul campo è la manopola di rischio, e siccome il fronte si muove la zona sicura cambia da sola. Spiegato per esteso in `GDD.md` §2.4. Ogni scelta futura va misurata su questo.

E la regola che tiene insieme le due fasi: **ogni oggetto deve avere un effetto anche sull'esercito**, non solo sul personaggio.

## Stato del codice

- **Roadmap v4: punti 1 e 2 FATTI.** Tutto è su `main` e pubblicato: https://kauken.github.io/Tower-game/
- Ramo di lavoro: `claude/torre-guardia-scaffold-5fv3nl`, riallineato a `main`.
- `npm run build` passa. Collaudo del campo aperto: nessun bloccante; i residui segnalati sono stati rimossi.
- **Il bilanciamento non è mai stato fatto sul campo aperto.** I valori attuali (vita castelli 70, ritmi di uscita, vita personaggio 100, tempo di riforma) sono messi a occhio perché il gioco fosse provabile. Serve un giro dell'agente `bilanciatore`.
- **Le prestazioni non sono state rimisurate** dopo il passaggio a campo aperto. Da far guardare a `revisore-mobile`.

## Architettura in due righe

Motore su canvas 2D (`src/game/`), React solo per l'interfaccia (`src/ui/`), comunicazione a campionamento (10 Hz) e coda comandi; la levetta scrive invece diretta, perché è uno stato continuo. Tutti i numeri in `config/*.json` — regola non negoziabile.

| File | Cosa fa |
| --- | --- |
| `src/game/motore.js` | Ciclo a passo fisso, disegno, ponte con React |
| `src/game/truppe.js` | I due eserciti: movimento a campo aperto e combattimento |
| `src/game/personaggio.js` | Il giocatore: movimento, attacco automatico, abbattimento |
| `src/game/pressione.js` | Quante truppe escono e quando |
| `src/ui/Levetta.jsx` | La levetta a pollice |
| `config/mappe.json` | Bordi del campo e schieramento |
| `config/pressione.json` | Ritmo dell'assedio |

## In attesa di verdetto dell'autore

Ha provato il personaggio e gli è piaciuto muoverlo. Deve ancora giocare il **campo aperto** e dire:
1. Spingersi in avanti fa davvero paura?
2. Il campo è troppo vuoto o troppo pieno?
3. Si capisce quando il fronte si sposta?

## Prossime mosse previste

La roadmap è stata **riordinata (v4)**: prima si rende divertente l'assedio da solo (Fase A), poi si costruisce il dungeon attorno. Motivo: la promessa del gioco — gli oggetti trasformano l'esercito — non è mai stata provata, e costruire dieci stanze prima di saperlo significherebbe scoprirlo tardi.

1. **Punto 3**: le abilità attive sui pulsanti del pollice destro.
2. **Punto 4**: le carte, 3 e ne scegli 1. È il punto che decide se il gioco è un gioco.
3. **Punto 5**: le 4 Torri da conquistare. Tocca la **decisione aperta 2** (come si conquista una Torre), da chiudere prima col consulente-design.
4. Dopo il punto 7: **verifica obbligatoria** — viene voglia di rigiocare? Il dungeon si costruisce solo se la risposta è sì.

## Problemi noti e suggerimenti accantonati (nessuno urgente)

- **L'oro si accumula ma non si vede e non si spende**: i popup "+4" volano via e il cruscotto non lo mostra, perché non c'è più niente da comprare. Va deciso quando esisterà il negozio.
- **Il tetto dei pool taglia la pressione**: `nemici_massimi: 150`. In stallo a metà campo i nemici si accumulano, la generazione esce in silenzio e la pressione crescente smette di crescere davvero.
- **Costo di ricerca del bersaglio**: una truppa senza bersaglio riscandaglia l'intero pool avversario a ogni passo. Da far guardare a `revisore-mobile` se su telefono si sente.
- Le **spinte arrivano senza preavviso**: non c'è nulla a schermo che le annunci.
- 3 nemici su 4 (`ratto_nero`, `golem_di_pietra`, `sciame_di_goblin`) sono definiti ma mai usati: materiale per dopo.
- `fontWeight` e spessori bordo scritti a mano nei componenti `src/ui/` (regola 1 in senso stretto: andrebbero in `motore.json → interfaccia`).
- `index.html` duplica a mano due colori di `motore.json` (`#0d0f14`, `#e8e3d5`): se si cambiano in config, l'HTML resta indietro.
- In orizzontale il campo diventa minuscolo: prima o poi va bloccato il verticale.
- `config/potenziamenti.json` e `config/sinergie.json` non sono ancora letti da nessuno: servono al punto 4.

## Grafica: piano concordato

Adesso grafica procedurale su canvas (forme, colori), da migliorare con l'agente `rifinitore`. Gli sprite veri arrivano dopo che il gioco è divertente: pacchetto consigliato Kenney "Tower Defense Top-Down" (CC0). **Nota tecnica**: da questo ambiente non si possono scaricare i siti di asset (rete ristretta) — l'autore dovrà allegare lo zip in chat, poi si integra.

## Come si lavora (promemoria)

- `/punto N` → esegue il punto N della roadmap col protocollo completo.
- `/richiesta` + testo libero → trasforma in specifica e aspetta conferma.
- "decidiamo la N" → apre la voce N di `DECISIONI.md` col consulente-design.
- Ogni fine lavoro: agente `collaudo`, punto segnato FATTO, resoconto con "Cosa provare".
- L'autore non programma e lavora dal telefono: italiano pratico, niente gergo, un lavoro alla volta.
