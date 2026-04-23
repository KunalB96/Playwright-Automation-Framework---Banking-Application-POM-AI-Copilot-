import { test, expect } from "../fixtures/TestFixture";
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

import config from '../config.json';
import transferData from '../test-data/Transfer_TestData.json';

test('Verify Quick Transactions Flow', async ({ page, loginPage, homePage, quickTransactionPage, transactionHistoryPage }) => {

    let txnRef: string;

    await test.step('Login to the application', async () => {
        await loginPage.login(config.username, config.password, config.appName);
    });

    await test.step('Home Page Verification', async () => {
        await homePage.verifyHeading();
        await homePage.verifyWelcomeMessage();
    });

    await test.step('Quick Transaction Flow', async () => {
        await homePage.clickQuickTransactions();
        await quickTransactionPage.selectTransactionType(transferData.transactionType);
        await quickTransactionPage.fillAmount(transferData.amount.toString());
        await quickTransactionPage.fillTransferToAccount(transferData.transferToAccount);
        await quickTransactionPage.fillDescription(transferData.description);
        await quickTransactionPage.submitTransaction();
        await quickTransactionPage.confirmTransaction();
        txnRef = await quickTransactionPage.getTransactionReference();
        expect(txnRef).toMatch(/TXN-\d+/);
    });

    await test.step('Transaction History Verification', async () => {
        await transactionHistoryPage.clickViewHistory();
        await transactionHistoryPage.verifyTransactionReference(txnRef);
    });
});

test('Verify tab names in the homepage', async ({ page, loginPage, homePage, }) => {

    await test.step('Login to the application', async () => {
        await loginPage.login(config.username, config.password, config.appName);
    });

    await test.step('Home Page Verification', async () => {
        await homePage.verifyHeading();
        await homePage.verifyWelcomeMessage();
    });

    await test.step('Check that Transfers & Bill Payment tabs are visible', async () => {
        await expect(page.getByRole('button', { name: 'Transfers' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Bill Payments' })).toBeVisible();
    });
});