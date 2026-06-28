import { useEffect, useMemo, useState } from 'react'

const navItems = [
  ['overview', '00', 'Command Deck'],
  ['journey', '01', 'Route Log'],
  ['identity', '02', 'Kernel'],
  ['skills', '03', 'Compute Map'],
  ['experience', '04', 'Case Studies'],
  ['projects', '05', 'Build Logs'],
  ['ranked', '06', 'Player Profile'],
]

const serverNodes = [
  {
    id: 'gpu-01',
    label: 'GPU / AI',
    detail: 'PyTorch · TensorFlow · CUDA',
    metric: 'NVLINK',
    load: 86,
    color: 'cyan',
  },
  {
    id: 'perf-02',
    label: 'PERF LAB',
    detail: 'NUMA · PCIe · NCCL · profiling',
    metric: '31 μs',
    load: 72,
    color: 'gold',
  },
  {
    id: 'sys-03',
    label: 'SYSTEMS',
    detail: 'Linux · C/C++ · Kubernetes',
    metric: '99.9%',
    load: 64,
    color: 'green',
  },
  {
    id: 'api-04',
    label: 'BACKEND',
    detail: 'FastAPI · Redis · Docker',
    metric: '12 ms',
    load: 48,
    color: 'violet',
  },
]

const experience = [
  {
    key: 'cisco',
    company: 'CISCO',
    role: 'Software Engineer Intern',
    date: 'MAY 2026 — PRESENT',
    location: 'San Jose, CA',
    classification: 'SERVER VALIDATION / PERFORMANCE',
    thesis:
      'Making server behavior legible across compute, memory, storage, networking, and GPU workloads.',
    challenge:
      'A platform is only as trustworthy as its behavior under real contention. The work spans UCS server validation across CPU, memory, NVMe, NUMA, PCIe, and GPU paths.',
    actions: [
      'Profiled CPU, memory, NUMA, and backend bottlenecks with Intel MLC, PCM, AMD uProf, perf, and SPEC CPU.',
      'Visualized benchmark telemetry to isolate bandwidth, PCIe, and GPU suite bottlenecks.',
      'Validated Kubernetes GPU workloads with CUDA SDK pods, manifests, kubectl, nvidia-smi, and GPU burn stress tests.',
    ],
    outcome: 'A clearer evidence trail from server telemetry to platform-level diagnosis.',
    stack: ['Cisco UCS', 'Linux', 'Kubernetes', 'CUDA', 'NUMA', 'NVMe'],
    signal: 'LIVE',
  },
  {
    key: 'lenovo',
    company: 'LENOVO',
    role: 'Systems Software Engineer Intern',
    date: 'JUN 2024 — AUG 2024',
    location: 'Morrisville, NC',
    classification: 'DISTRIBUTED GPU / NCCL',
    thesis:
      'Debugging the invisible links between GPUs so distributed workloads stay fast and dependable.',
    challenge:
      'GPU clusters can look healthy while topology, routing, and collective communication quietly erode throughput and reliability.',
    actions: [
      'Partnered with NVIDIA CUDA engineers to debug NCCL bottlenecks and improve GPU-cluster efficiency.',
      'Traced NVLink/PCIe conflicts with HPC diagnostics and designed InfiniBand/NCCL latency tests.',
      'Debugged Linux routing and DNS across GPU cluster nodes, then automated Docker CI/CD checks.',
    ],
    outcome: '20% fewer recurring distributed workload failures and 40% faster manual testing cycles.',
    stack: ['CUDA', 'NCCL', 'NVLink', 'PCIe', 'InfiniBand', 'Docker'],
    signal: 'COMPLETE',
  },
  {
    key: 'hkust',
    company: 'HKUST',
    role: 'Machine Learning Engineer Intern',
    date: 'JUN 2025 — AUG 2025',
    location: 'Guangzhou, China',
    classification: 'CLINICAL ML / DATA PIPELINE',
    thesis:
      'Building clinical ML workflows where the integrity of every record matters as much as the model.',
    challenge:
      'Sparse, sensitive clinical data needs careful preprocessing, reproducible validation, and useful inference under strict data-quality constraints.',
    actions: [
      'Engineered Python pipelines for 1,000+ patient records while preserving 99% data integrity.',
      'Optimized Random Forest regressors with cross-validation and refactored SQL/Bash ETL workflows.',
      'Parallelized validation across 256 drug combinations for clinical research teams.',
    ],
    outcome: '0.79 R² validation score and 30% lower ingestion latency across preprocessing runs.',
    stack: ['Python', 'PyTorch', 'SQL', 'Scikit-learn', 'ETL', 'ML'],
    signal: 'COMPLETE',
  },
]

