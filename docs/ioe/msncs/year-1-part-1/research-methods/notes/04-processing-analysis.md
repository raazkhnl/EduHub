---
title: 'Chapter 4 — Processing and Analysis of Data'
sidebar_label: 'Ch 04 — Processing and Analysis of Data'
sidebar_position: 4
description: 'Chapter 4 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch04
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

After data collection, the researcher has piles of raw material — questionnaire responses, instrument logs, interview transcripts, measurements. The data must be processed before any meaningful analysis can be done, and the analysis itself must follow the discipline of statistics rather than impression. This chapter covers the processing operations that prepare data for analysis, the types of analysis available, the role of statistics in research, and the specific descriptive statistics — central tendency, dispersion, skewness, relationship measures, and simple regression — that summarise what the data shows. The chapter is heavy on worked numerical examples because these topics are predominantly numerical.

## 4.1 Processing operations

Raw data is rarely ready for analysis. **Processing** is the set of operations that prepare it.

### Editing

*Editing is the operation of examining collected data for completeness, accuracy, uniformity, and consistency, identifying errors and inconsistencies that must be corrected before analysis.*

A questionnaire response with the age of "150" needs investigation — typo, joke, or actual data error. A schedule with several blank questions must be revisited. A transaction log with negative amounts where positive ones are expected must be inspected.

Two stages:

**Field editing.** Done by the enumerator or the data-collection team immediately after each questionnaire or schedule. Catches problems while the respondent may still be available for clarification.

**Central editing.** Done by the research team after all data is gathered. Cross-checks across responses; checks consistency across instruments.

Editing involves judgement. An obviously-wrong value (a date of birth in 1820) is treated differently from a borderline-suspicious one (a household income that seems high but is not impossible). The editing decisions must be documented for transparency.

### Coding

*Coding is the operation of converting raw responses into numerical or categorical values suitable for analysis, by mapping each response to a predefined coding scheme that the analysis software can process.*

A respondent ticks "strongly agree" on a Likert scale. The coding assigns this to the value 5 (or 1, depending on the convention). An open-ended response "I think the bank's app is hard to use because of the small fonts and confusing menus" is coded into multiple categories — usability, interface design, font size, menu structure — for thematic analysis.

The **codebook** records the mapping. Every variable, every code, every meaning. A complete codebook lets another researcher understand the data and is mandatory for serious research.

Good coding practice:

- Define codes before coding starts. Do not invent codes on the fly.
- Use mutually exclusive categories where possible.
- Reserve a code for missing data (e.g., 99 or -1) and for "not applicable."
- Test inter-coder reliability on a subset for human-coded data.
- Document every coding decision.

### Classification

*Classification is the operation of grouping data into related categories or classes based on common characteristics, making the data easier to summarise, compare, and analyse.*

Income data might be classified into bands — low, middle, high. Geographic data into urban, semi-urban, rural. Transaction data into categories — payments, transfers, deposits, withdrawals.

Classification trades precision for clarity. A specific income of NPR 47,283 is precise but hard to compare to other incomes. Classified into the NPR 40,000-60,000 band, it becomes immediately comparable to others in the same band. The cost is information loss within the band.

### Tabulation

*Tabulation is the operation of arranging data in tables — rows and columns — to present it in a compact, comparable, and readable form, the standard step between coding and statistical analysis.*

Tabulation can be:

**Univariate tabulation.** Counts or summary statistics for one variable. The distribution of education levels across respondents.

**Bivariate (cross-) tabulation.** Counts across two variables. Education level by region. The cells in the table show the count (or percentage) for each combination.

**Multivariate tabulation.** Three or more variables. Used cautiously — tables with many variables become unreadable.

Tables are not just presentation. They are intermediate analysis objects. Patterns visible in tables suggest hypotheses; absences in tables reveal data quality issues.

### Other processing operations

Several additional operations recur:

**Deduplication.** Remove duplicate records. A respondent who completed the questionnaire twice has their record kept once (typically the more complete one).

**Standardisation of formats.** Date formats (DD/MM/YYYY vs MM/DD/YYYY), unit standardisation (NPR vs USD), spelling normalisation ("Kathmandu" vs "kathmandu" vs "KTM").

