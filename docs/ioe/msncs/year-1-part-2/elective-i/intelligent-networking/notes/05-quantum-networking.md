---
title: 'Chapter 5 — Quantum Networking'
sidebar_label: 'Ch 05 — Quantum Networking'
sidebar_position: 5
description: 'Chapter 5 of Intelligent Networking (ENCTNS565).'
slug: /ioe/msncs/year-1-part-2/elective-i/intelligent-networking/notes/ch05
tags: [msncs, ENCTNS565, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

The networking technologies covered so far are extensions or refinements of classical packet networking. Quantum networking is something different — a new physical foundation for communication that exploits properties of quantum mechanics impossible in classical systems. The capabilities are correspondingly different: information-theoretically secure key distribution that is provably immune to eavesdropping (rather than just cryptographically hard); communication channels whose properties cannot exist in classical networks; the prospect of distributed quantum computing connecting quantum computers through quantum channels. This chapter covers the evolution from classical to quantum networking, the contrast between them, applications, the quantum primitives (qubits, superposition, entanglement) underlying everything, the QKD and teleportation protocols, layered quantum-network architecture, repeaters and entanglement distribution, security vulnerabilities, and the emerging quantum-AI intersection for traffic analysis.

## 5.1 Evolution from classical to quantum networking

### Classical networking foundations

Classical networking is built on bits — 0 or 1 — represented physically as voltages, light pulses, radio waves, magnetic states. Bits can be copied freely, observed without disturbance, and combined arbitrarily. These properties seem so obvious they're rarely questioned, but they are specific to classical physics.

### Quantum mechanics differs

Quantum mechanics provides different fundamental rules:

- **Superposition.** A quantum system can be in a combination of states.
- **Entanglement.** Quantum systems can be correlated in ways classical systems cannot.
- **Measurement disturbs.** Observing a quantum state changes it.
- **No-cloning.** An unknown quantum state cannot be copied perfectly.

These properties enable new communication capabilities — and constrain others.

### Historical evolution

**1980s.** Theoretical foundations laid. Bennett and Brassard's BB84 protocol (1984) demonstrates quantum key distribution.

**1990s.** First experimental QKD demonstrations. Quantum teleportation theoretically proposed (1993) and demonstrated experimentally (1997).

**2000s.** Commercial QKD products emerge. ID Quantique (Switzerland, founded 2001) commercialises QKD. MagiQ Technologies similar. Distance limits demonstrated.

**2010s.** Larger-scale demonstrations. Metropolitan QKD networks (Tokyo QKD Network, Vienna SECOQC). Chinese satellite-based QKD (Micius satellite, 2016).

**2020s.** Continuing expansion. Multiple operational QKD networks. Quantum-secure communications products from multiple vendors. National quantum-network research programmes in many countries.

**Late 2020s and beyond.** Anticipated. Quantum repeaters become practical. Quantum internet research. Distributed quantum computing.

### Why quantum networking now

Several drivers:

- **Cryptographic threat.** Post-quantum cryptography (PQC) addresses one quantum threat (Shor's algorithm breaking RSA/ECC); QKD provides a complementary approach.
- **National strategic interest.** Major economies investing in quantum capability.
- **Commercial maturation.** QKD products commercially viable for specific use cases.
- **Scientific progress.** Quantum computing advances necessitate quantum communication.

For Nepal in 2026, quantum networking remains predominantly research interest. No operational deployment to speak of; academic interest at IOE Pulchowk and other research institutions.

## 5.2 Classical vs quantum networks

### Comparison

| Aspect | Classical | Quantum |
|---|---|---|
| Information unit | Bit (0 or 1) | Qubit (superposition possible) |
| Copying | Free | Forbidden (no-cloning theorem) |
| Observation | Non-disturbing | Disturbs the state |
| Channel | Wire, fibre, radio | Quantum channel (typically photons in fibre or free space) |
| Distance | Unlimited (with amplification) | Limited (~100-200 km direct in fibre) |
| Repeaters | Standard amplifiers | Quantum repeaters needed (research) |
| Bandwidth | Gbps to Tbps | Currently Mbps key generation |
| Cost per bit | Very low | High |
| Maturity | Mature (50+ years commercial) | Emerging (10-20 years commercial) |
| Use cases | All communication | Specific (QKD, distributed quantum compute) |

### Co-existence

Quantum networks do not replace classical networks. They complement:

- **Quantum channels** carry quantum information.
- **Classical channels** still needed for classical communication, including the classical communications that accompany many quantum protocols.
- **Hybrid systems** combining classical and quantum capabilities.

A QKD-enabled link, for example, uses:
- A quantum channel (typically dedicated fibre or free-space) for quantum communication.
- A classical channel (typically internet) for the classical communications portion of the QKD protocol.
- Classical encryption (symmetric, with keys established by QKD) for the actual data.

### Physical implementation

**Photons.** The dominant quantum information carrier for communications. Specific properties:
- **Polarisation.** Horizontal, vertical, diagonal.
- **Phase.** Relative phase between time bins.
- **Frequency.** Specific wavelengths.

**Atoms, ions, NV centres.** Used for quantum memory and processing; less for direct communication.

**Superconducting circuits.** Used for quantum computing; not directly for transmission.

## 5.3 Applications and benefits of quantum networking

### QKD-based security

The most-developed application:

- Provably secure key exchange (under physical-law assumptions, not computational assumptions).
- Long-term confidentiality assured even against future quantum computers.
- Detection of eavesdropping.

### Distributed quantum computing

Future vision: quantum computers connected by quantum networks, allowing distributed computation across separated nodes. Practical at small scale; large-scale distributed quantum computing remains research.

### Quantum sensor networks

Networks of quantum sensors (gravimeters, magnetometers, clocks) connected by quantum channels for coordinated high-precision measurement. Applications in earthquake detection, navigation, fundamental physics. Relevant for Nepal given high seismic activity.

### Quantum-enhanced classical communication

Some quantum techniques enhance classical communication:

- **Quantum-enhanced clock synchronisation.** Higher precision than classical methods.
- **Quantum-enhanced positioning.** Improved GPS-like services.
- **Quantum random number generation.** True random numbers (not pseudorandom) used in classical cryptography.

### Benefits over classical alternatives

**For QKD specifically:**

- **Information-theoretic security.** Security based on physics, not computational hardness.
- **Future-proof.** Quantum computers don't break QKD (they might enable certain QKD-specific attacks but the underlying security model holds).
- **Detection of eavesdropping.** Any eavesdropping leaves detectable traces.

**For distributed quantum computing:**

- **Capability not available classically.** Some computations infeasible classically become feasible.

### Practical limitations

Currently:

- **Cost.** Quantum networking equipment is expensive.
- **Distance.** Direct quantum links limited to ~100-200 km.
- **Throughput.** QKD typically establishes keys at modest rates (kbps to Mbps).
- **Infrastructure.** Often requires dedicated fibre (not shared with classical traffic).
- **Standardisation.** Limited; vendor-specific implementations dominate.
- **Operational expertise.** Scarce skill set.

### Nepal context

For Nepali context, quantum networking is academic interest predominantly. Limited research infrastructure. Major networking concerns remain classical. The cryptographic dimension (post-quantum cryptography) is more immediately relevant than quantum networking infrastructure.

That said, the field is one where the MSc student with strong mathematical and physics background can position for international research opportunities and emerging commercial relevance.

## 5.4 Qubits, superposition, and entanglement

### Qubit

*A qubit (quantum bit) is the fundamental unit of quantum information, representing a quantum system that can exist in a superposition of two basis states (typically labelled |0⟩ and |1⟩), and that can be measured to yield one of the two classical states with probabilities determined by the quantum state.*

A classical bit is either 0 or 1. A qubit can be written as:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where $\alpha$ and $\beta$ are complex amplitudes with $|\alpha|^2 + |\beta|^2 = 1$.

When measured in the standard basis, the qubit yields:
- Result 0 with probability $|\alpha|^2$.
- Result 1 with probability $|\beta|^2$.

After measurement, the qubit collapses to the measured state.

### Physical realisations

Various physical systems implement qubits:

- **Photon polarisation.** Horizontal = |0⟩; vertical = |1⟩; diagonal = superposition.
- **Photon time-bin.** Photon in early or late time bin.
- **Photon phase.** Relative phase between two paths.
- **Trapped ions, atoms.** Internal energy levels.
- **Superconducting circuits.** Used in quantum computers; less in communications.
- **Nitrogen-vacancy centres in diamond.** Solid-state spin systems.
- **Spin in quantum dots.**

For networking, photon-based qubits dominate.

### Superposition

*Superposition is the quantum mechanical principle that a quantum system can exist in multiple states simultaneously, with the system represented as a linear combination of basis states, and only collapsing to a definite state upon measurement.*

A qubit in $\frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ is in equal superposition of 0 and 1. Measurement yields 0 or 1 with equal probability.

Multiple qubits create exponentially-large state spaces. Two qubits can be in superposition of $|00\rangle, |01\rangle, |10\rangle, |11\rangle$. Generally, $n$ qubits span a $2^n$-dimensional space. This exponential scaling underlies quantum computing's power.

### Entanglement

*Entanglement is a quantum mechanical phenomenon in which two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently — measurements on one particle instantly affect the state of the others, regardless of distance, with correlations that have no classical analogue.*

The classic two-qubit entangled state is a Bell state:

$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

If two qubits are in this state, and we measure the first qubit:
- If we get 0, the second qubit is now |0⟩.
- If we get 1, the second qubit is now |1⟩.

The correlation is perfect. Crucially, the correlation cannot be used directly for classical communication (the measurement results are random), but it is foundational for many quantum protocols.

**Other Bell states:**

$$|\Phi^-\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle)$$

$$|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)$$

