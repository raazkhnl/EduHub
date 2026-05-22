---
title: 'Chapter 5 — Unsupervised Learning and Dimensionality Reduction'
sidebar_label: 'Ch 05 — Unsupervised Learning and Dimensionality Reduction'
sidebar_position: 5
description: 'Chapter 5 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch05
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The previous chapters worked with labelled data — every training example came with a known target. This chapter turns to the unlabelled case. Given a dataset of inputs without any output labels, what can a learning algorithm say about the structure of the data? Two main families of answers exist: **clustering**, which groups similar examples together, and **dimensionality reduction**, which finds a compact representation that preserves the data's essential structure. Both are widely used — clustering for customer segmentation, anomaly detection, and exploratory analysis; dimensionality reduction for visualisation, denoising, and feeding into downstream supervised algorithms. The chapter also covers **Linear Discriminant Analysis (LDA)**, a supervised method for dimensionality reduction that uses class labels to find the most class-discriminating directions.

## 5.1 Introduction to clustering and criterion functions

### Clustering

*Clustering is the unsupervised-learning task of partitioning a set of objects into groups (clusters) such that objects within the same group are similar to one another and objects in different groups are dissimilar, based on some chosen measure of similarity or distance.*

Clustering has no "right answer." The same dataset can be clustered many different ways depending on what features are used, what distance metric is chosen, what algorithm is run, and what hyperparameters are set. The goal is a clustering that is useful for the downstream task — segmenting customers for targeted marketing, finding anomalies, organising documents, compressing data.

### Common applications

- **Customer segmentation.** Group eSewa users by their transaction patterns — frequent small-payments users, occasional large-payment users, business accounts, dormant accounts. Each segment can be served by appropriate features and marketing.
- **Document organisation.** Cluster news articles into topics without pre-defined categories. Cluster research papers, court rulings, customer-support tickets.
- **Image segmentation.** Group pixels of an image into regions corresponding to objects.
- **Anomaly detection.** Examples that do not fit any cluster well are anomalies. Useful for fraud detection, intrusion detection, equipment failure prediction.
- **Recommendation systems.** Cluster users into similar groups; recommend what others in the same cluster liked.
- **Genetics.** Cluster gene-expression patterns to find disease subtypes.
- **Network analysis.** Cluster social-network users to find communities.

### Types of clustering

**Hard vs soft clustering.**

- *Hard clustering* assigns each example to exactly one cluster.
- *Soft (fuzzy) clustering* assigns each example a probability or weight for belonging to each cluster.

**Partitional vs hierarchical.**

- *Partitional clustering* produces a single division of the data into $k$ clusters (K-means is the canonical example).
- *Hierarchical clustering* produces a tree of clusterings at all levels of granularity.

**Density-based vs centroid-based vs distribution-based.**

- *Centroid-based* — each cluster is defined by its centre point (K-means).
- *Density-based* — clusters are dense regions of the data space separated by sparse regions (DBSCAN).
- *Distribution-based* — each cluster is modelled as a probability distribution (Gaussian Mixture Models).
- *Connectivity-based* — clusters are formed by connecting nearby points (hierarchical clustering with single linkage).

### Criterion functions for clustering

*A criterion function (or objective function) for clustering is a mathematical measure that quantifies the quality of a proposed clustering, used to guide algorithms toward good clusterings and to compare different clusterings of the same data.*

The two key intuitions:

**Intra-cluster similarity should be high.** Points within the same cluster should be close to each other.

**Inter-cluster similarity should be low.** Points in different clusters should be far from each other.

Different criterion functions formalise this differently.

**Sum of Squared Errors (SSE).** Used by K-means.

$$
\text{SSE} = \sum_{k=1}^{K} \sum_{x \in C_k} \|x - \mu_k\|^2
$$

where $C_k$ is the set of points in cluster $k$ and $\mu_k$ is the cluster's centroid. SSE measures how tightly points cluster around their centroids. Lower is better. Also called **inertia** in some software libraries.

**Silhouette coefficient.** Measures both cohesion (within-cluster tightness) and separation (between-cluster distance) for each point:

$$
s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}
$$

where $a(i)$ is the average distance from point $i$ to other points in its cluster and $b(i)$ is the average distance from $i$ to points in the nearest *other* cluster.

- $s(i)$ close to 1: point is well-clustered.
- $s(i)$ near 0: point is on the boundary between two clusters.
- $s(i)$ negative: point may be in the wrong cluster.

