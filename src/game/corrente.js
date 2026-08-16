// La corrente: **pali che coprono un'area, niente cavi.**
//
// Un generatore brucia combustibile e alimenta tutto quello che sta nel suo
// raggio; i pali allungano la copertura e **si agganciano da soli** per
// vicinanza. Non si traccia nessun filo: su un telefono tirare fili col dito
// sarebbe un supplizio, e la parte interessante della corrente non sono i fili
// — e' la domanda **"come faccio ad arrivare fin laggiu'?"**, che con i pali
// resta tutta.
//
// COSA TOGLIE DALLA TESTA, ed e' l'unica ragione per cui esiste
//
//   *"devo riempire ogni macchina, una per una."*
//
// Una macchina coperta **non brucia piu' il suo combustibile**: lo brucia il
// generatore, in un posto solo. Il legno che porti alla segheria adesso
// diventa tutto tavole.
//
// QUATTRO VINCOLI, E SONO VINCOLI — NON PREFERENZE
//
// 1. **Non esiste il blackout totale.** Un generatore a secco ferma solo
//    quello che copre lui. Non c'e' nessun interruttore unico.
// 2. **Avvisa prima di fermarsi.** Entra in riserva mentre lavora ancora, con
//    abbastanza anticipo per fare qualcosa. Fermarsi di sorpresa e' la parte
//    che fa smettere; fermarsi dopo un avviso ignorato e' una decisione tua.
// 3. **Non serve riaccendere niente.** Rimetti il legno e riparte da solo.
// 4. **La mancanza di corrente costa produzione, mai lavoro perso.** Una
//    macchina che resta scoperta **torna a bruciare il suo**: non si ferma, e
//    non si rompe niente. Una macchina che funzionava e da un giorno all'altro
//    non funziona piu' e' una promessa rotta.
//
// Esiste una discussione, con quel titolo esatto, intitolata *"il sistema
// della corrente mi ha fatto smettere di giocare"*, e il motivo era il
// fusibile che spegne tutto insieme. Da li' vengono i quattro vincoli.

import { trovaCostruzione } from './config.js'
import { creaInventario } from './inventario.js'

export const ALIMENTA = 'alimenta'
export const RISERVA = 'riserva'
export const SECCO = 'secco'

