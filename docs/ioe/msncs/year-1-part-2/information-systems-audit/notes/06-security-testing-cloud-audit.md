---
title: 'Chapter 6 — Security Testing and Cloud Computing Audit'
sidebar_label: 'Ch 06 — Security Testing and Cloud Computing Audit'
sidebar_position: 6
description: 'Chapter 6 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch06
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The previous chapters have built up the audit framework — what an audit is, what controls it examines, what evidence supports findings, how the audit is conducted, and how business continuity is verified. This final chapter brings two contemporary practice areas into the audit picture: technical security testing (vulnerability assessment, penetration testing, secure software development practices, OWASP-aligned application security) and cloud audit. Both are domains where the audit has shifted in recent years — driven by the changing threat landscape, the migration to cloud, and the integration of security into modern software-delivery pipelines.

## 6.1 Cybersecurity and the global cybersecurity landscape

### Cybersecurity

*Cybersecurity is the practice of protecting information systems, networks, applications, and data from digital attack, unauthorised access, and damage, encompassing the technologies, processes, and people that together defend against the full range of cyber threats.*

The discipline overlaps with information security but emphasises the digital, networked dimension. Where information security addresses all information assets (including paper), cybersecurity focuses on systems and the threats targeting them.

### The threat landscape

The threat landscape evolves rapidly. As of 2026, several themes dominate.

**Ransomware.** Encrypts victim data and demands payment for decryption. Continues to be the dominant financial-cybercrime category. Groups operate on a ransomware-as-a-service model, with affiliates conducting attacks using shared tooling. Notable groups through 2024-25 — LockBit (disrupted by international law-enforcement action in February 2024), BlackCat/ALPHV, Akira, Cl0p, Black Basta, Play, RansomHub. New groups emerge as old ones rebrand or split.

**Nation-state attacks.** Strategic actors conducting espionage, sabotage, or strategic positioning. Groups associated with major powers (named by analysts as APT groups — APT28, APT29, APT41, Lazarus Group, and many others) operate against government, defence, energy, and high-value commercial targets.

**Supply chain attacks.** Compromising widely-used software or vendors to reach many downstream victims. The 2020 SolarWinds incident set the model; subsequent incidents (Kaseya, 3CX, MOVEit) have reinforced supply chain as a major attack vector.

**Credential theft and account takeover.** Stolen credentials remain the most common initial-access vector in attacks. Information-stealer malware (Lumma, RedLine, Vidar, Raccoon, and many others) harvests credentials at scale, feeding criminal marketplaces.

**Business Email Compromise (BEC).** Fraudulent emails impersonating executives or vendors to redirect payments. High financial impact with relatively simple technical methods.

**Cyber-physical attacks.** Targeting industrial control systems, healthcare devices, transportation, energy. Lower volume than IT-only attacks but higher potential impact.

**AI-enabled attacks.** Through 2024-26, the use of AI for phishing content, voice cloning, deepfake media, and reconnaissance has shifted from emerging concern to operational reality. Defenders use AI as well — for detection, for automation, for analysis.

### Nepal in the global threat picture

Nepali organisations face the same threats as those elsewhere, with some local characteristics:

**Banking-trojan APKs.** Distributed through SMS phishing and unofficial Android app stores, targeting users of eSewa, Khalti, IME Pay, and mobile-banking apps. Reports increased through 2023-25.

**Phishing.** Targeting employees of banks, telcos, government agencies. Phishing-delivered ransomware and credential theft is common.

**DDoS attacks.** The 2024 GIDC DDoS that took 400+ government portals offline was the most-visible such incident; smaller-scale DDoS continues to be observed.

**Data breaches.** Foodmandu (2020, ~50,000 records), Vianet (2020, ~170,000 records), Ministry of Education (2025, student and employee PII), Nepal Police website (late 2025, 2 million+ records claimed by attackers) — a recurring pattern in the public discourse.

**Critical-infrastructure incidents.** The 2017 NIC Asia SWIFT incident demonstrated that Nepali financial infrastructure is in the threat picture for sophisticated criminal actors.

**Regional context.** Cyber threats from Indian, Chinese, and other regional actors are part of the picture, though attribution is rarely publicly confirmed by Nepali authorities.

### National response capability

