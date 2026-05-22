---
title: 'Chapter 6 — Measures for Performance Evaluation'
sidebar_label: 'Ch 06 — Measures for Performance Evaluation'
sidebar_position: 6
description: 'Chapter 6 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch06
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

A machine-learning model is only as useful as the metric used to judge it. The wrong metric produces a model that scores well on paper and fails in deployment. The right metric reflects the real-world cost of mistakes — money lost to fraud, lives lost to missed diagnoses, customers lost to false alarms. This chapter covers the standard evaluation metrics for classification (accuracy, precision, recall, F1, ROC) and the standard statistical apparatus around them (confusion matrices, misclassification costs, confidence intervals, cross-validation). The goal is not just to compute the metrics but to know which to use when, what they hide, and how to report results honestly.

## 6.1 Classification accuracy

### Accuracy

*Classification accuracy is the fraction of predictions that are correct — the count of correct predictions divided by the total count of predictions — the simplest measure of classifier performance.*

$$
\text{Accuracy} = \frac{\text{Number of correct predictions}}{\text{Total number of predictions}}
$$

For a binary classifier with predictions $\hat{y}_1, \ldots, \hat{y}_n$ and true labels $y_1, \ldots, y_n$:

$$
\text{Accuracy} = \frac{1}{n} \sum_{i=1}^{n} \mathbb{1}[\hat{y}_i = y_i]
$$

where $\mathbb{1}[\cdot]$ is 1 if the condition is true and 0 otherwise.

Accuracy ranges from 0 to 1 (or 0% to 100%). A perfect classifier achieves 1; a random classifier on a balanced binary problem achieves 0.5.

### When accuracy works

Accuracy is the right metric when:
- Classes are roughly balanced.
- All types of errors have similar costs.
- The downstream decision treats all classes symmetrically.

For digit recognition (MNIST), accuracy is fine. For ImageNet classification, accuracy (or top-5 accuracy) is fine. For a balanced sentiment classifier (positive vs negative reviews), accuracy is reasonable.

### When accuracy fails

Accuracy fails badly on **imbalanced** data — where one class is much rarer than the other.

Consider fraud detection at eSewa. The base fraud rate is roughly 0.3%. A model that always predicts "not fraud" — making no attempt to detect anything — achieves 99.7% accuracy. The accuracy score looks excellent. The model is useless.

The same pattern shows up in:
- **Medical screening.** A test for a disease present in 1 in 1000 people. Always predicting "negative" achieves 99.9% accuracy and catches nothing.
- **Spam detection.** If spam is 5% of messages, predicting "ham" for everything achieves 95% accuracy.
- **Network intrusion detection.** Attacks are rare; "no attack" is the lazy answer.
- **Customer churn.** If 2% of customers churn per month, predicting "no one will churn" is 98% accurate.

For such problems, accuracy is misleading. Better metrics — precision, recall, F1 — are needed.

### Accuracy by chance

For a $K$-class balanced problem, random guessing achieves $1/K$ accuracy. A binary classifier achieves 50% by chance. A 10-class classifier achieves 10%. Reporting accuracy without comparing to chance is incomplete.

For an imbalanced problem, the relevant baseline is the **majority-class baseline** — always predict the most common class. A model that beats this baseline by 0.5% has done very little. A model that beats it by 10 percentage points has done a lot.

## 6.2 Confusion matrix

### Confusion matrix

*A confusion matrix is a table that summarises the performance of a classifier by counting predictions in each combination of predicted and actual class, giving a complete view of where the model is right and wrong.*

For binary classification, the confusion matrix is a 2×2 table:

| | Predicted: Positive | Predicted: Negative |
|---|---|---|
| **Actual: Positive** | True Positive (TP) | False Negative (FN) |
| **Actual: Negative** | False Positive (FP) | True Negative (TN) |

The four cells:
- **True Positive (TP).** Predicted positive, actually positive. Correct alarm.
- **False Positive (FP).** Predicted positive, actually negative. False alarm. Also called Type I error.
- **False Negative (FN).** Predicted negative, actually positive. Missed detection. Also called Type II error.
- **True Negative (TN).** Predicted negative, actually negative. Correct silence.

