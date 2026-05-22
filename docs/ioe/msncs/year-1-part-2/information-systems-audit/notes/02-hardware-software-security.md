---
title: 'Chapter 2 — Hardware and Software Security Issues during Audit'
sidebar_label: 'Ch 02 — Hardware and Software Security Issues during Audit'
sidebar_position: 2
description: 'Chapter 2 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch02
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Hardware and software form the operational layer that the audit ultimately tests. A bank's information-security policy is words; an information-security control is the firewall configuration, the laptop encryption setting, the patch level on the database server, the licence terms of the core banking application. The IS auditor must understand both — the words and the operational reality — and evaluate whether they match. This chapter walks through the hardware and software issues the auditor encounters: hardware security objectives, peripherals and storage media, authentication devices, hardware lifecycle (acquisition, maintenance, obsolescence, disposal), problem and change management, network and communication concerns, types of software and elements of software security, controls during installation and maintenance, and licensing and procurement.

## 2.1 Hardware security objective

### What hardware security aims at

*Hardware security is the set of objectives, controls, and practices that protect the physical computing equipment of an organisation — servers, network devices, storage, end-user devices, peripherals — from theft, damage, unauthorised access, tampering, and operational failure, supporting the broader information-security objectives of confidentiality, integrity, and availability.*

The hardware layer is the foundation. Software runs on hardware; data resides on hardware; networks transit hardware. A compromise of the hardware layer can defeat the most carefully-designed software controls. An attacker who physically accesses a server can boot from external media, extract data from disks, install hardware keyloggers, or replace components with compromised versions.

### Hardware security objectives

The auditor evaluates several specific objectives.

**Physical protection.** The hardware is physically secured against unauthorised access and against environmental damage. Server rooms and data centres have access controls, environmental monitoring, fire suppression. End-user devices have locks, asset tracking.

**Operational availability.** Hardware operates reliably with appropriate redundancy. Critical servers have redundant power supplies, RAID storage, failover network paths.

**Confidentiality of data on hardware.** Data on disks is encrypted (full-disk encryption); end-user devices have device-level encryption; portable media is encrypted.

**Integrity of the hardware itself.** Hardware components are genuine (not counterfeit), have not been tampered with, and run authorised firmware.

**Controlled lifecycle.** Hardware is acquired through controlled procurement, maintained on a schedule, retired before obsolescence creates risk, and disposed of securely.

**Inventory and accountability.** Every device is inventoried with its assigned owner and location.

### Tests an auditor performs

For a Nepali bank's hardware-security audit, typical procedures might include:

- Walkthrough of the primary data centre and DR site; observation of physical access controls, environmental controls, fire suppression.
- Review of access logs for the data centre over a sample period.
- Sample of server configurations to verify hardening (CIS Benchmarks).
- Verification that critical servers have redundant components.
- Inspection of asset inventory for completeness and accuracy.
- Review of end-user-device security policy and sample compliance check.
- Verification of disk-encryption deployment on laptops.

The audit findings might include: data centre temperature exceeding thresholds; access logs missing for a period; assets in inventory that could not be physically located; laptops without encryption; or — finding none of these — the area conformed to expected controls.

## 2.2 Peripheral devices and storage media

Peripherals and storage media often present greater risk than the central server estate because they are mobile, distributed, and harder to control.

### Categories of peripherals and storage

**Removable storage.** USB drives, SD cards, portable hard drives, optical media.

**Mobile devices.** Laptops, tablets, smartphones (employee or company-owned).

**Connected peripherals.** Printers, scanners, multifunction devices, IoT sensors.

**Input devices.** Keyboards, mice, card readers, scanners.

**Output devices.** Printers, displays, audio.

**Specialised devices.** Hardware security modules (HSMs), smart-card readers, ATM components.

### Risks associated with peripherals

**Data exfiltration.** A USB drive copying data out of the network. The 2020 Vianet and Foodmandu breaches did not specifically involve USB exfiltration, but the same vector recurs in incidents globally.

**Malware introduction.** USB drives carrying malware. The Stuxnet worm targeting Iranian centrifuges (2010) spread via USB drives.

**Theft.** Laptops with company data lost or stolen.

**Unauthorised connections.** Personal devices on the corporate network.

**Print exposure.** Printers that retain copies of printed documents in memory; multifunction printers that scan to email without controls.

**Eavesdropping.** Wireless keyboards and other devices with weak or no encryption.

### Controls and audit checks

**Removable-media policy.** Whether USB devices are allowed; if yes, under what controls (encryption, DLP, approval).

**Endpoint USB control.** Software or Group Policy that blocks USB devices, allows only approved devices, or encrypts all writes.

