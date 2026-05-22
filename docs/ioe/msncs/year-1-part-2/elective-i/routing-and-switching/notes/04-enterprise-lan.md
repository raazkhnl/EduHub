---
title: 'Chapter 4 — Enterprise Local Area Network'
sidebar_label: 'Ch 04 — Enterprise Local Area Network'
sidebar_position: 4
description: 'Chapter 4 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch04
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The local area network is where users actually connect to the enterprise — the wired and wireless network in offices, branches, campuses, data centres. Layer 2 switching, VLANs, inter-VLAN routing, LAN security, first-hop redundancy, and link aggregation are the operational substance of every modern enterprise LAN. This chapter covers the enterprise LAN architecture, virtual LANs and the VLAN Trunking Protocol, inter-VLAN routing approaches, LAN security mechanisms, load balancing for first-hop redundancy, and link aggregation technologies.

## 4.1 Enterprise local area network architecture

### Enterprise LAN

*An Enterprise Local Area Network is the high-speed network infrastructure within a single campus or building (or a small geographic area) that connects end-user devices, servers, and network services to each other and to the wider network, typically based on Ethernet and IP, designed for low latency, high reliability, and consistent performance.*

The enterprise LAN serves:
- Desktop and laptop computers.
- Wireless access points (and through them, mobile devices).
- IP phones.
- IP cameras.
- Printers, scanners, MFDs.
- IoT devices (badge readers, environmental sensors, smart-building systems).
- Local servers (where retained on-premises).
- WAN/internet edge equipment as the connection to outside.

### Hierarchical LAN design

The three-tier model from Chapter 2 applies here in operational detail:

**Access layer.** Where end devices connect. Switches with high port count, typically 24-48 ports per switch, often with PoE for powering phones, APs, cameras. Layer 2 functionality dominant; some Layer 3 capability for collapsed designs.

**Distribution layer.** Aggregates access switches. Provides routing between VLANs, ACL enforcement, QoS marking, redundant uplinks to the core. Typically Layer 3 capable.

**Core layer.** High-speed backbone connecting distribution blocks. Optimised for fast forwarding; minimal policy enforcement. Typically high-density 10/25/40/100 Gbps.

For small campuses, distribution and core collapse into a single tier (collapsed core).

### Modern access-layer considerations

Several themes shape current access-layer design:

**High port density.** 48-port switches are standard; some deployments use 96-port models.

**PoE / PoE+ / PoE++.** Powering connected devices. PoE+ (30W per port) supports modern APs and cameras. PoE++ (60W or 100W per port) powers higher-power devices (gigabit APs, larger IP cameras, some endpoints).

**Speed.** Gigabit (1 Gbps) to desktops is the standard floor in 2026. Multi-gigabit (2.5G, 5G, 10G) becoming common for wireless APs to support 802.11ax/Wi-Fi 6E throughput. 25G/40G uplinks to distribution.

**Stacking.** Multiple access switches in a logical stack — managed as one, with redundant power and supervisor functions. Cisco Catalyst 9300 series, Aruba Stacking, HPE/Aruba switches all support stacking patterns.

**Wireless integration.** WiFi controllers (Cisco WLC, Aruba Mobility Controllers, Mist) manage APs. Increasingly, cloud-managed wireless (Meraki, Mist Cloud, ExtremeCloud IQ) is preferred.

**Access security.** 802.1X with RADIUS-based authentication; port security; storm control; BPDU Guard.

### Wireless LAN

A modern enterprise LAN is mostly wireless on the user-facing side. Wireless design considerations:

**Coverage.** RF planning determines AP placement. A campus needs different AP density for warehouse vs office vs conference room.

**Capacity.** Modern devices generate substantial traffic. AP-to-client ratios matter — 25-50 active clients per AP for moderate-traffic environments; less for high-density (auditorium) scenarios.

**Standards.** Wi-Fi 6 (802.11ax) is mainstream in 2026; Wi-Fi 6E (adding 6 GHz spectrum) increasingly deployed; Wi-Fi 7 (802.11be) in early adoption.

**Bands.** 2.4 GHz (legacy, IoT), 5 GHz (mainstream), 6 GHz (Wi-Fi 6E onwards).

