// Task 3 - Login module with Smoke / Regression / Sanity tags
const { test, expect } = require('@playwright/test');

const LOGIN_URL = 'https://practice.qabrains.com/ecommerce/login';

// Credentials come from environment variables, with the site's sample account as fallback.
const VALID_PASSWORD = process.env.QA_PASSWORD || 'Password123';

// Locators
const emailInput = (page) => page.locator('#email');
const passwordInput = (page) => page.locator('#password');
const loginButton = (page) => page.getByRole('button', { name: /login/i });

test.describe('QA Brains Login Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(passwordInput(page)).toBeVisible();
  });

  test('Valid login redirects the user to the account page @smoke @login', async ({ page }) => {
    await emailInput(page).fill('practice@qabrains.com');
    await passwordInput(page).fill(VALID_PASSWORD);
    await loginButton(page).click();

    await expect(page).toHaveURL('https://practice.qabrains.com/ecommerce');
  });

  test('Invalid credentials show an error message @regression @login', async ({ page }) => {
    await emailInput(page).fill('wrong.user@example.com');
    await passwordInput(page).fill('WrongPass@999');
    await loginButton(page).click();

    await expect(page.getByText('Neither email nor password matched')).toBeVisible();
  });

  test('Empty email shows a validation message @sanity @login', async ({ page }) => {
    await emailInput(page).fill('');
    await passwordInput(page).fill(VALID_PASSWORD);
    await loginButton(page).click();

    const emailValid = await emailInput(page).evaluate((el) => el.checkValidity());
    if (!emailValid) {
      const message = await emailInput(page).evaluate((el) => el.validationMessage);
      expect(message.length).toBeGreaterThan(0);
    } else {
      await expect(page.getByText(/required/i)).toBeVisible();
    }
    await expect(page).toHaveURL(/\/login/);
  });
});