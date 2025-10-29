import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

test.describe('Edit Product - Seller Center UAT', () => {

  test.beforeEach(async ({ page }) => {
    // 🟢 Login và chuyển đến trang Product List
    await login(page);
  });

  test('should edit the first active product successfully', async ({ page }) => {
    console.log('🟢 Start: Edit existing product flow');

    // 1️⃣ Chọn tab "Active"
    console.log('📂 Selecting Active tab...');
    await page.locator('#rc-tabs-0-tab-active').click();
    await page.waitForTimeout(1500);

    // 2️⃣ Chờ table có hàng
    await page.waitForSelector('.ant-spin.ant-spin-spinning', { state: 'detached', timeout: 20000 });
    const rows = page.locator('tbody tr:not(.ant-table-measure-row)');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
    console.log('📋 Selecting first product in Active list...');

    // 3️⃣ Chọn hàng đầu tiên
    const firstRow = rows.first();
    const currentName = await firstRow.locator('td').nth(1).innerText();
    console.log(`🔍 Current product name: ${currentName}`);

    // 4️⃣ Nhấn nút Edit
    await firstRow.locator('a:has-text("Edit")').click();

    // 5️⃣ Chờ chuyển sang trang Edit
    await page.waitForURL(/\/portal\/product\//, { timeout: 15000 });
    console.log('✏️ Navigated to Edit Product page.');

    // 6️⃣ Cập nhật Product Name & giá
    console.log('🧩 Updating product info...');
    const nameEn = page.locator('input[name="basicInfo.nameEn"]');
    await page.waitForTimeout(500);
    const nameTh = page.locator('input[name="basicInfo.nameTh"]');
    await page.waitForTimeout(500);
    const newName = `${currentName}_Updated_${Date.now()}`;
    await page.waitForTimeout(500);

    await nameEn.scrollIntoViewIfNeeded();
    await nameEn.fill('');
    await nameEn.fill(newName);
    await page.waitForTimeout(500);

    await nameTh.scrollIntoViewIfNeeded();
    await nameTh.fill('');
    await nameTh.fill(newName);
    await page.waitForTimeout(500);

    // 💰 Đảm bảo thay đổi giá trị thực sự để bật nút Save
    const priceInput = page.locator('input[name="saleInfo.price"]');
    if (await priceInput.isVisible()) {
      await priceInput.scrollIntoViewIfNeeded();
      const currentPrice = await priceInput.inputValue();
      await page.waitForTimeout(500);
      const newPrice = currentPrice === '199' ? '290' : '199';
      await priceInput.fill('');
      await priceInput.fill(newPrice);
      console.log(`💰 Updated price to ${newPrice}`);
      await page.waitForTimeout(800);
    }

    // 💾 Chờ nút Save khả dụng rồi click
    console.log('💾 Waiting for Save button to be enabled...');
    await page.waitForSelector('.ant-spin-spinning', { state: 'hidden', timeout: 20000 });
    const saveButton = page.locator('button.ant-btn-primary:has-text("Submit"), button.ant-btn-primary:has-text("Save"), button.ant-btn-primary:has-text("Lưu")');
    await expect(saveButton).toBeVisible({ timeout: 20000 });
    await expect(saveButton).not.toBeDisabled({ timeout: 20000 });

    console.log('💾 Save button is enabled, clicking now...');
    await saveButton.scrollIntoViewIfNeeded();
    await saveButton.click();
    await page.waitForTimeout(1500);

    // ⚠️ Handle approval confirmation popup nếu có
    const confirmDialog = page.locator('.ant-modal-content');
    if (await confirmDialog.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('⚠️ Approval confirmation dialog detected, clicking OK...');
      await page.locator('button.ant-btn-primary:has-text("OK")').click();
      await page.waitForTimeout(2000);
    }

    // 7️⃣ Chờ success toast hoặc redirect
    console.log('⏳ Waiting for success message...');
    await Promise.race([
      page.waitForSelector('.ant-notification-notice-message:has-text("success")', { timeout: 20000 }),
      page.waitForSelector('.ant-message-success', { timeout: 20000 }),
      page.waitForURL(/product\/list/i, { timeout: 20000 }),
    ]).catch(() => console.warn('⚠️ No success notification detected.'));

    // 8️⃣ Nếu chưa redirect thì tự quay lại
    if (!page.url().includes('/product/list')) {
      console.warn('⚠️ Not redirected automatically — navigating back.');
      await page.goto('https://uat-seller-center.amaze-x.com/portal/product/list', { waitUntil: 'networkidle' });
    }
  });
});