describe('Filters', () => {
  beforeEach(() => {
    cy.loadCsvData();
    cy.visit("/");
  });

  it('Shows optimal and non-optimal configurations', () => {
    // Select one filter
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().contains("config-2");
    cy.get(".config-list").children().last().contains("config-1");
  });

  it('Allows changing attribute optimisation aim (higher/lower is better)', () => {
    // Select one filter
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().contains("config-2");
    cy.get(".config-list").children().last().contains("config-1");

    // Change optimisation goal
    cy.contains(".custom-radio", "Lower is better").children().last().click();
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().contains("config-1");
    cy.get(".config-list").children().last().contains("config-2");
  });

  it('Allows changing the acceptable range of an attribute', () => {
    // Select one filter
    cy.contains(".custom-checkbox", "Cost").children().last().click();
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().contains("config-2");
    cy.get(".config-list").children().last().contains("config-1");
    cy.get("p.mb-2").contains("Showing 2 of 2");

    // Change selected range
    cy.get("input.multirange.ghost").as('range')
      .invoke('val', 25).trigger('input', { force: true });
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().children().should('have.length', 2);
    cy.get(".config-list").children().last().children().should('have.length', 1);
    cy.get(".config-list").children().first().contains("config-1");
    cy.get("p.mb-2").contains("Showing 1 of 2");

    // Change selected range
    cy.get("input.multirange.original").as('range')
      .invoke('val', 20).trigger('input', { force: true });
    cy.get(".config-list").children().should('have.length', 2);
    cy.get(".config-list").children().first().children().should('have.length', 1);
    cy.get(".config-list").children().last().children().should('have.length', 1);
    cy.get("p.mb-2").contains("Showing 0 of 2");
  });
});