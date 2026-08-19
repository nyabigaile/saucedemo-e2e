import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

setup('ログイン状態を保存する', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  await page.context().storageState({ path: '.auth/user.json' });
});