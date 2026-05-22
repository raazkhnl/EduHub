---
title: 'Chapter 2 — Symmetric and Asymmetric Key Cryptography'
sidebar_label: 'Ch 02 — Symmetric and Asymmetric Key Cryptography'
sidebar_position: 2
description: 'Chapter 2 of Cryptography and Data Security (ENCTNS502).'
slug: /ioe/msncs/year-1-part-1/cryptography/notes/ch02
tags: [msncs, ENCTNS502, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

This chapter is the algorithmic heart of the subject. It covers the two families of cryptographic primitives that protect almost every byte of digital traffic in 2026 — symmetric ciphers (where both parties share the same key) and asymmetric ciphers (where each party holds a key pair). The chapter starts with the one cipher that is provably unbreakable (the one-time pad), explains why no other cipher can match it, then walks through the block ciphers and stream ciphers that achieve practical symmetric security. The second half introduces public-key cryptography — the 1976 conceptual revolution — and the two number-theoretic problems on which most of it rests: the discrete logarithm (Diffie-Hellman, ECC) and integer factorisation (RSA). Attacks and countermeasures appear in both halves.

## 2.1 One-time pad and perfect secrecy

### Perfect secrecy

*Perfect secrecy is the property of a cipher, formalised by Claude Shannon in 1949, that the ciphertext gives an attacker no information whatsoever about the plaintext — formally, that for every plaintext $P$ and every ciphertext $C$, $\Pr[P \mid C] = \Pr[P]$.*

In plain language: seeing the ciphertext does not change the attacker's belief about which plaintext was sent. An attacker who knows the ciphertext is in the same position as an attacker who knows nothing.

This is the strongest possible security guarantee. It does not depend on the attacker's computing power — perfect secrecy holds even against an attacker with unlimited time and infinite computation. No future advance in computing, no quantum computer, no algorithmic breakthrough can break a perfectly-secret cipher.

Shannon proved an important negative result alongside this positive one: **for a cipher to be perfectly secret, the key must be at least as long as the message, must be uniformly random, and must never be reused.** Any cipher with a shorter key has multiple plaintexts that could correspond to a given ciphertext, and the attacker — given enough ciphertext — can distinguish between them statistically.

The one-time pad is the unique cipher that achieves perfect secrecy.

### The one-time pad

*The one-time pad (OTP) is the cipher in which the ciphertext is produced by combining the plaintext bit-by-bit with a uniformly random key (the pad) of the same length as the plaintext using the XOR operation, with the absolute requirement that the pad be truly random, kept secret, and never reused.*

The construction is simple. For each bit $p_i$ of the plaintext and the corresponding bit $k_i$ of the pad, the ciphertext bit is:

$$
c_i = p_i \oplus k_i
$$

Decryption applies the same operation: $p_i = c_i \oplus k_i$. Since XOR is its own inverse, encryption and decryption use the same procedure.

A worked example. Let the plaintext be the seven-bit ASCII code for `A`, which is `1000001`. Let the pad be a random seven-bit value, say `0110110`. Then:

```
Plaintext:    1 0 0 0 0 0 1
Pad:          0 1 1 0 1 1 0
Ciphertext:   1 1 1 0 1 1 1
```

If the recipient also has the pad, they XOR ciphertext with pad to recover plaintext. An attacker who sees only the ciphertext `1110111` cannot know whether the plaintext was `A` (1000001), `B` (1000010), `Z` (1011010), `5` (0110101), or any of the 128 possible seven-bit values. *Every* plaintext is equally likely, because for every candidate plaintext there is exactly one pad that would have produced the observed ciphertext.

### Why the OTP works

The intuition: each bit of the pad is a fair coin flip. XORing a random bit with any plaintext bit produces a random ciphertext bit. The ciphertext is statistically indistinguishable from random noise. There is nothing in the ciphertext for the attacker to learn from.

### Why the OTP is impractical

If the OTP is provably unbreakable, why does the rest of cryptography exist? Because the OTP's requirements are extraordinarily hard to meet at scale.

**The pad must be as long as the plaintext.** To exchange one gigabyte of encrypted traffic, you need one gigabyte of pad — securely delivered to the recipient in advance. The key-distribution problem is just the original confidentiality problem in disguise.

**The pad must be truly random.** Not pseudo-random, not "looks random." Truly random. Every bit must come from a physical source — radioactive decay, thermal noise, quantum measurement. Generating gigabytes of certified true randomness is expensive and slow.

**The pad must never be reused.** This is where most practical attempts to use the OTP have failed. If the same pad is used to encrypt two different messages $P_1$ and $P_2$, then:

$$
C_1 \oplus C_2 = (P_1 \oplus K) \oplus (P_2 \oplus K) = P_1 \oplus P_2
$$

The pad cancels out. The attacker now has $P_1 \oplus P_2$, the XOR of two plaintexts in natural language. Analysing the XOR of two English-language messages reveals both of them. This was exactly the flaw exploited by the American VENONA project against Soviet communications in the late 1940s — Soviet code clerks under wartime pressure had reused pages from one-time pad books, and decades of supposedly-secure traffic could be partially read as a result.

**The pad must be kept perfectly secret.** Once the attacker has any pad bits, the corresponding ciphertext bits become readable.

### Where the OTP is actually used

The OTP is used in the small number of contexts where its requirements can be met:

- **Diplomatic communications between heads of state.** The Moscow-Washington "hotline" used a one-time pad until 1986, with the pads physically delivered by courier.
- **Intelligence agency communications with specific assets.** Number stations broadcast on shortwave radio still carry one-time-pad encrypted instructions to operatives in the field. The pads are paper booklets carried in secure pouches.
- **Quantum key distribution (QKD) products** sometimes combine the secret bits they generate with the OTP, taking advantage of QKD's information-theoretic security to deliver the pad.

For ordinary digital communication — protecting an HTTPS session, an IPsec VPN, a banking transaction, an email — the OTP is unusable. We need ciphers with short, reusable keys. These ciphers cannot be perfectly secret, but they can be **computationally secret**: any feasible attacker has only a negligible chance of breaking them. The rest of Chapter 2 covers those ciphers.

### Computational security as the modern goal

Modern cryptography settled on a different, weaker, but still useful security definition: **computational security**. The cipher is secure if no attacker with realistic computing resources (say, $2^{128}$ operations) has more than a negligible chance of breaking it.

The trade-off is that computational security depends on unproven assumptions — typically that some mathematical problem (factoring large integers, computing discrete logarithms) is hard. If the assumption is wrong, the cipher is broken. We accept this because:

- Many of these problems have been studied for decades or centuries without anyone finding fast algorithms.
- The cipher's key can be very short (128 to 256 bits), which makes it practical.
- The trade-off has been good enough for fifty years.

Shannon's perfect secrecy remains the theoretical ideal. Every practical cipher is a controlled compromise from that ideal.

## 2.2 Block ciphers

*A block cipher is a deterministic, keyed symmetric cipher that takes a fixed-length block of plaintext (typically 64 or 128 bits) and a key, and produces a ciphertext block of the same length, such that the transformation is a permutation of the block space for each fixed key.*

Block ciphers are the workhorse symmetric primitive. AES is the dominant block cipher in 2026; DES and 3DES are its predecessors. Block ciphers also serve as building blocks for hash functions, MACs, stream ciphers (in certain modes), and authenticated-encryption schemes.

### What a block cipher must do

A block cipher with $n$-bit block size and $k$-bit key:

- Defines a function $E_K : \{0,1\}^n \to \{0,1\}^n$ for each $k$-bit key $K$.
- The function must be a permutation — every input maps to a unique output, every output to a unique input, so decryption is well-defined.
- Knowing the key, $E_K$ is easy to compute and invert.
- Without the key, $E_K$ should be indistinguishable from a random permutation of $n$-bit blocks.

The last property is the security goal: a "good" block cipher behaves as if its mapping were chosen uniformly at random from the set of all $2^n!$ possible permutations of $n$-bit blocks.

### Confusion and diffusion (Shannon's principles)

Shannon's 1949 paper named the two design principles every modern block cipher follows:

**Confusion.** The relationship between key and ciphertext should be complex. A change in one bit of the key should affect many bits of the ciphertext, in a hard-to-predict way. Substitution boxes (S-boxes) provide confusion — they introduce non-linearity into the cipher's algebra.

**Diffusion.** The relationship between plaintext and ciphertext should spread. A change in one bit of the plaintext should affect many bits of the ciphertext. Permutations and linear mixing layers provide diffusion — they spread the influence of each input bit across many output bits.

A typical block cipher alternates layers of substitution (confusion) and permutation/mixing (diffusion) over multiple **rounds**, with a different round subkey applied at each. The structure is sometimes called a **substitution-permutation network (SPN)** when the layers are explicit; AES is the canonical SPN.

### The Feistel network

A specific block-cipher structure invented by Horst Feistel at IBM in the late 1960s and used by DES.

A Feistel cipher operates on a block split into two halves $L$ and $R$. In each round:

```
L_{i+1} = R_i
R_{i+1} = L_i ⊕ F(R_i, K_i)
```

where $F$ is the **round function** (which need not be invertible) and $K_i$ is the round subkey. Decryption uses the same structure with the subkeys in reverse order — a property that makes Feistel ciphers easy to implement (the same hardware does encryption and decryption).

DES is a 16-round Feistel cipher with 32-bit halves. Many other ciphers (Blowfish, Twofish, CAST, IDEA in a generalised form, GOST) are Feistel-style.

### The substitution-permutation network (SPN)

AES uses an SPN structure instead of a Feistel network. The block is treated as a 4×4 matrix of bytes (the **state**). Each round applies four operations in sequence:

1. **SubBytes** — a non-linear byte substitution (the S-box).
2. **ShiftRows** — a permutation that shifts the rows of the state.
3. **MixColumns** — a linear mixing operation on each column.
4. **AddRoundKey** — XOR with the round subkey.

The four operations together provide both confusion (from SubBytes) and diffusion (from ShiftRows and MixColumns). Decryption uses the inverse operations in reverse order.

### Block size

A block cipher's block size determines several things:

- **Birthday-style collisions in modes.** A block cipher used in certain modes will, after $2^{n/2}$ blocks, produce a collision in the ciphertext. For a 64-bit block size, $2^{32}$ blocks is about 32 gigabytes — not impossibly large. For a 128-bit block, $2^{64}$ blocks is about 280 exabytes, which is impractical to reach.
- **Padding overhead.** Plaintexts must be padded to a multiple of the block size.
- **Memory and performance.** Larger blocks need more memory but offer better security margins.

128-bit blocks are now the standard. DES's 64-bit blocks are a known limitation in modern use (the **Sweet32** attack of 2016 exploited 64-bit-block CBC mode at scale).

### Key size

A block cipher's key size determines the brute-force resistance:

- **56 bits (DES)** — broken by brute force in the late 1990s; no longer secure.
- **112 bits (3DES effective)** — secure against brute force but vulnerable to meet-in-the-middle attacks that reduce it to about $2^{112/2} \cdot 2 = 2^{57}$ effective work in some contexts; deprecated in 2024.
- **128 bits (AES-128)** — secure against brute force for the foreseeable classical-computing future.
- **192 bits (AES-192)** — extra margin.
- **256 bits (AES-256)** — long-term security; also chosen for post-quantum margin (Grover's algorithm on a quantum computer effectively halves key length, so 256-bit symmetric keys give 128-bit post-quantum security).

## 2.3 DES, 3DES, and AES

### DES — Data Encryption Standard

*DES (Data Encryption Standard) is the symmetric block cipher standardised by the US National Bureau of Standards in 1977 as FIPS PUB 46, operating on 64-bit blocks with a 56-bit key (presented as 64 bits with 8 parity bits) through 16 rounds of a Feistel network.*

DES was the first publicly specified, widely deployed cipher. It was designed by IBM (originally as Lucifer, by Horst Feistel and his team) and modified by the NSA before standardisation. The modifications — particularly the design of the S-boxes — were controversial at the time but were later vindicated when differential cryptanalysis was discovered publicly; the NSA had clearly known about the attack and tweaked the S-boxes to resist it.

**DES structure.** The cipher has four parts:

1. **Initial permutation (IP).** A fixed bit-level permutation of the 64-bit input block. This has no cryptographic effect — it was chosen for hardware convenience.
2. **16 Feistel rounds.** Each round splits the 64-bit state into 32-bit halves, applies the round function $F$ to the right half with a round subkey, and XORs the result with the left half.
3. **Inverse initial permutation (IP$^{-1}$).** Undoes the initial permutation at the end.
4. **Key schedule.** Expands the 56-bit master key into sixteen 48-bit round subkeys.

**The round function $F$.** The 32-bit right half goes through four steps:

- **Expansion (E)** — expands the 32-bit half to 48 bits by duplicating certain bits.
- **XOR with the 48-bit round subkey.**
- **S-box substitution** — eight 6-bit-to-4-bit S-boxes turn the 48-bit value back into 32 bits. These S-boxes provide the non-linearity. Their design is the part the NSA modified.
- **P-box permutation** — a fixed permutation of the 32-bit output.

**The DES key length controversy.** The original Lucifer design used a 128-bit key. NIST reduced it to 56 bits for DES. The NSA was accused of insisting on the reduction to keep DES breakable by their own resources but secure against everyone else. The reduction proved costly — by 1998 the **EFF DES Cracker**, a custom $250,000 machine, recovered a DES key in about 56 hours. By the early 2000s, distributed cracking efforts and faster hardware could break DES in days.

**Why DES is no longer used.** Three reasons:

- The 56-bit key is brute-forceable.
- The 64-bit block size is too small (Sweet32 in 2016).
- 3DES and AES exist as drop-in replacements.

DES is now historically interesting only. It must not be used to protect new traffic.

### 3DES (Triple DES)

*3DES (Triple DES) is the symmetric block cipher that applies the DES algorithm three times in sequence with two or three different keys, providing an effective key length of either 112 bits (two-key 3DES) or 168 bits (three-key 3DES) while preserving DES's 64-bit block size.*

3DES was the bridge between DES and AES. Once DES became too weak, instead of standardising a new cipher immediately, NIST authorised running DES three times: encrypt-decrypt-encrypt (EDE) with three keys.

$$
C = E_{K_3}(D_{K_2}(E_{K_1}(P)))
$$

The middle operation is decryption, not encryption. This is for backward compatibility: if $K_1 = K_2 = K_3$, the cipher reduces to plain DES.

**Two-key 3DES.** $K_1 = K_3$, $K_2$ different. 112 effective key bits. Used in older banking systems.

**Three-key 3DES.** All three keys different. 168 nominal key bits, but a meet-in-the-middle attack reduces the effective security to about 112 bits.

3DES is three times slower than DES — three encrypt operations per block. It still uses the 64-bit DES block, so Sweet32 applies. NIST deprecated 3DES in 2018 and disallowed it for new applications in 2024. Some legacy banking systems still use 3DES (especially for PIN encryption), with migration to AES underway.

### AES — Advanced Encryption Standard

*AES (Advanced Encryption Standard) is the symmetric block cipher standardised by NIST in 2001 as FIPS PUB 197, derived from the Rijndael design by Joan Daemen and Vincent Rijmen, that encrypts 128-bit blocks using a key of 128, 192, or 256 bits through a substitution-permutation network of 10, 12, or 14 rounds respectively.*

The competition that produced AES is one of the cleanest demonstrations of how good standards happen. NIST ran an open process from January 1997 to October 2000:

- 15 candidate algorithms were submitted.
- Five finalists were selected: MARS (IBM), RC6 (RSA Labs), Rijndael (Daemen and Rijmen), Serpent (Anderson, Biham, Knudsen), Twofish (Schneier et al.).
- For three years the world's cryptanalytic community publicly attacked each candidate, in conferences and journal papers.
- Rijndael was selected in October 2000, standardised in November 2001.

The decision was based on security, performance, and implementation flexibility. Rijndael won partly because it had excellent performance in software *and* hardware, partly because its design was clean enough that side-channel analysis was tractable.

**AES structure.** AES is a substitution-permutation network. The 128-bit block is treated as a 4×4 matrix of bytes called the **state**. Each round applies four operations:

**1. SubBytes.** Each byte of the state is replaced according to a fixed S-box. The S-box is the AES inverse in $GF(2^8)$ followed by an affine transformation. This is the source of confusion. It is the only non-linear operation in AES.

**2. ShiftRows.** The four rows of the state are shifted cyclically by 0, 1, 2, and 3 positions respectively. Row 0 is unchanged, row 1 shifts left by 1 byte, and so on. This is part of the diffusion layer.

**3. MixColumns.** Each column of the state is multiplied by a fixed $4 \times 4$ matrix in $GF(2^8)$:

$$
\begin{pmatrix} 2 & 3 & 1 & 1 \\ 1 & 2 & 3 & 1 \\ 1 & 1 & 2 & 3 \\ 3 & 1 & 1 & 2 \end{pmatrix}
$$

MixColumns ensures that a change in one byte of the input column affects all four bytes of the output column. This is the main diffusion mechanism.

**4. AddRoundKey.** XOR the state with the round subkey.

**The number of rounds.** AES uses different round counts based on key size:

- AES-128: 10 rounds
- AES-192: 12 rounds
- AES-256: 14 rounds

The final round skips MixColumns. (Skipping it makes the decryption circuit symmetric with the encryption circuit and adds no useful diffusion at the very end.)

**The key schedule.** AES expands the master key into round subkeys (one for the initial AddRoundKey before round 1, plus one per round). The expansion uses the SubBytes S-box, byte rotation, and a round constant $Rcon$ that changes per round. For AES-128, the 128-bit key expands to 11 × 128 = 1408 bits of subkey material.

**Performance.** Modern x86, ARM, and other CPU architectures include dedicated AES instructions (AES-NI on Intel/AMD, ARMv8 cryptography extensions). These instructions accelerate AES to several gigabits per second per core. Without hardware support, software AES still runs at hundreds of megabits per second.

**Security status.** AES has been the most heavily analysed cipher in history. The best known attacks on AES-128 require about $2^{126}$ work (versus brute force at $2^{128}$), still far beyond any practical capability. Side-channel attacks (cache-timing, power-analysis) have been a more active threat against AES implementations, but constant-time implementations defeat these. As of 2026, AES is the global default for symmetric encryption and is expected to remain so well past the 2030s.

### Quick comparison

| | DES | 3DES | AES |
|---|---|---|---|
| Year | 1977 | 1998 | 2001 |
| Block size | 64 bits | 64 bits | 128 bits |
| Key size | 56 bits | 112/168 bits | 128/192/256 bits |
| Structure | Feistel | Triple Feistel | SPN |
| Rounds | 16 | 48 (16 × 3) | 10/12/14 |
| Software speed | Slow | Very slow | Fast (with AES-NI very fast) |
| Hardware speed | Fast in custom hardware | Slow | Fast |
| Status | Broken | Deprecated | Current standard |

### A worked AES round (high-level)

A single AES round on the state. The state begins as a 4×4 matrix of bytes. Let it be:

```
| 19 a0 9a e9 |
| 3d f4 c6 f8 |
| e3 e2 8d 48 |
| be 2b 2a 08 |
```

**SubBytes** replaces each byte using the S-box. After SubBytes (using the standard AES S-box):

```
| d4 e0 b8 1e |
| 27 bf b4 41 |
| 11 98 5d 52 |
| ae f1 e5 30 |
```

**ShiftRows** cyclically shifts each row left by its row number:

```
| d4 e0 b8 1e |
| bf b4 41 27 |
| 5d 52 11 98 |
| 30 ae f1 e5 |
```

**MixColumns** multiplies each column by the fixed matrix. The first column becomes:

```
| 04 |
| 66 |
| 81 |
| e5 |
```

**AddRoundKey** XORs the round subkey. With round subkey:

```
| a0 fa fe 17 |
| 88 54 2c b1 |
| 23 a3 39 39 |
| 2a 6c 76 05 |
```

The state after this round becomes the input to the next. After 10 rounds (for AES-128), the final state is the ciphertext.

This is one round. AES does 10, 12, or 14. The combination of confusion (SubBytes) and diffusion (ShiftRows, MixColumns), repeated many times with key mixing, produces a permutation that is computationally indistinguishable from random.

## 2.4 Block cipher modes of operation

A block cipher only encrypts one block at a time. Most plaintexts are longer than one block. A **mode of operation** specifies how to chain block-cipher operations to encrypt arbitrary-length plaintexts. The choice of mode dramatically affects the security of the result — using AES with a bad mode is worse than using a weaker cipher with a good mode.

### ECB — Electronic Codebook (do not use)

*ECB (Electronic Codebook) is the simplest block cipher mode, in which each plaintext block is encrypted independently with the same key, producing one ciphertext block per plaintext block with no chaining between blocks.*

$$
C_i = E_K(P_i)
$$

ECB is broken for almost any practical use. Two reasons:

**Identical plaintext blocks produce identical ciphertext blocks.** If your plaintext has any structure — and almost all plaintexts do — that structure shows up in the ciphertext.

The standard demonstration is the **ECB Penguin**: a bitmap image of the Linux Tux penguin encrypted with ECB still looks like a penguin, because flat-coloured regions of the image become repeated plaintext blocks that encrypt to repeated ciphertext blocks. The outline of the penguin is visible in the ciphertext.

**Reordering attacks.** An attacker who knows the plaintext structure can swap, repeat, or delete ciphertext blocks and the recipient cannot detect it. If block 5 carries "transfer 1000 NPR" and block 12 carries "transfer 1,000,000 NPR" in a long bulk message, swapping them changes the meaning without breaking the encryption.

ECB has exactly one legitimate use: encrypting a single block of random data (like a key) where there is no structure to leak. For anything else, use CBC, CTR, or — preferably — an authenticated mode.

### CBC — Cipher Block Chaining

*CBC (Cipher Block Chaining) is the block cipher mode in which each plaintext block is XORed with the previous ciphertext block before encryption, with an initialisation vector (IV) used in place of the previous ciphertext for the first block, breaking the ECB pattern-leakage problem.*

$$
C_1 = E_K(P_1 \oplus IV) \qquad C_i = E_K(P_i \oplus C_{i-1}) \quad \text{for } i \geq 2
$$

Decryption:

$$
P_1 = D_K(C_1) \oplus IV \qquad P_i = D_K(C_i) \oplus C_{i-1} \quad \text{for } i \geq 2
$$

**The IV** must be unpredictable for each new encryption — typically random. The same plaintext encrypted twice with different IVs produces different ciphertexts. The IV is sent in clear with the ciphertext; it does not need to be secret, only unpredictable.

**Strengths of CBC.** Identical plaintext blocks produce different ciphertext blocks (because each block is XORed with a different previous ciphertext). Block reordering breaks the chain. Good error propagation in encryption — every plaintext bit affects every subsequent ciphertext block.

**Weaknesses of CBC.**

- **No integrity protection on its own.** CBC provides confidentiality but not authenticity. An attacker can flip bits in $C_{i-1}$ to flip bits in the recovered $P_i$ (at the cost of randomising $P_{i-1}$). The recipient cannot detect this without a separate MAC.
- **Padding-oracle attacks.** When CBC is paired with a padding scheme (typically PKCS#7) and the decryption side reveals whether the padding was valid (through an error message, a different response time, or a server behaviour change), the attacker can decrypt arbitrary ciphertext block-by-block by manipulating earlier ciphertext blocks. Vaudenay (2002) discovered this; the 2010 ASP.NET padding-oracle attack and the 2014 POODLE attack on SSL 3.0 are the famous practical examples.
- **Sequential.** Encryption cannot be parallelised because each block depends on the previous one. Decryption can be parallelised because $P_i$ depends only on $C_i$ and $C_{i-1}$, both known.
- **Sweet32.** With 64-bit-block ciphers like 3DES, CBC starts producing collisions after about $2^{32}$ blocks (Sweet32, 2016). With AES's 128-bit block, the collision boundary is at $2^{64}$ blocks, safely beyond practical attack.

CBC is still widely deployed but is being replaced by authenticated-encryption modes (GCM, ChaCha20-Poly1305) in new designs.

### CTR — Counter mode

*CTR (Counter mode) is the block cipher mode that turns a block cipher into a stream cipher by encrypting a sequence of counter values (initialised to a nonce) and XORing the resulting keystream with the plaintext.*

$$
C_i = P_i \oplus E_K(\text{nonce} \| i)
$$

The counter is incremented for each block. The block cipher is used only in encryption mode (never decryption), making CTR slightly faster than CBC in some implementations.

**Strengths.**

- **Parallelisable.** Each block is independent. Both encryption and decryption can run in parallel.
- **Random access.** To decrypt block $i$, you need only the nonce, the counter, and $C_i$.
- **No padding.** CTR is a stream cipher; plaintext length is preserved.

**Weaknesses.**

- **Catastrophic on nonce reuse.** If the same nonce is used to encrypt two different messages with the same key, the keystream is identical and the attacker recovers $P_1 \oplus P_2$ — exactly the one-time-pad reuse problem. CTR has no defence against this.
- **No integrity.** Like CBC, CTR provides confidentiality only.

CTR is the basis of several authenticated-encryption modes (GCM in particular).

### GCM — Galois/Counter Mode

*GCM (Galois/Counter Mode) is the authenticated-encryption mode that combines CTR-mode encryption with a Galois-field-based authentication tag, providing both confidentiality and integrity in a single pass over the data.*

GCM is the modern default. It is used by TLS 1.3 (mandatory), TLS 1.2 (with AES-GCM cipher suites), IPsec, SSH, and many others.

**Operation.**

1. Encryption uses CTR mode to produce the ciphertext.
2. Authentication uses a Galois-field multiplication chain over the ciphertext blocks and the associated data.
3. The 128-bit authentication tag is computed and appended to the ciphertext.

Decryption reverses these steps and rejects the ciphertext if the tag does not verify.

**Strengths.**

- **Authenticated encryption.** Confidentiality and integrity in one operation.
- **Hardware acceleration.** Modern CPUs include PCLMUL instructions that accelerate the Galois-field multiplication.
- **Parallelisable** for both encryption and authentication.
- **Standardised** (NIST SP 800-38D).

**Weaknesses.**

- **Catastrophic on nonce reuse.** Worse than plain CTR — nonce reuse not only breaks confidentiality but also lets the attacker forge authentication tags arbitrarily.
- **96-bit nonce limit.** GCM's recommended nonce size is 96 bits. With random nonces, the birthday bound for collision is around $2^{48}$ messages, which is reachable in heavy use.
- **The 64 GB single-message limit.** A single GCM encryption can safely cover at most $2^{32}$ blocks (64 GB) before the authentication starts to weaken.

For very high-volume traffic, modern protocols use derivative modes like **AES-GCM-SIV** (synthetic IV, RFC 8452) which is misuse-resistant — nonce reuse degrades the security but does not catastrophically break it.

### OFB and CFB — Output Feedback and Cipher Feedback

These two modes were popular in the 1980s and 1990s. Both turn the block cipher into a stream cipher, with slight differences in error propagation and synchronisation. They are largely obsolete now — CTR has the same benefits with simpler analysis, and authenticated modes (GCM) are preferred for new designs.

**OFB** generates the keystream by repeatedly encrypting the IV, then the result, then the next result. The keystream does not depend on the plaintext or ciphertext.

**CFB** generates the next keystream block by encrypting the previous ciphertext block.

### XTS — used for disk encryption

*XTS-AES is the tweakable block cipher mode standardised in IEEE P1619 and NIST SP 800-38E, used for full-disk encryption, that combines AES with a tweak based on the disk sector address so that the same plaintext at different sector positions encrypts to different ciphertexts.*

XTS is the mode used by:

- BitLocker on Windows (since Windows 10).
- FileVault on macOS.
- LUKS / dm-crypt on Linux.
- Most enterprise SSDs that support hardware encryption.

XTS does not provide authentication (a deliberate trade-off — sector data must fit in the sector, with no room for an authentication tag). For files-on-disk encryption with integrity, use a higher layer.

### ChaCha20-Poly1305

A modern alternative to AES-GCM, based on the ChaCha20 stream cipher and the Poly1305 MAC. Standardised in RFC 8439. Used by:

- TLS 1.3 (alongside AES-GCM).
- WireGuard VPN (the default).
- Many mobile and IoT applications where AES hardware acceleration is missing.

ChaCha20-Poly1305 is faster than AES-GCM in software on devices without AES instructions, and it is widely considered to have a cleaner design from a side-channel perspective. The two algorithms are roughly equivalent in security.

### Selection guidance

In 2026, the practical guidance is straightforward:

- **For new designs:** AES-GCM, ChaCha20-Poly1305, or AES-GCM-SIV.
- **For disk encryption:** XTS-AES.
- **For legacy systems still using CBC:** combine with HMAC and use encrypt-then-MAC to defeat padding-oracle attacks. Plan migration to GCM.
- **Never use:** ECB (except for a single random block), DES, 3DES (in new designs), or any mode with predictable IVs or reused nonces.

## 2.5 Stream ciphers and RC4

*A stream cipher is a symmetric cipher that generates a key-dependent pseudorandom bit stream (the keystream) and combines it with the plaintext through XOR to produce the ciphertext, processing the data bit-by-bit or byte-by-byte rather than in fixed-size blocks.*

Stream ciphers are conceptually the practical version of the one-time pad: replace the truly random pad with a pseudorandom keystream generated from a short key. The security depends on the keystream being indistinguishable from random.

### Structure of a stream cipher

A stream cipher has two parts:

- **Initialisation.** The secret key (and usually a public IV/nonce) is loaded into an internal state.
- **Keystream generation.** A state-update function and an output function combine to produce a stream of pseudorandom bytes.

Encryption is just XOR of the keystream with the plaintext; decryption is the same XOR with the same keystream.

### Synchronous vs self-synchronising

**Synchronous stream ciphers** generate the keystream independently of the plaintext or ciphertext. The two parties must keep their stream positions synchronised — if the recipient gets out of sync (a bit is dropped, a bit is inserted), every subsequent byte is garbled. RC4, ChaCha20, and Salsa20 are synchronous.

**Self-synchronising stream ciphers** generate the keystream as a function of the previous ciphertext bits. They recover automatically from insertions and deletions after a few characters. They are rarely used today; CFB mode is a self-synchronising example.

### RC4

*RC4 is the stream cipher designed by Ron Rivest at RSA Security in 1987, kept proprietary until it was leaked anonymously in 1994, that produces a keystream by maintaining a permutation of 256 bytes and updating it with a simple state-update rule.*

RC4 was once the most widely deployed stream cipher in the world. WEP (early Wi-Fi encryption), WPA-TKIP (early WPA), SSL up to TLS 1.2, Bittorrent, Microsoft Office password protection, Lotus Notes, and many other systems used it. The reasons were practical: RC4 was simple, fast, and worked on devices with very limited resources.

**Algorithm.** RC4 has two phases.

*Key-Scheduling Algorithm (KSA).* Initialise an array $S$ with $S[i] = i$ for $i = 0$ to 255. Then mix it with the key:

```
j = 0
for i from 0 to 255:
    j = (j + S[i] + key[i mod key_length]) mod 256
    swap S[i] and S[j]
```

*Pseudo-Random Generation Algorithm (PRGA).* Generate keystream bytes:

```
i = 0
j = 0
loop:
    i = (i + 1) mod 256
    j = (j + S[i]) mod 256
    swap S[i] and S[j]
    K = S[(S[i] + S[j]) mod 256]
    output K
```

Each keystream byte $K$ is XORed with the next plaintext byte.

The algorithm is famously short — under fifty lines of code, no S-boxes, no modular arithmetic beyond mod 256. This simplicity was the appeal.

**Why RC4 is broken.**

RC4's keystream is not uniformly distributed. Specific biases exist in the first few hundred bytes — certain output bytes have probability slightly different from $1/256$. These biases are exploitable.

- **Fluhrer-Mantin-Shamir (FMS) attack, 2001.** Specific weaknesses in RC4's KSA when used with IV-prepended keys (as in WEP). Recovers the WEP key after capturing a few million packets. This broke WEP within months of the attack's publication.
- **Bar-Mitzvah attack, 2015.** Exploits weak keys in the first byte of the keystream.
- **RC4 in TLS, 2013–2015.** AlFardan et al. showed that RC4 biases let an attacker decrypt small parts of repeated plaintext (e.g., session cookies) given enough samples — millions to billions of TLS connections to the same victim. RFC 7465 (February 2015) prohibited RC4 in TLS.

By 2015, RC4 was banned from TLS and similar standards. By 2026, it survives only in legacy systems that have not been updated.

**The lesson.** RC4 worked acceptably for two decades, broke gradually as analysis improved, and finally collapsed when its biases proved practically exploitable. A simple, fast cipher is appealing, but simplicity that hides subtle statistical biases is dangerous. Modern stream ciphers (ChaCha20, Salsa20) are designed with the lessons of RC4 in mind — particularly the requirement that the keystream's statistical properties be very close to uniform from the very first byte.

### ChaCha20 — the modern replacement

*ChaCha20 is the stream cipher designed by Daniel J. Bernstein in 2008 as an improvement on his earlier Salsa20, that maintains a 512-bit internal state derived from a 256-bit key, a 96-bit nonce, and a 32-bit counter, and produces 64-byte keystream blocks through 20 rounds of ARX (Addition, Rotation, XOR) operations.*

ChaCha20 is the stream cipher of choice in 2026. It is fast in software (no S-box lookups, no modular arithmetic beyond 32-bit addition), resistant to timing attacks (all operations are constant-time by construction), and free from RC4's biases. ChaCha20 paired with Poly1305 for authentication is the ChaCha20-Poly1305 AEAD scheme standardised in RFC 8439.

Usage:

- TLS 1.3 (alongside AES-GCM).
- WireGuard VPN.
- Mobile chat applications (Signal, WhatsApp's underlying Signal protocol).
- OpenSSH (since 6.5).

ChaCha20's design philosophy — small set of simple operations repeated many times — is the modern preference over RC4's compact-but-subtle design.

### Other modern stream ciphers

- **Salsa20** — ChaCha20's predecessor, by the same designer.
- **AES in CTR mode** — technically a stream cipher built from a block cipher.
- **SNOW 3G and ZUC** — used in 4G/LTE and 5G mobile encryption.
- **Trivium and Grain** — lightweight stream ciphers designed for resource-constrained devices, selected in the eSTREAM portfolio.

## 2.6 Attacks on symmetric-key cryptosystems and countermeasures

This section consolidates the attack categories applicable to symmetric ciphers and the defences against them. Some attacks were introduced earlier in context; this section organises them.

### Brute-force key search

The most general attack: try every possible key until decryption produces plausible plaintext. The work is $2^k$ for a $k$-bit key.

**Countermeasure.** Use a key long enough that $2^k$ is computationally infeasible. The current minimum is 128 bits for symmetric keys. 256 bits gives margin against future quantum attacks (Grover's algorithm halves the effective key length on a quantum computer, so 256-bit keys give 128-bit post-quantum security).

### Dictionary and rainbow-table attacks

When the key is derived from a low-entropy source (a human-chosen password), the effective key space is much smaller than the cipher's key space. An attacker tries common passwords first.

**Countermeasures.**

- **Strong key derivation.** Use a slow key-derivation function (PBKDF2, bcrypt, scrypt, Argon2) that makes each guess expensive.
- **Salt.** A random per-user salt prevents precomputed rainbow tables. The same password with different salts produces different derived keys.
- **Pepper.** A site-wide secret combined with each password, kept separately from the database. Forces an attacker to compromise both the database and the pepper.

### Known-plaintext and chosen-plaintext attacks

Discussed in Chapter 1. A cipher must be secure even when the attacker can obtain plaintext-ciphertext pairs (KPA) or choose plaintexts to encrypt (CPA).

**Countermeasures.**

- **Modern ciphers (AES, ChaCha20) are designed to resist these attacks.** AES has $2^{126}$ work for the best known attack — practically infeasible.
- **Use a random IV/nonce for each encryption.** Even with the same key and the same plaintext, different IVs produce different ciphertexts, so the attacker cannot accumulate identical-plaintext samples.

### Differential and linear cryptanalysis

Differential cryptanalysis (Biham-Shamir, 1990) looks at how differences in plaintexts propagate to differences in ciphertexts. Linear cryptanalysis (Matsui, 1993) finds linear approximations of the cipher that hold with probability slightly different from 1/2.

**Countermeasures.**

- **Designed-in resistance.** AES, Camellia, Serpent, and Twofish were all designed with differential and linear cryptanalysis in mind. Their S-boxes and round functions are constructed to defeat these attacks within the round count.
- **Adequate round counts.** Too few rounds and the cipher succumbs to reduced-round attacks. AES-128 uses 10 rounds; reduced-round AES-128 (down to 7 rounds) has known attacks but full AES does not.

### Meet-in-the-middle attacks

A time-memory trade-off attack against ciphers that compose two operations with independent keys. The attacker computes possible intermediate values from each end and looks for matches.

The classical example is double DES: although double DES has an effective 112-bit key, MITM reduces the attack work to about $2^{56}$ space and $2^{57}$ time, no better than single DES. This is why "3DES" rather than "2DES" became the standard.

**Countermeasures.**

- **Avoid simple cascades of independent ciphers.** Use a cipher with the desired security level directly, or use a triple-encryption with EDE structure (3DES-style) where MITM is more expensive.
- **Use ciphers with larger native key sizes.** AES-256 has no known better-than-brute-force attack; chaining is unnecessary.

### Birthday attacks on block-cipher modes

In CBC or CTR mode, the birthday bound applies: collisions in the ciphertext blocks become statistically likely after about $2^{n/2}$ blocks where $n$ is the block size. For 64-bit blocks (DES, 3DES) this is $2^{32}$ blocks (around 32 GB). For 128-bit blocks (AES) it is $2^{64}$ blocks (around 280 EB).

The **Sweet32** attack (2016) demonstrated practical exploitation against 3DES-CBC in HTTPS, recovering session cookies after capturing about 32 GB of ciphertext.

**Countermeasures.**

- **Use 128-bit-block ciphers (AES).**
- **Rekey frequently** if a 64-bit block cipher must be used.
- **Limit single-key data volume** for any block cipher according to the birthday bound.

### Padding-oracle attacks

When CBC mode is combined with a padding scheme (typically PKCS#7) and the decryption side leaks information about whether the padding was valid, an attacker can decrypt arbitrary ciphertext.

**Countermeasures.**

- **Use authenticated encryption (GCM, ChaCha20-Poly1305).** Authenticated modes verify the entire ciphertext before unpadding, defeating the oracle.
- **If CBC must be used, encrypt-then-MAC.** Compute a MAC over the ciphertext after encryption. Verify the MAC before any unpadding. The MAC verification is the oracle the attacker would need, and a constant-time MAC verification leaks nothing.
- **Make padding verification constant-time** so timing differences cannot be exploited.

### Nonce-reuse attacks

For CTR, GCM, and stream ciphers in general, reusing a nonce with the same key is catastrophic. The keystream is identical, and $C_1 \oplus C_2 = P_1 \oplus P_2$.

**Countermeasures.**

- **Use a counter that strictly increments.** Many protocols use a sequence number combined with a session identifier.
- **Use a sufficiently large random nonce.** A 96-bit random nonce has collision probability about $2^{-48}$ after $2^{32}$ messages — usually safe but not for very high-volume use.
- **Use a misuse-resistant mode.** AES-GCM-SIV (RFC 8452) tolerates nonce reuse — the security degrades but does not catastrophically break.

### Side-channel attacks

Discussed in Chapter 1. The implementation leaks information through timing, power, cache behaviour, electromagnetic emanation, or acoustics.

**Countermeasures.**

- **Constant-time implementations.** All cryptographic operations should run in the same time regardless of secret values. Modern AES implementations use AES-NI hardware instructions which are constant-time, or bit-sliced software implementations.
- **Power-analysis countermeasures.** Masking (randomising the intermediate values), shuffling the order of operations, hiding (making the power signature uniform).
- **Cache-attack countermeasures.** Avoid secret-dependent memory accesses; use AES-NI or bit-slicing.
- **Physical countermeasures.** Tamper-resistant hardware, shielded enclosures, dedicated cryptographic modules (HSMs).

### Fault attacks

Inducing a fault in the cryptographic computation and analysing the resulting incorrect output. Common against smart cards and embedded devices.

**Countermeasures.**

- **Double-checking.** Encrypt-then-decrypt-and-compare to detect computation errors.
- **Hardware fault detection.** Sensors that detect voltage glitches, clock glitches, laser exposure, abnormal temperatures.
- **Redundant computation.** Run the operation twice and compare.

### Implementation bugs

Most real-world cryptographic failures are not breaks of the cipher but bugs in the surrounding code:

- The **Debian OpenSSL randomness bug (2008).** A maintainer removed a line that contributed entropy to the PRNG, reducing the effective key space to about 15 bits. Years of generated keys had to be revoked and replaced.
- **Heartbleed (2014).** A bounds-checking bug in OpenSSL's TLS heartbeat implementation let attackers read arbitrary server memory, including private keys.
- **The ROCA attack (2017).** A flaw in Infineon's RSA key-generation library let attackers recover private keys from public keys; affected Estonian e-ID cards, TPM chips, smart cards.

**Countermeasures.**

- **Use established cryptographic libraries.** Do not "roll your own crypto" — the saying that "anyone can design a cipher they themselves cannot break" applies here. Use OpenSSL, BoringSSL, libsodium, mbedTLS — libraries that have had years of public review.
- **Keep libraries updated.** Vulnerabilities like Heartbleed are patched; deployments that lag fall behind.
- **Audit and test.** Static analysis, fuzzing, formal verification where feasible. The recent libcrux and rust-tls projects use Rust's memory safety and aim for formal verification.

## 2.7 Principles of public-key cryptography

*Public-key cryptography (also called asymmetric cryptography) is the class of cryptographic schemes that use a pair of mathematically related keys — a public key that may be freely shared and a private key that the owner keeps secret — designed so that operations performed with one key can be reversed only by the other.*

The 1976 paper by Whitfield Diffie and Martin Hellman that introduced public-key cryptography was titled, with deliberate ambition, *New Directions in Cryptography*. It changed the field permanently. Before 1976, every two parties who wanted to communicate securely had to share a secret key in advance — a problem of key distribution that was the central bottleneck of military, diplomatic, and commercial cryptography. After 1976, two parties who had never met could establish a secure channel over an insecure network. The entire architecture of the modern Internet rests on this idea.

### The two big problems public-key cryptography solves

**Key distribution.** With symmetric cryptography, before Alice and Bob can communicate, they must somehow exchange a shared secret. For $n$ users wanting to talk pairwise, $n(n-1)/2$ keys are needed. For 1000 users, that is half a million keys. For Internet-scale communication, key distribution this way is impossible.

Public-key cryptography reduces the problem to publishing each user's public key once. Anyone can find Alice's public key (in a directory, in a certificate, in an email signature) and encrypt to her. Alice's private key never leaves her possession.

**Digital signatures.** Symmetric MACs provide integrity and authenticity but not non-repudiation — both parties hold the same key. With public-key cryptography, Alice signs with her private key; Bob (or anyone) verifies with her public key. Only Alice could have produced the signature.

### What asymmetric keys must satisfy

For a public-key encryption scheme:

- **Key generation.** Alice runs a procedure that produces a key pair $(pk, sk)$. The public key $pk$ can be published; the secret key $sk$ must be kept private.
- **Encryption.** Anyone can compute $C = E_{pk}(P)$ for a plaintext $P$.
- **Decryption.** Only Alice can compute $P = D_{sk}(C)$.
- **Security.** Given $pk$, computing $sk$ must be computationally infeasible. Given $pk$ and $C$, recovering $P$ must be computationally infeasible.

For a digital signature scheme:

- **Key generation.** Alice produces a key pair $(pk, sk)$.
- **Signing.** Alice computes $\sigma = \text{Sign}_{sk}(M)$ for message $M$.
- **Verification.** Anyone can compute $\text{Verify}_{pk}(M, \sigma)$ which returns true if $\sigma$ is a valid signature on $M$.
- **Security.** Without $sk$, producing a valid $\sigma$ for any new message must be computationally infeasible.

### Trapdoor one-way functions

Public-key cryptography rests on a special class of mathematical functions:

*A trapdoor one-way function is a function that is easy to compute in one direction, computationally infeasible to invert without a secret value (the trapdoor), and easy to invert if the trapdoor is known.*

The public key encodes the function. The private key is the trapdoor. Encryption is forward computation; decryption uses the trapdoor.

Three trapdoor problems underlie nearly all deployed public-key cryptography:

**Integer factorisation problem.** Given a large composite integer $n$, find its prime factors. Easy if you know one factor (just divide). Hard if you don't. RSA is built on this.

**Discrete logarithm problem (DLP).** Given a finite cyclic group with a generator $g$, and given an element $h = g^x$ in the group, find $x$. Easy to compute $h$ from $g$ and $x$ (modular exponentiation). Hard to compute $x$ from $g$ and $h$. Diffie-Hellman and DSA are built on this.

**Elliptic curve discrete logarithm problem (ECDLP).** The DLP on an elliptic curve group. Believed harder than the DLP on multiplicative groups of integers modulo a prime — which is why ECC achieves comparable security with much smaller keys. ECDSA, ECDH, and EdDSA are built on this.

A fourth problem — the **lattice problem** — underlies the post-quantum schemes selected by NIST in 2024 (ML-KEM, ML-DSA). Chapter 7 returns to this.

### Hybrid encryption — the practical pattern

Asymmetric ciphers are slow — roughly three orders of magnitude slower than symmetric ciphers. They are also limited in the size of message they can encrypt directly (RSA can encrypt at most one block smaller than the modulus). Almost no real system encrypts bulk data directly with public-key cryptography.

The universal pattern is **hybrid encryption**:

1. Alice generates a fresh random symmetric key $K$.
2. Alice encrypts the bulk data with $K$ using a fast symmetric cipher (AES-GCM).
3. Alice encrypts $K$ with Bob's public key.
4. Alice sends both ciphertexts to Bob.
5. Bob decrypts $K$ with his private key.
6. Bob decrypts the bulk data with $K$.

TLS, IPsec, PGP, S/MIME, OpenSSH — every major real-world protocol uses this pattern. The asymmetric crypto runs once per session to establish the symmetric key; the symmetric crypto handles all the data.

### Authenticity and non-repudiation through signatures

For signing, Alice computes a hash of the message and then performs the private-key operation on the hash:

$$
\sigma = \text{Sign}_{sk}(\text{H}(M))
$$

Verification computes the same hash and uses the public key to check the signature:

$$
\text{Verify}_{pk}(M, \sigma) = (\text{H}(M) \stackrel{?}{=} \text{PubOp}_{pk}(\sigma))
$$

The hash function is essential — without it, signatures would be limited to one block of input and would be vulnerable to existential forgery attacks. Chapter 3 covers hash functions.

### Authentication of public keys — the Achilles' heel

Public-key cryptography solves key distribution but introduces a new problem: how does Alice know that the public key she got really belongs to Bob? An attacker who can substitute their own public key for Bob's becomes a man-in-the-middle.

The standard answer is a **certificate** — a public key bound to an identity by the signature of a trusted third party (a Certificate Authority). PKI, the system that makes this work at scale, is the subject of Chapter 4.

### Public-key cryptography in practice

The deployed public-key algorithms in 2026:

- **RSA** — still the most widely deployed, especially in legacy systems. Standard key sizes 2048 bits (current minimum) and 3072–4096 bits (long-term security).
- **Elliptic Curve Diffie-Hellman (ECDH)** — used in modern TLS, IPsec, SSH for key exchange. Curve25519 and NIST P-256 are the common curves.
- **Elliptic Curve Digital Signature Algorithm (ECDSA)** — used in TLS, code signing, Bitcoin, modern e-passports.
- **EdDSA (Ed25519, Ed448)** — modern signature scheme with stronger design properties than ECDSA. Used in newer protocols (SSH since 6.5, WireGuard, modern TLS).
- **ML-KEM (Kyber)** — post-quantum KEM standardised in FIPS 203 (2024). Being deployed in hybrid TLS by Google, Cloudflare, AWS.
- **ML-DSA (Dilithium)** — post-quantum signature standardised in FIPS 204 (2024). Integration into protocols is in active development.

The next sections cover Diffie-Hellman, RSA, and ECC in detail.

## 2.8 Diffie-Hellman key exchange

*The Diffie-Hellman key exchange is the cryptographic protocol, published by Whitfield Diffie and Martin Hellman in 1976, by which two parties communicating over an insecure channel can establish a shared secret key without ever transmitting it, with the security resting on the difficulty of computing discrete logarithms in a finite cyclic group.*

The Diffie-Hellman exchange does not encrypt anything itself. It produces a shared secret that the two parties then use as a symmetric key. It is the universal answer to the question "how do two parties who have never met agree on a key without an eavesdropper learning it?"

### The mathematics

The protocol works in a cyclic group where the **discrete logarithm problem** is hard. The classical group is the multiplicative group of integers modulo a large prime $p$, with a generator $g$.

The setup:

- Both parties agree publicly on a large prime $p$ and a generator $g$ of the multiplicative group $\mathbb{Z}_p^*$. These can be standardised — RFC 7919 and earlier RFCs published specific "named groups" so parties do not have to negotiate fresh values.
- Alice picks a random secret $a$ with $1 \leq a < p-1$ and computes $A = g^a \mod p$. She sends $A$ to Bob.
- Bob picks a random secret $b$ similarly and computes $B = g^b \mod p$. He sends $B$ to Alice.
- Alice computes the shared secret $s = B^a \mod p$.
- Bob computes the shared secret $s = A^b \mod p$.

Both arrive at the same value because:

$$
B^a = (g^b)^a = g^{ab} = (g^a)^b = A^b \pmod{p}
$$

The eavesdropper sees $p$, $g$, $A$, and $B$, but to compute $s = g^{ab}$, the eavesdropper would need to find $a$ from $A$ (or $b$ from $B$) — the discrete logarithm problem. For a large enough prime, this is computationally infeasible.

### A toy worked example

Real Diffie-Hellman uses primes of 2048 to 3072 bits. For illustration, use tiny numbers.

Setup: $p = 23$, $g = 5$.

Alice picks $a = 6$. She computes $A = 5^6 \mod 23$.

$5^2 = 25 \equiv 2 \pmod{23}$.
$5^4 = (5^2)^2 = 2^2 = 4 \pmod{23}$.
$5^6 = 5^4 \cdot 5^2 = 4 \cdot 2 = 8 \pmod{23}$.

Alice sends $A = 8$ to Bob.

Bob picks $b = 15$. He computes $B = 5^{15} \mod 23$.

$5^{15} = 5^{8} \cdot 5^{4} \cdot 5^{2} \cdot 5^{1}$.
$5^8 = 4^2 = 16 \pmod{23}$.
So $5^{15} = 16 \cdot 4 \cdot 2 \cdot 5 = 640 \pmod{23}$. $640 = 27 \cdot 23 + 19$, so $5^{15} \equiv 19 \pmod{23}$.

Bob sends $B = 19$ to Alice.

Alice computes $s = B^a \mod p = 19^6 \mod 23$.
$19 \equiv -4 \pmod{23}$, so $19^6 = (-4)^6 = 4^6 = 4096$. $4096 = 178 \cdot 23 + 2$, so $19^6 \equiv 2 \pmod{23}$.

Bob computes $s = A^b \mod p = 8^{15} \mod 23$.
$8 = 2^3$, so $8^{15} = 2^{45}$. By Fermat's little theorem, $2^{22} \equiv 1 \pmod{23}$, so $2^{45} = 2^{22} \cdot 2^{22} \cdot 2 \equiv 1 \cdot 1 \cdot 2 = 2 \pmod{23}$.

Both Alice and Bob get $s = 2$. They now share a secret that no eavesdropper, knowing only $p = 23$, $g = 5$, $A = 8$, $B = 19$, can easily compute.

For a real exchange, $p$ would be 2048 bits or more, $a$ and $b$ would be 256 bits or more, and the shared secret would feed into a key-derivation function to produce the actual symmetric encryption key.

### Security properties

**Security against passive eavesdroppers.** The eavesdropper has $A = g^a$, $B = g^b$, $p$, $g$, and wants $g^{ab}$. Computing $a$ from $A$ requires solving the discrete logarithm problem; the **Computational Diffie-Hellman (CDH) problem** says that even without solving DLP, computing $g^{ab}$ from $g^a$ and $g^b$ is hard.

**Perfect forward secrecy (when ephemeral).** If Alice and Bob generate fresh random $a$ and $b$ for every session (Ephemeral Diffie-Hellman, DHE or ECDHE), an attacker who later steals their long-term keys cannot decrypt past sessions. The session secret was never stored after the session ended. TLS 1.3 makes DHE/ECDHE mandatory specifically for this reason.

**Group choice matters.** The prime $p$ must be a **safe prime** ($p = 2q + 1$ where $q$ is also prime) or its subgroup of prime order must be used. Otherwise, the **Pohlig-Hellman attack** can compute discrete logarithms in the small subgroups and combine them via the Chinese Remainder Theorem to find $a$.

### Vulnerabilities

**Lack of authentication.** Plain Diffie-Hellman has no authentication. Mallory in the middle can run two separate DH exchanges — one with Alice (pretending to be Bob) and one with Bob (pretending to be Alice). Mallory ends up with two shared secrets (one with each), reads everything by translating between them, and neither Alice nor Bob detects it.

The countermeasure is **authenticated Diffie-Hellman** — Alice and Bob sign their DH public values with their long-term keys, or use a pre-shared secret to authenticate the exchange. TLS combines DH with the server's certificate-signed identity. SSH does the same with host keys.

**Small subgroup confinement attacks.** If Alice picks $a$ inside a small subgroup of $\mathbb{Z}_p^*$, the eavesdropper can recover information about $a$ by checking which subgroup the result belongs to. The fix is to validate received DH public values (check that $B$ is in the correct subgroup) and to use safe primes.

**Logjam attack (2015).** Adrian et al. showed that many TLS servers in 2014–15 supported "export-grade" 512-bit DH parameters and that, with $2^{63}$ work per prime, an attacker could precompute logarithms in a specific small prime and then break sessions using it in real time. About 8% of the top million HTTPS sites were vulnerable. The fix was to remove export-grade DH from TLS and to standardise on at least 2048-bit DH parameters.

**Weak parameter generation.** Some implementations used the same DH parameters across many deployments, sharing the "precomputation target" with attackers. Logjam's analysis specifically exploited this — a single $2^{63}$ precomputation broke many sessions. RFC 7919 standardised named groups, all sufficiently large, to address this.

### Variants

**Static DH** — long-term DH keys. Provides no forward secrecy. Rarely used in modern protocols.

**Ephemeral DH (DHE)** — fresh DH keys every session. Provides forward secrecy. Standard in TLS, IPsec, SSH.

**Anonymous DH (ADH)** — DH without authentication. Vulnerable to MITM. Deprecated in modern protocols.

**Authenticated DH** — DH combined with certificate-based or pre-shared-key authentication. Standard.

**Elliptic Curve Diffie-Hellman (ECDH)** — DH using point operations on an elliptic curve instead of modular exponentiation. Discussed in Section 2.10. Smaller keys, faster operations, same security.

In TLS 1.3 the only key-exchange mechanisms allowed are (EC)DHE — ephemeral, providing perfect forward secrecy. Static DH and static RSA key exchange (which also lacked forward secrecy) were removed.

## 2.9 RSA

*RSA is the public-key cryptosystem invented by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT in 1977 and published in 1978, based on the practical difficulty of factoring the product of two large prime numbers, used for public-key encryption, digital signatures, and key exchange.*

RSA is the most widely deployed public-key algorithm in history. It is in TLS certificates, in PGP, in SSH host keys, in document signing, in code signing, in banking transactions, in e-passports. Even where modern protocols prefer elliptic curve cryptography, RSA remains entrenched in the certificate hierarchy and in legacy systems.

### The mathematical setup

RSA security rests on the difficulty of the **integer factorisation problem**: given a large integer $n$ that is the product of two large primes $p$ and $q$, find $p$ and $q$.

The numbers involved:

- Two large primes $p$ and $q$, each typically 1024 to 1536 bits.
- The modulus $n = p \cdot q$, of size 2048 to 3072 bits.
- Euler's totient $\phi(n) = (p-1)(q-1)$, the number of integers between 1 and $n-1$ that are coprime to $n$.
- The public exponent $e$, typically a small value like $65537 = 2^{16} + 1$.
- The private exponent $d$, satisfying $e \cdot d \equiv 1 \pmod{\phi(n)}$. Equivalently, $d$ is the modular inverse of $e$ modulo $\phi(n)$.

The public key is $(n, e)$. The private key is $d$ (or, more practically, $(p, q, d)$ for fast decryption using the Chinese Remainder Theorem).

### Key generation

1. Choose two large random primes $p$ and $q$ of approximately equal length. Standard cryptographic libraries use the Miller-Rabin primality test after sampling random odd numbers in the right range.
2. Compute $n = p \cdot q$.
3. Compute $\phi(n) = (p-1)(q-1)$.
4. Choose a public exponent $e$ with $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$. The standard choice is $e = 65537$ — it is large enough to defeat low-exponent attacks, has only two 1-bits in its binary representation (so encryption is fast), and is small enough to be transmitted compactly.
5. Compute $d = e^{-1} \mod \phi(n)$. The extended Euclidean algorithm gives this.
6. Public key: $(n, e)$. Private key: $d$. Keep $p$ and $q$ secret (and ideally discard them, though most implementations keep them for CRT-based decryption).

### Encryption and decryption

To encrypt a message $m$ (where $0 \leq m < n$):

$$
c = m^e \mod n
$$

To decrypt:

$$
m = c^d \mod n
$$

Correctness comes from Euler's theorem: $m^{\phi(n)} \equiv 1 \pmod{n}$ when $\gcd(m, n) = 1$. Since $e \cdot d = 1 + k \cdot \phi(n)$ for some integer $k$:

$$
c^d = m^{ed} = m^{1 + k \phi(n)} = m \cdot (m^{\phi(n)})^k \equiv m \cdot 1 = m \pmod{n}
$$

### Signing and verification

For digital signatures, the operations are swapped:

$$
\sigma = m^d \mod n \quad \text{(signing, with private key)}
$$

$$
\text{Verify: check } \sigma^e \equiv m \pmod{n} \quad \text{(verification, with public key)}
$$

In practice, neither the message nor the signature is used raw. The message is hashed first, and the result is wrapped in a padding scheme (PKCS#1 v1.5 in legacy systems, PSS in modern systems) before the RSA operation.

### A worked RSA example

For illustration, with very small primes.

**Key generation.** Let $p = 17$, $q = 11$. Then:

- $n = 17 \cdot 11 = 187$.
- $\phi(n) = 16 \cdot 10 = 160$.
- Choose $e = 7$ (must be coprime to 160; $\gcd(7, 160) = 1$, so this works).
- Find $d$ such that $7d \equiv 1 \pmod{160}$. Using the extended Euclidean algorithm:
  - $160 = 22 \cdot 7 + 6$
  - $7 = 1 \cdot 6 + 1$
  - $6 = 6 \cdot 1 + 0$
  - Back-substitute: $1 = 7 - 1 \cdot 6 = 7 - 1 \cdot (160 - 22 \cdot 7) = 23 \cdot 7 - 1 \cdot 160$.
  - So $d = 23$.
- Public key: $(n, e) = (187, 7)$. Private key: $d = 23$.

**Encryption.** Suppose Alice wants to send the message $m = 88$ to Bob.

$c = 88^7 \mod 187$.

Compute step by step:
- $88^2 = 7744$. $7744 \mod 187$: $187 \cdot 41 = 7667$, so $7744 - 7667 = 77$. Thus $88^2 \equiv 77 \pmod{187}$.
- $88^4 = 77^2 = 5929$. $5929 \mod 187$: $187 \cdot 31 = 5797$, so $5929 - 5797 = 132$. Thus $88^4 \equiv 132 \pmod{187}$.
- $88^7 = 88^4 \cdot 88^2 \cdot 88 = 132 \cdot 77 \cdot 88$. Step by step:
  - $132 \cdot 77 = 10164$. $10164 \mod 187$: $187 \cdot 54 = 10098$, so $10164 - 10098 = 66$. Thus $132 \cdot 77 \equiv 66 \pmod{187}$.
  - $66 \cdot 88 = 5808$. $5808 \mod 187$: $187 \cdot 31 = 5797$, so $5808 - 5797 = 11$. Thus $66 \cdot 88 \equiv 11 \pmod{187}$.

So $c = 11$. Alice sends 11 to Bob.

**Decryption.** Bob computes $m = c^d \mod n = 11^{23} \mod 187$.

- $11^2 = 121$.
- $11^4 = 121^2 = 14641$. $14641 \mod 187$: $187 \cdot 78 = 14586$, so $14641 - 14586 = 55$. Thus $11^4 \equiv 55 \pmod{187}$.
- $11^8 = 55^2 = 3025$. $3025 \mod 187$: $187 \cdot 16 = 2992$, so $3025 - 2992 = 33$. Thus $11^8 \equiv 33 \pmod{187}$.
- $11^{16} = 33^2 = 1089$. $1089 \mod 187$: $187 \cdot 5 = 935$, so $1089 - 935 = 154$. Thus $11^{16} \equiv 154 \pmod{187}$.
- $11^{23} = 11^{16} \cdot 11^4 \cdot 11^2 \cdot 11^1 = 154 \cdot 55 \cdot 121 \cdot 11$.
  - $154 \cdot 55 = 8470$. $8470 \mod 187$: $187 \cdot 45 = 8415$, so $8470 - 8415 = 55$.
  - $55 \cdot 121 = 6655$. $6655 \mod 187$: $187 \cdot 35 = 6545$, so $6655 - 6545 = 110$.
  - $110 \cdot 11 = 1210$. $1210 \mod 187$: $187 \cdot 6 = 1122$, so $1210 - 1122 = 88$.

So $m = 88$ — the original message. Decryption succeeded.

This example used 8-bit numbers and could be brute-forced trivially. Real RSA uses 2048-bit modulus values where the same arithmetic still works but the security comes from the size.

### Why never use textbook RSA

The bare $c = m^e \mod n$ operation has multiple problems:

- **Deterministic.** The same plaintext always encrypts to the same ciphertext. An attacker can encrypt candidate plaintexts and compare.
- **Multiplicative.** $E(m_1) \cdot E(m_2) = (m_1 m_2)^e = E(m_1 \cdot m_2)$. This lets attackers manipulate ciphertexts.
- **Low-exponent attacks.** If $e$ is small (3) and the message is short, $m^3$ might be smaller than $n$, and the attacker can take an ordinary cube root.
- **Common-modulus attacks.** Using the same $n$ for multiple users is dangerous.

The standard solution is **padding**. Practical RSA encryption uses **RSA-OAEP** (Optimal Asymmetric Encryption Padding, Bellare-Rogaway 1994, in PKCS#1 v2). Practical RSA signing uses **RSA-PSS** (Probabilistic Signature Scheme).

Older padding schemes like PKCS#1 v1.5 are known to be vulnerable — Bleichenbacher's 1998 attack and its variants (ROBOT, 2017) recovered private session keys from real TLS servers. Modern designs use OAEP and PSS exclusively.

### Key length considerations

RSA's security degrades against improvements in factoring algorithms and computing power. The benchmark factoring algorithm is the **General Number Field Sieve (GNFS)**, with sub-exponential complexity.

Current recommendations:

- **1024-bit RSA:** broken. Should not be used. The RSA-768 challenge (768-bit modulus) was factored in 2009; 1024-bit factoring is believed to be within reach of well-funded attackers.
- **2048-bit RSA:** current minimum for new deployments. Considered secure until roughly 2030 against classical attack.
- **3072-bit RSA:** recommended for long-term security (security parameter 128 bits, comparable to AES-128).
- **4096-bit RSA:** extra margin; commonly used in code signing and certificate authorities.
- **15360-bit RSA:** would be required to match AES-256 security. Impractical to use in normal traffic.

The slow growth of practical RSA key sizes is one of the reasons ECC and post-quantum cryptography have become attractive.

### Applications

RSA appears in:

- **TLS certificates.** The certificate's public key is often RSA (with ECDSA increasingly common). The certificate is signed by a CA's private key.
- **PGP and S/MIME email signing and encryption.**
- **SSH host keys and user keys** (though Ed25519 is now preferred in new deployments).
- **Code signing.** Operating system updates, application installers, and driver packages are signed with RSA keys.
- **Document signing.** PDF signatures, smart-card-based digital identity (the Estonian e-ID card used RSA; affected by ROCA in 2017, which forced a mass re-issuance).
- **Bitcoin and other cryptocurrencies** use ECDSA, not RSA, but many enterprise blockchain systems use RSA.

In Nepal, RSA is the foundation of every HTTPS-enabled `.gov.np` and commercial site, every SSH connection to a server, every signed Windows or Android update arriving on a user's device.

## 2.10 Elliptic curve cryptography

*Elliptic Curve Cryptography (ECC) is the family of public-key cryptosystems based on the algebraic structure of elliptic curves over finite fields, in which the hard problem is the elliptic curve discrete logarithm — finding the integer $k$ given two points $P$ and $Q = kP$ on the curve.*

ECC offers the same security as RSA at much smaller key sizes. A 256-bit elliptic curve provides about 128 bits of security — comparable to 3072-bit RSA. The smaller keys, faster operations, and lower bandwidth make ECC the preferred choice for mobile, IoT, and high-volume server applications.

### What an elliptic curve is

An elliptic curve over a field $\mathbb{F}$ is the set of points $(x, y)$ satisfying an equation of the form:

$$
y^2 = x^3 + ax + b
$$

plus a special "point at infinity" $\mathcal{O}$ that serves as the identity element.

For cryptography we use elliptic curves over **finite fields** — either prime fields $\mathbb{F}_p$ or binary fields $\mathbb{F}_{2^m}$. The points form an abelian group under a geometric operation called **point addition**.

### Point addition

To add two points $P$ and $Q$ on the curve:

- **If $P \neq Q$:** Draw the straight line through $P$ and $Q$. It intersects the curve at a third point $R'$. Reflect $R'$ across the x-axis to get $R = P + Q$.
- **If $P = Q$ (point doubling):** Use the tangent line at $P$. It intersects the curve at one other point $R'$. Reflect to get $2P$.
- **The special cases:** If $P = -Q$ (vertical line through both), the sum is $\mathcal{O}$ (the point at infinity).

The addition formulas, when expressed algebraically over $\mathbb{F}_p$, involve modular addition, multiplication, and inversion. They are straightforward to implement but require care to be constant-time.

### Scalar multiplication

The fundamental operation in ECC is **scalar multiplication**: $kP$ means adding $P$ to itself $k$ times. Just as modular exponentiation $g^k$ is the basic operation in classical Diffie-Hellman, $kP$ is the basic operation in ECC.

Scalar multiplication is computed efficiently using the double-and-add algorithm (the analogue of square-and-multiply for exponentiation): a $k$-bit scalar takes about $k$ doublings and $k/2$ additions on average.

### The Elliptic Curve Discrete Logarithm Problem (ECDLP)

*Given a base point $G$ on an elliptic curve, and another point $Q = kG$ on the same curve, find the integer $k$.*

Scalar multiplication ($G \to kG$) is easy. The inverse — recovering $k$ from $Q$ and $G$ — is the ECDLP.

The fastest known algorithms for ECDLP on a well-chosen curve are generic algorithms (Pollard's rho), with running time about $\sqrt{n}$ where $n$ is the order of $G$. For a 256-bit curve, $\sqrt{n} \approx 2^{128}$ — computationally infeasible.

The "well-chosen" qualifier matters. Curves with special algebraic structure (anomalous curves, supersingular curves, curves with small embedding degree) admit faster attacks. NIST and other standards bodies have published a small number of curves that have been extensively studied.

### Common curves

**NIST P-256 (also called secp256r1, prime256v1).** A 256-bit curve over a prime field. The most widely deployed ECC curve in TLS, used for ECDH and ECDSA. Specified by NIST in FIPS 186.

**NIST P-384 and P-521.** Larger curves for higher security margins.

**Curve25519 (Daniel J. Bernstein, 2006).** A Montgomery curve over the prime field $\mathbb{F}_{2^{255} - 19}$. Designed for performance and simplicity, immune to several common implementation pitfalls. Used in TLS 1.3, WireGuard, SSH (Ed25519), Signal, modern apps. The companion signature scheme is Ed25519.

**Curve448 (Hamburg, 2015).** A larger Bernstein-style curve for 224-bit security.

**Brainpool curves.** A family of European-standardised curves; less common globally but used in some government and financial systems in the EU.

**secp256k1.** The curve used by Bitcoin and Ethereum. Different parameter choices from NIST P-256; chosen partly to allow efficient scalar multiplication via "endomorphisms."

### Key generation in ECC

For ECDH or ECDSA on a curve with base point $G$ of order $n$:

1. Generate a random integer $d$ with $1 \leq d < n$ (the private key).
2. Compute $Q = dG$ (the public key — a point on the curve).
3. Publish $Q$, keep $d$ secret.

Compared to RSA, ECC key generation is dramatically faster — no need to search for primes, no Euler totient calculation. It is essentially just one scalar multiplication.

### Elliptic Curve Diffie-Hellman (ECDH)

The DH protocol on an elliptic curve.

- Alice picks $d_A$, computes $Q_A = d_A G$. Sends $Q_A$.
- Bob picks $d_B$, computes $Q_B = d_B G$. Sends $Q_B$.
- Alice computes $S = d_A Q_B = d_A d_B G$.
- Bob computes $S = d_B Q_A = d_A d_B G$.

The shared point $S$ — or more practically, one coordinate of $S$ fed through a key-derivation function — becomes the symmetric key.

X25519 is ECDH on Curve25519 with specific encoding rules; it is the most widely used ECDH variant in 2026.

### Elliptic Curve Digital Signature Algorithm (ECDSA)

ECDSA is the elliptic-curve version of DSA. To sign a message $M$:

1. Compute $h = H(M)$ (typically SHA-256).
2. Pick a random $k$ with $1 \leq k < n$.
3. Compute $R = kG = (x_R, y_R)$. Let $r = x_R \mod n$.
4. Compute $s = k^{-1}(h + d \cdot r) \mod n$.
5. The signature is $(r, s)$.

To verify $(r, s)$ on $M$ with public key $Q$:

1. Compute $h = H(M)$.
2. Compute $w = s^{-1} \mod n$.
3. Compute $u_1 = h \cdot w \mod n$ and $u_2 = r \cdot w \mod n$.
4. Compute the point $P = u_1 G + u_2 Q$.
5. Accept if $x_P \mod n = r$.

**The fatal nonce-reuse rule.** ECDSA's random value $k$ must be unique per signature. If $k$ is reused for two signatures with the same private key, the private key can be recovered by simple algebra. The 2010 PlayStation 3 firmware-signing key recovery, by the fail0verflow team, exploited exactly this — Sony's signing code used a constant $k$. The same flaw has reappeared multiple times in cryptocurrency wallet implementations.

The countermeasure is **deterministic ECDSA** (RFC 6979) — derive $k$ deterministically from the message and the private key, with no random number generator involvement. Many modern libraries (libsodium, OpenSSL since 3.0) use deterministic ECDSA by default.

**EdDSA (Edwards-curve DSA).** A modern signature scheme by Bernstein et al., used with Curve25519 (Ed25519) and Curve448 (Ed448). Always deterministic, designed to be implementation-mistake-resistant, twice as fast as ECDSA. Used in modern SSH, in WireGuard, in newer code-signing systems, and increasingly in TLS certificates.

### Parameter selection

The choice of elliptic curve parameters is critical and is one place where ECC has more pitfalls than RSA. Bad curves admit attacks far faster than $\sqrt{n}$.

**Standard practice:** use a named curve from a reputable standards body. Curve25519, Ed25519, NIST P-256, NIST P-384 are the current safe choices. Generating one's own curve parameters is strongly discouraged.

**The Dual_EC_DRBG saga.** The Dual Elliptic Curve Deterministic Random Bit Generator, a NIST-standardised RNG using elliptic curves, was suspected of containing an NSA-engineered backdoor — the standardised curve points were possibly chosen so that whoever knew the relationship could predict the RNG's output. NIST withdrew the standard in 2014 after the Snowden disclosures. The episode is a permanent reminder that "parameter selection" includes deciding whom to trust to choose parameters.

**Curve25519 was designed specifically to avoid these issues.** Its parameters are derived from simple constants (the field is $2^{255} - 19$) with no room for hidden backdoors. The community's confidence in Curve25519 is partly due to this auditability.

### Why ECC over RSA

The benefits of ECC compared to RSA:

| | RSA-2048 | ECC P-256 / Curve25519 |
|---|---|---|
| Security level | 112 bits | 128 bits |
| Public key size | 256 bytes | 32 bytes |
| Signature size | 256 bytes | 64 bytes |
| Key generation | Slow (find primes) | Fast (one scalar mult) |
| Signing speed | Moderate | Fast |
| Verification speed | Fast | Moderate |

ECC's smaller keys and faster operations are the reasons it has become the default in new protocols. Modern TLS handshakes use ECDHE-ECDSA (Curve25519 + Ed25519 or P-256) as the preferred cipher suite.

The one area where RSA still has an advantage is verification speed when the public exponent is small (65537). Some high-volume HTTPS deployments still use RSA certificates for this reason. The post-quantum migration is the next major shift.

## 2.11 Attacks on asymmetric-key cryptosystems and countermeasures

Asymmetric ciphers face a different class of attacks from symmetric ciphers. The mathematics is more delicate, the implementation pitfalls are more subtle, and the consequences of a single bad key or a single bad parameter are more severe. This section organises the attacks against RSA, DH, and ECC and the standard countermeasures.

### Attacks on the underlying mathematical problems

The most direct attack is to solve the hard problem the cipher rests on.

**Factoring RSA moduli.** The General Number Field Sieve (GNFS) is the asymptotically fastest known classical algorithm. The largest publicly factored RSA modulus is RSA-250 (829 bits, factored in 2020). The work for 1024-bit factoring is believed to be within reach of nation-state attackers; 2048-bit factoring is well beyond current capability.

**Computing classical discrete logarithms.** For DH in $\mathbb{Z}_p^*$, GNFS-style algorithms work similarly to factoring. A 2048-bit safe prime gives roughly the same security as a 2048-bit RSA modulus.

**Computing elliptic-curve discrete logarithms.** Pollard's rho on a properly-chosen curve is the fastest known attack, with running time $\sqrt{n}$. For a 256-bit curve, this is $2^{128}$ work.

**Quantum attacks.** Shor's algorithm, on a sufficiently large quantum computer, can solve factoring and discrete logarithm (both classical and elliptic-curve) in polynomial time. No quantum computer of sufficient size exists yet — current devices have a few hundred to a few thousand noisy qubits, far short of the millions of error-corrected qubits needed for cryptographically relevant factoring. But "store now, decrypt later" — recording encrypted traffic today and decrypting it in 15 years when quantum computers exist — is a real threat model for long-lived secrets. The countermeasure is post-quantum cryptography (Chapter 7).

**Countermeasures.**

- Use key sizes that resist known classical algorithms with margin: 2048+-bit RSA, 256+-bit ECC.
- For long-term secrets, begin migration to post-quantum or hybrid (classical + PQC) cryptography. Google, Cloudflare, AWS, and Apple have deployed hybrid X25519 + ML-KEM (Kyber) in production TLS as of 2024–25.

### Padding attacks on RSA

**Bleichenbacher's attack (1998).** Daniel Bleichenbacher showed that PKCS#1 v1.5 padding combined with a server that reveals whether a decrypted ciphertext has valid padding (through an error message, a different response time, or any side channel) lets an attacker decrypt a single target ciphertext after about one million queries to the server. The attack worked against real SSL/TLS servers in 1998 and has periodically resurfaced — DROWN (2016), ROBOT (2017) showed that many servers were still vulnerable to variants of the attack two decades later.

**Countermeasures.**

- Use RSA-OAEP (PKCS#1 v2) instead of PKCS#1 v1.5.
- If PKCS#1 v1.5 must be used (for legacy compatibility), implement constant-time padding handling that does not distinguish valid from invalid padding to any observer.
- TLS 1.3 removed static RSA key exchange entirely, eliminating this attack class for the protocol.

### Low-exponent attacks on RSA

**Small public exponent $e$ on the same message to multiple recipients.** Hastad's broadcast attack — if Alice encrypts the same message $m$ to three recipients with $e = 3$ and three different moduli, the attacker can recover $m$ using the Chinese Remainder Theorem and a cube root.

**Small private exponent $d$.** Wiener's attack — if $d$ is smaller than $N^{1/4}$, $d$ can be recovered efficiently from $(N, e)$ via continued fraction expansion. Boneh-Durfee extended this to $d < N^{0.292}$.

**Countermeasures.**

- Always use $e = 65537$ (large enough to defeat Hastad's attack, small enough to be efficient).
- Use OAEP padding, which randomises the plaintext and defeats broadcast-style attacks.
- Never artificially shorten $d$ to make decryption faster — the security loss is catastrophic. Use the Chinese Remainder Theorem (CRT-RSA) for fast decryption instead, keeping $d$ full size.

### Implementation attacks on RSA

**Chinese Remainder Theorem (CRT) fault attacks.** Most RSA implementations use CRT to make decryption 4× faster. If a fault is induced during one of the two CRT branches, the resulting signature reveals $p$ or $q$ via $\gcd(\sigma^e - m, N)$.

**Countermeasure.** Verify the signature before releasing it (compute $\sigma^e \mod N$ and check it equals $m$). Adds slight overhead but defeats the fault attack.

**Timing attacks on modular exponentiation.** A non-constant-time implementation of $m^d \mod n$ leaks information about $d$.

**Countermeasure.** Use constant-time modular exponentiation. Use the Montgomery ladder. Add blinding — encrypt with random factors that cancel out, removing the link between observable timing and secret values.

**Common-modulus attacks.** If two users share the modulus $n$ but have different exponents $e_1$ and $e_2$ with $\gcd(e_1, e_2) = 1$, an attacker who has $c_1 = m^{e_1}$ and $c_2 = m^{e_2}$ can recover $m$ using the extended Euclidean algorithm.

**Countermeasure.** Never share a modulus across users.

**Weak key generation.** The 2008 Debian OpenSSL bug, the 2017 ROCA flaw in Infineon RSALib (which let attackers recover private keys from public keys for certain key-generation conditions), and the 2012 Lenstra et al. study finding that about 0.5% of public RSA keys on the Internet shared a factor (because of weak randomness during key generation) all underscore that key generation is a fragile operation.

**Countermeasure.** Use a well-tested cryptographic library. Use a sufficient entropy source. Have multiple independent reviews of key-generation code. Avoid embedded-system key generation immediately after boot when entropy is low.

### Attacks on Diffie-Hellman

**Man-in-the-middle on unauthenticated DH.** Already discussed in Section 2.8. The countermeasure is authenticated DH (signed exchange, certificate-based authentication, or PSK).

**Logjam (2015).** Already discussed. Countermeasure: at least 2048-bit DH parameters, named groups (RFC 7919), removal of export-grade DH from TLS.

**Small subgroup attacks.** If a party uses a DH key in a small subgroup of the multiplicative group, the attacker can find the discrete log by Pohlig-Hellman and reveal the secret.

**Countermeasure.** Use safe primes ($p = 2q + 1$ with $q$ prime). Validate received DH public values (check they are in the prime-order subgroup).

**Invalid-curve attacks (for ECDH).** If a party accepts a point that is not actually on the agreed curve — but is on a different, weaker curve — the attacker can choose that point to learn information about the private key.

**Countermeasure.** Validate received points (check they are on the curve and in the right subgroup) before using them in scalar multiplication. Use complete addition formulas that work on any input. Use formats like X25519 that are designed to make this validation automatic.

### Attacks on ECDSA

**Nonce reuse.** Already discussed. The 2010 PS3 break, multiple Bitcoin wallet incidents. Countermeasure: deterministic ECDSA (RFC 6979) or EdDSA.

**Bias in nonce generation.** Even if $k$ is not reused, if the RNG producing $k$ is biased (e.g., the high bits are always zero), enough signatures let an attacker recover the private key via lattice-based attacks. Several real implementations have fallen to this — including a 2014 attack on Android wallets and a 2019 attack on hardware tokens.

**Countermeasure.** Use a high-quality CSPRNG, or use deterministic schemes (RFC 6979 ECDSA, EdDSA).

**Side-channel attacks on scalar multiplication.** The double-and-add algorithm's branching depends on the bits of $k$, which is the secret. Power analysis, timing analysis, and cache attacks can extract $k$.

**Countermeasure.** Use constant-time scalar multiplication algorithms — the Montgomery ladder, fixed-window methods with uniform timing, double-and-always-add patterns. Curve25519's X25519 protocol is specifically designed so that the standard implementation is naturally constant-time.

### Attacks on key management

These attacks do not break the cryptography itself but break the operational use of it.

**Stolen private keys.** Physical compromise of a server, theft of an unencrypted backup, malware on a CA's signing computer. The 2011 DigiNotar breach gave attackers control of a real CA's signing keys; certificates were issued for `*.google.com` and used to intercept Iranian users' traffic. DigiNotar went bankrupt; its CA certificates were removed from major root stores.

**Weak key storage.** Keys stored in cleartext, keys with weak file permissions, keys generated and stored in an HSM but exported. The 2017 disclosure that several major code-signing leaks happened through insecure storage led to industry-wide hardening.

**Insufficient key rotation.** Long-lived signing keys accumulate value to attackers. Periodic rotation limits the damage of any single key compromise.

**Countermeasures.**

- Store private keys in **Hardware Security Modules (HSMs)** — tamper-resistant devices that perform cryptographic operations without ever exposing the keys.
- Use **Key Management Services (KMS)** — AWS KMS, Azure Key Vault, Google Cloud KMS, HashiCorp Vault — for cloud-hosted keys.
- Implement strict access controls, audit logs, and key-rotation schedules.
- Use **certificate transparency** to detect misissued certificates (Section 4 covers this).

### Side-channel and physical attacks

All of the side channels discussed for symmetric crypto (Section 2.6) apply to asymmetric crypto, often more dramatically because asymmetric operations are slower and the secret-dependent computation is more visible.

The 2014 Genkin-Shamir-Tromer **acoustic attack** recovered an RSA key by listening to the sounds a CPU made during decryption — different operations produce subtly different sounds, audible to a phone microphone a metre away.

The 2014 **TLBleed**, 2015 **CacheBleed**, 2018 **Spectre/Meltdown**, and 2022 **Hertzbleed** attacks all exploited microarchitectural side channels in modern CPUs to extract cryptographic keys.

**Countermeasures.**

- Constant-time implementations of every cryptographic operation.
- Hardware countermeasures (HSMs, secure enclaves like Intel SGX or ARM TrustZone).
- Process isolation, careful design of any shared CPU resources, careful firmware-level mitigations of microarchitectural attacks.
- For high-assurance use, dedicated cryptographic hardware physically separated from general-purpose computation.

### The post-quantum threat

Already discussed. The summary:

- A sufficiently large quantum computer breaks RSA, classical DH, and ECC entirely.
- No such computer exists yet, but "store now, decrypt later" makes the threat real for long-lived secrets.
- The fix is post-quantum cryptography. NIST finalised three first-generation standards in 2024: ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205).
- Migration is in progress. Major operators have deployed hybrid (classical + PQC) modes in production. Full migration to pure PQC is expected to take a decade.

The unifying theme of this chapter: symmetric and asymmetric cryptography each have decades of mature primitives, but each has also accumulated a long catalogue of attacks against specific algorithms, specific modes, specific padding schemes, specific parameter choices, and specific implementation patterns. The cipher choice is only one decision; the mode of operation, the padding, the random-number source, the side-channel hardening, and the key management all matter equally. A descriptive answer that lists "use AES and RSA" misses the point. The right answer is "use AES-256-GCM, with random 96-bit nonces from a CSPRNG, and RSA-3072 with OAEP and PSS, with keys generated in an HSM, with constant-time implementations from a vetted library, and a plan for the post-quantum migration."
