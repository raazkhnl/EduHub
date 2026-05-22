---
title: 'Chapter 6 — Emerging Trends in Switching and Routing'
sidebar_label: 'Ch 06 — Emerging Trends in Switching and Routing'
sidebar_position: 6
description: 'Chapter 6 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch06
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The networking field has gone through several disruption cycles since its commercial emergence in the 1980s — from mainframe-era networking to Ethernet and IP, from leased lines to the public internet, from physical to virtual infrastructure. The current cycle is shaped by several forces: the move of compute to the network edge, the explosion of IoT devices, the dominance of cloud as the destination for most enterprise traffic, the integration of network functions into software, the move from coarse to fine-grained segmentation, and the early exploration of post-classical paradigms like blockchain for trust and quantum for fundamentally different communication primitives. This chapter covers the trends shaping the next decade of routing and switching.

## 6.1 Routing and switching in edge networks

### Edge network

*An edge network is the portion of the network closest to the data source and end users — at the boundary between user devices and the broader network — where compute, storage, and networking resources are positioned to provide low-latency processing, reduced bandwidth consumption, and localised functionality that complements the central data centre or cloud.*

The "edge" is not a single technology but a positioning principle: keep work close to where data is generated and consumed, rather than always sending everything to a central location.

### Why edge matters

Several forces push compute to the edge.

**Latency.** Many modern applications need low latency that round-trips to a central data centre cannot provide. Autonomous-vehicle decision-making, industrial automation, augmented reality, real-time fraud detection — all have latency budgets in tens of milliseconds. A Kathmandu-to-Mumbai cloud round-trip alone exceeds many of these budgets.

**Bandwidth.** Video and IoT streams produce enormous data volumes. Pre-processing at the edge — filtering, aggregating, summarising — dramatically reduces what must traverse the WAN.

**Privacy and sovereignty.** Some data should not leave its origin location. Health records, certain financial records, citizen data subject to residency regulations.

**Resilience.** Edge operation must continue when the central connection fails. Branch operations, factory floors, remote field deployments.

**Cost.** Compute at the edge avoids paying for bandwidth and for cloud cycles for what could be done locally.

### Categories of edge

**Device edge.** Compute directly on devices — phones, IoT sensors with onboard processing.

**On-premises edge.** Compute in the customer's location — branch servers, factory-floor compute, retail-store compute.

**Network edge.** Compute in telecom operator infrastructure close to users. MEC (Multi-access Edge Computing) is the standardised approach in mobile networks.

**Regional edge.** Compute in regional data centres, closer to users than central cloud regions.

**CDN edge.** Content-delivery-network points of presence used for cached content and increasingly for compute (Cloudflare Workers, AWS Lambda@Edge, Fastly Compute@Edge).

For Nepali context:
- **NTC and Ncell** are exploring MEC capabilities tied to 4G/5G rollout.
- **CDN edge in Nepal.** Major CDN providers (Cloudflare, Akamai, Fastly, Google) have limited PoP presence in Nepal directly; cached content typically served from India or Singapore. NPIX peering reduces some latency.
- **On-premises edge** is the dominant form for Nepali enterprises — branch compute at Nepali banks, ERP cache at remote factories, point-of-sale processing.

### Edge routing and switching implications

Edge environments impose specific networking requirements:

- **Distributed routing.** Edge sites must route between local, central, and peer destinations. Service-mesh routing, SD-WAN, or specialised edge-routing platforms handle this.
- **Local resilience.** Edge sites continue operating when the WAN link fails. Local services, local routing, local switching all must function autonomously.
- **Security at the edge.** Each edge site is a security boundary. Smaller scale than central data centres but greater multiplicity. Consistent policy enforcement across many edges is a real operational challenge.
- **Management at scale.** Hundreds or thousands of edge sites. Zero-touch provisioning, automated configuration, centralised orchestration, remote operations capability.

### Edge architecture patterns

**Fat edge.** Significant compute capability at the edge. Multiple servers, local storage, full networking. Used for branches that must operate substantially autonomously.

**Thin edge.** Minimal local compute; most processing in central or regional locations. Lower cost; reliance on connectivity.

