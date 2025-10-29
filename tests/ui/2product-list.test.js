import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

let pageInstance;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  pageInstance = await context.newPage();
  await login(pageInstance);
  console.log('✅ Login success, ready for next steps!');
});

test('Navigate → Search product', async () => {
  await pageInstance.goto('https://uat-seller-center.amaze-x.com/portal/product/list', {
    waitUntil: 'networkidle',
  });
  await expect(pageInstance.locator('h3.ant-typography', { hasText: 'My Products' })).toBeVisible();

  const searchBox = pageInstance.locator('input[placeholder*="Please input at least first 2 characters"]');
  await searchBox.fill('Galaxyy 123');
  await pageInstance.getByRole('button', { name: 'Search' }).click();
  await pageInstance.waitForTimeout(2000);
  await expect(pageInstance.getByText('Galaxyy 123', { exact: false })).toBeVisible();
});