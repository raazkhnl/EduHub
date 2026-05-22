---
title: 'Chapter 2 — Data Analytics Process'
sidebar_label: 'Ch 02 — Data Analytics Process'
sidebar_position: 2
description: 'Chapter 2 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch02
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Machine learning operates on data. Before any model is trained, the data must be collected, understood, cleaned, transformed, explored, and stored in a form the algorithms can use. This is the **data analytics process** — the workflow that surrounds modelling. It is often the largest part of a real ML project; surveys regularly find that data scientists spend 60–80% of their time on data preparation rather than on modelling. This chapter covers the standard analytics pipeline, the categories of data and attributes the pipeline handles, the preprocessing operations that bring raw data into usable form, the visualisation techniques used to explore it, the architectural patterns for handling data at scale, and the four common analytics framings — descriptive, diagnostic, predictive, prescriptive — that describe what kind of question the analytics is answering.

## 2.1 The process of data analytics

*The data analytics process is the structured sequence of steps by which raw data is transformed into actionable insight or into the input for a downstream system, typically passing through collection, cleaning, exploration, transformation, analysis or modelling, interpretation, and operationalisation.*

Several reference frameworks describe this pipeline. The most widely used in practice is **CRISP-DM** (Cross-Industry Standard Process for Data Mining, originally from 1996, still the most-cited methodology in surveys two decades later). A close relative is **KDD** (Knowledge Discovery in Databases, Fayyad 1996). Microsoft's **Team Data Science Process (TDSP)** and a number of vendor-specific frameworks add operational detail. The steps differ slightly between frameworks but the overall shape is consistent.

### The CRISP-DM phases

**1. Business understanding.** What problem is being solved and what does success look like? This is the most-skipped step in academic ML work and the most-important step in industry projects. The question being asked must be clear before any data is touched.

A clear business question: "We want to reduce fraudulent transactions at eSewa from 0.3% to 0.1% over the next quarter, while keeping false-positive lockouts below 1% of legitimate transactions." This is specific, measurable, time-bound, and ties to a real cost.

A vague business question: "We want to use ML to improve security." This goes nowhere. It cannot be evaluated; the team will deliver something and the stakeholder will say it is not what they wanted.

**2. Data understanding.** What data is available, where does it come from, what are its limits? A team building a credit-scoring model for a Nepali microfinance institution needs to know what borrower information is collected at application, what default outcomes are recorded, how complete the records are, what time period they cover, what biases are baked in (only people who already had bank accounts), what privacy and regulatory constraints apply.

**3. Data preparation.** Cleaning, transforming, structuring the data for modelling. The dominant time sink. Covered in detail in Sections 2.3 and 2.4.

**4. Modelling.** Choosing algorithms, training models, tuning hyperparameters. The subject of Chapters 3 through 7.

**5. Evaluation.** Does the model actually solve the business problem? Not just "is the accuracy high" but "does deploying this model produce the result we wanted?" A fraud-detection model with 98% accuracy can still be useless if its false positives swamp the customer-service team.

**6. Deployment.** Putting the model into production. Operational concerns — monitoring, retraining, rollback procedures, integration with the existing systems.

CRISP-DM is iterative. Findings in later phases regularly send the project back to earlier ones. Modelling reveals that an important feature is missing — back to data preparation. Deployment reveals that production data drifts from training data — back to data understanding. The arrows in CRISP-DM diagrams loop.

### A condensed view of the pipeline

For most practical purposes, the steps can be grouped:

```
Define question
    ↓
Collect data
    ↓
Clean and prepare
    ↓
Explore (descriptive statistics, visualisation)
    ↓
Engineer features
    ↓
Build model
    ↓
Evaluate
    ↓
Deploy and monitor
```

Each step has its own tools and its own failure modes. The biggest project-level failures come from skipping early steps — building a model on dirty data, or building the wrong model because the question was not pinned down.

### A worked example — credit-default prediction for a Nepali bank

To make the steps concrete, consider how the process plays out for a real project: building a credit-default prediction model for a commercial bank in Nepal.

**Define question.** "Predict whether a personal-loan applicant will default within 12 months of disbursement, where default is defined as 90+ days past due. We want this to improve underwriting decisions on roughly 5,000 loans per month, reducing the default rate from 3% to 2%."

**Collect data.** Pull all personal loans disbursed in the past 5 years from the core banking system. Each loan record includes applicant features at the time of application (age, income, employment type, existing loans, credit-bureau score from KIB or CIB, education level, marital status, geographic location), loan terms (amount, tenure, interest rate), and outcome (paid, defaulted, restructured, written off). Around 60,000 loans.

