---
title: 'Chapter 7 — Deep Learning Basics'
sidebar_label: 'Ch 07 — Deep Learning Basics'
sidebar_position: 7
description: 'Chapter 7 of Machine Learning and Data Analytics (ENCTNS503).'
slug: /ioe/msncs/year-1-part-1/machine-learning-data-analytics/notes/ch07
tags: [msncs, ENCTNS503, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The previous chapters built up the classical machine-learning toolkit — linear models, decision trees, Bayesian methods, SVMs, K-means, PCA. Each works well for specific problem shapes. **Deep learning** is the modern descendant of the neural-network ideas introduced in Chapter 3, scaled up by orders of magnitude in depth, data, and computation. It has displaced classical methods on most large-scale problems involving images, speech, text, and complex sensor data, and has reshaped what machine learning can do. This chapter covers the foundations — what makes a network "deep," how backpropagation actually computes gradients, the activation functions that make non-linearity possible, the convolutional and recurrent architectures that dominate vision and sequence tasks, and the specific applications of ML in cybersecurity that draw together the threads of the whole subject.

## 7.1 Definition of deep networks

### Deep neural network

*A deep neural network is an artificial neural network with multiple hidden layers between the input and output layers — typically three or more — that learns hierarchical representations of data by composing simple non-linear transformations into increasingly abstract features.*

The MLP introduced in Chapter 3 is a neural network. A deep neural network is the same idea, taken further. The threshold for "deep" is conventional — typically three or more hidden layers — but modern networks routinely have tens, hundreds, or even thousands of layers.

### Why depth helps

The Universal Approximation Theorem (Chapter 3) says a single hidden layer is enough to approximate any continuous function — given enough neurons. So why bother with depth?

**Parameter efficiency.** Some functions require an exponentially large shallow network but only a polynomially large deep network. The classic example: the parity function (XOR generalised to $n$ bits) requires $O(2^n)$ neurons in a shallow network but $O(n)$ in a deep one.

**Hierarchical features.** Deep networks learn features at multiple levels of abstraction. In a vision network, the first layer detects edges; the next detects corners and short contours; the next detects motifs (eyes, wheels); the top layers detect whole objects. Each layer's features are constructed from the layer below.

**Better generalisation.** With proper regularisation, deep networks often generalise better than equally-parameterised shallow ones. The hierarchical structure seems to match the structure of natural data.

**Data-efficient learning.** Deep networks transfer well — a network pre-trained on a large dataset can be fine-tuned on a smaller related dataset with much less data than training from scratch would require.

### Parameter counts

Modern deep networks have many parameters. A reference table:

| Network | Year | Parameters | Notable |
|---|---|---|---|
| LeNet-5 | 1998 | 60,000 | First major CNN |
| AlexNet | 2012 | 60 million | First ImageNet deep-learning win |
| VGG-16 | 2014 | 138 million | Deeper architecture |
| ResNet-50 | 2015 | 25 million | Skip connections |
| BERT-base | 2018 | 110 million | Language model |
| GPT-3 | 2020 | 175 billion | Large language model |
| GPT-4 (estimated) | 2023 | ~1 trillion+ | Multimodal LLM |
| GPT-5 / Claude 4.x | 2024-26 | undisclosed | State-of-the-art |

Each generation has roughly 10× more parameters than the last for the leading-edge models. The pattern is unlikely to continue forever (the marginal returns to scale are diminishing), but the trend has dominated the past decade.

### What changed in 2012

Deep learning's modern era began with **AlexNet** in 2012 — a CNN that won the ImageNet competition by a large margin. Three factors made it possible:

**Large labelled datasets.** ImageNet provided 1.2 million labelled training images across 1000 categories.

**GPU computing.** General-purpose GPU computation made the matrix multiplications underlying neural networks fast enough.

**Algorithmic improvements.** ReLU activation (faster training than sigmoid/tanh), dropout (regularisation), and large-scale stochastic gradient descent enabled training of deeper networks.

The combination of these factors is the recipe behind every deep-learning advance since.

### Representation learning

A key idea: deep networks **learn their own representations**. Classical ML relies on hand-engineered features — a fraud-detection model uses features like "transaction count in past 30 days." A deep network can learn its own features directly from raw inputs (raw transaction sequences, raw images, raw text) and often learns features that hand engineering misses.

This is why deep learning has succeeded on **unstructured data** — images, text, audio — where hand-engineering features is hard. On structured tabular data, gradient boosting and other classical methods still often match or beat deep learning.

## 7.2 Feed-forward and backpropagation

### Feed-forward computation

The forward pass through a network was introduced in Chapter 3. To recap:

For a network with $L$ layers:
- Input: $a^{(0)} = x$.
- For each layer $\ell = 1, \ldots, L$:
  - Pre-activation: $z^{(\ell)} = W^{(\ell)} a^{(\ell-1)} + b^{(\ell)}$
  - Activation: $a^{(\ell)} = \sigma^{(\ell)}(z^{(\ell)})$
- Output: $\hat{y} = a^{(L)}$.

The computation flows from input through layers in one direction — forward. Each layer's output is the next layer's input. No loops, no recurrence (for a basic feed-forward network).

### The training problem

To train a network, we need gradients of the loss function with respect to every parameter — every weight and every bias in every layer. A network with 100 million parameters needs 100 million partial derivatives, recomputed every gradient update.

Computing these naively (one parameter at a time, with numerical differentiation) is infeasible. **Backpropagation** computes all of them efficiently with one forward pass and one backward pass.

### Backpropagation

*Backpropagation is the algorithm for computing the gradient of a neural network's loss function with respect to every parameter, applying the chain rule of calculus layer-by-layer from the output backward, enabling efficient training of multi-layer networks via gradient descent.*

Backpropagation was developed independently several times — Paul Werbos in 1974, Rumelhart-Hinton-Williams in 1986 (the paper that made it widely known). It is the engine of modern deep learning.

### The chain rule applied to networks

For a loss $L$ that depends on parameters through multiple layers, the chain rule lets us decompose the gradient. Consider a simple two-layer network:

$$
\hat{y} = \sigma(W_2 \sigma(W_1 x + b_1) + b_2)
$$

The loss $L$ depends on $W_1$ through $z_1 = W_1 x + b_1$, then $a_1 = \sigma(z_1)$, then $z_2 = W_2 a_1 + b_2$, then $\hat{y} = \sigma(z_2)$, then $L$.

By the chain rule:

$$
\frac{\partial L}{\partial W_1} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z_2} \cdot \frac{\partial z_2}{\partial a_1} \cdot \frac{\partial a_1}{\partial z_1} \cdot \frac{\partial z_1}{\partial W_1}
$$

