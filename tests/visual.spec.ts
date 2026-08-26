import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test('ビジュアルリグレッションテスト', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();

    await page.getByTestId('inventory-item-sauce-labs-backpack-img').click();
    await expect(page.getByRole('button', { name: 'Back to products' })).toBeVisible();
    await expect(page).toHaveScreenshot('sauce-labs-backpack-detail.png');
  });