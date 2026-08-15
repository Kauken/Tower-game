# I trasporti — come non far morire il gradino precedente

*Ricerca su nastri, treni e droni. Il vincolo posto dall'autore:*
> *"Se sblocchiamo i treni ed è un grande traguardo, non è che poi con i droni la tecnologia dei treni è inutile."*

*Ogni numero dice da dove viene. **[citato]** = letto in una fonte. **[mio]** = ricavato da me ragionando sulle fonti.*
*18 ricerche. **Reddit era bloccato** e non è stato usato — vedi Nota sul metodo.*

---

## In una riga

**Tre mezzi, non quattro. E nessuno di loro deve essere "più veloce" di un altro:**

| Mezzo | Il suo mestiere in tre parole |
| --- | --- |
| **Nastro** | Flusso che si vede |
| **Carro** | Carico grosso, capolinea |
| **Drone** | Poco, ma ovunque |

E la risposta scomoda alla seconda domanda: **il treno com'è nei giochi grandi da noi non ha un mestiere** — le isole sono vicine, e il treno esiste per la distanza. Ma **quello che al treno resta quando gli togli la distanza è reale**, e ha due nomi precisi: *è un magazzino che si muove*, e *non mangia terreno lungo il percorso*. Quello lo chiamo **carro** e ce lo teniamo. Il treno no. (§4)

**E il freno che salva tutto è uno solo: il drone paga una tassa fissa a ogni viaggio.** Non "il drone è lento". Su distanza corta perde da solo, senza che nessuno debba renderlo debole — ed è l'unico freno che i giocatori accettano invece di odiare. (§5)

---

## 1. La tabella dei mestieri

Il cuore del report. Riga per riga: in cosa quel mezzo è il migliore, in cosa è il peggiore, quanto costa, cosa chiede al dito del giocatore.

| Mezzo | È il migliore in… | È il peggiore in… | Costo | Cosa chiede al giocatore |
| --- | --- | --- | --- | --- |
| **Nastro** | Flusso continuo su distanza corta. Parte pieno e resta pieno, non ha tempi morti. Factorio: **15 / 30 / 45 oggetti al secondo** secondo il livello **[citato]**. Techtonica: **120 / 360 / 720 al minuto** sui tre livelli **[citato]** | Cambiare idea. Ogni destinazione nuova è una ricostruzione a mano. E scavalcare ostacoli o dislivelli | Basso a pezzo, ma **cresce con la lunghezza**. È l'unico mezzo il cui costo è proporzionale alla distanza | **Tracciare un percorso.** L'unico mezzo in cui il giocatore disegna, ed è il lavoro più lungo di tutti |
| **Tubo** | Liquidi e gas. E stare sotto o sopra senza occupare la superficie | Gli oggetti solidi: non li trasporta proprio | Simile al nastro | Quasi niente. Colleghi A a B |
| **Treno** | Volume enorme in un colpo su lunga distanza. Un solo treno regge più nastri in parallelo sulla stessa tratta **[citato, Satisfactory]**. Con le rotaie sopraelevate (Factorio 2.0) guadagna un mestiere nuovo: **passa sopra tutto, e sotto ci si può costruire** **[citato]** | Distanza corta. Fermarsi, caricare, ripartire mangia tutto il guadagno | Alto e a scalini: binari + due stazioni + convoglio. In Factorio, a **500 caselle**, un treno da un vagone costa **quanto un nastro rosso** — e stravince di portata **[citato]** | Costruire la linea una volta, poi **pensare agli orari e alle precedenze**. È l'unico mezzo con un cervello da programmare |
| **Drone / robot** | Andare dove non c'è strada. E portare **tante cose diverse in poca quantità**. Ignora ostacoli, dislivelli, acqua | Volume alto e continuo. Ogni viaggio paga un costo fisso che non si ammortizza | **Il più caro per oggetto trasportato.** Satisfactory: **4 batterie a viaggio + 1 per km** **[citato]**. Factorio: ricariche continue, e succhia corrente **[citato]** | Quasi niente: due porti e te ne dimentichi. **È esattamente questo il problema** |
| **Nave** | Volume gigantesco fra due punti, senza costruire niente in mezzo | Lentezza. E serve acqua fra i due punti | Alto all'ingresso, poi quasi nullo: niente infrastruttura da mantenere | Costruire due porti. Poi niente |
| **Dirigibile** *(Anno 1800)* | **Vola dritto sopra mare e isole**, quindi fa la stessa tratta in meno strada **[citato]** | **Poco spazio di carico** — per questo non ha ucciso le navi **[citato]** | Alto | Come la nave: due capolinea |
| **Camion / carro** | Il compromesso: volume medio, nessuna rotaia da posare, cambia destinazione facilmente. In Captain of Industry sono la "**flotta flessibile che risponde alle richieste**" **[citato]** | Affidabilità e portata. In Satisfactory "si incastrano e si urtano fra loro" **[citato]**. In CoI il consiglio ufficiale è "**usali solo per consegne piccole e tratte corte, non devono essere il tuo trasporto principale**" **[citato]** | Medio | In Satisfactory: **guidi il percorso una volta** e il camion lo impara |
| **Teletrasporto** | Istantaneo. Distanza zero, niente in mezzo | **Niente. Non ha un vero difetto** | Altissimo, di solito con un consumo di corrente enorme | Niente. **Ed è per questo che è pericoloso** |

