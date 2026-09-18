import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [1280, 390]) {
  for (const dark of [false, true]) {
  test(`search palette passes Axe at ${width}px, dark=${dark}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    if (dark) { await page.getByRole('button', { name: 'Thème sombre', exact: true }).click(); }
    await page.getByRole('button', { name: 'Réinitialiser', exact: true }).click();
    await page.getByRole('button', { name: '/loi', exact: true }).click();
    await page.getByRole('combobox', { name: 'Rechercher une source' }).fill('commande');
    await expect(page.getByRole('listbox')).toContainText('Article L. 111-1');
    const results = await new AxeBuilder({ page }).include('section[aria-label="Recherche de sources"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    const palette = page.getByRole('region', { name: 'Recherche de sources' });
    const bounds = await palette.boundingBox();
    expect(bounds).not.toBeNull();
    expect((bounds?.x || 0) + (bounds?.width || 0)).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `test-results/palette-${width}-${dark ? 'dark' : 'light'}.png`, fullPage: true });
  });
  }
}