### From confusion matrix to all metrics

Every standard metric is computed from the four numbers:

$$
\text{Accuracy} = \frac{TP + TN}{TP + FP + FN + TN}
$$

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

$$
\text{Recall} = \frac{TP}{TP + FN}
$$

$$
\text{Specificity} = \frac{TN}{TN + FP}
$$

$$
\text{F1} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}
$$

The confusion matrix is the source of truth; the metrics are summaries.

### A worked example

A fraud-detection model run on 10,000 Khalti transactions, of which 30 are actually fraudulent:

|  | Predicted: Fraud | Predicted: Not fraud |
|---|---|---|
| **Actual: Fraud** | 24 | 6 |
| **Actual: Not fraud** | 100 | 9870 |

From this:
- $TP = 24$, $FP = 100$, $FN = 6$, $TN = 9870$.
- Accuracy = $(24 + 9870)/10000 = 0.9894$ — 98.94%.
- Precision = $24/(24+100) = 0.194$ — only 19.4% of fraud alerts are actual fraud.
- Recall = $24/(24+6) = 0.80$ — 80% of actual fraud is caught.
- F1 = $2 \cdot 0.194 \cdot 0.80 / (0.194 + 0.80) = 0.312$.

The 98.94% accuracy hides a real problem: the alert-to-fraud ratio is 5:1. For every real fraud, four legitimate transactions are flagged. Operationally, this means the customer-service team must investigate five times more alerts than the actual fraud rate. Whether this is acceptable depends on the cost of each investigation versus the cost of missed fraud.

### Multi-class confusion matrices

For $K$ classes, the confusion matrix is $K \times K$. Rows are actual classes; columns are predicted classes. The diagonal contains correct predictions; off-diagonal cells show specific confusions.

A confusion matrix for a 4-class digit recognizer might reveal that "1" is often confused with "7" (off-diagonal entry in the 1-row, 7-column) — pointing toward a specific feature engineering or data augmentation fix.

Multi-class metrics generalise from binary ones:
- **Per-class precision and recall.** Compute precision and recall treating each class as "positive" against all others as "negative."
- **Macro average.** Average per-class metrics with equal weight per class.
- **Micro average.** Aggregate TP, FP, FN across classes, then compute metrics.
- **Weighted average.** Average per-class metrics, weighted by class frequency.

For imbalanced multi-class problems, the choice of averaging matters. Macro treats all classes equally; micro is dominated by the largest class.

## 6.3 Misclassification costs

### Asymmetric costs

In most real applications, different errors have different costs.

**Medical diagnosis.** Missing a cancer case (false negative) is far worse than a false alarm leading to follow-up tests (false positive). The cost ratio might be 100:1 in favour of avoiding false negatives.

**Spam filter.** Marking a legitimate email as spam (false positive) is much worse than missing one piece of spam (false negative). A lost important email may be never recovered; an extra spam in the inbox is a minor annoyance.

**Fraud detection.** A missed fraud (false negative) costs the bank or user the transaction amount. A false alarm (false positive) costs investigation time and customer frustration.

**Loan default prediction.** A missed default (false negative — predict "no default" but customer defaults) costs the bank the loan amount. A false alarm (false positive — predict "default" but customer would have paid) costs the bank the foregone profit on a rejected legitimate applicant.

The 0-1 loss that drives default accuracy treats all errors equally. Real applications need **cost-sensitive learning**.

### Cost matrix

A cost matrix $C(i, j)$ specifies the cost of predicting class $i$ when the true class is $j$:

| | Actual: Positive | Actual: Negative |
|---|---|---|
| **Predicted: Positive** | $C(+, +)$ | $C(+, -)$ |
| **Predicted: Negative** | $C(-, +)$ | $C(-, -)$ |

Typically $C(+, +) = C(-, -) = 0$ (correct predictions have no cost). $C(+, -)$ is the cost of a false positive; $C(-, +)$ is the cost of a false negative.

Total cost on a test set:

$$
\text{Total Cost} = C(+, -) \cdot FP + C(-, +) \cdot FN
$$