**DLP (Data Loss Prevention).** Software inspecting file transfers and email for sensitive content.

**Mobile device management (MDM).** Configuration enforcement for mobile devices.

**Print controls.** Pull-printing where the user authenticates at the printer; secure print queues.

**Inventory.** Authorised peripherals tracked; unauthorised devices detected.

The audit examines whether these controls exist, are configured correctly, and are operating. Typical procedures: review of policy; sample of endpoints to verify USB-control configuration; sample of DLP alerts to verify investigation; verification of MDM coverage.

## 2.3 Authentication devices

### Authentication devices

*Authentication devices are physical or logical hardware components used to verify the identity of users or systems, providing stronger or supplementary assurance beyond a password alone, including smart cards, hardware tokens, biometric readers, security keys, and mobile-device-based authenticators.*

Authentication has three "factors":

- **Something you know.** Password, PIN.
- **Something you have.** Token, smart card, mobile phone.
- **Something you are.** Biometric (fingerprint, face, iris).

**Multi-factor authentication (MFA)** combines factors. The most common modern implementations:

- **Smart cards.** Cryptographic chips on plastic cards. Used by some Nepali banks for high-privilege internal access.
- **Hardware tokens.** OATH-compliant tokens generating time-based one-time passwords (TOTP). RSA SecurID is the historic leader; many open alternatives.
- **FIDO2 / WebAuthn security keys.** YubiKey, Google Titan, Feitian keys. Cryptographic, phishing-resistant. The modern standard for high-assurance authentication.
- **Mobile authenticator apps.** Google Authenticator, Microsoft Authenticator, Authy, Duo. Generate TOTP codes or receive push approvals. Most widely deployed MFA in Nepal due to smartphone ubiquity.
- **SMS-based OTP.** Older, less secure (vulnerable to SIM-swap attacks). Still widely used in Nepal for banking, despite the known weaknesses.
- **Biometric readers.** Fingerprint scanners on laptops and phones; face recognition; some Nepali banks deploy biometric authentication for branch operations.

### Audit considerations

For authentication devices, the auditor examines:

- **Policy.** What authentication is required for what classes of access — administrator vs user, high-value transactions vs routine.
- **Coverage.** Whether MFA is enforced where required. Where Nepal Rastra Bank directives require MFA for specific scenarios (privileged access, customer-facing payment authorisation), compliance is mandatory.
- **Configuration.** Whether authentication is implemented correctly — strength of key derivation, resistance to common attacks.
- **Lifecycle.** Token issuance, revocation, replacement procedures. Lost-token handling.
- **Backup factors.** Recovery codes; back-up authenticator. Adequate but secure.
- **Logging.** Authentication events logged for audit trail.

A common finding in Nepali bank audits: MFA enabled for customer-facing transactions but not consistently for internal privileged access. The risk imbalance — strong customer authentication but weak administrative authentication — has been a contributing factor in several incidents.

## 2.4 Hardware acquisition, maintenance, and management of obsolescence

### Acquisition

Hardware acquisition involves several risks the audit addresses:

**Vendor risk.** Buying from authorised distributors reduces counterfeit risk. Supply-chain compromise — where genuine vendors are infiltrated and ship modified hardware — is a known nation-state threat, though rare in commercial channels.

**Contract risk.** Procurement contracts must specify what is being bought, warranty, support, end-of-life arrangements.

**Specification risk.** Buying inadequate hardware that cannot meet operational needs.

**Authority risk.** Approval levels; segregation of duties (no single person can both authorise and execute a purchase).

**Documentation risk.** Records of what was bought, when, from whom, at what cost.

For Nepali public-sector procurement, the Public Procurement Act 2063 (2007) and its rules govern the process. Even private-sector procurement at regulated entities is subject to internal governance frameworks aligned with NRB directives for banks.

The auditor reviews procurement records, contracts, and approval workflows for compliance with policy.

### Maintenance

Once acquired, hardware needs maintenance:

**Preventive maintenance.** Regular service to catch issues before failure.

**Corrective maintenance.** Repair when failures occur.

**Firmware and BIOS updates.** Vendor-released firmware patches addressing security vulnerabilities. Often neglected.

**Configuration management.** Tracking what is installed where, how it is configured.

**Inventory updates.** Recording moves, additions, changes.

The audit examines:
- Maintenance contracts with vendors.
- Maintenance logs.
- Adherence to vendor-recommended schedules.
- Firmware-update history.
- Inventory accuracy after maintenance events.

### Management of obsolescence

Hardware ages. End-of-life dates from vendors mean no more updates, no more support, no more replacement parts.

