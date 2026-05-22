---
title: 'Chapter 2 — Design, Implement and Manage VPNs'
sidebar_label: 'Ch 02 — Design, Implement and Manage VPNs'
sidebar_position: 2
description: 'Chapter 2 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch02
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The VPN technologies covered briefly in the Routing and Switching subject are revisited here from the operational and management perspective — the focus of this subject. A VPN deployed but unmanaged drifts into insecurity within months: stale users, outdated cryptography, exception-piled-on-exception rule sets, untested failover. This chapter walks through VPN concepts and technologies, the distinction between tunnel and transparent modes, the design and operation of site-to-site and remote-access VPNs, the technology choices among IPsec, SSL, and MPLS VPNs, GRE tunnelling, and the operational concepts of interesting-traffic definition and split tunnelling.

## 2.1 VPN concepts and technologies

### VPN

*A Virtual Private Network is a method of establishing secure, authenticated communications across a shared or public network — most commonly the public internet — that creates the operational experience of a private network connection between distant endpoints, using encryption to provide confidentiality and cryptographic mechanisms to provide integrity and authentication.*

The VPN concept emerged as a cost alternative to dedicated leased lines. Through the 2000s, VPN deployment became universal — every enterprise of any size has VPNs for branch connectivity, partner access, or remote-user access. Through the 2020s, the rise of cloud-delivered alternatives (Zero Trust Network Access, SASE) has complemented but not replaced VPN.

### Why VPNs are deployed

The operational use cases:

**Branch-to-headquarters connectivity.** A bank's branches connect to the HQ data centre over the public internet, with VPN providing the security that the open internet lacks. Far cheaper than leased lines or MPLS for small branches.

**Remote-user access.** Employees connect from home, hotels, customer sites. The VPN tunnels their traffic to the corporate network as if they were on-premises.

**Partner connectivity.** Two organisations exchange data over a VPN — supplier-to-customer, bank-to-clearing-house, government-to-citizen-portal-provider.

**Cloud connectivity.** Enterprise networks connect to cloud providers' VPCs/VNets over IPsec VPN (when direct dedicated connectivity is not available or not warranted).

**Site-to-data-centre.** Distributed sites connecting back to centralised data centres.

**Multi-region cloud.** Cloud workloads in different regions connected via VPN for replication and resilience.

### Categories of VPN

The major categories:

**Site-to-site VPN.** Connects two networks. Routers or firewalls at each end establish the tunnel; user devices on either side don't need any VPN-specific software.

**Remote-access VPN.** Connects an individual device to a network. The user runs a VPN client; authentication establishes the tunnel.

**SSL VPN.** Specific form of remote-access VPN using TLS as the underlying protocol; often browser-accessible.

**Client-less SSL VPN.** Web-portal-based access without a dedicated client; limited capability.

**Cloud VPN.** Connects on-premises networks to cloud provider networks.

**SASE (Secure Access Service Edge).** Cloud-delivered security and networking; subsumes VPN functions for remote access.

### Cryptographic basis

Whatever the form, a VPN uses cryptographic mechanisms (covered in detail in the Cryptography subject) to provide:

- **Authentication.** Pre-shared keys, certificates, EAP-based methods.
- **Key exchange.** Diffie-Hellman variants establish session keys.
- **Bulk encryption.** AES-GCM, ChaCha20-Poly1305 most common.
- **Integrity.** Built into AEAD ciphers or via separate MAC.
- **Replay protection.** Sequence numbers, anti-replay windows.

The cryptographic suites are negotiated; defenders configure their preferred suites and reject weak ones. Old VPN deployments accumulating weak cryptography (single DES, MD5, DH group 1) are a common audit finding.

### VPN management lifecycle

The operational lifecycle:

1. **Design.** Topology, technology, capacity, authentication, policy.
2. **Procurement.** Hardware, software, licences, certificates.
3. **Implementation.** Configuration, testing.
4. **Operation.** Ongoing administration, monitoring, support.
5. **Maintenance.** Patches, firmware updates, configuration changes.
6. **Audit and review.** Periodic verification against policy.
7. **Decommissioning.** When the VPN is replaced or no longer needed.

Each stage has its own management discipline.

## 2.2 Tunnel mode and transparent mode

### Tunnel mode

*Tunnel mode (in IPsec context) is the operational mode in which the entire original IP packet — header and payload — is encrypted and authenticated, then encapsulated in a new IP packet with the VPN endpoints as source and destination, hiding the internal addressing from intermediate networks and allowing private addresses to traverse the public internet.*

