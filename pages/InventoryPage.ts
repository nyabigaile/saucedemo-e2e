import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly title: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  // /inventory.html へのリクエストは 404 を返し、goto('/')でもリダイレクトはしなかった。
  // 画面の描画はされるため、このテストではこの問題を深追いしない。
  // なお、404 の原因は現在不明。
  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.title).toHaveText('Products');
  }

  async addToCart(testId: string) {
    await this.page.getByTestId(testId).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink.click();
  }
}