---
title: 'Chapter 1 — Introduction to Generative AI'
sidebar_label: 'Ch 01 — Introduction to Generative AI'
sidebar_position: 1
description: 'Chapter 1 of Generative AI and Security (ENCTNS615).'
slug: /ioe/msncs/year-2-part-1/elective-iii/generative-ai-and-security/notes/ch01
tags: [msncs, ENCTNS615, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Generative artificial intelligence has, in the space of a few years, moved from a specialised research topic to a transformative technology touching most fields of human activity. For cybersecurity specifically, generative AI is a double-edged technology — strengthening defensive capabilities through automation, scale, and pattern recognition while simultaneously empowering attackers with new offensive techniques at unprecedented scale and quality. The MSc graduate in network and cybersecurity needs deep understanding of both sides. This chapter establishes the foundation: what generative AI is, where it came from, how it differs from earlier machine learning paradigms, the deep-learning and probabilistic underpinnings, the major model families (GANs, VAEs, Transformers, diffusion models, hybrids), and the cybersecurity implications that will fill the rest of the subject.

## 1.1 Generative AI overview and importance in technology

### Generative AI

*Generative artificial intelligence is the class of machine-learning systems that produce new content — text, images, audio, video, code, structured data, three-dimensional models — that resembles the patterns and properties of training data without being explicit copies, accomplished through models that learn the underlying distribution of the training data and sample from it to create novel outputs.*

The term contrasts with **discriminative AI**, which classifies, predicts, or otherwise analyses input without producing new content.

### The recent transformation

The acceleration since 2017-2018 has been remarkable:

- **2017.** Transformer architecture introduced ("Attention Is All You Need", Vaswani et al.). Foundation for modern language models.
- **2018.** BERT and GPT-1 release. Bidirectional and unidirectional language pretraining established.
- **2019.** GPT-2 — first widely-noted language model with persuasive generation.
- **2020.** GPT-3 — substantial scale increase; in-context learning demonstrated.
- **2021.** DALL-E for image generation; Codex for code.
- **2022.** ChatGPT release (November) — public, conversational AI reached mainstream.
- **2022-2023.** Stable Diffusion, Midjourney for image generation. LLaMA open-weight models from Meta.
- **2023-2024.** GPT-4, Claude 3 family, Gemini, multiple competitive frontier models. Multimodal capabilities standard.
- **2024-2026.** Reasoning models (OpenAI o-series, Claude with extended thinking, DeepSeek-R1). Open-weight models matching frontier capabilities. Agent capabilities. Cost reductions of orders of magnitude.

### Importance in technology

Generative AI affects virtually every information-intensive domain:

**Software engineering.** Code generation, code review, debugging assistance. Programmer productivity reportedly increased substantially; tooling deeply integrated into development environments.

**Content creation.** Text, image, video, audio production at scale. Marketing, entertainment, education, journalism transformed.

**Knowledge work.** Drafting, summarisation, research assistance, analysis, brainstorming. Most knowledge workers use generative AI daily.

**Customer service.** Conversational agents handling substantial customer interaction.

**Scientific research.** Literature review, hypothesis generation, code for analysis, drug discovery, materials science.

**Education.** Tutoring, content development, assessment assistance.

**Cybersecurity.** Both attack and defence; the focus of this subject.

### Generative AI adoption in Nepal

For Nepali context:
- Mainstream adoption from 2023 onwards. ChatGPT, Claude, Gemini commonly used by professionals.
- Educational use widespread among students at universities including TU and IOE Pulchowk.
- Enterprise adoption emerging — banks, telecoms, IT-services companies exploring use cases.
- Local startups building on GenAI capabilities — content generation, customer support, translation between Nepali and English.
- Government use limited but exploring (translation, document processing).
- Limited domestic model development; reliance on international platforms.

The implications for security work in Nepali enterprises are substantial — both defensive opportunities and offensive risks demand attention.

## 1.2 Historical evolution of machine learning to generative models

### From rules to learning

Early AI (1950s-1980s) was largely rule-based. Knowledge encoded by human experts; systems applied rules. Limited by the brittleness of explicit rule systems and the difficulty of encoding human knowledge comprehensively.

### The statistical learning era

Through the 1990s and 2000s, machine learning moved toward statistical methods:

**Supervised learning.** Models trained on labelled examples; learn to predict labels for new examples.

**Unsupervised learning.** Models find patterns without labels.

**Reinforcement learning.** Models learn through trial and error with reward signals.

Specific techniques that dominated: decision trees, support vector machines, Bayesian methods, ensemble methods (random forests, gradient boosting). These remain useful; they are the foundation on which modern deep learning was built.

### Deep learning emergence

Through the 2000s and 2010s:

- **2006.** Geoffrey Hinton's work on training deep neural networks; revival of neural-network research.
- **2009.** Fei-Fei Li's ImageNet dataset.
- **2012.** AlexNet wins ImageNet competition; convolutional neural networks demonstrate breakthrough image recognition.
- **2014.** Generative Adversarial Networks (Goodfellow et al.) — generative deep learning emerges.
- **2015.** ResNet — very deep networks practical.
- **2017.** Transformer architecture published.

The Cambrian explosion that followed produced today's generative AI capabilities.

### From discriminative to generative dominance

For much of machine learning history, discriminative tasks (classification, prediction) attracted the most attention because they were more tractable and had clearer evaluation metrics. Generative tasks — producing realistic novel outputs — were harder.

Several developments enabled the shift to generative dominance:

- **Scaling.** Larger models with more parameters; more data; more compute.
- **Architecture innovations.** Particularly the transformer.
- **Training techniques.** Self-supervised learning enabling use of vast unlabelled data.
- **Hardware.** GPUs and now specialised AI accelerators.
- **Open source.** Frameworks (PyTorch, TensorFlow) and increasingly model weights enabling broad participation.

### Relationship to the broader ML and Data Analytics subject

The MSc programme includes ENCTNS551 (Machine Learning and Data Analytics) covering machine learning fundamentals — classification, regression, clustering, neural network basics, and so on. This subject builds on that foundation, focusing on the specific case of generative models and their cybersecurity implications.

## 1.3 Discriminative vs generative models

### The fundamental distinction

**Discriminative models** learn $P(y \mid x)$ — the probability of label $y$ given input $x$. They learn the boundary between classes or the mapping from input to output.

**Generative models** learn $P(x, y)$ or $P(x)$ — the joint distribution of inputs and labels, or just the distribution of inputs. They learn how the data is generated, enabling production of new samples.

### Discriminative examples

- **Logistic regression.** Classifies into categories.
- **SVM.** Finds decision boundary.
- **Random forest classifier.** Predicts class.
- **Most neural-network classifiers.** Image classification, sentiment analysis.

These models excel at classification tasks. They don't generate new examples.

### Generative examples

- **Naive Bayes classifier.** Models joint distribution; technically generative even though used for classification.
- **Hidden Markov Models.** Generate sequences.
- **Variational Autoencoders (VAEs).** Generate samples from learned latent distribution.
- **Generative Adversarial Networks (GANs).** Generate samples that fool discriminator.
- **Large Language Models (LLMs).** Generate text by predicting next tokens.
- **Diffusion models.** Generate samples through iterative denoising.

### Comparison

| Aspect | Discriminative | Generative |
|---|---|---|
| Learns | $P(y \mid x)$ | $P(x)$ or $P(x, y)$ |
| Purpose | Classify/predict | Generate/sample |
| Computational cost | Generally lower | Generally higher |
| Data efficiency | Often higher | Often lower |
| Generation capability | None | Core capability |
| Interpretability | Often clearer | Often opaque |
| Robustness to label scarcity | Limited | Better (can learn from unlabelled data) |
| Typical training | Labelled data | Often unlabelled or self-supervised |

### Implications for cybersecurity

**Discriminative models in security:**
- Malware classification (malicious vs benign).
- Spam filtering.
- Anomaly detection (often).
- Authentication (biometric matching).
- Traffic classification.

**Generative models in security:**
- Phishing content generation (offensive).
- Synthetic data for training (defensive — anonymised data for testing).
- Honey-document generation.
- Adversarial example generation (testing robustness).
- Code generation for security tooling.
- Threat intelligence summarisation.
- Decoy content for deception operations.

Both classes serve roles. The generative class adds capabilities that discriminative models cannot provide.

## 1.4 Deep learning basics — neural networks, backpropagation

### Neural networks

*An artificial neural network is a computational model loosely inspired by biological neurons, consisting of interconnected layers of nodes ("neurons") that transform inputs through weighted connections, learnable parameters, and non-linear activation functions, ultimately producing outputs for classification, regression, or generative tasks.*

### Basic architecture

A single neuron computes:

$$y = f\left(\sum_{i} w_i x_i + b\right)$$

where:
- $x_i$ are inputs.
- $w_i$ are weights (learnable).
- $b$ is bias (learnable).
- $f$ is an activation function (sigmoid, ReLU, tanh, GELU).
- $y$ is output.

Networks consist of layers of such neurons.

### Common architectures

**Feedforward networks (MLPs).** Sequential layers; information flows from input to output. Universal approximators in principle.

**Convolutional Neural Networks (CNNs).** Use convolution operations exploiting spatial locality. Dominant for image processing through the 2010s.

**Recurrent Neural Networks (RNNs).** Have feedback connections enabling processing of sequences. LSTM and GRU variants address gradient problems.

**Transformers.** Attention-based; processes sequences. Dominant for language since 2017; expanding to other domains.

**Graph Neural Networks.** Operate on graph-structured data.

### Backpropagation

*Backpropagation is the algorithm for training neural networks that computes gradients of the loss function with respect to all parameters through reverse-mode automatic differentiation, applying the chain rule from output back through the network, enabling gradient descent optimisation of the millions or billions of parameters in modern networks.*

The algorithm:

1. **Forward pass.** Inputs propagate through network; loss computed at output.
2. **Backward pass.** Gradients computed layer-by-layer from output toward input.
3. **Update.** Parameters updated using gradients and learning rate.
4. **Iterate.** Repeat for many examples and epochs.

The mathematical foundation is the chain rule:

$$\frac{\partial L}{\partial w_i} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial z} \cdot \frac{\partial z}{\partial w_i}$$

