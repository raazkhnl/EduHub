---
title: 'Chapter 7 — Concepts on Cloud Security and Virtualization'
sidebar_label: 'Ch 07 — Concepts on Cloud Security and Virtualization'
sidebar_position: 7
description: 'Chapter 7 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch07
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The previous chapters covered network security as practiced in traditional on-premises infrastructure. This chapter takes the same security disciplines into cloud and virtualised environments where the operational model is different, the responsibility boundaries shift, and the controls take new forms. Hypervisors replace bare-metal servers, security groups replace traditional firewalls, identity-based access replaces network-based access, and data-centre design becomes a deliberate engineering challenge for both cloud providers and enterprise customers who continue running their own facilities. This chapter covers cloud-technology fundamentals and the shared-responsibility model, virtualisation security and its audit/compliance considerations, the specific approaches of AWS, Azure, and GCP, the security objects and network security groups that enforce policy in cloud, and the data-centre technologies, design, and planning that underpin both cloud and traditional infrastructure.

## 7.1 Introduction to cloud technology, cloud security, risk sharing modality

### Cloud computing

*Cloud computing is the on-demand delivery of computing services — servers, storage, databases, networking, software, analytics — over the internet, with capacity provisioned in minutes, paid for by usage rather than upfront purchase, operated and maintained by the cloud provider while the customer focuses on using the services.*

Cloud computing transformed enterprise IT through the 2010s. Major Nepali enterprises moved significant workloads to cloud through the latter half of the decade — banks for development and analytics workloads, telecoms for customer-facing applications, startups built cloud-native from the start. Nepal Rastra Bank issued directives on cloud usage for regulated entities that shaped what banks could move and what they had to retain on-premises.

### Cloud service models

**IaaS (Infrastructure as a Service).** Compute, storage, networking provided as virtualised infrastructure. The customer manages everything above the hypervisor — OS, applications, data. Examples: AWS EC2, Azure Virtual Machines, Google Compute Engine.

**PaaS (Platform as a Service).** Platform for application development and deployment. The customer manages applications and data; the provider manages the runtime, OS, infrastructure. Examples: AWS Elastic Beanstalk, Azure App Service, Google App Engine, Heroku.

**SaaS (Software as a Service).** Complete applications delivered as services. The customer uses the application; the provider manages everything else. Examples: Microsoft 365, Google Workspace, Salesforce, Workday, ServiceNow.

**FaaS (Function as a Service) / Serverless.** Code executed on demand without managing servers. Examples: AWS Lambda, Azure Functions, Google Cloud Functions.

**XaaS (X as a Service).** Generic term covering many specialised services — DBaaS (Database), STaaS (Storage), DRaaS (Disaster Recovery), CASB, SASE.

### Cloud deployment models

**Public cloud.** Provider-owned infrastructure shared among many customers. AWS, Azure, GCP, Alibaba Cloud, others.

**Private cloud.** Cloud architecture for a single organisation. Either on-premises or hosted.

**Hybrid cloud.** Combination of public and private with workload mobility.

**Community cloud.** Shared by multiple organisations with common concerns. Rare in practice.

**Multi-cloud.** Multiple public clouds used together — typically for resilience, capability, or avoiding lock-in.

### Cloud security

The discipline of protecting data, applications, and infrastructure in cloud environments. The mechanisms overlap with traditional network security but the architecture and the responsibility model differ substantively.

### Shared responsibility model

*The shared responsibility model is the principle in cloud computing that security and compliance responsibility is divided between the cloud provider and the customer, with the specific division depending on the service model — the provider handles more in SaaS, the customer handles more in IaaS — and the customer always retains responsibility for their data, identities, and configuration choices.*

The classical articulation:

**Provider responsible for security OF the cloud:**
- Physical infrastructure.
- Hypervisor.
- Network infrastructure.
- Hardware reliability.
- Storage redundancy.

**Customer responsible for security IN the cloud:**
- Data.
- Identities and access management.
- OS (in IaaS).
- Application configuration.
- Network configuration (security groups, NSGs, firewall rules).
- Encryption choices.

