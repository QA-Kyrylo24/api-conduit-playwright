# API Test Automation with Playwright

API test automation framework for testing Conduit API endpoints using Playwright.

## 🛠 Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory with required credentials:
```properties
API_BASE_URL=https://conduit-api.learnwebdriverio.com/api
EMAIL=your_email@example.com
PASSWORD=your_password
CONDUIT_USERNAME=your_username
```

## 🚀 Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/1_users.spec.ts
```

Run tests by tag:
```bash
npx playwright test --grep @user
```

## 📁 Project Structure

```
├── tests/                  # Test files
├── controllers/           # API controllers
├── fixtures/             # Test fixtures and factories
└── utils/                # Helper utilities
```

## 🏷 Test Tags

- `@user` - User management tests
- `@smoke` - TBD
- `@regression` - TBD