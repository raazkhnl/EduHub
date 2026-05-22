---
title: 'Chapter 5 — Mobile Device Forensics'
sidebar_label: 'Ch 05 — Mobile Device Forensics'
sidebar_position: 5
description: 'Chapter 5 of Digital Forensics and Incident Response (ENCTNS551).'
slug: /ioe/msncs/year-1-part-2/digital-forensics-incident-response/notes/ch05
tags: [msncs, ENCTNS551, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

For most users in Nepal in 2026, the mobile phone is the most-used computing device — the place where banking happens (eSewa, Khalti, IME Pay, mobile-banking apps), where messaging happens (WhatsApp, Viber, Messenger, Telegram), where the camera lives, where the calendar lives, where location is constantly tracked. For an investigator, mobile devices are often the most-incriminating evidence source in cases ranging from financial fraud to harassment to organised crime. The forensic challenges, however, are distinct from desktop forensics: tightly-controlled hardware, sophisticated encryption, vendor-specific data structures, and a rapid evolution that quickly obsoletes tooling. This chapter covers mobile-device acquisition for iOS and Android, the categories of recoverable data, and the standard commercial and open-source tools.

## 5.1 Mobile device acquisition techniques

### Mobile device forensics

*Mobile device forensics is the sub-discipline of digital forensics concerned with the recovery of digital evidence from mobile phones, smartphones, tablets, and similar portable devices, using techniques adapted to mobile hardware, operating systems, encryption schemes, and application data structures.*

The field grew from the late 1990s as mobile phones moved from voice-only devices to data-rich smartphones. By the late 2010s, mobile-device evidence was central to a majority of criminal investigations globally. The pace of change in mobile OS security has made this one of the fastest-moving sub-fields of forensics.

### Categories of mobile acquisition

The forensic literature recognises several levels of acquisition, each producing different evidence quantities.

**Manual acquisition.** The examiner operates the device's user interface to navigate to data and records observations (photographing the screen, taking notes). Lowest level; used when nothing else is possible and the device cannot be unlocked.

**Logical acquisition.** The examiner extracts data through standard programmatic interfaces (backups, API calls). Captures application data, contacts, messages, photos, call logs visible to the OS. Misses deleted data, system artefacts, third-party-app internals.

**File-system acquisition.** Extracts the device's file system — every file, with their full contents and metadata. More data than logical acquisition; less than physical. Recovers deleted application data that is still present in SQLite databases (Section 5.2). Requires either device cooperation (jailbreak/root) or specialised exploits.

**Physical acquisition.** Bit-for-bit extraction of the device's storage. Captures everything, including unallocated space, deleted data, free blocks. The forensic ideal. Difficult or impossible on modern encrypted devices without the user passcode or a working exploit.

**Cloud acquisition.** Extraction from the cloud accounts associated with the device — iCloud, Google account. Often more accessible than the device itself; sometimes contains data the device no longer has.

Each level requires different access. The order of difficulty (and value) is typically: manual < logical < cloud < file-system < physical.

### iOS acquisition

Apple's iOS has progressively strengthened its security model. As of 2026:

- **Secure Enclave** holds cryptographic keys; impervious to direct extraction without exploitable vulnerability.
- **File-based encryption** wraps file data with per-file keys.
- **Passcode is required** for first decryption after boot ("Before First Unlock" — BFU state). Subsequent unlocks remain available until the passcode is re-entered or the device reboots ("After First Unlock" — AFU state).
- **iCloud backups** (encrypted with the account password) are an alternate source of data.

**Acquisition methods.**

**iTunes-style backup.** The device produces an encrypted backup that an investigator can copy and analyse. Requires the device to be unlocked and the backup password (if set). The backup contains most user-visible data — contacts, messages (SMS and iMessage), call logs, photos, application data, settings — but not all forensic artefacts. Easiest method when feasible.

**Advanced Logical Acquisition.** Commercial tools (Cellebrite, Magnet AXIOM, Oxygen) request larger data extraction than standard backup, including additional categories.

**Checkm8 / checkra1n.** A bootrom vulnerability discovered in 2019 affects iPhones from iPhone 5s through iPhone X (A5 through A11 chips). Allows boot-time exploitation that enables file-system extraction on AFU devices and (with passcode) physical acquisition. As of 2026, newer devices (A12 onward — iPhone XS and later) are not affected.

**GrayKey, Cellebrite Inseyets / Cellebrite Premium.** Commercial products that exploit unpatched or known vulnerabilities to obtain access. Capabilities update frequently; specific models supported at any time are confidential commercial information.

**iCloud acquisition.** With the account credentials (or a court order to Apple), iCloud backups and synchronised data (Photos, Notes, iCloud Drive, Find My) can be obtained. iCloud Advanced Data Protection (introduced 2022, expanded since) end-to-end encrypts more iCloud data when the user enables it, complicating cloud acquisition.

**Component-level analysis.** In extreme cases (suspect cooperation refused, no software approach succeeds), some labs employ chip-off analysis — physically removing the NAND flash and reading it externally. Modern iPhones make this very difficult because data is encrypted with keys in the Secure Enclave.

### Android acquisition

Android's security model has also strengthened but remains more fragmented than iOS because of the diverse manufacturer landscape (Samsung, Xiaomi, Huawei, Oppo, Vivo, Realme, OnePlus, and many others) and the wide range of Android versions in active use.

**Logical acquisition via ADB.**

*ADB (Android Debug Bridge) is the standard Android development tool that allows a computer to communicate with an Android device over USB or network, used in forensics to extract installed apps, system information, logs, and (with sufficient permissions) application data.*

Standard ADB acquisition requires USB debugging to be enabled on the device — which itself requires the device to be unlocked. Many Android devices in production have USB debugging disabled.

**ADB backup.** `adb backup -all` produces a backup file containing application data. Many apps opt out of backup (banking apps, messaging apps); the resulting backup is incomplete.

**Manufacturer-specific tools.** Samsung's Smart Switch, Xiaomi's Mi PC Suite — vendor backup tools that an examiner can repurpose.

**Root-based acquisition.** If the device is rooted (either by the user or by exploiting a vulnerability), file-system access is possible. Tools like the `dd` utility on the device can image partitions. Mounting `/data` reveals application databases, system logs, and other artefacts.

**Bootloader-based acquisition.** Some devices allow extraction through their bootloader (fastboot mode on Android). With unlocked bootloader, custom recovery images (TWRP) can boot the device and provide shell access.

**Cellebrite UFED, Magnet AXIOM, Oxygen Forensics.** Commercial tools support many Android models through various exploits and built-in capability. As with iOS, specific supported models change as exploits are added and patched.

**JTAG and chip-off.** Hardware-level acquisition for cases where software access is denied. JTAG uses test-access ports on the circuit board to read memory; chip-off physically removes the flash. Both require specialised equipment and skills.

**Cloud acquisition.** Google Account data (with credentials or court order) includes Google Drive, Photos, Maps Timeline, Calendar, Contacts, search history, and YouTube history. The Google Takeout interface (when the user is cooperative) or law-enforcement requests (when not) provide access. Synchronised Android device data (call logs, SMS depending on settings) may also be in the cloud.

### Acquisition decisions

The right approach depends on:
- **The device model and OS version.** Specific support varies by tool.
- **The lock state.** BFU vs AFU; with or without passcode.
- **The legal authority.** What can be lawfully done.
- **The required completeness.** Logical may be enough; physical may be necessary.
- **The time available.** Some methods are immediate; others may take days.
- **Tools available.** Commercial tools (Cellebrite Inseyets, GrayKey) are expensive; open-source alternatives have narrower capability.

The Cyber Bureau under Nepal Police operates a mobile-forensic capability. The maturity has grown over the years but resourcing constraints — particularly the cost of commercial tools and the rapid obsolescence of capability — remain real limitations. Cases requiring cutting-edge capability sometimes need to be referred to regional partners (typically Indian forensic labs).

### Preserving evidence on the device

When a phone is seized:

- **Power state.** If the device is on, attempt to keep it on. If off, leave it off (turning it on may trigger first-unlock state and could trigger remote-wipe).
- **Isolation from networks.** Faraday bag, airplane mode, or removing the SIM and ensuring Wi-Fi is off. Prevents remote wipe and incoming changes during the investigation. Some commercial Faraday-isolation cases include charging capability.
- **Preserve passcodes and biometrics.** Where the suspect provides cooperation (or where legally required), record passcodes. Some jurisdictions allow compelled biometric (fingerprint, face) unlocks but not compelled passcode entry — a legal distinction with technical implications.
- **Document everything.** Photographs of the device, SIM, packaging. Serial numbers, IMEI, model, condition.
- **Chain of custody.** From the moment of seizure.

The Foodmandu and Vianet breaches of 2020 included some Nepal-based mobile-forensic work as part of identifying actors; the specific techniques used were not publicly disclosed.

## 5.2 Recovering SMS, call logs, GPS data, application data

The acquired data — at whatever level — must be parsed and interpreted. The data structures vary by OS and by application; the standard forensic suites bundle parsers for thousands of artefacts.

### SMS and iMessage

**iOS.** SMS and iMessage are stored in `~/Library/SMS/sms.db` — a SQLite database. Key tables:
- `message` — individual messages with text, timestamps, sender/recipient mappings.
- `handle` — counterparties (phone numbers, email addresses for iMessage).
- `chat` — conversations.
- `chat_message_join` — links messages to chats.
- `attachment` — files attached to messages.

Forensic tools parse the database and present messages in conversation form. Deleted messages may remain in the database until VACUUM operations clean up — sometimes weeks or months.

**Android.** SMS storage varies by manufacturer skin but is generally in an SMS provider database (e.g., `mmssms.db` for AOSP). Same SQLite structure principles apply.

Tools extract messages with timestamps, sender/recipient, content, and read/sent status.

### Call logs

**iOS.** `CallHistory.storedata` — Core Data file (also SQLite-backed). Records calls with timestamps, durations, counterparty numbers, call types (incoming/outgoing/missed), originator (cellular, FaceTime, third-party VoIP).

**Android.** Call log in `contacts2.db` or the calls provider. Similar fields.

Call logs are often heavily used in investigations — establishing contact between suspects, confirming alibis or contradicting them, identifying communications networks.

### Contacts

**iOS.** `AddressBook.sqlitedb` — contacts with names, phone numbers, addresses, email, photos, notes.

**Android.** `contacts2.db`.

Contacts databases sometimes include synchronisation history showing when a contact was added, changed, or deleted. Useful for timeline analysis.

### GPS and location data

Modern mobile devices collect extensive location data, much of it forensically valuable.

**iOS sources.**
- **Cache.db** in various app sandboxes — location lookups by name, recent searches.
- **Significant Locations** (a setting Apple presents to users) — a database of regularly-visited places.
- **Photos metadata** — every photo includes EXIF data with GPS coordinates by default.
- **Maps app history.**
- **Find My** location records.
- **Health app** — workout routes if recorded.

**Android sources.**
- **Maps Timeline** (server-side, in Google account) — minute-by-minute location for users who have not disabled it.
- **Wi-Fi connection logs.**
- **Photo EXIF data.**
- **App-specific location data** (Uber/Pathao trips, Strava routes).

Location data, properly authenticated, can place a suspect at a specific location at a specific time. The 2024 incidents involving Foodmandu and Pathao delivery riders included location-data analysis to track movements during alleged offenses.

### Application data

This is where modern mobile forensics shines. Apps store rich data — much more than basic SMS or calls — and tools extract from hundreds of apps.

**Messaging apps.**

- **WhatsApp.** `msgstore.db` (Android) or `ChatStorage.sqlite` (iOS) — SQLite databases with messages, contacts, media references. End-to-end encrypted in transit and at rest; backups (Google Drive on Android, iCloud on iOS) may or may not be encrypted depending on configuration. Forensic recovery of WhatsApp messages is the single most common task in mobile forensics involving messaging.
- **Telegram.** Cache databases with messages, but cloud-stored messages (the default Telegram model) are not on-device unless cached. Secret chats are device-only and end-to-end encrypted.
- **Signal.** End-to-end encrypted; encrypted local storage with a key in the Android Keystore or iOS Keychain. Acquisition usually requires the device to be unlocked.
- **Facebook Messenger, Instagram DMs.** SQLite databases; cloud-synchronised so cloud acquisition is an alternate path.
- **Viber, WeChat, Line.** Each with its own database structure; supported by standard suites.

**Financial apps.**

In Nepal, particularly relevant:
- **eSewa, Khalti, IME Pay, FonePay.** Transaction histories, payee lists, cached account balances. These apps generally use additional encryption layers on stored data; access requires either the app's PIN (sometimes recoverable from keychain) or analysis through the database structure.
- **Mobile-banking apps (NIC Asia, Nabil, Standard Chartered, Global IME, etc.).** Similar; often with rigorous local protections.

**Browser data.**
- Safari (iOS) or Chrome (Android) history, bookmarks, downloads, autofill data, saved passwords (if accessible).

**Social media apps.**
- Facebook, Instagram, TikTok, YouTube, Twitter/X — cached posts, profile data, recently-viewed content, drafts.

**Photos and videos.**
- Camera roll with EXIF metadata.
- Hidden albums.
- Burst-mode and Live Photo artefacts.

**Document and productivity apps.**
- Notes, documents, calendar entries, reminders, tasks.

**Health and fitness.**
- Steps, heart rate, workouts, sleep patterns. Apple Watch and Fitbit data synced to phones provides movement and physiological records that have been used in criminal cases globally.

### SQLite database forensics

Most mobile-app data lives in SQLite databases. Several forensic considerations:

**Free-list pages.** SQLite databases that have had records deleted retain those records in "free" pages until VACUUM is run. Forensic tools recover deleted records from these pages.

**Journal files.** SQLite uses Write-Ahead Logging (WAL) or rollback journals; these contain recent transactions and may include data not yet committed to the main database file.

**Auxiliary databases.** Many apps use multiple databases — separate ones for messages, contacts, cache, settings. Examiners need to inspect all.

**Schema evolution.** Apps update their database schemas; older versions of an app may have different tables. Forensic tools include version-aware parsers.

Standard SQLite forensic tools:
- **DB Browser for SQLite.** Open-source GUI for examining SQLite databases.
- **SQLiteSpy.** Lightweight Windows GUI.
- **Forensic suites' built-in parsers** that automate parsing of recognised app databases.

### A worked mobile-forensic exercise

A WhatsApp-message subpoena in a financial-fraud case at a Nepali commercial bank.

1. **Acquisition.** The phone is acquired via Cellebrite UFED's iOS extraction (advanced logical, with passcode known).
2. **Extraction includes** the WhatsApp database `ChatStorage.sqlite` plus media files in `/Media`.
3. **The database is opened** in DB Browser. Tables include `ZWAMESSAGE`, `ZWAGROUPMEMBER`, `ZWAATTACHMENT`, `ZWAPROFILEPHOTO`, etc.
4. **Filter messages** for the time period of interest (March-April 2024) and the chat with the suspected counterparty.
5. **Extract messages with metadata** — timestamps in Apple's `ZMESSAGEDATE` (Apple's reference date adjusted), text content, sender identification.
6. **Recover deleted messages** from free-list pages with a SQLite forensic tool. Find three deleted messages that refer to "transfer," "account," and a specific amount matching the fraud.
7. **Extract referenced attachments** — photos and PDFs that were sent in the chat. The PDF turns out to be a forged loan-approval document.
8. **Document with hash values** of all extracted files; chain of custody from device seizure through extraction to current analysis.

