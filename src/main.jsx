import React from 'react'
import { createRoot } from 'react-dom/client'
import { version } from '../package.json'

// Schermata provvisoria: serve solo a verificare che la pubblicazione funzioni.
// Qui non c'è nessuna logica di gioco.
function App() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        textAlign: 'center'
      }}
    >
      <h1 style={{ margin: 0, fontSize: '28px', letterSpacing: '1px' }}>
        Torre di Guardia
      </h1>
      <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
        versione {version}
      </p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
