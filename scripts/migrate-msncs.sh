#!/usr/bin/env bash
# One-shot migration of the raw drop-folders `files (1)/` and `files (2)/` into
# the docs taxonomy. Idempotent — running it twice produces the same output.
#
# Usage:  bash scripts/migrate-msncs.sh

set -euo pipefail
cd "$(dirname "$0")/.."
export LC_ALL=C.UTF-8

migrate_chapter() {
  local src="$1"           # source .md file
  local subject_slug="$2"  # e.g. next-gen-networks
  local subject_code="$3"  # e.g. ENCTNS501
  local subject_name="$4"  # e.g. Next Generation Network Technologies

  local dst_dir="docs/ioe/msncs/year-1-part-1/${subject_slug}/notes"
  local base number slug title position dst

  base="$(basename "$src" .md)"
  number="${base:2:2}"                      # ch01_foo  →  01
  slug="${base#ch??_}"                      # ch01_foo  →  foo
  position=$((10#$number))

  # Read first H1 as the title, then strip "Chapter NN — " prefix in pure bash
  title="$(awk '/^# / { sub(/^# /, ""); print; exit }' "$src")"
  local sidebar_label="$title"
  # Strip "Chapter N — " or "Chapter N -" from sidebar label, byte-safe
  sidebar_label="$(printf '%s' "$sidebar_label" | perl -CSD -pe 's/^Chapter\s+\d+\s*[\x{2014}\x{2013}-]\s*//')"
  sidebar_label="Ch ${number} — ${sidebar_label}"

  dst="${dst_dir}/${number}-${slug}.mdx"

  {
    printf -- '---\n'
    printf 'title: "%s"\n' "$title"
    printf 'sidebar_label: "%s"\n' "$sidebar_label"
    printf 'sidebar_position: %d\n' "$position"
    printf 'description: "Chapter %d of %s (%s)."\n' "$position" "$subject_name" "$subject_code"
    printf 'slug: /ioe/msncs/year-1-part-1/%s/notes/ch%s\n' "$subject_slug" "$number"
    printf 'tags: [msncs, year-1-part-1, %s, chapter, notes]\n' "$(printf '%s' "$subject_code" | tr '[:upper:]' '[:lower:]')"
    printf 'last_update:\n  date: %s\n  author: RaaZ Khanal\n' "$(date -u +%Y-%m-%d)"
    printf -- '---\n\n'
    # Skip the original H1 — frontmatter `title` becomes the page H1.
    tail -n +2 "$src"
  } > "$dst"

  echo "  ✓ ${dst}"
}

# ── Subject 1 ───────────────────────────────────────────────────────────────
echo "→ Next Generation Network Technologies (ENCTNS501)"
for f in "files (1)"/ch*.md; do
  migrate_chapter "$f" "next-gen-networks" "ENCTNS501" "Next Generation Network Technologies"
done

# ── Subject 2 ───────────────────────────────────────────────────────────────
echo "→ Cryptography and Data Security (ENCTNS502)"
for f in "files (2)"/ch*.md; do
  migrate_chapter "$f" "cryptography" "ENCTNS502" "Cryptography and Data Security"
done

# Stash the upstream syllabus files for reference — subject index pages cite them.
cp -f "files (1)/syllabus.md" "docs/ioe/msncs/year-1-part-1/next-gen-networks/_syllabus-source.md" 2>/dev/null || true
cp -f "files (2)/syllabus.md" "docs/ioe/msncs/year-1-part-1/cryptography/_syllabus-source.md"   2>/dev/null || true

echo "✓ Migration complete."
