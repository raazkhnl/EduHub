---
title: 'Chapter 2 — IT Governance and Risk Management'
sidebar_label: 'Ch 02 — IT Governance and Risk Management'
sidebar_position: 2
description: 'Chapter 2 of Security and Audit Practitioner (ENCTNS625).'
slug: /ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner/notes/ch02
tags: [msncs, ENCTNS625, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

IT governance and risk management are simultaneously the foundation of mature IS practice and a primary focus of IS audit work. The practitioner assesses governance maturity, evaluates risk management effectiveness, examines enterprise architecture adequacy, and tests regulatory compliance. The frameworks were introduced in earlier subjects — particularly ENCTNS552 Information Systems Audit and the Information Systems Security Professionalism subject. This chapter takes them up specifically from the practitioner-auditor perspective: how to assess governance frameworks in practice, how to examine enterprise architecture in audit context, how the risk management process is tested operationally, how maturity models are applied for objective assessment, and how regulatory compliance is verified.

## 2.1 IT governance frameworks in practice

### Governance audit focus

When auditing IT governance, the practitioner assesses whether the organisation has and uses:

- Clear governance structure with appropriate authority.
- Documented policies aligned with strategy.
- Effective oversight mechanisms.
- Adequate resources and capabilities.
- Performance measurement and reporting.
- Continuous improvement processes.
- Stakeholder engagement.

Each is examined through specific tests.

### COBIT 2019 in audit practice

COBIT 2019, covered in ENCTNS552, serves as common framework for governance audits.

**Audit application of COBIT:**

**Maturity assessment.** Each of 40 governance and management objectives assessed against COBIT capability levels (0-5).

**Process assessment.** Specific COBIT processes assessed against process attributes.

**Control assessment.** COBIT control objectives provide audit criteria.

**Gap analysis.** Current state vs target state per COBIT.

**Coverage analysis.** Which COBIT objectives are addressed; which not.

### Specific COBIT objectives the auditor examines

For IS audit, particularly relevant COBIT objectives:

**EDM01 Ensured Governance Framework Setting and Maintenance.** Governance structure exists and functions.

**EDM03 Ensured Risk Optimisation.** Risk approach defined and applied.

**APO01 Managed I&T Management Framework.** Management framework operates.

**APO12 Managed Risk.** Risk management process operates.

**APO13 Managed Security.** Security management operates.

**DSS05 Managed Security Services.** Security services delivered.

**MEA03 Managed Compliance With External Requirements.** Compliance managed.

Each examined through specific evidence — policies, meeting records, risk register entries, performance metrics, audit logs.

### Tests for governance audit

**Document review.** Charter, policies, terms of reference, organisational charts.

**Meeting record review.** Board and committee meeting minutes; decisions made.

**Interview.** Senior leadership about governance practice.

**Observation.** Governance meetings if accessible.

**Reporting review.** Reports going to governance bodies.

**Decision tracing.** Specific decisions traced through governance process.

**Effectiveness assessment.** Whether governance is producing intended outcomes.

### Common governance audit findings

Patterns the practitioner frequently identifies:

**Documented but unfollowed.** Policies exist but practice differs.

**Outdated.** Documentation not maintained.

**Missing escalation paths.** Issues identified but not escalated.

**Unclear accountability.** RACI gaps.

**Insufficient oversight.** Governance bodies meet but don't engage substantively.

**Resource shortfalls.** Governance underfunded.

**Reporting gaps.** Important information not reaching decision-makers.

**Action follow-up gaps.** Decisions made but not tracked to completion.

### Nepali bank governance audit

For a Nepali bank IS audit covering governance:

**Documents reviewed.**
- IT/Security policy framework.
- Board IT and Risk Committee charters.
- IT strategic plan.
- IT operational plans.
- Service-level agreements with vendors.

**Meetings examined.**
- Board IT Committee minutes.
- Management IT/Security Steering Committee minutes.
- Operational committee minutes.

**People interviewed.**
- Board IT Committee Chair.
- CEO or COO with IT oversight.
- CIO.
- CISO.
- Internal audit head.

**Tests performed.**
- Policy hierarchy completeness.
- Policy approval and currency.
- Committee meeting frequency vs charter.
- Decision tracking.
- Strategic plan execution.
- Performance reporting to board.

**Reporting against NRB IT directives.** Specific provisions of NRB IT directives mapped to evidence.

Common findings: policy documentation gaps, infrequent committee meetings, insufficient performance metrics, weak action follow-up.

## 2.2 Enterprise architecture for audit

### Enterprise architecture

*Enterprise architecture is the discipline of designing and managing the structure of an organisation's business processes, information systems, infrastructure, and technology in coherent integrated way, providing the blueprint through which strategy is translated into capability, supporting both current operations and planned evolution.*

For audit purposes, enterprise architecture provides the map of what to audit and how systems interconnect.

### Major EA frameworks

**TOGAF (The Open Group Architecture Framework).** Most widely used. Architecture Development Method (ADM) provides phased approach.

**Zachman Framework.** Earlier framework using matrix of perspectives and aspects.

**FEAF (Federal Enterprise Architecture Framework).** US federal.

**DoDAF, MODAF.** US and UK defence frameworks.

**Gartner approach.** Vendor-specific framework.

**Various sectoral frameworks.** Industry-specific approaches.

For commercial practice, TOGAF most common; ENCTNS552 referenced its place in audit context.

### EA layers

Typical layered view:

**Business architecture.** Business capabilities, processes, organisation, value streams.

**Information architecture.** Data and information assets.

**Application architecture.** Applications and their interactions.

**Technology architecture.** Infrastructure supporting applications.

**Security architecture.** Cross-cutting security capabilities.

Each layer has audit implications.

### EA artifacts the auditor uses

**Business capability model.** What the organisation does.

**Application portfolio.** Inventory of applications with key attributes.

**Technology portfolio.** Infrastructure inventory.

**Integration architecture.** How systems connect.

**Data architecture.** Where data is held; how it flows.

**Reference architectures.** Standard patterns.

**Architecture roadmaps.** Planned evolution.

**Architecture decision records.** Significant decisions documented.

### EA review in audit

The practitioner assesses:

**EA function existence.** Is there an EA function?

**EA artefacts current.** Are documents maintained?

**EA decisions documented.** Are key decisions recorded?

**Architecture review process.** Do new initiatives go through review?

**Architecture compliance.** Are systems built per architecture?

**Architecture governance.** Is there appropriate oversight?

Findings often include: architecture documentation gaps, weak review process, deviations from architecture not documented, missing architecture for newer technology areas.

### Application portfolio for audit

A current application portfolio enables:

**Audit universe identification.** Applications that need audit attention.

**Risk prioritisation.** Application criticality and risk.

**Change tracking.** What is changing.

**Vendor visibility.** Third-party dependencies.

**Cost visibility.** Where money is going.

**Lifecycle management.** End-of-life planning.

For Nepali banks, application portfolio typically includes 50-200 applications; portfolio quality varies. Mature institutions maintain comprehensive portfolios in dedicated tools.

### Technology portfolio for audit

The technology portfolio:

**Hardware inventory.** Servers, network devices, storage.

**Software inventory.** Operating systems, databases, middleware.

**Cloud inventory.** Services consumed.

**Network inventory.** Topology, segments.

**Security tools inventory.** Defensive technology.

CIS Control 1 and 2 specifically require enterprise asset and software inventory. Audit testing frequently identifies inventory gaps.

### Integration architecture

How systems interconnect creates audit considerations:

**API inventories.** Internal and external APIs.

**Data flows.** What data moves where.

**Authentication mechanisms.** How systems authenticate.

**Trust boundaries.** Where security domains meet.

**Third-party integrations.** External system connections.

For Nepali banks integrating with NPI, FonePay, CIB, NRB systems, and various others, integration architecture is substantial; audit examines security and operational controls.

### Architecture for audit findings

Common findings:

**No formal EA function.** Smaller organisations.

**Incomplete portfolios.** Especially for older systems and shadow IT.

**Documentation drift.** Documentation behind reality.

**Weak governance.** Architecture decisions ad hoc.

**Missing controls.** Integration points without appropriate controls.

**Technical debt.** Architecture decisions creating long-term problems.

The auditor reports these as findings with recommendations.

## 2.3 Risk management process — operational detail

### Risk management audit

The practitioner audits the risk management process — distinct from performing risk assessment.

### Components assessed

**Risk management framework.** Documented approach (per ISO 27005, NIST RMF, or alternative).

**Risk appetite and tolerance.** Formally defined.

**Risk identification process.** How risks are identified.

**Risk analysis methodology.** How risks are analysed.

**Risk register.** Maintained and current.

**Risk treatment decisions.** Documented with rationale.

**Risk monitoring.** Ongoing assessment.

**Risk reporting.** To appropriate stakeholders.

**Risk integration with decision-making.** Risk considered in business decisions.

### Risk framework audit

The framework documentation reviewed for:

**Completeness.** Covers all required elements.

**Currency.** Reflects current organisation.

**Alignment.** With chosen reference framework.

**Adoption.** Actually used in practice.

**Improvement mechanism.** Updates from lessons learned.

### Risk register audit

The risk register is primary audit evidence:

**Completeness.** Material risks identified.

**Quality of risk descriptions.** Specific enough to be useful.

**Likelihood and impact assessment.** Quality of analysis.

**Treatment decisions.** Documented and reasonable.

**Owner identification.** Specific individual accountable.

**Status tracking.** Currency of status.

**Risk reduction over time.** Movement toward target.

Sample-based testing of specific entries: trace to source, verify analysis, test treatment status, evaluate residual risk reasonableness.

### Treatment plan audit

For risks being mitigated:

**Treatment specificity.** Specific actions, not vague.

**Resource commitment.** Realistic resources.

**Timeline.** Specific dates.

**Owner.** Accountable individual.

**Progress.** Actual progress vs plan.

**Effectiveness.** Reduced risk as intended.

Treatment plans not executed are common finding.

### Risk acceptance audit

For accepted risks:

**Documentation.** Formal acceptance recorded.

**Approval authority.** Acceptance by appropriate level (higher risks require higher approval).

**Justification.** Documented rationale.

**Review cycle.** Periodic re-evaluation.

**Conditions.** Any conditions noted.

Unauthorised risk acceptance is significant finding.

### Risk reporting audit

Risk reports to leadership reviewed for:

**Accuracy.** Reports match underlying data.

**Completeness.** Material risks included.

**Clarity.** Understandable to audience.

**Frequency.** Per requirements.

**Action focus.** Decisions sought identified.

**Trends.** Direction over time visible.

### Risk culture audit

Beyond process, culture:

**Risk awareness across organisation.** Not just risk team.

**Reporting of issues.** Are issues raised and addressed?

**Blame culture vs learning culture.** Lessons learned culture?

**Resource adequacy.** Risk management appropriately resourced.

**Tone from top.** Leadership engagement.

Culture is harder to audit than process; observational and interview evidence primary.

### Worked example — Nepali bank risk management audit

A practitioner reviewing risk management at a Nepali commercial bank:

**Framework review.**
- Bank uses ISO 27005-aligned framework.
- Documented in IT Risk Management Policy v3.2 (2024).
- Aligned with NRB IT directive risk requirements.
- Last reviewed and approved December 2024.

**Risk register review.**
- 87 active risks tracked.
- 5 sampled in detail (judgmental — by risk rating and recency).
- For each: traced to source documentation, verified scoring rationale, examined treatment status.
- Findings: 1 risk with outdated treatment status (last updated 11 months ago vs quarterly requirement).

**Treatment plan examination.**
- 23 risks in active treatment.
- 5 sampled.
- 3 on track per plan; 2 behind schedule without documented rescheduling.

**Acceptance review.**
- 8 risks formally accepted.
- All accepted at appropriate authority level per matrix.
- 1 acceptance missing periodic review (overdue).

**Reporting review.**
- Quarterly board risk report reviewed for sample period.
- Reports complete and align with underlying data.
- Trend analysis present.

**Findings.**
- Medium severity: 1 outdated risk treatment status; 2 plans behind without rescheduling; 1 overdue acceptance review.
- Recommendations: tighten quarterly review discipline; formalise rescheduling process.

The findings, while not severe, are concrete and actionable. The audit cycle returns to verify remediation.

## 2.4 Maturity models for assessment

### Maturity models

*Maturity models are structured assessment frameworks that describe progressive levels of capability — from initial ad-hoc through defined, managed, measured, to optimising — providing a basis for assessing current state, defining target state, and measuring improvement over time, useful for audit assessment, benchmarking, and improvement planning.*

Maturity models provide:
- Common vocabulary for capability assessment.
- Objective basis for comparison.
- Roadmap from current to target.
- Communication tool for stakeholders.

### CMMI

*Capability Maturity Model Integration is the model originally developed for software engineering but extended to broader process capability, defining five maturity levels — Initial, Managed, Defined, Quantitatively Managed, Optimising — with specific practices required at each level, providing the foundation for many subsequent maturity models.*

CMMI levels:

**Level 1 — Initial.** Ad hoc; unpredictable; reactive.

**Level 2 — Managed.** Projects planned, performed, measured, controlled.

**Level 3 — Defined.** Organisational standards.

**Level 4 — Quantitatively Managed.** Measured and controlled.

**Level 5 — Optimising.** Focus on continuous improvement.

CMMI applied to many domains including security.

### NIST CSF Tiers

NIST CSF defines four tiers:

**Tier 1 — Partial.** Limited risk awareness; ad hoc.

**Tier 2 — Risk Informed.** Approved risk-management practices; not necessarily organisation-wide.

**Tier 3 — Repeatable.** Formal policies, organisation-wide; regular updates.

**Tier 4 — Adaptive.** Continuous improvement; lessons applied.

Tiers describe how risk management is approached, not specific capabilities.

### COBIT capability model

COBIT 2019 uses ISO 33000-aligned capability assessment:

**Level 0 — Incomplete.** Process not implemented.

**Level 1 — Performed.** Process operates and achieves outcomes.

**Level 2 — Managed.** Process planned, monitored, adjusted.

**Level 3 — Established.** Standardised processes.

**Level 4 — Predictable.** Operating within defined limits.

**Level 5 — Optimising.** Continuous improvement.

Each process attribute (PA) assessed independently; overall capability based on all attributes.

### Cybersecurity-specific maturity models

**Cybersecurity Maturity Model Certification (CMMC).** US Department of Defense requirement; three levels (Level 1-3).

**FAIR Maturity Model.** Risk management maturity per FAIR.

**Cyber Risk Maturity.** Various models for cyber risk specifically.

**Application Security Maturity Model.** OWASP SAMM, BSIMM for application security.

**Privacy Maturity Models.** Various for privacy programmes.

### Maturity assessment process

For audit context:

**Define scope.** What is being assessed.

**Identify model.** Which maturity model.

**Gather evidence.** Documents, interviews, observations.

**Score against criteria.** Each element scored per model.

**Aggregate scores.** Overall capability.

**Compare to target.** Current vs target maturity.

**Identify gaps.** Where work is needed.

**Recommend improvements.** Specific actions to advance.

**Document.** Working papers and report.

### Using maturity assessment in audit

Maturity assessment supplements traditional audit findings:

**Objective rating.** Beyond pass/fail.

**Benchmarking.** Against peer organisations.

**Trend tracking.** Improvement over time.

**Strategic planning.** Investment direction.

**Communication.** Clear executive message.

For Nepali enterprise context, maturity assessment increasingly used alongside traditional audit; ISO 27001 certification audits inherently maturity-oriented.

### Practical maturity scoring example

Assessing identity and access management maturity:

**Capability attributes:**
- Identity lifecycle management.
- Authentication strength.
- Authorisation granularity.
- Privileged access management.
- Access reviews.
- Federation and SSO.

**Per attribute, score 1-5 against criteria.**

**Example — Authentication strength.**
- Level 1: Username/password only.
- Level 2: Some MFA but inconsistent.
- Level 3: MFA standard for sensitive access.
- Level 4: MFA universal; phishing-resistant for sensitive.
- Level 5: Continuous risk-based authentication; adaptive.

Bank being assessed: Level 3 (MFA standard for sensitive but not universal). Target: Level 4. Gap: universal MFA rollout; phishing-resistant for highest-risk access.

The score communicates objectively; the gap analysis drives action.

## 2.5 Regulatory compliance

### Compliance audit context

Compliance was covered in earlier subjects. The practitioner perspective focuses on systematic verification of compliance with applicable requirements.

### Compliance audit methodology

**Identify applicable requirements.** What rules apply.

**Map requirements to controls.** What controls address each requirement.

**Assess control adequacy.** Are controls designed appropriately.

**Test control operation.** Are controls operating.

**Evaluate residual compliance risk.** Where compliance falls short.

**Report findings.** To management and stakeholders.

### Nepal regulatory landscape

For Nepali enterprises, key compliance areas:

**Banking sector.**
- NRB IT Directives (annual updates).
- NRB Risk Management Guidelines.
- NRB BCP/DR Guidelines.
- NRB Outsourcing Guidelines.
- NRB Customer Information Protection.
- Banking Act 2073 (2017) and amendments.
- Foreign Exchange Regulation Act.

**Telecommunications.**
- Telecommunications Act 2053 and Regulations.
- NTA Quality of Service Directives.
- Various NTA technical directives.

**General.**
- Electronic Transactions Act 2063.
- Privacy Act 2075.
- Penal Code 2074.
- Companies Act 2063.
- Income Tax Act.
- Labour Act.

**Specific.**
- Stock Exchange / SEBON for capital markets.
- IRDA equivalent for insurance.
- Sector-specific others.

The practitioner auditing a Nepali bank must understand the relevant subset of these and how they apply.

### NRB IT directive compliance audit

A specific high-frequency compliance audit area for Nepali banks. NRB IT directives include provisions on:

- Information security policy and organisation.
- Risk management.
- Asset management.
- Human resources security.
- Physical and environmental security.
- Communications and operations management.
- Access control.
- Information systems acquisition, development, maintenance.
- Information security incident management.
- Business continuity management.
- Compliance.
- Cybersecurity.
- Cloud computing.
- Customer information protection.

For each provision, the auditor:
- Identifies specific requirement.
- Identifies organisation's controls.
- Tests control operation.
- Documents evidence and conclusion.
- Reports findings.

### International framework compliance

Beyond Nepali frameworks, common international compliance audits:

**ISO 27001 certification.** External certification body audits.

**SOC 2.** Service organisations to support customer due diligence.

**PCI-DSS.** Entities handling payment card data.

**GDPR.** For EU data processing.

**Specific contractual.** Customer-required audits.

### Multi-framework compliance

Where multiple frameworks apply, the practitioner:

**Maps overlap.** Controls satisfying multiple requirements.

**Identifies gaps.** Requirements not addressed.

**Identifies conflicts.** Where requirements differ.

**Avoids redundant testing.** Test once, satisfy multiple.

**Documents framework alignment.** For each control.

Mature compliance programmes use control libraries that map to multiple frameworks.

### Compliance reporting

Reports for various audiences:

**Management.** Detailed compliance status.

**Audit committee.** Summary with material issues.

**Board.** Strategic compliance posture.

**Regulators.** As required.

**Customers.** SOC 2 for service organisations; other formats.

**Internal stakeholders.** Various briefings.

Each requires appropriate detail and framing.

### Compliance technology

GRC platforms (Archer, ServiceNow GRC, Drata, Vanta, others) support compliance work:
- Control catalogue.
- Evidence collection.
- Test workflow.
- Issue tracking.
- Reporting.
- Multi-framework mapping.

For Nepali enterprises, GRC platform adoption emerging at larger institutions; many smaller organisations still spreadsheet-based.

### Compliance audit findings

Common findings:

**Documentation gaps.** Required documentation incomplete.

**Implementation gaps.** Controls documented but not implemented.

**Effectiveness gaps.** Controls implemented but not effective.

**Awareness gaps.** Compliance staff don't know requirements.

**Resource gaps.** Compliance under-resourced.

**Monitoring gaps.** Compliance not monitored ongoing.

**Reporting gaps.** Issues not reaching decision-makers.

### From governance and risk to acquisition and development

The next chapter examines auditing the IS acquisition and development lifecycle — project management audits, feasibility analysis, SDLC and Agile controls, and security testing methods. The practitioner's task extends from steady-state governance to the changes that introduce new risks and require specific audit attention.
