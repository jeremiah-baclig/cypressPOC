import { selectAllElements } from '../../data/helpers';

class landingPage {
	goToItem(itemNumber: number) {
		const itemSelect = cy.get(`[id='item_${itemNumber}_title_link']`);
		itemSelect.click();
	}

	addAllToCart(type: string, selector: string) {
		selectAllElements(type, selector);
	}

	goToCart() {
		const cartButton = cy.get("[id='shopping_cart_container']");
		cartButton.click();
	}

	selectFilterOption(option: string) {
		const filterDropdown = cy.get("[data-test='product_sort_container']");

		if (option in ['az', 'za', 'lohi', 'hilo']) {
			filterDropdown.select(option);
		}
	}

	checkShoppingCartBadge() {
		return cy
			.get("[class='shopping_cart_badge']")
			.invoke('text')
			.then((text) => {
				return text;
			});
	}

	verifyShoppingCartLength(length: number) {
		if (length > 0) {

		} else {
			this.checkShoppingCartBadge().then((res) => {
				cy.get("[class='cart_list']")
					.find("[class='cart_item']")
					.should('have.length', res);
			});
		}
	}
}

export default landingPage;
