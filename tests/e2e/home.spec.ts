import { test, expect } from '@playwright/test'

test('home page lists the 7 tasks', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Seven GUI Tasks')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Counter' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Temperature Converter' })).toBeVisible()
})
