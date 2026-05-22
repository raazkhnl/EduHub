---
title: 'Chapter 2 — Phases and Methods of Engineering Research'
sidebar_label: 'Ch 02 — Phases and Methods of Engineering Research'
sidebar_position: 2
description: 'Chapter 2 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch02
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

An engineering research project moves through stages. The stages are not strictly sequential — work loops back as new information emerges — but each stage has its own purpose, methods, and standards of quality. This chapter walks through the standard phases that an engineering MSc or doctoral project passes through, from the initial desktop review of what is already known to the final verification that the contribution actually does what it claims, and then closes with the ethical discipline that must run through every stage. The chapter complements Chapter 1: where Chapter 1 was about how to design a research project, this chapter is about how to execute one.

## 2.1 Desktop research

*Desktop research, also called secondary research or library research, is the phase of a research project that gathers existing information from published and accessible sources — academic papers, books, standards, technical reports, datasets, web resources — without collecting new data from the field.*

Desktop research is where most projects start. Before designing experiments, before approaching subjects, before writing code, the researcher must understand what is already known. The output is a synthesised view of the state of the art that justifies the planned research and informs its design.

### What desktop research includes

The sources available for desktop research vary by field. For engineering research in network and cybersecurity:

**Peer-reviewed academic publications.** The gold standard. Journal articles and conference papers that have passed expert review. Major venues for cybersecurity: IEEE Security & Privacy, ACM CCS, USENIX Security, NDSS, IEEE Transactions on Information Forensics and Security. For networking: ACM SIGCOMM, USENIX NSDI, IEEE/ACM Transactions on Networking. For machine learning: NeurIPS, ICML, ICLR.

**Theses and dissertations.** Especially MSc and PhD theses from related institutions. Tribhuvan University's central library maintains MSc theses from Pulchowk; Kathmandu University, Pokhara University, and Purbanchal University maintain their own collections. International theses are available through ProQuest Dissertations & Theses.

**Standards documents.** IETF RFCs, ISO/IEC standards, NIST Special Publications, IEEE standards. These define the technical baselines that research builds on or contests.

**Government and regulatory documents.** Nepal's Cyber Security Policy 2080, the Electronic Transactions Act 2063, NTA directives, NRB cybersecurity directives, the 2025 IT Bill drafts. Industry-association reports and white papers.

**Industry reports.** Vendor white papers, threat reports (Mandiant, CrowdStrike, Cisco Talos), measurement reports (Cloudflare, Akamai). Useful for current threats and adoption trends; treat with appropriate caution since vendor reports have commercial interests.

**Technical documentation.** Library documentation, protocol specifications, source code of open-source projects.

**News, blog posts, technical media.** For recent developments and informal expert commentary. Lower-trust source; cross-check before relying.

**Datasets.** Public datasets used in prior work (CIC-IDS, NSL-KDD for intrusion detection; ImageNet, CIFAR for vision; open malware corpora; certificate-transparency-log dumps).

### How to do desktop research effectively

A working procedure for the desktop phase:

**Start with the textbooks and surveys.** A good survey paper gives the lay of the land in 20 pages and a hundred references. Kothari for research methods; Stallings for cryptography; Russell-Norvig for AI; Tanenbaum for networking. For cybersecurity sub-areas, ACM Computing Surveys often has the strongest entry point.

**Use citation chains.** When you find a relevant paper, look at what it cites (backward) and what cites it (forward). Google Scholar's "cited by" feature is the standard tool. The chain produces clusters of related work organised by intellectual lineage.

**Use targeted searches.** Search engines (Google Scholar, Semantic Scholar, the ACM Digital Library, IEEE Xplore) with carefully chosen keywords. Combine technical terms with venue names to filter quality (`fraud detection ensemble "Nepal"` will find the few directly-relevant papers; `fraud detection ensemble venue:CCS` will find the high-quality cryptography-conference work).

**Build a managed reference library.** Zotero, Mendeley, or BibTeX-based tools. Tag papers, add notes, track which ones are read. A project's literature library typically grows to several hundred items.

