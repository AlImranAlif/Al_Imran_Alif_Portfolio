import { Github, Linkedin, Mail } from "./icons";
import { site } from "@/data/site";
export function SocialLinks({ labels = false }: { labels?: boolean }) {
  const links = [
    { label: "GitHub", href: site.github, Icon: Github },
    { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  ];
  return (
    <div className={`social-links ${labels ? "with-labels" : ""}`}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(href.startsWith("https:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <Icon size={18} aria-hidden="true" />
          {labels && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}