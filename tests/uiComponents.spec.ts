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

  test('radio buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'});

    // two ways to check the radio button
    //await usingTheGridForm.getByLabel('Option 1').check({force: true});
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true});
    const radioStatus = await usingTheGridForm.getByRole('radio',  {name: 'Option 1'}).isChecked();
    // two ways to assert the radio button
    expect(radioStatus).toBeTruthy();
    await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

    await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true});
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy();
    expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy();
  });
});

test('checkboxes', async ({page}) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  //await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true});
  await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true});
  await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true});

  await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true});

  const allBoxes = await page.getByRole('checkbox'); //Get the list of all checkboxes

  for (const box of await allBoxes.all()) {
    await box.check({force: true});
    expect(await box.isChecked()).toBeTruthy();
  }

  for (const box of await allBoxes.all()){
    await box.uncheck({force: true});
    expect(await box.isChecked()).toBeFalsy();
  }
});

test('lists and dropdowns', async ({page}) => {
  const dropDownMenu = page.locator('ngx-header nb-select')
  await dropDownMenu.click();

  page.getByRole('list'); //When the list has a UL tag
  page.getByRole('listitem'); //When the list has a LI tag

  //const optionList = page.getByRole('list').locator('nb-option'); //one approach
  const optionList = page.locator('nb-option-list nb-option'); //another approach
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
  await optionList.filter({hasText: 'Cosmic'}).click();

  const header = page.locator('nb-layout-header');
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

  const colors = {
    'Light': 'rgb(255, 255, 255)',
    'Dark': 'rgb(34, 43, 69)',
    'Cosmic': 'rgb(50, 50, 89)',
    'Corporate': 'rgb(255, 255, 255)'
  }

  await dropDownMenu.click();
  for (const color in colors){
    await optionList.filter({hasText: color}).click();
    await expect(header).toHaveCSS('background-color', colors[color]);
    if (color != "Corporate"){
      await dropDownMenu.click();
    }
  }
});

test('tooltip', async ({page}) => {
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();

  const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
  await tooltipCard.getByRole('button', {name: 'Top'}).hover();

  //page.getByRole('tooltip') // works if you have a role tooltip created (I cannot use it in this example)
  const tooltip = await page.locator('nb-tooltip').textContent();
  expect(tooltip).toEqual('This is a tooltip');
});