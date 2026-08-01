# Torre di Guardia — documento di design

Tower defense roguelike fantasy per telefono, in verticale.

Questo documento cresce un punto alla volta, seguendo la lista di costruzione.
Ogni punto descrive **cosa si deve vedere sullo schermo** e i vincoli tecnici da rispettare.

---

## Punto 1 — Campo di gioco, mappa e un nemico che cammina

Stato: **fatto**.

### Cosa si deve vedere sullo schermo

- Il campo di gioco a schermo intero, verticale, su canvas.
- Il percorso della mappa letto da `config/mappe.json`, ben visibile.
- Le 11 caselle di piazzamento visibili e distinguibili tra loro:
  normale, altura e vena di mana devono avere tre aspetti diversi.
- Un nemico Fante che parte dall'inizio del percorso, lo segue fino in fondo,
  scompare e riparte in ciclo continuo.

### Requisiti tecnici (skill `td-canvas-loop`)

- Due canvas sovrapposti: sfondo statico disegnato una volta sola,
  gioco ridisegnato a ogni frame.
- Passo fisso di simulazione.
- Risoluzione logica fissa scalata allo schermo, `devicePixelRatio` gestito.
- Nessuna allocazione dentro il ciclo di gioco.
- Tutti i valori letti dalla configurazione, nessun numero scritto nel codice.

### Fuori dal punto 1

Torri, tocchi, oro, vite, ondate, interfaccia, menù: non esistono ancora.
