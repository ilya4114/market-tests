import { test, expect } from '../fixtures/categories-fixtures';

const categories = [
  { name: 'Одежда', index: 1 },
  { name: 'Техника', index: 2 },
  { name: 'Спорт', index: 3 },
  { name: 'Услуги', index: 4 },
];

test.describe('Проверка категорий и карточек', () => {
  for (const category of categories) {
    test(`Категория: ${category.name}`, async ({ categoriesPage }) => {
      await test.step('Открытие нужной категории', async () => {
        await categoriesPage.clickCategoryByIndex(category.index);
        await categoriesPage.expectCategoryHeader(category.name);
      });
    });

    test(`Обновление страницы сохраняет категорию: ${category.name}`, async ({ categoriesPage }) => {
      await test.step(`Переход в категорию "${category.name}"`, async () => {
        await categoriesPage.clickCategoryByIndex(category.index);
        await categoriesPage.expectCategoryHeader(category.name);
        await categoriesPage.expectAtLeastOneCardVisible();
      });

      await test.step('Обновление страницы и повторная проверка', async () => {
        const currentUrl = categoriesPage.page.url();
        await categoriesPage.page.reload();

        await expect(categoriesPage.page).toHaveURL(currentUrl);
        await categoriesPage.expectCategoryHeader(category.name);
        await categoriesPage.expectAtLeastOneCardVisible();
      });
    });
  }

  test('Проверка карточек в категории "Одежда"', async ({ categoriesPage }) => {
    await test.step('Переход в категорию', async () => {
      await categoriesPage.clickCategoryByIndex(1);
    });

    await test.step('Проверка отображения карточки', async () => {
      await categoriesPage.expectAtLeastOneCardVisible();
      await categoriesPage.expectFieldsOnCard();
    });
  });

  test('Переход по карточке и проверка страницы товара', async ({ categoriesPage }) => {
    await test.step('Открытие категории и карточки', async () => {
      await categoriesPage.clickCategoryByIndex(1);
      await categoriesPage.expectAtLeastOneCardVisible();
      await categoriesPage.openFirstCard();
    });

    await test.step('Проверка страницы товара', async () => {
      await expect(categoriesPage.page).toHaveURL(/\/item\/\d+$/);
      await categoriesPage.expectAdTitleVisible();
    });

    await test.step('Проверка кнопки "Позвонить" и отображения номера', async () => {
      const callButton = categoriesPage.page.getByRole('button', { name: 'Позвонить' });
      await expect(callButton).toBeVisible();

      await callButton.click();

      const phoneBlock = categoriesPage.page.locator('.SingleAdvertPage_tel__LNKwQ');
      await expect(phoneBlock).toContainText('+7');
    });
  });
});
