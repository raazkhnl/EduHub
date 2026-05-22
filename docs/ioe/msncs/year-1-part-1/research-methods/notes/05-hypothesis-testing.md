---
title: 'Chapter 5 — Testing of Hypotheses'
sidebar_label: 'Ch 05 — Testing of Hypotheses'
sidebar_position: 5
description: 'Chapter 5 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch05
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Most quantitative research ends with a question of the form "is this difference real, or could it have arisen by chance?" Hypothesis testing is the formal procedure that answers such questions. The framework was developed in the early twentieth century by R.A. Fisher, Jerzy Neyman, and Egon Pearson; refined in countless statistics textbooks since; and remains the standard of practice in engineering, biomedical, social science, and policy research. This chapter covers the framework, the standard tests, and the typical traps. The chapter is heavily numerical, with worked examples that demonstrate the standard tests on data shaped like real research problems in Nepal.

## 5.1 Definition of hypothesis

### Hypothesis

*A hypothesis is a tentative, testable, and falsifiable statement that proposes a relationship between variables or a value for a population parameter, formulated before data collection so that the analysis can either support or contradict it.*

A hypothesis is a claim that data can refute. "More awareness training reduces phishing-click rates among Nepali bank employees" is a hypothesis. "Cybersecurity is important" is not — it is a value statement, not a refutable claim about the world.

The Chapter 1 definition is the substantive one. The statistical apparatus in this chapter operationalises it.

### Null and alternative hypotheses

Hypothesis testing pits two competing statements against each other.

*The null hypothesis $H_0$ is the statement that there is no effect, no difference, or no relationship in the population, the default position the researcher must produce evidence against.*

*The alternative hypothesis $H_1$ (or $H_a$) is the statement that there is an effect, a difference, or a relationship, the position the researcher must accumulate evidence for.*

The framework is asymmetric. The null hypothesis is "innocent until proven guilty" — the default that holds unless the data shows otherwise. The alternative hypothesis is "what we are trying to demonstrate." If the data does not provide enough evidence against $H_0$, the researcher "fails to reject" $H_0$ — not "accepts $H_0$ as true."

**Example.** A researcher tests whether a new fraud-detection model has different F1-score than the existing model.

- $H_0$: F1-score of the new model = F1-score of the existing model.
- $H_1$: F1-score of the new model ≠ F1-score of the existing model.

The data either rejects $H_0$ (the new model is significantly different) or fails to reject it (no evidence of difference).

### Simple and composite hypotheses

**Simple hypothesis.** Specifies a single value for the parameter. "$H_0$: mean response time = 250 ms."

**Composite hypothesis.** Specifies a set of values. "$H_1$: mean response time > 250 ms" — every value above 250 satisfies the hypothesis.

### One-tailed vs two-tailed hypotheses

**Two-tailed test.** $H_1$ is non-directional. "$H_1$: mean ≠ 250 ms." Rejection region is in both tails of the distribution.

**One-tailed test.** $H_1$ is directional. "$H_1$: mean > 250 ms" (right-tailed) or "$H_1$: mean < 250 ms" (left-tailed). Rejection region is in one tail only.

One-tailed tests have more power to detect an effect in the specified direction but cannot detect an effect in the opposite direction. The choice between one-tailed and two-tailed must be made before looking at the data, on the basis of the research question.

For most research, two-tailed tests are the default. One-tailed tests are used when there is a strong prior reason to expect the effect in a specific direction and the opposite direction would be of no interest.

## 5.2 Basic concepts in hypothesis testing

Several concepts run through every test.

### Type I and Type II errors

The test has four possible outcomes, depending on the true state and the test's decision:

| | $H_0$ is true | $H_0$ is false |
|---|---|---|
| Reject $H_0$ | **Type I error** (false positive) | Correct decision |
| Fail to reject $H_0$ | Correct decision | **Type II error** (false negative) |

*A Type I error is rejecting the null hypothesis when it is actually true — concluding there is an effect when there is none, also called a false positive.*

*A Type II error is failing to reject the null hypothesis when it is actually false — failing to detect a real effect, also called a false negative.*

