/* ===== cn-visualize / assets/boilerplate.js =====
   计算机网络可视化 Skill 的 JavaScript 工具 + 动画模板
   使用方式：按场景选取对应的【模板块】嵌入 <script> 标签。
   不要把整文件复制进去——各模板都声明了顶层变量，
   同时嵌入两套模板会重复声明报错。

   正确嵌入顺序：
     工具函数块 → 选定的模板块 → （如需）hlLines块 → 键盘导航块 → 自己的数据/初始化
   ================================================= */


/* ─────────────────────────────────────────────────
   【工具函数块】所有动画场景必嵌
   ───────────────────────────────────────────────── */

/**
 * 在 SVG 内更新或创建一个元素的属性
 * @param {SVGElement} el
 * @param {Object} attrs  { attr: value, ... }
 */
function setAttrs(el, attrs) {
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

/**
 * 用 CSS 变量取实际颜色值（用于 JS 动态设色）
 * @param {string} varName  例如 '--hl'
 */
function cssVar(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName).trim();
}

/**
 * 根据语义类名返回对应的 CSS 变量名
 * 语义：hl(蓝/关注) | nw(绿/成功) | sw(橙/重传) | pp(红/丢失) | ok(绿深/已完成) | dim(灰)
 */
function colorOf(semantic) {
  const map = { hl:'--hl', nw:'--nw', sw:'--sw', pp:'--pp', ok:'--ok', dim:'--dim' };
  return cssVar(map[semantic] || '--fg');
}

/**
 * 高亮代码面板中的某一行（配合 .code-panel > .cl 结构）
 * @param {string} panelId  代码面板容器的 id
 * @param {number} lineIdx  从 0 开始的行号，-1 表示全部取消高亮
 */
function hlLines(panelId, lineIdx) {
  const lines = document.querySelectorAll(`#${panelId} .cl`);
  lines.forEach((el, i) => el.classList.toggle('on', i === lineIdx));
}

/**
 * 更新步骤计数器显示
 * @param {string} counterId  元素 id
 * @param {number} cur        当前步骤（0-based）
 * @param {number} total      总步骤数
 */
function updateCounter(counterId, cur, total) {
  const el = document.getElementById(counterId);
  if (el) el.textContent = `${cur + 1} / ${total}`;
}


/* ─────────────────────────────────────────────────
   【模板 A】时序图动画
   适用：TCP握手/挥手、DHCP、ARP、DNS、HTTP等所有协议交互。
   特点：逐条显示消息箭头，两侧实体显示状态标签。

   使用说明：
   1. 在 HTML 中为每条消息箭头的 <g> 元素加 class="seq-msg" + data-idx="N"
   2. 为实体状态标签加 id="[prefix]-state-[name]"（如 #tcp-state-client）
   3. 定义自己的 seqSteps 数组（见格式说明）
   4. 调用 seqInit('[prefix]', seqSteps) 初始化
   ───────────────────────────────────────────────── */

/**
 * seqSteps 元素格式：
 * {
 *   cap:    string,         // 说明文字（支持 <b> <code>）
 *   active: number,         // 当前显示到第几条消息（含，0-based，-1=全隐）
 *   states: { [name]: string },  // 各实体状态标签（名称需与 HTML id 对应）
 *   line:   number,         // 代码面板高亮行（-1=无，没有代码面板时忽略）
 * }
 */

function seqInit(prefix, steps) {
  let cur = 0;
  const msgs    = document.querySelectorAll(`#${prefix}-seq .seq-msg`);
  const capEl   = document.getElementById(`${prefix}-cap`);
  const cntEl   = document.getElementById(`${prefix}-counter`);

  function render(s) {
    msgs.forEach((el, i) => {
      if (i < s.active) {
        el.style.opacity = '0.28';
      } else if (i === s.active) {
        el.style.opacity = '1';
        // 高亮当前消息（加粗线条）
        el.querySelectorAll('line,polyline,path').forEach(ln => {
          ln.setAttribute('stroke-width', '2.5');
        });
      } else {
        el.style.opacity = '0';
      }
      // 还原非高亮消息线宽
      if (i !== s.active) {
        el.querySelectorAll('line,polyline,path').forEach(ln => {
          ln.setAttribute('stroke-width', '1.5');
        });
      }
    });

    if (capEl) capEl.innerHTML = s.cap || '';

    // 更新实体状态标签
    if (s.states) {
      for (const [name, val] of Object.entries(s.states)) {
        const el = document.getElementById(`${prefix}-state-${name}`);
        if (el) el.textContent = val;
      }
    }

    // 代码联动
    if (typeof s.line === 'number' && s.line >= 0) {
      hlLines(`${prefix}-code`, s.line);
    }

    updateCounter(`${prefix}-counter`, cur, steps.length);
  }

  // 暴露 go 函数到全局，命名为 [prefix]Go
  window[`${prefix}Go`] = function(d) {
    cur = Math.max(0, Math.min(steps.length - 1, cur + d));
    render(steps[cur]);
  };

  render(steps[0]);
}


