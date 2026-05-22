---
title: 'Chapter 7 — Reporting and Managing Research'
sidebar_label: 'Ch 07 — Reporting and Managing Research'
sidebar_position: 7
description: 'Chapter 7 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch07
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

A research project that produces excellent findings but communicates them poorly produces no impact. The reporting phase is not a routine wrap-up; it is the act through which the research enters the shared body of knowledge that other researchers, practitioners, and policy-makers can use. This chapter covers the standards for reporting research, the mechanics of scientific publishing, the open-science movement reshaping the field, and the project-management tools — CPM, PERT, Gantt charts — that keep a research project on track. It closes with the seminar, a specific practice in IOE Pulchowk's MSc programme.

## 7.1 Reporting results

### The research report

A research report communicates what the project did, what it found, and what it means. The audience varies — thesis examiners, journal reviewers, conference attendees, industry sponsors, policy-makers — and the report's form must fit. Several conventions, however, are shared across forms.

### IMRaD structure

*IMRaD is the conventional structure of a scientific research paper, organising the content into Introduction, Methods, Results, and Discussion sections, with additional sections (Abstract, References, Appendices) framing the core.*

The structure has been the standard in the natural and engineering sciences since the mid-twentieth century. The logic:

- **Introduction.** What was the problem? Why does it matter? What is already known? What does this paper contribute?
- **Methods.** What did the researcher do, in enough detail that the work could be repeated?
- **Results.** What did the researcher observe?
- **Discussion.** What do the results mean? How do they relate to prior work? What are the limitations? What comes next?

Each section answers a specific reader's question; the structure makes it easy to find the answer.

### Structure of a research thesis

An MSc or PhD thesis is longer than a paper and conventionally has a richer structure. A standard pattern, consistent with IOE Pulchowk's expectations:

1. **Title page.** Title, author, supervisor, institution, date.
2. **Approval / declaration page.** Supervisor's approval, candidate's declaration of originality.
3. **Acknowledgements.** Brief recognition of supervisors, peers, sponsors.
4. **Abstract.** A condensed summary (typically 150–300 words). Covers the problem, methods, key results, and significance.
5. **Table of contents.** Lists every chapter, section, and major subsection with page numbers.
6. **List of figures, tables, abbreviations, symbols.** Reference aids for the reader.
7. **Chapter 1 — Introduction.** Background, problem statement, objectives, scope, significance, organisation of the thesis.
8. **Chapter 2 — Literature review.** Synthesis of prior work; identification of the gap addressed.
9. **Chapter 3 — Methodology.** Research design, data collection, analysis methods, ethical considerations.
10. **Chapter 4 — Results.** Data presentation, statistical analysis, tables, figures, observations.
11. **Chapter 5 — Discussion.** Interpretation of results, comparison with prior work, implications, limitations.
12. **Chapter 6 — Conclusion and recommendations.** Summary, contributions, recommendations for practice and for future research.
13. **References.** Complete bibliography.
14. **Appendices.** Questionnaires, code, raw-data summaries, supplementary tables.

A thesis at IOE Pulchowk is typically 80-150 pages, with the actual content varying by subject area.

### Writing the abstract

The abstract is the most-read part of the report. Many readers will read only the abstract. It must stand alone.

A strong abstract covers:
- **Context and motivation.** One or two sentences.
- **Problem and objective.** What the research addresses.
- **Methods.** How it addressed the problem.
- **Key results.** Specific findings (with numbers where possible).
- **Conclusions and significance.** What the findings mean.

A weak abstract is vague, lacks specific results, and does not state what is new. The discipline: edit ruthlessly. Every sentence must earn its place.

### Tables and figures

Tables and figures carry most of the quantitative content. Standards:

**Numbering and titles.** Every table and figure has a number ("Table 4.3") and a descriptive title.

**Self-contained.** A reader looking only at the figure should understand it. Axis labels, units, legend, caption.

