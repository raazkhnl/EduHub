---
title: 'Chapter 2 — Converged Network Design Guidelines'
sidebar_label: 'Ch 02 — Converged Network Design Guidelines'
sidebar_position: 2
description: 'Chapter 2 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch02
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

A converged network carries all of an organisation's traffic — data, voice, video, control plane, management — over a unified infrastructure. The economic and operational logic is compelling: one set of cables, switches, and routers instead of separate voice and data networks; one team to operate; one architecture to evolve. The cost is design complexity. A converged network must serve very different traffic types — bursty data, jitter-sensitive voice, bandwidth-hungry video, latency-sensitive financial transactions — simultaneously, securely, and reliably. This chapter covers the design guidelines: the principles that make converged networks workable, the framework that protects the network's foundation, the IP-addressing foundation in IPv4 and IPv6, the emerging discipline of cross-layer protocol engineering, the planning and documentation that keeps networks manageable, and the Terms of Reference document that starts every network project.

## 2.1 Converged network design guidelines

### Converged network

*A converged network is an enterprise network designed to carry multiple traffic types — data, voice, video, signalling, management, and storage — over a single, unified IP-based infrastructure, replacing the historical pattern of separate networks for separate services with a common foundation that supports all of them.*

The transition from separate networks (data on Ethernet, voice on PSTN, video on dedicated circuits, storage on Fibre Channel) to convergence happened progressively through the 2000s and 2010s. In Nepal, the convergence is largely complete in enterprise environments — banks, telecoms, government agencies, large educational institutions — though pockets of separate-network thinking remain.

### Why convergence

Several drivers:

**Cost.** One network is cheaper than several. Single cabling, single hardware footprint, single operations team.

**Flexibility.** Adding a new service (a video conferencing system, a unified communications platform, IoT sensors) does not require new cabling — it uses the existing IP network.

**Scalability.** IP scales; the convergence onto IP lets the network leverage that scale.

**Vendor ecosystem.** A vast ecosystem of IP networking products; specialised products for non-IP transports diminish.

**Integration.** Applications that span domains (a unified-communications client that handles voice, video, presence, and chat in one application) need a converged underlying network.

### Design principles

A modern converged network design follows several principles.

**Hierarchical design.** The network is structured in layers — typically access, distribution, and core — with each layer having defined responsibilities. The hierarchy supports modularity, scalability, and troubleshooting.

**Modularity.** Different functional areas (campus LAN, data centre, WAN, internet edge, branch) are designed as modules with defined interfaces. Changes to one module do not cascade.

**Resilience.** Redundancy at every layer; failure of any single component should not bring the network down.

**Scalability.** The design accommodates growth in users, devices, traffic, and services without requiring fundamental restructuring.

**Quality of Service (QoS).** Different traffic classes get different treatment. Voice gets low latency; video gets bandwidth; bulk data gets best effort.

**Security by design.** Security controls are integrated, not bolted on. Segmentation, encryption, access control, monitoring.

**Manageability.** Standard configurations; consistent naming; comprehensive monitoring; documented procedures.

**Cost effectiveness.** Designed to required service levels without over-engineering.

### The hierarchical campus model

The classical Cisco-influenced campus design has three layers:

**Access layer.** Where end devices (PCs, phones, printers, wireless APs, cameras) connect. High port count; relatively simple; physically closest to users.

**Distribution layer.** Aggregates traffic from access switches. Implements policy (QoS marking, access control, routing). Connects access to core.

**Core layer.** High-speed backbone connecting distribution blocks and other major modules (data centre, WAN, internet edge). Optimised for fast packet forwarding; minimal policy or feature complexity.

For smaller networks, distribution and core may collapse into a single "collapsed core" tier. For very large networks, additional layers may exist.

### Service blocks

A modern enterprise design adds service blocks alongside the core:

- **Data centre block.** Servers, storage, virtualisation infrastructure.
- **Internet edge block.** Internet-facing services, perimeter security.
- **WAN block.** Connectivity to branches, cloud, partners.
- **Wireless block.** Wireless controllers and management.
- **DMZ block.** Public-facing services.
- **Management block.** Network management, monitoring, security operations.

Each block has its own internal structure and connects to the core through defined interfaces.

### Cisco SAFE / Cisco Enterprise Architecture

Cisco's SAFE (Security Architecture for Enterprise) and related architecture references describe the converged-network design pattern in detail. The references are vendor-specific in their product references but the architectural patterns are general.

For Nepali enterprises:
- Large commercial banks typically follow a hierarchical campus with separate service blocks. Cisco is the dominant network vendor; Juniper, Huawei, and others have smaller footprints.
- Telecoms operate networks at scale that go beyond enterprise patterns — service-provider architectures with carrier-grade equipment.
- Government agencies vary widely in maturity.
- Mid-size enterprises typically have simplified collapsed-core designs.

## 2.2 Network Foundation Protection Framework

### Network Foundation Protection (NFP)

*Network Foundation Protection is the architectural framework — most associated with Cisco's NFP framework but applicable broadly — that organises the protection of network infrastructure devices themselves into three planes: management plane, control plane, and data plane, ensuring that the network's foundation is protected at every layer that affects its operation.*

The framework reflects the insight that protecting what the network carries is necessary but not sufficient — the network's own infrastructure (routers, switches, firewalls) must also be protected, or the attacker who compromises the infrastructure controls everything passing through.

### The three planes

**Management plane.** How the network is managed. Includes SSH/Telnet access, SNMP, syslog, RADIUS/TACACS+ for authentication, NetFlow export, configuration management tools.

Threats: unauthorised configuration changes, credential theft, eavesdropping on management traffic, attacks on management interfaces.

**Control plane.** Routing protocols, ARP, neighbour discovery, spanning tree, LACP, multicast control. The traffic that builds and maintains the network's view of itself.

Threats: routing-protocol attacks (route injection, BGP hijack, OSPF spoofing), spanning-tree manipulation, ARP poisoning, neighbour-discovery attacks.

**Data plane.** The actual user traffic forwarded through the network.

Threats: DDoS, abuse of forwarding paths, attacks against specific destinations, lateral movement.

### Management plane protection

Specific controls:

- **AAA.** Authentication, Authorization, Accounting through TACACS+ or RADIUS. Centralised identity management for network devices.
- **Encrypted management.** SSH (not Telnet); HTTPS (not HTTP); SNMPv3 (not v1/v2c).
- **Out-of-band management.** Separate management network isolated from the production data plane.
- **Access control lists** restricting which IPs can manage devices.
- **Logging.** All management actions logged to a centralised, protected log system.
- **NTP.** Synchronised time across all devices for log correlation.
- **Configuration management.** Approved configurations; automated deployment; drift detection.
- **Privilege levels.** Different access for different roles (read-only monitoring vs full config).

### Control plane protection

Specific controls:

- **Routing-protocol authentication.** Cryptographic authentication of OSPF, EIGRP, BGP, IS-IS, RIPv2 neighbours. Prevents unauthorised devices from injecting routes.
- **Maximum prefix limits.** Cap on the number of prefixes accepted from a BGP neighbour — prevents route-table exhaustion.
- **Route filtering.** Permitted prefixes only.
- **TTL-based protection.** GTSM (Generalized TTL Security Mechanism) for BGP — packets to BGP must arrive with TTL=255, defeating distant attackers.
- **Control-plane policing (CoPP).** Rate-limiting control-plane traffic to protect the router CPU.
- **BPDU Guard, Root Guard, Loop Guard.** Spanning-tree protections preventing manipulation.
- **DHCP snooping, ARP inspection.** Layer-2 protections against rogue DHCP and ARP poisoning.
- **IPv6 RA Guard.** Protection against rogue IPv6 router advertisements.

### Data plane protection

Specific controls:

- **Infrastructure ACLs (iACLs).** Filtering traffic to network infrastructure addresses themselves.
- **Unicast Reverse Path Forwarding (uRPF).** Drops packets with source addresses not reachable via the incoming interface — anti-spoofing.
- **Black-hole filtering / RTBH.** Remotely-Triggered Black Hole — coordinated dropping of attack traffic across many routers.
- **QoS for control traffic.** Ensure control-plane traffic gets through during congestion.
- **Anti-DDoS controls.** Scrubbing, rate-limiting, BGP flow-spec for distributed mitigation.

### NFP in Nepali networks

The 2024 GIDC DDoS that took down 400+ government portals reflected partly the absence of robust NFP-style controls at the upstream-provider and network-foundation levels. Subsequent reviews emphasised:

- Coordinating with upstream ISPs (NTC, WorldLink, others) for traffic scrubbing.
- Implementing BGP flow-spec or RTBH for rapid response.
- Hardening management plane access.
- Strengthening control-plane protection on edge routers.

Modern Nepali bank networks typically implement strong NFP controls — TACACS+ authentication, encrypted management only, AAA logging, routing-protocol authentication, BPDU guard on user-facing ports. The maturity varies but the direction is clear.

## 2.3 Review of IP networks — IPv4 and IPv6

### IPv4

*Internet Protocol version 4 is the network-layer protocol that has carried virtually all internet traffic since the early 1980s, using 32-bit addresses providing approximately 4.3 billion unique addresses, with a connectionless packet-forwarding model based on best-effort delivery.*

The IPv4 header structure (most relevant fields):
- Version (4 bits, always 4 for IPv4).
- IHL (4 bits) — header length in 32-bit words.
- DSCP/ECN (8 bits) — QoS marking.
- Total length (16 bits).
- Identification, flags, fragment offset (16 + 3 + 13 bits) — for fragmentation.
- TTL (8 bits) — hop count limit.
- Protocol (8 bits) — what's in the payload (TCP=6, UDP=17, ICMP=1, etc.).
- Header checksum (16 bits).
- Source address (32 bits).
- Destination address (32 bits).
- Options (variable).

IPv4 addressing uses dotted-decimal notation — 192.168.1.1 — and subnet masks (either dotted-decimal 255.255.255.0 or CIDR notation /24).

### IPv4 address exhaustion

The 32-bit address space gives 4.3 billion addresses — far less than current internet-connected devices. The exhaustion of the global IPv4 pool happened progressively from 2011 onwards. APNIC (Asia-Pacific) and other regional internet registries have allocation policies that effectively limit IPv4 allocation to small blocks or transfers.

The workarounds have shaped the modern internet:

**NAT (Network Address Translation).** Multiple internal hosts share a single public IPv4 address (covered in Chapter 5). The dominant approach in enterprise and home networks.

**CGNAT (Carrier-Grade NAT).** ISPs apply additional NAT, putting customers on shared public IPs. Common at Nepali ISPs.

**IPv4 trading.** A market for IPv4 blocks; prices have grown.

These workarounds are operationally workable but introduce complications — NAT breaks end-to-end addressing, CGNAT impedes some applications, address scarcity is a real constraint.

### IPv6

*Internet Protocol version 6 is the successor to IPv4, designed in the 1990s to address IPv4's limitations, using 128-bit addresses providing approximately $3.4 \times 10^{38}$ unique addresses, with a streamlined header, native support for security and mobility, and improved support for QoS.*

Key improvements over IPv4:

- **Address space.** 128 bits — practically unlimited. No NAT needed.
- **Header simplification.** Fixed 40-byte header; extension headers for optional features.
- **No header checksum.** Performance improvement; relies on transport-layer checksums.
- **No fragmentation by routers.** Hosts perform path MTU discovery and fragment if needed.
- **Stateless Address Autoconfiguration (SLAAC).** Hosts derive addresses from router advertisements.
- **Native IPsec.** Mandatory implementation (though configuration optional).
- **Better multicast.** Replaces broadcast.
- **Better mobility.** Mobile IPv6.