Modern frameworks (PyTorch, TensorFlow, JAX) automate the gradient computation through automatic differentiation.

### Worked example — small network

A 2-input, 2-hidden, 1-output network with sigmoid activation:

```
Input:  x1, x2
Hidden: h1 = σ(w11·x1 + w12·x2 + b1)
        h2 = σ(w21·x1 + w22·x2 + b2)
Output: y  = σ(v1·h1 + v2·h2 + bo)
```

For inputs $(x_1, x_2) = (1, 0)$ with all weights 0.5 and biases 0:
- $h_1 = \sigma(0.5 \cdot 1 + 0.5 \cdot 0 + 0) = \sigma(0.5) \approx 0.622$
- $h_2 = \sigma(0.5) \approx 0.622$
- $y = \sigma(0.5 \cdot 0.622 + 0.5 \cdot 0.622) = \sigma(0.622) \approx 0.651$

If the target is 1, the loss using squared error is $L = (1 - 0.651)^2 \approx 0.122$. Backpropagation computes how to adjust each weight to reduce this loss; gradient descent applies the adjustments. Repeated over many examples, the network learns the function.

The principle scales to networks with billions of parameters processing complex inputs — fundamentally the same algorithm, applied at vastly larger scale.

### Training challenges

**Vanishing/exploding gradients.** Gradients become very small or very large in deep networks. Addressed through architecture choices (residual connections, batch normalisation, careful initialisation) and activation functions (ReLU and variants).

