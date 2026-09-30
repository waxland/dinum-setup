import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("BlockNote Sources Size Constraints", () => {
  it("should be reasonably small", () => {
    const distPath = path.resolve(__dirname, "../dist/index.js");

    // Fallback if not built yet
    if (!fs.existsSync(distPath)) {
      return;
    }

    const stats = fs.statSync(distPath);
    // 150 KB max uncompressed
    expect(stats.size).toBeLessThan(150 * 1024);
  });
});
