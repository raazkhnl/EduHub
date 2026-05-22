---
title: 'Chapter 3 — Professional Standards and Governance'
sidebar_label: 'Ch 03 — Professional Standards and Governance'
sidebar_position: 3
description: 'Chapter 3 of Information Systems Security Professionalism (INFOSEC-PRO).'
slug: /ioe/msncs/year-2-part-1/elective-iv/information-systems-security-professionalism/notes/ch03
tags: [msncs, INFOSEC-PRO, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Standards provide the structure through which the security profession applies its body of knowledge consistently. Governance frameworks organise how organisations direct, oversee, and demonstrate their information security activities. ISO 27001 is the dominant international standard for information security management systems; the NIST Cybersecurity Framework provides a complementary risk-based approach widely adopted globally. COBIT addresses broader IT governance with security as a substantial component, while CIS benchmarks provide technical-level configuration standards. Security governance models articulate the organisational structures and accountabilities that make security real. Compliance roles operationalise the standards; control objectives and performance evaluation close the loop. This chapter covers each, building on material from earlier subjects (particularly ENCTNS552 Information Systems Audit and ENCTNS571 Cloud Security) but with the professionalism focus on how the security professional engages with and uses these standards.

## 3.1 ISO 27001 and the NIST Cybersecurity Framework

### ISO 27001

*ISO/IEC 27001 is the international standard that specifies requirements for an Information Security Management System (ISMS) — the framework of policies, procedures, controls, and continuous improvement practices through which an organisation systematically manages information security risks — published jointly by the International Organisation for Standardisation and the International Electrotechnical Commission.*

The latest major revision is ISO/IEC 27001:2022, succeeding the 2013 version. The standard is certifiable through accredited auditors; certification provides external assurance of compliance.

### Structure of ISO 27001:2022

The standard organises requirements around an ISMS:

**Clause 4 — Context of the Organisation.** Understanding the organisation, interested parties, scope.

**Clause 5 — Leadership.** Top management commitment; policy; roles and authorities.

**Clause 6 — Planning.** Risk assessment and treatment; objectives.

**Clause 7 — Support.** Resources, competence, awareness, communication, documented information.

**Clause 8 — Operation.** Operational planning and control; risk treatment.

**Clause 9 — Performance Evaluation.** Monitoring, internal audit, management review.

**Clause 10 — Improvement.** Nonconformity, corrective action, continual improvement.

These clauses define the management system. The actual controls are catalogued in Annex A, which references ISO 27002.

### Annex A controls

ISO 27001:2022 Annex A contains 93 controls (revised from 114 in 2013), organised into four themes:

**A.5 — Organisational controls.** 37 controls covering policies, organisation of information security, supplier relationships, threats, security in projects.

**A.6 — People controls.** 8 controls covering background screening, terms and conditions, awareness, discipline, termination.

**A.7 — Physical controls.** 14 controls covering physical security, equipment.

**A.8 — Technological controls.** 34 controls covering identity, access, cryptography, operations, comms, acquisition/development/maintenance.

The 2022 update introduced 11 new controls reflecting modern realities (threat intelligence, cloud services, ICT readiness for business continuity, physical security monitoring, configuration management, information deletion, data masking, data leakage prevention, monitoring activities, web filtering, secure coding).

### NIST Cybersecurity Framework

*The NIST Cybersecurity Framework is a voluntary framework developed by the US National Institute of Standards and Technology that provides a flexible, risk-based approach for organisations to manage cybersecurity risk, organised around core functions, applicable across sectors and organisation sizes, complemented by tiers describing maturity and profiles describing target and current states.*

Originally released 2014 (CSF 1.0); CSF 2.0 released early 2024 with significant updates.

### CSF 2.0 structure

CSF 2.0 introduces six functions (CSF 1.0 had five):

**Govern (new in 2.0).** Establishing and monitoring the cybersecurity risk management strategy, expectations, and policy.

**Identify.** Understanding cybersecurity risk to systems, people, assets, data, and capabilities.

**Protect.** Implementing safeguards to ensure delivery of critical services.

**Detect.** Identifying occurrence of cybersecurity events.

**Respond.** Taking action regarding detected cybersecurity incidents.

**Recover.** Maintaining plans for resilience and restoring impaired capabilities.

Each function decomposes into categories and subcategories that provide more specific outcomes. The framework is outcome-focused rather than prescriptive about how outcomes are achieved.

### Comparison — ISO 27001 vs NIST CSF

| Aspect | ISO 27001 | NIST CSF |
|---|---|---|
| Type | Certifiable standard | Voluntary framework |
| Scope | ISMS requirements + Annex A controls | Cybersecurity outcomes |
| Geographic | International | US-origin, global adoption |
| Certification | Yes, through accredited auditors | No formal certification |
| Approach | Management system | Outcome-based |
| Flexibility | Requirements with discretion | Highly flexible |
| Detail | Specific control catalogue | Outcomes; controls separate |
| Risk basis | Risk-based throughout | Risk-based throughout |
| Maturity tiers | Implicit through management system | Explicit tiers |

The two complement rather than compete; many organisations use both — ISO 27001 for management system rigour, NIST CSF for risk-based prioritisation.

### Adopting ISO 27001

A typical ISO 27001 adoption path:

1. **Gap analysis.** Current state vs requirements.
2. **Scope definition.** What is in the ISMS.
3. **Risk assessment.** Identify risks.
4. **Risk treatment plan.** How risks will be addressed.
5. **Statement of Applicability.** Which Annex A controls apply.
6. **Policy development.** Information security policy.
7. **Control implementation.** Applying controls.
8. **Documentation.** Required documented information.
9. **Internal audit.** Verify implementation.
10. **Management review.** Top management evaluation.
11. **Certification audit.** External assessor evaluation.
12. **Stage 1 and Stage 2 audits.** External certification process.
13. **Surveillance audits.** Annual.
14. **Recertification.** Every 3 years.

Implementation typically takes 12-24 months for first certification.

### Adopting NIST CSF

A typical NIST CSF adoption path:

1. **Prioritise and scope.** Business objectives, risk tolerance.
2. **Orient.** Identify systems, assets, regulatory requirements.
3. **Create current profile.** Current implementation of CSF outcomes.
4. **Risk assessment.** Identify risks.
5. **Create target profile.** Desired implementation.
6. **Determine, analyse, and prioritise gaps.** Current vs target.
7. **Implement action plan.** Address gaps.
8. **Repeat.** Continuous improvement.

The approach is iterative rather than fixed timeline.

### Nepali adoption

In Nepal:

**ISO 27001 certification.**
- Required or strongly encouraged for NRB-regulated banks.
- Growing adoption among major enterprises and IT firms.
- Approximately 50-100 ISO 27001 certificates issued in Nepal (estimate).
- Local audit firms partnering with international accredited bodies.

**NIST CSF adoption.**
- Reference framework increasingly used.
- No formal certification.
- Used for risk-based planning.

**Combined approach.**
- Major banks typically use ISO 27001 as management system framework and reference NIST CSF for risk management.

For MSc graduates working in security, both ISO 27001 and NIST CSF should be deeply familiar.

## 3.2 COBIT and CIS benchmarks

### COBIT

*COBIT (Control Objectives for Information and Related Technologies) is a comprehensive framework for the governance and management of enterprise information and technology, developed and maintained by ISACA, providing a structured approach to align IT with business objectives while managing risks and ensuring compliance.*

COBIT covers broader IT governance, with security as one substantial component. Current version: COBIT 2019, with continued evolution.

Discussed in detail in ENCTNS552 Chapter 4. Key points for the professional:

### COBIT 2019 structure

**Governance system components:**
- Processes (covering governance and management objectives).
- Organisational structures.
- Information flows.
- People, skills, competencies.
- Culture, ethics, behaviour.
- Services, infrastructure, applications.
- Principles, policies, procedures.

**Governance and management objectives:** 40 in COBIT 2019, organised into:
- **Evaluate, Direct, and Monitor (EDM).** 5 objectives for governance.
- **Align, Plan, and Organise (APO).** 14 objectives.
- **Build, Acquire, and Implement (BAI).** 11 objectives.
- **Deliver, Service, and Support (DSS).** 6 objectives.
- **Monitor, Evaluate, and Assess (MEA).** 4 objectives.

**Design factors.** Enterprise strategy, goals, risk profile, threat landscape, compliance requirements, IT role, sourcing model, IT methods, technology adoption, enterprise size — all influence appropriate implementation.

### COBIT for security professionals

Security professionals engage with COBIT particularly through:

- **APO13 Managed Security.** The core security objective.
- **DSS05 Managed Security Services.** Operational security services.
- **EDM03 Ensured Risk Optimisation.** Risk governance.
- **APO12 Managed Risk.** Risk management.
- **MEA03 Managed Compliance With External Requirements.** Compliance.

Other objectives have security relevance throughout.

### COBIT vs ISO 27001 vs NIST CSF

A simplified comparison:

| Aspect | COBIT 2019 | ISO 27001 | NIST CSF |
|---|---|---|---|
| Scope | All of IT | Information security | Cybersecurity |
| Primary purpose | IT governance | ISMS requirements | Risk-based outcomes |
| Audience | IT and business leaders | Security professionals | Security professionals |
| Detail level | Process and management | Management + controls | Outcomes |
| Certification | No (but assessments) | Yes | No |

Many organisations use multiple frameworks together — COBIT for IT governance, ISO 27001 for security management system, NIST CSF for risk-based outcomes. The frameworks complement rather than conflict.

### CIS Controls and Benchmarks

*The CIS Controls are a prioritised set of cybersecurity actions developed and maintained by the Center for Internet Security, organised in implementation groups to help organisations of any size prioritise their security efforts, complemented by CIS Benchmarks providing detailed configuration standards for specific technologies.*

CIS Controls (currently version 8) provide 18 control categories organised in three implementation groups (IG1, IG2, IG3) reflecting organisation size and risk profile.

**The 18 CIS Controls (v8):**
1. Inventory and control of enterprise assets.
2. Inventory and control of software assets.
3. Data protection.
4. Secure configuration of enterprise assets and software.
5. Account management.
6. Access control management.
7. Continuous vulnerability management.
8. Audit log management.
9. Email and web browser protections.
10. Malware defences.
11. Data recovery.
12. Network infrastructure management.
13. Network monitoring and defence.
14. Security awareness and skills training.
15. Service provider management.
16. Application software security.
17. Incident response management.
18. Penetration testing.

The controls are detailed in specific safeguards. Practical and actionable.

### CIS Benchmarks

*CIS Benchmarks are detailed configuration guidelines for specific operating systems, software, cloud platforms, and other technologies, providing consensus-based hardening recommendations that organisations can use to secure deployments, available freely for individual use with paid options for automated assessment.*

CIS Benchmarks cover:
- **Operating systems.** Windows, Linux distributions, macOS, mobile.
- **Server software.** Web servers, databases, applications.
- **Cloud platforms.** AWS, Azure, GCP, Oracle Cloud, IBM Cloud, Alibaba Cloud.
- **Containers and Kubernetes.**
- **Mobile devices.**
- **Network devices.**
- **Browsers.**
- **Office software.**

For each, specific configuration recommendations with level 1 (essential) and level 2 (stricter) profiles.

### Tools for CIS Benchmark assessment

**CIS-CAT Pro.** Automated benchmark assessment (paid).

**OpenSCAP.** Open-source SCAP scanning supporting many benchmarks.

**Various commercial tools.** Most vulnerability scanners and configuration management tools support CIS benchmarks.

For Nepali enterprise security, CIS benchmarks are commonly referenced configuration standards. The MSc graduate working in security implementation will frequently consult them.

## 3.3 Security governance models

### Governance models

*A security governance model is the organisational structure, decision-making framework, accountability assignment, and oversight mechanism through which an organisation directs and controls its information security function, ensuring security activities align with business needs, manage risks appropriately, and remain accountable to stakeholders.*

Different models suit different organisations. Common patterns:

### Centralised model

Single security organisation with authority across the enterprise:

**Advantages:**
- Consistent policies and standards.
- Economies of scale.
- Clear accountability.
- Efficient resource allocation.
- Career path within security function.

**Disadvantages:**
- Distance from business units.
- Potential for bureaucracy.
- May miss business-specific context.
- Single point of failure.

Common in smaller-to-medium enterprises and some larger.

### Decentralised model

Each business unit has its own security capability:

**Advantages:**
- Close to business needs.
- Adaptable to unit-specific requirements.
- Faster decision-making for unit issues.

**Disadvantages:**
- Inconsistency across units.
- Duplication.
- Difficult to maintain enterprise view.
- Talent challenges (smaller teams).

Less common; sometimes results from historical organisation rather than deliberate design.

### Federated model

Combination — central function with local presence in business units:

**Advantages:**
- Combines benefits of both.
- Enterprise standards with local execution.
- Career mobility.
- Knowledge sharing.

**Disadvantages:**
- Coordination complexity.
- Potential authority conflicts.
- Resource arguments.

Common pattern for larger enterprises. Often takes form: CISO function centrally with security partners or champions in business units.

### Hybrid models

Reality is often hybrid:
- Strategic security centralised.
- Tactical security closer to operations.
- Specific specialised functions (forensics, threat intel) centralised.
- Common operational security (monitoring, awareness) hybrid.

### Reporting relationships

To whom does the CISO report?

**CIO.** Common pattern. Aligns with broader IT. Risk: security viewed as IT subordinate.

**COO.** Recognises security as operational function. Decoupled from IT.

**CFO.** Sometimes through risk-management chain.

**CRO (Chief Risk Officer).** Aligns with broader risk management.

**General Counsel.** Through legal/compliance.

**CEO.** Recognises security as top-level concern. Less common but increasing.

**Board.** Direct board reporting in some highly-regulated industries.

Reporting structure affects security's authority, perceived importance, and effectiveness.

### Board engagement

Modern security governance requires board engagement:

**Board responsibilities:**
- Setting risk appetite.
- Approving security strategy.
- Reviewing security performance.
- Engaging in major incident response.
- Ensuring resources.
- Compliance accountability.

**CISO board reporting:**
- Regular updates (quarterly typical).
- Risk reports.
- Compliance status.
- Major incidents.
- Strategic initiatives.

For Nepali bank context, NRB IT directives require board-level engagement with IT and information security. Board IT/risk committees are typical.

### Committees and forums

Beyond reporting lines, governance involves committees:

**Information Security Steering Committee.** Cross-functional oversight.

**Risk Committee.** Broader risk oversight including security.

**Architecture Review Board.** Technology decisions.

**Change Advisory Board.** Significant changes.

**Incident Response Team.** During incidents.

**Vendor Risk Committee.** Third-party oversight.

Effective committees: appropriate membership, clear charter, productive meetings, documented decisions, follow-through.

### Policies, standards, procedures, guidelines

Governance is operationalised through documentation:

**Policy.** What — high-level statement of intent. Approved by senior management.

**Standard.** What specifically — measurable requirements. Approved by appropriate authority.

**Procedure.** How — step-by-step instructions. Operational.

**Guideline.** How recommended — advisory.

Mature governance maintains all four in coherent hierarchy.

### Nepali governance landscape

Governance models in Nepali enterprises:

**Banks.** NRB-mandated governance structure including IT/security board committee, designated CISO, documented policies. Substantial governance discipline at major banks.

**Telecoms.** NTA-influenced governance; varies by institution.

**Government.** Hierarchical structure; emerging formal IT governance.

**Enterprises.** Variable; mature larger enterprises have governance; smaller often informal.

For MSc graduates, understanding the governance model of the employer organisation matters — it shapes how security professionals operate, what authority they have, and how decisions get made.

## 3.4 Compliance roles and responsibilities

### Compliance discipline

*Compliance is the discipline of ensuring that an organisation operates in accordance with applicable laws, regulations, contractual obligations, internal policies, and accepted standards, encompassing the identification of obligations, design of controls to meet them, monitoring of compliance status, and remediation of deficiencies.*

Compliance is broader than security — covering legal, financial, environmental, and operational obligations — but security compliance is a substantial component.

### Compliance roles

**Chief Compliance Officer (CCO).** Executive responsible for compliance. May be combined with other roles in smaller organisations.

**Compliance officers.** Specialised compliance roles for specific obligations.

**IS/IT compliance officers.** Specifically focused on information systems compliance.

**Privacy officer / DPO.** Privacy-specific compliance.

**Security compliance analysts.** Security-specific compliance.

**Internal auditors.** Independent assessment of compliance.

**Risk and compliance specialists.** Combined GRC roles.

### Compliance activities

**Obligation identification.** What rules apply.

**Requirement mapping.** Specific requirements within each rule.

**Control identification.** Existing or needed controls.

**Gap analysis.** Where controls fall short.

**Implementation.** Building/operating controls.

**Monitoring.** Ongoing compliance status.

**Reporting.** To management, regulators, others.

**Audit support.** Internal and external audits.

**Issue management.** Identified non-compliance.

**Training.** Staff awareness.

**Documentation.** Evidence of compliance.

### Compliance professional skills

The security compliance professional needs:
- Understanding of applicable frameworks and regulations.
- Audit experience (sometimes IS audit certification — CISA).
- Communication skills (technical and non-technical).
- Project management.
- Attention to detail.
- Documentation discipline.
- Negotiation skills.
- Independent judgement.
- Diplomacy under pressure.

### Compliance challenges

**Multiple overlapping requirements.** Same control may serve multiple compliance needs.

**Conflicting requirements.** Different rules may conflict.

**Evolving requirements.** Continuous change.

**Resource constraints.** Compliance work often under-resourced relative to scope.

**Tension with operations.** Compliance perceived as obstacle to operations.

**Audit fatigue.** Many audits of same control areas.

**Documentation burden.** Substantial documentation requirements.

**Cross-jurisdictional complexity.** Operating across legal frameworks.

### GRC platforms

Governance, Risk, and Compliance platforms manage compliance work:

**Major platforms:**
- Archer (RSA).
- ServiceNow GRC.
- LogicGate.
- MetricStream.
- OneTrust.
- Hyperproof.
- Drata (newer; SaaS-focused).
- Vanta (newer; SaaS-focused).
- AuditBoard.

Platforms provide:
- Control catalogue.
- Evidence collection.
- Audit workflow.
- Reporting.
- Issue tracking.
- Risk assessment.

For Nepali enterprises, GRC platform adoption is emerging — major banks and IT firms beginning to deploy; broader market less established.

### Compliance and security relationship

Compliance and security are related but distinct:

**Compliance** measures adherence to specific requirements.

**Security** addresses actual protection of systems and data.

Compliance often drives security — controls implemented because compliance requires them. But compliance ≠ security:
- Compliant organisations can still be breached.
- Some security needs aren't addressed by compliance requirements.
- Compliance can become checklist exercise.

Mature programmes treat compliance as outcome of security rather than substitute for it.

## 3.5 Control objectives and performance evaluation

### Control objectives

*A control objective is a desired state or outcome that a control or set of controls is designed to achieve — typically expressed in terms of preventing, detecting, or correcting specific risks — providing the basis for designing controls, assessing their adequacy, and measuring their effectiveness.*

Control objectives precede controls. The objective defines what is needed; the control implements means to achieve.

### Examples of control objectives

For information security:

- **Access management.** Ensure access to information and systems is restricted to authorised individuals.
- **Change management.** Ensure changes are authorised, tested, and documented.
- **Incident response.** Ensure security incidents are detected, contained, and resolved.
- **Backup and recovery.** Ensure data can be restored after loss.
- **Cryptography.** Ensure sensitive data is appropriately protected.
- **Network security.** Ensure networks are protected against unauthorised access.

Each objective has multiple possible controls.

### COBIT 2019 control objectives

COBIT 2019's 40 governance and management objectives function as control objectives at strategic level. Each objective contains:
- Description.
- Purpose.
- Specific practices.
- Activities.
- Performance indicators.
- Related guidance.

This structure provides comprehensive coverage.

### ISO 27001 Annex A as control objectives

ISO 27001 Annex A controls function as control objectives. The Statement of Applicability documents which apply, why, and how implemented.

### Control performance evaluation

*Control performance evaluation is the systematic assessment of whether controls are designed appropriately, operating as intended, and effectively achieving control objectives — through testing, monitoring, metrics, and review — providing the basis for assurance, improvement, and reporting.*

The assessment dimensions:

**Design effectiveness.** Is the control designed to achieve its objective?

**Operating effectiveness.** Is the control actually operating?

**Achievement of objective.** Is the objective being achieved?

### Assessment methods

**Inquiry.** Asking control owners.

**Observation.** Watching the control in operation.

**Inspection.** Examining documentation, configurations.

**Re-performance.** Repeating the control activity.

**Analytical procedures.** Computational/analytical assessment.

**Automated testing.** Continuous monitoring tools.

ISACA's CISA review materials and audit standards detail these methods.

### Key performance indicators

KPIs for security functions:

**Operational KPIs.**
- Mean time to detect (MTTD).
- Mean time to respond (MTTR).
- Alert volume.
- False positive rate.
- Vulnerabilities open by age.
- Patching coverage.
- Backup success rate.

**Compliance KPIs.**
- Control effectiveness rating.
- Audit findings.
- Findings remediation status.
- Training completion rates.
- Policy exception count.

**Strategic KPIs.**
- Risk register status.
- Risk reduction over time.
- Major incident frequency.
- Customer security feedback.
- Regulatory compliance status.

### Reporting

Performance information feeds reporting:

**Operational reports.** To security management.

**Executive reports.** To CISO, CIO, executive leadership.

**Board reports.** To board or board committees.

**Regulatory reports.** To regulators where required.

**Compliance reports.** Audit and assurance.

Each audience needs information at appropriate level of detail. Senior audiences need brief, focused, action-oriented content; operational audiences need detail.

### Continuous improvement

Performance evaluation feeds continuous improvement:

```
Plan → Implement → Measure → Evaluate → Improve → Plan
```

The cycle is ongoing. Each iteration should improve on previous.

### Maturity models

Maturity models assess overall capability:

**CMMI (Capability Maturity Model Integration).** Generic capability model.

**NIST CSF Tiers.** Four tiers: Partial, Risk Informed, Repeatable, Adaptive.

**ISACA Capability Maturity Model.** Within COBIT framework.

**FAIR Maturity Model.** Risk quantification-focused.

Maturity assessment supports improvement planning — current maturity → target maturity → roadmap.

### Performance evaluation in Nepali enterprises

For Nepali enterprises:

**Banks.** Mature performance measurement; NRB-required reporting.

**Major enterprises.** Building capability.

**Smaller organisations.** Often informal or absent.

**Government.** Limited formal measurement; emerging.

For MSc graduates, performance measurement is increasingly a focus — both as practitioners contributing to programmes and as future leaders accountable for outcomes. Skills in defining meaningful metrics, gathering data systematically, analysing trends, and communicating findings effectively are professionally valuable throughout a security career.

The standards covered in this chapter — ISO 27001, NIST CSF, COBIT, CIS — provide the professional foundation. The governance models structure how organisations operate them. The compliance discipline operationalises them. Performance evaluation closes the loop. Together they constitute the formal framework within which security professionals practice.

The next chapter takes up the related discipline of risk management — the foundation on which much of security governance rests — and the compliance audit practices that verify governance is working.
