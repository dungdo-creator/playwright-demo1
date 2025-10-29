// tests/api/edit-product-api.test.js
import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('API Test - Edit Specific Product (use fixed id)', async () => {
  const baseUrl = process.env.BASE_URL || 'https://uat-api-seller.amaze-x.com/catalog/api/v3';
  const token = process.env.TOKEN;
  if (!token) throw new Error('TOKEN missing in env');

  // product id (the one bạn cung cấp)
  const productId = '3f55a6a8-9364-44c7-b8fe-e49baede7360';
  const url = `https://uat-api-seller.amaze-x.com/catalog/api/v3/product/${productId}`;

  // Tạo request context với header Authorization
  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Body dựa trên payload screenshot bạn gửi — chú ý: mô tả phải >=100 chars
  const body = {
    status: 'updating',
    name: 'Bánh Canh Cua',
    name_th: 'Bánh Canh Cua',
    attributes: [],

    // brand_id từ payload (ảnh)
    brand_id: 'e3d679da-19f8-4039-a8d5-377dd2c4f24c',

    // category_group_id và category_path theo payload (giữ nguyên ví dụ)
    category_group_id: '1c994be7-d1b8-4622-b4ff-e999be71ee7a',
    category_path: [
      '959ad173-2d78-42f1-8ab9-73e8aad420d7',
      'ac0a2ec0-50aa-4a5f-be9b-60a9baa5019d',
      '6f3b421f-8754-4b09-bab0-9f0ce7717b3a'
    ],

    condition: 'new',

    // đảm bảo description >= 100 chars
    description:
      '<p>Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua</p>',
    description_th:
      '<p>Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua Bánh Canh Cua</p>',

    // image list giống screenshot (id, name, type, url)
    image_url: [
      {
        id: 'f02ef039-89ec-402c-a872-102c84e8e671',
        name: '440424633_991488809215679_6200988439277609379_n.jpg',
        type: 'image',
        url: 'https://amz-ms-resource.s3.ap-southeast-1.amazonaws.com/e1a67d9d-221c-4852-8a5e-3a423df1b5ec/image/440424633_991488809215679_6200988439277609379_n.jpg'
      }
    ],

    installment_configuration: { is_active: false },

    // model_list và inventory từ payload (bảo toàn id & stock)
    model_list: [
      {
    id: "2b06ad79-0fad-411d-86da-e2307f2e5054",
    name: "Bánh Canh Cua",
    name_th: "Bánh Canh Cua",
    price: 2000,
    selling_price_is_active: null,
    is_default: true,
    sku: "",
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

    parcel_size: {
      height: 60,
      length: 30,
      width: 50
    },

    parent_sku: '',
    payment_configs: [
      {
        id: '93200784-13c9-4392-98f4-b8f811f5753f',
        is_active: true,
        shop_payment_channel_config_id: '93200784-13c9-4392-98f4-b8f811f5753f'
      }
    ],

    pre_order: false,
    pre_order_days: 0,
    price: 1000,
    selling_price_end_time: '',
    selling_price_start_time: '',

    // shipping: giữ 2 mục như screenshot (Seller Own Fleet & Amaze Standard Delivery)
    shipping: [
      {
        created_at: '2024-08-23T07:58:25.632Z',
        deleted_at: null,
        enable: false,
        id: '332c269f-9207-4d45-b77d-914472db644c',
        product_id: productId,
        shipping_channel: {
          id: 'a95df682-5a30-4555-880b-32a368f73f75',
          code_name: '3p_own_fleet',
          is_default: false,
          name: { en: 'Seller Own Fleet' },
          seller_editable: true
        },
        shipping_channel_id: 'a95df682-5a30-4555-880b-32a368f73f75',
        shipping_fee: 0,
        shop_id: 'e1a67d9d-221c-4852-8a5e-3a423df1b5ec',
        shop_shipping_method_id: '3980a5af-bd9e-4a6f-90c4-84fab67cd30b',
        updated_at: '2025-02-19T14:24:11.285Z'
      },
      {
        created_at: '2024-08-23T07:58:25.632Z',
        deleted_at: null,
        enable: true,
        id: '0e19991d-d090-4317-a169-56aacfa57a2c',
        product_id: productId,
        shipping_channel: {
          id: '63389eae-b05f-48a1-a9dd-062395dfef4b',
          code_name: 'ali_express',
          is_default: true,
          name: { en: 'Amaze Standard Delivery' },
          seller_editable: false
        },
        shipping_channel_id: '63389eae-b05f-48a1-a9dd-062395dfef4b',
        shipping_fee: 0,
        shop_id: 'e1a67d9d-221c-4852-8a5e-3a423df1b5ec',
        shop_shipping_method_id: '5025e495-2ecb-4608-8b72-440b51c70d29',
        updated_at: '2025-02-19T14:24:11.285Z'
      }
    ],

    tier_variations: [],
    tier_variations_multi_lang: [],
    update_flag: ['attributes', 'variant', 'variant_option'],
    weight: 100,
    whole_sale: []
  };

  console.log('🟢 Start test - Edit Fixed Product:', productId);
  console.log('📤 Sending PUT request to:', url);

  const response = await apiContext.put(url, {
    data: body
  });

  console.log('📡 Status:', response.status());
  // try parse json, fallback to text
  let respBody;
  try {
    respBody = await response.json();
    console.log('📦 Response JSON:', JSON.stringify(respBody, null, 2));
  } catch (e) {
    respBody = await response.text();
    console.log('📦 Response TEXT:', respBody);
  }

  // Accept 200 or 201 as success for update/create behaviour
  expect([200, 201]).toContain(response.status());
  expect(respBody?.succeeded ?? respBody?.success ?? true).toBeTruthy();
});
