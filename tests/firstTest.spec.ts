import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({page}) => {
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

test('User facing locators', async ({page}) => {
  
});