/* ─────────────────────────────────────────────────
   【模板 B】滑动窗口 / 帧序列动画
   适用：停等协议、GBN、SR、TCP滑动窗口。
   特点：帧序列格子视图 + 发送/接收双行。

   使用说明：
   1. HTML 中准备 id="[prefix]-send-frames" 和 id="[prefix]-recv-frames" 容器
   2. 定义 winSteps 数组（见格式说明）
   3. 调用 winInit('[prefix]', winSteps) 初始化
   ───────────────────────────────────────────────── */

/**
 * winSteps 元素格式：
 * {
 *   cap: string,
 *   send: [{ seq: number, state: 'acked'|'unacked'|'cansend'|'nosend'|'lost' }],
 *   recv: [{ seq: number, state: 'rcvd'|'hole'|'nosend'|'cansend' }],
 *   sendBase: number,   // 发送窗口左边界序号（可选，用于显示标注）
 *   rcvBase:  number,   // 接收窗口左边界序号（可选）
 * }
 */

function winInit(prefix, steps) {
  let cur = 0;
  const sendEl = document.getElementById(`${prefix}-send-frames`);
  const recvEl = document.getElementById(`${prefix}-recv-frames`);
  const capEl  = document.getElementById(`${prefix}-cap`);

  function mkFrames(container, frames) {
    if (!container) return;
    container.innerHTML = '';
    frames.forEach(f => {
      const div = document.createElement('div');
      div.className = `fr ${f.state}`;
      div.textContent = f.seq;
      if (f.label) div.title = f.label;
      container.appendChild(div);
    });
  }

  function render(s) {
    mkFrames(sendEl, s.send || []);
    mkFrames(recvEl, s.recv || []);
    if (capEl) capEl.innerHTML = s.cap || '';
    updateCounter(`${prefix}-counter`, cur, steps.length);
  }

  window[`${prefix}Go`] = function(d) {
    cur = Math.max(0, Math.min(steps.length - 1, cur + d));
    render(steps[cur]);
  };

  render(steps[0]);
}


/* ─────────────────────────────────────────────────
   【模板 C】拓扑图 + 路由表动画
   适用：Dijkstra、Bellman-Ford/RIP、交换机自学习、生成树。
   特点：SVG 拓扑（节点+边）+ 路由表格同步更新。

   使用说明：
   1. HTML 中准备 id="[prefix]-topo" SVG 容器（节点 <g> 加 id="[prefix]-node-X"）
   2. 准备 id="[prefix]-rtable" 路由表格（tbody）
   3. 定义 topoSteps 数组（见格式说明）
   4. 调用 topoInit('[prefix]', topoSteps) 初始化
   ───────────────────────────────────────────────── */

/**
 * topoSteps 元素格式：
 * {
 *   cap: string,
 *   nodes: [{ id: string, color: 'hl'|'nw'|'sw'|'pp'|'ok'|'dim'|'' }],
 *   edges: [{ from: string, to: string, color: 'hl'|'nw'|'sw'|'pp'|'' }],
 *   table: [{ row: string[], cls: 'rt-active'|'rt-done'|'rt-updated'|'' }],
 * }
 */