**Referenced in the text.** Every table and figure is mentioned in the main text. If it is not worth mentioning, it is not worth including.

**Honest representation.** No misleading axis scales, no distorted proportions, no cherry-picked subsets. The visualisation principles from Chapter 2 of the ML subject apply.

**Appropriate to the data.** Bar charts for categorical comparisons; line charts for trends; scatter plots for relationships; box plots for distributions across groups; heat maps for cross-tabulations.

### Writing methods

Methods is the most important section for credibility. A reader must be able to assess the validity of the results from the methods description. Key components:

- **Research design.** What kind of study (experiment, survey, case study, simulation).
- **Sample.** Who or what was studied, how chosen, how many.
- **Instruments.** What measurement tools were used. For questionnaires, the question wording. For software, the version. For statistical tests, the specific test name.
- **Procedure.** Step-by-step what was done.
- **Analysis plan.** What statistical tests, what software, what significance levels.
- **Ethical approval.** Where applicable.

The standard test: would another researcher with the same resources be able to reproduce this work? If not, the methods section is incomplete.

### Writing results

Results are the data, presented honestly. Not interpretation — that comes in Discussion.

Standards:
- Present results that address the research questions, in the order the questions were stated.
- Include negative or surprising results, not just confirmatory ones.
- Use tables and figures for quantitative content.
- Report effect sizes alongside statistical-significance results.
- Include confidence intervals.
- State sample sizes for each analysis.
- Use consistent terminology with the methods section.

### Writing discussion

Discussion is interpretation. The opportunity to argue for what the results mean.

Standards:
- Restate the key findings briefly.
- Interpret them in light of the conceptual framework and the literature.
- Compare with prior work — agreements and disagreements.
- Discuss limitations honestly.
- Identify implications for practice and policy.
- Suggest specific directions for future research.

The discussion is where the author's argument is built. A well-written discussion turns measurements into meaning.

### Common reporting mistakes

Several recur:

- **Overclaiming.** Stating that the results "prove" something they merely suggest.
- **Confusing correlation with causation.**
- **Ignoring effect size.** Reporting "$p < 0.05$" without saying how big the effect actually is.
- **Selective reporting.** Presenting only the favourable analyses.
- **Burying limitations.** Hiding methodological weaknesses or stating them only in passing.
- **Padding.** Filling pages with repetition or with tangential material.
- **Plagiarism.** Discussed in Chapter 2.
- **Poor figures.** Unlabelled axes, missing legends, illegible fonts.
- **Inconsistent statistics.** Standard deviation reported in some places, standard error in others, with no clear indication which.

The thesis examination committee at IOE Pulchowk and the reviewers at any reputable journal will catch these. The discipline of careful writing is part of the discipline of careful research.

## 7.2 Reporting in multidisciplinary fields

Engineering research often crosses disciplines — cybersecurity combines computer science with mathematics, behavioural science, law, and operational management. Reporting research that crosses fields presents specific challenges.

### The audience problem

A paper on machine-learning-based detection of insider threats in a Nepali bank has potential audiences in:
- Computer security (the ML and security angle).
- Behavioural science (the user-behaviour angle).
- Management (the organisational-policy angle).
- Banking and finance (the application context).
- Public policy (regulatory implications).

Each audience expects different vocabulary, different background, different emphasis. Writing for one alienates others; writing for all dilutes the focus.

### Strategies for multidisciplinary writing

**Decide on the primary audience.** Pick one and write to them. Other audiences will get less from the paper, but the paper will succeed with at least one community.

**Define terms.** Even where you would not normally do so. Computer-science readers may not know "construct validity"; psychology readers may not know "false-positive rate." Make the paper accessible to readers who are smart but not specialised in your sub-area.

**Use multiple framings.** The same finding can be presented in language each audience recognises. Carefully done, this can broaden reach without confusing anyone.

