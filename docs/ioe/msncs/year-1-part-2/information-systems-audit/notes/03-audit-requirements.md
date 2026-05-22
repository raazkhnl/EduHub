---
title: 'Chapter 3 — Information Systems Audit Requirements'
sidebar_label: 'Ch 03 — Information Systems Audit Requirements'
sidebar_position: 3
description: 'Chapter 3 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch03
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Every audit starts with the question of what to examine and why. The answers come from the risk facing the organisation, the control objectives that respond to that risk, the audit objectives that translate control objectives into things the audit will test, and the evidence the audit will gather. This chapter develops these foundations: how risk is analysed, what control objectives and audit objectives look like, how effectiveness and efficiency differ, what counts as information-systems abuse, how assets are safeguarded, how evidence is collected and evaluated, and how logs and audit trails serve as evidence.

## 3.1 Risk analysis — threats, vulnerability, exposure, likelihood, and attack

Risk is the language of modern audit. Every audit decision — what to examine first, how deeply, with what procedures — depends on a risk view of the organisation.

### Risk

*Risk is the potential for loss or harm resulting from a threat exploiting a vulnerability, characterised by the likelihood of the event and the magnitude of the resulting impact.*

The standard formulation:

$$
\text{Risk} = \text{Threat} \times \text{Vulnerability} \times \text{Impact}
$$

The formula is conceptual rather than mathematical — the factors are usually qualitative. But it captures the essential idea: risk depends on whether something might attack, whether there is a weakness it could exploit, and whether the consequence would matter.

### Threat

*A threat is any potential cause of an undesired event that may damage information assets or operations, including natural events (earthquake, flood, fire), human-caused events (attacks, errors, fraud), and technical events (hardware failure, software bugs, supply-chain compromise).*

For an IS audit at a Nepali bank, the threat catalogue typically includes:

- **External cyber-attackers.** Criminal groups, nation-state actors, hacktivists.
- **Insider threats.** Disgruntled employees, accidental insiders, contractors with access.
- **Service-provider compromise.** Cloud providers, software vendors, MSP/MSSP.
- **Physical threats.** Theft, fire, vandalism.
- **Natural events.** Earthquakes (Nepal is in a seismically active zone — the 2015 earthquake was a salient example), floods, monsoon disruptions, fires.
- **Power and environmental.** Outages, fluctuations, temperature failures.
- **Errors.** Operator mistakes, misconfigurations, faulty deployments.
- **Failure of suppliers and partners.** Bank's reliance on external services that may fail.

### Vulnerability

*A vulnerability is a weakness in an information system, security procedure, internal control, or implementation that could be exploited or triggered by a threat source, allowing the threat to cause harm.*

Categories:

- **Technical vulnerabilities.** Unpatched software, misconfigurations, weak cryptography.
- **Organisational vulnerabilities.** Missing policies, inadequate training, weak governance.
- **Procedural vulnerabilities.** Inconsistent application of procedures, gaps in process design.
- **Physical vulnerabilities.** Inadequate physical protection.

Vulnerabilities exist independent of threats; the combination of threat plus vulnerability creates risk.

### Exposure

*Exposure is the extent to which an asset is subject to harm if a threat exploits a vulnerability, reflecting both the proximity of the threat to the asset and the lack of compensating protective measures.*

Two organisations can have the same vulnerability but different exposure. A misconfigured server reachable from the internet is more exposed than the same misconfiguration on an internal-only server.

### Likelihood

*Likelihood is the probability that a given threat will exploit a particular vulnerability, expressed qualitatively (low / medium / high) or quantitatively (probability or frequency) depending on the assessment methodology.*

Factors influencing likelihood:
- Threat-actor capability and motivation.
- Vulnerability difficulty of exploitation.
- Existing controls reducing exploitability.
- Detection capability deterring the attack.
- Historical frequency of similar events.

### Attack

*An attack is an actual attempt by a threat actor to exploit a vulnerability, with the intent of causing harm or gaining unauthorised access to assets, ranging from automated mass scanning to targeted human-driven campaigns.*

Where threat is "what could happen" and risk is "the calculated potential," attack is the realised event. Detection of attacks, response to attacks, and learning from attacks all feed back into the risk picture.

### Risk analysis methodologies

Several approaches:

**Qualitative risk analysis.** Risk levels assigned (high / medium / low) using expert judgement. Faster; appropriate when quantitative data is scarce.

**Quantitative risk analysis.** Risk expressed in monetary terms. Annual Loss Expectancy (ALE) = Single Loss Expectancy × Annualised Rate of Occurrence. Useful for cost-benefit analysis of controls but data-intensive.

