---
title: 'Chapter 5 — Business Continuity and Disaster Recovery Plan'
sidebar_label: 'Ch 05 — Business Continuity and Disaster Recovery Plan'
sidebar_position: 5
description: 'Chapter 5 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch05
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Every organisation faces disruption. Natural disasters, cyber attacks, power failures, equipment breakdowns, pandemics, civil disturbances, human error — the catalogue of things that can interrupt normal operations is long. For Nepali organisations, the 2015 Gorkha earthquake, the 2020 COVID-19 pandemic, recurring monsoon flooding, the 2024 Government Integrated Data Centre DDoS, and many smaller incidents have demonstrated that disruption is not hypothetical. Business continuity and disaster recovery are the disciplines that prepare an organisation to keep operating through disruption and to recover when operations are interrupted. This chapter covers the BC/DR process, business impact analysis, incident response, disaster recovery plans, emergency preparedness, business continuity strategies, and the audit checklists that confirm plans are in place and tested.

## 5.1 Business continuity and disaster recovery process

### Business continuity

*Business continuity is the capability of an organisation to continue delivering its products and services at acceptable predefined levels following a disruptive incident, encompassing the strategies, plans, processes, and resources that ensure operations resume or persist through adverse events.*

The emphasis is on **continuity** — the organisation continues to operate, perhaps in a degraded mode, perhaps at an alternative location, through the disruption. The customer's experience may be different but service continues.

### Disaster recovery

*Disaster recovery is the subset of business continuity focused specifically on the restoration of information technology systems, data, and infrastructure after a disruptive event, providing the technical capability that business continuity depends on.*

The emphasis is on **recovery** — bringing IT systems back to operation after they have failed. BCP is broader (operations as a whole); DRP is narrower (IT systems specifically).

The two are related but distinct:

| Aspect | BCP | DRP |
|---|---|---|
| Scope | Whole business | IT systems |
| Lead role | Business operations / continuity manager | IT / DR coordinator |
| Concerns | Staff, premises, processes, IT | Systems, data, infrastructure |
| Output | Continuity of customer service | Recovery of IT capability |
| Test | Tabletop exercises, simulations of operations | Technical fail-over tests, restore tests |

### The BC/DR process

The standard lifecycle:

1. **Initiation.** Senior management commits to a BC/DR programme. Resources are allocated.
2. **Risk assessment and business impact analysis.** What disruptions could occur; what would they cost.
3. **Strategy development.** How will the organisation respond to identified disruptions.
4. **Plan development.** Detailed plans documented for each scenario.
5. **Implementation.** Building the infrastructure (alternative sites, backup systems, communication mechanisms).
6. **Training and awareness.** Staff know their roles.
7. **Testing.** Plans tested at intervals.
8. **Maintenance.** Plans updated as the organisation changes.
9. **Review.** Periodic management review of the programme.

The process is cyclical. Tests reveal weaknesses; weaknesses prompt plan updates; updates require re-training; environmental changes trigger reassessment.

### Standards and frameworks

Several standards guide BC/DR:

**ISO 22301.** International standard for Business Continuity Management Systems. The BC equivalent of ISO 27001. Specifies management-system requirements; supports certification.

**ISO 22313, 22317, 22318.** Companion guidance for implementation, BIA, and supply-chain continuity.

**NIST SP 800-34.** Contingency Planning Guide for Federal Information Systems. Detailed methodology.

**NFPA 1600.** US National Fire Protection Association standard for disaster/emergency management and business continuity.

**ITIL.** Service continuity management as part of broader IT service management.

For Nepali banks, NRB IT directives explicitly require BCP and DRP. The directives reference international standards while imposing Nepal-specific requirements (geographic separation of DR sites, testing frequency, regulator reporting after incidents).

## 5.2 Business impact analysis and incident response plan

### Business impact analysis

