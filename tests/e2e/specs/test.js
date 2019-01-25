// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Project Voyager');
  });

  it('Visits the about page', () => {
    cy.visit('/');
    cy.contains('About').click();
    cy.contains('p', 'Loading...');
    cy.contains('.card-title', 'Metrics');
  });
});