export function creaCorrente() {
  const generatori = []
  const pali = []

  // La rete si ricalcola solo quando cambia qualcosa — un pezzo piazzato,
  // oppure un generatore che finisce o ritrova il combustibile. Dentro il
  // ciclo di gioco non si rifa' a ogni passo.
  let daRicalcolare = true

  function segnaCambiata() {
    daRicalcolare = true
  }

  function aggiungiGeneratore(tx, ty, idCostruzione) {
    const dati = trovaCostruzione(idCostruzione)
    const g = {
      tx,
      ty,
      id: idCostruzione,
      nome: dati.nome,
      combustibile: dati.combustibile,
      raggio: dati.raggio_corrente,
      msPerPezzo: dati.ms_per_combustibile,
      avvisoMs: dati.avviso_ms,
      slot: dati.slot,
      inventario: creaInventario(dati.slot, dati.slot),
      // lavoro gia' fatto e non ancora pagato con un pezzo di combustibile
      lavoroMs: 0,
      acceso: false,
      stato: SECCO,
      // quante macchine sta alimentando adesso: si legge nel pannello, e
      // serve a capire se il generatore e' messo nel posto giusto
      quanteMacchine: 0,
      // gira da 0 a 1 e ricomincia: serve solo al disegno del volano
      giro: 0
    }
    generatori.push(g)
    segnaCambiata()
    return g
  }

  function aggiungiPalo(tx, ty, idCostruzione) {
    const dati = trovaCostruzione(idCostruzione)
    const p = {
      tx,
      ty,
      id: idCostruzione,
      nome: dati.nome,
      raggio: dati.raggio_corrente,
      // a quale generatore e' attaccato, -1 se non arriva la corrente
      rete: -1
    }
    pali.push(p)
    segnaCambiata()
    return p
  }

  function generatoreIn(tx, ty) {
    for (let i = 0; i < generatori.length; i++) {
      if (generatori[i].tx === tx && generatori[i].ty === ty) {
        return generatori[i]
      }
    }
    return null
  }

  function paloIn(tx, ty) {
    for (let i = 0; i < pali.length; i++) {
      if (pali[i].tx === tx && pali[i].ty === ty) {
        return pali[i]
      }
    }
    return null
  }

  function in_(tx, ty) {
    return generatoreIn(tx, ty) || paloIn(tx, ty)
  }

  // Distanza in tessere, al quadrato: la radice non serve a niente se dopo si
  // confronta con un raggio, e dentro il ciclo di gioco ogni radice si paga.
  function dentroIlRaggio(ax, ay, bx, by, raggio) {
    const dx = ax - bx
    const dy = ay - by
    return dx * dx + dy * dy <= raggio * raggio
  }

  // **La rete si costruisce da sola.** Ogni generatore acceso accende i pali
  // che ha nel raggio; ogni palo acceso ne accende altri, finche' non se ne
  // accende piu' nessuno. Poi le macchine si attaccano al primo nodo acceso
  // che le copre. Nessun filo, nessun collegamento da fare a mano.
  function ricalcola(macchine) {
    daRicalcolare = false

    for (let i = 0; i < pali.length; i++) {
      pali[i].rete = -1
    }
    for (let i = 0; i < macchine.length; i++) {
      macchine[i].alimentata = false
      macchine[i].rete = -1
    }

    for (let gi = 0; gi < generatori.length; gi++) {
      const g = generatori[gi]
      if (!g.acceso) {
        continue
      }
      let cambiato = true
      while (cambiato) {
        cambiato = false
        for (let i = 0; i < pali.length; i++) {
          const p = pali[i]
          if (p.rete >= 0) {
            continue
          }
          if (dentroIlRaggio(p.tx, p.ty, g.tx, g.ty, g.raggio)) {
            p.rete = gi
            cambiato = true
            continue
          }
          for (let q = 0; q < pali.length; q++) {
            const altro = pali[q]
            if (altro.rete !== gi) {
              continue
            }
            if (dentroIlRaggio(p.tx, p.ty, altro.tx, altro.ty, altro.raggio)) {
              p.rete = gi
              cambiato = true
              break
            }
          }
        }
      }
    }

    for (let gi = 0; gi < generatori.length; gi++) {
      generatori[gi].quanteMacchine = 0
    }

    for (let i = 0; i < macchine.length; i++) {
      const m = macchine[i]
      for (let gi = 0; gi < generatori.length && m.rete < 0; gi++) {
        const g = generatori[gi]
        if (g.acceso && dentroIlRaggio(m.tx, m.ty, g.tx, g.ty, g.raggio)) {
          m.rete = gi
        }
      }
      for (let p = 0; p < pali.length && m.rete < 0; p++) {
        const palo = pali[p]
        if (palo.rete >= 0 && dentroIlRaggio(m.tx, m.ty, palo.tx, palo.ty, palo.raggio)) {
          m.rete = palo.rete
        }
      }
      m.alimentata = m.rete >= 0
      if (m.alimentata) {
        generatori[m.rete].quanteMacchine++
      }
    }
  }

  // Quanto lavoro puo' ancora pagare, in millisecondi di lavoro di una
  // macchina. E' il numero da cui esce l'avviso, ed e' anche quello che si
  // scrive nel pannello: "gli resta da lavorare per...".
  function autonomiaDi(g) {
    return g.inventario.quanti(g.combustibile) * g.msPerPezzo - g.lavoroMs
  }

  // Gira dentro il ciclo di gioco: **niente allocazioni qui dentro.**
  function aggiorna(passoMs, macchine) {
    for (let i = 0; i < generatori.length; i++) {
      const g = generatori[i]
      const acceso = g.inventario.quanti(g.combustibile) > 0
      if (acceso !== g.acceso) {
        g.acceso = acceso
        daRicalcolare = true
      }
    }

    if (daRicalcolare) {
      ricalcola(macchine)
    }

    for (let i = 0; i < generatori.length; i++) {
      const g = generatori[i]

      // Quanto lavoro ha fatto la sua rete in questo passo. **Brucia solo
      // mentre qualcosa lavora**: un generatore acceso su una fabbrica ferma
      // non deve mangiarti il bosco per niente.
      let lavorano = 0
      for (let m = 0; m < macchine.length; m++) {
        if (macchine[m].rete === i && macchine[m].stato === 'lavora') {
          lavorano++
        }
      }
      g.lavoroMs += passoMs * lavorano

      while (g.lavoroMs >= g.msPerPezzo && g.inventario.quanti(g.combustibile) > 0) {
        g.inventario.togli(g.combustibile, 1)
        g.lavoroMs -= g.msPerPezzo
      }
      // **Il serbatoio vuoto non accumula debito.** Se restasse, rimettere il
      // legno lo brucerebbe all'istante e sembrerebbe sparito.
      if (g.inventario.quanti(g.combustibile) <= 0) {
        g.lavoroMs = 0
      }

      const resta = autonomiaDi(g)
      g.stato = resta <= 0 ? SECCO : resta <= g.avvisoMs ? RISERVA : ALIMENTA
      // il volano gira **solo mentre sta davvero dando corrente a qualcosa**:
      // un volano che gira su una rete ferma sarebbe una bugia
      if (g.stato !== SECCO && lavorano > 0) {
        g.giro = (g.giro + passoMs / 1000) % 1
      }
    }
  }

  // Una riga sola per il cruscotto, e **arriva prima che si fermi**: un
  // generatore che si spegne di sorpresa sembra un guasto. Vuota quando non
  // c'e' niente da dire.
  function avviso(macchine) {
    for (let i = 0; i < generatori.length; i++) {
      if (generatori[i].stato === RISERVA) {
        return 'il generatore sta per restare senza ' + generatori[i].combustibile
      }
    }
    for (let i = 0; i < generatori.length; i++) {
      const g = generatori[i]
      if (g.stato !== SECCO) {
        continue
      }
      // un generatore a secco in mezzo al niente non ha niente da dire
      for (let m = 0; m < macchine.length; m++) {
        if (dentroIlRaggio(macchine[m].tx, macchine[m].ty, g.tx, g.ty, g.raggio)) {
          return 'il generatore è a secco: le macchine bruciano il loro ' + g.combustibile
        }
      }
    }
    return ''
  }

  function perSalvare() {
    const fuori = { generatori: [], pali: [] }
    for (let i = 0; i < generatori.length; i++) {
      const g = generatori[i]
      fuori.generatori.push({
        tx: g.tx,
        ty: g.ty,
        id: g.id,
        dentro: g.inventario.perSalvare(),
        lavoro: Math.round(g.lavoroMs)
      })
    }
    for (let i = 0; i < pali.length; i++) {
      fuori.pali.push({ tx: pali[i].tx, ty: pali[i].ty, id: pali[i].id })
    }
    return fuori
  }

  function daSalvato(dati) {
    svuota()
    if (!dati) {
      return
    }
    if (Array.isArray(dati.generatori)) {
      for (let i = 0; i < dati.generatori.length; i++) {
        const voce = dati.generatori[i]
        const g = aggiungiGeneratore(voce.tx, voce.ty, voce.id)
        g.inventario.daSalvato(voce.dentro)
        g.lavoroMs = voce.lavoro || 0
      }
    }
    if (Array.isArray(dati.pali)) {
      for (let i = 0; i < dati.pali.length; i++) {
        aggiungiPalo(dati.pali[i].tx, dati.pali[i].ty, dati.pali[i].id)
      }
    }
    segnaCambiata()
  }

  function svuota() {
    generatori.length = 0
    pali.length = 0
    segnaCambiata()
  }

  return {
    generatori,
    pali,
    aggiungiGeneratore,
    aggiungiPalo,
    generatoreIn,
    paloIn,
    in: in_,
    aggiorna,
    autonomiaDi,
    avviso,
    segnaCambiata,
    perSalvare,
    daSalvato,
    svuota
  }
}
