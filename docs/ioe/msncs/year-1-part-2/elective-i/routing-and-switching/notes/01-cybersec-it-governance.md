---
title: 'Chapter 1 — Cyber Security and IT Governance'
sidebar_label: 'Ch 01 — Cyber Security and IT Governance'
sidebar_position: 1
description: 'Chapter 1 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch01
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Modern enterprise networks are not just collections of switches, routers, and cables. They are operating environments embedded in organisations that have business objectives, regulatory obligations, and security adversaries. Before this course examines the technical specifics of routing protocols, VLANs, and VPNs, it sets the governance context that shapes every technical decision. The network architect who designs without governance produces switches that work but compliance that fails. The network engineer who configures without security thinking opens vulnerabilities that a single attacker exploits. This chapter covers the foundations: digital transformation and its cybersecurity consequences, the Rubik Cube model of information security, IT service management, the information security management framework, IT governance, and the policy/procedure/guideline structure that operationalises governance.

## 1.1 Digital transformation and cyber security issues

### Digital transformation

*Digital transformation is the comprehensive integration of digital technologies into all areas of an organisation's operations, fundamentally changing how the organisation delivers value to its customers, manages its processes, and engages with its workforce — driven by the maturity of cloud, mobile, data analytics, and now artificial intelligence.*

The phrase covers a wide range. A traditional bank moving paper forms to web forms is transforming. A retailer adding e-commerce alongside physical stores is transforming. A government agency moving services online (Nagarik App, online tax filing, e-passport) is transforming. The 2010s and 2020s have been the digital-transformation decade for most Nepali organisations.

### Drivers of digital transformation

Several forces drive transformation:

**Customer expectations.** Customers expect 24/7 digital access. A Nepali bank without internet and mobile banking loses customers; an Insurance company without an online claims portal loses business; a hospital without electronic medical records cannot scale.

**Cost pressure.** Digital processes are cheaper to scale than physical ones. A loan application processed online costs a fraction of one processed at a branch.

**Competition.** Digital-native competitors (fintech startups, neobanks, digital retailers) raise the bar. eSewa, Khalti, IME Pay redefined what consumers expect from financial services in Nepal.

**Regulation.** Regulators increasingly require digital capability — NRB requires online services for banks, NTA requires online portals for telecom customers, the Office of the Auditor General requires digital reporting from government agencies.

**Data as a strategic asset.** Organisations that collect, analyse, and act on data outperform those that do not.

**Pandemic catalysis.** COVID-19 accelerated transformation by years. Remote work, online education, telemedicine, contactless payments became necessities, not options.

### Cybersecurity consequences

Digital transformation expands the attack surface. Each new digital service is a new attack vector. Specific consequences:

**More entry points.** Each web application, mobile app, API, IoT device, cloud service is a potential entry. The 2024 Government Integrated Data Centre DDoS affected 400+ government portals — the breadth of attack reflected the breadth of services delivered through GIDC.

**Greater value at stake.** Digital systems hold more sensitive data than the paper systems they replaced. Customer PII, financial records, health data, all digital, all attractive to attackers.

**Faster propagation.** A vulnerability in widely-deployed software propagates rapidly. Log4j (2021), the 2024 MOVEit incidents, supply-chain attacks like SolarWinds (2020) showed how single vulnerabilities reach thousands of organisations.

**Cross-border exposure.** Cloud and SaaS services place data outside the organisation's national borders, raising sovereignty and jurisdiction concerns.

**Insider risks compound.** Remote work, BYOD, and broader access reduce the perimeter that traditional security relied on.

**Supply chain complexity.** Modern systems depend on dozens to hundreds of third parties. Each is a potential vector.

**Identity-centric attacks.** With the perimeter dissolved, identity becomes the new perimeter. Stolen credentials are the most common initial-access vector in major incidents.

### Cybersecurity issues in the Nepali digital transformation

Real incidents in Nepal illustrate the consequences:

