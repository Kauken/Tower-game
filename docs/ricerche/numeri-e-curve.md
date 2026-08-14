# Numeri e curve — come si bilanciano produzione e progressione

Ricerca su fonti pubbliche (elenco in fondo) più i conti fatti sui nostri file di configurazione.

> **Nota sulle fonti.** Reddit non è comparso in nessun risultato di ricerca: risulta bloccato allo strumento. Le fonti qui sotto sono talk GDC, articoli su Game Developer, forum Steam, wiki di gioco, devlog e forum di sviluppatori. Dove un dato non l'ho trovato lo scrivo, non lo invento.

---

## In una riga

Un potenziamento vale il suo prezzo solo se **si ripaga in 2-5 minuti**, e lo Zaino grande oggi non può ripagarsi **per matematica, non per bilanciamento**: sull'isola attuale il cammino è il **15-16% del ciclo** nel bosco e il **3% sulle vene**, e con quei numeri **nemmeno uno zaino infinito** darebbe più di **×1,20** nel bosco e **×1,03** sulle vene — mentre per ripagare 160 monete servirebbe **×1,32**.

---

## 1. Le curve di costo

### Cosa usano davvero i giochi

| Gioco / fonte | Tipo di curva | Numero |
|---|---|---|
| Cookie Clicker (edifici) | esponenziale puro | costo **× 1,15** a ogni acquisto |
| Idle Idol (post-mortem su Game Developer) | esponenziale | **+10% ... +19%** per livello ("1,1x" dichiarato) |
| AdVenture Capitalist e simili | esponenziale | fra **1,07** e **1,15** secondo l'attività |
| Consiglio ricorrente fra sviluppatori (Roblox DevForum) | esponenziale | stare fra **1,07 e 1,15**; sopra **1,2** il gioco si tappa in fretta |
| Sblocchi di *contenuto* (non livelli ripetibili) | a gradini | ogni gradino **× 3 circa** (mezzo ordine di grandezza) |

La formula è sempre la stessa:

```
costo(n) = costo_base × moltiplicatore ^ n
```

- con **1,15** il costo raddoppia ogni **5 acquisti** (1,15⁵ = 2,01)
- con **1,07** raddoppia ogni **10 acquisti** (1,07¹⁰ = 1,97)
- con **1,50** raddoppia ogni **1,7 acquisti**

### La regola che conta davvero

Da Pecorella (GDC Europe 2016) e dalla serie *The Math of Idle Games*: quello che conta non è il costo, è il **rapporto fra costo e guadagno**. Se il guadagno cresce in modo lineare e il costo in modo esponenziale, prima o poi il costo supera il guadagno. In un modello classico succede intorno al **livello 35**. Quello è il punto in cui il gioco deve offrire una **cosa nuova** (un materiale nuovo, un banco nuovo), altrimenti il giocatore si ferma.

### Cosa vuol dire per noi

I nostri progetti stanno fra **120 e 520 monete**: un salto complessivo di ×4,3. Se li mettiamo in fila di difficoltà, il passo giusto è:

- **× 1,5** per una progressione fitta: **120 → 180 → 270 → 405 → 608**
- **× 3** quando si sblocca una **famiglia nuova** di cose (dal legno alla pietra, dalla pietra al rame)

Da evitare: due progetti consecutivi che costano quasi uguale. Se il secondo non costa almeno **il 30% in più** del primo, non si sente come un passo avanti.

---

## 2. Il ritmo degli sblocchi — in minuti

| Fonte | Numero |
|---|---|
| Consiglio raccolto sui forum incremental | i primi potenziamenti entro **3-4 minuti** di gioco |
| Idle Idol (bilanciamento dichiarato) | ogni acquisto costa circa **100 secondi** di gioco, tenuti costanti inflazionando insieme prezzi e guadagni |
| Sblocchi di contenuto nuovo | distanziati di **mezzo ordine di grandezza** (×3) di risorse |
| Guide di design idle | fase "aggancio" **0-30 minuti**: qualcosa deve succedere subito, l'automazione arriva dopo ma non troppo dopo |

**Regola pratica ricavata:**
- un **acquisto** ogni **1,5 - 3 minuti** nella prima mezz'ora
- una **cosa nuova** (materiale, banco, macchina) ogni **10 - 20 minuti**

