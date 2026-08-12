---
name: isola-glossario
description: Vocabolario condiviso fra il linguaggio comune dell'autore e le entità del codice, più il registro delle cose già rifiutate. Consultala ogni volta che una richiesta usa termini di gioco in italiano, e sempre prima di proporre qualcosa di nuovo.
---

# Il vocabolario, e il registro dei rifiuti

L'autore non programma e scrive dal telefono. Le parole che usa hanno un significato preciso nel codice: qui c'è la traduzione, così non serve chiederla.

## Le parole del gioco

| Parola | Cosa intende | Dove vive nel codice |
| --- | --- | --- |
| **l'isola** | la mappa a tessere | `mondo.js`, `config/isola.json` |
| **l'operaio** | l'unico che lavora. **Non è un personaggio da muovere** | `braccianti.js` |
| **l'ordine** | quello che nasce toccando una cosa. Va in coda | `lavori.js` |
| **la casella** | uno slot dell'inventario, alla Minecraft. Tiene **una pila di un materiale solo** | `inventario.js` |
| **la pila** | quanti pezzi stanno in una casella | `config/isola.json` → `materiali[].pila` |
| **lo zaino pieno** | tutte le caselle occupate. **Non** vuol dire piene fino all'orlo: ci sta ancora del legno, ma non un sasso | |
| **avere in mano** | quello che il prossimo tocco sulla mappa piazzerà | |
| **l'alberello** | quello che esce tagliando un albero, e che si ripianta | |
| **la cassa** | un contenitore con un posto preciso. Stesse caselle dello zaino | `casse.js` |
| **il casotto** | la cassa che c'è dall'avvio. È anche il mercato: lì si vende e si compra | |
| **posare / prendere** | spostare roba fra zaino e contenitore. **È un ordine**, non un gesto: lui ci deve camminare | |
| **l'ostacolo** | albero, masso, frana. **Finisce**: resa una volta, poi libera lo spazio | |
| **il giacimento** *(la vena)* | macchia fissa di tessere che **non si esaurisce mai**. Ha una ricchezza | *punto 4* |
| **la ricchezza** | povero ×0,5 / normale ×1 / ricco ×2. Rende i posti diversi fra loro | *punto 4* |
| **il progetto** | il **diritto** di costruire una cosa. Si compra in monete, poi la cosa la fabbrichi | *punto 6* |
| **la ricetta** | cosa serve per fabbricare una cosa | *punto 5* |
| **la trivella** | la macchina che scava da sola ma **il cassetto lo svuoti tu** | *punto 9* |
| **il nastro** | quello che sposta la roba da solo. Il gradino 3 | *punto 11* |

## Il registro dei rifiuti — leggilo prima di proporre

Queste cose l'autore le ha **rifiutate esplicitamente**. Un rifiuto è un fatto negativo, e i fatti negativi non sopravvivono in un documento che descrive quello che il gioco *è*: per questo stanno qui, con la data e le parole esatte.

| Cosa | Quando | Le sue parole |
| --- | --- | --- |
| **Un personaggio da guidare** | rifiutato **tre volte** | *"non l'omino che si muove"* · *"non vorrei un personaggio ma più da gestionale che col dito comando"* |
| **La scacchiera** | 2026-08-11 | *"non voglio questa cosa a scacchiera"* |
| **Il magazzino centrale** | 2026-08-11 | *"non voglio una sorta di Age of Empires che ha un magazzino principale"* |
| **Il puzzle di incastro** | 2026-08-11 | *"non vorrei però un puzzle game, vorrei più un farmer"* |
| **Il tower defense** | 2026-08-11 | *"sembra molto noioso da vedere e giocare"* |
| **Più coloni** | 2026-08-12 | *"invece di più coloni, mi va bene un singolo solo"* — si cresce con la tecnologia |
| **Gli alberi che ricrescono da soli** | 2026-08-12 | *"non voglio però che gli alberi crescano da soli, ma quando rompo gli alberi mi fa anche gli alberelli così che io poi possa ripiantarli"* |
| **Lo scarico automatico in una cassa** | 2026-08-12 | *"non viene messa la roba in automatico in una chest specifica ma seleziono un inventario e poso la roba che voglio lasciare lì"* — e il perché, detto da lui: *"così da dare poi anche il senso all'automazione per il trasporto"* |
| **Le azioni che partono da sole** | 2026-08-12 | *"fai in modo che devo selezionarli per piantarli perché se no quando clicco a caso pianta solo e sempre gli alberi"* |
| **Il ciclo del giorno** | 2026-08-12 | *"penso che puoi rimuoverlo in quanto non abbiamo più i costi per gli operai"* |

**Riproporre una di queste è l'errore più caro che puoi fare:** costa la fiducia dell'autore, non solo il tempo.

### Il filo che tiene insieme gli ultimi tre rifiuti

Non sono tre dettagli, sono **una regola sola**, e l'autore l'ha detta meglio di quanto l'avessimo capita:

> **Un'automazione vale quanto la fatica che toglie.**

Ogni comodità messa all'inizio è un pezzo di sblocco futuro buttato via. Se lo scarico è già automatico, il nastro non è una liberazione ma un gadget. Se il bosco torna da solo, ripiantare non è una decisione. Se un'azione parte da sola, sceglierla non è un gesto.

**Prima di aggiungere qualunque comodità, chiediti: quale sblocco futuro sto svuotando?**

## Come parla dei problemi

L'autore descrive per **sensazioni**. Tradurle è metà del lavoro, e la traduzione sbagliata costa una riscrittura.

| Dice | Vuol dire quasi sempre |
| --- | --- |
| *"sembra una scacchiera"* | **è un problema di aspetto**, non della meccanica sotto |
| *"è spento", "sembra dilettantesco"* | manca feedback immediato → `isola-sensazione` |
| *"non si capisce niente"* | l'interfaccia non dice perché una cosa non è successa |
| *"è noioso"* | non c'è una decisione: o comprare è sempre giusto, o non c'è niente da volere |
| *"si è bloccato"* | può essere un bug **o** una regola non spiegata. Guarda prima se il gioco stava dicendo di no in silenzio |

## Parole che appartengono ai progetti vecchi

Se compaiono, **non sono richieste**: sono resti di giochi cancellati. Vanno chiarite prima di eseguire qualunque cosa.

**la recluta · l'ondata · il nemico · il castello · la torre · il sentiero · la postazione · l'oro · i cristalli · il boss · la stanza · il piano · il seguito di minion · la levetta · il personaggio da muovere · schivare · la corsia · il bracciante da assumere · il salario · il giorno · la sera**
