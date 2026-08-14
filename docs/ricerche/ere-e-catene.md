# Ere tecnologiche e catene di lavorazione — ricerca

> Stato: **v2 — le due proposte finali ci sono già.** Quello che resta da verificare è segnato `[NON TROVATO]`.
> Ricerca su struttura e numeri, non su sensazioni.

---

## In una riga

**Il guadagno cresce poco (×2, ×3, ×4, ×5: sempre +1) mentre il costo per ottenerlo cresce tanto (1, 3, 5, 8 macchine): è questa forbice che rende l'ultimo gradino una scelta e non un obbligo.**

---

## Le tabelle della moltiplicazione

### Mekanism — il caso più studiato, e il più vicino a noi

Da 1 minerale = 1 lingotto fino a 1 minerale = 5 lingotti, in quattro gradini.

| Gradino | Resa | Catena (passaggi in fila) | Macchine in catena | Macchine NUOVE | Serve un gas/liquido? |
|---|---|---|---|---|---|
| 0 | ×1 | Minerale → fornace | 1 | — | no |
| 1 | ×2 | Minerale → Camera di Arricchimento → 2 polveri → fornace | 2 | +1 | no |
| 2 | ×3 | Minerale → Purificazione (ossigeno) → 3 grumi → Frantumatore → 3 polveri sporche → Arricchimento → 3 polveri → fornace | 4 | +2, più il separatore elettrolitico per l'ossigeno | sì: ossigeno |
| 3 | ×4 | Minerale → Iniezione Chimica (acido cloridrico) → 4 schegge → poi tutta la catena ×3 | 5 | +1 in catena, più l'Infusore che fabbrica l'acido | sì: ossigeno + acido cloridrico |
| 4 | ×5 | Minerale → Dissoluzione (acido solforico) → fanghi sporchi → Lavaggio (acqua) → fanghi puliti → Cristallizzatore → cristalli → poi tutta la catena ×4 | 8 | +3 | sì: 3 gas + acqua |

**La forbice, la cosa da copiare:**

| Da → a | Guadagno reale | Macchine in più |
|---|---|---|
| ×1 → ×2 | **+100 %** | +1 |
| ×2 → ×3 | **+50 %** | +2 |
| ×3 → ×4 | **+33 %** | +1 (ma arriva tutta la chimica) |
| ×4 → ×5 | **+25 %** | +3 |

Il guadagno si dimezza a ogni gradino, il costo no. Per questo la maggior parte dei giocatori si ferma al ×3 o al ×4 finché non ha corrente e spazio in abbondanza. **Il ×5 non è obbligatorio: è un lusso.** È esattamente il meccanismo che rende la scelta viva.

`[NON TROVATO]` energia esatta per macchina e durata in tick di ogni passaggio — le fonti trovate descrivono la catena ma non pubblicano i valori numerici di consumo.

### Immersive Engineering — il contro-esempio importante

| Gradino | Resa | Come |
|---|---|---|
| 0 | ×1 | fornace |
| 1 | ×2 | Frantumatore (multiblocco grande) → 2 granuli → fornace |

**Si ferma a ×2 e basta.** Niente ×3, ×4, ×5. Tutta la difficoltà sta nel **costruire la macchina** (un multiblocco fatto di decine di pezzi) e nel portarle la corrente. Prova che una scala lunga di moltiplicatori **non serve** per fare un buon gioco di produzione: la profondità si può mettere nel *costo di costruzione* invece che nel *numero di passaggi*. Per un gioco da telefono questa è la lezione più utile.

### Thermal (Thermal Expansion / Thermal Series)

| Gradino | Resa | Come | Cosa costa in più |
|---|---|---|---|
| 0 | ×1 | fornace | — |
| 1 | ×2 | Polverizzatore → 2 polveri + piccola probabilità di sottoprodotto | 1 macchina |
| 2 | ×3 | Fonditore a Induzione: minerale + un **catalizzatore consumabile** (sabbia, scoria ricca, cinabro) → 3 lingotti | 1 macchina + un consumo continuo |