**npCERT (National CERT)** under the National Information Technology Centre serves as Nepal's national CERT. Capabilities include coordination of major incidents, advisories, and international liaison.

**Cybercrime Bureau under Nepal Police** handles cybercrime investigation. Caseload has grown substantially through 2020-25; the Bureau publishes annual statistics showing thousands of complaints, dominated by online fraud and harassment.

**Sectoral capability.** Major banks operate Security Operations Centres (SOCs) — typically in partnership with regional MSSPs. Telecoms operate their own SOCs. Government agencies vary widely; the Government Integrated Data Centre has security operations but resourcing has been a constraint.

**Coordination.** The Ministry of Communications and Information Technology and the National Information Technology Centre share national-level coordination roles. Banking-sector cooperation through industry groups is informal but growing.

### Frameworks for understanding the landscape

Several frameworks help structure cybersecurity thinking:

**NIST Cybersecurity Framework.** Discussed in Chapter 1. The six-function structure (Govern, Identify, Protect, Detect, Respond, Recover) organises capability building.

**MITRE ATT&CK.** A knowledge base of adversary tactics and techniques. Used for detection engineering, red-team exercises, and incident analysis. The ATT&CK matrix is referenced by virtually all serious security tooling in 2026.

**Cyber Kill Chain.** Lockheed Martin's seven-step model of attacker behaviour (Reconnaissance, Weaponisation, Delivery, Exploitation, Installation, Command & Control, Actions on Objectives). Older than ATT&CK but still cited.

**Diamond Model of Intrusion Analysis.** Four-element framework (adversary, capability, infrastructure, victim) for characterising intrusions.

**FAIR (Factor Analysis of Information Risk).** Quantitative risk-analysis framework increasingly used in cybersecurity risk assessment.

These frameworks shape how an IS auditor evaluates an organisation's cybersecurity posture.

## 6.2 Vulnerability assessment and penetration testing (VAPT)

VAPT is the combination of two related but distinct activities. They are often packaged together but serve different purposes.

### Vulnerability assessment

*A vulnerability assessment is the systematic identification, quantification, and prioritisation of vulnerabilities in an information system, conducted through automated scanning and manual inspection, with the goal of producing a comprehensive list of weaknesses that the organisation can remediate.*

The output of a vulnerability assessment is a list — typically hundreds or thousands of vulnerabilities — with severity ratings, descriptions, and recommended remediation.

**Common tools:**

- **Nessus** (Tenable). The market-leading commercial vulnerability scanner.
- **Qualys VMDR.** Cloud-based vulnerability management.
- **OpenVAS / GVM (Greenbone).** Open-source alternative.
- **Rapid7 InsightVM (formerly Nexpose).**
- **Microsoft Defender Vulnerability Management.**
- **Nikto.** Open-source web-server-focused scanner.

A scanner typically:
1. Discovers hosts on a network.
2. Identifies services running on each host.
3. Probes services for known vulnerabilities (matched against CVE databases, vendor advisories, plugin definitions).
4. Reports findings with CVSS (Common Vulnerability Scoring System) scores.

**Limitations.** Scanners produce false positives. They miss vulnerabilities that require authentication or business-logic understanding. They cannot evaluate whether a vulnerability is exploitable in context — a vulnerability behind compensating controls may be lower risk than its CVSS score suggests.

### Penetration testing

*Penetration testing is the simulated attempt by an authorised tester to breach an organisation's defences using the same techniques as a real attacker, going beyond identifying vulnerabilities to actually exploiting them, with the goal of demonstrating real-world impact and discovering issues that scanning alone cannot reveal.*

The pen tester is, in effect, a contracted attacker — operating under written authorisation, on a defined scope, with documented rules of engagement.

**Pen-test phases:**

1. **Pre-engagement.** Scope, rules of engagement, authorisation letters, contact protocols.
2. **Reconnaissance.** Information gathering about the target (passive and active).
3. **Scanning and enumeration.** Identifying services, accounts, configurations.
4. **Vulnerability identification.** Finding exploitable weaknesses.
5. **Exploitation.** Demonstrating the impact by actually exploiting.
6. **Post-exploitation.** What can the attacker do with the access gained — lateral movement, privilege escalation, data access.
7. **Reporting.** Findings with technical detail, business impact, remediation.
8. **Retest.** After remediation, verify fixes.

