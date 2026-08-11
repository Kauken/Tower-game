// La telecamera.
//
// Il giocatore non ha un personaggio: **guarda l'isola dall'alto e la sposta
// col dito.** Un pulsante allontana la vista per guardare tutto insieme.
//
// Due livelli di zoom soltanto, non una zoomata continua col pizzico: su uno
// schermo stretto la zoomata continua si perde subito, e col pollice solo non
// si fa. Uno per lavorare, uno per guardare.

import { area, telecamera, tessera } from './config.js'
import { altezzaMondo, larghezzaMondo } from './mondo.js'

export function creaCamera() {
  // dove guarda, in coordinate del mondo (il centro dello schermo)
  const stato = {
    x: larghezzaMondo / 2,
    y: altezzaMondo / 2,
    livello: 0,
    zoom: telecamera.zoom[0]
  }

  const margine = telecamera.margine_tessere * tessera

  // Non si esce dall'isola: se il mondo ci sta tutto, si resta centrati.
  function trattieni() {
    const mezzaLarghezza = area.larghezza / 2 / stato.zoom
    const mezzaAltezza = area.altezza / 2 / stato.zoom

    if (larghezzaMondo + margine * 2 <= mezzaLarghezza * 2) {
      stato.x = larghezzaMondo / 2
    } else {
      stato.x = Math.min(
        Math.max(stato.x, mezzaLarghezza - margine),
        larghezzaMondo + margine - mezzaLarghezza
      )
    }

    if (altezzaMondo + margine * 2 <= mezzaAltezza * 2) {
      stato.y = altezzaMondo / 2
    } else {
      stato.y = Math.min(
        Math.max(stato.y, mezzaAltezza - margine),
        altezzaMondo + margine - mezzaAltezza
      )
    }
  }

  // Il dito trascina il mondo, non la telecamera: si sposta al contrario, ed
  // e' il verso che tutti si aspettano da una mappa.
  function trascina(dxSchermo, dySchermo) {
    stato.x -= dxSchermo / stato.zoom
    stato.y -= dySchermo / stato.zoom
    trattieni()
  }

  function cambiaZoom() {
    stato.livello = (stato.livello + 1) % telecamera.zoom.length
    stato.zoom = telecamera.zoom[stato.livello]
    trattieni()
  }

  function guarda(x, y) {
    stato.x = x
    stato.y = y
    trattieni()
  }

  // Da coordinate del mondo a pixel logici dello schermo.
  function versoSchermo(x, y, esito) {
    esito.x = (x - stato.x) * stato.zoom + area.larghezza / 2
    esito.y = (y - stato.y) * stato.zoom + area.altezza / 2
  }

  // Da pixel logici dello schermo a coordinate del mondo: serve al tocco.
  function versoMondo(x, y, esito) {
    esito.x = (x - area.larghezza / 2) / stato.zoom + stato.x
    esito.y = (y - area.altezza / 2) / stato.zoom + stato.y
  }

  // Quali tessere sono visibili adesso: si disegnano solo quelle, non tutta
  // l'isola. Scrive dentro `esito` invece di restituire un oggetto nuovo.
  function tessereVisibili(esito) {
    const mezzaLarghezza = area.larghezza / 2 / stato.zoom
    const mezzaAltezza = area.altezza / 2 / stato.zoom
    esito.da_x = Math.floor((stato.x - mezzaLarghezza) / tessera) - 1
    esito.a_x = Math.ceil((stato.x + mezzaLarghezza) / tessera) + 1
    esito.da_y = Math.floor((stato.y - mezzaAltezza) / tessera) - 1
    esito.a_y = Math.ceil((stato.y + mezzaAltezza) / tessera) + 1
  }

  trattieni()

  return { stato, trascina, cambiaZoom, guarda, versoSchermo, versoMondo, tessereVisibili }
}
