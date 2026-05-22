---
title: 'Chapter 1 — Basics of Machine Learning'
sidebar_label: 'Ch 01 — Basics of Machine Learning'
sidebar_position: 1
description: 'Chapter 1 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch01
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

This chapter sets the foundations for the rest of the subject. It defines what machine learning is, where it came from, what its main branches are, what makes a learning problem feasible, and what goes wrong when it is not handled carefully. The mathematical apparatus is light at this stage — a review of summary statistics and the standard error metric — but the conceptual apparatus is heavy. Most failures in later chapters come from misunderstanding ideas introduced here: the split between training and test data, the bias-variance trade-off, overfitting, the meaning of generalisation. A student who has these clearly does not get lost in algorithms.

## 1.1 History of machine learning, definition, types, importance

### What machine learning is

*Machine learning is the field of computer science that gives computers the ability to learn patterns from data and make predictions or decisions without being explicitly programmed for the task.*

The defining feature is the absence of explicit rules. A traditional program for detecting spam might use a hand-written list of suspicious words. A machine-learning program is shown thousands of spam and non-spam emails and learns the patterns on its own — patterns the programmer never wrote down and may not even be able to describe.

The classic working definition is from Tom Mitchell (1997):

> A computer program is said to learn from experience $E$ with respect to some task $T$ and some performance measure $P$, if its performance on $T$, as measured by $P$, improves with experience $E$.

For a spam filter: $T$ is "classify emails as spam or not," $E$ is "labelled examples of spam and ham emails," $P$ is "fraction of emails classified correctly." A program that scores higher on $P$ after seeing more $E$ has learned.

### A short history

Machine learning grew out of three older traditions — statistics, pattern recognition, and artificial intelligence — and the distinctions between them have softened over time.

**1940s–1950s — the beginnings.** Warren McCulloch and Walter Pitts proposed the first mathematical model of a neuron in 1943. Alan Turing's 1950 paper *Computing Machinery and Intelligence* introduced the Turing test and the idea of a learning machine. Arthur Samuel built a checkers-playing program at IBM in 1952 that improved through self-play; he coined the term "machine learning" in 1959.

**1957–1969 — the first wave.** Frank Rosenblatt introduced the **perceptron** in 1957 at Cornell — the first trainable neural model, capable of learning simple linear separators. Bernard Widrow and Marcian Hoff developed ADALINE in 1960, a closely related model with a smoother training rule. Optimism was high. Then Marvin Minsky and Seymour Papert's 1969 book *Perceptrons* showed that single-layer perceptrons could not learn the XOR function or any non-linearly-separable problem. Funding for neural-network research dried up. The first "AI winter" began.

**1970s–1980s — symbolic and statistical revival.** Decision trees emerged — ID3 (Ross Quinlan, 1979) and later C4.5 became standard. The **backpropagation algorithm** for training multi-layer neural networks was developed by several researchers independently — Paul Werbos in 1974, then rediscovered and popularised by Rumelhart, Hinton, and Williams in 1986. This unlocked multi-layer neural networks and dissolved the XOR objection. Bayesian methods became mainstream in machine learning during this period.

**1990s — statistical learning matures.** Vladimir Vapnik and his colleagues developed **support vector machines** in the early 1990s, building on statistical learning theory. Random forests (Leo Breiman, 2001), gradient boosting (Jerome Friedman, 1999), and other ensemble methods became standard. The community shifted from "is this method clever?" to "does this method generalise on held-out data?" — a methodological revolution as important as any algorithm.

**2000s — the data era.** The Internet produced labelled datasets at unprecedented scale. The ImageNet dataset (Fei-Fei Li, 2009) eventually contained 14 million labelled images. Computing power — particularly from graphics processing units — caught up to what the algorithms needed.

**2012 onwards — the deep-learning revolution.** Alex Krizhevsky's AlexNet won the ImageNet competition in 2012 with a deep convolutional neural network, dropping the error rate by ten percentage points in one year. The result triggered a wave of investment, research, and deployment that continues. By 2017, deep learning had reached human or superhuman performance on image classification, speech recognition, and the game of Go.

