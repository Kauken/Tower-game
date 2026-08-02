# Documento di design — v1.0

**Questo documento sostituisce tutto quello che c'era prima.** Le versioni precedenti (tower defense a labirinto, battaglia a corsie, assedio fra castelli) sono cancellate: non erano evoluzioni della stessa idea, erano giochi diversi impilati uno sull'altro. Quello che segue è il gioco, e basta.

> I numeri sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Il gioco in una riga

**Un action roguelike a stanze alla Binding of Isaac per telefono: entri, i nemici sono gia' li', ripulisci la stanza e prosegui. Gli oggetti che trovi non ti danno numeri piu' grossi, cambiano il modo in cui combatti.**

## 2. Cosa NON è più

Cancellati, perché appartenevano a un gioco diverso:

| Cosa | Perché muore |
|---|---|
| I due castelli e l'assedio | Se il gioco è a stanze da ripulire, non stai assediando niente |
| Le ondate | Le ondate sono un flusso continuo; le stanze sono unità chiuse. Sono due ritmi incompatibili |
| Il fronte, la pressione, la corsia | Erano il vocabolario dell'assedio |
| Le torri, comprate o conquistate | Restano di un tower defense che non esiste più |
| "3 carte, ne scegli 1" | Non è Isaac. In Isaac l'oggetto è **uno** su un piedistallo, e il caso sta in quale sia uscito |

Anche **il seguito di minion** è caduto: vedi la sezione qui sotto, con il motivo.

## 3. Il seguito di minion: tagliato

Per una fase il progetto ruotava attorno a un seguito di minion che ti accompagnava di stanza in stanza. **E' stato tolto**, su intuizione dell'autore, per un motivo che vale la pena ricordare:

> In una stanza chiusa, degli alleati distruggono proprio la cosa che rende la stanza interessante: **che ogni nemico e' un tuo problema.**

Ogni colpo assorbito da un minion e' un colpo che il giocatore non ha dovuto schivare. Su un campo aperto aveva senso; dentro una stanza toglie tensione e sposta il gioco dal giocare al guardare.

**Resta in riserva in una forma diversa:** l'**evocazione a pulsante**, come le bombe di Isaac. Premi, compaiono due guardie per pochi secondi che bloccano un varco mentre ti riposizioni, poi spariscono. Cosi' sono uno strumento che usa il giocatore, non una folla che gioca al posto suo. Si decide quando ci saranno le abilita' attive.

### Il debito aperto

Tagliando il seguito il gioco perde l'unica cosa che lo distingueva da cento altri roguelike a stanze. **E' accettabile adesso** — quello che conta e' che il combattimento sia buono — ma non per sempre. Va trovata una risposta a "perche' questo e non Isaac", e va trovata prima di aggiungere contenuto in quantita'.

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

> **Ogni oggetto deve cambiare *come* si combatte, mai solo di quanto.**

Colpi che rimbalzano, che incendiano il pavimento, che si sdoppiano; nemici che esplodono morendo; colpi che attraversano i muri. Mai "+15% danno": un potenziamento che non si vede addosso ai colpi e' tempo sprecato.

### Il sistema a tag

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

Le sinergie sono **regole fra tag, mai fra oggetti specifici**: poche righe generano centinaia di combinazioni.

## 6. I comandi

- **Pollice sinistro: una levetta che nasce dove appoggi il dito.** Solo movimento.
- **Attacco automatico** sul nemico più vicino a portata.
- **Pollice destro: 2-3 pulsanti grandi** per le abilità, con ricarica visibile.

Mai due levette virtuali: su un telefono in verticale sono ciò che uccide questi giochi.

`[DA DECIDERE]` **Se si spara solo da fermi.** È il trucco di *Archero*: ti muovi **oppure** spari, mai insieme. Con un dito solo crea tensione continua e trasforma ogni istante in una scelta fra fare male e restare vivo. Da provare quando il combattimento base sarà solido — è una modifica piccola con un effetto grande.

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

Anche perdendo si avanza: si sbloccano **personaggi, oggetti, biomi, boss, stanze, eventi**. Valuta permanente: **cristalli**, guadagnati a fine run anche se persa. Mai convertibili con l'oro di partita.

## 9. Architettura tecnica

Un solo canvas 2D per il campo; React solo per l'interfaccia; **tutti i numeri in `config/*.json`**; salvataggio a ogni cambio di stanza, perché su telefono si viene interrotti. Motore: si resta sul web (deciso, vedi `DECISIONI.md`).

## 10. Stato del codice

Il motore dell'assedio è stato smontato. Esiste la stanza: arena chiusa, muri veri, personaggio che si muove col pollice e attacca da solo, nemici, effetti, fine della run. Vedi `docs/HANDOFF.md` per il dettaglio.

## 11. Ambito — cosa NON si fa adesso

Sprite disegnati, suono, più biomi, più personaggi, progressione permanente, negozio, traduzioni. Prima deve esistere **una stanza che sia divertente da ripulire**, con nemici che si comportano in modi diversi.

## 12. Punti aperti

- `[DA DECIDERE]` Si spara solo da fermi (modello Archero) o anche in movimento
- `[DA DECIDERE]` Se l'evocazione a pulsante entra come abilità attiva
- `[DA DECIDERE]` Cosa distingue questo gioco da Isaac, ora che il seguito è tagliato
- `[DA DECIDERE]` Quanti oggetti per piano
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
- `[DA DECIDERE]` I profili personaggio