Con i nostri **166 monete/min** a mani nude nel bosco:
- progetto da **120 monete** = **43 secondi** di raccolta pura → giusto come primo
- progetto da **520 monete** = **3 min 8 s** → giusto come acquisto singolo importante
- ma il giocatore deve anche raccogliere i **materiali** per fabbricare: il tempo reale raddoppia. In pratica un progetto da 520 è **6-7 minuti veri**, cioè **una sessione intera**. È il tetto giusto: non andare oltre le 520 monete senza aver alzato prima la produzione.

---

## 3. Ammortamento: in quanti minuti si deve ripagare un potenziamento

Non esiste una regola "ufficiale" pubblicata con un numero unico — l'ho cercata e non l'ho trovata. Quello che c'è è una convergenza pratica, che incrocia il dato delle sessioni (§6):

- **2-5 minuti**: il bersaglio. Un potenziamento si deve ripagare **dentro la sessione in cui lo compri**, e le sessioni mobile mediane sono 5-6 minuti.
- **oltre 10 minuti**: il giocatore non lo percepisce. Lo compra per fede o lo salta.
- **sotto 30 secondi**: non è una scelta, è un pulsante da premere. Se tutti i potenziamenti si ripagano in mezzo minuto, non c'è partita — e questo, per il nostro gioco, è il peccato peggiore.

### La formula da usare sempre

```
minuti per ripagarsi = costo ÷ ( guadagno_base_al_minuto × (moltiplicatore − 1) )
```

### Verifica sui nostri numeri (base bosco = 166 monete/min)

| Potenziamento | Effetto | Guadagno extra | Costo 160 → si ripaga in |
|---|---|---|---|
| Ascia affilata | ×1,37 | **+61 mon/min** | **2,6 minuti** ✅ |
| Stivali | ×1,58 | **+96 mon/min** | **1,7 minuti** ✅ |
| Piccone (pietra) | ×1,63 | dipende dalla base pietra | probabilmente ✅ |
| **Zaino grande** | **×0,95** | **−8 mon/min** | **mai** ❌ |

**Il numero da tenere a mente:** con base 166 mon/min, un oggetto da **160 monete** deve dare almeno **+53 monete/min**, cioè **almeno ×1,32**, per ripagarsi in 3 minuti. Sotto ×1,20 un oggetto da 160 monete non è comprabile in nessun caso.

---

## 4. Quanto tempo deve costare un viaggio

Questa è la parte decisiva, e la matematica dà una risposta netta.

### La formula del moltiplicatore di viaggio

Chiamiamo:
- **f** = frazione del ciclo spesa a camminare fra il deposito e la fonte
- **m** = di quanto lo zaino moltiplica il carico (m = 2 se raddoppia)

```
guadagno reale dello zaino  =  m ÷ ( m − f × (m − 1) )
```

Con m = 2 diventa: `2 ÷ (2 − f)`.

E soprattutto — **il soffitto**, cioè quanto darebbe uno zaino **infinito**:

```
soffitto = 1 ÷ (1 − f)
```

**Nessun potenziamento del carico potrà mai superare quel soffitto.** È il tetto fisico del problema.

### Le tabelle

Zaino che **raddoppia** il carico (m = 2):

| Tempo speso a camminare (f) | Guadagno reale | Soffitto (zaino infinito) |
|---|---|---|
| 3% (nostre vene, oggi) | **×1,02** | ×1,03 |
| 16% (nostro bosco, oggi) | **×1,09** | ×1,20 |
| 25% | ×1,14 | ×1,33 |
| 30% | ×1,18 | ×1,43 |
| **37%** | **×1,23** | ×1,59 |
| **44%** | **×1,28** | ×1,79 |
| 50% | ×1,33 | ×2,00 |
| 60% | ×1,43 | ×2,50 |

Zaino che **triplica** il carico (m = 3):

| f | Guadagno |
|---|---|
| 20% | ×1,15 |
| 30% | ×1,25 |
| **37%** | **×1,33** |
| 44% | ×1,40 |
| 50% | ×1,50 |

### Perché il nostro Zaino è morto — i conti sulla nostra isola

Numeri presi da `config/`:
- tessera **64 px**, velocità operaio **96 px/s** → **1,5 tessere al secondo** (0,67 s a tessera)
- casotto alla tessera **(9, 13)**
- albero: **3,2 s** di lavoro, resa **4 legno + 1 alberello** = **13 monete**
- zaino: **6 caselle**; pila legno **12**, pila alberello **8** → una zainata piena ≈ **12 alberi**
- vena di rame: **5,0 s** per **2 rame** (10 monete)

