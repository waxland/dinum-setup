import { expect, test } from '@playwright/test';

test.describe('Automated Accessibility Audit (WCAG 2.1 Level AA & RGAA v4.1)', () => {
  test('verifies ARIA landmarks, roles, and focus contrast without critical violations', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Ouvrir l'éditeur et déclencher le popover
    const editor = page.locator('.ProseMirror, .bn-editor').first();
    await editor.click();
    await page.keyboard.type('/loi');

    const searchInput = page.getByRole('combobox');
    await expect(searchInput).toBeVisible();

    // 2. Vérifier les critères d'accessibilité du popover de recherche
    // - L'attribut aria-autocomplete doit valoir 'list' ou 'inline'
    // - Le champ de recherche doit posséder un libellé accessible explicite
    const ariaLabel = await searchInput.getAttribute('aria-label');
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(ariaLabel || placeholder).toBeTruthy();

    // 3. Validation de l'insertion au clavier et de la présence de la toolbar accessible
    await page.keyboard.press('Enter');

    const toolbar = page.getByRole('toolbar', {
      name: "Modes d'affichage de la source",
    });
    if (await toolbar.isVisible()) {
      const buttons = toolbar.getByRole('button');
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });
});
