---
title: 'Chapter 6 — Future Directions and Research Challenges in Network Intelligence'
sidebar_label: 'Ch 06 — Future Directions and Research Challenges in Network Intelligence'
sidebar_position: 6
description: 'Chapter 6 of Intelligent Networking (ENCTNS565).'
slug: /ioe/msncs/year-1-part-2/elective-i/intelligent-networking/notes/ch06
tags: [msncs, ENCTNS565, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The previous chapters covered specific intelligent-networking technologies — SDN, DCN, IBN, quantum networking — each with its own characteristic intelligence patterns. This chapter steps back to consider where the field is going. Several directions are clearly active: intelligent monitoring and automation expanding into AIOps and autonomous operations; self-X networks aspiring to autonomic operation; resource optimisation reframed as continuous machine-learning problems; load balancing and traffic engineering driven by predictive analytics; convergence patterns combining quantum, SDN, NDN, and IBN; blockchain for specific security and trust functions; and a longer list of open research challenges that the next decade will likely address. This chapter covers each direction with attention to research substance and practical horizon.

## 6.1 Intelligent network monitoring, automation and management

### Network monitoring evolution

Network monitoring has gone through several generations.

**First generation — polling.** SNMP-based polling at configured intervals. The dominant model from the 1990s through the 2010s. Adequate for slow-changing conditions; inadequate for high-resolution visibility.

**Second generation — flow analysis.** NetFlow, sFlow, IPFIX. Summary of traffic flows rather than per-packet detail; enabled traffic analysis at higher scale than packet capture.

**Third generation — streaming telemetry.** Devices push telemetry continuously to subscribers. Higher resolution, lower latency, structured data (often YANG models via gNMI). Modern devices support both SNMP polling and streaming telemetry.

**Fourth generation — observability.** The unified collection of metrics, logs, traces, and events with the ability to ask arbitrary questions of the resulting data. Borrows from application observability practices (Prometheus, Grafana, Jaeger, OpenTelemetry).

The progression has been from sparse sampling of pre-defined metrics toward dense, continuous, queryable telemetry of everything.

### AIOps

*AIOps (Artificial Intelligence for IT Operations) is the application of machine learning, statistical analysis, and other AI techniques to IT operations data — logs, metrics, traces, alerts, events — to automate detection of problems, identify root causes, predict future issues, and reduce the volume of human attention required for routine operations.*

The term emerged around 2016-2017 from Gartner. Adoption has accelerated through the 2020s as the volume of operational data has grown beyond practical human analysis.

**AIOps capabilities:**

**Anomaly detection.** Statistical or ML-based identification of unusual patterns in telemetry. Discussed in the ML and Data Analytics subject Chapter 6 and the Intelligence in SDN chapter; applied generally to network telemetry.

**Event correlation.** Multiple alerts and events correlated to identify common causes. Reduces alert volume; surfaces meaningful incidents.

**Root cause analysis.** Tracing observed symptoms back to underlying causes. Topology-aware analysis distinguishing primary causes from cascading effects.

**Predictive analytics.** Forecasting future state — capacity saturation, hardware failure probability, traffic peaks.

**Automated remediation.** Triggering predefined actions in response to recognised conditions. Restarts, failovers, scaling actions, network re-routing.

**Capacity planning.** Long-term modelling of resource trends and projections.

**Change impact analysis.** Predicting effects of proposed changes before implementation.

### AIOps platforms

Commercial offerings:

- **Dynatrace.** Full-stack observability with AI-driven analysis.
- **Datadog.** Comprehensive monitoring with Watchdog AI.
- **Splunk IT Service Intelligence.** Splunk's AIOps offering.
- **BigPanda.** Event correlation focus.
- **Moogsoft.** AIOps platform.
- **IBM AIOps (Watson AIOps).** Enterprise focus.
- **Cisco AppDynamics with Cisco Full-Stack Observability.** Application-network integration.
- **PagerDuty.** Incident management with AI features.

Open-source approaches use combinations:
- **Prometheus + Grafana + Alertmanager.** Foundation.
- **Elastic Stack with ML features.** Logs and metrics with anomaly detection.
- **OpenSearch.** Forked from Elasticsearch; similar capability.
- **Specific ML libraries.** Applied to operational data.

### Network automation maturity model

Various models exist describing the progression:

**Level 0 — Manual.** Humans perform all operations through CLI or GUI.

**Level 1 — Scripted.** Repetitive tasks automated through scripts (Python, Bash).

**Level 2 — Configuration management.** Tools like Ansible, Puppet, Chef apply consistent configurations.

**Level 3 — Orchestrated.** Workflows automate multi-step changes with dependencies and rollback.

**Level 4 — Intent-driven.** Operators specify desired state; system determines implementation (overlaps with IBN — Chapter 4).

**Level 5 — Autonomous.** System operates independently with minimal human oversight.

Most production networks in 2026 are at Level 2-3. Aspirations of Level 4-5 are widely discussed; achievement is partial and selective.

### Network management at Nepali scale

For Nepali operators (NTC, Ncell, major ISPs):

- **NTC.** Large-scale network management; tooling mix of vendor-provided (Huawei, ZTE, others) and custom development. Increasing investment in automation.
- **Ncell.** Similar pattern; vendor-driven with internal development.
- **Major ISPs** (WorldLink, Vianet, Subisu, Classic Tech, others). Tooling varies; modernisation through the 2020s.

The MSc graduate joining these operators will encounter management environments at varying maturity levels — some highly modern, some still based on long-established tools.

### Operational analytics in practice

A typical analytics use case at a Nepali ISP:

**Problem.** Subscriber complaints about evening slow speeds.

**Approach.**
1. Aggregate per-subscriber bandwidth, latency, packet-loss metrics over the past month.
2. Aggregate by node, by access concentrator, by area.
3. Cluster subscribers by experience pattern.
4. Identify the access concentrators or nodes showing degraded patterns.
5. Correlate with capacity utilisation, upstream link health, peering issues.

**Outcome.** Specific congestion bottleneck identified — say, an upstream peering link at NPIX saturating at evenings. Action: increase peering capacity or shift traffic to alternative path. The data-driven approach replaces guess-and-check operations.

## 6.2 Self-configuring, self-optimising and self-healing networks

### Self-X networks

The collective term for networks with autonomic properties — self-configuring, self-optimising, self-healing, self-protecting. The vision was articulated in the IBM Autonomic Computing initiative (2001) and revived in network contexts through SON (Self-Organising Network) work in mobile telecom.

**Self-configuring.** Networks that automatically configure new elements when added.

**Self-optimising.** Networks that continuously adjust parameters for optimal performance.

**Self-healing.** Networks that detect and recover from failures automatically.

**Self-protecting.** Networks that detect and respond to security threats automatically.

### Self-configuring

The vision: a new device, when added to the network, automatically receives its appropriate configuration without manual intervention.

**Approaches:**

**Zero-Touch Provisioning (ZTP).** A device boots, contacts a known server (via DHCP-provided URL or pre-configured), downloads its configuration, applies it. Widely deployed in modern enterprise switches and routers.

**SDN-based.** A new switch contacts the controller; the controller installs flow rules based on the switch's location and role.

**Cloud-managed.** Devices register with a cloud-management platform (Cisco Meraki, Aruba Central, others); the platform pushes configurations.

**Plug-and-play.** Strong in wireless — APs join a controller; configuration distributed automatically.

For Nepali operators deploying many access points across the country, ZTP and cloud-managed approaches are increasingly standard. The operational cost reduction is substantial.

### Self-optimising

Continuous adjustment of parameters in response to observed conditions.

**Mobile network examples:**

- **Coverage and capacity optimisation.** Antenna parameters (tilt, power, azimuth) adjusted based on coverage and traffic patterns. Manual in early generations; automated in modern.
- **Mobility load balancing.** Cell-to-cell handover thresholds adjusted to balance load.
- **Inter-cell interference coordination.** Frequency planning adjusted to reduce interference.

**Enterprise wireless:**

- **Channel and power assignment.** Continuously optimised based on observed interference.
- **Client steering.** Clients steered to less-loaded APs.

**SDN:**

- **Path optimisation.** Flow paths adjusted based on link utilisation.
- **Traffic engineering.** Continuous re-optimisation.

The ML angle: rather than static heuristics, ML models trained on operational data drive the optimisations.

### Self-healing

Automatic detection and response to failures.

**Examples:**

- **Failover automation.** When a primary path fails, traffic automatically shifts to backup. Standard with routing protocols, FHRPs (HSRP, VRRP), STP.
- **Component failure recovery.** Failed components automatically taken out of service; alarms generated.
- **Configuration rollback.** When a change causes problems, automatic rollback to last-known-good.
- **Predictive maintenance.** Failing hardware identified before failure; replaced proactively.
- **Automated remediation.** Restart services, clear queues, reset interfaces in response to detected conditions.

**Levels of self-healing:**

- **Reactive.** Respond after the failure occurs.
- **Proactive.** Respond to early indicators before failure.
- **Predictive.** Forecast failures and prevent them.

Predictive maintenance is an active ML application area — analysing logs, performance counters, environmental data to predict hardware failure with enough lead time to act.

### Self-protecting

Automatic threat detection and response. Covered substantially in the Intelligence in SDN chapter Section 2.10 (AI-driven security and anomaly detection) and elsewhere. Continues to be an active area.

### Challenges of self-X

The vision is decades old; the practical achievement has been partial.

**Why slow progress:**

- **Trust.** Operators reluctant to give autonomous systems broad control.
- **Failure modes.** Automated actions can cascade catastrophically.
- **Diversity.** Real networks have many vendors, generations, configurations; one autonomous approach rarely fits all.
- **Explainability.** When the system acts, operators need to understand why.
- **Edge cases.** Rare situations not in training data; autonomous actions can be wrong.

**Where self-X has succeeded:**

- **Well-bounded scope.** Specific optimisations rather than general operations.
- **Reversible actions.** Where actions can be rolled back easily.
- **Validation infrastructure.** Where the system can verify the action's effect.
- **Long observation periods.** Where the system has seen enough to be confident.

For Nepali context, self-X capability is most evident in cellular network infrastructure (which has incorporated SON for years) and emerging in cloud-managed enterprise networks. Custom autonomous operation in unique Nepali deployments remains limited.

## 6.3 Resource optimisation and scaling with ML algorithms

### Resource optimisation in networks

The continuous problem: allocate limited resources (bandwidth, compute, storage) to varying demands in a way that maximises some objective (throughput, fairness, cost-efficiency, performance).

**Optimisation problems in networking:**

- **Bandwidth allocation across users or applications.**
- **Path selection given multiple options.**
- **Server placement for content delivery.**
- **Capacity expansion decisions.**
- **Spectrum allocation in wireless.**
- **Energy management in mobile networks.**
- **Workload placement in cloud and edge.**

Traditional approaches use mathematical optimisation (linear programming, integer programming, convex optimisation) with explicit models. ML approaches learn from data, sometimes outperforming explicit models in complex realistic scenarios.

### Reinforcement learning for resource optimisation

RL is particularly suited to sequential resource allocation:

**Setup:**
- State: current resource utilisation, demand patterns, network conditions.
- Action: allocation decisions.
- Reward: performance metric, fairness metric, cost.

**Applications:**

- **Adaptive bandwidth allocation.** Allocate bandwidth across competing demands based on observed conditions.
- **DRL-based traffic engineering.** Deep RL for path selection in SDN.
- **Resource scheduling in cloud.** Workload-to-server assignment.
- **Cache management.** Discussed in DCN chapter Section 3.8.

### Deep learning for resource prediction

Predicting demand enables proactive resource allocation.

**Time-series models:** LSTM, GRU, Temporal Convolutional Networks (TCN), Transformers for sequence prediction.

**Applications:**
- **Traffic forecasting.** Per-link, per-application, per-customer.
- **Failure prediction.** From telemetry patterns.
- **Capacity planning.** Long-term demand projection.

### Scaling decisions

Cloud and SDN environments enable dynamic scaling — adding or removing capacity in response to demand. ML drives the decisions:

- **When to scale up.** Predicted load exceeding capacity threshold.
- **When to scale down.** Sustained low utilisation.
- **By how much.** Magnitude of expected demand.
- **Where to scale.** Geographic or topological placement.

**Auto-scaling examples:**

- **Cloud workloads.** AWS Auto Scaling, Azure Autoscale, GCP Autoscaler. Rule-based historically; ML-enhanced increasingly.
- **CDN scaling.** Content delivered from edges; automatic capacity adjustment.
- **5G core network scaling.** Network functions instantiated and torn down based on demand.

### Multi-objective optimisation

Real network optimisation rarely has a single objective. Common trade-offs:

- **Throughput vs latency.**
- **Cost vs performance.**
- **Coverage vs capacity.**
- **Energy vs performance.**
- **Reliability vs cost.**

Multi-objective ML approaches:
- **Pareto-front exploration.** Identifying solutions non-dominated by others.
- **Weighted combinations.** Combining objectives with weights.
- **Constrained optimisation.** Maximising one objective subject to constraints on others.

## 6.4 AI-based load balancing algorithms in SDN

### Load balancing fundamentals

*Load balancing is the practice of distributing traffic, computational work, or other load across multiple resources to optimise resource utilisation, maximise throughput, minimise response time, and avoid overloading any single resource.*

Traditional load balancing uses static algorithms:

- **Round-robin.** Each new request goes to the next server.
- **Least-connections.** New request goes to the server with fewest active connections.
- **Weighted variants.** Servers weighted by capacity.
- **Hash-based.** Connections to servers by hash of client IP (for session affinity).
- **Random.** Random selection.

These work adequately but don't adapt to varying server performance or traffic characteristics.

### AI-driven load balancing

Several ways AI improves load balancing:

**Performance-aware routing.** Load balancer measures actual server response times; routes to fastest-responding. Adaptive to changing conditions.

**Predictive routing.** ML model predicts which server will handle the request fastest based on request characteristics and current state.

**Application-aware routing.** Different request types routed differently based on which servers handle them best.

**Anomaly-aware.** Servers behaving abnormally automatically removed from rotation.

**Cost-aware (in cloud).** Routing balances performance with cost — using cheaper instances when adequate.

### Load balancing in SDN

SDN provides the visibility and control to implement AI-driven load balancing:

**Centralised view.** The SDN controller sees the global network state.

**Flow-level control.** Decisions made per-flow, not just per-server.

**Real-time adjustment.** Flow paths and server assignments adjusted as conditions change.

**Multi-path support.** Multiple paths used simultaneously where available.

### ECMP and beyond

**ECMP (Equal-Cost Multi-Path).** Standard routing-protocol mechanism distributing traffic across equal-cost paths. Hash-based; static.

**Adaptive routing.** Path selection based on observed conditions — congestion, latency. Implemented in some modern data-centre fabrics.

**Flowlet switching.** Bursts of traffic (flowlets) within a flow routed independently. Reduces ECMP's hash-based unevenness.

**AI-enhanced ECMP.** ML models adjusting weights or paths based on observed traffic patterns.

### Cloud load balancing

Major cloud providers offer AI-enhanced load balancing:

- **AWS Application Load Balancer.** Layer 7 with target health-based routing.
- **AWS Network Load Balancer.** Layer 4 high-performance.
- **AWS Global Accelerator.** Global anycast routing.
- **Azure Front Door.** Global Layer 7 with AI-driven path selection.
- **GCP Cloud Load Balancing.** Global with AI-driven optimisation.

These services increasingly use ML for traffic shaping, anomaly detection, and adaptive routing.

### Worked example — adaptive load balancing

A Nepali bank's internet banking service running on 6 application servers behind an SDN-controlled load balancer:

**Without AI:**
- Round-robin or least-connections.
- All servers treated equally.
- A slow server still receives equal traffic.

**With AI:**
- Per-server response-time monitoring.
- Server weights adjusted continuously based on observed performance.
- Slow servers receive fewer requests; quick recovery if they improve.
- Anomalous servers (errors, timeouts) removed automatically.
- Predicted load distributed across servers based on capacity model.

The result: better customer experience, faster recovery from server issues, more efficient resource use.

## 6.5 Dynamic traffic engineering and load balancing using AI

### Traffic engineering

*Traffic engineering is the discipline of controlling and optimising the flow of traffic across a network — selecting paths, allocating capacity, setting policies — to achieve operational objectives such as efficient resource use, performance guarantees, and resilience to failures.*

Traditional traffic engineering used:
- **MPLS-TE.** Constraint-based path computation.
- **Static QoS policies.** Pre-defined classes and queueing.
- **Manual path planning.** Operators designing primary and backup paths.

These work but require human attention and are slow to adapt.

### AI-driven traffic engineering

The AI angle:

**Predictive traffic forecasting.** Predicting demand by destination, application, time-of-day, day-of-week, special events. Drives proactive provisioning.

**Real-time path optimisation.** Paths re-computed continuously based on observed conditions. Modern SDN with continuous optimisation.

**Multi-criteria path selection.** Considering latency, throughput, cost, reliability simultaneously.

**Anomaly-driven adaptation.** Path selection changes in response to detected anomalies — degraded link performance, unusual traffic spikes, security incidents.

**Closed-loop optimisation.** Predictions → actions → observed outcomes → model refinement.

### Reinforcement learning for traffic engineering

Active research and increasing deployment.

**RL framing:**
- State: link utilisations, queue depths, traffic matrix, topology.
- Action: path selection or weight adjustment.
- Reward: throughput, latency, fairness, packet loss inverse.

Research has shown RL approaches can outperform classical algorithms in dynamic conditions, particularly when traffic patterns are non-stationary or unpredictable.

### Production deployments

Several network operators have deployed AI-driven traffic engineering:

- **Google's B4 backbone.** Software-driven; ML-enhanced traffic engineering for inter-data-centre traffic.
- **Facebook's Express Backbone.** Similar pattern; SDN-based with ML enhancement.
- **Microsoft's SWAN (Software-driven WAN).** Cloud-to-edge traffic engineering.
- **AWS Global Accelerator.** Anycast with intelligent path selection.

These are hyperscale examples. Enterprise and ISP deployments are following at smaller scale.

### Nepal context for traffic engineering

For Nepali ISPs and enterprises:

- **International transit.** Multiple paths to Indian transit providers; intelligent selection based on observed performance.
- **Peering optimisation.** NPIX peering vs transit decisions for specific destinations.
- **CDN traffic.** Steering customer traffic to nearest CDN edge.
- **Inter-branch WAN.** SD-WAN platforms with AI-driven path selection.

These applications are deployed at varying maturity. Major operators have invested in optimisation tooling; smaller operators rely on static configurations.

### Challenges

**Stability.** Continuous re-optimisation can oscillate. Hysteresis and dampening required.

**Convergence.** Time to react to changes balanced against stability.

**Visibility.** Effective traffic engineering needs comprehensive telemetry.

**Operator override.** When the AI is wrong, operators need clean intervention paths.

**Verification.** Was the AI-chosen path actually better than alternatives?

## 6.6 Quantum networking with SDN, NDN and IBN

The convergence of quantum networking with classical intelligent-networking paradigms is a research direction with substantial activity.

### Quantum SDN

The principle: apply software-defined networking concepts to quantum networks. Centralised control, programmable forwarding behaviour (subject to quantum constraints).

**Why quantum SDN:**

- Quantum networks need orchestration of entanglement resources.
- Routing decisions in quantum networks have complex quality dependencies.
- Mixed quantum-classical networks need unified management.
- Programmability supports research and experimentation.

**Architectural elements:**

- **Quantum data plane.** Quantum nodes capable of generating, manipulating, measuring quantum states.
- **Classical control plane.** Coordinates quantum operations; maintains state about entanglement resources.
- **Centralised quantum controller.** Analogous to SDN controller; orchestrates network-wide quantum operations.
- **Hybrid southbound interface.** Communicates with quantum and classical devices.

Active research at multiple universities and research labs. Practical deployment is early.

### Quantum NDN

Named Data Networking applied to quantum:

- Content-centric addressing for quantum data.
- Caching of quantum information (though limited by no-cloning).
- Named entanglement resources.

This is more research-conceptual than NDN classical. The no-cloning theorem makes quantum caching fundamentally different from classical content caching.

### Quantum IBN

Intent-based networking for quantum:

- Users specify intent ("I need a secure key between Kathmandu and Pokhara research labs with information-theoretic security").
- Intent translator selects QKD path, allocates resources, generates the key.
- Continuous verification.

The complexity of quantum resource management makes IBN attractive — users should not need to understand quantum-network engineering.

### Hybrid quantum-classical networks

Real near-term networks will be hybrid. The classical network handles most traffic; quantum capabilities used selectively for specific applications (QKD for key establishment; quantum sensing distribution; eventually distributed quantum computing).

**Integration considerations:**

- **Authentication.** Quantum and classical authentication mechanisms working together.
- **Key delivery.** Quantum-generated keys integrated into classical cryptographic infrastructure.
- **Failover.** When quantum capability is unavailable, classical fallback (with PQC).
- **Management.** Unified management of quantum and classical components.

For Nepal, the practical quantum-classical integration is many years off. Research-stage discussion at IOE Pulchowk and other institutions; no production deployment.

### Standardisation

Bodies working on standardisation:

- **IRTF QIRG (Quantum Internet Research Group).** Architecture and protocols.
- **ETSI Industry Specification Group on Quantum Key Distribution.** QKD-specific standards.
- **ITU-T.** Communication standards including quantum.
- **National standards bodies.** US NIST (PQC), various others.

Standardisation is in early stages. Operational deployment will accelerate as standards mature.

## 6.7 Blockchain for secure and decentralised networking

### Blockchain

Discussed in the Routing and Switching subject Chapter 6 from the assessment-of-deployment angle. Here the focus is on the specific applications to network security and intelligence.

### Decentralisation and trust

The fundamental property of blockchain — distributed trust without a central authority — applies to several networking challenges where centralised trust is awkward.

**Where decentralised trust matters in networking:**

- **Inter-domain trust.** BGP route validity, where currently RPKI uses centralised registry hierarchies.
- **IoT device identity.** Many devices, many vendors, no obvious single authority.
- **Network resource markets.** Spectrum, bandwidth, compute traded among multiple parties.
- **Multi-party network agreements.** SLAs verified without each party trusting the others' measurement.

### Applications

**BGP security.** Research has explored blockchain-based alternatives to RPKI for route origination verification.

**DNS alternatives.** Blockchain-based name resolution; Handshake, Namecoin, ENS (Ethereum Name Service). Limited adoption.

**Decentralised PKI.** Certificate transparency alternatives.

**IoT identity.** Device identity and reputation on blockchain.

**Network resource attestation.** Verifiable claims about network state.

**SLA monitoring.** Multi-party verification of service levels.

**Decentralised routing.** Routing decisions made by consensus rather than by individual ASes.

### Smart contracts for networks

Smart contracts — programmable logic executed on a blockchain — enable:

**Automated agreements.** Network providers contract with each other through code; payments and obligations execute automatically.

**Service marketplaces.** Bandwidth, compute, storage traded with smart-contract-enforced terms.

**Conditional access.** Resources granted based on smart-contract-verified conditions.

**Decentralised exchange of network functions.** VNFs traded and deployed via smart contracts.

### Cryptocurrencies and networking

Various blockchain projects have networking-relevant components:

**Helium.** Decentralised wireless network (LoRaWAN, 5G); contributors operate hotspots and earn tokens.

**Filecoin.** Decentralised storage; Network of providers storing data.

**Akash.** Decentralised cloud compute.

**Theta.** Decentralised video delivery.

**Nodle.** IoT connectivity network.

These have varying levels of operational success. Most demonstrate the model; few have achieved scale comparable to centralised alternatives.

### Assessment

Blockchain for networking remains largely research and pilot-stage. Critiques:

**Performance.** Consensus mechanisms slow.

**Energy.** Proof-of-work expensive; PoS reduces.

**Centralisation in practice.** Many blockchain deployments centralise around few entities.

**Real problem fit.** Many networking problems have effective centralised solutions; blockchain adds complexity without proportionate benefit.

**Operational complexity.** Running blockchain infrastructure is non-trivial.

For Nepali context:

- **Pilots in non-networking domains.** Land records, certificate verification, supply chain.
- **Limited networking application.** No significant deployment.
- **Academic interest.** Research at IOE Pulchowk and TU.

The MSc student should view blockchain in networking as a research direction worth understanding but not as imminent production technology.

## 6.8 Emerging trends and open research challenges

The chapter — and the subject — closes with consideration of the open research challenges and emerging trends defining the next decade.

### Emerging trends in intelligent networking

**AI-native network design.** Networks designed from the start to incorporate AI rather than retrofitting AI to networks designed for classical operation.

**Large Language Models in networking operations.** LLM-driven operations tooling — natural-language interaction with networks, automated generation of configurations, troubleshooting assistance. Early but rapidly evolving.

**6G and beyond.** Research-stage; will incorporate AI at architectural level.

**Quantum networking maturation.** Slow but steady progress from research to early deployment.

**Edge AI.** ML inference at the network edge for low-latency applications.

**Federated learning across networks.** Training ML models without centralising data.

**Sustainable networking.** Energy efficiency as primary design criterion; renewable energy integration.

**Network digital twins.** Comprehensive simulation of networks for what-if analysis and operations.

**Programmable data planes.** P4-based programmable forwarding pushing intelligence into hardware.

**Zero Trust beyond perimeter.** Identity-based access everywhere; continuous verification.

### Open research challenges

**Explainable AI for networking.** When models make decisions, operators need to understand why.

**Robustness of ML in adversarial conditions.** Adversaries can manipulate ML inputs; defending against this is active research.

**Generalisation across networks.** Models trained on one network don't always work on another.

**Continual learning.** Models that learn continuously without catastrophic forgetting.

**Privacy-preserving ML.** Training on data without exposing data.

**Real-time decisions at scale.** Some decisions need millisecond timing; ML inference may not fit.

**Verification of intent translation in IBN.** Confidence that the implemented network matches the intent.

**Quantum-classical integration.** Practical hybrid network architectures.

**Cross-layer optimisation.** Working across protocol stack rather than within layers.

**Cooperative AI in multi-domain environments.** Different operators' AI systems interacting.

**Energy efficiency.** Both ML compute and network operations.

**Standardisation of intent languages.** Common languages for expressing network intent.

**Operational acceptance.** What does it take for operators to trust AI-driven systems for critical operations?

### Implications for Nepal

For Nepali context:

- **NTC, Ncell** as major operators: incremental adoption of AI-enabled tooling from vendors.
- **Major banks and enterprises:** following with somewhat slower adoption.
- **Research institutions** (IOE Pulchowk, TU): research opportunities in applying intelligent-networking techniques to Nepali contexts.
- **NREN:** experimental deployments; potential testbed for new approaches.
- **Skills gap:** few specialists; significant career opportunity for trained MSc graduates.
- **Local startups:** several opportunities in specialised intelligent-networking applications.

### Research directions for MSc projects

Specific topics suitable for MSc-level research in Nepali context:

**Applied:**
- AI-driven anomaly detection for Nepali ISP networks (with operator collaboration).
- ML-based capacity planning for Nepali university networks.
- SDN-based traffic optimisation for Nepali bank inter-branch traffic.
- Predictive maintenance for telecom infrastructure.

**Conceptual:**
- IBN for South Asian regulatory environments.
- Quantum networking architectures suited to small developing countries.
- Decentralised approaches for cross-border telecom in South Asia.

**Practical:**
- Cost-effective AI tooling for resource-constrained operators.
- Operational maturity models for AI adoption in operations.
- Educational and training approaches.

Many such projects are feasible with available infrastructure (simulators, open-source platforms, NREN testbeds) and produce both academic and practical value.

### Skills the MSc graduate needs

A summary of the cross-cutting skills:

**Technical foundations.**
- Networking fundamentals (this and other subjects).
- Machine learning and AI (ENCTNS551).
- Statistics and probability.
- Programming (Python, perhaps Go for newer cloud-native systems).

**Specific technologies.**
- SDN (controllers, OpenFlow, P4).
- Major cloud platforms.
- Containers and Kubernetes.
- Open-source ML frameworks (TensorFlow, PyTorch).
- Network simulators (ns-3, Mininet).
- Telemetry tools (Prometheus, Grafana).

**Operational skills.**
- Network operations experience (even at lab scale).
- Configuration management (Ansible).
- Version control (Git).
- CI/CD basics.
- Observability practices.

**Soft skills.**
- Reading and synthesising research papers.
- Writing clear technical documentation.
- Communicating with operators and management.
- Collaboration with multidisciplinary teams.

### The discipline going forward

Intelligent networking is not a finished field — it is one that will continue evolving rapidly through the late 2020s and into the 2030s. The MSc graduate completing this subject enters at an active and exciting moment. The fundamentals covered through this subject and the broader programme — networking, security, ML, research methods, operations — combine into the foundation on which a career in intelligent networking can be built. Specific technologies (SDN controllers, ML frameworks, quantum platforms) will change; the underlying disciplines of system thinking, data-driven decision-making, careful engineering, and continuous learning persist.

The Nepali context offers particular opportunities. The country's network infrastructure is at an interesting development stage — substantial deployment underway, much modernisation needed, room for AI-enabled efficiency gains, an emerging research and startup ecosystem. The graduate who develops both deep technical skills and operational sensibility, who can bridge research and practice, who can communicate across disciplines, will find both interesting work and substantial impact possible.

The syllabus ends here. The practice continues.
