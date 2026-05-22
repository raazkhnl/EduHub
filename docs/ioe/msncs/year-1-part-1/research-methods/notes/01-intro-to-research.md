---
title: 'Chapter 1 — Introduction to Research'
sidebar_label: 'Ch 01 — Introduction to Research'
sidebar_position: 1
description: 'Chapter 1 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch01
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Research is the structured pursuit of new knowledge. In an engineering discipline like network and cybersecurity, this means the disciplined inquiry that produces new algorithms, new architectures, new threat models, new performance bounds, and new evidence about how systems behave. This chapter lays the foundation for the rest of the subject. It defines what research is, why it is done, how it is distinguished from other forms of inquiry, what types of research exist and when each applies, and how a research project is set up — the questions, problems, objectives, hypotheses, and designs that make the difference between disciplined inquiry and aimless effort. The mathematical apparatus is light at this stage. The conceptual apparatus is heavy and matters for every chapter that follows.

## 1.1 Scientific methods and research

### What research is

*Research is the systematic, disciplined, evidence-based inquiry conducted to discover new facts, verify existing knowledge, or develop new concepts, theories, methods, or applications, performed according to procedures that other competent investigators can follow and verify.*

Several elements are mandatory. **Systematic** — it follows an explicit procedure, not opinion. **Evidence-based** — claims are supported by data or proof, not assertion. **Verifiable** — another researcher can repeat the work and confirm the result. **Public** — the findings, methods, and limitations are written up so others can use, criticise, and extend them.

Different authors phrase this differently. Kothari (whose 1985 textbook *Research Methodology: Methods and Techniques* is the standard reference in South Asian engineering programmes) frames research as "a careful investigation or inquiry especially through search for new facts in any branch of knowledge." Clifford Woody's classic 1927 definition treats research as "defining and redefining problems, formulating hypotheses or suggested solutions; collecting, organising and evaluating data; making deductions and reaching conclusions; and at last carefully testing the conclusions to determine whether they fit the formulating hypothesis." The American sociologist Earl Babbie defines research as "a systematic inquiry to describe, explain, predict and control the observed phenomenon."

These definitions overlap on the central commitments: discipline of method, primacy of evidence, openness to verification, and contribution to a shared body of knowledge.

### Research vs everyday inquiry

The distinction between research and ordinary problem-solving is in the discipline.

An engineer at WorldLink who notices that customer complaints have risen and asks the network team to investigate is doing ordinary problem-solving — useful, important, but not research. The investigation will resolve the issue and move on.

The same engineer, observing the same pattern, who frames the question as "do BGP route flaps on Tier-1 transit links explain the observed customer-facing latency anomalies on residential FTTH circuits in the Kathmandu valley?" — who designs an experiment, collects data over months, controls for confounding variables, publishes the findings in *Journal of the Institute of Engineering* — is doing research. The intent is not just to fix this incident but to contribute knowledge that other ISPs and researchers can use.

### The scientific method

*The scientific method is the iterative procedure by which knowledge is built up through cycles of observation, hypothesis formation, experimental testing, and theory refinement, the method on which modern research is founded.*

The standard cycle:

1. **Observation.** Notice a phenomenon. Identify a gap or problem.
2. **Question.** Frame a specific, answerable question about the phenomenon.
3. **Hypothesis.** Propose a tentative explanation.
4. **Prediction.** Derive testable consequences from the hypothesis.
5. **Experiment / Investigation.** Collect data to test the prediction.
6. **Analysis.** Determine whether the data supports or contradicts the hypothesis.
7. **Conclusion and refinement.** Accept, modify, or reject the hypothesis. Publish.

The cycle is iterative — conclusions often raise new questions, sending the researcher back to step 1 with sharper instruments. Karl Popper's emphasis on **falsifiability** is central: a scientific hypothesis must make predictions that could in principle be shown to be false. A hypothesis that explains everything explains nothing.

### Purpose of research

Why is research done? The Course Objectives list several. Each represents a distinct intent.

**To generate new knowledge.** The most fundamental purpose. Add to what humanity collectively knows. A new attack technique, a new defence, a new performance result, a new theorem.

**To gain familiarity or develop new insight.** *Exploratory* research. The researcher is new to a domain and seeks understanding. Common in early-stage industry projects and in graduate-thesis literature reviews.

