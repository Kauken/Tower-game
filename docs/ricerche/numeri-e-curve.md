# Numeri e curve — come si bilanciano produzione e progressione

Ricerca sul campo (fonti in fondo). Stato: **versione 1 — in aggiornamento**.

## In una riga

Un potenziamento vale il suo prezzo solo se **si ripaga in 2-5 minuti di gioco**, e lo Zaino grande può ripagarsi solo se **il tempo di viaggio dell'operaio arriva a circa il 40-50% del ciclo**: sotto quella soglia, la matematica dice che raddoppiare il carico non può dare più di pochi punti percentuali.

---

## 1. Le curve di costo

### Cosa usano davvero i giochi

| Gioco / fonte | Curva | Numero |
|---|---|---|
| Cookie Clicker (edifici) | esponenziale puro | costo × **1,15** a ogni acquisto |
| Idle Idol (post-mortem su Game Developer) | esponenziale | crescita **+10% ... +19%** per livello (dichiarato "1,1x") |
| Adventure Capitalist (classico del genere) | esponenziale | fra **1,07** e **1,15** a seconda dell'attività |
| Consiglio ricorrente sui forum di sviluppo | esponenziale | tenersi fra **1,07 e 1,15**; sopra 1,2 il gioco "si tappa" in fretta |
| Sblocchi di *contenuto* (non livelli ripetibili) | a gradini | ogni gradino ≈ **× 3 (mezzo ordine di grandezza)** rispetto al precedente |

Formula base usata da tutti:

```
costo(n) = costo_base × moltiplicatore ^ n
```

Con moltiplicatore 1,15 il costo raddoppia ogni **5 acquisti** circa (1,15^5 = 2,01).
Con 1,07 raddoppia ogni **10 acquisti** (1,07^10 = 1,97).

### La regola che conta davvero (Pecorella, GDC Europe 2016)

Il rapporto importante non è il costo in sé, ma **costo diviso guadagno**. Se il guadagno cresce in modo lineare e il costo in modo esponenziale, prima o poi il costo supera il guadagno: in un modello citato succede intorno al **livello 35**. Quello è il punto in cui il giocatore deve essere spinto verso una cosa nuova (nuovo materiale, nuovo banco, nuovo progetto), altrimenti si ferma.

### Cosa vuol dire per noi

I nostri progetti costano da **120 a 520 monete**: è un salto di ×4,3 dal primo all'ultimo. Se li mettiamo in fila, il rapporto fra due progetti consecutivi dovrebbe stare fra **×1,3 e ×1,6** per una progressione fitta, o **×2 ... ×3** per una progressione a capitoli. 120 → 180 → 270 → 400 → 600 è una curva ×1,5 pulita.

---

## 2. Il ritmo degli sblocchi — in minuti

| Fonte | Numero |
|---|---|
| Consiglio raccolto sui forum incremental | i primi potenziamenti a **3-4 minuti** di gioco; i successivi "poco più" |
| Idle Idol (bilanciamento dichiarato) | ogni acquisto costa circa **100 secondi** di gioco, mantenuti costanti inflazionando insieme guadagni e prezzi |
| Sblocchi di contenuto (nuovo materiale/edificio) | distanziati di **mezzo ordine di grandezza** di risorse: abbastanza per godersi la novità, non tanto da annoiare |

**Regola pratica ricavata:** un acquisto ogni **1,5-3 minuti** nella prima mezz'ora; un contenuto *nuovo* (nuovo materiale, nuovo banco) ogni **10-20 minuti**.

Con i nostri 166 monete/min a mani nude:
- progetto da 120 monete = **43 secondi** di raccolta → troppo presto? no, va bene come primo
- progetto da 520 monete = **3 minuti e 8 secondi** → giusto per un acquisto singolo
- ma se il giocatore deve anche raccogliere i *materiali*, il tempo reale raddoppia o triplica.

---

## 3. Ammortamento: in quanti minuti si ripaga un potenziamento

Non ho trovato una singola regola "ufficiale" pubblicata; ho trovato convergenza pratica su questo:

- Un potenziamento **si deve ripagare entro una sessione di gioco**. Le sessioni mobile mediane sono **5-6 minuti** (vedi §6), quindi il bersaglio è **ripagarsi in 2-5 minuti**.
- Se ci mette più di **10 minuti** a ripagarsi, il giocatore non riesce a percepirlo e lo salta.
- Se si ripaga in meno di **30 secondi**, è un acquisto ovvio: non è una scelta, è un pulsante da premere.

### Verifica sui nostri numeri

Base bosco: **166 monete/min**.

| Potenziamento | Effetto | Guadagno extra | Costo | Si ripaga in |
|---|---|---|---|---|
| Ascia affilata | ×1,37 | +61 mon/min | (da confermare) | — |
| Stivali | ×1,58 | +96 mon/min | (da confermare) | — |
| Piccone (pietra) | ×1,63 | dipende dalla base pietra | — | — |
| **Zaino grande** | **×0,95** | **−8 mon/min** | **160** | **mai** |