**Test perspectives:**

- **External pen-test.** From the internet, no insider knowledge. Tests perimeter defences.
- **Internal pen-test.** From inside the network. Tests assumes-breach-or-insider scenarios.
- **Web application pen-test.** Specific to web applications.
- **Mobile application pen-test.** Specific to iOS and Android applications.
- **Wireless pen-test.** WiFi networks and connected devices.
- **Social engineering test.** Phishing simulations, pretext calls.
- **Physical pen-test.** Attempting physical access to facilities.

**Test knowledge levels:**

- **Black-box.** Tester has no inside information.
- **White-box / crystal-box.** Tester has full information.
- **Grey-box.** Tester has limited information (typical setup).

### Standards and methodologies

Several methodologies guide pen testing:

**OSSTMM (Open Source Security Testing Methodology Manual).** ISECOM's methodology. Comprehensive; defines tests across multiple channels.

**PTES (Penetration Testing Execution Standard).** Practitioner-developed standard. Covers the full lifecycle.

**NIST SP 800-115.** US guide for technical security testing. Methodology and recommendations.

**OWASP Testing Guide.** Specific to web application testing. Discussed below.

**PCI-DSS Pen-test Guidance.** Requirements for payment-card environments.

### VAPT vs related activities

| Activity | Goal | Output |
|---|---|---|
| Vulnerability assessment | Identify weaknesses | List of vulnerabilities |
| Penetration test | Exploit weaknesses; demonstrate impact | Demonstrated impact; root causes |
| Red team exercise | Test detection and response | Adversary-simulation findings |
| Blue team exercise | Test defensive operations | Defender-readiness assessment |
| Purple team | Integrated red/blue collaboration | Improved detections |
| Bug bounty | Continuous external testing | Stream of discovered issues |

VAPT typically combines the first two. Larger organisations may operate red, blue, and purple team programmes as well.

### VAPT in Nepal

Nepal Rastra Bank directives require periodic VAPT for banks:
- Annual external penetration tests for internet-facing systems.
- Application-level VAPT before major releases of customer-facing systems.
- Internal vulnerability assessment cycles.
- Remediation tracking with regulator reporting for material findings.

VAPT services are provided by:
- Local specialist firms (Daffodil Cybersecurity, Pentester Nepal, Eminence Ways, OneCover, RiskSense Nepal, others).
- Big Four consultancies' India / regional teams.
- International specialist firms for high-end engagements.

For an MSc student, VAPT is a practical career path. The CEH (Certified Ethical Hacker), OSCP (Offensive Security Certified Professional), and CRTP/CRTE certifications are common credentials. Hands-on practice through HackTheBox, TryHackMe, PortSwigger Web Security Academy, and CTF events builds skill.

## 6.3 Secured software development testing, DevOps and DevSecOps

### Secure Software Development Lifecycle (Secure SDLC)

Briefly discussed in Chapter 2. Security integrated into every SDLC phase rather than added at the end.

The **shift-left** principle: catch security issues early. A bug fixed during requirements review costs little; the same bug in production after deployment costs much more.

### DevOps

*DevOps is the cultural and technical movement that integrates software development (Dev) and IT operations (Ops) into collaborative, rapid-cycle, automated software-delivery practices, characterised by continuous integration, continuous deployment, infrastructure as code, and observability across the development-to-production lifecycle.*

DevOps emerged in the late 2000s in response to the friction between development teams pushing changes and operations teams resisting them. Key practices:

- **Continuous Integration (CI).** Developers integrate code changes frequently; automated builds and tests catch problems early.
- **Continuous Delivery / Deployment (CD).** Changes that pass tests are automatically deployable / deployed.
- **Infrastructure as Code (IaC).** Infrastructure defined in code (Terraform, CloudFormation, Pulumi), version-controlled, automated.
- **Automation.** Manual steps replaced with automated pipelines.
- **Observability.** Comprehensive monitoring, logging, tracing.
- **Microservices.** Applications broken into independently-deployable services.
- **Containers.** Standardised deployment units (Docker, OCI).
- **Kubernetes.** Container orchestration platform.

### DevSecOps

