import { useEffect, useRef, useState } from 'react'

const experience = [
  {
    company: 'Cisco',
    role: 'Software Engineer Intern',
    date: 'May 2026 — Present',
    location: 'San Jose, CA',
    detail: 'UCS server performance validation across CPU, memory, NUMA, NVMe, PCIe, and Kubernetes GPU workloads, focused on profiling bottlenecks in modern AI infrastructure.',
    signal: 'Cisco UCS · Linux · CUDA',
    link: 'https://www.cisco.com/',
    image: '/images/companies/SJM-L-SJWCISCO-01.webp',
    accent: '#1ba0d7',
    highlights: ['Server performance', 'Kubernetes GPU testing', 'NUMA / NVMe validation'],
  },
  {
    company: 'HKUST',
    role: 'Machine Learning Engineer Intern',
    date: 'Jun 2025 — Aug 2025',
    location: 'Guangzhou, China',
    detail: 'Clinical ML pipelines for 1,000+ patient records with 99% data integrity and a 0.79 R² validation score.',
    signal: 'Python · PyTorch · SQL',
    link: 'https://hkust-gz.edu.cn/',
    image: '/images/companies/contact-us01.jpg',
    accent: '#9966cc',
  },
  {
    company: 'Lenovo',
    role: 'Systems Software Engineer Intern',
    date: 'Jun 2024 — Aug 2024',
    location: 'Morrisville, NC',
    detail: 'NCCL, NVLink, PCIe, and InfiniBand diagnostics that reduced recurring distributed failures by 20%.',
    signal: 'CUDA · NCCL · NVLink',
    link: 'https://www.lenovo.com/',
    image: '/images/companies/120524_Lenovo_Center_Sunset_Aerial_DJI_0843_64fe14fb-2890-4584-b6af-bf9851827966.jpg',
    accent: '#e2231a',
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
    image: '/images/timeline/downtown-tianjin-at-night-879130764-c9e4506f1b6241b7aa41fbdc74c16637.jpg',
    color: '#dcaa39',
  },
  {
    year: '2005 — 2012',
    short: 'BEIJING',
    place: 'Beijing, China',
    title: 'Grew Up in Beijing',
    detail: 'The city where I spent my early childhood and built the first version of home.',
    illustration: 'beijing',
    image: '/images/timeline/22c46ab3-city-3286-164709113b2.jpg',
    color: '#d9823b',
  },
  {
    year: '2012',
    short: 'FOLSOM',
    place: 'Folsom, California',
    title: 'Moved to Folsom',
    detail: 'A new country, a new school system, and the first major reset.',
    illustration: 'folsom',
    image: '/images/timeline/folsom.jpg',
    color: '#5ab7a9',
  },
  {
    year: '2014',
    short: 'EL DORADO',
    place: 'El Dorado Hills, California',
    title: 'Moved to El Dorado Hills',
    detail: 'Another move within California and another environment to learn quickly.',
    illustration: 'eldorado',
    image: '/images/timeline/EDH.avif',
    color: '#75a95c',
  },
  {
    year: '2018',
    short: 'BELLEVUE',
    place: 'Bellevue, Washington',
    title: 'Moved to Bellevue',
    detail: 'The Pacific Northwest became home.',
    illustration: 'bellevue',
    image: '/images/timeline/Bellevue.jpg',
    color: '#4ba4c8',
  },
  {
    year: '2019 — 2023',
    short: 'NEWPORT',
    place: 'Bellevue, Washington',
    title: 'Newport High School',
    detail: 'Four years in Bellevue before the university chapter began.',
    illustration: 'newport',
    image: '/images/timeline/2019-newport.jpg',
    color: '#5b90dd',
  },
  {
    year: '2023 — 2025',
    short: 'UCSC',
    place: 'Santa Cruz, California',
    title: 'UC Santa Cruz',
    detail: 'Studied computer engineering and earned a 3.91 GPA before transferring.',
    stat: '3.91 GPA',
    illustration: 'ucsc',
    image: '/images/timeline/UCSC.avif',
    color: '#d46e8b',
  },
  {
    year: '2025 — PRESENT',
    short: 'GEORGIA TECH',
    place: 'Atlanta, Georgia',
    title: 'Georgia Tech',
    detail: 'B.S. Computer Science, two-time Dean’s List. Expected graduation: May 2027.',
    stat: '2× DEAN’S LIST',
    illustration: 'gatech',
    image: '/images/timeline/georgiatech.jpg',
    color: '#dcaa39',
  },
]

