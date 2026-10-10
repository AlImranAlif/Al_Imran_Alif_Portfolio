# Graphite design QA

Reference: selected Graphite software engineer portfolio mockup (1469 × 1071). Browser implementation: 1348 × 926, with additional 360px and 768px iframe checks. Compared both reference and rendered screenshot together.

- Fonts: Manrope provides the reference’s bold rounded sans style; mono metadata remains. The precise font in the generated reference is unknown.
- Spacing: capsule navigation, left hero copy, right portrait, buttons, stats, and horizontal project rows follow the reference hierarchy. Responsive layout stacks the portrait below copy at 360px.
- Colors: near-black graphite, amber accent, muted text, thin borders; warm paper light mode inspected.
- Images: transparent portrait is fully contained rather than cropped into a box; subtle amber grid background. Original portrait retained separately.
- Copy: real identity, graduation details and accurate project descriptions retained. The source mockup’s inaccurate project summaries were intentionally corrected.

Browser checks: desktop hero, 360px/768px layouts, expanded mobile navigation, dark/light toggle, PowerPlan case-study navigation and architecture content. No application console errors observed; one browser extension metadata error is unrelated to the app.

Intentional differences: additional project section heading, theme control, responsive stacking, viewport proportions and honest copy. This is a responsive implementation of the selected visual direction, not a claim of pixel-identical rendering. Lighthouse has not been measured. Contact email requires configured Resend environment variables.
