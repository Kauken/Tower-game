import React from 'react'
import { elencoMateriali } from '../game/config.js'

// L'icona di un materiale.
//
// **Non è un abbellimento.** Prima ogni materiale era un pallino colorato da
// undici pixel, e il colore era l'unica cosa che li distingueva. È l'unico
// punto in cui il gioco violava una regola scritta — WCAG 1.4.1, *"il colore
// non deve essere l'unico mezzo per trasmettere un'informazione"* — e la
// ragione è concreta: **un uomo su otto non distingue il rosso dal verde**, e
// tre dei nostri materiali stanno tutti sul marrone-arancio.
//
// Quindi ogni materiale ha una **forma**, dichiarata in `isola.json`. Il colore
// resta e aiuta, ma non è più lui a portare l'informazione.
//
// Sono disegni piccolissimi, e vanno letti a 24 pixel su uno schermo da
// telefono: niente dettagli, solo una silhouette che si riconosce di scorcio.

const per = {}
for (let i = 0; i < elencoMateriali.length; i++) {
  per[elencoMateriali[i].id] = elencoMateriali[i]
}

// Schiarisce o scurisce un colore, per ricavare le due tinte di ogni forma da
// quella sola dichiarata in configurazione.
function tinta(colore, quanto) {
  const n = parseInt(colore.slice(1, 7), 16)
  const passa = (v) => Math.max(0, Math.min(255, Math.round(v + quanto * 255)))
  const r = passa((n >> 16) & 255)
  const g = passa((n >> 8) & 255)
  const b = passa(n & 255)
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function disegno(forma, colore) {
  const scuro = tinta(colore, -0.22)
  const chiaro = tinta(colore, 0.16)
  switch (forma) {
    // un tronco sdraiato, con i cerchi del taglio in testa
    case 'tronco':
      return (
        <>
          <rect x="2" y="8" width="20" height="8" rx="4" fill={colore} />
          <ellipse cx="5" cy="12" rx="3" ry="4" fill={chiaro} />
          <ellipse cx="5" cy="12" rx="1.4" ry="2" fill={scuro} />
        </>
      )
    // un'asse: piatta e lunga, con la venatura
    case 'asse':
      return (
        <>
          <rect x="1" y="9" width="22" height="6" rx="1" fill={colore} />
          <rect x="3" y="11" width="18" height="1" fill={scuro} opacity="0.7" />
          <rect x="3" y="13" width="12" height="1" fill={scuro} opacity="0.5" />
        </>
      )
    // un sasso: spigoloso, mai tondo, se no si confonde con la pepita
    case 'sasso':
      return (
        <>
          <path d="M5 16 L3 10 L8 5 L17 6 L20 12 L16 17 Z" fill={colore} />
          <path d="M8 5 L17 6 L15 10 Z" fill={chiaro} />
        </>
      )
    // tre granelli: la ghiaia è il sasso rotto, e si vede
    case 'granelli':
      return (
        <>
          <path d="M3 15 L5 10 L10 12 L8 17 Z" fill={colore} />
          <path d="M11 8 L15 5 L18 9 L14 11 Z" fill={chiaro} />
          <path d="M13 13 L18 12 L20 16 L15 18 Z" fill={scuro} />
        </>
      )
    // una pepita: tonda e lucida, il contrario del sasso
    case 'pepita':
      return (
        <>
          <circle cx="12" cy="12" r="7" fill={colore} />
          <circle cx="9.5" cy="9.5" r="2.4" fill={chiaro} />
        </>
      )
    // un chiodo: la punta in giù e la testa larga
    case 'chiodo':
      return (
        <>
          <rect x="5" y="4" width="14" height="3.5" rx="1.5" fill={chiaro} />
          <path d="M10.5 7 L13.5 7 L12.6 19 L11.4 19 Z" fill={colore} />
        </>
      )
    // un telaio: un rettangolo vuoto, perché è una cosa che ne tiene altre
    case 'telaio':
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke={colore} strokeWidth="3" />
          <rect x="3" y="11" width="18" height="2" fill={scuro} />
        </>
      )
    // un germoglio: due foglie e un gambo, l'unica forma viva del gruppo
    case 'germoglio':
      return (
        <>
          <rect x="11" y="11" width="2" height="9" fill={tinta(colore, -0.3)} />
          <ellipse cx="7.5" cy="9" rx="5" ry="3.4" transform="rotate(-28 7.5 9)" fill={colore} />
          <ellipse cx="16" cy="10" rx="4.4" ry="3" transform="rotate(26 16 10)" fill={chiaro} />
        </>
      )
    // un lingotto: il trapezio dello stampo, e si riconosce da solo
    case 'lingotto':
      return (
        <>
          <path d="M4 16 L6 9 L18 9 L20 16 Z" fill={colore} />
          <path d="M6 9 L18 9 L17 11 L7 11 Z" fill={chiaro} />
          <path d="M4 16 L20 16 L19.4 18 L4.6 18 Z" fill={scuro} />
        </>
      )
    default:
      return <circle cx="12" cy="12" r="7" fill={colore} />
  }
}

export default function Icona({ materiale, lato = 24 }) {
  const dati = per[materiale]
  if (!dati) {
    return null
  }
  return (
    <svg
      width={lato}
      height={lato}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ display: 'block', flex: '0 0 auto' }}
    >
      {disegno(dati.forma, dati.colore)}
    </svg>
  )
}