A cost-sensitive classifier picks the prediction that minimises expected cost rather than the prediction that minimises probability of error.

### Threshold tuning with costs

Most classifiers produce probabilities $P(y = 1 \mid x)$. The decision is "predict positive if $P > t$" for some threshold $t$. With balanced costs, $t = 0.5$ minimises 0-1 loss. With asymmetric costs, the optimal threshold shifts.

For costs $C_{FP}$ and $C_{FN}$, the threshold that minimises expected cost:

$$
t^* = \frac{C_{FP}}{C_{FP} + C_{FN}}
$$

If false negatives are 10 times more costly than false positives ($C_{FN} = 10$, $C_{FP} = 1$), then $t^* = 1/11 \approx 0.09$ — predict positive aggressively, flagging anything with even a 9% probability of being positive.

If false positives are 10 times more costly ($C_{FP} = 10$, $C_{FN} = 1$), then $t^* = 10/11 \approx 0.91$ — predict positive only when very confident.

### Cost-sensitive training

Beyond threshold tuning, the training loss can be weighted to reflect costs:

$$
\text{Weighted Loss} = w_+ \cdot \text{Loss on positives} + w_- \cdot \text{Loss on negatives}
$$

with $w_+ / w_- = C_{FN} / C_{FP}$. The model trains to be more accurate on the costlier class.

Most ML libraries (scikit-learn, XGBoost, Keras) provide `class_weight` or `sample_weight` parameters for this.

### Real costs vs business cost

The cost matrix must reflect the actual business outcomes. For an eSewa fraud-detection deployment:

- $C_{FN}$ = average fraud transaction size = NPR 5,000.
- $C_{FP}$ = average cost of an investigation + customer-friction cost ≈ NPR 200.

The ratio is 25:1. The threshold should be set low — flag aggressively. The cost matrix turns the abstract trade-off into a concrete deployment decision.

## 6.4 Precision, recall, sensitivity, specificity, F1-score

These metrics extract specific aspects of the confusion matrix. Each answers a different question.

### Precision

*Precision is the fraction of predicted positives that are actually positive, answering "of everything the model flagged, how much was real?"*

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

High precision means few false alarms. A precision of 0.9 means 90% of flagged items are actual positives.

Precision matters most when false positives are costly. Spam filters need high precision — flagging a legitimate email as spam is bad. Marketing campaigns need high precision — bothering uninterested customers wastes ad budget and damages the brand.

### Recall (Sensitivity, True Positive Rate)

*Recall is the fraction of actual positives that are correctly predicted, answering "of everything that's real, how much did the model catch?"*

$$
\text{Recall} = \frac{TP}{TP + FN}
$$

Also called **sensitivity** or **true positive rate (TPR)**.

High recall means few missed cases. A recall of 0.8 means 80% of actual positives are detected.

Recall matters most when false negatives are costly. Cancer screening needs high recall — missing a cancer case is much worse than recommending unnecessary follow-up. Fraud detection often prioritises recall — missing fraud costs real money.

### Specificity (True Negative Rate)

*Specificity is the fraction of actual negatives that are correctly predicted as negative, answering "of everything that's not a target, how much did the model correctly ignore?"*

$$
\text{Specificity} = \frac{TN}{TN + FP}
$$

Also called **true negative rate (TNR)**.

High specificity means few false alarms among negatives. In medical screening, specificity is the fraction of healthy people correctly told they're healthy.

The **false positive rate (FPR)** is the complement: $\text{FPR} = 1 - \text{Specificity} = FP/(FP + TN)$.

### The precision-recall trade-off

Precision and recall trade against each other. Raising the threshold for "positive" makes the model more conservative:
- Fewer total predicted positives.
- Higher precision (those it does flag are more likely to be real).
- Lower recall (more actual positives go undetected).

Lowering the threshold has the opposite effect: more predicted positives, lower precision, higher recall.

The trade-off cannot be avoided. The application determines which side to favour. A medical-screening test maximises recall (catch everything, even at the cost of false alarms). A spam filter maximises precision (don't reject legitimate emails).

### F1-score

*The F1-score is the harmonic mean of precision and recall, providing a single number that balances both metrics, used when both false positives and false negatives matter.*

$$
\text{F1} = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}
$$

