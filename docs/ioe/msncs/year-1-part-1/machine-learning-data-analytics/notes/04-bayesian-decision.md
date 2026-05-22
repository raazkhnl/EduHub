---
title: 'Chapter 4 — Bayesian Decision Based Learning'
sidebar_label: 'Ch 04 — Bayesian Decision Based Learning'
sidebar_position: 4
description: 'Chapter 4 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch04
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

This chapter shifts the perspective from "find a decision boundary" to "reason about uncertainty." Bayesian decision theory provides the gold-standard answer to classification problems when the underlying probability distributions are known. Real algorithms approximate this ideal — naive Bayes uses simplifying independence assumptions, Bayesian belief networks structure dependencies explicitly, and K-nearest neighbours sidesteps explicit modelling by using the training data directly. The gradient descent method, also covered here, is the optimisation engine that drives most non-closed-form learning algorithms — including the logistic regression and neural networks introduced in Chapter 3.

## 4.1 Bayes' probability theory and conditional probability

### Probability — a short refresher

*Probability is the formal mathematical framework for reasoning about uncertain events, assigning numbers between 0 and 1 to outcomes such that more likely outcomes have higher numbers and probabilities of mutually exclusive outcomes add.*

The three axioms (Kolmogorov, 1933):

1. $P(A) \geq 0$ for any event $A$.
2. $P(\Omega) = 1$ where $\Omega$ is the sample space (the set of all possible outcomes).
3. For mutually exclusive events $A_1, A_2, \ldots$: $P(A_1 \cup A_2 \cup \ldots) = P(A_1) + P(A_2) + \ldots$.

From these, all other probability rules follow.

### Joint, marginal, and conditional probability

**Joint probability.** $P(A \cap B)$ — the probability that both $A$ and $B$ happen. Often written $P(A, B)$.

**Marginal probability.** $P(A)$ — the probability of $A$ alone, ignoring everything else. Computed by summing the joint over the other variables:

$$
P(A) = \sum_{B} P(A, B)
$$

**Conditional probability.**

*The conditional probability of $A$ given $B$, written $P(A \mid B)$, is the probability of $A$ happening under the assumption that $B$ has happened, defined as $P(A \cap B) / P(B)$ when $P(B) > 0$.*

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Conditional probability is how new information updates a belief. Before knowing $B$, the probability of $A$ is $P(A)$. After knowing $B$, it is $P(A \mid B)$.

Example: a Khalti user's probability of being a fraud target. Before any information, the probability is the base rate — say 0.3%. Given that the user has just received a phishing SMS from an unknown number, the conditional probability is much higher.

### Independence

*Two events $A$ and $B$ are independent if $P(A \mid B) = P(A)$ — knowing $B$ does not change the probability of $A$, equivalently $P(A \cap B) = P(A) P(B)$.*

If two transactions are statistically independent, the probability that both are fraudulent is the product of the individual probabilities. In practice, transactions are usually not independent — fraud rings produce correlated transactions.

**Conditional independence** is more useful in practice:

*$A$ and $B$ are conditionally independent given $C$ if $P(A \cap B \mid C) = P(A \mid C) P(B \mid C)$ — they become independent once we know $C$.*

Two children's heights are not independent — they share family genetics. But conditional on the parents' heights, the children's heights may be (approximately) independent. Conditional independence is central to Bayesian networks (Section 4.3).

### Bayes' theorem

*Bayes' theorem is the fundamental formula in Bayesian probability, expressing the posterior probability $P(A \mid B)$ in terms of the likelihood $P(B \mid A)$, the prior $P(A)$, and the marginal probability $P(B)$.*

$$
P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)}
$$

The components have standard names:

- **Posterior** — $P(A \mid B)$ — the updated probability of $A$ after observing $B$.
- **Likelihood** — $P(B \mid A)$ — how probable the observation $B$ is, assuming $A$.
- **Prior** — $P(A)$ — the probability of $A$ before observing anything.
- **Evidence (marginal)** — $P(B)$ — the probability of observing $B$.

The denominator $P(B)$ can be expanded using the **law of total probability**:

$$
P(B) = \sum_{A} P(B \mid A) P(A)
$$

This sums over all possible values of $A$.

### A worked example — disease screening

A diagnostic test for a rare disease:

- Base rate of the disease: 1 in 1000 → $P(D) = 0.001$.
- The test correctly identifies 99% of true cases: $P(+ \mid D) = 0.99$.
- The test gives a false positive 5% of the time on healthy people: $P(+ \mid \neg D) = 0.05$.

A patient tests positive. What is the probability they actually have the disease?

By Bayes:

$$
P(D \mid +) = \frac{P(+ \mid D) P(D)}{P(+)}
$$

Compute the denominator:

$$
P(+) = P(+ \mid D) P(D) + P(+ \mid \neg D) P(\neg D) = 0.99 \cdot 0.001 + 0.05 \cdot 0.999 = 0.00099 + 0.04995 = 0.05094
$$

Then:

$$
P(D \mid +) = \frac{0.00099}{0.05094} \approx 0.0194
$$

The probability that the patient actually has the disease, given a positive test result, is only about 1.94%. Despite the test being 99% sensitive, the rarity of the disease means most positive results are false positives.

This counterintuitive result — known as the **base rate fallacy** — illustrates why Bayesian reasoning matters. The likelihood alone is misleading; the prior makes the difference.

The same arithmetic explains why fraud detection generates so many false alarms: with fraud rare and detectors imperfect, most flagged transactions are not fraud.

### Bayes for classification

Bayes' theorem is the foundation of probabilistic classifiers. For a classification problem with $K$ classes and feature vector $x$:

$$
P(y = k \mid x) = \frac{P(x \mid y = k) P(y = k)}{P(x)}
$$

To classify $x$, compute the posterior for each class and pick the maximum. Since $P(x)$ is the same across classes, it does not affect the argmax:

$$
\hat{y} = \arg\max_{k} P(x \mid y = k) P(y = k)
$$

The Bayes-optimal classifier — introduced in Chapter 3 — does exactly this with the true distributions. Real classifiers must estimate $P(x \mid y = k)$ and $P(y = k)$ from training data.

## 4.2 Decision surfaces and classifying with Bayes decision theory

### Decision rule

The **Bayes decision rule** assigns each input to the class with the highest posterior probability. For binary classification:

$$
\hat{y} = \begin{cases} 1 & \text{if } P(y = 1 \mid x) > P(y = 0 \mid x) \\ 0 & \text{otherwise} \end{cases}
$$

Using Bayes, this becomes:

$$
\hat{y} = \begin{cases} 1 & \text{if } P(x \mid y=1) P(y=1) > P(x \mid y=0) P(y=0) \\ 0 & \text{otherwise} \end{cases}
$$

The decision boundary is the set of $x$ where $P(y = 1 \mid x) = P(y = 0 \mid x) = 0.5$.

### Decision surfaces

The shape of the decision surface depends on the class-conditional distributions.

**Equal Gaussian class-conditionals with equal covariance.** When $P(x \mid y = k) = \mathcal{N}(\mu_k, \Sigma)$ — Gaussian with class-specific mean but shared covariance matrix — the decision boundary is a **hyperplane**. This recovers **Linear Discriminant Analysis (LDA)**, covered in Chapter 5.

**Gaussian class-conditionals with class-specific covariance.** When each class has its own covariance, the boundary is a **quadratic surface**. This is **Quadratic Discriminant Analysis (QDA)**.

**General distributions.** The boundary can be arbitrary. Non-parametric methods (K-nearest neighbours, kernel density estimates) approximate it without making distributional assumptions.

### Minimum-error-rate classification

The Bayes rule minimises the expected **0-1 loss** — picking the most-likely class minimises the probability of error. This is the minimum-error-rate classifier.

The error rate of this ideal classifier is the **Bayes error rate** — the inherent difficulty of the problem. No classifier, however clever, can do better.

For two classes with Gaussian distributions $\mathcal{N}(\mu_1, \sigma^2)$ and $\mathcal{N}(\mu_2, \sigma^2)$ and equal priors, the Bayes error rate is given by:

$$
\epsilon^* = \Phi\left(-\frac{|\mu_1 - \mu_2|}{2\sigma}\right)
$$

where $\Phi$ is the standard normal cumulative distribution function. The error decreases as the class means separate (relative to the noise).

### Minimum-risk classification

The 0-1 loss treats all errors equally. In many real applications, errors have different costs.

- Missing a fraudulent transaction (false negative) costs the user and bank the transaction amount.
- Flagging a legitimate transaction as fraud (false positive) frustrates the customer and may lock their account.

**Loss matrix.** $L(i, j)$ is the cost of predicting class $i$ when the true class is $j$.

The **expected loss** (or **conditional risk**) for predicting class $i$ given $x$:

$$
R(i \mid x) = \sum_{j} L(i, j) P(y = j \mid x)
$$

The **minimum-risk classifier** picks the class with the lowest expected loss:

$$
\hat{y} = \arg\min_{i} R(i \mid x)
$$

When the loss matrix is the 0-1 loss ($L(i, j) = 0$ for $i = j$, 1 otherwise), this reduces to picking the most-likely class — the minimum-error-rate classifier. With other loss matrices, the decision threshold shifts. If false negatives are 10 times more costly than false positives, the classifier should predict the positive class more readily — flagging more transactions as suspicious.

### Naive Bayes classifier

*The Naive Bayes classifier is a probabilistic classifier that applies Bayes' theorem with the strong (and usually incorrect) assumption that all features are conditionally independent given the class, allowing the joint likelihood to be factored into a product of per-feature likelihoods.*

The "naive" assumption:

$$
P(x \mid y = k) = P(x_1, x_2, \ldots, x_d \mid y = k) = \prod_{j=1}^{d} P(x_j \mid y = k)
$$

Each feature's distribution within a class is estimated independently. Multiplying them gives the joint likelihood.

Despite the independence assumption being almost always false, Naive Bayes works surprisingly well in practice — particularly for text classification (spam filtering, document categorisation). The decision boundary is often close enough to optimal even when the probability estimates are miscalibrated.

**Variants:**

- **Gaussian Naive Bayes.** $P(x_j \mid y = k)$ is a Gaussian with mean and variance estimated per class.
- **Multinomial Naive Bayes.** For count features (word counts in documents). $P(x_j \mid y = k)$ follows a multinomial distribution.
- **Bernoulli Naive Bayes.** For binary features (word present or absent).

**A worked example — spam filtering with Naive Bayes.**

Suppose a tiny training set of emails labelled spam (S) or ham (H):

| Words | Label |
|---|---|
| "free money win" | S |
| "free meeting today" | H |
| "win cash now" | S |
| "meeting at 3" | H |
| "free cash offer" | S |

Priors: $P(S) = 3/5 = 0.6$, $P(H) = 2/5 = 0.4$.

Estimate $P(w \mid S)$ and $P(w \mid H)$ for each word (using add-one Laplace smoothing to avoid zero probabilities):

Total words in spam: 9. Vocabulary: {free, money, win, cash, now, offer, meeting, today, at, 3} = 10 distinct words.
- $P(\text{free} \mid S) = (2+1)/(9+10) = 3/19$
- $P(\text{money} \mid S) = (1+1)/19 = 2/19$
- $P(\text{win} \mid S) = (2+1)/19 = 3/19$
- ...

Total words in ham: 7.
- $P(\text{free} \mid H) = (1+1)/(7+10) = 2/17$
- $P(\text{meeting} \mid H) = (2+1)/17 = 3/17$
- ...

To classify a new email "free win today":

$$
P(S) \prod P(w \mid S) = 0.6 \cdot \frac{3}{19} \cdot \frac{3}{19} \cdot \frac{1}{19} \approx 0.6 \cdot 0.0436 \cdot 0.0526 \approx 0.00138
$$

$$
P(H) \prod P(w \mid H) = 0.4 \cdot \frac{2}{17} \cdot \frac{1}{17} \cdot \frac{2}{17} \approx 0.4 \cdot 0.000812 \approx 0.000325
$$

