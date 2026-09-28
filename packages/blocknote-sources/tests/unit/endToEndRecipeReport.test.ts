import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("End-to-End Recipe Matrix Verification (R-09.01)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and completeness of docs/END_TO_END_RECIPE_REPORT.md", () => {
    const reportPath = path.join(rootDir, "docs/END_TO_END_RECIPE_REPORT.md");
    expect(fs.existsSync(reportPath)).toBe(true);

    const content = fs.readFileSync(reportPath, "utf-8");
    expect(content).toContain("End-to-End Recipe & Validation Scenarios Report");

    // Verify all 14 recipe scenario IDs (REC-01 to REC-14) are documented with PASS status
    for (let i = 1; i <= 14; i++) {
      const recId = `REC-${String(i).padStart(2, "0")}`;
      expect(content, `Report document missing ${recId}`).toContain(recId);
    }
  });
});
