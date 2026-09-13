'use client';

import { useEffect, useRef } from 'react';

/* ==========================================================================
   Dataflow lattice — the hero's ambient graphic.

   A layered directed graph: nodes sit in ranks and edges only ever run one way,
   so it reads as *flow* rather than as a constellation. Pulses travel
   source-to-sink and briefly light each node they pass. That is the same claim
   the Pipeline component makes on the case studies — something goes in, stages
   transform it, something comes out — so the hero opens on the site's own
   signature rather than on decoration.

   The flow follows the box's long side: in the hero's tall side column it runs
   top to bottom, which is also the axis `.pipeline` switches to when it's
   narrow. One graph, two orientations, no second layout.

   Everything is drawn from the live token values, so it follows the theme
   switch. Nothing is downloaded and there is no animation library.

   Cost control: the loop is paused when the canvas is off-screen or the tab is
   hidden, geometry is normalised once and only scaled at draw time (a resize
   never reshapes the graph), and under `prefers-reduced-motion` a single static
   frame is drawn and the loop never starts.

   The graph is built out of direct object references rather than index lookups
   — `noUncheckedIndexedAccess` is on, and threading indices through would mean
   a guard at every read for no gain.
   ========================================================================== */

/* Seeded, so the graph is the same designed shape on every load rather than a
   different random one each time. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; lit: number };
type Edge = { from: Node; to: Node };
type Pulse = { path: Edge[]; t: number; speed: number };

const COLUMNS = 7;
const PULSES = 5;

/* Coordinates are normalised to [0,1]; the draw pass maps them into the box. */
function buildGraph() {
  const rand = mulberry32(0x5eed);
  const nodes: Node[] = [];
  const columns: Node[][] = [];

  for (let col = 0; col < COLUMNS; col++) {
    const isEdgeColumn = col === 0 || col === COLUMNS - 1;
    const count = isEdgeColumn ? 2 : 3;
    const column: Node[] = [];

    for (let i = 0; i < count; i++) {
      /* Even vertical bands with a little jitter: a deliberate layered layout,
         not scatter. */
      const band = (i + 0.5) / count;
      const node: Node = {
        x: col / (COLUMNS - 1),
        y: Math.min(0.96, Math.max(0.04, band + (rand() - 0.5) * 0.2)),
        lit: 0,
      };
      nodes.push(node);
      column.push(node);
    }
    columns.push(column);
  }

  /* Edges run strictly forward. Each node takes its nearest neighbour in the
     next column, plus a second one often enough to make the graph branch. */
  const edges: Edge[] = [];
  const outgoing = new Map<Node, Edge[]>();

  for (let col = 0; col < COLUMNS - 1; col++) {
    const current = columns[col];
    const next = columns[col + 1];
    if (!current || !next) continue;

    for (const from of current) {
      const byProximity = [...next].sort((a, b) => Math.abs(a.y - from.y) - Math.abs(b.y - from.y));
      const fanOut = rand() < 0.55 ? 2 : 1;

      for (const to of byProximity.slice(0, fanOut)) {
        const edge: Edge = { from, to };
        edges.push(edge);
        const list = outgoing.get(from);
        if (list) list.push(edge);
        else outgoing.set(from, [edge]);
      }
    }
  }

  /* Each pulse walks one full source-to-sink path. Negative start offsets
     stagger them so they don't march in lockstep. */
  const sources = columns[0] ?? [];
  const pulses: Pulse[] = [];

  for (let i = 0; i < PULSES && sources.length > 0; i++) {
    let node = sources[i % sources.length];
    if (!node) continue;

    const path: Edge[] = [];
    for (;;) {
      const options = outgoing.get(node);
      if (!options || options.length === 0) break;
      const edge = options[Math.floor(rand() * options.length)];
      if (!edge) break;
      path.push(edge);
      node = edge.to;
    }

    if (path.length > 0) {
      pulses.push({ path, t: -(i / PULSES) * 1.4, speed: 0.1 + rand() * 0.05 });
    }
  }

  return { nodes, edges, pulses };
}

export function Lattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { nodes, edges, pulses } = buildGraph();

    let width = 0;
    let height = 0;
    let vertical = false;
    let accent = '#0071e3';
    let frame = 0;
    let last = 0;
    /* Left false until the IntersectionObserver reports in — it always fires
       once on observe, so there's no case where the loop fails to start. */
    let onScreen = false;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const readTokens = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (value) accent = value;
    };

    /* `x` is the rank axis and `y` the spread; which screen axis each lands on
       depends on the box's shape. Inset so nodes never sit on the edge. */
    const px = (n: Node) => 14 + (vertical ? n.y : n.x) * Math.max(1, width - 28);
    const py = (n: Node) => 14 + (vertical ? n.x : n.y) * Math.max(1, height - 28);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;

      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.17;
      ctx.beginPath();
      for (const edge of edges) {
        ctx.moveTo(px(edge.from), py(edge.from));
        ctx.lineTo(px(edge.to), py(edge.to));
      }
      ctx.stroke();

      for (const node of nodes) {
        /* A node lights as a pulse arrives and decays after — activation, so
           the graph reads as running rather than as a static diagram. */
        ctx.globalAlpha = 0.3 + node.lit * 0.6;
        ctx.beginPath();
        ctx.arc(px(node), py(node), 1.9 + node.lit * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const pulse of pulses) {
        if (pulse.t < 0) continue;
        const edge = pulse.path[Math.floor(pulse.t)];
        if (!edge) continue;

        const local = pulse.t % 1;
        const x = px(edge.from) + (px(edge.to) - px(edge.from)) * local;
        const y = py(edge.from) + (py(edge.to) - py(edge.from)) * local;

        /* Concentric rings rather than shadowBlur — a fraction of the cost for
           a comparable glow at this size. */
        for (const ring of [
          { r: 5.5, a: 0.1 },
          { r: 3.2, a: 0.25 },
          { r: 1.8, a: 0.85 },
        ]) {
          ctx.globalAlpha = ring.a;
          ctx.beginPath();
          ctx.arc(x, y, ring.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;

      for (const node of nodes) node.lit = Math.max(0, node.lit - dt * 1.6);

      for (const pulse of pulses) {
        const before = pulse.t;
        pulse.t += dt * pulse.speed * pulse.path.length;

        if (before >= 0 && Math.floor(pulse.t) !== Math.floor(before)) {
          const arrived = pulse.path[Math.min(pulse.path.length - 1, Math.floor(before))];
          if (arrived) arrived.to.lit = 1;
        }
        /* Rewind past zero, so there's a gap before the next run down the path. */
        if (pulse.t >= pulse.path.length) pulse.t = -0.6 - Math.random() * 1.2;
      }

      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (frame || !onScreen || document.hidden || reduceMotion.matches) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      vertical = height > width;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    readTokens();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    /* Only run while actually visible. */
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: '96px' },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    /* Custom properties don't transition, so re-reading on the theme flip picks
       up the new accent immediately. */
    const themeObserver = new MutationObserver(() => {
      readTokens();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => {
      readTokens();
      draw();
    };
    scheme.addEventListener('change', onScheme);

    const onReduceChange = () => (reduceMotion.matches ? stop() : start());
    reduceMotion.addEventListener('change', onReduceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scheme.removeEventListener('change', onScheme);
      reduceMotion.removeEventListener('change', onReduceChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="lattice" aria-hidden="true" />;
}
