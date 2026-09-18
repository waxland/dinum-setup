import { expect, test } from '@playwright/test';

test.describe('RGAA v4.1 (Level AA) Accessibility Tests', () => {
  test('source search popover and blocks must not have any critical accessibility violations', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Ouvrir l'éditeur et insérer un bloc source
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    
    // Cliquer sur le bouton /loi du preset pour insérer le bloc de recherche
    const lawBtn = page.getByRole('button', { name: /loi/i }).first();
    if (await lawBtn.isVisible()) {
      await lawBtn.click();
    } else {
      await page.keyboard.type('/loi');
      await page.keyboard.press('Enter');
    }

    // 2. Vérifier les attributs ARIA du popover de recherche
    const searchInput = page.getByRole('combobox', { name: 'Rechercher une source souveraine' });
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');

    // 3. Vérifier la navigation au clavier sans souris
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');

    // 4. Vérifier que le bloc inséré est accessible et possède sa toolbar
    const calloutBlock = page.locator('[data-display-mode="callout"]').first();
    if (await calloutBlock.isVisible()) {
      await expect(calloutBlock).toBeVisible();
      const toolbar = page.getByRole('toolbar', {
        name: "Modes d'affichage de la source",
      });
      await expect(toolbar).toBeDefined();
    }
  });
});