**Anonymisation.** Removing or pseudonymising identifiers, as discussed in earlier chapters.

**Handling missing data.** Decide whether to drop, impute, or treat-as-missing. The right choice depends on the type of missing-ness, covered in Chapter 2 of the ML subject.

**Outlier handling.** Investigate, correct if known to be errors, otherwise document and decide how the analysis will handle them.

The processed dataset — clean, coded, classified, tabulated — is the input to the analytical work that follows.

## 4.2 Elements and types of analysis

Once data is processed, analysis turns it into findings.

### Types of analysis by purpose

**Descriptive analysis.** What is in the data? Summary statistics, frequencies, distributions, cross-tabulations. The starting point of every quantitative analysis.

**Inferential analysis.** What can we conclude about the population from the sample? Hypothesis testing, confidence intervals, parameter estimation. Chapter 5 of this subject covers this in detail.

**Causal analysis.** What variables cause what outcomes? Regression with controls, instrumental variables, randomised controlled trials. The hardest form of analysis because correlation does not imply causation.

**Predictive analysis.** What will happen next? Forecasting, machine learning, regression-based prediction.

**Exploratory analysis.** What patterns are in the data that we did not anticipate? Visualisation, clustering, dimension reduction. Often a precursor to hypothesis-driven analysis.

A typical project does descriptive analysis first (always), inferential analysis if hypotheses are involved, and predictive or causal analysis if the question calls for it.

### Types of analysis by data character

**Quantitative analysis.** Numerical data analysed with statistical methods.

**Qualitative analysis.** Non-numerical data analysed through coding, thematic analysis, narrative interpretation.

**Mixed analysis.** Both. Common in projects that combined primary and secondary data collection.

### Elements of analysis

Any quantitative analysis involves several elements:

**Variables.** The measured attributes — dependent, independent, control, moderating (from Chapter 2).

**Units of analysis.** The level at which data is analysed — individuals, households, transactions, packets, organisations. The unit must be appropriate to the question.

**Distributions.** How the variable values are distributed across the sample. Normal, skewed, bimodal.

**Relationships.** How variables relate to each other. Correlation, covariance, regression coefficients.

**Tests.** Statistical procedures that decide whether observed patterns are likely real or could be due to chance.

**Models.** Mathematical representations of the data-generating process, fitted to the data to estimate parameters and make predictions.

### A simple analytical workflow

For a typical engineering thesis:

1. **Describe the sample.** Demographics, summary statistics, missing-data report.
2. **Describe the variables.** Distributions, central tendency, dispersion, asymmetry.
3. **Examine relationships.** Correlations between variables, cross-tabulations.
4. **Test hypotheses.** Statistical tests of the relationships predicted by the framework.
5. **Build models.** Regression or other models that quantify the relationships.
6. **Interpret.** Translate the statistical results back into substantive findings.
7. **Discuss limitations.** What the analysis cannot show.

Each step generates output — tables, figures, statistics — that goes into the thesis's analysis chapter. The chapter tells the story of what the data shows; the analysis is the evidence.

## 4.3 Statistics in research

Statistics is the mathematical discipline of collecting, analysing, interpreting, and presenting data. In research it serves two main purposes.

### Descriptive vs inferential statistics

*Descriptive statistics is the branch of statistics that summarises and describes the features of a dataset using numerical summaries (mean, median, standard deviation, etc.) and graphical displays (histograms, box plots, scatter plots).*

*Inferential statistics is the branch of statistics that uses sample data to draw conclusions about the larger population from which the sample was drawn, through estimation, hypothesis testing, and modelling.*

The descriptive statistics covered in this chapter say what the data shows. The inferential statistics covered in Chapter 5 say what the data implies about the broader world.

A descriptive statement: "In our sample, average loan default rate is 4.2%."

An inferential statement: "We estimate the true default rate in the population is between 3.8% and 4.6% with 95% confidence."

### Why statistics matters in research

Statistics provides the discipline for making honest claims from noisy data. Every measurement has uncertainty. Every sample has sampling error. Every test has the possibility of being misled by chance. Statistical methods quantify these limits and prevent overclaiming.

