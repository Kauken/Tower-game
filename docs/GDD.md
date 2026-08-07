# Documento di design — v2.0

**Questo documento sostituisce tutto quello che c'era prima.** Le versioni precedenti (tower defense a labirinto, battaglia a corsie, assedio a campo aperto, roguelike a stanze) sono cancellate.

> I numeri sono **valori di partenza da tarare**. Ciò che è marcato `[DA DECIDERE]` va chiuso prima di scrivere il codice relativo.

---

## 1. Il gioco in una riga

**Un tower defense roguelike per telefono in cui non piazzi torri: compri reclute e le mandi a una postazione.** Due torri tue producono oro da sole; tu decidi cosa comprare, dove mandarlo e se investire nella rendita invece che nell'esercito. Le reclute combattono senza di te — e si consumano. Gli oggetti che trovi le trasformano.

## 2. Il ruolo del giocatore

Zero riflessi, zero mira, zero schivate. Tre decisioni che si ripetono:

1. **Quale recluta comprare, e quando.**
2. **A quale postazione mandarla** — un tocco per postazione, non uno per uomo.
3. **Esercito adesso o rendita per dopo** — potenziare le torri costa oro che non stai spendendo in truppe.
4. **Quale oggetto prendere**, quando la pool ne offre tre.

> Non guardi: **spendi**.

È questo che tiene il gioco lontano dall'essere uno spettacolo. Se comprare fosse sempre la mossa giusta non ci sarebbe partita: è **la scelta fra rendita ed esercito** a renderla una partita, e va difesa in ogni decisione futura di bilanciamento.

## 3. Il campo

Un **sentiero** che va dal punto di uscita dei nemici, in alto, al **tuo castello**, in basso.

- Lungo il sentiero ci sono **quattro postazioni** con un numero fisso di posti. È lì che le reclute vanno a stare.
- I **nemici scendono e non si fermano mai.** Marciano dalla breccia al castello e colpiscono chi trovano lungo la strada senza rallentare. Attraversano tutte e quattro le postazioni: ognuna li logora un pezzo, nessuna li blocca.
- Un nemico che arriva in fondo **toglie vita al tuo castello**. A zero, la run finisce.
- Le tue **due torri** stanno ai lati e non sparano: **producono oro**. Sono fisse, non si piazzano, e si possono potenziare.

### Perché le postazioni, e perché i nemici non si fermano

Sono la stessa regola vista da due lati, e sono la correzione dell'errore che ha rovinato tre versioni di questo gioco.

Quando i nemici si fermavano a combattere e le reclute potevano andare tutte nello stesso punto, l'esercito si accumulava sotto la breccia e uccideva i nemici **uno per uno, appena usciti**. Il castello non veniva mai toccato, l'oro si accumulava senza avere dove andare, e comprare smetteva di essere una decisione.

Il **tetto dei posti** impedisce di ammassare l'esercito in un punto solo e costringe la difesa a distribuirsi su tutto il sentiero. Il fatto che i **nemici non si fermino** impedisce l'ingorgo e tiene il castello raggiungibile.

## 4. Le reclute

Si comprano con un pulsante, quando hai l'oro. Partono dal castello e camminano fino alla **postazione scelta**, e lì restano. Un acquisto fa partire una **squadra intera**: è quello che tiene basso il numero di tocchi senza togliere niente alla decisione.

- Divise in **categorie** (per esempio Fanteria, Bestie, Arcani, Meccanismi).
- Ognuna ha costo, vita, danno, velocità, portata.
- La **velocità** decide quanto ci mettono ad arrivare alla postazione: è per questo che il Ratto è la recluta d'emergenza.
- Se ne sbloccano di nuove giocando.

### Le reclute non guariscono. Si consumano.

Una recluta ferita resta ferita. Ogni ondata che passa la logora, e prima o poi cade.

Non è una punizione, è il motore dell'economia: è **l'usura che dà all'oro un posto dove andare** per tutta la partita, e che tiene la difesa sempre un po' più sottile di quanto vorresti. Un tower defense in cui la tua difesa sanguina.

L'unico modo per curarle è un oggetto della pool — ed è per questo che quell'oggetto conta.

### Il tetto di equipaggiamento — l'idea che regge la varietà

Porti in partita **poche categorie su molte** (`[DA DECIDERE]` quante, indicativamente 3 su 12). Questo decide l'identità della run **prima del primo secondo**, e soprattutto piega la pool: un oggetto che potenzia le Bestie è un tesoro se hai due categorie Bestia, carta straccia se non ne hai nessuna.

**È qui che nasce la varietà alla Isaac dentro un tower defense.** Se una scelta di design la indebolisce, è la scelta sbagliata.

## 5. La struttura di un livello

Un livello è una **sequenza di ondate di tipo diverso**, nello stesso ordine di massima ma con contenuto pescato:

```
normale → normale → speciale → negozio → normale → mini boss
       → tesoro → normale → speciale → BOSS DEL BIOMA
```

| Ondata | Cosa succede |
|---|---|
| **Normale** | Nemici del bioma |
| **Speciale** | Un vincolo o una stranezza: tutti veloci, tutti corazzati, buio |
| **Negozio** | Si compra con l'oro: reclute, cure al castello, potenziamenti |
| **Mini boss** | Un nemico grosso, e una ricompensa |
| **Tesoro** | La pool: **tre oggetti, ne scegli uno** |
| **Boss** | Chiude il bioma. Vinto, si passa al livello dopo |

