import { test, expect } from '@playwright/test';

test('user selects filters and views price table', async ({ page }) => {
  await page.goto('https://thai-agriculture-prices.vercel.app');

  // Step 1: Wait for Product Type to load and select "ขายปลีก"
  const typeDropdown = page.locator('[data-testid="product-type"]');
  await expect(typeDropdown).toBeVisible();
  await page.waitForFunction(() => {
    const select = document.querySelector('[data-testid="product-type"]');
    return select && select.options.length > 1;
  });
  await typeDropdown.selectOption({ label: 'ขายปลีก' });

  // Step 2: Wait for Product Group and select "เนื้อสัตว์"
  const groupDropdown = page.locator('[data-testid="product-group"]');
  await expect(groupDropdown).toBeVisible();
  await page.waitForFunction(() => {
    const select = document.querySelector('[data-testid="product-group"]');
    return select && select.options.length > 1;
  });
  await groupDropdown.selectOption({ label: 'เนื้อสัตว์' });

  // Step 3: Wait for Product Name and select "สุกรชำแหละ เนื้อสัน สันใน"
  const nameDropdown = page.locator('[data-testid="product-name"]');
  await expect(nameDropdown).toBeVisible();
  await page.waitForFunction(() => {
    const select = document.querySelector('[data-testid="product-name"]');
    return select && select.options.length > 1;
  });
  await nameDropdown.selectOption({ label: 'สุกรชำแหละ เนื้อสัน สันใน' });

  // Step 4: Pick date range
  await page.fill('[data-testid="start-date"]', '2025-04-01');
  await page.fill('[data-testid="end-date"]', '2025-04-07');

  // Step 5: Click Search
  await page.click('[data-testid="search-button"]');

  // Step 6: Wait for table to appear
  const table = page.locator('table');
  await expect(table).toBeVisible();

  // Step 7: Assert there are rows
  const rowCount = await table.locator('tbody tr').count();
  expect(rowCount).toBeGreaterThan(0);
});
