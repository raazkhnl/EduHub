---
title: 'Chapter 6 — Incident Response and Forensics'
sidebar_label: 'Ch 06 — Incident Response and Forensics'
sidebar_position: 6
description: 'Chapter 6 of Security and Audit Practitioner (ENCTNS625).'
slug: /ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner/notes/ch06
tags: [msncs, ENCTNS625, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The final chapter at 8 marks addresses incident response and forensics from the audit-practitioner perspective. The subject matter is covered in depth in ENCTNS551 (Digital Forensics and Incident Response) and aspects appear in the Information Systems Security Professionalism subject. Here the focus is the audit dimension — how the practitioner evaluates whether an organisation's security event monitoring is effective, whether its incident response process operates as documented, whether digital evidence is handled with appropriate rigour to support legal and regulatory needs, and whether forensic investigation capability is adequate for the threats faced. The Nepali context of incidents at NIC Asia, Foodmandu, Vianet, GIDC, MoE, and Nepal Police provides specific reference points for the kind of incident handling capability that practical audit examines.

## 6.1 Security event monitoring and SIEM audit

### Security monitoring

*Security event monitoring is the continuous activity of collecting, analysing, and responding to security-relevant events from across the IT environment — generating alerts for activities that may indicate threats, supporting investigation and response, and providing the foundation for detection of incidents that other controls fail to prevent.*

Without monitoring, incidents go undetected. Audit examines whether monitoring is comprehensive, effective, and operationally responsive.

### Monitoring architecture audit

**Sources.** What systems feed security monitoring.
- Endpoint logs.
- Server logs.
- Network device logs.
- Firewall logs.
- IDS/IPS alerts.
- Application logs.
- Cloud audit logs.
- Identity provider logs.
- Email security logs.
- DLP alerts.

**Collection mechanism.** How logs reach SIEM.
- Agents.
- Syslog.
- Native cloud integrations.
- API-based collection.

**Storage.** Where logs reside.
- Hot storage (recent, queryable).
- Warm storage (older, still accessible).
- Cold storage (archive).
- Retention per policy.

**Analytics.** What processing applied.
- Rule-based correlation.
- ML/UEBA.
- Threat intelligence enrichment.
- Anomaly detection.

### SIEM platforms

The major platforms:
- Microsoft Sentinel.
- Splunk Enterprise Security.
- IBM QRadar.
- Elastic Security.
- Google Security Operations (formerly Chronicle).
- Sumo Logic.
- LogRhythm.

For Nepali enterprises, SIEM adoption increasing at major institutions; smaller organisations often use log aggregation without full SIEM capability.

### SIEM audit areas

**Source coverage.**
- Material sources included.
- Coverage gaps identified.
- Critical systems specifically covered.

**Log quality.**
- Logs sufficient detail.
- Time synchronisation.
- No log corruption.
- Completeness over time.

**Rule effectiveness.**
- Rules detect intended scenarios.
- False positives manageable.
- False negatives identified through testing.
- Rule tuning ongoing.

**Alert handling.**
- Triage timeliness.
- Investigation quality.
- Disposition documented.
- Escalation appropriate.

**Reporting.**
- Operational dashboards.
- Management reporting.
- Trend analysis.

**Retention compliance.**
- Per policy and regulation.
- Search across retention period.

### Detection coverage

The auditor assesses what attacks the monitoring would detect:

**MITRE ATT&CK coverage.** Detection rules mapped to ATT&CK techniques.

**Critical attack scenarios.** Specific scenarios tested.

**Detection gaps.** Documented and addressed.

**Detection engineering practice.** Rules developed, tested, maintained.

Tools like Atomic Red Team, MITRE Caldera, and various adversary emulation platforms support testing detection coverage.

### Common monitoring findings

**Coverage gaps.** Critical sources not monitored.

**Stale rules.** Rules not updated.

**Alert fatigue.** Excessive false positives; real signals lost.

**Investigation gaps.** Alerts triaged superficially.

**Documentation gaps.** Investigations not documented.

**Retention non-compliance.** Logs not retained per requirement.

**Time sync issues.** Timestamps unreliable.

**SIEM under-utilisation.** Tool deployed; capability not used.

### SOC audit

Beyond SIEM, the security operations centre:

**Staffing.**
- Coverage (24/7 or business hours).
- Skill levels.
- Training current.
- Workforce planning.

**Processes.**
- Documented procedures.
- Runbooks for common scenarios.
- Escalation procedures.
- Communication protocols.

**Tools.**
- SIEM as discussed.
- SOAR for automation.
- EDR/XDR for endpoints.
- Ticketing for case management.
- Threat intelligence platforms.

**Performance.**
- Metrics tracked (MTTD, MTTR, etc.).
- Quality assurance.
- Continuous improvement.

**Integration.**
- With IT operations.
- With incident response.
- With business stakeholders.

For Nepali context, SOC capability varies — major banks have internal SOCs; many organisations use MSSPs (managed security service providers); smaller institutions have minimal capability.

## 6.2 Incident response process review

### Incident response audit scope

The audit examines:
- IR policy and plan.
- IR team structure and capability.
- IR procedures.
- Recent incident handling.
- Communication during incidents.
- Post-incident review process.
- Lessons learned integration.

### IR policy and plan review

**Policy document.**
- Approved by appropriate authority.
- Current (review cycle followed).
- Scope clear.
- Roles and responsibilities defined.
- Authority delegations clear.

**IR plan.**
- Procedures for different incident types.
- Escalation paths.
- Communication procedures.
- External engagement procedures (law enforcement, regulators, customers, vendors, insurers).
- Decision-making during incidents.
- Documentation requirements.

### IR team capability

**Composition.**
- Roles defined (incident commander, technical lead, communications, legal, others).
- Backups for each role.
- Skill sets appropriate.

**Training.**
- Initial training documented.
- Periodic refresher.
- Tabletop participation.
- External training where appropriate.

**Tools.**
- Forensic tools available.
- Communication platforms.
- Coordination tools.
- Case management.

**External resources.**
- Vendor IR firms identified.
- Retainer arrangements.
- Contact lists current.

### Sample incident review

The auditor selects recent incidents:

**Incident selection.**
- Sample of recent incidents.
- Including representative severity levels.
- Including various categories.

**For each incident reviewed:**
- Detection time documented.
- Initial response actions appropriate and timely.
- Investigation thorough.
- Containment effective.
- Recovery successful.
- Communication appropriate.
- Documentation complete.
- Post-incident review conducted.
- Lessons learned identified.
- Improvements implemented.

### Major incident handling

For major incidents specifically:

**Activation of crisis processes.** When appropriate.

**Executive engagement.** Senior leadership informed and engaged.

**External engagement.** Per requirements.

**Customer notification.** Where required.

**Regulatory notification.** Per timelines.

**Media handling.** Through appropriate channels.

**Recovery management.** Through crisis to normal operations.

**Post-incident.** Comprehensive review.

### Specific NRB IR requirements

For Nepali banks, NRB IT directives include specific IR provisions:
- Incident classification.
- Notification to NRB within timeframes.
- Customer notification requirements.
- Post-incident reporting.
- Investigation requirements.
- Improvement implementation.

Audit verifies compliance with these specific requirements.

### Common IR findings

**Plan-practice gap.** Documented plan; actual practice differs.

**Detection delays.** Incidents not detected promptly.

**Slow initial response.** Response after detection delayed.

**Inadequate containment.** Containment incomplete or slow.

**Communication failures.** Stakeholders not informed appropriately.

**Documentation gaps.** Incident records incomplete.

**Post-incident review absence.** Reviews not conducted.

**Lessons not applied.** Identified improvements not implemented.

**External engagement gaps.** Required notifications not made.

### Tabletop exercises

For IR maturity:

**Tabletop frequency.** At least annual.

**Scenario realism.** Reflecting actual threats.

**Participation.** Appropriate stakeholders.

**Documentation.** Outcomes recorded.

**Improvements.** Findings integrated.

Audit reviews tabletop documentation.

## 6.3 Digital evidence handling and chain of custody

### Digital evidence

*Digital evidence is information stored or transmitted in digital form that may be presented in legal or regulatory proceedings — including data files, log records, communications, system images, memory captures, and network traffic — requiring specific handling practices to maintain admissibility and integrity from collection through presentation.*

Covered extensively in ENCTNS551 Digital Forensics. The audit examines whether evidence handling practices exist and are followed.

### Chain of custody

*Chain of custody is the documented record of who collected, handled, transferred, analysed, and stored evidence — from initial collection through final disposition — establishing that evidence has been preserved without unauthorised modification, essential for admissibility in legal proceedings.*

Chain of custody documentation includes:
- What evidence was collected.
- When it was collected.
- Where it was collected from.
- Who collected it.
- How it was collected.
- What was done with it.
- Where it was stored.
- Who accessed it.
- Transfers between custodians.
- Analysis performed.
- Disposition.

### Evidence handling principles

**Integrity.** Evidence not modified.
- Write blockers for storage devices.
- Hash verification (MD5, SHA-1, SHA-256 typically computed and verified).
- Working copies for analysis; originals preserved.

**Authenticity.** Evidence verifiably from claimed source.
- Documentation of collection.
- Photographs of equipment in situ.
- Witness signatures where appropriate.

**Completeness.** Full record without gaps.

**Documentation.** Comprehensive records.

### Evidence collection audit

**Procedures.** Documented for various evidence types.
- Workstation imaging.
- Server log collection.
- Memory capture.
- Network capture.
- Cloud evidence collection.
- Mobile device collection.

**Tools.** Appropriate tools available.
- Forensic imaging tools.
- Write blockers.
- Memory acquisition tools.
- Forensic suites.

**Training.** Personnel trained.

**Documentation.** Templates and forms.

### Evidence storage audit

**Physical security.** Evidence storage secured.

**Access controls.** Logged access.

**Environmental controls.** Appropriate conditions.

**Retention.** Per legal hold and policy.

**Disposition.** Documented destruction or return.

### Forensic readiness

*Forensic readiness is the proactive preparation that enables effective evidence collection and analysis when needed — through appropriate logging, system configuration, tool deployment, procedures, trained personnel, and pre-established relationships — minimising the time and cost of forensic investigation while maximising evidence quality.*

Forensic readiness audit examines:
- Logging configuration appropriate.
- Log retention sufficient.
- Time synchronisation across systems.
- Forensic tools deployed and licensed.
- Trained personnel available.
- Procedures documented.
- External relationships established.

For Nepali bank context, forensic readiness varies; major banks have substantial capability; smaller institutions often need external support.

### Legal hold

Specific procedure for preserving evidence when litigation or investigation likely:

**Trigger.** Notification of potential litigation/investigation.

**Identification.** Custodians and systems with relevant data.

**Notification.** To custodians.

**Preservation.** Routine deletion/modification suspended.

**Documentation.** Hold documented.

**Release.** When hold no longer needed.

Audit examines whether legal hold process exists and operates when triggered.

## 6.4 Forensic investigation techniques

### Forensic investigation

Covered in ENCTNS551. Audit examines whether forensic capability is appropriate to needs.

### Forensic process

**Identification.** What needs investigation.

**Preservation.** Evidence protected.

**Collection.** Evidence acquired.

**Examination.** Initial analysis.

**Analysis.** Detailed analysis.

**Presentation.** Findings communicated.

Each step has specific methodology and tools.

### Forensic tools

**Comprehensive suites.**
- EnCase (OpenText).
- FTK (Forensic Toolkit, Exterro).
- X-Ways Forensics.
- Autopsy (open-source).

**Memory analysis.**
- Volatility.
- Rekall.

**Network analysis.**
- Wireshark.
- NetworkMiner.

**Mobile forensics.**
- Cellebrite UFED.
- Magnet AXIOM.
- Oxygen Forensic Detective.

**Cloud forensics.**
- Provider-native tools.
- Specialised cloud forensic tools.

**Specialised.**
- Magnet AXIOM Cyber.
- Magnet AXIOM Process.
- Various specific tools.

Audit verifies tool licensing, currency, and personnel proficiency.

### Investigation types

**Incident investigation.** What happened in security incident.

**Compromise assessment.** Were systems compromised; if so, scope.

**Insider investigation.** Employee misconduct.

**Fraud investigation.** Financial fraud involving IT.

**eDiscovery.** Litigation support.

**Compliance investigation.** Regulatory inquiry.

**Intellectual property investigation.** IP theft.

Different investigation types need different methodology.

### Investigation capability audit

**Personnel.**
- Trained forensic analysts.
- Certifications (CFCE, GCFA, others).
- Experience appropriate to scope.

**Tools.** Appropriate suite.

**Procedures.** Documented and followed.

**Quality.** Peer review of significant work.

**Reporting.** Reports support intended use.

**External support.** For complex matters.

### Findings communication

Investigation reports:

**Audience-appropriate.** Technical vs management vs legal.

**Evidence-based.** Conclusions supported.

**Methodology disclosed.** How investigation conducted.

**Limitations noted.** What couldn't be determined.

**Recommendations.** Where appropriate.

For court use, reports must meet evidentiary standards. Audit examines whether reports would survive scrutiny.

### Investigation in Nepali context

For Nepali enterprises:

**Bank fraud investigations.** Internal capability or external firms; coordination with Cyber Bureau under Nepal Police.

**Compromise assessments.** Major incidents (NIC Asia 2017, others) trigger comprehensive assessments; typically external firms engaged.

**Compliance investigations.** NRB-driven examinations; specific scope per inquiry.

**Employee misconduct.** HR-led with IT/security forensic support.

**Capability building.** Investments growing as incident frequency increases.

For MSc graduates with forensic interests, opportunities exist both in-house at major institutions and at specialised firms providing forensic services.

### IR and forensics integration

In practice, IR and forensics overlap substantially:
- IR includes forensic activities during investigation.
- Forensic findings inform IR decisions.
- Same personnel often handle both.
- Same tools serve both purposes.
- Same documentation supports both.

Mature organisations integrate rather than separate the disciplines.

### The audit programme summary

Across the six chapters of this subject, the practitioner has examined:

- Audit principles, standards, types, planning (Ch 1).
- Governance, risk management, EA, maturity, compliance (Ch 2).
- Acquisition and development including security testing (Ch 3).
- Operations, BIA, BCP, DR (Ch 4) — heaviest at 12 marks.
- Asset protection including IAM, encryption, network/cloud (Ch 5).
- Incident response, monitoring, evidence handling, forensics (Ch 6).

Together these constitute the audit universe for most IS engagements. The CISA examination structure aligns directly with this coverage.

### Audit programme construction

A practitioner planning an IS audit engagement constructs the programme by:

1. Identifying applicable scope.
2. Selecting applicable framework(s).
3. Identifying material risks.
4. Determining testing approach for each.
5. Allocating resources.
6. Scheduling activities.
7. Defining deliverables.
8. Establishing review and sign-off process.

Each chapter of this subject contributes elements to such programmes.

### Building audit practice capability

For the MSc graduate aspiring to audit practice:

**Foundation.** Strong technical understanding from MSNCS programme.

**CISA preparation.** Pursuit of certification.

**Hands-on experience.** Initially as junior auditor.

**Specialisation development.** Particular technology areas or industries.

**Professional engagement.** ISACA Kathmandu Chapter activities; conferences; continuous learning.

**Career progression.** Junior auditor → senior auditor → manager → senior manager → partner/CAE typical trajectory.

The career offers intellectual variety (different engagements, organisations, technologies), professional respect, reasonable compensation, and meaningful impact through helping organisations improve their information security posture.

### The audit perspective in practice

Throughout this subject, the practitioner's mindset has been emphasised:

- Evidence-based conclusions, not opinions.
- Standards as reference rather than personal preference.
- Risk-based prioritisation of attention.
- Constructive rather than confrontational engagement.
- Specific actionable findings rather than vague concerns.
- Follow-through to closure of issues.
- Continuous improvement of audit practice itself.

The professional discipline distinguishes audit work from informal review. The MSc graduate building IS audit capability internalises this discipline through study, practice, and mentorship over the career.

The Security and Audit Practitioner subject completes the formal preparation. The practice begins with the next engagement.
