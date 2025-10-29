import { expect } from '@playwright/test';

/**
 * login helper - tái sử dụng từ nhiều test
 * @param {import('@playwright/test').Page} page
 * @param {Object} opts
 */
export async function login(page, opts = {}) {
  const USER = opts.user || process.env.E2E_USER || "dung.do.kyanon.1";
  const PASS = opts.pass || process.env.E2E_PASS || "l9gP329TV2K<";
  const successSelector =
    opts.successSelector ||
    process.env.LOGIN_SUCCESS_SELECTOR ||
    "text=Dashboard";
  const waitTimeout = opts.waitTimeout || 20000;

  console.log("🟢 Start login to Seller Center...");

  // Mở trang login
  await page.goto("https://uat-seller-center.amaze-x.com/auth/sign-in", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1500);

  // Chuyển ngôn ngữ sang EN (nếu có)
  try {
    await page.locator("span").filter({ hasText: "ThaiLanTH" }).click({ timeout: 3000 });
    await page.waitForTimeout(1000);
    await page.getByText("EN", { exact: true }).click();
    await page.waitForTimeout(1000);
  } catch {
    console.log("⚠️  Bỏ qua chọn ngôn ngữ (không thấy element)");
  }

  // Nhập thông tin login
  await page.getByRole("textbox", { name: "Email/Phone Number/Username" }).fill(USER);
  await page.waitForTimeout(1000);
  await page.getByRole("textbox", { name: "Password" }).fill(PASS);
  await page.waitForTimeout(1000);

  // Click login (xử lý trường hợp nút là span/div)
  const loginButton =
    page.getByRole("button", { name: "Sign In" }) ||
    page.locator("span:has-text('Sign In')") ||
    page.locator("div:has-text('Sign In')");

  await loginButton.first().click();
  console.log("🕐 Waiting for login response...");
  await page.waitForTimeout(2000);

  // Chờ đến khi dashboard hiển thị
  await page.waitForSelector(successSelector, { timeout: waitTimeout });

  console.log("✅ Login success!");

  // Sau khi login thành công
  await page.waitForLoadState('networkidle');

  // Điều hướng đến My Products thủ công (bỏ qua menu)
  await page.getByText('My Products3').click();
}

export default login;