Each factor is a local derivative computable from the layer's operation. The chain multiplies them.

### The backpropagation algorithm

Define $\delta^{(\ell)} = \partial L / \partial z^{(\ell)}$ — the error signal at layer $\ell$. The algorithm:

1. **Forward pass.** Compute $a^{(\ell)}$ for all layers, ending with the loss $L$.

2. **Compute output-layer error:**
   $$
   \delta^{(L)} = \nabla_{\hat{y}} L \odot \sigma'(z^{(L)})
   $$
   (where $\odot$ is element-wise multiplication and $\sigma'$ is the derivative of the activation).

3. **Backward pass.** For each layer $\ell = L-1, L-2, \ldots, 1$:
   $$
   \delta^{(\ell)} = (W^{(\ell+1)})^T \delta^{(\ell+1)} \odot \sigma'(z^{(\ell)})
   $$

4. **Compute parameter gradients:**
   $$
   \frac{\partial L}{\partial W^{(\ell)}} = \delta^{(\ell)} (a^{(\ell-1)})^T
   $$
   $$
   \frac{\partial L}{\partial b^{(\ell)}} = \delta^{(\ell)}
   $$

The algorithm uses each forward-pass intermediate $a^{(\ell)}$ and $z^{(\ell)}$, plus the error signals $\delta^{(\ell)}$ propagated backward through the network.

### Small worked example

A tiny network: one input $x = 2$, one hidden neuron with weight $w_1 = 0.5$ and bias $b_1 = 0$ and sigmoid activation, one output neuron with weight $w_2 = 1.0$ and bias $b_2 = 0$ and sigmoid activation, target $y = 1$, squared error loss.

**Forward:**
- $z_1 = w_1 \cdot x + b_1 = 0.5 \cdot 2 + 0 = 1$.
- $a_1 = \sigma(z_1) = 1 / (1 + e^{-1}) \approx 0.731$.
- $z_2 = w_2 \cdot a_1 + b_2 = 1.0 \cdot 0.731 + 0 = 0.731$.
- $a_2 = \sigma(z_2) = 1 / (1 + e^{-0.731}) \approx 0.675$.
- $L = (y - a_2)^2 / 2 = (1 - 0.675)^2 / 2 = 0.0528$.

**Backward:**
- $\partial L / \partial a_2 = -(y - a_2) = -(1 - 0.675) = -0.325$.
- $\sigma'(z_2) = a_2 (1 - a_2) = 0.675 \cdot 0.325 = 0.219$.
- $\delta_2 = \partial L / \partial z_2 = -0.325 \cdot 0.219 = -0.0712$.
- $\partial L / \partial w_2 = \delta_2 \cdot a_1 = -0.0712 \cdot 0.731 = -0.0520$.
- $\delta_1 = \delta_2 \cdot w_2 \cdot \sigma'(z_1) = -0.0712 \cdot 1.0 \cdot 0.731 \cdot 0.269 = -0.0140$.
- $\partial L / \partial w_1 = \delta_1 \cdot x = -0.0140 \cdot 2 = -0.0280$.

With learning rate $\eta = 0.1$:
- $w_2 \leftarrow 1.0 - 0.1 \cdot (-0.0520) = 1.00520$.
- $w_1 \leftarrow 0.5 - 0.1 \cdot (-0.0280) = 0.50280$.

Both weights nudge in the right direction — toward producing output closer to $y = 1$.

### Modern automatic differentiation

In practice, no one implements backpropagation by hand. **Automatic differentiation** (autodiff) libraries — PyTorch, TensorFlow, JAX — compute gradients automatically from the forward-pass code. The user writes the forward computation; the library computes the gradients.

This frees practitioners to experiment with arbitrary network architectures. As long as the forward pass is written in terms of differentiable operations, the backward pass is free.

### Gradient flow problems

Backpropagation has known difficulties in deep networks.

**Vanishing gradients.** Sigmoid and tanh activations have derivatives less than 1. Multiplying many such derivatives along a long chain gives a very small product — the gradient at lower layers approaches zero. Those layers train extremely slowly or not at all.

**Exploding gradients.** Symmetrically, if weights are large and activations have derivatives greater than 1, the gradient grows exponentially along the chain. Training diverges.

Mitigations:
- **Careful initialisation.** Xavier/Glorot, He initialisation, scaled to keep activations and gradients well-behaved.
- **ReLU activation.** Derivative is 0 or 1; does not shrink gradients.
- **Batch normalisation.** Normalises activations across the batch, keeping them well-conditioned.
- **Skip connections (ResNet, 2015).** Add the input of a block to its output. Gradients flow through the skip path without going through the block's transformations.
- **Gradient clipping.** Cap the gradient's magnitude during backpropagation.

Skip connections were the breakthrough that allowed networks of 100+ layers to train at all.

## 7.3 Activation functions

The non-linear functions applied at each neuron. Without them, a deep network would collapse to a single linear transformation. With them, deep networks can represent arbitrary functions.

### Sigmoid

*The sigmoid activation function is $\sigma(z) = 1/(1 + e^{-z})$, mapping any real number to the open interval $(0, 1)$ with an S-shape, historically the standard activation in early neural networks but largely replaced by ReLU in modern deep learning due to gradient-saturation problems.*

$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$

Derivative: $\sigma'(z) = \sigma(z)(1 - \sigma(z))$.

Properties:
- Output in $(0, 1)$ — useful for representing probabilities.
- Smooth and differentiable.
- Saturates at extremes — $\sigma(z) \to 1$ as $z \to +\infty$, $\sigma(z) \to 0$ as $z \to -\infty$. The derivative becomes very small in these regions, causing vanishing gradients.
- Output is not zero-centred, which slows training.

Sigmoid is still used in:
- The output layer for binary classification (predicting probability of the positive class).
- Gates in LSTM and GRU networks (Section 7.5).

It is rarely used in hidden layers of modern deep networks because of the vanishing-gradient problem.

### Tanh

*The hyperbolic tangent activation $\tanh(z) = (e^z - e^{-z})/(e^z + e^{-z})$ maps real numbers to $(-1, 1)$ with an S-shape symmetric around zero, similar to sigmoid but zero-centred, used in some recurrent network architectures.*

$$
\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}
$$

