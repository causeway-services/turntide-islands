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
`causeway-services/turntide-islands-services-section`. Its build already needs
the original owner's `content/`, `data/research/`, `scripts/` and design
tokens. Select the exact section checkout with `TURNTIDE_SOURCE_ROOT` when
building the standalone site:

    TURNTIDE_SOURCE_ROOT=/absolute/path/to/turntide-islands-services-section npm run build

The existing integrated site's two-parent mounted section is the fallback
source root; `npm run build` must not silently substitute a site-local copy.

The **full original site test suite** has an additional independent owner:
the Turntide logical MetroPlat instance manifest named in
`data/records/institution/turntide-islands.metroplat-world.json` is a
**Group-owned** resource. An integrated checkout may locate it in its actual
ancestor checkout. For a standalone release assay, explicitly select the
separate real Group checkout holding the declared manifest:

    TURNTIDE_SOURCE_ROOT=/absolute/path/to/turntide-islands-services-section \
    TURNTIDE_GROUP_ROOT=/absolute/path/to/actual-561-group-checkout npm test

The reader checks that exact declared path, refuses traversal/absent manifests
and retains the original type, identity, and unhosted-deployment assertions.
Neither a Turntide site checkout nor a copy of the manifest in site fixtures
counts as Group receiving evidence. If the Group manifest has not survived
repository extraction, that is an **unresolved upstream ownership/migration
blocker**: restore/relocate the real authoritative resource and update the
original source binding by its proper owner. Do not alter the assertions or
claim the standalone suite passed. `TURNTIDE_GROUP_ROOT` is a test-evidence
selector, not a second public publishing source.

The build reads the original `data/records/governance/standing-pathways.json`
and invokes that *same owner's* `src/governance/receiving.mjs` projection.
The original guide is typed as `TurntideStandingPathwayGuide`; each pathway
uses the explicit properties `applicableSituation`, `resultingCivicState`,
`authorityPrerequisites`, `stewardCanHelpWith`, and `recommendedNextAction`.
This retires the earlier ambiguous `when`, `creates`, `requires`,
`zeloCan`, and `next` from the active instance.

The publisher selects Git blob
`b8730793aa6f9aceb7f624f1cb0bc262335668d5`, not arbitrary updated
workspace bytes. An unreviewed change refuses before publication. It renders
the one authoritative guide into an ignored/generated
`content/participation-pathways.md` through the existing VICTOR catalog,
and a parallel public standard **W3C SKOS / DCMI / PROV-O JSON-LD**
`/governance/standing-pathways.jsonld`. The original Worker serves the
latter from **the same static asset store** with
`application/ld+json; charset=utf-8`, not a second governance database.
Site navigation and the already-authored Use Turntide guide link to it.

Those projections describe four civic *choices*: ordinary participation,
bounded delegation, a request for broader standing, or Tidepool's **separate**
financial authority. Neither the HTML nor the JSON-LD grants standing,
enacts a proposal, issues a vote, commissions Zelo, or makes a Tidepool
payment. The source digest qualifies the bytes; installed service,
independent public readback and actual participant receiving remain separate.

The existing TUFTE presentation likewise selects the actual current **DTCG**
2025.10 design tokens at the original owner's typed path
`data/records/design-tokens/turntide-islands.tokens.json` through the same
source-root selection, rather than the older
`data/records/design-token-records/` snapshot. The source vocabulary retains
color-space, hex/components and typed font families; no theme bytes are
hand-authored into the public site to mask a wrong source selector.

The existing terrain publication also now reads the recovered original
Python reproducer from `scripts/extract-terrain.py` in that same source
checkout. It is the exact original historical Git blob
`b306af737df904b6cff3e070bd0a465d8543bcf7`, recovered without
regenerating the experiment or pretending to have performed a fresh terrain
measurement. This repairs the hard failure caused by trying to copy the
script from a non-existent `data/research` path.

## Public-asset build safety and receiving

The existing `npm run derive` now stages **all** copied art, research,
SKOS JSON-LD and generated icons in a sibling `.public-stage-*` directory.
It verifies that the exact admitted governance bytes and generated civic page
have not changed, then promotes the complete directory and source-derived
Markdown together with bounded rollback on ordinary failures. The generated
page remains a VICTOR input, not independent civic authority. This does not
create a separate publisher, release selector, or governance database.

The sibling `public.derive.lock/` is an actual filesystem exclusion against
**cooperating** simultaneous builds. A second build refuses; no inferred Actor
Session, distributed fencing, or fabricated resource reservation is involved.
A crash, forced kill, or failed rollback can leave a lock and `.public-stage-*
.previous` prior-assets backup. **Do not automatically clear the lock or
backup**: identify the owning process, inspect the full previous/new asset
trees, independently reconcile any generated Markdown and release receipts,
and restore safely through the real release custodian. Source bytes that moved
or an independently edited page refuse promotion before touching the old tree.

The two filesystem renames and the Markdown rename are not one atomic
multi-path commit. The original release process must consume the completed
`npm run derive && static-site-publisher build` result, never files while
`derive` is running. Native tests in
`test/public-asset-transaction.test.mjs` cover clean success, missing source,
changed source, failed page rename, concurrent builds, independent author
edits, first deployment and original-page protection. These unit receipts do
**not** prove native installed VICTOR, original governance root selection,
Cloudflare publication, or public reader acceptance.
