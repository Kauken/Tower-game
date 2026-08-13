// Il disegno dell'isola, attraverso la telecamera.
//
// Si disegnano **solo le tessere visibili**, non tutta l'isola. Qui dentro non
// si alloca niente: niente stringhe composte, niente measureText, niente
// oggetti nuovi. Gli scratch stanno qui sopra e vengono riusati.

import {
  area,
  elencoMateriali,
  grafica,
  risorse,
  terreni,
  tessera,
  trovaCostruzione
} from './config.js'

// i colori della cassa si leggono una volta sola: dentro il ciclo di gioco
// non si cerca niente in configurazione
const aspettoCassa = trovaCostruzione('cassa')
import {
  colonne,
  filari,
  fondo,
  indiceDi,
  macchia,
  macchiaR,
  macchiaX,
  macchiaY,
  crescitaMs,
  crescitaTotaleMs,
  risorsaIn,
  sopra
} from './mondo.js'

const vista = { da_x: 0, a_x: 0, da_y: 0, a_y: 0 }
const punto = { x: 0, y: 0 }

// Il mare oltre i bordi dell'isola: senza, si vedrebbe il vuoto.
function disegnaFuori(ctx) {
  ctx.fillStyle = grafica.mondo.colore_mare_fuori
  ctx.fillRect(0, 0, area.larghezza, area.altezza)
}