Spam is more likely. Classify as spam.

Real spam filters use thousands of features (words, bigrams, headers, URL patterns) and millions of training examples. The mathematics is the same; the engineering is more involved.

Naive Bayes was the original spam-filtering technology in the late 1990s and early 2000s. Modern spam filters use more sophisticated methods (gradient boosting, neural networks) but Naive Bayes still works as a strong baseline.

## 4.3 Bayesian belief networks

### Bayesian belief network

*A Bayesian belief network (or Bayesian network, or directed graphical model) is a probabilistic graphical model in which a directed acyclic graph represents conditional dependencies among a set of random variables — each node is a variable, each directed edge means "directly influences," and each node has a conditional probability distribution given its parents.*

The structure of a Bayesian network encodes which variables are conditionally independent of which others. Variables that are not connected (directly or indirectly) are independent. Variables connected through a path can be dependent — but only in specific ways determined by the direction of the edges.

The joint distribution factors over the network:

$$
P(X_1, X_2, \ldots, X_n) = \prod_{i=1}^{n} P(X_i \mid \text{Parents}(X_i))
$$

Each node has a **conditional probability table (CPT)** giving $P(X_i \mid \text{Parents}(X_i))$ for every combination of parent values.

### A worked example — credit risk Bayesian network

A simplified credit-risk model for a Nepali bank:

```
   [Education]    [Income]
        \           /
         ↓         ↓
         [Job stability]
                ↓
        [Default risk]
                ↓
          [Will default?]
```

Variables (each Boolean for simplicity):
- $E$ = Has higher education.
- $I$ = High income.
- $J$ = Stable job (depends on $E$ and $I$).
- $R$ = High default risk (depends on $J$).
- $D$ = Actually defaults (depends on $R$).

Specify the CPTs:

- $P(E = T) = 0.3$, $P(E = F) = 0.7$.
- $P(I = T) = 0.2$, $P(I = F) = 0.8$.
- $P(J = T \mid E, I)$: $P(J \mid E, I) = 0.95$; $P(J \mid E, \neg I) = 0.6$; $P(J \mid \neg E, I) = 0.7$; $P(J \mid \neg E, \neg I) = 0.2$.
- $P(R = T \mid J = T) = 0.05$; $P(R = T \mid J = F) = 0.4$.
- $P(D = T \mid R = T) = 0.6$; $P(D = T \mid R = F) = 0.02$.

The joint factorises:

$$
P(E, I, J, R, D) = P(E) P(I) P(J \mid E, I) P(R \mid J) P(D \mid R)
$$

A full joint over five binary variables would have $2^5 - 1 = 31$ independent probabilities. The network's factorisation needs only the CPTs — much fewer parameters.

### Inference in Bayesian networks

Given observations of some variables, compute the posterior probability of unobserved variables.

A typical query: "Given that an applicant has higher education and high income, what is the probability they will default?"

$$
P(D = T \mid E = T, I = T) = \sum_{j, r} P(D = T \mid r) P(r \mid j) P(j \mid E = T, I = T)
$$

Compute term by term:
- $P(J = T \mid E = T, I = T) = 0.95$, $P(J = F \mid E = T, I = T) = 0.05$.
- $P(R = T \mid J = T) = 0.05$, $P(R = F \mid J = T) = 0.95$.
- $P(R = T \mid J = F) = 0.4$, $P(R = F \mid J = F) = 0.6$.
- $P(D = T \mid R = T) = 0.6$, $P(D = T \mid R = F) = 0.02$.

Sum over $j$ and $r$:

For $j = T$: $P(R = T \mid J = T) = 0.05$.
- $r = T$: $0.95 \cdot 0.05 \cdot 0.6 = 0.0285$.
- $r = F$: $0.95 \cdot 0.95 \cdot 0.02 = 0.01805$.

For $j = F$: $P(J = F \mid E = T, I = T) = 0.05$.
- $r = T$: $0.05 \cdot 0.4 \cdot 0.6 = 0.012$.
- $r = F$: $0.05 \cdot 0.6 \cdot 0.02 = 0.0006$.

