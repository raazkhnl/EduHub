#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# seed-placeholder-courses.sh
#
# Replace every "Notes pending" placeholder index.mdx with a real subject
# overview that gives students useful orientation: what the course covers,
# its key topics, the kind of skills it builds, and onward references —
# even before per-chapter notes are written.
#
# Each file is overwritten in full. Run once after `scaffold-msncs.sh` and
# `migrate-msncs-content.sh`.
# ---------------------------------------------------------------------------
set -euo pipefail

LAST_UPDATE_DATE=$(date +%Y-%m-%d)

# Args:
#   $1 = target path (relative to repo root)
#   $2 = page title (frontmatter title)
#   $3 = subject category badge (CORE / ELECTIVE / PROJECT / COURSE / THESIS)
#   $4 = sidebar position
#   $5 = slug (URL slug, no leading slash)
#   $6 = course code or "TBD"
#   $7 = credits text (e.g. "4")
#   $8 = hours text (e.g. "60" or "—")
#   $9 = one-paragraph intro
#   $10 = topics block (markdown bullet list, multiline)
#   $11 = outcomes block (markdown bullet list, multiline)
#   $12 = references block (markdown list, multiline)
write_overview() {
  local path="$1" title="$2" badge="$3" pos="$4" slug="$5" code="$6" \
        credits="$7" hours="$8" intro="$9" topics="${10}" outcomes="${11}" \
        refs="${12}"
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<EOF
---
title: '$title'
sidebar_class_name: sidebar-overview-hidden
sidebar_position: 0
slug: /$slug
description: '$title — overview, syllabus topics, and onward references.'
last_update:
  date: $LAST_UPDATE_DATE
  author: RaaZ Khanal
---

# $title

> **Code:** $code · **Credits:** $credits · **Hours:** $hours · **Type:** $badge

$intro

## Key topics

$topics

## Learning outcomes

By the end of this subject, a student should be able to:

$outcomes

## Further reading

$refs

---

:::info Chapter notes
Detailed chapter-by-chapter notes for this subject are still being written.
The topic outline above mirrors the published syllabus. If you'd like to help
draft a chapter, see the [contributing guide](/contribute).
:::
EOF
  echo "[seeded] $path"
}

# ═══════════════════════════════════════════════════════════════════════════
# Y1P2 — Elective I options (Networking / systems)
# ═══════════════════════════════════════════════════════════════════════════

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-i/cyber-physical-systems/index.mdx" \
  "Cyber Physical Systems" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-i/cyber-physical-systems" \
  "TBD" "4" "60" \
  "Cyber-physical systems (CPS) are computational systems tightly coupled with the physical processes they sense, control, or actuate — industrial control, smart grids, autonomous vehicles, medical devices, robotics, and modern Industrial IoT. This elective builds the joint vocabulary of control systems, real-time networks, and the security model that emerges when bits and atoms share a feedback loop." \
"- Foundations of CPS: feedback control, sampling, real-time scheduling.
- ICS / SCADA architecture: PLCs, RTUs, HMIs, historians, fieldbus protocols (Modbus, DNP3, IEC 60870, IEC 61850).
- CPS attack surface: Stuxnet-class malware, replay, false-data injection, sensor spoofing.
- Safety vs security trade-offs in critical infrastructure.
- Defensive design: zoning (Purdue model), unidirectional gateways, anomaly detection on operational telemetry.
- Smart grid, water utilities, manufacturing, transport — case studies and Nepal-relevant infrastructure (NEA, NWSC, NAC)." \
"- Map a CPS deployment into the Purdue reference architecture and identify trust boundaries.
- Analyse a control loop for safety + security risks (timing, integrity, availability).
- Configure baseline hardening for ICS networks (segmentation, allow-listed flows).
- Read and explain published CPS incident post-mortems with the right framing." \
"- E.A. Lee & S.A. Seshia, _Introduction to Embedded Systems_ — foundational text on CPS.
- NIST SP 800-82 Rev 3, _Guide to OT Security_ (2023).
- ICS-CERT / CISA advisories archive.
- Langner, _Robust Control System Networks_ — practical hardening guide."

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-i/data-centric-networking/index.mdx" \
  "Data Centric Networking" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-i/data-centric-networking" \
  "TBD" "4" "60" \
  "Today's internet was designed to connect hosts, but most modern traffic asks for a specific piece of data — not a specific host. Information-Centric Networking (ICN) reorganises the network around named content. This elective covers ICN/NDN architecture, the security and caching model, and where it competes with (or complements) the IP stack." \
