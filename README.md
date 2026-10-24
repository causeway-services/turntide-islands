> **Data repository.** The executable code that used to live here was moved on 2026-10-24 to
> [`red-cup-engineering/turntide-islands`](https://github.com/red-cup-engineering/turntide-islands), which reads this data
> (point it here with `SECTION_DATA_ROOT`, default current working directory). This repository holds data only.

# turntide.561.group

<!-- 561-group-standards:badges:start -->
[![Causeway Services](https://img.shields.io/badge/561%20Group-Causeway%20Services-115e69)](https://github.com/causeway-services)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-115e69)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/causeway-services/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

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
