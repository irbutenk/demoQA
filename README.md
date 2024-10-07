# demoQA

Here's a step-by-step guide to creating QA Automation Take-Home Project for the Student Registration Form using Playwright and TypeScript.
 This includes setting up the project, writing test scripts, and additional test cases.

### Step 1: Set Up the Project

1. **Create a new directory for your project:**
   ```bash
   mkdir playwright-automation-form
   cd playwright-automation-form
   ```

2. **Initialize a new Node.js project:**
   ```bash
   npm init -y
   ```

3. **Install Playwright and TypeScript:**
   ```bash
   npm install playwright @playwright/test typescript ts-node --save-dev
   ```

4. **Initialize TypeScript configuration:**
   ```bash
   npx tsc --init
   ```

5. **Configure your `tsconfig.json`:**
   Update your `tsconfig.json` to include the following:
   ```json
   {
     "compilerOptions": {
       "target": "es2016",
       "module": "ES6",
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true   
     }
   "include": ["helpers/**/*.ts", "tests/**/*.ts"],
   "exclude": ["node_modules"]
   }

6. **Create a Playwright configuration file:**
   Create a file named `playwright.config.ts`:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests', 
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

   ```

### Step 2: Write Automated Test Scripts

1. **Create a directory for tests:**
   ```bash
   mkdir tests
   ```

2. **Create a test file: `tests/practiceForm.spec.ts`:**
   ```typescript
   import { test, expect } from '@playwright/test';

   test("Complete form and submit", async ({ page }) => {
    await page.goto("https://demoqa.com/automation-practice-form/");

    const inputValue = await Helpers.getText(page,"(//label[normalize-space(text())='Email']/following::input)[1]");
    await Helpers.fillMandatoryRegistrFields(page);
    await expect(page.locator("//div[normalize-space(text())='Thanks for submitting the form']")).toBeVisible();
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
  
   
   ```
**Create a test file: `tests/helpers.spec.ts`:**
   ```typescript
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
  static async getText(page: Page, locator) {
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


```
### Step 3: Run the Tests

1. **Run the Playwright tests:**
   ```bash
   npx playwright test
   ```


### Deliverables

- Automated test scripts in the `tests` directory.
- `playwright.config.ts` for configuration.
- Instructions for setup and test execution in a `README.md` file.
- Test results after running the tests in index.html 
![Знімок екрана 2024-10-07 о 21 08 43](https://github.com/user-attachments/assets/234066c5-1612-43b1-a9ed-97bd0df21f83)

and in console:
<img width="1419" alt="Знімок екрана 2024-10-07 о 21 04 34" src="https://github.com/user-attachments/assets/5d4875b8-2330-4f4a-b959-29c262fadefd">

 

### Additional Notes

- Make sure to replace the `path/to/your/image.png` with the actual path to an image you want to upload during tests.
- You can adjust the test cases according to the specific requirements of the form.

