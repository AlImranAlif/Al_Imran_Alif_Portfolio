export const taglineOptions = [
  "I build reliable systems and test ideas with data.",
  "From clear architecture to carefully tested ideas.",
  "Engineering useful software. Exploring questions through research.",
] as const;
export const site = {
  name: "Al Imran Alif",
  initials: "AA",
  headline: "Software Engineer & Research Enthusiast",
  tagline: taglineOptions[0],
  location: "Dhaka, Bangladesh",
  email: "alimranalif19@gmail.com",
  pitch:
    "CSE student at AIUB, graduating December 2026. I build modular full-stack systems and explore machine learning, medical AI, and bioinformatics as a Student Researcher at ELITE Research Lab LLC.",
  availability: "Open to internships & research collaboration",
  github: "https://github.com/AlImranAlif",
  linkedin: "https://www.linkedin.com/in/al-imran-alif-969373217/",
  cv: "/Al_Imran_Alif_CV.pdf",
  portrait: "/portrait.jpg",
} as const;
export const navigation = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;
// Profile URLs supplied by Al Imran Alif.
export const codingProfiles: { name: string; url: string | null }[] = [
  { name: "LeetCode", url: "https://leetcode.com/u/Al_Imran_Alif/" },
  { name: "Codeforces", url: "https://codeforces.com/profile/Mr.immature42" },
  { name: "CodeChef", url: "https://www.codechef.com/users/al_imran_alif" },
  { name: "HackerRank", url: "https://www.hackerrank.com/profile/alimranalif19" },
];
export const accentOptions = {
  teal: { dark: "#64d8cb", light: "#00695f" },
  cyan: { dark: "#72d8f2", light: "#07657c" },
  emerald: { dark: "#75dda9", light: "#176940" },
} as const;
