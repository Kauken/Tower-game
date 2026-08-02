# Torre di Guardia — Documento di design v0.4

**v0.4 = seconda evoluzione decisa dall'autore (2026-08).** Il gioco non è più solo una battaglia a corsie: diventa un **roguelike a due fasi** — esplorazione di stanze in stile Binding of Isaac + guerra d'assedio fra due castelli. La battaglia a corsie della v0.3 non viene buttata: diventa una delle due fasi.

**Decisioni chiuse:** ambientazione fantasy/medievale · due fasi alternate (esplorazione + assedio) · gli oggetti modificano l'esercito, non solo il personaggio · mappa e campo di battaglia generati proceduralmente · progressione permanente fra le run · partita da 15-25 minuti.

> I numeri sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Concetto in una riga

Esplori un dungeon a stanze raccogliendo oggetti che cambiano il gioco; poi porti quella build su un campo di battaglia dove il tuo esercito e quello nemico si scontrano, e la usi per abbattere il castello avversario. Gli oggetti non potenziano solo te: **trasformano tutto il tuo esercito**.

## 2. Le due fasi

### 2.1 Esplorazione

Mappa a stanze collegate, generata proceduralmente. Per passare oltre bisogna ripulire la stanza: uccisi tutti i nemici, le porte si aprono.

Tipi di stanza: **tesoro · negozio · evento · maledetta · segreta · NPC · mini boss**.

Lo scopo dell'esplorazione è **costruire la build**, non vincere: è la fase in cui si raccoglie.

### 2.2 Assedio

Un **campo aperto** largo quanto lo schermo separa il tuo castello da quello nemico. Da entrambi escono minion in continuazione, che avanzano e si scontrano dove si incontrano. Vince chi abbatte il castello avversario.

Il giocatore **è in campo** e può: combattere di persona, proteggere i propri minion, evocarne di nuovi, lanciare abilità e magie, e sfruttare gli oggetti raccolti.

Lo scopo dell'assedio è **usare la build**: è la fase in cui si spende.

### 2.3 Perché il campo è aperto e non una corsia

La corsia stretta è stata provata ed è stata scartata: con un personaggio che si muove libero su tutto lo schermo e i nemici incolonnati in un solo sentiero, **restare al sicuro è gratis**. Non c'è modo di essere assaltati, e quindi non c'è gioco.

Il campo largo quanto lo schermo risolve il problema alla radice: gli eserciti si dispongono su un **fronte irregolare**, il giocatore ha spazio laterale per schivare e aggirare, e **farsi circondare diventa geometricamente possibile**.

### 2.3 Come si legano (regola di struttura)

**L'assedio è il boss di fine bioma.** Non è una modalità parallela: è il traguardo verso cui l'esplorazione ti prepara. Esplori 6-10 stanze, raccogli, poi il campo mette alla prova quello che hai messo insieme. Vinto l'assedio, si passa al bioma nuovo.

Questo dà un ritmo chiaro — **raccogli, poi scarica** — ed evita che le due fasi sembrino due giochi incollati.

## 2.4 Da dove arriva il pericolo — il cuore del progetto

Vampire Survivors e un assedio hanno **due minacce di forma diversa**, e non si mescolano ritoccando i numeri:

- In Vampire Survivors i nemici nascono **intorno a te** e convergono. La minaccia è l'accerchiamento, e tu sei sempre il centro.
- In un assedio i nemici arrivano **da una direzione sola**. La minaccia è la linea che avanza, e il centro non sei tu: è il fronte.

La soluzione non è imitare Vampire Survivors, ma usare la minaccia che l'assedio ha già dentro di sé:

> **Il pericolo è sbilanciarsi in avanti.**

In una battaglia vera non muori perché qualcuno appare alle tue spalle: muori perché ti spingi troppo avanti e ti tagliano fuori dai tuoi. Questo dà al giocatore una manopola di rischio continua e leggibile a colpo d'occhio — **quanto sono avanti sul campo**:

| Dove sei | Cosa ottieni | Cosa rischi |
|---|---|---|
| Dietro la tua linea | Poco: i tuoi combattono senza di te | Niente |
| Sul fronte | Il tuo danno decide gli scontri | I tuoi ti coprono |
| Oltre il fronte, in casa loro | Bersagli grossi: strutture, rinforzi, il castello | Nessuno ti copre e i rinforzi freschi ti camminano addosso |

E siccome **il fronte si muove**, la zona sicura cambia in continuazione. Quando stai vincendo puoi permetterti di spingere; quando stai perdendo il fronte arriva sotto casa tua e ti ritrovi circondato **senza che il gioco debba barare** — è lo stesso momento di panico di Vampire Survivors, ma nasce dall'andamento della battaglia invece che da un contatore di spawn.

## 3. I comandi (la decisione più importante su telefono)

Isaac si gioca con due levette: una per muoversi, una per sparare. **Su un telefono in verticale, con i pollici, due levette virtuali sono la cosa che uccide questi giochi.** Non si fa.

Schema adottato:

- **Pollice sinistro: una levetta che compare dove appoggi il dito**, per muoverti. Nient'altro.
- **Attacco automatico**: il personaggio colpisce da solo il nemico più vicino a portata. È il modello di Vampire Survivors e Archero, ed è il motivo per cui funzionano col pollice.
- **Pollice destro: 2-3 pulsanti grandi** per abilità, evocazione e magia, con ricarica visibile.

Conseguenza di design: **la bravura del giocatore sta nel posizionarsi e nel decidere quando premere**, non nella mira. È una scelta, non un ripiego, e va rispettata da tutto il resto.

## 4. Un solo motore, due arene

Il personaggio si muove e combatte **allo stesso identico modo** nelle due fasi. Cambia solo la forma dell'arena:

- **Stanza**: spazio chiuso, porte, nemici che entrano.
- **Corsia**: spazio lungo, due castelli, due eserciti.

Non si costruiscono due giochi: si costruisce **un personaggio dentro un'arena**, e l'arena ha due tipi. Metà del lavoro sparisce e la fusione si sente naturale invece che incollata.

## 4.1 Vita del personaggio: si viene abbattuti, non si muore

Il personaggio ha vita e i nemici lo colpiscono. A zero **non finisce la run**: viene abbattuto, sparisce per qualche secondo e si riforma al proprio castello, mentre l'esercito continua a combattere senza di lui.

Motivo: su un telefono, una run che finisce perché uno sciame ti ha preso insegna una cosa sola — **stare indietro**. E stare indietro annulla tutto il progetto. La punizione dell'abbattimento è già severa nella valuta giusta: **terreno e tempo**. Mentre sei via il fronte scivola verso casa tua, e te lo devi riprendere.

**La run finisce quando cade il tuo castello**, non quando cadi tu.

## 5. Le Torri — non si costruiscono, si conquistano

Il gioco **non è più un tower defense**: non ci sono caselle né torri da comprare. Sarebbe una meccanica di un altro gioco appiccicata sopra a questo.

Le quattro Torri restano, ma cambiano ruolo: sono **strutture antiche piantate nel campo**, fra i due castelli, e si prendono **tenendo il terreno intorno**. Chi le controlla ne riceve l'effetto globale; l'avversario può riprendersele.

Così le Torri risolvono un problema che un campo aperto ha per natura — **non ci sarebbe motivo di andare da nessuna parte se non sul fronte**. Le Torri sono i posti che valgono la pena, e stanno dove fa male andare.

Non si distruggono: **influenzano l'intera partita con effetti globali**.

| Torre | Cosa fa |
|---|---|
| **Torre del Sole** | Aumenta i danni dei minion, potenzia gli attacchi di fuoco |
| **Torre della Natura** | Cura lentamente gli alleati, evoca creature, radici che rallentano |
| **Torre Arcana** | Potenzia la magia, riduce le ricariche, genera fulmini casuali |
| **Torre del Ferro** | Rafforza il castello, irrobustisce i minion, crea barricate |

