---
title: 'Chapter 3 — Supervised Learning'
sidebar_label: 'Ch 03 — Supervised Learning'
sidebar_position: 3
description: 'Chapter 3 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch03
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Supervised learning is the most widely used branch of machine learning. Given a training set of input-output pairs, a supervised algorithm learns a function that predicts outputs for new inputs. The class of functions, the way the function is parameterised, and the procedure for finding the best parameters are what distinguish one algorithm from another. This chapter covers the foundational supervised-learning models — linear regression, the perceptron, neural networks, decision trees, and support vector machines — building the mathematical and conceptual tools that the rest of the subject relies on.

## 3.1 Definition and the classification problem

### Supervised learning

*Supervised learning is the family of machine-learning methods that learn a mapping from inputs to outputs using a training set of labelled examples $(x_i, y_i)$, with the goal of predicting the output $y$ for any new input $x$.*

The supervised setting has three ingredients:

- **Input space $\mathcal{X}$.** The set of possible inputs. Often $\mathbb{R}^d$ for $d$-dimensional real-valued features, but can be anything — text, images, graphs.
- **Output space $\mathcal{Y}$.** The set of possible outputs. The structure of $\mathcal{Y}$ determines the type of problem.
- **Training set $\mathcal{D} = \{(x_1, y_1), \ldots, (x_n, y_n)\}$.** A finite set of input-output pairs assumed drawn independently from some unknown joint distribution $P(X, Y)$.

The goal is to find a function $f: \mathcal{X} \to \mathcal{Y}$ that approximates the true relationship. "Best" is measured by a **loss function** $L(y, \hat{y})$ that quantifies the cost of predicting $\hat{y}$ when the truth is $y$. The expected loss over the data distribution is the **risk**:

$$
R(f) = \mathbb{E}_{(X, Y) \sim P} [L(Y, f(X))]
$$

We cannot compute $R(f)$ directly because $P$ is unknown. We approximate it with the **empirical risk** on the training set:

$$
\hat{R}(f) = \frac{1}{n} \sum_{i=1}^{n} L(y_i, f(x_i))
$$

A learning algorithm chooses $f$ from a hypothesis class $\mathcal{H}$ to minimise some combination of empirical risk and a regularisation term (which limits the complexity of $f$ to control overfitting).

### Regression vs classification

The output space determines the problem type:

**Regression** — $\mathcal{Y} = \mathbb{R}$ (or $\mathbb{R}^k$). The output is a continuous number.

- Predict tomorrow's peak electricity demand in Bagmati.
- Predict a Khalti user's expected lifetime value.
- Predict the closing price of a NEPSE-listed stock.
- Predict house prices in Patan.

The standard loss is **squared error**: $L(y, \hat{y}) = (y - \hat{y})^2$.

**Classification** — $\mathcal{Y}$ is a finite, unordered set. The output is a category.

- Spam vs ham email.
- Fraudulent vs legitimate transaction.
- Disease present vs absent in a medical scan.
- Loan default vs no default.

The standard loss is **0-1 loss** ($L(y, \hat{y}) = 0$ if $y = \hat{y}$, else 1) for evaluation; for training, smoother losses like **cross-entropy** are used because they are differentiable.

### The classification problem in detail

The classification setting:

- Input $x \in \mathbb{R}^d$ (after any preprocessing and encoding).
- Output $y \in \{1, 2, \ldots, K\}$ for $K$ classes.
- A classifier $f: \mathbb{R}^d \to \{1, 2, \ldots, K\}$.

Binary classification ($K = 2$) is the simplest case and the most studied. Labels are typically coded as $\{0, 1\}$ or $\{-1, +1\}$ for mathematical convenience.

Multi-class ($K > 2$) is handled either by:
- **Direct multi-class algorithms** — decision trees, neural networks with softmax output, multinomial logistic regression.
- **Reduction to binary** — one-vs-rest (train $K$ binary classifiers, each distinguishing one class from the rest) or one-vs-one (train $K(K-1)/2$ binary classifiers, one for each pair of classes).

### Probabilistic vs deterministic classifiers

A **deterministic** classifier outputs a single class for each input — $f(x) \in \{1, \ldots, K\}$.

