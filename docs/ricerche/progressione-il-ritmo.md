# Il ritmo della progressione — quando arriva la cosa nuova

> Ricerca 7. Le sei precedenti stanno in questa cartella. Una si chiamava *"perché si smette"*: quella spiegava **le cause**. Questa parla di **orologio**: a che secondo, a che minuto, a che giorno, e ogni quanto va messa la roba nuova.
>
> 18 ricerche. **Reddit è risultato bloccato**, come nelle sei ricerche precedenti.

---

## In una riga

**Si gioca entro 60 secondi e si capisce perché è bello entro 90, il quarto d'ora decide la partita, poi serve una cosa nuova ogni 10-20 minuti a intervalli che si allargano ma non si fermano — e ogni sessione va chiusa lasciando in sospeso qualcosa, perché è l'unica cosa che riporta indietro il giocatore il giorno dopo senza obbligarlo con un regalo giornaliero.**

---

## 1. La prima sessione

### I numeri trovati

| Cosa | Numero | Tipo | Fonte |
| --- | --- | --- | --- |
| **Il ricettario di oggi (luglio 2026):** si gioca davvero entro | **60 secondi** | citato | Playio, *Onboarding Decides Your D1* |
| Il momento *"ah, ecco perché è bello"* entro | **90 secondi** | citato | idem |
| Presentazione iniziale, quanti passi al massimo | **2 passi o meno** | citato | idem |
| Se il momento *"è bello"* arriva dopo 90 secondi | *"una fetta importante non torna mai per la seconda sessione"* | citato | idem |
| Il numero da guardare davvero | il passaggio **sessione 1 → sessione 2** | citato | idem |
| *"Se i primi 15 minuti di un gioco fanno schifo, c'è una grossa probabilità che il giocatore non giochi oltre"* | **15 minuti** | citato | Factorio, Friday Facts #241 |
| Quanto metteva il vecchio tutorial di Factorio ad arrivare all'automazione | **30-45 minuti** | citato | Factorio, FFF #342 |
| Giudizio degli autori su quel numero | è un **difetto**: l'automazione *"è di cosa parla il gioco"* | citato | Factorio, FFF #342 |
| Quanto ha lavorato Factorio **sui soli primi 30 minuti** | *"tante ore quante alcuni giocatori ne spendono su una megabase intera"* | citato | Factorio, FFF #241 |
| Durata della "prima esperienza" (FTUE) nei manuali | **10-60 minuti**, i primi **30** sono i più importanti | citato | manuali FTUE |
| Ritenzione giorno 1, media di tutti i giochi da telefono | **27%** | citato | benchmark 2025 |
| Ritenzione giorno 1, mediana | **~22%** | citato | benchmark 2025-26 |
| Ritenzione giorno 1, giochi di **strategia** | **25,4%** — sotto media *"perché la loro profondità ci mette di più ad agganciare"* | citato | benchmark 2025 |
| Ritenzione giorno 1, giochi di **incastro/puzzle** | **31,9-32,7%** | citato | benchmark 2025 |
| Ritenzione giorno 1 casual: primo quarto / mediana / ultimo quarto | **28% / 20% / 12%** | citato | benchmark casual |

### Le tre cose che ne ricavo

**Il quarto d'ora non è un modo di dire dei blog.** È scritto nel devlog degli autori di Factorio, e lo scrivono come **il motivo per rifare il tutorial da capo**. La ricerca *"perché si smette"* ci era arrivata da un'altra strada. Due strade, stessa cifra.

**Il tempo prima del cuore del gioco è un costo, non un percorso.** Factorio ha misurato 30-45 minuti fino all'automazione e li ha trattati come un guasto da riparare, non come una bella introduzione.

**Noi partiamo dalla parte sfavorita della classifica.** I giochi profondi stanno **7 punti sotto** i giochi di incastro al giorno 1, e la spiegazione pubblicata è esplicita: la profondità ci mette di più ad agganciare. Il nostro tetto realistico al giorno 1 è la fascia **25-30%**, non 40. E soprattutto: **non possiamo permetterci un inizio lento**, perché paghiamo già una tassa di genere.

### La scaletta che ne deriva

I primi due righi sono **citati** (Playio). Dal terzo in giù sono **derivati da me**, incrociando la cadenza di acquisto già nota alle nostre ricerche.

