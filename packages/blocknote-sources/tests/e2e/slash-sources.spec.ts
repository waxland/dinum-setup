import { expect, test } from '@playwright/test';

test.describe('@suitenumerique/blocknote-sources End-to-End Suite', () => {
  test('it displays sovereign sources in slash suggestion menu and inserts a law callout', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Déclencher l'insertion d'un bloc de loi via le bouton de preset
    const lawBtn = page.getByRole('button', { name: /loi/i }).first();
    if (await lawBtn.isVisible()) {
      await lawBtn.click();
    } else {
      const editor = page.locator('.ProseMirror, .bn-editor').first();
      await editor.click();
      await page.keyboard.type('/loi');
      await page.keyboard.press('Enter');
    }

    // 2. Le popover de recherche doit être visible avec le rôle combobox
    const searchInput = page.getByRole('combobox', {
      name: 'Rechercher une source souveraine',
    });
    await expect(searchInput).toBeVisible();

    // 3. Recherche par mot-clé et validation au clavier
    await searchInput.fill('commande publique');
    await page.keyboard.press('Enter');

    // 4. Vérifier que le bloc Encadré Marianne est affiché
    await expect(
      page.getByText('Article L. 111-1 du Code de la commande publique').first(),
    ).toBeVisible();
    await expect(page.getByText('En vigueur').first()).toBeVisible();

    // 5. Basculer vers le format Carte
    const cardBtn = page.getByRole('button', { name: 'Format Carte / Card' }).first();
    if (await cardBtn.isVisible()) {
      await cardBtn.click();
      await expect(page.getByText('Référence').first()).toBeVisible();
    }

    // 6. Basculer vers le format Lien
    const linkBtn = page.getByRole('button', { name: 'Format Pastille / Lien' }).first();
    if (await linkBtn.isVisible()) {
      await linkBtn.click();
      await expect(page.locator('a[href*="legifrance.gouv.fr"]').first()).toBeVisible();
    }
  });
});