A **probabilistic** classifier outputs a probability distribution over classes — $P(y = k \mid x)$ for $k = 1, \ldots, K$. To make a hard prediction, pick the class with the highest probability.

The probabilistic form is more useful in practice:
- It quantifies confidence. "This transaction is fraud with probability 0.92" is more informative than "this transaction is fraud."
- It allows threshold tuning. The deployment may want to flag transactions with $P > 0.6$ for review rather than $P > 0.5$, depending on operational cost.
- It supports cost-sensitive decisions. Combined with the cost of false positives vs false negatives, the right decision is the one that minimises expected cost — not necessarily the most-likely class.

Logistic regression, neural networks with softmax outputs, naive Bayes, and many tree ensembles produce probabilistic outputs. SVMs and basic decision trees produce hard predictions natively (though they can be modified to produce probabilities).

## 3.2 Classifiers and discriminant functions

### Discriminant function

*A discriminant function is a function $g_k(x)$ associated with each class $k$ such that a classifier assigns input $x$ to the class with the largest discriminant value, providing a unified mathematical framework for many classification algorithms.*

A classifier with $K$ classes can be expressed using $K$ discriminant functions $g_1(x), g_2(x), \ldots, g_K(x)$. The decision rule:

$$
\hat{y} = \arg\max_{k \in \{1, \ldots, K\}} g_k(x)
$$

Assign $x$ to whichever class has the highest discriminant value. The form of the discriminant function determines the algorithm:

- **Bayes classifier:** $g_k(x) = P(y = k \mid x) = \frac{P(x \mid y = k) P(y = k)}{P(x)}$. The optimal classifier if the true class-conditional distributions are known. Chapter 4 covers this in depth.
- **Logistic regression:** $g_k(x) = w_k^T x + b_k$, with softmax for multi-class.
- **Linear discriminant analysis:** $g_k(x) = $ a linear function specific to LDA's assumptions (covered in Chapter 5).
- **Neural network:** $g_k(x) = $ the output of the network's last layer for class $k$.

### Decision boundaries

The **decision boundary** between class $i$ and class $j$ is the set of points where $g_i(x) = g_j(x)$. On one side of this boundary, class $i$ wins; on the other, class $j$.

The shape of the decision boundary characterises the algorithm:

- **Linear classifiers** — boundaries are hyperplanes. Logistic regression, perceptron, linear SVM, LDA.
- **Quadratic classifiers** — boundaries are quadratic surfaces. Quadratic discriminant analysis.
- **Non-linear classifiers** — boundaries can take arbitrary shapes. Decision trees (axis-aligned step boundaries), kernel SVMs, neural networks.

A classifier whose boundary cannot match the true class separation is doomed to underfit, no matter how much data is provided. Linear classifiers cannot solve the XOR problem (Section 3.3 returns to this).

### The Bayes-optimal classifier

*The Bayes-optimal classifier is the classifier that minimises the expected 0-1 loss by assigning each input to the class with the highest posterior probability $P(y = k \mid x)$, providing a theoretical lower bound on classification error.*

If we knew the true conditional class probabilities $P(y = k \mid x)$, no classifier could beat one that picks the most-probable class. The error rate of this ideal classifier is the **Bayes error rate** — the irreducible error inherent in the problem.

Real classifiers approximate $P(y = k \mid x)$ from training data. The gap between a real classifier's error and the Bayes error reflects how good the approximation is. The Bayes error itself is the noise floor — no classifier can do better.

### Linear discriminant functions

A linear discriminant function has the form:

$$
g(x) = w^T x + b = w_1 x_1 + w_2 x_2 + \cdots + w_d x_d + b
$$

where $w \in \mathbb{R}^d$ is the weight vector and $b \in \mathbb{R}$ is the bias (offset). The decision boundary $g(x) = 0$ is a hyperplane in $\mathbb{R}^d$ — a line in 2D, a plane in 3D, a flat surface in higher dimensions.

Linear discriminant functions are simple, fast to train, easy to interpret (the weight $w_j$ is the contribution of feature $x_j$ to the prediction), and surprisingly effective on many practical problems.

When the classes are not linearly separable, linear classifiers fail. The remedy is either:
- Add non-linear features (polynomial features, interaction terms) — turn a non-linear problem into a linear one in a higher-dimensional space.
- Use a non-linear algorithm (decision tree, neural network, kernel SVM).