| Momento | Cosa deve essere già successo | Tipo |
| --- | --- | --- |
| **entro 60 secondi** | Il giocatore sta **giocando davvero**, non guardando. Al massimo due passi di presentazione. Niente nome da scegliere, niente schermata prima del primo colpo d'ascia. | **citato** |
| **entro 90 secondi** | È arrivato il *"ah, ecco"*. Da noi: **il numero delle monete è salito grazie a una cosa che ha fatto lui**, e lui l'ha collegato. | **citato** |
| **entro 2 minuti** | Ha **comprato** la prima cosa. La ricerca *numeri e curve* dava un acquisto ogni 1,5-3 minuti: il primo va all'inizio della forbice, non alla fine. | derivato |
| **entro 5 minuti** | Ha comprato 2-3 volte e ha in bacheca **una cosa spenta che vuole** e non può permettersi. È lì che nasce il motivo di tornare. | derivato |
| **entro 15 minuti** | Ha visto **qualcosa che lavora senza di lui**. Non l'era intera delle macchine: basta un accenno — il vivaio che ricresce mentre è altrove, o il primo pezzo dell'Era 1 già acceso. Se al quarto d'ora è ancora tutto "tocca e aspetta", siamo dentro la finestra di abbandono. | derivato |

> **Questo tocca una scelta già presa.** L'Era 1 (Il Fuoco) è la prima con macchine, e la sintesi dice già *"la prima macchina deve arrivare già alimentata"*. Aggiungo il pezzo che mancava: **deve anche arrivare presto**. Il quarto d'ora è il limite. Se la fascia di costo dell'Era 1 (600-2.000 monete) richiede più di 15 minuti per il primo pezzo, **la fascia è sbagliata**, non il giocatore. È misurabile con `npm run simula`.

---

## 2. La cadenza degli sblocchi

### Regole nominate

| Regola | Numero | Tipo | Fonte |
| --- | --- | --- | --- |
| Una cosa **nuova** ogni | **10-20 minuti** | citato | ricerca *numeri e curve*, già in `SINTESI.md` |
| Un **acquisto** ogni | **1,5-3 minuti** | citato | idem |
| **Nintendo, la regola dei quattro passi** (*kishōtenketsu*): un'idea nuova viene **presentata, sviluppata, ribaltata e messa via** in circa | **cinque minuti netti** | citato | Koichi Hayashida / Miyamoto, via MCV e Nintendo Life |
| L'inizio di un'economia f2p ha *"guadagni alti, costi bassi e **cadenza di sblocco veloce**"* | qualitativo | citato | guide all'economia f2p |
| **Anelli aperti** (*open loops*): ogni giro successivo richiede **più tempo del precedente** | la forma della curva | citato | manuali FTUE |
| Satisfactory: i livelli non si aprono tutti, **si aprono a ondate** | struttura | citato | wiki ufficiale Satisfactory |
| Satisfactory: ogni fase dell'Ascensore Spaziale apre **due livelli alla volta** (Fase 1 → 3 e 4, Fase 2 → 5 e 6, Fase 3 → 7 e 8, Fase 4 → 9) | **2 alla volta** | citato | idem |
| Mai più di **8-9** cose desiderabili aperte insieme | **8-9** | citato | ricerche precedenti |

### Le tre risposte

**Ogni quanto?** Due orologi, e servono tutti e due. Il grande: **una cosa nuova ogni 10-20 minuti**. Il piccolo: **un acquisto ogni 1,5-3 minuti**, che riempie lo spazio in mezzo. Senza il piccolo, i venti minuti sono un deserto; senza il grande, si compra sempre la stessa cosa a un prezzo più alto.

E c'è un **terzo orologio, quello di Nintendo, che non avevamo**: cinque minuti per il ciclo di vita di **un'idea**. Non "una cosa nuova ogni cinque minuti" — quello sarebbe insostenibile — ma: *quando presenti un'idea nuova, il giro completo che la fa capire dura circa cinque minuti.* È il tempo di una sessione da telefono. Non è un caso: torna nella sezione 5.

**Deve restare uguale o diradarsi?** **Diradarsi, ma non fermarsi.** La regola degli anelli aperti dice che ogni giro costa più tempo del precedente, e la struttura di Satisfactory lo conferma: i primi livelli si aprono subito e in blocco, gli ultimi stanno dietro fasi lunghe. Il limite del diradarsi: quando l'intervallo supera **due o tre sessioni intere** (su telefono, oltre ~20 minuti di gioco effettivo = 3-4 aperture dell'app), il giocatore non collega più lo sforzo al premio.

**La trovata che non avevo previsto: aprire a coppie.** Satisfactory non apre un livello alla volta, ne apre **due**. Il motivo vale anche per noi: due progetti insieme danno **una scelta** ("quale faccio prima?") invece di un corridoio, e coprono il vuoto se uno dei due non interessa. Con 38 progetti in 5 ere, aprirli **a coppie o a terne** risolve insieme due nostri problemi: la sensazione di corridoio, e la regola del "mai più di 8-9 desideri insieme".

### La cadenza proposta per noi (derivata)