**Clean and prepare.** Discover that income data is missing for 15% of records — these were applicants under the cooperative-loan threshold where income proof was waived. Decide whether to drop these or impute. Discover that the "default" definition was changed in 2022 from 120+ days to 90+ days — reconcile. Discover that some applications have duplicate records due to system migration in 2021. Deduplicate.

**Explore.** Plot default rate by age, by income bracket, by region. Notice that default rates spike for loans disbursed in the second quarter of 2020 — the COVID-19 quarter. Either include a "disbursement period" feature or restrict the training data.

**Engineer features.** Build "debt-to-income ratio," "loan-amount-to-monthly-income ratio," "months since first banking relationship." These derived features often carry more signal than the raw fields.

**Build model.** Try logistic regression as a baseline; try gradient boosting (XGBoost or LightGBM) as a stronger alternative. Tune on a validation set.

**Evaluate.** Measure on a held-out test set drawn from the most recent year's loans. Report not just accuracy but also precision, recall, and AUC (Chapter 6). Translate model output into expected business impact — "if we had used this model to reject the highest-risk 10% of loans, we would have avoided NPR 280 million in defaults over the past year."

**Deploy and monitor.** Integrate into the underwriting workflow. Monitor incoming applications for distribution drift (the population of applicants changes over time). Retrain periodically.

Each of these steps has its own pitfalls. The remaining sections of this chapter cover the core technical operations involved.

## 2.2 Data types and attributes

Data has structure. The structure determines what operations make sense, what visualisations are appropriate, what algorithms can be applied, and what preprocessing is required.

### Categorical data types

A **categorical** attribute takes values from a finite, unordered set of categories.

**Nominal attribute.**

*A nominal attribute is a categorical attribute whose values are distinct labels with no inherent order, such that the only meaningful operation is testing equality.*

Examples:
- Province (Bagmati, Gandaki, Lumbini, Karnali, Sudurpaschim, Madhesh, Koshi). Seven distinct provinces with no natural order.
- Blood type (A, B, AB, O). Distinct, unordered.
- Transaction merchant category (food, fuel, electronics, utilities). Categories, no ordering.
- ISP (NTC, Ncell, Smart, WorldLink, Vianet). Distinct providers, no order.

Nominal data cannot be averaged, sorted by value, or compared with $<$ or $>$. Numerical codes assigned to nominal values (1 = Bagmati, 2 = Gandaki) are just labels — the arithmetic on the codes is meaningless.

**Ordinal attribute.**

*An ordinal attribute is a categorical attribute whose values have a meaningful order, but the distances between consecutive values are not necessarily equal or meaningful.*

Examples:
- Education level (no formal, primary, secondary, bachelor, master, PhD). Ordered, but "secondary to bachelor" is not the same gap as "no formal to primary."
- Customer satisfaction rating (very dissatisfied, dissatisfied, neutral, satisfied, very satisfied). Ordered but unequal-spaced.
- Loan risk grade (A, B, C, D, E). Ordered, but the actual risk difference between grades varies.
- T-shirt size (S, M, L, XL).

Ordinal data can be sorted but cannot be averaged in a strict sense. The median is meaningful; the mean is not (formally).

### Numerical data types

A **numerical** attribute takes values from a continuous or discrete range of numbers, with meaningful arithmetic.

**Interval attribute.**

*An interval attribute is a numerical attribute where differences between values are meaningful and uniform, but ratios are not, because there is no true zero point.*

Examples:
- Temperature in Celsius or Fahrenheit. The difference between 20°C and 25°C equals the difference between 30°C and 35°C. But 20°C is not "twice as hot" as 10°C — there is no absolute zero on the Celsius scale.
- Calendar year. The difference between 2020 and 2025 is the same as between 2010 and 2015. But the year 2000 is not "twice" the year 1000 in any meaningful sense.

For interval data, addition and subtraction are meaningful; multiplication and division are not.

**Ratio attribute.**

*A ratio attribute is a numerical attribute with a true zero point, so that both differences and ratios between values are meaningful.*

Examples:
- Income in NPR. Zero income is meaningful (no income). NPR 50,000 is twice NPR 25,000.
- Distance in kilometres. Zero is no distance.
- Transaction amount.
- Age in years.
- Electricity consumption in kWh. Zero is no consumption.
- Time intervals (not absolute time — time intervals).

For ratio data, all four arithmetic operations are meaningful.

**Discrete vs continuous within numerical.**

