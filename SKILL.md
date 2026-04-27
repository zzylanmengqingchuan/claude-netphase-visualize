---
name: cn-visualize
description: >
  生成单文件的交互式计算机网络可视化 HTML 教学页面。
  适用场景：用户提问计算机网络相关知识点并要求可视化或交互演示，包括但不限于：
  协议交互过程（TCP三次握手/四次挥手、DHCP、ARP等）、分层模型与数据封装/解封装、
  滑动窗口与流量控制、路由算法（Dijkstra/Bellman-Ford/RIP/OSPF）、
  IP子网划分与地址计算、信道编码与差错控制（CRC/海明码）、
  介质访问控制（CSMA/CD、CSMA/CA）、拓扑结构、DNS查询流程、HTTP工作过程等。
  即使用户没有说"可视化"，只要涉及"画图"、"演示"、"展示过程"、"动画"、
  "交互"、"教学页面"、"逐步说明"等场景均应触发。
---

# 计算机网络交互式可视化页面生成技能

当用户针对计算机网络课程的知识点要求生成可视化、动画演示、交互式教学页面时，加载此技能。

> **定位**：生成**完整的单文件交互式 HTML 页面**，风格是"说人话的教学梳理"——有协议时序图、有状态机动画、有拓扑演示、有逐步交互。页面无外部依赖，可直接在浏览器打开。

---

## 覆盖知识体系（408考纲 + 本科课程交叉）

### 第一章 计算机网络体系结构
- OSI 七层模型 vs TCP/IP 四层/五层模型对比
- 各层功能、协议、典型设备对应关系
- 数据封装与解封装过程（PDU 变化：报文→段→数据报→帧→比特）
- 协议数据单元（PDU）在各层的名称与格式
- 网络性能指标：带宽、时延（发送时延/传播时延/处理时延/排队时延）、时延带宽积、RTT、吞吐量、信道利用率

### 第二章 物理层
- 数据通信基础：信道、信号、调制、编码
- 奈奎斯特定理与香农定理（极限数据率计算）
- 基带传输编码：NRZ、曼彻斯特编码、差分曼彻斯特编码
- 调制技术：ASK、FSK、PSK、QAM
- 多路复用：FDM（频分）、TDM（时分）、WDM（波分）、CDM（码分）
- 交换方式对比：电路交换、报文交换、分组交换（存储转发）

### 第三章 数据链路层
- **组帧**：字符计数法、字节填充法、比特填充法、物理层编码违禁法
- **差错控制**：
  - 奇偶校验（单/双）
  - CRC 循环冗余校验（模2除法计算过程）
  - 海明码（Hamming Code）编码与纠错原理
- **流量控制与可靠传输**：
  - 停止等待协议（Stop-and-Wait）
  - 滑动窗口原理
  - GBN（Go-Back-N）后退N帧协议
  - SR（Selective Repeat）选择重传协议
  - 信道利用率计算（含传播时延）
- **介质访问控制（MAC）**：
  - 信道划分：TDMA、FDMA、CDMA
  - 随机访问：ALOHA（纯/时隙）、CSMA、CSMA/CD（以太网）、CSMA/CA（802.11无线）
  - 轮询访问：令牌环
- **局域网**：以太网（IEEE 802.3）、MAC地址格式、以太网帧格式
- **无线局域网**：IEEE 802.11、CSMA/CA 工作原理、RTS/CTS 机制
- **广域网**：PPP协议（帧格式、状态机）、HDLC
- **数据链路层设备**：网桥、交换机（自学习算法）、VLAN

### 第四章 网络层
- **IP协议**：
  - IPv4 数据报格式（各字段含义）
  - IPv4 编址：分类地址（A/B/C/D/E）、子网划分、CIDR 无类域间路由
  - 子网掩码、网络地址、广播地址计算
  - IPv4 → IPv6 过渡：双栈、隧道技术
  - IPv6 报文格式与地址表示
- **地址解析**：
  - ARP 协议工作原理（请求/应答过程）
  - RARP 协议
- **网络层辅助协议**：
  - DHCP（地址动态分配，四步交互：Discover/Offer/Request/ACK）
  - ICMP（差错报告、ping/traceroute 原理）
  - NAT（网络地址转换，PAT/NAPT）
