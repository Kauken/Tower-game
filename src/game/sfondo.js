// Disegno dello sfondo: il campo aperto fra i due castelli.
// Gira una volta sola all'avvio e poi solo se cambia la mappa o la dimensione
// della finestra. Mai dentro il ciclo di gioco.

import { area, grafica } from './config.js'

function disegnaTerreno(ctx, mappa) {
  const stile = grafica.campo
  const campo = mappa.campo

  ctx.fillStyle = stile.colore
  ctx.fillRect(0, 0, area.larghezza, area.altezza)

  // fasce orizzontali tenui: senza riferimenti non si legge quanto si e'
  // avanti sul campo, e la profondita' e' l'informazione piu' importante
  const altezza = campo.basso - campo.alto
  const passo = altezza / stile.fasce
  ctx.fillStyle = stile.colore_fascia
  for (let i = 0; i < stile.fasce; i += 2) {
    ctx.fillRect(campo.sinistra, campo.alto + passo * i, campo.destra - campo.sinistra, passo)
  }

  ctx.lineWidth = stile.spessore_bordo
  ctx.strokeStyle = stile.colore_bordo
  ctx.strokeRect(
    campo.sinistra,
    campo.alto,
    campo.destra - campo.sinistra,
    campo.basso - campo.alto
  )
}

// La linea di meta' campo: dice a colpo d'occhio se stai spingendo in casa
// loro o difendendo in casa tua.
function disegnaMetaCampo(ctx, mappa) {
  const stile = grafica.campo.meta_campo
  const campo = mappa.campo
  const meta = (campo.alto + campo.basso) / 2

  ctx.save()
  ctx.setLineDash([stile.tratto, stile.tratto])
  ctx.beginPath()
  ctx.moveTo(campo.sinistra, meta)
  ctx.lineTo(campo.destra, meta)
  ctx.lineWidth = stile.spessore
  ctx.strokeStyle = stile.colore
  ctx.stroke()
  ctx.restore()
}

function disegnaCastello(ctx, blocco, stile) {
  const sinistra = blocco.x - blocco.larghezza / 2
  const alto = blocco.y - blocco.altezza / 2
  ctx.fillStyle = stile.colore
  ctx.fillRect(sinistra, alto, blocco.larghezza, blocco.altezza)
  ctx.lineWidth = stile.spessore_bordo
  ctx.strokeStyle = stile.colore_bordo
  ctx.strokeRect(sinistra, alto, blocco.larghezza, blocco.altezza)
}

export function disegnaSfondo(ctx, mappa) {
  ctx.clearRect(0, 0, area.larghezza, area.altezza)
  disegnaTerreno(ctx, mappa)
  disegnaMetaCampo(ctx, mappa)
  disegnaCastello(ctx, mappa.fortezza_nemica, grafica.fortezza_nemica)
  disegnaCastello(ctx, mappa.fortezza_giocatore, grafica.fortezza_giocatore)
}
