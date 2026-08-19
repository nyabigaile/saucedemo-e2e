import { test, expect } from '@playwright/test';

test('カートに入れた商品がカート画面にある', async ({ page }) => {
  //以下、学習用コメント。 現在は auth.setup.ts実行時の状態を保存。
  //const loginPage = new LoginPage(page);
  //await loginPage.goto();
  //await loginPage.login();

  // /inventory.html へのリクエストは 404 を返し、goto('/')でもリダイレクトはしなかった。
  // 画面の描画はされるため、このテストではこの問題を深追いしない。
  // なお、404 の原因は現在不明。
  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByTestId('title')).toHaveText('Products');

  //下記のコメントのように複数個所に該当する場合はエラー
  //await expect(page.getByText('Add to cart')).toBeVisible();

  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();

  await expect(page.getByTestId('title')).toHaveText('Your Cart');
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
});