**Read in layers.** First pass: title, abstract, conclusion. Decide whether to keep. Second pass: introduction, figures, results section. Decide whether to study in depth. Third pass: full read, with notes. Save the third pass for the truly relevant.

**Note gaps and disagreements.** As the literature accumulates, watch for places where authors disagree, results conflict, or known limitations are acknowledged. These are the openings into which new research fits.

### Limits of desktop research

Desktop research is necessary but not sufficient. It cannot:

- Generate genuinely new data. The data was collected by someone else with their priorities, in their context, possibly years ago.
- Tell you what is currently happening in environments where new measurement is needed.
- Replace direct observation of a system under study.
- Resolve contradictions between sources without new evidence.

The desktop phase ends when the researcher has a reasoned understanding of what is known, what is contested, what is missing, and how the planned research will contribute.

## 2.2 Literature study

*A literature study, also called a literature review, is the formal written product of the desktop-research phase, a critical and synthetic summary of relevant published work that situates the planned research in its intellectual context, identifies the gap the research will address, and justifies the chosen approach.*

The literature study is usually a chapter (or major section) of the thesis or paper. It is not a list of summaries. It is an argument — an argument that the planned research is worth doing because of what existing work has and has not achieved.

### What a literature review is and is not

A literature review **is**:
- Selective. Cites the papers that matter to the argument, not every paper found.
- Organised by theme, not by chronology or by source. Groups papers that share concerns; compares their approaches.
- Critical. Notes strengths, limitations, contradictions, and gaps. Authors are addressed by their contributions and limitations, not just praised.
- Synthetic. Identifies patterns across papers — common assumptions, common datasets, common metrics, common failure modes.
- Pointed at the gap. The final section of a literature review names the gap that the proposed research will fill.

A literature review **is not**:
- A list of summaries. "Smith (2020) studied X and found Y. Jones (2021) studied Z and found W." This is a list, not a review.
- A complete bibliography. Not every paper in the field needs to be cited — only the ones that matter to the argument.
- Uncritical praise. Saying "many studies have shown that X is important" without examining how those studies differed and what they each missed adds nothing.

### Structure of a literature review

A common structure:

1. **Introduction.** What is the topic; why does it matter; what will the review cover and not cover.
2. **Background.** Foundational concepts the reader needs.
3. **Thematic sections.** Each section covers one strand of related work — typically four to seven sections in a thesis review.
4. **Synthesis.** What is the current consensus; what disagreements remain.
5. **Gap statement.** What is missing or weak in existing work; what the planned research will address.

Each thematic section follows a similar pattern: introduce the theme, walk through the major contributions in order of importance (not chronology), compare approaches, identify limitations, lead to the next theme.

### Quality criteria for a literature review

The thesis examiner or paper reviewer looks for:

- **Coverage.** Has the candidate found the important work? Missing the foundational paper in the area is a fatal weakness.
- **Currency.** Does the review reflect recent work? In fast-moving fields (deep learning, cryptography post-quantum migration), a review that stops at 2020 is already inadequate.
- **Critical depth.** Does the candidate engage with the work or just describe it?
- **Synthesis.** Does the review build a coherent argument across the cited work?
- **Connection to the planned research.** Does the review motivate the gap the research will fill?

### The Nepal-specific literature context

For Nepali engineering research, the literature comes from multiple sources:

- **International journals and conferences.** The main body of relevant work, since most research is published internationally.
- **Journal of the Institute of Engineering (JoIE).** Tribhuvan University's flagship engineering journal, indexed in NepJOL.
- **Other Nepali journals on NepJOL.** Journal of Innovations in Engineering Education, Journal of Engineering Sciences, and several others.
- **Conference proceedings.** Pulchowk Campus and Kathmandu University host periodic conferences (e.g. International Conference on Computing, Communication and Security at IOE).
- **Government and policy documents.** Where the research touches policy.

The standard expectation: an MSc thesis at IOE Pulchowk in a cybersecurity area will draw mostly on international literature but should connect findings back to the Nepali context.

## 2.3 Theoretical modelling and conceptual frameworks

*A theoretical model is a structured representation — often mathematical, sometimes diagrammatic or computational — of a system or phenomenon, used to reason about its behaviour, generate predictions, and guide experimental design.*

