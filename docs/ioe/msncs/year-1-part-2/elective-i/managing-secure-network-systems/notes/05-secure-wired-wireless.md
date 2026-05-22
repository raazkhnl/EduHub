---
title: 'Chapter 5 — Secured Wired and Wireless Network Systems and Architecture'
sidebar_label: 'Ch 05 — Secured Wired and Wireless Network Systems and Architecture'
sidebar_position: 5
description: 'Chapter 5 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch05
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The previous chapters covered specific security technologies — protocols, VPNs, firewalls, IDS/IPS. This chapter steps back to the architectural level: how networks are designed to be secure from the start, how wired and wireless infrastructure is hardened, what topologies support security objectives, what wireless-specific protocols exist, and how the modern Zero Trust direction reshapes the entire approach. The audit, operations, and forensic perspectives covered elsewhere in this programme all assume an underlying architecture; this chapter is where the architecture is examined directly.

## 5.1 Principles of secure network design

### Secure network design

*Secure network design is the discipline of structuring network infrastructure — its topology, its segmentation, its protocols, its controls — so that the resulting system supports the organisation's security objectives by default, with security considerations woven into every layer rather than added afterward as patches and overlays.*

The principle: build security in, not bolt it on. A network designed with security from the start is fundamentally more defensible than the same network with security added later.

### Foundational principles

**Defence in depth.** Multiple overlapping layers of protection. No single layer relied upon for all defence.

**Least privilege.** Every entity (user, device, service, network segment) granted the minimum access needed for its function.

**Segregation of duties.** Critical functions split among multiple parties such that no single individual can compromise the whole.

**Failure-safe defaults.** When something fails, fail to a secure state rather than an open one.

**Complete mediation.** Every access goes through the access-control mechanisms; no bypass paths.

**Open design.** Security does not depend on the design being secret. Saltzer and Schroeder's classic principle (1975).

**Separation of privilege.** Operations requiring multiple keys / approvals.

**Least common mechanism.** Minimise mechanisms shared by multiple subjects, as those become attack vectors.

**Psychological acceptability.** Security must be usable; controls that get bypassed do not protect.

**Work factor.** Make attacks expensive in time and resources.

**Compromise recording.** Detect compromise even where prevention fails.

These principles, articulated decades ago, remain the foundation. Modern frameworks (Zero Trust, secure-by-design movements) build on them.

### Threat modelling

Before designing controls, understand the threats. Threat modelling is a discipline within secure design:

**STRIDE.** Microsoft's framework — Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.

**PASTA.** Process for Attack Simulation and Threat Analysis.

**DREAD.** Damage, Reproducibility, Exploitability, Affected users, Discoverability (largely retired but historically referenced).

**Attack trees.** Hierarchical decomposition of how attacks could occur.

**MITRE ATT&CK.** Discussed in Chapter 1; informs threat understanding for design.

A network design informed by structured threat modelling addresses risks systematically rather than reactively.

### Layered design

Modern networks have many layers; each is a place where security can be enforced or undermined:

- **Physical.** Cables, ports, devices, facilities.
- **Data link.** Switches, VLANs, MAC addresses, 802.1X.
- **Network.** IP addressing, routing, NAT, firewalls, ACLs.
- **Transport.** TCP/UDP, TLS.
- **Application.** Specific application security, WAFs.
- **Identity.** Who is interacting; AAA infrastructure.
- **Data.** Encryption at rest, classification, DLP.

Controls at each layer; coordination across layers.

### Visibility and observability

*Network observability is the property of a network whose state and behaviour can be examined in detail through telemetry, logs, packet captures, flow data, and metrics, enabling operators to understand what is happening at any time and to investigate problems retrospectively.*

A network that cannot be observed cannot be defended. Observability requirements:
- Comprehensive logging from all devices.
- Centralised log aggregation (Section 5.5 — SIEM).
- Flow data (NetFlow, IPFIX).
- Packet capture capability for incident response.
- Performance metrics.
- Authentication and access events.

The investment in observability is foundational to all other security operations.