- **NIC Asia Bank SWIFT incident (2017).** Compromised SWIFT credentials used for fraudulent transfers totalling tens of millions of dollars (most recovered through international cooperation).
- **Foodmandu breach (2020).** About 50,000 user records exposed; the food-delivery platform's customer data leaked publicly.
- **Vianet breach (2020).** Around 170,000 customer records exposed at the ISP.
- **GIDC DDoS (April 2024).** Government Integrated Data Centre hit by sustained DDoS taking 400+ government portals offline for days; immigration services at TIA disrupted.
- **Ministry of Education breach (2025).** Student and employee PII exposed.
- **Nepal Police website (late 2025).** Attackers claimed 2 million+ records.

Each transformation initiative — moving citizen services online, opening up bank operations to mobile users, expanding telecom service portals — has produced both value and attack surface. The discipline that determines whether the value or the attacks win is what this chapter introduces.

### Defence in depth

*Defence in depth is the security strategy of using multiple, layered, and overlapping security controls so that a failure of any single control does not result in compromise, drawn from military doctrine and adapted to information security with controls spanning policy, physical security, network, host, application, and data layers.*

A single firewall is not enough. A single anti-virus is not enough. Defence in depth assumes that some controls will fail; the system survives because other controls catch what the first missed.

Typical layers in a defence-in-depth architecture:

| Layer | Examples |
|---|---|
| Governance and policy | Information security policy, acceptable use, training |
| Physical | Building security, data centre access, asset protection |
| Network perimeter | Firewall, IPS, DDoS protection, web application firewall |
| Network internal | Segmentation, internal firewalls, network access control |
| Host | EDR, antivirus, host firewall, configuration hardening |
| Application | Secure SDLC, input validation, authentication, authorisation |
| Data | Encryption, DLP, access controls, classification |
| Identity | MFA, identity governance, privileged access management |
| Monitoring | SIEM, log analysis, threat intelligence, incident response |

Defence in depth is the structural answer to the question "what if my main control fails?" Every layer adds friction for the attacker; together they make breach unlikely and full compromise still less likely.

## 1.2 Information security with the Rubik Cube model

### The Rubik Cube model

*The Rubik Cube model of information security is a three-dimensional framework that conceptualises information security as the intersection of three axes — the desired security properties of information, the states in which information exists, and the categories of security measures used — providing a structured way to ensure that every combination of property, state, and measure is addressed, often called the McCumber Cube after its developer.*

The model was published by John McCumber in 1991. It has been a teaching staple in security education ever since. The "Rubik Cube" naming comes from its visual representation — a 3×3×3 cube with each small cube representing a specific combination.

### The three dimensions

**Dimension 1 — Information security properties (CIA triad).**

- **Confidentiality.** Information accessible only to those authorised.
- **Integrity.** Information accurate and unaltered by unauthorised parties.
- **Availability.** Information accessible when needed by those authorised.

Some extensions add Authenticity, Non-repudiation, and Accountability — making it the CIANA properties — though the original Cube uses CIA.

**Dimension 2 — Information states.**

Information exists in three states:

- **Transmission (in motion).** Travelling between systems — packets on a network, messages in flight, data uploading.
- **Storage (at rest).** Sitting on disks, in databases, in backups, in archives.
- **Processing (in use).** Being computed on by a CPU, manipulated in memory, transformed by software.

**Dimension 3 — Security measures.**

Controls fall into three categories:

- **Policy and practice.** Administrative — what people are required to do.
- **Education, training, and awareness.** People understand their responsibilities.
- **Technology.** Hardware and software controls.

### The 27 cells

The 3×3×3 cube gives 27 specific combinations. Each combination represents a class of security concern. Examples:

| Property | State | Measure | Example |
|---|---|---|---|
| Confidentiality | Transmission | Technology | TLS encryption of HTTPS traffic |
| Confidentiality | Transmission | Policy | Policy requiring encryption of sensitive emails |
| Confidentiality | Transmission | Awareness | Training staff not to send PII over email |
| Integrity | Storage | Technology | Database checksums and integrity constraints |
| Integrity | Storage | Policy | Policy requiring approval for database changes |
| Integrity | Storage | Awareness | Training staff to recognise tampering attempts |
| Availability | Processing | Technology | Redundant servers and failover |
| Availability | Processing | Policy | Change management process |
| Availability | Processing | Awareness | Staff understand impact of their changes on availability |

