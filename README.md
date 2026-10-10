# Al Imran Alif — Blue Software Engineer Portfolio

Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Zod, and Resend.

## Run locally (Windows PowerShell)

Install Node.js 24 LTS, then open the extracted project folder containing package.json:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. On macOS/Linux use `cp .env.example .env.local`.
No database is needed. The project descriptions mention databases used by those projects; this portfolio itself does not need one.

## Environment variables

| Variable | Purpose |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | Your full public origin, starting with https://; no path or trailing slash. Locally you can leave this blank. |
| RESEND_API_KEY | Server-only Resend API key. Never prefix it with NEXT_PUBLIC_. |
| CONTACT_FROM_EMAIL | Sender email on a domain verified in your Resend account. |
| CONTACT_TO_EMAIL | Recipient; defaults to alimranalif19@gmail.com. |

The site builds without email credentials. The form then displays a clear error and email alternative. To send email, verify your sending domain in Resend, set the three email variables, and redeploy. An API success means the provider accepted the request; test actual inbox delivery after deployment. Never commit .env.local.

## Check and production run

```powershell
npm run check
npm run start
```

`check` runs contact tests, a production build, and TypeScript. Start serves that production build on port 3000. Use `npm run dev` for editing.

## Update your existing GitHub repository

Use your existing Git clone, not a second `git init`. Back up local edits, then run `git pull origin main` before copying the repaired files into it. Copy the CONTENTS of this project into your repository root, so package.json sits beside app/, components/, and public/. Include the updated package-lock.json and configuration files.

Remove the old `public/Al Imran Alif .pdf` from the repository: the site uses the supplied public-safe `public/Al_Imran_Alif_CV.pdf` instead. Review public PDFs before publishing.

```powershell
git status
git add .
git commit -m "Fix portfolio build and add coding profiles"
git push -u origin main
```

If push is rejected because GitHub has newer commits, run `git pull origin main --no-rebase`, resolve any conflicts, then push again. Only add `--allow-unrelated-histories` if Git explicitly reports unrelated histories and you intend to merge the two roots. Do not force-push to solve a normal rejected push. Do not overwrite your existing .git folder.

## Deploy on Vercel manually

1. Push the repaired project to your GitHub repository.
2. In Vercel, choose Add New → Project and import AlImranAlif/Al_Imran_Alif_Portfolio.
3. Select Next.js and Node.js 24.x. Root Directory must be the directory containing package.json; leave it at repository root if you copied the contents as described above.
4. Install command: `npm ci`. Build command: `npm run build`. Leave Output Directory at its framework default. Do not enter `out` or enable static export: the contact route needs a server.
5. Add the environment variables in Project Settings. If your final URL is not known yet, deploy once; then set NEXT_PUBLIC_SITE_URL to the assigned public URL and redeploy so sitemap and social metadata use it.
6. Check home, all three project pages, the CV, /robots.txt, /sitemap.xml, social preview image, and an actual contact submission.

No special vercel.json is necessary. This archive is ready for deployment but does not deploy or connect accounts automatically.

Official references: https://nextjs.org/docs/app/getting-started/deploying and https://vercel.com/docs/frameworks/full-stack/nextjs

## Content and files

- `data/site.ts`: personal details, tagline, all four supplied coding profile URLs.
- `data/projects.ts`: projects and live/source links; optional screenshots.
- `data/research.ts`: synthetic cold-chain study and interests; empty publications remain hidden.
- `data/skills.ts`, `data/experience.ts`: skills, timeline, education, certifications.
- `app/projects/[slug]/page.tsx`: generated case studies.
- `app/api/contact/route.ts`: server email route.
- `public/portrait.jpg`: original uploaded portrait, displayed fully without cropping.
- `public/hero-background.webp`: blue grid raster background.
- `design-qa.md`: browser/design checks and known intentional deviations.
- `public/Al_Imran_Alif_CV.pdf`: previously reviewed public-safe CV, restored to match download links.
- `public/social-card.png`, `app/icon.png`: social image and favicon.

## Contact controls and limits

Zod validates both client and server input. Requests use JSON, same-origin checks, a 16 KiB body limit, a honeypot, and a best-effort five-attempt/ten-minute in-memory limiter. This limiter is not shared across server instances and resets on restart; use a shared rate-limit store if needed for sustained public traffic. User text is sent as plain text. No real emails are sent by the automated tests.

## Accessibility and launch checks

Keyboard focus, skip link, mobile menu, reduced-motion preference, persistent dark/light theme, and responsive layouts are implemented. Lighthouse scores and a full WCAG audit are not claimed. Run Lighthouse against the deployed production site and address results below your 90+ target.

## Before publishing

- [ ] Review the included photo and public-safe CV.
- [ ] Confirm the supplied coding profiles, GitHub, LinkedIn, and project links.
- [ ] Add real project screenshots if desired.
- [ ] Set the final site URL and email environment variables.
- [ ] Test inbox delivery and production Lighthouse.

## Graphite visual revision

The selected graphite mockup is implemented with locally hosted Manrope typography, amber accents, capsule navigation, numbered project rows, and a transparent portrait. The current portrait is an AI-assisted cutout; the original remains at `public/portrait.jpg`. Content stays in typed data files. Run commands from the extracted folder containing `package.json`.
