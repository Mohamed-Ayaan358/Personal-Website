import BlogShell from '../../components/BlogShell';import projects from '../../data/projectsData';
export const metadata={title:'Projects — Mohamed Ayaan'};
export default function Projects(){return <BlogShell><p className="eyebrow">THE COMPLETE PROJECT COLLECTION</p><h1>Projects.</h1><p><a href="/#projects">Play the project hand ↗</a></p><div className="post-list">{projects.map((project,index)=><article key={index}><h2><a href={project.href}>{project.title} ↗</a></h2><p>{project.description}</p></article>)}</div></BlogShell>;}