**Roaming.** Seamless handoff between APs through 802.11r/k/v.

**Authentication.** WPA3-Enterprise with 802.1X for enterprise; WPA3-Personal for residential; legacy WPA2 in lower-security scenarios.

**Guest networks.** Separate SSID and VLAN; captive portal authentication; limited bandwidth.

For a typical IOE Pulchowk faculty building, modern design would involve:
- 802.11ax APs every 20-30 metres in standard office areas.
- Higher density in lecture halls and labs.
- Cloud-managed (Aruba Mist or Meraki) for operational simplicity.
- Separate SSIDs for staff, students, guests — each on its own VLAN.
- 802.1X for staff and students; captive portal for guests.

## 4.2 Virtual LAN (VLAN) and VLAN Trunking Protocol

### VLAN

*A Virtual LAN is a logical broadcast domain that groups network devices regardless of their physical location, allowing a single physical Ethernet switch infrastructure to host multiple separate broadcast domains, providing segmentation, security, and traffic isolation without separate physical networks.*

Before VLANs (early-1990s), each broadcast domain required its own physical Ethernet segment. VLANs introduced in IEEE 802.1Q (standardised 1998) made it possible to share physical infrastructure between separate logical networks.

### VLAN concepts

**Broadcast domain.** All devices that receive each other's broadcast traffic. Without VLANs, each switch (or set of switches connected at Layer 2) was one broadcast domain.

**VLAN ID.** A 12-bit number (1-4094) identifying a VLAN. Values 0 and 4095 are reserved.

**Tagging.** When a frame travels on a trunk (a link between switches carrying multiple VLANs), it carries a 802.1Q tag indicating its VLAN. The tag adds 4 bytes to the Ethernet frame.

**Access port.** A switch port connecting to an end device, configured for a single VLAN. Frames on this port are untagged.

**Trunk port.** A switch port carrying multiple VLANs, typically to another switch or to a router. Frames are tagged.

**Native VLAN.** On a trunk, the VLAN whose frames are untagged. Default is VLAN 1.

### VLAN design

Typical VLAN partitioning in an enterprise:

| VLAN | Purpose |
|---|---|
| 10 | Management (network device management) |
| 20 | Staff workstations |
| 30 | Student / general user |
| 40 | Voice (IP phones) |
| 50 | Wireless guest |
| 60 | Wireless internal |
| 70 | Servers |
| 80 | Printers and other shared devices |
| 90 | IoT (cameras, badge readers, sensors) |
| 100 | DMZ |
| 110 | Public-facing services |
| 999 | Native VLAN (unused, security best practice) |

Each VLAN gets a subnet. Inter-VLAN routing enables communication between them with policy enforcement.

### Voice VLAN

Voice traffic deserves special treatment. IP phones connect to a switch, often passing through to a PC. The phone is on the voice VLAN; the PC on the data VLAN. The switch port carries both, with Cisco Discovery Protocol (CDP) or LLDP-MED telling the phone what voice VLAN to tag.

Voice VLANs typically get:
- High-priority QoS (DSCP EF).
- Strict admission control.
- Specific authentication.

### VLAN Trunking Protocol (VTP)

*VLAN Trunking Protocol is a Cisco-proprietary protocol that propagates VLAN database information across a network of switches, allowing VLAN creation, modification, and deletion on one switch to be automatically learned by others sharing the same VTP domain, simplifying VLAN administration.*

VTP versions:
- **VTP v1 and v2.** Original; widely deployed.
- **VTP v3.** Improved security and support for extended VLAN range (1006-4094).

VTP modes:
- **Server.** Can create, modify, delete VLANs. Advertises updates.
- **Client.** Cannot modify VLANs locally; receives updates.
- **Transparent.** Forwards VTP updates but does not participate.
- **Off.** Does not forward VTP at all.

### VTP risks and best practice

VTP has caused real outages. The infamous failure mode: a switch with a newer (higher revision number) but incorrect VLAN database is added to the domain; all other switches synchronise to its incorrect state; many VLANs are lost across the network.

