---
title: 'Chapter 6 — Chi-Square Test and ANOVA'
sidebar_label: 'Ch 06 — Chi-Square Test and ANOVA'
sidebar_position: 6
description: 'Chapter 6 of Research Methods (ENCTNS504).'
slug: /ioe/msncs/year-1-part-1/research-methods/notes/ch06
tags: [msncs, ENCTNS504, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The previous chapter introduced parametric tests for means, proportions, and variances. This chapter covers two specific tests that recur in research: the **chi-square ($\chi^2$) test**, which extends hypothesis testing to categorical data and to comparisons of frequencies; and **analysis of variance (ANOVA)**, which extends hypothesis testing of means to comparisons of three or more groups simultaneously. Both are workhorses of applied research — most quantitative theses use at least one of them. The chapter is heavy on worked numerical examples.

## 6.1 Chi-square as a test for comparing variance

The chi-square distribution appears in several roles in statistics. As an inferential tool for a single sample's variance, it provides a test that complements the $F$-test (which compares two variances).

### Testing a single variance against a hypothesised value

**Question.** Does the population variance equal a specified value $\sigma_0^2$?

**Hypotheses.**
- $H_0$: $\sigma^2 = \sigma_0^2$.
- $H_1$: $\sigma^2 \neq \sigma_0^2$.

**Test statistic.**

$$
\chi^2 = \frac{(n-1) s^2}{\sigma_0^2}
$$

Under $H_0$, this statistic follows a chi-square distribution with $n - 1$ degrees of freedom.

The chi-square distribution is right-skewed and lives only on the non-negative axis. Critical values come from a $\chi^2$ table. For a two-tailed test at significance level $\alpha$, the critical values are $\chi^2_{\alpha/2, n-1}$ (upper) and $\chi^2_{1-\alpha/2, n-1}$ (lower).

**Worked example.** A SCADA operator at NEA claims that the variance of measured voltage fluctuations on a 132 kV substation is 4 kV². A sample of 25 measurements during one morning peak gives a sample variance of 6.5 kV². Is the actual variance different from the claimed value?

- $H_0$: $\sigma^2 = 4$.
- $H_1$: $\sigma^2 \neq 4$.
- $\alpha = 0.05$, df = 24.

Compute:

$$
\chi^2 = \frac{24 \cdot 6.5}{4} = \frac{156}{4} = 39.0
$$

Critical values from the $\chi^2$ table for df = 24:
- Upper ($\alpha/2 = 0.025$): $\chi^2_{0.025, 24} \approx 39.36$.
- Lower ($1 - \alpha/2 = 0.975$): $\chi^2_{0.975, 24} \approx 12.40$.

Decision: $\chi^2 = 39.0$ is just below the upper critical value of 39.36. Fail to reject $H_0$ at $\alpha = 0.05$.

**Conclusion.** The evidence does not quite reach significance at $\alpha = 0.05$. The sample variance (6.5) is higher than the claimed value (4), but a result this extreme could plausibly arise by sampling chance from a population with the claimed variance.

### A note on test sensitivity

The chi-square test for variance is very sensitive to departures from normality — far more than the $t$-test is for means. If the underlying data is even mildly non-normal, the test's results can be misleading. For practical use, the test should be combined with a normality check (Shapiro-Wilk test, Q-Q plot) before relying on its conclusion.

## 6.2 Chi-square as a non-parametric test

The chi-square test's more common use is **non-parametric** — it does not assume any particular distribution of the underlying data. The two standard uses:

### Goodness-of-fit test

**Question.** Does the observed frequency distribution match a hypothesised distribution?

**Hypotheses.**
- $H_0$: the observed distribution matches the expected.
- $H_1$: the observed distribution differs from the expected.

**Test statistic.**

$$
\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}
$$

where $O_i$ is the observed frequency in category $i$, $E_i$ is the expected frequency under $H_0$, and $k$ is the number of categories. Degrees of freedom: $df = k - 1$ (minus additional df for any parameters estimated from the data).

