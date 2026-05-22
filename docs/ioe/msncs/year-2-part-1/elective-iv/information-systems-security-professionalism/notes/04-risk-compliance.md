---
title: 'Chapter 4 — Risk Management and Compliance Practices'
sidebar_label: 'Ch 04 — Risk Management and Compliance Practices'
sidebar_position: 4
description: 'Chapter 4 of Information Systems Security Professionalism (INFOSEC-PRO).'
slug: /ioe/msncs/year-2-part-1/elective-iv/information-systems-security-professionalism/notes/ch04
tags: [msncs, INFOSEC-PRO, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Risk management is the disciplined practice at the heart of mature information security work. Where standards (Chapter 3) prescribe what to do, risk management explains why — providing the rational basis for prioritising one investment over another, accepting some risks while mitigating others, and demonstrating to stakeholders that the security programme is responsive to actual exposures rather than mere checklist execution. Compliance practices operationalise both standards and risk management through audit cycles, documentation, and reporting. This chapter examines the major risk frameworks (NIST RMF, ISO 27005, FAIR), the practical work of risk assessment and mitigation planning, the discipline of compliance audit planning, and the documentation and professional reporting that records and communicates the work.

## 4.1 Risk frameworks — NIST RMF, ISO 27005, FAIR

### Risk

*Risk in information security is the potential for an adverse event — typically a threat exploiting a vulnerability — to harm an organisation's assets, operations, individuals, or other interests, characterised by likelihood of occurrence and magnitude of impact, providing the basis for prioritising security activities and resource allocation.*

The basic equation:

$$\text{Risk} = \text{Likelihood} \times \text{Impact}$$

This simple formula belies considerable practical complexity. Likelihood of what specifically? Impact in what dimensions? Over what time horizon? With what confidence? Risk frameworks provide structure for working through these questions.

### NIST Risk Management Framework

*The NIST Risk Management Framework (NIST RMF), specified in NIST SP 800-37 with supporting publications, provides a structured seven-step process for integrating security and privacy risk management activities into the system development lifecycle, originally developed for US federal systems but widely adopted in other contexts.*

The seven steps:

**Prepare.** Essential activities to manage risk effectively, including establishing risk-management roles and risk-assessment approach.

**Categorise.** Categorise the system and information based on impact analysis (low/moderate/high for confidentiality, integrity, availability).

**Select.** Select an initial set of baseline security controls based on categorisation.

**Implement.** Implement the controls and document.

**Assess.** Assess controls to determine if implemented correctly and producing desired outcome.

**Authorise.** Senior official decision to authorise system operation based on residual risk.

**Monitor.** Continuously monitor controls and system to maintain security posture.

The framework integrates with NIST SP 800-53 (Security and Privacy Controls), NIST SP 800-39 (Managing Information Security Risk), and other NIST publications.

### NIST RMF strengths

**Comprehensive.** Covers full lifecycle.

**Documented.** Extensive supporting guidance.

**Government-mandated** in US federal context; widely adopted elsewhere.

**Integrates security and privacy.** Both addressed in unified framework.

**Continuous monitoring.** Modern emphasis on continuous rather than point-in-time.

### NIST RMF limitations

**Bureaucratic.** Heavyweight; may be excessive for smaller organisations.

**Implementation cost.** Substantial investment required.

**Document-heavy.** Significant documentation burden.

**US-origin.** Some elements specifically US-context.

### ISO/IEC 27005

*ISO/IEC 27005 is the international standard providing guidelines for information security risk management, complementing ISO/IEC 27001 by elaborating the risk-management requirements of the ISMS, applicable across industries and organisation sizes, with most recent revision in 2022.*

ISO 27005 structure:

**Context establishment.** Internal and external context; risk criteria; scope.

**Risk identification.** Assets, threats, existing controls, vulnerabilities, consequences.

**Risk analysis.** Methodologies and analysis approach.

**Risk evaluation.** Comparing analysed risk against criteria.

**Risk treatment.** Selecting options — modify, retain, avoid, share.

**Risk acceptance.** Formal acceptance of residual risk.

**Risk communication and consultation.**

**Risk monitoring and review.**

### ISO 27005 strengths

**Aligned with ISO 27001.** Natural fit for ISMS implementations.

**International applicability.**

**Methodology-flexible.** Doesn't mandate specific risk-assessment approach.

**Mature.** Well-understood through long use.

### NIST RMF vs ISO 27005

| Aspect | NIST RMF | ISO 27005 |
|---|---|---|
| Origin | US federal | International ISO/IEC |
| Mandate | US federal systems | Voluntary |
| Structure | 7-step process | Process model |
| Control catalogue | Tied to NIST SP 800-53 | Implementation-agnostic |
| Documentation | Substantial | Substantial |
| Integration | NIST family | ISO 27001 ISMS |
| Industry adoption | Common in regulated industries | Common where ISO 27001 used |

Many organisations use ISO 27005 within their ISO 27001 ISMS and reference NIST RMF for additional rigour.

### FAIR — Factor Analysis of Information Risk

*FAIR (Factor Analysis of Information Risk) is a quantitative risk-analysis framework developed by Jack Jones and supported by the Open FAIR institute and Open Group, that decomposes risk into measurable factors and produces probability-distribution-based estimates of loss expressed in monetary terms, enabling more rigorous and comparable risk analysis than traditional qualitative approaches.*

FAIR decomposes risk:

$$\text{Risk} = \text{Loss Event Frequency} \times \text{Loss Magnitude}$$

Each component further decomposes:

**Loss Event Frequency** = Threat Event Frequency × Vulnerability

**Vulnerability** = Threat Capability vs Difficulty (resistance strength)

**Loss Magnitude** = Primary Loss + Secondary Loss

Each factor is estimated with probability distributions (most likely, minimum, maximum) and combined through Monte Carlo simulation.

### FAIR strengths

**Quantitative.** Monetary estimates support business decisions.

**Decomposed.** Forces explicit thinking about each factor.

**Probabilistic.** Acknowledges uncertainty.

**Comparable.** Different risks comparable on same basis.

**Justifiable.** Reasoning is auditable.

### FAIR limitations

**Data requirements.** Requires inputs that may not be readily available.

**Expertise needed.** Sophisticated analytical approach.

**Tool dependency.** Practical use needs analytical tools.

**Cultural shift.** Organisations used to qualitative may resist.

### Other risk frameworks

**OCTAVE.** Operationally Critical Threat, Asset, and Vulnerability Evaluation. Carnegie Mellon development.

**Bow-tie analysis.** Visual technique for understanding event causality.

**ISO 31000.** Generic risk management (not security-specific).

**COSO ERM.** Enterprise risk management framework.

**Cyber-specific** frameworks from various vendors (X-Analytics, RiskLens for FAIR-based, others).

### Choosing among frameworks

For Nepali enterprises:

**NRB-regulated banks.** Often required to follow NRB's risk-management guidance which aligns with ISO 27005 / NIST approaches.

**Other regulated.** Sectoral guidance applies.

**General enterprises.** Pick based on existing framework alignment, organisational maturity, and resource availability.

**Multi-framework approach.** Many use ISO 27005 for management with FAIR for high-value analyses.

For MSc graduates, deep familiarity with at least one framework (often ISO 27005 in Nepali context) plus working knowledge of others is professionally valuable.

## 4.2 Risk assessment and mitigation planning

### Risk assessment process

The systematic activity of identifying, analysing, and evaluating risks.

### Step 1 — Establish context

**Internal context.** Organisation, structure, processes, technology, capabilities.

**External context.** Industry, regulatory, threat environment, market conditions.

**Risk criteria.** Likelihood and impact scales; risk tolerance; risk appetite.

**Scope.** What is being assessed.

### Step 2 — Identify assets

Information assets to be protected:

**Information.** Data in various forms.

**Systems.** Hardware and software.

**Services.** Provided by or to the organisation.

**People.** With access to information.

**Physical.** Buildings, facilities.

**Reputation and brand.** Intangible but material.

For each, determine:
- Owner.
- Value.
- Sensitivity.
- Dependencies.

### Step 3 — Identify threats

*A threat is any potential cause of an unwanted incident that may result in harm to a system, an organisation, individuals, or society, including deliberate actions (attackers), accidental actions (errors), and environmental factors (natural events, infrastructure failures).*

Categories:
- **Human deliberate.** External attackers, malicious insiders.
- **Human accidental.** Errors, mistakes.
- **Environmental.** Natural disasters, infrastructure failures.
- **Technical.** System failures.
- **Supply chain.** Third-party issues.

### Step 4 — Identify vulnerabilities

*A vulnerability is a weakness in an asset or control that could be exploited by one or more threats, ranging from technical software flaws to procedural weaknesses to organisational gaps.*

Sources of vulnerability information:
- Vulnerability scans.
- Configuration assessments.
- Audit findings.
- Penetration test results.
- Industry advisories.
- Incident analysis.

### Step 5 — Analyse risks

Estimate likelihood and impact for each identified risk.

**Likelihood considerations:**
- Threat capability.
- Threat motivation.
- Threat frequency.
- Vulnerability exposure.
- Existing controls effectiveness.

**Impact considerations:**
- Financial.
- Operational.
- Reputational.
- Legal/regulatory.
- Strategic.
- Human/safety.

**Qualitative scales.** Common pattern:
- Likelihood: Very Low / Low / Medium / High / Very High.
- Impact: Negligible / Minor / Moderate / Major / Severe.
- Risk: combined into rating (typically Low / Medium / High / Critical).

**Quantitative.** Where possible — monetary, percentage, distributions.

### Step 6 — Evaluate risks

Compare analysed risks against criteria:
- Which risks are above appetite?
- Which need treatment?
- What priority?

### Step 7 — Risk treatment

Four primary treatment options:

**Avoid.** Eliminate the risk by not doing the activity.

**Mitigate (modify).** Reduce likelihood or impact through controls.

**Transfer (share).** Move risk to others (insurance, outsourcing).

**Accept (retain).** Acknowledge and proceed.

Treatment depends on cost, effectiveness, feasibility, alignment with risk appetite.

### Risk register

The primary documentation:

| Risk ID | Description | Owner | Likelihood | Impact | Rating | Treatment | Status |
|---|---|---|---|---|---|---|---|
| R-001 | Customer data breach via web app | CISO | High | High | Critical | Mitigate via WAF, code review | In progress |
| R-002 | Ransomware encrypting backups | CIO | Medium | Critical | High | Immutable backups, segmentation | Active |
| R-003 | Insider data exfiltration | HR + CISO | Low | High | Medium | DLP, monitoring | Active |

Additional columns commonly include: identification date, last review, treatment cost, target completion, residual risk rating.

### Mitigation planning

For each risk requiring treatment:

**Treatment selection.** Specific controls or actions.

**Cost estimate.** Resources required.

**Timeline.** When to be in place.

**Owner.** Who is responsible.

**Dependencies.** What must precede.

**Success criteria.** How effectiveness will be measured.

**Reporting.** How status will be communicated.

### Worked risk-assessment example (Nepali bank)

A simplified risk assessment for a Nepali bank's customer-facing web banking:

**Asset.** Customer-facing web banking application and underlying systems.

**Threats considered:**
1. External attacker targeting customer credentials.
2. Application vulnerability (e.g., injection).
3. DDoS attack on availability.
4. Insider abuse of administrative access.
5. Cloud-provider outage.

**For threat 1 (credential targeting):**
- Likelihood: High (regular phishing and credential stuffing observed).
- Impact: High (customer financial loss, regulatory consequences, reputational damage).
- Combined: Critical.
- Existing controls: MFA, account lockout, monitoring.
- Residual: Medium (post-controls).
- Treatment: Continue mitigations; consider FIDO2 for higher-tier customers.

**For threat 2 (application vulnerability):**
- Likelihood: Medium (well-tested but possible).
- Impact: Very High (potential broad compromise).
- Combined: Critical.
- Existing controls: SAST/DAST, code review, WAF, penetration testing.
- Residual: Low-Medium.
- Treatment: Continue mitigations; quarterly penetration test.

The complete assessment would cover dozens of threats across multiple asset categories. Documented systematically; updated regularly; reviewed by appropriate governance forum.

### Mitigation planning considerations

**Quick wins first.** Address easy, high-impact items before complex ones.

**Combine related items.** One implementation may address multiple risks.

**Resource constraints.** Sequence based on available resources.

**Dependencies.** Some items must precede others.

**Operational impact.** Schedule to minimise disruption.

**Communication.** Stakeholders informed of timeline and impact.

### Continuous improvement of risk programme

The risk programme itself should improve:

- **Annually.** Comprehensive review of approach.
- **After incidents.** Lessons applied.
- **As context changes.** New regulations, new threats, new technologies.
- **From feedback.** Stakeholder input on programme quality.

For Nepali bank context, NRB IT directives provide framework; banks implement and improve over time. Newer banks build initial framework; mature banks refine continuously.

## 4.3 Compliance audit planning

### Compliance audit

Discussed extensively in ENCTNS552 (Information Systems Audit). For the professionalism context, the focus is on what the security professional needs to know about audit — particularly when participating as auditee rather than auditor.

### Audit types

**Internal audit.** Conducted by internal audit function.

**External audit.** Conducted by external firm. Includes ISO 27001 certification audits, statutory financial audit IT components, sectoral regulatory audits.

**First-party audit.** Self-assessment.

**Second-party audit.** Customer auditing supplier.

**Third-party audit.** Independent auditor (most ISO certification audits).

**Specific compliance audits.** Per requirement (PCI-DSS QSA, SOC 2 service auditor).

### Audit cycle

**Planning.** Scope, timing, resources, methodology.

**Fieldwork.** Evidence gathering, testing, interviews.

**Reporting.** Findings, recommendations.

**Follow-up.** Verification of remediation.

### Audit planning elements

For the audited organisation:

**Notification.** Advance notice of audit.

**Scope confirmation.** Agreement on what is in scope.

**Document preparation.** Required documentation ready.

**Evidence preparation.** Records to be tested.

**Logistics.** Meeting spaces, system access.

**Coordination.** Internal resources to support.

### Working with auditors

Effective auditor relationships:

**Transparency.** Honest answers; don't try to mislead.

**Responsiveness.** Timely provision of requested information.

**Professional engagement.** Constructive rather than defensive.

**Documentation.** Show evidence; don't just describe.

**Issue acknowledgement.** When issues exist, acknowledge rather than dispute.

**Remediation commitment.** When findings raised, commit to fix.

**Communication.** Keep stakeholders informed.

### Common compliance audit areas for security

**ISMS audit.** Per ISO 27001.

**Risk-management audit.** Process and outcomes.

**Access control audit.** Identity, authentication, authorisation.

**Change management audit.** Authorisation, testing, documentation.

**Incident management audit.** Detection, response, lessons.

**BCP/DR audit.** Plans, testing, capability.

**Vendor management audit.** Due diligence, monitoring.

**Privacy audit.** Per applicable regulations.

**Specific framework audits.** PCI-DSS, SOC 2, sectoral.

### Audit preparation

Practical preparation:

**Maintain evidence continuously.** Don't generate at audit time.

**Run pre-audits.** Internal review before external.

**Address known issues.** Don't bring them to audit.

**Update documentation.** Reflect current state.

**Brief staff.** Who will be interviewed; what to expect.

**Coordinate logistics.** Smooth experience.

**Provide context.** Help auditor understand environment.

### Audit findings management

When findings raised:

**Acceptance or dispute.** Sometimes findings are based on misunderstanding; clarify rather than dispute defensively.

**Root cause analysis.** Why did the issue exist?

**Remediation planning.** Specific actions with timeline and ownership.

**Tracking.** Visibility into status.

**Closure verification.** Independent verification of fix.

**Lessons learned.** Programme improvement.

### Audit findings reporting

Findings communicated through:

**Management letter.** Detailed findings to management.

**Audit report.** Formal opinion (positive, qualified, adverse).

**Executive summary.** For senior management.

**Board summary.** For audit committee.

Different audiences need different presentations.

### Compliance audit in Nepali context

For Nepali enterprises:

**Banks.** Statutory IS audit by external auditors annually; NRB-prescribed scope and frequency. NRB-supervised special audits as needed.

**Telecoms.** NTA-required audits.

**Public companies.** Internal audit and external statutory audit; IT components.

**Government entities.** OAG audits and ministry internal audits.

**ISO 27001 certified entities.** Annual surveillance audits and 3-yearly recertification.

For MSc graduates, audit participation is common — as auditee initially, potentially as auditor later in career (often after CISA certification).

## 4.4 Documentation and professional reporting

### Documentation as professional discipline

*Documentation in security professional practice is the systematic creation and maintenance of records that capture decisions, designs, configurations, procedures, evidence, and outcomes, providing organisational memory, supporting accountability, enabling continuity, satisfying audit requirements, and demonstrating due care.*

Documentation distinguishes professional from informal practice. The professional documents:
- Decisions and reasoning.
- Designs and architectures.
- Configurations and standards.
- Procedures and runbooks.
- Audit evidence.
- Risk assessments.
- Incident records.
- Policy compliance evidence.
- Performance metrics.

### Documentation principles

**Accuracy.** Reflects actual state.

**Currency.** Updated as things change.

**Clarity.** Understandable to the intended audience.

**Conciseness.** Sufficient detail without unnecessary length.

**Consistency.** Standard formats and terminology.

**Accessibility.** Findable when needed.

**Protection.** Sensitive content appropriately protected.

**Retention.** Maintained per retention requirements.

### Categories of documentation

**Policy documents.** What — high-level intent.

**Standards.** What specifically — measurable requirements.

**Procedures.** How — step-by-step.

**Guidelines.** Advisory recommendations.

**Records.** Evidence of activities performed.

**Plans.** Strategic, operational, response plans.

**Reports.** Status and outcome communications.

**Architecture documents.** Design and structure.

**Configuration documents.** Specific settings.

**Reference documents.** Inventories, contact lists.

### Documentation tools

The security profession uses various tools:

**Wiki platforms.** Confluence, Notion, MediaWiki.

**Document management.** SharePoint, Google Drive, document management systems.

**Diagram tools.** Lucidchart, draw.io, Microsoft Visio.

**Specialised GRC platforms.** Document management within compliance tools.

**Code repositories.** For documentation-as-code (Git-managed Markdown).

**Specialised templates.** Various templates for security documents.

### Writing for security professionals

Professional writing skills are essential. Specific considerations:

**Audience awareness.** Technical vs executive vs general.

**Purpose clarity.** What the document is meant to accomplish.

**Logical structure.** Flowing organisation.

**Concise language.** Not overly wordy.

**Active voice.** Where appropriate.

**Technical accuracy.** No errors.

**Citation.** Sources acknowledged.

**Review.** Peer or supervisor review before distribution.

### Common document types

**Security policy.** High-level statement; typically 1-5 pages; reviewed annually.

**Standard.** Specific requirements; longer; reviewed annually.

**Procedure.** Operational steps; updated as needed.

**Risk assessment report.** Findings of assessment.

**Audit report.** Findings and recommendations.

**Incident report.** What happened; investigation; lessons.

**Post-incident review.** Detailed analysis after major incident.

**Status report.** Periodic update on programme status.

**Board report.** Summary for board consumption.

**Vulnerability report.** Vulnerability findings and remediation.

**Penetration test report.** Test methodology, findings, recommendations.

### Executive reporting

Reporting to executives is a specific skill:

**Brevity.** Executives have limited time.

**Business framing.** Risk in business terms.

**Decisions sought.** What executive should do.

**Visualisations.** Charts, dashboards more than text.

**Trends.** Direction matters more than point values.

**Forward-looking.** What's coming, not just historical.

**Action-oriented.** Specific recommendations.

### Board reporting

Even more focused than executive:

**Strategic emphasis.** Direction, posture, major decisions.

**Risk profile.** Top risks and treatment status.

**Compliance status.** Material compliance issues.

**Major incidents.** Significant events.

**Capability and resources.** Status and needs.

**Industry context.** Threats and trends.

### Incident reports

A critical document type:

**Executive summary.** What happened in brief.

**Timeline.** Sequence of events.

**Impact assessment.** What was affected.

**Root cause analysis.** Why it happened.

**Response actions.** What was done.

**Remediation status.** What is being done.

**Lessons learned.** What to do differently.

**Recommendations.** Specific actions.

### Post-incident review documents

Following major incidents:

**Comprehensive timeline.** Detailed sequence.

**Decision analysis.** What decisions were made; what alternatives.

**Communication review.** Internal and external.

**Technical analysis.** Detailed technical findings.

**Control effectiveness review.** What controls worked; what didn't.

**Recommendations.** Comprehensive list with priority.

**Action plan.** What will be done; by whom; when.

These documents become reference for future improvement. Quality matters substantially.

### Templates and consistency

Professional organisations use templates:
- Common structure aids comprehension.
- Required sections ensure completeness.
- Branded format provides identity.
- Reduces variation in quality.

Template libraries are organisational asset.

### Documentation in Nepali enterprise context

For Nepali enterprises:

**Banks.** Comprehensive documentation; NRB-required; mature in major institutions.

**Major enterprises.** Variable maturity; growing.

**Smaller organisations.** Often informal; audit findings frequently highlight gaps.

**Government.** Various initiatives; uneven implementation.

For MSc graduates, strong documentation skills differentiate effective professionals from technically capable but professionally limited contributors. Good technical work that isn't documented well has limited organisational value; good technical work documented effectively scales beyond the individual contributor's direct involvement.

### The professional value of documentation

Beyond compliance, documentation:

**Builds reputation.** Quality work that is well-documented gets more recognition.

**Enables career growth.** Documented contributions are evidence of capability.

**Supports knowledge transfer.** Successors and colleagues can build on work.

**Provides continuity.** Personnel changes don't lose knowledge.

**Demonstrates due care.** Important for liability considerations.

**Enables learning.** Past decisions can be analysed.

The MSc graduate who builds documentation discipline from the start of career develops a professional asset that compounds over decades.

The risk-management and compliance disciplines covered in this chapter provide the structured approach to security work. The next chapter takes up the human dimensions — leadership, communication, and career development — that translate technical capability and disciplined practice into organisational impact and personal career growth.
