# Part Assignment 5 - Playwright Test Framework

## Setup
```bash
npm install
npx playwright install chromium
```

## Task 1 - JSON data-driven registration
Data lives in `test-data/testdata.json`; the test in `tests/registration.spec.js` reads it.
```bash
npm run test:registration
```

## Task 2 - Retries and flaky tests
Configured in `playwright.config.js` (`retries: 2` in CI). Written explanation: `docs/WRITTEN_ANSWERS.md`.

## Task 3 - Tagged login tests
Tests are grouped under `test.describe('QA Brains Login Module')` with a `beforeEach` hook.
```bash
npm run test:smoke       # @smoke
npm run test:regression  # @regression
npm run test:sanity      # @sanity
npm run test:login       # all login tests
```
Set real credentials before running the valid-login test:
```bash
QA_EMAIL=you@example.com QA_PASSWORD=yourpassword npm run test:smoke
```

## Task 4 - ExcelJS
```bash
npm run excel:sample   # creates data/Obsqura Testing.xlsx with sample rows
npm run excel:read     # prints every cell of Sheet1
```
Replace the sample file with your own `Obsqura Testing.xlsx` if you have one.

## Task 5 - Assertions and debugging
Written explanation in `docs/WRITTEN_ANSWERS.md`. Debug commands:
```bash
npx playwright test --debug
npx playwright test --headed
```
