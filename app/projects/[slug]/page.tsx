import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Architecture } from "@/components/architecture";
import { ArrowLeft, ArrowUpRight, ArrowRight, Check } from "@/components/icons";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.overview,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Al Imran Alif`,
      description: project.overview,
      url: `/projects/${project.slug}`,
      images: ["/social-card.png"],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <div className="shell case-study">
      <Link className="back-link mono" href="/#projects">
        <ArrowLeft size={15} aria-hidden="true" />
        ALL PROJECTS
      </Link>
      <header className="case-header">
        <p className="section-label">
          P.{project.number} / {project.category}
        </p>
        <h1>{project.name}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <p className="case-overview">{project.overview}</p>
        <div className="hero-buttons">
          {project.live && (
            <a
              href={project.live}
              className="button button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.github}
            className="button button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>
      {project.screenshot && (
        <Image
          className="project-screenshot"
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={1440}
          height={900}
          sizes="(max-width: 768px) 90vw, 1100px"
        />
      )}
      <div className="case-layout">
        <div className="case-main">
          <section id="overview">
            <p className="section-label">01 / OVERVIEW & PROBLEM</p>
            <h2>The problem to solve</h2>
            <p>{project.problem}</p>
          </section>
          <section id="architecture">
            <p className="section-label">02 / ARCHITECTURE</p>
            <h2>How the pieces fit</h2>
            <p>{project.approach}</p>
            <Architecture project={project} />
          </section>
          <section id="features">
            <p className="section-label">03 / KEY FEATURES</p>
            <h2>What the system does</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
          <section id="learnings">
            <p className="section-label">04 / CHALLENGES & LEARNINGS</p>
            <h2>Engineering considerations</h2>
            <p>Design considerations reflected in this project’s workflow:</p>
            <ul className="learnings-list">
              {project.learnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </section>
          <section id="outcome">
            <p className="section-label">05 / RESULT</p>
            <h2>The outcome</h2>
            <p>{project.result}</p>
            <p className="case-caveat">
              This case study describes implemented functionality. It does not
              claim production adoption or unmeasured performance improvements.
            </p>
          </section>
        </div>
        <aside className="case-sidebar">
          <p className="section-label">PROJECT INDEX</p>
          <nav aria-label="Case study sections">
            <a href="#overview">Overview & problem</a>
            <a href="#architecture">Architecture</a>
            <a href="#features">Key features</a>
            <a href="#learnings">Challenges & learnings</a>
            <a href="#outcome">Result</a>
          </nav>
          <h3>Tech stack</h3>
          <div className="tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h3>Links</h3>
          <a
            className="text-link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <ArrowUpRight size={15} />
          </a>
          {project.live && (
            <a
              className="text-link"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ArrowUpRight size={15} />
            </a>
          )}
        </aside>
      </div>
      <div className="next-project">
        <span className="mono">NEXT CASE STUDY</span>
        <Link href={`/projects/${next.slug}`}>
          {next.name}
          <ArrowRight size={25} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}