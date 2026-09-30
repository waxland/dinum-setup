import { test, expect } from "@playwright/test";

test.describe("ACT-008: High Contrast Mode (forced-colors)", () => {
  test.use({ colorScheme: "dark" }); // Just set scheme, playwright doesn't natively toggle forced-colors easily without CDP or emulation

  test("should emulate forced-colors and ensure outline is present on callouts", async ({
    page,
  }) => {
    // Emulate forced-colors: active
    await page.emulateMedia({ colorScheme: "dark", forcedColors: "active" });

    await page.goto("/");

    // Focus the editor
    await page.locator(".bn-editor").click();
    await page.waitForTimeout(500);

    // Trigger Slasher
    await page.keyboard.type("/loi");

    const popover = page.getByRole("combobox");
    await expect(popover).toBeVisible();

    // Select the first item to insert a Callout
    await page.keyboard.press("Enter");

    // Wait for insertion
    await page.waitForTimeout(500);

    // Assert that outline is rendered using CanvasText (or any forced-colors active solid outline)
    // In CSS, forced-colors: active overrides var(--high-contrast-outline) to CanvasText
    const callout = page.locator("div[style*='border-left']").first();
    await expect(callout).toBeVisible();

    const outlineValue = await callout.evaluate((node) => {
      const style = window.getComputedStyle(node);
      return style.outline;
    });

    // Just verifying that outline is not 'none' or '0px'
    // Playwright evaluates it as e.g. "rgb(255, 255, 255) solid 2px" or "0px none rgb(255, 255, 255)"
    expect(outlineValue).not.toContain("0px none");
    expect(outlineValue).toContain("solid");
  });
});