The silhouette of a clustering is the average $s(i)$ across all points. Useful for comparing clusterings with different numbers of clusters.

**Davies-Bouldin index.** Ratio of within-cluster scatter to between-cluster separation. Lower is better.

**Calinski-Harabasz index.** Ratio of between-cluster variance to within-cluster variance. Higher is better.

**Dunn index.** Ratio of minimum inter-cluster distance to maximum intra-cluster distance.

The criterion function matters because it determines what the algorithm optimises. K-means with SSE finds spherical clusters. Other criteria favour other shapes.

## 5.2 Algorithms for clustering

### K-means clustering

*K-means is a centroid-based clustering algorithm that partitions $n$ examples into $K$ clusters by iteratively assigning each example to the cluster with the nearest centroid and then recomputing each centroid as the mean of its assigned examples, minimising the sum of squared errors.*

K-means is the most widely used clustering algorithm. Fast, simple, scales to large datasets, easy to interpret.

### The K-means algorithm

The standard procedure (Lloyd's algorithm):

1. **Choose $K$.** The number of clusters is a hyperparameter that must be set in advance.
2. **Initialise centroids.** Pick $K$ initial centroid positions, often by randomly choosing $K$ training examples.
3. **Assignment step.** For each example, assign it to the cluster with the nearest centroid:
   $$
   c_i = \arg\min_{k} \|x_i - \mu_k\|^2
   $$
4. **Update step.** Recompute each centroid as the mean of its assigned examples:
   $$
   \mu_k = \frac{1}{|C_k|} \sum_{x \in C_k} x
   $$
5. **Repeat** steps 3 and 4 until centroids stop changing (or change less than a threshold).

The algorithm is guaranteed to converge — each iteration decreases or maintains the SSE — but it may converge to a local minimum rather than the global one.

### A worked example

Suppose six points in 2D representing transaction (amount, hour-of-day):

| Point | Amount (NPR) | Hour |
|---|---|---|
| A | 100 | 9 |
| B | 150 | 10 |
| C | 120 | 9 |
| D | 5000 | 22 |
| E | 4500 | 23 |
| F | 5200 | 22 |

Try $K = 2$ clusters. Initialise centroids randomly: $\mu_1 = (100, 9)$, $\mu_2 = (5000, 22)$.

**Iteration 1 — Assignment:**

| Point | Distance to $\mu_1$ | Distance to $\mu_2$ | Cluster |
|---|---|---|---|
| A | 0 | $\sqrt{4900^2 + 13^2} \approx 4900$ | 1 |
| B | $\sqrt{50^2 + 1^2} \approx 50$ | $\sqrt{4850^2 + 12^2} \approx 4850$ | 1 |
| C | $\sqrt{20^2 + 0} = 20$ | $\sqrt{4880^2 + 13^2} \approx 4880$ | 1 |
| D | $\sqrt{4900^2 + 13^2} \approx 4900$ | 0 | 2 |
| E | $\sqrt{4400^2 + 14^2} \approx 4400$ | $\sqrt{500^2 + 1} \approx 500$ | 2 |
| F | $\sqrt{5100^2 + 13^2} \approx 5100$ | $\sqrt{200^2 + 0} = 200$ | 2 |

**Update:**

$\mu_1 = \text{mean}(A, B, C) = (123.3, 9.33)$.
$\mu_2 = \text{mean}(D, E, F) = (4900, 22.33)$.

**Iteration 2 — Assignment:** The assignments stay the same (A, B, C remain in cluster 1; D, E, F in cluster 2). The algorithm has converged.

Interpretation: cluster 1 is "small daytime transactions," cluster 2 is "large late-night transactions." A new transaction can be assigned to its nearest cluster — useful for flagging unusual transactions (a small late-night transaction would not fit either cluster well).

### Initialisation matters

K-means is sensitive to initial centroid positions. Different initialisations can produce different final clusterings. Standard remedies:

**Multiple random initialisations.** Run K-means many times with different initial centroids, keep the result with the lowest SSE.

**K-means++.** A clever initialisation that picks initial centroids spread out across the data:

1. Pick the first centroid uniformly at random from the data points.
2. For each remaining point, compute the distance to the nearest already-chosen centroid.
3. Pick the next centroid with probability proportional to the squared distance — points far from existing centroids are more likely to be picked.
4. Repeat until $K$ centroids are chosen.

K-means++ typically converges in fewer iterations and finds better local minima than random initialisation.

### Choosing K

K is the most important hyperparameter. Several methods help choose it.

**Elbow method.** Run K-means for $K = 1, 2, 3, \ldots, 10$. Plot SSE against $K$. SSE always decreases with more clusters, but the rate of decrease slows. The "elbow" of the curve — where the marginal benefit drops sharply — suggests a good $K$.

**Silhouette analysis.** Compute the average silhouette coefficient for each $K$. Pick the $K$ with the highest average silhouette.

**Gap statistic.** Compares the SSE to what would be expected under a null distribution (uniform random data). Larger gap = better clustering.

**Domain knowledge.** Often the most reliable. If the business problem suggests three customer segments, use $K = 3$ even if mathematical metrics suggest otherwise.

### Strengths and weaknesses of K-means

**Strengths:**

- Simple and fast — $O(nKdT)$ where $T$ is the number of iterations.
- Scales to large datasets (mini-batch K-means scales further).
- Easy to interpret — centroids are themselves data points in the feature space.
- Works well when clusters are roughly spherical and similar in size.

**Weaknesses:**

- Must specify $K$ in advance.
- Sensitive to initialisation.
- Assumes spherical clusters — fails on elongated, ring-shaped, or oddly-shaped clusters.
- Sensitive to outliers — a single far-away point can drag a centroid.
- Sensitive to feature scaling — features must be scaled before applying K-means.
- Assumes clusters of similar size.

### Hierarchical clustering

*Hierarchical clustering is a family of clustering algorithms that build a tree (dendrogram) of nested clusterings, either by starting with each point as its own cluster and successively merging the closest pair (agglomerative), or by starting with one cluster and successively splitting it (divisive).*

Hierarchical clustering produces a clustering at every level of granularity simultaneously. Cutting the dendrogram at different heights gives different numbers of clusters.

**Agglomerative hierarchical clustering — bottom-up:**

1. Start with each point as its own cluster — $n$ singleton clusters.
2. Find the two closest clusters and merge them.
3. Repeat until only one cluster remains.

The order of merges defines the dendrogram.

**Divisive hierarchical clustering — top-down:**

1. Start with all points in one cluster.
2. Split the cluster (using some criterion, often K-means with $K=2$).
3. Recurse on each child cluster.

Agglomerative is more common.

### Linkage methods

When merging clusters, the algorithm needs to know the distance between two clusters of points. Different choices:

**Single linkage.** Distance between two clusters = distance between their closest pair of points. Produces long, chain-like clusters. Sensitive to noise.

**Complete linkage.** Distance = distance between their farthest pair. Produces compact, spherical clusters. Sensitive to outliers.

**Average linkage.** Distance = average distance between all cross-cluster pairs. Compromise.

**Ward's linkage.** Merge the pair that increases SSE the least. Produces clusters of similar size, often considered the best general-purpose choice.

### Dendrograms

A **dendrogram** is a tree diagram showing the merge history. Vertical axis shows the distance at which clusters were merged. Cutting the dendrogram with a horizontal line at some height gives a clustering — clusters that have not yet been merged at that height become the final clusters.

Useful properties:
- No need to specify $K$ in advance — the dendrogram shows all levels.
- Visual representation reveals natural cluster structure.
- Can spot outliers (points that merge late, at high distances).

Downside: $O(n^2)$ memory and $O(n^3)$ time for naive implementations. Does not scale to very large datasets without approximations.

### DBSCAN

*DBSCAN (Density-Based Spatial Clustering of Applications with Noise) is a density-based clustering algorithm that defines clusters as dense regions of points separated by regions of low density, classifying points as core, border, or noise based on local density.*

DBSCAN has two parameters:
- $\epsilon$ — the neighbourhood radius.
- $\text{minPts}$ — the minimum number of points required to form a dense region.

Each point is classified as:
- **Core point** — has at least $\text{minPts}$ neighbours within distance $\epsilon$.
- **Border point** — within $\epsilon$ of a core point but does not itself have enough neighbours.
- **Noise** — neither core nor border.

Clusters form by chaining core points and including their border points. Noise points are not assigned to any cluster.

**Strengths:**
- Does not require specifying the number of clusters.
- Handles arbitrarily-shaped clusters.
- Robust to outliers (they are labelled as noise).
- Good for spatial data.

**Weaknesses:**
- Sensitive to $\epsilon$ and $\text{minPts}$.
- Struggles with clusters of varying density.
- Slow on very high-dimensional data.

DBSCAN is the go-to choice for clustering geographic data, anomaly detection in low-dimensional feature spaces, and identifying clusters in noisy datasets.

### Gaussian Mixture Models (GMM)

*A Gaussian Mixture Model is a probabilistic clustering model in which the data is assumed to come from a mixture of $K$ Gaussian distributions, with parameters fit by the Expectation-Maximisation algorithm, producing soft cluster assignments through posterior probabilities.*

Each cluster is modelled as a Gaussian (multivariate normal) distribution with its own mean and covariance. Each point has a probability of belonging to each cluster, rather than a hard assignment.

The model parameters (means, covariances, mixing weights) are estimated by the **Expectation-Maximisation (EM)** algorithm:

- **E step.** Given current parameters, compute the posterior probability that each point belongs to each Gaussian.
- **M step.** Given current posteriors, update each Gaussian's parameters (mean, covariance) as weighted averages.

GMM generalises K-means — when all covariances are spherical and equal, GMM with hard assignments reduces to K-means.

**Strengths:**
- Soft assignments quantify uncertainty.
- Handles elliptical (not just spherical) clusters.
- Probabilistic foundation — supports model selection (Bayesian Information Criterion, Akaike Information Criterion).

**Weaknesses:**
- Slower than K-means.
- Sensitive to initialisation.
- Assumes Gaussian clusters; fails on non-Gaussian distributions.

### Comparison

| Algorithm | Cluster shape | Need K? | Handles noise? | Scales? |
|---|---|---|---|---|
| K-means | Spherical | Yes | Poorly | Excellent |
| K-means++ | Spherical | Yes | Poorly | Excellent |
| Hierarchical (Ward) | Roughly spherical | No (use dendrogram) | Poorly | Poor ($n^2$ memory) |
| Hierarchical (single) | Any | No | Poorly | Poor |
| DBSCAN | Any | No (uses $\epsilon$, minPts) | Yes (noise label) | Moderate |
| GMM | Elliptical | Yes | No | Moderate |

The right algorithm depends on the data shape, the size, and what is needed downstream.

## 5.3 Dimensionality reduction — techniques and need

### The need for dimensionality reduction

High-dimensional data is hard. As dimensions grow, problems multiply:

**The curse of dimensionality.** In high dimensions:
- Distances between all pairs of points become similar — "nearest" loses meaning.
- The volume of a hypersphere grows faster than the volume of the embedding hypercube — most volume sits near the corners, far from the centre.
- The amount of data needed to cover the space grows exponentially with dimensions.
- Many algorithms (K-NN, K-means) degrade in effectiveness.

**Computational cost.** Algorithms that scale as $O(d^2)$ or $O(d^3)$ become expensive. Storage requirements grow linearly with $d$.

**Visualisation.** Humans can see 2D and 3D plots. Anything higher must be reduced to be visualised.

**Redundancy.** Many features may carry overlapping information. A dataset with 1000 features may have only 20 "real" dimensions of variation.

**Noise.** Some dimensions carry mostly noise rather than signal. Removing them improves downstream learning.

### What dimensionality reduction does

*Dimensionality reduction is the process of transforming data from a high-dimensional space to a lower-dimensional space while preserving the structure that matters for the downstream task, used for visualisation, denoising, compression, and improving the performance of subsequent learning algorithms.*

A dimensionality-reduction technique maps $x \in \mathbb{R}^d$ to $z \in \mathbb{R}^k$ where $k < d$ — often much less. The mapping is chosen so that $z$ captures as much useful information as possible.

### Categories of dimensionality reduction

**Feature selection vs feature extraction.**

- *Feature selection* — pick a subset of the original features. The reduced data is in a subspace of the original.
- *Feature extraction* — construct new features as functions of the originals. The reduced data is in a transformed space.

**Linear vs non-linear.**

- *Linear methods* — the new features are linear combinations of the originals. PCA, LDA, factor analysis.
- *Non-linear methods* — the new features are non-linear functions. t-SNE, UMAP, autoencoders, kernel PCA.

**Supervised vs unsupervised.**

- *Unsupervised* — use only the inputs $x$. PCA, autoencoders, t-SNE.
- *Supervised* — use labels $y$ as well. LDA.

### Standard methods

A summary of common methods:

- **PCA (Principal Component Analysis).** Linear, unsupervised. Finds directions of maximum variance. Section 5.4.
- **LDA (Linear Discriminant Analysis).** Linear, supervised. Finds directions that best separate classes. Section 5.5.
- **t-SNE (t-distributed Stochastic Neighbour Embedding).** Non-linear, unsupervised. Preserves local structure for visualisation.
- **UMAP (Uniform Manifold Approximation and Projection).** Non-linear, unsupervised. Faster than t-SNE, often preserves global structure better.
- **Autoencoders.** Neural networks trained to reconstruct their input through a low-dimensional bottleneck layer. The bottleneck representation is the reduced data.
- **Random projections.** Project to a random subspace. Surprisingly effective due to the Johnson-Lindenstrauss lemma.
- **Factor analysis.** Statistical model where observed variables are combinations of latent factors plus noise.
- **Kernel PCA.** PCA applied in a higher-dimensional kernel feature space. Captures non-linear structure.

## 5.4 Principal Component Analysis (PCA)

### Principal Component Analysis

*Principal Component Analysis is a linear, unsupervised dimensionality-reduction technique that finds the directions (principal components) along which the data has maximum variance, projecting the data onto the top $k$ such directions to produce a $k$-dimensional representation that preserves as much variance as possible.*

PCA was introduced by Karl Pearson in 1901. It remains the most widely used dimensionality-reduction method.

### The intuition

Imagine a cloud of points in 2D forming an elongated ellipse. The data has a clear "main direction" — the long axis of the ellipse — along which most of the variation occurs. A second, perpendicular direction captures the residual variation. The main direction is the **first principal component**; the perpendicular direction is the second.

In higher dimensions, the same idea applies. PCA finds the directions of largest variance, ordered from most to least. By keeping only the top $k$ directions, we reduce the data to $k$ dimensions while losing as little variance as possible.

### The mathematics

Given a dataset $X$ with $n$ rows (examples) and $d$ columns (features), centred so each column has mean zero:

1. **Compute the covariance matrix.** $\Sigma = \frac{1}{n-1} X^T X$ is the $d \times d$ covariance matrix.

2. **Compute eigenvectors and eigenvalues of $\Sigma$.** Each eigenvector $v$ satisfies $\Sigma v = \lambda v$. The eigenvalue $\lambda$ measures the variance along the direction $v$.

3. **Sort eigenvalues in descending order.** Let $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_d$ with corresponding eigenvectors $v_1, v_2, \ldots, v_d$.

4. **Pick the top $k$ eigenvectors** to form a $d \times k$ projection matrix $W = [v_1 | v_2 | \cdots | v_k]$.

5. **Project the data.** The reduced data is $Z = X W$, an $n \times k$ matrix.

The $i$th column of $Z$ is the projection of the data onto the $i$th principal component.

### Why does this maximise variance?

The variance of the data projected onto a unit vector $v$ is $v^T \Sigma v$. Maximising this subject to $\|v\| = 1$ gives the eigenvector of $\Sigma$ with the largest eigenvalue. The second-largest variance, subject to being orthogonal to the first, gives the second eigenvector. And so on.

### How many components to keep

Two common criteria:

**Cumulative variance explained.** The fraction of total variance captured by the first $k$ components is $\sum_{i=1}^{k} \lambda_i / \sum_{i=1}^{d} \lambda_i$. Pick the smallest $k$ that captures a target fraction — 80%, 90%, 95%.

**Scree plot.** Plot eigenvalues against component index. The "elbow" — where eigenvalues drop sharply — suggests where to cut off.

**Kaiser's criterion.** Keep components with eigenvalues greater than 1 (when working with standardised data with unit variance per feature).

### A worked example

Suppose a 2D dataset with three points:

| Feature 1 | Feature 2 |
|---|---|
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |

The data lies exactly on the line $y = x$. The variance is entirely along this line.

Mean: $(2, 2)$. Centred data:

| | |
|---|---|
| -1 | -1 |
| 0 | 0 |
| 1 | 1 |

Covariance matrix:
$$
\Sigma = \frac{1}{2} \begin{bmatrix} (-1)^2 + 0 + 1^2 & (-1)(-1) + 0 + 1 \\ \text{symmetric} & 1 + 0 + 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}
$$

