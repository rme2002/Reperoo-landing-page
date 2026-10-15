# Reperoo landing page

The Reperoo landing page, built as a sandbox for trying [Pages CMS](https://pagescms.org). It is a Next.js + Mantine site. All page text and images live in `content/` and `public/images/`, so non-developers can edit them through the CMS.

## Run locally

Requires Node.js 24+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits to files in `content/` show up on refresh.

Checks: `npm run typecheck`, `npm run lint`, `npm run build`. The build writes the static site to `out/`.

## What is editable

| Pages CMS entry | File | Controls |
|---|---|---|
| Home page | `content/home.json` | Every section's text, images, buttons, list items, and a "Show this section" toggle |
| Blog posts | `content/posts/*.md` | Add, edit and delete posts (rich-text body, cover image, date) |
| Privacy policy | `content/privacy.md` | The `/privacy` page |
| Site settings | `content/site.json` | Site name, logo, menu, announcement bar, footer, SEO |

Uploaded images go to `public/images/`. The field definitions are in [`.pages.yml`](.pages.yml).

The **Show editable areas** button outlines each region and names the CMS entry that controls it. It appears in development, or on the live site when you add `?editable` to the URL.

## Deploy to GitHub Pages

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site and publishes it on every push to `main`. One-time setup:

1. In the repository on GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Open **Actions → Deploy to GitHub Pages** and run it (or push to `main`).

The site is served from https://romnickchurned.github.io/Reperoo-landing-page/. The workflow passes that `/Reperoo-landing-page` prefix to the build as `PAGES_BASE_PATH`; with a custom domain the prefix is empty and nothing else changes.

To check a production build locally, under the same prefix:

```bash
PAGES_BASE_PATH=/Reperoo-landing-page npm run build
```

## Connect Pages CMS

1. Go to https://app.pagescms.org, sign in with GitHub and install the Pages CMS GitHub App on this repository.
2. Open the repository and branch. The sidebar shows *Home page*, *Blog posts*, *Privacy policy* and *Site settings*.

Each save in Pages CMS is a commit to `main`, which redeploys the site within a few minutes. Locally, `git pull` and refresh.

Customers without a GitHub account can be invited by email as collaborators. They can edit content and media, but not `.pages.yml` or other collaborators.

## Notes

- The waitlist form posts to **Home page › Waitlist › Form endpoint URL**, from a form service such as Formspree or Getform. While that is empty, the live site shows the closed message instead of the form, and development simulates a successful sign-up.
- The site is fully static: `next build` prerenders every page, so there is no server to run.
- Animations stop for visitors who prefer reduced motion, and the hero has a pause button that is remembered per browser.
