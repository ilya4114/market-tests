import { test as base } from '@playwright/test';
import { CategoriesPage } from '../pages/CategoriesPage';

type CategoriesFixtures = {
  categoriesPage: CategoriesPage;
};

export const test = base.extend<CategoriesFixtures>({
  categoriesPage: async ({ page }, use) => {
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.goto();              // автоматический переход
    await categoriesPage.openCategories();    // автоматическое открытие меню
    await use(categoriesPage);
  },
});

export { expect } from '@playwright/test';
