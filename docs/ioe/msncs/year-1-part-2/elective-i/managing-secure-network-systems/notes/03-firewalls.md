---
title: 'Chapter 3 — Firewalls and Perimeter Security'
sidebar_label: 'Ch 03 — Firewalls and Perimeter Security'
sidebar_position: 3
description: 'Chapter 3 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch03
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The firewall is the most-recognised network-security device, sitting at the boundary between trust zones and deciding what traffic crosses. From the early packet-filter routers of the late 1980s to the modern next-generation firewalls integrating multiple security functions in a single platform, the technology has evolved continuously while the central role has remained the same. This chapter covers firewall types from packet filters through stateful inspection to application-layer firewalls, the specialised forms (WAF, email security gateways), firewall architectures and policies, the perimeter and DMZ design, object-based rule management, NAT in firewall context, and the modern Next-Generation Firewall integrating UTM and IoT security.

## 3.1 Types of firewalls — packet filtering, stateful inspection, application layer

### Firewall

*A firewall is a network-security device or software that monitors and controls incoming and outgoing network traffic based on predetermined security rules, establishing a barrier between a trusted internal network and untrusted external networks, with varying capability levels from simple packet-by-packet filtering to deep application inspection.*

The original firewalls of the late 1980s — Digital Equipment Corporation's SEAL, AT&T Bell Labs' early work — performed packet filtering on routers. The technology has gone through several generations.

### Packet-filtering firewall (first generation)

*A packet-filtering firewall examines individual packets in isolation, comparing each packet's header fields — source and destination IP addresses, ports, protocols, TCP flags — against a list of rules and allowing or blocking accordingly, without considering the context of packets in the broader flow.*

Operationally simple; fast; stateless. The earliest firewall type and still embedded in many devices (router ACLs, basic Linux iptables rules without conntrack).

**Strengths:**
- Very high performance.
- Simple rule semantics.
- Suitable for high-throughput perimeter where deeper inspection is impractical.

**Weaknesses:**
- Cannot distinguish legitimate response traffic from unsolicited.
- Vulnerable to fragmentation evasion.
- Cannot see application-level content.
- Complex rule sets to handle bi-directional flows.

For a router-based ACL in Cisco IOS:

```
access-list 110 permit tcp 10.10.10.0 0.0.0.255 any eq 443
access-list 110 permit tcp 10.10.10.0 0.0.0.255 any eq 80
access-list 110 deny ip any any
```

This allows web traffic outbound but blocks everything else. Pure packet filtering — each packet checked independently.

### Stateful inspection firewall (second generation)

*A stateful inspection firewall tracks the state of network connections in a connection table, allowing it to distinguish packets that are part of established legitimate connections from those that are not, enabling more secure policies that can permit return traffic without permanently opening inbound paths.*

Pioneered by Check Point Software in the early 1990s with Firewall-1. Now the foundation of essentially every modern firewall.

**Connection table.** For each TCP connection (and UDP "pseudo-connections"), the firewall records:
- Source and destination IPs.
- Source and destination ports.
- Protocol.
- TCP state (SYN_SENT, ESTABLISHED, FIN_WAIT, etc.).
- Timestamps.

**Operational benefit:** A policy can say "allow internal hosts to initiate connections to the internet on port 443" and the firewall automatically allows return packets without an explicit rule for them.

**Strengths:**
- Bi-directional policy with single rules.
- Detection of state-anomalous packets (TCP RST forging, out-of-sequence).
- Resists many evasion techniques.
- Performance generally good.

**Weaknesses:**
- Cannot see application-layer content (without additional features).
- State table is a finite resource — DoS via state-table exhaustion possible.
- Complex stateful protocols (FTP active mode, SIP) need helpers.

### Application-layer firewall (third generation)

*An application-layer firewall, sometimes called an application gateway or proxy firewall, inspects traffic at the application layer of the OSI model, parsing the application protocol to make security decisions based on the actual content and behaviour of the application traffic, providing the deepest inspection but at performance cost.*

Application firewalls fall into two patterns:

**Application proxy.** Acts as an intermediate endpoint. The client connects to the proxy; the proxy makes a separate connection to the destination. The proxy sees and can modify the full application stream. Common for HTTP/HTTPS, SMTP, FTP, SSH.

**Deep packet inspection (DPI).** The firewall parses the application protocol without breaking the connection, applying policies based on parsed content. The technique used in modern NGFW.

