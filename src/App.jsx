import {
  ExternalLink,
  FileText,
  Mail,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const navItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Flagship', href: '#featured' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const primaryLinks = {
  email: 'mailto:harshitsharma967@gmail.com',
  github: 'https://github.com/Posxidon',
  linkedin: 'https://www.linkedin.com/in/harshit-rakesh-sharma/',
  resume: '/resume.pdf',
};

const experience = [
  {
    role: 'Junior Programmer (Co-op)',
    company: 'Ontario Ministry of Health',
    location: 'North York, ON',
    period: 'Jan 2024 - Aug 2024',
    points: [
      'Owned end-to-end delivery of full-stack features for internal government systems including HSI and CHRIS, moving proof-of-concept modules into production systems.',
      'Designed and optimized backend APIs and healthcare data ingestion and processing workflows, improving performance by 50%.',
      'Led Azure DevOps CI pipeline development with automated testing and deployment, reducing regression time by 30%.',
      'Introduced regression and smoke testing practices across development and testing environments, reducing post-deployment issues by 25%.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'PointClickCare',
    location: 'Mississauga, ON',
    period: 'Sep 2023 - Dec 2023',
    points: [
      'Built frontend components for CRM and EHR platform interfaces, supporting data-driven views and improving UI consistency.',
      'Diagnosed and resolved production issues in backend services by debugging and implementing fixes in Java and Spring Boot, closing 15% more tickets than team average.',
      'Investigated and corrected data inconsistencies in dashboards and visualizations including charts and maps.',
      'Built automated test suites and followed a unit testing workflow, maintaining roughly 70% test coverage tracked through SonarQube.',
    ],
  },
  {
    role: 'Project Assistant',
    company: 'Paul R. MacPherson Institute at McMaster University',
    location: 'Hamilton, ON',
    period: 'Sep 2022 - Apr 2023',
    points: [
      'Built an internal Angular tool to extract and ingest data from PDFs and spreadsheets for academic workflows.',
      'Reduced manual re-entry of course outline data using pdfjs-dist and XLSX.',
      'Enabled processing across multiple data formats, improving workflow efficiency by 20%.',
      'Maintained technical documentation and onboarding resources within an agile team environment.',
    ],
  },
];

const projects = [
  {
    name: 'Hyderabad Pickleball Association Platform',
    type: 'Backend Services | Aug 2025 - Mar 2026',
    description:
      'Backend services powering a production sports platform used by 1000+ users for tournament management and event workflows.',
    highlights: [
      'Designed relational schemas for users, events, tournament registration, and platform workflows.',
      'Built REST APIs for scalable user and event management.',
      'Integrated authentication with SuperTokens for secure access to protected platform services.',
    ],
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'SuperTokens', 'REST APIs'],
    demo: 'https://www.playhpa.com/',
  },
  {
    name: 'PDF to CSV',
    type: 'Data extraction utility',
    description:
      'A utility project for turning PDF data into structured CSV output, focused on making document data easier to inspect and reuse.',
    highlights: [
      'Extracted tabular data from PDF documents into CSV format.',
      'Focused on practical data cleanup and repeatable file-processing workflows.',
    ],
    stack: ['Python', 'PDF Processing', 'CSV', 'Data Extraction'],
    github: 'https://github.com/Posxidon/pdf-to-csv',
  },
  {
    name: 'Stock Market Predictor',
    type: 'Machine learning project',
    description:
      'A Python project exploring stock-market prediction workflows using historical market data and machine learning tools.',
    highlights: [
      'Worked with financial data ingestion, feature preparation, and model evaluation.',
      'Used Python data and machine learning libraries to explore prediction accuracy.',
    ],
    stack: ['Python', 'yfinance', 'pandas', 'scikit-learn', 'Matplotlib'],
    github: 'https://github.com/Posxidon/stockmarketpredictor',
  },
];

const skillGroups = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C/C++', 'Shell'],
  },
  {
    title: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'Django', 'REST APIs'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Angular', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    title: 'Cloud',
    skills: ['Microsoft Azure', 'AWS', 'Azure App Service', 'Azure PostgreSQL'],
  },
  {
    title: 'DevOps',
    skills: ['GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'Testing & Quality',
    skills: ['JUnit', 'TestNG', 'Selenium', 'SonarQube'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'IBM DB2'],
  },
  {
    title: 'Auth & Security',
    skills: ['Okta Auth0', 'SuperTokens', 'Azure IAM', 'Access Control', 'Secure API Design'],
  },
];

