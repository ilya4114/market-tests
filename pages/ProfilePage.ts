import { expect, Page } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoCabinet() {
    const cabinetBlock = this.page.locator('div.MuiBox-root').filter({ hasText: /^Кабинет$/ });
    await expect(cabinetBlock).toBeVisible();
    await cabinetBlock.click();
  }

  async fillField(label: string, value: string) {
    const input = this.page.getByRole('textbox', { name: label });
    await input.fill(value);
    await this.page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(input).toBeVisible();
    await expect(this.page).toHaveURL(/\/account$/);
  }

  async openMyAds() {
    const myAdsBlock = this.page.locator('div.MuiBox-root').filter({ hasText: /^Мои объявления$/ });
    await expect(myAdsBlock).toBeVisible();
    await myAdsBlock.click();
  }

  async expectActiveBlockVisible() {
    const activeAds = this.page.locator('div').filter({ hasText: /^Активные \(\d+\)$/ });
    await expect(activeAds).toBeVisible();
  }

  async logout() {
    const logoutButton = this.page.getByRole('button', { name: 'Выход' });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await expect(this.page.getByRole('button', { name: 'Войти' }).first()).toBeVisible();
  }
}