function disegnaTerreno(ctx, camera) {
  const stile = grafica.mondo
  const lato = tessera * camera.stato.zoom + 1

  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      const indice = indiceDi(tx, ty)
      const terreno = terreni[fondo[indice]]
      camera.versoSchermo(tx * tessera, ty * tessera, punto)

      ctx.fillStyle = terreno.colore
      ctx.fillRect(punto.x, punto.y, lato, lato)

      // la variazione: una macchia TONDA, non un quadrato. Un quadrato piu'
      // chiaro dentro una griglia di quadrati si legge come una scacchiera,
      // ed e' esattamente la cosa da evitare
      if (macchia[indice]) {
        const forma = stile.macchia
        const raggio =
          (forma.raggio_minimo +
            macchiaR[indice] * (forma.raggio_massimo - forma.raggio_minimo)) *
          lato
        ctx.globalAlpha = stile.opacita_variazione
        ctx.fillStyle = terreno.variazione
        ctx.beginPath()
        ctx.arc(
          punto.x + lato / 2 + macchiaX[indice] * forma.scarto_massimo * lato,
          punto.y + lato / 2 + macchiaY[indice] * forma.scarto_massimo * lato,
          raggio,
          0,
          Math.PI * 2
        )
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
  }

  // la riva: una linea chiara dove la sabbia tocca l'acqua. E' questa che fa
  // leggere l'isola come un'isola invece che come una macchia
  ctx.strokeStyle = stile.riva.colore
  ctx.lineWidth = stile.riva.spessore
  ctx.beginPath()
  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      if (fondo[indiceDi(tx, ty)] === 'acqua') {
        continue
      }
      camera.versoSchermo(tx * tessera, ty * tessera, punto)
      const lato2 = tessera * camera.stato.zoom
      if (ty > 0 && fondo[indiceDi(tx, ty - 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y)
        ctx.lineTo(punto.x + lato2, punto.y)
      }
      if (ty < filari - 1 && fondo[indiceDi(tx, ty + 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y + lato2)
        ctx.lineTo(punto.x + lato2, punto.y + lato2)
      }
      if (tx > 0 && fondo[indiceDi(tx - 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y)
        ctx.lineTo(punto.x, punto.y + lato2)
      }
      if (tx < colonne - 1 && fondo[indiceDi(tx + 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x + lato2, punto.y)
        ctx.lineTo(punto.x + lato2, punto.y + lato2)
      }
    }
  }
  ctx.stroke()
}

function disegnaRisorse(ctx, camera) {
  const stile = grafica.risorsa
  const zoom = camera.stato.zoom
  const lato = tessera * zoom

  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      const nome = sopra[indiceDi(tx, ty)]
      if (!nome) {
        continue
      }
      const dati = risorse[nome]
      camera.versoSchermo(tx * tessera + tessera / 2, ty * tessera + tessera / 2, punto)

      // un alberello si vede piccolo e smorto, e cresce mentre il tempo passa:
      // si deve capire a colpo d'occhio che c'e' ma non si tocca ancora
      const quantoManca = crescitaMs[indiceDi(tx, ty)]
      const quantoInTutto = crescitaTotaleMs[indiceDi(tx, ty)]
      let raggio = dati.raggio * lato
      if (quantoManca > 0 && quantoInTutto > 0) {
        const cresciuto = 1 - quantoManca / quantoInTutto
        raggio *= stile.germoglio_minimo + (1 - stile.germoglio_minimo) * cresciuto
        ctx.globalAlpha = stile.opacita_germoglio
      }

      // l'ombra sotto: senza, le cose sembrano appiccicate al terreno
      ctx.fillStyle = stile.ombra
      ctx.beginPath()
      ctx.ellipse(
        punto.x,
        punto.y + raggio * stile.scarto_ombra * 4,
        raggio,
        raggio * 0.45,
        0,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // il tronco, per gli alberi e per tutto il resto: e' quello che li fa
      // stare in piedi invece che galleggiare
      const larghezzaTronco = stile.raggio_tronco * lato
      const altezzaTronco = stile.altezza_tronco * lato
      ctx.fillStyle = dati.colore_tronco
      ctx.fillRect(
        punto.x - larghezzaTronco / 2,
        punto.y,
        larghezzaTronco,
        altezzaTronco
      )

      ctx.beginPath()
      if (dati.squadrata) {
        // il casotto e' l'unica cosa costruita da qualcuno: quadrata fra le
        // sagome tonde della natura, si riconosce senza leggere niente
        ctx.rect(punto.x - raggio, punto.y - raggio * 1.1, raggio * 2, raggio * 2)
      } else {
        ctx.arc(punto.x, punto.y - raggio * 0.18, raggio, 0, Math.PI * 2)
      }
      ctx.fillStyle = dati.colore_chioma
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle = dati.colore
      ctx.stroke()
      ctx.globalAlpha = 1
    }
  }
}

// Il segno su quello a cui hai dato un ordine. Giallo se aspetta, verde se
// qualcuno ci sta gia' andando: e' l'unico modo per sapere se il comando e'
// stato raccolto senza cercare chi si sta muovendo. Vale per tutti gli ordini
// allo stesso modo — raccogliere, piantare, posare in una cassa.
function disegnaOrdini(ctx, camera, lavori) {
  const stile = grafica.ordine
  const zoom = camera.stato.zoom
  const raggio = stile.raggio * tessera * zoom

  ctx.lineWidth = stile.spessore
  ctx.setLineDash([stile.tratteggio, stile.tratteggio])
  for (let i = 0; i < lavori.coda.length; i++) {
    const lavoro = lavori.coda[i]
    if (!lavoro.attivo) {
      continue
    }
    camera.versoSchermo(
      lavoro.tx * tessera + tessera / 2,
      lavoro.ty * tessera + tessera / 2,
      punto
    )
    ctx.strokeStyle = lavoro.preso ? stile.colore_preso : stile.colore
    ctx.beginPath()
    ctx.arc(punto.x, punto.y, raggio, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.setLineDash([])
}

// Le casse. Quadrate, con la barra del pieno: una cassa piena e' il motivo
// per cui un bracciante si ferma, quindi si deve vedere da lontano.
function disegnaCasse(ctx, camera, casse) {
  const stile = grafica.cassa
  const zoom = camera.stato.zoom
  const lato = tessera * zoom

  for (let i = 0; i < casse.length; i++) {
    const cassa = casse[i]
    // il casotto e' gia' disegnato come risorsa sulla mappa
    if (cassa.eIlCasotto) {
      continue
    }
    camera.versoSchermo(
      cassa.tx * tessera + tessera / 2,
      cassa.ty * tessera + tessera / 2,
      punto
    )
    const raggio = stile.raggio * lato

    ctx.fillStyle = stile.ombra
    ctx.beginPath()
    ctx.ellipse(punto.x, punto.y + raggio, raggio, raggio * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = aspettoCassa.colore
    ctx.fillRect(punto.x - raggio, punto.y - raggio, raggio * 2, raggio * 2)
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = aspettoCassa.colore_bordo
    ctx.strokeRect(punto.x - raggio, punto.y - raggio, raggio * 2, raggio * 2)

    // quanto e' piena
    const barra = stile.barra
    const quota = cassa.slot > 0 ? cassa.inventario.occupati() / cassa.slot : 0
    const larghezza = raggio * 2 - barra.margine * lato
    const altezza = barra.altezza * lato
    const sinistra = punto.x - larghezza / 2
    const alto = punto.y + raggio - altezza - barra.margine * lato * 0.4
    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, larghezza, altezza)
    ctx.fillStyle = aspettoCassa.colore_pieno
    ctx.fillRect(sinistra, alto, larghezza * quota, altezza)
  }
}

// L'anello attorno a quello che hai scelto, e il filo verso la cassa dove quel
// bracciante scarica: senza il filo non si potrebbe sapere dove va senza
// stargli dietro.
function disegnaScelta(ctx, camera, squadra, casse, braccianteScelto, cassaScelta) {
  const stile = grafica.scelta
  const zoom = camera.stato.zoom

  if (braccianteScelto >= 0 && braccianteScelto < squadra.length) {
    const b = squadra[braccianteScelto]
    camera.versoSchermo(b.x, b.y, punto)
    const cx = punto.x
    const cy = punto.y

    ctx.strokeStyle = stile.colore
    ctx.lineWidth = stile.spessore
    ctx.beginPath()
    ctx.arc(cx, cy, grafica.bracciante.raggio * zoom + stile.raggio_extra, 0, Math.PI * 2)
    ctx.stroke()
  }

  if (cassaScelta) {
    camera.versoSchermo(
      cassaScelta.tx * tessera + tessera / 2,
      cassaScelta.ty * tessera + tessera / 2,
      punto
    )
    const raggio = grafica.cassa.raggio * tessera * zoom + stile.raggio_extra
    ctx.strokeStyle = stile.colore
    ctx.lineWidth = stile.spessore
    ctx.strokeRect(punto.x - raggio, punto.y - raggio, raggio * 2, raggio * 2)
  }
}

function disegnaBraccianti(ctx, camera, squadra) {
  const stile = grafica.bracciante
  const zoom = camera.stato.zoom
  const raggio = stile.raggio * zoom

  for (let i = 0; i < squadra.length; i++) {
    const bracciante = squadra[i]
    camera.versoSchermo(bracciante.x, bracciante.y, punto)

    ctx.fillStyle = stile.ombra
    ctx.beginPath()
    ctx.ellipse(punto.x, punto.y + raggio * 0.8, raggio, raggio * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(punto.x, punto.y, raggio, 0, Math.PI * 2)
    ctx.fillStyle = bracciante.colore
    ctx.fill()
    ctx.lineWidth = stile.spessore_bordo
    ctx.strokeStyle = bracciante.coloreBordo
    ctx.stroke()

    // il pallino di chi porta qualcosa: si vede a colpo d'occhio chi sta
    // tornando carico invece di andare a lavorare
    if (bracciante.inventario.stato.pezzi > 0) {
      const segno = grafica.carico
      const addosso = bracciante.inventario.primoMateriale()
      let colore = ''
      for (let m = 0; m < elencoMateriali.length && !colore; m++) {
        if (elencoMateriali[m].id === addosso) {
          colore = elencoMateriali[m].colore
        }
      }
      ctx.beginPath()
      ctx.arc(
        punto.x,
        punto.y - raggio - segno.distanza_sopra * zoom,
        segno.raggio * zoom,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = colore
      ctx.fill()
      ctx.lineWidth = segno.spessore_bordo
      ctx.strokeStyle = segno.colore_bordo
      ctx.stroke()
    }

    // la barra del lavoro: senza, un bracciante che lavora sembra impallato
    if (bracciante.stato !== 'lavora' || bracciante.lavoroTotaleMs <= 0) {
      continue
    }
    const barra = stile.barra
    const larghezza = barra.larghezza * zoom
    const altezza = barra.altezza * zoom
    const sinistra = punto.x - larghezza / 2
    const alto = punto.y - raggio - barra.distanza_sopra * zoom

    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, larghezza, altezza)
    ctx.fillStyle = barra.colore_pieno
    ctx.fillRect(
      sinistra,
      alto,
      (larghezza * bracciante.lavoroMs) / bracciante.lavoroTotaleMs,
      altezza
    )
    ctx.lineWidth = barra.spessore_bordo
    ctx.strokeStyle = barra.colore_bordo
    ctx.strokeRect(sinistra, alto, larghezza, altezza)
  }
}

// Dove finira' quello che hai in mano. Si disegna **solo mentre il dito e'
// premuto**, ed e' l'unica volta in cui una tessera si vede: la' la griglia
// DEVE vedersi, perche' stai piazzando e devi sapere dove va a finire.
function disegnaMira(ctx, camera, mira) {
  if (!mira || !mira.attiva) {
    return
  }
  const stile = grafica.mano
  const lato = tessera * camera.stato.zoom
  const margine = lato * stile.margine
  camera.versoSchermo(mira.tx * tessera, mira.ty * tessera, punto)

  const colore = mira.valida ? stile.colore_buono : stile.colore_cattivo
  ctx.beginPath()
  ctx.roundRect(
    punto.x + margine,
    punto.y + margine,
    lato - margine * 2,
    lato - margine * 2,
    stile.raggio_angoli
  )
  ctx.globalAlpha = stile.opacita_riempimento
  ctx.fillStyle = colore
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.strokeStyle = colore
  ctx.lineWidth = stile.spessore
  ctx.stroke()
}

export function disegnaIsola(
  ctx,
  camera,
  lavori,
  squadra,
  casse,
  braccianteScelto,
  cassaScelta,
  mira
) {
  camera.tessereVisibili(vista)
  disegnaFuori(ctx)
  disegnaTerreno(ctx, camera)
  // la mira sta sotto alle cose: e' un segno sul terreno, non un'etichetta
  disegnaMira(ctx, camera, mira)
  disegnaRisorse(ctx, camera)
  disegnaCasse(ctx, camera, casse)
  // gli anelli vanno SOPRA alle cose, e piu' larghi di loro: sotto finivano
  // coperti dalla chioma dell'albero e l'ordine sembrava non essere partito
  disegnaOrdini(ctx, camera, lavori)
  disegnaScelta(ctx, camera, squadra, casse, braccianteScelto, cassaScelta)
  disegnaBraccianti(ctx, camera, squadra)
}

export { risorsaIn }
