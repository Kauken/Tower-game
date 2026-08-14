# Lista di costruzione — v18

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice **"fai il punto N"**, si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v7.1: **un'isola da mandare avanti**, con un operaio solo, e il gioco è **comprare indietro il suo tempo**.

> ### ⚠️ I numeri dall'8 in poi sono cambiati con la v18
> Le sei ricerche in `docs/ricerche/` hanno imposto una riorganizzazione. I punti **1-7 sono rimasti dove stavano** (sono già fatti); da 8 in poi la lista è stata rifatta. Se in una vecchia conversazione si parla del "punto 8" o del "punto 18", **quei numeri adesso indicano un'altra cosa.**

---

## Come è ordinata, e perché

Adesso la lista è divisa in **ere**, e non è un abbellimento: è la correzione più grossa che le ricerche hanno imposto.

**Prima c'era un punto solo intitolato "Le macchine e la corrente".** Le ricerche dicono che è sbagliato: **tre giochi di riferimento su quattro mettono un'era intera di macchine a combustibile prima di far vedere l'elettricità.** Il motivo è che la corrente non è un requisito tecnico delle macchine — è **il gradino che toglie una fatica che devi aver già sentito**: quella di riempire otto macchine una per una. Se arrivano insieme, quel gradino non lo senti, e hai bruciato un'era intera di gioco per niente.

Dentro ogni era valgono tre criteri, in quest'ordine:

1. **Prima quello che rende il gioco giudicabile.** Non si può dire se è bello finché il comando non è pulito e finché non c'è una cosa che vuoi.
2. **Poi quello che costa di più se arriva tardi.** Salvataggio e percorso non aggiungono niente da giocare, ma triplicano di costo se arrivano dopo le catene.
3. **Il contenuto per ultimo.** È l'unica parte che si può sempre aggiungere.

E una regola nuova che vale per **ogni** punto da qui in avanti, presa da `GDD.md` §11b:

> ### Nessun punto di questa lista può richiedere di smontare quello che il giocatore ha già costruito.
> Se un gradino si installa solo demolendo la fabbrica che funziona, è progettato male. Il muro della ricostruzione è il punto documentato in cui la gente abbandona questo genere — e su un telefono, dove una sessione dura cinque minuti, è la fine della partita.

> **La lezione delle sei versioni morte:** il progetto è morto ogni volta perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente. I **blocchi di verifica** qui sotto non sono una formalità, e questa versione è la più grande di tutte.

---

# Era 0 — **Le Mani**

*Tutto si fa a mano. È il problema che tutto il resto risolve.*

## Fase A — il comando deve essere pulito

**1. La mano.** — **FATTO** (2026-08-13). Niente si piazza per sbaglio.
Toccare il terreno vuoto a mani vuote **non fa più niente**. Per piazzare qualcosa lo devi prima prendere in mano: tocchi la casella dell'inventario (l'alberello) o la voce del menù Costruisci, una striscia in alto dice cosa hai in mano e quanti te ne restano, e ogni tocco sulla mappa ne piazza uno. Resti in mano finché non finiscono o non premi Annulla. La tessera sotto il dito si illumina **solo** mentre hai qualcosa in mano.
→ `GDD.md` §4. È la fondazione di tutto quello che si piazzerà dopo: casse, trivelle, macchine, nastri.

**2. Via il ciclo del giorno.** — **FATTO** (2026-08-13).
Spariscono il giorno, la sera e il riepilogo. Restano vendita e monete. Il ritmo lo danno gli sblocchi.
→ `GDD.md` §12.

**3. Il salvataggio.** — **FATTO** (2026-08-13).
Si salvano solo gli `id` e solo quello che il giocatore ha cambiato: la mappa di partenza sta in `isola.json`, i moltiplicatori si ricavano dai progetti. Un salvataggio che non si sa leggere **non si cancella mai**: si mette da parte e si riparte puliti.

   > **C'è già dentro il rientro fuori dall'app:** riaprendo, il mondo avanza del tempo passato fino a un tetto di quattro ore. Adesso si vede solo con gli alberelli che crescono; **le macchine ci si agganciano al punto 8 senza toccare il salvataggio.** L'operaio invece si ferma, perché è lui la risorsa scarsa. → `GDD.md` §11d.

## Fase B — le due economie

Qui il gioco smette di essere un giocattolo. Prima di questa fase **non c'è nessuna ragione per fare niente**: tagli alberi perché puoi.

