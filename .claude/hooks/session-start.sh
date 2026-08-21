#!/bin/bash
# Riallinea questa macchina con GitHub, all'inizio di ogni sessione.
#
# PERCHE' ESISTE
# Il computer su cui gira Claude e' temporaneo. Quando la sessione resta ferma
# viene spento, e al ritorno il disco del progetto viene ricostruito da una
# fotografia vecchia. E' successo sedici volte, cadendo sempre esattamente sullo
# stesso commit del 6 agosto (33f084a). Una volta e' stato colto sul fatto con
# "uptime: 0 minuti": macchina riavviata, disco tornato indietro.
# La memoria vera del progetto e' GitHub. Questo disco e' un foglio di brutta.
#
# DOVE VIVE, E PERCHE' IN DUE POSTI
#   1. nel progetto, .claude/hooks/     -> la copia buona, versionata su GitHub
#   2. in /root/.claude/hooks/          -> la copia che SOPRAVVIVE al riavvio
# La fotografia vecchia si porta via anche questo file: se il guardrail stesse
# solo dentro il progetto, sparirebbe insieme al lavoro che deve proteggere.
# La copia 2 e' fuori dal disco che torna indietro, quindi c'e' sempre. Ripara
# il progetto, e poi si riaggiorna da sola dalla copia 1 appena ripristinata.
#
# LA REGOLA DI SICUREZZA
# Non cancella mai niente che non sia gia' su GitHub. Se trova lavoro locale che
# il server non ha, si ferma e lo dice invece di riallineare. Le modifiche non
# salvate le mette da parte, non le butta.

set -uo pipefail

progetto="${CLAUDE_PROJECT_DIR:-/home/user/Tower-game}"
fuori="/root/.claude"

cd "$progetto" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# Fuori dal cloud (per esempio sul portatile di qualcuno) non serve.
[ "${CLAUDE_CODE_REMOTE:-}" != "true" ] && exit 0

# Il hook e' registrato sia nel progetto sia fuori, quindi puo' partire due
# volte di fila. La seconda non serve a niente: esce subito.
orologio="$fuori/.ultimo-riallineamento"
adesso=$(date +%s)
if [ -f "$orologio" ]; then
  scorso=$(cat "$orologio" 2>/dev/null || echo 0)
  [ $((adesso - scorso)) -lt 30 ] && exit 0
fi
mkdir -p "$fuori" && echo "$adesso" > "$orologio"

# ---------------------------------------------------------------- 1. il disco

ramo=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || exit 0
[ "$ramo" = "HEAD" ] && exit 0   # HEAD staccata: non so a cosa allinearmi

if ! git fetch origin --prune --quiet 2>/dev/null; then
  echo "Riallineamento: GitHub non risponde, lascio il disco com'e'."
  exit 0
fi

git rev-parse --verify --quiet "origin/$ramo" >/dev/null || exit 0

if [ "$(git rev-parse HEAD)" != "$(git rev-parse "origin/$ramo")" ]; then

  # Commit che stanno qui ma non su GitHub? Sono lavoro vero: non si tocca.
  avanti=$(git rev-list --count "origin/$ramo..HEAD" 2>/dev/null || echo 0)
  if [ "$avanti" -gt 0 ]; then
    echo "ATTENZIONE: $avanti commit sono solo su questo disco e NON su GitHub."
    echo "Non ho riallineato niente. Spingili subito:"
    echo "    git push -u origin $ramo"
    echo "Se la macchina si spegne prima, spariscono."
    exit 0
  fi

  indietro=$(git rev-list --count "HEAD..origin/$ramo" 2>/dev/null || echo 0)

  # Modifiche non salvate: messe da parte, si recuperano con 'git stash list'.
  if [ -n "$(git status --porcelain)" ]; then
    git stash push --include-untracked --quiet \
      --message "messe da parte dal riallineamento del $(date '+%d-%m-%Y %H:%M')" 2>/dev/null \
      && echo "C'erano modifiche non salvate: messe da parte ('git stash list' per riprenderle)."
  fi

  if git reset --hard "origin/$ramo" --quiet 2>/dev/null; then
    echo "Il disco era una fotografia vecchia, indietro di $indietro commit: riallineato con GitHub."
    echo "Ora siamo a: $(git log --oneline -1)"
  fi
fi

# ------------------------------------------------------ 2. le dipendenze

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules ]; then
  echo "Dipendenze da rimettere a posto..."
  npm install --silent >/dev/null 2>&1 \
    && echo "Dipendenze a posto." \
    || echo "ATTENZIONE: npm install non e' riuscito, 'npm run build' potrebbe fallire."
fi

# --------------------------------------------- 3. il guardrail si reinstalla

# Adesso che il progetto e' ripristinato, la copia fuori si riallinea a quella
# versionata. Cosi' una correzione fatta qui arriva anche alla copia salva-vita.
sorgente="$progetto/.claude/hooks/session-start.sh"
copia="$fuori/hooks/session-start.sh"
if [ -f "$sorgente" ] && ! cmp -s "$sorgente" "$copia"; then
  mkdir -p "$fuori/hooks" && cp "$sorgente" "$copia" && chmod +x "$copia"
fi

# E si assicura di essere registrato la' fuori, dove il riavvio non arriva.
impostazioni="$fuori/settings.json"
if [ ! -f "$impostazioni" ] || ! grep -q 'hooks/session-start.sh' "$impostazioni" 2>/dev/null; then
  cat > "$impostazioni" <<'FINE'
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": "/root/.claude/hooks/session-start.sh" }
        ]
      }
    ]
  }
}
FINE
fi

exit 0
