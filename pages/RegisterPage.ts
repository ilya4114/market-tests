import { expect, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://market.sedtest-tools.ru/');
    await this.page.getByRole('button', { name: 'Войти' }).click();
    await this.page.getByText('Еще не зарегистрированы ?').click();
    await this.page.waitForSelector('input[name="name"]');
  }

  async fillName(name: string) {
    await this.page.fill('input[name="name"]', name);
  }

  async fillSurname(surname: string) {
    await this.page.fill('input[name="surname"]', surname);
  }

  async fillEmail(email: string) {
    await this.page.fill('input[name="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async fillPhone(phone: string) {
    await this.page.fill('input[name="phone"]', phone);
  }

  async fillAllFields(user: {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
  }) {
    await this.fillName(user.name);
    await this.fillSurname(user.surname);
    await this.fillEmail(user.email);
    await this.fillPassword(user.password);
    await this.fillPhone(user.phone);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  }

  async expectFieldError(fieldName: string) {
    const textError = this.page.locator(
      `input[name="${fieldName}"] >> xpath=ancestor::div[contains(@class, "MuiFormControl-root")]//p[contains(@class, "Mui-error")]`
    );
    await expect(textError).toHaveText('Заполните поле');

    const wrapper = this.page.locator(
      `input[name="${fieldName}"] >> xpath=ancestor::div[contains(@class, "MuiOutlinedInput-root")]`
    );
    await expect(wrapper).toHaveClass(/Mui-error/);
  }
}
