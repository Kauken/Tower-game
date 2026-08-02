# Documento di design — v1.0

**Questo documento sostituisce tutto quello che c'era prima.** Le versioni precedenti (tower defense a labirinto, battaglia a corsie, assedio fra castelli) sono cancellate: non erano evoluzioni della stessa idea, erano giochi diversi impilati uno sull'altro. Quello che segue è il gioco, e basta.

> I numeri sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Il gioco in una riga

**Un action roguelike a stanze alla Binding of Isaac, in cui non entri mai da solo: hai un seguito di minion che ti accompagna di stanza in stanza, e gli oggetti che trovi trasformano loro quanto te.**

## 2. Cosa NON è più

Cancellati, perché appartenevano a un gioco diverso:

| Cosa | Perché muore |
|---|---|
| I due castelli e l'assedio | Se il gioco è a stanze da ripulire, non stai assediando niente |
| Le ondate | Le ondate sono un flusso continuo; le stanze sono unità chiuse. Sono due ritmi incompatibili |
| Il fronte, la pressione, la corsia | Erano il vocabolario dell'assedio |
| Le torri, comprate o conquistate | Restano di un tower defense che non esiste più |
| "3 carte, ne scegli 1" | Non è Isaac. In Isaac l'oggetto è **uno** su un piedistallo, e il caso sta in quale sia uscito |

**I minion invece restano** — ma cambiano natura, ed è la cosa più importante di tutto il documento.

## 3. Il seguito — il cuore del gioco

I minion non escono più da un castello. **Sono tuoi, ti seguono, e passano con te da una stanza all'altra.**

- Entri in una stanza col tuo seguito appresso.
- Combattono da soli: ingaggiano il nemico più vicino, ti fanno da scudo.
- Quando cadono restano a terra. **Si rialzano quando la stanza è pulita.**
- Se cadono tutti, il resto della stanza lo fai da solo, e si sente.

Le risorse del gioco sono quindi tre, e si difendono in modi diversi:

| Risorsa | Si perde | Si recupera |
|---|---|---|
| **La tua vita** | Colpi presi | Cure, oggetti, ricompense |
| **Il seguito in piedi** | Minion abbattuti nella stanza | Da solo, a stanza ripulita |
| **La dimensione del seguito** | Mai | Solo con oggetti e stanze di reclutamento |

Il risultato: momento per momento proteggi **chi è in piedi adesso**; nell'arco della run fai crescere **quanti ne puoi avere**.

### Perché è questa l'idea che vale

Il genere è pieno di roguelike a stanze in cui sei solo. I giochi con un esercito di minion esistono — *Boneraiser Minions*, *Skull Horde*, *Beyond the Silver Gate* — ma sono pochi, di nicchia, e nessuno è il riferimento del genere. **La combinazione "struttura di Isaac + un seguito che cresce" non ha un padrone.**

Da qui una regola pratica: se una scelta di design rende il seguito meno importante, è la scelta sbagliata. Un Isaac senza il seguito non ha motivo di esistere.

### Cosa fai tu che il seguito non sa fare

I ruoli devono essere nettamente diversi, altrimenti li guardi giocare:

- **Tu**: veloce, preciso. Decidi *dove* si combatte, raccogli, apri, schivi, usi le abilità.
- **Loro**: lenti, ottusi, resistenti. Danno costante e colpi assorbiti.

Tu **imposti** lo scontro, loro lo **vincono**.

## 4. La stanza

L'unità di gioco. Entri, le porte si chiudono, i nemici arrivano. **Ripulita la stanza, le porte si aprono** e scegli dove andare.

### Come si ottiene la varietà (il metodo, non le buone intenzioni)

Il metodo di Isaac, che è la cosa da copiare davvero:

1. Si genera prima la **pianta del piano**: quali celle di una griglia sono stanze e come sono collegate.
2. Si assegnano le **stanze speciali** (tesoro, negozio, boss...).
3. Solo alla fine si sceglie **l'interno di ogni stanza**, pescandolo da un archivio di disposizioni.

L'ultimo punto è il segreto: gli interni **non sono generati a caso**, sono **disposizioni preparate** — dove stanno gli ostacoli, quanti nemici e di che tipo, da dove entrano. Il caso decide *quale* disposizione esce, non com'è fatta dentro. È così che ogni stanza è diversa senza essere mai sciatta.

Per noi: un archivio di disposizioni in configurazione, che cresce nel tempo. Una ventina per bioma bastano a non riconoscerne mai due di fila.

### Tipi di stanza

