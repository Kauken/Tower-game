# Come si lavora in questo progetto

Promemoria per l'autore. **Claude: se l'autore sembra perso o chiede "e adesso?", parti da qui.**

## Il ciclo, sempre uguale

1. Scrivi qui cosa vuoi (vedi sotto le tre forme).
2. Claude lavora, prova nel browser, e unisce su `main`.
3. Aspetti un paio di minuti e **apri il gioco sul telefono**.
4. Torni qui e dici com'è andata. Anche solo *"ok"* o *"non mi piace X"*.

**Il passo 3 non si salta.** Il progetto è morto sei volte per aver costruito tanto prima di provare.

## Le tre forme di richiesta

| Come si scrive | Cosa fa |
| --- | --- |
| **`/punto N`** | esegue il punto N di `docs/ROADMAP.md` |
| **`/richiesta`** + quello che vuoi, come ti viene | per le modifiche fuori roadmap: Claude la trasforma in specifica e aspetta il tuo ok |
| **"decidiamo la A1"** | apre una decisione aperta di `docs/DECISIONI.md` col consulente di design |

E se non sai cosa chiedere: **"a che punto siamo?"**

## Regole che proteggono il progetto

- **Una cosa per messaggio.** Due richieste = due messaggi.
- **Mai unire senza aver provato** (eccezione: sola documentazione).
- **I numeri si cambiano con l'agente bilanciatore**, mai *"già che ci sei"*.
- **Dopo i blocchi di verifica della roadmap ci si ferma e si gioca sul serio** prima di andare avanti. Sono segnati con 🛑 e non sono una formalità.

## I documenti, e a cosa servono

| File | Quando lo si apre |
| --- | --- |
| `GDD.md` | *cos'è* il gioco — comanda su tutto |
| `ROADMAP.md` | *cosa si fa dopo* |
| `MATERIALI.md` | i numeri, le ricette, il bilanciamento |
| `ARCHITETTURA.md` | *dove* si mettono le mani nel codice |
| `DECISIONI.md` | *perché* — e cosa è ancora da decidere |
| `HANDOFF.md` | dove siamo davvero adesso |

## Le due domande da farsi giocando

Se non sai cosa dire dopo aver provato, rispondi a queste:

1. **Guardando la bacheca dei progetti, ce n'è uno che vuoi?**
2. **Portare la roba a mano dà fastidio quel tanto che basta** da far desiderare un nastro — o è una noia che fa chiudere l'app?

Sono la verifica dei punti 6 e 11, e sono le sole due cose che decidono se questo gioco esiste.

## Tappe future fuori da qui (serve un computer)

- Impacchettamento Capacitor → app Android/iOS. Per iOS serve un Mac o un servizio di build in cloud.
- Account store: Google Play (una tantum), Apple Developer (annuale). Verificare gli importi al momento.
- Icone, schermate, informativa sulla privacy, schede degli store.

Quando la versione web sarà divertente e stabile, chiedi: **"prepariamo il piano per l'impacchettamento"**, e si aprirà quella fase con una roadmap dedicata.
