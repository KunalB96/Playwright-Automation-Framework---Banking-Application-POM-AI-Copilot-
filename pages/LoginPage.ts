import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '[name="username"]';
  private passwordInput = '[name="password"]';
  private appNameSelect = '[name="app"]';
  private loginButton = 'button:has-text("Login")';

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async selectApp(appName: string): Promise<void> {
    await this.page.getByLabel('App Name:').selectOption(appName);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByRole('button', { name: 'Login' }).click();
    // Wait for the banking app to load
    await this.page.getByRole('heading', { name: /Sample Banking Application/ }).waitFor({ timeout: 20000 });
  }

  async login(username: string, password: string, appName: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.selectApp(appName);
    await this.clickLogin();
  }
}