## 5.2 DMZ, VLANs, and network segmentation

### DMZ

Discussed in Chapter 3. The Demilitarised Zone is a network segment containing systems exposed to less-trusted networks (typically the internet) but separated from internal trusted networks.

**DMZ design considerations:**

- DMZ servers should not initiate connections to internal networks except for specific, controlled purposes (the application-tier connection to a database, for example).
- DMZ servers have minimal trust from the firewall's perspective — they are treated almost as if external.
- Compromise of a DMZ system should not yield direct access to internal systems.
- DMZ systems are typically hardened beyond normal hardening standards.

### VLANs

*A Virtual LAN is a logical grouping of network ports or devices that behave as a single broadcast domain regardless of physical location, allowing a single physical switch infrastructure to support multiple separated networks, with traffic between VLANs requiring routing through a Layer-3 device.*

VLANs covered extensively in the Routing and Switching subject Chapter 4. From the security architecture perspective:

**Why VLANs matter for security:**

- **Segregation.** Different categories of devices in separate broadcast domains.
- **Containment.** A compromise in one VLAN does not immediately propagate to others.
- **Policy enforcement.** Inter-VLAN traffic must traverse a router/firewall where policy is applied.
- **Operational separation.** User traffic, server traffic, management traffic, voice traffic separated.

**VLAN-based segmentation patterns:**

A typical Nepali bank LAN might have:
- User VLANs (one per branch or department).
- Server VLAN(s) for production application servers.
- Database VLAN restricted to application-server access.
- Management VLAN for network device administration.
- Voice VLAN for IP phones.
- Guest VLAN for visitor access (isolated from internal).
- Quarantine VLAN for non-compliant devices.

### Network segmentation

*Network segmentation is the broader practice of dividing a network into smaller, controllable segments — through VLANs, separate physical networks, firewalls, virtual networks, or software-defined approaches — with controlled traffic between segments, used to limit attack propagation, enforce policy, and improve manageability.*

Segmentation operates at different scales:

**Coarse segmentation.** A handful of zones — DMZ, internal, management. Standard for small networks.

**Mid-grained.** Multiple internal zones — by business function, by sensitivity, by user category.

**Fine-grained / micro-segmentation.** Per-application or per-workload boundaries. Covered in the Routing and Switching subject Chapter 6.

**Per-host.** Each host treated as its own segment.

### Segmentation strategies

**By trust level.** Different zones for different trust levels.

**By data classification.** Restricted data in highly-controlled segments; public-facing data in less-controlled segments.

**By function.** User-access, server, management, IoT in separate segments.

**By regulatory requirement.** PCI-DSS scope, GDPR scope, NRB-regulated systems in separately-scoped segments to reduce compliance burden.

**By geography.** Branch sites in separately-controlled segments from HQ.

### Segmentation operational considerations

- **Inter-segment traffic must be explicitly authorised.** Default-deny with explicit allow rules.
- **Choke points enforce policy.** Routers, firewalls, distribution-layer switches.
- **Documentation.** What is in each segment; who can talk to what.
- **Maintenance.** Segments evolve; documentation and policy must keep up.
- **Monitoring.** Inter-segment traffic monitored for policy violations.

### Common segmentation pitfalls

- **Flat networks.** Insufficient segmentation; once inside, the attacker has broad reach.
- **Excessive permissive rules.** Segmentation defeated by rules that permit too much.
- **Bypass paths.** Backup, monitoring, or management connections that bypass segmentation.
- **VLAN hopping.** Switch misconfigurations allowing VLAN escape.
- **Outdated segments.** Old segments retained that no longer serve a purpose.

## 5.3 Secure network topologies

### Network topology

*Network topology is the structural arrangement of a network — how nodes are connected, what paths exist between them, and what hierarchy or structure the connections form — with topology choices having direct implications for performance, resilience, manageability, and security.*

The classical topologies — bus, star, ring, mesh, tree, hybrid — are foundations. Modern networks combine them in hierarchical structures.

### Hierarchical topology

The traditional Cisco-popularised three-tier model:

**Core.** High-speed backbone.

**Distribution.** Aggregating access layer; enforcing policy.

**Access.** Where devices connect.

Discussed in the Routing and Switching subject Chapter 4. From the security perspective:

- **Core.** Fast forwarding; limited policy. Security controls happen at boundaries elsewhere.
- **Distribution.** Inter-VLAN routing; ACL enforcement; QoS marking.
- **Access.** Port security, 802.1X, BPDU guard, DHCP snooping, dynamic ARP inspection.

### Spine-leaf topology

Modern data-centre topology:

- **Spine switches.** High-speed backbone.
- **Leaf switches.** Connecting to servers and to spine.
- **Every leaf connects to every spine.**

Optimised for east-west traffic typical of data centres. Security in spine-leaf:

- Micro-segmentation often enforced in the hypervisor or leaf switches.
- ACL or distributed firewall rules at every leaf.
- Centralised policy via SDN controller.

### Collapsed topologies

For smaller networks, layers may be collapsed:

- **Collapsed core / distribution.** Single layer combining both.
- **Collapsed access / distribution.** Layer-3 capability at the access switch.

### Topology security implications

| Topology | Security strengths | Security weaknesses |
|---|---|---|
| Star | Central enforcement point | Single point of failure / compromise |
| Mesh | No single point | Hard to monitor; many paths |
| Tree / hierarchical | Layered enforcement | Complex if not designed carefully |
| Spine-leaf | East-west visibility | Requires distributed policy |
| Bus, ring | (Largely historical) | Various weaknesses |

### Resilience and security

Topology affects both. Resilient topologies have multiple paths, redundant devices, geographic distribution. Resilient designs:

- Tolerate failures without service loss.
- Allow maintenance without disruption.
- Survive localised attacks.
- Support DR (covered in the Information Systems Audit Chapter 5).

For Nepali bank topology, typical patterns:
- HQ data centre with redundant core; redundant connections to DR site.
- Branches with single connection to nearest regional concentrator; LTE backup.
- Internet connectivity dual-homed through multiple ISPs.
- Cloud connectivity via dual paths.

## 5.4 WPA, WPA2, and WPA3 security protocols

### Wireless security evolution

Wireless networks face distinctive security challenges. Signals propagate beyond the controlled boundary; eavesdropping is straightforward; legitimate-looking access points can be impersonated. The protocols defending wireless networks have evolved through several generations.

**WEP (Wired Equivalent Privacy).** The original 802.11 security. Broken almost from the start; trivially breakable in hours of capture. Should not be used anywhere in 2026.

**WPA (Wi-Fi Protected Access).** Interim improvement (2003) using TKIP. Provides better security than WEP but with known weaknesses. Deprecated.

**WPA2.** Released 2004; ratified in 802.11i. Uses CCMP based on AES. Dominated wireless deployment for nearly two decades.

**WPA3.** Released by Wi-Fi Alliance in 2018. Addresses WPA2 weaknesses and adds new capabilities.

### WPA2

The dominant protocol through 2018-2024 and still widely deployed in 2026.

**Authentication modes:**

**WPA2-Personal (PSK).** Pre-shared key shared among all users. Simple to deploy; appropriate for home and small office. Vulnerable to offline brute force if the passphrase is weak.

**WPA2-Enterprise.** 802.1X authentication via RADIUS. Each user has individual credentials. Suitable for organisations.

**WPA2 cryptography:**

- **CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol).** Based on AES; provides confidentiality and integrity.
- **TKIP (Temporal Key Integrity Protocol).** Backward compatibility with older hardware; deprecated.

**WPA2 weaknesses:**

- **KRACK attack (2017).** Vulnerability in the 4-way handshake. Patched in subsequent firmware updates.
- **Weak PSK vulnerability.** PSK can be brute-forced offline if captured during handshake.
- **No forward secrecy** in PSK mode.

### WPA3

WPA3 addresses WPA2 weaknesses and adds capabilities.

**Key improvements:**

