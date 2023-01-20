const { test, expect } = require('@playwright/test');
import { email, password } from '../user.js';
const faker = require('faker');
const validEmail = email;
const emailInvalidFormat = 'someEmail';
const unworkEmailValidFormat = faker.internet.email();
const validPassword = password;
const unworkPasswordValidFormat = faker.internet.password();
const msgErrorInvalidEmailOrPassword = 'Вы ввели неправильно логин или пароль';

test('1. Successful Login', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test1screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(validEmail);
	await page.getByPlaceholder('Пароль').click();
	await page.getByPlaceholder('Пароль').fill(validPassword);
	await page.getByTestId('login-submit-btn').click();
	await expect(page).toHaveURL(/.*profile/);
	await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toBeVisible({timeout: 30000});
	await page.screenshot({ path: 'screenshots/Test1screenshot2.png'});
});

test('2. Login with validEmail and unworkPasswordValidFormat', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test2screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(validEmail);
	await page.getByPlaceholder('Пароль').click();
	await page.getByPlaceholder('Пароль').fill(unworkPasswordValidFormat);
	await page.getByTestId('login-submit-btn').click();
	await expect(page.getByTestId('login-error-hint')).toHaveText(msgErrorInvalidEmailOrPassword, {timeout: 4000});
	await page.screenshot({ path: 'screenshots/Test2screenshot2.png'});
});

test('3. Login with unworkEmailValidFormat and validPassword', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test3screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(unworkEmailValidFormat);
	await page.getByPlaceholder('Пароль').click();
	await page.getByPlaceholder('Пароль').fill(validPassword);
	await page.getByTestId('login-submit-btn').click();
	await expect(page.getByTestId('login-error-hint')).toHaveText(msgErrorInvalidEmailOrPassword, {timeout: 10000});
	await page.screenshot({ path: 'screenshots/Test3screenshot2.png'});
});

test('4. Login with emailInvalidFormat and validPassword', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test4screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(emailInvalidFormat);
	await page.getByPlaceholder('Пароль').click();
	await page.getByPlaceholder('Пароль').fill(validPassword);
	await page.getByTestId('login-submit-btn').click();
	await expect(page.getByText('Неверный email')).toBeVisible();
	await page.screenshot({ path: 'screenshots/Test4screenshot2.png'});
});

test('5. Login with unworkEmailValidFormat and emptyPassword', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test5screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Email').fill(unworkEmailValidFormat);
	await page.getByPlaceholder('Пароль').click();
	await page.getByTestId('login-submit-btn').click();
	await expect(page.getByText('Обязательное поле')).toBeVisible();
	await page.screenshot({ path: 'screenshots/Test5screenshot2.png'});
});

test('6. Login with emptyEmail and validPassword', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/Test6screenshot1.png'});
	await expect(page).toHaveTitle('Нетология — обучение современным профессиям онлайн');
  await expect(page.getByText('Вход в личный кабинет')).toBeVisible();
	await page.getByPlaceholder('Email').click();
	await page.getByPlaceholder('Пароль').click();
	await page.getByPlaceholder('Пароль').fill(validPassword);
	await page.getByTestId('login-submit-btn').click();
	await expect(page.getByText('Обязательное поле')).toBeVisible();
	await page.screenshot({ path: 'screenshots/Test6screenshot2.png'});
});