**Continuum.** Workloads dynamically placed across device, edge, and central tiers based on requirements. The aspirational architecture; implementation is non-trivial.

The MSc graduate entering network engineering in 2026 increasingly works with edge designs. The pure data-centre-centric architectures of earlier decades are evolving rapidly.

## 6.2 Drivers of change — IoT, cloud computing, and edge computing

Three converging trends shape modern enterprise networking.

### IoT

*The Internet of Things refers to the ecosystem of physical objects — sensors, actuators, consumer devices, industrial equipment, vehicles — that are equipped with network connectivity and software, allowing them to collect, transmit, and act on data, integrating the physical world with information systems.*

IoT impact on networking:

- **Scale.** Devices in the billions globally; in any large organisation, thousands to millions.
- **Diversity.** Constrained devices (kilobytes of memory, low-power radios) alongside powerful devices (industrial gateways, vehicles).
- **Protocols.** IoT uses standards beyond traditional Ethernet/IP — LoRaWAN, Sigfox, NB-IoT, LTE-M, Zigbee, Z-Wave, Thread, Matter, BLE Mesh.
- **Bandwidth.** Most individual IoT devices use little; collectively, large.
- **Security challenges.** Many devices have weak security; large attack surface.
- **Operational technology overlap.** Industrial control systems (SCADA, PLC, building automation) are essentially IoT, with safety-critical requirements.

For Nepal:
- **Smart electricity meters** deployed by NEA in pilot regions.
- **NTC and Ncell IoT** initiatives — cellular IoT services, agricultural IoT, smart-city projects.
- **Asset tracking** in logistics and supply chain.
- **Smart-building** systems in newer commercial constructions.

### Cloud computing

Cloud's impact on networking has been profound:

- **Traffic destination shift.** Twenty years ago, most enterprise traffic stayed inside the enterprise. Today, the majority goes to cloud SaaS (Microsoft 365, Google Workspace, Salesforce) or IaaS (AWS, Azure, GCP).
- **Architecture inversion.** Old designs sent all traffic through HQ. New designs offload internet/cloud traffic locally to avoid bottlenecks (local internet breakout at branches).
- **Identity-centric networking.** With users and workloads everywhere, network identity (who is connecting, with what device) matters more than network location (which IP segment).
- **SaaS optimisation.** Selecting paths to specific SaaS destinations (Office 365's many endpoints) becomes its own design discipline.

Discussed extensively in the previous IS Audit and Forensics subjects. For routing/switching, the key effect: enterprise WAN designs increasingly cloud-aware, with cloud-direct connectivity, SaaS-aware path selection, and identity-based access.

### Edge computing

The third force, complementing IoT and cloud. Where cloud centralises compute, edge re-decentralises it for specific workloads. The combination — devices generating data, edge processing it, cloud aggregating insights — defines the modern data architecture.

### Convergence

The three drivers reinforce each other:

- IoT devices produce data → edge processes it locally → cloud aggregates and analyses.
- Cloud services power IoT device management → edge enforces policy → devices report status.
- Enterprises use cloud applications → edge optimises connectivity → IoT extends the operational picture.

Network architectures must support this entire fabric — not just headquarters-to-branch but devices-to-edge-to-cloud-back-to-devices.

## 6.3 Hyper-Converged Infrastructure and Software-Defined Infrastructure

### Hyper-Converged Infrastructure

*Hyper-Converged Infrastructure (HCI) is an IT architectural model that combines compute, storage, networking, and virtualisation in a single, integrated platform — typically delivered as commodity x86 servers running specialised software — replacing traditional discrete servers, storage arrays, and switches with a unified, software-defined alternative.*

The HCI vision: instead of buying separate servers, SAN/NAS storage, and switching fabric, buy x86 nodes that provide all three. The software (a distributed hypervisor and storage stack) presents the cluster as a single resource pool.

Key vendors:

- **Nutanix.** Pure HCI pioneer; broad platform.
- **VMware vSAN with vSphere.** Strong in traditional VMware-centric environments.
- **Dell VxRail.** Dell hardware with VMware HCI.
- **Cisco HyperFlex.** Cisco's HCI offering.
- **Microsoft Azure Stack HCI.** Microsoft's hybrid-cloud HCI.

HCI advantages:
- Simpler procurement and management.
- Scale-out architecture; add nodes for capacity and performance.
- Built-in data services (snapshots, replication, deduplication).
- Tighter integration between layers.

HCI considerations:
- Vendor lock-in.
- Scaling can require adding compute when only storage is needed (or vice versa).
- Cost compared to separate components requires careful evaluation.

### Software-Defined Infrastructure

*Software-Defined Infrastructure (SDI) is a broader architectural approach in which all infrastructure resources — compute, storage, networking — are abstracted from physical hardware and managed through software, enabling programmatic control, automation, and dynamic resource allocation across the data centre.*

SDI is the umbrella term:
- **SDN (Software-Defined Networking)** for the network layer.
- **SDS (Software-Defined Storage)** for the storage layer.
- **SDC (Software-Defined Compute)** — essentially virtualisation/containerisation.
- **HCI** is a packaging of SDC + SDS + (sometimes) SDN.

The driving principle: hardware is generic; capability is software. New features come from software updates. Configuration is API-driven. Automation is fundamental.

### SDI implications for networking

The network in SDI:
- Decoupled control and data planes (SDN principle).
- API-driven configuration.
- Programmable forwarding behaviour.
- Tighter integration with compute and storage management.
- Centralised visibility and policy.

A modern Nepali bank's data-centre architecture in 2026 typically includes:
- HCI clusters running virtualised workloads (often Nutanix or VMware-based).
- Container platforms (Kubernetes via Red Hat OpenShift, VMware Tanzu, or upstream).
- SDN within the data centre (Cisco ACI, NSX, or open-source alternatives).
- SD-WAN for inter-site connectivity.

The traditional "rack of servers, rack of SAN, rack of switches" data centre is increasingly being replaced by HCI clusters in newer deployments.

## 6.4 NFV and SDN deployment challenges and benefits

### NFV

*Network Function Virtualization is the architectural approach of running network functions — firewalls, routers, load balancers, IDS, WAN optimisers, session border controllers — as software (Virtual Network Functions, VNFs) on standard servers, replacing dedicated network appliances with general-purpose hardware running virtualised functions.*

NFV emerged from telecom operator initiatives in the early 2010s (ETSI NFV ISG, 2012). The driving goals:

- Reduce dependence on specialised network hardware.
- Accelerate service deployment (deploy a new function in software rather than waiting for hardware).
- Enable horizontal scaling.
- Reduce capital and operational costs.

**VNF examples:**
- Virtual firewalls (Fortinet VM, Palo Alto VM, Check Point VM, Cisco FTDv).
- Virtual routers (Cisco CSR1000v, Cisco Catalyst 8000v, Juniper vMX).
- Virtual load balancers (F5 BIG-IP VE, NGINX, HAProxy, Citrix ADC VPX).
- Virtual WAN optimisers.
- Virtual session border controllers for VoIP.

VNFs run on virtualisation platforms (VMware, KVM, Hyper-V) or container platforms (Kubernetes, with Container Network Functions — CNFs as the newer pattern).

### SDN

*Software-Defined Networking is an approach to networking that separates the control plane (which makes decisions about traffic forwarding) from the data plane (which forwards the traffic), centralising control-plane logic in a controller that programmatically configures distributed forwarding devices.*

The classical SDN model:

- **Application plane.** Network applications (security, traffic engineering, analytics).
- **Control plane.** Centralised SDN controller.
- **Southbound interface.** Controller-to-device protocol (OpenFlow originally; many alternatives now).
- **Data plane.** Forwarding devices (switches, routers, virtual switches).
- **Northbound interface.** Application-to-controller API.

SDN flavours:

**Pure SDN.** OpenFlow-based; centralised control of all forwarding. Realised in research and some early deployments; less common in enterprise.

**Hybrid SDN.** Combines SDN with traditional distributed routing. SDN handles policy; traditional protocols handle forwarding. Most enterprise SDN implementations.

**API-driven SDN.** Network devices expose APIs for configuration; orchestration platforms drive them. Without strict control/data-plane separation but with the centralised-control benefits.

**Application-Centric Infrastructure (Cisco ACI).** Policy-based fabric for data centre.

**VMware NSX.** Software-defined networking for VMware environments.

**Cisco SD-Access.** SDN-based campus networking.

**OpenDaylight, ONOS.** Open-source SDN controllers.

### Benefits of NFV and SDN

- **Agility.** Network functions deployed in minutes rather than weeks.
- **Programmability.** Network behaviour controlled through code, not CLI commands per device.
- **Centralised policy.** Define policy once; apply everywhere.
- **Vendor flexibility.** Standards-based platforms reduce vendor lock-in.
- **Visibility.** Centralised controllers see the whole network state.
- **Automation.** APIs enable scripting and orchestration.
- **Scale.** Horizontal scaling of network functions.

### Deployment challenges

The vision of NFV/SDN has not been realised as quickly or as comprehensively as early proponents predicted. Challenges include:

- **Performance.** VNFs on general-purpose hardware historically had lower performance than purpose-built ASICs. DPDK (Data Plane Development Kit), SR-IOV, and other techniques close the gap; hardware ASICs still outperform for highest-bandwidth scenarios.
- **Operational complexity.** "Just software" doesn't mean simple. NFV adds an additional layer of platform complexity.
- **Skill gaps.** SDN expertise is scarce; existing network engineers retrain slowly.
- **Multi-vendor interoperability.** Different SDN controllers integrate differently with different devices.
- **Maturity.** Through 2014-2018 SDN promises ran ahead of products; reality caught up in late 2010s and 2020s.
- **Brownfield migration.** Existing networks cannot be replaced overnight; SDN coexists with traditional.
- **Cost.** Initial deployment costs may exceed traditional networks; benefits realised over time through operational efficiency.

### NFV/SDN in Nepal

Adoption in Nepal has been measured:

- Major telecom operators (NTC, Ncell) use NFV for core-network functions.
- Major banks deploy VMware NSX or Cisco ACI for data-centre fabric.
- SD-WAN (covered in Chapter 5) is a form of SDN with strong adoption.
- Pure OpenFlow deployments are rare in production; common in IOE Pulchowk research environments and some labs.

For MSc students, NFV/SDN is a strong career direction — the demand for skills outstrips supply, and the technology is maturing into mainstream deployment.

## 6.5 Network segmentation and micro-segmentation trends

### Network segmentation

*Network segmentation is the partitioning of a network into smaller sub-networks (segments) that can be controlled separately, allowing traffic between segments to be inspected, restricted, or blocked according to policy, limiting the impact of incidents and supporting the principle of least privilege at the network level.*

Traditional segmentation uses VLANs (Chapter 4), separate physical networks, or routing-based separation. A typical enterprise has:

- DMZ for internet-facing services.
- Internal user network.
- Server segments.
- Management network.
- Guest network.

Segmentation limits lateral movement: an attacker who compromises a workstation cannot freely reach servers or other workstations because firewall rules between segments restrict the traffic.

### Limits of traditional segmentation

Several constraints:

- **Coarse granularity.** Segments cover many systems; controls are at the segment boundary, not per-system.
- **Complexity at scale.** Many segments create complex firewall rule sets that drift over time.
- **Lateral movement within segments.** Once an attacker is in a segment, traversal is unconstrained.
- **East-west traffic dominates.** Modern data centres see more traffic between internal systems (east-west) than to/from external (north-south). Traditional perimeter-focused controls miss this.

### Micro-segmentation

*Micro-segmentation is a security approach that creates fine-grained logical security zones, often down to the individual workload or even process level, with controls enforced through software (rather than just at network choke points) — typically deployed in virtualised and cloud environments using software-defined networking principles.*

Micro-segmentation moves the control point closer to the protected asset. Instead of "this segment can talk to that segment," the policy can be "this specific application server can talk to that specific database server on this specific port."

### Approaches to micro-segmentation

**Hypervisor-based.** Controls enforced in the virtualisation layer. VMware NSX is the dominant product. Each VM is wrapped in a distributed firewall with per-VM policy.

**Agent-based.** Endpoint agents enforce controls on host. Illumio, Guardicore (now Akamai), some EDR products. Works across VM, container, and physical workloads.

**Identity-based.** Controls based on workload identity rather than network identity. Service mesh (Istio, Linkerd) enforces this at the application layer. Cloud-native pattern.

**SDN-based.** Controls integrated into the SDN fabric. Cisco ACI's policy model is an example.

### Zero Trust

*Zero Trust is a security model that eliminates the assumption of trust based on network location, requiring continuous verification of identity, device posture, and access context for every connection, regardless of whether the traffic originates inside or outside the traditional network perimeter.*

The principle: "never trust, always verify."

Zero Trust intersects micro-segmentation but is broader. It encompasses:
- Strong identity verification for every access.
- Continuous evaluation of trust signals.
- Least-privilege access.
- Encryption everywhere.
- Comprehensive visibility and logging.

**NIST SP 800-207** (Zero Trust Architecture, 2020) and the **CISA Zero Trust Maturity Model** provide reference frameworks. The US federal government has mandated Zero Trust adoption; major commercial organisations are progressing through multi-year programmes.

For Nepali banks, Zero Trust is in early adoption. NRB directives reference modern security principles; specific Zero Trust implementations vary by bank's maturity.

### Implementation challenges

- **Application discovery.** Knowing what should be allowed requires understanding application behaviour. Discovery tools (Illumio's, Guardicore's) help.
- **Policy complexity.** Fine-grained policy generates large rule sets.
- **Performance.** Per-workload enforcement has overhead.
- **Operational disruption.** Migration from coarse to fine segmentation breaks legitimate but undocumented dependencies.
- **Cultural shift.** Operations and security teams must collaborate more deeply.

## 6.6 Blockchain on network routing and security

Blockchain — the distributed-ledger technology popularised by Bitcoin — has been explored for various networking applications. The results are mixed, with some promising directions and many cases where blockchain has been a solution looking for a problem.

### Blockchain

*Blockchain is a distributed-ledger technology in which transactions or records are organised into cryptographically-linked blocks, replicated across many nodes, with consensus mechanisms ensuring agreement on the state of the ledger — providing tamper-evidence, decentralisation, and auditability without a central trusted authority.*

The core properties relevant to networking:
- **Decentralisation.** No single trusted party.
- **Tamper-evidence.** Modifications are detectable.
- **Auditability.** Complete history preserved.
- **Smart contracts.** Programmable logic executed on the ledger.

### Routing applications

**RPKI alternative concepts.** The Resource Public Key Infrastructure used for BGP security is centralised in registry hierarchies. Some research has explored decentralised, blockchain-based alternatives.

**Path attestation.** Verifying that traffic followed a particular path through the network can be supported by blockchain-recorded attestations. Useful for compliance and forensics.

**Identifier-based routing.** Mapping identifiers to network addresses through a distributed ledger.

**Inter-domain routing.** Replacing or augmenting BGP with consensus-based routing protocols.

### Security applications

**PKI alternatives.** Some research has explored blockchain-based certificate transparency and PKI alternatives.

**IoT identity and attestation.** IoT devices' identity and security attestations recorded on blockchain. Several pilots; few production deployments.

**DDoS mitigation.** Blockchain-coordinated DDoS response across providers.

**Threat intelligence sharing.** Decentralised threat-intelligence ledgers.

### Assessment

Blockchain for networking is largely research-stage in 2026. Production deployments are limited. Critiques:

- **Performance.** Blockchain consensus is slow; networking decisions need milliseconds.
- **Energy.** Proof-of-work blockchains consume substantial energy; alternative consensus (PoS) addresses some of this.
- **Centralisation in practice.** Many blockchain deployments centralise around a few entities, defeating the decentralisation rationale.
- **Real problem fit.** Many networking problems already have effective centralised or hierarchical solutions; blockchain adds complexity without proportionate benefit.

For Nepali context:
- Blockchain pilots in non-networking domains (land records, supply chain, certificate verification).
- Research interest at IOE Pulchowk and TU.
- No significant production deployment for networking applications as of 2026.

The MSc student exploring this area should treat it as a research direction rather than an immediate operational technology — interesting, with potential, but requiring caution about hype.

## 6.7 Fundamentals of quantum routing and switching

### Quantum networking

*Quantum networking is the field that applies quantum-mechanical principles — superposition, entanglement, and measurement — to communication, enabling fundamentally new capabilities including unconditional security through quantum key distribution and connections that cannot exist in classical networks.*

The covered cryptographic side was introduced in the Cryptography subject. This section focuses on the networking implications.

### Quantum communication primitives

**Quantum Key Distribution (QKD).** Establishment of a shared key between two parties, with the property that any eavesdropping attempt is detectable. Operational systems exist; the Tokyo QKD Network and the Chinese satellite-based QKD (Micius) have demonstrated practical capability. Commercial products from ID Quantique (Switzerland), Toshiba (Japan), and others available.

**Entanglement distribution.** Sharing entangled quantum states between distant parties. Foundational for many quantum-network protocols.

**Quantum teleportation.** Transferring a quantum state from one location to another using prior entanglement plus classical communication. Demonstrated experimentally; not yet a practical communication mode.

**Distributed quantum computing.** Quantum computers connected through quantum networks. Long-term vision.

### Quantum network challenges

- **Distance limits.** Quantum signals (single photons typically) attenuate exponentially in fibre. Direct QKD over optical fibre is limited to roughly 100-200 km.
- **Repeaters.** Classical repeaters cannot relay quantum signals (no-cloning theorem). **Quantum repeaters** based on entanglement swapping and quantum error correction are in research; not yet practical.
- **Decoherence.** Quantum states are fragile; environmental interactions destroy them quickly.
- **Cost.** Quantum networking equipment is expensive.
- **Specialised infrastructure.** Dedicated quantum channels (often dark fibre) needed.

### Quantum routing

If quantum networks scale, they will need routing. Several research directions:

**Topology-aware quantum routing.** Selecting paths through quantum repeaters based on entanglement quality, distance, and current resource state.

**Resource allocation.** Quantum entanglement is a resource consumed by communication. Allocating it among competing demands.

**Multi-hop entanglement.** Establishing entanglement between distant nodes through chained repeaters.

**Hybrid classical-quantum routing.** Quantum links coexist with classical; routing decisions span both.

The IETF has a working group (QIRG — Quantum Internet Research Group) exploring the architecture of a future quantum internet. Reports and drafts published through the late 2010s and 2020s; the field is active but pre-standardisation.

### State of deployment

As of 2026:

- **Metropolitan QKD networks** operational in several countries (China, EU, Japan, US, Switzerland, others).
- **Satellite QKD** demonstrated by China; commercial services in early stage.
- **Quantum-safe classical cryptography** (post-quantum cryptography, covered in the Cryptography subject) is the more immediate response to quantum threat than building quantum networks.
- **National research programmes.** Several countries have dedicated quantum-networking research programmes.

In Nepal:
- Research interest at IOE Pulchowk and TU.
- No deployed quantum networking infrastructure.
- Discussions in academic circles about long-term implications.

For MSc students, quantum networking is a research direction with potentially transformative long-term implications. The student who builds quantum-information background now (mathematical foundations, key research papers, simulation tools like Qiskit) is positioned for emerging opportunities. Practical career relevance in the next 5-10 years is uncertain; the topic is more about long-term positioning than immediate employability.

### Convergence of trends

The trends discussed in this chapter — edge networks, IoT, cloud, HCI/SDI, NFV/SDN, micro-segmentation, blockchain, quantum — are not independent. They converge in a future enterprise network that:

- Distributes compute and storage across a continuum from device to cloud.
- Uses software-defined infrastructure for flexibility.
- Enforces fine-grained, identity-based security.
- Operates at scale through automation.
- Integrates emerging technologies (selected blockchain applications, quantum security primitives) where they add value.

For the MSc graduate beginning a career in networking in 2026, the field rewards both depth in current technology (the routing, switching, VLAN, VPN, monitoring covered through this course) and breadth in emerging directions. The fundamentals do not become obsolete — packets still need to be forwarded, networks still need to be secure, troubleshooting still demands understanding from the physical layer up. The fundamentals are the foundation on which emerging capabilities are built.

The syllabus of this subject ends here, but the practice continues. The technologies will keep changing; the discipline of designing, operating, and securing the networks that connect everything — within Nepali enterprises and across the global internet — remains a career-long pursuit.
