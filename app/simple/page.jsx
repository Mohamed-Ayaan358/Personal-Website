import styles from './simple.module.css';

export const metadata = {
 title: 'Mohamed Ayaan — Software Engineer',
 description: 'Software engineer and NYU computer science graduate student. Selected projects, research, experience, and résumé.',
 alternates: { canonical: 'https://simple.mayaan.site' },
};
const github = 'https://github.com/Mohamed-Ayaan358';
const projects = [
 {name:'SysPerf', description:'A lightweight system monitor for CPU, memory usage, and battery health, built with Rust and Go.', url:`${github}/SysPerf`, topic:'Rust · Go · Systems'},
 {name:'HandRail', description:'A local application that makes websites machine-readable.', url:`${github}/HandRail`, topic:'Accessibility · Local tooling'},
 {name:'E.M.I.L.Y', description:'A personal dashboard for calendar events, objectives, recurring reminders, and webpage change monitoring.', url:'https://emily.mayaan.site', label:'Website', topic:'Full stack · Automation'},
 {name:'Orbit Lab', description:'An interactive 3D Earth with circular satellite orbits and illustrative launch animations.', url:`${github}/orbit-lab`, demo:'https://mohamed-ayaan358.github.io/orbit-lab/', topic:'3D visualization · Web'},
 {name:'Judson', description:'A Rust tool that compresses unused projects to reduce their disk footprint.', url:`${github}/Judson`, topic:'Rust · Developer tools'},
];
export default function SimplePortfolio() {
 return <div className={styles.portfolio}>
  <a className={styles.skip} href="#main">Skip to content</a>
  <div className={styles.page}>
   <header className={styles.header}>
    <img className={styles.portrait} src="/static/images/Avatar.jpeg" alt="Mohamed Ayaan" width="132" height="156"/>
    <div><p className={styles.kicker}>SOFTWARE ENGINEER · NEW YORK</p><h1>Mohamed Ayaan<span>.</span></h1><p className={styles.intro}>Computer science master’s student at NYU with an interest in <span className={styles.highlight}>accessibility technology</span>. I enjoy building <span className={styles.highlight}>integrated systems</span>, especially working on the <span className={styles.highlight}>backend</span>.</p></div>
   </header>
   <div className={styles.contactLinks}><a href="mailto:ayaanoff0@gmail.com">Email</a><a href={github}>GitHub ↗</a><a href="https://www.linkedin.com/in/mohamed-ayaan-1750311b8/">LinkedIn ↗</a><a href="/Ayaan.pdf">Résumé ↗</a></div>
   <nav className={styles.nav} aria-label="Page sections"><a href="#projects">Projects</a><a href="#research">Research</a><a href="#experience">Experience</a><a href="#education">Education</a></nav>
   <main id="main">
    <section id="projects" className={styles.section}><div className={styles.sectionHeading}><h2>Selected projects</h2><a href={`${github}?tab=repositories`}>All repositories ↗</a></div>
     <div>{projects.map(project=><article className={styles.project} key={project.name}><div className={styles.entryHeading}><h3><a href={project.url}>{project.name}</a></h3><div className={styles.entryLinks}><a href={project.url}>{project.label??'Code'} ↗</a>{project.demo&&<a href={project.demo}>Live demo ↗</a>}</div></div><p>{project.description}</p><p className={styles.meta}>{project.topic}</p></article>)}</div>
    </section>
    <section id="research" className={styles.section}><div className={styles.sectionHeading}><h2>Research &amp; publication</h2><span>2024</span></div><article className={styles.research}><p className={styles.meta}>ICBDA-2024 · BAI24-411</p><h3>Techniques used in time series databases and their internals</h3><p>A paper on the techniques and internal design of time series databases.</p><a href="/Ayaan.pdf">Listed in my résumé ↗</a></article></section>
    <section id="experience" className={styles.section}><div className={styles.sectionHeading}><h2>Experience</h2><a href="/Ayaan.pdf">Full résumé ↗</a></div>
     <article className={styles.experience}><div><h3>BrowserStack</h3><p className={styles.role}>Software Engineer · Full Stack</p><p>Built product-trial experiences for the Online Sales team. Worked with Grafana, Sentry, and accessibility testing tools.</p></div><span className={styles.date}>Oct 2024–Jul 2026</span></article>
     <article className={styles.experience}><div><h3>Samsung R&amp;D Institute Bangalore</h3><p className={styles.role}>Software R&amp;D Intern</p><p>Built tools to help business intelligence teams access data across PrestoDB, Athena, and MySQL.</p></div><span className={styles.date}>Jan–Jul 2024</span></article>
     <article className={styles.experience}><div><h3>Thinkerbell Labs</h3><p className={styles.role}>Software Intern</p><p>Worked on Annie devices for the US market and helped optimize over-the-air updates.</p></div><span className={styles.date}>Summers 2022 &amp; 2023</span></article>
     <article className={styles.experience}><div><h3>PES University</h3><p className={styles.role}>Teaching Assistant · DBMS &amp; Web Development</p><p>Supported lectures, assessments, office hours, and one-on-one project debugging.</p></div><span className={styles.date}>Jun–Sep 2023</span></article>
    </section>
    <section id="education" className={styles.section}><div className={styles.sectionHeading}><h2>Education</h2></div><div className={styles.education}><div><h3>New York University</h3><p>Master’s in Computer Science</p></div><div><h3>PES University</h3><p>B.Tech in Computer Science · 2020–2024</p><p className={styles.meta}>CGPA 9.24</p></div></div></section>
   </main>
   <footer className={styles.footer}><p>Have a question or something to build? <a href="mailto:ayaanoff0@gmail.com">Get in touch ↗</a></p><a href="https://www.mayaan.site">The interactive version ↗</a></footer>
  </div>
 </div>;
}
