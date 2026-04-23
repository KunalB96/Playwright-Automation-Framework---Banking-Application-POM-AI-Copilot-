import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  private viewHistoryButton = 'button:has-text("View History")';
  private historyHeading = 'h2:has-text("Transaction History")';

  constructor(page: Page) {
    super(page);
  }

  async clickViewHistory(): Promise<void> {
    await this.page.getByRole('button', { name: 'View History' }).click();
    await this.page.getByRole('heading', { name: /Transaction History/ }).waitFor();
  }

  async verifyTransactionReference(reference: string): Promise<void> {
    const historySection = this.page.locator('text=Transaction History').locator('..');
    await historySection.getByText(reference).waitFor();
  }

  async verifyTransactionDetails(account: string, amount: string): Promise<void> {
    const historySection = this.page.locator('text=Transaction History').locator('..');
    await historySection.getByText(`Transfer to ${account}`).waitFor();
    await historySection.getByText(amount).waitFor();
  }

  async isHistoryVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Transaction History/ }).isVisible();
  }
}