import type { Project } from "@/data/projects";
// A semantic text equivalent accompanies the requested precise SVG diagram.
export function Architecture({ project }: { project: Project }) {
  return (
    <figure className="architecture">
      <svg
        viewBox="0 0 840 174"
        role="img"
        aria-labelledby={`architecture-title-${project.slug}`}
        className="architecture-svg"
      >
        <title id={`architecture-title-${project.slug}`}>
          Conceptual architecture:{" "}
          {project.architecture.map((node) => node.label).join(" to ")}.
          Requests and responses connect the layers.
        </title>
        <defs>
          <marker
            id={`arrow-${project.slug}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        {project.architecture.map((node, index) => (
          <g key={node.label}>
            <rect x={10 + index * 285} y="24" width="250" height="118" rx="5" />
            <text x={30 + index * 285} y="52" className="diagram-step">
              0{index + 1}
            </text>
            <text x={30 + index * 285} y="79" className="diagram-title">
              {node.label}
            </text>
            <text x={30 + index * 285} y="104" className="diagram-detail">
              {node.detail}
            </text>
            {index < 2 && (
              <path
                d={`M ${263 + index * 285} 82 H ${292 + index * 285}`}
                markerEnd={`url(#arrow-${project.slug})`}
              />
            )}
          </g>
        ))}
      </svg>
      <ol className="architecture-mobile">
        {project.architecture.map((node) => (
          <li key={node.label}>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption>
        Conceptual overview from the project description; see the repository for
        implementation details.
      </figcaption>
    </figure>
  );
}