---
title: 'Chapter 3 — Enterprise Routing and Packet Forwarding'
sidebar_label: 'Ch 03 — Enterprise Routing and Packet Forwarding'
sidebar_position: 3
description: 'Chapter 3 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch03
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Routing is the discipline that makes the internet — and every enterprise network — function. Without routing, packets travel between directly-connected systems; with routing, they traverse any number of intermediate devices to reach destinations anywhere in the world. This chapter, the heaviest of the course, covers enterprise routing comprehensively: the architecture principles (fault tolerance, scalability, QoS, security), case studies, the distinction between interior and exterior routing, homogeneous and heterogeneous routing architectures, policy-based routing, IPv6 routing, segment routing, the SDN and quantum-networking horizons, multipath routing and load balancing, and predictive analytics for proactive routing.

## 3.1 Enterprise network architecture with fault tolerance, scalability, QoS, and security

### Enterprise network architecture

*Enterprise network architecture is the overall structural design of an organisation's communications infrastructure, encompassing campus, branch, data centre, internet edge, and cloud connectivity, designed to meet business requirements for service delivery, performance, availability, security, and cost.*

A network architecture is more than equipment — it is the integrated design of topology, protocols, services, and operations. Four properties are typically central: fault tolerance, scalability, QoS, and security.

### Fault tolerance

*Fault tolerance is the property of a network that allows it to continue operating in the presence of component failures, achieved through redundancy of components, paths, and services so that no single failure causes loss of overall function.*

Design principles for fault tolerance:

**Component redundancy.** Critical devices have redundant power supplies, supervisor engines, fan trays. Stack or chassis configurations allow individual module failure without device loss.

**Path redundancy.** Multiple physical paths between every important pair of devices. EtherChannel/LACP for redundant links treated as one logical link.

**Routing redundancy.** Dynamic routing protocols re-converge automatically when paths fail. Multiple routing peers; multiple route advertisements.

**Service redundancy.** First-hop redundancy protocols (HSRP, VRRP, GLBP) for default gateway. Anycast for DNS. Load-balanced server farms.

**Site redundancy.** Multiple data centres with replication.

**Vendor redundancy.** Avoiding single-vendor dependency where the cost-benefit supports it (limited at the protocol level; possible at the service level).

**Geographic redundancy.** For natural-disaster scenarios. Nepali banks operate primary data centres in Kathmandu with DR sites typically 100+ km away (Pokhara, Hetauda).

### Measuring fault tolerance

Common metrics:

- **Availability** — percentage of time the network operates. 99.9% (three nines) = 8.76 hours downtime per year. 99.99% (four nines) = 52.6 minutes. 99.999% (five nines) = 5.26 minutes.
- **Mean Time Between Failures (MTBF)** — average time between failures.
- **Mean Time To Repair (MTTR)** — average time to restore after a failure.
- **Recovery Time Objective (RTO)** — target restoration time (introduced in the IS Audit subject).

A network with frequent short outages and one with rare long outages can have the same availability but different operational characteristics.

### Scalability

*Scalability is the network's ability to accommodate growth — in users, devices, traffic, services, or geographic spread — without requiring fundamental redesign, achieved through hierarchical design, modular architecture, and protocols that support large-scale deployments.*

Design principles for scalability:

**Hierarchical design.** Access-distribution-core; route summarisation at each layer; problems contained within hierarchical regions.

**Modularity.** New modules added without affecting existing ones.

**Address-plan summarisation.** Subnets allocated to support route summarisation. A campus with all subnets in 10.0.0.0/16 can be summarised to one prefix at the core.

**Scalable routing protocols.** OSPF and IS-IS support large areas with proper design. BGP scales the global internet.

**Distributed control.** Avoid bottlenecks where one device handles everything.

**Capacity planning.** Anticipate growth; provision in advance of need.

### QoS — Quality of Service

*Quality of Service is the set of mechanisms that enable a network to provide different service levels to different traffic classes, ensuring that latency-sensitive, bandwidth-hungry, or business-critical traffic receives appropriate treatment relative to less-critical traffic.*

QoS becomes important when network resources are constrained — bandwidth limited, links congested. Without QoS, all traffic competes equally, and time-sensitive applications (voice, video) suffer.

**Traffic classes.** Common classifications:
- **Voice.** Very low latency (<150 ms one-way); jitter <30 ms; small bandwidth (<100 kbps per call).
- **Video conferencing.** Low latency (<150 ms); jitter <30 ms; bandwidth 0.5-10 Mbps.
- **Video streaming.** Tolerant of latency; bandwidth-intensive.
- **Mission-critical data.** Banking transactions, real-time market data — low latency, high reliability.
- **Business data.** Bulk file transfers, email, web — best effort acceptable.
- **Scavenger.** Background sync, software updates — can be deprioritised.

