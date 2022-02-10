describe('WordPress Admin Plugin Tests', () => {
  context('Login ahead of tests', () => {
    beforeEach(() => {
      cy.loginByForm();
    });

    it('can find a Hello Dolly lyric', () => {
      cy.visit('/wp-admin/');
      cy.get('#dolly');
      cy.get('#contextual-help-link').should('be.visible');
    });
  });
});
