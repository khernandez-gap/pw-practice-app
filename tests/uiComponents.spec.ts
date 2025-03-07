import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  });

  test('Input fields', async ({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'});
    await usingTheGridEmailInput.fill('test@testing.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test2@testing.com', {delay: 500}); // simulate slowest typing

    //generic assertions
    const inputValue = await usingTheGridEmailInput.inputValue(); //extract the text of the input field
    expect(inputValue).toEqual('test2@testing.com');

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@testing.com');
  });
});