---
title: 'Chapter 1 — Introduction to Network Security & Protocols'
sidebar_label: 'Ch 01 — Introduction to Network Security & Protocols'
sidebar_position: 1
description: 'Chapter 1 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch01
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Network security is the discipline of protecting the information and services that move across networks, and the infrastructure that carries them. Every keystroke at a Kathmandu bank, every transaction on eSewa or Khalti, every message on WhatsApp, every government e-service login — all depend on protocols and devices working together to provide confidentiality, integrity, and availability. When the protocols are insecure or the devices misconfigured, the consequences range from inconvenience to catastrophe: lost data, frozen banking, leaked health records, manipulated official documents. This chapter introduces the foundations of network security — the TCP/IP protocols and their weaknesses, the secure protocols that protect modern traffic, the certificates that anchor trust, the security goals that drive every design decision, the access-control mechanisms that gate who can do what, and the threat landscape and risk management approach that informs every defensive choice.

## 1.1 Overview of network security

### Network security

*Network security is the discipline that protects the integrity, confidentiality, and availability of computer networks and the data they carry, encompassing the policies, technologies, protocols, devices, and operational practices used to defend against unauthorised access, misuse, modification, destruction, and disruption.*

The discipline differs from cryptography (which provides primitives) and from information security broadly (which covers all information assets) by its focus on what happens between systems — the wires, radios, packets, and protocols that connect them.

### Why network security matters

Three converging trends have made network security central to modern operations.

**Everything is networked.** Twenty years ago a typical Nepali business had a few networked PCs in an office. Today it has cloud-hosted ERPs, customer-facing apps on AWS, IoT sensors in the factory, employee phones connecting from anywhere, and SaaS services for every function. The attack surface has expanded by orders of magnitude.

**Attackers are organised and capable.** Cybercrime is a multi-billion-dollar industry. Nation-state actors operate continuously. Even relatively small organisations face daily attempts. The 2017 NIC Asia SWIFT incident, the 2020 Foodmandu and Vianet breaches, the 2024 Government Integrated Data Centre DDoS, and the 2025 Ministry of Education and Nepal Police breaches each demonstrated different facets of this reality in Nepal.

**Regulatory pressure is rising.** Nepal Rastra Bank directives, the Electronic Transactions Act 2063, the Privacy Act 2075, sectoral regulators' requirements, customer contractual demands — all impose security obligations that have grown sharper through 2020-26.

### Categories of network attack

A practical catalogue:

**Reconnaissance.** Information gathering about a target — port scanning, service enumeration, social engineering preparation.

**Interception (passive).** Eavesdropping on traffic without modification. Wireless sniffing, taps on wired networks, ISP-level interception in adversarial scenarios.

**Modification (active).** Altering traffic in flight. Man-in-the-middle (MitM) attacks; injection of malicious content into otherwise-legitimate streams.

**Denial of service.** Disrupting availability. Volumetric DDoS (the 2024 GIDC attack), application-layer DoS, resource exhaustion.

**Authentication attacks.** Credential theft, brute force, replay, session hijacking.

**Lateral movement.** After initial compromise, expanding access within a network.

**Exfiltration.** Moving data out of the network to attacker-controlled destinations.

**Persistence.** Establishing footholds that survive reboots, patches, and partial cleanup.

Network security mechanisms address each of these categories with overlapping defences.

### Defence-in-depth

*Defence in depth is a security strategy that relies on multiple overlapping protective layers, so that the failure of any single layer does not result in catastrophic compromise — borrowing the term from medieval fortification doctrine where multiple walls, moats, and gates served as redundant defences.*

A modern enterprise network's defence-in-depth layers might include:

- Perimeter firewall blocking unauthorised inbound traffic.
- IDS/IPS detecting attack patterns.
- Network segmentation limiting lateral movement.
- Endpoint protection on every host.
- Authentication required for every access.
- Encryption protecting data in transit and at rest.
- Logging and monitoring detecting anomalies.
- Incident response capability containing damage.
- User awareness training reducing social-engineering success.

