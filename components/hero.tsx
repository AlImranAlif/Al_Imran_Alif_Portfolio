import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { ArrowRight, Download } from "./icons";
import { SocialLinks } from "./social-links";
export function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-heading">
      <div className="hero shell">
        <div className="hero-copy">
          <p className="hero-intro">CSE STUDENT · AIUB · DHAKA, BANGLADESH · GRADUATING DEC 2026</p>
          <h1 id="hero-heading">Al Imran Alif<span className="amber-period">.</span></h1>
          <p className="hero-role">Software engineer<span className="amber-period">.</span><br/>Full-stack builder.</p>
          <p className="hero-pitch">I build modular web applications, APIs, and data-driven experiments. I’m interested in practical software and carefully tested research ideas.</p>
          <div className="hero-buttons">
            <Link className="button button-primary" href="#projects">Explore projects <ArrowRight size={18} aria-hidden="true" /></Link>
            <a className="button button-secondary" href={site.cv} download><Download size={17} aria-hidden="true" /> Download CV</a>
          </div>
          <dl className="hero-stats"><div><dt>Featured systems</dt><dd>03</dd></div><div><dt>Problems solved</dt><dd>400+</dd></div><div><dt>Bangladesh</dt><dd>Dhaka</dd></div></dl>
          <div className="hero-secondary"><SocialLinks /></div>
        </div>
        <div className="hero-profile">
          <Image src="/portrait-cutout.png" alt="Al Imran Alif in a black suit and white shirt, with the background removed" width={1200} height={1281} sizes="(max-width: 700px) 95vw, 48vw" preload className="portrait" />
        </div>
      </div>
    </section>
  );
}