**To investigate existing situations or problems.** *Descriptive* and *diagnostic* research. Describe accurately. Determine causes. Document the current state of password practices in Nepali banks; describe the malware families targeting eSewa users in 2024-25.

**To construct or create a new procedure or system.** *Design* or *engineering* research. Build something that did not exist before. A new key-exchange protocol, a new IDS architecture, a new federated-learning framework. Common in MSc and PhD theses in engineering disciplines.

**To explore and analyse general issues.** *Theoretical* research. Build models, derive bounds, prove correctness. Most cryptographic foundations work falls here.

**To test a hypothesis or theory.** *Hypothesis-testing* research. State a precise claim; design an experiment that could refute it; run the experiment; report. Much empirical engineering research follows this pattern.

**To identify patterns or trends.** *Pattern-discovery* research. Run measurements at scale and look for structure. Internet measurement studies, anomaly-detection research, longitudinal studies of vulnerability disclosure.

A single research project usually combines several of these intents. A thesis that proposes a new authentication scheme will explore prior art (exploratory), describe what it is (descriptive), construct the new mechanism (design), and evaluate its security and performance (hypothesis-testing) before publication.

### Importance of research in engineering

Engineering research is the bridge between scientific understanding and useful technology. Several specific roles:

**Solving real problems.** Every system in modern life — from the Nepal Electricity Authority's load-control SCADA to the encryption protecting eSewa transactions to the road-design standards used by the Department of Roads — descends from accumulated engineering research.

**Driving technology innovation.** The encryption schemes from Chapter 2 of the Cryptography subject, the SDN architectures from the Next-Gen Networks subject, the deep-learning methods from the ML subject all reached deployment through research-development cycles measured in decades.

**Building capacity in the country.** Nepal historically imported most of its engineering technology. A working research culture at IOE Pulchowk, Kathmandu University, Nepal Engineering College and other institutions builds the domestic capacity that lets Nepali engineers participate in, not merely consume, the global technology frontier. The Department of Electronics and Computer Engineering at Pulchowk produces several dozen MSc theses every year, many published in *Journal of the Institute of Engineering* or international venues.

**Informing policy.** Government decisions on data-protection law, on spectrum allocation, on cybersecurity strategy depend on research evidence. The 2023 National Cyber Security Policy and the 2025 IT Bill drew on research from academic and policy institutions.

**Training researchers.** The most lasting product of a thesis is often the researcher trained by writing it. MSc and PhD graduates take their methodological discipline into industry, government, and teaching.

### Steps of research

The standard sequence in any research project. Different sources break it down differently; the substance is the same.

1. **Formulate the research problem.** State precisely what is being studied.
2. **Survey the existing literature.** Know what is already known, what methods have been tried, what gaps remain.
3. **Develop hypotheses.** State the tentative answer the research will test.
4. **Prepare the research design.** Specify methods, sample, data, analysis, schedule.
5. **Determine the sample design.** Who or what will be measured, how many, how chosen.
6. **Collect the data.** Run experiments, conduct surveys, gather measurements.
7. **Analyse the data.** Apply statistical or other analytical methods.
8. **Test hypotheses.** Determine whether the analysis supports or contradicts each hypothesis.
9. **Generalise and interpret.** Draw conclusions about the broader population or theory.
10. **Prepare the report.** Write up findings for publication and dissemination.

The steps are iterative in practice. Data analysis reveals that the original problem statement was too broad and must be sharpened. Literature review uncovers a method that supersedes the planned one. The design must accommodate constraints that emerge only during data collection. The linear list is a guide, not a script.

### Levels of research

Research can be classified by depth and ambition.

**Exploratory.** The researcher knows little about the area; the goal is to find out what is there, what questions matter, what variables to study. Often the first phase of a larger project.

**Descriptive.** Document the state of affairs precisely. What proportion of Nepali e-commerce sites use HTTPS? What are the password-length statistics across major SaaS users in Nepal? Descriptive work answers "what is" without yet probing "why."

**Explanatory (causal).** Determine why something happens. Why do certain districts have higher cybercrime victimisation? Why does a particular DBMS scale better than another under specific workloads?

**Predictive.** Forecast future behaviour. How will load on the Government Integrated Data Centre grow over the next five years given current adoption rates?