**Strengths:**
- Application-aware policy.
- Can detect and block application-layer attacks.
- Logs application-level activity (URLs, email subjects, file types).
- Can perform protocol normalisation (rejecting non-compliant or evasive packets).

**Weaknesses:**
- Performance cost.
- Encrypted traffic requires decryption (with attendant operational complexity).
- New applications require new parsers.
- Some applications resist proxying.

### Other firewall categories

**Circuit-level gateway.** Operates at session layer; works at the TCP-connection level rather than packet or application. SOCKS proxy is the classical example.

**Bastion host.** A hardened host providing specific services with high-security configuration; often used as an SSH jump host.

**Personal firewall / host firewall.** Software on individual hosts. Windows Firewall, iptables/nftables on Linux, pf on macOS/BSD.

**Cloud firewall / FWaaS.** Firewall delivered as cloud service. Scales with cloud workloads; offloads on-premises hardware.

### Evolution to Next-Generation Firewall

Modern firewalls combine multiple capabilities — stateful inspection, application awareness, IDS/IPS, URL filtering, antivirus, sandbox integration. The integrated form is the NGFW (Section 3.7).

## 3.2 Web application firewall and email security gateways

Two specialised firewall categories deserve specific attention.

### Web application firewall (WAF)

*A Web Application Firewall is a security control that monitors, filters, and blocks HTTP/HTTPS traffic to and from a web application, focused on application-layer attacks — SQL injection, cross-site scripting, request smuggling, session manipulation — that traditional network firewalls cannot see or interpret.*

WAFs sit between web clients and web applications. They parse HTTP requests and responses, applying rules informed by the OWASP Top 10 and other application-security knowledge.

**Operational positioning:**

- **Network WAF.** Inline appliance in front of web servers. F5 ASM, Imperva, Citrix ADC AppFirewall.
- **Host-based WAF.** Module in the web server. ModSecurity (open-source, runs on Apache, Nginx, IIS).
- **Cloud WAF.** Delivered as a service. AWS WAF, Azure WAF, Cloudflare WAF, Akamai Kona Site Defender.

**Detection methods:**

- **Signature-based.** Known attack patterns matched against requests. OWASP ModSecurity Core Rule Set (CRS) is the canonical open-source ruleset.
- **Anomaly-based.** Statistical deviation from baseline behaviour.
- **Behavioural / ML.** Modern WAFs use machine learning for adaptive detection.
- **Positive security model.** Specifying what is allowed (rather than what is blocked); stronger but harder to maintain.

**Operational considerations:**

- **False positives.** WAFs frequently block legitimate traffic. Tuning is ongoing.
- **TLS termination.** WAFs typically terminate TLS, see decrypted content, then re-encrypt to the backend. Certificate management on the WAF.
- **Performance.** Adds latency; sizing matters.
- **Policy management.** Multi-application environments need separate policies; complexity grows.

For Nepali context:
- Major banks use commercial WAF (often F5, Imperva, or cloud-based) for internet banking and customer-facing portals.
- The 2024 GIDC DDoS and the 2025 Nepal Police website incident underscored WAF needs across government infrastructure.
- Smaller organisations rely on cloud WAF (Cloudflare is widely deployed; AWS WAF for AWS-hosted properties).

### Email security gateway

*An email security gateway is a network appliance or cloud service positioned between an organisation's email infrastructure and the public internet that filters incoming and outgoing email for spam, malware, phishing, data leakage, and policy violations, providing the dominant defensive layer against email-borne threats.*

Email remains a primary attack vector. Phishing, business email compromise, malware-laden attachments, malicious links — all arrive via email. The gateway is the first line.

**Functions:**

- **Anti-spam.** Reputation-based filtering, content analysis, sender authentication checks.
- **Anti-malware.** Attachment scanning, sandboxing of suspicious files, URL rewriting for click-time analysis.
- **Anti-phishing.** Detection of impersonation, suspicious links, header anomalies.
- **DLP.** Outbound scanning for sensitive content (PII, financial data, intellectual property).
- **Encryption.** Outbound encryption for sensitive messages.
- **Archive.** Compliance-driven retention of email.

**Authentication standards:**

- **SPF (Sender Policy Framework).** DNS record specifying authorised sender hosts.
- **DKIM (DomainKeys Identified Mail).** Cryptographic signing of email headers.
- **DMARC (Domain-based Message Authentication, Reporting and Conformance).** Policy combining SPF and DKIM with reporting.

