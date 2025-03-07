import {test, expect} from '@playwright/test';
import { time } from 'console';
import { timeout } from 'rxjs-compat/operator/timeout';

test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();
  testInfo.setTimeout(testInfo.timeout + 2000);
});

// Byy default Playwright Test will wait for 30 seconds for the element to appear in the DOM
test('Auto Waiting', async ({page}) => {
  const successButtonMessage = page.locator('.bg-success');
  await successButtonMessage.click();
  expect(await successButtonMessage.textContent()).toBe('Data loaded with AJAX get request.');

  // There are certain methods that do not wait for the element to appear in the DOM
  // For example, the following code will fail because the element is not yet in the DOM
  // .allTextContents()
  // To make it wait, use waitFor method
  await successButtonMessage.waitFor({state: "attached"});
  const text = await successButtonMessage.allTextContents();
  expect(text).toEqual(['Data loaded with AJAX get request.']);

  await expect(successButtonMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 30000});
});

test('Alternative waits', async ({page}) => {
  const successButtonMessage = page.locator('.bg-success');

  // 1. wait for element
  await page.waitForSelector('.bg-success');

  // 2. wait for particular response
  //await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

  // 3. wait for networks calls to be completed "NOT RECOMMENDED"
  //await page.waitForLoadState('networkidle');

  const text = await successButtonMessage.allTextContents();
  expect(text).toContain('Data loaded with AJAX get request.');
});

test('timeouts', async ({page}) => {
  //test.setTimeout(10000);
  test.slow(); // multiply the timeout by 3
  const successButtonMessage = page.locator('.bg-success');
  //
  await successButtonMessage.click();
});