import { useEffect, useRef, useState } from 'react'

const chapters = [
  {
    step: '01',
    short: 'BELLEVUE',
    place: 'Newport High School',
    location: 'Bellevue, Washington',
    period: 'ORIGIN',
    title: 'The starting point was curiosity.',
    copy: 'Before systems meant servers, it meant wanting to understand why things worked—and staying with a problem long enough to make progress.',
    note: 'A competitive streak, a Pacific Northwest home base, and the first version of a work ethic that would matter more than a straight path.',
    metric: '47.6101° N',
    metricLabel: 'FIRST COORDINATE',
    tags: ['Newport HS', 'Bellevue', 'Foundation'],
    system: 'A single core comes online.',
    signal: 'CURIOSITY',
    color: '#e1b44a',
  },
  {
    step: '02',
    short: 'UCSC',
    place: 'University of California, Santa Cruz',
    location: 'Santa Cruz, California',
    period: 'FIRST STOP',
    title: 'UCSC made the route real.',
    copy: 'It was the first university chapter: a place to build fundamentals, test ambition, and realize the destination could change without invalidating the work already done.',
    note: 'The transfer was not an erasure. UCSC is part of the story because it is where momentum became intentional.',
    metric: 'REROUTE',
    metricLabel: 'NOT A RESTART',
    tags: ['Computer Science', 'Foundations', 'Transfer path'],
    system: 'More cores. A wider view.',
    signal: 'MOMENTUM',
    color: '#55c4b7',
  },
  {
    step: '03',
    short: 'GEORGIA TECH',
    place: 'Georgia Institute of Technology',
    location: 'Atlanta, Georgia',
    period: 'ACTIVE · MAY 2027',
    title: 'Then came the harder environment.',
    copy: 'Georgia Tech became the next deliberate step: deeper computer science, a bigger technical arena, and the chance to connect algorithms with the machines that execute them.',
    note: 'B.S. Computer Science. Graduating May 2027. The transfer is evidence of persistence—not a disclaimer attached to the degree.',
    metric: 'MAY 2027',
    metricLabel: 'EXPECTED GRADUATION',
    tags: ['Systems', 'Machine Learning', 'Computer Architecture'],
    system: 'The CPU meets the interconnect.',
    signal: 'DEPTH',
    color: '#e1b44a',
  },
  {
    step: '04',
    short: 'LENOVO',
    place: 'Lenovo',
    location: 'Morrisville, North Carolina',
    period: 'SUMMER 2024',
    title: 'The problem moved between GPUs.',
    copy: 'At Lenovo, performance stopped being abstract. NCCL bottlenecks, NVLink and PCIe conflicts, InfiniBand latency, Linux routing, and distributed failures all lived on the same critical path.',
    note: 'Partnered with NVIDIA CUDA engineers, designed cluster diagnostics, and automated the checks that made repeated testing faster.',
    metric: '20% ↓',
    metricLabel: 'RECURRING FAILURES',
    secondaryMetric: '40% faster manual testing',
    tags: ['CUDA', 'NCCL', 'NVLink', 'PCIe', 'InfiniBand'],
    system: 'The GPU fabric lights up.',
    signal: 'THROUGHPUT',
    color: '#8b7df0',
  },
  {
    step: '05',
    short: 'HKUST',
    place: 'Hong Kong University of Science and Technology',
    location: 'Guangzhou, China',
    period: 'SUMMER 2025',
    title: 'AI was only as good as its pipeline.',
    copy: 'Clinical machine learning shifted the focus from moving tensors quickly to protecting the integrity of every record that shaped the model.',
    note: 'Built Python pipelines for more than 1,000 patient records, improved ETL latency, and parallelized validation across 256 drug combinations.',
    metric: '0.79 R²',
    metricLabel: 'VALIDATION SCORE',
    secondaryMetric: '99% data integrity',
    tags: ['Python', 'PyTorch', 'Scikit-learn', 'SQL', 'Clinical ML'],
    system: 'Compute becomes inference.',
    signal: 'INTELLIGENCE',
    color: '#e36e8d',
  },
  {
    step: '06',
    short: 'CISCO',
    place: 'Cisco',
    location: 'San Jose, California',
    period: 'MAY 2026 — PRESENT',
    title: 'Now the whole server is the system.',
    copy: 'Cisco brings the layers together: UCS platforms, CPU and memory behavior, NUMA topology, NVMe, PCIe, Kubernetes GPU workloads, and the telemetry needed to see where performance is being lost.',
    note: 'The work is not “CPU or GPU.” It is understanding the path between them—and making every bottleneck observable.',
    metric: 'UCS',
    metricLabel: 'SYSTEM UNDER TEST',
    secondaryMetric: 'CPU → NUMA → PCIe → GPU',
    tags: ['Cisco UCS', 'Linux', 'Kubernetes', 'Intel MLC', 'perf', 'CUDA'],
    system: 'The complete system is online.',
    signal: 'OBSERVABILITY',
    color: '#5ba9ff',
  },
]

