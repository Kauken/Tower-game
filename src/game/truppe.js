// Le truppe dei due eserciti su campo aperto: i nemici scendono dal castello
// in alto, gli alleati salgono da quello in basso, sparpagliati su tutta la
// larghezza. Quando vedono un avversario gli vanno incontro di lato; quando ce
// l'hanno a tiro si fermano e combattono. Chi sfonda danneggia il castello.
// I nemici considerano bersaglio anche il personaggio del giocatore.
// Due pool preallocati, zero creazioni durante la partita.

import {
  alleatoSquadra,
  campo,
  grafica,
  limiti,
  nemicoPressione,
  scalaturaAlleati,
  scalaturaNemici,
  schieramento
} from './config.js'
import { creaPool, primoLibero } from './pool.js'

function nuovaTruppa() {
  return {
    attivo: false,
    // dichiarato anche qui, anche se e' sempre falso: le truppe e il
    // personaggio vengono letti dallo stesso codice di bersaglio, e un campo
    // mancante rallenta il punto piu' caldo del ciclo
    eGiocatore: false,
    generazione: 0,
    fazione: '',
    x: 0,
    y: 0,
    vita: 0,
    vitaMassima: 0,
    velocita: 0,
    raggio: 0,
    raggioIngaggio: 0,
    danno: 0,
    cadenzaMs: 0,
    ricarica: 0,
    riduzioneDanno: 0,
    dannoFortezza: 0,
    oro: 0,
    lampoMs: 0,
    rallentaFattore: 1,
    rallentaMs: 0,
    bersaglio: null,
    generazioneBersaglio: 0
  }
}