The structure of a tunnel-mode ESP packet:

```
[ New IP Header (public addrs) | ESP Header | Encrypted [ Original IP | Payload ] | ESP Trailer | ESP Auth ]
```

Tunnel mode is the standard choice for:
- Site-to-site VPN.
- Remote-access VPN (with the user device as one endpoint).
- Connecting networks with private addresses through the internet.

### Transport mode

*Transport mode is the IPsec mode in which the IP header of the original packet is preserved while the payload (typically the transport-layer header and data) is encrypted and authenticated, used for host-to-host secure communication where the original IP addresses are themselves public and routable.*

The structure of a transport-mode ESP packet:

```
[ Original IP Header | ESP Header | Encrypted [ TCP/UDP Header | Payload ] | ESP Trailer | ESP Auth ]
```

Transport mode use cases:
- Host-to-host VPN where both hosts have public IPs.
- Layer-2 over IPsec (rarer).
- L2TP-over-IPsec (where L2TP provides the encapsulation and IPsec provides security in transport mode).

For most enterprise deployments, tunnel mode is the operational choice. Transport mode is occasionally used for specific scenarios.

### Note on "transparent mode" terminology

The syllabus uses "transparent mode" which in different contexts means different things. In IPsec the precise term is "transport mode" (as above). In firewall context, "transparent mode" refers to a Layer-2 firewall that passes traffic without changing IP addresses. The term sometimes appears in VPN documentation loosely. For exam purposes, the IPsec distinction is tunnel vs transport.

### Comparison

| Aspect | Tunnel mode | Transport mode |
|---|---|---|
| Header preserved | New header added | Original header kept |
| Payload encrypted | Entire IP packet | Transport-layer and above |
| Endpoint type | Gateway-to-gateway typical | Host-to-host typical |
| NAT compatibility | Better (with NAT-T) | Requires NAT-T |
| Overhead | Higher (new IP header) | Lower |
| Use cases | Site-to-site, remote access | Host-to-host secure |

## 2.3 Site-to-site (IPsec) and remote-access VPNs

### Site-to-site VPN

The pattern: two routers or firewalls, each at the edge of a network, establish an always-on encrypted tunnel between them. Users and devices on each side route traffic to each other as if the sites were directly connected.

**Components:**

- **VPN endpoints.** Routers or firewalls (Cisco ASA, Fortinet FortiGate, Palo Alto, pfSense, OPNsense, Cisco IOS routers).
- **Public IP at each end.** Static IPs preferred; dynamic IPs possible with DDNS or specific configurations.
- **Pre-shared key or certificates.** For authentication.
- **Cryptographic policies.** Matched at both ends.
- **Interesting traffic definition.** What gets sent through the tunnel.
- **Routing.** Static routes or dynamic routing protocols indicating which traffic goes via the tunnel.

**Operation:**

1. The two endpoints initiate IKE Phase 1 to establish a secure control channel.
2. IKE Phase 2 negotiates the IPsec security associations.
3. Traffic matching the interesting-traffic definition is encrypted and tunnelled.
4. The tunnel is maintained; keys are periodically refreshed.

### Site-to-site VPN topology choices

**Hub-and-spoke.** Central site as hub; branches as spokes. Each branch has one tunnel to the hub. Simple to manage. Spoke-to-spoke traffic goes through the hub.

**Full mesh.** Every site has a tunnel to every other. Operationally complex; scales poorly. Reserved for small numbers of sites.

**Partial mesh.** Hub-and-spoke with selected direct tunnels between high-traffic pairs.

**DMVPN.** Hub-and-spoke with dynamic on-demand spoke-to-spoke tunnels (covered in the Routing and Switching subject Chapter 5).

For a Nepali bank with branches across all seven provinces, the typical pattern in 2026 is hub-and-spoke or DMVPN through SD-WAN platforms that automate the dynamic-tunnel capability.

### Remote-access VPN

Connects an individual user device to the network. The user runs a VPN client; an authentication step establishes the tunnel.

**Components:**

- **VPN concentrator.** Server-side endpoint. Cisco ASA / FTD, FortiGate, Palo Alto GlobalProtect Gateway, pfSense, OpenVPN Access Server.
- **VPN client.** Software on the user device. Cisco AnyConnect / Secure Client, FortiClient, GlobalProtect, OpenVPN, WireGuard.
- **Authentication infrastructure.** AAA backend — RADIUS, Active Directory, identity provider (Okta, Azure AD).
- **MFA.** Push notification, OTP token, certificate-based, FIDO2.

