"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, ExternalLink, Mail, Terminal, Send, Check, Zap } from "lucide-react";

/* ═══════════════════════════════════════════════
   THEME TOKENS
═══════════════════════════════════════════════ */
const T = {
  bg:      "#080810",
  surface: "#0d0d18",
  card:    "#111120",
  border:  "#1c1c30",
  cyan:    "#00ffff",
  mag:     "#ff00ff",
  green:   "#00ff41",
  yellow:  "#ffd700",
  red:     "#ff4040",
  text:    "#8888aa",
  muted:   "#363650",
  white:   "#dde0ff",
};

/* ═══════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.bg};}

@keyframes blink   { 50%{opacity:0;} }
@keyframes float   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
@keyframes glitch  {
  0%,88%,100%{transform:none;filter:none;}
  90%{transform:skewX(-4deg);filter:hue-rotate(80deg);}
  92%{transform:skewX(3deg);filter:hue-rotate(-80deg);}
  94%{transform:none;filter:none;}
}
@keyframes scanIn  { from{transform:translateX(-24px);opacity:0;} to{transform:none;opacity:1;} }
@keyframes marquee { from{transform:translateX(100%);} to{transform:translateX(-200%);} }

.pf{
  font-family:'Press Start 2P',monospace;
  background:${T.bg};
  color:${T.text};
  overflow-x:hidden;
  min-height:100vh;
}

/* scanlines overlay */
.scanlines{
  position:fixed;inset:0;pointer-events:none;z-index:8000;
  background:repeating-linear-gradient(
    transparent 0px, transparent 3px,
    rgba(0,0,0,.07) 3px, rgba(0,0,0,.07) 4px
  );
}

.blink { animation:blink 1s step-end infinite; }
.float { animation:float 3s steps(5) infinite; }
.glitch{ animation:glitch 6s steps(1) infinite; }
.slide { animation:scanIn .4s steps(4) both; }

/* Pixel card */
.px-card{
  background:${T.card};
  border:4px solid ${T.cyan};
  box-shadow:4px 4px 0 ${T.cyan};
  transition:all .08s steps(1);
}
.px-card:hover{
  border-color:${T.mag};
  box-shadow:6px 6px 0 ${T.mag};
  transform:translate(-2px,-2px);
}

/* Pixel button */
.px-btn{
  font-family:'Press Start 2P',monospace;
  font-size:8px;
  border:3px solid currentColor;
  box-shadow:3px 3px 0 currentColor;
  background:transparent;
  padding:9px 15px;
  cursor:pointer;
  transition:all .08s steps(1);
  display:inline-flex;
  align-items:center;
  gap:7px;
  text-decoration:none;
  letter-spacing:.5px;
  line-height:1;
}
.px-btn:hover{
  background:rgba(255,255,255,.08);
  transform:translate(-2px,-2px);
  box-shadow:5px 5px 0 currentColor;
}
.px-btn:active{ transform:translate(2px,2px); box-shadow:1px 1px 0 currentColor; }

/* Input/textarea */
.px-in{
  font-family:'Press Start 2P',monospace;
  font-size:9px;
  background:${T.surface};
  border:2px solid ${T.muted};
  color:${T.text};
  padding:12px;
  width:100%;
  outline:none;
  resize:none;
  line-height:1.9;
  transition:border-color .08s steps(1);
}
.px-in:focus{ border-color:${T.cyan}; box-shadow:inset 0 0 0 1px ${T.cyan}22; }
.px-in::placeholder{ color:${T.muted}; }

/* Section title */
.sec-t{
  font-size:clamp(11px,2vw,17px);
  color:${T.cyan};
  letter-spacing:3px;
  display:inline-block;
}
.sec-t::before{ content:'▶ '; color:${T.mag}; }

/* Dashed rule */
.dash{
  height:3px;
  background:repeating-linear-gradient(
    90deg, ${T.cyan} 0, ${T.cyan} 8px, transparent 8px, transparent 16px
  );
  margin-top:10px;
  width:200px;
}

.tag{
  font-size:6px;
  padding:3px 7px;
  border:2px solid;
  letter-spacing:.5px;
}
.nav-l{
  font-size:8px;
  color:${T.muted};
  cursor:pointer;
  transition:color .08s;
  padding:6px;
  letter-spacing:1px;
}
.nav-l:hover{ color:${T.cyan}; }
.vt{ font-family:'VT323',monospace!important; font-size:17px; line-height:1.7; }