**4. I giacimenti.** — **FATTO** (2026-08-13). La fonte che non finisce.
Macchie fisse di tessere con un materiale e una **ricchezza** (povero ×0,5 / normale ×1 / ricco ×2). Si scavano a mano, e non si esauriscono mai. I massi e le frane diventano quello che sono davvero: **ostacoli da sgomberare**, con una resa una volta sola, che liberano lo spazio dove metterai le macchine.
→ `GDD.md` §7, `MATERIALI.md` §4.

   > **Scavare è un ordine che si ripete:** l'operaio resta lì finché ha posto nello zaino, e il secondo tocco lo ferma — anche mentre ci sta lavorando sopra. Un tocco per ogni sassolino sarebbe una punizione, non un comando.
   > Le vene sono **irregolari** e si **fondono nel disegno**: nessun bordo fra due tessere della stessa vena, altrimenti sei tessere squadrate si leggono come una scacchiera.

**5. Il banco da lavoro e le prime ricette.** — **FATTO** (2026-08-13). Si fabbrica.
Al casotto c'è un banco: ricette a mano, coi materiali che l'operaio ha **addosso**. Nasce `config/ricette.json` e nascono i controlli all'avvio: niente ricetta che produce quello che consuma, mai più di tre ingredienti.
→ `GDD.md` §9, `MATERIALI.md` §2.

   > Quattro ricette a mano: tavole, ghiaia, chiodi, e il **telaio** che fa incontrare la catena del legno con quella del rame. La segheria del punto 8 darà **3 tavole invece di 2**: un gradino che migliora il rapporto *e* il tempo dell'operaio si sente due volte.

**6. I progetti.** — **FATTO** (2026-08-13). Le monete comprano il diritto, i materiali costruiscono la cosa.
La bacheca al casotto smette di vendere potenziamenti e comincia a vendere **progetti**. Compri il progetto della Segheria; poi la Segheria te la fabbrichi. Le tecnologie di adesso diventano progetti come tutto il resto.
→ `GDD.md` §3.

   > **Due passi, e si vedono tutti e due.** Il progetto comprato dice *"da fabbricare"* finché non l'hai fatto davvero al banco; solo allora l'effetto si accende. E **si vende solo al casotto**: il mercante sta lì e non ti segue in giro per l'isola.

**7. La simulazione headless.** — **FATTO** (2026-08-13). Si lancia con `npm run simula`.
Carica i **moduli veri** del gioco attraverso Vite e fa girare l'isola senza disegnarla: è anche la prova che la logica sta in piedi senza il canvas.
Misura **il tempo per fare un tot**, non il tot fatto in un tempo — differenza che sembra pedante e non lo è: il bosco ha otto alberi, quindi a tempo fisso tutti gli scenari davano lo stesso numero e un'ascia migliore non si vedeva.

   > **Ha ripagato subito.** Ha trovato che il **Piccone pesante non funzionava sulle vene di pietra** (nominava solo i massi, che sono una risorsa diversa: si comprava un attrezzo che non faceva niente su quello che scavi davvero), e che lo **Zaino grande non serve a niente** — ×0,95, cioè zero. La ricerca ha poi spiegato **perché**, e non è colpa dell'oggetto: vedi il riquadro qui sotto.

> ### 🛑 Verifica dopo il punto 7 — **in sospeso, l'autore non ha ancora risposto**
> 1. **Guardando la bacheca dei progetti, ce n'è uno che vuoi?** Se no, il desiderio non morde, e nessuna quantità di nastri lo salva.
> 2. **Portare la roba a mano dà fastidio quel tanto che basta?** Deve essere una scocciatura che fa desiderare un nastro, non una noia che fa chiudere l'app.
> 3. **Si sente che l'operaio è uno solo?** Guardarlo fare una cosa per volta deve far venire voglia di un attrezzo migliore, non di un secondo operaio.