No single layer is sufficient. The combination is what provides resilience.

## 1.2 TCP/IP protocol suite and security

### The TCP/IP stack

The Internet runs on a four-layer model (also referenced as five-layer with the data link / physical split):

| Layer | Examples | Security concerns |
|---|---|---|
| Application | HTTP, FTP, SMTP, DNS, SSH | Application vulnerabilities, plaintext exposure |
| Transport | TCP, UDP | Connection hijacking, session attacks |
| Internet | IP, ICMP, IPsec | Source spoofing, routing attacks |
| Link | Ethernet, Wi-Fi, PPP | Sniffing, ARP poisoning, wireless eavesdropping |

Each layer has historical security weaknesses that secure replacements address.

### IPv4 — the unsecured baseline

IPv4 was designed in the 1970s without security in mind. The original packet format has no authentication of source, no integrity protection, and no confidentiality. Anyone who can see traffic can read it; anyone who can inject traffic can spoof a source address.

Specific weaknesses:

**IP source spoofing.** The source IP in a packet header is asserted by the sender; the network does not verify it. Attackers can forge source addresses for reflection, amplification, and impersonation attacks.

**Lack of encryption.** Plaintext payloads visible to any intermediate observer.

**No authentication.** No way to verify a packet came from the claimed source.

**Fragmentation issues.** Reassembly bugs and attacks on fragment handling.

**ICMP weaknesses.** Redirect attacks; smurf attacks (amplification); ping-of-death (historical).

### TCP weaknesses

**Sequence-number prediction.** Early TCP implementations used predictable initial sequence numbers; attackers could hijack sessions. Modern implementations use random sequence numbers.

**SYN flooding.** Half-open connections consume server resources; classic DoS attack.

**RST injection.** Forged TCP RST packets terminate connections.

**Connection hijacking.** Attackers in the path can inject data into established connections.

### UDP weaknesses

**Trivial spoofing.** Connectionless, no handshake, no sequence numbers — easy to forge sources.

**Amplification reflection.** Services that respond with more data than they receive (DNS, NTP, memcached, others) used by attackers to amplify DDoS.

### Application-layer issues

**DNS.** Cache poisoning; spoofed responses; queries leaking activity in plaintext.

**HTTP.** Plaintext credentials, session cookies, content.

**FTP.** Credentials sent in clear; data channel in clear.

**SMTP.** Plaintext credentials (historically); spoofed sender addresses; spam.

**Telnet.** Plaintext sessions including credentials.

### IPv6 security

IPv6 was designed with IPsec as a standard component (originally mandatory; relaxed to "should support" in later RFCs). The expectation that IPv6 would automatically be more secure than IPv4 has not been fully realised — IPsec usage in IPv6 has remained voluntary and is not universally deployed.

IPv6 brings its own concerns:
- Massive address space changes scanning economics but does not eliminate scanning.
- New protocols (NDP — Neighbour Discovery Protocol) have their own vulnerabilities.
- Dual-stack deployments expose both IPv4 and IPv6 surfaces.
- Tunnelling mechanisms (Teredo, 6to4) bypass network controls.

For Nepali networks, IPv6 deployment is limited; IPv4 with NAT remains dominant.

### Defending the TCP/IP stack

The historical response has been to add security through additional protocols at each layer:

- **Application:** HTTPS, SSH, S/MIME, SFTP.
- **Transport:** TLS provides session-layer security.
- **Network:** IPsec.
- **Link:** WPA2/WPA3 for wireless; MACsec for wired.

Modern networks combine these with monitoring, segmentation, and endpoint controls.

## 1.3 Secure network protocols — HTTPS, SSH, TLS/SSL

### HTTPS

*HTTPS (Hypertext Transfer Protocol Secure) is HTTP carried over a TLS-encrypted connection, providing confidentiality, integrity, and server authentication for web traffic, with optional client authentication and modern implementations supporting strong cipher suites and forward-secrecy key exchange.*

