import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display main content correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Seven GUI Tasks' })).toBeVisible()
    await expect(
      page.getByText('7 GUIs is a popular list of seven user interface development tasks'),
    ).toBeVisible()
  })

  test('should have proper header navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Seven GUIs' })).toBeVisible()

    const homeLink = page.getByRole('link', { name: 'Home', exact: true })
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveAttribute('href', '/')
  })

  test('should have working tasks dropdown', async ({ page }) => {
    const tasksDropdown = page.getByRole('button', { name: 'Tasks' })
    await expect(tasksDropdown).toBeVisible()

    await tasksDropdown.click()

    const dropdownContent = page.locator('[role="menu"]')
    await expect(dropdownContent).toBeVisible()

    const expectedTasks = [
      'Counter',
      'Temperature Converter',
      'Flight Booker',
      'Timer',
      'CRUD',
      'Circle Drawer',
      'Cells',
    ]

    for (const task of expectedTasks) {
      await expect(page.getByRole('menuitem', { name: new RegExp(task) })).toBeVisible()
    }
  })

  test('should navigate to tasks from dropdown', async ({ page }) => {
    const tasksDropdown = page.getByRole('button', { name: 'Tasks' })
    await tasksDropdown.click()

    await page.getByRole('menuitem', { name: /Counter/ }).click()
    await expect(page).toHaveURL('/counter')

    await page.goto('/')
    await tasksDropdown.click()
    await page.getByRole('menuitem', { name: /Temperature Converter/ }).click()
    await expect(page).toHaveURL('/temperature-converter')
  })

  test('should have working about link', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /About/ })
    await expect(aboutLink).toBeVisible()
    await expect(aboutLink).toHaveAttribute('href', 'https://eugenkiss.github.io/7guis/')
    await expect(aboutLink).toHaveAttribute('target', '_blank')
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('header')).toBeVisible()

    const dropdown = page.getByRole('button', { name: 'Tasks' })
    await expect(dropdown).toHaveAttribute('aria-haspopup', 'menu')
  })

  test('should handle keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Tasks' })).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(page.locator('[role="menu"]')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('[role="menu"]')).not.toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.getByRole('heading', { name: 'Seven GUIs' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Tasks' })).toBeVisible()

    const tasksDropdown = page.getByRole('button', { name: 'Tasks' })
    await tasksDropdown.click()
    await expect(page.locator('[role="menu"]')).toBeVisible()
  })

  test('should maintain state during navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Tasks' }).click()
    await page.getByRole('menuitem', { name: /Counter/ }).click()

    await expect(page).toHaveURL('/counter')
    await expect(page.getByText('First task of')).toBeVisible()

    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Seven GUI Tasks' })).toBeVisible()
  })

  test('should close dropdown when clicking outside', async ({ page }) => {
    const tasksDropdown = page.getByRole('button', { name: 'Tasks' })
    await tasksDropdown.click()

    await expect(page.locator('[role="menu"]')).toBeVisible()

    await page.mouse.click(10, 10)
    await expect(page.locator('[role="menu"]')).not.toBeVisible()
  })

  test('should handle dropdown keyboard navigation', async ({ page }) => {
    const tasksDropdown = page.getByRole('button', { name: 'Tasks' })
    await tasksDropdown.click()

    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('menuitem', { name: /Counter/ })).toBeFocused()

    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('menuitem', { name: /Temperature Converter/ })).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/temperature-converter')
  })
})
