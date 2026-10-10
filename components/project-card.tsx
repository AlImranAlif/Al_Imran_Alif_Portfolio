import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowUpRight, ArrowRight, Code2 } from "./icons";
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-top"><p className="mono">{project.category}</p><span className="project-number">{project.number}</span></div>
      <div className="project-title-row"><Code2 size={27} aria-hidden="true"/><h3><Link href={`/projects/${project.slug}`}>{project.name}<ArrowUpRight size={21} aria-hidden="true"/></Link></h3></div>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-summary">{project.overview}</p>
      <div className="tags">{project.stack.filter(item => !["React", "Node.js"].includes(item)).slice(0, 4).map(item => <span key={item}>{item}</span>)}</div>
      <div className="project-card-footer"><span className="metric-chip">{project.metric}</span><Link href={`/projects/${project.slug}`} aria-label={`Read ${project.name} case study`}>Explore project <ArrowRight size={16} aria-hidden="true"/></Link></div>
      <div className="project-external-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true"/></a>}<a href={project.github} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={14} aria-hidden="true"/></a></div>
    </article>
  );
}