**Evaluative.** Judge the quality, effectiveness, or value of something. Does the new fraud-detection system actually reduce fraud losses? Does the intervention meet its objective?

A graduate-level project often spans multiple levels — exploratory at start, descriptive during data collection, explanatory in interpretation, evaluative for the proposed contribution.

### Rigor of research

Rigor is the discipline that distinguishes credible research from speculation. Several elements:

**Conceptual rigor.** Concepts are defined precisely and used consistently. "Anomaly" means the same thing throughout the study.

**Methodological rigor.** Methods are appropriate to the question, are applied correctly, and are reported in enough detail that another researcher could reproduce the work.

**Analytical rigor.** Data analysis uses correct statistical methods. Assumptions are checked. Limitations are stated.

**Evidential rigor.** Conclusions are supported by the data; speculation is labelled as such. Counter-evidence is acknowledged.

**Ethical rigor.** Subjects are protected, consent is obtained, conflicts of interest are disclosed, attribution is honest.

The reverse — research without rigor — produces results that look impressive but do not replicate. The wider literature on the **replication crisis** in social science and parts of biomedical research after 2010 has made the engineering community more careful about rigor. The cryptography subfield's emphasis on formal proofs and standardisation through public competitions (AES, SHA-3, post-quantum) is partly a response to the consequences of rigor's absence elsewhere.

## 1.2 Basic types of research

The literature classifies research along several axes. The same project can be characterised on multiple axes simultaneously.

### Quantitative vs qualitative

*Quantitative research is the form of research that measures phenomena numerically and analyses the measurements with statistical methods to test hypotheses, identify patterns, or estimate quantities.*

*Qualitative research is the form of research that examines phenomena through non-numeric data — text, audio, interviews, observations, documents — analysed through interpretation, coding, and thematic analysis to develop understanding of meaning, process, and context.*

**Quantitative.** Numbers, counts, measurements, statistical analysis. "What percentage of Nepali bank apps implement certificate pinning?" "How many packets per second can this NIDS process before dropping?" "What is the false-positive rate of this phishing classifier?"

**Qualitative.** Words, narratives, themes, interpretation. "How do CISOs at Nepali commercial banks understand their threat landscape?" "What organisational factors explain successful adoption of zero-trust architecture?" "How do students at IOE perceive the practicality of cryptographic protocols?"

Engineering research is predominantly quantitative — measurements, performance numbers, security bounds. Qualitative methods appear in usability studies, security-perception research, organisational case studies, and the human-factors side of cybersecurity. Many strong projects use **mixed methods** — quantitative measurements combined with qualitative interviews to understand both the "what" and the "why."

### Fundamental (basic) vs applied research

*Fundamental research, also called basic research, is research aimed at increasing the understanding of underlying principles or phenomena without an immediate practical application in view.*

*Applied research is research aimed at solving a specific practical problem or developing a specific product, technique, or process for a defined purpose.*

**Fundamental.** "Is the discrete logarithm problem on a specific elliptic curve hard?" "What is the optimal sample complexity for PAC-learning a halfspace?" "Does an arbitrary-precision side-channel attack against this cipher class exist?"

**Applied.** "How can we reduce the false-positive rate of NIC Asia's fraud-detection system?" "What is the most cost-effective way to retrofit Nepali municipal water-treatment SCADA for cybersecurity?" "Can a particular ML model predict NEPSE volatility with usable accuracy?"

The boundary is fuzzy in practice. Much modern computing research is **use-inspired basic research** in Donald Stokes' phrase — Pasteur's quadrant in his 1997 book. Cryptography research is generally fundamental in approach but applied in motivation (we need a post-quantum signature scheme by such-and-such a date, so prove security of these candidates).

### Descriptive vs analytical research

**Descriptive research** describes phenomena as they are. It collects data, reports facts, and characterises situations. No explanation is attempted beyond what is directly observable. Census-style work, performance benchmarks, market surveys.

**Analytical research** goes beyond description to explanation. It seeks causes, mechanisms, and relationships. Why does this happen? What variables drive what outcomes? Most thesis-grade work has an analytical component.

A descriptive study might document the SSL/TLS configuration of all `.gov.np` domains — what versions, what cipher suites, what certificate authorities. An analytical study would go further: which factors (size of agency, age of website, type of hosting) predict good vs poor TLS hygiene? Why do some agencies do better than others?