const projects = [
  {
    id: 'BLD-001',
    title: 'Linux Performance Profiler',
    type: 'SYSTEMS TOOL',
    status: 'BENCHMARKED',
    summary:
      'A repeatable lab for understanding latency across memory, storage, and processes instead of guessing at “slow.”',
    metrics: ['p50 / p95 latency', '30+ runs', '10% regression flags'],
    stack: ['C', 'Python', 'Bash', 'Linux', 'Intel MLC'],
    accent: 'gold',
  },
  {
    id: 'BLD-002',
    title: 'The Dining Council',
    type: 'PRODUCT / BACKEND',
    status: 'SHIPPED',
    summary:
      'A multiplayer restaurant decision system: ranked choices, live rooms, and less “where should we eat?” deadlock.',
    metrics: ['10+ REST endpoints', '50 candidates/search', '10 concurrent lobbies'],
    stack: ['FastAPI', 'Redis', 'Docker', 'Gemini', 'Maps API'],
    accent: 'cyan',
  },
  {
    id: 'BLD-003',
    title: 'Personalized Medicine AI Pipeline',
    type: 'APPLIED ML',
    status: 'VALIDATED',
    summary:
      'A treatment-outcome pipeline designed around messy clinical reality: sparse records, imputation, and transparent preprocessing.',
    metrics: ['99% data integrity', 'low-latency inference', 'clinical preprocessing'],
    stack: ['PyTorch', 'Python', 'SQL', 'ML Pipelines'],
    accent: 'green',
  },
  {
    id: 'BLD-004',
    title: 'TonyOS',
    type: 'DESIGN ENGINEERING',
    status: 'YOU ARE HERE',
    summary:
      'A personal website recast as an explorable compute environment—built to communicate systems thinking through the interface itself.',
    metrics: ['React + Vite', 'zero stock imagery', 'local scripted guide'],
    stack: ['React', 'CSS', 'SVG', 'Vercel'],
    accent: 'violet',
  },
]

const botAnswers = {
  journey: {
    question: 'Why the non-linear path?',
    answer:
      'Tony went from Newport High School in Bellevue to UC Santa Cruz, then transferred to Georgia Tech. The useful signal is not the detour—it is the willingness to re-route, keep building, and earn a place in a harder environment.',
  },
  skills: {
    question: 'Where is Tony strongest?',
    answer:
      'At the boundaries: software meeting hardware, AI meeting infrastructure, and product decisions meeting backend constraints. His core is systems + AI + performance, with enough product instinct to build things people can actually use.',
  },
  projects: {
    question: 'Which project should I inspect?',
    answer:
      'Start with the Linux Performance Profiler for systems depth, then The Dining Council for backend and product range. Together they show the operating span better than either project alone.',
  },
  gaming: {
    question: 'What does gaming add?',
    answer:
      'A long-running practice loop: review the system, isolate the bottleneck, adapt under pressure, repeat. Top-800 Valorant and high ranks across several competitive games are evidence of disciplined iteration—not a meme sidebar.',
  },
  different: {
    question: 'What makes Tony different?',
    answer:
      'Breadth with a center of gravity. Tony can trace a GPU communication bottleneck, shape an ML pipeline, build a backend, and explain the tradeoff. The common thread is making complex systems observable and useful.',
  },
}