| Fascia di gioco | Una cosa nuova ogni | Perché |
| --- | --- | --- |
| Primi 15 minuti | **2-4 minuti** | siamo nella finestra di abbandono, e la cadenza f2p all'inizio è "veloce" |
| Da 15 a 60 minuti | **7-10 minuti** | il ciclo è capito, si può allargare |
| Dopo la prima ora | **15-20 minuti** | il tetto della regola citata |
| Ere 3 e 4 | **una sessione intera** (~20-30 min di gioco) | ma **mai** oltre, e sempre con qualcosa di piccolo in mezzo |

---

## 3. I punti di abbandono nel tempo

### Telefono

| Cosa | Numero | Tipo | Fonte |
| --- | --- | --- | --- |
| Bersaglio *"sano"* pubblicato, giorno 1 / 7 / 30 | **30-40% / 10-20% / 5-10%** | citato | benchmark 2025 |
| **Mediana reale**, giorno 1 / 7 / 30 | **~22% / ~4% / sotto l'1%** | citato | benchmark 2026 |
| Mediana giorno 30, altra misura | **0,68-0,79%** | citato | benchmark 2025 |
| Migliore 25% al giorno 30 | **1,6-1,8%** | citato | idem |
| Peggiore 25% al giorno 30 | **sotto lo 0,5%** | citato | idem |
| Migliore 1% dei titoli | **64-68% al giorno 1, oltre 25% al giorno 7** | citato | benchmark 2025 |
| Al giorno 30 hanno smesso | **oltre il 95%**, su iOS e su Android | citato | benchmark 2025 |
| Tempo di gioco mediano al giorno, tutti i giochi | **22 minuti** (2024) | citato | benchmark |
| Dove si forma l'abitudine | **giorno 2**: *"si è divertito ieri, ma c'è un motivo per tornare oggi?"* | citato | RoLearn, *First Week Retention* |

> **La riga più importante di questa tabella.** C'è un abisso fra il bersaglio "sano" che girano i blog (5-10% al giorno 30) e la mediana vera (sotto l'1%). Sono numeri **di ordine di grandezza diverso**. Quei "bersagli sani" sono i numeri dei giochi con un budget di marketing dietro, non dei giochi normali. **Per un gioco fatto da una persona sola, la mediana è la realtà e il bersaglio sano è pubblicità.** Se al giorno 7 restasse il 10% di chi ha installato, saremmo già nel quarto migliore del mercato.

**Dove sta il muro, in giorni.** Nessuna fonte dice "il giorno X è il punto di rottura". Quello che i numeri dicono è che **il crollo è tutto fra il giorno 1 e il giorno 7**: da 22% a 4% se ne va oltre l'80% di chi era rimasto. Dal 7 al 30 la curva è quasi piatta. Quindi la battaglia è **la seconda apertura e la prima settimana**; chi arriva al giorno 7 in buona parte arriva anche al 30.

E il punto singolo più stretto è **il passaggio dalla prima alla seconda sessione**, che i manuali indicano come **il numero da guardare**, perché è quello che decide il giorno 1.

### PC — i giochi di costruzione e automazione

| Cosa | Numero | Tipo | Fonte |
| --- | --- | --- | --- |
| Tempo di gioco mediano dei giochi di costruzione su Steam | **oltre 5,4 ore** — fra i generi più alti | citato | analisi su profili pubblici Steam |
| Tempo di gioco mediano dichiarato in un sondaggio fra sviluppatori | **14 minuti** | citato | *How To Market A Game* |
| Mediana di una demo, per fascia di incasso del gioco | **7 / 18 / 38 / 65 minuti** dalla più bassa alla più alta | citato | idem |
| Un giocatore che molla Satisfactory | **~50 ore**, *"mi sono annoiato"* | citato | Discussioni Steam |
| Sentimento diffuso su Satisfactory | **stanchezza a metà partita** | citato | Discussioni Steam |
| Factorio, commento di un giocatore | *"il giocatore medio che si brucia ha 500+ ore"* | citato | Discussioni Steam |
| Factorio, causa della stanchezza dopo **200+ ore** | mancanza di **progetti / copia-incolla** → costruire a mano diventa ripetitivo | citato | Discussioni Steam |

**Tre muri, non uno.**

1. **Il muro dei minuti.** Mediana dichiarata 14 minuti, demo fra 7 e 65. La maggior parte della gente non arriva alla seconda ora. **È lo stesso muro del quarto d'ora**, visto con un altro strumento.
2. **Il muro delle ~50 ore** (Satisfactory): metà partita, quando il gioco chiede di rifare in grande quello che hai già fatto in piccolo. **È esattamente il muro della ricostruzione** che la sintesi aveva già trovato.
3. **Il muro delle 200-500 ore** (Factorio): arriva solo quando manca lo strumento per **smettere di ripetere a mano**. La causa citata è precisa: niente copia-incolla, niente progetti salvati.

Il terzo non ci riguarda: nessuno farà 200 ore su un gioco da telefono fatto da una persona. **Il primo e il secondo sì.**

