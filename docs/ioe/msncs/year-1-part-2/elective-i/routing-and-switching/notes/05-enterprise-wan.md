---
title: 'Chapter 5 — Enterprise-Wide Area Networks'
sidebar_label: 'Ch 05 — Enterprise-Wide Area Networks'
sidebar_position: 5
description: 'Chapter 5 of Routing and Switching (ENCTNS561).'
slug: /ioe/msncs/year-1-part-2/elective-i/routing-and-switching/notes/ch05
tags: [msncs, ENCTNS561, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

If the LAN connects devices inside a single building or campus, the wide-area network connects sites across geographic distance — branch offices, remote workers, partner organisations, cloud regions. For a Nepali commercial bank with 200 branches across the country, the WAN is what makes branch banking possible. For a manufacturer with offices in Kathmandu and a plant in Birgunj, the WAN carries the operational traffic. For a software firm whose team works from home offices distributed across districts, the WAN is the secure-remote-access infrastructure that lets them reach internal systems. This chapter covers the enterprise WAN architecture, network address translation that connects private networks to the public internet, the VPN technologies that secure traffic over public infrastructure, the formulation of VPN policy, and the monitoring and analytics that keep the WAN visible and manageable.

## 5.1 Enterprise-Wide Area Network architecture

### Enterprise WAN

*An Enterprise Wide Area Network is the network infrastructure that connects an organisation's geographically distributed sites — branches, data centres, partner sites, cloud regions, and remote users — providing the long-distance connectivity that allows distributed operations to function as a single enterprise.*

Where the LAN is high-bandwidth, low-latency, and under the organisation's full control, the WAN is bandwidth-constrained, higher-latency, and partially or fully delivered by external service providers.

### WAN connectivity options

Several technologies provide WAN connectivity, each with distinct characteristics.

**Leased lines.** Dedicated point-to-point circuits between sites. Highest service levels; predictable performance; highest cost. NTC and other operators offer leased lines in Nepal, typically used by banks and large enterprises for connecting headquarters to major branches and to international data centres.

**MPLS (Multiprotocol Label Switching).** Service-provider technology that forwards traffic using labels rather than IP lookup. Provides flexible any-to-any connectivity with QoS guarantees. Sold as a managed service by carriers. NTC and several enterprise-focused providers in Nepal offer MPLS services. Major Nepali banks have historically used MPLS for branch connectivity.

**Internet VPN.** Connections over the public internet, secured with VPN technology (Sections 5.3-5.7). Cheaper than MPLS; less predictable performance; widely deployed.

**SD-WAN (Software-Defined WAN).**
*SD-WAN is a WAN architecture that uses software-based controllers to manage and route traffic over multiple underlying transport technologies — MPLS, internet, LTE/5G, satellite — automatically selecting the best path for each application based on policy and real-time conditions.*

SD-WAN has become the dominant new-WAN architecture through the late 2010s and 2020s. Vendors include Cisco (Viptela), Versa, VMware (VeloCloud), Silver Peak (HP Aruba), Fortinet Secure SD-WAN. Several Nepali enterprises and telecom operators have adopted SD-WAN, particularly for multi-branch deployments where the cost-flexibility benefits over pure MPLS are substantial.

**LTE / 5G cellular.** Mobile-network connectivity for remote sites and as backup for primary links. NTC and Ncell provide 4G LTE across most populated areas of Nepal; 5G rollout has been gradual.

**Satellite.** For remote locations without terrestrial connectivity. Geostationary services historically; newer LEO (Low Earth Orbit) services like Starlink offer lower latency. Relevant for remote Himalayan deployments.

**Fixed wireless (point-to-point).** Microwave or licenced wireless links between sites, common in Kathmandu for distances of a few kilometres where fibre is difficult.

**Fibre to the premises (FTTH/FTTP).** Direct fibre connectivity, increasingly available in major urban areas of Nepal through Worldlink, Vianet, Subisu, NTC, and other operators.

### WAN architectures

**Hub-and-spoke.** Central site (typically HQ or primary data centre) is the hub; branches are spokes connecting only to the hub. Simple to manage; suboptimal for branch-to-branch traffic (which must traverse the hub).

**Full mesh.** Every site connects to every other. Optimal traffic paths; expensive (n(n-1)/2 connections for n sites); operationally complex.

**Partial mesh.** Hub-and-spoke with selected direct connections between high-traffic spoke pairs. Compromise between simplicity and efficiency.

**Hierarchical.** Multi-level structure — regional hubs, with branches connecting to regional hubs, regional hubs connecting to national HQ. Common for large multi-branch networks.

**Cloud-centric.** Sites connect to cloud-based hubs (managed cloud, SaaS providers, cloud-WAN services). Increasingly common as enterprise traffic shifts to SaaS and IaaS.

For a Nepali commercial bank with 200+ branches, a typical pattern in 2026:
- HQ data centre in Kathmandu connected to DR site (Pokhara, Hetauda, or other location).
- Regional hubs in major centres (Pokhara, Biratnagar, Nepalganj).
- Branches connecting through MPLS or SD-WAN to regional hubs.
- LTE backup at all branches.
- Cloud connectivity through dedicated direct connect to AWS Mumbai or Azure regions.

### WAN performance considerations

**Bandwidth.** Capacity in bits per second. WAN bandwidth is more expensive than LAN; sized to expected load.

**Latency.** Time for a packet to traverse the link. Geographic distance, intermediate hops, queueing all contribute. Domestic Nepali WAN latency is typically 20-80 ms; Kathmandu to Mumbai roughly 50-80 ms; Kathmandu to Singapore 80-150 ms; Kathmandu to US 250+ ms.

**Jitter.** Variation in latency. Critical for voice and video. Should be kept low (under 30 ms for voice).

**Packet loss.** Lost packets in transit. Even small loss rates degrade TCP throughput substantially.

**Availability.** Uptime expressed as percentage. Five nines (99.999%) means under 5.3 minutes per year downtime — challenging on WAN links.

### WAN sizing

Estimating bandwidth needs:

$$
\text{Bandwidth} = \text{Concurrent users} \times \text{Per-user load}
$$

For a Nepali bank branch with 30 employees doing core banking, web, email, video:

- Core banking: ~100 kbps per active session, average 0.3 concurrent sessions per employee = 9 active = 900 kbps.
- Web and email: ~200 kbps per employee = 6 Mbps.
- Voice (if VoIP): 100 kbps per call, 5 concurrent calls = 500 kbps.
- Video conferencing (if used): 1 Mbps per stream, 2 concurrent = 2 Mbps.
- Headroom and overhead: 30%.

Total: roughly 13 Mbps for that branch. Real-world sizing also considers peak versus average, growth, and applications not yet identified. Typical 2026 sizing for medium branches is 20-50 Mbps; small branches 10-20 Mbps; large branches and HQ 100+ Mbps.

## 5.2 Network Address Translation (NAT)

### NAT

*Network Address Translation is a network function that modifies IP address information in packet headers as they traverse a routing device, typically used to map private internal IP addresses to a smaller set of public IP addresses (or to a single one) for internet connectivity, conserving public address space and providing a degree of isolation.*

NAT emerged in the 1990s as the IPv4 address space became visibly inadequate. Private address ranges (RFC 1918 — 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) provide enormous internal address space; NAT translates between these and the limited public addresses.

### Types of NAT

**Static NAT.** One-to-one mapping. A single internal IP address maps to a single external IP address, persistently. Used when an internal server (web, mail, application) needs to be reachable from the internet at a known external address.

Example: internal web server `10.10.10.50` is statically mapped to public IP `203.0.113.100`. Anyone connecting to `203.0.113.100:80` reaches the internal server.

**Dynamic NAT.** Many-to-many mapping from a pool. Internal addresses are mapped to public addresses from a pool as needed. When an internal address needs to communicate externally, it gets a public address from the pool until the session ends. Pool size limits concurrent sessions.

**PAT (Port Address Translation) / NAPT / NAT overload.**
*Port Address Translation extends NAT by translating both IP addresses and port numbers, allowing many internal hosts to share a single public IP address by distinguishing their sessions through unique source-port numbers.*

PAT is the form of NAT actually deployed in most enterprises. A single public IP (or a small set) supports thousands of concurrent sessions for hundreds of internal hosts, distinguished by the source port allocated to each session.

For example, internal host `10.10.10.5` connecting to `8.8.8.8:53` might appear externally as `203.0.113.1:54321`. Another internal host `10.10.10.6` connecting to the same `8.8.8.8:53` might appear as `203.0.113.1:54322`. The NAT device tracks the mapping in a connection table and reverses the translation for return traffic.

### NAT operations

**Source NAT.** Modifies the source address (and/or port) — for outbound traffic from inside to outside. The most common form.

**Destination NAT.** Modifies the destination address — for inbound traffic from outside to inside. Used for publishing internal services.

**Twice NAT.** Both source and destination modified.

### NAT and protocols

NAT works seamlessly for protocols that put their addressing information in IP headers only. It breaks for protocols that carry addressing information in the payload — FTP (active mode), SIP, H.323, and several others. Solutions:

- **Application-layer gateways (ALGs).** NAT device understands the protocol and rewrites payload addresses too.
- **Protocol redesign.** Some protocols (HTTP, modern SIP variants) avoid embedding addresses.
- **STUN, TURN, ICE.** For real-time communications, signalling techniques discover and adapt to NAT.

### NAT advantages and disadvantages

**Advantages.**
- Conserves public IP addresses.
- Hides internal topology.
- Provides a degree of isolation (unsolicited inbound connections blocked by default).
- Allows flexibility in internal addressing.

**Disadvantages.**
- Breaks end-to-end principle of IP.
- Complicates protocols (as above).
- Logging and forensics complications — mapping public-side observations to specific internal hosts requires NAT logs.
- Performance overhead (per-packet processing).

### NAT in IPv6

IPv6's address space (2^128 addresses) eliminates the conservation rationale for NAT. Pure IPv6 deployments do not use NAT. However:

- **NAT64.** Translates between IPv6 and IPv4 — for IPv6 clients to reach legacy IPv4 services.
- **NPTv6.** Network Prefix Translation v6 — translates prefixes for multi-homed networks (rare).

Nepali enterprise networks in 2026 are predominantly IPv4 with NAT at the edge; IPv6 deployment is limited.

### NAT configuration example

A typical Cisco IOS configuration for PAT:

```
interface GigabitEthernet0/0
 ip address 203.0.113.1 255.255.255.0
 ip nat outside

interface GigabitEthernet0/1
 ip address 10.10.10.1 255.255.255.0
 ip nat inside

access-list 1 permit 10.10.10.0 0.0.0.255

ip nat inside source list 1 interface GigabitEthernet0/0 overload
```

This configures the WAN interface as the NAT outside, the LAN as NAT inside, and translates all 10.10.10.0/24 traffic through the WAN interface's public IP.

## 5.3 Introduction to Virtual Private Networks

### VPN

*A Virtual Private Network is a secure communications channel established over a shared or public network — typically the internet — that uses encryption and authentication to provide privacy, integrity, and access control comparable to a dedicated private network, at substantially lower cost.*

The VPN concept emerged in the 1990s as alternatives to expensive leased lines for site-to-site connectivity. By the 2000s, VPNs were also widely used for remote-user access. Through the 2010s and 2020s, VPNs have been complemented and increasingly replaced by zero-trust network access (ZTNA) for remote access, though site-to-site VPNs remain mainstream.

### Categories of VPN

**Site-to-site VPN.** Connects two networks (e.g., HQ and branch). Routers or firewalls at each end establish the tunnel; user devices on either side see the connection as part of the routed network.

**Remote-access VPN.** Connects a single user device to a network. The user runs a VPN client; an authentication step establishes the tunnel.

**Client-to-site VPN.** Synonymous with remote-access VPN.

**Cloud VPN.** Connects an on-premises network to a cloud provider's VPC/VNet.

### VPN technologies

Several technologies implement VPNs.

**IPsec.** Network-layer protocol suite providing encryption, authentication, and integrity for IP packets. The dominant site-to-site VPN technology. Discussed in Section 5.5.

**SSL/TLS VPN.** Uses TLS (originally SSL) to tunnel application traffic. Commonly used for remote-access VPN through a web browser or thin client. Cisco AnyConnect, Pulse Secure, Fortinet SSL VPN, OpenVPN are examples.

**WireGuard.** Modern, simpler VPN protocol with strong cryptography. Gaining adoption since its 2020 mainline-kernel inclusion. Used in both site-to-site and remote-access scenarios.

**L2TP.** Layer-2 Tunneling Protocol; often combined with IPsec for security. Largely superseded by other technologies.

**PPTP.** Point-to-Point Tunneling Protocol. Older; cryptographically weak; deprecated.

**GRE.** Generic Routing Encapsulation — tunneling without encryption. Combined with IPsec for security (Section 5.6).

### VPN selection considerations

| Aspect | Site-to-site | Remote-access |
|---|---|---|
| Endpoints | Routers / firewalls | User devices |
| Authentication | Pre-shared keys, certificates | User credentials, MFA |
| Protocol | IPsec dominant | SSL/TLS, WireGuard, IPsec |
| Persistence | Always-on tunnel | On-demand session |
| Visibility | All traffic to/from sites | Per-session per-user |
| Management | Centralised network operations | Per-user provisioning |
| Use case | Branch connectivity | Telework, mobile users |

For Nepali enterprises in 2026, IPsec dominates site-to-site VPN; SSL/TLS-based and increasingly WireGuard-based solutions dominate remote-access.

## 5.4 Formulation of VPN policy

A VPN deployment without policy is operationally fragile and security-weak. Policy formulation is part of any serious VPN initiative.

### What VPN policy covers

**Eligible users and devices.** Who is authorised to use VPN. What device types are permitted (corporate-owned only, BYOD, mobile).

**Authentication requirements.** Single-factor or multi-factor. Certificate-based, password-based, biometric. Session lifetime; re-authentication frequency.

**Allowed access.** What resources are reachable through VPN. Split tunnelling versus full tunnelling.

**Network isolation.** Which network segments are exposed to VPN users. Network access control (NAC) verification.

**Acceptable use.** Permitted activities; prohibited activities (personal use, file sharing, peer-to-peer).

**Endpoint compliance.** Required device state — patched, antivirus running, disk encryption enabled, no jailbreak/root.

**Data classification.** What data may be transmitted via VPN. Different rules for different classifications.

**Logging and monitoring.** What VPN activity is logged; retention period.

**Incident response.** Procedure when VPN-related incidents occur.

**Termination.** Revocation upon employee departure; automated processes.

**Audit and review.** Periodic review of VPN configuration, users, policy adherence.

### Split versus full tunnel

*Split tunnel VPN routes only traffic destined for the corporate network through the VPN, while internet-bound traffic goes directly from the user device, optimising performance but providing weaker security oversight.*

*Full tunnel VPN routes all traffic from the user device through the corporate network, providing comprehensive security inspection at the cost of routing efficiency and bandwidth consumption.*

| Aspect | Split tunnel | Full tunnel |
|---|---|---|
| Performance | Better for internet traffic | All traffic through corporate |
| Security inspection | Limited (only corporate traffic) | Comprehensive |
| Bandwidth usage at HQ | Lower | Higher |
| Data leak prevention | Weaker | Stronger |
| Geographic restrictions | User's actual location | Corporate egress location |

Many enterprises use split tunnel for performance but with endpoint security tools (EDR, DLP) providing protection on direct internet traffic. Others mandate full tunnel for security-sensitive roles.

### VPN policy in Nepal regulated industries

For Nepali banks, NRB IT directives require formalised remote-access policy. Typical provisions:

- VPN for remote access only for authorised personnel.
- MFA mandatory for all VPN authentication.
- Endpoint compliance enforced (anti-virus, OS patch level, device encryption).
- Logging of all VPN sessions with user identity, source IP, duration, data volume.
- Sessions automatically terminated after defined idle periods.
- High-privilege access (administrative, database, infrastructure) restricted to dedicated jump hosts, not generic VPN.
- Regular review of VPN user list.

A finding in many bank audits: VPN users with broad access who no longer need it; service accounts with VPN access; lack of MFA on some legacy VPN paths.

## 5.5 Site-to-site IPSec VPN

### IPsec

*Internet Protocol Security (IPsec) is a suite of protocols that secures Internet Protocol communications by providing authentication, integrity, and confidentiality of packets at the network layer, operating in transport mode (protecting payload) or tunnel mode (protecting the entire IP packet), used widely in site-to-site VPN deployments.*

IPsec was standardised by IETF in the late 1990s; it is mature and widely interoperable. Two protocols within the suite handle the actual packet protection.

**Authentication Header (AH).** Provides integrity and authentication; does not encrypt. Rarely used alone.

**Encapsulating Security Payload (ESP).** Provides confidentiality (encryption), integrity, and authentication. The dominant choice for VPN.

Two modes:

**Transport mode.** Encrypts the IP payload; original IP header is preserved. Used for end-to-end host security.

**Tunnel mode.** Encrypts the entire original IP packet; wraps it in a new IP header. Used for site-to-site VPN.

For site-to-site VPN, ESP in tunnel mode is the standard combination.

### IKE — key management

*Internet Key Exchange is the protocol that negotiates security associations and cryptographic keys between IPsec peers, performing mutual authentication and establishing the parameters under which IPsec will operate, traditionally via IKEv1 (RFC 2409) and now predominantly via IKEv2 (RFC 7296), the modern and preferred version.*

IKE has two phases:

**Phase 1.** Establish a secure channel for IKE messages themselves. Negotiate authentication (pre-shared key or certificates), key-exchange method (Diffie-Hellman group), encryption algorithm, integrity algorithm, lifetime.

**Phase 2.** Within the Phase 1 secure channel, negotiate the IPsec security associations — what traffic is protected, by what algorithms, with what keys.

IKEv2 simplifies the negotiation, adds features (NAT traversal, EAP authentication, mobility), and is the modern default. New deployments use IKEv2 unless interoperability with legacy IKEv1-only peers is needed.

### IPsec configuration on Cisco IOS

A simplified site-to-site IPsec VPN configuration:

```
crypto ikev2 proposal SITE-PROPOSAL
 encryption aes-gcm-256
 prf sha384
 group 19

crypto ikev2 policy SITE-POLICY
 proposal SITE-PROPOSAL

crypto ikev2 keyring SITE-KEYRING
 peer BRANCH
  address 203.0.113.50
  pre-shared-key local NepalBranch2026!
  pre-shared-key remote NepalBranch2026!

crypto ikev2 profile SITE-PROFILE
 match identity remote address 203.0.113.50 255.255.255.255
 authentication remote pre-share
 authentication local pre-share
 keyring local SITE-KEYRING

crypto ipsec transform-set SITE-TS esp-aes-gcm-256
 mode tunnel

access-list 100 permit ip 10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255

crypto map SITE-MAP 10 ipsec-isakmp
 set peer 203.0.113.50
 set transform-set SITE-TS
 set ikev2-profile SITE-PROFILE
 match address 100

interface GigabitEthernet0/0
 ip address 203.0.113.10 255.255.255.0
 crypto map SITE-MAP
```

The HQ side has a similar mirror configuration. When traffic matches the ACL — packets between 10.10.10.0/24 (HQ) and 10.20.20.0/24 (Branch) — it is encrypted in IPsec and tunnelled.

### IPsec performance considerations

- **CPU.** Encryption is computationally intensive. Modern routers and firewalls have hardware acceleration; older devices struggle at high throughput.
- **MTU.** Tunnel mode adds bytes to each packet. MTU adjustments (typically reducing TCP MSS) prevent fragmentation issues.
- **Throughput.** A typical mid-range branch router supports 100-500 Mbps of IPsec throughput; high-end devices much more.
- **Latency.** IPsec adds some latency, typically 1-3 ms beyond underlying network latency.

### Limitations of pure site-to-site IPsec

While IPsec provides excellent security, its native form has limitations:

- **Static configuration.** Each peer pair must be explicitly configured. Scales poorly for many sites.
- **Crypto map per peer.** Configuration complexity grows with peer count.
- **Routing protocols don't work natively.** Multicast and routing-protocol traffic over IPsec needs additional encapsulation.
- **Backup paths.** Failover requires explicit configuration.

GRE over IPsec (Section 5.6) and DMVPN (Section 5.7) address these limitations.

## 5.6 GRE over IPSec VPN

### GRE

*Generic Routing Encapsulation is a tunneling protocol developed by Cisco and standardised in RFC 2784 that encapsulates a wide variety of network-layer protocols (IP, IPv6, multicast, routing protocols) inside virtual point-to-point connections over an IP network, without providing encryption or authentication.*

GRE alone does not provide security. Its purpose is to enable transport of arbitrary protocols (including multicast traffic and routing-protocol exchanges) over IP networks.

### Why combine GRE with IPsec

IPsec provides security but is limited in what it can carry natively. Routing protocols (OSPF, EIGRP) use multicast or broadcast that does not traverse IPsec cleanly. GRE solves this by encapsulating the routing traffic in a GRE packet, which then traverses IPsec.

The combination:
- **Outer.** IPsec ESP tunnel mode header. Provides encryption and authentication.
- **Inner.** GRE header. Provides protocol flexibility.
- **Innermost.** Original IP packet, possibly carrying routing-protocol messages.

### Benefits of GRE over IPsec

- **Routing protocols work.** OSPF, EIGRP, BGP run over the GRE tunnel; route information automatically distributes between sites.
- **Multicast.** Multicast traffic traverses the tunnel.
- **IPv6 over IPv4.** IPv6 traffic encapsulated in GRE, transported over IPv4 IPsec.
- **Failover.** Routing protocols detect tunnel failures; alternative paths picked up automatically.

### GRE over IPsec configuration

A simplified configuration:

```
interface Tunnel0
 ip address 172.16.0.1 255.255.255.252
 tunnel source 203.0.113.10
 tunnel destination 203.0.113.50
 ip ospf 1 area 0

crypto ipsec profile SITE-IPSEC
 set transform-set SITE-TS

interface Tunnel0
 tunnel protection ipsec profile SITE-IPSEC

router ospf 1
 network 10.10.10.0 0.0.0.255 area 0
 network 172.16.0.0 0.0.0.3 area 0
```

The Tunnel0 interface is a virtual GRE tunnel; IPsec protection is attached. OSPF runs over the tunnel for dynamic routing.

### Use cases

GRE over IPsec is the natural choice when:

- Multiple sites need to exchange routing information dynamically.
- Multicast traffic must traverse the VPN.
- The deployment has more than a small number of sites (where pure IPsec configuration burden grows).
- IPv6 traffic must traverse an IPv4 transport.

For Nepali enterprises with multiple branches connected by VPN, GRE over IPsec was a common pattern through the 2010s. The pattern is being progressively replaced by DMVPN (Section 5.7) and SD-WAN in newer deployments.

## 5.7 Dynamic Multipoint VPN

### DMVPN

*Dynamic Multipoint VPN (DMVPN) is a Cisco-developed VPN architecture that allows the dynamic establishment of IPsec tunnels among multiple sites in a hub-and-spoke topology, with the capability for spoke-to-spoke dynamic tunnels established on demand, addressing the scalability and operational complexity of traditional site-to-site VPN.*

DMVPN was introduced in the early 2000s and has been refined through multiple "phases" of capability. The current widely-used version is **DMVPN Phase 3**.

### Architecture components

**mGRE (Multipoint GRE).** A GRE tunnel interface that can have multiple destinations (rather than the point-to-point destination of standard GRE). Allows a single tunnel interface to connect to many peers.

**NHRP (Next Hop Resolution Protocol).**
*NHRP is a protocol that resolves the underlying public IP addresses (NBMA — Non-Broadcast Multi-Access — addresses) for tunnel destinations, allowing DMVPN sites to dynamically discover how to reach each other, supporting on-demand tunnel establishment.*

**IPsec.** Provides encryption and authentication for the GRE traffic.

**Routing protocols.** OSPF, EIGRP, or BGP distribute routes among DMVPN sites.

### Hub-and-spoke with dynamic spoke-to-spoke

The hub serves as the central registration point. Spokes:

1. Establish a permanent tunnel to the hub.
2. Register their public-IP-to-tunnel-IP mapping with the hub via NHRP.

When spoke A needs to reach spoke B:

1. Spoke A's routing table indicates the next hop is on the tunnel interface, originally pointing to the hub.
2. Spoke A sends an NHRP query to the hub asking for spoke B's public IP.
3. The hub responds with spoke B's public IP.
4. Spoke A and spoke B establish a direct tunnel between themselves (encrypted with IPsec).
5. Subsequent traffic between A and B goes directly, bypassing the hub.

After a period of inactivity, the spoke-to-spoke tunnel is torn down to free resources.

### DMVPN configuration on hub

A simplified hub configuration:

```
interface Tunnel0
 ip address 172.16.0.1 255.255.255.0
 no ip redirects
 ip mtu 1400
 ip nhrp authentication NEPALSHARED
 ip nhrp map multicast dynamic
 ip nhrp network-id 1
 tunnel source GigabitEthernet0/0
 tunnel mode gre multipoint
 tunnel key 100
 tunnel protection ipsec profile DMVPN-IPSEC

router eigrp 100
 network 10.10.10.0 0.0.0.255
 network 172.16.0.0 0.0.0.255
```

A spoke configuration:

```
interface Tunnel0
 ip address 172.16.0.10 255.255.255.0
 no ip redirects
 ip mtu 1400
 ip nhrp authentication NEPALSHARED
 ip nhrp map 172.16.0.1 203.0.113.10
 ip nhrp map multicast 203.0.113.10
 ip nhrp network-id 1
 ip nhrp nhs 172.16.0.1
 ip nhrp shortcut
 tunnel source GigabitEthernet0/0
 tunnel mode gre multipoint
 tunnel key 100
 tunnel protection ipsec profile DMVPN-IPSEC

router eigrp 100
 network 10.20.20.0 0.0.0.255
 network 172.16.0.0 0.0.0.255
```

The spoke registers with the hub at 172.16.0.1 (tunnel) / 203.0.113.10 (public). EIGRP exchanges routes over the tunnel.

### DMVPN advantages

- **Scalability.** New spokes are added with minimal hub configuration changes.
- **Direct spoke-to-spoke.** When traffic patterns warrant, direct tunnels bypass the hub.
- **Routing protocol support.** Routing protocols run over the mGRE tunnels.
- **Multicast support.** Through GRE.
- **Cost-effective.** Uses the internet as transport.

### DMVPN limitations and modern alternatives

- **Cisco-centric.** While GRE and NHRP are standards, DMVPN's specific behaviour is most fully realised on Cisco platforms.
- **Configuration complexity.** Hub and spokes have intricate configurations.
- **Operational expertise required.** Troubleshooting DMVPN requires deep network knowledge.

**SD-WAN** has largely replaced DMVPN in new deployments. SD-WAN provides similar dynamic-tunnel capability with centralised policy management, broader vendor support, better visibility, and lighter operational burden. Several Nepali enterprises that ran DMVPN through the 2010s have migrated to Cisco SD-WAN (Viptela), Versa, or Fortinet SD-WAN through 2022-2026.

For a Nepali commercial bank with branches across all seven provinces, the typical 2026 pattern: SD-WAN as primary; legacy DMVPN preserved at sites being progressively migrated; pure IPsec site-to-site for specific use cases (point-to-point to an external partner).

## 5.8 Real-time network monitoring and analytics

A WAN that cannot be monitored cannot be managed. Real-time monitoring is fundamental to enterprise network operations.

### Monitoring categories

**Reachability.** Are devices and links up? Ping, SNMP polling, link-state monitoring.

**Performance.** Bandwidth utilisation, latency, jitter, packet loss. SNMP counters, NetFlow/sFlow/IPFIX, active probes.

**Capacity.** Trends in utilisation; forecasting saturation. Long-term data collection and trend analysis.

**Errors.** Interface errors, CRC errors, retransmissions. SNMP error counters.

**Security.** Unusual traffic patterns, suspicious flows, anomalies. SIEM and NDR (Network Detection and Response) tools.

**Configuration.** Drift from expected configuration. Configuration-management tools.

**Topology.** Current network topology and changes. LLDP, CDP, mapping tools.

### Monitoring protocols and technologies

**SNMP (Simple Network Management Protocol).**
*SNMP is the long-established protocol for monitoring and managing network devices, allowing a management station to read counters, get device status, and set configurations through structured data exposed via Management Information Bases (MIBs).*

SNMPv2c (community-string-based) and SNMPv3 (authenticated, optionally encrypted) are the practical versions. Polling-based — the manager queries devices on a schedule.

**Streaming telemetry.** Modern alternative to SNMP polling. Devices push real-time data continuously to subscribers; data is structured (YANG models, often via gNMI or NETCONF). Lower latency, higher resolution, more data than SNMP can practically deliver.

**NetFlow / sFlow / IPFIX.** Flow-record protocols that summarise traffic — source, destination, ports, protocol, bytes, packets per flow. Sampled flows scale to high-bandwidth links. Used for traffic analysis, capacity planning, and security.

**Syslog.** Standard logging protocol from network devices to a central log server. Used for events, errors, configuration changes, security alerts.

**Active probes.** Synthetic traffic generated to measure performance. ICMP ping, IP SLA on Cisco devices, third-party probes. Used to measure latency, jitter, loss between specific endpoints.

**Application Performance Monitoring (APM).** Application-layer monitoring complementing network monitoring. Tools include Dynatrace, AppDynamics, New Relic, Datadog APM.

### Monitoring platforms

**Open-source.**
- **Nagios, Icinga.** Classic host and service monitoring.
- **Zabbix.** Comprehensive monitoring; well-established.
- **Prometheus.** Modern metric-collection focused; with Grafana for visualisation.
- **LibreNMS.** Auto-discovery network monitoring.
- **Cacti.** Traditional graphing tool.
- **ntopng.** NetFlow analysis with rich visualisation.

**Commercial.**
- **SolarWinds Network Performance Monitor.** Long-established.
- **PRTG.** Wide-ranging monitoring.
- **Cisco DNA Center.** For Cisco-centric environments.
- **Juniper Mist.** Wireless-focused with AI-driven analytics.
- **ThousandEyes.** End-to-end monitoring across enterprise and internet.
- **Kentik.** Network analytics platform.

For Nepali enterprises, the typical pattern: a combination of vendor tools (Cisco Prime, Cisco DNA Center) for managed infrastructure, plus open-source (Zabbix, Prometheus+Grafana, LibreNMS) for broader monitoring. Larger banks and telecoms layer commercial platforms (SolarWinds, Kentik) on top.

### Real-time analytics

Modern monitoring goes beyond reporting current state to:

- **Anomaly detection.** Statistical or ML-based detection of unusual patterns. A sudden traffic surge to an unfamiliar destination, an unusual protocol mix, performance degradation outside normal patterns.
- **Predictive analytics.** Forecasting future state. Bandwidth will saturate in 8 weeks at current growth; specific interfaces will experience errors based on degradation trends.
- **Root cause analysis.** Correlation across data sources to identify the underlying cause of an observed problem.
- **Automated remediation.** Triggering predefined actions in response to detected conditions.

The convergence of monitoring and AI/ML is reshaping the operations function — sometimes branded as AIOps (Artificial Intelligence for IT Operations).

### NetFlow analysis example

A NetFlow analysis on a Nepali ISP backbone observes:

- Sudden spike in inbound traffic to a customer's IP.
- Source IPs distributed globally across thousands of addresses.
- Destination single IP, single port.
- Protocol UDP with malformed payload.
- Pattern matches known DDoS amplification signatures.

The analysis triggers automated DDoS mitigation — traffic to the affected IP is scrubbed at the upstream provider before reaching the customer. The customer experiences minor degradation rather than full outage. Without flow monitoring and analytics, the DDoS would have completed before detection.

The 2024 GIDC DDoS that took 400+ government services offline illustrated what happens when monitoring and mitigation are inadequately deployed — the attack ran for an extended period before effective response.

### Monitoring as operational discipline

For an MSc student aspiring to network operations or architecture careers, monitoring discipline is foundational:

1. **Instrument everything.** Every device exposes telemetry.
2. **Centralise collection.** Single management plane to query.
3. **Visualise.** Dashboards for both operations and management.
4. **Alert on meaningful conditions.** Not every event; the actionable subset.
5. **Investigate alerts.** Every alert resolved with documentation.
6. **Tune.** Reduce false positives; identify gaps from missed problems.
7. **Document.** Topology, configurations, expected baselines.
8. **Plan capacity.** Use historical data to project growth.
9. **Test failure scenarios.** Verify monitoring catches induced failures.
10. **Iterate.** Monitoring evolves with the network.

The discipline applies whether the engineer is working on a small enterprise network or on a national-scale ISP backbone.

The next chapter addresses the emerging trends — SDN, NFV, edge computing, blockchain, quantum — that are shaping where routing and switching are headed.
