import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lockfilePath = path.join(__dirname, "..", "pnpm-lock.yaml");
if (fs.existsSync(lockfilePath)) {
  console.error(
    "❌ ERROR: pnpm-lock.yaml found! This monorepo uses npm strictly. Please remove it and use npm install.",
  );
  process.exit(1);
}
