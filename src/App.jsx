import { useEffect, useRef, useState } from 'react'

const experience = [
  {
    company: 'Cisco',
    role: 'Software Engineer Intern',
    date: 'May 2026 — Present',
    location: 'San Jose, CA',
    detail: 'UCS server performance across CPU, memory, NUMA, NVMe, PCIe, and Kubernetes GPU workloads.',
    signal: 'Cisco UCS · Linux · CUDA',
  },
  {
    company: 'HKUST',
    role: 'Machine Learning Engineer Intern',
    date: 'Jun 2025 — Aug 2025',
    location: 'Guangzhou, China',
    detail: 'Clinical ML pipelines for 1,000+ patient records with 99% data integrity and a 0.79 R² validation score.',
    signal: 'Python · PyTorch · SQL',
  },
  {
    company: 'Lenovo',
    role: 'Systems Software Engineer Intern',
    date: 'Jun 2024 — Aug 2024',
    location: 'Morrisville, NC',
    detail: 'NCCL, NVLink, PCIe, and InfiniBand diagnostics that reduced recurring distributed failures by 20%.',
    signal: 'CUDA · NCCL · NVLink',
  },
]

const lifeStops = [
  {
    year: '2004',
    short: 'TIANJIN',
    place: 'Tianjin, China',
    title: 'Born in Tianjin',
    detail: 'The first point on the route.',
    color: '#dcaa39',
  },
  {
    year: '2012',
    short: 'FOLSOM',
    place: 'Folsom, California',
    title: 'Moved to Folsom',
    detail: 'A new country, a new school system, and the first major reset.',
    color: '#5ab7a9',
  },
  {
    year: '2014',
    short: 'EL DORADO',
    place: 'El Dorado Hills, California',
    title: 'Moved to El Dorado Hills',
    detail: 'Another move within California and another environment to learn quickly.',
    color: '#75a95c',
  },
  {
    year: '2018',
    short: 'SEATTLE',
    place: 'Seattle area, Washington',
    title: 'Moved to Seattle',
    detail: 'The Pacific Northwest became home.',
    color: '#4ba4c8',
  },
  {
    year: '2019 — 2023',
    short: 'NEWPORT',
    place: 'Bellevue, Washington',
    title: 'Newport High School',
    detail: 'Four years in Bellevue before the university chapter began.',
    color: '#5b90dd',
  },
  {
    year: '2023 — 2025',
    short: 'UCSC',
    place: 'Santa Cruz, California',
    title: 'UC Santa Cruz',
    detail: 'Studied computer science and earned a 3.91 GPA before transferring.',
    stat: '3.91 GPA',
    color: '#d46e8b',
  },
  {
    year: '2025 — PRESENT',
    short: 'GEORGIA TECH',
    place: 'Atlanta, Georgia',
    title: 'Georgia Tech Computer Science',
    detail: 'B.S. Computer Science, two-time Dean’s List. Expected graduation: May 2027.',
    stat: '2× DEAN’S LIST',
    color: '#dcaa39',
  },
]

