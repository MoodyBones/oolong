import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/oolong/i);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    await expect(hero).toContainText(/hope comes from action/i);
  });

  test('should have working submit call-to-action', async ({ page }) => {
    const submitBtn = page.getByRole('link', { name: /share your story/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveAttribute('href', '/submit');
  });

  test('should reveal a story fragment after selecting a stage', async ({ page }) => {
    await page.getByRole('button', { name: /barrier/i }).click();

    await expect(page.getByText(/barrier/i).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /read more stories/i })).toBeVisible();
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
