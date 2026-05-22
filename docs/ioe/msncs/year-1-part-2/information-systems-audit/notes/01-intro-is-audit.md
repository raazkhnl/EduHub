---
title: 'Chapter 1 — Introduction to Information Systems Audit'
sidebar_label: 'Ch 01 — Introduction to Information Systems Audit'
sidebar_position: 1
description: 'Chapter 1 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch01
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Information systems run modern organisations. Banking, telecommunications, government services, retail, healthcare — every sector depends on computer systems that store data, process transactions, and connect people. When something goes wrong with those systems — a breach, a fraud, a regulatory violation, a system failure — the cost is borne by the organisation, its customers, and sometimes the public. Information systems audit is the discipline that examines whether these systems are working as they should: securely, reliably, in compliance with regulation, and aligned with business objectives. This chapter introduces the discipline. It defines what an information systems audit is, who an information systems auditor is, what legal requirements drive the audit, what the audit covers, and the major standards and frameworks that shape the work. The chapter is the foundation; every later chapter rests on the concepts and frameworks introduced here.

## 1.1 Information systems audit and information systems auditor

### Information systems audit

*An information systems audit is the systematic examination of an organisation's information technology infrastructure, applications, data, processes, and controls to evaluate whether they safeguard assets, maintain data integrity, support business objectives, and comply with applicable laws, regulations, and policies, conducted by qualified independent professionals to provide reasonable assurance to management, regulators, and other stakeholders.*

The word **audit** carries a specific weight. It is more than review or inspection. An audit is a structured examination by an independent party, producing a documented opinion that others can rely on. The discipline traces its lineage to financial auditing — the practice of independent accountants examining financial statements — extended into the information-systems domain as organisations became digital.

Several elements are essential:
- **Systematic.** Following established procedures, not opinion.
- **Examination.** Collecting and evaluating evidence.
- **Independent.** Conducted by someone who has no direct stake in the outcome.
- **Documented.** Producing a written record and report.
- **Producing an opinion.** The audit ends with a conclusion the auditor will defend.

### Information systems auditor

*An information systems auditor is a qualified professional who conducts information systems audits, applying knowledge of information technology, audit methodologies, risk management, and applicable regulations to evaluate controls and produce reports that inform management and regulators about the state of the organisation's information systems.*

The IS auditor is typically:
- Trained in both IT and audit methodology.
- Certified by a recognised body (CISA — Certified Information Systems Auditor — from ISACA is the dominant credential globally).
- Bound by professional ethics (independence, objectivity, due professional care).
- Working within a legal and regulatory framework that defines scope and responsibilities.

The role differs from a system administrator, a security engineer, or an incident responder. Where the administrator runs systems and the engineer secures them, the auditor evaluates whether the running and securing meet established criteria. The auditor does not fix problems; the auditor identifies and reports them.

### Knowledge and task statements

ISACA's CISA framework organises the IS auditor's responsibilities into five domains:

1. **Information systems auditing process.** Planning, executing, reporting.
2. **Governance and management of IT.** Strategy, frameworks, organisational structure.
3. **Information systems acquisition, development and implementation.** Project management, requirements, testing, deployment.
4. **Information systems operations and business resilience.** Operations management, business continuity, disaster recovery.
5. **Protection of information assets.** Security controls, data privacy, identity management.

Each domain has detailed task statements specifying what the auditor must be able to do — review project management practices, evaluate disaster recovery plans, assess access controls, evaluate change-management procedures, examine system development life cycles. The CISA Review Manual (28th edition, 2023, used as syllabus reference) elaborates each domain in detail.

For an MSc graduate at IOE Pulchowk pursuing this career, the typical path: build IT skills during the degree; complete a few years of relevant experience; sit the CISA examination; obtain the credential; gradually take on more-senior audit work.

### Internal vs external auditor

**Internal IS auditor.** Employed by the organisation; reports to senior management (often the audit committee of the board for independence). Provides ongoing assurance about the organisation's controls.

**External IS auditor.** Engaged by the organisation (or by its regulator) on a contract basis. Provides independent opinion to outside stakeholders — shareholders, regulators, customers.