HTTPS is the dominant secure protocol on the modern internet. Through the late 2010s and into the 2020s, the web has moved from majority-HTTP to majority-HTTPS. Browser warnings on HTTP sites, free certificates from Let's Encrypt, and HTTP/2 / HTTP/3 (which essentially require HTTPS) have driven the shift.

For Nepali context: most major banking, e-commerce, and government sites now use HTTPS. The transition is largely complete; remaining HTTP sites are typically legacy or low-traffic.

**Operational considerations for HTTPS:**

- **Certificate management.** Provisioning, renewal, revocation (Section 1.4).
- **Protocol versions.** TLS 1.2 is the practical minimum; TLS 1.3 is preferred.
- **Cipher suites.** Strong ciphers only; insecure ones (RC4, 3DES, CBC modes with TLS 1.0) disabled.
- **HSTS (HTTP Strict Transport Security).** Forces browsers to use HTTPS for the site.
- **Certificate Transparency.** Logs of issued certificates allowing monitoring for unauthorised issuance.
- **OCSP stapling.** Efficient revocation checking.

### SSH

*Secure Shell (SSH) is the protocol that provides secure, authenticated, encrypted remote-shell access to servers and network devices, replacing the legacy Telnet, rlogin, and rsh protocols which transmitted credentials and commands in plaintext, becoming the standard for Unix/Linux remote administration and increasingly for network-device management.*

SSH was created in 1995 in response to a password-sniffing incident at Helsinki University of Technology; SSH2 (RFC 4251-4254, 2006) is the current standard. SSH provides:

- **Authentication.** Password-based, public-key-based (the recommended form), or various other methods (Kerberos, certificates).
- **Confidentiality.** Strong encryption of the session.
- **Integrity.** MAC protection of every packet.
- **Port forwarding (tunnelling).** Carrying arbitrary TCP connections through the SSH channel.
- **SFTP / SCP.** Secure file transfer.

**SSH key authentication** is preferred over passwords:

1. Generate a key pair on the client.
2. Place the public key in `~/.ssh/authorized_keys` on the server.
3. The private key (protected by a passphrase) is used for authentication.

Key-based authentication eliminates password risks and supports automation.

For Nepali enterprise environments, SSH is universal for Linux/Unix server administration and increasingly used for network-device management (replacing Telnet which remains in legacy environments).

### TLS / SSL

*Transport Layer Security (TLS), and its predecessor Secure Sockets Layer (SSL), is the cryptographic protocol that provides secure communication over a computer network, operating between the application and transport layers to provide authentication, confidentiality, and integrity, used by HTTPS, secure email (SMTPS, IMAPS, POP3S), secure databases, and many other protocols.*

The evolution:

- **SSL 1.0** (Netscape, 1995, never released).
- **SSL 2.0** (1995, broken).
- **SSL 3.0** (1996, broken — POODLE attack 2014).
- **TLS 1.0** (1999, deprecated).
- **TLS 1.1** (2006, deprecated).
- **TLS 1.2** (2008, still widely used).
- **TLS 1.3** (RFC 8446, 2018, modern standard).

As of 2026, TLS 1.2 and 1.3 are the operational versions. TLS 1.0 and 1.1 should be disabled; all versions of SSL are obsolete.

### TLS handshake (TLS 1.3)

The simplified flow:

1. Client sends ClientHello with supported cipher suites, key shares, extensions.
2. Server sends ServerHello with selected parameters, certificate, key share, signature.
3. Both sides derive shared secret using ECDH (Elliptic Curve Diffie-Hellman).
4. Encrypted application data flows.

TLS 1.3 reduces the handshake from 2-RTT (round trips) in TLS 1.2 to 1-RTT, with optional 0-RTT for resumption. Latency improvements are substantial for high-latency connections.

### Modern cipher suites

A modern strong TLS configuration as of 2026:

```
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_GCM_SHA256
```

These are TLS 1.3 suites — AEAD ciphers with no separately-negotiated key exchange or signature (those are negotiated separately in TLS 1.3).