*A business impact analysis is the process of identifying the critical business functions, assessing the impact of disruption to each over time, and determining the resources and timelines needed to recover them, providing the foundation for business continuity strategy and plan development.*

The BIA is conducted before the plans are written. Without understanding what matters most and how quickly it must be recovered, plans cannot be properly designed.

### BIA process

1. **Identify critical business functions.** What does the organisation do? Which activities are essential?
2. **For each function, identify supporting resources.** People, systems, locations, vendors, data.
3. **Assess impact over time.** What is the impact at 1 hour, 4 hours, 1 day, 1 week, 1 month?
4. **Determine recovery objectives.** RTO, RPO, MTPD.
5. **Identify dependencies.** Which functions depend on which resources, and on each other.
6. **Document findings.**

### Recovery objectives

*Recovery Time Objective (RTO) is the maximum acceptable time within which a business function must be restored after disruption to avoid unacceptable consequences.*

A bank's core banking system might have RTO of 4 hours — after 4 hours of outage, the consequences (regulatory issues, customer harm, financial impact) become unacceptable.

*Recovery Point Objective (RPO) is the maximum acceptable data loss measured in time, representing how much recent data the organisation can afford to lose in a disaster.*

A core banking system might have RPO of 15 minutes — at most 15 minutes of transactions can be lost. This drives backup and replication design.

*Maximum Tolerable Period of Disruption (MTPD) is the time after which the viability of the organisation is irrecoverably threatened if a particular function is not resumed.*

A core banking system's MTPD might be days; the bank cannot survive permanent loss.

| Function | RTO | RPO | MTPD |
|---|---|---|---|
| Core banking | 4 hrs | 15 min | 2 days |
| Internet banking | 4 hrs | 15 min | 2 days |
| Mobile banking | 4 hrs | 15 min | 2 days |
| ATM network | 8 hrs | 1 hr | 3 days |
| Treasury system | 4 hrs | 30 min | 1 day |
| HR system | 48 hrs | 24 hrs | 1 month |
| Email | 8 hrs | 4 hrs | 1 week |
| Intranet | 72 hrs | 24 hrs | 1 month |

The lower the RTO/RPO, the more expensive the recovery infrastructure. The cost-benefit trade-off is part of strategy development.

### BIA techniques

**Questionnaires.** Sent to business-function owners; structured responses.

**Interviews.** With function owners and operational staff.

**Workshops.** Bringing groups together to develop impact estimates.

**Process mapping.** Documenting how functions actually operate.

**Quantitative analysis.** Modelling financial impact over time.

The output of a BIA is typically a structured document mapping functions to dependencies, recovery objectives, and impact profiles.

### Incident response plan

*An incident response plan is the documented set of procedures the organisation will follow when an incident occurs, designed to detect, contain, eradicate, and recover from incidents while maintaining communication and documentation throughout, providing the operational complement to the business continuity strategy.*

Incident response is closely related to BC/DR but focused on specific incidents — cyber attacks, data breaches, fraud events, technical failures. The Digital Forensics and Incident Response subject covered this in depth; this chapter focuses on the audit perspective.

For audit purposes, the auditor verifies:

- A documented incident response plan exists.
- The plan is current.
- The incident response team is staffed and trained.
- Escalation paths are defined and tested.
- The plan integrates with broader BC/DR.
- Incidents are logged, classified, and reported.
- Lessons learned from past incidents are incorporated.

### NRB requirements for incident response

NRB directives require Nepali commercial banks to:
- Maintain an incident response plan.
- Report significant incidents to NRB within prescribed timelines.
- Coordinate with npCERT for incidents of national significance.
- Test the plan periodically.
- Conduct post-incident reviews.

The 2017 NIC Asia SWIFT incident shaped subsequent NRB requirements about high-trust systems and incident reporting. Subsequent incidents (2020 breaches, 2024 GIDC DDoS, 2025 Nepal Police database leak) have sustained regulatory attention.

