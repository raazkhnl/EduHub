#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# cleanup-subject-overviews.sh
#
# For every MSNCS subject that now has real chapter content (syllabus.mdx +
# notes/*.mdx), drop the standalone index.mdx and switch its parent
# _category_.json to a generated-index landing. This stops Docusaurus from
# showing a duplicate "Overview" entry next to each subject in the sidebar.
#
# Subjects WITHOUT chapters (true placeholders) keep their index.mdx — that
# file is the only thing they have to show.
# ---------------------------------------------------------------------------
set -euo pipefail

DST="docs/ioe/msncs"

# Subject relative paths that have full content (syllabus + chapters).
populated=(
  "year-1-part-1/next-gen-networks"
  "year-1-part-1/cryptography"
  "year-1-part-1/machine-learning-data-analytics"
  "year-1-part-1/research-methods"
  "year-1-part-2/digital-forensics-incident-response"
  "year-1-part-2/information-systems-audit"
  "year-1-part-2/elective-i/routing-and-switching"
  "year-1-part-2/elective-i/managing-secure-network-systems"
  "year-1-part-2/elective-i/intelligent-networking"
  "year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing"
  "year-2-part-1/elective-iii/generative-ai-and-security"
  "year-2-part-1/elective-iv/security-and-audit-practitioner"
  "year-2-part-1/elective-iv/information-systems-security-professionalism"
)

# Get display label from existing _category_.json (preserve it).
get_label() {
  local cat_file="$1"
  if [ -f "$cat_file" ]; then
    sed -n 's/.*"label"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$cat_file" | head -1
  fi
}

get_position() {
  local cat_file="$1"
  if [ -f "$cat_file" ]; then
    local p=$(sed -n 's/.*"position"[[:space:]]*:[[:space:]]*\([0-9]*\).*/\1/p' "$cat_file" | head -1)
    echo "${p:-1}"
  else
    echo "1"
  fi
}

for sub in "${populated[@]}"; do
  dir="$DST/$sub"
  cat_file="$dir/_category_.json"
  idx_file="$dir/index.mdx"

  if [ ! -d "$dir" ]; then
    echo "[skip] $dir (missing)"
    continue
  fi

  label=$(get_label "$cat_file")
  [ -z "$label" ] && label=$(basename "$sub" | sed 's/-/ /g; s/\<./\u&/g')
  position=$(get_position "$cat_file")

  # Rewrite _category_.json with generated-index link.
  cat > "$cat_file" <<EOF
{
  "label": "$label",
  "position": $position,
  "collapsed": true,
  "link": {
    "type": "generated-index",
    "title": "$label",
    "description": "Syllabus and chapter notes for $label.",
    "slug": "/ioe/msncs/$sub"
  }
}
EOF

  # Delete the old standalone index.mdx (it was the duplicate Overview).
  if [ -f "$idx_file" ]; then
    rm "$idx_file"
    echo "[rm]   $idx_file"
  fi
  echo "[cat]  $cat_file (-> generated-index)"
done

echo ""
echo "Cleanup done."