The probability of a Type I error is denoted $\alpha$ (alpha). The probability of a Type II error is denoted $\beta$ (beta).

### Significance level

*The significance level $\alpha$ is the maximum acceptable probability of making a Type I error, chosen by the researcher before the test, with $\alpha = 0.05$ as the standard convention.*

A significance level of 0.05 means: "I am willing to falsely declare an effect (Type I error) at most 5% of the time when in fact there is no effect."

Common choices:
- $\alpha = 0.05$ — the standard in most fields.
- $\alpha = 0.01$ — used when false positives are particularly costly.
- $\alpha = 0.10$ — used in exploratory analysis or with small samples.

The choice of $\alpha$ is a value judgement about how much false-positive risk is tolerable. It is not derivable from the data.

### Power and Type II error rate

*The power of a test is the probability of correctly rejecting the null hypothesis when it is false, equal to $1 - \beta$, conventionally set at or above 0.80 in research planning.*

Power depends on:
- The true effect size — larger effects are easier to detect.
- The sample size — larger samples have more power.
- The significance level $\alpha$ — a stricter $\alpha$ (smaller value) reduces power.
- The variance of the data — less variance gives more power.

A power analysis at the design stage (Chapter 2) ensures that a planned study has enough power to detect the effect of interest. A study with low power can produce a non-significant result for either of two very different reasons — the effect is genuinely absent, or the effect is real but the study was too small to detect it.

### Test statistic

*A test statistic is a numerical summary computed from the sample data that has a known distribution under the null hypothesis, used to decide whether the data are consistent with $H_0$ or constitute evidence against it.*

Each test has its own test statistic — $z$ for the $z$-test, $t$ for the $t$-test, $\chi^2$ for the chi-square test, $F$ for the $F$-test. The test statistic measures, in standardised units, how far the observed data is from what $H_0$ would predict.

A test statistic far from zero is evidence against $H_0$. A test statistic close to zero is consistent with $H_0$.

### p-value

*The p-value is the probability, under the assumption that the null hypothesis is true, of observing a test statistic at least as extreme as the one actually observed.*

The $p$-value translates the test statistic into a probability scale that is directly comparable to $\alpha$.

**Decision rule.**
- If $p \leq \alpha$, reject $H_0$. The observed data is unlikely under $H_0$.
- If $p > \alpha$, fail to reject $H_0$. The data is consistent with $H_0$.

A $p$-value of 0.03 means: "If $H_0$ were true, we would see a test statistic this extreme only 3% of the time." If our chosen $\alpha$ is 0.05, this is unusual enough to reject $H_0$.

**Common misinterpretations.**

The $p$-value is **not** the probability that $H_0$ is true. That would be a Bayesian posterior, which requires a prior probability for $H_0$. The $p$-value is a frequentist quantity: probability of data given $H_0$, not probability of $H_0$ given data.

The $p$-value is **not** the probability of making an error. The error probabilities are $\alpha$ and $\beta$.

A small $p$-value does **not** mean the effect is large or important. It only means the effect is unlikely to be zero. The effect could be tiny but statistically significant if the sample is huge.

### Critical value and rejection region

The critical value $c$ is the threshold beyond which the test statistic is considered too extreme to be consistent with $H_0$. The rejection region is the set of test-statistic values that lead to rejection of $H_0$.

For a two-tailed test with $\alpha = 0.05$ using the standard normal distribution: critical values are $\pm 1.96$. Reject $H_0$ if $|z| > 1.96$. The rejection region is $(-\infty, -1.96) \cup (1.96, \infty)$.

For a one-tailed test with $\alpha = 0.05$ (right-tailed): critical value is 1.645. Reject if $z > 1.645$.

The $p$-value and critical-value approaches give the same decision. They are alternative views of the same procedure.

### Sampling distribution

*A sampling distribution is the probability distribution of a statistic (such as the sample mean) computed from all possible samples of a given size drawn from the population, the foundation on which hypothesis tests rest.*

For a sample mean drawn from a population with mean $\mu$ and standard deviation $\sigma$, the sampling distribution of $\bar{x}$ has mean $\mu$ and standard deviation $\sigma / \sqrt{n}$ — the **standard error**.