Derivative: $\tanh'(z) = 1 - \tanh^2(z)$.

Properties:
- Output in $(-1, 1)$ — zero-centred (an advantage over sigmoid).
- Smooth and differentiable.
- Saturates at extremes (same vanishing-gradient problem as sigmoid).

Tanh is the standard activation in vanilla RNNs and remains common in LSTM and GRU cells. For feed-forward networks, ReLU has displaced it.

### ReLU

*ReLU (Rectified Linear Unit) is the activation function $\text{ReLU}(z) = \max(0, z)$, outputting the input unchanged if positive and zero otherwise, the dominant activation in modern deep neural networks because its non-saturating derivative for positive inputs allows fast training of very deep models.*

$$
\text{ReLU}(z) = \max(0, z)
$$

Derivative: 1 if $z > 0$, 0 if $z < 0$, undefined at $z = 0$ (conventionally taken as 0).

Properties:
- **No saturation for positive inputs.** Gradient flows unchanged for positive activations, dramatically reducing vanishing gradients.
- **Computationally cheap.** A single comparison.
- **Sparse activation.** Many neurons output 0 for any given input, producing sparse representations.

**Dead ReLU problem.** A neuron whose weights have moved such that it outputs 0 for every input always has gradient 0 and never updates. It is "dead." Large learning rates and unfavourable initialisation can kill many neurons. Variants address this:

**Leaky ReLU.** Small positive slope for negative inputs:

$$
\text{LeakyReLU}(z) = \begin{cases} z & z > 0 \\ \alpha z & z \leq 0 \end{cases}
$$

with $\alpha$ typically 0.01. Prevents dead neurons.

**Parametric ReLU (PReLU).** Same as leaky ReLU but $\alpha$ is learned.

**ELU (Exponential Linear Unit).** Smooth version of leaky ReLU.

**GELU (Gaussian Error Linear Unit).** Smooth approximation, used in transformer models (BERT, GPT family).

In 2026, GELU is dominant in transformer architectures; ReLU and its variants remain common in CNNs and basic MLPs.

### Softmax

*Softmax is the activation function applied to the output layer of multi-class classification networks, converting a vector of real numbers (logits) into a probability distribution over classes by exponentiating and normalising, producing outputs that sum to 1.*

For $K$ classes with logits $z_1, z_2, \ldots, z_K$:

$$
\text{Softmax}(z)_k = \frac{e^{z_k}}{\sum_{j=1}^{K} e^{z_j}}
$$

The output is a probability distribution: each $\text{Softmax}(z)_k \in (0, 1)$ and $\sum_k \text{Softmax}(z)_k = 1$.

Softmax is the multi-class generalisation of sigmoid. For $K = 2$, softmax is equivalent to sigmoid on the logit difference.

The softmax output combined with cross-entropy loss produces well-behaved gradients and is the standard for multi-class classification.

### Choosing activation functions

Standard practice in 2026:

| Position | Function |
|---|---|
| Hidden layers (CNN, MLP) | ReLU or its variants |
| Hidden layers (transformer) | GELU |
| Hidden layers (RNN cells) | Tanh and sigmoid (in gates) |
| Output (binary classification) | Sigmoid |
| Output (multi-class classification) | Softmax |
| Output (regression) | None (linear) |

These are starting points. Specific applications may call for other choices.

## 7.4 Convolutional Neural Networks (CNNs)

### Convolutional neural network

*A Convolutional Neural Network is a deep neural-network architecture designed for grid-structured data (images, audio spectrograms, time series) that uses learnable filters applied across the input spatially, followed by pooling and fully-connected layers, dramatically reducing parameter count compared to fully-connected networks while exploiting local structure.*

CNNs are the architecture that made deep learning succeed on images. They have largely been displaced by **Vision Transformers** (ViT) on the largest scales since 2020, but CNNs remain the workhorse for most image-related applications.

### The convolution operation

The core idea: instead of connecting every input pixel to every neuron in the next layer (an enormous number of parameters), connect each neuron only to a small local **receptive field** of the input. Use the same weights across all positions — **weight sharing**.

A 2D convolution applies a learnable **filter** (or **kernel**) — a small grid of weights — at every position of the input. At each position, multiply the filter by the corresponding input region and sum.

For input $X$ and filter $W$ of size $k \times k$:

$$
(X * W)_{ij} = \sum_{m=0}^{k-1} \sum_{n=0}^{k-1} X_{i+m, j+n} W_{m, n}
$$

The output is a **feature map** — a 2D array of responses to the filter across the input.

Multiple filters produce multiple feature maps stacked into a tensor. A typical convolutional layer has dozens or hundreds of filters.

### Why convolution works for images

**Locality.** Image features are local — edges, textures, parts. A 3×3 filter detects local patterns; piling layers extends the receptive field.

**Translation invariance.** A cat is a cat whether at the top-left or bottom-right of the image. Weight sharing across positions means the same filter detects the pattern wherever it appears.