// agganci: allaMorte(fazione, oro, x, y),
//          allaFortezzaGiocatore(danno), allaFortezzaNemica(danno),
//          colpisciGiocatore(danno), giocatore (oggetto di stato del personaggio)
export function creaGestoreTruppe(agganci) {
  const nemici = creaPool(limiti.nemici_massimi, nuovaTruppa)
  const alleati = creaPool(limiti.alleati_massimi, nuovaTruppa)

  const larghezzaCampo = campo.destra - campo.sinistra
  const larghezzaUscita = larghezzaCampo * schieramento.larghezza_uscita
  const margineUscita = campo.sinistra + (larghezzaCampo - larghezzaUscita) / 2
  const attrazioneQuadrata = schieramento.raggio_attrazione * schieramento.raggio_attrazione

  // il personaggio, che i nemici trattano come un avversario qualsiasi.
  // Arriva dopo la creazione perche' a sua volta ha bisogno delle truppe.
  let giocatore = null

  function impostaGiocatore(stato) {
    giocatore = stato
  }

  function prepara(truppa, definizione, fazione, moltiplicatoreVita, moltiplicatoreDanno) {
    truppa.attivo = true
    truppa.generazione++
    truppa.fazione = fazione
    truppa.vitaMassima = definizione.vita_base * moltiplicatoreVita
    truppa.vita = truppa.vitaMassima
    truppa.velocita = definizione.velocita
    truppa.raggio = definizione.dimensione
    truppa.raggioIngaggio = definizione.raggio_ingaggio
    truppa.danno = definizione.danno * moltiplicatoreDanno
    truppa.cadenzaMs = definizione.cadenza_ms
    truppa.ricarica = 0
    truppa.riduzioneDanno = definizione.riduzione_danno
    truppa.dannoFortezza = definizione.danno_fortezza
    truppa.lampoMs = 0
    truppa.rallentaFattore = 1
    truppa.rallentaMs = 0
    truppa.bersaglio = null
    // esce in un punto qualsiasi della fascia davanti al proprio castello:
    // e' quello che rende il fronte irregolare invece di due file ordinate
    truppa.x = margineUscita + Math.random() * larghezzaUscita
  }

  function generaNemico(grado) {
    const truppa = primoLibero(nemici)
    if (!truppa) {
      return
    }
    prepara(
      truppa,
      nemicoPressione,
      'nemico',
      Math.pow(scalaturaNemici.vita_per_grado, grado),
      Math.pow(scalaturaNemici.danno_per_grado, grado)
    )
    truppa.oro = Math.round(
      nemicoPressione.oro_rilasciato * Math.pow(scalaturaNemici.oro_per_grado, grado)
    )
    truppa.y = campo.alto
  }

  function generaAlleato(grado) {
    const truppa = primoLibero(alleati)
    if (!truppa) {
      return
    }
    prepara(
      truppa,
      alleatoSquadra,
      'alleato',
      Math.pow(scalaturaAlleati.vita_per_grado, grado),
      Math.pow(scalaturaAlleati.danno_per_grado, grado)
    )
    truppa.oro = 0
    truppa.y = campo.basso
  }

  function spegni(truppa) {
    truppa.attivo = false
    truppa.bersaglio = null
  }

  function applicaDanno(truppa, danno) {
    const effettivo = danno - truppa.riduzioneDanno
    if (effettivo <= 0) {
      return
    }
    truppa.vita -= effettivo
    truppa.lampoMs = grafica.effetti.lampo_colpo_ms
    if (truppa.vita <= 0) {
      truppa.vita = 0
      spegni(truppa)
      agganci.allaMorte(truppa.fazione, truppa.oro, truppa.x, truppa.y)
    }
  }

  // Cerca l'avversario piu' vicino entro il raggio d'attrazione: non e' ancora
  // detto che sia a tiro, ma la truppa gli va incontro. Il personaggio conta
  // come avversario per i nemici.
  function cercaAvversario(truppa, avversari, bersaglioGiocatore) {
    let migliore = null
    let distanzaMigliore = attrazioneQuadrata

    for (let i = 0; i < avversari.length; i++) {
      const altro = avversari[i]
      if (!altro.attivo) {
        continue
      }
      const dx = altro.x - truppa.x
      const dy = altro.y - truppa.y
      const distanza = dx * dx + dy * dy
      if (distanza < distanzaMigliore) {
        migliore = altro
        distanzaMigliore = distanza
      }
    }

    if (bersaglioGiocatore && bersaglioGiocatore.attivo) {
      const dx = bersaglioGiocatore.x - truppa.x
      const dy = bersaglioGiocatore.y - truppa.y
      const distanza = dx * dx + dy * dy
      if (distanza < distanzaMigliore) {
        migliore = bersaglioGiocatore
        distanzaMigliore = distanza
      }
    }

    return migliore
  }

  function bersaglioValido(truppa) {
    const bersaglio = truppa.bersaglio
    if (
      !bersaglio ||
      !bersaglio.attivo ||
      bersaglio.generazione !== truppa.generazioneBersaglio
    ) {
      return false
    }
    const dx = bersaglio.x - truppa.x
    const dy = bersaglio.y - truppa.y
    return dx * dx + dy * dy <= attrazioneQuadrata
  }

  function aTiro(truppa, bersaglio) {
    const dx = bersaglio.x - truppa.x
    const dy = bersaglio.y - truppa.y
    const portata = truppa.raggioIngaggio + truppa.raggio + bersaglio.raggio
    return dx * dx + dy * dy <= portata * portata
  }

  function aggiornaTruppa(truppa, avversari, passoMs, passoSecondi, versoIlBasso) {
    if (truppa.lampoMs > 0) {
      truppa.lampoMs -= passoMs
    }
    let velocita = truppa.velocita
    if (truppa.rallentaMs > 0) {
      truppa.rallentaMs -= passoMs
      velocita *= truppa.rallentaFattore
    }

    // solo i nemici danno la caccia al personaggio
    if (!bersaglioValido(truppa)) {
      truppa.bersaglio = cercaAvversario(truppa, avversari, versoIlBasso ? giocatore : null)
      truppa.generazioneBersaglio = truppa.bersaglio ? truppa.bersaglio.generazione : 0
    }

    // avversario a tiro: si ferma e colpisce
    if (truppa.bersaglio && aTiro(truppa, truppa.bersaglio)) {
      if (truppa.ricarica > 0) {
        truppa.ricarica -= passoMs
      } else {
        if (truppa.bersaglio.eGiocatore) {
          agganci.colpisciGiocatore(truppa.danno)
        } else {
          applicaDanno(truppa.bersaglio, truppa.danno)
        }
        truppa.ricarica = truppa.cadenzaMs
      }
      return
    }

    // avanza verso il castello avversario, e intanto si sposta di lato verso
    // l'avversario che ha adocchiato: e' cosi' che si formano i grovigli
    const passo = velocita * passoSecondi
    if (truppa.bersaglio) {
      const scarto = truppa.bersaglio.x - truppa.x
      const deriva = schieramento.deriva_laterale * passoSecondi
      if (scarto > deriva) {
        truppa.x += deriva
      } else if (scarto < -deriva) {
        truppa.x -= deriva
      } else {
        truppa.x = truppa.bersaglio.x
      }
    }

    if (truppa.x < campo.sinistra) {
      truppa.x = campo.sinistra
    } else if (truppa.x > campo.destra) {
      truppa.x = campo.destra
    }

    if (versoIlBasso) {
      truppa.y += passo
      if (truppa.y >= campo.basso) {
        spegni(truppa)
        agganci.allaFortezzaGiocatore(truppa.dannoFortezza)
      }
      return
    }

    truppa.y -= passo
    if (truppa.y <= campo.alto) {
      spegni(truppa)
      agganci.allaFortezzaNemica(truppa.dannoFortezza)
    }
  }

  function aggiorna(passoMs, passoSecondi) {
    for (let i = 0; i < nemici.length; i++) {
      if (nemici[i].attivo) {
        aggiornaTruppa(nemici[i], alleati, passoMs, passoSecondi, true)
      }
    }
    for (let i = 0; i < alleati.length; i++) {
      if (alleati[i].attivo) {
        aggiornaTruppa(alleati[i], nemici, passoMs, passoSecondi, false)
      }
    }
  }

  // --- interfaccia per il personaggio e per gli effetti ad area ---

  function nemicoPiuVicino(x, y, raggioQuadrato) {
    let migliore = null
    let distanzaMigliore = raggioQuadrato
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      const distanza = dx * dx + dy * dy
      if (distanza <= distanzaMigliore) {
        migliore = nemico
        distanzaMigliore = distanza
      }
    }
    return migliore
  }

  function colpisciArea(x, y, raggioQuadrato, danno, fattoreRallenta, durataRallentaMs) {
    let toccati = 0
    for (let i = 0; i < nemici.length; i++) {
      const nemico = nemici[i]
      if (!nemico.attivo) {
        continue
      }
      const dx = nemico.x - x
      const dy = nemico.y - y
      if (dx * dx + dy * dy > raggioQuadrato) {
        continue
      }
      toccati++
      if (fattoreRallenta < 1) {
        nemico.rallentaFattore = fattoreRallenta
        if (durataRallentaMs > nemico.rallentaMs) {
          nemico.rallentaMs = durataRallentaMs
        }
      }
      if (danno > 0) {
        applicaDanno(nemico, danno)
      }
    }
    return toccati
  }

  function svuota() {
    for (let i = 0; i < nemici.length; i++) {
      nemici[i].attivo = false
      nemici[i].bersaglio = null
      nemici[i].generazione++
    }
    for (let i = 0; i < alleati.length; i++) {
      alleati[i].attivo = false
      alleati[i].bersaglio = null
      alleati[i].generazione++
    }
  }

  function disegnaElenco(ctx, elenco, stile) {
    const barra = grafica.barra_vita
    const mezzaBarra = barra.larghezza / 2

    for (let i = 0; i < elenco.length; i++) {
      const truppa = elenco[i]
      if (!truppa.attivo) {
        continue
      }

      ctx.beginPath()
      ctx.arc(truppa.x, truppa.y, truppa.raggio, 0, Math.PI * 2)
      ctx.fillStyle = truppa.lampoMs > 0 ? grafica.effetti.colore_lampo : stile.colore
      ctx.fill()
      ctx.lineWidth = stile.spessore_bordo
      ctx.strokeStyle =
        truppa.rallentaMs > 0 ? stile.colore_bordo_rallentato : stile.colore_bordo
      ctx.stroke()

      const sinistra = truppa.x - mezzaBarra
      const alto = truppa.y - truppa.raggio - barra.distanza_sopra - barra.altezza
      ctx.fillStyle = barra.colore_fondo
      ctx.fillRect(sinistra, alto, barra.larghezza, barra.altezza)
      ctx.fillStyle = barra.colore_pieno
      ctx.fillRect(
        sinistra,
        alto,
        (barra.larghezza * truppa.vita) / truppa.vitaMassima,
        barra.altezza
      )
      ctx.lineWidth = barra.spessore_bordo
      ctx.strokeStyle = barra.colore_bordo
      ctx.strokeRect(sinistra, alto, barra.larghezza, barra.altezza)
    }
  }

  function disegna(ctx) {
    disegnaElenco(ctx, nemici, grafica.nemico)
    disegnaElenco(ctx, alleati, grafica.alleato)
  }

  return {
    impostaGiocatore,
    generaNemico,
    generaAlleato,
    aggiorna,
    disegna,
    applicaDanno,
    colpisciArea,
    nemicoPiuVicino,
    svuota
  }
}
