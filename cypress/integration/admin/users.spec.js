describe('WordPress User Tests', () => {
	context('Creating a new Editor', () => {
		beforeEach(() => {
			// login before each test
			cy.loginByForm();
		});

		it('can visit /wp-admin/', () => {
			// after cy.request, the session cookie has been set
			// and we can visit a protected page
			cy.visit('/wp-admin/');
			cy.get('#contextual-help-link').should('contain', 'Help');
		});
	});
});