The division by service model:

| Aspect | On-premises | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Data | Customer | Customer | Customer | Customer |
| Identity & access | Customer | Customer | Customer | Customer (with provider support) |
| Application | Customer | Customer | Customer | Provider |
| OS | Customer | Customer | Provider | Provider |
| Network controls | Customer | Customer | Mostly provider | Provider |
| Hypervisor | Customer (if virtualised) | Provider | Provider | Provider |
| Physical | Customer | Provider | Provider | Provider |

A frequent source of incidents is misunderstanding of the model — customers assume the provider handles something the customer is actually responsible for. The 2017-2020 era saw many breaches from misconfigured S3 buckets — customers had assumed AWS would protect them when the bucket configuration was the customer's responsibility.

### Risk sharing modality

The contractual and operational manifestation of shared responsibility:

**Cloud service agreement.** The contract defining responsibilities, SLAs, liabilities.

**Data processing agreement.** Specifically covering personal data and processor obligations under privacy law.

**SLA (Service Level Agreement).** Provider commitments on availability, performance, response.

**Penalties for SLA breach.** Credits, refunds; rarely full compensation for damage caused.

**Customer obligations.** Configuration, use, monitoring.

**Audit rights.** Customer's ability to verify provider compliance.

**Subcontractor obligations.** Provider's flow-down of obligations to subcontractors.

For Nepali bank cloud usage, NRB directives prescribe:
- Specific contractual provisions.
- Data residency considerations (data on systems located in specific countries).
- Audit and oversight rights.
- Exit provisions for terminating the cloud relationship.
- Compatibility with NRB inspection requirements.

### Cloud security challenges

Specific to cloud:

**Visibility.** Customer has less direct visibility into provider infrastructure.

**Multi-tenancy.** Other customers share underlying infrastructure; isolation depends on provider mechanisms.

**Ephemeral resources.** Workloads come and go; traditional asset management approaches strain.

**Data location and sovereignty.** Where data physically resides.

**Compliance.** Provider certifications versus customer's specific compliance needs.

**Vendor lock-in.** Migration between providers can be expensive.

**Access management at scale.** Many resources, many users, many roles.

**Misconfigurations.** The dominant cause of cloud security incidents.

### Cloud Security Alliance (CSA)

*The Cloud Security Alliance is a non-profit organisation that develops and publishes cloud-security guidance, including the Cloud Controls Matrix (CCM), the Security, Trust, Assurance, and Risk (STAR) registry, and the Cloud Computing Compatibility Guidance, providing reference frameworks widely adopted by cloud customers, providers, and auditors globally.*

CSA's Cloud Controls Matrix provides a comprehensive security-controls framework specific to cloud. CSA STAR is a registry of provider attestations against the CCM. Major cloud providers publish their CSA STAR certifications, allowing customer due diligence.

## 7.2 Virtualization security, audits and compliance

### Virtualization

*Virtualization is the technology that creates virtual representations of computing resources — virtual machines representing computers, virtual networks representing networks, virtual storage representing disks — abstracting the resources from the physical hardware and allowing flexible, dynamic allocation, forming the foundation of cloud computing and modern data centres.*

Virtualization existed before cloud (VMware emerged in 1998; cloud-scale adoption followed). Cloud takes virtualization to extreme scale; on-premises data centres also rely on it.

### Hypervisor

*A hypervisor (also called a Virtual Machine Monitor) is the software layer that creates and manages virtual machines, providing each VM with the illusion of dedicated hardware while sharing the underlying physical resources, with isolation and resource management as its core functions.*

Two types:

**Type 1 (bare-metal).** Hypervisor runs directly on hardware. Examples: VMware ESXi, Microsoft Hyper-V, Xen, KVM (Linux), Citrix XenServer. Used in production environments.

**Type 2 (hosted).** Hypervisor runs as an application on an existing OS. Examples: VMware Workstation, Oracle VirtualBox, Parallels Desktop. Used for development, testing, desktop scenarios.