*DevSecOps is the integration of security practices into DevOps workflows, embedding security checks, controls, and feedback throughout the software-delivery lifecycle so that security keeps pace with the speed of development and deployment, rather than acting as a separate, slower function.*

The "Sec" in the middle reflects security's positioning — integrated throughout, not bolted on.

**DevSecOps practices:**

- **Security as code.** Security policies, controls, and configurations expressed in code, version-controlled.
- **Security testing in the pipeline.** Static analysis, dependency scanning, secret scanning, container scanning, infrastructure scanning — all automated in the CI/CD pipeline.
- **Shift left.** Security feedback to developers as they write code.
- **Shared responsibility.** Developers, operations, and security work together; not security as a separate guardian.
- **Continuous monitoring.** Security observability in production complementing pre-production testing.

### Security testing tools in the pipeline

Several categories of automated testing:

**Static Application Security Testing (SAST).**
*SAST is the testing of application source code without executing it, scanning the code for known security weakness patterns (insecure functions, injection vulnerabilities, hardcoded secrets), typically run early in the development pipeline.*

Tools: SonarQube (with security plugins), Checkmarx, Veracode, Fortify, Semgrep, Snyk Code.

**Dynamic Application Security Testing (DAST).**
*DAST is the testing of running applications by sending crafted requests and observing responses to find runtime vulnerabilities, typically run against deployed applications in test environments.*

Tools: OWASP ZAP, Burp Suite, Acunetix, Nessus Web Application Scanner.

**Interactive Application Security Testing (IAST).**
*IAST combines static and dynamic analysis by instrumenting the running application and observing both the code execution and the behaviour, finding issues that pure SAST or pure DAST might miss.*

Tools: Contrast Security, Synopsys Seeker.

**Software Composition Analysis (SCA).**
*SCA identifies the open-source components in an application and checks them against known vulnerability databases, addressing the supply-chain risk that comes from third-party libraries.*

Tools: Snyk, OWASP Dependency-Check, GitHub Dependabot, Mend (formerly WhiteSource), Black Duck.

**Container scanning.**
Tools: Trivy, Anchore, Snyk Container, Aqua Security, Sysdig Secure.

**Infrastructure as Code scanning.**
Tools: Checkov, tfsec, Snyk IaC, Bridgecrew.

**Secret scanning.**
Tools: TruffleHog, GitLeaks, GitHub Secret Scanning.

### Pipeline integration

A modern CI/CD pipeline with security might look like:

```
Developer commits code
        ↓
Pre-commit hooks (lint, format, basic secret scan)
        ↓
Build server (compile, unit tests, SAST, SCA)
        ↓
Container build (image scanning)
        ↓
Deploy to test environment (DAST, IAST)
        ↓
Manual review (where required)
        ↓
Deploy to staging (security regression tests)
        ↓
Deploy to production (continuous monitoring)
```

Each step has security gates. Failures stop the pipeline; teams resolve issues before progress.

### Audit considerations for DevSecOps

The IS auditor evaluates whether DevSecOps practices are in place and effective:

- Security tools integrated in the pipeline.
- Failed-test threshold policies (what level of finding stops the pipeline).
- Documentation of security exceptions.
- Coverage — which applications go through the pipeline.
- Triage and remediation of findings.
- Continuous learning — false positives addressed, new test patterns added.
- Skills — developers trained in secure coding.
- Production monitoring complementing pre-production testing.

For Nepali banks, NRB directives now reference secure-SDLC and DevSecOps practices. Banks implementing modern delivery pipelines must demonstrate that security has not been compromised in the speed-up.

## 6.4 OWASP — Open Worldwide Application Security Project

### OWASP

*The Open Worldwide Application Security Project is a non-profit foundation that works to improve the security of software through community-led open-source projects, providing free resources, tools, documentation, and standards that have become reference points for application security across the industry.*

OWASP was founded in 2001. Through community contributions over two decades, it has produced some of the most-cited resources in application security.

### OWASP Top 10

The flagship resource — a periodically-updated list of the most critical web application security risks. Updates are typically every 3-4 years.

**OWASP Top 10 — 2021 edition (current):**

