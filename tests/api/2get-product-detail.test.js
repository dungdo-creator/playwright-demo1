import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test.describe('API Test - Get Product Detail', () => {
  test('should get product detail successfully', async ({ request }) => {
    // ✅ Dùng ID dạng UUID
    const productId = '69bdc8e0-4ba9-443f-97ea-4a19ad0f7919';
    const url = `https://uat-api-seller.amaze-x.com/catalog/api/v2/product/${productId}?shop_id=${process.env.SHOP_ID}`;

    const response = await request.get(url, {
      headers: {
        accept: 'application/json, text/plain, */*',
        authorization: `Bearer ${process.env.TOKEN}`,
        'x-language-key': 'en',
        'x-shop-id': process.env.SHOP_ID,
        'x-user-id': process.env.USER_ID,
      },
    });

    console.log('🔍 Request URL:', url);
    console.log('📦 Status:', response.status());
    const data = await response.json();
    console.log('📄 Response:', JSON.stringify(data, null, 2));

    expect(response.status()).toBe(200);
    expect(data).toHaveProperty('data');
    expect(data.data).toHaveProperty('id', productId);
  });
});