For production data centres and cloud platforms, Type 1 hypervisors dominate. AWS uses a customised version of Xen historically and Nitro (KVM-based) for newer instances. Azure uses Hyper-V. GCP uses KVM.

### Virtualization security concerns

**VM escape.** An attacker compromises a guest VM and uses a hypervisor vulnerability to gain access to the host or to other VMs. Catastrophic if successful; rare due to defense in depth. Notable historical examples include CVE-2017-4901 (VMware) and various Xen vulnerabilities.

**Side-channel attacks.** Speculative-execution attacks (Spectre, Meltdown, Foreshadow, MDS) demonstrated that VMs sharing physical CPU could leak information across boundaries. Mitigations applied at hypervisor, microcode, and OS levels.

**Hypervisor as single point of compromise.** If the hypervisor is compromised, all VMs running on it are compromised.

**Resource exhaustion.** One VM consuming excessive resources can affect others.

**Snapshot and image handling.** VM snapshots can contain secrets; image leaks expose configurations.

**VM sprawl.** Many VMs created with weak configuration; difficult to manage at scale.

**Lateral movement within virtualised networks.** East-west traffic inside a hypervisor not always visible to external monitoring.

### Hypervisor hardening

Specific hardening practices:

- Minimise hypervisor footprint (Type 1 hypervisors are designed minimal).
- Apply security patches promptly.
- Isolate management networks.
- Strong authentication for hypervisor management.
- Audit logs from hypervisor centralised.
- Restricted hypervisor administrative access.
- Physical security of hosts.

For Nepali bank data centres running VMware or Hyper-V, hardening guides include vendor guidance, CIS Benchmarks for ESXi, and CIS Hyper-V Benchmarks.

### VM lifecycle security

The lifecycle:

1. **Provisioning.** From templates; with security baseline.
2. **Operation.** Patches, monitoring.
3. **Snapshots.** Treated as sensitive data.
4. **Migration.** Live migration security between hosts.
5. **Backup.** Encrypted; retention managed.
6. **Decommissioning.** Secure deletion; image purging.

### Container security

A different virtualisation model:

*Containerisation is a virtualisation method that packages applications with their dependencies in lightweight, isolated environments that share the host operating system's kernel, providing faster start-up and lower overhead than VMs while still offering isolation, used widely in modern application architectures with Docker and Kubernetes as the dominant platforms.*

Containers share the kernel; the isolation is at the OS level rather than the hardware level. This makes containers lighter than VMs but with different security characteristics.

**Container security concerns:**

- **Container escape.** Process breaking out of container boundary.
- **Image security.** Untrusted or vulnerable base images.
- **Runtime security.** Monitoring container behaviour.
- **Secrets management.** API keys, credentials in container images is dangerous.
- **Network policy.** Inter-container communication.

**Container security tools:** Anchore, Twistlock (Palo Alto Prisma Cloud), Aqua Security, Sysdig, Wiz, Snyk.

**Kubernetes security:** Network policies, Pod Security Standards, RBAC, secrets management, image scanning, runtime protection. The CIS Kubernetes Benchmark provides extensive hardening guidance.

### Audits and compliance for virtualised environments

Audits cover:

**Configuration baselines.** Hypervisor configuration matches hardening standards.

**Access controls.** Who has hypervisor access; what they can do.

**Logging.** Comprehensive audit logs of hypervisor and VM activities.

**Patch management.** Hypervisor and guest OS patches current.

**Resource controls.** Isolation enforced; no resource leakage.

**Snapshot management.** Snapshots managed as sensitive resources.

**Image management.** Trusted image sources; image-build pipelines.

### Compliance frameworks for virtualisation and cloud

- **SOC 2.** AICPA's framework for service-organisation controls; widely-referenced for cloud providers.
- **ISO 27001.** Information security management.
- **ISO 27017.** Cloud-specific extension to ISO 27001.
- **ISO 27018.** Personal data in cloud.
- **PCI-DSS.** For payment-card environments in cloud.
- **HIPAA.** Healthcare; specific cloud guidance.
- **FedRAMP.** US federal government cloud authorisation.
- **CSA STAR.** Cloud-specific.
- **NRB Directives.** For Nepali banks using cloud.

