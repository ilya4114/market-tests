import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { baseUserData } from '../testData';

type Fixtures = {
  registerPage: RegisterPage;
  email: string;
  validUser: typeof baseUserData & { email: string };
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },

  email: async ({}, use) => {
    const email = `user${Date.now()}@mail.com`;
    await use(email);
  },

  validUser: async ({ email }, use) => {
    const user = { ...baseUserData, email };
    await use(user);
  },
});

export { expect } from '@playwright/test';
