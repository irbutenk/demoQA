import { test, expect } from "@playwright/test";
import { Helpers } from "./helpers";
test.describe("Student Registration Form", () => {
  test.describe.configure({ mode: "serial" });

  test("Validate Required Fields", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form/");

    const inputValue = await Helpers.getText(page,"(//label[normalize-space(text())='Email']/following::input)[1]");
    await Helpers.fillMandatoryRegistrFields(page);
    await expect(page.locator("tbody")).toContainText("Iryna Test");
    await expect(page.locator("tbody")).toContainText(inputValue);
    await expect(page.locator("tbody")).toContainText("Other");
    await expect(page.locator("tbody")).toContainText("3809710538");
    await expect(page.locator("tbody")).toContainText("10 October,2024");
    await expect(page.locator("tbody")).toContainText("Music");
    await expect(page.locator("tbody")).toContainText("test");
    await expect(page.locator("tbody")).toContainText("NCR Gurgaon");
    await page.close();
  });

  test("Checking the status of all radio buttons after clicking", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form/");
  const genders = ["Other", "Male", "Female"]; 
    for (const gender of genders) {
      const radioButtonLocator = `//label[normalize-space(text())='${gender}']`;
      await page.locator(radioButtonLocator).click();
        const isChecked = await page.isChecked(radioButtonLocator );
        console.log(`Radio button '${gender}' is ${isChecked}`);
    }
    await page.close();
  });

  test("Checking the Headers of table", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form/");
    await Helpers.fillMandatoryRegistrFields(page);
    const successMessageSelector = "//div[normalize-space(text())='Thanks for submitting the form']";
    await page.waitForSelector(successMessageSelector, { state: 'visible' });
    const tableHeaders = [
      'Student Name',
      'Student Email',
      'Gender',
      'Mobile',
      'Date of Birth',
      'Subjects',
      'Hobbies',
      'Picture',
      'Address',
      'State and City'
    ];
    
    await Helpers.checkTableHeaders(page, tableHeaders);
    await page.close();
    });

    test("Checking the worlds in the cell", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form/");
    await Helpers.fillMandatoryRegistrFields(page);
    const wordsToCheck = ['Sports', 'Reading', 'Music'];
    await Helpers.checkTableContainsWords(page, "//table[contains(@class,'table table-dark')]/tbody[1]/tr[7]/td[2]", wordsToCheck);
    await page.close();
});
});