**QoS mechanisms.**

- **Classification and marking.** Identify traffic and mark with DSCP (Differentiated Services Code Point) values.
- **Queuing.** Different queues for different classes. Strict priority for voice; weighted fair queuing for others.
- **Shaping.** Smoothing traffic bursts.
- **Policing.** Rate-limiting traffic to defined thresholds.
- **Congestion avoidance.** WRED (Weighted Random Early Detection) to manage queues before they overflow.

**End-to-end QoS** requires every device along the path to honour markings. A breakdown anywhere defeats the system.

**DSCP values.** Common values:
- EF (Expedited Forwarding, DSCP 46) — voice.
- AF41 (DSCP 34) — interactive video.
- AF31 (DSCP 26) — call signalling.
- AF21 (DSCP 18) — business data.
- CS3 (DSCP 24) — call signalling.
- BE (Best Effort, DSCP 0) — default.

### Security in network architecture

Security is woven through every architectural decision. Specific elements:

**Segmentation.** Networks divided into zones with different trust levels. VLANs for layer 2; subnets and firewalls for layer 3.

**Defence in depth.** Multiple security layers (Chapter 1).

**Perimeter protection.** Firewalls, IPS, web application firewalls at internet edge.

**Internal segmentation.** Firewalls or ACLs between zones internally.

**Encryption.** Management traffic encrypted; sensitive data encrypted in transit.

**Authentication.** Network access controlled by 802.1X.

**Monitoring.** NetFlow, IPFIX, packet capture for forensic visibility.

**Anti-DDoS.** Edge protection; upstream-provider coordination.

**Identity-based access.** Beyond IP — who the user is, what they're doing.

**Zero trust.** Increasingly, the assumption that no traffic should be trusted by default; every connection authenticated and authorised.

The 2017 NIC Asia SWIFT incident, the 2020 Foodmandu and Vianet breaches, the 2024 GIDC DDoS, and the 2025 Ministry of Education incident all touched network-architecture issues — perimeter weaknesses, internal lateral movement, inadequate segmentation, insufficient monitoring. Each pushed Nepali enterprises toward stronger architectural security.

## 3.2 Enterprise network case studies

### Case study 1 — A Nepali commercial bank

A large commercial bank operates:
- Head office in Kathmandu (Babarmahal or similar central location).
- Primary data centre at head office or co-located facility.
- DR data centre in Pokhara or Hetauda (200+ km separation, NRB-required).
- 100+ branches across Nepal.
- Regional offices.
- ATM network of several hundred ATMs.
- Connections to payment networks (FonePay, NCHL, SCT, international networks).
- Cloud services for peripheral workloads.

Network architecture:
- **Campus LAN at head office.** Hierarchical access-distribution-core with multi-Gbps backbone.
- **Data centre.** Server farms with virtualisation (VMware, sometimes Nutanix HCI); top-of-rack and end-of-row switching; redundant pathways.
- **Branch connectivity.** MPLS WAN from a service provider (NTC, WorldLink Enterprise, or others); SD-WAN increasingly added for cost reduction.
- **Internet edge.** Multiple internet providers; redundant firewalls; web application firewalls for customer-facing services.
- **Inter-DC connectivity.** Dark fibre or high-capacity MPLS between primary and DR.
- **Security.** Tiered firewall architecture; SIEM aggregating logs; EDR on endpoints; DDoS protection.
- **Customer-facing services.** Internet banking, mobile banking, ATM/POS — separately segmented zones.

Routing:
- OSPF or EIGRP internally for campus and data centre.
- BGP with internet providers.
- MP-BGP if MPLS WAN is operated as VPN.

### Case study 2 — A Nepali telecom operator

NTC and Ncell operate at telecom scale:
- National backbone connecting major cities.
- Mobile network (2G, 3G, 4G, increasingly 5G — Ncell launched 5G first; NTC followed).
- International gateways via India.
- IP transit relationships.
- NPIX peering at the Nepal Internet Exchange.
- Data centres hosting subscriber services.

Architecture characteristics:
- Carrier-grade equipment (Cisco ASR, Nokia 7750, Juniper MX, Huawei).
- IS-IS or OSPF for IGP; BGP for EGP.
- MPLS for service delivery (VPN, traffic engineering).
- Mobile core (PGW, SGW, MME, IMS) interfacing with packet network.
- Subscriber-management systems.

### Case study 3 — Government Integrated Data Centre

GIDC hosts services for hundreds of government agencies:
- Centralised facility in Singha Durbar / Hattisar area.
- Connections to government agencies via NTC and other providers.
- Internet connectivity for public-facing portals.
- Services include immigration, transport licensing, citizenship records, tax filing, education systems.