Punto strutturale: il terzo gradino **non costa più macchine, costa un consumabile**. Un secondo modo di far pagare la moltiplicazione — invece di "più impianto", "più input a ogni ciclo". Utile per noi: è più leggibile su telefono di una catena lunga.

`[NON TROVATO]` percentuali esatte dei sottoprodotti.

### GregTech / GT: New Horizons

Qui il moltiplicatore principale resta basso (circa ×2 sul metallo), ma la catena serve a **tirare fuori sottoprodotti diversi** dallo stesso minerale.

| Passaggio | Cosa fa |
|---|---|
| Macinatore | minerale → 2 minerale frantumato |
| Lavatore (acqua) | frantumato → purificato + polvere di sottoprodotto + polvere di pietra |
| Centrifuga Termica | frantumato o purificato → centrifugato + sottoprodotto |
| Macinatore (di nuovo) | purificato o centrifugato → polvere |
| Separatore Elettromagnetico / Bagno Chimico / Setaccio | rami laterali per gemme e metalli rari |

Rotte alternative documentate per lo stesso minerale: `macina → macina → lava`, `macina → centrifuga → macina`, `macina → lava → macina → lava`. Ogni minerale ha una rotta ottimale **diversa**, e la rotta migliore cambia nel tempo secondo cosa serve. Quindi il giocatore non costruisce "la catena": costruisce **uno smistamento**. Massima complessità del genere, su telefono non replicabile.

### GregTech — la scala delle ere (tensioni)

15 tier previsti: **Pietra • Vapore • LV • MV • HV • EV • IV • LuV • ZPM • UV • UHV • UEV • UIV • UMV • UXV**.
Da LV in poi **ogni tier ha 4 volte la potenza del precedente**. È la scala più pulita trovata: il gate è la corrente, e la corrente quadruplica. Il numero (×4) non cambia mai — il giocatore impara una sola regola e la applica per 15 ere.

`[NON TROVATO]` ore per tier ufficiali. Le stime che girano nella comunità (centinaia di ore per arrivare a metà scala) non sono confermate da fonti citabili, quindi non le riporto come dato.

### Satisfactory — moltiplicare con un liquido invece che con una catena

| Ricetta | Input | Output | Moltiplicatore |
|---|---|---|---|
| Lingotto di ferro (base) | 1 minerale | 1 lingotto | ×1 |
| **Lingotto di ferro puro** (raffineria) | 7 minerale + 10 acqua | 13 lingotti | **×1,86** |
| Lingotto di rame (base) | 1 minerale | 1 lingotto | ×1 |
| **Lingotto di rame puro** (raffineria) | rame + acqua | rapporto 1:2 | **×2** |

Confronto pratico citato: per 60 lingotti di ferro al minuto servono 60 minerali con la fonderia, oppure **circa 32 minerali + 46 acqua** con la raffineria.
Struttura: la moltiplicazione non è un gradino della catena principale, è una **ricetta alternativa** che si sblocca più tardi e chiede un secondo ingrediente abbondante (acqua). Costa una macchina più grande e una tubatura, non cinque macchine in fila.

---

## La forma delle ricette

| Gioco | Ingredienti per ricetta | Semilavorati totali | Note |
|---|---|---|---|
| Factorio (base) | quasi sempre **1, 2 o 3**; 4+ è raro e solo per oggetti finali | **circa 20** per l'intera partita | piastre, ingranaggi, cavo di rame, 3 livelli di circuiti, plastica, zolfo, batteria, motore, ecc. |
| Satisfactory | 1–3 in gran parte, 4 sui prodotti finali | qualche decina | il ramo dei liquidi raddoppia il numero apparente |
| Mekanism | 1–2 per passaggio della catena minerale | 5–6 stati intermedi per minerale (grumo, polvere sporca, polvere, scheggia, cristallo, fanghi) | è una **fila**, non un albero |
| GregTech | 1–3, ma centinaia di materiali | migliaia | fuori scala |

