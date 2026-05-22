---
title: 'Chapter 3 — Security Management in the Cloud'
sidebar_label: 'Ch 03 — Security Management in the Cloud'
sidebar_position: 3
description: 'Chapter 3 of Security and Privacy in Cloud Computing (ENCTNS571).'
slug: /ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing/notes/ch03
tags: [msncs, ENCTNS571, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The previous chapter set out the architecture of cloud computing; this chapter takes up the discipline of managing security within that architecture. Security management is a continuous operational function — not just initial configuration but ongoing administration, monitoring, response, and improvement. The cloud context shapes the discipline in specific ways: management standards adapted to cloud, availability management distinct for each service model, access control reframed around identity rather than network location, vulnerability management at cloud scale, and patch and configuration management as continuous processes rather than periodic events. This chapter covers the security-management standards relevant to cloud, the availability-management approaches by service model, the access-control mechanisms, the vulnerability landscape, and the patch and configuration management disciplines.

## 3.1 Security management standards

### Why standards matter

Security management in cloud benefits from standardised frameworks for several reasons:

- **Comprehensiveness.** Standards typically cover the range of concerns; reduces gaps.
- **Common vocabulary.** Standardised terminology aids communication.
- **Certification value.** Compliance can be attested by independent assessors.
- **Customer assurance.** Customers can rely on provider attestations.
- **Operational maturity.** Adopting a standard pushes operational discipline.
- **Regulatory alignment.** Standards often map to regulatory requirements.

### Major standards relevant to cloud

**ISO/IEC 27001.** The international standard for information security management systems (ISMS). Defines requirements for establishing, implementing, maintaining, and continually improving an ISMS. Certifiable through accredited auditors. Foundational for any serious security programme.

**ISO/IEC 27002.** Code of practice for information security controls. Companion to 27001 providing detail on the controls to implement.

**ISO/IEC 27017.** Information security for cloud services. Provides additional guidance for cloud-specific controls — both for providers and customers.

**ISO/IEC 27018.** Code of practice for protection of personally identifiable information (PII) in public clouds acting as PII processors. Privacy-specific extension.

**NIST Cybersecurity Framework (CSF).** Voluntary framework organising cybersecurity practices around five functions: Identify, Protect, Detect, Respond, Recover. Updated to version 2.0 in 2024.

**NIST SP 800-53.** Comprehensive control catalogue for federal information systems; widely referenced beyond federal use.

**NIST SP 800-171.** Controls for protecting controlled unclassified information in non-federal systems.

**NIST SP 800-145.** The NIST cloud definition (Chapter 2 reference).

**NIST SP 800-144.** Guidelines on security and privacy in public cloud computing.

**NIST SP 800-146.** Cloud computing synopsis and recommendations.

**Cloud Security Alliance Cloud Controls Matrix (CCM).** Comprehensive cloud-specific control framework. Maps to many other standards (ISO 27001, NIST, PCI-DSS, GDPR, others).

**CSA STAR Registry.** Public registry of provider attestations against CCM. Levels include self-assessment, third-party assessment, and continuous monitoring.

**SOC 2.** AICPA's Service Organization Controls 2. Designed for service organisations (including cloud providers) to demonstrate controls relevant to security, availability, processing integrity, confidentiality, privacy. Common attestation among cloud providers.

**SOC 3.** Public-facing version of SOC 2; less detailed.

**FedRAMP.** US federal government's cloud security authorisation programme. Rigorous; many providers maintain FedRAMP authorisations for federal customer eligibility.

**HITRUST CSF.** Healthcare-focused common security framework integrating multiple sources.

**PCI-DSS.** Payment Card Industry Data Security Standard. Applies wherever cardholder data is processed.

### Standards in Nepali regulated environments

For Nepali banks under NRB IT directives:

- **ISO 27001 certification** increasingly expected.
- **NIST CSF** widely referenced.
- **CSA STAR** referenced for cloud provider evaluation.
- **PCI-DSS** for card-data environments.
- **NRB-specific directives** layered on top of international standards.

For NTA-regulated telecoms, similar pattern with sector-specific overlays.

### Mapping cloud provider certifications

Major cloud providers publish their certifications:

- **AWS Compliance Programs page.** Lists SOC, ISO 27001/17/18, FedRAMP, PCI, HIPAA, and many country-specific certifications.
- **Microsoft Trust Center / Service Trust Portal.** Comprehensive list and reports.
- **Google Cloud Compliance offerings.** Similar breadth.

Customer due diligence:
1. Identify relevant standards for the customer's environment.
2. Verify provider certifications cover those standards.
3. Obtain provider's attestation reports (typically under NDA).
4. Review reports for relevant controls.
5. Identify customer's residual responsibilities.

### Choosing among standards

For most organisations, multiple standards apply:

- **Baseline.** ISO 27001 or NIST CSF as overall framework.
- **Cloud-specific.** ISO 27017 / 27018, CSA CCM.
- **Sector-specific.** As applicable (PCI-DSS, HIPAA, regulatory directives).
- **Country-specific.** As applicable.

The standards overlap substantially; an organisation adopting one finds it already addresses much of the others.

## 3.2 Security management in the cloud — Availability management

### Availability in cloud

Availability — systems and data accessible when needed — is fundamental. Cloud introduces both new capabilities and new failure modes for availability management.

**Cloud availability advantages:**
- Geographic distribution across multiple regions.
- Automatic scaling for capacity surges.
- Managed-service operational expertise.
- Provider-side resilience engineering.
- DDoS protection at scale.

**Cloud availability concerns:**
- Provider outages affecting many customers simultaneously.
- Internet connectivity dependency.
- Misconfigurations causing customer-side outages.
- Complexity of multi-region architectures.

### Availability targets

The classical "nines" terminology:

| Nines | Availability % | Annual downtime |
|---|---|---|
| 2 nines | 99% | 3.65 days |
| 3 nines | 99.9% | 8.76 hours |
| 4 nines | 99.99% | 52.6 minutes |
| 5 nines | 99.999% | 5.26 minutes |
| 6 nines | 99.9999% | 31.5 seconds |

Cloud provider SLAs typically range from 99.9% (basic services) to 99.99% (high-availability services). Achieving five-nines or higher requires multi-region architectures with active-active design.

### Availability architecture patterns

**Single region, single AZ.** Lowest cost; lowest availability. Adequate for development, non-critical workloads.

**Single region, multi-AZ.** Resources distributed across Availability Zones within a region. Protects against AZ-level failures. Standard pattern for production.

**Multi-region active-passive.** Primary region with secondary region as failover. Lower cost; non-trivial failover process.

**Multi-region active-active.** Both regions serving production simultaneously. Highest availability; highest complexity.

**Multi-cloud.** Workloads spread across cloud providers. Provides protection against provider-level outages; substantial complexity.

For Nepali banks deploying cloud workloads, the typical pattern:
- Multi-AZ within AWS Mumbai (or Azure India) for primary.
- Multi-region capability where required (Mumbai + Singapore, for example).
- Active-passive typically; active-active for highest-criticality services.

### Provider responsibility for availability

What the provider commits:

- **Compute service availability.** Per-instance and per-region commitments.
- **Storage durability and availability.**
- **Network availability.** Within regions, between regions, internet egress.
- **Managed service availability.** Specific commitments per service.

Provider commitments are typically defined for billing-period averages, with service credits for breaches. Provider commitments don't replace customer responsibility for application-level availability.

### Customer responsibility for availability

The customer designs and operates applications:

- **Redundancy.** Multiple instances; multi-AZ deployment.
- **Health checks.** Automated detection of unhealthy instances; replacement.
- **Load balancing.** Distribution across healthy instances.
- **Capacity planning.** Sufficient capacity for expected and surge loads.
- **Graceful degradation.** Reduced functionality preferable to total failure.
- **Disaster recovery.** Multi-region replication and failover.
- **Backup and restore.** Data backup with tested restore.
- **Monitoring and alerting.** Detect availability problems quickly.
- **Incident response.** Capability to respond when problems occur.

## 3.3 SaaS availability management

### SaaS availability specifics

In SaaS, the customer's direct technical role in availability is minimal. The provider operates the entire stack.

**Customer concerns:**

- **SLA review.** Understanding what the provider commits.
- **SLA monitoring.** Verifying actual performance.
- **Notification arrangements.** Being informed of outages.
- **User communication.** Informing internal users of provider issues.
- **Alternative arrangements.** Workarounds during outages.
- **Data extraction.** Ability to retrieve data; not waiting for provider restoration.

### SaaS provider commitments

Common SaaS SLA elements:

- **Uptime percentage.** Often 99.9%.
- **Definition of downtime.** What counts.
- **Exclusions.** Scheduled maintenance, customer-caused issues.
- **Credit calculations.** Percentage refund per missed availability.

Real-world examples:
- **Microsoft 365.** 99.9% uptime commitment.
- **Google Workspace.** 99.9% uptime commitment.
- **Salesforce.** 99.9% uptime commitment.

### SaaS dependency planning

For business-critical SaaS:

- **Identify critical SaaS dependencies.** Microsoft 365 outage affects email; Salesforce outage affects sales operations.
- **Document workarounds.** What can continue during outage; what cannot.
- **Communication plans.** How to inform users.
- **Vendor escalation contacts.** Who to call.
- **Periodic testing.** Verify the workarounds actually work.

### Real-world incidents

SaaS outages have been notable:

- **Microsoft 365** has had several multi-hour outages affecting global users.
- **Google Workspace** has had outages affecting Gmail and Drive.
- **AWS** outages, while not SaaS directly, affect many SaaS services hosted on AWS.

For Nepali enterprises heavily dependent on Microsoft 365 or Google Workspace, the periodic provider outages disrupt operations. Mature organisations document workarounds and communication plans.

## 3.4 PaaS availability management

### PaaS availability shared

In PaaS, the customer and provider share availability responsibilities differently than SaaS.

**Provider responsibility:**
- Platform runtime availability.
- Operating system and middleware.
- Underlying infrastructure.
- Managed-service availability per SLA.

**Customer responsibility:**
- Application code quality.
- Application configuration.
- Capacity selection and scaling configuration.
- Database design and operation (for managed databases).
- Backup and restore arrangements.
- Application-level health management.

### PaaS-specific availability considerations

**Auto-scaling configuration.** Most PaaS platforms support auto-scaling. Configuration matters — too aggressive scaling is wasteful; too conservative causes overload during surges.

**Database availability.** Managed-database high-availability configurations:
- **Multi-AZ replication.** Synchronous replication across AZs.
- **Read replicas.** Scaling read load; can promote to primary on failure.
- **Geographic replication.** For DR across regions.

**Cache layer.** Managed Redis or Memcached. Cluster mode for HA; persistence options.

**Queue and message availability.** Managed queues (SQS, Service Bus, Pub/Sub) typically multi-AZ by design.

**API gateway availability.** Provider-managed; high availability built in.

### PaaS sample architecture for HA

A Nepali payment service on AWS Mumbai (ap-south-1) might deploy:

- **API Gateway.** Public endpoint.
- **Lambda functions** for API handlers — auto-scaling, multi-AZ by default.
- **Aurora PostgreSQL multi-AZ.** Database with synchronous replica.
- **ElastiCache Redis cluster mode** for session and cache.
- **SQS** for asynchronous processing — managed, multi-AZ.
- **CloudWatch** for monitoring.
- **CloudFront** for content distribution.

Multi-region: an additional region (ap-southeast-1 Singapore) for DR, with Aurora Global Database replicating data.

The customer's availability investment: configuration, monitoring, capacity planning, failover testing. The provider handles the infrastructure availability.

## 3.5 IaaS availability management

### IaaS availability — most customer responsibility

In IaaS, the customer manages availability up to the hypervisor.

**Customer responsibilities:**
- OS patching and configuration.
- Application installation and configuration.
- High-availability clustering (where applications support it).
- Load balancer configuration.
- Auto-scaling group configuration.
- Backup mechanisms.
- Monitoring and alerting.
- Disaster recovery.

**Provider responsibilities:**
- Hypervisor availability.
- Physical hardware availability.
- Storage durability.
- Network availability.

### IaaS HA patterns

**Compute redundancy.**
- Multiple instances across AZs.
- Auto-scaling groups for automatic replacement.
- Load balancer (ALB, NLB, GLB) distributing traffic.
- Health checks for automated failure detection.

**Storage redundancy.**
- EBS volumes are replicated within an AZ; for multi-AZ, application-level replication or DRS.
- S3 is multi-AZ by default; multi-region for highest durability.
- Backup to S3 or AWS Backup.

**Network redundancy.**
- Multiple paths.
- Direct Connect with VPN backup.
- Multiple ISPs (for non-cloud sites connecting in).

**Database HA.**
- Self-managed (running PostgreSQL or MySQL on EC2): customer responsible for clustering.
- Managed (RDS, Aurora): provider handles HA.
- For most customers, managed databases reduce operational burden substantially.

### Capacity and scaling

In IaaS, the customer chooses instance types and scaling:

- **Right-sizing.** Matching instance size to workload needs.
- **Scaling policies.** Auto-scaling group configurations.
- **Reserved capacity.** Reserved instances or savings plans for predictable workloads.
- **Spot instances.** Lower-cost capacity for fault-tolerant workloads.

### Disaster recovery in IaaS

**Pilot light.** Minimal core running in DR region; scaled up on failover.

**Warm standby.** Scaled-down replica running; scaled up on failover.

**Multi-site active-active.** Both sites serving production.

**Backup and restore.** Backups in DR region; restore on failure. Slowest recovery.

Choice based on RTO (Recovery Time Objective) and RPO (Recovery Point Objective) requirements.

For Nepali banks, NRB directives prescribe DR requirements; typical pattern is warm standby in a secondary region or location, with regular failover testing.

## 3.6 Access control

Access control in cloud is more identity-centric and more granular than traditional network-centric access control.

### IAM as foundation

*Identity and Access Management in cloud is the comprehensive system that establishes identities for users, services, and resources, authenticates those identities, authorises specific permissions, and audits access activity, providing the foundational control plane on which all other cloud security depends.*

Each major cloud provider has a comprehensive IAM system:
- **AWS IAM.** Users, groups, roles, policies. AWS Organizations for multi-account.
- **Microsoft Entra ID** (formerly Azure AD). Cloud and hybrid identity.
- **Google Cloud IAM.** Resource-hierarchical with project, folder, organisation scopes.

### Identity types

**Human users.** Employees, contractors, administrators. Authenticated through console, CLI, API.

**Service accounts.** Identities for workloads — applications, scripts, services.

**Federated identities.** External identities recognised through federation (SAML, OIDC).

**Roles assumed temporarily.** STS (Security Token Service) in AWS; managed identities in Azure.

### Authentication

**Console access.** Username/password plus MFA. MFA universal best practice.

**API access.** Programmatic credentials — access keys, service principal keys. Long-lived; sensitive.

**Federated access.** Single sign-on from corporate IdP.

**Role assumption.** Temporary credentials issued for specific session.

**Machine-to-machine.** Service accounts, managed identities, instance profiles.

### Authorisation

Policies define what identities can do. Several policy types:

**Identity-based policies.** Attached to users, groups, roles. Define what the identity can do.

**Resource-based policies.** Attached to resources. Define who can access the resource.

**Permission boundaries.** Maximum permissions an identity can have, regardless of identity policies.

**Service control policies (SCPs).** Account-wide restrictions in AWS Organizations.

**Conditional policies.** Permissions granted only under specific conditions (source IP, time of day, MFA presence).

### Access control models

**RBAC (Role-Based Access Control).** Roles define permission sets; users assigned to roles. Dominant model.

**ABAC (Attribute-Based Access Control).** Permissions based on attributes (tags, identity properties). More flexible; complex to design.

**PBAC (Policy-Based Access Control).** Policy engine evaluating multiple inputs.

In practice, cloud IAM combines RBAC (most permissions) with ABAC patterns (tag-based, condition-based) and policy engines.

### Privileged access management

Some accounts and roles have elevated privileges. Special care:

- **Just-in-time access.** Privileges granted for specific time windows; revoked after.
- **Privileged access workstations.** Dedicated administrative workstations.
- **Session recording.** Recordings of privileged sessions.
- **Approval workflows.** Multi-person approval for sensitive actions.
- **MFA required for privileged operations.** Without exception.

### Common access-control failures

**Overly-permissive policies.** Wildcards (Effect: Allow, Action: *) on broad scope.

**Long-lived credentials.** Access keys never rotated.

**Shared credentials.** Multiple people using same identity.

**Service accounts with excessive permissions.** Often broader than needed for the actual function.

**Cross-account roles too permissive.** Trust relationships allowing too much.

**Unused identities.** Departed employees' accounts not removed.

**Missing MFA.** Particularly on privileged accounts.

For Nepali bank cloud deployments, IAM-related findings are among the most common audit issues. Strict IAM discipline is foundational to cloud security.

## 3.7 Security vulnerability

### Vulnerability in cloud

*A vulnerability is a weakness in a system, configuration, code, or process that could be exploited by a threat to cause harm, typically expressed as a Common Vulnerabilities and Exposures (CVE) identifier for software vulnerabilities, with severity assessed via the Common Vulnerability Scoring System (CVSS).*

Cloud vulnerability concerns span:

**Provider infrastructure vulnerabilities.** Provider's responsibility; customer indirectly affected.

**Provider service vulnerabilities.** Bugs in managed services. Customer affected.

**Customer-managed software.** OS, applications, libraries customer is responsible for.

**Configuration vulnerabilities.** Misconfigurations creating security weakness.

**Architecture vulnerabilities.** Design issues exposing data or operations.

### Categories of cloud vulnerabilities

**Software vulnerabilities.** CVEs in OS, applications, libraries, container images. Common categories:
- Remote code execution.
- Privilege escalation.
- Information disclosure.
- Denial of service.

**Configuration vulnerabilities.** The dominant cause of cloud incidents:
- Public S3 buckets.
- Open security group rules.
- Disabled logging.
- Default credentials.
- Weak encryption settings.

**API vulnerabilities.** Insecure API design or implementation:
- Broken authentication.
- Broken authorisation.
- Excessive data exposure.
- Lack of rate limiting.
- Mass assignment.
- The OWASP API Top 10 enumerates common patterns.

**Container vulnerabilities.** Vulnerable images, runtime misconfigurations.

**Supply chain vulnerabilities.** Compromised dependencies, base images, third-party services.

### Vulnerability management process

The discipline:

1. **Inventory.** Know what is deployed.
2. **Scanning.** Identify vulnerabilities continuously.
3. **Triage.** Assess severity and impact in your specific environment.
4. **Prioritisation.** Order by risk.
5. **Remediation.** Patch, configuration change, mitigation.
6. **Verification.** Confirm remediation.
7. **Tracking.** Maintain visibility into status.

### Vulnerability scanning tools

**Cloud-native.**
- **AWS Inspector.** EC2 and container vulnerability assessment.
- **Azure Defender for Cloud.** Cross-cloud vulnerability assessment.
- **GCP Security Command Center.** Includes vulnerability findings.

**Third-party.**
- **Qualys.** Comprehensive scanning.
- **Tenable.** Nessus and Tenable.io.
- **Rapid7.** InsightVM.
- **Wiz, Orca, Lacework.** Cloud-native security platforms.

**Container-specific.**
- **Anchore.** Container image analysis.
- **Twistlock / Prisma Cloud.** Container security.
- **Snyk.** Dependencies and containers.
- **Trivy.** Open-source.

**Infrastructure as Code.**
- **Checkov.** IaC scanning.
- **tfsec.** Terraform-specific.
- **Bridgecrew.** Cloud-native IaC.

### Continuous vulnerability management

Cloud environments demand continuous rather than periodic vulnerability management:

- **At build time.** Scanning images and IaC before deployment.
- **At deployment.** Verifying configuration meets standards.
- **At runtime.** Monitoring for newly-disclosed vulnerabilities and configuration drift.
- **Continuous.** New vulnerabilities discovered daily; continuous reassessment.

## 3.8 Patch and configuration management

### Patch management

*Patch management is the systematic process of acquiring, testing, and installing software updates that address security vulnerabilities, bugs, and feature additions, ensuring systems remain protected against known threats while minimising operational disruption.*

In cloud, patch management responsibility varies by service model:
- **SaaS.** Provider responsibility entirely.
- **PaaS.** Provider patches the platform; customer patches application code.
- **IaaS.** Customer responsibility for OS and applications.
- **Containerised.** Customer responsibility for container images.

### Patch management process

**Identification.** Vendor announcements, vulnerability databases, scan results.

**Categorisation.** Critical, high, medium, low.

**Prioritisation.** By risk, exposure, criticality of systems.

**Testing.** In test/staging environment.

**Approval.** Change management approval.

**Deployment.** In phases — test, pilot, production.

**Verification.** Confirming successful application.

**Documentation.** Records of what was patched when.

### Cloud-native patching

**Immutable infrastructure pattern.** Don't patch in place. Build a new image with patches applied; deploy by replacing instances. Cleaner than in-place patching; supports rollback easily.

**Managed services.** Patching is the provider's responsibility; customer reviews update notes for compatibility implications.

**Auto-update for containers.** Container images rebuilt automatically when base images update.

**Patch automation.** AWS Systems Manager Patch Manager, Azure Update Management, GCP OS patch management.

### Configuration management

*Configuration management is the discipline of establishing and maintaining consistency in the operational state of systems and software, including security-relevant configurations, through documented baselines, automated enforcement, and continuous verification.*

In cloud, configuration management is critical because misconfiguration is the dominant security failure.

### Configuration baselines

**Source of truth.** Documented baselines for each service type.

**Examples:**
- S3 buckets: encryption enabled, public access blocked, versioning enabled, access logging enabled.
- EC2 security groups: no 0.0.0.0/0 on SSH/RDP, specific allow rules only.
- IAM users: MFA enabled, no console access if not needed, access keys rotated regularly.
- VPC: flow logs enabled, NAT gateway for outbound, no default security groups in use.

**Reference frameworks:**
- CIS Benchmarks for AWS, Azure, GCP, Kubernetes.
- Provider-specific best-practice documents.
- Sector-specific (NRB directives, PCI-DSS).

### Configuration as code

The dominant pattern:

- **Terraform** for multi-cloud.
- **CloudFormation** for AWS-specific.
- **ARM templates / Bicep** for Azure.
- **Deployment Manager** for GCP.
- **Pulumi** for code-based IaC.

All cloud resources defined in version-controlled code. Changes via pull requests. Automated deployment through CI/CD.

### Drift detection

*Configuration drift is the deviation between an intended (documented or coded) configuration and the actual operational state of a system, typically arising from ad-hoc manual changes, emergency fixes, or unintended modifications, undermining the security and operational benefits of a defined baseline.*

Drift detection tools:
- **AWS Config.** Records resource state; evaluates against rules.
- **Azure Policy.** Continuous compliance evaluation.
- **GCP Config Validator and Config Controller.**
- **Third-party CSPM tools** (Wiz, Orca, Prisma Cloud) provide drift detection across multi-cloud.

When drift is detected:
- Alert generated.
- Investigation — was the change authorised? Necessary?
- Either: codify the change into baseline; or: revert to baseline.

### Compliance as code

Compliance checks as code, run continuously:

- **AWS Config Rules.** Specific compliance checks.
- **Open Policy Agent (OPA).** General policy framework.
- **Cloud Custodian.** Multi-cloud policy enforcement.
- **InSpec.** Compliance and configuration assessment.

### Configuration management failures

Common audit findings in Nepali bank cloud deployments:

- Baseline documentation absent or outdated.
- Manual changes not reflected in code.
- Drift not detected for extended periods.
- Compliance checks not run automatically.
- Approval workflows bypassed.
- Emergency changes not later normalised.

### The integration of patch and configuration

In modern cloud operations, patch and configuration management converge:

- Both are configuration changes.
- Both flow through the same pipelines.
- Both use the same review processes.
- Both leverage the same automation.

The discipline is unified: declarative state of the environment, version-controlled, automated deployment, continuous verification.

The next chapter shifts from general security management to the specific concern of data privacy — the lifecycle of data in cloud, the protection mechanisms, and the operational practices that ensure privacy obligations are met.
