---
title: 'Chapter 4 — Intent-Based Networking (IBN)'
sidebar_label: 'Ch 04 — Intent-Based Networking (IBN)'
sidebar_position: 4
description: 'Chapter 4 of Intelligent Networking (ENCTNS565).'
slug: /ioe/msncs/year-1-part-2/elective-i/intelligent-networking/notes/ch04
tags: [msncs, ENCTNS565, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The day-to-day work of network engineers has historically been intermediate-language work — taking high-level business requirements ("our finance department needs access to the new financial system") and translating them into low-level device configurations (VLAN definitions, ACL entries, routing protocol parameters, firewall rules, QoS markings). The translation is error-prone, time-consuming, and dependent on the engineer's knowledge of both the requirements and the implementation. Intent-Based Networking proposes that the network itself perform the translation — the operator expresses intent in business terms, and the network figures out the rest. This chapter covers IBN concepts and architecture, the contrast with traditional networking, the role of ML and NLP in intent processing, automated threat detection in IBN context, integration with SDN and NFV, and the application to 5G/6G network slicing where IBN is becoming foundational.

## 4.1 Overview of IBN concepts and architecture

### IBN

*Intent-Based Networking is an approach to network management in which administrators express what the network should accomplish — its intent — in business or operational terms, and the system automatically translates the intent into specific configurations, verifies that the network achieves the intended state, and continuously assures conformance over time.*

IBN as a named concept emerged around 2016-2017. Cisco's DNA Center (now Catalyst Center, launched 2017), Apstra (now Juniper, launched 2014 and acquired by Juniper in 2021), Anuta Networks ATOM, and others have driven the commercial direction.

### Core IBN principles

Gartner's articulation identifies four pillars:

1. **Translation and validation.** Convert business intent to specific technical configurations.

2. **Automated implementation.** Apply configurations across the network.

3. **Awareness of network state.** Continuous monitoring of how the network is performing relative to intent.

4. **Assurance and dynamic optimisation.** Detect deviations from intent; automatically correct or recommend corrections.

### IBN architecture layers

A reference architecture:

**Intent layer.** Where humans (operators, application owners, security teams) express intent. Multiple interfaces:
- GUI for declarative policy definition.
- CLI for power users.
- API for programmatic intent (other systems express intent).
- Natural-language interface (increasingly with LLMs).

**Translation layer.** Converts intent to device-specific configuration. Knowledge of the network's actual capabilities, current state, constraints.

**Activation layer.** Applies configurations to devices. Manages rollout, validation, rollback.

**Assurance layer.** Continuously monitors that the network is operating according to intent. Detects drift; triggers remediation.

**Telemetry layer.** Comprehensive observation of network state.

**Analytics layer.** Aggregates and analyses telemetry to detect issues and inform decisions.

### IBN as a closed loop

The principle is closed-loop operation:

1. Intent expressed.
2. Translated to configuration.
3. Applied to network.
4. Network state observed.
5. Compared to intent.
6. If deviation, corrective action.
7. Return to monitoring.

The loop runs continuously. Drift, errors, environmental changes are detected and corrected.

### Example intent

A business-level intent: "Finance team can access the financial system from their laptops, with high quality during business hours, with security monitoring enabled, and audit logging of all access."

The translation involves:
- Identifying finance team members (from identity directory).
- Identifying the financial system (from CMDB or similar).
- Identifying their laptops (from endpoint management).
- Creating ACL/firewall rules permitting access.
- Configuring QoS for the relevant traffic.
- Enabling logging of relevant flows.
- Configuring security tools to monitor.

Without IBN, each step is a manual configuration change. With IBN, the operator expresses intent; the system handles the steps.

### Maturity

IBN is mid-maturity in 2026:

- **Campus networking.** Cisco DNA Center, Juniper Mist Wired, HPE Aruba Central Network as a Service have driven adoption.
- **Data centre.** Apstra/Juniper, Cisco ACI with intent capabilities.
- **WAN.** SD-WAN platforms incorporate intent-like capabilities.
- **Multi-domain orchestration.** Less mature; emerging.

For Nepali enterprises:
- Major banks deploying Cisco DNA Center for campus networking.
- Some telecom-grade IBN-like capability in vendor-provided platforms.
- Broader IBN adoption pending; classical CLI-driven operations remain common.

## 4.2 Traditional networking vs IBN

### Traditional networking

The classical model:

- **Configuration-centric.** Engineers configure devices.
- **Manual.** Most changes are made by humans.
- **Reactive.** Problems addressed after they occur.
- **Per-device.** Configuration applied device-by-device.
- **Implicit policy.** Policy expressed in configuration but not necessarily explicit.
- **Drift-prone.** Configurations drift from intended state over time.

### IBN approach

- **Intent-centric.** Engineers express what they want.
- **Automated.** System makes most changes.
- **Proactive.** Continuous monitoring; preventive action.
- **Network-wide.** Changes coordinated across devices.
- **Explicit policy.** Intent is explicit and verifiable.
- **Self-correcting.** Drift detected and corrected.

### Detailed comparison

| Aspect | Traditional | IBN |
|---|---|---|
| Primary artifact | Device configurations | Intent definitions |
| Change agent | Human engineer | System with human oversight |
| Translation | In engineer's head | In system |
| Validation | Test after change | Continuous |
| Drift | Eventual; detected by audit | Continuous detection |
| Documentation | Separate from configuration | Intent is the documentation |
| Rollback | Manual restoration | Automated |
| Cross-device coordination | Manual sequencing | System-managed |
| Compliance verification | Periodic audit | Continuous |

### Benefits realised

Studies and vendor case studies report:
- **50-80% reduction in time to implement changes.**
- **Substantial reduction in misconfigurations.**
- **Faster fault detection and correction.**
- **Improved consistency across the network.**
- **Better compliance posture.**

### Where traditional still wins

- **Highly custom configurations.** IBN works best for standard patterns.
- **Legacy environments.** IBN platforms often don't support all legacy devices.
- **Expert tuning.** Specific optimisations may need manual intervention.
- **Disconnected scenarios.** IBN often requires connectivity to the central controller.

In practice, hybrid approaches dominate — IBN for what fits; traditional for the rest. The IBN footprint expands over time.

## 4.3 Benefits and challenges of IBN

### Benefits

**Operational efficiency.** Routine changes automated. Engineers focus on exceptions and strategy.

**Speed.** Changes implemented in minutes rather than hours/days.

**Consistency.** Same intent yields the same configuration across the network.

**Compliance.** Intent is explicit; conformance verifiable.

**Documentation.** Intent serves as documentation of what the network should do.

**Knowledge capture.** Intent encodes operational knowledge in the system rather than only in engineers' heads.

**Continuous assurance.** Monitoring detects deviations promptly.

**Reduced errors.** Translation by system avoids manual translation errors.

**Scalability.** Manage larger networks with same engineering effort.

**Faster onboarding.** New engineers can be productive faster.

### Challenges

**Vendor lock-in.** IBN platforms are often vendor-specific.

**Limited multi-vendor support.** Most platforms work best with that vendor's equipment.

**Translation accuracy.** The system's translation must be correct.

**Trust and oversight.** Operators need to trust the system; oversight remains necessary.

**Legacy integration.** Older devices may not be manageable by IBN platform.

**Cost.** Commercial IBN platforms are expensive.

**Skills.** Engineers need new skills; traditional skills still needed for hybrid environments.

**Brownfield deployment.** Migrating existing networks to IBN is non-trivial.

**Complexity hidden but not eliminated.** When things go wrong, debugging requires understanding the abstraction.

**Vendor maturity.** Newer products evolve quickly; stability varies.

### Operational implications

Adopting IBN changes how teams work:

- **Network engineers** spend more time designing intent definitions, less on per-device configuration.
- **Operations** spend more time on assurance and exception handling, less on routine.
- **Security teams** can express security intent that gets enforced automatically.
- **Application owners** can request network services with less back-and-forth.

The work doesn't disappear; it shifts in nature.

## 4.4 Machine learning for intent recognition and translation

ML plays critical roles in IBN.

### Intent recognition

Translating natural-language or semi-structured input into structured intent representations.

**The problem.** An operator might say "give the finance department fast access to the financial system." This needs to be parsed into:
- Subject: finance department members.
- Object: financial system.
- Action: access.
- Quality: fast (specific bandwidth/latency requirements implied).

### NLP for intent

**Named entity recognition (NER).** Identifying entities (department names, system names, locations).

**Intent classification.** Determining what action is requested (access, restrict, monitor).

**Relation extraction.** Identifying relationships between entities.

**Parameter extraction.** Specific values (bandwidth amounts, time windows, security levels).

### Modern approaches

**Pre-LLM era.** Custom NLP pipelines — entity recognition, parsing, classification, all with domain-specific training data.

**LLM era (2023+).** Large language models with in-context examples or fine-tuning. Better generalisation; less domain-specific training data needed.

**Hybrid.** LLM for understanding; deterministic systems for verifiable execution.

### Intent translation

Once intent is recognised, translation produces concrete configuration.

The translation system needs:

- **Network model.** Understanding of the actual network — devices, capabilities, current state.
- **Capability mapping.** What configurations achieve what effects.
- **Constraint awareness.** Conflicts to avoid; resources to respect.
- **Optimisation.** Best way to achieve intent given current state.

### ML in translation

**Model learning.** Learning network capabilities from observed behaviour rather than only from documentation.

**Constraint inference.** Learning hard and soft constraints from past operations.

**Translation optimisation.** Choosing among multiple valid translations.

**Conflict resolution.** When intents conflict, ML can suggest resolutions.

### Example workflow

Operator: "All users from the marketing department should have priority access to the design tools server during business hours."

System:
1. **NLP parses intent.** Identifies subject (marketing department), object (design tools server), action (access), quality (priority), constraint (business hours).
2. **Entity resolution.** Marketing department → group "Marketing" in AD. Design tools server → host `tools.bank.com.np` at 10.50.20.30. Business hours → 9 AM - 6 PM Nepal time, weekdays.
3. **Translation.** Identifies needed:
   - Firewall rule: from marketing to 10.50.20.30 on relevant ports.
   - QoS marking: traffic in this flow marked as high priority.
   - QoS scheduling: during business hours, this priority gets preferential treatment.
   - Logging: traffic logged for monitoring.
4. **Validation.** Checks for conflicts with existing policy.
5. **Activation.** Pushes configurations to affected devices.
6. **Assurance.** Monitors that intent is being met; alerts on deviation.

The translation involves knowledge of users, hosts, network topology, device capabilities, scheduling rules. ML helps bridge from natural-language intent to specific operational steps.

## 4.5 Role of NLP in intent translation and parsing

NLP is central to IBN's promise of accessible network management.

### NLP techniques used

**Tokenisation.** Breaking text into meaningful units.

**Part-of-speech tagging.** Identifying nouns, verbs, adjectives.

**Dependency parsing.** Understanding grammatical relationships.

**Named entity recognition.** Identifying specific entities.

**Coreference resolution.** Understanding pronouns and references.

**Semantic role labeling.** Who did what to whom.

**Sentiment analysis.** Less relevant for IBN.

**Question answering.** Useful for operator-system interaction.

**Text classification.** Determining intent category.

### Domain adaptation

Generic NLP models are trained on general text. For IBN, domain adaptation is needed:

- **Domain-specific vocabulary.** Network terms, device types, protocols.
- **Domain-specific entity types.** VLAN, ACL, subnet, route.
- **Domain-specific intent categories.** Access control, QoS, monitoring, security.
- **Domain-specific structures.** Network-related sentence patterns.

Approaches:
- Fine-tuning pre-trained models on domain corpora.
- Custom training on network-specific text.
- Combining general NLP with rule-based domain processing.

### LLM-based intent processing

Large language models have transformed intent processing through 2023-2026:

**Strengths:**
- General-purpose understanding without much domain training.
- Better handling of ambiguous or incomplete inputs.
- Conversational refinement.
- Generation of explanations.

**Limitations:**
- Hallucinations — generating plausible-sounding but incorrect translations.
- Lack of grounded understanding of specific network state.
- Difficulty with very domain-specific edge cases.
- Computational cost.

**Operational pattern.** LLM proposes; deterministic translator validates and executes. The LLM handles natural-language understanding; the deterministic component handles correctness.

### Multilingual considerations

For Nepali context, language considerations:

- **Operator interfaces.** Most network operators in Nepal work in English; Nepali-language interfaces less critical for operator tools.
- **End-user-facing.** Where users express intent (less common in IBN), Nepali support may matter.
- **Mixed-language inputs.** Code-switching between English and Nepali in technical contexts is common.

Major LLMs handle Nepali reasonably well by 2026, though English remains better-supported.

### Example natural-language interactions

Operator-system dialogues an IBN system might support:

- "What VLANs are configured on the Pokhara branch switch?"
- "Show me bandwidth utilisation by application for the last 24 hours."
- "Block access to social media for the customer-service VLAN."
- "Why is QoE bad for the video conferencing on the Biratnagar branch?"
- "Configure the new branch in Nepalganj with the standard branch template."

Each requires understanding of intent, entity recognition, and translation to specific actions.

## 4.6 Understanding and processing user-defined intents

### Intent representation

Once parsed, intent must be represented in a structured form for processing.

**Common representations:**

**Declarative policy.** Statements about desired state. "Marketing users access design tools."

**Service-level objectives.** Numerical targets. "Latency to design tools under 50 ms."

**Constraint specifications.** Rules. "No traffic from internet to internal databases."

**Workflow descriptions.** Sequences. "New employee provisioning includes account creation, VPN access, device enrolment."

### Intent specification languages

Several efforts at standardised intent languages:

**IETF NEMO (Network Modeling Language).** Topology-oriented.

**TOSCA (Topology and Orchestration Specification for Cloud Applications).** Cloud orchestration.

**Open Configuration / OpenConfig.** Vendor-neutral configuration models. Not strictly intent but related.

**Custom DSLs.** Domain-specific languages designed for specific IBN platforms.

In practice, no single standard has dominated. Most IBN platforms use vendor-specific representations.

### Intent processing pipeline

A typical pipeline:

1. **Input.** Natural language, structured input, or API call.
2. **Parsing.** Convert to intermediate representation.
3. **Validation.** Check syntactic and semantic correctness.
4. **Conflict detection.** Check against existing intents.
5. **Resolution.** Resolve conflicts (priority, override, error).
6. **Translation.** Convert to specific configurations.
7. **Verification.** Validate that translation will achieve intent.
8. **Activation.** Apply configurations.
9. **Assurance.** Monitor continuously.

### Conflict handling

When intents conflict, the system must decide:

**Priority-based.** Some intents have higher priority.

**Specificity-based.** More specific intents override general ones.

**Temporal.** Newer intents take precedence.

**User-driven.** Prompt operator to resolve.

**Negotiation.** Adjust both intents to a compromise.

### Intent verification

Before applying changes, verification:

**Formal methods.** Mathematical verification of correctness. Used in some research and selected production systems.

**Simulation.** Test changes in a simulated network model.

**Staged rollout.** Apply to subset; observe; expand.

**Dry run.** Compute changes but don't apply.

### Continuous assurance

After activation, continuous checking:

- Network state matches intent.
- Performance meets SLOs.
- No drift in configurations.
- Any deviations detected promptly.

When deviation detected:

- **Automatic remediation.** System fixes itself if confident.
- **Operator alert.** System notifies if intervention needed.

## 4.7 Automated threat detection and mitigation in IBN

### Security as intent

IBN naturally supports security-as-intent:

- "Block traffic from countries on the sanctions list."
- "Quarantine devices showing malware indicators."
- "Restrict access to PCI systems to authorised users."
- "Alert on any unusual access to financial systems."

The intent is expressed; the system implements continuously.

### Automated threat detection

The intent layer combined with ML-driven detection enables:

**Continuous evaluation.** Always checking observed traffic against intent.

**Behavioural deviation.** ML detects deviations from normal patterns.

**IOC matching.** Threat intelligence checked against observed traffic.

**Correlation.** Multiple signals combined for confidence.

### Automated mitigation

When threats detected, IBN can trigger mitigation:

**Containment.** Isolate affected hosts.

**Block.** Add firewall rules denying suspicious sources.

**Quarantine.** Move suspicious devices to restricted segments.

**Rate limit.** Throttle suspicious traffic.

**Alert.** Notify operators.

**Investigate.** Trigger automated forensic collection.

The pattern: ML detects; intent governs response; automation executes.

### Adaptive security posture

Beyond reactive mitigation, IBN can adapt overall posture:

- During elevated threat conditions, stricter controls.
- During quiet periods, relaxed controls for usability.
- Per-user adaptation based on risk score.
- Per-application adaptation based on sensitivity.

### Integration with broader security

IBN integrates with:

- **SIEM.** For correlated detection.
- **EDR.** For endpoint context.
- **Threat intelligence platforms.** For IOC feeds.
- **Identity providers.** For user context.
- **Incident response tools.** For workflow orchestration.

### Example: ransomware response

A Nepali bank's IBN platform with security intent:

1. **Intent.** "Detect ransomware indicators; if detected, immediately isolate affected hosts and notify SOC."
2. **Detection.** ML model trained on ransomware-like behaviour patterns (encrypted file operations, network beaconing, lateral spread) identifies a host displaying these patterns.
3. **Automatic action.** Per intent, the IBN platform:
   - Updates firewall rules to deny outbound from the host.
   - Updates switch port configuration to isolate it.
   - Triggers EDR to collect forensic data.
   - Notifies SOC analysts.
4. **Outcome.** Containment in seconds, before significant spread.

Without IBN, each action would require manual intervention by SOC analysts — likely taking minutes during which the malware spreads. With IBN, response is immediate.

## 4.8 Integration of SDN and NFV with intelligent IBN

### Relationship of IBN, SDN, NFV

The three concepts are complementary:

**SDN.** Provides programmable network — the substrate.

**NFV.** Provides network functions as software.

**IBN.** Provides the intent-driven layer on top.

IBN often uses SDN and NFV as enabling technologies:
- IBN translation produces SDN controller actions.
- IBN provisions NFV-based functions as part of fulfilling intent.

### Integration patterns

**IBN over SDN.** IBN controller sits above SDN controller(s); intent translated to SDN actions.

**IBN with embedded SDN.** Single platform combines both.

**IBN with multiple SDN controllers.** IBN orchestrates across multiple SDN domains.

**IBN with traditional + SDN.** IBN abstracts whether underlying network is SDN or traditional.

### Example architecture

A reference architecture for a Nepali bank:

- **Intent layer.** Business stakeholders express intent through GUI/CLI.
- **IBN platform.** Cisco DNA Center or equivalent.
- **SDN controllers.** Cisco APIC for data centre, DNA Center for campus, SD-WAN controller for WAN.
- **NFV platform.** VMware vSphere + NSX, or container platform.
- **Physical infrastructure.** Switches, routers, wireless controllers, firewalls.

Intent flows down through the layers; telemetry flows back up.

### NFV orchestration with IBN

IBN can drive NFV decisions:

- **Function placement.** Where to instantiate VNFs.
- **Function chaining.** Order of VNF traversal.
- **Function scaling.** When to spin up/down instances.
- **Function lifecycle.** Provisioning, updating, decommissioning.

ML-based placement and scaling (Chapter 2) informs IBN decisions.

### 5G/6G integration

Modern mobile networks are heavily SDN+NFV+IBN. Standards bodies (3GPP, ETSI) specify management frameworks that incorporate intent-driven concepts.

For Nepali telecoms, IBN-like capabilities are built into vendor platforms (Ericsson, Nokia, Huawei, Samsung) for 5G core and RAN management.

## 4.9 Network slicing in 5G/6G with IBN

### Network slicing

*Network slicing is the 5G/6G capability that allows a single physical network infrastructure to be partitioned into multiple virtual networks, each optimised for specific use cases or customer types, with isolated resources and customised characteristics — different bandwidth, latency, reliability profiles — used to support diverse services on shared infrastructure.*

A 5G operator might have slices for:

- **Mobile broadband.** Standard smartphone services.
- **Industrial IoT.** Many devices with small data, reliable delivery.
- **Critical communications.** Emergency services with extreme reliability.
- **Vehicle-to-everything (V2X).** Ultra-low latency for connected vehicles.
- **Fixed wireless access.** High bandwidth replacing wired broadband.

Each slice has different requirements; slicing lets one network serve all.

### IBN for slicing

IBN is natural for slice management:

- **Slice intent.** "Slice for autonomous vehicles needs latency under 10 ms and 99.999% availability."
- **Translation.** IBN computes required resources, configurations, placements.
- **Provisioning.** Slice instantiated across radio, transport, core.
- **Assurance.** Continuous monitoring of slice SLAs.
- **Adaptation.** Slice adjusted as conditions change.

### Slice characteristics

Per-slice parameters can include:

**Bandwidth.** Allocated capacity.

**Latency.** Maximum acceptable delay.

**Reliability.** Availability targets.

**Coverage.** Geographic area.

**Capacity.** Number of devices.

**Mobility.** Stationary, pedestrian, vehicular, high-speed.

**Security.** Isolation, encryption, authentication.

**Multi-tenancy.** Whether shared with other parties.

### ML in slicing

ML supports slicing decisions:

**Slice resource allocation.** Predicting demand; allocating accordingly.

**Slice placement.** Where to place virtual network functions for each slice.

**Slice adaptation.** Adjusting based on observed performance.

**Slice optimisation.** Optimising across slices given shared physical resources.

**Slice anomaly detection.** Identifying performance issues.

### 6G direction

6G (expected commercial deployment in 2030s) extends slicing further:

- **Application-specific slices.** Each major application potentially a slice.
- **AI-native slicing.** Slicing decisions inherently ML-driven.
- **Cognitive slicing.** Slices that adapt and learn autonomously.
- **Cross-domain slicing.** Slices spanning multiple operators.

Research in 6G is active in 2026 with first commercial deployments anticipated late this decade.

### Nepal context

For Nepal:
- **5G rollout** has been gradual. NTC and Ncell have introduced 5G in selected areas through 2024-26.
- **Slicing** as commercial service is not yet widely available.
- **Enterprise 5G slicing** for specific industries (banking, manufacturing, healthcare) is anticipated but not yet deployed.
- **6G** is research; commercial relevance years away.

The MSc student building intelligent-networking expertise should follow developments in slicing — it represents one of the largest commercial opportunities for IBN-style approaches and is where much vendor and operator investment is focused.

The next chapter shifts to a different frontier — quantum networking, where the underlying physics is fundamentally different from classical networking and where AI/ML applications are at the earliest stages of exploration.
