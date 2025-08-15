import { expect, Page } from '@playwright/test';
import { CategorySelectors as S } from '../selectors/category-selectors';

export class CategoriesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://market.sedtest-tools.ru/');
  }

  async openCategories() {
    await this.page.locator(S.categoriesButton).click();
  }

  async clickCategoryByIndex(index: number) {
    await this.page.locator(S.categoryItem).nth(index - 1).click();
  }

  async expectCategoryHeader(name: string) {
    const header = this.page.locator('div').filter({ hasText: name }).first();
    await expect(header).toBeVisible();
  }

  getCards() {
    return this.page.locator(S.card);
  }

  getFirstCard() {
    return this.getCards().first();
  }

  async expectAtLeastOneCardVisible() {
    const cards = this.getCards();
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  }

  async expectFieldsOnCard(card = this.getFirstCard()) {
    await expect(card.locator(S.name)).toBeVisible();
    await expect(card.locator(S.price)).toBeVisible();
    await expect(card.locator(S.openButton)).toBeVisible();
  }

  // ФИКС: кликаем только по картинке товара
  async openFirstCard() {
    await this.getFirstCard().locator('img.Card_image__-sslS').click();
  }

  async expectAdTitleVisible() {
    await expect(this.page.locator(S.adTitle)).toBeVisible();
  }
}
