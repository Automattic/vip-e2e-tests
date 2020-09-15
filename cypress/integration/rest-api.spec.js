describe('REST API tests', () => {
  // we can use these values to log in
  const username = 'admin';
  const password = 'password';

  context('Reusable "login" custom command', () => {
    beforeEach(() => {
      // login before each test
      cy.loginByForm(username, password);
    });

    it('can visit /wp-json/', () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.request('wp-json/').then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('name', 'WordPress Local SVN');
      });
    });

    it('can visit wp-json/wp/v2/posts', () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.request('wp-json/wp/v2/posts').then((response) => {
        // response.body is automatically serialized into JSON
        // how many posts do we have here? Should we account for more?
        expect(response.body.length).to.be.at.least(1);
        expect(response.body[1]).to.have.property('title');
        // what if we check for a custom property?
        expect(response.body[1]).to.not.have.property('my_custom_prop');
      });
    });
  });
});