function Icon({ name, size = 18 }) {
  const paths = {
    command: <><path d="m5 7 4 4-4 4" /><path d="M11 15h7" /></>,
    route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h3a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3" /></>,
    chip: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></>,
    layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" /><path d="M7 6H3v2a4 4 0 0 0 4 4M17 6h4v2a4 4 0 0 1-4 4" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    external: <><path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></>,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function BootScreen({ onEnter }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="boot-screen" role="dialog" aria-label="TonyOS boot sequence">
      <div className="boot-grid" />
      <div className="boot-shell">
        <div className="boot-mark" aria-hidden="true">
          <span>T</span>
          <i />
          <span>OS</span>
        </div>
        <p className="eyebrow">PERSONAL COMPUTE ENVIRONMENT</p>
        <h1>TONY<span>OS</span></h1>
        <div className="boot-log" aria-live="polite">
          <p><i className="ok" /> MOUNTING /TONY/EXPERIENCE</p>
          <p><i className="ok delay-one" /> LINKING AI_COMPUTE_FABRIC</p>
          <p><i className="ok delay-two" /> LOADING HUMAN_CONTEXT.DAT</p>
        </div>
        <button className={`boot-button ${ready ? 'is-ready' : ''}`} onClick={onEnter}>
          <span>{ready ? 'ENTER TONYOS' : 'BOOTING SYSTEM'}</span>
          <Icon name="arrow" />
        </button>
        <p className="boot-hint">NO API KEYS · NO STOCK IMAGERY · JUST BUILT SYSTEMS</p>
      </div>
      <div className="boot-corner top-left">SYS.2026</div>
      <div className="boot-corner bottom-right">BELLEVUE → ATLANTA</div>
    </div>
  )
}

function PixelSkyline() {
  return (
    <svg className="pixel-skyline" viewBox="0 0 380 150" role="img" aria-label="Pixel art route from Seattle to Atlanta">
      <g className="pixel-seattle" shapeRendering="crispEdges">
        <path d="M20 127h104v6H20zM38 108h22v19H38zM43 90h12v18H43zM48 58h4v32h-4zM44 66h12v3H44zM47 49h6v9h-6zM49 35h2v14h-2z" />
        <path d="M67 98h16v29H67zM88 112h25v15H88z" opacity=".55" />
      </g>
      <g className="pixel-route" shapeRendering="crispEdges">
        <path d="M118 92h10v4h-10zM132 88h10v4h-10zM146 84h10v4h-10zM160 82h10v4h-10zM174 80h10v4h-10zM188 82h10v4h-10zM202 85h10v4h-10zM216 88h10v4h-10zM230 92h10v4h-10z" />
        <path className="route-packet" d="M118 92h10v4h-10z" />
      </g>
      <g className="pixel-atlanta" shapeRendering="crispEdges">
        <path d="M256 127h104v6H256zM273 103h18v24h-18zM296 78h31v49h-31zM303 68h17v10h-17zM309 58h5v10h-5zM332 96h17v31h-17z" />
        <path d="M301 84h5v5h-5zM311 84h5v5h-5zM301 95h5v5h-5zM311 95h5v5h-5zM301 106h5v5h-5zM311 106h5v5h-5z" className="pixel-windows" />
      </g>
      <text x="20" y="147">SEA // ORIGIN</text>
      <text x="276" y="147">ATL // ACTIVE</text>
    </svg>
  )
}