### Test of independence

**Question.** Are two categorical variables independent in the population?

**Hypotheses.**
- $H_0$: the variables are independent.
- $H_1$: the variables are associated.

Data is presented in a **contingency table** with rows for one variable and columns for the other. The test statistic is the same formula as above, but applied to the cells of the contingency table.

Expected frequencies under independence:

$$
E_{ij} = \frac{(\text{row total}_i) \cdot (\text{column total}_j)}{\text{grand total}}
$$

Degrees of freedom for an $r \times c$ table: $df = (r-1)(c-1)$.

### Test of homogeneity

**Question.** Are two or more populations identical in their distribution across categories?

Mathematically identical to the test of independence. The framing is different — "are these subpopulations all drawn from the same distribution?" rather than "are these variables associated?"

## 6.3 Conditions for the application of the chi-square test

The chi-square test rests on several conditions. Violations make the test unreliable.

**Independence of observations.** Each observation must contribute to exactly one cell. Repeated measurements on the same subject across cells violate this.

**Random sampling.** The data should come from a random or otherwise appropriate sample of the population.

**Adequate expected frequencies.** A standard rule of thumb (Cochran's rule): all expected frequencies should be at least 1, and no more than 20% of expected frequencies should be less than 5. For 2×2 tables, all expected frequencies should be at least 5.

When expected frequencies are too small, remedies include:
- Combining sparse categories into broader ones.
- Using **Fisher's exact test** instead of chi-square for 2×2 tables.
- Increasing the sample size.

**Mutually exclusive categories.** Each observation belongs to exactly one cell.

**Sufficient sample size.** Small samples (below 30 or so) can produce unstable chi-square estimates even when expected frequencies appear adequate.

**Use of frequencies, not percentages or rates.** The chi-square formula applies to counts, not derived quantities.

For research papers and theses, all of these conditions should be checked and documented. A table that violates them should either be remedied (combining categories) or analysed with an alternative test (Fisher's exact, Monte Carlo simulation).

## 6.4 Steps in applying the chi-square test

The procedure has a standard shape regardless of whether it is goodness-of-fit, independence, or homogeneity:

1. **State the hypotheses.** $H_0$ and $H_1$ in words and in terms of the cell probabilities.
2. **Choose significance level.** $\alpha$, conventionally 0.05.
3. **Collect or tabulate the observed frequencies.**
4. **Compute the expected frequencies under $H_0$.**
5. **Check the conditions.** Especially the expected-frequency rule.
6. **Compute the chi-square test statistic.**
7. **Determine degrees of freedom.**
8. **Compare to the critical value (or compute the $p$-value).**
9. **Make a decision and interpret.**

### Worked example — goodness-of-fit

A research project tests whether eSewa users are equally distributed across four geographic regions of Nepal. Of 200 randomly sampled active users, the regional distribution is:

| Region | Observed (O) | Expected (E) under uniform |
|---|---|---|
| Eastern | 35 | 50 |
| Central | 80 | 50 |
| Western | 55 | 50 |
| Far-Western | 30 | 50 |

- $H_0$: users are equally distributed across regions (each region has 25% probability).
- $H_1$: users are not equally distributed.
- $\alpha = 0.05$.

Compute the chi-square statistic:

$$
\chi^2 = \frac{(35-50)^2}{50} + \frac{(80-50)^2}{50} + \frac{(55-50)^2}{50} + \frac{(30-50)^2}{50}
$$

$$
= \frac{225}{50} + \frac{900}{50} + \frac{25}{50} + \frac{400}{50} = 4.5 + 18.0 + 0.5 + 8.0 = 31.0
$$

df = $k - 1 = 4 - 1 = 3$.

Critical value at $\alpha = 0.05$ with df = 3: $\chi^2_{0.05, 3} \approx 7.815$.

Decision: $\chi^2 = 31.0 \gg 7.815$. Strongly reject $H_0$.

**Conclusion.** Users are not uniformly distributed across regions. The Central region is heavily over-represented (80 vs the 50 expected), while Eastern and Far-Western are under-represented. This is statistically very significant.

In context, the result is unsurprising — the Central region (which includes Kathmandu Valley) is more urbanised and has higher digital-payment penetration. The chi-square test confirms what the data clearly shows.

### Worked example — test of independence

A study examines whether mobile-banking adoption depends on age group among Nepali bank customers. A random sample of 300 customers gives:

| | Uses mobile banking | Does not use | Row total |
|---|---|---|---|
| Age 18-30 | 80 | 20 | 100 |
| Age 31-50 | 70 | 50 | 120 |
| Age 51+ | 25 | 55 | 80 |
| Column total | 175 | 125 | 300 |

- $H_0$: mobile-banking adoption is independent of age group.
- $H_1$: mobile-banking adoption is associated with age group.
- $\alpha = 0.05$.

Compute expected frequencies under independence:

$$
E_{ij} = \frac{(\text{row total}) (\text{column total})}{300}
$$

- $E_{11} = (100)(175)/300 = 58.33$
- $E_{12} = (100)(125)/300 = 41.67$
- $E_{21} = (120)(175)/300 = 70.00$
- $E_{22} = (120)(125)/300 = 50.00$
- $E_{31} = (80)(175)/300 = 46.67$
- $E_{32} = (80)(125)/300 = 33.33$

Check conditions: all expected frequencies are above 5. OK.

Compute the chi-square statistic:

$$
\chi^2 = \frac{(80-58.33)^2}{58.33} + \frac{(20-41.67)^2}{41.67} + \frac{(70-70)^2}{70} + \frac{(50-50)^2}{50} + \frac{(25-46.67)^2}{46.67} + \frac{(55-33.33)^2}{33.33}
$$

Cell-by-cell:
- $(80 - 58.33)^2 / 58.33 = 469.59 / 58.33 = 8.05$
- $(20 - 41.67)^2 / 41.67 = 469.59 / 41.67 = 11.27$
- $(70 - 70)^2 / 70 = 0$
- $(50 - 50)^2 / 50 = 0$
- $(25 - 46.67)^2 / 46.67 = 469.59 / 46.67 = 10.06$
- $(55 - 33.33)^2 / 33.33 = 469.59 / 33.33 = 14.09$

Sum: $\chi^2 = 8.05 + 11.27 + 0 + 0 + 10.06 + 14.09 = 43.47$.

df = $(3-1)(2-1) = 2$.

Critical value at $\alpha = 0.05$ with df = 2: $\chi^2_{0.05, 2} \approx 5.991$.

Decision: $\chi^2 = 43.47 \gg 5.991$. Strongly reject $H_0$.

**Conclusion.** Mobile-banking adoption is strongly associated with age group. Young customers (18-30) are much more likely to use mobile banking than expected under independence; older customers (51+) are much less likely. The 31-50 group is approximately at expectation.

### Effect-size measures for chi-square

The chi-square statistic itself depends on the sample size — a small effect with many observations can produce a large $\chi^2$. Effect-size measures normalise this.

**Phi coefficient** ($\phi$) for 2×2 tables:

$$
\phi = \sqrt{\frac{\chi^2}{n}}
$$

**Cramér's V** for larger tables:

$$
V = \sqrt{\frac{\chi^2}{n \cdot \min(r-1, c-1)}}
$$

For our age-vs-mobile-banking example: $V = \sqrt{43.47 / (300 \cdot 1)} = \sqrt{0.145} \approx 0.380$.

Interpretation of Cramér's V (Cohen):
- 0.10 — small effect.
- 0.30 — medium effect.
- 0.50 — large effect.

The age-adoption association is between medium and large.

## 6.5 Analysis of variance (ANOVA) and the ANOVA technique

### Why ANOVA

The two-sample $t$-test compares two means. When comparing three or more means, running multiple pairwise $t$-tests inflates the false-positive rate (the multiple-testing problem from Chapter 5). With four groups, six pairwise comparisons; the chance of at least one false significance at $\alpha = 0.05$ rises to roughly $1 - (1 - 0.05)^6 \approx 0.26$.

**Analysis of variance (ANOVA)** solves this by testing all the means at once.

*Analysis of variance is the statistical method for testing whether the means of three or more groups differ from each other, by comparing the variability between group means to the variability within groups, using an F-statistic under the null hypothesis of equal means.*

### The intuition

ANOVA partitions the total variance in the data into two parts:

**Between-group variance.** How much the group means differ from the overall mean. Large between-group variance means the groups are pulling apart.

**Within-group variance.** How much the individual observations differ from their own group means. This is the "noise" against which the between-group signal is measured.

The ratio:

$$
F = \frac{\text{Between-group variance}}{\text{Within-group variance}}
$$

If the groups have the same mean ($H_0$), the between-group variance is just sampling noise and should be roughly equal to the within-group variance — $F$ near 1. If the groups have different means, the between-group variance is inflated by the real differences — $F$ much larger than 1.

### One-way ANOVA

For $k$ groups with $n_i$ observations in each:

- $\bar{x}_i$ = mean of group $i$.
- $\bar{x}$ = overall mean (grand mean).
- $N$ = total number of observations.

**Sum of squares between groups (SSB).**

$$
SSB = \sum_{i=1}^{k} n_i (\bar{x}_i - \bar{x})^2
$$

**Sum of squares within groups (SSW), also called sum of squares error (SSE).**

$$
SSW = \sum_{i=1}^{k} \sum_{j=1}^{n_i} (x_{ij} - \bar{x}_i)^2
$$

**Total sum of squares (SST).**

$$
SST = \sum_{i=1}^{k} \sum_{j=1}^{n_i} (x_{ij} - \bar{x})^2 = SSB + SSW
$$

**Degrees of freedom.**
- Between: $df_B = k - 1$.
- Within: $df_W = N - k$.
- Total: $df_T = N - 1$.

**Mean squares.**

$$
MSB = \frac{SSB}{df_B}, \quad MSW = \frac{SSW}{df_W}
$$

**F-statistic.**

$$
F = \frac{MSB}{MSW}
$$

Under $H_0$ (all group means equal), $F$ follows an $F$ distribution with $df_B$ and $df_W$ degrees of freedom.

### Assumptions of ANOVA

ANOVA assumes:
1. **Independence.** Observations within and across groups are independent.
2. **Normality.** The values within each group are approximately normally distributed.
3. **Homogeneity of variance.** All groups have the same population variance (often tested with Levene's test).
4. **Continuous dependent variable.** The variable being averaged is at the interval or ratio level.

Violations of normality and equal variance are tolerable when sample sizes are large and roughly equal. Severe violations may require transformations of the data or non-parametric alternatives (the Kruskal-Wallis test).

## 6.6 Setting up the ANOVA table

The standard presentation of ANOVA results is the ANOVA table:

| Source | Sum of Squares | df | Mean Square | F |
|---|---|---|---|---|
| Between groups | SSB | $k - 1$ | $MSB = SSB / (k-1)$ | $F = MSB / MSW$ |
| Within groups | SSW | $N - k$ | $MSW = SSW / (N-k)$ | |
| Total | SST | $N - 1$ | | |

### Worked example — one-way ANOVA

Three machine-learning algorithms for intrusion detection are evaluated. Each is run on 5 independent test sets (different random splits of the same data). F1-scores are recorded:

| Algorithm A | Algorithm B | Algorithm C |
|---|---|---|
| 0.82 | 0.78 | 0.86 |
| 0.85 | 0.80 | 0.88 |
| 0.83 | 0.76 | 0.85 |
| 0.84 | 0.79 | 0.87 |
| 0.81 | 0.77 | 0.89 |

Test whether the three algorithms have the same mean F1-score.

- $H_0$: $\mu_A = \mu_B = \mu_C$.
- $H_1$: at least one mean differs.
- $\alpha = 0.05$.

Compute group means:
- $\bar{x}_A = (0.82 + 0.85 + 0.83 + 0.84 + 0.81)/5 = 4.15/5 = 0.830$.
- $\bar{x}_B = (0.78 + 0.80 + 0.76 + 0.79 + 0.77)/5 = 3.90/5 = 0.780$.
- $\bar{x}_C = (0.86 + 0.88 + 0.85 + 0.87 + 0.89)/5 = 4.35/5 = 0.870$.

Grand mean: $\bar{x} = (4.15 + 3.90 + 4.35)/15 = 12.40/15 \approx 0.8267$.

**Between-group sum of squares:**

$$
SSB = 5(0.830 - 0.8267)^2 + 5(0.780 - 0.8267)^2 + 5(0.870 - 0.8267)^2
$$

$$
= 5(0.0033)^2 + 5(-0.0467)^2 + 5(0.0433)^2
$$

$$
= 5(0.0000109) + 5(0.00218) + 5(0.00188)
$$

$$
= 0.000054 + 0.0109 + 0.00938 \approx 0.02035
$$

**Within-group sum of squares:**

For group A (mean 0.830):
- $(0.82 - 0.830)^2 = 0.0001$
- $(0.85 - 0.830)^2 = 0.0004$
- $(0.83 - 0.830)^2 = 0.0000$
- $(0.84 - 0.830)^2 = 0.0001$
- $(0.81 - 0.830)^2 = 0.0004$
- Sum: 0.0010

For group B (mean 0.780):
- $(0.78 - 0.780)^2 = 0.0000$
- $(0.80 - 0.780)^2 = 0.0004$
- $(0.76 - 0.780)^2 = 0.0004$
- $(0.79 - 0.780)^2 = 0.0001$
- $(0.77 - 0.780)^2 = 0.0001$
- Sum: 0.0010

For group C (mean 0.870):
- $(0.86 - 0.870)^2 = 0.0001$
- $(0.88 - 0.870)^2 = 0.0001$
- $(0.85 - 0.870)^2 = 0.0004$
- $(0.87 - 0.870)^2 = 0.0000$
- $(0.89 - 0.870)^2 = 0.0004$
- Sum: 0.0010

$SSW = 0.0010 + 0.0010 + 0.0010 = 0.0030$.

**Degrees of freedom:** $df_B = 3 - 1 = 2$, $df_W = 15 - 3 = 12$.

**Mean squares:**
$$
MSB = 0.02035 / 2 = 0.01017
$$
$$
MSW = 0.0030 / 12 = 0.00025
$$

**F-statistic:**
$$
F = 0.01017 / 0.00025 = 40.68
$$

**ANOVA table:**

| Source | SS | df | MS | F |
|---|---|---|---|---|
| Between groups | 0.02035 | 2 | 0.01017 | 40.68 |
| Within groups | 0.0030 | 12 | 0.00025 | |
| Total | 0.02335 | 14 | | |

Critical value at $\alpha = 0.05$ with df = (2, 12): $F_{0.05, 2, 12} \approx 3.89$.

$F = 40.68 \gg 3.89$. Strongly reject $H_0$.

**Conclusion.** The three algorithms have significantly different mean F1-scores. Algorithm C has the highest (0.870), followed by A (0.830) and B (0.780).

### Post-hoc tests

ANOVA tells us at least one group differs but not which one. **Post-hoc tests** identify the specific differences.

Common post-hoc tests:
- **Tukey's HSD (Honestly Significant Difference).** Compares all pairs while controlling the family-wise error rate. Standard default.
- **Bonferroni-adjusted pairwise t-tests.** Conservative; divides $\alpha$ by the number of comparisons.
- **Scheffé's test.** Most conservative; useful when comparing complex contrasts.
- **Dunnett's test.** Compares each treatment group to a single control.
- **Fisher's LSD.** Liberal; appropriate only when the omnibus F-test is significant.

For the example above, post-hoc tests would confirm that all three pairs (A vs B, A vs C, B vs C) differ significantly.

## 6.7 Coding method

For computation by hand or by simple calculator, the **coding method** simplifies the arithmetic by transforming the data to smaller numbers before computation. The final results are then untransformed.

The two standard codings:

**Subtracting a constant.** If all values are large (e.g., NEA peak demand in MW, in the thousands), subtract a constant $c$ from each. Means and sums of squares are unaffected if the constant is chosen appropriately.

For data $x_i$, let $u_i = x_i - c$. Then:
- $\bar{u} = \bar{x} - c$.
- $\sum (u_i - \bar{u})^2 = \sum (x_i - \bar{x})^2$.

The variance, standard deviation, and sums of squares are identical under translation.

**Scaling by a constant.** If all values are inconveniently small or scaled differently, multiply each by a constant. Means scale by the same factor; variances scale by the factor squared.

For $u_i = x_i / d$:
- $\bar{u} = \bar{x} / d$.
- $s_u^2 = s_x^2 / d^2$.

**Combined coding.** $u_i = (x_i - c) / d$.

### Coding in ANOVA

For ANOVA with large or awkward numbers, code the data first. Compute SS in coded units. Sum of squares (involving squared deviations from a mean) is invariant to translation; only the scaling matters. If we scaled by $d$, multiply the SS in coded units by $d^2$ to get SS in original units.

The $F$-statistic is invariant to both translation and scaling — being a ratio of mean squares, the $d^2$ in numerator and denominator cancels.

In practice, with statistical software running on standard machines, coding is rarely necessary. The technique appears in older textbooks for hand computation; it remains useful when teaching ANOVA arithmetic in a classroom.

### Example

For the F1-score data in Section 6.6, every value is around 0.8. Code by $u = (x - 0.8) \times 100$. The coded data:

| Algorithm A | Algorithm B | Algorithm C |
|---|---|---|
| 2 | -2 | 6 |
| 5 | 0 | 8 |
| 3 | -4 | 5 |
| 4 | -1 | 7 |
| 1 | -3 | 9 |

Means: $\bar{u}_A = 3$, $\bar{u}_B = -2$, $\bar{u}_C = 7$. Grand mean: $\bar{u} = (15 - 10 + 35)/15 = 8/3 \approx 2.667$.

The F-statistic from the coded data is the same as from the original. Sums of squares scale by $10000$ (since $d = 0.01$, $d^2 = 0.0001$, dividing by $d^2$ to "decode"). But ratios — which is what F is — are unchanged.

## 6.8 Two-way ANOVA

One-way ANOVA tests the effect of one factor. **Two-way ANOVA** tests the effects of two factors simultaneously and their interaction.

### Two-way ANOVA setup

Suppose two factors:
- Factor A with $a$ levels.
- Factor B with $b$ levels.

Each combination of levels is a **cell**, with $n$ observations per cell. Total observations: $N = a \cdot b \cdot n$.

The model:

$$
x_{ijk} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijk}
$$

where:
- $\mu$ is the grand mean.
- $\alpha_i$ is the main effect of Factor A's level $i$.
- $\beta_j$ is the main effect of Factor B's level $j$.
- $(\alpha\beta)_{ij}$ is the interaction effect.
- $\epsilon_{ijk}$ is the residual.

Three null hypotheses to test:
- $H_0^A$: All $\alpha_i = 0$ (no main effect of Factor A).
- $H_0^B$: All $\beta_j = 0$ (no main effect of Factor B).
- $H_0^{AB}$: All $(\alpha\beta)_{ij} = 0$ (no interaction).

### Two-way ANOVA table

The sums of squares decompose:

$$
SST = SSA + SSB + SSAB + SSE
$$

Standard ANOVA table:

| Source | SS | df | MS | F |
|---|---|---|---|---|
| Factor A | SSA | $a - 1$ | $MSA = SSA/(a-1)$ | $F_A = MSA/MSE$ |
| Factor B | SSB | $b - 1$ | $MSB = SSB/(b-1)$ | $F_B = MSB/MSE$ |
| Interaction AB | SSAB | $(a-1)(b-1)$ | $MSAB = SSAB / [(a-1)(b-1)]$ | $F_{AB} = MSAB/MSE$ |
| Error | SSE | $ab(n-1)$ | $MSE = SSE/[ab(n-1)]$ | |
| Total | SST | $N - 1$ | | |

Each F-statistic is compared to the appropriate $F$ critical value.

### Main effects vs interactions

**Main effect.** Average effect of one factor across the levels of the other. "Algorithm matters" (regardless of which dataset).

**Interaction.** The effect of one factor depends on the level of the other. "Algorithm A is best on dataset X but Algorithm B is best on dataset Y" — the algorithm effect interacts with the dataset effect.

A significant interaction modifies how the main effects are interpreted. If the interaction is significant, the main effects must be discussed in light of which level of the other factor is considered.

### Worked example — two-way ANOVA

A study evaluates two ML algorithms (Factor A: algorithm with levels Random Forest and XGBoost) on two types of fraud datasets (Factor B: dataset type with levels Type-1 = credit card fraud, Type-2 = mobile-wallet fraud). Three F1-scores per combination:

| | Type-1 (B1) | Type-2 (B2) |
|---|---|---|
| Random Forest (A1) | 0.82, 0.84, 0.83 | 0.75, 0.77, 0.76 |
| XGBoost (A2) | 0.85, 0.87, 0.86 | 0.88, 0.90, 0.89 |

Cell means:
- $\bar{x}_{A1B1} = 0.83$, $\bar{x}_{A1B2} = 0.76$.
- $\bar{x}_{A2B1} = 0.86$, $\bar{x}_{A2B2} = 0.89$.

Marginal means:
- $\bar{x}_{A1} = (0.83 + 0.76)/2 = 0.795$ (Random Forest overall).
- $\bar{x}_{A2} = (0.86 + 0.89)/2 = 0.875$ (XGBoost overall).
- $\bar{x}_{B1} = (0.83 + 0.86)/2 = 0.845$ (Type-1 overall).
- $\bar{x}_{B2} = (0.76 + 0.89)/2 = 0.825$ (Type-2 overall).

Grand mean: $\bar{x} = 0.8400$.

With $a = 2$, $b = 2$, $n = 3$ per cell:

**SSA (algorithm):**
$$
SSA = nb \sum_{i} (\bar{x}_{A_i} - \bar{x})^2 = 3 \cdot 2 \cdot [(0.795 - 0.840)^2 + (0.875 - 0.840)^2]
$$
$$
= 6 \cdot [0.002025 + 0.001225] = 6 \cdot 0.003250 = 0.0195
$$

**SSB (dataset):**
$$
SSB = na \sum_{j} (\bar{x}_{B_j} - \bar{x})^2 = 3 \cdot 2 \cdot [(0.845 - 0.840)^2 + (0.825 - 0.840)^2]
$$
$$
= 6 \cdot [0.000025 + 0.000225] = 6 \cdot 0.000250 = 0.0015
$$

**SSAB (interaction):**
$$
SSAB = n \sum_{ij} (\bar{x}_{ij} - \bar{x}_{A_i} - \bar{x}_{B_j} + \bar{x})^2
$$

For each cell:
- (A1, B1): $0.83 - 0.795 - 0.845 + 0.840 = 0.030$, squared: 0.000900.
- (A1, B2): $0.76 - 0.795 - 0.825 + 0.840 = -0.020$, squared: 0.000400.
- (A2, B1): $0.86 - 0.875 - 0.845 + 0.840 = -0.020$, squared: 0.000400.
- (A2, B2): $0.89 - 0.875 - 0.825 + 0.840 = 0.030$, squared: 0.000900.

Sum: 0.002600. Multiply by $n = 3$: $SSAB = 3 \cdot 0.002600 = 0.0078$.

Wait — let me recompute the contrast cleanly: SSAB indeed = $n \sum (\bar{x}_{ij} - \bar{x}_{A_i} - \bar{x}_{B_j} + \bar{x})^2 = 3 \cdot 0.0026 = 0.0078$.

**SSE (error, within cells):**

Compute deviations of individual observations from their cell mean.

For (A1, B1), cell mean 0.83: deviations = -0.01, 0.01, 0.00. Squared: 0.0001 + 0.0001 + 0 = 0.0002.
For (A1, B2), cell mean 0.76: deviations = -0.01, 0.01, 0.00. Squared: 0.0002.
For (A2, B1), cell mean 0.86: deviations = -0.01, 0.01, 0.00. Squared: 0.0002.
For (A2, B2), cell mean 0.89: deviations = -0.01, 0.01, 0.00. Squared: 0.0002.

$SSE = 0.0002 \cdot 4 = 0.0008$.

**ANOVA table:**

| Source | SS | df | MS | F |
|---|---|---|---|---|
| A (algorithm) | 0.0195 | 1 | 0.0195 | 195 |
| B (dataset) | 0.0015 | 1 | 0.0015 | 15 |
| Interaction AB | 0.0078 | 1 | 0.0078 | 78 |
| Error | 0.0008 | 8 | 0.0001 | |
| Total | 0.0296 | 11 | | |

(MSE = 0.0008/8 = 0.0001.)

Critical value at $\alpha = 0.05$ with df = (1, 8): $F_{0.05, 1, 8} \approx 5.32$.

**Decisions.**
- $F_A = 195 \gg 5.32$. Reject $H_0^A$. Algorithm has a significant main effect.
- $F_B = 15 > 5.32$. Reject $H_0^B$. Dataset has a significant main effect.
- $F_{AB} = 78 > 5.32$. Reject $H_0^{AB}$. The interaction is significant.

**Conclusion.** All three effects are significant. XGBoost outperforms Random Forest on average; Type-1 fraud is easier than Type-2 on average. But the significant interaction means these main effects must be interpreted carefully — Random Forest performs much better on Type-1 (0.83) than on Type-2 (0.76), while XGBoost performs slightly better on Type-2 (0.89) than on Type-1 (0.86). The "best algorithm" depends on the dataset type.

The interaction is the substantively most interesting finding: XGBoost is the right choice especially when the dataset is mobile-wallet fraud, where the algorithm's advantage over Random Forest is largest.

### Visualising interactions

The standard visualisation is an **interaction plot** — line plot with the dependent variable on the y-axis, one factor on the x-axis, and one line per level of the other factor. Parallel lines indicate no interaction. Crossing or diverging lines indicate interaction.

For the example above, plotting cell means with algorithm on the x-axis and one line per dataset would show the lines crossing — Random Forest is higher for Type-1, XGBoost higher for Type-2 (much higher).

### Beyond two-way ANOVA

Higher-order ANOVAs (three-way, four-way) follow the same principles. Each factor adds main effects, all interactions among the factors, and higher-order interactions. Interpretation becomes harder as the number of factors grows.

**Mixed-effects models** generalise ANOVA further, allowing some factors to be treated as random rather than fixed — useful when the levels of a factor are a sample from a larger set.

**MANOVA** (multivariate analysis of variance) tests for differences in means across multiple dependent variables at once.

In modern research, these methods are typically implemented in statistical software (R, SPSS, SAS, Stata, Python with statsmodels) rather than by hand. The hand-computation worked examples in this chapter exist for pedagogical clarity — to show that the F-statistic is not magic, just a ratio of variance components, computable from first principles.

The next chapter turns from analysis to communication — the reporting of results, the publication process, the management of the research project, and the standards of scientific dissemination.
