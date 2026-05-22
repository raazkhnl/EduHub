---
title: 'Chapter 4 — Conducting an Information System Audit'
sidebar_label: 'Ch 04 — Conducting an Information System Audit'
sidebar_position: 4
description: 'Chapter 4 of Information Systems Audit (ENCTNS552).'
slug: /ioe/msncs/year-1-part-2/information-systems-audit/notes/ch04
tags: [msncs, ENCTNS552, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

This chapter walks through the actual practice of an IS audit from planning to reporting. The previous chapters established what an audit is, what controls and risks it examines, and what evidence it relies on. This chapter shows how all of that comes together into an audit engagement that produces a defensible opinion and useful findings. As the most-weighted chapter in the syllabus (12 marks), it covers the full lifecycle: audit programmes and plans, audit procedures and approaches, system understanding, compliance and substantive testing, audit tools and techniques, sampling, documentation and reporting, work-planning, process flow, risk-based auditing, and risk management strategy.

## 4.1 Audit programme and audit plan

### Audit plan

*An audit plan is the document that describes the overall strategy for an audit engagement — the scope, objectives, methodology, team, timeline, resource needs, and reporting expectations — prepared at the start of the engagement and used to direct the audit team's work.*

The plan answers the questions:
- What will the audit examine?
- Why?
- How?
- When?
- By whom?
- For whom?

A well-planned audit produces useful findings within the available resources. A poorly-planned audit either misses important areas or fails to produce results before the engagement ends.

### Contents of an audit plan

A typical IS audit plan covers:

1. **Engagement background.** Why the audit is being conducted (regulatory requirement, management request, multi-year programme).
2. **Audit objectives.** Specific statements of what the audit will determine.
3. **Scope.** What systems, processes, locations, time periods are included; what is explicitly out of scope.
4. **Approach and methodology.** Risk-based or compliance-based or hybrid; the audit framework being applied.
5. **Audit criteria.** The standards against which findings will be evaluated (ISO 27001, NRB directives, internal policies, regulatory frameworks).
6. **Reliance on others.** Internal audit work, other auditors' work, prior audits.
7. **Team composition.** Auditor names, qualifications, role assignments.
8. **Timeline.** Phases with start and end dates.
9. **Deliverables.** Working papers, draft report, final report, management letter.
10. **Communication plan.** Status reporting cadence; entry and exit meetings.
11. **Risk assessment.** Initial view of high-risk areas.
12. **Materiality.** Threshold for significance of findings.

### Audit programme

*An audit programme is the detailed set of audit procedures planned for the engagement, specifying for each audit objective the specific tests, techniques, sample sizes, and evidence to be collected, used to direct day-to-day audit work.*

Where the plan is strategic, the programme is operational. The programme might list 50-200 specific procedures organised by audit objective.

A typical procedure in the audit programme:

- **Audit objective:** Determine whether user access to the core banking system is provisioned through the documented approval process.
- **Procedure:** Select a sample of 30 users granted access during the audit period. For each, obtain the access-request form, verify approvals by the user's manager and the system owner, verify that access granted matches access requested. Document discrepancies.
- **Evidence to collect:** Access-request forms; user-access listings from the core banking system; HR records of role at the time of access.
- **Tester:** Auditor B.
- **Estimated time:** 16 hours.
- **Reviewer:** Senior auditor.

The programme is a living document — updated as the audit progresses and as findings change priorities.

### Planning in practice

For a Nepali bank's annual external IT audit, the planning phase typically involves:

1. **Engagement letter signed.** Defining the relationship between auditor and client.
2. **Initial meeting with management.** Understanding business, IT environment, prior audits, current concerns.
3. **Document review.** Policies, organisational charts, system inventories, prior reports.
4. **Walkthroughs of key processes.** High-level understanding of how things work.
5. **Risk assessment.** Identifying which areas warrant emphasis.
6. **Plan and programme finalisation.** Agreed with management before fieldwork starts.

Planning typically consumes 10-20% of the total engagement effort but determines the quality of everything that follows.

## 4.2 Audit procedures and approaches

### Audit approaches

Several broad approaches frame the audit.

**Risk-based audit.** The audit is shaped by risk — high-risk areas get more attention, lower-risk areas less. This is the dominant modern approach, addressed in detail in Section 4.11.

**Compliance-based audit.** The audit checks compliance against a specific standard or regulation (NRB directive, ISO 27001, PCI-DSS). Coverage is determined by the standard's requirements, not the auditor's risk view.

**Process-based audit.** The audit follows business processes end-to-end, examining controls at each step.

**Around-the-computer audit.** Older approach. The auditor examines inputs and outputs without examining the system itself. Treats the system as a black box. Used when system access is impractical.

**Through-the-computer audit.** Modern approach. The auditor examines the system itself — code, configuration, data, controls. Used when system access is feasible and necessary for the audit.

**Combined approach.** Most engagements use combinations: risk-based scope; compliance-based criteria; through-the-computer where appropriate.

### Audit procedures

The specific actions performed in the audit. Common procedure types:

**Inquiry.** Asking questions.
- Strengths: Quick; reveals context.
- Weaknesses: Low reliability alone; subject to interviewer bias.

**Inspection.** Examining records or assets.
- Strengths: Document trail; reproducible.
- Weaknesses: Documents may not reflect reality.

**Observation.** Watching processes.
- Strengths: Direct view.
- Weaknesses: Behaviour changes when observed; point-in-time only.

**Confirmation.** Third-party confirmation.
- Strengths: External corroboration.
- Weaknesses: Time-consuming.

**Recalculation.** Verifying arithmetic.
- Strengths: Definitive.
- Weaknesses: Limited to mathematical claims.

**Re-performance.** Auditor independently performs the operation.
- Strengths: High confidence in the result.
- Weaknesses: Time-intensive.

**Analytical procedures.** Reviewing relationships and trends.
- Strengths: Efficient; surfaces anomalies.
- Weaknesses: Identifies anomalies but does not explain them.

**Computer-assisted audit techniques (CAATs).** Software-assisted testing at scale.
- Strengths: Test entire populations, not just samples.
- Weaknesses: Requires data extraction; technical complexity.

A typical audit procedure combines several techniques. A test of change management might involve: inquiry of the change manager; inspection of policy; observation of a change-approval meeting; CAAT-based comparison of approved changes against production deployments.

## 4.3 System understanding and review

Before testing controls, the auditor must understand the system. Without understanding, tests fail in two ways: missing material controls and testing irrelevant ones.

### What understanding includes

For an IS audit, system understanding covers:

**Business context.** What the system does for the business; who uses it; what depends on it.

**Architecture.** How the system is constructed — components, integrations, data flows.

**Technology stack.** Operating systems, databases, application platforms, network connectivity.

**Operations.** How the system is run — change management, monitoring, backup, support.

**Data.** What data the system handles; classifications; lifecycle.

**Users.** Who has access; what privileges; how access is managed.

**Controls.** What controls exist over the system.

**History.** Prior issues; prior audit findings; known weaknesses.

### Techniques for understanding

**Document review.** System documentation, design documents, operations manuals, prior audit reports, risk registers.

**Interviews.** With business owners, IT operations staff, developers, security team.

**Walkthroughs.** Following a transaction or process end-to-end.

**System demonstrations.** Hands-on tour of system functionality and configuration.

**Architecture diagrams.** Reviewing or constructing visual representations.

**Tools.** Configuration management databases, monitoring dashboards, asset inventories.

### System review

After understanding, the auditor performs a system review — evaluating whether the system's design and operation are reasonable from a control perspective. The review is preliminary to detailed testing.

Areas examined in the review:
- Are appropriate controls in place?
- Do controls address identified risks?
- Are control gaps documented?
- Is the system suitable for its business purpose?

The review's output is an initial view of where to focus detailed testing.

### Documentation

System understanding is documented in audit working papers. Standard forms:

- **System narrative.** Written description of the system.
- **Flowchart.** Visual representation of process or data flow.
- **Control matrix.** Listing of controls with attributes (preventive/detective, manual/automated, frequency).
- **Risk-control matrix.** Mapping risks to the controls addressing them.

Subsequent audit work — and future audits — relies on this documentation.

## 4.4 Compliance reviews and tests

### Compliance testing

*Compliance testing is the category of audit procedures that evaluate whether controls are designed appropriately and operating effectively over the audit period, focused on the control activities themselves rather than on the business outcomes those controls produce.*

The question compliance testing answers: do the controls work?

### Two related questions

**Design effectiveness.** Are the controls designed to address the risks they should? A control that requires manager approval for transactions over $10,000 is well-designed for catching large unauthorised transactions. A control that requires manager approval after the fact is poorly-designed (it does not prevent; it only documents).

**Operating effectiveness.** Are the controls actually performed as designed? A well-designed approval control that managers routinely sign without review is not operating effectively.

Compliance testing addresses both, with emphasis usually on operating effectiveness.

### Compliance testing methods

For a single control, compliance testing might involve:

**Control walkthrough.** Trace one transaction through the control to understand the design.

**Inspection of evidence.** Review the records the control produces (approval forms, log entries, reconciliation reports) for a sample.

**Re-performance.** Auditor performs the control on test data; compares to documented results.

**Inquiry with corroboration.** Ask the responsible person; verify with documentary evidence.

**Configuration review.** For automated controls, verify the system configuration enforces the rule.

### Sample design for compliance testing

Compliance tests typically work on samples (Section 4.7). Sample size depends on:
- The audit objective.
- The expected frequency of failure.
- The acceptable level of audit risk.

Standard sample sizes for compliance testing of high-frequency controls (occurring daily) range from 25 to 60 items, depending on the assurance level required.

### Compliance testing example

**Control:** "All access requests to the core banking system require approval by the user's manager and the application owner before access is granted."

**Test:** Select 40 access grants during the audit period. For each:

- Obtain the access-request form.
- Verify the manager's signature/approval.
- Verify the application owner's signature/approval.
- Verify the granted access matches the request.
- Verify the timing (approval before grant).

**Documentation:** Record findings for each item; calculate the deviation rate; assess whether the deviation rate is acceptable given the planned assurance level.

**Conclusion:** "Of 40 access grants tested, 38 were properly approved. Two were granted without documented application-owner approval. The deviation rate of 5% exceeds the acceptable threshold; further work is needed to assess the impact."

The conclusion drives subsequent work — further sample testing, root-cause analysis, or escalation to substantive testing.

## 4.5 Substantive reviews and tests

### Substantive testing

*Substantive testing is the category of audit procedures that examine the actual outputs or end results of the information system — transactions, balances, records — to determine whether they are accurate, complete, and properly stated, used to confirm that the system is producing correct results regardless of (or in addition to) control effectiveness.*

Where compliance testing examines the controls, substantive testing examines the results.

### Relationship between compliance and substantive testing

The two complement each other. Several patterns:

**Strong controls → less substantive testing.** If compliance testing shows controls operate effectively, the auditor needs less substantive testing to be confident the results are correct.

**Weak controls → more substantive testing.** If controls cannot be relied on, the auditor must directly test the results to assess accuracy.

**Both → highest assurance.** Performing both gives the strongest conclusion.

**Substantive only.** When controls cannot be tested (small population; new system; specific concerns).

### Substantive procedures

**Tests of details.** Examining individual transactions or records. "Recompute the interest accrual for a sample of 50 deposit accounts; compare to the system-computed values."

**Analytical procedures.** Looking at relationships, trends, ratios. "Compare deposit growth rate by branch; investigate branches with growth outside the expected range."

**Confirmation.** "Confirm a sample of customer balances directly with customers."

**Reconciliation review.** "Examine the reconciliation between the core banking system and the general ledger for the audit period."

**Account analysis.** "Analyse the suspense account activity; investigate aged items."

### Substantive testing example

**Audit objective:** Determine whether the core banking system correctly computes interest on savings accounts.

**Substantive test:**
- Obtain a sample of 100 savings accounts.
- Independently compute the interest accrual for each based on documented rates and account activity.
- Compare to the system's computed interest.
- Investigate any discrepancies.

**Possible findings:**
- All 100 accruals match — strong evidence of system accuracy.
- 3 mismatches due to known rate change implementation timing — limited issue.
- 25 mismatches following no clear pattern — significant concern needing further investigation.

## 4.6 Audit tools and techniques

The IS audit has developed specific tools and techniques that work at the scale and complexity of modern systems.

### Computer-Assisted Audit Techniques (CAATs)

*Computer-Assisted Audit Techniques are software-based methods that allow auditors to test data, transactions, and controls at scale, working directly with electronic records rather than manually-sampled paper documents, increasing both audit efficiency and the depth of audit coverage.*

CAATs allow the auditor to examine entire populations rather than samples. With 1 million transactions, manual sampling examines perhaps 60; a CAAT can compare every single transaction against control rules.

**Common CAATs:**

- **Generalised Audit Software (GAS).** Tools designed for audit data analysis — ACL Analytics (now Galvanize), IDEA, Picalo. Allow data import, filtering, summarisation, comparison, statistical analysis.
- **Embedded audit modules.** Software embedded in the production system that flags transactions matching audit criteria for later review.
- **Test data techniques.** Auditor-prepared test transactions run through the system to verify control behaviour.
- **Parallel simulation.** Auditor builds a parallel calculation; runs both against the same data; compares results.
- **Integrated test facilities (ITF).** Audit-only entities (fake customers, accounts) embedded in production for ongoing testing.

For Nepali bank audits, ACL/IDEA-based testing has become standard for transaction analysis. Open-source alternatives (Python with pandas, R) are used in some smaller engagements.

### Other audit tools

**Vulnerability scanners.** Network and application scanners (Nessus, Qualys, OpenVAS, Burp Suite). Find technical vulnerabilities at scale.

**Configuration assessment tools.** Check systems against benchmark configurations (CIS Benchmarks, vendor-specific). Tools include CIS-CAT, Microsoft Security Compliance Toolkit, vendor SIEM features.

**Log analysis tools.** SIEM platforms (Splunk, Elastic, Wazuh), log-analysis scripts.

**Process mining.** Tools that analyse system logs to reconstruct actual business processes — Celonis, Disco, PM4Py. Reveal how processes really run, often different from documented procedures.

**Penetration testing tools.** For technical security testing — discussed in Chapter 6.

**GRC platforms.** Governance, Risk, and Compliance platforms (ServiceNow GRC, MetricStream, Archer) that systematise control management and audit.

**Audit management software.** Tools for managing the audit itself — TeamMate, CaseWare, AuditBoard. Manage working papers, findings, status, reviews.

### Selecting tools

The choice depends on:
- The audit scope.
- The data volumes.
- The auditor's skills.
- Available budget.
- Client expectations and standards.

A complex modern audit uses multiple tools. The audit team needs the skills to use them; the firm needs the infrastructure to support them.

## 4.7 Sampling techniques

When testing populations of thousands or millions, samples are necessary. **Audit sampling** is the discipline of choosing samples that support the audit conclusion.

### Audit sampling

*Audit sampling is the application of audit procedures to less than 100% of items within a population such that each sampling unit has a chance of selection, in order to provide a reasonable basis for the auditor to conclude on the population.*

The discipline addresses two questions:
- How to select the sample.
- How to draw conclusions from sample results.

### Sampling methods

**Statistical sampling.** Uses probability theory to determine sample size and to extrapolate from sample to population. Quantifies sampling risk.

**Non-statistical sampling.** Uses auditor judgement for selection and conclusion. Does not provide quantitative measures of sampling risk.

**Random sampling.** Every item has equal probability of selection. Standard for statistical sampling.

**Systematic sampling.** Select every nth item from an ordered list, with a random starting point.

**Stratified sampling.** Divide the population into strata (e.g., transactions by size, by type, by risk). Sample from each stratum. Common for transaction testing where different strata have different risk profiles.

**Cluster sampling.** Sample groups of items (e.g., all transactions on selected days).

**Monetary unit sampling (MUS).** Each monetary unit has equal probability of selection — larger items are more likely to be sampled. Standard for testing financial transactions where larger items are more material.

**Discovery sampling.** Used to find any instance of a particular type of item. Useful for fraud testing where finding one example is sufficient to establish a concern.

**Attribute sampling.** Tests whether items have a particular attribute (e.g., proper approval). Conclusions in terms of error rate.

**Variable sampling.** Tests monetary values; conclusions in terms of total error or correctness.

### Sample-size determination

For attribute sampling, factors influencing size:

- **Desired confidence level.** Higher confidence requires larger samples.
- **Tolerable deviation rate.** Lower tolerance requires larger samples.
- **Expected deviation rate.** Higher expected rate requires larger samples.
- **Population size.** Has limited effect when populations are large.

For statistical sampling, formulas or tables produce the sample size. For non-statistical sampling, judgement based on similar factors.

Typical compliance testing sample sizes in practice:

| Frequency of control | Sample size |
|---|---|
| Annual | 1-2 |
| Quarterly | 2-4 |
| Monthly | 2-5 |
| Weekly | 5-15 |
| Daily | 20-40 |
| Multiple per day | 30-60 |

These are starting points; specific engagements adjust based on risk and other factors.

### Sample selection

Once size is determined, selection methods:

**Random.** Using a random-number generator on the population.

**Systematic.** Select every nth item starting from a random point.

**Haphazard.** Auditor selection without conscious bias. Used in non-statistical sampling. Distinct from random.

**Block sampling.** Selecting all items in a chosen time period. Statistically weak but sometimes practically necessary.

### Evaluating sample results

For attribute sampling:

1. Tabulate the number of deviations found in the sample.
2. Compute the sample deviation rate.
3. Project to the population (with appropriate confidence interval if statistical sampling).
4. Compare to the tolerable rate.
5. Conclude whether the population is acceptable.

For variable sampling, similar process with monetary projections.

### Sampling risk

*Sampling risk is the risk that the auditor's conclusion based on a sample differs from the conclusion that would be reached if the entire population were tested, comprising both the risk of incorrect acceptance (concluding the population is acceptable when it is not) and the risk of incorrect rejection (concluding it is unacceptable when it is).*

Sampling risk is managed by:
- Adequate sample size.
- Proper selection.
- Honest evaluation of results.
- Awareness of limitations in the audit conclusion.

The auditor's report does not claim certainty — only reasonable assurance based on sample-based testing.

## 4.8 Audit questionnaire, documentation, and report

### Audit questionnaire

*An audit questionnaire is a structured set of questions used by the auditor to systematically gather information about a system, process, or control area from those responsible for it, ensuring consistent coverage across interviews and across audit engagements.*

A typical IT-governance audit questionnaire might cover:
- IT strategy and alignment.
- IT organisational structure.
- IT policies.
- IT risk management.
- IT performance measurement.

Each topic with specific questions; each question with space for response, evidence references, and the auditor's notes.

Questionnaires support consistency, completeness, and efficiency. They also serve as documentation of the audit work performed.

### Audit documentation

Documentation captures every aspect of the audit. The standards require:

**Sufficient.** Enough to support the audit conclusions.

**Clear.** Understandable by someone not on the engagement.

**Timely.** Prepared during the audit, not reconstructed later.

**Retained.** For the prescribed retention period.

**Protected.** Confidentiality maintained.

### Working papers

The detailed documentation of audit work. Each working paper records:

- The audit objective addressed.
- The procedure performed.
- The evidence obtained.
- The conclusion drawn.
- The preparer.
- The reviewer (with date).
- Cross-references to related working papers.

Working papers are organised by audit area (sometimes called "sections" or "tabs" in the audit file). A typical IS audit file has dozens to hundreds of working papers.

For Nepali audit firms, electronic working papers are now standard. TeamMate, CaseWare, and similar platforms are used by larger firms; Excel-based templates by smaller ones. Either way, the discipline of working-paper preparation, review, and retention is part of professional standards.

### The audit report

The audit ends with a report. The report communicates the audit results to the intended audience.

**Components of a typical IS audit report:**

1. **Executive summary.** Key findings; overall opinion; key recommendations. Often read alone by senior management.
2. **Background and objectives.** Why the audit was conducted; what it covered.
3. **Scope.** What was and was not in scope.
4. **Methodology.** How the audit was conducted.
5. **Findings.** Detailed findings with evidence references.
6. **Recommendations.** Specific actions to address findings.
7. **Management responses.** Management's planned remediation actions and timelines.
8. **Overall opinion.** The auditor's overall conclusion.
9. **Acknowledgements.** Cooperation received from management.
10. **Distribution.** Who receives the report.

### Reporting findings

Each finding typically includes:

- **Condition.** What was found.
- **Criteria.** The standard the condition is measured against.
- **Cause.** Why the condition exists.
- **Effect.** The risk or impact.
- **Recommendation.** What should be done.
- **Management response.** What management commits to doing.
- **Rating.** Severity (Critical / High / Medium / Low or similar).

A well-formed finding gives management the basis to act. A poorly-formed finding (vague condition, no clear criteria, unclear recommendation) is hard to act on and may be disregarded.

### Audit opinion

The auditor's overall conclusion. Several formulations:

- **Unqualified ("clean") opinion.** Controls operate effectively; objectives are met.
- **Qualified opinion.** Most controls effective but with specific exceptions noted.
- **Adverse opinion.** Significant control failures; objectives not met.
- **Disclaimer of opinion.** Auditor unable to form an opinion due to scope limitations or evidence insufficiency.

For internal audit work, the spectrum may be expressed in terms of risk ratings rather than formal opinion language. For external audit serving regulators, the formal language matters.

## 4.9 Auditing approaches and sample audit work-planning memo

### A work-planning memo

A document at the start of an engagement that sets out the agreed approach. The memo is signed by the audit team lead and acknowledged by the audit client.

A sample memo for an IS audit at a hypothetical mid-sized Nepali commercial bank:

---

**Memorandum**

**To:** Mr Suresh Pandey, Chief Information Officer
**From:** Ramesh Shrestha, Senior Audit Manager
**Re:** ABC Bank Annual IT Audit — Engagement Work Plan
**Date:** 12 February 2026

**1. Background.** ABC Bank's annual IT audit, as required by NRB IT Directive 2078 (Section 4.2), will be conducted between 1 March and 30 April 2026.

**2. Objectives.** The audit will:
- Provide an opinion on the effectiveness of IT controls.
- Identify significant deficiencies for management remediation.
- Report compliance with NRB directives to the regulator.

**3. Scope.** Core banking, internet/mobile banking, payment switch, card management, IT general controls, business continuity. Out of scope: branch hardware; non-financial systems.

**4. Approach.** Risk-based audit using ISACA's audit methodology, with criteria from NRB IT Directives 2078 and ISO 27001:2022.

**5. Team.** Lead — Ramesh Shrestha (CISA). Auditors — three CISA-credentialed staff, one IT specialist for application controls.

**6. Timeline.**
- 1-7 March: Planning, document review, walkthroughs.
- 8 March - 15 April: Fieldwork.
- 16-22 April: Reporting and management discussion.
- 23-30 April: Final report; exit meeting.

**7. Deliverables.**
- Draft report for management discussion (15 April).
- Final report for the Board Audit Committee (30 April).
- Regulator report (within 30 days of final report).

**8. Communications.** Weekly status meeting with CIO; mid-engagement update with Audit Committee chair.

**9. Materiality.** Findings will be reported by severity; Critical and High findings will be reported in the executive summary.

**10. Limitations.** Engagement based on agreed scope and timeframe; not a forensic audit; subject to inherent audit limitations.

Please confirm acknowledgement by signing below.

---

A real memo would be more detailed; this illustrates the structure.

## 4.10 Sample audit work process flow

A typical IT audit work flow:

**Phase 1 — Planning (10-15% of effort).**
- Engagement letter and scope agreement.
- Initial information gathering.
- Risk assessment.
- Audit programme drafted.
- Team and resource planning.

**Phase 2 — Fieldwork Preparation (5-10%).**
- Information requests sent to management.
- Initial document review.
- Walkthrough scheduling.
- Tool setup.

**Phase 3 — Fieldwork (60-70%).**
- System understanding and walkthroughs.
- Control identification.
- Compliance testing.
- Substantive testing.
- Evidence collection.
- Working paper preparation.
- Periodic team review and adjustment.

**Phase 4 — Findings and Reporting (10-15%).**
- Findings drafting.
- Internal review.
- Discussion with management.
- Management responses incorporated.
- Final report preparation.

**Phase 5 — Follow-up (separate engagement, typically).**
- Subsequent verification that management remediation is complete.

The flow is iterative — findings during fieldwork can prompt additional testing or re-scoping. A rigid linear approach is impractical for real engagements.

## 4.11 Conducting a risk-based information systems audit

Risk-based auditing is the modern standard.

### Risk-based audit

*A risk-based information systems audit is one in which the audit scope, depth, and procedures are determined by the risks facing the audited entity — focusing audit resources on areas of higher risk, providing assurance proportional to the risk landscape rather than testing all areas equally.*

The motivation: audit resources are finite. Testing low-risk and high-risk areas with the same intensity wastes resources. Risk-based auditing concentrates effort where it matters most.

### The risk-based methodology

A risk-based audit follows a sequence:

1. **Understand the business and its risk environment.** External and internal risks; strategic context.
2. **Identify the audit universe.** All auditable entities.
3. **Risk-assess each auditable entity.** Inherent risk, control risk, residual risk.
4. **Prioritise.** Higher-risk entities get more audit attention.
5. **Build the audit plan.** Multi-year coverage with high-risk entities audited annually, lower-risk less often.
6. **Conduct individual audits.** Within each audit, again apply risk to focus testing.
7. **Report.** Findings tied back to the risk picture.
8. **Update risk assessment.** Incorporate findings; refresh the risk view.

### Categorising risk

For each auditable entity, common categories:

- **Strategic risk.** Risk from the entity's strategic position.
- **Operational risk.** Risk of operational failure.
- **Financial risk.** Financial loss potential.
- **Compliance risk.** Risk of regulatory or legal failure.
- **Reputational risk.** Damage to organisational reputation.
- **Information security risk.** Risk to confidentiality, integrity, availability.

Each is rated; the combined view drives prioritisation.

### Inherent vs control vs residual risk

**Inherent risk.** The risk before considering controls. "How risky is this without any protection?"

**Control risk.** The risk that controls will fail to prevent or detect. "How likely is it that the controls in place will let something through?"

**Residual risk.** The risk that remains after controls operate. "What is the actual risk to the organisation?"

The standard equation:

$$
\text{Residual risk} = \text{Inherent risk} \times \text{Control risk}
$$

Audit testing focuses where residual risk is high — either because inherent risk is high and controls are weak, or because residual risk would be material even with reasonably strong controls.

### Risk-based audit example

For ABC Bank's audit, the IS auditor might risk-rate:

| Audit area | Inherent risk | Control risk (assessed) | Residual risk | Audit frequency |
|---|---|---|---|---|
| Core banking | High | Medium | High | Annual |
| Internet banking | High | Medium | High | Annual |
| Mobile banking | High | Medium | High | Annual |
| Payment switch | High | High | Very High | Annual + interim |
| Card management | High | Medium | High | Annual |
| HR system | Medium | Low | Low | Every 3 years |
| Asset management | Low | Low | Low | Every 5 years |
| BCP/DRP | High | Medium | High | Annual |

The pattern: high-residual-risk areas get annual deep audits; low-residual-risk areas get less frequent or lighter audits. The audit universe is covered systematically, but with effort proportional to risk.

## 4.12 Risk assessment and risk management strategy

### Risk assessment process

ISO 27005 and NIST SP 800-30 give similar structures:

1. **Establish context.** Scope, objectives, criteria.
2. **Identify risks.** Catalogue what could go wrong.
3. **Analyse risks.** Estimate likelihood and impact.
4. **Evaluate risks.** Compare to acceptance criteria.
5. **Treat risks.** Mitigate, transfer, accept, or avoid.
6. **Monitor and review.** Ongoing.

### Risk management strategy

*A risk management strategy is the documented organisational approach to identifying, assessing, treating, monitoring, and communicating risks, defining roles and responsibilities, risk appetite, methodologies, and integration with governance — the highest-level expression of the organisation's risk philosophy.*

The strategy answers:
- What kinds of risk does the organisation consider?
- Who is responsible for risk management at each level?
- What methodologies are used?
- What risk appetite has the board approved?
- How are risks escalated?
- How are risks reported to the board?

### Risk appetite

*Risk appetite is the level of risk an organisation is willing to accept in pursuit of its objectives, formally articulated by the board, expressed in qualitative or quantitative terms, and providing the criteria against which specific risks are evaluated.*

A bank's risk appetite might say:
- "We accept no risk of regulatory breach."
- "We accept a maximum operational-risk loss of 1% of net profit annually."
- "We accept residual cybersecurity risk only within the range of 'medium' or below in our risk-rating framework."

Risk appetite shapes risk treatment decisions — risks within appetite can be accepted; risks beyond it must be treated.

### Roles in risk management

Standard division:

- **Board.** Sets risk appetite; reviews overall risk profile.
- **Senior management.** Implements risk management; reports to board.
- **Risk function.** Designs methodologies; coordinates assessment; reports risk.
- **Internal audit.** Independent assurance over the risk management process.
- **Business units.** Identify, assess, treat risks within their domain.

For Nepali banks, NRB directives require:
- Board-level Risk Management Committee.
- Chief Risk Officer reporting to the CEO.
- Independent IT risk function (often within the CRO's organisation).
- Annual risk-assessment process documented and presented to the board.

### The IS auditor's role

The IS auditor evaluates the risk management process:
- Is the methodology sound?
- Is the assessment current?
- Are findings actioned?
- Is the board informed?
- Are emerging risks captured?

The audit does not run risk management — that is management's job. The audit provides independent assurance about whether management is running risk management effectively.

The next chapter shifts focus from the audit itself to a specific risk area that almost every IS audit examines: business continuity and disaster recovery.
