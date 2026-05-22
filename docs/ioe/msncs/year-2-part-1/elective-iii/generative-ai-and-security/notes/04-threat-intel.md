---
title: 'Chapter 4 — Threat Intelligence and Anomaly Detection'
sidebar_label: 'Ch 04 — Threat Intelligence and Anomaly Detection'
sidebar_position: 4
description: 'Chapter 4 of Generative AI and Security (ENCTNS615).'
slug: /ioe/msncs/year-2-part-1/elective-iii/generative-ai-and-security/notes/ch04
tags: [msncs, ENCTNS615, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Threat intelligence is the discipline of understanding adversaries — who they are, what they want, how they operate — and turning that understanding into actionable defensive measures. Anomaly detection is the technical capability of identifying activity that deviates from expected patterns, providing a primary mechanism for detecting attacks. Generative AI transforms both disciplines: synthesising vast threat-intelligence sources into actionable insights, predicting adversarial behaviour, identifying patterns in network and system activity that escape rule-based detection, and countering AI-driven attacks with AI-driven defence. This chapter examines AI for threat intelligence gathering and analysis, generative models for adversary behaviour prediction, anomaly detection with machine learning, and real-time countermeasures against AI-based attacks.

## 4.1 Using AI for threat intelligence gathering and analysis

### Threat intelligence

*Threat intelligence is evidence-based knowledge about existing or emerging threats — their context, mechanisms, indicators, implications, and actionable advice — that informs defenders' decisions about how to prevent, detect, and respond to attacks, with categories spanning strategic, tactical, operational, and technical levels.*

The four levels:

**Strategic threat intelligence.** High-level information for leadership — threat landscape, industry trends, geopolitical context, risk implications. Audience: executives, board.

**Tactical threat intelligence.** TTPs (Tactics, Techniques, Procedures) used by adversaries. Audience: security architects, SOC managers.

**Operational threat intelligence.** Specific campaigns and incidents — who is attacking, what are they targeting, how are they operating. Audience: SOC analysts, incident responders.

**Technical threat intelligence.** Specific indicators — IP addresses, file hashes, domain names, signatures. Audience: detection engineers, automated systems.

Different audiences need different levels.

### Threat intelligence sources

**Open sources:**
- Security vendor reports (Mandiant, CrowdStrike, Recorded Future, others).
- Government advisories (CISA, NCSC, npCERT).
- Academic research (USENIX, Black Hat, DEF CON).
- Social media (Twitter, Mastodon, security researchers' posts).
- News media.
- Vulnerability databases (NVD, CVE Details).

**Closed sources:**
- Commercial threat intelligence feeds.
- ISAC (Information Sharing and Analysis Center) memberships — FS-ISAC for finance, others.
- Vendor proprietary data.
- Government classified information.

**Internal sources:**
- Own incident data.
- Honeypots and deception infrastructure.
- Internal telemetry analysed for threat patterns.
- Peer organisations' shared experiences.

### The volume problem

Threat intelligence at scale creates volume challenges:
- Thousands of security advisories monthly.
- Daily vendor reports.
- Continuous social media chatter.
- Tens of thousands of IOCs (Indicators of Compromise) daily.

Human analysts cannot process all of it. AI augmentation is essential.

### AI applications in threat intelligence

**Collection automation.** AI orchestrates collection from many sources, filters for relevance.

**Translation.** AI handles content in many languages — security research published globally; threat actor communications in various languages.

**Summarisation.** Long reports summarised into actionable insights.

**Extraction.** AI extracts structured information from unstructured reports — IOCs, TTPs, actors, victims.

**Correlation.** Connecting related intelligence from multiple sources.

**Contextualisation.** Adding relevance to specific organisation's environment.

**Trend identification.** Patterns across many reports.

**Generation.** Producing intelligence reports for various audiences.

### LLM-powered threat intelligence platforms

**Commercial platforms:**

- **Recorded Future.** Comprehensive intelligence platform with substantial AI features.
- **Mandiant Advantage.** Threat intelligence with AI augmentation.
- **CrowdStrike Falcon Intelligence.** Threat intelligence integrated with EDR.
- **Anomali ThreatStream.** Aggregation and analysis.
- **ThreatConnect.** Platform with AI assistance.
- **Microsoft Sentinel** with threat intelligence features.

**Open-source/community:**

- **MISP (Malware Information Sharing Platform).** Open-source threat-sharing platform.
- **OpenCTI.** Open-source threat intelligence platform.
- **TheHive Project.** SIRP with TI integration.

### Threat intelligence in Nepali context

For Nepali enterprises:

**Sources:**
- **npCERT.** National-level alerts and coordination.
- **FS-ISAC.** Some Nepali banks members.
- **Commercial vendors.** Mandiant, CrowdStrike, Recorded Future available.
- **Regional sources.** Indian CERT (CERT-In), regional ISACs.
- **Open sources.** Global security community resources.

**Limitations:**
- Limited Nepal-specific threat intelligence as primary source.
- Most intelligence is global or regional with selective applicability.
- Limited intelligence sharing among Nepali organisations.

**Opportunities:**
- Emerging Nepali threat-intelligence sharing arrangements (informal among CISOs).
- npCERT capability building.
- Regional cooperation with Indian and other South Asian CERTs.

### MITRE ATT&CK framework

*MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations, structured as a matrix that defenders use to understand adversary behaviour, develop detection strategies, assess defensive posture, and communicate consistently about threats.*

The framework organises:
- **Tactics.** Adversary goals (Initial Access, Execution, Persistence, etc.).
- **Techniques.** Specific approaches to achieve tactics.
- **Sub-techniques.** Variants of techniques.
- **Procedures.** Specific implementations by named threat actors.

ATT&CK has become the lingua franca of threat intelligence. Most modern threat reports map findings to ATT&CK; most detection content references ATT&CK; most defensive assessments use ATT&CK as a measurement framework.

### AI and ATT&CK

LLMs assist with ATT&CK in several ways:

**Mapping.** Tagging observed activity to specific techniques.

**Translation.** From threat reports to ATT&CK mappings.

**Detection generation.** Creating detection rules for specific techniques.

**Coverage analysis.** Identifying detection gaps relative to ATT&CK.

**Threat-actor profiling.** Building profiles based on technique usage patterns.

### IOCs and STIX/TAXII

**Indicators of Compromise (IOCs).** Specific technical indicators — IPs, hashes, domains, etc.

**STIX (Structured Threat Information Expression).** Standardised format for threat intelligence.

**TAXII (Trusted Automated Exchange of Indicator Information).** Protocol for sharing STIX.

These standards enable machine-readable intelligence sharing. AI processes and enriches STIX data; helps with translation between formats.

## 4.2 Generative models for adversarial behavior prediction

### Adversary behaviour modelling

*Adversary behaviour modelling is the practice of building representations of how threat actors operate — their motivations, capabilities, tactics, and patterns — to support prediction of future actions, anticipation of attacks, and design of defences targeted to specific adversaries.*

Traditional approaches:
- Threat actor profiling based on historical activity.
- Geopolitical analysis predicting motivations.
- Capability assessment based on observed attacks.

Generative AI adds new dimensions.

### Generative models for prediction

**Behaviour generation.** Train models on observed adversary behaviour; generate likely future actions.

**Variant generation.** Given a known attack, generate variants the same actor might use.

**Scenario generation.** Generate plausible attack scenarios for defensive planning.

**Adversary emulation.** AI-driven systems that simulate specific threat actors for testing.

### Adversary emulation platforms

**MITRE Caldera.** Open-source adversary emulation framework.

**Atomic Red Team.** Library of atomic tests for ATT&CK techniques.

**CrowdStrike Falcon Forensics.** Includes emulation capabilities.

**SafeBreach, AttackIQ, Cymulate.** Commercial breach-and-attack simulation platforms.

These platforms increasingly incorporate AI for scenario generation and adversary simulation.

### Predictive modelling

ML models can predict:

**Likely targets.** Which assets are most likely to be attacked next.

**Likely techniques.** Which TTPs threat actors will employ.

**Timing patterns.** When attacks are most likely.

**Escalation patterns.** How threats may evolve.

**Attribution likelihood.** Which actor likely behind observed activity.

### Limitations

Adversary prediction has inherent limitations:

**Adaptive adversaries.** Threat actors change tactics in response to defences.

**Black swan events.** Genuinely novel attacks aren't predictable from past data.

**Attribution challenges.** Misattribution can lead to flawed prediction.

**Limited training data.** Some threat actors generate insufficient data for reliable prediction.

**Deception.** Sophisticated adversaries may deceive predictors.

Probabilistic prediction with calibrated uncertainty is more useful than confident specific predictions.

### Threat actor TTPs as training data

**Named threat actors:**
- APT groups documented extensively (APT29/Cozy Bear, APT41, Lazarus, others).
- Cybercriminal groups (FIN groups, ransomware operators).
- Hacktivist groups (Anonymous variants).

For each, accumulated observation provides training signal for behavioural modelling. Recent regions of interest for South Asian targets include groups historically associated with state-aligned operations against the region.

For Nepali context specifically:
- Limited public attribution of attacks on Nepali targets.
- Nepal Police late-2025 breach attributed in some reporting to specific actor groups.
- Nepali organisations generally targeted as part of broader regional campaigns rather than specifically.

### Generative adversary emulation example

A defensive exercise:

1. **Target:** Test SOC capability against a specific APT.
2. **Profile:** AI builds profile of the APT from public reports.
3. **Scenario:** Generate plausible attack scenario based on APT's typical TTPs against similar targets.
4. **Execution:** Red team executes simulation.
5. **Detection:** SOC attempts to detect.
6. **Analysis:** Gaps identified.
7. **Improvement:** Detections built, processes updated.
8. **Re-test:** Verify improvements work.

AI augmentation accelerates each step — particularly scenario generation and detection development.

## 4.3 Detecting anomalies using machine learning techniques

### Anomaly detection

*Anomaly detection (or outlier detection) is the identification of items, events, or observations that deviate from expected patterns or other items in a dataset — applied in security to identify unusual activity that may indicate attacks, compromised systems, or insider threats — using statistical, machine-learning, or hybrid approaches.*

### Statistical anomaly detection

Traditional approaches:

**Z-score / standard deviation.** Values far from mean flagged as anomalous.

**Interquartile range (IQR).** Values outside 1.5x IQR flagged.

**Time-series methods.** Seasonal decomposition; deviation from forecast.

**Distribution fitting.** Fit distribution; flag low-probability observations.

These work for univariate data with clear distributions.

### ML anomaly detection

For complex multivariate data:

**Isolation Forest.** Anomalies easier to isolate; built into many ML libraries.

**One-class SVM.** Learn boundary of "normal"; flag outside.

**Autoencoders.** Reconstruction error flags anomalies.

**Variational Autoencoders.** Probabilistic anomaly scores.

**Clustering-based.** Points far from clusters anomalous.

**LSTM/RNN for sequences.** Anomalies in sequences.

**Transformer-based.** Modern approaches.

### Anomaly types in security

**Point anomalies.** Single event unusual.

**Contextual anomalies.** Event unusual in specific context (CPU usage normal but not at 3am).

**Collective anomalies.** Sequence unusual; individual events not.

Different detection approaches for different anomaly types.

### Network anomaly detection

**Traffic volume anomalies.** Unusual bytes-per-second; new traffic patterns.

**Connection anomalies.** Unusual destinations, ports, protocols.

**Behavioural anomalies.** Hosts behaving differently than baseline.

**Lateral movement detection.** Unusual east-west traffic.

**Beaconing detection.** Regular intervals suggesting C2.

**DNS anomalies.** Unusual query patterns.

### User and entity behaviour analytics (UEBA)

*User and Entity Behaviour Analytics is the application of machine learning and statistical analysis to detect anomalous behaviour by users and other entities (servers, applications, services) in an organisation, used to identify compromised accounts, malicious insiders, and other threats that signature-based detection misses.*

UEBA platforms:
- **Microsoft Sentinel UEBA.**
- **Splunk UBA.**
- **Exabeam.**
- **Securonix.**
- **Vectra AI.**

UEBA learns each entity's baseline; flags significant deviations.

### Cloud anomaly detection

For cloud environments:
- **AWS GuardDuty.** ML-based threat detection.
- **Azure Defender for Cloud.** Multi-pillar threat detection.
- **GCP Security Command Center.** Including anomaly findings.
- **Wiz, Orca, Lacework** for CSPM with anomaly features.

### Application anomaly detection

For applications:
- **Application performance anomalies** indicating attack or compromise.
- **API usage anomalies.**
- **Database query anomalies.**
- **Code execution anomalies.**

Tools: Datadog, New Relic, Dynatrace, application-specific solutions.

### Anomaly detection challenges

**False positives.** Many statistical anomalies are benign; high false-positive rates challenge operational use.

**Concept drift.** Normal patterns change over time; models need updating.

**Cold start.** New entities have no baseline.

**Adversarial evasion.** Attackers may stay within normal patterns.

**Explanation.** Why was this anomalous? Hard to explain ML decisions.

**Tuning.** Each environment needs tuning.

### Practical anomaly detection

Mature deployments use anomaly detection as one signal among many — not as a primary alerting source. Correlation with other signals reduces false positives.

A typical SOC workflow:
1. Anomaly detected by ML system.
2. Combined with rule-based signals (specific known patterns).
3. Threat intelligence enrichment.
4. Risk scoring based on combination.
5. Alert raised only when combined score exceeds threshold.
6. Analyst investigates if alerted.

The combination produces fewer, higher-quality alerts than any single approach.

### AI in anomaly detection

Generative AI adds to anomaly detection:

**Explanation generation.** LLM explains why an anomaly is suspicious.

**Triage assistance.** LLM helps analyst investigate.

**Pattern discovery.** AI finds new attack patterns to add to detection.

**Correlation enhancement.** AI correlates anomalies across data sources.

**Adaptive learning.** Models updated continuously based on feedback.

## 4.4 Countering generative AI-based attacks with real-time monitoring

### AI-attack landscape

Specific attacks where generative AI enables or enhances:

**AI-generated phishing.** Chapter 5 focus.

**AI-generated malware.** Chapter 6 focus.

**AI-driven reconnaissance.** Chapter 2 focus.

**Deepfakes** for fraud and social engineering.

**Voice cloning** for vishing.

**LLM-generated social engineering scripts.**

**AI-augmented exploitation.** Chapter 3 focus.

**Adversarial attacks on ML systems.** Specific class.

### Specific countermeasures

**Deepfake detection.**

Several approaches:
- Spectral analysis of audio for synthesis artifacts.
- Visual analysis of video for inconsistencies (lighting, blinking patterns, micro-expressions).
- Provenance verification (cryptographic signing of authentic content; C2PA standard).
- Behavioural verification (does the person actually do what the deepfake shows?).

Tools:
- **Microsoft Video Authenticator.**
- **Intel FakeCatcher.**
- **Deepware Scanner.**
- **Sensity AI.**

The arms race continues — deepfake quality improves; detection must too.

**Voice-cloning detection.**

- Acoustic analysis for synthesis artifacts.
- Liveness detection in voice authentication.
- Out-of-band verification for high-value transactions.
- Multi-factor including non-voice factors.

For Nepali banks dealing with telephone-based fraud, the threat of voice cloning is increasing. Defensive shift: don't rely solely on voice recognition for authentication.

**AI-generated phishing detection.**

- ML-based phishing detection adapted for AI-generated content.
- Behavioural analysis (sender patterns, sending infrastructure).
- Content analysis (looking for AI-generation indicators where present).
- URL and attachment analysis.
- User training adapted for higher-quality phishing.

**AI-augmented attack detection.**

Where attacks have AI augmentation (faster reconnaissance, custom malware, adaptive evasion), defences need:
- Faster detection cycles.
- Behaviour-based rather than signature-based detection.
- Multi-stage correlation.
- Automated initial response.
- Human escalation for complex cases.

### Real-time monitoring infrastructure

The infrastructure for real-time defence:

**SIEM.** Central correlation, as covered extensively.

**SOAR.** Automated response.

**EDR/XDR.** Endpoint and extended detection.

**Network detection.** NDR (Network Detection and Response) products.

**Cloud-native security.** Provider-native services.

**API security.** Salt Security, Noname Security, others.

**Identity protection.** Identity-focused threat detection.

### Speed of response

AI-augmented attacks can move quickly. Response must too:

**Detection in seconds, not hours.**

**Initial response in minutes.**

**Containment in tens of minutes.**

**Investigation in hours.**

**Remediation in hours to days.**

**Lessons learned in days to weeks.**

Achieving these speeds requires substantial automation; manual response cannot keep up.

### Defensive AI agents

Emerging pattern: AI agents that operate autonomously within defined parameters.

**Capabilities:**
- Triage alerts.
- Gather context.
- Execute initial response (containment).
- Generate investigations.
- Escalate to humans.

**Risks:**
- Wrong autonomous decisions cause damage.
- Adversarial manipulation of AI decisions.
- Reduced human awareness of operations.
- Failure modes harder to predict.

Mature deployments give AI agents narrow scope and clear escalation paths — automation of well-defined tasks; humans on judgement calls.

### The asymmetric AI race

Defenders generally face larger surface area than attackers:

**Attackers** automate attacks against many targets; need success against few.

**Defenders** protect many systems; need success against all attacks.

AI multiplies both sides; the asymmetry doesn't go away.

The defender's response:
- AI augmentation everywhere.
- Continuous capability improvement.
- Threat intelligence integration.
- Workforce capability building.
- Acceptance that perfect prevention impossible; detect-and-respond capability essential.

### Nepali context for AI-enabled attacks

For Nepali enterprises:

**Increasing AI-attack frequency.** Phishing in Nepali language at quality improvable from generic global phishing. Voice attacks targeted at Nepali speakers.

**Limited defensive AI capability.** Most Nepali organisations lack mature AI-augmented detection.

**Skill gap.** Few security professionals trained in AI-aware defence.

**Awareness gap.** End users underestimate AI-enabled threats.

**Regulatory lag.** Frameworks not yet updated for AI-era threats.

**Opportunity.** MSc graduates with AI-and-security skills well-positioned for impactful roles.

### The integration of threat intelligence and detection

Modern security operations integrate threat intelligence and detection as a continuous loop:

```
Intelligence collection
        ↓
Analysis and contextualisation
        ↓
Detection rule development
        ↓
Real-time monitoring
        ↓
Alert generation
        ↓
Investigation
        ↓
Response
        ↓
Lessons learned → Intelligence collection
```

AI accelerates each step; the loop itself is the discipline. Mature security operations close this loop continuously; immature operations have gaps where intelligence sits unused or detection runs without intelligence context.

The next chapter shifts focus to one of the most prominent applications of generative AI in cyberattacks — social engineering and phishing, where AI-generated content has transformed the threat landscape.
