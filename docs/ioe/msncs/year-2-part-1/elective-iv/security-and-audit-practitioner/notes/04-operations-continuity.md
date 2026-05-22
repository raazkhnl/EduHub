---
title: 'Chapter 4 — IS Operations and Business Continuity'
sidebar_label: 'Ch 04 — IS Operations and Business Continuity'
sidebar_position: 4
description: 'Chapter 4 of Security and Audit Practitioner (ENCTNS625).'
slug: /ioe/msncs/year-2-part-1/elective-iv/security-and-audit-practitioner/notes/ch04
tags: [msncs, ENCTNS625, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

This chapter carries 12 marks — the heaviest of the subject — reflecting both the breadth of IS operations and the criticality of business resilience. Operations is where most IT runs most of the time; auditing operations examines whether daily activities are performed with appropriate control. Business continuity and disaster recovery address the question of what happens when operations are disrupted — by cyber incident, infrastructure failure, natural disaster, pandemic, or other disruption — and whether the organisation can recover within tolerable timeframes. The Nepali context is direct: the 2015 earthquake, recurring monsoon-season disruptions, the 2024 GIDC DDoS attack, and continuing infrastructure dependencies make resilience a practical rather than theoretical concern. The practitioner's task is to assess whether resilience capabilities exist, are tested, and would actually work when needed.

## 4.1 IT operations management audit

### Operations audit scope

IT operations covers the steady-state running of information systems. The auditor examines:

- Operations governance and organisation.
- Service management processes.
- Change management.
- Incident management.
- Problem management.
- Configuration management.
- Capacity management.
- Availability management.
- Performance management.
- Service-level management.
- Outsourcing and third-party management.
- Job scheduling and processing.
- Backup operations.
- Monitoring operations.

Each area has specific tests.

### ITIL and service management

*ITIL (Information Technology Infrastructure Library) is the most widely-adopted framework for IT service management, currently in version 4, providing best practice guidance for delivering IT services aligned with business needs, structured around service value system and service value chain.*

ITIL practices include:

**General management practices.** Strategy, portfolio, architecture, project, risk, financial, organisational change, talent, knowledge, measurement, supplier, continual improvement.

**Service management practices.** Availability, business analysis, capacity and performance, change enablement, incident, problem, release, service catalogue, service configuration, service continuity, service desk, service design, service level, service request, service validation and testing, monitoring and event.

**Technical management practices.** Deployment, infrastructure and platform, software development and management.

The auditor uses ITIL as reference for service management maturity assessment.

### Change management audit

Change is among the most-audited areas because of its impact:

**Process examination.**
- Change request mechanism.
- Risk assessment for changes.
- Approval authority by change type.
- Change Advisory Board (CAB) operation.
- Implementation procedures.
- Testing requirements.
- Rollback procedures.
- Post-implementation review.

**Sample testing.**
- Sample of recent changes selected.
- For each: trace from request through approval, implementation, verification, closure.
- Identify deviations from process.

**Common findings:**
- Emergency changes overused.
- Approval inadequate for risk.
- Testing skipped under pressure.
- Rollback plans missing.
- Post-implementation review not performed.
- Unauthorised changes deployed.
- Change records incomplete.

For Nepali bank context, NRB IT directives have specific change management requirements; audit typically reports against these.

### Incident management audit

Incident management process examined:

**Process examination.**
- Incident detection mechanisms.
- Reporting channels.
- Triage process.
- Escalation procedures.
- Resolution methods.
- Communication patterns.
- Documentation requirements.
- Post-incident review.

**Sample testing.**
- Sample of recent incidents.
- For each: trace through process.
- Time-to-resolution analysis.
- Communication adequacy.

**Common findings:**
- Detection gaps (incidents missed).
- Slow detection.
- Inadequate triage.
- Communication failures.
- Documentation gaps.
- Post-incident review skipped.
- Lessons not applied.

### Problem management audit

Distinct from incident — problem management addresses root causes:

**Process.**
- Problem identification (from incidents and proactively).
- Root cause analysis.
- Known error tracking.
- Permanent fix development.
- Knowledge base maintenance.

**Audit.**
- Problems identified from incident patterns.
- Root cause analysis quality.
- Fix implementation.
- Recurrence reduction.

### Configuration management audit

Configuration Management Database (CMDB) examined:

**Inventory accuracy.** Configuration items in CMDB match reality.

**Relationship mapping.** Dependencies captured.

**Currency.** Updates reflect changes.

**Coverage.** All material CIs included.

**Integration.** Used by other processes.

Common finding: CMDB exists but accuracy questionable; configuration items not maintained.

### Capacity and performance management

For ongoing operations:

**Capacity planning.** Forecasts vs actuals.

**Performance monitoring.** Service levels tracked.

**Trend analysis.** Patterns identified.

**Tuning activities.** Performance improvements made.

**Issue resolution.** Capacity issues addressed.

Tools: monitoring platforms (SolarWinds, Datadog, New Relic, Dynatrace, Splunk, ELK stack, Grafana, Prometheus).

### Backup operations audit

Critical operational area:

**Backup policy.** Documented; covers what, when, how long.

**Backup execution.** Performed per schedule.

**Backup verification.** Successful completion confirmed.

**Restoration testing.** Periodic test restores.

**Backup security.** Backups protected.

**Offsite storage.** Geographic separation.

**Retention compliance.** Per policy and regulation.

**Immutability.** For ransomware resilience.

For Nepali bank context, NRB-required backup practices; audit verifies compliance and effectiveness.

Common findings:
- Backup failures not detected or addressed.
- Test restores not performed.
- Some systems excluded.
- Backup storage insecure.
- No immutable copies.

### Job scheduling and processing

For batch processing:

**Job scheduling.** Defined and approved.

**Job execution monitoring.** Failures detected.

**Job recovery.** Procedures for failures.

**Schedule changes.** Through change management.

**Output verification.** Outputs validated.

For Nepali banks running batch processing on core banking systems, this area is consequential — failures can cause customer impact and reconciliation issues.

### Outsourcing and third-party operations

Where IT services are outsourced:

**Contract terms.** Service levels, security requirements, audit rights.

**Vendor due diligence.** Initial and ongoing.

**Service-level monitoring.** Actual vs contractual.

**Issue management.** With vendor.

**Termination planning.** Exit strategy.

**Audit access.** Right to audit and exercise of right.

**SOC reports.** From service organisations.

For Nepali cloud usage (AWS, Azure, GCP, Oracle Cloud) and SaaS, third-party operations audit covers significant attack surface.

### Operations centre audit

NOC (Network Operations Centre) and similar:

**Coverage.** 24/7 or business hours.

**Staffing adequacy.** Skill levels appropriate.

**Procedures.** Documented runbooks.

**Tool effectiveness.** Monitoring capabilities.

**Escalation.** When and how.

**Documentation.** Operational records.

**Improvement.** Lessons applied.

For Nepali banks, NOC capability typically built; smaller institutions often share or outsource.

## 4.2 Business impact analysis

### Business Impact Analysis

*Business Impact Analysis is the systematic process of identifying and evaluating the potential effects of disruption to an organisation's business processes, systems, and services — quantifying impacts over time, identifying dependencies and recovery requirements — providing the foundation for business continuity planning, disaster recovery prioritisation, and resilience investment decisions.*

BIA precedes BCP and DR planning — you cannot plan recovery without understanding what needs recovering and how urgently.

### BIA scope and objectives

**Identify critical business processes.** What does the organisation do that matters most.

**Identify supporting IT services.** What IT supports each process.

**Quantify impact of disruption.** Financial, operational, reputational, regulatory, customer.

**Determine maximum tolerable downtime.** How long can the organisation survive without each process.

**Identify dependencies.** Internal and external.

**Establish recovery objectives.** RTO, RPO for each.

**Prioritise.** What recovers first.

### Critical terminology

**RTO — Recovery Time Objective.** *The maximum acceptable time between disruption and recovery — how long the organisation can be without a specific process before unacceptable harm — driving infrastructure and process design for recovery capability.*

**RPO — Recovery Point Objective.** *The maximum acceptable data loss measured in time — how much data the organisation can afford to lose between last backup and disruption — driving backup frequency, replication, and data protection design.*

**MTPD — Maximum Tolerable Period of Disruption.** Time beyond which survival is questioned.

**MBCO — Minimum Business Continuity Objective.** Minimum operational capability needed.

**WRT — Work Recovery Time.** Time to restore business operations after IT recovery.

**MTD — Maximum Tolerable Downtime.** Similar to MTPD.

For most processes:

- RTO < MTD (recovery before tolerance exceeded).
- RPO determined by data loss tolerance.
- Costs increase as RTO/RPO decrease.

### BIA methodology

Typical process:

**Step 1 — Stakeholder identification.** Process owners, IT, business leadership.

**Step 2 — Process inventory.** All business processes identified.

**Step 3 — Process analysis.** For each process:
- Description.
- Owner.
- Stakeholders.
- Inputs and outputs.
- Dependencies.
- Resources required.
- Supporting systems.
- Compliance requirements.

**Step 4 — Impact analysis.** Per process, impact of disruption:
- Financial impact (revenue, cost, fines).
- Operational impact.
- Customer impact.
- Reputational impact.
- Regulatory impact.
- Staff impact.

Impact typically modelled across timeframes (hour 1, hour 4, day 1, day 3, week 1, week 2).

**Step 5 — Recovery requirements.** RTO, RPO, resource requirements, alternative approaches.

**Step 6 — Prioritisation.** Processes prioritised based on impact and recovery feasibility.

**Step 7 — Documentation.** BIA report and ongoing register.

**Step 8 — Approval.** Senior management approval.

**Step 9 — Maintenance.** Periodic update.

### BIA audit

The auditor examines:

**BIA process documented.** Methodology defined.

**Recent BIA performed.** Within reasonable timeframe.

**Coverage adequate.** Material processes included.

**Stakeholder involvement.** Process owners engaged.

**Quantification.** Impacts quantified where possible.

**Recovery requirements defined.** RTO/RPO per process.

**Prioritisation rational.** Reasoning clear.

**Senior management approval.** Documented.

**Update cycle.** Per policy.

**Integration with BCP.** BIA feeds BCP.

### Common BIA findings

**Outdated.** Last updated years ago; doesn't reflect current state.

**Incomplete coverage.** Newer processes not included.

**Impact estimates poorly justified.** Numbers without supporting analysis.

**Unrealistic recovery requirements.** RTO/RPO not achievable.

**Disconnected from BCP/DR.** Recovery plans don't match BIA.

**Lack of senior buy-in.** Treated as compliance exercise.

### Worked BIA example

For a Nepali bank, partial BIA for internet banking:

**Process:** Internet banking customer access.

**Stakeholders:** Retail banking head, IT operations, customer support, marketing, communications.

**Dependencies:**
- Core banking system.
- Authentication infrastructure.
- Network connectivity (multiple ISPs).
- Datacentre infrastructure.
- Mobile platforms (for app).
- Telco SMS infrastructure (for OTP).
- Payment switch (for transactions).

**Impact analysis:**

| Timeframe | Financial impact | Customer impact | Reputational | Regulatory |
|---|---|---|---|---|
| 1 hour | Low | 50K+ affected attempts; complaints rise | Minimal | Reportable but routine |
| 4 hours | Medium-NPR 5M+ | Significant complaints; media interest | Moderate | NRB notification likely |
| 1 day | NPR 50M+ | Substantial; customer trust impact | High | Formal NRB engagement |
| 3 days | NPR 200M+ | Severe; competitor switching | Very high | Regulatory action likely |
| 1 week | NPR 1B+ | Crisis; major customer loss | Brand-damaging | Material |

**Recovery requirements:**
- RTO: 2 hours (target); 4 hours (maximum tolerable).
- RPO: 5 minutes (target); 15 minutes (maximum tolerable).
- Required for recovery: alternate datacentre operational; replication current; staff available.

**Priority:** Tier 1 — recover first.

Comparable analysis for each material process; aggregate informs BCP and DR investment.

## 4.3 Business continuity planning

### Business Continuity Planning

*Business Continuity Planning is the comprehensive process of preparing for, responding to, and recovering from disruptions to business operations — encompassing not just IT recovery but the people, processes, premises, suppliers, communications, and decisions needed to maintain or restore business activity — ensuring an organisation can survive and recover from incidents that threaten its operations.*

BCP is broader than DR — covering all dimensions of continuity, not just IT.

### ISO 22301

The international standard for Business Continuity Management Systems. Provides:
- Requirements for establishing, implementing, maintaining BCMS.
- Aligned with other ISO management systems (PDCA cycle).
- Certifiable through accredited bodies.

For Nepali context, ISO 22301 adoption growing; major institutions seeking certification.

### BCP components

**BCM policy.** High-level statement.

**BIA.** As discussed.

**Risk assessment.** Threats to operations.

**BCP strategy.** Approach to continuity.

**BCP plans.** Specific plans for various scenarios.

**Crisis management plan.** Senior leadership response.

**Communication plan.** Internal and external.

**Recovery plans.** Specific recovery procedures.

**Training programme.** Staff preparation.

**Testing programme.** Plan validation.

**Maintenance.** Keeping plans current.

### BCP audit focus

**BCM governance.** Authority, accountability, resources.

**BIA quality.** As discussed.

**Plan completeness.** Material scenarios covered.

**Plan currency.** Updated regularly.

**Plan specificity.** Actionable detail.

**Recovery capability.** Resources actually available.

**Testing.** Performed and documented.

**Training.** Staff aware and prepared.

**Communication.** Plans tested.

**Improvement.** Lessons applied.

### Crisis management

For major disruptions:

**Crisis management team.** Senior leadership; defined roles.

**Activation criteria.** When crisis mode invoked.

**Command structure.** Who decides what.

**Communication channels.** Pre-established.

**External engagement.** Regulators, media, customers, partners.

**Decision authorities.** Pre-delegated for speed.

**Recovery oversight.** Through recovery process.

**Post-crisis review.** Lessons captured.

### BCP scenarios

Typical scenarios planned:

**Datacentre loss.** Fire, water damage, structural failure.

**Network outage.** Multiple ISP failure.

**Cyber incident.** Ransomware, breach.

**Natural disaster.** Earthquake (Nepal-relevant), flood.

**Pandemic.** Workforce unavailability.

**Power outage.** Extended outage.

**Vendor failure.** Critical supplier disruption.

**Premises unavailability.** Building inaccessible.

**Senior leadership loss.** Succession scenarios.

For Nepali context, earthquake (2015 reference), monsoon flooding, political disruption, and cyber incidents are most relevant. GIDC DDoS in 2024 demonstrated cyber-related disruption affecting government services.

### BCP testing

Plans must be tested:

**Test types:**
- **Walkthrough.** Document review with stakeholders.
- **Tabletop.** Scenario discussion.
- **Simulation.** Acting out response.
- **Parallel.** Running recovery systems alongside production.
- **Full interruption.** Actual switch to recovery (most expensive; highest assurance).

**Testing frequency:** At least annually for major scenarios; more frequent for critical processes.

**Test documentation:** Scope, scenario, participants, observations, issues identified, recommendations.

**Findings integration:** Test outcomes drive plan improvements.

### BCP audit findings

Common findings:

**Plans on paper only.** No testing.

**Outdated plans.** Don't reflect current organisation.

**Inadequate training.** Staff don't know roles.

**Communication weaknesses.** Tests reveal communication failures.

**Resource assumptions invalid.** Resources assumed available aren't.

**Vendor dependencies.** Vendors lack BCP themselves.

**Documentation gaps.** Plans incomplete.

**Senior management disengagement.** Crisis decisions delayed.

### Nepal context for BCP

For Nepali enterprises:

**Banks.** NRB-mandated BCP; major institutions test annually; smaller may struggle with full testing.

**Telecoms.** NTA expectations; some BCP capability; major incident experience varies.

**Government.** GIDC has BCP capability; ministry-level varies; npCERT coordinates national-level concerns.

**Other enterprises.** Variable; major IT firms have mature BCP; many smaller organisations have minimal capability.

**2015 earthquake lessons.** Many organisations updated BCP after the earthquake; physical resilience considerations more prominent.

**2024 GIDC DDoS lessons.** Highlighted cyber-related disruption to public services.

## 4.4 Disaster recovery strategies

### Disaster Recovery

*Disaster Recovery is the subset of business continuity focused specifically on the IT components — the strategies, processes, and technologies that restore IT services after disruption, enabling resumption of business operations within RTO and RPO objectives, achieved through combinations of backup, replication, alternate sites, and recovery procedures.*

DR is part of BCP but specifically IT-focused.

### DR strategies

**Cold site.** Empty facility ready for equipment installation; longest recovery time.

**Warm site.** Facility with some infrastructure; partial recovery time.

**Hot site.** Fully equipped and operational backup site; rapid recovery.

**Reciprocal arrangement.** Mutual support with another organisation.

**Cloud-based DR.** Recovery in cloud; flexibility and cost benefits.

**Hybrid.** Combinations.

Choice depends on RTO, RPO, cost, and risk profile.

### Backup strategies

Detailed in operations audit (4.1). For DR:

**Full backup.** Complete copy.

**Incremental backup.** Changes since last backup.

**Differential backup.** Changes since last full.

**Synthetic full.** Reconstructed full from incrementals.

**Snapshot.** Point-in-time copy.

**Continuous data protection.** Real-time replication.

Modern strategies typically combine: regular snapshots, incremental backups, periodic full backups, geographic separation.

### Replication

Beyond backup:

**Synchronous replication.** Data committed at both sites before acknowledged; zero RPO; performance impact.

**Asynchronous replication.** Data shipped to secondary; small RPO; less performance impact.

**Multi-site.** Multiple geographic copies.

**Cross-cloud.** Across cloud regions or providers.

For Nepali bank context, synchronous replication between primary and secondary datacentres common at major institutions; asynchronous to additional sites where used.

### Cloud DR specifics

Cloud DR options:

**Backup to cloud.** Backups stored in cloud.

**Pilot light.** Minimal infrastructure running; scaled up at disaster.

**Warm standby.** Scaled-down version running; scaled up at disaster.

**Multi-site active-active.** Full capability in multiple regions.

Cloud provides flexibility — pay only for capacity needed; rapid scaling at disaster.

### DR plan content

**System inventory.** Systems to be recovered.

**Recovery priorities.** Order of recovery.

**Recovery procedures.** Specific technical steps.

**Recovery team.** Roles and responsibilities.

**Communication procedures.** During recovery.

**Resource requirements.** What's needed for recovery.

**Vendor contacts.** External resources needed.

**Decision points.** Where decisions are needed.

**Verification procedures.** How to confirm recovery.

**Rollback procedures.** If recovery fails.

### DR testing

Specific to DR:

**Tabletop exercise.** Discussion-based.

**Walkthrough.** Step-through procedures.

**Simulation.** Acting out without actual failover.

**Parallel test.** Recovery system runs alongside production.

**Full failover test.** Actual switch to recovery; production verified after switch back.

**Disaster recovery as a Service (DRaaS) tests.** Provider-managed.

Frequency: At least annually for critical systems.

### DR test reports

Documentation includes:

**Test scope.** What was tested.

**Scenario.** Disaster scenario simulated.

**Participants.** Who was involved.

**Activities.** What was performed.

**Timing.** Actual RTO and RPO vs target.

**Issues identified.** Problems encountered.

**Successes.** What worked well.

**Improvements.** Specific actions.

**Approval.** Test signoff.

### DR audit

The auditor examines:

**DR strategy.** Documented and approved.

**Infrastructure.** Recovery capability exists.

**Procedures.** Documented.

**Recent testing.** Performed and documented.

**Test results.** RTO/RPO achieved.

**Issue management.** Test findings addressed.

**Maintenance.** Plans and infrastructure current.

**Training.** Staff prepared.

### Common DR findings

**Test gaps.** Some scenarios not tested.

**Test failures.** Recovery didn't meet objectives.

**Infrastructure aging.** Recovery infrastructure outdated.

**Procedure gaps.** Steps missing or unclear.

**Vendor dependencies.** Critical vendor BCP gaps.

**Documentation drift.** Procedures don't match actual.

**Staff capability.** Insufficient trained recovery staff.

### Specific worked DR scenario — Nepali bank

A Tier-1 Nepali bank's core banking DR:

**Architecture:**
- Primary datacentre at Kathmandu HQ.
- Disaster Recovery datacentre at separate location (different seismic zone).
- Synchronous replication between sites (network capacity supports).
- Tertiary copy via asynchronous replication to cloud.

**RTO/RPO:**
- Core banking RTO: 4 hours.
- Core banking RPO: 15 minutes (synchronous; near-zero in normal operation).

**Recovery process:**
1. Disaster declared by Crisis Management Team.
2. DR site activation initiated.
3. Network rerouting to DR site.
4. Core banking application started in DR.
5. Application validation testing.
6. Customer-facing services validated.
7. Operations declared on DR site.
8. Communication to staff, customers, NRB.

**Testing:**
- Quarterly tabletop exercise.
- Semi-annual partial failover (specific subsystems).
- Annual full failover test (typically over weekend).
- Last full test results: RTO achieved 3.5 hours; minor issues identified and addressed.

**Audit findings:**
- DR capability mature.
- Documentation complete.
- Testing regular and documented.
- Minor recommendations on test reporting consistency.

This level of DR capability characterises Tier-1 Nepali banks; Tier-2 banks typically have basic DR; smaller institutions vary substantially.

### Backup integrity and ransomware resilience

Specific concern in current threat environment:

**Immutable backups.** Backups cannot be modified after creation.

**Air-gapped backups.** Physically separated; not network-accessible.

**Backup encryption.** With keys separately managed.

**Backup integrity verification.** Periodic integrity checks.

**Recovery testing.** Verify backups actually restore.

**Multiple backup copies.** 3-2-1 rule (3 copies, 2 media types, 1 offsite).

Ransomware attackers specifically target backups; defensive measures address this.

### Geographic considerations for Nepal

Nepal-specific resilience considerations:

**Seismic zones.** Recovery site in different zone from primary.

**Monsoon impact.** Flooding considerations.

**Power reliability.** Generator and battery backup essential.

**Network providers.** Multiple ISPs through different infrastructure.

**Cross-border options.** Some institutions use India-based DR.

**International connectivity.** Submarine cable considerations for cloud-based DR.

### From operations resilience to asset protection

This chapter has covered the operational disciplines that keep IT running and the resilience disciplines that recover when things go wrong. The next chapter takes up information asset protection — the security frameworks, identity and access management, encryption and PKI, and network and cloud security that protect the information assets the operational and resilience disciplines support.
