"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Storage may be disabled. */
    }
    setTheme(next);
  }
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className="sun-icon" size={18} aria-hidden="true" />
      <Moon className="moon-icon" size={18} aria-hidden="true" />
    </button>
  );
}