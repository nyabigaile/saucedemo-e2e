import { test, expect } from '@playwright/test';

test('ログアウトする', async ({ page }) => {
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

  await page.locator('#react-burger-menu-btn').click();
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  await page.locator('#logout_sidebar_link').click();

  await expect(page.getByTestId('login-button')).toBeVisible();
  await page.goBack();
  await expect(page.getByTestId('error')).toHaveText(
    'Epic sadface: You can only access \'/inventory.html\' when you are logged in.'
  );
});