Cloud providers publish their compliance certifications. AWS, Azure, GCP all hold multiple certifications across these frameworks. Customers using cloud can rely on the provider's certification for the provider's portion of the shared-responsibility model.

## 7.3 Securing cloud environments — AWS, Azure, GCP

The three major hyperscale providers offer extensive native security services. The pattern is similar across providers; the specific names and features differ.

### AWS security services

AWS provides a deep portfolio:

**IAM (Identity and Access Management).** The foundation. Users, groups, roles, policies. Permission boundaries; resource-based policies. AWS Organizations for multi-account management; Service Control Policies for organisational guardrails.

**KMS (Key Management Service).** Centralised key management. Customer-managed keys; integration with virtually all AWS services for encryption.

**GuardDuty.** Threat detection service. Monitors VPC flow logs, DNS logs, CloudTrail for malicious activity using ML.

**Security Hub.** Aggregates findings from GuardDuty, Inspector, Macie, third-party tools. Provides a single view of security posture.

**Config.** Records resource configurations and changes; evaluates compliance.

**CloudTrail.** Audit logging of API calls. Foundational for security visibility.

**WAF.** Web Application Firewall.

**Shield.** DDoS protection (Standard included; Advanced extra-cost).

**Inspector.** Vulnerability scanning of EC2 instances and container images.

**Macie.** Data security focused on S3; identifies sensitive data exposure.

**Detective.** Investigation aid; correlates security data across services.

**Secrets Manager.** Managed secret storage.

**Network Firewall.** Stateful network firewall managed service.

**ACM (Certificate Manager).** Free certificates for AWS-hosted services.

For Nepali banks using AWS (typically ap-south-1 Mumbai for proximity), the standard deployment uses IAM, KMS, CloudTrail, Config, GuardDuty, Security Hub at minimum.

### Azure security services

Azure provides parallel capability:

**Azure AD (now Microsoft Entra ID).** Identity foundation. Strong integration with on-premises Active Directory.

**Key Vault.** Key and secrets management.

**Microsoft Defender for Cloud.** (Formerly Azure Security Center). Security posture management; threat protection.

**Microsoft Sentinel.** Cloud-native SIEM.

**Azure Policy.** Policy enforcement across resources.

**Azure Monitor.** Logging, metrics, alerting.

**NSGs (Network Security Groups).** Stateful firewall rules at subnet and NIC level.

**Azure Firewall.** Managed firewall service.

**Azure DDoS Protection.** Basic included; Standard extra-cost.

**Azure Bastion.** Managed jump-host for VM access without exposing RDP/SSH.

**Microsoft Defender for Endpoint.** EDR.

For Nepali enterprises with Microsoft-centric environments, Azure is often the cloud choice. Bank back-office environments running on Microsoft 365 with Azure-hosted internal systems are a common pattern.

### GCP security services

Google Cloud Platform provides similar capability:

**Cloud IAM.** Identity and access management.

**Cloud KMS.** Key management.

**Security Command Center.** Posture management and threat detection.

**Cloud Audit Logs.** Comprehensive API logging.

**Cloud Armor.** WAF and DDoS protection.

**VPC Service Controls.** Perimeter around services to prevent data exfiltration.

**Identity-Aware Proxy.** Zero-trust access to applications.

**Cloud Asset Inventory.** Resource inventory and change tracking.

**Container Threat Detection.** Container runtime security.

**Chronicle (Google Security Operations).** Cloud-native security analytics.

GCP usage in Nepal is more limited than AWS or Azure but present, particularly for analytics workloads on BigQuery and for organisations preferring its data and AI capabilities.

### Cross-provider patterns

Across all three providers, the architectural patterns are similar:

1. **Identity foundation.** Centralised identity; MFA universally; federation with corporate identity.
2. **Network isolation.** VPCs/VNets with private subnets; controlled internet access.
3. **Encryption.** Default encryption for storage; key management.
4. **Logging.** All API activity logged; logs retained appropriately.
5. **Monitoring.** Alerts on suspicious activity.
6. **Vulnerability management.** Continuous scanning.
7. **Compliance.** Continuous compliance evaluation.

### Multi-cloud and hybrid security

For organisations using multiple clouds:

- **Identity federation.** Single identity across providers.
- **Consistent policy.** Policy-as-code applied to all clouds.
- **Unified visibility.** Cloud-native SIEM or third-party (Wiz, Orca, Lacework, Palo Alto Prisma Cloud, Microsoft Defender for Cloud).
- **Common runbooks.** Operational response works across clouds.

### Cloud security posture management (CSPM)

*Cloud Security Posture Management is a category of security tools that continuously assess cloud configurations against best practices and compliance frameworks, identifying misconfigurations, policy violations, and security risks across multi-cloud environments, helping organisations maintain secure cloud postures at scale.*

Major CSPM tools: Wiz, Orca Security, Lacework, Palo Alto Prisma Cloud, Microsoft Defender for Cloud, Check Point CloudGuard. CSPM has become a standard layer in mature cloud-security programmes through the 2020s.

### Cloud-native application protection (CNAPP)

A broader category combining CSPM, container security, workload protection, IaC scanning. Wiz, Orca, Palo Alto Prisma Cloud, others in this space.

### Worked example — securing an AWS environment for a Nepali bank

A Nepali bank deploying a new analytics workload to AWS in ap-south-1 (Mumbai):

**Identity foundation:**
- AWS Organizations with multiple accounts (production, development, security, logging).
- Service Control Policies preventing common misconfigurations.
- AWS SSO (now IAM Identity Center) federated with corporate Active Directory.
- MFA required for all human users.
- IAM roles for workloads; no long-lived access keys.

**Network design:**
- VPC with private subnets for workloads.
- Public subnets only for load balancers.
- VPC endpoints for AWS services to avoid internet routing.
- NAT gateway for required outbound internet.
- Network Firewall for additional controls.
- Direct Connect to corporate data centre (or IPsec VPN as alternative).

**Data protection:**
- All storage encrypted at rest with customer-managed KMS keys.
- TLS for all data in transit.
- S3 bucket policies restricting access.
- S3 access logging enabled.
- Macie scanning for sensitive data.

**Monitoring and detection:**
- CloudTrail in all accounts logging to a dedicated logging account.
- GuardDuty in all accounts.
- Security Hub aggregating findings.
- Config recording resource state.
- VPC flow logs.
- Alarms on critical metrics.

**Compliance:**
- AWS Config rules for NRB requirements.
- Tag enforcement for ownership and classification.
- Regular compliance reports.

**Operations:**
- Change management via infrastructure as code (Terraform or CloudFormation).
- Automated security testing in CI/CD.
- Incident response runbooks.

This pattern, with variations, is what mature cloud deployments look like.

## 7.4 Security objects and network security groups

### Cloud network security primitives

Cloud providers offer specific objects for network security policy. The terminology differs by provider.

### AWS Security Groups and NACLs

**Security Groups.**
*A Security Group in AWS is a stateful firewall that controls inbound and outbound traffic for one or more EC2 instances (or other resources), applied at the instance level, with rules that specify allowed traffic by source, destination, port, and protocol, with implicit deny for traffic not explicitly allowed.*

Properties:
- Stateful. Return traffic for established connections automatically allowed.
- Allow-only. No explicit deny rules.
- Multiple security groups can apply to a resource.
- Modified at runtime; takes effect immediately.

**NACLs (Network Access Control Lists).**
*A Network ACL in AWS is a stateless firewall that controls traffic at the subnet level, with both allow and deny rules, evaluated in order based on rule number, providing an additional layer beyond security groups for subnet-wide controls.*

