import { test, expect } from '../fixtures/registration-fixtures';

test.describe('Проверка регистрации', () => {
  test('Регистрация с корректными данными', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields(validUser);
    await registerPage.submit();
    await expect(registerPage.page).toHaveURL(/\/account/);
  });

  test('Пустое поле Почта', async ({ registerPage, validUser }) => {
    const { email, ...partialUser } = validUser;
    await registerPage.fillAllFields({ ...partialUser, email: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('email');
    await expect(registerPage.page).toHaveURL(/\/login/);
  });

  test('Пустое поле Пароль', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, password: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('password');
    await expect(registerPage.page).toHaveURL(/\/login/);
  });

  test('Пустые поля Имя и Фамилия', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, name: '', surname: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('name');
    await registerPage.expectFieldError('surname');
    await expect(registerPage.page).toHaveURL(/\/login/);
  });

  test('Пустое поле Телефон', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, phone: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('phone');
    await expect(registerPage.page).toHaveURL(/\/login/);
  });
});