F1 ranges from 0 to 1. It is high only when both precision and recall are high. A precision of 1.0 with recall of 0.0 (or vice versa) gives F1 = 0.

**Why harmonic mean?** The harmonic mean is dominated by the smaller of the two values. If precision = 0.99 but recall = 0.01, the arithmetic mean is 0.5 — misleadingly high — but the harmonic mean is 0.02 — correctly low. F1 penalises imbalanced precision-recall combinations.

### F-beta score

A generalisation that weights recall more or less than precision:

$$
F_\beta = (1 + \beta^2) \cdot \frac{\text{Precision} \cdot \text{Recall}}{\beta^2 \cdot \text{Precision} + \text{Recall}}
$$

- $\beta = 1$ — F1, equal weight.
- $\beta = 2$ — F2, weights recall more (twice as much).
- $\beta = 0.5$ — F0.5, weights precision more.

Use $F_2$ when missing positives is worse than false alarms (medical screening). Use $F_{0.5}$ when false alarms are worse (spam filter).

### Multi-class precision, recall, F1

For multi-class problems, compute per-class metrics treating each class against all others, then aggregate:

**Macro average.** Compute precision, recall, F1 for each class; average. Treats all classes equally. Useful when class imbalance is significant and we care about minority classes.

**Micro average.** Aggregate TP, FP, FN across all classes; compute precision, recall, F1 from the totals. Equivalent to accuracy for multi-class with single labels.

**Weighted average.** Compute per-class metrics; average weighted by support (number of true examples per class). Compromise between macro and micro.

The choice matters. A 10-class problem where 90% of examples are class 1: micro-averaged F1 ≈ accuracy ≈ 0.9 even if classes 2-10 are predicted at random. Macro-averaged F1 would reveal the per-class performance properly.

## 6.5 ROC curve, AUC, box plot, confidence intervals

### ROC curve

*The Receiver Operating Characteristic (ROC) curve is a graphical plot of true positive rate against false positive rate as the classification threshold is varied across all possible values, showing the trade-off between sensitivity and false-alarm rate.*

The name comes from radar-detection research in World War II — the "operating characteristic" of a receiver, the curve along which it could be tuned to favour sensitivity or specificity.

**Construction.** For a classifier producing probabilities:
1. Vary the classification threshold from 0 to 1.
2. At each threshold, compute TPR (recall) and FPR.
3. Plot the curve.

At threshold = 1 (only most-confident predicted positives), TPR = 0 and FPR = 0 — the lower-left corner.
At threshold = 0 (everything predicted positive), TPR = 1 and FPR = 1 — the upper-right corner.
The curve connects these through intermediate thresholds.

**Reading the curve.**
- A point at (0, 1) — top-left corner — is perfect: 100% recall with no false positives.
- A point on the diagonal (TPR = FPR) is random guessing.
- A curve above the diagonal is better than random.
- A curve below the diagonal is worse than random (flip predictions to improve).

### AUC

*Area Under the ROC Curve (AUC, or AUROC) is the integral of the ROC curve, providing a single number summary of classifier performance across all thresholds — equal to the probability that a randomly chosen positive example receives a higher score than a randomly chosen negative example.*

AUC ranges from 0 to 1:
- AUC = 1.0 — perfect classifier.
- AUC = 0.5 — random.
- AUC = 0.0 — perfectly wrong (anti-classifier).

Typical ranges:
- AUC 0.5–0.6 — poor.
- AUC 0.7–0.8 — acceptable.
- AUC 0.8–0.9 — good.
- AUC > 0.9 — excellent.

**Strengths of AUC:**
- Threshold-independent — does not require choosing an operating point.
- Insensitive to class imbalance (more than accuracy, less than precision-recall AUC).
- Has a clean probabilistic interpretation.

**Weaknesses of AUC:**
- Aggregates across all thresholds, including extreme thresholds that may not be operationally relevant.
- Imbalanced data with rare positives — AUC can stay high even when precision is low.
- **PR-AUC** (Area Under the Precision-Recall Curve) is preferred for very imbalanced problems.

