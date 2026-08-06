// Nemici e reclute: due schiere che percorrono lo stesso sentiero in versi
// opposti e si fermano a combattere dove si incontrano.
//
// Funzionano allo stesso modo, quindi c'e' una funzione sola che aggiorna una
// schiera contro l'altra, chiamata due volte con il verso invertito. Il verso
// e' +1 per i nemici (scendono verso il castello) e -1 per le reclute.
//
// Regola importante: chi e' davanti a chi si decide sulla **distanza percorsa
// lungo il sentiero**, mai in linea d'aria. Lo scostamento laterale serve solo
// a non far sovrapporre i disegni: usarlo per gli scontri farebbe mancare due
// file affiancate.

import {
  aspettoNemico,
  aspettoRecluta,
  campo,
  grafica,
  limiti,
  scalaturaNemici,
  trovaNemico,
  trovaRecluta
} from './config.js'
import { creaPool, primoLibero } from './pool.js'
import {
  distanzaMinimaInFila,
  distanzePresidi,
  lunghezzaTotale,
  posizionaSulSentiero
} from './percorso.js'

const stile = grafica.combattente
const scarti = campo.scarti_sentiero

function combattenteVuoto() {
  return {
    attivo: false,
    id: '',
    distanza: 0,
    scarto: 0,
    x: 0,
    y: 0,
    vita: 0,
    vitaMassima: 0,
    velocita: 0,
    danno: 0,
    cadenzaMs: 0,
    ricaricaMs: 0,
    raggioIngaggio: 0,
    riduzioneDanno: 0,
    dimensione: 0,
    dannoCastello: 0,
    oroRilasciato: 0,
    lampoMs: 0,
    colore: '',
    coloreBordo: ''
  }
}

