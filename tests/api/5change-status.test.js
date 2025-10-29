import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const token = process.env.TOKEN;

test("API Test - Change Random Active Product to Inactive", async () => {
  console.log("🟢 Start test - Change Random Active Product to Inactive");

  // 🔹 Tạo request context với header Authorization
  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // 🟢 B1: Gọi danh sách sản phẩm active
  const listUrl = `${baseUrl}/catalog/api/v2/product?page=1&promotion_detail=true&size=12&normal_price_history=true&price_off_history=true&list_type=active`;
  console.log("📡 Fetching Active Product List:", listUrl);

  const listResponse = await apiContext.get(listUrl);
  console.log("📡 Status:", listResponse.status());

  const listText = await listResponse.text();
  console.log("📦 Response body:", listText);

  expect(listResponse.ok()).toBeTruthy();

  const listData = JSON.parse(listText);
  const activeProducts = listData?.data?.items || [];

  if (activeProducts.length === 0) {
    console.warn("⚠️ No active products found!");
    return;
  }

  // 🟢 B2: Lấy ngẫu nhiên 1 sản phẩm active
  const randomProduct = activeProducts[Math.floor(Math.random() * activeProducts.length)];
  console.log("🎯 Selected Product:", randomProduct.id, "-", randomProduct.name);

  // 🟢 B3: Gọi API đổi trạng thái sang inactive
  const changeResponse = await apiContext.post(`${baseUrl}/catalog/api/v2/product/information/status`, {
    data: {
      productIds: [randomProduct.id],
      status: "inactive",
    },
  });

  console.log("📡 Change Status Response:", changeResponse.status());
  const changeText = await changeResponse.text();
  console.log("📦 Change Response Body:", changeText);

  expect(changeResponse.ok()).toBeTruthy();

  const changeData = JSON.parse(changeText);
  expect(changeData?.succeeded || changeData?.success).toBeTruthy();

  console.log("✅ Successfully changed status to inactive!");
});