## 3.3 Linear supervised learning models

### Linear regression

*Linear regression is the regression model that predicts a continuous target as a linear combination of input features, fitted by minimising the sum of squared residuals between predictions and actual values.*

For a single feature ($d = 1$):

$$
\hat{y} = w \cdot x + b
$$

For multiple features:

$$
\hat{y} = w_1 x_1 + w_2 x_2 + \cdots + w_d x_d + b = w^T x + b
$$

The parameters $w$ and $b$ are chosen to minimise the sum of squared residuals over the training set:

$$
\text{Loss}(w, b) = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2 = \sum_{i=1}^{n} (y_i - w^T x_i - b)^2
$$

This is the **Ordinary Least Squares (OLS)** estimator.

### Closed-form solution for OLS

For linear regression with multiple features, write the data as a matrix:

- $X$ is the $n \times d$ matrix of inputs (each row is one example's features).
- $\mathbf{y}$ is the vector of $n$ target values.
- $\mathbf{w}$ is the $d$-vector of weights.

(For convenience, absorb the bias $b$ into $w$ by adding a column of ones to $X$.) The minimiser of squared error has a closed-form solution:

$$
\hat{w} = (X^T X)^{-1} X^T \mathbf{y}
$$

This is the **normal equations** solution. It works when $X^T X$ is invertible — which requires the features to be linearly independent and $n \geq d$.

When $X^T X$ is singular (linearly dependent features, or more features than examples), regularised versions are used — **ridge regression** adds $\lambda \|w\|^2$ to the loss, producing $\hat{w} = (X^T X + \lambda I)^{-1} X^T \mathbf{y}$. The added $\lambda I$ guarantees invertibility.

### A worked example — linear regression

Suppose NEA wants to predict daily peak electricity demand from temperature. The training data for five days:

| Day | Temperature (°C) | Peak demand (MW) |
|---|---|---|
| 1 | 15 | 1200 |
| 2 | 20 | 1300 |
| 3 | 25 | 1450 |
| 4 | 30 | 1600 |
| 5 | 35 | 1750 |

For a single-feature linear regression $\hat{y} = w x + b$:

$$
w = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2}
$$

$$
b = \bar{y} - w \bar{x}
$$

$\bar{x} = (15 + 20 + 25 + 30 + 35)/5 = 25$
$\bar{y} = (1200 + 1300 + 1450 + 1600 + 1750)/5 = 1460$

| $x_i$ | $y_i$ | $x_i - \bar{x}$ | $y_i - \bar{y}$ | $(x_i - \bar{x})(y_i - \bar{y})$ | $(x_i - \bar{x})^2$ |
|---|---|---|---|---|---|
| 15 | 1200 | -10 | -260 | 2600 | 100 |
| 20 | 1300 | -5 | -160 | 800 | 25 |
| 25 | 1450 | 0 | -10 | 0 | 0 |
| 30 | 1600 | 5 | 140 | 700 | 25 |
| 35 | 1750 | 10 | 290 | 2900 | 100 |
| Sum | | | | 7000 | 250 |

$w = 7000 / 250 = 28$
$b = 1460 - 28 \cdot 25 = 1460 - 700 = 760$

Fitted model: $\hat{y} = 28 x + 760$.

For a new day with temperature 28°C, predicted peak demand: $28 \cdot 28 + 760 = 784 + 760 = 1544$ MW.

Interpretation: each additional degree of temperature is associated with an additional 28 MW of peak demand. The intercept of 760 MW is the model's extrapolation to 0°C — beyond the training data range and not necessarily meaningful.

### Assumptions of linear regression

OLS produces the best linear unbiased estimator (BLUE) under the **Gauss-Markov assumptions**:

1. **Linearity.** The true relationship is linear in the parameters.
2. **Independence.** Observations are independent of each other.
3. **Homoscedasticity.** The variance of errors is constant across the range of $x$.
4. **No autocorrelation.** Errors are not correlated with each other.
5. **No multicollinearity.** Features are not perfectly linearly related.
6. **Normality of errors.** Errors are normally distributed (needed for inference on the coefficients, not for point estimation).