In Nepal:
- Commercial banks have internal IT audit functions, typically reporting to the Audit Committee of the board.
- External IT audit is performed periodically — annually for many regulated entities — by external audit firms or specialised IS audit consultancies. The Big Four (KPMG, PwC, EY, Deloitte) operate in Kathmandu and offer IS audit services. National firms (T R Upadhya & Co., S A R & Associates, P L Shrestha & Co., others) also provide IS audit services.
- Specialist IT audit consultancies (Daffodil Cybersecurity, Pentester Nepal, and others) serve banks and large enterprises.
- The Office of the Auditor General (OAG) of Nepal audits government entities, including their IT systems.

### Independence and objectivity

The auditor's value rests on independence and objectivity. An auditor who has a financial interest in the audited entity, who is a relative of management, who has previously consulted on the same systems being audited — cannot give an objective opinion. ISACA's Code of Professional Ethics binds CISA holders to these principles; the IIA (Institute of Internal Auditors) Standards bind internal auditors similarly.

In practical terms:
- The internal IT audit function reports to the audit committee (board level), not to the CIO whose systems they audit.
- External auditors rotate engagement leads to prevent over-familiarity.
- Conflicts of interest are disclosed and managed.
- Auditors do not audit work they themselves designed or implemented.

## 1.2 Legal requirements of an information systems audit

### Sources of legal requirement

The requirement for IS audit comes from several legal sources, varying by jurisdiction and sector.

**Companies law.** Companies of certain size or type are typically required to have financial audits. Where information systems are material to financial reporting (as they are in essentially every modern company), the auditor must evaluate IT general controls (ITGC) and application controls. Nepal's Companies Act 2063 (2006) establishes financial-audit requirements; ICAN (Institute of Chartered Accountants of Nepal) standards include guidance on auditing in computer-based environments.

**Banking law and regulation.** Central banks regulate the technology used by banks. **Nepal Rastra Bank** has issued specific IT-related directives binding all commercial banks, development banks, and finance companies. These include requirements for:
- IT governance and risk management.
- Internal IT audit function.
- Annual external IT audit.
- Information security policies.
- Business continuity and disaster recovery.
- Customer-data protection.
- Reporting of major incidents.

**Telecom regulation.** Nepal Telecommunications Authority (NTA) issues directives for telecom operators and ISPs including security and audit-related requirements.

**Capital markets regulation.** SEBON (Securities Board of Nepal) regulates listed companies, including IT-related requirements for capital-market intermediaries.

**Insurance regulation.** The insurance regulator (now part of the Nepal Insurance Authority following 2022-23 restructuring) issues IT-related requirements for insurers.

**Income tax and VAT.** The Inland Revenue Department requires that taxpayers maintain accounting records (digital or otherwise) in audit-ready form. Where the records are in IT systems, the system's reliability is part of what supports compliance.

**Sectoral regulators across other domains.** Health, education, energy, civil aviation, transport — each has its own regulatory body with sector-specific requirements.

**Privacy law.** Nepal's Privacy Act 2075 (2018) and constitutional Article 28 create personal-data protection requirements. Organisations handling personal data must implement safeguards; demonstrating these often involves audit-style examination.

**Cybercrime and electronic-transaction law.** The Electronic Transactions Act 2063 (2008) recognises electronic records and signatures; criminalises specific cyber offences. Aspects of compliance are auditable.

### NRB IT directives — the dominant regulatory frame for banking IT audit

For Nepali banks, NRB's directives are the central source of IT audit requirements. The directives (issued and revised periodically) cover:

- **Governance.** Board-level IT governance committee. CIO/CITO role.
- **Risk management.** IT risk assessment process; risk register; risk treatment.
- **Information security.** Information security policy; security organisation; access control; cryptographic standards.
- **Operations.** Change management; backup and recovery; capacity management; monitoring.
- **Acquisition and development.** SDLC standards; vendor management; testing.
- **Incident management.** Reporting to NRB within prescribed timelines.
- **Business continuity.** BCP and DRP requirements; testing.
- **Outsourcing.** Cloud and third-party service requirements.
- **Audit.** Internal IT audit function; external IT audit annually; reporting to NRB.

