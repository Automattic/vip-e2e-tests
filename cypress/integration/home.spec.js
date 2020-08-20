describe('Home Page', () => {
  context('Check the DOM on the home page.', () => {
    it('can visit /', () => {
      cy.visit('/');
      cy.get('header h1')
        .should('contain', 'WordPress Local SVN')
        .should('have.class', 'site-title');
      cy.get('.site-description')
        .invoke('text')
        .should('equal', 'Just another WordPress site');
    });

    it('can visit /sample-page', () => {
      cy.visit('/index.php/sample-page/');
      cy.get('header h1.entry-title').should('contain', 'Sample Page');
    });
  });
});