---

## 4. Come si insegna un gioco complicato senza tutorial

| Trovata | Tipo | Fonte |
| --- | --- | --- |
| **La regola dei quattro passi di Nintendo**: introduzione → sviluppo → ribaltamento → conclusione. Un'idea nuova viene insegnata e messa via **in circa cinque minuti netti** | citato | Hayashida/Miyamoto, via MCV e Nintendo Life |
| Passo 1 — l'idea si presenta **in un posto sicuro**, dove si può provare senza rischiare niente | citato | idem |
| Passo 2 — la stessa idea, ma **in una situazione pericolosa** | citato | idem |
| Passo 3 — succede qualcosa che **te la fa vedere in un modo che non ti aspettavi** | citato | idem |
| Passo 4 — la dimostri, e la padronanza è tua | citato | idem |
| Half-Life 2 e Portal insegnano **senza finestre a comparsa**, e usano la stessa scuola in tutti e due | citato | analisi su materiale di progettazione Valve |
| **La recinzione**: il primo zombie sta dietro una rete, così impari che lancia oggetti **senza prenderne uno in faccia** | citato | idem |
| **Ripetizione con difficoltà che sale di poco**: a inizio Episode One si lanciano palle di energia nei connettori più volte, ogni volta un filo più difficile, *per non sovraccaricare il giocatore* | citato | idem |
| Portal: **ogni ostacolo è una lezione** che rinforza sottovoce una regola già data | citato | idem |
| **Rivelazione progressiva**: mostra l'informazione **solo quando diventa utilizzabile**, con avvisi legati allo stato del giocatore invece che sequenze imposte | citato | manuali FTUE |
| *"Dai il minimo indispensabile per cominciare a giocare"* | citato | idem |
| Il tech tree è **prima di tutto uno strumento didattico**: serve a far salire la complessità un gradino alla volta | citato | letteratura sui tech tree |

### La cosa più forte di tutta la ricerca

**Nintendo e Valve, indipendentemente, cominciano allo stesso modo: il posto sicuro.** Il primo zombie dietro la rete e il "passo 1 in un posto dove non puoi perdere una vita" sono la stessa identica mossa, in due studi che non si parlano.

E Nintendo ci mette anche **il numero che ci mancava**: il ciclo di vita di un'idea è **cinque minuti**.

### Come si applica da noi

Noi abbiamo **un vantaggio che i manuali non hanno**: la bacheca dei progetti **è già** rivelazione progressiva. Un progetto spento col suo costo dice tre cose senza una parola di tutorial — *esiste*, *costa tanto*, *non ancora*.

Quello che manca è **il posto sicuro**. Ogni concetto nuovo deve avere una prima volta che non può fallire:

| Concetto | La sua "prima volta sicura" |
| --- | --- |
| **La macchina** (8-12) | arriva **già accesa e già rifornita** — la sintesi l'aveva già trovato, ed è precisamente la recinzione di Half-Life |
| **Il combustibile** | la prima volta che finisce, finisce **mentre il giocatore è lì e la sta guardando**, non mentre è dall'altra parte dell'isola |
| **La corrente** (15-16) | il primo palo copre **già tutto** quello che il giocatore possiede: impara cos'è la copertura **prima** di imparare che può mancare |
| **Il nastro** (21) | il primo nastro è **corto e dritto**, fra due cose che il giocatore già collega a mano tutti i giorni |
| **La seconda isola** (24-26) | la prima traversata porta qualcosa **già caricato**: si impara "si può andare di là" prima di "bisogna organizzare il carico" |

E il quarto passo di Nintendo — *"lo dimostri"* — da noi ha una forma naturale: **il progetto successivo dello stesso mestiere**. La segheria a corrente (18) è il passo 4 della segheria a legna (8). Non è un doppione: **è l'esame**.

---

## 5. Il ritmo di una sessione da telefono

| Cosa | Numero | Tipo | Fonte |
| --- | --- | --- | --- |
| Sessione mediana su telefono | **5-6 minuti** (2025) | citato | benchmark |
| Sessione mediana, migliore 25% dei titoli | **8-9 minuti** | citato | benchmark |
| Sessione mediana di un gioco *idle* | **8 minuti** | citato | GameRefinery |
| Sessione mediana su tutte le aree geografiche | **4 minuti e 45 secondi** | citato | benchmark 2024 |
| Quante volte si apre l'app al giorno | **4-6** | citato | ricerche precedenti |
| Tempo di gioco mediano al giorno | **22 minuti** | citato | benchmark 2024 |
| Ciclo di vita di un'idea, secondo Nintendo | **5 minuti netti** | citato | vedi §4 |

**I conti tornano da soli**: 4-6 aperture × 5 minuti ≈ 20-30 minuti al giorno, e la misura indipendente dice 22. **La giornata tipo di un nostro giocatore è: cinque bocconi da cinque minuti.**