**Semi-quantitative.** Mix of qualitative and quantitative — scoring scales producing comparable numbers without claiming precise probabilities.

**ISO 27005.** International standard for information security risk management. Specifies process: context establishment, risk assessment (identification, analysis, evaluation), risk treatment, monitoring.

**NIST SP 800-30.** US guide for conducting risk assessments. Detailed methodology.

**ISACA's Risk IT Framework.** ISACA's risk approach, aligned with COBIT.

**FAIR (Factor Analysis of Information Risk).** Quantitative model decomposing risk into measurable factors.

The auditor evaluates how the organisation conducts its risk assessment — does it follow a defined methodology, is it kept current, are findings actioned?

### Risk treatment

After identifying risk, four standard responses:

- **Mitigate.** Implement controls to reduce risk.
- **Transfer.** Insurance; outsourcing; contractual transfer to third parties.
- **Accept.** Acknowledge the risk and proceed (with documented acceptance from appropriate authority).
- **Avoid.** Do not undertake the activity that creates the risk.

The risk register documents identified risks, their assessment, the chosen treatment, and the responsible owner.

### Risk in Nepal context

Specific risk considerations for Nepali IS audit:

- **Seismic risk.** The 2015 Gorkha earthquake reminded the IT community of the need for geographically-separated DR sites. Many banks responded by establishing DR sites outside Kathmandu Valley.
- **Power grid reliability.** Nepali grids have improved but remain less reliable than developed economies. UPS, generator, and grid-independence considerations are real.
- **Telecommunications redundancy.** Multiple providers; physically diverse paths.
- **Cybercrime evolution.** Banking trojans targeting eSewa/Khalti users; phishing campaigns; ransomware.
- **Insider risk.** Smaller workforces with broad responsibilities increase concentration of access.
- **Vendor concentration.** A few core-banking vendors serve most Nepali banks; vendor-level vulnerabilities propagate across the sector.
- **Supply chain.** Hardware procured through international supply chains with limited visibility into upstream security.

## 3.2 Information systems control objectives and audit objectives

### Control objective

*An information systems control objective is a high-level statement of the desired outcome a control or set of controls is intended to achieve, articulated in terms of the protection of assets, the assurance of accurate processing, the prevention of unauthorised access, or compliance with applicable requirements.*

Control objectives describe what the organisation wants to be true. The controls themselves are the mechanisms achieving the objective.

**Examples of control objectives:**

- "Only authorised personnel can access the core banking database."
- "All financial transactions are recorded accurately and completely."
- "Critical systems are recoverable within 4 hours of disruption."
- "Customer personal data is protected against unauthorised disclosure."
- "Production systems are changed only through approved change management."
- "Backups are taken daily and validated by restore testing monthly."

Each objective could be supported by multiple controls; each control might contribute to multiple objectives.

### Audit objective

*An audit objective is what the audit specifically aims to determine, derived from control objectives and translated into testable statements that the audit procedures will address, providing the basis for the audit opinion.*

Where control objectives describe what should be true, audit objectives describe what the audit will test. They are typically more specific.

**Examples of audit objectives:**

- "Determine whether access to the core banking system is granted through the documented user-access provisioning process."
- "Determine whether changes to production systems during the period from 2026-01-01 to 2026-04-30 were authorised, tested, and documented."
- "Determine whether backups taken during the audit period were tested for restorability."
- "Determine whether the bank's risk register reflects current risks and is reviewed at the prescribed frequency."

A typical audit might have 30-100 audit objectives covering different areas. Each objective generates audit procedures (Chapter 4) and findings.

### Relationship between control and audit objectives

| Control objective | Related audit objective |
|---|---|
| "Only authorised personnel can access the database" | "Determine whether database access was granted only through documented authorisation" |
| "Changes are tested before production" | "Determine whether 30 sampled production changes had documented test results" |
| "Backups are tested for restorability" | "Determine whether the bank's documented monthly restore tests were performed and successful" |

The chain: business need → control objective → control → audit objective → audit procedure → evidence → finding → opinion.

### Control objectives in major frameworks

The frameworks discussed in Chapter 1 provide structured control objectives:

- **COBIT 2019** provides 40 governance and management objectives.
- **ISO/IEC 27002** provides detailed guidance for each of ISO 27001's Annex A controls.
- **NIST CSF** provides outcomes-based subcategories.
- **CIS Controls** provides specific safeguard-level objectives.

The auditor selects relevant control objectives from the applicable framework(s) for the audit scope.

## 3.3 System effectiveness and efficiency

Beyond security and compliance, the auditor often evaluates whether systems serve the business well. Two related but distinct properties.

