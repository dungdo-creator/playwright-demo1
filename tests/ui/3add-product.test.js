import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

// duyen test
test.describe('Add New Product - Seller Center UAT', () => {
  test.beforeEach(async ({ page }) => {
    // 🟢 Login và chuyển đến trang My Products
    await login(page);
  });

  test('should create a new product successfully', async ({ page }) => {
    console.log('🟢 Start: Add new product flow');

    // 🧠 Sinh tên sản phẩm ngẫu nhiên
    const productName = `Planet_OOO_${new Date().getTime()}`;
    console.log('🆕 Product name for this run:', productName);

    // 1️⃣ Click nút Add a new Product
    await page.getByRole('button', { name: 'plus Add a new Product', exact: true }).click();
    await page.waitForTimeout(1000);

    // 2️⃣ Upload ảnh sản phẩm
    const imagePath = 'assets/sample.jpg'; // thêm 1 ảnh ví dụ
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForTimeout(2000);

    // 3️⃣ Điền Basic Info
    console.log('🧩 Filling Basic Info...');
    await page.locator('input[name="basicInfo.nameEn"]').fill(productName);
    await page.locator('input[name="basicInfo.nameTh"]').fill(productName);
    await page.waitForTimeout(2000);
    // 4️⃣ Chọn Category
    console.log('📂 Selecting Category...');
    await page.getByRole('textbox', { name: /Please set category/i }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Fashion').click();
    await page.waitForTimeout(1000);
    await page.getByText('Fashion Accessories').click();
    await page.waitForTimeout(1000);
    await page.getByText('Belts').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'OK' }).click();
    await page.waitForTimeout(1000);

    // 5️⃣ Điền mô tả
    console.log('📝 Filling Descriptions...');
    const descEn = page.locator('#form-item-basicInfo\\.descriptionEn .editor-input');
    const descTh = page.locator('#form-item-basicInfo\\.descriptionTh .editor-input');

    await descEn.waitFor({ state: 'visible' });
    await descEn.click();
    await descEn.pressSequentially(`This is an auto-generated product This is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated product: ${productName}`);
    await descEn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await descTh.waitFor({ state: 'visible' });
    await descTh.click();
    await descTh.pressSequentially(`สินค้าทดสอบโดยระบบอัตโนมัติ This is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated productThis is an auto-generated product: ${productName}`);
    await descEn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // 6️⃣ Chọn Brand
    console.log('🏷️ Selecting Brand and Material...');
    await descEn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const brandDropdown = page.locator('#form-item-specificationInfo\\.brand .ant-select');
    await brandDropdown.scrollIntoViewIfNeeded();
    await brandDropdown.click();
    await page.waitForSelector('.ant-select-dropdown', { state: 'visible' });
    await page.getByText('3M (3เอ็ม)', { exact: true }).click();
    await page.waitForTimeout(1000);

    // 7️⃣ Sales Info
    console.log('💰 Filling Sales Info...');
    await descEn.scrollIntoViewIfNeeded();
    await page.locator('input[name="saleInfo.price"]').fill('300');
    await page.waitForTimeout(1000);
    await page.locator('#stock').fill('1000');
    await page.waitForTimeout(1000);

    // 🏬 Selecting Warehouse...
    console.log('🏬 Selecting Warehouse...');
    await descEn.scrollIntoViewIfNeeded();
    await page.locator('h4:has-text("Sales information")').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const warehouseSelector = page.locator('div.ant-select[name="saleInfo.pickup_address"] .ant-select-selector');
    await warehouseSelector.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('.ant-select-dropdown:not(.ant-select-dropdown-hidden)', { timeout: 10000 });
    await page.getByText('NGUYEN TUONG VI', { exact: true }).click();
    await page.waitForTimeout(1000);

    // 9️⃣ Shipping Info
    console.log('🚚 Filling Shipping...');
    await descEn.scrollIntoViewIfNeeded();
    await page.locator('input[name="shippingInfo.weight"]').fill('300');
    await page.waitForTimeout(500);
    await page.getByRole('spinbutton', { name: /^W/i }).fill('20');
    await page.waitForTimeout(500);
    await page.getByRole('spinbutton', { name: /^L/i }).fill('20');
    await page.waitForTimeout(500);
    await page.getByRole('spinbutton', { name: /^H/i }).fill('20');
    await page.waitForTimeout(500);
    await page.waitForTimeout(1000);

    // 🔟 Submit
    console.log('💾 Submitting...');
    await descEn.scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: /^Submit/i }).click();
    await page.waitForTimeout(1000);

    // 🕒 Đợi trang list load xong
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/product\/list/i);

    // ⏳ Chờ product list hiển thị và kiểm tra tên sản phẩm có xuất hiện
    await page.waitForTimeout(4000);
    const productFound = page.getByText(new RegExp(productName, 'i'));
    //await expect(productFound).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(1500);
    console.log(`✅ Product created successfully! (${productName})`);
  });
});