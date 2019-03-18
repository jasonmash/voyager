describe('Charts', () => {
    it('Shows configuration radar chart', () => {
      cy.loadCsvData();
      cy.visit("/");
      cy.get(".list-group-item").contains("config-1").click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
    });

    it('Can export radar chart', () => {
      cy.loadCsvData();
      cy.visit("/");
      cy.contains("config-1").parent().click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
      cy.contains(".card", "Properties").parent().children().find("button.dropdown-toggle").click();
      cy.contains(".card", "Properties").parent().children().contains("Export (.svg)");
    });

    it('Shows configuration structure chart', () => {
      cy.loadCsvData();
      cy.loadStructureData();
      cy.visit('/');
      cy.contains("config-1").parent().click();
      cy.contains("h5", "config-1");
      cy.contains(".list-group-item", "Cost").contains("10");
      cy.contains(".card", "Properties").parent().children().get(".echarts.chart");
      cy.contains(".card", "Structure").parent().children().get(".echarts.chart");
    });

    it('Can export structure chart', () => {
      cy.loadCsvData();
      cy.loadStructureData();
      cy.visit('/');
      cy.contains("config-1").parent().click();
      cy.contains(".card", "Structure").parent().children().find("button.dropdown-toggle").click();
      cy.contains(".card", "Structure").parent().children().contains("Export (.png)");
    });
});