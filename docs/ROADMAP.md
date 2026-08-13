# Lista di costruzione — v17

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice **"fai il punto N"**, si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v7.0: **un'isola da mandare avanti**, con un operaio solo, e il gioco è **comprare indietro il suo tempo**.

---

## Come è ordinata, e perché

Tre criteri, in quest'ordine:

1. **Prima quello che rende il gioco giudicabile.** Non si può dire se è bello finché il comando non è pulito e finché non c'è una cosa che vuoi.
2. **Poi quello che costa di più se arriva tardi.** Salvataggio e percorso non aggiungono niente da giocare, ma triplicano di costo se arrivano dopo le catene.
3. **Il contenuto per ultimo.** È l'unica parte che si può sempre aggiungere.

> **La lezione delle sei versioni morte:** il progetto è morto ogni volta perché abbiamo costruito il gioco intero prima di sapere se il pezzo centrale era divertente. I **blocchi di verifica** qui sotto non sono una formalità, e questa versione è la più grande di tutte.

---

## Fase A — il comando deve essere pulito

Sono tre punti piccoli. Senza, ogni cosa costruita dopo eredita un difetto.

**1. La mano.** — Niente si piazza per sbaglio.
Toccare il terreno vuoto a mani vuote **non fa più niente**. Per piazzare qualcosa lo devi prima prendere in mano: tocchi la casella dell'inventario (l'alberello) o la voce del menù Costruisci, una striscia in alto dice cosa hai in mano e quanti te ne restano, e ogni tocco sulla mappa ne piazza uno. Resti in mano finché non finiscono o non premi Annulla. La tessera sotto il dito si illumina **solo** mentre hai qualcosa in mano.
→ `GDD.md` §4. È la fondazione di tutto quello che si piazzerà dopo: casse, trivelle, macchine, nastri.

**2. Via il ciclo del giorno.** — Toglie un orologio che non ha più denti.
Spariscono il giorno, la sera e il riepilogo. Restano vendita e monete. Il ritmo lo danno gli sblocchi.
→ `GDD.md` §12.

**3. Il salvataggio.** — **FATTO** (2026-08-13).
Si salvano solo gli `id` e solo quello che il giocatore ha cambiato: la mappa di partenza sta in `isola.json`, i moltiplicatori si ricavano dai progetti. Un salvataggio che non si sa leggere **non si cancella mai**: si mette da parte e si riparte puliti.

   > **C'è già dentro il rientro fuori dall'app:** riaprendo, il mondo avanza del tempo passato fino a un tetto di quattro ore. Adesso si vede solo con gli alberelli che crescono; **le macchine ci si agganciano al punto 8 senza toccare il salvataggio.** L'operaio invece si ferma, perché è lui la risorsa scarsa. → `GDD.md` §11d.

## Fase B — le due economie

Qui il gioco smette di essere un giocattolo. **Adesso non c'è nessuna ragione per fare niente**: tagli alberi perché puoi.

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

> ### 🛑 Verifica dopo il punto 6 — non si va avanti senza
> 1. **Guardando la bacheca dei progetti, ce n'è uno che vuoi?** Se no, il desiderio non morde, e nessuna quantità di nastri lo salva.
> 2. **Si sente che l'operaio è uno solo?** Guardarlo fare una cosa per volta deve far venire voglia di un attrezzo migliore, non di un secondo operaio.

## Fase C — le macchine, e il tempo che tornano a darti

**7. La simulazione headless.** — **FATTO** (2026-08-13). Si lancia con `npm run simula`.
Carica i **moduli veri** del gioco attraverso Vite e fa girare l'isola senza disegnarla: è anche la prova che la logica sta in piedi senza il canvas.
Misura **il tempo per fare un tot**, non il tot fatto in un tempo — differenza che sembra pedante e non lo è: il bosco ha otto alberi, quindi a tempo fisso tutti gli scenari davano lo stesso numero e un'ascia migliore non si vedeva.

   > **Ha ripagato subito.** Ha trovato che il **Piccone pesante non funzionava sulle vene di pietra** (nominava solo i massi, che sono una risorsa diversa: si comprava un attrezzo che non faceva niente su quello che scavi davvero), e che lo **Zaino grande non serve a niente** — ×0,95, cioè zero, perché nessuna fonte è abbastanza lontana da rendere i viaggi un costo. Il primo era un difetto ed è corretto; il secondo è bilanciamento, ed è del bilanciatore.

**8. Le macchine e la corrente.** — **Il punto più grosso della lista**, e non si può spezzare.
Segheria, frantoio, fornace: cassetto d'entrata, cassetto d'uscita, lavorano da sole finché hanno materiale. **Riempirle e svuotarle è il lavoro.** Qui il legno comincia davvero a moltiplicarsi.
E lavorano **solo se hanno corrente**: un **generatore** che brucia legno alimenta tutto quello che sta nel suo raggio, i **pali** allungano la copertura e si agganciano da soli per vicinanza. Nessun filo da tracciare. Coperta = lavora a piena velocità; scoperta o senza combustibile = ferma, **e lo scrive**.
→ `GDD.md` §9 e §10b, `MATERIALI.md` §3.

> **Perché non sono due punti.** Una macchina che funziona e poi da un giorno all'altro non funziona più è una promessa rotta. Si fanno insieme, in due metà dentro lo stesso intervento: prima la macchina che lavora, poi il generatore che la fa lavorare.

> **Il legno che bruci è legno che non costruisci.** È qui che la prima decisione del gioco — *vendo l'alberello o lo ripianto?* — comincia a pesare il doppio.