**2017–2020s — transformers and large models.** The transformer architecture (Vaswani et al., 2017) replaced recurrent networks for many language tasks. BERT (2018), GPT-2 (2019), GPT-3 (2020), and successors showed that very large models trained on very large text corpora produce general-purpose language abilities. By 2023–24, large language models entered mainstream use.

**2025–2026 — multimodal and agentic systems.** Models that combine text, image, audio, and video; systems that take actions in the world (call APIs, write code, control browsers); the EU AI Act and similar regulations beginning to come into force.

### Types of learning

Machine learning is conventionally divided into three or four families based on what kind of feedback the algorithm receives.

**Supervised learning.**

*Supervised learning is the family of machine-learning methods that learn from labelled examples — input-output pairs $(x_i, y_i)$ — to produce a function that maps new inputs to predicted outputs, used when the desired output for each training example is known.*

The training set has both inputs and the right answers. The algorithm's job is to find a function that, given just the input, predicts the right output as well as possible.

Sub-types by output type:
- *Classification* — output is a category. Spam vs ham. Cancer vs healthy. Loan default vs no default. Citizenship-card type — old vs new format.
- *Regression* — output is a continuous number. Tomorrow's temperature in Kathmandu. The closing price of NEPSE. A house's price in Patan.

**Unsupervised learning.**

*Unsupervised learning is the family of machine-learning methods that find structure in unlabelled data — inputs without target outputs — discovering groupings, low-dimensional representations, or generative models of the data distribution.*

The algorithm sees only the inputs and must find patterns on its own. Sub-types:
- *Clustering* — group similar examples. Customer segmentation for eSewa users by spending behaviour. Grouping research papers by topic.
- *Dimensionality reduction* — find a compact representation. Compressing high-dimensional sensor data from NEA's smart meters into a few summary variables.
- *Density estimation and generative modelling* — learn the underlying distribution. Generating realistic synthetic data.

**Reinforcement learning.**

*Reinforcement learning is the family of machine-learning methods in which an agent learns to take actions in an environment to maximise a cumulative reward, through trial-and-error interaction rather than from labelled examples.*

The agent does not see "the right answer." It sees the consequence of its actions — a reward or a penalty — and adjusts. Used in game-playing (AlphaGo, AlphaZero), robotics, recommendation-system policy learning, and resource scheduling. The trade-off between exploring new actions and exploiting known-good ones is the central challenge.

**Semi-supervised learning.** A hybrid. The training set has a few labelled examples and many unlabelled ones. The algorithm uses the labelled examples to anchor what it learns from the larger unlabelled set. Common in domains where labelling is expensive — medical imaging, where a radiologist labels a few hundred scans, but thousands of unlabelled scans are available.

**Self-supervised learning.** A newer style, central to modern large models. The algorithm creates its own supervised problems from unlabelled data. Mask a word in a sentence and predict it. Predict the next word given the previous ones. The model learns rich representations without manual labels. This is how language models (BERT, GPT family) are pre-trained.

### Why machine learning matters

Several factors made ML a core technology in the 2010s and 2020s.

**Problems too complex for hand-coded rules.** Image recognition, speech recognition, language translation — these tasks resisted decades of hand-engineered rules. ML solved them by learning from examples.

**Data abundance.** Every transaction at eSewa or Khalti, every smart-meter reading from the NEA, every Foodmandu order, every Daraz click — modern infrastructure produces enormous data streams. ML extracts patterns from these.

**Cheap computation.** GPUs make large-scale ML training affordable. A modern training run that would have been impossible in 2005 fits on a workstation today.

**Adaptive systems.** Hand-coded systems are static — they do exactly what was programmed. ML systems can adapt to new data. Fraud-detection models retrain weekly to catch new schemes. Spam filters adapt to new spam patterns.

**Personalisation at scale.** A Daraz recommendation for one user differs from another's based on individual click history. A hand-coded rule cannot personalise to millions; an ML model can.

