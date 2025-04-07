import { expect, Locator, Page } from '@playwright/test';

export class ThemeMode {
  readonly page: Page;
  readonly themeModeToggleSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.themeModeToggleSelector = page.locator('button.clean-btn.toggleButton_gllP'); // Selector for theme toggle button
  }

  // Method to toggle theme mode between light and dark
  async toggleThemeMode(): Promise<void> {
    await this.themeModeToggleSelector.click(); // Toggle the theme (light/dark)
  }

  // Get the current theme (checks the `data-theme` attribute)
  private async getCurrentTheme(): Promise<string> {
    return this.page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') || 'light'; // Default to 'light' if no attribute
    });
  }

  // Enable dark mode if not already enabled
  async enableDarkMode(): Promise<void> {
    if (await this.getCurrentTheme() !== 'dark') {
      await this.toggleThemeMode(); // Toggle dark mode if not already enabled
    }
  }

  // Enable light mode if not already enabled
  async enableLightMode(): Promise<void> {
    if (await this.getCurrentTheme() !== 'light') {
      await this.toggleThemeMode(); // Toggle light mode if not already enabled
    }
  }

  // Check if dark mode is enabled
  async isDarkModeEnabled(): Promise<boolean> {
    return await this.getCurrentTheme() === 'dark';
  }

  // Check if light mode is enabled
  async isLightModeEnabled(): Promise<boolean> {
    return await this.getCurrentTheme() === 'light';
  }
}