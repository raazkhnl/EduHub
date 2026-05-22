---
title: 'Chapter 3 — Memory Forensics'
sidebar_label: 'Ch 03 — Memory Forensics'
sidebar_position: 3
description: 'Chapter 3 of Digital Forensics and Incident Response (ENCTNS551).'
slug: /ioe/msncs/year-1-part-2/digital-forensics-incident-response/notes/ch03
tags: [msncs, ENCTNS551, notes]
last_update:
  date: 2026-05-22
  author: RaaZ Khanal
---

Disk forensics recovers what was written to persistent storage. Memory forensics recovers what was in RAM — the runtime state of the system at the moment of acquisition. Many of the most-valuable forensic findings exist only in memory: running processes, network connections, decrypted data, cryptographic keys, fileless malware that never touches disk, recent commands typed by an attacker. A disk image alone misses all of this. This chapter covers what memory contains, why it matters, how it is acquired, and how the standard tools — Volatility 3 and Rekall — extract evidence from it.

## 3.1 Analysing memory (RAM) contents

### Volatile memory

*Volatile memory, in the form of Random Access Memory (RAM), is the storage technology used by computers for working data — instructions and data actively being processed — distinguished from persistent storage by the property that its contents are lost when power is removed.*

Modern systems have GB to TB of RAM. Every running process has memory; the operating-system kernel has memory; cached files have memory; network buffers have memory. All of it disappears when the system loses power — unless captured before that happens.

### What is in memory

A snapshot of system memory typically contains:

**Process information.**
- The list of all running processes with PIDs, parent PIDs, command-line arguments, start times.
- Each process's loaded executable and libraries (DLLs on Windows, .so files on Linux, dylib on macOS).
- Each process's allocated memory regions and their contents.
- Open file handles, network sockets, registry handles.
- Environment variables.
- User and group identifiers.

**Kernel structures.**
- Kernel-loaded drivers and modules.
- Kernel data structures (process table, file table, network connection table).
- Interrupt vectors.
- Kernel-mode memory regions.

**Network state.**
- Active TCP and UDP connections — local and remote IPs and ports, connection states.
- Recently-closed connections (lingering in tables briefly).
- ARP cache, routing table.

**File system caches.**
- Recently-read file contents that the OS has cached.
- Recently-written file contents not yet flushed.
- Filename caches.

**User data and credentials.**
- Decrypted versions of data that on disk is encrypted.
- Cryptographic keys held in memory by applications.
- Passwords in plain text (depending on application implementation).
- Session tokens, cookies, authentication state.

**Application state.**
- Browser tabs, current URLs, recent searches.
- Open documents, unsaved changes.
- Chat messages, recently-sent and recently-received.
- Background-task data structures.

**Forensic artefacts unique to memory.**
- Code that was injected into another process.
- Hidden processes (sometimes hidden from the process table but visible elsewhere in memory).
- Hooks and patches in kernel structures.
- Recently-executed shell commands.
- The output of running services not written to logs.

The richness explains why memory forensics has become a central forensic capability.

### When memory matters most

Memory forensics is critical in specific scenarios:

**Live malware infection.** Modern malware often runs in memory only — "fileless" malware. PowerShell-based attacks, in-memory shellcode, dynamic injection. The malware never writes a persistent file; the disk image shows nothing unusual. Only memory forensics reveals the infection.

**Active attacker.** When an attacker is currently in the system, memory holds:
- Their active sessions and connections.
- Recently-typed commands.
- Tools loaded for exploitation.
- Stolen data being assembled before exfiltration.

**Encrypted data.** Where the disk is encrypted (BitLocker, LUKS, FileVault, VeraCrypt), the cryptographic keys are in memory when the system is running. Acquiring memory at this point captures the keys, allowing decryption of the disk that would otherwise be unreadable.

**Volatile communications.** End-to-end encrypted messaging (Signal, WhatsApp) decrypts messages only in memory; the encrypted backups on disk may be useless without keys held in RAM.

**Rapid response.** When responding within minutes of an alert, the attacker may still be in the system. Memory contains the live operational picture.

### Order of volatility

A foundational concept (RFC 3227, *Guidelines for Evidence Collection and Archiving*, 2002, still cited):

**The most volatile evidence must be collected first.**

The order from most to least volatile:

1. CPU registers and cache (extremely volatile — milliseconds).
2. Routing table, ARP cache, process table, kernel statistics (seconds).
3. Temporary file systems (minutes).
4. Disk (hours to years).
5. Remote logging and monitoring data (hours to years).
6. Physical configuration, network topology (years).
7. Archival media (years to decades).

In practice, the first two categories collapse into "memory" for forensic purposes. The principle stands: capture memory before disk; capture disk before backup archives.

