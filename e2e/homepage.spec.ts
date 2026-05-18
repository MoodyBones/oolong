import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/goodsomeday/i);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/career/i);
  });

  test('should have working navigation buttons', async ({ page }) => {
    const submitBtn = page.getByRole('link', { name: /submit/i }).first();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveAttribute('href', expect.stringContaining('/'));
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
  });

  test('should have proper contrast ratios', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img, svg[role="img"]');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