A research paper that reports "the new method is better" without statistics is not a research paper. The reader cannot tell whether "better" means "always," "sometimes by a lot," or "sometimes by a tiny amount that could easily be noise." Statistical reporting forces precision.

### Statistical thinking

Beyond formulas, statistics is a way of thinking. Key habits:

- **Distinguish signal from noise.** Any observed pattern could be real or could be chance. Statistics provides the tools to decide which.
- **Quantify uncertainty.** Point estimates are incomplete without confidence intervals or other uncertainty measures.
- **Specify hypotheses in advance.** Post-hoc analysis without pre-specified hypotheses inflates the chance of false discoveries.
- **Compare to baselines.** A 0.85 number means nothing without knowing what the baseline is.
- **Watch for assumptions.** Every test has assumptions (independence, normality, equal variance). Check them before relying on the test's results.

These habits transfer beyond research into engineering operations, business decisions, and policy analysis. The discipline of statistical thinking is one of the most generally-useful outcomes of graduate training.

## 4.4 Measures of central tendency

Where is the "centre" of the data?

### Mean

*The arithmetic mean is the sum of all values divided by the number of values, the most common measure of central tendency for continuous numerical data.*

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

For a sample of five monthly electricity readings (in kWh) from a Lalitpur household: 180, 200, 220, 195, 205.

$$
\bar{x} = \frac{180 + 200 + 220 + 195 + 205}{5} = \frac{1000}{5} = 200 \text{ kWh}
$$

**Properties.** The mean uses every observation. The sum of deviations from the mean is zero. The mean minimises the sum of squared deviations. It is sensitive to outliers — a single extreme value pulls the mean in its direction.

**Variants of the mean.**

- *Weighted mean.* Some observations weighted more than others.

$$
\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}
$$

Used when observations have different reliability or different sample sizes (e.g., regional averages weighted by population).

- *Geometric mean.* The nth root of the product of n positive values.

$$
GM = \left(\prod_{i=1}^{n} x_i\right)^{1/n}
$$

Used for rates of growth, ratios, and quantities whose multiplicative behaviour matters more than additive (compound interest, inflation rates).

- *Harmonic mean.* The reciprocal of the arithmetic mean of reciprocals.

$$
HM = \frac{n}{\sum 1/x_i}
$$

Used for averages of rates per unit (averaged speed, averaged price per unit). Encountered as the F1-score formula in Chapter 6 of the ML subject.

### Median

*The median is the middle value when the data are sorted, the value that divides the lower half from the upper half of the dataset.*

For an odd number of values, the median is the single middle one. For an even number, it is the average of the two middle values.

For the same five electricity readings sorted (180, 195, 200, 205, 220), the median is 200 kWh.

For a different set — five household monthly incomes in NPR thousands sorted (25, 30, 35, 40, 500) — the mean is 126 but the median is 35. The median is more representative of "typical" because it is unaffected by the outlier.

**When to use the median.** Skewed distributions (income, transaction sizes, network traffic — most "real-world money" distributions are right-skewed) where the mean is misleading. Ordinal data where the mean is not strictly meaningful but the middle value is.

### Mode

*The mode is the most frequently occurring value in the dataset, the only measure of central tendency that applies meaningfully to nominal categorical data.*

For colours of citizenship cards in a queue: green, green, red, green, red, green, red, red, red — the mode is "red" (appears 5 times). You cannot compute the mean of a colour. You can compute the mode.

A dataset can have one mode (unimodal), two modes (bimodal), or many. A dataset where every value appears only once has no useful mode.

### Comparing the three

| | Mean | Median | Mode |
|---|---|---|---|
| Uses all data | Yes | No (only middle) | No (only most frequent) |
| Sensitive to outliers | Very | Slightly | Not at all |
| Works on nominal data | No | No (needs order) | Yes |
| Works on ordinal data | No (strictly) | Yes | Yes |
| Works on interval/ratio data | Yes | Yes | Yes |
| Unique | Always | Always | Not always |