For TLS 1.2, strong suites include:

```
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
```

ECDHE provides forward secrecy. AES-GCM and ChaCha20-Poly1305 provide AEAD.

Weak suites to disable: anything with NULL, EXPORT, DES, 3DES, RC4, MD5, or static RSA key exchange.

### Other secure protocols

**SMTPS / SMTP STARTTLS.** Email transport secured with TLS.

**IMAPS, POP3S.** Mail retrieval over TLS.

**DoH (DNS over HTTPS) and DoT (DNS over TLS).** DNS queries protected from on-path observation and tampering. Adoption has been progressive; widely supported by major resolvers and modern operating systems.

**FTPS / SFTP.** Secure file transfer (FTPS over TLS; SFTP via SSH).

**LDAPS.** LDAP over TLS for directory services.

**HTTPS-based protocols generally.** REST APIs, GraphQL, gRPC over HTTPS — the modern application-protocol pattern.

## 1.4 SSL certificates

### Digital certificate

*A digital certificate is an electronic document that binds a public key to an identity (such as a domain name, organisation, or individual), issued by a Certificate Authority that vouches for the binding, used by TLS and other protocols to establish trust in the entity holding the corresponding private key.*

The X.509 standard defines the format. A typical certificate contains:

- **Subject.** The identity being certified (e.g., "CN=*.esewa.com.np").
- **Issuer.** The Certificate Authority.
- **Validity period.** Not-before and not-after dates.
- **Public key.** The key being certified.
- **Serial number.**
- **Signature algorithm.**
- **Extensions.** Including Subject Alternative Names (SANs), key usage, basic constraints.
- **CA signature.** Cryptographic signature by the issuer.

### Certificate Authorities

*A Certificate Authority is a trusted entity that issues digital certificates, verifying the identity of certificate applicants according to its Certification Practice Statement (CPS), maintaining a trust hierarchy in which root CA certificates are distributed with operating systems and browsers, and signing intermediate and end-entity certificates beneath them.*

Major commercial CAs include DigiCert, Sectigo (formerly Comodo CA), GlobalSign, GoDaddy, Entrust. Free certificates are widely available from Let's Encrypt and similar projects.

For Nepal:
- Nepal does not have a widely-recognised national CA. Most Nepali sites use international CAs.
- The government has explored a national PKI; deployment has been gradual.
- Let's Encrypt is used by many smaller Nepali sites for free domain-validated certificates.
- Major banks and government sites typically use commercial CAs for organisation-validated (OV) or extended-validation (EV) certificates.

### Certificate types by validation

**Domain-validated (DV).** CA verifies only that the applicant controls the domain. Cheap or free; quick issuance.

**Organisation-validated (OV).** CA verifies that the organisation exists. Subject field includes verified organisation name. Costs more; takes longer.

**Extended-validation (EV).** Most thorough validation; CA verifies legal identity, physical existence, exclusive control. Historically distinguished by green-bar in browsers (no longer shown prominently in modern browsers).

**Multi-domain (SAN).** Single certificate covering multiple domains via Subject Alternative Names.

**Wildcard.** Covers all subdomains of a domain (e.g., `*.bank.com.np`).

### Certificate lifecycle

**Provisioning.** Generate key pair, create Certificate Signing Request (CSR), submit to CA, complete validation, install certificate.

**Renewal.** Standard 1-year validity in 2026 (reduced from 2 years in 2020 and shorter still in proposed CA/Browser Forum decisions). Some CAs and use cases support 90-day or shorter certificates with automation.

**Revocation.** CRLs (Certificate Revocation Lists) and OCSP (Online Certificate Status Protocol) provide revocation checking. OCSP stapling reduces client-side overhead.

**Key rotation.** Generate new key pair periodically; do not reuse private keys across renewals indefinitely.

**Expiration management.** Track expiry; automated renewal where possible. Expired certificates cause outages — among the most common operational incidents at major organisations globally.

### Operational concerns

