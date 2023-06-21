class overviewPage {
    submitOrder() {
		const finishButton = cy.get("button[data-test='finish']");
		finishButton.click();
    }

    confirmOrderComplete() {
        cy.get("[id='checkout_complete_container']");

        const homeButton = cy.get("[data-test='back-to-products']");
        homeButton.click();
    }
}

export default overviewPage;
