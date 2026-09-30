import { execSync } from "child_process";
import { describe, expect, it } from "vitest";
import path from "path";

describe("Documentation Routes & Navigation", () => {
  it("should run the verify-docs-routes.mjs script successfully without broken links", () => {
    const scriptPath = path.resolve(__dirname, "../../../../scripts/verify-docs-routes.mjs");
    try {
      const output = execSync(`node "${scriptPath}"`, { encoding: "utf-8" });
      expect(output).toContain("All docs routes and absolute links are valid");
    } catch (error) {
      console.error(error.stdout);
      console.error(error.stderr);
      throw new Error("verify-docs-routes.mjs failed: " + error.message);
    }
  });
});
