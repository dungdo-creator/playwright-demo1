import { test as base } from '@playwright/test';

// Tạo base test có sẵn login
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://uat-seller-center.amaze-x.com/auth/sign-in');
    await page.fill('#normal_login_username', 'dung.do.kyanon.1');
    await page.fill('#normal_login_password', 'l9gP329TV2K<');
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/);

    // Cho test khác dùng page này
    await use(page);
  },
});

export { expect } from '@playwright/test';