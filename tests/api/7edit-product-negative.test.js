// tests/api/edit-product-negative.test.js
import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL || 'https://uat-api-seller.amaze-x.com/catalog/api/v3';
const token = process.env.TOKEN;
if (!token) throw new Error('TOKEN missing in env');

const productId = '3f55a6a8-9364-44c7-b8fe-e49baede7360';
const url = `${baseUrl}/product/${productId}`;

test.describe('❌ Negative API Test - Edit Product', () => {

  // Hàm tiện ích tạo context
  async function createContext() {
    return await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Base payload chuẩn để sửa
  const baseBody = {
    status: 'updating',
    name: 'Bánh Canh Cua',
    name_th: 'Bánh Canh Cua',
    brand_id: 'e3d679da-19f8-4039-a8d5-377dd2c4f24c',
    category_group_id: '1c994be7-d1b8-4622-b4ff-e999be71ee7a',
    category_path: [
      '959ad173-2d78-42f1-8ab9-73e8aad420d7',
      'ac0a2ec0-50aa-4a5f-be9b-60a9baa5019d',
      '6f3b421f-8754-4b09-bab0-9f0ce7717b3a'
    ],
    condition: 'new',
    description: '<p>' + 'Bánh Canh Cua '.repeat(10) + '</p>',
    description_th: '<p>' + 'Bánh Canh Cua '.repeat(10) + '</p>',
    image_url: [
      {
        id: 'f02ef039-89ec-402c-a872-102c84e8e671',
        name: '440424633_991488809215679_6200988439277609379_n.jpg',
        type: 'image',
        url: 'https://amz-ms-resource.s3.ap-southeast-1.amazonaws.com/e1a67d9d-221c-4852-8a5e-3a423df1b5ec/image/440424633_991488809215679_6200988439277609379_n.jpg'
      }
    ],
    model_list: [
      {
        id: "2b06ad79-0fad-411d-86da-e2307f2e5054",
        name: "Bánh Canh Cua",
        name_th: "Bánh Canh Cua",
        price: 2000,
        sku: "",
        is_default: true,
        inventory: [
          {
            shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
            warehouse_name: "NGUYEN TUONG VI",
            stock: 290
          }
        ],
        variation_values: [],
        variation_values_multi_lang: []
      }
    ],
    parcel_size: { height: 60, length: 30, width: 50 },
    price: 1000,
    shipping: [],
    weight: 100
  };

  // 1️⃣ Case: Name trống
  test('❌ Edit Product - Missing Name', async () => {
    const apiContext = await createContext();
    const body = { ...baseBody, name: '' };

    console.log('🚫 Test: Missing name');
    const response = await apiContext.put(url, { data: body });
    const respBody = await response.json().catch(() => ({}));

    console.log('📡 Status:', response.status());
    console.log('📦 Response:', JSON.stringify(respBody, null, 2));

    expect(response.status()).not.toBe(200);
    expect(respBody.succeeded ?? respBody.success ?? false).toBeFalsy();
  });

  // 2️⃣ Case: Mô tả < 100 ký tự
  test('❌ Edit Product - Description too short', async () => {
    const apiContext = await createContext();
    const body = { ...baseBody, description: '<p>Ngắn quá</p>' };

    console.log('🚫 Test: Description too short');
    const response = await apiContext.put(url, { data: body });
    const respBody = await response.json().catch(() => ({}));

    console.log('📡 Status:', response.status());
    console.log('📦 Response:', JSON.stringify(respBody, null, 2));

    expect(response.status()).not.toBe(200);
    expect(respBody.succeeded ?? respBody.success ?? false).toBeFalsy();
  });

  // 3️⃣ Case: Negative price
  test('❌ Edit Product - Negative Price', async () => {
    const apiContext = await createContext();
    const body = { ...baseBody, price: -500 };

    console.log('🚫 Test: Negative price');
    const response = await apiContext.put(url, { data: body });
    const respBody = await response.json().catch(() => ({}));

    console.log('📡 Status:', response.status());
    console.log('📦 Response:', JSON.stringify(respBody, null, 2));

    expect(response.status()).not.toBe(200);
    expect(respBody.succeeded ?? respBody.success ?? false).toBeFalsy();
  });
});