### Effectiveness

*System effectiveness is the degree to which an information system achieves its intended objectives — supporting the business processes it is designed to support, producing the outputs needed, and serving the users who depend on it.*

An effective banking core processes transactions correctly. An effective HR system supports the HR processes. An effective security operations centre detects and responds to incidents.

Effectiveness is measured against the system's stated objectives. The auditor examines:
- Are the objectives defined?
- Does the system meet them?
- How is performance measured?
- What is the trend?

### Efficiency

*System efficiency is the relationship between the resources consumed by the information system — money, time, computing capacity, human effort — and the outputs produced, with higher efficiency meaning more output per unit of resource.*

Two systems can both be effective but one more efficient. A batch processing job that completes in 1 hour using 1 server is more efficient than the same job taking 3 hours using 4 servers.

Efficiency considerations:
- Resource utilisation (CPU, memory, storage, network).
- Cost per transaction.
- Time-to-completion.
- Staff effort required.
- Cost trends.

### Effectiveness vs efficiency

A system can be:

- **Effective and efficient.** Achieving objectives well, with minimal resource waste.
- **Effective but inefficient.** Achieves objectives but at excessive cost. Common in legacy systems.
- **Efficient but ineffective.** Uses few resources but does not meet objectives. The wrong system done cheaply.
- **Neither.** Failing in both dimensions; the worst case.

The IS auditor's perspective is typically broader than pure cost or pure outcome. The audit examines both, balanced against risk and compliance.

### Audit objectives for effectiveness and efficiency

Specific objectives might be:

- "Determine whether the core banking system meets the transaction-volume objectives defined in the IT strategy."
- "Determine whether system availability meets the SLA targets for the audit period."
- "Determine whether ICT spending is consistent with the budget and is aligned with strategic priorities."
- "Determine whether response times for online banking are within target."

The findings inform management about where systems are succeeding and where investment, redesign, or replacement is warranted.

## 3.4 Information systems abuse

### Information systems abuse

*Information systems abuse is the misuse, unauthorised use, or harmful use of information systems and their resources, including fraud, theft of data, unauthorised access, manipulation of records, harassment, breach of confidentiality, and violation of acceptable use policies.*

Abuse can come from outside (attackers) or inside (employees, contractors). The audit looks at both.

### Categories of abuse

**Financial fraud.** Using IT systems to commit financial fraud — manipulating transactions, redirecting payments, falsifying records.

**Data theft.** Stealing customer data, intellectual property, or other sensitive information.

**Identity theft.** Using stolen identities to fraudulently access systems or services.

**Unauthorised access.** Accessing systems or data without authorisation, including snooping by employees on records they have no business reason to see.

**Service theft.** Using organisational IT resources for personal benefit — running side-businesses on company servers, cryptocurrency mining.

**Sabotage.** Deliberately damaging systems or data — disgruntled employees deleting files, planting logic bombs.

**Privacy violations.** Accessing or disclosing personal information without authority.

**Harassment.** Using systems to harass colleagues or external parties.

**Policy violations.** Visiting prohibited websites, installing unauthorised software, exfiltrating data.

### Indicators of abuse

The audit looks for indicators:

- Unusual access patterns (after-hours, unusual data volumes, unusual records).
- Mismatch between job role and accessed data.
- Bypass of normal controls.
- Disabled logging or monitoring.
- Multiple failed access attempts.
- Tampering with audit trails.
- Unusual financial transactions.
- Concentration of authority (one person with too much access).

### Real cases

The NIC Asia SWIFT incident of 2017 involved compromised SWIFT credentials at the bank used to initiate fraudulent international transfers. Much was recovered through international cooperation, but the case illustrated insider-or-outsider compromise of high-trust systems. Subsequent NRB directives strengthened control requirements for SWIFT and similar high-trust environments.

Banks worldwide regularly detect employee abuse — looking up celebrity accounts, family-member accounts, or accounts of public-interest figures. Discipline ranges from warnings to termination to prosecution depending on intent and impact.

### Prevention and detection

Controls against abuse:

- **Access control.** Least-privilege; role-based access; segregation of duties.
- **Logging.** Comprehensive logs of access and operations.
- **Monitoring.** Active monitoring for unusual patterns; alerts on indicators.
- **Background checks.** For employees with sensitive access.
- **Training.** Awareness of acceptable use and consequences.
- **Disciplinary action.** Consistent, communicated.
- **Whistleblower mechanisms.** Channels for reporting suspected abuse.

The audit evaluates the existence and operation of each.

## 3.5 Asset safeguarding objective and process

### Asset safeguarding