## 3.2 Importance of analysing memory contents in digital forensics

### Findings only available from memory

Several categories of forensic findings exist only in memory:

**Injected code.** A common malware technique is to inject malicious code into a legitimate process. The on-disk executable looks normal; the malicious code lives only in the injected process's memory. Tools like Volatility's `malfind` plugin detect this pattern.

**Process hiding.** Some rootkits hide processes from the operating system's process-listing APIs. The process is running but does not appear in `tasklist` or `ps`. Memory forensics finds the process by enumerating kernel structures directly rather than asking the kernel.

**Network connections that closed.** A TCP connection that has been closed for hours leaves nothing on disk. In memory immediately after the close, the connection structure may still be present, revealing where the system connected to.

**Decrypted credentials.** Tools like Mimikatz extract Windows authentication credentials directly from memory of the LSASS process. Memory forensics applied to the same process reveals what was stolen. Other credentials — SSH keys loaded into the SSH agent, cloud-provider credentials cached in CLI tools, decrypted secrets in vault clients — similarly live in memory.

**Command history.** Some shells and applications keep command history in memory longer than they persist it to disk. Recent attacker commands may be recoverable from memory even after the history files have been cleared.

**Encryption keys.** As mentioned above, full-disk-encryption keys live in memory while the system runs. Acquiring memory before powering down is the only way to preserve decryption capability.

### Memory forensics in real incident response

A typical sequence in incident response at a Nepali bank's IT-security team after detecting a possible compromise:

1. Confirm the alert is real.
2. Isolate the affected system from the network (containment).
3. Acquire memory — the most volatile evidence.
4. Acquire disk image — slower but preserves persistent evidence.
5. Begin analysis in parallel — memory and disk teams.
6. Memory analysis quickly reveals:
   - A PowerShell process running unusual commands.
   - A network connection to an unfamiliar IP.
   - Injected code in an explorer.exe process.
7. The findings shape the disk analysis — what files to look for, what registry keys to examine, what logs to pull.
8. Containment is refined based on findings.

Without memory forensics, the picture would be much thinner. The disk might show only the legitimate PowerShell executable, with no indication of what was actually run.

### Limitations of memory forensics

Memory forensics is not a panacea:

- **Volatility.** The window for acquisition is short. Each minute the system runs, memory contents drift.
- **Acquisition impact.** The act of acquiring memory uses memory. Some artefacts may be overwritten by the acquisition tool itself.
- **OS and version dependence.** Memory layout depends on the operating system, its version, and patch level. Tools need accurate profiles. A new OS version may not yet be supported.
- **Anti-forensics.** Sophisticated malware can detect memory acquisition and modify behaviour. Some encrypt their own in-memory regions to defeat scanning.
- **Size.** A server with 256 GB of RAM produces a 256 GB memory dump. Storage, transfer, and analysis all become heavier.
- **Hibernation files.** `hiberfil.sys` on Windows contains a compressed memory snapshot from hibernation, but the system may not have hibernated recently or at all.

Despite these, memory forensics is a core capability that no serious incident-response programme can omit.

## 3.3 Memory dump analysis with Volatility and Rekall

### Acquisition tools

Before analysis, memory must be acquired. Standard tools:

**FTK Imager.** Free; includes memory-acquisition capability for Windows.

**Magnet RAM Capture.** Free standalone tool from Magnet Forensics.

**WinPMEM.** Open-source Windows memory acquisition; part of the Volatility framework.

**LiME (Linux Memory Extractor).** Open-source Linux kernel module for memory acquisition.

**MacOS memory acquisition.** Apple's strict kernel security (especially since macOS Big Sur) has made full-system memory acquisition harder. Tools like SUMURI Recon ITR work in some configurations; otherwise, virtual machines and analysis of paging files are alternatives.

**Hypervisor-level acquisition.** When the system runs in a virtual machine, the hypervisor can snapshot the VM's memory without disturbing the guest. VMware's `.vmem` files, Hyper-V's `.bin` files, and VirtualBox's `.sav` files are memory snapshots usable by Volatility.

**Hardware-based acquisition.** Specialised tools like PCILeech use DMA over PCIe to read memory without OS cooperation. Useful when the OS is uncooperative or compromised.

The acquired memory dump is a raw image file — bytes of memory, possibly in a vendor-specific wrapping. Most analysis tools accept raw dumps or convert from vendor formats.

### Volatility

*Volatility is an open-source memory forensics framework written in Python that analyses memory dumps from Windows, Linux, and macOS systems, providing dozens of plugins for extracting processes, network connections, registry hives, kernel modules, and other artefacts, the de facto standard in memory forensics.*

Volatility was started by Aaron Walters and Nick Petroni in the mid-2000s. It is open-source, free, and the dominant tool in the field.