The cube's value is its completeness. An information security programme that addresses only technology — but ignores policy and awareness — leaves two dimensions of the cube unaddressed. A programme that focuses on confidentiality but not integrity or availability addresses one of nine property-state combinations.

### Application to network security

For a network engineer designing an enterprise network, the cube provides structured questions:

- For each protocol the network carries (HTTPS, SSH, SNMP, NetFlow, syslog, IPSec), how is confidentiality of data in transmission ensured?
- For each device's configuration (router configs, switch configs), how is integrity at rest ensured?
- For each operational process (changes, backups, monitoring), what policies, training, and technologies apply?

The cube does not prescribe specific controls but ensures that the architect thinks across all combinations.

### Critiques and refinements

The cube is conceptually clean but practical use varies. Some critiques:

- The three-dimensional structure does not always map cleanly to modern environments (where states blur — data in encrypted storage being processed; data in cache being both in motion and at rest).
- The CIA triad is sometimes seen as too narrow; modern variants extend the property dimension.
- The measure dimension overlaps with frameworks like NIST CSF's functions (Identify, Protect, Detect, Respond, Recover) — which provide finer granularity.

Despite these, the cube remains a useful teaching tool and a structured prompt for completeness in security thinking.

## 1.3 Information Technology Service Management (ITSM)

### ITSM

*Information Technology Service Management is the structured approach to designing, delivering, managing, and improving the IT services an organisation provides to its customers (internal or external), focusing on the processes, technology, and people required to maintain service quality across the full service lifecycle.*

ITSM treats IT as a service organisation. The fundamental shift: IT does not just run servers; IT provides services that the business consumes. Email is a service. Internet banking is a service. The payroll system is a service.

### ITIL — the dominant framework

*The Information Technology Infrastructure Library (ITIL) is the most widely adopted framework for IT service management, originally developed by the UK government in the 1980s, now owned by AXELOS, providing detailed practices for managing IT services across their entire lifecycle from strategy through design, transition, operation, and continual improvement.*

The current major version is **ITIL 4**, released in 2019. ITIL 4 represents a substantial restructuring from ITIL v3 (2007/2011), aligning with agile and DevOps practices.

