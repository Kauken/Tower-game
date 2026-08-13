// Il disegno dell'isola, attraverso la telecamera.
//
// Si disegnano **solo le tessere visibili**, non tutta l'isola. Qui dentro non
// si alloca niente: niente stringhe composte, niente measureText, niente
// oggetti nuovi. Gli scratch stanno qui sopra e vengono riusati.

import {
  area,
  elencoMateriali,
  grafica,
  operaio as aspettoOperaio,
  risorse,
  terreni,
  tessera,
  trovaCostruzione
} from './config.js'

// i colori della cassa si leggono una volta sola: dentro il ciclo di gioco
// non si cerca niente in configurazione
const aspettoCassa = trovaCostruzione('cassa')
import { disegnaSagoma, preparaSagome } from './sagome.js'
import {
  colonne,
  filari,
  fondo,
  indiceDi,
  macchia,
  macchiaR,
  macchiaX,
  macchiaY,
  ciuffoX,
  ciuffoY,
  crescitaMs,
  crescitaTotaleMs,
  risorsaIn,
  sopra
} from './mondo.js'

const vista = { da_x: 0, a_x: 0, da_y: 0, a_y: 0 }
const punto = { x: 0, y: 0 }

// Il tempo che scorre, in secondi, solo per le animazioni. Non e' il tempo
// della simulazione: quello ha il suo passo fisso e non deve dipendere da
// quanti fotogrammi fa lo schermo.
let orologio = 0

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

  // I ciuffi d'erba. Non si vedono uno per uno: servono a togliere la
  // sensazione di tinta piatta, che e' la cosa che fa sembrare un gioco non
  // finito. Le posizioni sono gia' calcolate all'avvio.
  const ciuffi = stile.ciuffi
  ctx.strokeStyle = ciuffi.colore
  ctx.lineWidth = ciuffi.spessore
  ctx.lineCap = 'round'
  ctx.globalAlpha = ciuffi.opacita
  ctx.beginPath()
  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      const indice = indiceDi(tx, ty)
      if (fondo[indice] !== 'erba' || sopra[indice]) {
        continue
      }
      camera.versoSchermo(tx * tessera, ty * tessera, punto)
      for (let c = 0; c < ciuffi.quanti_per_tessera; c++) {
        const x = punto.x + ciuffoX[indice * ciuffi.quanti_per_tessera + c] * lato
        const y = punto.y + ciuffoY[indice * ciuffi.quanti_per_tessera + c] * lato
        ctx.moveTo(x, y)
        ctx.lineTo(x, y - ciuffi.altezza * lato)
      }
    }
  }
  ctx.stroke()
  ctx.globalAlpha = 1

  // Il bassofondo: una fascia piu' chiara **dentro** l'acqua, dove tocca la
  // terra. Insieme alla schiuma e' quello che fa leggere l'isola come
  // un'isola invece che come una macchia verde su fondo blu.
  ctx.strokeStyle = stile.riva.colore_bassofondo
  ctx.lineWidth = stile.riva.larghezza_bassofondo * tessera * camera.stato.zoom
  ctx.lineCap = 'butt'
  ctx.beginPath()
  bordiRiva(ctx, camera, 0.5)
  ctx.stroke()

  // la schiuma: la linea chiara sul bordo esatto
  ctx.strokeStyle = stile.riva.colore
  ctx.lineWidth = stile.riva.spessore
  ctx.globalAlpha = stile.riva.opacita_schiuma
  ctx.beginPath()
  bordiRiva(ctx, camera, 0)
  ctx.stroke()
  ctx.globalAlpha = 1
}