A numerical attribute is **discrete** if it takes values from a countable set, typically integers. Number of children in a household. Count of transactions in a day. Number of failed login attempts.

A numerical attribute is **continuous** if it can take any value in a range. Height in metres. Time in seconds. Probability between 0 and 1.

In practice, every measurement is at some precision discrete (a thermometer reads to one decimal place), but the underlying quantity is continuous and the data is treated as continuous.

### Special data types

**Text.** Strings of characters. SMS messages, customer reviews, social-media posts, court documents, news articles. Text requires specific preprocessing (tokenisation, normalisation, vectorisation) before most ML algorithms can use it.

**Image.** Two-dimensional arrays of pixel values. A standard colour image is a three-channel tensor (red, green, blue). Convolutional neural networks are the standard tool.

**Time series.** Values indexed by time. Stock prices, sensor readings, electricity loads, GDP figures. Special considerations — temporal ordering, autocorrelation, seasonality — apply.

**Spatial / geographic.** Latitude-longitude pairs, polygons, network topologies. GIS tools and spatial-specific ML methods apply.

**Graph / network.** Nodes connected by edges. Social networks, citation networks, road networks, transaction networks for fraud detection. Graph neural networks are the standard.

**Audio / video.** Waveforms (audio) or sequences of images (video). Each has its own preprocessing and modelling tradition.

**Sequence data.** Ordered sequences that are not necessarily indexed by time — DNA sequences, page-view sequences, customer journey events.

### Why this taxonomy matters

The data type determines what is allowed:

- A linear regression can use ratio and interval features directly. Categorical features must first be encoded (one-hot, target encoding, embedding).
- A decision tree can handle categorical features natively (most implementations).
- The "mean" of a categorical variable is meaningless; the mode is the appropriate summary.
- An ordinal variable might be treated as numeric if the encoding preserves order (loan grade A=1, B=2, C=3, ...) but this assumes equal spacing.
- A nominal variable encoded as numbers (Bagmati=1, Gandaki=2, ...) and fed to a linear model produces nonsense — the model will treat the codes as having arithmetic meaning they do not have.

Misidentifying a data type leads to silent failures. The model trains, the loss decreases, predictions come out — but they are based on operations that do not respect the data's structure.

### A worked exercise — typing the columns

Consider an eSewa transaction record:

| Column | Type | Reason |
|---|---|---|
| transaction_id | Nominal (treat as identifier) | Distinct label, no order |
| user_id | Nominal | Distinct label, no order |
| amount_npr | Ratio | Zero is meaningful, ratios are meaningful |
| timestamp | Interval (as date) or Ratio (as duration since epoch) | Differences are meaningful |
| merchant_category | Nominal | Distinct categories |
| device_os | Nominal (Android, iOS, web) | Distinct categories |
| user_age | Ratio | Zero meaningful (newborn) |
| transaction_count_30d | Ratio (discrete count) | Zero meaningful, count |
| is_fraud | Nominal (Boolean) | Binary category, no order |

Once typed, each column has a clear set of operations that apply to it.

## 2.3 Data pre-processing

The transformation of raw data into a form suitable for analysis or modelling. The standard operations:

### Data cleaning

Raw data is dirty. The cleaning step handles:

**Missing values.** A field is blank, NULL, NaN, or has a placeholder. Causes: the field was not collected, the user skipped it, a system error occurred, the data was migrated from a system that did not have the field.

Strategies:
- **Drop rows with missing values.** Simple but wasteful if missing values are common.
- **Drop columns with too many missing values.** If 70% of records are missing a field, the field may be more trouble than it is worth.
- **Impute with the mean / median.** For numerical fields. Median is more robust to outliers.
- **Impute with the mode.** For categorical fields.
- **Impute with a predicted value.** Use other features to predict the missing field.
- **Treat "missing" as its own category.** For categorical features, sometimes "missing" carries signal — a loan applicant who declines to state their income may be systematically different from those who provide it.
- **Use algorithms that handle missing values natively.** Gradient boosting trees (XGBoost, LightGBM) can split on "missing" as a value.

The choice depends on why the data is missing. **Missing Completely At Random (MCAR)** — the missingness is unrelated to anything — is the easiest case. **Missing At Random (MAR)** — the missingness depends on observed variables — is intermediate. **Missing Not At Random (MNAR)** — the missingness depends on the missing value itself — is the hardest. Loan applicants who decline to state income may be those with low or unreported income; imputing with the average overstates their income.

**Duplicates.** The same record appears twice. Causes: data-entry error, system migration, multiple ingestion paths. Detect by hashing key fields. Remove or merge.

