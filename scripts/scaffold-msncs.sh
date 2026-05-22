#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# scaffold-msncs.sh — one-time scaffold for the MSNCS program shell.
#
# Creates _category_.json + index.mdx placeholder for every subject and
# elective option in the published syllabus, so the sidebar reflects the
# real degree structure even before notes are written.
#
# Idempotent: skips files that already exist (so existing Y1P1 notes for
# next-gen-networks/ and cryptography/ are not clobbered).
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="docs/ioe/msncs"

# Write only if file doesn't exist.
write_once() {
  local path="$1"
  local content="$2"
  if [ -e "$path" ]; then
    echo "[skip] $path"
    return
  fi
  mkdir -p "$(dirname "$path")"
  printf "%s" "$content" > "$path"
  echo "[new]  $path"
}

# Args: dir, label, position, slug, code, credits, hours, summary
subject() {
  local dir="$1" label="$2" position="$3" slug="$4" code="$5" credits="$6" hours="$7" summary="$8"

  write_once "$dir/_category_.json" \
"{
  \"label\": \"$label\",
  \"position\": $position,
  \"collapsed\": true,
  \"link\": { \"type\": \"doc\", \"id\": \"$slug/index\" }
}
"

  write_once "$dir/index.mdx" \
"---
title: '$label${code:+ ($code)}'
sidebar_label: Overview
sidebar_position: 0
slug: /$slug
description: '$summary'
---

# $label

> **Code:** ${code:-TBD} · **Credits:** $credits · **Program:** M.Sc. Network & Cybersecurity · **Hours:** ${hours:-TBD}

$summary

## Chapter notes

Notes for this subject have not yet been written. If you'd like to contribute,
read the [contributing guide](/contribute) — it covers the taxonomy, frontmatter
conventions, and PR workflow.

## Companion resources

Resources will appear here as soon as the chapter notes land.
"
}

# Args: dir, label, position, slug, topics_block
elective_option() {
  local dir="$1" label="$2" position="$3" slug="$4" topics="$5"

  write_once "$dir/_category_.json" \
"{
  \"label\": \"$label\",
  \"position\": $position,
  \"collapsed\": true,
  \"link\": { \"type\": \"doc\", \"id\": \"$slug/index\" }
}
"

  write_once "$dir/index.mdx" \
"---
title: '$label'
sidebar_label: '$label'
sidebar_position: 0
slug: /$slug
description: 'MSNCS elective option — $label.'
---

# $label

> **Type:** Elective option · **Credits:** 4 · **Program:** M.Sc. Network & Cybersecurity

This is one of the elective options offered under the parent elective slot.
Students select one of the listed options per slot.

## Suggested topics

$topics

## Chapter notes

Notes for this elective option are not yet written. To start, follow the
[contributing guide](/contribute).
"
}

# Args: dir, slot_label, slot_position, slot_slug, slot_summary
elective_slot() {
  local dir="$1" label="$2" position="$3" slug="$4" summary="$5"

  write_once "$dir/_category_.json" \
"{
  \"label\": \"$label\",
  \"position\": $position,
  \"collapsed\": true,
  \"link\": { \"type\": \"doc\", \"id\": \"$slug/index\" }
}
"

  write_once "$dir/index.mdx" \
"---
title: '$label'
sidebar_label: Overview
sidebar_position: 0
slug: /$slug
description: '$summary'
---

import DocCardList from '@theme/DocCardList';

# $label

> **Credits:** 4 · **Program:** M.Sc. Network & Cybersecurity

$summary

## Available options

Pick **one** of the following options for this elective slot.

<DocCardList />
"
}

# ─── Year I · Part I — add missing core subjects ────────────────────────────
subject "$ROOT/year-1-part-1/machine-learning-data-analytics" \
  "Machine Learning & Data Analytics" 3 \
  "ioe/msncs/year-1-part-1/machine-learning-data-analytics" \
  "ENCTNS503" 4 "60" \
  "Supervised/unsupervised learning, model evaluation, neural networks, and applied data analytics for security and networking."

