import { test, expect } from '@playwright/test';

test('page loads correctly', async ({ page }) => {
  await page.goto('https://thai-agriculture-prices.vercel.app');
  await expect(page).toHaveTitle(/Thai Agricultural Prices/i);
});