| Stanza | Cosa c'è |
|---|---|
| **Normale** | Nemici. Ripulisci e passi |
| **Tesoro** | Un oggetto su un piedistallo. Lo prendi e basta |
| **Negozio** | Poche cose in vendita con l'oro raccolto |
| **Accampamento** | Recluti minion nuovi o alzi il tetto del seguito — la stanza che questo gioco ha e gli altri no |
| **Evento** | Una scelta scritta, con un prezzo |
| **Maledetta** | Un oggetto forte, pagato con qualcosa |
| **Segreta** | Nascosta, si trova rompendo un muro |
| **Boss** | In fondo al piano. Vinto, si scende |

## 5. Gli oggetti

Il modello è Isaac, non le carte:

- **Un oggetto per stanza del tesoro**, su un piedistallo, già deciso. Non scegli fra tre: **scopri cosa ti è capitato e lo fai funzionare**. È questa la magia di Isaac, e una schermata di scelta la ucciderebbe.
- Gli oggetti si **accumulano per tutta la run** e si vedono addosso.
- Ogni oggetto cambia **come si combatte**, mai solo di quanto.

### La regola non negoziabile

> **Ogni oggetto deve fare qualcosa anche al seguito, non solo a te.**

Colpi infuocati? Anche i tuoi minion incendiano. I tuoi colpi rimbalzano? Anche i loro. Esplodi morendo? Anche loro. Se un oggetto tocca solo il personaggio, il seguito diventa decorazione e il gioco perde la sua unica idea originale.

### Il sistema a tag

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

Le sinergie sono **regole fra tag, mai fra oggetti specifici**: poche righe generano centinaia di combinazioni.

## 6. I comandi

- **Pollice sinistro: una levetta che nasce dove appoggi il dito.** Solo movimento.
- **Attacco automatico** sul nemico più vicino a portata.
- **Pollice destro: 2-3 pulsanti grandi** per le abilità, con ricarica visibile.

Mai due levette virtuali: su un telefono in verticale sono ciò che uccide questi giochi.

`[DA DECIDERE]` **Se si spara solo da fermi.** È il trucco di *Archero*: ti muovi **oppure** spari, mai insieme. Crea tensione continua con un dito solo. Qui potrebbe funzionare ancora meglio, perché mentre ti sposti **il seguito continua a combattere e ti copre**: la scelta diventa "mi tolgo dai guai e lascio fare a loro" contro "resto e faccio male". Da provare quando il combattimento base sarà solido — è una modifica piccola con un effetto grande.

## 7. Struttura della run

```
Piano 1 (bioma) → 8-10 stanze → boss → Piano 2 → ... → boss finale
```

- **3-4 piani**, ognuno con ambientazione, nemici e disposizioni proprie.
- Ogni piano ha garantiti: **una stanza del tesoro, un negozio, un boss**; il resto è pescato.
- Il numero di stanze cresce col piano (Isaac parte da 7-8 e sale).
- Durata bersaglio della run: **15-25 minuti**.
- Si muore → si ricomincia da capo. Si scende → non si torna su.

## 8. Progressione permanente

Anche perdendo si avanza: si sbloccano **personaggi, oggetti, tipi di minion, biomi, boss, stanze, eventi**. Valuta permanente: **cristalli**, guadagnati a fine run anche se persa. Mai convertibili con l'oro di partita.

## 9. Architettura tecnica

Un solo canvas 2D per il campo; React solo per l'interfaccia; **tutti i numeri in `config/*.json`**; salvataggio a ogni cambio di stanza, perché su telefono si viene interrotti. Motore: si resta sul web (deciso, vedi `DECISIONI.md`).

## 10. Cosa del codice attuale sopravvive

| Sopravvive | Muore |
|---|---|
| Ciclo a passo fisso, pool preallocati, adattamento allo schermo | Marcia verso il castello avversario |
| Levetta a pollice | Pressione, spinte, gradi |
| Personaggio: movimento, attacco automatico, vita, abbattimento | Vita dei castelli, vittoria e sconfitta per castello |
| Proiettili, effetti, popup dell'oro | Sfondo a campo aperto |
| **La logica di combattimento delle truppe** — ingaggia il più vicino, colpisci, cadi | Il fatto che i minion nascano da una fortezza |

Circa metà del motore resta in piedi. Quello che va rifatto è **da dove vengono i minion e cosa li muove**: non più un castello che li sforna, ma un seguito che ti sta dietro.

## 11. Ambito — cosa NON si fa adesso

Sprite disegnati, suono, più biomi, più personaggi, progressione permanente, negozio, traduzioni. Prima deve esistere **una stanza che sia divertente da ripulire col seguito appresso**.

## 12. Punti aperti

- `[DA DECIDERE]` Si spara solo da fermi (modello Archero) o anche in movimento
- `[DA DECIDERE]` Quanti minion nel seguito iniziale e qual è il tetto
- `[DA DECIDERE]` Come si comporta il seguito: ti sta incollato, tiene una formazione, o si sparpaglia sui nemici
- `[DA DECIDERE]` Quanti oggetti per piano
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
- `[DA DECIDERE]` I profili personaggio
