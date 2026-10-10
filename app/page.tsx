import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { ResearchSection } from "@/components/research-section";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight, GraduationCap, Code2 } from "@/components/icons";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experience, certifications } from "@/data/experience";
import { site, codingProfiles } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};
export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: getSiteUrl().href,
    image: new URL(site.portrait, getSiteUrl()).href,
    jobTitle: site.headline,
    description: site.pitch,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin, ...codingProfiles.flatMap((profile) => profile.url ? [profile.url] : [])],
    homeLocation: { "@type": "Place", name: site.location },
    affiliation: [
      { "@type": "Organization", name: "ELITE Research Lab LLC" },
      {
        "@type": "CollegeOrUniversity",
        name: "American International University-Bangladesh",
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <section id="projects" className="section shell">
        <Reveal>
          <SectionHeading
            number="01"
            label="selected work"
            title="Selected software projects."
          >
            Selected full-stack systems, from scheduling logic to explainable data matching.
          </SectionHeading>
        </Reveal>
        <div className="project-grid">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="section-endnote">
          <span className="mono">
            SOURCE CODE, DECISIONS & IMPLEMENTATION DETAILS
          </span>
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section id="about" className="section shell">
        <Reveal>
          <SectionHeading
            number="02"
            label="about"
            title="The engineer behind the code."
          />
          <div className="about-grid">
            <div className="prose">
              <p>
                I’m a Computer Science and Engineering student at AIUB, with an
                expected graduation in December 2026. I enjoy breaking a problem
                down, choosing a clear data model, and building the pieces into
                a usable system.
              </p>
              <p>
                My foundation is in data structures, algorithms, OOP, design
                patterns, and system design. In practice, that means modular
                APIs, responsive interfaces, and careful attention to how data
                moves through an application.
              </p>
              <p>
                At ELITE Research Lab LLC, I’m exploring machine learning, deep
                learning, medical AI, bio-sustainability, and bioinformatics.
                I’m interested in both the result and the evidence behind it.
              </p>
            </div>
            <aside className="quick-facts" aria-label="Quick facts">
              <div className="section-label">FIELD NOTES / QUICK FACTS</div>
              <dl>
                <div>
                  <dt>Education</dt>
                  <dd>
                    B.Sc. CSE · AIUB
                    <br />
                    <span>December 2026, expected</span>
                  </dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Dhaka, Bangladesh</dd>
                </div>
                <div>
                  <dt>Current focus</dt>
                  <dd>Full-stack systems & applied research</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd className="accent">
                    Open to internships and research collaboration
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Reveal>
        <div className="skills-block" id="skills">
          <div className="subsection-title">
            <h3>A practical toolkit</h3>
            <span className="mono">TOOLS I USE / TOPICS I STUDY</span>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <article className="skill-group" key={group.name}>
                <h4>{group.name}</h4>
                <div className="tags">
                  {group.items.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ResearchSection />
      <section id="experience" className="section shell">
        <Reveal>
          <SectionHeading
            number="04"
            label="experience & education"
            title="Learning through building."
          />
          <div className="timeline">
            {experience.map((item) => (
              <article key={item.organization}>
                <div className="timeline-date">
                  <span className="mono">{item.period}</span>
                  <span className="tag">{item.type}</span>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="timeline-org">{item.organization}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <div className="certifications">
          <div className="subsection-title">
            <h3>Certifications & training</h3>
            <GraduationCap size={21} aria-hidden="true" />
          </div>
          <div className="certification-grid">
            {certifications.map((cert) => (
              <article key={cert.title}>
                <p className="mono">
                  {cert.issuer}
                  {cert.date && ` / ${cert.date}`}
                </p>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="practice" className="section shell">
        <SectionHeading
          number="05"
          label="competitive programming"
          title="Practising the fundamentals."
        >
          Problem solving sharpens how I reason about constraints, efficiency,
          and edge cases.
        </SectionHeading>
        <div className="practice-grid">
          <article>
            <span className="mono">ALGORITHMIC PROBLEMS</span>
            <strong>
              400<span>+</span>
            </strong>
            <p>Solved across LeetCode, Codeforces, and HackerRank.</p>
          </article>
          <article>
            <Code2 size={26} aria-hidden="true" />
            <h3>Ongoing practice</h3>
            <p>CodeChef practice and online coding challenges.</p>
          </article>
          <article>
            <GraduationCap size={26} aria-hidden="true" />
            <h3>AIUB CS Fest</h3>
            <p>Participated as a competitive programmer.</p>
          </article>
        </div>
        {codingProfiles.some((profile) => profile.url) && (
          <div className="coding-links">
            {codingProfiles
              .filter((profile) => profile.url)
              .map((profile) => (
                <a
                  className="text-link"
                  key={profile.name}
                  href={profile.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.name}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
          </div>
        )}
      </section>
      <section id="contact" className="section shell contact-section">
        <SectionHeading
          number="06"
          label="contact"
          title="Let’s work on a good problem."
        />
        <div className="contact-grid">
          <div className="contact-copy">
            <p>
              Open to software engineering internships and research
              collaborations.
            </p>
            <p>
              If you have a project, an opportunity, or a research question in
              mind, I’d be glad to hear about it.
            </p>
            <a className="email-link" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <SocialLinks labels />
            <div className="contact-note mono">
              <span className="status-dot" />
              DHAKA, BANGLADESH / UTC+06:00
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
