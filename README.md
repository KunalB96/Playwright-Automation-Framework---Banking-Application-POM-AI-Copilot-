📌 Project Title
# Playwright Automation Framework - Banking Application (POM + AI Copilot)

📖 Description
This project demonstrates an end-to-end test automation framework built using Playwright with TypeScript for a Banking Application.
The framework follows the Page Object Model (POM) design pattern and integrates AI-assisted development using GitHub Copilot to accelerate test creation and improve code quality.


🛠 Tech Stack
- Playwright (TypeScript)
- Node.js
- Page Object Model (POM)
- GitHub Copilot (AI-assisted development)
- JSON (Test Data & Config Management)

  
📂 Project Structure
project-root/
│── tests/
│   └── banking-test.spec.ts
│
│── pages/
│   ├── LoginPage.ts
│   ├── HomePage.ts
│   ├── QuickTransactionPage.ts
│   └── TransactionHistoryPage.ts
│
│── test-data/
│   └── Transfer_TestData.json
│
│── config.json
│── playwright.config.ts


✅ Features Implemented
- End-to-End Transaction Flow Automation
- Page Object Model (Reusable Components)
- Data-driven testing using JSON
- Config-based environment handling
- Parallel test execution
- Dynamic transaction validation
- Robust locator strategy (avoiding flaky tests)

  
🧪 Test Scenarios
1. Verify Quick Transaction Flow
   - Login
   - Perform transfer
   - Capture transaction reference
   - Validate in transaction history

2. Verify Home Page Tab Names
   - Validate all available tabs after login

     
▶️ How to Run Tests
# Install dependencies
npm install

# Run tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Debug mode
npx playwright test --debug


📊 Key Highlights
- Built scalable automation framework from scratch
- Applied best practices for locator strategy and synchronization
- Implemented parallel execution for faster test runs
- Reduced flakiness by handling dynamic UI elements

  
🤖 AI Usage (Important – makes your project stand out)
GitHub Copilot was used to:
- Generate Page Object classes
- Suggest locator strategies
- Improve test structure and readability
- Speed up development process