**Regola di leggibilità:** ogni torre deve produrre qualcosa di **visibile sul campo**. Un effetto globale silenzioso non si sente e non vale il lavoro.

## 6. Gli oggetti — il cuore del gioco

Come in Isaac: ogni oggetto **cambia davvero il gioco**, non aggiunge percentuali. Esempi: frecce che rimbalzano · minion esplosivi · castello che spara laser · evocazioni automatiche · fulmini a catena · veleno contagioso · evocazioni che crescono nel tempo · oggetti che ribaltano il funzionamento di un'abilità.

### La regola che rende il gioco originale

**Ogni oggetto deve avere un effetto anche sull'esercito, non solo sul personaggio.**

È questo il perno di tutto il progetto. Un oggetto che dà frecce infuocate deve rendere infuocati anche gli arcieri. Uno che fa esplodere i tuoi colpi deve far esplodere i minion morendo. Se un oggetto tocca solo il personaggio, il gioco torna a essere due giochi separati.

### Sistema a tag

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

Le sinergie sono **regole fra tag, mai fra oggetti specifici**: è così che poche righe generano centinaia di combinazioni.

## 6.1 Il ritmo dell'assedio: pressione continua, non ondate a chiamata

Non c'è più un pulsante "chiama l'assalto". Entrambi i castelli **producono truppe in continuazione**, e la pressione nemica cresce col tempo. Sopra questo scorrere costante arrivano le **spinte**: ogni tanto il castello nemico svuota le caserme tutte insieme.

Il respiro della battaglia diventa: **calma → spinta → calma**. È durante la spinta che il fronte si rompe, che ti ritrovi circondato e che gli oggetti si vedono lavorare.

Togliere il pulsante toglie anche il momento morto in cui il gioco aspettava il giocatore: su telefono, una partita che non si ferma mai è una partita che si riprende in mano volentieri.

## 7. Struttura della run

```
Stanza iniziale → esplorazione → tesoro → evento → mini boss
      → ASSEDIO (campo aperto) → nuovo bioma → ...
```

Ogni bioma introduce nemici, ambientazione e meccaniche diverse. Durata bersaglio della run: **15-25 minuti**.

### Il campo cambia ogni volta

Il campo dell'assedio è generato proceduralmente con ambienti diversi — **ponti · foreste · cimiteri · rovine · caverne · gole · ghiacci · vulcani · paludi** — ognuno con ostacoli, trappole e vantaggi propri.

`[DA DECIDERE]` Se l'ambiente del campo è deciso dal bioma o pescato a parte.

## 8. Progressione permanente

Anche perdendo si avanza. Si sbloccano nel tempo: personaggi · oggetti · reliquie · minion · castelli · torri · biomi · boss · stanze · eventi.

Valuta permanente: **cristalli**, guadagnati a fine run anche se persa. Mai convertibili con l'oro di partita.

## 9. Architettura tecnica

Un solo canvas 2D per il campo; React solo per l'interfaccia; Capacitor per le app; salvataggi con Capacitor Preferences; **tutti i numeri in `config/*.json`**.

Salvataggio automatico a ogni cambio di stanza e a ogni fine assedio: su telefono si viene interrotti di continuo.

## 10. Ambito — cosa NON fare adesso

Audio, animazioni curate, più personaggi, pubblicità e acquisti, menù elaborati, traduzioni, biomi oltre il primo, progressione permanente. **Prima deve esistere una fetta verticale giocabile**: un bioma, poche stanze, pochi oggetti, un assedio.

## 11. Punti aperti

- `[DA DECIDERE]` Come si ottengono le torri
- `[DA DECIDERE]` Quanti oggetti per bioma
- `[DA DECIDERE]` Ambiente del campo legato al bioma o indipendente
- `[DA DECIDERE]` Come si conquista una Torre: basta starci vicino o va tenuta la zona
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
- `[DA DECIDERE]` I profili personaggio
