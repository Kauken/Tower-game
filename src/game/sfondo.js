// Disegno dello sfondo: il pavimento della stanza e i muri attorno.
// Gira una volta sola all'avvio e poi solo se cambia la dimensione della
// finestra. Mai dentro il ciclo di gioco.

import { area, arena, grafica } from './config.js'

export function disegnaSfondo(ctx) {
  const stile = grafica.stanza
  const larghezza = arena.destra - arena.sinistra
  const altezza = arena.basso - arena.alto

  ctx.clearRect(0, 0, area.larghezza, area.altezza)

  // i muri: una cornice spessa tutt'intorno alla stanza
  ctx.fillStyle = stile.colore_muro
  ctx.fillRect(
    arena.sinistra - arena.spessore_muro,
    arena.alto - arena.spessore_muro,
    larghezza + arena.spessore_muro * 2,
    altezza + arena.spessore_muro * 2
  )
  ctx.lineWidth = stile.spessore_bordo_muro
  ctx.strokeStyle = stile.colore_bordo_muro
  ctx.strokeRect(
    arena.sinistra - arena.spessore_muro,
    arena.alto - arena.spessore_muro,
    larghezza + arena.spessore_muro * 2,
    altezza + arena.spessore_muro * 2
  )

  ctx.fillStyle = stile.colore_pavimento
  ctx.fillRect(arena.sinistra, arena.alto, larghezza, altezza)

  // piastrelle a scacchiera: su un pavimento uniforme non si legge quanto ci
  // si e' spostati, e il movimento e' la cosa piu' importante del gioco
  const lato = larghezza / stile.piastrelle
  const righe = Math.ceil(altezza / lato)
  ctx.fillStyle = stile.colore_piastrella
  for (let riga = 0; riga < righe; riga++) {
    for (let colonna = 0; colonna < stile.piastrelle; colonna++) {
      if ((riga + colonna) % 2 !== 0) {
        continue
      }
      const alto = arena.alto + riga * lato
      const altezzaPiastrella = Math.min(lato, arena.basso - alto)
      ctx.fillRect(arena.sinistra + colonna * lato, alto, lato, altezzaPiastrella)
    }
  }
}
