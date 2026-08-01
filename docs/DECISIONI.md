# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna docs/GDD.md. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

## Aperte

0. **Le torri diventano Strutture** — Idea dell'autore (2026-08): non più oggetti che sparano a un'area, ma presenze che applicano un effetto per tutta la partita, divise in categorie (offensiva, difensiva, sugli alleati, sui nemici, sul terreno), con moduli pescati dalle carte che ci si applicano sopra e scelta delle categorie a inizio run. Proposta completa e ragionata in `docs/PROPOSTA-STRUTTURE.md`. **Va approvata, modificata o scartata prima del punto 3 della roadmap.** Raccomandazione: prima giocare il pivot a corsie già pubblicato, perché questa idea ci si appoggia sopra.

1. **Destino dei moduli** — Se vendo una torre coi moduli sopra: si perdono, tornano in mano, o rimborso parziale? Da decidere prima del punto 5.
3. **Abilità del boss** — Cura i nemici vicini, oppure immunità ai rallentamenti a intervalli. Da decidere prima del punto 8.
4. **Le 12 regole di sinergia definitive** — 5 esistono già nel GDD, ne mancano 7. Da decidere prima del punto 6, ma si possono aggiungere gradualmente.
5. **I 4 profili personaggio** — Serve solo il primo per la v1. Da decidere prima del punto 10.
6. **Recupero vite** — Le vite perse si recuperano (consumabile, reliquia) o mai? Incide sulla tensione. Da decidere entro il punto 7.

## Decise

- 2026-08: **PIVOT — battaglia a corsie con minion propri.** Scelta dell'autore, opzione B senza prototipo: due eserciti che si scontrano lungo una corsia verticale, torri solo nella metà del giocatore, sempre in combattimento. Comandi attivi pochi e con ricarica (niente MMO); potenziamenti alla Vampire Survivors / Binding of Isaac che cambiano come si spara; carte-patto con bonus e malus insieme. GDD riscritto in v0.3, roadmap rifatta.
- 2026-08: **Vendita sì, spostamento no.** Vendita a rimborso parziale (60%, `rimborso_vendita_torre` in economia.json); niente spostamento, altrimenti gli slot speciali perdono peso. Scelta come da raccomandazione GDD, autorizzata dall'autore con mandato "procedi"; si costruisce col negozio (punto 5). Reversibile se al playtest non convince.
- 2026-08: Ambientazione fantasy/medievale.
- 2026-08: Piazzamento misto: 9 caselle normali + 2 slot speciali (altura +raggio, mana +cadenza).
- 2026-08: Durata run 10-15 minuti → 3 atti × (5 ondate + boss) = 18 ondate.
- 2026-08: Doppia valuta non convertibile (oro di partita / cristalli permanenti).