E il boccone da cinque minuti **coincide** con il ciclo di vita di un'idea secondo Nintendo. Non è una coincidenza da sfruttare a caso, ma dice una cosa pratica: **una sessione da telefono è esattamente la misura giusta per far capire una cosa nuova.** Né mezza, né tre.

### La regola nominata: "si entra facile, si esce facile"

> **Easy In, Easy Out** — *"il giocatore deve poter entrare, arrivare in fretta a una parte di valore del gioco, e poi avere la possibilità di uscire senza dolore."*
> — manuali di progettazione delle sessioni su telefono

Le tre parti contano tutte e tre, e **la terza è quella che di solito si sbaglia**. "Uscire senza dolore" vuol dire: non lasciare mai il giocatore in uno stato in cui chiudere l'app gli costa qualcosa.

### Cosa deve stare in cinque minuti (derivato)

Il boccone deve contenere **almeno una cosa chiusa**. Non "un po' di progresso": una cosa che era aperta e adesso è chiusa. Con un acquisto ogni 1,5-3 minuti, in cinque minuti ci stanno **2-3 acquisti**, oppure **un acquisto e mezzo passo verso una cosa grossa**.

| In 5 minuti deve poterci stare | Non deve servire |
| --- | --- |
| raccogliere il frutto dell'offline **e spenderlo** | leggere una schermata di riepilogo lunga |
| comprare 2-3 cose | ricordarsi dove si era rimasti |
| finire **un** progetto piccolo | mettere in fila cinque azioni prima di vedere un effetto |
| far partire una cosa lunga che matura fuori dall'app | tornare entro un orario preciso |

**Come si evita che diventi banale.** I bocconi devono essere **corti da giocare e lunghi da capire**: la decisione dura cinque minuti, la sua conseguenza dura ore. Da noi c'è già ed è la regola 8 del `CLAUDE.md` (*esercito o rendita*; qui: *comprare adesso o accumulare per la macchina*). **Il boccone corto non è la decisione: è l'esecuzione di una decisione lunga.** Se in cinque minuti il giocatore esegue, va bene. Se in cinque minuti deve anche *decidere tutto da zero*, è troppo.

### Il pezzo che manca al nostro progetto: l'affare lasciato a metà

Questa è la trovata più utile della ricerca sul giorno 2, e ci riguarda in modo diretto.

I manuali indicano **tre** ganci per far tornare il giocatore il giorno dopo. Uno è il **regalo giornaliero** — e noi l'abbiamo già escluso, con ragione documentata (`PROGETTI.md`: *"trasformano l'aprire in un dovere"*). Ma il primo della lista è un altro:

> **"Affari lasciati a metà" (*unfinished business*): progetta il ciclo principale in modo che crei da solo dei punti sospesi.**

E c'è una precisazione importante, che ho trovato dichiarata:

> L'effetto Zeigarnik ("le cose lasciate a metà si ricordano meglio") **in laboratorio ha retto male**, replicato male per decenni. Quello che regge è **l'effetto Ovsiankina**: non un ricordo migliore, ma **una spinta reale e ben documentata a tornare a finire quello che è rimasto aperto.**

Questo è il gancio giusto per noi, perché **non è un dovere**: non c'è nessuna scadenza, nessuna penale, nessun regalo che scade. È solo una cosa aperta che aspetta.

**Cosa vuol dire in pratica, da noi** (derivato):

| Forma | Come si vede |
| --- | --- |
| **Il progetto quasi comprato** | la bacheca mostra *"ti mancano 40 monete"*, non solo il prezzo. È l'affare più aperto che ci sia |
| **La macchina che sta finendo il legno** | un lavoro in corso che sta per fermarsi, e lo si vede da fuori |
| **La cosa lunga messa in moto** | l'operaio o la macchina che stanno completando qualcosa: si chiude l'app **mentre sta succedendo** |
| **Il pezzo mancante** | 3 lastre su 4 per l'officina: manca **una** cosa, e si sa quale |

Nessuna di queste ha una scadenza. Tutte sono "affari a metà". **E tutte si ottengono senza aggiungere niente al gioco**: sono modi di *mostrare* uno stato che il gioco già ha.

### Il rientro dall'offline

| Trovata | Tipo | Fonte |
| --- | --- | --- |
| Il giocatore deve tornare e trovare **sempre** una ricompensa, anche se non stava giocando | citato | manuali sui giochi idle |
| *"Invece di aprire l'app e trovare una lista di cose da fare, la apre e trova una lista di premi"* | citato | idem |
| **Il tetto serve**: oltre quel punto l'accumulo si ferma, e crea la sensazione di **occasione persa** che spinge a rientrare | citato | idem |

