// Nemici e reclute.
//
// Le due schiere non fanno piu' la stessa cosa, e la differenza e' il gioco:
//
// - **I nemici non si fermano mai.** Marciano dalla breccia al castello e
//   colpiscono chi trovano lungo la strada senza rallentare. Se sopravvivono
//   arrivano, e il castello lo sente. Prima si fermavano a combattere: bastava
//   un muro di reclute sotto la breccia perche' nessun nemico arrivasse mai
//   piu', e la partita diventava un ingorgo immobile.
//
// - **Le reclute non marciano piu' al fronte: vanno a una postazione.** Ogni
//   postazione ha un numero fisso di posti. Quando sono pieni, li' non ci va
//   piu' nessuno. E' il tetto dei posti che impedisce all'esercito di
//   ammassarsi in un punto solo, e che costringe la difesa a distribuirsi su
//   tutto il sentiero.
//
// - **Le reclute non guariscono.** Ogni ondata che passa le consuma. E' cosi'
//   che l'oro ha sempre dove andare e il castello resta raggiungibile.
//
// Regola importante che resta valida: chi e' davanti a chi si decide sulla
// **distanza percorsa lungo il sentiero**, mai in linea d'aria. Lo scostamento
// laterale serve solo a non far sovrapporre i disegni.

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
  capienzaMassimaPostazione,
  distanzaMinimaInFila,
  lunghezzaTotale,
  posizionaSulSentiero,
  postazioni
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
    dannoBase: 0,
    cadenzaMs: 0,
    ricaricaMs: 0,
    raggioIngaggio: 0,
    riduzioneDanno: 0,
    dimensione: 0,
    dannoCastello: 0,
    oroRilasciato: 0,
    lampoMs: 0,
    colore: '',
    coloreBordo: '',
    // dove sta andando questa recluta e se ci e' gia' arrivata
    postazione: -1,
    slot: -1,
    meta: 0,
    // effetti dinamici degli oggetti, fissati alla nascita
    veteranoPasso: 0,
    veteranoMassimo: 0,
    veteranoAccumulato: 0,
    esplosioneRaggio: 0,
    esplosioneDanno: 0,
    spine: 0,
    rallentaValore: 1,
    rallentaDurataMs: 0,
    // rallentamento subito
    rallentatoMs: 0,
    rallentatoValore: 1
  }
}

