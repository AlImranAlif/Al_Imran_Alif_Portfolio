import { publications, research, researchInterests } from "@/data/research";
import { ArrowUpRight, FlaskConical } from "./icons";
import { SectionHeading } from "./section-heading";
import { ResultsChart } from "./results-chart";
export function ResearchSection() {
  return (
    <section id="research" className="section shell">
      <SectionHeading
        number="03"
        label="research"
        title="Ideas, tested carefully."
      >
        Small experiments. Explicit methods. Honest limits.
      </SectionHeading>
      <div className="research-role">
        <FlaskConical size={19} aria-hidden="true" />
        <div>
          <strong>Student Researcher · ELITE Research Lab LLC</strong>
          <p>Aug 2026 — present</p>
        </div>
      </div>
      <article className="research-paper">
        <header className="paper-header">
          <p className="section-label">
            RESEARCH NOTE / 001{" "}
            <span className="paper-status">SYNTHETIC DATA</span>
          </p>
          <h3>{research.title}</h3>
          <p>{research.subtitle}</p>
          <div className="tags">
            <span>1,000 readings</span>
            <span>20 simulated batches</span>
            <span>4 shipment stages</span>
          </div>
        </header>
        <div className="paper-columns">
          <div className="paper-text">
            <section>
              <h4>Abstract</h4>
              <p>{research.abstract}</p>
            </section>
            <section>
              <h4>Method</h4>
              <ol>
                {research.method.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
            <section>
              <h4>Reproducibility</h4>
              <p>{research.reproducibility}</p>
            </section>
          </div>
          <div>
            <ResultsChart />
            <section className="integrity-note">
              <h4>Record integrity</h4>
              <p>{research.integrity}</p>
            </section>
            <div className="tags">
              {research.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
        <section className="limitations">
          <h4>Limitations</h4>
          <p>{research.limitations}</p>
        </section>
        <div className="paper-footer">
          <span className="mono">EXPERIMENT CODE & METHODS</span>
          <a
            className="text-link"
            href={research.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </article>
      <div className="interest-row">
        <h3>Questions I’m interested in</h3>
        <div className="tags">
          {researchInterests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </div>
      {publications.length > 0 && (
        <section className="publications">
          <h3>Publications / Preprints</h3>
          {publications.map((item) => (
            <article key={item.url}>
              <p className="mono">
                {item.status} · {item.year} · {item.venue}
              </p>
              <h4>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h4>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}