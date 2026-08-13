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
//   scava     come raccogli, ma su un giacimento: **si ripete** finche' c'e' posto
//   pianta    metti a dimora quello che hai addosso
//   deposita  posa nella cassa quello che hai addosso
//   preleva   prendi dalla cassa e mettitelo addosso
//   fabbrica  vai al banco e fai una ricetta con quello che hai addosso
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
    // un lavoro ripetuto non sparisce quando e' finito: l'operaio resta li' e
    // ricomincia. Serve ai giacimenti, che non si esauriscono: un tocco per
    // ogni sassolino sarebbe una punizione, non un comando
    ripetuto: false,
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
    lavoro.ripetuto = false
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
      // Un lavoro gia' preso in carico non si disdice: e' per strada.
      // **Uno scavo si', sempre**: non finisce da solo, quindi se non lo si
      // potesse fermare l'operaio resterebbe li' finche' non e' pieno, e il
      // giocatore non avrebbe nessun modo di riprenderselo.
      if (!gia.preso || gia.ripetuto) {
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

    const lavoro = apri(dati.giacimento ? 'scava' : 'raccogli', tx, ty)
    if (!lavoro) {
      return false
    }
    lavoro.tipo = nomeRisorsa
    // scavare non finisce: l'operaio resta li' finche' ha posto nello zaino,
    // o finche' non tocchi di nuovo per fermarlo
    lavoro.ripetuto = !!dati.giacimento
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
  // disdire quello di prima.
  //
  // **Ordini di materiali diversi si accodano**, uno per materiale. Prima si
  // riscrivevano a vicenda: premevi "Posa legno" e poi "Posa rame" e il legno
  // spariva dalla coda senza dire niente. Premere due pulsanti e vederne
  // funzionare uno solo e' il modo piu' rapido per non fidarsi piu' di un
  // gioco. Lo stesso materiale invece non si accoda due volte: premerlo di
  // nuovo vuol dire "si, quello".
  function ordinaScambio(azione, tx, ty, materiale) {
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (
        lavoro.attivo &&
        !lavoro.preso &&
        lavoro.azione === azione &&
        lavoro.tx === tx &&
        lavoro.ty === ty &&
        lavoro.materiale === materiale
      ) {
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
  // Fabbricare: si va al banco (il casotto) e si fa una ricetta. Piu' ordini
  // della stessa ricetta si accodano invece di sovrascriversi — chiedere tre
  // volte "tavole" vuol dire volerne tre.
  function ordinaFabbrica(tx, ty, idRicetta) {
    const lavoro = apri('fabbrica', tx, ty)
    if (!lavoro) {
      return false
    }
    lavoro.materiale = idRicetta
    return true
  }

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

  // --- salvataggio ---
  // Gli ordini in coda si salvano: riaprire e trovare la fila cancellata
  // sembrerebbe un guasto. `preso` no: al rientro nessuno li ha ancora presi.
  function perSalvare() {
    const fuori = []
    for (let i = 0; i < coda.length; i++) {
      const lavoro = coda[i]
      if (!lavoro.attivo) {
        continue
      }
      fuori.push({
        azione: lavoro.azione,
        tipo: lavoro.tipo,
        tx: lavoro.tx,
        ty: lavoro.ty,
        materiale: lavoro.materiale
      })
    }
    return fuori
  }

  function daSalvato(dati) {
    svuota()
    if (!Array.isArray(dati)) {
      return
    }
    for (let i = 0; i < dati.length; i++) {
      const voce = dati[i]
      const lavoro = apri(voce.azione, voce.tx, voce.ty)
      if (!lavoro) {
        return
      }
      lavoro.tipo = voce.tipo || ''
      lavoro.materiale = voce.materiale || ''
    }
  }

  return {
    coda,
    perSalvare,
    daSalvato,
    ordinaRaccolta,
    ordinaPiantata,
    ordinaScambio,
    ordinaFabbrica,
    prossimo,
    trovaSuTessera,
    quantiInAttesa,
    svuota
  }
}