Violations of these assumptions do not necessarily break the model but can make confidence intervals wrong or predictions biased. Diagnostic plots — residual vs fitted, Q-Q plots, etc. — check for violations.

### Logistic regression

For classification, predicting $\hat{y} = w^T x + b$ produces a real number, not a class. **Logistic regression** modifies linear regression to produce probabilities.

The **sigmoid function** maps any real number to (0, 1):

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

Logistic regression's prediction:

$$
P(y = 1 \mid x) = \sigma(w^T x + b)
$$

The probability of the positive class. The decision rule is "predict 1 if $P > 0.5$" (which is equivalent to "predict 1 if $w^T x + b > 0$").

Logistic regression is fitted by **maximum likelihood** — find $w$ and $b$ that maximise the probability of the training labels under the model. Equivalently, minimise the **cross-entropy** loss:

$$
\text{Loss} = -\sum_{i=1}^{n} [y_i \log \hat{p}_i + (1 - y_i) \log (1 - \hat{p}_i)]
$$

No closed-form solution exists; logistic regression is fit with **gradient descent** or its variants (Chapter 4 covers gradient descent in detail).

### The perceptron

*The perceptron is the simplest neural network — a single linear-threshold unit that computes a weighted sum of its inputs, applies a step function, and outputs a binary classification, trained by the perceptron learning rule that adjusts weights based on misclassifications.*

Frank Rosenblatt introduced the perceptron in 1957. It is the historical ancestor of all modern neural networks.

The perceptron's prediction:

$$
\hat{y} = \begin{cases} +1 & \text{if } w^T x + b > 0 \\ -1 & \text{otherwise} \end{cases}
$$

The decision boundary is a hyperplane. The perceptron is a binary linear classifier.

### The perceptron learning rule

The perceptron is trained by going through the training examples one at a time. For each example $(x_i, y_i)$ where $y_i \in \{+1, -1\}$:

1. Compute the prediction $\hat{y}_i = \text{sign}(w^T x_i + b)$.
2. If $\hat{y}_i = y_i$ (correct), do nothing.
3. If $\hat{y}_i \neq y_i$ (wrong), update:
   $$
   w \leftarrow w + \eta y_i x_i
   $$
   $$
   b \leftarrow b + \eta y_i
   $$

where $\eta$ is the **learning rate** (a small positive number, often 0.01 to 1).

Intuitively: if the perceptron makes a mistake, push the weights in the direction of the correct answer — add $x_i$ to $w$ if $y_i = +1$, subtract if $y_i = -1$.

### The perceptron convergence theorem

If the training data is **linearly separable** — there exists a hyperplane that classifies every training example correctly — then the perceptron learning rule is guaranteed to find such a hyperplane in a finite number of steps.

The proof: each mistake makes the weight vector $w$ point a little more in the direction of a separating hyperplane. The number of mistakes is bounded by $\left(\frac{R}{\gamma}\right)^2$ where $R$ is the maximum norm of any training example and $\gamma$ is the margin (the minimum distance from any example to the separating hyperplane).

If the data is not linearly separable, the perceptron does not converge — it keeps oscillating forever, with the weight vector wandering around.

### The XOR problem and the perceptron's limit

The XOR function:

| $x_1$ | $x_2$ | $y$ |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

No single line can separate the points where $y = 1$ from the points where $y = 0$. The (0,1) and (1,0) points are positive; the (0,0) and (1,1) points are negative. The positives lie on a diagonal; the negatives on the other diagonal.

A single perceptron cannot solve XOR. Minsky and Papert showed this in 1969, and the result helped trigger the first AI winter.

The XOR problem is solved by:
- **Adding non-linear features.** Add $x_1 x_2$ as a third feature. A linear classifier on $(x_1, x_2, x_1 x_2)$ can separate the XOR examples.
- **Multi-layer networks.** A two-layer network with a hidden layer of two units can solve XOR. The first layer creates an intermediate representation; the second layer separates the classes in that representation.

The lesson: a single linear unit is fundamentally limited. Combining many of them allows arbitrary decision boundaries — this is the foundation of neural networks.

## 3.4 Learning neural network structures

### Multi-layer perceptron (MLP)