**Risks of obsolete hardware:**
- Unpatched vulnerabilities.
- Failure with no replacement available.
- Compatibility issues with newer software.
- Compliance failure (regulators expect supported hardware).

**Management practices:**
- **Lifecycle planning.** Tracked replacement schedule.
- **Vendor roadmaps.** Anticipating end-of-life dates.
- **Budget allocation.** Funds for refresh cycles.
- **Risk register.** Documenting accepted risk for unavoidable obsolete hardware.

For Nepali banks, NRB directives include requirements about maintaining supported hardware. The auditor verifies that critical systems are on supported platforms.

## 2.5 Disposal of equipment, problem management, change management

### Disposal of equipment

End-of-life hardware needs secure disposal. The risk: data on disposed equipment falling into adversary hands.

**Data sanitisation methods:**

- **Cryptographic erasure.** For encrypted drives, destroy the encryption key. Data is unrecoverable. Modern fastest method.
- **Software-based overwriting.** Tools (DBAN, Eraser, vendor secure-erase) overwrite drives with random or zero patterns. NIST SP 800-88 *Guidelines for Media Sanitization* defines clear, purge, and destroy levels.
- **Degaussing.** Magnetic erasure. Works for traditional magnetic media but not for SSDs.
- **Physical destruction.** Shredding, crushing, melting. Most secure for the most sensitive data.

**Documentation:** A certificate of destruction recording what was destroyed, by whom, by what method, on what date.

The audit examines:
- Asset disposal policy.
- Records of disposal events.
- Certificates from disposal vendors.
- Inventory updates after disposal.

The 2014 incident at the South Korean credit-card processor (where decommissioned servers ended up in the secondary market with customer data still on them) is a global cautionary case. Nepali organisations have not had publicly reported equivalents, but the underlying risk applies universally.

### Problem management

*Problem management is the IT-service-management process responsible for managing the lifecycle of problems — underlying causes of incidents — with the goal of preventing future incidents through root-cause analysis and permanent fixes.*

The distinction from incident management:
- **Incident management.** Restore service when something fails.
- **Problem management.** Identify and address why the failure happened.

ITIL frameworks structure problem management with stages: detection, logging, categorisation, prioritisation, investigation, root cause analysis, workaround, resolution, closure.

The auditor examines:
- Problem management policy.
- Records of problems identified, investigated, closed.
- Linkage to incidents.
- Trends and recurring problems.

### Change management

*Change management is the IT process that controls modifications to IT systems — software, hardware, configurations, infrastructure — through standardised procedures that minimise the risk of unintended impact, including impact assessment, approval, planning, testing, implementation, and post-implementation review.*

For banks and regulated industries, change management is one of the highest-risk control areas. Uncontrolled changes have caused major outages globally — the British Airways 2017 IT outage, the TSB Bank 2018 platform-migration disaster, and many others. Smaller-scale incidents in Nepali banks have been attributed to changes deployed without adequate testing.

**Change management process:**

1. **Change request.** Formal request specifying what will change and why.
2. **Impact analysis.** What systems, users, processes might be affected.
3. **Risk assessment.** What could go wrong; mitigation.
4. **Approval.** By appropriate authority (Change Advisory Board for significant changes).
5. **Testing.** In non-production environment.
6. **Implementation.** Following the plan; with rollback option.
7. **Verification.** Confirming the change worked.
8. **Documentation.** Recording what was done.
9. **Post-implementation review.** For major changes.

**Change classifications:**
- *Standard.* Pre-approved, routine, low-risk (e.g., password reset).
- *Normal.* Standard process; requires approval.
- *Emergency.* For urgent fixes; abbreviated process but still controlled.

The auditor examines:
- Change management policy.
- Sample of changes for completeness of documentation.
- Approvals for changes implemented.
- Emergency changes for after-the-fact review.
- Production-change-management compared to actual production state.

Common findings: emergency changes used inappropriately to bypass full review; changes implemented in production without testing; documentation lagging behind actual changes.

## 2.6 Network and communication issues

The network layer connects everything. From an audit perspective, several areas matter.

### Network architecture

**Segmentation.** Networks divided into zones (DMZ, internal, server-tier, user-tier, management) with controls between zones. Less segmentation = higher impact when something is compromised.

**Boundary controls.** Firewalls, web application firewalls, NAT, intrusion-prevention systems at the perimeter and at internal segment boundaries.

**Wireless networks.** Separation of guest and corporate networks; strong authentication (WPA2-Enterprise or WPA3); security monitoring.

**Remote access.** VPN for employee remote work; bastion hosts for administrative access; jump servers for sensitive operations.

