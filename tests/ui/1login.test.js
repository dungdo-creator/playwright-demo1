import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

test('Login success', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/portal\/product\/list/i);
});