Total: $0.0285 + 0.01805 + 0.012 + 0.0006 \approx 0.059$. So $P(D = T \mid E = T, I = T) \approx 5.9\%$.

For comparison, the base default rate (marginalising over everything) might be 15-20% in this hypothetical model — the high-education, high-income applicant has much lower predicted default risk.

### Inference complexity

Exact inference in Bayesian networks is **NP-hard** in general. For tree-structured networks (each node has at most one parent), exact inference is efficient. For arbitrary networks, exact inference can be intractable for large networks.

**Approximate inference methods:**
- **Variable elimination.** Systematic exact inference, efficient for many networks.
- **Belief propagation.** Message-passing algorithm, exact on trees, approximate on general graphs.
- **Markov Chain Monte Carlo (MCMC).** Sample from the posterior; Gibbs sampling is a standard variant.
- **Variational inference.** Approximate the posterior with a simpler distribution.

### Learning Bayesian networks

Two parts:

**Parameter learning.** Given the network structure, estimate the CPTs from data. With complete data, this is just counting (with optional smoothing).

**Structure learning.** Given data, determine the network's graph. Much harder — searching over directed acyclic graphs is combinatorial. Methods include score-based search (define a goodness measure, search over structures) and constraint-based methods (test conditional independencies and orient edges accordingly).

### Applications

Bayesian networks have been used in:

- **Medical diagnosis.** Pathfinder (Heckerman 1991), an early Bayesian-network system for lymph-node pathology, outperformed human experts.
- **Fault diagnosis.** Microsoft's printer-troubleshooting wizards used Bayesian networks for years.
- **Speech recognition.** Hidden Markov Models (a type of dynamic Bayesian network) were the standard from the 1980s through the early 2010s.
- **Bioinformatics.** Gene-regulatory network inference.
- **Risk assessment.** Insurance underwriting, credit scoring, project management.
- **Information retrieval.** Probabilistic models of relevance.
- **Causal inference.** When the network is given a causal interpretation, Bayesian networks support reasoning about interventions and counterfactuals.

In Nepal, Bayesian methods are used in some areas of risk assessment in finance and in academic research in fields like hydrology (rainfall-runoff models) and disease modelling. Deep learning has displaced Bayesian networks for many tasks where rich data is available, but Bayesian networks retain advantages in domains with strong prior knowledge, limited data, or a need for explicit causal reasoning.

## 4.4 Gradient descent method

### The optimisation problem

Most machine-learning algorithms reduce to optimisation: find parameters that minimise a loss function. For some algorithms (OLS linear regression, basic SVM) the optimum has a closed form. For most others (logistic regression, neural networks, gradient-boosted trees), the optimum must be found iteratively.

**Gradient descent** is the workhorse iterative optimisation method.

### Gradient descent

*Gradient descent is the iterative optimisation algorithm that finds a local minimum of a differentiable function by repeatedly taking small steps in the direction of the negative gradient — the direction of steepest decrease — until the function stops decreasing meaningfully.*

For a function $f(\theta)$ of a parameter vector $\theta$, the update rule is:

$$
\theta_{t+1} = \theta_t - \eta \nabla f(\theta_t)
$$

where $\nabla f(\theta_t)$ is the gradient of $f$ at $\theta_t$ and $\eta > 0$ is the **learning rate**.

Intuition: the gradient $\nabla f$ points in the direction of steepest *ascent*. The negative gradient points in the direction of steepest descent. Take a small step in that direction; the function decreases.

### A one-dimensional example

Consider $f(\theta) = (\theta - 3)^2$. The minimum is at $\theta = 3$ where $f = 0$.

$\nabla f(\theta) = 2(\theta - 3)$.

Start at $\theta_0 = 0$. With $\eta = 0.1$:

| Step | $\theta_t$ | $\nabla f(\theta_t)$ | $f(\theta_t)$ |
|---|---|---|---|
| 0 | 0.0 | -6.0 | 9.00 |
| 1 | 0.6 | -4.8 | 5.76 |
| 2 | 1.08 | -3.84 | 3.69 |
| 3 | 1.464 | -3.072 | 2.36 |
| 4 | 1.7712 | -2.4576 | 1.51 |
| ... | ... | ... | ... |
| 20 | 2.96 | -0.07 | 0.0016 |