**Cloud connectivity.** Direct connections (AWS Direct Connect, Azure ExpressRoute) for hybrid architectures; security implications.

### Network security controls

**Firewalls.** Stateful firewalls at perimeter and between segments. The auditor reviews rule sets, change history, and effectiveness testing.

**Intrusion detection/prevention.** Discussed in the Digital Forensics and IR subject.

**DDoS protection.** Especially relevant after the 2024 GIDC DDoS incident affecting Nepali government services.

**Encryption in transit.** TLS for web traffic, IPsec for VPN, SSH for administrative access. Strong cipher suites; certificate management.

**Network access control (NAC).** Verifying device compliance before allowing network access.

**DNS security.** DNSSEC, DNS filtering (blocking known malicious domains).

### Audit procedures

For network audit:
- Review of network architecture diagrams against actual configuration.
- Sample of firewall rules to verify business justification and approval.
- Review of remote-access mechanisms.
- Vulnerability scan of network devices.
- Review of encryption configuration on public-facing services.
- Sample of network device logs.

### Telecommunications

For Nepali organisations:
- **Internet connectivity.** Typically from major ISPs (NTC, Worldlink, Vianet, Subisu, others). Redundancy across providers is standard for critical operations.
- **MPLS or SD-WAN** for inter-branch connectivity (multi-branch banks, telecoms).
- **NPIX (Nepal Internet Exchange)** for peering — the national exchange operated by NREN.
- **International transit.** Through India primarily (TATA, Airtel, Reliance Jio), with some links via China and direct cable to Hong Kong.

The 2024 GIDC DDoS that took down 400+ government portals worked partly because of telecommunication-layer bottlenecks. Subsequent audit recommendations across the public sector emphasised DDoS-resistant connectivity design.

## 2.7 Overview of types of software and elements of software security

### Categories of software

**System software.** Operating systems, hypervisors, kernel modules. Foundational; high-privilege; security failures here have wide impact.

**Middleware.** Application servers, message queues, integration platforms, database management systems. Bridge between OS and applications.

**Application software.** End-user-facing software supporting business processes. Core banking, ERP, CRM, accounting, custom line-of-business systems.

**Utility software.** Support tools — backup, monitoring, antivirus, IT operations.

**Development tools.** Compilers, IDEs, version control, CI/CD platforms.

**Software components and libraries.** Open-source and commercial libraries integrated into applications.

**Mobile applications.** For employees and customers.

**Web applications.** Public-facing and internal.

**Embedded software.** In hardware appliances, IoT devices.

**Cloud-native services.** SaaS platforms; software components delivered as services.

### Elements of software security

Several properties combine to make software secure:

**Confidentiality.** Software handles sensitive data without leaking it.

**Integrity.** Software produces correct results; cannot be tampered with.

**Availability.** Software remains operational under expected load and adversarial conditions.

**Authentication.** Software verifies who is interacting with it.

**Authorisation.** Software enforces access rules.

**Audit and logging.** Software records security-relevant events.

**Input validation.** Software handles untrusted input safely. Most application vulnerabilities (SQL injection, cross-site scripting, command injection) are input-validation failures.

**Output encoding.** Software produces output that does not introduce vulnerabilities into consumers.

**Error handling.** Software fails safely; does not leak information through errors.

**Cryptography.** Software uses appropriate cryptographic mechanisms (Chapter 2 of the Cryptography subject).

**Configuration security.** Software is deployed with secure defaults.

**Patch management.** Software is kept current with security patches.

**Code quality.** Software is well-written, with security flaws minimised.

### Software security as a lifecycle concern

Software security is not added at the end. The **Secure Software Development Lifecycle (Secure SDLC)** integrates security into every phase:

| SDLC phase | Security activity |
|---|---|
| Requirements | Security requirements; threat modelling |
| Design | Security design review; architectural risk analysis |
| Development | Secure coding standards; code review |
| Testing | Security testing; SAST, DAST, penetration testing |
| Deployment | Security configuration; secrets management |
| Operations | Monitoring; patch management; incident response |
| Decommissioning | Data sanitisation; secure removal |

Chapter 6 returns to this through the lens of DevSecOps.

## 2.8 Control issues during installation and maintenance

### Installation controls

When new software is installed:

**Authorisation.** Was the installation approved through change management?

**Source verification.** Is the software from a legitimate source (vendor, internal build pipeline)? Hashes verified against vendor publications.

**Compatibility.** Does the software work with existing systems without unintended impact?

**Configuration.** Is it configured securely? Default credentials changed; unnecessary features disabled; access restricted appropriately.

**Documentation.** Is there a record of what was installed, by whom, when?

