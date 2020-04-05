// https://docs.cypress.io/api/introduction/api.html

describe('Navigation', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('.navbar-brand', 'Voyager');
  });

  it('Visits the solution explorer page', () => {
    cy.visit('/');
    cy.contains('h1', 'Solution Explorer');
    cy.contains('h4', 'Getting started');
  });

  it('Visits the about page', () => {
    cy.visit('/#/about');
    cy.contains('h2', 'About');
  });
});
