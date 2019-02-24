// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('.navbar-brand', 'Voyager');
  });

  it('Visits the configuration page', () => {
    cy.visit('/');
    cy.contains('Configuration').click();
    cy.contains('h2', 'Configurations');
  });
});
