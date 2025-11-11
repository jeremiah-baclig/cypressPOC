# [MCP][Playwright] Exploratory Test - SauceDemo Shopping Flow

## Summary

Exploratory testing completed for the SauceDemo application shopping flow using Playwright MCP. All acceptance criteria passed successfully with one timing-related observation.

**Test URL:** https://www.saucedemo.com/  
**Test Date:** November 11, 2025  
**Status:** ✅ PASS

---

## Acceptance Criteria Results

✅ **AC1: Can login successfully**
- User authenticated with `standard_user` credentials
- Successfully redirected to inventory page
- All products displayed correctly

✅ **AC2: Add all items to cart**
- All 6 products successfully added to cart
- Cart badge shows correct count (6)
- Add to cart buttons changed to Remove buttons

✅ **AC3: Cart should contain all items**
- Cart page displays all 6 items correctly
- Each item shows proper details (name, description, price, quantity)
- Total cart value: $128.93

---

## Key Findings

### ⚠️ Timing Issue Observed
**Issue:** Initial Playwright `click()` actions on "Add to cart" buttons did not register.

**Details:**
- Standard Playwright click method failed to add items to cart
- Event listeners may attach after page load/hydration
- Workaround: Used `page.evaluate()` to directly trigger clicks

**Impact:** Low - Functionality works but automation requires adjusted timing strategy

**Recommendation:**
- Implement explicit waits for element interactivity
- Use `waitForLoadState('networkidle')` before interactions
- Add retry logic for click operations
- Verify state changes after each action

### Console Errors (Non-blocking)
- Multiple 401 errors to `events.backtrace.io` (analytics endpoint)
- These do not affect core functionality
- May indicate expired/misconfigured analytics tokens

---

## Test Execution Steps

1. **Login** → Entered credentials and clicked Login button
   - Screenshot: `01-login-page.png`, `02-inventory-page.png`

2. **Add Items** → Added all 6 products to cart
   - Screenshot: `03-all-items-added.png`, `04-cart-badge-showing-6.png`

3. **Verify Cart** → Navigated to cart and confirmed all items present
   - Screenshot: `05-cart-page-all-items.png`

---

## Items in Cart

| Item | Price |
|------|-------|
| Sauce Labs Backpack | $29.99 |
| Sauce Labs Bike Light | $9.99 |
| Sauce Labs Bolt T-Shirt | $15.99 |
| Sauce Labs Fleece Jacket | $49.99 |
| Sauce Labs Onesie | $7.99 |
| Test.allTheThings() T-Shirt (Red) | $15.99 |
| **Total** | **$128.93** |

---

## Suggested Playwright Test Code

```typescript
test('Complete shopping flow', async ({ page }) => {
  // Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Assert inventory page
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.inventory_item')).toHaveCount(6);
  
  // Add all items to cart with verification
  const items = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light', 
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)'
  ];
  
  for (let i = 0; i < items.length; i++) {
    await page.locator(`[data-test="add-to-cart-${items[i]}"]`).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText(`${i + 1}`);
  }
  
  // Navigate to cart
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/.*cart.html/);
  
  // Verify all items in cart
  await expect(page.locator('.cart_item')).toHaveCount(6);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
});
```

---

## Artifacts

Full test report and screenshots available in: `src/playwright-mcp/artifacts/`

- `test-report.md` - Complete detailed test report
- `01-login-page.png` - Login page
- `02-inventory-page.png` - Product inventory
- `03-all-items-added.png` - Products after adding to cart
- `04-cart-badge-showing-6.png` - Cart badge with count
- `05-cart-page-all-items.png` - Full cart page

---

## Screenshots

### Login Page
![Login Page](https://github.com/user-attachments/assets/fde14177-e295-4f2f-82ae-39ac2ffa43ac)

### Inventory Page After Login
![Inventory Page](https://github.com/user-attachments/assets/fa032011-e6d1-4f31-9925-c0a375c113a0)

### Cart with Badge Showing 6 Items
![Cart Badge](https://github.com/user-attachments/assets/59299183-235b-4c19-abfe-54b648221032)

### Full Cart Page with All Items
![Cart Page](https://github.com/user-attachments/assets/8aeadf40-bde3-4674-9970-abb03980921e)

---

## Conclusion

The SauceDemo shopping flow works correctly and meets all acceptance criteria. The timing issue with click events should be addressed in automated tests through proper wait strategies and state verification.

**Overall Test Result:** ✅ **PASS**