The applications in Nepal include and extend beyond:

- Banking and fintech credit scoring at NIC Asia, Nabil, Standard Chartered, and the major BFIs.
- Fraud detection across eSewa, Khalti, IME Pay, and the NCHL clearing rails.
- Electricity demand forecasting at NEA's load dispatch centre.
- Weather and monsoon prediction at the Department of Hydrology and Meteorology.
- Disease-outbreak surveillance at the Ministry of Health and Population.
- Crop-yield estimation through satellite imagery for the Ministry of Agriculture.
- Recommendation systems at Daraz, SastoDeal, and Hamrobazaar.
- Ride-matching at Pathao and InDrive.
- Network-anomaly detection at NTC and Ncell's security operations.

The chapters that follow build the tools to understand how each of these systems works underneath.

## 1.2 Review of statistics

A short review. The statistics in this subject is mostly the descriptive kind plus error metrics. Inferential statistics — hypothesis tests, confidence intervals — appears in Chapter 6 on performance evaluation.

### Min, Max, Mean, Mode, Median

These are the basic **measures of central tendency and range**.

**Minimum and Maximum.** The smallest and largest values in the dataset. Together they define the **range** — Max minus Min. The range tells you the spread but is sensitive to a single outlier. If one Foodmandu order in a sample is for NPR 50,000 and the rest are between NPR 200 and NPR 2000, the range becomes misleading.

**Mean.**

*The arithmetic mean of a dataset is the sum of all values divided by the number of values, denoted $\bar{x}$.*

$$
\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

The mean is the most common measure of central tendency. It uses every value in the dataset, which is both its strength (information from every observation) and its weakness (sensitivity to outliers). One unusually large data point pulls the mean upward.

A worked example. The five most recent monthly electricity consumption readings (in kWh) from a Kathmandu household: 180, 200, 220, 195, 205. The mean is $(180 + 200 + 220 + 195 + 205) / 5 = 1000 / 5 = 200$ kWh.

**Median.**

*The median of a dataset is the middle value when the values are sorted, splitting the dataset into a lower half and an upper half of equal size.*

For an odd number of values, the median is the middle one. For an even number, it is usually taken as the average of the two middle values.

The median resists outliers. A single very large value does not move the median much.

Worked example. Monthly incomes (in NPR thousands) of five households in a Bhaktapur ward: 25, 30, 35, 40, 500. The mean is $(25 + 30 + 35 + 40 + 500)/5 = 126$ — a misleading "average" because of one wealthy outlier. The median is 35 — much more representative of the typical household.

For income, house prices, transaction sizes, and most "real-world money" distributions, the median is the better summary statistic.

**Mode.**

*The mode of a dataset is the value (or values) that appears most frequently.*

A dataset can have one mode (unimodal), two modes (bimodal), or many. A dataset where every value appears once has no useful mode.

Worked example. Citizenship-card colours observed in a queue at the Department of Passport: green, green, red, green, red, green, red, red, red. Mode = "red" (appears 5 times). Mode is the only meaningful central tendency for categorical data — you cannot compute the mean of "green."

### Standard deviation

*The standard deviation of a dataset is the square root of the average squared deviation from the mean, measuring how spread out the values are around the mean.*

For a sample of size $n$:

$$
s = \sqrt{\frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2}
$$

The $(n-1)$ in the denominator (rather than $n$) is **Bessel's correction**, used when $s$ is an estimate of the population standard deviation from a sample. For a complete population, divide by $n$.

The standard deviation is in the same units as the data. If the data is in kWh, $s$ is in kWh. If the data is in NPR, $s$ is in NPR.

The **variance** is the standard deviation squared. Variance has nicer mathematical properties but the unit is squared — kWh², NPR² — which is harder to interpret.

Worked example. From the household electricity readings above (mean = 200):

$$
\begin{aligned}
(180-200)^2 &= 400 \\
(200-200)^2 &= 0 \\
(220-200)^2 &= 400 \\
(195-200)^2 &= 25 \\
(205-200)^2 &= 25 \\
\text{Sum} &= 850
\end{aligned}
$$