**Place in appropriate venues.** A paper aimed at cybersecurity will land in cybersecurity venues; the same research with a behavioural-science framing might land in IS-Quarterly or MIS Quarterly. Strategic choice of venue matters.

**Cite across fields.** A paper that cites only computer-science literature when the research has psychology dimensions ignores foundational work. A paper that cites only psychology literature when the research has technical dimensions misses the methodological foundations.

**Cross-disciplinary co-authorship.** A paper with a CS author and a behavioural-science author can speak to both communities with credibility.

### Reporting in domain-specific journals

Different journals have different conventions:

- **Computer-science journals** emphasise novel algorithms, computational performance, formal proofs, system architecture.
- **Information-systems journals** emphasise theoretical models, organisational impact, structural-equation modelling.
- **Cybersecurity-policy journals** emphasise legal, regulatory, and policy frameworks.
- **Engineering education journals** emphasise pedagogy, curriculum, learning outcomes.

A researcher who places a paper in any of these must understand and respect that journal's conventions.

## 7.3 Scientific publishing

The system through which research enters the public record.

### Channels of publication

**Peer-reviewed journals.** The classical channel. Papers are submitted, reviewed by experts, revised, accepted, and published. Cycle time from submission to publication: 6 months to 2 years, sometimes longer.

**Peer-reviewed conferences.** Especially important in computer science. Conferences run on annual cycles; submissions are reviewed by a programme committee. Top CS conferences are as selective as the best journals.

**Books and book chapters.** Slower cycle; useful for synthesis and pedagogy.

**Preprint servers.** arXiv (cs, math, physics), SSRN (social sciences), bioRxiv (biology), medRxiv (medicine). Papers posted before peer review. Speeds dissemination but does not provide peer review. Standard practice now in many fields.

**Technical reports.** Institutional series. Used for working papers and government-funded research.

**Thesis repositories.** MSc and PhD theses, accessible to specialists.

### Peer review

*Peer review is the process by which submitted work is evaluated by independent experts in the field who recommend acceptance, rejection, or revision, the central quality-control mechanism of scientific publishing.*

The standard process:

1. The author submits the paper to the journal or conference.
2. An editor or chair screens for fit and basic quality.
3. Two or three peer reviewers (typically anonymous to the author and to each other) assess the paper.
4. Reviewers write reports recommending accept, accept with revision, major revision, or reject.
5. The editor synthesises the reports and makes a decision.
6. The author may be asked to revise; the revision goes back to reviewers.
7. After acceptance, the paper is copy-edited, formatted, and published.

Peer review catches errors, identifies missing context, demands clearer presentation, and weeds out work that does not meet the venue's standards. It is not perfect — reviewers have biases, miss errors, and sometimes disagree sharply. Despite imperfections, peer review remains the best mechanism in operation.

### Predatory journals

*A predatory journal is a publication that operates with the appearance of peer-reviewed scholarly publishing but lacks the quality controls associated with legitimate journals, typically charging authors a publication fee and publishing without genuine review.*

Predatory journals have proliferated since around 2010, exploiting the open-access publishing model. They:
- Solicit submissions through spam emails.
- Promise fast review.
- Lack credible editorial boards.
- Publish papers with minimal or no review.
- Charge high fees on acceptance.

The harm: papers in predatory journals are dismissed by serious researchers; the work the author put in is wasted; the public record is polluted with unreviewed claims.

How to avoid them: check Beall's List (historical) and current resources (DOAJ — Directory of Open Access Journals — for vetted open-access venues); verify the journal is indexed in Scopus, Web of Science, or PubMed; consult colleagues and supervisors.

### Impact factors and other metrics

**Impact factor.** Average citations per article in the journal over a defined period (typically 2 years). Higher is generally considered better. Imperfect — biased by field size, citation patterns, self-citation.

**h-index.** A researcher's h-index is the largest number $h$ such that they have $h$ papers each cited at least $h$ times. Combines productivity and impact.

