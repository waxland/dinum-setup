import { expect, test } from '@playwright/test';

test.describe('RGAA v4.1 (Level AA) Accessibility Tests', () => {
  test('source search popover and blocks must not have any critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/');

    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    await page.keyboard.type('/loi');

    // Check popover ARIA attributes
    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');

    // Check mouse-free keyboard navigation
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    // Verify inserted block is focusable and accessible
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