For Nepali context:
- Government and major bank domains increasingly publish SPF and DMARC. Adoption was patchy historically; tightening through 2023-26.
- Major email security gateway vendors active in Nepal: Proofpoint, Mimecast (now via integrations), Microsoft Defender for Office 365 (for M365 users), Cisco Secure Email Cloud Gateway (formerly IronPort).
- Smaller organisations rely on basic spam filtering bundled with email providers.

## 3.3 Firewall architectures and policies

### Firewall architectures

Several common deployment patterns.

**Single firewall (border firewall).** One firewall at the internet edge. Simplest; appropriate for small organisations.

**Dual firewall (sandwich).** Two firewalls in series creating a DMZ between them. Outer firewall is more open; inner more restrictive. Defence-in-depth at the perimeter.

**Multi-zone firewall.** Single firewall with multiple interfaces in different security zones (internet, DMZ, internal, management). Modern firewalls naturally support this.

**Distributed firewall.** Firewall functions on multiple devices throughout the network. Often integrated with SDN.

**Cloud firewall topology.** Native to cloud platform — Security Groups, Network Security Groups, firewall rules in cloud routing.

### Firewall policy

*A firewall policy is the set of rules that define which traffic the firewall permits or denies, expressed in terms of source, destination, services, and actions, applied in sequence with first-match semantics, structured to balance security objectives with operational requirements.*

A typical policy structure:

- **Default deny.** The last rule denies everything not explicitly permitted. This is the secure baseline.
- **Specific allows.** Earlier rules permit specific traffic.
- **Logging.** Most denied traffic should be logged for visibility.
- **Object-based.** Modern policies use named objects rather than literal IPs (Section 3.5).

### Policy design principles

**Least privilege.** Permit only the traffic actually needed; deny everything else.

**Explicit policy.** Every allowed flow has an explicit, documented rule.

**Source and destination specificity.** "Any to any" rules are almost always wrong.

**Service specificity.** "Any service" rules are similarly suspect.

**Direction explicit.** Both inbound and outbound flows considered.

**Justified exceptions.** Where rules deviate from baseline, the business justification is documented.

**Periodic review.** Rules expire if not reaffirmed.

**Change control.** Rule changes go through change management.

### Policy structure for typical bank perimeter

A simplified example for the perimeter firewall at a Nepali bank's HQ:

| Rule # | Source | Destination | Service | Action |
|---|---|---|---|---|
| 1 | Internet | DMZ-Web-Servers | HTTPS | Permit |
| 2 | Internet | DMZ-Mail-Gateway | SMTP, SMTPS | Permit |
| 3 | DMZ-Web-Servers | Internal-App-Servers | App-Tier | Permit |
| 4 | Internal-Users | Internet | HTTPS, HTTP, DNS | Permit |
| 5 | Internal-Users | Internet | Other | Inspect (via SWG) |
| 6 | VPN-Users | Internal-Resources | Per-role | Permit |
| 7 | Management-Network | All-Devices | Mgmt-Protocols | Permit |
| 8 | Any | Any | Any | Deny + Log |

Real policies have many more rules (often hundreds); the structure follows similar principles.

### Common policy problems

Audit findings frequently surface:

- **Overly permissive rules.** "Any to internal" rules.
- **Stale rules.** Rules for systems long decommissioned.
- **Conflicting rules.** Later rules contradicted by earlier ones.
- **Missing logging.** Important denies not logged.
- **Unjustified rules.** No documentation of why they exist.
- **Service-account exceptions.** Broad access for service accounts that has grown over time.
- **Temporary rules made permanent.** Originally "temporary" exceptions that were never removed.
- **Shadow rules.** Rules superseded by earlier rules that match the same traffic.

### Policy management tools

For large rule sets, specialised tools assist:

- **AlgoSec.** Policy analysis and automation.
- **Tufin.** Network security policy management.
- **FireMon.** Policy management and audit.
- **Skybox Security.** Security posture management.
- **Vendor-native.** Firewall vendors provide their own management consoles (Cisco FMC, Fortinet FortiManager, Palo Alto Panorama).

For Nepali banks with multi-firewall environments and complex rule sets, policy-management platforms are increasingly deployed. The combination of compliance pressure, audit findings, and operational complexity drives the investment.

## 3.4 Core, edge or perimeter, and DMZ firewalls

### Network zones

