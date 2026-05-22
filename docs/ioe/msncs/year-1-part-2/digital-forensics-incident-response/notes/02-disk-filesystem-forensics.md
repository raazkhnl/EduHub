---
title: 'Chapter 2 — Disk and Filesystem Forensics'
sidebar_label: 'Ch 02 — Disk and Filesystem Forensics'
sidebar_position: 2
description: 'Chapter 2 of Digital Forensics and Incident Response (ENCTNS551).'
slug: /ioe/msncs/year-1-part-2/digital-forensics-incident-response/notes/ch02
tags: [msncs, ENCTNS551, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

The disk — or, today, the SSD, NVMe drive, USB stick, SD card, or virtual disk image — is where most digital evidence lives. Files, deleted files, system artefacts, logs, browser history, application data, registry entries, slack space, unallocated space. The forensic examiner's job is to acquire all of this without altering any of it, then sift through it for evidence relevant to the case. This chapter covers how storage devices and filesystems are organised, how forensic images are made, how integrity is maintained, how deleted data is recovered, and how the standard tools — Autopsy, SleuthKit, FTK — support the work.

## 2.1 Storage devices and filesystem layout

### Categories of storage

Modern storage hardware spans several technologies, each with forensic implications.

**Hard disk drives (HDDs).** Magnetic storage on spinning platters. The traditional disk. Read/written by mechanical heads. Storage tends to be persistent — deleted data often physically remains on the platters until overwritten.

**Solid state drives (SSDs).** Flash memory chips. No moving parts. Faster than HDDs. **TRIM** commands, **wear levelling**, and **garbage collection** complicate forensics: deleted data may be erased proactively by the drive's firmware, not just marked deleted as on an HDD.

**NVMe drives.** SSDs using the NVMe protocol over PCIe. Faster than SATA SSDs. Forensically similar to other SSDs.

**USB and SD storage.** Removable flash storage. Same flash-memory considerations as SSDs but smaller scale and often without TRIM.

**Optical media.** CDs, DVDs, Blu-ray. Largely obsolete for general storage but still encountered.

**Virtual disks.** VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (QEMU/KVM), VDI (VirtualBox). Files in the host filesystem that appear as disks to the guest. Common in modern incident-response work on cloud and virtualised infrastructure.

**Tape.** Used in some backup systems. Sequential access; specific tooling needed for forensic acquisition.

### Why filesystem layout matters

When a file is "deleted" on an HDD, what happens depends on the filesystem. The file's content blocks are usually marked as available for new data, but the actual bytes remain on disk until overwritten. The filesystem's metadata may also retain pointers, names, timestamps. Understanding the layout is how examiners recover deleted data and reconstruct the timeline of activity.

On an SSD with TRIM, the picture is different. The drive may proactively erase blocks the filesystem says are free, making recovery much harder.

### Filesystem

*A filesystem is the data structure and software that organises how files are stored, named, retrieved, and managed on a storage device, providing an abstraction over the raw blocks of the storage medium.*

The major filesystems in 2026 use, and what they leave for forensics:

**NTFS (New Technology File System).** Windows' standard filesystem since Windows NT (1993). Used by all modern Windows desktop and server systems. Features:
- **Master File Table (MFT)** — the central index of every file. Each file has an MFT record with metadata, attributes, and (for small files) data.
- **Journaling** — `$LogFile` records filesystem operations; supports crash recovery.
- **Alternate data streams** — additional data attached to a file, sometimes used to hide content.
- **Permissions** — ACLs (access control lists) attached to files.

Forensic value: NTFS retains MFT records of deleted files for a long time. The MFT, `$LogFile`, `$UsnJrnl` (USN Journal), and `$Boot` are all artefact-rich.

**FAT32 and exFAT.** Older Windows filesystem (FAT32) and its modern flash-friendly cousin (exFAT). Used on most USB sticks, SD cards, and cross-platform external storage. Simpler than NTFS. Deleted-file recovery often easier because metadata is less heavily managed.

**ext4 (Fourth Extended Filesystem).** Linux's mainstream filesystem. Used by most servers and Linux desktops. Inode-based; journaled. Forensic considerations:
- Inodes hold file metadata; data blocks hold contents.
- The journal records recent operations.
- Deleted-file recovery is harder than on NTFS because Linux often clears the inode-to-block pointers; tools like `extundelete` and `ext4magic` recover by analysing the journal.

**APFS (Apple File System).** Apple's modern filesystem, replacing HFS+. Used on macOS (since 10.13, 2017), iOS, iPadOS. Features:
- Copy-on-write — modifications create new blocks without overwriting old ones; helpful for some recovery.
- Native encryption.
- Snapshots — point-in-time filesystem states.

**HFS+.** Apple's legacy filesystem. Still encountered on older Macs and external drives.

**Btrfs, ZFS, XFS.** Less-common but encountered in specific server environments.

### Storage layout — the layers

A disk has several layers from the bottom up:

```
Physical sectors (typically 512 bytes or 4 KiB on modern drives)
        ↓
Partitions (defined by partition table - MBR or GPT)
        ↓
Volumes (a filesystem occupies one or more partitions)
        ↓
Filesystem structures (MFT for NTFS, inode table for ext4, etc.)
        ↓
Files (visible to the OS)
        ↓
File slack, allocated space, unallocated space
```

### Partition table

*A partition table is the data structure at the start of a storage device that defines how the device is divided into logical regions (partitions), each of which can hold a separate filesystem.*

Two common partition schemes:

**MBR (Master Boot Record).** Older. Supports up to four primary partitions per disk; extended partitions allow more. Limited to disks of 2 TiB or less.

**GPT (GUID Partition Table).** Modern. Part of UEFI specification. Supports many more partitions and disks beyond 2 TiB.

Forensically, both schemes can be parsed by standard tools. Modified or corrupted partition tables sometimes hide partitions; forensic examiners look at the raw layout to find unaccounted space that may contain hidden filesystems.

### Allocated vs unallocated space

**Allocated space.** Blocks currently assigned to files visible in the filesystem.

**Unallocated space.** Blocks not assigned to any current file. Includes:
- Blocks of previously deleted files (whose content may still be present).
- Blocks that were never used.

**Slack space.** A file occupies some number of complete blocks. If the file's actual size is smaller than the blocks it occupies, the remaining bytes within the last block are **file slack**. The slack may contain residual data from previously-deleted files that occupied the same blocks.

Forensic analysis usually covers all three. Standard tools enumerate allocated files; carving tools (Section 2.4) reach into unallocated and slack space.

## 2.2 Forensic imaging and acquisition techniques

### Forensic image

*A forensic image is a bit-for-bit copy of a source storage device, capturing every sector — used, unused, slack, hidden — so that analysis can be performed on the copy while preserving the original unchanged.*

A forensic image is not the same as a normal backup. A normal backup copies files. A forensic image copies the entire storage device, including everything between, around, and within the files.

### Why image rather than analyse the original

The principle: **never modify the original evidence**. Reasons:
- The original is the legally most-significant artefact. If a question about the analysis arises, the original can be re-examined.
- Mounting and using a filesystem normally writes to it — last-access timestamps update, journal entries are added, recently-used lists change. Forensic mounting (read-only) avoids this, but the safest approach is to image first.
- The original may be needed in court physically.
- Multiple investigators may need to work in parallel on the same evidence.

### Image formats

Several formats are used:

**Raw image (DD or DDD).** Bit-for-bit identical to the source. Largest file size — no compression. Can be opened by any tool that reads disks. Standard file extension `.dd`, `.img`, `.raw`, or just no extension.

**EnCase Evidence File (E01).** Created by Guidance Software's EnCase tool. Compressed, with embedded metadata (case info, examiner, hashes). The de facto standard in commercial forensic work. Can be split across multiple files (E01, E02, E03, ...).

**Advanced Forensic Format (AFF / AFF4).** Open-source format with compression, metadata, and signatures. Less widespread than E01 but supported by most tools.

**Logical Evidence File (L01).** EnCase format for logical (file-level) extracts rather than physical images.

**SMART format.** Older format from ASR Data.

For an MSc-level project at IOE Pulchowk, raw DD images and E01 images are the most common in practice.

### Acquisition tools

The standard tools:

**dd (Unix utility).** The basic block-copy tool. Standard syntax:
```
dd if=/dev/sda of=/path/to/image.dd bs=4M conv=noerror,sync
```
Reads from `/dev/sda` (the source device), writes to `image.dd`, in 4 MiB blocks, continuing past errors and padding bad sectors with zeros.

`dd` is universally available, simple, and reliable, but provides no progress display, no hash, no metadata, and offers limited error handling.

**dcfldd.** A `dd` derivative developed by the US Department of Defense Computer Forensics Lab. Adds:
- Progress display.
- On-the-fly hashing.
- Multiple output streams.

**dc3dd.** Another forensically-focused `dd` derivative from the US DoD Cyber Crime Center. Similar features.

**FTK Imager.** AccessData's free imaging tool. Cross-platform GUI. Supports raw, E01, SMART formats. Widely used in commercial and academic forensics.

**EnCase.** Commercial. Full-featured imaging in the EnCase suite.

**Guymager.** Open-source GUI imaging tool common in Linux distributions like Kali and CAINE.

**Cellebrite UFED, Magnet AXIOM, BlackBag MacQuisition.** Specialised commercial tools.

### Live vs dead acquisition

**Dead acquisition.** The system is powered off; the storage device is removed (or accessed through a write blocker) and imaged externally.

- *Advantages:* Forensically pristine — the source is guaranteed unchanged.
- *Disadvantages:* Loses all volatile data (memory, running processes, open network connections). Disrupts operations.

**Live acquisition.** The system is running; the image is taken with the operating system active.

- *Advantages:* Preserves volatile data (Chapter 3 — memory forensics). Avoids disrupting operations. Works on always-on systems (servers, infrastructure).
- *Disadvantages:* The acquisition itself changes the system. Cannot achieve perfect bit-for-bit fidelity because data on the live filesystem changes during acquisition.

Modern incident response often does live acquisition first (memory plus filesystem snapshot) followed by dead acquisition when operations allow.

### Write blockers

*A write blocker is a hardware or software device that allows a host computer to read from a storage device but prevents any writes to it, used during dead acquisition to guarantee that the source media cannot be modified by the imaging process.*

Hardware write blockers are physical devices placed between the source drive and the forensic workstation. They intercept and discard any write commands while passing reads. The standard names in commercial forensics — Tableau, WiebeTech (CRU Forensic), Atola Insight — produce hardware write blockers for SATA, IDE, USB, PCIe, and NVMe interfaces.

Software write blockers achieve the same effect through OS-level intervention (mounting volumes read-only, blocking write syscalls). Less expensive but technically less robust because they depend on the OS behaving correctly. Used in lab settings where the trade-off is acceptable.

For court-defensible work, hardware write blockers are the standard.

### Acquisition steps

A typical dead acquisition:

1. **Document the scene.** Photograph the system, components, and connections before any disassembly.
2. **Plan the acquisition.** Source type, target capacity, expected duration.
3. **Power down properly or pull the plug?** Depends on the situation. For Windows systems with disk encryption (BitLocker, FileVault, LUKS), pulling power may lock the drive. Live extraction of keys may be needed first.
4. **Remove the source drive.** Disconnect from the original system.
5. **Attach via write blocker.** Connect the source through the write blocker to the forensic workstation.
6. **Verify access.** Confirm the OS sees the drive as expected.
7. **Image.** Run the chosen tool; wait for completion (an HDD image at typical speeds can take several hours; a multi-terabyte SSD with USB 3 might take a day).
8. **Verify the image.** Compute hash of the source and the image; verify they match.
9. **Document.** Chain of custody entries; tool versions; hash values.
10. **Store the image.** On controlled forensic storage; back up.
11. **Return the source drive to evidence custody.**

## 2.3 Maintaining the integrity of media under analysis

After imaging, all analytical work is done on the **image**, never the original. Maintaining integrity through the analysis has several components.

### Hash verification

The hash computed at acquisition is the integrity baseline. Standard practice:

- Compute the hash at acquisition (typically SHA-256 in 2026).
- Record the hash in the chain of custody.
- Before each analytical session, recompute the hash to verify the image is unchanged.
- After each session, recompute to verify nothing changed during analysis.

If the hash ever mismatches, the image is suspect — and the case must be reconstructed from a fresh acquisition (if the source is still available) or the relevant evidence may be lost.

Common hashes:

| Hash | Output size | Status |
|---|---|---|
| MD5 | 128 bits | Cryptographically broken; still useful for non-adversarial integrity |
| SHA-1 | 160 bits | Cryptographically broken since 2017; declining use |
| SHA-256 | 256 bits | Modern standard |
| SHA-512 | 512 bits | Used where extra margin is wanted |

For forensics, the "cryptographically broken" status matters less than for cryptographic protocols — the attack scenarios that break MD5 and SHA-1 are not directly applicable to forensic integrity verification. But modern best practice is SHA-256 for new work.

### Working copies

Many examiners do not analyse even the master image directly. Instead:

- The master image is stored read-only on forensic storage.
- A working copy is made for analysis.
- Analysis modifies the working copy if at all needed.
- The master image stays pristine for verification and re-analysis.

This adds storage cost but provides defence-in-depth against accidental modification.

### Mount options and analysis tools

When mounting the image for analysis, use read-only options:

Linux example:
```
mount -o ro,loop,offset=$OFFSET image.dd /mnt/forensic
```

Forensic suites (Autopsy, FTK, EnCase) handle this automatically — they open images in read-only mode by default and abstract the user from the filesystem.

### Documentation throughout

Every step recorded:
- Date and time.
- Tool used and version.
- Command line or configuration.
- Result.
- Hash verification status.

The documentation supports the chain of custody and the report.

## 2.4 Locating and recovering deleted data

The "deleted" content of a disk is often the most-valuable forensic resource. Several techniques recover it.

### How deletion works

**FAT/exFAT.** Deleting a file marks the first character of its filename with `0xE5` and frees its allocation entries in the FAT. The file's data blocks remain on disk until overwritten by new files. The directory entry remains; only its first byte is altered.

**NTFS.** Deleting a file unsets its "in use" flag in the MFT and frees its data clusters. The MFT record itself often persists — sometimes for very long periods on a working system — and the data clusters retain their contents until overwritten.

**ext4.** Deleting a file zeroes the inode pointers but the file's data blocks remain until overwritten. The journal may retain a record of the operation.

**APFS.** Copy-on-write means modified blocks are not overwritten in place; deleted file data may persist in snapshots.

### Recovery from filesystem metadata

For deleted files whose metadata is still intact:

**Tools that parse MFT for deleted entries.** AnalyzeMFT (a Python tool), MFTECmd (Eric Zimmerman's tool), built-in features of Autopsy and FTK.

**The Sleuth Kit's `fls` and `icat`.** `fls -r -d` lists deleted files; `icat` extracts content by inode number.

**`extundelete` for ext4.** Recovers deleted files by reading the journal.

For files whose metadata is gone but data blocks remain, file carving is needed.

### File carving

*File carving is the forensic technique of recovering files from raw unallocated space by recognising file signatures (magic bytes at the start of a file) and structures, without relying on filesystem metadata.*

The basic idea: many file types start with a distinctive byte sequence. JPEGs start with `FF D8 FF`. PDFs start with `%PDF-`. ZIP files start with `PK 03 04`. Office documents (DOCX, XLSX) are ZIPs with specific internal structures.

A carving tool scans the raw bytes of an image, finding sequences that match known file signatures, and attempts to extract the contiguous bytes belonging to each file.

Common file carving tools:

**Foremost.** Classic, fast, header-based carver. Configurable signatures.

**Scalpel.** Successor to Foremost. More efficient on large datasets.

**PhotoRec.** From the same project as TestDisk. Strong at multimedia file recovery.

**Bulk Extractor.** Not strictly a carver — it scans for specific information (email addresses, credit-card numbers, IPs, URLs) regardless of file structure. Complementary to file carvers.

### Limitations of carving

File carving has known weaknesses:

**Fragmented files.** Modern filesystems often store files in fragmented (non-contiguous) blocks. A simple carver that assumes contiguous data will recover only the first fragment. Advanced carvers (SmartCarving, in-place algorithms) try to reassemble fragments.

**Partial overwrites.** If the deleted file's blocks have been partially overwritten by new data, the recovered file is corrupted.

**Encryption.** Encrypted file content has no recognisable signature; carving fails.

**Compression.** Compressed files (deflate, gzip) within other files (Office documents are compressed) require decompression to be analysed.

**SSD TRIM.** As mentioned, TRIM may have erased the blocks before they can be carved.

### File slack analysis

File slack — the unused bytes at the end of a file's last block — can contain residual data from previously-deleted files. Forensic suites typically extract slack as part of the analysis. Carving can be applied to slack regions.

### Recovering from registry, browser, and application artefacts

Beyond files, many "deleted" actions leave traces in system metadata:

**Windows Registry.** Records run-MRU, recent docs, USB devices ever connected, mounted points, autorun entries, and much more. Tools like RegRipper, Registry Explorer (Eric Zimmerman's), and Autopsy plugins parse the hives.

**Browser history.** Even when a user clears history, traces remain in browser-specific caches, prefetch files, DNS cache, and (for some browsers) recoverable sqlite databases.

**Recycle Bin.** Files in the Recycle Bin (Windows) or Trash (macOS) are still recoverable until emptied. After emptying, the file data goes to unallocated space — carvable like any other deleted file.

**Shadow Copies (Windows).** Volume Shadow Service may have snapshots of the filesystem that contain older versions of files. ShadowCopy tools enumerate and extract.

**Hibernation file (`hiberfil.sys`).** Contains compressed memory contents from the last hibernation — a memory forensic artefact even when memory has not been separately acquired.

**Pagefile (`pagefile.sys`).** Memory pages written to disk under memory pressure. May contain plaintext that is no longer in RAM.

**Prefetch files.** Windows records information about recently-run executables, including timestamps and paths.

**Event logs.** Windows event logs record system, security, and application events. Even deleted entries from rotation may be partially recoverable.

Each of these is a distinct sub-investigation; forensic suites bring tools for each.

### A worked example

A bank in Kathmandu suspects an employee of exfiltrating customer records. The employee was observed copying files to a USB stick and the stick was recovered.

The forensic analysis:

1. Image the USB stick (E01 with verified SHA-256).
2. Open the image in Autopsy.
3. List allocated files: 12 PDFs and 8 spreadsheets — apparent personal documents.
4. Run "deleted files" extraction: 23 deleted files revealed by MFT records. Several are customer-data spreadsheets with names matching internal bank file conventions.
5. Carve unallocated space with PhotoRec: additional fragments of customer records, plus an installer for an exfiltration utility, plus a deleted screenshot of the internal customer database UI.
6. Examine MFT timestamps: shows files were copied to the USB stick over a 3-week period, with the last copy 2 days before the employee was confronted.
7. Examine USB-history artefacts from the bank's IT infrastructure (via setupapi.dev.log, EVTX events) to confirm which workstation the stick was inserted into.
8. Cross-reference timestamps with the employee's badge records to confirm presence on those dates.

The combined evidence is documented in a forensic report, with the original image hash and chain of custody supporting admissibility. The bank's legal team decides whether to terminate, prosecute, or both.

## 2.5 Common tools — Autopsy, SleuthKit, FTK

Several standard tools dominate disk forensic practice. An MSc student should know all of them.

### The Sleuth Kit (TSK)

*The Sleuth Kit is an open-source collection of command-line tools and a C library for analysing disk images and filesystems, developed by Brian Carrier, providing the foundation for many graphical forensic suites including Autopsy.*

TSK provides low-level access to filesystem structures. Key utilities:

- `mmls` — list partitions in a disk image.
- `fsstat` — display filesystem details.
- `fls` — list files (including deleted) in a filesystem.
- `ils` — list inode information.
- `icat` — extract file content by inode.
- `tsk_recover` — recover deleted files.
- `mactime` — generate timeline from filesystem timestamps.
- `blkls`, `blkcat`, `blkstat` — block-level operations.

TSK is the standard low-level tool. Used directly by command-line examiners; used internally by Autopsy and many other tools. Cross-platform; widely available; well-documented.

### Autopsy

*Autopsy is the open-source graphical forensic platform built on top of The Sleuth Kit, providing a user interface for case management, evidence browsing, keyword search, hash matching, timeline analysis, and many other tasks, used widely in education and in operational forensic work.*

Autopsy provides a Windows GUI (also a Java-based legacy version). Features:

- Case-based workflow with multiple data sources.
- Ingest modules that run automatically — hash calculation, file type identification, keyword search, EXIF extraction, browser history, registry parsing, etc.
- Timeline analysis viewer.
- Built-in support for Volatility (memory analysis — Chapter 3) and Plaso (timeline generation).
- Reporting in HTML, CSV, and case-specific formats.
- Plugin architecture for custom ingest modules.

Autopsy's strengths:
- Free and open-source.
- Cross-platform availability.
- Active development; substantial community.
- Suitable for MSc-level coursework and for many professional cases.

Autopsy's limitations:
- Less polished than commercial tools in some areas.
- Performance on very large datasets (multi-terabyte) can be slower than commercial alternatives.
- Some advanced features in commercial tools (mobile, cloud-specific analysis) less developed.

### FTK (Forensic Toolkit)

*FTK is a commercial integrated forensic platform from Exterro (formerly AccessData) that provides imaging, analysis, mobile forensics, eDiscovery, and case management capabilities, widely deployed in law enforcement and corporate forensic teams.*

FTK provides:
- FTK Imager (free) for acquisition.
- FTK Lab and FTK Enterprise for analysis.
- Database-backed processing for very large cases.
- Powerful indexing and search.
- Integration with AD Lab (formerly AccessData Lab) for collaborative work.

FTK's strengths:
- Mature, polished product.
- Performance on large cases.
- Strong vendor support.
- Established in courts and law enforcement worldwide.

FTK's costs:
- Substantial licence fees (typically thousands of US dollars per seat per year).
- Vendor lock-in for case files (though E01 images remain portable).

### EnCase

*EnCase is a commercial forensic platform from OpenText (formerly Guidance Software) that provides imaging, analysis, mobile and endpoint forensics, with deep integration into corporate IT environments, the historical incumbent in commercial forensics.*

EnCase is the historical market leader and remains widely deployed:
- EnScript scripting language for custom analysis.
- Endpoint capability (EnCase Endpoint Investigator, formerly Endpoint Security).
- Established case-format (E01).

Like FTK, EnCase is expensive and has a steep learning curve.

### Other commercial tools

**Magnet AXIOM.** Magnet Forensics' product. Growing market share, strong in mobile and cloud.

**X-Ways Forensics.** Lightweight, fast, German-developed. Strong following among power users.

**Belkasoft Evidence Center.** All-in-one tool with strong cross-platform support.

**Cellebrite UFED.** Dominant in mobile forensics (Chapter 5); also disk and cloud.

### Open-source alternatives

Beyond Autopsy and TSK:

**CAINE (Computer Aided INvestigative Environment).** Italian Linux distribution preconfigured with forensic tools.

**SANS SIFT Workstation.** SANS Institute's Ubuntu-based forensic distribution.

**Kali Linux.** Penetration-testing distribution with forensic tools included.

**Paladin.** Sumuri's forensic Linux distribution; live boot environment.

**REMnux.** Specialised distribution for malware reverse engineering (Chapter 7).

For an MSc student at IOE Pulchowk, a typical learning path: CAINE or SIFT for the live boot environment; Autopsy and TSK for case-based analysis; FTK Imager for acquisition. Hands-on with commercial tools comes in industry roles after graduation.

### Tool selection considerations

When selecting a tool for a project or a case:

| Factor | Considerations |
|---|---|
| Cost | Open-source vs commercial licence cost |
| Capability | Does it support the data sources you have? |
| Performance | Speed on the expected data volume |
| Reliability | Established or experimental? |
| Admissibility | Is the tool recognised by the relevant court system? |
| Reproducibility | Can another analyst reproduce results? |
| Training | What skill is required to use it well? |
| Reporting | Does the output suit the required deliverables? |
| Updates | Active development for current filesystem and OS support? |

For court-going work, prefer tools that are widely recognised, well-documented, and supported. For academic and internal use, open-source tools provide more flexibility at lower cost.

### Hands-on workflow with Autopsy

A typical learning exercise that an MSNCS student would complete:

1. **Acquire** a test image. Use FTK Imager or `dcfldd` to image a USB stick or a virtual disk. Record SHA-256.
2. **Verify** the image hash matches.
3. **Open Autopsy**, create a new case, add the image as a data source.
4. **Run ingest modules.** Let Autopsy index files, parse browser history, compute hashes, detect file types.
5. **Browse** the file tree; examine artefacts.
6. **Search** for keywords related to the investigative question.
7. **Examine deleted files** through the "Deleted Files" view.
8. **Carve** unallocated space if needed.
9. **View timeline** to see chronological activity.
10. **Tag** items of interest as evidence.
11. **Generate report.**

Several published tutorials, including the official Autopsy documentation and DFIR Madness resources, walk through this end-to-end. An MSc-level coursework exercise can complete this in a few hours; a real case may take days or weeks of patient examination.

The next chapter turns to a complementary but very different acquisition target — the volatile memory contents that disk forensics misses entirely.
