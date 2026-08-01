# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-01. Questo file fotografa dove siamo: chi riprende il lavoro (una nuova sessione di Claude o l'autore che torna dopo tempo) parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## Cos'è il gioco adesso

**Battaglia a corsie roguelike** (pivot deciso dall'autore il 2026-08, GDD v0.3 — il tower defense a labirinto delle versioni precedenti non esiste più):

- Corsia verticale: fortezza nemica in alto, quella del giocatore in basso, entrambe con la vita.
- I **Militi** (verdi) del giocatore salgono, i **Fanti** (rossi) scendono; si ingaggiano e combattono al fronte; chi sfonda toglie vita alla fortezza avversaria.
- 4 caselle torre solo nella metà bassa (2 normali, 1 altura +raggio, 1 mana +cadenza); 4 torri: Balestriere, Catapulta (area), Cappella del Gelo (rallenta), Obelisco (aura +danno).
- Vittoria = cade la fortezza nemica; sconfitta = cade la tua. Assalti chiamati dal giocatore, crescono senza fine.

## Stato del codice

- **Roadmap v2, punto 1 FATTO.** Tutto è su `main` e pubblicato: https://kauken.github.io/Tower-game/
- Ramo di lavoro: `claude/torre-guardia-scaffold-5fv3nl`, riallineato a `main`.
- `npm run build` passa. Collaudo dell'intero pivot: OK, nessun bloccante.
- Prestazioni misurate: 0,13 ms per passo di simulazione col campo pieno (250 truppe). Memoria piatta, tutto da pool preallocati.
- Bilanciamento verificato in simulazione: senza torri sconfitta all'assalto 4; con 2 Balestrieri piazzati bene vittoria al 7; piazzati male si perde. Assalto tipo: 15-25 secondi.

## Architettura in due righe

Motore su canvas 2D (`src/game/`), React solo per l'interfaccia (`src/ui/`), comunicazione a campionamento (10 Hz) e coda comandi. Tutti i numeri in `config/*.json` — regola non negoziabile. File chiave: `truppe.js` (i due eserciti), `motore.js` (ciclo a passo fisso), `torri.js`, `ondate.js`, `partita.js`, `effetti.js`.

## In attesa di verdetto dell'autore

L'autore deve ancora **giocare il pivot sul telefono** e dire:
1. Lo scontro al fronte si legge bene?
2. È divertente o ci si annoia? (LA domanda del pivot)
3. Il pannello compatto lascia vedere il campo?

## Prossime mosse previste

1. **Punto 2 della roadmap**: abilità attiva "Carica!" con ricarica — le mani del giocatore nella battaglia.
2. **Punto 3**: negozio di fine assalto (con vendita torri al 60%, già decisa) + schermata "3 carte, ne scegli 1". Tocca la **decisione aperta 1** (destino dei moduli): va chiusa prima, con l'agente consulente-design.
3. Dopo il punto 3: **tappa obbligatoria di gioco vero** prima di proseguire.

## Problemi noti e suggerimenti accantonati (nessuno urgente)

- Due torri vicine sprecano colpi sullo stesso bersaglio morente: serve una regola anti-doppio-bersaglio in `src/game/truppe.js` (`bersaglioPiuAvanti`). Rende il bilanciamento meno "a filo di lama".
- `fontWeight` e spessori bordo scritti a mano nei componenti `src/ui/` (regola 1 in senso stretto: andrebbero in `motore.json → interfaccia`).
- `index.html` duplica a mano due colori di `motore.json` (`#0d0f14`, `#e8e3d5`): se si cambiano in config, l'HTML resta indietro.
- In orizzontale la mappa diventa minuscola: prima o poi va bloccato il verticale.
- `economia.json`: i blocchi `cristalli` e `mercante` non sono ancora letti dal codice (roadmap punti 9 e 11, voluto).

## Grafica: piano concordato

Adesso grafica procedurale su canvas (forme, colori), da migliorare con l'agente `rifinitore`. Gli sprite veri arrivano dopo che il gioco è divertente: pacchetto consigliato Kenney "Tower Defense Top-Down" (CC0). **Nota tecnica**: da questo ambiente non si possono scaricare i siti di asset (rete ristretta) — l'autore dovrà allegare lo zip in chat, poi si integra.

## Come si lavora (promemoria)

- `/punto N` → esegue il punto N della roadmap col protocollo completo.
- `/richiesta` + testo libero → trasforma in specifica e aspetta conferma.
- "decidiamo la N" → apre la voce N di `DECISIONI.md` col consulente-design.
- Ogni fine lavoro: agente `collaudo`, punto segnato FATTO, resoconto con "Cosa provare".
- L'autore non programma e lavora dal telefono: italiano pratico, niente gergo, un lavoro alla volta.
