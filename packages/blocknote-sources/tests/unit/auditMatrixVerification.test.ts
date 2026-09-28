import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Audit Matrix and PLAN_ACTIONS.md Completion Verification (R-09.03)", () => {
  const rootDir = path.resolve(__dirname, "../../../..");
  const planPath = path.join(rootDir, "PLAN_ACTIONS.md");

  it("verifies PLAN_ACTIONS.md exists and is readable", () => {
    expect(fs.existsSync(planPath)).toBe(true);
  });

  it("verifies all 18 audit findings (AUD-001 to AUD-018) in section 3.3 are marked as 'Validé'", () => {
    const content = fs.readFileSync(planPath, "utf-8");

    for (let i = 1; i <= 18; i++) {
      const audId = `AUD-${String(i).padStart(3, "0")}`;
      // Ensure each AUD finding line in section 3.3 table contains 'Validé'
      const audRegex = new RegExp(`\\|\\s*${audId}\\s*\\|.*\\|\\s*Validé`, "i");
      expect(content, `Finding ${audId} in section 3.3 matrix is not marked as Validé`).toMatch(
        audRegex,
      );
    }
  });

  it("verifies all R-01 to R-09.03 roadmap tasks in PLAN_ACTIONS.md are checked [x]", () => {
    const content = fs.readFileSync(planPath, "utf-8");

    const expectedRTasks = [
      "R-01.01",
      "R-01.02",
      "R-01.03",
      "R-01.04",
      "R-01.05",
      "R-01.06",
      "R-01.07",
      "R-02.01",
      "R-02.02",
      "R-02.03",
      "R-02.04",
      "R-02.05",
      "R-02.06",
      "R-02.07",
      "R-02.08",
      "R-03.01",
      "R-03.02",
      "R-03.03",
      "R-03.04",
      "R-03.05",
      "R-03.06",
      "R-03.07",
      "R-03.08",
      "R-03.09",
      "R-04.01",
      "R-04.02",
      "R-04.03",
      "R-04.04",
      "R-04.05",
      "R-04.06",
      "R-05.01",
      "R-05.02",
      "R-05.03",
      "R-05.04",
      "R-05.05",
      "R-05.06",
      "R-06.01",
      "R-06.02",
      "R-06.03",
      "R-06.04",
      "R-06.05",
      "R-06.06",
      "R-06.07",
      "R-07.01",
      "R-07.02",
      "R-07.03",
      "R-07.04",
      "R-07.05",
      "R-07.06",
      "R-07.07",
      "R-08.01",
      "R-08.02",
      "R-08.03",
      "R-08.04",
      "R-08.05",
      "R-09.01",
      "R-09.02",
      "R-09.03",
    ];

    for (const rTask of expectedRTasks) {
      const rRegex = new RegExp(`- \\[x\\] \\*\\*${rTask}\\*\\*`);
      expect(content, `Task ${rTask} in PLAN_ACTIONS.md is not checked [x]`).toMatch(rRegex);
    }
  });
});
