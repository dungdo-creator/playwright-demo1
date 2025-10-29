import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('API Test - Get Product List', () => {
  test('should return active product list successfully', async ({ request }) => {
    const response = await request.get(
      'https://uat-api-seller.amaze-x.com/catalog/api/v2/product?page=1&promotion_detail=true&size=12&normal_price_history=true&price_off_history=true&list_type=active',
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: `Bearer ${process.env.TOKEN}`,
          'x-language-key': 'en',
          'x-shop-id': process.env.SHOP_ID,
          'x-user-id': process.env.USER_ID,
        },
      }
    );

    // 🧩 Kiểm tra response
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log('✅ API returned:', data);

    // Ví dụ kiểm tra có sản phẩm trong list
    expect(Array.isArray(data.data)).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);
  });
});