Properties:
- Stateless. Both directions of traffic need explicit rules.
- Allow and deny rules.
- Applied at subnet level.
- Numbered rules with first-match semantics.

| Aspect | Security Group | NACL |
|---|---|---|
| Level | Instance | Subnet |
| State | Stateful | Stateless |
| Rules | Allow only | Allow and deny |
| Order | All rules evaluated | First match |
| Default | Deny inbound; allow outbound | Allow all (default) or deny all (custom) |
| Use | Per-instance access | Subnet-wide controls |

Standard pattern: use security groups for primary access control; use NACLs sparingly for subnet-wide constraints (blocking specific IPs, restricting subnets to specific functions).

### Azure NSGs and ASGs

**NSGs (Network Security Groups).**
*An Azure Network Security Group is a stateful firewall that filters network traffic to and from Azure resources, applied at the subnet level or network interface level, with allow and deny rules evaluated in priority order, controlling traffic based on source, destination, port, and protocol.*

Properties:
- Stateful.
- Allow and deny rules.
- Priority-based ordering.
- Applied at subnet or NIC.
- Default rules at the end ensure no traffic without explicit allow rules.

**ASGs (Application Security Groups).**
*An Application Security Group is a logical grouping of network interfaces in Azure that allows NSG rules to be defined in terms of application roles rather than IP addresses, simplifying rule management and supporting application-centric policy expression.*

ASGs make NSG rules more expressive — "web servers can talk to application servers" rather than "subnet A can talk to subnet B".

### GCP firewall rules

GCP uses VPC firewall rules:

*A GCP firewall rule is a stateful network access control attached to a VPC network, defining allowed traffic between resources based on direction, source/destination, ports, and protocols, with rules either applied at the network level via tags or service accounts rather than at individual instances.*

Properties:
- Stateful.
- Allow and deny rules.
- Priority-based.
- Network-wide scope; applied based on tags or service accounts.

### Operational comparison

| Aspect | AWS SG | AWS NACL | Azure NSG | GCP Rule |
|---|---|---|---|---|
| State | Stateful | Stateless | Stateful | Stateful |
| Allow/Deny | Allow only | Both | Both | Both |
| Order | All evaluated | First match | Priority | Priority |
| Scope | Instance | Subnet | Subnet/NIC | Network (by tag) |
| Default | Deny in | Allow all | Default rules | Deny in (custom can deny all) |

### Security group / NSG best practices

**Least privilege.** Allow only specific traffic needed.

**Source restrictions.** Limit to specific IPs, security groups, or tags rather than 0.0.0.0/0.

**Port restrictions.** Specific ports, not port ranges or all ports.

**Outbound restrictions.** Outbound traffic from sensitive resources should also be restricted.

**Naming and tagging.** Clear names indicating purpose; tags for ownership.

**Periodic review.** Many security groups accumulate over time; periodic cleanup.

**Avoid overly-permissive defaults.** Default security groups often allow more than needed.

**Reference by group, not IP.** Reference security groups rather than IP addresses where possible. The relationship is preserved as IPs change.

### Common misconfigurations

Recurring issues:

- **0.0.0.0/0 inbound on sensitive ports.** SSH (22), RDP (3389), database ports exposed to the internet.
- **Default security groups in production.** Default SG often is permissive.
- **Unused security groups.** Old groups remaining attached.
- **Conflicting rules.** Group A allows; Group B (also attached) more restrictive but ignored.
- **Public S3 buckets.** Not a security group issue but related: data exposed through bucket policy.

CSPM tools detect these patterns and flag them.

### Tag-based segmentation

Modern cloud usage employs tags for resource attribution and policy:

- **Environment tags.** Prod, dev, test.
- **Owner tags.** Team, individual.
- **Compliance tags.** PCI-scope, regulated-data.
- **Data classification.** Public, internal, confidential, restricted.

Tags combined with policy enable patterns like "PCI-scoped resources cannot communicate with non-PCI-scoped resources." Implementation through SCPs, IAM policies, NSG/SG rules, or third-party tools.

