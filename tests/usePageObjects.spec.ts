import {test, expect} from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test('navigate to form page', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.smartTablePage();
  await navigateTo.toastsPage();
  await navigateTo.tooltipPage();
});

test('parametrized methods', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  const formLayouts = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await formLayouts.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password', 'Option 2');
});

test('parametrized methods Inline form', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  const formLayouts = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await formLayouts.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
});

test('datepicker', async ({page}) => {
  const navigateTo = new NavigationPage(page);
  const onDatepickerPage = new DatepickerPage(page);
  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatePickerDateFromToday(5);
  await onDatepickerPage.selectDatepickerWithRangeFromToday(5, 10);

});