# Il cozy — si può essere accoglienti senza nessuno con cui parlare?

Ricerca su cosa vuol dire "cozy" in pratica, e se è compatibile con un gioco di automazione senza personaggi.

Stato: **completa.** Agosto 2026. 16 ricerche.

**Nota sul recupero file.** All'avvio la copia di lavoro era tornata indietro a un commit vecchio (GDD v2.0, tower defense). Ho eseguito il `git checkout` indicato e recuperato `docs/`, `CLAUDE.md`, `config/` dal branch giusto (GDD v7.1). **Dodicesima volta.**

**Nota sul metodo.** **Reddit è risultato bloccato** anche stavolta, come nelle ricerche precedenti: non c'è niente che venga da lì. Fonti: Project Horseshoe, Game Developer, 80.lv, Lostgarden, discussioni Steam, interviste agli sviluppatori, testate specializzate, un paio di lavori accademici.

---

## In una riga

**Sì, si può essere cozy senza personaggi — ma solo se il posto diventa il personaggio.** I giochi cozy senza NPC (Dorfromantik, Terra Nil, Townscaper, Cloud Gardens, Tiny Glade) sostituiscono le persone con **tre cose precise**: un mondo che **risponde e si popola da solo** quando lavori bene, **il tuo lavoro che resta visibile** (guardi indietro e vedi cosa hai fatto), e **suono e vita ambientale** che fanno da conversazione. Il rischio non è l'assenza di NPC: è l'assenza di **risposta**.

---

## 1. Cos'è "cozy", operativamente

### La definizione che usano i progettisti

La definizione di riferimento nasce da **Project Horseshoe 2017** (gruppo di lavoro con Daniel Cook, Tanya X. Short, Chelsea Howe e altri), ed è quella che poi tutti citano. Dice che "cozy" è **quanto forte un gioco evoca la fantasia di tre cose**:

1. **Sicurezza** (*safety*) — assenza di pericolo e di rischio. Non solo fisico: anche **emotivo e sociale**. Il giocatore può essere vulnerabile senza conseguenze. Le attività devono essere **volontarie**, mai imposte, altrimenti il giocatore sente coercizione.
2. **Abbondanza** (*abundance*) — un mondo che provvede. **C'è sempre abbastanza** da raccogliere, da costruire, da fare. Niente manca e niente incalza.
3. **Morbidezza** (*softness*) — stimoli gentili. **Ritmo lento** e **portata gestibile**. Le attività non sono urgenti ma restano significative.

