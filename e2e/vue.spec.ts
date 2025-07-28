import { test, expect } from '@playwright/test'

test('should display home page correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Home')
})