**Regolarità che si ripete ovunque: tre ingredienti è il tetto naturale.** Non è una scelta di stile, è il limite oltre il quale il giocatore smette di ricordare la ricetta a memoria. La regola già fissata nel nostro progetto (mai più di tre) coincide con la pratica dei giochi migliori.

**Dove due catene si incontrano.** In Factorio i punti d'incontro sono pochi e sono i momenti memorabili della partita:
- circuito verde = piastra di ferro + cavo di rame (**il ferro incontra il rame**)
- acciaio = solo ferro (nessun incontro, è una compressione: 5 piastre → 1 acciaio)
- circuito rosso = circuito verde + plastica + cavo di rame (**il petrolio incontra il metallo**)
- motore = ferro + acciaio + tubo

Nota: gli incontri sono **1 ogni 4-6 semilavorati**, non a ogni passaggio. Se tutte le ricette mescolano tutto, nessuna sembra speciale.

**Le compressioni contano quanto le moltiplicazioni.** L'acciaio di Factorio (5 → 1) e i mattoni di quasi tutti i giochi vanno nella direzione opposta: consumano tanto e producono poco. Servono a dare un motivo per produrre in eccesso. Una catena fatta solo di ×2 e ×3 diventa inflazione: le compressioni sono lo scarico.

---

## Le ere

### Come sono tagliate nei giochi studiati

| Gioco | Ere / tier | Nome dei tagli | Cosa sblocca il passaggio |
|---|---|---|---|
| GregTech / GTNH | 15 | Pietra, Vapore, LV, MV, HV, EV, IV… | **una tensione elettrica**: costruire la macchina del tier successivo, che quadruplica la potenza |
| Satisfactory | 9 tier (0–8/9) | Tier 0 = tutorial, poi coppie di tier | **consegnare quantità** di oggetti complessi all'Ascensore Spaziale (Fase 1 apre i tier 3-4, Fase 2 i 5-6, Fase 3 i 7-8, Fase 4 il 9) |
| Factorio | 7 | i sette colori delle boccette di scienza (rossa, verde, militare, blu, viola, gialla, bianca) | **produrre un nuovo oggetto**: la boccetta stessa. Se la sai fare, hai l'era |
| SevTech: Ages | 6 (Età 0–5) | Età della Pietra, Bronzo, Medioevo, Industriale… | un **traguardo obiettivo** che porta a un **traguardo sfida**: un oggetto chiave da fabbricare |
| Mekanism | 4 (dentro una sola catena) | ×2, ×3, ×4, ×5 | costruire la macchina che aggiunge un passaggio |

`[NON TROVATO]` **il numero di ore per era non è pubblicato da nessuna fonte citabile**, per nessuno dei giochi. Ho cercato più volte, sia sui wiki ufficiali sia sulle guide. Le uniche cose verificabili sono strutturali (quanti tier, cosa li apre), non temporali. Non invento numeri di ore.
Unico dato di contesto solido: Satisfactory ha 9 tier e Factorio 7 colori di scienza per una partita completa — quindi **7-9 tagli è la lunghezza normale di un gioco di produzione completo su PC**. Su telefono, con sessioni corte, il taglio deve essere più fitto e più corto.

`[NON TROVATO]` numero esatto di oggetti nuovi per era nei modpack. Il solo ancoraggio affidabile è Factorio: **circa 20 semilavorati per tutta la partita divisi su 7 colori di scienza ≈ 3 semilavorati nuovi per era**, più le macchine.

---

## Come si fa il gate fra un'era e l'altra

Quattro modi visti in giro, con pro e contro.