1. **A01 — Broken Access Control.** Failures in restricting what users can access. Most common category.
2. **A02 — Cryptographic Failures.** Weaknesses in cryptographic implementations (formerly "Sensitive Data Exposure").
3. **A03 — Injection.** Including SQL injection, NoSQL injection, OS command injection, LDAP injection.
4. **A04 — Insecure Design.** New category in 2021 — flaws in design rather than implementation.
5. **A05 — Security Misconfiguration.** Insecure default configurations; missing security headers; unnecessary features enabled.
6. **A06 — Vulnerable and Outdated Components.** Using components with known vulnerabilities.
7. **A07 — Identification and Authentication Failures.** Weak authentication, session management.
8. **A08 — Software and Data Integrity Failures.** New in 2021 — integrity failures in software supply chain, CI/CD, data.
9. **A09 — Security Logging and Monitoring Failures.** Inadequate logging or monitoring.
10. **A10 — Server-Side Request Forgery (SSRF).** Server can be tricked into making requests to attacker-chosen destinations.

The Top 10 is a baseline — vulnerabilities discovered in real applications still cluster around these categories.

### Other OWASP resources

**OWASP API Security Top 10.** Variant focused on APIs (REST, GraphQL, gRPC). Updated in 2023.

**OWASP Mobile Top 10.** Variant focused on mobile applications.

**OWASP ASVS (Application Security Verification Standard).** Detailed requirements for application security at three levels (basic, standard, advanced). Used as audit criteria.

**OWASP SAMM (Software Assurance Maturity Model).** Maturity model for application security programmes.

**OWASP Testing Guide.** Comprehensive web-application testing methodology. Reference for pen testers.

**OWASP Cheat Sheet Series.** Concise, focused guidance on specific topics (input validation, session management, password storage, many others).

**OWASP ZAP (Zed Attack Proxy).** Open-source DAST tool. The OWASP project's flagship tool.

**OWASP Dependency-Check.** SCA tool.

**OWASP Threat Dragon.** Threat modelling tool.

**Many other projects** covering specific languages, platforms, security topics.

### Audit use of OWASP

OWASP resources are used by IS auditors in several ways:

- **Audit criteria.** OWASP Top 10 and ASVS as benchmarks against which applications are evaluated.
- **Test guidance.** OWASP Testing Guide structures pen-test work.
- **Maturity assessment.** OWASP SAMM benchmarks programme maturity.
- **Tool selection.** OWASP tools used in audit work.

For an MSc student, working through OWASP resources is fundamental application-security education. The materials are free, comprehensive, and updated regularly.

## 6.5 Security testing tools

A consolidated view of the security testing tooling that an IS auditor and security tester encounters.

### Vulnerability scanners

| Tool | Type | Notes |
|---|---|---|
| Nessus | Commercial | Market-leading network vulnerability scanner |
| Qualys VMDR | Commercial cloud | SaaS vulnerability management |
| OpenVAS / GVM | Open-source | Free alternative to Nessus |
| Rapid7 InsightVM | Commercial | Strong reporting and integration |
| Nikto | Open-source | Web-server-focused |
| Nuclei | Open-source | Template-based; fast |

### Web application testing

| Tool | Type | Notes |
|---|---|---|
| Burp Suite | Commercial / Free | Industry-standard interception proxy |
| OWASP ZAP | Open-source | OWASP's flagship DAST |
| sqlmap | Open-source | Automated SQL injection |
| wfuzz, ffuf | Open-source | Web fuzzing |
| nuclei | Open-source | Templated vulnerability scanning |
| commix | Open-source | Command injection testing |

### Network and infrastructure testing

| Tool | Type | Notes |
|---|---|---|
| Nmap | Open-source | Network discovery and service enumeration |
| Masscan | Open-source | Fast port scanner for large networks |
| Wireshark | Open-source | Packet analysis (Chapter 4 of forensics) |
| tcpdump | Open-source | Command-line packet capture |
| Metasploit Framework | Open-source / commercial | Exploitation framework |
| Cobalt Strike | Commercial | Adversary simulation (note: also used by attackers) |
| Empire / PowerShell Empire | Open-source | Post-exploitation framework |

### Password and credential testing

| Tool | Type | Notes |
|---|---|---|
| John the Ripper | Open-source | Password cracking |
| Hashcat | Open-source | GPU-accelerated cracking |
| Hydra | Open-source | Network service brute force |
| Responder | Open-source | LLMNR/NBT-NS poisoning |