**Ciclo del bosco (alberi a sud, righe 20-22, ~8 tessere dal casotto):**

| Voce | Tempo |
|---|---|
| andata + ritorno (8 tessere ×2) | **10,7 s** |
| taglio di 12 alberi (12 × 3,2 s) | 38,4 s |
| spostamenti da albero ad albero | ~12 s |
| scarico (6 caselle × 0,6 s) | 3,6 s |
| **ciclo totale** | **≈ 65 s** |
| **valore raccolto** | 12 × 13 = **156 monete** |
| **resa** | **≈ 144 monete/min** (misurato: 166 — il modello regge) |

→ **f = 10,7 / 65 = 16%.** Soffitto: **×1,20**. Zaino ×2: **×1,09**.

**Ciclo della vena di rame ricca (righe 5-6, ~10,6 tessere dal casotto):**
- viaggio andata e ritorno: 14,2 s
- 60 rame (6 caselle × pila 10) con ricchezza 2 = 15 estrazioni × 5 s = **75 s**
- ciclo ≈ 89 s, valore 300 monete → **202 monete/min**
- misurato dalla simulazione: 1,21 × 166 = **201 monete/min**. **Il modello combacia.**
- → **f = 16%**, soffitto ×1,20

**Ciclo della vena di rame vicina (~3 tessere dal casotto):**
- viaggio: 4 s. Scavo: 30 estrazioni × 5 s = **150 s**.
- → **f = 2,6%**, soffitto **×1,03**. Qui lo zaino non può valere niente, mai.

**Il verdetto:** lo Zaino grande non è mal bilanciato. È **impossibile**. Il soffitto massimo su tutta l'isola oggi è ×1,20, e il suo prezzo (160 monete) ne richiede ×1,32.

### Cosa dicono le fonti sul viaggio come costo

Non ho trovato un dato pubblicato del tipo "il cammino deve essere il X% del gioco" — l'ho cercato in più modi e non esiste come numero condiviso. Quello che ho trovato sono osservazioni coerenti:

- **Stardew Valley**: i giocatori notano che la giornata è troppo corta per la velocità di cammino — andare da casa alla miniera "costa più di un'ora di gioco". Il cammino lì è un costo **sentito**, ed è quello che rende sensati gli aggiornamenti degli strumenti e le scorciatoie. (fonte: discussioni ResetEra sul loop di Stardew)
- **Dwarf Fortress** (wiki): nelle fortezze grandi il trasporto è il collo di bottiglia principale, al punto che i giocatori **dedicano nani interi al solo trasporto** perché gli specialisti restino al banco. È esattamente il problema che il nostro operaio unico ha in miniatura.
- **RimWorld** (wiki): il trasporto è un lavoro separato con una priorità propria, perché altrimenti mangia il tempo degli altri lavori.

**La lezione trasversale:** nei giochi dove il trasporto conta, conta perché **il tempo di trasporto è confrontabile con il tempo di lavoro**, non perché sia una decorazione. In tutti e tre i casi il rimedio inventato dai giocatori (nani dedicati, scorciatoie, priorità) esiste solo perché il costo è reale.

---

## 5. La progressione offline — tetti veri

| Gioco | Tetto | Rendimento |
|---|---|---|
| Melvor Idle | **18 ore** | pieno |
| Idle Online Universe | **24 ore** | **90%** del tempo convertito |
| Get Rich Quick! (devlog) | — | **20%** della produzione al secondo |
| Leaf Blower Revolution | **3 giorni** base → **7 giorni** con i potenziamenti | — |
| Pratica diffusa nei mobile | **12 ore** | oppure **50%** della produzione online |

**I due schemi ricorrenti sono solo due:**
1. tetto **lungo** (12-24 ore) + rendimento **ridotto** (20-50%)
2. tetto **corto** (2-8 ore) + rendimento **pieno** (100%)

E quasi ovunque **il tetto stesso è comprabile**: si parte bassi e si allunga pagando (Leaf Blower va da 3 a 7 giorni). È il modello più usato perché trasforma l'offline da regalo a ramo di progressione.

