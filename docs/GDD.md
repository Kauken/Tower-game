# Documento di design — v3.0

**Grano e Ferro** — una fattoria cozy su griglia, con minerali, tecnologie e automazioni.
Per telefono, verticale, una mano sola.

> Questa versione sostituisce completamente la v2.0 (tower defense a reclute).
> Se trovi documenti, codice o configurazioni che parlano di **reclute, ondate,
> nemici, castello, torri, sentiero, postazioni** sono resti da rimuovere, non
> funzionalità da mantenere.

---

## 1. Il gioco in una riga

**Una fattoria su una griglia, dove lo spazio è l'unica cosa che scarseggia davvero.** Coltivi, scavi, costruisci macchine. Ogni cosa che sblocchi occupa una casella, e le caselle sono poche: quindi ogni sblocco non è una spesa, è un **puzzle di incastro**.

## 2. Il ruolo del giocatore

Zero riflessi, zero fretta, zero fallimento. **Non si può perdere.** Tre cose che si ripetono:

1. **Cosa sbloccare adesso** — la bacheca ti mostra sempre più cose di quante puoi permetterti.
2. **Dove metterlo** — è qui che sta il gioco, per via delle vicinanze.
3. **Cosa scavare** — l'unica cosa attiva, e il ponte fra le due catene.

> Non ottimizzi un foglio di calcolo: **incastri una griglia.**

## 3. Il campo: la griglia

Una griglia di caselle quadrate, verticale, che sta tutta in uno schermo di telefono. Si parte piccoli (indicativamente 5×6) e si espande comprando caselle, che è la spesa più desiderata del gioco.

Ogni casella contiene **una cosa sola**: una coltura, una roccia, una macchina, un canale. Toccare una casella vuota apre cosa ci si può mettere; toccare una casella piena dice cosa fa e con chi sta andando in sinergia.

## 4. Il cuore: le vicinanze

**Quello che metti vicino a cosa cambia quanto rende.** È la meccanica su cui è costruito tutto il resto.

| Esempio | Effetto |
| --- | --- |
| Grano adiacente a Grano | +10% a testa — la monocoltura rende |
| Canale d'acqua adiacente | la coltura cresce molto più in fretta |
| Miniera su una vena di roccia | scava molto di più |
| Forno attaccato al Mulino | la farina passa da sola, niente trasporto |
| **Alveare toccato da 4 colture diverse** | bonus grosso — la biodiversità rende |

**Le vicinanze si contraddicono apposta.** Alcune cose premiano la monocoltura, altre premiano la varietà, e sulla stessa griglia non puoi avere entrambe. È da quella contraddizione che nasce la decisione, senza chiedere al giocatore nessun riflesso.

**Le vicinanze devono vedersi.** Quando due cose vanno in sinergia si accende un segno fra loro. Una fattoria ben incastrata si riconosce a colpo d'occhio, prima di leggere qualunque numero: è quello che rende il gioco bello da guardare e non solo da calcolare.

## 5. Le due catene

- **Colture** — crescono da sole nel tempo. Danno roba morbida: grano, fibra, frutta.
- **Minerali** — si scavano. Danno roba dura: pietra, rame, ferro.

**Le macchine hanno bisogno di tutte e due.** Il mulino vuole legno e rame, la serra vuole vetro e fibra. È questo che tiene insieme colture e minerali invece di farne due giochi appiccicati: nessuna delle due catene si può ignorare.

## 6. Il tempo — *deciso il 2026-08-11*

**Il tempo scorre mentre guardi.** Un giorno dura pochi minuti mentre l'app è aperta: ti siedi un quarto d'ora e vedi passare mezza stagione.

A app chiusa la fattoria produce comunque, ma **più piano e fino a un tetto**. Così riaprire è sempre premiato, ma aspettare non è mai la strategia migliore: giocare lo è.

Perché non tempo reale puro: se il grano cresce in ore vere il gioco è ingiocabile in una sessione: apri, raccogli, chiudi. Non c'è niente da guardare, e guardare è metà del punto.

## 7. Lo scavo — *deciso il 2026-08-11*

**Scavare resta manuale a lungo, ed è l'unica cosa attiva del gioco.** Tocchi una roccia, si crepa, si spacca, escono minerali.

Non è un ripiego: è la risposta al difetto noto del genere (vedi §9). Quando tutto il resto va da solo, scavare è quello che ti tiene le mani sullo schermo. Ed è gentile: nessun tempo di reazione, nessun errore possibile, si può smettere a metà.