const projects = [
  {
    index: '01',
    name: 'Linux Performance Profiler',
    type: 'SYSTEMS / PERFORMANCE',
    copy: 'A repeatable benchmark lab for memory, storage, and process latency—built to replace “it feels slow” with evidence.',
    result: 'p50/p95 reports · 30+ runs · regression flags',
    stack: ['C', 'Python', 'Bash', 'Linux', 'Intel MLC'],
    visual: 'trace',
  },
  {
    index: '02',
    name: 'The Dining Council',
    type: 'BACKEND / PRODUCT',
    copy: 'A multiplayer restaurant-decision system with ranked choices, live rooms, and the backend coordination to end group indecision.',
    result: '10+ endpoints · Redis state · concurrent lobbies',
    stack: ['FastAPI', 'Redis', 'Docker', 'React'],
    visual: 'network',
  },
  {
    index: '03',
    name: 'Personalized Medicine Pipeline',
    type: 'APPLIED AI',
    copy: 'Treatment-outcome modeling designed around sparse clinical data, careful imputation, and preprocessing that can be trusted.',
    result: '99% integrity · low-latency inference',
    stack: ['PyTorch', 'Python', 'SQL', 'ML Pipelines'],
    visual: 'model',
  },
]

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></> : <><path d="M4 12h16" /><path d="m15 7 5 5-5 5" /></>}
    </svg>
  )
}

function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.unobserve(element)
        }
      },
      { threshold: 0.14 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>
}