### Box plot for performance comparison

*A box plot is a graphical summary of a distribution that shows the median, quartiles, and range of a set of values, used in ML evaluation to visualise the variability of a metric across multiple runs or cross-validation folds.*

When comparing classifiers, a single test-set number is not enough — performance varies with the random training/test split. Multiple runs produce a distribution.

A box plot displays:
- The **median** (line in the middle of the box).
- The **first and third quartiles** (the box edges).
- The **whiskers** (typically 1.5× IQR beyond the box).
- **Outliers** (points beyond the whiskers).

Comparing box plots of different classifiers:
- A model with a much higher median than another is genuinely better.
- A model with a similar median but smaller spread is more reliable.
- A model whose box plot heavily overlaps another's may not be significantly different.

Box plots are honest displays. A single mean accuracy can mask high variance; a box plot makes it visible.

### Confidence intervals for accuracy

A measured accuracy of 0.85 on a 1000-example test set is not the model's "true" accuracy — it's a point estimate. Confidence intervals quantify the uncertainty.

**Wald interval (normal approximation).** For accuracy $\hat{p}$ from $n$ examples:

$$
\hat{p} \pm 1.96 \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
$$

(For 95% confidence; use 1.96 as the multiplier.)

For $\hat{p} = 0.85$ and $n = 1000$:

$$
0.85 \pm 1.96 \sqrt{\frac{0.85 \cdot 0.15}{1000}} = 0.85 \pm 1.96 \cdot 0.0113 = 0.85 \pm 0.022
$$

The 95% CI is $[0.828, 0.872]$.

**Wilson interval.** More accurate for proportions near 0 or 1, or for small $n$. Most statistical libraries default to Wilson now.

**Bootstrap CI.** Resample the test set with replacement many times. Compute accuracy on each resample. The 2.5th and 97.5th percentiles of the resampled accuracies form a 95% CI. Useful when the metric is not a simple proportion (e.g., F1, AUC, custom business metric).

### Why confidence intervals matter

Reporting "model A has accuracy 0.85, model B has accuracy 0.86" without confidence intervals overstates certainty. If both have CIs of $\pm 0.03$, the difference is not statistically meaningful — the models may be equally good.

Many papers and benchmark reports omit confidence intervals; the practice is methodologically poor. A serious evaluation reports point estimates and CIs.

### Hypothesis testing for comparison

For comparing two classifiers on the same test set, **McNemar's test** is the standard. It analyses the pattern of disagreements — examples where one classifier is right and the other is wrong — to determine whether the difference is significant.

For comparing classifiers across multiple datasets or cross-validation folds, paired t-tests or non-parametric Wilcoxon signed-rank tests are used.

The statistical-significance question is real. A model that "wins" on a single test set might be lucky. Multi-fold cross-validation with significance testing protects against this.

## 6.6 Cross-validation

### Cross-validation

*Cross-validation is a model-evaluation technique that estimates a model's generalisation performance by repeatedly splitting the data into training and validation portions, training on the training portion and evaluating on the held-out portion, then averaging the results.*

A single train-test split gives one estimate of performance. The estimate has variance — different splits give different results. Cross-validation reduces this variance by averaging multiple splits.

It also makes more efficient use of limited data — every example serves as both training and validation across the different folds.

### K-fold cross-validation

The standard procedure:

1. Split the data into $K$ folds of equal size (typically 5 or 10).
2. For each fold $i$ from 1 to $K$:
   a. Use fold $i$ as the validation set.
   b. Use the other $K - 1$ folds as the training set.
   c. Train the model.
   d. Evaluate on fold $i$, recording the metric.
3. Report the mean (and standard deviation) of the $K$ metric values.

The result: $K$ estimates of performance, providing both a point estimate (mean) and an uncertainty estimate (standard deviation or 95% CI).

**Common choices for K:**
- **5-fold.** Common default. Each fold has 20% of the data.
- **10-fold.** More common, especially in research. Slightly lower variance estimate.
- **Larger K.** Closer to leave-one-out. Higher variance, more computation.