**ITIL 4 service value system.** The overarching framework with:
- Guiding principles (focus on value, start where you are, progress iteratively, collaborate and promote visibility, think and work holistically, keep it simple and practical, optimise and automate).
- Governance.
- Service value chain (plan, improve, engage, design and transition, obtain/build, deliver and support).
- Practices (management practices that replace ITIL v3's processes).
- Continual improvement.

**ITIL 4 practices** group activities into 34 management practices in three categories:
- **General management practices** (e.g., information security management, risk management, supplier management).
- **Service management practices** (e.g., incident management, change enablement, service desk, service request management).
- **Technical management practices** (e.g., deployment management, infrastructure and platform management).

### Key ITIL practices

For network operations specifically, several practices matter:

**Incident management.** Restoring service after disruption. The 24x7 operations process — alerts, triage, escalation, resolution, communication.

**Problem management.** Investigating root causes of incidents to prevent recurrence. Distinct from incident management (which restores service); problem management addresses the underlying issue.

**Change enablement (formerly change management).** Controlled introduction of changes to production. Discussed in the Information Systems Audit subject.

**Service request management.** Handling routine requests (password resets, access provisioning, software installations).

**Service desk.** Single point of contact between users and IT services.

**Service level management.** Defining and tracking service levels with business stakeholders.

**Capacity and performance management.** Ensuring services have sufficient capacity to meet demand.

**Availability management.** Ensuring services are available per their commitments.

**IT asset management.** Tracking and managing IT assets across their lifecycle.

**Configuration management.** Maintaining accurate records of configuration items and their relationships.

**Monitoring and event management.** Detecting and responding to operational events.

**Information security management.** Discussed in the next section.

### ITSM in Nepali organisations

Adoption varies:

- **Major commercial banks** typically have ITIL-aligned service management with dedicated service desks, formal change management, problem management, and SLA tracking. Some hold ITIL certifications at the organisation level (uncommon) or many staff hold individual ITIL certifications.
- **Telecoms** (NTC, Ncell) operate at sufficient scale that ITIL-style processes are necessary.
- **Government agencies** vary. The National Information Technology Centre and major ministries have service-management processes; smaller agencies less so.
- **Mid-size enterprises** typically have some ITSM elements (service desk, change management) without the full ITIL framework.
- **Small organisations** rely on informal processes — engineers handle requests directly without ticketing systems.

The maturity gap explains some incident patterns. Organisations with weak service management have more outages, slower recovery, and worse customer experience during disruption.

### Service management tooling

Standard tools that implement ITSM processes:

- **ServiceNow.** Market-leading enterprise ITSM platform.
- **Atlassian Jira Service Management.** Common in software-development-heavy organisations.
- **BMC Helix.** Long-established enterprise.
- **ManageEngine ServiceDesk Plus.** Mid-market and SME.
- **Freshservice.** Cloud-native; mid-market.
- **GLPI, OTRS, Zammad, osTicket.** Open-source options used by smaller organisations and educational institutions in Nepal.

The tool implements the process — incident creation, assignment, tracking, resolution, reporting. The process is the substance; the tool supports it.

## 1.4 Information security management framework

### Information Security Management System (ISMS)

*An Information Security Management System is the framework of policies, processes, procedures, technologies, and people that an organisation uses to systematically manage information security risks and protect information assets, providing the management structure within which specific security controls operate.*

The ISMS is the management layer above individual controls. A firewall is a control; the policy that requires firewalls, the procedure for managing firewall changes, the standard for firewall configuration, the audit of firewall effectiveness — these collectively are the ISMS.

### ISO/IEC 27001

The defining standard for ISMS. Covered in the Information Systems Audit subject — the current version is ISO/IEC 27001:2022 with 93 Annex A controls in four themes (organisational, people, physical, technological).

ISO 27001 specifies the management system; ISO 27002 provides detailed guidance on each control.

### ISMS lifecycle

The PDCA (Plan-Do-Check-Act) cycle structures the ISMS:

**Plan.**
- Establish the ISMS context (scope, stakeholders, requirements).
- Conduct risk assessment.
- Define risk treatment plan.
- Select and document controls (Statement of Applicability).
- Establish information security policy.

**Do.**
- Implement risk treatment plan.
- Deploy selected controls.
- Train staff.
- Operate the ISMS.

**Check.**
- Monitor and measure control effectiveness.
- Conduct internal audits.
- Conduct management reviews.

**Act.**
- Implement corrective and preventive actions.
- Continually improve the ISMS.

The cycle repeats. The ISMS is never finished; it evolves as the organisation, threats, and technology change.

### Components of an ISMS

A typical ISMS includes:

- **Information security policy.** The high-level policy approved by senior management.
- **Risk register.** Documented risks with assessments and treatments.
- **Statement of Applicability.** Which controls apply, which do not, and why.
- **Asset inventory.** Information assets covered by the ISMS.
- **Procedures.** Operational steps for security activities.
- **Records.** Evidence of ISMS operation — audit logs, training records, incident records.
- **Performance metrics.** Measures of ISMS effectiveness.
- **Documentation control.** Versioning, approval, distribution.

### Roles in the ISMS

**Top management.** Ultimate responsibility; resources commitment; periodic review.

**Information Security Manager / CISO.** Day-to-day ISMS operation.

**Information Security Committee / Forum.** Cross-functional coordination.

**Asset owners.** Accountable for specific information assets.

**Risk owners.** Accountable for treating specific risks.

**All staff.** Follow policies; report incidents; cooperate with security activities.

For Nepali banks, NRB directives require these roles to be explicitly defined and resourced. A bank without a designated information security officer faces supervisory concerns.

### ISMS certification

Organisations can be certified to ISO 27001 by accredited certification bodies. Process:

1. Implement the ISMS.
2. Internal audit confirms readiness.
3. Stage 1 audit by certification body — documentation review.
4. Stage 2 audit — implementation review.
5. Certification issued if successful.
6. Surveillance audits annually.
7. Recertification every 3 years.

In Nepal:
- Several major banks (NIC Asia, Nabil, Standard Chartered Bank Nepal, NMB Bank, Global IME, others) hold or have held ISO 27001 certification.
- Some IT/ITES companies hold ISO 27001 (often required by international clients).
- Some payment service providers and SaaS companies hold ISO 27001.

Certification is voluntary but provides a strong external signal of security maturity.

### Other security frameworks

The Information Systems Audit subject covered the framework landscape in detail. Recap from a network-operations perspective:

- **NIST Cybersecurity Framework 2.0** — outcomes-based; six functions (Govern, Identify, Protect, Detect, Respond, Recover).
- **CIS Controls v8** — 18 prioritised controls with implementation groups; CIS Benchmarks for specific products.
- **COBIT 2019** — IT governance; 40 management objectives.
- **NIST SP 800-53** — detailed control catalogue.
- **PCI-DSS** — payment-card-specific.
- **Cloud Security Alliance CCM** — cloud-specific.

A network architect should be conversant with these — auditors and regulators reference them constantly.

## 1.5 Information technology governance

### IT governance

*Information Technology Governance is the system by which an organisation directs and controls the use of information technology, ensuring that IT decisions align with business strategy, that IT delivers value, that risks are managed, that resources are used responsibly, and that performance is measured — exercised by the board of directors and executive management.*

Governance is what the board does. Management is what executives do. The board sets direction; management executes. IT governance is the board's responsibility to ensure that IT is directed toward the organisation's objectives.

### Governance vs management

A useful distinction:

| Aspect | Governance | Management |
|---|---|---|
| Who | Board of directors | Executive management |
| What | Direction-setting | Execution |
| Focus | What and why | How and when |
| Output | Strategy, policy, oversight | Plans, operations, results |
| Examples | IT strategy approval; risk appetite | IT project execution; daily operations |

A board that micromanages IT operations is failing at governance. A board that delegates everything without setting direction is also failing.

### Governance objectives

IT governance aims at five outcomes:

**Strategic alignment.** IT serves business strategy. Investments are made in IT capabilities that advance business objectives.

**Value delivery.** IT produces value that exceeds its cost.

**Risk management.** IT-related risks are identified, assessed, and treated.

**Resource management.** IT resources (people, technology, finance, information) are used efficiently.

**Performance measurement.** Outcomes are measured and reported.

These come from COBIT and similar frameworks. They are the questions the board should be able to answer.

### COBIT for governance

COBIT 2019 (covered in the IS Audit subject) is the dominant governance framework. Its structure:

- **Governance objectives** (5) — set by the board, focused on Evaluate, Direct, Monitor.
- **Management objectives** (35) — operational, focused on Align/Plan/Organise, Build/Acquire/Implement, Deliver/Service/Support, Monitor/Evaluate/Assess.

Total 40 objectives. Each with capability levels (0-5) supporting maturity assessment.

The board uses COBIT (or equivalents) to structure its oversight:

- IT strategy committee with regular agenda.
- IT risk reports to the audit committee.
- IT performance reports to the full board.
- Independent assurance over IT (from internal audit or external).

### Network governance specifically

For network operations, governance translates to:

- **Network strategy.** Aligned with business needs. Investment plan with multi-year view.
- **Network architecture principles.** Documented and approved.
- **Network operating model.** In-house vs outsourced; centralised vs distributed.
- **Network risk register.** Risks identified and treated.
- **Network performance metrics.** Availability, performance, security; reported regularly.
- **Network capacity planning.** Anticipating growth.
- **Network vendor management.** Strategic vendor relationships; concentration risk.
- **Network audit and assurance.** Periodic independent review.

The MSc graduate working as a network engineer or architect operates within this governance framework — designs must fit the architecture principles; major changes need governance approval; performance feeds management reporting.

### IT governance in Nepal

NRB directives explicitly require IT governance for banks:
- Board-level IT governance committee.
- Approved IT strategy.
- Risk-based IT plan.
- Periodic reporting to the board.

NTA requirements for telecoms and ISPs include governance elements.

For government agencies, IT governance is a broader policy concern — Digital Nepal Framework 2.0 (in development through 2024-25) addresses governance themes.

For private-sector mid-size enterprises, governance maturity varies widely. The most mature have COBIT-structured governance; the less mature have informal IT decision-making with board involvement only when problems escalate.

## 1.6 Framework of ICT policy, procedures, and guidelines

### The policy hierarchy

*A policy hierarchy is the structured set of documents that translate the organisation's strategic intent into operational requirements, typically organised from highest-level (policy) through standards, procedures, and guidelines, with each level providing more specific detail to support implementation.*

The classic four-level structure:

1. **Policy.** What we will do (and why). High-level. Approved at board / senior-management level.
2. **Standard.** What specifically (rules and parameters). Mandatory.
3. **Procedure.** How specifically (step by step). Operational.
4. **Guideline.** Recommended practice. Optional but encouraged.

### Policy

*Policy is the high-level statement of management intent that establishes mandatory rules for the conduct of activities, approved by senior management or the board, expressing the organisation's position on a topic without prescribing detailed implementation.*

Characteristics of a good policy:
- Stable. Changes infrequently (annually or less).
- High-level. Free of technical detail that will date.
- Mandatory. "Shall" and "must," not "should" and "may."
- Owned. A named individual is responsible.
- Approved. By appropriate authority.
- Communicated. To everyone affected.
- Enforced. Consequences for violation are real.

Examples in network context:

- **Information Security Policy.** "The organisation shall protect its information assets through appropriate technical, administrative, and physical controls."
- **Acceptable Use Policy.** "Employees shall use IT resources only for authorised business purposes."
- **Network Access Policy.** "Access to the corporate network shall be granted only to authorised users and devices."
- **Remote Access Policy.** "Remote access shall require multi-factor authentication."
- **Cryptographic Policy.** "Cryptographic algorithms used shall meet the organisation's minimum standards."

### Standard

*A standard is a mandatory specification of the technical, procedural, or administrative requirements that operationalise a policy, providing the detail that policy intentionally lacks.*

Examples:

- **Password Standard.** "Passwords shall be at least 12 characters, include three of four character classes, expire every 90 days."
- **TLS Standard.** "TLS 1.2 or 1.3 shall be used; cipher suites shall be from the approved list."
- **Firewall Standard.** "Firewall rules shall follow the documented rule template; rules shall be reviewed annually."
- **Network Hardening Standard.** "Network devices shall be configured per the CIS Benchmark for the device type."

Standards change more often than policies as technology evolves but less often than procedures.

### Procedure

*A procedure is a step-by-step instruction for performing a specific operational task, providing the detail needed for consistent execution by someone with appropriate training.*

Examples:

- **Firewall Change Procedure.** Specific steps for requesting, reviewing, approving, implementing, and verifying a firewall rule change.
- **User Provisioning Procedure.** Steps for granting access to a new user.
- **Network Device Backup Procedure.** Steps for backing up router/switch configurations.
- **Incident Reporting Procedure.** Steps for reporting a suspected incident.

Procedures change often as tools and details change. They are typically owned by operational teams.

### Guideline

*A guideline is a recommended practice that supports policy and standards but is not strictly mandatory, often used to provide context, examples, or best-practice advice where mandating specifics would be excessive.*

Examples:

- "Network device naming should follow the convention: [site]-[device-type]-[number]."
- "Switch ports should be labeled with cable identifiers."
- "Email signatures should include name, role, and contact information."

Guidelines balance the need for consistency with the need for flexibility.

### ICT policy framework in Nepal

For Nepali organisations, several reference policies shape the framework:

**National-level.**
- Digital Nepal Framework 2.0 (in development) — overall national digital strategy.
- ICT Policy 2072 — national ICT policy.
- Electronic Transactions Act 2063 — legal framework.
- Privacy Act 2075 — personal-data protection.

**Sectoral.**
- NRB IT directives for banks.
- NTA directives for telecom and ISPs.
- SEBON directives for capital markets.
- Insurance Authority requirements.

**Organisation-level.** Each organisation maintains its own ICT policy framework.

### Building an ICT policy framework

A typical exercise for an MSc student or new policy author:

1. **Establish the framework structure.** Document hierarchy; approval levels; review cycles.
2. **Identify required policies.** Based on regulatory requirements, frameworks (ISO 27001, NIST CSF), and organisational risks.
3. **Draft each policy.** Using consistent templates; with named owners.
4. **Approve.** Through the documented governance process.
5. **Communicate.** Training, awareness, accessible publication.
6. **Implement.** Cascade to standards, procedures, guidelines.
7. **Monitor.** Compliance tracking; audit findings.
8. **Review and update.** Annually or on trigger events.

### A sample policy list for a Nepali commercial bank

| # | Policy | Owner |
|---|---|---|
| 1 | Information Security Policy | CISO |
| 2 | Acceptable Use Policy | CISO |
| 3 | Access Control Policy | CISO |
| 4 | Remote Access Policy | CISO |
| 5 | Cryptographic Policy | CISO |
| 6 | Data Classification and Handling Policy | CISO |
| 7 | Information Asset Management Policy | CIO |
| 8 | Change Management Policy | CIO |
| 9 | Incident Management Policy | CISO |
| 10 | Business Continuity Policy | COO |
| 11 | Vendor Management Policy | CRO |
| 12 | Personnel Security Policy | HR |
| 13 | Physical and Environmental Security Policy | Admin |
| 14 | Information Backup Policy | CIO |
| 15 | Network Security Policy | CISO |
| 16 | Cloud Security Policy | CISO |
| 17 | Privacy Policy | Legal/DPO |
| 18 | Software Development Policy | CIO |
| 19 | Mobile Device Policy | CISO |
| 20 | Logging and Monitoring Policy | CISO |

Each policy spawns standards, procedures, and guidelines beneath it. A bank operating at any scale needs dozens of policies and hundreds of supporting documents.

### Standard Operating Procedures (SOPs)

A common artefact in network operations. An **SOP** is a procedure (in the policy hierarchy) for a specific operational task.

Common network SOPs:

- SOP for firewall rule change.
- SOP for new switch deployment.
- SOP for router IOS upgrade.
- SOP for VPN user provisioning.
- SOP for VLAN creation.
- SOP for DDoS response.
- SOP for site-to-site VPN setup.
- SOP for network device backup.
- SOP for switch port allocation.

Each SOP is short (typically 1-3 pages), specific, and operationally useful. A new engineer can perform the task by following the SOP. The SOP is updated when the task changes.

### Policy lifecycle

Policies are not static documents. They go through a lifecycle:

1. **Creation.** Draft based on need.
2. **Review.** By stakeholders, legal, security, business.
3. **Approval.** By appropriate authority.
4. **Publication.** Made accessible.
5. **Communication.** Trained on; awareness campaigns.
6. **Implementation.** Operational changes to comply.
7. **Monitoring.** Compliance checked.
8. **Audit.** Independent assurance.
9. **Review.** Periodic check for currency.
10. **Update or retire.** As needed.

The IS auditor (covered in the Information Systems Audit subject) examines whether the lifecycle is operating — policies exist, are current, approved, communicated, complied with.

The next chapter shifts from the governance frame to the technical foundation: how converged enterprise networks are designed, what IP addressing patterns support them, and how the network's foundation is protected.
