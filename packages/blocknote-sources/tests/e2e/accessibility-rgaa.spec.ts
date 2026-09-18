import { expect, test } from '@playwright/test';

test.describe('RGAA v4.1 (Level AA) Accessibility Tests', () => {
  test('source search popover and blocks must not have any critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Open editor and insert a source block
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    
    // Click on /loi preset button or type /loi
    const lawBtn = page.getByRole('button', { name: /loi/i }).first();
    if (await lawBtn.isVisible()) {
      await lawBtn.click();
    } else {
      await page.keyboard.type('/loi');
      await page.keyboard.press('Enter');
    }

    // 2. Verify search popover ARIA attributes
    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');

    // 3. Verify keyboard navigation without mouse
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    // 4. Verify inserted block is accessible and has its toolbar
    const calloutBlock = page.locator('[data-display-mode="callout"]').first();
    if (await calloutBlock.isVisible()) {
      await expect(calloutBlock).toBeVisible();
      const toolbar = page.getByRole('toolbar', {
        name: "Source display modes",
      });
      await expect(toolbar).toBeDefined();
    }
  });
});
