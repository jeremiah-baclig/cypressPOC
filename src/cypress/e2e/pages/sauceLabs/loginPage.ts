class loginPage {
	hostUrl: string;

	constructor() {
		this.hostUrl = 'https://www.saucedemo.com/';
	}

	navigate() {
		cy.visit(this.hostUrl, {
			timeout: 5000,
		});
	}

	loginAs(user: string, password: string) {
		const userField = cy.get("input[data-test='username']");
		const passwordField = cy.get("input[data-test='password']");
		const loginButton = cy.get("input[data-test='login-button']");

		userField.type(user);
		passwordField.type(password);
		loginButton.click();
	}

    getAndAssertError() {
        cy.get("[data-test='error']").then((toast) => {
            if(toast.is(':visible')) {
                assert.isOk;
            }
        });
    }
}

export default loginPage;
