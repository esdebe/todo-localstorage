import { test, expect } from '@playwright/test'

const host = 'http://localhost:3000'

test.beforeEach(async ({ page }) => {
  await page.goto(host)
})

test.afterEach(async ({ page }) => {
  await page.evaluate(`window.localStorage.clear()`)
})

test.describe('Todo App', () => {
  test('Show App', async ({ page }) => {
    const header = page.locator('h1')
    const headerCount = await header.count()
    const headerText = await header.innerText()
    expect(headerCount).toEqual(1)
    expect(headerText).toEqual('Todo')

    const inputTitle = page.locator('[placeholder="Whats Next \\?"]')
    await inputTitle.fill('first todo')
    const inputTitleValue = await inputTitle.inputValue()
    expect(inputTitleValue).toEqual('first todo')

    const buttonFooter = page.locator('button:has-text("Remove Completed")')
    const buttonFooterText = await buttonFooter.textContent()
    expect(buttonFooterText).toContain('(0)')

    const buttonHigh = page.locator('button[title="High"]')
    expect(await buttonHigh.count()).toEqual(1)
    await buttonHigh.click()

    const buttonSave = page.locator('button[type="submit"]')
    expect(await buttonSave.count()).toEqual(1)
    await buttonSave.click()

    await page.locator('input[type="checkbox"]').check()

    const buttonFooterAfter = page.locator('button:has-text("Remove Completed")')
    const buttonFooterAfterText = await buttonFooterAfter.textContent()
    expect(buttonFooterAfterText).toContain('(1)')
    await page.locator('text=Remove Completed (1)').click()
  })
})