### Conceptual vs empirical research

**Conceptual research** is concerned with abstract ideas, theories, and frameworks. Mathematical work, philosophical work, theoretical computer-science work. No data collection from the world.

**Empirical research** is based on observation, experiment, and measurement. Data drives the conclusions. Most modern engineering research is empirical or empirical-with-theoretical components.

A pure conceptual cryptography paper might prove that a particular construction satisfies indistinguishability under chosen-ciphertext attack in a specific security model. A pure empirical paper might measure how widely the resulting scheme is deployed three years after standardisation. A typical paper does both — propose, prove, measure.

### Diagnostic vs hypothesis-testing research

**Diagnostic research** is concerned with identifying causes. Something is happening; the research asks why. Why are customers churning? Why are these queries slow? Why is the false-positive rate so high?

**Hypothesis-testing research** is concerned with verifying or refuting a specific stated hypothesis. The researcher knows what they expect (or what theory predicts) and runs an experiment that could refute it. Most quantitative scientific research follows this pattern.

The two are complementary. Diagnostic work often generates the hypotheses that subsequent hypothesis-testing work tests rigorously.

### Conclusion-oriented vs decision-oriented research

**Conclusion-oriented research** is driven by the researcher's own curiosity. The researcher chooses the problem, defines it, redesigns it as the inquiry proceeds, and aims to add to a body of knowledge. Most academic research is conclusion-oriented.

**Decision-oriented research** is driven by the decision-maker's need for information to support a specific decision. The researcher is not free to redefine the problem; the problem is given. The research must conclude in time for the decision and address the decision-maker's specific question.

A PhD thesis is conclusion-oriented. A consulting study for the Nepal Telecommunications Authority on whether to license a particular new spectrum band is decision-oriented.

### Theoretical vs action research

**Theoretical research** seeks general principles, models, and laws. Action research seeks immediate improvement of a specific practical situation. Action research originated in social work and education; it has parallels in software engineering through approaches like **design science research** where the researcher builds and evaluates artefacts in their working context.

A theoretical study might prove that a particular access-control formalism is decidable. An action-research project might iteratively redesign the access-control configuration of Tribhuvan University's student portal in collaboration with the IT team, measuring at each iteration.

### Longitudinal vs cross-sectional research

**Longitudinal research** follows the same subjects over time. It can observe change, capture causal sequences, and study development. The classic Framingham Heart Study (started 1948) is longitudinal. In cybersecurity, longitudinal studies follow the same set of systems, users, or organisations over months or years.

**Cross-sectional research** measures many subjects at a single point in time. It can describe a population's current state and compare subgroups. The Nepal Living Standards Survey done by CBS every five years is cross-sectional within each round (and longitudinal across rounds).

A longitudinal study of a small cohort of eSewa users' transaction patterns over two years would reveal both individual change and aggregate trends. A cross-sectional snapshot of all eSewa users at one point in time would reveal the present distribution but not the dynamics.

### Summary table

| Pair | Distinguishing question |
|---|---|
| Quantitative / Qualitative | Numbers or words as primary data? |
| Fundamental / Applied | Aimed at understanding or at solving a specific problem? |
| Descriptive / Analytical | Describes what is, or explains why? |
| Conceptual / Empirical | Pure thought, or data from the world? |
| Diagnostic / Hypothesis-testing | Finding causes, or testing a stated claim? |
| Conclusion-oriented / Decision-oriented | Researcher's curiosity, or decision-maker's need? |
| Theoretical / Action | General principles, or improvement of a specific situation? |
| Longitudinal / Cross-sectional | Same subjects over time, or many subjects at one time? |

