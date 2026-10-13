# Reperoo landing page

The Reperoo landing page, built as a sandbox for trying [Pages CMS](https://pagescms.org). It is a Next.js + Mantine site. All page text and images live in `content/` and `public/images/`, so non-developers can edit them through the CMS.

## Run locally

Requires Node.js 24+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits to files in `content/` show up on refresh.

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## What is editable

| Pages CMS entry | File | Controls |
|---|---|---|
| Home page | `content/home.json` | Every section's text, images, buttons, list items, and a "Show this section" toggle |
| Blog posts | `content/posts/*.md` | Add, edit and delete posts (rich-text body, cover image, date) |
| Site settings | `content/site.json` | Site name, logo, brand colour, menu, announcement bar, footer, SEO |

Uploaded images go to `public/images/`. The field definitions are in [`.pages.yml`](.pages.yml).

The **Show editable areas** button on the site outlines each region and names the CMS entry that controls it.

## Connect Pages CMS

1. Push this repo to GitHub.
2. Go to https://app.pagescms.org, sign in with GitHub and install the Pages CMS GitHub App on this repository.
3. Open the repository and branch. The sidebar shows *Home page*, *Blog posts* and *Site settings*.

Each save in Pages CMS is a commit to the branch. To see changes on a live site, deploy the repo to a host that rebuilds on push (Vercel, Netlify, Cloudflare Pages); locally, `git pull` and refresh.

Customers without a GitHub account can be invited by email as collaborators. They can edit content and media, but not `.pages.yml` or other collaborators.

## Notes

- The waitlist form validates input but doesn't send anything; there is no backend.
- The site is fully static (`next build` prerenders every page).
