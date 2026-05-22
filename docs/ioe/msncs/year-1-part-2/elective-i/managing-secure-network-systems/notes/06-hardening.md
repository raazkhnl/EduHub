---
title: 'Chapter 6 — Hardening Network Infrastructure'
sidebar_label: 'Ch 06 — Hardening Network Infrastructure'
sidebar_position: 6
description: 'Chapter 6 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch06
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

A network device — switch, router, firewall, wireless controller, load balancer — ships from the vendor with a default configuration that emphasises ease of initial setup, not security. Default credentials, unnecessary services enabled, weak protocols permitted, verbose error messages, debug features active. The discipline of hardening transforms a default configuration into a secure one. This chapter covers the applications of hardening, the configuration discipline that achieves it, the logging and reporting that make hardening verifiable, and the industry standards that codify hardening practice.

## 6.1 Applications of hardening

### Hardening

*Hardening is the systematic process of reducing the attack surface of a computing system, network device, or application by removing or disabling unnecessary functions, restricting access to required functions, configuring security features appropriately, and applying the manufacturer's and industry's recommended secure-configuration practices.*

The principle: a service not running cannot be exploited; a credential not weak cannot be guessed; a configuration option not vulnerable cannot be a vector.

### Why hardening matters

A default-configured device typically has:

- Default administrative credentials (often documented publicly).
- Multiple management protocols enabled (Telnet, SSH, HTTP, HTTPS, SNMP).
- Unnecessary services (some routers ship with HTTP server, TFTP server, DHCP server enabled regardless of need).
- Weak cryptographic defaults.
- Verbose error messages revealing internal information.
- Permissive ACLs that need to be tightened.
- Default SNMP community strings.

Each is a potential attack vector. The 2024 GIDC incident and the 2025 Nepal Police breach both involved infrastructure with weakly-configured public exposure. Hardening would have removed many of the conditions that made those incidents possible.

### Categories of hardening

**Network device hardening.** Routers, switches, firewalls, wireless controllers. The focus of this chapter.

**Operating system hardening.** Server and workstation OS hardening. Linux kernel hardening, Windows Server hardening, Group Policy enforcement.

**Application hardening.** Web servers, databases, applications. Secure configuration of each.

**Cloud configuration hardening.** Hardening of cloud services (Chapter 7).

**Container hardening.** Container images and runtime configuration.

### Hardening targets in a network

Specific devices and their hardening needs:

**Routers.** Management interface lockdown; routing protocol authentication; ACL on management; CoPP (Control Plane Policing).

**Switches.** Port security; 802.1X; BPDU guard; DHCP snooping; dynamic ARP inspection; storm control; disable unused ports.

**Firewalls.** Default-deny policy; logging; restricted management; admin access via specific interface only.

**Wireless controllers and APs.** Strong management credentials; encrypted management protocols; rogue detection enabled.

**Load balancers.** Secure SSL/TLS configuration; access restrictions; logging.

**SAN switches.** Zoning; access controls.

**Network management systems.** Strong access controls; segregated management network.

### Hardening as an ongoing process

Hardening is not a one-time task. The discipline includes:

- **Initial hardening.** When a device is first deployed.
- **Maintenance hardening.** Patches, configuration drift detection, re-hardening after changes.
- **Compliance verification.** Periodic checks that hardening remains in place.
- **Vulnerability response.** New CVEs may require additional hardening steps.
- **Decommissioning.** Secure removal when devices are retired.

## 6.2 Configuration of hardening

### Specific hardening practices for network devices

The detailed configuration practices that constitute hardening.

### Management access

**Disable Telnet.** Plaintext protocol. Replace with SSH.

```
no transport input telnet
transport input ssh
```

**Enforce SSH version 2.** Version 1 has known weaknesses.

```
ip ssh version 2
```

**Disable HTTP management.** Use HTTPS only.

```
no ip http server
ip http secure-server
```

**Restrict management access to specific source addresses.**

```
access-list 99 permit 10.10.10.0 0.0.0.255
access-list 99 deny any log

line vty 0 4
 access-class 99 in
 transport input ssh
 login local
 exec-timeout 10 0
```

This allows SSH only from 10.10.10.0/24; everything else is denied and logged. Sessions time out after 10 minutes of inactivity.

**Use individual user accounts.** Avoid shared admin credentials. Each administrator has their own account.

```
username alice secret 9 $9$randomhash...
username bob secret 9 $9$randomhash...
```

Use the strongest password-hashing algorithm available (Type 9 / SCRYPT on Cisco IOS; equivalent on other vendors).

**Enable AAA.** Centralised authentication via RADIUS or TACACS+.

```
aaa new-model
aaa authentication login default group tacacs+ local
aaa authorization exec default group tacacs+ local
aaa accounting exec default start-stop group tacacs+
```

### Service hardening

**Disable unused services.**