By the **Central Limit Theorem**, the sampling distribution of $\bar{x}$ approaches a normal distribution as $n$ grows, regardless of the population's distribution (provided the population has finite variance). This is why the $z$-test and $t$-test work for a wide range of populations.

## 5.3 Procedure for hypothesis testing

The general procedure has six steps. Every parametric test follows the same shape.

1. **State the hypotheses.** Specify $H_0$ and $H_1$. Decide one-tailed or two-tailed.
2. **Choose the significance level.** $\alpha = 0.05$ is the default.
3. **Identify the appropriate test.** Based on the type of data, the parameter being tested, the sample size, and the assumptions that can be reasonably made.
4. **Compute the test statistic.** From the sample data, using the test's formula.
5. **Compare to critical value or compute the $p$-value.** Use the known distribution of the test statistic under $H_0$.
6. **Make a decision and interpret.** Reject or fail to reject $H_0$. State the substantive conclusion in plain language.

The steps are mechanical once the test is chosen. The judgement is in steps 1-3. The interpretation is in step 6.

## 5.4 Important parametric tests

The four standard parametric tests cover most situations.

### z-test

*The z-test is a parametric test that uses the standard normal distribution as the sampling distribution of the test statistic, appropriate when the population standard deviation is known or when the sample size is large enough (typically $n \geq 30$) that the sample standard deviation can be used in its place.*

For testing whether a sample mean differs from a hypothesised population mean $\mu_0$:

$$
z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
$$

When $\sigma$ is unknown and $n$ is large, replace $\sigma$ with the sample standard deviation $s$:

$$
z = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}
$$

**When to use:**
- Sample size is large ($n \geq 30$).
- Or the population is known to be normal and $\sigma$ is known.
- Testing means or proportions.

**Critical values for common $\alpha$:**

| $\alpha$ | Two-tailed | One-tailed |
|---|---|---|
| 0.10 | $\pm 1.645$ | $1.282$ |
| 0.05 | $\pm 1.96$ | $1.645$ |
| 0.01 | $\pm 2.576$ | $2.326$ |

### t-test

*The t-test is a parametric test that uses Student's t distribution as the sampling distribution of the test statistic, appropriate when the population standard deviation is unknown and must be estimated from the sample, particularly suited to small samples ($n < 30$) from approximately normal populations.*

The $t$-statistic looks similar to the $z$-statistic:

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}
$$

The difference is the reference distribution. The $t$-distribution has heavier tails than the normal — accounting for the extra uncertainty when $\sigma$ is estimated from a small sample.

The $t$-distribution depends on its **degrees of freedom (df)**. For a one-sample $t$-test, df = $n - 1$. As df grows, the $t$-distribution approaches the normal distribution. For df > 30, the two are very close — which is why the $z$-test is acceptable for large samples even when $\sigma$ is unknown.

**Critical values from the $t$-table** depend on both $\alpha$ and df. A $t$-table or statistical software lookup is needed.

For df = 9 (a sample of 10):
- Two-tailed $\alpha = 0.05$: $t_{\text{crit}} = \pm 2.262$.
- Two-tailed $\alpha = 0.01$: $t_{\text{crit}} = \pm 3.250$.

For df = 29 (a sample of 30):
- Two-tailed $\alpha = 0.05$: $t_{\text{crit}} = \pm 2.045$.

### Chi-square test for variance

The $\chi^2$ test has several uses. As a test for variance:

$$
\chi^2 = \frac{(n-1) s^2}{\sigma_0^2}
$$

Used to test whether a sample variance differs from a hypothesised population variance $\sigma_0^2$. The test statistic follows a chi-square distribution with $n - 1$ degrees of freedom.

The chi-square distribution is right-skewed and depends on df. The critical values come from a chi-square table.

The chi-square test as a non-parametric test (for goodness-of-fit, independence, and homogeneity) is covered in Chapter 6.

### F-test

*The F-test is a parametric test that uses the F distribution as the sampling distribution of the test statistic, used to compare two variances and as the foundational test in analysis of variance (ANOVA).*

