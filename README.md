# Obaro Destiny Udurie

Personal portfolio for Obaro Destiny Udurie, a Lagos-based software engineer. It is a single page with section anchors, published with GitHub Pages at [destinez.github.io](https://destinez.github.io/).

## Stack

- React 19 and TypeScript
- Vite (`base` is `/`, which a GitHub user site needs)
- Tailwind CSS
- Motion for scroll reveals and kinetic type
- A canvas hero (filaments and orbits — no extra WebGL library)

All public copy lives in [`src/data/content.ts`](src/data/content.ts). Edit that module; the sections, editor panes, and terminal read from it.

The page includes an animated hero, syntax-highlighted editor panes (`about.ts`, experience files), an interactive terminal (help, about, projects, experience, skills, contact, resume, clear, and a few more, with tab completion and history), featured repositories, case studies, a timeline, skills, education, and contact.

## Local development

```bash
npm install
npm run dev
```

Typecheck and production build:

```bash
npm run build
npm run preview
```

`npm run build` runs `tsc --noEmit`, then writes the static site to `dist/`.

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow installs dependencies, builds, and deploys `dist/` with `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. This repository is the user site (`Destinez.github.io`), so the site is served at `https://destinez.github.io/` and the Vite base stays `/`.

## Contact on the site

Email, GitHub, and LinkedIn only.