A real project usually inhabits a combination of cells. An MSc thesis on machine-learning-based fraud detection at a Nepali bank might be quantitative, applied, both descriptive and analytical, empirical, hypothesis-testing, conclusion-oriented (the researcher's PhD-track concerns), theoretical-and-action (a published contribution plus a working system), and cross-sectional (data drawn from one period).

## 1.3 Research question, problem, objective, hypothesis

Four interlocking concepts that anchor a research project. Confusing them is the most common cause of weak thesis proposals.

### Research problem

*A research problem is the specific issue, gap, contradiction, or unanswered question in the field that the research will address, stated at a level of generality that is clear, important, and actionable.*

The problem is the "why" of the research. It identifies what is missing and what would be valuable to fix.

**Characteristics of a good research problem:**

- **Significant.** Solving it would matter to someone — the research community, an industry, the public.
- **Specific enough to be tractable.** A problem of unlimited scope cannot be solved in a finite project.
- **Original.** Not already solved (or, if previously addressed, the previous solutions have known limitations the research will overcome).
- **Feasible.** The data, methods, time, and resources to address it are available.

**Examples.**

Bad (too broad): "Cybersecurity in Nepal is inadequate."

Good (specific, significant): "Domain-validated TLS certificates issued for `.gov.np` domains have repeatedly been associated with misconfigurations that downgrade actual transport security — short key lengths, missing intermediate certificates, mixed-content pages — yet no comprehensive measurement of the `.gov.np` HTTPS estate has been published, leaving sector regulators and the National Information Technology Centre without an evidence base for remediation prioritisation."

The good version names the topic, names the gap, names who would benefit from filling it, and is bounded enough to be addressable in a thesis-scale project.

### Research question

*A research question is the specific question the research will answer, derived from the research problem and formulated precisely enough that the data collected will yield a clear yes/no or quantitative answer.*

Where the problem is the "why," the question is the "what we will find out."

**Examples derived from the problem above:**

- RQ1: What fraction of `.gov.np` domains support HTTPS with valid, browser-trusted certificates as of December 2026?
- RQ2: Of those that support HTTPS, what is the distribution of TLS protocol versions, cipher suites, and certificate-authority issuers?
- RQ3: What classes of misconfiguration are most prevalent, and which agencies are most affected?

Each question is answerable. Each will produce specific facts. Together they address the broader problem.

### Research objective

*A research objective is a precise statement of what the research will accomplish, written as an action-oriented goal, distinguishing what the researcher will do from what the research will find.*

Objectives are typically written with verbs in infinitive form: "to measure," "to develop," "to evaluate," "to compare," "to characterise."

**Examples for the same project:**

**General objective.** To produce an evidence-based characterisation of the HTTPS deployment quality across Nepali government domains and identify priority remediation areas.

**Specific objectives.**
1. To enumerate the active `.gov.np` domain space as of the study period.
2. To probe each domain for HTTPS support, TLS version, cipher suites, and certificate properties.
3. To classify the observed configurations against an industry-standard rubric.
4. To analyse the distribution of misconfigurations across ministry, agency size, and hosting environment.
5. To produce a prioritised set of recommendations for the National Information Technology Centre and the Office of the Controller of Certification.

The general objective summarises the project; the specific objectives form the work plan.

### Research hypothesis

*A research hypothesis is a tentative, testable, and falsifiable statement about an expected relationship between variables, formulated before data collection so that the analysis can either support or contradict it.*

Hypotheses make claims that the research could prove wrong. A hypothesis that cannot conceivably be falsified is not a scientific hypothesis.

**Null and alternative hypotheses.** In statistical testing (Chapter 5), the framework pits a null hypothesis $H_0$ (typically "no effect," "no difference") against an alternative hypothesis $H_1$ (the effect the researcher believes exists). The analysis decides whether the data give enough evidence to reject $H_0$ in favour of $H_1$.

**Example hypothesis pair for the HTTPS study:**

- $H_0$: The fraction of `.gov.np` domains supporting valid HTTPS in 2026 is no different from the fraction in 2022 (no improvement).
- $H_1$: The fraction has improved significantly between 2022 and 2026.

**Example for an experimental study comparing two intrusion-detection models:**

- $H_0$: Model A and Model B have equal F1-score on the test corpus.
- $H_1$: Model A and Model B have different F1-scores.

The statistical test produces a $p$-value. Compared against a chosen significance level $\alpha$ (typically 0.05), the $p$-value either justifies rejecting $H_0$ or not. Chapter 5 covers this in detail.

### Characteristics of a good hypothesis

A well-constructed hypothesis is:

- **Specific.** Names the variables involved.
- **Testable.** Predicts something the data can refute.
- **Limited in scope.** Does not try to explain everything.
- **Stated in clear terms.** Free of jargon and ambiguity.
- **Consistent with known facts.** Builds on prior literature rather than contradicting well-established results without strong reason.
- **Directional or non-directional, as appropriate.** Directional: "Model A outperforms Model B." Non-directional: "Model A and Model B differ." The choice depends on prior expectation.

### Linking the four

| Concept | Asks |
|---|---|
| Research problem | What is the gap that matters? |
| Research question | What specifically will the research find out? |
| Research objective | What will the researcher do to find out? |
| Research hypothesis | What is the tentative answer the research will test? |

A coherent proposal makes all four visible and aligned. The problem motivates the question. The question is restated as an objective. The objective is operationalised through hypotheses. The data collection answers the hypotheses, which answer the question, which addresses the problem.

A thesis examination panel typically tests this chain. Weak alignment — for instance, a sweeping problem statement, narrow questions, vague objectives, no clear hypotheses — is the most common reason for rework.

## 1.4 Designing research work

Once the problem, question, objective, and hypothesis are clear, the project must be designed. The **research design** is the blueprint connecting the questions to the methods that will answer them.

### Research design

*A research design is the structured plan for a research project that specifies what data will be collected, from whom, using what methods, analysed how, on what timeline, and against what evaluation criteria, prepared before data collection begins to ensure the project's findings will be valid and defensible.*

A good design is the difference between a project that delivers credible answers and one that produces data nobody can interpret. The design is the most important deliverable of the proposal stage.

### Principles of designing research

Several principles cut across all research design.

**Match the design to the question.** Different questions need different methods. A descriptive question ("what is the state of TLS deployment in Nepal?") calls for a survey or scan. A causal question ("does this intervention reduce phishing victimisation?") calls for an experiment or quasi-experiment. A theoretical question ("is this protocol secure under a specific adversary model?") calls for proof. Choosing a method that does not match the question wastes effort.

**Plan the analysis at design time.** If the analysis cannot be specified before data collection, the data collection probably will not support it. The standard discipline: write the dummy analysis tables (what plot, what test, what number) into the design document. If you cannot draw the empty plot in advance, the design is incomplete.

**Anticipate validity threats.** Every design has weaknesses; the question is whether they are anticipated and managed. The four classical validity threats:
- **Internal validity** — could something other than the cause being studied explain the result?
- **External validity** — do the results generalise beyond the studied sample to the population of interest?
- **Construct validity** — does the measurement actually capture the concept it claims to?
- **Statistical conclusion validity** — is the statistical analysis correct and adequately powered?

**Build in pilot studies.** A small pilot run reveals problems with measurement instruments, recruitment, or analysis before they become irreversible.

**Document the design.** A design that lives only in the researcher's head cannot be reviewed, replicated, or shared. Write it down. Pre-registration of the design — depositing a time-stamped record of the planned methods before data collection — is increasingly common in cybersecurity research as a defence against post-hoc rationalisation.

**Plan for the unexpected.** Real projects encounter delays, missing data, withdrawn participants, broken instruments. Build slack into the schedule and have a fallback for each major risk.

### Conceptual framework

*A conceptual framework is the system of concepts, variables, and presumed relationships that the research is built around, derived from existing theory and prior work, providing the lens through which the data will be interpreted.*

The conceptual framework is the theory side of the research design. It names the concepts, defines them, and states how they are believed to relate. The framework guides what data to collect (only the variables in the framework matter), how to analyse it (analyses correspond to the proposed relationships), and how to interpret the results (results are read through the framework's categories).

A simple conceptual framework for a study of password practices might involve:
- **Independent variables.** User's awareness, organisational policy strength, technical enforcement.
- **Dependent variables.** Observed password strength, observed password reuse.
- **Moderating variables.** Years of experience, role.
- **Hypothesised relationships.** Stronger awareness predicts stronger passwords; stronger enforcement predicts less reuse; the awareness effect is moderated by experience.

The framework is often presented as a diagram with boxes for variables and arrows for hypothesised relationships. The arrows specify the model to be tested.

### Operationalising the conceptual framework

Concepts are abstract. **Operationalisation** turns them into things that can be measured.

The concept "password strength" might be operationalised as: zxcvbn score on a scale of 0 to 4, computed by Dropbox's open-source zxcvbn library. The operational definition makes the measurement reproducible. Two researchers given the same passwords would compute the same scores.

The concept "user awareness" might be operationalised as: a five-item scale of agreement with statements about cybersecurity practices, summed to a 5-25 score, with the scale's reliability checked by Cronbach's alpha.

Operationalisation has costs. Reducing "awareness" to a 5-item scale loses information; the operational definition may miss aspects of awareness the scale does not capture. The trade-off is between measurability and richness — measurable things are testable; rich things may be more meaningful but harder to compare across studies.

### Engineering research design

Engineering research has some specific design patterns.

**The measurement study.** Measure a system at scale. Internet measurement (CAIDA-style), network telemetry, vulnerability scanning across the IPv4 space, certificate-transparency-log analyses. Design: choose the population, choose the sampling strategy, choose the measurement instrument, define the metrics. Examples in Nepali context: scans of `.com.np` and `.gov.np` TLS configuration; longitudinal studies of mobile-banking application updates and their security characteristics.

**The benchmarking study.** Compare systems on a common workload. Database performance, cryptographic library throughput, ML model accuracy. Design: choose the workload, choose the systems, define the metrics, control for confounding (same hardware, same environment, repeated trials).

**The design-and-evaluate study.** Build a new artefact (algorithm, protocol, tool) and evaluate it. The most common MSc thesis pattern in engineering. Design: state the artefact's design goals, build it, identify baselines for comparison, design the evaluation, run it.

**The simulation study.** Use a simulator to study a system that would be impractical to study in the real world (large network topologies, attacks against critical infrastructure, scenarios that cannot ethically be run). Design: choose or build a simulator, validate it against known cases, run experiments, report.

**The case study.** Detailed examination of a specific instance. Often qualitative or mixed-methods. Useful for organisational research, security-program effectiveness, incident analysis. The 2024 Government Integrated Data Centre DDoS incident, if studied in depth, would be a case study.

**The formal-methods study.** Prove properties of a system or specification. Common in cryptography, programming-language theory, distributed systems. Design: state the formal model, state the property, choose the proof technique, produce the proof.

Many real engineering projects combine patterns. A new IDS-architecture thesis would have a design-and-evaluate spine, possibly with a measurement study to characterise the workload, a benchmarking study to compare against alternatives, and a simulation study for scenarios too dangerous to run on production networks.

### Components of a written research design

A typical research-design document for an MSc-thesis proposal at IOE Pulchowk covers:

1. **Background and motivation.** Why this problem matters.
2. **Problem statement and research questions.** What will be answered.
3. **Objectives.** What the research will do.
4. **Hypotheses.** What the research expects to find.
5. **Literature review.** What is already known; the gap being addressed.
6. **Conceptual framework.** Variables and presumed relationships.
7. **Methodology.** Methods, sample, instruments, procedures.
8. **Data analysis plan.** Statistical or analytical techniques to be used.
9. **Validity and limitations.** Known threats and their management.
10. **Schedule.** Gantt chart or work plan; resource needs.
11. **Ethical considerations.** Subject protection, consent, conflict of interest.
12. **Expected contribution.** What the research will add to the field.

The proposal is reviewed by the thesis committee before data collection begins. A weak proposal blocks the project; a strong proposal lets it run with confidence.

### Common design mistakes

Several failure modes recur in MSc-thesis proposals:

**Vague objectives.** "To study cybersecurity in Nepal." Cannot fail because it cannot succeed in any specific way.

**Unfalsifiable hypotheses.** "Cybersecurity is important." No experiment could contradict this.

**Mismatched method.** Proposing to use survey research to answer a causal question; or proposing to use a simulation to characterise a real-world phenomenon that has not been measured.

**Missing baselines.** Proposing a new method without specifying what existing methods it will be compared against.

**Underspecified analysis.** "Data will be analysed statistically" — no specifics, no test, no power calculation.

**Unaddressed ethics.** Studies involving human subjects (phishing experiments, security-perception interviews) require Institutional Review Board approval and informed consent; designs that omit this fail review.

**Schedule that allows no failure.** A thesis schedule packed wall-to-wall with no slack will overrun the moment any single step is delayed.

**No mention of generalisability.** A study of one organisation tells us about that organisation. Whether it tells us about other organisations depends on how the design supports generalisation.

The bridge from this chapter to the rest of the subject is direct. Chapter 2 covers the standard phases of an engineering research project — including the literature study, theoretical modelling, experimental design, evaluation, and ethical practice that any of the design patterns above must implement.
