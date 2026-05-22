---
title: 'Chapter 1 — Introduction to Security and Audit Practices'
sidebar_label: 'Ch 01 — Introduction to Security and Audit Practices'
sidebar_position: 1
description: 'Chapter 1 of Security and Audit Practitioner (ENCTNS625).'
slug: /ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner/notes/ch01
tags: [msncs, ENCTNS625, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

This subject takes the security and audit practitioner's perspective — the working professional who plans, executes, and reports IS audits as a primary activity. Information systems audit was treated as a discipline in ENCTNS552 and as a professional role in the Information Systems Security Professionalism subject. Here the focus is operational — the methodologies, standards, audit types, and risk-based planning approaches that the practising IS auditor uses day-to-day, with emphasis on the practice rather than the theory. The course aligns closely with the ISACA Information Technology Audit Framework (ITAF) and the body of knowledge tested in CISA, the most-recognised IS audit certification. The Nepali context — NRB-regulated banks, ISO 27001 certified entities, government audits through OAG, and the growing IS audit consulting market — frames the practical examples.

## 1.1 Overview of IS auditing — practitioner perspective

### IS auditing

*Information systems auditing is the systematic, evidence-based examination of an organisation's information systems, processes, and controls — conducted by qualified independent practitioners following established professional standards — to provide assurance about confidentiality, integrity, and availability of information assets, compliance with applicable requirements, and alignment of IT activities with business objectives.*

The practitioner's role is to plan engagements, gather evidence, evaluate against criteria, document findings, and communicate results to stakeholders. The work is structured, evidence-based, and professionally regulated.

### What distinguishes IS audit from related disciplines

**IS audit vs financial audit.** Financial audit focuses on financial statement accuracy; IS audit focuses on systems supporting business operations including but not limited to financial.

**IS audit vs operational audit.** Operational audit covers business processes; IS audit covers the systems supporting them.

**IS audit vs penetration testing.** Penetration testing is technical testing to identify exploitable weaknesses; IS audit is broader, examining controls, processes, and governance.

**IS audit vs assurance engagement.** Closely related; IS audit is one form of assurance engagement.

**IS audit vs consulting.** Audit provides independent assurance; consulting provides advice. Same firm typically separates the two.

### The practitioner's career path

The typical IS audit career trajectory:

**Audit associate / junior auditor.** Entry-level. Evidence gathering under supervision. Internal control documentation. Substantive testing assistance.

**Senior auditor.** Lead specific audit areas. Plan portions of engagements. Supervise associates. Draft audit findings.

**Audit manager.** Plan complete engagements. Manage teams. Stakeholder relationships. Quality review.

**Audit senior manager / principal.** Multiple engagements. Practice development. Client relationships.

**Partner / director.** Practice leadership. Strategy. Major client relationships.

**Internal audit head / Chief Audit Executive.** Senior internal audit leadership.

For Nepali MSc graduates, entry typically through Big 4 (PwC, KPMG, EY, Deloitte have presence in Kathmandu) or local firms with IS audit practices (Brand & Hodges, Sundar Man Shrestha, S.A.R. Associates, others), bank internal audit functions, or sometimes directly into internal audit at major enterprises.

### CISA certification

*The Certified Information Systems Auditor (CISA) certification, granted by ISACA, is the globally recognised credential for IS audit, control, and security professionals, requiring passing a comprehensive examination and demonstrating five years of relevant professional experience, with ongoing continuing professional education to maintain.*

CISA domains (2024 update):

**Domain 1 — Information System Auditing Process.** 18% of exam. Planning, execution, reporting, follow-up of audits.

**Domain 2 — Governance and Management of IT.** 18%. IT governance frameworks, organisational structures, policies, strategy.

**Domain 3 — Information Systems Acquisition, Development and Implementation.** 12%. Project management, business case, requirements, testing, implementation.

**Domain 4 — Information Systems Operations and Business Resilience.** 26%. Operations, resilience, monitoring, change management, third-party management, BCP/DR.

**Domain 5 — Protection of Information Assets.** 26%. Security frameworks, asset management, IAM, network security, data security.

The subject syllabus aligns closely with CISA domains, structured to provide the foundation a CISA candidate would master.

### IS audit professional standards

The practitioner operates under professional standards. The most relevant:

**ISACA Information Technology Audit Framework (ITAF).** Comprehensive framework for IS audit and assurance professionals. Covers general standards, performance standards, reporting standards, and supplementary guidance.

**ISACA Code of Professional Ethics.** Ethical standards for ISACA members and CISA holders.

**ISACA IT Audit and Assurance Standards.** Specific standards covering audit planning, execution, evidence, reporting, follow-up.

**International Standards for the Professional Practice of Internal Auditing (IIA).** For internal auditors specifically.

**ISO 19011.** Guidelines for auditing management systems including ISO 27001 ISMS audits.

**Audit-specific standards from accountancy bodies.** SOC reports follow AICPA standards (SSAE 18); other jurisdictions have local standards.

The practitioner cites applicable standards in audit reports and follows their requirements in execution.

### The IS audit engagement lifecycle

A typical IS audit engagement progresses through phases:

**Engagement acceptance.** Decision to accept the engagement (for external) or assignment (for internal). Independence assessment, capability assessment, scope clarification.

**Planning.** Risk assessment, scope definition, methodology selection, resource planning, audit programme development.

**Fieldwork.** Evidence gathering through inquiry, observation, inspection, re-performance, analytical procedures, automated tools.

**Documentation.** Working papers documenting evidence, tests performed, findings, conclusions.

**Reporting.** Findings communicated to stakeholders through formal reports.

**Follow-up.** Verification that management has addressed findings.

The lifecycle is iterative — findings during fieldwork may trigger additional planning or fieldwork.

### Documentation requirements

The practitioner maintains working papers that:
- Document evidence gathered.
- Record tests performed.
- Support findings and conclusions.
- Demonstrate compliance with standards.
- Provide basis for review by managers and subsequent auditors.

Working papers serve as the audit's permanent record. Quality matters substantially; another auditor should be able to follow the work.

### Independence and objectivity

*Independence is the freedom from conditions that threaten the ability to carry out auditing responsibilities in an unbiased manner, encompassing both actual independence (independence in fact) and perceived independence (independence in appearance), foundational to credibility of audit conclusions.*

The practitioner must be independent of the activities being audited:

**External auditors.** Independent of the organisation audited; cannot have financial interests, employment relationships, or other ties that compromise objectivity.

**Internal auditors.** Independent of the activities being audited within the organisation; reports through structure that protects independence (typically Audit Committee).

**Specific threats to independence.** Self-interest, self-review, advocacy, familiarity, intimidation.

**Safeguards.** Organisational, professional, engagement-level safeguards.

For Nepali bank context, NRB IT directives require independent IS audit; internal audit functions report to the Audit Committee of the Board. External IS auditors must demonstrate independence per their professional standards.

## 1.2 IS audit standards — ISACA ITAF, ISO 27001, NIST

### The standards ecosystem

Multiple standards bodies issue guidance relevant to IS auditing. The practitioner navigates several:

**ISACA standards.** Direct audit standards.

**ISO standards.** Particularly ISO 27001 (ISMS), ISO 19011 (auditing management systems), ISO 27001:2022 controls.

**NIST publications.** Particularly NIST CSF, NIST SP 800-53, NIST SP 800-37 (RMF).

**Sector-specific standards.** PCI-DSS, HIPAA, SOX provisions, sector regulator requirements.

**Local standards.** NRB directives for Nepali banks, OAG guidance for government, others.

The practitioner identifies applicable standards for each engagement and applies them.

### ISACA ITAF in depth

ITAF is structured in three categories:

**General Standards (1000 series).** Apply to all engagements.
- 1001 Audit Charter.
- 1002 Organisational Independence.
- 1003 Auditor Objectivity.
- 1004 Reasonable Expectation.
- 1005 Due Professional Care.
- 1006 Proficiency.
- 1007 Assertions.
- 1008 Criteria.

**Performance Standards (1200 series).** Specific to performing engagements.
- 1201 Engagement Planning.
- 1202 Risk Assessment in Planning.
- 1203 Performance and Supervision.
- 1204 Materiality.
- 1205 Evidence.
- 1206 Using the Work of Other Experts.
- 1207 Irregularities and Illegal Acts.

**Reporting Standards (1400 series).** Specific to reporting.
- 1401 Reporting.
- 1402 Follow-Up Activities.

The standards are accompanied by guidelines (more detailed application guidance) and tools and techniques (specific procedures).

### Materiality concept

*Materiality in audit context is the threshold below which the omission or misstatement of information would not influence the decisions of users of the audit report — a key concept governing how much testing is needed and what findings warrant reporting — applied through professional judgement based on engagement context.*

For IS audits:
- Quantitative materiality (financial impact).
- Qualitative materiality (regulatory, reputational, control significance).
- Both considered together.

A control failure with low quantitative but high qualitative impact (e.g., privacy-related control failure with regulatory implications) may be material despite low monetary value.

### Evidence types

The practitioner gathers various evidence types:

**Documentary.** Policies, procedures, configurations, reports, logs.

**Observational.** Watching activities being performed.

**Testimonial.** Interview responses.

**Physical.** Direct examination (data centre tour, equipment inspection).

**Analytical.** Computed from data analysis.

**Confirmation.** External confirmation from third parties.

Quality of evidence varies — independent and documentary evidence generally stronger than testimonial.

### ISO 27001 in audit context

ISO 27001 functions both as:

**Auditable standard.** Organisations audited for compliance with ISO 27001 (certification audits, surveillance audits).

**Reference framework.** Organisations referenced ISO 27001 controls as criteria for assessing other organisations.

ISO 27001 certification audit process:

**Stage 1 audit.** Documentation review — does the organisation have required documentation?

**Stage 2 audit.** Implementation review — is the documented system actually implemented?

**Surveillance audits.** Annually between certifications.

**Recertification audits.** Every three years.

Audits conducted per ISO 19011 (auditing management systems) and ISO 17021 (requirements for certification bodies).

### NIST in audit context

NIST publications used as audit criteria:

**NIST CSF.** Risk-based framework; audits often assess against CSF outcomes.

**NIST SP 800-53.** Detailed control catalogue; audits may test against specific controls.

**NIST SP 800-37 (RMF).** Process framework; audits may assess RMF implementation.

**Other publications.** SP 800-171 for unclassified federal information, SP 800-66 for HIPAA, others.

For US federal context, NIST has specific authority; for other contexts, NIST is reference framework.

### CIS Controls in audit context

CIS Controls v8 provide:
- Detailed control specifications.
- Implementation Groups (IG1, IG2, IG3) for prioritisation.
- Specific safeguards within each control.

Audits frequently use CIS Controls as criteria; CIS-CAT and similar tools support automated assessment against CIS Benchmarks.

### Combining frameworks

Real audits often combine frameworks. A typical Nepali bank IS audit might:
- Apply ISACA ITAF as audit standard.
- Test against ISO 27001 (if certified) or its controls as criteria.
- Reference NRB IT directives for sectoral requirements.
- Reference CIS Benchmarks for specific technical configurations.
- Apply COBIT for governance maturity assessment.

The practitioner maps applicable requirements and tests against the most rigorous applicable.

## 1.3 Types of audits

### Audit type taxonomy

The practitioner encounters multiple audit types, each with specific characteristics.

### By auditor relationship

**Internal audit.** Conducted by employees of the audited organisation.

**External audit.** Conducted by independent firm.

**First-party audit.** Self-assessment.

**Second-party audit.** Customer auditing supplier.

**Third-party audit.** Independent certification body or similar.

### By purpose

**Compliance audit.** Verifying compliance with specific requirements (regulatory, contractual, policy).

**Operational audit.** Evaluating operational effectiveness and efficiency.

**Financial audit.** Financial statements (typically by chartered accountants; IS audit support for IT-dependent areas).

**Forensic audit.** Investigative; often related to suspected fraud or misconduct.

**Assurance engagement.** Broader category including audits.

**Consulting engagement.** Advisory rather than assurance.

### By scope

**Comprehensive audit.** Full coverage of defined scope.

**Limited-scope audit.** Specific areas only.

**Pre-implementation audit.** Before new system goes live.

**Post-implementation audit.** After implementation, evaluating outcomes.

**Continuous audit.** Ongoing automated assessment.

**Special-purpose audit.** Specific event-driven audits.

### IS audit specific types

**IS general controls audit.** Cross-application controls — IAM, change management, operations.

**IS application controls audit.** Specific application controls — input validation, processing, output.

**IS security audit.** Security posture evaluation.

**IS infrastructure audit.** Servers, network, storage.

**IS cloud audit.** Cloud-specific.

**Project management audit.** IT project governance.

**SDLC audit.** Development methodology and controls.

**BCP/DR audit.** Resilience.

**Third-party audit.** Vendor controls.

### SOC reports

System and Organisation Controls reports — important specific category:

**SOC 1.** Controls relevant to financial reporting.

**SOC 2.** Controls relevant to security, availability, processing integrity, confidentiality, privacy (Trust Service Criteria).

**SOC 3.** General-use version of SOC 2.

**Type 1 vs Type 2.** Type 1 covers design at point in time; Type 2 covers operating effectiveness over period.

SOC reports increasingly important for cloud providers and SaaS vendors. Nepali enterprises consuming cloud services frequently review provider SOC reports.

### Audit type selection

The choice depends on:

**Stakeholder needs.** Who needs assurance about what.

**Regulatory requirements.** What audits are required.

**Risk profile.** Where attention needed.

**Resource availability.** What can be afforded.

**Prior audit cycle.** Coverage and rotation.

**Specific concerns.** Triggered audits.

### Audit cycle

Mature organisations operate audit cycles covering all material areas over multiple years:

**Year 1.** Focus areas A, B, C.
**Year 2.** Focus areas D, E, F.
**Year 3.** Focus areas G, H, I (and Year 1 follow-up).
**Year 4.** Return to A, B, C with updates.

Risk-based adjustments to cycle as needed.

## 1.4 Risk-based audit planning

### Risk-based audit

*Risk-based audit planning is the approach to audit planning that allocates audit effort proportional to the risk associated with auditable areas, focusing audit resources where they will provide most value — preventing or detecting material issues — rather than treating all areas equally.*

The alternative — equal coverage — is inefficient. Risk-based is the modern standard.

### Risk assessment in audit context

The risk assessment specifically for audit planning differs from operational risk management:

**Operational risk.** What could go wrong; how to prevent.

**Audit risk.** What could go wrong that audit might miss; how to focus audit effort.

Audit risk has components:

**Inherent risk.** Risk before considering controls.

**Control risk.** Risk that controls fail to prevent/detect.

**Detection risk.** Risk that audit procedures fail to detect.

**Audit risk** = Inherent risk × Control risk × Detection risk

The practitioner cannot control inherent and control risk; they control detection risk through audit procedures.

### Annual audit plan

For internal audit functions:

**Universe identification.** All auditable areas.

**Risk scoring.** Each area scored.

**Resource estimation.** Hours/budget needed.

**Coverage decision.** Which areas to audit when.

**Plan documentation.** Formal annual plan.

**Audit Committee approval.** Plan formally approved.

**Periodic review.** Adjusted as conditions change.

### Engagement-level planning

For specific engagements:

**Scope definition.** What is in/out.

**Objectives.** What the audit will achieve.

**Criteria.** Standards/requirements applied.

**Methodology.** Approach to testing.

**Resources.** Team, time, tools.

**Schedule.** Timeline.

**Stakeholder identification.** Who is involved.

**Risk and materiality assessment.** Specific to engagement.

### Audit programme development

The audit programme is the detailed test plan:

**Control objectives.** What outcomes assessed.

**Specific tests.** Tests for each control.

**Sample sizes.** How much testing.

**Evidence required.** What constitutes sufficient evidence.

**Documentation requirements.** Working paper format.

**Quality review.** How work will be reviewed.

The programme provides structure; auditors follow it consistently while applying judgement for engagement-specific situations.

### Sampling

For populations too large to test completely:

**Statistical sampling.** Random selection enabling extrapolation.

**Judgmental sampling.** Auditor selects based on judgement.

**Stratified sampling.** Population divided into strata.

**Block sampling.** Selecting contiguous blocks.

**Computer-assisted audit techniques (CAATs).** Automated analysis of complete populations.

For modern IS audits with substantial data, CAATs increasingly replace traditional sampling — complete population analysis preferable when feasible.

### Computer-assisted audit techniques

**Generalised audit software.** ACL, IDEA — purpose-built for audit data analysis.

**General-purpose tools.** SQL, Python, R, Excel for data analysis.

**Specialised tools.** Network scanners, configuration assessment tools, log analysers.

**Continuous monitoring tools.** Real-time control assessment.

**Embedded audit modules.** Within applications.

The practitioner increasingly works with substantial data through CAATs rather than traditional sampling.

### Risk-based planning in Nepali bank context

A typical Nepali bank's annual IS audit plan:

**Universe areas (illustrative):**
- Core banking system.
- Internet banking.
- Mobile banking.
- Card management system.
- SWIFT/payments infrastructure.
- General ledger and reporting.
- Identity and access management.
- Network infrastructure.
- Cloud services.
- BCP/DR.
- IT operations.
- IT governance.
- Specific applications (treasury, loans, etc.).
- Third-party arrangements.

**Risk factors considered:**
- Financial transaction volume.
- Customer impact.
- Regulatory significance.
- Recent changes.
- Prior audit findings.
- External threats specific to area.
- Operational criticality.

**Plan output:**
- High-risk areas audited annually or more.
- Medium-risk areas biennially.
- Lower-risk areas every three years.
- Specific high-priority items.

The plan approved by Audit Committee; reviewed quarterly; adjusted as risks change.

### Audit Committee engagement

The Audit Committee (typically board-level) engages with audit planning:

- Reviews annual plan.
- Approves plan formally.
- Reviews execution progress.
- Receives reports.
- Provides direction on emerging concerns.
- Oversees follow-up.

For Nepali banks, NRB-required Audit Committee with specific terms of reference. For other organisations, governance structures vary.

### Risk assessment refresh

Risk assessments updated regularly:

**Annual.** Comprehensive refresh.

**Quarterly.** Material change consideration.

**Event-driven.** After major incidents, new regulations, organisational changes.

**Continuous.** Where automation supports.

The audit programme dynamic rather than static.

### The role of automation in risk-based planning

Modern audit functions use:

**GRC platforms.** Risk and control data.

**Continuous monitoring tools.** Real-time control assessment.

**Analytics platforms.** Pattern identification.

**AI/ML for risk identification.** Emerging — identifying risks human analysts might miss.

For Nepali context, automation adoption emerging at major institutions; smaller organisations still largely manual.

### From planning to execution

Effective planning enables effective execution. The next chapter takes up IT governance and risk management — both as topics audited and as frameworks within which audits operate, with the practitioner perspective on how governance and risk management are assessed in audit engagements.
