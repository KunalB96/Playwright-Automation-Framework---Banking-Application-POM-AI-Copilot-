import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async clickViewHistory(): Promise<void> {
    await this.page.getByRole('button', { name: 'View History' }).click();

    // wait for heading (stable)
    await expect(
      this.page.getByRole('heading', { name: /Transaction History/ })
    ).toBeVisible();
  }

  async verifyTransactionReference(reference: string): Promise<void> {
    // wait for the reference to appear in visible area
    await expect(
      this.page.locator(`text=${reference}`).first()
    ).toBeVisible({ timeout: 10000 });
  }

  async verifyTransactionDetails(account: string, amount: string): Promise<void> {
    await expect(
      this.page.getByText(`Transfer to ${account}`).first()
    ).toBeVisible();

    await expect(
      this.page.getByText(amount).first()
    ).toBeVisible();
  }

  async isHistoryVisible(): Promise<boolean> {
    return await this.page
      .getByRole('heading', { name: /Transaction History/ })
      .isVisible();
  }
}
