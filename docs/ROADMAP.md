# Lista di costruzione — v13

Un punto alla volta, provando dopo ognuno.
Quando l'autore dice **"fai il punto N"**, si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v6.0: **un'isola da mandare avanti**, con un operaio solo, e il gioco è **comprare indietro il suo tempo**.

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

**3. Il salvataggio.** — Adesso chiudere la pagina cancella tutto.
Con macchine e isole le sessioni diventano lunghe: un gioco da telefono che perde il progresso **non verrà mai giocato abbastanza da poter essere giudicato**, e senza sessioni lunghe le verifiche di questa lista non valgono niente.
Costo dichiarato: finché il modello cambia spesso, un salvataggio vecchio si butta invece di convertirlo. Si fa con la versione dentro il file, come dice la skill `isola-salvataggio`.

## Fase B — le due economie

Qui il gioco smette di essere un giocattolo. **Adesso non c'è nessuna ragione per fare niente**: tagli alberi perché puoi.

**4. I giacimenti.** — La fonte che non finisce.
Macchie fisse di tessere con un materiale e una **ricchezza** (povero ×0,5 / normale ×1 / ricco ×2). Si scavano a mano, e non si esauriscono mai. I massi e le frane diventano quello che sono davvero: **ostacoli da sgomberare**, con una resa una volta sola, che liberano lo spazio dove metterai le macchine.
→ `GDD.md` §7, `MATERIALI.md` §4.

**5. Il banco da lavoro e le prime ricette.** — Si fabbrica.
Al casotto c'è un banco: ricette a mano, coi materiali che l'operaio ha **addosso**. Nasce `config/ricette.json` e nascono i controlli all'avvio: niente ricetta che produce quello che consuma, mai più di tre ingredienti.
→ `GDD.md` §9, `MATERIALI.md` §2.

**6. I progetti.** — Le monete comprano il diritto, i materiali costruiscono la cosa.
La bacheca al casotto smette di vendere potenziamenti e comincia a vendere **progetti**. Compri il progetto della Segheria; poi la Segheria te la fabbrichi. Le tecnologie di adesso diventano progetti come tutto il resto.
→ `GDD.md` §3.

> ### 🛑 Verifica dopo il punto 6 — non si va avanti senza
> 1. **Guardando la bacheca dei progetti, ce n'è uno che vuoi?** Se no, il desiderio non morde, e nessuna quantità di nastri lo salva.
> 2. **Si sente che l'operaio è uno solo?** Guardarlo fare una cosa per volta deve far venire voglia di un attrezzo migliore, non di un secondo operaio.

## Fase C — le macchine, e il tempo che tornano a darti

**7. La simulazione headless.** — Far girare l'isola senza disegnarla.
Serve a rispondere con dei numeri a *"quanto vale un minuto dell'operaio"*, che è la lente di tutto `MATERIALI.md`. Senza, il bilanciamento resta a occhio, e questo gioco è una questione di portata: a occhio non si vede.

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

## Fase E — il contenuto, quando la base è viva

15. La terza isola e i materiali rari.
16. Altri attrezzi e altre macchine di livello superiore.
17. Le rifiniture di sensazione: effetti, suoni, la macchina che si vede lavorare.
18. L'impacchettamento con Capacitor.

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
