# Leads Cleaning — Calgary

Marketing site for Leads Cleaning. React + Vite + TypeScript, deployed to GitHub Pages.

**Live:** https://zaddywebbuilds.github.io/Leadscleaning/

---

## Running locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
npm run preview
```

## Build & deploy layout — read this before editing

GitHub Pages serves **this branch's root directory** directly, so the compiled
output is committed alongside the source. That creates one non-obvious rule:

| Path | What it is |
|---|---|
| `index.src.html` | **The real Vite entry.** Edit this one. |
| `index.html` | **Build artifact.** Overwritten on every deploy — never edit. |
| `assets/` | **Build artifact** (JS/CSS bundles + images). Regenerated on deploy. |
| `public/assets/` | Source images. Edit here. |
| `dist/` | Build output, git-ignored. |

`vite.config.ts` points `rollupOptions.input` at `index.src.html` specifically so
that copying the built HTML to the repo root cannot clobber the source entry.

To deploy:

```bash
npm run build
rm -rf assets
cp dist/index.src.html index.html
cp -r dist/assets ./assets
# root-level public files (favicon.svg, icons.svg) — easy to forget
find dist -maxdepth 1 -type f ! -name 'index.src.html' -exec cp {} . \;
git add index.html assets src favicon.svg icons.svg
git commit -m "..."
git push origin claude/intelligent-allen-34rxrg
```

`.github/workflows/deploy.yml` also builds and publishes `dist/` via GitHub
Actions, for when Pages is set to "GitHub Actions" as its source.

---

## Design system

Tokens live in `src/index.css` — palette, type scale, and a **spacing scale**
(`--sp-xl` … `--sp-sm`) applied through `.sec-xl`/`.sec-lg`/`.sec-md`/`.sec-sm`.
Sections deliberately use *different* steps; applying one uniform padding to
everything is what made the earlier build feel flat.

Two rules worth keeping:

1. **No text is ever set over photography.** Photos live in contained panels
   beside the copy, never behind it. The hero is an asymmetric split for this
   reason.
2. **Never put `max-width` on an element that is also `.container`.** It is
   `margin: 0 auto`, so a narrower max-width re-centres the block and knocks it
   out of alignment with the rest of the page. Constrain the children instead
   (`.page-cta__inner > * { max-width: … }`).

## Content integrity

Imagery is AI-generated and illustrative. It must not be presented as real jobs,
real staff or real client homes. Before/after pairs carry a visible disclosure,
and the footer carries a site-wide one.

There are no testimonials, review counts, star ratings, years-in-business, team
size, certification or insurance claims anywhere on the site — none of that is
verified, so none of it is published.

---

## TODO before launch — needs the owner

- [ ] **Contact email.** `src/pages/Quote.tsx` uses `info@leadscleaning.ca` as a
      placeholder (`CONTACT_EMAIL`). Confirm the real address.
- [ ] **Phone number.** `+1 403-607-0581` is taken from the Google listing and
      has not been confirmed by the owner.
- [ ] **Form delivery.** The quote form opens the visitor's own mail client via
      `mailto:` — nothing is transmitted from the page, and the UI says so. For
      real delivery, wire up Formspree / Netlify Forms / EmailJS.
- [ ] **Business address.** Not published. The listing address may be
      residential; do not publish without consent.
- [ ] **Replace illustrative photography** with permissioned photos of actual work.
- [ ] **Privacy Policy and Terms pages.** Not written, and deliberately not
      linked — footer links to non-existent pages were removed rather than
      pointed at the FAQ.
- [ ] **Service scope.** Only House, Apartment and Recurring cleaning are
      published, per the verified service list. Confirm before adding others.