**Inconsistent formatting.** "Bagmati", "BAGMATI", "Bagmati Pradesh", "Province 3" — all referring to the same thing. Normalise.

**Outliers.** Values far outside the typical range. Causes: data-entry error (NPR 1,000,000 instead of NPR 10,000), measurement error, or genuine but rare events.

Detection methods:
- **Box plot / IQR rule.** Values more than 1.5 × IQR (interquartile range) below Q1 or above Q3 are flagged.
- **Z-score.** Values more than 3 standard deviations from the mean.
- **Domain knowledge.** A transaction amount higher than the user's monthly salary is suspicious.

Treatment:
- **Remove** if clearly an error.
- **Cap** at a reasonable limit (winsorisation).
- **Keep but flag** if potentially a genuine extreme.
- **Investigate** if the outlier is a high-stakes anomaly (a fraudulent transaction is exactly the kind of outlier you want to study, not delete).

**Invalid values.** A "date of birth" of 1850. A "transaction amount" that is negative. A "phone number" with letters. Validate against expected ranges and patterns; correct or drop.

### Feature scaling

Many algorithms are sensitive to the relative scales of features. A logistic regression with one feature in NPR (range 0 to 1,000,000) and another in years (range 18 to 80) will be dominated by the NPR feature in its raw form. K-nearest neighbours and SVM with non-tree-like kernels are even more affected.

**Min-max scaling (normalisation).** Rescale to a fixed range, usually [0, 1]:

$$
x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}
$$

The minimum becomes 0, the maximum becomes 1. Preserves the shape of the distribution. Sensitive to outliers — a single extreme value compresses the rest.

**Standardisation (z-score normalisation).** Rescale to have mean 0 and standard deviation 1:

$$
x' = \frac{x - \bar{x}}{s}
$$

After standardisation, the feature has mean 0 and unit variance. Less affected by outliers than min-max scaling. Standard choice for most algorithms.

**Robust scaling.** Use median and interquartile range instead of mean and standard deviation. Best when the data has heavy outliers.

**Important:** scaling parameters ($x_{\min}$, $x_{\max}$, $\bar{x}$, $s$) must be computed on the training set only, then applied to validation and test data. Computing on the full dataset leaks information from test to training.

Tree-based algorithms (decision trees, random forests, gradient boosting) do not require scaling — they split on thresholds, not distances. Neural networks, linear models, KNN, SVM all benefit from scaling.

### Encoding categorical features

Categorical features must be converted to numbers for most algorithms.

**One-hot encoding.** Each category becomes its own binary column.

Original column with categories {Bagmati, Gandaki, Karnali}:

| Bagmati | Gandaki | Karnali |
|---|---|---|
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 1 |

A record from Bagmati has 1 in the Bagmati column and 0 elsewhere. One-hot encoding does not impose an ordering and is the safe default for nominal features. The downside is high dimensionality when categories are many — a feature with 10,000 distinct merchant IDs becomes 10,000 columns.

**Label encoding.** Each category is assigned an integer (Bagmati=0, Gandaki=1, Karnali=2). Compact but imposes an ordering that may not exist. Safe for ordinal features where the ordering is real (loan grades A=1 through E=5); unsafe for nominal features.

**Target encoding (mean encoding).** Each category is replaced with the mean target value for that category. For a fraud-detection model, a merchant category becomes the average fraud rate for transactions in that category. Compact and informative but prone to leakage — must be computed on training data only, with care for rare categories.

**Embedding.** Each category is mapped to a low-dimensional vector of learned real numbers. Used in deep learning. The model learns embeddings that capture meaningful similarities between categories.

### Discretisation (binning)

Convert a continuous feature into discrete bins.

- Age: continuous → {0-18, 19-35, 36-55, 56-75, 76+}.
- Income: NPR amount → {low, middle, high}.

Useful when the underlying relationship between feature and target is highly non-linear or when interpretability matters. Loses information — two ages within the same bin look identical to the model.

### Feature engineering

Constructing new features from existing ones. Often the single highest-leverage activity in a data-analytics project.

Examples for a Nepali credit-default model:
- **Debt-to-income ratio.** Existing loans summed and divided by monthly income.
- **Loan-to-value ratio.** Loan amount divided by collateral value.
- **Tenure-with-bank.** Months since the customer's first relationship with this bank.
- **Recency, frequency, monetary (RFM) features.** Standard for retail and fintech — days since last transaction, count of transactions in the past 30 days, average transaction value.
- **Geographic features.** Distance from the nearest branch, urban vs rural classification, district-level GDP per capita.
- **Time features.** Day of week, hour of day, is-public-holiday, days since last transaction.

