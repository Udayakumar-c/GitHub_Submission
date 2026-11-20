const { test, expect } = require('@playwright/test');

test.describe('QA Brains Login Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.qabrains.com/ecommerce/login');
  });

  test('Valid login redirects to account page @smoke @login', async ({ page }) => {
    await page.locator('#email').fill('practice@qabrains.com');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://practice.qabrains.com/ecommerce');
  });

  test('Invalid credentials show error message @regression @login', async ({ page }) => {
    await page.locator('#email').fill('wrong@example.com');
    await page.locator('#password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Neither email nor password matched')).toBeVisible();
  });

  test('Empty email shows validation message @sanity @login', async ({ page }) => {
    await page.locator('#email').fill('');
    await page.locator('#password').fill('Password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('required', { exact: false })).toBeVisible();
  });

});