| Modo | Esempio | Pro | Contro |
|---|---|---|---|
| **Oggetto chiave** — devi saper fabbricare una cosa precisa | Factorio (la boccetta), SevTech (il traguardo sfida) | chiarissimo, un solo obiettivo da mostrare a schermo, non si può sbagliare | se l'oggetto è facile l'era dura niente; se è difficile ci si blocca senza capire perché |
| **Quantità da consegnare** — devi produrne tanti | Satisfactory (Ascensore Spaziale) | obbliga a **automatizzare**, non basta farne uno a mano; misura la produzione, non la conoscenza | può diventare attesa passiva; su telefono rischia di annoiare se la quantità è alta |
| **Una capacità tecnica** — devi raggiungere un livello di corrente/calore | GregTech (le tensioni) | scala all'infinito con un solo numero (×4 ogni volta); si spiega in una riga | freddo, non racconta niente; da solo non basta |
| **Un luogo nuovo** — devi arrivare da qualche parte | modpack con dimensioni nuove | dà un'immagine forte, l'era si vede | costa contenuto nuovo (mappa, grafica), il più caro da produrre |

**Cosa funziona meglio, secondo la struttura osservata:** i giochi migliori ne usano **due insieme** — un oggetto chiave *più* una quantità. Satisfactory è il modello più solido perché il gate misura se **sai produrre in continuo**, non se hai fatto un pezzo una volta. Factorio è il più leggibile perché il gate è una cosa sola con un'icona.

Per un gioco da telefono con **un solo operaio**, il gate migliore è: **un oggetto chiave che richiede l'incontro di due catene, in una quantità piccola ma non banale** (tipo 5-10 pezzi). Piccola perché il tempo dell'operaio è la risorsa scarsa; non banale perché deve costringere a organizzare la produzione, non solo a cliccare.

---

## Quanti materiali sono troppi

Dati raccolti:

| Gioco | Materiali/semilavorati totali | Piattaforma |
|---|---|---|
| Factorio base | ~20 semilavorati + ~10 grezzi | PC |
| Satisfactory | qualche decina, ma distribuiti su 9 tier | PC |
| Mekanism (per un solo minerale) | 6 stati intermedi | PC |
| GregTech / GTNH | migliaia | PC, con enciclopedia in gioco obbligatoria |

**Non ho trovato uno studio pubblicato con "la soglia".** Quello che si può dedurre in modo onesto:

- GregTech dimostra che **oltre poche centinaia di materiali serve per forza un motore di ricerca dentro il gioco** (il JEI/NEI). Se il tuo gioco non ha un motore di ricerca, non puoi permetterti quel numero.
- Factorio arriva a fine partita con ~20 semilavorati e nessuno lo trova povero. **Venti è già tanto.**
- Su telefono verticale il vincolo è fisico: una griglia leggibile con aree toccabili da 44 px fa entrare **circa 4 colonne × 5-6 righe = 20-24 caselle** per schermata senza far scorrere.

**Regola pratica proposta:** massimo **8 materiali visibili contemporaneamente per era**, massimo **~24 in tutta la vita del gioco** prima di dover introdurre una ricerca o dei filtri. Se una materia prima nuova non porta almeno **due** ricette nuove, non merita di esistere.

---

## Il legno e i rinnovabili: restano utili o muoiono?

| Gioco | Il legno a fine partita |
|---|---|
| Factorio | **muore quasi subito**: serve solo per i primi pali e i primi cassoni; a metà partita non lo usa più nessuno |
| Satisfactory | **muore**: raccolta manuale, nessuna catena, esiste per il carburante d'emergenza |
| GregTech / GTNH | **sopravvive** perché diventa carbone di legna, creosoto, gomma, e alimenta le prime caldaie a vapore |
| Modpack con serre/alberi automatici | **sopravvive** perché diventa combustibile automatizzabile |

**Lo schema è netto: il legno sopravvive solo se diventa combustibile o entra in un materiale composito.** Se resta "un materiale da costruzione da principianti", muore appena arriva il metallo.