**Overfitting.** Network memorises training data instead of generalising. Addressed through regularisation, dropout, data augmentation, early stopping.

**Hyperparameter sensitivity.** Learning rate, batch size, architecture choices substantially affect outcome.

**Compute requirements.** Training frontier models requires substantial GPU/TPU resources.

**Data requirements.** Modern models trained on trillions of tokens or massive image datasets.

## 1.5 Probabilistic foundations — Bayesian learning, likelihood estimation

### Bayesian framework

*Bayesian learning is the approach to machine learning that treats parameters and predictions probabilistically, updating beliefs about parameters based on observed data through Bayes' theorem, providing a principled framework for uncertainty quantification and incorporating prior knowledge.*

Bayes' theorem:

$$P(\theta \mid D) = \frac{P(D \mid \theta) \cdot P(\theta)}{P(D)}$$

where:
- $\theta$ represents parameters.
- $D$ represents observed data.
- $P(\theta \mid D)$ is the posterior — beliefs about parameters after observing data.
- $P(D \mid \theta)$ is the likelihood — probability of data given parameters.
- $P(\theta)$ is the prior — beliefs about parameters before data.
- $P(D)$ is the evidence — normalising constant.

### Maximum likelihood estimation

*Maximum Likelihood Estimation (MLE) is the method for estimating parameters by choosing values that maximise the likelihood of observing the actual training data, providing point estimates without explicit prior specification, foundational to most modern deep learning training.*

