// Task 1 - JSON data-driven registration test
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const REGISTRATION_URL = 'https://automationteststore.com/index.php?rt=account/create';
const TEST_DATA_PATH = path.join(__dirname, '..', 'test-data', 'testdata.json');

// Test data lives in JSON, not in the test logic.
const testData = JSON.parse(fs.readFileSync(TEST_DATA_PATH, 'utf-8'));

// Maps each JSON key to the form field's name attribute on the page.
const fieldMap = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'email',
  telephone: 'telephone',
  fax: 'fax',
  company: 'company',
};

test.describe('Registration - JSON data-driven', () => {
  test('registration form is populated from testdata.json', async ({ page }) => {
    await page.goto(REGISTRATION_URL);

    // Fill every field dynamically from the JSON data.
    for (const [key, fieldName] of Object.entries(fieldMap)) {
      const input = page.locator(`input[name="${fieldName}"]`).first();
      await input.fill(testData[key]);
    }

    // Verify each entered value is shown in its field.
    for (const [key, fieldName] of Object.entries(fieldMap)) {
      await expect(
        page.locator(`input[name="${fieldName}"]`).first(),
        `value of "${fieldName}" should match testdata.json "${key}"`
      ).toHaveValue(testData[key]);
    }
  });
});