Banks that fail to comply face supervisory action — formal warnings, penalties, and in extreme cases restriction of operations. The 2017 NIC Asia SWIFT incident, the 2020 breaches at multiple banks, and the 2024-25 sector-wide cyber-incident environment have pushed NRB to tighten and clarify requirements.

### Audit obligations and audit scope under law

When the law requires an IS audit, it typically specifies:

- **Frequency.** Annual is standard; some specific reviews may be required after major incidents.
- **Scope.** What systems and processes must be audited.
- **Auditor qualifications.** Often "qualified" or "approved" auditors — in Nepal, ICAN-registered firms; ISACA-certified individuals; or firms on the regulator's approved list.
- **Reporting.** What must be reported to the regulator; in what format; in what timeline.
- **Action on findings.** What the audited entity must do with audit findings; what the regulator can do if findings are unaddressed.

For an MSc graduate considering an audit career in Nepal, the regulated sectors (banking, telecom, capital markets, insurance) are the largest market for IS audit services.

## 1.3 Systems environment and information systems audit

### The systems environment

An IS audit happens in the context of a complex, layered IT environment. The auditor must understand the environment to plan and conduct the audit effectively.

**Hardware layer.** Servers, storage, network devices, end-user devices, peripherals. Discussed in Chapter 2.

**Operating systems and platforms.** Windows Server, Linux distributions, virtualisation platforms (VMware, Hyper-V), container platforms (Kubernetes), cloud platforms (AWS, Azure, GCP).

**Middleware.** Application servers, web servers, message queues, integration platforms.

**Databases.** Oracle, SQL Server, PostgreSQL, MySQL, MongoDB, and many specialised systems.

**Applications.** Core banking, ERP, CRM, accounting, payroll, custom-developed line-of-business systems. For Nepali banks, the core banking systems are typically Finacle (Infosys), T24 (Temenos), or Pumori (a Nepal-origin core banking platform used by some development banks and cooperatives).

**Data layer.** Customer data, transactional data, master data, analytics, archives.

**Network layer.** LAN, WAN, internet connectivity, VPNs, wireless, IoT.

**Security layer.** Firewalls, IDS/IPS, EDR, DLP, SIEM, identity-management systems.

**Cloud and managed services.** Increasingly part of the picture for most organisations.

**Outsourced and third-party services.** Payment processors, cloud providers, managed service providers, software-as-a-service platforms.

**People and processes.** Users, administrators, vendors, third-party operators, with their training, procedures, and roles.

### How the environment shapes the audit

The audit approach must match the environment. Several considerations:

**Size and complexity.** A small finance company with a 10-employee IT department needs a different audit approach than a major commercial bank with hundreds of IT staff, dozens of applications, and complex outsourcing arrangements.

**Risk profile.** A bank handling customer deposits has higher risk than a software company without consumer-facing operations.

**Regulatory exposure.** Highly regulated organisations have prescriptive audit scope; less regulated organisations have more discretion.

**Technology age and heterogeneity.** Mixed environments with legacy systems, modern cloud services, and home-grown software present different audit questions than a uniform stack.

**Geographic and jurisdictional spread.** Multi-country operations introduce cross-border data and regulatory issues.

**Outsourcing.** Outsourced functions are still the organisation's responsibility from a control perspective; the audit must examine the third party's controls or rely on SOC 2 reports.

### The audit universe

*The audit universe is the comprehensive inventory of all auditable entities, processes, and systems within an organisation, used by the audit function to plan multi-year coverage so that every significant area is audited on an appropriate cycle.*

For an organisation with hundreds of applications and processes, no single audit can examine everything. The audit universe lists everything that could be audited, with each item classified by risk. The audit plan (often three years) covers the universe with priority on highest-risk items, rotating through lower-risk items on longer cycles.

A typical Nepali commercial bank's audit universe might include 50-150 items: core banking, internet banking, mobile banking, card management, treasury system, payment switches, ATM network, customer-facing portals, internal applications (HR, payroll, procurement), IT infrastructure (data centre, network, security operations), processes (change management, incident management, access management, vendor management), and compliance with each major directive.

## 1.4 Information systems assets and classification of controls

### Information systems assets