Best practices:
- Use VTP v3 if VTP is used (better security and behaviour).
- Mostly **avoid VTP** in modern designs. Manage VLAN consistency through configuration management instead.
- If VTP is used, set non-server switches to transparent mode in steady state.
- Always verify revision numbers before connecting new switches.
- Document the VLAN database.

In modern enterprise design, VLANs are typically pushed through automation (Ansible, vendor SDN controllers) rather than VTP. The risk of VTP-induced outages outweighs the convenience.

### Vendor-neutral alternatives

**MVRP (Multiple VLAN Registration Protocol).** IEEE 802.1ak. Standardised; multi-vendor. Less widely deployed.

**Manual configuration.** Each switch's VLAN database configured directly. Tedious but reliable.

**Automation.** Network configuration management tools (Ansible, Cisco NSO, Juniper Apstra) ensure VLAN consistency.

## 4.3 Inter-VLAN routing

### Inter-VLAN routing

*Inter-VLAN routing is the mechanism that enables traffic between hosts in different VLANs (different broadcast domains) by performing Layer 3 routing between them, since Layer 2 switching alone cannot cross VLAN boundaries.*

Three common implementations:

### Router on a stick

The original approach. A router connects to a switch via a trunk; the router has a sub-interface per VLAN; each sub-interface has an IP address in the corresponding subnet.

Configuration sketch:
```
interface FastEthernet0/0
  no shutdown
interface FastEthernet0/0.10
  encapsulation dot1Q 10
  ip address 10.0.10.1 255.255.255.0
interface FastEthernet0/0.20
  encapsulation dot1Q 20
  ip address 10.0.20.1 255.255.255.0
```

Pros: simple; works with any switch.

Cons: all inter-VLAN traffic passes through the single router-switch link; bottleneck risk.

### Switched Virtual Interface (SVI) on a Layer 3 switch

The modern approach. A Layer 3 switch performs both switching and routing internally. Each VLAN has an SVI — a virtual Layer 3 interface — with an IP address. The switch routes between SVIs at wire speed.

```
interface Vlan10
  ip address 10.0.10.1 255.255.255.0
  no shutdown
interface Vlan20
  ip address 10.0.20.1 255.255.255.0
  no shutdown
```

Pros: high performance; routing on the same device that does the switching.

Cons: requires Layer 3 capable switches (more expensive than Layer 2 only).

For modern enterprise design, SVIs on Layer 3 switches are standard. Layer 2 only switches are deployed at the very edge of the access layer where they connect end devices.

### Routed ports

A Layer 3 switch port configured as a routed interface (not associated with a VLAN). Used for inter-switch links, uplinks to routers, and similar Layer 3 connections.

```
interface GigabitEthernet1/0/1
  no switchport
  ip address 10.0.100.1 255.255.255.252
```

### Distribution-layer aggregation

In hierarchical design, the distribution-layer switches perform inter-VLAN routing for VLANs in their domain. Access switches are typically Layer 2; distribution switches are Layer 3.

A typical campus design:
- **Access switches** carry user VLANs as Layer 2 only.
- **Distribution switches** (a pair, with first-hop redundancy) host the SVIs and serve as default gateway for users.
- **Core switches** route between distribution blocks.

### Default gateway

For end-user devices, the default gateway is the IP address of the SVI on the distribution-layer switch (or first-hop redundancy address — Section 4.5).

When the user device sends traffic to a destination outside its subnet, it sends to the default gateway. The gateway routes to the destination.

## 4.4 Enterprise LAN security

LAN security is the practice of preventing attacks that exploit the local network's trust and infrastructure.

### Layer 2 attacks

**MAC flooding (CAM table attack).** Attacker generates many frames with random source MACs. The switch's CAM (Content Addressable Memory) table fills. Once full, the switch starts flooding traffic out all ports (fail-open behaviour). The attacker can sniff traffic that should go to specific destinations.

**Defence:** Port security limits the number of MAC addresses per port. When limit is exceeded, options include drop, log, or shut down the port.

**ARP poisoning.** Attacker sends gratuitous ARP responses claiming to be a different host (often the default gateway). Victims update their ARP caches with the attacker's MAC. Traffic intended for the impersonated host goes to the attacker — classic man-in-the-middle.