- **路由算法与路由协议**：
  - 静态路由 vs 动态路由
  - 距离向量算法（Bellman-Ford）→ RIP 协议
  - 链路状态算法（Dijkstra/SPF）→ OSPF 协议
  - 路径向量算法 → BGP 协议
  - AS（自治系统）内路由（IGP）vs AS间路由（EGP）
- **IP 多播**：IGMP、多播路由
- **移动 IP**：基本原理
- **网络层设备**：路由器（结构、转发流程）、SDN 基本概念

### 第五章 传输层
- 传输层功能：端到端通信、复用/分用、端口号
- **UDP 协议**：特点、报文格式、校验和计算
- **TCP 协议**：
  - 报文段格式（各标志位含义：SYN/FIN/ACK/RST/PSH/URG）
  - 三次握手（连接建立）完整状态机
  - 四次挥手（连接释放）完整状态机 + TIME_WAIT 原因
  - **可靠传输**：序号机制、确认机制、超时重传
  - **滑动窗口**：发送窗口/接收窗口/拥塞窗口
  - **流量控制**：接收窗口（rwnd）动态调整
  - **拥塞控制**：慢开始、拥塞避免、快重传、快恢复（AIMD算法）拥塞窗口变化图
  - TCP 计时器：重传计时器、坚持计时器、保活计时器、TIME_WAIT计时器
  - TCP 性能：吞吐量估算、RTT 估算

### 第六章 应用层
- **网络应用模型**：C/S 模型、P2P 模型
- **DNS**（域名系统）：
  - 域名空间结构（树形层次）
  - 域名解析过程：递归查询 vs 迭代查询
  - 资源记录类型（A/MX/CNAME/NS）
- **FTP**（文件传输协议）：主动模式 vs 被动模式、控制连接与数据连接
- **电子邮件**：
  - SMTP（发送）、POP3/IMAP（接收）工作流程
  - 邮件格式、MIME
- **万维网 WWW**：
  - HTTP/1.0 vs HTTP/1.1 vs HTTP/2（持久连接、管道化、多路复用）
  - HTTP 请求/响应报文格式
  - Cookie、Web缓存（代理服务器）
  - HTTPS = HTTP + TLS/SSL
- **P2P 应用**：BitTorrent 基本原理
- **网络管理**：SNMP 基本概念

---

## 铁律（违反任何一条 = 质量不合格）

### 铁律一：协议交互必须用时序图

凡涉及两个或多个实体之间的协议交互（握手、应答、请求-响应），**必须用 SVG 时序图**展示：
- 每个实体用一条竖直的**生命线**（lifeline）表示
- 消息用带箭头的**水平或斜线**表示，标注报文名称和关键字段
- 时间从上至下流动
- 状态变化（如 TCP 状态机）标注在生命线旁

**反面教材**：用纯文字列出"第一步…第二步…"，没有时序图——读者无法直观理解交互过程。

### 铁律二：SVG 元素绝对不能重叠，生命线和箭头必须精确对齐

- 生命线竖线的 x 坐标固定，所有发自/到达该实体的箭头端点 x 必须与之完全一致
- 箭头之间的 y 轴间距 ≥ 50px（给报文标签留足空间）
- 实体方框高度通常 30px，宽 80~100px，方框中心 x = 生命线 x
- viewBox 高度 = 最后一个消息的 y 坐标 + 60（底部留白）

### 铁律三：状态机必须完整展示状态和迁移条件

凡涉及协议状态机（TCP 三次握手状态、PPP 状态机等），必须：
- 用 SVG 圆角矩形表示每个状态
- 用带箭头的曲线/折线表示状态迁移
- 箭头上标注触发条件（如"收到 SYN"）和执行动作（如"发送 SYN+ACK"）
- 关键状态（ESTABLISHED、TIME_WAIT 等）用不同颜色高亮

### 铁律四：数值计算过程必须逐步可见

凡涉及计算（子网划分、CRC 校验、海明码编码、信道利用率、窗口大小等），必须：
- 用交互式动画逐步展示计算过程，每步高亮当前操作位/当前行
- 子网划分：展示二进制对齐视图，高亮网络位和主机位
- CRC/海明码：展示模2除法竖式或编码矩阵，逐步填入

### 铁律五：拓扑图中节点间距充足，路径高亮清晰

