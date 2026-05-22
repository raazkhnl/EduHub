---
title: 'Chapter 1 — Introduction to Cloud Computing'
sidebar_label: 'Ch 01 — Introduction to Cloud Computing'
sidebar_position: 1
description: 'Chapter 1 of Security and Privacy in Cloud Computing (ENCTNS571).'
slug: /ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing/notes/ch01
tags: [msncs, ENCTNS571, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Cloud computing transformed information technology more thoroughly than any single development since the rise of the public internet. In two decades it moved from a marketing phrase used loosely by hosting companies to the dominant operating model for software, data, and infrastructure across most of the world's organisations. Nepali enterprises have followed the same trajectory at a slightly slower pace — early scepticism through the late 2000s, cautious adoption through the 2010s, mainstream usage through the 2020s. This chapter establishes the foundation for the security and privacy considerations that follow: the history that shaped cloud computing, the features that define it, the requirements for cloud services, the dynamic-infrastructure concept that distinguishes cloud from traditional hosting, and the challenges that operating in cloud creates.

## 1.1 History of cloud computing

### Cloud computing

*Cloud computing is the on-demand delivery of computing services — servers, storage, databases, networking, software, analytics, intelligence — over the internet, with capacity provisioned in minutes rather than weeks, consumed and paid for by usage rather than upfront purchase, and operated by a service provider while the customer focuses on consuming the services.*

The term "cloud computing" entered widespread use around 2006-2008. The underlying ideas are older.

### Antecedents

**Time-sharing (1960s).** John McCarthy's prediction that "computation may someday be organized as a public utility." Early time-sharing systems on mainframes anticipated the cloud model — many users sharing a common resource paid for by usage.

**ARPANET and packet switching (1970s).** Established the network technology cloud requires.

**Client-server (1980s-90s).** Decentralised the computation model.

**Application Service Providers (late 1990s).** Vendors offering hosted applications over networks — anticipation of SaaS but generally without the elasticity and multi-tenancy that would later define cloud.

**Virtualization (1990s-2000s).** VMware founded in 1998; mainstream adoption through the 2000s. The technology that made cloud economically practical — sharing one physical server among many isolated workloads.

**Grid computing (2000s).** Distributed computing across many nodes for high-throughput problems. Provided some technical precedents for cloud orchestration.

### The defining decade — 2006 to 2015

**2002 — Amazon's internal services initiative.** Amazon began rebuilding internal services as APIs accessible to other Amazon teams. The discipline that emerged became the foundation of AWS.

**2006 — Amazon Web Services launches.** Simple Storage Service (S3) in March; Elastic Compute Cloud (EC2) in August. Pay-per-use access to compute and storage over the internet. AWS often dated from this year.

**2008 — Google App Engine.** First major PaaS offering.

**2009 — Microsoft Azure announced.** General availability 2010.

**2010 — OpenStack.** Open-source cloud platform launched by Rackspace and NASA; established the open-source cloud-infrastructure stack.

**2011 — Office 365 launches.** Microsoft's enterprise SaaS offering, building on earlier Microsoft Live and BPOS work.

**2013 — Google Cloud Platform.** GCP formally branded; Google Compute Engine generally available.

**2014 — AWS Lambda.** Function-as-a-service; the start of serverless.

**2015 — Kubernetes 1.0.** Container orchestration platform that would become foundational.

### The mainstream decade — 2015 to 2025

Through this period:

- Cloud spending overtook traditional IT spending in many sectors.
- Multi-cloud and hybrid-cloud became standard patterns.
- Cloud-native architectures (containers, microservices, serverless) emerged.
- The major hyperscalers established global footprints with dozens of regions.
- Specialised services proliferated — managed databases, analytics, ML, IoT.
- Regulatory frameworks adapted to cloud (NIST cloud guidance, ISO 27017/27018, ENISA cloud security, sector-specific guidance).

### Cloud in Nepal — historical adoption

For Nepali context:

- **2008-2012.** Limited adoption. Cost in foreign currency, bandwidth limits, and regulatory uncertainty restricted use.
- **2012-2017.** Early enterprise adoption. SaaS (Google Workspace, Microsoft 365) by progressive organisations. Some development workloads on AWS.
- **2017-2022.** Mainstream enterprise adoption. Banks moved development environments and analytics to cloud. Telecoms used cloud for customer-facing services. Government IT modernisation considered cloud-first.
- **2022-2026.** Standard practice. Cloud-first the typical posture for new initiatives. NRB-regulated entities operating under NRB directives that permit cloud use with specified controls.

Notable Nepali context:
- **AWS Mumbai region (ap-south-1).** Geographic proximity makes it the typical AWS choice for Nepali deployments. Latency from Kathmandu to Mumbai is 50-80 ms; reasonable for most workloads.
- **Azure India regions.** Similar geographic proximity.
- **GCP Mumbai region.** Available since 2017.
- **Local cloud offerings.** Several Nepali providers offer infrastructure services — Worldlink, CG Net, Mercantile, others — typically serving organisations preferring local presence over hyperscale capability.

### Why the cloud took over

Several forces drove the transition:

**Economic.** Pay-for-use replaces upfront capital purchases.

**Speed.** Minutes to provision rather than weeks.

**Scale.** Capacity larger than most organisations could build themselves.

**Capability.** Specialised services (ML platforms, managed databases, global content delivery) impractical to build internally.

**Reliability.** Hyperscale providers achieve uptime levels difficult on smaller scales.

**Geographic reach.** Global presence without physical investment.

**Innovation pace.** Cloud platforms release new capabilities monthly.

The same forces continue to drive expansion.

## 1.2 Features of cloud computing

The NIST definition of cloud computing (SP 800-145, 2011) identifies five essential characteristics, three service models, and four deployment models. The characteristics are the operational features that distinguish cloud from traditional hosting.

### Essential characteristics (NIST)

**On-demand self-service.** Consumers provision capacity unilaterally without human interaction with service providers. The customer logs in and creates a server, a database, a function — no support ticket, no purchase order, no procurement cycle.

**Broad network access.** Capabilities available over the network through standard mechanisms accessible from heterogeneous client platforms.

**Resource pooling.** Provider resources pooled to serve multiple consumers using multi-tenant model. Different physical and virtual resources dynamically assigned and reassigned according to demand. Customer generally has no control over or knowledge of exact location of provided resources (with possible specification at a higher abstraction such as country or region).

**Rapid elasticity.** Capabilities provisioned and released elastically, sometimes automatically, to scale rapidly with demand. To the consumer, capabilities often appear unlimited and can be appropriated in any quantity at any time.

**Measured service.** Cloud systems automatically control and optimise resource use through metering capability appropriate to the service type. Resource usage monitored, controlled, and reported, providing transparency for both provider and consumer.

These characteristics together define cloud. A traditional hosting arrangement that lacks any of them — for example, where capacity is fixed and not elastic, or where provisioning takes weeks — is not cloud in the NIST sense.

### Operational features

Beyond the NIST characteristics, several operational features are universal in cloud:

**API-driven.** Everything controllable through APIs. CLI tools, SDKs, infrastructure-as-code tools all use the same APIs.

**Web console.** Browser-based interface for human users.

**Identity-based access.** Strong IAM controls who can do what.

**Logging and monitoring.** Comprehensive telemetry available.

**Documentation.** Extensive technical documentation.

**Marketplace.** Third-party products and services purchasable through provider channels.

**Pricing transparency.** Public price lists for most services.

### Multi-tenancy

*Multi-tenancy is the architectural pattern in which a single instance of software or infrastructure serves multiple customers, with the customers logically isolated from each other so that one customer's actions and data are invisible and inaccessible to others, providing the operational efficiency that makes cloud economically viable.*

Multi-tenancy is foundational. Without it, cloud would be more expensive than dedicated infrastructure. With it, cloud becomes cheaper while still providing logical isolation. The mechanisms that enforce isolation (hypervisors, container runtimes, software access controls) are the technologies the security practitioner must understand and trust.

### Service models — quick recap

Discussed extensively in the previous Managing Secure Network Systems chapter and elsewhere. Briefly:

- **IaaS.** Infrastructure (VMs, storage, networks).
- **PaaS.** Platforms (managed databases, application runtimes).
- **SaaS.** Software (complete applications).
- **FaaS / Serverless.** Functions executed on demand.

### Deployment models — quick recap

- **Public.** Provider-owned infrastructure shared among many customers.
- **Private.** Single-organisation cloud architecture.
- **Hybrid.** Combination of public and private.
- **Community.** Shared by organisations with common concerns.
- **Multi-cloud.** Multiple public clouds combined.

These will be examined in detail in the next chapter.

## 1.3 Cloud services requirements

The requirements that customers expect from cloud services, and that providers must satisfy.

### Functional requirements

**Capacity.** Sufficient compute, storage, network bandwidth, and specialised resources for customer workloads. Hyperscale providers offer effectively unlimited capacity for most customers; specialised resources (specific GPU types, high-memory instances) sometimes have practical limits.

**Performance.** Predictable response times for storage I/O, network throughput, compute. SLAs typically specify availability rather than performance details; performance varies with instance types and configuration.

**Scalability.** Ability to grow capacity rapidly. Both vertical (larger instances) and horizontal (more instances) scaling.

**Geographic coverage.** Regions and availability zones in customer-preferred geographies. Latency from Nepal to nearest regions (Mumbai for AWS and Azure, Mumbai for GCP) is around 50-80 ms.

**Service breadth.** Range of services beyond basic compute and storage — managed databases, analytics, ML, content delivery, identity.

### Non-functional requirements

**Availability.** Uptime expressed as percentage. Hyperscale services typically commit to 99.9-99.99% availability through SLA.

**Reliability.** Consistency of behaviour over time.

**Durability.** For storage: probability data survives. AWS S3 commits to 99.999999999% (eleven nines) durability for standard storage.

**Security.** Provider security of the platform; customer-configurable security of services.

**Privacy.** Data handling consistent with applicable regulations.

**Compliance.** Provider attestations (SOC 2, ISO 27001, ISO 27017/27018, PCI-DSS, others); customer ability to inherit relevant controls.

**Interoperability.** Standards-based interfaces allowing portability.

**Performance.** Sufficient for workload needs.

**Cost.** Affordable; pricing model aligned with usage.

**Sustainability.** Increasingly important — renewable energy, efficient operations.

### Customer-specific requirements

Beyond the universal requirements, customer-specific needs include:

**Data residency.** Some data must remain in specific geographies. Nepali bank data subject to NRB requirements about location and accessibility.

**Auditability.** Customer's auditors need access to logs and configurations.

**Encryption.** Customer-managed keys, hardware-security-module integration.

**Connectivity.** Direct connectivity (Direct Connect, ExpressRoute, Cloud Interconnect) for high-bandwidth dedicated paths.

**Hybrid integration.** Connection to on-premises systems.

**Support.** Technical support tiers; response times.

### Service Level Agreements

*A Service Level Agreement is the formal contractual commitment between a cloud service provider and a customer that specifies the measurable performance and availability standards the provider commits to, along with remediation (typically service credits) if standards are not met, providing the foundation for the operational and commercial relationship.*

Typical SLA elements:
- **Availability commitment.** Often 99.9-99.99% for core services.
- **Performance commitments.** Less common; often "commercially reasonable effort."
- **Definition of downtime.** What counts; what does not.
- **Measurement methodology.** How availability calculated.
- **Service credits.** Typically a percentage refund proportional to missed availability.
- **Exclusions.** Scheduled maintenance, customer-caused issues, force majeure.
- **Claim process.** How customer claims credits.

SLA credits rarely compensate for actual business impact of downtime; they provide a measured commitment, not full liability.

For Nepali banks under NRB directives, the SLA review is part of due diligence before adopting cloud services. NRB-prescribed elements include audit rights, data handling commitments, and exit provisions.

## 1.4 Cloud and dynamic infrastructure

### Dynamic infrastructure

*Dynamic infrastructure is the operational model in which computing resources are provisioned, configured, and deprovisioned automatically in response to demand or other triggers, with the infrastructure state being mutable, programmable, and continuously adapted rather than static and manually managed.*

Cloud computing enables dynamic infrastructure; traditional data-centre infrastructure inhibits it.

### Characteristics of dynamic infrastructure

**Ephemeral resources.** Workloads come and go. Containers may live for seconds; serverless functions for milliseconds. Long-lived VMs are increasingly the exception rather than the rule.

**Auto-scaling.** Capacity automatically adjusts to load. Web servers scaled out during peak; scaled down at night. Database read replicas added in response to read load.

**Self-healing.** Failed instances replaced automatically. Health-check failure triggers replacement; service restored without human intervention.

**Infrastructure as code.** Configurations expressed in declarative code (Terraform, CloudFormation, Pulumi); provisioning by applying the code; changes by editing the code and reapplying.

**Immutability.** Resources not modified in place. To change a server's configuration, replace it with a new server built from updated images. Reduces configuration drift; supports auditable rollbacks.

**Multi-region distribution.** Workloads spread across regions for resilience and performance.

### Implications for security

Dynamic infrastructure changes the security model:

**Asset inventory is fluid.** Resources counted at one moment may not exist seconds later. Traditional asset-management approaches strain.

**Configuration baselines are continuously enforced.** Drift detection becomes critical.

**Identity is more important than network location.** Workloads moving across hosts make IP-based controls less reliable.

**Logging and audit trails must be persistent.** Resources may be gone before incidents are investigated.

**Access controls cover both humans and automation.** Service accounts and IAM roles outnumber human users.

**Continuous compliance.** Periodic compliance checks insufficient; continuous evaluation needed.

### Infrastructure as code

The dominant operational model for cloud:

```hcl
# Terraform example for an AWS S3 bucket with secure defaults
resource "aws_s3_bucket" "bank_data" {
  bucket = "nb-bank-data-prod"
}

resource "aws_s3_bucket_versioning" "bank_data" {
  bucket = aws_s3_bucket.bank_data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "bank_data" {
  bucket = aws_s3_bucket.bank_data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.bank_data.arn
    }
  }
}

resource "aws_s3_bucket_public_access_block" "bank_data" {
  bucket                  = aws_s3_bucket.bank_data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

Every aspect of the configuration is in code, version-controlled, peer-reviewed before deployment. The security defaults — encryption, versioning, public access blocking — are part of the definition rather than later additions.

### Operational practices for dynamic infrastructure

**GitOps.** Git repository as the source of truth; automation applies what is in the repository.

**CI/CD pipelines.** Code commits trigger automated testing and deployment.

**Drift detection.** Tools compare actual state to declared state; alert on differences.

**Continuous compliance.** Automated checks against compliance frameworks.

**Cost monitoring.** Spend tracked continuously; anomalies investigated.

**Right-sizing.** Resource sizes adjusted to actual usage.

For Nepali enterprises new to cloud, the transition from "build a server, install software, run forever" to "infrastructure as code, immutable, ephemeral" is a substantial cultural and operational change. Mature organisations have made the transition; many are mid-journey.

## 1.5 Challenges of cloud computing

The benefits of cloud are real; so are the challenges. The challenges are the focus of much of this subject.

### Security challenges

**Shared responsibility ambiguity.** Customers and providers each have responsibilities; the boundary varies by service. Misunderstanding leads to gaps.

**Misconfiguration.** The dominant cause of cloud security incidents. Open S3 buckets, overly-permissive IAM, exposed databases, default credentials.

**Visibility.** Limited visibility into provider operations. Customers must trust attestations.

**Multi-tenancy risk.** Isolation depends on provider mechanisms; rare but documented escapes.

**Insider threats at provider.** Provider personnel with privileged access; provider operational security a concern.

**Encrypted-traffic blind spots.** Cloud-native traffic is mostly encrypted; inspection without provider cooperation is difficult.

### Privacy challenges

**Data location.** Where data physically resides; legal jurisdiction.

**Cross-border data flows.** Movement of data across national boundaries subject to varying laws.

**Provider personnel access.** Provider operations personnel may have technical capability to access customer data; controls vary.

**Subcontractor obligations.** Provider may use subcontractors; flow-down of privacy obligations imperfect.

**Data deletion verification.** Verifying actual deletion of data when service terminated.

**Consent and notice.** Personal-data handling under varying privacy laws.

### Compliance challenges

**Sector-specific requirements.** Banking (NRB directives), healthcare (varies), payment (PCI-DSS), public sector (various).

**Provider certifications versus customer obligations.** Provider's SOC 2 does not automatically satisfy customer's compliance needs.

**Audit rights.** Provider grants limited audit rights; customers' auditors may have constrained access.

**Evidence gathering.** Compliance evidence from cloud requires understanding what to gather and where.

### Operational challenges

**Skills gap.** Cloud-skilled engineers scarce; competition for talent intense.

**Cost management.** Cloud bills can grow unexpectedly. FinOps discipline necessary.

**Vendor lock-in.** Migration between providers expensive.

**Service quality variability.** Different services have different maturity and reliability.

**Outages.** Provider outages affect many customers. AWS, Azure, GCP all have had major outages with broad impact.

**Network dependency.** Cloud requires internet connectivity; bandwidth and reliability of customer's link become critical.

### Strategic challenges

**Provider strategy alignment.** Customer dependent on provider's product roadmap and pricing strategy.

**Concentration risk.** Industry's heavy dependence on a few hyperscalers creates systemic concerns.

**Innovation pace.** Keeping up with new services and capabilities is demanding.

**Exit strategy.** Plans for moving away from a provider if needed.

**Data sovereignty.** National-policy considerations about citizen data location.

### Challenges specific to Nepali context

**Bandwidth and latency.** International bandwidth from Nepal is sufficient but not abundant. Latency to nearest cloud regions (Mumbai) is acceptable for most workloads.

**Foreign currency.** Cloud spend is in USD; foreign-currency outflow regulations apply. Nepal Rastra Bank approvals for foreign exchange transactions.

**Regulatory comfort.** NRB has gradually accommodated cloud use by banks; requirements specific but workable.

**Skilled workforce.** Limited locally-available cloud expertise. Some retention difficulties as skilled professionals attracted abroad.

**Local-content preference.** Some procurement preferences for local providers.

**Power and connectivity reliability.** Less directly cloud-related but affects ability to access cloud services from local sites.

**Cultural change.** Move from traditional IT to cloud-native operations is a multi-year transition for established organisations.

### Notable cloud-related incidents

Several incidents illustrate the challenges:

**Capital One breach (2019).** Misconfigured AWS WAF allowed exfiltration of 100+ million records. Highlighted misconfiguration risk and AWS-specific attack patterns.

**Microsoft Exchange Server vulnerabilities (2021).** While on-premises Exchange affected, the incident showed cloud-native equivalents safer when properly configured.

**Various Azure AD / Microsoft 365 incidents (2023-25).** Identity-system compromises with broad impact across customers.

**Foodmandu (2020, Nepal).** Cloud-hosted services with insufficient access controls; ~50,000 customer records exposed.

**Vianet (2020, Nepal).** Customer-data exposure; ~170,000 records.

Each incident is a lesson in some combination of misconfiguration, weak access controls, insufficient monitoring, or inadequate response. The technologies are sound; operational discipline is what makes them safe.

### The trade-off perspective

Cloud computing is neither magically secure nor inherently dangerous. It is a different operating model with different risks, different controls, and different operational disciplines. Adopted thoughtfully, it can be more secure than the same organisations' on-premises operations — the providers invest in security at scale exceeding what most organisations can match. Adopted carelessly, it accelerates breach exposure.

The subject this chapter introduces is the systematic study of how to adopt cloud thoughtfully — understanding the architecture, applying the management disciplines, protecting the data, monitoring the operations, and securing the systems. The next chapter takes the foundation laid here into the detailed architectural model — service models, deployment models, design principles, and the security/trust/privacy considerations that pervade everything.