**Practical guidance:**
- For symmetric numerical distributions, the three are similar. Use the mean.
- For skewed numerical distributions, the median is more representative. Use the median.
- For categorical data, only the mode applies.
- Reporting all three for a dataset is often informative — their relative positions reveal the distribution's shape.

### Empirical relationship

For moderately skewed distributions, the three measures satisfy approximately:

$$
\text{Mean} - \text{Mode} \approx 3 (\text{Mean} - \text{Median})
$$

This is Karl Pearson's empirical relation. Useful as a quick consistency check.

## 4.5 Measures of dispersion

Central tendency tells where the centre is. **Dispersion** tells how spread out the data is around the centre. Two samples can have the same mean and very different dispersion — and the difference matters.

### Range

*The range is the difference between the maximum and minimum values in the dataset, the simplest measure of dispersion.*

$$
\text{Range} = x_{\max} - x_{\min}
$$

For the electricity readings: $220 - 180 = 40$ kWh.

The range is easy to compute but uses only two data points. It is highly sensitive to outliers.

### Quartiles and the interquartile range

The data sorted is divided into quartiles:
- $Q_1$ = first quartile = 25th percentile.
- $Q_2$ = median = 50th percentile.
- $Q_3$ = third quartile = 75th percentile.

*The interquartile range (IQR) is the difference between the third and first quartiles, $Q_3 - Q_1$, representing the spread of the middle 50% of the data, robust to outliers.*

For the electricity readings (180, 195, 200, 205, 220): $Q_1 = 195$ (the 25th percentile is the second value, between the first and third quartiles), $Q_3 = 205$, IQR = 10.

The IQR is the basis of the box plot's box. Outliers are typically defined as values beyond $Q_1 - 1.5 \cdot \text{IQR}$ or $Q_3 + 1.5 \cdot \text{IQR}$.

### Variance

*Variance is the average squared deviation of values from their mean, measuring the spread of the data in squared units of the original measurement.*

For a sample:

$$
s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2
$$

For a population:

$$
\sigma^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2
$$

The $(n-1)$ denominator for the sample variance is **Bessel's correction**, which makes the sample variance an unbiased estimator of the population variance.

For the electricity readings (mean = 200):

| $x_i$ | $x_i - \bar{x}$ | $(x_i - \bar{x})^2$ |
|---|---|---|
| 180 | -20 | 400 |
| 200 | 0 | 0 |
| 220 | 20 | 400 |
| 195 | -5 | 25 |
| 205 | 5 | 25 |
| Sum | 0 | 850 |

$s^2 = 850 / (5-1) = 212.5 \text{ kWh}^2$.

Variance has the inconvenient property that its units are squared — kWh² in this example, hard to interpret.

### Standard deviation

*The standard deviation is the square root of the variance, measuring spread in the same units as the original data.*

$$
s = \sqrt{s^2}
$$

For the electricity readings: $s = \sqrt{212.5} \approx 14.58$ kWh.

The standard deviation is the most-used measure of dispersion. "On average, monthly consumption varies by about 14.6 kWh around the mean of 200 kWh."

**Interpreting standard deviation.** For data approximately normally distributed:
- About 68% of values fall within 1 standard deviation of the mean.
- About 95% fall within 2 standard deviations.
- About 99.7% fall within 3 standard deviations.

This is the "68-95-99.7 rule" or **empirical rule**. It does not apply to non-normal distributions.

### Coefficient of variation

*The coefficient of variation is the ratio of the standard deviation to the mean, often expressed as a percentage, providing a scale-invariant measure of relative dispersion useful for comparing variability across datasets with different units or means.*

$$
CV = \frac{s}{\bar{x}} \times 100\%
$$

For the electricity data: $CV = 14.58 / 200 = 7.3\%$.

CV lets you compare variability across measurements with different units. Variability in stock prices (NPR per share) and variability in trading volumes (number of shares) can be compared through their CVs.

### Mean absolute deviation

An alternative to standard deviation, using absolute values instead of squared values:

$$
\text{MAD} = \frac{1}{n} \sum_{i=1}^{n} |x_i - \bar{x}|
$$

Less affected by outliers than standard deviation. Useful as an alternative when distributions are heavy-tailed or contaminated with outliers.

### Comparison of dispersion measures

