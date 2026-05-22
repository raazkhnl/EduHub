---
title: 'Chapter 3 — Data Collection'
sidebar_label: 'Ch 03 — Data Collection'
sidebar_position: 3
description: 'Chapter 3 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch03
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Data collection is where research design meets the world. The methods used at this stage decide what evidence the project will have to support its claims. This chapter covers the standard taxonomy of data collection methods used in research generally and in engineering research in particular — the distinction between primary and secondary data, the major techniques for collecting each, the strengths and weaknesses of each technique, and how to decide which to use. The Kothari textbook is the standard reference behind this material; the chapter follows that structure while updating examples for the contemporary Nepali engineering-research context.

## 3.1 Collection of primary data

### Primary vs secondary data

*Primary data is data collected directly by the researcher for the specific research project at hand, gathered firsthand from original sources through measurement, observation, interview, questionnaire, or experiment.*

*Secondary data is data that was collected by someone else for some other purpose, available to the researcher through published sources, databases, archives, or shared repositories.*

The distinction is about *origin*, not about quality. A well-collected secondary dataset can be higher quality than a hastily-collected primary one. The relevant questions are: does the data answer the research question, was it collected with sufficient care, and is it documented enough to be trusted?

### When primary data is necessary

Primary data is needed when:

- No existing data answers the research question.
- Existing data is too old, too aggregated, or too narrow.
- Existing data is not available in Nepal or for the Nepali population.
- The research requires specific measurements that no one else has made.
- The research is exploratory and the variables to measure are still being defined.

An MSc thesis on the cybersecurity awareness of bank employees in Pokhara cannot use foreign survey data — the population is specific to the local context. Primary data collection is necessary.

A thesis on the performance of a new cryptographic protocol can use synthetic data (which is primary, generated for the experiment) but does not need human-subject data collection. The primary data is the protocol's behaviour under test.

### Categories of primary data collection

Three broad categories, with overlapping techniques:

**Observation.** The researcher watches and records what happens. No interaction with subjects. Section 3.2.

**Interaction with subjects.** The researcher asks questions through interviews, questionnaires, or schedules. Sections 3.3-3.5.

**Measurement.** The researcher uses instruments to capture physical, digital, or behavioural data. Section 3.7 covers some specific techniques.

Engineering research uses all three. A thesis on intrusion detection might combine measurement (instrumenting the network) with interviews (talking to security analysts about how they use the detection output).

### Quality criteria for primary data

The same criteria apply across methods:

**Validity.** Does the data actually measure what it claims to? A question about "trust in the bank's app" must capture what subjects mean by trust, not something else.

**Reliability.** Would the same measurement, repeated, give the same result? An unreliable instrument produces noise that obscures real effects.

**Representativeness.** Does the sample reflect the population the research is about? A study of 20 students at Pulchowk Campus cannot generalise to all Nepali engineering students without further argument.

**Completeness.** Is the data complete enough to support the planned analysis? Missing data has to be either explained or handled.

**Timeliness.** Is the data recent enough to address the question? Cybersecurity research about Nepal in 2019 may not describe the 2026 situation.

Each method in the rest of the chapter must satisfy these criteria within its own constraints.

## 3.2 Observation method

*The observation method is a primary-data collection technique in which the researcher systematically watches and records phenomena as they occur in their natural or controlled setting, without (in the pure form) intervening or interacting with the subjects being observed.*

Observation is the oldest data-collection method. A naturalist watching birds is doing observation. So is a network engineer running `tcpdump` on a router.

### Types of observation

**Structured vs unstructured observation.**

- *Structured.* The researcher knows in advance what to look for and uses a prepared instrument (checklist, coding sheet, predefined categories). Used when the phenomenon is well understood and the research aims to count or compare specific events.
- *Unstructured.* The researcher records what seems relevant without a predefined frame. Used in early-stage exploratory research where the categories are still being discovered.

**Participant vs non-participant observation.**

- *Participant.* The researcher takes part in the activity being observed. Used in ethnography, organisational research. The observer's presence affects what is observed.
- *Non-participant.* The researcher watches without participating. Less reactive but may miss what only an insider would see.

**Controlled vs uncontrolled observation.**