"- Why ICN: end-host bottleneck of IPv6, mobility, multi-source delivery, CDN duplication.
- Named Data Networking (NDN) and Content-Centric Networking (CCN) data plane.
- Naming conventions, signing, interest/data packet flow.
- In-network caching strategies (LRU, ARC, probabilistic).
- Forwarding strategies and the Pending Interest Table (PIT).
- ICN security: provenance via signatures, privacy and naming linkability.
- Comparative analysis with IP, HTTP/3, and CDN overlays." \
"- Explain why an IP-centric web struggles with mobility and multi-source delivery.
- Trace an NDN interest/data exchange end to end.
- Reason about caching policy under different traffic mixes.
- Evaluate the realistic deployment paths for ICN in the next 5–10 years." \
"- Zhang et al., _Named Data Networking_ (NSF FIA Project).
- Jacobson et al., _Networking Named Content_ (CCN paper).
- IRTF ICN Research Group RFCs.
- Open-source: NDN Forwarding Daemon (nfd-android), ndn-cxx."

# ═══════════════════════════════════════════════════════════════════════════
# Y1P2 — Elective II options (Specialty security)
# ═══════════════════════════════════════════════════════════════════════════

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-ii/wireless-network-security-and-privacy/index.mdx" \
  "Wireless Network Security and Privacy" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-ii/wireless-network-security-and-privacy" \
  "TBD" "4" "60" \
  "Wireless links — Wi-Fi, cellular, Bluetooth, NFC, LoRa, satellite — carry an outsized share of modern personal traffic, and each carries a distinct attack surface. This elective studies the radio layer, the protocols built on top, and the privacy implications of always-on identifiers." \