Modern enterprise networks use multiple zones with different trust levels.

**Untrusted (internet).** External; assume hostile.

**Edge / perimeter.** The firewall layer facing the internet.

**DMZ (Demilitarised Zone).** Network containing systems that need internet exposure (web servers, mail gateways, DNS) but not full internal trust.

**Internal user network.** Where employees connect.

**Internal server network.** Application and database servers.

**Management network.** Network device management; separate from production traffic.

**High-trust enclave.** Most sensitive systems (HSMs, core banking, secrets); maximum restrictions.

Each zone is separated from the others by firewall (logical or physical), with policy controlling what can traverse.

### Perimeter firewall

*A perimeter firewall is the security device positioned at the boundary between an organisation's network and external networks (typically the internet), enforcing the first layer of inbound and outbound traffic control, often combined with NAT, VPN concentrator, and IDS/IPS functions.*

For a typical Nepali bank, the perimeter firewall stack includes:
- The firewall itself (Fortinet, Cisco, Palo Alto, Check Point).
- Inline IDS/IPS.
- NAT for outbound traffic.
- VPN concentrator for site-to-site and remote-access.
- Often a separate DDoS mitigation layer in front (upstream from carrier or cloud-based).

### Edge versus core firewalls

**Edge firewall.** At a specific network boundary — perimeter, branch, partner connection. Closely watches one boundary.

**Core firewall.** Internal to the network. Segments traffic between internal zones. Not at any external boundary but separating internal trust levels.

In a Nepali bank's HQ:
- Edge firewall faces the internet.
- Edge firewalls face branch network (the MPLS / SD-WAN concentrator side).
- Core firewall(s) segregate user network from server zones, server zones from each other, management network from production.

### DMZ design

A DMZ is a network where systems that must be reachable from the internet are placed.

**Classic DMZ.** Web servers, mail gateways, DNS, customer-facing portals.

**Application-tier DMZ.** Specifically for application servers fronting a database that remains in internal.

**Multiple DMZs.** Different DMZs for different exposure levels — public-facing services vs B2B partner-facing services vs internal-only services that need internet access.

**Three-tier architecture.**
- Tier 1: Web/presentation layer in DMZ.
- Tier 2: Application logic in inner zone.
- Tier 3: Database and data layer deepest.

Each tier reachable only from the immediately-fronting tier; not directly from the internet.

### Operational rules of DMZ

Firewall policy patterns for DMZ:

- Internet → DMZ: permit specific services.
- DMZ → Internet: typically deny (except for specific services like DNS resolution).
- DMZ → Internal: highly restricted; only specific application-tier connections.
- Internal → DMZ: permitted for management, more open for users.
- DMZ servers → DMZ servers: restricted to what is actually needed.

A breach in a DMZ system must not provide direct path to internal systems — the firewall policy is what enforces this.

## 3.5 Objects, policies, directions, ingress and egress rules

### Object-based policy

*An object-based firewall policy uses named objects representing IP addresses, address groups, services, service groups, users, and other entities, with policy rules referencing the objects rather than literal values, making rules more readable, maintainable, and reusable.*

Instead of:

```
permit tcp 10.10.10.0/24 to 192.168.100.50 port 443
```

Object-based:

```
permit BankUsers to InternetBankingFrontEnd HTTPS
```

The objects:
- `BankUsers` = 10.10.10.0/24.
- `InternetBankingFrontEnd` = 192.168.100.50.
- `HTTPS` = TCP/443.

**Operational benefits:**
- Reduced redundancy. The same object reused across many rules.
- Changes localised. Modify the object once; all rules using it are updated.
- Readability. Rules describe intent in business terms.
- Auditability. Easier to understand what a rule does.

### Object types

Common object types in modern firewalls:

- **Address objects.** Single IP, range, subnet, FQDN.
- **Address groups.** Combinations.
- **Service objects.** TCP/UDP ports.
- **Service groups.** Combinations.
- **Application objects.** Recognised applications (Facebook, WhatsApp, Zoom).
- **User objects.** Integrated with directory services.
- **User groups.** AD/LDAP groups.
- **URL categories.** Web filtering categorisation.
- **Time objects.** Specific times or schedules.
- **Country / geo objects.** Sources by country.

### Ingress and egress

**Ingress.** Traffic entering an interface (or a zone). From the firewall's perspective, traffic coming in.

**Egress.** Traffic leaving an interface (or zone).