- *Controlled.* Observation in a deliberately structured environment (laboratory, controlled experiment). High internal validity but possibly lower external validity.
- *Uncontrolled.* Observation in the natural setting. Higher external validity but more confounding.

**Direct vs indirect observation.**

- *Direct.* The researcher observes the phenomenon as it happens.
- *Indirect.* The researcher observes traces of the phenomenon — logs, artefacts, residual evidence. Network traffic captures, system logs, browser histories are indirect observation.

In engineering research, most observation is structured, non-participant, and often indirect. Logs and instrument data substitute for direct watching.

### Steps in conducting observation

1. **Define what is to be observed.** Specific behaviours, events, conditions. The conceptual framework from Chapter 1 provides the categories.
2. **Choose the setting.** Lab, field, or instrumented production system.
3. **Decide on the recording instrument.** Coding sheet, video recording, automated logger, network sensor.
4. **Train observers.** If multiple observers, calibrate them to ensure consistent coding.
5. **Conduct the observation.** Pilot first; run the full study; manage instruments and storage.
6. **Verify the data.** Inter-rater reliability for human-coded data. Sanity checks for automated logs.

### Strengths of observation

- **Captures actual behaviour.** What people do, not what they say they do. The gap between the two — between behavioural intention and behavioural reality — is often the point of the research.
- **Suitable for non-verbal phenomena.** System performance, network traffic, error rates — phenomena that subjects cannot accurately report.
- **Less obtrusive in indirect form.** Log analysis does not change user behaviour the way an interview might.
- **Continuous and high-volume.** Automated instruments can collect data 24/7 without human attention.

### Weaknesses of observation

- **Cannot directly observe intentions, beliefs, or feelings.** A user who clicks "delete" may be expressing many different intentions; observation alone cannot tell which.
- **Observer effects.** When subjects know they are being observed, they may modify their behaviour (the Hawthorne effect, well-documented in human-factors research).
- **Coding errors.** Even with training, human observers vary. Inter-rater reliability is rarely perfect.
- **Sampling limits.** A study cannot observe everything; choices of what to observe and when shape what the data shows.
- **Ethical and legal constraints.** Surveillance of subjects without consent is unethical in most contexts and illegal in many. Observing public network traffic is generally acceptable; observing user keystrokes is not without consent.

### Observation in engineering research

A few common patterns:

**Instrumented systems.** Add instrumentation to a production system to log specific events. Network telemetry, application performance monitoring, security audit logs. The data accumulates passively while the system runs.

**Honeypots.** Decoy systems designed to attract attackers. Observe what they do. The Honeynet Project pioneered this; modern enterprise honeypot platforms (T-Pot, Modern Honey Network) provide off-the-shelf deployments.

**Network measurement.** Capture traffic at strategic points and analyse. The CAIDA tradition for the global Internet; smaller-scale at the level of a single ISP or campus.

**User studies in labs.** Watch users interact with a system. Eye-tracking, screen recording, task-completion measurement. Common in usable-security research.

**Field studies.** Observe systems in their actual operational setting. Visit a bank's SOC and observe how analysts work. Visit NEA's dispatch centre and observe the operators.

## 3.3 Interview method

*The interview method is a primary-data collection technique in which the researcher gathers information by directly asking questions of respondents in a structured, semi-structured, or unstructured conversation, conducted face-to-face, by phone, or online.*

Interviews are widely used in research that depends on subjects' perspectives, experiences, expertise, or reasoning.

### Types of interviews

**Structured interviews.** The researcher follows a prepared question schedule exactly. Every respondent gets the same questions in the same order. Used in quantitative research and surveys. Allows direct comparison across respondents.

**Semi-structured interviews.** The researcher has a prepared list of topics or questions but explores each with follow-ups depending on the respondent's answers. Used in qualitative and mixed-methods research where the goal is depth as well as comparability.

**Unstructured interviews.** The researcher has a topic but no fixed questions. The conversation flows naturally. Used in early exploratory research and in ethnography.

**Focus group interviews.** A group of respondents discusses the topic together with a moderator. Useful for surfacing shared opinions, group dynamics, and points of disagreement.

**Personal vs telephone vs online interviews.**