> ### ⚠️ Decisione aperta prima dell'Era 1: **quanto grande deve essere lo zaino**
> **Misurata il 2026-08-14, non ragionata.** La ricerca dice che uno zaino infinito rende al massimo `1/(1−f)`, dove `f` è la frazione di tempo passata a camminare. La misura conferma la formula e trova una cosa che nessuno si aspettava.
>
> | Caselle di partenza | Quanto rende lo Zaino grande nel bosco | Quanto produce l'isola |
> | --- | --- | --- |
> | **6** (adesso) | **×1,00** — cioè niente | 166 monete/min |
> | 5 | ×1,00 | 166 |
> | 4 | ×1,00 | 166 |
> | **3** | **×1,24** | 134 |
>
> **Il motivo è che il bosco intero ci sta dentro lo zaino.** Otto alberi non riempiono sei caselle, quindi l'operaio **non torna mai** a scaricare: il viaggio non esiste, e uno zaino più grande non ha niente da moltiplicare. Non è un problema di numeri sull'oggetto — è che manca il viaggio da accorciare.
>
> Per questo l'effetto non è graduale ma **a scatto**: da 6 a 4 non cambia niente, a 3 compare tutto insieme.
>
> **Il prezzo è dichiarato**: a 3 caselle l'isola produce **il 19% in meno** nei primi minuti, e un'altra ricerca dice che è lì che si perde la gente. Le due cose sono in conflitto e la scelta è dell'autore.
>
> Le due strade, e nessuna è ovvia:
> - **Zaino base a 3 caselle.** Effetto misurato e certo; costo: partenza più lenta del 19%.
> - **Allontanare le fonti *dopo* la prima** (bosco secondario e vene), lasciando vicino il primo bosco. Non misurata — richiede di ridisegnare la mappa — ma non tocca i primi quindici minuti.
>
> **Finché non è decisa, l'Era 1 si costruisce lo stesso**: non dipende da questa.
>
> Nota a margine, dalla stessa misura: **la vena di rame "media" ha `f` = 0,019**, cioè è praticamente attaccata al casotto. Su quella vena nessuno zaino e nessuno stivale renderà mai niente, qualunque cosa si decida.

---

# Era 1 — **Il Fuoco**

*Le macchine lavorano da sole, ma bruciano legno e le riempi tu. Niente elettricità: non ancora.*

È l'era che prima non esisteva, e che le ricerche hanno imposto di creare. Serve a far sentire sulla pelle la fatica che la corrente toglierà: **riempire ogni macchina, una per una.**

**8. La segheria — la prima macchina.**
Cassetto d'entrata, cassetto d'uscita, e in mezzo una fiamma che consuma legno. Lavora da sola finché ha materiale **e** combustibile. **Riempirla e svuotarla è il lavoro.** Qui il legno comincia davvero a moltiplicarsi: 1 tronco → 3 tavole.
→ `GDD.md` §9, §2, `MATERIALI.md` §3.

   > **Si deve vedere lavorare.** La lama gira quando produce, si ferma quando è ferma, e da fuori si distingue a colpo d'occhio **piena** da **senza materiale** da **senza combustibile**. Non è estetica: se per sapere come va la fabbrica devo aprire otto pannelli, su un telefono non lo faccio.
   > **Il combustibile lo carica l'operaio**, ed è la contromisura che tiene scarsa la risorsa scarsa quando le macchine avrebbero smesso di farlo. → `GDD.md` §2.

**9. Il numero al minuto.** — Piccolo, economico, e manca da sempre.
Ogni catena che produce da sola mostra **quanto fa al minuto**. È il primo dei tre motori del "per sempre" (`GDD.md` §11c), ed è quello che manca di più: **finché non c'è un numero da nessuna parte, il giocatore non ha modo di sapere se sta migliorando.**
Va subito dopo la prima macchina, perché prima non c'è niente da misurare e dopo è già tardi.

**10. Il frantoio e la fornace — la catena si allunga.**
Masso → ghiaia → lingotto. Adesso ci sono **tre macchine da rifornire**, ed è esattamente lì che deve cominciare a dare fastidio.
→ `MATERIALI.md` §3.

**11. La trivella a combustibile.** — Il gradino 2 dell'estrazione, quello che nessuno deve saltare.
Si piazza su un giacimento e produce da sola nel suo cassetto, ma **il cassetto lo svuoti tu**: non si collega a niente. È il *Portable Miner* di Satisfactory, ed è lui che farà sentire il nastro come una liberazione.
→ `GDD.md` §8.

> ### 🛑 Verifica dopo il punto 11 — non si va avanti senza
> 1. **Riempire quattro macchine di legno una per una dà fastidio?** Se non dà fastidio, la corrente dell'Era 2 non sarà una liberazione ma una complicazione, e va stretto il collo di bottiglia **prima** di costruirla.
> 2. **Guardando l'isola, si capisce quali macchine vanno e quali sono ferme, senza aprire niente?**
> 3. **La prima macchina si è sentita come tempo restituito?**

---

# Era 2 — **La Corrente**

*Un punto solo da rifornire al posto di otto. E il primo nastro.*

La domanda che quest'era toglie dalla testa è **una sola e va detta ad alta voce**: *"devo riempire ogni macchina una per una."* Un generatore alimenta tutto quello che copre, e da quel momento **il combustibile lo metti in un posto solo.**

