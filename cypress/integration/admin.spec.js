describe('WordPress Admin Tests', () => {
	context('Login ahead of tests', () => {
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

		it('can visit /wp-admin/options-general.php and read options', () => {
			// or another protected page
			cy.visit('/wp-admin/options-general.php');
			cy.get('.wrap h1').should('contain', 'General Settings');
			cy.get('input[name="blogname"]')
				.invoke('val')
				.should('not.be.empty');
		});
	});

	context('Test rewrite rules', () => {
		beforeEach(() => {
			// login before each test
			cy.loginByForm();
		});

		it('can visit /wp-admin/options-permalink.php', () => {
			// after cy.request, the session cookie has been set
			// and we can visit a protected page
			cy.visit('/wp-admin/options-permalink.php');
			cy.get('#contextual-help-link').should('contain', 'Help');
		});

		it('can visit /wp-admin/options-general.php and write options', () => {
			// let's ensure that the permalinks are set to the correct setting, and in this case, force.
			cy.visit('/wp-admin/options-permalink.php');
			cy.get('.wrap h1').should('contain', 'Permalink Settings');
			cy.get('form')
				.find('[name="selection"]')
				.check(['/%year%/%monthnum%/%postname%/']);
			cy.get('#submit').click();
			cy.get('div.notice')
				.should('be.visible')
				.and('contain', 'Permalink structure updated.');
		});
	});
});