::-webkit-scrollbar{ width:6px; }
::-webkit-scrollbar-track{ background:${T.bg}; }
::-webkit-scrollbar-thumb{ background:${T.cyan}; }
`;

/* ═══════════════════════════════════════════════
   PORTFOLIO DATA — edit these to customise
═══════════════════════════════════════════════ */
const TITLES = [
  "FULL-STACK DEVELOPER",
  "OPEN SOURCE BUILDER",
  "B.TECH CS · SHARDA U.",
];

const EXP = [
  {
    role:    "OPEN SOURCE CONTRIBUTOR",
    company: "Google Summer of Code (Haskell Foundation)",
    period:  "May 2026 — Present",
    lvl:     3,
    desc:    "Contributing in top organization known as Haskell Foundation.",
    tags:    ["Open Source", "Haskell"],
  },
  {
    role:    "SOFTWARE DEVELOPER INTERN",
    company: "BlueStock",
    period:  "May 2025 — Jul 2025",
    lvl:     2,
    desc:    "Developed and deployed a full-stack IPO listing and admin platform using the MERN stack, achieving 99% uptime on Render and Vercel. Engineered 7+ scalable RESTful APIs with JWT-based authorization and optimized MongoDB performance to reduce response times by 40%. By building modular, mobile-first React components and conducting rigorous unit testing, ensured a highly reliable system with seamless dynamic data rendering and enhanced data accuracy.",
    tags:    ["React", "Node.js", "MongoDB", "Express", "REST APIs", "JWT"],
  }
];

const PROJECTS = [
  {
    title: "DIGITAL KRISHI OFFICER",
    genre: "AI · AGRI-TECH",
    desc:  "RAG-based multilingual agricultural advisory for Kerala farmers. Malayalam voice + text I/O, escalation workflows to local agri officers, and a continuous feedback loop.",
    stack: ["FastAPI", "LangChain", "Gemini", "ChromaDB", "React"],
    accent: T.green,
    gh:    "#",
    demo:  "#",
  },
  {
    title: "PULSARA DASHBOARD",
    genre: "DEVOPS · MONITORING",
    desc:  "Real-time DevOps monitoring dashboard with live WebSocket metrics, Redis-backed caching, and a dark glassmorphism UI for multi-service health tracking.",
    stack: ["React 18", "Node.js", "Socket.io", "Redis", "PostgreSQL"],
    accent: T.cyan,
    gh:    "#",
    demo:  "#",
  },
  {
    title: "LUMINACODE",
    genre: "AI · QUALITY ANALYZER",
    desc:  "Developed a Tree-sitter AI analyzer for Java, Python, and C++ to detect vulnerabilities. Engineered a self-healing engine achieving an 85% auto-refactoring rate. Built a JWT-secured backend for a semantic assistant with a 3D Glassmorphism dashboard.",
    stack: ["Java", "Python", "Tree-sitter", "Agentic AI", "FastAPI", "React", "Three.js"],
    accent: T.yellow,
    gh:    "https://github.com/Arman-op/Code-Quality-Analyzer",
    demo:  "#",
  },
  {
    title: "RESUMATE",
    genre: "AI · RESUME FEEDBACK",
    desc:  "Engineered an AI Resume Feedback System using NLP and LLMs, increasing keyword alignment by 35%. Developed a semantic engine delivering 0-100 scores and ATS-optimized suggestions in <30s, reducing manual review time by 80%.",
    stack: ["React.js", "Tailwind CSS", "FastAPI", "PostgreSQL", "LangChain", "OpenAI API"],
    accent: T.mag,
    gh:    "https://github.com/Arman-op/Ai-resume-feedback-system",
    demo:  "#",
  },
];

const SKILLS = [
  {
    cat:   "⚔ FRONTEND",
    col:   T.cyan,
    items: [["React / Next.js", 88], ["TypeScript", 75], ["Tailwind CSS", 92], ["HTML / CSS", 90]],
  },
  {
    cat:   "🛡 BACKEND",
    col:   T.mag,
    items: [["Python / FastAPI", 85], ["Node.js / Express", 80], ["Java", 72], ["REST APIs", 88]],
  },
  {
    cat:   "⚡ DEVOPS & AI",
    col:   T.green,
    items: [["Docker / AWS", 70], ["LangChain / RAG", 78], ["Git / CI-CD", 85], ["PostgreSQL / Redis", 74]],
  },
];

const ACHIEVEMENTS = [
  { 
    title: "Open Source Contributor", 
    desc: "Successfully merged 11+ Pull Requests across Apertre 3.0, ECWoC 2026, and OSCG 2026, contributing to diverse open-source ecosystems." 
  },
  { 
    title: "AWS Knowledge", 
    desc: "Cloud Essentials Badge - April 2025.", 
    link: "https://drive.google.com/file/d/1ofkJ-IDwqugi_y5wIAMELFiVgIFJFaEA/view" 
  },
  { 
    title: "Deloitte Certification", 
    desc: "Deloitte Australia Technology Job Simulation on Forage - April 2025.", 
    link: "https://drive.google.com/file/d/1EwxGHUXeNsWBn1P5YbbhLFMBOrYQjljX/view" 
  },
  { 
    title: "Hackathons", 
    desc: "Top 5 Finalist at Somnia Reactivity Mini Hackathon; actively participated in multiple national and college-level hackathons." 
  },
  { 
    title: "Electronic Arts", 
    desc: "Software Engineering Job Simulation.", 
    link: "https://drive.google.com/file/d/1tRvYuySPv_hBe4wU-iwhHPnYNGneVGmx/view" 
  },
];

/* ═══════════════════════════════════════════════
   PIXEL AVATAR  — 12×16 sprite
═══════════════════════════════════════════════ */
const AV_PAL = {
  _: null,
  H: "#3a1a08",   // hair
  S: "#f5c5a3",   // skin
  E: "#1a44cc",   // eye
  M: "#cc4040",   // mouth
  C: "#00aabb",   // shirt (subdued cyan)
  P: "#0a1a55",   // pants
  K: "#111111",   // shoes
};
const AV_ROWS = [
  "____HHHHHH__",
  "___HSSSSSSSH",
  "__HSSSSSSSH_",
  "__HSSEESSSH_",
  "__HSSSSSSSH_",
  "__HSSMMSSSH_",
  "__HHSSSSHHH_",
  "___CCCCCC___",
  "__CCCCCCCC__",
  "___CCCCCC___",
  "___PPPPPP___",
  "___PPPPPP___",
  "___PPP_PPP__",
  "___PPP_PPP__",
  "___KKK_KKK__",
  "___KKK_KKK__",
];

function Avatar() {
  return (
    <svg
      viewBox="0 0 12 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", width: "100%", height: "100%" }}
    >
      {AV_ROWS.map((row, y) =>
        row.split("").map((ch, x) => {
          const fill = AV_PAL[ch];
          return fill ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
          ) : null;
        })
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
function useWriter(words, ms = 110) {
  const [st, setSt] = useState({ i: 0, t: "", del: false, wait: false });
  useEffect(() => {
    const word = words[st.i];
    let delay = ms;
    let next;
    if (st.wait) {
      delay = 2000;
      next = { ...st, wait: false, del: true };
    } else if (!st.del) {
      if (st.t.length < word.length) {
        next = { ...st, t: word.slice(0, st.t.length + 1) };
      } else {
        next = { ...st, wait: true };
      }
    } else {
      if (st.t.length > 0) {
        delay = ms / 2;
        next = { ...st, t: st.t.slice(0, -1) };
      } else {
        next = { t: "", i: (st.i + 1) % words.length, del: false, wait: false };
      }
    }
    const id = setTimeout(() => setSt(next), delay);
    return () => clearTimeout(id);
  }, [st, words, ms]);
  return st.t;
}

function useVis(ref, thr = 0.2) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setV(true),
      { threshold: thr }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return v;
}

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */

/* Skill stat bar */
function SkBar({ name, val, col, vis }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 7, color: T.text }}>{name}</span>
        <span style={{ fontSize: 7, color: col }}>{val}</span>
      </div>
      <div
        style={{
          height: 12,
          background: T.surface,
          border: `2px solid ${col}44`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: col,
            width: vis ? `${val}%` : "0%",
            transition: "width 1.5s steps(24)",
          }}
        />
        {/* Segment dividers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              90deg, transparent 0, transparent 18px,
              rgba(8,8,16,.8) 18px, rgba(8,8,16,.8) 20px
            )`,
          }}
        />
      </div>
    </div>
  );
}