The MLE estimate:

$$\hat{\theta}_{MLE} = \arg\max_\theta P(D \mid \theta)$$

In practice, optimisation is performed on the log-likelihood:

$$\hat{\theta}_{MLE} = \arg\max_\theta \log P(D \mid \theta)$$

For i.i.d. data:

$$\log P(D \mid \theta) = \sum_{i=1}^n \log P(x_i \mid \theta)$$

Equivalently, minimising the negative log-likelihood.

### Cross-entropy loss

For neural network classification, the loss function is typically cross-entropy:

$$L_{CE} = -\sum_{i} y_i \log p_i$$

where $y_i$ are the true labels (one-hot) and $p_i$ are predicted probabilities.

Cross-entropy is the negative log-likelihood for categorical distributions — minimising cross-entropy is equivalent to maximising likelihood. This is the loss function used to train most language models.

### Generative model training

For a generative model $p_\theta(x)$:

- **Training objective:** maximise $\log p_\theta(x)$ for training samples.
- **For images:** the likelihood may be tractable (autoregressive models, normalising flows) or approximated (VAEs use variational lower bound).
- **For text:** language models compute exact likelihood for each token given previous tokens.

### Variational inference

When exact posterior is intractable, variational inference approximates with a simpler distribution:

$$q_\phi(z) \approx p(z \mid x)$$

The approximation is found by maximising the Evidence Lower Bound (ELBO):

$$\text{ELBO}(\phi) = \mathbb{E}_{q_\phi(z)}[\log p(x, z)] - \mathbb{E}_{q_\phi(z)}[\log q_\phi(z)]$$

This framework underlies VAEs and many other modern generative models.

### Bayesian view of neural networks

Standard neural network training produces point estimates. Bayesian neural networks treat weights as distributions:

- **Provides uncertainty estimates** in predictions.
- **Computationally expensive** in pure form.
- **Approximate methods** (variational inference, MC Dropout, deep ensembles) commonly used.

Uncertainty estimation is increasingly relevant for security applications — knowing when a model is uncertain matters for trustworthy deployment.

## 1.6 Popular GenAI models — GANs, VAEs

### Generative Adversarial Networks (GANs)

*A Generative Adversarial Network is a generative-model architecture consisting of two networks — a generator that produces synthetic samples and a discriminator that distinguishes real from synthetic — trained in a minimax game where the generator improves at fooling the discriminator and the discriminator improves at detecting fakes, ultimately producing high-quality realistic samples.*

Introduced by Goodfellow et al. (2014).

### GAN architecture

**Generator G.** Takes random noise $z$ as input; produces sample $G(z)$.

**Discriminator D.** Takes sample as input; produces probability that sample is real.

### Training objective

The minimax game:

$$\min_G \max_D V(D, G) = \mathbb{E}_{x \sim p_{data}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$

- D maximises: classify real correctly (first term) and fake correctly (second term).
- G minimises: make D fail to identify fakes (i.e., maximise $D(G(z))$).

### Training process

Alternating updates:
1. Sample real data and noise; train D to distinguish.
2. Sample noise; train G to fool D.
3. Repeat.

### GAN variants

Many variants address training difficulties:

- **DCGAN.** Deep Convolutional GAN; architecture for stable image generation.
- **Conditional GAN (cGAN).** Generation conditioned on labels.
- **Wasserstein GAN.** Alternative loss for more stable training.
- **StyleGAN.** High-quality face generation; foundation for many deepfakes.
- **CycleGAN.** Image-to-image translation without paired data.
- **BigGAN.** Large-scale conditional generation.

### GAN applications

**Constructive:**
- Synthetic data generation for training (where real data scarce or sensitive).
- Image super-resolution.
- Style transfer.
- Data augmentation.

**Concerning:**
- Deepfake creation (face swapping in video).
- Synthetic media for misinformation.
- Realistic fake imagery.

For cybersecurity context, GANs enable both synthetic-data generation for defensive ML training and synthetic-media generation for social engineering — the dual-use nature.

### Variational Autoencoders (VAEs)

*A Variational Autoencoder is a generative model that learns a continuous latent representation of data using an encoder that maps inputs to a distribution over latent variables and a decoder that reconstructs data from latent samples, trained to balance reconstruction quality and latent-space regularity through a variational objective.*

Introduced by Kingma and Welling (2013).

### VAE architecture

**Encoder.** $q_\phi(z \mid x)$ — maps input to distribution over latent $z$ (typically Gaussian parameters).

**Decoder.** $p_\theta(x \mid z)$ — reconstructs $x$ from latent $z$.

**Prior.** $p(z)$ — typically standard normal.

### Training objective (ELBO)

$$L_{VAE} = \mathbb{E}_{q_\phi(z \mid x)}[\log p_\theta(x \mid z)] - D_{KL}(q_\phi(z \mid x) \| p(z))$$

First term: reconstruction quality. Second term: KL divergence keeping posterior close to prior, providing regularisation.

### VAE properties

- **Continuous latent space.** Interpolations meaningful.
- **Stable training.** Compared to GANs.
- **Sometimes blurry generation.** Common criticism.
- **Tractable likelihood approximation.** ELBO is interpretable.

### VAE applications

- Anomaly detection (reconstruction error indicates anomaly).
- Representation learning.
- Synthetic data generation.
- Drug discovery (molecular generation).
- Recommendation systems.

### Hybrid approaches

GAN and VAE combined:
- **VAE-GAN.** VAE with GAN-like discriminator for sharper output.
- **Adversarial Autoencoder.** Uses discriminator instead of KL term.
- **VQ-VAE.** Vector-quantised VAE; discrete latent space.

### GAN vs VAE comparison

| Aspect | GAN | VAE |
|---|---|---|
| Sample quality | Generally sharper | Sometimes blurry |
| Training stability | Often unstable | Generally stable |
| Likelihood | Implicit, intractable | Lower bound tractable |
| Latent space | Less structured | Continuous, structured |
| Mode coverage | Sometimes mode collapse | Generally covers modes |
| Inference | Generator only | Encoder available |
| Use cases | High-quality samples | Representation + generation |

## 1.7 Transformers — self-attention, architecture, GPT dominance

### Transformer architecture

*A transformer is a neural-network architecture based primarily on self-attention mechanisms (rather than recurrence or convolution) that processes input sequences by attending to all positions simultaneously, enabling parallel computation and effective long-range dependency modelling, foundational to modern large language models and increasingly to vision and multimodal models.*

Introduced in "Attention Is All You Need" (Vaswani et al., 2017).

### Self-attention

The core innovation. For each position in the sequence:

1. **Query (Q), Key (K), Value (V) vectors** derived from input through learned projections.
2. **Attention scores** computed: $\text{score}(i,j) = \frac{Q_i \cdot K_j}{\sqrt{d_k}}$ for each pair.
3. **Softmax** over scores to get attention weights.
4. **Output** is weighted sum of value vectors: $\text{out}_i = \sum_j \text{softmax}(\text{score}(i,j)) \cdot V_j$.

The attention mechanism written compactly:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

### Multi-head attention

Multiple attention "heads" run in parallel, each with different learned projections, capturing different relationship types. Outputs concatenated and projected.

### Full transformer block

A transformer block typically contains:
1. **Multi-head self-attention** with residual connection and layer normalisation.
2. **Feed-forward network** (typically 4x hidden dimension, then back) with residual connection and layer normalisation.

Stacking many blocks (12, 24, 48, 96, ...) produces the depth of modern transformers.

### Transformer variants

**Encoder-only.** BERT family. Bidirectional; good for understanding tasks.

**Decoder-only.** GPT family. Unidirectional; good for generation. Now the dominant pattern.

**Encoder-decoder.** Original transformer; T5, BART. Good for sequence-to-sequence tasks.

### Why transformers won

Several reasons for their dominance:

- **Parallelisation.** Unlike RNNs, transformers process whole sequences in parallel.
- **Long-range dependencies.** Direct connections between any two positions.
- **Scalability.** Architecture scales gracefully to billions of parameters.
- **Transfer learning.** Pretrained transformers transfer well to many tasks.
- **Multimodal extension.** Same architecture works for images (Vision Transformer), audio, etc.

### GPT family

GPT (Generative Pre-trained Transformer) is the decoder-only line that has driven much of generative AI's recent prominence:

- **GPT-1 (2018).** 117M parameters. Demonstrated transfer learning from pretrained transformer.
- **GPT-2 (2019).** 1.5B parameters. Notably good text generation.
- **GPT-3 (2020).** 175B parameters. Few-shot in-context learning.
- **GPT-3.5/ChatGPT (2022).** RLHF-trained for conversation.
- **GPT-4 (2023).** Multimodal; substantial reasoning improvements.
- **GPT-4o, o1, o3 (2024-25).** Reasoning models with extended deliberation.

The arc has been increasing scale, then increasing efficiency, then increasing reasoning capability.

### LLM training pipeline

Typical training for modern LLMs:

1. **Pretraining.** Self-supervised on massive text corpus. Next-token prediction. Trillions of tokens. Months on thousands of GPUs.
2. **Supervised fine-tuning (SFT).** Trained on high-quality human-written demonstrations of desired behaviour.
3. **Reinforcement learning from human feedback (RLHF).** Trained against reward model derived from human preferences. Or alternatives — DPO (Direct Preference Optimisation), Constitutional AI (Claude), and others.
4. **Specialised training.** Additional training for specific capabilities — reasoning, code, math, safety.

### Open vs closed weights

The LLM ecosystem includes:

**Closed-weight (proprietary).** GPT family (OpenAI), Claude (Anthropic), Gemini (Google). Best capabilities; access via API.

**Open-weight.** Llama (Meta), Mistral, Qwen (Alibaba), DeepSeek, Falcon, others. Downloadable; can be run locally or fine-tuned. Capabilities approaching proprietary for many tasks.

For Nepali enterprises, both options have roles. Closed-weight for highest capability; open-weight for cost control, customisation, data residency, or specific applications.

## 1.8 Generative AI model developments — GPT, BERT, DALL-E, diffusion, hybrid

### BERT and bidirectional encoders

*BERT (Bidirectional Encoder Representations from Transformers) is an encoder-only transformer model trained with masked language modelling and next-sentence prediction objectives, learning bidirectional context representations useful for downstream understanding tasks through fine-tuning.*

BERT (Google, 2018) approach:
- **Masked Language Modelling.** Random tokens masked; model predicts.
- **Next Sentence Prediction.** Pairs of sentences; predict if sequential.
- **Fine-tuning.** Pretrained BERT specialised to downstream task.

BERT family includes RoBERTa, DistilBERT, ALBERT, and many domain-specific variants.

### Image generation models

**DALL-E (OpenAI, 2021).** Text-to-image using GPT-style approach on image tokens.

**DALL-E 2 / 3.** Substantial quality improvements.

**Stable Diffusion (Stability AI, 2022).** Open-source latent diffusion model. Widely deployed and customised.

**Midjourney.** Commercial high-quality image generation.

**Imagen, Parti (Google).** Various Google image-generation efforts.

**Flux (Black Forest Labs, 2024).** High-quality open-weight image generation.

### Diffusion models

*A diffusion model is a generative model that learns to reverse a gradual noising process — starting from pure noise and iteratively denoising to produce a sample matching the training distribution — providing high-quality generation with stable training, dominant for image and increasingly other modalities.*

The process:

**Forward (training):** Gradually add noise to training images over many steps until they become pure noise. Model learns to predict the noise at each step.

**Reverse (generation):** Start with random noise; apply learned denoising iteratively; arrive at a sample.

Diffusion models have largely supplanted GANs for image generation due to better quality, more stable training, and easier conditioning.

### Other model categories

**Code models.** Codex (OpenAI), Code Llama (Meta), StarCoder, DeepSeek-Coder, Claude for code. Code generation, completion, review.

**Video models.** Sora (OpenAI), Veo (Google), Runway. Generating video from text descriptions.

**Audio models.** ElevenLabs for speech, Suno and Udio for music, OpenAI Voice Engine, various TTS.

**3D models.** Generating 3D assets — emerging but progressing.

**Multimodal models.** Models handling multiple modalities — text + image + audio inputs and outputs.

### Hybrid models for cybersecurity

Combinations relevant for security:

**GAN + VAE.** Sharper generation with structured latent space.

**Diffusion + LLM.** LLM generates structured plans; diffusion executes (image generation, robotic control).

**LLM + tools.** LLMs that invoke tools (web search, code execution, databases) extending capability beyond pure generation.

**Agent architectures.** LLMs as orchestrators of multi-step processes — relevant for both attackers and defenders.

**Retrieval-Augmented Generation (RAG).** LLM with access to external knowledge base. Reduces hallucination; enables current information.

For cybersecurity:
- Threat-intelligence summarisation with RAG.
- Code-vulnerability detection with code-specialised LLMs.
- Synthetic attack data generation through combined models.

### Frontier model landscape (2026)

As of early 2026:

**Closed frontier.** GPT-5 series (OpenAI), Claude 4 family (Anthropic), Gemini 2.x series (Google). Multimodal, reasoning-capable, increasingly agentic.

**Open frontier.** Llama 4 series (Meta), DeepSeek-V3/R1 (DeepSeek), Qwen 3 (Alibaba). Capabilities approaching closed frontier; orders of magnitude cheaper inference.

**Specialised models.** Code, biology, science, security all have specialised models.

**Cost trajectory.** Inference costs for given capability dropped roughly 10x annually through 2023-2025; continuing.

## 1.9 Interplay of AI and cybersecurity — benefits and risks

### Dual-use nature

Generative AI is a clear dual-use technology — the same capabilities enable both attack and defence.

### Benefits for defence

**Automated analysis.** LLMs process large volumes of logs, alerts, threat intelligence faster than human analysts.

**Code review.** Automated identification of security issues in code.

**Threat intelligence.** Summarisation and synthesis of threat reports, advisories.

**Detection engineering.** Generating detection rules and hunting queries.

**Incident response.** Drafting communications, runbooks, post-mortems.

**Vulnerability assessment.** Identifying potential vulnerabilities in code, configurations.

**Synthetic training data.** Generating data for ML-based detection systems where real malicious samples scarce.

**Security awareness.** Personalised, engaging security training content.

**Documentation.** Generating and maintaining security documentation.

### Benefits enable scale

A SOC analyst with LLM support can process more alerts. A penetration tester with LLM support can explore more attack paths. A security writer with LLM support can produce more content. The multiplier effect on defensive capacity is substantial — and the gap between defenders with and without AI-augmentation is widening.

### Risks from attack side

**Phishing at scale.** LLMs generate convincing personalised phishing at industrial scale. Discussed in Chapter 5.

**Vulnerability discovery.** Models can identify vulnerabilities in code at speed.

**Exploit development.** Models can assist with exploit development; degree of autonomy varies.

**Malware development.** LLMs can help write or modify malware; obfuscation, polymorphism. Discussed in Chapter 6.

**Reconnaissance.** Automated OSINT collection and analysis. Discussed in Chapter 2.

**Deepfakes.** Synthetic media for social engineering or fraud.

**Voice cloning.** Voice-cloning attacks on telephone-based authentication.

**Disinformation.** Generated text and media for influence operations.

**Prompt injection attacks on AI systems.** Discussed in Chapter 7.

### Risks from defender perspective

Even when used defensively, AI introduces risks:

**Hallucination.** Models confidently produce incorrect information; security decisions on hallucinated information dangerous.

**Sensitive data exposure.** Sending sensitive data to API-based models exposes it; risk of data leakage.

**Over-reliance.** Analysts may defer to AI judgement inappropriately.

**Skill erosion.** Reliance on AI tooling may atrophy underlying skills.

**Bias and unfairness.** Models inherit biases from training data.

**Lack of explainability.** AI decisions may not be readily explainable to auditors.

**Vendor concentration.** Reliance on a few model providers creates concentration risk.

### The defender-attacker dynamic

The race continues:

- **Defenders deploy AI** for detection, response, automation.
- **Attackers deploy AI** for reconnaissance, social engineering, malware.
- **Detection capability advances** with AI-driven analytics.
- **Evasion capability advances** with AI-driven obfuscation.

The historical pattern of cybersecurity arms race continues, with AI as the latest capability transforming both sides.

### Cybersecurity implications for Nepal

For Nepali enterprises:

**Attackers using AI.** Phishing in Nepali language at quality difficult before. Voice cloning targeting Nepali speakers. Personalised attacks against specific high-value targets.

**Defenders catching up.** Larger Nepali banks deploying AI-augmented SOC capabilities. Smaller institutions still relying on traditional tooling.

**Skill gap widening.** AI-skilled security professionals scarce; opportunity for trained MSc graduates substantial.

**Regulatory landscape.** Nepal Privacy Act and NRB directives apply but were not designed with AI in mind. Updates likely.

**Awareness gap.** General population and many enterprises underestimate AI-enabled threats.

The remaining chapters develop these themes — each chapter addressing a specific application of generative AI in cybersecurity, both as attack vector and as defensive capability, with the unifying perspective that the MSc graduate must understand both sides to be effective in either.

The next chapter addresses the reconnaissance phase — where attackers gather information about targets and defenders work to reduce what is exposed.
