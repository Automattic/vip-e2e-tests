describe("Logging In - WordPress Admin", () => {
  // we can use these values to log in
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  // it is ok for the username to be visible in the Command Log
  expect(username, "username was set").to.be.a("string").and.not.be.empty;
  // but the password value should not be shown
  if (typeof password !== "string" || !password) {
    throw new Error("Missing password value, set in cypress.env.json");
  }

  context("Unauthorized", () => {
    it("is redirected on visit to /wp-login.php when no session", () => {
      // we must have a valid session cookie to be logged
      // in else we are redirected to /unauthorized
      cy.visit("/wp-admin/");
      cy.get("h1").should("contain", "Powered by WordPress");

      cy.url().should("include", "redirect_to");
    });

    it("is redirected using cy.request", () => {
      // instead of visiting the page above we can test this by issuing
      // a cy.request, checking the status code and redirectedToUrl property.

      // See docs for cy.request: https://on.cypress.io/api/request

      // the 'redirectedToUrl' property is a special Cypress property under the hood
      // that normalizes the url the browser would normally follow during a redirect
      cy.request({
        url: "/wp-admin/",
        followRedirect: false, // turn off following redirects automatically
      }).then((resp) => {
        // should have status code 302
        expect(resp.status).to.eq(302);

        // when we turn off following redirects Cypress will also send us
        // a 'redirectedToUrl' property with the fully qualified URL that we
        // were redirected to.
        expect(resp.redirectedToUrl).to.eq(
          `${
            Cypress.config().baseUrl
          }/wp-login.php?redirect_to=${encodeURIComponent(
            Cypress.config().baseUrl
          )}%2Fwp-admin%2F&reauth=1`
        );
      });
    });
  });

  context("HTML form submission", () => {
    beforeEach(() => {
      cy.visit("/wp-login.php");
    });

    it("displays errors on login", () => {
      cy.wait(500);
      // incorrect username on purpose
      cy.get("input[name=log]").type("jane.wordpress");
      cy.get("input[name=pwd]").type("password123{enter}");

      // we should have visible errors now
      cy.get("div#login_error")
        .should("be.visible")
        .and(
          "contain",
          "Unknown username. Check again or try your email address."
        );

      // and still be on the same URL
      cy.url().should("include", "/wp-login.php");
    });

    it("redirects to /wp-admin/ on success", () => {
      cy.wait(1000);
      cy.get("input[name=log]").type(username);
      cy.get("input[name=pwd]").type(password);
      cy.get("form").submit();

      // we should be redirected to /wp-admin/
      cy.url().should("include", "/wp-admin/");
      cy.get("#contextual-help-link").should("contain", "Help");

      // and our cookie should be set to 'cypress-session-cookie'
      cy.getCookie("wordpress_test_cookie").should("exist");
    });
  });

  context("HTML form submission with cy.request", () => {
    it("can bypass the UI and yet still test log in", () => {
      // oftentimes once we have a proper e2e test around logging in
      // there is NO more reason to actually use our UI to log in users
      // doing so wastes is slow because our entire page has to load,
      // all associated resources have to load, we have to fill in the
      // form, wait for the form submission and redirection process
      //
      // with cy.request we can bypass this because it automatically gets
      // and sets cookies under the hood. This acts exactly as if the requests
      // came from the browser
      cy.request({
        method: "POST",
        url: "/wp-login.php", // baseUrl will be prepended to this url
        form: true,
        body: {
          log: username,
          pwd: password,
        },
      });

      // just to prove we have a session
      cy.getCookie("wordpress_test_cookie").should("exist");
    });
  });

  context('Reusable "login" custom command', () => {
    beforeEach(() => {
      // login before each test
      cy.loginByForm();
    });

    it("can visit /wp-admin/", () => {
      // after cy.request, the session cookie has been set
      // and we can visit a protected page
      cy.visit("/wp-admin/");
      cy.get("#contextual-help-link").should("contain", "Help");
    });

    it("can visit /wp-admin/options-general.php and read options", () => {
      // or another protected page
      cy.visit("/wp-admin/options-general.php");
      cy.get(".wrap h1").should("contain", "General Settings");
      cy.get('input[name="blogname"]').invoke("val").should("not.be.empty");
    });
  });
});