subject "$ROOT/year-1-part-1/research-methods" \
  "Research Methods" 4 \
  "ioe/msncs/year-1-part-1/research-methods" \
  "ENCTNS504" 4 "60" \
  "Research design, literature review, quantitative & qualitative methods, academic writing, and scholarly publication conventions."

# ─── Year I · Part II ───────────────────────────────────────────────────────
subject "$ROOT/year-1-part-2/digital-forensics-incident-response" \
  "Digital Forensics & Incident Response" 1 \
  "ioe/msncs/year-1-part-2/digital-forensics-incident-response" \
  "ENCTNS551" 4 "60" \
  "Forensic process, evidence handling, disk/memory/network forensics, incident response playbooks and case studies."

subject "$ROOT/year-1-part-2/information-systems-audit" \
  "Information Systems Audit" 2 \
  "ioe/msncs/year-1-part-2/information-systems-audit" \
  "ENCTNS552" 4 "60" \
  "Audit frameworks (COBIT, ISO 27001, NIST), risk assessment, IT general controls, evidence collection and audit reporting."

elective_slot "$ROOT/year-1-part-2/elective-i" \
  "Elective I" 3 \
  "ioe/msncs/year-1-part-2/elective-i" \
  "Networking-leaning specialisation. Pick one of five offered options."

elective_option "$ROOT/year-1-part-2/elective-i/routing-and-switching" \
  "Routing and Switching" 1 \
  "ioe/msncs/year-1-part-2/elective-i/routing-and-switching" \
  "- Modern IGPs (OSPFv3, IS-IS), BGP best practices, route reflectors, VRFs.
- Switching: VLAN, STP variants, MLAG, EVPN-VXLAN overlays.
- Traffic engineering, QoS, fast reroute."

elective_option "$ROOT/year-1-part-2/elective-i/managing-secure-network-systems" \
  "Managing Secure Network Systems" 2 \
  "ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems" \
  "- Network management frameworks (SNMP, NETCONF, gNMI), telemetry pipelines.
- Hardening device baselines, change control, secure operations.
- Compliance and continuous monitoring."

elective_option "$ROOT/year-1-part-2/elective-i/cyber-physical-systems" \
  "Cyber Physical Systems" 3 \
  "ioe/msncs/year-1-part-2/elective-i/cyber-physical-systems" \
  "- CPS architecture, ICS/SCADA, control loops with networked sensors.
- Threat model and attacks (Stuxnet-class), safety vs security trade-offs.
- Defensive design and segmentation."

elective_option "$ROOT/year-1-part-2/elective-i/data-centric-networking" \
  "Data Centric Networking" 4 \
  "ioe/msncs/year-1-part-2/elective-i/data-centric-networking" \
  "- Information-Centric Networking (ICN), NDN, CCN.
- Content naming, in-network caching, security model.
- Comparative study with IP-centric networking."

elective_option "$ROOT/year-1-part-2/elective-i/intelligent-networking" \
  "Intelligent Networking" 5 \
  "ioe/msncs/year-1-part-2/elective-i/intelligent-networking" \
  "- AI/ML for traffic classification, anomaly detection, capacity planning.
- Intent-Based Networking (IBN), closed-loop automation.
- Self-driving networks: opportunities and risks."

elective_slot "$ROOT/year-1-part-2/elective-ii" \
  "Elective II" 4 \
  "ioe/msncs/year-1-part-2/elective-ii" \
  "Specialised security topics. Pick one of five offered options."

elective_option "$ROOT/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing" \
  "Security and Privacy in Cloud Computing" 1 \
  "ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing" \
  "- IaaS/PaaS/SaaS threat model, shared-responsibility, identity boundaries.
- Data protection, multi-tenancy, key management.
- Privacy regulation and cross-border data flows."

elective_option "$ROOT/year-1-part-2/elective-ii/wireless-network-security-and-privacy" \
  "Wireless Network Security and Privacy" 2 \
  "ioe/msncs/year-1-part-2/elective-ii/wireless-network-security-and-privacy" \
  "- 802.11 / 802.15 / 802.16 attack surfaces, WPA2/WPA3 internals.
