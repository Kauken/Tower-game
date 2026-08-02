# Torre di Guardia

Action roguelike a stanze con un seguito di minion, fantasy, pensato per il telefono in verticale.
Gira nel browser (Vite + React + canvas 2D nativo, nessuna libreria di gioco) e più avanti verrà impacchettato come app con Capacitor.

## Pagina pubblicata

https://kauken.github.io/Tower-game/

Ogni modifica portata sul ramo `main` viene ripubblicata automaticamente lì (workflow `.github/workflows/deploy.yml`).

## Avvio in locale

```bash
npm install
npm run dev      # sviluppo, apre un indirizzo locale
npm run build    # build di produzione: deve passare senza errori
```

Serve Node 20 o superiore.

## Dove sta cosa

| Cartella | Contenuto |
| --- | --- |
| `config/` | Tutti i numeri del gioco: stanza, nemici, personaggio, motore, potenziamenti, sinergie |
| `docs/` | Documentazione di design: `docs/GDD.md` comanda, `docs/ROADMAP.md` dice cosa viene dopo |
| `src/game/` | Motore di gioco e disegno su canvas |
| `src/ui/` | Interfaccia React sopra al canvas |
| `.claude/agents/` | Assistenti specializzati: bilanciamento, resa su mobile, contenuti, collaudo |
| `.claude/skills/` | Regole di progetto: schema configurazioni, ciclo di gioco, interfaccia touch |

## Configurazione

Nessun numero di bilanciamento sta nel codice: costi, danni, vite, raggi, cadenze e ricompense stanno tutti nei file JSON dentro `config/`.
Per cambiare l'equilibrio del gioco si modificano quei file, non `src/`.

> **Attenzione: tutti i numeri attualmente presenti in `config/` sono provvisori e da tarare.**
> Sono valori di partenza plausibili messi lì solo per avere una struttura completa; non sono stati provati in partita.

## Regole di lavoro

Le istruzioni permanenti per chi (o cosa) modifica questo progetto stanno in `CLAUDE.md`.
