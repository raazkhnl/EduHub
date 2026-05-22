---
title: 'Chapter 8 — Emerging Trends and Ethical Considerations'
sidebar_label: 'Ch 08 — Emerging Trends and Ethical Considerations'
sidebar_position: 8
description: 'Chapter 8 of Generative AI and Security (ENCTNS615).'
slug: /ioe/msncs/year-2-part-1/elective-iii/generative-ai-and-security/notes/ch08
tags: [msncs, ENCTNS615, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The preceding chapters covered current capabilities — what generative AI can do today, the attack and defence patterns visible now, the operational disciplines emerging in mature organisations. This final chapter looks ahead. Autonomous AI-driven cyberattacks that operate with minimal human direction are no longer hypothetical; the question is timeline and capability ceiling. The ethical concerns of a powerful dual-use technology — who decides what gets built, who gets access, who is accountable when things go wrong — are unresolved and consequential. Legal and compliance frameworks are evolving rapidly but unevenly across jurisdictions. The quantum computing transition that has been a long-term horizon for cryptography is approaching practical relevance, and quantum AI may reshape both attack and defence. The MSc graduate beginning a security career in 2026 will operate through the unfolding of all of these. This chapter examines each.

## 8.1 Future attack scenarios — autonomous AI-driven cyberattacks

### Autonomous AI agents

*An AI agent is a system that uses large language models or related capabilities to perceive an environment, make decisions, and take actions toward goals over extended sequences of operations with minimal step-by-step human direction, characterised by tool use, memory, planning, and adaptation rather than the single-turn input-output pattern of basic LLM use.*

Agent frameworks have matured through 2024-2026:
- **AutoGPT, BabyAGI, and successors** demonstrating proof-of-concept agentic capability from 2023.
- **LangChain, LangGraph** providing development frameworks.
- **OpenAI Assistants API, Claude Computer Use, Claude Code** as commercial agent platforms.
- **Browser agents, code agents, research agents** as specialised forms.
- **Multi-agent frameworks** orchestrating collaborating agents.

The capability has grown rapidly. What required substantial human guidance in 2023 increasingly runs autonomously in 2026.

### Agentic cyberattacks

The application to offensive operations is direct. An attack-oriented agent could:

**Reconnaissance phase.** Autonomously gather OSINT, map infrastructure, identify personnel — work that previously required skilled human attackers across many hours.

**Vulnerability discovery.** Scan identified targets, prioritise findings, research exploitation techniques.

**Exploitation phase.** Select and customise exploits, attempt access, adapt to defensive responses.

**Lateral movement.** Once initial access achieved, explore the environment, escalate privileges, move toward objectives.

**Exfiltration.** Identify valuable data, package and exfiltrate while evading detection.

**Persistence.** Establish multiple footholds; clean operational artefacts.

The agent could conduct an entire attack campaign with periodic human check-ins rather than continuous direction.

### Agentic malware

Beyond agentic operators directing attacks, malware itself may become agentic:

**Adaptive behaviour.** Malware that adjusts tactics based on observed defensive responses.

**Goal-directed operation.** Malware pursuing specific objectives rather than fixed scripts.

**Inter-agent coordination.** Multiple malware instances cooperating.

**Self-improvement.** Malware that improves its own evasion based on detection feedback.

**Environment-specific adaptation.** Malware customising itself to specific victim environments.

These capabilities have appeared in research and limited operational use; broader deployment expected through the late 2020s.

### AI versus AI defence

The corresponding defensive evolution:

**Defensive agents.** AI agents continuously monitoring, hunting, responding.

**Automated incident response.** From detection to containment without human delay.

**Continuous adversary emulation.** Defensive agents simulating attacks to find weaknesses.

**Adaptive defences.** Defences that adjust based on observed attacker behaviour.

The visible operational reality: AI agents on both sides, with humans in supervisory and exception-handling roles.

### Capability uplift for low-skill attackers

A persistent concern: AI lowers skill barriers, enabling less-skilled attackers to conduct sophisticated attacks. The historical pattern of skilled attackers selling capability to less-skilled buyers (exploit kits, ransomware-as-a-service) accelerates with AI.

For Nepali context, this means:

- More frequent attacks of higher technical quality against Nepali targets.
- Attacks in Nepali language at quality previously impractical.
- Local cybercriminals with AI assistance achieving capabilities previously requiring foreign actors.
- Defensive baseline must rise across all organisations, not just well-resourced ones.

### Swarm attacks

Beyond single agents, multi-agent attacks:

**Coordinated reconnaissance.** Many agents gathering information in parallel.

**Distributed exploitation.** Simultaneous attempts across many vectors.

**Distraction operations.** Some agents create noise while others operate quietly.

**Resource exhaustion.** Coordinated demand against defensive infrastructure.

Defensive infrastructure designed for human-pace attacks may struggle with swarms.

### Deepfake-driven fraud at scale

The 2024 Arup deepfake fraud was an early example. Mature capability enables:

**Mass deepfake fraud.** Targeting many victims with personalised deepfakes.

**Real-time deepfake conversations.** Video calls in real time with synthetic participants.

**Voice cloning at scale.** Many fraudulent calls with cloned voices simultaneously.

**Synthetic-media disinformation.** At scale during sensitive events (elections, crises).

For Nepali context, the risk to financial services and citizen trust is substantial. NRB-regulated entities likely to face increasing voice and video deepfake attempts targeting both customers and employees.

### AI-driven supply chain attacks

The SolarWinds and Codecov incidents demonstrated supply chain attack devastation. AI may enable:

**Identification of weak links.** AI analyses supply chains to find vulnerable upstream components.

**Coordinated supply chain compromise.** Multiple suppliers compromised simultaneously.

**Subtle code injection.** AI-generated backdoors harder to spot in code review.

**Long-term persistence.** Multi-year operations as AI maintains stealth across release cycles.

Defensive measures: SBOMs (Software Bill of Materials), supply chain monitoring, AI-aware code review, dependency scanning.

### The arms race trajectory

The 2026-2030 trajectory likely involves:

- Continued improvement in AI capabilities on both sides.
- Increasing autonomy of both attack and defensive operations.
- Persistent human role in judgement-intensive aspects.
- Expanding attack surface as AI permeates more systems.
- Defensive tooling sophistication matching offensive.

The outcome is unlikely to be clear "winners" but rather continuing dynamic where both sides advance and the operating environment grows more complex.

## 8.2 Ethical concerns — dual-use AI and societal risks

### Dual-use technology

*A dual-use technology is one with both beneficial civilian applications and potential harmful military, criminal, or societal applications, where the same underlying capability serves widely divergent purposes depending on who deploys it and for what ends, creating fundamental challenges for governance and access decisions.*

Examples beyond AI: nuclear technology, biotechnology, cryptography, surveillance technologies. AI is squarely in this category, and generative AI especially so.

### The dual-use dilemma in generative AI

Specific tensions:

**Phishing detection requires understanding phishing.** Models that detect phishing well must understand how phishing works — knowledge that could be misused.

**Vulnerability research requires understanding vulnerabilities.** Defensive vulnerability research and offensive exploit development use overlapping skills.

**Malware analysis requires understanding malware.** Defensive analysis benefits from the same capabilities that could aid creation.

**Synthetic content has legitimate uses.** Marketing, entertainment, education — alongside deepfake fraud and disinformation.

**Code generation aids productivity and aids attackers.** Same capability.

There is no clean technical distinction between defensive and offensive use of most generative AI capabilities.

### Responsible scaling and frontier model decisions

The major frontier model developers have published frameworks for responsible development and release:

**Anthropic Responsible Scaling Policy.** Framework defining capability levels and required safety measures.

**OpenAI Preparedness Framework.** Similar tracking of dangerous capability development.

**Google DeepMind Frontier Safety Framework.** Framework for frontier model evaluation.

**UK AI Safety Institute, US AI Safety Institute.** Government-affiliated evaluation bodies.

These frameworks address questions like:
- When are model capabilities dangerous enough to warrant restrictions?
- What evaluations should models undergo before release?
- What deployment safeguards are required?
- When should development pause for safety work?

### Open versus closed weights

A central debate:

**Open-weight advocates** argue: broader access enables broader research, including safety research; concentrates power less; enables customisation; provides resilience against single-vendor decisions.

**Closed-weight advocates** argue: harder to misuse what attackers cannot directly access; more controlled deployment; ability to revoke access for misuse; sustainable business model.

The reality is mixed. Most capable models exist in both forms. The frontier remains closed-weight; open-weight follows with some lag. The Llama, DeepSeek, Mistral and Qwen families maintain quality approaching frontier.

For cybersecurity specifically, open-weight models enable both defensive research (academic and commercial security researchers studying attacks) and offensive capability development (attackers fine-tuning models for malicious purposes).

### Capability evaluations

Specific concerns evaluated:

**Biosecurity.** Could the model assist creation of dangerous biological agents.

**Cybersecurity.** Could the model meaningfully assist cyberattacks beyond what is otherwise available.

**Chemical weapons.** Could the model assist synthesis of dangerous chemicals.

**Nuclear/radiological.** Could the model assist these capabilities.

**Persuasion and manipulation.** Could the model effectively manipulate humans.

**Autonomy.** Could the model operate with sufficient autonomy to be dangerous.

Frontier labs evaluate models against these and publish results. The evaluations are imperfect — models may have capabilities not detected by evaluation — but provide a structured approach.

### Model weights as proliferation concern

Once frontier model weights are public, they cannot be recalled. This makes release decisions especially weighty. The Llama series releases, DeepSeek-R1 release, and others have been the subject of substantial debate about whether the release was appropriate given capability levels.

### Bias and fairness in security AI

ML models inherit biases from training data. In security contexts:

**False positive bias.** Systems may flag certain demographics or behaviours more often.

**Detection coverage gaps.** Underrepresented attack patterns may not be detected.

**Authentication bias.** Biometric systems may work less well for some demographics.

**Hiring and access decisions.** AI-augmented HR may discriminate.

**Insider-threat detection.** May target specific employees inappropriately.

Mitigations: diverse training data, fairness testing, human oversight on consequential decisions, continuous monitoring for biased outcomes.

### Surveillance concerns

AI capabilities enable surveillance at unprecedented scale:

**Identification.** Face recognition across many cameras.

**Tracking.** Movement across locations and times.

**Communication analysis.** Mass interception with AI parsing.

**Behavioural prediction.** Predicting individual behaviour.

**Sentiment monitoring.** Tracking public sentiment in real time.

The same capabilities serve legitimate purposes (finding missing persons, detecting fraud) and authoritarian purposes (suppressing dissent, tracking opposition). The technology is morally neutral; deployment is not.

For Nepali context, surveillance technology adoption is increasing but limited compared to some neighbours. Legal frameworks (Privacy Act 2075, constitutional Article 28) provide some protection but enforcement is variable.

### Autonomous decision-making

Where AI takes consequential decisions without human review:

**Automated incident response.** Containing systems may damage operations.

**Automated content moderation.** May suppress legitimate speech.

**Automated hiring/access decisions.** May produce unjust outcomes.

**Automated medical decisions.** May produce harm.

**Automated military targeting.** Most controversial application.

Ethical frameworks generally require:
- Human oversight for consequential decisions.
- Explanation capability for decisions.
- Appeal mechanisms.
- Accountability for outcomes.

### Accountability gaps

When AI makes a wrong decision causing harm, who is responsible?

- The user who deployed it?
- The vendor who built it?
- The data provider who provided training data?
- The model developer who trained it?
- The regulator who allowed it?

Legal frameworks struggle with these questions. The MSc graduate operating in security needs awareness — decisions made today may have consequences whose accountability is unclear.

### Societal risks

Beyond individual harms:

**Disinformation at scale.** AI-generated content overwhelming verification capacity.

**Trust erosion.** Inability to distinguish authentic from synthetic erodes general trust.

**Democratic processes.** Election integrity threatened by AI-generated content.

**Economic disruption.** Automation displacing workers faster than adaptation.

**Concentration of power.** Few organisations controlling powerful AI.

**Skills displacement.** Human skills atrophying as AI handles tasks.

These risks are not security-specific but interact with security in important ways. Security professionals are among those who should be informed voices in broader societal debates.

### Researcher responsibilities

For those working on generative AI security:

**Responsible disclosure.** Vulnerabilities disclosed responsibly.

**Dual-use awareness.** Considering misuse potential.

**Publication caution.** Some research findings may need restricted publication.

**Tool release decisions.** Tools enabling attacks may not warrant public release.

**Engagement with policymakers.** Informed input to governance.

**Mentoring.** Building responsible practice in next generation.

For Nepali context, the MSc graduate may participate in research with international implications. The same ethical frameworks apply.

### Dual-use research of concern

Some research categories warrant especially careful consideration:

- Research substantially advancing offensive capability without corresponding defensive benefit.
- Research enabling broad-scale attacks that previously required substantial skill.
- Research on attacks against critical infrastructure.
- Research on attacks against safety-critical systems.

The norm: discuss with peers, mentors, institutional review boards before publishing. The MSc thesis or research projects may benefit from such review.

## 8.3 Legal and compliance considerations for generative AI in cybersecurity

### Evolving legal landscape

The legal framework for AI in cybersecurity is evolving rapidly across jurisdictions. The MSc graduate working through the late 2020s will navigate continuously-changing requirements.

### EU AI Act

Discussed briefly in Chapter 7. Specific provisions affecting security AI:

**High-risk AI systems** include systems used in critical infrastructure, law enforcement, biometric identification. Security AI deployed in such contexts faces substantial compliance requirements.

**Prohibited practices** include certain emotion recognition, social scoring, certain biometric categorisation. Some security applications may fall within prohibitions.

**Transparency requirements** for AI systems interacting with users. Security tools that engage with users (chatbot interfaces, etc.) covered.

**General-purpose AI rules** apply to foundation models. Cybersecurity-focused fine-tunes may inherit obligations.

**Phased implementation** through 2025-2027. Compliance deadlines vary by provision.

Even non-EU organisations face EU AI Act obligations if their systems serve EU users.

### US regulatory landscape

**Executive orders.** Biden-era executive orders on AI safety; subsequent administration's approaches.

**State laws.** California, New York, Texas with various AI legislation.

**Sectoral regulation.** SEC, FTC, NIST involvement.

**Voluntary commitments.** Major AI companies have made voluntary safety commitments.

The US framework is more sectoral than EU's comprehensive approach.

### UK approach

Pro-innovation framework regulating AI through existing regulators rather than dedicated AI law. ICO (data protection), FCA (financial services), CMA (competition) each issuing AI guidance for their domains.

UK AI Safety Institute conducts capability evaluations of frontier models.

### China

Comprehensive regulation through:
- Algorithmic recommendation provisions (2022).
- Deep synthesis provisions (2023).
- Generative AI services measures (2023).
- AI law in development.

Distinct approach including content controls and security review requirements.

### India

AI governance through existing IT Act and emerging Digital India Act. Sectoral guidance from RBI (banking), IRDAI (insurance), others. Active discussion about dedicated AI legislation.

For Nepali enterprises with Indian operations or customers, Indian regulations relevant.

### Nepal

No dedicated AI legislation as of 2026. Existing frameworks apply:

**Privacy Act 2075.** Personal data handling including by AI systems.

**Electronic Transactions Act 2063.** Electronic records, digital signatures.

**Constitutional Article 28.** Fundamental privacy right.

**Sectoral.** NRB directives apply to AI use in banking; similar for telecoms (NTA), health (MOHP).

**Cybercrime provisions.** Existing cybercrime law applies to AI-assisted crimes.

Updates likely as AI adoption grows. The MSc graduate should track regulatory developments.

### Sectoral guidance evolution

**Financial services.** Central banks globally issuing AI guidance. NRB likely to follow with Nepal-specific guidance.

**Healthcare.** Medical AI regulation evolving (FDA in US, similar bodies elsewhere).

**Critical infrastructure.** AI in critical infrastructure subject to additional scrutiny.

**Public sector.** AI in government services subject to special requirements.

### Criminal law adaptation

Existing criminal law applies to AI-assisted crimes but adaptation occurring:

**Deepfake-specific laws.** Several jurisdictions criminalising non-consensual deepfakes.

**AI fraud provisions.** Some jurisdictions adding AI-specific fraud provisions.

**Voice cloning regulation.** Limited but emerging.

**Election integrity.** AI content in elections subject to special provisions in many jurisdictions.

### Evidence admissibility

AI-derived evidence in legal proceedings:

**Forensic findings from AI tools.** Admissibility varies; courts increasingly accepting with appropriate documentation.

**Authentication of digital evidence.** AI generation complicates authentication.

**Expert testimony on AI.** Specialised expertise increasingly required.

**Chain of custody for AI processing.** Documentation of AI processing steps.

For Nepali courts, frameworks for digital evidence (Evidence Act 2031, ETA 2063) apply; specific AI provisions are limited. Conservative approach (thorough documentation, human verification) is appropriate.

### Contractual considerations

Beyond regulation, contractual obligations:

**Customer agreements.** What AI uses are permitted with customer data.

**Vendor agreements.** What AI vendors do with provided data.

**Insurance.** Cyber insurance policies may have AI-specific provisions.

**Professional services.** Engagement letters covering AI use.

**Employment agreements.** Employee AI use rules.

The MSc graduate participating in vendor evaluations, customer agreements, or operational decisions needs awareness of contractual implications.

### Compliance programmes

Practical compliance programme elements:

**Inventory.** AI systems and uses tracked.

**Policy.** Organisational AI policy.

**Risk assessment.** AI-specific risk assessment.

**Controls.** Appropriate to risks.

**Training.** Staff awareness.

**Monitoring.** Compliance status.

**Audit.** Periodic verification.

**Incident response.** AI-specific incidents.

**Documentation.** Comprehensive records.

For Nepali context, formal AI compliance programmes are early-stage in most organisations. Building these programmes is opportunity for the MSc graduate.

## 8.4 Preparing for quantum AI and post-quantum security challenges

### Quantum computing recap

Discussed in detail in ENCTNS502 (Cryptography and Data Security) and ENCTNS565 (Intelligent Networking). Brief recap relevant to this chapter.

**Quantum computers** use quantum-mechanical phenomena (superposition, entanglement) for computation. Specific algorithms (Shor's, Grover's) provide substantial speedup for certain problems including some currently used in cryptography.

**Current state (2026).** Limited-scale quantum computers operational; not yet capable of breaking widely-used cryptography. Major efforts: IBM, Google, IonQ, Quantinuum, various government programmes including Chinese and EU initiatives.

**Timeline.** Cryptographically-relevant quantum computers estimated 5-20 years away depending on optimism. The uncertainty matters — preparation cannot wait for certainty.

### Post-quantum cryptography

*Post-quantum cryptography (PQC) refers to cryptographic algorithms believed to be secure against attacks by quantum computers, based on mathematical problems that are not known to have efficient quantum solutions, intended to replace currently-used algorithms (RSA, Diffie-Hellman, elliptic curve) that would be broken by sufficiently-capable quantum computers running Shor's algorithm.*

NIST standardised PQC algorithms in 2024:

- **ML-KEM (formerly Kyber).** Key encapsulation mechanism.
- **ML-DSA (formerly Dilithium).** Digital signature.
- **SLH-DSA (formerly SPHINCS+).** Hash-based signature.
- **Additional algorithms in process.**

These are now the standards for quantum-resistant cryptography. Implementation in TLS, software, hardware is in progress.

### Quantum AI

Beyond quantum cryptography, quantum and AI intersect:

**Quantum machine learning.** Using quantum computers for ML tasks. Currently limited capability; research-stage.

**Quantum neural networks.** ML architectures designed for quantum implementation. Active research area.

**Quantum-inspired classical algorithms.** Classical algorithms inspired by quantum approaches; some practical benefit.

**AI for quantum.** AI assisting quantum-computing research — quantum error correction, algorithm discovery, hardware design.

### AI in quantum-era cryptanalysis

Even before practical quantum computers, AI assists cryptanalysis:

**Side-channel attacks.** AI improves analysis of timing, power consumption, electromagnetic emissions.

**Implementation analysis.** AI identifies implementation weaknesses.

**Cryptographic protocol analysis.** AI assists formal analysis of protocols.

**Random number quality assessment.** AI detects weaknesses in random number generators.

The cryptographic implementations matter as much as the algorithms.

### Hybrid quantum-classical period

The transition to PQC is gradual. Hybrid approaches:

**Hybrid TLS.** Using both classical and post-quantum algorithms simultaneously. Provides protection if either is broken.

**Crypto-agility.** Systems designed to switch cryptographic algorithms without major redesign.

**Algorithm diversity.** Multiple algorithms used to reduce single-point-of-failure risk.

For Nepali enterprises, PQC adoption considerations:
- Major systems likely several years from PQC adoption.
- Crypto-agility a priority for new system design.
- Long-lived data (banking records, identity documents) at greatest risk; current encryption may be retroactively broken.
- Procurement decisions today should consider PQC readiness.

### Harvest-now-decrypt-later threat

*The harvest-now-decrypt-later threat is the strategic concern that adversaries are currently collecting encrypted data with the expectation that future quantum computers will enable decryption, particularly affecting data with long-term sensitivity such as government communications, financial records, medical information, and intellectual property.*

The implication: data being encrypted today with current algorithms is potentially exposed if it has multi-decade sensitivity and is intercepted in transit.

**Defensive response:**
- Adopt PQC for highest-sensitivity long-lived data.
- Assess data sensitivity timelines.
- Plan PQC migration for sensitive applications.

For Nepali banks, the most sensitive long-lived data (customer identity records, transaction histories, internal communications about strategic matters) may warrant earlier PQC adoption than less-sensitive operational data.

### AI threats to post-quantum systems

PQC algorithms are believed quantum-resistant but face other threats:

**Implementation attacks.** Side-channel attacks against PQC implementations.

**Mathematical advances.** New attacks against PQC algorithms (less likely but possible).

**AI-assisted cryptanalysis.** AI may find weaknesses in algorithms or implementations.

**Quantum-AI hybrid attacks.** Future combinations may produce unexpected capabilities.

**Implementation complexity.** PQC algorithms are more complex than current; more bugs possible.

The cryptographic transition is not "complete" with PQC adoption; ongoing vigilance continues.

### Quantum key distribution

*Quantum Key Distribution (QKD) uses quantum-mechanical principles to enable two parties to establish a shared secret key with security guaranteed by physical laws rather than computational hardness, providing an alternative path to secure communication that is theoretically immune to computational advances including quantum computers.*

Covered in ENCTNS502. Properties:
- Theoretical security.
- Practical limitations (distance, throughput, equipment cost).
- Trusted-node requirements for long distances.
- Complementary to PQC rather than replacement.

QKD deployments exist but limited. Major financial institutions in some markets adopt for specific high-value links. Adoption in Nepal limited and unlikely in short term.

### Preparation for quantum era

For Nepali enterprises preparing:

**Inventory cryptographic usage.** What algorithms, where, with what keys.

**Identify long-lived sensitive data.** Where harvest-now-decrypt-later applies.

**Plan PQC migration.** Phased approach for most sensitive systems first.

**Vendor engagement.** Major vendors (Microsoft, AWS, Google, IBM) implementing PQC.

**Crypto-agility.** New systems designed for algorithm flexibility.

**Awareness.** Staff understanding of upcoming transition.

**Monitor developments.** PQC technology and standards continuing to evolve.

### Quantum AI implications for cybersecurity

The combination of quantum computing and AI may eventually produce:

**More capable cryptanalysis.** AI-assisted quantum cryptanalysis.

**Better optimisation.** For both attack and defence.

**Novel attack patterns.** Capabilities currently unforeseen.

**New defensive capabilities.** Including quantum-enhanced detection.

The specific implications are uncertain — research-stage rather than operational. The MSc graduate's career will likely see significant developments in this area.

### Skills the MSc graduate needs

For navigating these challenges:

**Cryptographic foundation.** Solid understanding from ENCTNS502.

**PQC awareness.** Specifics of new algorithms.

**Implementation discipline.** Understanding cryptographic implementations.

**Risk assessment.** For evolving threats.

**Vendor evaluation.** Understanding vendor PQC capabilities.

**Strategic thinking.** Long-term planning beyond immediate needs.

### The synthesis — careers in cybersecurity through the late 2020s

The MSc graduate beginning a security career in 2026 enters a field defined by:

- AI transformation of both attack and defence.
- Evolving regulatory landscape across jurisdictions.
- Cryptographic transition to post-quantum.
- Increasing sophistication of threats.
- Increasing dependence on cloud and AI infrastructure.
- Continuing skill shortages, especially in Nepal.

The career opportunities are substantial. The challenges are continuous. The discipline rewards both deep technical capability and broad operational sensibility, both individual contribution and team collaboration, both current capability and continuous learning.

### Looking back across the eight chapters

The subject has covered:

- **Foundation.** What generative AI is and how it works.
- **Reconnaissance.** AI in attack planning and defensive footprint management.
- **Testing.** AI in vulnerability discovery and remediation.
- **Intelligence.** AI in threat intelligence and detection.
- **Social engineering.** AI-augmented phishing and defences.
- **Malware and wireless.** AI in offensive operations and defensive responses.
- **Operations.** AI in security operations and AI risk management.
- **Future.** Where the field is heading.

The combination provides foundation for the practitioner who will operate at the intersection of generative AI and cybersecurity — a position of substantial responsibility and impact in the years ahead.

### A closing perspective

Generative AI is the most consequential development in information technology since the public internet. Its cybersecurity implications are central to its overall impact — every offensive capability is matched by defensive capability; every defensive capability creates new attack surface. The discipline of responsible development, careful deployment, comprehensive monitoring, and continuous improvement is what makes the technology beneficial rather than harmful.

For the Nepali context specifically, the next decade offers substantial opportunity. Nepali enterprises are adopting AI; defensive capability must keep pace. Skilled professionals are scarce; the MSc graduate enters an undersupplied market. The country's regulatory framework is evolving; informed input matters. The cybersecurity discipline is global; Nepali professionals work in international contexts as much as local ones.

The technology will continue to evolve. The fundamentals — secure systems, protected data, alert defenders, responsible practitioners — persist. The MSc graduate who builds strong foundations, maintains continuous learning, contributes to professional communities, and approaches the work with appropriate humility about uncertainty will find meaningful work and meaningful impact possible across many years of an evolving career.

The syllabus ends here. The practice begins.