Eigenvalues: solve $\det(\Sigma - \lambda I) = (1-\lambda)^2 - 1 = 0$, giving $\lambda_1 = 2$, $\lambda_2 = 0$.

Eigenvectors:
- For $\lambda_1 = 2$: $v_1 = (1, 1)/\sqrt{2}$. The direction $y = x$.
- For $\lambda_2 = 0$: $v_2 = (1, -1)/\sqrt{2}$. Perpendicular.

The first principal component captures 100% of the variance (eigenvalue ratio $2/(2+0) = 1$). The second captures 0%. Keeping just the first PC reduces the data to 1D without loss.

Projecting the centred data onto $v_1$:
- $(-1, -1) \cdot (1, 1)/\sqrt{2} = -\sqrt{2}$
- $(0, 0) \cdot v_1 = 0$
- $(1, 1) \cdot v_1 = \sqrt{2}$

The 1D representation: $-\sqrt{2}, 0, \sqrt{2}$ — exactly recovering the original linear structure.

### Practical considerations

**Standardisation.** PCA is sensitive to feature scale. A feature with large range dominates the covariance. Standardise features (zero mean, unit variance) before PCA unless there's a specific reason not to.

**Centering.** PCA requires data to be centred (zero mean per feature). Standardisation handles this.

**Interpretation.** Each principal component is a linear combination of original features. The weights (loadings) tell you which features contribute to each component. PC1 might be "overall financial activity" (positive loadings on all transaction features); PC2 might be "time-of-day pattern" (positive on evening transactions, negative on morning).

