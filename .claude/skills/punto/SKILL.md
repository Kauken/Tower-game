---
name: punto
description: Esegue un punto numerato della lista in docs/ROADMAP.md applicando il protocollo completo del progetto. Usala quando ti viene chiesto "fai il punto N", "andiamo avanti", "prossimo passo" o simili.
---

# Esecuzione di un punto della roadmap

## Prima di scrivere qualsiasi cosa

1. Leggi `docs/ROADMAP.md` e individua il punto richiesto.
2. Leggi la sezione di `docs/GDD.md` che riguarda quel punto. **Il GDD comanda**: se la roadmap è più vaga, i dettagli si prendono dal GDD.
3. Se il punto tocca numeri, ricette o prezzi, leggi `docs/MATERIALI.md`.
4. Guarda cosa esiste già nel codice: `docs/ARCHITETTURA.md` dice dove, e cosa è **già pronto** per quel sistema. Non rifare da zero una cosa che c'è.
5. Controlla che il punto non tocchi una voce **aperta** di `docs/DECISIONI.md`. Se la tocca, fermati e falla decidere prima.
6. **Scrivi il piano prima di eseguirlo**: cosa costruisci, quali file tocchi, quali valori nuovi servono in `config/`, e soprattutto **cosa lasci fuori**.

## Durante

- Solo quel punto. Non anticipare i punti successivi nemmeno se sembra comodo.
- Nessun numero nel codice: tutto in `config/`.
- Rispetta `isola-motore` per la logica di gioco e `isola-tocco` per l'interfaccia.
- Se durante il lavoro scopri che il punto dipende da qualcosa che non esiste ancora, **fermati e dillo** invece di costruire anche quello.

## Alla fine, sempre

1. Esegui `npm run build`, e **prova davvero nel browser** tutto quello che si vede a schermo. Poi l'agente `collaudo`.
2. Segna il punto come **FATTO** in `docs/ROADMAP.md`.
3. Scrivi il resoconto in italiano, in questo ordine:
   - **Cosa ho fatto** — tre righe, non venti
   - **Cosa provare** — l'azione concreta da fare nel gioco, passo per passo
   - **Cosa guardare** — le due o tre cose che potrebbero non andare, formulate come domande ("il tocco è preciso?")
   - **Valori provvisori** — quali numeri ho messo a occhio e che andranno tarati
   - **La mossa successiva** — l'autore non ha un'altra chat da cui farsi consigliare
4. Se hai dovuto prendere una decisione di design non prevista dal GDD, dichiarala esplicitamente in fondo.
