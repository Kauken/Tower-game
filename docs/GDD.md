# Torre di Guardia — Documento di design v0.3

**v0.3 = pivot deciso dall'autore (2026-08):** non più un tower defense a labirinto, ma una **battaglia a corsie roguelike**. Questo documento sostituisce la v0.2; le parti che sopravvivono al pivot (carte, tag, economia, atti) sono riprese da lì.

**Decisioni chiuse:** ambientazione fantasy/medievale · battaglia a corsie con minion propri · comandi attivi pochi e con ricarica · potenziamenti che cambiano *come* si combatte, non solo quanto · carte-patto con bonus e malus · partita da 10-15 minuti · doppia valuta non convertibile · vendita torri sì (60%), spostamento no.

> I numeri indicati sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Concetto in una riga

Due fortezze su una corsia verticale: i tuoi minion partono dal basso, i loro dall'alto, si scontrano dove le due spinte si incontrano. Le tue torri, poche e sempre in combattimento, sparano e potenziano. A ogni assalto peschi potenziamenti che cambiano il modo in cui il tuo esercito combatte — alla Binding of Isaac — finché la loro fortezza cade. O la tua.

## 2. Il campo

- **Corsia verticale** a schermo intero: fortezza nemica in alto, la tua in basso.
- Entrambe le fortezze hanno **punti vita**. Un minion che raggiunge la fortezza avversaria le toglie vita e si immola.
- **Il fronte** — il punto dove gli eserciti si scontrano — è l'indicatore di chi sta vincendo: si legge a colpo d'occhio, senza numeri.
- **4 caselle torre**, solo nella metà bassa (la tua), ai lati della corsia: 2 normali, 1 altura (+raggio), 1 vena di mana (+cadenza). Poche per scelta: ogni piazzamento pesa.

## 3. Le truppe

Entrambi gli eserciti escono **da soli**, a ondate chiamate **assalti**. I minion marciano, e quando incontrano un nemico a portata si fermano e combattono. Vince chi sfonda.

- **I tuoi minion** (v1: il **Milite**): partono dalla tua fortezza verso l'alto. Le carte ne cambiano composizione e comportamento.
- **I nemici** (v1: il **Fante**; poi Ratto nero, Golem, Sciame): partono dall'alto. Crescono di assalto in assalto per vita e danno, con curve in configurazione.

Ogni tipo di truppa ha: vita, velocità, danno, cadenza di attacco, raggio d'ingaggio, danno alla fortezza. Tutto in `config/`.

## 4. Le torri

Poche, solo nella tua metà, **sempre rilevanti** perché il fronte si muove. Ruoli:

| Torre | Ruolo |
|---|---|
| **Balestriere** | Attacco: colpi rapidi sui nemici in corsia |
| **Catapulta** | Area: punisce gli ammassi al fronte |
| **Cappella del Gelo** | Controllo: rallenta la spinta nemica |
| **Obelisco** | Potenziamento: rafforza torri (e in futuro i minion) nel raggio |

Vendita al 60%, nessuno spostamento. Ogni torre deve avere potenziamenti che la trasformano; se una è sempre ovvia o sempre inutile, si riprogetta.

## 5. Il giocatore: cosa fa con le mani

Il rischio del genere è guardare e basta. Le mani del giocatore stanno su:

1. **Piazzare e vendere torri** (oro).
2. **Chiamare l'assalto** quando è pronto: fra un assalto e l'altro il gioco aspetta.
3. **Una abilità attiva con ricarica** (v1: **"Carica!"** — per qualche secondo i tuoi minion spingono più forte). Un pulsante grande, un tempo di ricarica visibile. `[DA DECIDERE]` se le carte possono sbloccarne una seconda. **Mai più di due**: niente barre di abilità da MMO, per scelta dell'autore.
4. **Le scelte di pesca** (vedi §6): sono la vera profondità.

## 6. I potenziamenti — il cuore del gioco

Il modello è Vampire Survivors / Binding of Isaac: i potenziamenti non aggiungono "+10% danno", cambiano **come** si combatte, e sommandosi diventano build visibilmente più forti. Famiglie:

1. **Moduli** — su una torre specifica ("i colpi rimbalzano su un secondo nemico").
2. **Addestramenti** — sui tuoi minion ("i Militi esplodono morendo", "escono in coppia ma più fragili").
3. **Reliquie** — effetti globali di partita.
4. **Patti** — bonus forte + malus dichiarato ("le torri sparano il 40% più veloce, la tua fortezza parte con 3 vite in meno"). La scelta col brivido.
5. **Consumabili** — uso singolo.

### Il sistema a tag (invariato dalla v0.2)

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

I tag ora stanno **anche sui minion**: le sinergie fra esercito e torri sono l'identità del gioco. Esempi: minion FUOCO + torre AREA → le fiamme si propagano nel mucchio; torre GELO + minion RAPIDITÀ → i tuoi colpiscono i rallentati con critico. Le sinergie restano regole fra tag, mai fra oggetti specifici.

### Ritmo delle ricompense

- Dopo ogni assalto: negozio rapido in oro (torri, vendita) — 5-10 s, saltabile.
- Ogni 2 assalti: **3 carte, ne scegli 1** — il momento importante. I patti compaiono qui, riconoscibili.
- Dopo il boss d'atto: il mercante (gettoni).

## 7. Struttura della partita

- **3 atti**, ognuno contro una fortezza nemica più dura.
- Un atto si **vince** distruggendo la fortezza nemica; si **perde** se cade la tua (fine della run).
- Gli assalti crescono senza fine finché l'atto non si chiude: chi non spinge affronta assalti sempre più duri. Ritmo atteso: fortezza giù in 5-7 assalti `[DA TARARE]`.
- Al **6° assalto** di un atto scende in corsia il **comandante** (boss). `[DA DECIDERE]` la sua abilità.
- Durata bersaglio della run: **12-14 minuti**.
- **Salvataggio automatico a ogni fine assalto**, ripresa esatta. Non negoziabile su mobile.

## 8. Economia — doppia valuta (invariata)

| Valuta | Si guadagna | Si spende | Sopravvive |
|---|---|---|---|
| **Oro** | Uccisioni, fine assalto | Torri, negozio | No |
| **Cristalli** | Fine run (anche persa) | Permanenti, personaggi | Sì |

Mai convertibili. Una run persa dà comunque cristalli.

## 9. Cosa è casuale e cosa no

| Elemento | Casuale? |
|---|---|
| Corsia e caselle | No |
| Torri disponibili | No |
| Carte offerte | Sì, filtrate |
| Composizione assalti | Parzialmente (schema per atto) |
| Mercante | Sì |

## 10. Architettura tecnica (invariata)

Un solo canvas 2D per il campo; React solo per l'interfaccia; Capacitor per le app; salvataggi con Capacitor Preferences; **tutti i numeri in `config/*.json`**, il codice li legge e basta.

## 11. Ambito v1 — cosa NON fare adesso

Audio, animazioni curate, più mappe, più personaggi, pubblicità/acquisti, menù e schermata titolo, traduzioni. Un solo tipo di minion per parte finché il combattimento non è divertente.

## 12. Punti aperti

- `[DA DECIDERE]` Destino dei moduli se la torre viene venduta
- `[DA DECIDERE]` Abilità del comandante (boss)
- `[DA DECIDERE]` Seconda abilità attiva sbloccabile: sì o no
- `[DA DECIDERE]` Le 12 regole di sinergia definitive (ora anche con tag sui minion)
- `[DA DECIDERE]` I 4 profili personaggio
- `[DA DECIDERE]` Recupero vita della fortezza: possibile o mai