The sequence converges to $\theta = 3$. After 20 steps, the function value is very close to the minimum.

### Learning rate effects

The learning rate $\eta$ controls step size. Too small, and convergence is slow. Too large, and the algorithm overshoots and may diverge.

- **$\eta$ too small.** Tiny steps. Many iterations needed. May get stuck in flat regions or slow plateaus.
- **$\eta$ too large.** Steps overshoot the minimum. The function may oscillate or diverge to infinity.
- **$\eta$ just right.** Smooth, fast convergence.

A common strategy is to start with a moderate learning rate and decrease it as training progresses — **learning rate scheduling**.

### Local minima and saddle points

Gradient descent finds a *local* minimum. For convex functions (bowl-shaped), the local minimum is also the global minimum, and gradient descent finds the optimal answer. For non-convex functions — which include almost all neural network losses — multiple local minima exist, and gradient descent finds one of them.

In high-dimensional neural-network loss landscapes, **saddle points** (points where the gradient is zero but the function is not at a minimum — flat in some directions, curving up in some, down in others) are more common than local minima. Modern variants of gradient descent (Adam, SGD with momentum) help escape saddle points.

### Batch, stochastic, and mini-batch gradient descent

For a loss function that is a sum over training examples, the gradient is a sum of per-example gradients:

$$
\nabla f(\theta) = \sum_{i=1}^{n} \nabla f_i(\theta)
$$

**Batch (full-batch) gradient descent.** Compute the gradient over the entire training set in each step. Stable but slow — every update requires a pass through all the data.

**Stochastic gradient descent (SGD).** Use one randomly chosen example per step. Very fast per step, but the gradient is noisy and the path zigzags. Converges in expectation but with much higher variance.

**Mini-batch gradient descent.** Use a small batch (32, 64, 128, 256 examples) per step. The best of both — faster than full-batch, less noisy than pure stochastic. The standard in deep learning.

### Modern variants

Plain gradient descent has known weaknesses. Several improvements are standard in modern practice.

**SGD with momentum.** Maintain a "velocity" — an exponentially weighted average of past gradients — and update using the velocity rather than the raw gradient. Smooths oscillations and accelerates progress in consistent directions.

$$
v_{t+1} = \beta v_t + (1 - \beta) \nabla f(\theta_t)
$$
$$
\theta_{t+1} = \theta_t - \eta v_{t+1}
$$

$\beta$ is typically 0.9.

**RMSProp.** Adapt the learning rate per parameter based on a running average of squared gradients. Parameters with consistently large gradients get smaller learning rates; parameters with small gradients get larger learning rates.

**Adam (Adaptive Moment Estimation).** Combines momentum and RMSProp. The default choice in modern deep learning. Maintains running averages of both gradients and squared gradients.

**Learning-rate scheduling.** Decrease the learning rate during training. Step decay, cosine annealing, and warmup-then-decay are common patterns.

### Gradient descent in machine learning

Gradient descent (or its variants) trains:

- Logistic regression and other linear models with non-closed-form solutions.
- Neural networks of all kinds (the algorithm behind backpropagation in Chapter 7).
- Gradient-boosted trees (which use gradient descent in function space).
- Many other models — collaborative filtering, deep reinforcement learning policies, language models.

It is the most-used algorithm in modern machine learning. Understanding it well is essential for both choosing hyperparameters and debugging when training does not converge.

### Failure modes

Things that can go wrong:

- **Vanishing gradients.** In deep networks, gradients can become very small at lower layers, halting learning. Mitigated by careful initialisation, ReLU activations, batch normalisation, skip connections.
- **Exploding gradients.** Gradients become very large, causing numerical overflow. Mitigated by gradient clipping.
- **Slow plateaus.** The loss decreases very slowly. Often a sign of poor initialisation or a learning rate that needs adjustment.
- **Oscillation.** The loss bounces up and down. Usually the learning rate is too large.
- **Poor local minimum.** The model gets stuck at a suboptimal solution. Restarting from different initialisations can help.

