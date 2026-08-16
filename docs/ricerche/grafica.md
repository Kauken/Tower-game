# Ricerca — Grafica dell'isola: sprite, terreno, leggibilità

**Verifica dei file (dichiarata come richiesto).** `docs/PROGETTI.md` esiste, `docs/GDD.md` è la v7.1 e parla dell'isola, dell'operaio e delle macchine — non di torri. Ramo attivo: `claude/torre-guardia-scaffold-5fv3nl`. **Nessun `git checkout` è stato necessario: la copia di lavoro era già quella giusta.**

**Il taglio.** Solo quello che si vede *sull'isola*: terreno, alberi, sassi, frane, vene, casotto, casse, macchine, operaio. I pannelli e il cruscotto li sta facendo un altro agente e non li tocco.

**Come leggere i numeri.** Dove scrivo *(citato)* il numero viene da una fonte, elencata in fondo. Dove scrivo *(nostro, calcolato)* l'ho ricavato io dal tuo codice e dalla tua configurazione: `src/game/sagome.js`, `src/game/disegno.js`, `src/game/schermo.js`, `config/motore.json`, `config/isola.json`, `config/costruzioni.json`.

---

## In una riga

**Le tue cose non hanno nessun contrasto di chiarezza col terreno: in bianco e nero un albero e l'erba sono quasi lo stesso grigio. Il cambiamento singolo che sposta di più è dare a ogni cosa un contorno scuro di spessore fisso — fisso in pixel di schermo, non proporzionale alla sagoma.**

Il contorno c'è già, ma è disegnato *dentro* la sagoma e quindi rimpicciolisce insieme a lei: alla vista lontana vale mezzo pixel, cioè non esiste. Un contorno da 2 pixel veri, sempre 2, a qualunque zoom, ricrea il confine che oggi manca — e lo fa a prescindere da quali colori scegli dopo.

---

## Il problema misurato: la prova del bianco e nero

C'è una regola che tutti gli studi di grafica usano prima ancora di parlare di colori: **si guarda il disegno in bianco e nero. Se in grigio non si distingue, nessun colore lo salverà.** Si chiama *value study* o *notan*, ed è un controllo che si fa in fase di revisione, prima di discutere la tavolozza. *(citato: Realism Today, nastyrodent, Will Kemp Art School)*

Ho fatto quella prova sui tuoi colori. Ecco il grigio di ogni cosa, da 0 (nero) a 255 (bianco):

| Cosa | Colore | Grigio |
| --- | --- | --- |
| **Erba (il fondo su cui sta quasi tutto)** | `#5b8a3c` | **115** |
| Vena di rame | `#8a6448` | **108** |
| Frana | `#7a6a52` | **108** |
| Masso | `#6a7078` | **111** |
| Vena di rame ricca | `#966b48` | **116** |
| Vena di pietra | `#77808c` | **127** |
| Chioma dell'albero | `#5aa03c` | **128** |
| Frana (parte chiara) | `#a08a68` | 141 |
| Casotto (tetto) | `#c98a52` | 150 |
| Masso (faccia in luce) | `#98a1aa` | 159 |
| Operaio | `#c9a45c` | 167 |
| **Sabbia** | `#d8c48a` | **195** |
| Cappello dell'operaio | `#f5e2b4` | 226 |

*(nostro, calcolato con la formula standard 0,299·R + 0,587·V + 0,114·B)*

Guarda la parte alta della tabella. **Erba 115, rame 108, frana 108, masso 111, rame ricco 116, pietra 127, albero 128.** Sette cose diverse dentro venti livelli di grigio su duecentocinquantacinque. In bianco e nero è una poltiglia uniforme: si distinguono solo perché sono di colore diverso, e il colore è il canale più debole dei tre.

E c'è un secondo guaio nella stessa tabella: **la sabbia (195) è la cosa più chiara e più contrastata dello schermo dopo il cappello dell'operaio.** La spiaggia urla più forte degli alberi. La regola comune è l'opposto: il fondo dev'essere la parte più smorta, e la saturazione va tenuta per le cose che contano. *(citato: Sprite-AI, itch.io 60-30-10)*

---

## Le misure vere: quanto è grande una cosa sul tuo schermo

