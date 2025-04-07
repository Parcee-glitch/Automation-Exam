import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchField: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator('.navbarSearchContainer_Bca1');
    this.searchResults = page.locator('.DocSearch-Hits a');
  }

  async searchFor(term: string) {
    await this.searchField.click();
    const input = this.page.locator('input[type="search"]');
    await input.fill(term);
    await this.page.waitForSelector('.DocSearch-Hits');
  }

  async clickFirstResult() {
    const firstResult = this.searchResults.first();
    const href = await firstResult.getAttribute('href');

    if (!href) {
      throw new Error('Search result has no href attribute.');
    }

    await firstResult.click();
    await expect(this.page).toHaveURL(new RegExp(href));
  }
}