**Parameter efficiency.** A fully-connected layer from a 224×224 RGB image (150,528 inputs) to even a modest 1000-neuron layer would have 150 million parameters. A convolutional layer with 64 filters of size 3×3×3 has only 1,792 parameters. Vastly fewer parameters, same expressiveness for local pattern detection.

### Pooling

*A pooling layer reduces the spatial size of feature maps by summarising small regions, typically with max-pooling (take the maximum in each region) or average-pooling, providing translation invariance and reducing computational cost in subsequent layers.*

**Max pooling 2×2.** Take the maximum value in each 2×2 region. Halves the spatial dimensions.

After several alternating convolution and pooling layers, the feature maps become small enough to flatten and feed into fully-connected layers for the final classification.

### A typical CNN architecture

A standard image-classification CNN:

```
Input image (224 × 224 × 3)
    ↓
Conv layer 1: 64 filters of 3×3, ReLU
    ↓
Max pool 2×2 → 112 × 112 × 64
    ↓
Conv layer 2: 128 filters of 3×3, ReLU
    ↓
Max pool 2×2 → 56 × 56 × 128
    ↓
Conv layer 3: 256 filters of 3×3, ReLU
    ↓
Max pool 2×2 → 28 × 28 × 256
    ↓
Conv layer 4: 512 filters of 3×3, ReLU
    ↓
Max pool 2×2 → 14 × 14 × 512
    ↓
Conv layer 5: 512 filters of 3×3, ReLU
    ↓
Max pool 2×2 → 7 × 7 × 512
    ↓
Flatten → 25,088
    ↓
Dense layer: 4096 neurons, ReLU
    ↓
Dense layer: 4096 neurons, ReLU
    ↓
Dense output: K classes, Softmax
```

This is approximately the VGG-16 shape.

### Landmark CNN architectures

**LeNet-5 (1998, Yann LeCun).** The first major CNN. Designed for handwritten-digit recognition on cheques. Tiny by modern standards (60,000 parameters) but established the convolutional template.

**AlexNet (2012).** The breakthrough. 60 million parameters, 8 layers deep, trained on two GPUs. Used ReLU and dropout — both important innovations. Won ImageNet by a massive margin.

**VGG (2014).** Showed that depth matters. Simple architecture (only 3×3 convolutions) with 16 or 19 layers. Heavy parameter count.

**GoogLeNet / Inception (2014).** "Inception modules" — parallel convolutions of different sizes within each block. More parameter-efficient than VGG.

**ResNet (2015).** Introduced **residual connections** — skip paths that let gradients flow through. Enabled training of networks with 50, 100, or 152 layers. The architecture underlying most modern CNNs.

**DenseNet (2017).** Each layer receives inputs from all previous layers. Very parameter-efficient.

**EfficientNet (2019).** Systematic scaling of depth, width, and resolution. State-of-the-art accuracy with fewer parameters than VGG-style networks.

**Vision Transformers (2020-).** Apply the transformer architecture (originally for language) to images. At very large scales, ViTs match or exceed CNN performance. Hybrid architectures (combining convolutions and transformers) are now common.

### Applications of CNNs

CNNs power:
- **Image classification.** What is in this image?
- **Object detection.** Where are the objects in this image? (YOLO, Faster R-CNN, DETR, modern alternatives.)
- **Semantic segmentation.** Which pixels belong to which object class? (U-Net, DeepLab.)
- **Face recognition.** Identifying individuals from face images.
- **Medical imaging.** Cancer detection on X-rays, CT, MRI scans.
- **Satellite imagery analysis.** Land-use classification, building detection.
- **Speech recognition** (combined with other architectures).
- **Video analysis.** Action recognition, scene understanding.

In Nepali contexts:
- Crop-disease detection from smartphone photos for farmers.
- Satellite-imagery analysis for the Ministry of Agriculture and CBS.
- Document classification (citizenship cards, passports, voter ID forms) at government counters.
- Manuscript digitisation projects for Nepali heritage texts.
- License plate recognition at toll plazas and parking facilities.
- Medical image analysis at major hospitals (TUTH, Bir, Patan) — though deployment lags research.

## 7.5 Recurrent Neural Networks (RNNs)

### Recurrent neural network

*A Recurrent Neural Network is a neural-network architecture designed for sequential data in which the network maintains a hidden state that is updated at each time step from the current input and the previous state, allowing the network to capture temporal dependencies through learned memory.*

CNNs handle grid-structured data. RNNs handle sequence data — text, audio, time series, anything where order matters. Each input arrives at a specific time step; the network processes them in order, carrying information through time via the hidden state.

