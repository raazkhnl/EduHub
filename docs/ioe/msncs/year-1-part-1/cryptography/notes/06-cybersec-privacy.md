---
title: 'Chapter 6 — Cyber Security and Data Privacy'
sidebar_label: 'Ch 06 — Cyber Security and Data Privacy'
sidebar_position: 6
description: 'Chapter 6 of Cryptography and Data Security (ENCTNS502).'
slug: /ioe/msncs/year-1-part-1/cryptography/notes/ch06
tags: [msncs, ENCTNS502, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

This chapter is the broadest in the syllabus and the one that ties together everything before it. Cybersecurity is the operational discipline of defending information systems against attack; data privacy is the parallel discipline of governing how personal data is collected, used, and protected from harm to the individuals it describes. The two are distinct — a system can be secure but privacy-invasive (a well-defended surveillance database), or privacy-respecting but insecure (a properly minimised system that nonetheless leaks). A mature programme handles both. This chapter covers cybersecurity foundations and the major threat categories, the network controls (firewalls and IDS) that defend against them, the evolution of data-privacy norms in an era of social media and big data, the legal and regulatory frameworks that now govern personal data, the consent and erasure principles that anchor those frameworks, the governance practices organisations use to comply, the intersection with cyber-physical systems, the analytical tools used in modern defence (user behaviour analytics), and the specific categories of data — PII and PHI — that demand the most stringent protection.

## 6.1 Overview of cybersecurity and data privacy

### Cybersecurity defined

*Cybersecurity is the practice of protecting computer systems, networks, programs, and data from digital attacks, unauthorised access, damage, or disruption, encompassing technical controls, operational procedures, governance, and the human practices that surround them.*

The discipline goes by several names — information security, IT security, computer security, cybersecurity. The terms are largely interchangeable in current usage, though "cybersecurity" has become the dominant label since around 2015. The scope has expanded with each iteration of computing: from securing single mainframes, to securing local networks, to securing the Internet, to securing the cloud and IoT and now AI systems.

### Data privacy defined

*Data privacy is the discipline concerned with ensuring that the collection, processing, use, sharing, and storage of personal data respects the rights of the individuals to whom the data relates and complies with applicable laws and ethical norms.*

Privacy is broader than security. A perfectly secure system may still be privacy-invasive — it may collect more data than necessary, retain it longer than necessary, use it for purposes the data subjects never authorised, or share it with parties the data subjects do not know about. Privacy asks not just "is the data safe?" but "should we have it at all? for how long? for what purposes?"

### How they relate

Security and privacy share controls but pursue different goals.

| | Security goal | Privacy goal |
|---|---|---|
| Encryption | Confidentiality | Limit who can see personal data |
| Access control | Authorisation | Limit who within the organisation can access |
| Audit logging | Detection, accountability | Document compliance with purpose limitation |
| Data minimisation | Reduces breach impact | Core privacy principle (don't collect what you don't need) |
| Retention limits | Reduces stored attack surface | Core privacy principle (delete when no longer needed) |

Privacy frameworks (GDPR, CCPA, Nepal's Individual Privacy Act 2075) require security as one of several conditions for lawful processing. Security frameworks (ISO 27001, NIST CSF) increasingly include privacy controls.

The contemporary view is that they are complementary disciplines that must be planned together — the term **privacy-by-design** captures this — rather than competing or sequential.

### Why both matter at this moment

Several forces have made these disciplines more important than ever:

**The scale of collection.** Every smartphone, every connected device, every web page, every app collects data continuously. A single Nepali user's daily data trail includes location from the phone, calls and SMS from the carrier, browsing history from the browser, app usage from the OS, financial transactions from eSewa/Khalti, social interactions from Facebook and TikTok, search history from Google, video watch history from YouTube.

**The economics of data.** Personal data is a commercial asset. Advertising businesses (Meta, Google), data brokers, analytics platforms, AI training-data markets all monetise it. The pressure to collect is structural.

**The stakes of breach.** A breach exposes not just the organisation but every individual in the leaked data. The harm — identity theft, fraud, harassment, blackmail, employment consequences — is borne by the data subjects, not the organisation.

**The regulatory response.** GDPR (2018), CCPA (2020), and a wave of similar laws worldwide have made data protection a compliance topic with real fines and real enforcement actions.

**The geopolitics.** State-sponsored attacks, cross-border data-transfer restrictions, data-localisation requirements have made data security and privacy national-security concerns.

### The five elements of a cybersecurity programme

A useful framework (mirroring NIST's Cybersecurity Framework v2.0, 2024):

1. **Govern.** The policies, roles, and accountability structures that direct the programme. Risk management, supplier risk, organisational culture.
2. **Identify.** Asset inventory, threat modelling, vulnerability assessment. Know what you have and what you might face.
3. **Protect.** Access control, awareness training, data security, platform hardening, maintenance, protective technology.
4. **Detect.** Continuous monitoring, anomaly detection, alerting.
5. **Respond.** Incident response planning, analysis, mitigation, communications, improvement.
6. **Recover.** Recovery planning, improvements, communications.

NIST CSF 2.0 added "Govern" as a sixth pillar above the original five — recognising that without governance the technical functions do not align with business priorities.

### Nepal's cybersecurity posture

The institutional landscape:

- **npCERT.** The Computer Emergency Response Team, hosted at the National Information Technology Centre. Coordinates incident response across government and critical sectors.
- **National Cyber Security Centre.** Announced in 2024 to consolidate cybersecurity functions; staffing and operational scope are still developing.
- **Cyber Bureau, Nepal Police.** Investigates cybercrime offences.
- **Nepal Telecommunications Authority (NTA).** Regulator with cybersecurity oversight of licensed operators.
- **Office of the Controller of Certification.** Licenses Certificate Authorities under the Electronic Transactions Act.
- **Sector regulators.** Nepal Rastra Bank for banks, the Insurance Authority for insurers, the Securities Board for capital markets — each with its own cybersecurity guidance for regulated entities.

Key incidents that have shaped the discourse:

- **2017** — Paradox Cyber Ghost defaced 58 government websites in one campaign; Department of Passport defaced by Turkish hackers; Anonymous #Opnep defaced NTC and 200+ government sites; NIC Asia Bank SWIFT fraud incident.
- **2020** — Foodmandu breach (~50,000 records), Vianet breach (~170,000 records).
- **2024** — Government Integrated Data Centre DDoS taking 400+ portals offline; reports of Nepal Rastra Bank documents on dark web.
- **2025** — Ministry of Education portal compromise; reports of Nepal Police database breach claiming 2 million+ records; banking-trojan campaigns targeting eSewa, Khalti, IME Pay users.

The pattern: a steady accumulation of incidents at growing scale and impact, against an institutional response that lags by several years. The 2025 IT Bill in legislative process would strengthen the legal framework.

## 6.2 Common cybersecurity and data threats

This section catalogues the categories of attack a defender must plan against. Many threats were introduced in earlier chapters; this section organises them by the cybersecurity lens.

### The threat-actor taxonomy

Discussed in Chapter 5. Briefly:

- **Opportunistic criminals.** Mass automated attacks against whoever is reachable.
- **Targeted criminals.** Organised groups going after specific high-value targets.
- **Nation-state attackers.** Government-affiliated, well-resourced, persistent.
- **Insiders.** Authorised users abusing access.
- **Hacktivists.** Politically or socially motivated.
- **Competitors.** Industrial espionage.

### Attack vectors

**Phishing and its variants.** Email-based deception remains the largest single category of initial access. Spear-phishing (targeted), whaling (executive-targeted), smishing (SMS-based), vishing (voice-based), QR-code phishing (quishing — emerging in 2023-25).

Modern phishing has become sophisticated:
- LLM-generated messages with native-quality language.
- Voice cloning for vishing calls.
- Deepfake video for executive impersonation (the 2024 Hong Kong deepfake CFO incident moved USD 25 million).
- Multi-stage campaigns where the initial contact builds trust over weeks before the actual ask.

**Malware.** Categories:
- *Viruses* — self-replicating code that attaches to other programs.
- *Worms* — self-propagating code that spreads over networks without human action.
- *Trojans* — disguised as legitimate software.
- *Rootkits* — hide their presence by modifying the operating system.
- *Ransomware* — encrypts files and demands payment.
- *Spyware* — covertly observes the user.
- *Banking trojans* — specifically target financial app credentials.
- *Cryptojackers* — use the victim's CPU/GPU to mine cryptocurrency.
- *Botnets* — networks of compromised devices controlled centrally.
- *Wipers* — destructive malware that erases data without ransom.

The 2025 banking-trojan wave in Nepal — APKs disguised as legitimate eSewa, Khalti, IME Pay, and bank apps, distributed through Facebook Messenger and Telegram — illustrates that mass-market malware remains effective.

**Network attacks.**
- *DDoS* — overwhelming a target with traffic. The 2024 Nepal GIDC DDoS is the local example.
- *Man-in-the-middle* — already covered.
- *DNS spoofing and DNS cache poisoning* — redirecting traffic by feeding wrong DNS answers.
- *ARP spoofing* — LAN-level redirection.
- *BGP hijacks* — redirecting Internet routes.
- *Wi-Fi attacks* — Evil-twin access points, KRACK (2017) and FragAttacks (2021) against WPA2.

**Web application attacks.** The OWASP Top 10 names the most common:
1. *Broken Access Control* — most common in 2021 and 2024 lists.
2. *Cryptographic Failures* — weak ciphers, missing TLS, plaintext storage.
3. *Injection* — SQL injection, command injection, NoSQL injection.
4. *Insecure Design.*
5. *Security Misconfiguration.*
6. *Vulnerable and Outdated Components.*
7. *Identification and Authentication Failures.*
8. *Software and Data Integrity Failures.*
9. *Security Logging and Monitoring Failures.*
10. *Server-Side Request Forgery (SSRF).*

The Foodmandu and Vianet breaches in Nepal both appear to fall in OWASP categories — likely injection or broken access control.

**Supply-chain attacks.** Already covered — SolarWinds 2020, Kaseya 2021, 3CX 2023, XZ Utils 2024. The compromised vendor becomes the entry point.

**Cloud attacks.** Misconfigured buckets, exposed APIs, compromised credentials, cross-tenant vulnerabilities. The 2024 Snowflake-customer breaches are a recent example.

**API abuse.** Already covered — IDOR vulnerabilities, missing rate limits, broken authorisation. The 23andMe 2023 incident, the AT&T 2024 incident.

**Insider threats.** Already covered. Malicious or negligent insider action. The reported NRB documents on dark-web markets are a likely insider exposure.

**Physical attacks.** Theft, dumpster diving, shoulder surfing, tailgating into facilities. Often combined with social engineering.

**Social engineering.** Beyond phishing — pretexting (impersonating to gain information), baiting (leaving infected USB drives), tailgating, impersonation of authority figures.

### Threat trends in 2026

Several patterns shape the current landscape:

**AI-assisted attacks.** LLMs lower the bar for crafting convincing phishing, polymorphic malware, social-engineering scripts. Defenders also use LLMs but the asymmetry favours attackers in the short term.

**Identity-based attacks dominate.** The Verizon DBIR and similar reports show that credential-based access (phishing + stolen credentials + MFA bypass) is now the largest single category of initial access — surpassing software exploitation.

**Cloud and SaaS attacks rising.** As enterprises shift workloads to cloud and SaaS, attackers shift focus. The 2024 Snowflake incidents, the various Microsoft 365 token-theft campaigns (Storm-558 in 2023, Midnight Blizzard in 2024) are examples.

**Ransomware double extortion.** Encrypt + threaten to publish has been the standard playbook since 2020. Triple extortion (also DDoSing the victim) is increasingly common.

**Cryptocurrency-driven theft.** North Korea's Lazarus Group, in particular, has stolen billions of dollars from cryptocurrency exchanges and DeFi protocols since 2017.

**Supply-chain depth.** Attackers reach upstream — into open-source maintainers, into build systems, into the dependencies of dependencies.

**OT/IoT attacks.** Operational technology and IoT devices are increasingly targeted. Industrial control systems for critical infrastructure remain a particular concern.

### Vulnerability classes

The technical underpinnings:

- **Buffer overflows and memory-safety bugs.** The historical largest category in C/C++ code. Mitigations (ASLR, DEP, stack canaries, CFI, memory-safe languages like Rust) have reduced exploitability but not eliminated it.
- **Logic errors.** Authorisation that checks the wrong thing, race conditions, incorrect state-machine transitions.
- **Cryptographic bugs.** Already covered in Chapter 2 — padding oracles, nonce reuse, weak random number generation.
- **Configuration errors.** Default credentials, overly permissive settings, debug interfaces left enabled.
- **Side channels.** Timing, power, cache, micro-architectural leaks.

The CVE database lists tens of thousands of disclosed vulnerabilities each year. Triage — knowing which to patch first — is half the operational battle.

## 6.3 Firewalls and Intrusion Detection Systems

The two foundational network-defence technologies. Both have evolved substantially from their 1990s forms but the core ideas remain.

### Firewalls

*A firewall is a network security control that examines traffic passing through it and applies a configured policy to permit, deny, or otherwise act on each packet or connection, separating network zones with different trust levels.*

The first firewalls (DEC SEAL in 1989, the original Cisco PIX in 1995) were simple packet filters. They have evolved through several generations.

**Stateless (packet-filter) firewalls.** Examine each packet in isolation against a rule list. Rules match on source/destination IP, port, protocol. Fast but limited — cannot distinguish a return packet from a connection-initiating packet, so the rules must be either too permissive (allow everything outbound and the matching inbound) or too restrictive.

**Stateful firewalls.** Maintain a connection table. A packet that is part of an established connection is allowed automatically. New connections are checked against the rules. The standard since the mid-1990s. iptables on Linux, the Windows Filtering Platform, and most hardware firewalls are stateful.

**Application-layer (proxy) firewalls.** Understand specific application protocols (HTTP, SMTP, FTP). Can inspect payload, enforce protocol correctness, hide internal addresses. More processing per connection but better security for known protocols.

**Next-Generation Firewalls (NGFW).** The current standard for enterprise deployments. Combine stateful inspection with:
- *Deep Packet Inspection (DPI)* — looking inside the payload, not just the headers.
- *TLS decryption* — with an installed certificate authority on managed clients, the firewall can decrypt and inspect HTTPS.
- *Application identification* — recognising not just the port but the actual application (distinguishing browser HTTPS from VPN-over-HTTPS, recognising specific cloud applications).
- *User identity integration* — applying rules per user/group, not just per IP.
- *Threat intelligence integration* — checking destinations and downloads against feeds of known-bad addresses and files.
- *Sandboxing* — detonating suspicious attachments in isolated environments before delivery.

Major NGFW vendors: Palo Alto Networks, Fortinet, Check Point, Cisco, Forcepoint. Cloud-native variants are now standard (AWS Network Firewall, Azure Firewall, GCP Cloud Armor).

**Web Application Firewalls (WAF).** Specifically targeted at HTTP-layer attacks against web applications. Block SQL injection, XSS, command injection by recognising patterns. Cloudflare WAF, AWS WAF, Imperva, F5, Akamai are the major players.

**Host-based firewalls.** Run on the endpoint. Windows Defender Firewall, iptables on Linux servers, application-aware host firewalls in EDR products. Useful for defence-in-depth — a host-based firewall enforces policy even if the network firewall is bypassed.

### Firewall topology

A typical enterprise has firewalls in several positions:

```
Internet
    |
[Border Firewall]  ← Inspects all inbound and outbound; blocks known bad
    |
+-- DMZ subnet (public-facing servers, mail relays)
    |
[Internal Firewall]  ← Separates DMZ from internal
    |
+-- Internal subnet (workstations, internal servers)
    |
[Server Firewall]  ← Protects servers from internal threats
    |
+-- Server subnet
```

Zero-trust deployments add per-host firewalls and per-application enforcement, so that even traffic within a subnet is filtered. The traditional network-zone model is being replaced by identity-and-policy-based controls.

### Limitations of firewalls

- **Encrypted traffic.** TLS-encrypted traffic cannot be inspected without decryption. TLS interception is operationally costly and privacy-impacting.
- **Application-layer attacks.** A firewall that allows HTTPS to a web server cannot tell whether the request inside is a valid query or an exploit attempt.
- **Insider threats.** A firewall is positioned between zones; it does not see traffic that stays within a zone.
- **Encrypted DNS and proxies.** Attackers use legitimate cloud services as command-and-control to blend in with normal traffic.
- **Lateral movement after initial compromise.** Once the attacker is inside the network, the firewall sees them as a legitimate user.

Firewalls are necessary but not sufficient. They are part of a defence-in-depth strategy.

### Intrusion Detection Systems (IDS)

*An Intrusion Detection System is a security control that monitors network traffic, system activity, or both, looking for evidence of malicious or anomalous behaviour, and generates alerts when potential intrusions are detected, without (in the classical IDS) intervening to block them.*

**IDS vs IPS.** An **IDS** detects and alerts. An **IPS (Intrusion Prevention System)** detects and blocks. The same product can operate in either mode; the choice depends on the risk tolerance for false-positive blocking versus letting an actual attack proceed while a human investigates.

### IDS architectures

**Network-based IDS (NIDS).** Monitors network traffic at chokepoints. Receives a mirror of all traffic from a SPAN port or tap. Examines packets and flows for signs of attack.

Major NIDS: Snort (open source, by Cisco), Suricata (open source), Zeek/Bro (open source, behaviour-focused), Cisco Firepower, Palo Alto Networks Threat Prevention.

**Host-based IDS (HIDS).** Runs on the endpoint. Watches system calls, file accesses, log entries, process behaviour. Detects local attacks that a NIDS would miss (an attacker with stolen credentials performing legitimate-looking network activity but unusual local actions).

Major HIDS: OSSEC (open source), Wazuh (OSSEC fork), CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne. Most modern HIDS are bundled into Endpoint Detection and Response (EDR) products.

**Hybrid/Distributed IDS.** Combines network and host-based detection, with centralised correlation. The norm in mature deployments.

### Detection methods

**Signature-based detection.** Patterns that match known attack characteristics. A signature might be a specific byte sequence in a packet, a specific command line, a specific file hash. Effective against known threats. Useless against novel attacks. Snort and Suricata's rule languages are the standard signature formats.

**Anomaly-based detection.** Learns a baseline of "normal" behaviour and alerts on deviations. Can detect novel attacks that have no signature. Suffers from false positives — anything new looks like an anomaly. Modern anomaly detection uses statistical and ML methods over flow features, user behaviour, system calls.

**Heuristic / behavioural detection.** Looks for behaviours that are intrinsically suspicious regardless of pattern. A process spawning a command shell, a user authenticating from two countries within an hour, a server that has never made an outbound connection suddenly doing so.

**Threat-intelligence-based detection.** Cross-references observed indicators (IP addresses, domains, file hashes) against feeds of known-malicious values. Useful for catching commodity threats; less useful against targeted attacks using fresh infrastructure.

### Detection signals

Common indicators an IDS looks for:

- Port scans and reconnaissance traffic.
- Buffer-overflow exploit payloads.
- SQL injection attempts.
- Anomalous data transfer volumes (potential exfiltration).
- Communications with known command-and-control infrastructure.
- DNS queries to known-bad domains.
- TLS connections to certificates matching known-bad fingerprints.
- Internal network reconnaissance (lateral movement).
- Privilege-escalation attempts on hosts.
- Unusual login patterns (impossible travel, off-hours access).

### SIEM and SOAR

Above the IDS sits the **Security Information and Event Management (SIEM)** system — the centralised log-and-alert platform that aggregates events from firewalls, IDS, endpoints, applications, identity systems, and cloud platforms.

Major SIEMs: Splunk, Microsoft Sentinel, IBM QRadar, Elastic Security, Sumo Logic, Chronicle (Google Cloud).

**SOAR (Security Orchestration, Automation, and Response)** sits above the SIEM. SOAR runs automated playbooks — when alert X fires, isolate host Y, query enrichment from threat-intel feed Z, page the on-call engineer if certain conditions are met. SOAR shortens response times and reduces analyst burnout.

### The signal-to-noise problem

The largest operational challenge for IDS and SIEM is **alert fatigue**. A busy enterprise SIEM generates thousands of alerts per day. The vast majority are false positives or low-severity events. The real incidents hide among them. Analysts triaging endlessly miss the important signals.

Mitigations:

- Tuning rules to the specific environment to reduce false positives.
- Risk-based prioritisation that scores alerts by context (asset criticality, user role, time of day, recency of related signals).
- Automated triage with SOAR — common false positives are automatically dismissed; only ambiguous alerts reach humans.
- ML-based prioritisation that learns which alerts have historically been real incidents.

### IDS in Nepal

Major Nepali banks and financial institutions deploy SIEM and IDS — typically Splunk, ArcSight, or IBM QRadar with Snort, Suricata, or vendor-specific NIDS. Government deployment is uneven; the GIDC has security monitoring but the public-facing portal estate has historically lagged. The 2024 DDoS incident reportedly demonstrated detection but inadequate mitigation capacity. npCERT operates national-level coordination and threat intelligence sharing.

## 6.4 General trends in data privacy: collection, processing, storage, deletion

Data privacy as a discipline organises itself around the data lifecycle. Each stage has its own norms and risks.

### Collection

The defining trend of the last two decades: **collection has expanded relentlessly**. Every interaction generates data. Every device emits data. Every analytical tool wants more data to train on.

Modern collection categories:

- **Direct user input.** Forms, surveys, account registration, payment information.
- **Behavioural data.** Clicks, scrolls, time on page, mouse movements, keystroke timing.
- **Device data.** Operating system, browser version, IP address, screen resolution, installed fonts (used for fingerprinting).
- **Location data.** GPS coordinates from mobile devices, cell tower triangulation, Wi-Fi access-point identifiers, IP-geolocation.
- **Inference data.** Predicted gender, age, interests, political leaning derived from other signals.
- **Cross-context data.** Following users across websites, apps, and devices via tracking cookies, ad identifiers, and identity graphs.
- **Sensor data.** From IoT devices, wearables, vehicles, smart-home appliances.
- **Biometric data.** Face, fingerprint, voice, gait — increasingly used for authentication but also collectable by passive sensing.

**The principle of data minimisation** is the privacy-side response — collect only what is necessary for the stated purpose, no more. The principle is codified in GDPR Article 5(1)(c). Compliance is uneven. Most modern apps and services collect substantially more than they need.

### Processing

Once collected, data is processed — analysed, combined, transformed, fed into ML models, used to drive decisions.

**Profiling.** Building a detailed picture of an individual from collected data. Used in marketing (target advertising), credit (credit scoring), insurance (risk assessment), recruitment (candidate screening), and policing (predictive policing).

**Automated decision-making.** Decisions made entirely by algorithms — loan approvals, fraud-flagging, content moderation, AI-driven medical diagnosis. GDPR Article 22 gives data subjects the right not to be subject to solely automated decisions with significant effects.

**Algorithmic discrimination.** When automated decisions produce systematically worse outcomes for protected groups. A 2018 Amazon recruiting tool that downgraded women's CVs, the 2020 Dutch childcare benefits scandal, and the persistent racial bias in facial recognition are well-known examples. The EU AI Act (in force 2024-26) imposes requirements on high-risk AI systems specifically to address this.

**Data combination.** The biggest privacy risks come from combining individually-anonymous datasets. The Netflix Prize dataset, anonymised before release, was de-anonymised in 2008 by cross-referencing IMDB ratings. The 2018 Strava heatmap revealed military base locations through aggregated jogging routes. Combining data is a privacy-multiplier.

### Storage

Where and how data is stored matters for privacy:

- **Duration.** GDPR's storage limitation principle requires data to be kept only as long as necessary. Retention policies should be defined and enforced.
- **Location.** Cross-border storage triggers cross-border-transfer rules. The Schrems II decision (2020) invalidated the EU-US Privacy Shield, forcing reconsideration of how EU data flows to US providers. The EU-US Data Privacy Framework (2023) replaced it, currently in operation.
- **Security.** Encryption, access control, audit logging.
- **Backup retention.** Backups can preserve data beyond the active retention period. Privacy-aware backup management is now a topic.

### Deletion

The other half of the lifecycle's bookends. Modern privacy frameworks include explicit deletion rights:

- **GDPR Article 17 — Right to Erasure ("right to be forgotten").** A data subject can request deletion under specific conditions (no longer necessary, consent withdrawn, unlawful processing).
- **CCPA Section 1798.105 — Right to Delete.** California residents can request deletion of their personal information.
- **Nepal Individual Privacy Act 2075, Section 11.** Provides for the right to update personal information; deletion rights are weaker than under GDPR.

Operational challenges:
- **Distributed storage.** Personal data may exist in production databases, backups, archives, third-party processors, log files, ML training datasets. Comprehensive deletion is a hard engineering problem.
- **Aggregation and inference.** If data has been used to train an ML model, deleting the source data does not remove its influence on the model. "Machine unlearning" is an active research area.
- **Legal hold.** Some data must be retained for legal or regulatory reasons even when the data subject requests deletion.
- **Pseudonymisation as alternative.** Some frameworks allow pseudonymisation in place of deletion, where deletion is impossible.

**Cryptographic erasure** (Chapter 5) is a useful technique. Encrypted data whose key has been destroyed is effectively deleted even if the ciphertext remains on backup tapes.

### Privacy notices and transparency

Frameworks require that data subjects be informed:

- What data is collected.
- For what purposes.
- For how long it will be stored.
- With whom it will be shared.
- What their rights are.
- How to exercise those rights.

The traditional answer is the **privacy notice / privacy policy** — a document presented at collection. Studies repeatedly find that users do not read these. The **layered notice** approach (a short summary with a longer detailed version available) is the modern best practice. **Just-in-time notices** appear at the point of specific collection (location-permission prompts, camera-access prompts).

## 6.5 Privacy in the age of social media and big data

The internet's economic model since around 2005 has been "free services in exchange for data, paid for by targeted advertising." Two technologies — social media and big-data analytics — have together remade what privacy means.

### Social media

Social platforms (Facebook, Instagram, TikTok, X/Twitter, LinkedIn, YouTube, Reddit) have specific privacy dynamics:

**Voluntary disclosure at scale.** Users share more about themselves than they would have considered sharing with strangers a generation ago. Daily life, locations, opinions, photographs, relationships — all visible to the platform, to the user's network, sometimes to the public.

**Inferential power.** Even when explicit disclosure is limited, platforms infer extensively from interactions. Liking specific posts reveals interests, political leanings, religious views, sexual orientation. The 2013 Kosinski et al. paper showed that Facebook "Likes" alone could predict sensitive attributes (sexuality, ethnicity, political views) with high accuracy.

**Network effects on privacy.** Other users' actions reveal information about you — photo tagging, location check-ins that mention you, posts about you. Your privacy depends on others' choices.

**The Cambridge Analytica revelations (2018).** Facebook user data harvested via a quiz app and used for political ad targeting. Triggered the broader conversation about data exploitation that produced GDPR enforcement and similar regulations elsewhere.

**Surveillance capitalism (Zuboff, 2019).** The framing that the platforms' business model is fundamentally about extracting behavioural data and selling predictions about human behaviour. Influential in policy discourse.

**Local context.** Facebook (called "Meta" since 2021, but the term "Facebook" remains common) has roughly 14 million users in Nepal, the largest social-media population. TikTok has rapidly grown from launch in Nepal. The Nepal government temporarily banned TikTok in November 2023 over content concerns; the ban was lifted in August 2024 after the platform agreed to register locally. The Facebook ban in October 2025 lasted several days before being lifted.

### Big data and analytics

**The volume, velocity, variety, veracity ("the four V's") of modern data** allow analyses impossible in earlier eras. The privacy implications:

- **Re-identification of anonymised data.** Repeated demonstrations that "anonymised" datasets are usually identifiable. The Netflix Prize case (2008); the AOL search-log release (2006); the 2013 study showing that 90% of US individuals could be uniquely identified by combinations of ZIP code, birthdate, and sex; the de-anonymisation of mobile-trajectory data by Yves-Alexandre de Montjoye and colleagues (2013, four spatio-temporal points are enough to identify 95% of individuals).
- **Aggregate-to-individual inference.** Patterns visible in aggregate data can be specific enough to identify individuals. The Strava heatmap (2018) showed military base locations through aggregated user activity.
- **Differential privacy.** A mathematical framework (Dwork et al., 2006) for releasing aggregate statistics that provably limit what can be learned about any individual. Used by Apple (for iOS analytics), Google (for Chrome and Maps), the US Census Bureau (2020 census). Quantifies the privacy-utility trade-off precisely.
- **Predictive profiling.** Big-data ML predicts attributes data subjects never disclosed. Pregnancy prediction by retailers (the Target story from 2012), credit risk by social-media activity, criminal recidivism by demographics and history (the COMPAS algorithm and its 2016 ProPublica critique).

### Privacy-enhancing technologies (PETs)

The technology response to privacy concerns:

- **Differential privacy.** Already mentioned. Adds calibrated noise to outputs to provably limit per-individual leakage.
- **Federated learning.** Models are trained across many devices without raw data leaving the device. Aggregated updates rather than raw data go to the central server. Used by Google for keyboard suggestion (Gboard), by Apple for various on-device intelligence.
- **Secure multiparty computation.** Already covered.
- **Homomorphic encryption.** Already covered briefly; Chapter 7 expands.
- **Zero-knowledge proofs.** Already covered.
- **Anonymous credentials and selective disclosure.** Prove specific attributes without revealing identity. Used in EU Digital Identity Wallet, Apple Wallet driver's license features.
- **Tor and mixnets.** Network-layer privacy against traffic analysis.

These technologies are mature enough to use but not yet ubiquitously deployed.

### The advertising-tech (ad-tech) ecosystem

Modern web advertising involves dozens of intermediaries — demand-side platforms, supply-side platforms, ad exchanges, data brokers, identity-resolution providers — each receiving partial data about each user's behaviour. The ecosystem is the largest privacy-impacting system on the Internet.

**Third-party cookies** were the traditional cross-site tracking mechanism. Most browsers (Safari since 2019, Firefox since 2019, Chrome rolling out in 2024-25 after multiple delays) are removing them.

**Replacement mechanisms** are being negotiated — Google's Privacy Sandbox (Topics API, FLEDGE/Protected Audience API), Apple's Private Click Measurement, Meta's Aggregated Event Measurement. Each is an industry compromise between targeted advertising and individual privacy.

**Identity resolution** combines partial identifiers (email addresses, phone numbers, postal addresses) across sites to maintain user profiles even after cookie deprecation. The privacy implications are subject to active regulatory scrutiny.

### Recommendations for individuals

A user-side privacy posture in 2026:

- Use a privacy-respecting browser (Firefox, Brave) or Safari, with tracking protection enabled.
- Use a privacy-respecting search engine (DuckDuckGo, Brave Search, Kagi).
- Use uBlock Origin or similar tracker-blocking.
- Use end-to-end encrypted messaging (Signal, WhatsApp) for sensitive conversations.
- Minimise social-media disclosure; review and tighten privacy settings periodically.
- Use unique strong passwords per site with a password manager.
- Enable MFA on all accounts.
- Review app permissions on mobile devices regularly.
- Use a VPN on untrusted networks.
- Periodically request and review the data that services hold about you (GDPR Article 15 or equivalent rights).

These steps are within an ordinary user's capacity but remain uncommon — a continued indicator that the responsibility for privacy must extend beyond individual self-help into law and platform design.

## 6.6 Data privacy laws, regulations, and compliance

The legal landscape governing personal data has expanded enormously in the last decade. The major frameworks now form an interlocking system that any organisation operating internationally must navigate.

### GDPR — General Data Protection Regulation (EU)

*The General Data Protection Regulation (Regulation EU 2016/679) is the European Union law in force since 25 May 2018 that governs the processing of personal data of EU residents by any organisation worldwide, establishing seven processing principles, six lawful bases, eight individual rights, and administrative fines up to 4% of global annual turnover or €20 million whichever is higher.*

GDPR is the global reference point. Even organisations not subject to it model their compliance after it because it sets the highest enforced baseline.

**Seven processing principles (Article 5):**

1. **Lawfulness, fairness, and transparency.** Processing must have a legal basis and be transparent to data subjects.
2. **Purpose limitation.** Data collected for one purpose cannot be used for incompatible purposes without further legal basis.
3. **Data minimisation.** Collect only what is necessary.
4. **Accuracy.** Keep data accurate and up to date.
5. **Storage limitation.** Keep data only as long as necessary.
6. **Integrity and confidentiality.** Apply appropriate security.
7. **Accountability.** The controller must be able to demonstrate compliance.

**Six lawful bases for processing (Article 6):**

1. **Consent** — freely given, specific, informed, unambiguous.
2. **Contract** — necessary for a contract with the data subject.
3. **Legal obligation** — required by EU or member-state law.
4. **Vital interests** — necessary to protect life.
5. **Public task** — necessary for a task carried out in the public interest.
6. **Legitimate interests** — necessary for the controller's or a third party's legitimate interests, balanced against the data subject's rights.

**Eight individual rights (Articles 12–22):**

1. **Right to be informed.**
2. **Right of access** — request a copy of personal data held.
3. **Right to rectification** — correct inaccurate data.
4. **Right to erasure** — "right to be forgotten" — discussed in Section 6.7.
5. **Right to restrict processing.**
6. **Right to data portability** — receive data in machine-readable format.
7. **Right to object** — particularly to direct marketing.
8. **Rights related to automated decision-making** (Article 22).

**Special categories (Article 9).** Stricter rules apply to data on race, ethnicity, political opinions, religious beliefs, trade-union membership, genetic and biometric data, health, sex life, and sexual orientation. Processing generally requires explicit consent or a specific legal basis.

**Cross-border transfers.** GDPR restricts transfers of personal data outside the EU/EEA unless the destination has been deemed "adequate" by the European Commission, or specific safeguards (Standard Contractual Clauses, Binding Corporate Rules) are in place. The Schrems II ruling (2020) struck down the EU-US Privacy Shield; the EU-US Data Privacy Framework (2023) replaced it.

**Enforcement.** National Data Protection Authorities investigate complaints and issue fines. Major fines: Meta (€1.2 billion, 2023, over data transfers); Amazon (€746 million, 2021); WhatsApp (€225 million, 2021); Google (€90 million, 2022). Many smaller fines accumulate continuously.

### CCPA and CPRA — California Consumer Privacy Act

*The California Consumer Privacy Act (effective 2020) and its successor the California Privacy Rights Act (effective 2023) are US state-level privacy laws that grant California residents rights over their personal information held by businesses meeting size thresholds, including rights to know, delete, correct, opt out of sale, and limit the use of sensitive personal information.*

CCPA and CPRA brought GDPR-style rights to the US. They are weaker than GDPR in some ways (consent is not generally required; opt-out rather than opt-in) but introduce specific concepts like the right to opt out of the "sale" of personal information.

The CPRA created the **California Privacy Protection Agency** — the first dedicated US privacy regulator. Other US states (Virginia, Colorado, Connecticut, Utah, and a dozen more by 2026) have followed with their own laws.

### HIPAA — Health Insurance Portability and Accountability Act (US)

*HIPAA (1996, with substantial amendments through HITECH in 2009) is the US federal law that establishes national standards for the privacy and security of Protected Health Information held by health-care providers, health plans, and their business associates.*

HIPAA's Privacy Rule and Security Rule are the operational standards. The Breach Notification Rule requires notification to affected individuals, HHS, and (for breaches over 500 individuals) the media. HIPAA has both civil and criminal penalties. Section 6.11 discusses PHI in more detail.

### PCI-DSS — Payment Card Industry Data Security Standard

*PCI-DSS is the contractual security standard required by the major payment card brands (Visa, Mastercard, American Express, Discover, JCB) of any entity that handles cardholder data, currently at version 4.0.1 (released 2024).*

Not a government regulation but enforced contractually. Twelve requirements covering network security, access control, encryption, monitoring, vulnerability management, and policy. Non-compliance can result in fines and loss of payment-processing privileges.

### Sectoral and other frameworks

- **SOX (Sarbanes-Oxley, US).** Public-company financial controls. Affects how financial data is secured.
- **GLBA (Gramm-Leach-Bliley, US).** Financial-institution data protection.
- **FERPA (US).** Student education records.
- **COPPA (US).** Children's online privacy (under 13).
- **APPI (Japan).** Act on Protection of Personal Information.
- **PIPL (China, 2021).** Personal Information Protection Law — broadly GDPR-inspired but with Chinese-specific elements including data-export controls.
- **LGPD (Brazil, 2020).** Lei Geral de Proteção de Dados — closely modelled on GDPR.
- **POPIA (South Africa, 2021).** Protection of Personal Information Act.
- **DPDP Act (India, 2023).** Digital Personal Data Protection Act.

### Nepal's framework

The current legal landscape in Nepal:

**Individual Privacy Act 2075 (2018).** Establishes the right to privacy. Sections relevant to data:
- Restricts collection and use of personal information without consent.
- Grants the right to update personal information.
- Establishes confidentiality of personal information held by public bodies.

The Act has weak enforcement infrastructure. There is no dedicated data-protection authority. Penalties are modest. The right to erasure is not as strong as under GDPR.

**Electronic Transactions Act 2063 (2008).** Older legislation covering electronic records, digital signatures, and computer-related offences. Sections 47–58 define cyber-related offences. Most cybercrime prosecutions in Nepal currently use this Act.

**The 2025 IT Bill.** In legislative process. Would replace or significantly amend the Electronic Transactions Act, introduce more specific cybersecurity obligations, expand the cybercrime offence catalogue, and potentially create a dedicated regulatory authority. Civil-society concerns about overbroad provisions on online content have slowed progress.

**Sector-specific guidance.** Nepal Rastra Bank issues cybersecurity directives for licensed banks. The Insurance Authority does the same for insurers. The Securities Board for securities firms. The Nepal Telecommunications Authority for licensed telecom operators.

**Constitution of Nepal 2072 (2015), Article 28.** Constitutional right to privacy: "The privacy of any person, his or her residence, property, document, data, correspondence, and matters relating to his or her character shall be inviolable, except in accordance with law."

### Compliance approach

Practical compliance follows a common pattern across frameworks:

1. **Inventory.** Know what personal data the organisation holds, where, in what systems.
2. **Classify.** Assign sensitivity levels per Chapter 5.
3. **Map flows.** Document how data moves between systems, departments, and third parties.
4. **Identify lawful basis.** For each processing activity, identify the legal basis.
5. **Assess risk.** Privacy Impact Assessments for high-risk processing (Section 6.8).
6. **Implement controls.** Security, access, retention, deletion.
7. **Train staff.** Awareness of privacy obligations.
8. **Establish processes.** Handling data-subject requests, breach notification, vendor management.
9. **Audit and demonstrate.** Records of processing, audit trails, evidence of compliance.

The cost of compliance is real but the cost of non-compliance — fines, breach costs, reputational damage — generally exceeds it.

## 6.7 Consent and right to erasure

Two specific privacy principles that have received the most regulatory attention and operational focus.

### Consent

Consent is one of GDPR's six lawful bases for processing. When relied upon, it must meet a high bar.

**GDPR Article 7's standards for valid consent:**

- **Freely given.** Not conditioned on access to a service when the data is not necessary for the service.
- **Specific.** Tied to particular processing purposes; bundled "consent to everything" is not valid.
- **Informed.** The data subject must know what they are consenting to.
- **Unambiguous.** Clear affirmative action. Pre-ticked boxes are not consent. Continuing to use a service is not consent.
- **Demonstrable.** The controller must be able to prove consent was obtained.
- **Withdrawable.** As easy to withdraw as to give.

**Practical implications.**

- **Cookie banners.** The standard EU cookie banner with "Accept All / Reject All / Manage" buttons emerged because of GDPR + ePrivacy Directive. Designs that make rejection harder than acceptance ("dark patterns") have been ruled non-compliant in multiple cases. France's CNIL fined Google €150 million and Meta €60 million in 2022 specifically for cookie-consent dark patterns.
- **Granular consent.** Separate opt-ins for separate purposes (marketing email, analytics, third-party sharing, profiling).
- **Consent withdrawal.** A clear mechanism — typically a link in the privacy notice or in the user account settings.
- **Re-consent.** If processing purposes change, fresh consent may be needed.

**When consent is not the right basis.** For many processing activities, consent is impractical or inappropriate. An employer cannot rely on employee consent because of the power imbalance. A bank cannot rely on consent for the KYC processing that the law requires (legal obligation is the basis). A platform cannot rely on consent for the security monitoring that protects all users (legitimate interests is the basis).

### The right to erasure

**GDPR Article 17.** A data subject can request erasure of personal data when:

- The data is no longer necessary for the purposes it was collected.
- Consent has been withdrawn and there is no other lawful basis.
- The data subject objects and there are no overriding legitimate grounds.
- The data has been unlawfully processed.
- Erasure is required to comply with a legal obligation.

**Exceptions** where erasure does not apply:

- Freedom of expression and information.
- Legal obligations requiring retention.
- Public interest in public health or historical research.
- Establishment, exercise, or defence of legal claims.

**The Google Spain v AEPD decision (2014).** Mario Costeja González asked Google to remove search results about his foreclosure from 1998. The European Court of Justice ruled that Google must consider such requests — that under data-protection law, search engines must balance the data subject's right against the public interest in accessing the information. The ruling established the "right to be forgotten" as practically enforceable against search engines. Google receives hundreds of thousands of erasure requests per year and accepts about half.

**Operational challenges:**

- **Identifying all copies.** Personal data spreads through production databases, replicas, backups, archives, log files, ML training sets, third-party processors. Comprehensive erasure requires comprehensive tracking.
- **Backups.** Backups can preserve data beyond retention periods. Modern privacy-aware approaches include either short backup retention or cryptographic erasure of backup keys.
- **Aggregated and derived data.** Even after raw data is deleted, models trained on it, statistical reports built from it, and decisions made from it persist. "Machine unlearning" is an active research area without robust production solutions.
- **Third-party processors.** Each processor must propagate the deletion. Contractual data-processing agreements typically require this.
- **Legal holds.** Sometimes data must be retained for litigation or regulatory reasons, overriding erasure rights for the duration.

**Operational pattern.** Mature organisations implement an erasure-request workflow:

1. Verify the requester's identity.
2. Locate all instances of the personal data across systems.
3. Confirm no exceptions apply.
4. Delete from production systems.
5. Mark for deletion-on-next-rotation in backup systems.
6. Notify processors and other parties that received the data.
7. Confirm to the data subject within the regulatory time limit (one month under GDPR, extendable to three with reason).

Some organisations satisfy erasure obligations through **cryptographic erasure** — each data subject's data is encrypted with a per-subject key, and deletion destroys the key. The ciphertext remains on backups but is unreadable.

### Right to erasure under other frameworks

- **CCPA Section 1798.105.** California residents can request deletion. Exceptions broader than under GDPR.
- **Brazil's LGPD.** Right to erasure with similar structure to GDPR.
- **China's PIPL.** Right to delete personal information in specific circumstances.
- **Nepal's Individual Privacy Act 2075.** Right to update is stronger than the right to delete; comprehensive erasure rights are not as developed.

The right to erasure has become a standard component of modern privacy frameworks. Implementation varies in detail but the principle — data subjects can in some circumstances require deletion of their data — is now near-universal in privacy legislation.

## 6.8 Data governance and privacy impact assessments

The organisational practices that turn privacy principles into operational reality.

### Data governance

*Data governance is the organisational framework — policies, roles, processes, and tools — that defines how an organisation manages its data assets, including who is accountable for what data, what quality standards apply, who can access what, how long it is retained, and how it is protected.*

A data-governance programme provides the structure within which privacy compliance operates. Without governance, privacy compliance is ad-hoc and inconsistent.

**Key roles in data governance:**

- **Chief Data Officer (CDO).** Executive-level accountability for data strategy and governance.
- **Chief Privacy Officer (CPO) / Data Protection Officer (DPO).** Privacy-specific leadership. The DPO is a GDPR-mandated role for organisations engaged in certain large-scale processing.
- **Chief Information Security Officer (CISO).** Security counterpart.
- **Data Owners.** Business-unit accountability for specific data domains (customer data, employee data, product data).
- **Data Stewards.** Day-to-day responsibility for data quality and policy enforcement.
- **Data Custodians.** Technical role responsible for implementing controls.

**Governance artefacts:**

- **Data inventory / data catalogue.** Comprehensive register of data assets, sources, owners, classifications.
- **Records of Processing Activities (ROPA).** Required under GDPR Article 30. Documentation of every processing activity, including purposes, categories of data and subjects, retention periods, recipients, transfers, and security measures.
- **Data flow diagrams.** Visualisations of how data moves between systems and to external parties.
- **Policies and procedures.** Acceptable use, access control, retention, classification, incident response.
- **Data sharing agreements / Data Processing Agreements (DPAs).** Contracts with processors and partners specifying obligations.

### Privacy Impact Assessments (PIA) / Data Protection Impact Assessments (DPIA)

*A Data Protection Impact Assessment is a structured process to identify and minimise the privacy risks of a processing activity, required under GDPR Article 35 for processing likely to result in high risk to the rights and freedoms of natural persons.*

DPIAs are the privacy-equivalent of risk assessments. They examine a planned (or existing) processing activity systematically before deployment.

**When a DPIA is required (GDPR Article 35):**

- Systematic and extensive profiling with significant effects.
- Large-scale processing of special categories of data.
- Systematic monitoring of public areas on a large scale.

EU data-protection authorities publish lists of additional processing activities for which DPIAs are mandatory.

**Standard DPIA contents:**

1. **Description.** What is the processing? What data, whose data, for what purposes, by what means?
2. **Necessity and proportionality assessment.** Is the processing necessary? Is it proportionate to the purpose? Are there less privacy-invasive alternatives?
3. **Risk identification.** What could go wrong? What harms might result to data subjects? What is the likelihood and severity?
4. **Risk mitigation.** What controls reduce the risks? What residual risk remains?
5. **Consultation.** With the DPO, with data subjects (where appropriate), with the regulator (where required).
6. **Documentation.** Records of the assessment, decisions, sign-off.

**Triggering events:**

- New technology deployments (AI/ML systems, biometric identification, location tracking).
- New data sources or new combinations of existing data.
- Mergers, acquisitions, or major reorganisations affecting data flows.
- Changes in vendor or cloud-platform arrangements that affect data processing.

**The PIA in non-GDPR contexts.** Many jurisdictions have similar requirements. The US Federal government uses PIAs under the E-Government Act of 2002. Canada has PIA requirements under the Privacy Act. ISO 29134 standardises the PIA process internationally.

### Audit and assurance

Beyond DPIAs, mature organisations conduct ongoing assurance:

- **Internal audits** of privacy-control effectiveness.
- **External audits** for certifications (ISO 27701 for privacy management; SOC 2 Type II reports for service organisations).
- **Penetration testing** focused on data-protection controls.
- **Phishing simulations** and other awareness exercises.
- **Tabletop exercises** for breach response.

### Breach response

When a breach occurs, governance includes the response process:

1. **Detection and confirmation.** Identify that a breach has happened.
2. **Containment.** Stop ongoing exfiltration. Isolate affected systems.
3. **Assessment.** Scope, affected data, affected subjects, likely cause.
4. **Notification.** To data-protection authority (within 72 hours under GDPR for breaches involving personal data with risk to rights), to affected data subjects (when there is high risk), to other relevant authorities.
5. **Remediation.** Fix the underlying cause.
6. **Post-incident review.** Lessons learned, process improvements.

The 72-hour GDPR notification window has become a global benchmark.

### Privacy by design

The most general governance principle:

- **Proactive not reactive.** Anticipate privacy issues at design time.
- **Privacy as the default setting.**
- **Privacy embedded into design.**
- **Full functionality — positive-sum, not zero-sum.** Privacy and other goals can be reconciled.
- **End-to-end security.**
- **Visibility and transparency.**
- **Respect for user privacy.**

The 1995 Cavoukian Privacy by Design principles. Now embedded in GDPR Article 25 ("data protection by design and by default") and similar provisions in other laws.

### Governance for AI/ML

AI and machine-learning systems pose particular governance challenges that are now front-of-mind:

- **Training data lineage** — where the data came from, who consented to its use.
- **Model bias** — assessment and mitigation.
- **Explainability** — for high-stakes decisions affecting individuals.
- **Drift monitoring** — models can degrade over time as the world changes.
- **Right to human review** — under GDPR Article 22.
- **EU AI Act compliance** — risk classification and obligations for high-risk AI systems (already in force, full obligations applying through 2026-27).

AI governance frameworks are emerging — NIST AI Risk Management Framework (2023), ISO/IEC 42001 (2023), the EU AI Act itself. Adoption is increasing as regulatory enforcement begins.

## 6.9 Introduction to Cyber-Physical Systems

*A Cyber-Physical System (CPS) is an engineered system in which physical processes and computational processes are tightly integrated, with embedded computers and networks monitoring and controlling physical components, typically through sensors that observe the physical world and actuators that change it, mediated by software that runs feedback loops between them.*

Already introduced in the Next Generation Networks chapter (Subject 1, Chapter 5). This chapter focuses on the cybersecurity and privacy implications.

### What makes CPS distinctive for security

CPS combine three properties that make security particularly demanding:

**Physical consequences of cyber compromise.** A breach is not just a data loss — it can cause physical damage, environmental harm, or loss of life. A compromised SCADA system can destroy industrial equipment, disrupt power grids, or contaminate water supplies. A compromised vehicle can crash. A compromised medical device can kill a patient.

**Real-time constraints.** Many CPS must respond within milliseconds. Security controls cannot add latency that breaks the control loop. Patching cannot involve reboots that take the system offline. Cryptographic operations must complete within tight bounds.

**Long deployment lifetimes.** Industrial control systems and infrastructure components often operate for 20–40 years. Cryptographic algorithms, protocols, and devices that were secure at deployment may be obsolete decades later. Patching cycles are measured in years, not weeks.

**Limited resources.** Many CPS components are embedded devices with little CPU, little memory, no general-purpose OS, no display. Standard security tools (antivirus, EDR, host firewalls) do not fit.

**Legacy protocols.** Industrial protocols (Modbus, DNP3, IEC 60870-5, BACnet) were designed in eras when network exposure was not anticipated. Most lack authentication; many lack any cryptographic protection. Retrofitting security is a substantial engineering project.

### Major CPS attack categories

**Stuxnet (2010).** Discovered 2010 but operating since around 2007. State-engineered malware that targeted Siemens PLCs controlling Iranian uranium-enrichment centrifuges. Caused physical damage by varying centrifuge speeds outside safe parameters. Considered the first widely-recognised cyber attack with physical-destruction effects. Demonstrated that the air-gap defence (the affected systems were not connected to the Internet) could be defeated by USB-based propagation.

**Ukraine power grid attacks (2015, 2016).** Russian-attributed attacks that disconnected portions of the Ukrainian power grid. 2015's incident left around 230,000 customers without power for hours. 2016's "CRASHOVERRIDE" / "Industroyer" used a sophisticated framework that directly spoke industrial protocols. 2022's "Industroyer2" was deployed during the broader Russian invasion of Ukraine.

**Triton / Trisis (2017).** Malware targeting Schneider Electric Triconex safety instrumented systems at a petrochemical plant in Saudi Arabia. The malware targeted the safety system specifically — the system whose role is to safely shut down the plant if dangerous conditions are detected. Investigators concluded the attackers were attempting to cause an explosion. The attack triggered the safety system's fail-safe and the plant shut down before damage occurred.

**Colonial Pipeline (2021).** Ransomware on the IT side of Colonial Pipeline's network led the company to shut down the OT side preemptively, halting fuel delivery to much of the eastern US. Demonstrated that even purely IT incidents can cascade into physical disruption through operational decisions.

**Oldsmar water-treatment intrusion (2021).** An attacker briefly gained access to a Florida water-treatment plant's controls and raised sodium-hydroxide levels to dangerous concentrations. Detected by a human operator before any harm occurred. Demonstrated the vulnerability of small-utility OT to remote access.

**Healthcare device exploits.** Insulin pumps, pacemakers, infusion pumps with documented vulnerabilities. The 2017 St. Jude pacemaker recall is the highest-profile case.

**Connected vehicles.** The 2015 Miller-Valasek Jeep Cherokee remote-control demonstration (over the cellular link). Subsequent demonstrations against Tesla, Volkswagen, Honda. The auto industry has responded with hardened architectures and isolation, but the attack surface remains large.

### IT-OT convergence

Historically, industrial OT (Operational Technology) networks were separate from corporate IT networks. The two were operated by different teams with different priorities — IT focused on confidentiality and convenience, OT focused on availability and safety.

The 2010s and 2020s have seen progressive **IT-OT convergence** — connecting OT systems to corporate networks for monitoring, analytics, and remote management. The convergence improves operational efficiency but expands the attack surface. Stuxnet, Colonial Pipeline, and many other incidents traced their initial access to the IT side before pivoting to OT.

The defensive response: **network segmentation** between IT and OT, with strictly controlled gateways (often using one-way data diodes for telemetry flowing IT-ward and tightly restricted protocols for control flowing OT-ward).

### Standards and frameworks

- **IEC 62443.** The dominant international standard for industrial automation and control system security. Covers technical and procedural requirements at multiple levels.
- **NIST SP 800-82.** Guide to Industrial Control Systems (ICS) Security.
- **NIST CSF.** General cybersecurity framework, applicable to CPS as to other systems.
- **NERC CIP.** North American Electric Reliability Corporation Critical Infrastructure Protection standards. Mandatory for North American bulk-power-system operators.
- **CISA's Cross-Sector Cybersecurity Performance Goals.** Voluntary baseline for US critical-infrastructure operators.

### CPS in Nepal

Nepal's CPS landscape:

- **Electricity grid.** Nepal Electricity Authority operates SCADA systems for transmission and distribution. The Upper Tamakoshi, Kulekhani, and other major hydropower plants are SCADA-controlled. Limited public information on cybersecurity posture; modernisation projects with Asian Development Bank financing have included cybersecurity components.
- **Water supply.** Kathmandu Upatyaka Khanepani Limited and Melamchi Water Supply use control systems with varying degrees of automation. Cybersecurity maturity varies.
- **Industrial.** Cement plants, brick factories, food processing, and other industrial facilities use control systems. Limited public information.
- **Hospitals and medical devices.** Major hospitals (Bir, TUTH, Patan, KMC) increasingly use networked medical devices. Cybersecurity governance is developing.
- **Transportation.** Tribhuvan International Airport's air traffic control and airline systems. Limited information.

The 2024 government-data-centre DDoS and the broader pattern of incidents suggest Nepal's critical-infrastructure cybersecurity remains under-resourced relative to the threat environment.

## 6.10 User Behavior Analytics

*User Behavior Analytics (UBA), often expanded to User and Entity Behavior Analytics (UEBA), is the cybersecurity discipline that uses machine learning and statistical methods to build baselines of normal behaviour for users and entities (devices, applications, services) and detects deviations from those baselines as potential indicators of compromise or insider threat.*

UBA emerged in the mid-2010s as a complement to signature-based detection. Where signature detection asks "does this match a known attack?", UBA asks "is this different from what this user normally does?"

### The motivation

Signature-based detection has known limitations:
- It misses novel attacks.
- It misses attacks using legitimate tools (the "living off the land" pattern).
- It misses insider threats that look like legitimate work.

UBA addresses these gaps. An attacker who has stolen valid credentials looks legitimate by every signature check; UBA notices that "John from accounting" never normally accesses the HR system at 3 AM from a country he has never been to.

### Behavioural signals

UBA platforms collect and model many signals:

**Authentication behaviour.**
- Time of day and day of week of logins.
- Source IP addresses and geographic locations.
- Devices and browsers used.
- Multi-factor authentication method used.
- Velocity of authentication (one login Kathmandu, next login London 30 minutes later is impossible travel).

**Access patterns.**
- Which systems and applications a user accesses.
- Which files, records, or queries they touch.
- Volume of data accessed.
- Patterns of access across time.

**Application behaviour.**
- Which features of an application are used.
- Frequency and timing of feature use.
- Error rates and unusual responses.

**Network behaviour.**
- Communication patterns with other internal systems.
- External connections and destinations.
- Data volumes uploaded and downloaded.

**Endpoint behaviour.**
- Processes launched.
- Files created and modified.
- USB and removable-media activity.
- Print activity.

### Baselining

A UBA system needs a normal-behaviour baseline before it can detect anomalies. Baselining approaches:

**Per-user baselines.** Each user has their own normal pattern. The system needs weeks of data to establish a baseline. New users start with sparse data; their behaviour is compared against peer-group baselines until enough personal data accumulates.

**Peer-group baselines.** Users in similar roles (same department, same job title) tend to have similar behavioural patterns. A user behaving very differently from their peers is anomalous even if they have no personal history.

**Entity baselines.** Servers, applications, services also have baselines. A web server that has never made an outbound database connection to an external IP starting to do so is anomalous.

**Time-of-day, day-of-week patterns.** Most user behaviour has temporal structure. Working-hours access from the office, lower-volume access from home in the evening, no access on Saturdays. Deviations from the temporal structure are signals.

### Anomaly scoring

UBA systems produce **risk scores** for users and entities. The score combines:

- The number of anomalies observed.
- The severity of each anomaly.
- Contextual factors (was this a privileged account? recently terminated employee? high-value asset accessed?).
- Decay over time.

A high-risk score triggers alerting, automated containment (forced re-authentication, account lockout, traffic blocking), or escalation to analyst review.

### Insider threat detection

UBA is particularly valuable against insider threats — malicious or compromised insiders who, by definition, have legitimate access.

Behavioural indicators of potential insider risk:

- An employee who has given notice begins accessing files outside their normal scope.
- A user who suddenly downloads large volumes of data they normally only read.
- Access to sensitive systems outside the user's normal hours or location.
- USB usage that has been historically absent.
- Email forwarding rules to external addresses that did not previously exist.
- Concurrent active sessions from impossible locations (suggesting account compromise).

These signals do not prove malicious intent but justify investigation. False positives are common (the employee may have a legitimate explanation); the goal is to prioritise analyst attention to high-risk patterns.

### Integration with SIEM and SOAR

UBA platforms increasingly integrate with SIEM and SOAR:

- The SIEM provides the event data UBA needs.
- UBA's risk scores feed into the SIEM as additional context.
- SOAR playbooks act on UBA's high-risk alerts (force MFA re-authentication, suspend the account, escalate to investigator).

Major UBA platforms in 2026: Exabeam, Securonix, Microsoft Sentinel UEBA, Splunk User Behavior Analytics, IBM QRadar UBA. Many SIEM platforms now have UEBA capabilities natively rather than as a separate product.

### Privacy considerations

UBA inherently involves monitoring employee behaviour. This raises privacy and legal issues:

- **Disclosure.** Employees must typically be informed that their activities are monitored. Workplace-monitoring laws vary by jurisdiction. The EU's case law generally requires proportionality and transparency.
- **Data minimisation.** UBA should collect only what is necessary for security purposes, not become a general productivity-surveillance tool.
- **Purpose limitation.** UBA data should be used for its stated security purpose, not for performance evaluation or for unrelated investigations.
- **Retention.** UBA data is sensitive; retention should be limited to what is necessary.
- **Access controls.** UBA dashboards typically show user-level detail; access should be restricted to security analysts with legitimate need.

Mature UBA deployments document these considerations in privacy impact assessments and employee-handbook policies.

## 6.11 Personally Identifiable Information (PII) and Protected Health Information (PHI)

The two most-regulated categories of personal data. Both deserve specific treatment because the legal frameworks attach specific obligations to them.

### Personally Identifiable Information (PII)

*Personally Identifiable Information is the category of data that, alone or in combination, identifies a specific individual or could reasonably be used to identify them, including direct identifiers (name, government ID number, biometrics) and indirect identifiers (combinations of demographic and behavioural attributes that uniquely characterise an individual).*

The definition is intentionally broad. Modern privacy law (GDPR's "personal data" definition is functionally equivalent and broader than the US "PII") treats anything that can be linked to an individual as PII.

**Direct identifiers.** Data that alone identifies a person:

- Full name.
- Government identification numbers — Nepali citizenship-card number, passport number, US Social Security Number, Indian Aadhaar number.
- Driver's licence number.
- Email address (typically tied to one person).
- Phone number.
- Account numbers (bank account, customer ID).
- Biometric identifiers — fingerprint, face image, iris pattern, DNA, voice print.
- Photographs of the face.
- Genetic data.

**Indirect identifiers.** Data that does not identify alone but does in combination:

- Date of birth.
- Place of birth.
- Address (alone, may belong to a household; combined with name or DOB, identifies).
- Gender, ethnicity, religion.
- Job title combined with employer.
- IP address (under GDPR, treated as personal data because of its identification potential).
- Cookie identifiers and device identifiers.
- Geolocation data.

The 2000 Sweeney study showed that 87% of the US population is uniquely identified by ZIP code + date of birth + gender. The principle generalises: combinations of seemingly innocuous attributes are often uniquely identifying.

**Sensitive PII categories.** Subsets that warrant additional protection:

- Government identification numbers (high identity-theft risk).
- Financial account information.
- Biometric and genetic data.
- Health information (becomes PHI in some contexts).
- Information about minors.
- Geolocation data.
- Religious, political, and trade-union affiliations.
- Sexual orientation and gender identity.
- Criminal history.

GDPR Article 9 enumerates "special categories" that overlap with this list and require stronger lawful bases for processing.

**Quasi-identifiers and re-identification.** Even data that has been "anonymised" by removing direct identifiers often allows re-identification through quasi-identifier combinations. The Netflix Prize de-anonymisation (2008), the AOL search-log de-anonymisation (2006), the de Montjoye mobile-trajectory work (2013), and the 2019 study showing that 99.98% of Americans could be re-identified from 15 demographic attributes all reinforce the principle.

**De-identification standards.** When PII must be released or shared for research or analytics, several standards exist:

- **HIPAA Safe Harbor** — remove 18 specific identifiers (Section below).
- **HIPAA Expert Determination** — a qualified expert certifies that re-identification risk is very small.
- **k-anonymity** — every record in the released data is indistinguishable from at least k-1 other records on the quasi-identifiers.
- **l-diversity and t-closeness** — refinements of k-anonymity to address weaknesses.
- **Differential privacy** — already covered. The strongest and currently preferred standard.

### Protected Health Information (PHI)

*Protected Health Information is the HIPAA-defined subset of PII that relates to an individual's past, present, or future physical or mental health, the provision of health care to the individual, or the payment for that health care, when transmitted or maintained in any form by a covered entity or business associate.*

PHI gets special protection because health data is especially sensitive — it can affect insurance, employment, relationships, and personal autonomy.

**HIPAA's 18 PHI identifiers** that must be removed for Safe Harbor de-identification:

1. Names.
2. Geographic subdivisions smaller than a state (street address, city, county, precinct, ZIP code).
3. All elements of dates (except year) directly related to an individual, including birth date.
4. Telephone numbers.
5. Fax numbers.
6. Electronic mail addresses.
7. Social Security numbers.
8. Medical record numbers.
9. Health plan beneficiary numbers.
10. Account numbers.
11. Certificate or licence numbers.
12. Vehicle identifiers and serial numbers, including licence plate numbers.
13. Device identifiers and serial numbers.
14. URLs.
15. IP addresses.
16. Biometric identifiers.
17. Full-face photographic images and any comparable images.
18. Any other unique identifying number, characteristic, or code.

Removing all 18 produces data that HIPAA considers de-identified — though re-identification studies suggest the standard is not as protective as once believed.

**HIPAA Privacy Rule.** Governs uses and disclosures of PHI by covered entities (health-care providers, health plans, health-care clearinghouses) and their business associates. Permitted uses without authorisation: treatment, payment, and health-care operations. Other disclosures generally require patient authorisation.

**HIPAA Security Rule.** Requires administrative, physical, and technical safeguards for electronic PHI. Includes encryption, access controls, audit logging, business-associate agreements, training.

**HIPAA Breach Notification Rule.** Notification to affected individuals, HHS, and (for large breaches) media within specific timeframes.

**Penalties.** Civil penalties up to $1.5 million per violation category per year. Criminal penalties for knowing violations.

### Health data outside the US

- **EU.** Health data is a "special category" under GDPR Article 9. Processing requires explicit consent or specific legal basis.
- **UK.** UK GDPR plus the Data Protection Act 2018 plus sectoral NHS-specific rules.
- **Canada.** PIPEDA at federal level; provincial laws (PHIPA in Ontario, similar in others) govern health information.
- **Nepal.** No comprehensive health-data law. The Individual Privacy Act 2075 provides general privacy protection; sector-specific rules from the Nepal Medical Council govern professional conduct.

### Handling PII and PHI

The standard practices:

**Inventory and classification.** Know what PII and PHI you hold. Classify per Chapter 5.

**Minimisation.** Collect only what is necessary. Aggregate or anonymise when individual-level data is not needed.

**Access control.** Strict role-based access. Audit logging of every access.

**Encryption.** At rest and in transit. Strong key management. Cryptographic erasure for deletion.

**Retention limits.** Retain PHI for the regulatory minimum but not longer. Retain PII per the lawful basis for processing.

**Tokenisation.** Replace high-value identifiers with tokens where possible (covered in Chapter 5).

**Third-party governance.** Business-associate agreements (HIPAA) and data-processing agreements (GDPR) for any processor that handles PII or PHI.

**Breach response.** Pre-planned procedures. Notification within regulatory timeframes.

**Training.** Staff who handle PII and PHI should be trained on their obligations and on common pitfalls.

### The Nepal context

The handling of citizens' personal data in Nepal is operationally diverse and legally under-developed:

- Citizenship-card numbers are the primary national identifier. Used widely in finance, telecom, and government. Frequently appears in unexpected places (eg. visible on photocopies in shop drawers).
- Nepal does not yet have a national digital ID rollout at the scale of India's Aadhaar, though plans have been discussed.
- Health records are largely paper-based in smaller facilities; digital systems exist in major hospitals but data-protection practice varies.
- The 2024-25 incidents involving Ministry of Education, Nepal Police, and other data suggest that comprehensive data-protection practice is not yet mature across the government.
- The legal framework (Individual Privacy Act 2075, the Constitution's Article 28) exists but enforcement infrastructure does not match GDPR-style regimes.
- The 2025 IT Bill, if enacted, may strengthen the framework. Sectoral oversight (NRB for banks, NTA for telecom) provides specific guidance in their domains.

The trajectory is toward stronger protection, in line with regional and global trends. The current state remains uneven.

The unifying theme of this chapter: cybersecurity and data privacy are two distinct disciplines that share controls and pursue complementary goals. Modern programmes must work both — building secure systems that are also privacy-respecting, complying with a multi-layered legal landscape, applying technical and operational controls coherently, governing data through its full lifecycle, and treating personal data — especially sensitive categories like PHI — with proportionate care. A descriptive answer must reflect this breadth.