> Fonte: [Project Horseshoe 2017, sezione sui cozy games](https://www.projecthorseshoe.com/reports/ph17/ph17r2.htm) e la sintesi di Daniel Cook su [Lostgarden](https://lostgarden.com/2018/01/24/cozy-games/).

Due aggiunte importanti dalla stessa fonte e da [Designing for Coziness](https://www.gamedeveloper.com/design/designing-for-coziness) di Tanya X. Short (Kitfox Games):

- Le tre cose **si rinforzano a vicenda**: un gioco che le centra ottiene "gratis" intimità dello spazio, ritmo lento, sincerità.
- Il cozy **non è un genere, è un ingrediente**: si può mettere dentro generi diversi, e serve soprattutto a **dare al giocatore il controllo del ritmo** senza perderlo nelle fasi di riposo.

**Questa terza frase è la più utile per noi**, ed è anche l'unica cosa che dice esplicitamente che cozy e automazione non sono nemici per forza.

### La lista degli ingredienti

Ho ricavato la lista incrociando Project Horseshoe/Lostgarden, l'articolo di Kitfox, [80.lv "Using Coziness in Game Design"](https://80.lv/articles/using-coziness-in-game-design) e quello che i giochi senza NPC fanno davvero (sezione 2).

La colonna a destra è **mio giudizio**, non citazione: l'ho ricavata leggendo `docs/GDD.md` v7.1.

| # | Ingrediente | Cosa vuol dire in pratica | Da noi |
| --- | --- | --- | --- |
| 1 | **Non si perde** | Nessuna sconfitta, nessun game over, nessuna punizione retroattiva | ✅ **Ce l'abbiamo**, ed è dichiarato non negoziabile |
| 2 | **Nessuna fretta imposta** | Niente timer, niente deperimento, niente stagioni che scadono | ✅ **Ce l'abbiamo** |
| 3 | **Nessun riflesso** | Il gioco non chiede precisione o velocità di mano | ✅ **Ce l'abbiamo** |
| 4 | **Nessuna coercizione economica** | Niente pubblicità, valuta premium, energia, regali giornalieri che ti obbligano a tornare | ✅ **Ce l'abbiamo**, ed è raro: quasi nessun gioco mobile ce l'ha |
| 5 | **Abbondanza — non finisce mai** | I giacimenti non si esauriscono, non resti mai bloccato senza materiale | ✅ **Ce l'abbiamo** (giacimenti infiniti, presi da Satisfactory) |
| 6 | **Attività volontarie** | Puoi scegliere di non fare una cosa senza essere penalizzato | ⚠️ **Da verificare**: se ogni progetto è obbligatorio per andare avanti, l'ingrediente cade |
| 7 | **Il mondo risponde** | Fai una cosa buona e il posto cambia visibilmente: si popola, si colora, si anima | ❌ **Ci manca**, ed è il buco più grosso (vedi sezione 2) |
| 8 | **Il lavoro resta visibile** | Guardi indietro e vedi tutto quello che hai fatto, senza aprire menù | 🟡 **Parziale**: le macchine si vedono lavorare (§9 del GDD), ma l'isola non racconta la storia |
| 9 | **Suono che accompagna l'azione** | Ogni gesto ha un verso soddisfacente e non fastidioso a ripetizione | ❌ **Ci manca** (nulla di dichiarato) |
| 10 | **Ambiente vivo di sottofondo** | Vento, uccelli, acqua, animaletti che non fanno niente di utile | ❌ **Ci manca** |
| 11 | **Un posto che è tuo e si abbellisce** | Casa, giardino, angolo da arredare | ❌ **Ci manca** (il casotto è solo magazzino) — ma vedi sezione 5, non è scontato che serva |
| 12 | **Palette morbida e leggibile** | Colori a bassa saturazione, contrasto pulito, poche tinte | ⚠️ **Da decidere**, non è ancora fissato |
| 13 | **Ritmo lento ma non vuoto** | Le attese ci sono ma sono piene di qualcosa da guardare | 🟡 **Parziale**: l'operaio lento è un'attesa; dipende se è bella da guardare |
| 14 | **Personaggi, comunità, affetto** | NPC che ti riconoscono, relazioni, paese | ⛔ **Incompatibile con la scelta dell'autore** — il mercante è stato tolto, l'operaio non parla |
| 15 | **Regalo/reciprocità** | Qualcuno ti dà qualcosa senza chiedere niente | ⛔ **Incompatibile**: richiede qualcuno |
| 16 | **Ottimizzazione come unico obiettivo** | Efficienza misurata, tempi al secondo, classifiche | ⛔ **Da tenere fuori**: è l'ingrediente che *distrugge* il cozy (sezione 3) |

**Lettura veloce della tabella:** abbiamo già i quattro ingredienti "difensivi" (1-4) — quelli che tolgono lo stress. Ci mancano quasi tutti quelli **"di ritorno"** (7-10) — quelli che danno qualcosa indietro. Il cozy non è solo assenza di stress: **è assenza di stress più risposta affettuosa.** Noi per adesso abbiamo solo la prima metà.

---

## 2. Cozy senza personaggi — cosa mettono al posto delle persone

Questa è la domanda centrale. La risposta breve: **i giochi cozy senza NPC non lasciano il buco vuoto, lo riempiono con altro.** Ecco con cosa, gioco per gioco.

### Dorfromantik — il mondo si popola da solo
- Nessun NPC, nessun dialogo. Si piazzano tessere e basta.
- I pilastri dichiarati dagli sviluppatori (Toukana) sono **minimalismo, leggibilità, rilassamento** ([80.lv](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design)).
- **Non c'è competizione, popolazione né politica** — e questo è indicato come il motivo del rilassamento ([Game Developer](https://www.gamedeveloper.com/business/sparking-joy-through-tile-placement-in-idyllic-village-builder-i-dorfromantik-i-)).
- **Cosa mette al posto delle persone:** il paesaggio che cresce. I giocatori scrivevano agli sviluppatori per dire che il gioco li aiutava a calmarsi ([Digital Trends](https://www.digitaltrends.com/gaming/dorfromantik-interview/)).
- **Attenzione, un dettaglio che ci riguarda:** anche in un gioco così morbido **c'è una risorsa che finisce** — la pila di tessere. Si allunga completando incarichi e facendo piazzamenti "perfetti". Quindi la calma non veniva dall'assenza totale di pressione, ma dal fatto che **la pressione era interamente costruttiva**: non perdi mai qualcosa, guadagni più tempo.

### Terra Nil — la ricompensa è che il posto rivive
- Nato da una game jam col tema "Start with Nothing", concepito come **city builder al contrario** ([Game World Observer](https://gameworldobserver.com/2022/09/30/terra-nil-free-lives-interview-reverse-city-builder-studio-ghibli)).
- Il contrasto è dichiarato dagli sviluppatori: **Factorio ti fa portare un pianeta intatto all'incubo industriale, Terra Nil fa il contrario.** (Per noi è un avvertimento: siamo dalla parte di Factorio, e il cozy va aggiunto apposta.)
- **Cosa mette al posto delle persone:** il ritorno della natura. Gli sviluppatori dicono di usare **musica gentile e delicata** e arte lussureggiante per calmare, puntando sulla meraviglia della natura. Hanno raccontato di giocatori commossi fino alle lacrime **nel momento in cui arriva la pioggia** ([Gamerant](https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/)).
- Il finale è **riciclare tutte le macchine e andarsene senza lasciare traccia**: la storia è raccontata dal posto, non da qualcuno.

**Il momento della pioggia è la lezione più utile del report.** È un **evento del mondo**, non una persona, ed è quello che fa piangere. Vuol dire che si può ottenere una risposta emotiva forte **senza nessuno**, se il mondo ha un momento in cui cambia visibilmente per merito tuo.

### Townscaper — nessun obiettivo, solo il piacere di guardare
- Non ha punteggi, incarichi, obiettivi, sblocchi o potenziamenti: **è una sandbox** ([Steam / recensioni](https://thehyperbolicgamer.com/2021/04/20/game-review-townscaper-and-dorfromantik-a-tale-of-two-citybuilders/)).
- **Cosa mette al posto delle persone:** la **generosità dell'algoritmo**. Metti un cubo e il gioco decide da solo archi, scale, balconi, panni stesi. Sembra che qualcuno abiti lì anche se non c'è nessuno.

### Cloud Gardens — la storia la inventi tu
- Gioco di piante che crescono sopra rovine industriali. Nessun personaggio.
- La cosa interessante è dichiarata da chi lo ha recensito: **decostruisce la "narrazione ambientale"**. Invece di nascondere una storia da trovare, **ti dà gli attrezzi e ti lascia implicare una storia da solo** ([Comics Unearthed](https://www.comicsunearthed.com/cloud-gardens-puts-a-great-spin-on-environmental-storytelling/); [Kotaku](https://kotaku.com/cloud-gardens-is-a-relaxing-game-about-the-end-of-our-w-1847630552)).
- **Cosa mette al posto delle persone:** oggetti abbandonati che suggeriscono che qualcuno c'è stato.

### Tiny Glade — vita raccontata dagli oggetti
- Costruisci castelli e giardini, senza griglia e senza regole rigide. Nessun NPC.
- Costruisce un racconto sottinteso **senza filmati, rivelando i momenti di una vita solo attraverso gli oggetti**, con narrazione ambientale accompagnata da **musica gentile e leggeri effetti d'ambiente** che tengono il tono calmo ([Shacknews](https://www.shacknews.com/article/141431/tiny-glade-review-score); [LadiesGamers](https://ladiesgamers.com/tiny-glade-review/)).

### Unpacking — mille oggetti, zero parole, e funziona
È il caso più estremo e il più istruttivo, perché è **una storia intera raccontata senza una riga di dialogo**.
- È un gioco narrativo **senza nessun dialogo**: tutti i passaggi della storia arrivano dal gioco stesso e dall'ambiente ([Game Developer, "Unpacking the design pillars of a chill puzzle game"](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)).
- **Oltre 1000 oggetti** — giocattoli, libri, vestiti, ricordi — raccontano relazioni, lavoro, rotture e famiglia **senza testo né istruzioni**. Numero **citato** ([Game Developer, "Unpacking: a narrative through 1000 household items"](https://www.gamedeveloper.com/marketing/unpacking-a-narrative-through-1-000-household-items)).
- Il meccanismo dichiarato dagli sviluppatori: **maneggiare un oggetto e dover decidere dove metterlo obbliga a guardarlo davvero.** L'intimità nasce dall'atto di sistemare, non dall'oggetto in sé ([Game Developer, "Intimacy from the inanimate"](https://www.gamedeveloper.com/design/intimacy-from-the-inanimate-in-house-moving-puzzler-unpacking)).

**Perché ci riguarda direttamente:** noi abbiamo **un inventario a caselle e un magazzino**. Unpacking dimostra che **il gesto di mettere le cose a posto è già di per sé accogliente**, se il gioco ti fa guardare la cosa che stai spostando. Non serve un NPC per rendere caldo un magazzino: serve che le cose dentro **si vedano** e abbiano una faccia riconoscibile.

### A Short Hike — l'unico con NPC, e conta poco
- Ha personaggi, ma sono **escursionisti che incontri per caso**, senza missioni obbligatorie né relazioni da coltivare. Il gioco è la salita e il panorama.
- **Utile per noi come misura:** anche un gioco cozy con persone dentro **non usa le persone come motore**. Le usa come dettaglio del posto.

### Cosa mettono al posto delle persone — la risposta condensata

Cinque sostituti, in ordine di quanto sono ripetuti nelle fonti:

1. **Il mondo che si popola da solo.** Metti una cosa, il gioco ne aggiunge altre che tu non hai chiesto: case, panni stesi, uccelli, fiori. È l'algoritmo che fa il regalo al posto dell'NPC. (Townscaper, Dorfromantik, Tiny Glade)
2. **Un momento in cui il posto rivive per merito tuo.** Non "hai completato l'obiettivo": **piove, torna l'erba, tornano gli animali.** (Terra Nil)
3. **Il tuo lavoro che resta visibile e leggibile.** Guardi la mappa e ti ricordi cosa hai fatto e quando. La memoria sostituisce la conversazione. (Dorfromantik, Cloud Gardens)
4. **Oggetti che sottintendono una vita.** Non serve che qualcuno parli: basta che sembri che qualcuno viva lì. (Tiny Glade, Cloud Gardens, Unpacking)
5. **Suono e musica come compagnia.** Vedi sezione 4: è la sostituzione più economica da fare e la più trascurata.

**Cosa NON usano:** nessuno di questi giochi sostituisce le persone con **più contenuto o più sistemi**. La risposta non è "aggiungi roba", è "fai rispondere il posto".

---

## 3. Automazione e cozy vanno d'accordo?

Risposta corta: **sì, ma è la combinazione più fragile del report.** Ho trovato lamentele esplicite, e sono precise su *quando* si rompe.

### Timberborn — il caso più utile, perché è successo davvero
Timberborn (castori che costruiscono dighe) era considerato un builder tranquillo. Poi ha aggiunto un sistema di automazione, e le discussioni Steam si sono riempite:

- **"L'automazione ha cambiato il gioco in peggio"**: l'aggiornamento lo ha avvicinato a Satisfactory/Factorio, **riducendo molto l'individualità** di Timberborn ([Steam, "Automation – the wrong approach?"](https://steamcommunity.com/app/1062090/discussions/0/805719526076400472/)).
- La frase più chiara di tutte, da un giocatore: **"Gioco a Factorio per l'automazione che ti fa grattare la testa. Gioco a Timberborn per una tranquilla società da costruire con calma."**
- Altre lamentele: impostazioni **confuse e poco intuitive**, valori predefiniti che **ti preparano al fallimento**, e **troppo complesso per i bambini**, che erano un pubblico del gioco ([Steam, "thoughts on the new automation tools"](https://steamcommunity.com/app/1062090/discussions/0/809096595266101443/)).
- Ci sono anche discussioni di segno opposto ("I Think the Automation is Great!"): **il pubblico si è spaccato in due.** Gli sviluppatori hanno poi pubblicato una patch dichiarando di cercare "un buon equilibrio fra facilità d'uso e coerenza del progetto", rinominando e semplificando i componenti.

**Le tre lezioni, e sono direttamente nostre:**
1. **Il pericolo non è l'automazione: è l'automazione con i quadranti da regolare.** Quello che ha rotto Timberborn sono valvole con parametri numerici, non i nastri.
2. **Un valore predefinito sbagliato costa più di un sistema complesso.** Se una macchina appena costruita fa già una cosa sensata, il giocatore non deve capire niente per stare bene.
3. **Ogni sistema che aggiungi sposta il pubblico.** Non è neutro: chi era lì per la calma se ne va.

### Stardew Valley — la calma la rompe il giocatore, non il gioco
Le lamentele "sembra un lavoro" su Stardew esistono, ma **non accusano il gioco: accusano l'ottimizzazione**.

- **"Le abitudini possono trasformare Stardew da gioco rilassante a incubo di min/max"**; ottimizzare dà grandi ricompense ma è **un processo stressante che richiede pianificazione e ti taglia fuori da molte altre cose che potrebbero darti gioia** ([Dualshockers](https://www.dualshockers.com/stardew-valley-habits-that-completely-change-how-relaxing-the-game-feels-over-time/)).
- Sui forum Steam: **"il min-maxing a volte rovina il gioco perché a quel punto sei bruciato"**; e **"è facile vedere le fattorie ottimizzate degli altri e sentirsi come se non stessi giocando nel modo giusto"** ([Steam, discussioni Stardew Valley](https://steamcommunity.com/app/413150/discussions/0/604141990686296271)).
- Su Hacker News c'è chi dice apertamente di **non aver amato Stardew perché lo trovava uno dei giochi più stressanti** ([HN](https://news.ycombinator.com/item?id=25887051)).

**La lezione, che è quella che conta di più:** il gioco diventa un lavoro **quando esiste un modo giusto di giocare e il giocatore lo sa**. Non quando c'è automazione. Se il gioco mostra il numero dell'efficienza, o se esistono confronti fra giocatori, la calma se ne va da sola.

### Autonauts — il caso che ci somiglia di più, ed è un avvertimento
Autonauts è un gioco di robot da programmare per fare il lavoro al posto tuo. È letteralmente la nostra premessa portata all'estremo.

- Sul forum Steam esiste una discussione intitolata **"È normale sentirsi super stressati giocando a questo?"** ([Steam](https://steamcommunity.com/app/979120/discussions/0/3004423845036324734/)). Il titolo da solo vale mezza ricerca.
- Le recensioni lo descrivono come **"piacevolmente a bassa pressione, l'equivalente videoludico di rilassarsi in un bagno caldo"** — e poi dicono che **negli stadi avanzati subentra la fatica**, e che l'unica cosa da fare era **duplicare noiosamente una gran quantità di infrastruttura** già costruita.
- Il difetto più citato: **non c'è copia-incolla.** Se vuoi 10 robot che tagliano legna, devi **programmarli uno per uno**.
- Riassunto dei giocatori: bisogna risolvere problemi globali **con la micro-gestione, facendo le stesse cose centinaia di volte** ([Steam, "Bored"](https://steamcommunity.com/app/979120/discussions/0/1696095261008837609/)).

**La lezione, ed è nostra al 100%:** in un gioco di automazione, **la calma non muore per la complessità, muore per la ripetizione della configurazione.** Il momento in cui devi rifare la stessa impostazione dieci volte, il gioco è diventato un lavoro. Se una cosa si può fare, **si deve poter fare a dieci copie in un colpo solo.**

### Forager — il verdetto più duro che ho trovato
Forager è quasi il nostro gioco (isola vista dall'alto, raccogli, automatizzi). I recensori lo trovano adorabile e allo stesso tempo lo accusano.

- **"Non solo ignora il valore del tuo tempo: lo manca di rispetto attivamente"** ([TechRaptor](https://techraptor.net/gaming/reviews/forager-review-waiting-game)).
- **"Non raggiunge mai il vero zen, perché stai continuamente aprendo il menù per mangiare o chiudendolo per schivare."**
- Ha ottimi contenuti, ma **nascosti dietro il caso e ore di macinatura**.

**La lezione:** il cozy si rompe anche solo **per il menù aperto e chiuso in continuazione**. Non serve un nemico. Basta che l'interfaccia interrompa il gesto. Per noi, su telefono e con un inventario a caselle, è il pericolo più concreto e il più sottovalutato.

### Slime Rancher 2 — cosa fa bene, e ce lo copiamo
Citato spesso come cozy riuscito **con** automazione (droni che raccolgono al posto tuo).
- I recensori lodano **il sistema meteo**: **guardare la pioggia dal ranch** è indicato come uno dei momenti preferiti del genere.
- E soprattutto: **la musica parte lenta e melodica quando esplori, e accelera quando lavori sul campo** ([HubPages](https://discover.hubpages.com/games-hobbies/slime-rancher-2-review-a-cozy-game-worth-every-penny); [Gaming-Charts](https://gaming-charts.com/games/slime-rancher-2)).

**È l'idea sonora più concreta di tutto il report**, e per noi è quasi gratis: **la musica segue l'operaio.** Quando lui lavora, il fondo si anima; quando è fermo o in cammino, si calma. Nessuno deve dire niente, ma il gioco *risponde*.

### Coral Island e Littlewood — i due estremi dello stesso asse
- **Coral Island** ha automazione fatta bene e **si può rallentare il tempo**, quindi regge la complessità meglio di Stardew. Ma una recensione dice: **"non mi sono mai sentita senza qualcosa da fare, il che era bello e insieme un po' opprimente"** ([Gayming Magazine](https://gaymingmag.com/2023/11/coral-island-review/)).
- **Littlewood** è descritto come **"un simulatore di vita con agricoltura e quasi nessuno stress"**: è progettato apposta per *non* avere la lista infinita.

**Il pensiero che ne ricavo:** "avere sempre qualcosa da fare" **non è un pregio automatico**. Nei giochi normali è retention; nei cozy è oppressione. Se la nostra isola avesse sempre almeno tre cose in coda, sarebbe un gioco più coinvolgente e meno accogliente. **Il vuoto in cui non c'è niente di urgente è un ingrediente, non un difetto da riempire.**

### Quando l'ottimizzazione uccide la calma — i quattro innesti

Ricavati da me incrociando i casi sopra (**non è una citazione**, è la mia lettura):

| Innesco | Perché rompe la calma | Da noi? |
| --- | --- | --- |
| **Un numero di efficienza mostrato** (pezzi al minuto, percentuali) | Crea un "giusto" e uno "sbagliato" dove non c'era | ⚠️ Da evitare come la peste |
| **Parametri da regolare a mano** (soglie, valvole, priorità) | Trasforma la costruzione in configurazione | ⚠️ Rischio nostro, coi nastri |
| **Confronto con altri giocatori** | Ti dice che stai giocando male | ✅ Non ce l'abbiamo (gioco offline, niente classifiche) |
| **Una scadenza, anche morbida** (stagioni, giorni, energia) | Fa diventare l'ottimizzazione obbligatoria | ✅ Non ce l'abbiamo, ed è dichiarato non negoziabile |
| **La stessa impostazione da ripetere a mano N volte** | Autonauts: micro-gestione al posto del gioco | ⚠️ **Rischio nostro**, con macchine e nastri in serie |
| **Il menù che interrompe il gesto** | Forager: "non raggiunge mai il vero zen" | ⚠️ **Rischio nostro grosso**, abbiamo un inventario a caselle su schermo piccolo |
| **La lista che non finisce mai** | Coral Island: "bello e insieme un po' opprimente" | ⚠️ Da sorvegliare quando arriveranno animali e colture |

Su sette inneschi, **due li abbiamo già chiusi per statuto** e uno non ci riguarda. **Gli altri quattro dipendono tutti da come faremo nastri, macchine e magazzino** — cioè dalle prossime cose che costruiremo.

---

## 4. Il suono e il colore

### Il suono — pesa più di quanto sembra, e per noi è il rimpiazzo più economico degli NPC

Cosa dicono le fonti, in concreto:

- Esiste uno studio accademico recente dedicato **solo al suono nel genere cozy** ("Sounds Safe?", 2026): la sua tesi è che il suono nei cozy è **poco esplorato e molto promettente**, e che funziona come **strumento narrativo e affettivo**, non come decorazione ([Springer](https://link.springer.com/chapter/10.1007/978-3-032-12405-0_25); [DiVA](http://www.diva-portal.org/smash/record.jsf?pid=diva2:2024413)).
- Terra Nil: gli sviluppatori dicono esplicitamente di usare **musica gentile e delicata** per calmare il giocatore ([Gamerant](https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/)).
- Tiny Glade: **musica gentile + leggeri effetti d'ambiente** sono citati come il meccanismo che tiene il tono calmo ([Shacknews](https://www.shacknews.com/article/141431/tiny-glade-review-score)).
- La descrizione ricorrente degli strati sonori cozy: **suoni d'ambiente** (vento fra gli alberi, onde, pioggia sul vetro) + **musica** + **versi delle azioni** che confermano che il gesto è andato a segno ([SDLC Corp](https://sdlccorp.com/post/the-impact-of-audio-design-on-the-cozy-gaming-experience/)).

**Cose concrete e riproducibili che ne ricavo** (queste sono **mie**, derivate, non citate):

1. **Tre strati, non uno.** (a) fondo d'ambiente sempre acceso e senza inizio né fine riconoscibile; (b) musica **che può stare zitta** per lunghi tratti; (c) un verso corto per ogni azione dell'operaio.
2. **Il verso dell'azione va variato**, altrimenti diventa il rumore più odiato del gioco. Se l'operaio taglia legna 300 volte a sessione, servono almeno 3-4 varianti dello stesso colpo, con altezza leggermente diversa. Questo è il singolo accorgimento che separa "soddisfacente" da "insopportabile".
3. **Niente suoni di allarme.** Nessun *ding* acuto, nessun campanello di notifica: sono la firma sonora dei giochi mobile predatori.
4. **Il suono dell'ambiente deve cambiare con quello che hai costruito.** Se l'isola si riempie di macchine, il fondo si arricchisce di ronzii bassi e ritmici. **È il modo più economico che abbiamo per far "rispondere" il posto** — l'ingrediente 7 della tabella, ottenuto senza disegnare niente.
5. **La musica segue l'operaio.** Questa non è mia: è quello che fa Slime Rancher 2, dove **la musica parte lenta quando esplori e accelera quando lavori sul campo**. Da noi: quando l'operaio è al lavoro il fondo si anima, quando cammina o è fermo si calma. Costa poco e fa sembrare che il gioco ti stia guardando.

### Il colore — le fonti sono più deboli, lo dico, ma tre regole si salvano

**Attenzione:** le ricerche su "palette cozy" restituiscono quasi solo pagine commerciali di generatori di colore e wiki di estetica, non analisi di progettisti. **Non ci costruisco sopra numeri.** Cercando invece su *arte stilizzata e leggibilità* è uscito qualcosa di più solido. Tre regole concrete:

1. **Tre o quattro colori in tutto, e almeno uno neutro.** È la regola che gli artisti stilizzati citano più spesso ([80.lv, arte stilizzata](https://80.lv/articles/004adk-talking-about-stylized-character-art)). Da noi vuol dire: un verde isola, un marrone legno, un grigio pietra, e la sabbia come neutro che tiene insieme tutto. Gli accenti (minerali, macchine accese) **vengono dopo** e sono pochi.
2. **La leggibilità viene prima del bello.** In Dorfromantik i pilastri dichiarati sono **minimalismo, leggibilità e rilassamento**, in quest'ordine. Gli artisti stilizzati dicono la stessa cosa: **troppo dettaglio diventa rumore visivo**, e i dettagli devono aiutare la sagoma, non deformarla. Per noi: **se due minerali si confondono, la palette è sbagliata anche se è calda.**
3. **Le finestre calde accese fanno sembrare vivi gli edifici.** Questa è concreta e ripetuta: una luce calda alla finestra è la scorciatoia più economica per far sentire abitato un posto ([80.lv](https://80.lv/articles/inside-the-making-of-easy-delivery-co)). **Da noi vale doppio, perché non abbiamo nessuno:** una finestrella accesa nel casotto la sera è un abitante senza doverlo disegnare.

Su base e neutri, quello che ricorre nelle fonti più deboli e che comunque non contraddice nulla: **neutri caldi** sotto (crema, sabbia, avena, cacao) e accenti sopra, perché la base calda fa sembrare "posato" ogni accento invece che stridente; **bassa saturazione come scelta dichiarata**, che è quello che distingue l'estetica cozy (terrosa, "vita lenta") da quella "carino neon" ([Aesthetics Wiki](https://aesthetics.fandom.com/wiki/Cozy_Gamer)). Per l'interfaccia: angoli arrotondati, ombre appena accennate, testo scuro su pastello.

---

## 5. La casa

**Domanda:** vale la pena avere un posto da abbellire, o è decorazione che ruba tempo alla progressione?

Cosa ho trovato, e va detto subito che è **la sezione con le prove più scivolose**:

- Dal lato mercato, il dato è forte: **elementi di ristrutturazione/decorazione si trovano in ognuno dei primi 100 giochi casual più venduti negli USA usciti dal 2020** ([GameRefinery](https://www.gamerefinery.com/analyzing-home-decoration-systems-and-the-gameplay-elements-building-their-success/)). Numero **citato**, non mio.
- Le ragioni date sono sempre le stesse tre: **espressione di sé**, **realizzare una casa che nella vita non ti puoi permettere**, e **mostrarla ad altri**.
- **Il terzo motivo da noi non esiste**: siamo offline, nessuno vedrà mai l'isola. Questo indebolisce parecchio l'argomento a favore.

**La mia posizione, ed è un giudizio, non una citazione.**

Contro l'arredamento come sistema:
- La spina dorsale del gioco è **il tempo dell'operaio**. Un sistema di arredo o **costa tempo dell'operaio** (e allora compete con la fabbrica, e il giocatore che vuole ottimizzare lo salterà sentendosi in colpa) **oppure non ne costa** (e allora è fuori dal gioco, un menù a parte).
- La ragione "mostrarlo agli altri" non si applica.
- È esattamente il tipo di sistema che poi chiede altri sistemi: catalogo, valuta, sblocchi.

A favore di qualcosa di più leggero:
- Nei giochi senza NPC il posto **deve** dare qualcosa indietro, e la casa è uno dei pochi modi.
- Ma i giochi che ci somigliano (Dorfromantik, Terra Nil, Townscaper, Cloud Gardens) **non hanno una casa da arredare**. Ottengono lo stesso effetto **facendo abbellire l'isola come conseguenza del lavoro**, non come attività separata.

**Quindi la risposta che propongo: non una casa da arredare. Un'isola che si abbellisce da sola man mano che lavori.** L'erba che cresce dove hai smesso di scavare, i fiori sui sentieri consumati, un sentiero che si forma dove l'operaio passa spesso. **Zero tempo dell'operaio speso, zero menù nuovi, e l'ingrediente 7 e 8 della tabella li prendi tutti e due.**

Il casotto può restare un magazzino. Semmai è il **magazzino che si vede da fuori** — quando è pieno, si vedono le casse accatastate — che dà lo stesso piacere dell'arredo senza esserlo.

---

## 6. Cozy su telefono

C'è già una ricerca gemella su questo (`docs/ricerche/telefono-e-cozy.md`) che copre i **comandi**. Qui aggiungo solo quello che riguarda **la calma**, per non ripetere.

- Le liste di giochi cozy mobile convergono su una misura: **sessioni da 10 a 20 minuti**. Cozy Grove è citato esplicitamente così ("rispetta il tempo del giocatore, le sessioni durano davvero solo 10-20 minuti") ([ScreenRant](https://screenrant.com/best-mobile-cozy-games/)). Numero **citato**.
- Alba: A Wildlife Adventure è lodata perché **"rispetta il tuo tempo, con sessioni brevi e piacevoli"**.
- **Ma attenzione: Cozy Grove è anche il caso di studio di come si sbaglia.** Va in tempo reale, **non si può accelerare**, e offre solo una manciata di incarichi al giorno. Nelle discussioni Steam i giocatori chiedono **"perché posso giocare solo 2 ore al giorno a un gioco che ho comprato?"**. Gli sviluppatori hanno risposto: *"Non l'abbiamo progettato così perché volevamo che fosse un gioco mobile. L'abbiamo progettato così perché ci piace di più."* ([Steam, discussioni Cozy Grove](https://steamcommunity.com/app/1458100/discussions/0/3172198151251844943)).
- Disney Dreamlight Valley: **barra dell'energia che si consuma con quasi ogni azione**, compiti giornalieri e manutenzione continua, con **"cose nuove e fastidiose di cui occuparsi ogni volta che entri"** ([Geeks Under Grace](https://www.geeksundergrace.com/gaming/review-disney-dreamlight-valley/)).

**Quello che ne ricavo per noi** (mio):
- Il "rispetta il tuo tempo" dei recensori **non vuol dire "sessioni brevi obbligatorie"**: vuol dire **poter smettere quando vuoi senza perdere niente**. Cozy Grove ha confuso le due cose e si è preso le lamentele.
- Per noi la traduzione è: **una sessione da cinque minuti deve produrre un cambiamento visibile sull'isola.** Non un progresso in una barra: una cosa nuova che si vede. Se dopo cinque minuti l'isola sembra identica, la sessione breve è inutile e il gioco chiede sessioni lunghe senza dirlo.

---

## 7. Il pericolo — i segnali del finto cozy

Segnali che un gioco è carino fuori e stressante dentro. Ognuno è **osservato in un caso reale** sopra; la lista è mia.

| # | Segnale | Dove l'ho visto | Da noi |
| --- | --- | --- | --- |
| 1 | **Una risorsa che si consuma facendo le cose** (energia, stamina) | Disney Dreamlight Valley | ✅ Non ce l'abbiamo. **Non aggiungerla mai.** |
| 2 | **Tempo reale che non si può accelerare** | Cozy Grove | ✅ Non ce l'abbiamo |
| 3 | **Compiti giornalieri**, anche gentili | Cozy Grove, Dreamlight | ✅ Escluso per statuto |
| 4 | **Manutenzione**: cose che si rompono, si sporcano, vanno rifatte | Dreamlight ("cose nuove e fastidiose ogni volta che entri") | ⚠️ **Sorvegliare**: una macchina che si guasta sarebbe questo |
| 5 | **Un numero che misura quanto sei bravo** | Stardew (min-max), tutti i giochi di fabbrica | ⚠️ **Il nostro rischio principale** |
| 6 | **Parametri da regolare** invece che cose da costruire | Timberborn (le valvole) | ⚠️ **Il nostro secondo rischio** |
| 7 | **Il gioco decide il ritmo al posto tuo** | Cozy Grove | ✅ Non ce l'abbiamo |
| 8 | **Nulla di brutto succede, ma nemmeno nulla di bello** — calma senza risposta | (mio, dedotto) | ❌ **È dove siamo adesso** |

Il numero 8 è il più importante, e non l'ho trovato scritto da nessuno: l'ho dedotto. Tutti gli articoli parlano di *togliere* stress. Ma se togli lo stress e non metti niente al suo posto, non ottieni cozy: **ottieni tiepido.** Un gioco tiepido non è stressante e non è nemmeno accogliente: si smette e basta, senza rancore. **Noi abbiamo già fatto tutta la parte del togliere. La parte del mettere non è iniziata.**

---

## Cosa cambia da noi

| Trovata | Cosa tocca | Verdetto |
| --- | --- | --- |
| **L'isola si abbellisce da sola dove hai lavorato** (erba, fiori, sentieri consumati dal passaggio) | Disegno dell'isola, canvas | **Da fare.** È il rimpiazzo degli NPC più forte e non costa tempo dell'operaio |
| **Fondo sonoro a tre strati** (ambiente / musica che tace / verso dell'azione con 3-4 varianti) | Suono, nuovo | **Da fare.** È l'ingrediente mancante più economico |
| **La musica segue l'operaio**: si anima quando lavora, si calma quando cammina | Suono | **Da fare.** Copiato di peso da Slime Rancher 2, costa poco |
| **Il suono dell'isola cambia con quello che hai costruito** (più macchine = ronzio di fondo più ricco) | Suono | **Da valutare.** Effetto grosso, ma dopo i punti sopra |
| **Finestre calde accese** sulle costruzioni | Disegno | **Da fare.** Il modo più economico di far sembrare abitata un'isola senza abitanti |
| **Palette: 3-4 colori base con un neutro caldo**, accenti pochi e solo dove serve distinguere | Disegno, canvas | **Da decidere**, prima che l'isola cresca |
| **Se una cosa si fa, si deve poter fare a dieci copie** (nessuna impostazione da ripetere a mano) | Macchine, comandi | **Da fare.** È esattamente dove Autonauts si è rotto |
| **Il magazzino si vede e si tocca**: gli oggetti hanno una faccia riconoscibile, sistemarli è piacevole | Inventario | **Da valutare.** Unpacking dimostra che sistemare è già cozy di suo |
| **Nessun menù che interrompe il gesto**: le azioni frequenti si fanno senza aprire pannelli | Interfaccia | **Da fare.** È l'accusa esplicita a Forager, e su telefono ci colpisce doppio |
| **Un momento "arriva la pioggia"**: un evento visibile che premia un traguardo grosso (aprire un'isola, chiudere un'era) | Progressione, effetti | **Da decidere.** Terra Nil dimostra che vale, ma va scelto quale traguardo lo merita |
| **Nessun numero di efficienza mostrato** (mai "pezzi al minuto") | Interfaccia | **Da fare** — cioè da mettere per iscritto come divieto prima che serva |
| **Le macchine si costruiscono, non si configurano**: nessun parametro numerico da regolare | Macchine, nastri | **Da decidere ora**, prima di scrivere i nastri. È il punto in cui Timberborn si è rotto |
| **Ogni macchina appena costruita fa già una cosa sensata** senza toccare niente | Macchine | **Da fare** |
| **Cinque minuti devono cambiare l'isola visibilmente** | Ritmo, progressione | **Da valutare** — è un criterio di collaudo, non una funzione |
| **Casa da arredare, con catalogo di mobili** | — | **NON farlo.** Compete col tempo dell'operaio, e la ragione principale per cui piace (mostrarla ad altri) da noi non esiste. L'isola che si abbellisce da sola dà lo stesso effetto a costo quasi zero |
| **NPC di ritorno, anche muti (animaletti che ti seguono, spiriti)** | — | **NON farlo per ora.** Nessuno dei giochi cozy senza NPC ha dovuto rimetterceli. Se manca qualcosa, manca la *risposta* del posto, non una faccia |
| **Manutenzione delle macchine, guasti, usura** | — | **NON farlo.** È il segnale 4 del finto cozy, e violerebbe anche "niente fretta" |
| **Compiti giornalieri, obiettivi a scadenza, stagioni** | — | **NON farlo.** Già escluso, ma vale la pena riscriverlo qui perché è la ricaduta più comune |
| **Fare in modo che ci sia sempre qualcosa da fare** | — | **NON farlo.** Sembra un pregio ed è la lamentela di Coral Island ("bello e insieme un po' opprimente"). Il vuoto senza urgenze è un ingrediente, non un difetto |

**La cosa da decidere per prima**, perché blocca il resto: **i nastri e le macchine avranno parametri da regolare, sì o no?** Se sì, il gioco può ancora essere bello, ma smette di poter essere cozy. È esattamente la scelta su cui Timberborn ha spaccato il suo pubblico in due.

---

## Quello che NON ho trovato

Lo dichiaro invece di riempirlo.

- **Reddit: bloccato.** Come nelle ricerche precedenti. Zero risultati utilizzabili, non ho insistito.
- **Dati deboli sul colore.** Le ricerche su "palette cozy" restituiscono pagine commerciali di generatori di colori e wiki di estetica, non analisi di direttori artistici. Le tre regole in §4 vengono da articoli sull'arte stilizzata in generale, **non specifici dei cozy**: reggono, ma non sono una prova sul genere. **Se il colore conta davvero, serve una ricerca dedicata** su portfolio di artisti e articoli 80.lv dei singoli giochi.
- **Nessuna prova numerica che decorare aumenti la permanenza in un gioco *senza* componente sociale.** Il dato dei "100 giochi casual" viene dal mercato mobile free-to-play, che è pieno di condivisione e di confronto: non si trasferisce a un gioco offline come il nostro. Ne ho tenuto conto abbassando il peso della sezione 5.
- **Su Littlewood e Slime Rancher ho solo recensioni, non discussioni di giocatori.** Le ricerche restituivano liste di "giochi simili" invece di forum. Timberborn, Autonauts, Stardew e Cozy Grove sono i quattro casi su cui ho materiale di prima mano dai forum; Forager, Coral Island, Littlewood e Slime Rancher passano solo per recensioni.
- **Non ho trovato dati su quanto duri davvero una sessione media in un gioco cozy mobile.** I "10-20 minuti" sono la descrizione di un recensore su un gioco solo (Cozy Grove), non una misura del genere. Non trattarlo come un numero di riferimento.
- **Nessuna fonte che dica esplicitamente "si può essere cozy senza NPC".** Nessuno pone la domanda in quei termini. La risposta in cima al report è **mia**, ricavata mettendo in fila cinque giochi che di fatto lo fanno.
- **Non ho trovato la registrazione della sessione GDC sui cozy games**, se esiste. La fonte primaria del genere resta il rapporto di Project Horseshoe 2017, che è un documento scritto, non una conferenza.

---

## Fonti

**Definizione e teoria**
- [Project Horseshoe 2017 — rapporto, sezione cozy games](https://www.projecthorseshoe.com/reports/ph17/ph17r2.htm)
- [Lostgarden (Daniel Cook), "Cozy Games"](https://lostgarden.com/2018/01/24/cozy-games/)
- [Game Developer / Tanya X. Short (Kitfox), "Designing for Coziness"](https://www.gamedeveloper.com/design/designing-for-coziness)
- [80.lv, "Using Coziness in Game Design"](https://80.lv/articles/using-coziness-in-game-design)
- [Springer, "Sounds Safe? – An Initial Investigation into the Potential of Sound Within the Cozy Games Genre"](https://link.springer.com/chapter/10.1007/978-3-032-12405-0_25)

**Giochi senza personaggi**
- [80.lv, "How Dorfromantik Expands Its Cozy World Through Minimalist Design"](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design)
- [Game Developer, "Sparking joy through tile placement in Dorfromantik"](https://www.gamedeveloper.com/business/sparking-joy-through-tile-placement-in-idyllic-village-builder-i-dorfromantik-i-)
- [Digital Trends, intervista Dorfromantik](https://www.digitaltrends.com/gaming/dorfromantik-interview/)
- [Game World Observer, intervista Free Lives su Terra Nil](https://gameworldobserver.com/2022/09/30/terra-nil-free-lives-interview-reverse-city-builder-studio-ghibli)
- [Gamerant, intervista al lead artist di Terra Nil](https://gamerant.com/terra-nil-interview-free-lives-devolver-digital-nature-beauty-audience-engagement/)
- [Kotaku, Cloud Gardens](https://kotaku.com/cloud-gardens-is-a-relaxing-game-about-the-end-of-our-w-1847630552)
- [Comics Unearthed, "Cloud Gardens Puts A Great Spin On Environmental Storytelling"](https://www.comicsunearthed.com/cloud-gardens-puts-a-great-spin-on-environmental-storytelling/)
- [Shacknews, recensione Tiny Glade](https://www.shacknews.com/article/141431/tiny-glade-review-score)
- [The Hyperbolic Gamer, Townscaper e Dorfromantik a confronto](https://thehyperbolicgamer.com/2021/04/20/game-review-townscaper-and-dorfromantik-a-tale-of-two-citybuilders/)
- [Game Developer, "Unpacking the design pillars of a chill puzzle game"](https://www.gamedeveloper.com/design/unpacking-the-design-pillars-of-a-chill-puzzle-game)
- [Game Developer, "Unpacking: a narrative through 1,000 household items"](https://www.gamedeveloper.com/marketing/unpacking-a-narrative-through-1-000-household-items)
- [Game Developer, "Intimacy from the inanimate in Unpacking"](https://www.gamedeveloper.com/design/intimacy-from-the-inanimate-in-house-moving-puzzler-unpacking)

**Automazione e calma**
- [Steam, Timberborn — "Automation – the wrong approach?"](https://steamcommunity.com/app/1062090/discussions/0/805719526076400472/)
- [Steam, Timberborn — "thoughts on the new automation tools"](https://steamcommunity.com/app/1062090/discussions/0/809096595266101443/)
- [Steam, Timberborn — "I Think the Automation is Great!"](https://steamcommunity.com/app/1062090/discussions/0/809096929241791116/)
- [Dualshockers, abitudini che cambiano quanto Stardew è rilassante](https://www.dualshockers.com/stardew-valley-habits-that-completely-change-how-relaxing-the-game-feels-over-time/)
- [Steam, discussioni Stardew Valley sul min-maxing](https://steamcommunity.com/app/413150/discussions/0/604141990686296271)
- [Hacker News, "Stardew uno dei giochi più stressanti"](https://news.ycombinator.com/item?id=25887051)
- [Steam, Autonauts — "È normale sentirsi super stressati giocando a questo?"](https://steamcommunity.com/app/979120/discussions/0/3004423845036324734/)
- [Steam, Autonauts — "Bored"](https://steamcommunity.com/app/979120/discussions/0/1696095261008837609/)
- [TechRaptor, recensione Forager](https://techraptor.net/gaming/reviews/forager-review-waiting-game)
- [Shacknews, recensione Forager](https://www.shacknews.com/article/111379/forager-review-stay-up-on-that-grind)
- [Gayming Magazine, recensione Coral Island](https://gaymingmag.com/2023/11/coral-island-review/)
- [HubPages, recensione Slime Rancher 2](https://discover.hubpages.com/games-hobbies/slime-rancher-2-review-a-cozy-game-worth-every-penny)

**Suono, colore, casa, telefono**
- [SDLC Corp, "The Impact of Audio Design on the Cozy Gaming Experience"](https://sdlccorp.com/post/the-impact-of-audio-design-on-the-cozy-gaming-experience/)
- [Aesthetics Wiki, "Cozy Gamer"](https://aesthetics.fandom.com/wiki/Cozy_Gamer)
- [80.lv, arte stilizzata: forme, texture e prove](https://80.lv/articles/004adk-talking-about-stylized-character-art)
- [80.lv, dietro le quinte di Easy Delivery Co.](https://80.lv/articles/inside-the-making-of-easy-delivery-co)
- [GameRefinery, sistemi di decorazione della casa](https://www.gamerefinery.com/analyzing-home-decoration-systems-and-the-gameplay-elements-building-their-success/)
- [ScreenRant, migliori giochi cozy su telefono](https://screenrant.com/best-mobile-cozy-games/)
- [Steam, discussioni Cozy Grove sul tempo reale](https://steamcommunity.com/app/1458100/discussions/0/3172198151251844943)
- [Geeks Under Grace, recensione Disney Dreamlight Valley](https://www.geeksundergrace.com/gaming/review-disney-dreamlight-valley/)

**Reddit: bloccato dal proxy, nessuna fonte da lì.**