*Information systems assets are the resources that the organisation depends on for its IT operations — hardware, software, data, personnel, documentation, services, and the processes that bind them together — each of which has value and faces threats that the controls aim to manage.*

A practical classification:

**Tangible assets.**
- Hardware (servers, networks, end-user devices, peripherals).
- Storage media (disks, tapes, removable media).
- Physical facilities (data centres, server rooms, communication closets).
- Documentation in physical form.

**Intangible assets.**
- Data (customer, financial, operational, intellectual property).
- Software (applications, operating systems, configurations).
- Identities and credentials.
- Brand and reputation.
- Trust relationships with customers and partners.

**Service assets.**
- Outsourced services.
- Cloud services.
- Telecommunication services.
- Power, cooling, environmental services.

**People and skill assets.**
- Employees with specialised IT skills.
- Vendor relationships.
- Knowledge embedded in processes.

The audit's central concern is the **protection of these assets** through controls.

### Classification of controls

Controls are organised along several dimensions, each useful for different purposes.

**By purpose:**

- **Preventive controls.** Block undesired events before they happen. Examples: input validation, access control, encryption.
- **Detective controls.** Identify undesired events after they occur. Examples: log monitoring, intrusion detection, reconciliation procedures.
- **Corrective controls.** Restore normal operation after an undesired event. Examples: backup restoration, incident response, business continuity.
- **Deterrent controls.** Discourage undesired actions through awareness. Examples: security awareness training, warning banners on systems, visible monitoring.
- **Compensating controls.** Alternative controls used when primary controls are infeasible. Examples: enhanced logging when separation-of-duties is impractical due to small staff.

**By nature:**

- **Administrative (managerial) controls.** Policies, procedures, standards, awareness, training.
- **Technical (logical) controls.** Software and hardware mechanisms — firewalls, access control lists, encryption, intrusion detection.
- **Physical controls.** Locks, badges, biometric access, surveillance, environmental safeguards.

**By scope:**

- **General controls (ITGC — IT General Controls).** Apply across the IT environment. Examples: change management, access management, backup procedures, security operations.
- **Application controls.** Specific to a particular application. Examples: input validation in a payment system, transaction limits in core banking.

**By implementation:**

- **Manual controls.** Performed by people. Example: a supervisor's review and approval of journal entries.
- **Automated controls.** Performed by systems without human intervention. Example: a system rule that rejects negative deposit amounts.
- **Semi-automated.** Mix of manual and automated. Example: a system flags exceptions for human review.

### A typical control example

A bank wants to ensure that only authorised employees can approve loan disbursements above NPR 10 million. The control fabric might include:

| Control | Type |
|---|---|
| Policy stating approval-limit rules | Administrative |
| Role-based access in the core banking system | Technical, automated, preventive |
| Daily report of high-value disbursements reviewed by an officer | Technical + manual, detective |
| Quarterly audit of access rights | Administrative, detective |
| Encryption of customer data in transit and at rest | Technical, automated, preventive |
| CCTV in the loan-approval area | Physical, detective |
| Annual security awareness training | Administrative, deterrent |

The audit examines whether these controls exist, whether they are designed correctly, and whether they operate effectively.

### Control objectives and CIA triad

Controls aim to preserve the three traditional information-security properties (introduced in the Cryptography subject):

- **Confidentiality.** Information is accessible only to those authorised.
- **Integrity.** Information is accurate, complete, and not improperly modified.
- **Availability.** Information and services are accessible when needed.

Newer formulations add:

- **Authenticity.** Information is genuine; sources are who they claim to be.
- **Non-repudiation.** Actions are attributable; the actor cannot credibly deny having taken them.
- **Accountability.** Actions are traceable to specific actors.

Together — sometimes called the **CIANA** properties — these form the foundation of control objectives.

## 1.5 Information systems audit coverage

### What an IS audit covers

The audit's coverage depends on its objectives, but a comprehensive IS audit examines several broad areas.

**IT governance.**
- Alignment of IT strategy with business strategy.
- Board and management oversight.
- IT organisation structure.
- Roles and responsibilities.
- Performance measurement.
- IT policy framework.

**IT general controls.**
- Access management.
- Change management.
- Backup and recovery.
- Operations management.
- Security operations.
- Vendor management.