**Operation:**

1. User launches the VPN client.
2. Client connects to the concentrator.
3. Authentication exchange (typically certificate-based or password-plus-MFA).
4. Tunnel established.
5. Client receives an internal IP address from a configured pool.
6. Traffic from the client is tunnelled to the concentrator.
7. The concentrator decrypts and forwards to internal destinations.

### Remote-access VPN management

Operational concerns:

**User lifecycle.** Provisioning, role changes, departures. Integration with HR and identity systems.

**Client deployment.** Push to managed devices; instructions for BYOD if permitted.

**Session management.** Active session monitoring; forced termination capability; idle-timeout enforcement.

**Performance.** Sufficient bandwidth at concentrator; geographic distribution for low-latency access.

**Endpoint compliance.** Verification that connecting devices meet policy (patched, antivirus, encryption).

**Logging.** Comprehensive session logs for audit and forensics.

### Site-to-site versus remote-access — key contrasts

| Aspect | Site-to-site | Remote-access |
|---|---|---|
| Endpoints | Network devices | User devices |
| Persistence | Always-on | Session-based |
| User involvement | None | User initiates |
| Authentication | Pre-shared key, cert | User credentials + MFA |
| Number of tunnels | Few (per site) | Many (per user) |
| Bandwidth per tunnel | High (aggregate site traffic) | Low (single user) |
| Management focus | Configuration, routing | User lifecycle, identity |
| Common protocols | IPsec | SSL/TLS, IPsec, WireGuard |

## 2.4 IPsec, SSL, and MPLS VPNs

### IPsec VPN

Discussed in detail in the Routing and Switching subject Chapter 5. From the management perspective:

**Strengths:**
- Standards-based, multi-vendor interoperable.
- Strong cryptography.
- Mature, well-understood operationally.
- Suitable for both site-to-site and remote-access.
- Works at network layer; transparent to applications.

**Operational complexity:**
- Multi-step configuration.
- NAT traversal sometimes problematic.
- Troubleshooting requires understanding both IKE and IPsec.
- Per-peer configuration scales poorly without DMVPN/SD-WAN.

### SSL VPN

*An SSL VPN (more accurately TLS VPN, since SSL is obsolete) is a VPN technology that uses TLS to establish secure connections between clients and servers, typically used for remote-access scenarios, offering simpler client deployment, easier traversal of restrictive networks, and finer-grained per-application access control compared to traditional IPsec VPN.*

Two operational sub-types:

**Full-tunnel SSL VPN.** A dedicated client establishes a TLS tunnel; all traffic from the client routed through the tunnel. Cisco AnyConnect / Secure Client, FortiClient SSL VPN, OpenVPN, Pulse Connect Secure.

**Clientless SSL VPN.** Browser-based access. The user logs into a web portal; the portal proxies access to internal applications. Limited to web-accessible apps and a few others; not full network connectivity.

**Advantages over IPsec for remote-access:**
- Works through restrictive networks (TCP/443 is rarely blocked).
- Familiar TLS infrastructure.
- Simpler client deployment.
- Per-application access control easier.
- No NAT-traversal complications.

**Disadvantages:**
- TCP-over-TCP can cause performance issues (the inner TCP retransmits when the outer TCP is congested).
- Newer protocols (DTLS over UDP) address this.

For Nepali enterprises, SSL VPN is the dominant remote-access form. Cisco AnyConnect / Secure Client, FortiClient, Palo Alto GlobalProtect are common.

### MPLS VPN

*An MPLS VPN is a VPN service provided by a telecommunications carrier using Multiprotocol Label Switching, where the carrier's network logically isolates customer traffic from other customers' traffic using labels and Virtual Routing and Forwarding tables, providing private connectivity between customer sites without crossing the public internet.*

MPLS VPN is delivered as a managed service:

**Customer-edge router (CE).** At each customer site. Speaks IP to the provider.

**Provider-edge router (PE).** At the provider's network edge. Speaks IP to CE; speaks MPLS internally.

**Provider router (P).** In the provider core. Speaks MPLS only.

**VRF (Virtual Routing and Forwarding).** Each customer has their own routing instance on shared PE routers.

The customer's traffic never travels the public internet; it traverses the provider's MPLS network with traffic isolated by labels and VRFs.

**Advantages:**
- Performance and QoS guarantees from the provider.
- Any-to-any connectivity managed by provider.
- No customer-side encryption needed (though many add it for defence-in-depth).
- Suitable for performance-sensitive applications.