The 2024 DDoS exposed concentration risk — hundreds of services in one facility means one attack affects all. Subsequent planning has addressed:
- Distributed hosting strategies.
- Cloud adoption for resilience.
- Upstream DDoS protection.
- Better monitoring and response capability.

### Case study 4 — An e-commerce platform

A Nepali e-commerce platform (Daraz Nepal scale or smaller):
- Cloud-hosted (AWS Mumbai, sometimes hybrid with local data centre).
- CDN for static content (Cloudflare, AWS CloudFront).
- Microservices architecture in containers.
- Payment-gateway integrations with eSewa, Khalti, FonePay, banks.
- Mobile apps and web frontend.

Network architecture is largely cloud-native:
- VPC with subnets per service tier.
- Application Load Balancers.
- Auto-scaling groups.
- Service mesh for inter-service communication.
- WAF and DDoS protection at the edge.

Routing is cloud-managed; the customer configures network policies but does not run routing protocols in the traditional sense.

### Common architectural patterns across cases

Despite the diversity:
- All have layered architectures with defined functional zones.
- All use route summarisation and hierarchical addressing.
- All have redundancy at multiple levels.
- All have security at perimeter and (increasingly) internally.
- All have monitoring and incident response.
- All face similar threat landscapes.

The differences are in scale, technology choices, and specific operational patterns.

## 3.3 Interior and exterior routing

The fundamental distinction in routing.

### Interior routing

*Interior routing, conducted by Interior Gateway Protocols (IGPs), is the routing performed within a single administrative domain (an autonomous system), optimising for fast convergence, full topology knowledge, and metric-based path selection within the trusted network.*

IGPs operate within one organisation's control. They prioritise:
- Fast convergence after topology changes (seconds, not minutes).
- Optimal path selection based on metrics.
- Loop-free operation through SPF (Shortest Path First) or distance-vector algorithms.
- Authentication and protection within the trust boundary.

### IGP protocols

**OSPF (Open Shortest Path First).**
- Link-state protocol.
- Standardised (RFC 2328 for OSPFv2, IPv4; RFC 5340 for OSPFv3, IPv6).
- Multi-vendor.
- Hierarchical with Areas (Area 0 is the backbone; non-backbone areas connect through it).
- Fast convergence.
- Scales to thousands of routers with proper design.
- The dominant enterprise IGP globally.

**IS-IS (Intermediate System to Intermediate System).**
- Link-state protocol.
- ISO standard (used originally for CLNS, adapted for IP).
- Multi-vendor.
- Hierarchical (Level 1 within area; Level 2 between areas).
- Faster than OSPF in some scenarios.
- Common in service provider networks; less common in enterprise.

**EIGRP (Enhanced Interior Gateway Routing Protocol).**
- Hybrid protocol (distance-vector with link-state features).
- Cisco-proprietary historically; opened as RFC 7868 in 2016.
- Fast convergence via DUAL algorithm.
- Uses composite metric (bandwidth, delay, others).
- Common in Cisco-only environments.

**RIP / RIPv2 / RIPng.**
- Distance-vector.
- Simple but limited (15-hop maximum).
- Old (RIP was one of the first IP routing protocols).
- Rare in modern enterprise; sometimes encountered in legacy environments or small networks.

### IGP design patterns

For a Nepali enterprise network:

- **Small campus (< 50 routers).** Single OSPF area is fine.
- **Medium campus (50-200 routers).** OSPF with multiple areas; Area 0 plus several non-backbone areas.
- **Large enterprise (200+ routers).** OSPF with careful area design; multiple backbone routers; route summarisation.
- **Cisco-only.** EIGRP is a possible choice; simpler to configure than OSPF for some scenarios.
- **Service provider scale.** IS-IS often preferred for its scalability and IPv6 handling.

### Exterior routing

*Exterior routing, conducted by Exterior Gateway Protocols (EGPs), is the routing performed between separate administrative domains (autonomous systems), prioritising policy enforcement, scalability to internet size, and stability over convergence speed, with BGP as the only EGP in current use.*

EGPs operate across organisations. They prioritise:
- Stability — internet has 1M+ routes; constant churn is unacceptable.
- Policy enforcement — each organisation chooses what to accept and announce.
- Scalability — works at internet scale.
- Loop prevention through AS path attribute.

### BGP — Border Gateway Protocol

*The Border Gateway Protocol is the routing protocol that interconnects the Internet, exchanging reachability information between autonomous systems with policy-driven route selection, currently in version 4 (BGP-4) as defined in RFC 4271 and many subsequent RFCs that extend its capabilities.*

BGP's characteristics:

**Path-vector protocol.** Each route carries the full list of AS numbers it has traversed (the AS path). This:
- Prevents loops (an AS sees itself in the path).
- Enables policy decisions based on path.
- Provides loop detection without link-state knowledge.

