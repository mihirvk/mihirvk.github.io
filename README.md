# Mihir Kavishwar's personal website

A compact academic personal site built with Astro, TypeScript, Markdown, and plain CSS. Hosted at <https://mihirvk.github.io>.

## Local development

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open <http://localhost:4321>. Dark is the default; the theme button remembers a light-theme selection. Navigation and content work without JavaScript.

On Mihir's Windows machine, a verified portable Node distribution is available in the ignored `.tools` directory. The helper finds it without changing Conda or the system PATH:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run.ps1 -Task dev
```

To review the production output:

```sh
npm run build
npm run preview
```

The existing preview can occupy port 4321; stop that process before starting another, or use `npm run preview -- --port 4322`.

## Editing content

- `src/data/profile.ts`: research description, biography metadata, advisor, emails, external links, navigation, and CV date.
- `src/data/background.ts`: education, industry experience, awards, and academic service.
- `src/data/publications.ts`: validated publication records. Mark a paper `selected: true` to feature it. Keep preprints distinct unless their relationship to a later paper is verified.
- `src/data/updates.ts`: dated news and links. The homepage shows the preceding 12 calendar months at build time; `/updates/` keeps the full archive. Rebuild to advance that window. Dates are displayed by month; use the first of the month when only a month is known.
- `src/content/projects/`: one Markdown file per project, with original group, order, course label, and document links. Projects appear on Coursework, followed by the courses.
- `src/content/coursework/courses.md`: course list, preserving the original site’s university, subject, and course order.
- `src/content/writing/`: Markdown articles; set `draft: true` to exclude an article from every public writing route and index.
- `public/assets/pdfs/`: reports and the supplied October 2026 CV. Keep the PDF bytes unchanged when editing website text.
- `src/styles/global.css`: design variables and shared styles. Keep layouts compact and language plain and modest.

Content collections and data modules validate on check/build. [Source notes](docs/content-sources.md) document the research and award updates. [Agent instructions](AGENTS.md) guide future AI-assisted edits.

## Validation

```sh
npm run check
npm test
npm run build
npm run test:site
npm audit --audit-level=high
```

`test:site` checks all generated pages, internal links, documents, legacy anchors, headings, and draft exclusion. For browser validation, run a production preview in another terminal, then:

```sh
npm run test:browser
```

The browser check uses installed Chrome or Edge on Windows. On other machines, first run `npx playwright-core install chromium` (use `--with-deps` on Linux when needed). Set `CHROME_PATH` to use another Chromium executable and `PREVIEW_URL` to use a different preview address. It checks both themes, four viewport widths, WCAG AA rules with axe, keyboard navigation, saved theme preference, and content without JavaScript. Screenshots are saved to ignored `.preview/`.

## Review and publishing

Review locally at the design, content, and final-polish checkpoints before commits. No generated `dist`, runtime binaries, local originals, or screenshots belong in Git.

The validation workflow builds and tests pull requests and main. It does not publish. The **Publish reviewed website** workflow can run only manually on main, with the `reviewed` input checked; it repeats validation before uploading and deploying the build.

After final review, configure GitHub repository Settings → Pages → Source to **GitHub Actions** before merging the replacement into main, then run that manual workflow. This prevents the old branch-based Jekyll publishing flow from running on the new source. The refactor does not change Pages settings or publish automatically. The existing GitHub Pages address is retained. The `github-pages` environment can also require a reviewer for deployment protection.

The homepage includes concise education, experience, awards, and academic service. Navigation is Home, Publications, Coursework, and Writing, plus CV. Legacy publication, CV, courses, internships, and blog URLs remain available. `/blog_post/` renders the same article as its canonical writing URL and retains its historical anchors. `/about/` redirects to `/#background`, `/research/` to `/publications/`, and `/projects/` to `/course_list/#projects`.
