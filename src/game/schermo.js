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