**Application controls.**
- Input controls.
- Processing controls.
- Output controls.
- Master file maintenance.
- Reconciliation.

**Specific risk areas.**
- Cybersecurity.
- Privacy and data protection.
- Business continuity and disaster recovery.
- Third-party and cloud services.
- IT project management.
- Emerging technologies.

**Compliance.**
- With applicable laws and regulations.
- With internal policies.
- With contractual obligations.

### Types of IS audit engagements

Different engagements emphasise different aspects:

**General IT audit.** Broad coverage; typical annual external audit.

**Application audit.** Focused on a specific application — its controls, security, accuracy, reliability. Common for new or recently-changed core systems.

**Security audit.** Focused on information security controls.

**Compliance audit.** Focused on compliance with a specific regulation or standard (NRB directives, ISO 27001, PCI-DSS).

**SOC reports.** Service Organization Control reports from outsourced providers. SOC 1 covers financial-reporting-relevant controls; SOC 2 covers security, availability, processing integrity, confidentiality, privacy.

**Cybersecurity maturity assessment.** Evaluation of cybersecurity capability against a maturity model (NIST CSF, C2M2, ISACA's CMMI for Cyber).

**IT due diligence audit.** During mergers, acquisitions, vendor evaluation.

**Forensic IS audit.** After an incident, suspected fraud, or other concern — overlapping with the digital forensics covered in this programme's separate subject.

**Pre-implementation review.** Audit of a system before it goes live.

**Post-implementation review.** Audit after a project completion to evaluate whether objectives were met.

**Penetration test.** Technical security testing; covered in Chapter 6.

### Engagement structure

A formal audit engagement typically has phases:

1. **Engagement planning.** Define scope, objectives, methodology, team, timeline, budget.
2. **Risk assessment.** Identify risk areas; prioritise.
3. **Audit programme development.** Detailed procedures for each area.
4. **Fieldwork.** Evidence collection.
5. **Evidence evaluation.** Test results against criteria.
6. **Reporting.** Draft findings; management discussion; final report.
7. **Follow-up.** Verify that management's remediation actions have been completed.

Chapter 4 covers each of these phases in detail.

## 1.6 IT audit standards, guidelines, and regulatory requirements

### Why standards matter

Standards make audit work consistent, comparable, and defensible. An audit performed against ISO 27001 in Kathmandu produces a result that an auditor in Singapore or London can interpret. Standards encode professional consensus on what good practice looks like.

### Major standards bodies

**ISACA (Information Systems Audit and Control Association).** Established in 1969. Headquartered in the US but with chapters worldwide. Publishes the CISA credential; the COBIT framework; ITAF (IT Audit Framework); risk-related guidance.

**ISO/IEC.** International Organization for Standardization. Joint Technical Committee 1 (JTC 1) handles IT standards. ISO/IEC 27001, 27002, and related family for information security.

**NIST (National Institute of Standards and Technology).** US federal body. Publishes the Cybersecurity Framework, SP 800 series special publications, FIPS standards. Influential globally despite the US-origin.

**IIA (Institute of Internal Auditors).** Internal-audit professional body. Standards complement ISACA's.

**AICPA (American Institute of Certified Public Accountants).** SOC reports (SOC 1, SOC 2, SOC 3). Standards for service-organisation audits.

**CIS (Center for Internet Security).** Publishes the CIS Controls and CIS Benchmarks for hardening.

**PCI Security Standards Council.** PCI-DSS for payment-card environments.

**Cloud Security Alliance (CSA).** Cloud-specific guidance and the STAR (Security, Trust, Assurance and Risk) registry.

**OWASP (Open Worldwide Application Security Project).** Web-application security guidance. Covered in Chapter 6.

### ISACA's ITAF — IT Assurance Framework

ITAF organises ISACA's professional guidance for IS audit and assurance. Key components:

- **Standards.** Mandatory professional standards binding on CISA holders.
- **Guidelines.** Recommended practices.
- **Tools and techniques.** Implementation guidance.

Standards cover topics like: independence, due professional care, planning, evidence, reporting. CISA holders must follow these standards; failure can lead to disciplinary action.

### Regulatory requirements in Nepal

Beyond the international standards, Nepali IS audit is shaped by domestic regulation:

**NRB IT Directives** for banks and financial institutions. Specific, prescriptive, regularly updated.

**NTA directives** for telecom and ISPs.

**SEBON directives** for capital-market intermediaries.

**Insurance Authority directives** for insurers.

**OAG audit guidelines** for government IT audit.

**ICAN audit standards** including standards on auditing in computer environments.

**Privacy Act 2075 and ETA 2063** as legal floor.

For Nepal-specific IS audit work, the auditor must be conversant with applicable domestic regulation in addition to international standards.

## 1.7 ISO 27001, NIST Cybersecurity Framework, COBIT, CIS

The four major frameworks shape most IS audit work. Each has a distinct emphasis; many organisations use combinations.

### ISO/IEC 27001

*ISO/IEC 27001 is the international standard for Information Security Management Systems (ISMS), specifying requirements for establishing, implementing, maintaining, and continually improving an information security management system within the context of the organisation, providing the basis for third-party certification.*

The current version is **ISO/IEC 27001:2022**, replacing the 2013 version. Key features:

- **Management system standard.** Like ISO 9001 for quality. Focuses on the management approach to security, not just technical controls.
- **Risk-based approach.** Controls are selected based on the organisation's risk assessment, not a one-size-fits-all checklist.
- **Annex A controls.** The standard includes 93 controls (in the 2022 version, reduced from 114 in 2013) organised into four themes: organisational (37), people (8), physical (14), technological (34).
- **Certification.** Organisations can be third-party certified by accredited bodies, providing public attestation.
- **PDCA cycle.** Plan-Do-Check-Act continuous improvement.

**ISO/IEC 27002** is the companion standard providing detailed guidance on each Annex A control.

**Other family members.**
- 27003 — implementation guidance.
- 27004 — measurement.
- 27005 — risk management.
- 27017 — cloud security.
- 27018 — cloud privacy.
- 27701 — privacy information management.
- 27037 — digital evidence (referenced in the Forensics subject).

In Nepal, several banks and IT companies hold ISO 27001 certification. The certification is a strong signal to customers and partners. The 2022 update has been progressively adopted; organisations certified under 27001:2013 have transition periods to migrate.

### NIST Cybersecurity Framework

*The NIST Cybersecurity Framework is a voluntary framework developed by the US National Institute of Standards and Technology that organises cybersecurity activities into functions, categories, and subcategories, providing a structure for managing cybersecurity risk applicable to organisations of any size and industry, widely adopted globally beyond its original US-critical-infrastructure scope.*

**NIST CSF 2.0** was published in February 2024, the first major revision since 1.1 (2018). Six core functions (the 2.0 version added "Govern" to the original five):

1. **Govern (GV).** Establish, communicate, and monitor the organisation's cybersecurity strategy, expectations, policy, and risk-management approach.
2. **Identify (ID).** Understand the organisation's cybersecurity risks — assets, threats, vulnerabilities, business environment, governance.
3. **Protect (PR).** Implement safeguards to limit or contain cybersecurity events.
4. **Detect (DE).** Detect cybersecurity events as they occur.
5. **Respond (RS).** Take action on detected events.
6. **Recover (RC).** Restore capabilities or services after an event.

Each function has multiple categories; each category has subcategories with specific outcomes. The framework references other standards (ISO 27001, COBIT, NIST SP 800-53, CIS Controls) for implementation guidance.

**Profiles** describe an organisation's current state or target state in terms of CSF subcategories. Gap analysis between current and target profile guides improvement.

**Tiers** (Partial, Risk-Informed, Repeatable, Adaptive) describe how the organisation manages cybersecurity risk.

The framework is voluntary internationally but has been adopted as a de facto reference by many organisations and regulators. Nepali banks increasingly reference the NIST CSF in their risk-management documentation, alongside (or sometimes in place of) other frameworks.

### COBIT — Control Objectives for Information and Related Technologies

*COBIT is ISACA's framework for the governance and management of enterprise IT, providing a holistic view of IT covering business objectives, governance and management processes, organisational structures, principles, policies, and culture, used worldwide for IT governance, audit, risk management, and compliance.*

The current version is **COBIT 2019** (the major revision after COBIT 5 of 2012). Key features:

- **Governance and management distinction.** Governance is the responsibility of the board; management is the responsibility of executive management. COBIT separates the two.
- **40 governance and management objectives** organised into 5 domains:
  - Evaluate, Direct and Monitor (EDM) — governance.
  - Align, Plan and Organise (APO).
  - Build, Acquire and Implement (BAI).
  - Deliver, Service and Support (DSS).
  - Monitor, Evaluate and Assess (MEA).
- **Design factors.** Adapt the framework to the organisation's context — enterprise strategy, role of IT, threat landscape, regulatory requirements.
- **Performance management.** Capability levels (0-5) for each process, supporting maturity assessment.

COBIT is the dominant IT governance framework globally. Boards of directors increasingly reference COBIT in their IT oversight; CIOs use it to structure IT management; auditors use it to evaluate IT.

In Nepal, COBIT is the standard reference for IT governance audit at major banks and telecoms. The IS auditor encountering an IT governance audit question will typically structure the work around COBIT.

### CIS Controls

*The CIS Controls (formerly SANS Top 20) are a prioritised set of cybersecurity actions developed and maintained by the Center for Internet Security and a global community of practitioners, providing concrete, technical guidance for defending against the most common cyber threats.*

The current version is **CIS Controls v8** (released May 2021; with v8.1 update in 2024). 18 top-level controls:

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

Each control has multiple safeguards (sub-controls); each is tagged with **Implementation Group (IG1, IG2, IG3)** — IG1 for small organisations with limited resources, IG3 for mature security programmes.

**CIS Benchmarks** are detailed configuration guides for specific products (Windows Server, Linux distributions, AWS, Azure, GCP, Kubernetes, databases, network devices). The benchmarks are widely used for configuration hardening and as audit criteria.

In a Nepali context, the CIS Controls are particularly valuable for smaller organisations (development banks, finance companies, growing fintechs) that find ISO 27001 too elaborate but need a credible cybersecurity baseline.

### Comparing the frameworks

| Aspect | ISO 27001 | NIST CSF | COBIT | CIS Controls |
|---|---|---|---|---|
| Focus | Information security management system | Cybersecurity outcomes | IT governance and management | Cybersecurity actions |
| Audience | Information security organisations | All organisations, cybersecurity focus | Boards, CIOs, IT management, auditors | IT and security teams |
| Certification | Yes, third-party | No formal certification | No formal certification | No formal certification |
| Granularity | High (93 Annex A controls) | Mid (108 subcategories in 2.0) | High (40 objectives, many practices) | Very high (18 controls, 153 safeguards in v8) |
| Implementation guidance | ISO 27002 companion | References other standards | COBIT publications and toolkit | Detailed safeguards plus benchmarks |
| Use for audit | Compliance audit; certification audit | Maturity assessment | Governance audit | Technical controls audit |
| Free to use | Standard is purchased | Free | Mostly free (some materials) | Free |

A mature organisation typically uses several. ISO 27001 for the management system and external certification; NIST CSF for cybersecurity strategy and maturity; COBIT for governance; CIS Controls and Benchmarks for technical implementation. The IS auditor must be conversant with all of them.

### Other relevant frameworks

Beyond the four core frameworks named in the syllabus:

- **NIST SP 800-53.** Detailed catalogue of security and privacy controls. Mandatory for US federal systems; widely referenced elsewhere.
- **PCI-DSS.** Payment Card Industry Data Security Standard. Mandatory for entities processing payment-card data; relevant for Nepal's payment-card networks.
- **HIPAA.** US health-data privacy. Relevant where Nepali providers serve US clients.
- **GDPR.** EU privacy regulation. Relevant for Nepali entities with EU customers or operations.
- **SOC 2.** Service-organisation controls. Increasingly required for SaaS providers serving enterprise customers.
- **ITIL.** IT Infrastructure Library. Service management; complements governance frameworks.
- **C2M2.** Cybersecurity Capability Maturity Model from US Department of Energy. Used in sector maturity assessments.

The next chapter examines specific control areas that almost every IS audit encounters: hardware and software security.