The forensic findings are written into a report. The forensic examiner is prepared to testify about the methods, the tools, and the findings.

## 5.3 Tools — Andriller, Cellebrite, Oxygen Forensics Suite

### Andriller

*Andriller is an open-source mobile-forensics toolkit focused on Android, providing logical acquisition, decoding of common app artefacts, password cracking, and pattern-lock decoding, suitable for Android devices accessible via ADB or with root access.*

Andriller's capabilities:
- Logical acquisition of Android devices with USB debugging or root.
- Decoding of standard databases (SMS, call logs, contacts).
- App-specific decoders for WhatsApp, Facebook, Skype, Viber, and others.
- Lockscreen pattern, PIN, password cracking from extracted hashes.
- Reporting in HTML and other formats.

Andriller is free; the source code has been open-source historically but commercial editions (Andriller HQ) exist with extended capabilities.

Use cases for an MSc student: practice on personal/research devices; introduction to mobile-forensic concepts; smaller cases where commercial tooling is unavailable.

### Cellebrite

*Cellebrite is the market-leading commercial mobile-forensic platform from Cellebrite DI Ltd., providing extensive acquisition and analysis capability across iOS, Android, and feature phones, used by law-enforcement agencies and commercial forensic providers worldwide.*

The Cellebrite product line as of 2026:

**Cellebrite UFED (Universal Forensic Extraction Device).** The historical flagship — hardware device with companion software for forensic extraction. Now part of the broader product family.

**Cellebrite Inseyets / Cellebrite Premium.** Advanced product offering capability against newer iOS and Android devices, including some exploitation of unpatched vulnerabilities for AFU and (less reliably) BFU acquisition.

**Cellebrite Physical Analyzer.** Analysis software that parses extractions into a navigable case view.

**Cellebrite Endpoint Inspector.** For computer (not just mobile) extraction in field settings.

**Cellebrite Pathfinder.** Investigation-management platform.

Cellebrite is used heavily by law enforcement and is the de facto standard in many jurisdictions. The Cyber Bureau under Nepal Police uses or has used Cellebrite. The cost — hundreds of thousands of US dollars per seat per year — limits adoption outside law enforcement and well-funded commercial labs.

Cellebrite has been the subject of public controversy at times. Reports of vulnerabilities in the Cellebrite software itself (most notably Moxie Marlinspike's 2021 research) and debates about exports to particular jurisdictions have featured in news. None of these have substantively reduced its market position.

### Oxygen Forensics Suite

*Oxygen Forensics Suite is a commercial mobile-forensic platform from Oxygen Forensics Inc., providing acquisition and analysis for iOS, Android, and cloud sources, with particular strength in app-data parsing and cloud-services extraction.*

Oxygen's capabilities:

- Mobile-device acquisition (logical, file-system, physical via supported methods).
- Cloud extraction from major services (iCloud, Google, Microsoft, Facebook, Twitter/X, Instagram, WhatsApp via QR code, Telegram).
- Database parsing for hundreds of apps.
- Computer support (some workstation acquisition capability).
- Reporting and case management.

Oxygen is positioned at a price point between Cellebrite and the open-source options. Some law-enforcement and commercial labs prefer Oxygen for specific capabilities (notably cloud extraction).

### Other tools

**Magnet AXIOM.** Magnet Forensics' suite. Strong in mobile, cloud, and computer forensics with integrated analysis. Competing closely with Cellebrite in the law-enforcement market.

**MOBILedit Forensic.** Compelson's product. Smaller market share but capable.

**ALEAPP / iLEAPP / VLEAPP / RLEAPP.** Open-source parsers for Android, iOS, vehicles, returns. Created by Alexis Brignoni. Free and excellent for parsing extractions when commercial tools' parsing seems insufficient.

**XRY by MSAB.** Swedish company; significant in European law-enforcement use.

**Belkasoft.** Mobile component of Belkasoft Evidence Center.

### Tool selection considerations

| Factor | Open-source (Andriller, iLEAPP, ALEAPP) | Commercial (Cellebrite, Oxygen, AXIOM) |
|---|---|---|
| Cost | Free | Tens to hundreds of thousands USD/year |
| Acquisition capability | Limited to ADB and known exploits | Includes proprietary exploits |
| App parser coverage | Hundreds, growing | Thousands, refreshed by vendor |
| Reporting | Basic to good | Professional, customisable |
| Support | Community, GitHub issues | Vendor support contracts |
| Update cadence | Community-driven | Quarterly to monthly vendor releases |
| Court acceptance | Established but less common | Strong precedent |

For MSc-level study, an open-source-first approach is sensible. Andriller and ALEAPP/iLEAPP run on standard hardware and produce results comparable to commercial tools for unlocked devices. Familiarity with the commercial tools comes during industry roles.

### Hands-on workflow with Andriller

A typical learning exercise on an Android test device (a researcher's own phone with consent and appropriate ethics):

1. **Enable USB debugging** on the test device (Developer Options).
2. **Connect** via USB to a Linux workstation.
3. **Authorise** the debugging session (prompted on the device).
4. **Run Andriller**:
   ```
   andriller-gui
   ```
   Or command-line:
   ```
   andriller --output /path/to/results
   ```
5. **Wait for extraction** — typically 10-60 minutes for a moderately-used phone.
6. **Review the report** — Andriller produces an HTML report with messages, calls, contacts, location data, app extractions.
7. **Examine specific databases** with DB Browser for SQLite — for instance, the WhatsApp database for parsed-but-incomplete records.
8. **Look for deleted records** in SQLite free-list pages.
9. **Cross-reference** findings with cloud data (Google account download).
10. **Document the process** — Andriller's logs, the tool version, the extraction parameters.

The same workflow scales: a real case with a Cellebrite-extracted iOS device yields the same conceptual steps with commercial-tool integration.

### Ethical and legal considerations

Mobile forensics has particular ethical weight because phones contain so much private data:

- **Scope of extraction.** A warrant or consent for a specific case should constrain what is extracted and analysed. A bulk dump that is then mined for unrelated incriminating content (a "fishing expedition") is legally and ethically suspect.
- **Family and contact data.** A suspect's phone contains data about many other people who have no role in the case. Their privacy must be respected.
- **Medical and intimate data.** Photos, health records, intimate communications. Handling must be discreet.
- **Live evidence vs prior records.** Once a phone is acquired, the data extends back potentially years. The relevant time scope for the investigation should be defined.

The 2025 amendments to Nepal's IT and privacy frameworks introduced more explicit standards for mobile-evidence handling, but operational practice continues to evolve. For investigators and examiners, the discipline is to minimise extraction to what is necessary, document everything, and respect the privacy of innocent parties whose data appears incidentally in the extraction.

The next chapter shifts to a different challenge entirely — forensic work in cloud environments, where the investigator does not control the infrastructure that holds the evidence.
