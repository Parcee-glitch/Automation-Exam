import { expect, Page, Locator } from '@playwright/test';
import config from '../config/configs.js';

export class HomePage {
    readonly page: Page;
    readonly docsLink: Locator;
    readonly APILink: Locator;
    readonly communityLink: Locator;
    readonly languageDropdown: Locator;
    readonly languageDropdownOptions: Locator[];
    private nodeJsSelected: boolean = false; // Track if Node.js has been selected
    readonly getStarted: Locator;

    constructor(page: Page) {
        this.page = page;
        this.docsLink = page.getByRole('link', { name: 'Docs' });
        this.APILink = page.getByRole('link', { name: 'API' }).first();
        this.communityLink = page.getByRole('link', { name: 'Community' });
        this.languageDropdown = page.locator('.navbar__item.dropdown.dropdown--hoverable');
        this.languageDropdownOptions = [
            page.locator('.dropdown__link:has-text("Node.js")'),
            page.locator('.dropdown__link:has-text("Python")'),
            page.locator('.dropdown__link:has-text(".NET")'),
            page.locator('.dropdown__link:has-text("Java")'),
        ];
        this.getStarted = page.getByRole('link', { name: 'Get Started' });
    }

    // Navigate to the homepage
    async navigateToPlaywright() {
        await this.page.goto(config.baseURL);
    }

    // Navigate to Docs page
    async navigateToDocs() {
        await this.docsLink.click();    
        await expect(this.page).toHaveURL(`${config.baseURL}docs/intro`);
    }

    // Navigate to API page
    async navigateToAPI() {
        await this.APILink.click();
        await expect(this.page).toHaveURL(`${config.baseURL}docs/api/class-playwright`);
    }

    // Hover over the language dropdown and verify it's visible
    async openDropdown() {
        await this.languageDropdown.hover();
        await expect(this.languageDropdown).toBeVisible({ timeout: 5000 });
    
        for (const option of this.languageDropdownOptions) {
            await expect(option).toBeVisible({ timeout: 5000 });
        }
    }

    // Select submenus
    async selectSubmenu(submenu: string) {
        const subMenuOption = this.languageDropdown.locator(`.dropdown__link:has-text("${submenu}")`);
        await this.openDropdown();
        await expect(subMenuOption).toBeVisible({ timeout: 5000 });
        await subMenuOption.click();
    
        if (submenu === 'Node.js') {
            this.nodeJsSelected = true;
        }
    }

    // Verify URL change after selecting an SDK
    async verifyURLForSDK(submenu: string) {
        let subMenuUrl = `${config.baseURL}${submenu.toLowerCase()}`;
        
        if (submenu === 'Node.js') {
            subMenuUrl = `${config.baseURL}`;
        }
        
        if (submenu === '.NET') {
            subMenuUrl = `${config.baseURL}dotnet`;
        }
        
        await this.selectSubmenu(submenu);
        await expect(this.page).toHaveURL(new RegExp(`${subMenuUrl}/?$`), { timeout: 5000 });
    }

    // Verify all SDK options are visible in the dropdown and dynamically interact with each
    async verifyAllSDKOptions() {
        const sdkNames = ['Node.js', 'Python', '.NET', 'Java'];
        await this.openDropdown();
        let skipNodeJS = false;
        for (const sdk of sdkNames) {

            if (sdk === 'Node.js' && skipNodeJS) {
                continue; 
            }
    
            const sdkOption = this.languageDropdown.locator(`.dropdown__link:has-text("${sdk}")`);
            await this.languageDropdown.hover();
            await sdkOption.waitFor({ state: 'visible', timeout: 5000 });
            await expect(sdkOption).toBeVisible({ timeout: 5000 });
            await this.openDropdown();

            if (sdk === 'Java') {
                skipNodeJS = true; 
                break;
            }
        }
    }    

    // Navigate to Get Started 
    async navigateToGetStarted() {
        await this.getStarted.click();
        await expect(this.page).toHaveURL(`${config.baseURL}docs/intro`);
        const heading = this.page.locator('h1');
        await expect(heading).toHaveText('Installation');
      }

    // Navigate to the Community page
    async navigateToCommunity() {
        await this.communityLink.click();
        await expect(this.page).toHaveURL(`${config.baseURL}community/welcome`);
    }
}
