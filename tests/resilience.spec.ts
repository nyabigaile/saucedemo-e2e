import { test } from '@playwright/test';
import { setTimeout as sleep } from 'node:timers/promises';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

/**
 * テストの待機設計を検証する。
 * 画面表示が何らかの理由で遅延していても値を確認できることを検証する。
 * 実行に時間がかかるためCIからは除外する。
 */
test.describe('低速回線下での動作 @slow', () => {
  const delayTime = 3000;

  test.beforeEach(async ({ page }) => {
    await page.route('**/*', async (route) => {
      await sleep(delayTime);
      await route.continue();
    });
  });

  test('遅延があってもカートに商品を追加できる', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.goto();
    await inventoryPage.expectLoaded();

    await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');
    await inventoryPage.expectCartCount(1);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItems(['Sauce Labs Backpack']);
  });
});