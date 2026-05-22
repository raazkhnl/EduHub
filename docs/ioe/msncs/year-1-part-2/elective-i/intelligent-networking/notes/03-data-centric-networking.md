---
title: 'Chapter 3 — Data Centric Networking'
sidebar_label: 'Ch 03 — Data Centric Networking'
sidebar_position: 3
description: 'Chapter 3 of Intelligent Networking (ENCTNS565).'
slug: /ioe/msncs/year-1-part-2/elective-i/intelligent-networking/notes/ch03
tags: [msncs, ENCTNS565, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The internet's foundational architecture is host-centric. To get content, a client opens a connection to a specific host at a specific IP address. The host then sends the content. This worked when networking was about reaching specific computers; it fits awkwardly when the goal is to get specific content regardless of where it lives. Data Centric Networking proposes a different model — the network speaks in terms of named content, not addressed hosts. Clients ask for a name; the network returns the content from wherever it can most efficiently. This chapter covers DCN concepts and architectural alternatives, the contrast with host-centric networking, the specific Named Data Networking architecture, benefits and challenges, and the substantial body of AI/ML work applying intelligence to caching, content discovery, routing, and secure distribution in DCN environments.

## 3.1 Overview and concepts of DCN

### Data Centric Networking

*Data Centric Networking is a network architectural paradigm in which the fundamental unit of communication is named data rather than addressed endpoints, with applications requesting content by name and the network returning the content from wherever it can be most efficiently served, decoupling content identity from network location.*

The DCN umbrella includes several specific architectures:

**Information-Centric Networking (ICN).** The most-used umbrella term.

**Content-Centric Networking (CCN).** PARC's original architecture (2009).

**Named Data Networking (NDN).** The architecture that evolved from CCN; subject of US National Science Foundation Future Internet Architecture programme.

**NetInf.** European 4WARD and SAIL projects.

**PURSUIT / Publish-Subscribe Internet Routing Paradigm.** EU FP7 project.

**MobilityFirst.** Another US FIA project.

In practice, NDN is the most-studied and most-implemented; the other architectures share principles. The terms ICN, CCN, NDN are sometimes used interchangeably in the literature; precise authors distinguish.

### Motivation

Several observations drove DCN research:

**Most internet traffic is content distribution.** Video, web pages, software updates, social media — content that users consume from wherever it can be efficiently delivered. The host-centric "fetch from specific server" pattern is awkward for this.

**Mobility breaks host-centric.** When users move between networks, their IP addresses change. Connection-oriented host-centric protocols struggle. Content-naming is location-independent.

**IoT generates many small data items.** Sensor readings, events. The overhead of host-centric session setup is disproportionate.

**Caching is everywhere already.** CDNs, browser caches, ISP caches. The internet effectively does content-based delivery; the architecture just doesn't acknowledge it.

**Multi-source content.** Content available from many sources; choosing the best is awkward in host-centric models.

### Core concepts

**Names.** Content identified by hierarchical names, similar to URIs. Example: `/bbc.com/news/world/asia/2026/05/article-12345`.

**Content objects.** Pieces of named content. Cryptographically signed by publisher.

**Interests.** Requests for named content.

**Data.** The content returned in response to interests.

**Forwarding by name.** Routers forward interests based on name prefixes, not IP addresses.

**In-network caching.** Routers cache content as it passes; subsequent interests for the same content satisfied from cache.

### Key contrast

In host-centric:
```
Client → DNS lookup → Get IP → TCP handshake → HTTP request → Response
```
The whole process targets a specific server.

In DCN:
```
Client → Send interest for /content/path → Network forwards by name → Any caching node responds
```
The request targets content; the network finds it.

## 3.2 Host-centric vs data-centric networking

### Detailed comparison

| Aspect | Host-centric (current IP) | Data-centric (DCN) |
|---|---|---|
| Communication unit | Packet between hosts | Named data |
| Naming | IP addresses | Content names |
| Addressing | Endpoint addresses | Content identifiers |
| Routing | By address | By name prefix |
| Session model | Connection-oriented (mostly) | Request-response per data unit |
| Caching | At endpoints and explicit middleboxes | Pervasive in network |
| Security | Channel-based (TLS) | Object-based (per-content signature) |
| Mobility | Address change disrupts | Names location-independent |
| Multipath | Single path per session typical | Natural multi-source |
| Multicast | Special configuration | Inherent |

### When data-centric helps

DCN's advantages are pronounced for:

- **Popular content distribution.** Many users requesting the same content. Caching dramatically reduces upstream traffic.
- **Mobile users.** Names don't change as users move.
- **IoT.** Data items naturally addressable.
- **Multi-source.** Content available from multiple locations; network picks best.
- **DTN (Delay-Tolerant Networks).** Asynchronous data delivery.

### Where host-centric still works better

- **Interactive sessions.** Bidirectional, low-latency communication (voice, gaming) fits less naturally.
- **Personalised content.** Per-user content less cacheable.
- **Encrypted point-to-point.** Some security models prefer the channel approach.
- **Legacy.** All existing infrastructure is host-centric.

### Why DCN hasn't replaced IP

Despite years of research, DCN deployment has remained limited:

- **Inertia.** The internet is enormous; replacing the foundational architecture is hard.
- **Incremental benefit.** CDNs deliver many of the same benefits within host-centric framework.
- **Security and naming complexity.** Cryptographically-signed objects, naming schemes, key management.
- **Routing scale.** Routing by name prefix at internet scale is unproven.
- **Trust models.** Establishing trust in content publishers is harder than trusting servers.

In 2026, DCN is research and some specialised deployment. It is not the future internet that some early proponents predicted. It contributes ideas that have been absorbed into other architectures (HTTP/2 push, HTTP caching, CDN evolution).

## 3.3 Architectural concepts of Named Data Networking (NDN)

### NDN

*Named Data Networking is a specific Information-Centric Networking architecture that replaces the IP layer with a name-based forwarding layer, using hierarchical names for content, in-network caching at every node, per-object signatures for security, and a stateful forwarding plane that tracks pending interests.*

NDN was conceived by Van Jacobson and colleagues at PARC (then CCNx, evolved to NDN). The NDN project is a multi-university US research effort with active reference implementation.

### NDN node architecture

An NDN router (or node) maintains three data structures:

**Content Store (CS).** Cache of content objects. Content passing through is cached for potential future requests. Replacement policy (LRU, LFU, others) when cache is full.

**Pending Interest Table (PIT).** Pending requests. Each entry: name requested, incoming interface(s). When data arrives, the PIT entry identifies where to forward it. When an interest for the same name arrives while a request is pending, the second incoming interface is added to the entry (interest aggregation).

**Forwarding Information Base (FIB).** Routing table for forwarding interests. Indexed by name prefix; entries point to outgoing interfaces.

### NDN packet types

**Interest.** Request for content. Contains the name. Travels from requester toward publishers.

**Data.** Content. Contains name, content, signature, signing key information. Travels back along the path the interest took.

### Forwarding process

When an interest arrives:

1. **Check Content Store.** If the named content is cached, return immediately (no further forwarding).
2. **Check PIT.** If a pending interest exists, add this incoming interface to it (interest aggregation).
3. **Check FIB.** Look up next hop by name prefix; forward the interest; create a PIT entry.

When data arrives:

1. **Check PIT.** If no matching entry, drop the data (unsolicited).
2. **Forward to all interfaces in PIT entry.** Multiple requesters can be satisfied by one response.
3. **Cache in Content Store.** For potential future use.
4. **Remove PIT entry.**

### NDN naming

Names are hierarchical, like file paths or URIs:
```
/com/example/videos/movies/sample.mp4/segment0
/ndn/sensors/temperature/kathmandu/airport/2026-05-21T14:30
```

The hierarchy supports:
- Longest-prefix matching in FIB.
- Producer authority delegation.
- Application-defined structure.

### NDN security

Content is signed by the producer. Consumers verify signatures using the publisher's public key. Trust models include:
- **Hierarchical PKI** for naming hierarchy.
- **Web of trust.**
- **Application-specific** trust models.

No need for channel security (TLS) — each content object is self-securing.

### NDN-specific challenges

- **Naming.** What names should things have? Application-defined; standardisation difficult.
- **Routing.** Scaling name-prefix routing to internet size.
- **Caching.** Strategies for what to cache; balancing storage and benefit.
- **Trust.** Public key infrastructure for content publishers.
- **Privacy.** Names reveal what users want; caching reveals what populations consume.

## 3.4 Benefits and challenges of DCN

### Benefits

**Efficient content distribution.** Popular content cached throughout the network. Repeat requests don't traverse far.

**Bandwidth savings.** Particularly significant for repetitive content (popular videos, software updates).

**Improved availability.** Multiple cached copies make content available even when origin is unreachable.

**Better mobility.** Content names are stable as users move; sessions less disrupted.

**Multicast naturally supported.** Multiple requesters of the same content satisfied by single response.

**Built-in security at object level.** Each content piece authenticated regardless of how it was obtained.

**Reduced server load.** Origins serve fewer requests because of pervasive caching.

**Improved resilience.** Distributed caches survive individual failures.

### Challenges

**Architectural complexity.** New routing models, new forwarding semantics, new failure modes.

**Naming.** Designing name schemes that work across applications and scale.

**Routing scale.** Name-prefix routing at internet scale is a research challenge. There are far more potential content names than IP prefixes.

**Key management.** Each content publisher needs keys; verifying signatures requires obtaining keys.

**Cache management.** Caching everything is impossible; strategies matter.

**Privacy.** Caching reveals consumption patterns. Names may reveal user intent.

**Trust models.** Who publishes what, who trusts whom, how is it established and revoked.

**Deployment.** Coexistence with IP infrastructure; transition path.

**Standardisation.** Multiple alternative architectures; no single standard.

**Operations.** Operating DCN networks requires new tools and expertise.

**Economic models.** Who pays for caching capacity; how is value distributed.

### Practical deployment

Where DCN concepts are actually deployed:

- **CDNs** apply DCN-like principles within host-centric architecture.
- **IoT pilots** using NDN for sensor networks.
- **Academic networks** running NDN testbeds.
- **Specific application contexts** — content delivery for specific apps.

Major commercial deployment as an internet replacement has not happened. The concepts continue to inform networking research and selected production use.

### Nepal context

NDN-specific deployment in Nepal:
- **Academic research** at IOE Pulchowk and other universities. Several MSc theses each year explore DCN/NDN.
- **No production NDN deployment** to speak of.
- **CDN-like patterns** widely deployed by ISPs and large web properties.

## 3.5 Applications of AI in DCN

DCN provides an interesting substrate for ML. The decisions are different from host-centric networking, and ML has substantial role.

### Decision categories where ML helps

**What to cache.** Limited cache space; which content to retain.

**What to evict.** When cache full; what to remove.

**Where to cache.** Multiple cache locations; which to use.

**How long to cache.** Time-to-live decisions per content.

**What names to assign.** Naming schemes that support efficient operation.

**How to route.** Selecting paths for interests.

**Authentication and access control.** Who is allowed to access what.

### Why ML suits DCN

DCN produces rich data:
- Interest patterns over time and across nodes.
- Cache hit/miss statistics.
- Content access patterns.
- Network topology changes.
- Content popularity dynamics.

The decisions are amenable to learning:
- Patterns recur.
- Optimal decisions depend on multiple variables.
- Performance can be measured (cache hit rate, latency, bandwidth saved).
- Sequential decisions (caching now affects future requests).

### Specific ML applications in DCN

**Content popularity prediction.** Forecasting which content will be popular soon. Informs caching decisions.

**Cache placement.** Distributing content across multiple cache locations.

**Cache replacement.** What to evict when space is needed.

**Interest forwarding.** Path selection for interests.

**Anomaly detection.** Unusual access patterns signaling problems or attacks.

**Content classification.** Categorising content for differential treatment.

The next sections cover specific applications in more detail.

## 3.6 AI-based cache placement and replacement techniques

### Cache placement

The decision: given a content object and a network of cache locations, where should it be cached?

### Static placement strategies

The baselines:

**Cache everywhere.** Every node caches everything it sees. Simple but wasteful.

**Cache on hit.** Only cache content that is requested again.

**Probabilistic caching.** Cache with some probability based on content properties.

**Edge-only caching.** Cache only at the network edge, not in the core.

### ML-based placement

**Popularity-aware caching.** Cache items predicted to be popular. ML predicts popularity from past patterns, content metadata, time, location.

**Locality-aware caching.** Cache items requested by nearby users. ML learns user-location to content-interest mappings.

**Cost-aware caching.** Caching has cost (storage, energy); benefit is cache hits. ML balances based on predicted hit rates.

**Multi-objective caching.** Optimising for hit rate, freshness, fairness, energy simultaneously. ML can navigate the trade-offs.

### Reinforcement learning for cache placement

RL fits caching naturally:

- **State.** Current cache content; recent access patterns; network conditions.
- **Action.** Cache the new item or not; if caching, what to evict.
- **Reward.** Cache hits over a time horizon.

Algorithms used:
- Q-learning for simple scenarios.
- Deep Q-Networks (DQN) for larger state spaces.
- Policy gradient methods.
- Actor-critic methods.

### Cache replacement

The decision: when cache is full and new content arrives, what to evict?

### Traditional policies

**LRU (Least Recently Used).** Evict the item not requested for the longest time.

**LFU (Least Frequently Used).** Evict the item requested the fewest times.

**FIFO (First In First Out).** Evict the oldest item.

**TTL-based.** Evict items past their time-to-live.

### ML-based replacement

**Predictive eviction.** Evict items predicted to have low future demand. ML models predict future access for each cached item.

**Cost-aware eviction.** Evict items whose re-fetch cost is low. Items hard to re-fetch are kept longer.

**Multi-criteria eviction.** Combining recency, frequency, predicted future use, fetch cost, freshness.

### Example: Belady's algorithm and ML approximation

*Belady's algorithm is the theoretically-optimal cache-replacement strategy that evicts the item that will be needed furthest in the future, requiring perfect knowledge of future access — implementable as an upper bound for analysis but not in practice.*

ML approaches try to approximate Belady's algorithm by predicting future access. The closer the approximation, the better cache hit rate.

### Practical results

Studies report ML-based caching achieving 10-50% improvement in cache hit rate over traditional policies, depending on workload characteristics. Improvements are largest for workloads with predictable popularity patterns.

### Deployment considerations

- **Online inference.** Decisions must be fast (caches are hot paths).
- **Model size.** Small enough to run at cache nodes.
- **Training data.** Continuously collected from operational caches.
- **Stability.** Avoid thrashing where cache contents oscillate.

## 3.7 AI-based content naming and discovery techniques

### Naming challenges in DCN

Naming is fundamental to DCN. Names must be:

- **Unique.** Different content gets different names.
- **Hierarchical.** Supporting prefix-based routing.
- **Meaningful.** Useful for applications.
- **Stable.** Names persist over time.
- **Scalable.** Supporting massive numbers of names.

### ML for content naming

**Semantic name generation.** ML can generate descriptive hierarchical names from content. NLP techniques process content; produce structured names.

**Name normalisation.** Different applications may name similar content differently; ML can normalise to canonical forms.

**Synonym handling.** Multiple names for the same content; ML identifies equivalences.

### Content discovery

Given a name (or a description), find the content. Two related problems:

**Name-based discovery.** Discover available names matching some pattern.

**Semantic discovery.** Discover content matching a description or query, even when names don't directly match.

### ML for discovery

**Query understanding.** NLP interprets user queries to identify content categories.

**Name expansion.** A query is expanded to include related names.

**Recommendation.** Suggest related content the user might want.

**Embedding-based search.** Both queries and content represented in shared embedding space; search by similarity.

### Application example

A DCN-based video distribution system in a Nepali university:
- Content: lecture videos, with names like `/iope.tu.edu.np/lectures/networking/2026/lecture-12.mp4`.
- ML for naming: automatically tagging lectures with topics, courses, levels.
- ML for discovery: students search "intelligent networking lecture"; the system suggests relevant content names.
- ML for caching: lectures predicted to be popular before exam periods cached prominently.

The integration of multiple ML capabilities makes the system more usable than naive name-matching would.

## 3.8 Dynamic content caching using reinforcement learning

### Reinforcement learning for caching

Caching is a sequential decision problem — current decisions affect future state. RL is natural fit.

### Problem formulation

**State space.** What the agent observes.
- Current cache contents.
- Recent request history.
- Content metadata.
- Time/seasonality.
- Network conditions.

**Action space.** What the agent decides.
- Whether to cache an incoming item.
- Which item to evict if cache full.
- Prefetch decisions.
- TTL settings.

**Reward.** Performance metric.
- Cache hit rate (immediate).
- Latency reduction.
- Bandwidth saved.
- User satisfaction.

**Policy.** Mapping from states to actions.

### RL algorithm selection

**Q-learning.** Classic tabular method. Works for small state spaces.

**Deep Q-Networks (DQN).** Neural network approximates Q-function. Scales to larger state spaces.

**Policy gradient (REINFORCE, A2C, A3C).** Directly optimise policy.

**Proximal Policy Optimisation (PPO).** Stable; widely-used.

**Actor-critic methods.** Combine value and policy learning.

### Training challenges

**Sample efficiency.** RL often requires many interactions. Production caching cannot tolerate excessive exploration.

**Reward design.** Defining reward to actually align with operational goals.

**Stability.** Training and deployment stability.

**Cold start.** New cache locations have no history.

### Approaches to challenges

**Pretraining on simulator.** Train in a simulated environment with historical data; deploy trained policy.

**Conservative exploration.** Limit exploration to bounded perturbations of known-good policies.

**Transfer learning.** Apply policy learned in one environment to another similar one.

**Hybrid policies.** Use ML where confident; fall back to heuristic otherwise.

### Published results

The research literature shows DRL-based caching achieving:
- 20-50% improvement in cache hit rate over LRU in various scenarios.
- Better adaptation to changing workload characteristics.
- Improved performance on long-tail content distributions.

Operational deployment in production caches is less common; most production systems still use traditional policies with some heuristic enhancement.

## 3.9 AI-driven name-based routing protocols

### Name-based routing

DCN routes interests by content name rather than destination address.

### Routing approaches

**Flooding.** Broadcast interests; whoever has the content responds. Simple; doesn't scale.

**Hierarchical routing.** Name hierarchy maps to network hierarchy.

**Content discovery infrastructure.** Separate system maps names to locations.

**Distributed hash tables.** Names hashed to specific responsible nodes.

**Hybrid approaches.** Combinations of above.

### ML in name-based routing

**Path selection.** When multiple paths exist, ML selects best based on predicted performance.

**Anycast resolution.** Multiple copies; ML selects which to fetch from.

**Topology adaptation.** Routing adapts to topology and load changes.

**Failure prediction.** Anticipating link/node failures; rerouting in advance.

### Reinforcement learning for routing

The agent makes routing decisions per interest:
- **State.** Network topology, current load, content location, request pattern.
- **Action.** Which path to forward the interest along.
- **Reward.** Response time, hit rate, network utilisation.

Multi-agent RL where each router is an agent has been explored.

### Practical considerations

Name-based routing at internet scale remains an open challenge:

- **Routing table size.** Names are far more numerous than IP prefixes.
- **Convergence.** Updates to routing tables must propagate.
- **Hierarchy.** Name hierarchies must align with network hierarchy for efficiency.

Research deployments work at modest scale; internet-scale name routing is unresolved.

## 3.10 Secure content distribution and access control with AI

### Security in DCN

DCN security differs fundamentally from host-centric:

- **Per-object security.** Each content piece signed and optionally encrypted.
- **No channel security needed.** Content secure regardless of how transported.
- **Content-level authorisation.** Access controls per content.

### Challenges

**Trust models.** Establishing trust in content publishers.

**Key distribution.** Public keys for many publishers.

**Revocation.** Notifying about compromised content or keys.

**Access control.** Restricting who can access what.

**Privacy.** Names and access patterns reveal information.

### ML for content security

**Anomaly detection.** Unusual access patterns may indicate attack or compromise.

**Reputation scoring.** ML-based reputation for content publishers, names, paths.

**Access pattern analysis.** Identifying unauthorised access attempts.

**Content classification.** Categorising content for differential security treatment.

### Specific applications

**Phishing detection.** Identifying malicious content masquerading as legitimate.

**Misinformation detection.** Flagging content with suspicious patterns or claims.

**Insider threat.** Identifying users with unusual content access patterns.

**Compromised content.** Identifying content that has been tampered with.

### Encrypted content names

In some DCN designs, names themselves are encrypted to protect privacy. Trade-off: limits caching benefits because nodes cannot identify duplicates.

ML on encrypted names is an active research area — pattern analysis without decryption.

### Access control with ML

**Adaptive access control.** Access policies that adapt based on observed user behaviour, context, risk signals.

**Zero-trust for DCN.** Continuous verification rather than one-time authentication.

**ABAC (Attribute-Based Access Control).** Decisions based on attributes; ML can predict appropriate attribute combinations.

### Practical example

A DCN-based healthcare data sharing system:
- Patient records as named content.
- Hierarchical naming: `/hospital/department/patient-id/record-type/timestamp`.
- Per-record access control.
- ML detects unusual access (large bulk access, off-hours access, access by users not normally involved).
- Suspicious access triggers additional verification.

The combination of architectural privacy (data-centric naming with access control) and ML-based monitoring provides stronger protection than either alone.

### Open research

Secure DCN with ML remains active research:

- **Verifiable computation.** Proving computations on content without exposing it.
- **Privacy-preserving caching.** Caching that doesn't reveal access patterns.
- **Differential privacy for ML.** ML models that don't leak training data.
- **Federated learning for DCN.** Collaborative ML without centralised data collection.

For the MSc student interested in research, DCN+AI security is a productive direction with many open problems and modest amounts of existing literature to build on. The next chapter shifts to Intent-Based Networking — a different but complementary direction in intelligent networking that has seen more commercial adoption than DCN.