Sample variance $= 850 / (5-1) = 212.5$ kWh². Standard deviation $= \sqrt{212.5} \approx 14.58$ kWh.

The standard deviation tells you that monthly consumption typically varies by about 15 kWh around the mean of 200 kWh.

**Interpretation in ML.** Standard deviation appears constantly in machine learning — as a measure of how spread out predictions are, how variable a feature is, how confident a model is in its output. When a feature has very small standard deviation across the training set (everyone has approximately the same value), it carries little information for distinguishing examples. When it has very large standard deviation, scaling becomes important (Chapter 2 covers feature scaling).

### Mean Squared Error (MSE)

*Mean Squared Error is the average of the squared differences between predicted and actual values, used as the primary loss function in regression and as a measure of predictive accuracy.*

For a regression model that predicts $\hat{y}_i$ when the true value is $y_i$:

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

MSE is non-negative. It is zero only when every prediction is exactly right. Larger errors are penalised more than smaller ones because the differences are squared — a prediction off by 10 contributes 100 to the MSE, but a prediction off by 1 contributes only 1.

**Root Mean Squared Error (RMSE).** The square root of MSE. RMSE is in the same units as the target variable — kWh for energy prediction, NPR for price prediction. RMSE is often reported instead of MSE because it is easier to interpret.

$$
\text{RMSE} = \sqrt{\text{MSE}}
$$

Worked example. An NEA load-forecast model predicts the next-day peak demand for the Bagmati province at 1500 MW, 1600 MW, 1550 MW, and 1700 MW on four consecutive days. The actual values turn out to be 1480, 1620, 1530, and 1750 MW.

$$
\begin{aligned}
\text{Errors:} &\quad 1500-1480 = 20, \quad 1600-1620 = -20, \quad 1550-1530 = 20, \quad 1700-1750 = -50 \\
\text{Squared:} &\quad 400, \quad 400, \quad 400, \quad 2500 \\
\text{MSE} &= (400 + 400 + 400 + 2500)/4 = 3700/4 = 925 \text{ MW}^2 \\
\text{RMSE} &= \sqrt{925} \approx 30.4 \text{ MW}
\end{aligned}
$$

The average prediction is off by about 30 MW. The largest error (50 MW) dominates the MSE because of squaring — a single bad day matters more in MSE than four moderately-off days would.

**Mean Absolute Error (MAE).** A related metric — the average of absolute differences instead of squared differences:

$$
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

MAE is less sensitive to outliers than MSE. Choosing between MSE and MAE depends on whether large errors should be penalised disproportionately (use MSE) or proportionally (use MAE).

## 1.3 Machine learning terminology

A small vocabulary used throughout the subject. Confusing these terms makes algorithms hard to read.

### Class

*A class is one of the discrete categories that a classification model assigns examples to, also called a label.*

For a spam filter, the two classes are "spam" and "ham." For a digit recognizer, the ten classes are 0 through 9. For an eSewa fraud detector, the classes might be "legitimate," "suspicious," and "fraudulent."

The number of classes is part of the problem definition. Two-class problems are called **binary classification**. More than two are **multi-class classification**. A problem where each example can belong to several classes at once — a news article tagged both "politics" and "Kathmandu" — is **multi-label classification**.

### Pattern (example, instance, sample)

*A pattern is a single example in the dataset, consisting of a feature vector and (for supervised problems) a label, treated as one observation that the algorithm learns from.*

The terms **pattern**, **example**, **instance**, and **sample** are largely interchangeable. "Pattern" is older terminology from pattern recognition; "example" and "instance" are common in modern ML literature; "sample" is statistical.

A dataset of 10,000 patterns means 10,000 rows in the data table, each row carrying the features and the label.

### Feature

*A feature is one measurable attribute of a pattern, represented as one component of the input vector that the learning algorithm sees, also called a variable, attribute, or predictor.*