A good engineered feature can move a model's accuracy by several percentage points more than switching algorithms can.

### Handling imbalanced data

Many real problems have rare positive cases. Fraud is 0.3% of transactions. Disease prevalence is often 1% or less in screening populations. Network intrusions are rare among all network events.

A naive classifier on 0.3% fraud achieves 99.7% accuracy by predicting "not fraud" for everything. That sounds good but is useless.

Strategies:
- **Resampling.** Oversample the minority class (replicate rare examples or use SMOTE — Synthetic Minority Oversampling Technique to generate synthetic examples) or undersample the majority class.
- **Class weights.** Weight the minority class more heavily in the loss function.
- **Better evaluation metrics.** Use precision, recall, F1, AUC instead of accuracy (Chapter 6).
- **Anomaly detection algorithms.** Models specifically designed for rare events.
- **Cost-sensitive learning.** Specify the relative cost of false positives vs false negatives explicitly.

## 2.4 Visualisation and exploring data

Looking at data before modelling it is essential. Patterns visible to the eye are often invisible in summary statistics. Pathologies (outliers, missing data, distribution shifts) are easier to spot in a plot than in a table.

The **exploratory data analysis (EDA)** tradition, popularised by John Tukey in the 1970s, is the discipline of looking at data with charts and summaries before settling on a model.

### Univariate visualisations — looking at one variable

**Histogram.** Bins a continuous variable and shows the count in each bin. Reveals the shape of the distribution — symmetric, skewed, multimodal, with outliers.

For a sample of monthly electricity consumption from NEA customers in Lalitpur, a histogram typically shows a right-skewed distribution — most households consume modest amounts, with a long tail of high consumers. The skewness is information; the average alone hides it.

**Box plot.** Shows the median, the first and third quartiles (the box), and the range (whiskers), with outliers marked separately. Compact summary of distribution shape, easy to compare across groups.

A box plot of loan amounts by branch can reveal that one branch consistently issues larger loans, or that another branch has unusual outliers.

**Density plot (kernel density estimate).** Smooth version of a histogram. Avoids the artefacts of bin-boundary choices.

**Bar chart.** For categorical variables. Counts or proportions in each category. The categorical equivalent of a histogram.

### Bivariate visualisations — looking at two variables

**Scatter plot.** Two continuous variables plotted as points. Reveals correlation, clustering, non-linear relationships.

For income vs loan default rate, a scatter plot at the individual level is noisy but a binned version (default rate within income bands) often shows the clear inverse relationship.

**Line plot.** Two continuous variables where one is ordered (typically time). Shows trends, seasonality, level changes.

NEA's daily peak demand plotted across a year shows clear patterns: daily within-week structure (weekends differ), seasonal structure (summer cooling load, winter heating load, festival peaks), and longer-term trends.

**Heat map.** Two categorical variables plotted as a coloured grid showing the count or some aggregate in each cell. Useful for cross-tabulations.

A heat map of transaction count by hour-of-day × day-of-week reveals usage patterns — Khalti transactions peak in evenings, with a clear weekly cycle.

**Box plot grouped by category.** A box plot per category lets you compare distributions across groups. Loan amounts by branch, transaction counts by user-segment, default rates by employment type.

### Multivariate visualisations

**Pair plot.** A grid of scatter plots, one for each pair of variables. Useful for spotting which features correlate with which others.

**Parallel coordinates.** Each variable is a vertical axis; each observation is a polyline connecting its values. Reveals cluster structure in higher dimensions.

**3D scatter plot.** Three variables. Useful occasionally but rotating 3D plots are harder to read than 2D ones.

**Correlation matrix heat map.** Pairwise correlation between all numerical features, displayed as a coloured grid. Quickly identifies redundant features (correlation near +/- 1) and target-relevant features (high correlation with target).

### Exploration with statistics, not just plots

Plots and statistics complement each other.

**Summary statistics per variable.** Mean, median, standard deviation, range, count of missing values, distinct values for categoricals.

**Cross-tabulations.** Count of records by combinations of categorical variables. Reveals patterns and rare combinations.

**Pairwise correlations.** Between every pair of numerical variables. Pearson's $r$ for linear relationships; Spearman's rank correlation for monotonic non-linear relationships.

**Tests of association.** Chi-square test for independence between categorical variables. T-tests or ANOVA for differences in means across groups.

### Anscombe's quartet — why visualisation matters

