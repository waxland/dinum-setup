import { expect, test } from '@playwright/test';

test.describe('@suitenumerique/blocknote-sources End-to-End Suite', () => {
  test('it displays sovereign sources in slash suggestion menu and inserts a law callout', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Trigger insertion of a law block via preset button or slash command
    const lawBtn = page.getByRole('button', { name: /loi/i }).first();
    if (await lawBtn.isVisible()) {
      await lawBtn.click();
    } else {
      const editor = page.locator('.ProseMirror, .bn-editor').first();
      await editor.click();
      await page.keyboard.type('/loi');
      await page.keyboard.press('Enter');
    }

    // 2. Search popover must be visible with combobox role
    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();

    // 3. Keyword search and keyboard confirmation
    await searchInput.fill('commande publique');
    await page.keyboard.press('Enter');

    // 4. Verify Marianne callout block is displayed
    await expect(
      page.getByText('Article L. 111-1 du Code de la commande publique').first(),
    ).toBeVisible();
    await expect(page.getByText('En vigueur').first()).toBeVisible();

    // 5. Switch to Card format
    const cardBtn = page.getByRole('button', { name: /Card/i }).first();
    if (await cardBtn.isVisible()) {
      await cardBtn.click();
      await expect(page.getByText(/Reference|Référence/i).first()).toBeVisible();
    }

    // 6. Switch to Link format
    const linkBtn = page.getByRole('button', { name: /Link|Lien/i }).first();
    if (await linkBtn.isVisible()) {
      await linkBtn.click();
      await expect(page.locator('a[href*="legifrance.gouv.fr"]').first()).toBeVisible();
    }
  });
});