function topoInit(prefix, steps) {
  let cur = 0;
  const capEl   = document.getElementById(`${prefix}-cap`);
  const tbodyEl = document.getElementById(`${prefix}-rtable`);

  function render(s) {
    // 更新节点颜色
    (s.nodes || []).forEach(n => {
      const g = document.getElementById(`${prefix}-node-${n.id}`);
      if (!g) return;
      const circle = g.querySelector('circle');
      const text   = g.querySelector('text');
      if (!circle) return;
      if (n.color) {
        circle.setAttribute('fill',   cssVar(`--${n.color}-bg`) || cssVar('--gnb'));
        circle.setAttribute('stroke', colorOf(n.color));
        if (text) text.setAttribute('fill', colorOf(n.color));
      } else {
        circle.setAttribute('fill',   cssVar('--gnb'));
        circle.setAttribute('stroke', cssVar('--gn'));
        if (text) text.setAttribute('fill', cssVar('--gn'));
      }
    });

    // 更新边颜色
    (s.edges || []).forEach(e => {
      const edgeEl = document.getElementById(
        `${prefix}-edge-${e.from}-${e.to}`) ||
        document.getElementById(`${prefix}-edge-${e.to}-${e.from}`);
      if (!edgeEl) return;
      const line = edgeEl.querySelector('line,path,polyline');
      if (!line) return;
      if (e.color) {
        line.setAttribute('stroke', colorOf(e.color));
        line.setAttribute('stroke-width', '3');
      } else {
        line.setAttribute('stroke', cssVar('--fg3'));
        line.setAttribute('stroke-width', '1.5');
      }
    });

    // 更新路由表
    if (tbodyEl && s.table) {
      const rows = tbodyEl.querySelectorAll('tr');
      s.table.forEach((rowDef, i) => {
        if (!rows[i]) return;
        rows[i].className = rowDef.cls || '';
        if (rowDef.row) {
          const cells = rows[i].querySelectorAll('td');
          rowDef.row.forEach((val, j) => { if (cells[j]) cells[j].textContent = val; });
        }
      });
    }

    if (capEl) capEl.innerHTML = s.cap || '';
    updateCounter(`${prefix}-counter`, cur, steps.length);
  }

  window[`${prefix}Go`] = function(d) {
    cur = Math.max(0, Math.min(steps.length - 1, cur + d));
    render(steps[cur]);
  };

  render(steps[0]);
}


/* ─────────────────────────────────────────────────
   【模板 D】TCP 拥塞控制折线图
   适用：慢开始、拥塞避免、快重传、快恢复窗口变化。
   特点：Canvas / SVG 折线图，逐步绘制 cwnd 曲线。

   使用说明：
   1. HTML 中准备 id="[prefix]-chart" SVG（viewBox 固定宽高）
   2. 定义 cwndPoints 数组：[{ rtt, cwnd, event, ssthresh }]
   3. 调用 cwndInit('[prefix]', cwndPoints) 初始化
   ───────────────────────────────────────────────── */