**Certificate transparency.** Every issued certificate logged in public CT logs. Organisations monitor logs for unauthorised issuance against their domains.

**Pinning.** Some applications pin specific certificates or CAs, rejecting alternatives. Mobile-banking apps in Nepal often use certificate pinning to resist MitM attacks.

**Cipher and protocol policy.** Configurable; older versions and weak ciphers should be disabled.

**Mixed content.** Web pages over HTTPS that include HTTP resources weaken security.

**HSTS preloading.** Sites can be listed in browser HSTS preload lists, enforcing HTTPS from first connection.

### Certificate management at scale

For organisations with many certificates (large banks, telecoms, multi-domain enterprises), manual management is impractical. Tools include:

- **HashiCorp Vault.** Secret management including PKI.
- **AWS Certificate Manager (ACM).** Free certificates for AWS-hosted services.
- **Azure Key Vault.**
- **certbot, acme.sh.** ACME-protocol clients for Let's Encrypt.
- **Cisco ISE, Microsoft AD CS.** Internal PKI for enterprise.

Modern operations treats certificate lifecycle as code — automated provisioning, monitoring, renewal, rotation.

## 1.5 Security goals — Confidentiality, Integrity, Availability

The classical security goals, applied to network security.

### Confidentiality

*Confidentiality is the property of information that ensures it is not disclosed to unauthorised parties, maintained through access controls, encryption of data at rest and in transit, secure protocols for communication, and physical security of the systems and infrastructure storing or processing the data.*

Network mechanisms for confidentiality:
- **Encryption in transit.** TLS, IPsec, SSH, WPA3.
- **Access controls.** Network ACLs, firewall rules limiting who can reach what.
- **Segmentation.** Containing exposure to specific network regions.
- **Tunnelling.** VPNs hiding traffic from intermediate networks.

Common confidentiality failures: unencrypted protocols still in use (HTTP, Telnet, FTP); weak ciphers; misconfigured TLS; logs leaking sensitive data; backups stored unencrypted.

### Integrity

*Integrity is the property of information and systems that ensures their accuracy, completeness, and unaltered state, maintained through cryptographic hashes, digital signatures, message authentication codes, version control, and operational controls that prevent unauthorised modification.*

Network mechanisms for integrity:
- **MACs and AEAD.** TLS, IPsec ESP, SSH all include integrity protection.
- **Digital signatures.** Used in certificates, code signing, DKIM (email).
- **Hash verification.** Software downloads verified against published hashes.
- **DNSSEC.** DNS records signed by issuing authority.

Integrity failures: protocols without integrity protection (very few modern ones); compromised certificates allowing impersonation; tampered software updates; modified network device configurations.

### Availability

*Availability is the property of information and systems that ensures they are accessible to authorised users when needed, maintained through redundancy, fault tolerance, capacity planning, denial-of-service protection, and operational practices that detect and respond to disruption.*

Network mechanisms for availability:
- **Redundancy.** Multiple paths, multiple devices, multiple sites.
- **DDoS protection.** Upstream scrubbing, traffic limiting.
- **Capacity.** Sufficient bandwidth and processing.
- **Monitoring and response.** Detection and rapid action when problems occur.

The 2024 GIDC DDoS that took 400+ government services offline was a major availability incident. The mitigation lessons applied across Nepali government and critical-infrastructure operations through 2024-26 emphasise availability protection.

### Extending the triad

Several additional properties are commonly added:

**Authenticity.** Information is genuine; sources are who they claim. Authentication mechanisms support this.

**Non-repudiation.** Actors cannot credibly deny having taken actions. Digital signatures and logging support this.

**Accountability.** Actions traceable to specific actors. Identity-based access and audit logs.

Combined, the properties are sometimes labeled CIANA (Confidentiality, Integrity, Availability, Non-repudiation, Authentication) or AAA (Authentication, Authorization, Accounting).

### Trade-offs

The goals can conflict:

- **Confidentiality vs availability.** Encryption complexity can introduce failure modes that affect availability.
- **Integrity vs availability.** Strict integrity checks (rejecting tampered packets) can be exploited to deny service.
- **All three vs usability.** Security controls add friction; excessive controls reduce productivity.

Design balances goals in light of risk.

## 1.6 Access control, authentication, authorization

### Authentication

*Authentication is the process of verifying that an entity (user, device, service) is who or what it claims to be, providing the foundational identity assertion on which authorisation decisions can be made.*

Authentication factors:
- **Something you know.** Password, PIN, passphrase, security question.
- **Something you have.** Hardware token, smart card, mobile device, certificate.
- **Something you are.** Biometric — fingerprint, face, iris, voice.
- **Somewhere you are.** Location-based context.
- **Something you do.** Behavioural biometric — typing rhythm, mouse movement.

**Multi-factor authentication (MFA)** combines two or more factors. Standard for any access of consequence in modern networks.

Common MFA implementations in Nepali context:
- **SMS OTP.** Widely used despite known vulnerabilities (SIM-swap attacks).
- **Mobile authenticator apps.** Google Authenticator, Microsoft Authenticator. Stronger than SMS.
- **Push notifications.** Duo, Okta Verify. User-friendly; requires connectivity.
- **FIDO2 / WebAuthn.** YubiKey, mobile-device biometrics as authenticators. Strongest; phishing-resistant.

### Authorisation

*Authorisation is the process of determining what an authenticated entity is permitted to do, applying policy rules to grant or deny specific access to resources or actions.*

Authorisation models:

**Discretionary access control (DAC).** Resource owners decide who can access. Common in file systems.

**Mandatory access control (MAC).** System-enforced policy based on classifications. Used in high-security environments.

**Role-based access control (RBAC).** Permissions assigned to roles; users assigned to roles. The dominant model in enterprise systems.

**Attribute-based access control (ABAC).** Decisions based on attributes of user, resource, action, and context. More flexible than RBAC.

**Policy-based access control (PBAC).** Decisions made by policy engine evaluating multiple inputs. The modern direction.

### AAA frameworks

*AAA (Authentication, Authorization, Accounting) is the framework of three related security functions that together provide controlled access — authentication verifies identity, authorisation determines permitted actions, and accounting records what was done — typically implemented in network systems through protocols like RADIUS, TACACS+, and Diameter.*

**RADIUS (Remote Authentication Dial-In User Service).** UDP-based protocol used for network access (Wi-Fi, VPN, 802.1X). FreeRADIUS is the common open-source implementation. Microsoft NPS (Network Policy Server) is the Windows-native equivalent.

**TACACS+ (Terminal Access Controller Access-Control System Plus).** TCP-based; Cisco origin but standardised. Separates AAA functions (RADIUS combines authentication and authorisation). Common for network-device management.

**Diameter.** Successor to RADIUS, used in modern telecom contexts including 4G/5G.

### Network access control (NAC)

*Network Access Control is the set of technologies that enforce access policies at the point of network attachment, evaluating the identity and posture (security state) of devices and users before allowing or restricting access, ensuring that only compliant devices and authorised users connect to protected networks.*

NAC typically uses 802.1X with RADIUS:
- The user/device authenticates via 802.1X.
- RADIUS server makes authentication and authorisation decisions.
- The switch port is placed in the appropriate VLAN.
- Posture assessment (patch level, antivirus, OS version) may further restrict access.

Commercial NAC products: Cisco ISE, Aruba ClearPass, Forescout. Open-source: PacketFence.

For Nepali bank networks, NAC is increasingly standard, particularly after NRB directives emphasised access control and segmentation following high-profile incidents.

## 1.7 Threat landscape and risk management

### Threat landscape

The set of threats facing an organisation, mapped against the assets at risk. Evolves continuously.

### Categories of threat actors

**Cybercriminals.** Financially motivated. Ransomware groups, banking-trojan operators, BEC fraudsters, carders. Most common attacker type by volume.