```
no service tcp-small-servers
no service udp-small-servers
no service finger
no service config
no ip identd
no cdp run    (or selectively)
no lldp run   (or selectively)
no ip http server
no ip http secure-server  (if HTTPS management not used)
no boot host
no boot network
```

**Restrict SNMP.** Use SNMPv3 with authentication and encryption; disable SNMPv1/v2c if possible.

```
snmp-server view OPERATOR iso included
snmp-server group ADMIN v3 priv read OPERATOR
snmp-server user noc-admin ADMIN v3 auth sha NetMonAuth! priv aes 256 NetMonPriv!
no snmp-server community public
no snmp-server community private
```

### Console and AUX hardening

**Console access restricted; AUX port disabled if not used.**

```
line con 0
 login local
 exec-timeout 10 0
 logging synchronous

line aux 0
 no exec
 transport input none
```

### Routing protocol authentication

Routing protocols can be exploited if not authenticated. Configure authentication on all routing protocols.

For OSPF:

```
interface GigabitEthernet0/0
 ip ospf authentication message-digest
 ip ospf message-digest-key 1 md5 OSPFAUTH!
```

For EIGRP:

```
key chain EIGRP-AUTH
 key 1
  key-string EIGRPAUTH!

interface GigabitEthernet0/0
 ip authentication mode eigrp 100 md5
 ip authentication key-chain eigrp 100 EIGRP-AUTH
```

For BGP, MD5 authentication on neighbours; modern recommendation is TCP-AO (TCP Authentication Option).

### Switch-specific hardening

**Port security.** Limit MAC addresses per port; shut down on violation.

```
interface GigabitEthernet0/1
 switchport port-security
 switchport port-security maximum 1
 switchport port-security violation shutdown
 switchport port-security mac-address sticky
```

**BPDU guard.** Protect against rogue switches sending Spanning Tree BPDUs.

```
interface GigabitEthernet0/1
 spanning-tree portfast
 spanning-tree bpduguard enable
```

**DHCP snooping.** Prevent rogue DHCP servers.

```
ip dhcp snooping
ip dhcp snooping vlan 10,20,30

interface GigabitEthernet0/24
 ip dhcp snooping trust
```

**Dynamic ARP inspection.** Prevent ARP poisoning.

```
ip arp inspection vlan 10,20,30
```

**Storm control.** Prevent broadcast storms.

```
interface GigabitEthernet0/1
 storm-control broadcast level 1.00
 storm-control multicast level 5.00
```

**Disable unused ports.** Administrative shutdown of ports not in use.

```
interface range GigabitEthernet0/24-48
 shutdown
 description Unused - disabled
```

### Firewall-specific hardening

Beyond the policy structure (Chapter 3):

- Default-deny last rule.
- All admin access via management interface only.
- Strong cryptographic configuration for VPN.
- Software up to date.
- Unused features disabled (e.g., if the device offers Web UI but management is via API, disable the Web UI).

### Wireless-specific hardening

Beyond the protocol selections (Chapter 5):

- Disable WPS.
- Disable management via wireless.
- Disable any "guest mode" features.
- Hide management VLAN from wireless users.

### Configuration management

Hardening should be codified, not done device-by-device manually. Modern practice:

**Templates.** Standardised configuration for each device class.

**Configuration management tools.** Ansible, Puppet, Chef, SaltStack for network devices; vendor-specific tools (Cisco Prime, Cisco DNA Center, Aruba AirWave, FortiManager).

**Network as code.** Configurations in version-controlled repositories; changes via pull request and CI/CD.

**Compliance scanning.** Tools that check actual configuration against expected (Cisco Compliance, Nipper, vendor-native tools).

### Configuration drift

A hardened device gradually drifts from its hardened state:

- Manual changes during troubleshooting.
- Quick fixes that bypass the standard.
- Emergency changes with reduced rigour.
- Personnel changes affecting institutional knowledge.

Periodic configuration audits catch drift. Configuration-management tools that detect and report on changes from a baseline are increasingly standard.

## 6.3 Logging and reporting

### Logging on network devices

Hardened devices log security-relevant events.

### What to log

**Authentication events.** Logins (successful and failed); privilege escalations.

**Configuration changes.** Who, what, when.

**Interface state changes.** Up/down events.

**Routing changes.** Neighbour relationships; protocol-level events.

**ACL violations.** Denied traffic (selectively to manage volume).

**System events.** Reboots, errors, capacity events.

**Security events.** Threats detected by integrated features.

### Logging destinations

**Local logging.** On the device itself. Limited storage; lost on reboot.

**Remote logging.** To a syslog server. Centralised; persistent; analytics-capable.

**SIEM forwarding.** From syslog server (or directly) to SIEM.

Standard practice: log locally for debugging convenience plus remote logging to syslog server and SIEM.

### Syslog configuration

For Cisco IOS:

```
logging buffered 16384 informational
logging trap informational
logging facility local6
logging host 10.10.10.100 transport udp port 514

service timestamps log datetime msec localtime show-timezone
service sequence-numbers
```

Modern best practice uses TCP syslog (more reliable) or syslog-over-TLS:

```
logging host 10.10.10.100 transport tcp port 514 secure
```

### Time synchronisation

All devices must have synchronised time. NTP configuration on every device.

```
ntp server 10.10.10.10 prefer
ntp server 10.10.10.11

ntp source Loopback0
ntp authentication
ntp authentication-key 1 md5 NTP-AUTH!
ntp trusted-key 1
ntp server 10.10.10.10 key 1 prefer
```

Without synchronised time, log correlation across devices is unreliable — events appear out of order or impossible to align. Standard practice: dedicated NTP servers for internal devices; external NTP sources or hardware time references at the top of the hierarchy.

### Reporting

What the logging supports:

**Operational reporting.** Daily/weekly operational metrics.

**Security reporting.** Security events for review.

**Compliance reporting.** Evidence for regulatory reporting (NRB directives, audit requirements).

**Incident reporting.** Detailed timeline for incident response.

**Management reporting.** Trend analysis, capacity, performance.

### Log retention

The retention period depends on regulation and operational needs:

- **NRB-regulated banks.** Multi-year retention for many log types.
- **PCI-DSS environments.** At least one year online with three months immediately retrievable.
- **General enterprise.** Often 90 days online with archival to longer periods.

The cost of long-term retention has dropped substantially with cloud storage and object storage; multi-year retention is increasingly affordable.

## 6.4 Best practices and industry standards

### Industry-standard hardening guides

Several authoritative sources for hardening practices:

**CIS Benchmarks.** The Center for Internet Security publishes detailed configuration guides for specific products. CIS Cisco IOS Benchmark, CIS Cisco NX-OS Benchmark, CIS Juniper Junos Benchmark, CIS Wi-Fi benchmarks, and many more. The benchmarks are detailed, technical, and updated regularly.

**NIST Special Publications.** Specific guides like NIST SP 800-53 (controls catalogue) and NIST SP 800-153 (wireless guidelines).

**Vendor security guides.** Cisco's Network Security Baseline, Cisco IOS Security Configuration Guide; Juniper's Hardening Guides; Fortinet's Hardening Guides.

**NSA / CISA guides.** NSA Network Infrastructure Security Guide; CISA's various advisories.

**DISA STIGs.** US Defense Information Systems Agency Security Technical Implementation Guides. Highly detailed; widely-referenced even outside the DoD context.

For Nepali bank hardening, the typical reference is a combination — CIS Benchmarks as the technical baseline, vendor guides for product specifics, and NRB directives for sector-specific requirements.

### Compliance frameworks

Hardening standards are often required by compliance:

- **NRB directives.** Banks must demonstrate hardening.
- **PCI-DSS Requirement 2.** "Apply secure configurations to all system components."
- **ISO 27001 Annex A.8.9.** Configuration management.
- **HIPAA, GDPR, others.** Indirect requirements.

The compliance angle motivates investment in hardening that operations alone might not.

### Best practices summary

**Principle of least functionality.** Disable everything not needed.

**Strong authentication.** No default credentials; AAA centralisation; MFA for admin access.

**Encrypted management.** SSH/HTTPS/SNMPv3.

**Restricted access.** Management from specific source addresses only.

**Comprehensive logging.** With central forwarding and adequate retention.

**Synchronised time.** NTP everywhere.

**Patching discipline.** Security updates applied promptly.

**Configuration management.** Templates, version control, automated deployment.

**Periodic audit.** Compliance verification against baselines.

**Documentation.** What hardening was applied; why; when.

### Automation and infrastructure as code

Modern operations treats network configuration as code:

- Configurations in Git repositories.
- Changes proposed via pull request, reviewed, approved.
- Deployment via automation (Ansible playbooks, vendor-specific orchestration).
- Drift detection automated.
- Compliance reporting automated.

The discipline that this brings — version history, peer review, repeatability — is what large modern networks rely on.

### Common findings in hardening audits

Recurring observations in Nepali bank IS audits:

- Default credentials retained on some less-prominent devices.
- Telnet enabled alongside SSH.
- SNMPv1/v2c with default community strings still configured.
- Configuration drift from documented baselines.
- Unused ports not disabled.
- Console access not restricted.
- AUX port enabled and not restricted.
- Management VLAN not properly isolated.
- Routing protocol authentication missing.
- Logs going to a server but not forwarded to SIEM.
- NTP misconfigured or unauthenticated.
- Outdated firmware on infrastructure devices.

Each finding becomes a remediation action. Tracking remediation through to completion is what closes the audit loop.

The next chapter shifts to a frontier where many of these network-security principles take new forms — cloud security and virtualisation.
