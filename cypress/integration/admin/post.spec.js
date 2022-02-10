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
      cy.clearBlockWelcomeBox();
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
        cy.wait(500);
        document.querySelectorAll(
          '.components-base-control__field  .components-circular-option-picker .components-circular-option-picker__option'
        );

        cy.get(
          '.components-base-control__field  .components-circular-option-picker'
        )
          .first()
          .find('.components-circular-option-picker__option')
          .last()
          .click();
        cy.get(
          '.components-base-control__field  .components-circular-option-picker'
        )
          .last()
          .find('.components-circular-option-picker__option')
          .eq(1)
          .click();
      });

      it('can save a draft', () => {
        cy.get('.editor-post-save-draft').click();
        cy.url().should('include', 'action=edit');
        cy.url().should('not.include', 'error');
      });

      it('can publish a post', () => {
        cy.get('.editor-post-publish-button__button').click();
        cy.wait(500);
        cy.get('.editor-post-publish-button').click();
        cy.url().should('include', 'action=edit');
        cy.url().should('not.include', 'error');
      });
    });

    context("Let's edit a post", () => {
      it('can edit a post', () => {
        cy.visit('/wp-admin/edit.php?post_type=post');
        cy.get('tr.status-publish')
          .first()
          .find('span.edit a')
          .click({ force: true });
        cy.url().should('contains', '/wp-admin/post.php');
        cy.clearBlockWelcomeBox();
        cy.get('.block-editor-block-list__layout').type(
          '{enter}And a third even!',
        );

        // cy.get('.block-editor-writing-flow__click-redirect').click();
        cy.get('.editor-post-publish-button').click();
        cy.url().should('include', 'action=edit');
        cy.url().should('not.include', 'error');
      });
    });

    context("Let's delete a post", () => {
      it('can trash a post', () => {
        cy.visit('/wp-admin/edit.php?post_type=post');
        cy.get('tr.status-publish')
          .first()
          .find('span.trash a')
          .click({ force: true });
        cy.url().should('contains', '/wp-admin/edit.php');
        cy.url().should('not.include', 'error');
      });
      it('can empty trash', () => {
        cy.visit('/wp-admin/edit.php?post_status=trash&post_type=post');
        cy.get('#delete_all').click();
        cy.url().should('contains', '/wp-admin/edit.php');
        cy.url().should('not.include', 'error');
      });
    });
  });
});