### Chi si pesta i piedi con chi — a colpo d'occhio

- **Nastro e tubo**: non si toccano mai. Uno fa i solidi, l'altro i liquidi. Convivenza gratis.
- **Nastro e treno**: non si toccano **solo se le distanze sono lunghe**. Su distanza corta il treno resta senza argomenti — e questo è il nostro caso.
- **Nave e dirigibile**: convivono, e si vede *perché*: uno ha il carico grosso, l'altro la strada corta. **[citato, Anno 1800]** È il modello di convivenza più pulito che ho trovato.
- **Drone e chiunque altro**: si pestano i piedi **sempre**, se non gli metti un freno esplicito. È il caso Factorio (§2).
- **Teletrasporto e chiunque altro**: si pestano i piedi sempre e basta. **Consiglio di non metterlo mai.**

---

## 2. Il caso andato male — Factorio, e lo ammettono loro

Nel Friday Facts #224 (*Bots versus belts*) Wube scrive che **la maggior parte del team pensa che i robot logistici siano troppo forti**, e la ragione è strutturale: i robot **in pratica barano**, perché "teletrasportano" gli oggetti ignorando la geografia, e sono facilissimi da costruire e da estendere. **[citato]**

Nel #225 hanno messo i numeri di un confronto diretto, stessa fabbrica:

| | Oggetti al minuto |
| --- | --- |
| Robot | **16.400** **[citato]** |
| Nastri | **9.600** **[citato]** |
| Robot con la ricerca sulla velocità | **~19.500** **[citato]** |

E l'elenco di Wube del perché il robot vince: **più facile da usare, più portata, si bilancia da solo, più flessibile, più facile da estendere, e costa anche meno in prestazioni**. **[citato]** Sei righe su sei. Zero righe in cui il robot è il peggiore.

La frase che conta per noi è la **motivazione** del perché volevano toccarli: **"per promuovere la scelta del giocatore"**, cioè perché il giocatore potesse *davvero* scegliere invece di prendere sempre l'opzione ottima. **[citato]**

**E poi non l'hanno fatto.** Non ho trovato nessun aggiornamento ufficiale che abbia applicato quel nerf: quello che esiste sono **mod fatte dai giocatori**, con nomi come *"Yet Another Bot Nerf"* — cioè "un altro nerf ai robot, l'ennesimo". **[citato]** Il fatto che ne esistano più d'una, fatte da estranei, dice quanto il problema sia rimasto lì.

**Perché conta per noi:** il gioco che ci ispira ha visto il problema, l'ha **misurato**, l'ha **scritto in pubblico** — e non l'ha risolto. Il vincolo dell'autore non è una fissazione: è la lezione che il maestro non è riuscito a imparare.

---

## 3. I casi andati bene

### Dyson Sphere Program — nastri e droni convivono, e i giocatori spiegano perché

Dalle discussioni Steam, i motivi per cui il nastro resta usato anche a droni sbloccati:

1. **Si vede cos'è rotto.** Un nastro pieno o un nastro vuoto ti dicono a occhio dov'è l'intoppo. Coi droni non vedi niente. **[citato]**
2. **Puoi rubare al volo.** Ti serve un pezzo? Lo prendi dal nastro che passa. **[citato]**
3. **Il nastro ha la precedenza.** Chi tira roba dalla stazione con un nastro la prende **prima** di droni e navi — quindi il nastro è lo strumento per **dare priorità** a una linea. **[citato]**
4. **Il nastro consuma meno corrente.** **[citato]**

E il limite dichiarato dall'altra parte: **il nastro è fermo a 30 oggetti al secondo per casella e non sale mai**, mentre i droni migliorano con le ricerche e con la distanza. **[citato]**

> **La lezione più importante di tutto il report** **[mio]**: in DSP i nastri restano usati **non perché siano più veloci**, ma perché **sono leggibili e controllabili**. Il nastro è l'unico mezzo che il giocatore *vede lavorare*. Il GDD (§9) dice già che le macchine devono vedersi lavorare invece di essere pannelli: **è la stessa regola, applicata al trasporto.** Il nastro è la spina dorsale visiva del gioco.

### Anno 1800 — nave e dirigibile, il taglio più netto

Il dirigibile **vola dritto sopra mare e isole**, quindi copre la stessa tratta in **meno strada** della nave. **[citato]** Se fosse finita lì, avrebbe ucciso le navi. Ma i dirigibili rapidi **hanno poco spazio di carico**: buoni per le consegne urgenti, non per i grandi traffici. **[citato]** Il consiglio pratico che circola è di **dividere il volume fra i due**. **[citato]**

**Due assi, e ognuno vince su uno.** Nave: tanto carico, strada lunga. Dirigibile: poco carico, strada corta. Nessuno dei due è "il migliore". **[mio, sulla base delle due citazioni]**

### Captain of Industry — è un'isola, e ha l'ordine invertito

