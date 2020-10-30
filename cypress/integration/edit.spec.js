describe('WordPress Editor Tests', () => {
	context('Login ahead of tests', () => {
		beforeEach(() => {
			// login before each test
			cy.loginByForm();
		});

		it('can visit /wp-admin/post-new.php', () => {
			// after cy.request, the session cookie has been set
			// and we can visit a protected page
			cy.visit('wp-admin/post-new.php');
			cy.get('.editor-post-publish-button__button').should(
				'contain',
				'Publish'
			);
		});

		it('can bypass the block editor welcome box.', () => {
			cy.get('.components-button.components-guide__forward-button')
				.click()
				.click()
				.click();
			cy.get(
				'.components-button.components-guide__finish-button.is-primary'
			).click();
		});

		context("Let's write a post", () => {
			it('can write a post', () => {
				cy.get('.editor-post-title__input').type(
					'My totally awesome post'
				);
				cy.get('.block-editor-block-list__layout').type(
					'Here is the first paragraph{enter}Here is the second!'
				);
			});

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

			it('can save a draft', () => {
				cy.get('.editor-post-save-draft').click();
				cy.url().should('include', 'action=edit');
				cy.url().should('not.include', 'error');
			});
		});
	});
});