Engineering research mostly uses two related kinds of frameworks: the **conceptual framework** (introduced in Chapter 1) that names variables and relationships in non-mathematical terms, and the **theoretical model** that formalises a system's behaviour mathematically. The first guides the research; the second is often the product.

### Types of models in engineering research

**Mathematical models.** Equations that describe a system. The Diffie-Hellman key exchange is described by exponentiation in a cyclic group. The capacity of a noisy channel is described by Shannon's formula. The convergence of a learning algorithm is described by PAC-bounds. The traffic on a network link is described by queueing theory.

**Computational models.** Simulators that compute a system's behaviour given inputs. NS-3 for network simulation. Mininet for SDN testbeds. CrypTool for cipher demonstration. Differential-equation solvers for SCADA-process modelling.

**Threat models.** Specifications of adversary capabilities. The Dolev-Yao model for cryptographic protocols; the honest-but-curious vs malicious distinction in MPC; the side-channel-capable adversary in hardware security. The threat model determines what counts as an attack and what counts as security.

**Architectural models.** Block-diagram or component-level descriptions of how a system is organised. UML diagrams. Reference architectures. Used both to describe existing systems and to specify proposed ones.

**Game-theoretic models.** Adversary and defender as players, each with strategies and payoffs. Used in security economics, in intrusion-deception planning, in mechanism design.

**Statistical models.** The distributions assumed for observed data — Gaussian errors, Bernoulli outcomes, Poisson arrivals. Underpins all parametric hypothesis testing (Chapter 5).

### Why modelling matters

A model lets the researcher:

- **Make predictions.** Given the model, what behaviour would the system exhibit under particular conditions?
- **Identify what to measure.** The model's variables are the variables the experiment must observe.
- **Bound expectations.** The model says what the best possible performance is (in cryptography, the bound on adversary advantage; in networking, the channel capacity; in learning, the Bayes error rate).
- **Compare alternatives.** Two competing designs can be analysed under the same model, with the comparison made explicit.
- **Communicate.** A formal model is precise where natural-language description is ambiguous.

### Choosing the right model

A model is an abstraction — it leaves out details. The art is to leave out the right details. Too much abstraction and the model says nothing about the real system; too little and the model is intractable.

George Box's well-known dictum applies: "all models are wrong; some are useful." The question is not whether the model is correct in every detail but whether it is useful for the questions the research asks.

For an MSc thesis, the standard practice:
- Start with a simple model that captures the main mechanism.
- Identify the simplifying assumptions and discuss when they break.
- Show that the simple model predicts the qualitatively right behaviour.
- Refine the model where the data suggests refinement is needed.

### A worked example — modelling a fraud-detection system

A researcher proposing a new fraud-detection algorithm for eSewa would build several layers of model:

**Threat model.** Adversary capabilities — can they compromise accounts? Can they observe the model? Can they query it adaptively to evade detection?

**Statistical model.** Distribution of legitimate transactions (Gaussian mixture across amount, time, location, merchant); distribution of fraudulent transactions (different mean and tail behaviour).

**Decision model.** The model's score $s(x)$ is computed by the algorithm; transactions with $s(x) > \tau$ are flagged. Choose $\tau$ to balance false-positive and false-negative costs.

**Cost model.** Per-transaction expected cost = $P(\text{FN}) \cdot C_{\text{FN}} + P(\text{FP}) \cdot C_{\text{FP}}$. Used in cost-sensitive evaluation.

**Operational model.** The algorithm must score transactions in less than 100 ms with availability above 99.9%. Used in performance engineering.

Each model formalises a different aspect of what "good" means. Their combination gives the design targets the proposed system must hit.

## 2.4 Experimental and study design

*Experimental design is the discipline of arranging research procedures — choice of variables, allocation of subjects, sequencing of treatments, control of confounding factors — to allow the data to clearly answer the research question.*

For an engineering thesis, this stage produces the detailed plan that the data collection will follow.

### Types of study design

