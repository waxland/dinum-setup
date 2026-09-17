import { expect, test } from '@playwright/test';

test.describe('@suitenumerique/blocknote-sources End-to-End Suite', () => {
  test('it displays sovereign sources in slash suggestion menu and inserts a law callout', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Ouvrir le menu d'autocomplétion slash
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    await page.keyboard.type('/loi');

    // 2. Sélectionner la suggestion Légifrance
    const suggestionItem = page.getByText('Légifrance / Loi').first();
    await expect(suggestionItem).toBeVisible();
    await suggestionItem.click();

    // 3. Le popover de recherche doit être visible avec le rôle combobox
    const searchInput = page.getByRole('combobox', {
      name: 'Rechercher une source souveraine',
    });
    await expect(searchInput).toBeVisible();

    // 4. Recherche par mot-clé et validation au clavier
    await searchInput.fill('commande publique');
    await page.keyboard.press('Enter');

    // 5. Vérifier que le bloc Encadré Marianne est affiché
    await expect(
      page.getByText('Article L. 111-1 du Code de la commande publique'),
    ).toBeVisible();
    await expect(page.getByText('En vigueur')).toBeVisible();

    // 6. Basculer vers le format Carte
    const cardBtn = page.getByRole('button', { name: 'Format Carte / Card' });
    await cardBtn.click();
    await expect(page.getByText('Référence')).toBeVisible();

    // 7. Basculer vers le format Lien
    const linkBtn = page.getByRole('button', { name: 'Format Pastille / Lien' });
    await linkBtn.click();
    await expect(page.locator('a[href*="legifrance.gouv.fr"]')).toBeVisible();
  });
});
