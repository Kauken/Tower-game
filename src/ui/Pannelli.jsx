import React, { useState } from 'react'
import {
  elencoCostruzioni,
  elencoMateriali,
  elencoRicette,
  interfaccia
} from '../game/config.js'
import Bottone from './Bottone.jsx'
import { Casella, leggiCaselle, sommaCaselle } from './Zaino.jsx'
import Icona from './Icona.jsx'

const stile = interfaccia.pannello

// La griglia di caselle di un contenitore, come quando apri una cassa in
// Minecraft: si vede subito quanto e' piena e cosa c'e' dentro.
function Griglia({ inventario, vuotoDice }) {
  const caselle = leggiCaselle(inventario)
  if (caselle.length === 0 || caselle.every((casella) => !casella)) {
    return (
      <span
        style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
      >
        {vuotoDice}
      </span>
    )
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 5
      }}
    >
      {caselle.map((casella, indice) => (
        <div key={indice} style={{ aspectRatio: '1 / 1' }}>
          <Casella casella={casella} />
        </div>
      ))}
    </div>
  )
}

// Una riga di pastiglie da premere, una per materiale. E' cosi' che si sposta
// la roba: **un tocco solo per materiale**, non un trascinamento per pila.
// Su un telefono trascinare otto pile sarebbe una punizione, non una scelta.
function Sposta({ conti, verso, onSposta }) {
  const presenti = elencoMateriali.filter((m) => (conti[m.id] || 0) > 0)
  if (presenti.length === 0) {
    return null
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}>
      {presenti.map((materiale) => (
        <button
          key={materiale.id}
          type="button"
          onPointerDown={() => onSposta(materiale.id)}
          style={{
            flex: '1 1 40%',
            minHeight: interfaccia.altezza_minima_tocco - 16,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            borderRadius: interfaccia.raggio_angoli,
            border: '1px solid ' + materiale.colore,
            background: materiale.colore + '2e',
            color: interfaccia.colore_testo,
            fontFamily: 'inherit',
            fontSize: interfaccia.testo_piccolo,
            touchAction: 'manipulation'
          }}
        >
          <Icona materiale={materiale.id} lato={20} />
          <span style={{ fontWeight: stile.peso_titolo }}>{verso}</span>
          <span style={{ flex: 1, textAlign: 'right', color: interfaccia.colore_testo_debole }}>
            {materiale.nome} {conti[materiale.id]}
          </span>
        </button>
      ))}
    </div>
  )
}

