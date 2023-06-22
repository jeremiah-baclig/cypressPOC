class homePage {
	hostUrl: string;

	constructor() {
		this.hostUrl = 'https://jsonplaceholder.typicode.com/';
	}

	navigate() {
		cy.intercept('/cdn-cgi/rum?').as('pageLoadCall');
		cy.visit(this.hostUrl);
		cy.wait('@pageLoadCall');
	}

	clickRunScriptButton() {
		const runScriptButton = cy.get("button[id='run-button']");
		runScriptButton.click();
	}

	runScript(matchRes: string) {
		cy.intercept('/todos/1').as('todoListCall');

		this.clickRunScriptButton();

		cy.wait('@todoListCall').then((res) => {
			expect(JSON.stringify(res.response?.body)).to.eql(matchRes);
		})
	}

	/**
	 * Cypress runs 'asynchronously' in its own right by queueing up chains
	 * So we need to either wrap the extracted text into its own alias to reference later
	 * Or we can return the chain and the derived value to get later 
	 * 
	 * EDIT: this is not capturing as expected, so adjusting approach
	getCodeResult(query: string) {
		return cy
			.get(`code[id=\'${query}\']`)
			.invoke('text')
			.then((text) => {
				const extractedText = text.replace(/\s/g, '');
				return extractedText;
			});
	}
	*/
}

export default homePage;