For a Khalti transaction record, features might include amount, time of day, day of week, source merchant category, user's average transaction size over the past month, distance from the user's usual transaction locations, device type. Each pattern (one transaction) is a vector of these features.

The number of features is the **dimensionality** of the input space. Real datasets vary enormously — from a handful of features (predicting house price from a few descriptors) to millions (text classification with bag-of-words features) to billions (image classification with pixel features) to higher (the parameters of large language models).

**Feature engineering** is the process of constructing or transforming features to make a learning task easier. A raw timestamp is less useful than the day-of-week and hour-of-day derived from it. A raw transaction amount may be less useful than its ratio to the user's typical spend. Chapter 2 covers this in more depth.

### Training data

*Training data is the subset of the dataset used to fit the model's parameters — the algorithm sees both the inputs and the labels and adjusts itself to predict the labels well.*

The model "trains" on this data. The algorithm chooses parameters that minimise the prediction error on the training set. Larger and more representative training sets generally produce better models.

### Validation data

*Validation data is the subset of the dataset used to tune the model's hyperparameters and to select between candidate models, held out from training so that the choices are not biased by the data the model was fit on.*

Hyperparameters are settings of the algorithm that are not learned from the data — the depth of a decision tree, the number of layers in a neural network, the regularisation strength. The training data fits the parameters; the validation data picks the hyperparameters.

The validation set must be held out from training. If the same data fits the parameters and chooses the hyperparameters, the choices become overfit to it.

### Test data

*Test data is the subset of the dataset used to estimate the final model's performance on new examples, held out from both training and validation so that the reported performance reflects real-world generalisation.*

The test set is used only once — to report the final model's performance. It is not used to choose between models, not used to tune hyperparameters, and not used to retrain. If the model performs poorly on the test set, the modeller must resist the temptation to "fix" the model based on what they saw, because that turns the test set into a second validation set and the new test-set performance no longer reflects generalisation.

### The three-way split

The standard pattern:

```
Full dataset
  ↓
Train (60-70%)     Validation (15-20%)     Test (15-20%)
```

The exact ratios vary. For a small dataset, more is held out for testing. For a large dataset, training can take a larger fraction because even a small validation/test set is statistically adequate.

When data is genuinely scarce, **cross-validation** is used instead of a fixed split. Chapter 6 covers this.

### The split must be honest

Two failures are common.

**Data leakage.** Information from the test or validation set sneaks into training, inflating measured performance. Examples: scaling features using statistics computed over the full dataset (the test set's mean leaks into the training preprocessing); deduplicating after the split (duplicates may end up in different sets); using the future to predict the past (a transaction's "next-30-days behaviour" feature included by accident).

**Temporal leakage in time-series data.** When the data has a time dimension, the split must respect time. The validation and test sets must come *after* the training set in time. Mixing days at random creates a model that effectively peeks at the future. A model that predicts NEPSE prices using future returns as a training feature scores beautifully on cross-validated tests and loses money in production.

## 1.4 Feasibility of learning — error, noise, training vs testing

A machine-learning system fits patterns in the training data and then makes predictions on data it has not seen. Whether the predictions are accurate depends on whether the patterns in training really do generalise. This section examines what makes that possible — and what makes it fail.

### In-sample error and out-of-sample error

A model is judged by its performance on data it was *not* trained on. This is the **out-of-sample** performance, also called **generalisation** performance.

*In-sample error is the average loss of the model on the training set — the data it was fitted on.*

*Out-of-sample error is the expected loss of the model on new, unseen examples drawn from the same distribution as the training data.*

A perfect in-sample fit is easy. A polynomial of degree $n$ can fit $n$ points exactly. But a model fit too tightly to the training data captures not just the underlying pattern but also the noise unique to those particular examples. On new data, the noise is different, and the over-fit model performs poorly. This is **overfitting** — discussed in detail in Section 1.6.

The fundamental question of learning theory: under what conditions does a small in-sample error imply a small out-of-sample error?

### Noise

