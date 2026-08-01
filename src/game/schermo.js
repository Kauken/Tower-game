// Adatta un canvas allo schermo del telefono mantenendo le proporzioni della
// risoluzione logica, e tiene conto della densita' dei pixel per non sfocare.

export function adattaCanvas(canvas, area, larghezzaDisponibile, altezzaDisponibile) {
  const scala = Math.min(
    larghezzaDisponibile / area.larghezza,
    altezzaDisponibile / area.altezza
  )
  const densita = window.devicePixelRatio || 1

  const larghezzaCss = area.larghezza * scala
  const altezzaCss = area.altezza * scala

  canvas.style.width = larghezzaCss + 'px'
  canvas.style.height = altezzaCss + 'px'
  canvas.width = Math.round(larghezzaCss * densita)
  canvas.height = Math.round(altezzaCss * densita)

  const ctx = canvas.getContext('2d')
  // da qui in poi si disegna sempre in coordinate logiche
  ctx.setTransform(scala * densita, 0, 0, scala * densita, 0, 0)
  return ctx
}

// Punto riusato: la conversione avviene su un tocco, ma tenere un solo oggetto
// evita di sporcare la memoria anche in caso di tocchi ripetuti.
const punto = { x: 0, y: 0 }

// Da coordinate del dito sullo schermo a coordinate logiche del gioco.
export function aCoordinateLogiche(canvas, area, xSchermo, ySchermo) {
  const riquadro = canvas.getBoundingClientRect()
  punto.x = ((xSchermo - riquadro.left) / riquadro.width) * area.larghezza
  punto.y = ((ySchermo - riquadro.top) / riquadro.height) * area.altezza
  return punto
}