A classic 1973 demonstration by Francis Anscombe: four datasets with identical mean, variance, correlation, and linear-regression coefficients — but radically different shapes. One is a line. One is a curve. One is a line with one extreme outlier. One has all $x$ values equal except for one outlier.

Summary statistics make them look identical. The scatter plots make them obviously different. The moral: never trust statistics without a plot, never trust a plot without statistics.

### Common pitfalls

**Y-axis manipulation.** A plot with the y-axis starting at 95 instead of 0 can make a small difference look enormous. Be careful both as the producer and the consumer.

**Pie charts with too many slices.** Hard to read. A bar chart is almost always clearer.

**3D effects on 2D data.** Distorts proportions, looks impressive, communicates worse.

**Hidden missing data.** A plot of "average loan amount by region" can omit regions with too few observations to compute a reliable average — and the absence of those regions is itself information.

**Aggregation hiding subgroups.** Simpson's paradox: the relationship between two variables can reverse when subgroups are considered. National statistics may hide opposing trends in different provinces.

### Standard tools

- **Python.** Matplotlib (basic plotting), Seaborn (statistical visualisations), Plotly (interactive), Bokeh, Altair. The Pandas library handles tabular data.
- **R.** ggplot2 is the gold standard for grammar-of-graphics plotting.
- **Business intelligence tools.** Tableau, Power BI, Google Looker Studio, Metabase. For non-programmers and for production dashboards.
- **Notebooks.** Jupyter and similar environments combine code, plots, and prose for reproducible exploration.

## 2.5 Descriptive, diagnostic, predictive, prescriptive analytics

A common framing of analytics by the type of question being answered. The four categories form a maturity progression — each one builds on the previous.

### Descriptive analytics

*Descriptive analytics is the form of analytics that summarises what has happened, using historical data to produce reports, dashboards, and summary statistics that describe the state of the business or system.*

The lowest-effort, highest-volume analytics. Every organisation does it. Examples:

- "Total transactions on eSewa in the past month: 8.2 million."
- "Average daily peak electricity demand in Kathmandu Valley in 2024: 1480 MW."
- "Number of unique users on Hamro Patro this week: 3.2 million."
- "Customer-acquisition cost by channel: SEO NPR 50, paid social NPR 320, referral NPR 25."
- "Default rate by district for personal loans issued in the past year."

Tools: SQL queries, reports, dashboards, BI tools. Skills: data engineering, business understanding, dashboard design.

Limitations: descriptive analytics tells you the situation but not why or what to do.

### Diagnostic analytics

*Diagnostic analytics is the form of analytics that explains why something happened, using techniques like drill-down, data discovery, correlation analysis, and root-cause analysis to find the drivers behind observed outcomes.*

The next level — moving from "what happened" to "why did it happen." Examples:

- "Default rates spiked in Province 2 in Q3 2024. Diagnostic analysis traces this to flooding that disrupted agricultural income."
- "eSewa transactions dropped 15% in the second week of October. Investigation reveals the daytime payment gateway latency increased due to an unannounced ISP-side route change."
- "The Foodmandu order completion rate dropped on Saturday evenings. Analysis shows delivery-partner availability did not scale with weekend demand."
- "Customer churn in a microfinance institution is higher in branches where the loan officer turnover was high in the prior year."

Tools: BI drilldowns, statistical correlation analysis, regression analysis, A/B test analysis, anomaly investigation, root-cause-analysis frameworks.

Diagnostic analytics requires more analytical skill than descriptive — finding correlations is easy; interpreting them as causal explanations is hard.

### Predictive analytics

*Predictive analytics is the form of analytics that forecasts what is likely to happen in the future, using machine-learning models, time-series forecasting, and statistical inference applied to historical data.*

The third level — moving from past and present to future. Examples:

- "Predict next month's electricity demand for the NEA dispatch centre, accurate to ±2% on average."
- "Predict the probability that a new loan applicant will default in the next 12 months."
- "Predict next-day weather for the Department of Hydrology and Meteorology."
- "Predict which Khalti users are likely to churn in the next 30 days."
- "Forecast NEPSE index movement over the next week (with appropriate uncertainty quantification)."
- "Predict the spread of dengue outbreaks based on rainfall and case-count history."

Tools: machine-learning algorithms (Chapters 3–7), time-series methods (ARIMA, Prophet, neural-network time-series models), Bayesian inference.

The danger: predictions can be wrong. A predictive system without honest uncertainty estimates and without ongoing monitoring of accuracy is a liability.

### Prescriptive analytics