- Cellular (2G–5G) security architectures, IMSI catchers.
- Privacy and tracking in wireless infrastructure."

elective_option "$ROOT/year-1-part-2/elective-ii/software-security" \
  "Software Security" 3 \
  "ioe/msncs/year-1-part-2/elective-ii/software-security" \
  "- Secure development lifecycle, threat modelling, code review.
- Memory-safety bugs, web vulnerabilities, fuzzing, static analysis.
- Supply-chain security."

elective_option "$ROOT/year-1-part-2/elective-ii/cyber-warfare" \
  "Cyber Warfare" 4 \
  "ioe/msncs/year-1-part-2/elective-ii/cyber-warfare" \
  "- State actors, attribution, cyber conflict doctrine.
- Critical infrastructure attacks, deterrence, international law.
- Case studies (Stuxnet, NotPetya, SolarWinds)."

elective_option "$ROOT/year-1-part-2/elective-ii/quantum-cryptography" \
  "Quantum Cryptography" 5 \
  "ioe/msncs/year-1-part-2/elective-ii/quantum-cryptography" \
  "- Quantum key distribution (BB84, E91), QKD network architectures.
- Post-quantum cryptography (lattice, code-based, hash-based).
- Hybrid migration strategies."

# ─── Year II · Part I ───────────────────────────────────────────────────────
subject "$ROOT/year-2-part-1/project" \
  "Project" 1 \
  "ioe/msncs/year-2-part-1/project" \
  "ENCTNS601" 4 "—" \
  "Major individual project — problem identification, literature, design, implementation and defence. Carries forward into the Y2P2 industrial project for course-based students."

elective_slot "$ROOT/year-2-part-1/elective-iii" \
  "Elective III" 2 \
  "ioe/msncs/year-2-part-1/elective-iii" \
  "Defensive security and operational hardening track. Pick one of five offered options."

elective_option "$ROOT/year-2-part-1/elective-iii/firewall-and-intrusion-detection-system" \
  "Firewall and Intrusion Detection System" 1 \
  "ioe/msncs/year-2-part-1/elective-iii/firewall-and-intrusion-detection-system" \
  "- Stateful firewalls, NGFW, application identification, decryption.
- IDS/IPS taxonomy, signature vs anomaly engines, evasion.
- SIEM integration, alert triage."

elective_option "$ROOT/year-2-part-1/elective-iii/hardening-network-infrastructure" \
  "Hardening Network Infrastructure" 2 \
  "ioe/msncs/year-2-part-1/elective-iii/hardening-network-infrastructure" \
  "- Device baselines, AAA, secure management planes, RPKI.
- Segmentation, zero-trust networking, microsegmentation.
- Configuration audit and drift control."

elective_option "$ROOT/year-2-part-1/elective-iii/web-application-security" \
  "Web Application Security" 3 \
  "ioe/msncs/year-2-part-1/elective-iii/web-application-security" \
  "- OWASP Top 10 (current edition) with practical labs.
- Authentication/authorisation, session security, CSRF/SSRF, deserialisation.
- WAF strategy and bypass techniques."

elective_option "$ROOT/year-2-part-1/elective-iii/iot-security" \
  "IOT Security" 4 \
  "ioe/msncs/year-2-part-1/elective-iii/iot-security" \
  "- IoT stack threats (device, gateway, cloud, mobile, network).
- Constrained-device cryptography, secure boot, OTA updates.
- Privacy and lifecycle management."

elective_option "$ROOT/year-2-part-1/elective-iii/generative-ai-and-security" \
  "Generative AI and Security" 5 \
  "ioe/msncs/year-2-part-1/elective-iii/generative-ai-and-security" \
  "- Threat surface of GenAI systems (prompt injection, jailbreaks, data exfil).
- Using GenAI defensively for detection, triage, code-review augmentation.
- Governance, evaluation and red-teaming."

elective_slot "$ROOT/year-2-part-1/elective-iv" \
  "Elective IV" 3 \
  "ioe/msncs/year-2-part-1/elective-iv" \
  "Governance, law and professionalism track. Pick one of five offered options."