## 5.3 Disaster recovery plan

### DRP

*A disaster recovery plan is the documented set of procedures, technical configurations, and resources that enables the recovery of an organisation's IT systems and data after a disruptive event, specifying what to do, when to do it, who is responsible, and what tools and infrastructure are needed.*

The DRP is the technical execution arm of broader business continuity.

### Components of a DRP

**Activation criteria.** When the DRP is invoked. Who has authority to declare a disaster. What triggers the declaration.

**Recovery team.** Names, roles, contact information. Backups for each role.

**Communication plan.** How team members reach each other; how stakeholders are kept informed.

**System recovery priorities.** Which systems are recovered in what order, based on RTOs.

**Technical recovery procedures.** Step-by-step technical actions for each system.

**Resource requirements.** Hardware, software, network, facilities, personnel.

**Vendor contacts.** Suppliers, service providers, support contacts.

**Documentation requirements.** What gets recorded during the recovery.

**Return-to-normal procedures.** How the organisation returns from the recovery site/configuration to normal operations.

**Plan maintenance.** When and how the plan is updated.

### DRP development

A typical sequence:

1. **From the BIA, determine systems to plan for.**
2. **Determine recovery strategy for each.** Hot site, warm site, cold site, cloud-based, mutual agreement.
3. **Design the recovery infrastructure.**
4. **Document technical procedures.**
5. **Train the team.**
6. **Test.**
7. **Maintain.**

### Recovery infrastructure options

**Hot site.** Fully-equipped, ready-to-run replica of the primary site. Most expensive; lowest RTO (minutes to hours). Used for highest-criticality systems. Many Nepali banks operate hot sites for core banking.

**Warm site.** Partially-equipped; needs setup before use. Lower cost than hot; RTO measured in days. Used for moderately-critical systems.

**Cold site.** Bare facility with power and connectivity but no equipment. Cheapest; longest recovery time (weeks). Used for less-critical systems or as a fallback.

**Mobile site.** Recovery infrastructure in mobile units (trailers, containers). Deployed where needed.

**Reciprocal agreement.** Mutual agreement with another organisation to host recovery operations. Cheap but uncertain in practice.

**Cloud-based DR.** Recovery in cloud infrastructure. Increasingly common. Cost-effective; quick to provision. AWS, Azure, GCP all offer DR-specific services (AWS Disaster Recovery, Azure Site Recovery, GCP equivalents).

**Multi-region cloud.** Production runs across multiple cloud regions; failure of one region triggers automatic failover. Highest availability for cloud-native applications.

In Nepal, the typical pattern for a commercial bank:
- Primary data centre in Kathmandu (often in central business district).
- DR site at least 50 km away, often outside Kathmandu Valley (Hetauda, Pokhara, or other locations) — explicitly required by NRB directives for geographic separation.
- Hot or warm site configuration depending on bank size.
- Replication from primary to DR continuously or near-continuously.

After the 2015 Gorkha earthquake, several Nepali banks moved their DR sites further from Kathmandu, recognising that an earthquake affecting the Valley could affect both a Kathmandu primary and a Kathmandu DR site.

## 5.4 Types of disaster recovery plans

### Different DR plans for different scenarios

A single DRP rarely covers all scenarios. Organisations often have several plans:

**System-specific DRP.** For one major system (core banking) with its own recovery procedures.

**Site-specific DRP.** For loss of a specific location (head office, primary data centre).

**Regional DRP.** For loss of operations in a region (city, province).

**Scenario-specific DRP.** For specific scenario types (cyberattack, fire, flood, pandemic, civil disturbance).

**Component-specific DRP.** For specific technology components (network, database, application servers).

The plans are coordinated; activation of one may trigger others.

### Other related plans

Several plan types complement DRP:

**Business Continuity Plan (BCP).** Broader; includes non-IT.

**Incident Response Plan (IRP).** Specific to incidents (typically security).