### Stratified K-fold

For classification, especially with imbalanced data, **stratified K-fold** preserves the class distribution in each fold. Without stratification, a 5-fold split of data with 5% positives might happen to give one fold with 1% positives and another with 9% — different folds become non-comparable.

Stratified K-fold ensures each fold has approximately the same class proportions as the overall dataset. The standard choice for classification.

### Leave-One-Out Cross-Validation (LOOCV)

The extreme case: $K = n$. Each fold contains exactly one example. The model is trained on $n - 1$ examples and tested on the single held-out example. Repeat $n$ times.

LOOCV uses almost all data for training each time, giving the lowest-bias estimate. But it has high computational cost ($n$ trainings) and high variance (each test fold is just one example).

Useful when:
- Data is very scarce — every example matters.
- Computation is cheap relative to data availability.

Not useful when:
- Data is abundant — 5- or 10-fold is sufficient and far cheaper.

### Time-series cross-validation

Standard K-fold violates causality for time-series data. The training data may contain timestamps after the validation data — the model "sees the future."

**Time-series CV** respects temporal order:
1. Sort data by time.
2. Train on the first 70%, validate on the next 10% (or expand by 10% increments).
3. Repeat with growing training windows.

Variants:
- **Expanding window.** Each fold's training set includes all previous folds' data.
- **Sliding window.** Each fold uses a fixed-size training window.

This is critical for NEPSE prediction, NEA load forecasting, and any other time-series problem where future data should not leak into training.

### Nested cross-validation

A subtle issue: when cross-validation is used to *choose* a model (or hyperparameters) and *also* to estimate its performance, the estimate is biased.

The remedy is **nested cross-validation**:
- **Outer loop.** K-fold CV to estimate generalisation performance.
- **Inner loop.** For each outer fold's training set, do another K-fold CV to choose hyperparameters.
- Train the chosen model on the outer training set, evaluate on the outer test fold.

This is computationally expensive — $K \times K'$ trainings — but provides unbiased performance estimates.

### Cross-validation pitfalls

**Data leakage in preprocessing.** Computing a scaler (mean, standard deviation) on the full dataset before splitting leaks information from validation into training. Fit the scaler on each fold's training data only.

**Grouped data.** If examples come in groups (multiple records per user, multiple visits per patient), random splitting mixes the same user across folds — the model "knows" the user from training. Use **GroupKFold** or **LeaveOneGroupOut** to keep groups together.

**Overlapping examples.** Near-duplicate examples in the dataset can end up split across folds, leading to overoptimistic estimates. Deduplicate before splitting.

**Hyperparameter tuning on the CV folds and then reporting CV performance.** This conflates model selection with performance estimation, biasing the result. Use nested CV or a separate held-out test set.

**Time leakage.** Already covered. Standard K-fold on time-series data inflates measured performance.

### Choosing the right evaluation protocol

The protocol depends on the data and the problem:

| Situation | Recommended evaluation |
|---|---|
| Large balanced dataset, IID examples | Single train/validation/test split |
| Small dataset | K-fold cross-validation |
| Very small dataset | Leave-one-out cross-validation |
| Imbalanced classification | Stratified K-fold |
| Time-series data | Time-series CV with expanding window |
| Grouped data | Group K-fold |
| Tuning hyperparameters + estimating performance | Nested cross-validation |

The default in practice: stratified 5-fold cross-validation for classification, K-fold for regression, with a separate held-out test set for final evaluation.

### Reporting evaluation results honestly

A complete evaluation report includes:
- The metric (or metrics) used and the rationale.
- The point estimate (mean across folds, or test-set value).
- The uncertainty (standard deviation, confidence interval).
- The number of folds or test-set size.
- Comparison to baselines (majority-class, random, simpler models).
- Significance test if comparing classifiers.

A weak evaluation reports a single accuracy number with no context. A strong evaluation describes what was measured, how it was measured, how reliable the measurement is, and how the result compares to alternatives.

The next chapter covers deep-learning methods and applications, where the evaluation principles of this chapter are particularly important — deep models are easy to overstate when evaluated carelessly.
