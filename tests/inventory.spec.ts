import { test, expect } from '@playwright/test';

test('商品一覧が規定数、規定順序で表示される', async ({ page }) => {
  // /inventory.html へのリクエストは 404 を返し、goto('/')でもリダイレクトはしなかった。
  // 画面の描画はされるため、このテストではこの問題を深追いしない。
  // なお、404 の原因は現在不明。
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByTestId('title')).toHaveText('Products');
  //下記のように記述することで、商品名だけでなく、商品に過不足がないこと、順序まで確認できる。
  await expect(page.getByTestId('inventory-item-name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]);
});