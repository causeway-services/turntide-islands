---
title: What can maps tell us about drainage near a Duluth garden?
date-created: 2026-09-28
date-modified: 2026-10-04
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

# A terrain window available without City GIS access

On 2026-10-04, an AI-prepared extraction read a **400 by 400 metre window**
around the same marker from MnGeo's **Statewide Seamless 0.5m Lidar DEM,
Minnesota, 2025**. The [second-generation lidar access page](https://mn.gov/mngeo/gis-data-and-maps/info-by-topic/elevation/lidar/lidar-gen2.jsp)
provides public raster access independently of the City's GIS login. The
[catalog item `dem_5_51_m`](https://stac.gisdata.mn.gov/collections/minnesota-100km-sections-DEM-0.5m/items/dem_5_51_m)
identifies the source Cloud Optimized GeoTIFF. Reading only its window avoids
downloading the advertised 54.85 GiB tile.

![Elevation map of a 400 metre window around the unverified garden-program marker. Higher terrain appears to the west and lower terrain to the east. This is terrain only, with no drainage paths or garden boundary drawn.](/images/duluth-garden-terrain.png)

The saved extract contains 800 by 800 cells at the native 0.5 metre spacing,
with **640,000 valid cells and no missing cells**. Its elevation range is
253.13–326.32 metres. The raster's horizontal reference is NAD83(2011) / UTM
zone 15N, and its vertical reference is NAVD88, in metres. The catalog reports
Geoid09 and a publication date of 2025-11-24; that date is not a verified
acquisition date for this garden. The figure shows lower ground east of the
marker within this window. That is a terrain observation, not evidence that
any roof, road, pipe, or garden drains along a particular route.

Download the [small GeoTIFF](/research/duluth-garden-drainage/terrain.tif),
[source catalog response](/research/duluth-garden-drainage/source-item.json),
[extraction metadata](/research/duluth-garden-drainage/extraction.json) and
[Python reproducer](/research/duluth-garden-drainage/extract-terrain.py)
directly from this site. Open `terrain.tif` in a GIS application to examine the
same cells. To make another extract, install Python with `rasterio`, `pyproj`,
`numpy` and `matplotlib`, then run `python extract-terrain.py OUTPUT_DIRECTORY`.
`extraction.json` records the exact raster window, bounds, software versions,
source links and SHA-256 hashes. Repeating against a changed source can give
a different result; the saved extract preserves this observation.

Source credit: Minnesota Geospatial Information Office and Minnesota
Department of Natural Resources, **Statewide Seamless 0.5m Lidar DEM,
Minnesota, 2025**. This derivative clips the raster and renders an elevation
figure; it makes no elevation corrections or drainage simulation. MnGeo's
[distribution statement](https://www.mngeo.state.mn.us/chouse/disclaimer.html)
describes source limitations, absence of warranty, and redistribution
conditions. Grid spacing is not a claim of site-specific survey accuracy.

# Precipitation-frequency context for the same marker

On 2026-10-04, the [NOAA point query](https://hdsc.nws.noaa.gov/cgi-bin/new/fe_text.csv?lat=46.807297&lon=-92.0899378&type=pf&data=depth&units=metric&series=pds)
returned **NOAA Atlas 14 Volume 8 Version 2** estimates for latitude
46.807297, longitude -92.0899378. The [saved complete CSV](/research/duluth-garden-drainage/rainfall-atlas14.csv)
retains the source's metric precipitation depths, partial-duration series,
all durations and recurrence intervals, 90% confidence bounds and retrieval
time. These four entries illustrate the table; they do not select a design
storm for a garden.

| Duration | Average recurrence interval | Estimated depth | Source's 90% confidence bounds |
| --- | --- | --- | --- |
| 60 minutes | 2 years | 30 mm | 24–37 mm |
| 60 minutes | 10 years | 44 mm | 35–55 mm |
| 24 hours | 2 years | 68 mm | 57–80 mm |
| 24 hours | 10 years | 100 mm | 84–119 mm |

NOAA's [frequency definitions](https://www.weather.gov/owp/hdsc_faqs)
distinguish partial-duration **average recurrence intervals** from
annual-maximum **annual exceedance probabilities**. A recurrence interval
is an average between qualifying events, not a calendar schedule. The
confidence bounds describe uncertainty in the frequency estimate, not the
range of depths in the next storm. Neither the estimate nor its bounds
describe an observed storm at this garden.

Source credit: Perica and colleagues (2013), [NOAA Atlas 14, Volume 8,
Version 2.0: Precipitation-Frequency Atlas of the United States, Midwestern
States](https://www.weather.gov/media/owp/oh/hdsc/docs/Atlas14_Volume8.pdf),
NOAA National Weather Service. Repeat the linked point query to retrieve a
current response. This historical frequency product is context for a local
question; it supplies no drainage route, contributing area, soil infiltration,
runoff volume, future-climate projection, or site sizing decision.

# What a useful drainage screening still needs

The City has a [completed stormwater management
plan](https://duluthmn.gov/public-works-utilities/stormwater/city-of-duluth-stormwater-management-plan/)
covering watershed and sewershed characteristics. Its [newer GIS service
directory](https://maps.duluthmn.gov/prodags2/rest/services) lists watershed,
elevation, and storm-system folders, but unauthenticated queries to those
folders returned `Token Required` on 2026-09-28. An [older City utility map
service](https://maps.duluthmn.gov/prodags/rest/services/TrakITservices/UtilitiesDLH/MapServer)
responded publicly and lists storm-system layers; its currency, completeness,
terms, and fitness for this question have not been established. A provider
should verify current imagery, garden boundaries, storm
infrastructure, local flow paths, and the City's relevant plan findings before
interpreting upstream relationships. The terrain window above supplies an
accessible elevation starting point; it does not supply those other facts.

A catchment intersection is **not** a surface-flow model, hydrologic review,
water-volume estimate, or permission to redirect runoff. The actual drainage
path, utilities, ownership, site conditions, and potential harm require
appropriate field and professional review before any intervention is
considered.

# Evidence and next decision

- **Evidence state:** one reproducible catchment intersection, a saved terrain
  extract with a figure, and a saved NOAA point-frequency estimate with its
  uncertainty bounds. No completed drainage
  simulation, human source review,
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