凡涉及网络拓扑（路由演示、生成树、VLAN 划分等）：
- 节点圆形半径 r = 20~24，节点圆心距 ≥ 80px
- 链路用直线或折线，标注带宽/代价
- 路由路径高亮用 stroke-width 加粗 + 颜色变化
- viewBox 边距至少 30px

### 铁律六：正文为主，彩色框为辅（整页 ≤ 4 个彩色 callout 框）

页面内容 80%+ 用 `<p>` 段落写，定义、公式用 `<p>` + `<b>` 内联，不滥用彩色框。

---

## 输入类型与工作流

### 类型 A：协议交互演示（握手/应答/查询流程）

适用：TCP 握手/挥手、DHCP 四步、ARP 请求应答、DNS 查询、HTTP 请求响应等。

**工作流**：
1. 确定参与实体（2~4个），规划生命线 x 坐标
2. 梳理完整的消息序列，每条消息标注：方向、名称、关键字段值
3. 用 SVG 静态图展示完整时序，再做交互动画逐条高亮消息
4. 在时序图旁标注每步的"状态变化"或"目的"

### 类型 B：算法/协议机制动画

适用：滑动窗口（GBN/SR）、拥塞控制窗口变化、路由算法（Dijkstra/Bellman-Ford）、交换机自学习等。

**工作流**：
1. 设计 steps 数组，每步包含完整状态快照
2. 数组/表格类状态用格子可视化（类似数据结构 skill 的数组视图）
3. 图/拓扑类状态用 SVG 节点+边，高亮当前处理的节点/边
4. 每步配说明文字，解释"此刻发生了什么"

### 类型 C：分层模型与封装/解封装

适用：OSI/TCP-IP 模型对比、数据封装过程、PDU 格式拆解。

**工作流**：
1. 用 SVG 横向分层图展示层次结构
2. 封装动画：数据块从上层到下层，逐层添加首部（Header），视觉上在左侧"拼接"一块
3. 解封装动画：反向，逐层剥离首部
4. 每层旁标注该层协议名称和 PDU 名称

### 类型 D：数值计算过程

适用：子网划分、CRC 校验、海明码、信道利用率、窗口大小计算等。

**工作流**：
1. 展示题目和已知条件
2. 设计交互式逐步计算动画，每步高亮当前操作
3. 子网划分用二进制对齐表格，高亮主机位/网络位
4. 最终结果用 `.ok` callout 框总结

### 类型 E：概念对比

适用：TCP vs UDP、OSI vs TCP-IP、GBN vs SR、RIP vs OSPF、HTTP/1.0 vs HTTP/1.1 等。

**工作流**：
1. 用 `.compare` 并排展示两个概念
2. 每侧配 SVG 示意图
3. 差异用表格列出，共同点用 `<p>` 说明

---

## 可视化模板体系

计算机网络的可视化对象与数据结构不同，需要以下专用模板。

### 模板一：时序图（Sequence Diagram）

用于：TCP握手/挥手、DHCP、ARP、DNS、HTTP等所有协议交互。

**SVG 结构规范**：

```html
<!-- 2个实体示例：客户端(x=120) 和 服务器(x=480) -->
<svg width="100%" viewBox="0 0 600 [动态高度]">
  <!-- 实体方框 -->
  <rect x="70" y="10" width="100" height="30" rx="4"
        fill="var(--gnb)" stroke="var(--gn)" stroke-width="1.5"/>
  <text x="120" y="30" text-anchor="middle" font-size="13"
        fill="var(--gn)" font-family="var(--sans)">客户端</text>

  <rect x="430" y="10" width="100" height="30" rx="4"
        fill="var(--gnb)" stroke="var(--gn)" stroke-width="1.5"/>
  <text x="480" y="30" text-anchor="middle" font-size="13"
        fill="var(--gn)" font-family="var(--sans)">服务器</text>

  <!-- 生命线（虚线） -->
  <line x1="120" y1="40" x2="120" y2="[底部y]"
        stroke="var(--fg2)" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="480" y1="40" x2="480" y2="[底部y]"
        stroke="var(--fg2)" stroke-width="1" stroke-dasharray="4,4"/>

  <!-- 消息箭头（左→右）：SYN -->
  <line x1="120" y1="80" x2="465" y2="80"
        stroke="var(--hl)" stroke-width="2"/>
  <polygon points="465,75 480,80 465,85" fill="var(--hl)"/>
  <text x="300" y="73" text-anchor="middle" font-size="12"
        fill="var(--hl)" font-family="var(--mono)">SYN seq=0</text>

  <!-- 消息箭头（右→左）：SYN+ACK -->
  <line x1="480" y1="130" x2="135" y2="130"
        stroke="var(--nw)" stroke-width="2"/>
  <polygon points="135,125 120,130 135,135" fill="var(--nw)"/>
  <text x="300" y="123" text-anchor="middle" font-size="12"
        fill="var(--nw)" font-family="var(--mono)">SYN+ACK seq=0 ack=1</text>
</svg>
```