function ServerRack() {
  const [selected, setSelected] = useState(serverNodes[0])

  return (
    <div className="rack-module">
      <div className="rack-heading">
        <div>
          <span className="micro-label">PRIMARY VISUAL BUS</span>
          <strong>TONY // COMPUTE FABRIC</strong>
        </div>
        <span className="live-tag"><i /> ALL LINKS UP</span>
      </div>
      <div className="rack-stage">
        <div className="fiber fiber-a" />
        <div className="fiber fiber-b" />
        <div className="fiber fiber-c" />
        <div className="server-rack">
          <div className="rack-top">
            <span>42U</span><i /><i /><span>TW-01</span>
          </div>
          {serverNodes.map((node, index) => (
            <button
              key={node.id}
              className={`server-blade ${node.color} ${selected.id === node.id ? 'selected' : ''}`}
              onClick={() => setSelected(node)}
              aria-pressed={selected.id === node.id}
            >
              <span className="server-index">0{index + 1}</span>
              <span className="drive-array" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
              <span className="server-name">{node.label}</span>
              <span className="server-leds" aria-hidden="true"><i /><i /><i /></span>
              <span className="server-load" style={{ '--load': `${node.load}%` }}><i /></span>
            </button>
          ))}
          <div className="rack-switch">
            <span>FABRIC</span>
            {Array.from({ length: 12 }, (_, i) => <i key={i} className={i < 8 ? 'active' : ''} />)}
          </div>
          <div className="rack-power"><i /><span>REDUNDANT POWER // OK</span><i /></div>
        </div>
        <div className="rack-inspector">
          <div className="inspector-head"><span>SELECTED NODE</span><b>{selected.id.toUpperCase()}</b></div>
          <strong>{selected.label}</strong>
          <p>{selected.detail}</p>
          <div className="inspector-metric">
            <span>LINK SIGNAL</span>
            <b>{selected.metric}</b>
          </div>
          <div className="sparkline" aria-hidden="true">
            {[42, 68, 52, 81, 62, 74, 90, 72, 86, 66, 82, 76].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
          <span className="interaction-note">CLICK A SERVER BLADE TO INSPECT</span>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ index, kicker, title, copy }) {
  return (
    <header className="section-header">
      <div className="section-index">{index}</div>
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </header>
  )
}

function TonyBot({ isOpen, onClose, onOpen }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Local guide online. Pick a query and I’ll route you to the useful context.' },
  ])
  const [typing, setTyping] = useState(false)

  const ask = (key) => {
    if (typing) return
    const item = botAnswers[key]
    setMessages((current) => [...current, { from: 'user', text: item.question }])
    setTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: 'bot', text: item.answer }])
      setTyping(false)
    }, 420)
  }

  if (!isOpen) {
    return (
      <button className="bot-launcher" onClick={onOpen} aria-label="Open Tony Bot">
        <span className="bot-status"><i /></span>
        <Icon name="message" />
        <span><b>TONY BOT</b><small>LOCAL GUIDE</small></span>
      </button>
    )
  }

  return (
    <aside className="bot-panel" aria-label="Tony Bot local site guide">
      <div className="bot-header">
        <div className="bot-avatar" aria-hidden="true"><span>TB</span><i /></div>
        <div><strong>TONY BOT</strong><span><i /> SCRIPTED GUIDE ONLINE</span></div>
        <button onClick={onClose} aria-label="Close Tony Bot"><Icon name="x" /></button>
      </div>
      <div className="bot-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.from}-${index}`} className={`bot-message ${message.from}`}>
            <span>{message.from === 'bot' ? 'TB' : 'YOU'}</span>
            <p>{message.text}</p>
          </div>
        ))}
        {typing && <div className="bot-typing"><i /><i /><i /></div>}
      </div>
      <div className="bot-queries">
        <span>QUICK QUERIES</span>
        <div>
          {Object.entries(botAnswers).map(([key, item]) => (
            <button key={key} onClick={() => ask(key)}>{item.question}</button>
          ))}
        </div>
      </div>
      <div className="bot-disclaimer">LOCAL DECISION TREE · NO AI API CONNECTED</div>
    </aside>
  )
}

