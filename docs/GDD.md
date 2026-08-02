# Torre di Guardia — Documento di design v0.4

**v0.4 = seconda evoluzione decisa dall'autore (2026-08).** Il gioco non è più solo una battaglia a corsie: diventa un **roguelike a due fasi** — esplorazione di stanze in stile Binding of Isaac + guerra d'assedio fra due castelli. La battaglia a corsie della v0.3 non viene buttata: diventa una delle due fasi.

**Decisioni chiuse:** ambientazione fantasy/medievale · due fasi alternate (esplorazione + assedio) · gli oggetti modificano l'esercito, non solo il personaggio · mappa e sentiero generati proceduralmente · progressione permanente fra le run · partita da 15-25 minuti.

> I numeri sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Concetto in una riga

Esplori un dungeon a stanze raccogliendo oggetti che cambiano il gioco; poi porti quella build su una corsia dove il tuo esercito e quello nemico si scontrano, e la usi per abbattere il castello avversario. Gli oggetti non potenziano solo te: **trasformano tutto il tuo esercito**.

## 2. Le due fasi

### 2.1 Esplorazione

Mappa a stanze collegate, generata proceduralmente. Per passare oltre bisogna ripulire la stanza: uccisi tutti i nemici, le porte si aprono.

Tipi di stanza: **tesoro · negozio · evento · maledetta · segreta · NPC · mini boss**.

Lo scopo dell'esplorazione è **costruire la build**, non vincere: è la fase in cui si raccoglie.

### 2.2 Assedio

Una corsia collega il tuo castello a quello nemico. Da entrambi escono minion in continuazione, che avanzano da soli e si scontrano. Vince chi abbatte il castello avversario.

Il giocatore **è in campo** e può: combattere di persona, proteggere i propri minion, evocarne di nuovi, lanciare abilità e magie, e sfruttare gli oggetti raccolti.

Lo scopo dell'assedio è **usare la build**: è la fase in cui si spende.

### 2.3 Come si legano (regola di struttura)

**L'assedio è il boss di fine bioma.** Non è una modalità parallela: è il traguardo verso cui l'esplorazione ti prepara. Esplori 6-10 stanze, raccogli, poi la corsia mette alla prova quello che hai messo insieme. Vinto l'assedio, si passa al bioma nuovo.

Questo dà un ritmo chiaro — **raccogli, poi scarica** — ed evita che le due fasi sembrino due giochi incollati.

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

## 5. Le Torri

Quattro grandi strutture antiche lungo la corsia. Non si distruggono: **influenzano l'intera partita con effetti globali**.

| Torre | Cosa fa |
|---|---|
| **Torre del Sole** | Aumenta i danni dei minion, potenzia gli attacchi di fuoco |
| **Torre della Natura** | Cura lentamente gli alleati, evoca creature, radici che rallentano |
| **Torre Arcana** | Potenzia la magia, riduce le ricariche, genera fulmini casuali |
| **Torre del Ferro** | Rafforza il castello, irrobustisce i minion, crea barricate |

`[DA DECIDERE]` Come si ottiene il controllo di una torre: sono già tue, si conquistano durante l'assedio, o si scelgono a inizio bioma.

**Regola di leggibilità:** ogni torre deve produrre qualcosa di **visibile in corsia**. Un effetto globale silenzioso non si sente e non vale il lavoro.

## 6. Gli oggetti — il cuore del gioco

Come in Isaac: ogni oggetto **cambia davvero il gioco**, non aggiunge percentuali. Esempi: frecce che rimbalzano · minion esplosivi · castello che spara laser · evocazioni automatiche · fulmini a catena · veleno contagioso · evocazioni che crescono nel tempo · oggetti che ribaltano il funzionamento di un'abilità.

### La regola che rende il gioco originale

**Ogni oggetto deve avere un effetto anche sull'esercito, non solo sul personaggio.**

È questo il perno di tutto il progetto. Un oggetto che dà frecce infuocate deve rendere infuocati anche gli arcieri. Uno che fa esplodere i tuoi colpi deve far esplodere i minion morendo. Se un oggetto tocca solo il personaggio, il gioco torna a essere due giochi separati.

### Sistema a tag

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

Le sinergie sono **regole fra tag, mai fra oggetti specifici**: è così che poche righe generano centinaia di combinazioni.

## 7. Struttura della run

```
Stanza iniziale → esplorazione → tesoro → evento → mini boss
      → ASSEDIO (corsia) → nuovo bioma → ...
```

Ogni bioma introduce nemici, ambientazione e meccaniche diverse. Durata bersaglio della run: **15-25 minuti**.

### Il sentiero cambia ogni volta

La corsia dell'assedio è generata proceduralmente con ambienti diversi — **ponti · foreste · cimiteri · rovine · caverne · gole · ghiacci · vulcani · paludi** — ognuno con ostacoli, trappole e vantaggi propri.

`[DA DECIDERE]` Se l'ambiente del sentiero è deciso dal bioma o pescato a parte.

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
- `[DA DECIDERE]` Se il personaggio muore in corsia: sconfitta immediata o rientro
- `[DA DECIDERE]` Quanti oggetti per bioma
- `[DA DECIDERE]` Ambiente del sentiero legato al bioma o indipendente
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
- `[DA DECIDERE]` I profili personaggio
