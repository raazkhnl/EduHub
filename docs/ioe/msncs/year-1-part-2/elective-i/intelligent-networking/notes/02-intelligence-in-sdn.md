---
title: 'Chapter 2 — Intelligence in SDN'
sidebar_label: 'Ch 02 — Intelligence in SDN'
sidebar_position: 2
description: 'Chapter 2 of Intelligent Networking (ENCTNS565).'
slug: /ioe/msncs/year-1-part-2/elective-i/intelligent-networking/notes/ch02
tags: [msncs, ENCTNS565, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Software-Defined Networking provides the substrate on which most intelligent-networking research and deployment has been built. The architectural separation of control and data planes, the centralised controller with a complete view, the programmable interfaces — these are exactly the conditions ML-driven decision-making needs. This chapter is the longest in the subject because SDN+intelligence is where the field has accumulated the most depth. It covers the SDN architecture as foundation, the specific advantages of adding intelligence to SDN, adaptive QoS and QoE management, deep learning for traffic prediction and classification, intelligent NFV and VNF placement, the design of AI-powered SDN controllers, data-driven decision making, integration with cloud and edge architectures, AI-driven security in SDN, and anomaly detection and behavioural analysis in SDN environments.

## 2.1 Overview of SDN architecture

### SDN

*Software-Defined Networking is an architectural approach to networking that separates the control plane (which makes decisions about traffic forwarding) from the data plane (which executes the forwarding), centralising control-plane logic in a software controller that programmatically configures distributed forwarding devices, enabling automation, dynamic adaptation, and integration with broader software systems.*

The SDN concept emerged from research at Stanford and Berkeley in the mid-2000s; OpenFlow (2008) became the canonical southbound protocol; commercial deployment expanded through the 2010s; SDN principles are now mainstream in data centre and increasingly in wide-area networks.

### SDN architecture layers

The classical four-layer model:

**Application layer.** Network applications — security, traffic engineering, analytics, monitoring. Applications express network requirements to the controller.

**Control layer.** SDN controller(s). Makes decisions; configures the data plane.

**Data layer.** Forwarding devices — switches, routers, virtual switches, white-box hardware.

**Management layer.** Operations and orchestration tools. Sometimes shown separately, sometimes folded into applications.

### Interfaces

**Southbound interface (SBI).** Controller-to-device protocol.
- **OpenFlow.** The original SDN southbound protocol; manages forwarding rules.
- **NETCONF / YANG.** Configuration management; widely used for non-pure-SDN.
- **gNMI / gRPC.** Modern streaming telemetry and configuration.
- **OVSDB.** For Open vSwitch configuration.
- **Vendor APIs.** Cisco NX-API, Juniper Junos APIs, others.

**Northbound interface (NBI).** Application-to-controller API. Typically REST or gRPC. Less standardised than southbound.

**East-west interfaces.** Controller-to-controller for distributed deployments.

### SDN controllers

Major controllers:

**OpenDaylight (ODL).** Linux Foundation project. Modular, broad protocol support. Widely used in research and some production.

**ONOS.** Originated for service provider needs. Strong in carrier deployments.

**Ryu.** Python-based; popular for research and education.

**Floodlight.** Java-based; one of the earliest production-ready OpenFlow controllers.

**Cisco APIC.** ACI fabric controller.

**Cisco DNA Center / Catalyst Center.** Campus / enterprise SDN.

**VMware NSX.** Network virtualisation for VMware environments.

**Faucet.** Production-grade OpenFlow controller.

For research and academic exploration (relevant for IOE Pulchowk MSc work), Ryu and ONOS are popular starting points. Mininet provides a virtual network for testing.

### SDN deployment patterns

**Pure SDN.** OpenFlow throughout; centralised control of all forwarding. Realised in some data-centre deployments and research environments; less common in mixed enterprise.

**Hybrid SDN.** SDN coexists with traditional distributed routing. SDN handles policy; traditional protocols handle basic reachability. Most enterprise SDN.

**Overlay SDN.** Virtual networks overlaid on physical fabric. VMware NSX, Cisco ACI in part. The physical fabric is conventional; the overlay is SDN-managed.

**Underlay SDN.** Physical fabric itself SDN-managed.

**API-driven networking.** Devices expose APIs; orchestration platforms drive them. Without strict control/data-plane separation but with centralised-control benefits.

### Why SDN suits intelligence

SDN's properties align with what ML needs:

- **Centralised view.** Controller sees the entire network state. Global optimisation becomes possible.
- **Programmable control.** Decisions can be changed in real time.
- **Telemetry collection.** Controllers naturally collect operational data.
- **API surface.** ML systems can read state and write actions through APIs.
- **Software-defined.** New decision-making logic deployed without hardware changes.

Without SDN, ML in networking is mostly observation — it can recommend but cannot easily act. With SDN, ML can close the loop and apply learned policies.

## 2.2 Advantages of integrating intelligence in SDN

The combination of SDN and intelligence brings several specific advantages.

### Adaptive operations

Networks change behaviour based on observed conditions:

- Traffic patterns shift; the controller reallocates capacity.
- A degraded link is detected; traffic rerouted before users notice.
- An attack is identified; defensive policies activated automatically.

Without intelligence, SDN gives the operator powerful tools to make changes manually. With intelligence, the network makes many changes itself.

### Optimisation at scale

A large network has too many decisions for humans to optimise:
- Which path for each flow.
- Which cache location for each content item.
- Which server for each new workload.
- Which security level for each session.

ML can make these decisions per-flow, per-item, per-session in ways human operators cannot match.

### Predictive operations

ML models predict future state — capacity exhaustion, link failures, demand surges. Predictions enable proactive action rather than reactive scrambling.

### Personalised services

Different users and applications get different network treatment. The intelligent SDN can apply nuanced policy based on observed user/application characteristics rather than coarse classes.

### Reduced operator workload

Routine decisions automated. Operators focus on exceptional situations and strategic concerns. The 24/7 NOC of a Nepali telecom or bank can shift from constant manual response to oversight and intervention as needed.

### Faster response

Machine decisions execute in milliseconds; human decisions take minutes to hours. For some scenarios (DDoS response, traffic engineering during failures), the speed difference is decisive.

### Continuous learning

The network gets better at its tasks over time. Models retrained on accumulating data; policies refined based on observed outcomes.

### Quantified benefits

In well-instrumented studies, intelligent SDN has demonstrated:

- 20-40% reduction in mean time to detect network anomalies.
- 30-50% reduction in mean time to repair.
- 10-25% capacity utilisation improvement through traffic engineering.
- 20-50% cache hit improvement through ML-driven caching.
- 50-90% reduction in routine operator tickets through automation.

Actual benefits depend on environment and implementation.

## 2.3 Adaptive QoS and QoE management in SDN

### QoS and QoE

*Quality of Service (QoS) refers to the technical mechanisms in a network for prioritising and allocating resources among traffic flows — bandwidth guarantees, latency bounds, packet loss limits — implemented through queuing, scheduling, marking, and policing.*

*Quality of Experience (QoE) refers to the user's actual perceived quality of using a service — how well the video plays, how responsive the application feels, how clear the voice call sounds — combining objective network metrics with subjective user perception and application behaviour.*

QoS is the mechanism; QoE is the outcome. Good QoS supports good QoE but the mapping is not one-to-one.

### Traditional QoS

The classical approach:
- **Classification.** Identify traffic by type (voice, video, data, control).
- **Marking.** Apply DSCP or other markings.
- **Queuing.** Multiple queues per port with different priorities.
- **Scheduling.** Algorithm determines which queue gets served when.
- **Policing.** Enforce rate limits.

Configurations are static — set up by network engineers based on expected traffic profiles. Adaptation to changing conditions requires manual reconfiguration.

### SDN-enabled adaptive QoS

With SDN, the controller can dynamically:
- Re-classify traffic based on current observations.
- Adjust queue allocations.
- Reroute traffic to less-congested paths.
- Activate alternative resources (additional capacity, alternate providers).

The decisions can be guided by ML:
- **Demand prediction.** Anticipating peak periods.
- **Application classification.** Identifying flows that need specific treatment.
- **Congestion avoidance.** Detecting incipient congestion and redirecting.
- **Path quality monitoring.** Selecting paths based on observed performance.

### QoE-driven optimisation

Moving from "ensure 5 Mbps bandwidth" to "ensure the user has a good video experience" requires QoE models. ML-based QoE models predict user experience from network metrics:

- **Inputs.** Throughput, latency, jitter, packet loss, application type, device type.
- **Outputs.** Predicted QoE score (often 1-5 MOS scale).

When QoE prediction degrades, the SDN takes action. When QoE is fine, the SDN can release resources for other uses.

### Use cases

**Video streaming.** A bank's training video platform delivers content to branches. SDN+ML monitors QoE; reallocates bandwidth or selects alternative CDN paths when QoE degrades.

**VoIP.** Voice calls receive priority routing dynamically based on current network conditions.

**Cloud applications.** SaaS performance monitored end-to-end; routing changes when degradation observed.

**Mobile networks.** Cellular SDN+ML adjusts base-station parameters per-user to optimise individual QoE.

For Nepali context, mobile operators (NTC, Ncell) deploy QoE optimisation as part of vendor-provided RAN platforms. Enterprise SDN+QoE deployments are less common but growing.

## 2.4 Deep learning applications in SDN for traffic prediction and classification

### Traffic prediction

The task: given historical traffic, predict future traffic. Used for:
- Capacity planning.
- Dynamic resource allocation.
- Anticipating congestion.
- Forecasting peak periods.

### Deep learning architectures for traffic prediction

**Recurrent Neural Networks (RNNs).** Process sequential data with memory of past inputs. Vanilla RNNs have vanishing-gradient issues for long sequences.

**LSTM (Long Short-Term Memory).**
*LSTM is a type of recurrent neural network architecture that incorporates explicit memory cells with input, forget, and output gates, enabling effective learning of long-term dependencies in sequential data without the vanishing-gradient problem of vanilla RNNs.*

LSTMs are well-suited for traffic prediction. The model takes historical traffic time series as input and predicts future values. Variations include:
- **Single-step prediction.** Predict the next time step.
- **Multi-step prediction.** Predict several steps ahead.
- **Multivariate prediction.** Predict multiple correlated time series.

**GRU (Gated Recurrent Unit).** Simpler than LSTM with comparable performance for many tasks.

**Transformers.**
*A transformer is a deep learning architecture based on attention mechanisms that processes sequences in parallel rather than sequentially, achieving state-of-the-art performance on many sequence tasks including translation, time-series forecasting, and increasingly in networking applications.*

Transformers have largely replaced RNNs in many sequence tasks. Time-series transformers (Informer, Autoformer, FEDformer) achieve strong results for traffic prediction.

**1D Convolutional Neural Networks.** Apply convolutions over time. Faster to train than RNNs; competitive performance for some tasks.

**Hybrid architectures.** CNN + LSTM, transformer + CNN. Combine strengths.

### Traffic classification

The task: given flow characteristics, classify the application or category.

**Traditional approach.** Port-based (port 80 = HTTP, port 443 = HTTPS). Fast but degraded by port misuse, dynamic ports, encrypted protocols, application diversity on same ports.

**DPI (Deep Packet Inspection).** Examine packet payloads for known patterns. Effective for unencrypted; ineffective for encrypted.

**ML-based classification.** Use flow features that don't require payload visibility:
- Packet size distribution.
- Inter-arrival time distribution.
- Flow duration.
- Direction.
- Burstiness.
- TCP behaviour.

**Deep learning for classification.**

**1D CNN on packet sequences.** Treat packet sizes as a 1D sequence; convolve over time. The model learns features automatically.

**LSTM on packet sequences.** Process packets sequentially; classify after some number of packets.

**Transformer-based.** Attention over packets.

**Image-based encoding.** Convert flow features to images (e.g., 2D matrices of packet sizes and timings); use 2D CNN. Surprisingly effective.

**Common datasets** for research:
- **ISCX VPN-nonVPN.** Different application types over and not over VPN.
- **CICIDS2017.** Network traffic with attack labels.
- **UNSW-NB15.** Modern attack and benign traffic.
- **MAWI** archives. Real Internet traffic samples.

### Practical considerations

**Encrypted traffic.** Most modern traffic is encrypted. Classification must work on metadata, not content. The ML approaches mentioned above all work on metadata.

**Real-time vs offline.** Real-time classification requires features computable from early flow observations. Some approaches need many packets before classifying; for QoS-style use cases, faster classification is needed.

**Concept drift.** Traffic patterns change over time as new applications emerge. Models need retraining.

**Privacy.** Classification on metadata is less privacy-invasive than DPI but can still reveal sensitive information.

### Example application

A Nepali ISP deploys an LSTM-based traffic predictor:
- Collects 5-minute traffic samples from each backbone link for 6 months.
- Trains an LSTM to predict traffic 1 hour ahead.
- Predictions used to pre-position capacity and to predict when manual intervention may be needed.

Combined with classification (XGBoost on flow features), the system identifies:
- Which traffic is growing fastest (drives capacity planning).
- Which traffic is suddenly anomalous (triggers investigation).
- Which paths are over-utilised (drives traffic engineering).

## 2.5 Intelligent NFV and Virtual Network Function (VNF) placement

### NFV recap

*Network Function Virtualization is the architectural approach of running network functions — firewalls, routers, load balancers, IDS, WAN optimisers — as software (Virtual Network Functions) on standard servers, replacing dedicated network appliances with general-purpose hardware running virtualised functions.*

NFV decouples network functions from specialised hardware. Functions become deployable workloads — like applications in the cloud.

### VNF placement problem

When NFV is deployed at scale, the question becomes: where to run each function?

Considerations:
- **Capacity.** Each VNF needs CPU, memory, storage.
- **Latency.** Some VNFs must be close to specific endpoints for performance.
- **Reliability.** Multiple instances for redundancy.
- **Cost.** Compute cost varies by location (edge sites vs central data centres).
- **Energy.** Some sites are more efficient than others.
- **Policy.** Regulatory or organisational requirements about where data is processed.

Choosing placement is an optimisation problem — multi-objective, with many constraints. Classical optimisation (integer programming) can solve small instances; ML approaches scale better.

### ML approaches to VNF placement

**Reinforcement learning.** The agent decides placement; the environment provides feedback (performance metrics, cost). Over time the agent learns placement policies.

**Graph neural networks.** Network topology and traffic patterns represented as graphs; GNN learns placement decisions.

**Heuristic-guided ML.** Combine ML predictions with heuristic optimisation.

**Online learning.** Decisions made in real time; learning incorporated continuously.

### Service Function Chaining

*Service Function Chaining is the practice of routing traffic through an ordered sequence of network functions — firewall, then IDS, then load balancer, then application — implemented in NFV environments by directing traffic through specific VNF instances in a specific order.*

SFC placement adds further complexity:
- Functions must be in the right order.
- Latency budget for the whole chain.
- Backup paths if individual VNFs fail.
- Sharing of common functions across chains.

ML approaches address SFC placement and routing jointly.

### Practical deployment

For Nepali enterprises:
- **Telecoms** deploy NFV extensively for core network functions. Placement decisions for VNFs across vEPC and IMS infrastructure are typically vendor-driven (Ericsson, Huawei, Nokia) with some operator customisation.
- **Enterprises** less commonly deploy NFV at scale; specific use cases (virtual firewalls, virtual load balancers) are deployed.
- **Cloud providers** make all the VNF-placement decisions internally; customers consume the services.

### Auto-scaling

A related ML application: deciding when to scale VNF instances up or down based on predicted demand. ML predictions inform scaling actions before demand actually arrives, avoiding the latency of reactive scaling.

## 2.6 Design and architecture of AI-powered SDN controllers

### AI-powered SDN controller

An SDN controller that incorporates AI/ML capabilities for decision-making, either as built-in functions or as integrations with external ML systems.

### Architectural patterns

**Embedded ML.** ML models integrated into the controller. Controller makes ML-informed decisions directly.

**External ML service.** Controller calls out to an ML platform for decisions. Decouples the ML lifecycle from controller lifecycle.

**Streaming pipeline.** Telemetry streamed from controller to ML processing; decisions streamed back. Real-time data plane and ML separated by message bus.

**Hybrid.** Routine decisions ML-driven; complex decisions go to external services; human escalation for exceptions.

### Reference architecture for an AI-powered SDN controller

A typical layered design:

**Data collection layer.** Telemetry from data plane devices, flow records, application metrics, external context (calendar, threat intelligence).

**Data processing layer.** Stream processing (Kafka, Flink) for real-time; batch processing for historical analysis.

**Feature engineering layer.** Transform raw data into features useful for ML.

**Model serving layer.** Trained ML models making predictions/decisions. Multiple models for different tasks.

**Decision layer.** Combines model outputs with policy constraints; selects actions.

**Action layer.** Translates decisions into device configurations; pushes to data plane.

**Feedback layer.** Observes outcomes; provides training data for model improvement.

**Management layer.** Operator oversight; model lifecycle management; explainability tools.

### Specific intelligence functions

Functions an AI-powered controller might provide:

- **Traffic classification.** Per-flow application identification.
- **Anomaly detection.** Identifying unusual patterns.
- **Capacity prediction.** Forecasting future load.
- **Path optimisation.** Selecting best paths based on current conditions.
- **Failure prediction.** Anticipating device or link failures.
- **Security policy adaptation.** Adjusting policy based on threat conditions.
- **QoS / QoE optimisation.** As covered above.
- **Energy optimisation.** Powering down underused resources.

### Commercial AI-powered SDN platforms

- **Cisco DNA Center (Catalyst Center).** AI/ML for campus networks — assurance, encrypted traffic analytics, AI endpoint analytics.
- **Juniper Mist AI.** AI-driven wireless networking; expanded to wired and SD-WAN.
- **Cisco ACI with AppDynamics integration.** ML-driven application performance for data centre.
- **HPE Aruba ESP with AIOps.** Aruba Central provides ML capabilities.
- **VMware vRealize Network Insight.** ML-driven analytics for VMware environments.
- **Open-source.** Various projects combining ONOS or OpenDaylight with ML frameworks.

### Design challenges

Building AI-powered SDN controllers involves:

- **Latency budget.** Decisions for some tasks must execute in milliseconds.
- **Reliability.** ML failures must not crash the controller or destabilise the network.
- **Explainability.** Operators need to understand why decisions were made.
- **Safety.** ML decisions must not violate critical constraints.
- **Adversarial robustness.** Attackers may try to manipulate the ML.
- **Continuous learning.** Models must adapt without forgetting.
- **Multi-objective trade-offs.** Different stakeholders want different optimisations.

## 2.7 Data-driven decision making in SDN environments

### Data-driven decision making

The general approach: decisions based on data analysis rather than predefined rules or human judgement alone.

### What data is available

SDN environments produce abundant data:

- **Flow telemetry.** NetFlow, IPFIX, sFlow from every flow.
- **Device telemetry.** Per-device metrics — interface utilisation, CPU, memory, errors.
- **Streaming telemetry.** Modern push-based real-time data from devices (gNMI, Cisco Model-Driven Telemetry).
- **Logs.** Device logs, controller logs, application logs.
- **External data.** Topology, configuration, change records, calendar, threat intelligence.
- **Application metrics.** APM tools providing application-side perspectives.

### Decision categories

Based on data, decisions can be made about:

- **Routing.** Path selection, traffic engineering.
- **Resource allocation.** Bandwidth, QoS classes.
- **Security.** Block, throttle, alert.
- **Capacity.** Scale up, scale down, provision more.
- **Configuration.** Optimise device or service settings.
- **Maintenance.** When to update, when to replace.

### Decision frameworks

**Rule-based.** Decisions follow predefined rules. Simple; transparent; doesn't adapt.

**Statistical.** Decisions based on statistical analysis of data.

**ML-based.** Decisions based on ML predictions or policies. Adaptable; less transparent.

**Hybrid.** ML provides recommendations; rules constrain; humans confirm critical decisions.

### Closed-loop operations

The aspirational pattern:

1. Observe state.
2. Decide action.
3. Apply action.
4. Observe outcome.
5. Update decision logic based on outcome.
6. Return to 1.

For routine, low-risk decisions, the loop runs autonomously. For higher-risk decisions, the loop includes human oversight.

### Practical considerations

**Data quality.** Decisions inherit the quality of their data.

**Latency.** Time from observation to decision to action matters.

**Reliability.** What happens when data is missing or stale.

**Stability.** Decisions must not oscillate (the network constantly reacting to its own previous reactions).

**Cost.** Each decision and action has a cost; not every condition warrants action.

### Example workflow

A Nepali ISP's SDN-based traffic engineering:

1. Telemetry streams from all backbone routers.
2. ML model predicts traffic across all links 30 minutes ahead.
3. Optimisation determines path adjustments that would reduce expected congestion.
4. Controller pushes path adjustments to routers.
5. Performance observed; outcomes inform future predictions and optimisations.
6. If congestion exceeds thresholds anyway, alerts to NOC for investigation.

Without ML, the optimiser would have less foresight. Without SDN, the actions would require manual configuration. The combination delivers value neither alone could.

## 2.8 Integration of SDN with cloud and edge computing architectures

### Cloud connectivity

SDN enables flexible connectivity between enterprise networks and cloud:

**Cloud VPN.** SDN controllers manage IPsec VPN tunnels to cloud providers.

**Direct interconnect.** SDN controls dedicated connections (AWS Direct Connect, Azure ExpressRoute, GCP Cloud Interconnect).

**Multi-cloud.** Single SDN platform managing connectivity to multiple clouds.

**SD-WAN.** SDN extended over the WAN; cloud is one of the destinations.

### Edge computing

*Edge computing is the deployment of compute and storage resources close to the network edge — at branch offices, telecom operator sites, customer premises — rather than only in central data centres, reducing latency and bandwidth consumption for applications that benefit from local processing.*

SDN+edge integration:

- **Centralised orchestration.** SDN controller orchestrates edge sites from central location.
- **Distributed enforcement.** Policies enforced locally at edge.
- **Dynamic placement.** Workloads moved between edge and central based on conditions.
- **ML-informed.** Decisions about where to place workloads informed by ML predictions.

### MEC

*Multi-access Edge Computing is the cellular-specific edge computing model, with compute resources located in or near the mobile network's base stations or aggregation points, providing very low-latency processing for applications that interact with mobile users.*

For Nepali context, NTC and Ncell have explored MEC capabilities tied to 4G/5G rollout. Specific commercial MEC services in Nepal are limited as of 2026.

### Use cases for integrated SDN+cloud+edge

**Adaptive workload placement.** A workload runs at the edge during peak periods (latency-sensitive); migrates to cloud during off-peak (cost-efficient).

**Multi-tier inference.** ML inference happens at the edge for latency; training happens in cloud where data and compute are abundant.

**Disaster recovery.** When a primary edge site fails, traffic redirected to cloud or to another edge.

**Content distribution.** CDN-style content placement decided by ML based on observed access patterns.

### Architecture pattern

A typical Nepali enterprise integrated architecture in 2026:

- **HQ data centre.** Core enterprise applications and data.
- **Cloud.** Specific workloads (analytics, customer-facing, dev/test).
- **Branch edge sites.** Local compute for low-latency operations.
- **Mobile/remote users.** Connecting through SD-WAN or ZTNA.

The SDN platform orchestrates connectivity and security across all of these. ML informs decisions about traffic steering, workload placement, security policy.

## 2.9 AI-driven network security in SDN

### Security advantages of SDN

SDN's centralised control supports security in specific ways:
- **Global visibility.** Controller sees the whole network.
- **Rapid response.** Policy changes apply network-wide in seconds.
- **Granular control.** Per-flow policies possible.
- **Automation.** Responses to detected threats can be automated.

### AI/ML applications in SDN security

**Anomaly detection.** Identify unusual traffic patterns (Section 2.10).

**Attack classification.** Identify attack types from observations.

**DDoS detection and mitigation.** Identify volumetric attacks; respond by traffic-engineering away from victims, applying scrubbing, blackholing sources.

**Threat hunting.** Find evidence of compromise across telemetry.

**User and entity behaviour analytics (UEBA).** Identify users or hosts behaving unusually.

**Adaptive policy.** Security policies adjust based on observed risk.

### Specific SDN+ML security workflows

**DDoS mitigation:**
1. ML detects abnormal traffic spike to specific destination.
2. SDN controller automatically applies rate limits.
3. Source addresses identified; if mostly spoofed/distributed, blackholed at edge.
4. Customer notified.
5. If attack subsides, controls relaxed.

**Lateral movement detection:**
1. ML monitors east-west traffic between hosts.
2. Unusual access patterns identified (host A normally talks to B; suddenly talking to C, D, E).
3. SDN controller adjusts internal segmentation rules to constrain.
4. SOC analyst investigates.

**Phishing-related detection:**
1. ML correlates email gateway alerts with subsequent network activity.
2. If user who clicked phishing link starts unusual outbound activity, the SDN+ML pipeline triggers containment.

### Commercial deployments

Major SDN+ML security platforms:
- **Cisco Secure Network Analytics (formerly Stealthwatch).** ML-based threat detection from network telemetry.
- **Darktrace.** AI-driven security across networks.
- **Vectra Networks.** ML-based attack detection.
- **ExtraHop Reveal(x).** Network detection and response.

For Nepali banks, deployment is at varying maturity. Major banks have deployed network-detection-and-response platforms; mid-tier and smaller organisations rely on simpler IDS/IPS.

## 2.10 Anomaly detection and behavioural analysis in SDN environments

### Anomaly detection

*Anomaly detection in network context is the identification of patterns, events, or behaviours that deviate significantly from expected normal patterns, used for security (detecting attacks and compromise) and operations (detecting faults and degradation).*

### What to monitor for anomalies

**Per-flow.** Individual flows behaving unusually.

**Per-host.** Hosts with unusual traffic patterns.

**Per-user.** Users acting differently than usual.

**Per-link.** Links carrying unusual traffic volumes.

**Per-application.** Applications behaving differently.

**Network-wide.** Patterns across the whole network.

### ML approaches

Reviewed in Chapter 1; specific application to SDN:

**Statistical baselines.** Mean and standard deviation of metrics; alert on outliers. Simple but effective for many cases.

**Isolation forests.** Identify points easily separated from others.

**Autoencoders.** Train on normal traffic; reconstruction error indicates anomaly.

**Variational autoencoders.** Improved version with probabilistic modelling.

**One-class SVM.** Define a boundary around normal points.

**Time-series anomaly detection.** Detect unusual sequences (LSTM-based, Prophet-based, others).

**Graph-based.** Network as a graph; anomalies as unusual graph structures.

### Behavioural analysis

Behavioural analysis goes beyond detecting individual anomalies to understanding patterns:

- **What is normal for this entity?** Build profile.
- **How is the current behaviour different from normal?** Compute distance.
- **Is the difference suspicious or just unusual?** Apply context.
- **What action, if any?** Score-driven response.

### UEBA in SDN

UEBA platforms (commercial: Exabeam, Securonix, Microsoft Sentinel UEBA, Splunk UBA) ingest data from many sources including SDN telemetry. The combination of network observations with identity, application, and endpoint data enables high-confidence detection.

### Practical example

A Nepali commercial bank's SDN+ML deployment:

- **Telemetry collection.** From all data centre switches, branch routers, perimeter firewalls.
- **Feature engineering.** Per-host features (bytes in/out, connections per hour, unique destinations).
- **Baseline learning.** 30-day rolling baseline of normal patterns.
- **Real-time scoring.** Each host scored against baseline every 5 minutes.
- **Alert generation.** Hosts with elevated scores investigated by analysts.

The deployment catches:
- A workstation suddenly initiating thousands of connections (potential malware).
- A server with unusual outbound traffic at unusual time (potential exfiltration).
- A user account accessing systems they normally don't (potential compromise or insider).

Combined with EDR and traditional SIEM, the ML-driven network observations are one valuable signal in a multi-source detection fabric. Each signal alone is imperfect; the combination yields high-confidence detection that would be impossible with any single source.

The next chapter takes the intelligent-networking direction in a different architectural direction — Data Centric Networking, where the unit of communication is named content rather than addressed hosts.