A typical firewall has rules for both directions. The interpretation depends on perspective:

- For the internet-facing interface, ingress traffic comes from the internet; egress goes to it.
- For an internal interface, ingress traffic comes from internal; egress goes to internal.

### Direction in policy

Modern firewalls express direction explicitly. A policy might be:

```
From: zone "internet"
To: zone "DMZ"
Source: any
Destination: webserver-1
Service: HTTPS
Action: permit
```

The "from" and "to" zones make direction explicit. A reverse-direction rule would be separate.

For traffic between zones, both directions typically need consideration:
- Outbound from zone A to zone B (often allowed).
- Inbound responses (handled by stateful inspection, usually automatically).
- New inbound connections from B to A (typically denied unless explicit need).

### Implicit deny

Most firewalls have an implicit deny-all at the end of the rule list. Anything not explicitly permitted by an earlier rule is denied. This is the secure baseline.

Some firewalls allow this to be made explicit (for logging purposes) or to be inverted (default permit, with explicit denies). The default-deny posture is far stronger and is the standard recommendation.

### Logging policy

What to log:

- All denied traffic (or at least a representative sample).
- Critical permitted traffic (administrative access, sensitive data access).
- Configuration changes.
- Authentication events.

What not to log (or log carefully):

- Every permitted packet (volume overwhelms storage).
- Sensitive data content.

Logging integrates with the SIEM (covered in the Forensics subject Chapter 8).

## 3.6 NAT and Virtual IP — concepts and use cases

### NAT in firewall context

Network Address Translation (covered in the Routing and Switching subject Chapter 5) is commonly performed by the firewall.

**Outbound (source) NAT.** Internal hosts translated to the firewall's public address(es) for internet access. Standard for any organisation using RFC 1918 internal addresses (essentially all of them).

**Inbound (destination) NAT.** External requests to a public address translated to an internal server. Used for publishing internal services.

**Static NAT.** One-to-one mapping. Common for published servers.

**Dynamic NAT / PAT.** Many-to-one or many-to-few. Common for outbound user traffic.

### Virtual IP (VIP)

*A Virtual IP is an IP address that does not correspond to a specific physical interface but is instead bound to a service or function, with the firewall, load balancer, or routing device handling traffic destined to the VIP and directing it to one or more backend resources, used for service publication, load balancing, and high availability.*

Typical uses:
- A bank's internet banking is published at a single VIP. Behind the VIP, the firewall (or load balancer) distributes traffic across multiple backend web servers.
- A pair of firewalls in HA configuration share a VIP; whichever is active responds; failover changes which physical device responds without changing the VIP.

### NAT use cases

**Publishing internal services.** External clients connect to a public IP/port; firewall translates to internal server.

**Multiple sites sharing public addresses.** Different internal networks NATed through the same firewall to the same external pool.

**Hiding internal structure.** Internal IP layout not visible from outside.

**Cross-NAT communication.** Two networks with overlapping address spaces communicating via NAT.

**One-to-many mappings.** Different external IPs/ports mapping to the same internal service for capacity or geo-distribution.

### NAT challenges

**Protocol breakage.** Some protocols carry addresses in payloads. Solutions: ALGs in the firewall.

**Logging complexity.** External observations show the public IP; mapping to internal source requires NAT logs.

**Connection-tracking overhead.** State table consumption.

**End-to-end loss.** True end-to-end IP visibility lost.

### NAT in modern environments

The move to IPv6 reduces the address-conservation rationale for NAT but does not eliminate NAT entirely. Many enterprises continue NAT in IPv6 deployments for isolation reasons even though it is not strictly necessary.

For cloud environments, NAT is delivered as a service:
- AWS NAT Gateway.
- Azure NAT Gateway.
- GCP Cloud NAT.

These provide outbound-only NAT for cloud workloads needing internet access without exposing them inbound.

## 3.7 Next Generation Firewalls — UTM, AV, IoT

### Next-Generation Firewall

*A Next-Generation Firewall is a firewall that integrates traditional stateful inspection with additional advanced capabilities — application awareness, integrated intrusion prevention, user identity awareness, threat intelligence integration, malware detection, and others — in a single platform, providing consolidated network security functions, the dominant firewall form factor in modern enterprises.*

The term "next-generation" was coined by Gartner around 2009-2010 to distinguish the new generation from traditional stateful firewalls. Through the 2010s, all major firewall vendors converged on NGFW architecture; "NGFW" is now synonymous with modern firewall.

