import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

test('カートに入れた商品がカート画面にある', async ({ page }) => {
  //以下、学習用コメント。 現在は auth.setup.ts実行時の状態を保存。
  //const loginPage = new LoginPage(page);
  //await loginPage.goto();
  //await loginPage.login();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
  await inventoryPage.expectLoaded();

  //下記のコメントのように複数個所に該当する場合はエラー
  //await expect(page.getByText('Add to cart')).toBeVisible();

  await inventoryPage.addToCart('add-to-cart-sauce-labs-backpack');
  await inventoryPage.expectCartCount(1);
  await inventoryPage.openCart();

  await expect(page.getByTestId('title')).toHaveText('Your Cart');
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
});