### Wireless testing

| Tool | Type | Notes |
|---|---|---|
| Aircrack-ng | Open-source | WiFi auditing suite |
| Kismet | Open-source | Wireless detection and analysis |
| Wifite | Open-source | Automated WiFi attacks |

### Specialised platforms

**Kali Linux.** Penetration-testing Linux distribution. Pre-loaded with hundreds of tools. The de facto standard pen-tester platform.

**Parrot Security OS.** Alternative to Kali; similar tool set.

**BlackArch Linux.** Arch-based pen-testing distribution.

**REMnux.** Malware analysis (Chapter 7 of forensics).

### Static and dynamic analysis (development-focused)

| Tool | Type | Use |
|---|---|---|
| SonarQube | Open-source / commercial | SAST, code quality |
| Semgrep | Open-source | SAST with custom rules |
| CodeQL | Free for open-source / commercial | Query-based code analysis |
| Snyk | Commercial | SCA, container, IaC |
| Trivy | Open-source | Container and IaC scanning |
| Checkov | Open-source | IaC scanning |

### Selecting tools

Tool choice depends on:
- **Engagement type.** Network pen-test vs web pen-test vs cloud audit.
- **Skill level.** Some tools have steep learning curves.
- **Licence cost.** Commercial vs open-source.
- **Integration.** Tools that fit existing toolchain.
- **Output format.** Compatibility with reporting requirements.
- **Authorisation.** Some tools are dual-use (attacker and defender); their use may be restricted.

For Nepali audit firms, the typical pen-tester toolkit centres on Kali Linux with Burp Suite (often the commercial Professional edition), Nessus, and a range of open-source tools. Cloud audit toolkits add cloud-native tools (Scout Suite, Prowler, AWS Inspector / Trusted Advisor / Audit Manager).

## 6.6 Cloud audit considerations

The Digital Forensics subject covered cloud forensics. This section addresses cloud audit specifically — the IS auditor's perspective on auditing cloud environments.

### Cloud audit

*Cloud audit is the application of IS audit principles and procedures to cloud-computing environments, examining whether cloud services are configured securely, used appropriately, and supported by adequate controls — adapting traditional audit techniques to address the distinct characteristics of cloud (shared responsibility, ephemerality, multi-tenancy, API-driven access).*

### Why cloud audit is different

Traditional IS audit examines systems the organisation runs. Cloud audit examines systems the organisation uses on infrastructure run by someone else.

Key differences:

- **Shared responsibility.** Some controls are the provider's; some are the customer's. The audit must distinguish.
- **API-driven.** Cloud configuration is managed via APIs; configuration sprawl is common.
- **Ephemeral resources.** Infrastructure that exists for minutes or hours.
- **Multi-region complexity.** Resources may span regions and jurisdictions.
- **Identity and access management complexity.** Cloud IAM is rich and often misconfigured.
- **Service breadth.** Major cloud providers offer hundreds of services; each has its own audit considerations.

### Shared responsibility revisited

The standard model:

| Layer | IaaS | PaaS | SaaS |
|---|---|---|---|
| Data | Customer | Customer | Customer |
| Endpoints | Customer | Customer | Customer |
| Account & access | Customer | Customer | Customer |
| Identity | Customer | Customer | Customer |
| Application | Customer | Shared | Provider |
| OS | Customer | Provider | Provider |
| Network controls | Shared | Provider | Provider |
| Host infrastructure | Provider | Provider | Provider |
| Physical infrastructure | Provider | Provider | Provider |

The auditor's work focuses on customer-responsibility areas. For provider-responsibility areas, the auditor relies on:
- **SOC 2 reports** from the provider.
- **ISO 27001 certification** of the provider.
- **CSA STAR (Security, Trust, Assurance, Risk) registry** entries.
- **Contractual commitments** from the provider.

### Cloud audit framework

**Cloud Security Alliance (CSA) Cloud Controls Matrix (CCM)** is the dominant cloud-specific audit framework. The CCM organises controls into 17 domains covering all major cloud audit areas. CSA's **STAR** programme provides a public registry of provider self-attestations, third-party assessments, and continuous monitoring.

**CIS Benchmarks for AWS, Azure, GCP** provide detailed configuration standards. Used both for hardening and as audit criteria.