**Limitations.**
- PCA is linear. Non-linear structure (curves, clusters) is not captured. Use kernel PCA, t-SNE, or autoencoders for non-linear reduction.
- PCA captures variance, not class-discriminative information. The direction of maximum variance is not necessarily the direction that best separates classes. For supervised problems, LDA may be better.
- Outliers heavily influence PCA results.

### Applications

PCA is used in:

- **Visualisation.** Reduce high-dimensional data to 2D or 3D for plotting.
- **Compression.** Image compression uses related methods (DCT, SVD).
- **Feature engineering.** PCA-reduced features can feed into supervised learning.
- **Denoising.** Reconstruct data from its top components to remove noise.
- **Genomics.** Reduce gene-expression data to a manageable number of components.
- **Finance.** Identify common factors driving asset prices.
- **Sensor fusion.** Combine many sensor readings into a few principal signals.

For Nepali contexts:
- NEA smart-meter data with hundreds of features can be reduced to a few principal components for clustering customers by usage profile.
- Macroeconomic indicators (NRB data — interest rates, inflation, exchange rates, remittance flows) can be PCA-reduced to identify common economic factors.
- High-dimensional sensor data from telecom network monitoring can be compressed for anomaly detection.

## 5.5 Linear Discriminant Analysis (LDA)