### The basic RNN

For input sequence $x_1, x_2, \ldots, x_T$:

$$
h_t = \sigma(W_{hh} h_{t-1} + W_{xh} x_t + b_h)
$$

$$
y_t = W_{hy} h_t + b_y
$$

At each time step, the hidden state $h_t$ is a function of the previous hidden state and the current input. The network uses the same weights at every time step — analogous to weight sharing in CNNs, but over time rather than space.

The initial hidden state $h_0$ is typically zeros or learned parameters.

### Training RNNs

RNNs are trained with **Backpropagation Through Time (BPTT)** — the same backpropagation algorithm as before, but unrolled across all time steps. The gradient at each weight is the sum of contributions from every time step.

For long sequences, BPTT is computationally expensive (linear in sequence length) and suffers from **vanishing or exploding gradients** — the same issues as deep feed-forward networks, but now along the time axis. A vanilla RNN cannot effectively remember information from many steps back.

### Long Short-Term Memory (LSTM)

*A Long Short-Term Memory network is a refined recurrent architecture that uses gated cells to control what information is added to, removed from, and read from the memory across time steps, dramatically improving the network's ability to learn long-range temporal dependencies compared to vanilla RNNs.*

LSTM was proposed by Hochreiter and Schmidhuber in 1997 but only became widely used after 2012 with the availability of computing power.

The LSTM cell has three **gates** controlling information flow:

- **Forget gate** $f_t = \sigma(W_f [h_{t-1}, x_t] + b_f)$ — decides what to forget from the cell state.
- **Input gate** $i_t = \sigma(W_i [h_{t-1}, x_t] + b_i)$ — decides what new information to add.
- **Output gate** $o_t = \sigma(W_o [h_{t-1}, x_t] + b_o)$ — decides what part of the cell state to output.

The cell state is updated:

$$
C_t = f_t \odot C_{t-1} + i_t \odot \tanh(W_C [h_{t-1}, x_t] + b_C)
$$

The hidden state:

$$
h_t = o_t \odot \tanh(C_t)
$$

The gates use sigmoid (output in [0, 1] — fractional gates) and the candidate updates use tanh. The cell state $C_t$ has additive updates (rather than purely multiplicative), which allows information to flow across long time horizons without vanishing.

LSTM was the dominant sequence-learning architecture from roughly 2014 to 2018. It powered Google Translate, Apple Siri's speech recognition, and many other production systems.

### Gated Recurrent Unit (GRU)

A simpler alternative to LSTM, introduced in 2014. Combines the forget and input gates into a single update gate, fewer parameters, often comparable performance. Used as an LSTM substitute when computational efficiency matters.

### Attention and transformers

A revolution in sequence learning came with the **attention mechanism** (Bahdanau et al., 2014, popularised by transformers in 2017).

The idea: instead of carrying information through the sequence via a hidden state (the LSTM/GRU approach), let every position attend directly to every other position. The relevance of position $j$ to position $i$ is computed by a learned function; positions with high relevance contribute most to the new representation at $i$.

The **transformer** architecture (Vaswani et al., 2017) abandoned recurrence entirely, using only attention. It massively parallelises training (unlike RNNs, which must process the sequence step by step) and captures long-range dependencies directly.

Transformers have displaced RNNs for most language tasks. BERT (2018), GPT family (2018-onward), T5, and the modern large language models are all transformers. As of 2026, transformers also dominate speech recognition, video understanding, time-series forecasting, and increasingly vision (ViT).

RNNs remain useful in specific niches:
- Resource-constrained settings where transformer attention is too expensive.
- Strict streaming inference where causal sequence processing matters.
- Some time-series problems where the inductive bias suits the data.

### Applications of RNNs and sequence models

- **Language modelling** — predicting the next word in a sequence.
- **Machine translation** — Google Translate used encoder-decoder LSTM from 2016 onwards, switched to transformer in 2018.
- **Speech recognition** — DeepSpeech, the underlying technology behind many voice assistants.
- **Time-series forecasting** — electricity demand, financial prices, weather, sensor streams.
- **Music generation** — composing in particular styles.
- **Anomaly detection in sequences** — for security logs, sensor data, network traffic.
- **Sentiment analysis** of variable-length text.

In Nepal:
- NEA load forecasting uses LSTM-based models in some research deployments.
- Speech recognition for Nepali is a developing area; Google's Nepali ASR is available but quality lags major languages.
- Sentiment analysis of Nepali Twitter/X and Facebook posts for political polling and brand monitoring.
- Sequence-based fraud detection at major banks — modelling transaction sequences over time rather than treating each transaction independently.