**Defence:** Dynamic ARP Inspection (DAI). The switch verifies ARP traffic against a trusted database (typically built from DHCP snooping). Invalid ARP frames are dropped.

**DHCP spoofing.** Attacker runs a rogue DHCP server giving out malicious configurations (wrong default gateway, DNS).

**Defence:** DHCP snooping. The switch identifies trusted ports (where the real DHCP server is) and untrusted ports. Only trusted ports may send DHCP server-type messages.

**VLAN hopping.** Attacker tricks switches into sending traffic across VLANs. Two variants:
- **Switch spoofing.** Attacker negotiates a trunk with the switch (if DTP is on).
- **Double tagging.** Attacker sends frames with two 802.1Q tags; the switch removes one and forwards based on the inner tag.

**Defence:** Disable DTP on user-facing ports; configure ports as access (not trunk); use a different native VLAN for trunks than for any user VLAN.

**Spanning tree attacks.** Attacker sends BPDUs claiming to be a root bridge. Disrupts spanning tree topology.

**Defence:** BPDU Guard on user-facing ports (port shuts down on receiving a BPDU). Root Guard on appropriate ports (port goes to err-disable if a superior BPDU is received).

**IPv6-specific attacks.** Rogue Router Advertisements, IPv6 neighbor-discovery spoofing.

**Defence:** RA Guard (drops RAs on untrusted ports). ND Inspection.

### 802.1X authentication

*IEEE 802.1X is the port-based network access control standard that requires devices to authenticate before being allowed to use the network, with the switch acting as authenticator passing authentication exchanges between the connecting device (supplicant) and an authentication server (typically RADIUS).*

Standard deployment:
- Switch port configured for 802.1X.
- Connecting device runs a supplicant (Windows native supplicant, Open1X on Linux, etc.).
- Authentication exchange uses EAP (Extensible Authentication Protocol).
- RADIUS server validates credentials (often integrated with Active Directory).
- On successful auth, switch admits the device, often assigning a specific VLAN.

### Dynamic VLAN assignment

After 802.1X authentication, the RADIUS server can specify which VLAN the user belongs to. Engineering users get one VLAN; finance users get another; guests get a guest VLAN. The same physical port serves whoever connects.

### MACsec

*MACsec (Media Access Control Security) is the IEEE 802.1AE standard for hop-by-hop encryption of Ethernet frames, providing confidentiality and integrity of Layer 2 traffic between adjacent network devices, complementing higher-layer encryption.*

MACsec encrypts traffic between specific pairs of devices (host-switch, switch-switch). It protects against passive eavesdropping on the link. Less widely deployed than IPSec or TLS but growing in environments with high security requirements.

### Network Access Control (NAC)

*Network Access Control is the comprehensive approach to ensuring that only authorised, compliant devices and users can access the network, combining authentication (802.1X), endpoint health checks, segmentation, and policy enforcement, often delivered by integrated platforms.*

NAC platforms:
- Cisco Identity Services Engine (ISE).
- Aruba ClearPass.
- Forescout.
- HPE/Aruba NAC.
- Microsoft Network Policy Server (NPS).

A NAC platform integrates with the authentication infrastructure, with directory services (Active Directory), with endpoint detection (EDR), and with the switching/wireless infrastructure to enforce policies based on:
- User identity.
- Device type.
- Device health (patched, AV running, EDR active).
- Location (corporate network, guest network, VPN).
- Time of day.

The user with a healthy company laptop gets full access. The same user with a personal device gets limited access. A guest gets a separate VLAN with internet only.

In Nepali banks, NAC platforms are increasingly deployed. The 2017 NIC Asia incident and subsequent regulatory pressure has driven investment in authentication and authorisation infrastructure including NAC.

### Storm control

Limits the rate of broadcast, multicast, or unknown unicast traffic on a port. Protects against broadcast storms (which can saturate a LAN and DoS users).

### Private VLANs

A more advanced segmentation within a VLAN. Primary VLAN is divided into:
- **Isolated ports.** Cannot communicate with other isolated ports.
- **Community ports.** Can communicate within their community but not other communities.
- **Promiscuous ports.** Can communicate with all.