*A Multi-Layer Perceptron is a feed-forward neural network that connects an input layer to an output layer through one or more hidden layers of artificial neurons, with each neuron computing a weighted sum of its inputs followed by a non-linear activation function, capable of approximating any continuous function with enough hidden units.*

The basic building block is the **neuron** (or **unit**), which generalises the perceptron:

$$
a = \sigma(w^T x + b)
$$

where $\sigma$ is a non-linear **activation function** (sigmoid, tanh, ReLU — covered in Chapter 7), and the output $a$ is called the **activation** of the neuron.

A neural network arranges neurons in **layers**. Each neuron in layer $L+1$ receives the activations of all neurons in layer $L$ as inputs, computes its weighted sum, applies its activation function, and passes its output to layer $L+2$.

The structure of a typical MLP:

```
Input layer (no computation, just feeds in features)
       ↓
Hidden layer 1 (h₁ neurons, each with weights and a bias)
       ↓
Hidden layer 2 (h₂ neurons)
       ↓
   ⋮
       ↓
Output layer (one neuron per output class, or one for regression)
```

The **depth** of the network is the number of layers (often counted as the number of hidden layers plus the output layer). The **width** at each layer is the number of neurons.

### Why multi-layer

A single layer of linear-threshold neurons can only learn linearly separable functions. Multi-layer networks remove this limit.

The **Universal Approximation Theorem** (Cybenko 1989, Hornik 1991): a feedforward neural network with a single hidden layer of finite width, using any non-linear "squashing" activation function, can approximate any continuous function on a compact subset of $\mathbb{R}^d$ to arbitrary accuracy — given enough hidden units.

In practice, however, deep narrow networks tend to outperform shallow wide networks. The benefits of depth:
- **Hierarchical features.** Lower layers learn simple patterns; higher layers compose them into more abstract concepts. In an image network, early layers detect edges; middle layers detect parts; higher layers detect whole objects.
- **Parameter efficiency.** A deep network can represent some functions with far fewer parameters than a shallow one.
- **Better generalisation.** With proper regularisation, deep networks often generalise better.

### Forward propagation

The computation that turns an input into an output. For a network with layers $1, 2, \ldots, L$:

- Layer 0 is the input: $a^{(0)} = x$.
- For each layer $\ell = 1, \ldots, L$:
  - Compute pre-activation: $z^{(\ell)} = W^{(\ell)} a^{(\ell-1)} + b^{(\ell)}$
  - Apply activation: $a^{(\ell)} = \sigma(z^{(\ell)})$
- The output of the network is $a^{(L)}$.

Each $W^{(\ell)}$ is a matrix of weights; each $b^{(\ell)}$ is a bias vector. The number of parameters in the network is the sum over all layers of (input dimension × output dimension + output dimension) for each layer.

A small example: an MLP with 10 input features, two hidden layers of 64 neurons each, and one output neuron has:
- Layer 1: $10 \times 64 + 64 = 704$ parameters.
- Layer 2: $64 \times 64 + 64 = 4160$ parameters.
- Layer 3: $64 \times 1 + 1 = 65$ parameters.
- Total: 4929 parameters.

Modern image networks have millions of parameters; large language models have hundreds of billions.

### Training neural networks

The training procedure has three components:

**Loss function.** For regression, mean squared error. For binary classification, binary cross-entropy. For multi-class classification, categorical cross-entropy.

**Backpropagation.** The algorithm for computing the gradient of the loss with respect to every parameter in the network. Uses the chain rule of calculus, applied layer-by-layer from the output backward. Chapter 7 covers the algorithm in detail.

**Optimisation.** Use the gradient to update parameters in the direction that reduces the loss. The basic algorithm is **gradient descent** (Chapter 4); modern variants like Adam, SGD with momentum, and RMSProp are the practical choices.

The training loop:

1. Initialise weights randomly.
2. Forward-propagate a batch of training examples through the network.
3. Compute the loss.
4. Backward-propagate to compute gradients.
5. Update parameters with an optimiser step.
6. Repeat until convergence.

Each pass through the entire training set is an **epoch**. Training typically runs for many epochs, with the validation loss watched to stop training when generalisation starts to degrade.

### Architectural choices

Building a neural network involves many design decisions:

- **Number of layers (depth).** Too few — underfitting. Too many — overfitting and harder to train.
- **Number of neurons per layer (width).** Similar trade-off.
- **Activation function.** ReLU is the standard default. Sigmoid for output of binary classification. Softmax for output of multi-class. Tanh and leaky ReLU as alternatives.
- **Output layer.** One neuron with sigmoid for binary; $K$ neurons with softmax for $K$-class multi-class; one neuron without activation for regression.
- **Regularisation.** Weight decay (L2 penalty), dropout, batch normalisation, early stopping.
- **Optimiser.** Adam is a safe default. SGD with momentum is sometimes better for very large models.
- **Learning rate.** A critical hyperparameter. Often the most important to tune.
- **Batch size.** Number of examples per gradient update. 32, 64, 128, 256 are common choices.

Choosing these is the art of neural-network engineering. There are heuristics but no universal rules.

### Specialised architectures

For specific data types, specific architectures work much better than generic MLPs:

- **Convolutional Neural Networks (CNNs).** For images. Chapter 7.
- **Recurrent Neural Networks (RNNs).** For sequences. Chapter 7.
- **Transformers.** For text and increasingly for everything. Brief coverage in Chapter 7.
- **Graph Neural Networks.** For graph-structured data.

The MLP remains the natural fit for tabular data — credit-scoring features, transaction features, structured forms. For other data types, specialised architectures are usually better.

## 3.5 Decision trees

### Decision tree representation

*A decision tree is a supervised-learning model that recursively splits the input space into regions based on feature-threshold tests at internal nodes, with predictions made at the leaf nodes, producing a piecewise-constant approximation of the target function.*

A decision tree is structured like a flowchart:

```
                  [Age > 30?]
                  /         \
                 No          Yes
                /              \
       [Income > 50k?]      [Education = MA?]
        /        \           /            \
       No        Yes        No            Yes
      /            \        /              \
   Class A      Class B   Class C        Class B
```

Each internal node tests one feature against a threshold (for numeric features) or a value set (for categorical features). The test routes the example to the left or right child. Following the path from root to leaf gives the prediction.

For classification, each leaf carries a class label (often the majority class of training examples that reach it) or a class-probability distribution. For regression, each leaf carries a numerical value (often the mean of training examples reaching it).

### Why decision trees work well

- **Interpretable.** The path from root to leaf is a human-readable decision rule. "If age > 30 and income > 50k, predict Class B." This is valuable in regulated domains (lending, healthcare) where explanations matter.
- **Handle mixed feature types natively.** Numeric and categorical features fit naturally.
- **No scaling required.** Splits are threshold-based; the scale of features does not matter.
- **Captures non-linear interactions.** Two features interacting (e.g., risk depends on age and income jointly) is naturally represented by a split on one followed by a split on the other.
- **Handle missing values.** Most modern implementations can route missing values down a default branch.

### Basic decision tree algorithm (ID3 / C4.5 / CART)

The standard greedy algorithm to grow a decision tree:

1. Start with all training data at the root.
2. For each candidate split (every feature, every possible threshold):
   - Compute a **split criterion** measuring the quality of the split.
3. Pick the best split.
4. Partition the data accordingly.
5. Recurse on each child.
6. Stop when a stopping criterion is met (maximum depth, minimum samples per leaf, no further information gain).
7. Assign each leaf a prediction (majority class for classification, mean target for regression).

### Split criteria

For **classification**, the standard criteria measure the impurity of a node — how mixed the classes are. A pure node (all same class) has impurity 0.

**Gini impurity.** Used by CART (Classification and Regression Trees, Breiman 1984):

$$
\text{Gini} = 1 - \sum_{k=1}^{K} p_k^2
$$

where $p_k$ is the proportion of class $k$ in the node. Gini is maximised when classes are equally mixed; minimised (at 0) when one class dominates.

**Entropy.** Used by ID3 and C4.5:

$$
\text{Entropy} = -\sum_{k=1}^{K} p_k \log_2 p_k
$$

Similar shape to Gini. Entropy is the information-theoretic measure of uncertainty.

**Information gain** is the reduction in entropy from a split:

$$
\text{IG} = \text{Entropy}(parent) - \sum_{c \in \text{children}} \frac{|c|}{|parent|} \text{Entropy}(c)
$$

The best split maximises information gain (or equivalently, minimises the weighted entropy of the children).