**颜色约定**：
- 客户端→服务器消息：`var(--hl)`（蓝色）
- 服务器→客户端消息：`var(--nw)`（绿色）
- 丢失/超时消息：`var(--pp)`（红色）虚线箭头
- 重传消息：`var(--sw)`（橙色）
- 当前高亮步骤消息：加粗 stroke-width=3

**交互动画 JS 结构**：

```javascript
// 时序图步骤动画 - 适用于所有协议握手/应答场景
const seqSteps = [
  {
    cap: "第一步：客户端发送 SYN，请求建立连接",
    active: 0,          // 当前高亮的消息索引（从0开始）
    states: {           // 各实体当前状态
      client: "SYN_SENT",
      server: "LISTEN"
    }
  },
  // ...
];

let seqCur = 0;
const seqMsgs = document.querySelectorAll('.seq-msg');  // 所有消息元素

function seqRender(s) {
  // 先全部置灰
  seqMsgs.forEach((el, i) => {
    el.style.opacity = i < s.active ? '0.35' : (i === s.active ? '1' : '0');
    el.style.strokeWidth = i === s.active ? '3' : '1.5';
  });
  // 显示说明文字
  document.getElementById('seq-cap').innerHTML = s.cap;
  // 更新状态标签
  if (s.states) {
    document.getElementById('client-state').textContent = s.states.client || '';
    document.getElementById('server-state').textContent = s.states.server || '';
  }
}

function seqGo(d) {
  seqCur = Math.max(0, Math.min(seqSteps.length - 1, seqCur + d));
  seqRender(seqSteps[seqCur]);
}

seqRender(seqSteps[0]);
```

---

### 模板二：分层封装/解封装动画

用于：OSI/TCP-IP 模型、数据封装过程演示。

**SVG 结构规范**：每层用一个横向矩形，从上到下叠加首部：

```html
<!-- 封装视图：每层横向矩形，首部在左侧累加 -->
<svg width="100%" viewBox="0 0 700 280">
  <!-- 应用层：纯数据 -->
  <rect x="200" y="20" width="460" height="36" rx="3"
        fill="var(--gnb)" stroke="var(--gn)" stroke-width="1"/>
  <text x="430" y="43" text-anchor="middle" font-size="13"
        fill="var(--gn)">应用数据</text>
  <text x="90" y="43" text-anchor="middle" font-size="12"
        fill="var(--fg2)">应用层</text>

  <!-- 传输层：TCP首部 + 数据 -->
  <rect x="130" y="76" width="70" height="36" rx="3"
        fill="var(--hl-bg)" stroke="var(--hl)" stroke-width="1.5"/>
  <text x="165" y="99" text-anchor="middle" font-size="11"
        fill="var(--hl)">TCP首部</text>
  <rect x="200" y="76" width="460" height="36" rx="3"
        fill="var(--gnb)" stroke="var(--gn)" stroke-width="1" opacity="0.6"/>
  <!-- ... 以此类推 -->
</svg>
```

**动画逻辑**：steps 控制各层首部的显示/隐藏，以及当前活跃层的高亮颜色。

---

### 模板三：拓扑图 + 路由动画

用于：路由算法演示（Dijkstra/RIP）、生成树协议、VLAN 划分等。

**节点规范**：
- 路由器节点：六边形或圆形，r=22，圆心距 ≥ 90px
- 主机节点：矩形，18×12px
- 交换机节点：菱形
- 链路：直线，标注代价/带宽

**steps 数据结构**（与 claude-algo-visualize 的模板B类似）：