**Testing.** Has the installation been tested in non-production first?

### Maintenance controls

After installation, ongoing maintenance:

**Patch management.** Security patches applied within defined timelines. Critical patches within days; high-severity within weeks; others within a month.

**Vulnerability scanning.** Regular scans to identify missing patches and other vulnerabilities.

**Version management.** Supported versions used; end-of-life versions identified and replaced.

**Configuration drift.** Configuration matches the documented baseline; drift detected and corrected.

**Backup verification.** Backups taken; recoveries tested periodically.

**Performance monitoring.** Performance degradation that might indicate problems.

**Capacity management.** Resources adequate; growth planned.

**Documentation maintenance.** Records reflect current state.

### Audit procedures

For installation and maintenance:
- Review of installation policy and procedures.
- Sample of recent installations for compliance.
- Vulnerability scan results review.
- Patch level verification across sample systems.
- Change records cross-referenced to installations.

A common finding: patches applied to test systems but not consistently rolled out to production; or patches applied broadly but not for specific critical applications; or backups taken but never tested for restorability.

## 2.9 Licensing issues and ICT procurement practice

### Licensing

Software licensing has direct legal and financial implications. Unlicensed software is illegal use; over-licensed deployment is wasted spend; under-licensed deployment is non-compliance exposing the organisation to penalties and reputational damage.

**Types of licences:**

- **Per-user.** Number of named or concurrent users.
- **Per-device.** Per workstation, per server, per CPU.
- **Per-core or per-processor.** Common for databases (Oracle, SQL Server).
- **Per-instance.** For software running on virtual or cloud infrastructure.
- **Site licence.** Unlimited use within an organisation.
- **Subscription.** Time-bound use, typically renewed annually.
- **Open-source.** Various open-source licences (MIT, Apache, GPL, BSD) with their own terms.

**Audit considerations:**

- **Inventory.** What software is installed; what licences are held.
- **Compliance.** Is installation within licensed limits?
- **Audit clauses.** Many vendor contracts include audit-right clauses; the organisation must be prepared for vendor licence audits.
- **Open-source compliance.** GPL-licensed code in commercial products has obligations; failure to comply can expose source code requirements.
- **Cost optimisation.** Are licences being used efficiently?

For Nepali organisations, software licence audit is increasingly a separate audit theme. Vendors (Microsoft, Oracle, Adobe, Autodesk, SAP, others) conduct customer licence audits. Internal audit work that anticipates vendor audits prevents surprises.

### Procurement practice

ICT procurement involves the buying of hardware, software, and services. The auditor examines:

**Procurement policy.** Documented procedures; approval levels; vendor selection criteria.

**Vendor evaluation.** Due diligence on vendors — financial stability, technical capability, security posture, references. Particularly important for vendors with access to organisation systems or data.

**Contract terms.** Service-level agreements, security requirements, audit rights, data handling, termination, breach notification, indemnification.

**Competitive process.** For public sector and for organisations with internal policy, multiple quotations or formal tendering.

**Approval.** Appropriate authority based on value.

**Conflict of interest.** Disclosed and managed.

**Documentation.** Complete records.

**Performance management.** Ongoing vendor evaluation against SLA.

For Nepali public-sector procurement, the **Public Procurement Act 2063 (2007)** and the **Public Procurement Regulations 2064 (2007)** define the legal framework. ICT procurement above defined thresholds requires open competitive tendering through the **e-Procurement Portal** (Government of Nepal's PPMO — Public Procurement Monitoring Office).

For private-sector regulated entities (banks, telecoms), internal procurement policies must align with NRB/NTA directives, particularly for vendors with access to customer data or critical systems.

### Vendor risk management

A specialised aspect of procurement. Vendors with significant access introduce risk:

- **Cloud providers.** Discussed in the Forensics subject's cloud chapter and in Chapter 6 of this subject.
- **MSPs/MSSPs.** Managed service providers with deep access.
- **Software vendors.** With access for support and updates.
- **Outsourced operations.** Call centres, data processing, payment processing.

NRB directives require comprehensive vendor risk management for banks. The audit examines:
- Vendor inventory with risk ratings.
- Due diligence documentation.
- Contract security terms.
- Performance reviews.
- SOC 2 or equivalent reports from vendors.
- Exit strategies for critical vendors.

A common finding in Nepali bank audits: vendors with significant access lacking adequate documentation; SOC 2 reports either not obtained or not reviewed; vendor risk ratings not updated; no exit strategy for critical providers (raising concentration risk).

The next chapter turns from the operational concerns of hardware and software to the analytical foundation of the audit: the risk and control framework that determines what the audit examines and how.
