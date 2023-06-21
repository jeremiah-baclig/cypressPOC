import landingPage from "./landingPage";

const landing = new landingPage();

class cartPage {
	verifyShoppingCartLength() {
		landing.checkShoppingCartBadge().then((res) => {
			cy.get("[class='cart_list']")
				.find("[class='cart_item']")
				.should('have.length', res);
		});
	}

    checkoutCart() {
        const checkoutButton = cy.get("[data-test='checkout']");
		checkoutButton.click();
    }
}

export default cartPage;