```javascript
const topoSteps = [
  {
    cap: "初始状态：已知源节点A到各节点的直接代价",
    nodes: [
      { id: "A", x: 100, y: 150, label: "A", cf: "hl", dist: 0 },
      { id: "B", x: 250, y: 80,  label: "B", cf: "",   dist: "∞" },
      { id: "C", x: 250, y: 220, label: "C", cf: "",   dist: "∞" },
    ],
    edges: [
      { from: "A", to: "B", cost: 4, highlight: false },
      { from: "A", to: "C", cost: 2, highlight: false },
    ],
    table: [   // 距离向量表或最短路表，可选
      { node: "A", dist: 0,   via: "-",  done: true },
      { node: "B", dist: "∞", via: "-",  done: false },
    ]
  }
];
```

---

### 模板四：滑动窗口动画

用于：停等协议、GBN、SR、TCP 滑动窗口、拥塞控制窗口变化。

**视图结构**：发送缓冲区（横向帧序列）+ 接收缓冲区 + 窗口边界标记。

```javascript
// 每帧的状态
const frameStates = {
  // 帧状态: 'sent_acked'|'sent_unacked'|'can_send'|'cannot_send'|'received'|'hole'
  frames: [
    { seq: 0, state: 'sent_acked' },
    { seq: 1, state: 'sent_unacked' },
    { seq: 2, state: 'sent_unacked' },
    { seq: 3, state: 'can_send' },
  ],
  sendBase: 1,   // 窗口左边界
  nextSeq: 3,    // 下一个待发序号
  windowSize: 3,
  cap: "帧1、2已发送未确认，帧3可立即发送"
};
```

**颜色约定**：
- `sent_acked`（已确认）：`var(--ok)` 绿色实心
- `sent_unacked`（已发未确认）：`var(--hl)` 蓝色
- `can_send`（窗口内可发）：`var(--gnb)` 浅色边框
- `cannot_send`（窗口外不可发）：`var(--dim)` 灰色
- `hole`（SR接收方缺洞）：`var(--pp)` 红色

---

### 模板五：二进制计算动画

用于：CRC 校验、子网划分、海明码编码。

**子网划分视图**：
```html
<!-- 32位 IP 地址对齐视图 -->
<div class="ip-bits">
  <span class="net-bit">1</span><span class="net-bit">1</span>...
  <span class="host-bit">0</span><span class="host-bit">0</span>...
</div>
```

**CRC 模2除法**：
- 被除数各位排成一行，逐步展示商和余数，每步高亮参与计算的一组位

---

## CSS 骨架（直接嵌入 `<style>` 标签）