Il nostro tetto di quattro ore quindi è **giusto e fa un lavoro doppio**: limita e insieme invita.

> **Ma c'è un rischio che nessuna fonte dice e che va detto qui:** se il raccolto delle quattro ore si incassa con **un tocco solo**, la sessione dura venti secondi, non cinque minuti. La sessione da cinque minuti esiste solo se **spendere richiede scelte**. Un pulsante "raccogli tutto" seguito da un pulsante "compra il prossimo" è una sessione da venti secondi travestita.

---

## 6. Il momento del salto d'era

| Trovata | Tipo | Fonte |
| --- | --- | --- |
| Satisfactory apre i livelli **a ondate**, e ogni fase ne apre **due** | citato | wiki ufficiale Satisfactory |
| Il salto è legato a **una consegna**, non a un contatore: si porta roba all'Ascensore Spaziale | citato | idem |
| Il livello 8 è descritto come **brutale**, perché bisogna **rimettere in piedi i materiali di base** per tutto quello che i livelli 7 e 8 aprono insieme | citato | Discussioni Steam |
| Dove il senso di progresso di Satisfactory si spegne: *"è gestito bene fino a un certo punto, poi quando hai lo zaino a reazione e tutte le armi, si ferma"* | citato | idem |
| **Civilization VII, il caso da non imitare**: al cambio d'era il gioco **ti obbliga a cambiare civiltà e ti fa perdere risorse**. I giocatori lo descrivono come così **dirompente** da forzare un modo di giocare innaturale, e dicono che **chi ha giocato bene all'inizio viene punito** | citato | Discussioni Steam, Civ VII |
| **Terraria, l'altro caso da non imitare**: si entra in Hardmode **senza accorgersene e senza attrezzatura**, e ci si ritrova frustrati di non aver finito il contenuto di prima | citato | Discussioni Steam, Terraria |
| Il **ritmo** del premio conta più del premio: in Fallout 4 l'armatura potenziata arriva in pochi minuti e non dà **nessun senso di conquista**. Stesso premio, ritmo diverso, sensazione opposta | citato | letteratura sulla progressione |

### Le cinque cose che ne ricavo

**1. Il salto va conquistato con una consegna, non con un contatore.** Satisfactory non dice *"hai 10.000 monete, benvenuto nell'era 2"*. Dice: *porta questa roba qui*. La differenza è che una consegna il giocatore **la vede arrivare**, la prepara, e quando la completa **sa perché è successo**. Un contatore che scatta da solo gli arriva addosso — ed è precisamente il difetto di Terraria: si entra in Hardmode senza accorgersene.

> Da noi il modello **esiste già ed è il pontile** (progetto 24): *"si apre costruendo, non trovando una chiave"*. Quella frase è, senza saperlo, esattamente l'Ascensore Spaziale. **Va estesa a tutti e cinque i salti d'era**, non lasciata solo alla seconda isola.

**2. "Sembra di ricominciare da capo" ha due cause diverse, e tutte e due sono documentate.**

- **Ti tolgono qualcosa** (Civ VII: cambi civiltà, perdi risorse). I giocatori usano la parola *punito*.
- **Ti obbligano a rifare le basi** (Satisfactory livello 8: rimettere in piedi i materiali di base per tutto il nuovo). I giocatori usano la parola *brutale*.

La seconda è **il muro della ricostruzione** che la sintesi aveva già trovato. La prima è nuova, e per noi è una tentazione reale: al salto d'era viene naturale "azzerare" qualcosa per far ripartire la curva. **Non si fa.**

> **La domanda di collaudo di ogni salto d'era:** *nei primi cinque minuti dell'era nuova, tutto quello che il giocatore aveva costruito nell'era vecchia sta ancora lavorando, e non gli è stato tolto niente?* Se la risposta è no, il salto è progettato male.

**3. L'era nuova deve arrivare con qualcosa che funziona subito.** Il caso Fallout 4 sembra dire il contrario, ma non è così: il problema lì è che il premio grosso **arriva senza essere stato desiderato**. Da noi il desiderio è già stato pagato (bacheca spenta col prezzo, per ore). Quindi al salto possiamo essere generosi: **il primo pezzo dell'era nuova va dato acceso e funzionante.**

**4. Al salto si aprono due o tre cose, non otto.** Il livello 8 è brutale anche perché ne apre troppe insieme. Combinato con la nostra regola degli 8-9 desideri visibili: **al salto d'era si accendono 2-3 progetti**, il resto dell'era resta spento ma visibile.

**5. Il salto deve vedersi, non essere annunciato.** Nessuna fonte dà un numero su questo, ma tutta la sezione 4 (Nintendo, Valve) dice la stessa cosa in generale: **quello che si insegna con un testo non si impara**. Se il salto d'era è un cartello che dice "Era 2: La Corrente", è un cartello. Se l'isola cambia — un colore, una luce, un suono, un pezzo di mappa che si apre — è successo qualcosa.

