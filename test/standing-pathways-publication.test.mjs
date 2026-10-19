import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { projectStandingPathwayPublication } from "../../../src/governance/receiving.mjs";

const site = resolve(import.meta.dirname, "..");
const expectedBlob = "b8730793aa6f9aceb7f624f1cb0bc262335668d5";
const original = resolve(site, "../../data/records/governance/standing-pathways.json");
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
  assert.match(md, /No.*governance.*power/i);
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