$$|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)$$

These four states form a basis for two-qubit systems and feature in many protocols.

### Why entanglement matters for networking

Entanglement is the resource that enables:

- **Quantum teleportation.** Sending an arbitrary quantum state from one location to another.
- **Superdense coding.** Sending two classical bits via one qubit (using prior entanglement).
- **Entanglement-based QKD.** Quantum key distribution using shared entanglement.
- **Distributed quantum computing.** Linking quantum computers.

Establishing and distributing entanglement at scale is the central challenge of quantum networking.

### No-cloning theorem

*The no-cloning theorem is the fundamental result in quantum mechanics that states an unknown arbitrary quantum state cannot be copied perfectly, distinguishing quantum from classical information and having profound implications including the impossibility of standard quantum repeaters and the basis for quantum-cryptographic security.*

Proof sketch: a unitary cloning operation would have to clone all possible inputs, including superpositions; linearity of quantum mechanics forbids this.

Implications:
- **QKD security.** Eavesdroppers cannot copy quantum signals undetectably.
- **Repeater challenge.** Classical-style repeaters that copy and forward don't work.
- **Quantum communication is more "delicate"** than classical.

## 5.5 Quantum communication protocols — BB84, entanglement-based QKD

### BB84

*BB84 is the original Quantum Key Distribution protocol, proposed by Bennett and Brassard in 1984, that uses single photons in four polarisation states to establish a shared random secret key between two parties, with security based on the no-cloning theorem and the principle that measurement disturbs unknown quantum states.*