### La forma proposta per un salto d'era (derivata)

| Passo | Cosa succede |
| --- | --- |
| 1 | Il progetto-soglia compare **spento** con largo anticipo: il giocatore lo guarda da un pezzo |
| 2 | Si sblocca **costruendo o consegnando**, non raggiungendo un numero |
| 3 | Al completamento **l'isola cambia visibilmente**, senza testo |
| 4 | Si aprono **2-3 progetti**, non l'era intera |
| 5 | Il primo pezzo dell'era arriva **già acceso** |
| 6 | Tutto quello dell'era vecchia **continua a lavorare** e produce i pezzi per la nuova |
| 7 | **Non viene tolto niente**: nessun azzeramento, nessuna risorsa persa, nessuna macchina da smontare |

---

## Cosa cambia da noi

| # | La trovata | Cosa tocca nel nostro progetto | Stato |
| --- | --- | --- | --- |
| 1 | **Si gioca entro 60 secondi, il "ah, ecco" entro 90.** Al massimo due passi prima del gioco vero | avvio dell'app, prima schermata | **da fare** — è il numero più duro e più citabile della ricerca |
| 2 | **La prima macchina va vista entro 15 minuti.** Se la fascia 600-2.000 monete dell'Era 1 non ci arriva, è la fascia a essere sbagliata | `PROGETTI.md` Era 1, `MATERIALI.md` | **da fare** — misurabile con `npm run simula` |
| 3 | **Primo acquisto entro 2 minuti**, non 3 | `config/`, prezzo del primo progetto | **da fare** |
| 4 | **Cadenza a scaglioni**: 2-4 min nei primi 15, 7-10 min fino all'ora, 15-20 min dopo. Non una cadenza sola per tutto | `MATERIALI.md`, ordine dei 38 progetti | **da decidere** — è una curva, la tara l'autore |
| 5 | **Sbloccare a coppie, non uno alla volta**: due progetti danno una scelta, uno dà un corridoio | `PROGETTI.md`, bacheca | **da valutare** |
| 6 | **Ogni concetto nuovo ha un "posto sicuro"** (Nintendo passo 1 + recinzione di Valve): macchina già accesa, combustibile che finisce mentre guardi, primo palo che copre già tutto, primo nastro corto e dritto, prima traversata già carica | `GDD.md`, progetti 8/15/16/21/24 | **da fare** — costa poco e sostituisce il tutorial |
| 7 | **Il quarto passo di Nintendo è già nel nostro albero**: la versione a corrente di una macchina è *l'esame* della versione a legna. Va detto, così non sembra un doppione | `PROGETTI.md` 18-19-20 | **da fare** — è una riga di motivazione, non codice |
| 8 | **Chiudere ogni sessione con un affare a metà** — e non con un regalo giornaliero, che resta escluso. Quattro forme già disponibili: *"ti mancano 40 monete"*, macchina che sta per fermarsi, cosa lunga in corso, pezzo mancante | bacheca, indicatori sul canvas | **da fare** — il gancio del giorno 2 che ci mancava, e non viola nessuna regola |
| 9 | **Il raccolto dell'offline non deve incassarsi in un tocco.** Un "raccogli tutto" fa una sessione da 20 secondi travestita da cinque minuti | rientro dall'offline | **da decidere** — tocca il tetto delle 4 ore |
| 10 | **Il salto d'era si conquista con una consegna, non con un contatore.** Il modello del pontile va esteso a tutti e cinque i salti | `PROGETTI.md`, tutte le ere | **da decidere** — cambia la struttura dell'albero |
| 11 | **Al salto d'era si aprono 2-3 progetti**, non l'era intera | bacheca, regola degli 8-9 | **da fare** — risponde alla domanda già aperta in `PROGETTI.md` §4 |
| 12 | **Al salto non si toglie niente** (caso Civ VII) **e non si rifanno le basi** (caso Satisfactory livello 8) | `GDD.md` §11b | **da fare** — estende la regola "non si smonta mai" al momento più a rischio |
| 13 | **La domanda di collaudo del salto d'era**: *nei primi 5 minuti dell'era nuova, la roba vecchia lavora ancora e non è stato tolto niente?* | agente `collaudo` | **da fare** |
| 14 | **Il salto d'era si vede sull'isola**, non si annuncia con un testo | canvas, `isola-sensazione` | **da valutare** |
| 15 | **Il boccone da 5 minuti è esecuzione, non decisione da zero** | `GDD.md` §14 | **da valutare** |
| 16 | **Aspettarsi la mediana, non il "bersaglio sano".** Un 10% al giorno 7 ci metterebbe già nel quarto migliore del mercato. Non usare i numeri dei blog come metro di fallimento | una riga nel `GDD.md` | **da fare** |

