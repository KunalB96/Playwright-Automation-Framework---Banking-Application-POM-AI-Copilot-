import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private headingSelector = 'h1:has-text("Sample Banking Application")';
  private welcomeMessageSelector = 'p:has-text("Welcome to the Testers Talk Banking Application")';
  private quickTransactionsLink = 'a:has-text("💳 Quick Transactions")';

  constructor(page: Page) {
    super(page);
  }

  async verifyHeading(): Promise<void> {
    await this.page.getByRole('heading', { name: /Sample Banking Application/ }).waitFor();
  }

  async verifyWelcomeMessage(): Promise<void> {
    await this.page.locator('text=Welcome to the Testers Talk Banking Application').waitFor();
  }

  async clickQuickTransactions(): Promise<void> {
    await this.page.getByRole('link', { name: /Quick Transactions/ }).click();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Sample Banking Application/ }).isVisible();
  }
}