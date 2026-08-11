# Documento di design — v5.0

**Grano e Ferro** — un'isola da mandare avanti.
Per telefono, verticale, una mano sola.

> Sostituisce la v4.0. Quella metteva il gioco su una **scacchiera**, e l'autore
> l'ha rifiutata: *"non voglio questa cosa a scacchiera, voglio stile Stardew
> Valley, Graveyard Keeper. Un'isola con possibilità di accedere ad altre zone.
> E mettere anche un po' di Factorio e Satisfactory."*
>
> Se trovi codice o documenti che parlano di **reclute, ondate, nemici,
> castello, torri, sentiero, postazioni, Filare, Rotazione, appezzamenti**,
> sono resti da rimuovere.

---

## 1. Il gioco in una riga

**Un'isola vista dall'alto. Non c'è nessuno da guidare: sei tu il gestore.** Tocchi le cose e dai ordini; a camminare e a lavorare sono i braccianti. Apri zone nuove costruendo il passaggio, e le materie prime che ne escono alimentano catene di lavorazione sempre più lunghe.

**Stardew Valley** per il ciclo economico, **Graveyard Keeper** per le zone e per chi lavora al posto tuo, **Factorio e Satisfactory** per le catene.

## 2. Il ruolo del giocatore

> **Niente personaggio.** L'autore l'ha rifiutato tre volte, in tre versioni diverse. Il giocatore non è dentro lo schermo: è sopra.

Zero riflessi, zero fretta, **non si può perdere**. Quattro decisioni che si ripetono:

1. **Cosa ordinare** — cosa serve adesso, e in che ordine.
2. **Chi assumere** — un altro taglialegna, o un cavatore?
3. **Vendere o tenere da parte** — il mercato paga subito, le commesse molto di più.
4. **Quale zona aprire** — costa, e apre un ramo di gioco.

## 3. Come si comanda

**Il dito fa due cose sole:**

- **Trascini** → sposti l'isola.
- **Appoggi e alzi su una cosa** → dai un ordine. La tocchi di nuovo → lo annulli.

Un pulsante allontana la vista per guardare tutta l'isola. Due livelli di zoom soltanto: uno per lavorare, uno per guardare. Una zoomata continua col pizzico, su uno schermo stretto e con un pollice solo, si perde subito.

**L'ordine si vede sempre**: un anello attorno alla cosa, **giallo** se aspetta qualcuno, **verde** se qualcuno ci sta già andando. Senza quel segno non si può sapere cosa si è già comandato.

## 4. Chi lavora

**Ogni bracciante fa un mestiere solo.** Sta fermo finché non c'è in coda un lavoro che sa fare, poi ci va, lo fa, e torna fermo. Lo paghi ogni giorno.

> **Perché non le priorità di RimWorld.** Là ogni colono ha una griglia di priorità da 1 a 4 per ogni tipo di lavoro. È la parte più profonda di quel gioco, ed è anche un foglio di calcolo: su un telefono, con un dito, sarebbe illeggibile. E ne nasce un difetto documentato — col trasporto a priorità alta i coloni attraversano tutta la mappa per un oggetto solo, e il giocatore non capisce perché nessuno stia lavorando.
>
> Qui, se il legno non arriva, basta guardare: **hai un taglialegna solo.**

## 5. Le zone

L'isola non è tutta accessibile. Ogni pezzo è chiuso da un ostacolo che si toglie **costruendo qualcosa**, non trovando una chiave — è il modo di Graveyard Keeper.

| Zona | Cosa porta | Come si apre |
| --- | --- | --- |
| **La radura** | i campi, il casotto | sei lì dall'inizio |
| **Il bosco** | legno, resina | serve un'ascia |
| **La cava** | pietra, rame, ferro | va sgomberata la frana |
| **Il molo** | il mercante e le commesse | va riparato il pontile |
| **L'isola vicina** | un ramo intero nuovo | va costruita una barca |