**SAE (Simultaneous Authentication of Equals).** Replaces the PSK handshake with a Dragonfly-based key exchange resistant to offline brute force. Even with the handshake captured, the attacker cannot recover the password through dictionary attacks.

**Forward secrecy.** Each session has unique keys; compromise of long-term credentials does not expose past sessions.

**Stronger cryptography.** WPA3-Enterprise has a 192-bit mode (CNSA-compliant) for high-security environments.

**Easy Connect.** Simplified onboarding for headless IoT devices via QR codes.

**Enhanced Open (OWE — Opportunistic Wireless Encryption).** Encryption even for "open" guest networks without password — defeating passive sniffing of guest traffic.

### WPA3 adoption

As of 2026:
- Most new enterprise wireless equipment supports WPA3.
- Mixed-mode deployment common — WPA3 with WPA2 fallback for older clients.
- Pure WPA3 mode requires all clients to support it.
- IoT devices often still WPA2-only.

For Nepali enterprises, WPA3 adoption has been gradual. Banks and modern offices typically support WPA3 in newer access points. Legacy infrastructure still WPA2.

### Other wireless security mechanisms

Beyond the protocols:

**802.1X / WPA2-Enterprise / WPA3-Enterprise.** Per-user authentication via RADIUS. The standard for enterprise wireless.

**MAC filtering.** Allowing only specific MAC addresses. Trivially bypassed; not relied on as primary security.

**SSID hiding.** Not broadcasting the network name. Provides minimal real security but slight obscurity.

**Wireless IDS/IPS (WIDS/WIPS).** Detects rogue APs, deauthentication attacks, spoofing.

**Client isolation.** Wireless clients on the same network cannot communicate with each other directly.

**Guest network separation.** Guest wireless on a separate VLAN, isolated from corporate.

**Wireless segmentation.** Different SSIDs / VLANs for different user categories.

## 5.5 Securing wireless networks

### Operational wireless security

Beyond protocol choice, securing wireless networks involves operational disciplines.

### Network design

**Coverage planning.** Coverage should match the intended access area. Excessive coverage extends the attack surface (signals reaching unintended areas).

**Site survey.** Pre-deployment assessment of signal propagation, interference, capacity.

**Channel planning.** Non-overlapping channels; avoiding interference.

**Density planning.** Sufficient APs for expected client density.

### Authentication infrastructure

For enterprise wireless:

- **RADIUS server** for 802.1X authentication. Microsoft NPS, FreeRADIUS, Cisco ISE, Aruba ClearPass.
- **Backend identity store** — Active Directory, LDAP, identity provider.
- **Certificates** for EAP-TLS (the strongest EAP method) or for server-side authentication.
- **MFA** integrated where possible.

### Rogue AP detection

*A rogue access point is an unauthorised wireless access point connected to an organisation's network, whether installed by an employee for convenience or by an attacker to gain entry, providing a backdoor that bypasses other security controls.*

Rogue APs are detected by:
- **Wireless IDS sensors.** Continuously scanning the spectrum for unauthorised APs.
- **Wired-side detection.** Comparing observed MAC addresses on the wired network against expected.
- **Periodic walkthroughs.** Physical inspection.

Modern enterprise wireless infrastructure (Cisco, Aruba, Meraki, Ruckus) includes automated rogue detection as a standard feature.

### Wireless attack patterns

**Eavesdropping.** Passive capture of wireless traffic. WPA2/WPA3 encryption prevents content exposure but metadata (associated APs, traffic patterns) visible.

**Deauthentication attacks.** Forging 802.11 deauthentication frames to force clients off APs. Used in WPA2 PSK cracking workflows; mitigated by 802.11w Management Frame Protection.

**Evil twin attacks.** Attacker sets up a rogue AP with the same SSID as a legitimate network. Clients associate to the wrong AP. Mitigation: enterprise authentication, certificate-based EAP, client-side validation.

**Karma / KARMA attacks.** Attacker responds to client probes for any SSID. Used in wireless penetration testing. Modern clients are less vulnerable but still possible against poorly-configured devices.

**Captive-portal bypass.** Attacks against guest-network captive portals.