**TCP-based.** BGP runs over TCP (port 179). Reliable transport with built-in retransmission.

**Incremental updates.** After initial exchange, only changes are sent. Scales to large tables.

**Rich attributes.** Beyond AS path — local preference, MED, communities, origin, atomic aggregate, aggregator. Each can influence path selection.

**Policy-based.** Operators configure inbound and outbound filters to control which routes are accepted and announced.

**Two flavours.** eBGP between different AS; iBGP within one AS.

### BGP path selection

BGP's decision process (standardised order):

1. Prefer highest **Weight** (Cisco-only attribute).
2. Prefer highest **Local Preference**.
3. Prefer **locally-originated** routes.
4. Prefer shortest **AS Path**.
5. Prefer lowest **Origin** code (IGP > EGP > Incomplete).
6. Prefer lowest **MED** (Multi-Exit Discriminator).
7. Prefer **eBGP** over iBGP.
8. Prefer path through **closest IGP neighbour**.
9. Use **older route** for stability (or sometimes the opposite, configurable).
10. Use route with lowest BGP router ID.
11. Use route from peer with lowest neighbour IP address.

Real-world tuning uses local-preference (outbound policy) and AS-path prepending (inbound influence on neighbours) most commonly.

### iBGP and route reflectors

iBGP has a full-mesh requirement — every iBGP speaker must peer with every other. For 10 routers, that's 45 sessions. For 50 routers, 1225 sessions. Impractical at scale.

**Route reflectors** solve this. One (or several) routers act as route reflectors; other routers peer only with the reflectors. The reflectors re-advertise routes between clients, breaking the full-mesh requirement.

**Confederations** are an alternative — subdividing the AS into sub-ASes that are full-mesh within but use eBGP-like behaviour between.

Route reflectors are more common in practice.

### BGP in Nepal

Major BGP players in Nepal:
- **NTC** (AS17501 and others) — incumbent telecom; large infrastructure.
- **Ncell** — mobile operator; international transit.
- **WorldLink** — major private ISP.
- **Vianet** — ISP focused on residential and SME.
- **Subisu** — major Kathmandu Valley ISP.
- **Mercantile, Classictech, Techminds, others** — smaller ISPs.
- **NPIX** — Nepal Internet Exchange; peering point at NREN.

NPIX peering improves national traffic — Nepali sites are reachable from Nepali users without transiting international links. The 2022-2025 period has seen NPIX traffic grow substantially.

Nepali enterprises with public IP space (banks, large organisations) typically operate BGP for internet connectivity through one or more upstream providers.

## 3.4 Enterprise routing architecture — homogeneous and heterogeneous

### Homogeneous routing architecture

*A homogeneous routing architecture is one in which the entire enterprise network uses a single routing protocol throughout, simplifying operations, troubleshooting, and design but limiting flexibility in places where different protocols would serve better.*

Example: OSPF deployed across campus, data centre, and inter-site links. Single protocol; single routing-table view; consistent operational model.

Advantages:
- Simpler operations.
- Consistent troubleshooting.
- One protocol to know in depth.
- Predictable behaviour.

Disadvantages:
- Compromises in places where the chosen protocol is suboptimal.
- No experience with alternatives if migration becomes needed.

### Heterogeneous routing architecture

*A heterogeneous routing architecture uses multiple routing protocols within the enterprise — typically different protocols for different domains (campus, data centre, WAN, internet) — exploiting each protocol's strengths in its appropriate context but requiring careful redistribution at protocol boundaries.*

Example:
- Campus and data centre on OSPF.
- WAN on EIGRP or BGP.
- Internet edge on BGP.

Advantages:
- Each protocol used where it fits best.
- BGP at internet edge (the standard choice anyway).
- Different scale characteristics for different zones.

Disadvantages:
- Multiple protocols to operate.
- Redistribution complexity at boundaries.
- Loop risk if redistribution is misconfigured.
- More training and documentation.

### Route redistribution

When protocols meet, routes must be redistributed between them. Considerations:

**Direction.** Redistribute from protocol A into protocol B, B into A, or both.

**Metric translation.** Protocols use different metrics. Default metrics on redistribution may produce unexpected paths.

**Route filtering.** Avoid redistributing everything. Specific prefixes only.

**Loop prevention.** Use route maps, tags, or AS path manipulation to prevent routes from looping through multiple redistribution points.

**Administrative distance.** When a destination is learned via multiple protocols, the protocol with lower AD wins. AD ordering: Connected (0) < Static (1) < eBGP (20) < EIGRP internal (90) < OSPF (110) < IS-IS (115) < RIP (120) < EIGRP external (170) < iBGP (200).