const projects = [
  {
    number: '01',
    name: 'InferProf: LLM Inference Profiler',
    area: 'AI Infrastructure / Performance',
    detail: 'A Linux-first LLM benchmark framework for profiling adapters, concurrency, retries, warmups, SSE parsing, and inference telemetry.',
    result: '95% Bootstrap Intervals · 26 Tests · 84% Coverage',
    stack: ['Python', 'C++17', 'FastAPI', 'Docker', 'Linux'],
  },
  {
    number: '02',
    name: 'The Dining Council',
    area: 'Backend / AI Product',
    detail: 'A multi-user restaurant recommendation system with FastAPI/Redis sessions, Gemini ranking, Google Maps search, and shared lobbies.',
    result: '10+ Endpoints · Top 3 from 50 Candidates · 10 Lobbies',
    stack: ['FastAPI', 'Redis', 'Docker', 'Streamlit', 'Gemini'],
  },
  {
    number: '03',
    name: 'Personal Website',
    area: 'Frontend / Product',
    detail: 'A responsive React/Vite portfolio with custom CSS, interactive timelines, technical project narratives, and recruiter-facing polish.',
    result: 'Live on Vercel · GitHub · Codex Workflow',
    stack: ['React', 'Vite', 'Vercel', 'Codex', 'CSS'],
  },
]

