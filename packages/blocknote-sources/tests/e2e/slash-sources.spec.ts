import { expect, test } from '@playwright/test';

test('searches, selects with the keyboard and changes the inserted block format', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Réinitialiser', exact: true }).click();
  await page.getByRole('button', { name: '/loi', exact: true }).click();
  const input = page.getByRole('combobox', { name: 'Rechercher une source' });
  await expect(input).toBeFocused();
  await input.fill('commande');
  const option = page.getByRole('option').filter({ hasText: 'Article L. 111-1' });
  await expect(option).toBeVisible();
  await expect(input).toHaveAttribute('aria-activedescendant', await option.getAttribute('id') || 'missing');
  await input.press('Enter');
  await expect(input).toHaveCount(0);
  await expect(page.getByText('Article L. 111-1 du Code de la commande publique', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Demonstration', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Carte', exact: true }).click();
  await page.getByRole('button', { name: 'Lien', exact: true }).click();
  await expect(page.locator('a[href*="legifrance.gouv.fr"]').first()).toBeVisible();
});

test('changing country preserves existing text and passes the country to search', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Réinitialiser', exact: true }).click();
  const editor = page.locator('.tiptap[contenteditable="true"]');
  await editor.press('ControlOrMeta+End');
  await editor.pressSequentially('Texte a conserver');
  await page.getByRole('radio', { name: 'France', exact: true }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('radio', { name: 'Canada', exact: true })).toBeChecked();
  await expect(editor).toContainText('Texte a conserver');
  await page.getByRole('button', { name: '/canlaw', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Pays', exact: true })).toHaveValue('ca');
  await page.getByRole('combobox', { name: 'Rechercher une source' }).fill('PIPEDA');
  await expect(page.getByRole('listbox')).toContainText(/PIPEDA/);
  await page.getByRole('combobox', { name: 'Rechercher une source' }).press('Escape');
  await expect(page.getByRole('region', { name: 'Recherche de sources' })).toHaveCount(0);
  await expect(editor).toBeFocused();
  await expect(editor).toContainText('Texte a conserver');
});
