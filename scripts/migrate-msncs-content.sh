#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# migrate-msncs-content.sh
#
# Convert raw .md study notes in files msncs-study-notes/ into Docusaurus-
# ready .mdx files under docs/ioe/msncs/, placed per the OFFICIAL DoECE
# syllabus (the source folder structure is flat under year-1/part-2/ but
# the canonical placement differs by year/part/elective-slot).
#
# For each subject:
#   - syllabus.md -> {target}/syllabus.mdx   (sidebar_position 1)
#   - chNN_*.md   -> {target}/notes/NN-*.mdx (sidebar_position N)
#
# Existing files are OVERWRITTEN — this is intentional, the previous Y1P1
# notes were corrupted by Prettier and need replacement.
# ---------------------------------------------------------------------------
set -euo pipefail

SRC="files msncs-study-notes"
DST="docs/ioe/msncs"
LAST_UPDATE_DATE=$(date +%Y-%m-%d)

# Write {syllabus|chapter} mdx given:
#   $1 = source .md path
#   $2 = target .mdx path
#   $3 = title (frontmatter title)
#   $4 = sidebar_label
#   $5 = sidebar_position
#   $6 = description
#   $7 = slug (URL slug, no leading slash)
#   $8 = course code (used in tags)
write_mdx() {
  local src="$1" dst="$2" title="$3" sidebar_label="$4" position="$5" \
        description="$6" slug="$7" code="$8"
  mkdir -p "$(dirname "$dst")"
  {
    echo "---"
    echo "title: '$title'"
    echo "sidebar_label: '$sidebar_label'"
    echo "sidebar_position: $position"
    echo "description: '$description'"
    echo "slug: /$slug"
    echo "tags: [msncs, $code, notes]"
    echo "last_update:"
    echo "  date: $LAST_UPDATE_DATE"
    echo "  author: Rajesh Khanal"
    echo "---"
    echo ""
    # Source files start with `# Chapter N — Title` on line 1.
    # Strip lines 1–2 (h1 + blank).
    tail -n +3 "$src"
  } > "$dst"
}

# Migrate a subject: copy syllabus + all chapters.
# Args:
#   $1 = source folder name in files msncs-study-notes/...
#   $2 = relative target dir under docs/ioe/msncs/
#   $3 = subject display name
#   $4 = course code
migrate_subject() {
  local src_dir="$SRC/$1"
  local dst_dir="$DST/$2"
  local subject_name="$3"
  local code="$4"
  local slug_prefix="ioe/msncs/$2"

  if [ ! -d "$src_dir" ]; then
    echo "[skip] $src_dir (not found)"
    return
  fi

  # Syllabus
  if [ -f "$src_dir/syllabus.md" ]; then
    write_mdx "$src_dir/syllabus.md" \
              "$dst_dir/syllabus.mdx" \
              "Syllabus — $subject_name" \
              "Syllabus" \
              1 \
              "Official syllabus for $subject_name ($code)." \
              "$slug_prefix/syllabus" \
              "$code"
    echo "[ok]   $dst_dir/syllabus.mdx"
  fi

  # Chapters
  for chf in "$src_dir"/ch*.md; do
    [ -e "$chf" ] || continue
    local base=$(basename "$chf" .md)
    # Extract chapter number (ch01 -> 01) and slug (intro-cryptography)
    local chnum=$(echo "$base" | sed -E 's/^ch0*([0-9]+)_.*$/\1/')
    local chslug=$(echo "$base" | sed -E 's/^ch[0-9]+_//')
    local padded=$(printf "%02d" "$chnum")
    # First line of the .md is "# Chapter N — Title"
    local first_line=$(head -n 1 "$chf")
    # Strip leading "# Chapter N — " (or em/en/hyphen) to get just the title
    local title=$(echo "$first_line" | sed -E 's/^# Chapter [0-9]+[^A-Za-z]+//')
    local sidebar_label="Ch $padded — $title"

    write_mdx "$chf" \
              "$dst_dir/notes/$padded-$chslug.mdx" \
              "Chapter $chnum — $title" \
              "$sidebar_label" \
              "$chnum" \
              "Chapter $chnum of $subject_name ($code)." \
              "$slug_prefix/notes/ch$padded" \
              "$code"
    echo "[ok]   $dst_dir/notes/$padded-$chslug.mdx"
  done

  # Notes folder _category_.json
  cat > "$dst_dir/notes/_category_.json" <<EOF
{ "label": "Chapter Notes", "position": 2, "collapsed": false }
EOF
}

# ═══════════════════════════════════════════════════════════════════════════
# Canonical placement per official MSNCS syllabus
# ═══════════════════════════════════════════════════════════════════════════

# ─── Y1P1 Cores ───────────────────────────────────────────────────────────
migrate_subject "year-1/part-2/enctns501-next-gen-network-tech" \
                "year-1-part-1/next-gen-networks" \
                "Next Generation Network Technologies" "ENCTNS501"

migrate_subject "year-1/part-2/enctns502-cryptography-and-data-security" \
                "year-1-part-1/cryptography" \
                "Cryptography and Data Security" "ENCTNS502"

migrate_subject "year-1/part-2/enctns503-machine-learning-and-data-analytics" \
                "year-1-part-1/machine-learning-data-analytics" \
                "Machine Learning and Data Analytics" "ENCTNS503"

migrate_subject "year-1/part-2/enctns504-research-methods" \
                "year-1-part-1/research-methods" \
                "Research Methods" "ENCTNS504"

# ─── Y1P2 Cores ───────────────────────────────────────────────────────────
migrate_subject "year-1/part-2/enctns551-digital-forensics-and-incident-response" \
                "year-1-part-2/digital-forensics-incident-response" \
                "Digital Forensics and Incident Response" "ENCTNS551"

migrate_subject "year-1/part-2/enctns552-information-systems-audit" \
                "year-1-part-2/information-systems-audit" \
                "Information Systems Audit" "ENCTNS552"

# ─── Y1P2 Elective I ──────────────────────────────────────────────────────
migrate_subject "year-1/part-2/enctns561-routing-and-switching" \
                "year-1-part-2/elective-i/routing-and-switching" \
                "Routing and Switching" "ENCTNS561"

migrate_subject "year-1/part-2/enctns562-managing-secure-networks" \
                "year-1-part-2/elective-i/managing-secure-network-systems" \
                "Managing Secure Network Systems" "ENCTNS562"

migrate_subject "year-1/part-2/enctns565-intelligent-networking" \
                "year-1-part-2/elective-i/intelligent-networking" \
                "Intelligent Networking" "ENCTNS565"

# ─── Y1P2 Elective II ─────────────────────────────────────────────────────
migrate_subject "year-1/part-2/enctns571-cloud-security-privacy" \
                "year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing" \
                "Security and Privacy in Cloud Computing" "ENCTNS571"

# ─── Y2P1 Elective III ────────────────────────────────────────────────────
migrate_subject "year-1/part-2/enctns615-genai-and-security" \
                "year-2-part-1/elective-iii/generative-ai-and-security" \
                "Generative AI and Security" "ENCTNS615"

# ─── Y2P1 Elective IV ─────────────────────────────────────────────────────
migrate_subject "year-2/part-1/enctns625-security-audit-practitioner" \
                "year-2-part-1/elective-iv/security-and-audit-practitioner" \
                "Security and Audit Practitioner" "ENCTNS625"

migrate_subject "year-2/part-2/infosec-professionalism" \
                "year-2-part-1/elective-iv/information-systems-security-professionalism" \
                "Information Systems Security Professionalism" "INFOSEC-PRO"

echo ""
echo "Migration done."
