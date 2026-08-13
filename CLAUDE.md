# Istruzioni permanenti

**Un'isola da mandare avanti.** Vista dall'alto, si comanda col dito, e ci lavora **un operaio solo**. Fantasy industriale, per telefono, in verticale. Web (Vite + React + canvas 2D), poi impacchettato con Capacitor.

Il documento di design è `docs/GDD.md` (v6.0): **leggilo prima di qualunque modifica al gioco.** I numeri e le ricette stanno in `docs/MATERIALI.md`. Dove mettere le mani nel codice sta in `docs/ARCHITETTURA.md`.

## La frase che decide tutto

> ### La risorsa scarsa è il **tempo dell'operaio**.

C'è un operaio solo e non se ne assumono altri. Ogni cosa nel gioco si misura in una valuta sola: **quanti secondi del suo tempo costa, e quanti gliene restituisce.** Un'ascia migliore, una cassa vicina, una trivella, un nastro, un'isola nuova — sono tutte la stessa domanda.

**Se una decisione non si può giudicare con questa frase, quella decisione è fuori posto.** Dillo invece di costruirla.

## Il progetto è stato riscritto sei volte

Valgono **solo** `GDD.md` v6.0 e `ROADMAP.md` v12. Se trovi tracce di queste cose, sono macerie da rimuovere, **non funzionalità**:

> tower defense · reclute · ondate · castello · torri da piazzare · sentiero · roguelike a stanze · personaggio che si muove con la levetta · seguito di minion · corsie · fattoria a scacchiera · puzzle di vicinanze · salari · assunzioni · il ciclo del giorno

## Con chi stai lavorando

L'autore **non sa programmare** e lavora **dal telefono**. Quindi:

- Spiega in italiano, in modo pratico, cosa hai fatto e cosa deve provare.
- Niente gergo inutile. Se un termine tecnico serve, spiegalo in mezza riga.
- Alla fine di ogni intervento scrivi sempre **"Cosa provare: ..."** con l'azione concreta da fare nel gioco, passo per passo.
- E poi **qual è la mossa successiva più sensata**, perché non ha un'altra chat da cui farsi consigliare.
- Quando dice *"sembra una scacchiera"*, *"è spento"*, *"non si capisce"*, sta parlando **dell'aspetto** — non necessariamente della meccanica sotto. Chiarisci quale dei due prima di riscrivere un sistema.

## Le regole non negoziabili

### Come si lavora

1. **Nessun numero nel codice.** Costi, danni, tempi, rese, raggi, curve: tutto in `config/*.json`. Se ti serve un valore nuovo, aggiungilo alla configurazione.
2. **Un sistema alla volta.** Fai solo quello che è stato chiesto. Se noti qualcosa che manca, scrivilo alla fine come suggerimento separato.
3. **Prima di dichiarare finito**, esegui `npm run build`. Se fallisce, non hai finito. E per qualunque cosa si veda a schermo, **provala davvero nel browser** prima di dire che funziona.
4. **Non toccare i valori di bilanciamento** di tua iniziativa quando ti viene chiesta una funzionalità. Bilanciare è un compito separato, con il suo agente e il suo documento.
5. **"Fai il punto N"** significa il punto N di `docs/ROADMAP.md`: a lavoro finito segnalo come **FATTO** lì.
6. **Una configurazione incoerente deve fermare il gioco all'avvio** con un errore in italiano che si capisce. Non un'isola vuota e muta. È il modo di questo progetto per non far sopravvivere gli errori.

### Come è fatto il gioco

7. **Il campo di gioco è un solo `<canvas>`.** Terreno, risorse, macchine, operaio ed effetti si disegnano lì. React serve solo per l'interfaccia sopra. **Mai un elemento DOM per un'entità di gioco.**
8. **Mobile prima di tutto.** Verticale, aree toccabili di almeno 44 px, niente `:hover`, niente doppio click, rispetto delle safe area. Le informazioni in alto, i comandi in basso: il pollice arriva prima in basso.
9. **NIENTE PERSONAGGIO DA MUOVERE.** Rifiutato **tre volte** in tre versioni. Il giocatore non è dentro lo schermo: è sopra, e comanda col dito.
10. **C'È UN OPERAIO SOLO, e non si assume.** L'unica via di crescita è la tecnologia. Se ti viene voglia di risolvere un collo di bottiglia aggiungendo gente, hai sbagliato.
11. **Le tessere non si devono vedere.** Niente bordi, mai; la variazione del terreno è una macchia tonda sfalsata, non un quadrato più chiaro. Unica eccezione: la tessera sotto il dito si illumina **solo mentre hai qualcosa in mano**.
12. **NIENTE MAGAZZINO CENTRALE — all'inizio.** Le risorse stanno dentro contenitori che hanno un posto, e qualcuno le deve portare. Niente totale dell'isola, nemmeno scritto in alto: **la distanza deve costare**. *Unica eccezione, ed è a fine gioco: il **terminale** (punto 18), una rete da cui vedi e prendi tutto. È un magazzino centrale ed è voluto — funziona solo perché prima hai passato ore a girare fra le casse. Regalato all'inizio non varrebbe niente.*

