describe('WordPress Admin Plugin Tests', () => {
  context('Login ahead of tests', () => {
    beforeEach(() => {
      // login before each test
      cy.loginByForm();
    });

    it('can find a Hello Dolly lyric', () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.visit('/wp-admin/');
      cy.get('#dolly');
      cy.get('#contextual-help-link').should('be.visible');
    });
  });
});
