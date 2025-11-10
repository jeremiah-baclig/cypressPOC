# Exploratory Testing Report: Full User Journey

**Date:** 2025-11-10  
**Scenario:** Login → Add all items to cart → Navigate through purchase process → Verify success  
**Status:** ❌ FAILED - Session expired during checkout

## Test Execution Summary

### Steps Performed

1. **Login (PASS)**
   - Navigated to: https://www.saucedemo.com/
   - Filled username: `standard_user`
   - Filled password: `secret_sauce`
   - Clicked Login button
   - Successfully landed on inventory page
   - Selector used: `[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`

2. **Add All Items to Cart (PASS)**
   - Added 6 items using `[data-test="add-to-cart-{item-name}"]` selectors:
     - Sauce Labs Backpack ($29.99)
     - Sauce Labs Bike Light ($9.99)
     - Sauce Labs Bolt T-Shirt ($15.99)
     - Sauce Labs Fleece Jacket ($49.99)
     - Sauce Labs Onesie ($7.99)
     - Test.allTheThings() T-Shirt (Red) ($15.99)
   - Cart badge correctly showed "6" items
   - All buttons changed from "Add to cart" to "Remove"

3. **Navigate to Cart (PASS)**
   - Navigated to: https://www.saucedemo.com/cart.html
   - Verified all 6 items displayed in cart with correct quantities and prices
   - Total expected: $129.93

4. **Checkout Step One - Information Form (PASS)**
   - Clicked Checkout button using `[data-test="checkout"]`
   - Landed on: https://www.saucedemo.com/checkout-step-one.html
   - Filled form fields:
     - First Name: "Test"
     - Last Name: "User"
     - Zip/Postal Code: "12345"
   - Clicked Continue button

5. **Checkout Step Two - Review (FAIL)**
   - **BLOCKER**: Session expired when attempting to proceed to checkout-step-two
   - Error message: "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in."
   - User was logged out unexpectedly
   - Cannot complete purchase flow

## Failures & Issues

### Critical Issue: Session Timeout
- **Severity:** High
- **Description:** After filling checkout information and clicking Continue, the session expired and user was redirected to login page
- **Error Message:** "You can only access '/checkout-step-two.html' when you are logged in."
- **Impact:** Blocks completion of purchase flow
- **Reproduction Steps:**
  1. Login with valid credentials
  2. Add items to cart
  3. Navigate to checkout
  4. Fill in shipping information
  5. Click Continue
  6. Observe session expiration error

### Timing/Interaction Issues
- Initial "Add to cart" button clicks using Playwright click() did not register consistently
- Required using JavaScript evaluate() to programmatically click buttons
- Suggests possible timing/synchronization issues with button event handlers

## Environment Assumptions

- Browser: Chromium (via Playwright)
- Session management appears strict - no apparent session timeout warning
- Application uses client-side session storage that may be cleared during navigation
- No session persistence mechanism observed

## Console Warnings

- Multiple 401 Unauthorized errors for tracking/analytics endpoints (non-blocking)
- DOM warnings about autocomplete attributes on password fields

## Suggested Playwright Assertions

```javascript
// Login verification
await expect(page).toHaveURL(/.*inventory\.html/);
await expect(page.locator('.inventory_item')).toHaveCount(6);

// Cart badge verification
await expect(page.locator('.shopping_cart_badge')).toHaveText('6');

// Cart items verification
await expect(page.locator('.cart_item')).toHaveCount(6);

// Checkout form validation
await expect(page.locator('[data-test="firstName"]')).toBeVisible();
await expect(page.locator('[data-test="continue"]')).toBeEnabled();

// Session persistence check
await page.locator('[data-test="continue"]').click();
await expect(page).not.toHaveURL(/.*login/);
await expect(page).toHaveURL(/.*checkout-step-two\.html/);
```

## Recommendations

1. **Investigate session management:** The unexpected logout suggests a session handling bug
2. **Add explicit waits:** Use `waitForSelector()` or `waitForLoadState()` before interactions
3. **Verify button event handlers:** Some buttons require JavaScript clicks instead of native clicks
4. **Add session timeout handling:** Implement proper session expiration warnings
5. **Consider retry logic:** For flaky button interactions, implement retry mechanisms

## Artifacts Generated

- `01-login-page.png` - Initial login screen
- `02-inventory-page.png` - Product inventory after login
- `03-after-adding-items.png` - Inventory with Add to cart buttons
- `04-all-items-in-cart.png` - All items added, Remove buttons visible
- `05-cart-page-all-items.png` - Cart page showing all 6 items
- `06-checkout-step-one.png` - Checkout information form
- `07-logout-error.png` - Session expiration error

## Conclusion

The test **FAILED** due to an unexpected session expiration during the checkout process. While the initial steps (login, adding items to cart, and navigating to checkout) worked correctly, the application logged the user out when attempting to proceed from checkout step one to step two. This is a critical bug that prevents users from completing purchases.
