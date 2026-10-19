import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const site = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(process.env.TURNTIDE_SOURCE_ROOT ?? resolve(site, "../.."));
const { projectStandingPathwayPublication } = await import(pathToFileURL(
  resolve(sourceRoot, "src/governance/receiving.mjs")).href);
const expectedBlob = "b8730793aa6f9aceb7f624f1cb0bc262335668d5";
const original = resolve(sourceRoot, "data/records/governance/standing-pathways.json");
const digest = bytes => "ni:///sha-256;" + createHash("sha256").update(bytes).digest("base64url");
const blob = bytes => createHash("sha1").update("blob " + bytes.length + "\0").update(bytes).digest("hex");

test("the actual original governance source owns the useful public participation and SKOS projections", async () => {
  const bytes = await readFile(original);
  assert.equal(blob(bytes), expectedBlob, "an unreceived original governance revision must not be published");
  const record = JSON.parse(new TextDecoder("utf-8", {fatal: true}).decode(bytes));
  const projection = projectStandingPathwayPublication(record, {sourceDigest: digest(bytes)});
  const md = projection.page.body;
  const graph = JSON.parse(projection.linkedData.body);
  assert.equal(projection.count, 4);
  assert.equal(projection.page.path, "participation-pathways.md");
  assert.equal(projection.linkedData.path, "governance/standing-pathways.jsonld");
  assert.equal(graph["@graph"][0]["@type"], "skos:ConceptScheme");
  assert.equal(graph["@graph"][0]["prov:wasDerivedFrom"], digest(bytes));
  assert.equal(graph["@graph"].length, 5);
  assert.deepEqual(graph["@graph"].slice(1).map(node => node["skos:notation"]),
    ["participate", "bounded-delegation", "broader-standing", "tidepool"]);
  assert.match(md, /W3C SKOS vocabulary/);
  assert.match(md, /source-declared civic pathways/i);
  assert.match(md, /not acquire power/i);
  assert.match(md, /cannot activate a delegation/i);
  assert.match(md, /Tidepool financial authority/);
  assert.ok(md.includes(digest(bytes)));
  assert.equal(projection.publicationAuthorized, false);
  assert.equal(projection.authorityGranted, false);
  for (const row of record.pathways) {
    assert.ok(md.includes(row.recommendedNextAction));
    assert.ok(graph["@graph"].some(node => node["skos:notation"] === row.id));
  }
});

test("the original VICTOR site exposes a public navigation path without shadowing governance authority", async () => {
  const [config, guide, index] = await Promise.all([
    readFile(resolve(site, "static-site-publisher.config.mjs"), "utf8"),
    readFile(resolve(site, "content/use-turntide.md"), "utf8"),
    readFile(resolve(site, "content/index.md"), "utf8"),
  ]);
  assert.match(config, /label: 'Participate', href: '\/participation-pathways\/'/);
  assert.match(guide, /\[\[participation-pathways\|current participation pathways\]\]/);
  assert.match(index, /\[\[participation-pathways\|Ways to participate\]\]/);
  assert.match(guide, /informational, not a vote or delegation/);
  assert.match(index, /without inventing governance power/);
});

test("editing the original publisher's source copy cannot silently change the pinned enacted governance revision", async () => {
  const bytes = await readFile(original);
  const altered = Buffer.from(bytes.toString("utf8").replace(
    "TurntideStandingPathwayGuide", "ForgedGovernanceGrants"));
  assert.notEqual(blob(altered), expectedBlob);
  const record = JSON.parse(altered.toString("utf8"));
  assert.throws(() => projectStandingPathwayPublication(record, { sourceDigest: digest(altered) }),
    /enacted guidance/);
});


test("original Turntide Worker serves selected VICTOR linked-data bytes with the proper W3C media type", async () => {
  const bytes = await readFile(original);
  const record = JSON.parse(bytes.toString("utf8"));
  const resource = projectStandingPathwayPublication(record, {sourceDigest:digest(bytes)}).linkedData;
  const { default: worker } = await import("../worker.mjs");
  const request = new Request("https://turntide.561.group/" + resource.path);
  const served = [];
  const assets = {fetch: async incoming => {
    served.push(incoming);
    return new Response(resource.body, {status:200,headers:{"content-type":"application/octet-stream"}});
  }};
  const response = await worker.fetch(request, {ASSETS:assets});
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/ld+json; charset=utf-8");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(await response.text(), resource.body);
  assert.deepEqual(served, [request]);
  const missing = await worker.fetch(request, {ASSETS:{fetch: async () =>
    new Response("not found", {status:404,headers:{"content-type":"text/plain"}})}});
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get("content-type"), "text/plain");
  const unrelated = await worker.fetch(new Request("https://turntide.561.group/favicon.ico"), {
    ASSETS:{fetch:async () => new Response("png-ish", {headers:{"content-type":"image/png"}})},
  });
  assert.equal(unrelated.headers.get("content-type"), "image/png");
});


test("the original terrain reproduction file is present under source-owned scripts, not fabricated by a website", async () => {
  const bytes = await readFile(resolve(sourceRoot, "scripts/extract-terrain.py"));
  assert.equal(blob(bytes), "b306af737df904b6cff3e070bd0a465d8543bcf7",
    "the restored Python file must be the exact historically authored original source");
  const page = await readFile(resolve(site, "content/duluth-garden-drainage.md"), "utf8");
  assert.match(page, /\/research\/duluth-garden-drainage\/extract-terrain\.py/);
  const builder = await readFile(resolve(site, "scripts/derive-public.mjs"), "utf8");
  assert.match(builder, /path\.join\(civicRoot, 'scripts\/extract-terrain\.py'\)/);
});