const workAreas = [
  'Backend APIs & system design',
  'Data pipelines & processing',
  'Cloud deployment',
  'Testing & CI/CD workflows',
  'Full-stack apps',
];

const degreeFlowHighlights = [
  {
    title: 'Transcript Processing',
    body: 'Parsed uploaded PDF transcripts into structured academic records including courses, grades, terms, GPA, and program information.',
  },
  {
    title: 'McMaster Course Data Integration',
    body: 'Integrated McMaster Academic Calendar data to support course lookup, filtering, and planning workflows.',
  },
  {
    title: 'Planning Workflows',
    body: 'Separated transcript, course, planning, and seat-alert logic into dedicated backend services and REST APIs.',
  },
  {
    title: 'Secure Deployment',
    body: 'Used Auth0, protected backend routes, Azure App Service, and Azure PostgreSQL to support secure cloud deployment.',
  },
];

const degreeFlowStack = [
  'React',
  'Spring Boot',
  'Java',
  'PostgreSQL',
  'Azure App Service',
  'Azure PostgreSQL',
  'Auth0',
  'McMaster Academic Calendar API',
];

const degreeFlowServices = [
  {
    title: 'Transcript Processing Service',
    items: ['PDF transcript upload', 'PDF parsing', 'Course, grade, GPA, term, and program normalization'],
  },
  {
    title: 'Course Data Service',
    items: ['McMaster Academic Calendar API integration', 'Course search and filtering', 'Course metadata and requirements'],
  },
  {
    title: 'Planning Service',
    items: ['Degree progress tracking', 'Course planning workflows', 'What-if planning logic'],
  },
  {
    title: 'Seat Alert Service',
    items: ['Seat availability checks', 'Email alert workflows'],
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [typedGreeting, setTypedGreeting] = useState('');
  const [isGreetingComplete, setIsGreetingComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const motionPresets = useMemo(() => createMotionPresets(shouldReduceMotion), [shouldReduceMotion]);

  useEffect(() => {
    const greeting = 'Hi, I\u2019m Harshit.';

    if (shouldReduceMotion) {
      setTypedGreeting(greeting);
      setIsGreetingComplete(true);
      return undefined;
    }

    setTypedGreeting('');
    setIsGreetingComplete(false);

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedGreeting(greeting.slice(0, index));

      if (index >= greeting.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setIsGreetingComplete(true), 160);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const sectionIds = ['top', ...navItems.map((item) => item.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 shadow-lg shadow-black/10 backdrop-blur-xl">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#top" className="shrink-0 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Harshit Sharma
          </a>
          <a
            href="#top"
            aria-label="Harshit Sharma home"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          >
            <TridentLogo className="h-11 w-11" />
          </a>
          <div className="hidden items-center gap-4 text-xs text-slate-300 lg:flex xl:text-sm">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 transition hover:bg-white/5 hover:text-cyan-200 xl:px-3 ${
                  activeSection === item.href.slice(1) ? 'bg-cyan-300/10 text-cyan-200' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section
        id="top"
        className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-28"
      >
        <div className="absolute inset-x-6 top-16 -z-10 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="flex flex-col justify-center">
          <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block min-h-[1.15em]">
              {typedGreeting}
              {!isGreetingComplete && !shouldReduceMotion && (
                <span className="ml-1 inline-block h-[0.82em] w-[3px] translate-y-1 bg-cyan-300" />
              )}
            </span>
            <motion.span
              {...motionPresets.heroTitle}
              animate={isGreetingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              className="block"
            >
              I build reliable full-stack systems with backend depth.
            </motion.span>
          </h1>
          <motion.div {...motionPresets.heroBody}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              I&apos;m a software developer focused on backend APIs, data pipelines, and production
              reliability. I&apos;ve worked on real-world systems in healthcare and public-sector
              environments, using Java, Spring Boot, React, PostgreSQL, Azure, testing, and CI/CD.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#projects" variant="primary">
              View Projects
            </ButtonLink>
            <ButtonLink href={primaryLinks.resume} target="_blank" rel="noreferrer">
              <FileText className="h-4 w-4" />
              View Resume
            </ButtonLink>
            <ButtonLink href={primaryLinks.github} target="_blank" rel="noreferrer">
              <FaGithub className="h-4 w-4" />
              GitHub
            </ButtonLink>
            <ButtonLink href={primaryLinks.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </ButtonLink>
            </div>
          </motion.div>
        </div>

        <HeroProfile motionPresets={motionPresets} />
      </section>

      <MotionSection id="experience" className="mx-auto max-w-7xl px-5 py-16 sm:px-8" motionPresets={motionPresets}>
        <SectionHeading title="Experience" />
        <div className="mt-10 space-y-5">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[14rem_1fr]"
            >
              <p className="text-sm font-semibold text-cyan-200">{item.period}</p>
              <div>
                <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-slate-400">
                  {item.company} | {item.location}
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300 sm:text-base">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="featured" className="border-y border-white/10 bg-white/[0.03]" motionPresets={motionPresets}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-slate-950 via-slate-950/95 to-cyan-950/30 p-5 shadow-glow md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Flagship Project
                </p>
                <h2 className="mt-4 text-5xl font-bold text-white">DegreeFlow</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  A full-stack academic planning platform built under the McMaster Engineering
                  Society to help students turn transcript data, course requirements, and seat
                  availability into clearer planning workflows.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="https://github.com/Posxidon/Degree-Flow" target="_blank" rel="noreferrer">
                    <FaGithub className="h-4 w-4" />
                    Repository
                  </ButtonLink>
                  <ButtonLink href="https://degree-flow.vercel.app/" target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live Site
                  </ButtonLink>
                </div>

                <div className="mt-7 space-y-3">
                  {degreeFlowHighlights.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  System Architecture
                </p>
                <div className="mt-5 space-y-5">
                  <div className="grid gap-3 lg:flex lg:items-stretch">
                    {[
                      { label: 'User / Student' },
                      { label: 'React Frontend' },
                      { label: 'Auth0', sublabel: 'Authentication' },
                      { label: 'Spring Boot Backend' },
                    ].map((node, index, nodes) => (
                      <FragmentWithConnector key={node.label} showConnector={index < nodes.length - 1}>
                        <ArchitectureNode label={node.label} sublabel={node.sublabel} index={index + 1} />
                      </FragmentWithConnector>
                    ))}
                  </div>

                  <div className="mx-auto hidden h-8 w-px bg-gradient-to-b from-cyan-300 to-blue-500 lg:block" />

                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {degreeFlowServices.map((service) => (
                      <article key={service.title} className="rounded-2xl border border-cyan-300/15 bg-slate-950/80 p-4">
                        <h3 className="text-sm font-bold text-white">{service.title}</h3>
                        <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">
                          {service.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>

                  <div className="mx-auto hidden h-8 w-px bg-gradient-to-b from-cyan-300 to-blue-500 lg:block" />

                  <div className="grid gap-3 lg:grid-cols-3">
                    <ArchitectureLayer
                      title="McMaster Academic Calendar API"
                      body="External course and calendar data feeding course lookup, metadata, filtering, and requirements."
                    />
                    <ArchitectureLayer
                      title="Azure PostgreSQL"
                      body="Stores transcript records, courses, requirements, alerts, and user planning data in a relational schema."
                    />
                    <ArchitectureLayer
                      title="Azure Deployment"
                      body="React frontend deployed separately, Spring Boot backend on Azure App Service, PostgreSQL hosted on Azure."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {degreeFlowStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="projects" className="mx-auto max-w-7xl px-5 py-16 sm:px-8" motionPresets={motionPresets}>
        <SectionHeading title="Projects" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-glow"
            >
              <p className="text-sm font-semibold text-cyan-200">{project.type}</p>
              <h3 className="mt-3 text-2xl font-bold text-white">{project.name}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {(project.github || project.demo) && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {project.github && (
                    <ButtonLink href={project.github} target="_blank" rel="noreferrer">
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </ButtonLink>
                  )}
                  {project.demo && (
                    <ButtonLink href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {project.name === 'Hyderabad Pickleball Association Platform' ? 'Visit Platform' : 'Live Demo'}
                    </ButtonLink>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="education" className="mx-auto max-w-7xl px-5 py-16 sm:px-8" motionPresets={motionPresets}>
        <SectionHeading title="Education" />
        <article className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">McMaster University</h3>
              <p className="mt-2 text-slate-300">Hamilton, ON</p>
              <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                B.A.Sc. in Honours Computer Science, Minor in Economics
              </p>
            </div>
            <p className="text-sm font-semibold text-cyan-200">Sep 2020 - Jun 2025</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Dean&apos;s Honour List 2024-2025</Badge>
            <Badge>James and Elizabeth Roberts Bursary 2024-2025</Badge>
          </div>
        </article>
      </MotionSection>

      <MotionSection id="skills" className="border-y border-white/10 bg-white/[0.03]" motionPresets={motionPresets}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHeading title="Skills" />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <article key={group.title} className="h-full rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-8" motionPresets={motionPresets}>
        <div className="rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/12 via-white/[0.04] to-blue-500/10 p-8 shadow-glow md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Contact</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold text-white">
            Have a question, opportunity, or just want to connect?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Feel free to reach out. I&apos;m always happy to chat about software engineering,
            projects, or new ideas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={primaryLinks.email} variant="primary">
              <Mail className="h-4 w-4" />
              Email
            </ButtonLink>
            <ButtonLink href={primaryLinks.github} target="_blank" rel="noreferrer">
              <FaGithub className="h-4 w-4" />
              GitHub
            </ButtonLink>
            <ButtonLink href={primaryLinks.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={primaryLinks.resume} target="_blank" rel="noreferrer">
              <FileText className="h-4 w-4" />
              Resume
            </ButtonLink>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

function HeroProfile({ motionPresets }) {
  return (
    <motion.div {...motionPresets.heroImage} className="flex flex-col justify-center gap-5">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40">
        <img
          src="/profile.jpg"
          alt="Harshit Sharma"
          className="aspect-square w-full rounded-[1.5rem] object-cover object-[50%_28%]"
        />
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <h2 className="text-xl font-bold text-white">What I work on</h2>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300 sm:text-base">
          {workAreas.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FragmentWithConnector({ children, showConnector }) {
  return (
    <>
      {children}
      {showConnector && (
        <div className="hidden items-center lg:flex" aria-hidden="true">
          <div className="h-px w-7 bg-gradient-to-r from-cyan-300/70 to-blue-500/60" />
          <div className="-ml-1 h-2 w-2 rotate-45 border-r border-t border-blue-400/70" />
        </div>
      )}
    </>
  );
}

function ArchitectureNode({ label, sublabel, index }) {
  return (
    <div className="relative flex min-h-24 min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2 text-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
          {index}
        </span>
        <span className="min-w-0 text-wrap text-sm font-semibold leading-tight text-white">{label}</span>
        {sublabel && <span className="text-xs font-medium leading-tight text-slate-400">{sublabel}</span>}
      </div>
    </div>
  );
}

function ArchitectureLayer({ title, body }) {
  return (
    <article className="rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-950/40 to-slate-950/80 p-4">
      <h3 className="text-sm font-bold text-cyan-100">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-400">{body}</p>
    </article>
  );
}

function MotionSection({ children, className, id, motionPresets }) {
  return (
    <motion.section id={id} className={className} {...motionPresets.section}>
      {children}
    </motion.section>
  );
}

function TridentLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 128 128" role="img" aria-label="Trident logo">
      <defs>
        <linearGradient id="nav-trident-gold-cyan" x1="24" y1="14" x2="104" y2="114" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8d77c" />
          <stop offset="0.42" stopColor="#d8a93d" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="nav-trident-edge" x1="64" y1="8" x2="64" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff4bd" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="28" fill="#020617" />
      <path
        d="M64 14 75 32 68 42v38l17-17V38l-8-7 19-14 8 25-10-4v36L68 100v10h17l8-9 8 18H27l8-18 8 9h17v-10L34 74V38l-10 4 8-25 19 14-8 7v25l17 17V42l-7-10 11-18Z"
        fill="url(#nav-trident-gold-cyan)"
        stroke="url(#nav-trident-edge)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M64 32v76" stroke="#fff7cc" strokeWidth="4" strokeLinecap="round" opacity="0.48" />
    </svg>
  );
}

function createMotionPresets(shouldReduceMotion) {
  if (shouldReduceMotion) {
    return {
      heroTitle: {},
      heroBody: {},
      heroImage: {},
      section: {},
    };
  }

  return {
    heroTitle: {
      initial: { opacity: 0, y: 14 },
      transition: { duration: 0.55, ease: 'easeOut' },
    },
    heroBody: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.55, delay: 0.16, ease: 'easeOut' },
    },
    heroImage: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.65, delay: 0.18, ease: 'easeOut' },
    },
    section: {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: false, amount: 0.2 },
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  };
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">{eyebrow}</p>}
      <h2 className="max-w-3xl text-balance text-4xl font-bold text-white">{title}</h2>
    </div>
  );
}

function ButtonLink({ children, className = '', variant = 'secondary', ...props }) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200'
      : 'border border-white/15 text-white hover:border-cyan-300/60 hover:bg-white/5';

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-bold transition ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
      {children}
    </span>
  );
}

export default App;