### Linear Discriminant Analysis

*Linear Discriminant Analysis is a supervised, linear dimensionality-reduction technique that projects data onto a lower-dimensional space chosen to maximise the separation between classes while minimising the variation within each class, useful for both dimensionality reduction and as a classifier.*

LDA was developed by Ronald Fisher in 1936, originally as a method for classifying iris flowers. It has been a staple of statistical classification ever since.

### LDA vs PCA

The key difference:

- **PCA** finds directions of maximum variance, ignoring class labels.
- **LDA** finds directions of maximum class separability, using class labels.

For an unlabelled or single-class problem, only PCA applies. For a labelled multi-class problem, LDA can find directions where the classes are well-separated, which PCA might miss.

A classic example: suppose two classes form two clusters that are elongated parallel to each other. PCA's first component points along the elongation direction — the direction of maximum overall variance — which is the direction in which the classes are *not* separated. LDA's first component points perpendicular to the elongation, the direction in which the classes *are* separated. LDA finds the discriminative direction; PCA misses it.

### The mathematics

For a dataset with $K$ classes:

**Within-class scatter matrix:**

$$
S_W = \sum_{k=1}^{K} \sum_{x \in C_k} (x - \mu_k)(x - \mu_k)^T
$$

The total variation within classes — how spread out points are around their own class mean.

