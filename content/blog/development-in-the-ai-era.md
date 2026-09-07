---
title: Development in the AI era
excerpt: How I review AI-assisted changes through small fixes, unused-code checks, duplicate detection and a clear boundary between validation and deployment.
publishedAt: 2026-09-05
draft: false
---
AI makes it easy to produce another function, component or script. The part I still have to account for is how that addition fits the project: whether something similar already exists, which behaviour must stay intact and what evidence will show that the change works.

My approach is to give the assistant a bounded task, inspect what is already there and keep the resulting change small enough to review. Knip and jscpd help with that process. Their reports are inputs to a decision, rather than instructions to delete or abstract everything they find.

A recent cleanup in a Next.js and Leaflet project is a useful example. It involved two exported types, duplicated command-line helpers and repeated map-fitting logic. None of those findings required a redesign of the application.

## An unused export can still be useful code

Knip reported two exported types that were not imported by other modules. Both types were still used inside their own files. The appropriate change was to remove the export keyword and retain the definitions.

This reduced example shows the distinction:

```diff
-export type RecordKind = "municipal" | "regional" | null;
+type RecordKind = "municipal" | "regional" | null;
```

Deleting the type would have removed something the module still needed. Keeping it private made the module’s public surface match its actual use. [Knip’s cleanup guide](https://knip.dev/overview/first-cleanup) explains this difference between an unused export and unused code.

Before accepting a similar suggestion, I check the imports and the local references. If the tool’s view seems wrong, I also check whether its configuration includes the entry point that reaches the code. A shorter report is useful only when it reflects the application accurately.

## Duplicate detection needs a useful scope

The jscpd cleanup found repeated application code, but it also compared generated dependency content. A package lock is important to the project; it is simply not a useful place to perform this kind of source refactoring.

The configuration for that project excludes the lock file from the duplication scan:

```json
{
  "ignore": ["**/package-lock.json"]
}
```

The scope matters as much as the count. A report should point me towards code I maintain. The exclusion belongs in the scanner configuration, not in a change to the generated file. The [jscpd project documentation](https://github.com/kucherenko/jscpd) describes the detector and its configuration.

Among the actual duplicates were argument-value handling in two command-line scripts and a transliteration table. I moved the shared logic into small modules under the scripts’ existing helper directory. Both callers then used the same implementation.

Here is the argument helper from that cleanup:

```js
export function readArgumentValue(argv, index, flag) {
  const value = argv[index];

  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${flag}`);
  }

  return value;
}
```

This helper has one job. It does not become a general command-line framework just because two scripts need it. The error message still identifies the flag whose value is missing.

## Refactoring should preserve the awkward details

The same project had two paths for fitting map coordinates: an update to the displayed markers and a control for showing all items. They now share a helper that treats one coordinate differently from several coordinates.

That distinction is part of the behaviour. A single location sets the map view; several locations determine bounds. Extracting the function should preserve those choices.

The transliteration change had another detail worth protecting: the existing handling of Russian hard and soft signs in generated identifiers. A cleanup is a poor place to quietly change how existing records are named. I want the shared implementation and its callers to retain that behaviour.

This is where I find small AI-assisted tasks most useful. “Extract this repeated logic and preserve these cases” gives me a change I can inspect. A broad request to clean the project makes the intended boundary harder to see.

## Checks answer different questions

For the cleanup, validation included TypeScript, Knip, jscpd, syntax checks for the changed scripts, their help commands and a diff whitespace check. Each covered a different part of the change.

In this website’s repository, the quality tools also have explicit package scripts:

```json
{
  "check:unused": "knip",
  "check:duplicates": "jscpd . --no-tips"
}
```

A type check can catch an incompatible call. A syntax check can catch a broken script. A duplication report can identify repeated code. None of those establishes that a page renders correctly in a browser or that a deployed service handles a real request.

I keep the validation report precise: which checks ran, what they cover and what remains unverified. That prevents “the checks passed” from turning into a larger claim than the evidence supports.

## Security needs its own review

Code cleanup also leaves security questions unanswered. Dependencies, access checks and the handling of credentials need attention on their own terms.

For dependency review, `npm audit` reports known vulnerabilities in the dependency tree. Its result needs interpretation: which package is involved, how it enters the project and what the proposed update changes. A clean report does not validate the application’s authorisation logic. The [npm audit documentation](https://docs.npmjs.com/cli/v11/commands/npm-audit/) also notes that fixes can require manual review and that automatic fixing runs the package installer.

My rule for an AI-suggested dependency fix is to inspect the proposed version change before applying it. Using `--force` can cross declared dependency ranges, so it deserves the same review as any other potentially breaking update.

## Deployment automation is a separate step

This site has a GitHub Actions workflow that runs on a push to the deployment branch, builds a Docker image and replaces the running container. That automates delivery. The existence of local quality scripts does not mean those checks are enforced by the workflow: this workflow currently does not invoke Knip or jscpd.

The next improvement is to make the chosen checks prerequisites for deployment. It is a concrete change to make, not something I can assume from a successful deployment run.

What I want from AI-assisted development is a change whose scope, behaviour and verification remain understandable. The useful output is the finished work together with enough evidence to maintain it.

Related work includes the integration boundaries in [AI Research Workspace](/case-studies/ai-research-workspace). If you need help with an existing application, see [websites and web applications](/services/websites-web-applications) or [discuss your project](/contact).
