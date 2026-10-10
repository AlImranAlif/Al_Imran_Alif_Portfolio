export type TimelineEntry = {
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "Research" | "Education";
};
export const experience: TimelineEntry[] = [
  {
    period: "Aug 2026 — present",
    title: "Student Researcher",
    organization: "ELITE Research Lab LLC",
    description:
      "Exploring machine learning, deep learning, medical AI, bio-sustainability, and bioinformatics.",
    type: "Research",
  },
  {
    period: "Jan 2023 — Dec 2026 (expected)",
    title: "B.Sc. in Computer Science & Engineering",
    organization: "American International University-Bangladesh",
    description:
      "Building a foundation in data structures, algorithms, object-oriented programming, database design, software engineering, design patterns, and system design.",
    type: "Education",
  },
];
export const certifications = [
  {
    title: "CS Fundamentals · Batch 7",
    issuer: "Phitron",
    date: "Mar–Sep 2025",
    description:
      "C, C++, data structures, and algorithms through structured problem-solving practice.",
  },
  {
    title: "AI Essentials",
    issuer: "Grameenphone Academy",
    date: null,
    description:
      "AI workflows and agents, generative AI and prompt engineering, online safety fundamentals, and personal branding in the AI era.",
  },
];