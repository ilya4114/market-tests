import { test as base, expect } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';

const EMAIL = 'ilya@testov.com';
const PASSWORD = '1234567';

export const test = base.extend<{
  profilePage: ProfilePage;
}>({
  profilePage: async ({ page }, use) => {
    await page.goto('http://market.sedtest-tools.ru/');

    await page.getByRole('button', { name: 'Войти' }).first().click();
    await page.getByRole('textbox', { name: 'Почта' }).fill(EMAIL);
    await page.getByRole('textbox', { name: 'Пароль' }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Войти' }).nth(1).click();

    const cabinetBlock = page.locator('text=Кабинет');
    await expect(cabinetBlock).toBeVisible();
    await cabinetBlock.click();

    await use(new ProfilePage(page));
  },
});

export { expect } from '@playwright/test';