**Volatility 2 vs Volatility 3.** Volatility 2 (written in Python 2) was the workhorse for over a decade. Volatility 3, released in October 2020, was a ground-up rewrite in Python 3 with a cleaner architecture. Both are still used as of 2026 — Volatility 3 for new analyses, Volatility 2 still encountered in older cases and tutorials.

**Profiles vs symbol tables.** Volatility 2 required manually specifying a "profile" matching the source OS and version (e.g., `Win10x64_19041`). Volatility 3 auto-detects this via symbol tables downloaded from Microsoft and other sources, simplifying use.

**Plugin architecture.** Both versions expose functionality through plugins. Each plugin extracts a specific category of artefact.

### Volatility 3 — basic usage

The command line:

```
vol -f memory.raw windows.pslist.PsList
```

This invokes Volatility on `memory.raw` with the `PsList` plugin (which lists processes). The plugin name format is `<os>.<plugin_family>.<PluginClass>` — `windows.pslist.PsList`, `linux.pslist.PsList`, `mac.pslist.PsList`.

Common Windows plugins:

- `windows.pslist.PsList` — list processes (from the EPROCESS list).
- `windows.psscan.PsScan` — scan for processes (catches hidden ones missed by `pslist`).
- `windows.pstree.PsTree` — process tree (showing parent-child).
- `windows.cmdline.CmdLine` — command-line arguments for each process.
- `windows.dlllist.DllList` — DLLs loaded by each process.
- `windows.handles.Handles` — open handles (files, registry keys, processes).
- `windows.netscan.NetScan` — network connections (TCP and UDP, current and recently closed).
- `windows.malfind.Malfind` — detects code injection patterns.
- `windows.modules.Modules` — kernel modules and drivers.
- `windows.svcscan.SvcScan` — Windows services.
- `windows.registry.hivelist.HiveList` — list registry hives in memory.
- `windows.registry.userassist.UserAssist` — UserAssist registry entries (recently-used programs).
- `windows.filescan.FileScan` — open files.
- `windows.cmdscan.CmdScan` and `windows.consoles.Consoles` — command-line history and consoles.

Similar plugins exist for Linux (`linux.pslist`, `linux.netstat`, `linux.lsof`, `linux.bash`) and macOS.

### A worked memory analysis

A simulated incident at a Nepali bank: an alert from the EDR indicates suspicious activity on a Windows workstation. Memory has been acquired.

**Step 1 — process list.**

```
vol -f mem.raw windows.pslist.PsList
```

Reveals 87 processes. Most look normal (svchost.exe, explorer.exe, chrome.exe, outlook.exe). One stands out: `powershell.exe` with PID 4192, started recently, parented by an unusual process.

**Step 2 — process tree.**

```
vol -f mem.raw windows.pstree.PsTree
```

Shows the parent of `powershell.exe (4192)` is `winword.exe (3120)`. PowerShell launched from Word — a classic indicator of macro-based malware.

**Step 3 — command line.**

```
vol -f mem.raw windows.cmdline.CmdLine --pid 4192
```

Shows the PowerShell command line is obfuscated, base64-encoded. Decoding it reveals a download-and-execute payload from a suspicious URL.

**Step 4 — network connections.**

```
vol -f mem.raw windows.netscan.NetScan
```

Shows a connection from `powershell.exe (4192)` to an IP address in a suspicious geographic range, port 443. The address resolves to a known command-and-control server in current threat intelligence.

**Step 5 — code injection scan.**

```
vol -f mem.raw windows.malfind.Malfind --pid 4192
```

Detects executable memory regions in `powershell.exe` that look like injected shellcode — anomalous regions not corresponding to legitimate DLLs.

**Step 6 — recent command history.**

```
vol -f mem.raw windows.cmdscan.CmdScan
```

Shows commands recently typed in command prompts including reconnaissance commands (whoami, ipconfig, net view, net group "Domain Admins").

**Combined picture.** A user opened a malicious Word document; the document's macro launched PowerShell with an obfuscated command; PowerShell downloaded and executed code; the code injected into the PowerShell process; established C2 connection; the attacker performed Active Directory reconnaissance.

The investigation continues with disk analysis (the Word document itself, persistence mechanisms), network analysis (full C2 traffic capture if available), and broader scope assessment (is this attacker on other systems?).

### Rekall

*Rekall is an open-source memory forensics framework, originally a fork of Volatility led by Google, that provides comparable capability with some architectural differences, particularly its interactive shell interface and integration into the GRR (Google Rapid Response) incident-response platform.*

Rekall's history is intertwined with Volatility. It started as a fork around 2013, developed by Michael Cohen at Google, with emphasis on:

- Interactive analysis through a Python-shell-like interface.
- Native integration with GRR for distributed live memory analysis.
- More aggressive symbol management.
- Some unique plugins.

Rekall and Volatility share much DNA. Rekall plugins are similar in spirit but sometimes differ in command syntax. Both can analyse common memory formats.

**Status in 2026.** Rekall is less actively maintained than Volatility, especially since Volatility 3's release. Many practitioners have consolidated on Volatility 3 for new work. Rekall remains useful for:
- Specific plugins where Rekall's implementation is preferred.
- Integration with GRR (still in operation at Google and some enterprises).
- Historical analyses where Rekall was the tool of record.

For an MSc student, learning Volatility 3 first is sensible; Rekall as a secondary tool.

### Comparing Volatility and Rekall

| Aspect | Volatility 3 | Rekall |
|---|---|---|
| Status | Actively developed | Less active |
| Language | Python 3 | Python 3 (some Python 2 legacy) |
| Interface | CLI + JSON output | CLI + interactive shell |
| Profile/symbol handling | Auto-download symbols (Windows) | Built-in profile management |
| Community size | Large, active | Smaller |
| Plugin ecosystem | Extensive | Extensive but less new development |
| Integration with platforms | Autopsy, many others | GRR, some others |
| Documentation | Volatility Foundation, books, courses | Rekall docs, some books |

### Other tools in memory analysis

**FTK Imager.** Can preview memory dumps and extract some artefacts.

**Bulk Extractor.** Scans memory dumps (and disk images) for strings, credit cards, IPs, URLs. Complementary to plugin-based analysis.

**WinPmem / OSXPmem / LinPmem.** Acquisition tools also from the Rekall/Volatility ecosystem.

**Belkasoft RAM Capturer and Belkasoft Evidence Center.** Commercial.

**ProcessHacker, Process Explorer.** Not strictly forensic — system-administration tools — but useful for live process examination on running systems.

### Hibernation file analysis

Windows' `hiberfil.sys` is a compressed memory snapshot from the last hibernation. Volatility can read it directly with the appropriate plugin, providing access to memory from a possibly distant past — sometimes weeks or months before the analysis. This can be invaluable when no live memory acquisition is possible but the system has hibernated since the events of interest.

Similarly, on macOS, the `sleepimage` file at `/var/vm/sleepimage` contains memory state from sleep. On Linux, swap partitions may contain memory pages, parsable by some tools.

### Pagefile analysis

`pagefile.sys` (Windows) and Linux swap partitions contain pages of memory that the OS evicted under pressure. They are not memory dumps in the sense of representing a coherent point in time, but they can contain plaintext data, cryptographic material, and other artefacts that were in memory at some point. Tools that work on raw disks can examine these files like any other data; specific forensic tools (page_brute, Volatility's pagefile-related plugins) extract pages and reconstruct as much as possible.

### Memory forensics in incident response

The integration with incident response (Chapter 1):

**Detection.** Memory features (process injection, hidden processes, unusual command lines) feed into detection. EDR tools watch live memory; forensic analysis works on snapshots.

**Containment.** Memory analysis confirms the scope of attacker activity before broader containment.

**Eradication.** Findings from memory guide what to remove from disk (persistence mechanisms, secondary tools).

**Recovery.** Cryptographic keys extracted from memory may be needed to recover encrypted data.

**Lessons learned.** Memory artefacts inform detection-engineering improvements for the future.

A mature programme treats memory acquisition as a default early step in incident response — not as an optional or special-case action.

### Learning path for MSc students

For an MSNCS student at IOE Pulchowk wanting to develop memory-forensics capability:

1. **Set up a lab.** Install Volatility 3 (`pip install volatility3`) on Linux. Download sample memory images from public sources (e.g., the Volatility Foundation's sample images, the SANS DFIR samples, the Cyber Defenders platform).
2. **Work through basic plugins.** Process listing, command lines, network connections.
3. **Solve CTF-style challenges.** Online platforms (Cyber Defenders, DFIR Madness, Sans DFIR challenges, HackTheBox Forensics tracks) offer memory-based challenges of increasing difficulty.
4. **Read core references.** The *Art of Memory Forensics* (Ligh, Case, Levy, Walters, 2014) is the canonical book; chapters of *Practical Malware Analysis* (Sikorski and Honig, 2012) cover memory analysis from the malware perspective.
5. **Stay current.** Follow the Volatility Foundation blog, the SANS DFIR blog, the DFIR Report, and security researchers on social platforms.

The progression from "can run `pslist`" to "can independently investigate a complex memory dump" takes months of practice. The capability, once developed, is valuable — and increasingly demanded by Nepali employers as the threat landscape mounts.

The next chapter shifts to evidence in motion — network forensics — covering what packets and flows tell investigators about communications between systems.
