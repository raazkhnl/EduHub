---
title: 'Chapter 4 — Key Management'
sidebar_label: 'Ch 04 — Key Management'
sidebar_position: 4
description: 'Chapter 4 of Cryptography and Data Security (ENCTNS502).'
slug: /ioe/msncs/year-1-part-1/cryptography/notes/ch04
tags: [msncs, ENCTNS502, notes]
last_update:
  date: 2026-05-22
  author: Rajesh Khanal
---

Cryptography assumes the right keys are in the right hands. Symmetric ciphers assume both parties have the same secret. Asymmetric ciphers assume the verifier has the signer's authentic public key. Without working answers to "how does Alice get the right key for Bob?" and "how do we trust this key really belongs to who it claims to?" the cryptographic constructions of the previous chapters are useless. Key management is the operational discipline that answers these questions. This chapter focuses on the dominant deployed answer for public-key authentication — **Public Key Infrastructure (PKI)** — and on the certificate-based trust systems that secure most of the modern Internet.

## 4.1 PKI — definition, historical context, importance

*A Public Key Infrastructure (PKI) is the combination of policies, procedures, hardware, software, and the trusted organisations that issue, manage, distribute, validate, and revoke digital certificates binding public keys to identities, allowing authenticated public-key cryptography at scale.*

PKI is what turns Diffie-Hellman, RSA, ECDSA, and EdDSA from interesting mathematics into infrastructure that protects every HTTPS connection, every signed app on every phone, every encrypted email between governments. Without PKI, public-key cryptography solves nothing — Alice and Bob can exchange keys, but they cannot know whose keys those really are.

### The problem PKI solves

Public-key cryptography promises that anyone can encrypt to Bob using his public key, and anyone can verify Bob's signature using his public key. The unstated assumption is that "Bob's public key" is unambiguously identifiable.

In practice this is the hard part. Alice wants to send an encrypted message to her bank, but how does she know that the public key labelled "Nepal Bank Limited" is actually the bank's key and not an impostor's? An attacker who can substitute their own public key for the bank's mounts a man-in-the-middle attack — Alice encrypts to the attacker, the attacker decrypts, re-encrypts to the bank, and reads all the traffic.

The solution adopted by the Internet is the **certificate** — a signed document binding a public key to an identity, signed by a third party that both Alice and the bank already trust. The third party is the **Certificate Authority (CA)**. The certificate ecosystem — CAs, certificate formats, validation rules, revocation mechanisms — is what we call PKI.

### Historical context

The need for a key-binding mechanism was clear from the moment public-key cryptography was invented. The 1976 Diffie-Hellman paper discussed it; the 1977 RSA paper proposed a "public file" of keys; the 1978 paper *Using Encryption for Authentication in Large Networks of Computers* by Needham and Schroeder gave the first detailed protocol with a trusted third party.

The X.509 standard came from a different direction — the ITU-T's work on the X.500 directory system in the 1980s. X.509 was designed as a way to authenticate users of the X.500 directory; the directory itself never took off, but the certificate format X.509 specified became the universal certificate format. The IETF later adapted X.509 to the Internet through a series of RFCs (the most important being RFC 5280 in 2008, defining X.509v3 certificates for Internet use).

PGP (Pretty Good Privacy, Phil Zimmermann, 1991) took a different approach — the **web of trust**, where users sign each other's keys and trust is built up through chains of personal endorsements. PGP/GPG remains in use among technical communities but never achieved mass adoption.

The Internet's PKI began to scale in the mid-1990s with Netscape's SSL and the first commercial Certificate Authorities (VeriSign in 1995, Thawte and others soon after). By the 2010s, certificate-based authentication protected nearly all sensitive web traffic.

The 2015 launch of **Let's Encrypt** — a free, automated, browser-trusted CA — accelerated the transition to universal HTTPS. By 2026, over 95% of web pages globally load over HTTPS, and most certificates are issued by Let's Encrypt, DigiCert, GlobalSign, Sectigo, or a few other large CAs.

### Why PKI matters

Several capabilities depend on a working PKI:

- **Web TLS.** Every HTTPS connection authenticates the server using a certificate. The browser's pre-installed list of trusted root CAs is the foundation of the web's trust model.
- **Email security.** S/MIME signing and encryption uses certificates. Enterprise email systems often deploy internal PKIs for this purpose.
- **Code signing.** Signed software updates, signed mobile apps, signed driver packages all rely on PKI. The certificate identifies the developer; the operating system's trusted-root store validates the certificate.
- **Document signing.** Digitally signed PDFs, signed government documents, signed contracts. The EU eIDAS framework and similar laws give certain certificate-backed signatures legal equivalence to handwritten signatures.
- **VPN and IPsec authentication.** Enterprise VPNs commonly authenticate using certificates rather than passwords or pre-shared keys.
- **Device identity.** IoT devices, mobile phones, network equipment all increasingly come with embedded certificates that identify them to back-end systems.
- **Mutual TLS (mTLS).** Service-to-service authentication in microservice architectures. Every service has its own certificate; every connection is mutually authenticated.

### Importance to Nepal

Several Nepali systems depend on PKI:

- All HTTPS-protected websites in the `.gov.np` and `.com.np` zones use certificates from global CAs (Let's Encrypt is dominant).
- Banking and fintech platforms (eSewa, Khalti, IME Pay, bank online portals) authenticate themselves through commercial CA certificates.
- The Nepal National Cyber Security Policy 2080 (2023) acknowledges PKI as critical infrastructure and authorises the Office of the Controller of Certification (OCC) under the Ministry of Communications and Information Technology to license CAs in Nepal.
- The **Nepal Certificate Authority** (jointly with several commercial CAs) is licensed to issue digital signature certificates under the Electronic Transactions Act 2063 (2008).

The Electronic Transactions Act gives certificate-based digital signatures the same legal force as handwritten signatures, provided the issuing CA is licensed by the OCC. Adoption has lagged — most documents in Nepal are still signed and stamped by hand — but the legal framework exists.

## 4.2 Key components of PKI

A working PKI has several distinct roles, often run by different organisations.

### Certificate Authority (CA)

*A Certificate Authority is the entity that issues digital certificates, vouches for the binding between a public key and an identity by signing the certificate with its own private key, and accepts the trust responsibility for the issued certificates.*

The CA is the trusted third party at the heart of PKI. Its job:

- Receive certificate requests.
- Verify the requester's identity according to its published procedures.
- Issue the certificate by signing it with the CA's private key.
- Publish the issued certificate to its certificate repository.
- Maintain a revocation list of certificates that should no longer be trusted.

**Root CAs vs Intermediate CAs.**

The **root CA** is the top of a certificate chain. Its certificate is self-signed — it has no higher authority to sign for it. Browsers and operating systems ship with a pre-installed list of trusted root CAs. The root CA's private key is the most precious key in PKI; if compromised, every certificate ever issued by that hierarchy is suspect.

Because root keys are so valuable, root CAs typically do not issue end-entity certificates directly. They issue **intermediate CA certificates** — certificates that authorise other CAs (or sub-organisations of the root CA) to issue certificates. The intermediate CAs do the day-to-day issuance. If an intermediate CA's key is compromised, only its certificates need to be revoked; the root remains safe.

A typical chain:

```
Root CA (offline, in a vault, hardware-protected)
    ↓ signs
Intermediate CA (online, performs issuance)
    ↓ signs
End-entity certificate (the server, the user, the device)
```

The browser, presented with the end-entity certificate, walks up the chain through the intermediate to find a root it trusts. The chain validates if every signature checks and the root is in the trust store.

**Major commercial CAs.** As of 2026, the largest CAs by certificates issued: Let's Encrypt (by an order of magnitude), DigiCert, GlobalSign, Sectigo, Google Trust Services, Amazon Trust Services. Microsoft, Apple, Mozilla, and Google maintain the major root stores; their inclusion criteria are the de facto industry standard.

**Root store ejections.** A CA that violates the issuance rules can be removed from a root store, instantly invalidating all its certificates. The 2011 **DigiNotar** breach — Iranian state-affiliated attackers obtained a DigiNotar intermediate and issued fraudulent certificates for `*.google.com` and similar — led to DigiNotar being removed from every major root store, and the company filed for bankruptcy weeks later. The 2015–17 **WoSign / StartCom** misissuance incidents led to their root removal. The 2024 **TrustCor** root removals followed disclosed conflicts of interest. Root-store membership is a continuous trust-and-audit process.

### Registration Authority (RA)

*A Registration Authority is the entity that receives certificate requests from end users, verifies their identity according to the CA's policies, and forwards approved requests to the CA for signing — separating the identity-verification function from the certificate-signing function.*

The RA is the "front office" of the CA. It interacts with applicants, checks documents (passport, business registration, domain ownership proof), and authorises issuance. The CA's private key may be in a hardware-locked vault that no one at the RA touches; the RA's job is only to say "issue a certificate for this verified identity."

In small CAs the RA and CA functions are combined. In large CAs they are separated for operational and compliance reasons. The Let's Encrypt model effectively automates the RA function — the requester proves domain ownership (by responding to a challenge), and the CA issues immediately.

### Certificate Revocation List (CRL)

*A Certificate Revocation List is a digitally signed list, published periodically by the CA, of certificate serial numbers that have been revoked before their natural expiry, allowing relying parties to check whether a certificate they hold is still trustworthy.*

Certificates have an expiry date — typically one year now, after the CA/Browser Forum ratcheted down the maximum to 398 days in 2020. But sometimes a certificate must be invalidated *before* its expiry — the holder's private key was compromised, the holder lied during identity verification, the holder's organisation no longer exists, or some misissuance was discovered.

The CRL is the original revocation mechanism. The CA maintains a list of revoked serial numbers and signs it. A client checking a certificate downloads the CRL and looks for the certificate's serial number.

**CRL problems.**

- **Size.** A busy CA's CRL can be megabytes. Downloading it for every TLS handshake is impractical.
- **Freshness.** CRLs are republished periodically (daily, hourly). A certificate revoked an hour ago may not yet appear.
- **Latency.** Downloading a CRL before validation adds time to every connection.

These problems led to two successors.

### OCSP and OCSP stapling

*OCSP (Online Certificate Status Protocol, RFC 6960) is a real-time protocol by which a client queries a CA's OCSP responder for the current status of a specific certificate, receiving a signed "good," "revoked," or "unknown" response.*

OCSP solves the CRL size and freshness problems. The client asks about one specific certificate; the responder answers about that one certificate. Responses are cached briefly (typically minutes to hours).

OCSP itself has problems:
- **Privacy.** The OCSP responder learns which websites you visit (because you query it about each site's certificate).
- **Reliability.** If the responder is down, browsers historically "fail open" — they treat the unanswered query as "certificate is fine" — to avoid breaking the user experience.
- **Performance.** An extra round trip to the CA before each connection.

**OCSP stapling** (RFC 6066) addresses these. Instead of the client asking the OCSP responder, the *server* asks periodically and includes the signed response in its TLS handshake. The client gets the freshness guarantee without the extra round trip or the privacy leak.

### CRLite and modern revocation

The current state-of-the-art is **CRLite** (Mozilla, 2017 onwards) and similar schemes — the browser vendor downloads a compact representation (cascading bloom filter, ~10–20 MB) of all currently-revoked certificates from all known CAs, and distributes it through the browser's update channel. Clients check revocation locally with no network query. This is what Firefox uses by default in 2026; Chrome has a similar system (CRLSets).

The combination of short certificate lifetimes (90 days for Let's Encrypt, 398 days maximum elsewhere) and effective revocation means a compromised certificate has a bounded window of misuse.

### Certificate Repository

*A Certificate Repository is the publicly accessible storage system from which issued certificates and revocation information can be downloaded, typically operated by the CA.*

The repository serves several purposes:
- Distributing intermediate CA certificates that servers may not have included in their TLS handshake.
- Providing CRLs and OCSP responses.
- Publishing the CA's policy documents (Certificate Practice Statement and Certificate Policy).

For browser PKI, the repository is just a set of HTTPS endpoints; for X.500-style directories, it could be an LDAP server.

### Certificate Transparency logs

*Certificate Transparency (CT, RFC 6962) is the system of public, append-only, cryptographically-verifiable logs of every certificate issued by participating CAs, designed so that misissuance can be detected by anyone monitoring the logs.*

CT is not part of the classical PKI model but has become essential since around 2018. The problem CT solves: if a CA misissues a certificate (issues one to an attacker for a domain they do not own), the legitimate owner may never know. CT requires every certificate to be published in append-only logs that anyone can monitor.

Browsers (Chrome since 2018, Safari since 2020) refuse to accept certificates that are not in CT logs. Domain owners can subscribe to alerting services (crt.sh, Censys, custom monitors) that notify them whenever a new certificate is issued for their domain — letting them detect misissuance promptly.

CT has caught several real misissuance incidents. The 2015 Symantec misissuance of certificates for `*.google.com` (an internal test issuance that was supposed to stay internal but was actually browser-trusted) was discovered through CT monitoring; the subsequent investigation led to Symantec's CA business being divested.

## 4.3 Digital certificates: structure, contents, formats

A digital certificate is a structured document binding a public key to an identity, signed by a CA. The dominant format is **X.509v3**, defined by ITU-T X.509 and adapted for the Internet by IETF RFC 5280.

### X.509v3 structure

An X.509v3 certificate has several mandatory fields and a set of optional extensions:

**Mandatory fields:**

- **Version.** Currently v3 (encoded as integer 2 since v1 was 0).
- **Serial number.** Unique within the issuing CA. Must be unpredictable to defeat certain attacks.
- **Signature algorithm.** The algorithm the CA used to sign this certificate (e.g., `sha256WithRSAEncryption`, `ecdsa-with-SHA256`).
- **Issuer.** The Distinguished Name (DN) of the CA that issued this certificate.
- **Validity.** Not-before and not-after dates.
- **Subject.** The DN of the entity the certificate is for (the website, the user, the device).
- **Subject Public Key Info.** The actual public key, plus the algorithm it belongs to (RSA, ECDSA, EdDSA, etc.).
- **Signature.** The CA's signature over all the above fields.

**Common extensions:**

- **Subject Alternative Name (SAN).** A list of additional names this certificate is valid for. For a server certificate, this lists every DNS name (`example.com`, `www.example.com`, `api.example.com`) the certificate covers. SAN has effectively replaced the older Common Name field for this purpose; modern browsers ignore Common Name entirely.
- **Key Usage.** Restrictions on how the key may be used — for digital signatures, key encipherment, certificate signing, CRL signing, etc.
- **Extended Key Usage (EKU).** More specific usage restrictions — TLS server authentication, TLS client authentication, code signing, email protection, time stamping.
- **Basic Constraints.** Whether the certificate is a CA certificate (and can sign other certificates) or an end-entity certificate, and a path-length limit for CA certificates.
- **CRL Distribution Points.** URLs where the CRL can be downloaded.
- **Authority Information Access (AIA).** URLs for the OCSP responder and for downloading the issuer's certificate.
- **Subject Key Identifier and Authority Key Identifier.** Identifiers used to locate the right certificate during chain validation.
- **SCTs (Signed Certificate Timestamps).** Embedded receipts from CT logs proving the certificate was logged.

### A worked X.509 example

A real server certificate viewed with `openssl x509 -text` produces output like:

```
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            04:00:00:00:00:01:44:4e:bc:3a:9b
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: C=US, O=Let's Encrypt, CN=R3
        Validity
            Not Before: Mar 12 04:23:15 2026 GMT
            Not After : Jun 10 04:23:14 2026 GMT
        Subject: CN=example.np
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                RSA Public-Key: (2048 bit)
                Modulus: ...
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Key Usage:
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage:
                TLS Web Server Authentication, TLS Web Client Authentication
            X509v3 Basic Constraints:
                CA:FALSE
            X509v3 Subject Alternative Name:
                DNS:example.np, DNS:www.example.np
            X509v3 Subject Key Identifier:
                A2:54:13:...
            X509v3 Authority Key Identifier:
                14:2E:B3:...
            Authority Information Access:
                OCSP - URI:http://r3.o.lencr.org
                CA Issuers - URI:http://r3.i.lencr.org/
            X509v3 CRL Distribution Points:
                URI:http://r3.c.lencr.org/35.crl
            CT Precertificate SCTs:
                Signed Certificate Timestamp:
                    Version   : v1 (0x0)
                    Log ID    : ...
                    Timestamp : Mar 12 05:23:14.123 2026 GMT
    Signature Algorithm: sha256WithRSAEncryption
        2c:1b:62:...
```

This is a typical Let's Encrypt certificate for a Nepali domain.

### Certificate formats and encodings

X.509 certificates are typically encoded in one of two ways:

- **DER (Distinguished Encoding Rules).** Binary ASN.1 encoding. Compact. Used inside TLS handshakes, in cryptographic APIs.
- **PEM (Privacy-Enhanced Mail).** Base64-encoded DER, wrapped between `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` markers. Text-friendly. Used in configuration files, email attachments, copy-paste.

Other container formats bundle certificates with private keys:

- **PKCS#12 (PFX).** Container for a certificate plus its private key, password-protected. Used to move complete identities between machines.
- **PKCS#7.** Container for one or more certificates, often used for the certificate chain.
- **JKS (Java KeyStore).** Java's native format. Largely replaced by PKCS#12 in modern Java.

### Certificate chains and hierarchies

A typical browser-trusted certificate chain has three certificates:

1. **Root CA certificate.** Self-signed. In the browser's trust store.
2. **Intermediate CA certificate.** Signed by the root. Sent by the server during the TLS handshake (or downloaded via AIA).
3. **End-entity certificate.** Signed by the intermediate. The server presents this for itself.

Validation walks bottom-up:

- Verify the end-entity certificate's signature using the intermediate's public key.
- Verify the intermediate certificate's signature using the root's public key.
- Confirm the root is in the trust store.

If any signature fails, or if any certificate is expired or revoked, or if the root is not trusted, validation fails.

Some hierarchies have more intermediates (two or more levels). DigiCert's "DigiCert Global Root CA → DigiCert TLS RSA SHA256 2020 CA1 → end-entity" is a typical two-intermediate setup.

### Cross-signing

Sometimes a CA signs another CA's certificate to extend trust into a new root store. Let's Encrypt's original "ISRG Root X1" was cross-signed by IdenTrust's "DST Root CA X3" — letting Let's Encrypt certificates work in older devices that did not yet trust ISRG Root X1 but did trust IdenTrust. As newer devices added ISRG Root X1 to their trust stores, the cross-signing became less critical.

The September 2021 expiry of the DST Root CA X3 cross-signature was a global event — older Android devices that hadn't updated their trust stores began failing TLS handshakes to Let's Encrypt-protected sites overnight. The incident led to wider awareness of how the trust chain actually works.

### Public key formats

The public key inside a certificate carries its own algorithm-specific encoding:

- **RSA public key.** Encoded as `SubjectPublicKeyInfo` containing the modulus and exponent.
- **ECDSA public key.** Encoded as an elliptic curve point (compressed or uncompressed), with the curve identified by an OID.
- **EdDSA public key.** Encoded as a 32-byte (Ed25519) or 57-byte (Ed448) point.

The certificate's signature is computed over the entire to-be-signed portion (everything except the signature itself) using the CA's private key.

## 4.4 PKI operations: generation, revocation, renewal

The lifecycle of a certificate has three operations beyond simple use: generation (issuance), revocation, and renewal.

### Certificate generation

The standard flow for issuing a certificate:

1. **Key generation.** The applicant generates a key pair locally. The private key never leaves the applicant's machine; this is critical — if the CA generates the key, the CA could keep a copy.
2. **Certificate Signing Request (CSR).** The applicant creates a CSR — an unsigned structure containing the public key and the desired subject identifiers — and signs it with the corresponding private key. The self-signature on the CSR proves the applicant possesses the private key.
3. **Submission to RA/CA.** The applicant submits the CSR to the CA.
4. **Identity validation.** The CA verifies the applicant's identity according to the certificate type (see below). For domain-validated certificates, the CA checks domain ownership by challenge-response; for organisation-validated and extended-validation certificates, the CA performs additional checks on the requesting organisation.
5. **Issuance.** The CA constructs the certificate, signs it with the CA's private key, and returns the signed certificate to the applicant.
6. **Publication.** The CA publishes the certificate to its repository and (under modern requirements) to CT logs.
7. **Installation.** The applicant installs the certificate on the server, alongside the private key.

### Domain validation, organisation validation, extended validation

The CA validates identity to different depths depending on the certificate type.

**Domain Validation (DV).** The CA confirms only that the requester controls the domain. Automated mechanisms: respond to a challenge file at a known URL, add a DNS TXT record with a known value, respond to an email at a standard address (`admin@`, `hostmaster@`, etc.). Let's Encrypt's ACME protocol uses HTTP-01, DNS-01, or TLS-ALPN-01 challenges. The certificate proves "whoever currently controls the domain requested this" — nothing more.

**Organisation Validation (OV).** The CA additionally verifies the legal existence of the requesting organisation through documents (business registration), independent databases (corporate registries), and sometimes phone calls. The certificate identifies the organisation as well as the domain. Costs more than DV; takes days rather than minutes.

**Extended Validation (EV).** The strictest tier. The CA performs additional vetting per the CA/Browser Forum's EV Guidelines — verifying the organisation's legal, operational, and physical existence; verifying that the requester is authorised by the organisation; checking against sanctioned-entity lists. The browser used to show a green address bar with the organisation name for EV certificates; most browsers have removed this UI as of 2020–2022 because research showed users did not understand or rely on it. EV is now mostly a procurement requirement for certain industries (banking, government) rather than a user-visible distinction.

### ACME — Automatic Certificate Management Environment

*ACME (RFC 8555) is the IETF-standardised protocol for automating certificate issuance and renewal, designed for Let's Encrypt and now widely supported, in which a client proves control of a domain through automated challenges and receives a signed certificate without human intervention.*

ACME made HTTPS-by-default practical. Before ACME, every certificate was a manual operation — email exchange, payment, file uploads. With ACME, a server can request and renew its own certificates automatically. Major ACME clients: Certbot, acme.sh, Caddy (built-in), Traefik (built-in), Nginx with the certbot plugin.

ACME-style automation has spread beyond Let's Encrypt — Google Trust Services, ZeroSSL, BuyPass, Sectigo all offer ACME endpoints in 2026.

### Revocation

When a certificate must be invalidated before its natural expiry, the CA performs revocation:

1. **Trigger.** The certificate holder discovers compromise (private key leaked, server hacked, theft of the signing device), or the CA discovers misissuance, or the holder no longer needs the certificate (organisation dissolved, domain transferred).
2. **Revocation request.** The holder submits a revocation request to the CA. The request must be authenticated — typically by the same private key the holder used to obtain the certificate, or by another out-of-band method.
3. **CRL update.** The CA adds the certificate's serial number to its CRL and publishes the updated CRL.
4. **OCSP update.** The CA's OCSP responder begins answering "revoked" for queries about that certificate.
5. **Propagation.** Browsers' CRLite/CRLSets update on their normal schedule (hours to days). OCSP stapling responses get fresh information at the server's next staple refresh.

The lag between revocation and universal effect is the residual risk window. Short certificate lifetimes (90 days for Let's Encrypt) limit how long a compromised certificate could continue to be misused.

### Renewal

A certificate that nears expiry must be renewed to avoid service interruption. Renewal can take two forms:

**Renewal with the same key.** The applicant submits a new CSR using the same public key as before. The CA validates identity and issues a new certificate with a new validity period. The private key has not changed.

**Renewal with a new key (re-key).** The applicant generates a fresh key pair, creates a new CSR, and obtains a new certificate. Better security hygiene — limits how long any single key is in use.

ACME automates both. Modern best practice: re-key on every renewal, automated. Some PKI standards mandate maximum key lifetimes, requiring re-keying.

### Operational challenges

Several recurring operational issues plague PKI deployments:

**Expired certificates causing outages.** A server administrator forgets to renew; the certificate expires; the service breaks. Major incidents involving expired certificates have hit Microsoft Azure (2020), LinkedIn (multiple times), Spotify (2016), and even cryptography-mature organisations like Cisco. Automation (ACME) is the durable fix.

**Intermediate certificate misconfiguration.** A server is configured to present only its end-entity certificate, without the intermediate. Some clients have the intermediate cached; others do not. The clients without it fail to validate. Misconfigurations of this kind drive a steady stream of HTTPS support tickets.

**Key compromise without revocation.** A private key leaks (a developer pushes it to a public Git repo, an attacker steals a backup, an insider exfiltrates a key store). The certificate is not always promptly revoked — the operator may not realise the key has leaked, or may not act fast enough. The compromised key can be used to impersonate the server until the certificate expires or is revoked.

**Trust store outdating.** Devices that do not receive updates (older Android phones, embedded IoT devices, smart TVs) gradually fall out of step with the current trust stores. They start failing TLS handshakes to sites whose certificates chain to new roots their trust stores do not include. The Let's Encrypt DST Root CA X3 expiry in 2021 was the highest-profile such event.

## 4.5 PKI trust models, standards, and protocols

### Trust models

Different PKI deployments use different trust models. Three are dominant.

**Hierarchical (X.509) trust.** The model used by browser PKI. A small set of root CAs are universally trusted; intermediate CAs are signed by roots; end-entity certificates are signed by intermediates. Trust flows top-down through a tree. The advantage: scalable. The disadvantage: any compromised CA can issue certificates for any name, including domains they have no relationship with. CT and pinning are partial mitigations.

**Web of trust.** The PGP model. Users sign each other's keys directly; trust accumulates through chains of personal endorsements. Alice trusts Bob's key because Carol — whom Alice trusts — has signed Bob's key. No central authority. Resistant to centralised compromise but does not scale to billions of users.

**Direct trust.** The simplest model: out-of-band exchange of public keys. SSH host keys (TOFU — Trust On First Use), pre-shared certificates in private VPN deployments, self-signed certificates in closed environments. Works at small scale, does not scale to open Internet.

**Hybrid models.** Some systems combine these. CAs maintain hierarchical trust, but high-value applications also use **certificate pinning** to bypass the CA hierarchy — the application explicitly trusts only a specific certificate or specific keys, regardless of what other CAs might issue. Mobile banking apps in Nepal (eSewa, Khalti, IME Pay, NIC Asia Mobile) commonly pin their certificates so that a CA compromise cannot man-in-the-middle them.

### Important standards

PKI is governed by a layered set of standards.

**ITU-T X.509.** The original certificate format. Current revision is X.509v3 with the X.509v2 CRL format. Defines the abstract structure; specific encodings come from PKIX.

**PKIX (Public-Key Infrastructure (X.509)).** The IETF working group's adaptation of X.509 for the Internet. Major outputs include RFC 5280 (current certificate profile), RFC 6960 (OCSP), RFC 8555 (ACME).

**CA/Browser Forum Baseline Requirements.** The de facto rules that any CA issuing browser-trusted certificates must follow. Updated several times a year. Covers validation procedures, certificate lifetime limits, mandatory CT logging, cryptographic algorithm requirements.

**FIPS 140-2/140-3.** US federal standards for cryptographic modules. CAs typically operate their keys in FIPS-140-2 Level 3 or Level 4 hardware security modules. The standard specifies tamper resistance, key zeroisation, and other physical and logical security properties.

**Common Criteria.** International standards (ISO/IEC 15408) for evaluating security products. Many HSMs and PKI components carry Common Criteria certifications at evaluation assurance levels (EAL4 and above for serious deployments).

**WebTrust for CAs.** The audit framework against which commercial CAs are evaluated. Mozilla, Microsoft, Google, and Apple require WebTrust audits (or the European ETSI equivalents) for root-store inclusion. Annual audits are mandatory.

### Major protocols

**TLS (Transport Layer Security, RFC 8446 for TLS 1.3).** Uses certificates to authenticate the server (and optionally the client) at the start of every secure connection. The dominant use of PKI on the Internet.

**S/MIME (Secure/Multipurpose Internet Mail Extensions).** Standardises certificate-based email signing and encryption. Used in enterprise email and in government email systems.

**OpenPGP (RFC 4880, RFC 9580 for the current revision).** Uses its own certificate format (key with self-signatures and signatures from others) rather than X.509. Web of trust model.

**EAP-TLS (RFC 5216).** Used for Wi-Fi enterprise authentication (WPA2-Enterprise, WPA3-Enterprise) and for IPsec VPN authentication. Each user or device has a certificate; the wireless network authenticates using TLS-like handshake.

**SCEP (Simple Certificate Enrollment Protocol).** Used for device enrollment in enterprise PKIs, particularly for network equipment and mobile device management.

**EST (Enrollment over Secure Transport, RFC 7030).** A newer, TLS-based enrollment protocol replacing SCEP.

**CMP (Certificate Management Protocol, RFC 4210).** A comprehensive PKI management protocol used in industrial PKIs (electricity grid SCADA, industrial automation).

**ACME (RFC 8555).** Already discussed. The protocol that automated Let's Encrypt.

### Certificate Transparency in detail

CT deserves a closer look because it has reshaped trust expectations in the PKI ecosystem.

The mechanism:

1. **Logs.** A small number of operators run append-only logs. Each log is a Merkle tree; entries can only be added, never removed or reordered.
2. **CAs submit certificates to logs.** When a CA issues a certificate, it sends a *precertificate* (a special form of the certificate with one extension that makes it not directly usable) to one or more logs. The log returns a *Signed Certificate Timestamp (SCT)* — a receipt that the certificate has been logged.
3. **SCTs in certificates.** The CA embeds the SCTs into the final certificate before issuing.
4. **Browsers verify SCTs.** A browser refuses to trust a certificate that does not include SCTs from a sufficient number of trusted logs.
5. **Monitors watch the logs.** Anyone can subscribe to the logs and watch for certificates issued for their domains. crt.sh, Censys, and several other services provide free monitoring.
6. **Auditors check log consistency.** Anyone can challenge a log to prove that the current tree is an extension of any previous tree (using inclusion proofs and consistency proofs). A log that misbehaves is removed from the trusted-log list.

The result: every certificate issued by every trusted CA appears in a public log within hours. Misissuance becomes detectable. Several real misissuance incidents — including the 2015 Symantec internal test certificates accidentally being browser-trusted, and various more recent incidents — have been caught by CT monitoring.

### Modern best practices

The 2026 best practices for operating PKI:

**For end users / domain owners.**
- Use Let's Encrypt or another ACME-compatible CA for automated issuance.
- Monitor your domains in CT (crt.sh dashboards, free alert services).
- Pin certificates in mobile applications.
- Rotate keys on every renewal.
- Keep CA root stores updated on managed devices.

**For organisations running internal PKI.**
- Run the root CA offline (powered-off in a safe). Bring it online only when signing intermediate certificates.
- Store all CA keys in FIPS-140-2 Level 3 HSMs.
- Separate the RA and CA functions, with multi-person controls on the signing operation.
- Maintain CRLs and OCSP for internal certificates.
- Plan for CA migration — the root will need to be replaced before its expiry (typically 10–25 years).

**For CAs.**
- Maintain WebTrust audits.
- Submit to CT for all issued certificates.
- Implement strong identity validation, especially for higher-trust certificate tiers.
- Operate 24×7 monitoring; revoke promptly on disclosed compromise.
- Plan for post-quantum migration. The first PQC-signed certificates are appearing in test deployments.

### What the future holds

PKI is one of the longest-lived Internet infrastructures in active evolution. Several trends:

**Shorter certificate lifetimes.** From years in 2010 to 398 days in 2020 to 90 days proposed for browser-trusted TLS by Apple in 2024. Shorter lifetimes reduce the impact of compromise and force automation.

**Post-quantum migration.** The 2024 NIST PQC standards (ML-DSA, SLH-DSA) define the algorithms; integration into certificate formats and CA processes is in progress. The transition is expected to take a decade.

**Multi-perspective issuance verification.** CAs are being asked to verify domain ownership from multiple network vantage points to defeat BGP-hijack-enabled misissuance.

**Decentralised PKI experiments.** Blockchain-based certificate logging, name systems like ENS that bind keys to names through smart contracts, and similar ideas are research-stage but have not displaced the CA model.

**Quantum-safe PKI.** Full hybrid certificates (containing both classical and post-quantum public keys) are expected to roll out through the late 2020s. The deployment challenge is similar to SHA-1 deprecation but larger — every certificate, every signature algorithm, every PKI verification path must be updated.

PKI in 2026 is a working system protecting trillions of dollars of value, with known weaknesses, regular incidents, and continuous evolution. It is the cryptographic infrastructure most users interact with daily without knowing — every padlock icon in a browser, every signed software update, every secure email is its evidence.