- *Personal (face-to-face).* Highest engagement, allows non-verbal cues, longest possible. Highest cost.
- *Telephone.* Lower cost, no travel, but no visual cues; shorter on average.
- *Online (video or text).* Increasingly common since 2020. Convenient, recorded easily, but may miss nuance.

For a Nepali MSc thesis interviewing security professionals at major banks, online video interviews are now common — cheaper than travel and acceptable to busy professionals.

### Designing the interview

The standard preparation:

1. **Define the interview's objectives.** What information is needed? What variables will the analysis use?
2. **Draft the question list.** Open-ended for depth; closed for comparison. Mix as appropriate.
3. **Order the questions.** Easy and rapport-building first; sensitive and demanding later; demographics at the end.
4. **Pilot.** Test with a few respondents who match the target. Revise unclear questions.
5. **Schedule.** Allow enough time for the actual interview plus buffer.
6. **Prepare for recording.** Audio recording with consent; backup notes.

### Skills for the interviewer

A good interviewer:

- Builds rapport — makes the respondent comfortable.
- Listens more than talks — the goal is the respondent's perspective, not the interviewer's.
- Probes with follow-up questions — "Can you say more about that?" "What did you mean by X?"
- Avoids leading questions — questions that suggest the desired answer skew responses.
- Stays neutral on the respondent's views — no agreement or disagreement that might signal expected answers.
- Manages time — covers the planned topics without overrunning.
- Handles silence — sometimes a pause prompts the respondent to elaborate.

These are skills. They develop with practice; the first few interviews of a project will be worse than the later ones. Pilot interviews train the interviewer as well as the instrument.

### Strengths of interviews

- **Depth.** Respondents can explain reasoning, context, and nuance that no questionnaire would capture.
- **Flexibility.** The interviewer can adapt to the respondent's interests and knowledge.
- **High response rate.** People are more willing to talk than to fill in a questionnaire.
- **Suitable for sensitive topics.** A skilled interviewer can earn trust on topics respondents would not answer in writing.
- **Useful with non-literate respondents.** No writing needed.

### Weaknesses of interviews

- **Expensive.** Time, training, recording, transcription, analysis. A study of 30 in-depth interviews can take months.
- **Limited sample size.** No one can interview thousands. Generalisation is by inference, not statistics.
- **Interviewer effects.** The interviewer's identity, demeanour, and assumptions shape what respondents say.
- **Social desirability.** Respondents may say what they think they should say rather than what they actually think.
- **Memory and recall errors.** Respondents may misremember events the research is about.
- **Transcription burden.** Each hour of interview produces roughly 10,000 words of transcript and four hours of analysis time.

### Analysing interview data

Interview transcripts are qualitative data, analysed by:

- **Open coding.** Identify themes in the data; assign codes to text segments.
- **Axial coding.** Group related codes into broader categories.
- **Selective coding.** Identify the central themes that connect the categories.
- **Thematic analysis.** Identify recurring themes; describe their content and prevalence.
- **Constant comparison.** Compare new data to existing codes; refine the coding scheme iteratively.

Software (NVivo, ATLAS.ti, Dedoose, MAXQDA) supports the process but the analysis itself is human work.

### Interviews in engineering cybersecurity research

Common interview-based research in Nepal could cover:

- CISOs at major banks on their threat-landscape priorities.
- Forensic investigators at the Cyber Bureau on common case patterns.
- Network engineers at major ISPs on operational security challenges.
- Government IT managers on adoption barriers for security standards.
- Users (individuals or small businesses) on their cybersecurity practices and reasoning.

Each requires careful design, ethical approval, informed consent, and confidentiality. The respondents typically share information sensitive to their employers; the consent and confidentiality terms must protect them.

## 3.4 Collection of data through questionnaires

*A questionnaire is a standardised data-collection instrument consisting of a sequence of written questions sent to respondents, who answer in writing and return the completed instrument without face-to-face contact with the researcher.*

Questionnaires are the standard tool for surveying large populations efficiently. They produce structured data suitable for statistical analysis.

### How questionnaires work

A typical questionnaire-based study:

1. The researcher designs the questionnaire.
2. The questionnaire is distributed to respondents — by mail, email, online survey platform (Google Forms, SurveyMonkey, Qualtrics), or paper hand-out.
3. Respondents complete the questionnaire on their own time.
4. Completed questionnaires are returned to the researcher.
5. Responses are coded, entered into a database, and analysed.

The researcher is absent during completion. This is the defining feature, with implications for both strengths and weaknesses.

### Designing questionnaires

The principles:

**Each question should ask one thing.** Avoid double-barrelled questions ("Do you trust the bank's app and recommend it to others?"). Split into two questions.

**Use clear, simple language.** No jargon, no unfamiliar terms, no ambiguous phrasings.

**Avoid leading or loaded questions.** "Don't you agree that..." pushes for agreement. Neutral phrasings are essential.

**Use appropriate response formats.**
- *Closed (multiple choice).* Fixed options. Easier to analyse but constrain responses.
- *Likert scale.* Strongly disagree to strongly agree on a 5- or 7-point scale. Standard for attitudes.
- *Open-ended.* Free text. Rich but hard to analyse at scale.
- *Ranking.* Order items by importance or preference.
- *Rating.* Score on a numerical scale.

**Order matters.** Easy and non-sensitive first. Sensitive (income, beliefs) toward the end. Demographics often at the end or beginning depending on context.

**Length matters.** A 5-minute survey gets higher response rates than a 30-minute one. Cut anything not essential.

**Pilot the instrument.** Test with a few respondents. Revise unclear questions. Repeat.

### Question types

**Demographic questions.** Age, gender, education, region, occupation. Provide context for analysis.

**Behaviour questions.** What do you do? How often? When?

**Attitude questions.** What do you think about X? How important is Y?

**Knowledge questions.** Test what respondents know. Useful in awareness studies.

**Preference questions.** What would you prefer? Rank these options.

**Open-ended questions.** Tell us in your own words what you think about X.

A good questionnaire mixes types as appropriate to the research question.

### Strengths of questionnaires

- **Scale.** Can reach hundreds or thousands of respondents at low marginal cost per respondent.
- **Standardised.** Every respondent answers the same questions; comparison is direct.
- **Anonymity.** Anonymous questionnaires get more honest answers on sensitive topics.
- **Convenience for respondents.** They answer when convenient; no scheduling.
- **Cheap.** Online surveys cost almost nothing per response.
- **Suitable for quantitative analysis.** Structured responses go directly into statistical analysis.

### Weaknesses of questionnaires

- **Low response rates.** Especially for unsolicited online surveys. Response rates below 20% are common, raising non-response bias concerns.
- **Self-selection bias.** Who responds may differ systematically from who does not.
- **No follow-up.** Cannot probe vague answers or ask follow-up questions.
- **Misinterpretation.** Respondents may misread questions; the researcher cannot intervene.
- **Limited depth.** Cannot capture nuanced or contextual answers the way interviews can.
- **Requires literacy.** Cannot be used with respondents who cannot read.
- **Honesty assumptions.** Self-reported data may differ from actual behaviour.

### Online survey tools

The standard tools as of 2026:

- **Google Forms.** Free, easy, widely used in Nepal.
- **SurveyMonkey.** Commercial, with more analytics.
- **Qualtrics.** Enterprise-grade, common in universities.
- **Microsoft Forms.** Bundled with Microsoft 365 subscriptions.
- **LimeSurvey, KoBoToolbox.** Open-source. KoBoToolbox is popular in NGO and development research in Nepal.

Online distribution allows social-media sharing, email lists, and embedding in web pages. The downside is that respondents may be unrepresentative of the population — limited to those with Internet access and the inclination to respond to a survey.

### Response rates and non-response bias

Even a well-designed survey may face response rate concerns. Standard ways to mitigate:

- Pre-notify respondents that the survey is coming.
- Use authoritative sources for the invitation.
- Keep the survey short.
- Send reminders.
- Offer incentives where ethically appropriate.
- Use multiple modes (online + paper, where feasible).

The serious concern is **non-response bias** — when those who respond differ systematically from those who do not. A cybersecurity-practices survey to which only security-aware professionals respond gives a skewed picture of the population.

### Questionnaires in engineering research