**9. La trivella.** — Il gradino 2, quello che nessuno deve saltare.
Si piazza su un giacimento e produce da sola nel suo cassetto, ma **il cassetto lo svuoti tu**: non si collega a niente. È il *Portable Miner* di Satisfactory, ed è lui che farà sentire il nastro come una liberazione.
→ `GDD.md` §8.

**10. Il percorso vero.** — Adesso l'operaio va in linea retta e attraversa gli alberi.
Sull'isola aperta non si nota, ma **appena ci sono macchine e nastri diventa visibile e sbagliato**, e rifare i nastri dopo costa più che fare il percorso adesso.

**11. I nastri.** — Il gradino 3. La catena gira senza di te.
La roba si sposta da sola fra casse e macchine. Si tracciano col dito che scorre, che è lo stesso gesto della mano del punto 1 con un trascinamento invece di un tocco.

> ### 🛑 Verifica dopo il punto 11
> **Quando il primo nastro parte, è una liberazione?** Se è solo "una cosa in più", vuol dire che portare a mano non faceva abbastanza male, e va stretto il collo di bottiglia — non aggiunto contenuto.

## Fase D — il mondo si allarga

**12. Il pontile e la seconda isola.** — Ferro e carbone.
Si costruisce il passaggio, non si trova una chiave. **L'operaio si sposta con te**, e mentre è di là sull'isola di qua non succede niente a mano: vanno avanti solo le macchine.
→ `GDD.md` §11. È il punto in cui automatizzare smette di essere una comodità e diventa il prezzo del biglietto.

**13. Il trasporto fra isole.** — Prima la barca che carichi tu, poi quella che va da sola.
Stessa struttura a gradini di tutto il resto.

**14. Il carbone come combustibile.** — Arriva con la seconda isola, e rende molto di più del legno.
**Non sblocca niente di nuovo: toglie una scocciatura che hai sentito per ore** — dover bruciare il bosco che ripianti. È l'unico modo onesto di rendere desiderabile un materiale.

> ### ✅ Verifica passata
> Punto 7: `npm run simula` dà una tabella leggibile. Bosco a mani nude 166 monete/min; l'Ascia ×1,37; gli Stivali ×1,58; la vena ricca lontana ×1,21 contro la pietra vicina ×0,95 — **la ricchezza batte la distanza, come doveva**.

## Fase E — **le scale**, cioè il gioco vero e proprio

Da qui in poi non si aggiunge *contenuto*: si salgono i **gradini** di `GDD.md` §11b. La regola vale per ognuno:

> **Un gradino non è un numero più grande. È una domanda che sparisce dalla testa.**
> Se non sai nominare la domanda che toglie, quel gradino non esiste — non costruirlo.

**15. Il cassetto.** — toglie *"in quale cassa l'avevo messo?"*
Tiene tantissimo di **un materiale solo**, e da fuori si vede cos'è e quanto. Costa poco ed è il gradino con la resa più alta della lista.

**16. Il generatore a carbone.** — toglie *"devo riempirlo in continuazione"*

**17. Il mulino ad acqua o a vento.** — toglie *"devo alimentarlo"*
Non consuma niente, ma rende meno e **va dove c'è acqua o vento**. Non è un aggiornamento dritto: è una **scelta** contro il generatore.

**18. Il terminale.** — toglie *"dov'è quella roba?"*
Una rete che collega le casse: da un punto solo cerchi, vedi e prendi qualunque cosa. È il gradino più amato del Minecraft tecnico, e **funziona solo perché prima hai passato ore a girare fra le casse.**

**19. La caldaia a vapore.** — toglie *"la corrente"*, e non ci pensi più.

**20. Il terminale che fabbrica.** — toglie *"quali passaggi servono?"*
Chiedi dieci telai e la rete li fa, prendendo i pezzi dove sono.

**21. La terza isola e i materiali rari.**
**22. Le rifiniture di sensazione**: effetti, la macchina che si vede lavorare.
**23. L'impacchettamento con Capacitor.**

> **Non c'è una costruzione finale**, e non è una dimenticanza: *"una sorta di infinito da rifinire sempre."* Il motore è il **ciclo dei colli di bottiglia** — risolvi il legno e ti manca la pietra, metti la trivella e ti manca la corrente. Da cui la regola per chiunque aggiunga roba: **uno sblocco nuovo deve creare un collo di bottiglia altrove.** Se non manca niente da nessuna parte, hai aggiunto una decorazione.

> **Le commesse non ci sono, e non è una dimenticanza.** *"L'obiettivo è la progressione."* Il desiderio ce l'ha già la bacheca dei progetti; un tizio che ti chiede quaranta tavole sposterebbe il problema invece di risolverlo. Vedi `DECISIONI.md`.

---

## Archivio — cosa è già stato fatto e cosa è caduto

| | Esito |
| --- | --- |
| L'isola, la telecamera, il primo ordine | **FATTO** 2026-08-11 |
| Le casse con un posto, niente magazzino centrale | **FATTO** 2026-08-11 |
| Vendere e le prime tecnologie | **FATTO** 2026-08-12 — le tecnologie diventano progetti al punto 6 |
| L'inventario a caselle, gli alberelli, niente scarico automatico | **FATTO** 2026-08-12 |
| Gli alberi che ricrescevano da soli | **TOLTO** 2026-08-12 — toglieva la decisione di ripiantare |
| I salari e l'assunzione dei braccianti | **TOLTI** 2026-08-12 — con un operaio solo un salario è una tassa, non una scelta |
| Il ciclo del giorno | **TOLTO** 2026-08-12 — senza salari è un timer senza denti |
| Le commesse | **TOLTE** 2026-08-12, prima di costruirle — l'unico motore è la progressione |