const competitiveGames = [
  {
    id: 'valorant',
    game: 'Valorant',
    rank: 'TOP 800',
    descriptor: 'PEAK LEADERBOARD PLACEMENT',
    percentile: 'Approx. top 0.1% of ranked players',
    traits: ['Precision', 'Composure', 'VOD review'],
    accent: '#ff6d70',
    image: '/images/gaming/Valorant-Logo.png',
    fit: 'contain',
  },
  {
    id: 'rivals',
    game: 'Marvel Rivals',
    rank: 'GRANDMASTER',
    descriptor: 'HIGH-TIER COMPETITIVE RANK',
    percentile: 'Approx. top 1% of ranked players',
    traits: ['Adaptation', 'Teamfights', 'Resource timing'],
    accent: '#bb7cff',
    image: '/images/gaming/marvel-rivals-1ywtf.png',
  },
  {
    id: 'overwatch',
    game: 'Overwatch',
    rank: 'MASTER',
    descriptor: 'ADVANCED COMPETITIVE RANK',
    percentile: 'Approx. top 5% of ranked players',
    traits: ['Positioning', 'Cooldown tracking', 'Role discipline'],
    accent: '#f2a44a',
    image: '/images/gaming/overwatch.jpg',
  },
  {
    id: 'siege',
    game: 'Rainbow Six Siege',
    rank: 'DIAMOND',
    descriptor: 'ELITE TACTICAL RANK',
    percentile: 'Approx. top 3% of ranked players',
    traits: ['Map knowledge', 'Information', 'Execution'],
    accent: '#63b4ff',
    image: '/images/gaming/Y8S3_HeavyMettle_Thumbnail.avif',
    tone: 'dark',
  },
  {
    id: 'cs2',
    game: 'CSGO / CS2',
    rank: 'FACEIT LVL 8',
    descriptor: 'TACTICAL FPS PEAK',
    percentile: 'Approx. top 15% of FACEIT players.',
    traits: ['Crosshair discipline', 'Utility', 'Clutch focus'],
    accent: '#d9a345',
    image: '/images/gaming/cs2_2_185ff37d2f.avif',
    tone: 'dark',
  },
  {
    id: 'league',
    game: 'League of Legends',
    rank: 'EMERALD',
    descriptor: 'HIGH COMPETITIVE TIER',
    percentile: 'Approx. top 10% of ranked players',
    traits: ['Macro', 'Economy', 'Matchup planning'],
    accent: '#59c9a6',
    image: '/images/gaming/league.jpg',
  },
  {
    id: 'poe',
    game: 'Path of Exile',
    rank: 'FAVORITE',
    descriptor: 'SYSTEMS-DRIVEN ARPG',
    percentile: 'I like crafting; it is my favorite game.',
    traits: ['Crafting', 'Buildcraft', 'Optimization'],
    accent: '#d9ae55',
    image: '/images/gaming/path-of-exile-2-art.webp',
    tone: 'dark',
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

function PlaceIllustration({ type, label, image }) {
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => setImageFailed(false), [image])

  if (image && !imageFailed) {
    return (
      <figure className={`place-illustration ${type} has-photo`}>
        <img src={image} alt={`${label} timeline location`} loading="lazy" onError={() => setImageFailed(true)} />
        <figcaption>{label}</figcaption>
      </figure>
    )
  }

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
    [230, 610],
    [390, 540],
    [548, 462],
    [710, 384],
    [870, 300],
    [1048, 210],
    [1248, 118],
  ]
  const [x, y] = points[active]
  const progress = active * (100 / (lifeStops.length - 1))
  const activeStop = lifeStops[active]
  const path = 'M94 654 C145 640 184 626 230 610 S337 562 390 540 S492 490 548 462 S653 410 710 384 S814 330 870 300 S986 242 1048 210 S1176 145 1248 118'

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

function NetworkBackdrop() {
  const nodes = [
    [72, 245],
    [214, 180],
    [392, 255],
    [585, 156],
    [760, 286],
    [940, 184],
    [1115, 122],
    [1280, 244],
  ]
  const path = 'M72 245 C112 120 176 112 214 180 S316 344 392 255 S500 86 585 156 S682 352 760 286 S850 138 940 184 S1030 245 1115 122 S1210 98 1280 244'

  return (
    <div className="network-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1340 430" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tcpLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcaa39" />
            <stop offset="0.52" stopColor="#5ab7a9" />
            <stop offset="1" stopColor="#5b90dd" />
          </linearGradient>
          <filter id="packetGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g className="tcp-grid">
          {Array.from({ length: 9 }, (_, index) => <path key={`h${index}`} d={`M0 ${index * 54}H1340`} />)}
          {Array.from({ length: 17 }, (_, index) => <path key={`v${index}`} d={`M${index * 84} 0V430`} />)}
        </g>
        <path className="tcp-path base" d={path} />
        <path className="tcp-path active" d={path} />
        {nodes.map(([x, y], index) => (
          <g className="tcp-node" key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="8" />
            {index % 2 === 0 && <circle cx={x} cy={y} r="15" />}
          </g>
        ))}
        <g className="packet-trail">
          <circle r="5"><animateMotion dur="7.2s" repeatCount="indefinite" path={path} begin="-1.8s" /></circle>
          <circle r="4"><animateMotion dur="7.2s" repeatCount="indefinite" path={path} begin="-3.6s" /></circle>
          <circle r="3"><animateMotion dur="7.2s" repeatCount="indefinite" path={path} begin="-5.4s" /></circle>
        </g>
        <g className="tcp-packet" filter="url(#packetGlow)">
          <animateMotion dur="7.2s" repeatCount="indefinite" path={path} rotate="auto" />
          <rect x="-28" y="-16" width="56" height="32" rx="9" />
          <path d="M-15 -5h30M-15 5h20" />
          <text x="0" y="4">TCP</text>
        </g>
      </svg>
    </div>
  )
}

function AIServerBackdrop() {
  const traces = [
    'M92 128 C220 70 330 172 468 118 S742 88 858 162 S1050 276 1255 154',
    'M72 318 C210 258 292 350 440 292 S658 232 798 306 S1030 392 1266 286',
    'M140 438 C300 404 388 474 548 420 S760 332 928 404 S1116 476 1290 376',
  ]

  return (
    <div className="ai-server-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="serverLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcaa39" />
            <stop offset="0.48" stopColor="#5ab7a9" />
            <stop offset="1" stopColor="#5b90dd" />
          </linearGradient>
          <filter id="serverGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="server-grid">
          {Array.from({ length: 18 }, (_, index) => <path key={`v${index}`} d={`M${index * 88} 0V720`} />)}
          {Array.from({ length: 10 }, (_, index) => <path key={`h${index}`} d={`M0 ${index * 80}H1440`} />)}
        </g>

        <g className="server-traces">
          {traces.map((trace, index) => (
            <g key={trace}>
              <path className="trace-base" d={trace} />
              <path className="trace-active" d={trace} style={{ animationDelay: `${index * -1.6}s` }} />
              <circle r="6" filter="url(#serverGlow)">
                <animateMotion dur={`${7 + index}s`} repeatCount="indefinite" path={trace} begin={`${index * -1.4}s`} />
              </circle>
            </g>
          ))}
        </g>

        <g className="server-rack rack-left">
          <rect x="70" y="150" width="235" height="390" rx="26" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(96 ${184 + row * 78})`}>
              <rect width="183" height="50" rx="12" />
              <circle cx="22" cy="25" r="6" />
              <path d="M48 18h94M48 32h118" />
              <rect x="148" y="16" width="18" height="18" rx="4" />
            </g>
          ))}
        </g>

        <g className="server-rack rack-right">
          <rect x="1110" y="92" width="260" height="458" rx="28" />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row} transform={`translate(1138 ${126 + row * 78})`}>
              <rect width="204" height="50" rx="12" />
              <circle cx="25" cy="25" r="6" />
              <path d="M54 18h106M54 32h132" />
              <rect x="171" y="15" width="20" height="20" rx="5" />
            </g>
          ))}
        </g>

        <g className="gpu-cluster" transform="translate(515 202)">
          <rect x="0" y="0" width="405" height="260" rx="32" />
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <g key={index} transform={`translate(${34 + (index % 3) * 123} ${38 + Math.floor(index / 3) * 102})`}>
              <rect width="88" height="68" rx="14" />
              <rect x="20" y="15" width="48" height="38" rx="8" />
              <path d="M-13 19h13M-13 49h13M88 19h13M88 49h13" />
            </g>
          ))}
          <circle cx="202" cy="130" r="42" />
          <path d="M202 88v84M160 130h84M172 100l60 60M232 100l-60 60" />
        </g>
      </svg>
    </div>
  )
}

function CompanyVisual({ item, compact = false }) {
  const initials = item.company
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)

  return (
    <div className={`company-visual ${compact ? 'is-compact' : ''}`} style={{ '--company-accent': item.accent }}>
      <div className="company-placeholder">
        <span>{item.location}</span>
        <b>{initials}</b>
      </div>
      {item.image && (
        <img
          src={item.image}
          alt={`${item.company} visual`}
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      )}
    </div>
  )
}

function CpuBackdrop() {
  return (
    <div className="cpu-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="chipTrace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcaa39" />
            <stop offset="0.5" stopColor="#5ab7a9" />
            <stop offset="1" stopColor="#5b90dd" />
          </linearGradient>
        </defs>
        <g className="cpu-traces">
          <path d="M85 170H340C405 170 412 255 472 255H608" />
          <path d="M140 610H386C438 610 436 510 492 510H608" />
          <path d="M1095 160H862C800 160 806 255 730 255H592" />
          <path d="M1044 602H840C780 602 788 510 720 510H592" />
          <path d="M600 82V222" />
          <path d="M600 538V696" />
        </g>
        <g className="cpu-chip">
          <rect x="442" y="230" width="316" height="300" rx="36" />
          <rect x="488" y="276" width="224" height="208" rx="24" />
          {Array.from({ length: 9 }, (_, index) => <path key={`top-${index}`} d={`M${474 + index * 32} 230V190`} />)}
          {Array.from({ length: 9 }, (_, index) => <path key={`bottom-${index}`} d={`M${474 + index * 32} 530V570`} />)}
          {Array.from({ length: 7 }, (_, index) => <path key={`left-${index}`} d={`M442 ${266 + index * 36}H402`} />)}
          {Array.from({ length: 7 }, (_, index) => <path key={`right-${index}`} d={`M758 ${266 + index * 36}H798`} />)}
          {Array.from({ length: 16 }, (_, index) => (
            <rect key={index} x={520 + (index % 4) * 43} y={306 + Math.floor(index / 4) * 39} width="24" height="20" rx="5" />
          ))}
        </g>
        <g className="cpu-pulses">
          <circle r="6">
            <animateMotion dur="8s" repeatCount="indefinite" path="M85 170H340C405 170 412 255 472 255H608" />
          </circle>
          <circle r="5">
            <animateMotion dur="9s" repeatCount="indefinite" path="M1044 602H840C780 602 788 510 720 510H592" begin="-3s" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

function ResumeView() {
  const currentRole = experience[0]
  const previousRoles = experience.slice(1)

  return (
    <section className="resume-view" id="resume">
      <div className="profile-overview">
        <div className="profile-heading">
          <div>
            <span className="resume-label">PROFILE / 2026</span>
            <h1>Tony Wang</h1>
            <p>Georgia Tech CS, SWE, Systems, AI infrastructure, Performance Engineering.</p>
          </div>
          <div className="profile-actions">
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
            <div className="current-feature">
              <div className="current-copy">
                <div className="current-company">
                  <div>
                    <div className="company-heading-line">
                      <h2>{currentRole.company}</h2>
                    </div>
                    <div className="current-role-line">
                      <p>{currentRole.role}</p>
                      <span className="current-date-inline">{currentRole.date}</span>
                    </div>
                  </div>
                </div>
                <p className="panel-detail">{currentRole.detail}</p>
                <div className="experience-highlights">
                  {currentRole.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                </div>
              </div>
              <div className="current-media">
                <a className="current-media-link" href={currentRole.link} target="_blank" rel="noreferrer" aria-label={`Visit ${currentRole.company} website`}>
                  <CompanyVisual item={currentRole} />
                </a>
              </div>
            </div>
            <div className="role-footer"><span>{currentRole.signal}</span><span>{currentRole.location}</span></div>
          </article>

          <section className="education-panel profile-panel">
            <div className="panel-label"><span>EDUCATION</span><span>2023 — 2027</span></div>
            <article>
              <div className="school-logo"><img src="/images/school-logos/93b7c6c62e83b8c219fcb0f851951703.webp" alt="Georgia Tech logo" /></div>
              <div>
                <span>2025 — PRESENT</span>
                <h3>Georgia Tech</h3>
                <p>B.S. Computer Science · May 2027</p>
                <strong>Info + Networks</strong>
                <strong>2× Dean’s List</strong>
              </div>
            </article>
            <article>
              <div className="school-logo"><img src="/images/school-logos/The_University_of_California_1868_UCSC.svg.png" alt="UC Santa Cruz logo" /></div>
              <div>
                <span>2023 — 2025</span>
                <h3>UC Santa Cruz</h3>
                <p>B.E Computer Engineering · Transferred to Georgia Tech</p>
                <strong>3.91 GPA</strong>
              </div>
            </article>
          </section>

          <section className="previous-panel profile-panel">
            <div className="panel-label"><span>PREVIOUS EXPERIENCE</span><span>02 ROLES</span></div>
            {previousRoles.map((item) => (
              <a className="experience-card" key={item.company} href={item.link} target="_blank" rel="noreferrer">
                <CompanyVisual item={item} compact />
                <div>
                  <div><h3>{item.company}</h3><span>{item.date}</span></div>
                  <p>{item.role}</p>
                  <small>{item.detail}</small>
                  <b>{item.signal}</b>
                </div>
              </a>
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

        <a className="resume-next" href="#projects"><span>SELECTED PROJECTS</span><Arrow /></a>
      </div>
    </section>
  )
}

function Story({ active, setActive }) {
  const selectStop = (event, index) => {
    event.preventDefault()
    setActive(index)
    document.getElementById(`stop-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    const elements = [...document.querySelectorAll('.left-timeline-slot')]
    let frame

    const updateActiveStop = () => {
      const viewportCenter = window.innerHeight * 0.5
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height * 0.5
        const distance = Math.abs(elementCenter - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = Number(element.closest('.life-stop')?.dataset.stop ?? index)
        }
      })

      setActive(closestIndex)
      frame = undefined
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveStop)
    }

    updateActiveStop()
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    return () => {
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('scroll', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [setActive])

  return (
    <section className="story" id="story" style={{ '--story-accent': lifeStops[active].color }}>
      <div className="story-heading-centered">
        <span className="section-label">PERSONAL TIMELINE</span>
        <Reveal as="h2">My Timeline</Reveal>
      </div>

      <div className="left-timeline-board" aria-label="Personal timeline">
        {lifeStops.map((stop, index) => (
          <article
            id={`stop-${index}`}
            key={`${stop.year}-${stop.short}`}
            className={`life-stop left-timeline-row timeline-${stop.illustration} ${active === index ? 'is-active' : ''}`}
            data-stop={index}
          >
            <div className="left-timeline-slot">
              <a
                href={`#stop-${index}`}
                onClick={(event) => selectStop(event, index)}
                onFocus={() => setActive(index)}
                className={`timeline-node ${active === index ? 'is-active' : ''}`}
                aria-label={`${stop.year}: ${stop.title}`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{stop.year}</b>
                <em>{stop.short}</em>
              </a>
            </div>

            <div className="left-timeline-card">
              <div className="life-content">
                <div className="life-copy">
                  <div className="life-year"><span>{stop.year}</span><i /></div>
                  <p>{stop.place}</p>
                  <h3>{stop.title}</h3>
                  <div className="life-detail"><span>{stop.detail}</span>{stop.stat && <strong>{stop.stat}</strong>}</div>
                </div>
                <PlaceIllustration type={stop.illustration} label={stop.short} image={stop.image} />
              </div>
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
        <Reveal as="h2">Technical Work</Reveal>
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

function BlogPreview() {
  return (
    <section className="blog-preview" id="blog">
      <div className="blog-preview-inner">
        <span className="section-label">BLOG</span>
        <Reveal as="h2">Coming Soon</Reveal>
        <p>Short technical notes, build logs, and things I am learning will live here.</p>
      </div>
    </section>
  )
}

const activityImages = {
  pickleball: {
    src: '/images/sports/pickleball.jpg',
    alt: 'Outdoor pickleball courts',
  },
  swimming: {
    src: '/images/gaming/swimming.jpg',
    alt: 'Competition swimming pool lanes',
  },
  basketball: {
    src: '/images/sports/basketball.jpg',
    alt: 'Basketball on a court',
  },
  gym: {
    src: '/images/sports/gym.jpg',
    alt: 'Free-weight area in a gym',
  },
}

function ActivityVisual({ type }) {
  const activity = activityImages[type]

  return (
    <div className="taste-image">
      <img src={activity.src} alt={activity.alt} loading="lazy" />
    </div>
  )
}

function GamingProfile() {
  const [selectedId, setSelectedId] = useState(competitiveGames[0].id)
  const selected = competitiveGames.find((game) => game.id === selectedId)

  return (
    <section className="gaming" id="outside" style={{ '--game-accent': selected.accent }}>
      <div className="gaming-heading">
        <span className="section-label">OUTSIDE WORK / PERSONAL PROFILE</span>
        <Reveal as="h2">My Hobbies</Reveal>
      </div>

      <div className="gaming-console">
        <div className="gaming-console-heading">
          <span>GAMING PROFILE</span>
          <p>Games I play and love.</p>
        </div>
        <nav className="game-selector" aria-label="Select a competitive game">
          {competitiveGames.map((game) => (
            <button
              key={game.id}
              className={selectedId === game.id ? 'is-active' : ''}
              onClick={() => setSelectedId(game.id)}
              aria-pressed={selectedId === game.id}
            >
              <img className={`game-thumb ${game.fit === 'contain' ? 'is-contain' : ''} ${game.tone === 'dark' ? 'is-dark' : ''}`} src={game.image} alt="" aria-hidden="true" />
              <div><b>{game.game}</b><small>{game.rank}</small></div>
              <i />
            </button>
          ))}
        </nav>

        <article className="rank-readout" key={selected.id}>
          <div className={`rank-image ${selected.fit === 'contain' ? 'is-contain' : ''} ${selected.tone === 'dark' ? 'is-dark' : ''}`}>
            <img src={selected.image} alt={`${selected.game} promotional artwork`} />
            <span>{selected.game}</span>
          </div>
          <div className="rank-copy">
            <span>{selected.game} / {selected.descriptor}</span>
            <strong>{selected.rank}</strong>
            <p className="rank-percentile">{selected.percentile}</p>
            <div className="rank-traits">{selected.traits.map((trait) => <i key={trait}>{trait}</i>)}</div>
          </div>
        </article>

        <aside className="competitive-proof">
          <div className="proof-head"><span>GRIT / THE PROCESS</span><i /></div>
          <strong>What Gaming Taught Me.</strong>
          <ol>
            {[
              'Grit',
              'Patience',
              'Consistency',
              'Self Criticism',
              'Deliberate practice',
              'Composure',
              'Fast adaptation',
              'Never tilt',
            ].map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><b>{step}</b></li>
            ))}
          </ol>
        </aside>
      </div>

      <div className="off-meta" aria-label="Life outside gaming">
        <Reveal as="article" className="taste-card pickleball-card">
          <div className="taste-label"><span>RECENT OBSESSION</span><b>PICKLEBALL</b></div>
          <ActivityVisual type="pickleball" />
        </Reveal>

        <Reveal as="article" className="taste-card swim-card">
          <div className="taste-label"><span>PHYSICAL RESET</span><b>SWIMMING</b></div>
          <ActivityVisual type="swimming" />
        </Reveal>

        <Reveal as="article" className="taste-card basketball-card">
          <div className="taste-label"><span>TEAM SPORT</span><b>BASKETBALL</b></div>
          <ActivityVisual type="basketball" />
        </Reveal>

        <Reveal as="article" className="taste-card gym-card">
          <div className="taste-label"><span>STRENGTH / ROUTINE</span><b>GYM</b></div>
          <ActivityVisual type="gym" />
        </Reveal>
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
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
          <a href="#story">Timeline</a>
          <a href="#outside">Outside</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <ResumeView />
        <Projects />
        <BlogPreview />
        <Story active={activeStop} setActive={setActiveStop} />
        <GamingProfile />

        <footer className="footer" id="contact">
          <div>
            <span className="section-label">CONTACT</span>
            <h2>Tony (Yicong) Wang</h2>
            <p>Georgia Tech CS, SWE, Systems, AI infrastructure, Performance Engineering.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:wangtzero@gmail.com">Email <Arrow diagonal /></a>
            <a href="https://github.com/tonyw1213" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            <a href="https://www.linkedin.com/in/tony-wang-66667b242/" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          </div>
          <div className="footer-bottom"><span>TONY (YICONG) WANG · 2026</span><span>ATLANTA, GA / BELLEVUE, WA</span></div>
        </footer>
      </main>
    </div>
  )
}

export default App
