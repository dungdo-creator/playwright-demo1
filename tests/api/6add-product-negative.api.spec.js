import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const token = process.env.TOKEN;

test.describe("❌ Add Product - Negative API Cases", () => {
  let apiRequestContext;

  test.beforeAll(async () => {
    apiRequestContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("🔍 BASE_URL =", baseUrl);
    console.log("🔑 TOKEN =", token ? token.slice(0, 30) + "..." : "❌ MISSING");
  });

  async function safeParse(res) {
    try {
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        return { raw: text };
      }
    } catch {
      return { error: "Failed to read body" };
    }
  }

  // 1️⃣ Product Name trống
  test("❌ Product Name trống", async () => {
    const body = {
      status: "reviewing",
      name: "",
      brand_id: "4be6a7ac-b597-46c0-b584-566f09125451",
      category_group_id: "302252e8-3aac-42bd-b8cc-172d0e07c672",
      description: "<p>Product with no name</p>",
      price: 300,
      image_url: [
        {
          id: "2f5f9d19-2616-49f3-8e73-856868712ca1",
          name: "sample.jpg",
          type: "image",
          url: "https://ms-resource.amaze-x.com/sample.jpg",
        },
      ],
      inventory: [
        {
          shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
          warehouse_name: "NGUYEN TUONG VI",
          stock: 1000,
        },
      ],
      weight: 200,
    };

    const res = await apiRequestContext.post(`${baseUrl}/catalog/api/v3/product`, { data: body });
    const json = await safeParse(res);

    console.log("🔹 Status:", res.status());
    console.log("🔹 Response:", JSON.stringify(json, null, 2));

    expect(res.status()).toBeGreaterThanOrEqual(400);
    expect(res.status()).toBeLessThan(500);
  });

  // 2️⃣ Price âm
  test("❌ Price âm", async () => {
    const body = {
      status: "reviewing",
      name: "Negative Price Product",
      brand_id: "4be6a7ac-b597-46c0-b584-566f09125451",
      category_group_id: "302252e8-3aac-42bd-b8cc-172d0e07c672",
      description: "<p>Invalid negative price</p>",
      price: -500,
      image_url: [
        {
          id: "2f5f9d19-2616-49f3-8e73-856868712ca1",
          name: "sample.jpg",
          type: "image",
          url: "https://ms-resource.amaze-x.com/sample.jpg",
        },
      ],
      inventory: [
        {
          shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
          warehouse_name: "NGUYEN TUONG VI",
          stock: 1000,
        },
      ],
      weight: 200,
    };

    const res = await apiRequestContext.post(`${baseUrl}/catalog/api/v3/product`, { data: body });
    const json = await safeParse(res);

    console.log("🔹 Status:", res.status());
    console.log("🔹 Response:", JSON.stringify(json, null, 2));

    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  // 3️⃣ Không upload hình
  test("❌ Không upload hình", async () => {
    const body = {
      status: "reviewing",
      name: "Product No Image",
      brand_id: "4be6a7ac-b597-46c0-b584-566f09125451",
      category_group_id: "302252e8-3aac-42bd-b8cc-172d0e07c672",
      description: "<p>Product without image</p>",
      price: 300,
      image_url: [],
      inventory: [
        {
          shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
          warehouse_name: "NGUYEN TUONG VI",
          stock: 1000,
        },
      ],
      weight: 200,
    };

    const res = await apiRequestContext.post(`${baseUrl}/catalog/api/v3/product`, { data: body });
    const json = await safeParse(res);

    console.log("🔹 Status:", res.status());
    console.log("🔹 Response:", JSON.stringify(json, null, 2));

    expect(res.status()).toBeGreaterThanOrEqual(400);
  });

  // 4️⃣ Description dưới 100 ký tự
  test("❌ Description < 100 ký tự", async () => {
    const shortDesc = "<p>Too short</p>"; // < 100 ký tự
    const body = {
      status: "reviewing",
      name: "Short Description Product",
      brand_id: "4be6a7ac-b597-46c0-b584-566f09125451",
      category_group_id: "302252e8-3aac-42bd-b8cc-172d0e07c672",
      description: shortDesc,
      price: 300,
      image_url: [
        {
          id: "2f5f9d19-2616-49f3-8e73-856868712ca1",
          name: "sample.jpg",
          type: "image",
          url: "https://ms-resource.amaze-x.com/sample.jpg",
        },
      ],
      inventory: [
        {
          shop_address_id: "ac253565-b738-42a3-a494-e4da4c0f1782",
          warehouse_name: "NGUYEN TUONG VI",
          stock: 1000,
        },
      ],
      weight: 200,
    };

    const res = await apiRequestContext.post(`${baseUrl}/catalog/api/v3/product`, { data: body });
    const json = await safeParse(res);

    console.log("🔹 Status:", res.status());
    console.log("🔹 Response:", JSON.stringify(json, null, 2));

    expect(res.status()).toBeGreaterThanOrEqual(400);
  });
});