/* Quest log entry */
function QuestItem({ role, company, period, lvl, desc, tags, idx, vis }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 18,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-20px)",
        transition: `all .4s steps(4) ${idx * 0.13}s`,
      }}
    >
      {/* Timeline track */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 14,
            height: 14,
            background: T.cyan,
            boxShadow: `0 0 0 3px ${T.bg}, 0 0 0 5px ${T.cyan}`,
            marginTop: 4,
          }}
        />
        <div
          style={{
            width: 2,
            flex: 1,
            background: `repeating-linear-gradient(
              to bottom, ${T.cyan} 0, ${T.cyan} 8px,
              transparent 8px, transparent 16px
            )`,
            margin: "6px auto 0",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 9, color: T.cyan, marginBottom: 6, letterSpacing: 1 }}>
              {role}
            </div>
            <div style={{ fontSize: 8, color: T.yellow }}>{company}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <span
              style={{
                fontSize: 6,
                padding: "3px 6px",
                border: `2px solid ${T.yellow}`,
                color: T.yellow,
              }}
            >
              LVL {lvl}
            </span>
            <span style={{ fontSize: 7, color: T.mag }}>{period}</span>
          </div>
        </div>
        <p className="vt" style={{ color: T.text, marginBottom: 10 }}>
          {desc}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span
              key={t}
              className="tag"
              style={{
                borderColor: `${T.cyan}55`,
                color: `${T.cyan}99`,
                background: `${T.cyan}0d`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Game / project card */
function GameCard({ title, genre, desc, stack, accent, gh, demo }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        border: `4px solid ${hov ? accent : T.border}`,
        boxShadow: hov ? `6px 6px 0 ${accent}` : `4px 4px 0 ${T.muted}55`,
        transform: hov ? "translate(-2px,-2px)" : "none",
        transition: "all .08s steps(1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Cartridge header */}
      <div
        style={{
          background: accent,
          padding: "7px 14px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 6,
            fontFamily: "'Press Start 2P',monospace",
            color: T.bg,
          }}
        >
          ◀◀ CARTRIDGE ▶▶
        </span>
        <span
          style={{
            fontSize: 6,
            fontFamily: "'Press Start 2P',monospace",
            color: T.bg,
          }}
        >
          {genre}
        </span>
      </div>

      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            fontSize: 9,
            color: accent,
            marginBottom: 12,
            letterSpacing: 1,
            lineHeight: 1.9,
          }}
        >
          {title}
        </h3>
        <p className="vt" style={{ color: T.text, flex: 1, marginBottom: 14 }}>
          {desc}
        </p>

        {/* Stack tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {stack.map((s) => (
            <span
              key={s}
              className="tag"
              style={{
                borderColor: `${accent}55`,
                color: `${accent}99`,
                background: `${accent}0d`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={gh}
            target="_blank"
            rel="noreferrer"
            className="px-btn"
            style={{ color: accent }}
          >
            <Code size={10} strokeWidth={3} /> GITHUB
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="px-btn"
            style={{ color: T.mag }}
          >
            ▶ START MISSION
          </a>
        </div>
      </div>

      {/* Pixel stripe footer */}
      <div
        style={{
          height: 4,
          background: `repeating-linear-gradient(
            90deg, ${accent} 0, ${accent} 4px,
            transparent 4px, transparent 8px
          )`,
        }}
      />
    </div>
  );
}