| Measure | Sensitive to outliers | Uses all data | Same units as data |
|---|---|---|---|
| Range | Yes | No (only min, max) | Yes |
| IQR | No | No (only middle 50%) | Yes |
| Variance | Yes | Yes | No (squared units) |
| Standard deviation | Yes | Yes | Yes |
| Coefficient of variation | Yes | Yes | Unitless |
| Mean absolute deviation | Less so | Yes | Yes |

For most research reporting, the standard deviation is the default. The IQR is reported when the distribution is skewed and the standard deviation would mislead.

## 4.6 Measures of asymmetry (skewness)

A distribution can be symmetric around its centre or skewed to one side. **Skewness** measures this asymmetry.

### Skewness

*Skewness is a measure of the asymmetry of a probability distribution about its mean, with positive skewness indicating a longer tail to the right (high values) and negative skewness indicating a longer tail to the left (low values).*

**Visual intuition.**

A symmetric distribution (like the normal) has equal tails. Skewness = 0.

A right-skewed (positively skewed) distribution has a long right tail. Most values are low, with a few very high outliers. Income distributions, transaction amounts, and household sizes are typically right-skewed. Mean > median > mode.

A left-skewed (negatively skewed) distribution has a long left tail. Most values are high, with a few very low outliers. Exam scores in an easy test, with most students scoring high and a few low, are left-skewed. Mean < median < mode.

### Computing skewness

The most common formula (Karl Pearson's first measure of skewness):

$$
\text{Sk}_1 = \frac{\text{Mean} - \text{Mode}}{\text{Standard deviation}}
$$

Pearson's second measure, useful when the mode is unstable:

$$
\text{Sk}_2 = \frac{3 (\text{Mean} - \text{Median})}{\text{Standard deviation}}
$$

The **moment-based skewness** is the standard mathematical definition:

$$
\text{Sk} = \frac{\frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^3}{s^3}
$$

For a sample of $n$ observations:

$$
g_1 = \frac{n}{(n-1)(n-2)} \sum_{i=1}^{n} \left(\frac{x_i - \bar{x}}{s}\right)^3
$$

Interpretation:
- $g_1 = 0$ — symmetric.
- $|g_1| < 0.5$ — approximately symmetric.
- $0.5 \leq |g_1| < 1$ — moderately skewed.
- $|g_1| \geq 1$ — highly skewed.

### Worked example

Consider monthly transaction counts from 10 Khalti users: 5, 8, 10, 12, 12, 15, 18, 22, 35, 80.

The 80 is a power-user outlier. Compute:

Mean = $(5 + 8 + 10 + 12 + 12 + 15 + 18 + 22 + 35 + 80) / 10 = 217 / 10 = 21.7$.

Median = average of the 5th and 6th values = $(12 + 15)/2 = 13.5$.

Mode = 12 (appears twice).

Standard deviation:

| $x_i$ | $x_i - \bar{x}$ | $(x_i - \bar{x})^2$ |
|---|---|---|
| 5 | -16.7 | 278.89 |
| 8 | -13.7 | 187.69 |
| 10 | -11.7 | 136.89 |
| 12 | -9.7 | 94.09 |
| 12 | -9.7 | 94.09 |
| 15 | -6.7 | 44.89 |
| 18 | -3.7 | 13.69 |
| 22 | 0.3 | 0.09 |
| 35 | 13.3 | 176.89 |
| 80 | 58.3 | 3398.89 |
| Sum | | 4426.10 |

$s^2 = 4426.10 / 9 = 491.79$, $s \approx 22.18$.

Pearson's first skewness: $(21.7 - 12) / 22.18 \approx 0.44$.
Pearson's second skewness: $3 \cdot (21.7 - 13.5) / 22.18 \approx 1.11$.

Both indicate positive skewness; the second indicates substantial skewness. The interpretation: most users have moderate transaction counts, but a few power users skew the distribution to the right. The mean (21.7) overstates the typical user's behaviour; the median (13.5) is more representative.

### Why skewness matters

Several practical consequences:

- **Choice of central tendency.** Skewed distributions are better summarised by the median than the mean.
- **Assumption checks.** Many statistical tests assume normality (or at least symmetry). Heavily-skewed data needs transformation (log, square root) or non-parametric methods.
- **Sample-size effects.** Skewed distributions need larger samples for the sample mean to approximate a normal distribution (via the Central Limit Theorem).
- **Visualisation.** Skewness is immediately visible in a histogram or box plot; not visible from summary statistics alone.

### Kurtosis (briefly)

A related concept: **kurtosis** measures the "tailedness" of a distribution — how heavy or light the tails are compared to a normal distribution.

- *Mesokurtic* — normal-like tails. Kurtosis = 0 (when reported as excess kurtosis).
- *Leptokurtic* — heavy tails. Positive excess kurtosis. Distributions of extreme events tend to be leptokurtic.
- *Platykurtic* — light tails. Negative excess kurtosis.

Kurtosis matters in finance (extreme returns are more frequent than a normal distribution would predict) and in security research (rare extreme attacks are leptokurtic phenomena).

## 4.7 Measures of relationship

How do two variables co-vary? Several measures.

### Covariance

*Covariance is a measure of the joint variability of two random variables, with positive covariance indicating that the variables tend to move together and negative covariance indicating they tend to move in opposite directions.*

For a sample:

$$
\text{Cov}(X, Y) = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})
$$

