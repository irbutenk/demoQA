import { Page, expect } from "@playwright/test";
export class Helpers {
    static async generateRandomEmail() {
        const domain = ['gmail.com', 'example.com']; 
        const usernameLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        const username = Math.random().toString(36).substring(2, 2 + usernameLength); 
        const selectedDomain = domain[Math.floor(Math.random() * domain.length)]; 
        return `${username}@${selectedDomain}`;
      }
    static async getText(page: Page, locator){
    const inputLocator = page.locator(locator);
    const inputValue = await inputLocator.inputValue();
    console.log(`value from input: ${inputValue}`);
    return inputValue;
    }

    static async verifyGender(page: Page, gender: string, expectedState: boolean) {
        
        const isChecked = await page.isChecked(`input[name="gender"][value="${gender}"]`);
        expect(isChecked).toBe(expectedState);
      }

      
}
