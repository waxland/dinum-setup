import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const tagArg = process.argv[2] || process.env.GITHUB_REF_NAME || "v1.0.0";
const expectedVersion = tagArg.replace(/^v/, "").trim();

console.log(
  `🔍 Verifying tag version '${tagArg}' (expected package version: '${expectedVersion}')...`,
);

const sdkPkgPath = path.join(ROOT_DIR, "packages/slash-sources-sdk/package.json");
const blocknotePkgPath = path.join(ROOT_DIR, "packages/blocknote-sources/package.json");
const djangoPyprojectPath = path.join(ROOT_DIR, "packages/django-lasuite-sources/pyproject.toml");

const sdkPkg = JSON.parse(fs.readFileSync(sdkPkgPath, "utf-8"));
const blocknotePkg = JSON.parse(fs.readFileSync(blocknotePkgPath, "utf-8"));
const djangoPyproject = fs.readFileSync(djangoPyprojectPath, "utf-8");

const djangoMatch = djangoPyproject.match(/version\s*=\s*"([^"]+)"/);
const djangoVersion = djangoMatch ? djangoMatch[1] : null;

let errors = 0;

if (sdkPkg.version !== expectedVersion) {
  console.error(
    `❌ Mismatch in slash-sources-sdk package.json: expected '${expectedVersion}', found '${sdkPkg.version}'`,
  );
  errors++;
} else {
  console.log(`✓ slash-sources-sdk package.json matches version '${sdkPkg.version}'`);
}

if (blocknotePkg.version !== expectedVersion) {
  console.error(
    `❌ Mismatch in blocknote-sources package.json: expected '${expectedVersion}', found '${blocknotePkg.version}'`,
  );
  errors++;
} else {
  console.log(`✓ blocknote-sources package.json matches version '${blocknotePkg.version}'`);
}

if (djangoVersion !== expectedVersion) {
  console.error(
    `❌ Mismatch in django-lasuite-sources pyproject.toml: expected '${expectedVersion}', found '${djangoVersion}'`,
  );
  errors++;
} else {
  console.log(`✓ django-lasuite-sources pyproject.toml matches version '${djangoVersion}'`);
}

if (errors > 0) {
  console.error(`❌ Tag/version verification failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(`✅ All package versions match tag '${tagArg}'. Release version coherence confirmed!`);