Diagnosing these is part of practical neural-network engineering.

## 4.5 K-nearest neighbours

### K-nearest neighbours (K-NN)

*K-nearest neighbours is a non-parametric supervised-learning algorithm that classifies (or predicts a regression value for) a new example by finding the K closest training examples and aggregating their labels — majority vote for classification, mean for regression.*

K-NN has a remarkable property: there is no explicit training. All "training" amounts to storing the training data. The actual computation happens at prediction time — for each new query, the algorithm searches the training set for the K closest examples and combines their labels.

This is sometimes called **lazy learning** or **instance-based learning** — as opposed to **eager learning** algorithms (linear regression, decision trees, neural networks) that build an explicit model during training.

### The algorithm

To predict the label of a new input $x$:

1. Compute the distance from $x$ to every training example.
2. Find the $K$ training examples with the smallest distances.
3. **For classification:** return the majority class among these $K$ neighbours.
4. **For regression:** return the mean of the targets of these $K$ neighbours.

### Choice of distance

The most common distance metrics:

**Euclidean distance.**

$$
d(x, x') = \sqrt{\sum_{j=1}^{d} (x_j - x'_j)^2}
$$

The standard. Sensitive to feature scaling — a feature with values in [0, 1,000,000] dominates one in [0, 1].

**Manhattan (L1) distance.**

