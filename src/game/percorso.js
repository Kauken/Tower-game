// Il percorso viene "cotto" una volta sola all'avvio: lunghezze e direzioni
// dei segmenti finiscono in array preallocati, cosi' il ciclo di gioco non
// alloca piu' niente per far camminare un nemico.

export function preparaPercorso(punti) {
  const segmenti = punti.length - 1

  const partenzaX = new Float64Array(segmenti)
  const partenzaY = new Float64Array(segmenti)
  const direzioneX = new Float64Array(segmenti)
  const direzioneY = new Float64Array(segmenti)
  const lunghezza = new Float64Array(segmenti)
  // distanza cumulata dall'inizio del percorso fino alla fine di ogni segmento
  const cumulata = new Float64Array(segmenti + 1)

  for (let i = 0; i < segmenti; i++) {
    const da = punti[i]
    const a = punti[i + 1]
    const dx = a.x - da.x
    const dy = a.y - da.y
    const lung = Math.sqrt(dx * dx + dy * dy)

    partenzaX[i] = da.x
    partenzaY[i] = da.y
    direzioneX[i] = lung > 0 ? dx / lung : 0
    direzioneY[i] = lung > 0 ? dy / lung : 0
    lunghezza[i] = lung
    cumulata[i + 1] = cumulata[i] + lung
  }

  return {
    punti,
    segmenti,
    partenzaX,
    partenzaY,
    direzioneX,
    direzioneY,
    lunghezza,
    cumulata,
    lunghezzaTotale: cumulata[segmenti]
  }
}

// Scrive dentro `entita` la posizione corrispondente alla distanza percorsa.
// Non crea oggetti: modifica i campi x, y e segmento gia' esistenti.
export function posizionaSuPercorso(percorso, entita) {
  let segmento = entita.segmento

  // se la distanza e' tornata indietro (ciclo ripartito) si riparte dal primo
  if (entita.distanza < percorso.cumulata[segmento]) {
    segmento = 0
  }
  while (
    segmento < percorso.segmenti - 1 &&
    entita.distanza > percorso.cumulata[segmento + 1]
  ) {
    segmento++
  }

  const avanzamento = entita.distanza - percorso.cumulata[segmento]
  entita.segmento = segmento
  entita.x = percorso.partenzaX[segmento] + percorso.direzioneX[segmento] * avanzamento
  entita.y = percorso.partenzaY[segmento] + percorso.direzioneY[segmento] * avanzamento
}
