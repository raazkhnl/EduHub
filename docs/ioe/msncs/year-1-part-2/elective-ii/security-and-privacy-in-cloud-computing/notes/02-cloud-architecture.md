---
title: 'Chapter 2 — Cloud Computing Architecture'
sidebar_label: 'Ch 02 — Cloud Computing Architecture'
sidebar_position: 2
description: 'Chapter 2 of Security and Privacy in Cloud Computing (ENCTNS571).'
slug: /ioe/msncs/year-1-part-2/elective-ii/security-and-privacy-in-cloud-computing/notes/ch02
tags: [msncs, ENCTNS571, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The previous chapter established cloud computing in broad terms — what it is, where it came from, what features define it, what challenges it brings. This chapter takes the architectural view: the reference models that organise cloud capabilities, the service models (IaaS, PaaS, SaaS) that define what customers consume, the deployment models (public, private, community, hybrid) that define how the cloud is operated and shared, the service-oriented-architecture principles that inform cloud design, and the cross-cutting concerns of security, trust, and privacy that the rest of the subject will examine in depth.

## 2.1 Cloud reference model — Platform as a Service

### Cloud reference model

*A cloud reference model is a conceptual framework that organises the components, services, actors, and relationships of cloud computing into a structured representation, providing a common vocabulary and architectural foundation for designing, deploying, evaluating, and securing cloud-based systems.*

Several reference models exist; the most widely-referenced is the NIST Cloud Computing Reference Architecture (NIST SP 500-292, 2011).

### NIST cloud computing reference architecture

The NIST model identifies five major actors:

**Cloud consumer.** Person or organisation using a relationship with a cloud provider to use cloud services.

**Cloud provider.** Entity responsible for making a cloud service available to interested parties.

**Cloud auditor.** Party that conducts independent assessment of cloud services, operations, performance, and security.

**Cloud broker.** Entity that manages cloud use, performance, and delivery to consumers, often negotiating between consumers and providers.

**Cloud carrier.** Intermediary that provides connectivity and transport of cloud services from cloud providers to consumers.

For Nepali context:
- **Consumer.** Banks, telecoms, government, enterprises, individuals.
- **Provider.** AWS, Azure, GCP, plus local providers (Worldlink Cloud, others).
- **Auditor.** Statutory auditors, NRB-mandated IS auditors, sectoral audit firms.
- **Broker.** Less common in Nepal; some IT consulting firms play this role.
- **Carrier.** NTC, Ncell, ISPs providing internet connectivity; NPIX for peering.

### Service models in the reference architecture

The NIST model organises services in a layered fashion:

```
+----------------------+
|        SaaS          |  Application
+----------------------+
|        PaaS          |  Platform / Runtime
+----------------------+
|        IaaS          |  Infrastructure
+----------------------+
|  Physical Hardware   |
+----------------------+
```

Each layer builds on the one below. SaaS customers consume applications without managing platforms or infrastructure. PaaS customers manage applications and data; the provider handles platform and below. IaaS customers manage OS, applications, and data; the provider handles infrastructure.

### Platform as a Service (PaaS)

*Platform as a Service is the cloud service model in which the customer deploys consumer-created or acquired applications onto the cloud infrastructure, using programming languages, libraries, services, and tools supported by the provider, without managing the underlying cloud infrastructure including network, servers, operating systems, or storage.*

The customer's responsibility:
- Application code.
- Application configuration.
- Data.
- Some application-level security.

The provider's responsibility:
- Platform runtime (web servers, language runtimes, databases).
- Operating system.
- Virtualisation.
- Servers and storage.
- Networking.
- Physical infrastructure.

### PaaS categories

PaaS is broad. Several sub-categories:

**Application platforms.** Generic platforms for hosting applications. Examples:
- AWS Elastic Beanstalk.
- Azure App Service.
- Google App Engine.
- Heroku.
- Red Hat OpenShift (private and public deployments).

**Container platforms.** Managed container orchestration. Examples:
- Amazon ECS / EKS.
- Azure Kubernetes Service (AKS).
- Google Kubernetes Engine (GKE).

**Database-as-a-Service (DBaaS).** Managed databases. Examples:
- Amazon RDS (multiple engines), Aurora, DynamoDB, Redshift.
- Azure SQL Database, Cosmos DB, PostgreSQL/MySQL Database.
- Google Cloud SQL, Cloud Spanner, BigQuery, Firestore.

**Integration platforms (iPaaS).** Connecting cloud and on-premises systems. Examples:
- AWS Step Functions, AppFlow.
- Azure Logic Apps.
- MuleSoft Anypoint Platform.
- Zapier (lower-end).

**Analytics platforms.** Managed analytics. BigQuery, Redshift, Snowflake, Databricks.

**API management.** API gateway services. AWS API Gateway, Azure API Management, Google Apigee.

**Mobile backend services (MBaaS).** Backend for mobile apps. AWS Amplify, Azure Mobile Apps, Firebase.

**ML platforms.** Managed ML training and inference. AWS SageMaker, Azure ML, GCP Vertex AI.

**Workflow platforms.** Apache Airflow managed services; Google Cloud Composer; AWS Step Functions.

### PaaS advantages

- **Faster development.** Application focus; platform managed.
- **Operational simplicity.** No OS patching, no platform-runtime maintenance.
- **Automatic scaling.** Many PaaS offerings scale based on demand.
- **Built-in monitoring.** Application performance metrics typically included.
- **Service integration.** PaaS services integrate with other cloud services naturally.

### PaaS challenges and considerations

- **Lock-in.** PaaS often uses provider-specific runtimes and APIs.
- **Customisation limits.** Less control than IaaS.
- **Version control.** Provider controls platform versions; major version changes can disrupt customers.
- **Performance opacity.** Less visibility into platform performance.
- **Compliance.** Provider's platform must support customer's compliance needs.

For Nepali context, PaaS adoption has accelerated through the 2020s. Bank application teams developing customer-facing services often use PaaS for new development; legacy systems remain on traditional infrastructure or IaaS.

## 2.2 Software as a Service, Infrastructure as a Service

### Software as a Service (SaaS)

*Software as a Service is the cloud service model in which the customer uses the provider's applications running on a cloud infrastructure, with the applications accessible from various client devices through either a thin client interface (such as a web browser) or a program interface, without managing or controlling the underlying cloud infrastructure, individual application capabilities, or even the application itself beyond limited user-specific application configuration settings.*

The customer's responsibility:
- Application configuration (settings within the application).
- Data (subject to the application's data model).
- User management.
- Application-level access controls.

The provider's responsibility:
- The application itself.
- Application updates and patches.
- Platform.
- Operating system.
- Infrastructure.

### SaaS examples

**Productivity and collaboration.**
- Microsoft 365 (formerly Office 365).
- Google Workspace.
- Slack.
- Zoom.
- Microsoft Teams.

**Enterprise applications.**
- Salesforce (CRM).
- Workday (HR, finance).
- ServiceNow (IT service management).
- SAP S/4HANA Cloud (ERP).
- Oracle Cloud applications.

**Customer support.**
- Zendesk.
- Freshdesk.
- Intercom.

**Marketing.**
- HubSpot.
- Mailchimp.
- Marketo.

**Development tools.**
- GitHub.
- GitLab.
- Bitbucket.
- Atlassian (Jira, Confluence).

**Storage and file sharing.**
- Dropbox.
- Box.
- Google Drive.
- OneDrive.

For Nepali context:
- Microsoft 365 and Google Workspace dominate productivity SaaS.
- Salesforce, HubSpot, Zoho used by enterprises.
- GitHub and GitLab widely used by development teams.
- Sector-specific SaaS (Tally for accounting, sector-specific HR systems) common.

### SaaS adoption considerations

**Data location.** Where does the SaaS provider store data? Compliance with applicable regulations.

**Identity integration.** SSO with corporate identity systems (SAML, OIDC).

**Backup and export.** Ability to extract data; vendor-independence.

**Customisation.** Extent to which the application can be customised.

**API access.** For integration with other systems.

**Pricing model.** Per-user, per-feature, per-usage.

**Vendor stability.** SaaS provider's financial and operational health.

**Compliance certifications.** SOC 2, ISO 27001, sector-specific.

### Infrastructure as a Service (IaaS)

*Infrastructure as a Service is the cloud service model in which the customer provisions processing, storage, networks, and other fundamental computing resources, with the consumer able to deploy and run arbitrary software including operating systems and applications, while not managing or controlling the underlying cloud infrastructure but having control over operating systems, storage, and deployed applications.*

The customer's responsibility:
- Operating system installation, configuration, patching.
- Middleware.
- Applications.
- Data.
- Application-level security.
- Network configuration (security groups, firewalls).

The provider's responsibility:
- Hypervisor.
- Physical servers, storage, network.
- Data centre.
- Power, cooling.
- Physical security.

### IaaS components

The fundamental building blocks:

**Compute.** Virtual machines, bare-metal servers, GPU instances. Examples: AWS EC2, Azure Virtual Machines, GCP Compute Engine.

**Storage.**
- Block storage (mountable as disks): AWS EBS, Azure Managed Disks, GCP Persistent Disk.
- Object storage: AWS S3, Azure Blob Storage, GCP Cloud Storage.
- File storage: AWS EFS, Azure Files, GCP Filestore.
- Archive storage: AWS Glacier, Azure Archive Storage, GCP Coldline / Archive.

**Networking.**
- Virtual networks: AWS VPC, Azure VNet, GCP VPC.
- Subnets, route tables, internet gateways.
- Load balancers: AWS ELB, Azure Load Balancer, GCP Cloud Load Balancing.
- DNS: AWS Route 53, Azure DNS, GCP Cloud DNS.
- VPN and dedicated connectivity.

**Identity.**
- IAM systems controlling who can do what.

These services together provide the building blocks for any computing environment.

### IaaS advantages

- **Control.** Full control over OS, software, configuration.
- **Flexibility.** Any software runnable.
- **Familiar paradigm.** Closest to traditional server-based operations.
- **Specialised hardware access.** GPU instances, high-memory instances, FPGA instances for specific workloads.

### IaaS challenges

- **Operational burden.** Customer manages OS, patches, security.
- **Cost.** Often higher than equivalent PaaS for standard workloads.
- **Underutilisation.** Running VMs 24/7 wastes resources.
- **Skill requirements.** Operations engineering needed.

### Service model comparison

| Aspect | IaaS | PaaS | SaaS |
|---|---|---|---|
| Customer manages | OS up | Apps and data | Configuration |
| Provider manages | Infrastructure | OS, platform | Everything |
| Flexibility | Highest | Medium | Lowest |
| Operational burden | Highest | Medium | Lowest |
| Speed to deploy | Slow | Medium | Fast |
| Customisation | Highest | Medium | Lowest |
| Lock-in | Lower (commodity) | Medium-high | Highest |
| Skill requirements | Highest | Medium | Lowest |

### Function as a Service (Serverless)

Beyond the classical three models:

*Function as a Service is a cloud service model in which the customer runs code in response to events without provisioning or managing servers, with the cloud provider executing the function in containers that exist only for the duration of the request, charging only for actual execution time.*

Examples: AWS Lambda, Azure Functions, GCP Cloud Functions, Cloudflare Workers.

Use cases:
- Event-driven processing (S3 uploads, database changes, queue messages).
- API backends for low-traffic endpoints.
- Scheduled tasks.
- Glue logic between services.

Considerations:
- Cold-start latency.
- Stateless design required.
- Time and memory limits per invocation.
- Pricing structure favourable for sporadic load; less so for sustained high load.

### Container as a Service (CaaS)

Managed container services occupying space between PaaS and IaaS:
- AWS Fargate (serverless containers).
- Azure Container Instances.
- GCP Cloud Run.

The customer provides the container; the provider runs it; the customer does not manage the underlying compute.

## 2.3 Cloud deployment models

The four classical deployment models defined by NIST plus variations that have emerged.

### Public cloud

*A public cloud is the cloud deployment model in which the cloud infrastructure is provisioned for open use by the general public, owned, managed, and operated by a business, academic, or government organisation, or some combination, and existing on the premises of the cloud provider.*

The dominant model — AWS, Azure, GCP, Alibaba Cloud, IBM Cloud, Oracle Cloud, and many smaller providers operate public clouds. The customer shares infrastructure with many other customers; logical isolation enforced by provider mechanisms.

**Public cloud advantages:**
- Massive scale.
- Low entry cost.
- Wide service variety.
- Frequent capability updates.
- Geographic presence.

**Public cloud considerations:**
- Multi-tenancy concerns.
- Less direct visibility into provider operations.
- Vendor lock-in risk.
- Cost can grow unexpectedly.
- Data residency considerations.

For Nepali enterprises, public cloud is the dominant cloud adoption path. AWS Mumbai, Azure India, GCP Mumbai for hyperscale; local providers for organisations preferring local presence.

### Private cloud

*A private cloud is the cloud deployment model in which the cloud infrastructure is provisioned for exclusive use by a single organisation comprising multiple consumers (such as business units), with the infrastructure potentially owned, managed, and operated by the organisation, a third party, or a combination, and located either on-premises or off-premises.*

Two main variants:

**On-premises private cloud.** The organisation operates cloud infrastructure in its own data centres. Uses cloud-management platforms like VMware vRealize, Red Hat OpenShift, OpenStack to provide cloud-like operations.

**Hosted private cloud.** A third party operates cloud infrastructure dedicated to the customer.

**Private cloud advantages:**
- Single-tenant isolation.
- Geographic and regulatory control.
- Customised configuration possible.

**Private cloud considerations:**
- Higher cost than equivalent public cloud capacity.
- Limited elasticity (constrained by available capacity).
- Smaller service variety than public hyperscalers.
- Operational burden.

For Nepali context, private cloud is used by:
- Banks for systems retained on-premises but operating in a cloud-like manner.
- Government IT modernisation, partially.
- Large enterprises with specific isolation requirements.

The Government Integrated Data Centre (GIDC) provides shared infrastructure for many government services — somewhere between a private cloud and a community cloud.

### Community cloud

*A community cloud is the cloud deployment model in which the cloud infrastructure is provisioned for exclusive use by a specific community of consumers from organisations that have shared concerns — such as mission, security requirements, policy, and compliance considerations — owned, managed, and operated by one or more of the organisations in the community, a third party, or some combination.*

Examples globally:
- US federal government cloud initiatives.
- Various sector-specific cloud platforms (healthcare, finance).

For Nepali context:
- Limited explicit community-cloud arrangements.
- GIDC functions partly as community cloud for government agencies.
- Sector-specific cloud arrangements for banking (informal) may evolve.

### Hybrid cloud

*A hybrid cloud is the cloud deployment model in which the cloud infrastructure is a composition of two or more distinct cloud infrastructures (private, community, or public) that remain unique entities but are bound together by standardised or proprietary technology that enables data and application portability.*

Hybrid is the most common real-world pattern. Few organisations are pure-cloud or pure-on-premises; most have some workloads in each.

**Hybrid patterns:**

- **Cloud bursting.** Primary capacity on-premises; cloud used for peak demand.
- **Data tiering.** Hot data on-premises; cold data in cloud.
- **Geographic distribution.** On-premises in primary location; cloud for other regions.
- **Workload placement.** Sensitive workloads on-premises; less sensitive in cloud.
- **DR in cloud.** Production on-premises; DR site in cloud.
- **Development in cloud, production on-premises** (or vice versa).
- **Legacy on-premises, new in cloud.**

**Hybrid integration:**
- Network connectivity: dedicated lines (Direct Connect, ExpressRoute, Cloud Interconnect), or VPN.
- Identity federation.
- Data synchronisation.
- Consistent operations tooling.

For Nepali enterprises:
- **Banks.** Core banking and regulated workloads on-premises; development, analytics, customer-facing apps in cloud.
- **Telecoms.** Mixed — core network on-premises; some customer services in cloud.
- **Enterprises.** Office productivity (M365, Google Workspace) in cloud; back-office systems mixed.

### Multi-cloud

*Multi-cloud refers to the use of multiple public cloud providers for different workloads or for the same workloads across providers, distinct from hybrid cloud (which is public-plus-private), undertaken for reasons including resilience, capability differentiation, regulatory diversity, cost optimisation, and avoidance of vendor lock-in.*

Common multi-cloud patterns:

- **Best-of-breed.** Different providers for different services.
- **Geographic.** Different providers in different regions.
- **Resilience.** Same workload deployable to multiple providers in case one fails.
- **Negotiating leverage.** Multiple providers maintain commercial competitive pressure.

Multi-cloud has costs:
- Skill burden across multiple platforms.
- Different operational tooling.
- Different security models.
- Inter-cloud data transfer costs.
- Increased complexity.

Many organisations practice "happens-to-be-multi-cloud" — using multiple clouds because different teams or acquisitions chose differently, rather than as deliberate strategy.

For Nepali enterprises, multi-cloud is in early stages. Most are single-hyperscaler-plus-some-SaaS-elsewhere. Deliberate multi-cloud strategies are less common.

### Deployment model summary

| Model | Tenancy | Location | Cost | Control | Use cases |
|---|---|---|---|---|---|
| Public | Multi-tenant | Provider | Low | Limited | General-purpose; new initiatives |
| Private (on-prem) | Single tenant | Customer | High | Full | Sensitive workloads; regulated data |
| Private (hosted) | Single tenant | Third party | High | Substantial | Sensitive workloads without DC operations |
| Community | Multi-tenant within community | Varies | Medium | Shared | Sector-specific |
| Hybrid | Mixed | Mixed | Mixed | Mixed | Most real organisations |
| Multi-cloud | Multi-provider | Multi-provider | Higher | Mixed | Resilience, best-of-breed |

## 2.4 Cloud design and implementation using SOA

### Service-oriented architecture

*Service-Oriented Architecture (SOA) is an architectural style in which application functionality is delivered as a set of loosely-coupled services, each with a well-defined interface, that can be consumed by other services or applications independently of implementation details, enabling flexibility, reusability, and integration across heterogeneous systems.*

SOA predates cloud — the term and concepts gained prominence in the 2000s. Cloud computing is in many ways a natural successor and extension of SOA principles.

### SOA principles

**Loose coupling.** Services interact through interfaces; implementation changes don't break consumers.

**Service contract.** Interface formally specified and stable.

**Service autonomy.** Each service controls its own logic and data.

**Service abstraction.** Internal details hidden from consumers.

**Service reusability.** Services designed to be reused by multiple consumers.

**Service composability.** Services can be combined to create higher-level capabilities.

**Service discoverability.** Services findable through registries or catalogues.

**Statelessness.** Services don't depend on accumulated state for individual interactions (in pure SOA; some services maintain state).

### SOA in cloud

Cloud platforms are essentially SOA at scale:

- **AWS, Azure, GCP** each expose hundreds of services through APIs.
- **Each service has a well-defined interface.**
- **Services compose** to deliver higher-level capabilities.
- **Services are autonomous** — each evolves independently.

Customer applications follow the same pattern:

- **Microservices.** Decomposing applications into small, independent services. Communicate via APIs (REST, gRPC, message queues).
- **API-first design.** Services designed as APIs from the start.
- **Service mesh.** Infrastructure layer managing service-to-service communication (Istio, Linkerd, Consul Connect).

### Microservices vs traditional architectures

| Aspect | Monolithic | Microservices |
|---|---|---|
| Deployment unit | Whole application | Individual services |
| Scaling | Scale the whole | Scale individual services |
| Technology stack | Uniform | Can vary per service |
| Team structure | Often shared | Service per team typical |
| Failure isolation | One bug crashes all | Failures contained |
| Operational complexity | Lower | Higher |
| Inter-service communication | In-process | Network |
| Suited for | Small to medium apps | Larger apps; cloud-native |

### Cloud-native design patterns

Several patterns characterise cloud-native applications:

**Twelve-factor app.** Heroku's articulation of principles for cloud-native applications. Codebase, dependencies, config, backing services, build/release/run, processes, port binding, concurrency, disposability, dev/prod parity, logs, admin processes.

**Microservices.** As above.

**Containers.** Packaged application + dependencies + runtime. Docker as the de facto standard; Kubernetes for orchestration.

**Service discovery.** Mechanisms for services to find each other dynamically.

**Circuit breakers.** Protect against cascading failures.

**Retries with backoff.** Resilience against transient failures.

**Event-driven.** Services communicate through events rather than direct calls.

**CQRS (Command Query Responsibility Segregation).** Separate read and write paths.

**Saga pattern.** Distributed transactions across services.

### Implementation example — a Nepali payment platform

A typical cloud-native payment platform (eSewa, Khalti, IME Pay, or similar) architecture:

- **API gateway** at the edge. Authentication, rate limiting, routing.
- **Microservices.**
  - User service (registration, profile).
  - Wallet service (balance, transactions).
  - Payment processor service (bank integration).
  - Merchant service (merchant management).
  - Notification service (SMS, email, push).
  - Reporting service (analytics, regulatory reports).
- **Backing services.**
  - Managed databases (often a mix — PostgreSQL for transactional, Redis for cache, perhaps time-series for analytics).
  - Message queue (RabbitMQ, Kafka, or cloud-managed).
  - Object storage for documents.
- **Cross-cutting.**
  - Identity service (perhaps Auth0, Okta, or in-house).
  - Logging and monitoring infrastructure.
  - CI/CD pipeline.

Each microservice is developed by a small team, deployed independently, scaled based on its own load, and updated without coordinating broad releases.

### Security implications of SOA / microservices

The architecture creates new security considerations:

**Many internal interfaces.** Each service-to-service call is an interface; each is a potential attack vector.

**Authentication between services.** Service-to-service authentication (mTLS, OAuth) becomes important.

**Authorisation per call.** Fine-grained authorisation on each call.

**Increased attack surface.** More API endpoints; each must be secured.

**Distributed logging.** Tracing a request across services requires correlation.

**Configuration security.** Many services, many configurations; consistency required.

**Container security.** Container images and runtime must be secure.

**Secrets management.** Many services, many credentials; centralised secrets handling necessary.

### Modern security patterns for microservices

**mTLS.** Mutual TLS between services. Service mesh implementations (Istio, Linkerd) provide this automatically.

**Service identity.** Each service has its own identity (SPIFFE, service-account-based).

**Zero Trust internal.** No service trusted by default; every call authenticated and authorised.

**Policy as code.** Authorisation policies defined as code (OPA — Open Policy Agent).

**Centralised secrets management.** HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager.

**Container image scanning.** Vulnerabilities scanned at build and runtime.

**Runtime protection.** Detecting anomalous behaviour in running services.

For Nepali payment-platform operators, these patterns are increasingly standard for new development. Legacy systems migrate progressively.

## 2.5 Security, trust and privacy

The cross-cutting concerns that will fill the rest of the subject. This section introduces them in summary.

### Security in cloud

The discipline of protecting cloud-hosted resources. Discussed extensively in subsequent chapters.

**Three perspectives:**

**Provider security.** What the cloud provider does to protect the underlying infrastructure. Substantial investment; subject to certifications (SOC 2, ISO 27001, FedRAMP, others).

**Customer security responsibility.** Within the customer's scope per shared responsibility — IAM, network configuration, application security, data protection.

**Combined operation.** The combined posture is what protects (or fails to protect) the customer's data and operations.

### Trust in cloud

*Trust in cloud computing is the confidence that the cloud provider, its operations, its infrastructure, and the services it delivers will behave as expected and in accordance with commitments, established through transparency, attestation, contractual obligations, technical controls, and operational track record, foundational to the customer's willingness to entrust important workloads.*

Trust is built through:

**Transparency.** Providers documenting how they operate.

**Certifications.** Independent attestation against frameworks.

**Audit rights.** Customer's ability to verify.

**Track record.** Demonstrated operational quality over time.

**Contractual commitments.** Legal obligations.

**Reference customers.** What other organisations have entrusted.

**Open architecture.** Where possible, using open-source and standards.

Trust deteriorates with:
- Outages, especially poorly-communicated ones.
- Security incidents.
- Surprising policy changes (pricing, deprecations).
- Lack of transparency about incidents.
- Public conflicts (regulatory, competitive).

For Nepali context, trust in cloud was initially low. Through the 2010s and 2020s, trust grew as track record accumulated. NRB's progressive accommodation of cloud reflects increasing trust at regulatory level. Trust in specific providers depends on their track record with Nepali customers and globally.

### Privacy in cloud

*Privacy in cloud computing concerns the protection of personal data — about identifiable individuals — that is stored, processed, or transmitted using cloud services, encompassing legal compliance under applicable privacy laws, contractual obligations under data processing agreements, technical controls protecting data, and operational practices supporting individuals' rights regarding their data.*

Privacy concerns:

**Data residency.** Where personal data physically resides.

**Cross-border transfers.** Movement of personal data across national boundaries.

**Provider access.** Provider personnel's technical ability to access data.

**Subcontractor handling.** Provider's use of subcontractors.

**Data subject rights.** Individuals' rights to access, correct, delete their data.

**Data minimisation.** Collecting only what is needed.

**Purpose limitation.** Using data only for stated purposes.

**Retention limits.** Not keeping data longer than needed.

**Breach notification.** Notifying affected parties of breaches.

### Privacy regulations applicable to cloud

**Nepal:**
- **Privacy Act 2075 (2018).** Provides citizens with rights regarding their personal information. Establishes obligations on data controllers and processors.
- **Article 28 of the Constitution.** Constitutional right to privacy.
- **Electronic Transactions Act 2063 (2008).** Includes provisions related to electronic records.
- **Sectoral.** Banking, telecom, health each have additional provisions.

**International (relevant to Nepali entities serving global users or using global services):**
- **GDPR (EU).** Comprehensive privacy framework with extraterritorial reach.
- **CCPA / CPRA (California).** US state privacy law.
- **Various other jurisdictions.**

### Cloud-specific privacy considerations

**Data processor / controller relationship.** Cloud provider typically a processor (handling data on behalf of customer who is controller).

**Data processing agreement.** Contract addressing privacy obligations.

**Subprocessor consent.** Customer's right to know and agree to subprocessors.

**Audit rights.** Customer's right to audit provider's privacy practices.

**International data transfer mechanisms.** Standard contractual clauses, adequacy decisions, binding corporate rules.

**Provider personnel restrictions.** Limits on who can access customer data.

### Privacy by design

A principle: design privacy in from the start, not as an afterthought.

Seven principles (Ann Cavoukian):
1. Proactive not reactive.
2. Privacy as the default setting.
3. Privacy embedded into design.
4. Full functionality — positive-sum, not zero-sum.
5. End-to-end security — full lifecycle protection.
6. Visibility and transparency.
7. Respect for user privacy.

Cloud-native applications can embed privacy:
- Data classification at ingest.
- Encryption by default.
- Access controls embedded in code.
- Audit trails complete.
- Retention enforced automatically.
- Subject access requests supported through APIs.

### The CIA triad in cloud

Confidentiality, Integrity, Availability — discussed in the Managing Secure Network Systems chapter Section 1.5. In cloud:

**Confidentiality.** Encryption at rest and in transit; access controls; isolation from other tenants; provider personnel controls.

**Integrity.** Cryptographic mechanisms (signed objects, MAC); access controls preventing unauthorised modification; backup and versioning.

**Availability.** Provider infrastructure resilience; customer architecture for redundancy; DDoS protection; failover capability.

### The trust triangle

Cloud security is a three-party relationship:

```
        Customer
         /    \
        /      \
       /        \
      /          \
Provider --- Regulator
```

- **Customer-provider.** Contractual and technical.
- **Customer-regulator.** Legal and compliance.
- **Provider-regulator.** Certifications and oversight.

All three relationships must function for the system to work. A weakness anywhere can compromise the overall posture.

### Looking ahead

The remaining chapters address each of these areas in depth:

- **Chapter 3.** Security management practices.
- **Chapter 4.** Data privacy specifically — life cycle, controls, deletion.
- **Chapter 5.** Monitoring, auditing, management operations.
- **Chapter 6.** Specific cloud security disciplines.

The combination is what comprises cloud security and privacy as a practical discipline.