For testing whether two population variances are equal, the test statistic is the ratio of sample variances:

$$
F = \frac{s_1^2}{s_2^2}
$$

with $s_1^2$ being the larger variance (so $F \geq 1$). The test statistic follows an $F$ distribution with $n_1 - 1$ and $n_2 - 1$ degrees of freedom.

The $F$ distribution depends on two df parameters. Critical values come from an $F$ table.

### Comparing the four tests

| Test | Tests | Sample size | Population variance | Reference distribution |
|---|---|---|---|---|
| z-test | Mean or proportion | Large ($n \geq 30$) | Known or large $n$ | Standard normal |
| t-test | Mean | Small or large | Unknown | Student's $t$ |
| Chi-square | Variance, fit | Any | Implicit | Chi-square |
| F-test | Variance ratio, ANOVA | Any | Both estimated | F |

The decision of which test to use depends on what is being tested, what is known, and what assumptions are reasonable.

## 5.5 Hypothesis testing of means

The most common hypothesis-testing problem: is the mean of one (or more) populations equal to a hypothesised value, or do two means differ from each other?

### One-sample test of a mean

**Question.** Does the population mean equal a specific value $\mu_0$?

**Hypotheses.**
- $H_0$: $\mu = \mu_0$.
- $H_1$: $\mu \neq \mu_0$ (two-tailed), or $\mu > \mu_0$ (right-tailed), or $\mu < \mu_0$ (left-tailed).

**Test statistic.**

For large samples or known $\sigma$:

$$
z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
$$

For small samples with $\sigma$ unknown:

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}, \quad df = n - 1
$$

**Worked example.** NEA claims that the average daily peak demand on the integrated Nepal grid in October is 1800 MW. A sample of 25 randomly chosen October days from the past five years gives a mean of 1850 MW and a standard deviation of 120 MW. Is there evidence the actual mean differs from 1800?

- $H_0$: $\mu = 1800$.
- $H_1$: $\mu \neq 1800$.
- $\alpha = 0.05$.
- Test: one-sample $t$ (unknown $\sigma$, $n = 25$).

Compute:

$$
t = \frac{1850 - 1800}{120 / \sqrt{25}} = \frac{50}{24} \approx 2.083
$$

df = 24.

Two-tailed critical value at $\alpha = 0.05$ with df = 24: $t_{\text{crit}} \approx \pm 2.064$.

Since $|t| = 2.083 > 2.064$, reject $H_0$.

**Conclusion.** The evidence (at $\alpha = 0.05$) suggests the actual average October peak demand differs from 1800 MW. The sample mean of 1850 MW is statistically significantly higher than the claimed value.

### Two-sample test of means (independent samples)

**Question.** Do two populations have the same mean?

**Hypotheses.**
- $H_0$: $\mu_1 = \mu_2$ (equivalently, $\mu_1 - \mu_2 = 0$).
- $H_1$: $\mu_1 \neq \mu_2$.

**Test statistic.** Assuming equal variances (pooled-variance $t$-test):

$$
t = \frac{\bar{x}_1 - \bar{x}_2}{s_p \sqrt{1/n_1 + 1/n_2}}
$$

where the pooled standard deviation is:

$$
s_p = \sqrt{\frac{(n_1 - 1) s_1^2 + (n_2 - 1) s_2^2}{n_1 + n_2 - 2}}
$$

df = $n_1 + n_2 - 2$.

For unequal variances (Welch's $t$-test):

$$
t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{s_1^2 / n_1 + s_2^2 / n_2}}
$$

with a more complex df formula (the Welch-Satterthwaite approximation).

**Worked example.** Two ML models for fraud detection are evaluated on independent samples of 30 transactions each from the same eSewa stream.

Model A: mean precision 0.85, standard deviation 0.06.
Model B: mean precision 0.81, standard deviation 0.07.

Test whether the means differ.

- $H_0$: $\mu_A = \mu_B$.
- $H_1$: $\mu_A \neq \mu_B$.
- $\alpha = 0.05$.
- Test: two-sample $t$.

Compute pooled standard deviation:

$$
s_p = \sqrt{\frac{(30-1)(0.06)^2 + (30-1)(0.07)^2}{30 + 30 - 2}} = \sqrt{\frac{29 \cdot 0.0036 + 29 \cdot 0.0049}{58}} = \sqrt{\frac{0.2465}{58}} = \sqrt{0.00425} \approx 0.0652
$$

Test statistic:

$$
t = \frac{0.85 - 0.81}{0.0652 \cdot \sqrt{1/30 + 1/30}} = \frac{0.04}{0.0652 \cdot \sqrt{0.0667}} = \frac{0.04}{0.0652 \cdot 0.2582} = \frac{0.04}{0.01683} \approx 2.376
$$

df = 58.

Two-tailed critical value at $\alpha = 0.05$ with df = 58: $t_{\text{crit}} \approx \pm 2.002$.

$|t| = 2.376 > 2.002$. Reject $H_0$.

**Conclusion.** The evidence suggests Model A's mean precision is significantly higher than Model B's at $\alpha = 0.05$.

## 5.6 Hypothesis testing for comparing two related samples

When the two samples are paired — same subjects measured under two conditions, before-and-after measurements, matched pairs — the standard two-sample test is wrong because it assumes independence.

### Paired t-test

**Question.** Is the mean difference within pairs equal to zero?

**Hypotheses.**
- $H_0$: $\mu_d = 0$, where $d_i = x_{i,1} - x_{i,2}$.
- $H_1$: $\mu_d \neq 0$.

**Test statistic.**

$$
t = \frac{\bar{d}}{s_d / \sqrt{n}}, \quad df = n - 1
$$

where $\bar{d}$ is the mean of the differences and $s_d$ is the standard deviation of the differences.

**Worked example.** A cybersecurity-awareness training program is delivered to 8 employees at a Nepali commercial bank. Phishing-click rates (% of test phishing emails clicked) are measured before and after the training.

| Employee | Before (%) | After (%) | Difference $d_i$ |
|---|---|---|---|
| 1 | 40 | 25 | -15 |
| 2 | 50 | 30 | -20 |
| 3 | 35 | 30 | -5 |
| 4 | 45 | 20 | -25 |
| 5 | 30 | 25 | -5 |
| 6 | 55 | 35 | -20 |
| 7 | 40 | 30 | -10 |
| 8 | 50 | 25 | -25 |

- $H_0$: mean difference = 0 (training had no effect).
- $H_1$: mean difference ≠ 0.
- $\alpha = 0.05$.

Mean of differences: $\bar{d} = (-15 -20 -5 -25 -5 -20 -10 -25)/8 = -125/8 = -15.625$.

Compute the variance of the differences:

$(d_i - \bar{d})^2$:
$(-15 - (-15.625))^2 = 0.625^2 = 0.391$
$(-20 - (-15.625))^2 = (-4.375)^2 = 19.141$
$(-5 - (-15.625))^2 = 10.625^2 = 112.891$
$(-25 - (-15.625))^2 = (-9.375)^2 = 87.891$
$(-5 - (-15.625))^2 = 10.625^2 = 112.891$
$(-20 - (-15.625))^2 = (-4.375)^2 = 19.141$
$(-10 - (-15.625))^2 = 5.625^2 = 31.641$
$(-25 - (-15.625))^2 = (-9.375)^2 = 87.891$

Sum = 471.878.

$s_d^2 = 471.878 / 7 \approx 67.41$, $s_d \approx 8.21$.

Test statistic:

$$
t = \frac{-15.625}{8.21 / \sqrt{8}} = \frac{-15.625}{2.903} \approx -5.382
$$

df = 7.

Two-tailed critical value at $\alpha = 0.05$ with df = 7: $t_{\text{crit}} \approx \pm 2.365$.

$|t| = 5.382 > 2.365$. Reject $H_0$.

**Conclusion.** The training significantly reduces the phishing-click rate. The mean reduction is about 15.6 percentage points; the test indicates this is unlikely to have arisen by chance.

### Non-parametric alternatives

When the difference distribution is not approximately normal, two non-parametric tests are common.