export function creaGestoreCombattenti({
  allImpatto,
  allaMorte,
  allaComparsa,
  allEsplosione,
  allArrivoAlCastello,
  allOroRaccolto,
  oggetti
}) {
  const nemici = creaPool(limiti.nemici_massimi, combattenteVuoto)
  const reclute = creaPool(limiti.reclute_massime, combattenteVuoto)

  // usati a rotazione, cosi' due nemici che escono insieme non si sovrappongono
  let prossimoScartoNemico = 0

  // quali posti di una postazione sono gia' occupati. Preallocato: si riempie
  // al momento dell'acquisto, non si crea mai.
  const postiOccupati = new Uint8Array(capienzaMassimaPostazione)

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
    combattente.veteranoPasso = 0
    combattente.veteranoMassimo = 0
    combattente.veteranoAccumulato = 0
    combattente.esplosioneRaggio = 0
    combattente.esplosioneDanno = 0
    combattente.spine = 0
    combattente.rallentaValore = 1
    combattente.rallentaDurataMs = 0
    combattente.rallentatoMs = 0
    combattente.rallentatoValore = 1
    combattente.postazione = -1
    combattente.slot = -1
    combattente.meta = distanza
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
    posto.dannoBase = posto.danno
    posto.oroRilasciato =
      dati.oro_rilasciato * Math.pow(scalaturaNemici.oro_per_ondata, esponente)
    posto.dannoCastello = dati.danno_castello
    posto.colore = aspetto.colore
    posto.coloreBordo = aspetto.colore_bordo

    allaComparsa(posto.x, posto.y)
    return true
  }

  // --- i posti nelle postazioni ---

  function leggiPostiOccupati(indicePostazione) {
    postiOccupati.fill(0)
    for (let i = 0; i < reclute.length; i++) {
      const recluta = reclute[i]
      if (recluta.attivo && recluta.postazione === indicePostazione) {
        postiOccupati[recluta.slot] = 1
      }
    }
  }

  function postiLiberi(indicePostazione) {
    if (indicePostazione < 0 || indicePostazione >= postazioni.length) {
      return 0
    }
    leggiPostiOccupati(indicePostazione)
    let liberi = 0
    for (let i = 0; i < postazioni[indicePostazione].posti; i++) {
      if (!postiOccupati[i]) {
        liberi++
      }
    }
    return liberi
  }

  // Si chiede prima di far pagare il giocatore: senza posto per l'intera
  // squadra l'oro sarebbe speso per una squadra a meta'.
  function cePostoPerUnaSquadra(idRecluta, indicePostazione) {
    return postiLiberi(indicePostazione) >= trovaRecluta(idRecluta).quantita
  }

  // La postazione con piu' posti liberi: e' li' che finiscono i rinforzi
  // gratuiti degli oggetti, cosi' non chiedono un'altra decisione al giocatore.
  function postazionePiuVuota() {
    let migliore = 0
    let liberiMigliore = -1
    for (let i = 0; i < postazioni.length; i++) {
      const liberi = postiLiberi(i)
      if (liberi > liberiMigliore) {
        liberiMigliore = liberi
        migliore = i
      }
    }
    return migliore
  }

  // Gli oggetti raccolti si applicano alla nascita della recluta, non a ogni
  // frame: chi e' gia' in campo resta com'era, chi parte dopo e' piu' forte.
  function accendiUnaRecluta(dati, aspetto, indicePostazione, indiceSlot) {
    const posto = primoLibero(reclute)
    if (!posto) {
      return false
    }
    const categoria = dati.categoria
    const destinazione = postazioni[indicePostazione].slot[indiceSlot]

    // parte dal castello e cammina fino al suo posto, sempre sulla sua corsia:
    // la velocita' decide quanto ci mette ad arrivare, ed e' per questo che il
    // Ratto e' la recluta d'emergenza
    accendi(posto, dati, lunghezzaTotale, destinazione.scarto)
    posto.postazione = indicePostazione
    posto.slot = indiceSlot
    posto.meta = destinazione.distanza

    posto.velocita = dati.velocita * oggetti.moltiplicatore(categoria, 'velocita')
    posto.cadenzaMs = dati.cadenza_ms * oggetti.moltiplicatore(categoria, 'cadenza_ms')
    posto.raggioIngaggio =
      dati.raggio_ingaggio * oggetti.moltiplicatore(categoria, 'raggio_ingaggio')
    posto.vitaMassima = dati.vita * oggetti.moltiplicatore(categoria, 'vita')
    posto.vita = posto.vitaMassima
    posto.danno = dati.danno * oggetti.moltiplicatore(categoria, 'danno')
    posto.dannoBase = posto.danno
    posto.oroRilasciato = 0
    posto.dannoCastello = 0
    posto.colore = aspetto.colore
    posto.coloreBordo = aspetto.colore_bordo

    // gli effetti dinamici: si leggono una volta qui, mai nel ciclo
    posto.veteranoPasso = oggetti.effettoSomma(categoria, 'veterano', 'valore')
    posto.veteranoMassimo = oggetti.effettoMassimo(categoria, 'veterano', 'massimo')
    posto.esplosioneRaggio = oggetti.effettoMassimo(categoria, 'esplosione_morte', 'raggio')
    posto.esplosioneDanno = oggetti.effettoSomma(categoria, 'esplosione_morte', 'valore')
    posto.spine = oggetti.effettoSomma(categoria, 'spine', 'valore')
    posto.rallentaValore = oggetti.effettoProdotto(categoria, 'rallenta', 'valore')
    posto.rallentaDurataMs = oggetti.effettoMassimo(categoria, 'rallenta', 'durata_ms')

    return true
  }

  // Un acquisto fa partire una squadra intera verso una postazione: e' quello
  // che tiene basso il numero di tocchi senza togliere niente alla decisione.
  function faiPartireRecluta(idRecluta, indicePostazione) {
    const dati = trovaRecluta(idRecluta)
    const aspetto = aspettoRecluta(dati.id)
    const postazione = postazioni[indicePostazione]

    leggiPostiOccupati(indicePostazione)

    let partiti = 0
    for (let i = 0; i < postazione.posti && partiti < dati.quantita; i++) {
      if (postiOccupati[i]) {
        continue
      }
      if (accendiUnaRecluta(dati, aspetto, indicePostazione, i)) {
        postiOccupati[i] = 1
        partiti++
      }
    }
    return partiti > 0
  }

  // Rinforzi gratuiti a inizio ondata, dagli oggetti. Vanno da soli dove c'e'
  // piu' spazio: un oggetto non deve aggiungere un'altra decisione ogni volta.
  function faiArrivareRinforzi() {
    const rinforzi = oggetti.rinforzi()
    for (let i = 0; i < rinforzi.length; i++) {
      const rinforzo = rinforzi[i]
      const dove = postazionePiuVuota()
      if (postiLiberi(dove) > 0) {
        faiPartireRecluta(rinforzo.recluta, dove)
      }
    }
  }

  // Le reclute non guariscono da sole: solo un oggetto puo' rimetterle in
  // sesto fra un'ondata e l'altra, ed e' per questo che quell'oggetto conta.
  function riposaFraOndate() {
    const quota = oggetti.guarigioneFraOndate()
    if (quota <= 0) {
      return
    }
    for (let i = 0; i < reclute.length; i++) {
      const recluta = reclute[i]
      if (!recluta.attivo) {
        continue
      }
      recluta.vita = Math.min(recluta.vitaMassima, recluta.vita + recluta.vitaMassima * quota)
    }
  }

  // --- combattimento ---

  function muore(vittima, eNemico) {
    vittima.attivo = false
    allaMorte(vittima.x, vittima.y)
    if (eNemico) {
      allOroRaccolto(vittima.oroRilasciato + oggetti.oroPerUccisione())
      return
    }
    // una recluta che scoppia morendo: e' l'unico modo che ha la difesa di
    // fare danno tutto insieme invece che un colpo alla volta
    if (vittima.esplosioneDanno > 0) {
      allEsplosione(vittima.x, vittima.y)
      for (let i = 0; i < nemici.length; i++) {
        const nemico = nemici[i]
        if (!nemico.attivo) {
          continue
        }
        if (Math.abs(nemico.distanza - vittima.distanza) > vittima.esplosioneRaggio) {
          continue
        }
        nemico.vita -= vittima.esplosioneDanno
        nemico.lampoMs = stile.lampo_colpo_ms
        if (nemico.vita <= 0) {
          muore(nemico, true)
        }
      }
    }
  }

  function colpisci(attaccante, bersaglio, bersaglioENemico) {
    const inflitto = attaccante.danno * (1 - bersaglio.riduzioneDanno)
    bersaglio.vita -= inflitto
    bersaglio.lampoMs = stile.lampo_colpo_ms
    allImpatto(bersaglio.x, bersaglio.y)

    // il gelo: chi viene colpito marcia piu' piano per un po'
    if (bersaglioENemico && attaccante.rallentaValore < 1) {
      bersaglio.rallentatoMs = attaccante.rallentaDurataMs
      bersaglio.rallentatoValore = attaccante.rallentaValore
    }

    // le spine: chi colpisce si ferisce da solo
    if (!bersaglioENemico && bersaglio.spine > 0 && attaccante.attivo) {
      attaccante.vita -= inflitto * bersaglio.spine
      attaccante.lampoMs = stile.lampo_colpo_ms
      if (attaccante.vita <= 0) {
        muore(attaccante, true)
      }
    }

    if (bersaglio.vita > 0) {
      return
    }

    muore(bersaglio, bersaglioENemico)

    // il veterano: chi uccide impara, e resta piu' forte fino alla fine
    if (bersaglioENemico && attaccante.attivo && attaccante.veteranoPasso > 0) {
      attaccante.veteranoAccumulato = Math.min(
        attaccante.veteranoAccumulato + attaccante.veteranoPasso,
        attaccante.veteranoMassimo
      )
      attaccante.danno = attaccante.dannoBase * (1 + attaccante.veteranoAccumulato)
    }
  }

  // Il bersaglio e' l'avversario piu' vicino lungo il sentiero, entro la
  // portata: cosi' la prima fila ingaggia la prima fila.
  function bersaglioPiuVicino(combattente, avversari) {
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
    return bersaglio
  }

  // I nemici marciano e basta. Colpiscono chi capita a tiro senza fermarsi:
  // e' cosi' che ogni postazione li logora un po' e nessuna li blocca per
  // sempre. Chi arriva in fondo colpisce il castello.
  function aggiornaNemici(passoMs, passoSecondi) {
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo) {
        continue
      }

      if (nemico.ricaricaMs > 0) {
        nemico.ricaricaMs -= passoMs
      }
      if (nemico.lampoMs > 0) {
        nemico.lampoMs -= passoMs
      }
      if (nemico.rallentatoMs > 0) {
        nemico.rallentatoMs -= passoMs
        if (nemico.rallentatoMs <= 0) {
          nemico.rallentatoValore = 1
        }
      }

      if (nemico.ricaricaMs <= 0) {
        const bersaglio = bersaglioPiuVicino(nemico, reclute)
        if (bersaglio) {
          // il rallentamento vale anche sui colpi, non solo sui passi.
          // Rallentare e basta faceva danno al giocatore: un nemico lento
          // resta piu' a lungo addosso alle reclute, che sono ferme e non
          // guariscono, e alla prova il gelo faceva perdere ondate.
          nemico.ricaricaMs = nemico.cadenzaMs / nemico.rallentatoValore
          colpisci(nemico, bersaglio, false)
          // le spine possono averlo ucciso mentre colpiva
          if (!nemico.attivo) {
            continue
          }
        }
      }

      // non si ferma mai: si accoda solo dietro a chi ha davanti sulla sua
      // corsia, per non finirgli sopra nel disegno
      let limite = lunghezzaTotale
      for (let j = 0; j < nemici.length; j++) {
        const davanti = nemici[j]
        if (davanti === nemico || !davanti.attivo || davanti.scarto !== nemico.scarto) {
          continue
        }
        if (davanti.distanza <= nemico.distanza) {
          continue
        }
        const consentito = davanti.distanza - distanzaMinimaInFila
        if (consentito < limite) {
          limite = consentito
        }
      }

      let nuova = nemico.distanza + nemico.velocita * nemico.rallentatoValore * passoSecondi
      if (nuova > limite) {
        nuova = limite
      }
      if (nuova < nemico.distanza) {
        nuova = nemico.distanza
      }
      nemico.distanza = nuova
      posizionaSulSentiero(nemico.distanza, nemico.scarto, nemico)

      if (nemico.distanza >= lunghezzaTotale) {
        nemico.attivo = false
        allArrivoAlCastello(nemico.dannoCastello, nemico.x, nemico.y)
      }
    }
  }

  // Le reclute camminano dal castello al loro posto e li' restano. Da ferme
  // colpiscono chiunque passi a tiro.
  function aggiornaReclute(passoMs, passoSecondi) {
    for (let i = 0; i < reclute.length; i++) {
      const recluta = reclute[i]
      if (!recluta.attivo) {
        continue
      }

      if (recluta.ricaricaMs > 0) {
        recluta.ricaricaMs -= passoMs
      }
      if (recluta.lampoMs > 0) {
        recluta.lampoMs -= passoMs
      }

      if (recluta.ricaricaMs <= 0) {
        const bersaglio = bersaglioPiuVicino(recluta, nemici)
        if (bersaglio) {
          recluta.ricaricaMs = recluta.cadenzaMs
          colpisci(recluta, bersaglio, true)
          if (!recluta.attivo) {
            continue
          }
        }
      }

      if (recluta.distanza <= recluta.meta) {
        continue
      }

      let nuova = recluta.distanza - recluta.velocita * passoSecondi
      if (nuova < recluta.meta) {
        nuova = recluta.meta
      }
      recluta.distanza = nuova
      posizionaSulSentiero(recluta.distanza, recluta.scarto, recluta)
    }
  }

  function aggiorna(passoMs, passoSecondi) {
    aggiornaNemici(passoMs, passoSecondi)
    aggiornaReclute(passoMs, passoSecondi)
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
  }

  return {
    faiUscireNemico,
    cePostoPerUnaSquadra,
    faiPartireRecluta,
    faiArrivareRinforzi,
    riposaFraOndate,
    postiLiberi,
    aggiorna,
    disegna,
    nemiciVivi,
    svuota
  }
}