In a Nepali context, questionnaires are common for:

- User studies of mobile-banking app usability.
- Organisational surveys of cybersecurity-policy adoption.
- Awareness studies of phishing recognition.
- Adoption studies of new technologies.
- Need-assessment studies for capacity-building initiatives.

The combination of low cost and large scale makes questionnaires the workhorse of survey research.

## 3.5 Collection of data through schedules

*A schedule is a structured data-collection instrument similar to a questionnaire in content, but administered by an enumerator (an interviewer) who reads the questions to the respondent and records the responses, used when respondents cannot or would not complete a written questionnaire on their own.*

The schedule is sometimes confused with the questionnaire. Both are structured instruments. The difference is who fills them in.

### How schedules work

A typical schedule-based study:

1. The researcher prepares the schedule (the instrument).
2. Enumerators are trained on the schedule and the procedures.
3. Enumerators visit or call respondents.
4. The enumerator reads each question and records the response.
5. The completed schedules are returned to the researcher for coding and analysis.

In Nepal, schedule-based data collection is common in:
- The Population Census conducted by the Central Bureau of Statistics.
- The Nepal Living Standards Survey.
- The Nepal Demographic and Health Survey.
- Many development-sector surveys (NGOs, UN agencies, multilateral donors).

For an engineering thesis, schedules might be used to survey respondents in rural areas, respondents who do not have email or smartphones, or respondents who require a translator (between Nepali, English, and local languages).

### Strengths of schedules

- **Higher response rate.** A trained enumerator visiting in person typically gets more responses than a self-completed questionnaire.
- **Usable with non-literate respondents.** The enumerator reads the questions.
- **Reduced misinterpretation.** The enumerator can explain unclear questions.
- **Better data quality.** Trained enumerators check for completeness; the researcher does not receive blanks and inconsistencies.
- **Permits observation.** The enumerator can note observations beyond what the schedule asks.
- **Useful for marginalised populations.** Reaches respondents that an online survey would miss.

### Weaknesses of schedules

- **Expensive.** Training, travel, time-per-respondent are all high.
- **Slow.** Personal-administration cannot match the volume of online distribution.
- **Enumerator effects.** Different enumerators may elicit different answers from the same respondent. Inter-enumerator reliability must be monitored.
- **Interviewer-respondent dynamics.** Respondents may give socially desirable answers in the presence of an interviewer; anonymity is lost.
- **Logistical complexity.** Coordinating enumerators in the field is hard.
- **Quality control challenges.** Enumerators may take shortcuts (filling in answers without asking, skipping difficult respondents).

### Schedule design

Schedule design has all the standard questionnaire concerns plus the additional discipline of writing for spoken delivery:

- Questions must be easy to read aloud.
- Response categories must be easy to communicate verbally.
- Instructions for the enumerator (skip patterns, probes) must be clearly marked.
- Cultural and linguistic appropriateness matters — schedules in Nepali for Nepali respondents, with translation done by qualified translators and back-translated to verify accuracy.

The training of enumerators is at least as important as the instrument's design. A poorly-trained team produces worse data than a poorly-designed instrument with a well-trained team.

## 3.6 Differences between questionnaires and schedules

Both instruments aim at structured data collection. The differences matter for choice and for execution.

