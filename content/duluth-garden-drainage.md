---
title: What can maps tell us about drainage near a Duluth garden?
date-created: 2026-09-28
type: record
status: active
tags:
- turntide-islands
- knowledge-vault
- stormwater
- practice-candidate
---

This is an AI-prepared desktop source check for a community question about
gardens, watersheds, and rainwater in Duluth. The provider offer
request asks for a
bounded, reproducible screening before anyone proposes a paid report. No
garden organizer has agreed to a site study, and no provider has been selected.

# One reproducible map check

The [Duluth Community Garden Program's location
page](https://www.duluthcommunitygarden.org/plot-rental/garden-locations)
embeds a [public KML map of garden
markers](https://www.google.com/maps/d/kml?mid=1m5Og2iY7Ufao8nujRwtNuRIk9BiyXU8&forcekml=1).
On 2026-09-28, its **Chester Creek Community Garden** marker was at
longitude -92.0899378, latitude 46.807297. This is a map point supplied by
the garden program, not a surveyed garden boundary or confirmation of current
site operations.

An [intersection query of that point against Minnesota DNR's catchment
layer](https://enterprise.gisdata.mn.gov/aghost/rest/services/us_mn_state_dnr/geos_dnr_watersheds/FeatureServer/4/query?f=json&geometry=-92.0899378%2C46.807297&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=objectid%2Ccatch_id%2Chu_10_name%2Chu_12_name%2Cver_date&returnGeometry=false)
returned one feature: catchment `0204000`, named “City of Duluth-Frontal Lake
Superior,” with a `ver_date` value of `10/31/2023`. The layer is **DNR
Watersheds - DNR Level 08 - All Catchments**, originated by the Minnesota DNR
Division of Ecological and Water Resources, Watershed Delineation Project;
its [published metadata](https://enterprise.gisdata.mn.gov/aghost/rest/services/us_mn_state_dnr/geos_dnr_watersheds/FeatureServer/4/iteminfo)
gives publication date **11/01/2023** and attribution requirements. This
locates the program's marker in a mapped broad catchment. It does not show
which nearby surface, pipe, or roof drains toward the garden.

# What a useful screening still needs

The City has a [completed stormwater management
plan](https://duluthmn.gov/public-works-utilities/stormwater/city-of-duluth-stormwater-management-plan/)
covering watershed and sewershed characteristics. Its [newer GIS service
directory](https://maps.duluthmn.gov/prodags2/rest/services) lists watershed,
elevation, and storm-system folders, but unauthenticated queries to those
folders returned `Token Required` on 2026-09-28. An [older City utility map
service](https://maps.duluthmn.gov/prodags/rest/services/TrakITservices/UtilitiesDLH/MapServer)
responded publicly and lists storm-system layers; its currency, completeness,
terms, and fitness for this question have not been established. A provider
should verify accessible elevation and imagery, garden boundaries, storm
infrastructure, local flow paths, and the City's relevant plan findings before
interpreting upstream relationships.

A catchment intersection is **not** a surface-flow model, hydrologic review,
water-volume estimate, or permission to redirect runoff. The actual drainage
path, utilities, ownership, site conditions, and potential harm require
appropriate field and professional review before any intervention is
considered.

# Evidence and next decision

- **Evidence state:** conceived question with one reproducible public-data
  intersection. No completed garden-scale simulation, human source review,
  field observation, trial, or witnessed adaptation outcome.
- **Vault work:** the [source check in `#receipts`](https://discord.com/channels/1184863861065658419/1519620773436854353/1553967627196571658)
  and [specific human review request in `#archive-desk`](https://discord.com/channels/1184863861065658419/1519620769695535264/1553967628790267995)
  link to this record. A request for review is not a completed human review.
- **Work selection:** offers are open
  for a bounded feasibility slice. That request does not award work or
  authorize spending.
- **Public use:** this record uses public source material and paraphrases the
  question. It does not republish a member's Discord words or treat a Discord
  post as consent.

To improve it, [[join|join Turntide]] and bring a source or a general
observation to `#question-quarry`. A steward must ask
separately before publishing a member's words or a site-specific observation.
