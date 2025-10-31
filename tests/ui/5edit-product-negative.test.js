import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

test.describe('Edit Product - Negative Cases', () => {

  test.beforeEach(async ({ page }) => {
    console.log('🟢 Login to Seller Center...');
    await login(page);
  });

  // ❌ CASE 1: Không nhập giá → phải báo lỗi hoặc không cho submit
  test('❌ Không nhập giá → báo lỗi ở ô giá', async ({ page }) => {
    console.log('🟢 Start: Không nhập giá');

    // 1️⃣ Chọn tab Active
    await page.locator('#rc-tabs-0-tab-active').click();
    await page.waitForTimeout(1500);

    // 2️⃣ Chờ table có hàng và chọn hàng đầu tiên
    await page.waitForSelector('.ant-spin.ant-spin-spinning', { state: 'detached', timeout: 20000 });
    const firstRow = page.locator('tbody tr:not(.ant-table-measure-row)').first();
    await expect(firstRow).toBeVisible({ timeout: 10000 });
    await firstRow.locator('a:has-text("Edit")').click();

    // 3️⃣ Chờ chuyển sang trang Edit Product
    await page.waitForURL(/\/portal\/product\//, { timeout: 15000 });
    console.log('✏️ Navigated to Edit Product page.');

    // 4️⃣ Xóa giá
    const priceInput = page.locator('input[name="saleInfo.price"]');
    await priceInput.scrollIntoViewIfNeeded();
    await priceInput.fill('');
    console.log('💰 Cleared price input');
    await page.waitForTimeout(1500);

    // 5️⃣ Kiểm tra nút Submit bị disable
    const submitButton = page.locator('button.ant-btn-primary:has-text("Submit")');
    await expect(submitButton).toBeDisabled();
    console.log('✅ Submit button is disabled as expected.');
    await page.waitForTimeout(1500);

    // 6️⃣ (Nếu có) Kiểm tra error hiển thị
    const priceError = page.locator('.ant-form-item-explain-error');
    if (await priceError.isVisible()) {
      await expect(priceError).toHaveText(/required|bắt buộc/i);
      console.log('⚠️ Price field shows required error.');
    } else {
      console.log('ℹ️ No visible error, but submit remains disabled.');
    }
  });

  // ❌ CASE 2: Không đổi thông tin → nút Save phải bị disable
  test('❌ Không đổi thông tin → nút Save disable', async ({ page }) => {
    console.log('🟢 Start: Không đổi thông tin');

    // 1️⃣ Chọn tab Active
    await page.locator('#rc-tabs-0-tab-active').click();
    await page.waitForTimeout(1500);

    // 2️⃣ Chờ table có hàng và chọn hàng đầu tiên
    await page.waitForSelector('.ant-spin.ant-spin-spinning', { state: 'detached', timeout: 20000 });
    const firstRow = page.locator('tbody tr:not(.ant-table-measure-row)').first();
    await expect(firstRow).toBeVisible({ timeout: 10000 });
    await firstRow.locator('a:has-text("Edit")').click();

    // 3️⃣ Chờ trang Edit Product
    await page.waitForURL(/\/portal\/product\//, { timeout: 15000 });
    console.log('✏️ Navigated to Edit Product page.');

    // 4️⃣ Không chỉnh sửa gì cả
    console.log('⚙️ No changes made.');
    await page.waitForTimeout(1500);

    // 5️⃣ Kiểm tra nút Submit bị disable
    const submitButton = page.locator('button.ant-btn-primary:has-text("Submit")');
    await expect(submitButton).toBeDisabled({ timeout: 10000 });
    console.log('✅ Save/Submit button correctly disabled.');
    await page.waitForTimeout(1500);
  });
});
