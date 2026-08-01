# Proposta — Le torri diventano Strutture

Stato: **proposta, non approvata.** Nasce dall'idea dell'autore (2026-08): le torri non devono essere oggetti che sparano a un'area, ma presenze simboliche che fanno effetto su tutta la partita, divise per categoria, con oggetti pescati dalle carte che ci si applicano sopra.

Questo documento esiste per non perdere il ragionamento. Va approvato, modificato o scartato prima di scrivere codice.

## L'idea in una riga

Una **Struttura** non spara: applica un **verbo** alla battaglia per tutta la partita. Le carte danno **moduli** che sono **aggettivi**. Verbo × aggettivo = il contenuto si moltiplica da solo.

## Il meccanismo centrale: verbo × elemento

Il problema classico dei giochi a potenziamenti è che le combinazioni si scrivono a coppie e diventano ingestibili. Qui si evita così:

- La **categoria della struttura** decide **cosa succede** (il verbo).
- Il **modulo** decide **di che natura è** (l'elemento/tag).
- Lo stesso modulo su strutture diverse produce effetti diversi, senza scrivere una regola per ogni coppia.

Esempio con il modulo **FUOCO**:

| Struttura | Cosa diventa il FUOCO |
|---|---|
| Arsenale (offensiva) | le salve incendiano i bersagli |
| Terreno | la corsia brucia in un tratto |
| Comando (alleati) | i tuoi Militi danno fuoco a contatto |
| Maledizione (nemici) | i nemici entrano in campo già ustionati |
| Fortificazione (difensiva) | la barricata brucia chi la colpisce |

5 categorie × 8 tag = 40 comportamenti percepiti, partendo da 13 pezzi di contenuto. È il moltiplicatore che serve per avere partite diverse senza costruire 200 oggetti.

## Le categorie proposte (5, non di più)

1. **Arsenale — offensiva.** Aggiunge fonti di danno: salve, bombardamenti, un raggio continuo. È l'erede diretto di Balestriere e Catapulta.
2. **Fortificazione — difensiva.** Agisce sulla tua metà: barricate che bloccano l'avanzata, cure ai tuoi, scudi alla fortezza.
3. **Comando — effetti sugli alleati.** Cambia cosa *sono* i tuoi Militi: escono in coppia, caricano più forte, esplodono morendo, guadagnano un tag.
4. **Maledizione — effetti sui nemici.** Debolezze applicate a chi entra in corsia: veleno, rallentamento, corazza incrinata, marchio.
5. **Territorio — effetti sul terreno.** Cambia la corsia stessa: un tratto diventa palude, una zona dove nessuno si cura, una trincea dove i tuoi combattono meglio. **È la categoria più originale: nessun altro gioco del genere la ha.**

## La posizione conta ancora (ma in modo nuovo)

Se una struttura è solo un effetto globale, piazzarla non è una decisione e il campo non mostra niente. Proposta: molte strutture agiscono su una **fascia di corsia** all'altezza in cui sono piazzate, non su un cerchio.

Conseguenze: la fascia si **vede** (la corsia cambia aspetto lì), e decidere *a che altezza* metterla è una scelta vera — vicino alla tua fortezza è un'ultima difesa, a metà corsia colpisce dove si forma il fronte.

## Regola di leggibilità (non negoziabile)

**Ogni struttura deve produrre qualcosa di visibile in corsia.** Un potenziamento invisibile è tempo sprecato: il modello dichiarato è Vampire Survivors / Binding of Isaac, dove ogni scelta si *vede* subito addosso ai colpi. Niente "+15% danno" silenziosi.

## Slot e moduli

- Ogni struttura nasce con **1 slot**; se ne guadagnano con le carte.
- I moduli pescati si applicano a una struttura specifica. Un modulo su una struttura sbagliata è sprecato: la scelta ha un costo.
- Le **sinergie** restano regole fra tag (mai fra oggetti specifici), e ora valgono anche fra strutture diverse: due strutture con lo stesso tag si rinforzano.

## Dottrine: la scelta a inizio partita

A inizio run scegli **2 categorie su 5** ("dottrine"): decidono quali strutture e quali moduli compaiono nel tuo mazzo di carte. Due partite con dottrine diverse non si somigliano.

Sostituisce il sistema personaggi a costo quasi zero, e dà una decisione forte al secondo zero della partita.

## Quantità: poche strutture, molti moduli

L'autore chiede "molte torri per variare". Raccomandazione contraria e motivata: **2-3 strutture per categoria (10-15 in tutto), e molti moduli.** Le strutture sono codice (ogni verbo va programmato), i moduli sono configurazione (righe JSON). La varietà costa meno e rende di più dal lato moduli, e il moltiplicatore verbo × elemento fa il resto.

## Cosa si salva del lavoro fatto

Tutto il motore: corsia, due eserciti, combattimento, pool, effetti, economia, ondate. Le 4 torri attuali diventano strutture di categoria diversa senza buttare niente:

| Oggi | Diventa |
|---|---|
| Balestriere, Catapulta | Arsenale |
| Cappella del Gelo | Maledizione |
| Obelisco | Comando |

## Ordine di costruzione suggerito

1. Rinominare e riclassificare le 4 torri esistenti nelle categorie (poco lavoro, subito provabile).
2. Aggiungere **una** struttura Territorio: è la categoria che cambia davvero il gioco e va provata presto.
3. Slot e moduli (è il punto 3 della roadmap: negozio + carte).
4. Il moltiplicatore verbo × elemento sui tag.
5. Le dottrine a inizio partita.

## Rischi dichiarati

- **Il campo può diventare illeggibile** se troppe strutture dipingono fasce sulla corsia contemporaneamente. Serve un tetto e uno stile visivo sobrio.
- **Con 5 categorie da programmare, il punto 3 si allunga molto.** Meglio due categorie fatte bene che cinque abbozzate.
- **Nessuna di queste idee è stata provata col pollice.** Il pivot a corsie stesso non è ancora stato giocato dall'autore sul telefono.
