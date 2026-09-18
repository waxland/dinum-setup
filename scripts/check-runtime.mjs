import { readFileSync } from "node:fs";

const required = readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim();
const minimum = required.split(".").map(Number);
const actual = process.versions.node.split(".").map(Number);
const difference = actual.map((part, index) => part - minimum[index]).find((part) => part !== 0);
if (difference < 0) {
  process.stderr.write(`Node ${required} or newer is required; found ${process.versions.node}. Run nvm install && nvm use.\n`);
  process.exit(1);
}