*Asset safeguarding is the set of controls and processes that protect an organisation's information-systems assets — hardware, software, data, people, services — from loss, damage, theft, unauthorised access, or other harm, supporting the organisation's broader objectives of operational continuity and regulatory compliance.*

A central control objective. Almost every IS audit addresses some aspect of asset safeguarding.

### The asset safeguarding process

The standard cycle:

1. **Asset identification.** Inventory of what assets exist; their owners; their classifications.
2. **Asset classification.** Categorising assets by sensitivity (public, internal, confidential, restricted) and by criticality.
3. **Risk assessment.** What threats face each asset class.
4. **Control selection.** Which controls protect each asset.
5. **Implementation.** Deploying the controls.
6. **Operation.** Running the controls in steady state.
7. **Monitoring.** Watching for control failure or asset compromise.
8. **Review.** Periodic re-assessment as the environment changes.

### Asset inventory

The starting point. The standard expectations:

- Every significant asset is in the inventory.
- The inventory has an owner — someone accountable.
- Classification is recorded.
- Location is recorded.
- Lifecycle status is recorded.
- The inventory is kept current.

Common findings: inventories incomplete; ownership unclear; classification missing or stale; equipment that exists physically but is missing from the inventory.

### Data classification

A specific case of asset classification. A typical scheme:

| Classification | Definition | Examples |
|---|---|---|
| Public | Available to anyone | Marketing materials, published reports |
| Internal | For internal use; not externally restricted | Internal procedures, organisational charts |
| Confidential | Restricted to authorised personnel | Customer data, internal financial data |
| Restricted | Highest sensitivity | Cryptographic keys, regulatory filings before publication, M&A data |

Each classification has handling requirements — what can be stored where, transmitted how, accessed by whom.

The audit examines:
- Data classification policy.
- Whether actual data carries classification markings.
- Whether handling matches classification.

### Audit objectives for asset safeguarding

- "Determine whether the organisation maintains a complete and current inventory of information-systems assets."
- "Determine whether assets are classified according to documented policy."
- "Determine whether access to confidential and restricted data is granted only to authorised personnel with documented business need."
- "Determine whether departing employees' access is removed within prescribed timelines."
- "Determine whether sensitive data is encrypted in transit and at rest."

The findings drive both immediate remediation and longer-term improvement.

## 3.6 Evidence collection and evaluation

### Audit evidence

*Audit evidence is the information collected and evaluated by the auditor to reach conclusions about the audit objectives, including records, documents, observations, system queries, interviews, and tests, that together must be sufficient and appropriate to support the audit opinion.*

