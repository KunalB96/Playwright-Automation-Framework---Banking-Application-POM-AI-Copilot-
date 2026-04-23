# Page Object Model - Banking Application Test Suite

## Overview
This document outlines the Page Object Model (POM) design pattern implementation for the Banking Application test suite.

## Directory Structure
```
Playwright Banking Project/
├── pages/
│   ├── BasePage.ts                    # Base class with common methods
│   ├── LoginPage.ts                   # Login page interactions
│   ├── HomePage.ts                    # Home page interactions
│   ├── QuickTransactionPage.ts        # Quick Transactions page interactions
│   └── TransactionHistoryPage.ts      # Transaction History page interactions
├── tests/
│   ├── banking-test.spec.ts           # Main test using POM
│   └── example.spec.ts
└── playwright.config.ts
```

## Page Objects Description

### 1. BasePage.ts
**Purpose**: Base class containing common actions used across all pages

**Key Methods**:
- `navigateTo(url)` - Navigate to a specific URL
- `waitForElement(selector, timeout)` - Wait for element visibility
- `clickElement(selector)` - Click on an element
- `fillInput(selector, value)` - Fill input field
- `getText(selector)` - Get text content
- `isElementVisible(selector)` - Check element visibility
- `waitForTimeout(ms)` - Wait for specified time

**Usage**: Extended by all other page classes

---

### 2. LoginPage.ts
**Purpose**: Handle login interactions and authentication

**Key Methods**:
- `fillUsername(username)` - Fill username field using Role-based locator
- `fillPassword(password)` - Fill password field using Role-based locator
- `selectApp(appName)` - Select application from dropdown (Banking/Default)
- `clickLogin()` - Click Login button with wait for page load
- `login(username, password, appName)` - Combined login method (recommended)

**Selectors Used**:
- Username: `getByRole('textbox', { name: 'Username' })`
- Password: `getByRole('textbox', { name: 'Password' })`
- App Name: `getByLabel('App Name:')`
- Login Button: `getByRole('button', { name: 'Login' })`

**Special Feature**: Auto-waits for "Sample Banking Application" heading after login

---

### 3. HomePage.ts
**Purpose**: Handle banking home page interactions

**Key Methods**:
- `verifyHeading()` - Verify page heading is visible
- `verifyWelcomeMessage()` - Verify welcome message
- `clickQuickTransactions()` - Click Quick Transactions link
- `isLoaded()` - Check if home page is loaded

**Selectors Used**:
- Heading: `getByRole('heading', { name: /Sample Banking Application/ })`
- Welcome: `locator('text=Welcome to the Testers Talk Banking Application')`
- Quick Transactions Link: `getByRole('link', { name: /Quick Transactions/ })`

---

### 4. QuickTransactionPage.ts
**Purpose**: Handle Quick Transactions form interactions

**Key Methods**:
- `selectTransactionType(type)` - Select transaction type (Transfer, Withdrawal, Deposit)
- `fillAmount(amount)` - Fill transaction amount
- `fillTransferToAccount(account)` - Fill transfer to account number
- `fillDescription(description)` - Fill transaction description
- `submitTransaction()` - Submit form and wait for confirmation
- `confirmTransaction()` - Confirm transaction and wait for success
- `fillTransactionForm(amount, account, description)` - Combined form filling
- `getTransactionReference()` - Extract transaction reference from success page
- `isConfirmationVisible()` - Check if confirmation page is visible
- `isSuccessVisible()` - Check if success page is visible

**Selectors Used**:
- Transaction Type: `getByLabel('Transaction Type:')`
- Amount: `locator('#transactionAmount')`
- Transfer Account: `getByLabel('Transfer to Account:')`
- Description: `getByLabel('Description:')`
- Submit Button: `getByRole('button', { name: 'Submit' })`
- Confirm Button: `getByRole('button', { name: 'Confirm' })`
- Success Reference: `locator('#successReference')`

---

### 5. TransactionHistoryPage.ts
**Purpose**: Handle Transaction History page interactions

**Key Methods**:
- `clickViewHistory()` - Click View History button and wait for history to load
- `verifyTransactionReference(reference)` - Verify transaction reference in history
- `verifyTransactionDetails(account, amount)` - Verify transaction details
- `isHistoryVisible()` - Check if history page is visible

**Selectors Used**:
- View History Button: `getByRole('button', { name: 'View History' })`
- History Heading: `getByRole('heading', { name: /Transaction History/ })`

---

## Test Execution Flow

### Test: "Verify Quick Transactions Flow"

1. **Navigate to Application**
   - Uses LoginPage.navigateTo()
   - Verifies page title

2. **Login**
   - Uses LoginPage.login() with credentials
   - Auto-waits for home page to load

3. **Verify Home Page**
   - Uses HomePage.verifyHeading()
   - Uses HomePage.verifyWelcomeMessage()

4. **Navigate to Quick Transactions**
   - Uses HomePage.clickQuickTransactions()
   - Waits for Quick Transactions heading

5. **Fill Transaction Form**
   - Uses QuickTransactionPage.fillTransactionForm()
   - Amount: $500
   - Transfer To: 9876543210
   - Description: Test Transfer

6. **Submit Transaction**
   - Uses QuickTransactionPage.submitTransaction()
   - Waits for confirmation page

7. **Verify Confirmation**
   - Verifies transaction details on confirmation page
   - Uses QuickTransactionPage.confirmTransaction()
   - Waits for success page

8. **Capture Transaction Reference**
   - Uses QuickTransactionPage.getTransactionReference()
   - Extracts reference from page content

9. **Navigate to Transaction History**
   - Uses TransactionHistoryPage.clickViewHistory()
   - Waits for history page to load

10. **Verify in History**
    - Uses TransactionHistoryPage.verifyTransactionReference()
    - Uses TransactionHistoryPage.verifyTransactionDetails()

---

## Best Practices Implemented

1. **Separation of Concerns**: Each page object handles only its own interactions
2. **Reusable Methods**: BasePage contains common methods used across pages
3. **Role-Based Locators**: Uses `getByRole()` for better accessibility
4. **Explicit Waits**: Built-in waits after navigation and form submission
5. **Error Handling**: Methods throw meaningful errors if elements not found
6. **Type Safety**: Full TypeScript implementation with proper typing
7. **DRY Principle**: Eliminates duplicate code through inheritance

---

## Test Results

✅ All 3 tests passing (Chromium, Firefox, WebKit)
- Total Duration: ~49.2 seconds
- Transaction References Captured:
  - TXN-1776839807208-518
  - TXN-1776839833838-608
  - TXN-1776839843309-980

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific test
npx playwright test tests/banking-test.spec.ts

# Run with headed mode (see browser)
npx playwright test tests/banking-test.spec.ts --headed

# Run with UI mode
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

---

## Future Enhancements

1. Add more transaction types (Withdrawal, Deposit)
2. Add negative test scenarios
3. Add data-driven tests with multiple transaction amounts
4. Add error handling verification
5. Add API integration tests
6. Add performance monitoring
7. Add accessibility testing
8. Add visual regression testing