// Il foglio che sale dal basso. **Non supera mai l'altezza dello schermo**: se
// il contenuto e' troppo scorre dentro di se'. Un pannello che sborda in alto
// si porta via il titolo, e su un telefono non c'e' modo di andarlo a
// riprendere.
function Foglio({ titolo, sottotitolo, children }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.altezza_minima_tocco + interfaccia.spaziatura * 2}px + env(safe-area-inset-bottom))`,
        maxHeight: `calc(100vh - ${interfaccia.altezza_minima_tocco * 2 + interfaccia.spazio_cruscotto + interfaccia.spaziatura * 4}px - env(safe-area-inset-bottom) - env(safe-area-inset-top))`,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        padding: interfaccia.spaziatura,
        borderRadius: interfaccia.raggio_angoli + 6,
        background: interfaccia.colore_pannello,
        border: '1px solid ' + interfaccia.colore_bordo_pannello,
        display: 'flex',
        flexDirection: 'column',
        gap: interfaccia.spaziatura_stretta,
        backdropFilter: 'blur(8px)'
      }}
    >
      <span
        style={{
          position: 'sticky',
          top: -interfaccia.spaziatura,
          margin: `-${interfaccia.spaziatura}px -${interfaccia.spaziatura}px 0`,
          padding: `${interfaccia.spaziatura}px ${interfaccia.spaziatura}px 6px`,
          background: interfaccia.colore_pannello,
          fontSize: interfaccia.testo_normale,
          fontWeight: stile.peso_titolo,
          color: interfaccia.colore_testo
        }}
      >
        {titolo}
      </span>
      {sottotitolo ? (
        <span
          style={{
            fontSize: interfaccia.testo_piccolo,
            color: interfaccia.colore_testo_debole,
            lineHeight: 1.35
          }}
        >
          {sottotitolo}
        </span>
      ) : null}
      {children}
    </div>
  )
}

const DICE = {
  fermo: 'in attesa di ordini',
  va: 'sta andando a lavorare',
  lavora: 'sta lavorando',
  pieno: 'ha lo zaino pieno: tocca una cassa e digli dove posare la roba',
  bloccato: 'non può fare quello che gli hai chiesto: gli manca qualcosa'
}

export function PannelloBracciante({ nome, stato, inventario, slot, puoPiantare, onChiudi }) {
  return (
    <Foglio titolo={nome} sottotitolo={DICE[stato] || ''}>
      <Griglia inventario={inventario} vuotoDice="Non ha niente addosso." />
      <span
        style={{ fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole }}
      >
        {slot} caselle nello zaino.{' '}
        {puoPiantare
          ? 'Ha ' + puoPiantare.toLowerCase() + ' addosso: tocca la terra libera per piantarlo.'
          : 'Senza alberelli addosso non può piantare niente.'}
      </span>
      <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
    </Foglio>
  )
}

// Si vende dalla cassa, non da un magazzino: anche vendere e' una cosa che
// succede in un posto. Al casotto si assume anche.
// "legno 4, chiodo 6" — il costo di una ricetta scritto come lo leggerebbe una
// persona, non come lo scriverebbe un programma.
function costoRicetta(ricetta) {
  return ricetta.ingredienti
    .map((voce) => {
      const m = elencoMateriali.find((x) => x.id === voce.materiale)
      return voce.quantita + ' ' + (m ? m.nome.toLowerCase() : voce.materiale)
    })
    .join(', ')
}

// Il banco da lavoro. **Si fabbrica con quello che l'operaio ha addosso**: se
// il legno sta in una cassa lontana, prima lo va a prendere. E' la stessa
// regola con cui si costruisce, ed e' quella che tiene in piedi il
// "niente magazzino centrale".
function Banco({ stati, onFabbrica }) {
  const aperte = elencoRicette.filter((r) => stati[r.id] !== undefined)
  if (aperte.length === 0) {
    return null
  }
  return (
    <>
      <span
        style={{
          fontSize: interfaccia.testo_piccolo,
          color: interfaccia.colore_testo_debole
        }}
      >
        Si fabbrica con quello che l’operaio ha <b>addosso</b>: se il materiale è
        in una cassa, prima va a prenderlo.
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}>
        {aperte.map((r) => {
          const puoi = stati[r.id] === 'si'
          const m = r.produce ? elencoMateriali.find((x) => x.id === r.produce) : null
          return (
            <Bottone
              key={r.id}
              titolo={r.nome + (r.quantita > 1 ? ' ×' + r.quantita : '')}
              dettaglio={costoRicetta(r)}
              colore={(m ? m.colore : interfaccia.colore_accento) + '44'}
              coloreBordo={m ? m.colore : interfaccia.colore_accento}
              acceso={puoi}
              onTocco={() => onFabbrica(r.id)}
            />
          )
        })}
      </div>
    </>
  )
}

// Le schede del casotto. Il pannello faceva tre cose in un rotolone solo, e
// su un telefono un rotolone e' il modo piu' facile per non trovare quello che
// cerchi. Tre schede, e ognuna e' un motivo diverso per essere venuto qui.
function Schede({ quale, cambia, voci }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
      {voci.map((voce) => {
        const attiva = voce.id === quale
        return (
          <button
            key={voce.id}
            type="button"
            onPointerDown={() => cambia(voce.id)}
            style={{
              flex: 1,
              minHeight: interfaccia.altezza_minima_tocco,
              borderRadius: interfaccia.raggio_angoli,
              border:
                stile.spessore_bordo +
                'px solid ' +
                (attiva ? interfaccia.colore_accento : 'transparent'),
              background: attiva ? stile.colore_azione : stile.colore_spento,
              color: attiva ? interfaccia.colore_testo : stile.colore_testo_spento,
              fontFamily: 'inherit',
              fontSize: interfaccia.testo_piccolo,
              fontWeight: attiva ? stile.peso_titolo : 400,
              touchAction: 'manipulation'
            }}
          >
            {voce.nome}
            {voce.pallino ? (
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: 5,
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  background: interfaccia.colore_accento
                }}
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function PannelloCassa({
  contenuto,
  inventarioOperaio,
  pieno,
  eIlCasotto,
  eBanco,
  progetti,
  ricette,
  onDeposita,
  onPreleva,
  onFabbrica,
  onChiudi
}) {
  const dentro = sommaCaselle(contenuto)
  const addosso = sommaCaselle(inventarioOperaio)
  const qualcosaDentro = elencoMateriali.some((m) => (dentro[m.id] || 0) > 0)
  const [scheda, cambiaScheda] = useState('cassa')

  // un pallino sulla scheda quando c'e' qualcosa da fare li' dentro: senza,
  // una scheda chiusa e' una cosa che non esiste
  const qualcosaDaFare = elencoRicette.some((r) => ricette && ricette[r.id] === 'si')
  const qualcosaDaFareLi = progetti.some((t) => t.stato === 'libero')
  const conSchede = eIlCasotto || eBanco
  const mostra = conSchede ? scheda : 'cassa'

  return (
    <Foglio
      titolo={eIlCasotto ? 'Casotto' : eBanco ? 'Banco da lavoro' : 'Cassa'}
      sottotitolo={
        eIlCasotto
          ? 'Occupate ' + pieno + '. Qui c\u2019\u00e8 il banco da lavoro e la bacheca.'
          : eBanco
            ? 'Occupate ' + pieno + '. Si fabbrica qui, senza tornare al casotto.'
            : 'Occupate ' + pieno
      }
    >
      {conSchede ? (
        <Schede
          quale={scheda}
          cambia={cambiaScheda}
          voci={[
            { id: 'cassa', nome: 'Cassa' },
            { id: 'banco', nome: 'Banco', pallino: qualcosaDaFare },
          ].concat(
            // la bacheca resta **solo al casotto**: e' il posto dove si guarda
            // avanti, e averla in tasca dappertutto la svuoterebbe
            eIlCasotto ? [{ id: 'progetti', nome: 'Progetti', pallino: qualcosaDaFareLi }] : []
          )}
        />
      ) : null}

      {mostra !== 'cassa' ? null : (
        <>
      <Griglia inventario={contenuto} vuotoDice="È vuota." />

      {/* la roba non ci arriva da sola: gliela fai posare tu, e lui ci deve
          camminare. E' la fatica che piu' avanti rendera' un nastro una
          liberazione invece che un gadget */}
      <Sposta conti={addosso} verso="Posa" onSposta={onDeposita} />
      <Sposta conti={dentro} verso="Prendi" onSposta={onPreleva} />
      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        <Bottone
          titolo="Posa tutto"
          colore={stile.colore_azione}
          acceso={elencoMateriali.some((m) => (addosso[m.id] || 0) > 0)}
          onTocco={() => onDeposita('')}
        />
        <Bottone
          titolo="Prendi tutto"
          colore={stile.colore_azione}
          acceso={qualcosaDentro}
          onTocco={() => onPreleva('')}
        />
      </div>

        </>
      )}

      {mostra !== 'banco' ? null : (
        <Banco stati={ricette} onFabbrica={onFabbrica} />
      )}

      {mostra !== 'progetti' || !eIlCasotto ? null : (
        <>
          <span
            style={{
              fontSize: interfaccia.testo_piccolo,
              color: interfaccia.colore_testo_debole
            }}
          >
            Una cosa si sblocca quando ne hai <b>fabbricata</b> un'altra. Qui vedi
            cosa sai fare adesso, e cosa aspetta il suo turno.
          </span>

          {/* quelle che non puoi ancora fare restano visibili, con scritto
              cosa ti manca: vedere quanto manca al Vivaio e' meta' del motivo
              per tornare. E' l'attesa a creare il desiderio */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: interfaccia.spaziatura_stretta
            }}
          >
            {progetti.map((t) => {
              const fatto = t.stato === 'fatto'
              const bloccata = t.stato === 'bloccato'
              const aperto = t.stato === 'libero'
              const presa = fatto
              const richiesta = bloccata
                ? progetti.find((altra) => altra.id === t.richiede)
                : null
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled
                  onPointerDown={undefined}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    minHeight: interfaccia.altezza_minima_tocco,
                    borderRadius: interfaccia.raggio_angoli,
                    border:
                      stile.spessore_bordo +
                      'px solid ' +
                      (presa || aperto ? t.colore : 'transparent'),
                    background: presa ? t.colore + '33' : stile.colore_spento,
                    color: presa || aperto ? interfaccia.colore_testo : stile.colore_testo_spento,
                    fontFamily: 'inherit',
                    touchAction: 'manipulation',
                    opacity: bloccata ? 0.65 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span
                      style={{ fontSize: interfaccia.testo_normale, fontWeight: stile.peso_titolo }}
                    >
                      {t.nome}
                    </span>
                    <span style={{ flex: 1 }} />
                    <span
                      style={{
                        fontSize: interfaccia.testo_piccolo,
                        fontWeight: stile.peso_titolo,
                        color: presa
                          ? t.colore
                          : aperto
                            ? interfaccia.colore_accento
                            : stile.colore_testo_spento
                      }}
                    >
                      {fatto ? 'fatto' : aperto ? 'da fabbricare' : 'bloccato'}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: interfaccia.testo_piccolo,
                      color: interfaccia.colore_testo_debole,
                      lineHeight: 1.3
                    }}
                  >
                    {bloccata && richiesta
                      ? 'prima devi fabbricare: ' + richiesta.nome
                      : aperto
                        ? 'fabbricalo nella scheda Banco'
                        : t.descrizione}
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}

      <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
    </Foglio>
  )
}

// Il pannello di una macchina.
//
// **Non e' una cassa con due scomparti.** Una cassa e' un posto dove metti le
// cose; una macchina e' una cosa che LAVORA, e la prima riga che leggi deve
// dire se sta lavorando o cosa le manca. Il contenuto viene dopo.
//
// E ha un verso: si posa in entrata, si prende dall'uscita. Non c'e' un
// bottone per rimettere le tavole dentro la segheria, perche' non esiste una
// ragione per volerlo fare.
const ETICHETTA = { fontSize: interfaccia.testo_piccolo, color: interfaccia.colore_testo_debole, textTransform: 'uppercase', letterSpacing: '0.08em' }

const DICE_LA_MACCHINA = {
  lavora: { testo: 'Sta lavorando', colore: '#7fc45a' },
  senza_materiale: { testo: 'Ferma: le manca il materiale', colore: '#d9a441' },
  senza_combustibile: { testo: 'Ferma: le manca il combustibile', colore: '#e0662f' },
  uscita_piena: { testo: 'Ferma: il cassetto d’uscita è pieno', colore: '#8fa3c4' }
}

export function PannelloMacchina({
  nome,
  stato,
  entrata,
  uscita,
  avanzamento,
  accetta,
  inventarioOperaio,
  onDeposita,
  onPreleva,
  onChiudi
}) {
  const dentro = sommaCaselle(entrata)
  const fuori = sommaCaselle(uscita)
  const addosso = sommaCaselle(inventarioOperaio)
  const dice = DICE_LA_MACCHINA[stato] || DICE_LA_MACCHINA.senza_materiale
  const presi = (accetta || '').split(',')
  const soloAccettati = {}
  for (const id in addosso) {
    if (presi.indexOf(id) >= 0) {
      soloAccettati[id] = addosso[id]
    }
  }

  return (
    <Foglio titolo={nome} sottotitolo="Lavora da sola finché ha di che lavorare.">
      {/* **Lo stato per primo.** Una macchina ferma che non dice perche'
          sembra un guasto, e la prima cosa che uno guarda aprendo un pannello
          e' la riga in alto. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          borderRadius: interfaccia.raggio_angoli,
          background: '#00000033',
          marginBottom: interfaccia.spaziatura_stretta
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            background: dice.colore,
            flex: '0 0 auto'
          }}
        />
        <span style={{ fontSize: interfaccia.testo_normale, color: dice.colore, fontWeight: 600 }}>
          {dice.testo}
        </span>
      </div>

      {/* la barra dell'avanzamento: si vede che qualcosa succede anche
          guardando il pannello e non l'isola */}
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: '#00000055',
          overflow: 'hidden',
          marginBottom: interfaccia.spaziatura
        }}
      >
        <div
          style={{
            width: Math.round(Math.max(0, Math.min(1, avanzamento)) * 100) + '%',
            height: '100%',
            background: dice.colore
          }}
        />
      </div>

      <p style={{ ...ETICHETTA, margin: '0 0 4px' }}>Entra</p>
      <Griglia inventario={entrata} vuotoDice="Vuoto. Posale del legno." />
      {/* si offre di posare **solo quello che sa usare**: un bottone che
          promette una cosa che poi non succede e' peggio di un bottone che
          non c'e' */}
      <Sposta conti={soloAccettati} verso="Posa" onSposta={onDeposita} />

      <p style={{ ...ETICHETTA, margin: '10px 0 4px' }}>Esce</p>
      <Griglia inventario={uscita} vuotoDice="Non ha ancora prodotto niente." />
      <Sposta conti={fuori} verso="Prendi" onSposta={onPreleva} />

      <div style={{ display: 'flex', gap: interfaccia.spaziatura_stretta }}>
        <Bottone
          titolo="Posa tutto"
          colore={stile.colore_azione}
          acceso={elencoMateriali.some((m) => (soloAccettati[m.id] || 0) > 0)}
          onTocco={() => onDeposita('')}
        />
        <Bottone
          titolo="Prendi tutto"
          colore={stile.colore_azione}
          acceso={elencoMateriali.some((m) => (fuori[m.id] || 0) > 0)}
          onTocco={() => onPreleva('')}
        />
      </div>
      <Bottone titolo="Chiudi" colore={stile.colore_chiudi} acceso onTocco={onChiudi} />
    </Foglio>
  )
}

export function PannelloCostruisci({ inventarioOperaio, inManoId, aperte, onPrendi, onChiudi }) {
  const conti = sommaCaselle(inventarioOperaio)

  return (
    <Foglio
      titolo="Cosa costruisci?"
      sottotitolo="Lo prendi in mano, poi tocchi la mappa dove metterlo. Si paga con quello che l’operaio ha addosso: se il legno è in una cassa lontana, prima va a prenderlo."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: interfaccia.spaziatura_stretta }}>
        {elencoCostruzioni.filter((v) => !v.richiede_progetto || (aperte || '').split(',').indexOf(v.id) >= 0).map((voce) => {
          const puoi = voce.costo.every((c) => (conti[c.materiale] || 0) >= c.quantita)
          const costo = voce.costo
            .map((c) => c.quantita + ' ' + c.materiale)
            .join(', ')
          return (
            <Bottone
              key={voce.id}
              titolo={voce.nome}
              dettaglio={inManoId === voce.id ? 'ce l’hai in mano' : costo}
              colore={voce.colore + (inManoId === voce.id ? 'aa' : '55')}
              coloreBordo={
                inManoId === voce.id ? interfaccia.colore_accento : voce.colore_bordo
              }
              acceso={puoi || inManoId === voce.id}
              onTocco={() => onPrendi(voce.id)}
            />
          )
        })}
        <Bottone titolo="Chiudi" colore={stile.colore_chiudi} largo onTocco={onChiudi} />
      </div>
    </Foglio>
  )
}

// La striscia che dice **cosa hai in mano e quanti te ne restano**. Senza,
// avere qualcosa in mano e non ricordarsene e' il modo piu' facile per
// piazzare una cosa dove non la volevi.
export function InMano({ nome, quanti, onRiponi }) {
  return (
    <Avviso
      testo={
        <>
          In mano: <b style={{ color: interfaccia.colore_accento }}>{nome}</b>
          {quanti > 0 ? ' ×' + quanti : ''} — tocca dove metterlo
        </>
      }
      testoAnnulla="Riponi"
      onAnnulla={onRiponi}
    />
  )
}

export function Avviso({ testo, testoAnnulla, onAnnulla }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: interfaccia.spaziatura,
        right: interfaccia.spaziatura,
        bottom: `calc(${interfaccia.altezza_minima_tocco + interfaccia.spaziatura * 2}px + env(safe-area-inset-bottom))`,
        padding: '6px 8px 6px 14px',
        borderRadius: interfaccia.raggio_angoli,
        background: interfaccia.colore_pannello,
        border: '2px solid ' + interfaccia.colore_accento,
        display: 'flex',
        alignItems: 'center',
        gap: interfaccia.spaziatura,
        backdropFilter: 'blur(8px)'
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: interfaccia.testo_normale,
          color: interfaccia.colore_testo
        }}
      >
        {testo}
      </span>
      <button
        type="button"
        onPointerDown={onAnnulla}
        style={{
          minHeight: 44,
          padding: '0 14px',
          borderRadius: interfaccia.raggio_angoli,
          border: 'none',
          background: stile.colore_annulla,
          color: interfaccia.colore_testo,
          fontFamily: 'inherit',
          fontSize: interfaccia.testo_piccolo,
          touchAction: 'manipulation'
        }}
      >
        {testoAnnulla || 'Annulla'}
      </button>
    </div>
  )
}
