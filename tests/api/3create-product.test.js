import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("API Test - Create Product", async ({}) => {
  const baseUrl = process.env.BASE_URL; // ví dụ: https://uat-api-seller.amaze-x.com/catalog/api/v3
  const token = process.env.TOKEN;

  const apiRequestContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

const body = {
  status: "reviewing",
  name: "Daisy Flower",
  name_th: "Daisy Flower",
  brand_id: "4be6a7ac-b597-46c0-b584-566f09125451",
attributes: [
  {
    attribute_id: "b944d6b4-2e51-449f-8f30-e70092761142",
    attribute_option_ids: ["7c8b352e-dcbd-46e9-8d16-8254e401487d"],
    value: ["yes"]
  }
],
  category_group_id: "302252e8-3aac-42bd-b8cc-172d0e07c672",
  category_path: [
    "959ad173-2d78-42f1-8ab9-73e8aad420d7",
    "7e25790d-2246-4111-98bf-9aad8bfed829",
    "302252e8-3aac-42bd-b8cc-172d0e07c672",
  ],
  condition: "new",
  description:
    "<p>Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower</p>",
  description_th:
    "<p>Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower Daisy Flower</p>",
image_url: [
  {
    id: "2f5f9d19-2616-49f3-8e73-856868712ca1",
    name: "e401b726-b3d5-11f0-917b-b249605ac9cd-0.jpg",
    type: "image",
    url: "https://ms-resource.amaze-x.com/e1a67d9d-221c-4852-8a5e-3a423df1b5ec/image/e401b726-b3d5-11f0-917b-b249605ac9cd-0.jpg"
  }
],
videos: [],
  installment_configuration: { is_active: false },
  inventory: [
    {
      shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
      warehouse_name: "NGUYEN TUONG VI",
      stock: 1000,
    },
  ],
  model_list: [],
  parcel_size: { width: 30, length: 20, height: 30 },
  parent_sku: "",
  payment_configs: [
    {
      shop_payment_channel_config_id: "2bdc808f-105f-48c1-84ac-f0ed1239cce0",
      is_active: true,
    },
  ],
  pre_order: false,
  pre_order_days: 0,
  price: 300,
  shipping: [
    {
      shop_shipping_method_id: "5025e495-2ecb-4608-8b72-440b51c70d29",
      enable: true,
      shipping_channel: {
        id: "63389eae-b05f-48a1-a9dd-062395dfef4b",
        is_default: true,
        name: "Amaze Standard Delivery",
        seller_editable: true,
        code_name: "ali_express",
      },
      shipping_channel_id: "63389eae-b05f-48a1-a9dd-062395dfef4b",
      shop_id: "e1a67d9d-221c-4852-8a5e-3a423df1b5ec",
      shipping_fee: 0,
    },
    {
      shop_shipping_method_id: "3980a54f-bd9e-4a6f-90c4-84fab67cd30b",
      enable: false,
      shipping_channel: {
        id: "a95df682-5a30-4555-880b-32a368f73f75",
        is_default: false,
        name: "Seller Own Fleet",
        seller_editable: true,
        code_name: "3p_own_fleet",
      },
      shipping_channel_id: "a95df682-5a30-4555-880b-32a368f73f75",
      shop_id: "e1a67d9d-221c-4852-8a5e-3a423df1b5ec",
      shipping_fee: 0,
    },
  ],
  tier_variations: [],
  weight: 200,
  whole_sale: [],
  update_flag: ["attributes", "variant", "variant_option"],
};
console.log("🔍 BASE_URL =", baseUrl);
console.log("🔑 TOKEN =", token ? token.slice(0, 30) + "..." : "❌ MISSING");
console.log("🧩 AUTH HEADER =", `Bearer ${token}`);

 const response = await apiRequestContext.post(`${baseUrl}/catalog/api/v3/product`, {
  data: body,
});

  console.log("🔹 Status:", response.status());
  const data = await response.json();
  console.log("🔹 Raw response:", JSON.stringify(data, null, 2));

  expect(response.status()).toBe(201);
  expect(data.succeeded || data.success).toBeTruthy();
});
