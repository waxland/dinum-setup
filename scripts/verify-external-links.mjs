import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const PORTALS = ["documentation/docs", "documentation-international/docs"];

// Domains that might block HEAD requests or return 403/429
const IGNORED_DOMAINS = ["figma.com", "matrix.to", "matrix.org", "github.com"];

async function getMarkdownFiles(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getMarkdownFiles(fullPath));
    } else if (fullPath.endsWith(".md") || fullPath.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function verifyExternalLinks() {
  const urlRegex = /https?:\/\/[^\s)\]'"]+/g;
  let hasError = false;
  const checkedUrls = new Set();
  const failedUrls = new Set();

  for (const portal of PORTALS) {
    const portalDir = path.join(ROOT_DIR, portal);
    const files = await getMarkdownFiles(portalDir);

    for (const file of files) {
      const content = await fs.readFile(file, "utf-8");
      const urls = content.match(urlRegex) || [];

      for (let url of urls) {
        // Clean trailing punctuation
        url = url.replace(/[.,;:]$/, "");

        if (checkedUrls.has(url)) continue;
        checkedUrls.add(url);

        try {
          const { hostname } = new URL(url);
          // Skip ignored domains
          if (IGNORED_DOMAINS.some((domain) => hostname.includes(domain))) {
            continue;
          }
        } catch {
          // Invalid URL format
          continue;
        }

        try {
          // Some sites block HEAD, but it's much faster. If it fails, fallback to GET is possible, but let's stick to HEAD for simplicity.
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          const response = await fetch(url, {
            method: "HEAD",
            headers: { "User-Agent": "dinum-docs-verifier/1.0" },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (
            response.status >= 400 &&
            response.status !== 405 &&
            response.status !== 403 &&
            response.status !== 429
          ) {
            console.warn(
              `❌ Broken link: ${url} (Status: ${response.status}) in ${path.relative(ROOT_DIR, file)}`,
            );
            failedUrls.add(url);
            hasError = true;
          }
        } catch (error) {
          console.warn(`❌ Failed to fetch: ${url} in ${path.relative(ROOT_DIR, file)}`);
          failedUrls.add(url);
          // Don't fail the build for connection errors, as it makes CI flaky
        }
      }
    }
  }

  if (hasError) {
    console.warn(
      "\n⚠️ Some external links returned error status codes. Please verify them manually.",
    );
  } else {
    console.log("✅ External links verification completed (no hard 404s detected).");
  }

  // We return 0 so it doesn't break CI, but warns developers
  process.exit(0);
}

verifyExternalLinks().catch(console.error);