### NGFW capabilities

The integrated functions:

**Stateful inspection.** Foundation (Section 3.1).

**Application identification.** Identifying applications regardless of port (Facebook over 443 is identified as Facebook, not just HTTPS).

**User identification.** Integration with directory services to make policies based on user identity, not just IP.

**Integrated IPS.** Inline signature and behavioural detection (Chapter 4).

**Antivirus / anti-malware.** Inline scanning of files passing through.

**URL filtering.** Categorisation-based blocking of web destinations.

**SSL/TLS decryption.** Selective decryption of encrypted traffic for inspection.

**Threat intelligence.** Integration with vendor threat-intelligence feeds for known-bad indicators.

**Sandbox integration.** Suspicious files sent to a sandbox for behavioural analysis.

**Identity-based policy.** Rules referencing users and groups from directory.

**Decryption and inspection of encrypted traffic.** A controversial but standard NGFW capability.

### Major NGFW vendors

- **Cisco Secure Firewall (formerly Firepower).** Cisco's NGFW, integrated with broader security portfolio.
- **Palo Alto Networks PAN-OS.** Strong reputation for application identification.
- **Fortinet FortiGate.** Wide deployment, particularly mid-market and SMB.
- **Check Point Quantum.** Long-established.
- **Juniper SRX.** Strong in service-provider and large enterprise.
- **Sophos XG.** SMB focus.
- **WatchGuard Firebox.** SMB focus.
- **Cloud-native NGFW.** AWS Network Firewall, Azure Firewall Premium, Google Cloud Firewall.

For Nepali enterprises:
- **Banks:** Cisco, Fortinet, Palo Alto dominate.
- **Telecoms:** Cisco, Juniper, Fortinet.
- **SMB:** Fortinet most common; some Sophos, WatchGuard.
- **Government:** Mixed; tendering-based procurement.

### UTM

*Unified Threat Management refers to security products that combine multiple security functions — firewall, IPS, anti-malware, web filtering, anti-spam, VPN — in a single device, aimed at the small and medium business market that benefits from consolidated security capability in a single management plane.*

UTM and NGFW overlap heavily. The distinction in industry terminology:
- **UTM.** SMB-positioned; multi-function in one box.
- **NGFW.** Enterprise-positioned; firewall foundation with added advanced features.

In practice, modern products in both categories have similar capability lists; positioning differs by vendor and market.

### NGFW in IoT environments

IoT brings specific concerns to firewall management:

- **Scale.** Many more devices than traditional networks.
- **Diversity.** Many device types, protocols, behaviours.
- **Constrained devices.** Limited security capability built in.
- **Long lifecycles.** Devices in production for years with infrequent updates.

NGFW capabilities relevant to IoT:
- **Device identification.** Recognising IoT device types (smart cameras, sensors, building controls).
- **Behaviour profiling.** What an IoT device should do; flag deviations.
- **Segmentation.** IoT zones separated from corporate networks.
- **Protocol awareness.** Industrial protocols (Modbus, DNP3, BACnet) for OT environments.

For Nepali deployments, IoT is at early stages — smart meters (NEA pilot), some industrial IoT, some smart-building deployments. Firewall capability for IoT is in early adoption.

### NGFW deployment considerations

**Sizing.** Throughput requirements with all features enabled. NGFW features significantly reduce raw throughput; vendor data sheets often show throughput at multiple configurations.

**TLS decryption capacity.** Often the limiting factor; decryption is expensive.

**License model.** NGFW features often licensed by capability; subscription required for threat-intelligence and updates.

**Maintenance.** Software and signature updates; vendor-managed and customer-applied.

**HA.** Active-passive or active-active redundancy.

**Logging.** Volume can be substantial; storage and SIEM integration planning needed.

### Operational management of NGFW

Daily operations:

- Monitor health and capacity.
- Review and respond to alerts.
- Investigate logged events of concern.
- Apply updates (firmware, signatures).
- Make policy changes through change management.
- Conduct periodic policy review.

Monthly / quarterly:

- Review user reports of issues attributable to firewall.
- Performance tuning.
- Coverage gap analysis.
- Compliance verification.

Annually:

- Comprehensive policy review.
- Capacity planning.
- Technology refresh consideration.
- Audit.

The next chapter shifts to the complementary network-security technology — Intrusion Detection and Prevention Systems — which work alongside the firewall but bring different capabilities and management requirements.
