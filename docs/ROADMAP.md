# Lista di costruzione — v3 (roguelike a due fasi)

Un punto alla volta, testando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Le liste v1 (tower defense a labirinto) e v2 (battaglia a corsie) sono state
sostituite da questa. Il lavoro fatto non è perso: corsia, due eserciti,
combattimento fra truppe, effetti, economia e pool restano dentro il motore e
diventano la fase di assedio.

## Fetta verticale — l'obiettivo di questa lista

Un bioma, poche stanze, pochi oggetti, un assedio finale. Serve a rispondere a
una sola domanda: **il ciclo raccogli-e-scarica è divertente?** Finché non c'è
risposta, tutto il resto è prematuro.

1. **Il personaggio.** Compare in campo, si muove con la levetta a pollice, attacca da solo il nemico più vicino. Provato dentro la corsia che esiste già — **FATTO**
   *Non compreso, perché dipende da una decisione aperta:* i nemici non lo colpiscono ancora (voce 2 di DECISIONI.md — cosa succede se muore).
2. **La stanza.** Un'arena chiusa con porte, nemici che entrano, porte che si aprono quando la stanza è pulita.
3. **La mappa.** Più stanze collegate generate a caso, spostamento fra stanze, minimappa.
4. **Stanza del tesoro e primi 6 oggetti**, ognuno con effetto sul personaggio **e** sull'esercito.
5. **Il collegamento.** Finite le stanze si entra nell'assedio con la build addosso; vinto l'assedio si va al bioma nuovo.
6. **Le 4 Torri** con i loro effetti globali visibili in corsia.
7. **Abilità ed evocazioni** sui pulsanti del pollice destro.
8. **Sistema tag + prime 6 sinergie** (personaggio, minion e torri).
9. **Ambienti del sentiero** — 3 tipi con ostacoli propri.
10. **Negozio, eventi, stanze maledette e segrete.**
11. **Mini boss e boss di bioma.**
12. **Salvataggio e ripresa.**
13. **Progressione permanente:** cristalli e sblocchi.

**Test obbligatorio dopo il punto 5.** È il primo momento in cui il gioco è
davvero il gioco descritto nel GDD. Se lì non c'è voglia di rigiocare, il
problema è nel design e va risolto lì, non andando avanti con la lista.
