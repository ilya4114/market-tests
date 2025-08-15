import { test, expect } from '../fixtures/profile-fixtures';

test('изменение имени', async ({ profilePage }) => {
  await profilePage.fillField('Имя', 'Тест');
});

test('изменение фамилии', async ({ profilePage }) => {
  await profilePage.fillField('Фамилия', 'Тестов');
});

test('изменение телефона', async ({ profilePage }) => {
  await profilePage.fillField('Телефон', '+79998887766');
});

test('проверка "Активные (число)" в разделе "Мои объявления"', async ({ profilePage }) => {
  await profilePage.openMyAds();
  await profilePage.expectActiveBlockVisible();
});

test('возврат в кабинет и выход из профиля', async ({ profilePage }) => {
  await profilePage.gotoCabinet();
  await profilePage.logout();
});