```css
/* ===== 基础变量 ===== */
:root {
  --bg: #ffffff; --bg2: #f5f5f5; --bg3: #ebebeb;
  --fg: #1a1a1a; --fg2: #555; --fg3: #888;
  --hl: #2563eb; --hl-bg: #eff6ff;
  --nw: #16a34a; --nw-bg: #f0fdf4;
  --sw: #d97706; --sw-bg: #fffbeb;
  --pp: #dc2626; --pp-bg: #fef2f2;
  --ok: #15803d; --ok-bg: #dcfce7;
  --dim: #9ca3af;
  --gn: #374151; --gnb: #f9fafb;
  --sans: system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: "JetBrains Mono", "Fira Code", Consolas, monospace;
  --r: 8px; --shadow: 0 1px 4px rgba(0,0,0,.08);
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111827; --bg2: #1f2937; --bg3: #374151;
    --fg: #f9fafb; --fg2: #d1d5db; --fg3: #9ca3af;
    --hl: #60a5fa; --hl-bg: #1e3a5f;
    --nw: #4ade80; --nw-bg: #14532d;
    --sw: #fbbf24; --sw-bg: #451a03;
    --pp: #f87171; --pp-bg: #450a0a;
    --ok: #4ade80; --ok-bg: #14532d;
    --gnb: #1f2937; --gn: #e5e7eb;
  }
}

/* ===== 布局 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--sans); background: var(--bg); color: var(--fg);
       line-height: 1.7; font-size: 15px; }
.c { max-width: 860px; margin: 0 auto; padding: 32px 20px 80px; }
h1 { font-size: 2rem; font-weight: 700; margin-bottom: 6px; }
h2 { font-size: 1.35rem; font-weight: 600; margin: 40px 0 14px;
     padding-bottom: 6px; border-bottom: 2px solid var(--bg3); }
h3 { font-size: 1.1rem; font-weight: 600; margin: 28px 0 10px; }
h4 { font-size: .95rem; font-weight: 600; margin: 18px 0 8px; color: var(--fg2); }
p  { margin-bottom: 14px; }
.sub { color: var(--fg2); margin-bottom: 32px; }
a  { color: var(--hl); text-decoration: none; }
a:hover { text-decoration: underline; }
b, strong { font-weight: 600; }
code { font-family: var(--mono); font-size: .88em;
       background: var(--bg2); padding: 1px 5px; border-radius: 4px; }
pre  { font-family: var(--mono); font-size: .85em; background: var(--bg2);
       padding: 16px; border-radius: var(--r); overflow-x: auto; margin-bottom: 16px; line-height: 1.6; }
svg  { max-width: 100%; height: auto; display: block; margin: 16px auto; }

/* ===== 目录 ===== */
.toc { background: var(--bg2); border-radius: var(--r); padding: 16px 20px; margin-bottom: 32px; }
.toc h3 { margin: 0 0 8px; font-size: .95rem; }
.toc ol { padding-left: 20px; }
.toc li { margin: 4px 0; font-size: .9rem; }

/* ===== Callout 框（极克制使用，整页 ≤ 4 个）===== */
.info, .warn, .ok, .def { border-radius: var(--r); padding: 12px 16px;
                           margin: 16px 0; font-size: .93rem; }
.info { background: var(--hl-bg); border-left: 3px solid var(--hl); }
.warn { background: var(--sw-bg); border-left: 3px solid var(--sw); }
.ok   { background: var(--ok-bg); border-left: 3px solid var(--ok); }
.def  { background: var(--bg2);   border-left: 3px solid var(--fg3); }

/* ===== 对比布局 ===== */
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
.compare > div { background: var(--bg2); border-radius: var(--r); padding: 14px 16px; }
@media (max-width: 600px) { .compare { grid-template-columns: 1fr; } }

/* ===== 动画容器 ===== */
.w { background: var(--bg2); border-radius: var(--r); padding: 20px;
     margin: 16px 0; box-shadow: var(--shadow); }
.w svg { margin: 0 auto; }
.cap { font-size: .9rem; color: var(--fg2); margin-top: 12px; min-height: 2.4em; line-height: 1.5; }
.cap b { color: var(--fg); }
.btns { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.btn { padding: 6px 18px; border: none; border-radius: 6px; cursor: pointer;
       font-size: .88rem; font-family: var(--sans);
       background: var(--bg3); color: var(--fg); transition: background .15s; }
.btn:hover { background: var(--hl); color: #fff; }
.btn:disabled { opacity: .4; cursor: default; }
.step-info { font-size: .82rem; color: var(--fg3); margin-left: auto; align-self: center; }

/* ===== 帧/窗口视图（滑动窗口）===== */
.frames { display: flex; gap: 4px; flex-wrap: wrap; margin: 12px 0; }
.fr { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
      border-radius: 6px; font-family: var(--mono); font-size: .85rem; font-weight: 600;
      border: 2px solid transparent; transition: all .25s; }
.fr.acked   { background: var(--ok-bg);  border-color: var(--ok);  color: var(--ok); }
.fr.unacked { background: var(--hl-bg);  border-color: var(--hl);  color: var(--hl); }
.fr.cansend { background: var(--gnb);    border-color: var(--gn);  color: var(--fg); }
.fr.nosend  { background: var(--bg3);    border-color: var(--dim); color: var(--dim); }
.fr.hole    { background: var(--pp-bg);  border-color: var(--pp);  color: var(--pp); }
.fr.rcvd    { background: var(--nw-bg);  border-color: var(--nw);  color: var(--nw); }
.win-marker { font-size: .78rem; color: var(--fg3); text-align: center; margin-top: 4px; }

/* ===== 路由/距离表格 ===== */
.route-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: .88rem; }
.route-table th { background: var(--bg3); padding: 6px 10px; text-align: left; font-weight: 600; }
.route-table td { padding: 6px 10px; border-bottom: 1px solid var(--bg3); font-family: var(--mono); }
.route-table tr.active td { background: var(--hl-bg); color: var(--hl); }
.route-table tr.done td   { background: var(--ok-bg); color: var(--ok); }
.route-table tr.updated td { background: var(--sw-bg); color: var(--sw); }

/* ===== IP位图 ===== */
.ip-row { display: flex; gap: 2px; margin: 8px 0; flex-wrap: wrap; }
.ip-bit { width: 22px; height: 28px; display: flex; align-items: center; justify-content: center;
           font-family: var(--mono); font-size: .85rem; border-radius: 3px; border: 1px solid var(--bg3); }
.ip-bit.net  { background: var(--hl-bg);  border-color: var(--hl);  color: var(--hl); }
.ip-bit.host { background: var(--nw-bg);  border-color: var(--nw);  color: var(--nw); }
.ip-bit.sub  { background: var(--sw-bg);  border-color: var(--sw);  color: var(--sw); }

/* ===== 编号步骤 ===== */
.sb { display: flex; gap: 10px; margin: 8px 0; align-items: flex-start; }
.sn { min-width: 24px; height: 24px; border-radius: 50%; background: var(--hl);
      color: #fff; font-size: .8rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.st { flex: 1; }

/* ===== 代码面板（协议状态机联动）===== */
.code-panel { background: var(--bg); border: 1px solid var(--bg3); border-radius: var(--r);
              padding: 12px 16px; font-family: var(--mono); font-size: .83rem;
              line-height: 1.8; margin-bottom: 12px; overflow-x: auto; }
.cl { padding: 0 8px; border-radius: 3px; transition: background .2s; color: var(--fg2); white-space: pre; }
.cl.on { background: var(--hl-bg); color: var(--hl); font-weight: 600; }

/* ===== 表格 ===== */
table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: .9rem; }
th { background: var(--bg3); padding: 8px 12px; text-align: left; font-weight: 600; }
td { padding: 8px 12px; border-bottom: 1px solid var(--bg3); }

/* ===== 键盘提示 ===== */
.kbd-hint { font-size: .78rem; color: var(--fg3); margin-top: 6px; }
kbd { display: inline-block; padding: 1px 6px; border: 1px solid var(--bg3);
      border-radius: 4px; font-family: var(--mono); font-size: .8em; }
```

