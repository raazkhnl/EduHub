---
title: 'Chapter 1 — Introduction'
sidebar_label: 'Ch 01 — Introduction'
sidebar_position: 1
description: 'Chapter 1 of Digital Forensics and Incident Response (ENCTNS551).'
slug: /ioe/msncs/year-1-part-2/digital-forensics-incident-response/notes/ch01
tags: [msncs, ENCTNS551, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Digital forensics is the discipline of recovering and examining digital evidence in a way that allows the findings to stand up in court. Incident response is the discipline of detecting, containing, eradicating, and recovering from cyber incidents in a way that limits harm to the organisation. The two overlap heavily in practice — most serious incidents involve forensic investigation, and most forensic investigations are triggered by incidents — but they have distinct goals, audiences, and standards of proof. This chapter sets the foundations: what digital forensics is, what makes digital evidence legally admissible, what Nepal's evidence law says about it, what incident response is, and what frameworks structure the response. The chapter is the longest in the subject because every later chapter (disk, memory, network, mobile, cloud, malware, logs) rests on the legal and procedural foundations laid here.

## 1.1 Introduction to digital forensics

### Digital forensics

*Digital forensics is the application of scientific methods and proven procedures to the identification, preservation, collection, examination, analysis, and presentation of digital evidence derived from digital sources, with the purpose of supporting legal, regulatory, or investigative proceedings.*

The word **forensic** comes from the Latin *forensis*, meaning "of or before the forum" — the public space where legal cases were argued in ancient Rome. Anything called forensic is intended for legal use. Digital forensics is forensics applied to digital evidence: data on computers, phones, networks, cloud services, embedded devices, anything that stores or transmits bits.

Digital forensics is the science. The practitioner — the **digital forensic investigator** or **examiner** — applies that science to a specific case. The output is typically a report, a written opinion, and sometimes courtroom testimony that helps a judge, jury, regulator, or internal disciplinary body decide what happened.

### Scope and sub-disciplines

Digital forensics has grown into several specialised sub-disciplines, each covered in its own chapter of this subject:

- **Computer (host) forensics** — desktops, laptops, servers. Disk imaging, file recovery, registry analysis, browser history.
- **Memory forensics** — RAM contents at the time of acquisition. Running processes, open network connections, cryptographic keys, malware injected without touching disk.
- **Network forensics** — packets, flows, IDS/IPS alerts, NetFlow records. Recovering what passed over the wire.
- **Mobile device forensics** — iPhone, Android, feature phones, tablets. SMS, call logs, location data, app data.
- **Cloud forensics** — AWS, Azure, GCP, SaaS platforms. Recovering evidence from environments the investigator does not control.
- **Malware forensics** — analysing malicious software statically and dynamically.
- **Log forensics** — system, application, and security logs aggregated for analysis.

Other sub-disciplines exist (IoT forensics, vehicle forensics, drone forensics, blockchain/cryptocurrency forensics) and are growing in importance but fall outside this subject's syllabus.

### Why digital forensics matters

Several broad uses drive the field:

**Criminal investigations.** When a crime involves a computer, a phone, or a network — almost every crime in 2026 does to some degree — digital forensics produces the evidence. Cyber Bureau under Nepal Police regularly conducts forensic examinations in cases ranging from financial fraud (eSewa and Khalti account takeovers, banking-trojan APKs) to online harassment and child exploitation cases to nation-state-attributed attacks on government infrastructure.

**Civil litigation.** Disputes between companies often turn on what was sent in an email, what was deleted from a database, what was leaked to a competitor. **eDiscovery** — the forensic preservation and production of electronically stored information — is a multi-billion-dollar industry globally.

**Internal investigations.** Employee misconduct, data exfiltration, insider trading, intellectual-property theft. A bank's HR team investigating whether an analyst leaked client data needs forensic evidence to discipline or dismiss with confidence — and to defend the action if the employee disputes it.

**Incident response.** When an attacker breaches a system, the response team needs to determine what happened: how the attacker got in, what they did, what they took, whether they are still there. Forensic work answers each question.

**Regulatory compliance.** Sectoral regulators (Nepal Rastra Bank for banks, Nepal Telecommunications Authority for telecoms, Securities Board of Nepal for capital markets) increasingly require forensic readiness — the ability to demonstrate, after an incident, what controls were in place and what failed.

**National security and counter-terrorism.** Devices seized from suspects, communications intercepted, hardware sent for analysis after attacks.

### The forensic process

The standard process — codified in NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response* (2006) and in many textbooks — has four phases:

1. **Identification.** Recognise what evidence may exist and where.
2. **Preservation.** Capture and protect the evidence from change.
3. **Analysis.** Examine the evidence to answer the investigative questions.
4. **Presentation.** Produce a report (and sometimes testimony) usable by the audience.

Some authors split or rename these phases — Kessler's framework adds *collection*; the ACPO (UK) Good Practice Guide for Digital Evidence uses different language — but the substance is consistent.

### Forensic readiness

*Forensic readiness is the proactive state of an organisation that has the people, processes, technologies, and policies in place to maximise its ability to use digital evidence — minimising the cost of an investigation and maximising the likelihood that evidence collected will be useful and admissible.*

A forensically-ready organisation logs the right things, retains them long enough, knows where they are, has people trained to acquire them, and has agreements in place with external responders or law-enforcement contacts. Most Nepali organisations are not forensically ready — incidents reveal that critical logs were never enabled, retention periods were too short, or no one had authority to take a server out of production to image it.

## 1.2 Digital evidence and legal admissibility

### Digital evidence

*Digital evidence is any information of probative value that is stored or transmitted in digital form, including computer files, log entries, network captures, mobile-phone records, email, social-media content, surveillance video, and any other binary data relevant to a legal or investigative question.*

The defining feature is **probative value** — the data must help establish or disprove a fact in question. A random photograph on a phone is not evidence unless it relates to the case.

Digital evidence has properties that paper evidence does not:
- **Easily copied.** Bit-for-bit duplicates are possible. The "original" and the "copy" can be identical.
- **Easily altered.** A few keystrokes can delete, modify, or fabricate evidence.
- **Fragile.** Powering off a computer destroys memory contents; using a suspect device alters timestamps and may wipe logs.
- **Voluminous.** A single laptop holds terabytes of data; a corporate network holds petabytes.
- **Distributed.** Evidence about one event may sit on servers, phones, cloud services, and third-party logs simultaneously.
- **Encrypted.** Increasingly, the data is unreadable without keys.

These properties shape how evidence must be handled to be useful in court.

### Legal admissibility

*Legal admissibility is the property of evidence that makes it acceptable to a court for consideration in deciding a case, requiring that the evidence be relevant, authentic, reliable, complete, not unduly prejudicial, and obtained through lawful means.*

Admissibility is decided by the court at trial — the judge rules whether a piece of evidence may be presented. Evidence that does not meet the standard is excluded; the case must proceed without it.

The standard tests applied to digital evidence:

**Relevance.** Does the evidence tend to prove or disprove a fact in question? Irrelevant evidence is excluded regardless of how authentic it is.

**Authenticity.** Is the evidence what it claims to be? An email purportedly from a specific sender must be shown to actually come from that sender. A disk image must be shown to be a faithful copy of the original disk.

**Reliability (integrity).** Has the evidence been preserved from the time of collection without alteration? Cryptographic hashes (MD5, SHA-1, SHA-256) computed at acquisition and verified before analysis are the standard mechanism.

**Best evidence rule.** Where possible, the original evidence (or an authenticated copy) is presented. With digital evidence, where bit-for-bit copies are perfect, this is operationalised as: present a verified forensic image, not a screenshot.

**Hearsay considerations.** Computer-generated records (system logs, automatically-timestamped database entries) are typically not hearsay because no human asserted their contents. Computer-stored records (a document a person wrote and saved) may be hearsay and require additional foundation.

**Chain of custody.** Documented continuous possession and handling. Discussed in detail in Section 1.4.

### International standards

Several international standards govern digital-forensic practice:

- **ISO/IEC 27037:2012** — *Guidelines for identification, collection, acquisition and preservation of digital evidence*. The foundational international standard.
- **ISO/IEC 27041, 27042, 27043** — assurance, analysis and interpretation, and the broader investigation process.
- **ISO/IEC 27050** — electronic discovery.
- **NIST SP 800-86** — integrating forensic techniques into incident response.
- **NIST SP 800-101** — *Guidelines on Mobile Device Forensics*.
- **ACPO Good Practice Guide for Digital Evidence** — UK guidance, widely cited globally.

A forensic process aligned with these standards has stronger admissibility claims than one that follows ad-hoc procedures.

### The Daubert and Frye tests

Two US legal tests influence how courts worldwide evaluate expert digital-forensic testimony:

**Frye test (1923).** The technique must be "generally accepted" in the relevant scientific community.

**Daubert test (1993).** More elaborate. The technique must be testable, peer-reviewed, have known error rates, have standards for operation, and be generally accepted.

Nepal does not formally use these tests, but Nepali courts considering the reliability of digital evidence often look at whether the methods used are recognised internationally — which functionally amounts to a Daubert-like inquiry.

## 1.3 Burden of proof

### Burden of proof

*The burden of proof is the obligation of a party in a legal proceeding to prove their case to a specified standard, determining who must produce evidence and how convincing the evidence must be for a particular finding.*

The party with the burden of proof must persuade the court. If they fail to do so, they lose — even if the other side produces no evidence at all.

### Standards of proof

Different proceedings apply different standards. From least to most demanding:

**Reasonable suspicion.** The minimum standard to detain or stop someone briefly. Not used for final findings.

**Probable cause.** Standard for arrest warrants, search warrants. Some basis to believe a crime occurred or evidence will be found.

**Preponderance of the evidence.** "More likely than not" — over 50% confidence. The standard for most civil cases.

**Clear and convincing evidence.** Higher than preponderance; less than beyond reasonable doubt. Standard for some quasi-criminal civil matters.

**Beyond reasonable doubt.** The standard for criminal conviction. No specific percentage but understood as a very high threshold — practically all reasonable doubt must be eliminated.

### Application to digital forensics

The standard of proof shapes how thorough an investigation must be.

**Criminal cases.** Beyond reasonable doubt. The forensic work must be complete, the chain of custody unbroken, the procedures established and validated. A single material gap in the chain can sink the case. Conviction in a fraud case based on a recovered email requires:
- The email is actually what it claims (authenticity).
- The recovery process is sound (reliability).
- The accused actually authored it (attribution).
- The chain is documented (chain of custody).

**Civil cases (commercial disputes, employment, contract).** Preponderance. The forensic standards are still high but the bar for individual evidence items is lower.

**Internal investigations.** Often unstated but typically preponderance or clear-and-convincing. An employer disciplining or dismissing an employee for misconduct must be able to defend the decision; "beyond reasonable doubt" is not required but "we think they probably did it" is also not enough.

**Regulatory enforcement.** Varies by regulator and jurisdiction; often clear and convincing or preponderance.

### Who bears the burden

The default in most legal systems:

**Criminal cases.** The prosecution bears the burden. The accused is presumed innocent; the state must prove guilt.

**Civil cases.** The plaintiff bears the burden for their claims. If the defendant raises affirmative defences (e.g., consent, statutory exemption), the defendant bears the burden for those.

**Regulatory matters.** Usually the regulator bears the burden of proving the violation.

In Nepal, the *Pramaan Ain 2031* (Evidence Act 1974) establishes the burden of proof rules, broadly following the patterns above. Section 25 places the burden of proving the existence of a fact on the party who asserts it.

### Shifts in burden

In specific situations, the burden shifts. Examples:

- Once the prosecution establishes a prima facie case, the practical burden of producing rebuttal evidence shifts to the defence.
- In trade-secret cases, once the plaintiff shows access to and use of similar information, the defendant may need to show independent development.
- In some regulatory frameworks (data-protection, anti-money-laundering), the regulated entity must demonstrate compliance once a violation is alleged.

The shift does not change the ultimate burden of proof; it changes who must produce evidence at a given stage.

## 1.4 Chain of custody of digital evidence

### Chain of custody

*The chain of custody is the documented, continuous record of every person who handled an item of evidence, every transfer of possession, and every action performed on the evidence, from the moment of collection through the final disposition, established to demonstrate that the evidence has not been altered, substituted, or tampered with.*

The chain of custody is the single most important administrative concept in forensics. A perfectly-collected piece of evidence with a broken chain of custody is worthless in court. A modestly-collected piece of evidence with an unbroken chain may carry the day.

### What goes in the chain

For every item, the chain typically records:

- **What.** Unique identifier of the item — serial number, hash value, barcode.
- **When.** Date and time of every event.
- **Where.** Physical location at each step.
- **Who.** The person responsible.
- **Why.** The purpose of each action.
- **How.** The method, tool, or process used.

Specific events that the chain captures:
- Initial discovery and collection.
- Transport from the scene.
- Storage in evidence locker.
- Each removal for analysis.
- Each return after analysis.
- Each transfer between custodians.
- Final disposition (returned, destroyed, archived).

### The chain-of-custody form

The classical document is a paper or electronic form. Each row records one event. Every transfer between people requires signatures from both. A modern digital evidence-management system (commercial products and bespoke government systems) maintains the chain electronically with audit logs, badge-based access control, and tamper-resistant timestamping.

The Cyber Bureau under Nepal Police uses standardised forms for evidence handling; the format aligns broadly with ISO 27037 guidance.

### Hash-based integrity

For digital evidence specifically, **cryptographic hashes** are the technical mechanism that complements the administrative chain.

At the moment of acquisition, the investigator computes a hash (typically SHA-256 in 2026; SHA-1 and MD5 are still encountered in older cases but are deprecated) of the entire forensic image. The hash is recorded in the chain of custody.

Any subsequent time the image is opened for analysis, the hash is recomputed. If it matches the recorded value, the image has not been altered. If it does not match, integrity has been compromised — and the evidence is suspect.

The chain of custody and the hash work together. The chain shows who had access; the hash proves whether they changed anything.

### Common chain-of-custody mistakes

Several failure patterns recur in real cases:

- **Missing entries.** A handoff that was not documented. A custodian who cannot account for an interval.
- **Unauthorised access.** Someone who handled the evidence without being recorded.
- **Storage failures.** Evidence left in an unlocked location, mixed with other items, or stored in conditions that could damage it.
- **Tool changes.** A different tool used than the one documented; results that cannot be reproduced.
- **Lost original.** The acquired image hash was recorded but the original device was not preserved; later questions about the acquisition cannot be answered.
- **Computer-generated artefacts modified.** Last-access timestamps changed by careless analysis on the original media.

The discipline that prevents these is procedural: write down everything, sign everything, hash everything, and never use the original media for analysis when a verified working copy is available.

### Example chain of custody for a fraud case

A bank in Kathmandu suspects an employee has been exfiltrating client data. The chain might unfold as:

| # | Date/time | Action | Custodian | Location |
|---|---|---|---|---|
| 1 | 2026-04-10 09:30 | Laptop seized from employee's desk by IT security; powered off | Officer A | Branch office, Lalitpur |
| 2 | 2026-04-10 11:15 | Transferred to forensic lab | Officer A → Officer B | In transit, vehicle |
| 3 | 2026-04-10 12:00 | Logged into evidence locker | Officer B | Forensic lab, evidence locker #4 |
| 4 | 2026-04-11 10:00 | Removed for imaging | Officer B → Examiner C | Forensic lab, workstation 2 |
| 5 | 2026-04-11 10:30 | Image acquired, SHA-256 computed | Examiner C | Workstation 2 |
| 6 | 2026-04-11 18:00 | Image stored on forensic server; laptop returned to locker | Examiner C → Officer B | Lab |
| 7 | 2026-04-15 09:00 | Analysis of image performed on read-only working copy | Examiner C | Analysis workstation |
| ... | ... | ... | ... | ... |

Every row is signed by the custodians involved. The hash recorded at step 5 is reverified at every subsequent access.

## 1.5 Provisions related to digital evidence in the Evidence Act of Nepal

### The Evidence Act 2031 (1974)

Nepal's primary evidence legislation is the **Pramaan Ain 2031** — the Evidence Act of 1974 (2031 in the Bikram Sambat calendar). The Act was originally drafted long before digital evidence existed, but amendments and judicial interpretation have extended it to electronic data.

### Definition under Nepali law

Nepal's *Electronic Transactions Act 2063* (2008) — the **ETA** — supplements the Evidence Act for digital matters. The ETA explicitly recognises electronic records as legally valid:

- **Electronic record.** Defined to include data, records, or data generated, sent, received, or stored in electronic form, magnetic, optical, or any similar means.
- **Electronic signature.** Recognised as legally equivalent to a handwritten signature when produced through a procedure that the Act specifies.
- **Computer database.** Treated as a class of electronic record.

The ETA, in effect, ensures that electronic records have a path to admissibility provided they meet conditions of authenticity, integrity, and accuracy.

### Key provisions

Several specific provisions matter for digital forensics:

**Authentication.** The party producing electronic evidence must establish its authenticity. Typical methods: hash values, metadata, witness testimony from the system administrator, expert testimony from a digital forensic examiner.

**Integrity.** The evidence must be shown to be unaltered since the time of relevance. Forensic best practices — verified imaging, hash documentation, chain of custody — are the standard means.

**Best-evidence equivalent.** Section 13 of the Evidence Act traditionally favoured production of "primary evidence" (the original). For electronic records, this is interpreted as a verified forensic copy or the original media itself when feasible.

**Witness foundation.** A witness familiar with the system (sysadmin, custodian, forensic examiner) usually must establish the foundation — what the system is, how it produces records, that the records are produced in the regular course of business, and how this particular record was obtained.

**Expert witness.** Section 7 and surrounding provisions of the Evidence Act allow expert opinion on technical matters. A forensic examiner testifying about disk imaging, hash verification, deleted-file recovery, or malware behaviour testifies as an expert.

**Computer-generated records.** Logs and automatically-timestamped records are generally treated as system-generated rather than human-asserted, sidestepping some hearsay concerns.

### The cybercrime context

The **Electronic Transactions Act 2063** also criminalises a range of computer-related offences — unauthorised access, theft of electronic data, computer-related fraud, content offences. The Act has been heavily criticised, particularly Section 47 (provisions on publication of objectionable material), which has been used in ways that critics argue chill free speech. From a forensic standpoint, cases under the ETA require forensic evidence to establish the alleged acts.

The **Cybercrime Bureau under Nepal Police** is the primary investigative body. The Bureau operates a forensic laboratory in Kathmandu and coordinates with the District Police across the country for case investigations.

The Cybercrime Bureau handles a significant caseload. Reports from 2024 and 2025 noted thousands of complaints per year, dominated by social-media disputes, online financial fraud (including eSewa/Khalti scams and online banking fraud), and harassment. A smaller but growing fraction involves complex incidents — corporate breaches, ransomware, infrastructure attacks.

### Evolving legal landscape

Nepal's digital-evidence law continues to evolve. Several active developments through 2024-2026:

- **The Information Technology Bill.** Draft legislation that would supersede or supplement the ETA. Several versions have been debated through 2024-2026 with concerns about overreach and rights.
- **The Personal Information Protection / Privacy Act 2075 (2018).** Restricts how personal data is collected, processed, and disclosed — including limits on disclosure in investigations.
- **Constitutional privacy provisions.** Article 28 of the 2015 Constitution guarantees privacy of person, residence, property, document, data, correspondence, and communication.

For a forensic investigator in 2026, these create a layered legal environment: the Evidence Act establishes admissibility, the ETA criminalises specific acts and validates electronic records, the Privacy Act restricts how evidence may be collected without warrant or consent, and the Constitution provides the overarching rights framework.

### Practical implications

For an MSc student or practitioner, the operational consequences:

- **Acquire evidence with appropriate legal authority.** Search warrants, employer consent in employment investigations, account-holder consent in some cases. Evidence collected without proper authority may be excluded.
- **Document everything.** Chain of custody, hash values, tool versions, analytical steps. The documentation is what makes the evidence defensible.
- **Use recognised methods.** Tools and procedures recognised internationally have stronger credibility than ad-hoc methods, even when no Nepali standard mandates a specific tool.
- **Prepare for expert testimony.** A forensic examiner may be required to appear in court and explain the work. The expert's credibility, training, and clarity matter as much as the technical work itself.
- **Respect privacy and proportionality.** Evidence collection should be limited to what is needed for the case. Acquiring an entire mobile phone's content when the case concerns one specific message is disproportionate and may face legal challenge.

## 1.6 Introduction to incident response, phases of incident response

### Incident response

*Incident response is the organised approach to addressing and managing the aftermath of a security breach or cyberattack, with the goal of limiting the damage, reducing recovery time and costs, identifying the cause and scope, restoring operations, and improving defences against future incidents.*

Where digital forensics asks "what happened?" with the aim of producing court-admissible evidence, incident response asks "what is happening and how do we stop it?" with the aim of restoring operations. The two overlap — most serious incidents have a forensic component — but they are different disciplines with different urgencies.

### What counts as an incident

*A security incident is any event that violates an organisation's security policies, causes (or could cause) harm to confidentiality, integrity, or availability of information systems, or otherwise indicates a compromise of the organisation's security posture.*

Incidents range in severity:

- **Low.** A single phishing email caught by the filter. A failed brute-force login attempt blocked by the IDS.
- **Medium.** A successful phishing click but credentials not used; a malware infection contained to one workstation; a momentary DDoS without service impact.
- **High.** Confirmed unauthorised access to sensitive systems; ransomware on multiple endpoints; data exfiltration in progress; significant DDoS with service impact.
- **Critical.** Compromise of core systems (domain controllers, payment processors, customer databases); major data breach; widespread ransomware encrypting business-critical systems.

Real incidents in Nepal that illustrate the spectrum include:
- The 2020 Foodmandu breach (medium-high — about 50,000 user records leaked).
- The 2020 Vianet breach (high — about 170,000 customer records).
- The 2017 NIC Asia SWIFT compromise (critical — financial messaging system).
- The 2024 Government Integrated Data Centre DDoS (critical — 400+ government portals offline).
- The 2025 Ministry of Education breach (high — student and employee PII).
- The late-2025 Nepal Police website breach (critical — 2 million+ records claimed).

Each demanded incident response of varying scale and capability.

### Phases of incident response

The standard phases — codified slightly differently by NIST, SANS, ISO, and other authorities — share the same shape. The widely-cited NIST SP 800-61 *Computer Security Incident Handling Guide* names four phases:

1. **Preparation.** Done before any incident; covered in Section 1.9.
2. **Detection and Analysis.** Recognise that an incident has occurred; characterise its nature and scope.
3. **Containment, Eradication, and Recovery.** Stop the harm; remove the cause; restore operations.
4. **Post-Incident Activity.** Learn from the incident; improve.

SANS uses six phases by splitting some of NIST's:

1. **Preparation.**
2. **Identification.**
3. **Containment.**
4. **Eradication.**
5. **Recovery.**
6. **Lessons Learned.**

The substance is the same. The phases are not strictly sequential — detection and containment often run in parallel; analysis continues throughout — but the conceptual progression is from "ready" to "detected" to "contained" to "recovered" to "learned."

### Detection and analysis

How are incidents detected?

- **Automated alerts** from IDS, antivirus, SIEM (Chapter 8), EDR (endpoint detection and response), DLP (data loss prevention).
- **User reports.** "I think this email is suspicious." "My account was locked." "I see a ransom note."
- **External notification.** A bank receives notification from a customer that funds are gone; npCERT relays a threat-intelligence tip; a vendor's compromised software has been used to attack many customers.
- **Anomaly observation by operations staff.** Unusual traffic patterns, suspicious processes, unexpected log entries.

Once detected, analysis determines:
- Is this a real incident or a false positive?
- What is the scope — which systems, which data, which users?
- What is the impact — what was lost, modified, accessed?
- What is the attacker's apparent intent?
- What attacker capabilities are involved?

Analysis is forensically intensive. It uses tools and techniques covered in subsequent chapters of this subject.

### Containment

Stop the damage from spreading.

Short-term containment (immediate, often reactive):
- Disconnect affected systems from the network.
- Block malicious IPs at the firewall.
- Disable compromised accounts.
- Block egress of data.

Long-term containment (planned, more durable):
- Apply patches; deploy fixes.
- Rebuild affected systems from known-good images.
- Implement compensating controls in network segmentation.
- Issue secrets rotation (passwords, API keys, certificates).

Containment must balance speed against forensic preservation. Pulling a server's power immediately stops the attacker — but destroys all volatile evidence in memory and might lose evidence on disk if running processes were in the middle of writing data. The decision depends on the situation. A live-incident playbook should specify when to preserve, when to contain immediately, and when to do both in sequence (preserve, then contain).

### Eradication

Remove the cause.

- Delete malware artefacts.
- Close exploited vulnerabilities (patches, configuration changes).
- Remove attacker persistence mechanisms (registry keys, scheduled tasks, startup entries, backdoor accounts).
- Address the root cause that allowed the incident.

Eradication done badly leaves the attacker reinfected access. A common pattern: malware is removed but the original infection vector (a phishing email, a vulnerable VPN, a stolen credential) remains active. Within days, the attacker is back.

### Recovery

Restore normal operations.

- Restore systems from clean backups.
- Verify system integrity before reconnecting to the production network.
- Monitor closely for re-infection or attacker return.
- Communicate restoration to stakeholders.

The Cyber Bureau and major Nepali banks have, after past incidents, conducted recovery operations that took weeks to months. Recovery is rarely instantaneous; it is a careful, monitored return to operations.

### Post-incident activity

Often shortchanged, despite being where the most lasting value is created.

- Conduct a formal post-incident review (sometimes called a post-mortem or root-cause analysis).
- Document what happened, what worked, what did not.
- Identify gaps in controls, detection, response capability.
- Update playbooks, controls, and training.
- Share lessons learned within the organisation (and, where appropriate, with the broader community through npCERT or industry sharing).

A mature incident-response programme treats every incident as a learning opportunity. An immature programme treats incidents as one-offs and repeats the same failures.

## 1.7 Reporting

### The incident report

The written record of the incident: what happened, when, what was done, what was found, what the impact was, what was learned. Different reports serve different audiences:

**Internal management report.** Decision-makers (CEO, CISO, board, legal). Executive summary; business impact; regulatory implications; recommendations for action.

**Technical report.** Engineering and security teams. Detailed timeline; technical analysis; IOCs (indicators of compromise); remediation actions taken.

**Regulatory report.** Filed with regulators. Nepal Rastra Bank requires reporting of significant security incidents at banks; the National Information Technology Centre and npCERT receive reports of national-significance incidents. The contents are typically prescribed by the regulator.

**Customer notification.** For breaches affecting customers. Nepal's Privacy Act 2075 has provisions; sectoral regulators (banking, telecom) have additional requirements.

**Public statement.** For incidents that become public. PR-managed; legal-reviewed; carefully scoped to what is known.

**Forensic report.** For evidence purposes; covered separately.

### Structure of a typical incident report

A common skeleton:

1. **Executive summary.** What happened in plain language; key findings; key recommendations.
2. **Incident timeline.** Detailed chronology of events.
3. **Scope and impact.** Systems affected, data affected, users affected, financial impact, reputational impact.
4. **Technical analysis.** How the attacker got in, what they did, what they took. Threat-actor profile if attributable.
5. **Response actions.** What the responders did, in order.
6. **Indicators of compromise.** Hashes, IPs, domains, file paths, registry keys — operational artefacts for detection of related activity.
7. **Recommendations.** Specific, prioritised actions to prevent recurrence and improve readiness.
8. **Lessons learned.** Process, control, and capability lessons.
9. **Appendices.** Technical details, evidence references, screenshots.

### The forensic report

When forensic evidence is involved, the forensic report is its own distinct deliverable. It typically includes:

- Examiner's qualifications and statement of independence.
- Description of the evidence received.
- Hash values and chain of custody.
- Tools and methods used.
- Detailed findings with supporting evidence.
- Limitations and assumptions.
- Conclusions stated with appropriate confidence.
- Statement that the report was prepared honestly and to the best of the examiner's professional knowledge.

A forensic report written for potential court use is reviewed by counsel before being finalised. The examiner may be asked to defend it under cross-examination.

### Communication during the incident

Beyond the post-incident report, communication during the incident is critical and often underprepared. Common needs:

- **Internal updates.** Regular briefings to management as the situation develops.
- **Coordinated decision-making.** Decisions about disconnecting systems, paying ransoms, notifying customers, engaging law enforcement.
- **External communication.** With customers, regulators, law enforcement, media — usually coordinated through a designated spokesperson.
- **Pre-prepared templates.** Customer notification letters, regulatory filing forms, media statements — prepared in advance so they can be customised quickly during the incident.

The 2024 GIDC DDoS incident illustrated how communication gaps amplify impact. With many government portals down and no clear public communication, citizens were uncertain what was happening; rumour filled the gap. Better incident communication would have reduced confusion even while the technical response continued.

## 1.8 Common incident response frameworks — NIST and SANS

Two frameworks dominate incident-response practice globally.

### NIST framework

*The NIST Computer Security Incident Handling Guide (SP 800-61) is a framework published by the US National Institute of Standards and Technology that defines a four-phase approach to incident response and provides guidance on team structure, policies, and procedures, widely adopted in government, finance, and large enterprises globally.*

NIST SP 800-61 Revision 2 (2012) is the current published version. NIST is in the process of producing Revision 3, which restructures around the broader **NIST Cybersecurity Framework 2.0** (released 2024) functions: Identify, Protect, Detect, Respond, Recover, and the newly-added Govern.

The four-phase model in NIST SP 800-61 R2:

1. **Preparation.** Build the team, the tools, the policies, the playbooks.
2. **Detection and Analysis.** Recognise incidents and understand them.
3. **Containment, Eradication, and Recovery.** Limit the damage; remove the cause; restore operations.
4. **Post-Incident Activity.** Review and improve.

NIST emphasises:
- Documented policies and procedures.
- Trained, designated team with clear authority.
- Pre-established communication channels.
- Tools and resources prepared in advance.
- Continuous improvement.

### SANS framework

*The SANS Incident Response Process is a six-phase framework for handling security incidents, developed and promoted by the SANS Institute through its training programmes, widely used in the security-practitioner community and slightly more granular than NIST's four-phase model.*

The six SANS phases:

1. **Preparation.**
2. **Identification.**
3. **Containment.**
4. **Eradication.**
5. **Recovery.**
6. **Lessons Learned.**

The SANS framework is essentially NIST's, with NIST's "Detection and Analysis" split into "Identification" (the recognition step) and the analytical work shifted earlier; and NIST's combined "Containment, Eradication, Recovery" split into three separate phases.

Many practitioners find SANS' more granular split helpful because it forces explicit attention to each step. Others find NIST's coarser structure better for executive-level conversations.

### Comparison

| Aspect | NIST SP 800-61 | SANS |
|---|---|---|
| Number of phases | 4 | 6 |
| Origin | US federal standard body | Practitioner training organisation |
| Audience | Government, enterprises | Security professionals, mid-size organisations |
| Documentation | Detailed published guide | Training-centric; less single-document foundation |
| Adoption | Strong in regulated industries and government | Strong in practitioner community |
| Compatibility | Compatible with broader NIST CSF | Compatible with broader practitioner toolkits (SOC, MSSP) |

The choice between them in practice is often dictated by which framework the organisation's regulators or auditors expect. Nepal Rastra Bank's directives reference broader risk-management frameworks; specific incident-response framework adoption varies by bank. Major commercial banks in Nepal have largely adopted variants of NIST or SANS aligned with their international consultancy partners (Big 4 firms, regional MSSPs).

### Other relevant frameworks

Beyond the two primary ones:

- **ISO/IEC 27035** — international standard on incident management.
- **ENISA's incident response good practice guides** — European Union Agency for Cybersecurity.
- **CERT/CC's incident management process** — Carnegie Mellon's foundational work.
- **MITRE's PRE-ATT&CK and ATT&CK** — adversary-behaviour catalogues used in detection and analysis.
- **The Diamond Model of Intrusion Analysis** — analytical framework for characterising incidents.
- **The Lockheed Martin Cyber Kill Chain** — seven-step attacker process used in detection planning.

A mature programme draws on multiple frameworks rather than rigidly following one.

## 1.9 Incident response plan and team

### Incident response plan

*An incident response plan is a documented, approved set of policies, procedures, roles, responsibilities, and tools that an organisation will execute when a security incident occurs, prepared in advance so that the response can be timely, coordinated, and effective.*

The plan is the operational embodiment of the framework. It specifies who does what, when, how, with what authority, communicating with whom, using what tools.

A typical plan covers:

**Authority and scope.** Who has authority to declare an incident, to take systems offline, to spend emergency funds, to engage external help, to communicate publicly. The scope of the plan — which systems, which incidents.

**Roles and responsibilities.** Specific roles in the response and what each does.

**Classification and prioritisation.** How to triage incidents by severity. Definitions for low/medium/high/critical.

**Detection procedures.** How incidents are detected and how alerts are escalated.

**Response procedures.** Specific playbooks for common incident types (ransomware, data breach, account compromise, DDoS, phishing).

**Communication procedures.** Internal escalation, external notification, regulatory reporting, media handling.

**Forensic preservation.** How to preserve evidence during response.

**Recovery procedures.** How to restore systems and verify integrity.

**Documentation requirements.** What must be recorded and how.

**Plan maintenance.** How and when the plan is reviewed and updated.

**Training and testing.** Tabletop exercises, simulations, red-team engagements.

### Incident response team

*An incident response team, sometimes called a Computer Security Incident Response Team (CSIRT) or Cyber Emergency Response Team (CERT), is the designated group of people responsible for executing the organisation's incident response plan, with defined roles, training, authority, and tools.*

A typical team structure:

**Incident commander / response manager.** Overall lead during the incident. Makes operational decisions. Coordinates the team. Reports to executive leadership.

**Technical lead.** Senior technical decision-maker. Directs analytical and remediation work.

**Forensic analyst(s).** Conducts the forensic work — imaging, analysis, evidence preservation.

**Network engineer.** Implements containment at the network level — firewall rules, segmentation, traffic blocking.

**System administrator(s).** Implements containment and remediation on systems.

**Threat intelligence analyst.** Provides context on attacker capabilities and likely next moves.

**Legal counsel.** Advises on regulatory obligations, evidence handling, communication implications.

**Communications / PR.** Handles internal and external communication.

**Executive sponsor.** Senior executive who provides authority for major decisions (spend, system shutdowns, public statements). Often the CISO or COO.

**External partners.** Vendors, MSSPs, law enforcement liaisons, external counsel — engaged as needed.

For small organisations, several roles are combined into single people. For large organisations or major incidents, each role may be multiple people.

### Models of team organisation

**Internal team.** All response capability in-house. Strong control but expensive to maintain; difficult for small organisations.

**Outsourced team.** A managed security services provider (MSSP) or specialist firm provides the response capability on retainer. Common for small and mid-size organisations.

**Hybrid.** A small internal team supplemented by external capability for major incidents. Most common pattern for mid-size enterprises.

**Coordinating team.** A central team coordinates across business units that each have local response capability. Common in very large organisations.

In Nepal:
- Large commercial banks typically have small internal teams supplemented by external retainers with international forensic firms.
- Telecoms (NTC, Ncell) maintain larger internal capabilities.
- Government agencies vary widely; coordination through npCERT for national-significance incidents.
- Smaller organisations rely entirely on external help or have no formal response capability — a major weakness in the national posture.

### National-level incident response

At the national level, the **National CERT (npCERT)** under the National Information Technology Centre is Nepal's official Computer Security Incident Response Team. It provides:

- Coordination during major incidents affecting government or critical infrastructure.
- Threat intelligence and advisories.
- Limited technical assistance to victim organisations.
- Liaison with international CERTs.
- Public awareness on cyber threats.

The capability is growing but resourcing remains a constraint. Major incidents in 2023-2025 (GIDC DDoS, MoE breach, Nepal Police website incident) tested the national response capability and highlighted areas for investment.

### Tabletop exercises and testing

A plan that has never been exercised is unreliable. **Tabletop exercises** walk the team through a hypothetical scenario, asking each role what they would do. Red-team exercises run actual attacks against the organisation's defences and measure how the team responds.

Mature programmes run tabletop exercises monthly or quarterly, and full simulations annually or more often. The exercises catch:
- Procedures that look good on paper but do not work in practice.
- Tools that are unavailable when needed.
- Communications that break down under pressure.
- Roles that are unstaffed.
- Decisions that no one is empowered to make.

Each gap identified is a gap fixed. The discipline of regular exercising — much like fire drills — is a defining characteristic of organisations that handle real incidents well.

The next chapter turns to the operational mechanics of disk and filesystem forensics — how to acquire, preserve, and analyse the storage layer that, in most incidents, contains the bulk of the recoverable evidence.