**Disadvantages:**
- More expensive than internet-based VPN.
- Provider lock-in.
- Limited geographic coverage from individual providers.
- Long provisioning times.

For Nepali enterprises, MPLS VPN is offered by NTC and several other carriers. Used by banks and large enterprises for branch connectivity; increasingly being replaced or supplemented by SD-WAN over internet links.

### Comparison

| Aspect | IPsec VPN | SSL VPN | MPLS VPN |
|---|---|---|---|
| Layer | Network (3) | Session (5/6) | Routing |
| Use case | Site-to-site, remote | Mostly remote | Site-to-site |
| Encryption | Yes (always) | Yes (always) | No (provider isolation) |
| Underlying network | Internet | Internet | Provider MPLS network |
| Cost | Low (internet) | Low (internet) | High (managed service) |
| Performance | Internet-variable | Internet-variable | Provider-guaranteed |
| Setup time | Hours-days | Hours | Weeks-months |
| Operational complexity | High | Medium | Low (provider managed) |
| Vendor lock-in | Low (standards) | Low-medium | High (provider) |

### Hybrid deployments

Modern enterprises rarely choose one. A typical Nepali commercial bank in 2026 has:
- MPLS VPN for primary branch connectivity (where leased).
- Internet-based IPsec backup for branches.
- SSL VPN (FortiClient, AnyConnect) for remote users.
- IPsec VPN to cloud providers (AWS, Azure direct or via VGW).
- Site-to-site IPsec to partner organisations (clearing houses, payment processors).

Each technology serves a specific need.

## 2.5 Tunnelling with Generic Routing Encapsulation (GRE)

### GRE

Discussed in the Routing and Switching subject. From the management perspective:

**Why GRE matters operationally:**
- Carries arbitrary network-layer protocols (IPv4, IPv6, multicast, routing protocols).
- Enables dynamic routing protocols over VPN tunnels.
- Provides flexibility that pure IPsec lacks.

**Without security:**

GRE alone does not encrypt. A pure GRE tunnel can be sniffed by anyone in the path. Operational use of GRE without IPsec is rare in security-conscious environments.

### GRE over IPsec

The pattern: encapsulate the original traffic in GRE; encrypt the GRE-encapsulated traffic with IPsec. Provides both protocol flexibility and security.

**Operational configuration:**

```
interface Tunnel0
 ip address 172.16.0.1 255.255.255.252
 tunnel source 203.0.113.10
 tunnel destination 203.0.113.50
 tunnel protection ipsec profile SITE-IPSEC

router ospf 1
 network 172.16.0.0 0.0.0.3 area 0
```

OSPF runs over the tunnel; routing information distributes automatically.

### Operational benefits and considerations

**Benefits:**
- Routing protocols work across the VPN.
- Multicast traverses the tunnel.
- Failover is automatic via routing protocols.

**Considerations:**
- MTU. Tunnel overhead. TCP MSS adjustment typically configured.
- Performance. Two layers of encapsulation; CPU intensive.
- Troubleshooting. Two layers to debug.

For Nepali enterprises that historically used GRE-over-IPsec for multi-site connectivity, the pattern has been progressively replaced by DMVPN and now by SD-WAN. Pure GRE-over-IPsec remains in use for specific scenarios — connecting to partner networks where DMVPN is not appropriate; tunnelling specific protocols (IPv6 over IPv4); legacy deployments not yet migrated.

## 2.6 Interesting traffic and split tunnelling

### Interesting traffic

*Interesting traffic is the set of packets that match the criteria defined for triggering or being directed through a VPN tunnel — typically expressed as access-list rules matching source and destination networks, protocols, and ports — controlling what gets encrypted and what does not.*

In a typical site-to-site IPsec configuration:

```
access-list 100 permit ip 10.10.10.0 0.0.0.255 10.20.20.0 0.0.0.255

crypto map SITE-MAP 10 ipsec-isakmp
 set peer 203.0.113.50
 set transform-set SITE-TS
 match address 100
```

This access list defines "traffic from 10.10.10.0/24 to 10.20.20.0/24 is interesting." Such traffic triggers tunnel establishment (if not already up) and is encrypted. Other traffic (to the internet, to other internal networks) is forwarded normally.

### Operational management of interesting traffic

The definition affects:

**Performance.** Too much in the tunnel adds overhead; too little leaves traffic unencrypted.

