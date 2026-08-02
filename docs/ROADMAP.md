# Lista di costruzione — v4 (riscritta dopo il campo aperto)

Un punto alla volta, testando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Le liste v1 (tower defense a labirinto), v2 (battaglia a corsie) e v3 (due fasi,
esplorazione prima) sono state sostituite da questa.

## Come è ordinata, e perché

La v3 costruiva prima il dungeon e solo dopo faceva incontrare gli oggetti con
la battaglia. Era l'ordine sbagliato: la promessa del gioco è

> **gli oggetti non potenziano solo te, trasformano tutto il tuo esercito**

e quella promessa **non è mai stata provata**. Costruire dieci stanze prima di
sapere se è divertente significa scoprirlo tardi e con molto lavoro buttato.

Questa lista è ordinata per **quanto in fretta risponde alla domanda più
grossa**. Prima si rende divertente l'assedio da solo — che esiste già e si
prova subito — e solo dopo gli si costruisce attorno il dungeon.

---

## Fase A — l'assedio deve essere divertente da solo

Obiettivo: una partita da 8-12 minuti che finisce, e che venga voglia di
rifare. Senza esplorazione, senza stanze.

1. **Il personaggio.** Si muove con la levetta a pollice, attacca da solo il nemico più vicino — **FATTO**
2. **Il campo aperto.** Via la corsia e il tower defense: eserciti su un fronte irregolare, pressione continua, il personaggio viene colpito e abbattuto — **FATTO**
3. **Abilità attive.** 2-3 pulsanti sul pollice destro con ricarica visibile: una spinta all'esercito, un colpo ad area, un'evocazione. Sono le mani del giocatore dentro la battaglia.
4. **Le carte — il punto che decide tutto.** Ogni tot di pressione il gioco si ferma e offre **3 carte, ne scegli 1**. Servono 8-10 oggetti veri, e ognuno deve cambiare **come si combatte** e toccare **anche l'esercito**. È qui che si scopre se il gioco è un gioco.
5. **Le 4 Torri da conquistare.** Strutture piantate nel campo, si prendono tenendo il terreno intorno, con effetti globali visibili. Sono ciò che dà un motivo per andare da qualche parte oltre al fronte.
6. **Più tipi di truppa.** Ratto nero, Golem, Sciame fra i nemici; un secondo minion alleato. E le spinte annunciate, così non arrivano alle spalle.
7. **La partita finisce.** Bilanciamento vero (agente `bilanciatore`) e rifinitura (agente `rifinitore`): durata 8-12 minuti, vittoria e sconfitta raggiungibili, feedback che si sente.

> ### 🛑 Verifica obbligatoria dopo il punto 7
> **Ti viene voglia di rigiocare subito?**
> Se la risposta è no, il problema è nel design dell'assedio e si risolve qui.
> Costruire il dungeon sopra un assedio noioso non lo renderebbe divertente:
> lo renderebbe solo più lungo da attraversare.

---

## Fase B — l'esplorazione

Si comincia solo se la Fase A ha superato la verifica.

8. **La stanza.** Un'arena chiusa con porte, nemici che entrano, porte che si aprono quando è pulita. Stesso motore del campo, forma diversa.
9. **La mappa.** Stanze collegate generate a caso, spostamento fra stanze, minimappa.
10. **Le stanze speciali.** Tesoro, negozio, evento, maledetta, segreta.
11. **Il collegamento.** Esplori raccogliendo, poi entri nell'assedio con la build addosso; vinto l'assedio si va al bioma nuovo.
12. **Mini boss e boss di bioma.**

> ### 🛑 Verifica obbligatoria dopo il punto 11
> **Il ciclo raccogli-e-scarica funziona?** È il momento in cui il gioco
> diventa davvero quello descritto nel GDD.

---

## Fase C — il gioco completo

13. **Salvataggio e ripresa.** Su telefono si viene interrotti: non negoziabile prima di far provare il gioco a chiunque altro.
14. **Progressione permanente.** Cristalli, sblocchi, personaggi.
15. **Ambienti del campo.** 3 tipi con ostacoli propri.
16. **Suono e rifinitura finale.**
17. **Impacchettamento mobile** con Capacitor, e valutazione del cambio di motore (vedi `DECISIONI.md`).

---

## Cosa NON si fa finché la Fase A non è superata

Sprite disegnati, suono, più biomi, più personaggi, negozio permanente,
traduzioni, pubblicità, cambio di motore di gioco. Sono tutte cose che si
fanno **dopo** aver saputo che il gioco è divertente, non prima.