/* Level-Up success modal */
function LvlModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.88)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: T.card,
          border: `4px solid ${T.yellow}`,
          boxShadow: `8px 8px 0 ${T.yellow}`,
          padding: "44px 36px",
          maxWidth: 380,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Star */}
        <div
          className="float"
          style={{
            fontSize: 52,
            marginBottom: 18,
            color: T.yellow,
            lineHeight: 1,
          }}
        >
          ★
        </div>

        <div style={{ fontSize: 13, color: T.yellow, marginBottom: 10, letterSpacing: 3 }}>
          !! LEVEL UP !!
        </div>
        <div style={{ fontSize: 9, color: T.cyan, marginBottom: 14, letterSpacing: 1 }}>
          MESSAGE DELIVERED
        </div>
        <p className="vt" style={{ color: T.text, marginBottom: 24, lineHeight: 1.7 }}>
          Transmission received! I'll get back to you faster than a respawn timer.
        </p>

        {/* XP bar fill */}
        <div
          style={{
            height: 12,
            background: T.surface,
            border: `2px solid ${T.yellow}`,
            marginBottom: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: T.yellow,
              width: "100%",
              transition: "width 1.6s steps(20)",
            }}
          />
        </div>

        <button className="px-btn" style={{ color: T.yellow }} onClick={onClose}>
          <Check size={10} strokeWidth={3} /> CONTINUE
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
═══════════════════════════════════════════════ */
export default function Portfolio() {
  const typed    = useWriter(TITLES);
  const skillRef = useRef(null);
  const expRef   = useRef(null);
  const projRef  = useRef(null);
  const skillScrollRef = useRef(null);
  const skillVis = useVis(skillRef);
  const expVis   = useVis(expRef);

  const { scrollYProgress } = useScroll({
    target: projRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const { scrollYProgress: skillScroll } = useScroll({
    target: skillScrollRef,
    offset: ["start center", "end center"],
  });
  const skillLineHeight = useTransform(skillScroll, [0, 1], ["0%", "100%"]);

  const [form, setForm]     = useState({ name: "", email: "", msg: "" });
  const [errs, setErrs]     = useState({});
  const [sending, setSend]  = useState(false);
  const [modal, setModal]   = useState(false);

  /* Inject global CSS once */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.prepend(el);
    return () => el.remove();
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function validate() {
    const e = {};
    if (!form.name.trim())                             e.name  = "NAME REQUIRED";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "VALID EMAIL REQUIRED";
    if (form.msg.trim().length < 10)                   e.msg   = "MIN 10 CHARACTERS";
    return e;
  }

  async function submit() {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({});
    setSend(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "8db141f8-0477-4627-85f8-d10c9976744d",
          name: form.name,
          email: form.email,
          message: form.msg,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setSend(false);
    setModal(true);
    setForm({ name: "", email: "", msg: "" });
  }

  /* ── Marquee ticker content ── */
  const TICKER = "AVAILABLE FOR INTERNSHIP  ·  OPEN TO COLLABORATE  ·  BUILDING IN PUBLIC  ·  ";

  return (
    <div className="pf">
      {modal && <LvlModal onClose={() => setModal(false)} />}
      <div className="scanlines" />

      {/* ── Ticker ── */}
      <div
        style={{
          background: T.cyan,
          overflow: "hidden",
          height: 28,
          display: "flex",
          alignItems: "center",
          borderBottom: `3px solid ${T.mag}`,
        }}
      >
        <div
          style={{
            fontSize: 8,
            fontFamily: "'Press Start 2P',monospace",
            color: T.bg,
            whiteSpace: "nowrap",
            animation: "marquee 40s linear infinite",
          }}
        >
          {TICKER.repeat(4)}
        </div>
      </div>

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: `${T.bg}ee`,
          borderBottom: `3px solid ${T.cyan}33`,
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(8px)",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="blink" style={{ width: 8, height: 8, background: T.cyan }} />
          <span style={{ fontSize: 9, color: T.cyan }}>PLAYER_01.EXE</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["hero", "experience", "projects", "skills", "contact"].map((s) => (
            <span key={s} className="nav-l" onClick={() => scrollTo(s)}>
              {s.toUpperCase()}
            </span>
          ))}
        </div>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "60px 28px",
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${T.cyan}0d 1px, transparent 1px),
              linear-gradient(90deg, ${T.cyan}0d 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
            flexWrap: "wrap",
            width: "100%",
            position: "relative",
          }}
        >
          {/* ── Avatar column ── */}
          <div style={{ flexShrink: 0 }}>
            <div
              className="float"
              style={{
                width: 196,
                height: 196,
                border: `4px solid ${T.cyan}`,
                boxShadow: `6px 6px 0 ${T.cyan}, 12px 12px 0 ${T.mag}33`,
                background: T.surface,
                padding: 16,
              }}
            >
              <img 
                src="/profile.jpeg" 
                alt="Profile" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  imageRendering: "pixelated",
                  filter: "contrast(1.1) grayscale(0.2)"
                }} 
              />
            </div>

            {/* HP bar */}
            <div style={{ marginTop: 8, fontSize: 7, color: T.green, letterSpacing: 1 }}>
              HP{" "}
              <span style={{ color: T.green }}>████████████</span> 100/100
            </div>

            {/* Stat chips */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {[
                ["LVL", "04", T.yellow],
                ["CLASS", "CS", T.cyan],
                ["EXP", "★★★", T.mag],
              ].map(([label, val, col]) => (
                <div
                  key={label}
                  style={{
                    padding: "8px 10px",
                    border: `2px solid ${col}`,
                    background: `${col}11`,
                    textAlign: "center",
                    minWidth: 52,
                  }}
                >
                  <div style={{ fontSize: 6, color: T.muted, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: col }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Text column ── */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 9, color: T.mag, marginBottom: 12, letterSpacing: 3 }}>
              ▶ PLAYER SELECT
            </div>

            <h1
              className="glitch"
              style={{
                fontSize: "clamp(24px, 4vw, 46px)",
                color: T.cyan,
                marginBottom: 14,
                lineHeight: 1.35,
                letterSpacing: 2,
              }}
            >
              ARMAN
              <br />
              <span style={{ color: T.mag }}>CHOUDHARY</span>
            </h1>

            {/* Typewriter */}
            <div
              style={{
                fontSize: "clamp(8px, 1.4vw, 10px)",
                color: T.green,
                marginBottom: 28,
                minHeight: 28,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ color: T.muted }}>$ </span>
              <span>{typed}</span>
              <span
                className="blink"
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 15,
                  background: T.green,
                  verticalAlign: "middle",
                }}
              />
            </div>

            <p
              className="vt"
              style={{ color: T.text, maxWidth: 480, marginBottom: 28 }}
            >
              Final-year B.Tech CS student at Sharda University. Building AI systems,
              full-stack apps, and open-source tools. On a quest to join a top-tier tech
              guild.
            </p>

            {/* Progress bar */}
            <div style={{ maxWidth: 360, marginBottom: 32 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span style={{ fontSize: 7, color: T.muted }}>PROGRESS TO GRADUATION</span>
                <span style={{ fontSize: 7, color: T.cyan }}>90%</span>
              </div>
              <div
                style={{
                  height: 14,
                  background: T.surface,
                  border: `2px solid ${T.cyan}44`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "90%",
                    background: `linear-gradient(90deg, ${T.cyan}, ${T.mag})`,
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button
                className="px-btn"
                style={{ color: T.cyan }}
                onClick={() => scrollTo("projects")}
              >
                ▶ VIEW QUESTS
              </button>
              <button
                className="px-btn"
                style={{ color: T.mag }}
                onClick={() => scrollTo("contact")}
              >
                ✉ SEND MESSAGE
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 28,
            textAlign: "right",
            fontSize: 8,
            color: T.muted,
          }}
        >
          <div>INSERT COIN</div>
          <div className="blink" style={{ color: T.cyan }}>
            ▼ SCROLL
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ════════════════════════════════ */}
      <section
        id="experience"
        style={{ padding: "80px 28px", maxWidth: 900, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="sec-t">QUEST LOG</div>
          <div className="dash" />
        </div>

        <div ref={expRef}>
          {EXP.map((e, i) => (
            <QuestItem key={i} {...e} idx={i} vis={expVis} />
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════ */}
      <section
        id="projects"
        style={{ padding: "80px 28px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="sec-t">ACTIVE QUESTS</div>
          <div
            className="dash"
            style={{
              width: 250,
              background: `repeating-linear-gradient(
                90deg, ${T.mag} 0, ${T.mag} 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
        </div>

        <div
          ref={projRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 40,
            paddingLeft: 32,
          }}
        >
          {/* Background Track Line */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: 4,
              background: `repeating-linear-gradient(
                to bottom, ${T.mag}22 0, ${T.mag}22 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
          
          {/* Animated Fill Line */}
          <motion.div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              width: 4,
              height: lineHeight,
              background: T.mag,
              boxShadow: `0 0 10px ${T.mag}`,
            }}
          />

          {PROJECTS.map((p, i) => (
            <div key={i} style={{ position: "relative" }}>
              {/* Timeline Node */}
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 24,
                  width: 12,
                  height: 12,
                  background: T.bg,
                  border: `2px solid ${p.accent || T.mag}`,
                  boxShadow: `0 0 0 3px ${T.bg}`,
                  zIndex: 2,
                }}
              />
              {/* Connector line */}
              <div
                style={{
                  position: "absolute",
                  left: -16,
                  top: 29,
                  width: 16,
                  height: 2,
                  background: p.accent || T.mag,
                }}
              />
              <GameCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ SKILLS ════════════════════════════════════ */}
      <section
        id="skills"
        ref={skillRef}
        style={{ padding: "80px 28px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="sec-t">STAT SHEET</div>
          <div
            className="dash"
            style={{
              background: `repeating-linear-gradient(
                90deg, ${T.green} 0, ${T.green} 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
        </div>

        <div
          ref={skillScrollRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 40,
            paddingLeft: 32,
          }}
        >
          {/* Background Track Line */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: 4,
              background: `repeating-linear-gradient(
                to bottom, ${T.green}22 0, ${T.green}22 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
          
          {/* Animated Fill Line */}
          <motion.div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              width: 4,
              height: skillLineHeight,
              background: T.green,
              boxShadow: `0 0 10px ${T.green}`,
            }}
          />

          {SKILLS.map(({ cat, col, items }) => (
            <div key={cat} style={{ position: "relative" }}>
              {/* Timeline Node */}
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 24,
                  width: 12,
                  height: 12,
                  background: T.bg,
                  border: `2px solid ${col}`,
                  boxShadow: `0 0 0 3px ${T.bg}`,
                  zIndex: 2,
                }}
              />
              {/* Connector line */}
              <div
                style={{
                  position: "absolute",
                  left: -16,
                  top: 29,
                  width: 16,
                  height: 2,
                  background: col,
                }}
              />

              <div
                style={{
                  background: T.card,
                  border: `3px solid ${T.border}`,
                  boxShadow: `4px 4px 0 ${T.muted}55`,
                  padding: 24,
                }}
              >
                <div style={{ fontSize: 9, color: col, marginBottom: 24, letterSpacing: 1 }}>
                  {cat}
                </div>
                {items.map(([name, val]) => (
                  <SkBar key={name} name={name} val={val} col={col} vis={skillVis} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TROPHY ROOM ════════════════════════════════ */}
      <section
        id="achievements"
        style={{ padding: "80px 28px", maxWidth: 760, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="sec-t" style={{ color: T.yellow }}>TROPHY ROOM</div>
          <div
            className="dash"
            style={{
              width: 180,
              background: `repeating-linear-gradient(
                90deg, ${T.yellow} 0, ${T.yellow} 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {ACHIEVEMENTS.map((ach, i) => (
            <div
              key={i}
              style={{
                background: T.card,
                border: `3px solid ${T.yellow}`,
                boxShadow: `4px 4px 0 ${T.yellow}44`,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = `6px 6px 0 ${T.yellow}88`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = `4px 4px 0 ${T.yellow}44`;
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 10, color: T.yellow, letterSpacing: 0.5 }}>
                  <span style={{ marginRight: 8 }}>🏆</span> {ach.title}
                </div>
                {ach.link && (
                  <a href={ach.link} target="_blank" rel="noreferrer" style={{ color: T.text, opacity: 0.7 }}>
                    <ExternalLink size={12} strokeWidth={3} />
                  </a>
                )}
              </div>
              <div style={{ fontSize: 9, color: T.text, lineHeight: 1.8 }}>
                {ach.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════ */}
      <section
        id="contact"
        style={{ padding: "80px 28px", maxWidth: 760, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 48 }}>
          <div className="sec-t">SEND MESSAGE</div>
          <div
            className="dash"
            style={{
              width: 230,
              background: `repeating-linear-gradient(
                90deg, ${T.mag} 0, ${T.mag} 8px,
                transparent 8px, transparent 16px
              )`,
            }}
          />
        </div>

        {/* Terminal window */}
        <div
          style={{
            background: T.card,
            border: `4px solid ${T.cyan}`,
            boxShadow: `6px 6px 0 ${T.cyan}`,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: T.cyan,
              padding: "8px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              {[T.red, T.yellow, T.green].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 10,
                    height: 10,
                    background: c,
                    border: "2px solid rgba(0,0,0,.3)",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 8,
                fontFamily: "'Press Start 2P',monospace",
                color: T.bg,
              }}
            >
              TERMINAL — MSG.EXE
            </span>
            <Terminal size={14} strokeWidth={3} color={T.bg} />
          </div>

          {/* Form body */}
          <div style={{ padding: 28 }}>
            <div style={{ fontSize: 9, color: T.green, marginBottom: 22, lineHeight: 2.4 }}>
              <span style={{ color: T.muted }}>$ </span>
              init_contact.exe --user=visitor
              <br />
              <span style={{ color: T.muted }}>» </span>
              Connection established. Ready for input.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name */}
              <div>
                <div style={{ fontSize: 8, color: T.muted, marginBottom: 6 }}>
                  <span style={{ color: T.cyan }}>01</span> PLAYER_NAME:
                </div>
                <input
                  className="px-in"
                  placeholder="Enter your name..."
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                {errs.name && (
                  <div style={{ fontSize: 7, color: T.red, marginTop: 4 }}>
                    ⚠ {errs.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <div style={{ fontSize: 8, color: T.muted, marginBottom: 6 }}>
                  <span style={{ color: T.cyan }}>02</span> CONTACT_ADDR:
                </div>
                <input
                  className="px-in"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
                {errs.email && (
                  <div style={{ fontSize: 7, color: T.red, marginTop: 4 }}>
                    ⚠ {errs.email}
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <div style={{ fontSize: 8, color: T.muted, marginBottom: 6 }}>
                  <span style={{ color: T.cyan }}>03</span> MESSAGE_BODY:
                </div>
                <textarea
                  className="px-in"
                  rows={5}
                  placeholder="Type your message here..."
                  value={form.msg}
                  onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
                />
                {errs.msg && (
                  <div style={{ fontSize: 7, color: T.red, marginTop: 4 }}>
                    ⚠ {errs.msg}
                  </div>
                )}
              </div>

              {/* Submit row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 8, color: sending ? T.yellow : T.muted }}>
                  {sending ? "▶ TRANSMITTING..." : ""}
                </span>
                <button
                  className="px-btn"
                  style={{ color: T.cyan, opacity: sending ? 0.6 : 1 }}
                  onClick={submit}
                  disabled={sending}
                >
                  <Send size={10} strokeWidth={3} />
                  {sending ? "SENDING..." : "TRANSMIT ▶"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 28,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://github.com/Arman-op"
            target="_blank"
            rel="noreferrer"
            className="px-btn"
            style={{ color: T.text }}
          >
            <Code size={11} strokeWidth={3} /> GITHUB
          </a>
          <a
            href="mailto:armanchoudhary950@gmail.com"
            className="px-btn"
            style={{ color: T.text }}
          >
            <Mail size={11} strokeWidth={3} /> EMAIL
          </a>
          <a
            href="https://www.linkedin.com/in/arman-choudhary-363440210/"
            target="_blank"
            rel="noreferrer"
            className="px-btn"
            style={{ color: T.text }}
          >
            <ExternalLink size={11} strokeWidth={3} /> LINKEDIN
          </a>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════ */}
      <footer
        style={{
          borderTop: `3px solid ${T.border}`,
          padding: "40px 28px",
          textAlign: "center",
        }}
      >
        <div
          style={{ fontSize: 9, color: T.muted, marginBottom: 10, letterSpacing: 5 }}
        >
          — GAME OVER —
        </div>
        <div style={{ fontSize: 7, color: T.muted, marginBottom: 8 }}>
          © 2025 ARMAN CHOUDHARY · BUILT WITH REACT · POWERED BY CAFFEINE &amp; DEADLINES
        </div>
        <div style={{ fontSize: 8, color: T.cyan }}>
          INSERT COIN TO CONTINUE{" "}
          <span className="blink">█</span>
        </div>
      </footer>
    </div>
  );
}
