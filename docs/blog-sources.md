# Blog source notes

Prepared 2026-09-05. Articles are in English to match the portfolio. Their concrete examples come from local project source and git history; no performance or business metrics were invented.

## Development in the AI era

- `own/voenkomat`, commit `393c79f`: removed only export modifiers from CommissionMember and VoenkomatKind, retaining local type definitions. Article uses a reduced, renamed type example.
- `own/voenkomat`, commit `dd8df153d27c6a00598684a9976c46beb4be4222`: shared CLI argument helper and transliteration module, shared map coordinate fitting, lock-file exclusion for jscpd.
- Historical cleanup verification was recorded in the September 3 maintenance session: Knip, TypeScript, jscpd, script syntax/help and whitespace checks. These are historical results, not checks rerun against Voenkomat during article preparation.
- `own/garaev-space/package.json`, `.jscpd.json`, `.github/workflows/deploy.yml`: actual local quality commands and deployment workflow inspected. The article explicitly distinguishes available scripts from checks enforced by deployment.
- Dependency security section is guidance, not a claim that a particular vulnerability audit or fix was performed.
- Primary references: https://knip.dev/overview/first-cleanup, https://github.com/kucherenko/jscpd, https://docs.npmjs.com/cli/v11/commands/npm-audit/.

## An editor-friendly CMS in practice

- `arctida/moroshka-award-studio/schemaTypes/documents/awardCycle.tsx` and `shortlistItem.tsx`: cycle structure, references, previews and required fields.
- Moroshka `sanity.config.ts`, `utils/validation.ts`, settings schema: singleton navigation and required-language validation. Article does not claim every translated field uses custom validation.
- `arctida/arctida-website/studio/src/schemaTypes/objects/inlineImages.ts` and `src/ui/InlineImagesInput.tsx`: exactly two images, captions, preview and dialog reusing default rendering.
- Arctida `src/schemaTypes/objects/basicEditor.tsx`: supported styles and link annotation.
- Arctida `migrations/convert-key-thought-text-to-rich-text/index.ts`: type-guarded conversion preserving source text. Snippet omits imports and the surrounding migration wrapper. Dataset execution was not verified or performed during article preparation.
- Primary references: https://www.sanity.io/docs/studio/validation and https://www.sanity.io/docs/studio/form-components.

No build, browser session, migration, installation or deployment is part of this content update.
