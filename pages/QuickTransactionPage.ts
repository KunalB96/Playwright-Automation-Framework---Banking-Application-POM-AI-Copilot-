import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
  private transactionTypeSelect = 'select[name="transactionType"]';
  private amountInput = '#transactionAmount';
  private transferToAccountInput = 'input[name="transferToAccount"]';
  private descriptionInput = 'input[name="description"]';
  private submitButton = 'button:has-text("Submit")';
  private confirmButton = 'button:has-text("Confirm")';
  private confirmationHeading = 'h2:has-text("Transaction Confirmation")';
  private successHeading = 'h2:has-text("Transaction Successful")';

  constructor(page: Page) {
    super(page);
  }

  async selectTransactionType(type: string): Promise<void> {
    await this.page.getByLabel('Transaction Type:').selectOption(type);
    await this.waitForTimeout(800); // Wait for dynamic fields
  }

  async fillAmount(amount: string): Promise<void> {
    const amountField = this.page.locator('#transactionAmount');
    await amountField.waitFor();
    await amountField.fill(amount);
  }

  async fillTransferToAccount(account: string): Promise<void> {
    await this.page.getByLabel('Transfer to Account:').fill(account);
  }

  async fillDescription(description: string): Promise<void> {
    await this.page.getByLabel('Description:').fill(description);
  }

  async submitTransaction(): Promise<void> {
    await this.page.getByRole('button', { name: 'Submit' }).click();
    await this.page.getByRole('heading', { name: /Transaction Confirmation/ }).waitFor();
  }

  async confirmTransaction(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await this.page.getByRole('heading', { name: /Transaction Successful/ }).waitFor();
  }

  async fillTransactionForm(amount: string, transferAccount: string, description: string): Promise<void> {
    await this.selectTransactionType('Transfer');
    await this.fillAmount(amount);
    await this.fillTransferToAccount(transferAccount);
    await this.fillDescription(description);
  }

  async getTransactionReference(): Promise<string> {
    const refElement = this.page.locator('#successReference');
    await refElement.waitFor();
    const reference = await refElement.textContent();
    return reference?.trim() || '';
  }

  async isConfirmationVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Transaction Confirmation/ }).isVisible();
  }

  async isSuccessVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Transaction Successful/ }).isVisible();
  }
}