### IPv6 addressing

128-bit addresses written as eight 16-bit groups in hexadecimal, separated by colons:

`2001:0db8:85a3:0000:0000:8a2e:0370:7334`

With shorthand rules:
- Leading zeros in a group can be omitted: `0db8` → `db8`.
- A run of all-zero groups can be replaced with `::` (only once per address).

So `2001:0db8:85a3:0000:0000:8a2e:0370:7334` becomes `2001:db8:85a3::8a2e:370:7334`.

Address types:

- **Unicast.** Single destination. Subdivided into global unicast (publicly routable, `2000::/3`), link-local (`fe80::/10`, local-link only), unique local (`fc00::/7`, equivalent to RFC 1918 private).
- **Multicast.** Multiple destinations. Replaces IPv4 broadcast.
- **Anycast.** Single delivery to any one of multiple advertisers.

Subnets are typically /64 (the bottom 64 bits available for host addresses).

### IPv6 deployment status

Globally:
- Major content providers (Google, Facebook, Netflix) serve significant traffic over IPv6.
- Mobile networks heavily use IPv6 (it's the default for many LTE/5G deployments).
- Enterprise IPv6 adoption is uneven; many enterprises still primarily use IPv4 internally.
- ISPs have varying IPv6 deployment.

In Nepal:
- Major ISPs offer IPv6 connectivity but residential customer adoption is limited.
- NTC and Ncell support IPv6 in mobile networks.
- Government agencies have begun IPv6 adoption but full deployment is incomplete.
- Most enterprises operate dual-stack — IPv4 plus IPv6 where required — or IPv4-only.

The IPv6 transition is a long process; full IPv4 retirement is decades away.

### Dual stack and transition mechanisms

Several mechanisms enable IPv4-IPv6 coexistence:

**Dual stack.** Devices support both IPv4 and IPv6 simultaneously. The standard transition approach.

**Tunnelling.** IPv6 traffic encapsulated in IPv4 (or vice versa) for transit across the other protocol's infrastructure.

**Translation (NAT64, DNS64).** IPv6-only clients access IPv4-only servers through a translator.

**464XLAT.** Combination of NAT64 and IPv4-in-IPv6 for IPv6-only access networks supporting IPv4 applications.

Modern Nepali networks typically run dual stack on infrastructure that supports it, with IPv4-only operation elsewhere.

### Addressing plan considerations

For an enterprise network, addressing planning includes:

**IPv4.**
- Use of RFC 1918 private space (10/8, 172.16/12, 192.168/16) for internal addressing.
- Subnet sizing based on expected hosts plus growth.
- Hierarchical allocation to support summarisation.
- Separate ranges for different network areas (campus, branches, data centre, management, DMZ).
- DHCP for end-user devices; static for infrastructure.

**IPv6.**
- Global unicast space (received from RIR or ISP) for routable use.
- /64 subnets per VLAN.
- Hierarchical allocation supporting summarisation.
- SLAAC or DHCPv6 for client addressing.
- Consideration of address persistence vs privacy.

A well-planned addressing scheme supports the network's evolution; a poorly-planned one becomes a permanent burden.

## 2.4 Cross-layer protocol engineering

### Cross-layer protocol engineering

*Cross-layer protocol engineering is the design approach that intentionally shares information across the traditional layers of the network protocol stack — physical, data link, network, transport, application — rather than maintaining strict layer separation, with the goal of optimising overall network performance, energy efficiency, security, or quality of service in ways that strict layering cannot achieve.*

The traditional layered model (OSI 7-layer, TCP/IP 4/5-layer) provides modularity but imposes inefficiencies. A wireless link's signal strength is known at the physical layer; the application sending video over that link could adapt its quality if it knew the link quality. Strict layering forbids this; cross-layer thinking enables it.

### Why cross-layer

Several drivers:

**Wireless networks.** Wireless links have characteristics (interference, fading, mobility) that profoundly affect higher-layer performance but are invisible above the link layer in strict architectures.

**Quality of service.** Application-aware QoS requires information sharing between application and lower layers.

**Energy efficiency.** Battery-powered devices benefit from optimising radio behaviour based on application needs.

**Mobility.** Handoffs between networks require coordination across layers.

**Security.** Security threats and responses often span layers.

**Internet of Things.** Constrained devices benefit from tight coupling between layers.

### Examples of cross-layer techniques

**Cross-layer congestion control.** TCP's congestion control benefits from physical-layer signals. ECN (Explicit Congestion Notification) lets routers mark packets when congested; TCP responds before packet loss. This crosses the network-transport boundary.

**Multipath TCP (MPTCP).** Uses multiple network paths simultaneously. Requires coordination between transport and network layers.

**Application-aware routing.** Routers prioritise traffic based on application identity (DPI — Deep Packet Inspection or SD-WAN application recognition). Crosses application-network boundary.

**Cross-layer security.** WPA3 wireless security integrates physical, link, and authentication layers.

**Adaptive video streaming (HLS, DASH).** Application adapts video quality based on observed throughput — using transport-layer signals at the application layer.

**Energy-aware routing.** In mobile/sensor networks, route choices consider battery levels of intermediate nodes.

**Bufferbloat mitigation.** AQM (Active Queue Management) algorithms like CoDel and FQ_CoDel use packet-level information for queue management.

### Research and practice

Cross-layer optimisation is an active research area. Tradeoffs:

- **Pro:** Better performance for specific use cases.
- **Con:** Loss of modularity; tighter coupling complicates evolution; harder to reason about.

The IETF (Internet Engineering Task Force) has produced cross-layer mechanisms where benefits clearly outweigh costs. Other proposals remain academic.

For an MSc student researching networking, cross-layer protocol engineering is a research area with thesis opportunities. The IOE Pulchowk research program at the master's and PhD level has explored related topics.

## 2.5 Network planning and documentation

### Why planning and documentation matter

Networks are long-lived. A network designed today operates for 5-10 years before significant refresh. Documentation is what lets the team that operates the network in year 5 understand what was built in year 0.

Operations that lack documentation:
- Take longer to troubleshoot.
- Suffer more outages due to misunderstandings.
- Onboard new engineers slowly.
- Fail audits.
- Cannot reproduce known-good configurations after disasters.

Documentation is not optional; it is operationally essential.

### Network documentation categories

**Topology diagrams.**
- Physical topology: actual cabling, rack locations, port assignments.
- Logical topology: subnets, VLANs, routing relationships.
- Layer 2 and Layer 3 separately.

**Inventory.**
- Devices with model, serial number, software version, location, ownership.
- Software licences and expiry dates.
- Vendor support contracts.

**Configuration.**
- Standard configuration templates.
- Per-device configurations (often in version control).
- Configuration change history.

**Addressing.**
- IP address plan with allocation tracking (IPAM tool).
- VLAN inventory.
- Routing plan (AS numbers, routing protocols, areas).
- DNS plan.

**Connectivity.**
- WAN circuit list with provider, capacity, contract details.
- Internet connectivity.
- Site-to-site links.
- Cloud connections.

**Security.**
- Firewall rule set with justifications.
- VPN inventory.
- Access controls.

**Operations.**
- Network management tools.
- Monitoring infrastructure.
- Backup procedures.
- Standard operating procedures.

**Diagrams over time.**
- Past, present, and future state diagrams.

### Tools for documentation

**Diagramming.** Microsoft Visio (commercial), draw.io / diagrams.net (free, web-based), Lucidchart (commercial cloud).

**IPAM (IP Address Management).** Microsoft IPAM, SolarWinds IPAM, phpIPAM (open-source), NetBox (open-source).

**Network configuration management.** SolarWinds Network Configuration Manager, Rancid (open-source), Oxidized (open-source), Ansible-based pipelines.

**Network management.** SolarWinds Orion, ManageEngine OpManager, Zabbix (open-source), LibreNMS (open-source), Cisco Prime/DNA Center.

**Documentation platforms.** Confluence (commercial), MediaWiki (open-source), Notion (commercial).

For a Nepali bank, the typical tool set includes some combination of commercial network management (SolarWinds, ManageEngine, Cisco DNA Center for Cisco-heavy environments), Visio for diagrams, and Confluence or SharePoint for documentation. Open-source alternatives are common in smaller organisations and educational settings.

### NetBox specifically

NetBox deserves a separate mention. It is an open-source DCIM (Data Center Infrastructure Management) and IPAM platform widely used by network engineers globally and increasingly in Nepal. NetBox manages:

- Sites, racks, devices.
- IP addresses and prefixes.
- VLANs and VLAN groups.
- Circuits and providers.
- Cables.
- Power.
- Virtual machines.
- Configuration contexts.

NetBox has an API that supports automation. Configuration-management tools (Ansible, Nornir) can read NetBox as their source of truth and generate device configurations.

### Network planning

Beyond documentation of the current state, planning addresses the future state.

**Capacity planning.** When will current links be saturated? When will device CPU/memory be exhausted?

**Refresh planning.** When does current equipment reach end-of-life? What replaces it?

**Capability planning.** What new capabilities will be needed (IPv6, segment routing, automation)?

**Budget planning.** What investment is needed in each year?

**Risk planning.** Single points of failure; concentration risks; geographic risks.

The output of planning is a roadmap — what the network will look like in 1, 3, 5 years and what investment is needed each year to get there.

For NRB-regulated banks, IT planning (including network) is required to be documented, board-approved, and updated. The audit process examines whether the plan is real, whether it is being executed, and whether it reflects current realities.

## 2.6 Building network Terms of Reference and access network design

### Terms of Reference (ToR)

*A Terms of Reference for a network project is the document that defines the scope, objectives, deliverables, requirements, constraints, success criteria, governance, and timeline of the project, prepared at project initiation and serving as the agreed reference for all stakeholders throughout execution.*

The ToR is the project charter. Without a ToR, projects suffer from scope creep, misaligned expectations, and disputes over what was supposed to be done. With a ToR, everyone agrees on the destination before the journey begins.

### Contents of a network-project ToR

A typical ToR for a network project includes:

1. **Project background and rationale.** Why is this project being undertaken?
2. **Project objectives.** What will the project achieve?
3. **Scope.**
   - In-scope: sites, technologies, services.
   - Out-of-scope: what is explicitly excluded.
4. **Deliverables.** What will be produced (designs, equipment, services, documentation, training).
5. **Requirements.**
   - Functional: what the network must do.
   - Non-functional: performance, availability, security, scalability.
   - Regulatory: applicable directives and standards.
   - Integration: interfaces with existing systems.
6. **Constraints.**
   - Budget.
   - Timeline.
   - Technology choices (mandated or excluded).
   - Existing infrastructure to be reused.
7. **Assumptions.** What is assumed to be true that the project depends on.
8. **Stakeholders.** Sponsor, project manager, users, vendors, auditors, regulators.
9. **Governance.**
   - Decision authority.
   - Reporting structure.
   - Change-request process.
10. **Timeline.** Phases with milestones.
11. **Risk register.** Identified risks with mitigations.
12. **Success criteria.** How success will be measured.
13. **Acceptance criteria.** What constitutes project completion.
14. **References.** Standards, designs, prior projects.

### A sample network-project ToR

For a hypothetical IOE Pulchowk campus network refresh:

---

**Terms of Reference — IOE Pulchowk Campus Network Refresh**

**1. Background.** The current Pulchowk campus network was deployed in 2018 with Cisco Catalyst 2960X access switches and 3850 distribution switches. Equipment is nearing end-of-life; switching capacity is constrained; the network does not support IPv6 or modern QoS for video conferencing.

**2. Objectives.**
- Replace end-of-life access and distribution equipment.
- Enable IPv6 dual-stack.
- Improve wireless coverage and capacity.
- Implement standard QoS for voice and video.
- Strengthen security through network access control.

**3. Scope.**
- In-scope: All academic buildings on the Pulchowk campus; campus wireless network; campus internet connection.
- Out-of-scope: Departmental servers; faculty laptops; the hostel network (separate project).

**4. Deliverables.**
- Updated network design document.
- Installed network equipment per design.
- Configured devices with documented configurations.
- Migrated services with minimal disruption.
- Documentation in NetBox.
- Training for IT staff.
- 90-day operational hand-over.

**5. Requirements.**
- Functional: 802.1X authentication; VLAN-based segmentation; IPv6 dual-stack; QoS for voice and video; wireless coverage of all classrooms.
- Non-functional: 99.9% availability target; 1 Gbps to desktops; 10 Gbps in distribution backbone; 802.11ax wireless.
- Regulatory: Align with University ICT policy.
- Integration: Maintain existing internet provider relationship; integrate with existing AD for authentication.

**6. Constraints.**
- Budget: NPR 80 lakhs total.
- Timeline: 9 months from contract signing.
- Equipment: Single-vendor stack preferred for management consistency.

**7. Assumptions.**
- Existing fibre cabling between buildings remains usable.
- Power and cooling in network closets are adequate.

**8. Stakeholders.**
- Sponsor: Dean.
- Project manager: Head of IT.
- Users: Faculty, students, administration.
- Vendor: Selected through procurement process.
- Auditor: Internal audit.

**9. Governance.**
- Project Steering Committee meets monthly.
- Change Control Board approves scope changes.
- Status reports weekly.

**10. Timeline.** Procurement (months 1-2); Detailed design (months 2-3); Equipment delivery (months 3-4); Installation (months 4-7); Migration (months 7-8); Hand-over (months 8-9).

**11. Risks.** Equipment delays; existing cabling issues; user disruption during migration; budget overrun.

**12. Success criteria.** All requirements met; budget within approved limits; timeline within approved limits; operational hand-over complete.

---

A real ToR would have more detail in each section; this illustrates the structure.

### Access network design guidelines

The access network is the part of the enterprise network where end devices connect. Design guidelines:

**Port density.** Adequate ports for current users plus growth headroom.

**Power.** Power over Ethernet (PoE) for IP phones, wireless APs, IP cameras, IoT devices. PoE+ (30W) or PoE++ (60W or 100W) as needed.

**Wireless.** Modern wireless (802.11ax / Wi-Fi 6 or Wi-Fi 6E in 2026) with controller-based management. Coverage planning by RF survey.

**Authentication.** 802.1X with backend RADIUS for wired and wireless. Identity-based VLAN assignment.

**VLAN design.** Logical separation of user groups (faculty, students, IoT, guests, voice). Voice on separate VLAN with appropriate QoS.

**Layer 2 security.** Port security, BPDU Guard, DHCP snooping, dynamic ARP inspection, IPv6 RA Guard.

**Connectivity to distribution.** Redundant uplinks where possible. EtherChannel/LACP.

**Stacking or virtualisation.** Access switches stacked for management and uplink resiliency.

**Cabling.** Standard structured cabling (Cat 6A for new builds; fibre to wiring closets for backbone).

**Documentation.** Every port labelled with cable identifier; documented in IPAM/DCIM.

The access network is the most user-visible part of the enterprise network. User experience — speed, reliability, wireless coverage — depends heavily on access design.

### Hand-off between project and operations

A ToR-driven project ends with hand-off to operations. The hand-off includes:

- Documentation transfer.
- Knowledge transfer (training).
- Spare-parts inventory.
- Vendor contact transfer.
- Open-issue list.
- Performance baseline.

Without a clean hand-off, the operations team struggles to support what the project delivered. The project-operations transition is where many networks accumulate technical debt that haunts them for years.

The next chapter turns to the central technical content of the course: how packets are routed across enterprise networks.