**Sign test.** Counts how many differences are positive vs negative. Simple but low power. Useful for ordinal data.

**Wilcoxon signed-rank test.** Uses the ranks of the absolute differences along with their signs. More powerful than the sign test. Standard non-parametric alternative to the paired t-test.

## 5.7 Hypothesis testing of proportions

When the variable being tested is a proportion (a fraction or percentage), the framework adapts.

### One-sample test of a proportion

**Question.** Does the population proportion equal a hypothesised value $p_0$?

**Hypotheses.**
- $H_0$: $p = p_0$.
- $H_1$: $p \neq p_0$.

**Test statistic.** For large samples (rule of thumb: $np_0 \geq 5$ and $n(1 - p_0) \geq 5$):

$$
z = \frac{\hat{p} - p_0}{\sqrt{p_0 (1 - p_0) / n}}
$$

where $\hat{p}$ is the sample proportion.

**Worked example.** A study claims that 70% of Nepali bank customers use mobile banking. In a random sample of 200 customers, 130 use mobile banking. Test whether the population proportion equals 70%.

- $H_0$: $p = 0.70$.
- $H_1$: $p \neq 0.70$.
- $\alpha = 0.05$.
- $\hat{p} = 130/200 = 0.65$.

Check conditions: $n p_0 = 200 \cdot 0.70 = 140 \geq 5$, $n(1-p_0) = 60 \geq 5$. OK.

Compute:

$$
z = \frac{0.65 - 0.70}{\sqrt{0.70 \cdot 0.30 / 200}} = \frac{-0.05}{\sqrt{0.00105}} = \frac{-0.05}{0.0324} \approx -1.543
$$

Two-tailed critical value at $\alpha = 0.05$: $\pm 1.96$.

$|z| = 1.543 < 1.96$. Fail to reject $H_0$.

**Conclusion.** The evidence is not sufficient at $\alpha = 0.05$ to reject the claim that the population proportion is 70%. The sample suggests a lower value (65%), but the difference could be due to sampling variability.

### Two-sample test of proportions

**Question.** Do two populations have the same proportion?

**Hypotheses.**
- $H_0$: $p_1 = p_2$.
- $H_1$: $p_1 \neq p_2$.

**Test statistic.** With pooled proportion $\hat{p} = (x_1 + x_2)/(n_1 + n_2)$:

$$
z = \frac{\hat{p}_1 - \hat{p}_2}{\sqrt{\hat{p}(1 - \hat{p}) \cdot (1/n_1 + 1/n_2)}}
$$

The pooled proportion is used because under $H_0$ the two populations share a common proportion.

**Worked example.** Comparing phishing-click rates between branches of a bank: in Branch A, 18 of 100 employees clicked a test phishing email; in Branch B, 32 of 150 clicked.

- $H_0$: $p_A = p_B$.
- $H_1$: $p_A \neq p_B$.
- $\alpha = 0.05$.

$\hat{p}_A = 0.18$, $\hat{p}_B = 0.213$, $\hat{p} = (18 + 32)/(100 + 150) = 50/250 = 0.20$.

$$
z = \frac{0.18 - 0.213}{\sqrt{0.20 \cdot 0.80 \cdot (1/100 + 1/150)}} = \frac{-0.033}{\sqrt{0.16 \cdot 0.01667}} = \frac{-0.033}{\sqrt{0.002667}} = \frac{-0.033}{0.0516} \approx -0.640
$$

Two-tailed critical value at $\alpha = 0.05$: $\pm 1.96$.

$|z| = 0.640 < 1.96$. Fail to reject $H_0$.

**Conclusion.** No evidence of a difference in click rates between the two branches at $\alpha = 0.05$. The 3-percentage-point difference observed is consistent with sampling variability.

## 5.8 Testing equality of variances

Sometimes the question is not about means but about variances — are two populations equally variable?

### F-test for equality of two variances

**Hypotheses.**
- $H_0$: $\sigma_1^2 = \sigma_2^2$.
- $H_1$: $\sigma_1^2 \neq \sigma_2^2$.

**Test statistic.**

$$
F = \frac{s_1^2}{s_2^2}
$$

