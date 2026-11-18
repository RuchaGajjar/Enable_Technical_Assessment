
import { test, expect } from '@playwright/test';

test('user can add two products to the cart', async ({ page }) => {

    // Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify successful login
    await expect(page).toHaveURL(/inventory.html/);

    // Open Sauce Labs Backpack
    await page.locator('[data-test="item-4-title-link"]').click();

    // Add product to cart
    await page.locator('[data-test="add-to-cart"]').click();

    // Return to products page
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory.html/);

    // Open Sauce Labs Bike Light
    await page.locator('[data-test="item-0-title-link"]').click();

    // Add product to cart
    await page.locator('[data-test="add-to-cart"]').click();

    // Open shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart.html/);

    // Verify both products are displayed in the cart
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);

   await expect(
    cartItems.filter({ hasText: 'Sauce Labs Backpack' })
).toHaveCount(1);

await expect(
    cartItems.filter({ hasText: 'Sauce Labs Bike Light' })
).toHaveCount(1);

    // Verify Remove button exists for each product
    const removeButtons = page.getByRole('button', { name: 'Remove' });
    await expect(removeButtons).toHaveCount(2);

    // Verify Continue Shopping button
    await expect(
        page.locator('[data-test="continue-shopping"]')
    ).toBeVisible();

    // Verify Checkout button
    await expect(
        page.locator('[data-test="checkout"]')
    ).toBeVisible();

});
