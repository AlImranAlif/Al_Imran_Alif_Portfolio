import Link from "next/link";
import { ArrowUp } from "./icons";
import { site } from "@/data/site";
export function Footer() {
  return (
    <footer className="site-footer shell">
      <div>
        <Link className="brand-mark" href="/" aria-label="Al Imran Alif home">
          AA<span>.</span>
        </Link>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/#projects">Projects</Link>
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <Link href="/#contact">Contact</Link>
        <a href="#top">
          Back to top <ArrowUp size={13} aria-hidden="true" />
        </a>
      </nav>
    </footer>
  );
}