For **regression**, the split criterion is typically the reduction in variance or in mean squared error.

### A worked example — building a decision tree

Suppose a small loan-approval dataset (10 applicants, simplified):

| Age | Income (k NPR) | Has collateral | Default |
|---|---|---|---|
| 25 | 30 | No | Yes |
| 28 | 45 | No | Yes |
| 35 | 60 | Yes | No |
| 45 | 80 | Yes | No |
| 30 | 35 | No | Yes |
| 38 | 70 | Yes | No |
| 42 | 90 | Yes | No |
| 26 | 25 | No | Yes |
| 50 | 100 | Yes | No |
| 33 | 50 | No | Yes |

Five "Yes" defaults, five "No" defaults. Parent entropy = $-0.5 \log_2 0.5 - 0.5 \log_2 0.5 = 1$.

Consider splitting on "Has collateral":
- Has collateral = Yes: 5 records, all "No default." Entropy = 0.
- Has collateral = No: 5 records, all "Yes default." Entropy = 0.

Weighted child entropy = $(5/10) \cdot 0 + (5/10) \cdot 0 = 0$.

Information gain = $1 - 0 = 1$. The split perfectly separates the classes. The tree is just:

```
[Has collateral?]
  Yes → No default
   No → Default
```

In real data, splits are rarely this clean. The algorithm tries every feature and threshold combination and picks the one with the highest information gain. After splitting, it recurses on each child until a stopping criterion is met.

### Pruning

A fully-grown tree often overfits — each training example may end up in its own leaf. **Pruning** removes branches that do not improve generalisation.

**Pre-pruning.** Stop growing the tree before it overfits. Stopping criteria: maximum depth, minimum samples per leaf, minimum information gain.

**Post-pruning.** Grow the tree fully, then remove branches whose removal improves (or only slightly hurts) validation accuracy. **Cost-complexity pruning** is the standard post-pruning method.

### Applications and ensemble methods

Decision trees alone are useful for interpretable models. They become much more powerful in **ensembles**.

**Random Forest.** A collection of many decision trees, each trained on a random subset of the data and using a random subset of features at each split. Predictions are averaged (regression) or voted (classification). Reduces variance dramatically. Robust default for many problems.

**Gradient Boosted Trees.** A sequence of trees, each trained to correct the errors of the previous ones. XGBoost, LightGBM, and CatBoost are the leading implementations. State-of-the-art on most tabular-data competitions and many practical problems.

In Nepali finance, gradient boosting is standard for credit scoring, fraud detection, and customer-churn modelling.

## 3.6 Support vector machines

### Support vector machine (SVM)

*A Support Vector Machine is a supervised-learning algorithm for classification (and regression) that finds the optimal hyperplane separating the classes by maximising the margin between the hyperplane and the nearest training examples (the support vectors), extended to non-linear boundaries through the kernel trick.*

SVMs were developed by Vladimir Vapnik and colleagues in the 1990s. They became the dominant supervised algorithm in the late 1990s and 2000s, before being partially displaced by deep learning. They remain strong for small-to-medium-sized problems, particularly with high-dimensional features.

### The maximum-margin hyperplane

Consider a binary classification problem with linearly separable training data. Many hyperplanes might separate the classes. Which one is best?

The SVM answer: the hyperplane that maximises the **margin** — the distance from the hyperplane to the nearest training example on either side.

Intuition: a hyperplane with a large margin is robust. Small perturbations of training data move it less. New examples have more "room" before crossing the boundary.

Mathematically, the separating hyperplane is $w^T x + b = 0$. The signed distance from a point $x_i$ to this hyperplane is $(w^T x_i + b) / \|w\|$. The classifier outputs $y_i = +1$ if $w^T x_i + b \geq 1$ and $y_i = -1$ if $w^T x_i + b \leq -1$ — the margin is $2 / \|w\|$.

The optimisation problem:

$$
\text{Minimise } \frac{1}{2} \|w\|^2 \quad \text{subject to } y_i (w^T x_i + b) \geq 1 \text{ for all } i
$$

This is a convex quadratic programme with a unique global solution.

### Support vectors

