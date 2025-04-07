import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FooterPage } from '../pages/footerPage';

// Test to verify Playwright homepage loads and title
test('Verify Playwright homepage loads', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPlaywright();
    await expect(page).toHaveTitle(/Playwright/);
});

// Test to verify Playwright header links loads
test('Navigate to header links', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPlaywright();

    // Verify Docs redirection
    await homePage.navigateToDocs();
    await expect(page.locator('h1')).toHaveText('Installation');

    // Verify API redirection
    await homePage.navigateToAPI();
    await expect(page.locator('h1')).toHaveText('Playwright Library');

    // Verify Community redirection
    await homePage.navigateToCommunity();
    await expect(page.locator('h1')).toHaveText('Welcome');

});

    // Verify NodeJS and submenus redirection
test('Verify NodeJS and submenus', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPlaywright();

        await homePage.verifyAllSDKOptions();
        const sdkNames = ['Node.js', 'Python', '.NET', 'Java'];
    
        for (const sdk of sdkNames) {
          await homePage.openDropdown();
          await homePage.selectSDK(sdk);
          await homePage.verifyURLForSDK(sdk);        }
      });

    // Test to verify Get started link loads
    test('Verify Get Started', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPlaywright();
    
        // Verify Get Started is visible and functional
        await homePage.navigateToGetStarted();

    });

    // Test to verify Playwright homepage footer links loads
    test('Verify footer links', async ({ page }) => {
    const homePage = new HomePage(page);
    const footerPage = new FooterPage(page);
    await homePage.navigateToPlaywright();

    // Verify Footer is visible
    await footerPage.verifyFooterVisible();

    // Verify Footer redirection
    await footerPage.verifyFooterLinksRedirect();
});