import { test, expect } from '../fixtures/registration-fixtures';

test.describe('🧪 Проверка регистрации', () => {
  test('✅ Регистрация с корректными данными', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields(validUser);
    await registerPage.submit();
    await expect(registerPage.page).toHaveURL(/\/account/);
  });

  test('❌ Пустое поле Почта', async ({ registerPage, validUser }) => {
    const { email, ...partialUser } = validUser;
    await registerPage.fillAllFields({ ...partialUser, email: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('email');
  });

  test('❌ Пустое поле Пароль', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, password: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('password');
  });

  test('❌ Пустые поля Имя и Фамилия', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, name: '', surname: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('name');
    await registerPage.expectFieldError('surname');
  });

  test('❌ Пустое поле Телефон', async ({ registerPage, validUser }) => {
    await registerPage.fillAllFields({ ...validUser, phone: '' });
    await registerPage.submit();
    await registerPage.expectFieldError('phone');
  });
});