**Between-class scatter matrix:**

$$
S_B = \sum_{k=1}^{K} n_k (\mu_k - \mu)(\mu_k - \mu)^T
$$

The variation between class means and the overall mean $\mu$, weighted by class size $n_k$.

**Fisher's criterion.** LDA finds the projection direction $w$ that maximises:

$$
J(w) = \frac{w^T S_B w}{w^T S_W w}
$$

The numerator is between-class scatter in the projected space; the denominator is within-class scatter. Maximising $J$ means classes are well-separated relative to their internal spread.

The solution: $w$ is the eigenvector of $S_W^{-1} S_B$ corresponding to the largest eigenvalue. For a $K$-class problem, LDA produces at most $K - 1$ discriminant directions — because $S_B$ has rank at most $K - 1$.

### LDA as a classifier

Once data is projected onto the LDA directions, classification is straightforward — use the nearest class mean, or apply any standard classifier. LDA itself often serves as a complete classification method (assuming Gaussian class-conditionals with equal covariances).

The LDA decision rule:

$$
\hat{y} = \arg\max_{k} \left( x^T \Sigma^{-1} \mu_k - \frac{1}{2} \mu_k^T \Sigma^{-1} \mu_k + \log P(y = k) \right)
$$

This is linear in $x$ — the decision boundary is a hyperplane.