By convention, place the larger sample variance in the numerator so $F \geq 1$. Under $H_0$, $F$ follows an $F$ distribution with $n_1 - 1$ and $n_2 - 1$ degrees of freedom.

**Worked example.** Comparing the response-time variability of two web servers handling Nepali e-commerce traffic. From 20 requests each:

- Server A: $s_A^2 = 144 \text{ ms}^2$ (so $s_A = 12$ ms).
- Server B: $s_B^2 = 81 \text{ ms}^2$ (so $s_B = 9$ ms).

- $H_0$: $\sigma_A^2 = \sigma_B^2$.
- $H_1$: $\sigma_A^2 \neq \sigma_B^2$.
- $\alpha = 0.05$.

$$
F = \frac{144}{81} \approx 1.778
$$

For a two-tailed test with df = (19, 19), critical value at $\alpha = 0.05$: approximately $F_{\text{crit}} \approx 2.526$ (the upper-tail value at $\alpha/2 = 0.025$).

$F = 1.778 < 2.526$. Fail to reject $H_0$.

**Conclusion.** No evidence the two servers have different response-time variability at $\alpha = 0.05$.

### Robustness considerations

The $F$-test is sensitive to non-normality. For real data that may not be normally distributed, **Levene's test** or **Bartlett's test** are commonly used alternatives. Most statistical software offers both.

