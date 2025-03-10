import { Page } from "@playwright/test";

export class FormLayoutsPage {
  
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
    const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'});
    await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email);
    await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password);
    await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
    await usingTheGridForm.getByRole('button').click();
  }

  /**
   * This method submits the inline form with the given name, email and checkbox value
   * @param name - should be first and last name
   * @param email - should be a valid email
   * @param rememberMe - true or false for remember me checkbox
   */
  async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
    const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'});
    await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name);
    await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email);
    if (rememberMe){
      await inlineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true});
    }
    await inlineForm.getByRole('button').click();
  }
}