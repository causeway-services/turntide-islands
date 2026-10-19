# turntide.561.group

The public Turntide Islands site. It is a static VICTOR catalog: published
claims are small, source-bound cells, and the build emits the accessible site,
feeds, search, release manifest, and offline artifacts.

## Commands

```sh
npm install
npm run check
npm run build
npm run deploy
```

`@red-cup-engineering/static-site-publisher` is intentionally a registry
dependency. It must be published to the configured private registry before the
first install; this site never reaches into the engineering workspace for the
application.

The public-source basis is the parent Turntide Islands service's
`content/text/documents/` record layer. Runtime data, provider admissions, and
credentials are deliberately outside this site.

`npm run deploy` publishes the verified `dist/` release as Cloudflare static
assets and binds the `turntide.561.group` custom hostname.

## Governance source is real, not an independently edited public explanation

The public site is a **receiver** of the original Turntide organization in
\`causeway-services/turntide-islands-services-section\`. Its build already needs
the original owner's \`content/\`, \`data/research/\`, \`scripts/\` and design
tokens. Select the exact section checkout with \`TURNTIDE_SOURCE_ROOT\` when
building the standalone site:

    TURNTIDE_SOURCE_ROOT=/absolute/path/to/turntide-islands-services-section npm run build

The existing integrated site's two-parent mounted section is the fallback
source root; \`npm run build\` must not silently substitute a site-local copy.
The build reads the original \`data/records/governance/standing-pathways.json\`
and invokes that *same owner's* \`src/governance/receiving.mjs\` projection.
The original guide is typed as \`TurntideStandingPathwayGuide\`; each pathway
uses the explicit properties \`applicableSituation\`, \`resultingCivicState\`,
\`authorityPrerequisites\`, \`stewardCanHelpWith\`, and \`recommendedNextAction\`.
This retires the earlier ambiguous \`when\`, \`creates\`, \`requires\`,
\`zeloCan\`, and \`next\` from the active instance.

The publisher selects Git blob
\`b8730793aa6f9aceb7f624f1cb0bc262335668d5\`, not arbitrary updated
workspace bytes. An unreviewed change refuses before publication. It renders
the one authoritative guide into an ignored/generated
\`content/participation-pathways.md\` through the existing VICTOR catalog,
and a parallel public standard **W3C SKOS / DCMI / PROV-O JSON-LD**
\`/governance/standing-pathways.jsonld\`. The original Worker serves the
latter from **the same static asset store** with
\`application/ld+json; charset=utf-8\`, not a second governance database.
Site navigation and the already-authored Use Turntide guide link to it.

Those projections describe four civic *choices*: ordinary participation,
bounded delegation, a request for broader standing, or Tidepool's **separate**
financial authority. Neither the HTML nor the JSON-LD grants standing,
enacts a proposal, issues a vote, commissions Zelo, or makes a Tidepool
payment. The source digest qualifies the bytes; installed service,
independent public readback and actual participant receiving remain separate.

The existing terrain publication also now reads the recovered original
Python reproducer from \`scripts/extract-terrain.py\` in that same source
checkout. It is the exact original historical Git blob
\`b306af737df904b6cff3e070bd0a465d8543bcf7\`, recovered without
regenerating the experiment or pretending to have performed a fresh terrain
measurement. This repairs the hard failure caused by trying to copy the
script from a non-existent \`data/research\` path.