**Scope.** What traffic the tunnel actually protects.

**Routing.** Traffic outside interesting-traffic does not use the tunnel; standard routing applies.

**Updates.** Changes to network layout require updates to interesting-traffic definitions.

### Common pitfalls

**Overlapping definitions.** Two tunnels with overlapping interesting-traffic can produce conflicting routing. The first-match nature of crypto maps can yield surprising results.

**Asymmetric definitions.** The two ends of a tunnel define interesting-traffic from their perspectives; mirror image required (source/destination swapped). Asymmetric definitions cause subtle failures.

**Missing return traffic.** Defining one direction without the return; only outbound encrypted.

**NAT interaction.** NAT changes the addresses; interesting-traffic must reflect post-NAT addresses where NAT applies.

### Split tunnelling

*Split tunnelling is a VPN configuration that directs only specified traffic through the VPN tunnel while allowing other traffic to use the local network directly, contrasted with full tunnelling where all traffic from the client traverses the VPN, with implications for performance, security inspection, and bandwidth usage.*

Two perspectives:

**Site-to-site split tunnel.** Branch traffic to HQ goes through the tunnel; branch traffic to the internet goes directly to the local ISP. Cost-effective; reduces traffic at HQ.

**Remote-access split tunnel.** User traffic to corporate resources goes through the tunnel; user traffic to the internet (and to local home network) goes directly.

### Split versus full tunnel — operational considerations

| Aspect | Split tunnel | Full tunnel |
|---|---|---|
| Performance for internet | Optimal (local) | Slower (corporate detour) |
| Bandwidth at concentrator | Lower | Higher |
| Security inspection | Limited to corporate traffic | Comprehensive |
| Data leak prevention | Weaker | Stronger |
| Compatibility with local resources | Yes (printers, etc.) | Often broken |
| Geographic restrictions | User's location | Corporate egress |
| Compliance for some sectors | May not meet requirements | Easier to comply |

For Nepali banks, NRB directives have moved toward full-tunnel preference for remote-access — the security inspection benefit outweighs the performance cost. Endpoint-security tools (EDR, DLP) on the device complement.

### Split-DNS

*Split-DNS is a configuration in which DNS resolution is split based on the destination — internal domains resolved through corporate DNS via the tunnel, external domains resolved through the local DNS — used in conjunction with split-tunnel VPN to maintain internal name resolution while preserving local internet access.*

Implementation: the VPN client receives DNS configuration during tunnel establishment; specific suffixes (e.g., `*.bank.com.np`) are queried through corporate DNS, others through local DNS.

Operational concerns:
- Misconfiguration leaks internal queries to the public DNS.
- Some applications cache DNS in ways that bypass the split.
- DNS over HTTPS in modern browsers may bypass the configured DNS.

### Modern alternatives

The complexity of managing interesting-traffic and split-tunnel for many users has driven the move to:

**ZTNA (Zero Trust Network Access).** Application-specific access rather than network-level VPN. Cloudflare Access, Zscaler Private Access, Palo Alto Prisma Access, Cisco Secure Access. The user device connects to a cloud broker; the broker authenticates and authorises per-application access. No traditional VPN tunnel.

**SASE (Secure Access Service Edge).** Cloud-delivered combination of network and security functions. Subsumes VPN, SWG, CASB, ZTNA, FWaaS into a unified cloud service.

For Nepali enterprises, traditional VPN remains dominant in 2026 but ZTNA and SASE are growing. Major banks have begun ZTNA evaluations and pilots; broad replacement of legacy VPN is multi-year work.

### Management checklist for VPN operations

A practical operational checklist:

- [ ] VPN policy documented and approved.
- [ ] User access list periodically reviewed.
- [ ] MFA enforced on all remote-access VPN.
- [ ] Cryptographic configuration reviewed (no weak ciphers).
- [ ] Certificates and pre-shared keys managed; rotated periodically.
- [ ] Logging enabled and centralised.
- [ ] Session monitoring active.
- [ ] Endpoint compliance enforced.
- [ ] Concentrator capacity matches user load.
- [ ] Failover tested.
- [ ] Patches applied to VPN devices and clients.
- [ ] User onboarding and offboarding integrated with HR.
- [ ] Split-tunnel policy reviewed against security and performance trade-offs.
- [ ] Documentation current.
- [ ] Periodic audit conducted.

Each item neglected is a potential weakness exploitable later.

The next chapter shifts to the other foundational network-security technology: firewalls and the perimeter-security architecture they create.
