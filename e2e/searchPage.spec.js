import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchPage } from '../pages/searchPage';

test('Search functionality works on Playwright.dev', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);

    await homePage.navigateToPlaywright();
    await searchPage.searchFor('locator');
    await searchPage.clickFirstResult();

    // Verify that heading contains "locator"
    const heading = await page.locator('h1, h2').first();
    await expect(heading).toContainText(/locator/i);
});
