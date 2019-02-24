// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('.navbar-brand', 'Voyager');
  });

  it('Visits the explorer page', () => {
    cy.visit('/');
    cy.contains('Explorer').click();
    cy.contains('h1', 'Overview');
  });
});