Covariance has the inconvenient property that its scale depends on the scales of $X$ and $Y$. Covariance between income (in NPR) and transactions (count) is in NPR·count units, hard to interpret. Standardisation gives correlation.

### Pearson correlation coefficient

*The Pearson correlation coefficient is the standardised measure of the linear relationship between two variables, scaled to range from -1 to +1, where +1 indicates perfect positive linear relationship, -1 indicates perfect negative linear relationship, and 0 indicates no linear relationship.*

$$
r = \frac{\text{Cov}(X, Y)}{s_X \cdot s_Y} = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \cdot \sum (y_i - \bar{y})^2}}
$$

The correlation coefficient is dimensionless. It does not depend on the units of $X$ or $Y$.

**Interpretation.**

| $|r|$ | Strength |
|---|---|
| 0.0 – 0.1 | Negligible |
| 0.1 – 0.3 | Weak |
| 0.3 – 0.5 | Moderate |
| 0.5 – 0.7 | Strong |
| 0.7 – 1.0 | Very strong |

These bands are conventions. The interpretation depends on context. A correlation of 0.3 between weather and electricity demand may be very meaningful operationally; the same correlation between two financial indicators may be noise.

### Worked example

Daily peak electricity demand (in MW) and daily maximum temperature (°C) for 10 days in the Bagmati province:

| Day | Temp (°C) | Demand (MW) |
|---|---|---|
| 1 | 15 | 1200 |
| 2 | 18 | 1250 |
| 3 | 20 | 1300 |
| 4 | 22 | 1350 |
| 5 | 25 | 1450 |
| 6 | 27 | 1500 |
| 7 | 30 | 1600 |
| 8 | 32 | 1650 |
| 9 | 33 | 1680 |
| 10 | 35 | 1750 |

Compute:

$\bar{x} = (15+18+20+22+25+27+30+32+33+35)/10 = 257/10 = 25.7$.

$\bar{y} = (1200+1250+1300+1350+1450+1500+1600+1650+1680+1750)/10 = 14730/10 = 1473$.

| $x_i$ | $y_i$ | $x_i - \bar{x}$ | $y_i - \bar{y}$ | $(x_i-\bar{x})(y_i-\bar{y})$ | $(x_i-\bar{x})^2$ | $(y_i-\bar{y})^2$ |
|---|---|---|---|---|---|---|
| 15 | 1200 | -10.7 | -273 | 2921.1 | 114.49 | 74529 |
| 18 | 1250 | -7.7 | -223 | 1717.1 | 59.29 | 49729 |
| 20 | 1300 | -5.7 | -173 | 986.1 | 32.49 | 29929 |
| 22 | 1350 | -3.7 | -123 | 455.1 | 13.69 | 15129 |
| 25 | 1450 | -0.7 | -23 | 16.1 | 0.49 | 529 |
| 27 | 1500 | 1.3 | 27 | 35.1 | 1.69 | 729 |
| 30 | 1600 | 4.3 | 127 | 546.1 | 18.49 | 16129 |
| 32 | 1650 | 6.3 | 177 | 1115.1 | 39.69 | 31329 |
| 33 | 1680 | 7.3 | 207 | 1511.1 | 53.29 | 42849 |
| 35 | 1750 | 9.3 | 277 | 2576.1 | 86.49 | 76729 |
| Sum | | | | 11878.9 | 420.10 | 337610 |

