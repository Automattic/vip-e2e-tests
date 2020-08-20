describe('WordPress Admin Tests', () => {
  // we can use these values to log in
  const username = 'admin';
  const password = 'password';

  context('Login ahead of tests', () => {
    beforeEach(() => {
      // login before each test
      cy.loginByForm(username, password);
    });

    it('can visit /wp-admin/', () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.visit('/wp-admin/');
      cy.get('.display-name').should('contain', 'Admin');
    });

    it('can visit /wp-admin/options-general.php and read options', () => {
      // or another protected page
      cy.visit('/wp-admin/options-general.php');
      cy.get('.wrap h1').should('contain', 'General Settings');
      cy.get('input[name="blogname"]').should('have.value', 'WordPress Local SVN');
    });
  });

  context('Test rewrite rules', () => {
    beforeEach(() => {
      // login before each test
      cy.loginByForm(username, password);
    });

    it('can visit /wp-admin/options-permalink.php', () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.visit('/wp-admin/options-permalink.php');
      cy.get('.display-name').should('contain', 'Admin');
    });

    it('can visit /wp-admin/options-general.php and read options', () => {
      // let's ensure that the permalinks are set to the correct setting, and in this case, force.
      cy.visit('/wp-admin/options-permalink.php');
      cy.get('.wrap h1').should('contain', 'Permalink Settings');
      cy.get('form').find('[name="selection"]').check(['/index.php/%year%/%monthnum%/%postname%/']);
      cy.get('#submit').click();
      cy.get('div.notice').should('be.visible').and('contain', 'Permalink structure updated.');
    });
  });
});
