---
title: 'Chapter 5 — Monitoring, Auditing and Management'
sidebar_label: 'Ch 05 — Monitoring, Auditing and Management'
sidebar_position: 5
description: 'Chapter 5 of Security and Privacy in Cloud Computing (ENCTNS571).'
slug: /ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing/notes/ch05
tags: [msncs, ENCTNS571, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

A cloud environment that cannot be observed cannot be secured. A security incident that cannot be detected cannot be responded to. A control that cannot be verified provides no assurance. This chapter takes up the operational disciplines that make cloud security and privacy real in practice rather than only on paper — proactive monitoring of what is happening; incident response when something goes wrong; specific monitoring for unauthorised access, malicious traffic, privilege abuse, and intrusion; detection-event-and-alert auditing; tamper-proof audit logs; quality-of-service management; secure management of the environment; user and identity management; and the SIEM platforms that orchestrate everything.

## 5.1 Proactive activity monitoring

### Proactive monitoring

*Proactive monitoring is the continuous observation and analysis of system, application, network, and security activity intended to identify anomalies, performance degradations, security threats, and operational issues before they cause significant impact, distinct from reactive monitoring that responds after incidents have occurred.*

The contrast:

**Reactive.** Wait for users to report problems; respond to alerts after they fire.

**Proactive.** Continuously observe; investigate anomalies; predict issues; act before users notice.

Cloud environments enable proactive monitoring at a scale and resolution impractical in traditional environments — comprehensive telemetry, real-time analytics, ML-enhanced detection.

### What to monitor in cloud

Categories:

**Resource health.** Are services up; are instances running; are critical components responding.

**Performance.** Response times, throughput, error rates, latency distributions.

**Capacity.** Resource utilisation; scaling events; quota usage.

**Cost.** Spending rates; budget consumption; anomalous spending.

**Security.** Authentication events; access patterns; configuration changes; threat-indicator matches.

**Compliance.** Configuration drift from policy; audit-relevant events.

**Application.** Custom application metrics; business KPIs.

### Monitoring data sources

**Metrics.** Numerical measurements at intervals. CPU, memory, request rate, latency.

**Logs.** Event records. Application logs, system logs, audit logs.

**Traces.** Distributed request tracking. How a request flowed through services.

**Events.** Discrete occurrences — deployments, configuration changes, scaling events.

**Synthetic monitoring.** Active probes — periodic test transactions to verify functionality.

### Cloud-native monitoring services

Each major provider offers monitoring:

**AWS:**
- CloudWatch (metrics, logs, alarms).
- CloudTrail (API audit logging).
- Application Insights via X-Ray.
- AWS Config (resource configurations and changes).

**Azure:**
- Azure Monitor (metrics, logs, alerts).
- Application Insights.
- Log Analytics.
- Azure Activity Log (subscription-level events).

**GCP:**
- Cloud Monitoring (metrics, alerts).
- Cloud Logging (logs).
- Cloud Trace (distributed tracing).
- Cloud Audit Logs.

### Open-source and third-party

**Prometheus.** Metrics collection; foundational for cloud-native.

**Grafana.** Visualisation; multi-source dashboards.

**Elastic Stack (ELK).** Logs and search.

**OpenSearch.** AWS-supported fork of Elasticsearch.

**Datadog.** Comprehensive monitoring SaaS.

**New Relic.** APM and monitoring.

**Splunk.** Logs at enterprise scale.

**Dynatrace.** Full-stack with AI.

**Jaeger / Zipkin.** Distributed tracing.

For Nepali enterprise context, the typical pattern is provider-native monitoring (CloudWatch for AWS, Azure Monitor for Azure) supplemented by open-source (Prometheus + Grafana) and sometimes commercial platforms for analytics.

### Monitoring as code

Modern operations defines monitoring through code:

- Dashboards in code (Grafana JSON, CloudWatch dashboard JSON).
- Alerts in code (Prometheus AlertManager rules, CloudWatch alarm definitions).
- Synthetics in code (synthetic-monitoring definitions).

Benefits: version control, peer review, consistency, reproducibility.

### Alerting

**Effective alerts:**
- Actionable. The recipient can do something.
- Meaningful. They indicate a real problem.
- Timely. Soon enough to act.
- Routed appropriately. To the right person/team.
- Documented. Runbooks for each alert.

**Alert fatigue** is the operational disease of too many alerts, resulting in real ones being missed. Continuous tuning to reduce noise is essential.

### Anomaly detection

ML-driven anomaly detection supplements rule-based:

- Baselines learned from historical data.
- Deviations flagged.
- Reduces need to hand-tune thresholds.

Cloud-native examples:
- **AWS CloudWatch Anomaly Detection.**
- **Azure Anomaly Detector.**
- **GCP Operations anomaly detection.**

## 5.2 Incident response

### Incident response

*Incident response is the organised approach to addressing and managing the aftermath of a security incident or breach, with the goal of limiting damage and reducing recovery time and costs, comprising phases of preparation, detection and analysis, containment, eradication, recovery, and lessons learned, typically articulated in NIST SP 800-61 and similar frameworks.*

Discussed extensively in the Digital Forensics subject. Here the focus is on cloud-specific considerations.

### Cloud-specific incident response

**Distinct considerations:**

**Shared responsibility.** Some aspects (provider infrastructure) only the provider can address.

**Speed.** Incidents in cloud can move quickly — auto-scaling can both help and hurt.

**Evidence preservation.** Ephemeral resources may be destroyed before investigation. Forensic snapshots, log preservation critical.

**Provider engagement.** Provider may need to participate in response.

**Geographic complexity.** Incidents may span regions and jurisdictions.

### Cloud incident-response phases

**Preparation.**
- Incident response plan adapted for cloud.
- Tooling deployed (forensic tools, snapshots, log analysis).
- Contacts established (provider abuse, regulators).
- Playbooks for common scenarios.

**Detection.**
- Monitoring and alerting (Section 5.1).
- Threat intelligence integration.
- Anomaly detection.

**Analysis.**
- Determine scope and impact.
- Identify root cause.
- Document findings.

**Containment.**
- Short-term: stop the bleeding (isolate compromised resources, disable accounts, block traffic).
- Long-term: scope and prevent spread.

**Eradication.**
- Remove malicious presence.
- Patch vulnerabilities.
- Reset credentials.

**Recovery.**
- Restore from clean state.
- Monitor for re-compromise.
- Validate restoration.

**Lessons learned.**
- Document what happened.
- Identify control gaps.
- Update procedures.

### Cloud forensic considerations

Covered in detail in the Digital Forensics subject Chapter 7. Brief recap:

- **Snapshot before changes.** Preserve evidence before remediation.
- **Memory acquisition.** Where possible from compromised VMs.
- **Log preservation.** Export logs to immutable storage.
- **API audit logs.** Often the primary evidence.
- **Chain of custody.** Document who did what when.

### Provider incident reporting

Each provider has security contacts:

- **AWS Security.** aws-security@amazon.com for vulnerability reports.
- **Azure Security Response Center.** secure@microsoft.com.
- **GCP Trust & Safety.** Via Cloud Console.

Customer security teams should know these contacts before they're needed.

### Regulatory reporting

For Nepali context:
- **NRB notification** required for incidents affecting bank operations.
- **Privacy Act provisions** may require subject notification for personal-data breaches.
- **npCERT** for nationally-significant incidents.
- **Sectoral regulators** (NTA, MOHP) for sector-specific.

Timelines vary by regulation. Documented procedures with clear escalation matter.

## 5.3 Monitoring for unauthorised access, malicious traffic, privilege abuse, intrusion

The specific security-monitoring categories.

### Unauthorised access detection

**Authentication anomalies:**
- Login from unfamiliar locations.
- Login at unusual times.
- Multiple failed authentication attempts.
- Successful login after failures (possible credential stuffing success).
- Authentication from anonymising services (Tor, VPN exits).
- Impossible travel (login from far locations in short time).

**Cloud-native examples:**
- AWS GuardDuty detects various unauthorised access patterns.
- Azure Defender for Identity and Defender for Cloud Apps.
- GCP Security Command Center.

### Malicious traffic detection

**Network-level indicators:**
- Connections to known-malicious destinations.
- Unusual traffic volumes.
- Communication on uncommon ports.
- Protocol anomalies.
- DGA-generated domain queries.
- C2 beacon patterns.

**Cloud capabilities:**
- VPC flow logs for traffic visibility.
- Network IDS (where deployed).
- Cloud-native threat detection (GuardDuty for AWS).

### Privilege abuse detection

**Indicators:**
- Privilege escalations (assuming higher-privileged roles).
- Use of privileged operations outside normal patterns.
- Granting of permissions to other accounts.
- Modification of audit logging configurations.
- Changes to security controls.

**Detection approaches:**
- Baseline normal privileged-account behaviour.
- Alert on deviations.
- Multi-person review for sensitive operations.

### Intrusion detection

In cloud, intrusion includes:
- Compromise of cloud accounts.
- Exploitation of vulnerable services.
- Insertion of malicious code (compromised images, malicious commits).
- Lateral movement within cloud environment.
- Persistence mechanisms (new accounts, new resources).

**Detection layers:**
- **Cloud-platform detection.** Provider-native services (GuardDuty, Defender, SCC).
- **EDR on cloud workloads.** Endpoint detection on VMs and containers.
- **Network detection.** Where TLS inspection or behavioural analysis enabled.
- **Application detection.** WAF, RASP for application-layer attacks.
- **Identity protection.** Behavioural analytics on identities.

## 5.4 Detection, events and alerts auditing

### Detection event flow

A detection generates an event; the event creates an alert; the alert is investigated; the investigation reaches a conclusion; the conclusion is documented.

**Detection event.** A specific observation that may indicate a problem.

**Alert.** A notification raised based on the event.

**Incident.** Confirmed problem requiring response.

Not every event becomes an alert; not every alert becomes an incident. The funnel narrows.

### Alert lifecycle

1. **Generation.** Detection rule fires.
2. **Enrichment.** Context added (asset details, user info, threat intel).
3. **Routing.** Sent to appropriate queue/team.
4. **Acknowledgement.** Analyst takes ownership.
5. **Investigation.** What happened; what is the scope.
6. **Classification.** False positive, true positive (incident), benign, informational.
7. **Action.** Response if incident; documentation either way.
8. **Closure.** Final disposition.
9. **Metrics.** Statistics for performance management.

### Auditing the detection system itself

Detection systems should themselves be audited:

- **Coverage.** Are critical assets monitored?
- **Effectiveness.** Are real attacks being detected?
- **Performance.** Time from event to alert to response.
- **False positive rate.** What proportion of alerts are false?
- **False negative rate.** What's being missed?
- **Tuning history.** Documented changes to rules.

### Red team and purple team

**Red team.** Simulated attacks to test detection.

**Purple team.** Collaborative red and blue team exercise — attackers and defenders working together to identify gaps.

For Nepali bank context, red team exercises by external firms are increasingly common. Insights inform detection improvements.

## 5.5 Tamper-proofing audit logs

### Audit log integrity

If audit logs can be modified after the fact, their evidentiary value collapses. Tamper-evidence is critical.

### Approaches

**WORM storage.** Write-once-read-many. S3 Object Lock in compliance mode prevents deletion within retention period.

**Cryptographic chaining.** Each log entry includes hash of previous entry. Modification of historical entries invalidates the chain.

**Separation of duties.** Those who can modify systems cannot modify audit logs.

**Off-system logging.** Logs forwarded to systems administrators of the source cannot access.

**Cryptographic signing.** Logs signed; signatures verifiable.

**Blockchain-based.** Logs anchored to blockchain for tamper-evidence (research-stage).

### Cloud-native tamper-evident logging

**AWS:**
- CloudTrail logs to S3 with Object Lock in compliance mode.
- CloudTrail Lake for queryable log retention.
- KMS-based signing.

**Azure:**
- Azure Monitor with immutability policies.
- Sentinel for SIEM with tamper-resistant storage.

**GCP:**
- Cloud Audit Logs.
- Forwarded to BigQuery or other storage with retention policies.

### Retention compliance

Audit logs must be retained per applicable requirements:

- **NRB directives** for banks specify retention periods for various audit logs.
- **PCI-DSS** requires at least 1 year online, 3 months immediately retrievable.
- **General compliance** often requires multi-year retention.

Cloud cost considerations favour tiered storage — recent logs in hot storage; older in cold/archive.

## 5.6 Quality of Services

### QoS in cloud context

Quality of Service in cloud is less about packet-level prioritisation (the classical networking sense) and more about service-level commitments and resource allocation.

**Cloud QoS dimensions:**
- **Service availability.** Uptime per SLA.
- **Performance.** Response times, throughput.
- **Capacity.** Resources available.
- **Support.** Response and resolution times.
- **Compliance.** Maintained certifications.

### SLA framework

**Customer SLA.** Provider commits to customer.

**Internal SLA.** Customer's own commitment to their users.

**OLA (Operational Level Agreement).** Internal between teams.

**Underpinning contracts.** Provider's third-party arrangements.

Each layer must support the layers above for customer-facing commitments to hold.

### QoS monitoring

**Service-level objectives (SLOs).** Specific measurable targets.
- Availability SLO: 99.9%.
- Latency SLO: 95% of requests under 500ms.
- Error rate SLO: less than 0.1%.

**Service-level indicators (SLIs).** Actual measurements.

**Error budget.** Allowed downtime/error/slowness; consumed over time.

The Google SRE approach to SLOs and error budgets has become industry-standard. Many Nepali enterprises adopting cloud-native operations follow these principles.

### Quality management practices

- Continuous monitoring of SLIs.
- Regular review against SLOs.
- Escalation when SLOs at risk.
- Root cause analysis of failures.
- Reliability engineering.
- Capacity planning.
- Performance optimisation.

## 5.7 Secure management

### Secure management of cloud environment

Managing cloud itself securely:

**Access to management.**
- Strong authentication for cloud console access.
- MFA mandatory.
- Role-based access; least privilege.
- Bastion / privileged-access workstations.
- Just-in-time access for elevated operations.
- Session recording for high-privilege.

**API access.**
- Programmatic credentials rotated regularly.
- Audit of API usage.
- Restriction of API access to specific source IPs where possible.
- Separation of API credentials by purpose.

**Configuration management.**
- All changes through reviewed, approved, recorded pipelines.
- IaC as source of truth.
- Drift detection.

**Change management.**
- Risk-assessed changes.
- Pre-implementation review.
- Approved schedules.
- Post-implementation verification.
- Rollback capability.

### Privileged access management for cloud

Specific tools:
- **AWS Identity Center (formerly SSO).** Federated access management.
- **Azure Privileged Identity Management.** Just-in-time elevation.
- **GCP IAM with conditional access.**
- **Third-party.** CyberArk, BeyondTrust, Delinea for cross-cloud privileged access.

### Automation security

Automation is powerful and dangerous. Automated processes with credentials can do tremendous damage if compromised.

**Practices:**
- Minimum-privilege service accounts.
- Credentials in secret managers.
- Short-lived credentials where possible.
- Audit of automation activity.
- Approval gates for sensitive automated actions.
- Rate limits to prevent runaway automation.

### Tenant management

For organisations operating cloud services for tenants (SaaS providers, multi-customer platforms):

- Tenant isolation enforced technically.
- Tenant-specific access controls.
- Per-tenant audit trails.
- Tenant data segregation.
- Compliance per tenant agreements.

## 5.8 User management

### User lifecycle

The stages of user lifecycle in cloud:

**Provisioning.** Account creation; initial access; onboarding.

**Operation.** Day-to-day access; role changes; permission adjustments.

**Periodic review.** Access still needed; appropriate scope.

**Deprovisioning.** Account disablement and eventual removal on departure or role change.

### Automated user lifecycle

For organisations of any size, manual user management doesn't scale. Automation through:

**HR-driven workflows.** HR system as source of truth; cloud access provisioned/deprovisioned automatically.

**SCIM (System for Cross-domain Identity Management).** Standard protocol for user provisioning across systems.

**Identity governance.** Identity governance and administration tools (Okta, Sailpoint, OneLogin) automate lifecycle.

### Access reviews

Periodic verification that access is still needed:

- Quarterly or annual.
- Manager review of direct reports' access.
- Role owner review of role assignments.
- Privileged-access additional review.

Cloud-native tools:
- **AWS Access Analyzer.** Identifies unintended access.
- **Azure Access Reviews.** In Microsoft Entra ID.
- **GCP IAM Recommender.** Suggests permission reductions.

### Separation of duties

Critical operations require multiple people:

- Single individual cannot approve and execute changes.
- Production access requires approval from another party.
- Administrative actions on sensitive systems require multi-person approval.

## 5.9 Identity management

### Modern identity management

*Identity management in cloud is the comprehensive system of policies, processes, and technologies that establishes and maintains digital identities for users, devices, and services, enabling secure authentication and authorisation across cloud and hybrid environments, integrated with broader organisational identity infrastructure.*

### Federation and SSO

**SAML.** Long-established federation protocol. SAML 2.0 widely supported.

**OIDC (OpenID Connect).** Modern federation built on OAuth 2.0. Increasingly common.

**SSO.** Users authenticate once; access multiple services without re-authenticating.

### Identity providers

**Cloud-native:**
- Microsoft Entra ID (formerly Azure AD).
- Google Workspace identity.
- AWS Identity Center.

**Third-party:**
- Okta.
- Auth0 (Okta).
- PingIdentity.
- OneLogin.
- ForgeRock.

**Enterprise integration:**
- Active Directory (on-premises).
- Active Directory Federation Services (ADFS).
- LDAP.

For Nepali enterprises with Microsoft-centric environments, Entra ID is dominant. Multi-vendor environments often use Okta or similar as the integration point.

### Modern authentication mechanisms

**MFA.** Multi-factor universally.

**Passwordless.** Moving away from passwords:
- FIDO2 / WebAuthn.
- Mobile-device-based authenticators.
- Hardware security keys (YubiKey).
- Biometric.

**Risk-based authentication.** Authentication requirements adjust based on risk signals — location, device, time, behaviour.

**Continuous authentication.** Trust continuously evaluated; access can be revoked mid-session.

### Conditional access

Access decisions consider context:
- User identity.
- Device compliance.
- Network location.
- Application sensitivity.
- Behavioural signals.

Conditional access policies enforce nuanced access controls.

### Identity protection

Detecting and responding to identity-related threats:

- Compromised credential detection.
- Anomalous behaviour identification.
- Account compromise response.
- Identity-based attack patterns.

Cloud-native:
- **Microsoft Defender for Identity.**
- **AWS IAM Access Analyzer / GuardDuty.**
- **GCP Cloud IDS.**

## 5.10 Security Information and Event Management

### SIEM

*A Security Information and Event Management system aggregates logs and events from across an organisation's IT infrastructure, normalises and enriches them, applies analytics for threat detection, supports investigation through search and correlation, and orchestrates response actions — providing the central nervous system of modern security operations.*

Discussed extensively in the Digital Forensics subject Chapter 8. Here the focus is on cloud-specific SIEM considerations.

### Cloud SIEM evolution

**On-premises SIEM (Splunk, ArcSight, QRadar).** Mature; expensive; significant operational burden.

**Cloud SIEM (Microsoft Sentinel, Google Chronicle, AWS Security Lake).** Cloud-native; scales with data; pay-per-use models.

**Open-source.** Wazuh, OSSIM, Security Onion, ELK with security analytics.

### Cloud SIEM architecture

```
Cloud workloads          On-premises          SaaS apps
     |                       |                    |
     |--- Forwarders ----    Connectors        APIs
                       |                    |
                       v                    v
                +--------------------------------+
                |          SIEM                  |
                |  - Ingestion                   |
                |  - Normalisation               |
                |  - Enrichment                  |
                |  - Detection                   |
                |  - Correlation                 |
                |  - Storage                     |
                +--------------------------------+
                       |              |
                       v              v
                   Analysts      Automation
```

Logs flow in; rules and analytics detect; analysts and automation respond.

### Key SIEM platforms for cloud

**Microsoft Sentinel.**
- Cloud-native (Azure).
- Strong integration with Microsoft ecosystem.
- KQL (Kusto Query Language) for queries.
- Built-in analytics and ML.
- Playbook automation through Logic Apps.

**Google Chronicle.**
- Cloud-scale storage and retention.
- YARA-L for detection rules.
- Strong threat intelligence integration.
- Sub-second search across petabytes.

**Splunk Cloud.**
- Mature SIEM in cloud form.
- Extensive ecosystem and apps.
- Comprehensive language (SPL).

**AWS Security Lake.**
- Data lake for security data.
- Standardised format (OCSF — Open Cybersecurity Schema Framework).
- Integration with various analytics tools.

**Wazuh.**
- Open-source.
- Increasing cloud-native capabilities.
- Endpoint and SIEM combined.

### SIEM in Nepali enterprise context

For Nepali banks and major enterprises:

- **Splunk** has substantial market presence.
- **Microsoft Sentinel** growing rapidly due to M365/Azure penetration.
- **Open-source** (Wazuh, ELK) common for smaller deployments and mid-market.
- **Limited Chronicle** adoption (less established in Nepal).

NRB-regulated entities are expected to have SIEM capability with appropriate retention and continuous monitoring.

### SIEM operations

**Daily operations:**
- Alert triage by SOC analysts.
- Investigation of confirmed incidents.
- Threat hunting.
- Rule tuning.
- Indicator ingestion.

**Weekly/monthly:**
- Detection coverage review.
- False positive reduction.
- New detection development.
- Metrics review.

**Quarterly/annual:**
- Strategic alignment.
- Tool evaluation.
- Capability development.

### SOC organisation

A Security Operations Centre typically includes:

- **Tier 1 analysts.** Initial alert triage; standard playbook execution.
- **Tier 2 analysts.** Deeper investigation; non-standard incidents.
- **Tier 3 / Incident response.** Most serious incidents.
- **Threat hunters.** Proactive search for threats.
- **Detection engineers.** Building and tuning detection rules.
- **Threat intelligence analysts.** External threat awareness.
- **SOC management.** Operations management.

For Nepali bank context, larger banks operate 24/7 internal SOCs. Smaller institutions use MSSPs (Managed Security Service Providers) or shared SOC arrangements.

### SOAR — orchestration and response

*SOAR (Security Orchestration, Automation, and Response) platforms automate the workflow of incident response — coordinating tools, executing playbooks, gathering context, and taking actions — reducing the manual work and consistency variability of human-only response.*

Examples:
- Microsoft Sentinel Playbooks (Logic Apps).
- Splunk SOAR (formerly Phantom).
- Cortex XSOAR.
- IBM Resilient.
- Tines.

SOAR + SIEM is the modern security-operations stack. Automated containment, evidence gathering, ticket creation, notifications all flow through playbooks rather than manual analyst work.

### Metrics for security operations

What to measure:

- **Mean Time to Detect (MTTD).** From event to detection.
- **Mean Time to Investigate (MTTI).** From alert to confirmed disposition.
- **Mean Time to Contain (MTTC).** From confirmation to containment.
- **Mean Time to Resolve (MTTR).** From confirmation to closure.
- **Alert volume and false positive rate.**
- **Detection coverage** (against ATT&CK or other framework).

Trends matter more than absolute values; the discipline pushes toward shorter cycle times.

### The integrated operational picture

Modern cloud security operations combines:

- Comprehensive monitoring (Section 5.1).
- Incident response (Section 5.2).
- Specific threat detection (Sections 5.3-5.4).
- Tamper-evident logging (Section 5.5).
- SLA and quality management (Section 5.6).
- Secure management practices (Section 5.7).
- User lifecycle (Section 5.8).
- Identity management (Section 5.9).
- SIEM and SOAR (Section 5.10).

Together they constitute the operational reality of running secure cloud environments. Each component depends on the others; the system is what protects.

The next chapter — the final chapter — synthesises the disciplines into the specific cloud-security concerns of SaaS security, security monitoring, security architecture design, data security, application security, virtual machine security, and identity management and access control.
