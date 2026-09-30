import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// This script initializes Husky and sets up commitlint
try {
  console.log("Setting up Husky and commitlint...");

  // Create package.json configuration for commitlint if not present
  const pkgPath = path.resolve("package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  let modified = false;
  if (!pkg.devDependencies["@commitlint/cli"]) {
    console.log("Installing commitlint dependencies...");
    execSync("npm install --save-dev @commitlint/cli @commitlint/config-conventional husky", {
      stdio: "inherit",
    });
    modified = true;
  }

  // Create commitlint.config.cjs
  const commitlintConfigPath = path.resolve("commitlint.config.cjs");
  if (!fs.existsSync(commitlintConfigPath)) {
    fs.writeFileSync(
      commitlintConfigPath,
      `module.exports = { extends: ['@commitlint/config-conventional'] };\n`,
    );
  }

  // Setup husky
  if (!fs.existsSync(path.resolve(".husky"))) {
    execSync("npx husky init", { stdio: "inherit" });
  }

  // Add commit-msg hook
  const hookPath = path.resolve(".husky", "commit-msg");
  fs.writeFileSync(hookPath, `npx --no -- commitlint --edit "\${1}"\n`);

  console.log("✅ commitlint and husky setup completed.");
} catch (e) {
  console.error("❌ Failed to setup commitlint:", e.message);
  process.exit(1);
}
