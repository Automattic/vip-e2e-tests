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
						cy.get('.widget-title').first().click();
						cy.get('.widgets-chooser-add').click();

						cy.get(
							'#widgets-right .widgets-holder-wrap .widget'
						).should('have.length', preAddWidgetCount + 1);
					});
			});

			it('can delete a widget', () => {
				cy.get('#widgets-right .widgets-holder-wrap .widget')
					.its('length')
					.then((preAddWidgetCount) => {
						cy.get('#widgets-right .widgets-holder-wrap .widget')
							.first()
							.find('.widget-title')
							.click();
						cy.get('#widgets-right .widgets-holder-wrap .widget')
							.first()
							.find('.button-link-delete')
							.click();
						cy.get(
							'#widgets-right .widgets-holder-wrap .widget'
						).should('have.length', preAddWidgetCount - 1);
					});
			});

			/*
			it('can update some paragraph options', () => {
				cy.get(
					'.block-editor-panel-color-gradient-settings__panel-title'
				).click();
				cy.get(
					':nth-child(2) > .components-base-control__field > fieldset > .components-circular-option-picker > :nth-child(1) > .components-button'
				).click();
				cy.get(
					':nth-child(3) > .components-base-control__field > fieldset > .components-circular-option-picker > :nth-child(2) > .components-button'
				).click();
				cy.get(
					':nth-child(2) > .components-base-control__field > fieldset > .components-circular-option-picker > :nth-child(5) > .components-button'
				).click();
				cy.get(
					'.block-editor-panel-color-gradient-settings > .components-panel__body-title > .components-button'
				).click();
				cy.get(
					'.block-editor-panel-color-gradient-settings > .components-panel__body-title > .components-button'
				).click();
			});
        */
		});
	});
});
