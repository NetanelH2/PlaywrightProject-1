import { test, expect } from '@playwright/test';

test.describe('Login Scenarios', () => {
  
  
  test('Login with locked_out_user and validate error message', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

   
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.locator('#login-button').click()
    
    
    const errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
  });


  const loginScenarios = [
    { username: 'standard_user', password: 'wrong_password', expectedMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'wrong_user', password: 'secret_sauce', expectedMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'wrong_user', password: 'wrong_password', expectedMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: '', password: 'secret_sauce', expectedMessage: 'Epic sadface: Username is required' },
    { username: 'standard_user', password: '', expectedMessage: 'Epic sadface: Password is required' },
    { username: '', password: '', expectedMessage: 'Epic sadface: Username is required' }
  ];

  
  for (const { username, password, expectedMessage } of loginScenarios) {
    test(`Login with username: ${username}, password: ${password}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

     
      await page.fill('#user-name', username);
      await page.fill('#password', password);
      await page.locator('#login-button').click()

      
      const errorMessage = await page.locator('.error-message-container').textContent();
      expect(errorMessage).toBe(expectedMessage);
    });
  }
});
