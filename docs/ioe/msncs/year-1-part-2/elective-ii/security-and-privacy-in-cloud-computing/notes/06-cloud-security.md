---
title: 'Chapter 6 — Cloud Security'
sidebar_label: 'Ch 06 — Cloud Security'
sidebar_position: 6
description: 'Chapter 6 of Security and Privacy in Cloud Computing (ENCTNS571).'
slug: /ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing/notes/ch06
tags: [msncs, ENCTNS571, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The previous chapters built up the foundation, architecture, management disciplines, data privacy, and operational practices for cloud security and privacy. This final chapter brings everything together into the specific cloud-security disciplines as a coherent practice: the challenges and risks that characterise cloud, the security of SaaS applications, security monitoring, the design of security architecture, data security, application security, virtual-machine security, and identity management and access control. Many topics overlap with earlier chapters; this chapter brings them into focus as part of the unified cloud-security discipline.

## Cloud security challenges and risks

Before the specific topics, a recap of the challenge landscape from a synthesised perspective.

### The challenge landscape

**Shared responsibility complexity.** Different parts of the stack are protected by different parties; misunderstanding produces gaps.

**Misconfiguration as primary cause.** The dominant cloud security failure is misconfiguration — public storage buckets, overly-permissive IAM, exposed databases. Technical capability is present; operational discipline lapses.

**Speed of change.** Cloud environments change continuously; controls must keep pace.

**Identity-centric attack surface.** Compromised credentials enable broad access in cloud — identity replaces network as the primary security boundary.

**Multi-tenancy.** Logical isolation depends on provider mechanisms.

**Visibility limitations.** Customers have less direct visibility into provider operations than into their own data centres.

**Compliance complexity.** Many overlapping frameworks; provider certifications must be mapped to customer obligations.

**Skill scarcity.** Cloud-skilled security engineers in short supply.

**Cost considerations.** Strong security configurations may cost more than weaker alternatives; trade-offs must be made consciously.

**Concentration risk.** Heavy dependence on a few hyperscalers creates systemic concerns.

### Common cloud risks

Categorised by likelihood and impact:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Misconfiguration | Very High | High | CSPM, IaC, training |
| Compromised credentials | High | High | MFA, secrets management, monitoring |
| API exploitation | Medium | High | API security, WAF, rate limiting |
| Insider threat | Medium | High | Least privilege, monitoring, separation |
| Supply chain | Medium | Very High | Vendor management, dependency scanning |
| Provider outage | Low-Medium | High | Multi-region, multi-cloud, DR |
| Data exfiltration | Medium | Very High | DLP, monitoring, segmentation |
| Ransomware on cloud | Increasing | Very High | Backups, immutable storage, segmentation |
| Compliance gap | Medium | Medium-High | Continuous compliance, audits |

### Risk treatment in cloud

The four classical treatments:

**Avoid.** Don't do the risky thing — keep the most sensitive data on-premises.

**Mitigate.** Apply controls to reduce risk.

**Transfer.** Insurance, contracts shifting liability.

**Accept.** Document and proceed with the risk.

Cloud-specific:
- **Risk transfer to provider.** Through shared responsibility — provider handles certain risks.
- **Risk amplification through cloud.** Some risks larger in cloud (account takeover affecting many resources).

## 6.1 Software-as-a-Service Security

### SaaS security focus

SaaS shifts most security to the provider; customer focus areas:

**Identity and access management.**
- Strong authentication for SaaS access (MFA universal).
- Federation with corporate identity.
- Per-user permissions appropriate to role.
- Regular access reviews.
- Offboarding integrated with identity lifecycle.

**Data governance.**
- Understanding what data is in the SaaS.
- Classification consistent with data sensitivity.
- Sharing controls.
- Data export and backup arrangements.

**Configuration.**
- Security-relevant SaaS configuration (often extensive).
- Default vs hardened settings.
- Periodic configuration review.

**Integration.**
- API connections to other systems.
- SCIM provisioning.
- Webhook security.

**Monitoring.**
- SaaS activity logs.
- Anomaly detection.
- Integration with SIEM.

### Cloud Access Security Brokers (CASB)

*A Cloud Access Security Broker is a security policy enforcement point between cloud service consumers and providers, that monitors and controls activity to enforce security and compliance policies — visibility, data security, threat protection, and compliance — across multiple cloud services.*

CASB capabilities:
- **Visibility.** Discovery of SaaS apps in use (sanctioned and shadow IT).
- **Data security.** DLP for SaaS traffic.
- **Threat protection.** Detection of compromised accounts, anomalies.
- **Compliance.** Configuration audit, reporting.

Major CASBs: Microsoft Defender for Cloud Apps, Netskope, Zscaler, Bitglass, McAfee MVISION Cloud (Trellix).

### SaaS Security Posture Management (SSPM)

A category specifically for SaaS configuration security:
- AppOmni.
- Adaptive Shield.
- DoControl.
- Microsoft Defender for Cloud Apps.

Focuses on the customer-configurable security settings in SaaS — many SaaS apps have hundreds of settings, easy to miss critical ones.

### Common SaaS security issues

- **OAuth grants** to unsanctioned applications.
- **Public sharing** of documents (Google Drive, SharePoint).
- **Excessive permissions** to user roles.
- **Anonymous links** with sensitive data.
- **Disabled MFA** for some accounts.
- **Outdated user roles** after job changes.
- **Service accounts** with broad permissions.
- **External collaborators** with retained access.

For Nepali enterprises heavily using Microsoft 365 or Google Workspace, SaaS security posture is increasingly a focus. Periodic audits commonly identify issues; ongoing CASB/SSPM helps.

## 6.2 Security monitoring

### Monitoring as the visibility foundation

Covered extensively in Chapter 5. From a security perspective, the key requirements:

**Comprehensive collection.** All security-relevant events captured.

**Reliable transport.** Events get to the analytics platform.

**Long retention.** Sufficient for investigation needs.

**Tamper-resistance.** Logs trustworthy.

**Real-time analytics.** Detection at the speed of attack.

**Correlation across sources.** Insights from multiple data streams.

**Actionable alerts.** Output that drives response.

### Cloud security monitoring layers

```
Layer                              Examples
----------------------------------  -----------------
Application                         App logs, APM
Container                          Runtime security
VM / OS                            OS logs, EDR
Cloud infrastructure              CloudTrail, Activity Log, Audit Logs
Network                            Flow logs, IDS
Identity                           Login events, anomaly detection
SaaS apps                          App-specific audit
Threat intel                       External feeds
```

Each layer contributes; combined visibility comes from all together.

### Continuous security monitoring

Specific cloud capabilities:

**AWS:**
- CloudWatch + CloudTrail + Config foundation.
- GuardDuty for threat detection.
- Security Hub for aggregation.
- Inspector for vulnerability assessment.
- Macie for data classification.

**Azure:**
- Defender for Cloud (multi-pillar security).
- Sentinel for SIEM.
- Azure Monitor and Log Analytics.

**GCP:**
- Security Command Center.
- Chronicle.
- Cloud Audit Logs.
- Cloud IDS.

### Third-party monitoring

Often layered on top of provider-native:
- Wiz, Orca, Lacework for CSPM.
- Splunk, Datadog, New Relic for general monitoring with security overlays.
- Various specialised tools for specific concerns.

## 6.3 Security architecture design

### Cloud security architecture

*Cloud security architecture is the systematic design of security controls, integrations, and operational patterns specific to cloud environments, that together implement an organisation's security policies and protect its data and services against identified threats while supporting business requirements.*

### Architecture principles

**Defence in depth.** Multiple layers; no single point of failure.

**Least privilege.** Minimum access necessary at every layer.

**Zero Trust.** No implicit trust based on location.

**Encryption everywhere.** At rest, in transit, in use where possible.

**Identity-centric.** Identity as primary control plane.

**Automated controls.** Manual processes don't scale.

**Comprehensive logging.** Auditability foundational.

**Failure-safe defaults.** Failures should fail closed.

**Continuous validation.** Controls verified continuously, not periodically.

**Cloud-native.** Use cloud-platform capabilities rather than retrofitting on-premises patterns.

### Reference architectures

Major providers publish reference architectures:
- **AWS Well-Architected Framework.** Security pillar with detailed guidance.
- **Microsoft Cloud Adoption Framework.** Including security baselines.
- **Google Cloud Architecture Framework.** Security best practices.

Industry frameworks:
- **CSA Enterprise Architecture.**
- **NIST 800-53 mapped to cloud.**
- **Various sector-specific.**

### Network security architecture

In cloud:

**VPC / VNet design.** Isolation through virtual networks.

**Subnet design.** Public for ingress; private for workloads; isolated for databases.

**Security groups / NSGs.** Stateful firewalls; least-privilege rules.

**Network ACLs.** Subnet-level; defence in depth.

**Service endpoints / Private Link.** Private connectivity to managed services without internet routing.

**Network firewalls.** AWS Network Firewall, Azure Firewall, GCP Cloud NGFW.

**WAF.** For web applications.

**DDoS protection.** AWS Shield, Azure DDoS Protection, GCP Cloud Armor.

**VPN and dedicated connectivity.** For hybrid integration.

### Identity architecture

Foundation of cloud security:

**Single identity source.** Federated identity from corporate IdP.

**MFA everywhere.** No exceptions for human users.

**Role-based access.** Minimal use of individual user permissions.

**Privileged access management.** Just-in-time, audited, recorded.

**Service identities.** For workloads; minimal permissions; rotated credentials.

**Federation across clouds.** Single identity model.

### Data architecture

**Classification first.** Know what data and what sensitivity.

**Encryption by default.** All data at rest and in transit.

**Key management with KMS.** Customer-managed where warranted.

**Access controls aligned with classification.**

**Backup and DR with security maintained.**

**Lifecycle automation.** Retention and deletion enforced.

### Operations architecture

**Infrastructure as code.** Foundation.

**CI/CD pipelines.** With security scanning integrated.

**Continuous compliance.** Automated.

**Monitoring stack.** Comprehensive.

**SIEM integration.** Centralised security visibility.

**Incident response capability.** Tested.

### Architectural decisions to document

For each cloud workload:

- Service models in use (IaaS, PaaS, SaaS, FaaS).
- Deployment topology (regions, AZs).
- Network architecture.
- Identity architecture.
- Data flows and classifications.
- Security controls applied.
- Compliance applicability.
- Monitoring approach.
- Backup and DR approach.
- Operational responsibilities.

The Architecture Decision Records (ADRs) capture not just what was decided but why — invaluable for later review and modification.

## 6.4 Data security

### Cloud data security focus

Building on the data privacy chapter:

**Inventory.** Comprehensive knowledge of data assets in cloud.

**Classification.** Sensitivity categories driving controls.

**Discovery.** Tools that continuously find data:
- **AWS Macie.** S3-focused.
- **Azure Purview.** Unified data governance.
- **GCP Data Loss Prevention.** Discovery and classification.

**Protection.** Encryption at rest and in transit; access controls; isolation.

**Loss prevention.** DLP tools detecting and blocking exfiltration:
- **Microsoft Purview DLP.** Across M365 and beyond.
- **Cloud-native DLP** in major providers.
- **Third-party** (Symantec, Forcepoint, Digital Guardian).

**Backup.** Multiple copies; immutable where appropriate; tested restore.

**Deletion.** Verified deletion at end of life.

### Backup security

Backups are increasingly targeted:

- **Ransomware attacks** specifically target backups.
- **Backup compromise** prevents recovery.

Backup security practices:

- **Immutable storage.** WORM-mode backups; cannot be deleted or modified during retention.
- **Air-gapped backups.** Separate from primary cloud accounts.
- **Encryption.** Backup data encrypted with separate keys.
- **Access controls.** Separate access permissions for backup systems.
- **Testing.** Regular restore testing.
- **Versioning.** Multiple historical versions retained.
- **Geographic separation.** Backups in different regions.

For Nepali banks, NRB directives include specific backup and DR requirements.

### Privacy controls

Specific privacy-protective controls:

- **Pseudonymisation.** Personal data replaced with non-identifying tokens.
- **Anonymisation.** Personal identifiability removed.
- **Aggregation.** Data summarised; individual records not exposed.
- **Differential privacy.** Mathematical privacy guarantees through noise addition.
- **Data minimisation.** Collecting only what is needed.
- **Purpose limitation.** Using data only for stated purposes.

## 6.5 Application security

### Application security in cloud

The discipline of building and operating secure cloud applications. The application is often the attack target; the cloud platform's security cannot save a vulnerable application.

### Secure development lifecycle

**Requirements.** Security requirements identified.

**Design.** Threat modelling.

**Development.** Secure coding practices; peer review.

**Testing.** Static analysis, dynamic analysis, penetration testing.

**Deployment.** Secure deployment practices.

**Operation.** Monitoring, patching, response.

### Application security testing

**SAST (Static Application Security Testing).** Source code analysis. Examples: SonarQube, Checkmarx, Veracode, Snyk Code, GitHub Advanced Security.

**DAST (Dynamic Application Security Testing).** Running-application analysis. Examples: OWASP ZAP, Burp Suite, Acunetix, AppScan.

**IAST (Interactive Application Security Testing).** Instrumented runtime analysis.

**SCA (Software Composition Analysis).** Dependency vulnerability scanning. Examples: Snyk, Dependabot, OWASP Dependency-Check, Black Duck.

**Container scanning.** Image vulnerability analysis. Examples: Anchore, Snyk, Trivy, Aqua, Clair.

**Penetration testing.** Skilled humans testing for vulnerabilities. Periodic; thorough.

### Cloud-native application security

**API security.** OWASP API Top 10 awareness; API gateways with security features; rate limiting; authentication.

**Microservices security.** Service mesh for inter-service security; service identity.

**Serverless security.** Function-level permissions; secure dependencies; observability.

**Container security.** Image security; runtime protection; Kubernetes-specific hardening.

### WAF (Web Application Firewall)

In cloud:
- **AWS WAF.** Native integration with CloudFront, ALB, API Gateway.
- **Azure WAF.** Integrated with Front Door, Application Gateway.
- **GCP Cloud Armor.** WAF and DDoS combined.
- **Third-party.** Cloudflare, Akamai, F5 BIG-IP available across clouds.

WAF protects against OWASP Top 10 and other web-application attacks.

### Runtime application self-protection (RASP)

In-application security agent providing real-time protection. Examples: Imperva RASP, Contrast Security, Sqreen.

### Application security in Nepali enterprises

For Nepali bank application security:
- SAST and DAST commonly deployed in CI/CD pipelines.
- Penetration testing periodic by external firms.
- WAF universal for internet-facing applications.
- API security increasing focus as banking APIs expand.
- Mobile application security important (eSewa, Khalti, IME Pay, banking apps).

## 6.6 Virtual machine security

### VM security in cloud

While modern cloud-native applications favour containers and serverless, VMs remain widely used.

### VM security layers

**Hypervisor security.** Provider's responsibility.

**Guest OS security.** Customer's responsibility:
- Patching.
- Hardening.
- Access controls.
- Antivirus / EDR.
- Logging.

**Application security.** Customer's responsibility (Section 6.5).

**Data security.** Customer's responsibility (Section 6.4).

**Network security.** Shared — provider provides network; customer configures security groups.

### VM hardening

Standard practices:

**Minimal images.** Start with minimal-install OS.

**Patches current.** Maintenance updates applied promptly.

**Unnecessary services disabled.** Reduce attack surface.

**SSH/RDP hardened.** Key-based auth; restricted source IPs; MFA where possible.

**Endpoint protection.** EDR agent.

**Monitoring agents.** Forward logs and metrics.

**Configuration management.** Ansible, Puppet, or equivalent ensuring consistent configuration.

**Vulnerability scanning.** Continuous.

### Image management

**Golden images.** Pre-hardened images used as base for all deployments.

**Image building pipelines.** Automated, version-controlled, scanned.

**Image scanning.** Pre-deployment vulnerability scanning.

**Image lifecycle.** Periodic rebuilding; deprecation of old images.

### Container parallels

While VMs and containers differ, security practices parallel:

- Hardened base images.
- Continuous scanning.
- Runtime protection.
- Network policies.
- Least-privilege execution.

### Hardening tools

- **CIS Benchmarks.** Detailed hardening for various OSes.
- **DISA STIGs.** US DoD standards.
- **Vendor hardening guides.**
- **Automated assessment.** OpenSCAP, AWS Inspector, Azure Defender vulnerability assessment.

### VM security in Nepali deployments

For Nepali enterprises:
- Banks running Windows or Linux VMs in cloud — hardened per CIS or NRB-aligned standards.
- Image management pipelines emerging in mature organisations.
- EDR deployment increasingly standard.
- Centralised log forwarding to SIEM.

## 6.7 Identity management and access control

### Synthesis

Identity management and access control have been discussed throughout. This section synthesises into the unified cloud security perspective.

### Identity as the new perimeter

Traditional security: network perimeter as the boundary.

Cloud security: identity as the boundary.

A compromised credential in cloud enables broad access. Identity is therefore the most-protected element.

### Modern identity controls

**Centralised identity.** Single source of truth (corporate IdP).

**Federation.** Cloud services trust the IdP.

**MFA everywhere.** Universal, no exceptions for human users.

**Conditional access.** Risk-based authentication.

**Privileged access management.** Just-in-time; recorded; audited.

**Service identity.** For workloads.

**Continuous verification.** Not one-time at login.

**Strong cryptographic identity.** Certificates, FIDO2, hardware-backed.

### Identity governance

**Lifecycle automation.** HR-driven; SCIM-based.

**Access reviews.** Periodic recertification.

**Segregation of duties.** Conflicting permissions prevented.

**Just-in-time provisioning.** Access granted when needed; revoked after.

**Audit and compliance.** Identity changes logged and reviewed.

### IAM best practices recap

- Least privilege.
- MFA universally.
- No long-lived service-account credentials where avoidable.
- Roles preferred over individual permissions.
- Regular access reviews.
- Strong separation between development, staging, production.
- Cross-account access through assumed roles, not shared credentials.
- Conditional access for sensitive operations.
- Comprehensive logging.

### Common identity-related findings

In Nepali bank cloud audits, identity-related findings frequently include:

- Service accounts with excessive permissions.
- Long-lived access keys for service accounts.
- MFA bypassed for some accounts.
- Stale users not deprovisioned.
- Privileged access granted broadly.
- Insufficient audit of identity changes.
- Cross-account trust relationships overly permissive.
- Shared credentials in use.

Each is correctable; the sum of fixes substantially raises security posture.

### Identity attack patterns

Recurring attack patterns:

**Credential phishing.** Users tricked into providing credentials. Mitigation: FIDO2, phishing-resistant MFA.

**Credential stuffing.** Reused credentials from external breaches. Mitigation: MFA, breach-credential monitoring.

**Token theft.** Compromised OAuth tokens or session cookies. Mitigation: short-lived tokens; conditional access.

**Service account abuse.** Compromised service-account credentials. Mitigation: minimal permissions; rotation; monitoring.

**Cross-tenant attacks.** Misconfigured identity federation. Mitigation: careful federation configuration; review.

**Account takeover via SaaS OAuth.** Compromise via SaaS apps. Mitigation: CASB review of OAuth grants.

### The synthesis — cloud security as integrated discipline

Cloud security is not the sum of individual controls but the integration of:

- **Architecture** that supports security goals.
- **Identity** as the foundational control.
- **Data protection** appropriate to sensitivity.
- **Network controls** layered with identity.
- **Application security** in development and operation.
- **Operations** that maintain controls continuously.
- **Monitoring** that detects when things go wrong.
- **Response** that contains and remediates.
- **Governance** that ensures the system is working.

For the MSc graduate building a career in cloud security in Nepal in 2026 and beyond, the field offers substantial opportunities. Nepali enterprises are increasingly cloud-dependent; expertise is scarce; demand exceeds supply. The combination of cloud-platform skills (AWS, Azure, GCP), security disciplines (covered through the broader MSNCS programme), operational maturity, and understanding of the regulatory environment (NRB, NTA, MOHP) positions the graduate well.

The technologies will continue to evolve. The fundamentals — identity, data protection, monitoring, response, governance — will persist. The cloud has transformed information technology; the next decade will see security and privacy in cloud transform alongside it. The graduate who builds both deep technical skills and operational sensibility, who can communicate across teams and translate between technical and business perspectives, who maintains continuous learning, will find both interesting work and meaningful impact possible.

The syllabus ends here. The practice continues.
