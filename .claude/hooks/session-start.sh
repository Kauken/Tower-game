#!/bin/bash
# Riallinea questa macchina con GitHub, all'inizio di ogni sessione.
#
# PERCHE' ESISTE
# Il computer su cui gira Claude e' temporaneo: quando la sessione resta ferma
# viene spento, e al ritorno viene ricostruito da una fotografia del disco
# vecchia di settimane. E' successo quindici volte, cadendo sempre esattamente
# sullo stesso commit. La memoria vera del progetto e' GitHub; questo disco e'
# un foglio di brutta. Questo script se ne accorge da solo.
#
# LA REGOLA DI SICUREZZA
# Non cancella mai niente che non sia gia' su GitHub. Se trova lavoro locale
# che il server non ha, si ferma e lo dice, invece di riallineare.

set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0

# Fuori dal cloud (per esempio sul portatile di qualcuno) non serve e non tocca niente.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

ramo=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || exit 0
[ "$ramo" = "HEAD" ] && exit 0   # HEAD staccata: non so a cosa allinearmi, non tocco

if ! git fetch origin --prune --quiet 2>/dev/null; then
  echo "Riallineamento: GitHub non risponde, lascio il disco com'e'."
  exit 0
fi

git rev-parse --verify --quiet "origin/$ramo" >/dev/null || exit 0

locale=$(git rev-parse HEAD)
remoto=$(git rev-parse "origin/$ramo")

if [ "$locale" != "$remoto" ]; then

  # Ci sono commit qui che su GitHub non ci sono? Allora sono lavoro vero: non si tocca.
  avanti=$(git rev-list --count "origin/$ramo..HEAD" 2>/dev/null || echo 0)
  if [ "$avanti" -gt 0 ]; then
    echo "ATTENZIONE: $avanti commit sono solo su questo disco e NON su GitHub."
    echo "Non ho riallineato niente. Spingili subito ('git push -u origin $ramo')"
    echo "prima di fare altro: se la macchina si spegne, spariscono."
    exit 0
  fi

  indietro=$(git rev-list --count "HEAD..origin/$ramo" 2>/dev/null || echo 0)

  # Modifiche non salvate: non le butto, le metto da parte (si recuperano con 'git stash list').
  if [ -n "$(git status --porcelain)" ]; then
    git stash push --include-untracked --quiet \
      --message "messe da parte dal riallineamento del $(date '+%d-%m-%Y %H:%M')" 2>/dev/null \
      && echo "C'erano modifiche non salvate: messe da parte, si recuperano con 'git stash list'."
  fi

  if git reset --hard "origin/$ramo" --quiet 2>/dev/null; then
    echo "Il disco era indietro di $indietro commit (fotografia vecchia): riallineato con GitHub."
    echo "Ora siamo a: $(git log --oneline -1)"
  fi
fi

# Anche le dipendenze fanno parte della fotografia vecchia.
if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "Dipendenze da rimettere a posto..."
  npm install --silent >/dev/null 2>&1 \
    && echo "Dipendenze a posto." \
    || echo "ATTENZIONE: npm install non e' riuscito, 'npm run build' potrebbe fallire."
fi

exit 0