**WPS attacks.** Wi-Fi Protected Setup PIN attacks. WPS should be disabled.

### Wireless security checklist

For an enterprise wireless deployment:

- [ ] WPA3 where supported; WPA2 with strong PSK or Enterprise as fallback.
- [ ] 802.1X with EAP-TLS or PEAP/MSCHAPv2 for enterprise authentication.
- [ ] No WEP, no WPA-TKIP, no open networks (or only OWE).
- [ ] Strong PSK (long, random) for PSK networks.
- [ ] Guest network isolated from corporate.
- [ ] Management frame protection (802.11w) enabled.
- [ ] Rogue AP detection active.
- [ ] WIDS/WIPS deployed for sensitive environments.
- [ ] Channel and power planning to limit signal leakage.
- [ ] AP management traffic encrypted and authenticated.
- [ ] Regular wireless security audits.
- [ ] User awareness about wireless threats.

For Nepali enterprises in 2026, wireless security is generally well-deployed at major banks and modern corporates. Smaller organisations often have weaker setups — common findings include open networks, weak PSK, or no separation between guest and corporate.

## 5.6 Two-tiered and three-tiered architecture

### Architectural tiers

The classical hierarchical network design has been adapted for different scales.

### Three-tier architecture

Discussed in earlier subjects. Recap:

- **Core layer.** High-speed backbone.
- **Distribution layer.** Aggregation; policy enforcement.
- **Access layer.** End-device connectivity.

Used for large enterprise campuses and large data centres.

### Two-tier (collapsed) architecture

A simplified form:

- **Core / distribution combined.** Single layer.
- **Access layer.** End-device connectivity.

Used for medium enterprises where the full three-tier complexity is unwarranted.

### Single-tier

For small networks — a single switch or a flat layer-2 design. Used in small offices.

### Choosing the right tier model

| Network size | Typical model |
|---|---|
| Small (under 50 ports) | Single-tier or two-tier |
| Medium (50-500 ports) | Two-tier |
| Large (500-5000 ports) | Three-tier |
| Very large (5000+ ports) | Three-tier with possible additional layers |
| Data centre | Spine-leaf typical now |

### Security implications by tier

**Three-tier** distributes security enforcement across distribution layer (between VLANs) and possibly access (port security, 802.1X). Provides natural choke points.

**Two-tier** collapses the enforcement; still functional but with fewer natural boundaries.

**Single-tier** is the least segregated; security relies entirely on host-level controls.

### Three-tier application architecture

A different but related concept (introduced in Chapter 3):

- **Presentation tier (web).** In the DMZ.
- **Application tier.** In an internal zone.
- **Data tier.** Deepest zone, behind application.

The tiers correspond to layers of trust; access between layers is controlled. This is the application-architecture sense of three-tier, distinct from the network-architecture sense.

## 5.7 Zero Trust networks

### Zero Trust

*Zero Trust is a security model that eliminates the assumption of trust based on network location, requiring continuous verification of identity, device posture, and access context for every connection, regardless of whether the traffic originates inside or outside the traditional network perimeter.*

The principle: never trust, always verify.

Zero Trust originated in work by Forrester Research analyst John Kindervag in 2010. The concept has matured into a comprehensive framework articulated in NIST SP 800-207 (Zero Trust Architecture, 2020).

### Why Zero Trust

The traditional perimeter model assumes:
- Inside the network = trusted.
- Outside the network = untrusted.

This assumption breaks down because:
- **Cloud.** Workloads outside the perimeter.
- **Remote work.** Users outside the perimeter.
- **Mobile devices.** Crossing the perimeter constantly.
- **Insider threats.** Trusted insiders cause harm.
- **Lateral movement.** Attackers who get inside move freely.
- **SaaS.** Most enterprise apps now outside the perimeter.

The Zero Trust response: do not grant trust based on network location. Verify every access.

### Core principles (NIST SP 800-207)

