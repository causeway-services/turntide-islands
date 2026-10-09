import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { test } from "node:test";

const root = resolve(import.meta.dirname, "..");

test("Turntide reports only received Tidepool public projection state", async () => {
  const products = await readFile(resolve(root, "content", "products.md"), "utf8");
  assert.match(products, /No current authoritative pool disclosure has\s+yet been received by the public projection/u);
  assert.match(products, /does not infer whether\s+the underlying pool has admitted members or closed cycles/u);
  assert.doesNotMatch(products, /current source records empty roster and\s+cycle lists/u);
});
