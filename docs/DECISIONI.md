# Registro delle decisioni

Regola: quando una decisione viene presa, si sposta in "Decise" con data e motivazione in una riga, e si aggiorna docs/GDD.md. Nessuna decisione si prende implicitamente dentro un lavoro di codice.

## Aperte

0. **PIVOT — Battaglia a corsie con minion propri.** Idea dell'autore (2026-08): non più nemici che percorrono un labirinto, ma due eserciti — i minion del giocatore partono dalla sua base, quelli nemici dalla loro, si scontrano lungo la corsia (stile League of Legends). Le torri stanno solo nella metà del giocatore e sono sempre in combattimento. Le carte potenziano sia minion che torri. Meno torri, con ruoli: attacco / potenziamento / difesa. **Questa decisione viene prima di tutte le altre: cambia il campo, i nemici, la condizione di vittoria.** Le voci 1-5 restano valide in entrambi i casi (carte, sinergie, boss, personaggi, vite).

1. **Destino dei moduli** — Se vendo una torre coi moduli sopra: si perdono, tornano in mano, o rimborso parziale? Da decidere prima del punto 5.
3. **Abilità del boss** — Cura i nemici vicini, oppure immunità ai rallentamenti a intervalli. Da decidere prima del punto 8.
4. **Le 12 regole di sinergia definitive** — 5 esistono già nel GDD, ne mancano 7. Da decidere prima del punto 6, ma si possono aggiungere gradualmente.
5. **I 4 profili personaggio** — Serve solo il primo per la v1. Da decidere prima del punto 10.
6. **Recupero vite** — Le vite perse si recuperano (consumabile, reliquia) o mai? Incide sulla tensione. Da decidere entro il punto 7.

## Decise

- 2026-08: **Vendita sì, spostamento no.** Vendita a rimborso parziale (60%, `rimborso_vendita_torre` in economia.json); niente spostamento, altrimenti gli slot speciali perdono peso. Scelta come da raccomandazione GDD, autorizzata dall'autore con mandato "procedi"; si costruisce col negozio (punto 5). Reversibile se al playtest non convince.
- 2026-08: Ambientazione fantasy/medievale.
- 2026-08: Piazzamento misto: 9 caselle normali + 2 slot speciali (altura +raggio, mana +cadenza).
- 2026-08: Durata run 10-15 minuti → 3 atti × (5 ondate + boss) = 18 ondate.
- 2026-08: Doppia valuta non convertibile (oro di partita / cristalli permanenti).
