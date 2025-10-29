// pages/ProductPage.js
export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addProductButton = 'button:has-text("Add Product")';
    this.nameInput = 'input[name="productName"]';
    this.priceInput = 'input[name="price"]';
    this.saveButton = 'button:has-text("Save")';
    this.successToast = 'text=Product created successfully';
  }

  async open() {
    await this.page.goto('https://uat-seller-center.amaze-x.com/products');
  }

  async addProduct(name, price) {
    await this.page.click(this.addProductButton);
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.priceInput, price);
    await this.page.click(this.saveButton);
  }

  async assertProductCreated() {
    await this.page.locator(this.successToast).waitFor({ state: 'visible' });
  }
}