A common pattern in Nepali enterprise networks: OSPF internally with BGP at internet edge. The boundary between them is a small set of edge routers running both protocols, redistributing carefully filtered routes between them.

## 3.5 Policy-based routing (PBR)

### Policy-based routing

*Policy-based routing is the routing technique in which packets are forwarded based on policy criteria — source address, destination address, application, time of day, or other attributes — rather than strictly the destination-based decisions of conventional routing, providing operational flexibility for traffic engineering, security, and service differentiation.*

Standard routing makes forwarding decisions based on destination IP only. PBR allows decisions based on other criteria.

### Use cases

**Source-based routing.** Different sources directed to different exits. For example, marketing department's internet traffic to one ISP; engineering's to another.

**Application-aware routing.** Voice traffic over one path; data over another. Streaming video over a high-bandwidth path; financial transactions over a low-latency path.

**Service chaining.** Specific traffic forced through specific services (firewall, IDS, content inspector) before continuing.

**Equal cost asymmetric routing.** Different outbound and inbound paths.

**Cost-based routing.** Cheaper traffic over cheaper links; expensive traffic over expensive links.

**Compliance.** Specific traffic kept on specific paths for regulatory reasons.

### How PBR works

PBR is implemented through route maps that match on classifying criteria and then specify next-hop or output interface.

Cisco example:
```
access-list 100 permit ip 10.1.1.0 0.0.0.255 any
route-map MARKETING permit 10
  match ip address 100
  set ip next-hop 192.0.2.1
interface GigabitEthernet0/0
  ip policy route-map MARKETING
```

This causes traffic from 10.1.1.0/24 entering Gi0/0 to be forwarded via 192.0.2.1 regardless of the normal route to the destination.

### Considerations

PBR introduces complexity. Considerations:

- **Performance.** Policy lookups can be slower than route lookups; on modern hardware, both are typically fast enough.
- **Operations.** Troubleshooting becomes harder — a traceroute may not show the expected path.
- **Maintenance.** Policy must be kept current.
- **Alternatives.** Sometimes the right answer is restructuring the network rather than using PBR.

PBR is useful but should be used purposefully, not as a default approach.

### SD-WAN and policy

Modern SD-WAN extends PBR concepts to a service-level approach. SD-WAN devices identify application traffic and select paths based on real-time performance and policy. Cisco Viptela, VMware VeloCloud, Silver Peak, Fortinet SD-WAN, and others operationalise this. The 2024-25 period has seen Nepali enterprises (particularly banks with branch networks) adopt SD-WAN for cost-effective branch connectivity with policy-aware path selection.

## 3.6 Routing with IPv6

The routing principles in IPv4 carry over to IPv6, with specific protocol versions for IPv6.

### IPv6 routing protocols

**OSPFv3.** OSPF for IPv6 (RFC 5340). Similar to OSPFv2 but adapted for IPv6 addresses. Runs over IPv6 (not IPv4). Multiple address-family support since RFC 5838.

**EIGRP for IPv6.** Cisco's IPv6 support in EIGRP.

**IS-IS.** IS-IS has supported IPv6 since RFC 5308 (single SPF run for both protocols).

**RIPng.** RIP for IPv6 (RFC 2080). Rarely used in enterprise.

**BGP-MP (Multi-Protocol BGP).** BGP-4 with multiprotocol extensions (RFC 4760) supports IPv6 address-family. Standard for IPv6 BGP.

### Dual-stack routing

In dual-stack networks, both IPv4 and IPv6 routing run simultaneously. Some considerations:

- Both protocols use the same underlying network — link failures affect both.
- Both protocols maintain separate routing tables and adjacencies.
- Convergence times can differ; failures appear asymmetric between protocols.
- Operational tooling must track both.

OSPFv2 (IPv4) and OSPFv3 (IPv6) running together is typical. The newer OSPFv3 multi-address-family extension lets one OSPFv3 instance carry both IPv4 and IPv6 — simplifying operations.

### IPv6-only operation

For new deployments, IPv6-only is increasingly considered. Major mobile networks worldwide operate IPv6-only with NAT64 for IPv4 backward compatibility. Some greenfield enterprise designs do the same.

In Nepal, IPv6-only is rare in enterprise but common in mobile network internals (NTC, Ncell LTE/5G).

### Specific IPv6 routing features

**Path MTU Discovery.** Required for IPv6 (no router fragmentation). Source hosts must perform PMTUD; ICMPv6 "Packet Too Big" messages must be allowed through firewalls.

**Neighbour Discovery Protocol (NDP).** Replaces ARP. Uses ICMPv6 messages for neighbour discovery, router discovery, prefix advertisement.

**Router Advertisement (RA).** Routers advertise prefixes; hosts use SLAAC to autoconfigure.

**RA Guard.** Switch feature to prevent rogue RAs (a common attack on IPv6 networks).

