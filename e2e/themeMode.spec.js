import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ThemeMode } from '../pages/themeMode';

// Test to check the current theme of the page
test('Check current theme', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPlaywright();
    const themeMode = new ThemeMode(page);
    const currentTheme = await themeMode.getCurrentTheme();
    console.log(`Current theme is: ${currentTheme}`);
  
    // Assert that current theme is either 'dark' or 'light'
    expect(['dark', 'light']).toContain(currentTheme);
  });

// Test to change the theme to dark mode
test('Change theme to dark mode', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPlaywright();
  const themeMode = new ThemeMode(page);

  // Enable dark mode if it's not already enabled
  await themeMode.enableDarkMode();

  // Verify dark mode is enabled
  const isDarkMode = await themeMode.isDarkModeEnabled();
  expect(isDarkMode).toBe(true);
});

// Test to change the theme to light mode
test('Change theme to light mode', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPlaywright();
  const themeMode = new ThemeMode(page);

  // Enable light mode if it's not already enabled
  await themeMode.enableLightMode();

  // Verify light mode is enabled
  const isLightMode = await themeMode.isLightModeEnabled();
  expect(isLightMode).toBe(true);
});