### BB84 protocol steps

The parties: Alice (sender) and Bob (receiver). Eve (potential eavesdropper) tries to learn the key.

**Quantum phase:**

1. Alice chooses random bits to send.
2. For each bit, Alice randomly chooses one of two bases:
   - **Rectilinear basis (+).** |0⟩ encodes bit 0 as horizontal polarisation; |1⟩ encodes bit 1 as vertical.
   - **Diagonal basis (×).** |0⟩ encodes bit 0 as 45° polarisation; |1⟩ encodes bit 1 as 135°.
3. Alice transmits polarised photons to Bob.
4. For each received photon, Bob randomly chooses one of the two bases to measure in.
5. If Bob's basis matches Alice's, his measurement gives Alice's bit with certainty (in absence of eavesdropping). If bases differ, the measurement gives a random result.

**Classical phase (over public channel):**

6. Bob announces which basis he used for each photon.
7. Alice tells Bob which of his basis choices matched hers.
8. They discard the bits where bases didn't match (about half).
9. They compare a subset of the matched bits to detect errors.
10. If error rate is low enough, remaining bits form the shared key (after privacy amplification).

### Why BB84 is secure

If Eve intercepts photons in transit:

- She doesn't know Alice's basis.
- She must choose a basis to measure in.
- About half the time she guesses wrong.
- When she resends to Bob (she can't copy due to no-cloning), the basis mismatch introduces errors.

These errors are detectable in step 9. If the error rate is below a threshold, Alice and Bob can be confident there is limited eavesdropping. If errors are above the threshold, they abort.

### BB84 in practice

Commercial BB84 systems:
- Distance: typically 50-150 km in fibre.
- Key rate: from kbps to Mbps depending on distance and equipment.
- Cost: tens of thousands to hundreds of thousands of USD per endpoint.

The keys are used to seed symmetric encryption (typically AES with periodic re-keying).

### Entanglement-based QKD

An alternative QKD approach using entanglement:

**E91 protocol** (Ekert, 1991):

1. A source generates entangled photon pairs.
2. One photon goes to Alice; the other to Bob.
3. Alice and Bob each measure their photons in randomly chosen bases.
4. They publicly compare measurement bases.
5. Where bases match, they have correlated results (the shared key).
6. They check for entanglement violation using Bell inequalities; eavesdropping degrades the entanglement, detectable.

E91 has similar security guarantees to BB84 with somewhat different implementation requirements.

### Other QKD variants

**SARG04.** Variant of BB84 with different security analysis.

**Decoy-state protocols.** Use multiple intensity levels to defeat photon-number-splitting attacks.

**Continuous-variable QKD (CV-QKD).** Uses continuous variables (e.g., amplitude and phase) rather than discrete polarisation. Compatible with telecom infrastructure.

**Measurement-device-independent QKD (MDI-QKD).** Removes side-channel vulnerabilities in detectors.

**Twin-field QKD.** Extends practical distance.

The field continues to evolve. New protocols address specific vulnerabilities or extend capabilities.

## 5.6 Quantum teleportation protocols

### Quantum teleportation

*Quantum teleportation is the protocol for transferring the quantum state of a system from one location to another using prior entanglement between the locations and classical communication, without physically transferring the system itself, with the original state being destroyed in the process (consistent with the no-cloning theorem).*

Quantum teleportation does not enable faster-than-light communication (it requires classical communication) and does not copy quantum states (the original is destroyed). It transfers a state from location A to location B.

### Teleportation protocol

Setup:
- Alice and Bob share an entangled pair (let's say in state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$).
- Alice has a third qubit in some unknown state $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ that she wants to teleport.

Steps:

1. **Alice performs a Bell measurement** on her two qubits (the unknown state and her half of the entangled pair). This yields two classical bits.

2. **Alice sends the two classical bits to Bob** over a classical channel.

3. **Bob applies a unitary operation** to his half of the entangled pair, determined by the two bits received. There are four possible operations (identity, X, Z, XZ), each corresponding to one of the four possible Bell measurement results.

4. **Bob's qubit is now in state $|\psi\rangle$.** The state has been transferred from Alice's qubit to Bob's, with Alice's original copy destroyed in the measurement.

### Why teleportation matters

- **Quantum communication.** Sending unknown quantum states without sending the physical particle.
- **Building block for repeaters.** Quantum repeaters use teleportation internally.
- **Distributed quantum computing.** Moving quantum information between nodes.

### Practical implementation

Quantum teleportation has been demonstrated in many experiments:
- Across optical tables.
- Through optical fibres over tens of kilometres.
- Via satellite (Chinese Micius satellite, 2017, between ground stations).
- With matter-based qubits (atoms, ions).

Commercial use is limited; the protocol is more important as a building block than as a standalone service in 2026.

### Entanglement swapping

*Entanglement swapping is a protocol that creates entanglement between two parties who have no direct quantum channel between them, by using a third intermediate party who shares entanglement with each of them and performs a Bell measurement to "swap" the entanglement, enabling longer-distance quantum communication through chained repeaters.*

The principle:
- Alice and Charlie share an entangled pair.
- Bob and Charlie share another entangled pair.
- Charlie performs a Bell measurement on his two qubits.
- The result entangles Alice's and Bob's qubits, even though Alice and Bob never interacted.

Entanglement swapping is the basis for quantum repeaters (Section 5.8).

## 5.7 Quantum link, network, transport layer protocols

### Layered architecture for quantum networks

Classical networking's layered architecture has inspired analogous quantum proposals. Various authors have proposed quantum-network protocol stacks; no single standard yet.

A common reference framework:

**Physical layer.** Photon generation, transmission, detection. Photonic sources (lasers, parametric down-conversion), single-photon detectors, fibre or free-space channels.

**Link layer.** Reliable entanglement generation between adjacent nodes. Handles failures (photon loss, decoherence); retries.

**Network layer.** Long-distance entanglement distribution through chains of repeaters. Routing decisions.

**Transport layer.** End-to-end services on top of entanglement. Could include teleportation, QKD, distributed quantum computation.

**Application layer.** Quantum applications using underlying services.

### Specific protocol proposals

**QuTech Quantum Network Stack** (Delft, Wehner et al.). Detailed protocol architecture proposal.

**IETF Quantum Internet Research Group (QIRG).** Working on standards-track documents for quantum internet. Several published RFC-stage documents through the 2020s.

**ETSI Quantum Key Distribution Industry Specification Group.** Standards for QKD systems and their interfaces.

### Link-layer challenges

Quantum link layer differs from classical:

- **Photon loss.** Quantum signals attenuate; most photons are lost. Detection systems handle the few that arrive.
- **Decoherence.** Quantum states degrade over time.
- **Heralding.** Confirming entanglement was successfully created.
- **Retry strategies.** Without ability to copy, retries are challenging.

### Network-layer challenges

Quantum network layer:

- **Entanglement routing.** Selecting paths through the quantum network.
- **Repeater coordination.** Multiple repeaters in a chain must coordinate.
- **Resource scheduling.** Entanglement is a consumed resource.
- **Quality management.** Different paths produce different-quality entanglement.

### Hybrid with classical

Quantum protocols heavily rely on classical communication:

- BB84 needs classical channel for basis comparison and key sifting.
- Teleportation needs classical bits for the unitary operation.
- Coordination among repeaters is classical.

A "quantum network" in practice is a quantum-channel + classical-channel hybrid.

## 5.8 Quantum repeater chains and entanglement distribution

### The repeater problem

Quantum signals attenuate exponentially in fibre. Direct quantum communication is limited to about 100-200 km. For longer distances, repeaters are essential.

Classical repeaters amplify the signal, requiring the signal to be readable. Quantum signals cannot be amplified this way — the no-cloning theorem forbids it. Instead, quantum repeaters work differently.

### Quantum repeater

*A quantum repeater is a node in a quantum network that extends quantum communication beyond the distance achievable through direct channels, using entanglement swapping, quantum memory, and quantum error correction to relay entanglement across multiple segments, enabling long-distance quantum communication without violating the no-cloning theorem.*

### Repeater architecture

A basic quantum repeater includes:

- **Quantum memory.** Storing quantum states.
- **Entanglement generation.** With adjacent repeaters.
- **Bell measurement capability.** For entanglement swapping.
- **Classical communication.** For coordination.

### Operation

In a chain of repeaters between Alice and Bob:

1. **Generate adjacent entanglement.** Alice-Repeater1, Repeater1-Repeater2, ..., RepeaterN-Bob.
2. **Entanglement swapping.** Each repeater performs Bell measurement, swapping entanglement.
3. **End-to-end entanglement.** After all swaps, Alice and Bob share entanglement.
4. **Quantum error correction (advanced repeaters).** Compensates for accumulated errors.

### Generations of quantum repeaters

The literature distinguishes:

**First-generation.** Use entanglement purification and quantum memory. Tolerant of memory imperfections but slow.

**Second-generation.** Use quantum error correction at links and entanglement purification. Faster but more complex.

**Third-generation.** Use quantum error correction throughout. Very fast but require high-quality components.

In 2026, quantum repeaters remain research. Demonstrations exist; commercial deployment is years away.

### Trusted-node alternative

Until quantum repeaters become practical, an interim alternative is "trusted nodes":

- Intermediate nodes that are physically secured and trusted.
- They terminate one QKD link and start another.
- The intermediate node has access to keys; the security model assumes node integrity.

China's quantum backbone uses trusted nodes extensively. The approach is operationally practical but introduces points of trust that pure quantum repeaters would eliminate.

### Entanglement distribution networks

The vision of a quantum internet involves:

- Nodes generating entangled pairs locally.
- Networks distributing entanglement to end users.
- End users using entanglement for QKD, teleportation, or other quantum protocols.

The fabric needs:
- Quantum sources at multiple locations.
- Repeater chains for long distances.
- Routing protocols for finding good paths.
- Resource management for the entanglement "currency."
- Integration with classical infrastructure.

Research projects (Quantum Internet Alliance in EU, US Quantum Networking Initiatives, Chinese national programmes) actively work on these.

## 5.9 Security threats and vulnerabilities in quantum networks

### Security model for quantum networks

QKD provides information-theoretic security under specific assumptions:

- Quantum mechanics is correct.
- The implementation matches the protocol.
- Authentication of classical channel is maintained.
- Side channels are absent.

Each assumption is a potential vulnerability when violated.

### Implementation attacks

**Photon-number-splitting attacks.** Many QKD implementations use weak coherent pulses rather than true single photons. Multi-photon pulses leak information. Decoy-state protocols mitigate.

**Detector side-channel attacks.** Real detectors have imperfections exploitable by attackers. Detector-blinding attacks demonstrated. MDI-QKD removes detector vulnerability.

**Trojan-horse attacks.** Attacker shines light into Alice's apparatus to learn settings.

**Time-shift attacks.** Detector efficiency varies with timing; attackers exploit.

**Wavelength attacks.** Sending photons of different wavelengths.

Each specific implementation has its specific vulnerabilities. The security claim is qualified by "given correct implementation."

### Classical-channel attacks

QKD's classical channel must be authenticated to prevent man-in-the-middle attacks. If the attacker can impersonate either party on the classical channel, the security guarantee fails.

Authentication typically uses:
- Classical cryptographic authentication with pre-shared keys.
- Public-key cryptography (until post-quantum cryptography supplants it).
- Information-theoretic authentication.

### Denial of service

QKD can be denied by:
- Disrupting the quantum channel.
- Disrupting the classical channel.
- Injecting noise causing protocol abort.

Mitigation: classical fallback when QKD unavailable; redundant channels.

### Trusted-node compromise

Where trusted nodes are used, compromise of a node compromises all keys passing through it. The trusted node is a security boundary.

### Quantum-network-specific threats

**Entanglement poisoning.** Adversary contaminates entangled pairs.

**Eavesdropping on quantum repeaters.** Attacker who gains physical access to repeater can observe.

**Routing manipulation.** Adversary causes traffic to route through compromised paths.

**Resource exhaustion.** Consuming entanglement resources to deny service to legitimate users.

### Long-term security threats

**Quantum computers attacking classical crypto.** Most current internet security relies on RSA, ECC. Quantum computers running Shor's algorithm break these. This is the threat that drives post-quantum cryptography adoption.

**"Store now, decrypt later."** Adversaries collect encrypted traffic now; decrypt with future quantum computers. Affects long-term confidentiality even if defences are added later.

**Quantum-resistant classical algorithms.** Lattice-based (Kyber, Dilithium), hash-based (SPHINCS+), code-based (Classic McEliece), multivariate, isogeny-based — these are standardised by NIST (CRYSTALS-Kyber for KEMs and CRYSTALS-Dilithium for signatures became NIST standards in 2024).

### For Nepali context

Quantum-related security planning for Nepali organisations in 2026:

- **No urgent threat from operational quantum computers.** Current quantum computers cannot break real cryptography. Threat is years to decades away depending on engineering progress.
- **Plan for transition to PQC.** Begin tracking PQC standards; plan migration in coming years.
- **QKD deployment.** Not warranted for most use cases given cost and limitations. May be appropriate for highest-security communications (national security, certain critical infrastructure).
- **Long-lived secrets.** Information that must remain confidential for decades faces "store now, decrypt later" risk now. Apply PQC where available.

## 5.10 Quantum AI for network traffic analysis and anomaly detection

### Quantum machine learning

*Quantum machine learning is the field that explores the combination of quantum computing and machine learning, including using quantum computers to accelerate classical ML algorithms, developing inherently quantum ML algorithms, and applying ML to problems in quantum information processing.*

### Categories of quantum ML

**Quantum-enhanced classical ML.** Use quantum computers to speed up subroutines of classical ML.

**Quantum-inspired classical algorithms.** Algorithms inspired by quantum ideas but running on classical hardware.

**Native quantum ML algorithms.** ML algorithms designed for quantum data on quantum hardware.

**Hybrid quantum-classical.** Most practical near-term — classical optimisation of quantum circuits.

### Specific quantum ML algorithms

**Variational Quantum Eigensolver (VQE).** For optimisation; relevant for some ML training tasks.

**Quantum Approximate Optimisation Algorithm (QAOA).** For combinatorial optimisation.

**Quantum Support Vector Machines.** Quantum versions of SVM.

**Quantum Neural Networks (QNN).** Various architectures.

**Quantum Generative Adversarial Networks (QGAN).** Quantum versions of GANs.

### Application to networking

Quantum ML for network traffic analysis is at very early stages. Potential applications:

**Pattern recognition.** Quantum algorithms may identify patterns classical algorithms miss.

**Optimisation.** Routing, placement, scheduling problems that are computationally expensive classically.

**Anomaly detection.** Quantum kernels for novelty detection.

**Large-scale similarity search.** Finding similar patterns in massive traffic datasets.

### Practical limitations

In 2026:

- **Quantum hardware is limited.** Tens to hundreds of noisy qubits available. Insufficient for large-scale ML.
- **Few real advantages demonstrated.** Most claimed quantum advantages for ML are theoretical or specific to artificial cases.
- **Costs are high.** Quantum hardware time is expensive.
- **Maturity is low.** Few production systems.

### Near-term research directions

**Quantum-inspired classical algorithms.** Where genuine quantum hardware isn't needed.

**Small-scale demonstrations.** Proving concepts on current hardware.

**Hybrid algorithms.** Classical pre-processing + quantum sub-routines + classical post-processing.

**Specific use cases.** Where quantum may have genuine advantage (certain combinatorial optimisations).

### Nepal context

Quantum ML for networking in Nepal is academic research. No production deployment. IOE Pulchowk and TU researchers may explore the area; commercial relevance is years away.

The MSc student interested in quantum networking should develop strong foundations:

- **Linear algebra.** Quantum mechanics is linear algebra over complex Hilbert spaces.
- **Quantum mechanics fundamentals.** Bra-ket notation, operators, measurements.
- **Quantum computing basics.** Gates, circuits, algorithms.
- **Specific quantum algorithms.** Grover, Shor, quantum simulation.
- **Machine learning.** Both classical and quantum.
- **Network theory.** Topology, routing, optimisation.

With this background, the student is positioned for international research opportunities and emerging Nepali academic and commercial work in the area.

The next and final chapter draws together the threads — looking at future directions across the trends covered, the open research challenges, and what the intelligent-networking discipline may become in the coming decade.