## 3.7 Principles of segment routing

### Segment routing

*Segment Routing is a network architecture, standardised by the IETF in RFC 8402 (2018) and related RFCs, in which the source of a packet specifies the path the packet will take through the network as a sequence of segments encoded in the packet header, removing the need for per-flow state in transit routers and simplifying traffic engineering and protection.*

The model: instead of every router making independent forwarding decisions based on destination, the source (or an ingress router) prescribes the path through a list of segments. Each segment identifies a node, link, or service. Routers process the segment list, "popping" segments as they're consumed.

### Why segment routing

Several drivers:

**Simplification.** MPLS traffic engineering historically required RSVP-TE — a complex signalling protocol maintaining per-flow state in every router. Segment routing achieves traffic engineering without per-flow state.

**Scalability.** No state explosion as flows scale.

**Failure protection.** TI-LFA (Topology-Independent Loop-Free Alternate) provides 50ms convergence using segment routing semantics.

**SDN integration.** A controller can prescribe paths through segment routing without complex distributed signalling.

**Service chaining.** Network services (firewall, NAT, deep inspection) can be inserted by including them as segments in the path.

### Segment routing variants

Two main variants:

**SR-MPLS.** Segments encoded as MPLS labels. Backward-compatible with existing MPLS infrastructure. Requires no IPv6.

**SRv6 (Segment Routing over IPv6).** Segments encoded as IPv6 addresses in an IPv6 Segment Routing Header. Native IPv6 deployment. The newer and increasingly preferred variant.

### Segment types

**Node segment.** Identifies a specific router. Packet is forwarded toward that router via the shortest path.

**Adjacency segment.** Identifies a specific link from a specific router. Packet is forwarded over that link.

**Anycast segment.** Identifies a group of routers (a set serving the same prefix anycast).

**Binding segment.** Indirection to another segment list.

**Service segment.** Identifies a service to be applied (firewall, NAT).

### Operational example

A packet from source to destination, traffic-engineered to traverse a specific path:

1. Ingress router receives the packet.
2. Looks up the destination; finds a SR policy requiring path A → B → C → D.
3. Pushes segment list [A, B, C, D] onto the packet.
4. Forwards toward A.
5. A processes the segment, removes itself, forwards toward B.
6. ... continues through C and D.
7. D delivers to the actual destination.

No router along the way needed to know about the specific flow; each just processed segment-list instructions.

### Adoption

Segment routing is gaining significant traction:

- **Service providers.** Many tier-1 ISPs have deployed or are deploying segment routing. SR-MPLS first; SRv6 increasingly.
- **Large enterprises.** Some banking, energy, government, and cloud-provider networks have adopted segment routing.
- **Vendor support.** Cisco, Juniper, Nokia, Arista, Huawei all support segment routing.
- **Standards.** Mature IETF standards.

In Nepal, segment routing is in early adoption — primarily at service provider level. NTC and Ncell have been progressively modernising their networks; specific segment-routing deployment information is not public.

For an MSc student, segment routing is a hot topic — research thesis material, career-relevant skill, growing job market.

## 3.8 Routing and switching over SDN and quantum networks

### Software-Defined Networking (SDN)

*Software-Defined Networking is the network architecture that separates the control plane (which decides how traffic is forwarded) from the data plane (which forwards traffic) by centralising control in a controller that programs forwarding state across many data-plane devices, enabling network programmability, automation, and rapid evolution.*

SDN concepts emerged in the late 2000s; OpenFlow (2008) was the first protocol for centralised control. The model has evolved through several variants.

### Traditional networking vs SDN

| Aspect | Traditional | SDN |
|---|---|---|
| Control logic | In each device | Centralised in controller |
| Forwarding decisions | Each device decides | Controller decides; devices execute |
| Protocols | Distributed (OSPF, BGP) | Often centralised; some distributed |
| Configuration | Per-device | Network-wide policy |
| Changes | Manual or scripted | Programmatic |
| Network state | Distributed | Centralised view |

### SDN benefits

- **Programmability.** Network behaviour defined in software.
- **Centralised view.** Single source of truth.
- **Rapid change.** New policies deployable in seconds.
- **Vendor independence.** Open standards allow multi-vendor; controllers can manage diverse hardware.
- **Innovation.** Easier to introduce new behaviours.

### SDN deployments

**OpenFlow-based.** Pure OpenFlow has had limited enterprise deployment. Used in research, some data centres, and specific niches.

**Cisco ACI (Application Centric Infrastructure).** Cisco's SDN approach for data centres. Policy-based; widely deployed in enterprise data centres including some in Nepal.

**VMware NSX.** Network virtualisation overlay. Used in virtualised data centres.

**SD-WAN.** Software-defined WAN. Major deployment area; widely adopted including in Nepali enterprises.