$r = \frac{11878.9}{\sqrt{420.10 \cdot 337610}} = \frac{11878.9}{\sqrt{141818603}} = \frac{11878.9}{11908.0} \approx 0.998$

Very strong positive correlation. Hotter days have higher electricity demand — driven mainly by cooling load (fans, air conditioning) in commercial and residential users. The relationship is nearly perfectly linear in this small sample.

### Spearman rank correlation

*Spearman's rank correlation coefficient is the Pearson correlation applied to the ranks of the data rather than the data themselves, providing a measure of monotonic (not necessarily linear) association that is more robust to outliers and works on ordinal data.*

Replace each value with its rank in its variable, then compute Pearson's $r$ on the ranks.

When the data is monotonically related but not linearly (e.g., $y$ grows exponentially with $x$), Pearson's $r$ is less than 1 but Spearman's is 1.

Useful when:
- The relationship is not linear.
- Outliers distort the Pearson correlation.
- Data is ordinal (rankings, ratings).

### Correlation vs causation

The most-stated and most-violated principle in statistics: **correlation does not imply causation.**

Two variables can be correlated without one causing the other:

- **Both caused by a third variable.** Ice cream sales and drowning deaths are correlated because both are caused by hot weather. Ice cream does not cause drowning.
- **Coincidence.** With enough variables and small samples, spurious correlations appear by chance.
- **Reverse causation.** $X$ may not cause $Y$; $Y$ may cause $X$.
- **Selection effects.** The sample may have been selected in a way that creates the correlation.

A research finding of correlation is the beginning of an investigation, not the end. Demonstrating causation requires either an experiment (where one variable is deliberately manipulated) or careful elimination of alternative explanations in observational data.

### Other association measures

For categorical data:
- **Chi-square** — tests association between two categorical variables. Chapter 6.
- **Cramér's V** — strength of association for categorical variables.
- **Phi coefficient** — for 2×2 categorical tables.

For mixed data types:
- **Point-biserial correlation** — between a binary variable and a continuous one.

For ordinal data:
- **Kendall's tau** — alternative to Spearman; uses concordant/discordant pair counts.

The choice of measure depends on the data types and the relationship's structure.

## 4.8 Simple regression analysis

Correlation says variables move together; regression says by how much.

### Simple linear regression

*Simple linear regression is the statistical method that fits a straight line to the relationship between two variables — an independent variable $X$ and a dependent variable $Y$ — providing a predictive equation $\hat{y} = a + b x$ and quantifying how much $Y$ changes per unit of $X$.*

The model:

$$
Y = a + b X + \epsilon
$$

where $a$ is the intercept (the value of $Y$ when $X = 0$), $b$ is the slope (the change in $Y$ per unit change in $X$), and $\epsilon$ is the error term.

### Estimating the parameters

The standard procedure is **Ordinary Least Squares (OLS)**: choose $a$ and $b$ to minimise the sum of squared errors:

$$
\sum_{i=1}^{n} (y_i - (a + b x_i))^2
$$

The closed-form solution:

$$
b = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}
$$

$$
a = \bar{y} - b \bar{x}
$$

### Worked example

Continuing with the temperature-demand data above:

$b = 11878.9 / 420.10 \approx 28.28$.

$a = 1473 - 28.28 \cdot 25.7 = 1473 - 726.79 = 746.21$.

Fitted regression equation:

$$
\hat{y} = 746.21 + 28.28 x
$$

**Interpretation.**
- Slope: each additional degree of temperature is associated with an additional 28.28 MW of peak demand.
- Intercept: at 0°C, the model predicts 746.21 MW of demand. (This is an extrapolation beyond the data range and not directly meaningful — the model does not say anything reliable about extreme cold.)