### Assumptions of LDA

LDA assumes:
1. Class-conditional distributions are Gaussian.
2. All classes share the same covariance matrix.
3. Features are continuous.

Violations of these assumptions weaken LDA but do not always break it — LDA is fairly robust in practice.

When the covariance assumption is violated, **Quadratic Discriminant Analysis (QDA)** allows each class its own covariance, producing quadratic decision boundaries.

### A worked intuition

For a two-class problem ($K = 2$), LDA produces one discriminant direction. The data is projected onto a single line. Along this line, the two classes are as separated as possible.

If two classes have means $\mu_1$ and $\mu_2$ and share covariance $\Sigma$:

$$
w \propto \Sigma^{-1} (\mu_2 - \mu_1)
$$

The direction is roughly "from class 1 mean to class 2 mean," adjusted by the inverse covariance. If the features have very different scales or are correlated, $\Sigma^{-1}$ corrects for it.

### Strengths and weaknesses

**Strengths:**
- Supervised — uses labels to find discriminative directions.
- Simple and fast.
- Often a strong baseline for classification.
- Provides interpretable directions (the LDA components are class-discriminative axes).
- Closed-form solution, no iteration required.

**Weaknesses:**
- Assumes Gaussian class-conditionals with equal covariances.
- Limited to $K - 1$ dimensions for $K$ classes — fewer than PCA can produce.
- Sensitive to outliers.
- Cannot capture non-linear class boundaries.
- Requires the within-class scatter matrix to be invertible — fails when the number of features exceeds the number of samples (regularised LDA addresses this).

### PCA vs LDA — comparison

| | PCA | LDA |
|---|---|---|
| Supervision | Unsupervised | Supervised (needs labels) |
| Objective | Maximise variance | Maximise class separability |
| Output dimensions | Up to $d$ | Up to $K - 1$ |
| Best when | Data has a low-dimensional subspace of variation | Classes have distinct means in some directions |
| Use as classifier | No (just reduces dimensions) | Yes (built-in classifier) |
| Sensitivity to scaling | Very sensitive | Less sensitive |
| Assumptions | None about distributions | Gaussian classes, equal covariance |

In practice, the methods are often used together — PCA first to remove very-low-variance noise dimensions, then LDA on the PCA output for class-discriminative reduction.

### Applications

LDA appears in:

- **Face recognition.** Classic "Fisherfaces" approach uses LDA on the pixel features (or on PCA-reduced features).
- **Speech recognition.** LDA-based feature transformations in HMM-based ASR.
- **Bioinformatics.** Disease subtype classification from gene-expression data.
- **Marketing.** Customer-segment classification from behavioural features.
- **Document classification.** When class labels are available (topic, sentiment).

In Nepal-relevant contexts:
- Loan-approval features can be reduced via LDA to a small number of class-discriminative scores.
- Network-traffic classification (normal vs intrusion) can use LDA on flow features.
- Medical-diagnosis features (clinical data, lab tests) can be LDA-reduced for screening systems at major hospitals.

The chapter has covered the main unsupervised-learning tasks (clustering and dimensionality reduction) along with the supervised variant of dimensionality reduction (LDA). Together with the supervised methods of Chapters 3 and 4, these complete the core algorithmic toolkit. The next chapter turns to evaluation — how to measure whether the algorithms covered so far are actually working.