**Experimental studies.** The researcher actively manipulates one or more variables (the independent variables) and observes the effect on others (the dependent variables). The defining feature of experiments is **control** — the researcher chooses what changes and what stays the same.
- *Controlled laboratory experiment.* Highest control; all conditions are managed.
- *Field experiment.* Lower control; the experiment is run in the real environment.
- *Quasi-experiment.* The researcher cannot fully randomise but uses statistical techniques to approximate experimental control.

**Observational studies.** No intervention. The researcher observes phenomena as they occur without manipulating them. Internet measurement studies, log-based studies, surveys.

**Mixed designs.** Combine experimental and observational elements. The most common pattern in engineering theses.

### Variables

Every quantitative study identifies several types of variables.

- **Independent variable.** The variable the researcher manipulates or that is presumed to cause the effect being studied. The encryption algorithm in a performance comparison. The training-set size in a learning-curve study.
- **Dependent variable.** The variable measured to assess the effect. Latency. Accuracy. False-positive rate.
- **Control variable.** A variable held constant across conditions to prevent it from confounding the results. Hardware. Workload. Random seed.
- **Confounding variable.** A variable that varies with the independent variable and could explain the observed effect on the dependent variable. The classic problem in observational studies — and the reason experiments randomise.
- **Moderating variable.** A variable that changes the strength or direction of the relationship between independent and dependent variables.

A good design names every variable and decides how each is handled.

### Designing experiments to answer the question

The experimental design must support the inference the research wants to draw. Several standard patterns:

**Between-subjects design.** Different subjects (or different runs, different systems) are assigned to different conditions. Compare the means across conditions. Used when carrying a condition over between subjects would contaminate the comparison.

**Within-subjects (paired) design.** The same subjects are measured under multiple conditions. Compares the difference per subject. More statistical power for the same sample size but vulnerable to order effects.

**Factorial design.** Multiple independent variables varied simultaneously, with all combinations measured. Allows assessment of main effects and interactions. A $2 \times 3$ design has 6 conditions.

**Repeated measures.** Subjects measured multiple times. Allows tracking of change. Useful for learning, adaptation, or longitudinal effects.

**Counterbalancing.** When the same subjects do multiple conditions, the order is varied across subjects to neutralise order effects. Useful in within-subjects designs.

**Randomised controlled trial (RCT).** The gold standard for causal inference. Subjects randomly assigned to treatment or control; outcomes compared. Common in medical research; harder to apply in engineering but used in human-factors studies of security.

### Sample size and statistical power

The sample size determines the study's **statistical power** — its ability to detect an effect if one exists.

For a planned comparison of means, the required sample size depends on:
- The effect size (small effects need larger samples).
- The variance in the data (more variance needs more samples).
- The desired significance level (typically $\alpha = 0.05$).
- The desired power (typically 0.80 — 80% chance of detecting a real effect).

