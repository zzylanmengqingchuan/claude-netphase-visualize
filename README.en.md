# cn-visualize

[中文](./README.md)

A Claude Code skill that transforms computer networking concepts into interactive HTML visualizations, focused on **Chinese graduate entrance exam (408)** and undergraduate computer networking courses.

## Examples

**Protocol Sequence Diagram (TCP Three-Way Handshake and Four-Way Termination):**

[TCP interactive demo](https://dkfile.net/zzy/tcp_connection.html) — TCP three-way handshake and four-way termination interactive reference implementation

![TCP connection demo 1](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260427111927251.png?imageSlim)

![TCP connection demo 2](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260427112000483.png?imageSlim)

![TCP connection demo 3](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260427112040721.png?imageSlim)

![TCP connection demo 4](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260427112103839.png?imageSlim)

![TCP connection demo 5](https://zzy-1326340203.cos.ap-beijing.myqcloud.com//image-20260427112119523.png?imageSlim)

## Features

- Generates **complete single-file interactive HTML pages** (no external dependencies)
- Covers all six chapters of 408 computer networking curriculum
- Built-in CSS skeleton (with automatic dark mode) and four JS animation templates
- Supports multiple input scenarios:
  - Topic-based: "Demonstrate TCP three-way handshake" → teaching page with animation
  - PDF/textbook: Upload textbook → generates knowledge explanation page following the textbook's structure
  - Problem-based: "Show Dijkstra execution on this graph" → step-by-step animation
- Four specialized visualization templates:
  - **Sequence Diagram**: Protocol handshakes (TCP / DHCP / ARP / DNS / HTTP)
  - **Sliding Window**: Stop-and-Wait / GBN / SR / TCP window / congestion control
  - **Topology + Routing Table**: Dijkstra / RIP / OSPF / switch self-learning
  - **Congestion Control Chart**: Slow start / congestion avoidance / fast retransmit / fast recovery

## Installation

```bash
npx skills add zzylanmengqingchuan/claude-netphase-visualize
```

Or clone manually into the Claude Code skills directory:

```bash
git clone https://github.com/zzylanmengqingchuan/claude-netphase-visualize.git ~/.claude/skills/cn-visualize
```

## Project Structure

```
cn-visualize/
├── SKILL.md                    # Skill definition and usage guide (core)
├── assets/
│   ├── base.css                # CSS skeleton (color vars, layout, dark mode)
│   ├── boilerplate.js          # JS animation templates (4 types)
│   └── animation-html.html     # HTML animation skeletons (4 structures)
├── references/
│   └── tcp_connection.html     # Full reference: TCP handshake & wave goodbye
├── images/
│   ├── handshake-demo.png
│   ├── sliding-window-demo.png
│   └── dijkstra-demo.png
├── README.md                   # Chinese documentation
├── README.en.md                # This file
├── LICENSE                     # MIT
└── package.json
```

## Usage

Automatically activated in Claude Code after installation. Example triggers:

```
# Topic animation
Demonstrate TCP three-way handshake

# Algorithm visualization
Show Dijkstra algorithm steps on: A-B(4), A-C(2), B-C(1), B-D(5), C-D(8)

# Protocol explanation
Create an interactive page explaining DHCP address allocation

# Mechanism comparison
Compare GBN and SR sliding window protocols with visualization

# PDF explanation
[Upload textbook PDF] Generate a network layer explanation page based on this PDF
```

## Knowledge Coverage

| Chapter | Key Topics |
|---------|-----------|
| Architecture | OSI / TCP-IP models, encapsulation, performance metrics |
| Physical Layer | Nyquist/Shannon theorem, encoding/modulation, FDM/TDM/CDM |
| Data Link Layer | Framing, CRC, Hamming code, Stop-Wait/GBN/SR, CSMA/CD, CSMA/CA |
| Network Layer | IPv4/IPv6, subnetting, CIDR, ARP, DHCP, NAT, Dijkstra, RIP, OSPF |
| Transport Layer | TCP handshake/teardown, sliding window, congestion control, UDP |
| Application Layer | DNS, FTP, HTTP/1.0/1.1/2, SMTP/POP3, HTTPS |

## Acknowledgements

The skill framework design is inspired by [claude-algo-visualize](https://github.com/L0dyv/claude-algo-visualize). Thanks to the original author for open-sourcing their work.