**Provider-specific frameworks.** AWS Well-Architected Framework, Azure Well-Architected Framework, Google Cloud Architecture Framework — each provides guidance on best practices.

### Audit areas in cloud

A comprehensive cloud audit examines:

**Identity and access management.**
- Account inventory.
- Privileged access management.
- MFA enforcement.
- Cross-account access policies.
- Service-to-service authentication.
- Identity federation with on-premises.

**Resource configuration.**
- Compute instances hardened to standards.
- Storage encrypted at rest.
- Network segmentation appropriate.
- Logging enabled.
- Public exposure minimised.

**Data protection.**
- Data classification applied.
- Encryption keys managed appropriately.
- Backup and retention policies.
- Cross-region considerations.

**Network security.**
- Virtual private cloud (VPC) configurations.
- Network ACLs and security groups.
- VPN and direct-connect security.
- DDoS protection.

**Logging and monitoring.**
- Audit logs enabled (CloudTrail for AWS, Activity Log for Azure, Cloud Audit Logs for GCP).
- Log retention adequate.
- Security monitoring active.
- Alerts configured.

**Incident response.**
- Cloud-specific procedures defined.
- Investigation capability (cloud forensics — see the Forensics subject).
- Containment options understood.

**Cost and resource governance.**
- Spending controls.
- Tag policies enforced.
- Unused resources cleaned up.

**Compliance.**
- Data residency requirements met.
- Regulatory frameworks addressed.
- Provider attestations reviewed.

### Cloud-specific audit tools

**AWS-specific.**
- **AWS Config.** Tracks resource configuration over time.
- **AWS Audit Manager.** Pre-built audit templates for various frameworks.
- **AWS Security Hub.** Aggregated findings.
- **AWS Trusted Advisor.** Best-practice recommendations.
- **AWS Inspector.** Vulnerability assessment.

**Azure-specific.**
- **Microsoft Defender for Cloud.** Security posture and threat detection.
- **Azure Policy.** Configuration enforcement.
- **Azure Sentinel.** Cloud-native SIEM.
- **Microsoft Purview.** Data governance.

**GCP-specific.**
- **Security Command Center.** Centralised security findings.
- **Cloud Audit Logs.** Comprehensive audit logging.
- **Google Recommender.** Best-practice suggestions.

**Cross-provider.**
- **Scout Suite.** Open-source multi-cloud auditing.
- **Prowler.** AWS, Azure, GCP, M365 auditing.
- **CloudSploit.** Cloud security scanning.
- **Wiz, Orca, Lacework, Tenable Cloud Security, Microsoft Defender for Cloud, Palo Alto Prisma Cloud.** Commercial CSPM (Cloud Security Posture Management) platforms.

### A worked cloud audit example

Auditing a Nepali bank's AWS environment in Mumbai region (ap-south-1):

**Scope.** All AWS resources in the bank's accounts; period of one year ending audit start date.

**Procedures:**

1. **Account inventory.** Enumerate all AWS accounts, with ownership and purpose. Verify alignment with AWS Organisations structure.
2. **IAM audit.** Run Prowler / Scout Suite. Review IAM users, roles, policies. Verify MFA, least privilege, no long-lived access keys for users.
3. **Service usage.** Enumerate services in use across accounts. Identify any unexpected services (suggesting unauthorised provisioning).
4. **Configuration audit.** AWS Config or CIS-CAT against CIS AWS Benchmark. Identify deviations.
5. **CloudTrail review.** Verify CloudTrail enabled, all regions, log-file validation enabled, logs delivered to a centralised account with appropriate retention.
6. **VPC review.** Network segmentation; security group rules (especially permissive ones); flow logs.
7. **Storage audit.** S3 bucket configurations — public exposure, encryption, versioning, logging, object lock for critical buckets.
8. **Database audit.** RDS instances — encryption, backup, multi-AZ, public accessibility.
9. **Compute audit.** EC2 instances — patching, security groups, IAM roles, encryption.
10. **Threat detection.** GuardDuty enabled and configured; findings reviewed.
11. **Logging.** CloudWatch Logs collected from key services with appropriate retention.
12. **Backup.** AWS Backup or equivalent for critical resources; cross-region copying.
13. **Cost governance.** Budgets; cost-allocation tags; reservation utilisation.
14. **Compliance review.** Mapping to NRB directives, ISO 27001, CIS Controls.