*Noise is the irreducible random variation in the data that is not explained by the input features — the residual variability that remains after the true underlying function is accounted for.*

Two sources:

**Stochastic noise.** Genuine randomness in the data-generating process. Two electricity customers with identical features (same area, same household size, same income bracket) still have different consumption — they prefer different temperatures, have different appliances, behave differently. The model cannot predict the difference because the features do not contain the relevant information.

**Deterministic noise.** Variation that is not random but that the model's hypothesis class cannot capture. A linear model trying to fit a quadratic function will have systematic errors that look random to the linear model but are entirely predictable to a quadratic one. From the linear model's perspective, this is "noise" — even though it is signal that a better model could use.

Noise sets a floor on the achievable error. A model cannot perform better than the noise allows, no matter how much data is collected.

### The probably-approximately-correct (PAC) framework

A theoretical foundation that says when learning is possible. Briefly:

A learning algorithm is **PAC learnable** if, with high probability ($1 - \delta$), it produces a hypothesis whose error is at most $\epsilon$ greater than the best achievable error, given a number of training examples polynomial in $1/\epsilon$, $1/\delta$, and other problem-dependent factors.

In plain language: with enough data, the learned function is "probably" (high confidence) "approximately correct" (small error). The amount of data needed grows with the complexity of the hypothesis class — more complex models need more data to be reliably learned.

**Hoeffding's inequality** gives a quantitative bound: for a fixed hypothesis $h$, the in-sample error and the out-of-sample error differ by more than $\epsilon$ with probability at most $2 e^{-2 \epsilon^2 n}$, where $n$ is the training-set size. The bound says: as $n$ grows, the in-sample and out-of-sample errors converge.

The catch: this bound holds for a *single* fixed hypothesis. When the algorithm chooses a hypothesis from many options based on the training data, the bound must be adjusted by a factor related to the size of the hypothesis class — the **VC dimension** (Vapnik-Chervonenkis dimension). The richer the hypothesis class, the more data is needed.

### Training versus testing

The most important methodological rule in machine learning:

**Train on the training set. Tune on the validation set. Report performance from the test set.**

Three reasons:

**The training error is biased downward.** A model fit on the training data is, by construction, optimised to do well on that data. Its training error is not a fair estimate of its generalisation performance.

**The validation error is also biased downward, less severely.** The model selection process — choosing hyperparameters, choosing between architectures — uses the validation set. If the modeller tries 100 architectures and picks the best on validation, the validation performance overstates how good "this" architecture is, because the modeller has done a kind of fitting to the validation set.

**Only the test error is unbiased.** And only if the test set was held out until the final reported number is computed. Using the test set repeatedly turns it into another validation set.

### Why training and testing must be independent

The training and test sets must be drawn from the same underlying distribution (technically, they should be **independent and identically distributed** — i.i.d.). If the distributions differ, the test set does not measure what the model will face in production.

This is harder than it sounds. Common violations:

**Distribution shift.** The data the model encounters in production differs from the training data because the world changed. A fraud-detection model trained on transactions from 2024 may face different fraud patterns in 2026. A model trained on Nepal in the dry season may face different patterns during the monsoon.

**Selection bias.** The training data was collected in a way that systematically excluded part of the population. A credit-scoring model trained only on people who already had bank accounts may not generalise to the unbanked population.

**Survivorship bias.** Only successful outcomes are visible in the data. A model predicting business success trained on currently-operating businesses misses the lessons of the businesses that failed and disappeared.

These problems are easy to describe and hard to fix. The remedies — careful sampling design, ongoing monitoring of model performance in production, periodic retraining — are part of the operational discipline of deploying ML systems.

## 1.5 Generalisation, bias-variance trade-off, learning curves

### Generalisation

*Generalisation is the ability of a machine-learning model to perform well on new examples it did not see during training, the primary goal of any learning system.*

A model that perfectly memorises the training set has zero training error but may have very high test error. Such a model has not generalised. A model with small training error and small test error has generalised.

