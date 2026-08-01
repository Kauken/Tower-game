// Pool preallocati: tutti gli oggetti nascono all'avvio e vengono riusati.
// Durante la partita non si crea e non si distrugge niente, si accende e si
// spegne il campo `attivo`. E' quello che evita gli scatti da garbage collector.

export function creaPool(quantita, costruttore) {
  const elementi = new Array(quantita)
  for (let i = 0; i < quantita; i++) {
    elementi[i] = costruttore()
  }
  return elementi
}

// Restituisce il primo elemento spento, oppure null se il pool e' pieno.
// Scorrere l'elenco non alloca niente.
export function primoLibero(elementi) {
  for (let i = 0; i < elementi.length; i++) {
    if (!elementi[i].attivo) {
      return elementi[i]
    }
  }
  return null
}
