# Lista di costruzione — v5 (progetto riscritto da zero)

Un punto alla volta, testando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Le liste precedenti sono cancellate insieme ai giochi per cui erano scritte.
Il gioco è quello del `GDD.md` v1.0: **action roguelike a stanze per telefono**.

## Come è ordinata

Ogni punto deve lasciare qualcosa di **giocabile col pollice**, e i punti sono
messi in modo che le domande grosse ricevano risposta il prima possibile.

La domanda più grossa di tutte è la prima:

> **Ripulire una stanza è divertente?**

Ci si arriva al punto 2. Tutto il resto — piani, oggetti, boss, negozi — è
inutile se lì la risposta è no.

---

## Fase A — la stanza deve essere divertente

1. **La stanza sola.** Un'arena chiusa con le pareti, il personaggio dentro, nemici da eliminare; ripuliti i nemici la stanza si dichiara pulita. Niente porte ancora — **FATTO**
   *In più, dichiarato:* un pulsante "Stanza successiva" per poter provare più stanze di fila. Le porte vere, con la scelta della direzione, restano al punto 4.
2. **Nemici che valgono.** I nemici sono già nella stanza quando entri, non arrivano a scaglioni. 4 tipi con comportamenti diversi: chi ti insegue, chi è veloce e imprevedibile, chi è lento e duro, chi tira da lontano e ti costringe a schivare — **FATTO**
3. **Abilità attive.** Uno o due pulsanti sul pollice destro con ricarica visibile. Qui si decide se l'evocazione (quel che resta del seguito) merita di esistere.

> ### 🛑 Verifica dopo il punto 2
> **Ripulire una stanza è divertente?**
> Se no, il problema è nel combattimento e si risolve qui: velocità dei nemici,
> quanto perdonano gli errori, quanto ti senti decisivo.
> Costruire i piani sopra una stanza noiosa moltiplicherebbe solo la noia.

## Fase B — il piano

4. **Porte e passaggio.** Ripulita la stanza le porte si aprono, si passa alla stanza accanto.
5. **La pianta del piano.** Griglia, stanze collegate generate a caso, minimappa. Le stanze speciali hanno il loro posto.
6. **L'archivio delle disposizioni.** Una ventina di interni preparati in configurazione, pescati a caso: è ciò che rende ogni stanza diversa.
7. **Il boss.** Una stanza in fondo al piano, un nemico grosso, e la discesa al piano dopo.

## Fase C — gli oggetti, cioè il gioco

8. **La stanza del tesoro e i primi 8 oggetti.** Un oggetto su un piedistallo, lo prendi e basta. Ognuno cambia **come** si combatte, mai solo di quanto.
9. **Sistema tag e prime 6 sinergie.**
10. **Altri 10-12 oggetti** con l'agente `designer-contenuti`.

> ### 🛑 Verifica dopo il punto 10
> **Due run di fila sono diverse fra loro?** È la promessa del genere.
> Se le run si somigliano, mancano oggetti o mancano sinergie, e si sta lì.

## Fase D — il gioco intero

11. **Le stanze speciali**: negozio, evento, maledetta, segreta.
12. **Il secondo e terzo bioma**: nemici, boss e disposizioni propri.
14. **Salvataggio e ripresa.** Su telefono si viene interrotti: non negoziabile prima di far provare il gioco a chiunque altro.
14. **Progressione permanente**: cristalli e sblocchi.
15. **Bilanciamento e rifinitura** con gli agenti dedicati.
16. **Impacchettamento mobile** con Capacitor, e rivalutazione del motore di gioco.

---

## Il debito aperto

Tagliando il seguito il gioco ha perso l'unica cosa che lo distingueva da cento
altri roguelike a stanze (`DECISIONI.md`, voce aperta 1). Non va risolto adesso
— prima il combattimento deve essere buono — ma **prima della Fase C**, cioè
prima di mettersi a produrre oggetti in quantità.
