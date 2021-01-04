describe('WordPress Wedgnt Tests', () => {
	context('Login ahead of tests', () => {
		Cypress.Cookies.defaults({
			preserve: /wordpress_.*/,
		});
		before(() => {
			cy.loginByForm();
		});

		it('can visit /wp-admin/widgets.php', () => {
			// after cy.request, the session cookie has been set
			// and we can visit a protected page
			cy.visit('/wp-admin/widgets.php');
			cy.get('h1.wp-heading-inline').should('contain', 'Widgets');
		});

		context('Work with widgets', () => {
			it('can add a widget', () => {
				cy.get('#widgets-right .widgets-holder-wrap .widget')
					.its('length')
					.then((preAddWidgetCount) => {
						cy.get('.widget-title h3').contains('Archives').click();
						cy.get('.widgets-chooser-add').click();

						cy.get(
							'#widgets-right .widgets-holder-wrap .widget'
						).should('have.length', preAddWidgetCount + 1);
					});
			});

			it('can modify a widget', () => {
				cy.get('#widgets-right .widgets-holder-wrap .widget-title h3')
					.contains('Archives')
					.first()
					.click();
				cy.get('#widgets-right .widgets-holder-wrap .widget.open')
					.first()
					.find('input[type="text"]')
					.type('A widget title');
				cy.get('#widgets-right .widgets-holder-wrap .widget.open')
					.first()
					.find('input.button-primary')
					.click();
			});

			it('can delete a widget', () => {
				cy.get('#widgets-right .widgets-holder-wrap .widget')
					.its('length')
					.then((preAddWidgetCount) => {
						cy.get(
							'#widgets-right .widgets-holder-wrap .widget-title h3'
						)
							.contains('Archives')
							.first()
							.click();
						cy.get(
							'#widgets-right .widgets-holder-wrap .widget.open'
						)
							.first()
							.find('.button-link-delete')
							.click();
						cy.get(
							'#widgets-right .widgets-holder-wrap .widget'
						).should('have.length', preAddWidgetCount - 1);
					});
			});
		});
	});
});