function cwndInit(prefix, points) {
  let cur = 0;
  const svg     = document.getElementById(`${prefix}-chart`);
  const capEl   = document.getElementById(`${prefix}-cap`);
  if (!svg) return;

  const W = 640, H = 260, PL = 48, PB = 36, PT = 20, PR = 20;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;

  const maxRtt  = Math.max(...points.map(p => p.rtt));
  const maxCwnd = Math.max(...points.map(p => p.cwnd)) + 2;

  function xOf(rtt)  { return PL + (rtt  / maxRtt)  * chartW; }
  function yOf(cwnd) { return PT + chartH - (cwnd / maxCwnd) * chartH; }

  // 绘制坐标轴（只画一次）
  function drawAxes() {
    const ns = 'http://www.w3.org/2000/svg';
    const fg3 = cssVar('--fg3');
    const fg2 = cssVar('--fg2');
    // X 轴
    const xline = document.createElementNS(ns, 'line');
    setAttrs(xline, { x1: PL, y1: PT+chartH, x2: W-PR, y2: PT+chartH,
                      stroke: fg3, 'stroke-width': 1 });
    svg.appendChild(xline);
    // Y 轴
    const yline = document.createElementNS(ns, 'line');
    setAttrs(yline, { x1: PL, y1: PT, x2: PL, y2: PT+chartH,
                      stroke: fg3, 'stroke-width': 1 });
    svg.appendChild(yline);
    // 轴标签
    const mkText = (x, y, t, anchor) => {
      const el = document.createElementNS(ns, 'text');
      setAttrs(el, { x, y, 'text-anchor': anchor || 'middle',
                     'font-size': '11', fill: fg2,
                     'font-family': 'var(--sans)' });
      el.textContent = t;
      return el;
    };
    svg.appendChild(mkText(PL + chartW/2, H-2, '传输轮次（RTT）'));
    svg.appendChild(mkText(12, PT + chartH/2, 'cwnd', 'middle'));
  }

  // 存储已绘制的折线段（用于逐步追加）
  const ns = 'http://www.w3.org/2000/svg';
  let drawnUpTo = -1;
  const segments = [];

  function drawUpTo(idx) {
    for (let i = drawnUpTo + 1; i <= idx; i++) {
      if (i === 0) { drawnUpTo = 0; continue; }
      const p0 = points[i-1], p1 = points[i];
      const seg = document.createElementNS(ns, 'line');
      const isEvent = !!p1.event;
      setAttrs(seg, {
        x1: xOf(p0.rtt), y1: yOf(p0.cwnd),
        x2: xOf(p1.rtt), y2: yOf(p1.cwnd),
        stroke: isEvent ? cssVar('--pp') : cssVar('--hl'),
        'stroke-width': '2',
        'stroke-dasharray': isEvent ? '4,3' : 'none'
      });
      svg.appendChild(seg);
      segments.push(seg);

      // 打点
      const dot = document.createElementNS(ns, 'circle');
      setAttrs(dot, {
        cx: xOf(p1.rtt), cy: yOf(p1.cwnd), r: '4',
        fill: cssVar('--hl'), stroke: cssVar('--bg'), 'stroke-width': '2'
      });
      svg.appendChild(dot);

      // 事件标注
      if (p1.event) {
        const lbl = document.createElementNS(ns, 'text');
        setAttrs(lbl, {
          x: xOf(p1.rtt), y: yOf(p1.cwnd) - 10,
          'text-anchor': 'middle', 'font-size': '11',
          fill: cssVar('--pp'), 'font-family': 'var(--sans)'
        });
        lbl.textContent = p1.event;
        svg.appendChild(lbl);
      }

      // ssthresh 水平辅助线
      if (p1.ssthresh !== undefined) {
        const ssEl = document.createElementNS(ns, 'line');
        setAttrs(ssEl, {
          x1: PL, y1: yOf(p1.ssthresh),
          x2: W-PR, y2: yOf(p1.ssthresh),
          stroke: cssVar('--sw'), 'stroke-width': '1',
          'stroke-dasharray': '6,4'
        });
        svg.appendChild(ssEl);
        const ssLbl = document.createElementNS(ns, 'text');
        setAttrs(ssLbl, {
          x: W-PR-2, y: yOf(p1.ssthresh)-4,
          'text-anchor': 'end', 'font-size': '10',
          fill: cssVar('--sw'), 'font-family': 'var(--sans)'
        });
        ssLbl.textContent = `ssthresh=${p1.ssthresh}`;
        svg.appendChild(ssLbl);
      }

      drawnUpTo = i;
    }
  }

  drawAxes();

  window[`${prefix}Go`] = function(d) {
    if (d > 0 && cur < points.length - 1) {
      cur++;
      drawUpTo(cur);
    } else if (d < 0 && cur > 0) {
      // 回退：清空重画
      cur--;
      // 移除所有绘制的折线段和点
      while (segments.length) svg.removeChild(segments.pop());
      drawnUpTo = -1;
      drawAxes();
      drawUpTo(cur);
    }
    if (capEl) capEl.innerHTML = points[cur].cap || '';
    updateCounter(`${prefix}-counter`, cur, points.length);
  };

  drawUpTo(0);
  if (capEl) capEl.innerHTML = points[0].cap || '';
  updateCounter(`${prefix}-counter`, 0, points.length);
}


/* ─────────────────────────────────────────────────
   【键盘导航块】所有动画页面都应加
   如果页面有多个动画，将 activePrefix 改为当前聚焦的动画前缀。
   简单场景下直接硬编码主动画的前缀即可。
   ───────────────────────────────────────────────── */

// 使用示例（在自己的 <script> 末尾添加，替换 'tcp' 为实际前缀）：
//
// document.addEventListener('keydown', e => {
//   if (e.key === 'ArrowRight' || e.key === 'ArrowDown') tcpGo(1);
//   if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   tcpGo(-1);
// });