## 7.6 ML applications in security

The final section ties together the entire subject by surveying how machine learning is applied across the major areas of cybersecurity. These applications recur in real deployments at financial institutions, telecoms, government agencies, and security operations centres.

### Anomaly detection and intrusion detection

*Anomaly detection is the unsupervised or semi-supervised machine-learning task of identifying patterns that deviate substantially from established baselines of normal behaviour, used in cybersecurity to flag unusual events that may represent attacks, malfunctions, or fraud.*

Classical signature-based intrusion detection looks for known patterns. Anomaly-based detection looks for the unknown — patterns the model has not seen before.

**Approaches:**

- **Statistical methods.** Build a statistical model of normal traffic, flag deviations. Z-score thresholds, exponential moving averages, ARIMA-residual analysis.
- **Clustering-based.** Use K-means or DBSCAN on traffic features. Points far from any cluster (or in their own tiny cluster) are anomalies.
- **One-class SVM.** Learn a boundary enclosing the "normal" data; anything outside is anomalous.
- **Isolation forests.** Ensemble of trees that randomly partition the data. Anomalies are easier to isolate (require fewer splits). Fast and effective.
- **Autoencoders.** Neural networks that learn to reconstruct their inputs through a bottleneck. Anomalies have high reconstruction error.
- **LSTM and transformer-based.** Model sequences of events; flag sequences with low probability under the model.

**Deployment patterns:**

