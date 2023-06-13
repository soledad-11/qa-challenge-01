// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
chai.Assertion.addMethod('beValid24Hour', function () {
  const hour = this._obj;
  this.assert(
    hour >= 0 && hour <= 23,
    'Expected #{this} to a valid hour value in 24hs format',
    'Expected #{this} not to be a valid hour value in 24hs format',
    hour >= 0 && hour <= 23
  );
});


chai.Assertion.addMethod('beValidMinutes', function () {
  const actualValue = this._obj; // Get the actual value
  // Assert the result
  this.assert(
    /^(0|15|30|45)$/.test(actualValue),
    `Expected ${actualValue} to be a valid minute value format.`,
    `Expected ${actualValue} to not be a valid minute value format.`,
    /^(0|15|30|45)$/,
    actualValue
  );
});