"- 802.11 protocol family: WEP, WPA2, WPA3, SAE handshake, PMF.
- Enterprise Wi-Fi: 802.1X, RADIUS, EAP method comparison.
- Bluetooth / BLE security: pairing modes, LE Secure Connections.
- Cellular security across 2G→5G: SIM, USIM, IMSI catchers, 5G authentication (5G-AKA, EAP-AKA').
- Localisation, privacy and MAC randomisation behaviour across OS versions.
- Lower-power wireless: Zigbee, Thread, LoRaWAN, NB-IoT.
- Real-world attacks: KRACK, Dragonblood, BlueBorne, BLESA, Stingray-class devices." \
"- Configure WPA3-Enterprise correctly on a real AP and explain the handshake.
- Detect rogue access points and IMSI catchers from a host or network perspective.
- Reason about identifier linkability across radio sessions.
- Apply the right pairing and link-layer encryption mode for IoT scenarios." \
"- Mathy Vanhoef's KRACK and Dragonblood papers.
- Wi-Fi Alliance specs (WPA3, WPA-Enterprise).
- 3GPP TS 33.501 (5G security architecture).
- Bishop, _Computer Security: Art and Science_, chapter on wireless."

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-ii/software-security/index.mdx" \
  "Software Security" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-ii/software-security" \
  "TBD" "4" "60" \
  "Most breaches start in code. This elective treats security as a property of software engineering — design, implementation, testing, supply chain — rather than as something layered on after deployment. Covers the secure development lifecycle, the classes of bugs that produce CVEs, and the tooling that catches them early." \
"- Threat modelling (STRIDE, attack trees, abuser stories).
- Memory-safety bugs in C/C++: buffer overflows, UAF, type confusion; modern mitigations (ASLR, CFI, MTE).
- Web-class bugs: injection, deserialisation, SSRF, prototype pollution.
- Cryptographic anti-patterns: ECB, predictable nonces, custom protocols.
- Code review, static analysis (semgrep, CodeQL), fuzzing (libFuzzer, AFL++, sanitizers).
- Supply chain: SBOM, dependency confusion, typosquatting, SLSA framework.
- Secure SDLC: SAMM, BSIMM, threat modelling in CI." \
"- Run a structured threat-model session on a new design and produce the artifact.
- Identify the top OWASP / CWE classes in unfamiliar code via review.
- Configure SAST/DAST/SCA in a CI pipeline and triage findings.
- Write a defensible vulnerability report and remediation plan." \
"- Howard & LeBlanc, _Writing Secure Code_, 2nd ed.
- McGraw, _Software Security: Building Security In_.
- OWASP Top 10 (current edition), ASVS, SAMM.
- CWE / CAPEC catalogues."

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-ii/cyber-warfare/index.mdx" \
  "Cyber Warfare" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-ii/cyber-warfare" \
  "TBD" "4" "60" \
  "Cyber warfare studies the use of computational power as an instrument of state and non-state conflict. The elective combines technical case-study analysis with international law, doctrine, and policy — covering the spectrum from espionage and sabotage to information operations and the legal grey zones around active defence." \
"- State actors, doctrine, and attribution: technical, geopolitical, and legal layers.
- Cyber operations as part of military doctrine — Estonia 2007, Georgia 2008, Ukraine 2014/2022.
- Critical infrastructure attacks: Stuxnet, BlackEnergy/Industroyer, NotPetya, Colonial Pipeline, SolarWinds.
- Influence operations, deepfakes, election interference.
- International law: Tallinn Manual 2.0, Geneva-era applicability to cyberspace.
- Deterrence, escalation ladders, and confidence-building measures.
- South-Asia regional posture and Nepal's positioning." \
"- Describe the actors, motivations, and tradecraft in a real cyber-conflict incident.
- Explain the limits of attribution and what kinds of evidence are admissible.
- Apply the Tallinn Manual framework to a hypothetical operation.
- Discuss Nepal-specific exposure (NPIX, NEA, NRB, government networks)." \
"- Tallinn Manual 2.0 on the International Law Applicable to Cyber Operations.
- T. Rid, _Cyber War Will Not Take Place_ + _Active Measures_.
- Healey, _A Fierce Domain: Conflict in Cyberspace_.
- Sanger, _The Perfect Weapon_."

write_overview \
  "docs/ioe/msncs/year-1-part-2/elective-ii/quantum-cryptography/index.mdx" \
  "Quantum Cryptography" "ELECTIVE" 0 \
  "ioe/msncs/year-1-part-2/elective-ii/quantum-cryptography" \
  "TBD" "4" "60" \
  "Quantum computing breaks the asymmetric primitives — RSA, ECC, classical Diffie-Hellman — that underpin most of today's authenticated key exchange. This elective covers both halves of the response: quantum key distribution (using quantum mechanics for unconditional secrecy on the wire) and post-quantum cryptography (classical algorithms believed hard against quantum attackers)." \
"- Quantum mechanics primer: superposition, entanglement, the no-cloning theorem.
- Quantum key distribution: BB84, E91, B92, decoy-state protocols.
- QKD network architectures: trusted-node networks, satellite QKD.
- Post-quantum cryptography families: lattice-based (Kyber, Dilithium), code-based (Classic McEliece), hash-based (SPHINCS+, XMSS), multivariate, isogeny.
- NIST PQC standardisation outcomes (FIPS 203/204/205, 2024).
- Hybrid TLS, crypto-agility, and migration planning.
- Quantum-safe deadlines for NRB / IRD / banking sector in Nepal." \
"- Explain the BB84 protocol and the security argument behind unconditional secrecy.
- Compare the main PQC families on performance, key size, and maturity.
- Plan a phased migration for a real PKI to hybrid + then PQC-only.
- Identify which standards organisations and regulators have already mandated PQC timelines." \
"- NIST PQC project pages and FIPS 203 / 204 / 205.
- Bernstein & Lange, _Post-Quantum Cryptography_ (Nature, 2017).
- Nielsen & Chuang, _Quantum Computation and Quantum Information_.
- ETSI QKD specifications."

# ═══════════════════════════════════════════════════════════════════════════
# Y2P1 — Elective III options (Defensive security)
# ═══════════════════════════════════════════════════════════════════════════

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iii/firewall-and-intrusion-detection-system/index.mdx" \
  "Firewall and Intrusion Detection System" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iii/firewall-and-intrusion-detection-system" \
  "TBD" "4" "60" \
  "Firewalls and IDS/IPS systems are still the two most common controls in any defensible network, and they have changed substantially in the last decade — application identification, TLS inspection, behaviour-based detection. This elective covers their architecture, tuning, evasion, and integration into a modern SOC." \
"- Stateful and next-generation firewalls (NGFW); application-layer identification.
- TLS / SSL decryption, the certificate-pinning problem, and selective bypass.
- IDS taxonomy: signature, anomaly, specification-based, behavioural ML.
- Snort / Suricata rules and the threat-intelligence pipeline.
- Evasion techniques: fragmentation, encoding, polymorphism, encrypted C2.
- WAF, RASP, and protocol-aware proxies.
- SOAR integration: alert triage, enrichment, response playbooks." \
"- Design a defence-in-depth firewall + IDS deployment for a small Nepali bank.
- Author and tune Snort / Suricata signatures from a packet capture.
- Evaluate an IDS evasion case and propose detection enhancements.
- Integrate alerts into a SIEM with correctly scoped enrichment." \
"- Stallings, _Network Security Essentials_, chapters on firewalls + IDS.
- _The Practice of Network Security Monitoring_ — Richard Bejtlich.
- Suricata / Snort / Zeek documentation.
- MITRE ATT&CK detection-engineering resources."

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iii/hardening-network-infrastructure/index.mdx" \
  "Hardening Network Infrastructure" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iii/hardening-network-infrastructure" \
  "TBD" "4" "60" \
  "The default configuration of a router, switch, or wireless controller is rarely the safe one. This elective covers concrete, vendor-aware hardening practices for the device, management plane, control plane, and routing fabric — and how to keep that hardening from drifting over time." \
"- Device baselines: AAA, RBAC, banners, NTP, syslog, hardware integrity.
- Management plane: out-of-band, secure protocols (SSHv2, NETCONF over TLS, gNMI).
- Control-plane policing, CoPP, BGP TTL security, RPKI / ROAs.
- Segmentation: VRFs, VLAN design, microsegmentation, zero-trust networking.
- Configuration audit (Cisco SAFE, CIS Benchmarks), drift detection, NCM tooling.
- Wireless hardening: rogue detection, RF planning, controller security.
- Resilience: hardware redundancy, BFD, graceful restart, evacuation drills." \
"- Apply a CIS Benchmark or vendor baseline and produce an evidence audit.
- Diagnose and remediate a control-plane DoS condition.
- Roll out RPKI ROAs for a small ISP / enterprise prefix portfolio.
- Build a configuration-drift detection workflow that scales beyond 50 devices." \
"- CIS Benchmarks (Cisco IOS, Junos, Arista EOS).
- NSA / CISA, _Network Infrastructure Security Guide_ (2022).
- Cisco SAFE Reference Guide.
- RFC 7454, _BGP Operations and Security_."

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iii/web-application-security/index.mdx" \
  "Web Application Security" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iii/web-application-security" \
  "TBD" "4" "60" \
  "Web applications are the most common entry point in modern breaches. This elective drills into how they fail, how to attack them safely (with permission), and — most usefully — how to make them durably hard to exploit. Hands-on labs run against intentionally-vulnerable apps." \
"- HTTP, sessions, cookies, same-origin policy, CORS, CSP.
- OWASP Top 10 (current edition): broken access control, injection, SSRF, deserialisation, SSRF, XXE.
- Authentication patterns: OAuth 2.1, OIDC, WebAuthn / passkeys.
- API security: REST, GraphQL, gRPC; rate-limiting and quota design.
- WAF strategy, virtual patching, bot defence.
- Modern fronts: prototype pollution, dependency confusion, SSRF in cloud metadata.
- Source-code review for web codebases, threat-modelling specific endpoints." \
"- Perform a structured web-app pentest from recon to report.
- Implement OAuth/OIDC + passkeys correctly on a sample app.
- Tune a WAF without breaking legitimate users.
- Write secure-by-default helper libraries for an internal framework." \
"- OWASP ASVS, WSTG, Cheat Sheet Series.
- Stuttard & Pinto, _The Web Application Hacker's Handbook_.
- PortSwigger Web Security Academy.
- _Real-World Bug Hunting_ — Peter Yaworski."

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iii/iot-security/index.mdx" \
  "IOT Security" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iii/iot-security" \
  "TBD" "4" "60" \
  "IoT spans home devices, industrial sensors, smart meters, vehicle telemetry, and a long tail of single-purpose hardware. The security model has to fit constrained devices, intermittent connectivity, and 10-year deployment lifetimes. This elective covers the stack, the threats, and the engineering trade-offs." \
"- IoT reference stack: device, gateway, cloud, mobile, network.
- Constrained-device cryptography (AES-CCM, ChaCha20-Poly1305, ECC).
- Secure boot, code signing, OTA update authentication and rollback protection.
- Protocols: MQTT, CoAP, AMQP — and their TLS/DTLS modes.
- Device identity: hardware root of trust, TPM/TEE, attestation.
- Privacy and lifecycle: ownership transfer, decommissioning, e-waste.
- Real-world incidents: Mirai, Verkada cameras, smart-meter mass attacks, NTC routers." \
"- Architect secure provisioning + OTA update for a fleet of 10k devices.
- Audit a vendor IoT stack against the IEC 62443 family.
- Implement constrained-device crypto correctly (no nonce reuse, no rolling-your-own).
- Plan privacy-conscious telemetry for a Nepal-context smart-meter rollout." \
"- IEC 62443 series.
- NIST IR 8259 / 8425.
- IoT Security Foundation _Best Practice Guidelines_.
- Cesare, _Practical IoT Hacking_."

# ═══════════════════════════════════════════════════════════════════════════
# Y2P1 — Elective IV options (Governance & professionalism)
# ═══════════════════════════════════════════════════════════════════════════

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iv/cyber-law-and-regulation-of-cyber-space/index.mdx" \
  "Cyber Law and Regulation of Cyber Space" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iv/cyber-law-and-regulation-of-cyber-space" \
  "TBD" "4" "60" \
  "This elective grounds the technical practitioner in the legal framework that surrounds their work — both Nepal's domestic law and the international regimes they intersect with. Covers data protection, cybercrime, electronic transactions, evidence rules, and cross-border enforcement." \
"- Nepal: Electronic Transactions Act 2063, Privacy Act 2075, Penal Code 2074 cyber chapter, Constitutional Article 28.
- Comparative analysis: GDPR (EU), CCPA/CPRA (California), DPDP Act 2023 (India).
- Cybercrime treaties: Budapest Convention, AU Malabo Convention, UN Cybercrime Treaty draft.
- Electronic evidence: Evidence Act 2031 in Nepal, chain of custody, expert testimony.
- Cross-border data flow, MLAT process, EU adequacy / SCCs.
- Intellectual property in software: copyright, patents (where applicable in Nepal), trade secret.
- Regulator landscape: NRB IT directives, NTA, Cyber Bureau under Nepal Police." \
"- Map a real-world incident to the applicable Nepali statute and identify reporting obligations.
- Draft a privacy policy compliant with Privacy Act 2075 and GDPR essentials.
- Explain the admissibility tests for electronic evidence in a Nepali court.
- Advise on cross-border data transfer requirements for a Nepali fintech." \
"- Government of Nepal: _Electronic Transactions Act 2063_, _Privacy Act 2075_, _Penal Code 2074_.
- Council of Europe, _Convention on Cybercrime_ (Budapest).
- EU Regulation 2016/679 (GDPR) full text.
- Smedinghoff, _Information Security Law_."

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iv/identity-and-access-management/index.mdx" \
  "Identity and Access Management" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iv/identity-and-access-management" \
  "TBD" "4" "60" \
  "Modern security architecture is identity-led: the network perimeter has all but dissolved, and every access decision is now made against a claim about who is requesting it. This elective covers the protocols, the lifecycle, and the privilege model that hold this together." \
"- Identity sources: directory services (LDAP, Active Directory), HR systems, federated SoR.
- Authentication factors and modern MFA: TOTP, push, FIDO2 / WebAuthn / passkeys.
- Federation protocols: SAML 2.0, OAuth 2.1, OIDC, SCIM, just-in-time provisioning.
- Privileged Access Management (PAM): vaulting, session recording, JIT elevation.
- Identity governance: access reviews, separation of duties, role mining.
- Zero-trust identity: device posture, conditional access, BeyondCorp pattern.
- Identity for non-human actors: service accounts, workload identity, SPIFFE/SPIRE." \
"- Design federation between a Nepali bank's AD and a SaaS HR system using OIDC.
- Implement FIDO2 / passkey authentication on a sample app.
- Roll out PAM for 50 admin users without breaking existing workflows.
- Run an access-recertification campaign and report the residual risk." \
"- NIST SP 800-63 series, _Digital Identity Guidelines_.
- OAuth 2.1, OIDC Core 1.0 specifications.
- Gartner IAM market guides.
- _Identity Attack Vectors_ — Haber & Rolls."

write_overview \
  "docs/ioe/msncs/year-2-part-1/elective-iv/vulnerability-assessment-and-penetration-testing/index.mdx" \
  "Vulnerability Assessment and Penetration Testing" "ELECTIVE" 0 \
  "ioe/msncs/year-2-part-1/elective-iv/vulnerability-assessment-and-penetration-testing" \
  "TBD" "4" "60" \
  "VAPT is the practical end of offensive security. This elective covers the full engagement lifecycle — scoping, recon, exploitation, post-exploitation, reporting — with explicit attention to legal and ethical boundaries. Aligns with industry frameworks (PTES, OWASP WSTG, OSSTMM)." \
"- Engagement scoping, rules of engagement, legal authorisation in Nepal.
- Reconnaissance: passive (OSINT), active (port scan, banner grabbing).
- Vulnerability scanning: Nessus / OpenVAS / Nuclei, CVSS interpretation, false-positive triage.
- Exploitation: Metasploit, custom payload development, modern AV/EDR evasion.
- Post-exploitation: privilege escalation, lateral movement, persistence, data exfil.
- Web, network, mobile, cloud, wireless, social-engineering pentest tracks.
- Reporting: executive summary, technical findings, remediation guidance, retest plan." \
"- Run a 5-day external pentest end to end and deliver a board-ready report.
- Translate raw findings into prioritised remediation with cost/impact estimates.
- Defend ethical and legal limits to a stakeholder mid-engagement.
- Coordinate a coordinated-disclosure timeline with a vendor." \
"- PTES Technical Guidelines.
- OWASP Web Security Testing Guide (WSTG).
- OSSTMM 3 — Open Source Security Testing Methodology Manual.
- _The Hacker Playbook 3_ — Peter Kim."

# ═══════════════════════════════════════════════════════════════════════════
# Y2P1 — Project + Y2P2 capstone subjects
# ═══════════════════════════════════════════════════════════════════════════

write_overview \
  "docs/ioe/msncs/year-2-part-1/project/index.mdx" \
  "Project" "PROJECT" 0 \
  "ioe/msncs/year-2-part-1/project" \
  "ENCTNS601" "4" "—" \
  "The Y2P1 Project is a major individual or two-person engineering effort that becomes the foundation for either the Y2P2 Industrial Project (course-based track) or the full thesis (research track). It is the moment in the degree where a student takes a real problem, designs a solution, and defends it." \
"- Problem definition: identifying a real-world gap (Nepal-context preferred).
- Literature survey: how to read research papers, manage a reading list, write a survey.
- System design: requirements, architecture, threat model, evaluation plan.
- Implementation: incremental milestones, version control hygiene.
- Evaluation: empirical results, benchmarks, ablation, statistical significance.
- Mid-term and final defence: presenting, defending, taking criticism.
- Documentation: project report, code repository, video walkthrough." \
"- Scope and decompose a 6-month engineering project into milestones.
- Write a literature survey that connects 15+ papers around a single thesis question.
- Defend technical choices under hostile but fair questioning.
- Produce a maintainable code artefact that another engineer can pick up." \
"- _The Craft of Research_ — Booth, Colomb, Williams.
- _Writing for Computer Science_ — Justin Zobel.
- IEEE and ACM author kits for thesis/project reports.
- Local DoECE thesis archive for reference dissertations."

write_overview \
  "docs/ioe/msncs/year-2-part-2/seminar/index.mdx" \
  "Seminar" "COURSE" 0 \
  "ioe/msncs/year-2-part-2/seminar" \
  "TBD" "2" "—" \
  "Course-based track only. The seminar is a structured presentation on a chosen research area — a focused literature review, an original analysis of a topic at the frontier, or a deep technical critique. Internally graded; supervised by a faculty member from DoECE." \
"- Identifying a tractable seminar topic at the right depth.
- Survey methodology: forward and backward citation, systematic search.
- Structuring a 45–60 minute talk for a faculty audience.
- Handling Q&A, defending interpretation, acknowledging limits.
- Producing the written companion report (typically 12–20 pages).
- Use of slides, demos, and live-coding where appropriate." \
"- Deliver a faculty-grade 45-minute talk with a written companion report.
- Critically read 25+ papers and synthesise a coherent narrative.
- Defend choice of scope and methodology in Q&A.
- Identify open problems suitable for follow-on research." \
"- Markel, _Technical Communication_, 12th ed.
- ACM/IEEE author kits.
- Past DoECE seminar reports (departmental archive)."

write_overview \
  "docs/ioe/msncs/year-2-part-2/cyber-threat-intelligence/index.mdx" \
  "Cyber Threat Intelligence" "COURSE" 0 \
  "ioe/msncs/year-2-part-2/cyber-threat-intelligence" \
  "TBD" "4" "—" \
  "Course-based track. CTI is the practice of collecting, analysing, and acting on information about adversaries so defenders can stay ahead instead of just behind. This subject covers the lifecycle, the analytic frameworks, and the sharing ecosystems that turn raw data into operational decisions." \
"- CTI lifecycle: direction, collection, processing, analysis, dissemination, feedback.
- Frameworks: MITRE ATT&CK, Diamond Model, Cyber Kill Chain, Pyramid of Pain.
- Strategic / operational / tactical / technical intelligence — audiences and outputs.
- Sources: open-source (OSINT), commercial feeds, sharing communities (ISACs, FS-ISAC), dark-web monitoring.
- Sharing protocols: STIX, TAXII, MISP.
- Adversary tracking: threat actor profiles, campaign analysis.
- Nepal-specific intelligence needs: financial sector, government, NPIX, civil society." \
"- Run a small CTI shop's full lifecycle from a single new alert.
- Map an observed intrusion to ATT&CK techniques and infer the actor's likely motivation.
- Use STIX/TAXII to share intelligence with peer organisations.
- Distinguish high-confidence attribution from speculation in finished intel products." \
"- Joint Publication 2-0 / FM 2-22.3 (intelligence-cycle primers).
- _The Threat Intelligence Handbook_ — Recorded Future.
- MITRE ATT&CK Enterprise + ICS matrices.
- _Intelligence-Driven Incident Response_ — Roberts & Brown."

write_overview \
  "docs/ioe/msncs/year-2-part-2/vulnerability-assessment-and-penetration-testing/index.mdx" \
  "Vulnerability Assessment and Penetration Testing" "COURSE" 0 \
  "ioe/msncs/year-2-part-2/vulnerability-assessment-and-penetration-testing" \
  "TBD" "4" "—" \
  "Course-based track capstone. A hands-on VAPT subject that builds on Y2P1's Elective IV option of the same name (if taken), but with stronger emphasis on real-engagement experience: scoping a deliverable, working under time pressure, and producing a report that a stakeholder will actually act on." \
"- Engagement lifecycle revisited: scoping, ROE, legal framing in Nepal.
- Recon at scale: subdomain enumeration, certificate transparency, content discovery.
- Network, web, mobile, cloud, AD pentest tracks — pick one to deep-dive.
- Modern evasion: TLS-encrypted C2, in-memory execution, AMSI bypass.
- Reporting workflows: Faraday, Dradis, custom templates.
- Post-engagement: remediation tracking, retest discipline, knowledge transfer.
- Building / sustaining a small VAPT team." \
"- Lead a one-week internal pentest of a Nepali bank or telco.
- Discover and report a previously-unknown vulnerability in a real codebase.
- Produce a board-ready VAPT report with defensible severity ratings.
- Mentor a junior tester through their first engagement." \
"- PTES Technical Guidelines, OWASP WSTG, OSSTMM 3.
- _Red Team Field Manual_ + _Blue Team Handbook_.
- HackTheBox / OffSec OSCP / PortSwigger labs.
- _The Hacker Playbook 3_."

write_overview \
  "docs/ioe/msncs/year-2-part-2/industrial-project-case-study/index.mdx" \
  "Industrial Project (Case Study)" "COURSE" 0 \
  "ioe/msncs/year-2-part-2/industrial-project-case-study" \
  "TBD" "6" "—" \
  "Course-based track final capstone (6 credits). Either an industry-anchored project (deliverable for a real organisation under a mentor agreement) or a substantial case study of an industry deployment with original analysis. Continues the Y2P1 Project where applicable." \
"- Identifying an industry partner and scoping a deliverable both sides accept.
- Working under industry constraints — confidentiality, deadlines, change requests.
- Producing a hand-over document the partner can use without you.
- Case-study methodology: data collection, interviews, triangulation, anonymisation.
- Reporting: executive deck, technical annex, defensible evaluation.
- Defence and viva at the end of the semester." \
"- Manage an industry stakeholder relationship through a 4-month engagement.
- Translate academic methodology into industry-acceptable artefacts.
- Write a case-study report worthy of publication or internal training.
- Defend project decisions to both academic and industrial examiners." \
"- Yin, _Case Study Research and Applications_, 6th ed.
- IEEE Std 1633 (Reliability program standard) — for engineering case studies.
- DoECE industry-collaboration framework."

write_overview \
  "docs/ioe/msncs/year-2-part-2/thesis/index.mdx" \
  "Thesis" "THESIS" 0 \
  "ioe/msncs/year-2-part-2/thesis" \
  "TBD" "16" "—" \
  "Research track final output (16 credits, replaces the entire Y2P2 course bundle). A standalone, original research thesis supervised by a DoECE faculty member, defended publicly at the end of the semester. The pivot from the course-based track has to be declared at the start of Semester III." \
"- Choosing a research question (novelty + tractability + supervisor fit).
- Detailed literature survey and gap analysis.
- Research methodology: experimental design, datasets, baselines, evaluation.
- Writing the thesis chapters: introduction, related work, methodology, results, discussion.
- Reproducibility: code release, dataset documentation, version-controlled experiments.
- Mid-term progress review, pre-defence, final defence.
- Publishing the work (workshop, conference, or journal target)." \
"- Frame and defend an original research question.
- Execute a research methodology that an independent examiner can replicate.
- Write a thesis at the depth expected by DoECE examiners.
- Defend the work publicly under hostile but fair questioning." \
"- _The Craft of Research_ — Booth, Colomb, Williams.
- _How to Write a Better Thesis_ — Evans, Gruba, Zobel.
- IEEE / ACM author kits.
- DoECE departmental thesis template + style guide."

echo ""
echo "All 18 placeholder overviews seeded."
