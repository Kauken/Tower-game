// La coda dei lavori.
//
// Il giocatore non tocca mai il terreno con le mani: **mette in coda del
// lavoro, e l'operaio lo prende.** E' il modello di RimWorld, ridotto a quello
// che si comanda con un pollice.
//
// Un lavoro nasce quando si tocca qualcosa sull'isola, resta in coda finche'
// l'operaio non arriva a farlo, e sparisce quando e' fatto. Con un operaio
// solo la coda si vede tutta, e l'ordine in cui l'hai data e' l'ordine in cui
// verra' fatta.
//
// Le azioni sono quattro, e **sono tutte lo stesso lavoro**: vai da qualche
// parte, aspetta, succede una cosa.
//   raccogli  togli quello che c'e' su una tessera e mettilo nello zaino
//   pianta    metti a dimora quello che hai addosso
//   deposita  posa nella cassa quello che hai addosso
//   preleva   prendi dalla cassa e mettitelo addosso
//
// **Depositare e' un ordine come gli altri, non un automatismo.** L'operaio non
// va a svuotarsi da solo da nessuna parte: sei tu a dirgli dove posare la
// roba. E' quella fatica che piu' avanti rendera' i nastri una liberazione
// invece che un gadget.
//
// Tutto da pool preallocato: dentro il ciclo di gioco non si crea niente.

import { limiti, risorse } from './config.js'
import { maturoIn, piantabile } from './mondo.js'
import { creaPool, primoLibero } from './pool.js'

export function creaLavori() {
  // Un lavoro ha gia' i campi per un'origine e una destinazione: trasportare
  // sara' "prendi X da A e portalo a B", e aggiungerli dopo aver costruito i
  // nastri costerebbe rifare i nastri. Vedi GDD 6b.
  const coda = creaPool(limiti.lavori_massimi, () => ({
    attivo: false,
    azione: '',
    tipo: '',
    tx: 0,
    ty: 0,
    versoTx: -1,
    versoTy: -1,
    materiale: '',
    quantita: 0,
    preso: false
  }))

  function trovaSuTessera(tx, ty) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (lavoro.attivo && lavoro.tx === tx && lavoro.ty === ty) {
        return lavoro
      }
    }
    return null
  }

  function apri(azione, tx, ty) {
    const lavoro = primoLibero(coda)
    if (!lavoro) {
      return null
    }
    lavoro.attivo = true
    lavoro.azione = azione
    lavoro.tipo = ''
    lavoro.tx = tx
    lavoro.ty = ty
    lavoro.versoTx = -1
    lavoro.versoTy = -1
    lavoro.materiale = ''
    lavoro.quantita = 0
    lavoro.preso = false
    return lavoro
  }

  // Toccare due volte la stessa cosa annulla l'ordine invece di darne un
  // altro: e' l'unico modo per disdire senza aggiungere un altro comando.
  function ordinaRaccolta(tx, ty, nomeRisorsa) {
    const gia = trovaSuTessera(tx, ty)
    if (gia) {
      if (!gia.preso) {
        gia.attivo = false
      }
      return false
    }

    const dati = risorse[nomeRisorsa]
    if (!dati || !dati.lavorabile) {
      return false
    }
    // un alberello non si taglia: sta ancora crescendo
    if (!maturoIn(tx, ty)) {
      return false
    }

    const lavoro = apri('raccogli', tx, ty)
    if (!lavoro) {
      return false
    }
    lavoro.tipo = nomeRisorsa
    return true
  }

  // Piantare: la tessera deve essere libera e il materiale deve dire cosa
  // diventa (`pianta` in isola.json). Non si equipaggia niente: basta averlo.
  function ordinaPiantata(tx, ty, materiale, nomeRisorsa) {
    const gia = trovaSuTessera(tx, ty)
    if (gia) {
      if (!gia.preso) {
        gia.attivo = false
      }
      return false
    }
    if (!piantabile(tx, ty)) {
      return false
    }
    const lavoro = apri('pianta', tx, ty)
    if (!lavoro) {
      return false
    }
    lavoro.tipo = nomeRisorsa
    lavoro.materiale = materiale
    return true
  }

  // Posare o prendere da una cassa. Qui il secondo tocco non annulla: si arriva
  // da un pulsante del pannello, e chi lo preme vuole dare l'ordine, non
  // disdire quello di prima. Un ordine dello stesso tipo sulla stessa cassa
  // viene riscritto invece di accodarsi.
  function ordinaScambio(azione, tx, ty, materiale) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (lavoro.attivo && !lavoro.preso && lavoro.azione === azione && lavoro.tx === tx && lavoro.ty === ty) {
        lavoro.materiale = materiale
        return true
      }
    }
    const lavoro = apri(azione, tx, ty)
    if (!lavoro) {
      return false
    }
    lavoro.materiale = materiale
    return true
  }

  // Il primo lavoro che l'operaio puo' fare adesso, nell'ordine in cui l'hai
  // dato. Il filtro serve a una cosa sola: con lo zaino pieno una raccolta non
  // si puo' fare, ma **posare la roba in una cassa si', e deve poter passare
  // avanti** — altrimenti l'ordine che sblocca la situazione resterebbe in
  // fondo alla fila dietro a quello che l'ha causata.
  function prossimo(puoFare) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (!lavoro.attivo || lavoro.preso) {
        continue
      }
      if (puoFare && !puoFare(lavoro)) {
        continue
      }
      return lavoro
    }
    return null
  }

  function quantiInAttesa() {
    let quanti = 0
    for (let i = 0; i < coda.length; i++) {
      if (coda[i].attivo) {
        quanti++
      }
    }
    return quanti
  }

  function svuota() {
    for (let i = 0; i < coda.length; i++) {
      coda[i].attivo = false
      coda[i].preso = false
    }
  }

  return {
    coda,
    ordinaRaccolta,
    ordinaPiantata,
    ordinaScambio,
    prossimo,
    trovaSuTessera,
    quantiInAttesa,
    svuota
  }
}
