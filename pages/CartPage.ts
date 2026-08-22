import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly title: Locator;
  private readonly itemNames: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectItems(names: string[]) {
    await expect(this.itemNames).toHaveText(names);
  }
}