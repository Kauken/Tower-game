# Lista di costruzione — v5 (progetto riscritto da zero)

Un punto alla volta, testando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Le liste precedenti sono cancellate insieme ai giochi per cui erano scritte.
Il gioco è quello del `GDD.md` v1.0: **action roguelike a stanze con un seguito
di minion**.

## Come è ordinata

Ogni punto deve lasciare qualcosa di **giocabile col pollice**, e i punti sono
messi in modo che le domande grosse ricevano risposta il prima possibile.

La domanda più grossa di tutte è la prima:

> **Ripulire una stanza avendo il seguito appresso è divertente?**

Ci si arriva al punto 3. Tutto il resto — piani, oggetti, boss, negozi — è
inutile se lì la risposta è no.

---

## Fase A — la stanza deve essere divertente

1. **La stanza sola.** Un'arena chiusa con le pareti, il personaggio dentro, nemici che entrano; ripuliti i nemici la stanza si dichiara pulita. Niente porte ancora, niente seguito.
2. **Il seguito.** I minion ti seguono, ingaggiano da soli, cadono e si rialzano a stanza pulita. Il tetto del seguito è un numero in configurazione.
3. **Nemici che valgono.** 3-4 tipi con comportamenti diversi (chi carica, chi tira da lontano, chi è lento e duro), e le disposizioni: quanti nemici, dove, da dove entrano.

> ### 🛑 Verifica dopo il punto 3
> **Ripulire una stanza col seguito appresso è divertente?**
> Se no, il problema è nel combattimento e si risolve qui: nel modo in cui il
> seguito si muove, nella velocità dei nemici, in quanto ti senti decisivo.
> Costruire i piani sopra una stanza noiosa moltiplicherebbe solo la noia.

## Fase B — il piano

4. **Porte e passaggio.** Ripulita la stanza le porte si aprono, si passa alla stanza accanto, il seguito viene con te.
5. **La pianta del piano.** Griglia, stanze collegate generate a caso, minimappa. Le stanze speciali hanno il loro posto.
6. **L'archivio delle disposizioni.** Una ventina di interni preparati in configurazione, pescati a caso: è ciò che rende ogni stanza diversa.
7. **Il boss.** Una stanza in fondo al piano, un nemico grosso, e la discesa al piano dopo.

## Fase C — gli oggetti, cioè il gioco

8. **La stanza del tesoro e i primi 8 oggetti.** Un oggetto su un piedistallo, lo prendi e basta. Ognuno cambia **come** si combatte e tocca **anche il seguito**.
9. **Sistema tag e prime 6 sinergie.**
10. **Altri 10-12 oggetti** con l'agente `designer-contenuti`.

> ### 🛑 Verifica dopo il punto 10
> **Due run di fila sono diverse fra loro?** È la promessa del genere.
> Se le run si somigliano, mancano oggetti o mancano sinergie, e si sta lì.

## Fase D — il gioco intero

11. **Le stanze speciali**: negozio, accampamento (recluti minion), evento, maledetta, segreta.
12. **Le abilità attive** sui pulsanti del pollice destro.
13. **Il secondo e terzo bioma**: nemici, boss e disposizioni propri.
14. **Salvataggio e ripresa.** Su telefono si viene interrotti: non negoziabile prima di far provare il gioco a chiunque altro.
15. **Progressione permanente**: cristalli e sblocchi.
16. **Bilanciamento e rifinitura** con gli agenti dedicati.
17. **Impacchettamento mobile** con Capacitor.

---

## Cosa si butta subito, prima di cominciare

Il codice dell'assedio va smontato, non aggirato: campo aperto, pressione,
spinte, vita dei castelli, marcia verso il castello avversario. Sopravvivono il
ciclo di gioco, la levetta, il personaggio, i proiettili, gli effetti e la
logica di combattimento delle truppe (vedi `GDD.md` §10).

Si fa **una volta sola, all'inizio del punto 1**. Costruire la stanza sopra il
motore dell'assedio significherebbe rifare l'errore che ha portato fin qui.