Useful in environments where many hosts share a VLAN but should not communicate with each other (hotel networks, hosting environments).

## 4.5 Load balancing protocols — first-hop redundancy

### First-hop redundancy

End-user devices have a single default gateway address. If the gateway device fails, users lose connectivity until they switch to a different gateway. First-hop redundancy protocols solve this by presenting a virtual gateway with redundancy behind it.

### HSRP (Hot Standby Router Protocol)

*HSRP is the Cisco-proprietary first-hop redundancy protocol in which two or more routers share a virtual IP address and virtual MAC address, with one router designated as Active forwarding traffic and the others as Standby ready to take over on failure.*

HSRP operation:
- Routers exchange Hello messages on a multicast address.
- Active router is determined by priority and IP address.
- Active router responds to ARP requests for the virtual IP with the virtual MAC.
- On failure, Standby takes over after timeout.

Configuration sketch:
```
interface Vlan10
  ip address 10.0.10.2 255.255.255.0
  standby 10 ip 10.0.10.1
  standby 10 priority 110
  standby 10 preempt
```

The other router has a similar configuration with lower priority. Users use 10.0.10.1 as default gateway; it's served by whichever router is Active.

### VRRP (Virtual Router Redundancy Protocol)

*VRRP is the IETF-standardised first-hop redundancy protocol with functionality similar to HSRP but vendor-neutral, defined in RFC 5798, supported by virtually all Layer 3 switches and routers regardless of vendor.*

VRRP is HSRP's standardised cousin. Similar behaviour; some differences:
- VRRP uses 224.0.0.18 multicast (HSRP uses 224.0.0.2).
- VRRP uses different protocol numbers.
- VRRP allows using the master's actual IP (not just a separate virtual IP).

For multi-vendor environments, VRRP is preferred. For Cisco-only, HSRP works equally well.

### GLBP (Gateway Load Balancing Protocol)

*GLBP is the Cisco-proprietary first-hop redundancy protocol that, unlike HSRP and VRRP, provides load balancing in addition to redundancy, allowing multiple routers to actively forward traffic simultaneously from the same virtual gateway.*

GLBP operation:
- One router (Active Virtual Gateway, AVG) responds to ARP requests.
- Multiple routers act as Active Virtual Forwarders (AVFs), each with its own virtual MAC.
- AVG responds to different ARP requests with different AVF MACs — distributing the load.

GLBP load-balances at the MAC level. Different end hosts hash to different AVFs.

Advantages over HSRP/VRRP: better utilisation when multiple routers are available; no standby router sitting idle.

In modern enterprise design, GLBP is less common than HSRP/VRRP plus active-active uplink design at the access layer. The simplicity of HSRP/VRRP with stacked or clustered distribution switches often wins.

### Stack-based load balancing

A Layer 3 switch stack (multiple physical switches managed as one logical) presents a single forwarding plane. End hosts in either switch use the same gateway IP, which is virtual across the stack. Internal load balancing across the stack members happens automatically.

This pattern — common with Cisco Catalyst 9300 stacks, Aruba 6300/8400 fabrics, similar HPE/Aruba and Juniper offerings — replaces traditional HSRP/VRRP design with simpler operations.

### Stretched cluster / Virtual Port Channel (VPC)

In data centres, two switches can present themselves as one logical switch for purposes of LAG and forwarding. Cisco's VPC, Arista's MLAG, similar offerings allow active-active uplink and dual-attached server connections.

The end host sees one logical switch; the actual implementation involves two physical switches.

## 4.6 Link aggregation technologies and protocols

### Link aggregation

*Link aggregation is the combining of multiple physical Ethernet links into a single logical link with the aggregate bandwidth, providing increased capacity and redundancy with seamless failover, configured between adjacent devices that support the aggregation protocol.*

The term **EtherChannel** is the Cisco brand. **Port Channel** is another Cisco term. **Bond** is the Linux term. The functionality is essentially identical.

### LACP — Link Aggregation Control Protocol

