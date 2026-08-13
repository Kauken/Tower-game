// Il salvataggio.
//
// Su telefono l'interruzione e' la norma, e qui e' peggio che altrove: **non
// ci sono partite, c'e' una sola isola che cresce per settimane.** Perderla
// vuol dire perdere tutto.
//
// Due cose che questo file fa e che sembrano dettagli, ma sono la ragione per
// cui non andra' riscritto quando arriveranno macchine, nastri e isole:
//
// 1. **Si salvano gli `id`, mai le statistiche.** Si salva "trivella", non
//    quanto scava al minuto: altrimenti un ritocco di bilanciamento non
//    arriverebbe mai a un'isola gia' cominciata.
// 2. **Si salva solo quello che il giocatore ha cambiato.** La mappa di
//    partenza sta in isola.json, i moltiplicatori si ricavano dai progetti.
//
// Sta tutto dietro a **un modulo solo**: quando si passera' a Capacitor
// Preferences (su iOS il localStorage puo' essere ripulito dal sistema, e
// ripulirebbe l'unica isola del giocatore) si cambia questo file e basta.

import { salvataggio as regole } from './config.js'

const CHIAVE = 'isola'
const CHIAVE_ROTTO = 'isola_non_letta'

function magazzino() {
  try {
    return window.localStorage
  } catch (errore) {
    return null
  }
}

export function leggi() {
  const posto = magazzino()
  if (!posto) {
    return null
  }
  const grezzo = posto.getItem(CHIAVE)
  if (!grezzo) {
    return null
  }
  let dati = null
  try {
    dati = JSON.parse(grezzo)
  } catch (errore) {
    dati = null
  }

  // Un salvataggio che non si sa leggere **non si cancella mai**: si mette da
  // parte e si riparte puliti. Cosi' il dato non e' perduto per sempre e
  // l'autore puo' segnalarlo.
  if (!dati || dati.versione !== regole.versione_formato) {
    if (grezzo) {
      try {
        posto.setItem(CHIAVE_ROTTO, grezzo)
      } catch (errore) {
        /* se non ci sta, pazienza: meglio ripartire che bloccarsi */
      }
    }
    posto.removeItem(CHIAVE)
    return null
  }
  return dati
}

export function scrivi(dati) {
  const posto = magazzino()
  if (!posto) {
    return false
  }
  dati.versione = regole.versione_formato
  dati.salvatoIl = Date.now()
  try {
    posto.setItem(CHIAVE, JSON.stringify(dati))
    return true
  } catch (errore) {
    return false
  }
}

export function cancella() {
  const posto = magazzino()
  if (posto) {
    posto.removeItem(CHIAVE)
  }
}

// Quanto tempo e' passato da quando hai chiuso, **tagliato al tetto**.
//
// L'operaio si ferma: e' lui la risorsa scarsa, e il suo tempo non puo'
// passare mentre non guardi. Le macchine invece vanno avanti — ed e' la
// ricompensa piu' forte che il gioco possa dare all'automazione: finche' fai
// tutto a mano, chiudere l'app ferma il mondo; quando la fabbrica gira da
// sola, chiudere l'app vuol dire tornare e trovare le casse piene.
//
// Il tetto serve perche' **aspettare non deve mai essere la strategia
// migliore**.
export function tempoPassato(salvatoIl) {
  if (!salvatoIl) {
    return 0
  }
  const passato = Date.now() - salvatoIl
  if (passato <= 0) {
    return 0
  }
  return Math.min(passato, regole.tetto_recupero_ms)
}
