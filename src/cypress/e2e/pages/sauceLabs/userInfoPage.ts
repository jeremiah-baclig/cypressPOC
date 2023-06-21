class userInfoPage {
    submitUserInfo(first: string, last: string, code: number) {
		const firstNameField = cy.get("input[data-test='firstName']");
		const lastNameField = cy.get("input[data-test='lastName']");
		const postalCodeField = cy.get("input[data-test='postalCode']");
		const continueButton = cy.get("input[data-test='continue']");

		firstNameField.type(first);
		lastNameField.type(last);
		postalCodeField.type(code.toString());
		continueButton.click();
    }
}

export default userInfoPage;
