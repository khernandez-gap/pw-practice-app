import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test.skip('Locator syntax rules', async ({page}) => {
  // By Tag Name
  await page.locator('input').first().click();
  
  // By ID
  await page.locator('#inputEmail1').click();

  // By Class Value
  page.locator('.shape-rectangle');

  // By Attribute
  page.locator('[placeholder="Email"]');

  // By Class Value (Full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

  // combine different selectors (By Tag Name, Attribute, Class Value)
  page.locator('input[placeholder="Email"].shape-rectangle');

  // By Xpath (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]');

  // By partial text match
  page.locator(':text("Using")');

  // By exact text match
  page.locator(':text-is("Using the Grid")');
});

test.skip('User facing locators', async ({page}) => {
  await page.getByRole('textbox', {name: 'Email'}).first().click();
  await page.getByRole('button', {name: 'Sign in'}).first().click();

  await page.getByLabel('Email').first().click();

  await page.getByPlaceholder('Jane Doe').click();

  await page.getByText('Using the Grid').click();

  await page.getByTestId('SignIn').click();

  await page.getByTitle('IoT Dashboard').click();
});

test.skip('Locating child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

  await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();

  await page.locator('nb-card').nth(3).getByRole('button').click(); //select by index [avoid this approach]
});

test.skip('Locating parent elements', async ({page}) => {
  // nb-card is the parent element, by adding a second argument to the locator a child element can be located
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click();
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click();

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click();

  // Filter by multiple conditions
  // Action to Perform Click email textbox inside the HOrizontal form
  // 1. Find the nb-card element
  // 2. Filter the nb-card element by the checkbox element (at this point 2 nb-card elements are found)
  // 3. Filter the nb-card element by the text "Sign in" (at this point 1 nb-card element is found)
  // 4. Find the email textbox inside the nb-card element
  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click();

  
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click();
});

test.skip('Reusing locators', async ({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
  const emailField = basicForm.getByRole('textbox', {name: "Email"});
  const passwordField = basicForm.getByRole('textbox', {name: "Password"});
  const signInButton = basicForm.getByRole('button');

  await emailField.fill('test@test.com');
  await passwordField.fill('Welcome123');
  await basicForm.locator('nb-checkbox').click();
  await signInButton.click();

  await expect(emailField).toHaveValue('test@test.com');
});

test('extracting values', async ({page}) => {
  //single test value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  //all text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonsLabels).toContain('Option 1');

  //input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"});
  await emailField.fill('test@test.com');
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');

  // get attribute value
  const emailPlaceholder = await emailField.getAttribute('placeholder');
  expect(emailPlaceholder).toEqual('Email');
});