**Nation-state actors.** Strategic motivation. Espionage, sabotage, positioning. Higher capability; targeted. Several nation-state groups have been publicly identified as conducting operations against South Asian targets including Nepal.

**Hacktivists.** Ideologically motivated. Various Nepali websites have been defaced or briefly compromised by hacktivist groups over the years.

**Insider threats.** Current or former employees, contractors. Malicious or negligent.

**Script kiddies.** Low-skill attackers using available tools. High volume; low individual impact but cumulative effect.

**Competitors.** Industrial espionage. Less common but real for organisations with valuable IP.

### Specific recent threats relevant to Nepal

**Banking-trojan APKs.** Malicious Android apps targeting eSewa, Khalti, IME Pay, mobile-banking users. Distributed via SMS phishing, fake app stores.

**Phishing campaigns.** Email- and SMS-based. Generic phishing as well as targeted spear-phishing against bank employees and government officials.

**Credential-stuffing attacks.** Reuse of credentials from external breaches against Nepali services.

**DDoS.** The 2024 GIDC incident is one example; smaller incidents are continuous.

**Supply chain.** Compromised software vendors, dependency chains.

**Insider threats.** Documented in several past Nepali bank incidents; often unreported publicly.

### Risk management

*Risk management is the coordinated process of identifying, assessing, treating, and monitoring risks to organisational assets, with the goal of bringing risks within the organisation's appetite at acceptable cost, integrating with broader governance and operational frameworks.*

Discussed at length in the Information Systems Audit subject Chapter 3. From the network-security operational perspective:

**Identify.** What assets exist; what threats face them; what vulnerabilities create exposure.

**Assess.** Likelihood and impact for each risk; prioritise.

**Treat.** Mitigate (apply controls), transfer (insurance, outsourcing), accept (document), or avoid (cease the activity).

**Monitor.** Watch for changes in risk; adjust treatment.

### From risk to operational controls

The link between risk assessment and concrete operational measures:

- Identified risk of email-based phishing → deploy email security gateway, anti-phishing training, MFA.
- Identified risk of DDoS → arrange upstream scrubbing service, increase bandwidth headroom.
- Identified risk of credential theft → enforce MFA, deploy EDR, increase logging.
- Identified risk of insider data theft → deploy DLP, segment access, increase monitoring.

The operational network-security programme is the implementation of risk-treatment decisions.

### Threat intelligence

*Threat intelligence is the collected, analysed, and actionable information about adversaries, their capabilities, motivations, and methods, used by defenders to inform detection rules, response procedures, and strategic security decisions.*

Sources:
- **Commercial feeds.** Mandiant, CrowdStrike, Recorded Future, Group-IB, others.
- **Government and CERT feeds.** US CISA advisories, npCERT advisories, regional CERTs.
- **Open-source intelligence.** ThreatFox, AbuseIPDB, AlienVault OTX, MISP communities.
- **Industry sharing.** Banking ISACs, sector-specific groups. Banking-sector sharing in Nepal is informal but growing.
- **Internal observations.** What the organisation itself sees.

Threat intelligence feeds into:
- Detection rules in firewalls, IDS, SIEM.
- Blocklists.
- Incident-response playbooks.
- Strategic prioritisation.

### MITRE ATT&CK

*MITRE ATT&CK is a publicly-available, globally-referenced knowledge base of adversary tactics and techniques observed in real-world attacks, organised by tactic (the attacker's goal) and technique (the method), used by defenders for detection engineering, gap analysis, and threat-informed defence.*

The framework organises attacker behaviour:
- 14 tactics — Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.
- Many techniques and sub-techniques under each tactic.
- Mappings to threat groups and software.

ATT&CK has become the lingua franca of modern threat-informed defence. Detection engineering refers to ATT&CK techniques; SOC capability is benchmarked against ATT&CK coverage; incident reports use ATT&CK terminology.

For an MSc student building network-security expertise, deep familiarity with ATT&CK is foundational. The next chapter takes these foundations into the specific domain of VPN design, implementation, and management — one of the most-deployed and most-managed security technologies in any enterprise network.