- Network IDS at the perimeter of major Nepali ISPs (NTC, Ncell core networks).
- Log analysis for SIEM products (Splunk's UEBA, Microsoft Sentinel) at banks and government agencies.
- Server-side fraud monitoring at eSewa, Khalti, IME Pay.
- Smart-grid anomaly detection at NEA's load-control systems (research stage).

### Malware classification

Modern malware detection combines signature-based methods (faster, lower false positives) with ML-based methods (catch novel variants).

**Static features.** Analyse the malware binary without executing it:
- Byte-level features — n-grams of bytes, entropy, file-size distributions.
- Header features — PE header fields in Windows executables, MachO/ELF headers.
- Imported function lists — what API calls the binary uses.
- String literals — embedded URLs, IP addresses, suspicious patterns.

**Dynamic features.** Run the binary in a sandbox and observe behaviour:
- System calls and frequency.
- Network connections.
- File-system modifications.
- Registry changes (on Windows).
- Process spawning.

**Models:**

- *Gradient boosting* on engineered features — classical, strong baseline.
- *CNN on byte arrays* — treats the binary as a 1D image. Pioneered by Microsoft research around 2018. Catches patterns without explicit feature engineering.
- *Graph neural networks* on control-flow graphs — captures structural properties of code.

Production endpoint products (Microsoft Defender, CrowdStrike Falcon, SentinelOne) combine all these. Detection accuracy is high but never perfect — adversarial examples and obfuscation are real challenges.

The 2025 wave of banking-trojan APKs in Nepal — disguised as eSewa, Khalti, IME Pay apps — was caught (at varying speeds) by these mechanisms running in the major app stores and on endpoint products.

### Phishing detection

Phishing is a content-classification problem. The features:

**URL features.**
- Length and complexity.
- Use of IP addresses instead of domain names.
- Suspicious top-level domains.
- Subdomain depth.
- Punycode and homograph attacks (visually similar domain names).
- Age of the domain.
- Reputation from blocklists.

**Page features.**
- Visible text content.
- Forms requesting sensitive information.
- External links.
- Use of HTTPS.
- Certificate properties.
- Page-rank reputation of the domain.

**Email features.**
- Sender authentication (SPF, DKIM, DMARC results).
- Linguistic features (urgency cues, mismatched salutations).
- Header anomalies.
- Attached file types.

**Models:** Random forests, gradient boosting, and modern transformer-based models trained on labelled corpora of phishing and legitimate examples. Google Safe Browsing, Microsoft SmartScreen, and similar services use such models at planetary scale, blocking billions of phishing attempts daily.

For Nepali contexts, phishing targeting bank customers — fake eSewa, Khalti, NIC Asia, NRB notifications — is one of the highest-volume threats. Detection runs in browser-level Safe Browsing services and in email-gateway filters.

### Fraud detection

The most-deployed ML application in financial services.

**Features for transaction-fraud detection:**

- **Transaction-level.** Amount, time, merchant, channel, geographic location, device fingerprint.
- **User-level.** Recent transaction history, account age, usual spending patterns, recent password changes or account changes.
- **Merchant-level.** Average fraud rate at this merchant, recent activity patterns.
- **Network-level.** IP reputation, VPN/proxy indicators, device-fingerprint reputation.
- **Time-based.** Day of week, hour of day, holiday, recent global events.

**Models:**

- **Gradient boosting (XGBoost, LightGBM).** The production standard for tabular fraud-detection features. Fast, accurate, interpretable enough for regulatory review.
- **Deep neural networks.** Particularly for high-dimensional features (sequence models on transaction histories).
- **Graph neural networks.** Model the transaction graph (users, devices, merchants). Detect coordinated fraud rings.
- **Anomaly-detection methods.** For very rare or novel patterns.

**Operational concerns:**

- **Real-time scoring.** Fraud models must score transactions in milliseconds, before the transaction completes.
- **Concept drift.** Fraud patterns change as fraudsters adapt. Models need continuous retraining.
- **Class imbalance.** Fraud is rare. Special techniques (oversampling, cost-sensitive learning) are essential.
- **Cost-sensitive evaluation.** Discussed in Chapter 6. The ratio of false-negative cost to false-positive cost determines the operating point.
- **Explainability.** Customers whose transactions are blocked may demand explanations; regulators may require them. Methods like SHAP and LIME provide post-hoc explanations of model decisions.

eSewa, Khalti, IME Pay, and the major Nepali banks deploy fraud detection at scale. The transaction volumes — many millions per day combined — make automated detection essential; human review can only handle the highest-risk flagged cases.

### Other security applications

**Spam detection.** The original ML success in security. Modern systems use deep learning on email content combined with sender reputation, network features, and link analysis.

**Botnet detection.** ML on network traffic patterns to find compromised hosts communicating with command-and-control infrastructure.

**Account takeover detection.** Behavioural biometrics — typing patterns, mouse movements, touch patterns — to detect when an account is being accessed by someone other than its owner.

**Insider threat detection.** UBA/UEBA (covered in the Cryptography and Data Security subject's Chapter 6.10) uses ML on user activity to detect malicious or compromised insiders.

**Vulnerability prediction.** ML on code features, dependency graphs, and historical CVE data to predict which components are likely to have vulnerabilities.

**Threat-intelligence enrichment.** NLP on threat reports, malware descriptions, and dark-web text to extract entities and relationships.

### Adversarial machine learning

Where ML is deployed, attacks on ML follow. This deserves its own attention.

**Adversarial examples.** Inputs deliberately crafted to fool an ML model. Classic image-classification example: a panda image with imperceptible noise that causes the model to output "gibbon" with high confidence. Adversarial examples have been demonstrated against face-recognition, speech-recognition, and security ML systems.

**Evasion attacks.** Generalised version. Malware authors craft binaries that evade ML-based detection. Phishing operators craft messages that bypass ML filters.

**Data poisoning.** Insert crafted training data to corrupt the model. Particularly relevant for systems that retrain on user-contributed data — spam filters, recommendation systems, fraud-detection models.

**Model extraction.** Steal a model through repeated queries. Then attack the substitute model freely.

**Membership inference.** Determine whether specific data was in the training set. Privacy concern, especially for medical and financial models.

**Defences:** Adversarial training, input validation, anomaly detection on inputs, model ensembling, differential privacy. None complete; this is an active arms race.

### The full picture

The applications in this section draw together threads from across the subject:

- Statistics (Chapter 1) — for baselines and confidence intervals.
- Data preparation (Chapter 2) — for feature engineering in fraud detection.
- Supervised learning (Chapter 3) — classifiers for malware, phishing, and fraud.
- Bayesian methods (Chapter 4) — for anomaly detection and probabilistic threat scoring.
- Unsupervised methods (Chapter 5) — for clustering attacks and reducing high-dimensional security data.
- Performance evaluation (Chapter 6) — central to deploying any of these in production.
- Deep learning (this chapter) — for the highest-performing modern systems.

The MSc graduate completing this subject in 2026 leaves with the technical foundation to work in any of these areas. The algorithms will evolve; the underlying ideas — generalisation, the bias-variance trade-off, honest evaluation, the cost of errors — will remain. Nepal's growing demand for security and data-analytics professionals will absorb every well-trained graduate the universities can produce. The applications in this section will be increasingly important pieces of Nepal's digital infrastructure as eSewa, Khalti, the major banks, the telecom operators, and government agencies all scale their ML-based defences over the years ahead.