The reason for testing equality of variances is often as a preliminary check for a subsequent t-test — the pooled-variance t-test assumes equal variances. If the F-test (or Levene's test) rejects equality, the modern practice is to use Welch's t-test, which does not assume equal variances.

## 5.9 Hypothesis testing of correlation coefficients

Is an observed correlation significantly different from zero?

### t-test for the significance of r

**Question.** Is the population correlation $\rho$ different from zero?

**Hypotheses.**
- $H_0$: $\rho = 0$.
- $H_1$: $\rho \neq 0$.

**Test statistic.**

$$
t = r \sqrt{\frac{n - 2}{1 - r^2}}, \quad df = n - 2
$$

**Worked example.** From the temperature-demand data in Chapter 4: $r = 0.998$ with $n = 10$. Test whether the population correlation is different from zero.

$$
t = 0.998 \sqrt{\frac{10 - 2}{1 - 0.998^2}} = 0.998 \sqrt{\frac{8}{0.003996}} = 0.998 \cdot \sqrt{2002.0} = 0.998 \cdot 44.74 \approx 44.65
$$

df = 8.

Two-tailed critical value at $\alpha = 0.05$ with df = 8: $t_{\text{crit}} \approx \pm 2.306$.

$|t| = 44.65$, vastly greater than 2.306. Reject $H_0$ overwhelmingly.

**Conclusion.** The correlation is strongly significant. Temperature and electricity demand are correlated in the population, not just in this sample.

A correlation of 0.998 with only 10 observations is unusually high — real data is messier. For a more realistic case with $r = 0.30$ and $n = 50$:

$$
t = 0.30 \sqrt{\frac{48}{1 - 0.09}} = 0.30 \sqrt{52.75} = 0.30 \cdot 7.263 \approx 2.179
$$

df = 48. Two-tailed critical value at $\alpha = 0.05$: $\pm 2.011$.

$|t| = 2.179 > 2.011$. Reject $H_0$. A correlation of 0.30 with 50 observations is statistically significant — even though the correlation is moderate, the sample is large enough to detect it.

### Testing equality of two correlation coefficients

To test whether correlations from two different populations are equal, use **Fisher's z transformation**:

$$
z_r = \frac{1}{2} \ln \frac{1 + r}{1 - r}
$$

The transformed value is approximately normally distributed. The test compares $z_{r_1} - z_{r_2}$ against the appropriate normal critical value.

## 5.10 Limitations of tests of hypotheses

The hypothesis-testing framework is powerful but has known limitations. Awareness of them is part of methodological maturity.

### Statistical vs practical significance

A statistically-significant result is not necessarily an important result. With a large enough sample, a tiny effect can be statistically significant.

If a new fraud-detection model has F1-score 0.821 vs a baseline's 0.820, with 100,000 transactions in the comparison, the difference may be statistically significant ($p < 0.001$) but practically meaningless — the operational improvement is undetectable.

Always report effect sizes alongside $p$-values. The effect size measures *how much* difference, not just whether it differs from zero. Common effect-size measures include Cohen's $d$ (for means), $r$ or $R^2$ (for correlation/regression), and odds ratios (for proportions).

### The multiple-testing problem

Running many tests inflates the chance of false positives. If 20 tests are run at $\alpha = 0.05$ on data where every $H_0$ is true, on average one test will reject by chance.

Remedies:
- **Bonferroni correction.** Use $\alpha / k$ as the significance level for each of $k$ tests. Conservative.
- **Holm correction.** Less conservative than Bonferroni; still controls the family-wise error rate.
- **Benjamini-Hochberg.** Controls the false discovery rate rather than the family-wise error rate. Standard in genomics and many ML evaluations.
- **Pre-registration.** State the hypotheses in advance; resist the temptation to test many more in pursuit of "significant" results.

### p-hacking and fishing

When researchers run many analyses and report only the significant ones, the published $p$-values lose their nominal meaning. This is **p-hacking**.

A study that tests 20 different specifications of a model and reports the one with $p < 0.05$ has not actually produced evidence at $p = 0.05$. The effective $\alpha$ is much higher.

The remedies above apply. Additionally:
- Distinguish exploratory from confirmatory analysis. Exploratory analysis can run many tests; the results are hypotheses to be tested in a separate confirmatory study.
- Report all analyses run, not just the favourable ones.
- Pre-register hypotheses and analysis plans when possible.

### Violation of assumptions

Every parametric test has assumptions. Common violations:

- **Non-normality.** Most tests assume the underlying data (or the sampling distribution of the statistic) is approximately normal. Severe non-normality, especially with small samples, can invalidate the test.
- **Non-independence.** Most tests assume observations are independent. Cluster effects, time-series autocorrelation, and group-based sampling violate this.
- **Unequal variances.** Pooled-variance tests assume equal variances; Welch's test does not.
- **Outliers.** Extreme values can drive significance or hide it.

Diagnostic checks — Q-Q plots, residual plots, Levene's tests — should be standard before reporting test results.

### Power and small samples

A non-significant result from a small study does not mean the effect is absent. It may mean the study lacked the power to detect it.

Reporting "we found no effect" without a power analysis is misleading. The honest report is "we did not have the power to detect effects smaller than X."

### The replication crisis

Since around 2011, many fields have discovered that a large fraction of published "significant" results do not replicate. Causes include:
- Publication bias (significant results are more publishable).
- $p$-hacking.
- Low power.
- Researcher degrees of freedom (many analytical choices, each plausible).
- Outright fraud (rare but documented).

Cybersecurity and computer science have their own version of the crisis around benchmark gaming and unreproducible results. The community responses — pre-registration, open data, open code, replication studies — are spreading.

### Effect size and confidence intervals

Modern best practice: report effect sizes and confidence intervals alongside (or instead of) $p$-values.

The American Statistical Association's 2016 statement on $p$-values warned against treating "$p < 0.05$" as a hard line. The 2019 ASA statement went further, suggesting that researchers should "abandon" the use of "statistical significance" as a yes/no criterion.

A confidence interval communicates more than a $p$-value: the size of the effect, the precision of the estimate, and whether zero is plausible. A 95% confidence interval for the difference of means of [-0.5, 5.5] tells the reader much more than "$p = 0.06$."

### The right frame of mind

Hypothesis testing is a tool, not a verdict. It quantifies the strength of evidence; it does not establish truth. The interpretation requires:

- Domain knowledge — what effect size matters?
- Methodological awareness — what assumptions are being made?
- Replication — does the result hold up in independent samples?
- Honest reporting — limitations, alternative explanations, what was tried.

A thesis or paper that handles these well produces credible knowledge. One that treats $p < 0.05$ as the final word does not.

The next chapter takes hypothesis testing further into two specific frameworks — the chi-square test for categorical data and analysis of variance for comparing multiple means at once.