**Aprire una zona non è "più spazio": è un pezzo di gioco nuovo.** Ogni zona porta una materia prima e un ramo di lavorazioni.

## 6. Le catene — la parte Factorio

> grano → *Mulino* → farina → *Forno* → **pane**, che vale molto di più
>
> ma il Mulino si costruisce col **rame**, e il rame va scavato

Il valore si moltiplica a ogni passaggio, e ogni lavorazione chiede materiali di *un'altra* catena. È così che le zone diventano un gioco solo invece di rami appiccicati.

### I tre gradini dell'automazione

1. **Ordini tu, ogni volta.** Tocchi ogni albero.
2. **L'ordine permanente**: la lavorazione continua da sola finché ha materiale.
3. **Il portatore**: porta la roba da una postazione all'altra. **Adesso la catena gira senza di te.**

Il terzo gradino è il momento del gioco. Tutta la ricerca su Factorio e Satisfactory dice che la gioia vera è una sola: **vedere il sistema funzionare da solo mentre guardi da un'altra parte**, e tornare trovando le casse piene.

### "The factory must grow"

Il motore che non si spegne mai, e viene dritto da Factorio: **la domanda di roba basilare deve crescere sempre più in fretta di quanto tu riesca a produrre.** Commesse e costruzioni devono chiedere più di quanto la fattoria dia. Se un giorno hai abbastanza di tutto, il gioco è finito.

## 7. Il giorno e le spese

Il **giorno** dura pochi minuti. A sera si pagano i **salari** e la manutenzione, i prezzi di mercato si muovono, e un riepilogo dice cosa è successo.

È il meccanismo del *"vabbè, ancora un giorno"*, il motore vero dell'engagement di Stardew.

**Non si perde mai.** Se non riesci a pagare, un bracciante se ne va: la fattoria si rimpicciolisce e riparti. Niente schermata di sconfitta.

## 8. Le tessere

L'isola è fatta di tessere, **ma non si devono vedere.** Servono solo a far agganciare le cose, esattamente come in Factorio — che è una griglia, e non sembra una scacchiera.

Regole di disegno che ne discendono, e sono vincolanti:
- **Le tessere non hanno bordi. Mai.**
- La variazione del terreno è una **macchia tonda** sfalsata, non un quadrato più chiaro. Un quadrato dentro una griglia di quadrati si legge come una scacchiera.
- La riva è una linea chiara dove la terra tocca l'acqua: è quella che fa leggere l'isola come un'isola.

## 9. Cosa questo gioco **non** è

Guardrail, da difendere in ogni decisione futura:

- **Non c'è un personaggio da muovere.** Rifiutato tre volte: non riproporlo.
- **Non è un puzzle game.** Niente moltiplicatori di adiacenza, niente incastri da ottimizzare.
- **Non si perde e non si sbaglia in modo irreversibile.**
- **Non c'è fretta.** Niente timer che scadono, niente che marcisce.
- **Non è un idle da guardare.** Se in una giornata non c'è almeno una decisione, il gioco è rotto lì.
- **Niente valuta premium, niente pubblicità, niente attese che si pagano.**

## 10. La domanda che regge tutto

> ### Guardare l'isola e comandarla col dito è piacevole?

Se sì, tutto il resto è contenuto. Se no, nessuna quantità di catene, zone e braccianti lo salva. **È la verifica obbligatoria del punto 1 della roadmap.**

## 11. Una nota sulla dimensione

Questa versione è **molto più grande di tutte le precedenti messe insieme**: un mondo a tessere, una telecamera, braccianti che si muovono, zone, catene di produzione. Non è una settimana di lavoro.

Il rischio non è che l'idea sia sbagliata — **Graveyard Keeper è esattamente questo gioco, esiste e funziona.** Il rischio è la dimensione. Per questo la roadmap costruisce il *posto* prima di qualunque catena, e si ferma a farlo provare.