*Link Aggregation Control Protocol is the IEEE 802.1AX standard protocol for dynamically establishing and maintaining link aggregation groups between adjacent devices, exchanging LACP frames to negotiate, monitor, and update the group composition.*

LACP modes:
- **Active.** Sends LACP frames actively.
- **Passive.** Responds to LACP but does not initiate.
- **At least one side** must be active for the bundle to come up.

LACP detects link failures and removes failed links from the bundle. New links can be added or removed dynamically.

### PAgP — Port Aggregation Protocol

Cisco-proprietary alternative to LACP. Functionally similar. For new deployments, LACP is preferred (vendor-neutral, standardised).

PAgP modes:
- **Desirable.** Active mode.
- **Auto.** Passive mode.

### Static aggregation

No protocol negotiation. Both ends manually configured. Simpler but no failure detection beyond physical link state. Used in some specific scenarios but generally LACP is preferred.

### Hashing algorithms

Traffic across a LAG is distributed by hashing. Common hash inputs:
- Source MAC.
- Destination MAC.
- Source MAC + destination MAC.
- Source IP.
- Destination IP.
- Source IP + destination IP.
- Source IP + destination IP + source port + destination port.

The hash determines which member link carries which flow. Same flow consistently uses the same link (preserving in-order delivery); different flows distribute across links.

The right hash depends on traffic patterns. A single large flow between two hosts will always traverse one link regardless of LAG bandwidth — the hash is consistent. Multiple flows distribute well.

### Cross-chassis link aggregation

Single-chassis LAG keeps both ends on the same physical chassis on each side. Cross-chassis LAG distributes the aggregate across multiple physical chassis at one or both ends.

**Cisco VPC** (Virtual Port Channel) on Nexus switches: two physical switches act as one for LAG purposes. End host connects to both with LAG; both switches forward as if they were one.

**Cisco StackWise / StackPower / VSS.** Multiple switches as one logical chassis.

**Arista MLAG** (Multi-chassis LAG).

**Juniper Virtual Chassis.**

**HPE/Aruba VSF** (Virtual Switching Framework) **and IRF**.

Cross-chassis LAG is standard in data centres for server connectivity — servers connect with two NICs to two different switches, getting both redundancy and bandwidth.

### Worked example

A bank's data centre core:
- Two Cisco Nexus 9300 switches in VPC mode.
- Each server connects with a 4x10G LAG using LACP — two links to switch A, two links to switch B.
- Each storage array connects with 4x25G LAG.
- Inter-switch link is 4x100G LAG.

Effective characteristics:
- Server has 40G aggregate to the network with full redundancy.
- Loss of any single switch leaves the server with 20G via the surviving switch.
- Loss of any single cable degrades but does not stop server connectivity.
- Loss of inter-switch link... requires careful design to avoid issues; modern VPC handles this gracefully.

This pattern — server multihomed to redundant switches with LAG — is the modern data centre standard.

### Software-Defined Infrastructure context

In software-defined infrastructure (covered in Chapter 6), link aggregation is automated. The orchestrator configures LAG on switches as virtual machines and containers are provisioned. The human operator does not configure individual LAGs; the system does.

Cisco ACI, VMware NSX, OpenStack Neutron, Kubernetes CNI implementations — all handle LAG provisioning programmatically.

### Failure scenarios

Link aggregation handles single-link failures cleanly:
- Failed link removed from the bundle.
- Traffic redistributed across remaining links.
- LACP signals the change to the other end.
- Same flows may stay on different links; new flows distribute over the smaller set.

Multi-link failures or full LAG failure are more impactful. LAG protects against single-link failure; broader failure requires routing-protocol convergence (Chapter 3) or first-hop redundancy (Section 4.5).

### Operational considerations

- **Link count.** Even numbers preferred (better hashing).
- **Same speed.** LACP requires links of the same speed.
- **Same duplex.** Full duplex required for modern Ethernet.
- **Same media.** All copper or all fibre (mixing causes confusion).
- **Same vendor.** Mostly required; cross-vendor LACP works in principle but is occasionally finicky.
- **Same VLANs.** Trunk configurations must match.

The next chapter shifts to the wide-area network — the technologies that extend the enterprise across geographic distance.