### Infrastructure as code

Cloud network controls are typically managed as code:

**Terraform.** Multi-cloud. The dominant IaC tool.

**CloudFormation.** AWS-specific.

**Azure Resource Manager / Bicep.** Azure-specific.

**Google Deployment Manager.** GCP-specific.

**Pulumi.** Code-based (Python, TypeScript) IaC.

The discipline:
- All cloud resources defined in code.
- Code in version control.
- Changes via pull requests with peer review.
- Automated testing including security checks.
- Drift detection — actual state versus code state.

The combination of IaC and CSPM is the modern operational model for cloud security.

## 7.5 Datacenter technologies, design and planning

The cloud runs on data centres. Enterprises that retain on-premises infrastructure also operate data centres. Data centre design is the engineering discipline that underpins all of this.

### Modern data centre design

**Tier classifications.**

The Uptime Institute Tier standard:

- **Tier I.** Basic capacity. 99.671% availability (under 29 hours downtime per year). Single path, no redundancy.
- **Tier II.** Redundant capacity components. 99.741% (22 hours).
- **Tier III.** Concurrently maintainable. 99.982% (1.6 hours). Multiple paths; maintenance without disruption.
- **Tier IV.** Fault tolerant. 99.995% (26 minutes). Multiple active paths; any single failure tolerated.

The TIA-942 standard provides a similar framework with additional detail.

### Power, cooling, space

**Power.**
- Multiple utility feeds.
- UPS (Uninterruptible Power Supply) for short-duration backup.
- Generators for extended backup.
- Power Distribution Units (PDUs) per rack.
- Power redundancy (N+1, 2N).

**Cooling.**
- Computer Room Air Conditioning (CRAC) units.
- Hot aisle / cold aisle layout.
- In-row cooling for high-density.
- Liquid cooling for very high-density.
- Free cooling (using outside air) where climate permits.

**Space.**
- Rack density and layout.
- Cable management.
- Physical security zones.
- Growth provision.

### Geographic considerations

**Site selection criteria:**
- Power availability and cost.
- Connectivity (multiple carrier options).
- Climate (cooling cost).
- Seismic risk.
- Flood risk.
- Political stability.
- Workforce availability.

**Nepal-specific concerns:**

- **Seismic risk.** Nepal is in a high-seismicity zone. The Gorkha earthquake of 2015 was a major event. Data centre construction must account for seismic loads.
- **Power reliability.** Historical issues with power reliability necessitating substantial generator capacity. Nepal Electricity Authority's grid reliability has improved through the 2020s but data centres maintain extensive backup.
- **Connectivity.** Limited terrestrial fibre routes. International connectivity primarily through India. Resilience challenges.
- **Climate.** Kathmandu Valley climate is generally amenable to data centre operation but humidity management important.

### GIDC — Government Integrated Data Centre

Nepal's Government Integrated Data Centre (GIDC), operated by the Government of Nepal, provides hosting for many government services. The 2024 DDoS that took 400+ government services offline highlighted both the centralisation (efficient but vulnerable) and the protection gaps. Investments in mitigation capability followed.

### Disaster recovery sites

For mission-critical operations, a single data centre is insufficient. The standard pattern:

- **Primary site.** Production operations.
- **DR site.** Geographic separation; mirror or active-active.
- **Replication.** Synchronous or asynchronous.
- **Failover testing.** Periodic.

For Nepali banks, NRB directives require DR provisions. Typical patterns:
- **Primary in Kathmandu** at the bank's data centre.
- **DR site** at varying distances — Pokhara, Hetauda, Birgunj are common locations.
- **Replication mode** depending on RTO/RPO requirements.

### Redundancy patterns

**N+1.** N components needed for capacity plus one spare. Common.

**2N.** Two complete sets. Higher cost; higher reliability.

**2N+1.** Two complete sets plus one additional spare.

Components subject to redundancy: power, cooling, network, storage.

### Data centre network design

The network connecting servers within a data centre.

