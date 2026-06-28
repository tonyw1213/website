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
    illustration: 'tianjin',
    color: '#dcaa39',
  },
  {
    year: '2012',
    short: 'FOLSOM',
    place: 'Folsom, California',
    title: 'Moved to Folsom',
    detail: 'A new country, a new school system, and the first major reset.',
    illustration: 'folsom',
    color: '#5ab7a9',
  },
  {
    year: '2014',
    short: 'EL DORADO',
    place: 'El Dorado Hills, California',
    title: 'Moved to El Dorado Hills',
    detail: 'Another move within California and another environment to learn quickly.',
    illustration: 'eldorado',
    color: '#75a95c',
  },
  {
    year: '2018',
    short: 'BELLEVUE',
    place: 'Bellevue, Washington',
    title: 'Moved to Bellevue',
    detail: 'The Pacific Northwest became home.',
    illustration: 'bellevue',
    color: '#4ba4c8',
  },
  {
    year: '2019 — 2023',
    short: 'NEWPORT',
    place: 'Bellevue, Washington',
    title: 'Newport High School',
    detail: 'Four years in Bellevue before the university chapter began.',
    illustration: 'newport',
    color: '#5b90dd',
  },
  {
    year: '2023 — 2025',
    short: 'UCSC',
    place: 'Santa Cruz, California',
    title: 'UC Santa Cruz',
    detail: 'Studied computer science and earned a 3.91 GPA before transferring.',
    stat: '3.91 GPA',
    illustration: 'ucsc',
    color: '#d46e8b',
  },
  {
    year: '2025 — PRESENT',
    short: 'GEORGIA TECH',
    place: 'Atlanta, Georgia',
    title: 'Georgia Tech Computer Science',
    detail: 'B.S. Computer Science, two-time Dean’s List. Expected graduation: May 2027.',
    stat: '2× DEAN’S LIST',
    illustration: 'gatech',
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

function PlaceIllustration({ type, label }) {
  return (
    <figure className={`place-illustration ${type}`}>
      <svg viewBox="0 0 320 220" role="img" aria-label={`${label} line illustration`}>
        {type === 'tianjin' && <>
          <circle className="sun" cx="242" cy="48" r="19" />
          <circle className="landmark" cx="89" cy="102" r="53" />
          <circle cx="89" cy="102" r="7" />
          {[0, 45, 90, 135].map((angle) => <path key={angle} d="M89 49V155M36 102H142M52 65l74 74M126 65l-74 74" transform={`rotate(${angle} 89 102)`} />)}
          <path d="M89 155v35M65 190h48M150 181h139M161 181v-48h24v48M194 181V98h31v83M233 181v-65h19v65M261 181v-93h20v93" />
        </>}
        {type === 'folsom' && <>
          <circle className="sun" cx="257" cy="44" r="20" />
          <path d="M20 118c35-37 62-43 91-14 26-33 60-38 91-4 22-20 52-22 99 10" />
          <path className="water" d="M16 174c36-14 56 13 91 0s55 13 91 0 58 13 106 0M18 191c28-9 48 8 78 0s51 8 82 0 53 8 111 0" />
          <path className="landmark" d="M49 147h220M69 147c14-38 42-38 56 0M125 147c18-51 56-51 74 0M199 147c14-38 40-38 54 0M69 147V99M253 147V99" />
        </>}
        {type === 'eldorado' && <>
          <circle className="sun" cx="244" cy="55" r="24" />
          <path d="M15 154c41-61 88-62 128 0 42-77 96-79 162 0" />
          <path className="landmark" d="M45 169h230M74 169v-42l29-21 31 21v42M88 169v-27h18v27M185 169v-52l38-25 39 25v52M205 169v-32h19v32M238 126h12v16h-12" />
          <path className="detail" d="M24 185h279M35 199h242" />
        </>}
        {type === 'bellevue' && <>
          <path className="mountain" d="M9 105 68 48l37 38 37-54 72 70 36-31 61 37" />
          <circle className="sun" cx="260" cy="45" r="17" />
          <path className="landmark" d="M33 181h255M62 181v-62h31v62M101 181V83h39v98M148 181v-76h28v76M184 181V65h47v116M241 181v-53h25v53" />
          <path className="windows" d="M111 97h8v8h-8zM125 97h8v8h-8zM196 80h9v9h-9zM212 80h9v9h-9zM196 98h9v9h-9zM212 98h9v9h-9z" />
          <path className="water" d="M20 196c39-9 59 9 98 0s60 9 99 0 58 9 86 0" />
        </>}
        {type === 'newport' && <>
          <circle className="sun" cx="254" cy="48" r="18" />
          <path d="M25 177h272M48 177v-91h224v91M37 86h246L160 43 37 86Z" />
          <path className="landmark" d="M139 177v-52h42v52M68 111h31v26H68zM111 111h19v26h-19zM190 111h19v26h-19zM221 111h31v26h-31z" />
          <text x="145" y="102">NHS</text>
          <path className="detail" d="M20 194h280" />
        </>}
        {type === 'ucsc' && <>
          <circle className="sun" cx="239" cy="49" r="18" />
          <path className="tree" d="M50 188 64 42h27l14 146M62 92 32 70M89 79l35-28M180 188l12-133h25l12 133M191 105l-34-29M218 89l37-32" />
          <path d="M25 188h274M108 188v-56h69v56M122 147h40M122 160h28" />
          <path className="landmark" d="M116 126h53l-7-39h-38l-8 39ZM133 188v-21h18v21" />
          <path className="detail" d="M239 188c0-27 19-43 45-43v43M251 188v-20h20v20" />
        </>}
        {type === 'gatech' && <>
          <circle className="sun" cx="256" cy="45" r="18" />
          <path className="skyline" d="M18 178h284M34 178v-52h24v52M66 178V90h36v88M111 178v-67h24v67M225 178V78h35v100M269 178v-43h22v43" />
          <path className="landmark" d="M124 178v-62h91v62M113 116h113l-56-39-57 39ZM142 178v-44M160 178v-44M179 178v-44M197 178v-44M132 128h76" />
          <path className="network" d="M71 80 105 51l39 25M71 80l-30 26M105 51l38-25M143 76l37-23" />
          <circle cx="71" cy="80" r="4" /><circle cx="105" cy="51" r="4" /><circle cx="143" cy="76" r="4" /><circle cx="180" cy="53" r="4" />
        </>}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  )
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
  const currentRole = experience[0]
  const previousRoles = experience.slice(1)

  return (
    <section className="resume-view" id="resume">
      <ComputeRoute ambient />
      <div className="profile-overview">
        <div className="profile-heading">
          <div>
            <span className="resume-label">PROFILE / 2026</span>
            <h1>Tony Wang</h1>
            <p>Georgia Tech computer science student focused on systems, AI infrastructure, performance, and backend engineering.</p>
          </div>
          <div className="profile-actions">
            <a className="resume-download" href="/tony-wang-resume.pdf" target="_blank" rel="noreferrer">View resume PDF <Arrow diagonal /></a>
            <a href="mailto:wangtzero@gmail.com">wangtzero@gmail.com</a>
            <div>
              <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
              <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <article className="current-role profile-panel">
            <div className="panel-label"><span>CURRENT EXPERIENCE</span><i /> </div>
            <div className="current-company">
              <div><h2>{currentRole.company}</h2><p>{currentRole.role}</p></div>
              <span>{currentRole.date}</span>
            </div>
            <p className="panel-detail">{currentRole.detail}</p>
            <div className="role-footer"><span>{currentRole.signal}</span><span>{currentRole.location}</span></div>
            <div className="server-trace" aria-hidden="true"><i /><i /><i /><i /><b /></div>
          </article>

          <section className="education-panel profile-panel">
            <div className="panel-label"><span>EDUCATION</span><span>2023 — 2027</span></div>
            <article>
              <span>2025 — PRESENT</span>
              <h3>Georgia Tech</h3>
              <p>B.S. Computer Science · May 2027</p>
              <strong>2× Dean’s List</strong>
            </article>
            <article>
              <span>2023 — 2025</span>
              <h3>UC Santa Cruz</h3>
              <p>Computer Science</p>
              <strong>3.91 GPA</strong>
            </article>
          </section>

          <section className="previous-panel profile-panel">
            <div className="panel-label"><span>PREVIOUS EXPERIENCE</span><span>02 ROLES</span></div>
            {previousRoles.map((item) => (
              <article key={item.company}>
                <div><h3>{item.company}</h3><span>{item.date}</span></div>
                <p>{item.role}</p>
                <small>{item.detail}</small>
                <b>{item.signal}</b>
              </article>
            ))}
          </section>

          <section className="focus-panel profile-panel">
            <div className="panel-label"><span>TECHNICAL FOCUS</span><span>04 LAYERS</span></div>
            <div className="focus-grid">
              <div><span>01</span><b>Systems</b><p>Linux · C/C++ · Bash · Docker · Kubernetes</p></div>
              <div><span>02</span><b>AI / Data</b><p>Python · PyTorch · TensorFlow · SQL · Scikit-learn</p></div>
              <div><span>03</span><b>Performance</b><p>CUDA · NCCL · NVLink · PCIe · NUMA · profiling</p></div>
              <div><span>04</span><b>Backend</b><p>FastAPI · Redis · React · GCP · REST APIs</p></div>
            </div>
          </section>
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
              <div className="life-copy">
                <div className="life-year"><span>{stop.year}</span><i /></div>
                <p>{stop.place}</p>
                <h3>{stop.title}</h3>
                <div className="life-detail"><span>{stop.detail}</span>{stop.stat && <strong>{stop.stat}</strong>}</div>
              </div>
              <PlaceIllustration type={stop.illustration} label={stop.short} />
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