export function creaGestoreCombattenti({
  allImpatto,
  allaMorte,
  allaComparsa,
  allArrivoAlCastello,
  allOroRaccolto,
  oggetti
}) {
  const nemici = creaPool(limiti.nemici_massimi, combattenteVuoto)
  const reclute = creaPool(limiti.reclute_massime, combattenteVuoto)

  // usati a rotazione, cosi' due che partono insieme non finiscono sovrapposti
  let prossimoScartoNemico = 0
  let prossimoScartoRecluta = 0

  function accendi(combattente, dati, distanza, scarto) {
    combattente.attivo = true
    combattente.id = dati.id
    combattente.distanza = distanza
    combattente.scarto = scarto
    combattente.ricaricaMs = 0
    combattente.lampoMs = 0
    combattente.cadenzaMs = dati.cadenza_ms
    combattente.velocita = dati.velocita
    combattente.raggioIngaggio = dati.raggio_ingaggio
    combattente.riduzioneDanno = dati.riduzione_danno
    combattente.dimensione = dati.dimensione
    posizionaSulSentiero(distanza, scarto, combattente)
  }

  // I nemici crescono ondata dopo ondata: la scalatura moltiplica i valori di
  // base, non li riscrive. Cosi' un nemico nuovo eredita la curva senza che
  // nessuno debba compilare una tabella ondata per ondata.
  function faiUscireNemico(idNemico, numeroOndata) {
    const posto = primoLibero(nemici)
    if (!posto) {
      return false
    }

    const dati = trovaNemico(idNemico)
    const esponente = numeroOndata - 1
    const aspetto = aspettoNemico(dati.id)

    accendi(posto, dati, 0, scarti[prossimoScartoNemico % scarti.length])
    prossimoScartoNemico++

    posto.vitaMassima = dati.vita * Math.pow(scalaturaNemici.vita_per_ondata, esponente)
    posto.vita = posto.vitaMassima
    posto.danno = dati.danno * Math.pow(scalaturaNemici.danno_per_ondata, esponente)
    posto.oroRilasciato =
      dati.oro_rilasciato * Math.pow(scalaturaNemici.oro_per_ondata, esponente)
    posto.dannoCastello = dati.danno_castello
    posto.colore = aspetto.colore
    posto.coloreBordo = aspetto.colore_bordo

    allaComparsa(posto.x, posto.y)
    return true
  }

  // Si chiede prima di far pagare il giocatore: senza posto per l'intera
  // squadra l'oro sarebbe speso per una squadra a meta'.
  function cePostoPerUnaSquadra(idRecluta) {
    const quanti = trovaRecluta(idRecluta).quantita
    let liberi = 0
    for (let i = 0; i < reclute.length; i++) {
      if (!reclute[i].attivo) {
        liberi++
        if (liberi >= quanti) {
          return true
        }
      }
    }
    return false
  }

  // Gli oggetti raccolti si applicano alla nascita della recluta, non a ogni
  // frame: chi e' gia' in campo resta com'era, chi parte dopo e' piu' forte.
  function accendiUnaRecluta(dati, aspetto) {
    const posto = primoLibero(reclute)
    if (!posto) {
      return
    }
    const categoria = dati.categoria
    accendi(posto, dati, lunghezzaTotale, scarti[prossimoScartoRecluta % scarti.length])
    prossimoScartoRecluta++

    posto.velocita = dati.velocita * oggetti.moltiplicatore(categoria, 'velocita')
    posto.cadenzaMs = dati.cadenza_ms * oggetti.moltiplicatore(categoria, 'cadenza_ms')
    posto.raggioIngaggio =
      dati.raggio_ingaggio * oggetti.moltiplicatore(categoria, 'raggio_ingaggio')
    posto.vitaMassima = dati.vita * oggetti.moltiplicatore(categoria, 'vita')
    posto.vita = posto.vitaMassima
    posto.danno = dati.danno * oggetti.moltiplicatore(categoria, 'danno')
    posto.oroRilasciato = 0
    posto.dannoCastello = 0
    posto.colore = aspetto.colore
    posto.coloreBordo = aspetto.colore_bordo
  }

  // Un acquisto fa partire una squadra intera: e' quello che tiene basso il
  // numero di tocchi senza togliere niente al bilanciamento.
  function faiPartireRecluta(idRecluta) {
    const dati = trovaRecluta(idRecluta)
    const aspetto = aspettoRecluta(dati.id)
    for (let i = 0; i < dati.quantita; i++) {
      accendiUnaRecluta(dati, aspetto)
    }
    return true
  }

  // Quanto e' avanti il nemico piu' avanzato, cioe' quello piu' vicino alla
  // breccia da cui escono. Vale -1 se non c'e' nessun nemico in campo.
  function nemicoPiuAvanzato(avversari) {
    let minima = -1
    for (let i = 0; i < avversari.length; i++) {
      const avversario = avversari[i]
      if (!avversario.attivo) {
        continue
      }
      if (minima < 0 || avversario.distanza < minima) {
        minima = avversario.distanza
      }
    }
    return minima
  }

  function colpisci(attaccante, bersaglio, bersaglioENemico) {
    bersaglio.vita -= attaccante.danno * (1 - bersaglio.riduzioneDanno)
    bersaglio.lampoMs = stile.lampo_colpo_ms
    allImpatto(bersaglio.x, bersaglio.y)

    if (bersaglio.vita > 0) {
      return
    }

    bersaglio.attivo = false
    allaMorte(bersaglio.x, bersaglio.y)
    if (bersaglioENemico) {
      allOroRaccolto(bersaglio.oroRilasciato)
    }
  }

  // `verso` vale +1 se la schiera avanza verso distanze crescenti (i nemici,
  // che vanno al castello) e -1 se le percorre all'indietro (le reclute).
  // Moltiplicando la distanza per il verso si ottiene un "avanzamento" che
  // cresce sempre, e le due schiere si aggiornano con lo stesso codice.
  function aggiornaSchiera(schiera, avversari, verso, passoMs, passoSecondi, avversariNemici) {
    // I nemici possono arrivare fino al castello.
    //
    // Le reclute hanno due comportamenti, ed e' la differenza fra le due cose
    // che da' un senso a dove si fermano:
    //
    // - **con nemici in campo** vanno incontro al piu' avanzato e si fermano
    //   li'. Cosi' il fronte sta dove c'e' la battaglia, avanza quando vinci e
    //   arretra quando perdi. E chi colpisce da lontano resta raggiungibile:
    //   un Balestriere irraggiungibile bloccherebbe l'ondata per sempre.
    //
    // - **a campo libero** ripiegano al presidio piu' avanzato, che e' un
    //   punto segnato sul sentiero. Senza, restavano impalate dove capitava e
    //   il giocatore non capiva cosa stessero facendo.
    let avanzamentoMassimo = lunghezzaTotale
    if (verso < 0) {
      const primoNemico = nemicoPiuAvanzato(avversari)
      avanzamentoMassimo =
        primoNemico < 0 ? -distanzePresidi[0] : -primoNemico
    }

    for (let i = 0; i < schiera.length; i++) {
      const combattente = schiera[i]
      if (!combattente.attivo) {
        continue
      }

      if (combattente.ricaricaMs > 0) {
        combattente.ricaricaMs -= passoMs
      }
      if (combattente.lampoMs > 0) {
        combattente.lampoMs -= passoMs
      }

      // il bersaglio e' l'avversario piu' vicino lungo il sentiero, entro la
      // portata: cosi' la prima fila ingaggia la prima fila
      let bersaglio = null
      let distanzaBersaglio = combattente.raggioIngaggio
      for (let j = 0; j < avversari.length; j++) {
        const avversario = avversari[j]
        if (!avversario.attivo) {
          continue
        }
        const scartoLungoSentiero = Math.abs(avversario.distanza - combattente.distanza)
        if (scartoLungoSentiero <= distanzaBersaglio) {
          distanzaBersaglio = scartoLungoSentiero
          bersaglio = avversario
        }
      }

      // chi combatte non avanza: e' cosi' che la linea del fronte tiene
      if (bersaglio) {
        if (combattente.ricaricaMs <= 0) {
          combattente.ricaricaMs = combattente.cadenzaMs
          colpisci(combattente, bersaglio, avversariNemici)
        }
        continue
      }

      // nessuno davanti: si avanza, ma senza entrare dentro chi ti precede
      let limite = avanzamentoMassimo
      const avanzamento = combattente.distanza * verso
      for (let j = 0; j < schiera.length; j++) {
        const compagno = schiera[j]
        if (compagno === combattente || !compagno.attivo) {
          continue
        }
        // solo chi sta sulla stessa fila mi blocca. Senza questo controllo
        // l'esercito si incolonna tutto dietro al primo, e a combattere e'
        // sempre e solo uno: comprare altre reclute non aggiungerebbe danno,
        // allungherebbe una coda di duelli in sequenza.
        if (compagno.scarto !== combattente.scarto) {
          continue
        }
        const avanzamentoCompagno = compagno.distanza * verso
        if (avanzamentoCompagno <= avanzamento) {
          continue
        }
        const consentito = avanzamentoCompagno - distanzaMinimaInFila
        if (consentito < limite) {
          limite = consentito
        }
      }

      let nuovo = avanzamento + combattente.velocita * passoSecondi
      if (nuovo > limite) {
        nuovo = limite
      }
      if (nuovo < avanzamento) {
        nuovo = avanzamento
      }

      combattente.distanza = nuovo * verso
      posizionaSulSentiero(combattente.distanza, combattente.scarto, combattente)

      // arrivato in fondo: il castello incassa e il nemico sparisce
      if (verso > 0 && combattente.distanza >= lunghezzaTotale) {
        combattente.attivo = false
        allArrivoAlCastello(combattente.dannoCastello, combattente.x, combattente.y)
      }
    }
  }

  function aggiorna(passoMs, passoSecondi) {
    aggiornaSchiera(nemici, reclute, 1, passoMs, passoSecondi, false)
    aggiornaSchiera(reclute, nemici, -1, passoMs, passoSecondi, true)
  }

  function disegnaSchiera(ctx, schiera, quadrati) {
    const barra = stile.barra_vita

    for (let i = 0; i < schiera.length; i++) {
      const combattente = schiera[i]
      if (!combattente.attivo) {
        continue
      }

      const lato = combattente.dimensione
      ctx.fillStyle = combattente.lampoMs > 0 ? stile.colore_lampo : combattente.colore
      ctx.strokeStyle = combattente.coloreBordo
      ctx.lineWidth = stile.spessore_bordo

      // le reclute sono quadrate e i nemici tondi: si distinguono anche da
      // lontano e anche senza affidarsi al solo colore
      ctx.beginPath()
      if (quadrati) {
        ctx.rect(combattente.x - lato, combattente.y - lato, lato * 2, lato * 2)
      } else {
        ctx.arc(combattente.x, combattente.y, lato, 0, Math.PI * 2)
      }
      ctx.fill()
      ctx.stroke()

      // la barra della vita solo se ferito: con tutte piene sarebbe rumore
      if (combattente.vita >= combattente.vitaMassima) {
        continue
      }

      const sinistra = combattente.x - barra.larghezza / 2
      const alto = combattente.y - lato - barra.distanza_sopra
      ctx.fillStyle = barra.colore_fondo
      ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
      ctx.fillStyle = quadrati ? barra.colore_pieno_recluta : barra.colore_pieno_nemico
      ctx.fillRect(
        sinistra,
        alto,
        (barra.larghezza * combattente.vita) / combattente.vitaMassima,
        barra.altezza
      )
      ctx.lineWidth = barra.spessore_bordo
      ctx.strokeStyle = barra.colore_bordo
      ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
    }
  }

  function disegna(ctx) {
    disegnaSchiera(ctx, nemici, false)
    disegnaSchiera(ctx, reclute, true)
  }

  // serve alle ondate per sapere quando il campo e' sgombro
  function nemiciVivi() {
    let quanti = 0
    for (let i = 0; i < nemici.length; i++) {
      if (nemici[i].attivo) {
        quanti++
      }
    }
    return quanti
  }

  function svuota() {
    for (let i = 0; i < nemici.length; i++) {
      nemici[i].attivo = false
    }
    for (let i = 0; i < reclute.length; i++) {
      reclute[i].attivo = false
    }
    prossimoScartoNemico = 0
    prossimoScartoRecluta = 0
  }

  return {
    faiUscireNemico,
    cePostoPerUnaSquadra,
    faiPartireRecluta,
    aggiorna,
    disegna,
    nemiciVivi,
    svuota
  }
}