---

## Quello che NON ho trovato

Scritto qui perché non venga riempito a fantasia più tardi.

- **Una regola pubblicata da un progettista del tipo "una cosa nuova ogni X minuti".** Non esiste in nessuna fonte che ho raggiunto. Il **10-20 minuti** viene dalla nostra ricerca precedente, non da un manuale citabile. Di pubblicato ho trovato solo cose **qualitative** ("cadenza veloce all'inizio", "ogni giro più lungo del precedente") e **il numero di Nintendo**, che però misura una cosa diversa: la vita di *un'idea* (5 minuti), non l'intervallo fra due idee.
- **Numeri di abbandono per ora di gioco nei giochi di costruzione su PC.** Il "muro delle 50 ore" e quello delle "200-500 ore" vengono da **commenti di singoli giocatori** su Discussioni Steam, non da dati. Vanno trattati come aneddoti che concordano fra loro, non come misure.
- **Dati di ritenzione di un gioco di automazione o gestione *su telefono*.** I benchmark che ho trovato sono per genere grosso (strategia, simulazione, casual, idle), mai per il nostro incrocio.
- **Quanto tempo passa fra un'era e l'altra** in un gioco riuscito. Nessuna fonte pubblica le ore per era, né per Satisfactory né per i modpack. La sesta ricerca aveva già dichiarato lo stesso buco: **è il secondo report di fila che lo dichiara.**
- **Uno studio che misuri se sbloccare a coppie funziona meglio che uno alla volta.** La struttura di Satisfactory è un fatto; il beneficio è un mio ragionamento.
- **Un numero per "quanto deve cambiare l'aspetto dell'isola perché il salto si senta".**
- **Una misura di quanto l'"affare a metà" alza la ritenzione.** L'effetto Ovsiankina è dichiarato ben documentato in psicologia, ma non ho trovato **nessun numero** applicato a un gioco.
- **Reddit.** Bloccato allo strumento di ricerca, come nelle sei ricerche precedenti. Le voci dei giocatori vengono da Discussioni Steam e dai forum ufficiali.

---

## Fonti

**Devlog e materiale di prima mano**
- Factorio, *Friday Facts #241 — New player experience* — factorio.com/blog/post/fff-241
- Factorio, *Friday Facts #342 — The new old tutorial* — factorio.com/blog/post/fff-342
- Factorio, *Friday Facts #261* — factorio.com/blog/post/fff-261
- Wiki ufficiale Satisfactory, *Milestones* e *Space Elevator* — satisfactory.wiki.gg

**Progettisti, GDC, stampa di settore**
- La regola dei quattro passi di Nintendo (*kishōtenketsu*), Koichi Hayashida via Shigeru Miyamoto — MCV/DEVELOP e Nintendo Life
- *The secret to Mario level design* — gamedeveloper.com
- *The Math of Idle Games, Parti I e III*, Anthony Pecorella — gamedeveloper.com / blog.kongregate.com
- GDC Europe 2016, *Quest for Progress: The Math and Design of Idle Games*, Anthony Pecorella
- *Best practices for a successful FTUE* — gamedeveloper.com
- *Gameplay Design Fundamentals: Gameplay Progression* — gamedeveloper.com
- *Pacing Problems in Game Design* — gamedeveloper.com / game-wisdom.com
- *Mobile Session Design: Easy In, Easy Out* — mobilefreetoplay.com
- *Onboarding Decides Your D1: First-Session Design and the FTUE Metrics That Matter* — blog.playio.co
- *First Week Retention: Optimizing Day-1 Through Day-7* — rolearn.dev
- *Retention: the most important number you are not paying attention to* e *What is a good median play time for a demo?* — howtomarketagame.com
- *Hyper-Casual vs Idle: The Latest Trends in Mobile Games* — GameRefinery
- *How to design idle games* — machinations.io
- Analisi della didattica di Half-Life 2 e Portal (materiale di progettazione Valve; *Connections Between Pedagogy and Game Design*)
- Letteratura sui tech tree e sui modelli di progressione — Game Wisdom, gamedesignskills
- Effetto Zeigarnik / Ovsiankina applicato ai prodotti digitali — Design Bootcamp, yukaichou.com

**Benchmark di ritenzione**
- Benchmark ritenzione giochi da telefono 2025-2026: Segwise, Mistplay, Business of Apps, AppAgent, GameAnalytics, Adjust
- Tempi di gioco mediani su Steam per genere (games.gg, su profili pubblici campionati)

**Forum dei giocatori**
- Discussioni Steam: Satisfactory (app 526870), Factorio (app 427520), Terraria (app 105600), Civilization VII (app 1295660)

> **Reddit è risultato bloccato**, come dichiarato da cinque report su sei nelle ricerche precedenti.
