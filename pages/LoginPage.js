// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[placeholder="input"]';
    this.passwordInput = 'input[placeholder="password"]';
    this.loginButton = 'button:has-text("Sign In")';
    this.errorMessage = 'text=Invalid username or password';
  }

  async goto() {
    await this.page.goto('https://uat-seller-center.amaze-x.com/');
  }

  async login(input, password) {
    await this.page.fill(this.inputInput, input);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async assertLoginSuccess() {
    await this.page.waitForURL(/dashboard/i);
    await this.page.locator('text=Dashboard').waitFor({ state: 'visible' });
  }

  async assertLoginFail() {
    await this.page.locator(this.errorMessage).waitFor({ state: 'visible' });
  }
}