*Prescriptive analytics is the form of analytics that recommends what action to take, using optimisation methods, simulation, decision theory, and reinforcement learning to suggest the action that best achieves a stated objective.*

The fourth level — moving from "what will happen" to "what should we do." Examples:

- "Given the predicted electricity demand and the current generation capacity, what is the optimal generation dispatch schedule that minimises cost while meeting demand?"
- "Given the predicted churn risk for each user, which retention offers should be sent to which users to maximise retained revenue subject to a budget constraint?"
- "Given the predicted loan-default risk for each applicant, what interest rate should each be offered to maximise risk-adjusted profit?"
- "Given the predicted demand on Pathao at each location and time, where should drivers be repositioned to minimise pickup times?"
- "Given predicted disease prevalence, where should mobile vaccination clinics be deployed?"

Tools: linear programming, integer programming, simulation, Markov decision processes, reinforcement learning, decision theory, multi-armed bandits.

Prescriptive analytics combines prediction with decision-making. The hardest of the four — and the highest-value when done well.

### Maturity progression in practice

A typical organisation moves through these stages. Most start with descriptive — a dashboard showing yesterday's numbers. Then add diagnostic — when something looks off, drill into why. Then build predictive systems for high-value forecasts. The leading-edge add prescriptive — automated systems that not only predict but act.

In Nepal, the maturity distribution across organisations:

- **Descriptive analytics** is common. Most banks, telcos, and large fintechs have BI dashboards.
- **Diagnostic analytics** is variable. Larger organisations have data-science teams that do root-cause analysis; smaller ones rely on manual investigation.
- **Predictive analytics** has been spreading in the past five years. Credit scoring, churn prediction, fraud detection, demand forecasting are now common in commercial banks and major fintechs.
- **Prescriptive analytics** is rarer. Some optimisation work happens in NEA load dispatch and in mobile-operator network planning, but full-scale prescriptive systems remain unusual.

The MSc programmes in computing and data science at IOE, Kathmandu University, and other institutions are producing graduates who will move organisations up this ladder.

## 2.6 Architectural design patterns and stack for handling Big Data

When data fits on one machine, the analytics pipeline runs on one machine. When it does not, special architectures are needed. This section covers the patterns and the tool stack used for **Big Data** — data large enough that single-machine processing is impractical.

### The four V's of Big Data

A common framing:

- **Volume.** How much data. Terabytes, petabytes, exabytes.
- **Velocity.** How fast new data arrives. Real-time streams, near-real-time, batch.
- **Variety.** How many different data types and sources. Structured tables, unstructured text, images, sensor streams.
- **Veracity.** How reliable the data is. Noisy sensors, missing values, conflicting sources.

Some frameworks add **Value** (the business value extracted) as a fifth V.

Big Data architectures are designed to handle high volume, high velocity, and high variety simultaneously.

### Distributed storage

Single machines have finite disk. Distributed storage spreads data across many machines.

**HDFS (Hadoop Distributed File System).** The original Big-Data storage layer (2006). Files are split into blocks, replicated across multiple nodes for fault tolerance, and accessed in parallel. HDFS is optimised for very large files and sequential reads.

**Cloud object storage.** Amazon S3, Azure Blob Storage, Google Cloud Storage. Has largely displaced HDFS for new deployments. Effectively infinite capacity, durable, pay-per-use, accessible through standard APIs.

**Data lakes and lakehouses.** A **data lake** is a centralised store of raw data in many formats, in object storage. A **data lakehouse** combines the flexibility of a lake with database-like transaction guarantees, using formats like Apache Iceberg, Delta Lake, and Apache Hudi.

### Distributed processing

**MapReduce.** The original distributed processing pattern (Google, 2004; Hadoop MapReduce, 2006). Data is processed in two phases: a **Map** phase applies a function to each record (often in parallel across nodes), and a **Reduce** phase aggregates the results.

The MapReduce model is general but verbose. Most operations now use higher-level abstractions on top of distributed processing engines.

**Apache Spark.** The dominant general-purpose distributed processing engine since around 2014. In-memory computation (much faster than MapReduce for iterative workloads), unified API for batch and streaming, support for SQL, machine learning, and graph processing. Spark is the workhorse of modern data engineering.

**Apache Flink.** Stream-first processing engine. Strong for low-latency, stateful stream processing.

**Beam / Dataflow.** Unified batch and streaming model. Apache Beam is the open-source SDK; Google Cloud Dataflow is a managed implementation.

### Distributed databases

Beyond file-based storage, distributed databases serve specific patterns.