**Citation count.** Total citations of a paper or researcher. Available from Google Scholar (broadest), Scopus (curated), Web of Science (curated).

**Altmetrics.** Beyond citations — social media mentions, news coverage, downloads, policy citations. Capture different forms of impact than traditional metrics.

These metrics drive parts of academic career evaluation. They are flawed but ubiquitous. The constructive response is to do good work, place it in appropriate venues, and let the metrics follow.

### ORCID and researcher identifiers

*ORCID (Open Researcher and Contributor ID) is a persistent unique identifier for researchers, used by journals, funding agencies, and institutions to disambiguate authors and link their work across systems.*

A researcher creates an ORCID at orcid.org. The identifier (a 16-digit number) follows the researcher across institutions and across publication systems. ORCID is increasingly required by journals at submission. For Nepali researchers — many of whom have common names that are hard to disambiguate — ORCID is particularly valuable.

### Scientific publishing in Nepal

Nepali engineering research is published in:

- **International venues.** The primary route for high-quality work. IOE Pulchowk graduates regularly publish in IEEE and ACM venues, in Springer, Elsevier, and Wiley journals.
- **Journal of the Institute of Engineering (JoIE).** Tribhuvan University's engineering journal, indexed on NepJOL. Open access. Peer-reviewed.
- **Other Nepali journals indexed in NepJOL.** Several specialised journals across engineering, science, and applied fields.
- **Conference proceedings.** Pulchowk Campus, Kathmandu University, and various professional bodies host conferences with proceedings.

NepJOL (Nepal Journals Online), hosted by INASP and Tribhuvan University Central Library, is the primary index of Nepali academic journals. Researchers seeking Nepal-context work or wishing to contribute back should engage with NepJOL-indexed venues.

## 7.4 Steps of continuous scientific research

Research does not stop with one publication. The work feeds back into the field, generating further questions and further research. **Continuous scientific research** is this cycle.

### The cycle

1. **Publish results.** Make the findings public.
2. **Receive feedback.** Citations, replications, criticisms.
3. **Address gaps and limitations.** Many limitations of one's own work are visible only after publication. Address them in follow-up work.
4. **Generate new questions.** Successful research raises new questions. The conclusions of one paper become the motivation for the next.
5. **Collaborate.** Research is increasingly collaborative. New combinations of researchers, institutions, and disciplines tackle problems that any one group could not.
6. **Build on others' work.** New work extends, refines, or refutes existing work. The literature continues to evolve.
7. **Train successors.** Senior researchers train MSc and PhD students who carry forward the research programme.
8. **Iterate.** The cycle continues over years and decades.

### The Kuhnian view

Thomas Kuhn's *Structure of Scientific Revolutions* (1962) distinguished:

**Normal science.** Researchers work within an established paradigm, solving puzzles that the paradigm defines as solvable. Most research is of this kind.

**Crisis.** When too many anomalies accumulate that the paradigm cannot explain, the field enters crisis.