**Prediction.** For a day with temperature 28°C: $\hat{y} = 746.21 + 28.28 \cdot 28 = 746.21 + 791.84 = 1538.05$ MW.

### Goodness of fit

How well does the line fit the data?

**Coefficient of determination $R^2$.** The fraction of total variance in $Y$ explained by $X$:

$$
R^2 = \frac{\text{Explained variance}}{\text{Total variance}} = 1 - \frac{\text{Sum of squared residuals}}{\text{Sum of squared total}}
$$

For simple linear regression, $R^2 = r^2$ (the square of the Pearson correlation coefficient).

For our example: $R^2 = 0.998^2 \approx 0.996$. The line explains 99.6% of the variance in demand. A very good fit.

$R^2$ ranges from 0 to 1. Higher is better. But high $R^2$ does not guarantee a useful model — it could indicate overfitting, or just that the data lies on the line by chance with few points.

**Standard error of the estimate.** The standard deviation of the residuals — how much actual values typically differ from predicted values. Same units as $Y$. Often called RMSE in machine learning.

### Residual analysis

The **residual** for each observation is $e_i = y_i - \hat{y}_i$. Residuals should be:

- Roughly normally distributed (check with histogram or Q-Q plot).
- Have constant variance across the range of $X$ (homoscedasticity).
- Independent of each other (no autocorrelation).
- Independent of the fitted values (no pattern in a residual vs fitted plot).

Violations of these assumptions affect the validity of inferences from the regression. The diagnostic plots are essential — a regression with high $R^2$ but obvious patterns in the residuals is unreliable.

### Assumptions of simple linear regression

The Gauss-Markov assumptions:

1. **Linearity.** The true relationship is linear in the parameters.
2. **Independence.** Observations are independent.
3. **Homoscedasticity.** The variance of errors is constant across the range of $X$.
4. **No multicollinearity.** Not applicable in simple regression (only one $X$); becomes important in multiple regression.
5. **Normality of errors.** For confidence intervals and hypothesis tests on the coefficients.

If these assumptions hold, OLS produces the Best Linear Unbiased Estimator (BLUE) — the most efficient linear unbiased estimator of the regression parameters.

### Inference about the regression

Beyond point estimates, the researcher usually wants to:

**Test whether the slope is significantly different from zero.** Is there really a relationship between $X$ and $Y$?
- Null hypothesis: $b = 0$ (no relationship).
- Test statistic: $t = b / \text{SE}(b)$.
- Compare to critical $t$-value or compute $p$-value.

**Estimate confidence intervals for the slope.**
- $b \pm t_{\alpha/2, n-2} \cdot \text{SE}(b)$.

**Predict $Y$ for a given $X$ with confidence intervals.**
- Confidence interval for the mean response at $x_0$.
- Prediction interval for an individual response at $x_0$ (wider than the confidence interval).

These are covered in detail in Chapter 5 (hypothesis testing).

### Extensions to simple regression

The chapter has covered simple linear regression. Real research often needs more:

**Multiple regression.** More than one independent variable. $\hat{y} = a + b_1 x_1 + b_2 x_2 + \cdots + b_k x_k$. Handles multiple predictors simultaneously, with proper accounting for their joint behaviour.

**Polynomial regression.** $\hat{y} = a + b_1 x + b_2 x^2 + \cdots$. Linear in the parameters, non-linear in $X$. Used when the relationship is curved.

**Logistic regression.** For binary outcomes. Models the log-odds of $Y$ as a linear function of $X$. Covered in Chapter 3 of the ML subject.

**Non-linear regression.** Models with non-linear parameter dependence. Used in physical-process modelling.

**Robust regression.** Less sensitive to outliers than OLS. Various forms (Huber loss, RANSAC).

**Ridge and Lasso regression.** Regularised regression for high-dimensional problems. Lasso also performs feature selection.

A thesis that uses regression is likely to use one of these extensions rather than the simple version. The simple version is the foundation; the extensions handle realistic data complexity.

The next chapter takes the same idea of "what does the data really say?" further, into the formal framework of hypothesis testing.