Con un costo tipico di 160 monete, per ripagarsi in 3 minuti serve un guadagno extra di **53 monete/min**, cioè un moltiplicatore di almeno **×1,32** sulla base del bosco. Sotto ×1,2 lo Zaino resta un acquisto sbagliato anche a fonti allontanate.

---

## 4. Quanto tempo deve costare un viaggio

*(sezione da completare con altre fonti — qui c'è già la matematica, che è la parte decisiva)*

### La formula

Chiamiamo:
- `T` = tempo per andare (o tornare) dalla fonte
- `f` = **frazione del ciclo spesa a camminare** = 2T / (2T + tempo di raccolta)
- `m` = di quanto lo zaino moltiplica il carico (es. m = 2 se raddoppia)

Il guadagno reale dello zaino è:

```
guadagno = m / ( m − f × (m − 1) )
```

Con m = 2 diventa semplicemente `2 / (2 − f)`.

### La tabella che risolve il nostro problema

Zaino che **raddoppia** il carico (m = 2):

| Tempo speso a camminare (f) | Guadagno reale dello Zaino |
|---|---|
| 0% | ×1,00 (inutile — è il nostro caso oggi) |
| 10% | ×1,05 |
| 20% | ×1,11 |
| 30% | ×1,18 |
| **40%** | **×1,25** |
| **50%** | **×1,33** |
| 60% | ×1,43 |
| 70% | ×1,54 |

Zaino che **triplica** il carico (m = 3):

| f | Guadagno |
|---|---|
| 20% | ×1,15 |
| 30% | ×1,25 |
| **40%** | **×1,36** |
| 50% | ×1,50 |

**Conclusione numerica:** per portare lo Zaino grande al livello dell'Ascia affilata (×1,37) servono, in alternativa:
- zaino ×2 con **52% del tempo speso a camminare**, oppure
- zaino ×3 con **40% del tempo speso a camminare**.

Il secondo è molto più sano: 40% di cammino è un numero che un gioco può reggere, 52% no.

---

## 5. La progressione offline

*(da completare — servono altre ricerche)*

Quello che ho finora: il nostro tetto di 4 ore è nella norma dei giochi da telefono, che tipicamente stanno fra 2 e 24 ore, spesso con **rendimento ridotto** (50-60% della produzione online) invece che pieno.

---

## 6. Le sessioni da telefono

Dati 2025-2026:

| Numero | Fonte |
|---|---|
| **5-6 minuti** = durata mediana di una sessione mobile | GameAnalytics, benchmark 2025 |
| **8-9 minuti** = media del 25% di giochi migliori | GameAnalytics |
| **6,4 minuti** = media specifica dei giochi idle | ricerca di mercato sui giochi idle |
| **4 minuti** = mediana dei giochi casual (compensata da più sessioni) | GameAnalytics |
| **4-6 volte al giorno** = quante volte si apre l'app | GameAnalytics |

**Cosa significa:** il gioco viene aperto ~5 volte al giorno per ~5 minuti. Ogni apertura deve contenere **almeno un acquisto completato** e **almeno una decisione**. Con 166 monete/min, cinque minuti sono 830 monete: cioè circa **due progetti dei nostri** per sessione. È un ritmo corretto.

---

## 7. Quando un potenziamento è "morto"

*(da completare)*

Quello che ho: il segnale principale è il **tasso di acquisto**. Se un potenziamento è disponibile ma quasi nessuno lo compra, o lo comprano e poi la curva di progressione non cambia pendenza, è morto. La cura standard non è aumentarne l'effetto, ma **cambiare la situazione che lo rende inutile** (è il nostro caso: le fonti troppo vicine).

---

## 8. Cinque raccomandazioni con un numero

*(da rifinire nella versione finale)*

1. **Portare il tempo di cammino al 35-40% del ciclo** di raccolta del bosco.
2. **Zaino grande = ×3 carico, non ×2** — con f = 40% dà ×1,36, in linea con l'Ascia.
3. **Ogni potenziamento deve ripagarsi in 2-5 minuti**: a 166 mon/min, un oggetto da 160 monete deve dare almeno **+53 monete/min**.
4. **Curva progetti ×1,5** fra un progetto e il successivo: 120 → 180 → 270 → 405 → 608.
5. **Offline: 4 ore al 50-60%** invece che al 100%.

---

## Fonti

- Anthony Pecorella, *Quest for Progress: The Math and Design of Idle Games*, GDC Europe 2016 — https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf
- Anthony Pecorella, fogli di calcolo dei modelli idle — https://archive.org/details/idlegameworksheets
- *The Math of Idle Games* parti I-III, Game Developer — https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i
- *Balancing Tips: How We Managed Math on Idle Idol*, Game Developer — https://www.gamedeveloper.com/design/balancing-tips-how-we-managed-math-on-idle-idol
- *Numbers Getting Bigger: The Design and Math of Incremental Games*, Envato Tuts+ — https://code.tutsplus.com/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023a
- GameAnalytics, benchmark mobile 2025 — https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks
- Roblox DevForum, discussione sui moltiplicatori di costo negli idle — https://devforum.roblox.com/t/how-much-should-the-prices-of-an-upgrade-go-up-by-in-an-idle-game/2211689