**12. Il generatore e i pali.**
Un **generatore** brucia legno e alimenta tutto quello che sta nel suo **raggio**; i **pali** allungano la copertura e si agganciano **da soli** per vicinanza. Nessun filo da tracciare — su un telefono tirare fili col dito sarebbe un supplizio, e la parte interessante non sono i fili: è *"come faccio ad arrivare fin laggiù?"*.
→ `GDD.md` §10b.

   > **Non spegne mai tutto.** Un generatore a secco ferma **solo le macchine che copre lui**, avvisa **prima** di fermarsi, e riparte da solo quando rimetti il combustibile: niente giro a riaccendere le macchine una per una. Esiste una discussione, con quel titolo esatto, intitolata *"il sistema della corrente mi ha fatto smettere di giocare"*, e il motivo era il fusibile che spegne tutto insieme.
   > **La mancanza di corrente costa produzione, mai lavoro perso.**

**13. Le macchine elettriche — che si affiancano, non sostituiscono.**
La segheria elettrica è più veloce e non ha la sua fiamma da riempire. Ma **quella a legna continua a funzionare e resta utile**: si sposta a fare un altro pezzo della catena. Non si demolisce niente per salire. → `GDD.md` §11b.

**14. Il percorso vero.** — Adesso l'operaio va in linea retta e attraversa gli alberi.
Sull'isola aperta non si nota, ma **appena ci sono macchine e nastri diventa visibile e sbagliato**, e rifare i nastri dopo costa più che fare il percorso adesso. Va **prima** dei nastri, non dopo.

**15. I nastri.** — Il gradino 3. La catena gira senza di te.
La roba si sposta da sola fra casse e macchine.

   > **Come si disegnano, sul telefono:** tocchi la partenza, tocchi l'arrivo, il gioco mostra il percorso in trasparenza e tu confermi. **Niente trascinamento libero**: un dito che scorre su una mappa che scorre a sua volta è il modo più sicuro di tracciare il nastro sbagliato.
   > Questa è la parte più a rischio di tutto il progetto, e va detto: **nessun gioco di automazione coi nastri è mai nato su telefono in verticale.** Non c'è un modello da copiare.

> ### 🛑 Verifica dopo il punto 15
> **Quando il primo nastro parte, è una liberazione?** Se è solo "una cosa in più", vuol dire che portare a mano non faceva abbastanza male, e va stretto il collo di bottiglia — non aggiunto contenuto.

---

# Era 3 — **La Seconda Isola**

*Automatizzare smette di essere una comodità e diventa il prezzo del biglietto.*

**16. Il pontile e la seconda isola.** — Ferro e carbone.
Si costruisce il passaggio, non si trova una chiave. **L'operaio si sposta con te**, e mentre è di là sull'isola di qua non succede niente a mano: vanno avanti solo le macchine.
→ `GDD.md` §11.

**17. Il trasporto fra isole.** — Prima la barca che carichi tu, poi quella che va da sola.
Stessa struttura a gradini di tutto il resto.

**18. Il carbone come combustibile.** — Rende molto di più del legno.
**Non sblocca niente di nuovo: toglie una scocciatura che hai sentito per ore** — dover bruciare il bosco che ripianti. È l'unico modo onesto di rendere desiderabile un materiale.

   > 💡 **Idea da valutare, non ancora decisa:** vendere il **tetto delle ore fuori dall'app** come progetto, invece che darlo fisso a quattro ore. Sarebbe l'unico modo di far pagare la comodità dell'idle con la valuta del gioco invece che con soldi veri. Va discussa con `consulente-design` prima di finire in questa lista.

---

# Era 4 — **Le scale**

Da qui in poi non si aggiunge *contenuto*: si salgono i **gradini** di `GDD.md` §11b. La regola vale per ognuno:

> **Un gradino non è un numero più grande. È una domanda che sparisce dalla testa.**
> Se non sai nominare la domanda che toglie, quel gradino non esiste — non costruirlo.

**19. Il cassetto.** — toglie *"in quale cassa l'avevo messo?"*
Tiene tantissimo di **un materiale solo**, e da fuori si vede cos'è e quanto. Costa poco ed è il gradino con la resa più alta della lista.

**20. Il mulino ad acqua o a vento.** — toglie *"devo alimentarlo"*
Non consuma niente, ma rende meno e **va dove c'è acqua o vento**. Non è un aggiornamento dritto: è una **scelta** contro il generatore.