**Distributed SQL warehouses.** Snowflake, Google BigQuery, Amazon Redshift, Databricks SQL. Massively-parallel SQL execution over very large datasets. Optimised for analytics queries.

**NoSQL databases.**

- *Key-value stores* — Redis, DynamoDB, Aerospike. Very fast lookups by key.
- *Document stores* — MongoDB, Couchbase. JSON-like documents.
- *Wide-column stores* — Cassandra, HBase, ScyllaDB. Massive horizontal scaling for write-heavy workloads.
- *Time-series databases* — InfluxDB, TimescaleDB, Apache Pinot, ClickHouse. Optimised for high-frequency time-stamped data (IoT, monitoring).
- *Graph databases* — Neo4j, ArangoDB, Amazon Neptune. For data with rich relationships.

### Streaming platforms

For real-time or near-real-time data flows.

**Apache Kafka.** The dominant distributed event-streaming platform. Producers publish messages to topics; consumers subscribe. Durable, replicated, ordered within partitions. Used as the central event bus in most modern data architectures.

**Other systems.** Apache Pulsar, AWS Kinesis, Azure Event Hubs, Google Pub/Sub — alternatives with similar core abstractions.

### The Lambda and Kappa architectures

Two reference architectures for combining batch and streaming.

**Lambda architecture.** Two parallel processing paths:
- **Batch layer.** Slower, exact, processes the full historical dataset.
- **Speed layer.** Faster, approximate, processes the most recent data in real time.
- **Serving layer.** Combines results from both for queries.

The Lambda architecture's strength is robustness — the batch layer always produces correct results, the speed layer covers the recency gap. The weakness is operational complexity: two pipelines for the same logic.

**Kappa architecture.** A single streaming pipeline that processes everything. Historical reprocessing is done by replaying the stream from the beginning. Simpler than Lambda but requires the streaming framework to be powerful enough to handle both real-time and reprocessing workloads. Apache Flink is the typical engine.

### Orchestration

Pipelines have many steps that must run in the right order, with retries, failure handling, and monitoring. **Workflow orchestrators** manage this.

- **Apache Airflow.** The most widely used orchestrator. Pipelines are Python code; the scheduler runs them on a schedule or in response to triggers.
- **Prefect.** A modern Airflow alternative with cleaner ergonomics.
- **Dagster.** Data-asset-centric orchestrator.
- **AWS Step Functions, GCP Workflows, Azure Data Factory.** Cloud-native orchestrators.

### A reference Big-Data stack

A typical modern data stack:

```
[Sources: apps, sensors, transactional databases, third-party APIs]
                            ↓
[Ingestion: Kafka, Kinesis, Pub/Sub]
                            ↓
[Object storage: S3, GCS, Azure Blob] ← raw data lake
                            ↓
[Processing: Spark, Flink, dbt] ← transformations
                            ↓
[Curated storage: Iceberg/Delta/Hudi tables on object storage, or warehouse like BigQuery/Snowflake]
                            ↓
[Serving: APIs, dashboards (Tableau, Looker, Metabase), ML feature stores, downstream apps]
                            ↓
[Orchestration: Airflow, Prefect, Dagster (manages the whole flow)]
                            ↓
[Observability: data quality monitoring, lineage, alerting]
```

The components vary by organisation but the shape is consistent.

### Big Data in Nepal

The Big Data maturity in Nepal varies:

- **Telecoms.** NTC and Ncell handle very large data volumes — call detail records, location data, network performance metrics. Both operate analytics platforms; the exact stacks are not public but include the standard ingredients (Spark, Kafka, data warehouses).
- **Banking and fintech.** Major banks use commercial data warehouses (Oracle, Microsoft SQL Server traditionally; some are migrating to cloud platforms). eSewa and Khalti's transaction volumes (millions of daily transactions) make them genuine Big-Data environments.
- **Government.** The Government Integrated Data Centre hosts the bulk of government data; Big Data analytics over this data is not yet widespread.
- **Research.** Academic institutions and a few research-oriented government agencies (CBS, DHM) are starting to adopt modern analytics platforms.
- **Cloud usage.** Most cloud-based Big Data work in Nepal runs on AWS Mumbai, GCP Singapore/Mumbai, or Azure Singapore regions. Cross-border data residency creates compliance considerations.

The data-analytics workforce in Nepal is growing rapidly, driven by both domestic demand and outsourcing/freelance work for international clients. The MSNCS program and similar academic offerings are aimed at meeting this demand. The tooling is standard across the world; the local context provides the data and the questions worth answering.
