# Maintaining this personal site

- This is a static Astro site with TypeScript and plain CSS. Keep the design compact, understated, and academic. Use direct language; avoid slogans, oversized promotional sections, decorative cards, and flashy motion.
- The homepage shows an introduction, recent updates, selected publications, concise education/experience/awards/service, and the transfer article. Omit personal-interest sections and keep Princeton out of the introductory paragraph. Show Mihir's name once without a trailing period, Google Scholar/LinkedIn/CV beside the introduction, and email addresses in the footer.
- Navigation is Home, Publications, Coursework, Writing, plus CV. Do not restore separate About or Research pages. Their former URLs redirect to the homepage background and Publications respectively.
- Dark is the default. Keep both themes readable and preserve the visitor's saved selection.
- Profile links live in `src/data/profile.ts`; background details in `src/data/background.ts`. Publications and news are validated in their respective data modules. Keep publication records local; do not scrape Scholar.
- Projects, coursework, and writing live in Markdown collections under `src/content`. Combine projects and courses at `/course_list/`, preserving the original site's group and item order. `/projects/` redirects there; individual project documents remain accessible. Never render articles marked `draft: true` or restore commented unpublished material from Git history.
- Show each paper's full author list, bolding only Mihir's name. Keep updates concise without naming collaborators.
- Do not invent dates, paper acceptance dates, authors, awards, or biographical facts. Verify research metadata with primary sources; `docs/content-sources.md` records this migration's sources.
- News on the homepage uses the preceding 12 calendar months at build time. Preserve older news in the archive. Use the first of the month for historical news whose day is unknown, and display month/year only.
- Keep `/publications/`, `/cv/`, `/course_list/`, `/internships/`, `/blog_post/`, the article anchors `background`, `what`, `logistics`, and all legacy PDF paths working.
- The linked CV PDF was replaced with Mihir's supplied October 2026 document. Keep its original bytes and visible update date; change them only when Mihir supplies or authorizes a replacement. Previous copies are archived locally and recoverable from Git history.
- Keep generated files, portable runtimes, preview captures, and local archives ignored. Do not add a frontend framework or tracking service without a concrete need.
- Validate meaningful changes with `npm run check`, `npm test`, `npm run build`, and `npm run test:site`. For layout or interaction changes, run the browser check against a running production preview and inspect desktop/mobile screenshots.
- Show local previews during design, content, and final-polish review. Never commit, push, or publish before Mihir's review and authorization. Deployment is a manual workflow on main, with a required reviewed flag.
