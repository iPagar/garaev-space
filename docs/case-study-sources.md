# Case-study content and image sources

Prepared on 2026-09-05. This document records provenance for the portfolio content; it is not a public case-study page.

## Source material

- **AI Research Workspace**: the Lens integration at `/Users/pavelgaraev/projects/test/ai-chat/openchat/lib/ai/tools/investigate-person-client.ts`, its structured dossier contract and related MCP integration; prior project context supplied by Pavel. The case is explicitly composite. The workspace and workflow images are original conceptual diagrams with fictional data, not screenshots of a single shipped product.
- **Arctic Moroshka**: `https://moroshka-award.org/en` and `/en/nominees/2026-fall`; implementation and Sanity helpers in `/Users/pavelgaraev/projects/arctida/moroshka-award/src/lib/`. Images are captures of the public site.
- **Regions in Focus**: `https://regionsinfocus.com/ru` and `/ru/regions`. Images are captures of the public site. The case describes the observed content structure and locale-specific regional search without attributing an unverified backend implementation.
- **Arctida**: `https://arctida.io/en` and `/en/projects`; Next.js and Sanity implementation in `/Users/pavelgaraev/projects/arctida/arctida-website/nextjs-app`. Images are captures of the public site.
- **Arctida Stakeholders**: `https://stakeholders.arctida.io/en`, `/en/graph` and `/en/about`; graph frontend and backend in `/Users/pavelgaraev/projects/arctida/arctida-graph` and `/Users/pavelgaraev/projects/arctida/arctida-backend`. The graph was visibly rendered and captured. An HTTP 500 reported by the capture tool did not prevent its client interface from rendering; it is not presented as a broken page in the case.
- **SuppLens**: application source in `/Users/pavelgaraev/projects/indie/supp`; App Store listing `https://apps.apple.com/us/app/supplement-scanner-supplens/id6756219517`. Images are official store promotional images obtained from Apple's lookup API and image CDN, not newly captured app screens. The case does not claim clinical validation or measured safety outcomes.
- **MugMeme**: mobile source in `/Users/pavelgaraev/projects/indie/mugmeme/mug-meme-app` and website source in the adjacent `mugmeme-website`; App Store listing `https://apps.apple.com/us/app/mugmeme-custom-mug-designs/id6758587114`. Images are official store promotional images from Apple's lookup API and CDN. The case distinguishes digital design export from physical printing.
- **DwellScore**: `/Users/pavelgaraev/projects/indie/QuietSpot/apps/api/src/score/score-rules.ts`, mobile locales and application source. Images come from `apps/mobile/assets/app-store-screenshots/01-search.png`, `02-score.png` and `03-factors.png`. The text distinguishes geographic signals from directly measured noise.
- **Pageflock**: `/Users/pavelgaraev/projects/pageflock/README.md`, the renderer workspace, typed audience interface and SQLite schema. The image uses the existing renderer bundle in an isolated local preview with a mocked desktop bridge. The organisation and six records are fictional; no LinkedIn account or collection process was used.
- **LimeMenu**: `/Users/pavelgaraev/projects/indie/monitor/README.md` and its native app source. Image comes from `promo/public/app.jpeg` in that repository. Public project link: `https://limemenu.org`.

## Publishing and image handling

- All ten existing case-study slugs are populated; services and blog articles are unchanged.
- Images are local WebP assets in `public/case-studies`. Original screenshots and store images were resized only where needed and encoded for web delivery. No performance or business-impact figures were invented.
- The asset dimension registry is `src/app/lib/case-study-images.json`. Keep it aligned with actual files when replacing an image.
- Case content uses level-two headings, plain paragraphs and standalone Markdown image blocks. Each image block requires descriptive alternative text and a local `/case-studies/` asset path.
- Published cases appear in the XML sitemap, have indexable metadata and link to other cases and the contact section.
- Verification covered all ten actual page render functions, content blocks, image decoding and dimensions, metadata, internal case links and sitemap inclusion. TypeScript, targeted Biome checks, Knip and diff whitespace checks passed. No application build, portfolio browser QA or production deployment was performed.