### Come si aggiunge roba senza rovinare il gioco

13. **Niente si sposta da solo e niente ricresce da solo.** Ogni comodità va **guadagnata** con l'automazione, mai regalata. La regola dietro: **un'automazione vale quanto la fatica che toglie** — se il problema non è mai esistito, la macchina che lo risolve è un gadget. Prima di aggiungere una comodità, chiediti **quale sblocco futuro stai svuotando**.
14. **Niente parte se non l'hai preso in mano.** Un tocco sul terreno vuoto, a mani vuote, non fa niente. Un'azione che parte senza che il giocatore l'abbia scelta è sempre sbagliata.
15. **Uno sblocco dà un verbo nuovo, o restituisce tempo in modo che si senta.** Un +5% non merita di stare in bacheca.
15b. **UN GRADINO NON È UN NUMERO PIÙ GRANDE: È UNA DOMANDA CHE SPARISCE DALLA TESTA.** Il gioco è fatto di **scale** (`GDD.md` §11b): corrente, magazzino, lavorazione, estrazione. Ogni gradino deve togliere una domanda che il giocatore si stava facendo — *"in quale cassa l'avevo messo?"*, *"devo riempirlo di continuo"*, *"dov'è quella roba?"*. **Se non sai nominare la domanda che toglie, quel gradino non esiste: non costruirlo.** E uno sblocco nuovo deve **creare un collo di bottiglia altrove**, altrimenti è una decorazione.
15c. **Non c'è una fine.** *"Una sorta di infinito da rifinire sempre."* Niente costruzione finale: il motore è il ciclo dei colli di bottiglia, e salire di gradino è una **ricostruzione**, non un potenziamento.
16. **Una ricetta non produce mai un materiale che consuma**, e non ha più di tre ingredienti. Sono controlli all'avvio, non cose da ricordare.
17. **Se il gioco rifiuta di fare una cosa, deve dire perché**, con parole normali. Un operaio che si pianta in silenzio sembra un guasto, non una regola.
18. **Non c'è fretta e non si perde mai.** Niente timer che scadono, niente che marcisce, niente di irreversibile.
19. **Fuori dall'app vanno avanti le macchine, non l'operaio.** Fino a un tetto di quattro ore. È la ricompensa più forte che il gioco dia all'automazione, e il tetto serve perché aspettare non sia mai la strategia migliore.

## Le cinque costanti

Queste cinque cose l'autore le ha volute **in tutte e sei le versioni del progetto**, anche quando cambiava genere. Quando una proposta le contraddice, è la proposta a essere sbagliata:

1. Si gioca **col telefono, in verticale, con una mano**.
2. **Nessun riflesso da usare.** Niente tempi di reazione, niente mira.
3. **Le decisioni contano**, e gli sblocchi si desiderano.
4. **Non si può perdere.**
5. **Non c'è un personaggio da guidare.**

## Comandi

- `npm install` — dipendenze
- `npm run dev` — sviluppo locale
- `npm run build` — build di produzione (**deve passare**)

## Pubblicazione

Ogni merge su `main` fa partire il workflow che pubblica su GitHub Pages.

## Strumenti disponibili

**Agenti:** `bilanciatore` (solo config, usa `MATERIALI.md`), `collaudo` (verifica finale), `cacciatore-bug` (diagnosi), `revisore-mobile` (prestazioni e touch), `rifinitore` (sensazione di gioco), `designer-contenuti` (materiali, ricette, progetti), `consulente-design` (decisioni aperte).

**Skill richiamabili:** `/richiesta` (trasforma una richiesta vaga in specifica), `/punto N` (esegue il punto N della roadmap).

**Skill di consultazione:** `isola-glossario` (cosa intende l'autore quando dice una parola — **consultala sempre**), `isola-config` (schema dei file di configurazione), `isola-motore` (ciclo di gioco e canvas), `isola-tocco` (interfaccia su telefono), `isola-sensazione` (feedback e animazioni), `isola-salvataggio` (formato dei dati salvati), `post-mortem` (quando qualcosa è andato storto più di una volta).

Quando una richiesta arriva vaga o descritta per sensazioni, applica `richiesta` prima di eseguire.

## Autosufficienza

L'autore lavora solo da qui: non ha un'altra chat di supporto.

- Se una richiesta tocca una voce **aperta** di `docs/DECISIONI.md`, fermati e falla decidere prima (agente `consulente-design`), poi costruisci.
- Quando un punto della roadmap sta per toccare una decisione aperta, **avvisalo in anticipo**.
- Se chiede *"e adesso?"* o sembra perso, orientalo con `docs/PROCESSO.md` e `docs/ROADMAP.md`: digli a che punto è e le due o tre mosse possibili.
- Se qualcosa è andato storto **più di una volta**, non ripararlo e basta: usa la skill `post-mortem` e metti un **guardrail meccanico**, non una buona intenzione.
