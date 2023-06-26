class menuDrawer {
    openMenu() {
        const menuButton = cy.get("[id='react-burger-menu-btn']");
		menuButton.click();
    }

	logOut() {
		const logOutButton = cy.get("[id='logout_sidebar_link']");
		logOutButton.click();
	}
}

export default menuDrawer;