The **generalisation gap** is the difference between training error and test error. A large gap suggests overfitting; a small gap suggests the model is learning real patterns rather than memorising.

### The bias-variance decomposition

A foundational result in machine-learning theory. The expected squared error of a model on a fresh example can be decomposed into three terms:

$$
\text{Expected Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}
$$

**Bias.**

*Bias is the error introduced by the model's simplifying assumptions — the difference between the average prediction across many training sets and the true underlying function.*

A model with high bias is too simple to capture the underlying pattern. A linear model fitting data with a quadratic shape will systematically miss in certain regions, no matter which training set it sees. High bias produces **underfitting**.

**Variance.**

*Variance is the variability of the model's predictions across different training sets — how much the learned function changes when the training data is resampled.*

A model with high variance is too sensitive to the particular training set. A high-degree polynomial fitted to noisy data will produce a wildly different polynomial for each new training set, even when those training sets come from the same underlying distribution. High variance produces **overfitting**.

**Irreducible noise.** The variance in the target variable itself, given the input features. The model cannot reduce this no matter how good it is.

### The trade-off

Bias and variance trade against each other. Making the model more complex (deeper tree, more neurons, higher-degree polynomial) reduces bias but increases variance. Making it simpler increases bias but reduces variance.

| Model complexity | Bias | Variance | Training error | Test error |
|---|---|---|---|---|
| Too simple (underfit) | High | Low | High | High |
| Just right | Medium | Medium | Low | Low |
| Too complex (overfit) | Low | High | Very low | High |

The art of ML is finding the sweet spot — complex enough to capture the underlying pattern, simple enough not to chase noise. The validation set is the tool for finding this point.

### Intuitive picture

Imagine throwing darts at a board. The board's centre is the true target. A learning algorithm trained on different training sets is like a player throwing darts:

- **Low bias, low variance** — darts cluster tightly near the centre. The ideal.
- **High bias, low variance** — darts cluster tightly but in the wrong spot. The player is consistent but consistently wrong.
- **Low bias, high variance** — darts scatter widely but average near the centre. The player is generally aimed right but inconsistent.
- **High bias, high variance** — darts scatter widely in the wrong region. The player is both off-target and inconsistent.

The best learning algorithm is the one whose dart pattern, averaged over many training-set draws, is tightest around the truth.

### Learning curves

*A learning curve is a plot of model performance (training error and validation error) as a function of training set size, used to diagnose whether a model is suffering from high bias, high variance, or has reached its performance ceiling.*

The shape of the learning curve reveals what is going wrong.

**High-bias model.** Training error and validation error are both high, and they converge to a similar (high) value as training set size grows. Adding more data does not help much. The model is too simple for the problem. Remedy: increase model complexity, add features, use a more expressive algorithm.

**High-variance model.** Training error is low, validation error is much higher, and the gap is large. Adding more data narrows the gap and improves validation error. The model is too complex for the available data. Remedy: collect more data, simplify the model, add regularisation.

**Well-fitted model.** Training error and validation error are both low and close to each other. The model is sized appropriately for the data. Further effort is likely to be incremental.

Diagnosing a model from its learning curve is one of the most useful skills in practical ML — before changing algorithms, run the existing model with progressively more training data and read the curves.

## 1.6 Overfitting and underfitting

The two most common failure modes of machine-learning models. Each has a specific signature and a specific set of remedies.

### Overfitting

*Overfitting is the failure mode in which a model fits the training data very well — including its noise — and consequently performs poorly on new examples.*

The model has memorised rather than generalised. Symptoms:

- Training error is very low (sometimes zero).
- Test or validation error is much higher than training error.
- Performance on training data is excellent; performance in production is disappointing.
- The model's predictions can be highly sensitive to small changes in input.

**Causes.**

- **Model too complex for the data.** A 20th-degree polynomial fit to 10 data points will pass through every point but oscillate wildly between them.
- **Training set too small.** With few examples, the model can find spurious patterns specific to those examples.
- **Too many features.** Adding more features increases the model's capacity to fit noise.
- **No regularisation.** The model is free to take any shape that fits the training data.
- **Training too long.** Neural networks trained for many epochs can fit noise in the training data; early stopping prevents this.

