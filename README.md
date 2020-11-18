# VIP e2e Testing Library

Kicking off a Cypress powered end to end testing library for VIP Go powered integration tests.

## Getting Started

You'll need to have a local version of WordPress running. There are many ways to do this, but one way is [with Lando](https://docs.lando.dev/config/wordpress.html). If you name your lando app "test-bed", then you won't have to make any modifications to `cypress.json`.

If you install via another method, or use a different app name, you will have to modify the `baseUrl` to match.

The username and password you create as part of the WordPress install, will be needed by cypress to run tests. This project assumes a username of "testuser" but that can be modified in `cypress.json`.

You'll notice password is blank. This is intentional as passwords should not be stored in a repo. We have also included `cypress.env.json.example`. You can copy this file, removing the .example extension and store your password there. That file is ignored by git.