$$
d(x, x') = \sum_{j=1}^{d} |x_j - x'_j|
$$

Less affected by outliers in individual dimensions.

**Minkowski distance.** A family generalising Euclidean (p=2) and Manhattan (p=1):

$$
d(x, x') = \left(\sum_{j=1}^{d} |x_j - x'_j|^p\right)^{1/p}
$$

**Cosine distance.**

$$
d(x, x') = 1 - \frac{x \cdot x'}{\|x\| \|x'\|}
$$

Measures the angle between vectors. Useful for text and other high-dimensional sparse data where magnitude is less meaningful than direction.

**Hamming distance.** For binary or categorical features. Counts the positions where two vectors differ.

The choice of distance shapes what "nearest" means. Features must usually be **scaled** (Chapter 2) before applying K-NN — otherwise the largest-range feature dominates the distance.

### Choice of K

$K$ is the key hyperparameter.

- **K = 1.** The classifier copies the label of the nearest neighbour. Very flexible. High variance — sensitive to outliers and noise. Decision boundary can be jagged.
- **K = 3, 5, 7.** Smoothes the decision boundary. Less sensitive to noise.
- **K large.** Very smooth decision boundary. May underfit if too large.
- **K = n (the whole training set).** The classifier always predicts the majority class. Underfit extreme.

The sweet spot is typically a moderate $K$. Common starting points: $K = \sqrt{n}$ or use cross-validation to choose.

For binary classification, odd $K$ avoids ties.

### A worked example

A simplified problem: predict loan default based on age and income. Training set:

| Age | Income (k NPR) | Default |
|---|---|---|
| 25 | 30 | Yes |
| 35 | 60 | No |
| 28 | 35 | Yes |
| 45 | 80 | No |
| 30 | 40 | Yes |
| 38 | 70 | No |
| 50 | 100 | No |
| 26 | 28 | Yes |

A new applicant: age 32, income 50.

With Euclidean distance (after standardising the features so age and income have comparable scales — but for illustration we use raw values):

| Training point | Distance to (32, 50) |
|---|---|
| (25, 30) | $\sqrt{49 + 400} = \sqrt{449} \approx 21.2$ |
| (35, 60) | $\sqrt{9 + 100} = \sqrt{109} \approx 10.4$ |
| (28, 35) | $\sqrt{16 + 225} = \sqrt{241} \approx 15.5$ |
| (45, 80) | $\sqrt{169 + 900} = \sqrt{1069} \approx 32.7$ |
| (30, 40) | $\sqrt{4 + 100} = \sqrt{104} \approx 10.2$ |
| (38, 70) | $\sqrt{36 + 400} = \sqrt{436} \approx 20.9$ |
| (50, 100) | $\sqrt{324 + 2500} = \sqrt{2824} \approx 53.1$ |
| (26, 28) | $\sqrt{36 + 484} = \sqrt{520} \approx 22.8$ |

Sorted: (30, 40) at 10.2, (35, 60) at 10.4, (28, 35) at 15.5, (38, 70) at 20.9, (25, 30) at 21.2, (26, 28) at 22.8, (45, 80) at 32.7, (50, 100) at 53.1.

For $K = 3$: nearest three are (30, 40) → Yes, (35, 60) → No, (28, 35) → Yes. Majority: Yes. Predicted: default.

For $K = 5$: nearest five are Yes, No, Yes, No, Yes. Majority: Yes. Predicted: default.

The example highlights the importance of feature scaling. The income range is much wider than the age range; without scaling, income dominates the distance. After standardising (subtract mean, divide by standard deviation), both features contribute proportionally.

### Strengths and weaknesses

**Strengths:**

- Conceptually simple — easy to explain and implement.
- No training time (only prediction time matters).
- Naturally non-linear — can represent arbitrarily complex decision boundaries.
- Effective for many problems, especially with low-dimensional data and abundant examples.
- Easy to update — new training examples are just added to the store.

**Weaknesses:**

- **Slow at prediction time.** Computing distances to all training examples for each query is $O(nd)$. For large training sets, this is prohibitive. Approximations (KD-trees, ball trees, locality-sensitive hashing) speed it up.
- **Memory-intensive.** Must store the entire training set.
- **Sensitive to irrelevant features.** Features that do not help classification still contribute to the distance, drowning out the useful ones. Feature selection is important.
- **Sensitive to feature scaling.** Always scale before applying K-NN.
- **Curse of dimensionality.** In very high dimensions, all pairs of points have similar distances and "nearest" becomes meaningless.

### Distance-weighted K-NN

A refinement: weight the neighbours by inverse distance. Closer neighbours contribute more to the prediction than distant ones.

$$
\hat{y} = \frac{\sum_{i=1}^{K} w_i y_i}{\sum_{i=1}^{K} w_i} \quad \text{where } w_i = \frac{1}{d_i^2 + \epsilon}
$$

For classification, weighted majority voting: each neighbour's vote is its inverse-distance weight.

Distance-weighted K-NN often performs better than uniform K-NN, particularly when $K$ is large.

### Applications

K-NN has been used in:

- **Recommendation systems.** Find users similar to the current user and recommend what they liked. The original Amazon and Netflix recommendation systems used neighbourhood methods.
- **Pattern recognition.** Handwriting recognition, image retrieval.
- **Outlier detection.** Examples with no close neighbours are outliers.
- **Imputation.** Fill missing values from similar records.
- **Document classification.** With cosine distance on TF-IDF vectors.

K-NN is no longer the state-of-the-art for most large-scale problems, but it remains valuable as a strong baseline, an interpretable method, and a building block in more complex systems. The curse of dimensionality and the slow prediction time keep it from competing with neural networks on the largest tasks, but for medium-sized, well-curated datasets K-NN often works surprisingly well.

### A connection to Bayesian classification

K-NN can be seen as a non-parametric estimate of $P(y \mid x)$. Among the K nearest neighbours, the fraction belonging to class $k$ is an estimate of $P(y = k \mid x)$. The Bayes decision rule — pick the class with the highest posterior — is what K-NN does by majority vote.

This connection is why K-NN works at all. As the training-set size grows and $K$ scales appropriately (slower than $n$), the K-NN classifier's error rate converges to the Bayes error rate. It is a consistent estimator of the optimal classifier.

The chapter has covered the Bayesian foundations of classification — Bayes' theorem, decision theory, naive Bayes, belief networks — alongside the optimisation engine (gradient descent) that powers most non-closed-form algorithms, and a non-parametric method (K-NN) that side-steps explicit modelling entirely. These methods anchor the probabilistic perspective on supervised learning. The next chapter shifts to unsupervised learning, where the goal is to find structure in data without explicit labels.