function ComputeVisual({ active }) {
  const chapter = chapters[active]
  const routePoints = [
    [72, 502],
    [166, 442],
    [266, 350],
    [354, 260],
    [454, 176],
    [552, 96],
  ]
  const [packetX, packetY] = routePoints[active]
  const progress = active * 20

  return (
    <div
      className="compute-visual"
      data-stage={active}
      style={{ '--stage-color': chapter.color, '--route-progress': progress }}
      aria-label={`Visual phase: ${chapter.system}`}
    >
      <div className="visual-head">
        <span>COMPUTE ROUTE</span>
        <span>{String(active + 1).padStart(2, '0')} / 06</span>
      </div>

      <svg className="compute-board" viewBox="0 0 640 600" role="img" aria-label="A CPU connecting to a GPU as Tony's journey progresses">
        <defs>
          <linearGradient id="activeRoute" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#e1b44a" />
            <stop offset="0.52" stopColor={chapter.color} />
            <stop offset="1" stopColor="#5ba9ff" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="board-grid">
          {Array.from({ length: 12 }, (_, index) => <path key={`v-${index}`} d={`M${30 + index * 53} 30V560`} />)}
          {Array.from({ length: 11 }, (_, index) => <path key={`h-${index}`} d={`M30 ${30 + index * 53}H610`} />)}
        </g>

        <g className="chip cpu-chip">
          <rect x="52" y="68" width="188" height="188" rx="18" />
          <rect className="chip-inner" x="69" y="85" width="154" height="154" rx="10" />
          {[
            [86, 102], [145, 102], [86, 161], [145, 161],
          ].map(([x, y], index) => <rect key={index} className={`core core-${index + 1}`} x={x} y={y} width="51" height="51" rx="6" />)}
          <text x="82" y="285">CPU / FOUNDATION</text>
        </g>

        <g className="bus-lines">
          {[108, 132, 156, 180, 204, 228].map((y, index) => (
            <path key={y} className={`bus bus-${index + 1}`} d={`M240 ${y} C 294 ${y}, 330 ${y + (index - 2.5) * 7}, 400 ${y}`} />
          ))}
          <circle className="bus-packet bus-packet-a" cx="291" cy="151" r="4" />
          <circle className="bus-packet bus-packet-b" cx="355" cy="190" r="3" />
          <text x="281" y="244">PCIe / NVLINK</text>
        </g>

        <g className="chip gpu-chip">
          <rect x="400" y="52" width="188" height="220" rx="18" />
          <rect className="chip-inner" x="417" y="69" width="154" height="186" rx="10" />
          {Array.from({ length: 24 }, (_, index) => {
            const column = index % 6
            const row = Math.floor(index / 6)
            return <rect key={index} className="gpu-core" x={431 + column * 21} y={84 + row * 37} width="13" height="25" rx="3" />
          })}
          <text x="430" y="300">GPU / PARALLELISM</text>
        </g>

        <g className="journey-route">
          <path className="route-base" d="M72 502 C112 482 140 462 166 442 S235 378 266 350 S324 290 354 260 S423 201 454 176 S516 116 552 96" pathLength="100" />
          <path
            className="route-active"
            d="M72 502 C112 482 140 462 166 442 S235 378 266 350 S324 290 354 260 S423 201 454 176 S516 116 552 96"
            pathLength="100"
            style={{ strokeDasharray: 100, strokeDashoffset: 100 - progress }}
          />
          {routePoints.map(([x, y], index) => (
            <g key={chapters[index].short} className={`route-stop ${index <= active ? 'passed' : ''}`}>
              <circle cx={x} cy={y} r="7" />
              <text x={x + 13} y={y + 4}>{chapters[index].short}</text>
            </g>
          ))}
          <g className="route-packet" style={{ transform: `translate(${packetX}px, ${packetY}px)` }} filter="url(#softGlow)">
            <circle r="10" />
            <circle className="packet-center" r="3" />
          </g>
        </g>
      </svg>

      <div className="visual-caption" key={chapter.short}>
        <div>
          <span>CURRENT SIGNAL</span>
          <strong>{chapter.signal}</strong>
        </div>
        <p>{chapter.system}</p>
      </div>
    </div>
  )
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual ${type}`} aria-hidden="true">
      {type === 'trace' && <>
        <span className="trace-grid" />
        <i className="trace-line one" /><i className="trace-line two" />
        <b>p95</b>
      </>}
      {type === 'network' && <>
        <i className="net-node a" /><i className="net-node b" /><i className="net-node c" />
        <span className="net-line ab" /><span className="net-line bc" /><span className="net-line ac" />
      </>}
      {type === 'model' && <>
        <span className="model-layer l1"><i /><i /><i /></span>
        <span className="model-layer l2"><i /><i /></span>
        <span className="model-layer l3"><i /></span>
        <b>0.79</b>
      </>}
    </div>
  )
}

function App() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let frame
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(height > 0 ? window.scrollY / height : 0)
      frame = undefined
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const elements = [...document.querySelectorAll('.journey-chapter')]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(Number(entry.target.dataset.chapter))
        })
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const active = chapters[activeChapter]

  return (
    <div className="site" style={{ '--journey-accent': active.color }}>
      <div className="scroll-progress" aria-hidden="true"><i style={{ transform: `scaleX(${scrollProgress})` }} /></div>

      <header className="site-header">
        <a className="name-mark" href="#top" aria-label="Tony Wang home">
          <span>TW</span>
          <b>Tony Wang</b>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#journey">Journey</a>
          <a href="#thread">Systems</a>
          <a href="#projects">Projects</a>
          <a href="#outside">Outside</a>
        </nav>
        <a className="header-link" href="/tony-wang-resume.pdf" target="_blank" rel="noreferrer">
          Resume <Arrow diagonal />
        </a>
      </header>

      <main>
        <section className="opening" id="top">
          <div className="opening-orbit orbit-one" />
          <div className="opening-orbit orbit-two" />
          <div className="opening-copy">
            <Reveal className="opening-kicker">
              <span>TONY WANG</span>
              <i />
              <span>GEORGIA TECH CS · MAY 2027</span>
            </Reveal>
            <Reveal as="h1">
              I build where software meets the <em>machine.</em>
            </Reveal>
            <Reveal as="p" className="opening-lede">
              A non-linear journey from Bellevue to Georgia Tech—and toward the systems that move data between CPUs, GPUs, models, and people.
            </Reveal>
            <Reveal className="opening-actions">
              <a className="primary-action" href="#journey">Follow the route <Arrow /></a>
              <a href="mailto:wangtzero@gmail.com">wangtzero@gmail.com</a>
            </Reveal>
          </div>

          <div className="opening-system" aria-hidden="true">
            <div className="opening-chip cpu"><span>CPU</span>{Array.from({ length: 4 }, (_, index) => <i key={index} />)}</div>
            <div className="opening-bus"><i /><i /><i /><b /></div>
            <div className="opening-chip gpu"><span>GPU</span>{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
          </div>

          <a className="scroll-cue" href="#journey"><span>SCROLL TO TRACE</span><i /></a>
        </section>

        <section className="journey" id="journey">
          <div className="section-intro">
            <span className="section-label">01 / THE ROUTE</span>
            <Reveal as="h2">Every stop changed the scale of the system.</Reveal>
            <Reveal as="p">The path was not straight. It was cumulative.</Reveal>
          </div>

          <div className="journey-layout">
            <div className="chapters">
              {chapters.map((chapter, index) => (
                <article
                  key={chapter.short}
                  className={`journey-chapter ${activeChapter === index ? 'is-active' : ''}`}
                  data-chapter={index}
                >
                  <div className="chapter-line"><i /><span>{chapter.step}</span></div>
                  <div className="chapter-body">
                    <div className="chapter-meta">
                      <span>{chapter.period}</span>
                      <span>{chapter.location}</span>
                    </div>
                    <p className="chapter-place">{chapter.place}</p>
                    <h3>{chapter.title}</h3>
                    <p className="chapter-copy">{chapter.copy}</p>
                    <p className="chapter-note">{chapter.note}</p>
                    <div className="chapter-result">
                      <div><strong>{chapter.metric}</strong><span>{chapter.metricLabel}</span></div>
                      {chapter.secondaryMetric && <p>{chapter.secondaryMetric}</p>}
                    </div>
                    <div className="chapter-tags">{chapter.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="visual-sticky">
              <ComputeVisual active={activeChapter} />
            </aside>
          </div>
        </section>

        <section className="thread" id="thread">
          <div className="thread-heading">
            <span className="section-label">02 / THE THREAD</span>
            <Reveal as="h2">The route changed.<br />The question didn’t.</Reveal>
            <Reveal as="p">Where is the system losing signal—and how do we make it visible, reliable, and useful?</Reveal>
          </div>

          <Reveal className="system-path">
            {[
              ['CPU', 'C · C++ · Linux'],
              ['MEMORY', 'NUMA · NVMe'],
              ['FABRIC', 'PCIe · NVLink · NCCL'],
              ['GPU', 'CUDA · Kubernetes'],
              ['INTELLIGENCE', 'PyTorch · FastAPI'],
            ].map(([name, detail], index) => (
              <div key={name} className="system-node">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i>{index === 0 ? '×86' : index === 4 ? 'AI' : '↔'}</i>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </Reveal>

          <div className="principles">
            <Reveal className="principle">
              <span>MEASURE</span>
              <h3>Evidence before instinct.</h3>
              <p>Profilers, telemetry, controlled tests, and reproducibility turn performance into something a team can reason about.</p>
            </Reveal>
            <Reveal className="principle">
              <span>CONNECT</span>
              <h3>Cross the layer boundary.</h3>
              <p>Hardware topology, runtime behavior, backend design, and product experience are parts of one system—not separate interests.</p>
            </Reveal>
            <Reveal className="principle">
              <span>SHIP</span>
              <h3>Make depth useful.</h3>
              <p>The goal is not technical trivia. It is a faster cluster, a safer pipeline, or a product that helps someone decide.</p>
            </Reveal>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="projects-heading">
            <span className="section-label">03 / SELECTED BUILDS</span>
            <Reveal as="h2">Three ways of asking how a system behaves.</Reveal>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <Reveal as="article" className="project-row" key={project.name}>
                <div className="project-index">{project.index}</div>
                <div className="project-copy">
                  <span>{project.type}</span>
                  <h3>{project.name}</h3>
                  <p>{project.copy}</p>
                  <strong>{project.result}</strong>
                  <div>{project.stack.map((item) => <i key={item}>{item}</i>)}</div>
                </div>
                <ProjectVisual type={project.visual} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="outside" id="outside">
          <div className="outside-copy">
            <span className="section-label">04 / OUTSIDE THE TERMINAL</span>
            <Reveal as="h2">Pressure test.<br />Then reset.</Reveal>
            <Reveal as="p">Competitive games sharpen the feedback loop. Swimming quiets it down. Both make patience visible.</Reveal>
          </div>
          <div className="outside-details">
            <Reveal className="game-profile">
              <span>COMPETITIVE LOOP</span>
              <div className="primary-rank"><strong>TOP 800</strong><p>Valorant peak</p></div>
              <div className="rank-line"><span>MARVEL RIVALS</span><b>GRANDMASTER</b></div>
              <div className="rank-line"><span>OVERWATCH</span><b>MASTER</b></div>
              <div className="rank-line"><span>RAINBOW SIX</span><b>DIAMOND</b></div>
              <p className="game-note">Observe → isolate → adapt → execute → review.</p>
            </Reveal>
            <Reveal className="reset-profile">
              <span>RESET LOOP</span>
              <div className="water-lines" aria-hidden="true"><i /><i /><i /><i /></div>
              <h3>Swimming</h3>
              <p>Repetition without noise. Technique, breath, endurance, and the discipline to keep the next lap clean.</p>
              <div className="favorite"><span>FAVORITE GAME</span><b>Path of Exile</b><small>Because deep systems are fun even off the clock.</small></div>
            </Reveal>
          </div>
        </section>

        <footer className="footer">
          <div>
            <span className="section-label">THE NEXT STOP</span>
            <h2>Let’s build something that has to work.</h2>
          </div>
          <div className="footer-links">
            <a href="mailto:wangtzero@gmail.com">Email <Arrow diagonal /></a>
            <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          </div>
          <div className="footer-bottom"><span>TONY WANG · 2026</span><span>BELLEVUE → SANTA CRUZ → ATLANTA → THE SYSTEM</span></div>
        </footer>
      </main>
    </div>
  )
}

export default App
