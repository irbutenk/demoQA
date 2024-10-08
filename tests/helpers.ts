import { Page, expect } from "@playwright/test";
export class Helpers {
  static async generateRandomEmail() {
    const domain = ["gmail.com", "example.com"];
    const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    const username = Math.random()
      .toString(36)
      .substring(2, 2 + usernameLength);
    const selectedDomain = domain[Math.floor(Math.random() * domain.length)];
    return `${username}@${selectedDomain}`;
  }
  static async getText(page: Page, locator: string) {
    const inputLocator = page.locator(locator);
    const inputValue = await inputLocator.inputValue();
    console.log(`value from input: ${inputValue}`);
    return inputValue;
  }

  static async verifyGender(
    page: Page,
    gender: string,
    expectedState: boolean
  ) {
    const isChecked = await page.isChecked(
      `input[name="gender"][value="${gender}"]`
    );
    expect(isChecked).toBe(expectedState);
  }

  static async checkTableHeaders(page: Page, headers: string[]): Promise<void> {
    for (const header of headers) {
      const headerLocator = `//td[normalize-space(text())='${header}']`;
      const headerVisible = await page.locator(headerLocator).isVisible();
      console.log(`Header '${header}' is ${headerVisible ? "present" : "not present"} in the table.`
      );
    }
  }

  static async fillMandatoryRegistrFields(page: Page) {
    await page.getByPlaceholder("First Name").click();
    await page.getByPlaceholder("First Name").fill("Iryna");
    await page.getByPlaceholder("First Name").press("Tab");
    await page.getByPlaceholder("Last Name").fill("Test");

    await page.getByPlaceholder("name@example.com").click();
    const randomEmail = await this.generateRandomEmail();
    await page.getByPlaceholder("name@example.com").fill(randomEmail);
    const inputValue = await this.getText(page,"(//label[normalize-space(text())='Email']/following::input)[1]"
    );
    await page.locator(`//label[normalize-space(text())='Other']`).click();
    await this.verifyGender(page, "Other", true);
    await page.getByPlaceholder("Mobile Number").click();
    await page.getByPlaceholder("Mobile Number").fill("3809710538");
    await page.locator("#dateOfBirthInput").click();
    await page.getByLabel("Choose Thursday, October 10th,").click();
    await page.locator(".subjects-auto-complete__value-container").click();
    await page.locator("#subjectsInput").fill("test");
    await page.getByText("Music").click();
    await page.getByText("Sports").click();
    await page.getByText("Reading").click();
    await page.getByPlaceholder("Current Address").click();
    await page.getByPlaceholder("Current Address").fill("test");
    await page.getByText("Select State").click();
    await page.getByText("NCR", { exact: true }).click();
    await page.getByText("Select City").click();
    await page.getByText("Gurgaon", { exact: true }).click();
    await page.getByRole("button", { name: "Submit" }).click();
  }

  static async checkTableContainsWords(page: Page, selector: string, words: string[]): Promise<void> {
    const tableText = await page.locator(selector).innerText();
    expect(tableText).not.toBeNull();
    const containsWord = words.some(word => tableText.includes(word));
    expect(containsWord).toBe(true); 
    console.log(`value from input: ${tableText}`);
    if (!containsWord) {
      throw new Error(`Table should contain one of the words: ${words.join(', ')}`);
    }
  }
}