**Cisco DNA Center.** SDN for campus networks. Programmatic management of switches and APs.

**SD-Access.** Cisco's SDN approach for campus access (built on DNA Center).

**Cloud SDN.** AWS VPC, Azure VNet, GCP VPC are all SDN networks at scale.

### SDN in Nepal

Adoption status:
- **Cisco ACI** in data centres of major banks.
- **SD-WAN** widely adopted by enterprises with branch networks.
- **VMware NSX** in some larger virtualised environments.
- **Cloud-native SDN** by everyone using AWS, Azure, GCP.

Traditional networking still dominates by volume; SDN is the strategic direction.

### Quantum networks

*Quantum networking is the emerging field of communication networks that use quantum-mechanical properties — superposition, entanglement, no-cloning — to transmit and process information, offering capabilities (provably secure key distribution, distributed quantum computing) that classical networks cannot match.*

Quantum networking is in early research and limited deployment. Key concepts:

**Quantum Key Distribution (QKD).** Distributing cryptographic keys using quantum properties. Eavesdropping is detectable because measurement disturbs the quantum state. Several protocols (BB84, E91, CV-QKD). Limited commercial deployments exist in finance, government, defence in some countries.

**Quantum entanglement.** Pairs of quantum systems share correlated states regardless of distance. Foundation for quantum repeaters and distributed quantum computing.

**Quantum repeaters.** Devices that extend quantum communication beyond direct-link distances by transferring entanglement through intermediate nodes. Still in research.

**Quantum internet.** Long-term vision of a quantum-networked internet. Multi-decade horizon.

### Quantum networking in Nepal

Currently:
- Research-only.
- IOE Pulchowk and Tribhuvan University research groups have done some work in quantum-information topics (theoretical and educational).
- No commercial deployment.
- Possible thesis topic for MSc students with appropriate background.

The Cryptography subject covered post-quantum cryptography — the classical-cryptography response to quantum-computing threats. Quantum networking is the corresponding evolution at the network layer.

### Practical relevance

For a working network engineer in 2026:
- SDN is operationally relevant; familiarity with one or more SDN approaches is increasingly expected.
- Quantum networking is mostly forward-looking. Awareness yes; operational deployment unlikely in most careers for the next several years.

## 3.9 Multi-path routing and load balancing

### Multipath routing

*Multipath routing is the network technique in which traffic between a source and destination is distributed across multiple paths rather than using a single path, improving aggregate bandwidth, providing fault tolerance, and load-balancing across available capacity.*

The benefits:
- **More bandwidth.** Multiple paths add capacity.
- **Lower latency** for some flows when paths have different characteristics.
- **Faster failure recovery.** When one path fails, others continue.
- **Better utilisation.** Idle paths are used.

### Equal-Cost Multi-Path (ECMP)

*Equal-Cost Multi-Path is the routing behaviour in which multiple paths with the same metric to a destination are all installed in the forwarding table, with traffic distributed across them based on flow-level hashing of header fields, providing per-flow path consistency while balancing aggregate load.*

ECMP is supported by most modern routing protocols (OSPF, IS-IS, BGP, EIGRP) and most modern switches/routers.

**Hash inputs.** Typical hash uses 5-tuple (source IP, destination IP, source port, destination port, protocol). Different flows hash to different paths; same flow consistently uses the same path (preserving in-order delivery).

**Per-packet ECMP.** Each packet independently chosen. Maximises path utilisation but can reorder packets — generally avoided.

**Per-flow ECMP.** Each flow's path is consistent. Standard.

**Unequal-cost ECMP.** Some protocols (EIGRP with variance) support distributing across unequal-cost paths.

### Link Aggregation (LAG / EtherChannel / Bond)

*Link Aggregation is the technique of combining multiple physical links into a single logical link with the combined bandwidth, used between adjacent devices to increase capacity and provide redundancy without requiring upper-layer routing changes.*

Standard protocols:
- **LACP (Link Aggregation Control Protocol).** IEEE 802.1AX (formerly 802.3ad). Industry standard.
- **PAgP (Port Aggregation Protocol).** Cisco-proprietary.
- **Static aggregation.** Manually configured; no protocol negotiation.

LAG distributes traffic across member links using a hash (similar to ECMP). The hash inputs are configurable — by source MAC, destination MAC, IP, ports, or combinations.

### Multipath TCP (MPTCP)

*Multipath TCP is a TCP extension (RFC 8684) that allows a single TCP connection to use multiple network paths simultaneously, increasing bandwidth and providing seamless handoffs as paths change, transparent to applications using the TCP socket API.*

Use cases:
- **Mobile devices.** Use both WiFi and cellular simultaneously for redundancy and bandwidth.
- **Data centre.** Multiple paths between servers used by a single connection.
- **Web traffic.** Combining multiple connection paths.