1. **All data sources and computing services are resources.** Not just the obvious ones.
2. **All communication is secured regardless of network location.** Encryption everywhere.
3. **Access to individual enterprise resources is granted on a per-session basis.** Not blanket access.
4. **Access to resources is determined by dynamic policy.** Considers identity, device, environmental context.
5. **The enterprise monitors and measures the integrity and security posture of all owned and associated assets.** Continuous verification.
6. **All resource authentication and authorisation are dynamic and strictly enforced before access is allowed.**
7. **The enterprise collects as much information as possible about the current state of assets and uses this to improve security posture.**

### Building blocks of Zero Trust

**Strong identity.** Every user and device has a verifiable identity. MFA universally.

**Continuous evaluation.** Trust signals continuously assessed; access can be revoked mid-session.

**Least privilege.** Access only to what is needed, for as long as it is needed.

**Micro-segmentation.** Fine-grained controls (Chapter 6 of Routing and Switching subject).

**Encryption everywhere.** Internal traffic encrypted just like external.

**Visibility and analytics.** Comprehensive monitoring and analytics.

**Policy engine.** Centralised policy that adapts to context.

**Policy enforcement point.** Where policy is enforced; many across the architecture.

### Zero Trust Network Access (ZTNA)

The networking aspect:

*Zero Trust Network Access is the technology that provides identity-aware, context-aware access to specific applications and resources, replacing or supplementing traditional VPN by authenticating and authorising every access decision based on user, device, location, and other signals.*

ZTNA products: Cloudflare Access, Zscaler Private Access, Palo Alto Prisma Access, Cisco Secure Access, Netskope, Twingate, Tailscale.

The user device connects to a cloud broker; the broker authenticates and authorises per-application access. The user does not receive broad network access; they receive access to specific applications.

### SASE

*Secure Access Service Edge is the cloud-delivered combination of network and security functions — SD-WAN, SWG, CASB, ZTNA, FWaaS, DLP — into a unified cloud service, providing security and connectivity for distributed users and workloads with policies enforced at cloud-based points of presence close to users.*

SASE is the broader architectural direction encompassing ZTNA. The vision: stop building security at the perimeter of the data centre; instead, build security in the cloud, with policy enforcement close to users wherever they are.

Major SASE vendors: Cisco, Palo Alto, Zscaler, Netskope, Cloudflare, Cato Networks, Fortinet.

### Migration to Zero Trust

For Nepali enterprises in 2026:

- **Banks.** Beginning ZTNA evaluations; some pilots; broad replacement of VPN is multi-year work.
- **Telecoms.** Internal architectures partially Zero Trust; customer-facing services still mixed.
- **Government.** Limited adoption; in some agencies under discussion.
- **SMB.** Limited adoption due to cost and complexity.

The path:
1. **Current state assessment.** Existing controls, identity, segmentation.
2. **Strategy and roadmap.** Phased adoption.
3. **Identity foundation.** Strong identity, MFA universally.
4. **Visibility.** Comprehensive monitoring.
5. **Micro-segmentation.** Progressive.
6. **ZTNA deployment.** Replacing VPN for specific apps.
7. **Policy refinement.** Continuous improvement.
8. **SASE integration.** Where applicable.

The transition takes years. Smart organisations move in steps; few succeed with big-bang transitions.

### Zero Trust pitfalls

Common mistakes:

- **Treating Zero Trust as a product.** It is an architectural approach; products support it but do not constitute it.
- **Identity foundation skipped.** Without strong identity, the rest does not work.
- **Visibility skipped.** Cannot make access decisions without insight.
- **Big-bang replacement.** Phased migration is the path.
- **Application inventories incomplete.** What needs to be accessed and by whom must be known.

### Summary architectural direction

The combined direction of secure network architecture in 2026:

- Traditional perimeter still exists but is no longer the primary defence.
- Internal segmentation is finer-grained.
- Identity-based access supplements network-based access.
- Encryption is everywhere.
- Cloud-delivered security functions complement on-premises ones.
- Visibility and analytics are universal.
- Continuous verification replaces one-time authentication.

The next chapter takes a sharper focus on a specific operational discipline that the architecture demands — hardening the network infrastructure itself.