**Per noi:** 4 ore a rendimento pieno per le macchine è lo schema 2, ed è già coerente — l'operaio (la risorsa scarsa) resta fermo, quindi ad app chiusa cresce solo la parte automatica. Il margine di manovra è **vendere l'allungamento come progetto**: **4h → 6h → 8h → 12h**, con costo ×2 a ogni gradino.

---

## 6. Le sessioni da telefono — quanto durano davvero

| Numero | Fonte |
|---|---|
| **5-6 minuti** = durata **mediana** di una sessione mobile (2025) | GameAnalytics, benchmark 2025 |
| **8-9 minuti** = media del **25% di giochi migliori** | GameAnalytics |
| **6,4 minuti** = media specifica dei giochi **idle** | ricerca di mercato sul settore idle |
| **4 minuti** = mediana dei giochi **casual** (compensata da più aperture) | GameAnalytics |
| **4-6 volte al giorno** = quante volte si apre l'app | GameAnalytics |
| **~5 minuti** in Nord America, Europa, Asia, Africa; **6,85** in Oceania | GameAnalytics |
| **10-15%** di ritorno al giorno 7 per gli idle ben ritmati (contro **8%** di riferimento) | guide di design idle |

**Cosa significa per la progettazione.** Il gioco viene aperto **~5 volte al giorno per ~5 minuti**. Ogni apertura deve contenere:
- **almeno un acquisto portato a termine**, e
- **almeno una decisione vera** (esercito o rendita — nel nostro caso: progetto nuovo o potenziamento dell'operaio).

Con 166 monete/min, cinque minuti valgono **830 monete**: circa **due progetti dei nostri**. È un ritmo giusto. Il rischio è l'opposto: se in 5 minuti il giocatore compra **sei** cose, non sta scegliendo, sta svuotando una lista.

---

## 7. Quando un potenziamento è "morto"

Il vocabolario dei designer distingue due errori opposti, e la distinzione ci serve:

- **Opzione trappola** (*trap option*): sembra utile ma è inefficiente. **È il nostro Zaino grande.**
- **Strategia dominante**: è sempre la scelta giusta, in ogni situazione.

**Il criterio pratico** (da *Slay the Spire: Metrics Driven Design and Balance*, GDC 2019, e dal vocabolario di bilanciamento corrente): **popolare non vuol dire rotto**. Se il 70% dei giocatori compra la stessa cosa può semplicemente essere una buona scelta. Quello che va corretto è la **dominanza** — ottimale *a prescindere dal contesto* — e specularmente ciò che è **mai ottimale in nessun contesto**.

**Come se ne accorgono:** guardano il tasso di acquisto per opzione e la **pendenza della curva di guadagno dopo l'acquisto**. Un oggetto che nessuno compra, o che viene comprato e non cambia la pendenza, è morto.

**Cosa fanno — ed è il punto che ci riguarda:** la cura non è **gonfiare l'effetto**. È **cambiare la situazione che lo rende inutile**, così che esista almeno un contesto in cui è la spesa migliore.

**Il test da applicare a ogni nostro oggetto:**

> Esiste almeno una configurazione dell'isola in cui questo oggetto è la spesa migliore da 160 monete?
> Se no, l'oggetto va tolto — oppure va cambiato il mondo attorno.

---

## 8. Cinque raccomandazioni concrete, ognuna con un numero

**1. Portare il cammino al 35-40% del ciclo di raccolta.**
Oggi è **16%** nel bosco e **3%** sulle vene. Bersaglio: **f = 0,37**. È il minimo che rende un oggetto da carico ripagabile.

**2. Dimezzare lo zaino di partenza: da 6 caselle a 3.**
È la leva più economica di tutte, perché **non rallenta il gioco** (perdi solo un po' di tempo di scarico) ma **dimezza il lavoro per viaggio**, e quindi raddoppia la frazione di viaggio. Con 3 caselle il ciclo del bosco scende da 65 s a **~43 s** e f sale a **0,37** appena il bosco è a 12 tessere. E lo Zaino grande torna a essere quello che deve essere: **il ritorno alle 6 caselle**, che oggi hai gratis.

**3. Prezzo dello Zaino grande: da 160 a 110 monete** (oppure effetto ×3 invece di ×2).
Con f = 0,37 uno zaino ×2 dà **×1,23**. Sulla nuova base di **109 monete/min** sono **+25 monete/min**: 110 ÷ 25 = **4,4 minuti** per ripagarsi ✅. A 160 monete ci vorrebbero 6,4 minuti — fuori bersaglio.

**4. Le vene vanno rifatte "generose e lontane", non "avare e vicine".**
Oggi la vena di rame vicina chiede **150 secondi di scavo** per riempire lo zaino contro **4 secondi** di viaggio. Nessun oggetto da trasporto potrà mai contare lì. Da provare: **resa da 2 a 5 per estrazione** e vena spostata a **10-12 tessere**. Così un carico si fa in ~30 s di scavo contro ~15 s di viaggio → **f = 0,33**.

**5. Curva dei progetti a × 1,5, con un salto × 3 al cambio di famiglia.**
**120 → 180 → 270 → 405 → 608**, e un progetto "di capitolo" a **~1.200** quando si apre un materiale nuovo. Con 109-166 monete/min sono **1 minuto** per il primo e **8-11 minuti** per il capitolo: coerente con "un acquisto ogni 1,5-3 minuti, una cosa nuova ogni 10-20".

---

## 9. Proposta numerica per le distanze delle fonti

### Dove stanno oggi (distanza dal casotto, in tessere)

| Fonte | Posizione | Distanza | Tempo andata | f del ciclo |
|---|---|---|---|---|
| Vena di rame vicina | (7, 15) | **~3** | 2,0 s | **3%** |
| Vena di pietra | (16, 11) | **~7,3** | 4,9 s | ~7% |
| Bosco sud | (9, 21) | **~8** | 5,3 s | **16%** |
| Bosco nord | (9, 4) | **~9** | 6,0 s | ~17% |
| Vena di rame ricca | (16, 5) | **~10,6** | 7,1 s | **16%** |

### Il problema, detto con un numero

Per portare f a 0,37 **lasciando lo zaino a 6 caselle**, il lavoro per viaggio è 54 s, quindi servirebbero **32 secondi di cammino** andata e ritorno, cioè **24 tessere di distanza**. **L'isola non è abbastanza grande** (la terra calpestabile è larga ~18 tessere). Allontanare le fonti **da solo non basta**: bisogna anche accorciare il lavoro per viaggio, cioè **rimpicciolire lo zaino di partenza**.

### La proposta

| Cosa | Oggi | Proposto |
|---|---|---|
| Caselle zaino di partenza | 6 | **3** |
| Bosco principale | 8 tessere (righe 20-22) | **12-13 tessere** (righe 24-26, colonne 7-10) |
| Bosco secondario | 9 tessere (righe 3-6) | lasciare dov'è — è la fonte "vicina e povera" |
| Vena di rame vicina | 3 tessere | **8-9 tessere**, resa da 2 a **4** |
| Vena di rame ricca | 10,6 tessere | **lasciare** — è già l'unica sana |
| Vena di pietra | 7,3 tessere | **11 tessere**, resa da 3 a **5** |
| Velocità operaio | 96 px/s | **lasciare a 96** — rallentarlo peggiora la sensazione e rallenta tutto il gioco |
| Prezzo Zaino grande | 160 | **110** (effetto: 3 caselle → 6) |

### Il conto atteso, dopo la modifica

Ciclo del bosco a 12 tessere con 3 caselle:

| Voce | Tempo |
|---|---|
| andata + ritorno (12 tessere ×2 a 1,5 tessere/s) | **16,0 s** |
| taglio di 6 alberi (6 × 3,2 s) | 19,2 s |
| spostamenti fra alberi | ~6 s |
| scarico (3 caselle × 0,6 s) | 1,8 s |
| **ciclo** | **43,0 s** |
| valore | 6 × 13 = 78 monete |
| **resa base** | **109 monete/min** |
| **f** | **0,37** |
| **soffitto (zaino infinito)** | **×1,59** |
| **Zaino grande (3 → 6 caselle, m = 2)** | **×1,23** → +25 mon/min → **si ripaga in 4,4 min** ✅ |

La produzione base scende da 166 a 109 monete/min (**−34%**). È il prezzo da pagare, ed è **giusto pagarlo**: quel 34% è esattamente lo spazio in cui vivono gli oggetti da trasporto. Se serve recuperarlo, si recupera **alzando la resa dell'albero** (4 → 5 legno), non riavvicinando il bosco.

### Come verificarlo con la simulazione

Tre misure, in quest'ordine:

1. **Misura f direttamente.** Fai loggare alla simulazione, per ogni ciclo, quanti secondi l'operaio passa in **cammino**, in **lavoro** e in **scarico**. Il numero da leggere è `cammino ÷ totale`.
   **Criterio di accettazione: f fra 0,33 e 0,45** su bosco, pietra e rame. Se una fonte sta sotto 0,20, su quella fonte lo zaino resterà morto.

2. **Rimisura il moltiplicatore dello Zaino.**
   **Criterio: ≥ ×1,20.** Se esce sotto, f non è dove pensi: torna al punto 1 invece di gonfiare lo zaino.

3. **Calcola l'ammortamento** con la formula del §3: `costo ÷ (base × (mult − 1))`.
   **Criterio: fra 2 e 5 minuti.** Sopra 5, abbassa il prezzo; sotto 2, alzalo.

**Controllo di sicurezza (il punto 8 delle istruzioni):** dopo la modifica, rimisura anche **Ascia** e **Stivali**. L'Ascia moltiplica il *lavoro*, quindi allontanando le fonti **si indebolisce** (da ×1,37 scenderà verso **×1,22**), mentre gli Stivali moltiplicano il *cammino* e **si rafforzano** (da ×1,58 verso **×1,7-1,8**). Se dopo la modifica gli Stivali diventano l'unico acquisto sensato, hai spostato la trappola invece di toglierla: in quel caso **alza il prezzo degli Stivali**, non riavvicinare le fonti. Il bersaglio è che i quattro oggetti finiscano **tutti fra ×1,20 e ×1,45**, con prezzi diversi — così la scelta esiste davvero.

---

## Fonti

- Anthony Pecorella, *Quest for Progress: The Math and Design of Idle Games*, GDC Europe 2016 — https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf
- Anthony Pecorella, fogli di calcolo dei modelli idle — https://archive.org/details/idlegameworksheets
- *The Math of Idle Games*, parti I-III, Game Developer — https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i
- *Balancing Tips: How We Managed Math on Idle Idol*, Game Developer — https://www.gamedeveloper.com/design/balancing-tips-how-we-managed-math-on-idle-idol
- *Numbers Getting Bigger: The Design and Math of Incremental Games*, Envato Tuts+ — https://code.tutsplus.com/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023a
- GameAnalytics, benchmark mobile 2025 — https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks
- *'Slay the Spire': Metrics Driven Design and Balance*, GDC — https://www.gdcvault.com/play/1025731/-Slay-the-Spire-Metrics
- Ian Schreiber & Brenda Romero, *Game Balance*, cap. 8 "Transitivity and Cost Curves" — https://www.taylorfrancis.com/chapters/mono/10.1201/9781315156422-8/transitivity-cost-curves-ian-schreiber-brenda-romero
- Roblox DevForum, moltiplicatori di costo negli idle — https://devforum.roblox.com/t/how-much-should-the-prices-of-an-upgrade-go-up-by-in-an-idle-game/2211689
- Melvor Idle, tetto offline 18 ore (Steam) — https://steamcommunity.com/app/1267910/discussions/0/4665175132461478006/
- Leaf Blower Revolution, tetto offline 3-7 giorni (Steam) — https://steamcommunity.com/app/1468260/discussions/0/595138831417615012
- Idle Online Universe Wiki, guadagni offline al 90% con tetto 24 ore — https://iourpg.fandom.com/wiki/Offline_Gains
- *Get Rich Quick!* devlog, progressione offline al 20% — https://ledoc.itch.io/get-rich-quick/devlog/526093/offline-progression
- Dwarf Fortress Wiki, il trasporto come collo di bottiglia — https://dwarffortresswiki.org/index.php/DF2014:Hauling
- RimWorld Wiki, il trasporto come lavoro con priorità propria — https://rimworldwiki.com/wiki/Hauling
- ResetEra, discussione sul loop di Stardew Valley e il costo del cammino — https://www.resetera.com/threads/what-exactly-is-the-gameplay-loop-in-stardew-valley.31419/
- *Idle Game Design Principles*, Eric Guan — https://ericguan.substack.com/p/idle-game-design-principles
- *Idle Games Best Practices: Design and Strategy*, GridInc — https://gridinc.co.za/blog/idle-games-best-practices