elective_option "$ROOT/year-2-part-1/elective-iv/cyber-law-and-regulation-of-cyber-space" \
  "Cyber Law and Regulation of Cyber Space" 1 \
  "ioe/msncs/year-2-part-1/elective-iv/cyber-law-and-regulation-of-cyber-space" \
  "- Nepal's Electronic Transactions Act, comparative analysis with global laws.
- Privacy laws (GDPR, CCPA), data localisation, cross-border requests.
- Cybercrime treaties, evidence admissibility."

elective_option "$ROOT/year-2-part-1/elective-iv/identity-and-access-management" \
  "Identity and Access Management" 2 \
  "ioe/msncs/year-2-part-1/elective-iv/identity-and-access-management" \
  "- IAM architecture, federation, SAML/OAuth/OIDC.
- Privileged access management, MFA, FIDO2/passkeys.
- Identity governance and lifecycle."

elective_option "$ROOT/year-2-part-1/elective-iv/vulnerability-assessment-and-penetration-testing" \
  "Vulnerability Assessment and Penetration Testing" 3 \
  "ioe/msncs/year-2-part-1/elective-iv/vulnerability-assessment-and-penetration-testing" \
  "- Methodologies (PTES, OWASP, NIST). Recon, exploitation, post-exploit.
- Network, web, mobile, cloud assessment.
- Reporting, remediation tracking, retest."

elective_option "$ROOT/year-2-part-1/elective-iv/information-systems-security-professionalism" \
  "Information Systems Security Professionalism" 4 \
  "ioe/msncs/year-2-part-1/elective-iv/information-systems-security-professionalism" \
  "- Professional ethics, codes of conduct, certifications landscape.
- Career paths, security program leadership, communication with the business.
- Building and defending security programs."

elective_option "$ROOT/year-2-part-1/elective-iv/security-and-audit-practitioner" \
  "Security and Audit Practitioner" 5 \
  "ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner" \
  "- Practical audit techniques across cloud, on-prem, applications.
- Control testing, sampling, evidence requirements.
- Reporting and remediation follow-up."

# ─── Year II · Part II — choose track ───────────────────────────────────────
subject "$ROOT/year-2-part-2/seminar" \
  "Seminar" 1 \
  "ioe/msncs/year-2-part-2/seminar" \
  "" 2 "—" \
  "Course-based track only. Seminar presentation on a chosen research area, supervised by the department."

subject "$ROOT/year-2-part-2/cyber-threat-intelligence" \
  "Cyber Threat Intelligence" 2 \
  "ioe/msncs/year-2-part-2/cyber-threat-intelligence" \
  "" 4 "—" \
  "Course-based track. CTI lifecycle, sources, tradecraft (MITRE ATT&CK / Diamond Model), tactical/operational/strategic intelligence, sharing (STIX/TAXII)."

subject "$ROOT/year-2-part-2/vulnerability-assessment-and-penetration-testing" \
  "Vulnerability Assessment and Penetration Testing" 3 \
  "ioe/msncs/year-2-part-2/vulnerability-assessment-and-penetration-testing" \
  "" 4 "—" \
  "Course-based track. Hands-on VAPT — methodology, tooling, scoping, reporting. Mirrors the Elective IV option in scope but graded as a final-semester capstone subject."

subject "$ROOT/year-2-part-2/industrial-project-case-study" \
  "Industrial Project (Case Study)" 4 \
  "ioe/msncs/year-2-part-2/industrial-project-case-study" \
  "" 6 "—" \
  "Course-based track capstone. Industry-anchored case study or applied project, evaluated by the department + industry mentor."

subject "$ROOT/year-2-part-2/thesis" \
  "Thesis" 5 \
  "ioe/msncs/year-2-part-2/thesis" \
  "" 16 "—" \
  "Thesis track. 16-credit standalone research output. Students choosing this track instead of the course-based bundle work on a single thesis with a faculty supervisor."

echo ""
echo "Done."
