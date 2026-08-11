# Consegne — stato del progetto

Ultimo aggiornamento: 2026-08-11 (sera). Questo file fotografa dove siamo: chi riprende il lavoro parte da qui, poi approfondisce con `PROCESSO.md`, `ROADMAP.md`, `DECISIONI.md` e `GDD.md`.

## ⚠️ Il gioco è cambiato due volte l'11 agosto

Adesso è un **gestionale di fattoria con catene di produzione** (`GDD.md` v4.0, roadmap v8): **Stardew Valley** per il ciclo economico, **Minecraft moddato tecnico** per la scala di produzione, un pizzico di **RimWorld** per chi ci lavora.

**Non esistono più:** il tower defense (reclute, ondate, nemici, castello, torri, sentiero, postazioni) e la versione a puzzle durata un giorno solo (Filare, Rotazione, moltiplicatori di resa, appezzamenti). Se ne trovi traccia, sono resti da rimuovere.

## Cos'è il gioco

> **Semi → pianti → cresce → raccogli → vendi o consegni → compri semi migliori, attrezzi e lavorazioni → ricomincia più in grande.**

**La cosa che scarseggia sono i semi e i soldi, non lo spazio.** Piantare consuma un seme: all'inizio non puoi riempire il campo neanche volendo, e vendendo quel problema si scioglie da solo.

**Ogni sera la fattoria ha delle spese**, che crescono con le caselle arate. Quindi allargarsi è una scommessa, non un regalo. **Non si può perdere:** se non paghi, una casella torna incolta e riparti.

**La domanda che regge tutto:** *reinvesto adesso, o metto da parte perché stasera devo pagare?*

## Stato del codice

**Punti 1, 2 e 3 della roadmap FATTI.** C'è il ciclo economico completo: caselle incolte da dissodare, semi che si comprano e si consumano, colture che crescono e si raccolgono (e ricominciano), il mercato che compra e vende a prezzi che oscillano, il giorno che passa e le spese che si pagano a sera, col riepilogo.

Provato nel browser a 390×780, e i conti tornano esatti:

> 60 monete → semino 4 rape → raccolgo 8 rape → vendo a 16 l'una = **128** → 188 monete → compro un seme (−12) → 176 → sera **−18** → **158 monete, giorno 2**.

Il riepilogo di fine giornata compare e si chiude da solo. Nessun errore in console.

| File | Cosa fa |
| --- | --- |
| `src/game/config.js` | Legge `config/*.json` e verifica all'avvio che sia coerente |
| `src/game/griglia.js` | La geometria: indici, posizioni, vicini precalcolati |
| `src/game/fattoria.js` | Le caselle (incolto/arato/occupato), semi, magazzino, crescita, raccolta |
| `src/game/economia.js` | Monete, prezzi di mercato, vendite, costo del dissodare, spese |
| `src/game/giorno.js` | Il giorno che passa, la sera che si paga, il riepilogo |
| `src/game/disegno.js` | Disegno di colture, crescita, irrigazione e selezione |
| `src/game/sfondo.js` | Terreno e caselle; si rifà solo quando il campo cambia forma |
| `src/game/motore.js` | Ciclo a passo fisso, coda dei comandi, ponte con React |
| `src/ui/CampoDiGioco.jsx` | Monta i canvas, traduce il tocco in casella |
| `src/ui/Cruscotto.jsx` | Monete, giorno, spesa di stasera, quanto manca a sera |
| `src/ui/PannelloCasella.jsx` | Il foglio che sale: dissoda / semina / estirpa |
| `src/ui/Mercato.jsx` | Vendi il raccolto e compra semi, nello stesso posto |
| `src/ui/Riepilogo.jsx` | Il foglio di fine giornata |

| Configurazione | Cosa contiene |
| --- | --- |
| `config/griglia.json` | Area logica, colonne, righe, dimensione delle caselle |
| `config/contenuti.json` | Colture e terreni, col costo del seme; i materiali col prezzo base |
| `config/economia.json` | **Il cuore**: partenza, spese, costo del dissodare, oscillazione dei prezzi |
| `config/tempo.json` | Quanto dura un giorno, quanto resta il riepilogo |
| `config/vicinanze.json` | Ne è rimasta una: l'irrigazione |
| `config/motore.json` | Valori tecnici e di aspetto. Il bilanciatore non lo tocca |

## La prossima cosa da fare

**Fermarsi e provare.** C'è un blocco di verifica dopo il punto 3, e non è una formalità: il progetto è stato buttato sei volte per aver costruito il gioco intero prima di sapere se il pezzo centrale funzionava.

Le due domande a cui rispondere giocando:

1. **Alla fine di una giornata, hai voglia di farne un'altra?**
2. **Decidere cosa piantare è una decisione vera**, o c'è sempre un seme ovviamente migliore?

- Se va → **punto 4, le commesse**: la bacheca che chiede roba precisa, paga più del mercato e sblocca lavorazioni. È il "non vedo l'ora", ed è quello che rende viva la decisione *vendo o tengo da parte*.
- Se non va → non si aggiunge contenuto sopra: si risolve nei numeri di `config/economia.json` e `config/contenuti.json`, con l'agente `bilanciatore`.

## Un limite noto, da tenere d'occhio

Le colture regrowono senza riseminare, quindi **una volta che ti puoi permettere il Lino, il Lino è sempre la scelta migliore**. Adesso la decisione vera è un'altra — *dissodo un'altra casella o compro un seme più caro?* — e regge, ma la varietà di semina diventerà davvero interessante solo col punto 4 (commesse che chiedono roba precisa) e col punto 6 (lavorazioni che consumano un materiale specifico).

Il codice ha un controllo all'avvio contro la coltura dominante, ma copre solo il caso ovvio: seme, tempo e guadagno tutti migliori insieme.

## Cosa manca ancora (e non è un difetto)

Commesse, rocce e minerali, lavorazioni (Mulino, Forno), braccianti, macchine, eventi, stagioni, salvataggio. Sono tutti punti della roadmap dal 4 in poi: **arrivano dopo la verifica**, non prima.
