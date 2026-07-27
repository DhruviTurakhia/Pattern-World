import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..");

const read = (file) => fs.readFileSync(path.join(projectRoot, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const sandbox = { window: {} };
vm.runInNewContext(read("curriculum-data.js"), sandbox);

const curriculum = sandbox.window.CURRICULUM;
const tracks = sandbox.window.LEARNING_TRACKS;
const patterns = JSON.parse(read("pattern-data.json"));
const html = read("index.html");

assert(Array.isArray(curriculum), "Curriculum data must be an array.");
assert(Array.isArray(tracks), "Learning tracks must be an array.");
assert(curriculum.length === 43, `Expected 43 concepts, found ${curriculum.length}.`);
assert(patterns.length === 83, `Expected 83 patterns, found ${patterns.length}.`);

const conceptIds = new Set();
const requiredConceptFields = [
  "id",
  "track",
  "level",
  "order",
  "title",
  "summary",
  "intuition",
  "points",
  "complexity",
  "pseudocode",
  "python",
  "related",
];

for (const concept of curriculum) {
  assert(!conceptIds.has(concept.id), `Duplicate concept id: ${concept.id}.`);
  conceptIds.add(concept.id);
  for (const field of requiredConceptFields) {
    assert(
      concept[field] !== undefined && concept[field] !== "",
      `${concept.id} is missing ${field}.`,
    );
  }
  assert(["dsa", "lld", "system"].includes(concept.track), `${concept.id} has an invalid track.`);
  assert(
    ["Basic", "Intermediate", "Advanced"].includes(concept.level),
    `${concept.id} has an invalid level.`,
  );
  assert(concept.points.length >= 3, `${concept.id} needs at least three memory cues.`);
}

for (const concept of curriculum) {
  for (const relatedId of concept.related) {
    assert(conceptIds.has(relatedId), `${concept.id} links to missing concept ${relatedId}.`);
  }
}

const expectedTrackCounts = { dsa: 16, lld: 12, system: 15 };
for (const [track, expected] of Object.entries(expectedTrackCounts)) {
  const actual = curriculum.filter((concept) => concept.track === track).length;
  assert(actual === expected, `Expected ${expected} ${track} concepts, found ${actual}.`);
}

const patternIds = new Set();
for (const pattern of patterns) {
  assert(!patternIds.has(pattern.id), `Duplicate pattern id: ${pattern.id}.`);
  patternIds.add(pattern.id);
  assert(pattern.verified === true, `${pattern.id} does not have a verified output.`);
  assert(fs.existsSync(path.join(projectRoot, pattern.path)), `Missing source: ${pattern.path}.`);
}

for (const asset of ["styles.css", "curriculum-data.js", "app.js", "pattern-data.json", "og.png"]) {
  assert(fs.existsSync(path.join(projectRoot, asset)), `Missing site asset: ${asset}.`);
}

for (const selector of [
  "data-concept-grid",
  "data-visual-stage",
  "data-pattern-grid",
  "data-concept-dialog",
  "data-pattern-dialog",
]) {
  assert(html.includes(selector), `index.html is missing ${selector}.`);
}

assert(
  html.includes("https://dhruviturakhia.github.io/Pattern-World/og.png"),
  "Open Graph image URL is missing.",
);

console.log("Pattern World verification passed.");
console.log(`  ${curriculum.length} concept guides across ${tracks.length} tracks`);
console.log(`  ${patterns.length} verified Python patterns`);
console.log("  Required site assets and interaction hooks are present");
