export const selectAllElements = (selectorType: string, name: string) => {
	cy.get(`[${selectorType}^="${name}"]`).each((item) => {
		cy.wrap(item).click();
	});
};