// I bordi fra terra e acqua, una volta sola: li usano sia il bassofondo sia la
// schiuma, con spessori diversi.
function bordiRiva(ctx, camera, scarto) {
  const lato = tessera * camera.stato.zoom
  const d = lato * scarto
  for (let ty = vista.da_y; ty <= vista.a_y; ty++) {
    for (let tx = vista.da_x; tx <= vista.a_x; tx++) {
      if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
        continue
      }
      if (fondo[indiceDi(tx, ty)] === 'acqua') {
        continue
      }
      camera.versoSchermo(tx * tessera, ty * tessera, punto)
      if (ty > 0 && fondo[indiceDi(tx, ty - 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y - d)
        ctx.lineTo(punto.x + lato, punto.y - d)
      }
      if (ty < filari - 1 && fondo[indiceDi(tx, ty + 1)] === 'acqua') {
        ctx.moveTo(punto.x, punto.y + lato + d)
        ctx.lineTo(punto.x + lato, punto.y + lato + d)
      }
      if (tx > 0 && fondo[indiceDi(tx - 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x - d, punto.y)
        ctx.lineTo(punto.x - d, punto.y + lato)
      }
      if (tx < colonne - 1 && fondo[indiceDi(tx + 1, ty)] === 'acqua') {
        ctx.moveTo(punto.x + lato + d, punto.y)
        ctx.lineTo(punto.x + lato + d, punto.y + lato)
      }
    }
  }
}

// L'ombra: **tutte le cose la fanno nella stessa direzione**. E' la cosa piu'
// economica che esista per dare profondita' a un disegno piatto.
function disegnaOmbra(ctx, x, y, raggio) {
  const stile = grafica.ombra
  ctx.fillStyle = stile.colore
  ctx.beginPath()
  ctx.ellipse(
    x + raggio * stile.scarto_x,
    y + raggio * stile.scarto_y,
    raggio,
    raggio * stile.schiacciamento,
    0,
    0,
    Math.PI * 2
  )
  ctx.fill()
}

// Le vene si **fondono**: la tessera si riempie tutta e non c'e' nessun bordo
// fra due tessere della stessa vena. Sei tessere squadrate una accanto
// all'altra si leggono come una scacchiera, ed e' esattamente la cosa che
// l'autore ha rifiutato. Il bordo si disegna **solo dove la vena finisce**, e
// una macchia tonda sfalsata rompe la squadratura di quello che resta.
//
// I puntini dicono la ricchezza: due o tre. Senza numeri, senza testo — e' il
// modo per far vedere che due vene identiche non rendono uguale.
function stessaVena(tx, ty, nome) {
  if (tx < 0 || ty < 0 || tx >= colonne || ty >= filari) {
    return false
  }
  return sopra[indiceDi(tx, ty)] === nome
}

function disegnaGiacimento(ctx, camera, tx, ty, nome, dati, lato) {
  const stile = grafica.giacimento
  camera.versoSchermo(tx * tessera, ty * tessera, punto)
  const x = punto.x
  const y = punto.y

  // il fondo riempie tutta la tessera, e sborda di un pixel: senza, fra due
  // tessere vicine resterebbe una cucitura chiara che disegna la griglia
  ctx.fillStyle = dati.colore
  ctx.fillRect(x, y, lato + 1, lato + 1)

  // una macchia tonda sfalsata, come per il terreno: rompe la squadratura.
  // Gli scarti sono gia' calcolati all'avvio, uguali per tutta l'isola: dentro
  // il disegno non si fa rumore a ogni fotogramma.
  const indice = indiceDi(tx, ty)
  ctx.globalAlpha = stile.opacita_macchia
  ctx.fillStyle = dati.colore_tronco
  ctx.beginPath()
  ctx.arc(
    x + lato * (0.5 + macchiaX[indice] * stile.scarto_macchia),
    y + lato * (0.5 + macchiaY[indice] * stile.scarto_macchia),
    lato * stile.raggio_macchia * (0.75 + macchiaR[indice] * 0.35),
    0,
    Math.PI * 2
  )
  ctx.fill()
  ctx.globalAlpha = 1

  // il bordo SOLO dove la vena finisce
  ctx.strokeStyle = dati.colore_chioma
  ctx.lineWidth = stile.spessore_bordo
  ctx.beginPath()
  if (!stessaVena(tx, ty - 1, nome)) {
    ctx.moveTo(x, y)
    ctx.lineTo(x + lato, y)
  }
  if (!stessaVena(tx, ty + 1, nome)) {
    ctx.moveTo(x, y + lato)
    ctx.lineTo(x + lato, y + lato)
  }
  if (!stessaVena(tx - 1, ty, nome)) {
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + lato)
  }
  if (!stessaVena(tx + 1, ty, nome)) {
    ctx.moveTo(x + lato, y)
    ctx.lineTo(x + lato, y + lato)
  }
  ctx.stroke()

  // i puntini del materiale: quanti sono, tanto rende
  const quanti = Math.max(2, Math.round(dati.ricchezza) + 1)
  const passo = stile.distanza_puntini * lato
  ctx.fillStyle = dati.colore_chioma
  for (let i = 0; i < quanti; i++) {
    ctx.beginPath()
    ctx.arc(
      x + lato / 2 + (i - (quanti - 1) / 2) * passo,
      y + lato / 2 + (i % 2 === 0 ? -passo * 0.4 : passo * 0.4),
      stile.raggio_puntino * lato,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }
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

      // Una vena sta **dentro** al terreno, non appoggiata sopra: piatta,
      // squadrata, senza ombra. La differenza si deve vedere da lontano,
      // perche' e' la differenza fra una cosa che finisce e una che non
      // finisce mai.
      if (dati.giacimento) {
        disegnaGiacimento(ctx, camera, tx, ty, nome, dati, lato)
        continue
      }

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

      // La dimensione varia da tessera a tessera: senza, un bosco e' lo
      // stesso timbro ripetuto otto volte e si vede.
      const indice = indiceDi(tx, ty)
      raggio *= 1 + (macchiaR[indice] - 0.5) * stile.variazione_dimensione

      disegnaOmbra(ctx, punto.x, punto.y + raggio * stile.scarto_ombra * 3, raggio)

      // **La sagoma e' gia' disegnata**: qui si copia e basta. E' l'operazione
      // piu' veloce che una tela sappia fare, ed e' il motivo per cui ogni
      // albero puo' permettersi cinque gruppi di foglie e un tronco in ombra.
      // La variante viene dal rumore della tessera, quindi e' sempre la stessa.
      disegnaSagoma(
        ctx,
        nome,
        macchia[indice] + (indice % grafica.sagome.varianti),
        punto.x,
        punto.y,
        raggio * 2 * grafica.sagome.ingrandimento
      )
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
  const lato = tessera * camera.stato.zoom
  const raggio = stile.raggio * lato

  ctx.lineWidth = stile.spessore
  ctx.setLineDash([stile.tratteggio, stile.tratteggio])
  for (let i = 0; i < lavori.coda.length; i++) {
    const lavoro = lavori.coda[i]
    if (!lavoro.attivo) {
      continue
    }
    // un ordine gia' disegnato su questa tessera basta: al casotto ce ne sono
    // sempre tanti sopra allo stesso posto, e ridisegnare l'anello dieci volte
    // lo fa solo sembrare piu' spesso
    let primo = true
    for (let c = 0; c < i && primo; c++) {
      if (lavori.coda[c].attivo && lavori.coda[c].tx === lavoro.tx && lavori.coda[c].ty === lavoro.ty) {
        primo = false
      }
    }
    if (!primo) {
      continue
    }
    camera.versoSchermo(lavoro.tx * tessera + tessera / 2, lavoro.ty * tessera + tessera / 2, punto)
    ctx.strokeStyle = lavoro.preso ? stile.colore_preso : stile.colore
    ctx.beginPath()
    ctx.arc(punto.x, punto.y, raggio, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.setLineDash([])

  // **Quanti ordini ci sono su quella tessera.** Al casotto se ne accumulano
  // sempre — li' si fabbrica — e senza il numero tre ordini di tavole e uno
  // solo sono lo stesso identico anello.
  const conta = stile.conteggio
  ctx.font = 'bold ' + conta.dimensione * camera.stato.zoom + 'px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < lavori.coda.length; i++) {
    const lavoro = lavori.coda[i]
    if (!lavoro.attivo) {
      continue
    }
    let quanti = 0
    let primo = true
    for (let c = 0; c < lavori.coda.length; c++) {
      const altro = lavori.coda[c]
      if (!altro.attivo || altro.tx !== lavoro.tx || altro.ty !== lavoro.ty) {
        continue
      }
      quanti++
      if (c < i) {
        primo = false
      }
    }
    if (!primo || quanti < 2) {
      continue
    }
    camera.versoSchermo(lavoro.tx * tessera + tessera / 2, lavoro.ty * tessera + tessera / 2, punto)
    const x = punto.x + raggio * conta.scarto_x * 2
    const y = punto.y + raggio * conta.scarto_y * 2
    ctx.fillStyle = conta.colore_sfondo
    ctx.beginPath()
    ctx.arc(x, y, conta.raggio_pastiglia * camera.stato.zoom, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = conta.colore
    ctx.fillText(String(quanti), x, y)
  }
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
}

function disegnaCasse(ctx, camera, casse) {
  const stile = grafica.cassa
  const lato = tessera * camera.stato.zoom

  for (let i = 0; i < casse.length; i++) {
    const cassa = casse[i]
    // il casotto e' gia' disegnato come risorsa sulla mappa
    if (cassa.eIlCasotto) {
      continue
    }
    camera.versoSchermo(cassa.tx * tessera + tessera / 2, cassa.ty * tessera + tessera / 2, punto)
    const raggio = stile.raggio * lato

    disegnaOmbra(ctx, punto.x, punto.y + raggio * 0.5, raggio)
    disegnaSagoma(ctx, 'cassa', 0, punto.x, punto.y, raggio * 2 * grafica.sagome.ingrandimento)

    // la barra del pieno: una cassa piena e' il motivo per cui l'operaio si
    // ferma, e si deve vedere da lontano senza aprirla
    const barra = stile.barra
    const quota = cassa.slot > 0 ? cassa.inventario.occupati() / cassa.slot : 0
    if (quota <= 0) {
      continue
    }
    const larghezza = raggio * 1.6
    const altezza = barra.altezza * lato
    const sinistra = punto.x - larghezza / 2
    const alto = punto.y + raggio * 0.95
    ctx.fillStyle = barra.colore_fondo
    ctx.fillRect(sinistra, alto, larghezza, altezza)
    ctx.fillStyle = aspettoCassa.colore_pieno
    ctx.fillRect(sinistra, alto, larghezza * quota, altezza)
  }
}

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

    // **Si muove anche quando sta fermo a lavorare.** Guardarlo lavorare e'
    // meta' del gioco, e un cerchio immobile con una barra sopra non lo e':
    // camminando dondola, lavorando da' i colpi.
    const dondolio = stile.dondolio
    let salto = 0
    let scarto = 0
    if (bracciante.stato === 'va') {
      salto = -Math.abs(Math.sin(orologio * dondolio.passo_velocita)) * dondolio.passo_ampiezza * zoom
    } else if (bracciante.stato === 'lavora') {
      const colpo = Math.sin(orologio * dondolio.colpo_velocita)
      scarto = colpo * dondolio.colpo_ampiezza * zoom
      salto = -Math.abs(colpo) * dondolio.colpo_ampiezza * 0.4 * zoom
    }
    const cx = punto.x + scarto
    const cy = punto.y + salto

    // l'ombra resta a terra: e' quella che fa vedere che sta saltellando
    ctx.fillStyle = stile.ombra
    ctx.beginPath()
    ctx.ellipse(punto.x, punto.y + raggio * 0.8, raggio, raggio * 0.4, 0, 0, Math.PI * 2)
    ctx.fill()

    disegnaSagoma(ctx, 'operaio', 0, cx, cy, raggio * 2 * grafica.sagome.ingrandimento)

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
        cx,
        cy - raggio - segno.distanza_sopra * zoom,
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
  orologio = performance.now() / 1000
  preparaSagome(risorse, aspettoCassa, aspettoOperaio)
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
