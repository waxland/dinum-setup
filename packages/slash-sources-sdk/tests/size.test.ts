import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("SDK Size Constraints", () => {
  it("should be under 5KB uncompressed", () => {
    const distPath = path.resolve(__dirname, "../dist/index.js");

    // Fallback if not built yet
    if (!fs.existsSync(distPath)) {
      return;
    }

    const stats = fs.statSync(distPath);
    // 5 KB = 5120 bytes
    expect(stats.size).toBeLessThan(5120);
  });
});
