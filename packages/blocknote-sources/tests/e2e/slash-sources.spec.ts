import { expect, test } from '@playwright/test';

test.describe('@suitenumerique/blocknote-sources End-to-End Suite', () => {
  test('it displays sovereign sources in slash suggestion menu and inserts a law callout', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Open slash autocomplete menu
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    await page.keyboard.type('/loi');

    // 2. Select Légifrance suggestion
    const suggestionItem = page.getByText('Légifrance / Loi').first();
    await expect(suggestionItem).toBeVisible();
    await suggestionItem.click();

    // 3. Search popover must be visible with combobox role
    const searchInput = page.getByRole('combobox', {
      name: 'Search connected source',
    });
    await expect(searchInput).toBeVisible();

    // 4. Keyword search and keyboard confirmation
    await searchInput.fill('commande publique');
    await page.keyboard.press('Enter');

    // 5. Verify Marianne callout block is displayed
    await expect(
      page.getByText('Article L. 111-1 du Code de la commande publique'),
    ).toBeVisible();
    await expect(page.getByText('En vigueur')).toBeVisible();

    // 6. Switch to Card format
    const cardBtn = page.getByRole('button', { name: 'Card Format' });
    await cardBtn.click();
    await expect(page.getByText('Reference')).toBeVisible();

    // 7. Switch to Link format
    const linkBtn = page.getByRole('button', { name: 'Link Format' });
    await linkBtn.click();
    await expect(page.locator('a[href*="legifrance.gouv.fr"]')).toBeVisible();
  });
});
