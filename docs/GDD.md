# Documento di design — v4.0

**Grano e Ferro** — gestionale di fattoria con catene di produzione.
Per telefono, verticale, una mano sola.

> Sostituisce la v3.0 (fattoria a griglia con puzzle di vicinanze), che sbagliava
> genere: metteva la scarsità **sullo spazio** e ne usciva un puzzle game.
> Qui la scarsità sta su **semi e soldi**, che è come funziona un farmer.
>
> Se trovi documenti o codice che parlano di **reclute, ondate, nemici, castello,
> torri, sentiero, postazioni**, o di **Filare e Rotazione**, sono resti da
> rimuovere, non funzionalità da mantenere.

---

## 1. Il gioco in una riga

**Stardew Valley per il ciclo economico, Minecraft moddato tecnico per la scala di produzione, un pizzico di RimWorld per chi ci lavora.** Compri semi, coltivi, vendi o consegni, e con quello che guadagni allarghi il campo, sblocchi lavorazioni e assumi gente che lavori al posto tuo.

## 2. Il ruolo del giocatore

Zero riflessi, zero fretta, **non si può perdere**. Quattro decisioni che si ripetono:

1. **Cosa piantare** — i semi costano, e ognuno ha un tempo, un prezzo e una resa diversi.
2. **Vendere o tenere da parte** — il mercato paga subito, le commesse pagano molto di più ma vogliono roba precisa.
3. **Reinvestire o mettere da parte** — ogni giorno la fattoria ha delle spese.
4. **Assumere o comprare la macchina** — chi lavora costa ogni giorno, la macchina costa tanto una volta sola.

> Non ottimizzi una griglia: **mandi avanti una fattoria.**

## 3. Il ciclo

> **Semi → pianti → cresce → raccogli → vendi o consegni → compri semi migliori, attrezzi e lavorazioni → ricomincia più in grande.**

**All'inizio non puoi riempire il campo neanche volendo**, perché non hai i semi. Piantare ne consuma uno. È quello che rende difficile l'inizio, e quel problema si scioglie da solo man mano che vendi: è la sensazione di "piano piano questo passo diventa più facile".

## 4. Il campo

Una griglia verticale. Ogni casella è in uno di tre stati:

| Stato | Cosa vuol dire |
| --- | --- |
| **Incolto** | terra selvatica. Va dissodata, e costa |
| **Arato** | ci puoi piantare |
| **Occupato** | c'è una coltura, una roccia, una macchina |

**Dissodare è la spesa che allarga la fattoria**, e ogni casella arata aumenta la manutenzione giornaliera. Espandere è una scommessa, non un regalo.

### Le vicinanze, ridimensionate

Resta **solo l'acqua**: una coltura che tocca un canale cresce molto più in fretta. Irrigare è agricoltura, si capisce senza spiegazioni.

Le regole astratte di moltiplicatori (monocoltura contro varietà) **sono state tolte**: erano un puzzle, e questo non è un puzzle game. I veri problemi di disposizione arriveranno dalle macchine — cosa alimenta cosa, dove sta il magazzino — e nasceranno dalla simulazione, non da regole inventate.

## 5. Il giorno

Il **giorno è il battito del gioco**. Dura pochi minuti mentre l'app è aperta. A fine giornata:

- si paga la **manutenzione** e i **salari**
- i **prezzi di mercato** cambiano un po'
- ogni tanto **succede qualcosa** (una settimana secca, un mercante di passaggio con un seme raro)
- un **riepilogo**: cosa hai raccolto, venduto, speso

È il meccanismo del *"vabbè, ancora un giorno"*, che è il motore vero di Stardew: ogni giornata ti avvicina in modo visibile a qualcosa che vuoi.

## 6. La scala tecnica — la parte Minecraft

È quello che separa questo gioco dall'ennesimo giochino di fattoria.

**L'albero non è una lista, è un grafo di dipendenze.** Il valore si moltiplica a ogni passaggio, e ogni macchina chiede materiali di *un'altra* catena:

> grano → *Mulino* → farina → *Forno* → **pane**, che vale molto di più
>
> ma il Mulino si costruisce col **rame**, e il rame lo devi scavare

È così che colture e minerali diventano un gioco solo invece di due appiccicati.

**E avanzare deve costringere a rifare pezzi di fattoria.** Nei modpack tecnici è la cosa che tiene vivo il gioco per centinaia di ore: la macchina migliore non si infila dove stava la vecchia. È anche la risposta al difetto noto del genere — *quando è tutto automatico non hai più niente da fare* — senza bisogno di nessun puzzle inventato.

## 7. Il mercato e le commesse

- **Il mercato** compra qualunque cosa, subito, a un prezzo che oscilla. È la rete di sicurezza.
- **Le commesse** chiedono roba precisa, pagano molto di più e **sbloccano lavorazioni**.

> **Il fornaio chiede:** 20 grano, 5 farina
> **Paga:** 300 monete + sblocca il **Forno**

Le commesse sono il "non vedo l'ora": **vedi cosa ti chiedono prima di poterlo dare.** E producono la decisione che si ripete di più: *vendo adesso, o tengo da parte?*

## 8. Chi lavora — la parte RimWorld

*Deciso il 2026-08-11: prima i braccianti, poi le macchine.*

**I braccianti.** Assumi persone. Ognuna fa **un mestiere solo** (raccoglie, semina, scava) in **una zona** che le assegni. E le **paghi ogni giorno**: non è un bottone che premi una volta, è un costo fisso che la fattoria deve coprire.

**Le macchine.** Arrivano dopo e fanno lo stesso lavoro: costano molto di più subito, ma **niente dopo**.

Da lì nasce una decisione economica che non smette mai: **assumo, o compro la macchina?** Dipende da quanto pensi di durare su quella coltura, e da quanti soldi hai adesso.

## 9. Le spese fisse

*Deciso il 2026-08-11.*

Ogni giorno la fattoria costa: **manutenzione** per casella arata, e **salari** per chi hai assunto.

È quello che rende difficile l'inizio e che tiene viva ogni decisione di espansione. Senza, allargarsi sarebbe sempre la mossa giusta e non ci sarebbe partita.

**Non si perde mai.** Se non riesci a pagare, i braccianti se ne vanno e le caselle tornano incolte: la fattoria si rimpicciolisce e riparti. Niente schermata di sconfitta, niente run azzerata.

## 10. Cosa questo gioco **non** è

Guardrail, da difendere in ogni decisione futura:

- **Non è un puzzle game.** Se una decisione si risolve incastrando forme su una griglia, è progettata male.
- **Non si perde e non si sbaglia in modo irreversibile.**
- **Non c'è fretta.** Niente timer che scadono, niente raccolti che marciscono se non torni.
- **Non è un idle da guardare.** Se in una giornata non c'è almeno una decisione, il gioco è rotto lì.
- **Niente valuta premium, niente pubblicità, niente attese che si pagano.**

## 11. La domanda che regge tutto

> ### Alla fine di una giornata, hai voglia di farne un'altra?

Se sì, tutto il resto è contenuto. Se no, nessuna quantità di macchine, commesse e braccianti lo salva. **È la verifica obbligatoria del punto 3 della roadmap.**
