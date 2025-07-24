import { test, expect } from '../fixtures/categories-fixtures';

const categories = [
  { name: 'Одежда', index: 1 },
  { name: 'Техника', index: 2 },
  { name: 'Спорт', index: 3 },
  { name: 'Услуги', index: 4 },
];

test.describe('🧪 Проверка всех категорий', () => {
  for (const category of categories) {
    test(`✅ Категория: ${category.name}`, async ({ categoriesPage }) => {
      await test.step('Открытие нужной категории', async () => {
        await categoriesPage.goto();
        await categoriesPage.openCategories();
        await categoriesPage.clickCategoryByIndex(category.index);
      });

      await test.step('Проверка заголовка категории', async () => {
        await categoriesPage.expectCategoryHeader(category.name);
      });
    });
  }

  test('🧾 Проверка карточек в категории "Одежда"', async ({ categoriesPage }) => {
    await test.step('Переход в категорию', async () => {
      await categoriesPage.goto();
      await categoriesPage.openCategories();
      await categoriesPage.clickCategoryByIndex(1);
    });

    await test.step('Проверка отображения карточки', async () => {
      await categoriesPage.expectAtLeastOneCardVisible();
      await categoriesPage.expectFieldsOnCard();
    });
  });

  test('🖼 Переход по карточке и проверка страницы товара', async ({ categoriesPage }) => {
    await test.step('Открытие категории и карточки', async () => {
      await categoriesPage.goto();
      await categoriesPage.openCategories();
      await categoriesPage.clickCategoryByIndex(1);
      await categoriesPage.expectAtLeastOneCardVisible();
      await categoriesPage.openFirstCard();
    });

    await test.step('Проверка страницы товара', async () => {
      await expect(categoriesPage.page).toHaveURL(/\/item\/\d+$/);
      await categoriesPage.expectAdTitleVisible();
    });
  });
});