| Aspect | Questionnaire | Schedule |
|---|---|---|
| Filled by | Respondent | Enumerator |
| Presence of researcher | No (asynchronous) | Yes (synchronous) |
| Cost per response | Low | High |
| Response rate | Usually lower | Usually higher |
| Suitable for non-literate respondents | No | Yes |
| Allows probing follow-ups | No | Limited (enumerator can clarify but typically doesn't probe) |
| Anonymity | Possible (especially online) | Limited (the enumerator knows the respondent) |
| Sample reach | Wherever the questionnaire can be distributed | Limited to where enumerators can go |
| Data-quality control | Depends on respondent | Enumerator can check completeness |
| Speed of completion | Fast (parallel respondents) | Slow (enumerator-bound) |
| Standardisation | Strong (everyone reads the same words) | Depends on enumerator training |
| Useful for sensitive topics | Yes (anonymous self-report) | Limited (interviewer presence) |
| Documentation needed | Clear written instructions for respondents | Detailed enumerator guide and training |

### When to use which

**Use a questionnaire when:**
- Respondents are literate, accessible, and willing to self-complete.
- A large sample is needed at low cost.
- Sensitive topics require anonymity.
- Online distribution is feasible.

**Use a schedule when:**
- Respondents are non-literate or have limited literacy.
- Response rates must be high.
- The research is in remote areas without Internet.
- Trained enumerators are available and can be deployed.
- The data quality justifies the cost.

For a Nepali MSc thesis, the choice often comes down to whether the target population can be reached online (most urban professionals) or requires fieldwork (older respondents, rural respondents, certain demographic groups).

## 3.7 Other methods of data collection

Beyond observation, interview, questionnaire, and schedule, several specialised methods serve specific purposes.

### Warranty cards and consumer feedback

Used in product research. A purchaser of a product registers a warranty by filling in a card; the card includes research questions. Limited research use in engineering but a long tradition in market research.

### Distributor and store audits

The researcher audits the inventory or sales of a distributor or store at intervals to track changes. Useful in market research on consumer products. Less common in engineering.

### Pantry audits

The researcher visits a household and inventories what is present. Used in consumption research. Rare in engineering.

### Consumer panels

A standing group of respondents who provide data over time. Useful for longitudinal research without re-recruiting respondents for each wave. The Nielsen consumer panels are the classic example.

### Use of mechanical devices

A broad category that includes:

**Sensor measurement.** Physiological sensors, environmental sensors, network sensors, building-management-system sensors. The data is the device's output. Used heavily in engineering and biomedical research.

**Eye-tracking.** Eye-tracking devices record where subjects look on a screen. Used in usability research and in attention studies.

**EEG and other neural measurement.** Brain-activity sensors. Used in human-computer interaction research at higher resource levels.

**Galvanic skin response, heart rate variability.** Physiological indicators of arousal. Used in stress, attention, and emotion research.

**Logging instruments.** Software loggers that record user actions, system events, network activity. Common in cybersecurity research.

For an MSc thesis at IOE Pulchowk, sensor and software logging are the dominant "mechanical" data sources. Eye-tracking and physiological measurement are rarer because of equipment cost and IRB complexity.

### Projective techniques

Subjects respond to ambiguous stimuli (ink blots, sentence completions, drawing tasks); the responses reveal underlying attitudes or beliefs that direct questions might not. Rorschach test is the classic example. Rare in engineering research.

### Depth interviews

Long, intensive interviews (often two hours or more) probing a single topic in detail. Different from regular interviews mainly in depth.

### Content analysis

*Content analysis is the systematic technique for studying communication content — text, audio, video, social media — by categorising and counting features according to predefined rules, producing quantitative measurements of qualitative material.*

The researcher defines categories, applies them systematically to the content, and analyses the resulting counts. Used in:

- Studies of social-media discourse.
- Analysis of phishing email patterns.
- Coding of breach notifications across years.
- Analysis of policy documents.
- Studies of how cybersecurity is portrayed in news media.

A 2024-25 content analysis of Nepali news coverage of the Government Integrated Data Centre DDoS, the Ministry of Education breach, and the Nepal Police database leak — categorising coverage by accuracy, depth, and framing — would be a methodologically clean content analysis project.

### Web scraping and digital trace data

In the 2020s, much primary data collection happens through automated capture of digital traces:

- Scraping public web data (with attention to terms of service and ethics).
- API-based collection from platforms (Twitter/X, Reddit, GitHub).
- Public-records collection from government portals.
- Crawls of specific domains.

Common applications:
- Studies of misinformation spread.
- Vulnerability disclosure analysis from CVE databases and security advisories.
- Software-supply-chain studies from package repositories.
- Phishing-URL collection from PhishTank or similar repositories.
- Certificate-transparency-log analysis.

The methods overlap with secondary data collection (the data exists; the researcher is gathering it). The boundary is fuzzy. The ethical and legal considerations are real — scraping must respect terms of service, robots.txt, rate limits, and privacy.

## 3.8 Collection of secondary data

*Secondary data collection is the process of identifying, accessing, and using data that was originally collected by others for purposes other than the current research, typically through published sources, online databases, government portals, repositories, or other organisations' records.*

Secondary data is often the most efficient way to address questions where suitable data already exists. The work shifts from data collection to data discovery, validation, and integration.

### Sources of secondary data

**Government statistics.** Often the largest and most-cited secondary data. In Nepal:

- **Central Bureau of Statistics (CBS).** National statistics on population, economy, agriculture, industry. The Population Census, Nepal Living Standards Survey, National Economic Census, Nepal Demographic and Health Survey. Data downloads available from the CBS website.
- **Nepal Rastra Bank (NRB).** Banking, financial, and macroeconomic data. Periodic publications, Banking and Financial Statistics, Economic Bulletins.
- **Nepal Telecommunications Authority (NTA).** Telecom statistics — subscriber numbers, market share, performance metrics, regulatory filings.
- **Department of Hydrology and Meteorology (DHM).** Weather, climate, hydrology data.
- **Ministry of Energy, Water Resources and Irrigation, Department of Electricity Development, Nepal Electricity Authority.** Electricity sector data.
- **Cyber Bureau, npCERT.** Incident data, advisories.

**International databases.**

- **World Bank Open Data.** Country-level economic and development indicators.
- **IMF data.** Macroeconomic.
- **UN datasets.** SDG indicators, demographic data, country profiles.
- **ITU (International Telecommunication Union).** Telecom and ICT data.
- **OECD.** Economic and policy data.

**Academic and research datasets.**

- **CVE database (cve.mitre.org).** Vulnerability data.
- **NVD (National Vulnerability Database).** Detailed vulnerability data.
- **VirusTotal.** Malware samples and analysis (with API access).
- **Various security datasets:** CIC-IDS, NSL-KDD, MIRAI traffic captures, Microsoft Malware Classification Challenge data.
- **Networking measurement datasets:** CAIDA, MIT KIT measurement, RIPE Atlas data.
- **NLP datasets:** Common Crawl, Wikipedia dumps, Reddit corpus, paper repositories.
- **Image datasets:** ImageNet, MS-COCO, Open Images.

**Industry reports and white papers.**

- Mandiant M-Trends annual reports.
- Verizon Data Breach Investigations Report (DBIR).
- Cloudflare DDoS Trends reports.
- Microsoft Security Intelligence reports.
- Akamai State of the Internet reports.

**Published academic papers and their datasets.** Where authors share data with their papers, those datasets are secondary sources for derivative research.

**Archives.** Newspaper archives, historical records, court records (where public). Useful in social and policy research.

### Evaluating secondary data

Secondary data has known unknowns. Before using it:

**Source credibility.** Who collected it? With what motive? Is the source reputable?

**Methodology.** How was the data collected? Methodology documents (often called "metadata" or "data dictionaries") describe sampling, instruments, and procedures.

**Currency.** When was the data collected? Is it still relevant to the research question?

**Coverage.** Does it cover the population, geography, and time period needed?

**Granularity.** Does it have enough detail? Aggregate data may not support the planned analysis.

**Definitions.** Are the variables defined the same way the research needs them?

**Quality controls.** What checks were applied? What is the reported error rate?

**Access conditions.** Is the data freely available? Is there a licence? Is registration required? Are there fees?

**Privacy and confidentiality.** Does the data include personal information that the original collectors agreed to protect?

Treating secondary data as if it were perfect is a frequent error. The data was collected by someone else for someone else's purpose. Their decisions about what to measure, how to measure it, what to keep, and what to publish all shape what the data can support.

### Strengths of secondary data

- **Cost.** Much cheaper than primary collection. Often free.
- **Speed.** Available immediately.
- **Scale.** Can include populations far larger than primary collection could reach.
- **Historical depth.** Can span periods earlier than the research project itself.
- **Statistical authority.** Government statistics carry methodological credibility that primary collection rarely matches.
- **Comparability.** Standard datasets (like CIC-IDS or ImageNet) enable comparison with prior research.

### Weaknesses of secondary data

- **Fit.** The data was collected for someone else's purpose; it may not fit the research question precisely.
- **Quality unknown.** The researcher did not control the collection. Hidden errors and biases.
- **Variables not measured.** Important variables for the research question may not be in the dataset.
- **Definitions differ.** A variable that exists by name may not mean what the research needs.
- **Time lag.** Most published statistics are dated by months or years.
- **Aggregation.** Data may be aggregated to a level that prevents the analysis.
- **Access barriers.** Some sources require institutional affiliation, fees, or special agreements.

### Combining primary and secondary data

Many strong thesis projects combine both. The structural pattern:

- **Background and context.** Established from secondary data — published statistics about the population, market, threat landscape.
- **Specific measurements.** Collected as primary data — focused on the specific research question.
- **Comparison and triangulation.** Findings from primary data compared against published patterns from secondary sources.

A thesis on mobile-banking-app security in Nepal might use NTA mobile-subscriber data (secondary) for context, eSewa and Khalti published transaction volumes (secondary) for scale, and primary security testing of a sample of apps for the actual study. The combination strengthens the contribution.

## 3.9 Selecting the appropriate data-collection method

The choice of method depends on the research question, the population, the constraints, and the resources.

### Key decision factors

**Research question.** Different questions need different methods.

- *Descriptive questions about a population.* Survey (questionnaire or schedule).
- *Causal questions about effects of interventions.* Experiment.
- *Process-and-mechanism questions about how things work.* Interview, case study, or instrumented observation.
- *Questions about behaviour over time.* Longitudinal survey or instrumented logging.
- *Questions about rare events.* Targeted observation, case study, or analysis of accumulated logs.

**Nature of the data needed.** Numerical or narrative? Behavioural or attitudinal? Continuous or episodic?

**Accessibility of subjects or systems.** Can the researcher actually reach the data source?

**Time available.** Some methods take much longer than others.

**Budget available.** Some methods cost orders of magnitude more than others.

**Expertise of the researcher.** Methods that require special skills the team does not have are infeasible.

**Ethical constraints.** Some data simply cannot ethically be collected — even if it would answer the question.

### A decision rubric

| Need | Best methods |
|---|---|
| Large-scale attitudes or perceptions | Online questionnaire |
| Detailed expert perspectives | Semi-structured interviews |
| Actual behaviour rather than reported behaviour | Observation, logging, instrumented systems |
| Sensitive or private behaviour | Anonymous questionnaire (with appropriate safeguards) |
| Non-literate or rural respondents | Schedule with trained enumerators |
| Behaviour over time of the same subjects | Longitudinal panel; instrumented logging |
| Population-level historical patterns | Secondary data from government statistics |
| Comparison of system performance | Controlled experiment with measurement |
| Comparison of algorithms on standard tasks | Benchmark against established datasets (secondary data) |
| Rare events (breaches, attacks) | Aggregate logs, threat reports (secondary); case studies (primary) |

### Triangulation

*Triangulation is the use of multiple methods, data sources, or theoretical frameworks within a single study to cross-check findings and strengthen the credibility of conclusions, the standard discipline in mixed-methods research.*

A finding that emerges from a questionnaire is stronger if interviews and observation point the same way. A claim that a system is faster is more credible if benchmarks, user-perceived performance, and operational logs all agree.

Triangulation does not just average across methods. Each method illuminates different aspects of the phenomenon. Interview reveals reasons; observation reveals what happens; questionnaire scales to populations. Where they agree, the finding is robust. Where they disagree, the disagreement is itself information — usually pointing to a more nuanced reality than any single method showed.

### Mixed methods in engineering research

A common pattern for an MSc thesis at IOE Pulchowk:

1. **Phase 1 — Secondary data review.** Understand the landscape from published statistics and prior literature.
2. **Phase 2 — Exploratory interviews.** Interview a small number of domain experts to refine the research question.
3. **Phase 3 — Survey or measurement.** Collect primary data at scale, guided by the earlier phases.
4. **Phase 4 — Analysis.** Synthesise across the sources.

The pattern works because each phase informs the next. Secondary data identifies what is known. Interviews identify what experts believe matters. Primary collection tests those beliefs against measurement. The final analysis presents the integrated picture.

The next chapter turns to the processing and analysis of the data that this chapter's methods produce — the operations that turn raw measurements into statistical findings.
