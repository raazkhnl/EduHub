---
title: 'Chapter 5 — Information Asset Protection'
sidebar_label: 'Ch 05 — Information Asset Protection'
sidebar_position: 5
description: 'Chapter 5 of Security and Audit Practitioner (ENCTNS625).'
slug: /ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner/notes/ch05
tags: [msncs, ENCTNS625, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Information asset protection encompasses the controls that keep information confidential, accurate, and available — the operational reality of cybersecurity from the audit perspective. The frameworks have been discussed in earlier subjects; the technical controls have been examined in cryptography, networks, cloud security, and other technical subjects. This chapter applies them through the audit-practitioner lens: how to systematically assess whether an organisation's information assets are appropriately protected, what evidence to gather, what tests to run, and what findings typically emerge. The four subtopics — security frameworks, identity and access management, encryption and PKI, and network and cloud security — together cover most of the technical control surface the auditor examines in a typical engagement.

## 5.1 Security frameworks — practitioner application

### Framework selection for audit criteria

The auditor selects criteria based on:

**Organisational adoption.** What frameworks the organisation has chosen.

**Regulatory requirements.** What frameworks are mandated.

**Industry norms.** What frameworks peers use.

**Engagement objectives.** What questions the audit answers.

**Stakeholder preferences.** What stakeholders expect.

Common selections for Nepali bank IS audit:
- ISO 27001 (if certified) or its controls as criteria.
- NRB IT directives.
- CIS Controls v8 for technical depth.
- COBIT 2019 for governance.
- Application-specific (PCI-DSS for card data).

### ISO 27001 control testing

For each Annex A control deemed applicable, audit testing:

**Control existence.** Documentation exists.

**Control implementation.** Operational evidence.

**Control effectiveness.** Achieves intended outcome.

**Control monitoring.** Performance tracked.

### Specific control examples

**A.5.7 — Threat intelligence.** New in 2022.

Audit tests:
- Threat intelligence programme documented.
- Intelligence sources identified.
- Collection mechanism operational.
- Analysis performed.
- Distribution to relevant teams.
- Integration with security operations.
- Periodic effectiveness assessment.

**A.5.23 — Information security for use of cloud services.** New in 2022.

Audit tests:
- Cloud service policy documented.
- Approval process for cloud services.
- Security requirements defined.
- Vendor assessment process.
- Contract terms appropriate.
- Ongoing monitoring.
- Exit considerations.

**A.8.16 — Monitoring activities.** New in 2022.

Audit tests:
- Monitoring scope defined.
- Monitoring tools deployed.
- Alert thresholds defined.
- 24/7 monitoring or appropriate alternative.
- Alert response procedures.
- Incident escalation.
- Effectiveness review.

### Risk-based framework application

Not all controls equally important; risk-based application:

**Material risk areas.** Where audit attention concentrates.

**Compensating controls.** Where primary controls weak.

**Effectiveness testing.** Beyond mere existence.

**Continuous monitoring.** Where appropriate.

### Common framework application findings

**Documentation-implementation gap.** Documents exist; implementation incomplete.

**Coverage gaps.** Some controls not addressed.

**Effectiveness questions.** Controls in place but not achieving outcomes.

**Monitoring gaps.** Control effectiveness not tracked.

**Improvement absence.** Issues not addressed.

## 5.2 Identity and access management controls

### IAM scope

*Identity and Access Management is the discipline of managing identities (people, services, devices) and their access to organisational resources — encompassing identity lifecycle (provisioning, modification, deprovisioning), authentication (verifying identity), authorisation (determining what access is permitted), and accountability (recording who did what) — providing the foundation for access control in modern environments.*

The audit examines each component.

### Identity lifecycle audit

**Provisioning.**
- Joiner process documented.
- Authorisation required for access.
- Default access principles (least privilege).
- Documentation of access granted.
- Audit trail.

**Modification.**
- Mover process for role changes.
- Removal of unneeded access.
- Approval for additional access.
- Documentation.

**Deprovisioning.**
- Leaver process documented.
- Timely access removal.
- Comprehensive coverage (all systems).
- Verification of removal.
- Account disposition (deletion vs disabling).

Common findings:

**Orphaned accounts.** Accounts for former employees still active.

**Excess access.** Users accumulate access beyond need.

**Slow deprovisioning.** Access not removed promptly at departure.

**Inadequate authorisation.** Access granted without proper approval.

**Documentation gaps.** Audit trail incomplete.

### Authentication audit

**Password policies.**
- Complexity requirements.
- Length minimums.
- Rotation policies (or rationale for not requiring rotation).
- History (preventing reuse).
- Lockout settings.

NIST SP 800-63B has updated guidance — long passwords without forced rotation, MFA emphasis.

**Multi-factor authentication.**
- Deployment scope.
- Methods used.
- Strength of methods (TOTP vs SMS vs FIDO2).
- Universal vs partial deployment.
- Bypass procedures (if any).

**Single sign-on.**
- SAML, OIDC implementations.
- Integration with identity provider.
- Federation arrangements.

**Privileged access.**
- Strong authentication for privileged.
- Just-in-time access where appropriate.
- Session recording where appropriate.
- Privileged account management tools.

### Authorisation audit

**Access models.**
- Role-Based Access Control (RBAC).
- Attribute-Based Access Control (ABAC).
- Mandatory Access Control (MAC).
- Discretionary Access Control (DAC).

**Implementation.**
- Roles defined.
- Role memberships managed.
- Periodic review.
- Exception management.

**Least privilege.**
- Default minimal.
- Justified expansions.
- Regular reviews to remove unneeded.

**Segregation of duties.**
- Conflicting roles identified.
- Conflicts prevented or compensated.
- Periodic SoD review.

For Nepali bank context, NRB IT directives require specific SoD provisions; audit verifies compliance.

### Access reviews

Periodic verification:

**Frequency.** Quarterly for privileged; annually for general.

**Process.** Manager review of subordinates' access.

**Completion tracking.** Reviews actually performed.

**Action follow-up.** Excess access removed.

**Documentation.** Evidence of reviews.

**Tool support.** Many organisations use specialised tools.

Common finding: reviews performed but cursory; subordinate access rubber-stamped without genuine examination.

### Privileged access management

*Privileged Access Management is the specific discipline of controlling, monitoring, and recording access by accounts with elevated privileges — administrative accounts, service accounts, application accounts — through measures such as vaulting credentials, just-in-time provisioning, session recording, and approval workflows, given that privileged accounts represent disproportionate risk.*

PAM tools:
- CyberArk.
- BeyondTrust.
- Delinea (formerly Centrify and Thycotic).
- HashiCorp Vault (for secrets).
- AWS Secrets Manager, Azure Key Vault, GCP Secret Manager.

Audit examines:

**PAM deployment scope.** Privileged accounts covered.

**Vaulting.** Credentials securely stored.

**Just-in-time provisioning.** Where appropriate.

**Session monitoring.** Recording of privileged sessions.

**Approval workflows.** For sensitive access.

**Service account management.** Often weak area.

**Emergency access procedures.** Documented and controlled.

For Nepali banks, PAM tool adoption increasing at major institutions; smaller institutions often have weaker controls.

### Federation and SSO audit

For federated environments:

**Trust relationships.** Documented.

**Identity provider security.** Hardened.

**Token validation.** Implemented properly.

**Attribute mapping.** Correct.

**Just-in-time provisioning.** Where used.

**Monitoring.** Federation activity logged.

### IAM in cloud

Cloud IAM specific considerations:

**Cloud provider IAM.** AWS IAM, Azure RBAC, GCP IAM.

**Cross-account / cross-tenant.** Trust relationships.

**Federation with on-premises.** SSO across boundaries.

**Service identities.** IAM roles, managed identities, service accounts.

**Key management.** Cloud KMS integration.

**Access patterns.** Programmatic vs interactive.

Audit examines each within applicable cloud context.

### IAM common findings

**Stale accounts.** Active accounts no longer needed.

**Excessive privileges.** Beyond least privilege.

**Inadequate MFA coverage.** Not universal.

**Weak password policies.** Below current best practice.

**SoD violations.** Conflicting access combinations.

**Access review gaps.** Reviews not performed or not substantive.

**Privileged access weaknesses.** Inadequate PAM implementation.

**Service account weaknesses.** Often unmanaged.

**Documentation gaps.** Authorisation evidence missing.

## 5.3 Encryption and PKI systems audit

### Cryptography in audit context

Cryptography covered in depth in ENCTNS502. The auditor examines cryptography use, not cryptographic theory.

### Cryptographic audit scope

**Cryptography policy.** Documented standards.

**Algorithm selection.** Current and appropriate.

**Key management.** Generation, distribution, storage, rotation, destruction.

**Cryptographic implementation.** Use of standards rather than custom.

**Cryptographic libraries.** Approved versions used.

**Key escrow.** Where applicable.

**Cryptographic monitoring.** Use tracked.

### Algorithm appropriateness

Current standards (2026):

**Symmetric encryption.** AES-128 minimum; AES-256 preferred. ChaCha20-Poly1305 alternative.

**Asymmetric encryption.** RSA 2048 minimum; RSA 3072+ preferred. Elliptic curve (ECDSA, EdDSA) preferred for new deployment.

**Hashing.** SHA-256 minimum; SHA-384 / SHA-512 for higher assurance. SHA-1 deprecated; MD5 broken.

**Authenticated encryption.** AES-GCM, ChaCha20-Poly1305 preferred over older modes.

**Key derivation.** Argon2, PBKDF2 with sufficient iterations, bcrypt.

**Post-quantum cryptography.** ML-KEM, ML-DSA, SLH-DSA (NIST standards 2024).

The auditor flags use of deprecated algorithms (DES, RC4, MD5, SHA-1 for signatures) as findings.

### Key management audit

Critical area — bad key management defeats good cryptography:

**Key generation.**
- Sufficient entropy.
- Trusted random number sources.
- Hardware security modules where appropriate.

**Key storage.**
- HSMs for high-value keys.
- Key management systems (cloud KMS, dedicated KMS).
- Access controls on keys.
- Backup procedures.

**Key distribution.**
- Secure channels.
- Authentication of recipients.

**Key rotation.**
- Periodic rotation per policy.
- Automatic where possible.

**Key destruction.**
- Per policy.
- Verified destruction.

**Key escrow.**
- Where required.
- Access controls.

### HSM audit

For Hardware Security Modules:

**Deployment.** Material keys in HSMs.

**Configuration.** Per vendor security guidance.

**Access controls.** Strong administration controls.

**Backup.** Sealed backups.

**Monitoring.** HSM activity logged.

**FIPS compliance.** Where required (FIPS 140-2 Level 3 typical for financial).

For Nepali banks, HSMs standard for SWIFT, payment systems, certificate authorities; audit verifies appropriate deployment and configuration.

### PKI audit

*Public Key Infrastructure audit examines the systems and processes that issue, manage, and validate digital certificates — including the Certificate Authority operations, registration authority processes, certificate lifecycle management, certificate revocation mechanisms, and overall PKI governance — verifying the foundation of trust in certificate-based authentication and encryption.*

**CA operations.**
- CA private key protection (typically HSM).
- CA infrastructure security.
- CA operations procedures.
- CA personnel controls.
- CA physical security.

**Registration process.**
- Identity verification per CP/CPS.
- Documentation of verification.
- Audit trail.

**Certificate lifecycle.**
- Issuance procedures.
- Renewal handling.
- Revocation mechanisms (CRL, OCSP).
- Expiration management.

**Trust hierarchy.**
- Root CA protection.
- Intermediate CAs.
- Cross-certifications.

**Cryptographic policy.**
- Algorithm selection.
- Key lengths.
- Validity periods.

For Nepali context, PKI deployment varies — internal PKIs at major banks, NRB's PKI for banking, public CAs for general use, Office of the Controller of Certification Authority for government-related.

### TLS configuration audit

For HTTPS and TLS-protected services:

**TLS version.** TLS 1.2 minimum; TLS 1.3 preferred. TLS 1.0/1.1 deprecated; SSL deprecated.

**Cipher suites.** Modern suites only; forward secrecy preferred.

**Certificate validity.** Current and from trusted CA.

**Certificate strength.** RSA 2048 minimum; ECC preferred.

**HSTS deployment.** Where appropriate.

**Certificate Transparency.** Monitored.

Tools: SSL Labs (qualys.com test), testssl.sh, sslyze, internal scanning.

For Nepali web banking and government services, TLS configurations typically reviewed quarterly; audit may include automated scanning.

### Data-at-rest encryption

**Encryption coverage.**
- Databases encrypted.
- Storage encrypted.
- Backups encrypted.
- Mobile devices encrypted.

**Key management.** As discussed.

**Implementation.** Native (e.g., TDE for databases, BitLocker for OS), or application-level.

**Performance impact.** Acceptable.

### Data-in-transit encryption

**Network encryption.** TLS, IPsec, SSH.

**Inter-system encryption.** Within datacentre.

**Coverage.** All sensitive data.

**Configuration.** Per current standards.

### Data-in-use encryption

Emerging:

**Confidential computing.** Trusted execution environments (Intel SGX, AMD SEV, AWS Nitro Enclaves).

**Homomorphic encryption.** Compute on encrypted data; limited practical use.

**Secure multi-party computation.** Specific use cases.

For most contexts, data-in-use encryption is research/specialised rather than standard practice.

### Common cryptography findings

**Deprecated algorithms.** MD5, SHA-1, old TLS versions.

**Weak key lengths.** Below current standards.

**Key management gaps.** Manual key handling.

**Certificate management gaps.** Expired certificates, weak certificates.

**Encryption coverage gaps.** Some data unencrypted.

**HSM not deployed.** For high-value keys.

**Configuration weaknesses.** Cipher suites including weak.

## 5.4 Network and cloud security controls

### Network security audit

The audit examines network security controls:

**Network architecture.** Segmentation, defence in depth.

**Perimeter controls.** Firewalls, NGFW, WAF.

**Internal controls.** Internal firewalls, microsegmentation.

**Remote access.** VPN, ZTNA.

**Network monitoring.** IDS/IPS, NDR.

**Wireless security.** As discussed in ENCTNS615 Chapter 6.

**Network segmentation.** Critical systems isolated.

Covered in detail in ENCTNS562 Managing Secure Network Systems.

### Firewall audit

**Rule base review.**
- Rules documented.
- Business justification per rule.
- Periodic review.
- Cleanup of obsolete rules.
- No "any-any" rules without justification.

**Change management.**
- Changes through process.
- Approval documented.
- Testing performed.
- Rollback available.

**Configuration.**
- Per vendor hardening guide.
- Logging enabled.
- Time synchronisation.
- Backup procedures.

**Monitoring.**
- Traffic monitored.
- Anomalies investigated.
- Rule effectiveness assessed.

Tools for firewall audit: AlgoSec, Tufin, Skybox; native vendor tools; manual review for smaller deployments.

### VPN audit

**Configuration.**
- Strong encryption.
- Strong authentication (MFA).
- Per-user policies.
- Split tunnelling decisions.

**User management.**
- Provisioning and deprovisioning.
- Access reviews.
- Concurrent session limits.

**Monitoring.**
- Connection logging.
- Anomalous patterns detected.

**Alternatives.**
- ZTNA adoption (replacing VPN in some contexts).

### IDS/IPS audit

**Deployment coverage.** Strategic placement.

**Signature updates.** Current.

**Tuning.** Reduced false positives.

**Alert handling.** Procedures for alerts.

**Performance.** No impact on legitimate traffic.

**Integration.** With SIEM and SOC processes.

### Network monitoring

**Traffic visibility.** North-south and east-west.

**Tools deployed.** NetFlow analysers, packet capture, NDR products.

**Coverage gaps.** Encrypted traffic visibility.

**Analysis capability.** Skilled analysts.

**Response integration.** To detection.

### Cloud security audit

Cloud security covered extensively in ENCTNS571. For audit context:

**Cloud usage inventory.** All cloud services known.

**Shared responsibility understanding.** Boundaries clear.

**Cloud IAM.** As discussed.

**Cloud network controls.** VPC/VNet configuration, security groups.

**Cloud monitoring.** CloudTrail, Activity Logs, similar.

**Cloud Security Posture Management.** Tools deployed.

**Cloud workload protection.** EDR equivalents.

**Cloud DLP.** Where applicable.

**Cloud encryption.** Per provider capability.

**Cloud incident response.** Procedures specific to cloud.

### CSPM audit

For organisations using CSPM:

**Tool deployment scope.** Cloud accounts covered.

**Policy configuration.** Rules appropriate.

**Finding remediation.** Issues addressed.

**Reporting.** To relevant stakeholders.

**Integration.** With broader security operations.

Common CSPM tools: Wiz, Orca, Lacework, Prisma Cloud (Palo Alto), Microsoft Defender for Cloud, AWS Security Hub.

### Container security audit

For containerised environments:

**Image security.** Scanned for vulnerabilities.

**Image registry.** Access controls.

**Runtime security.** Behaviour monitoring.

**Orchestration security.** Kubernetes hardening per CIS benchmarks.

**Secrets management.** No secrets in images.

**Network policies.** Microsegmentation within cluster.

Tools: Sysdig, Aqua, Snyk Container, native Kubernetes capabilities.

### Common network and cloud findings

**Network segmentation weaknesses.** Flat networks.

**Firewall rule weaknesses.** Overly broad, obsolete rules.

**VPN weaknesses.** Weak authentication, broad access.

**Cloud configuration drift.** Configurations diverge from baseline.

**Cloud monitoring gaps.** Some services not monitored.

**Container security weaknesses.** Unhardened orchestration.

**East-west visibility gaps.** Internal traffic not monitored.

**Encryption gaps.** Some traffic unencrypted.

### Practical asset protection assessment

Putting it together for a Nepali bank assessment:

**Scope.** Customer-facing internet banking environment.

**Frameworks.** ISO 27001 + NRB IT directives + CIS Controls v8 (selected).

**IAM testing.**
- 50 customer account samples for provisioning evidence.
- 25 staff accounts for access appropriateness.
- All 12 privileged accounts examined.
- Last quarterly access review documented.

**Cryptography testing.**
- TLS configuration scan (SSL Labs A+ achieved).
- Certificate inventory.
- Database encryption verified.
- HSM utilisation for key signing keys verified.

**Network testing.**
- Firewall rule sample (50 rules).
- Network segmentation diagram review.
- VPN configuration review.
- WAF configuration review.

**Cloud testing.**
- Cloud services inventory.
- AWS security configuration assessment via CSPM tool.
- Container security review.

**Findings.**
- IAM: 3 stale customer accounts identified; minor finding.
- Cryptography: 2 internal certificates expiring within 60 days; minor finding.
- Network: 5 firewall rules with broad scope without documented justification; medium finding.
- Cloud: 12 S3 buckets with public access (1 intentional, 11 misconfigured); high finding.
- Overall: control framework mature; specific items for remediation.

The findings tracked to closure; verification at follow-up.

### From asset protection to incident response

When protections fail and incidents occur, incident response and forensics capabilities matter. The next and final chapter takes up the audit of these capabilities — security event monitoring, the incident response process, digital evidence handling, and forensic investigation — completing the picture of the practitioner's audit scope.