const projects = [
  {
    number: '01',
    name: 'Linux Performance Profiler',
    area: 'Systems / Performance',
    detail: 'C microbenchmarks and Python reporting for memory, storage, and process latency across repeated Linux benchmark runs.',
    result: 'p50/p95 reports · 30+ runs · regression detection',
    stack: ['C', 'Python', 'Bash', 'Linux', 'Intel MLC'],
  },
  {
    number: '02',
    name: 'The Dining Council',
    area: 'Backend / Product',
    detail: 'A multiplayer restaurant recommendation system with ranked choices, live rooms, and persistent session state.',
    result: '10+ REST endpoints · Redis · concurrent lobbies',
    stack: ['FastAPI', 'Redis', 'Docker', 'React'],
  },
  {
    number: '03',
    name: 'Personalized Medicine AI Pipeline',
    area: 'Applied AI',
    detail: 'Treatment-outcome modeling for sparse clinical data with imputation, preprocessing, and low-latency inference.',
    result: '99% data integrity · clinical ML workflow',
    stack: ['PyTorch', 'Python', 'SQL', 'Scikit-learn'],
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
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>
}

function ComputeRoute({ active = lifeStops.length - 1, ambient = false }) {
  const points = [
    [94, 654],
    [270, 584],
    [438, 508],
    [608, 418],
    [786, 335],
    [984, 232],
    [1248, 118],
  ]
  const [x, y] = points[active]
  const progress = active * (100 / (lifeStops.length - 1))
  const activeStop = lifeStops[active]
  const path = 'M94 654 C156 630 220 608 270 584 S386 532 438 508 S556 446 608 418 S725 362 786 335 S925 263 984 232 S1170 150 1248 118'

  return (
    <div className={`compute-route ${ambient ? 'is-ambient' : ''}`} style={{ '--route-color': activeStop.color }} aria-hidden="true">
      <svg viewBox="0 0 1440 780" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={ambient ? 'heroRoute' : 'storyRoute'} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#dcaa39" />
            <stop offset="0.5" stopColor={activeStop.color} />
            <stop offset="1" stopColor="#5b90dd" />
          </linearGradient>
          <filter id={ambient ? 'heroGlow' : 'storyGlow'} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="route-grid">
          {Array.from({ length: 18 }, (_, index) => <path key={`v${index}`} d={`M${index * 88} 0V780`} />)}
          {Array.from({ length: 11 }, (_, index) => <path key={`h${index}`} d={`M0 ${index * 78}H1440`} />)}
        </g>

        <g className="background-cpu">
          <rect x="26" y="520" width="225" height="225" rx="24" />
          <rect x="49" y="543" width="179" height="179" rx="14" />
          {[0, 1, 2, 3].map((index) => <rect key={index} x={70 + (index % 2) * 72} y={563 + Math.floor(index / 2) * 72} width="55" height="55" rx="8" />)}
          <text x="50" y="505">CPU / ORIGIN</text>
        </g>

        <g className="background-gpu">
          <rect x="1190" y="38" width="220" height="235" rx="24" />
          <rect x="1213" y="61" width="174" height="189" rx="14" />
          {Array.from({ length: 24 }, (_, index) => (
            <rect key={index} x={1228 + (index % 6) * 24} y={78 + Math.floor(index / 6) * 41} width="15" height="29" rx="3" />
          ))}
          <text x="1220" y="300">GPU / PARALLELISM</text>
        </g>

        <path className="compute-path base" d={path} pathLength="100" />
        <path
          className="compute-path active"
          d={path}
          pathLength="100"
          style={{ stroke: `url(#${ambient ? 'heroRoute' : 'storyRoute'})`, strokeDasharray: 100, strokeDashoffset: ambient ? 0 : 100 - progress }}
        />

        {points.map(([pointX, pointY], index) => (
          <g key={lifeStops[index].short} className={`compute-stop ${index <= active ? 'is-passed' : ''}`}>
            <circle cx={pointX} cy={pointY} r="8" />
            <text x={pointX + 15} y={pointY - 13}>{lifeStops[index].year}</text>
            <text className="stop-place" x={pointX + 15} y={pointY + 4}>{lifeStops[index].short}</text>
          </g>
        ))}

        {ambient ? (
          <circle className="ambient-packet" r="10" filter="url(#heroGlow)">
            <animateMotion dur="7s" repeatCount="indefinite" path={path} />
          </circle>
        ) : (
          <g className="active-packet" style={{ transform: `translate(${x}px, ${y}px)` }} filter="url(#storyGlow)">
            <circle r="12" />
            <circle className="packet-core" r="4" />
          </g>
        )}
      </svg>
    </div>
  )
}

function ResumeView() {
  return (
    <section className="resume-view" id="resume">
      <ComputeRoute ambient />
      <div className="resume-sheet">
        <div className="resume-title">
          <div>
            <span className="resume-label">RESUME / 2026</span>
            <h1>Tony Wang</h1>
            <p>Georgia Tech Computer Science · Systems, AI, Performance, Backend</p>
          </div>
          <div className="resume-contact">
            <a href="mailto:wangtzero@gmail.com">wangtzero@gmail.com</a>
            <span>Atlanta, GA · Bellevue, WA</span>
            <div>
              <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
              <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            </div>
          </div>
        </div>

        <div className="resume-body">
          <div className="resume-experience">
            <div className="resume-section-head"><span>EXPERIENCE</span><span>03 ROLES</span></div>
            {experience.map((item) => (
              <article key={item.company}>
                <div className="role-heading">
                  <div><h2>{item.company}</h2><p>{item.role}</p></div>
                  <div><span>{item.date}</span><small>{item.location}</small></div>
                </div>
                <p className="role-detail">{item.detail}</p>
                <span className="role-signal">{item.signal}</span>
              </article>
            ))}
          </div>

          <aside className="resume-sidebar">
            <section>
              <div className="resume-section-head"><span>EDUCATION</span></div>
              <div className="education-item">
                <span>2025 — PRESENT</span>
                <h3>Georgia Institute of Technology</h3>
                <p>B.S. Computer Science · May 2027</p>
                <strong>2× Dean’s List</strong>
              </div>
              <div className="education-item">
                <span>2023 — 2025</span>
                <h3>UC Santa Cruz</h3>
                <p>Computer Science</p>
                <strong>3.91 GPA</strong>
              </div>
            </section>

            <section className="skills-compact">
              <div className="resume-section-head"><span>TECHNICAL FOCUS</span></div>
              <div><b>Systems</b><p>Linux, C/C++, Bash, Docker, Kubernetes</p></div>
              <div><b>AI / Data</b><p>Python, PyTorch, TensorFlow, SQL, Scikit-learn</p></div>
              <div><b>Performance</b><p>CUDA, NCCL, NVLink, PCIe, NUMA, profiling</p></div>
              <div><b>Backend</b><p>FastAPI, Redis, React, GCP, REST APIs</p></div>
            </section>

            <a className="resume-download" href="/tony-wang-resume.pdf" target="_blank" rel="noreferrer">
              Open full PDF <Arrow diagonal />
            </a>
          </aside>
        </div>

        <a className="resume-next" href="#story"><span>PERSONAL TIMELINE</span><Arrow /></a>
      </div>
    </section>
  )
}

function Story({ active, setActive }) {
  useEffect(() => {
    const elements = [...document.querySelectorAll('.life-stop')]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.stop))
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [setActive])

  return (
    <section className="story" id="story" style={{ '--story-accent': lifeStops[active].color }}>
      <div className="story-heading">
        <span className="section-label">PERSONAL TIMELINE</span>
        <Reveal as="h2">Tianjin to Georgia Tech.</Reveal>
        <Reveal as="p">Seven stops from 2004 to the present.</Reveal>
      </div>

      <div className="story-route-background"><ComputeRoute active={active} /></div>

      <nav className="story-index" aria-label="Personal timeline">
        {lifeStops.map((stop, index) => (
          <a key={stop.year} href={`#stop-${index}`} className={active === index ? 'is-active' : ''} aria-label={`${stop.year}: ${stop.title}`}>
            <i /><span>{stop.year.split(' ')[0]}</span>
          </a>
        ))}
      </nav>

      <div className="life-stops">
        {lifeStops.map((stop, index) => (
          <article
            id={`stop-${index}`}
            key={`${stop.year}-${stop.short}`}
            className={`life-stop ${active === index ? 'is-active' : ''}`}
            data-stop={index}
          >
            <div className="life-content">
              <div className="life-year"><span>{stop.year}</span><i /></div>
              <p>{stop.place}</p>
              <h3>{stop.title}</h3>
              <div className="life-detail"><span>{stop.detail}</span>{stop.stat && <strong>{stop.stat}</strong>}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-heading">
        <span className="section-label">SELECTED PROJECTS</span>
        <Reveal as="h2">Technical work</Reveal>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <Reveal as="article" className="project-row" key={project.name}>
            <span className="project-number">{project.number}</span>
            <div className="project-main">
              <span>{project.area}</span>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
            </div>
            <div className="project-meta">
              <strong>{project.result}</strong>
              <div>{project.stack.map((item) => <i key={item}>{item}</i>)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [activeStop, setActiveStop] = useState(0)
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

  return (
    <div className="site">
      <div className="scroll-progress" aria-hidden="true"><i style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <header className="site-header">
        <a className="name-mark" href="#resume"><span>TW</span><b>Tony Wang</b></a>
        <nav aria-label="Primary navigation">
          <a href="#resume">Resume</a>
          <a href="#story">Timeline</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="/tony-wang-resume.pdf" target="_blank" rel="noreferrer">PDF <Arrow diagonal /></a>
      </header>

      <main>
        <ResumeView />
        <Story active={activeStop} setActive={setActiveStop} />
        <Projects />

        <section className="personal-strip">
          <span className="section-label">OUTSIDE WORK</span>
          <Reveal as="p">Competitive gaming: Valorant top 800, Marvel Rivals Grandmaster, Overwatch Master, Rainbow Six Diamond. Swimming for the reset.</Reveal>
        </section>

        <footer className="footer" id="contact">
          <div>
            <span className="section-label">CONTACT</span>
            <h2>Tony Wang</h2>
            <p>Georgia Tech CS · Systems, AI, performance, and backend engineering.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:wangtzero@gmail.com">Email <Arrow diagonal /></a>
            <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          </div>
          <div className="footer-bottom"><span>TONY WANG · 2026</span><span>ATLANTA, GA / BELLEVUE, WA</span></div>
        </footer>
      </main>
    </div>
  )
}

export default App
