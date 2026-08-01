---
name: punto
description: Esegue un punto numerato della lista in docs/ROADMAP.md applicando il protocollo completo del progetto. Usala quando ti viene chiesto "fai il punto N", "andiamo avanti", "prossimo passo" o simili.
---

# Esecuzione di un punto della roadmap

## Prima di scrivere qualsiasi cosa

1. Leggi `docs/ROADMAP.md` e individua il punto richiesto.
2. Leggi la sezione di `docs/GDD.md` che riguarda quel punto. **Il GDD comanda**: se la roadmap è più vaga, i dettagli si prendono dal GDD.
3. Guarda cosa esiste già nel codice per quel sistema.
4. **Scrivi il piano prima di eseguirlo**: cosa costruisci, quali file tocchi, quali valori nuovi servono in `config/`, e soprattutto **cosa lasci fuori**.

## Durante

- Solo quel punto. Non anticipare i punti successivi nemmeno se sembra comodo.
- Nessun numero nel codice: tutto in `config/`.
- Rispetta `td-canvas-loop` per la logica di gioco e `td-mobile-ui` per l'interfaccia.
- Se durante il lavoro scopri che il punto dipende da qualcosa che non esiste ancora, **fermati e dillo** invece di costruire anche quello.

## Alla fine, sempre

1. Esegui l'agente `collaudo`.
2. Segna il punto come **FATTO** in `docs/ROADMAP.md`.
3. Scrivi il resoconto in italiano, in questo ordine:
   - **Cosa ho fatto** — tre righe, non venti
   - **Cosa provare** — l'azione concreta da fare nel gioco, passo per passo
   - **Cosa guardare** — le due o tre cose che potrebbero non andare, formulate come domande ("il tocco è preciso?")
   - **Valori provvisori** — quali numeri ho messo a caso e che andranno tarati
4. Se hai dovuto prendere una decisione di design non prevista dal GDD, dichiarala esplicitamente in fondo.