function App() {
  const [booted, setBooted] = useState(false)
  const [active, setActive] = useState('overview')
  const [activeExperience, setActiveExperience] = useState(experience[0].key)
  const [botOpen, setBotOpen] = useState(false)
  const [clock, setClock] = useState('')

  const currentExperience = useMemo(
    () => experience.find((item) => item.key === activeExperience),
    [activeExperience],
  )

  useEffect(() => {
    const formatClock = () => {
      setClock(new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      }).format(new Date()))
    }
    formatClock()
    const timer = window.setInterval(formatClock, 30000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!booted) return undefined
    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [booted])

  const enterOS = () => {
    setBooted(true)
    window.requestAnimationFrame(() => window.scrollTo(0, 0))
  }

  return (
    <div className="app-shell">
      {!booted && <BootScreen onEnter={enterOS} />}

      <a className="skip-link" href="#overview">Skip to TonyOS</a>
      <header className="topbar">
        <a className="os-wordmark" href="#overview" aria-label="TonyOS home">
          <span className="wordmark-block">T</span>
          <b>TONY<span>OS</span></b>
          <small>v1.0.27</small>
        </a>
        <div className="topbar-command">
          <span>tony@gt</span><i>:</i><b>~/brain</b><i>$</i><em> explore --all</em><u />
        </div>
        <div className="topbar-status">
          <span className="status-network"><i /> OPEN TO SIGNAL</span>
          <span>SEA {clock} PT</span>
        </div>
      </header>

      <nav className="side-nav" aria-label="Primary navigation">
        <div className="nav-track">
          {navItems.map(([id, num, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              <span>{num}</span>
              <b>{label}</b>
            </a>
          ))}
        </div>
        <div className="nav-social">
          <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GH</a>
          <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">IN</a>
        </div>
      </nav>

      <main>
        <section id="overview" data-section className="command-deck">
          <div className="identity-console panel-frame">
            <div className="panel-topline"><span>USER PROFILE</span><span className="panel-code">TW-2004</span></div>
            <div className="identity-mark" aria-hidden="true">
              <div className="pixel-face">
                <i className="hair h1" /><i className="hair h2" /><i className="hair h3" />
                <i className="face" /><i className="eye e1" /><i className="eye e2" /><i className="mouth" />
                <i className="hoodie" /><i className="hoodie-line" />
              </div>
              <span className="avatar-scan" />
            </div>
            <p className="eyebrow">OPERATOR / BUILDER / STUDENT</p>
            <h1>TONY<br /><span>WANG</span></h1>
            <p className="identity-intro">
              CS at Georgia Tech. I build at the seams between <b>systems, AI, performance,</b> and <b>product.</b>
            </p>
            <div className="identity-meta">
              <div><span>BASE</span><b>ATLANTA, GA</b></div>
              <div><span>ORIGIN</span><b>BELLEVUE, WA</b></div>
              <div><span>GRAD</span><b>MAY 2027</b></div>
              <div><span>STATUS</span><b className="online"><i /> BUILDING</b></div>
            </div>
            <div className="identity-links">
              <a href="/tony-wang-resume.pdf" target="_blank"><Icon name="download" /> RESUME</a>
              <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GITHUB <Icon name="external" size={14} /></a>
              <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LINKEDIN <Icon name="external" size={14} /></a>
            </div>
          </div>

          <ServerRack />

          <aside className="vitals-column">
            <div className="vital-card panel-frame">
              <div className="panel-topline"><span>OPERATOR VITALS</span><span>LIVE</span></div>
              <div className="vital-readout">
                <span>CORE FOCUS</span>
                <strong>4<span>/4</span></strong>
                <div className="segmented"><i /><i /><i /><i /></div>
                <p>SYS · AI · PERF · PRODUCT</p>
              </div>
              <div className="vital-list">
                <div><span>Curiosity</span><b>98%</b><i style={{ '--value': '98%' }} /></div>
                <div><span>Persistence</span><b>96%</b><i style={{ '--value': '96%' }} /></div>
                <div><span>Ping (SEA→ATL)</span><b>NON-LINEAR</b><i style={{ '--value': '82%' }} /></div>
              </div>
            </div>
            <div className="currently-card panel-frame">
              <div className="panel-topline"><span>CURRENT PROCESS</span><i className="spinner" /></div>
              <strong>CISCO // UCS</strong>
              <p>Profiling server behavior from CPU counters to GPU workloads.</p>
              <div className="terminal-mini">
                <span>$ perf stat ./curiosity</span>
                <span className="terminal-output">→ no idle cycles found</span>
              </div>
            </div>
            <div className="quick-jump-card">
              <span>NEXT PACKET</span>
              <a href="#journey">TRACE THE ROUTE <Icon name="arrow" /></a>
            </div>
          </aside>
        </section>

        <section id="journey" data-section className="content-section journey-section">
          <SectionHeader
            index="01"
            kicker="ROUTE LOG // NON-LINEAR BY DESIGN"
            title="The path wasn’t straight. The signal stayed strong."
            copy="A transfer story, but more importantly a persistence story: keep learning, keep shipping, re-route when the destination demands it."
          />
          <div className="journey-layout">
            <div className="journey-map panel-frame">
              <div className="map-grid" />
              <PixelSkyline />
              <div className="map-label map-label-a"><span>47.6101° N</span><b>BELLEVUE</b></div>
              <div className="map-label map-label-b"><span>33.7756° N</span><b>ATLANTA</b></div>
            </div>
            <div className="route-log">
              <article>
                <span className="route-year">ORIGIN</span>
                <div className="route-node"><i /></div>
                <div><p>NEWPORT HIGH SCHOOL</p><h3>Bellevue built the baseline.</h3><span>Competitive energy, Pacific Northwest curiosity, and the first version of the work ethic.</span></div>
              </article>
              <article>
                <span className="route-year">REROUTE</span>
                <div className="route-node"><i /></div>
                <div><p>UC SANTA CRUZ</p><h3>The route became intentional.</h3><span>A place to prove that the first destination did not have to be the final one.</span></div>
              </article>
              <article className="active">
                <span className="route-year">ACTIVE</span>
                <div className="route-node"><i /></div>
                <div><p>GEORGIA INSTITUTE OF TECHNOLOGY</p><h3>Earned the harder environment.</h3><span>B.S. Computer Science · Atlanta, GA · Graduating May 2027</span></div>
              </article>
            </div>
          </div>
          <blockquote>
            <span>ROUTE PRINCIPLE</span>
            “I don’t treat a detour as evidence I’m behind. I treat it as a system state: observe, adapt, keep moving.”
          </blockquote>
        </section>

        <section id="identity" data-section className="content-section identity-section">
          <SectionHeader
            index="02"
            kicker="KERNEL // DIFFERENTIATORS"
            title="Not just another LeetCode-shaped engineer."
            copy="The center of gravity is technical depth. The differentiator is being able to connect it across layers."
          />
          <div className="kernel-grid">
            <article className="kernel-card featured">
              <span className="kernel-num">KERNEL.01</span>
              <div className="kernel-icon"><Icon name="layers" size={24} /></div>
              <h3>Full-stack, literally.</h3>
              <p>From GPU interconnects and NUMA topology to APIs, data products, and the person waiting on the other side of the interface.</p>
              <div className="layer-stack" aria-label="Technical layers">
                <span>USER / PRODUCT</span><span>BACKEND / DATA</span><span>RUNTIME / OS</span><span>HARDWARE / FABRIC</span>
              </div>
            </article>
            <article className="kernel-card">
              <span className="kernel-num">KERNEL.02</span>
              <div className="kernel-icon"><Icon name="chip" size={24} /></div>
              <h3>Measures before guessing.</h3>
              <p>Telemetry, profiling, controlled benchmarks, and boring reproducibility beat clever speculation.</p>
              <div className="kernel-command"><span>$</span> isolate --bottleneck</div>
            </article>
            <article className="kernel-card">
              <span className="kernel-num">KERNEL.03</span>
              <div className="kernel-icon"><Icon name="route" size={24} /></div>
              <h3>Comfortable with the reroute.</h3>
              <p>Transfers, unfamiliar systems, and ambiguous problems all reward the same muscle: adapt without losing momentum.</p>
              <div className="packet-path"><i /><i /><i /><i /><i /></div>
            </article>
            <article className="kernel-card wide">
              <span className="kernel-num">KERNEL.04</span>
              <h3>Broad range. One consistent question.</h3>
              <p className="kernel-quote">“Where is the system losing signal—and how do we make that visible, reliable, and useful?”</p>
              <div className="kernel-tags"><span>SYSTEMS</span><i>+</i><span>AI</span><i>+</i><span>PERFORMANCE</span><i>+</i><span>PRODUCT</span></div>
            </article>
          </div>
        </section>

        <section id="skills" data-section className="content-section skills-section">
          <SectionHeader
            index="03"
            kicker="COMPUTE MAP // CAPABILITY TOPOLOGY"
            title="A skill graph, not a keyword cloud."
            copy="Tools make more sense when you can see what job they do and how the layers connect."
          />
          <div className="skill-topology panel-frame">
            <div className="topology-grid" />
            <svg className="topology-lines" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 300 230 150M500 300 770 150M500 300 230 450M500 300 770 450" />
              <path d="M230 150 770 150M230 450 770 450" className="dim" />
              <circle cx="365" cy="225" r="5" /><circle cx="635" cy="225" r="5" /><circle cx="635" cy="375" r="5" /><circle cx="365" cy="375" r="5" />
            </svg>
            <div className="topology-core">
              <span>OPERATOR</span>
              <strong>TW</strong>
              <small>CROSS-LAYER<br />ENGINEERING</small>
            </div>
            <article className="skill-cluster systems">
              <header><span>01</span><div><b>SYSTEMS</b><small>THE MACHINE</small></div><i /></header>
              <div><span>Linux</span><span>C</span><span>C++</span><span>Bash</span><span>Docker</span><span>Kubernetes</span><span>TCP/IP</span><span>NVMe</span></div>
            </article>
            <article className="skill-cluster ai">
              <header><span>02</span><div><b>AI / DATA</b><small>THE MODEL</small></div><i /></header>
              <div><span>PyTorch</span><span>TensorFlow</span><span>Scikit-learn</span><span>Python</span><span>SQL</span><span>Clinical ML</span></div>
            </article>
            <article className="skill-cluster performance">
              <header><span>03</span><div><b>PERFORMANCE</b><small>THE SIGNAL</small></div><i /></header>
              <div><span>CUDA</span><span>NCCL</span><span>NVLink</span><span>PCIe</span><span>NUMA</span><span>Intel MLC</span><span>perf</span><span>Profiling</span></div>
            </article>
            <article className="skill-cluster product">
              <header><span>04</span><div><b>BACKEND / PRODUCT</b><small>THE EXPERIENCE</small></div><i /></header>
              <div><span>FastAPI</span><span>Redis</span><span>React</span><span>JavaScript</span><span>Java</span><span>GCP</span><span>REST APIs</span></div>
            </article>
            <div className="topology-legend"><span><i /> DAILY DRIVER</span><span><i /> DEPLOYED / APPLIED</span><span><i /> SYSTEM LINK</span></div>
          </div>
        </section>

        <section id="experience" data-section className="content-section experience-section">
          <SectionHeader
            index="04"
            kicker="FIELD REPORTS // ENGINEERING CASE STUDIES"
            title="Work described as problems, decisions, and outcomes."
            copy="The logo matters less than the system under test and the evidence left behind."
          />
          <div className="experience-console panel-frame">
            <div className="experience-tabs" role="tablist" aria-label="Experience case studies">
              {experience.map((item, index) => (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={activeExperience === item.key}
                  onClick={() => setActiveExperience(item.key)}
                  className={activeExperience === item.key ? 'active' : ''}
                >
                  <span>0{index + 1}</span>
                  <b>{item.company}</b>
                  <small>{item.classification.split(' / ')[0]}</small>
                  <i />
                </button>
              ))}
            </div>
            <article className="case-study" key={currentExperience.key}>
              <div className="case-header">
                <div>
                  <span className="micro-label">{currentExperience.classification}</span>
                  <h3>{currentExperience.company}</h3>
                  <p>{currentExperience.role}</p>
                </div>
                <div className="case-meta"><span>{currentExperience.date}</span><b>{currentExperience.location}</b><i className={currentExperience.signal === 'LIVE' ? 'live' : ''}>{currentExperience.signal}</i></div>
              </div>
              <p className="case-thesis">{currentExperience.thesis}</p>
              <div className="case-columns">
                <div className="case-challenge">
                  <span>01 // SYSTEM UNDER TEST</span>
                  <p>{currentExperience.challenge}</p>
                  <div className="case-stack">{currentExperience.stack.map((item) => <i key={item}>{item}</i>)}</div>
                </div>
                <div className="case-actions">
                  <span>02 // ENGINEERING MOVES</span>
                  <ol>{currentExperience.actions.map((item, index) => <li key={item}><b>0{index + 1}</b><p>{item}</p></li>)}</ol>
                </div>
              </div>
              <div className="case-outcome"><span>03 // OUTPUT SIGNAL</span><strong>{currentExperience.outcome}</strong><div className="outcome-bars">{[28, 55, 42, 78, 62, 92, 73, 100].map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}</div></div>
            </article>
          </div>
        </section>

        <section id="projects" data-section className="content-section projects-section">
          <SectionHeader
            index="05"
            kicker="BUILD LOGS // SELECTED PROJECTS"
            title="Things made to understand a system better."
            copy="Every build has a hypothesis, an implementation, and a signal worth measuring."
          />
          <div className="build-grid">
            {projects.map((project) => (
              <article key={project.id} className={`build-card ${project.accent}`}>
                <div className="build-card-top"><span>{project.id}</span><i>{project.status}</i></div>
                <div className="build-visual" aria-hidden="true">
                  <div className="mini-window">
                    <span><i /><i /><i /></span>
                    <div>{project.id === 'BLD-001' && <><b className="perf-line l1" /><b className="perf-line l2" /><b className="perf-line l3" /><em>p95</em></>}{project.id === 'BLD-002' && <><b className="table-row" /><b className="table-row" /><b className="table-row" /><u className="cursor-dot" /></>}{project.id === 'BLD-003' && <><b className="node n1" /><b className="node n2" /><b className="node n3" /><b className="node n4" /><u className="model-link" /></>}{project.id === 'BLD-004' && <><b className="rack-mini" /><b className="rack-mini" /><b className="rack-mini" /><em>OS</em></>}</div>
                  </div>
                </div>
                <span className="build-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="build-metrics">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                <div className="build-stack">{project.stack.map((item) => <i key={item}>{item}</i>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="ranked" data-section className="content-section ranked-section">
          <SectionHeader
            index="06"
            kicker="PLAYER PROFILE // OUTSIDE THE TERMINAL"
            title="Competitive by nature. Reflective by practice."
            copy="Gaming and swimming are two different versions of the same loop: technique, feedback, composure, repetition."
          />
          <div className="ranked-layout">
            <div className="player-card panel-frame">
              <div className="player-banner">
                <div className="rank-emblem"><span>TW</span><i /><i /><i /></div>
                <div><span>PLAYER // TONY</span><h3>SYSTEMS STRATEGIST</h3><p>SEA REGION · FLEX ROLE</p></div>
                <strong>LVL<br /><b>27</b></strong>
              </div>
              <div className="rank-list">
                <div className="rank-row primary"><span className="rank-place">#800</span><div><b>VALORANT</b><small>PEAK PLACEMENT · GLOBAL</small></div><i className="rank-gem red" /></div>
                <div className="rank-row"><span className="rank-place">GM</span><div><b>MARVEL RIVALS</b><small>GRANDMASTER</small></div><i className="rank-gem violet" /></div>
                <div className="rank-row"><span className="rank-place">M</span><div><b>OVERWATCH</b><small>MASTER</small></div><i className="rank-gem blue" /></div>
                <div className="rank-row"><span className="rank-place">D</span><div><b>RAINBOW SIX</b><small>DIAMOND</small></div><i className="rank-gem cyan" /></div>
                <div className="rank-row"><span className="rank-place">E</span><div><b>LEAGUE</b><small>EMERALD</small></div><i className="rank-gem green" /></div>
              </div>
            </div>
            <div className="personal-panels">
              <article className="loop-panel panel-frame">
                <div className="panel-topline"><span>TRANSFERABLE LOOP</span><span>5 STEPS</span></div>
                <div className="loop-cycle">
                  {['OBSERVE', 'ISOLATE', 'ADAPT', 'EXECUTE', 'REVIEW'].map((step, index) => <div key={step}><b>0{index + 1}</b><span>{step}</span></div>)}
                </div>
                <p>High-rank play is systems work under pressure: read state, allocate attention, and make the next decision with incomplete information.</p>
              </article>
              <article className="taste-panel panel-frame">
                <div className="panel-topline"><span>PERSONAL LOADOUT</span><span>OFF-CLOCK</span></div>
                <div className="taste-grid">
                  <div><span>FAVORITE SYSTEM</span><b>PATH OF EXILE</b><small>Buildcraft · economy · deep systems</small></div>
                  <div><span>SOCIAL SANDBOX</span><b>GTA RP</b><small>Emergent worlds · character · improv</small></div>
                  <div className="swim"><span>PHYSICAL RESET</span><b>SWIMMING</b><small>Rhythm · endurance · quiet iteration</small><i className="wave"><u /><u /><u /></i></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <span className="eyebrow">END OF LINE // START OF CONVERSATION</span>
            <h2>Want to compare notes?</h2>
            <p>I’m always interested in systems, AI infrastructure, performance, and ambitious things that need to actually work.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:wangtzero@gmail.com">wangtzero@gmail.com <Icon name="arrow" /></a>
            <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GITHUB <Icon name="external" /></a>
            <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LINKEDIN <Icon name="external" /></a>
          </div>
          <div className="footer-system"><span>TONYOS v1.0.27</span><span>BUILT WITH REACT, CSS & CURIOSITY</span><span><i /> SYSTEM NOMINAL</span></div>
        </footer>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 6).map(([id, num]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}><span>{num}</span></a>
        ))}
      </nav>

      <TonyBot isOpen={botOpen} onClose={() => setBotOpen(false)} onOpen={() => setBotOpen(true)} />
    </div>
  )
}

export default App
