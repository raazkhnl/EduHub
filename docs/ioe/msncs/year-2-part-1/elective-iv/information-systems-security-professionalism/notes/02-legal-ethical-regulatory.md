---
title: 'Chapter 2 — Legal, Ethical and Regulatory Frameworks'
sidebar_label: 'Ch 02 — Legal, Ethical and Regulatory Frameworks'
sidebar_position: 2
description: 'Chapter 2 of Information Systems Security Professionalism (INFOSEC-PRO).'
slug: /ioe/msncs/year-2-part-1/elective-iv/information-systems-security-professionalism/notes/ch02
tags: [msncs, INFOSEC-PRO, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The security professional operates within an extensive framework of laws, regulations, and ethical norms. The legal frameworks define what conduct is permitted, required, or forbidden — both for the professional personally and for the organisations they serve. The ethical norms shape decisions in situations where the law is silent or where multiple legal courses are possible. The intersections — where law, ethics, organisational interests, and individual judgement meet — define some of the most consequential decisions security professionals make. This chapter examines cybercrime laws across jurisdictions including Nepal, intellectual property and liability considerations, privacy laws and compliance, and the specific discipline of responsible disclosure with its attendant ethical dilemmas.

## 2.1 Cybercrime laws — Nepal frameworks, GDPR, HIPAA, cross-jurisdictional considerations

### Cybercrime law overview

*Cybercrime law is the body of statutes, regulations, and case law that defines criminal offences involving computers, networks, and digital information, prescribes penalties, and establishes procedures for investigation and prosecution, generally addressing both crimes that target computer systems (unauthorised access, malware, denial of service) and crimes that use computer systems (online fraud, identity theft, harassment).*

The discipline has evolved over four decades as digital systems became central to economic and social life. Different jurisdictions have taken different approaches; the security professional must understand applicable laws where they work and where their organisation's systems operate.

### Nepal's cybercrime legal framework

Nepal's framework for cybercrime has evolved:

**Electronic Transactions Act 2063 (2008).** Nepal's foundational digital law. Provisions include:
- Recognition of electronic records and digital signatures.
- Computer-related offences (unauthorised access, damage, tampering).
- Penalties for various computer crimes.
- Establishment of computer-crime investigation framework.

**Penal Code 2074 (2017).** Includes provisions relevant to cybercrime as part of broader criminal law.

**Privacy Act 2075 (2018).** Discussed extensively in Section 2.3; establishes privacy framework with enforcement provisions.

**Banking and Financial Institutions Act, NRB Directives.** Sectoral provisions affecting financial cybercrime.

**Telecommunications Act and NTA Directives.** For telecom sector.

**Electronic Transactions (Amendment) Bill and proposed Information Technology Bill.** Periodic legislative initiatives to update framework.

### Specific cybercrime offences in Nepal

Under ETA and related laws, the typical offences:

**Unauthorised access.** Accessing computer systems without authority.

**Damage to computer systems.** Damaging hardware, software, or data.

**Identity theft and impersonation.** Various forms.

**Online fraud.** Using computers to commit fraud.

**Harassment and defamation.** Including online forms.

**Distribution of harmful content.** Including provisions on obscenity, hate speech.

**Forgery of electronic records.** Forging digital documents.

**Hacking and malware-related offences.**

Penalties vary by offence — fines, imprisonment, both.

### Enforcement institutions

**Cyber Bureau under Nepal Police.** Primary investigation unit for cybercrime in Nepal. Based in Kathmandu with growing regional capability.

**Ministry of Communications and Information Technology.** Policy oversight.

**Nepal Telecommunications Authority.** Sectoral regulation including some cybercrime aspects affecting telecoms.

**Nepal Rastra Bank.** Banking-sector cybercrime coordination.

**npCERT.** National-level coordination and technical support; not primarily enforcement.

**Office of the Attorney General.** Prosecution.

**Courts.** Adjudication; specific provisions for electronic evidence under Evidence Act 2031 (1974) and ETA.

### Major international frameworks

The security professional working in or for multinational organisations must understand major international frameworks.

**GDPR — General Data Protection Regulation (EU, 2016/effective 2018).** Comprehensive privacy framework with extraterritorial reach. Discussed in Section 2.3 in privacy context.

**HIPAA — Health Insurance Portability and Accountability Act (US, 1996).** US framework for health information privacy and security. Detailed Security Rule provisions for healthcare and business associates.

**SOX — Sarbanes-Oxley Act (US, 2002).** Financial reporting and controls; IT controls relevant to public companies.

**PCI-DSS.** Industry standard for payment card data; not legislation but contractually mandatory for entities handling card data.

**Convention on Cybercrime (Budapest Convention, 2001).** First international treaty on cybercrime. Nepal is not signatory but framework influences regional policy.

**UN Convention against Cybercrime (2024).** Recent international framework; signatories and ratification ongoing.

**Various national cybercrime laws.** Each country has its framework with specific provisions.

### Cross-jurisdictional considerations

Cybercrime is inherently transnational. Considerations:

**Where did the crime occur?** Attacker location? Victim location? Where data resides? Where infrastructure is located?

**Which jurisdiction has authority?** Often multiple have claims.

**Mutual legal assistance.** Formal processes for cross-border cooperation.

**Extradition.** Where applicable.

**Evidence sharing.** Subject to legal frameworks.

**Local laws affecting investigation.** What evidence collection is permitted locally.

For Nepali organisations:
- Attacks often originate outside Nepal.
- Nepali law may not directly reach attackers.
- International cooperation through Interpol, mutual legal assistance treaties.
- Practical recovery limited even when attackers identified.

### Sector-specific frameworks

**Banking.** NRB IT directives include provisions relevant to cybercrime — incident reporting, evidence preservation, customer notification.

**Telecoms.** NTA frameworks include cybersecurity provisions.

**Healthcare.** Limited specific Nepali framework; international standards (HIPAA-style provisions for international relationships).

**Critical infrastructure.** Emerging framework; not comprehensive.

**Public sector.** GIDC operating standards; ministry-level policies.

### The professional's legal awareness

The security professional needs awareness, though not deep legal expertise (which lawyers provide). Specifically:

**Applicable laws where you work.** Both general and sectoral.

**Applicable laws where the organisation operates.** Including extraterritorial reach of foreign laws.

**Incident reporting obligations.** When and how to report.

**Evidence handling requirements.** Chain of custody, preservation.

**Investigation limitations.** What you can and cannot do during investigation.

**Disclosure requirements.** When notification of customers, regulators, or others is required.

**Personal liability considerations.** Where the individual professional may be personally liable.

**Whistleblower protections.** Where available.

Legal counsel involvement on consequential matters is standard practice. The professional knows when to escalate to legal.

### Specific Nepal incident landscape

Documented cyber incidents involving Nepali organisations have included:

- **NIC Asia SWIFT incident (2017).** Bank fraud through SWIFT system; substantial loss; investigation involved multiple jurisdictions.
- **Foodmandu data breach (2020).** Customer data exposed; investigation focused on remediation.
- **Vianet data breach (2020).** Customer information exposed.
- **Government website defacements** (various years).
- **GIDC DDoS attack (2024).** Disrupted government services.
- **MoE breach (2025).** Education ministry data.
- **Nepal Police website (late 2025).** Reported significant data exposure.

Each incident has involved legal considerations — investigation, prosecution where possible, customer notification, regulatory engagement. The professional response to each generates lessons that inform practice.

## 2.2 Intellectual property and liability

### Intellectual property in security context

Intellectual property considerations affect security professionals in several ways:

**Software IP.** Code, designs, configurations are subject to IP law.

**Vulnerability research.** Discovered vulnerabilities raise IP questions.

**Threat intelligence.** Some intelligence is proprietary; some is public; redistribution rules apply.

**Tool development.** Tools developed during employment typically belong to employer.

**Open-source contributions.** Licence terms affect contribution and use.

**Trade secrets.** Some security knowledge is trade secret.

### Key IP categories

**Copyright.** Code, documentation, designs. Automatic protection in most jurisdictions.

**Patents.** Inventions including some software patents. Application required; enforcement complex.

**Trademarks.** Brand identifiers; vendor names, product names.

**Trade secrets.** Information whose value comes from secrecy. Protection through confidentiality, not registration.

**Database rights.** Some jurisdictions provide specific protection.

### Employer-employee IP

Most jurisdictions including Nepal recognise that IP created during employment for the employer's business belongs to the employer:

- Code written for the employer.
- Tools developed using employer time and resources.
- Documents created.
- Inventions related to the employer's business.

Employment agreements typically codify this with assignment clauses.

Personal time/personal projects: more complex; agreement terms matter.

For Nepali professionals:
- Employment agreements should be carefully reviewed before signing.
- Side projects in security may raise issues; clarification before starting wise.
- Open-source contributions during employment may need employer permission.

### Liability considerations

*Liability is the legal responsibility for harm caused — to others, to property, to information — that may result in obligations to pay damages, take corrective action, or face other legal consequences, with implications for both organisations and individual professionals.*

Liability considerations for security professionals:

**Organisational liability.** Organisations have legal obligations; failures can result in fines, settlements, customer obligations.

**Personal professional liability.** Professionals may face personal liability for malpractice, gross negligence, or willful misconduct.

**Director and officer liability.** Senior officers (including CISO sometimes) have specific obligations.

**Criminal liability.** For criminal acts or willful violations.

### Specific liability scenarios

**Data breach.** Organisation typically liable; individual professional may be liable for specific personal failings.

**Failure to apply known patches.** Could constitute negligence depending on circumstances.

**Misuse of credentials.** Professional with privileged access misusing them faces criminal and civil liability.

**False reporting.** Reporting incorrect information to regulators or stakeholders.

**Conflicts of interest improperly handled.** Liability where harm results.

**Sharing client information inappropriately.** Both confidentiality and contractual liability.

### Limiting personal liability

Practical measures:

**Operate within authority.** Don't take actions beyond scope.

**Document decisions.** Records show due care.

**Get authorisations in writing.** Verbal approval for unusual actions risky.

**Maintain professional standards.** Following standards is evidence of due care.

**Continuing education.** Demonstrating capability and currency.

**Professional insurance.** Where appropriate, professional liability insurance.

**Whistleblower processes.** Following formal channels when raising concerns.

**Legal counsel.** Consultation for consequential decisions.

### Liability in Nepali context

Nepali liability framework:
- General civil liability principles in Civil Code and case law.
- Specific provisions in various sectoral laws.
- Limited specific cybersecurity professional liability provisions.
- Director liability provisions in Companies Act 2063 (2006).
- Banking-specific provisions for bank officers.
- Limited specific personal liability for cybersecurity professionals.

The framework is less developed than in some jurisdictions; practitioner caution remains warranted.

### Vendor and contractor liability

Special considerations:

**MSSP relationships.** What is the MSSP's liability for missed incidents?

**Cloud provider liability.** Limited by SLA; typically narrow.

**Penetration tester liability.** For damage during testing; engagement letter clarifies.

**Audit firm liability.** For audit failures; significant in some contexts.

Contracts shape much of this. Professional review of contract terms before signing matters.

## 2.3 Privacy laws and compliance

### Privacy as fundamental right

Privacy is widely recognised as a fundamental human right:

- **Universal Declaration of Human Rights Article 12** (1948).
- **International Covenant on Civil and Political Rights Article 17** (1966).
- **European Convention on Human Rights Article 8.**
- **Various national constitutions including Nepal's Article 28.**

The recognition shapes legal frameworks.

### Nepal Privacy Act 2075 (2018)

Nepal's primary privacy legislation. Key provisions:

**Definition of personal information.** Information identifying or relating to a natural person.

**Lawful basis for processing.** Consent or other lawful basis.

**Rights of data subjects.** Access, correction, deletion (with limitations).

**Obligations of data controllers and processors.** Protection, purpose limitation, retention.

**Sensitive personal information.** Heightened protection.

**Cross-border transfer.** Provisions on movement of personal data.

**Enforcement.** Provisions for complaints and remedies.

**Penalties.** For violations.

**Special category protections.** Children, vulnerable individuals.

Implementation has been gradual; enforcement mechanisms developing. Awareness among Nepali organisations is variable; mature organisations have privacy programmes; many do not.

### Constitutional Article 28

The Constitution of Nepal Article 28 establishes privacy as fundamental right:
- Privacy of person.
- Privacy of residence.
- Privacy of property.
- Privacy of documents and records.
- Privacy of correspondence and communication.

This constitutional foundation supports broader privacy framework.

### Sectoral Nepali privacy provisions

**Banking.** NRB directives include customer information protection provisions.

**Telecoms.** NTA frameworks include subscriber privacy.

**Health.** Limited specific framework but professional confidentiality obligations.

### GDPR — General Data Protection Regulation (EU)

The dominant international privacy framework. Even Nepali organisations may need GDPR compliance if serving EU customers or processing EU residents' data.

**Key principles:**
- **Lawfulness, fairness, transparency.**
- **Purpose limitation.** Data collected for specific stated purposes.
- **Data minimisation.** Only what is necessary.
- **Accuracy.** Maintained accurate.
- **Storage limitation.** Retained only as long as necessary.
- **Integrity and confidentiality.** Appropriate security.
- **Accountability.** Demonstrable compliance.

**Key rights for data subjects:**
- Right to be informed.
- Right of access.
- Right to rectification.
- Right to erasure ("right to be forgotten").
- Right to restrict processing.
- Right to data portability.
- Right to object.
- Rights related to automated decision-making.

**Key obligations for organisations:**
- Privacy by design and default.
- Data protection impact assessments.
- Data protection officer (where required).
- Breach notification (72 hours typically).
- Cross-border transfer mechanisms.

**Penalties:** Up to 4% of global annual turnover or €20M, whichever higher.

### HIPAA — Health Insurance Portability and Accountability Act (US)

US framework for health information. Two main rules:

**Privacy Rule.** Use and disclosure of protected health information.

**Security Rule.** Administrative, physical, and technical safeguards for electronic PHI.

Covered entities (healthcare providers, plans, clearinghouses) and business associates (vendors handling PHI on behalf of covered entities) bound.

For Nepali context, HIPAA relevant for organisations:
- Providing services to US healthcare entities.
- Handling health data of US individuals.
- Outsourcing arrangements with US healthcare clients.

### Other major privacy frameworks

**CCPA / CPRA (California).** State-level US framework.

**PIPEDA (Canada).** Federal Canadian privacy law.

**LGPD (Brazil).** GDPR-influenced framework.

**PIPL (China).** Personal Information Protection Law.

**DPDP Act (India, 2023).** Digital Personal Data Protection Act; relevant for Nepali entities with Indian operations or customers.

**Various other national frameworks.** The privacy regulation map continues evolving.

### Compliance considerations

For Nepali enterprises handling privacy:

**Identify applicable frameworks.** Nepal Privacy Act always; others as international scope warrants.

**Data inventory.** What personal data is held; where; for what purpose.

**Legal basis.** Documented basis for processing each category.

**Notice.** Clear privacy notices to data subjects.

**Subject rights.** Mechanism for exercising rights.

**Security.** Appropriate technical and organisational measures.

**Vendor management.** Subcontractors meet privacy obligations.

**Breach response.** Documented procedures.

**Documentation.** Records of compliance activities.

**Training.** Staff understanding.

**DPO or equivalent.** Where required or beneficial.

### Privacy by design

A foundational principle: privacy considered from the start, not added later.

Seven principles (Cavoukian):
1. Proactive not reactive.
2. Privacy as default setting.
3. Privacy embedded in design.
4. Full functionality — positive sum, not zero sum.
5. End-to-end security throughout lifecycle.
6. Visibility and transparency.
7. Respect for user privacy.

Application: design systems and processes that minimise data collection, protect what is collected, support subject rights, and enable compliance.

For Nepali enterprises adopting new systems, privacy by design influences procurement, development, and operations.

## 2.4 Responsible disclosure and ethical dilemmas

### Responsible disclosure

*Responsible disclosure (also called coordinated disclosure) is the practice in which security researchers who discover vulnerabilities notify the affected vendor privately, allow reasonable time for remediation, and only publicly disclose details after a patch is available or after agreed disclosure deadlines have passed, balancing the interests of security improvement with reduction of immediate exploitation risk.*

The practice has become standard in security research. The norms have evolved over decades.

### The disclosure spectrum

**Full disclosure.** Publish all details immediately. Pressure on vendors; risk of immediate exploitation.

**Responsible disclosure.** Notify vendor; wait for patch; then disclose. Default modern practice.

**Coordinated disclosure.** Multi-party coordination — vendor, finder, third parties (such as CERTs) coordinate.

**Non-disclosure.** Discoveries kept private. Limited security benefit; can result in long-term vulnerability persistence.

**Sale to brokers.** Discoveries sold to vulnerability brokers; ethical questions intense.

### Typical responsible disclosure process

1. **Discovery.** Researcher identifies vulnerability.
2. **Notification.** Researcher contacts vendor (security@, bug bounty programme, designated channel).
3. **Acknowledgement.** Vendor confirms receipt.
4. **Triage.** Vendor investigates and confirms.
5. **Remediation.** Vendor develops patch.
6. **Coordination.** Researcher and vendor coordinate disclosure timing.
7. **Patch release.** Vendor releases patch.
8. **Public disclosure.** Researcher (or vendor) publishes details.
9. **Credit.** Researcher acknowledged.

Typical timeline: 90 days from notification to public disclosure (the Google Project Zero standard, widely adopted).

### Bug bounty programmes

Formal programmes where vendors pay researchers for valid vulnerability reports:

**HackerOne.** Major platform.

**Bugcrowd.** Major platform.

**Intigriti.** European-focused.

**YesWeHack.** European with global presence.

**Vendor-direct programmes.** Many large vendors run programmes directly.

Programmes provide:
- Defined scope.
- Defined payment structure.
- Legal protection (typically).
- Communication channels.
- Reputation building for researchers.

For Nepali context:
- Several Nepali researchers participate in international bug bounty programmes.
- Limited domestic programmes; emerging interest.
- Nepali payment-platform programmes (eSewa, Khalti) have considered programmes.
- Some banks have begun discussing programmes.

### Disclosure dilemmas

Real situations create ethical complexity:

**Unresponsive vendor.** What if vendor doesn't respond? Re-notify; escalate to industry-CERTs; eventually disclose after reasonable wait.

**Vendor demands extended embargo.** Vendor wants more than 90 days. How to respond? Generally accommodate if vendor is making genuine progress; firm if not.

**Government vendor.** Vulnerability in government system. Different dynamic; coordination through CERTs.

**Critical infrastructure.** Vulnerability affecting critical infrastructure. Special care; may warrant longer embargo.

**Active exploitation discovered.** Vulnerability already being exploited. May warrant faster disclosure to enable defence.

**Discoveries during paid engagement.** Vulnerabilities found during pentests belong contractually to client. Different rules.

**Third-party impact.** Vulnerability affects many vendors. Coordination complexity.

### Disclosure norms in Nepal

The Nepali context has specific considerations:

**Limited formal framework.** No specific Nepali law on responsible disclosure.

**npCERT coordination.** Available for nationally-significant disclosures.

**Cultural considerations.** Sometimes vendors react defensively rather than collaboratively.

**Legal protection limited.** Researcher legal protection less developed than some jurisdictions; care warranted.

**Building practice.** Norms developing; community engagement matters.

### Ethical dilemmas more broadly

Beyond disclosure specifically, security professionals face various ethical dilemmas. Some examples:

**Discovering employee misconduct during routine work.** Report? To whom? How?

**Asked to implement controls that may enable surveillance.** Refuse? Implement with limitations?

**Required to share information that could harm individuals.** Comply? Refuse? Negotiate?

**Working on systems used by adversary nation-states.** Continue? Resign? Disclose?

**Pressure to certify compliance not actually achieved.** Refuse and lose engagement? Compromise?

**Discovering historical incidents the organisation has not disclosed.** Report internally? Externally?

**Client requesting tools or services that may be misused.** Decline? Limit? Caveat?

**Personal relationships compromising objectivity.** Recuse? Inform supervisor?

Real dilemmas rarely match training examples. Resolution requires:
- Understanding applicable rules and norms.
- Consulting trusted advisors.
- Documenting reasoning.
- Acting with appropriate transparency.
- Living with the consequences.

### Frameworks for ethical decision-making

Several frameworks aid analysis:

**Stakeholder analysis.** Who is affected? How?

**Consequence analysis.** What outcomes are likely from different choices?

**Rights-based analysis.** Whose rights are at stake?

**Duty-based analysis.** What duties apply?

**Virtue ethics.** What would a person of good character do?

**Rule-based analysis.** What do applicable rules say?

No single framework provides all answers; using multiple frameworks generates fuller picture.

### Support systems

Difficult decisions are easier with support:

**Mentors.** Senior practitioners who have faced similar.

**Professional bodies.** (ISC)², ISACA, others provide ethical consultations.

**Legal counsel.** For legal aspects.

**Trusted colleagues.** Both inside and outside organisation.

**Industry contacts.** Peers facing similar issues.

**Documentation.** Writing through reasoning clarifies thinking.

Isolation in difficult decisions is dangerous; seeking input is professional practice.

### Building ethical capability

The capability to navigate ethical issues develops over career:

- **Early career.** Learn the rules; observe how senior practitioners handle situations.
- **Mid career.** Apply judgement in increasing range of situations.
- **Senior career.** Mentor others; contribute to evolving norms.
- **Throughout.** Continuous reflection on decisions made and lessons learned.

Ethical capability is not innate; it is developed through practice, reflection, and mentorship. The MSc graduate building a security career has decades to develop this capability — and the early decisions made shape habits that persist.

The next chapter takes up the formal frameworks — ISO 27001, NIST CSF, COBIT, CIS — that structure professional security practice and provide the foundation for governance, compliance, and audit work.
