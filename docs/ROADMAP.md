# Lista di costruzione — v6

Un punto alla volta, testando dopo ognuno.
Quando l'autore dice "fai il punto N", si intende il numero di questa lista.
A lavoro finito il punto si segna **FATTO**.

Il gioco è quello del `GDD.md` v2.0: **tower defense roguelike in cui si comprano
reclute invece di piazzare torri.**

## Come è ordinata

Ogni punto deve lasciare qualcosa di **giocabile col pollice**, e la domanda più
grossa riceve risposta per prima:

> **Guardare l'oro salire e decidere quando spenderlo è soddisfacente?**

Ci si arriva al punto 1. Tutto il resto — categorie, pool, negozi, boss, biomi —
è inutile se lì la risposta è no.

---

## Fase A — il nucleo deve funzionare

1. **Il ciclo dell'oro.** — **FATTO** (2026-08-02). Sentiero, castello con la vita, due torri che producono oro, un pulsante per comprare la recluta base, un pulsante per potenziare la rendita, ondate di nemici che scendono. Si perde se il castello cade.

> ### 🛑 Verifica dopo il punto 1
> **Decidere quando spendere è soddisfacente?** E soprattutto: **la scelta fra
> comprare adesso e investire nella rendita è una scelta vera**, o comprare è
> sempre giusto? Se è sempre giusto, il gioco non esiste ancora e si risolve qui.

2. **Le categorie di recluta.** — **FATTO** (2026-08-02). Milite (il metro), Guardia (regge e protegge), Arciere (colpisce da dietro la prima fila), Ratto (costa poco e arriva subito). Un pulsante per ciascuna, col colore che hanno in campo.
3. **Nemici che valgono.** — **FATTO** (2026-08-02). Fante (base), Corridore (veloce, dall'ondata 4), Bruto (lento e corazzato, dalla 9), Balestriere (colpisce da lontano, dalla 13). Entrano un tipo alla volta, e ognuno punisce una difesa sbilanciata.
4. **La pool: tre oggetti, ne scegli uno.** — **PARZIALE** (2026-08-07). Esiste la scelta a inizio partita con 16 oggetti, di cui 8 dinamici (esplosione alla morte, veterano, spine, rinforzi gratuiti, cure fra le ondate, oro per uccisione, gelo). Manca la scelta ricorrente dalle ondate tesoro, che arriva col punto 5.

4b. **Le postazioni e il logoramento.** — **FATTO** (2026-08-07). Quattro postazioni con posti limitati lungo il sentiero; le reclute si mandano lì e lì restano. I nemici non si fermano più: marciano fino al castello colpendo chi trovano. Le reclute non guariscono. È la correzione dell'errore che rovinava le versioni precedenti — l'esercito che si ammassava sotto la breccia e rendeva il castello irraggiungibile.

## Fase B — il livello

5. **La sequenza delle ondate**: normale, speciale, negozio, mini boss, tesoro, boss. Con l'indicatore di cosa sta arrivando.
6. **Il negozio** fra un'ondata e l'altra.
7. **Mini boss e boss di bioma**, e il passaggio al livello successivo.
8. **Le ondate speciali**: vincoli e stranezze che cambiano una singola ondata.

> ### 🛑 Verifica dopo il punto 7
> **Due run di fila sono diverse fra loro?** Se si somigliano, mancano oggetti
> o mancano sinergie, e si sta lì.

## Fase C — il gioco intero

9. **Sistema tag e prime 6 sinergie.**
10. **Il tetto di equipaggiamento**: porti poche categorie su molte, e la pool si piega su quelle.
11. **Altri oggetti e altre reclute** con l'agente `designer-contenuti`.
12. **Il secondo e terzo bioma.**
13. **Salvataggio e ripresa.**
14. **Progressione permanente**: cristalli e sblocchi.
15. **Bilanciamento e rifinitura** con gli agenti dedicati.
16. **Impacchettamento mobile** con Capacitor, e rivalutazione del motore.