Questo è il gioco più vicino a noi come ambientazione (**colonia su un'isola**), e fa una cosa che vale la pena guardare bene.

- Si **comincia** con i veicoli — la "flotta flessibile che risponde alle richieste" **[citato]**
- Si **arriva** ai nastri, per "il trasporto veloce di merci solide", **per alleggerire la flotta** **[citato]**
- Le navi servono per **importare ed esportare fuori dall'isola** **[citato]**
- E il consiglio ufficiale: tieni quasi tutti i veicoli come flotta flessibile, ma **usa nastri, tubi o treni per quanti più compiti possibile**, e usa i camion **solo per consegne piccole e tratte corte** **[citato]**

> **La trovata da rubare** **[mio]**: in Captain of Industry il mezzo "va ovunque senza infrastruttura" **è il primo gradino, non l'ultimo**. È debole apposta. Il gradino forte — il nastro — arriva **dopo**, e chiede terreno e lavoro in cambio della potenza.
> **Questo capovolge il problema di Factorio.** Là il mezzo senza infrastruttura arriva per ultimo e cancella tutto. Qua arriva per primo e viene progressivamente scaricato del lavoro pesante.
> Da noi il "mezzo che va ovunque senza infrastruttura" **c'è già ed è l'operaio**, dall'era Le Mani. **Vedi il campanello d'allarme in §5.**

### Techtonica — e la regola dei livelli

Nastri a **120 / 360 / 720 oggetti al minuto** sui tre livelli. **[citato]** Qui il livello nuovo è un puro miglioramento del precedente — e va benissimo.

> **La distinzione che risolve metà del problema** **[mio]**: **dentro un mezzo**, i livelli possono essere puri miglioramenti (nastro base → nastro migliore, e il vecchio sparisce). **Fra mezzi diversi**, mai. Il nastro di legno può essere sostituito dal nastro di ferro. Il nastro non deve mai essere sostituito dal drone.

---

## 4. Il mestiere del treno a distanza corta — la risposta è quasi no

L'ho cercato apposta. Il consenso dei forum Factorio va **contro** il treno sulle tratte brevi:

> Le cinghie sono fantastiche per tratte molto brevi fra macchine e casse. **[citato]**
> Lo sforzo per spremere l'ultimo 20% da un nastro cresce con la distanza e col totale, e **a un certo punto il treno vince** — ma quel punto è lontano. **[citato]**

Il numero più concreto trovato: **a 500 caselle** un treno da un vagone con le sue due stazioni costa **quanto un nastro rosso**, e stravince di portata. **[citato]** Sotto quella soglia il conto si rovescia. **[mio: la fonte dice esplicitamente che il vantaggio dipende dalla distanza, quindi a distanza corta il vantaggio non c'è]**

E Satisfactory conferma la stessa cosa dal lato dei droni: diventano convenienti **solo su tratte lunghe**, perché **decollo e atterraggio costano 51 secondi ciascuno** — **102 secondi buttati a ogni viaggio**. **[citato]**

### Quindi: cosa resta al treno quando gli togli la distanza

Tre cose. Nessuna delle tre è la velocità.

1. **È un magazzino che si muove.** Il nastro non immagazzina niente: se il produttore si ferma, il nastro si svuota e a valle tutto si ferma. Il carro invece **parte pieno e arriva pieno**, e scarica tutto insieme. È un cuscinetto. **[mio, ma è esattamente il ragionamento che i giocatori Factorio fanno sui treni come riserva mobile]**
2. **Non mangia terreno lungo il percorso.** Il nastro si mangia una striscia continua di isola. Il carro si mangia solo i due capolinea. Su un'isola piccola vista da un telefono, questo è un vantaggio **enorme e visibile a occhio**. E non è una mia fantasia: è precisamente il mestiere nuovo che Factorio 2.0 ha dato ai treni con le **rotaie sopraelevate** — passano sopra tutto, e **sotto ci si può costruire**. **[citato]**
3. **Va a colpi, non a flusso.** La roba che si produce a scatti — un forno che sforna un'infornata — sta meglio su un carro che su un nastro sempre semivuoto. **[mio]**

### Il verdetto

**Niente treno. Sì al carro.**

Il "treno" con rotaie, orari e precedenze chiede al giocatore **la programmazione**: è il mezzo con un cervello. Su un telefono, con un dito, senza tastiera, quella è una montagna. E le isole vicine gli tolgono la ragione d'esistere.

Il **carro** tiene i tre mestieri di sopra e butta via la programmazione: **due capolinea, due tocchi, va e torna da solo.** È il treno svuotato di quello che non ci serve.

**Onestà:** non ho trovato **nessun gioco** che abbia costruito un treno pensato apposta per le distanze corte e che funzioni. Il carro come lo descrivo qui è una **mia proposta**, ricavata mettendo insieme i difetti degli altri mezzi e il mestiere delle rotaie sopraelevate. Non è un esempio esistente da copiare.

---

## 5. I droni senza rovinare tutto — quali freni funzionano davvero

Dal più al meno accettato dai giocatori:

| Freno | Dove | Funziona? I giocatori lo accettano? |
| --- | --- | --- |
| **Tassa fissa a viaggio** — tempo o carburante che paghi anche se porti un pezzo solo | Satisfactory: **102 s** fra decollo e atterraggio, e **4 batterie minime** a viaggio **[citato]** | **Il migliore di tutti.** Non toglie potenza al drone: gli toglie *il lavoro sbagliato*. Il giocatore non lo vive come una punizione, lo vive come "il drone non è fatto per questo" **[mio]** |
| **Poco carico per viaggio** | Satisfactory: **~250 oggetti al minuto** per drone su roba che si impila a 100 **[citato]**. Anno 1800: i dirigibili rapidi hanno poco spazio di carico, **ed è per questo che non hanno ucciso le navi [citato]** | **Sì.** Rende il drone lo strumento per la roba preziosa in piccole quantità **[citato]**. Ha il pregio di essere **leggibile**: il giocatore vede quanto arriva |
| **Carburante che cresce con la distanza** | Satisfactory: **+1 batteria per km** **[citato]** | Sì, ma è secondario: da solo non frena niente |
| **Serve un porto a ogni capo** | Satisfactory: un drone vola solo fra il porto di casa e un altro porto **[citato]** | **Sì, e ha un effetto collaterale buono:** costringe il giocatore a **decidere** dove sono i porti. Trasforma un automatismo in una scelta |
| **Consumo di corrente e ricariche continue** | Factorio: i robot hanno bisogno di "pause frequenti per ricaricarsi", il che li rende costosi sul volume alto **[citato]** | **Metà e metà.** Frena sul volume alto, ma i numeri del #225 dicono che vincevano lo stesso |
| **Numero massimo di mezzi** | Captain of Industry: tetto a ~50 veicoli, che sale a 70, 90, 110 con le ricerche **[citato]** | **Il peggiore. Documentato come odiato.** I giocatori lo chiamano **"irragionevole e arbitrario"** e **"un modo artificiale di rallentare il gioco"**, e fanno notare che esistono già limiti veri — carburante, manutenzione, materiali per costruirli. **[citato]** C'è una discussione intitolata letteralmente *"Togliete il limite ai veicoli. Sul serio."* **[citato]** |

### La regola che ne esce

> **I freni che i giocatori accettano sono quelli che cambiano il *mestiere* del drone. Quelli che odiano sono quelli che gli abbassano il *numero*.**
>
> Un drone che *"porta poco ma arriva ovunque"* è un mestiere: il giocatore lo capisce, lo usa dove va usato, ed è contento.
> Un drone che *"porta il 20% in meno di prima"*, o di cui *"non puoi averne più di dieci"*, è una punizione: il giocatore la legge come **il gioco che gli dice di no**. **[mio, ma il caso Captain of Industry lo dimostra con le parole dei giocatori]**

### ⚠️ Campanello d'allarme: il drone rischia di essere il secondo operaio

Nella lista delle cose già rifiutate c'è **il secondo operaio**. Un drone che va a prendere le cose e le porta dove servono **è funzionalmente un secondo operaio**, solo che vola.

Se il drone può prendere *qualunque cosa* da *qualunque posto* e portarla *ovunque*, avete rimesso in gioco la cosa che avevate rifiutato — e per giunta avete tolto valore alla risorsa scarsa del gioco, che è **il tempo dell'operaio**.

**Il taglio che lo salva** **[mio]**: il drone **non va a prendere niente**. Vola solo fra **due porti che il giocatore ha piazzato**, con un carico piccolo e una tassa a viaggio. Non è un aiutante: è un **tubo che vola**, senza cervello. Così resta un mezzo di trasporto e non diventa una persona.

---

## 6. La regola generale

Le formulazioni testuali che ho trovato, in ordine di utilità.

**Game Wisdom — *The Impurities of Pure Upgrades in Game Design*:**

> Un **sidegrade** è quando, invece di ricevere un puro miglioramento da un oggetto, ricevi **anche dei lati negativi**. **[citato]**
> Un **puro miglioramento** è un oggetto che è **completamente meglio** di quello che il giocatore sta usando adesso. **[citato]**

E la conseguenza:

> I sidegrade danno più profondità di una curva di potenza crescente. […] tenendo una **base di potenza costante**, gli sviluppatori hanno potuto espandersi e creare varietà che **restava valida per tutta la partita**. **[citato]**

**Sulla progressione orizzontale** (la stessa idea, altro nome — "lateral/horizontal progression"):

> Progredire significa **allargare le proprie capacità** invece di concentrarsi sull'acquisizione dell'equipaggiamento. **[citato]**
> Quando esce una via di progressione nuova, i giochi a progressione orizzontale offrono **nuove statistiche o effetti, non più statistiche o effetti**. **[citato]**
> È questo che **impedisce ai contenuti vecchi di diventare obsoleti**. **[citato]**

**E la formulazione di Wube**, che è la stessa cosa detta da chi ha sbagliato: volevano toccare i robot **"per promuovere la scelta del giocatore"**. **[citato]**

### Tradotto nella nostra regola operativa **[mio]**

> **Un mezzo nuovo non deve mai essere "il vecchio, ma di più".**
> Se il gradino nuovo ha il numero più alto del vecchio **su tutte le righe**, hai sbagliato.
> **Ogni mezzo deve avere almeno una riga in cui è il peggiore** — e quella riga deve essere una situazione che nel gioco capita **spesso**.

E il controllo pratico da fare a ogni mezzo nuovo, prima di costruirlo:

> **Dopo aver sbloccato il mezzo nuovo, dove sarebbe stupido usarlo?**
> Se non trovi la risposta in dieci secondi, il mezzo nuovo cancella i precedenti. Non costruirlo: riprogettalo.

Applicato ai tre mezzi proposti, la risposta arriva subito, ed è il segno che la scala tiene:

- Sarebbe stupido usare il **nastro** per portare tre pezzi preziosi dall'altra parte dell'isola scavalcando l'acqua. *(costa una striscia intera di terreno per niente)*
- Sarebbe stupido usare il **carro** fra due macchine che si toccano. *(due capolinea per due passi)*
- Sarebbe stupido usare il **drone** per portare la pietra che esce a valanga dalla cava. *(paga la tassa a viaggio mille volte)*

---

## 7. Sul telefono — e qui c'è sia la brutta che la bella notizia

### La brutta: tracciare nastri col dito è già fallito una volta

**Shapez**, portato su iOS e Android da Playdigious, è l'unico gioco di fabbrica con nastri che ho trovato su telefono. Dalle recensioni degli utenti:

- **Non puoi trascinare il dito per costruire un nastro** nella versione mobile — cosa che invece sul PC si fa clic-e-trascina. **[citato]**
- I comandi sono **scomodi**, e servono **troppi tocchi per fare anche un nastro semplice** rispetto al mouse. **[citato]**
- Per fare un nastro lungo **devi guardare avanti in continuazione**. **[citato]**

**Non ho trovato nessun gioco di fabbrica che faccia tracciare nastri col dito su schermo verticale e che i giocatori descrivano come piacevole.** Neanche uno.

### La bella: assegnare una tratta col dito è un problema risolto, e da un gioco premiato

**Mini Metro.** Si gioca **disegnando linee fra le stazioni col dito**. **[citato]** E le recensioni dicono l'opposto di Shapez:

- I comandi sono **esattamente quello che devono essere** perché un gioco così funzioni su schermo tattile. **[citato]**
- **Tocca e trascina da stazione a stazione** per creare una linea nuova; prolungarla fino a una stazione nuova è altrettanto facile. **[citato]**
- Piazzare **treni e vagoni in più** si fa con un trascina-e-passa-sopra, che evidenzia il binario e il treno interessati, **così sai dove stai piazzando anche su uno schermo piccolo**. **[citato]**
- Nominato ai BAFTA 2016, vincitore IGF 2016, finalista gioco mobile dell'anno IGN 2016. **[citato]**

> **La differenza fra i due, e vale tutto il capitolo** **[mio]**:
> in **Shapez** il dito deve disegnare **il percorso, casella per casella**. Fallisce.
> in **Mini Metro** il dito tocca **i capolinea**, e il percorso lo disegna il gioco. Vince, e vince premi.

### Cosa vuol dire per noi

1. **Il carro è il mezzo più adatto al telefono di tutti.** Due capolinea, due tocchi, il percorso lo trova lui. È letteralmente il gesto di Mini Metro. Questo rafforza molto la proposta di §4.
2. **Il nastro non va disegnato casella per casella.** Le uscite possibili **[mie, non viste altrove]**:
   - Il giocatore tocca A, poi tocca B, e **il nastro si disegna da solo**. Può ritoccarlo dopo, ma non deve disegnarlo.
   - Oppure il nastro è **un pezzo corto e dritto**, un oggetto singolo fra due macchine vicine. Niente serpentine.
3. **Il drone: due porti, due tocchi.** Stesso gesto del carro. Nessun problema.

---

## Cosa cambia da noi

| La trovata | Cosa tocca | Stato |
| --- | --- | --- |
| **Tre mezzi: nastro, carro, drone.** Niente treno, niente nave, niente teletrasporto | GDD, ere "La Corrente" / "La Seconda Isola" / "Le Scale" | **Da decidere** — è una scelta di struttura, va in `DECISIONI.md` |
| **Il drone paga una tassa fissa a viaggio** (tempo di decollo o carburante minimo), non "va più piano". È il freno più efficace e l'unico ben accettato | Regole del drone, valori in `config/` | **Da fare**, se i droni entrano |
| **Il drone porta poco per viaggio.** Secondo asse di freno, e leggibile a occhio | `config/` | **Da fare** |
| **Il drone non va a prendere niente**: vola solo fra due porti piazzati dal giocatore. Altrimenti è il secondo operaio, che è già stato rifiutato | GDD, glossario, lista dei rifiuti | **Da decidere — e presto.** È un conflitto con una cosa già rifiutata |
| **Il nastro è l'unico mezzo che si vede lavorare.** La leggibilità è il suo vantaggio di progetto, non un dettaglio grafico. È il motivo per cui in DSP i nastri sopravvivono ai droni | GDD §9, `isola-sensazione` | **Da fare** — è già coerente con quello che il GDD dice |
| **Il carro è un magazzino con le ruote**, non un treno veloce: parte pieno, scarica tutto insieme, e occupa **solo i due capolinea** invece di una striscia di isola | Nuovo mezzo da progettare | **Da valutare** — è una mia proposta, senza precedente diretto |
| **Il gesto è "tocco A, tocco B"**, mai "disegno il percorso". Vale per carro, drone e — se possibile — anche per il nastro | Interfaccia, skill `isola-tocco` | **Da decidere, e prima di costruire qualunque nastro.** È il rischio numero uno |
| **Dentro un mezzo i livelli possono sostituire il precedente** (nastro di legno → nastro di ferro). **Fra mezzi diversi mai** | GDD, `docs/PROGETTI.md` | **Da fare** — regola a costo zero |
| **Regola del "dove sarebbe stupido usarlo?"**: controllo obbligatorio prima di aggiungere qualunque mezzo nuovo | `docs/PROCESSO.md` | **Da fare** — costa niente e previene il caso Factorio |
| ❌ **NON mettere il treno** com'è negli altri giochi | — | **Consiglio di non fare.** Isole vicine = treno senza mestiere, più il costo di far programmare gli orari col dito |
| ❌ **NON mettere il teletrasporto**, in nessuna era, nemmeno costosissimo | — | **Consiglio di non fare.** Non ha un difetto, quindi cancella tutto quello che c'era prima |
| ❌ **NON limitare i droni con un numero massimo** | — | **Consiglio di non fare.** È il freno documentato come odiato: "irragionevole e arbitrario" **[citato]** |
| ❌ **NON far tracciare nastri col dito casella per casella** | — | **Consiglio di non fare.** L'unico precedente conosciuto è un caso di lamentele |

---

## Quello che NON ho trovato

Lo dichiaro invece di riempirlo a fantasia.

1. **Nessun gioco con treni progettati apposta per distanze corte.** In tutti quelli guardati, il treno esiste *perché* la distanza è lunga. Il "carro" di §4 è una mia costruzione a tavolino a partire dai difetti degli altri mezzi e dal mestiere delle rotaie sopraelevate — **non è un esempio esistente da copiare**.
2. **Nessun esempio riuscito di tracciamento nastri col dito su schermo verticale.** L'unico caso trovato (Shapez mobile) è un caso di lamentele. Mini Metro risolve il problema **diverso** (i capolinea), non questo.
3. **Nessuna correzione post-uscita ai droni documentata come riuscita.** Factorio ha discusso i nerf nei FFF #224/#225 e poi **non li ha applicati**; quello che esiste sono mod dei giocatori. Non ho trovato nessuno sviluppatore che abbia nerfato i droni dopo l'uscita e abbia poi detto pubblicamente com'è andata.
4. **Nessuna regola di design scritta specificamente sui mezzi di trasporto.** La regola del sidegrade e della progressione orizzontale esistono in generale (§6), ma non ho trovato un progettista che le abbia scritte applicandole alla scala dei trasporti. La regola operativa di §6 è **mia**.
5. **Poco su Mindustry, Timberborn, Foundry, Autonauts e Desynced.** Su Mindustry ho trovato solo le schede tecniche dei blocchi, non discussioni su cosa i giocatori usano davvero. Timberborn **non ha nastri nel gioco base** — esistono solo come mod. Su Foundry e Desynced non ho trovato materiale utile sul confronto fra mezzi.
6. **Nessun numero pubblico sui costi dei nastri in Dyson Sphere Program** che permettesse un confronto diretto di costo con i droni. Il vantaggio dichiarato è "consumano meno corrente", senza cifre.

---

## Nota sul metodo

**Reddit risultava bloccato** e non è stato usato: nessuna delle citazioni qui sopra viene da Reddit. Le fonti sono il blog e la wiki ufficiali di Factorio, le discussioni Steam di Dyson Sphere Program / Satisfactory / Captain of Industry, la wiki di Satisfactory, la wiki di Captain of Industry, l'Anno Union e la wiki di Anno 1800, le recensioni su App Store e Google Play per Shapez e Mini Metro, la wiki di Techtonica, e Game Wisdom / Game Developer / MMORPG.com per la teoria della progressione.

18 ricerche.

## Fonti

- [Friday Facts #224 — Bots versus belts (Wube)](https://factorio.com/blog/post/fff-224)
- [Friday Facts #225 — Bots versus belts, parte 2 (Wube)](https://factorio.com/blog/post/fff-225)
- [Factorio Wiki — Tutorial: Transport use cases](https://wiki.factorio.com/Tutorial:Transport_use_cases)
- [Factorio Wiki — Space Age (rotaie sopraelevate)](https://wiki.factorio.com/Space_Age)
- [Factorio Forums — Are trains really more efficient than belts?](https://forums.factorio.com/viewtopic.php?t=43953)
- [Factorio Forums — Belts, how far is too far?](https://forums.factorio.com/viewtopic.php?t=53017)
- [Factorio Mods — Yet Another Bot Nerf](https://mods.factorio.com/mod/YetAnotherBotNerf)
- [Steam DSP — Belts vs. drones](https://steamcommunity.com/app/1366540/discussions/0/5963323773758885466/)
- [Steam DSP — Drone speed vs. belt](https://steamcommunity.com/app/1366540/discussions/0/3195866053922563939/)
- [Steam Satisfactory — Trains vs Drones?](https://steamcommunity.com/app/526870/discussions/0/3316358999133065371/)
- [Satisfactory Wiki — Drone](https://satisfactory.wiki.gg/wiki/Drone)
- [The Grimoire — A More Satisfactory Way of Building](https://grimoire.ca/satisfactory/way-of-building/)
- [Captain of Industry Wiki — Vehicles](https://wiki.coigame.com/Vehicles)
- [Steam Captain of Industry — Logistics conundrum](https://steamcommunity.com/app/1594320/discussions/0/603040132080360103/)
- [Steam Captain of Industry — Remove Vehicles limit. Seriously.](https://steamcommunity.com/app/1594320/discussions/0/3425564314016437093/)
- [Captain of Industry Ideas — Vehicle Cap](https://ideas.captain-of-industry.com/suggestions/650000/vehicle-cap)
- [Anno Union — DevBlog: New Airships coming your way](https://www.anno-union.com/devblog-new-airships-coming-your-way/)
- [Anno 1800 Wiki — Trade routes](https://anno1800.fandom.com/wiki/Trade_routes)
- [Techtonica Wiki — Conveyor Belt MKIII](https://techtonica.fandom.com/wiki/Conveyor_Belt_MKIII)
- [Shapez — Factory Game, App Store (recensioni)](https://apps.apple.com/us/app/shapez-factory-game/id6450830779?see-all=reviews&platform=ipad)
- [Mini Metro — App Store](https://apps.apple.com/us/app/mini-metro/id837860959)
- [Android Central — Mini Metro review: Design sublime subway lines](https://www.androidcentral.com/mini-metro-retro-review)
- [Gamezebo — Mini Metro Review: Mass Transit Brain Teaser](https://www.gamezebo.com/the-best/mini-metro-review-mass-transit-brain-teaser/)
- [Game Wisdom — The Impurities of Pure Upgrades in Game Design](https://game-wisdom.com/critical/impurities-upgrades-game-design)
- [MMORPG.com — Choosing Your Path: Horizontal or Vertical Progression?](https://www.mmorpg.com/columns/choosing-your-path-horizontal-or-vertical-progression-2000133424)
- [Game Developer — How to Power up Players with Upgrades](https://www.gamedeveloper.com/design/how-to-power-up-players-with-upgrades)
- [Mindustry Wiki — Distribution](https://mindustry.fandom.com/wiki/Distribution)