Battuto il boss si passa al bioma successivo, con nemici e ambientazione nuovi.

**L'ordine è fisso, il contenuto è pescato.** È questo che dà una linea di avanzamento: si sa sempre a che punto del livello si è, quanto manca al boss e che tipo di ondata sta arrivando. La ripetizione sta nella forma, la varietà nel riempimento.

**Le ondate partono da sole.** Non c'è un pulsante per chiamarle in anticipo in cambio di un premio: sarebbe una seconda scommessa dello stesso tipo di quella fra esercito e rendita, e se la mangerebbe. La pausa fra un'ondata e l'altra è il tempo in cui l'oro sale e si decide.

### Come si perde

Il castello ha una **vita**. Ogni nemico che arriva in fondo al sentiero ne toglie un pezzo; a zero la run finisce. Non c'è morte istantanea: la sconfitta si accumula e **si vede arrivare**, in tempo per spendere diversamente.

## 6. Gli oggetti

Arrivano dalla pool nelle ondate tesoro: **tre, ne scegli uno**. Si accumulano per tutta la run.

Ogni oggetto cambia **come combattono le tue reclute**, non solo di quanto. Un pool fatto solo di moltiplicatori è una lista di numeri più grandi: quello che deve far ricordare una partita è l'oggetto che cambia le regole.

I tipi di effetto che il motore sa leggere (il codice non conosce nessun oggetto in particolare — si aggiunge una voce in `config/potenziamenti.json`, non si tocca il codice):

| tipo | cosa fa |
|---|---|
| `moltiplica` | una statistica delle reclute, per categoria o per tutte |
| `rendita` | oro in più per ciclo dalle torri |
| `sconto` | tutte le reclute costano meno |
| `oro_uccisione` | oro in più per ogni nemico ucciso |
| `guarigione_ondata` | le reclute ferite recuperano fra un'ondata e l'altra |
| `rinforzo` | una squadra gratis a ogni ondata, che va da sola dove c'è più posto |
| `esplosione_morte` | la recluta che cade scoppia e ferisce i nemici vicini |
| `rallenta` | i nemici colpiti marciano **e colpiscono** più piano |
| `veterano` | ogni uccisione rende quella recluta più forte, per il resto della partita |
| `spine` | chi colpisce la recluta si ferisce da solo |

Ogni oggetto può essere **generico** (`categoria: "tutte"`) o **di categoria**, ed è la seconda cosa che fa nascere le sinergie con il tetto di equipaggiamento.

> **Nota di progetto, misurata e non supposta:** rallentare la sola marcia dei nemici *fa perdere ondate*. Un nemico lento resta più a lungo addosso a reclute che sono ferme e non guariscono, e i due effetti si annullano. Per questo `rallenta` agisce anche sulla cadenza dei colpi, e per questo non esiste un oggetto costruito solo sul rallentamento: in un gioco dove la difesa è immobile, il rallentamento da solo non è un archetipo che funziona.

### Sistema a tag

`FUOCO · GELO · FULMINE · VELENO · SACRO · ORO · AREA · RAPIDITÀ`

Le sinergie sono **regole fra tag, mai fra oggetti specifici**: poche righe generano centinaia di combinazioni.

## 7. Progressione permanente

A fine run — vinta o persa — si spendono i **cristalli** su potenziamenti permanenti sbloccati giocando: reclute nuove, categorie nuove, rendita di partenza migliore, oggetti che entrano nella pool.

## 8. I comandi

Tutto a pulsanti grandi, nella metà bassa dello schermo:

- **Compra recluta** (uno per categoria equipaggiata), con costo e disponibilità visibili
- **Potenzia rendita**, con costo crescente
- La schermata **tre oggetti, ne scegli uno**, a tutto schermo

Niente levetta, niente personaggio da muovere. `[DA DECIDERE]` se serve un'abilità attiva con ricarica.

## 9. Architettura tecnica

Un solo canvas 2D per il campo; React solo per l'interfaccia; **tutti i numeri in `config/*.json`**; salvataggio a ogni fine ondata. Motore: si resta sul web (vedi `DECISIONI.md`).

## 10. Ambito — cosa NON si fa adesso

Sprite disegnati, suono, più biomi, negozio, progressione permanente, categorie multiple, traduzioni. **Prima deve essere soddisfacente guardare l'oro salire e decidere quando spenderlo.**

## 11. Punti aperti

- `[DA DECIDERE]` Quante categorie si portano in partita, e su quante totali
- `[DA DECIDERE]` Se serve un'abilità attiva con ricarica
- `[DA DECIDERE]` Le 12 regole di sinergia definitive
- `[DA DECIDERE]` Quante ondate tesoro dentro un livello, cioè quanti oggetti si prendono per bioma

Chiuse il 2026-08-02 (vedi `DECISIONI.md`): **le ondate partono da sole**, non si chiamano in anticipo; **un livello è la sequenza qui sopra e finisce col boss del bioma**; **si perde quando abbastanza nemici arrivano in fondo** e il castello va a zero.