A power analysis done at design time prevents the common failure mode of running a study too small to detect the effect of interest. Software (G*Power, R's `pwr` package) makes the calculation routine.

For engineering studies, sample size is often determined by the number of runs feasible in the available time. A planned 30-run experiment with a small effect size may simply lack power to detect it; the design should either expand the runs, reduce the noise (by careful control), or accept that the study cannot answer the question.

### Validity threats to manage

The four validity types from Chapter 1, applied to experiments:

**Internal validity threats.**
- *Selection.* Subjects in different conditions differ in ways that could explain the outcome.
- *History.* External events during the study could affect results.
- *Maturation.* Subjects change naturally over time.
- *Instrumentation.* Measurement instruments change or differ across conditions.

**External validity threats.**
- *Sample non-representativeness.* The studied subjects do not represent the population.
- *Setting non-representativeness.* The lab condition does not match field conditions.
- *Time-period non-representativeness.* Results from one period may not generalise to another.

**Construct validity threats.**
- *Mono-operation bias.* Single measure of the construct may miss important aspects.
- *Hypothesis guessing.* Subjects modify their behaviour because they figure out what the researcher is looking for.

**Statistical conclusion validity threats.**
- *Low power.* Real effects missed.
- *Violated assumptions.* Tests applied where their assumptions do not hold.
- *Fishing.* Running many tests and reporting only significant ones (inflating Type I error).

The design phase decides how each threat will be managed.

### A worked example — designing an ML benchmark study

Suppose the research compares the F1-score of a new anomaly-detection algorithm against two baselines on three datasets.

**Independent variables.**
- Algorithm: new, baseline-A, baseline-B (3 levels).
- Dataset: CIC-IDS-2017, UNSW-NB15, NSL-KDD (3 levels).

**Factorial design.** $3 \times 3 = 9$ algorithm-dataset combinations.

**Dependent variables.** F1-score, AUC, training time, inference latency.

**Control variables.** Hardware (same machine), software versions, random seed for reproducibility, training/test splits (same for all algorithms on each dataset).

**Sample.** 30 random restarts per cell (to capture variance from initialisation). Total: $9 \times 30 = 270$ training runs.

**Analysis.** Per-dataset comparison via paired t-tests or Wilcoxon signed-rank tests. Cross-dataset comparison via a mixed-effects model with algorithm as a fixed effect and dataset as a random effect.

**Validity.**
- Internal: random seeds and consistent splits ensure differences between algorithms are not explained by data shuffling.
- External: three diverse datasets reduce dataset-specific generalisation risk.
- Construct: multiple metrics (F1, AUC, latency) capture different aspects of the construct "good anomaly detector."
- Statistical: 30 restarts per cell give reasonable power for moderate effect sizes.

The design document specifies all of this before any code is run.

## 2.5 Data collection

Data collection is the operational phase where the design becomes data. Chapter 3 covers data-collection methods in detail; here we cover the cross-cutting concerns that apply to all methods.

### Planning data collection

The data-collection plan answers:

- **What data?** Variables specified by the conceptual framework and operationalised by the design.
- **From whom or what?** The sampling units — users, machines, transactions, packets.
- **How many?** The sample size from the design.
- **With what instrument?** Sensor, measurement tool, survey questionnaire, scanner.
- **When?** The time window of data collection.
- **By whom?** The roles and responsibilities of the data-collection team.
- **Where stored?** The repository for raw data; backup arrangements; security of sensitive data.

### Pilot data collection

Before full-scale collection, a **pilot** run is standard practice. The pilot:

- Tests that the measurement instruments work correctly.
- Identifies practical issues — unclear questionnaire wording, sensors that drift, network conditions that break the measurement.
- Validates the analysis pipeline on real (small) data.
- Estimates how long the full collection will take.

A two-week pilot before a six-month main study is good investment. Many MSc projects skip the pilot and pay for it later when data quality issues are discovered after collection is complete.

### Data quality during collection

Several disciplines maintain data quality:

**Standard operating procedures.** A written procedure for each repeated operation — how to start the measurement, how to record metadata, how to handle errors.

**Data validation at entry.** Range checks, format checks, completeness checks. Catch errors early, when they can still be corrected by re-collection.

**Logging and metadata.** Every data point should be traceable — when collected, by what instrument, under what conditions. Logs save projects when something turns out to be wrong months later.

**Backups.** Raw data is irreplaceable. Backed-up daily, ideally to two independent locations. Cloud storage at AWS Mumbai, Google Cloud Singapore, or institutional servers all work; a single laptop hard drive does not.

**Version control.** Code, instruments, and analyses all under version control (Git). The exact code that produced each result must be recoverable.

### Sample types

How subjects are selected from the population determines what conclusions can be drawn.

**Probability sampling** uses random selection. Allows statistical inference to the population.
- *Simple random sampling.* Every subject equally likely.
- *Stratified random sampling.* Population divided into strata; random sample from each.
- *Cluster sampling.* Population divided into clusters; clusters sampled randomly; all in each cluster measured.
- *Systematic sampling.* Every kth subject from an ordered list.

**Non-probability sampling** does not use random selection. Easier and cheaper, but limits generalisation.
- *Convenience sampling.* Whoever is available.
- *Purposive sampling.* Selected by judgement for a specific purpose.
- *Snowball sampling.* Subjects refer further subjects.
- *Quota sampling.* Selection to meet predefined proportions.

For an engineering measurement study, the choice depends on the population. A study of all `.gov.np` domains can enumerate the population exactly and either measure all of them or sample randomly. A study of user behaviour requires more careful sampling.

### Data security during collection

Especially for sensitive data — personal information, transaction logs, security incidents — the data-collection phase must handle security itself:

- Encrypt sensitive data at rest and in transit.
- Limit access on a need-to-know basis.
- Pseudonymise or anonymise where possible.
- Comply with consent agreements signed at collection.
- Plan for secure deletion after analysis.

Chapter 5 of the Cryptography subject covers data security in operational depth; the principles apply to research data too.

## 2.6 Evaluation, validation and verification

After the artefact is built or the analysis is run, the result must be evaluated against criteria, validated for relevance, and verified for correctness. These three words are often confused; the distinctions matter.

### Verification

*Verification is the process of confirming that a system has been built correctly according to its specification, answering the question "did we build the thing right?"*

Verification is internal to the artefact. It asks whether the implementation matches what the design said. Techniques include unit testing, integration testing, formal verification, code review.

For a cryptographic implementation, verification might involve:
- Testing against published test vectors (does the AES implementation produce the right output for known inputs?).
- Static analysis for memory safety.
- Formal verification of correctness against a specification.

Verification does not ask whether the design was the right design. That is validation.

### Validation

*Validation is the process of confirming that a system meets its intended purpose in its operational environment, answering the question "did we build the right thing?"*

Validation is external to the artefact. It asks whether the artefact actually solves the problem it was meant to solve.

For an anomaly-detection algorithm, validation might involve:
- Deploying it in a realistic environment.
- Measuring its actual catch rate and false-positive rate on real traffic.
- Comparing its outputs against ground-truth incident records.
- Confirming that it works for users in the way intended.

A verified-but-not-validated system is built to specification but solves the wrong problem. A validated-but-not-verified system addresses the right problem but contains bugs.

### Evaluation

*Evaluation is the broader process of judging the worth, effectiveness, or quality of a system or research result, typically by comparing it against criteria (benchmarks, baselines, requirements, standards) using both quantitative metrics and qualitative judgement.*

Evaluation includes both verification and validation but extends beyond them. It asks: how well did the artefact do? What were its trade-offs? What did it do better or worse than alternatives?

Engineering theses are typically judged by the quality of their evaluation as much as by the cleverness of their contribution. A new algorithm without a strong evaluation is a hypothesis, not a result.

### Evaluation criteria

The criteria depend on the artefact. Common categories:

**Functional criteria.** Does it do what it is supposed to do? Correctness against test cases.

**Performance criteria.** How fast, how scalable, how resource-efficient?

**Security criteria.** What threats does it resist? What is the proven security level?

**Robustness criteria.** Does it hold up under adverse conditions? Bad inputs, hostile environments, partial failures?

**Usability criteria.** Can the intended users actually use it? Error rates, completion times, satisfaction.

**Cost criteria.** Development cost, operational cost, infrastructure cost.

**Maintainability criteria.** Can it be modified, extended, debugged?

For an MSc thesis, the evaluation chapter typically establishes the criteria, justifies their importance, defines the metrics, runs the experiments, presents the results, and discusses what they mean.

### Benchmarks and baselines

A new method must be compared to existing alternatives. Two key choices:

**Baseline.** The minimum reasonable alternative. For an ML model, a logistic regression. For a network protocol, a standard one. The baseline establishes whether the new method does anything useful at all.

**State-of-the-art (SOTA).** The current best method. For comparison, to determine whether the new method actually advances the field.

A new method that beats the baseline but not the SOTA is interesting but not a contribution. A new method that beats the SOTA on a recognised benchmark is a publishable result.

### Reporting evaluation honestly

The pre-save checklist from Chapter 6 of the ML subject applies broadly:

- Confidence intervals, not just point estimates.
- Comparison to baselines and to SOTA.
- Multiple runs with reported variance.
- Failure cases, not just successes.
- Limitations explicitly stated.

A thesis or paper that hides limitations does not pass examination by competent reviewers.

## 2.7 Research ethics

Research ethics is the set of principles and practices that protect subjects, ensure honesty in reporting, and maintain the integrity of the research enterprise. Engineering research that involves human subjects or sensitive data is bound by ethics in the same way that medical research is, even though the perceived stakes differ.

### Why ethics matter

Three reasons. First, **moral.** Research that harms subjects, deceives readers, or fabricates results is wrong on its face. Second, **practical.** Detected misconduct ends careers and damages institutional reputations. Tarnished researchers cannot publish; their previous work loses credibility. Third, **structural.** A research community runs on trust. Without trust, every claim must be checked from scratch. The shared trust enables cumulative knowledge.

### Core ethical principles

The Belmont Report (1979, US National Commission for the Protection of Human Subjects of Biomedical and Behavioral Research) named three principles that remain the foundation:

**Respect for persons.** Subjects are autonomous individuals whose decisions about whether to participate must be informed and uncoerced. Children, prisoners, and others with diminished autonomy need special protection.

**Beneficence.** Maximise benefits; minimise harms. The expected benefit of the research must justify the risks to subjects.

**Justice.** Burdens and benefits of research distributed fairly. No exploiting vulnerable populations while benefits flow to others.

Modern frameworks (CIOMS, Declaration of Helsinki, Nuremberg Code, the US Common Rule, the EU General Data Protection Regulation) elaborate these principles into specific requirements.

### Informed consent

A central operational requirement. Subjects must:

- Know what the research is about.
- Know what their participation will involve.
- Know the risks and benefits.
- Know their right to refuse or withdraw.
- Give consent freely, in writing where possible.
- Understand the information — informed consent for non-experts requires non-technical explanation.

A consent form for a phishing-susceptibility study at a Nepali university would explain that participants will receive simulated phishing emails, that their responses will be recorded, that the data will be anonymised for analysis, that they may withdraw at any time, that there is no penalty for non-participation, and what the researcher's contact information is.

### Subject protection

Studies that involve human subjects must specifically prevent foreseeable harms:

- **Physical harm.** Rare in cybersecurity research but possible in human-factors lab studies (long screen time, posture).
- **Psychological harm.** Phishing simulations can cause embarrassment, anxiety, or self-blame in those who fall for them. Debrief participants honestly and respectfully.
- **Social harm.** Identification of subjects as having particular security beliefs or behaviours could affect their relationships, employment, or social standing.
- **Legal harm.** Subjects' actions during the study might expose them to legal risk if recorded.
- **Privacy harm.** Personal data collected during the study could be misused if mishandled.

The design must minimise these harms and disclose them to subjects in advance.

### Institutional Review Board

*An Institutional Review Board (IRB), also called an Ethics Review Committee or Research Ethics Committee, is the institutional body that reviews and approves research involving human subjects, ensuring that the research design meets ethical standards before data collection begins.*

In Nepal, the Nepal Health Research Council (NHRC) is the apex body for biomedical research ethics. For engineering research at IOE Pulchowk, the institutional review is typically handled by the Department's research committee. Studies involving health data, biological samples, or vulnerable populations may require NHRC approval.

Standard practice: prepare an ethics proposal alongside the research design; submit to the committee; revise based on feedback; begin data collection only after written approval.

### Data ethics

Beyond human subjects, data itself raises ethical issues:

**Privacy.** Data about identifiable individuals — even when collected without direct interaction — must be handled ethically. The 2020 Foodmandu and Vianet breaches illustrate what happens when this fails on the operational side; research projects must do better.

**Anonymisation.** Where individual identity is not needed for the research, anonymise. Where partial identification is needed, pseudonymise with the mapping held separately and securely.

**Aggregation.** Reporting aggregate statistics rather than individual values can preserve privacy. But — as discussed in Chapter 6 of the Cryptography subject — aggregate data can sometimes be inverted. Differential privacy or other formal protections are increasingly expected.

**Data sharing.** Research data may be shared under controlled-access agreements. The 2024 NIH Data Management and Sharing Policy and the broader open-data movement push toward more sharing; the requirements are evolving.

**Consent for data reuse.** Data collected for one study may not be reused in another without further consent — or must be carefully documented in the original consent.

### Research integrity

Beyond subject protection, integrity governs the conduct of research itself:

**Honesty in data.** Do not fabricate, falsify, or selectively report data. Report what was actually found, including the unexpected and the unfavourable.

**Honesty in attribution.** Cite the work that inspired or supports the research. Plagiarism — taking credit for others' words or ideas — is a major form of misconduct, and easily detected with modern plagiarism-checking tools.

**Honesty in authorship.** Authors of a paper should be those who actually contributed substantively. Honorary authorship, ghost authorship, and gift authorship all violate norms.

**Honesty about limitations.** State what the research did and did not show. Do not overclaim.

**Disclosure of conflicts of interest.** If the researcher has a financial interest in the outcome (a company that benefits from the research being favourable), disclose it.

**Reproducibility.** Provide enough detail, code, and data for others to reproduce the work. The "Reproducibility Crisis" in social science and parts of biomedicine has pushed the engineering communities toward more reproducible practices — open source code, public datasets, exact configuration documentation.

### Plagiarism

A specific and serious form of misconduct. Includes:

- Copying text verbatim without quotation or citation.
- Paraphrasing closely without citation.
- Taking ideas without attribution.
- Self-plagiarism — reusing one's own previously-published text in new work without acknowledgement.
- Copying from AI-generated text without attribution (an emerging concern in 2024-26).

Plagiarism-detection tools (Turnitin, iThenticate) are standard in graduate programmes. IOE has used Turnitin for MSc thesis submissions for several years. The threshold for unoriginal text is institution-specific but typically 15-20% (excluding properly-cited material) triggers concern.

The defence is straightforward: cite generously, paraphrase in your own words when paraphrasing, use direct quotes for distinctive phrasings, and never copy without attribution.

### Research misconduct cases

The history of engineering and computer science has its share of misconduct cases. Several recent examples:
- The 2014 retraction of a series of computer-science papers over plagiarism.
- The 2020 retraction wave in deep-learning conferences over unreproducible results.
- Repeated incidents at universities worldwide where MSc and PhD theses were withdrawn over data falsification or plagiarism.

Each case shows how detected misconduct ends careers. The reverse — research conducted with discipline and integrity — opens them.

### Ethics in cybersecurity specifically

Cybersecurity research has some specific ethical concerns:

**Disclosure of vulnerabilities.** When a researcher finds a vulnerability, when and how to disclose it? The norm is **responsible disclosure** — notify the vendor, give them time to fix it, then publish. The exact timeline (90 days is common; Google Project Zero uses 90 days with strict deadlines) varies by community.

**Studies on real systems.** Probing systems without permission is illegal in Nepal under the Electronic Transactions Act and similar laws elsewhere. Internet measurement studies must scope their probes carefully and avoid causing harm. Bug-bounty programmes provide a controlled framework for some research.

**Studies of attackers.** Engaging with criminal forums for research raises both legal and ethical issues. Some major institutions have specific protocols.

**Dual-use concerns.** Research on attacks can be misused. The community has developed norms — proof-of-concept code released cautiously, weaponised exploits not published.

**Adversarial deception.** Studies that deceive subjects (phishing simulations, social-engineering experiments) need especially careful ethical review. Debriefing is essential.

### The Nepal context

Nepal's research-ethics infrastructure is developing. The Nepal Health Research Council provides national oversight for health-related research. For engineering, individual institutions have their own committees with varying degrees of formality. The 2018 Individual Privacy Act and the constitution's privacy provisions establish legal context.

For an MSc thesis at IOE Pulchowk involving human subjects (interviews with security professionals, user studies of password practices, surveys of awareness), the standard is to:

1. Prepare an ethics application alongside the research design.
2. Submit to the Department's research committee for review.
3. Obtain written approval before approaching subjects.
4. Use the approved consent process with every subject.
5. Store data securely; anonymise where possible.
6. Report ethical practices in the thesis methodology chapter.

The discipline takes time but is the foundation of credible research. A thesis without ethical discipline does not pass examination by competent reviewers; one with it carries the weight of an honest contribution to the field. The next chapter turns to the specific methods of primary and secondary data collection — the operational core of the empirical phase.