---

## 完整页面结构模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[知识点标题] - 计算机网络可视化</title>
  <style>
    /* 粘贴上方 CSS 骨架 */
  </style>
</head>
<body>
<div class="c">
  <h1>[标题]</h1>
  <p class="sub">[一句话概括，如：TCP 三次握手的完整状态机与报文交互演示]</p>
  <div class="toc">
    <h3>目录</h3>
    <ol>
      <li><a href="#s1">...</a></li>
      <li><a href="#s2">...</a></li>
    </ol>
  </div>

  <!-- 各章节：正文为主，SVG 紧跟概念之后 -->
  <h2 id="s1">1. [概念]</h2>
  <p>正文段落，<b>关键词</b>加粗，定义公式都用 &lt;p&gt; 写...</p>
  <!-- 静态 SVG 图示 紧跟在此 -->

  <h2 id="s2">2. [交互演示]</h2>
  <p>说明文字...</p>
  <div class="w">
    <!-- 时序图 SVG 或 拓扑图 SVG -->
    <div id="cap" class="cap">初始状态...</div>
    <div class="btns">
      <button class="btn" onclick="go(-1)">← 上一步</button>
      <button class="btn" onclick="go(1)">下一步 →</button>
      <span class="step-info" id="step-counter">1 / N</span>
    </div>
    <p class="kbd-hint">也可使用键盘 <kbd>←</kbd> <kbd>→</kbd> 翻步</p>
  </div>

  <h2 id="sN">N. 总结</h2>
  <p>回顾核心知识点...</p>
  <div class="ok">核心结论一句话</div>
</div>
<script>
  // 动画逻辑（按场景选用对应模板）
  // 键盘导航（所有动画页面都加）
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
  });