**Revolution.** A new paradigm emerges that explains the anomalies (and reorganises the field's understanding). Examples: relativity replacing Newtonian mechanics; quantum mechanics; the cognitive revolution in psychology.

**New normal science.** Researchers work within the new paradigm. Cycle continues.

Cybersecurity has had its own paradigm shifts — the move from perimeter security to zero-trust; the move from rule-based to ML-based detection; the move from "secrecy through obscurity" to formal cryptographic design. Each was contested at the time and is mainstream now.

### Cumulative knowledge

The strength of science is that it is cumulative. Each paper contributes a brick; the wall rises over decades. A paper from 1976 on RSA enabled the implementations of 2026. Research from the 1990s on neural networks underpins the deep-learning systems of today.

For an MSc graduate, the framing matters: the thesis is not the end of the research. It is the start of a career-length contribution to a field. Continuous engagement — reading new work, attending conferences, publishing follow-ups, training others — is the discipline that converts a thesis into a research career.

## 7.5 Open science

*Open science is the movement and set of practices that make scientific research, data, methods, and outputs accessible to everyone — including non-specialists and researchers outside well-funded institutions — increasing transparency, reproducibility, and equity in research.*

The movement has gained ground since around 2010. Several components:

### Open access publishing

Papers freely available to read without subscription. Three models:

**Green open access.** The author deposits a version of the paper (often a preprint) in an open repository (institutional repository, arXiv) while the published version may sit behind a paywall.

**Gold open access.** The journal itself is open access; the author pays an article processing charge (APC). Many traditional journals now offer this as an option.

**Diamond open access.** Open access with no fee to either author or reader. Funded by institutions or foundations.

For Nepali researchers, the dominant practical model is green open access — depositing in an institutional repository or on arXiv. APCs in international journals are often prohibitive (USD 1500-3000 per paper).

### Open data

The data underlying published research is made available for others to use. Enables:
- **Replication.** Others can re-run the analysis on the same data.
- **Re-analysis.** Others can apply different methods to the same data.
- **Extension.** Others can combine the data with new data to address new questions.
- **Education.** Students can learn methods on real published data.

The data is typically deposited in a repository (Zenodo, Figshare, Dryad, institutional repositories) with a permanent identifier (DOI). Sensitive data requires controlled access; fully anonymised data can be shared openly.

### Open code

The code that produced the results is shared. Often via GitHub, GitLab, or Bitbucket. Cybersecurity research has a strong tradition of open code (especially in cryptography, where transparency of implementation is essential).

### Open methods

The detailed methods — protocols, instruments, workflows — are shared. Protocols.io is one platform for sharing scientific protocols.

### Preregistration

The hypotheses, design, and analysis plan are deposited (often time-stamped) before data collection. Reduces hindsight bias and $p$-hacking. The Open Science Framework (osf.io) is the standard platform.

### FAIR principles

Open data and code should be **Findable, Accessible, Interoperable, and Reusable**. The FAIR principles, formulated in 2016, are now widely cited in funding-agency requirements.

### Benefits and tensions

Open science increases transparency, supports reproducibility, accelerates discovery, and broadens participation. Tensions include:
- **Commercial interests.** Industry-sponsored research may face restrictions.
- **Confidentiality.** Some data (medical, security-sensitive) cannot be open.
- **Quality vs openness.** Anyone can post; not everything that is open is good.
- **Recognition.** Open contributions are not always credited equally to traditional papers.

The overall direction in the 2020s is more openness. Major funders (NIH, NSF, European Research Council, Gates Foundation) require open access and increasingly require open data.

### Open science in Nepal

The Nepali context:
- Open-access publishing is the dominant model on NepJOL — most NepJOL-indexed journals are diamond open access (no fees).
- Institutional repositories at IOE, Kathmandu University, and Tribhuvan University Central Library hold MSc and PhD theses with varying degrees of public access.
- Open-data culture is developing. CBS and other government statistical bodies share data, though sometimes in awkward formats.
- Open-code participation is rising; Nepali contributors to open-source security and machine-learning projects are visible on GitHub.

The opportunity for early-career Nepali researchers is significant. Open practices reduce the barrier to participation in international research, build personal portfolios that are visible globally, and connect Nepali work to wider scholarly conversations.

## 7.6 Project management — CPM and PERT

A research project of any size involves many activities, with dependencies, deadlines, and resource constraints. **Project-management techniques** keep the project on track. Two classical techniques, both developed in the 1950s, are still standard.

### Critical Path Method (CPM)

*The Critical Path Method is a project-management technique that models a project as a network of activities with durations and dependencies, identifies the longest sequence of dependent activities (the critical path), and uses this to determine the minimum project duration and the activities that must not be delayed.*

CPM was developed by DuPont in 1957 for plant-maintenance scheduling. It assumes activity durations are known (deterministic).

**Steps:**

1. **List all activities.** Each activity has a duration.
2. **Identify dependencies.** Which activities depend on which (must be completed before others can start)?
3. **Draw the network.** Nodes = events (start/end of activities); arrows = activities. Alternative: nodes = activities (activity-on-node).
4. **Compute the earliest and latest start/finish times for each activity** by forward pass and backward pass through the network.
5. **Identify the critical path.** The path with the longest total duration — the sequence whose delay directly delays the whole project.
6. **Calculate slack (float).** For non-critical activities, the amount of delay possible without delaying the project.

### Worked example — CPM on a research project

An MSc thesis project at IOE Pulchowk has activities:

| Activity | Description | Duration (weeks) | Predecessor |
|---|---|---|---|
| A | Literature review | 4 | — |
| B | Define research questions | 2 | A |
| C | Design methodology | 3 | B |
| D | Build data-collection instrument | 2 | C |
| E | Pilot study | 2 | D |
| F | Full data collection | 6 | E |
| G | Data analysis | 4 | F |
| H | Write methods chapter | 2 | C |
| I | Write results chapter | 3 | G |
| J | Write discussion and conclusion | 3 | I |
| K | Final revisions and submission | 2 | H, J |

The network has paths from start to end. Compute each path's duration:

Path 1: A → B → C → D → E → F → G → I → J → K
Duration: 4 + 2 + 3 + 2 + 2 + 6 + 4 + 3 + 3 + 2 = 31 weeks.

Path 2: A → B → C → H → K
Duration: 4 + 2 + 3 + 2 + 2 = 13 weeks.

The critical path is Path 1 (31 weeks). Any delay in activities A, B, C, D, E, F, G, I, J, or K directly delays the project. Activity H has slack — it can take longer (or start later) without delaying the project, as long as it is done before K.

**Implications.**
- Project duration: 31 weeks.
- Critical activities must be monitored closely.
- Slack on non-critical activities can be used to buffer against problems.
- Adding resources to critical-path activities can shorten the project; adding to non-critical ones cannot.

### PERT — Program Evaluation and Review Technique

*PERT is a project-management technique developed by the US Navy in 1957 for the Polaris submarine programme, similar to CPM but using three-point estimates of activity durations to handle uncertainty, computing expected durations and variances as the basis for probabilistic statements about project completion.*

PERT differs from CPM in treating activity durations as probabilistic. For each activity, three estimates:

- **Optimistic time ($t_o$).** The shortest possible duration if everything goes well.
- **Most likely time ($t_m$).** The mode of the duration distribution.
- **Pessimistic time ($t_p$).** The longest duration if things go badly.

**Expected duration:**

$$
t_e = \frac{t_o + 4 t_m + t_p}{6}
$$

**Variance of duration:**

$$
\sigma^2 = \left(\frac{t_p - t_o}{6}\right)^2
$$

The total project duration is the sum of expected durations along the critical path. The variance of the project duration is the sum of variances along the critical path (assuming independent activities).

This allows probabilistic statements: "There is a 90% probability that the project will be completed within X weeks."

### PERT example

For the literature review activity in the thesis:
- $t_o = 3$ weeks (best case).
- $t_m = 4$ weeks (most likely).
- $t_p = 8$ weeks (worst case).

$t_e = (3 + 16 + 8)/6 = 27/6 = 4.5$ weeks.

$\sigma^2 = ((8-3)/6)^2 = (0.833)^2 = 0.694$. Standard deviation: 0.83 weeks.

Computed for all critical-path activities, the total expected project duration and variance characterise the project's completion-time distribution.

PERT is more flexible than CPM but more demanding — three estimates per activity instead of one. For a small research project, the discipline of producing three estimates often reveals planning issues that a single point estimate would miss.

### CPM vs PERT comparison

| Aspect | CPM | PERT |
|---|---|---|
| Duration estimates | Single (deterministic) | Three (probabilistic) |
| Origin | Industrial scheduling | Defence programme |
| Best for | Well-understood, repetitive projects | Novel, uncertain projects |
| Output | Critical path, slack | Expected duration, variance, probabilities |
| Effort to apply | Lower | Higher |

For a typical MSc research project — moderate uncertainty, no prior identical projects to draw from — PERT-style three-point estimates are useful, even if the formal PERT machinery is overkill.

## 7.7 Gantt charts

*A Gantt chart is a horizontal bar chart that visualises a project schedule, with each activity represented as a horizontal bar whose position shows the start date and whose length shows the duration, used for planning, monitoring, and communicating project progress.*

Gantt charts were introduced by Henry Gantt in the 1910s, predating CPM and PERT. They remain the standard project-management visualisation. Most thesis-proposal documents include one.

### Structure of a Gantt chart

The x-axis is time (weeks, months, dates). The y-axis lists activities, one per row. Each activity is a horizontal bar showing when it starts and ends. Additional features:

**Dependencies.** Arrows between bars show that one activity must complete before another can start.

**Milestones.** Diamond markers at key checkpoints (proposal defence, first complete draft, final submission).

**Resource assignments.** Annotations on bars showing who is responsible.

**Progress indicators.** Filled portions of bars showing completion percentage.

**Critical path highlighting.** Critical activities in a distinct colour.

### Example Gantt chart for the thesis project

For the example from the CPM section:

```
Week:        1  2  3  4  5  6  7  8  9 10 11 12 ... 31
A: Lit rev   ████████
B: Q define        ████
C: Methodol           ██████
D: Build inst                ████
E: Pilot                         ████
F: Data coll                          ████████████
G: Analysis                                       ████████
H: Methods           ████              (slack)
I: Results                                              ██████
J: Discuss                                                    ██████
K: Revise                                                            ████
```

Real charts are visual — bars on a calendar, not ASCII. Tools (Microsoft Project, GanttProject, Asana, Notion, Trello) produce them automatically from the activity list.

### Strengths of Gantt charts

- **Visual.** Easy to grasp at a glance.
- **Tracks progress.** Compare planned vs actual.
- **Identifies bottlenecks.** Activities falling behind are visible immediately.
- **Communicates with stakeholders.** Easier than a network diagram for non-specialists.
- **Resource planning.** When combined with resource assignments, reveals overload.

### Weaknesses

- **Hides dependencies.** Less explicit than a CPM network diagram.
- **Hard for very large projects.** Hundreds of activities become unwieldy.
- **Static.** Updates required as the project evolves.
- **Sensitive to disruption.** A delay in one activity ripples through; the chart needs continuous updating.

### Gantt charts in MSc research

For an IOE Pulchowk MSc thesis, the standard:
1. Build a Gantt chart at the proposal stage.
2. Review monthly with the supervisor; update as needed.
3. Update the chart before the mid-thesis review.
4. Use the final chart in the thesis methodology chapter to document the actual schedule.

Software ranges from Excel (workable for small projects) through GanttProject (free, capable) to Microsoft Project and online tools (Smartsheet, Monday.com, Asana, ClickUp). For a single-researcher project, any of these works.

### Common tools

- **Microsoft Project.** Industry standard. Steep learning curve. Strong integration with Office.
- **GanttProject.** Free, open source. Adequate for personal and small-team projects.
- **TeamGantt.** Online, collaborative, intuitive.
- **Asana, Trello, Notion, ClickUp.** General project-management tools with Gantt views.
- **Microsoft Excel.** Workable for small projects with manual setup. Many Gantt-chart templates available.
- **Specialised research tools.** Some institutions provide subscriptions to academic project-management platforms.

The tool matters less than the discipline of using it consistently.

## 7.8 Seminar

The seminar is a specific component of the MSc programme at IOE Pulchowk and similar institutions, and a key practice of research more broadly.

### The seminar in IOE Pulchowk

In the MSNCS programme, the laboratory work for the Research Methods subject is structured as a seminar. The expectation:

- Students choose a topic of interest, ideally related to their planned thesis area.
- They identify a recent, high-quality research paper on that topic — typically published in the last 1-3 years in a peer-reviewed venue.
- They prepare and deliver a seminar presentation on the paper.
- Faculty and peers attend, ask questions, and provide feedback.

The seminar is both a learning exercise (forcing the student to deeply engage with a paper) and an early opportunity to develop public-speaking and research-presentation skills.

### Structuring a research seminar

A 20-30 minute seminar covers:

1. **Title and authors.** Establish what is being discussed.
2. **Context and motivation.** Why the paper matters. What problem does it address?
3. **Background.** The minimum prior knowledge the audience needs.
4. **Key contributions.** What is new in the paper.
5. **Methods.** How the work was done. Detailed enough that the audience understands the approach.
6. **Results.** The main findings, with appropriate figures and tables.
7. **Significance and limitations.** What the results mean; what they do not show.
8. **Critique.** The presenter's own assessment — strengths, weaknesses, open questions.
9. **Discussion.** Q&A with the audience.

### Slide design

Standard practices:
- **One concept per slide.** No more.
- **Minimal text.** Slides support the speaker; they do not replicate the talk.
- **Large fonts.** Visible from the back of the room.
- **Use figures and tables from the paper.** Properly attributed.
- **Limit jargon.** Define unfamiliar terms.
- **Pace.** Roughly one minute per slide as a guide.

### Presentation skills

Aspects that distinguish a good seminar from a competent one:

- **Voice.** Loud enough to be heard. Pace that allows comprehension. Variation to maintain attention.
- **Body language.** Stand confidently. Make eye contact with the audience. Avoid reading from the screen.
- **Engagement.** Pause for emphasis. Use rhetorical questions to draw the audience in.
- **Clarity.** Define every concept before using it. Use examples to illustrate abstractions.
- **Visualisation.** Diagrams, plots, and tables convey what words cannot.
- **Storytelling.** A presentation has a narrative arc — problem, attempt, solution, result, significance.

### Handling questions

The Q&A is often the most informative part of a seminar. It reveals what the audience grasped and where the presentation could be clearer.

Practices:
- Listen to the full question before answering.
- Acknowledge the question. "That is a good point" or "I had not considered that."
- Answer directly. If you do not know, say so. "I do not know — that is an interesting question for future work" is a respectable answer.
- Stay calm under challenge. Even hostile questions deserve professional responses.
- Refer to slides or to specific parts of the paper. Specificity strengthens credibility.

### Beyond the IOE seminar

The seminar practice scales up to:
- **Departmental seminars.** Regular research talks at the host department.
- **Conference presentations.** Talks at international or domestic venues. Time-bounded (often 15-20 minutes plus Q&A).
- **Invited lectures.** Longer, more comprehensive presentations on a research programme.
- **Thesis defence.** The culminating oral examination at the end of the MSc or PhD.

For an MSc student at IOE Pulchowk, the in-course seminar is preparation for the thesis defence — a structured opportunity to practise the skills the defence will demand. Engagement with the seminar exercise compounds: better seminars produce better feedback, better feedback improves the student's research, and improved research underpins a stronger thesis defence.

The research-methods subject ends here, but the practice of research begins. The methods covered across these seven chapters — the framing of problems and hypotheses, the design of investigations, the collection and analysis of data, the testing of claims, the reporting and management of projects — are the operating system of the research career that an MSNCS graduate enters. The next stages — thesis, professional practice, publications, continuing engagement with the research community — apply these methods to specific cybersecurity and networking problems, contributing to a body of knowledge that Nepal's engineers and researchers share with the world.