Apple has deployed MPTCP for Siri and other services. Linux kernel supports MPTCP. Adoption in general is growing slowly.

### Load balancing

Beyond network-layer multipath, load balancing operates at different layers:

**Layer 2 load balancing.** LAG (above).

**Layer 3 load balancing.** ECMP (above).

**Layer 4 load balancing.** Transport-layer load balancers distribute connections to backend servers based on connection-level information (source IP, port). Examples: HAProxy, NGINX, F5 BIG-IP, AWS Network Load Balancer.

**Layer 7 load balancing.** Application-aware load balancers route based on HTTP host, URL, cookies, or content. Examples: NGINX, HAProxy, F5 BIG-IP, AWS Application Load Balancer.

**Global load balancing.** DNS-based or anycast-based distribution across geographic locations. AWS Route 53, Azure Traffic Manager, F5 GTM.

### Worked example

Consider a Nepali bank's data centre with redundant connectivity:

- **Two routers** acting as gateways with HSRP for resilience.
- **Four uplinks** from each router to upstream provider — 2x to NTC, 2x to WorldLink Enterprise.
- **iBGP** between the two routers.
- **eBGP** with each upstream provider.

Routing behaviour:
- BGP receives routes from both providers.
- For destinations available through both, ECMP across both providers (if local policy permits).
- Within each provider, ECMP across the two physical links.
- LAG could be used on the access links to NTC, treating two links as one logical link with 2x bandwidth.

The combination provides bandwidth aggregation, fault tolerance, and good utilisation — typical of well-designed enterprise networks.

## 3.10 Predictive analytics for proactive routing

### Reactive vs proactive routing

Traditional routing is reactive. A failure occurs; the protocol detects it; convergence happens; traffic re-routes. The reaction takes time — milliseconds for fast protocols like BFD-enabled IGPs, seconds to minutes for BGP.

Proactive routing aims to anticipate failures or congestion and shift traffic before they manifest.

### Predictive analytics

*Predictive analytics for proactive routing is the application of machine learning and statistical modelling to network telemetry — flow data, performance metrics, device health, historical patterns — to predict future events (failures, congestion, attacks) and to adapt routing decisions in advance, reducing the impact of disruptions.*

The combination of:
- **Streaming telemetry** providing real-time visibility.
- **Historical data** providing context.
- **Machine learning models** producing predictions.
- **Automated response** acting on predictions.

### Applications

**Failure prediction.** Devices exhibit subtle signals before hard failures — increasing error rates, climbing temperatures, growing memory pressure. Models trained on past failures predict imminent ones. Traffic can be drained from a router before it fails.

**Congestion prediction.** Traffic patterns are often periodic (workday peaks, end-of-month peaks, scheduled batch jobs). Models predict congestion windows. Routing or QoS adjusts in advance.

**Attack detection.** Anomaly detection identifies DDoS, scanning, malware activity. Routing can divert attack traffic for scrubbing.

**Path performance prediction.** SD-WAN devices measure path performance continuously. Predictions of degradation prompt path switching.

**Capacity planning.** Predicting where capacity will be exhausted, when, and by what magnitude.

### Implementation

Modern implementations involve:

- **Telemetry collection.** Streaming telemetry from network devices (gNMI/gRPC), flow data (NetFlow, IPFIX, sFlow), system metrics, application telemetry.
- **Data platform.** Time-series databases (InfluxDB, Prometheus), big-data platforms (Elasticsearch, Kafka).
- **Analytics platform.** Tools running models — Cisco Crosswork Network Insights, Cisco ThousandEyes, Juniper Mist AI, Nokia Network Services Platform, vendor and third-party AIOps platforms.
- **Action layer.** Closed-loop automation — predictions translate to routing/policy changes.

### Status in enterprise

Predictive analytics for networks is a developing area:

- **Cloud providers** are well ahead — they have massive telemetry, sophisticated ML, and tight feedback loops.
- **Large enterprises** with mature AIOps platforms increasingly use prediction.
- **Mid-size enterprises** mostly still use reactive operations.
- **Smaller enterprises** rely on basic monitoring.

For Nepali enterprises, the trajectory is similar — early adopters experimenting with vendor AIOps platforms; mass adoption still ahead.

### Research opportunities

For an MSc student or researcher, predictive analytics for networks is rich research territory:
- ML models for specific network prediction tasks.
- Reinforcement learning for network optimisation.
- Federated learning across distributed networks.
- Explainability of network ML decisions.
- Closed-loop automation safety.

The IOE Pulchowk thesis catalogue includes some related work; the field is open and growing.

The next chapter shifts from routing (Layer 3) to switching (Layer 2) — the enterprise local-area network and its specific design and operational concerns.