</script>
</body>
</html>
```

---

## 各知识点的可视化建议（快速参考）

| 知识点 | 推荐可视化形式 | 动画模板 |
|--------|---------------|---------|
| OSI/TCP-IP 分层模型 | 横向分层 SVG + 各层协议标注 | 模板三（封装动画） |
| 数据封装/解封装 | 逐层添加首部动画 | 模板二 |
| 奈奎斯特/香农定理 | 计算过程分步展示 | 模板五 |
| 曼彻斯特编码 | 时钟信号 + 数据信号 SVG 波形 | 自定义 SVG |
| 电路/报文/分组交换 | 三种方式并排时序图对比 | 模板一变体 |
| CRC 校验计算 | 模2除法竖式逐步高亮 | 模板五 |
| 海明码编码 | 编码矩阵逐位填入 | 模板五 |
| 停等/GBN/SR 协议 | 发送方+接收方时序 + 帧序列视图 | 模板一 + 模板四 |
| CSMA/CD 工作过程 | 多站点争用时序图，碰撞高亮 | 模板一变体 |
| CSMA/CA + RTS/CTS | 四帧交互时序图 | 模板一 |
| 交换机自学习 | 拓扑图 + MAC 地址表动态更新 | 模板三 |
| ARP 请求/应答 | 两步时序图 + ARP 缓存表 | 模板一 |
| IPv4 子网划分 | 32位二进制对齐视图，逐位高亮 | 模板五 |
| DHCP 四步 | 四条消息时序图 | 模板一 |
| ICMP/ping | 请求-应答时序 + TTL 递减 | 模板一 |
| Dijkstra 路由算法 | 拓扑图 + 最短路表逐步更新 | 模板三 |
| Bellman-Ford/RIP | 距离向量表逐轮更新 | 模板三变体 |
| OSPF 链路状态 | 链路状态数据库 + 最短路树 | 模板三 |
| NAT 地址转换 | 内外网拓扑 + NAT 表动态更新 | 模板三 |
| TCP 三次握手 | 三消息时序图 + 状态机 | 模板一 |
| TCP 四次挥手 | 四消息时序图 + TIME_WAIT说明 | 模板一 |
| TCP 滑动窗口 | 发送/接收缓冲区帧序列视图 | 模板四 |
| TCP 拥塞控制 | 拥塞窗口 cwnd 随时间变化折线图 | 自定义折线图 |
| DNS 递归/迭代 | 多实体时序图（客户端/本地DNS/根DNS等） | 模板一 |
| HTTP 持久连接 | HTTP/1.0 vs HTTP/1.1 时序对比 | 模板一 |

---

## 常见陷阱

1. **时序图箭头端点偏移**：箭头端点 x 必须精确等于生命线 x，不能有 1~2px 偏差
2. **生命线不够长**：生命线的 y2 必须延伸到最后一条消息之下至少 20px
3. **消息标签被裁切**：消息标签的 y 比消息线的 y 小 7px（写在线上方），且需验证不超出 viewBox 左右边界
4. **状态机缺少迁移条件**：状态机箭头旁必须同时标注"触发事件/执行动作"
5. **拥塞控制图 cwnd 曲线画错**：慢开始是指数增长，拥塞避免是线性增长，快恢复从 ssthresh 开始线性增长（不是从1）
6. **子网掩码计算错误**：子网掩码的主机位必须全0，不要把网络位和主机位弄反
7. **滑动窗口帧状态混乱**：GBN 接收方窗口大小为1（不缓存乱序帧）；SR 接收方窗口 ≤ 序号空间/2
8. **彩色框泛滥**：协议步骤用 `<p>` + 编号步骤（`.sb`）写，不要每步都用 `.info` 框
9. **SVG 颜色硬编码**：所有颜色必须用 CSS 变量，支持深色模式
10. **公式使用 LaTeX**：不引入 MathJax，公式用 Unicode 字符（≥ ≤ × ÷ ∞ Σ ≈ ²）

---

## 写入策略

计网可视化页面通常 250~500 行，**必须分阶段写入**：

1. **先告知整体计划**：列出章节数量、动画数量、预计行数，让用户确认方向
2. **分三阶段写入**：
   - 阶段一：HTML 骨架 + CSS 全部样式 + 前2-3章静态内容（含 SVG 图示）
   - 阶段二：交互动画 HTML 结构（`.w` 容器 + SVG + 按钮）
   - 阶段三：JavaScript 动画逻辑 + 键盘导航
3. **每阶段完成后告知用户进度**