**Crisis Management Plan.** Senior-management plan for major events affecting reputation, stakeholders, regulatory standing.

**Pandemic Response Plan.** Specific to pandemic scenarios. Updated by many organisations after COVID-19.

**Emergency Response Plan.** Life-safety focus; evacuation procedures, first aid, emergency-services coordination.

**Communication Plan.** How communications are maintained during disruption.

**Cyber Incident Response Plan.** Specifically for cybersecurity events.

For a Nepali commercial bank, the standard plan set includes BCP, DRP, IRP, Crisis Management Plan, and several scenario-specific addenda. NRB requires evidence that the plans exist, are tested, and are maintained.

### Plan integration

The plans must work together. Common integration points:

- **Activation.** Triggering one plan may trigger others.
- **Communication.** Single communication framework across plans.
- **Roles.** People may have roles in multiple plans.
- **Recovery sequence.** Plans share an overall recovery sequence.
- **Decision authority.** Clear hierarchy for cross-plan decisions.

Plans that conflict — or that overlap without clear ownership — fail in practice when an event activates them simultaneously. The audit examines integration as well as individual plans.

## 5.5 Emergency preparedness audit checklist

A practical checklist of items the IS auditor verifies regarding emergency preparedness.

### General preparedness

- [ ] BCP and DRP documents exist and are approved by senior management.
- [ ] Plans cover all critical business functions identified in the BIA.
- [ ] Plans reflect the current organisational structure and IT environment.
- [ ] Plans are reviewed and updated at least annually.
- [ ] Senior management has approved current versions.
- [ ] Plans are accessible to those who need them (including offline access in case of IT failure).

### BIA

- [ ] A BIA has been conducted within the past 1-2 years.
- [ ] Critical business functions are identified.
- [ ] RTO and RPO are documented for each.
- [ ] Dependencies are mapped.
- [ ] Impact over time is quantified.
- [ ] The BIA is signed off by business owners.

### Recovery infrastructure

- [ ] DR site location is documented and verified.
- [ ] DR site has the documented capability.
- [ ] DR site is physically separated from primary as required.
- [ ] Backup procedures are documented and operating.
- [ ] Backups are stored in protected locations (off-site).
- [ ] Encryption is applied to backups containing sensitive data.

### Communication

- [ ] Emergency contact lists are current.
- [ ] Multiple communication channels are available (phone, mobile, SMS, email, others).
- [ ] Communication tree is documented.
- [ ] Stakeholders (customers, regulators, vendors) are addressed in the plan.

### Training

- [ ] Key personnel know their roles.
- [ ] New employees receive BC/DR training.
- [ ] Annual refresher training occurs.
- [ ] Cross-training reduces single-person dependencies.

### Documentation

- [ ] System documentation is current and accessible at the DR site.
- [ ] Recovery procedures are documented at the system level.
- [ ] Configuration documentation exists for all critical systems.
- [ ] Documentation is reviewed during plan updates.

### Vendor coordination

- [ ] Critical vendors are identified.
- [ ] Vendor contracts include continuity provisions.
- [ ] Vendor contacts are documented.
- [ ] Vendor performance is monitored.

### Insurance

- [ ] Business interruption insurance is in place.
- [ ] Cyber insurance is in place (increasingly standard).
- [ ] Policy coverage matches identified risks.
- [ ] Claim procedures are understood.

A complete checklist might run to 100+ items. The audit uses such a checklist as a structured tool for assessing preparedness.

## 5.6 Business continuity strategies

The BC strategy describes how the organisation will continue operations during disruption. The strategy precedes detailed plans.

### Strategy options

**Internal resilience.** Build the organisation's own capability to withstand and recover from disruption. Multiple sites, redundant infrastructure, cross-trained staff.

**External services.** Contract with specialist providers for recovery services. Less in-house investment; reliance on external party.

**Hybrid.** Internal capability for some functions, external for others.

