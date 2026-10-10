# Repair notes

- Restored missing package.json, real dependency lockfile, TypeScript and PostCSS configurations, Next.js type declarations, dev launcher, and contact tests.
- Replaced the empty README with Windows setup, Git update, production run, environment variable, and manual Vercel deployment instructions.
- Added all four user-supplied coding profile links to the Competitive Programming section and Person structured data.
- Fixed CV download path by restoring the previously public-safe CV under the filename the app uses; excluded the obsolete differently named PDF.
- Restored the referenced social preview image and favicon.
- Fixed circular Tailwind font variables while preserving the uploaded layout, portrait, and project data.
- Added a single npm run check command and .nvmrc for Node 24.

The original uploaded archive is the input for these repairs. No GitHub push or public deployment is performed by this archive.

## Verification

- Fresh npm ci succeeded with the repaired dependency lockfile.
- Production build and strict TypeScript check passed.
- All 10 contact-handler tests passed.
- Production server returned HTTP 200 for home, all three project pages, the CV, social image, favicon, robots.txt, and sitemap.xml.
- All four exact user-supplied coding-profile URLs were present in the rendered homepage.
- Real email delivery and Lighthouse scores were not tested. Resend credentials and a verified sender are still required for email.

## Selected option 2 redesign

New navy/blue theme, bold sans-serif headings, software-engineer hero, fully visible original portrait, projects moved directly after hero, two-column project cards with live/source links, updated light theme, and responsive mobile layout. Original project facts, research, coding profiles, contact route, and public-safe CV retained. Build, typecheck and 10 contact tests passed. Browser tested desktop, 360px and 768px, menu, theme controls and project navigation.

## Graphite reference revision
- Replaced the blue appearance with graphite and amber styling.
- Added locally hosted Manrope and a full transparent portrait treatment.
- Revised capsule navigation, hero hierarchy, stats, and numbered project rows.
- Retained accurate project descriptions and existing contact protections.