After solving the optimisation, most training examples have $y_i (w^T x_i + b) > 1$ — they sit strictly outside the margin and do not affect the solution. A small subset have $y_i (w^T x_i + b) = 1$ — they sit on the margin boundary. These are the **support vectors**.

The hyperplane depends only on the support vectors. Removing all other training examples does not change the solution. This is why SVMs can be efficient even with very large datasets — only the support vectors really matter.

### Soft margins

Real data is rarely perfectly separable. The **soft-margin SVM** allows some examples to be on the wrong side of the margin or even the wrong side of the hyperplane:

$$
\text{Minimise } \frac{1}{2} \|w\|^2 + C \sum_{i=1}^{n} \xi_i \quad \text{subject to } y_i (w^T x_i + b) \geq 1 - \xi_i, \xi_i \geq 0
$$

The **slack variables** $\xi_i$ allow examples to violate the margin. $C$ is a hyperparameter that trades off margin width against margin violations:

- Large $C$ — heavily penalise violations. Narrower margin, fewer misclassifications.
- Small $C$ — tolerate violations. Wider margin, more misclassifications.

$C$ is tuned on a validation set.

### The kernel trick

Linear SVMs are limited to linear decision boundaries. The **kernel trick** extends SVMs to non-linear decision boundaries without explicitly computing the higher-dimensional features.

The idea: if data is not linearly separable in its original feature space, it may be linearly separable in a higher-dimensional transformed space. A non-linear feature map $\phi: \mathbb{R}^d \to \mathbb{R}^D$ (where $D > d$) maps the original features into the higher-dimensional space.

The SVM optimisation can be written in terms of inner products $\phi(x_i)^T \phi(x_j)$ — the explicit features $\phi(x)$ are not needed. A **kernel function** $K(x_i, x_j) = \phi(x_i)^T \phi(x_j)$ computes this inner product without computing $\phi$ explicitly.

Common kernels:

- **Linear kernel:** $K(x, x') = x^T x'$. The standard linear SVM.
- **Polynomial kernel:** $K(x, x') = (x^T x' + c)^d$. Polynomial decision boundaries.
- **Gaussian (RBF) kernel:** $K(x, x') = \exp(-\gamma \|x - x'\|^2)$. The most common non-linear kernel. Implicitly maps to an infinite-dimensional space.
- **Sigmoid kernel:** $K(x, x') = \tanh(\alpha x^T x' + c)$. Related to neural networks.

The RBF kernel is the default for SVMs on non-linearly-separable problems.

### Applications

SVMs have been used in:

- **Text classification.** Spam filtering, sentiment analysis, document categorisation. High-dimensional sparse features suit SVMs well.
- **Image classification.** Pre-deep-learning, SVMs (with engineered features like SIFT) were the standard for image recognition.
- **Bioinformatics.** Protein classification, gene expression analysis.
- **Handwriting recognition.** SVMs powered postal-code recognition systems for years.
- **Credit scoring.** Combined with other features, SVMs were once standard in financial-risk modelling.
- **Network intrusion detection.** Detecting anomalous traffic patterns.

In recent years, deep learning has displaced SVMs on most large-scale problems (images, text). SVMs remain competitive on medium-sized tabular problems and are valuable in domains where labelled data is limited and the feature space is well-engineered.

### Comparison of supervised learners

A summary of the algorithms covered in this chapter:

| Algorithm | Strengths | Weaknesses | Typical use |
|---|---|---|---|
| Linear regression | Simple, interpretable, fast | Linear assumption | Baseline regression |
| Logistic regression | Simple, calibrated probabilities | Linear boundary | Baseline classification |
| Perceptron | Historically important | Only linearly separable data | Mostly historical now |
| Neural network (MLP) | Flexible, universal approximator | Needs lots of data, tuning | Tabular when others fail |
| Decision tree | Interpretable, handles mixed features | Overfits easily | Interpretability, baseline |
| Random forest | Strong baseline, robust | Less interpretable than tree | Strong default |
| Gradient boosting | State-of-the-art tabular | Tuning required | Production tabular problems |
| SVM | Strong with kernels, theoretical foundation | Slow on very large datasets | Medium-sized, high-dim problems |

The choice depends on the data size, the interpretability requirement, the available computation, and the empirical performance on the specific problem. The standard practice is to try several and compare on a validation set.