**21. Le ricette alternative.** — il secondo motore del "per sempre".
Non "più potenza": **un modo diverso di fare la stessa cosa**, che ti fa venire voglia di rifare meglio quello che già funziona. Attenzione alla trappola: la ricetta alternativa deve poter stare **accanto** a quella vecchia, non obbligarti a demolire la catena.

**22. Il terminale.** — toglie *"dov'è quella roba?"*
Una rete che collega le casse: da un punto solo cerchi, vedi e prendi qualunque cosa. È il gradino più amato del Minecraft tecnico, e **funziona solo perché prima hai passato ore a girare fra le casse.**

   > ⚠️ **Va fatto lento, non solo caro.** Ha una **portata al minuto dichiarata sullo schermo**, che si potenzia con altri progetti. Se ti serve una cassa intera di tavole adesso, l'operaio ci va ancora. Il modello è il Deposito Dimensionale di Satisfactory: 15 pezzi al minuto, e sui forum si lamentano che "non vale la fatica" — che è il segno che funziona. Se l'unico freno fosse il costo, paghi una volta e **casse, nastri e posizione delle macchine smettono tutti insieme di contare.** → `GDD.md` §11b.

**23. La caldaia a vapore.** — toglie *"la corrente"*, e non ci pensi più.

**24. Il terminale che fabbrica.** — toglie *"quali passaggi servono?"*
Chiedi dieci telai e la rete li fa, prendendo i pezzi dove sono.

**25. I potenziamenti infiniti.** — il terzo motore del "per sempre".
Costo crescente che non finisce mai, dichiaratamente per chi resta.

**26. La terza isola e i materiali rari.**
**27. Le rifiniture di sensazione**: effetti, e ogni macchina che si vede lavorare bene.
**28. L'impacchettamento con Capacitor.**

> **Non c'è una costruzione finale**, e non è una dimenticanza: *"una sorta di infinito da rifinire sempre."* Il motore è il **ciclo dei colli di bottiglia** — risolvi il legno e ti manca la pietra, metti la trivella e ti manca la corrente. Da cui la regola per chiunque aggiunga roba: **uno sblocco nuovo deve creare un collo di bottiglia altrove.** Se non manca niente da nessuna parte, hai aggiunto una decorazione.
>
> Ma siccome non c'è un finale, i **tre motori** (punti 9, 21, 25) non sono un contentino per il dopo: sono **l'unico motore che avremo**. Per questo il primo è stato spostato all'Era 1.

> **Le commesse non ci sono, e non è una dimenticanza.** *"L'obiettivo è la progressione."* Il desiderio ce l'ha già la bacheca dei progetti; un tizio che ti chiede quaranta tavole sposterebbe il problema invece di risolverlo. Vedi `DECISIONI.md`.

---

## Archivio — cosa è già stato fatto e cosa è caduto

| | Esito |
| --- | --- |
| L'isola, la telecamera, il primo ordine | **FATTO** 2026-08-11 |
| Le casse con un posto, niente magazzino centrale | **FATTO** 2026-08-11 |
| Vendere e le prime tecnologie | **FATTO** 2026-08-12 — diventate progetti al punto 6 |
| L'inventario a caselle, gli alberelli, niente scarico automatico | **FATTO** 2026-08-12 |
| Gli alberi che ricrescevano da soli | **TOLTO** 2026-08-12 — toglieva la decisione di ripiantare |
| I salari e l'assunzione dei braccianti | **TOLTI** 2026-08-12 — con un operaio solo un salario è una tassa, non una scelta |
| Il ciclo del giorno | **TOLTO** 2026-08-12 — senza salari è un timer senza denti |
| Le commesse | **TOLTE** 2026-08-12, prima di costruirle — l'unico motore è la progressione |
| "Le macchine e la corrente" come punto unico | **SPEZZATO** 2026-08-14 — le ricerche dicono che serve un'era intera di macchine a combustibile prima della corrente, o il gradino della corrente non si sente |
| La verifica dopo il punto 6 | **SPOSTATA** al punto 7 — le sue due domande sono ancora **senza risposta** |

---

## Le ricerche

Sei report sui forum dei giochi di riferimento stanno in `docs/ricerche/`, con la sintesi in **`docs/ricerche/SINTESI.md`**. Questa versione della lista viene da lì. Chi tocca la roadmap legga almeno la sintesi: contiene **quattro punti in cui la ricerca ha smentito quello che avevamo scritto**, e sapere *perché* una cosa è scritta così è l'unico modo di non rimetterla com'era.
