import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login.js';

test.describe('Add Product - Negative Cases - Seller Center UAT', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  // 1️⃣ Product Name trống
  test('❌ Product Name trống', async ({ page }) => {
    console.log('🚫 Start: Product Name Empty');

    await page.getByRole('button', { name: 'plus Add a new Product', exact: true }).click();

    // Upload ảnh
    const imagePath = 'assets/sample.jpg';
    await page.setInputFiles('input[type="file"]', imagePath);

    // Chọn Category (đúng như UI thật)
    await page.getByRole('textbox', { name: /Please set category/i }).click();
    await page.getByText('Fashion', { exact: true }).click();
    await page.getByText('Women Clothes', { exact: true }).click();
    await page.getByText('Wedding Dresses', { exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    // Description dài >100 ký tự
    const longDescEn =
      'This is a very long English description used to test validation for empty product name field. It has more than one hundred characters to ensure passing length rules.';
    const longDescTh =
      'นี่คือคำอธิบายภาษาไทยที่ยาวกว่าหนึ่งร้อยตัวอักษร เพื่อทดสอบกรณีที่ชื่อสินค้าเว้นว่างไว้ และยังคงให้ผ่านการตรวจสอบความยาวของคำอธิบาย.';

    await page.locator('#form-item-basicInfo\\.descriptionEn .editor-input').fill(longDescEn);
    await page.locator('#form-item-basicInfo\\.descriptionTh .editor-input').fill(longDescTh);

    // Brand
    await page.locator('#form-item-specificationInfo\\.brand .ant-select').click();
    await page.getByText('Alice (Alice)', { exact: true }).click();

    // Sales Info
    await page.locator('input[name="saleInfo.price"]').fill('300');
    await page.locator('#stock').fill('1000');

    // Warehouse
    await page.locator('div.ant-select[name="saleInfo.pickup_address"] .ant-select-selector').click();
    await page.getByText('NGUYEN TUONG VI', { exact: true }).click();

    // Shipping
    await page.locator('input[name="shippingInfo.weight"]').fill('300');
    await page.getByRole('spinbutton', { name: /^W/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^L/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^H/i }).fill('20');

    // Submit
    await page.getByRole('button', { name: /^Submit/i }).click();

    // ✅ Check lỗi hiển thị "This field cannot be empty"
const error = page.getByText(/This field cannot be empty/i).first();
await expect(error).toBeVisible({ timeout: 7000 });
  });

  // 2️⃣ Price âm
  test('❌ Price âm', async ({ page }) => {
    console.log('🚫 Start: Negative Price');

    await page.getByRole('button', { name: 'plus Add a new Product', exact: true }).click();

    const imagePath = 'assets/sample.jpg';
    await page.setInputFiles('input[type="file"]', imagePath);

    const productName = `NegativePrice_${Date.now()}`;
    await page.locator('input[name="basicInfo.nameEn"]').fill(productName);
    await page.locator('input[name="basicInfo.nameTh"]').fill(productName);

    await page.getByRole('textbox', { name: /Please set category/i }).click();
    await page.getByText('Fashion', { exact: true }).click();
    await page.getByText('Women Clothes', { exact: true }).click();
    await page.getByText('Wedding Dresses', { exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    const longDescEn =
      'This is a long English description for testing negative price validation, ensuring that the form is filled correctly but with invalid price.';
    const longDescTh =
      'คำอธิบายภาษาไทยที่ยาวมากกว่าสิบบรรทัดเพื่อให้ผ่านการตรวจสอบความยาว แต่ราคาเป็นค่าติดลบเพื่อตรวจสอบการแจ้งเตือนข้อผิดพลาด.';

    await page.locator('#form-item-basicInfo\\.descriptionEn .editor-input').fill(longDescEn);
    await page.locator('#form-item-basicInfo\\.descriptionTh .editor-input').fill(longDescTh);

    await page.locator('#form-item-specificationInfo\\.brand .ant-select').click();
    await page.getByText('Alice (Alice)', { exact: true }).click();

    await page.locator('input[name="saleInfo.price"]').fill('-300');
    await page.locator('#stock').fill('1000');

    await page.locator('div.ant-select[name="saleInfo.pickup_address"] .ant-select-selector').click();
    await page.getByText('NGUYEN TUONG VI', { exact: true }).click();

    await page.locator('input[name="shippingInfo.weight"]').fill('300');
    await page.getByRole('spinbutton', { name: /^W/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^L/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^H/i }).fill('20');

    await page.getByRole('button', { name: /^Submit/i }).click();

    // ✅ Kiểm tra "Price must be greater than 0"
    const error = page.getByText(/Price must be greater than/i);
    await expect(error).toBeVisible({ timeout: 7000 });
  });

  // 3️⃣ Không upload hình
  test('❌ Không upload hình', async ({ page }) => {
    console.log('🚫 Start: No Image Uploaded');

    await page.getByRole('button', { name: 'plus Add a new Product', exact: true }).click();

    const productName = `NoImage_${Date.now()}`;
    await page.locator('input[name="basicInfo.nameEn"]').fill(productName);
    await page.locator('input[name="basicInfo.nameTh"]').fill(productName);

    await page.getByRole('textbox', { name: /Please set category/i }).click();
    await page.getByText('Fashion', { exact: true }).click();
    await page.getByText('Women Clothes', { exact: true }).click();
    await page.getByText('Wedding Dresses', { exact: true }).click();
    await page.getByRole('button', { name: 'OK' }).click();

    const longDescEn =
      'This is a description for testing missing image case, ensuring the form validation shows proper error for missing product image.';
    const longDescTh =
      'นี่คือคำอธิบายสำหรับการทดสอบกรณีไม่มีการอัปโหลดภาพสินค้า เพื่อให้ระบบแสดงข้อความแจ้งเตือนอย่างถูกต้อง.';

    await page.locator('#form-item-basicInfo\\.descriptionEn .editor-input').fill(longDescEn);
    await page.locator('#form-item-basicInfo\\.descriptionTh .editor-input').fill(longDescTh);

    await page.locator('#form-item-specificationInfo\\.brand .ant-select').click();
    await page.getByText('Alice (Alice)', { exact: true }).click();

    await page.locator('input[name="saleInfo.price"]').fill('300');
    await page.locator('#stock').fill('1000');

    await page.locator('div.ant-select[name="saleInfo.pickup_address"] .ant-select-selector').click();
    await page.getByText('NGUYEN TUONG VI', { exact: true }).click();

    await page.locator('input[name="shippingInfo.weight"]').fill('300');
    await page.getByRole('spinbutton', { name: /^W/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^L/i }).fill('20');
    await page.getByRole('spinbutton', { name: /^H/i }).fill('20');

    await page.getByRole('button', { name: /^Submit/i }).click();

    // ✅ Kiểm tra "Image is missing"
    const error = page.getByText(/Image is missing/i);
    await expect(error).toBeVisible({ timeout: 7000 });
  });
});
