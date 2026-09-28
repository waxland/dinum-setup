import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Remediation Assessment and Migration Notes (R-08.03)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("verifies existence and completeness of docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md", () => {
    const assessmentPath = path.join(rootDir, "docs/MIGRATION_AND_REMEDIATION_ASSESSMENT.md");
    expect(fs.existsSync(assessmentPath)).toBe(true);

    const content = fs.readFileSync(assessmentPath, "utf-8");
    expect(content).toContain("Remediations & Migration Assessment");

    // Verify all 18 audit IDs (AUD-001 to AUD-018) are documented
    for (let i = 1; i <= 18; i++) {
      const audId = `AUD-${String(i).padStart(3, "0")}`;
      expect(content, `Assessment document missing ${audId}`).toContain(audId);
    }
  });

  it("verifies historical AUDIT.md remains preserved and untouched", () => {
    const auditPath = path.join(rootDir, "AUDIT.md");
    expect(fs.existsSync(auditPath)).toBe(true);

    const content = fs.readFileSync(auditPath, "utf-8");
    expect(content).toContain("Audit & Révision des Titres de Navigation");
    expect(content).toContain("Portail International");
    expect(content).toContain("Portail National FR");
  });
});