The standards (ISACA's ITAF Standards, IIA Standards) require that evidence be:

- **Sufficient.** Enough evidence to support the conclusion. Not necessarily every conceivable item but enough to be persuasive.
- **Appropriate.** Relevant to the audit objective; reliable in the circumstances; from credible sources.
- **Documented.** Recorded in the audit work papers.

### Types of audit evidence

**Documentary evidence.** Policies, procedures, contracts, reports, log files, system configurations, change records, meeting minutes.

**Observational evidence.** Observations of operations, walkthroughs, physical inspection.

**Testimonial evidence.** Statements from management, employees, third parties (typically supplementing other evidence rather than primary).

**Analytical evidence.** Computational analysis — ratios, trends, comparisons.

**Re-performance evidence.** The auditor performs an operation independently to verify the documented result.

**System-generated evidence.** Direct queries against systems and databases. Increasingly important in modern IS audit.

### Reliability of evidence

The auditor weighs evidence by reliability:

| Evidence source | Reliability |
|---|---|
| External evidence (third-party confirmations) | Highest |
| Auditor-generated (own observations, re-performance) | High |
| Internal but independent (logs, system-generated) | Moderate-high |
| Internal management-provided | Moderate (requires verification) |
| Verbal | Lowest (used to corroborate other evidence) |

A finding supported only by an interview is weaker than a finding supported by interview plus system-extract plus document review. The auditor seeks corroboration.

### Evidence collection techniques

Standard techniques:

**Inquiry.** Asking questions of personnel. The most-used and least-reliable in isolation.

**Inspection.** Examining documents, records, physical assets.

**Observation.** Watching processes as they happen.

**Confirmation.** Obtaining direct confirmation from a third party (e.g., bank confirmation, vendor confirmation).

**Re-performance.** The auditor performs the operation; compares to documented result.

**Recalculation.** Verifying arithmetic.

**Analytical procedures.** Reviewing relationships, trends, ratios.

**Computer-assisted audit techniques (CAATs).** Using software to test data at scale — discussed in Chapter 4.

**Walkthrough.** End-to-end trace of a transaction through the system.

### Evaluating evidence

After collection, the auditor evaluates whether the evidence supports the conclusion.

- Does the evidence directly address the audit objective?
- Is the evidence consistent with other findings?
- Is the source credible?
- Is the volume sufficient given the population sampled?
- Are there contradictory pieces of evidence?
- Is the auditor's interpretation defensible?

Where evidence is insufficient or inconclusive, the auditor either gathers more or qualifies the conclusion.

### Audit working papers

Documentation of the audit. Working papers record:
- Audit objectives.
- Procedures performed.
- Evidence obtained.
- Conclusions drawn.

Working papers should let another auditor (a peer reviewer, a regulator, a successor on next year's audit) understand what was done and why. The standards require working-paper retention for defined periods (typically 5-7 years).

In Nepali audit firms, working papers are increasingly electronic — held in audit-management platforms (TeamMate, CaseWare, ACL Robotics, or Excel-based firm-internal systems). Standards for review and retention apply equally regardless of medium.

## 3.7 Logs and audit trails as evidence

Logs are particularly important evidence sources for IS audit. The Forensics subject covered logs from a forensic perspective; this section covers them from an audit perspective.

### Audit trail

*An audit trail is the chronological record of activities within an information system that allows the reconstruction, review, and examination of operations, transactions, and security events from inception to results, providing accountability for actions and forming a primary source of evidence for audit conclusions.*

Audit trails answer the questions:
- Who did what?
- When was it done?
- Where was it done?
- What changed?
- What was the result?

For an audit, the trail provides evidence that transactions are authorised, accurate, and complete; that controls operate; and that anomalies can be investigated.

### What an audit trail captures

**User activity.** Logon/logoff, authentication attempts, session activity.

**Transactions.** Business transactions executed — entries, updates, approvals, transfers.

**Data changes.** Database modifications with before/after values for sensitive fields.

**Configuration changes.** System and application configuration changes.

**Administrative actions.** Privileged operations.

**Security events.** Authentication failures, access denials, security-tool alerts.

**System events.** Service starts/stops, errors, performance milestones.

### Audit trail design principles

**Completeness.** Every relevant action logged.

**Accuracy.** Logged events reflect what actually happened.

**Timeliness.** Logs written promptly; timestamps accurate.

**Protection.** Logs cannot be modified or deleted by those whose actions are logged.

**Retention.** Logs kept long enough for audit purposes (often years).

**Searchability.** Logs indexed and queryable for audit work.

**Confidentiality.** Where logs contain sensitive data, access is restricted.

### Audit objectives for logging and audit trails

- "Determine whether logging is enabled on critical systems for the events specified by policy."
- "Determine whether logs are protected against unauthorised modification."
- "Determine whether the log retention period matches policy and regulation."
- "Determine whether the SOC reviews log alerts according to defined procedures."
- "Determine whether log analysis identifies and responds to anomalies in a timely manner."

### Logs as evidence for control testing

When testing a control, the auditor often relies on logs to verify operation.

Example: testing the "all production changes are authorised" control.

1. Pull list of production changes from the change management system for the audit period.
2. Pull list of changes deployed to production servers from system logs.
3. Compare. Every deployment should map to an authorised change.
4. Investigate discrepancies — unauthorised changes? Missing change records?

The combination of logs from different sources provides the comparison that no single source could.

### Limitations of logs as evidence

Logs are not always conclusive:
- The log may not capture the action of interest.
- The log may be tampered with by an attacker with sufficient privilege.
- The log timestamp may not match wall-clock time (clock skew).
- The log may be ambiguous about identity (shared accounts, NAT, federated identity).
- The log volume may overwhelm the audit's capacity to review.

The auditor evaluates log evidence the same way as any other — sufficient and appropriate, with corroboration as needed.

### Continuous auditing

Traditional audit is periodic — annual, quarterly. **Continuous auditing** uses automation to evaluate controls continuously, drawing on logs and other system-generated evidence.

Continuous auditing detects control failures sooner; provides ongoing rather than point-in-time assurance; reduces the burden on annual audit by addressing common issues year-round.

Implementation typically involves a continuous-audit platform (commercial: ACL, IDEA; open-source: combinations of SIEM, BI tools, and custom scripts) that ingests system data, applies analytics, and flags exceptions.

In Nepal, continuous auditing is in early adoption. Major banks have begun deploying continuous-audit analytics; mid-size banks and smaller organisations rely on periodic audit. The trend is toward more continuous coverage, as both audit capability and system data availability grow.

The next chapter takes these foundations — risk, controls, evidence, audit trails — and walks through how an actual audit is planned and executed.
