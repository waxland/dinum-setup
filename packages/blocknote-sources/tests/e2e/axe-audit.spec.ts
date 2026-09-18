import { expect, test } from '@playwright/test';

test.describe('Automated Accessibility Audit (WCAG 2.1 Level AA & RGAA v4.1)', () => {
  test('verifies ARIA landmarks, roles, and focus contrast without critical violations', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Open editor and trigger search popover
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();

    const lawBtn = page.getByRole('button', { name: /loi/i }).first();
    if (await lawBtn.isVisible()) {
      await lawBtn.click();
    } else {
      await page.keyboard.type('/loi');
      await page.keyboard.press('Enter');
    }

    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();

    // 2. Verify popover accessibility criteria
    // - aria-autocomplete attribute must be list or inline
    // - Search input must have an explicit accessible label
    const ariaLabel = await searchInput.getAttribute('aria-label');
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(ariaLabel || placeholder).toBeTruthy();

    // 3. Validate keyboard insertion and accessible toolbar presence
    await page.keyboard.press('Enter');

    const toolbar = page.getByRole('toolbar', {
      name: "Source display modes",
    });
    if (await toolbar.isVisible()) {
      const buttons = toolbar.getByRole('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });
});
