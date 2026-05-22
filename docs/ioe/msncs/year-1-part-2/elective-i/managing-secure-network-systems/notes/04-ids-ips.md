---
title: 'Chapter 4 — Intrusion Detection and Prevention Systems (IDS/IPS)'
sidebar_label: 'Ch 04 — Intrusion Detection and Prevention Systems (IDS/IPS)'
sidebar_position: 4
description: 'Chapter 4 of Managing Secure Network Systems (ENCTNS562).'
slug: /ioe/msncs/year-1-part-2/elective-i/managing-secure-network-systems/notes/ch04
tags: [msncs, ENCTNS562, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

If the firewall is the gatekeeper deciding what traffic crosses zone boundaries, the IDS/IPS is the watcher and the responder — observing traffic that the firewall permits, looking for indicators of attack, and (in the IPS form) blocking what it identifies as malicious. The two technologies are complementary: the firewall enforces policy on allowed flows; the IDS/IPS detects attacks within those allowed flows. This chapter covers IDS and IPS fundamentals, the inline and promiscuous deployment models, the signature-based and anomaly-based detection approaches, and the deployment strategies that determine where and how these systems are positioned in a network.

## 4.1 Introduction to IDS and IPS

### IDS

*An Intrusion Detection System is a network-security technology that monitors traffic, system activity, or both for indications of malicious behaviour or policy violations, generating alerts for security analysts to investigate while not directly taking action to block the observed activity.*

The earliest IDS work dates to the 1980s — Dorothy Denning's "An Intrusion-Detection Model" paper (1986) is a foundational reference. Commercial IDS products emerged through the 1990s, with the open-source Snort project (Marty Roesch, 1998) becoming the most widely-used.

The defining property: IDS observes and reports; it does not act. Decisions about response are made by humans or by other systems.

### IPS

*An Intrusion Prevention System is a security technology that performs the detection function of an IDS while also having the ability to actively block, drop, or otherwise interfere with traffic identified as malicious, positioned inline in the network path so that its blocking decisions can be enforced in real time.*

IPS evolved as IDS deployments showed that detection without prevention had limits — by the time a human analyst reviewed an alert, the attack might already have succeeded. IPS positions the detection capability inline, allowing automated blocking.

### IDS vs IPS — operational distinction

| Aspect | IDS | IPS |
|---|---|---|
| Action | Alert only | Alert and block |
| Network position | Passive (out-of-band) | Inline |
| Failure mode | No impact on traffic | Can block legitimate or fail open |
| False-positive impact | Wasted analyst time | Blocked legitimate traffic |
| Performance impact | None | Latency added |
| Risk tolerance | Higher (alerts can be missed) | Lower (blocking is committal) |
| Operational tuning | Important | Critical |

### Categories by location

**Network-based (NIDS/NIPS).** Monitors network traffic at chosen capture points. Sees what passes the network; does not see encrypted-payload content without decryption.

**Host-based (HIDS/HIPS).** Monitors activity on a single host. Sees process activity, file accesses, registry changes, log entries on that host. Modern endpoint detection and response (EDR) products are descendants of HIDS.

**Hybrid (network + host).** Combined visibility.

A mature security architecture uses both. NIDS/NIPS at network perimeters and internal segmentation points; HIDS/HIPS (or EDR) on critical endpoints.

### What IDS/IPS detects

Categories of detected activity:

**Known exploits.** Pattern-matching against signatures of published vulnerabilities. CVE-numbered exploits often have associated IDS rules.

**Malicious commands.** Recognising attacker tools and commands — exploitation frameworks, post-exploitation utilities, command-and-control beacons.

**Protocol anomalies.** Packets that don't conform to RFC specifications; often used in evasion attempts.

**Policy violations.** Traffic matching explicitly-prohibited patterns — known-bad domains, prohibited protocols, traffic to sensitive destinations.

**Behavioural anomalies.** Statistical deviations from baseline — sudden traffic surge, unusual destination patterns, off-hours activity.

**Reputation-based.** Traffic to or from IPs/domains with known-bad reputation in threat intelligence.

### IDS/IPS in the broader security architecture

IDS/IPS does not work in isolation. It integrates with:

- **Firewall.** Coordinated controls; sometimes integrated as features of NGFW.
- **SIEM.** Alerts forwarded for correlation and analyst review.
- **EDR.** Endpoint visibility complementing network visibility.
- **Threat intelligence.** Feeds informing detection rules.
- **Incident response.** Detected events trigger response procedures.
- **Network operations.** Performance and capacity monitoring.

The combined fabric — sometimes called Extended Detection and Response (XDR) — provides the visibility no single component delivers.

### Nepal context

For Nepali enterprises:

- **Major banks** deploy NIDS/NIPS at perimeter and at internal segments; EDR on endpoints; SIEM correlating both.
- **Telecoms** deploy at scale across their infrastructure.
- **Government** deployment varies; the 2024 GIDC DDoS incident, the 2025 MoE and Nepal Police incidents prompted attention to detection capability.
- **Smaller organisations** rely on basic detection from firewalls or none at all.
- **npCERT** plays a role in monitoring nationally-significant traffic patterns.

The maturity gap between major regulated entities and the broader Nepali organisational landscape is substantial. Recent regulatory directives have pushed broader deployment.

## 4.2 Types of IDS/IPS, inline and promiscuous deployment

### Network-based IDS/IPS

The technology embedded in a network device or appliance. Operates by inspecting traffic in flight.

**NIDS deployment:**
- Connected to a SPAN/mirror port on a switch, receiving a copy of traffic.
- Or connected to a network tap, providing a passive split of traffic.
- Inspects but cannot affect traffic.

**NIPS deployment:**
- Connected inline in the traffic path. All traffic passes through.
- Can drop, modify, or block packets identified as malicious.
- Fail-open (traffic passes if IPS fails) or fail-closed (traffic blocked if IPS fails) — design choice.

### Host-based IDS/IPS

Software running on individual hosts. Examines local activity.

**HIDS capability:**
- File integrity monitoring.
- Process activity monitoring.
- Log analysis.
- Network connection observation (from the host's perspective).
- Registry monitoring (Windows).

**HIPS capability:**
- All of the above plus.
- Process termination.
- File access blocking.
- Network connection blocking.
- Behaviour-based prevention.

Modern EDR products (Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne, Carbon Black, Sophos Intercept X) are essentially HIPS with substantial additional capability — telemetry, threat hunting, response orchestration.

### Promiscuous mode deployment

*Promiscuous mode is a network interface configuration in which the interface receives and processes all packets visible on the network segment, regardless of their destination address, enabling passive monitoring of traffic without participating in it.*

A NIDS in promiscuous mode:
- Receives copies of packets via a tap or SPAN port.
- The original packets continue unaffected.
- The IDS examines copies; alerts are generated independently.
- No impact on production traffic possible.

This is the safest deployment from an operational reliability standpoint. The IDS can fail, be reconfigured, or be restarted without affecting traffic.

### Inline deployment

*Inline deployment is the network-security configuration in which a security device is placed directly in the traffic path between two network segments, so that all traffic between them passes through the device, enabling the device to inspect and act on the traffic in real time.*

A NIPS inline:
- All traffic between the two segments passes through.
- Detected attacks can be blocked by dropping the offending packets.
- Inevitably introduces some latency (though typically small with modern hardware).
- Device failure affects traffic — fail-open or fail-closed behaviour matters.

### Comparison

| Aspect | Promiscuous (out-of-band) | Inline |
|---|---|---|
| Position | Off the traffic path | In the traffic path |
| Capability | Detection only | Detection and prevention |
| Failure impact | None | Possible traffic disruption |
| Latency | None | Small |
| Visibility | Same as captured traffic | Same |
| Risk | Low | Higher (false positives block legitimate) |
| Use case | Monitoring; alerting | Active defence |

### Hybrid deployment

In practice, many organisations deploy a mix:

- **NIPS inline at the perimeter.** Active blocking of inbound attacks.
- **NIDS promiscuous on internal segments.** Visibility into east-west traffic without operational risk.
- **EDR on endpoints.** Host-level detection and response.
- **Specific IPS deployments** for high-value internal traffic where prevention is warranted.

The architecture decision balances detection coverage, prevention capability, operational risk, and cost.

## 4.3 Signature-based and anomaly-based detection

### Signature-based detection

*Signature-based detection is the technique of identifying malicious activity by matching observed traffic or events against a database of pre-defined patterns (signatures) representing known attacks, exploits, malware behaviours, and indicators of compromise.*

A signature might match:
- HTTP requests containing a specific URL path used by a known web shell.
- Network packets containing the byte sequence of a particular exploit.
- DNS queries for known malicious domains.
- Specific user-agent strings of known malware.
- File hashes of known malicious files.

**Snort rule example:**

```
alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
  msg:"Possible SQL injection attempt";
  content:"' OR 1=1";
  nocase;
  classtype:web-application-attack;
  sid:1000001;
  rev:1;
)
```

This rule fires when an HTTP request to an internal host contains the string `' OR 1=1` (a classic SQL injection pattern).

### Strengths and weaknesses

**Strengths:**
- High precision for known threats. Low false-positive rate.
- Fast matching with modern engines.
- Easy to understand specifically what is detected.
- Sharable across organisations.

**Weaknesses:**
- Only catches known threats. Zero-days and novel attacks bypass.
- Requires regular signature updates.
- Volume of signatures grows large; performance impact.
- Easy for sophisticated attackers to modify their tools just enough to evade specific signatures.

### Signature sources

- **Vendor feeds.** Commercial IDS/IPS products come with signature subscriptions.
- **Snort Subscription Rule Set.** Commercial Snort rules from Talos (Cisco's threat intelligence team).
- **Emerging Threats Open.** Free community rule set.
- **Emerging Threats Pro.** Commercial extension.
- **Custom rules.** Organisation-specific rules for internal threats.

### Anomaly-based detection

*Anomaly-based detection identifies suspicious activity by comparing observed behaviour against a model of normal behaviour, flagging deviations that may indicate attack, distinct from signature-based detection which requires the attack pattern to be known in advance.*

**Baseline construction:**
- Statistical models of normal traffic — protocols, volumes, destinations, timing.
- Machine learning models trained on traffic samples.
- Behavioural profiles of users, hosts, applications.

**Anomaly examples:**
- A sudden 10x increase in outbound traffic from a host.
- An internal host connecting to unusual external destinations.
- A workstation running unusual processes at 2 AM.
- A user authenticating from a country they've never been in before.
- A volume of DNS queries to a single domain far above baseline.

### Strengths and weaknesses

**Strengths:**
- Catches novel attacks signature-based misses.
- Adapts to environmental changes (with proper baseline maintenance).
- Surfaces unexpected activity that signatures wouldn't characterise.

**Weaknesses:**
- Higher false-positive rate. Legitimate but unusual activity flagged.
- Baseline drift over time; legitimate changes look anomalous.
- Difficult to explain why something was flagged ("the model said so").
- Vulnerable to slow, gradual attacks that look like baseline drift.

### Behaviour-based / ML detection

A subset of anomaly detection using machine learning models:

- **Supervised learning.** Models trained on labelled examples (this is malware; this is benign).
- **Unsupervised learning.** Models that learn structure without labels; flag outliers.
- **Deep learning.** Neural networks for complex pattern recognition.

Modern commercial products (Vectra, Darktrace, Cisco Stealthwatch, Microsoft Defender, CrowdStrike) include ML-based behavioural detection.

### Combining signatures and anomalies

The modern approach is not either/or. A mature deployment uses:

- **Signature-based detection** for known threats.
- **Anomaly-based detection** for unknown threats.
- **Behavioural analytics** for sophisticated patterns.
- **Threat intelligence integration** providing IOCs.
- **Correlation across multiple signals** for confidence.

A SIEM (Chapter 8 of the Forensics subject) orchestrates the combination.

### Snort, Suricata, Zeek

Three foundational open-source tools:

**Snort.** The original. Signature-based. Single-threaded historically (Snort 2.x); multi-threaded in Snort 3 (released 2021). Widely deployed.

**Suricata.** Modern open-source. Multi-threaded from the start. Compatible with Snort rules. Adds protocol logging, file extraction, and other features. Active community development.

**Zeek (Bro).** Different architecture — generates protocol-specific logs rather than (just) alerts. Strong for behavioural analysis. Often deployed alongside Suricata.

For an MSc student building practical IDS skills:
- Install Suricata in a Linux VM.
- Configure with the Emerging Threats Open ruleset.
- Connect to a SPAN port or use a PCAP for offline analysis.
- Examine alerts; tune false positives.
- Add Zeek for behavioural logging.
- Forward alerts to an open-source SIEM (Wazuh, ELK).

## 4.4 IDS/IPS deployment strategies

### Where to deploy

The choice of capture point matters.

**Perimeter (external-facing).** The traditional placement. Sees inbound attacks and outbound data movement. Necessary but increasingly insufficient as encrypted traffic dominates.

**Internal segmentation points.** Inside the network. Sees east-west traffic; detects lateral movement.

**DMZ.** Specifically watching DMZ servers for compromise indicators.

**Server-tier boundaries.** Watching traffic to and from sensitive servers (database, payment processing).

**Wireless edge.** Watching wireless traffic for attacks distinctive to wireless networks.

**Cloud egress.** Watching traffic leaving the organisation's cloud environments.

**Branch sites.** Smaller-scale detection at branch network edges.

### Tap versus SPAN versus inline

**Network tap.** Hardware device that splits traffic, providing a copy on a monitoring port. Lossless under all load conditions. Hardware cost.

**SPAN / mirror port.** Switch configuration replicating traffic to a monitoring port. No additional hardware but may drop packets under heavy load.

**Inline.** Device in the traffic path. Required for IPS; not used for promiscuous IDS.

### Visibility into encrypted traffic

A growing operational challenge. Most modern traffic is encrypted (HTTPS, encrypted DNS, end-to-end messaging). The IDS sees:
- TCP connections (sources, destinations, ports).
- TLS handshake metadata (certificate, SNI, JA3 fingerprint).
- Connection timing and size patterns.
- DNS queries (in the clear except for DoH/DoT).

The IDS does not see:
- Content of HTTP requests/responses inside HTTPS.
- Content of email inside SMTPS.
- Content of file transfers inside SFTP/HTTPS.

Solutions:

**SSL/TLS inspection at the firewall/IPS.** The device terminates the TLS connection, inspects content, re-encrypts to the destination. Effective but operationally and legally complex.

**Endpoint visibility.** EDR on the device sees content before encryption / after decryption.

**Behavioural and metadata analysis.** Without content, much can still be inferred from patterns.

For Nepali bank deployments, TLS inspection is standard at the perimeter, with exceptions for sensitive categories (banking applications themselves, healthcare-related sites).

### Tuning IDS/IPS

A deployment fresh from installation generates many false positives. Tuning is essential:

1. **Initial deployment.** Run in alert-only / detection mode initially.
2. **Baseline period.** Observe several weeks of normal traffic.
3. **Identify false positives.** What alerts are firing on legitimate traffic.
4. **Tune rules.** Disable, modify, or whitelist as appropriate.
5. **Move to prevention.** Once confident, enable blocking for high-confidence rules.
6. **Ongoing tuning.** Continuous as threats evolve and environment changes.

Tuning is often the most time-consuming aspect of IDS/IPS operation. A well-tuned system produces few false positives; analyst attention is preserved for real alerts.

### Alert handling

The operational discipline:

**Triage.** Quick assessment — is this likely real? What is the priority?

**Investigation.** Deeper analysis — what does this mean, what is the scope?

**Containment.** If real, stop the spread.

**Eradication.** Remove the cause.

**Recovery.** Restore normal operation.

**Documentation.** Record what happened.

**Lessons learned.** What detection or response gap was exposed?

Modern SOCs operate playbooks for common alert types — a defined procedure for "you got a SQL injection alert" reduces decision-making at the moment of incident.

### Performance considerations

IDS/IPS performance limited by:
- **Throughput of the device.** Vendor specifications under specific configurations.
- **Number of rules enabled.** More rules = slower matching.
- **TLS decryption capacity.** Highly intensive.
- **State table size.** For connection tracking.
- **Logging volume.** Can be substantial.

Sizing involves:
- Maximum expected throughput at the capture point.
- Acceptable latency budget.
- Number of rules and features enabled.
- Future growth.

Overprovisioning is wise; underprovisioned IDS/IPS becomes a bottleneck and loses visibility under load.

### Integration with SIEM

Every IDS/IPS deployment should forward alerts to a SIEM:

- Centralised view across multiple sensors.
- Correlation with other security events.
- Long-term retention for investigation.
- Compliance reporting.
- Analyst workflows.

Without SIEM integration, alerts sit in vendor consoles and are easily missed.

### Operational workflow example

A Nepali commercial bank's 24/7 SOC handling a Suricata alert:

1. **Alert fires.** Suricata sensor on internal segment detects a known beacon pattern from a workstation.
2. **SIEM ingests.** Wazuh / Splunk / Elastic Security correlates with EDR telemetry, firewall logs, AD logs.
3. **Analyst triages.** Level-1 analyst confirms it is not a known false positive; assigns to Level-2.
4. **Level-2 investigates.** Pulls memory from the workstation, examines outbound connections, checks process tree.
5. **Confirmation.** The workstation has malicious activity. Beaconing to a command-and-control server.
6. **Containment.** The workstation is isolated by EDR; user account locked.
7. **Eradication.** Forensic image taken; system rebuilt from clean image.
8. **Lessons learned.** Phishing email investigated; IOCs added to detection.

The full workflow involves the IDS/IPS as one part of a larger fabric. Without the SIEM, EDR, firewall logs, and AD context, the IDS alert alone might not have produced the right conclusion.

### Common pitfalls

Audit findings in Nepali bank IDS/IPS deployments:

- Alerts generated but not reviewed (analysts overwhelmed or not assigned).
- Rules out of date (signature subscription lapsed).
- Coverage gaps (key segments not monitored).
- TLS inspection not configured (much traffic invisible).
- Tuning never done (false-positive flood drowning real alerts).
- Logs not retained long enough for forensic use.
- No integration with broader response.

Each gap defeats the purpose of the deployment. The technology is necessary but not sufficient; operational discipline is what makes it work.

The next chapter shifts to the broader question of secure network design — how the architecture and the technologies covered so far combine into a secure network system, including the specific concerns of wireless networks and the modern Zero Trust direction.