Si automatizza tardi, e automatizzarlo è uno degli sblocchi più desiderati proprio perché rinunci a qualcosa che ti piaceva fare.

## 8. Le automazioni, e il loro costo

**Ogni sblocco ti toglie un lavoro:**

| Sblocco | Ti toglie |
| --- | --- |
| Spaventapasseri | raccogliere |
| Semina automatica | ripiantare |
| Carretto | portare i materiali da una casella all'altra |
| Ordine permanente | riscegliere la ricetta ogni volta |
| Trivella | scavare |

La fantasia è **la fattoria che impara a badare a sé stessa**, ed è misurabile: i tocchi al minuto devono scendere partita dopo partita.

### La regola che tiene in piedi tutto: **l'automazione occupa una casella**

Lo spaventapasseri ruba un quadrato al grano. Il carretto ruba un quadrato alla miniera.

**Automatizzare non è mai gratis: baratti produzione per pigrizia.** È la decisione più bella del gioco, e siccome lo spazio non smette mai di essere stretto, la griglia non è mai "risolta" una volta per tutte.

## 9. Il difetto noto del genere, e come lo evitiamo

Nei giochi di automazione c'è un problema documentato e ricorrente: **quando tutto è automatico non hai più niente da fare**, e il gioco muore proprio nel momento in cui hai vinto.

Le nostre tre risposte, tutte già nel design:

1. **L'automazione costa caselle** (§8) — il puzzle di incastro non finisce mai.
2. **Lo scavo resta manuale** (§7) — c'è sempre un gesto disponibile.
3. **Gli appezzamenti nuovi ripartono da zero** (§11) — ogni terreno nuovo è una griglia vuota da risolvere daccapo, con una risorsa nuova nel mazzo.

## 10. La bacheca degli sblocchi

**Devi vedere quello che ancora non puoi avere.** È l'attesa a creare il desiderio: una ricompensa rimandata vale più di una immediata, ed è esattamente la sensazione che il gioco deve produrre.

Quindi **niente albero nascosto**. Una bacheca che si scorre col pollice, con le cose bloccate disegnate in ombra e sotto scritto **esattamente quanto manca**:

> 🏚️ **Serra** — *le colture crescono anche d'inverno*
> ti mancano **140 ferro**

Vedi la serra dal primo giorno. Ci pensi mentre scavi.

**Uno sblocco deve dare un verbo nuovo, non un numero più grande.** Un potenziamento che fa solo "+15% grano" non va in bacheca: va nei potenziamenti minori. In bacheca ci va solo quello che cambia cosa puoi fare.

## 11. Gli appezzamenti

La scala grossa dell'avanzamento. Si aprono uno dopo l'altro, e **ognuno porta una risorsa nuova e un tipo di macchina nuovo**, non solo più spazio:

| Appezzamento | Cosa introduce |
| --- | --- |
| **L'Orto** | colture, acqua, le prime vicinanze |
| **La Collina** | rocce e minerali, lo scavo, le prime macchine |
| **Il Bosco** | legno e api, le vicinanze di biodiversità |
| **La Palude** | *[da progettare]* |

## 12. Cosa questo gioco **non** è

Guardrail, da difendere in ogni decisione futura:

- **Non si perde e non si sbaglia in modo irreversibile.** Qualunque piazzamento si può disfare (con un piccolo costo, non a gratis).
- **Non c'è fretta.** Niente timer che scadono, niente colture che marciscono se non torni.
- **Non è un idle da guardare.** Se in una sessione da tre minuti non c'è almeno una decisione da prendere, il gioco è rotto lì.
- **Non è un foglio di calcolo.** Se una scelta si può risolvere leggendo due numeri senza guardare la griglia, quella scelta è progettata male.
- **Niente valuta premium, niente pubblicità, niente attese che si pagano.**

## 13. La domanda che regge tutto

Come la v2.0 aveva "compro adesso o investo?", questa versione ne ha una sola:

> ### Piazzare una cosa sulla griglia e vedere che si incastra con le vicine è soddisfacente?

Se lì la risposta è sì, tutto il resto è contenuto. Se è no, nessuna quantità di tecnologie, appezzamenti e automazioni lo salva. **È la verifica obbligatoria del punto 1 della roadmap, e si fa prima di costruire qualunque altra cosa.**
