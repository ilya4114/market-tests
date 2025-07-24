import { test as base } from '@playwright/test';
import { CategoriesPage } from '../pages/CategoriesPage';

type Fixtures = {
  categoriesPage: CategoriesPage;
};

export const test = base.extend<Fixtures>({
  categoriesPage: async ({ page }, use) => {
    const categoriesPage = new CategoriesPage(page);
    await use(categoriesPage);
  },
});

export { expect } from '@playwright/test';
