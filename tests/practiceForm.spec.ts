import { test, expect } from '@playwright/test';
import { Helpers } from './helpers';
test.describe("Student Registration Form", () => {
  test.describe.configure({ mode: "serial" });
  

  test('Validate Required Fields', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form/');
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('Iryna');
    await page.getByPlaceholder('First Name').press('Tab');
    await page.getByPlaceholder('Last Name').fill('Test');

    await page.getByPlaceholder('name@example.com').click();
    const randomEmail = await Helpers.generateRandomEmail();
    await page.getByPlaceholder('name@example.com').fill(randomEmail);
    const inputValue = await Helpers.getText(page,"(//label[normalize-space(text())='Email']/following::input)[1]")
    await page.locator(`//label[normalize-space(text())='Other']`).click();
    await Helpers.verifyGender(page, 'Other', true);
    await Helpers.verifyGender(page, 'Male', false);
    await Helpers.verifyGender(page, 'Female', false);

    await page.getByPlaceholder('Mobile Number').click();
    await page.getByPlaceholder('Mobile Number').fill('3809710538');
    await page.locator('#dateOfBirthInput').click();
    await page.getByLabel('Choose Thursday, October 10th,').click();
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill('test');
    await page.getByText('Music').click();
    await page.getByPlaceholder('Current Address').click();
    await page.getByPlaceholder('Current Address').fill('test');
    await page.getByText('Select State').click();
    await page.getByText('NCR', { exact: true }).click();
    await page.getByText('Select City').click();
    await page.getByText('Gurgaon', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('tbody')).toContainText('Iryna Test');
    await expect(page.locator('tbody')).toContainText(inputValue);
    await expect(page.locator('tbody')).toContainText('Other');
    await expect(page.locator('tbody')).toContainText('3809710538');
    await expect(page.locator('tbody')).toContainText('10 October,2024');
    await expect(page.locator('tbody')).toContainText('Music');
    await expect(page.locator('tbody')).toContainText('test');
    await expect(page.locator('tbody')).toContainText('NCR Gurgaon');
    await page.close();
  });
});