**Common findings in Nepal bank cloud audits:**
- IAM users with administrative privileges and no MFA.
- S3 buckets with public read access.
- Security groups allowing 0.0.0.0/0 on administrative ports.
- CloudTrail not enabled in all regions.
- KMS key rotation disabled.
- Backup procedures untested.
- Cross-account access policies overly permissive.
- Lack of network segmentation between application tiers.

Each finding becomes a recommendation. Severity ratings drive prioritisation. Management responses commit to remediation.

### NRB directives on cloud usage

NRB has issued guidance and directives on cloud computing usage by Nepali banks. The provisions cover:

- **Data residency.** Restrictions on what data may leave Nepal; specific provisions for what may go to which jurisdictions.
- **Approved use cases.** Categories of workloads that may use cloud; categories that may not.
- **Vendor due diligence.** Required assessments before using a cloud provider.
- **Contractual terms.** Required clauses (audit rights, data handling, breach notification, exit assistance).
- **Audit access.** Right to audit, or to receive SOC reports from the provider.
- **Reporting.** Notification to NRB of cloud-related incidents.

The specific provisions are updated periodically; an auditor working on cloud audit at a Nepali bank must reference the current directive set.

### Regional cloud-usage patterns

For Nepali organisations, cloud usage has grown substantially:

- **AWS Mumbai (ap-south-1)** is the primary AWS region for Nepali workloads — closest, lowest latency, generally compliant with Nepali data-residency considerations.
- **Azure South India / Central India / South East Asia.** Used by organisations with Microsoft estates.
- **GCP Mumbai / Singapore.** GCP usage growing, particularly for data analytics and Workspace.
- **Local cloud and managed services.** Government Integrated Data Centre, various private-sector cloud-style offerings.

The audit must understand where workloads run, what data is involved, and what regulatory constraints apply.

### Limitations of cloud audit

Several inherent limitations:

- **Provider opacity.** What happens inside the provider's infrastructure is not directly auditable by the customer.
- **Velocity of change.** Cloud configurations change rapidly; point-in-time audit is quickly stale.
- **Tool coverage gaps.** Audit tools always lag behind new services from providers.
- **Skill scarcity.** Cloud audit skills are in short supply.
- **Provider reliance.** Some controls can only be evidenced through provider attestations.

Cloud audit is therefore typically continuous — ongoing scanning, ongoing review — rather than annual point-in-time. The CSPM platforms reflect this shift, providing continuous compliance dashboards rather than periodic audit reports.

### Audit reporting for cloud

Cloud audit reports follow the structure of other IS audit reports (Chapter 4) but with cloud-specific content:

- Cloud provider(s) covered.
- Accounts/subscriptions/projects in scope.
- Services in use.
- Configuration findings with reference to CIS Benchmarks or other criteria.
- IAM findings.
- Logging and monitoring assessment.
- Compliance with applicable frameworks.
- Cost and resource governance.
- Recommendations with cloud-specific actions.

For an MSc graduate entering an audit career in 2026, cloud audit competency is increasingly essential. The combination of AWS Solutions Architect or equivalent certification with CISA credential creates strong career positioning for the IT audit job market.

### Looking forward

The audit discipline continues to evolve. Several themes shape the immediate future:

**AI and machine learning systems.** Increasingly used by audited organisations; raising new audit questions about training data, model validation, bias, explainability. Frameworks like ISO/IEC 42001 (AI management systems, 2023) are entering the audit picture.

**Cyber-physical systems.** IoT, operational technology, building automation. Distinct audit considerations.

**Privacy regulation.** Global tightening; sector-specific requirements.

**Continuous audit.** Move from periodic to continuous coverage enabled by automation.

**Audit data analytics.** Heavier use of analytics over entire populations rather than samples.

**Cloud-native operations.** Continuing migration; audit follows.

The MSc graduate who builds foundational skills now — in audit methodology, in technology, in risk management, in communication — is positioned for a career that will evolve through their working lifetime. The frameworks taught in this course are the foundation; the specific tools and techniques will change repeatedly, but the underlying discipline of independent, evidence-based, risk-aware evaluation remains constant.