**Cloud-based continuity.** Leverage cloud's geographic distribution and rapid provisioning.

### Strategy considerations

Several factors shape strategy choice:

**RTO and RPO requirements.** Lower objectives need more sophisticated strategies.

**Budget.** Resilience costs; budget constrains strategy.

**Regulatory requirements.** Banks must meet regulator expectations; some strategies are mandated or favoured.

**Geographic risk.** Earthquake-prone regions need geographic separation.

**Vendor availability.** Are appropriate vendors available locally?

**Staff capability.** Do staff have the skills for the chosen strategy?

**Existing infrastructure.** What can be leveraged from current investment?

### Example strategies

**For a mid-size Nepali commercial bank:**
- Primary data centre in Kathmandu with redundant power and cooling.
- DR site in Pokhara or other location, 200+ km from primary.
- Real-time replication for core banking; daily backup for less-critical systems.
- Cloud-based services for non-critical functions (email, intranet).
- Branch operational continuity through paper-based procedures during digital outages.

**For a small fintech (50 employees, fully-cloud):**
- Multi-region AWS deployment with automatic failover.
- Daily database backups to a different region.
- Office work supported by laptops and cloud-based collaboration (no on-premises systems to recover).
- Remote work as default; physical office disruption has minimal impact.

**For a Nepali government agency with critical citizen services:**
- Primary infrastructure at the Government Integrated Data Centre.
- DR at a secondary government data centre.
- Plans for manual processing during extended outages.
- Coordination with NTC and Ncell for connectivity continuity.

### Pandemic considerations

The COVID-19 pandemic (2020-22) revealed BC strategy gaps that few had anticipated:
- Staff unable to come to offices for extended periods.
- Reliance on remote work for jobs not designed for it.
- IT capacity for remote access not previously sized.
- Vendor and supply-chain disruptions.

Post-pandemic, most BC strategies explicitly address pandemic scenarios: remote-work capability for all critical functions; geographic dispersion of staff; vendor diversification.

## 5.7 Business resumption plan audit checklist

The business resumption plan focuses on the return to normal operations after an emergency. It complements the disaster recovery plan (which focuses on the emergency response).

### Audit checklist for business resumption

**Plan existence and approval:**
- [ ] Business resumption plan exists in writing.
- [ ] Plan is approved by senior management.
- [ ] Plan covers all critical business functions.
- [ ] Plan is reviewed annually.

**Resumption procedures:**
- [ ] Procedures specify the sequence of resumption.
- [ ] Procedures address technology systems.
- [ ] Procedures address physical premises.
- [ ] Procedures address staff return-to-work.
- [ ] Procedures address customer communication.
- [ ] Procedures address vendor coordination.

**Validation criteria:**
- [ ] Plan specifies how successful resumption is verified.
- [ ] Quality and integrity checks are defined for restored systems.
- [ ] Customer-impact assessment is performed.

**Communication during resumption:**
- [ ] Internal communication during resumption is planned.
- [ ] Customer communication is planned (notification, expectations).
- [ ] Regulator communication is planned.
- [ ] Public communication (if relevant) is planned.

**Documentation:**
- [ ] Resumption events are documented.
- [ ] Lessons learned are captured.
- [ ] Outage time, recovery time, and impact are recorded.

**Coordination:**
- [ ] Coordination with vendors during resumption is specified.
- [ ] Coordination with regulators is specified.
- [ ] Coordination with insurance is specified.

**Post-resumption activities:**
- [ ] Post-incident review is mandatory.
- [ ] Lessons learned are incorporated.
- [ ] Plan updates are tracked.

The audit verifies each item; findings drive plan improvement.

## 5.8 Recovery procedures testing checklist and plan maintenance checklist

### Why testing matters

