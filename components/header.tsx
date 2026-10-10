"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navigation, site } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ArrowUpRight } from "./icons";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`${site.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            AA
          </span>
          
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-cv" href={site.cv} download>
            CV <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            ref={toggle}
            type="button"
            className="icon-button menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav
        className="mobile-nav shell"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </header>
  );
}