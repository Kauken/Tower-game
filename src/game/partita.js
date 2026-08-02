// Lo stato della run: a che stanza siamo e in che fase.

// fase: 'combattimento' | 'pulita' | 'sconfitta'
export function creaStatoPartita() {
  const stato = { stanza: 0, fase: 'combattimento' }
  reimposta(stato)
  return stato
}

export function reimposta(stato) {
  stato.stanza = 1
  stato.fase = 'combattimento'
}

export function prossimaStanza(stato) {
  stato.stanza++
  stato.fase = 'combattimento'
}