**Remedies.**

- **Collect more data.** The single most reliable remedy. More data reduces the model's ability to fit noise.
- **Reduce model complexity.** Use a simpler algorithm. Lower polynomial degree, shallower tree, smaller neural network.
- **Apply regularisation.** Add a penalty term to the loss function that discourages large parameter values (L1, L2, elastic net). Chapter 3 covers this.
- **Dropout (for neural networks).** Randomly disable neurons during training so the network cannot rely on any single one.
- **Early stopping.** Stop training when validation error stops improving, even if training error keeps decreasing.
- **Data augmentation.** Artificially expand the training set — for images, by rotating, cropping, flipping; for text, by paraphrasing.
- **Ensemble methods.** Combine multiple models. Random forests and gradient boosting average out individual models' overfitting.
- **Cross-validation.** Use cross-validation to choose hyperparameters that resist overfitting.

### Underfitting

*Underfitting is the failure mode in which a model is too simple to capture the underlying pattern in the data, performing poorly on both training and test data.*

The model has not learned enough. Symptoms:

- Training error is high.
- Test error is also high — and similar to the training error.
- The model's predictions look smooth, simple, or constant when the data has clear structure.
- Adding more data does not help much.

**Causes.**

- **Model too simple for the problem.** Trying to model a non-linear relationship with a straight line.
- **Too few features.** The features provided do not contain enough information to predict the target.
- **Over-regularisation.** A regularisation penalty so strong that the model is forced to be too simple.
- **Training stopped too early.** The model has not had a chance to converge.

**Remedies.**

- **Use a more complex model.** Add layers to a neural network, increase tree depth, allow more interaction terms in a linear model.
- **Add features.** Construct new features from existing ones. Feature engineering (Chapter 2) is often the highest-leverage remedy.
- **Reduce regularisation.** Lower the regularisation coefficient.
- **Train longer.** Let the model converge.
- **Switch algorithm.** Some algorithms are fundamentally limited (linear models cannot represent non-linear relationships without engineered features). Switching to a non-linear model (decision tree, random forest, neural network) can unlock the problem.

### Diagnosing which one you have

A simple decision rule:

| | Training error | Test error | Diagnosis |
|---|---|---|---|
| Low | Low | Well-fitted |
| Low | High | Overfitting |
| High | High | Underfitting |
| High | Low | Bug or leakage (this should not happen) |

The fourth row is impossible in a correct setup — a model cannot do better on unseen data than on the data it was fitted on. If you see it, something is wrong: the test set has somehow leaked into training, or the model has been evaluated incorrectly.

### A worked thought experiment

Suppose a team builds an ML model to predict whether an eSewa transaction is fraudulent. The training set has 100,000 transactions; the test set has 20,000.

**Run 1 — too simple.** A logistic regression with only two features (transaction amount and time of day) achieves 92% accuracy on the training set and 91% on the test set. The two errors are close — that rules out overfitting. But 91% is the same as the baseline (just predicting "not fraud" for everything, because fraud is rare). The model has underfit. Remedy: add more features — device fingerprint, user's recent transaction history, geographic distance from usual locations, merchant category, time since last transaction.

**Run 2 — too complex.** A random forest with 500 trees and no depth limit achieves 99.9% accuracy on the training set but 88% on the test set. The gap is huge — that is overfitting. The forest has memorised the training transactions. Remedy: limit tree depth, reduce the number of trees, add regularisation, possibly collect more data.

**Run 3 — well-fitted.** A gradient boosting model with carefully tuned hyperparameters and a moderate number of features achieves 97% training accuracy and 96% test accuracy. Small gap, both high. The model has learned without memorising. This is the deployable model.

Real ML work is mostly iteration through these states — diagnose, adjust, re-evaluate — until the model lands in the well-fitted region. The diagnostic framework from this chapter is the lens through which every later algorithm is evaluated.