**Top-of-rack (ToR) switches.** Per-rack switches; servers in the rack connect to ToR; ToR connects upward.

**End-of-row switches.** Switches at the end of a row of racks; servers in the row connect.

**Spine-leaf topology.** Modern data centre topology (Routing and Switching subject Chapter 4).

### Edge data centres

Smaller data centres at the network edge, closer to users:

- **Micro data centres.** Single-rack to small-room facilities.
- **Telecom-operator edge.** Co-located with cellular base stations.
- **Retail-edge.** Stores or branches with local compute.

For Nepali context, mobile operators (NTC, Ncell) operating MEC infrastructure are exploring edge data centres. Service-provider data centre presence in regional centres (Pokhara, Biratnagar, Nepalganj) has expanded through the 2020s.

### Hyperscale comparison

The hyperscale data centres operated by AWS, Microsoft, Google dwarf typical enterprise facilities:

- Hundreds of thousands of servers per facility.
- Custom-designed hardware.
- Custom networking.
- Custom cooling (often using outside air, water from ambient sources).
- Standardised processes for human-error reduction.

Nepali enterprises do not operate hyperscale facilities; they consume hyperscale capacity through cloud and operate smaller enterprise facilities locally for what must remain on-premises.

### Data centre security

Specific concerns:

**Physical security.** Perimeter, building, room, rack access controls. Biometric and badge access. CCTV. Anti-tailgating measures.

**Environmental security.** Fire detection and suppression. Water-leak detection. Temperature and humidity monitoring.

**Operational security.** Background-checked staff. Access controls integrated with HR. Visitor procedures.

**Network security.** All the disciplines from previous chapters apply.

### Planning a data centre — high-level steps

For an enterprise considering a new on-premises facility:

1. **Requirements.** Capacity, growth, RTO/RPO, compliance.
2. **Site selection.** Location considerations as above.
3. **Tier selection.** Reliability target informs Tier.
4. **Design.** Civil, electrical, mechanical, network design.
5. **Procurement.** Hardware, contractors.
6. **Construction.** Physical build.
7. **Commissioning.** Testing all systems.
8. **Operations.** Ongoing.
9. **Periodic review.** Capacity, compliance, technology refresh.

For Nepali enterprises retaining on-premises data centres, the trend through 2020-2026 has been mixed — some are consolidating to fewer, better-equipped facilities; some are partially migrating to cloud and retaining smaller on-premises footprint; some new entrants build cloud-first and have minimal on-premises facilities.

### Co-location

Many enterprises prefer co-location facilities over building their own:

- **Co-location.** Renting rack space in a shared data centre. The customer provides the equipment; the facility provides power, cooling, physical security, connectivity.
- **Managed hosting.** The provider provides equipment as well.

Several Nepali co-location facilities operate, particularly in Kathmandu. Major commercial banks have used a mix of own facilities and co-location.

### The future of data centre design

Trends shaping data centre design through the late 2020s:

- **Sustainability.** Power efficiency (PUE — Power Usage Effectiveness), renewable energy.
- **Liquid cooling.** Increasingly necessary for high-density AI workloads.
- **AI-specific facilities.** GPU clusters require specific design.
- **Modular design.** Pre-fabricated units for faster deployment.
- **Edge expansion.** More smaller facilities, fewer large ones.
- **Quantum and other emerging technologies.** Specialised infrastructure where deployed.

For Nepali context, the path forward involves a mix of cloud adoption, modern co-location, and a smaller footprint of own facilities — with security disciplines applied across all of them.

The syllabus ends here, but the practice continues. The MSc graduate building a career in network security in Nepal in 2026 faces a landscape of rapid change — cloud, edge, AI, quantum, increasing attacker sophistication, increasing regulatory expectation. The fundamentals covered through this subject and through the broader programme are the foundation. The fundamentals do not become obsolete; the technologies build on them. Network security is a career-long pursuit, with the work of defending Nepal's banks, telecoms, government, and emerging digital economy continuing as long as the systems they support continue to operate.
