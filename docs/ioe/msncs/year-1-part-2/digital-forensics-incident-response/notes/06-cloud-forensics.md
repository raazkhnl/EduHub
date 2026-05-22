---
title: 'Chapter 6 — Cloud Forensics'
sidebar_label: 'Ch 06 — Cloud Forensics'
sidebar_position: 6
description: 'Chapter 6 of Digital Forensics and Incident Response (ENCTNS551).'
slug: /ioe/msncs/year-1-part-2/digital-forensics-incident-response/notes/ch06
tags: [msncs, ENCTNS551, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Cloud computing has reshaped what an organisation's IT infrastructure looks like. The neat boundary of the corporate data centre — physical servers in a known room, controlled by the organisation's own staff — has dissolved into virtual machines, containers, serverless functions, and managed services running on hardware owned and operated by hyperscale cloud providers. For digital forensics, this is a serious shift. The investigator who was used to imaging a physical disk now faces evidence that lives on hardware they do not own, in jurisdictions they cannot enter, under control of providers who follow their own procedures. This chapter covers what cloud forensics is, why it is harder than traditional forensics, and how AWS, Azure, and Google Cloud Platform support forensic work in practice.

## 6.1 Introduction to digital forensics in the cloud environment

### Cloud forensics

*Cloud forensics is the sub-discipline of digital forensics concerned with the identification, preservation, acquisition, examination, analysis, and presentation of digital evidence that resides on or transits through cloud computing infrastructure, conducted under the constraints of cloud-service architectures, shared-tenancy environments, and cross-jurisdictional legal frameworks.*

The discipline is recognisably forensics — the same investigative goals, the same standards of admissibility, the same chain-of-custody discipline. What differs is the environment in which it is conducted.

### The cloud computing landscape

For context, the standard cloud service models matter for forensics because each gives the investigator different access:

**Infrastructure-as-a-Service (IaaS).** Customer rents virtual machines, virtual networks, virtual storage. Customer manages OS, applications, and data. Provider manages the underlying hardware, hypervisor, and physical facilities. Examples: AWS EC2 with EBS volumes, Azure Virtual Machines, GCP Compute Engine.

For forensics: the customer has access to the guest OS and can image disks, capture memory (via the guest), collect logs. The hypervisor layer below is opaque.

**Platform-as-a-Service (PaaS).** Customer brings application code and data; provider manages OS, runtime, and middleware. Examples: AWS Elastic Beanstalk, Azure App Service, GCP App Engine, managed databases like Amazon RDS, Azure SQL Database, Cloud SQL.

For forensics: the customer has access to application logs and data but no OS access. Disk imaging is not possible.

**Software-as-a-Service (SaaS).** Customer uses an application; provider manages everything. Examples: Microsoft 365, Google Workspace, Salesforce, Slack, Zoom.

For forensics: the customer has only what the provider's interfaces expose — audit logs, exported data, administrative reports.

**Function-as-a-Service (FaaS) / Serverless.** Customer provides code that runs in response to events. Examples: AWS Lambda, Azure Functions, GCP Cloud Functions.

For forensics: ephemeral runtime environments with limited persistent state. Logs from invocations may be the only artefact.

**Containers and Kubernetes.** Customer packages applications into containers; orchestration platform (managed Kubernetes — EKS, AKS, GKE — or self-managed) runs them. Containers are typically short-lived.

For forensics: container images, runtime logs, orchestrator events. The container itself may be gone by the time investigation begins.

### Shared responsibility

A foundational concept that all major providers publish:

**The cloud provider is responsible for** the physical infrastructure, the virtualisation layer, the network underlay, the managed-service backbones. The customer cannot directly investigate any of this.

**The customer is responsible for** their data, configuration, application code, identity management, and use of the provider's services. The customer can investigate everything in this layer — though the tools and access depend on the service model.

For an investigator, the practical consequence: forensic work is concentrated on the customer's portion of the stack. Investigating the provider's portion requires cooperation from the provider (typically via legal process — subpoenas, mutual legal assistance treaties, or in extreme cases, the provider's own incident-response procedures).

### Why cloud forensics matters

The shift to cloud is well advanced in Nepal as elsewhere:

- Government agencies host services on the Government Integrated Data Centre and increasingly on AWS, Azure, and GCP regions accessible to Nepali users (typically Mumbai, Singapore, Hong Kong).
- Nepali commercial banks have moved peripheral services (corporate websites, customer-portal back-ends, analytics) to cloud, while keeping core banking on-premises.
- Fintech platforms (eSewa, Khalti, IME Pay) operate hybrid architectures — some workloads in cloud, others on-premises in Nepal.
- E-commerce platforms (Daraz, Sastodeal, smaller Nepali sites) run substantially on cloud infrastructure.
- Most SaaS productivity (Microsoft 365, Google Workspace) is fully cloud.

When incidents happen in these environments, traditional disk-imaging-the-server forensics is impossible. The investigation must use cloud-native tools and techniques.

## 6.2 Challenges in analysing digital evidence in the cloud environment

The challenges fall into several categories.

### Limited control over infrastructure

The customer does not own the hardware. They cannot physically seize a server, image its disks, or freeze it for analysis. Everything must be done through provider-mediated interfaces.

When the provider's own staff need access (for example, in fraud investigations involving the provider's services), procedures vary. Major providers (AWS, Microsoft, Google) publish law-enforcement guidelines describing how legal process is handled. Response times measured in weeks are common.

For internal investigations where legal process is not involved, the customer is limited to what the provider's APIs and console expose.

### Multi-tenancy and isolation

Cloud hardware is shared. A single physical server may host VMs from many different customers. The hypervisor provides logical isolation but the underlying hardware is shared.

For forensics:
- Evidence about one tenant cannot in normal circumstances reveal data from another tenant — the isolation prevents this.
- However, side-channel research (Spectre, Meltdown, and successors) has shown that isolation is imperfect at the hardware level. Adversarial cross-tenant attacks are a known threat.
- The provider's infrastructure logs see all tenants. A subpoena or legal request for forensic data must be precisely scoped to avoid exposing data from uninvolved tenants.

### Data location and jurisdiction

Cloud data physically resides somewhere — in a specific data centre in a specific country. The legal regime governing that data may differ from where the customer is located.

A Nepali bank using AWS Mumbai stores customer data in India. If a Nepali court orders the bank to produce that data:
- The bank, being a Nepali entity, must comply.
- AWS will hand over the data to the bank (its customer) under the contract.
- But cross-border issues arise if Indian authorities also have claims, or if Nepali law conflicts with Indian data-protection requirements.

For investigations involving providers headquartered in other jurisdictions (US for AWS, Microsoft, Google), data may be in US-controlled facilities. The US CLOUD Act (2018) authorises US authorities to compel disclosure of data held by US providers regardless of where stored. Other jurisdictions have their own data-residency requirements.

Nepali providers and customers must navigate this carefully. For Sensitive sectors (banking, telecommunications), Nepal Rastra Bank and NTA have issued directives on data residency. The 2018 Privacy Act and constitutional Article 28 also constrain cross-border data movement.

### Ephemeral resources

A traditional server runs for years and accumulates artefacts. A cloud container or function may exist for milliseconds. When an investigation begins days or weeks after an incident:

- The VM that was compromised may have been terminated and replaced as part of auto-scaling.
- The container that ran the malicious code may not exist anymore.
- The serverless function that processed the malicious input ran briefly and is gone.
- The Spot Instance was reclaimed by AWS hours after the incident.

The forensic artefacts that remain are those that were captured to persistent logs while the resource existed. If logging was not enabled, the evidence is permanently lost.

This puts a premium on forensic readiness in cloud environments: logging configured before incidents occur, retention long enough to support investigations, and structured storage that supports search and export.

### Encryption with provider-held keys

Cloud services routinely encrypt data — at rest, in transit, sometimes in use (confidential computing). Encryption keys may be:

- **Customer-managed.** The customer holds the keys (often in a cloud key-management service or HSM). Forensic access requires the customer's cooperation.
- **Provider-managed.** The provider holds keys; data is encrypted at rest but transparent to the customer through the service interface. Forensic acquisition of raw storage would yield ciphertext only.
- **End-to-end encrypted by the customer's application.** The provider does not see plaintext. Forensic access requires the application's keys.

For the customer doing forensics on their own data, this is usually transparent — they have the keys via the cloud KMS. For external investigators (law enforcement) acquiring data via the provider, encryption may limit what is recovered.

### Log access constraints

Cloud providers generate many useful logs but access varies:

- Customer-facing logs (account activity, API calls, service events) are available through provider interfaces.
- Hypervisor-level logs are generally not accessible to customers.
- Network-flow logs at the underlying network layer are not available except via specific services (VPC Flow Logs, NSG Flow Logs).
- Storage-system-level logs (which bits sat on which physical drives) are not accessible.

The forensic question "did this byte sit in unallocated space?" — answerable on a physical disk — is fundamentally not answerable in the cloud, because the customer does not control the storage layer.

### Chain of custody complications

Cloud chain-of-custody questions are harder than on-premises:

- The "original" evidence may be a database record managed by the provider; the "copy" the customer exports is what the investigator works with.
- The export process itself is part of the chain — performed by the customer's account using provider APIs, with the provider acting as intermediate custodian.
- Provider audit logs of the export operation must be preserved alongside the exported data.
- Trust in the provider's tooling is implicit — the export tool produced what it claimed to produce.

International standards (ISO 27037, NIST SP 800-86) have been extended over the past decade to address cloud-specific concerns; specialised guidance like NIST SP 800-201A (cloud-computing forensic challenges) and the Cloud Security Alliance's *Mapping the Forensic Standard ISO/IEC 27037 to Cloud Computing* (updated through several editions) provide practical direction.

### Legal constraints in cloud forensics

Several legal frameworks affect cloud forensics:

- **Provider terms of service.** What the customer can and cannot do with their account; what triggers provider intervention; what the provider will do in response to incidents.
- **Cross-border data transfer regulations.** GDPR (Europe), CLOUD Act (US), and various national regimes. Nepal's Privacy Act 2075 has provisions, though enforcement infrastructure is still developing.
- **Mutual Legal Assistance Treaties (MLATs).** The mechanism by which authorities in one country obtain evidence from another. Slow — often months. For investigations spanning Nepal and AWS Mumbai, no MLAT is strictly needed since the customer (Nepali) can produce the data via their own AWS account; for evidence held by a US provider in the US, MLAT or equivalent may be required.
- **Data-protection regimes.** Customer notifications, data-subject rights, data-minimisation principles — all apply to forensic data handling.
- **Sectoral regulations.** In Nepal, NRB directives for banks, NTA directives for telecoms, NIB directives for the IT industry.

For an MSc-level investigator, the operational rule: consult legal counsel before international cloud-evidence acquisition; document everything; respect data-protection requirements throughout.

## 6.3 Common practices and tools for AWS, Azure, and GCP

The three hyperscale providers — AWS, Microsoft Azure, Google Cloud Platform — collectively host most of the cloud workloads relevant to Nepali organisations. Each has its own forensic-relevant services. The conceptual capabilities overlap heavily across providers; the specific names and command syntax differ.

### AWS forensic-relevant services

**AWS CloudTrail.** The audit log of all API calls made in the account — every action a user, role, or service performed. Records the actor, the action, the time, the parameters, the source IP, the user agent, the response. The primary forensic source for "what happened in this AWS account."

Standard practice: enable CloudTrail in every account, every region, with logs delivered to a centralised S3 bucket with versioning and object lock for tamper resistance.

**Amazon CloudWatch.** Metrics and logs aggregation. CloudWatch Logs collects application and system logs from EC2 instances (via the CloudWatch Agent), Lambda functions, and many other services. CloudWatch Metrics tracks operational metrics.

**VPC Flow Logs.** Network flow records — source, destination, ports, protocols, byte counts — for traffic in Virtual Private Clouds. The cloud equivalent of NetFlow.

**AWS Config.** Tracks resource configuration changes over time. Forensically valuable for "when did this security group change?" type questions.

**AWS GuardDuty.** Threat-detection service that uses machine learning, threat intelligence, and anomaly detection on CloudTrail, VPC Flow Logs, DNS logs, and other sources. Generates findings about suspected compromises.

**Amazon Detective.** Investigation tool that visualises the relationships between activity in CloudTrail, VPC Flow Logs, and GuardDuty findings.

**AWS Security Hub.** Aggregates findings from GuardDuty, Macie, Inspector, and other services.

**Amazon Macie.** Scans S3 buckets for sensitive data (PII, financial data, credentials in code).

**Snapshots.** EBS snapshots provide point-in-time copies of EBS volumes, equivalent to a forensic image of a disk. Critical for forensic preservation of a compromised EC2 instance.

**EC2 instance isolation.** When an instance is suspected of compromise, attaching a restrictive security group (essentially blackholing the instance) preserves it for investigation.

**AWS Lambda.** Lambda function code, configuration, and invocation logs are available via CloudWatch. Forensic analysis of Lambda activity uses these logs.

For a Nepali organisation using AWS, a forensic-ready setup includes CloudTrail enabled, VPC Flow Logs on critical subnets, GuardDuty active, CloudWatch Logs collecting application logs, and snapshot-based preservation procedures documented.

### Azure forensic-relevant services

**Azure Activity Log.** Account-level audit log — equivalent to CloudTrail. Records management-plane operations.

**Azure Monitor and Log Analytics.** Aggregation of logs from Azure resources, queryable through Kusto Query Language (KQL).

**Azure Sentinel (Microsoft Sentinel).** Cloud-native SIEM/SOAR. Aggregates logs from Azure and external sources; uses ML and analytics rules for detection.

**Microsoft Defender for Cloud (formerly Azure Security Center).** Security posture management and workload protection. Generates security findings.

**Microsoft Defender XDR.** Extended detection and response across endpoints, email, identities, and cloud apps.

**NSG Flow Logs.** Network flow logs for Network Security Groups — equivalent to VPC Flow Logs.

**Azure Backup snapshots.** Point-in-time backups of VMs and disks.

**Microsoft 365 Audit Log.** For SaaS forensics — records user activity in Exchange Online, SharePoint, Teams, OneDrive. Critical for incidents involving compromised user accounts.

**Microsoft Purview eDiscovery.** For legal-discovery use cases in Microsoft 365.

### GCP forensic-relevant services

**Cloud Audit Logs.** Three categories: Admin Activity (administrative actions), Data Access (data reads/writes for some services), System Event (system-generated). Equivalent to CloudTrail.

**Cloud Logging.** Aggregated logs from Google Cloud resources. Queryable.

**Cloud Monitoring.** Metrics, alerts, dashboards.

**Security Command Center.** Centralised security findings. Includes Event Threat Detection, which surfaces suspicious activity from logs.

**Chronicle (now Google Security Operations).** Google's SIEM platform, integrated with Cloud Logging and threat intelligence.

**VPC Flow Logs.** Network flow logs.

**Persistent Disk snapshots.** Volume snapshots — equivalent to EBS snapshots.

### Cross-provider tools

Several tools work across providers:

**Magnet AXIOM Cyber.** Cloud-acquisition capability for major providers.

**Cellebrite Endpoint Inspector.** Cloud acquisition along with endpoint.

**Cado Security.** Cloud-native forensic platform purpose-built for cloud, container, and serverless investigations.

**Open-source alternatives.**
- **Cloud forensic utilities (CFU).** Open-source.
- **Custom Python scripts** using boto3 (AWS), Azure SDK, or google-cloud-python (GCP) for evidence acquisition.

### A worked example — investigating a compromised EC2 instance

A web application running on an AWS EC2 instance in Mumbai region (`ap-south-1`) generates a GuardDuty alert. The alert flags suspicious outbound DNS queries.

**Containment first, then preservation.**

1. **Isolate the instance.** Attach a restrictive security group that blocks all traffic. The instance stays running for memory acquisition.
2. **Acquire memory.** SSH into the isolated instance (or via SSM Session Manager) and run a memory-acquisition tool (e.g., LiME for Linux) targeting an S3 bucket for output.
3. **Snapshot the EBS volume.** AWS Console or CLI:
   ```
   aws ec2 create-snapshot --volume-id vol-0abc... --description "Forensic snapshot 2026-05-21"
   ```
   The snapshot is a point-in-time copy of the EBS volume — the cloud equivalent of a forensic disk image.
4. **Copy the snapshot to a forensic account.** A separate AWS account dedicated to forensic work, with restrictive access.
5. **Mount the snapshot to a forensic EC2 instance** in the same account. The mount uses standard EBS attach procedures; the forensic instance runs Linux with TSK, Volatility, and other tools.
6. **Compute hash of the snapshot or its mounted image** for chain of custody.

**Analysis.**

1. **CloudTrail.** Query for activity related to the instance — who launched it, who logged in via SSM, what configuration changes occurred. Look for unusual API calls, unexpected actors, or activity from unfamiliar IPs.
2. **VPC Flow Logs.** Network connections from the instance — what external IPs were contacted, what volumes of data transferred.
3. **CloudWatch Logs.** Application logs from the instance — web requests, application errors, authentication events.
4. **GuardDuty findings.** The original alert plus any related findings.
5. **Disk and memory forensics** on the snapshot and memory dump, as in Chapters 2 and 3.

**Documentation.** Throughout, the AWS account activity is itself an evidence artefact — the CloudTrail records of the forensic acquisition. Preserve those.

For a Nepali bank or fintech investigating an incident in AWS Mumbai, this workflow is standard. The required AWS skills overlap with normal cloud-operations skills; the forensic discipline is added on top.

### Container and serverless forensics

For containerised workloads:

**Container images.** Hash and preserve the image used by the suspect container. Container registries (Amazon ECR, Azure Container Registry, Google Artifact Registry) retain image versions.

**Container runtime logs.** Logs emitted by the container to stdout/stderr are collected by the platform — Kubernetes records them; managed services (ECS, AKS, GKE) feed them to platform logging.

**Container filesystem.** A running container's filesystem can be saved via `docker commit` or similar mechanisms before termination. Most filesystems are layered; the writable layer contains changes during runtime.

**Orchestrator events.** Kubernetes events, audit logs, controller logs. Show when containers were created, where scheduled, why terminated.

For serverless functions:

**Function code.** Stored in the platform; immutable per deployed version.
**Invocation logs.** Captured in platform logging (CloudWatch Logs for Lambda).
**Function-level metrics.** Invocation counts, durations, error rates.

The ephemeral nature means real-time logging is essential. Post-incident reconstruction from logs is the only option.

### Cloud-specific forensic challenges in Nepali context

Specific considerations for Nepali organisations:

- **Region selection.** AWS Mumbai (`ap-south-1`), Singapore (`ap-southeast-1`), or other nearby regions. GCP equivalents in Singapore (`asia-southeast1`) or Mumbai (`asia-south1`). Azure equivalents — Singapore South East Asia, Central India. The choice has latency, cost, and legal implications.
- **NRB directives.** Nepal Rastra Bank has issued directives on cloud usage for banks. Specific regulatory requirements about data residency, security controls, and audit access. Banks moving services to cloud must navigate these.
- **NTA directives.** Telecom regulator's framework for ISPs and telecom-operating entities.
- **Limited local cloud expertise.** Skilled cloud-forensic practitioners in Nepal are a small group. International consultancy partners are often engaged for major incidents.
- **Cross-border legal cooperation.** Investigations involving foreign-headquartered providers may need international cooperation. The MLAT process with the US or other jurisdictions is slow; the diplomatic channels and timelines must be planned for.

### Forensic readiness in cloud — the practical checklist

For any Nepali organisation operating in cloud, the forensic-readiness baseline:

1. **Enable account-level audit logging.** CloudTrail (AWS), Activity Log (Azure), Cloud Audit Logs (GCP). All regions; all event types.
2. **Centralise logs.** A separate logging account/subscription with restrictive access; immutable storage with object lock.
3. **Enable network flow logging** on critical subnets and security groups.
4. **Deploy threat detection.** GuardDuty, Defender for Cloud, Security Command Center.
5. **Document acquisition procedures.** Pre-written playbooks for "how do we forensically acquire a compromised EC2 instance / a compromised App Service / etc.?"
6. **Pre-create a forensic account.** Separate AWS account, Azure subscription, or GCP project for forensic work with controlled access.
7. **Define retention.** How long logs are kept; aligned with regulatory requirements and incident-investigation timelines (months to years).
8. **Practise.** Tabletop exercises that walk through cloud-incident scenarios with the assigned responders.

The next chapter shifts to a sub-discipline that crosses all the previous chapters: the analysis of the malicious software that often drives the incidents under investigation.
