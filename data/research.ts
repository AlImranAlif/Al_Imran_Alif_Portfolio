export type Publication = {
  title: string;
  venue: string;
  year: number;
  url: string;
  status: "Published" | "Preprint" | "Accepted";
};
export const publications: Publication[] = [];
export const researchInterests = [
  "Machine learning",
  "Deep learning",
  "Medical AI",
  "Bioinformatics",
  "Computational biology",
  "Bio-sustainability",
];
export const research = {
  title: "Cold-Chain Temperature Monitoring",
  subtitle: "Event-Driven Monitoring and Tamper-Detection Experiment",
  abstract:
    "A reproducible simulation of temperature monitoring across vaccine shipment stages. The experiment tests threshold-based excursion detection under sensor noise and uses SHA-256 hashes to check whether stored readings have been altered.",
  method: [
    "Generate 1,000 synthetic temperature readings across 20 simulated vaccine batches and four shipment stages, using fixed random seeds.",
    "Apply threshold-based excursion detection under simulated sensor noise, then simulate alerts and quarantine responses.",
    "Run separate tampering tests that alter 10, 25, and 50 records and compare their SHA-256 hashes with the reference hashes.",
  ],
  metrics: [
    { label: "Accuracy", value: 96.5, display: "96.5%" },
    { label: "Recall", value: 98.65, display: "98.65%" },
    { label: "F1 score", value: 89.3, display: "0.893" },
  ],
  integrity:
    "All altered records were detected in the separate 10-, 25-, and 50-record tampering tests.",
  reproducibility:
    "Fixed random seeds, exported CSV results, and a linked code repository support rerunning the simulation. See the repository for the experiment scripts and their requirements.",
  limitations:
    "All readings are synthetic. These results do not establish performance on real sensors, real shipments, or clinical operations. A hash mismatch detects a changed record; it does not prove that a sensor reading was correct when collected. Integrity checks also depend on keeping the reference hashes trusted.",
  stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "SHA-256"],
  github: "https://github.com/AlImranAlif/coldchain_project",
} as const;