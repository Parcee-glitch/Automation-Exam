import { expect, Locator, Page } from '@playwright/test';
import config from '../config/configs.js';

export class FooterPage {
  readonly page: Page;
  readonly footer: Locator;
  readonly footerLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footer = page.locator('footer');
    this.footerLinks = this.footer.locator('a');
  }

  // Verify the footer is visible
  async verifyFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  // Verify that all footer links redirect correctly
  async verifyFooterLinksRedirect() {
    const count = await this.footerLinks.count();
  
    for (let i = 0; i < count; i++) {
      const link = this.footerLinks.nth(i);
      const href = await link.getAttribute('href');
  
      if (!href || href.startsWith('#')) {
        continue; // Skip links with no href or hash-based links
      }
  
      const isExternal = href.startsWith('http') && !href.includes('playwright.dev');
  
      if (isExternal) {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          link.click()
        ]);
  
        try {
          await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
          const finalUrl = newPage.url();
  
          // Only check for Discord URL if it contains 'discord.com'
          if (href.includes('discord.com')) {
            expect(finalUrl).toMatch(/discord\.com\/servers\/playwright/);
          }
        } finally {
          await newPage.close();
        }
      } else {
        const expectedUrl = new URL(href, config.baseURL).toString();
  
        await Promise.all([
          this.page.waitForURL(expectedUrl, { timeout: 10000 }),
          link.click()
        ]);
  
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
        await expect(this.page).toHaveURL(expectedUrl, { timeout: 5000 });
  
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
        await expect(this.page).toHaveURL(config.baseURL, { timeout: 5000 });
      }
    }
  }  
}
