import { research } from "@/data/research";
export function ResultsChart() {
  return (
    <figure className="results-chart">
      <figcaption>
        <span className="section-label">EXPERIMENT / DETECTION RESULTS</span>
        <strong>Measured in simulation.</strong>
      </figcaption>
      <div
        role="img"
        aria-label="Synthetic-data results: accuracy 96.5 percent, recall 98.65 percent, F1 score 0.893. All bars use a zero-to-one normalized scale."
      >
        {research.metrics.map((metric) => (
          <div className="chart-row" key={metric.label}>
            <div>
              <span>{metric.label}</span>
              <strong className="mono">{metric.display}</strong>
            </div>
            <div className="chart-track">
              <span style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
        <div className="chart-axis mono">
          <span>0.0</span>
          <span>0.5</span>
          <span>1.0</span>
        </div>
      </div>
      <p className="chart-note">
        Shared 0–1 scale. Accuracy and recall are shown as percentages; F1 is a
        unitless score. Synthetic data only.
      </p>
    </figure>
  );
}