A plan never tested is unreliable. Tests reveal:
- Procedures that look reasonable on paper but fail in execution.
- Missing prerequisites (tools, documents, contacts).
- Skills gaps in personnel.
- Recovery times longer than planned.
- Communications that break down under pressure.
- Decisions that no one has clear authority to make.

Each test improves the plan; over years of testing, the plan becomes a reliable operational tool.

### Types of tests

**Walkthrough / desk check.** Plan team walks through the plan; no actual recovery. Lowest cost; lowest realism.

**Tabletop exercise.** Scenario is presented; team discusses actions. Identifies decision-making gaps.

**Simulation.** Recovery activities are simulated without actual failover.

**Parallel test.** Recovery systems are activated in parallel with production. No actual switchover; comparison of recovery output to production.

**Full interruption test.** Production is actually failed over to recovery infrastructure. Highest cost; highest realism. Used sparingly because of risk and disruption.

A mature BC/DR programme uses multiple types — frequent low-cost tests, periodic full tests.

### Test frequency

NRB directives for Nepali banks require:
- DR tests at least annually.
- BC tests at least annually.
- Specific testing requirements for the most-critical systems.

Many banks test more frequently — quarterly tabletop exercises, semi-annual technical tests, annual full failover tests.

### Recovery procedures testing checklist

**Planning:**
- [ ] Test plan documented before test.
- [ ] Test objectives specified.
- [ ] Success criteria defined.
- [ ] Participants identified.
- [ ] Customer-facing communication planned (where customers are involved).
- [ ] Risk to production assessed.

**Execution:**
- [ ] Test runs to plan.
- [ ] Observers document actions.
- [ ] Discrepancies are recorded.
- [ ] Decisions are documented.

**Validation:**
- [ ] Recovery systems function correctly.
- [ ] Data integrity verified.
- [ ] Performance acceptable.
- [ ] Time to recovery within RTO.
- [ ] Data loss within RPO.

**Issue resolution:**
- [ ] Issues identified during test are logged.
- [ ] Root causes identified.
- [ ] Remediation actions assigned with owners and deadlines.
- [ ] Re-test scheduled.

**Reporting:**
- [ ] Test report prepared.
- [ ] Senior management informed.
- [ ] Regulator informed where required.

**Lessons learned:**
- [ ] Plan updates identified.
- [ ] Training needs identified.
- [ ] Process improvements identified.

### Plan maintenance checklist

Plans must be kept current. Maintenance triggers:

**Routine triggers:**
- [ ] Annual review and update.
- [ ] Post-test updates.
- [ ] Post-incident updates.

**Event-driven triggers:**
- [ ] Significant organisational change (M&A, restructuring).
- [ ] Major IT change (system replacement, cloud migration).
- [ ] New regulation.
- [ ] Personnel changes affecting plan roles.
- [ ] Vendor changes.
- [ ] Site changes.

**Maintenance activities:**
- [ ] Plan reviewed for currency.
- [ ] Contact information verified.
- [ ] Procedures updated.
- [ ] System inventory matches plan.
- [ ] Dependencies remain accurate.
- [ ] Sign-off obtained.

**Documentation:**
- [ ] Version control on plan documents.
- [ ] Change log maintained.
- [ ] Old versions archived.

The IS auditor evaluates maintenance discipline — checking that triggers have been recognised, that updates have been made, and that the current plan reflects the current environment.

### Common findings

In Nepali bank IS audits, recurring findings around BC/DR include:

- Plans documented but not exercised within the year.
- DR site capability assumed but not verified by actual test.
- Recovery procedures missing key technical details.
- Contact lists out of date.
- Cloud-DR capability assumed without testing the actual fail-over.
- Cross-training gaps; recovery dependent on a few individuals.
- Vendor coordination during exercises minimal.
- Lessons learned from past tests not implemented.

Each finding becomes a recommendation for management action — and a focus of follow-up testing.

The next chapter shifts to security testing techniques and to the audit considerations for cloud computing environments — the technologies that have reshaped the modern audit landscape.