Per il nostro gioco questa è la parte più importante della ricerca, perché gli alberi non ricrescono da soli: **se il legno muore, il ripiantare diventa una fatica inutile**. Bisogna dargli almeno uno di questi due destini:
1. diventa **carbone di legna**, e il carbone di legna è il combustibile delle prime macchine (e resta un'alternativa peggiore ma sempre disponibile al carbone vero della seconda isola);
2. entra in un materiale composito che non si può fare senza (il telaio già fa questo, e va tenuto vivo anche nelle ere successive).

---

## La corrente come gate: primo o secondo problema?

Cosa fanno i giochi studiati:

| Gioco | Le prime macchine hanno bisogno di corrente? |
|---|---|
| Factorio | **No.** Le prime macchine sono a **carbone bruciato direttamente** (trivella a bruciatore, fornace a pietra). L'elettricità arriva come **secondo** problema, ed è un salto di qualità, non l'ingresso |
| Satisfactory | **Sì subito**, ma è banalissima: il generatore a biomassa si accende con la roba raccolta a mano. Il problema vero (il carbone, che richiede l'acqua) arriva al Tier 3 |
| GregTech / GTNH | **No.** C'è tutta un'era del **Vapore** prima di LV. Le macchine a vapore fanno lo stesso lavoro di quelle elettriche, più lentamente |
| Mekanism | **Sì**, ma Mekanism non è un gioco completo, è un modulo che si innesta quando l'elettricità c'è già |

**Tre giochi su quattro mettono un'era intera di macchine SENZA corrente prima dell'elettricità.** È una struttura ricorrente e ha una logica chiara:

- la prima macchina deve insegnare **una sola cosa nuova** ("una macchina lavora al posto tuo");
- se la prima macchina chiede anche corrente, insegna **due** cose insieme (la macchina *e* la rete) e il giocatore si perde;
- la corrente diventa allora il gate successivo, e ha un compito preciso: **far funzionare più macchine insieme**, che è un problema diverso e più interessante.

Conclusione per noi: **la corrente deve essere il SECONDO problema, non il primo.** Segheria, frantoio e fornace devono poter partire senza rete elettrica (a manovella, o a combustibile). L'elettricità arriva dopo, e il suo senso è: *ora ne fai funzionare cinque contemporaneamente senza toccarle*.

---

## PROPOSTA DI ERE PER IL NOSTRO GIOCO

Quattro ere. Rispettano le regole fissate (mai più di 3 ingredienti; una ricetta non produce mai un materiale che consuma) e stanno su uno schermo verticale.

**Su cosa è basata:** sulla struttura di Factorio (gate = un oggetto chiave riconoscibile), di Satisfactory (gate = una quantità da consegnare, non un pezzo solo), di GregTech (un'era di macchine senza corrente prima dell'elettricità) e sulla forbice di Mekanism (guadagno che si dimezza, costo che no). Le durate in minuti sono **stime mie**, non dati trovati: nessuna fonte pubblica le ore per era.

| # | Nome | Materie prime | Semilavorati nuovi | Macchine nuove | Oggetti nuovi in tutto | Durata stimata | Cosa sblocca la successiva |
|---|---|---|---|---|---|---|---|
| **1** | **Le Mani** | legno, pietra, rame | tavole, ghiaia, chiodi, **telaio** | banco (già c'è) | 7 | 20–40 min | **Costruire la Segheria**: costa 4 telai + 20 tavole. Il telaio è la chiave perché è l'unica ricetta dove due catene si incontrano |
| **2** | **Il Fuoco** | + carbone di legna | mattone, lingotto di rame, filo di rame, **ingranaggio** | Segheria, Frantoio, Fornace (tutte **a combustibile**, niente corrente) | 8 (4 materiali + 3 macchine + carbonaia) | 1–2 h | **Costruire la Dinamo**: 2 ingranaggi + 4 filo di rame + 1 telaio (3 ingredienti, regola rispettata) |
| **3** | **La Corrente** | — | cavo, **batteria**, piastra di rame | Generatore, Palo della corrente, Trivella, Nastro | 7 | 2–3 h | **Costruire il Molo**: 10 telai + 20 mattoni + 4 batterie — quantità, non un pezzo solo, come l'Ascensore di Satisfactory |
| **4** | **La Seconda Isola** | + ferro, carbone | lingotto di ferro, **acciaio**, utensile | Segheria/Frantoio/Fornace elettrici (versione ×4), Altoforno | 8 | infinita | Nessuna: da qui il gioco continua con **nuove isole** e **macchine migliori**, non con una costruzione finale |

**Totale: 30 oggetti in 4 ere, mai più di 8-9 visibili insieme.** Sotto la soglia di leggibilità stimata sopra.

**Perché in quest'ordine:**
- Era 1 insegna una cosa sola: *le ricette*.
- Era 2 insegna una cosa sola: *una macchina lavora al posto tuo* — e paga in combustibile, cioè in **legno**, che è la risorsa che va tenuta viva.
- Era 3 insegna una cosa sola: *le macchine funzionano da sole tutte insieme*. La corrente è il **secondo** problema, come in Factorio e in GregTech.
- Era 4 insegna una cosa sola: *ci sono altri posti*. Da qui la progressione è infinita e non serve nulla di nuovo concettualmente, solo numeri più grandi e isole nuove.

**Attenzione (rischio da segnalare all'autore):** l'Era 3 è l'unica dove il gioco cambia natura — l'operaio smette di essere l'unica fonte di lavoro. Se le trivelle e i nastri fanno tutto, la risorsa scarsa (il suo tempo) smette di essere scarsa e la scelta fra spendere e potenziare si spegne. La contromisura strutturale è: **le macchine consumano combustibile, e il combustibile lo deve andare a prendere o a caricare l'operaio.** Così il suo tempo resta il collo di bottiglia anche dopo l'automazione.

---

## PROPOSTA DI CATENE

Regole rispettate ovunque: mai più di 3 ingredienti; nessuna ricetta produce un materiale che consuma.

### Legno — l'unica risorsa davvero finita, quindi l'unica dove il moltiplicatore conta

| Gradino | Dove | Ricetta | Resa | Guadagno rispetto al gradino prima |
|---|---|---|---|---|
| mano | banco | 1 legno → 2 tavole | ×2 | — |
| macchina | Segheria (combustibile) | 1 legno → 3 tavole | ×3 | **+50 %** |
| macchina elettrica | Segheria elettrica | 1 legno → 4 tavole | ×4 | **+33 %** |
| ramo combustibile | Carbonaia | 2 legno → 1 carbone di legna | ×0,5 (**compressione**) | — |

La compressione della carbonaia è quello che tiene vivo il legno per tutta la partita: il legno non è "il materiale dei principianti", è **il carburante**.

### Pietra

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| mano | banco | 1 pietra → 2 ghiaia | ×2 |
| macchina | Frantoio | 1 pietra → 3 ghiaia | ×3 |
| macchina elettrica | Frantoio elettrico | 1 pietra → 4 ghiaia | ×4 |
| compressione | Fornace | 3 ghiaia + 1 carbone di legna → 1 mattone | ×0,33 |

### Rame

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| mano | banco | 1 rame → 4 chiodi | ×4 |
| fusione | Fornace | 1 rame + 1 carbone di legna → 1 lingotto di rame | ×1 |
| trafilatura | banco | 1 lingotto → 2 filo di rame | ×2 |
| laminatura | banco / pressa | 1 lingotto → 2 piastre di rame | ×2 |
| corrente | banco | 1 filo + 1 tavola → 2 cavo | — |

I chiodi restano la via veloce (×4 subito, ma servono solo per il telaio); il lingotto è la via lenta che apre tutto il resto. **È la prima vera scelta di spesa del gioco.**

### Ferro (Era 4)

| Gradino | Dove | Ricetta | Resa |
|---|---|---|---|
| fusione | Fornace | 1 ferro + 1 carbone → 1 lingotto di ferro | ×1 |
| macinatura | Frantoio elettrico | 1 ferro → 2 polvere di ferro | ×2 |
| fusione della polvere | Fornace | 1 polvere + 1 carbone → 1 lingotto di ferro | — (**il ×2 vero passa da qui**) |
| compressione | Altoforno | 3 lingotti di ferro + 2 carbone → 1 acciaio | ×0,33 |
| incontro | banco | 1 acciaio + 2 tavole → 1 utensile | — |

Nota: questa è la nostra versione del ×2 di Mekanism e costa **due macchine invece di una**, esattamente la forbice descritta sopra. Chi non vuole costruirle fonde il ferro direttamente e va avanti lo stesso, più lentamente.

### Carbone (Era 4)

Il carbone **non si moltiplica**: è la valuta del combustibile. È lì per rendere il carbone di legna la scelta peggiore ma sempre disponibile.

| Uso | Ricetta |
|---|---|
| combustibile | 1 carbone = 3 volte il carbone di legna |
| acciaio | vedi sopra |

### Dove le catene si incontrano — solo 4 punti in tutto il gioco

| Era | Oggetto | Ricetta | Chi incontra chi |
|---|---|---|---|
| 1 | **Telaio** | 4 tavole + 6 chiodi | legno × rame |
| 2 | **Ingranaggio** | 2 lingotti di rame + 1 tavola | metallo × legno |
| 3 | **Batteria** | 2 piastre di rame + 1 mattone + 1 filo | metallo × pietra |
| 4 | **Utensile** | 1 acciaio + 2 tavole | ferro × legno |

Uno per era. È il ritmo di Factorio (un incontro ogni 4-6 semilavorati) e coincide con il gate: **l'oggetto che fa incontrare due catene è sempre l'oggetto che apre l'era dopo.** Così il giocatore impara una regola sola e la riconosce ogni volta.

---

## Le tre cose da portarsi via

1. **Il guadagno deve dimezzarsi a ogni gradino mentre il costo no** (Mekanism: +100 %, +50 %, +33 %, +25 % contro 1, 3, 5, 8 macchine). È così che l'ultimo gradino resta una scelta.
2. **La corrente è il secondo problema, non il primo.** Un'era intera di macchine a combustibile prima dell'elettricità (Factorio, GregTech).
3. **Il legno vive solo se diventa combustibile.** In tutti i giochi dove non lo diventa, muore nella prima ora.

---

## Fonti

- Mekanism, Ore Processing (wiki ufficiale) — https://wiki.aidancbrady.com/wiki/Ore_Processing
- Mekanism, Tutorials/Basic Ore Processing Setup — https://wiki.aidancbrady.com/wiki/Tutorials/Basic_Ore_Processing_Setup
- Ore processing (Mekanism), FTB Wiki — https://ftb.fandom.com/wiki/Ore_processing_(Mekanism)
- Mastering Mekanism: Ore Processing from 2x, 3x, 4x to 5x — https://jangro.com/2024/12/22/mastering-mekanism-ore-processing-from-2x-3x-4x-to-5x
- Mekanism Ore Processing Guide, Craft Down Under — https://forum.playcdu.co/threads/mekanism-ore-processing-guide.711/
- GT New Horizons, Ore Processing Concepts — https://wiki.gtnewhorizons.com/wiki/Ore_Processing_Concepts
- GT New Horizons, Singleblock Machines — https://wiki.gtnewhorizons.com/wiki/Singleblock_Machines
- GT New Horizons, Tier — https://wiki.gtnewhorizons.com/wiki/Tier
- Thermal Centrifuge (GregTech 5), FTB Wiki — https://ftb.fandom.com/wiki/Thermal_Centrifuge_(GregTech_5)
- Factorio, Science pack (wiki ufficiale) — https://wiki.factorio.com/Science_pack
- Factorio, rapporti delle linee di scienza — https://factorio-wiki.pages.dev/en/production/science-pack-production
- Satisfactory, Milestones (wiki ufficiale) — https://satisfactory.wiki.gg/wiki/Milestones
- Satisfactory Progression Guide: Milestones, Tiers and the Space Elevator — https://xgamingserver.com/blog/satisfactory-milestones-tech-tree/
- Satisfactory, Pure Ingots (Iron, Copper, Caterium) — https://www.relictrek.net/satisfactory/pure-ingots.html
- Satisfactory, Iron Ingot — https://satisfactory.fandom.com/wiki/Iron_Ingot
- SevTech: Ages, Ages (wiki ufficiale) — https://sevtechages.fandom.com/wiki/Ages
- SevTech: Ages, Advancements — https://sevtechages.fandom.com/wiki/Advancements
