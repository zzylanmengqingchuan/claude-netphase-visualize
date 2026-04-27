# cn-visualize

[English](./README.en.md)

将计算机网络课程的知识点提炼为可交互的 HTML 教学可视化 Skill，专注于 **408 考研** 及本科计算机网络课程的核心内容。

## 示例

**协议时序图（TCP 三次握手）：**

![TCP 握手时序图示例](./images/handshake-demo.png)

**滑动窗口动画（GBN / SR）：**

![滑动窗口动画示例](./images/sliding-window-demo.png)

**路由算法拓扑演示（Dijkstra）：**

![Dijkstra 路由演示](./images/dijkstra-demo.png)

[Live Demo](https://github.com/zzylanmengqingchuan/claude-netphase-visualize) — TCP 三次握手 & 四次挥手完整交互参考实现

## 功能

- 生成完整的**单文件交互式 HTML 教学页面**（无外部依赖，浏览器直接打开）
- 覆盖 408 计算机网络全部六章：体系结构 / 物理层 / 数据链路层 / 网络层 / 传输层 / 应用层
- 内置 CSS 骨架（含深色模式自动切换）和四套 JS 动画模板
- 支持多种输入场景：
  - 给出主题（如"演示 TCP 三次握手"），生成教学 + 动画页面
  - 提供 PDF / 教材，按教材脉络生成知识点讲解页面
  - 给出具体问题（如"画出 Dijkstra 算法在下图中的执行过程"），生成逐步演示
- 四套专用可视化模板：
  - **时序图**：协议握手 / 应答 / 查询流程（TCP / DHCP / ARP / DNS / HTTP）
  - **滑动窗口**：停等 / GBN / SR / TCP 窗口 / 拥塞控制
  - **拓扑图 + 路由表**：Dijkstra / RIP / OSPF / 交换机自学习
  - **拥塞控制折线图**：慢开始 / 拥塞避免 / 快重传 / 快恢复 cwnd 变化

## 安装

```bash
npx skills add zzylanmengqingchuan/claude-netphase-visualize
```

或手动克隆到 Claude Code 技能目录：

```bash
git clone https://github.com/zzylanmengqingchuan/claude-netphase-visualize.git ~/.claude/skills/cn-visualize
```

## 项目结构

```
cn-visualize/
├── SKILL.md                    # 技能定义与使用指南（核心）
├── assets/
│   ├── base.css                # CSS 骨架（颜色变量、布局、深色模式）
│   ├── boilerplate.js          # JS 动画四套模板（时序图/窗口/拓扑/折线图）
│   └── animation-html.html     # HTML 动画骨架（四种结构供复制）
├── references/
│   └── tcp_connection.html     # 完整参考实现：TCP 三次握手 & 四次挥手
├── images/
│   ├── handshake-demo.png
│   ├── sliding-window-demo.png
│   └── dijkstra-demo.png
├── README.md                   # 中文说明
├── README.en.md                # English documentation
├── LICENSE                     # MIT
└── package.json
```

## 使用方式

安装后在 Claude Code 中自动激活。触发场景示例：

```
# 主题演示
演示 TCP 三次握手过程

# 算法可视化
画出 Dijkstra 算法在以下图中的执行步骤：A-B(4), A-C(2), B-C(1), B-D(5), C-D(8)

# 协议讲解
帮我做一个 DHCP 地址分配过程的交互式教学页面

# 机制对比
对比 GBN 和 SR 协议的滑动窗口机制，做成可视化

# PDF 讲解
[上传教材 PDF] 根据这份 PDF 帮我生成计算机网络网络层的讲解页面
```

## 覆盖知识点

| 章节 | 主要考点 |
|------|---------|
| 体系结构 | OSI / TCP-IP 模型、分层封装解封装、性能指标 |
| 物理层 | 奈奎斯特/香农定理、编码调制、FDM/TDM/CDM、交换方式 |
| 数据链路层 | 组帧、CRC、海明码、停等/GBN/SR、CSMA/CD、CSMA/CA |
| 网络层 | IPv4/IPv6、子网划分、CIDR、ARP、DHCP、NAT、Dijkstra、RIP、OSPF |
| 传输层 | TCP 三次握手/四次挥手、滑动窗口、拥塞控制、UDP |
| 应用层 | DNS、FTP、HTTP/1.0/1.1/2、SMTP/POP3、HTTPS |

## 致谢

本项目的 Skill 框架参考了 [claude-algo-visualize](https://github.com/L0dyv/claude-algo-visualize) 的设计思路，感谢原作者的开源贡献。