Il canvas è logico 720×1440 e viene rimpicciolito per entrare nello schermo (`src/game/schermo.js`). Su un telefono normale da 390 punti di larghezza il fattore è **0,54**. Tessera = 64 logici. Zoom: 1 (da vicino) e 0,55 (tutta l'isola).

| Cosa | Da vicino (zoom 1) | Da lontano (zoom 0,55) |
| --- | --- | --- |
| Una tessera | 35 punti | 19 punti |
| Un albero (parte davvero dipinta) | 35 punti | **19 punti** |
| **L'operaio (parte davvero dipinta)** | **11 punti** | **6 punti** |
| Il contorno scuro dell'albero | 1 punto | **0,6 punti** |
| Il pallino di stato della macchina | 6 punti | **3,5 punti** |
| La fiamma della macchina | 4,5 punti | **2,5 punti** |

*(nostro, calcolato)*

Le soglie che si trovano in giro: **44 punti** (Apple) e **48 punti** (Google) per una cosa da *toccare*; **24–32 punti** per un'icona da *riconoscere* in una barra; 48 e oltre per un'illustrazione. *(citato: Apple HIG e Material via le guide sulle dimensioni, Xbox Accessibility Guidelines)*

Cosa vuol dire per noi:

1. **L'operaio è la cosa più piccola dell'isola.** Undici punti da vicino: più o meno una lettera minuscola. Sei punti da lontano. Nel GDD c'è scritto che *"guardarlo lavorare è metà del gioco"* — a sei punti non lo guardi, lo indovini. Il motivo tecnico è che il suo raggio è fissato a 13 logici (`grafica.bracciante.raggio`), cioè un quinto di tessera, e per giunta dentro la sua sagoma da 192 lui occupa solo il 48% del riquadro, mentre l'albero ne occupa il 74%. Doppia penalizzazione.
2. **Il pallino di stato della macchina non esiste da lontano.** 3,5 punti. C'è persino una nota in `motore.json` che dice che sono stati alzati dopo averli guardati sul telefono: non basta ancora.
3. **Il contorno è sotto il pixel.** Vedi sopra.

---

## Le sette domande

### 1. Cosa fa distinguere una cosa dall'altra, vista dall'alto

L'ordine di forza è sempre lo stesso, ed è un ordine, non un elenco:

**Sagoma → chiarezza → colore → dettaglio.**

- **La sagoma.** La regola più citata è che **circa il 70% di quanto un disegno si legge viene dal profilo, e solo il 30% dai dettagli dentro**. Il metodo di controllo è: riempi la cosa di nero pieno su fondo bianco; se non la riconosci, il disegno è sbagliato e nessun dettaglio lo aggiusta. *(citato: nastyrodent, 80 Level)*
- **La chiarezza (il grigio).** È la prova del bianco e nero di cui sopra. Nelle produzioni si fa lo studio in grigio *prima* di parlare di colori. *(citato: nastyrodent)*
- **Il contorno.** Serve a una cosa sola: **aumentare il contrasto sul bordo**. La regola scritta è netta — *un contorno deve sempre aumentare il contrasto, mai diminuirlo*. Esiste una versione raffinata che si chiama **sel-out** (*selective outline*): linea scura solo dove la cosa tocca il fondo, e nessuna linea sul lato in luce. È considerata l'impostazione professionale di base. *(citato: Lospec, Pixnote)*
- **L'ombra.** È il modo più economico di dire "questa cosa sta *sopra* al terreno, non *dentro*". Ce l'hai già ed è una scelta giusta, ma è debole: alpha 0,22 e spostamento del 6% del raggio *(nostro)*.
- **La dimensione.** È un canale che **non stai usando**: albero, masso, frana, vena, casotto occupano tutti più o meno una tessera. Se una frana fosse visibilmente più grande di un masso, li distingueresti prima ancora di guardarli.

Una nota utile da Factorio: quando una cosa è complicata di suo, non la si può semplificare oltre un certo punto senza renderla irriconoscibile — a quel punto la strada è tenere versioni diverse per le diverse distanze, non appiattire il disegno. *(citato: Friday Facts #290 e #355)*

### 2. Lo schermo di un telefono

Misure reali *(citate)*:
- Da toccare: **44 punti** (Apple), **48 punti** (Google), con 8 punti di spazio attorno.
- Da riconoscere in una barra: **24–32 punti**.
- Da guardare come illustrazione: **48 punti e oltre**.
- Il testo: 16 punti è già il limite basso della lettura comoda alla distanza normale del telefono (25–35 cm).

Cosa cambia rispetto a un monitor: il telefono si tiene più vicino, ma è molto più piccolo, e **il pollice copre una parte dello schermo**. Il risultato pratico è che le cose piccole non sono "più piccole", sono *assenti*: sotto i ~10 punti una forma non si legge più come una forma, si legge come una macchiolina di colore. Le tue macchine comunicano il loro stato con un pallino da 3,5.

Regola pratica che ne ricavo *(derivata, non citata)*: **niente che debba essere riconosciuto a colpo d'occhio sotto i 20 punti; niente che debba essere *letto* (uno stato, un numero) sotto i 24.** Alla vista lontana l'albero è a 19 ed è al limite; l'operaio a 6 e il pallino a 3,5 sono sotto di parecchio.

### 3. Disegnare col codice invece che con le immagini

**Regge, e la tua implementazione è già quella giusta.** Il punto che quasi tutti sbagliano è ridisegnare le forme a ogni fotogramma; tu le cuoci una volta in una tela nascosta e poi copi. Tecnicamente **quello che ottieni è esattamente uno sprite** — l'unica differenza è chi l'ha disegnato. Il costo a fotogramma è identico a caricare dei PNG.

Chi lo fa: i giochi vettoriali in canvas (tutta la famiglia Asteroids/Vector, la raccolta NoSprite), e in generale i giochi a forme piatte tipo Islanders o Terra Nil sono costruiti su geometria semplice e colore piatto, non su texture. La lezione comune di quel filone è che **il carattere lo fanno il colore e il contrasto, non la complessità del materiale**, e che i bordi si tengono duri e visibili di proposito. *(citato: Polydin/retrostylegames, Overclockers su Terra Nil)*

Il vero limite del codice **non è la velocità: è la mano.** Cerchi e rettangoli tendono a produrre forme simmetriche e centrate, e le forme simmetriche e centrate si somigliano tutte. La cosa che ti manca non è "più dettaglio", è **profili asimmetrici e riconoscibili**. È una cosa che si può fare col codice benissimo — basta smettere di disegnare tutto dentro un cerchio centrato.

Un dettaglio tecnico concreto: cuoci a 192 e copi a 47 (da vicino) o 26 (da lontano). Ridurre di quattro-sette volte in una passata sola con `drawImage` dà un risultato molliccio, perché Canvas 2D non ha le mipmap. Si aggiusta in due modi: `ctx.imageSmoothingQuality = 'high'` *(citato: MDN)*, oppure — meglio — cuocendo l'atlante **due volte**, una grande e una piccola, e usando quella giusta per lo zoom. È lo stesso ragionamento delle mipmap di Factorio, in piccolo. *(citato: FFF #355 + MDN)*

### 4. La palette

Metodi che hanno un nome, non impressioni:

- **60-30-10.** Il 60% della superficie a un colore dominante (il fondo), il 30% a un secondario (le cose importanti), il 10% a un accento **riservato in esclusiva alle cose interattive**. È la formulazione precisa: l'accento non si usa da nessun'altra parte. *(citato: itch.io, IRAGAMES)*
- **Value-first / notan.** Si decide la scala di grigi prima dei colori. *(citato)*
- **Hue shifting.** Le ombre non si fanno "più scure": si spostano verso il freddo (blu/viola) e si desaturano; le luci si spostano verso il caldo (giallo/arancio). Aggiunge ricchezza senza aggiungere colori. *(citato: Lospec)*
- **Gerarchia di saturazione.** Il fondo meno saturo degli oggetti; gli oggetti importanti i più saturi. L'occhio va sempre sulla cosa più accesa. *(citato: Sprite-AI)*
- **Palette limitata.** 16 o 32 colori totali, presi da una lista già coerente (Lospec ne ha oltre 6.000, già costruite rispettando lo hue shifting). Il vincolo è l'estetica: con pochi colori il risultato sembra *voluto*. *(citato: Lospec / magicpixel)*
- **Doppia codifica (accessibilità).** Nessuna informazione essenziale può passare **dal solo colore**: serve sempre un secondo canale — forma, posizione, simbolo, motivo. Vale per te sui quattro stati della macchina, che oggi sono quattro pallini identici di colore diverso. *(citato: Game Accessibility Guidelines, colorblindgames)*

Come applicarlo qui, in concreto: **assegna il grigio per ruolo, non per oggetto.** Una scala unica di cinque livelli:

| Livello | Grigio circa | A chi tocca |
| --- | --- | --- |
| 1 — il più scuro | 45–60 | tutti i contorni, l'acqua profonda |
| 2 | 75–95 | **il terreno** (erba e sabbia, entrambi qui dentro) |
| 3 | 120–145 | gli ostacoli naturali: albero, masso, frana |
| 4 | 160–185 | le cose costruite: casotto, cassa, macchine, vene |
| 5 — l'accento | 200+ e il più saturo di tutti | **solo l'operaio, e i segnali che devi vedere** |

Oggi la tua scala è: terreno 115–195, oggetti 84–167. Sono **invertiti e sovrapposti**. Il terreno deve stare tutto sotto agli oggetti.

### 5. Terreno che non sembri una scacchiera

Tu già eviti l'errore classico (niente bordo fra le tessere, macchia tonda invece che quadrata, ciuffi sparsi). Quello che manca è una cosa sola, ed è la più importante:

**La variazione ha la stessa frequenza della griglia.** Una macchia per tessera vuol dire che, per quanto la sposti fuori centro, la *densità* delle macchie disegna comunque il reticolo. L'occhio trova le griglie con una facilità sorprendente.

Tecniche vere con un nome:

- **Dual grid (griglia doppia).** La grafica si disegna su una seconda griglia sfalsata di mezza tessera rispetto a quella logica. Fa sparire gli angoli squadrati e serve un sesto delle tessere di un autotile normale (16 invece di 47). È la stessa idea di *marching squares*. Implementazioni pubbliche per Godot e Unity, spiegazione ottima su Red Blob Games e Boris the Brave. *(citato)*
- **Quarter-tile autotiling.** Ogni tessera si compone di quattro quarti scelti in base ai vicini: gli angoli si arrotondano da soli. *(citato: BorisTheBrave)*
- **Splattertiles.** Bordi delle tessere volutamente sfrangiati e sovrapposti, così due tessere vicine si mescolano invece di combaciare. Metodo di Butterscotch Shenanigans. *(citato)*
- **Rumore a scala diversa.** Una sola macchia grande che copre 2–3 tessere, con i centri presi da una griglia più larga e sfalsata: la variazione non si allinea più a niente.
- L'articolo di riferimento su tutto il tema si chiama letteralmente *"Making a tile-based game look like it's not"*. *(citato: filiph.net)*

Sulle tue **vene**: il bordo solo dove la vena finisce è la scelta giusta, ma è un bordo dritto sui confini delle tessere, quindi una vena resta un rettangolo. È esattamente il caso in cui la dual grid, o anche solo un bordo con un tremolio, cambierebbe tutto.

### 6. Far vedere che una cosa è viva

Cosa danno e cosa costano, dal più conveniente al meno:

| Effetto | Cosa dice | Costo per fotogramma | Verdetto |
| --- | --- | --- | --- |
| **Ondeggio degli alberi** | "il mondo è vivo" | uno spostamento sinusoidale sulla x quando si copia la sagoma: **zero** | **il migliore.** Sfasa il seno con l'indice della tessera, altrimenti il bosco ondeggia tutto insieme e sembra sbagliato |
| **Trucioli / scintille dove si lavora** | "sta succedendo **lì**" | 4–6 pallini che volano e sfumano | **il secondo migliore.** È l'unico effetto che dice *dove* guardare |
| **Fumo dal camino delle macchine** | "quella macchina sta lavorando" | 3–4 cerchi che salgono e sfumano | terzo. Ma vedi sotto: risolve un problema che hai davvero |
| Ombre che si muovono | atmosfera | ricalcolo per oggetto | **no.** Tanto lavoro, poca resa, e confonde la lettura |
| Onde animate sull'acqua | atmosfera | ridisegno del bordo | dopo, se avanza tempo |

La regola comune è che **le particelle sono il modo più economico di rendere vivo un gioco**, e che i cicli piccoli (respiro, dondolio) hanno un effetto sproporzionato rispetto a quanto costano. *(citato: Game Developer, Resprawn)*

Il fumo merita una riga in più. Oggi la macchina che lavora si riconosce da una fiamma di 2,5 punti e da un pallino di 3,5. **Un pennacchio di fumo è alto tre volte la macchina e si vede da tutta l'isola.** È il modo giusto di risolvere il requisito del GDD *"una macchina si deve vedere lavorare"*, molto più del pallino.

### 7. Sprite già pronti e gratis — vedi la sezione dedicata qui sotto

---

## Cosa abbiamo / cosa fanno gli altri / cosa cambierei

| Cosa | Come sta adesso | Cosa fanno gli altri | Cosa cambierei |
| --- | --- | --- | --- |
| **Erba** | tinta piena 115 + una macchia tonda per tessera + 3 ciuffi | fondo smorto e scuro; variazione a scala diversa dalla griglia (dual grid, splattertiles) | scendere a 80–95 di grigio e desaturare; macchia grande su 2–3 tessere invece di una per tessera |
| **Sabbia / riva** | 195: la cosa più chiara dello schermo; bassofondo + schiuma | la spiaggia è fondo, non protagonista | abbassare a ~140; tenere schiuma e bassofondo così come sono, funzionano |
| **Acqua** | 90, piatta con macchia | due o tre fasce di profondità | va bene. Eventualmente una fascia più scura al largo |
| **Albero** | 5 gruppi di foglie, tronco, contorno **dentro** la sagoma (1 punto) | contorno scuro a spessore costante; profilo asimmetrico | **contorno fisso 2 punti**; alzare la chioma a ~140; profilo non centrato (chioma spostata, tronco visibile su un lato) |
| **Alberello** | stesso albero, piccolo e sbiadito (opacità 0,6) | il "non ancora pronto" si fa con la forma, non con la trasparenza | tenere la trasparenza, ma **cambiare forma**: due foglioline su uno stelo, non un albero rimpicciolito |
| **Masso** | tre facce, muschio, grigio 111 = erba | il sasso è la cosa più chiara e più dura della scena | alzare a ~150; profilo spigoloso e **asimmetrico**, non un cerchio |
| **Frana** | come il masso, marrone, stessa dimensione | la differenza di taglia è un canale di lettura | farla **più grande del masso** — è la stessa famiglia, cambia solo la mole |
| **Vene** | piatte, fuse, bordo solo al margine, puntini per la ricchezza | dual grid per arrotondare; motivo/texture oltre al colore | bordo tremolante o dual grid; **la ricchezza anche con la dimensione dei puntini, non solo il numero** |
| **Casotto** | squadrato fra le cose tonde: scelta giusta | la cosa costruita si stacca dalla natura | tenerlo. Alzarlo a ~170 di grigio e dargli **un pennacchio di fumo dal tetto**: diventa il punto di riferimento dell'isola |
| **Cassa** | quadrata, barra del pieno | contenitori con il contenuto visibile sopra | tenere. Aggiungere il **colore di quello che c'è dentro** sul coperchio, così sai da lontano cosa contiene senza aprirla |
| **Segheria** | lama che gira, fiamma da 2,5 punti, pallino da 3,5 | fumo, luce, movimento grande | la lama va benissimo. **Fumo al posto della fiamma** come segnale principale; il pallino di stato almeno raddoppiato e con **forma diversa per ogni stato**, non solo colore |
| **Operaio** | 11 punti da vicino, 6 da lontano | il personaggio è sempre la cosa più leggibile e più satura | **il singolo intervento più urgente dopo il contorno.** Portarlo ad almeno 20 punti da vicino, e dargli l'accento (il colore più saturo del gioco, usato solo per lui) |
| **Anelli degli ordini** | tratteggiati, giallo/verde, sopra le cose | le indicazioni stanno sopra a tutto | vanno bene. Il tratteggio a 7 pixel da lontano diventa una linea continua: legarlo allo zoom |
| **Ombra** | uguale per tutti, stessa direzione: giusto | ombra come principale segnale di "sta sopra" | rinforzarla: alpha da 0,22 a ~0,3 e spostamento più marcato |

---

## Domanda 7 — si continua col codice o si passa alle immagini?

**Si continua col codice. Netto.**

Il ragionamento, non l'elenco.

Le raccolte gratis esistono e sono buone. **Kenney** è la migliore: oltre 30.000 pezzi, tutti **CC0**, cioè pubblico dominio — puoi usarli come vuoi, anche vendendo, **senza dover citare nessuno**. Ci sono pacchetti proprio del tuo tipo (*Tiny Town*, 130 pezzi; le serie top-down e isometriche). *(citato: kenney.nl, OpenGameArt)* **OpenGameArt** è invece un campo minato: molta roba è CC-BY-SA o GPL, che ti obbliga a ridistribuire i derivati con la stessa licenza e **non si può mescolare con materiale proprietario**; mescolare male CC-BY-SA e GPL è un problema legale reale, non teorico. *(citato: forum OpenGameArt)* **itch.io** ha pacchetti bellissimi ma con licenze una diversa dall'altra, da leggere una per una.

Detto questo, **non è la strada giusta per te adesso**, e i motivi sono tre.

Il primo è che **il tuo problema non è il disegno, è il contrasto.** L'ho misurato: sette cose dentro venti livelli di grigio, contorni sotto il pixel, operaio a undici punti. Se importi degli sprite bellissimi e li metti sulla stessa erba, con lo stesso terreno più chiaro degli oggetti e la stessa dimensione dell'operaio, **continuerai a non capirci niente** — perché quei tre difetti non sono nel disegno delle cose, sono nel rapporto fra le cose. Cambiare fonte del disegno costa una settimana e non tocca nessuno dei tre.

Il secondo è che **nessun pacchetto contiene il tuo gioco.** Ti serve una vena di rame *ricca* distinta da una normale, una segheria con la lama che gira separata dal corpo, un albero che cresce dal 28% al 100%, una cassa con la barra del pieno. Finiresti a mescolare pezzi presi da tre pacchetti diversi con stili diversi — che è **peggio** di uno stile modesto ma coerente.

Il terzo è che **tu lavori dal telefono.** Oggi cambi il colore di un albero scrivendo una riga in `isola.json` e vedi il risultato. Con i PNG per cambiare un albero devi aprire un programma di disegno. Andresti contro la regola numero 1 del progetto, quella per cui i valori stanno in configurazione.

**Il consiglio, in una frase:** resta col codice, ma **usa Kenney come modello da copiare, non da importare**. Sono CC0: puoi guardarli, misurarli, ricopiarne i profili nelle tue funzioni di disegno senza nessun obbligo. Prendi da loro la cosa che ti manca davvero — le forme asimmetriche e riconoscibili — e lasciagli i file.

**Quando cambiare idea.** Se, dopo aver sistemato contorno, scala di grigi e dimensione dell'operaio, le cose ancora non si distinguono, allora il problema è la mano e non il contrasto — e a quel punto passare alle immagini ha senso. Non prima.

---

## Cosa cambia da noi

### Da fare (in quest'ordine, uno per volta)

1. **Contorno scuro a spessore costante attorno a tutto.** Non dentro la sagoma: al momento di copiarla. Il modo più semplice è cuocere una seconda versione di ogni sagoma tutta nera e disegnarla dietro, ingrandita di quel tanto che serve a fare 2 pixel di anello a qualunque zoom. Costa una copia in più per oggetto, cioè niente. Spessore in configurazione.
2. **Rifare la scala dei grigi per ruolo**, con la tabella a cinque livelli di sopra: terreno sotto tutto, oggetti sopra, operaio come accento unico. Sono solo colori in `isola.json` e `costruzioni.json`. **Questo è lavoro da bilanciatore visivo, non da programmatore: nessuna riga di codice.**
3. **Ingrandire l'operaio** ad almeno 20 punti da vicino, e sistemare il fatto che dentro la sua sagoma occupa metà riquadro mentre l'albero ne occupa tre quarti. Due valori in configurazione.
4. **Ingrandire i segnali delle macchine** (pallino e fiamma) fino ad almeno 10 punti alla vista lontana, e dare a ogni stato **una forma diversa oltre al colore**.
5. **Ondeggio degli alberi**, sfasato per tessera. Costa zero e cambia la sensazione di tutta l'isola.

### Da decidere (serve una tua parola)

- **Quanto smorto può diventare il terreno.** Abbassare erba e sabbia è la cosa che funziona meglio, ma allontana dal "cozy" caldo che avevi chiesto. Compromesso possibile: tenere l'erba calda ma scura, e togliere contrasto solo alla sabbia. Va deciso guardandolo, non scrivendolo.
- **Il fumo come segnale principale delle macchine**, al posto del pallino. È una scelta di design, non di grafica: cambia come si legge la fabbrica da lontano.
- **Frana più grande del masso.** Usa la dimensione come canale di lettura, ma occupa più spazio visivo su una tessera sola: da provare prima di decidere.

### Da valutare (dopo, se serve ancora)

- **Dual grid per il terreno e per le vene.** È la tecnica giusta e ben documentata, ma è un intervento serio sul disegno del terreno. Vale la pena solo se, dopo i punti 1–5, la griglia si vede ancora.
- **Due atlanti invece di uno** (uno grande per lo zoom vicino, uno piccolo per quello lontano), per togliere la mollezza della riduzione.
- **Profili asimmetrici** per albero, masso e frana. È il passo che dà il salto più grande, ma è anche l'unico che richiede davvero mano da disegnatore, e va fatto una cosa alla volta.

### Cosa NON fare

- **Non aggiungere dettaglio dentro le sagome.** Foglie, venature, granelli: a 19 punti non si vedono e a 6 nemmeno. Il dettaglio interno è l'ultimo dei quattro canali, ed è quello a cui stai già dando più attenzione degli altri tre messi insieme.
- **Non importare PNG adesso.** Vedi la sezione sopra.
- **Non usare il colore da solo per gli stati delle macchine.** Serve sempre un secondo segno.
- **Non usare la trasparenza per dire "non ancora pronto"** più di quanto già fai: su un fondo mosso la trasparenza si legge come sporco, non come stato.
- **Non mettere bordi alle tessere del terreno.** È già una tua regola, e la ricerca conferma che è quella giusta.
- **Non toccare l'anello degli ordini né la mira del piazzamento.** Funzionano e sono ben pensati.

---

## Quello che NON ho trovato

- **Nessuna soglia ufficiale in punti per "quanto deve essere grande un oggetto di gioco per riconoscerlo"** — le linee guida esistenti parlano di *icone* e di *bersagli da toccare*, non di oggetti dentro una scena. La soglia dei 20–24 punti che propongo è **mia, derivata**, non citata.
- **Nessun documento di art direction di Timberborn.** Ho trovato Dorfromantik (80 Level) ma non l'equivalente per Timberborn.
- **Niente da Reddit**, che è bloccato, e sarebbe stato la fonte più ricca sui devlog di piccoli gestionali.
- **Nessun numero pubblicato su quanto costa davvero l'ondeggio in Canvas 2D su telefono.** Il ragionamento "costa zero" è mio: è uno spostamento di coordinate dentro una `drawImage` che già fai. Va misurato sul dispositivo vero.
- **Nessun caso documentato di un gioco a forme geometriche disegnate in codice che sia stato pubblicato e abbia funzionato bene sul piano commerciale.** Gli esempi che ho trovato sono o vettoriali retro (Asteroids e simili) o low-poly 3D. Questo è un punto onesto di incertezza: non ho una prova che la strada regga fino in fondo, ho solo la prova che i tuoi problemi attuali sono risolvibili senza abbandonarla.
- **Non ho potuto guardare il gioco in funzione.** Tutto quello che è scritto qui viene dal codice, dalla configurazione e dai conti. Il grigio dei colori è certo; l'impressione che ne deriva va confermata con un occhio.

---

## Fonti

Leggibilità, sagome, contorni
- [Character Design: Shape Language and Readability — 80 Level](https://medium.com/@EightyLevel/character-design-shape-language-and-readability-6ee4bb6f98a6)
- [Stylized Characters Done Right: Art Direction Playbook — Nasty Rodent](https://nastyrodent.com/stylized-3d-characters-art-direction-principles/)
- [Color Theory for Game Art: The Production Application Guide — Nasty Rodent](https://nastyrodent.com/color-theory-for-game-art/)
- [Pixel Art Outlines — Lospec](https://lospec.com/articles/pixel-art-outlines/)
- [Pixel Art Outlines Part 2: Using Color — Lospec](https://lospec.com/articles/pixel-art-outlines-part-2-using-color/)
- [Pixel Art Outlines & Anti-Aliasing — Selective Outline (Sel-Out) Guide — Pixnote](https://pixnote.net/en/learn/outlines/)
- [Line weight thickness in sprites — 2D Will Never Die](https://2dwillneverdie.com/tutorial/line-weight-thickness-in-sprites/)
- [Top-Down Pixel Art Techniques — PathBits](https://app.pathbits.com/topics/top-down-pixel-art-techniques)

Valore, notan, tavolozze
- [The Benefits of Value Studies: Mastering Notan — Realism Today](https://realismtoday.com/value-studies-mastering-notan-digital-painting/)
- [How to Use Notan Design — Will Kemp Art School](https://willkempartschool.com/how-to-use-notan-design-to-create-compelling-compositions-in-your-paintings/)
- [Pixel Art Hueshifting Tutorials — Lospec](https://lospec.com/pixel-art-tutorials/tags/hueshifting)
- [Pixel Art Palettes Tutorials — Lospec](https://lospec.com/pixel-art-tutorials/tags/palettes)
- [Picking the Perfect Color Palette for Your Game — itch.io](https://itch.io/blog/1039646/picking-the-perfect-color-palette-for-your-game)
- [The 60-30-10 Color Rule in Game Art Design — IRAGAMES](https://iragames.ir/the-60-30-10-color-rule/)
- [Pixel art fundamentals — Sprite-AI](https://www.sprite-ai.art/guides/pixel-art-fundamentals)

Telefono, dimensioni, accessibilità
- [Icon Size Guidelines for Web and Mobile Applications — DEV](https://dev.to/albert_nahas_cdc8469a6ae8/icon-size-guidelines-for-web-and-mobile-applications-in1)
- [Mobile Accessibility Target Sizes Cheatsheet — Smart Interface Design Patterns](https://smart-interface-design-patterns.com/articles/accessible-tap-target-sizes/)
- [Xbox Accessibility Guideline 101 — Microsoft](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101)
- [Ensure no essential information is conveyed by a fixed colour alone — Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/ensure-no-essential-information-is-conveyed-by-a-fixed-colour-alone/)
- [Colorblind Gaming 101: (Some) Solutions — Colorblind Games](https://colorblindgames.com/2021/08/02/colorblind-gaming-101-some-solutions/)

Terreno a tessere
- [Making a tile-based game look like it's not — filiph.net](https://filiph.net/text/making-a-tile-based-game-look-like-it's-not.html)
- [Autotiling: Interactive Guide to Procedural Tile Selection — Red Blob Games](https://www.redblobgames.com/articles/autotile/claude/)
- [Quarter-Tile Autotiling — BorisTheBrave.com](https://www.boristhebrave.com/2023/05/31/quarter-tile-autotiling/)
- [SPLATTERTILES — Butterscotch Shenanigans](https://blog.bscotch.net/post/splattertiles-or-how-to-tile-your-game-without-all-those-tiles/)
- [dual-grid-tilemap-system-godot — GitHub](https://github.com/jess-hammer/dual-grid-tilemap-system-godot)

Factorio e riferimenti
- [Friday Facts #290 — Rail building changes & High-res icons](https://www.factorio.com/blog/post/fff-290)
- [Friday Facts #355 — High resolution updates](https://www.factorio.com/blog/post/fff-355)
- [Friday Facts #227 — Rendering, Trees & Scenario talk](https://factorio.com/blog/post/fff-227)
- [Colorblindness/Accessibility Improvements — Factorio Forums](https://forums.factorio.com/viewtopic.php?f=6&t=108107)
- [How Dorfromantik Expands Its Cozy World Through Minimalist Design — 80 Level](https://80.lv/articles/how-dorfromantik-expands-its-cozy-world-through-minimalist-design)
- [Terra Nil Review — Graphics — Overclockers Club](https://www.overclockersclub.com/reviews/terra_nil_review/2.htm)
- [Spriting — Mindustry Wiki](https://mindustrygame.github.io/wiki/modding/4-spriting/)
- [Low Poly Art: How Simplicity Creates Strong Visual Identity — Polydin](https://polydin.com/low-poly-art/)

Effetti e movimento
- [6 Mistakes That'll Drain the 'Juice' Out Of Your Game — Game Developer](https://www.gamedeveloper.com/design/6-mistakes-that-ll-drain-the-juice-out-of-your-game)
- [Making a Game Feel "Juicy" with Simple Effects — Resprawn](https://resprawn.medium.com/when-you-play-a-great-game-it-feels-good-d23761b6eccf)
- [2D Wind Sway — Godot Shaders](https://godotshaders.com/shader/2d-wind-sway/)

Disegno in codice, canvas
- [NoSprite — giochi arcade in vettoriale su canvas](https://nosprite.com/)
- [CanvasRenderingContext2D: imageSmoothingQuality — MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality)
- [CanvasRenderingContext2D: imageSmoothingEnabled — MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)
- [Mipmap — Wikipedia](https://en.wikipedia.org/wiki/Mipmap)

Sprite gratis e licenze
- [Assets — Kenney.nl](https://kenney.nl/assets)
- [Tiny Town — Kenney.nl (130 pezzi, CC0)](https://kenney.nl/assets/tiny-town)
- [All CC0 — Uploader: Kenney — OpenGameArt](https://opengameart.org/content/all-cc0-uploader-kenney)
- [Practicality of CC-BY-SA — forum OpenGameArt](https://opengameart.org/forumtopic/practicality-of-cc-by-sa)
- [CC-BY-SA for commercial games? — forum OpenGameArt](https://opengameart.org/forumtopic/cc-by-sa-for-commercial-games)
- [Top free game assets tagged Top-Down — itch.io](https://itch.io/game-assets/free/tag-top-down)
- [Tiny RTS Tileset — itchabop, itch.io](https://itchabop.itch.io/tinyrts)
